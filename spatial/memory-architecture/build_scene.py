import bpy, bmesh, math, os
from mathutils import Vector, Matrix

# Shared conventions (copied per concept so each folder rebuilds alone).
# Blender Z-up; glTF export maps Blender (x, y, z) to Three (x, z, -y).
HERE = os.path.dirname(os.path.abspath(__file__))
CONCEPT = os.path.basename(HERE)
ROOT = os.path.abspath(os.path.join(HERE, '..', '..'))
OUT = os.path.join(ROOT, 'public', 'spatial', CONCEPT)
os.makedirs(OUT, exist_ok=True)
bpy.ops.wm.read_factory_settings(use_empty=True)
bpy.context.preferences.filepaths.save_version = 0  # no .blend1 backups
scene = bpy.context.scene


def srgb(h):
    h = h.lstrip('#')
    c = [int(h[i:i + 2], 16) / 255 for i in (0, 2, 4)]
    return tuple(((x + 0.055) / 1.055) ** 2.4 if x > 0.04045 else x / 12.92 for x in c)


def mat(name, hexcol, rough=0.85, alpha=1.0):
    rgb = srgb(hexcol)
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    b = m.node_tree.nodes['Principled BSDF']
    b.inputs['Base Color'].default_value = (*rgb, 1)
    b.inputs['Roughness'].default_value = rough
    if alpha < 1:
        b.inputs['Alpha'].default_value = alpha
        m.surface_render_method = 'BLENDED'
    m.diffuse_color = (*rgb, alpha)
    return m


IVORY = mat('Ivory', '#efe9dc')
WARM = mat('IvoryWarm', '#e2d9c6')
STONE = mat('Stone', '#d3cbbb')
CHAR = mat('Charcoal', '#2f2e2b', 0.7)
AMBER = mat('Amber', '#d98f22', 0.55)


def _link(ob, m, origin, parent):
    if m:
        ob.data.materials.append(m)
    bpy.context.collection.objects.link(ob)
    ob.location = origin
    bpy.context.view_layer.update()
    if parent:
        ob.parent = parent
        ob.matrix_parent_inverse = parent.matrix_world.inverted()
    return ob


def _bevel(bm, amount, segments=2):
    if amount <= 0:
        return
    bmesh.ops.bevel(bm, geom=list(bm.edges) + list(bm.verts), offset=amount, segments=segments,
                    affect='EDGES', profile=0.5, clamp_overlap=True)


def _mesh(name, bm, m, origin, parent, bevel):
    bmesh.ops.remove_doubles(bm, verts=bm.verts, dist=1e-5)
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    _bevel(bm, bevel)
    me = bpy.data.meshes.new(name)
    bm.to_mesh(me)
    bm.free()
    for p in me.polygons:
        p.use_smooth = False
    return _link(bpy.data.objects.new(name, me), m, Vector(origin), parent)


def _add_box(bm, mn, mx, o):
    mn, mx = Vector(mn) - o, Vector(mx) - o
    vs = [bm.verts.new((x, y, z)) for x in (mn.x, mx.x) for y in (mn.y, mx.y) for z in (mn.z, mx.z)]
    for f in [(0, 1, 3, 2), (4, 6, 7, 5), (0, 4, 5, 1), (2, 3, 7, 6), (0, 2, 6, 4), (1, 5, 7, 3)]:
        bm.faces.new([vs[i] for i in f])


def box(name, mn, mx, m, origin=None, parent=None, bevel=0.02):
    mn, mx = Vector(mn), Vector(mx)
    o = Vector(origin) if origin else (mn + mx) / 2
    bevel = min(bevel, 0.3 * min(mx - mn))
    bm = bmesh.new()
    _add_box(bm, mn, mx, o)
    return _mesh(name, bm, m, o, parent, bevel)


def boxes(name, parts, m, origin, parent=None, bevel=0.01):
    """Several boxes as one mesh object (railings, frames, slats)."""
    o = Vector(origin)
    bm = bmesh.new()
    for a, b in parts:
        _add_box(bm, a, b, o)
    return _mesh(name, bm, m, o, parent, 0)


def loft(name, lower, upper, z0, z1, m, origin, parent=None, bevel=0.015):
    """Closed solid between two horizontal outlines (same vertex count)."""
    o = Vector(origin)
    bm = bmesh.new()
    lo = [bm.verts.new(Vector((x, y, z0)) - o) for x, y in lower]
    up = [bm.verts.new(Vector((x, y, z1)) - o) for x, y in upper]
    n = len(lo)
    bm.faces.new(list(reversed(lo)))
    bm.faces.new(up)
    for i in range(n):
        j = (i + 1) % n
        bm.faces.new([lo[i], lo[j], up[j], up[i]])
    return _mesh(name, bm, m, o, parent, bevel)


def cyl(name, center, r, h, m, verts=24, parent=None, axis='Z', r2=None, bevel=0.01):
    bm = bmesh.new()
    bmesh.ops.create_cone(bm, cap_ends=True, segments=verts, radius1=r, radius2=r if r2 is None else r2, depth=h)
    if axis == 'X':
        bmesh.ops.rotate(bm, verts=bm.verts, matrix=Matrix.Rotation(math.pi / 2, 3, 'Y'))
    elif axis == 'Y':
        bmesh.ops.rotate(bm, verts=bm.verts, matrix=Matrix.Rotation(math.pi / 2, 3, 'X'))
    return _mesh(name, bm, m, Vector(center), parent, min(bevel, 0.25 * r))


def text_mesh(name, body, loc, size, m, rot=(math.pi / 2, 0, 0), parent=None, extrude=0.012, align='CENTER'):
    cu = bpy.data.curves.new(name, 'FONT')
    cu.body = body
    cu.size = size
    cu.extrude = extrude
    cu.align_x = align
    cu.align_y = 'CENTER'
    ob = bpy.data.objects.new(name + '_curve', cu)
    bpy.context.collection.objects.link(ob)
    ob.rotation_euler = rot
    ob.location = loc
    bpy.context.view_layer.update()
    dg = bpy.context.evaluated_depsgraph_get()
    me = bpy.data.meshes.new_from_object(ob.evaluated_get(dg))
    mw = ob.matrix_world.copy()
    bpy.data.objects.remove(ob)
    me.transform(mw)
    me.transform(Matrix.Translation(-Vector(loc)))
    t = bpy.data.objects.new(name, me)
    me.materials.clear()
    return _link(t, m, Vector(loc), parent)


def empty(name, loc, parent=None):
    e = bpy.data.objects.new(name, None)
    return _link(e, None, Vector(loc), parent)


def three_to_blender(v):
    return Vector((v[0], -v[2], v[1]))


def finish(camera_pos, camera_target, fov=38, hidden=()):
    """Save .blend, export GLB (no lights/cameras), render a Workbench poster."""
    for n in hidden:
        bpy.data.objects[n].hide_render = True
    bpy.ops.wm.save_as_mainfile(filepath=os.path.join(HERE, 'scene.blend'))
    bpy.ops.export_scene.gltf(filepath=os.path.join(OUT, 'scene.glb'), export_format='GLB',
                              export_cameras=False, export_lights=False, export_apply=True, export_yup=True)
    cd = bpy.data.cameras.new('PosterCamera')
    cd.sensor_fit = 'VERTICAL'
    cd.angle = math.radians(fov)
    cam = bpy.data.objects.new('PosterCamera', cd)
    scene.collection.objects.link(cam)
    cam.location = three_to_blender(camera_pos)
    d = three_to_blender(camera_target) - cam.location
    cam.rotation_euler = d.to_track_quat('-Z', 'Y').to_euler()
    scene.camera = cam
    w = bpy.data.worlds.new('Paper')
    w.use_nodes = True
    bg = w.node_tree.nodes['Background']
    bg.inputs['Color'].default_value = (*srgb('#f2f0e9'), 1)
    bg.inputs['Strength'].default_value = 0.9
    scene.world = w
    # Poster-only lights, added after the GLB export so none are shipped.
    sun = bpy.data.objects.new('PosterSun', bpy.data.lights.new('PosterSun', 'SUN'))
    sun.data.energy = 3.2
    sun.data.angle = math.radians(8)
    sun.rotation_euler = (math.radians(42), math.radians(-18), math.radians(-35))
    scene.collection.objects.link(sun)
    scene.render.engine = 'BLENDER_EEVEE'
    scene.eevee.taa_render_samples = 32
    scene.view_settings.view_transform = 'AgX'
    scene.view_settings.exposure = 0.35
    scene.render.use_freestyle = True
    scene.render.line_thickness_mode = 'ABSOLUTE'
    scene.render.line_thickness = 1.1
    fs = scene.view_layers[0].freestyle_settings
    lset = fs.linesets[0] if len(fs.linesets) else fs.linesets.new('Contours')
    if lset.linestyle is None:
        lset.linestyle = bpy.data.linestyles.new('Charcoal')
    lset.linestyle.color = srgb('#2f2e2b')
    lset.select_by_visibility = True
    lset.select_silhouette = lset.select_border = lset.select_crease = True
    lset.select_by_edge_types = True
    scene.render.resolution_x = 1200
    scene.render.resolution_y = 800
    scene.render.film_transparent = False
    scene.render.image_settings.file_format = 'PNG'
    scene.render.filepath = os.path.join(OUT, 'poster.png')
    scene.render.film_transparent = True
    scene.render.image_settings.color_mode = 'RGBA'
    bpy.ops.render.render(write_still=True)
    # Flatten onto the paper colour so the poster is opaque.
    import numpy as np
    img = bpy.data.images.load(scene.render.filepath)
    px = np.empty(len(img.pixels), dtype=np.float32)
    img.pixels.foreach_get(px)
    px = px.reshape(-1, 4)
    paper = np.array([0xf2, 0xf0, 0xe9], dtype=np.float32) / 255
    a = px[:, 3:4]
    px[:, :3] = px[:, :3] * a + paper * (1 - a)
    px[:, 3] = 1
    img.pixels.foreach_set(px.ravel())
    img.filepath_raw = scene.render.filepath
    img.file_format = 'PNG'
    img.save()
    print('WROTE', OUT)

# Memory architecture (attempt): who holds which revision of a convention.
# Repository plaque (source of truth) at the back, a record cabinet (store) on
# the left, two run desks in front: a fresh run and an already-active run.
# X across, Y depth (front = -Y), Z up.
NEW = mat('NewCard', '#fbfaf6', 0.8)
CARD = mat('Card', '#f3eee2', 0.8)

box('Board', (-3.2, -2.3, -0.12), (3.2, 2.1, 0.0), STONE, bevel=0.04)

# Repository: a post with a two-sided plaque that can turn.
box('Repo_base', (-0.45, 1.25, 0.0), (0.45, 1.75, 0.12), WARM, bevel=0.02)
box('Repo_post', (-0.06, 1.44, 0.12), (0.06, 1.56, 1.55), CHAR, bevel=0.01)
plaque = box('Plaque', (-0.85, 1.46, 1.55), (0.85, 1.54, 2.45), IVORY, origin=(0, 1.5, 2.0), bevel=0.02)
box('Plaque_frame', (-0.9, 1.44, 2.43), (0.9, 1.56, 2.5), CHAR, parent=plaque, bevel=0.01)
text_mesh('Plaque_front_cmd', 'npm test', (0, 1.445, 2.1), 0.26, CHAR, parent=plaque)
text_mesh('Plaque_front_rev', 'r1', (0, 1.445, 1.78), 0.24, CHAR, parent=plaque)
text_mesh('Plaque_back_cmd', 'pnpm test', (0, 1.555, 2.1), 0.26, CHAR, rot=(math.pi / 2, 0, math.pi), parent=plaque)
text_mesh('Plaque_back_rev', 'r2', (0, 1.555, 1.78), 0.24, AMBER, rot=(math.pi / 2, 0, math.pi), parent=plaque)

# Record cabinet with four drawers; the billing drawer is open.
box('Cabinet', (-2.85, 0.75, 0.0), (-1.75, 1.75, 1.7), WARM, bevel=0.03)
for k in range(4):
    z0 = 0.12 + k * 0.4
    if k == 2:
        continue
    box('Cabinet_drawer%d' % k, (-2.75, 0.71, z0), (-1.85, 0.76, z0 + 0.32), IVORY, bevel=0.01)
    box('Cabinet_pull%d' % k, (-2.4, 0.67, z0 + 0.13), (-2.2, 0.71, z0 + 0.18), CHAR, bevel=0.005)
drawer = empty('Store_drawer', (-2.3, 0.5, 0.92))
box('Store_drawer_box', (-2.75, 0.25, 0.92), (-1.85, 0.76, 1.24), IVORY, parent=drawer, bevel=0.01)
box('Store_drawer_front', (-2.75, 0.21, 0.92), (-1.85, 0.26, 1.24), IVORY, parent=drawer, bevel=0.01)
box('Store_drawer_pull', (-2.4, 0.17, 1.05), (-2.2, 0.21, 1.1), CHAR, parent=drawer, bevel=0.005)


def card(name, loc, rev, cmd, parent=None, upright=False):
    root = empty(name, loc, parent)
    x, y, z = loc
    if upright:
        box(name + '_tile', (x - 0.32, y - 0.02, z), (x + 0.32, y + 0.02, z + 0.42), CARD, parent=root, bevel=0.008)
        text_mesh(name + '_rev', rev, (x, y - 0.025, z + 0.21), 0.2, AMBER if rev == 'r2' else CHAR, parent=root, extrude=0.006)
    else:
        box(name + '_tile', (x - 0.42, y - 0.28, z), (x + 0.42, y + 0.28, z + 0.025), CARD, parent=root, bevel=0.008)
        text_mesh(name + '_cmd', cmd, (x, y + 0.08, z + 0.03), 0.15, CHAR, rot=(0, 0, 0), parent=root, extrude=0.004)
        text_mesh(name + '_rev', rev, (x, y - 0.13, z + 0.03), 0.17, AMBER if rev == 'r2' else CHAR, rot=(0, 0, 0), parent=root, extrude=0.004)
    return root


card('Card_store', (-2.3, 0.5, 1.12), 'r1', '', parent=drawer, upright=True)


def desk(name, x, label):
    box(name + '_top', (x - 0.95, -1.75, 0.72), (x + 0.95, -0.65, 0.8), IVORY, bevel=0.02)
    for i, (dx, dy) in enumerate(((-0.85, -1.65), (0.85, -1.65), (-0.85, -0.75), (0.85, -0.75))):
        box('%s_leg%d' % (name, i), (x + dx - 0.05, dy - 0.05, 0.0), (x + dx + 0.05, dy + 0.05, 0.72), CHAR, bevel=0.01)
    # A booth screen behind each desk: each run sees only its own desk.
    box(name + '_screen', (x - 1.05, -0.6, 0.0), (x + 1.05, -0.52, 1.5), WARM, bevel=0.02)
    text_mesh(name + '_label', label, (x, -0.605 - 0.01, 1.25), 0.2, CHAR)
    box(name + '_tray', (x - 0.5, -1.45, 0.8), (x + 0.5, -0.95, 0.83), CHAR, bevel=0.006)


desk('Desk_fresh', -1.25, 'fresh run')
desk('Desk_active', 1.35, 'active run')
card('Card_active', (1.35, -1.2, 0.84), 'r1', 'npm test')
card('Card_active_r2', (1.35, -1.2, 0.84), 'r2', 'pnpm test')
card('Card_fresh_old', (-1.25, -1.2, 0.84), 'r1', 'npm test')
card('Card_fresh', (-1.25, -1.2, 0.84), 'r2', 'pnpm test')

HIDDEN = []
for n in ('Card_active_r2', 'Card_fresh_old', 'Card_fresh'):
    HIDDEN += [c.name for c in bpy.data.objects[n].children]
finish((4.4, 4.6, 7.4), (0, 0.9, -0.2), hidden=HIDDEN)

