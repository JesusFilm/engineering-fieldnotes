import bpy, bmesh, os, math
from mathutils import Vector

# Run from the repository root:
#   /opt/homebrew/bin/blender --background --threads 2 --python spatial/<concept>/build_scene.py
# Blender axes: X right, Y away from the viewer (front = -Y), Z up. glTF export converts to Three Y-up.
HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(os.path.dirname(HERE))
CONCEPT = os.path.basename(HERE)
OUT = os.path.join(REPO, 'public', 'spatial', CONCEPT)
os.makedirs(OUT, exist_ok=True)
bpy.ops.wm.read_factory_settings(use_empty=True)
scene = bpy.context.scene
bpy.context.preferences.filepaths.save_version = 0  # no scene.blend1 backups


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
WARM = mat('IvoryWarm', '#e4ddcd')
STONE = mat('Stone', '#d9d3c5')
CHAR = mat('Charcoal', '#2f2e2b', 0.7)
AMBER = mat('Amber', '#e2a23b', 0.6)


def world_t(p):
    return Vector(p.location) + (world_t(p.parent) if p.parent else Vector())


def _link(ob, origin, parent):
    bpy.context.collection.objects.link(ob)
    ob.location = Vector(origin)
    if parent is not None:
        ob.parent = parent
        ob.location = Vector(origin) - world_t(parent)
    return ob


def empty(name, loc, parent=None):
    return _link(bpy.data.objects.new(name, None), loc, parent)


def box(name, mn, mx, m, origin=None, parent=None, bevel=0.0):
    mn, mx = Vector(mn), Vector(mx)
    o = Vector(origin) if origin is not None else (mn + mx) / 2
    me = bpy.data.meshes.new(name)
    bm = bmesh.new()
    bmesh.ops.create_cube(bm, size=1.0)
    for v in bm.verts:
        v.co = Vector((mn.x + (v.co.x + 0.5) * (mx.x - mn.x),
                       mn.y + (v.co.y + 0.5) * (mx.y - mn.y),
                       mn.z + (v.co.z + 0.5) * (mx.z - mn.z))) - o
    bm.to_mesh(me)
    bm.free()
    me.materials.append(m)
    ob = _link(bpy.data.objects.new(name, me), o, parent)
    if bevel:
        mod = ob.modifiers.new('Bevel', 'BEVEL')
        mod.width = bevel
        mod.segments = 1
        mod.limit_method = 'ANGLE'
    return ob


def cyl(name, p0, p1, r, m, segs=24, origin=None, parent=None):
    p0, p1 = Vector(p0), Vector(p1)
    d = p1 - p0
    mid = (p0 + p1) / 2
    o = Vector(origin) if origin is not None else mid
    me = bpy.data.meshes.new(name)
    bm = bmesh.new()
    bmesh.ops.create_cone(bm, cap_ends=True, segments=segs, radius1=r, radius2=r, depth=d.length)
    q = Vector((0, 0, 1)).rotation_difference(d.normalized())
    bmesh.ops.rotate(bm, verts=bm.verts, cent=(0, 0, 0), matrix=q.to_matrix())
    bmesh.ops.translate(bm, verts=bm.verts, vec=mid - o)
    bm.to_mesh(me)
    bm.free()
    for poly in me.polygons:
        poly.use_smooth = len(poly.vertices) == 4
    me.materials.append(m)
    return _link(bpy.data.objects.new(name, me), o, parent)


def label(name, txt, loc, size, rot=(0, 0, 0), m=None, parent=None, align='CENTER', extrude=0.004):
    cu = bpy.data.curves.new(name + '_curve', 'FONT')
    cu.body = txt
    cu.size = size
    cu.extrude = extrude
    cu.resolution_u = 3
    cu.align_x = align
    cu.align_y = 'CENTER'
    tmp = bpy.data.objects.new(name + '_tmp', cu)
    bpy.context.collection.objects.link(tmp)
    bpy.context.view_layer.update()
    me = bpy.data.meshes.new_from_object(tmp.evaluated_get(bpy.context.evaluated_depsgraph_get()))
    bpy.data.objects.remove(tmp)
    me.materials.clear()
    me.materials.append(m or CHAR)
    ob = _link(bpy.data.objects.new(name, me), loc, parent)
    ob.rotation_euler = rot
    return ob


FRONT = (math.pi / 2, 0, 0)  # text standing upright, readable from the front (-Y)


def export_and_poster(cam_pos3, cam_target3, fov=38, hide=(), pose=None):
    # Exports the still default state, then poses the revealed state for the poster (the no-WebGL fallback).
    bpy.ops.wm.save_as_mainfile(filepath=os.path.join(HERE, 'scene.blend'))
    bpy.ops.export_scene.gltf(filepath=os.path.join(OUT, 'scene.glb'), export_format='GLB',
                              export_yup=True, export_apply=True, export_cameras=False, export_lights=False)
    for n in hide:
        bpy.data.objects[n].hide_render = True
    if pose:
        pose()
        bpy.context.view_layer.update()
    to_b = lambda p: Vector((p[0], -p[2], p[1]))
    cd = bpy.data.cameras.new('PosterCam')
    cd.sensor_fit = 'VERTICAL'
    cd.angle_y = math.radians(fov)
    cam = bpy.data.objects.new('PosterCam', cd)
    bpy.context.collection.objects.link(cam)
    cam.location = to_b(cam_pos3)
    cam.rotation_euler = (to_b(cam_target3) - cam.location).to_track_quat('-Z', 'Y').to_euler()
    scene.camera = cam
    scene.render.engine = 'BLENDER_WORKBENCH'
    sh = scene.display.shading
    sh.light = 'STUDIO'
    sh.color_type = 'MATERIAL'
    sh.show_object_outline = True
    sh.object_outline_color = (0.16, 0.16, 0.15)
    sh.show_shadows = True
    sh.shadow_intensity = 0.35
    sh.show_cavity = True
    scene.view_settings.view_transform = 'Standard'
    scene.view_settings.exposure = 0.45
    scene.world = bpy.data.worlds.new('World')
    scene.world.color = srgb('#f2f0e9')
    scene.render.resolution_x, scene.render.resolution_y = 1200, 800
    scene.render.threads_mode = 'FIXED'
    scene.render.threads = 2
    scene.render.image_settings.file_format = 'PNG'
    scene.render.filepath = os.path.join(OUT, 'poster.png')
    bpy.ops.render.render(write_still=True)



# ---------------------------------------------------------------- observability-and-tracing
# A stepped trace shelf. X is time (2 units per second), each lane is one trace ID, height is nesting depth.
# The tool span sits on the back lane: from the timeline view it appears to fill the task's gap, but side-on it
# is a separate trace with no parent link. Propagating context docks it beneath the task without changing time.
S = 0.22      # back-lane step, tuned so the back span lines up with child depth from the timeline view
SH = 0.4      # span height
YB = 1.8      # back lane centre

box('Plinth', (-3.9, -1.5, -0.3), (3.9, 2.6, 0), STONE, bevel=0.03)
box('Back_Step', (-3.9, 1.05, 0), (3.9, 2.6, S), STONE, bevel=0.02)
for i, y in enumerate((-0.6, 0.53)):
    box('Lane_A_Rail_%d' % i, (-3.3, y, 0), (3.3, y + 0.07, 0.05), CHAR)
for i, y in enumerate((YB - 0.6, YB + 0.53)):
    box('Lane_B_Rail_%d' % i, (-3.3, y, S), (3.3, y + 0.07, S + 0.05), CHAR)

pa = box('Trace_A_Plaque', (-3.82, -0.06, 0), (-3.32, 0.06, 0.55), IVORY, bevel=0.01)
label('Trace_A_Text', 'trace\n4bf9', (-3.57, -0.066, 0.3), 0.13, FRONT, parent=pa)
pb = box('Trace_B_Plaque', (-3.82, YB - 0.06, S), (-3.32, YB + 0.06, S + 0.55), IVORY, bevel=0.01)
label('Trace_B_Text', 'trace\na3ce', (-3.57, YB - 0.066, S + 0.3), 0.13, FRONT, parent=pb)

# Time ruler on the front tier.
box('Ruler', (-3.0, -1.05, 0), (3.0, -0.97, 0.02), CHAR)
for k in range(7):
    x = -3.0 + k
    box('Ruler_Tick_%d' % k, (x - 0.015, -1.15, 0), (x + 0.015, -0.97, 0.03), CHAR)
for k, t in enumerate(('0 s', '1 s', '2 s', '3 s')):
    label('Ruler_Label_%d' % k, t, (-3.0 + 2 * k, -1.506, -0.15), 0.16, FRONT)

# Trace A: the agent task, with the model call nested on a parent link.
task = box('Task_Span', (-3.0, -0.42, 0.06), (3.0, 0.42, 0.06 + SH), IVORY, bevel=0.015)
label('Task_Label', 'agent task  3.0 s', (-2.88, -0.426, 0.26), 0.17, FRONT, parent=task, align='LEFT')
model = box('Model_Span', (-3.0, -0.42, 0.62), (-1.8, 0.42, 0.62 + SH), WARM, bevel=0.015)
label('Model_Label', 'model  0.6 s', (-2.9, -0.426, 0.82), 0.15, FRONT, parent=model, align='LEFT')
box('Model_Link', (-2.97, -0.3, 0.06 + SH), (-2.83, 0.3, 0.62), CHAR)

# Trace B: the tool span as recorded without propagated context.
z0 = S + 0.06
tool = empty('Tool_Span', (0.6, YB, z0 + SH / 2))
box('Tool_Block', (-1.8, YB - 0.42, z0), (3.0, YB + 0.42, z0 + SH), AMBER, parent=tool, bevel=0.015)
label('Tool_Label', 'test tool  2.4 s', (-1.68, YB - 0.426, z0 + SH / 2), 0.17, FRONT, parent=tool, align='LEFT')
box('Tool_Link', (-1.77, YB - 0.3, z0 - 0.16), (-1.63, YB + 0.3, z0), CHAR, parent=tool)
empty('Tool_Dock', (0.6, 0, 0.62 + SH / 2))

export_and_poster([-1.6, 5.6, 8.6], [0.3, 0.4, -0.8], hide=['Tool_Link'])





