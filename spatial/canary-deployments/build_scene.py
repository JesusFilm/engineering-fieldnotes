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



# ---------------------------------------------------------------- canary-deployments
# One window of 10,000 requests as a solid volume. Floor area is proportional to request count; height is 100%.
# The 40 failed v2 exports are an amber floor layer. Pulling the volume apart along the version seam and/or the
# operation seam keeps the amber volume but shrinks its denominator, so its height becomes that group's error rate.
H, A0 = 1.5, 0.006  # full height = 100%; pooled failure layer = 40 / 10,000 of H
GAP, LIP = 0.008, 0.012

box('Plinth', (-3.8, -3.8, -0.3), (3.8, 3.8, 0), STONE, bevel=0.03)

groups = {
    'v1_other': ((-2.5, 2.0), (-2.0, 2.5), (-1, 1)),
    'v1_export': ((-2.5, 2.0), (-2.5, -2.0), (-1, -1)),
    'v2_other': ((2.0, 2.5), (-2.0, 2.5), (1, 1)),
    'v2_export': ((2.0, 2.5), (-2.5, -2.0), (1, -1)),
}
for g, ((x0, x1), (y0, y1), (sx, sy)) in groups.items():
    cx, cy = (x0 + x1) / 2, (y0 + y1) / 2
    grp = empty('Group_' + g, (cx, cy, 0))
    a, b, c, d = x0 + GAP, x1 - GAP, y0 + GAP, y1 - GAP
    box(g + '_Fill', (a, c, A0), (b, d, H), IVORY, origin=(cx, cy, H), parent=grp, bevel=0.012)
    box(g + '_Fail', (x0, y0, 0), (x1, y1, A0), AMBER, origin=(cx, cy, 0), parent=grp)
    # Scribed grid on top: each cell is 100 requests, so the v2 export column is exactly one cell.
    for k in range(1, 10):
        v = -2.5 + 0.5 * k
        if x0 < v < x1:
            box('%s_Grid_X_%d' % (g, k), (v - 0.007, y0 + 0.02, H), (v + 0.007, y1 - 0.02, H + 0.004), CHAR, parent=grp)
        if y0 < v < y1:
            box('%s_Grid_Y_%d' % (g, k), (x0 + 0.02, v - 0.007, H), (x1 - 0.02, v + 0.007, H + 0.004), CHAR, parent=grp)

# Pull knobs on the parts that move: v1 slides left along the version seam, other operations slide back.
ve = bpy.data.objects['Group_v1_export']
cyl('Knob_Version', (0.0, -2.5, 0.75), (0.0, -2.64, 0.75), 0.07, CHAR, parent=ve)
cyl('Knob_Version_Cap', (0.0, -2.64, 0.75), (0.0, -2.68, 0.75), 0.1, CHAR, parent=ve)
vo = bpy.data.objects['Group_v2_other']
cyl('Knob_Operation', (2.5, 0.25, 0.75), (2.64, 0.25, 0.75), 0.07, CHAR, parent=vo)
cyl('Knob_Operation_Cap', (2.64, 0.25, 0.75), (2.68, 0.25, 0.75), 0.1, CHAR, parent=vo)

# One scale mounted flush against the stationary v2 export column's right face, beside its amber face, so heights
# compare without parallax from any orbit angle. v2 export never moves; v2 other slides away along +Y only.
box('RateGauge',(2.52,-2.5,0),(2.56,-2.46,1.5),CHAR)
for value,z in [('0%',0.0),('40%',.6),('100%',1.5)]:
    # Ticks run out to just before each label so the value stays attached to its height from any orbit angle.
    box('Tick'+value,(2.5,-2.5,max(z-.0075,0)),(2.8,-2.46,max(z-.0075,0)+.015),CHAR)
    # Labels face the default camera's diagonal (between -Y and +X) and start well clear of the bar and tick ends,
    # each vertically centred on its tick; 0% sits just above the plinth.
    label('Scale'+value,value,(2.86,-2.49,max(z,.09)),.17,(math.pi/2,0,math.pi/4),align='LEFT')
label('CellLegend','1 cell = 100 requests',(-.8,-2.95,.006),.22)
label('Label_v1', 'v1 stable', (-0.25, -3.35, 0.004), 0.24)
label('Label_v2', 'v2', (2.25, -3.35, 0.004), 0.24)
label('Label_Export', 'exports', (2.3, -3.7, 0.004), 0.2)
label('Label_Other', 'other operations', (3.3, 0.25, 0.004), 0.24, (0, 0, math.pi / 2))

def poster_pose():
    # Both seams open: the same amber volume collects in the 100 v2 export requests (40%).
    for g in ('v1_other', 'v1_export'):
        bpy.data.objects['Group_' + g].location.x -= 0.8
    for g in ('v1_other', 'v2_other'):
        bpy.data.objects['Group_' + g].location.y += 0.8
    for g in ('v1_other', 'v1_export', 'v2_other'):
        bpy.data.objects[g + '_Fail'].hide_render = True
        bpy.data.objects[g + '_Fill'].scale.z = H / (H - A0)
    bpy.data.objects['v2_export_Fail'].scale.z = 0.4 * H / A0
    bpy.data.objects['v2_export_Fill'].scale.z = (0.6 * H) / (H - A0)


export_and_poster([6.6, 8.0, 7.8], [0.0, 0.3, 0.0], pose=poster_pose)



