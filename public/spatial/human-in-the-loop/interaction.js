// Human-in-the-loop: the executor's amber plate is cut from the reviewed crate's
// keel. A revised crate with the same task label cannot pass until it is reviewed.
export default function setup(ctx) {
  const {THREE, model} = ctx;
  const find = (name) => {
    const object = model.getObjectByName(name);
    if (!object) throw Error('Missing node ' + name);
    return object;
  };
  const local = (object) => model.worldToLocal(object.getWorldPosition(new THREE.Vector3()));
  model.updateMatrixWorld(true);

  const crates = {A: find('Crate_A'), B: find('Crate_B')};
  const spot = {
    wait: local(find('Spot_wait')),
    bench: local(find('Spot_bench')),
    blocked: local(find('Spot_blocked')),
    prod: local(find('Spot_prod')),
    aside: local(find('Spot_aside')),
  };
  const reviewer = find('Reviewer');
  const reviewerHome = reviewer.rotation.y;
  // Notch heights for A and B, measured from Blender: plate top minus tooth depth minus clearance.
  const RAIL = 0.16, BODY = 0.42;
  const DEPTH = {A: [0.34, 0.12, 0.28, 0.08, 0.30], B: [0.34, 0.28, 0.28, 0.24, 0.16]};
  const notchHeight = (k, tag) => RAIL + BODY - DEPTH[tag][k] - 0.025 - RAIL;
  const notches = [0, 1, 2, 3, 4].map((k) => find('Approval_artifact_notch' + k));
  const homes = {A: crates.A.position.clone(), B: crates.B.position.clone()};

  // state
  let waiting = 'A';          // crate on the track
  let approved = 'A';         // crate the plate was cut from
  let deployed = null;
  let blocked = false;
  const moves = [];           // active tweens {object, from, to, t, dur, arc}
  let recut = null;           // {from: [...], to: [...], t}

  const TEXT = {
    start: 'The reviewer approved crate A; the executor’s amber plate is cut from A’s keel.',
    swapped: 'The agent set A aside and put revision B on the track. Both crates carry the same “checkout” label.',
    deployedA: 'A’s keel fits the plate it was reviewed against, so A reaches production.',
    blockedB: 'The executor detects B’s identity mismatch before the plate; nothing deploys.',
    reviewed: 'The reviewer inspected B, and the plate is recut to B’s keel.',
    deployedB: 'B passes only after its own review recut the plate.',
  };

  const reviseButton = ctx.addAction('Revise to B', onRevise);
  const runButton = ctx.addAction('Run the executor', onRun);

  function scaleFor(tag) { return notches.map((_, k) => notchHeight(k, tag) / notchHeight(k, 'A')); }

  function tween(object, to, dur, arc = 0, delay = 0) {
    if (ctx.reducedMotion) { object.position.copy(to); return; }
    moves.push({object, from: object.position.clone(), to: to.clone(), t: -delay / dur, dur, arc});
  }

  function onRevise() {
    if (moves.length || recut) return;
    if (deployed) return;
    if (waiting === 'A') {
      // A is set aside behind the track, then the agent lifts B from its bench onto the track.
      tween(crates.A, spot.aside, 0.9, 0.5);
      tween(crates.B, spot.wait, 1.2, 0.9, 0.9);
      waiting = 'B';
      blocked = false;
      ctx.caption(TEXT.swapped);
    } else if (blocked || approved !== 'B') {
      // Review B: the reviewer turns to the crate and the plate is recut.
      tween(crates.B, spot.wait, 0.6);
      blocked = false;
      approved = 'B';
      reviewer.rotation.y = reviewerHome + 0.5;
      const to = scaleFor('B');
      if (ctx.reducedMotion) notches.forEach((n, k) => { n.scale.y = to[k]; });
      else recut = {from: notches.map((n) => n.scale.y), to, t: 0};
      ctx.caption(TEXT.reviewed);
    }
    refresh();
  }

  function onRun() {
    if (moves.length || recut || deployed) return;
    if (waiting === approved) {
      tween(crates[waiting], spot.prod, 1.6);
      deployed = waiting;
      ctx.caption(waiting === 'A' ? TEXT.deployedA : TEXT.deployedB);
    } else {
      tween(crates[waiting], spot.blocked, 0.9);
      blocked = true;
      ctx.caption(TEXT.blockedB);
    }
    refresh();
  }

  function refresh() {
    if (waiting === 'A') reviseButton.textContent = 'Revise to B';
    else reviseButton.textContent = approved === 'B' ? 'B reviewed' : 'Review B';
    reviseButton.disabled = Boolean(moves.length || recut) || Boolean(deployed) || (waiting === 'B' && approved === 'B');
    runButton.disabled = Boolean(moves.length || recut) || Boolean(deployed) || blocked;
    ctx.invalidate();
  }

  ctx.onPick((hits) => {
    for (const hit of hits) {
      for (let o = hit.object; o && o !== model; o = o.parent) {
        if (/^(Approval_artifact|Gate)/.test(o.name || '')) {
          // Look back from production through the gate: the plate against the waiting keel.
          ctx.view([6.2, 0.8, 0], [0, 0.42, 0]);
          return;
        }
      }
    }
  });

  function reset() {
    moves.length = 0;
    recut = null;
    crates.A.position.copy(homes.A);
    crates.B.position.copy(homes.B);
    notches.forEach((n) => { n.scale.y = 1; });
    reviewer.rotation.y = reviewerHome;
    waiting = 'A'; approved = 'A'; deployed = null; blocked = false;
    refresh();
    ctx.caption(TEXT.start);
  }

  ctx.caption(TEXT.start);
  refresh();

  return {
    update(dt) {
      const wasBusy = Boolean(moves.length || recut);
      let moving = false;
      for (let i = moves.length - 1; i >= 0; i--) {
        const m = moves[i];
        m.t = Math.min(1, m.t + dt / m.dur);
        const t = Math.max(0, m.t);
        const e = t * t * (3 - 2 * t);
        m.object.position.lerpVectors(m.from, m.to, e);
        if (m.arc) m.object.position.y += Math.sin(Math.PI * t) * m.arc;
        if (m.t >= 1) moves.splice(i, 1); else moving = true;
      }
      if (recut) {
        recut.t = Math.min(1, recut.t + dt * 1.4);
        notches.forEach((n, k) => { n.scale.y = recut.from[k] + (recut.to[k] - recut.from[k]) * recut.t; });
        if (recut.t >= 1) recut = null; else moving = true;
      }
      if (wasBusy && !moves.length && !recut) refresh();
      return moving;
    },
    reset,
    dispose() { reset(); },
  };
}

