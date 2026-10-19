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

# Harness engineering: a records vault with two routes to one invoice.
# Invoice A-17 (owned by tenant A) sits on a tray in the vault. A front route
# (the request the repair was written for) and an export route reach the same
# tray. The harness has a probe station at the end of each route, with one rod
# per tenant. The ownership check can sit on the front route (a gate) or at the
# invoice itself (a guard collar). X east, Y north (front = -Y), Z up.
NEW = mat('NewPanel', '#f8f5ee', 0.7)
PAPER = mat('Paper', '#fbfaf6', 0.9)
LAMP = mat('Lamp', '#6f6c64', 0.5)
FLOOR = mat('Floor', '#d9d1c1', 0.9)

# Plinth and vault floor
box('Plinth', (-1.9, -3.8, -0.32), (3.8, 1.9, -0.06), STONE, bevel=0.05)
box('Vault_floor', (-1.32, -1.32, -0.06), (1.32, 1.32, 0.0), IVORY, bevel=0.02)

# Vault walls: the north and west walls stand full height; the south and east
# walls are cut down so both routes and the tray stay in view.
WH, CUT = 0.85, 0.3
FX0, FX1 = -0.47, 0.23   # front doorway, centred on the front lanes
EY0, EY1 = -0.23, 0.47   # export hatch, centred on the export lanes
walls = [((-1.32, 1.2, 0), (1.32, 1.32, WH)), ((-1.32, -1.32, 0), (-1.2, 1.32, WH)),
         ((-1.2, -1.32, 0), (FX0, -1.2, CUT)), ((FX1, -1.32, 0), (1.32, -1.2, CUT)),
         ((1.2, -1.2, 0), (1.32, EY0, CUT)), ((1.2, EY1, 0), (1.32, 1.2, CUT))]
for i, (a, b) in enumerate(walls):
    box('Vault_wall_%d' % i, a, b, IVORY, bevel=0.015)
    box('Vault_coping_%d' % i, (a[0] - 0.02, a[1] - 0.02, b[2]), (b[0] + 0.02, b[1] + 0.02, b[2] + 0.05), WARM, bevel=0.01)
# Cut faces of the cutaway, in charcoal, where the low walls meet the tall ones.
box('Cut_mark_SW', (-1.32, -1.32, CUT), (-1.2, -1.2, WH), IVORY, bevel=0.01)
box('Cut_mark_NE', (1.2, 1.2, CUT), (1.32, 1.32, WH), IVORY, bevel=0.01)
for i, x in enumerate((FX0 - 0.04, FX1)):
    box('Door_jamb_%d' % i, (x, -1.36, 0), (x + 0.04, -1.16, 0.45), CHAR, bevel=0.008)
for i, y in enumerate((EY0 - 0.04, EY1)):
    box('Hatch_jamb_%d' % i, (1.16, y, 0), (1.36, y + 0.04, 0.45), CHAR, bevel=0.008)

# Pedestal and tray holding invoice A-17
box('Pedestal_base', (-0.36, -0.36, 0.0), (0.36, 0.36, 0.1), WARM, bevel=0.02)
loft('Pedestal_shaft', [(-0.2, -0.2), (0.2, -0.2), (0.2, 0.2), (-0.2, 0.2)], [(-0.16, -0.16), (0.16, -0.16), (0.16, 0.16), (-0.16, 0.16)],
     0.1, 0.46, IVORY, (0, 0, 0.1), bevel=0.01)
box('Tray', (-0.34, -0.34, 0.46), (0.34, 0.34, 0.5), WARM, bevel=0.01)
boxes('Tray_rim', [((-0.34, -0.34, 0.5), (0.34, -0.31, 0.53)), ((-0.34, 0.31, 0.5), (0.34, 0.34, 0.53)),
                   ((-0.34, -0.31, 0.5), (-0.31, 0.31, 0.53)), ((0.31, -0.31, 0.5), (0.34, 0.31, 0.53))], CHAR, (0, 0, 0.5))
inv = empty('Invoice_A17', (0, 0, 0.5))
box('Invoice_folder', (-0.18, -0.13, 0.5), (0.18, 0.13, 0.52), WARM, parent=inv, bevel=0.005)
for k in range(3):
    z = 0.52 + k * 0.012
    box('Invoice_sheet%d' % k, (-0.16 + k * 0.008, -0.11, z), (0.16 - k * 0.005, 0.11, z + 0.008), PAPER, parent=inv, bevel=0.0)
box('Invoice_tab', (-0.18, 0.09, 0.52), (-0.06, 0.16, 0.55), CHAR, parent=inv, bevel=0.004)
# Owner plate: a small upright "A" on the north rim of the tray.
box('Owner_plate', (-0.12, 0.27, 0.53), (0.12, 0.31, 0.75), IVORY, bevel=0.01)
text_mesh('Owner_plate_A', 'A', (0, 0.265, 0.64), 0.17, CHAR)

# Corridors: floors and low parapets so the probe rods stay visible.
box('Front_corridor', (-0.62, -3.0, -0.06), (0.38, -1.32, 0.0), FLOOR, bevel=0.01)
box('Front_parapet_W', (-0.7, -3.0, 0.0), (-0.62, -1.32, 0.38), IVORY, bevel=0.01)
box('Front_parapet_E', (0.38, -3.0, 0.0), (0.46, -1.32, 0.38), IVORY, bevel=0.01)
box('Export_corridor', (1.32, -0.38, -0.06), (3.0, 0.62, 0.0), FLOOR, bevel=0.01)
box('Export_parapet_S', (1.32, -0.46, 0.0), (3.0, -0.38, 0.38), IVORY, bevel=0.01)
box('Export_parapet_N', (1.32, 0.62, 0.0), (3.0, 0.7, 0.38), IVORY, bevel=0.01)

# Probe stations. Rods: bar origin at the station face; runtime scales the bar
# along its axis and moves the tip, so geometry here is the full reach.
RZ = 0.62
L0 = 2.68
LANES = {
    ('front', 'A'): ((-0.22, -3.0, RZ), (0, 1, 0)),
    ('front', 'B'): ((-0.02, -3.0, RZ), (0, 1, 0)),
    ('export', 'A'): ((3.0, 0.22, RZ), (-1, 0, 0)),
    ('export', 'B'): ((3.0, 0.02, RZ), (-1, 0, 0)),
}


def station(route, mn, mx, lamp_pos, letters, text_rot):
    box('Station_%s' % route, mn, mx, WARM, bevel=0.03)
    box('Station_%s_cap' % route, (mn[0] - 0.03, mn[1] - 0.03, mx[2]), (mx[0] + 0.03, mx[1] + 0.03, mx[2] + 0.05), CHAR, bevel=0.01)
    for t, p in lamp_pos.items():
        name = 'Lamp_%s_%s' % (route, t)
        cyl(name, (p[0], p[1], mx[2] + 0.12), 0.13, 0.16, LAMP, verts=28, r2=0.1)
        cyl(name + '_rim', (p[0], p[1], mx[2] + 0.07), 0.155, 0.04, CHAR, verts=28)
    for t, p in letters.items():
        text_mesh('Station_%s_label_%s' % (route, t), t, p, 0.22, CHAR, rot=text_rot)


station('front', (-0.72, -3.5, 0.0), (0.48, -3.0, 0.9), {'A': (-0.37, -3.25), 'B': (0.13, -3.25)},
        {'A': (-0.37, -3.515, 0.5), 'B': (0.13, -3.515, 0.5)}, (math.pi / 2, 0, 0))
station('export', (3.0, -0.48, 0.0), (3.5, 0.72, 0.9), {'A': (3.25, 0.47), 'B': (3.25, -0.03)},
        {'A': (3.515, 0.47, 0.5), 'B': (3.515, -0.03, 0.5)}, (math.pi / 2, 0, math.pi / 2))

for (route, t), (o, d) in LANES.items():
    o, d = Vector(o), Vector(d)
    side = Vector((-d.y, d.x, 0))  # horizontal normal to the rod
    name = 'Probe_%s_%s' % (route, t)
    cyl(name + '_bushing', o - d * 0.01, 0.06, 0.05, CHAR, verts=20, axis='Y' if d.y else 'X')
    end = o + d * L0
    mn = Vector((min(o.x, end.x), min(o.y, end.y), RZ - 0.025)) - side * 0.025
    mx = Vector((max(o.x, end.x), max(o.y, end.y), RZ + 0.025)) + side * 0.025
    mn2 = Vector((min(mn.x, mx.x), min(mn.y, mx.y), mn.z))
    mx2 = Vector((max(mn.x, mx.x), max(mn.y, mx.y), mx.z))
    bar = box(name + '_bar', mn2, mx2, CHAR, origin=o, bevel=0.0)
    # Authored retracted: the runtime scales this axis to the tip distance / L0.
    if d.y:
        bar.scale.y = 0.08 / L0
    else:
        bar.scale.x = 0.08 / L0
    tip = empty(name + '_tip', o + d * 0.08)
    c = o + d * 0.08
    h = Vector((0.05, 0.05, 0.05))
    box(name + '_head', c - h, c + h, IVORY, parent=tip, bevel=0.012)
    for k, s in enumerate((-1, 1)):
        a = c + d * 0.05 + side * (s * 0.035) - Vector((0, 0, 0.02))
        b = c + d * 0.13 + side * (s * 0.035) + Vector((0, 0, 0.0))
        a2 = Vector((min(a.x, b.x) - 0.012, min(a.y, b.y) - 0.012, a.z))
        b2 = Vector((max(a.x, b.x) + 0.012, max(a.y, b.y) + 0.012, b.z))
        box('%s_prong%d' % (name, k), a2, b2, CHAR, parent=tip, bevel=0.003)
    # The response this probe carries home when its request returns the invoice.
    cc = c + d * 0.12
    half = d * 0.1 + side * 0.098
    cmn = Vector((min(cc.x - half.x, cc.x + half.x), min(cc.y - half.y, cc.y + half.y), RZ + 0.005))
    cmx = Vector((max(cc.x - half.x, cc.x + half.x), max(cc.y - half.y, cc.y + half.y), RZ + 0.055))
    box('Copy_%s_%s' % (route, t), cmn, cmx, AMBER if t == 'B' else PAPER, parent=tip, bevel=0.004)

# Placement 1: an ownership gate on the front route only.
gate = empty('Gate_front', (-0.12, -2.0, 0.0))
box('Gate_post_W', (-0.7, -2.06, 0.0), (-0.62, -1.94, 1.05), WARM, parent=gate, bevel=0.01)
box('Gate_post_E', (0.38, -2.06, 0.0), (0.46, -1.94, 1.05), WARM, parent=gate, bevel=0.01)
box('Gate_lintel', (-0.7, -2.06, 0.97), (0.46, -1.94, 1.07), WARM, parent=gate, bevel=0.01)
box('Gate_mullion', (-0.15, -2.04, 0.38), (-0.09, -1.96, 0.97), WARM, parent=gate, bevel=0.006)
box('Gate_reader', (-0.69, -2.12, 0.62), (-0.6, -2.06, 0.78), CHAR, parent=gate, bevel=0.006)
# Closed for tenant B's lane (B does not own A-17), open for A's.
box('Gate_bar_B', (-0.09, -2.04, 0.5), (0.38, -1.96, 0.74), CHAR, parent=gate, bevel=0.01)

# Placement 2: an ownership guard at the invoice itself. Every route that
# reaches the tray meets it. Slots facing A's lanes are open; B's are shut.
guard = empty('Guard_invoice', (0, 0, 0.46))
G0, G1, GZ0, GZ1 = 0.44, 0.48, 0.5, 0.8
parts = []
# South face with slots at x = -0.22 (A) and -0.02 (B)
for a, b in ((-G1, -0.3), (-0.14, -0.1), (0.06, G1)):
    parts.append(((a, -G1, GZ0), (b, -G0, GZ1)))
# East face with slots at y = 0.22 (A) and 0.02 (B)
for a, b in ((-G1, -0.06), (0.1, 0.14), (0.3, G1)):
    parts.append(((G0, a, GZ0), (G1, b, GZ1)))
parts.append(((-G1, G0, GZ0), (G1, G1, GZ1)))   # north
parts.append(((-G1, -G1, GZ0), (-G0, G1, GZ1)))  # west
boxes('Guard_collar', parts, NEW, (0, 0, GZ0), guard)
box('Guard_shutter_front_B', (-0.1, -0.5, GZ0 + 0.02), (0.06, -0.46, GZ1 - 0.02), CHAR, parent=guard, bevel=0.006)
box('Guard_shutter_export_B', (0.46, -0.06, GZ0 + 0.02), (0.5, 0.1, GZ1 - 0.02), CHAR, parent=guard, bevel=0.006)
box('Guard_reader', (-0.47, -0.52, GZ1 - 0.1), (-0.37, -0.48, GZ1 + 0.05), CHAR, parent=guard, bevel=0.006)

HIDDEN = ['Guard_collar', 'Guard_shutter_front_B', 'Guard_shutter_export_B', 'Guard_reader'] + \
    ['Copy_%s_%s' % k for k in LANES]
finish((4.6, 4.4, 4.9), (0.8, 0.25, 0.9), hidden=HIDDEN)

