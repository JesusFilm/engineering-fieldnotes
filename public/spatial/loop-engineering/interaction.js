// Loop engineering: evaluate the patch in the socket, or shift the selector plate first. The probe head
// holds at contact after each evaluation, so the evidence (pressed pins or plungers resting on the plate,
// the executed count and any failure) stays inspectable until the next deliberate action.
export default function setup(ctx) {
  const { THREE, model } = ctx;
  // Mirrors REACH_OK, REACH_BLOCK, PRESS, FAIL_RISE, SHIFT and the counter travel in build_scene.py.
  const REACH_OK = 0.75, REACH_BLOCK = 0.39, PRESS = 0.15, FAIL_RISE = 0.85, SHIFT = 0.25, COUNT_TRAVEL = 2.7;
  const ANG = { edit: (58 * Math.PI) / 180, review: 0, handoff: (-58 * Math.PI) / 180 };
  const reduced = !!ctx.reducedMotion;
  const missing = [];
  const node = (name) => {
    const o = model.getObjectByName(name);
    if (!o) missing.push(name);
    return o;
  };

  const head = node('ProbeHead');
  const plate = node('Selector');
  const failRod = node('FailRod');
  const slider = node('Counter_Slider');
  const lever = node('SwitchLever');
  const patch1 = node('Patch_1');
  const patch2 = node('Patch_2');
  const pins = [];
  for (let i = 0; i < 12; i++) pins.push(node('Pin_' + String(i).padStart(2, '0')));
  model.updateMatrixWorld(true);
  const seatPos = (name, obj) => { const o = node(name); return o ? obj.parent.worldToLocal(o.getWorldPosition(new THREE.Vector3())) : obj.position.clone(); };
  const socket = seatPos('Socket_Seat', patch2);
  const spent = seatPos('Spent_Seat', patch1);
  if (missing.length) console.warn('[loop-engineering] missing nodes:', missing.join(', '));

  const base = {
    head: head.position.y, plate: plate.position.x, fail: failRod.position.y, slider: slider.position.x,
    lever: Math.PI, pins: pins.map((p) => p.position.y), // lever rests pointing at the viewer (Blender 180°)
    p1: patch1.position.clone(), p2: patch2.position.clone(),
  };
  // The lever turns about the vertical axis only; drive it by yaw so imported Euler order cannot mirror it.
  const UP = new THREE.Vector3(0, 1, 0);
  let leverYaw = base.lever;
  const setLever = (a) => { leverYaw = a; lever.quaternion.setFromAxisAngle(UP, a); };

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

  // Committed state. Every decision reads these, never a value mid-transition.
  let patch = 1;
  let selectorOK = true;
  let evidence = null; // null | 'edit' | 'review' | 'handoff'
  let busy = false;

  // Physical readouts, each driven by one number so tweens can start from wherever they are.
  const readout = { reach: 0, press: 0, fail: 0, count: 0 };
  const show = () => {
    head.position.y = base.head - readout.reach;
    pins.forEach((p, i) => { p.position.y = base.pins[i] - readout.press; });
    failRod.position.y = base.fail + FAIL_RISE * readout.fail;
    slider.position.x = base.slider + (COUNT_TRAVEL * readout.count) / 12;
  };
  const to = (dur, target) => ({
    dur,
    start() { this.from = { ...readout }; },
    apply(t) { for (const k of Object.keys(target)) readout[k] = this.from[k] + (target[k] - this.from[k]) * t; show(); },
  });
  const leverTo = (dur, ang) => ({
    dur,
    start() {
      this.from = leverYaw;
      let a = ang;
      while (a - this.from > Math.PI) a -= 2 * Math.PI;
      while (a - this.from < -Math.PI) a += 2 * Math.PI;
      this.to = a;
    },
    apply(t) { setLever(this.from + (this.to - this.from) * t); },
  });
  const clearEvidence = () => [
    to(0.5, { fail: 0, count: 0 }),
    leverTo(0.4, base.lever),
    to(0.6, { reach: 0, press: 0 }),
  ];

  const captions = {
    edit: 'Twelve tests ran and one failed with a usable assertion, so the loop allows one more edit.',
    review: 'All twelve selected tests ran and passed on patch 2, so the loop stops for review. Merging stays a human decision.',
    handoff: 'The probes rest on the plate: twelve tests exist but none were selected, so no assertions ran. This repair-only loop stops and hands the command and logs to an engineer.',
  };

  const evaluate = () => {
    if (busy || evidence === 'review' || evidence === 'handoff') return;
    busy = true;
    sync();
    if (evidence === 'edit') {
      // Repair is a deliberate next state: clear the old evidence, then install patch 2.
      play(...clearEvidence(), {
        dur: 1.0,
        start() { this.a = patch1.position.clone(); this.b = patch2.position.clone(); },
        apply(t) {
          const arc = Math.sin(Math.PI * t) * 0.45;
          patch1.position.lerpVectors(this.a, spent, t).y += arc;
          patch2.position.lerpVectors(this.b, socket, t).y += arc;
        },
        done() { patch = 2; evidence = null; ctx.caption('Patch 2 replaces patch 1. The earlier results belong to patch 1, so they were cleared.'); },
      });
    }
    // The route is computed when the evaluation actually starts, from the committed state.
    play({ dur: 0, start() {
      const route = !selectorOK ? 'handoff' : patch === 1 ? 'edit' : 'review';
      const reach = selectorOK ? REACH_OK : REACH_BLOCK;
      const contact = REACH_OK - PRESS;
      queue.unshift(
        { dur: 1.0, start() { this.from = readout.reach; }, apply(t) {
          readout.reach = this.from + (reach - this.from) * t;
          readout.press = selectorOK ? Math.min(PRESS, Math.max(0, readout.reach - contact)) : 0;
          show();
        } },
        to(0.7, { count: selectorOK ? 12 : 0 }),
        route === 'edit' && to(0.5, { fail: 1 }),
        leverTo(0.6, ANG[route]),
        { dur: 0, done() { evidence = route; busy = false; sync(); ctx.caption(captions[route]); } },
      );
      queue = queue.filter(Boolean);
    } });
  };

  const toggleSelector = () => {
    if (busy) return;
    busy = true;
    sync();
    const target = !selectorOK;
    play(
      ...(evidence ? clearEvidence() : []),
      { dur: 0.7, start() { this.from = plate.position.x; }, apply(t) { plate.position.x = this.from + (base.plate + (target ? 0 : SHIFT) - this.from) * t; } },
      { dur: 0, done() {
        selectorOK = target;
        evidence = null;
        busy = false;
        sync();
        ctx.caption(selectorOK
          ? 'The selector holes line up with the twelve discovered tests again.'
          : 'The mistyped selector leaves all twelve tests in the bed but covers every pin.');
      } },
    );
  };

  const evalBtn = ctx.addAction('Evaluate patch 1', evaluate);
  const selBtn = ctx.addAction('Mistype selector', toggleSelector);
  function sync() {
    const stopped = evidence === 'review' || evidence === 'handoff';
    evalBtn.disabled = busy || stopped;
    evalBtn.textContent = stopped ? 'Loop stopped' : evidence === 'edit' ? 'Apply patch 2 and evaluate' : 'Evaluate patch ' + patch;
    selBtn.disabled = busy;
    selBtn.textContent = selectorOK ? 'Mistype selector' : 'Fix selector';
  }

  // The plate is a shortcut for the selector button; nearest visible surface only.
  ctx.onPick((hits) => {
    const hit = (Array.isArray(hits) ? hits : hits ? [hits] : [])[0];
    for (let o = hit && hit.object; o; o = o.parent) if (o === plate) return toggleSelector();
  });

  const restore = () => {
    queue = []; cur = null;
    patch = 1; selectorOK = true; evidence = null; busy = false;
    Object.assign(readout, { reach: 0, press: 0, fail: 0, count: 0 });
    show();
    plate.position.x = base.plate;
    setLever(base.lever);
    patch1.position.copy(base.p1);
    patch2.position.copy(base.p2);
  };

  return {
    update(dt) { return advance(Math.min(dt, 0.1)); },
    reset() {
      restore();
      sync();
      ctx.caption('Patch 1 sits in the socket. The selector plate decides which of the twelve tests the probes can reach.');
      ctx.invalidate();
    },
    dispose() { restore(); },
  };
}

