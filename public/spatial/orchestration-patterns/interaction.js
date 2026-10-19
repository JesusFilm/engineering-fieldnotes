// Orchestration patterns: two read-only reviewers inspect the same frozen snapshot through windows
// that face different sides. Their reports carry the snapshot's key profile; the join accepts them
// only while that profile still matches the snapshot on the pedestal.
export default function setup(ctx) {
  const { THREE, model } = ctx;
  const SINK = 0.9; // version 2 is parked this far inside the pedestal (build_scene.py)
  const missing = [];
  const node = (name) => {
    const o = model.getObjectByName(name);
    if (!o) missing.push(name);
    return o;
  };
  // Serial step runner driven by the host's update(). Reduced motion collapses each step to its end state.
  const reduced = !!ctx.reducedMotion;
  const ease = (p) => (p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2);
  let queue = [];
  let cur = null;
  let curT = 0;
  const play = (...steps) => { queue.push(...steps.filter(Boolean)); ctx.invalidate(); };
  const stopAll = () => { queue = []; cur = null; };
  const advance = (dt) => {
    if (dt > 5) dt /= 1000; // tolerate millisecond deltas
    dt = Math.min(dt, 0.1);
    for (let guard = 0; guard < 64; guard++) {
      if (!cur) {
        cur = queue.shift();
        if (!cur) return false;
        curT = 0;
        if (cur.start) cur.start();
      }
      const dur = reduced ? 0 : cur.dur || 0;
      curT += dt;
      dt = 0;
      const p = dur > 0 ? Math.min(1, curT / dur) : 1;
      if (cur.apply) cur.apply(cur.linear ? p : ease(p));
      if (p < 1) return true;
      const done = cur.done;
      cur = null;
      if (done) done();
    }
    return true;
  };

  const snaps = { 1: node('Snapshot_v1'), 2: node('Snapshot_v2') };
  const arm = node('Gate_Arm');
  const reports = {};
  for (const w of ['Compat', 'Migr']) for (const v of [1, 2]) reports[w + v] = node('Report_' + w + '_v' + v);
  const local = (name, ref) => {
    const o = node(name);
    return o ? ref.parent.worldToLocal(o.getWorldPosition(new THREE.Vector3())) : new THREE.Vector3();
  };
  const anyReport = reports.Compat1;
  const seat = { Compat: local('Cradle_SeatL', anyReport), Migr: local('Cradle_SeatR', anyReport) };
  const stale = { Compat: local('Stale_SeatL', anyReport), Migr: local('Stale_SeatR', anyReport) };
  const exit = { Compat: local('Booth_Compat_Exit', anyReport), Migr: local('Booth_Migr_Exit', anyReport) };
  const booths = { Compat: node('Booth_Compat'), Migr: node('Booth_Migr') };
  if (missing.length) console.warn('[orchestration-patterns] missing nodes:', missing.join(', '));

  const base = {
    snap: { 1: snaps[1].position.y, 2: snaps[2].position.y },
    arm: arm.rotation.z,
    reports: Object.fromEntries(Object.entries(reports).map(([k, o]) => [k, { pos: o.position.clone(), scale: o.scale.clone(), rot: o.rotation.z }])),
  };
  // Snapshot centre and reviewer window positions in model coordinates, for "look through" views.
  const snapCenter = snaps[1].getWorldPosition(new THREE.Vector3()).add(new THREE.Vector3(0, 0.4, 0));

  let version = 1;
  let cradle = { Compat: null, Migr: null }; // version held by each seat
  let staleHeld = { Compat: null, Migr: null };
  let gateOpen = false;
  let busy = false;

  const parkReport = (key) => {
    const o = reports[key];
    const b = base.reports[key];
    o.position.copy(b.pos);
    o.scale.copy(b.scale);
    o.rotation.z = b.rot;
    o.visible = false; // parked inside its booth
  };
  const setArm = (t) => { arm.rotation.z = base.arm - t * (Math.PI * 75) / 180; };

  const dispatch = () => {
    if (busy || (cradle.Compat === version && cradle.Migr === version)) return;
    busy = true;
    sync();
    const keys = ['Compat', 'Migr'].map((w) => w + version);
    for (const k of keys) { parkReport(k); reports[k].visible = true; }
    for (const w of ['Compat', 'Migr']) if (staleHeld[w] === version) staleHeld[w] = null;
    play(
      { dur: 0, done() { ctx.caption('Both reviewers read the same frozen snapshot at the same time; neither can touch it.'); } },
      {
        dur: 1.0,
        apply(p) {
          for (const w of ['Compat', 'Migr']) {
            const o = reports[w + version];
            o.position.lerpVectors(base.reports[w + version].pos, exit[w], p);
            o.scale.setScalar(0.4 + 0.6 * p);
          }
        },
      },
      {
        dur: 1.3,
        apply(p) {
          for (const w of ['Compat', 'Migr']) {
            const o = reports[w + version];
            o.position.lerpVectors(exit[w], seat[w], p);
            o.position.y += Math.sin(Math.PI * p) * 0.25;
          }
        },
        done() { cradle = { Compat: version, Migr: version }; },
      },
    );
    if (version === 1) {
      play({ dur: 0, done() { busy = false; sync(); ctx.caption('The migration reviewer saw a column dropped under rows still in use. A blocking finding keeps the gate shut.'); } });
    } else {
      play(
        { dur: 0.9, apply(p) { setArm(p); }, done() { gateOpen = true; } },
        { dur: 0, done() { busy = false; sync(); ctx.caption('Both reports carry this snapshot’s profile and neither blocks, so the bundle passes to the engineer.'); } },
      );
    }
  };

  const editPatch = () => {
    if (busy || version === 2) return;
    busy = true;
    sync();
    const from = version;
    const to = version === 1 ? 2 : 1;
    const held = ['Compat', 'Migr'].filter((w) => cradle[w] != null);
    const starts = {};
    play(
      gateOpen && { dur: 0.6, apply(p) { setArm(1 - p); }, done() { gateOpen = false; } },
      {
        dur: 1.0,
        start() { snaps[to].visible = true; },
        apply(p) {
          snaps[from].position.y = base.snap[1] - SINK * Math.min(1, p * 2);
          snaps[to].position.y = base.snap[1] - SINK * (1 - Math.max(0, p * 2 - 1));
        },
        done() { version = to; snaps[from].visible = false; },
      },
      held.length && {
        dur: 1.1,
        start() {
          for (const w of ['Compat', 'Migr']) if (staleHeld[w] != null) { parkReport(w + staleHeld[w]); staleHeld[w] = null; }
          for (const w of held) starts[w] = reports[w + cradle[w]].position.clone();
        },
        apply(p) {
          for (const w of held) {
            const o = reports[w + cradle[w]];
            o.position.lerpVectors(starts[w], stale[w], p);
            o.position.y += Math.sin(Math.PI * p) * 0.35;
          }
        },
        done() { for (const w of held) staleHeld[w] = cradle[w]; cradle = { Compat: null, Migr: null }; },
      },
      {
        dur: 0,
        done() {
          busy = false;
          sync();
          ctx.caption(held.length
            ? 'The patch changed, so the key ridge changed. The old reports no longer fit this snapshot and are set aside.'
            : 'The patch changed, giving a new snapshot with a different key ridge.');
        },
      },
    );
  };

  const sendBtn = ctx.addAction('Send both reviewers', dispatch);
  const editBtn = ctx.addAction('Edit the patch', editPatch);
  function sync() {
    const current = cradle.Compat === version && cradle.Migr === version;
    sendBtn.disabled = busy || current;
    editBtn.disabled = busy || version === 2;
    editBtn.textContent = version === 2 ? 'Patch edited' : 'Edit the patch';
  }

  // Clicking a booth looks through that reviewer's window; clicking the snapshot looks from above.
  ctx.onPick((hits) => {
    for (const h of hits) {
      for (let o = h.object; o; o = o.parent) {
        for (const w of ['Compat', 'Migr']) {
          if (o === booths[w]) {
            const side = w === 'Compat' ? -1 : 1;
            const eye = snapCenter.clone().add(new THREE.Vector3(side * 2.3, 0.05, 0));
            ctx.view(eye.toArray(), snapCenter.toArray());
            ctx.caption(w === 'Compat' ? 'The compatibility reviewer sees only the API side.' : 'The migration reviewer sees only the table side.');
            return;
          }
        }
        if (o === snaps[version]) {
          ctx.view(snapCenter.clone().add(new THREE.Vector3(0.6, 2.4, 2.2)).toArray(), snapCenter.toArray());
          ctx.caption('The key ridge on top identifies this exact snapshot.');
          return;
        }
      }
    }
  });

  const restore = () => {
    stopAll();
    version = 1;
    busy = false;
    gateOpen = false;
    cradle = { Compat: null, Migr: null };
    staleHeld = { Compat: null, Migr: null };
    snaps[1].position.y = base.snap[1];
    snaps[2].position.y = base.snap[2];
    snaps[1].visible = true;
    snaps[2].visible = false;
    setArm(0);
    for (const k of Object.keys(reports)) parkReport(k);
  };

  restore();
  sync();

  return {
    update(dt) { return advance(dt); },
    reset() {
      restore();
      sync();
      ctx.caption('Each reviewer’s window faces one side of the same frozen snapshot.');
      ctx.invalidate();
    },
    dispose() { restore(); },
  };
}

