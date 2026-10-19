# Idempotency: two concurrent attempts with key k7 either converge on one claim or write separately.
# Run from the repository root:
#   /opt/homebrew/bin/blender --background --threads 2 --python spatial/idempotency/build_scene.py
# Blender axes: X across, Y depth (runner desks at -Y, service at +Y), Z up.
CID = 'idempotency'
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


# One plinth, always open. Front: two runner desks (one per concurrent attempt) with reply trays.
# Back centre: the atomic claim block (one k7 socket, ticket written in the same transaction).
# Back corners: check-then-write docks. Each attempt rides a guide arm pivoting at its desk; the mode
# swings the arms so both paths converge on the single claim, or run parallel to separate docks.
box('Plinth', (-3.7, -3.2, -0.3), (3.7, 3.2, 0), STONE)
box('Plinth_edge', (-3.72, -3.22, -0.05), (3.72, -3.19, 0), CHAR)
label('Label_service', 'SERVICE DATABASE', (0, 2.98, 0.012), '+Z', 0.16)

PY = -1.75          # arm pivot line
MEET = Vector((0, 1.3))
X0 = 2.6
L = (MEET - Vector((X0, PY))).length
ANG = math.atan2(X0, MEET.y - PY)   # swing from straight ahead to the meeting point
START, WIN, WAIT = 0.75, L - 0.45, L - 0.95

for s, side in ((-1, 'L'), (1, 'R')):
    x0 = X0 * s
    n = 1 if side == 'L' else 2
    # Runner desk and reply tray.
    box('Desk_' + side, (x0 - 0.6, -2.95, 0), (x0 + 0.6, -2.25, 0.6), IVORY)
    box('DeskTop_' + side, (x0 - 0.7, -3.02, 0.6), (x0 + 0.7, -2.18, 0.68), WARM)
    box('DeskTop_%s_edge' % side, (x0 - 0.7, -3.035, 0.6), (x0 + 0.7, -3.02, 0.68), CHAR)
    label('Label_desk_' + side, 'runner: attempt %d' % n, (x0, -2.955, 0.33), '-Y', 0.12)
    box('Tray_' + side, (x0 - 0.42, -2.9, 0.68), (x0 + 0.42, -2.32, 0.71), STONE)
    for k, (a, b) in enumerate((((x0 - 0.44, -2.92), (x0 + 0.44, -2.88)), ((x0 - 0.44, -2.34), (x0 + 0.44, -2.3)),
                                ((x0 - 0.44, -2.92), (x0 - 0.4, -2.3)), ((x0 + 0.4, -2.92), (x0 + 0.44, -2.3)))):
        box('Tray_%s_rim%d' % (side, k), (a[0], a[1], 0.68), (b[0], b[1], 0.76), CHAR)
    for t in ((47,) if side == 'L' else (47, 48)):
        card = box('Reply_%s_%d' % (side, t), (x0 - 0.26, -2.78, 0.71), (x0 + 0.26, -2.44, 0.735), IVORY)
        label('Reply_%s_%d_text' % (side, t), '#%d' % t, (x0, -2.61, 0.737), '+Z', 0.16, parent=card)

    # Guide arm, built pointing straight ahead (+Y) and then swung to the meeting point.
    arm = empty('Arm_' + side, (x0, PY, 0))
    cyl('Arm_%s_hub' % side, (x0, PY, 0), (x0, PY, 0.16), 0.3, CHAR, seg=28, parent=arm)
    for dx in (-0.18, 0.18):
        box('Arm_%s_rail%+d' % (side, int(dx * 10)), (x0 + dx - 0.025, PY + 0.25, 0.08), (x0 + dx + 0.025, PY + L, 0.14), CHAR, parent=arm)
    y = 0.45
    k = 0
    while y < L - 0.05:
        box('Arm_%s_tie%d' % (side, k), (x0 - 0.28, PY + y - 0.05, 0), (x0 + 0.28, PY + y + 0.05, 0.08), WARM, parent=arm)
        y += 0.42
        k += 1
    # Carriage: body, wheels, the key peg at its nose, and a k7 v1 tag. It slides along the arm's local axis.
    cy = PY + START
    car = empty('Car_' + side, (x0, cy, 0.14), parent=arm)
    box('Car_%s_body' % side, (x0 - 0.24, cy - 0.4, 0.2), (x0 + 0.24, cy + 0.4, 0.42), IVORY, parent=car)
    for wx in (-0.27, 0.27):
        for wy in (-0.26, 0.26):
            cyl('Car_%s_wheel%+d%+d' % (side, int(wx * 10), int(wy * 10)), (x0 + wx - 0.03, cy + wy, 0.2), (x0 + wx + 0.03, cy + wy, 0.2), 0.08, CHAR, seg=14, parent=car)
    cyl('Car_%s_capsule' % side, (x0, cy - 0.32, 0.55), (x0, cy + 0.08, 0.55), 0.13, STONE, seg=20, parent=car)
    sphere('Car_%s_capsule_cap' % side, (x0, cy + 0.08, 0.55), 0.13, STONE, parent=car)
    box('Car_%s_tag' % side, (x0 - 0.22, cy - 0.4, 0.42), (x0 + 0.22, cy - 0.33, 0.7), IVORY, parent=car)
    label('Car_%s_tag_text' % side, 'k7 v1', (x0, cy - 0.405, 0.56), '-Y', 0.11, parent=car)
    peg = cyl('CarPeg_' + side, (x0, cy + 0.3, 0.42), (x0, cy + 0.3, 0.86), 0.05, CHAR, seg=14, parent=car)
    sphere('CarPeg_%s_head' % side, (x0, cy + 0.3, 0.88), 0.075, CHAR, parent=peg)
    arm.rotation_euler.z = ANG * s

    # Check-then-write dock at the end of the straight path.
    dy = PY + L
    box('Dock_' + side, (x0 - 0.7, dy - 0.25, 0), (x0 + 0.7, dy + 0.6, 0.5), IVORY)
    box('Dock_%s_edge' % side, (x0 - 0.7, dy - 0.265, 0.46), (x0 + 0.7, dy - 0.25, 0.5), CHAR)
    label('Label_dock_' + side, 'write', (x0 - 0.42, dy - 0.1, 0.505), '+Z', 0.1)
    sy = dy - 0.1
    torus('Dock_%s_socket' % side, (x0, sy, 0.5), 0.1, 0.025, CHAR, axis='Z')
    cyl('Dock_%s_hole' % side, (x0, sy, 0.49), (x0, sy, 0.505), 0.08, CHAR, seg=16)
    label('Dock_%s_keyrow' % side, 'k7 row', (x0 + 0.42, sy, 0.505), '+Z', 0.1)
    dp = cyl('DockPeg_' + side, (x0, sy, 0.38), (x0, sy, 0.82), 0.05, CHAR, seg=14)
    sphere('DockPeg_%s_head' % side, (x0, sy, 0.84), 0.075, CHAR, parent=dp)
    box('Dock_%s_slot' % side, (x0 - 0.33, dy + 0.28, 0.5), (x0 + 0.33, dy + 0.38, 0.505), CHAR)
    tk = 47 if side == 'L' else 48
    tick = box('Ticket_%s_%d' % (side, tk), (x0 - 0.3, dy + 0.3, 0.5), (x0 + 0.3, dy + 0.36, 1.15), AMBER, origin=(x0, dy + 0.33, 0.5))
    label('Ticket_%s_%d_text' % (side, tk), '#%d' % tk, (x0, dy + 0.295, 0.86), '-Y', 0.2, parent=tick)
    # Check arch the straight path passes under before reaching the dock.
    ay = PY + 2.35
    for px in (-0.42, 0.42):
        box('Arch_%s_post%+d' % (side, int(px * 10)), (x0 + px - 0.05, ay - 0.06, 0), (x0 + px + 0.05, ay + 0.06, 1.02), IVORY)
    box('Arch_%s_lintel' % side, (x0 - 0.5, ay - 0.08, 1.02), (x0 + 0.5, ay + 0.08, 1.14), IVORY)
    label('Arch_%s_text' % side, 'check for k7', (x0, ay - 0.085, 1.08), '-Y', 0.085)

# Atomic claim block: a single k7 socket; the ticket slot is part of the same block (one transaction).
box('Claim', (-0.85, 1.45, 0), (0.85, 2.45, 0.5), IVORY)
box('Claim_edge', (-0.85, 1.435, 0.46), (0.85, 1.45, 0.5), CHAR)
label('Label_claim', 'one claim + ticket', (0, 2.62, 0.012), '+Z', 0.15)
torus('Claim_socket', (0, 1.72, 0.5), 0.1, 0.025, CHAR, axis='Z')
cyl('Claim_hole', (0, 1.72, 0.49), (0, 1.72, 0.505), 0.08, CHAR, seg=16)
label('Claim_key', 'k7', (0.32, 1.72, 0.505), '+Z', 0.14)
cp = cyl('ClaimPeg', (0, 1.72, 0.38), (0, 1.72, 0.82), 0.05, CHAR, seg=14)
sphere('ClaimPeg_head', (0, 1.72, 0.84), 0.075, CHAR, parent=cp)
box('Claim_slot', (-0.33, 2.08, 0.5), (0.33, 2.18, 0.505), CHAR)
ta = box('Ticket_A_47', (-0.3, 2.1, 0.5), (0.3, 2.16, 1.15), AMBER, origin=(0, 2.13, 0.5))
label('Ticket_A_47_text', '#47', (0, 2.095, 0.86), '-Y', 0.2, parent=ta)

HIDE = ['ClaimPeg', 'DockPeg_L', 'DockPeg_R', 'Ticket_A_47', 'Ticket_L_47', 'Ticket_R_48', 'Reply_L_47', 'Reply_R_47', 'Reply_R_48']
CAM = ([0, 7.0, 9.3], [0, 0.1, -0.15])
export_and_render(*CAM, hide=HIDE)
print('ARM_LENGTH', L, 'ANGLE_DEG', math.degrees(ANG), 'WIN', WIN, 'WAIT', WAIT, 'START', START)

