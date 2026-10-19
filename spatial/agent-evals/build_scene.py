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
# Agent evals: an exposed two-lane input field. Each lane is a region of login inputs:
# EMPTY (empty password, must be rejected) and VALID (valid login, must be signed in).
# A patch is an arcaded wall across both lanes; a bricked-up arch or low barrier stops a probe,
# an open arch lets it through to the signed-in side. Patch A and Patch B ride one track so the
# reader can swap which patch stands across the field. Test probes are sleds that run up a lane;
# the runtime raycasts each probe against the active wall, so results come from the geometry.
# ---------------------------------------------------------------------------
LANES = {'Empty': -0.6, 'Valid': 0.6}
BAY = 0.52            # half bay width between piers
PARK = 3.0            # parked wall offset along X
START_Y = -1.45       # probe nose at the start of a run
SEAT_Y = 1.75         # probe nose where a signed-in probe comes to rest

box('Plinth', (-4.6, -2.7, -0.3), (4.6, 2.75, 0.0), STONE, bev=0.05)
box('Plinth_Top', (-4.45, -2.55, 0.0), (4.45, 2.6, 0.012), IVORY, bev=0.0)
# Input field: two lanes separated by a kerb, with a charcoal start line and a signed-in seat line.
box('Field', (-1.22, -2.0, 0.012), (1.22, 2.1, 0.026), WARM, bev=0.0)
box('Field_Kerb', (-0.035, -2.0, 0.026), (0.035, 2.1, 0.07), CHAR, bev=0.0)
for nm, x in LANES.items():
    box('Lane_' + nm + '_StartLine', (x - 0.4, START_Y - 0.62, 0.026), (x + 0.4, START_Y - 0.58, 0.034), CHAR, bev=0.0)
    box('Lane_' + nm + '_Guide', (x - 0.015, -1.95, 0.026), (x + 0.015, 2.05, 0.031), STONE, bev=0.0)
    empty('Lane_' + nm + '_Start', (x, START_Y, 0.3))
    empty('Lane_' + nm + '_Seat', (x, SEAT_Y, 0.3))
# The signed-in landing behind the wall: a low stepped terrace with a back stop.
box('Landing', (-1.2, 1.2, 0.026), (1.2, 2.08, 0.045), IVORY, bev=0.0)
box('Landing_Stop', (-1.2, 2.04, 0.045), (1.2, 2.1, 0.16), CHAR, bev=0.0)
engrave('Label_Empty', 'EMPTY', (LANES['Empty'], -2.3, 0.012), 0.2, CHAR)
engrave('Label_Valid', 'VALID', (LANES['Valid'], -2.3, 0.012), 0.2, CHAR)
engrave('Label_SignedIn', 'SIGNED IN', (0, 2.38, 0.012), 0.17, CHAR)
# Track the patch walls slide along, with parking pads either side of the field.
box('Track', (-4.35, -0.11, 0.012), (4.35, 0.11, 0.032), CHAR, bev=0.0)
for nm, x in (('L', -PARK), ('R', PARK)):
    box('ParkPad_' + nm, (x - 1.32, -0.42, 0.012), (x + 1.32, 0.42, 0.022), WARM, bev=0.0)
# A rack in front of the field holds the existing test when it is not part of the suite.
box('Rack', (1.45, -2.05, 0.012), (2.15, -0.9, 0.05), WARM, bev=0.0)
box('Rack_Rim', (2.1, -2.05, 0.05), (2.15, -0.9, 0.12), CHAR, bev=0.0)

slide = empty('PatchSlide', (0, 0, 0))


def patch_wall(tag, cx, bays):
    """bays maps lane name -> 'open', 'bricked' or 'barrier'."""
    w = empty(tag + '_Patch', (cx, 0, 0), parent=slide)
    X = lambda x: cx + x
    for i, px in enumerate((-1.2, 0.0, 1.2)):
        box(tag + '_Pier' + str(i), (X(px - 0.08), -0.14, 0.032), (X(px + 0.08), 0.14, 1.05), IVORY, parent=w)
        box(tag + '_Base' + str(i), (X(px - 0.11), -0.17, 0.032), (X(px + 0.11), 0.17, 0.12), WARM, parent=w, bev=0.01)
    for nm, lx in LANES.items():
        sp = box(tag + '_Spandrel' + nm, (X(lx - BAY - 0.01), -0.1, 0.48), (X(lx + BAY + 0.01), 0.1, 1.05), IVORY, parent=w, bev=0.0)
        cutter = cyl(tag + '_ArchCut' + nm, (X(lx), 0, 0.48), BAY - 0.02, 0.4, IVORY, axis='Y', seg=48)
        cut(sp, [cutter])
        kind = bays[nm]
        if kind == 'bricked':
            box(tag + '_Infill' + nm, (X(lx - BAY + 0.005), -0.05, 0.032), (X(lx + BAY - 0.005), 0.05, 0.98), WARM, parent=w, bev=0.0)
            for j, z in enumerate((0.26, 0.5, 0.74)):
                box(tag + '_Joint' + nm + str(j), (X(lx - BAY + 0.04), -0.062, z), (X(lx + BAY - 0.04), -0.05, z + 0.018), CHAR, parent=w, bev=0.0)
        elif kind == 'barrier':
            box(tag + '_Barrier' + nm, (X(lx - BAY + 0.005), -0.06, 0.032), (X(lx + BAY - 0.005), 0.06, 0.44), IVORY, parent=w, bev=0.01)
            box(tag + '_BarrierCap' + nm, (X(lx - BAY + 0.005), -0.075, 0.44), (X(lx + BAY - 0.005), 0.075, 0.47), CHAR, parent=w, bev=0.0)
    box(tag + '_Lintel', (X(-1.28), -0.16, 1.05), (X(1.28), 0.16, 1.18), IVORY, parent=w, bev=0.01)
    box(tag + '_Cornice', (X(-1.34), -0.21, 1.18), (X(1.34), 0.21, 1.25), WARM, parent=w, bev=0.012)
    box(tag + '_Plaque', (X(-0.22), -0.08, 1.25), (X(0.22), 0.08, 1.6), IVORY, parent=w, bev=0.015)
    engrave(tag + '_Letter', tag, (cx, -0.085, 1.425), 0.28, CHAR, rot=(math.radians(90), 0, 0), parent=w)
    return w


# Patch A rejects every login: both arches are bricked up. Patch B stops only the empty password.
patch_wall('A', 0.0, {'Empty': 'bricked', 'Valid': 'bricked'})
patch_wall('B', PARK, {'Empty': 'barrier', 'Valid': 'open'})


def probe(name, x, nose_y, kind):
    p = empty('Probe_' + name, (x, nose_y, 0.0))
    box(p.name + '_Sled', (x - 0.17, nose_y - 0.55, 0.032), (x + 0.17, nose_y, 0.09), CHAR, parent=p, bev=0.012)
    box(p.name + '_Nose', (x - 0.12, nose_y - 0.05, 0.09), (x + 0.12, nose_y, 0.2), CHAR, parent=p, bev=0.01)
    box(p.name + '_Post', (x - 0.03, nose_y - 0.33, 0.09), (x + 0.03, nose_y - 0.27, 0.2), IVORY, parent=p, bev=0.0)
    if kind == 'ring':
        # Empty password: an open ring with nothing inside.
        torus(p.name + '_Ring', (x, nose_y - 0.3, 0.38), 0.17, 0.045, IVORY, axis='Y', parent=p)
    else:
        # Valid login: a toothed key pointing at the wall.
        torus(p.name + '_Bow', (x, nose_y - 0.42, 0.33), 0.11, 0.04, IVORY, axis='X', parent=p)
        box(p.name + '_Shaft', (x - 0.035, nose_y - 0.32, 0.29), (x + 0.035, nose_y - 0.02, 0.37), IVORY, parent=p, bev=0.008)
        for i, (dy, z) in enumerate(((0.06, 0.2), (0.13, 0.24), (0.2, 0.18), (0.27, 0.23))):
            box(p.name + '_Tooth' + str(i), (x - 0.035, nose_y - dy - 0.05, z), (x + 0.035, nose_y - dy, 0.29), IVORY, parent=p, bev=0.0)
    # Raised only when this check fails.
    flag = empty(p.name + '_Flag', (x + 0.12, nose_y - 0.5, 0.09), parent=p)
    box(p.name + '_FlagPole', (x + 0.1, nose_y - 0.52, 0.09), (x + 0.14, nose_y - 0.48, 0.82), CHAR, parent=flag, bev=0.0)
    mesh_obj(p.name + '_FlagCloth', [(x + 0.14, nose_y - 0.515, 0.5), (x + 0.5, nose_y - 0.515, 0.64), (x + 0.14, nose_y - 0.515, 0.8),
                                     (x + 0.14, nose_y - 0.485, 0.5), (x + 0.5, nose_y - 0.485, 0.64), (x + 0.14, nose_y - 0.485, 0.8)],
             [(0, 1, 2), (5, 4, 3), (0, 3, 4, 1), (1, 4, 5, 2), (2, 5, 3, 0)], AMBER, (x + 0.3, nose_y - 0.5, 0.64), parent=flag)
    return p


# Initial still state: the new test has run against Patch A and its probe rests against the bricked arch.
probe('Empty', LANES['Empty'], -0.075, 'ring')
probe('Valid', 1.8, -1.0, 'key')   # parked on the rack, not in the suite
empty('Rack_Seat', (1.8, -1.0, 0.0))

SCENE = {
    'title': 'Coverage decides what a patch reveals',
    'description': 'Swap the patch standing across two input lanes, and add or remove the existing login test, to see which defects the suite can reach.',
    'camera': {'position': [0.9, 7.0, 5.7], 'target': [0.45, 0.1, -0.2]},
    'initialCaption': 'Patch A stops the empty-password probe, so it passes the new test. Nothing probes the valid-login lane.',
    'interactionHint': 'Drag to look around · scroll to zoom',
    'fallback': 'Both patches stop the empty-password probe, so the new test alone cannot tell them apart. Patch A has also bricked up the valid-login lane, which only the existing login test reaches; Patch B passes both, which supports further review rather than a release guarantee.',
}


def debug_state(which):
    # Inspection renders only (not the shipped poster).
    if which == 'b-both':
        bpy.data.objects['PatchSlide'].location.x = -PARK
        bpy.data.objects['Probe_Empty'].location.y = -0.085
        bpy.data.objects['Probe_Valid'].location = (LANES['Valid'], SEAT_Y, 0)
    elif which == 'a-both':
        bpy.data.objects['Probe_Valid'].location = (LANES['Valid'], -0.075, 0)
        for c in bpy.data.objects['Probe_Valid_Flag'].children:
            c.hide_render = False


def hide_flags():
    for nm in ('Probe_Empty_Flag', 'Probe_Valid_Flag'):
        for c in bpy.data.objects[nm].children:
            c.hide_render = True


finish(SCENE, poster_overrides=hide_flags)

