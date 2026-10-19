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
# Tool design: three sealed incident searches hand back the same empty tray.
# Lift a lid to see how far each search actually reached; switch the trays to
# carry status and coverage so the difference is visible from outside.
# Run: /opt/homebrew/bin/blender --background --threads 2 --python spatial/tool-design/build_scene.py
CAMERA = {'position': [8.8, 10.8, 13.2], 'target': [0.0, 0.0, 0.8], 'fov': 38}

LANE_X = (-2.3, 0.0, 2.3)
Y0, Y1 = -2.3, 3.3          # searched hour: 0 min at the front, 60 min at the back
TILE = (Y1 - Y0) / 12       # five minutes per floor tile
STOP = (12, 8, 2)           # tiles each search covered: complete, stopped at its limit, timed out
INCIDENTS = ((), (10,), (5, 9))
HW = 0.85

box('Plinth', (-4.5, -5.9, -0.3), (4.5, 4.4, 0.0), STONE, bevel=0.05)

for i, cx in enumerate(LANE_X, start=1):
    t = str(i)
    # Housing: base, walls and a front wall with an output slot.
    box('Housing_%s_base' % t, (cx - HW, -2.7, 0.0), (cx + HW, 3.7, 0.12), IVORY)
    box('Housing_%s_wallW' % t, (cx - HW, -2.7, 0.12), (cx - HW + 0.1, 3.7, 1.1), IVORY)
    box('Housing_%s_wallE' % t, (cx + HW - 0.1, -2.7, 0.12), (cx + HW, 3.7, 1.1), IVORY)
    box('Housing_%s_back' % t, (cx - HW + 0.1, 3.6, 0.12), (cx + HW - 0.1, 3.7, 1.1), IVORY)
    box('Housing_%s_frontL' % t, (cx - HW + 0.1, -2.7, 0.12), (cx - 0.42, -2.6, 1.1), IVORY)
    box('Housing_%s_frontR' % t, (cx + 0.42, -2.7, 0.12), (cx + HW - 0.1, -2.6, 1.1), IVORY)
    box('Housing_%s_frontTop' % t, (cx - 0.42, -2.7, 0.46), (cx + 0.42, -2.6, 1.1), IVORY)
    # Hinged lid; origin on the back top edge so it opens like a model box.
    lid = box('Lid_%s' % t, (cx - HW - 0.04, -2.76, 1.1), (cx + HW + 0.04, 3.74, 1.2), WARM, origin=(cx, 3.74, 1.2))
    box('Lid_%s_pull' % t, (cx - 0.28, -2.84, 1.11), (cx + 0.28, -2.76, 1.19), CHAR, parent=lid, bevel=0.01)
    for k, s in enumerate((-1, 1)):
        cyl('Lid_%s_hinge%d' % (t, k), (cx + s * 0.5, 3.74, 1.2), 0.045, 0.3, CHAR, rot=(0, math.pi / 2, 0))

    # The searched hour: twelve five-minute tiles with tick marks every five and fifteen minutes.
    for k in range(12):
        y0 = Y0 + k * TILE
        box('Lane_%s_tile%02d' % (t, k), (cx - 0.72, y0 + 0.012, 0.12), (cx + 0.72, y0 + TILE - 0.012, 0.15),
            IVORY if k % 2 == 0 else WARM, bevel=0.006)
    for k in range(13):
        y = Y0 + k * TILE
        box('Lane_%s_tick%02d' % (t, k), (cx - 0.74, y - 0.014, 0.15),
            (cx - 0.74 + (0.24 if k % 3 == 0 else 0.12), y + 0.014, 0.166), CHAR, bevel=0)
    for k, s in enumerate((-1, 1)):
        box('Lane_%s_rail%d' % (t, k), (cx + s * 0.45 - 0.03, Y0, 0.15), (cx + s * 0.45 + 0.03, Y1, 0.2), CHAR, bevel=0)
    ys = Y0 + STOP[i - 1] * TILE
    # Scored line: the part of the hour the search actually read.
    box('Lane_%s_swept' % t, (cx - 0.03, Y0, 0.15), (cx + 0.03, ys, 0.163), CHAR, bevel=0)

    # Search carriage parked where it stopped.
    yc = ys - 0.14
    car = empty('Carriage_%s' % t, (cx, yc, 0.2))
    for k, s in enumerate((-1, 1)):
        box('Carriage_%s_shoe%d' % (t, k), (cx + s * 0.45 - 0.07, yc - 0.13, 0.2), (cx + s * 0.45 + 0.07, yc + 0.13, 0.28), CHAR, parent=car)
        box('Carriage_%s_leg%d' % (t, k), (cx + s * 0.45 - 0.05, yc - 0.07, 0.28), (cx + s * 0.45 + 0.05, yc + 0.07, 0.74), WARM, parent=car)
    box('Carriage_%s_beam' % t, (cx - 0.56, yc - 0.1, 0.72), (cx + 0.56, yc + 0.1, 0.82), WARM, parent=car)
    cyl('Carriage_%s_head' % t, (cx, yc, 0.56), 0.075, 0.32, CHAR, parent=car)
    box('Carriage_%s_reader' % t, (cx - 0.34, yc - 0.035, 0.34), (cx + 0.34, yc + 0.035, 0.4), CHAR, parent=car)

    # Backend cable from the slot to the carriage; the timed-out search has a parted cable.
    if i < 3:
        rod('Lane_%s_cable' % t, (cx + 0.3, -2.6, 0.92), (cx + 0.3, yc, 0.92), 0.022, CHAR)
        rod('Lane_%s_cableDrop' % t, (cx + 0.3, yc, 0.92), (cx + 0.3, yc, 0.82), 0.022, CHAR)
    else:
        rod('Lane_3_cable', (cx + 0.3, -2.6, 0.92), (cx + 0.3, -2.12, 0.92), 0.022, CHAR)
        rod('Lane_3_cableLoose', (cx + 0.3, -2.12, 0.92), (cx + 0.36, -1.98, 0.2), 0.022, CHAR)
        rod('Lane_3_cableStub', (cx + 0.3, yc, 0.82), (cx + 0.3, yc - 0.18, 0.62), 0.022, CHAR)
    if i == 2:
        # The scan budget: a stop block on the rail just beyond the carriage.
        box('Lane_2_limit', (cx + 0.38, ys + 0.04, 0.2), (cx + 0.52, ys + 0.2, 0.42), CHAR)
    if i == 3:
        car.rotation_euler = (0, 0, 0.13)

    # Incidents that exist in the hour but lie beyond where the search stopped.
    for n, k in enumerate(INCIDENTS[i - 1]):
        y = Y0 + (k + 0.5) * TILE
        box('Incident_%s_%d_base' % (t, n), (cx - 0.24, y - 0.11, 0.15), (cx + 0.24, y + 0.11, 0.2), CHAR)
        card = box('Incident_%s_%d' % (t, n), (cx - 0.2, y - 0.04, 0.2), (cx + 0.2, y + 0.04, 0.66), AMBER)
        for r, z in enumerate((0.55, 0.47, 0.39)):
            box('Incident_%s_%d_line%d' % (t, n, r), (cx - 0.14, y - 0.052, z), (cx + (0.14 if r < 2 else 0.04), y - 0.04, z + 0.025), CHAR, bevel=0)

# Counter with one tray per search; the agent sees only these.
box('Counter', (-3.7, -4.35, 0.0), (3.7, -2.92, 0.2), IVORY, bevel=0.03)
for i, cx in enumerate(LANE_X, start=1):
    t = str(i)
    box('Tray_%s_base' % t, (cx - 0.62, -4.18, 0.2), (cx + 0.62, -3.02, 0.25), WARM)
    box('Tray_%s_rimS' % t, (cx - 0.62, -4.18, 0.25), (cx + 0.62, -4.12, 0.36), IVORY)
    box('Tray_%s_rimN' % t, (cx - 0.62, -3.08, 0.25), (cx + 0.62, -3.02, 0.36), IVORY)
    box('Tray_%s_rimW' % t, (cx - 0.62, -4.12, 0.25), (cx - 0.56, -3.08, 0.36), IVORY)
    box('Tray_%s_rimE' % t, (cx + 0.56, -4.12, 0.25), (cx + 0.62, -3.08, 0.36), IVORY)
    # Status and coverage carried out through the interface (hidden until requested).
    cov = empty('Coverage_%s' % t, (cx, -3.6, 0.25))
    s0, s1 = -4.02, -3.18
    box('Coverage_%s_strip' % t, (cx - 0.13, s0, 0.25), (cx + 0.13, s1, 0.28), IVORY, parent=cov, bevel=0.008)
    yf = s0 + (s1 - s0) * STOP[i - 1] / 12
    box('Coverage_%s_fill' % t, (cx - 0.1, s0, 0.28), (cx + 0.1, yf, 0.31), CHAR, parent=cov, bevel=0.005)
    if i == 1:
        box('Coverage_1_complete', (cx - 0.2, s1 - 0.02, 0.25), (cx + 0.2, s1 + 0.03, 0.46), CHAR, parent=cov)
        word = 'complete'
    elif i == 2:
        box('Coverage_2_cursor', (cx + 0.16, yf - 0.03, 0.25), (cx + 0.2, yf + 0.03, 0.56), CHAR, parent=cov, bevel=0)
        box('Coverage_2_cursorTab', (cx + 0.2, yf - 0.03, 0.42), (cx + 0.42, yf + 0.03, 0.56), CHAR, parent=cov, bevel=0)
        word = 'partial + cursor'
    else:
        box('Coverage_3_pole', (cx + 0.28, -3.3, 0.25), (cx + 0.32, -3.26, 0.82), CHAR, parent=cov, bevel=0)
        box('Coverage_3_flag', (cx + 0.32, -3.3, 0.58), (cx + 0.56, -3.26, 0.82), CHAR, parent=cov, bevel=0)
        word = 'error: timeout'
    label('Coverage_%s_word' % t, word, (cx, -4.36, 0.1), 0.13, CHAR, rot=(math.pi / 2, 0, 0), parent=cov)

# Scale of the hour, engraved on the plinth beside the right-hand housing.
for txt, y in (('0', Y0), ('30', (Y0 + Y1) / 2), ('60 min', Y1)):
    label('Scale_%s' % txt.split()[0], txt, (3.62, y, 0.0), 0.24, CHAR)

figure('Agent', (0.0, -5.15, 0.0), math.pi, CHAR, h=1.15)

def open_pose():
    for i in (1, 2, 3):
        bpy.data.objects['Lid_%d' % i].rotation_euler = (-1.8, 0, 0)


finish(CAMERA, hidden=['Coverage_1', 'Coverage_2', 'Coverage_3'], debug_pose=open_pose)


