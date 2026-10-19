// Queues and backpressure: the producer hopper rides at the end of the queue, so the queue's
// bound is a physical length. With three places the tail job meets the hopper mouth and the
// amber latch drops: the producer is held. Lengthen the queue and the waiting moves into the
// trough instead; the tool finishes the batch at the same step either way.
export default function setup(ctx) {
  const { THREE, model } = ctx;
  const IDS = 'ABCDEFGH'.split('');
  const COST = { B: 6 };
  const cost = (id) => COST[id] || 1;
  const TILE_GAP = 0.21;
  const get = (n) => {
    const o = model.getObjectByName(n);
    if (!o) throw new Error('queues-and-backpressure: missing node ' + n);
    return o;
  };
  const tiles = {}, home = {};
  for (const id of IDS) { tiles[id] = get('Job_' + id); home[id] = tiles[id].position.clone(); }
  const slots = [0, 1, 2, 3, 4, 5, 6].map((k) => get('Slot_' + k).position.clone());
  const station = get('Station').position.clone();
  const done0 = get('Done_0').position.clone();
  const producer = get('Producer'), pusher = get('Producer_Pusher'), latch = get('Producer_Latch'), needle = get('Worker_Needle');
  const prodStart = producer.position.clone();
  const pusherStart = pusher.position.clone(), latchStart = latch.position.clone();
  const pitch = slots[0].x - slots[1].x;
  const offset = prodStart.x - (slots[0].x - pitch * 2.5); // hopper centre relative to the queue entry
  const prodX = (cap) => slots[0].x - pitch * (cap - 0.5) + offset;
  const floorY = home.A.y;

  let S, steps = [], t = 0, onDone = null, timer = 0;
  const ease = (k) => (k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2);
  const step = (d, f) => ({ d: ctx.reducedMotion ? 0 : d, f });

  const btnRun = ctx.addAction('Run the batch', onRun);
  const btnCap = ctx.addAction('Allow 7 waiting', onCap);

  const finished = () => S.done.length === IDS.length;
  function refresh() {
    btnRun.textContent = finished() ? 'Finished' : S.running ? 'Pause' : S.step ? 'Continue' : 'Run the batch';
    btnRun.disabled = finished();
    const want = S.pendingCap || S.cap;
    btnCap.textContent = want === 3 ? 'Allow 7 waiting' : 'Allow 3 waiting';
    btnCap.disabled = finished() || (want === 7 && S.queue.length > 3);
  }

  function hopperPos(j, x) { return new THREE.Vector3(x, floorY + TILE_GAP * j, home.A.z); }

  function moveProducer(cap) {
    const from = producer.position.x, to = prodX(cap);
    const stack = S.hopper.map((id) => tiles[id]);
    return step(0.9, (k) => {
      const x = from + (to - from) * k;
      producer.position.x = x;
      stack.forEach((o, j) => o.position.copy(hopperPos(j, x)));
    });
  }

  function onCap() {
    const want = (S.pendingCap || S.cap) === 3 ? 7 : 3;
    if (want === 3 && S.queue.length > 3) return;
    if (steps.length || (S.running && timer > 0)) {
      S.pendingCap = want; // applied between steps
    } else {
      applyCap(want);
    }
    refresh();
    ctx.invalidate();
  }
  function applyCap(cap) {
    S.pendingCap = null;
    if (cap === S.cap) return;
    S.cap = cap;
    S.capChanged = true;
    if (latch.position.y !== latchStart.y) latch.position.copy(latchStart);
    play([moveProducer(cap)], () => {
      ctx.caption(cap === 3
        ? 'The producer rolls forward: the queue now holds 3 waiting jobs.'
        : 'The producer rolls back: the queue now holds up to 7 waiting jobs.');
      if (S.running) timer = 0.25;
      refresh();
    });
  }

  function onRun() {
    if (finished()) return;
    S.running = !S.running;
    if (S.running && !steps.length) tick();
    refresh();
    ctx.invalidate();
  }

  function play(list, done) { steps = list; t = 0; onDone = done || null; ctx.invalidate(); }

  function tick() {
    S.step += 1;
    const list = [];
    // Tool: one unit of work, hand finished job to the tray, take the next waiting job.
    if (S.run) {
      S.run.rem -= 1;
      const r = S.run;
      const a0 = needle.rotation.z, a1 = -2 * Math.PI * (r.cost - r.rem) / r.cost;
      list.push(step(0.45, (k) => { needle.rotation.z = a0 + (a1 - a0) * k; }));
      if (r.rem === 0) {
        const o = tiles[r.id], to = done0.clone().add(new THREE.Vector3(0, TILE_GAP * S.done.length, 0));
        S.done.push(r.id);
        S.run = null;
        list.push(step(0.5, (k) => {
          o.position.lerpVectors(station, to, k);
          o.position.y += Math.sin(Math.PI * k) * 0.6;
        }));
      }
    }
    if (!S.run && S.queue.length) {
      const id = S.queue.shift();
      S.run = { id, rem: cost(id), cost: cost(id) };
      const moves = [[tiles[id], tiles[id].position.clone(), station]];
      S.queue.forEach((q, i) => moves.push([tiles[q], tiles[q].position.clone(), slots[i]]));
      list.push(step(0.5, (k) => {
        needle.rotation.z = needle.rotation.z * (1 - k);
        for (const [o, a, b] of moves) o.position.lerpVectors(a, b, k);
      }));
      list.push(step(0.01, () => { needle.rotation.z = 0; }));
    }
    // Producer: hand over the next job if a place is free, otherwise wait at the mouth.
    let held = null;
    if (S.hopper.length) {
      if (S.queue.length < S.cap) {
        const id = S.hopper.shift();
        const o = tiles[id], to = slots[S.queue.length];
        S.queue.push(id);
        const from = o.position.clone();
        const rest = S.hopper.map((h) => tiles[h]);
        const restFrom = rest.map(o => o.position.clone());
        const x = producer.position.x;
        const latchFrom = latch.position.clone();
        list.push(step(0.25, (k) => {
          latch.position.lerpVectors(latchFrom, latchStart, k);
          pusher.position.x = pusherStart.x + 0.3 * k;
        }));
        list.push(step(0.55, (k) => {
          o.position.lerpVectors(from, to, k);
          pusher.position.x = pusherStart.x + 0.3 * (1 - k);
          rest.forEach((r, j) => r.position.lerpVectors(restFrom[j], hopperPos(j, x), k));
        }));
      } else {
        held = S.hopper[0];
        S.heldSteps += 1;
        const down = latchStart.clone().add(new THREE.Vector3(0, -0.24, 0));
        const latchFrom = latch.position.clone();
        list.push(step(0.35, (k) => {
          latch.position.lerpVectors(latchFrom, down, k);
          pusher.position.x = pusherStart.x + 0.08 * Math.sin(Math.PI * k);
        }));
      }
    }
    S.maxDepth = Math.max(S.maxDepth, S.queue.length);
    if (!list.length) list.push(step(0.2, () => {}));
    const running = !S.run ? 'tool idle'
      : S.run.rem === S.run.cost ? S.run.id + ' starts in the tool'
      : S.run.id + ' in the tool (' + (S.run.cost - S.run.rem) + ' of ' + S.run.cost + ' done)';
    let note = 'Step ' + S.step + ': ' + running + ', ' + S.queue.length + ' waiting';
    if (held && S.heldSteps === 1) note += '. The queue is full, so ' + held + ' is held at the producer.';
    else if (held) note += ', ' + held + ' still held at the producer.';
    else note += '.';
    play(list, () => {
      if (finished()) {
        S.running = false;
        latch.position.copy(latchStart);
        note = 'All 8 jobs finished at step ' + S.step + '. At most ' + S.maxDepth + ' waited in the queue; the producer was held for ' +
          S.heldSteps + ' step' + (S.heldSteps === 1 ? '' : 's') + '. For this fixed single-worker batch, both bounds finish at the same simulation step; animation duration can differ.';
      }
      ctx.caption(note);
      if (S.pendingCap) { applyCap(S.pendingCap); return; }
      if (S.running) timer = ctx.reducedMotion ? 0.9 : 0.3;
      refresh();
    });
  }

  ctx.onPick((hits) => {
    for (const h of hits || []) {
      let o = h.object;
      while (o && o !== model) {
        if (o.name === 'Producer' || o.name === 'Producer_Frame' || o.name === 'Producer_Latch') {
          ctx.view([producer.position.x + 1.6, 1.6, 3.6], [producer.position.x + 0.5, 0.4, 0]);
          return;
        }
        if (o.name === 'Tool' || o.name === 'Worker_Needle') { ctx.view([2.6, 1.3, 3.4], [2.4, 0.6, 0]); return; }
        o = o.parent;
      }
    }
  });

  function reset() {
    steps = []; t = 0; onDone = null; timer = 0;
    producer.position.copy(prodStart);
    pusher.position.copy(pusherStart);
    latch.position.copy(latchStart);
    needle.rotation.z = 0;
    for (const id of IDS) tiles[id].position.copy(home[id]);
    S = { cap: 3, pendingCap: null, capChanged: false, hopper: IDS.slice(), queue: [], run: null, done: [], step: 0, heldSteps: 0, maxDepth: 0, running: false };
    ctx.caption('Eight jobs wait in the producer. The queue in front of it has 3 places; job B is slow.');
    refresh();
    ctx.invalidate();
  }

  function update(dt) {
    if (dt > 1) dt /= 1000;
    dt = Math.min(dt, 0.1);
    if (!steps.length) {
      if (S.running && timer > 0) {
        timer -= dt;
        if (timer <= 0) { timer = 0; if (S.pendingCap) applyCap(S.pendingCap); else tick(); }
        return true;
      }
      return false;
    }
    t += dt;
    while (steps.length) {
      const s = steps[0];
      const k = s.d > 0 ? Math.min(1, t / s.d) : 1;
      s.f(ease(k));
      if (k < 1) return true;
      steps.shift();
      t = 0;
      if (!steps.length && onDone) { const d = onDone; onDone = null; d(); }
    }
    ctx.invalidate();
    return S.running && !finished();
  }

  function dispose() { steps = []; }

  reset();
  return { update, reset, dispose };
}

