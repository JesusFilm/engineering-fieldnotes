# Timeouts and retries: one tool call, nested retry layers, counted at the service.
# Run from the repository root:
#   /opt/homebrew/bin/blender --background --threads 2 --python spatial/timeouts-and-retries/build_scene.py
# Blender axes: X across the frame, Y depth (front at -Y), Z up.
CID = 'timeouts-and-retries'
import bpy, bmesh, os, math
from mathutils import Vector

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, '..', '..'))
OUT = os.path.join(ROOT, 'public', 'spatial', CID)
os.makedirs(OUT, exist_ok=True)
bpy.ops.wm.read_factory_settings(use_empty=True)
bpy.context.preferences.filepaths.save_version = 0
scene = bpy.context.scene


def srgb(h):
    h = h.lstrip('#')
    c = [int(h[i:i + 2], 16) / 255 for i in (0, 2, 4)]
    return tuple(((x + 0.055) / 1.055) ** 2.4 if x > 0.04045 else x / 12.92 for x in c)


def mat(name, hexcol, rough=0.85, alpha=1.0):
    rgb = srgb(hexcol)
    m = bpy.data.materials.new(name)
    try:
        m.use_nodes = True
    except Exception:
        pass
    nt = m.node_tree
    b = nt.nodes.get('Principled BSDF')
    if b is None:
        b = nt.nodes.new('ShaderNodeBsdfPrincipled')
        out = nt.nodes.get('Material Output') or nt.nodes.new('ShaderNodeOutputMaterial')
        nt.links.new(b.outputs[0], out.inputs[0])
    b.inputs['Base Color'].default_value = (*rgb, 1)
    b.inputs['Roughness'].default_value = rough
    if alpha < 1:
        b.inputs['Alpha'].default_value = alpha
    m.diffuse_color = (*rgb, alpha)
    return m


IVORY = mat('Ivory', '#efebe1')
WARM = mat('IvoryWarm', '#e4ddcd')
STONE = mat('Stone', '#d9d3c5')
CHAR = mat('Charcoal', '#2f2e2b')
AMBER = mat('Amber', '#e2a23b', 0.6)


def link(ob, parent=None):
    bpy.context.collection.objects.link(ob)
    if parent is not None:
        bpy.context.view_layer.update()
        mw = ob.matrix_world.copy()
        ob.parent = parent
        ob.matrix_world = mw
    bpy.context.view_layer.update()
    return ob


def finish(name, bm, m, loc, parent, smooth_axis=None):
    me = bpy.data.meshes.new(name)
    bm.to_mesh(me)
    bm.free()
    me.materials.append(m)
    ob = bpy.data.objects.new(name, me)
    ob.location = loc
    return ob


def box(name, mn, mx, m, origin=None, parent=None):
    mn, mx = Vector(mn), Vector(mx)
    o = Vector(origin) if origin is not None else (mn + mx) / 2
    bm = bmesh.new()
    vs = [bm.verts.new(Vector((x, y, z)) - o) for x in (mn.x, mx.x) for y in (mn.y, mx.y) for z in (mn.z, mx.z)]
    for f in [(0, 1, 3, 2), (4, 6, 7, 5), (0, 4, 5, 1), (2, 3, 7, 6), (0, 2, 6, 4), (1, 5, 7, 3)]:
        bm.faces.new([vs[i] for i in f])
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    return link(finish(name, bm, m, o, parent), parent)


def cyl(name, p0, p1, r, m, seg=20, r2=None, parent=None, origin=None):
    p0, p1 = Vector(p0), Vector(p1)
    d = p1 - p0
    mid = (p0 + p1) / 2
    o = Vector(origin) if origin is not None else mid
    bm = bmesh.new()
    bmesh.ops.create_cone(bm, cap_ends=True, cap_tris=False, segments=seg, radius1=r,
                          radius2=r if r2 is None else r2, depth=d.length)
    for f in bm.faces:
        f.smooth = abs(f.normal.z) < 0.5
    q = Vector((0, 0, 1)).rotation_difference(d.normalized())
    bmesh.ops.rotate(bm, verts=bm.verts, cent=(0, 0, 0), matrix=q.to_matrix())
    bmesh.ops.translate(bm, verts=bm.verts, vec=mid - o)
    return link(finish(name, bm, m, o, parent), parent)


def sphere(name, c, r, m, parent=None):
    bm = bmesh.new()
    bmesh.ops.create_uvsphere(bm, u_segments=16, v_segments=10, radius=r)
    for f in bm.faces:
        f.smooth = True
    return link(finish(name, bm, m, Vector(c), parent), parent)


def torus(name, c, R, r, m, axis='Y', seg=24, rs=8, parent=None):
    bm = bmesh.new()
    rings = []
    for i in range(seg):
        a = 2 * math.pi * i / seg
        ring = []
        for j in range(rs):
            b = 2 * math.pi * j / rs
            rr = R + r * math.cos(b)
            p = Vector((rr * math.cos(a), rr * math.sin(a), r * math.sin(b)))
            ring.append(bm.verts.new(p))
        rings.append(ring)
    for i in range(seg):
        for j in range(rs):
            f = bm.faces.new([rings[i][j], rings[(i + 1) % seg][j], rings[(i + 1) % seg][(j + 1) % rs], rings[i][(j + 1) % rs]])
            f.smooth = True
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    if axis == 'Y':
        bmesh.ops.rotate(bm, verts=bm.verts, cent=(0, 0, 0), matrix=Vector((0, 0, 1)).rotation_difference(Vector((0, 1, 0))).to_matrix())
    elif axis == 'X':
        bmesh.ops.rotate(bm, verts=bm.verts, cent=(0, 0, 0), matrix=Vector((0, 0, 1)).rotation_difference(Vector((1, 0, 0))).to_matrix())
    return link(finish(name, bm, m, Vector(c), parent), parent)


def empty(name, loc, parent=None):
    e = bpy.data.objects.new(name, None)
    e.location = loc
    return link(e, parent)


FACE = {'-Y': (math.pi / 2, 0, 0), '+X': (math.pi / 2, 0, math.pi / 2), '-X': (math.pi / 2, 0, -math.pi / 2), '+Z': (0, 0, 0)}


def label(name, text, loc, face, size, m=None, parent=None, extrude=0.008):
    cu = bpy.data.curves.new(name + '_curve', 'FONT')
    cu.body = text
    cu.size = size
    cu.extrude = extrude
    cu.align_x = 'CENTER'
    cu.align_y = 'CENTER'
    tmp = bpy.data.objects.new(name + '_tmp', cu)
    bpy.context.collection.objects.link(tmp)
    dg = bpy.context.evaluated_depsgraph_get()
    me = bpy.data.meshes.new_from_object(tmp.evaluated_get(dg))
    bpy.data.objects.remove(tmp)
    me.materials.clear()
    me.materials.append(m or CHAR)
    ob = bpy.data.objects.new(name, me)
    ob.location = loc
    ob.rotation_euler = FACE[face]
    return link(ob, parent)


def export_and_render(cam_pos, cam_target, hide=(), res=(1200, 860)):
    blend = os.path.join(HERE, 'scene.blend')
    bpy.ops.wm.save_as_mainfile(filepath=blend)
    bpy.ops.export_scene.gltf(filepath=os.path.join(OUT, 'scene.glb'), export_format='GLB',
                              export_yup=True, export_apply=True, export_cameras=False, export_lights=False)
    for n in hide:
        bpy.data.objects[n].hide_render = True
        for c in bpy.data.objects[n].children_recursive:
            c.hide_render = True
    # Three (x, y, z) -> Blender (x, -z, y)
    t = lambda v: Vector((v[0], -v[2], v[1]))
    cd = bpy.data.cameras.new('PosterCam')
    cd.sensor_fit = 'VERTICAL'
    cd.angle = math.radians(38)
    cam = bpy.data.objects.new('PosterCam', cd)
    bpy.context.collection.objects.link(cam)
    cam.location = t(cam_pos)
    cam.rotation_euler = (t(cam_target) - cam.location).to_track_quat('-Z', 'Y').to_euler()
    scene.camera = cam
    scene.render.engine = 'BLENDER_WORKBENCH'
    sh = scene.display.shading
    sh.light = 'STUDIO'
    sh.color_type = 'MATERIAL'
    sh.show_object_outline = True
    sh.object_outline_color = (0.16, 0.16, 0.15)
    sh.show_shadows = True
    sh.show_cavity = True
    scene.world = bpy.data.worlds.new('World')
    scene.world.color = srgb('#f3f0e8')
    scene.render.resolution_x, scene.render.resolution_y = res
    scene.render.threads_mode = 'FIXED'
    scene.render.threads = 2
    scene.render.filepath = os.path.join(OUT, 'poster.png')
    bpy.ops.render.render(write_still=True)
    # Poster camera is not saved into the exported GLB; remove so the .blend matches the asset.
    bpy.data.objects.remove(cam)
    for n in hide:
        bpy.data.objects[n].hide_render = False
        for c in bpy.data.objects[n].children_recursive:
            c.hide_render = False
    bpy.ops.wm.save_as_mainfile(filepath=blend)


# Open frame: two slim posts carry three layer bands that sit BEHIND the pipework (y > 0), so no slab
# or casing covers a descending connection from the front. Bands carry the layer names on their front faces.
box('Plinth', (-4.3, -1.5, -0.3), (4.3, 1.2, 0), STONE)
box('Plinth_edge', (-4.32, -1.52, -0.05), (4.32, -1.49, 0), CHAR)
for side, x in (('W', -4.0), ('E', 4.0)):
    box('Post_' + side, (x - 0.12, 0.45, 0), (x + 0.12, 0.75, 5.95), IVORY)
    box('Post_%s_cap' % side, (x - 0.18, 0.41, 5.95), (x + 0.18, 0.79, 6.05), CHAR)
    box('Post_%s_foot' % side, (x - 0.2, 0.39, 0), (x + 0.2, 0.81, 0.12), CHAR)
BANDS = (('agent', 5.3, 5.9), ('runtime', 3.95, 4.95), ('library', 1.95, 3.6))
for n, z0, z1 in BANDS:
    box('Band_' + n, (-4.0, 0.5, z0), (4.0, 0.7, z1), WARM if n != 'agent' else IVORY)
    box('Band_%s_rule' % n, (-4.0, 0.49, z0), (4.0, 0.5, z0 + 0.03), CHAR)
label('Label_agent', 'AGENT', (-3.3, 0.49, 5.6), '-Y', 0.2)
label('Label_runtime', 'RUNTIME', (-3.25, 0.49, 4.72), '-Y', 0.2)
label('Label_library', 'CLIENT LIBRARY', (-3.2, 0.49, 3.36), '-Y', 0.17)

R = 0.085
# Agent: one tool call (amber slip on a ledge) dropping into a funnel.
box('CallLedge', (0.35, -0.45, 5.45), (1.25, 0.5, 5.53), IVORY)
box('CallTray', (0.55, -0.35, 5.53), (1.15, 0.2, 5.6), STONE)
box('CallSlip', (0.75, -0.13, 5.6), (0.95, -0.07, 6.05), AMBER)
cyl('Funnel', (0, 0, 5.3), (0, 0, 5.8), 0.11, WARM, r2=0.4, seg=28)
torus('Funnel_rim', (0, 0, 5.8), 0.4, 0.025, CHAR, axis='Z')

# Runtime: the inlet splits into attempt 1 (left) and the runtime retry (right, behind a valve).
GX = {1: -2.2, 2: 2.2}
cyl('Rt_inlet', (0, 0, 5.3), (0, 0, 4.6), R, WARM)
cyl('Rt_bar_1', (GX[1], 0, 4.6), (0, 0, 4.6), R, WARM)
cyl('Rt_bar_2', (0, 0, 4.6), (GX[2], 0, 4.6), R, WARM)
for k, x in (('l', GX[1]), ('c', 0), ('r', GX[2])):
    sphere('Rt_joint_' + k, (x, 0, 4.6), R * 1.35, WARM)
cyl('Rt_drop_1', (GX[1], 0, 4.6), (GX[1], 0, 3.0), R, WARM)
cyl('Rt_drop_2_up', (GX[2], 0, 4.6), (GX[2], 0, 4.15), R, WARM)
label('Label_attempt', 'attempt 1', (GX[1] - 0.62, 0.49, 4.25), '-Y', 0.14)
label('Label_retry', 'retry', (GX[2] + 0.45, 0.49, 4.3), '-Y', 0.14)


def valve(name, x, z, parent=None):
    cyl(name + '_body', (x, 0, z - 0.17), (x, 0, z + 0.17), 0.155, IVORY, seg=24, parent=parent)
    torus(name + '_collar_top', (x, 0, z + 0.17), 0.15, 0.03, CHAR, axis='Z', parent=parent)
    torus(name + '_collar_bot', (x, 0, z - 0.17), 0.15, 0.03, CHAR, axis='Z', parent=parent)
    cyl(name + '_stem', (x, -0.15, z), (x, -0.24, z), 0.04, CHAR, seg=12, parent=parent)
    pivot = empty('Lever_' + name, (x, -0.25, z), parent=parent)
    # Open = handle along the pipe (vertical); the interaction rotates it 90 degrees to close.
    box('Handle_' + name, (x - 0.035, -0.29, z - 0.03), (x + 0.035, -0.23, z + 0.46), CHAR, parent=pivot)
    sphere('Knob_' + name, (x, -0.26, z + 0.48), 0.055, CHAR, parent=pivot)


valve('rt_2', GX[2], 4.0)
# Everything fed only by the runtime retry hangs under one group, so it can be dimmed as a whole subtree.
BR2 = empty('Branch_rt_2', (GX[2], 0, 3.0))
cyl('Rt_drop_2', (GX[2], 0, 3.83), (GX[2], 0, 3.0), R, WARM, parent=BR2)

# Client library: each arriving attempt becomes up to three library attempts (first try + two retries).
OFF = {1: -0.75, 2: 0.0, 3: 0.75}
for a, xa in GX.items():
    grp = BR2 if a == 2 else empty('Branch_rt_1', (xa, 0, 3.0))
    cyl('Lib_bar_%d' % a, (xa - 0.75, 0, 3.0), (xa + 0.75, 0, 3.0), R, WARM, parent=grp)
    for l, dx in OFF.items():
        x = xa + dx
        sphere('Lib_joint_%d_%d' % (a, l), (x, 0, 3.0), R * 1.35, WARM, parent=grp)
        if l == 1:
            cyl('Lib_drop_%d_1' % a, (x, 0, 3.0), (x, 0, 1.45), R, WARM, parent=grp)
            cyl('Nozzle_%d_1' % a, (x, 0, 1.45), (x, 0, 1.3), 0.06, CHAR, r2=0.11, seg=16, parent=grp)
        else:
            cyl('Lib_drop_%d_%d_up' % (a, l), (x, 0, 3.0), (x, 0, 2.6), R, WARM, parent=grp)
            valve('lib_%d_%d' % (a, l), x, 2.45, parent=grp)
            tail = empty('Tail_%d_%d' % (a, l), (x, 0, 1.8), parent=grp)
            cyl('Lib_drop_%d_%d' % (a, l), (x, 0, 2.28), (x, 0, 1.45), R, WARM, parent=tail)
            cyl('Nozzle_%d_%d' % (a, l), (x, 0, 1.45), (x, 0, 1.3), 0.06, CHAR, r2=0.11, seg=16, parent=tail)

# Runtime trace: a peg board on the runtime band. A standing peg is an attempt the runtime records.
box('Trace', (2.95, 0.15, 3.72), (3.75, 0.5, 4.25), IVORY)
box('Trace_edge', (2.95, 0.14, 3.72), (3.75, 0.16, 4.25), CHAR)
label('Label_trace', 'runtime trace', (3.35, 0.49, 4.82), '-Y', 0.12)
for i, x in ((1, 3.15), (2, 3.55)):
    cyl('TraceHole_%d' % i, (x, 0.32, 4.245), (x, 0.32, 4.255), 0.075, CHAR, seg=16)
    cyl('TracePeg_%d' % i, (x, 0.32, 4.1), (x, 0.32, 4.5), 0.055, CHAR, seg=16)
    sphere('TracePeg_%d_head' % i, (x, 0.32, 4.52), 0.08, CHAR)
bpy.context.view_layer.update()
for i in (1, 2):
    h = bpy.data.objects['TracePeg_%d_head' % i]
    h.parent = bpy.data.objects['TracePeg_%d' % i]
    h.matrix_parent_inverse = h.parent.matrix_world.inverted()

# Service: a bench of six receiving cups. An amber slip stands in each cup that receives a request.
box('Bench', (-3.6, -0.55, 0), (3.6, 0.45, 0.32), WARM)
box('Bench_edge', (-3.6, -0.565, 0.28), (3.6, -0.55, 0.32), CHAR)
label('Label_service', 'SERVICE', (0, -0.566, 0.15), '-Y', 0.17)
for a, xa in GX.items():
    for l, dx in OFF.items():
        x = xa + dx
        cyl('Cup_%d_%d' % (a, l), (x, 0, 0.32), (x, 0, 0.82), 0.2, STONE, seg=28)
        torus('CupRim_%d_%d' % (a, l), (x, 0, 0.82), 0.2, 0.022, CHAR, axis='Z')
        box('Slip_%d_%d' % (a, l), (x - 0.12, -0.03, 0.55), (x + 0.12, 0.03, 1.13), AMBER)
        label('Label_cup_%d_%d' % (a, l), 'first' if l == 1 else 'retry', (x, -0.566, 0.15), '-Y', 0.11)

# Three coordinates for the poster; scene.json uses the same view.
CAM = ([2.6, 4.4, 12.6], [0, 2.85, 0])
export_and_render(*CAM)

