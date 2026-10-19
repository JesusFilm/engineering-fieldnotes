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


# ---------------------------------------------------------------------------
# Queues and backpressure: the queue is a trough of numbered places. The producer
# is a hopper on rails that sits at the end of the queue, so the queue's bound is a
# physical length. When the trough is full the next job meets the tail job at the
# hopper mouth and an amber latch drops: the producer is held.
# Run: /opt/homebrew/bin/blender --background --threads 2 --python spatial/queues-and-backpressure/build_scene.py
# ---------------------------------------------------------------------------
SLOT0, PITCH, PLACES = 1.4, 0.7, 7
PAD = 0.12
TILE_H, TILE_GAP = 0.19, 0.21


def hopper_x(cap):
    return SLOT0 - PITCH * (cap - 0.5) - 0.42


HX = hopper_x(3)

join('Plinth', [box('PlinthTop', (-5.3, -1.7, -0.4), (5.0, 1.5, 0), WARM, 0.03),
                box('PlinthBase', (-5.4, -1.8, -0.55), (5.1, 1.6, -0.4), STONE, 0.02)])

# Queue trough with seven numbered places.
q = [box('Trough', (-3.3, -0.42, 0), (1.85, 0.42, 0.1), IVORY, 0.02),
     box('TroughLipS', (-3.3, -0.44, 0.1), (1.85, -0.39, 0.17), CHAR, 0.005),
     box('TroughLipN', (-3.3, 0.39, 0.1), (1.85, 0.44, 0.17), CHAR, 0.005),
     text('QueueLabel', 'queue', (-0.7, -1.38, 0.004), 0.2, CHAR, rot=(0, 0, 0), depth=0.004)]
for k in range(PLACES):
    x = SLOT0 - PITCH * k
    q.append(box('Place%d' % k, (x - 0.31, -0.31, 0.1), (x + 0.31, 0.31, PAD), WARM, 0.004))
    q.append(text('PlaceNum%d' % k, str(k + 1), (x, -0.98, 0.004), 0.14, CHAR, rot=(0, 0, 0), depth=0.003))
    empty('Slot_%d' % k, (x, 0, PAD))
for y in (-0.7, 0.7):
    q.append(box('Rail%.1f' % y, (-4.5, y - 0.035, 0), (0.25, y + 0.035, 0.05), CHAR, 0.005))
join('Queue_Trough', q)

# Producer gantry, parented to an empty so it can roll as a unit.
prod = empty('Producer', (HX, 0, 0))
pp = []
for sx in (-0.42, 0.42):
    for sy in (-0.7, 0.7):
        pp.append(box('Leg%.1f%.1f' % (sx, sy), (HX + sx - 0.05, sy - 0.05, 0.08), (HX + sx + 0.05, sy + 0.05, 2.15), IVORY, 0.012))
        pp.append(box('Wheel%.1f%.1f' % (sx, sy), (HX + sx - 0.11, sy - 0.06, 0.04), (HX + sx + 0.11, sy + 0.06, 0.13), CHAR, 0.02))
pp += [box('TopBeam', (HX - 0.52, -0.78, 2.1), (HX + 0.52, 0.78, 2.26), WARM, 0.02),
       box('SillS', (HX - 0.47, -0.74, 0.13), (HX + 0.47, -0.66, 0.2), IVORY, 0.01),
       box('SillN', (HX - 0.47, 0.66, 0.13), (HX + 0.47, 0.74, 0.2), IVORY, 0.01),
       box('HopperFloor', (HX - 0.37, -0.37, 0.1), (HX + 0.37, 0.37, PAD), CHAR, 0.004),
       box('HopperBack', (HX - 0.39, -0.36, 0.34), (HX - 0.35, 0.36, 2.1), IVORY, 0.008),
       text('ProducerLabel', 'producer', (HX, -0.785, 2.18), 0.11, CHAR, depth=0.004)]
for sx in (-0.35, 0.35):
    for sy in (-0.35, 0.35):
        pp.append(box('Post%.2f%.2f' % (sx, sy), (HX + sx - 0.025, sy - 0.025, PAD), (HX + sx + 0.025, sy + 0.025, 2.1), IVORY, 0.006))
frame = join('Producer_Frame', pp)
frame.location.x -= HX
frame.parent = prod
push = join('Producer_Pusher', [box('Producer_Pusher', (HX - 0.56, -0.18, 0.14), (HX - 0.38, 0.18, 0.3), CHAR, 0.01, origin=(HX - 0.38, 0, 0.14)),
                                box('PusherRod', (HX - 0.8, -0.03, 0.19), (HX - 0.56, 0.03, 0.25), CHAR, 0)])
push.parent = prod
push.location.x = -0.38
latch = box('Producer_Latch', (HX + 0.37, -0.36, 0), (HX + 0.43, 0.36, 0.2), AMBER, 0.01, origin=(HX + 0.4, 0, 0))
latch.parent = prod
latch.location = (0.4, 0, 0.36)
bpy.context.view_layer.update()

# Eight jobs stacked in the hopper, A at the bottom (next to leave).
for i, ch in enumerate('ABCDEFGH'):
    z = PAD + TILE_GAP * i
    join('Job_' + ch, [box('Job_' + ch, (HX - 0.28, -0.28, z), (HX + 0.28, 0.28, z + TILE_H), IVORY, 0.02, origin=(HX, 0, z)),
                       text('Job%sTop' % ch, ch, (HX, 0, z + TILE_H + 0.001), 0.3, CHAR, rot=(0, 0, 0), depth=0.002),
                       text('Job%sFront' % ch, ch, (HX, -0.285, z + TILE_H / 2), 0.13, CHAR, depth=0.003)])

# Tool (single worker) with a progress dial, then the done tray.
wx = 2.4
w = [box('StationPlate', (1.95, -0.42, 0), (2.85, 0.42, PAD), WARM, 0.01),
     box('ToolWallS', (2.0, -0.62, 0), (2.8, -0.5, 1.15), IVORY, 0.015),
     box('ToolWallN', (2.0, 0.5, 0), (2.8, 0.62, 1.15), IVORY, 0.015),
     box('ToolRoof', (1.95, -0.68, 1.15), (2.85, 0.68, 1.3), WARM, 0.02),
     cyl('Dial', (wx, -0.635, 0.72), 0.24, 0.03, IVORY, axis='Y', seg=36),
     cyl('DialRim', (wx, -0.628, 0.72), 0.26, 0.016, CHAR, axis='Y', seg=36),
     text('ToolLabel', 'tool', (wx, -0.685, 1.225), 0.11, CHAR, depth=0.004)]
for k in range(4):
    a = k * math.pi / 2
    w.append(box('DialTick%d' % k, (wx + 0.19 * math.sin(a) - 0.012, -0.655, 0.72 + 0.19 * math.cos(a) - 0.012),
                 (wx + 0.19 * math.sin(a) + 0.012, -0.648, 0.72 + 0.19 * math.cos(a) + 0.012), CHAR, 0))
# Open execution socket: remove facade and roof; keep the side dial.
for o in list(w):
    if o.name in ['ToolWallS','ToolRoof','ToolLabel']:
        w.remove(o); bpy.data.objects.remove(o,do_unlink=True)
for o in w:
    if o.name.startswith('Dial'): o.location.x += .7
join('Tool', w)
box('Worker_Needle', (wx - 0.015, -0.665, 0.72), (wx + 0.015, -0.65, 0.89), CHAR, 0, origin=(wx, -0.66, 0.72))
bpy.data.objects['Worker_Needle'].location.x += .7
empty('Station', (wx, 0, PAD))

join('Done_Tray', [box('Tray', (3.45, -0.45, 0), (4.55, 0.45, 0.08), IVORY, 0.02),
                   box('TrayLipS', (3.45, -0.47, 0.08), (4.55, -0.42, 0.14), CHAR, 0.005),
                   box('TrayLipN', (3.45, 0.42, 0.08), (4.55, 0.47, 0.14), CHAR, 0.005),
                   text('DoneLabel', 'done', (4.0, -0.75, 0.004), 0.16, CHAR, rot=(0, 0, 0), depth=0.003)])
empty('Done_0', (4.0, 0, 0.08))

export_and_render([0.6, 5.6, 9.8], [-0.2, 0.3, 0.0], -0.55)

