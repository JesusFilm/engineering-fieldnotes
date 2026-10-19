import bpy, bmesh, math, os
from mathutils import Vector, Matrix

# Shared conventions for Engineering Fieldnotes spatial scenes (copied per concept on purpose).
# Blender axes: X right, Y away from the default camera, Z up. glTF export converts to Three Y-up.
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, '..', '..'))
CONCEPT = os.path.basename(HERE)
OUT = os.path.join(ROOT, 'public', 'spatial', CONCEPT)
os.makedirs(OUT, exist_ok=True)
bpy.ops.wm.read_factory_settings(use_empty=True)
SCENE = bpy.context.scene


def srgb(h):
    h = h.lstrip('#')
    c = [int(h[i:i + 2], 16) / 255 for i in (0, 2, 4)]
    return tuple(((x + 0.055) / 1.055) ** 2.4 if x > 0.04045 else x / 12.92 for x in c)


def mat(name, hexcol, rough=0.85):
    rgb = srgb(hexcol)
    m = bpy.data.materials.new(name)
    try:
        m.use_nodes = True
    except Exception:
        pass
    b = m.node_tree.nodes.get('Principled BSDF')
    b.inputs['Base Color'].default_value = (*rgb, 1)
    b.inputs['Roughness'].default_value = rough
    m.diffuse_color = (*rgb, 1)
    return m


IVORY = mat('Ivory', '#efebe1')
WARM = mat('IvoryWarm', '#e4ddcd')
STONE = mat('Stone', '#d6cfbf')
CHAR = mat('Charcoal', '#2f2e2b', 0.7)
AMBER = mat('Amber', '#e2a23b', 0.55)


def link(ob, parent=None):
    SCENE.collection.objects.link(ob)
    if parent is not None:
        bpy.context.view_layer.update()
        ob.parent = parent
        ob.matrix_parent_inverse = parent.matrix_world.inverted()
    return ob


def finish(name, bm, m, origin, bevel=0.0, parent=None):
    bmesh.ops.remove_doubles(bm, verts=bm.verts, dist=1e-6)
    if bevel > 0:
        bmesh.ops.bevel(bm, geom=bm.edges[:], offset=bevel, offset_type='OFFSET', segments=1,
                        profile=0.5, affect='EDGES', clamp_overlap=True)
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    me = bpy.data.meshes.new(name)
    bm.to_mesh(me)
    bm.free()
    me.materials.append(m)
    ob = bpy.data.objects.new(name, me)
    ob.location = Vector(origin)
    return link(ob, parent)


def box(name, mn, mx, m, bevel=0.015, origin=None, parent=None):
    mn, mx = Vector(mn), Vector(mx)
    c = (mn + mx) / 2
    o = Vector(origin) if origin is not None else c
    s = mx - mn
    bm = bmesh.new()
    bmesh.ops.create_cube(bm, size=1.0)
    for v in bm.verts:
        v.co = Vector((v.co.x * s.x, v.co.y * s.y, v.co.z * s.z)) + (c - o)
    return finish(name, bm, m, o, min(bevel, min(s) * 0.3), parent)


def cyl(name, center, r, h, m, axis='Z', seg=24, r2=None, origin=None, parent=None):
    c = Vector(center)
    o = Vector(origin) if origin is not None else c
    bm = bmesh.new()
    bmesh.ops.create_cone(bm, cap_ends=True, cap_tris=False, segments=seg, radius1=r,
                          radius2=r if r2 is None else r2, depth=h)
    if axis == 'X':
        bmesh.ops.rotate(bm, verts=bm.verts, cent=(0, 0, 0), matrix=Matrix.Rotation(math.pi / 2, 3, 'Y'))
    elif axis == 'Y':
        bmesh.ops.rotate(bm, verts=bm.verts, cent=(0, 0, 0), matrix=Matrix.Rotation(math.pi / 2, 3, 'X'))
    bmesh.ops.translate(bm, verts=bm.verts, vec=c - o)
    for f in bm.faces:
        f.smooth = len(f.verts) == 4
    return finish(name, bm, m, o, 0, parent)


def sphere(name, center, r, m, parent=None):
    bm = bmesh.new()
    bmesh.ops.create_uvsphere(bm, u_segments=18, v_segments=10, radius=r)
    for f in bm.faces:
        f.smooth = True
    return finish(name, bm, m, center, 0, parent)


def poly(name, verts, faces, m, origin, parent=None):
    o = Vector(origin)
    bm = bmesh.new()
    vs = [bm.verts.new(Vector(v) - o) for v in verts]
    for f in faces:
        bm.faces.new([vs[i] for i in f])
    return finish(name, bm, m, o, 0, parent)


def text(name, body, loc, size, m, rot=(90, 0, 0), depth=0.012, align='CENTER', parent=None):
    cu = bpy.data.curves.new(name + '_curve', 'FONT')
    cu.body = body
    cu.size = size
    cu.extrude = depth
    cu.align_x = align
    cu.align_y = 'CENTER'
    tmp = bpy.data.objects.new(name + '_tmp', cu)
    SCENE.collection.objects.link(tmp)
    dg = bpy.context.evaluated_depsgraph_get()
    me = bpy.data.meshes.new_from_object(tmp.evaluated_get(dg))
    bpy.data.objects.remove(tmp)
    bpy.data.curves.remove(cu)
    me.materials.clear()
    me.materials.append(m)
    ob = bpy.data.objects.new(name, me)
    ob.location = Vector(loc)
    ob.rotation_euler = [math.radians(a) for a in rot]
    return link(ob, parent)


def join(name, objs):
    bpy.context.view_layer.update()
    with bpy.context.temp_override(active_object=objs[0], object=objs[0], selected_objects=objs,
                                   selected_editable_objects=objs):
        bpy.ops.object.join()
    ob = objs[0]
    ob.name = name
    ob.data.name = name
    return ob


def empty(name, loc, parent=None):
    e = bpy.data.objects.new(name, None)
    e.empty_display_size = 0.15
    e.location = Vector(loc)
    return link(e, parent)


def three_to_blender(p):
    return Vector((p[0], -p[2], p[1]))


def export_and_render(cam_pos, cam_target, ground_z, fov_deg=40, res=(1200, 900)):
    """Save the authored .blend, export the runtime GLB, then render the poster with a temporary camera."""
    bpy.context.view_layer.update()
    bpy.ops.wm.save_as_mainfile(filepath=os.path.join(HERE, 'scene.blend'))
    bpy.ops.export_scene.gltf(filepath=os.path.join(OUT, 'scene.glb'), export_format='GLB',
                              export_yup=True, export_apply=True, export_cameras=False,
                              export_lights=False)
    box('PosterGround', (-30, -30, ground_z - 0.02), (30, 30, ground_z), mat('Ground', '#ebe6db'), 0)
    cam_data = bpy.data.cameras.new('PosterCam')
    cam_data.sensor_fit = 'VERTICAL'
    cam_data.angle = math.radians(fov_deg)
    cam = bpy.data.objects.new('PosterCam', cam_data)
    SCENE.collection.objects.link(cam)
    p, t = three_to_blender(cam_pos), three_to_blender(cam_target)
    cam.location = p
    cam.rotation_euler = (t - p).to_track_quat('-Z', 'Y').to_euler()
    SCENE.camera = cam
    w = bpy.data.worlds.new('PosterWorld')
    w.color = srgb('#f3efe6')
    SCENE.world = w
    r = SCENE.render
    w.color = srgb('#f3efe6')
    w.use_nodes = True
    bg = w.node_tree.nodes.get('Background')
    bg.inputs['Color'].default_value = (*srgb('#f4f0e7'), 1)
    bg.inputs['Strength'].default_value = 0.6
    sun_data = bpy.data.lights.new('PosterSun', 'SUN')
    sun_data.energy = 1.5
    sun_data.angle = math.radians(12)
    sun = bpy.data.objects.new('PosterSun', sun_data)
    SCENE.collection.objects.link(sun)
    sun.rotation_euler = (math.radians(42), math.radians(-18), math.radians(28))
    r.engine = 'BLENDER_EEVEE'
    try:
        SCENE.eevee.taa_render_samples = 48
        SCENE.eevee.use_shadows = True
    except Exception:
        pass
    r.resolution_x, r.resolution_y = res
    r.resolution_percentage = 100
    r.film_transparent = False
    r.filepath = os.path.join(OUT, 'poster.png')
    r.image_settings.file_format = 'PNG'
    r.use_freestyle = True
    r.line_thickness_mode = 'ABSOLUTE'
    r.line_thickness = 1.2
    ls = SCENE.view_layers[0].freestyle_settings.linesets[0] if SCENE.view_layers[0].freestyle_settings.linesets else SCENE.view_layers[0].freestyle_settings.linesets.new('Lines')
    if ls.linestyle is None:
        ls.linestyle = bpy.data.linestyles.new('Ink')
    ls.linestyle.color = srgb('#2f2e2b')
    ls.linestyle.alpha = 0.55
    ls.select_by_visibility = True
    ls.select_by_edge_types = True
    ls.select_silhouette = True
    ls.select_border = True
    ls.select_crease = False
    try:
        SCENE.view_settings.view_transform = 'Standard'
    except Exception:
        pass
    bpy.ops.render.render(write_still=True)
    print('EXPORTED', os.path.join(OUT, 'scene.glb'))



# Opus revision 3: the balancer's signal is a projection. From directly above, a lane shows only how
# many request bases it holds; remaining work is the vertical column height. Lane labels sit outside
# the lanes so neither the arrival rack nor tall columns hide them, and a single amber router pointer
# shows which lane the count rule picks.
box('Plinth',(-4.5,-3.5,-.18),(4.5,2,0),WARM)
for lane,x,lx in [('A',-1.7,-2.85),('B',1.7,2.85)]:
    box('Lane_'+lane,(x-.65,-1.5,0),(x+.65,1.6,.12),IVORY)
    text('LaneLabel_'+lane,lane,(lx,.05,.01),.55,CHAR,rot=(0,0,0))
    for i in range(4):
        y=1.15-i*.72
        box('Slot_'+lane+str(i),(x-.52,y-.3,.12),(x+.52,y+.3,.15),STONE)
# Router: charcoal pivot disc with an amber arrow pointing toward the lanes (+Y); runtime rotates it.
PY=-1.8
cyl('Router_Pivot',(0,PY,.03),.3,.06,CHAR,seg=32)
poly('Router_Pointer',[(-.1,PY,.07),(.1,PY,.07),(.1,PY+.62,.07),(.24,PY+.62,.07),(0,PY+.98,.07),(-.24,PY+.62,.07),(-.1,PY+.62,.07),
                       (-.1,PY,.12),(.1,PY,.12),(.1,PY+.62,.12),(.24,PY+.62,.12),(0,PY+.98,.12),(-.24,PY+.62,.12),(-.1,PY+.62,.12)],
     [(6,5,4,3,2,1,0),(7,8,9,10,11,12,13)]+[(i,(i+1)%7,(i+1)%7+7,i+7) for i in range(7)],AMBER,origin=(0,PY,.07))
for i,cost in enumerate([8,1,1,3,1,1]):
    # Rack spacing leaves a sight line from the default camera to the router pivot.
    x=-3.9+i*1.3; y=-2.95
    box('Work_Q'+str(i+1),(x-.25,y-.18,.3),(x+.25,y+.18,.3+cost*.27),IVORY,origin=(x,y,.3))
    join('Base_Q'+str(i+1),[box('Base_Q'+str(i+1),(x-.37,y-.28,.15),(x+.37,y+.28,.3),CHAR,origin=(x,y,.15)),text('Id'+str(i),str(i+1),(x,y-.29,.225),.21,IVORY)])
export_and_render([5,7,12],[0,.6,.6],-.18)
