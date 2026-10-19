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
# Orchestration patterns: one frozen snapshot on a pedestal, two read-only reviewer booths that
# each see one face of it, and a join cradle that only accepts reports whose imprint matches the
# snapshot's key ridge. Version 2 is the snapshot after the engineer edits the patch.
# ---------------------------------------------------------------------------
box('Plinth', (-4.2, -3.4, -0.3), (4.2, 3.0, 0.0), STONE, bev=0.05)
box('Plinth_Top', (-4.05, -3.25, 0.0), (4.05, 2.85, 0.012), IVORY, bev=0.0)

SX, SY = 0.0, 0.9          # snapshot centre
PED_TOP = 0.42
box('Pedestal', (SX - 0.95, SY - 0.75, 0.012), (SX + 0.95, SY + 0.75, PED_TOP), WARM, bev=0.03)
box('Pedestal_Band', (SX - 0.99, SY - 0.79, 0.012), (SX + 0.99, SY + 0.79, 0.08), CHAR, bev=0.0)

BW, BD, BH = 1.2, 0.9, 0.75  # snapshot block width (x), depth (y), height
KEYS = {1: (0.10, 0.22, 0.06, 0.18, 0.12), 2: (0.16, 0.06, 0.20, 0.10, 0.20)}
TEETH_X = [SX - BW / 2 + 0.12 + i * (BW - 0.24) / 4 for i in range(5)]


def snapshot(v):
    root = empty('Snapshot_v%d' % v, (SX, SY, PED_TOP))
    z0, z1 = PED_TOP, PED_TOP + BH
    box('Snapshot_v%d_Core' % v, (SX - BW / 2, SY - BD / 2, z0), (SX + BW / 2, SY + BD / 2, z1), IVORY, parent=root, bev=0.02)
    # Key ridge on top: the snapshot identifier as physical profile.
    for i, (x, h) in enumerate(zip(TEETH_X, KEYS[v])):
        box('Snapshot_v%d_Key%d' % (v, i), (x - 0.09, SY - 0.12, z1), (x + 0.09, SY + 0.12, z1 + h), CHAR, parent=root, bev=0.0)
    # API face (-X): four call ports.
    for i, y in enumerate((-0.3, -0.1, 0.1, 0.3)):
        cyl('Snapshot_v%d_Port%d' % (v, i), (SX - BW / 2 - 0.05, SY + y, z0 + 0.4), 0.06, 0.1, CHAR, axis='X', parent=root)
        box('Snapshot_v%d_PortPlate%d' % (v, i), (SX - BW / 2 - 0.02, SY + y - 0.08, z0 + 0.3), (SX - BW / 2, SY + y + 0.08, z0 + 0.5), WARM, parent=root, bev=0.0)
    # Migration face (+X): stacked table rows. Version 1 drops a column under rows still in use:
    # the third row is cut short, leaving a recess. Version 2 keeps the row whole.
    for i in range(5):
        zz = z0 + 0.08 + i * 0.13
        depth = 0.12 if (v == 1 and i == 2) else 0.0
        box('Snapshot_v%d_Row%d' % (v, i), (SX + BW / 2 - depth, SY - 0.38, zz), (SX + BW / 2 + 0.06, SY + 0.38, zz + 0.09), WARM if not (v == 1 and i == 2) else CHAR, parent=root, bev=0.0)
    if v == 2:
        root.location.z -= 0.9  # parked inside the pedestal until the patch is edited
    return root


snapshot(1)
snapshot(2)
# Pedestal is drawn last so the parked version sits inside it (hollow core is not needed: opaque).


def booth(tag, cx, facing):
    # facing = +1 window faces +X, -1 faces -X. Window frames only the snapshot face toward it.
    root = empty('Booth_' + tag, (cx, SY, 0.0))
    w, d, h = 0.75, 0.8, 1.35
    x0, x1 = cx - w / 2, cx + w / 2
    wall = box('Booth_%s_Shell' % tag, (x0, SY - d / 2, 0.012), (x1, SY + d / 2, h), IVORY, parent=root, bev=0.0)
    wx = x1 if facing > 0 else x0
    cut(wall, [box('Win', (wx - 0.12, SY - 0.24, 0.5), (wx + 0.12, SY + 0.24, 0.95), CHAR, bev=0.0),
               box('Hollow', (x0 + 0.07, SY - d / 2 + 0.07, 0.08), (x1 - 0.07, SY + d / 2 - 0.07, h - 0.07), CHAR, bev=0.0),
               box('Slot', (cx - 0.22, SY - d / 2 - 0.1, 0.16), (cx + 0.22, SY - d / 2 + 0.1, 0.24), CHAR, bev=0.0)])
    bevel(wall, 0.01)
    # Glazing: read-only, the worker can look but has no opening onto the snapshot.
    box('Booth_%s_Glass' % tag, (wx - 0.012, SY - 0.24, 0.5), (wx + 0.012, SY + 0.24, 0.95), STONE, parent=root, bev=0.0)
    box('Booth_%s_Mullion' % tag, (wx - 0.02, SY - 0.015, 0.5), (wx + 0.02, SY + 0.015, 0.95), CHAR, parent=root, bev=0.0)
    box('Booth_%s_Roof' % tag, (x0 - 0.06, SY - d / 2 - 0.06, h), (x1 + 0.06, SY + d / 2 + 0.06, h + 0.08), WARM, parent=root)
    # The worker inside, looking out through the window.
    cyl('Booth_%s_Worker' % tag, (cx - 0.08 * facing, SY, 0.4), 0.11, 0.62, CHAR, parent=root, r2=0.07)
    bm = bmesh.new()
    bmesh.ops.create_uvsphere(bm, u_segments=16, v_segments=10, radius=0.085)
    hd = from_bm('Booth_%s_WorkerHead' % tag, bm, CHAR, (cx - 0.08 * facing, SY, 0.8), parent=root)
    for p in hd.data.polygons:
        p.use_smooth = True
    # Sight cone guide on the floor: a faint wedge from window to the face it can see.
    fx = SX - BW / 2 - 0.08 if facing > 0 else SX + BW / 2 + 0.08
    mesh_obj('Booth_%s_Sightline' % tag, [(wx, SY - 0.2, 0.014), (fx, SY - 0.42, 0.014), (fx, SY + 0.42, 0.014), (wx, SY + 0.2, 0.014),
                                          (wx, SY - 0.2, 0.02), (fx, SY - 0.42, 0.02), (fx, SY + 0.42, 0.02), (wx, SY + 0.2, 0.02)],
             BOX_F_TRAP, WARM, (wx, SY, 0.014), parent=root)
    # Exit chute from the slot toward the join cradle.
    return root


BOX_F_TRAP = [(0, 1, 2, 3), (4, 7, 6, 5), (0, 4, 5, 1), (1, 5, 6, 2), (2, 6, 7, 3), (3, 7, 4, 0)]
booth('Compat', -2.75, +1)
booth('Migr', 2.75, -1)

# Join cradle: two slots with a key ridge negative per slot is carried by the tablets themselves.
CY = -1.35
box('Cradle_Base', (-1.15, CY - 0.35, 0.012), (1.15, CY + 0.35, 0.16), WARM, bev=0.02)
box('Cradle_Back', (-1.15, CY + 0.25, 0.16), (1.15, CY + 0.35, 0.55), WARM, bev=0.01)
box('Cradle_Divider', (-0.04, CY - 0.3, 0.16), (0.04, CY + 0.25, 0.4), CHAR, bev=0.0)
# Reference ridge on the cradle back wall is NOT provided: the match is made against the snapshot itself.
for nm, x in (('L', -0.58), ('R', 0.58)):
    box('Cradle_Slot' + nm, (x - 0.45, CY - 0.06, 0.155), (x + 0.45, CY + 0.06, 0.165), CHAR, bev=0.0)
    empty('Cradle_Seat' + nm, (x, CY, 0.16))

# Tablets: the report imprint copies the key ridge of the snapshot each worker read.
TW = 0.82


def tablet(name, x, y, v, blocking):
    t = empty(name, (x, y, 0.16))
    box(name + '_Slab', (x - TW / 2, y - 0.05, 0.16), (x + TW / 2, y + 0.05, 0.72), IVORY, parent=t, bev=0.012)
    for i, h in enumerate(KEYS[v]):
        tx = x - TW / 2 + 0.1 + i * (TW - 0.2) / 4
        box(name + '_Imprint%d' % i, (tx - 0.06, y - 0.06, 0.72), (tx + 0.06, y + 0.06, 0.72 + h * 0.7), CHAR, parent=t, bev=0.0)
    for k in range(3):
        box(name + '_Line%d' % k, (x - 0.28, y - 0.065, 0.32 + 0.1 * k), (x + 0.18 - 0.12 * (k % 2), y - 0.05, 0.345 + 0.1 * k), CHAR, parent=t, bev=0.0)
    if blocking:
        box(name + '_Blocker', (x + 0.22, y - 0.075, 0.3), (x + 0.36, y - 0.05, 0.56), AMBER, parent=t, bev=0.0)
    return t


# Parked inside each booth (hidden by the shell) until dispatched.
for tag, bx in (('Compat', -2.75), ('Migr', 2.75)):
    for v in (1, 2):
        t = tablet('Report_%s_v%d' % (tag, v), bx, SY, v, tag == 'Migr' and v == 1)
        t.scale = (0.4, 0.4, 0.4)
        t.location.z = 0.18
    empty('Booth_%s_Exit' % tag, (bx, SY - 0.55, 0.16))

# Stale tray where invalidated reports are set aside.
box('Stale_Tray', (-3.15, -1.75, 0.012), (-1.55, -0.95, 0.07), STONE, bev=0.01)
for nm, y in (('F', -1.75), ('B', -0.99)):
    box('Stale_TrayLip' + nm, (-3.15, y, 0.07), (-1.55, y + 0.04, 0.12), CHAR, bev=0.0)
empty('Stale_SeatL', (-2.35, -1.6, 0.07))
empty('Stale_SeatR', (-2.35, -1.15, 0.07))

# Handoff lines engraved in the base from each booth slot to its cradle seat.
for nm, pts in (('Compat', [(-2.75, 0.3), (-2.75, -0.55), (-0.58, -0.55), (-0.58, -1.0)]),
                ('Migr', [(2.75, 0.3), (2.75, -0.55), (0.58, -0.55), (0.58, -1.0)])):
    for i in range(len(pts) - 1):
        (ax, ay), (bx2, by) = pts[i], pts[i + 1]
        box('Handoff_%s_%d' % (nm, i), (min(ax, bx2) - 0.02, min(ay, by) - 0.02, 0.012), (max(ax, bx2) + 0.02, max(ay, by) + 0.02, 0.02), CHAR, bev=0.0)

# Approval gate toward the engineer's desk; the arm rises only when both reports match the snapshot.
GX, GY = 1.0, -2.25
box('Gate_Post', (GX - 0.08, GY - 0.08, 0.012), (GX + 0.08, GY + 0.08, 0.6), CHAR, bev=0.01)
arm = empty('Gate_Arm', (GX, GY, 0.5))
box('Gate_ArmBar', (GX - 1.05, GY - 0.03, 0.47), (GX - 0.08, GY + 0.03, 0.53), AMBER, parent=arm, bev=0.0)
box('Gate_ArmCounter', (GX + 0.08, GY - 0.05, 0.45), (GX + 0.3, GY + 0.05, 0.55), CHAR, parent=arm, bev=0.0)
box('Desk', (-0.5, -3.15, 0.35), (1.6, -2.65, 0.42), WARM, bev=0.015)
for x in (-0.45, 1.5):
    box('Desk_Leg%d' % int(x * 10), (x, -3.1, 0.012), (x + 0.06, -2.7, 0.35), WARM, bev=0.0)
eng = empty('Engineer', (0.55, -3.45, 0.012))
cyl('Engineer_Body', (0.55, -3.45, 0.32), 0.13, 0.6, CHAR, parent=eng, r2=0.08)
bm = bmesh.new()
bmesh.ops.create_uvsphere(bm, u_segments=16, v_segments=10, radius=0.1)
eh = from_bm('Engineer_Head', bm, CHAR, (0.55, -3.45, 0.72), parent=eng)
for p in eh.data.polygons:
    p.use_smooth = True
empty('Desk_SeatL', (0.15, -2.9, 0.42))
empty('Desk_SeatR', (0.95, -2.9, 0.42))

SCENE = {
    'title': 'Two windows, one snapshot',
    'description': 'Send two read-only reviewers to the same frozen snapshot, then edit the patch and see which reports still fit.',
    'camera': {'position': [5.6, 7.0, 8.0], 'target': [0, -0.15, 0.4]},
    'initialCaption': 'Each reviewer’s window faces one side of the same frozen snapshot.',
    'interactionHint': 'Drag to look around · scroll to zoom',
    'fallback': 'The compatibility reviewer can only see the API side and the migration reviewer only the table side, so the join needs both reports. Each report carries the key profile of the snapshot it read; after the patch changes, the old reports no longer match and the gate stays closed until both reviewers report on the new snapshot.',
}


def debug_state(which):
    for tag, seat in (('Compat', 'L'), ('Migr', 'R')):
        t = bpy.data.objects['Report_%s_v1' % tag]
        s = bpy.data.objects['Cradle_Seat' + seat]
        t.scale = (1, 1, 1)
        t.location = Vector((s.location.x, s.location.y, s.location.z))
    bpy.data.objects['Gate_Arm'].rotation_euler.y = math.radians(75) if which == 'open' else 0


finish(SCENE, hide_in_poster=[o.name for o in bpy.data.objects if o.name.startswith('Snapshot_v2') or o.name.startswith('Report_')])

