// Orchestration patterns — "Split by dependency" (independent alternative by anthropic/claude-fable-5-1).
// Lesson: fan-out pays only for independent subtasks. A hidden dependency between two parallel
// workers surfaces as a conflict in the shared code and costs a rework round trip; once the
// dependency is known, the orchestrator keeps independent work parallel and sequences only the
// dependent step, forwarding the prerequisite result to the waiting worker.
// Taught with motion and sound. Words on screen are node names, task chips, code rows, and short state labels.
FlowVideo.scene({
  meta: { title: 'Orchestration', subtitle: 'SPLIT BY DEPENDENCY', duration: 30, fps: 30, speed: 1 },
  build(s) {
    const T = s.THEME;

    // ---- stage ----
    s.node('mode', 'label', { x: 540, y: 500, text: '', size: 30, weight: 700, spacing: 6, alpha: 0 });
    s.node('orch', 'box', { x: 540, y: 650, w: 400, h: 130, label: 'Orchestrator', ports: 2, portSpan: 220 });
    // sublabel starts as a space so the engine reserves the two-line layout from the first frame.
    s.node('wa', 'box', { x: 290, y: 1000, w: 300, h: 130, label: 'Worker A', labelSize: 34, sublabel: ' ', subGap: 22, subSize: 26, subWeight: 700, subMono: true });
    s.node('wb', 'box', { x: 790, y: 1000, w: 300, h: 130, label: 'Worker B', labelSize: 34, sublabel: ' ', subGap: 22, subSize: 26, subWeight: 700, subMono: true });
    s.node('code', 'store', { x: 540, y: 1420, w: 480, rows: 4, label: 'Shared code' });

    const laneA = [400, 1244], laneB = [680, 1244];   // write chips stop just above the store's top edge
    const ROW = (i) => [540, 1321 + i * 66];           // row centres inside the store
    const ROWEND = (i) => [722, 1321 + i * 66];        // right end of a row, clear of its text
    const PORT = (i) => [540 - 110 + 220 * i, 745];     // just below the orchestrator's ports
    const DEP = { from: [792, 1453], via: [[836, 1453], [836, 1519]], to: [792, 1519] };
    s.wire('oa', 'orch.port0', 'wa.top');
    s.wire('ob', 'orch.port1', 'wb.top');
    s.wire('ac', 'wa.bottom', laneA);
    s.wire('bc', 'wb.bottom', laneB);
    s.wire('dep', DEP.from, DEP.to, { via: DEP.via });  // dependency bracket between field and handler rows
    s.set(0, 'wire:dep', 'alpha', 0, 0);
    s.set(0, 'wire:dep', 'dashed', 1, 0);

    // Starting code: tests/docs rows empty, field and handler rows name the old field.
    const initRows = (t) => {
      s.set(t, 'code', 'row0Text', 'tests: —', 0); s.set(t, 'code', 'row0Alpha', 0, 0); s.set(t, 'code', 'row0Color', T.dim, 0);
      s.set(t, 'code', 'row1Text', 'docs: —', 0); s.set(t, 'code', 'row1Alpha', 0, 0); s.set(t, 'code', 'row1Color', T.dim, 0);
      s.set(t, 'code', 'row2Text', 'field: amount', 0); s.set(t, 'code', 'row2Alpha', 1, 0); s.set(t, 'code', 'row2Color', T.dim, 0);
      s.set(t, 'code', 'row3Text', 'handler: amount', 0); s.set(t, 'code', 'row3Alpha', 1, 0); s.set(t, 'code', 'row3Color', T.dim, 0);
    };
    initRows(0);

    // ---- sound map ----  orchestrator C5, worker A E5, worker B G5; sends an octave up.
    const W = {
      wa: { port: 0, note: 'E5', send: 'E6', pan: s.panOf('wa'), lane: laneA, top: 'wa.top', bottom: 'wa.bottom' },
      wb: { port: 1, note: 'G5', send: 'G6', pan: s.panOf('wb'), lane: laneB, top: 'wb.top', bottom: 'wb.bottom' },
    };
    s.sound('link', { base: 'G5', gain: 0.4, echo: { delay: 0.08, feedback: 0.35, repeats: 1 },
      layers: [{ type: 'tone', wave: 'sine', ratio: 1, attack: 0.003, decay: 0.2, harmonics: [1, 0.2] },
               { type: 'tone', wave: 'sine', ratio: 1.5, delay: 0.1, attack: 0.003, decay: 0.3, harmonics: [1, 0.2] }] });

    // ---- helpers ----
    const chip = (label, route, t, dur, color) => s.packet({ kind: 'chip', label, route, t, dur, color });
    const mode = (t, txt, color) => {
      s.set(t, 'mode', 'text', txt, 0); s.set(t, 'mode', 'color', color, 0);
      s.set(t, 'mode', 'alpha', 1, 0.2); s.set(t, 'mode', 'scale', 0.85, 0); s.set(t, 'mode', 'scale', 1, 0.4, 'back');
    };
    const hideMode = (t) => s.set(t, 'mode', 'alpha', 0, 0.3);
    // Orchestrator hands a task chip to a worker; the worker lights up and shows the task.
    const dispatch = (t, id, task, { color = T.fg, gain = 1, dur = 0.6, sub = task } = {}) => {
      const w = W[id];
      s.set(t, 'orch', 'port' + w.port, T.accent, 0.1); s.set(t + dur, 'orch', 'port' + w.port, T.dim, 0.3);
      s.pulse(t, 'orch'); s.sfx(t, 'send', { note: 'C6', gain });
      chip(task, [PORT(w.port), w.top], t, dur, color);
      const a = t + dur;
      s.set(a, id, 'color', T.fg, 0.15); s.pulse(a, id);
      s.set(a, id, 'sublabel', sub, 0); s.set(a, id, 'subColor', T.accent, 0.1);
      s.sfx(a, 'arrive', { note: w.note, gain: 0.55 * gain, pan: w.pan });
      return a;
    };
    const work = (id, t0, t1, gain = 1) => { for (let k = t0 + 0.2; k < t1; k += 0.22) s.sfx(k, 'work', { pan: W[id].pan, gain }); };
    // Worker writes a row in the shared code.
    const write = (t, id, row, text, color, label, { gain = 1, dur = 0.5 } = {}) => {
      const w = W[id];
      chip(label, [w.bottom, w.lane], t, dur, color);
      const a = t + dur;
      s.set(a, 'code', 'row' + row + 'Text', text, 0); s.set(a, 'code', 'row' + row + 'Alpha', 1, 0.15);
      s.set(a, 'code', 'row' + row + 'Color', T.fg, 0.08); s.set(a + 0.15, 'code', 'row' + row + 'Color', color, 0.3);
      s.ripple(a, ROW(row), color, { r0: 24, r1: 130, dur: 0.55 });
      s.sfx(a, 'store', { pan: w.pan * 0.5, gain });
      s.set(a, id, 'color', color, 0.2); s.set(a, id, 'subColor', color, 0.2);
      return a;
    };
    // Worker reports back to the orchestrator (envelope, or a result chip).
    const report = (t, id, { label, color = T.fg, gain = 0.4, dur = 0.5 } = {}) => {
      const w = W[id];
      if (label) chip(label, [w.top, 'orch.port' + w.port], t, dur, color); else s.packet({ route: [w.top, 'orch.port' + w.port], t, dur, color });
      s.sfx(t, 'send', { note: w.send, gain: 0.6, pan: w.pan });
      s.set(t + 0.1, id, 'color', T.mid, 0.4); s.set(t + 0.1, id, 'sublabel', '', 0.4); s.set(t + 0.1, id, 'subColor', T.mid, 0.4);
      s.sfx(t + dur, 'arrive', { note: 'C5', gain }); s.pulse(t + dur, 'orch');
      return t + dur;
    };
    const joined = (t) => { s.pulse(t, 'orch', T.ok, 0.8); s.sfx(t, 'chime', { note: 'C6' }); };

    // ---- opening: stage fades in from the loop frame ----
    s.set(0, 'stage', 'veil', 1, 0);
    s.fade(0.1, 0, 0.5);
    mode(0.8, 'INDEPENDENT', T.mid); s.sfx(0.8, 'ack', { note: 'G6', gain: 0.5 });

    // ---- Beat 1 (1.0–6.2): two independent tasks fan out, land in separate rows, join cleanly ----
    dispatch(1.0, 'wa', 'tests');
    dispatch(1.1, 'wb', 'docs');
    work('wa', 1.6, 3.0); work('wb', 1.7, 3.1, 0.8);
    write(3.0, 'wa', 0, 'tests: ok', T.ok, 'tests ok');
    write(3.15, 'wb', 1, 'docs: ok', T.ok, 'docs ok');
    report(3.9, 'wa'); report(4.0, 'wb');
    joined(4.5);

    // ---- Beat 2 (6.3–11.0): a pair with a hidden dependency fans out and conflicts ----
    hideMode(6.0);
    // Comparative correction: old results cannot certify the upcoming code changes.
    for (const [row, label] of [[0, 'tests: stale'], [1, 'docs: stale']]) {
      s.set(6.3, 'code', 'row' + row + 'Text', label, 0);
      s.set(6.3, 'code', 'row' + row + 'Color', T.accent, 0.15);
    }
    s.sfx(6.3, 'poof', { gain: 0.4 });
    dispatch(6.4, 'wa', 'rename field');
    dispatch(6.5, 'wb', 'handler');
    work('wa', 7.0, 8.4); work('wb', 7.1, 8.6, 0.8);
    write(8.4, 'wa', 2, 'field: total_cents', T.ok, 'total_cents');
    // Worker B built the handler against the old field name it started with.
    chip('uses amount', [W.wb.bottom, laneB], 8.6, 0.5, T.fg);
    const C = 9.1;
    s.set(C, 'code', 'row3Color', T.fg, 0.08); s.set(C + 0.15, 'code', 'row3Color', T.bad, 0.25);
    s.ripple(C + 0.1, ROWEND(3), T.bad, { r0: 24, r1: 120, dur: 0.6, mark: 'x' });
    s.shake(C + 0.1, 'code', 10, 0.45);
    s.sfx(C + 0.1, 'crash', { pan: 0.15 });
    s.set(C + 0.1, 'wire:dep', 'color', T.bad, 0); s.set(C + 0.1, 'wire:dep', 'alpha', 1, 0.25);
    s.set(C + 0.1, 'wb', 'color', T.bad, 0.2); s.set(C + 0.1, 'wb', 'subColor', T.bad, 0.2);
    s.shake(C + 0.5, 'orch', 8, 0.4); s.sfx(C + 0.5, 'thump', { gain: 0.8 });
    mode(C + 0.5, 'HIDDEN DEPENDENCY', T.bad);

    // ---- Beat 3 (11.0–15.4): the conflict costs a rework round trip ----
    const R = 11.0;
    s.set(R, 'orch', 'port1', T.bad, 0.1); s.set(R + 0.6, 'orch', 'port1', T.dim, 0.3);
    s.pulse(R, 'orch'); s.sfx(R, 'miss', { pan: 0.1 });
    chip('redo: total_cents', [PORT(1), 'wb.top'], R, 0.6, T.bad);
    s.set(R + 0.6, 'wb', 'color', T.fg, 0.15); s.pulse(R + 0.6, 'wb');
    s.set(R + 0.6, 'wb', 'sublabel', 'handler', 0); s.set(R + 0.6, 'wb', 'subColor', T.accent, 0.1);
    s.sfx(R + 0.6, 'arrive', { note: 'G5', gain: 0.55, pan: W.wb.pan });
    work('wb', R + 0.6, R + 1.7);
    const fixed = write(R + 1.7, 'wb', 3, 'handler: total_cents', T.ok, 'uses total_cents');
    s.set(fixed, 'wire:dep', 'color', T.ok, 0.3); s.set(fixed, 'wire:dep', 'dashed', 0, 0);
    s.sfx(fixed + 0.1, 'link', { pan: 0.3 });
    report(fixed + 0.5, 'wb');
    joined(fixed + 1.0);

    // ---- reset (15.4–16.6): stage clears; the dependency is now a known edge ----
    const X = 15.4;
    s.fade(X, 1, 0.5); s.sfx(X, 'poof', { gain: 0.6 });
    initRows(X + 0.55);
    for (const id of ['wa', 'wb']) {
      s.set(X + 0.55, id, 'color', T.mid, 0);
      s.set(X + 0.55, id, 'sublabel', ' ', 0);
      s.set(X + 0.55, id, 'subColor', T.mid, 0);
    }
    s.set(X + 0.55, 'wire:dep', 'color', T.accent, 0); s.set(X + 0.55, 'wire:dep', 'dashed', 1, 0); s.set(X + 0.55, 'wire:dep', 'alpha', 1, 0);
    s.set(X + 0.55, 'mode', 'alpha', 0, 0);
    s.fade(X + 0.7, 0, 0.5);
    mode(X + 1.2, 'KNOWN DEPENDENCY', T.accent);
    s.ripple(X + 1.2, [836, 1486], T.accent, { r0: 10, r1: 70, dur: 0.5 }); s.sfx(X + 1.2, 'ack', { note: 'G6', gain: 0.6, pan: 0.3 });

    // ---- Beat 4 (17.0–20.3): independent work still runs in parallel with the prerequisite ----
    dispatch(17.0, 'wa', 'rename field');
    dispatch(17.1, 'wb', 'docs');
    work('wa', 17.6, 19.0); work('wb', 17.7, 18.8, 0.8);
    write(18.8, 'wb', 1, 'docs: ok', T.ok, 'docs ok', { gain: 0.8 });
    write(19.0, 'wa', 2, 'field: total_cents', T.ok, 'total_cents');
    report(19.5, 'wb', { gain: 0.3 });
    report(19.8, 'wa', { label: 'total_cents', color: T.ok, gain: 0.6 });

    // ---- Beat 5 (20.5–24.0): the dependent step waits for its input, then lands without conflict ----
    const Q = 20.5;
    mode(Q, 'SEQUENCED', T.ok);
    dispatch(Q, 'wb', 'handler total_cents', { color: T.ok, sub: 'handler' });
    work('wb', Q + 0.6, Q + 1.8);
    const done = write(Q + 1.8, 'wb', 3, 'handler: total_cents', T.ok, 'uses total_cents');
    s.set(done, 'wire:dep', 'color', T.ok, 0.3); s.set(done, 'wire:dep', 'dashed', 0, 0);
    s.sfx(done + 0.1, 'link', { pan: 0.3 });
    // Validation consumes the completed handler, so it must wait for that report.
    report(23.15, 'wb', { gain: 0.3 });
    dispatch(23.85, 'wa', 'tests', { color: T.mid, gain: 0.5 });
    work('wa', 24.45, 25.4, 0.6);
    write(25.4, 'wa', 0, 'tests: ok', T.ok, 'tests ok', { gain: 0.6 });
    report(26.2, 'wa', { gain: 0.3 });
    joined(26.9);

    // ---- close: hold the resolved state, then fade to the loop frame ----
    const END = 29.1;
    s.fade(END, 1, 0.6); s.sfx(END, 'poof', { gain: 0.4 });
    s.meta.duration = END + 0.9;
  },
});

