import bpy, bmesh, os, math
from mathutils import Vector, Matrix

# Shared helpers (duplicated per concept so each scene source stays self-contained).
# Blender axes: Z up. glTF export converts to Three's Y-up: (x, y, z) -> (x, z, -y).
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, '..', '..'))
CID = os.path.basename(HERE)
OUT = os.path.join(ROOT, 'public', 'spatial', CID)
os.makedirs(OUT, exist_ok=True)
bpy.ops.wm.read_factory_settings(use_empty=True)
bpy.context.preferences.filepaths.save_version = 0
scene = bpy.context.scene
COL = scene.collection


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
WARM = mat('IvoryWarm', '#e1d9c6')
STONE = mat('Stone', '#d3ccbc')
CHAR = mat('Charcoal', '#2f2e2b', 0.7)
AMBER = mat('Amber', '#d8952a', 0.55)


def set_parent(ob, parent):
    bpy.context.view_layer.update()
    basis = ob.matrix_basis.copy()
    ob.parent = parent
    ob.matrix_parent_inverse = Matrix.Identity(4)
    ob.matrix_basis = parent.matrix_world.inverted() @ basis


def _finish(ob, m, parent, bevel):
    COL.objects.link(ob)
    if m is not None:
        ob.data.materials.append(m)
    if bevel:
        mod = ob.modifiers.new('Bevel', 'BEVEL')
        mod.width = bevel
        mod.segments = 2
        mod.limit_method = 'ANGLE'
    if parent is not None:
        set_parent(ob, parent)
    return ob


def empty(name, loc, parent=None):
    e = bpy.data.objects.new(name, None)
    e.empty_display_size = 0.2
    e.location = loc
    COL.objects.link(e)
    if parent is not None:
        set_parent(e, parent)
    return e


def box(name, mn, mx, m=None, origin=None, parent=None, bevel=0.015):
    mn, mx = Vector(mn), Vector(mx)
    o = Vector(origin) if origin is not None else (mn + mx) / 2
    bm = bmesh.new()
    bmesh.ops.create_cube(bm, size=1.0)
    for v in bm.verts:
        v.co = Vector((mn.x + (v.co.x + 0.5) * (mx.x - mn.x),
                       mn.y + (v.co.y + 0.5) * (mx.y - mn.y),
                       mn.z + (v.co.z + 0.5) * (mx.z - mn.z))) - o
    me = bpy.data.meshes.new(name)
    bm.to_mesh(me)
    bm.free()
    ob = bpy.data.objects.new(name, me)
    ob.location = o
    small = min(mx.x - mn.x, mx.y - mn.y, mx.z - mn.z)
    return _finish(ob, m, parent, min(bevel, small * 0.3) if bevel else 0)


def _smooth_sides(me):
    for p in me.polygons:
        p.use_smooth = len(p.vertices) == 4


def cyl(name, center, r, depth, m=None, r2=None, seg=24, parent=None, rot=(0, 0, 0)):
    bm = bmesh.new()
    bmesh.ops.create_cone(bm, cap_ends=True, cap_tris=False, segments=seg, radius1=r,
                          radius2=r if r2 is None else r2, depth=depth)
    me = bpy.data.meshes.new(name)
    bm.to_mesh(me)
    bm.free()
    _smooth_sides(me)
    ob = bpy.data.objects.new(name, me)
    ob.location = center
    ob.rotation_euler = rot
    return _finish(ob, m, parent, 0)


def rod(name, p0, p1, r, m=None, parent=None, seg=12):
    p0, p1 = Vector(p0), Vector(p1)
    d = p1 - p0
    ob = cyl(name, (p0 + p1) / 2, r, d.length, m, seg=seg)
    ob.rotation_euler = d.to_track_quat('Z', 'Y').to_euler()
    if parent is not None:
        set_parent(ob, parent)
    return ob


def sphere(name, center, r, m=None, parent=None):
    bm = bmesh.new()
    bmesh.ops.create_uvsphere(bm, u_segments=20, v_segments=12, radius=r)
    me = bpy.data.meshes.new(name)
    bm.to_mesh(me)
    bm.free()
    for p in me.polygons:
        p.use_smooth = True
    ob = bpy.data.objects.new(name, me)
    ob.location = center
    return _finish(ob, m, parent, 0)


def label(name, s, loc, size, m=None, rot=(0, 0, 0), parent=None, extrude=0.006):
    cu = bpy.data.curves.new(name + '_text', 'FONT')
    cu.body = s
    cu.size = size
    cu.extrude = extrude
    cu.align_x = 'CENTER'
    cu.align_y = 'CENTER'
    tmp = bpy.data.objects.new(name + '_tmp', cu)
    COL.objects.link(tmp)
    dg = bpy.context.evaluated_depsgraph_get()
    me = bpy.data.meshes.new_from_object(tmp.evaluated_get(dg))
    bpy.data.objects.remove(tmp)
    ob = bpy.data.objects.new(name, me)
    ob.location = loc
    ob.rotation_euler = rot
    return _finish(ob, CHAR if m is None else m, parent, 0)


def figure(name, base, facing, m=None, h=1.1, badge=None):
    """Architect's scale figure. Its front faces Blender -Y before 'facing' (Z rotation) is applied."""
    m = CHAR if m is None else m
    bx, by, bz = base
    root = empty(name, (bx, by, bz))
    cyl(name + '_legs', (bx, by, bz + 0.22 * h), 0.12 * h, 0.44 * h, m, r2=0.13 * h, parent=root)
    cyl(name + '_body', (bx, by, bz + 0.6 * h), 0.15 * h, 0.34 * h, m, r2=0.12 * h, parent=root)
    sphere(name + '_head', (bx, by, bz + 0.88 * h), 0.11 * h, m, parent=root)
    box(name + '_badge', (bx - 0.06 * h, by - 0.16 * h, bz + 0.58 * h), (bx + 0.06 * h, by - 0.13 * h, bz + 0.7 * h),
        badge if badge is not None else IVORY, parent=root, bevel=0)
    root.rotation_euler = (0, 0, facing)
    return root


def three_to_blender(p):
    return Vector((p[0], -p[2], p[1]))


def finish(camera, hidden=(), size=(1200, 800), debug_pose=None):
    """Save .blend, export GLB, then render the poster from the scene.json camera."""
    bpy.context.view_layer.update()
    bpy.ops.wm.save_as_mainfile(filepath=os.path.join(HERE, 'scene.blend'))
    bpy.ops.export_scene.gltf(filepath=os.path.join(OUT, 'scene.glb'), export_format='GLB', export_yup=True,
                              export_apply=True, export_cameras=False, export_lights=False)
    if os.environ.get('POSE') and debug_pose:
        debug_pose()
        hidden = ()
    for n in hidden:
        ob = bpy.data.objects[n]
        for o in [ob, *ob.children_recursive]:
            o.hide_render = True
    cd = bpy.data.cameras.new('PosterCam')
    cd.sensor_fit = 'VERTICAL'
    cd.angle = math.radians(camera.get('fov', 38))
    cam = bpy.data.objects.new('PosterCam', cd)
    COL.objects.link(cam)
    if os.environ.get('POSE_CAM'):
        import json
        camera = dict(camera, **json.loads(os.environ['POSE_CAM']))
    cam.location = three_to_blender(camera['position'])
    tgt = three_to_blender(camera['target'])
    cam.rotation_euler = (tgt - cam.location).to_track_quat('-Z', 'Y').to_euler()
    scene.camera = cam
    scene.render.engine = 'BLENDER_EEVEE'
    sun = bpy.data.objects.new('PosterSun', bpy.data.lights.new('PosterSun', 'SUN'))
    sun.data.energy = 2.0
    sun.data.angle = math.radians(6)
    COL.objects.link(sun)
    sun.rotation_euler = (Vector((0, 0, 0)) - three_to_blender((-6, 12, 8))).to_track_quat('-Z', 'Y').to_euler()
    scene.world = bpy.data.worlds.new('World')
    scene.world.use_nodes = True
    bg = scene.world.node_tree.nodes['Background']
    bg.inputs['Color'].default_value = (*srgb('#f2f0e9'), 1)
    bg.inputs['Strength'].default_value = 1.0
    scene.view_settings.view_transform = 'Standard'
    scene.view_settings.exposure = 0.0
    scene.render.film_transparent = False
    scene.eevee.taa_render_samples = 32
    scene.render.resolution_x, scene.render.resolution_y = size
    scene.render.threads_mode = 'FIXED'
    scene.render.threads = 2
    scene.render.filepath = os.environ.get('POSE_OUT') if os.environ.get('POSE') else os.path.join(OUT, 'poster.png')
    bpy.ops.render.render(write_still=True)
# ---------------------------------------------------------------------------
# Human-in-the-loop: release crates carry their artifact digest as a keel profile
# that is only visible from the executor's end. The executor's gate holds an amber
# approval plate cut from crate A. Swap in B, or approve only the task name.
# Run: /opt/homebrew/bin/blender --background --threads 2 --python spatial/human-in-the-loop/build_scene.py
CAMERA = {'position': [8.9, 6.4, 10.0], 'target': [-0.3, 0.3, 0.0], 'fov': 38}

RAIL_Z = 0.16                  # top of rails; crate roots sit here
BODY_Z = 0.42                  # crate body bottom, above the keel zone
TEETH_Y = (-0.34, -0.17, 0.0, 0.17, 0.34)
TOOTH_W = 0.12
DIGEST = {'A': (0.34, 0.12, 0.28, 0.08, 0.30),
          'B': (0.34, 0.28, 0.28, 0.24, 0.16)}
GATE_X = 1.6
SPOTS = {'Spot_wait': (-0.6, 0.0, RAIL_Z), 'Spot_bench': (-3.6, 1.55, 0.8),
         'Spot_blocked': (GATE_X - 0.035 - 0.65 - 0.01, 0.0, RAIL_Z),
         'Spot_prod': (3.75, 0.0, RAIL_Z), 'Spot_aside': (-0.6, 1.75, 0.0)}

box('Plinth', (-5.4, -2.9, -0.3), (5.4, 2.9, 0.0), STONE, bevel=0.05)

# Track: bed, two rails, and the production platform at the far end.
box('Track_bed', (-1.8, -0.72, 0.0), (2.7, 0.72, 0.1), IVORY, bevel=0.02)
box('Prod_platform', (2.7, -1.25, 0.0), (5.0, 1.25, 0.1), WARM, bevel=0.03)
box('Prod_edge', (4.92, -1.25, 0.1), (5.0, 1.25, 0.3), CHAR)
label('Prod_label', 'production', (3.85, -1.0, 0.1), 0.22)
for k, s in enumerate((-1, 1)):
    box('Rail_%d' % k, (-1.8, s * 0.5 - 0.035, 0.1), (4.9, s * 0.5 + 0.035, RAIL_Z), CHAR, bevel=0)
for n in range(15):
    x = -1.6 + n * 0.45
    box('Sleeper_%02d' % n, (x - 0.05, -0.62, 0.08), (x + 0.05, 0.62, 0.11), WARM, bevel=0)


def crate(tag, at):
    root = empty('Crate_' + tag, at)
    x, y, z = at
    L, W = 0.65, 0.6
    box('Crate_%s_body' % tag, (x - L, y - W, z + BODY_Z), (x + L, y + W, z + 1.15), IVORY, parent=root, bevel=0.03)
    for k, s in enumerate((-1, 1)):
        box('Crate_%s_runner%d' % (tag, k), (x - L + 0.05, y + s * 0.5 - 0.055, z), (x + L - 0.05, y + s * 0.5 + 0.055, z + BODY_Z), CHAR, parent=root)
    for k, ty in enumerate(TEETH_Y):
        d = DIGEST[tag][k]
        box('Crate_%s_tooth%d' % (tag, k), (x - L + 0.02, y + ty - TOOTH_W / 2, z + BODY_Z - d), (x + L - 0.02, y + ty + TOOTH_W / 2, z + BODY_Z), CHAR, parent=root, bevel=0.006)
    # The same task label on both crates: what the reviewer reads from above.
    box('Crate_%s_tag' % tag, (x - 0.42, y - 0.22, z + 1.15), (x + 0.42, y + 0.22, z + 1.18), WARM, parent=root, bevel=0.008)
    label('Crate_%s_tagText' % tag, 'checkout', (x, y, z + 1.185), 0.16, parent=root)
    for k, sy in enumerate((-1, 1)):
        label('Crate_%s_letter%d' % (tag, k), tag, (x, y + sy * (W + 0.004), z + 0.8), 0.32,
              rot=(math.pi / 2, 0, 0 if sy < 0 else math.pi), parent=root)
    for k, sx in enumerate((-1, 1)):
        box('Crate_%s_band%d' % (tag, k), (x + sx * 0.45 - 0.04, y - W - 0.01, z + BODY_Z), (x + sx * 0.45 + 0.04, y + W + 0.01, z + 1.15), WARM, parent=root, bevel=0.004)
    return root


crate('A', SPOTS['Spot_wait'])
crate('B', SPOTS['Spot_bench'])
for name, p in SPOTS.items():
    empty(name, p)

# Agent's preparation bench with B on it.
box('Bench_top', (-4.6, 0.75, 0.7), (-2.6, 2.35, 0.8), WARM, bevel=0.02)
for k, (bx, by) in enumerate(((-4.5, 0.85), (-2.7, 0.85), (-4.5, 2.25), (-2.7, 2.25))):
    box('Bench_leg%d' % k, (bx - 0.05, by - 0.05, 0.0), (bx + 0.05, by + 0.05, 0.7), CHAR, bevel=0)
figure('Agent', (-3.6, 2.6, 0.0), math.pi, CHAR, h=1.05)
label('Bench_label', 'agent prepares', (-3.6, 0.45, 0.0), 0.2)

# Reviewer on a dais beside the waiting position, looking down at the crate's top.
cyl('Review_dais', (-0.6, -1.75, 0.08), 0.5, 0.16, WARM, seg=40)
figure('Reviewer', (-0.6, -1.75, 0.16), 0.0, CHAR, h=1.15)
label('Review_label', 'reviewer', (-0.6, -2.5, 0.0), 0.2)

# Executor gate: portal frame, sill and the approval plate.
for k, s in enumerate((-1, 1)):
    box('Gate_post%d' % k, (GATE_X - 0.1, s * 0.86 - 0.1, 0.0), (GATE_X + 0.1, s * 0.86 + 0.1, 1.7), IVORY, bevel=0.02)
box('Gate_beam', (GATE_X - 0.14, -0.98, 1.6), (GATE_X + 0.14, 0.98, 1.78), IVORY, bevel=0.02)
box('Gate_sill', (GATE_X - 0.08, -0.76, 0.1), (GATE_X + 0.08, 0.76, RAIL_Z - 0.005), CHAR, bevel=0)
label('Gate_label', 'executor', (GATE_X, 0.0, 1.785), 0.15, rot=(0, 0, math.pi / 2))

art = empty('Approval_artifact', (GATE_X, 0.0, RAIL_Z))
top = RAIL_Z + BODY_Z
edges = [-0.43]
for ty in TEETH_Y:
    edges += [ty - 0.065, ty + 0.065]
edges.append(0.43)
# Full-height plate between notches, notched exactly to A's tooth depths.
for k in range(0, len(edges), 2):
    y0, y1 = edges[k], edges[k + 1]
    if y1 - y0 > 0.005:
        box('Approval_artifact_web%d' % k, (GATE_X - 0.035, y0, RAIL_Z), (GATE_X + 0.035, y1, top - 0.012), AMBER, parent=art, bevel=0)
for k, ty in enumerate(TEETH_Y):
    h = top - DIGEST['A'][k] - 0.025
    box('Approval_artifact_notch%d' % k, (GATE_X - 0.035, ty - 0.065, RAIL_Z), (GATE_X + 0.035, ty + 0.065, h), AMBER,
        origin=(GATE_X, ty, RAIL_Z), parent=art, bevel=0)



def blocked_pose():
    bpy.data.objects['Crate_A'].location = SPOTS['Spot_bench']
    bpy.data.objects['Crate_B'].location = SPOTS['Spot_blocked']


finish(CAMERA, debug_pose=blocked_pose)

