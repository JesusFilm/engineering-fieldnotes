// Memory architecture — "gated writes" cut (variant: fable, model anthropic/claude-fable-5-1).
// Lesson: an unsourced guess written straight into durable memory can repeatedly steer later runs wrong;
// a write gate that requires an approved source and revision keeps guesses in thread state and lets a
// sourced correction replace the stale entry in place.
// Illustrative scenario. The gate is a design the team builds; memory stores do not enforce it.
// Taught with motion and sound only. Words on screen are node names, chips and short status badges.
FlowVideo.scene({
  meta: { title: 'Memory', subtitle: 'GATED WRITES', duration: 32.2, fps: 30, speed: 1, editedBy: 'gpt-6-astra comparative review' },
  build(s) {
    const T = s.THEME;

    // ---- stage ----
    s.node('runs', 'bar', { x: 620, y: 528, w: 480, h: 14, ticks: true, label: 'runs', markR: 11 });
    s.node('agent', 'box', { x: 620, y: 700, w: 340, h: 130, label: 'Run 1', sublabel: 'agent' });
    s.node('result', 'badge', { x: 935, y: 700, alpha: 0 });
    s.node('thread', 'store', { x: 235, y: 1060, w: 340, rows: 2, label: 'Thread 1' });
    s.node('gate', 'box', { x: 730, y: 1060, w: 240, h: 120, label: 'Write gate', sublabel: 'source + rev', subSize: 28, alpha: 0 });
    s.node('memory', 'store', { x: 620, y: 1440, w: 430, rows: 2, label: 'Durable memory' });

    s.node('source', 'box', { x: 205, y: 570, w: 330, h: 120, label: 'Approved source', labelSize: 32, sublabel: 'TESTS.md · r13', subSize: 28, alpha: 0 });
    s.node('example', 'label', { x: 540, y: 1750, text: 'ILLUSTRATIVE WORKFLOW', size: 30 });
    const gateIn = [730, 950], gateOut = [730, 1170];
    s.wire('approved', 'source.bottom', gateIn, { via: [[205, 910], [730, 910]], alpha: 0 });
    s.set(0, 'wire:approved', 'alpha', 0, 0);
    const agentR = [510, 771], agentW = [730, 771];        // read and write ports under the agent
    const memR = [510, 1330], memW = [730, 1330];          // read and write ports above memory (chips stay clear of its border)
    const agentL = s.pt('agent.left'), threadTop = s.pt('thread.top'), corner = [235, 700];
    const row = (id, i) => { const n = s.pt(id); return [n[0], n[1] - 82 + 22 + 27 + i * 66]; }; // centre of store row i
    const memRow1 = row('memory', 1), memRow0 = row('memory', 0), thrRow0 = row('thread', 0);
    const memMark = (i) => [790, row('memory', i)[1]];          // mark position: right end of the row, clear of its text
    s.wire('read', agentR, memR);
    s.wire('write', agentW, memW);
    s.wire('notes', agentL, threadTop, { via: [corner] });
    const PAN = { agent: s.panOf('agent'), memory: s.panOf('memory'), thread: s.panOf('thread'), gate: s.panOf('gate') };

    // Opening state: one sourced convention in durable memory, nothing in thread state.
    s.set(0, 'stage', 'veil', 1, 0);
    s.set(0, 'memory', 'row0Text', 'lint: strict @r12', 0); s.set(0, 'memory', 'row0Color', T.mid, 0);
    s.set(0, 'memory', 'row1Alpha', 0, 0);
    s.set(0, 'thread', 'row0Alpha', 0, 0); s.set(0, 'thread', 'row1Alpha', 0, 0);
    s.fade(0.05, 0, 0.5);

    const chip = (label, route, t, dur, color) => s.packet({ kind: 'chip', label, route, t, dur, color });
    const RUNS = 7;
    const markRun = (t, i, color) => s.mark(t, 'runs', (i + 0.5) / RUNS, color);

    // A note written to thread state: quiet, orange, scoped to the displayed thread.
    const writeThread = (t, txt) => {
      s.pulse(t, 'agent'); s.sfx(t, 'send', { note: 'E6', gain: 0.8, pan: PAN.agent });
      chip(txt, ['agent.left', corner, 'thread.top'], t, 0.7, T.accent);
      const a = t + 0.7;
      s.set(a, 'thread', 'row0Text', txt, 0); s.set(a, 'thread', 'row0Color', T.accent, 0); s.set(a, 'thread', 'row0Alpha', 1, 0.2);
      s.ripple(a, thrRow0, T.accent, { r0: 20, r1: 110, dur: 0.5 }); s.sfx(a, 'store', { note: 'E5', gain: 0.7, pan: PAN.thread });
      return a;
    };
    // Read a key from durable memory; the row that answers flashes and the reply chip carries its colour.
    const read = (t, q, i, reply, color) => {
      s.pulse(t, 'agent'); s.sfx(t, 'send', { note: 'C6', pan: PAN.agent });
      chip(q, [agentR, memR], t, 0.55, T.fg);
      const h = t + 0.55;
      s.pulse(h, 'memory');
      s.set(h, 'memory', 'row' + i + 'Color', T.fg, 0.08); s.set(h + 0.25, 'memory', 'row' + i + 'Color', color, 0.3);
      s.ripple(h, memMark(i), color, { r0: 16, r1: 90, mark: 'check' }); s.sfx(h, 'hit', { pan: PAN.memory });
      chip(reply, [memR, agentR], h + 0.2, 0.55, color);
      return h + 0.75;
    };
    // Outcome of a run: badge pops in, ripple at the agent, a dot lands on the runs bar.
    const outcome = (t, i, ok, first) => {
      s.set(t, 'result', 'text', ok ? (i === 5 ? 'SAVED' : i === 6 ? 'RUN TESTS' : 'OK') : 'NO TESTS', 0); s.set(t, 'result', 'color', ok ? T.ok : T.bad, 0);
      s.set(t, 'result', 'alpha', 1, 0.15); s.set(t, 'result', 'scale', 0.6, 0); s.set(t, 'result', 'scale', 1, 0.35, 'back');
      s.ripple(t, 'agent', ok ? T.ok : T.bad, { r0: 40, r1: 150, dur: 0.7 });
      s.pulse(t, 'agent', ok ? T.ok : T.bad, 0.6);
      markRun(t + 0.1, i, ok ? T.ok : T.bad);
      if (ok) s.sfx(t, 'deliver', { note: 'C6', pan: PAN.agent });
      else if (first) { s.shake(t, 'agent', 16, 0.5); s.sfx(t, 'crash', { pan: PAN.agent }); }
      else { s.shake(t, 'agent', 9, 0.35); s.sfx(t, 'thump', { pan: PAN.agent }); }
    };
    // The displayed run and thread change; older checkpoints may persist.
    const endRun = (t, next) => {
      s.set(t, 'thread', 'row0Alpha', 0, 0.3);
      s.ripple(t, thrRow0, T.dim, { r0: 20, r1: 90, dur: 0.45 }); s.sfx(t, 'poof', { gain: 0.5, pan: PAN.thread });
      s.set(t, 'result', 'alpha', 0, 0.3);
      const n = t + 0.5;
      s.set(n, 'agent', 'label', next, 0); s.set(n, 'thread', 'label', next.replace('Run', 'Thread'), 0); s.pulse(n, 'agent'); s.sfx(n, 'ack', { note: 'G6', pan: PAN.agent });
      return n;
    };

    // 1) Normal run: a note goes to thread state, the sourced convention is read, the run passes.
    writeThread(0.7, 'retry x3');
    const r1 = read(1.9, 'lint?', 0, 'strict @r12', T.ok);
    s.set(r1 + 0.6, 'memory', 'row0Color', T.mid, 0.4);
    outcome(r1 + 0.1, 0, true);
    endRun(4.6, 'Run 2');

    // 2) Problem: while debugging, the agent writes a guess straight into durable memory. No gate, no source.
    writeThread(5.6, 'flaky: ci');
    s.pulse(6.9, 'agent'); s.sfx(6.9, 'send', { note: 'C6', pan: PAN.agent });
    chip('tests: skip ?', [agentW, memW], 6.9, 0.7, T.accent);
    s.set(7.6, 'memory', 'row1Text', 'tests: skip ?', 0); s.set(7.6, 'memory', 'row1Color', T.accent, 0); s.set(7.6, 'memory', 'row1Alpha', 1, 0.2);
    s.ripple(7.6, memRow1, T.accent, { r0: 20, r1: 100, dur: 0.6 }); s.sfx(7.6, 'store', { note: 'G4', pan: PAN.memory });
    markRun(7.7, 1, T.accent);
    endRun(9.2, 'Run 3');

    // 3) Consequence: three illustrative later runs retrieve the guess and skip tests.
    const r3 = read(10.2, 'tests?', 1, 'skip ?', T.accent);
    outcome(r3 + 0.1, 2, false, true);
    endRun(13.0, 'Run 4');
    const r4 = read(13.9, 'tests?', 1, 'skip ?', T.accent);
    outcome(r4 + 0.1, 3, false, false);
    endRun(16.3, 'Run 5');
    const r5 = read(17.1, 'tests?', 1, 'skip ?', T.accent);
    outcome(r5 + 0.1, 4, false, false);
    endRun(19.8, 'Run 6');

    // 4) Resolution: a write gate appears on the write path. The guess bounces and stays in thread state;
    //    a sourced correction passes and replaces the stale entry in place.
    s.set(20.3, 'source', 'alpha', 1, .5); s.set(20.3, 'wire:approved', 'alpha', 1, .5);
    s.set(20.3, 'gate', 'alpha', 1, 0.5); s.set(20.3, 'gate', 'scale', 0.7, 0); s.set(20.3, 'gate', 'scale', 1, 0.5, 'back');
    s.sfx(20.3, 'recover', { pan: PAN.gate });
    s.ripple(20.8, 'gate', T.ok, { r0: 40, r1: 180, dur: 0.6 }); s.pulse(20.8, 'gate', T.ok); s.sfx(20.8, 'chime', { pan: PAN.gate });
    s.pulse(21.6, 'agent'); s.sfx(21.6, 'send', { note: 'C6', pan: PAN.agent });
    chip('tests: skip ?', [agentW, gateIn], 21.6, 0.5, T.accent);
    s.pulse(22.1, 'gate', T.bad, 0.4); s.shake(22.1, 'gate', 9, 0.35);
    s.ripple(22.1, gateIn, T.bad, { r0: 10, r1: 32, mark: 'x' }); s.sfx(22.1, 'miss', { pan: PAN.gate });
    chip('tests: skip ?', [gateIn, agentW], 22.2, 0.5, T.accent);
    writeThread(22.9, 'tests: skip ?');
    s.pulse(24.1, 'source', T.ok); s.sfx(24.1, 'send', { note: 'C6', pan: s.panOf('source') });
    chip('tests: run @r13', ['source.bottom', [205, 910], [730, 910], gateIn], 24.1, 0.5, T.ok);
    s.pulse(24.6, 'gate', T.ok, 0.4);
    s.ripple(24.6, gateIn, T.ok, { r0: 10, r1: 32, mark: 'check' }); s.sfx(24.6, 'ack', { note: 'G6', gain: 1.4, pan: PAN.gate });
    chip('tests: run @r13', [gateOut, memW], 24.7, 0.45, T.ok);
    s.set(25.15, 'memory', 'row1Alpha', 0, 0.15);
    s.ripple(25.15, memRow1, T.bad, { r0: 20, r1: 90, dur: 0.45 }); s.sfx(25.15, 'poof', { pan: PAN.memory });
    s.set(25.45, 'memory', 'row1Text', 'tests: run @r13', 0); s.set(25.45, 'memory', 'row1Color', T.ok, 0); s.set(25.45, 'memory', 'row1Alpha', 1, 0.2);
    s.ripple(25.45, memRow1, T.ok, { r0: 20, r1: 100, dur: 0.6 }); s.sfx(25.45, 'store', { note: 'G5', pan: PAN.memory });
    outcome(25.9, 5, true);
    endRun(27.0, 'Run 7');

    // 5) Verify: the next run reads the corrected entry and passes. Hold, then fade for the loop.
    const r7 = read(27.6, 'tests?', 1, 'run @r13', T.ok);
    outcome(r7 + 0.1, 6, true);
    s.sfx(r7 + 0.5, 'chime', { pan: PAN.agent });
    s.fade(31.4, 1, 0.6);
  },
});
