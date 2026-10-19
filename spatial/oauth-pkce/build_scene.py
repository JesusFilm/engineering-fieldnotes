# OAuth PKCE: two agent hosts store login verifiers differently. Each lane ends in a cut-open
# token check whose pins were set by login A's challenge; only verifier A's teeth lift every pin to the shear line.
# Run from the repository root:
#   /opt/homebrew/bin/blender --background --threads 2 --python spatial/oauth-pkce/build_scene.py
# Blender axes: X along each lane (key rack on the left, lock on the right), Y depth (front = -Y), Z up.
CID = 'oauth-pkce'
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


# Teeth heights for each verifier. The pins inside each lock are cut to fit key A only.
TEETH = {'A': (0.24, 0.06, 0.3, 0.14), 'B': (0.06, 0.3, 0.14, 0.24)}
KZ = 0.95                      # keyway centre height
SHAFT_LO, SHAFT_HI = KZ - 0.05, KZ + 0.05
SHEAR = SHAFT_HI + 0.5
LANES = {1: -2.5, 2: 2.5}

box('Plinth', (-5.0, -1.25, -0.25), (5.0, 1.0, 0), STONE)
box('Divider', (-0.04, -1.25, 0), (0.04, 1.0, 0.1), CHAR)
label('Label_lane_1', 'ONE SHARED SLOT', (-2.5, -1.254, -0.125), '-Y', 0.17)
label('Label_lane_2', 'ONE SLOT PER LOGIN', (2.5, -1.254, -0.125), '-Y', 0.17)


def key(name, letter, origin):
    k = empty(name, origin)
    ox, oy, oz = origin
    cyl(name + '_bow', (ox, oy - 0.035, oz), (ox, oy + 0.035, oz), 0.21, IVORY, seg=32, parent=k)
    torus(name + '_bow_rim', (ox, oy - 0.036, oz), 0.2, 0.014, CHAR, axis='Y', parent=k)
    box(name + '_neck', (ox + 0.2, oy - 0.035, oz - 0.06), (ox + 0.36, oy + 0.035, oz + 0.06), IVORY, parent=k)
    box(name + '_shaft', (ox + 0.36, oy - 0.035, oz - 0.05), (ox + 2.0, oy + 0.035, oz + 0.05), IVORY, parent=k)
    for i, t in enumerate(TEETH[letter]):
        x = ox + 0.6 + 0.4 * i
        box(name + '_tooth%d' % i, (x - 0.08, oy - 0.035, oz + 0.05), (x + 0.08, oy + 0.035, oz + 0.05 + t), IVORY, parent=k)
    label(name + '_tag', letter, (ox, oy - 0.037, oz - 0.005), '-Y', 0.24, parent=k, extrude=0.004)
    return k


for lane, ox in LANES.items():
    L = 'L%d' % lane
    kx = ox - 2.0
    x0 = ox + 0.25
    x1 = x0 + 1.95
    z1 = 2.55
    zr = z1 - 0.62
    # Agent host: a small rack whose ledges hold verifiers.
    box(L + '_Rack_foot', (kx - 0.35, -0.3, 0), (kx + 0.75, 0.42, 0.07), WARM)
    box(L + '_Rack_back', (kx - 0.3, 0.2, 0.07), (kx + 0.7, 0.3, 2.55), IVORY)
    label(L + '_Rack_label', 'AGENT HOST', (kx + 0.2, 0.195, 2.36), '-Y', 0.12)
    slots = [('slot', KZ)] if lane == 1 else [('A', KZ), ('B', KZ + 0.75)]
    for tag, sz in slots:
        box(L + '_Ledge_' + tag, (kx - 0.3, -0.12, sz - 0.27), (kx + 0.7, 0.2, sz - 0.21), WARM)
        box(L + '_Ledge_' + tag + '_lip', (kx - 0.3, -0.14, sz - 0.27), (kx + 0.7, -0.1, sz - 0.18), WARM)
        if lane == 2:
            label(L + '_Ledge_' + tag + '_label', 'login ' + tag, (kx + 0.2, -0.141, sz - 0.225), '-Y', 0.075)
        else:
            label(L + '_Ledge_slot_label', 'verifier', (kx + 0.2, -0.141, sz - 0.225), '-Y', 0.075)
    # Authored poses the interaction moves keys between.
    empty(L + '_Pose_inserted', (kx + 2.05, 0, KZ))
    if lane == 1:
        key(L + '_Key_A', 'A', (kx, 0, KZ))
        key(L + '_Key_B', 'B', (kx, 0, KZ))
        drop = empty(L + '_Pose_dropped', (kx + 0.15, -0.75, 0.04))
        drop.rotation_euler = (math.pi / 2, 0, 0.35)
    else:
        key(L + '_Key_A', 'A', (kx, 0, KZ))
        key(L + '_Key_B', 'B', (kx, 0, KZ + 0.75))

    # Token check: lock housing cut open on the front so the pin stacks are visible.
    box(L + '_Lock_plinth', (x0 - 0.08, -0.38, 0), (x1 + 0.08, 0.38, 0.45), WARM)
    box(L + '_Lock_back', (x0, 0.14, 0.45), (x1, 0.3, z1), IVORY)
    box(L + '_Lock_top', (x0, -0.3, zr), (x1, 0.3, z1), IVORY)
    box(L + '_Lock_bottom', (x0, -0.3, 0.45), (x1, 0.3, SHAFT_LO - 0.02), IVORY)
    box(L + '_Lock_end', (x1 - 0.12, -0.3, 0.45), (x1, 0.3, z1), IVORY)
    box(L + '_Lock_face_top', (x0, -0.3, SHAFT_HI + 0.34), (x0 + 0.12, 0.3, z1), IVORY)
    box(L + '_Lock_face_bot', (x0, -0.3, 0.45), (x0 + 0.12, 0.3, SHAFT_LO - 0.02), IVORY)
    for n, a, b in (('cut_top', (x0, -0.305, zr), (x1, -0.3, z1)),
                    ('cut_bot', (x0, -0.305, 0.45), (x1, -0.3, SHAFT_LO - 0.02)),
                    ('cut_end', (x1 - 0.12, -0.305, 0.45), (x1, -0.3, z1)),
                    ('cut_face', (x0, -0.305, SHAFT_HI + 0.34), (x0 + 0.12, -0.3, z1)),
                    ('cut_face_b', (x0, -0.305, 0.45), (x0 + 0.12, -0.3, SHAFT_LO - 0.02))):
        box(L + '_Lock_' + n, a, b, CHAR)
    # Shear line: every pin joint must stop on it for the check to turn.
    box(L + '_Shear', (x0 + 0.12, 0.11, SHEAR - 0.018), (x1 - 0.12, 0.14, SHEAR + 0.018), AMBER)
    label(L + '_Lock_label', 'CHECK FOR CODE A', ((x0 + x1) / 2, -0.385, 0.225), '-Y', 0.1)
    for i, tA in enumerate(TEETH['A']):
        x = x0 + 0.4 + 0.4 * i
        box(L + '_Chamber_%d' % i, (x - 0.1, 0.135, SHAFT_HI + 0.02), (x + 0.1, 0.14, zr), CHAR)
        stack = empty(L + '_Pin_%d' % i, (x, 0, SHAFT_LO))
        kl = SHEAR - (SHAFT_HI + tA)
        cyl(L + '_Pin_%d_key' % i, (x, 0, SHAFT_LO), (x, 0, SHAFT_LO + kl), 0.07, WARM, seg=18, parent=stack)
        cyl(L + '_Pin_%d_driver' % i, (x, 0, SHAFT_LO + kl), (x, 0, SHAFT_LO + kl + 0.3), 0.07, IVORY, seg=18, parent=stack)
        torus(L + '_Pin_%d_joint' % i, (x, 0, SHAFT_LO + kl), 0.071, 0.014, CHAR, axis='Z', parent=stack)
    # Token that rises through the lock roof when every pin meets the shear line.
    box(L + '_Token_slot', (x1 - 0.62, -0.2, z1 - 0.001), (x1 - 0.18, 0.2, z1 + 0.005), CHAR)
    tok = empty(L + '_Token', (x1 - 0.4, 0, z1 - 0.06))
    box(L + '_Token_card', (x1 - 0.58, -0.03, z1 - 0.56), (x1 - 0.22, 0.03, z1 - 0.06), AMBER, parent=tok)
    label(L + '_Token_text', 'TOKEN', (x1 - 0.4, -0.031, z1 - 0.2), '-Y', 0.075, parent=tok)

CAM = ([0.0, 4.4, 11.6], [0.0, 1.15, 0.0])
export_and_render(*CAM, hide=('L1_Key_B', 'L2_Key_B'))
