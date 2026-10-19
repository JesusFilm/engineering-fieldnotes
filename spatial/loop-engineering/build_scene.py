import bpy, bmesh, os, math, json
from mathutils import Vector, Matrix

# Shared miniature kit (duplicated per concept so each folder rebuilds alone).
# Blender axes: X right, Y away from the default viewer, Z up. glTF export converts to Three Y-up.
HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.abspath(os.path.join(HERE, '..', '..'))
CID = os.path.basename(HERE)
OUT = os.path.join(REPO, 'public', 'spatial', CID)
os.makedirs(OUT, exist_ok=True)
bpy.ops.wm.read_factory_settings(use_empty=True)
scene = bpy.context.scene
COLL = scene.collection


def srgb(h):
    h = h.lstrip('#')
    c = [int(h[i:i + 2], 16) / 255 for i in (0, 2, 4)]
    return tuple(((x + 0.055) / 1.055) ** 2.4 if x > 0.04045 else x / 12.92 for x in c)


def mat(name, hexcol, rough=0.85):
    rgb = srgb(hexcol)
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    b = m.node_tree.nodes['Principled BSDF']
    b.inputs['Base Color'].default_value = (*rgb, 1)
    b.inputs['Roughness'].default_value = rough
    m.diffuse_color = (*rgb, 1)
    return m


IVORY = mat('Ivory', '#efebe1')
WARM = mat('IvoryWarm', '#e2dbcb')
STONE = mat('Stone', '#d6cfbf')
CHAR = mat('Charcoal', '#2f2e2b', 0.7)
AMBER = mat('Amber', '#e2a23b', 0.55)


def update():
    bpy.context.view_layer.update()


def attach(ob, origin, parent):
    COLL.objects.link(ob)
    o = Vector(origin)
    if parent is not None:
        update()
        ob.parent = parent
        ob.location = o - parent.matrix_world.translation
    else:
        ob.location = o
    return ob


def bevel(ob, w):
    if w > 0:
        md = ob.modifiers.new('Bevel', 'BEVEL')
        md.width = w
        md.segments = 2
        md.limit_method = 'ANGLE'
    return ob


def from_bm(name, bm, m, origin, parent=None, smooth_sides=False):
    me = bpy.data.meshes.new(name)
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    bm.to_mesh(me)
    bm.free()
    if smooth_sides:
        for p in me.polygons:
            p.use_smooth = abs(p.normal.z) < 0.5
    me.materials.append(m)
    ob = bpy.data.objects.new(name, me)
    return attach(ob, origin, parent)


def mesh_obj(name, verts, faces, m, origin, parent=None, bev=0.0):
    o = Vector(origin)
    bm = bmesh.new()
    vs = [bm.verts.new(Vector(v) - o) for v in verts]
    for f in faces:
        bm.faces.new([vs[i] for i in f])
    return bevel(from_bm(name, bm, m, o, parent), bev)


BOX_F = [(0, 1, 3, 2), (4, 6, 7, 5), (0, 4, 5, 1), (2, 3, 7, 6), (0, 2, 6, 4), (1, 5, 7, 3)]


def box(name, mn, mx, m, origin=None, parent=None, bev=0.018):
    mn, mx = Vector(mn), Vector(mx)
    o = Vector(origin) if origin else (mn + mx) / 2
    v = [(x, y, z) for x in (mn.x, mx.x) for y in (mn.y, mx.y) for z in (mn.z, mx.z)]
    small = min(mx.x - mn.x, mx.y - mn.y, mx.z - mn.z)
    return mesh_obj(name, v, BOX_F, m, o, parent, bev if small > bev * 3 else 0.0)


def cyl(name, center, r, h, m, axis='Z', seg=32, parent=None, r2=None, origin=None):
    bm = bmesh.new()
    bmesh.ops.create_cone(bm, cap_ends=True, segments=seg, radius1=r, radius2=r if r2 is None else r2, depth=h)
    rot = {'Z': Matrix.Identity(4), 'X': Matrix.Rotation(math.pi / 2, 4, 'Y'), 'Y': Matrix.Rotation(math.pi / 2, 4, 'X')}[axis]
    c = Vector(center)
    o = Vector(origin) if origin else c
    bmesh.ops.transform(bm, matrix=Matrix.Translation(c - o) @ rot, verts=bm.verts)
    return from_bm(name, bm, m, o, parent, smooth_sides=True)


def torus(name, center, R, r, m, axis='X', seg=28, ring=10, parent=None):
    bm = bmesh.new()
    grid = []
    for i in range(seg):
        a = 2 * math.pi * i / seg
        row = []
        for j in range(ring):
            b = 2 * math.pi * j / ring
            d = R + r * math.cos(b)
            row.append(bm.verts.new((d * math.cos(a), d * math.sin(a), r * math.sin(b))))
        grid.append(row)
    for i in range(seg):
        for j in range(ring):
            bm.faces.new([grid[i][j], grid[(i + 1) % seg][j], grid[(i + 1) % seg][(j + 1) % ring], grid[i][(j + 1) % ring]])
    rot = {'Z': Matrix.Identity(4), 'X': Matrix.Rotation(math.pi / 2, 4, 'Y'), 'Y': Matrix.Rotation(math.pi / 2, 4, 'X')}[axis]
    bmesh.ops.transform(bm, matrix=rot, verts=bm.verts)
    ob = from_bm(name, bm, m, center, parent)
    for p in ob.data.polygons:
        p.use_smooth = True
    return ob


def empty(name, loc, parent=None):
    e = bpy.data.objects.new(name, None)
    e.empty_display_size = 0.2
    attach(e, loc, parent)
    update()
    return e


def engrave(name, s, loc, size, m, rot=(0, 0, 0), parent=None, depth=0.012):
    cu = bpy.data.curves.new(name + '_curve', 'FONT')
    cu.body = s
    cu.size = size
    cu.align_x = 'CENTER'
    cu.align_y = 'CENTER'
    cu.extrude = depth
    tmp = bpy.data.objects.new(name + '_tmp', cu)
    COLL.objects.link(tmp)
    tmp.rotation_euler = rot
    update()
    me = bpy.data.meshes.new_from_object(tmp.evaluated_get(bpy.context.evaluated_depsgraph_get()))
    me.transform(tmp.matrix_world)
    me.name = name
    bpy.data.objects.remove(tmp)
    me.materials.clear()
    me.materials.append(m)
    ob = bpy.data.objects.new(name, me)
    return attach(ob, loc, parent)


def bake_mods(ob):
    dg = bpy.context.evaluated_depsgraph_get()
    me = bpy.data.meshes.new_from_object(ob.evaluated_get(dg))
    old = ob.data
    ob.modifiers.clear()
    ob.data = me
    bpy.data.meshes.remove(old)


def cut(ob, cutters):
    for c in cutters:
        md = ob.modifiers.new('Cut', 'BOOLEAN')
        md.operation = 'DIFFERENCE'
        md.object = c
        md.solver = 'EXACT'
    bake_mods(ob)
    for c in cutters:
        bpy.data.objects.remove(c)


def three_to_blender(p):
    return Vector((p[0], -p[2], p[1]))


def finish(scene_json, hide_in_poster=(), poster_overrides=None):
    """Save .blend, export GLB, render the poster from the scene.json camera, and report bounds."""
    update()
    bpy.context.preferences.filepaths.save_version = 0
    bpy.ops.wm.save_as_mainfile(filepath=os.path.join(HERE, 'scene.blend'))
    for ob in bpy.data.objects:
        ob.select_set(ob.type in ('MESH', 'EMPTY'))
    bpy.ops.export_scene.gltf(filepath=os.path.join(OUT, 'scene.glb'), export_format='GLB', export_yup=True,
                              export_apply=True, use_selection=True, export_cameras=False, export_lights=False)
    mn = Vector((1e9, 1e9, 1e9)); mx = -mn
    for ob in bpy.data.objects:
        if ob.type == 'MESH':
            for c in ob.bound_box:
                w = ob.matrix_world @ Vector(c)
                mn = Vector(map(min, mn, w)); mx = Vector(map(max, mx, w))
    names = sorted(o.name for o in bpy.data.objects)
    for name in hide_in_poster:
        bpy.data.objects[name].hide_render = True
    if poster_overrides:
        poster_overrides()
    cam_data = bpy.data.cameras.new('PosterCam')
    cam_data.sensor_fit = 'VERTICAL'
    cam_data.angle_y = math.radians(38)
    cam = bpy.data.objects.new('PosterCam', cam_data)
    COLL.objects.link(cam)
    cam.location = three_to_blender(scene_json['camera']['position'])
    tgt = three_to_blender(scene_json['camera']['target'])
    cam.rotation_euler = (tgt - cam.location).to_track_quat('-Z', 'Y').to_euler()
    scene.camera = cam
    sun = bpy.data.objects.new('PosterSun', bpy.data.lights.new('PosterSun', 'SUN'))
    sun.data.energy = 1.7
    sun.data.angle = math.radians(8)
    sun.rotation_euler = (math.radians(38), math.radians(-18), math.radians(28))
    COLL.objects.link(sun)
    scene.world = bpy.data.worlds.new('World')
    scene.world.use_nodes = True
    bg = scene.world.node_tree.nodes['Background']
    bg.inputs['Color'].default_value = (*srgb('#f1ece1'), 1)
    bg.inputs['Strength'].default_value = 0.5
    scene.render.engine = 'BLENDER_EEVEE'
    try:
        scene.eevee.taa_render_samples = 32
        scene.eevee.use_shadows = True
    except Exception:
        pass
    scene.view_settings.view_transform = 'Standard'
    scene.render.resolution_x, scene.render.resolution_y = 1200, 900
    scene.render.threads_mode = 'FIXED'
    scene.render.threads = 2
    scene.render.film_transparent = True
    dbg = os.environ.get('SPATIAL_DEBUG')
    if dbg and 'debug_state' in globals():
        globals()['debug_state'](dbg)
        scene.render.resolution_x, scene.render.resolution_y = 900, 675
        scene.render.filepath = '/tmp/spatial-' + CID + '-' + dbg + '.png'
        bpy.ops.render.render(write_still=True)
        return
    scene.render.filepath = os.path.join(OUT, 'poster.png')
    bpy.ops.render.render(write_still=True)
    with open(os.path.join(OUT, 'scene.json'), 'w') as f:
        json.dump(scene_json, f, indent=2, ensure_ascii=False)
        f.write('\n')
    report = {'bounds_blender_min': [round(v, 3) for v in mn], 'bounds_blender_max': [round(v, 3) for v in mx], 'objects': len(names)}
    print('SPATIAL_REPORT ' + json.dumps(report))
    print('SPATIAL_NAMES ' + ' '.join(names))



# ---------------------------------------------------------------------------
# Loop engineering: a test bed whose evidence stays in place. Twelve discovered tests are pins in the
# bed. A selector plate with twelve holes slides above them; a probe head with twelve plungers lowers
# through the plate. Evaluating holds the head at contact, so the reader can look between plate and
# pins: plungers through the holes pressing pins (tests ran) or resting on the plate with every pin
# untouched (no tests selected, none ran). A counter shows how many ran, an amber rod rises beside a
# failing test, and a route lever points at the decision the harness makes from that evidence.
# ---------------------------------------------------------------------------
N = 12
PITCH = 0.5
XS = [(-(N - 1) / 2 + i) * PITCH for i in range(N)]
FAIL_INDEX = 7
PIN_TOP = 0.85        # top of an untouched pin cap
PLATE_Z = (1.0, 1.06)
TIP_Z = 1.45          # plunger tips with the head raised
SHIFT = 0.25          # selector offset that covers every pin

box('Plinth', (-4.3, -2.9, -0.3), (4.3, 1.6, 0.0), STONE, bev=0.05)
box('Plinth_Top', (-4.15, -2.75, 0.0), (4.15, 1.45, 0.012), IVORY, bev=0.0)

# Test bed: a long ivory block with a warm top and a charcoal socket ring under every pin.
box('Bed', (-3.3, -0.5, 0.012), (3.3, 0.5, 0.42), IVORY, bev=0.03)
box('Bed_Top', (-3.2, -0.42, 0.42), (3.2, 0.42, 0.44), WARM, bev=0.0)
for i, x in enumerate(XS):
    torus('Socket_%02d' % i, (x, 0, 0.445), 0.11, 0.022, CHAR, axis='Z', seg=24, ring=8)
    pin = empty('Pin_%02d' % i, (x, 0, 0.0))
    cyl('Pin_%02d_Stem' % i, (x, 0, 0.62), 0.07, 0.36, IVORY, parent=pin, seg=24)
    cyl('Pin_%02d_Cap' % i, (x, 0, PIN_TOP - 0.025), 0.1, 0.05, IVORY, parent=pin, seg=24)
# The failing test's indicator: an amber rod sunk in a sleeve in front of its pin until that test fails.
box('FailRod_Sleeve', (XS[FAIL_INDEX] - 0.09, -0.72, 0.012), (XS[FAIL_INDEX] + 0.09, -0.54, 0.3), CHAR, bev=0.01)
cyl('FailRod', (XS[FAIL_INDEX], -0.63, 0.16), 0.065, 0.26, AMBER, seg=20)
FAIL_RISE = 0.85

# Selector plate with twelve holes, riding in two charcoal guides at the bed ends.
plate = box('Selector', (-3.15, -0.42, PLATE_Z[0]), (3.15, 0.42, PLATE_Z[1]), WARM, bev=0.0)
cut(plate, [cyl('SelHole_%02d' % i, (x, 0, 1.03), 0.13, 0.3, IVORY, seg=32) for i, x in enumerate(XS)])
for nm, s in (('L', -1), ('R', 1)):
    x0 = s * 3.2
    box('Guide' + nm + '_Post', (min(x0, x0 + s * 0.22), -0.12, 0.42), (max(x0, x0 + s * 0.22), 0.12, 1.12), IVORY, bev=0.01)
    box('Guide' + nm + '_Jaw', (min(x0 - s * 0.12, x0 + s * 0.22), -0.46, 0.94), (max(x0 - s * 0.12, x0 + s * 0.22), 0.46, 0.99), CHAR, bev=0.0)
    box('Guide' + nm + '_Lip', (min(x0 - s * 0.12, x0 + s * 0.22), -0.46, 1.07), (max(x0 - s * 0.12, x0 + s * 0.22), 0.46, 1.1), CHAR, bev=0.0)

# Gantry and probe head. The head beam is open underneath so plungers stay in view.
for nm, x in (('L', -3.75), ('R', 3.75)):
    box('Gantry' + nm, (x - 0.12, -0.14, 0.012), (x + 0.12, 0.14, 2.75), IVORY, bev=0.02)
    box('Gantry' + nm + '_Foot', (x - 0.24, -0.3, 0.012), (x + 0.24, 0.3, 0.12), WARM, bev=0.015)
box('Gantry_Beam', (-3.9, -0.16, 2.75), (3.9, 0.16, 2.92), IVORY, bev=0.02)
head = empty('ProbeHead', (0, 0, 2.0))
box('Head_Beam', (-3.1, -0.22, 1.98), (3.1, 0.22, 2.12), IVORY, parent=head, bev=0.02)
box('Head_Rail', (-3.1, -0.06, 2.12), (3.1, 0.06, 2.2), CHAR, parent=head, bev=0.0)
for nm, x in (('L', -3.6), ('R', 3.6)):
    box('Head_Shoe' + nm, (min(x, -3.1 if x < 0 else 3.1) - (0 if x < 0 else 0), -0.2, 1.98), (max(x, -3.1 if x < 0 else 3.1), 0.2, 2.12), WARM, parent=head, bev=0.01)
for i, x in enumerate(XS):
    cyl('Plunger_%02d' % i, (x, 0, (TIP_Z + 1.98) / 2), 0.055, 1.98 - TIP_Z, CHAR, parent=head, seg=20)
for nm, x in (('L', -1.6), ('R', 1.6)):
    cyl('Head_Screw' + nm, (x, 0, 2.9), 0.035, 1.5, CHAR, parent=head)

# Executed counter in front of the bed: a slot with a slider, engraved 0 and 12.
box('Counter_Body', (-1.75, -1.32, 0.012), (1.75, -0.88, 0.2), IVORY, bev=0.02)
box('Counter_Slot', (-1.45, -1.13, 0.2), (1.45, -1.07, 0.206), CHAR, bev=0.0)
for k in range(N + 1):
    x = -1.35 + 2.7 * k / N
    box('Counter_Tick_%02d' % k, (x - 0.008, -1.22, 0.2), (x + 0.008, -1.15 if k % 6 else -1.18, 0.206), CHAR, bev=0.0)
engrave('Counter_Zero', '0', (-1.59, -1.1, 0.2), 0.15, CHAR)
engrave('Counter_Twelve', '12', (1.6, -1.1, 0.2), 0.14, CHAR)
engrave('Counter_Label', 'TESTS RAN', (0, -0.98, 0.2), 0.1, CHAR)
slider = empty('Counter_Slider', (-1.35, -1.1, 0.2))
box('Counter_SliderBody', (-1.42, -1.17, 0.2), (-1.28, -1.03, 0.29), CHAR, parent=slider, bev=0.01)

# Patch socket on the left: patch 1 is installed; patch 2 waits on a tray; a spent tray sits behind.
box('Socket_Plate', (-3.75, -2.2, 0.012), (-2.85, -1.45, 0.07), CHAR, bev=0.01)
box('Socket_Lead', (-3.33, -1.45, 0.012), (-3.27, -0.5, 0.03), CHAR, bev=0.0)
empty('Socket_Seat', (-3.3, -1.82, 0.07))
box('Wait_Tray', (-2.55, -2.25, 0.012), (-1.85, -1.55, 0.05), WARM, bev=0.0)
empty('Wait_Seat', (-2.2, -1.9, 0.05))
box('Spent_Tray', (-4.05, -0.95, 0.012), (-3.45, -0.35, 0.05), WARM, bev=0.0)
box('Spent_Rim', (-4.05, -0.4, 0.05), (-3.45, -0.35, 0.12), CHAR, bev=0.0)
empty('Spent_Seat', (-3.75, -0.65, 0.05))


def patch_block(name, label, loc):
    p = empty(name, loc)
    x, y, z = loc
    box(name + '_Body', (x - 0.24, y - 0.2, z), (x + 0.24, y + 0.2, z + 0.26), IVORY, parent=p, bev=0.03)
    engrave(name + '_Num', label, (x, y, z + 0.26), 0.24, CHAR, parent=p)
    return p


patch_block('Patch_1', '1', (-3.3, -1.82, 0.07))
patch_block('Patch_2', '2', (-2.2, -1.9, 0.05))

# Route dial on the right: the lever points at the decision the evidence permits.
cyl('Dial_Base', (2.95, -1.75, 0.05), 0.95, 0.08, WARM, seg=64)
cyl('Dial_Hub', (2.95, -1.75, 0.13), 0.12, 0.08, CHAR, seg=24)
for nm, label, ang in (('Edit', 'EDIT', 58), ('Review', 'REVIEW', 0), ('Engineer', 'ENGINEER', -58)):
    a = math.radians(ang)
    dx, dy = -math.sin(a), math.cos(a)
    engrave('Dial_' + nm, label, (2.95 + 0.72 * dx, -1.75 + 0.72 * dy, 0.09), 0.12, CHAR, rot=(0, 0, a))
    box('Dial_Mark' + nm, (2.95 + 0.5 * dx - 0.02, -1.75 + 0.5 * dy - 0.02, 0.09), (2.95 + 0.5 * dx + 0.02, -1.75 + 0.5 * dy + 0.02, 0.1), CHAR, bev=0.0)
lever = empty('SwitchLever', (2.95, -1.75, 0.17))
box('Lever_Arm', (2.92, -1.75, 0.15), (2.98, -1.75 + 0.48, 0.2), CHAR, parent=lever, bev=0.0)
cyl('Lever_Knob', (2.95, -1.75 + 0.5, 0.2), 0.06, 0.08, CHAR, parent=lever, seg=20)
lever.rotation_euler.z = math.radians(180)   # neutral: pointing at the viewer, no decision yet

SCENE = {
    'title': 'Selected, executed, routed',
    'description': 'Evaluate the patch in the socket, or shift the selector plate first, and look between plate and pins to see whether any test actually ran.',
    # minAspect: below a 1.6 stage aspect the shared viewer widens vertical FOV so the
    # full bed (patch socket to route dial) stays in frame on narrow screens.
    'camera': {'position': [0.6, 5.4, 10.2], 'target': [0.0, 0.75, -0.55], 'minAspect': 1.6},
    'initialCaption': 'Patch 1 sits in the socket. The selector plate decides which of the twelve tests the probes can reach.',
    'interactionHint': 'Drag to look around · scroll to zoom',
    'fallback': 'With the selector aligned, the probes press all twelve pins: one failure sends patch 1 back for an edit, and a clean run on patch 2 stops for review. With the selector mistyped, the probes stop on the plate, the counter stays at zero and no assertions ran, so this repair-only loop stops and hands the command and logs to an engineer.',
}

PRESS = 0.15
REACH_OK = TIP_Z - (PIN_TOP - PRESS)
REACH_BLOCK = TIP_Z - PLATE_Z[1]


def debug_state(which):
    # Inspection renders only.
    head = bpy.data.objects['ProbeHead']
    lev = bpy.data.objects['SwitchLever']
    if which == 'handoff':
        bpy.data.objects['Selector'].location.x += SHIFT
        head.location.z -= REACH_BLOCK
        lev.rotation_euler.z = math.radians(-58)
    elif which == 'edit':
        head.location.z -= REACH_OK
        for i in range(N):
            bpy.data.objects['Pin_%02d' % i].location.z -= PRESS
        bpy.data.objects['FailRod'].location.z += FAIL_RISE
        bpy.data.objects['Counter_Slider'].location.x += 2.7
        lev.rotation_euler.z = math.radians(58)


finish(SCENE)

