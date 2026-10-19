// Harness engineering: two routes to one invoice, and a choice of where the
// ownership check sits. Coordinates are Three (Y up). Blender +Y is Three -Z.
// Action 1 moves the check (front route gate <-> guard at the invoice).
// Action 2 runs four probes: tenants A and B on the front and export routes.
export default function setup(ctx) {
  const { THREE, model } = ctx;
  const get = (n) => model.getObjectByName(n);
  const meshes = [];
  model.traverse((o) => { if (o.isMesh) meshes.push(o); });

  const lineMat = new THREE.LineBasicMaterial({ color: 0x2f2e2b, transparent: true, opacity: 0.8 });
  const lines = [];
  for (const m of meshes) {
    if (/^(Copy_|Lamp_)/.test(m.name) && !/_rim$/.test(m.name)) continue;
    const l = new THREE.LineSegments(new THREE.EdgesGeometry(m.geometry, 35), lineMat);
    l.raycast = () => {};
    m.add(l);
    lines.push(l);
  }

  const L0 = 2.68, D0 = 0.08;
  // Tip distance from the station face; blocked prongs end flush on the barrier.
  const STOP = { reach: 2.68, gate: 0.818, guard: 2.358 };
  const PROBES = [
    { route: 'front', tenant: 'A', dir: new THREE.Vector3(0, 0, -1), axis: 'z' },
    { route: 'front', tenant: 'B', dir: new THREE.Vector3(0, 0, -1), axis: 'z' },
    { route: 'export', tenant: 'A', dir: new THREE.Vector3(-1, 0, 0), axis: 'x' },
    { route: 'export', tenant: 'B', dir: new THREE.Vector3(-1, 0, 0), axis: 'x' },
  ];
  for (const p of PROBES) {
    const k = p.route + '_' + p.tenant;
    p.bar = get('Probe_' + k + '_bar');
    p.tip = get('Probe_' + k + '_tip');
    p.copy = get('Copy_' + k);
    p.lamp = get('Lamp_' + k);
    p.tip0 = p.tip.position.clone();
    p.scale0 = p.bar.scale.clone();
  }
  const gate = get('Gate_front'), guard = get('Guard_invoice');

  const LAMP = {
    unrun: get('Lamp_front_A').material,
    pass: new THREE.MeshStandardMaterial({ color: 0xfbf7ea, emissive: 0xfff3d6, emissiveIntensity: 0.55, roughness: 0.4 }),
    fail: new THREE.MeshStandardMaterial({ color: 0xd98f22, emissive: 0xd98f22, emissiveIntensity: 0.45, roughness: 0.45 }),
    stale: new THREE.MeshStandardMaterial({ color: 0xbdb8ad, roughness: 0.7 }),
  };

  let placement = 'front'; // 'front' gate or 'guard' at the invoice
  let results = null;      // { placement, byKey: {front_A: {...}} }
  let stale = false;
  let run = null;          // { t }

  const NAME = { front: 'front', export: 'export' };
  const CAPTION = {
    initial: 'The repair added an ownership check on the front route to invoice A-17, which belongs to tenant A. The harness probes tenants A and B on the front and export routes.',
    toGuard: 'The ownership check now sits at the invoice, where every route to A-17 meets it.',
    toFront: 'The ownership check now sits on the front route, where the repair placed it.',
    stale: 'The check moved, so the lamps are stale: those results describe the previous build.',
    running: 'Running four probes: tenants A and B, each on the front and export routes.',
    front: 'Front route: A received the invoice and B was refused. Export route: B also received A’s invoice because it never passes the gate, so a harness probing only the front route would have reported green.',
    guard: 'All four results match: A receives A-17 on both routes and B is refused on both. These probes cover two routes and one invoice; other routes and records remain untested.',
    gate: 'Ownership gate on the front route: open for A, barred for B. Only requests on this route pass it.',
    guardPick: 'Ownership guard at the invoice: slots open toward A’s probes and shut toward B’s, on every route.',
    invoice: 'Invoice A-17, owned by tenant A. Both routes end at this tray.',
    frontRoute: 'The front route: the request the repair was written for.',
    exportRoute: 'The export route reaches the same tray through the east hatch.',
  };

  function outcome(p, where) {
    const owner = p.tenant === 'A';
    const blocked = !owner && (where === 'guard' || p.route === 'front');
    const stop = blocked ? (where === 'guard' ? STOP.guard : STOP.gate) : STOP.reach;
    const expected = owner ? 200 : 403;
    const got = blocked ? 403 : 200;
    return { blocked, stop, expected, got, pass: expected === got };
  }

  function poseProbe(p, dist, carrying) {
    p.tip.position.copy(p.tip0).addScaledVector(p.dir, dist - D0);
    p.bar.scale.copy(p.scale0);
    p.bar.scale[p.axis] = dist / L0;
    p.copy.visible = carrying;
  }
  const setVisible = (o, v) => o.traverse((c) => { if (c.isMesh) c.visible = v; });

  function applyPlacement() {
    setVisible(gate, placement === 'front');
    setVisible(guard, placement === 'guard');
  }
  function clearProbes() {
    for (const p of PROBES) poseProbe(p, D0, false);
  }
  function paintLamps() {
    for (const p of PROBES) {
      const r = results?.byKey[p.route + '_' + p.tenant];
      p.lamp.material = !r ? LAMP.unrun : stale ? LAMP.stale : r.pass ? LAMP.pass : LAMP.fail;
    }
  }

  const move = ctx.addAction('Move check to the invoice', togglePlacement);
  const go = ctx.addAction('Run the four probes', startRun);
  function syncButtons() {
    move.textContent = placement === 'front' ? 'Move check to the invoice' : 'Move check to the front route';
    go.textContent = stale ? 'Run the probes again' : 'Run the four probes';
    move.disabled = go.disabled = !!run;
  }

  // Changing the placement invalidates every earlier result at once.
  function togglePlacement() {
    if (run) return;
    placement = placement === 'front' ? 'guard' : 'front';
    applyPlacement();
    clearProbes();
    if (results) stale = true;
    paintLamps();
    const where = placement === 'guard' ? CAPTION.toGuard : CAPTION.toFront;
    ctx.caption(stale ? CAPTION.stale + ' ' + where : where);
    syncButtons();
    ctx.invalidate();
  }

  function startRun() {
    if (run) return;
    clearProbes();
    results = null;
    stale = false;
    paintLamps();
    for (const p of PROBES) p.out = outcome(p, placement);
    run = { t: 0 };
    ctx.view([4.6, 4.4, 4.9], [0.8, 0.25, 0.9]);
    ctx.caption(CAPTION.running);
    if (ctx.reducedMotion) { pose(99); finishRun(); return; }
    syncButtons();
    ctx.invalidate();
  }

  const ease = (u) => { u = Math.min(1, Math.max(0, u)); return u * u * (3 - 2 * u); };
  // Extend 0–1.6 s at a shared speed, stopping on contact; hold; then probes
  // that received the invoice retract with it (1.9–3.3 s). Refused probes stay
  // pressed against whatever stopped them, so the contact remains inspectable.
  function pose(t) {
    const reach = D0 + (L0 - D0) * ease(t / 1.6);
    const back = ease((t - 1.9) / 1.4);
    for (const p of PROBES) {
      const o = p.out;
      let dist = Math.min(o.stop, reach);
      const carrying = !o.blocked && t >= 1.6;
      if (!o.blocked) dist = o.stop + (D0 - o.stop) * back;
      poseProbe(p, dist, carrying);
    }
    return t < 3.3;
  }

  function finishRun() {
    results = { placement, byKey: {} };
    for (const p of PROBES) results.byKey[p.route + '_' + p.tenant] = p.out;
    stale = false;
    run = null;
    paintLamps();
    ctx.caption(placement === 'front' ? CAPTION.front : CAPTION.guard);
    syncButtons();
    ctx.invalidate();
  }

  function lampText(route, tenant) {
    const who = 'Tenant ' + tenant + ', ' + NAME[route] + ' route: ';
    const r = results?.byKey[route + '_' + tenant];
    if (!r) return who + 'not run yet.';
    const body = 'expected ' + r.expected + ', got ' + r.got + (r.got === 200 ? ' with A-17.' : '.');
    return stale ? who + 'stale. Last run (' + body.replace(/\.$/, '') + ') was against the previous check placement.' : who + body;
  }

  ctx.onPick((hits) => {
    if (run) return;
    const hit = hits[0];
    if (!hit) return;
    // Use the mesh's own name, or the logical group it belongs to. A returned
    // copy rides on a probe tip but keeps its own identity.
    let name = hit.object.name;
    if (!/^Copy_/.test(name)) {
      for (let o = hit.object.parent; o && o !== model; o = o.parent) {
        if (/^(Gate_front|Guard_invoice|Invoice_A17|Probe_\w+_tip)$/.test(o.name)) name = o.name;
      }
    }
    let m;
    if ((m = /^Lamp_(front|export)_(A|B)/.exec(name))) return ctx.caption(lampText(m[1], m[2]));
    if ((m = /^Copy_(front|export)_(A|B)/.exec(name))) return ctx.caption(m[2] === 'A' ? 'Tenant A’s copy of A-17, returned on the ' + m[1] + ' route (200).' : 'Tenant B’s ' + m[1] + ' probe came back with A’s invoice: expected 403, got 200.');
    if ((m = /^Probe_(front|export)_(A|B)/.exec(name))) return ctx.caption('Probe for tenant ' + m[2] + ' on the ' + m[1] + ' route. ' + lampText(m[1], m[2]));
    if (/^Gate_/.test(name)) return ctx.caption(CAPTION.gate);
    if (/^Guard_/.test(name)) return ctx.caption(CAPTION.guardPick);
    if (/^(Invoice|Tray|Pedestal|Owner_plate)/.test(name)) return ctx.caption(CAPTION.invoice);
    if (/^(Export_|Hatch_|Station_export)/.test(name)) return ctx.caption(CAPTION.exportRoute);
    if (/^(Front_|Door_|Station_front)/.test(name)) return ctx.caption(CAPTION.frontRoute);
  });

  function reset() {
    run = null;
    placement = 'front';
    results = null;
    stale = false;
    applyPlacement();
    clearProbes();
    paintLamps();
    syncButtons();
    ctx.caption(CAPTION.initial);
    ctx.invalidate();
  }
  reset();

  return {
    update(dt) {
      if (!run) return false;
      run.t += dt;
      if (pose(run.t)) return true;
      finishRun();
      return false;
    },
    reset,
    dispose() {
      for (const l of lines) { l.removeFromParent(); l.geometry.dispose(); }
      lineMat.dispose();
      LAMP.pass.dispose(); LAMP.fail.dispose(); LAMP.stale.dispose();
    },
  };
}
