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

# Context engineering: a footbridge whose deck keeps cracking over pier 2.
# X runs along the bridge, Y along the boat channel (front = -Y), Z up.
# The pier 2 split is on its upstream (+Y) face, below the deck, hidden from the
# default front view. The boat lane between the piers is the constraint.
WATER = mat('Water', '#bfcbc6', 0.25, 0.8)
ENVELOPE = mat('Envelope', '#d98f22', 0.6, 0.22)
PATCH = mat('Patch', '#cfc6b3')
NEW = mat('NewConcrete', '#f8f5ee', 0.7)

# Banks and channel (no separate ground; the host supplies one).
for side, x0, x1 in (('W', -5.6, -3.5), ('E', 3.5, 5.6)):
    box('Bank_' + side, (x0, -3.6, -0.6), (x1, 3.6, 1.6), STONE, bevel=0.05)
    # coping stones along the channel edge
    edge = -3.5 if side == 'W' else 3.5
    sx = -1 if side == 'W' else 1
    box('Coping_' + side, (min(edge, edge + sx * 0.25), -3.6, 1.6), (max(edge, edge + sx * 0.25), 3.6, 1.68), WARM, bevel=0.02)
box('ChannelBed', (-3.5, -3.6, -0.6), (3.5, 3.6, -0.45), STONE, bevel=0.0)
box('Water', (-3.5, -3.6, -0.45), (3.5, 3.6, 0.2), WATER, bevel=0.0)

# Deck spans. Origins sit at the fixed ends so the joint over pier 2 can sag.
DZ0, DZ1 = 1.3, 1.6
deck_w = box('Deck_W', (-4.6, -0.9, DZ0), (-1.4, 0.9, DZ1), IVORY, bevel=0.025)
deck_c = box('Deck_C', (-1.4, -0.9, DZ0), (1.4, 0.9, DZ1), IVORY, origin=(-1.4, 0, DZ0), bevel=0.025)
deck_e = box('Deck_E', (1.4, -0.9, DZ0), (4.6, 0.9, DZ1), IVORY, origin=(4.6, 0, DZ0), bevel=0.025)


def railing(span, x0, x1, parent):
    # Sparse posts and a single top rail keep the railing quiet at 420 px.
    for side, y in (('N', 0.82), ('S', -0.82)):
        n = max(2, int(round((x1 - x0) / 1.05)) + 1)
        parts = []
        for i in range(n):
            x = x0 + 0.1 + i * (x1 - x0 - 0.2) / (n - 1)
            parts.append(((x - 0.045, y - 0.045, DZ1), (x + 0.045, y + 0.045, DZ1 + 0.46)))
        parts.append(((x0 + 0.05, y - 0.05, DZ1 + 0.46), (x1 - 0.05, y + 0.05, DZ1 + 0.53)))
        boxes('Rail_%s_%s' % (side, span), parts, WARM, ((x0 + x1) / 2, y, DZ1), parent)


railing('W', -4.6, -1.4, deck_w)
railing('C', -1.4, 1.4, deck_c)
railing('E', 1.4, 4.6, deck_e)

# The symptom named in the request: a crack across the joint, patched before.
box('OldPatch', (1.1, -0.86, DZ1), (1.7, 0.86, DZ1 + 0.018), PATCH, parent=deck_c, bevel=0.006)
crack = []
y = -0.84
zig = [0.0, 0.05, -0.03, 0.04, -0.05, 0.02, 0.05, -0.02]
for i, dx in enumerate(zig):
    y1 = y + 1.68 / len(zig)
    crack.append(((1.37 + dx, y, DZ1 + 0.018), (1.43 + dx, y1, DZ1 + 0.03)))
    y = y1
boxes('DeckCrack', crack, CHAR, (1.4, 0, DZ1 + 0.02), deck_c)
reopen = [((a[0] - 0.01, a[1], DZ1 + 0.05), (b[0] + 0.01, b[1], DZ1 + 0.066)) for a, b in crack]
reopened = boxes('Crack_Reopened', reopen, AMBER, (1.4, 0, DZ1 + 0.055), deck_c)
# The reopened crack also runs down the downstream fascia, so a view from
# under the deck edge shows it without seeing the deck top.
face = []
zz = [DZ0, DZ0 + 0.06, DZ0 + 0.12, DZ0 + 0.18, DZ0 + 0.24, DZ1]
jog = [0.0, 0.04, -0.03, 0.035, -0.02]
for i in range(len(zz) - 1):
    face.append(((1.36 + jog[i], -0.935, zz[i]), (1.44 + jog[i], -0.895, zz[i + 1])))
boxes('Crack_Reopened_face', face, AMBER, (1.4, -0.915, DZ0), reopened)


# Piers: tapered shafts with caps. Pier 2 is split in two pieces.
def pier(name, x, z0, z1, parent=None, top=None):
    return loft(name, [(x - 0.3, -0.75), (x + 0.3, -0.75), (x + 0.3, 0.75), (x - 0.3, 0.75)],
                [(x - 0.25, -0.68), (x + 0.25, -0.68), (x + 0.25, 0.68), (x - 0.25, 0.68)] if top is None else top,
                z0, z1, IVORY, (x, 0, z0), parent, bevel=0.02)


pier('Pier1', -1.4, -0.45, 1.15)
box('Pier1_cap', (-1.75, -0.85, 1.15), (-1.05, 0.85, DZ0), WARM, bevel=0.02)
top2 = [(1.4 - 0.27, -0.71), (1.4 + 0.27, -0.71), (1.4 + 0.27, 0.71), (1.4 - 0.27, 0.71)]
pier('Pier2_lower', 1.4, -0.45, 0.55, top=top2)
p2u = loft('Pier2_upper', top2, [(1.15, -0.68), (1.65, -0.68), (1.65, 0.68), (1.15, 0.68)], 0.55, 1.15,
           IVORY, (1.4, 0, 0.55), bevel=0.015)
box('Pier2_cap', (1.05, -0.85, 1.15), (1.75, 0.85, DZ0), WARM, parent=p2u, bevel=0.02)
# Split on the upstream (+Y) face only: a deep stepped seam in relief plus a
# spall, so it reads as broken geometry before any amber highlight.
seam = []
xs = [1.14, 1.22, 1.3, 1.38, 1.46, 1.54, 1.62]
zs = [0.6, 0.56, 0.63, 0.55, 0.61, 0.54, 0.59]
for i in range(len(xs) - 1):
    seam.append(((xs[i], 0.69, min(zs[i], zs[i + 1]) - 0.045), (xs[i + 1], 0.775, max(zs[i], zs[i + 1]) + 0.045)))
seam.append(((1.62, 0.3, 0.51), (1.7, 0.775, 0.64)))
boxes('Pier2_crack', seam, CHAR, (1.4, 0.72, 0.58))
loft('Pier2_spall', [(1.3, 0.69), (1.48, 0.69), (1.45, 0.74), (1.33, 0.74)], [(1.32, 0.69), (1.46, 0.69), (1.44, 0.72), (1.34, 0.72)],
     0.62, 0.74, STONE, (1.39, 0.71, 0.62), bevel=0.004)

# Boat moored downstream, bow upstream (+Y). It passes between the piers.
# Geometry is authored at the mooring (BY) so the boat starts clear of the
# bridge; the runtime moves the Boat empty along the channel.
BY = -2.6
boat = empty('Boat', (0, BY, 0.0))
loft('Boat_hull', [(-0.42, BY - 0.6), (0.42, BY - 0.6), (0.42, BY + 0.2), (0.0, BY + 0.62), (-0.42, BY + 0.2)],
     [(-0.58, BY - 0.72), (0.58, BY - 0.72), (0.58, BY + 0.25), (0.0, BY + 0.85), (-0.58, BY + 0.25)],
     -0.05, 0.42, WARM, (0, BY, -0.05), boat, bevel=0.02)
box('Boat_gunwale', (-0.6, BY - 0.74, 0.42), (0.6, BY - 0.68, 0.48), CHAR, parent=boat, bevel=0.006)
box('Boat_cabin', (-0.36, BY - 0.6, 0.42), (0.36, BY + 0.0, 0.78), IVORY, parent=boat, bevel=0.03)
box('Boat_roof', (-0.4, BY - 0.64, 0.78), (0.4, BY + 0.04, 0.82), CHAR, parent=boat, bevel=0.01)
cyl('Boat_mast', (0, BY + 0.2, 0.78), 0.03, 0.72, CHAR, parent=boat)

# Lane buoys mark the navigable span between the piers.
for i, (x, y) in enumerate(((-0.8, -3.25), (0.8, -3.25), (-0.8, 3.25), (0.8, 3.25))):
    b = empty('Buoy_%d' % i, (x, y, 0.2))
    cyl('Buoy_%d_body' % i, (x, y, 0.22), 0.14, 0.26, IVORY, parent=b, r2=0.1)
    cyl('Buoy_%d_band' % i, (x, y, 0.3), 0.125, 0.06, CHAR, parent=b)
    cyl('Buoy_%d_top' % i, (x, y, 0.48), 0.03, 0.26, CHAR, parent=b)

# The space boats need: shown only once the constraint is supplied.
box('Clearance', (-0.68, -3.6, 0.2), (0.68, 3.6, 1.25), ENVELOPE, bevel=0.0)

# Load cart parked on the west bank.
cart = empty('LoadCart', (-4.95, 0, DZ1))
box('Cart_body', (-5.3, -0.42, DZ1 + 0.12), (-4.6, 0.42, DZ1 + 0.32), WARM, parent=cart, bevel=0.02)
box('Cart_load', (-5.18, -0.3, DZ1 + 0.32), (-4.72, 0.3, DZ1 + 0.62), CHAR, parent=cart, bevel=0.03)
for i, (x, y) in enumerate(((-5.18, -0.45), (-4.72, -0.45), (-5.18, 0.45), (-4.72, 0.45))):
    cyl('Cart_wheel%d' % i, (x, y, DZ1 + 0.1), 0.1, 0.06, CHAR, verts=20, parent=cart, axis='Y')

# Authored repairs (hidden until a handoff produces them).
box('Repair_Patch', (1.0, -0.88, DZ1 + 0.018), (1.8, 0.88, DZ1 + 0.05), NEW, parent=deck_c, bevel=0.01)
prop = empty('Repair_Prop', (0.7, 0, 0))
# A dark steel prop reads against the ivory piers from any side.
loft('Prop_column', [(0.52, -0.2), (0.88, -0.2), (0.88, 0.2), (0.52, 0.2)], [(0.56, -0.16), (0.84, -0.16), (0.84, 0.16), (0.56, 0.16)],
     -0.45, 1.12, CHAR, (0.7, 0, -0.45), prop, bevel=0.015)
box('Prop_header', (0.5, -0.8, 1.12), (1.15, 0.8, DZ0), NEW, parent=prop, bevel=0.015)
box('Prop_base', (0.46, -0.28, 0.12), (0.94, 0.28, 0.24), NEW, parent=prop, bevel=0.015)
under = empty('Repair_Underpin', (1.4, 0, 0))
box('Underpin_footing', (1.02, -0.92, -0.45), (1.78, 0.92, -0.2), NEW, parent=under, bevel=0.02)
loft('Underpin_jacket', [(1.08, -0.8), (1.72, -0.8), (1.72, 0.8), (1.08, 0.8)], [(1.1, -0.76), (1.7, -0.76), (1.7, 0.76), (1.1, 0.76)],
     -0.2, 1.15, NEW, (1.4, 0, -0.2), under, bevel=0.02)
# A flared plinth at the waterline and three steel bands: the underpin is
# identifiable by shape, and it stays inside pier 2's footprint (x >= 1.0).
box('Underpin_plinth', (1.0, -0.9, 0.05), (1.8, 0.9, 0.3), NEW, parent=under, bevel=0.03)
boxes('Underpin_bands', [((1.06, -0.82, z), (1.74, 0.82, z + 0.06)) for z in (0.42, 0.7, 0.98)], CHAR, (1.4, 0, 0.7), under)

HIDDEN = ['Crack_Reopened', 'Crack_Reopened_face', 'Clearance', 'Repair_Patch', 'Prop_column', 'Prop_header', 'Prop_base',
          'Underpin_footing', 'Underpin_jacket', 'Underpin_plinth', 'Underpin_bands']
finish((7.6, 6.2, 9.4), (0.2, 0.5, 0), hidden=HIDDEN)

