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
    scene.world = bpy.data.worlds.new('World')
    scene.world.color = srgb('#f2f0e9')
    scene.render.resolution_x, scene.render.resolution_y = 1200, 800
    scene.render.threads_mode = 'FIXED'
    scene.render.threads = 2
    scene.render.image_settings.file_format = 'PNG'
    scene.render.filepath = os.path.join(OUT, 'poster.png')
    bpy.ops.render.render(write_still=True)



# Permanent cutaway: received log records drive a replay press; reads reach only applied data.
box('Plinth', (-4.5,-2.7,-.25),(4.5,2.5,0),STONE,bevel=.03)
for name,x in [('Primary',-2.7),('Replica',2.7)]:
    box(name+'_DataBed',(x-.95,-1.5,0),(x+.95,.05,.3),CHAR,bevel=.025)
    box(name+'_Data',(x-.85,-1.4,.3),(x+.85,-.05,.5),IVORY,bevel=.02)
    label(name+'_Mark',name.lower(),(x,-2.25,.006),.28)
    label(name+'_Applied','applied data',(x,-1.65,.006),.2)
    # Read aperture covers the front edge of data; it has no opening to the rear log channel.
    for dx in [-.6,.6]:
        box(name+'_AperturePost'+str(dx),(x+dx-.045,-1.53,.3),(x+dx+.045,-1.4,.85),IVORY)
    box(name+'_ApertureTop',(x-.65,-1.53,.85),(x+.65,-1.4,.94),IVORY)
    cyl(name+'_ReadProbe',(x,-2,.64),(x,-1.35,.64),.08,CHAR)
    for rev,matr in [('v7',IVORY),('v8',AMBER)]:
        o=box(name+'_'+rev,(x-.5,-1.39,.51),(x+.5,-.35,.7),matr,bevel=.015)
        label(name+'_'+rev+'_Text',rev,(x,-1.397,.6),.18,FRONT,parent=o)
        label(name+'_'+rev+'_Top',rev,(x,-1.0,.706),.26,parent=o)
# Log is a durable instruction strip, retained after replay. A rail explicitly joins it to the data press.
box('LogChannel',(1.55,.8,.25),(3.85,1.8,.4),CHAR)
for y in [.8,1.75]:
    box('LogRail'+str(y),(1.55,y,.4),(3.85,y+.05,.6),IVORY)
log=box('LogRecord',(2.1,.9,.4),(3.3,1.65,.55),AMBER)
label('LogInstruction','SET ready',(2.7,1.28,.556),.18,parent=log)
label('LogLegend','received WAL',(2.7,2.05,.006),.22)
for x in [1.85,3.55]:
    cyl('ReplayGuide'+str(x),(x,1.3,.65),(x,-.65,.65),.045,CHAR)
press=box('ReplayPress',(2.02,-.98,1.05),(3.38,-.2,1.2),IVORY,bevel=.02)
for x in [2.08,3.32]:
    cyl('PressRod'+str(x),(x,-.6,.3),(x,-.6,1.4),.04,CHAR)
label('ReplayLabel','replay',(2.7,-.986,1.12),.18,FRONT,parent=press)
# Independent read routes enter the data apertures at the front, WAL transfer is at the rear.
for name,x in [('Primary',-2.7),('Replica',2.7)]:
    route=empty('Route_'+name,(0,0,0))
    cyl('RouteLine_'+name,(0,-2,.64),(x,-2,.64),.045,AMBER,parent=route)
cyl('WALTransfer',(-2.7,1.3,.48),(2.1,1.3,.48),.07,IVORY)
box('Receipt',(-3.5,.8,.25),(-1.9,1.8,.4),IVORY)
label('ReceiptText','1 write / v8',(-2.7,1.3,.406),.21)
box('Reader',(-.6,-2.35,.05),(.6,-1.7,.55),IVORY,bevel=.02)
for rev,matr in [('v7',IVORY),('v8',AMBER)]:
    o=box('Display_'+rev,(-.4,-2.36,.15),(.4,-2.3,.45),matr)
    label('Display_'+rev+'_Text',rev,(0,-2.366,.3),.23,FRONT,parent=o)
export_and_poster([5.5,7.8,10.5],[0,.3,0],hide=['Primary_v7','Primary_v7_Text','Primary_v7_Top','Replica_v8','Replica_v8_Text','Replica_v8_Top','Display_v8','Display_v8_Text','RouteLine_Primary'])
