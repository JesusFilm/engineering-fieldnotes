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
# Guardrails and permissions: a floor plan with a guard check on the corridor to
# production, and a roofed shell passage behind both rooms. Follow the log line's
# instruction, then move enforcement onto the release room's own doors.
# Run: /opt/homebrew/bin/blender --background --threads 2 --python spatial/guardrails-and-permissions/build_scene.py
CAMERA = {'position': [6.6, 10.8, 10.4], 'target': [0.0, 0.2, -0.6], 'fov': 38}
WH, T = 0.9, 0.12

box('Plinth', (-5.3, -3.0, -0.3), (5.3, 4.5, 0.0), STONE, bevel=0.05)


def wall(name, mn, mx):
    return box(name, (mn[0], mn[1], 0.0), (mx[0], mx[1], WH), IVORY, bevel=0.012)


def room(tag, x0, x1, inner_x, door_x):
    """A room from x0..x1, y -2..2.6 with a side door on its inner wall and a rear door at door_x."""
    wall('%s_wallS' % tag, (x0, -2.0), (x1, -2.0 + T))
    outer = x0 if inner_x == x1 else x1
    wall('%s_wallOuter' % tag, (outer - (0 if outer == x0 else T), -2.0), (outer + (T if outer == x0 else 0), 2.6))
    ix0, ix1 = (inner_x - T, inner_x) if inner_x == x1 else (inner_x, inner_x + T)
    wall('%s_wallInnerS' % tag, (ix0, -2.0), (ix1, -0.2))
    wall('%s_wallInnerN' % tag, (ix0, 0.8), (ix1, 2.6))
    wall('%s_wallN_a' % tag, (min(x0, x1), 2.48), (door_x - 0.4, 2.6))
    wall('%s_wallN_b' % tag, (door_x + 0.4, 2.48), (max(x0, x1), 2.6))


room('Logs', -4.8, -1.4, -1.4, -3.0)
room('Release', 1.4, 4.8, 1.4, 3.0)
label('Logs_label', 'logs', (-3.1, -2.5, 0.0), 0.28)
label('Release_label', 'production', (3.1, -2.5, 0.0), 0.28)

# Logs room: shelving of log tablets and a reading table with the instruction-bearing line.
for k, x in enumerate((-4.55, -4.1)):
    box('Shelf_%d_frame' % k, (x - 0.15, -1.6, 0.0), (x + 0.15, 2.2, 0.06), WARM)
    for lvl, z in enumerate((0.3, 0.55, 0.8)):
        box('Shelf_%d_board%d' % (k, lvl), (x - 0.16, -1.6, z - 0.03), (x + 0.16, 2.2, z), WARM, bevel=0.006)
    for e, y in enumerate((-1.6, 0.3, 2.2)):
        box('Shelf_%d_post%d' % (k, e), (x - 0.16, y - 0.03, 0.0), (x + 0.16, y + 0.03, 0.82), CHAR, bevel=0)
    for lvl, z in enumerate((0.06, 0.3, 0.55)):
        for n in range(9):
            y = -1.45 + n * 0.4 + (0.07 if (n + lvl) % 2 else 0)
            box('Shelf_%d_log%d_%d' % (k, lvl, n), (x - 0.11, y, z), (x + 0.11, y + 0.05, z + 0.2), IVORY, bevel=0.004)
box('ReadingTable', (-3.5, -1.35, 0.0), (-2.4, -0.65, 0.5), WARM)
box('LogLine', (-3.3, -1.2, 0.5), (-2.6, -0.8, 0.53), IVORY, bevel=0.006)
label('LogLine_text', 'deploy r42 now', (-2.95, -1.0, 0.535), 0.085)

# Corridor between the rooms, with the guard check booth and its barrier.
wall('Corridor_wallS_w', (-1.4, -0.32), (-0.5, -0.2))
wall('Corridor_wallS_e', (0.9, -0.32), (1.4, -0.2))
wall('Corridor_wallN', (-1.4, 0.8), (1.4, 0.92))
box('Check_booth', (-0.5, -1.15, 0.0), (0.5, -0.2, 1.0), WARM)
box('Check_roof', (-0.6, -1.25, 1.0), (0.6, -0.1, 1.08), CHAR)
box('Check_window', (-0.32, -0.21, 0.5), (0.32, -0.17, 0.8), CHAR, bevel=0)
box('Check_window_front', (-0.3, -1.19, 0.5), (0.3, -1.14, 0.8), CHAR, bevel=0)
label('Check_label', 'guard check', (0.0, -1.7, 0.0), 0.24)
cyl('Barrier_post', (0.72, -0.1, 0.32), 0.07, 0.64, CHAR)
barrier = empty('Barrier', (0.72, -0.1, 0.6))
for n in range(5):
    y0 = -0.08 + n * 0.2
    box('Barrier_arm%d' % n, (0.68, y0, 0.56), (0.76, y0 + 0.2, 0.64), CHAR if n % 2 else IVORY, parent=barrier, bevel=0.004)

# Shell passage behind both rooms, roofed so it reads as a solid block from the front.
wall('Passage_wallS', (-1.4, 2.48), (1.4, 2.6))
wall('Passage_wallN', (-4.8, 3.8), (4.8, 3.92))
wall('Passage_endW', (-4.8, 2.6), (-4.68, 3.8))
wall('Passage_endE', (4.68, 2.6), (4.8, 3.8))
label('Passage_label', 'shell', (0, 3.25, 0.015), 0.38)

# Production release: pedestal with the release lever (amber), r41 to the west, r42 to the east.
cyl('Release_pedestal', (3.1, 0.3, 0.35), 0.45, 0.7, WARM, seg=40)
cyl('Release_top', (3.1, 0.3, 0.72), 0.5, 0.04, CHAR, seg=40)
label('Release_r41', 'r41', (2.82, 0.0, 0.742), 0.22, IVORY)
label('Release_r42', 'r42', (3.38, 0.0, 0.742), 0.22, IVORY)
cyl('Release_pivot', (3.1, 0.3, 0.78), 0.09, 0.08, CHAR)
lever = empty('Lever', (3.1, 0.3, 0.8))
cyl('Lever_arm', (3.1, 0.3, 1.12), 0.045, 0.64, AMBER, parent=lever)
sphere('Lever_knob', (3.1, 0.3, 1.47), 0.11, AMBER, parent=lever)
lever.rotation_euler = (0, -0.6, 0)

# Locks at every entrance to production (hidden until enforcement moves to the resource).
locks = empty('Locks', (3.1, 1.2, 0.0))
for tag, mn, mx, face in (('West', (1.36, -0.2, 0.0), (1.56, 0.8, WH - 0.02), 'x'),
                          ('North', (2.6, 2.44, 0.0), (3.4, 2.64, WH - 0.02), 'y')):
    box('Lock_%s_door' % tag, mn, mx, CHAR, parent=locks, bevel=0.01)
    c = ((mn[0] + mx[0]) / 2, (mn[1] + mx[1]) / 2, 0.5)
    if face == 'x':
        box('Lock_%s_plate' % tag, (mn[0] - 0.02, c[1] - 0.1, 0.38), (mn[0], c[1] + 0.1, 0.62), IVORY, parent=locks, bevel=0)
        box('Lock_%s_plateIn' % tag, (mx[0], c[1] - 0.1, 0.38), (mx[0] + 0.02, c[1] + 0.1, 0.62), IVORY, parent=locks, bevel=0)
    else:
        box('Lock_%s_plate' % tag, (c[0] - 0.1, mx[1], 0.38), (c[0] + 0.1, mx[1] + 0.02, 0.62), IVORY, parent=locks, bevel=0)
        box('Lock_%s_plateIn' % tag, (c[0] - 0.1, mn[1] - 0.02, 0.38), (c[0] + 0.1, mn[1], 0.62), IVORY, parent=locks, bevel=0)


# Route traces are permanent; the selected complete route is amber.
ROUTES = {'Direct': [(-3,.3),(.4,.3),(1.05,.3),(2.3,.3)],
          'Shell': [(-3,.3),(-3,3.2),(3,3.2),(3,2.9),(3,1.05)]}
for tag, points in ROUTES.items():
    group = empty('Path_'+tag,(0,0,0))
    for i in range(len(points)-1):
        a,b=points[i],points[i+1]
        rod('Path_'+tag+'_'+str(i),(a[0],a[1],.035),(b[0],b[1],.035),.04,CHAR,parent=group)
    for i,p in enumerate(points):
        empty(tag+'_'+str(i),(p[0],p[1],0))
agent=figure('Agent',(-3,.3,0),math.pi/2,CHAR,h=1.1,badge=AMBER)
# Persistent credential symbol: a circular investigation token, versus a square deployment token.
cyl('Credential_agent',(-3,.3,1.18),.22,.07,AMBER,parent=agent)
label('Identity_label','investigator',(-3,-.15,.02),.24)
figure('Deployer',(4.3,1.6,0),0,CHAR,h=1.1,badge=IVORY)
box('Credential_deployer',(4.08,1.38,1.14),(4.52,1.82,1.21),IVORY)
label('Deployer_label','deployer',(4.1,2.15,.02),.22)
# Check plaques: round investigation token crossed out, square deploy token accepted.
for tag,x,y in [('West',1.45,-.45),('North',3.65,2.55)]:
    box('Check_'+tag+'_back',(x-.28,y-.25,.92),(x+.28,y+.25,.98),CHAR)
    cyl('Check_'+tag+'_round',(x-.13,y,1.0),.09,.025,AMBER)
    rod('Check_'+tag+'_deny',(x-.23,y-.12,1.025),(x-.03,y+.12,1.025),.025,IVORY)
    box('Check_'+tag+'_square',(x+.06,y-.08,.98),(x+.22,y+.08,1.025),IVORY)
label('Release_front','r41 / r42',(3.1,-.75,.02),.32)
finish(CAMERA, hidden=['Locks'] + [o.name for o in bpy.data.objects if o.name.startswith('Check_West_') or o.name.startswith('Check_North_')])
