// Agent evals: two input lanes cross one patch wall. Swap which patch stands across the lanes, and add or
// remove the existing login test. Each probe runs up its lane and stops wherever the active wall's
// geometry stops it (a raycast), so pass or fail comes from the patch and the coverage together.
export default function setup(ctx) {
  const { THREE, model } = ctx;
  const PARK = 3.0; // PARK in spatial/agent-evals/build_scene.py
  const reduced = !!ctx.reducedMotion;
  const missing = [];
  const node = (name) => {
    const o = model.getObjectByName(name);
    if (!o) missing.push(name);
    return o;
  };

  const slide = node('PatchSlide');
  const walls = { A: node('A_Patch'), B: node('B_Patch') };
  const probes = {
    empty: { obj: node('Probe_Empty'), flag: node('Probe_Empty_Flag'), lane: 'Empty', expect: 'stop' },
    valid: { obj: node('Probe_Valid'), flag: node('Probe_Valid_Flag'), lane: 'Valid', expect: 'through' },
  };
  if (missing.length) console.warn('[agent-evals] missing nodes:', missing.join(', '));
  model.updateMatrixWorld(true);
  const world = (name) => { const o = node(name); return o ? o.getWorldPosition(new THREE.Vector3()) : new THREE.Vector3(); };
  for (const p of Object.values(probes)) {
    p.start = world('Lane_' + p.lane + '_Start'); // world, at probe nose height
    p.seat = world('Lane_' + p.lane + '_Seat');
    p.y = p.obj.position.y;
    p.local = (w) => { const v = p.obj.parent.worldToLocal(w.clone()); v.y = p.y; return v; };
  }
  const rackPos = probes.valid.local(world('Rack_Seat'));

  // Serial step runner driven by the host's update(); reduced motion collapses each step to its end.
  const ease = (p) => (p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2);
  let queue = [], cur = null, curT = 0;
  const play = (...steps) => { queue.push(...steps.filter(Boolean)); ctx.invalidate(); };
  const advance = (dt) => {
    for (let guard = 0; guard < 64; guard++) {
      if (!cur) { cur = queue.shift(); if (!cur) return false; curT = 0; if (cur.start) cur.start(); }
      const dur = reduced ? 0 : cur.dur || 0;
      curT += dt; dt = 0;
      const p = dur > 0 ? Math.min(1, curT / dur) : 1;
      if (cur.apply) cur.apply(ease(p));
      if (p < 1) return true;
      const done = cur.done; cur = null; if (done) done();
    }
    return true;
  };

  let patch = 'A';
  let withExisting = false;
  let busy = false;
  let results = {};

  // Run one probe up its lane against the wall now standing across the field.
  const raycaster = new THREE.Raycaster();
  const runProbe = (p) => {
    model.updateMatrixWorld(true);
    const dir = p.seat.clone().sub(p.start);
    const len = dir.length();
    dir.normalize();
    raycaster.set(p.start, dir);
    raycaster.far = len;
    const hit = raycaster.intersectObject(walls[patch], true).find((h) => h.object.isMesh);
    const stopped = !!hit;
    const end = stopped ? p.start.clone().addScaledVector(dir, Math.max(0, hit.distance - 0.015)) : p.seat.clone();
    return { stopped, pass: stopped === (p.expect === 'stop'), end: p.local(end) };
  };
  const suite = () => (withExisting ? [probes.empty, probes.valid] : [probes.empty]);

  const say = () => {
    const e = results.empty, v = results.valid;
    if (!e) return;
    if (!withExisting) {
      ctx.caption(e.pass
        ? 'Patch ' + patch + ' stops the empty-password probe, so it passes the new test. Nothing probes the valid-login lane.'
        : 'Patch ' + patch + ' lets the empty password through, so it fails the new test.');
    } else if (e.pass && v.pass) {
      ctx.caption('Patch ' + patch + ' stops the empty password and signs in the valid login: both checks pass. Two probes support review, not release.');
    } else if (e.pass) {
      ctx.caption('Patch ' + patch + ' passes the new test but also blocks the valid login, so the existing login test fails.');
    } else {
      ctx.caption('Patch ' + patch + ' fails the new test' + (v.pass ? '.' : ' and the existing login test.'));
    }
  };

  const setFlag = (p, on) => { if (p.flag) { p.flag.visible = on; p.flag.scale.set(1, on ? 1 : 0.001, 1); } };

  const moveStep = (dur, moves, lift = 0) => ({
    dur,
    start() { this.from = moves.map((m) => m.p.obj.position.clone()); },
    apply(t) {
      moves.forEach((m, i) => {
        m.p.obj.position.lerpVectors(this.from[i], m.to, t);
        m.p.obj.position.y = m.p.y + Math.sin(Math.PI * t) * lift;
      });
    },
  });

  const sync = () => {
    covBtn.disabled = busy;
    patchBtn.disabled = busy;
    covBtn.textContent = withExisting ? 'Remove existing login test' : 'Add existing login test';
    patchBtn.textContent = patch === 'A' ? 'Swap to patch B' : 'Swap to patch A';
  };

  // Change the patch and/or coverage, then rerun the suite from the start line.
  const change = (nextPatch, nextExisting) => {
    if (busy) return;
    busy = true;
    sync();
    const leaving = withExisting && !nextExisting;
    const entering = !withExisting && nextExisting;
    for (const p of Object.values(probes)) setFlag(p, false);
    const back = [{ p: probes.empty, to: probes.empty.local(probes.empty.start) }];
    if (withExisting && !leaving) back.push({ p: probes.valid, to: probes.valid.local(probes.valid.start) });
    play(moveStep(0.6, back));
    if (leaving) play(moveStep(0.7, [{ p: probes.valid, to: rackPos }], 0.35));
    if (entering) play(moveStep(0.7, [{ p: probes.valid, to: probes.valid.local(probes.valid.start) }], 0.35));
    if (nextPatch !== patch) {
      const toX = nextPatch === 'A' ? 0 : -PARK;
      play({ dur: 1.0, start() { this.x = slide.position.x; }, apply(t) { slide.position.x = this.x + (toX - this.x) * t; } });
    }
    play({
      dur: 0,
      done() {
        patch = nextPatch;
        withExisting = nextExisting;
        results = {};
        for (const p of suite()) results[p === probes.empty ? 'empty' : 'valid'] = runProbe(p);
      },
    });
    play({
      dur: 1.1,
      start() { this.moves = suite().map((p) => ({ p, from: p.obj.position.clone(), to: results[p === probes.empty ? 'empty' : 'valid'].end })); },
      apply(t) { for (const m of this.moves) m.p.obj.position.lerpVectors(m.from, m.to, t); },
    });
    play({
      dur: 0.35,
      start() { this.fails = suite().filter((p) => !results[p === probes.empty ? 'empty' : 'valid'].pass); this.fails.forEach((p) => setFlag(p, true)); },
      apply(t) { for (const p of this.fails) p.flag.scale.set(1, Math.max(0.001, t), 1); },
      done() { busy = false; sync(); say(); },
    });
  };

  const covBtn = ctx.addAction('Add existing login test', () => change(patch, !withExisting));
  const patchBtn = ctx.addAction('Swap to patch B', () => change(patch === 'A' ? 'B' : 'A', withExisting));

  // Clicking either wall swaps the patch; clicking a probe states what it checks and what happened.
  ctx.onPick((hits) => {
    if (busy) return;
    const hit = (Array.isArray(hits) ? hits : hits ? [hits] : [])[0];
    for (let o = hit && hit.object; o; o = o.parent) {
      if (o === walls.A || o === walls.B) return change(patch === 'A' ? 'B' : 'A', withExisting);
      if (o === probes.empty.obj) {
        const r = results.empty;
        return ctx.caption('New test: an empty password must be refused. ' + (r && r.pass ? 'Patch ' + patch + ' refuses it.' : 'Patch ' + patch + ' lets it in.'));
      }
      if (o === probes.valid.obj) {
        const r = results.valid;
        return ctx.caption(!r ? 'Existing login test: a valid login must sign in. It is not in the suite yet.'
          : 'Existing login test: a valid login must sign in. ' + (r.pass ? 'Patch ' + patch + ' signs it in.' : 'Patch ' + patch + ' blocks it.'));
      }
    }
  });

  // Place everything at the settled result of the current state, without animation.
  const settle = () => {
    queue = []; cur = null;
    slide.position.x = patch === 'A' ? 0 : -PARK;
    results = {};
    for (const p of Object.values(probes)) setFlag(p, false);
    if (!withExisting) probes.valid.obj.position.copy(rackPos);
    for (const p of suite()) {
      const key = p === probes.empty ? 'empty' : 'valid';
      results[key] = runProbe(p);
      p.obj.position.copy(results[key].end);
      setFlag(p, !results[key].pass);
    }
  };

  settle();
  sync();

  return {
    update(dt) { return advance(Math.min(dt, 0.1)); },
    reset() {
      patch = 'A';
      withExisting = false;
      busy = false;
      settle();
      sync();
      say();
      ctx.invalidate();
    },
    dispose() { queue = []; cur = null; },
  };
}

