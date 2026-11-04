/* One operation is a span — observability-and-tracing motion-v2 cut 01.
 * One mechanism: instrumentation in the caller records one call as a span. The span opens as the request
 * leaves, grows while the tool works, and closes when the result returns, leaving start, duration,
 * outcome and an attribute. The same call made with instrumentation off leaves no span at all.
 * Render from the repository root:
 *   node video/observability-and-tracing/motion-v2/01/engine/render.mjs video/observability-and-tracing/motion-v2/01/scene.js video/observability-and-tracing/motion-v2/01/video.mp4 --sheet video/observability-and-tracing/motion-v2/01/scratch/contact-sheet.png
 * Uses the cut-local engine copy, which adds general pill, toggle, timeline, table and frame node types.
 */
FlowVideo.scene({
  meta: { title: '', subtitle: '', duration: 40, fps: 30, speed: 1 },
  build(s) {
    const T = s.THEME;
    const RATE = 3;              // playback seconds per illustrative run second (2.4 s run -> 7.2 s on screen)
    const X0 = 160, X1 = 920;    // time axis, 0..3 s

    // ---- title ----
    s.node('t1', 'label', { x: 540, y: 290, text: 'One operation', size: 84, weight: 800, color: T.title });
    s.node('t2', 'label', { x: 540, y: 384, text: 'is one span', size: 84, weight: 800, color: T.title });

    // ---- runtime: which call, caller, test tool, instrumentation switch ----
    s.node('call1', 'pill', { x: 170, y: 520, w: 180, h: 66, text: 'call 1', color: T.fg });
    s.node('call2', 'pill', { x: 380, y: 520, w: 180, h: 66, text: 'call 2', color: T.fg, alpha: 0 });
    const WL = 346, WR = 734, CL = 468, CR = 612;   // wire ends; chip centres stay clear of the boxes
    s.wire('call', [WL, 690], [WR, 690]);
    s.node('caller', 'box', { x: 210, y: 690, w: 260, h: 180, label: 'caller', labelSize: 48, sublabel: 'ready', subSize: 40, color: T.mid });
    s.node('tool', 'box', { x: 870, y: 690, w: 260, h: 180, label: 'test tool', labelSize: 48, sublabel: 'idle', subSize: 40, color: T.mid });
    s.wire('probe', [128, 786], [128, 822]);
    s.node('instr', 'toggle', { x: 128, y: 852, label: 'instrumentation', state: 'OFF', on: 0 });

    // ---- recorded spans ----
    s.node('view', 'frame', { x: 540, y: 1355, w: 920, h: 830, title: 'recorded spans', value: '0', valueColor: T.mid, headY: 64 });
    s.node('name', 'label', { x: 120, y: 1092, text: 'run_tests', size: 44, weight: 700, mono: true, align: 'left', color: T.fg, alpha: 0 });
    s.node('status', 'label', { x: 960, y: 1092, text: 'open', size: 40, weight: 700, align: 'right', color: T.accent, alpha: 0 });
    s.node('tl', 'timeline', { x: 540, y: 1200, x0: X0, x1: X1, axisY: 1240, barY: 1166, barH: 40, max: 3,
      ticks: ['0', '1 s', '2 s', '3 s'], axisAlpha: 0.55, barAlpha: 0, barColor: T.accent });
    s.node('rec', 'table', { x: 540, y: 1530, w: 840, rowH: 80, keys: ['start', 'duration', 'outcome', 'tool'], keyX: 40, valX: 300,
      alpha: 0, color: T.dim,
      r0Val: '09:14:02.0', r1Val: '…', r1ValColor: T.mid, r2Val: '…', r2ValColor: T.mid, r3Val: 'test-tool' });

    const pan = (id) => s.panOf(id);
    const wireLit = (t, on, c) => { s.set(t, 'wire:call', 'color', on ? c : T.wire, 0.2); s.set(t, 'wire:call', 'flow', on ? 1 : 0, 0); };

    // One remote call. base = run time 0 on screen. Request leaves at run 0.1 s, tool works 0.4-2.1 s,
    // result lands at 2.4 s. Returns the time the result reaches the caller.
    function call(base) {
      const at = (r) => base + r * RATE;
      const send = at(0.1), arrive = at(0.4), done = at(2.1), back = at(2.4);
      s.set(send, 'caller', 'sublabel', 'waiting', 0); s.set(send, 'caller', 'subColor', T.accent, 0);
      s.set(send, 'caller', 'color', T.fg, 0.2);
      wireLit(send, true, T.fg);
      s.packet({ route: [[CL, 690], [CR, 690]], t: send, dur: arrive - send, kind: 'chip', label: 'run_tests', size: 36, color: T.fg, fade: 0.2 });
      s.sfx(send, 'send', { note: 'C6', gain: 1.1, pan: pan('caller') });
      wireLit(arrive, false);
      s.set(arrive, 'tool', 'color', T.fg, 0.2); s.set(arrive, 'tool', 'glow', 0.6, 0.2);
      s.set(arrive, 'tool', 'sublabel', 'running', 0); s.set(arrive, 'tool', 'subColor', T.accent, 0);
      s.set(arrive, 'tool', 'busy', 1, 0.2);
      s.ripple(arrive, 'tool.left', T.fg, { r0: 10, r1: 56 });
      s.sfx(arrive, 'arrive', { note: 'E5', pan: pan('tool') });
      s.set(arrive + 0.4, 'tool', 'glow', 0, 0.6);
      for (const r of [0.85, 1.3, 1.75]) s.sfx(at(r), 'work', { note: 'E4', gain: 1.3, pan: pan('tool') });
      s.set(done, 'tool', 'busy', 0, 0.2);
      s.set(done, 'tool', 'sublabel', 'done', 0); s.set(done, 'tool', 'subColor', T.ok, 0);
      wireLit(done, true, T.ok);
      s.packet({ route: [[CR + 20, 690], [CL - 20, 690]], t: done, dur: back - done, kind: 'chip', label: 'result', size: 36, color: T.ok, fade: 0.2 });
      s.sfx(done, 'send', { note: 'E6', gain: 1.1, pan: pan('tool') });
      wireLit(back, false);
      s.set(back, 'tool', 'color', T.mid, 0.4);
      s.set(back, 'caller', 'sublabel', 'got result', 0); s.set(back, 'caller', 'subColor', T.ok, 0);
      s.ripple(back, 'caller.right', T.ok, { r0: 10, r1: 56 });
      s.sfx(back, 'deliver', { note: 'C5', gain: 1.2, pan: pan('caller') });
      return back;
    }

    // ---- beat 1: call 1 with instrumentation off. The work happens; nothing is recorded ----
    let back = call(2.0);                                   // result lands at 9.2
    s.set(back + 0.6, 'caller', 'color', T.mid, 0.4);
    let t = 10.0;                                           // the view is still empty
    s.pulse(t, 'view', T.mid, 0.6);
    s.set(t, 'view', 'valueColor', T.fg, 0.12); s.set(t + 0.7, 'view', 'valueColor', T.mid, 0.4);
    s.set(t, 'call1', 'color', T.mid, 0.3); s.set(t, 'call1', 'textColor', T.mid, 0.3); s.set(t, 'call1', 'dashed', 1, 0);
    s.sfx(t, 'thump', { gain: 0.55, pan: 0 });

    // ---- beat 2: reset for a second call, then switch instrumentation on ----
    t = 12.0;
    s.set(t, 'caller', 'sublabel', 'ready', 0); s.set(t, 'caller', 'subColor', T.mid, 0);
    s.set(t, 'tool', 'sublabel', 'idle', 0); s.set(t, 'tool', 'subColor', T.mid, 0);
    s.set(t, 'call2', 'alpha', 1, 0.3); s.pulse(t, 'call2');
    s.sfx(t, 'ack', { note: 'C6', gain: 1.0, pan: pan('call2') });
    t = 13.2;
    s.set(t, 'instr', 'on', 1, 0.35); s.set(t, 'instr', 'state', 'ON', 0); s.set(t, 'instr', 'labelColor', T.fg, 0.3);
    s.pulse(t, 'instr');
    s.set(t, 'wire:probe', 'color', T.ok, 0.3);
    s.sfx(t, 'ack', { note: 'G5', gain: 1.6, pan: pan('instr') });

    // ---- beat 3: call 2. The span opens, then grows while the tool works ----
    const B = 15.5;
    s.set(B, 'tl', 'barAlpha', 1, 0); s.set(B, 'tl', 'startCap', 1, 0.3); s.set(B, 'tl', 'head', 1, 0.2);
    s.set(B, 'tl', 'len', 2.4, 2.4 * RATE, 'linear');
    s.set(B, 'tl', 'axisAlpha', 1, 0.3);
    s.set(B, 'name', 'alpha', 1, 0.3); s.set(B, 'status', 'alpha', 1, 0.3);
    s.set(B, 'view', 'value', '1', 0); s.set(B, 'view', 'valueColor', T.ok, 0.2); s.set(B, 'view', 'color', T.mid, 0.3);
    s.set(B, 'rec', 'alpha', 1, 0.3);
    s.set(B + 0.1, 'rec', 'r0Alpha', 1, 0.3); s.set(B + 0.1, 'rec', 'r1Alpha', 1, 0.3);
    s.set(B + 0.1, 'rec', 'r2Alpha', 1, 0.3); s.set(B + 0.1, 'rec', 'r3Alpha', 1, 0.3);
    s.set(B + 0.1, 'rec', 'r0Hl', 1, 0.15); s.set(B + 0.8, 'rec', 'r0Hl', 0, 0.5);
    s.set(B + 0.1, 'rec', 'r3Hl', 1, 0.15); s.set(B + 0.8, 'rec', 'r3Hl', 0, 0.5);
    s.ripple(B, [X0, 1166], T.fg, { r0: 10, r1: 60 });
    s.sfx(B, 'store', { note: 'G5', gain: 1.4, pan: s.panOf([X0, 1166]) });
    back = call(B);                                         // result lands at 22.7

    // ---- beat 4: the result lands; the span closes ----
    t = back;
    s.set(t, 'tl', 'head', 0, 0.2); s.set(t, 'tl', 'endCap', 1, 0.3);
    s.set(t, 'tl', 'barColor', T.ok, 0.3); s.set(t, 'tl', 'glow', 1, 0.12); s.set(t + 0.15, 'tl', 'glow', 0, 0.6);
    s.set(t, 'status', 'text', 'closed', 0); s.set(t, 'status', 'color', T.ok, 0);
    s.set(t, 'call2', 'color', T.ok, 0.3); s.set(t, 'call2', 'textColor', T.ok, 0.3);
    s.sfx(t + 0.15, 'chime', { note: 'G5', gain: 1.5, pan: s.panOf([768, 1166]) });
    s.set(t + 0.6, 'caller', 'color', T.mid, 0.4);
    t = back + 1.0;                                          // duration row
    s.set(t, 'rec', 'r1Val', '2.4 s', 0); s.set(t, 'rec', 'r1ValColor', T.ok, 0);
    s.set(t, 'rec', 'r1Hl', 1, 0.15); s.set(t + 0.7, 'rec', 'r1Hl', 0, 0.5);
    s.sfx(t, 'store', { note: 'G5', gain: 1.1, pan: 0 });
    t = back + 1.8;                                          // outcome row
    s.set(t, 'rec', 'r2Val', 'returned', 0); s.set(t, 'rec', 'r2ValColor', T.ok, 0);
    s.set(t, 'rec', 'r2Hl', 1, 0.15); s.set(t + 0.7, 'rec', 'r2Hl', 0, 0.5);
    s.sfx(t, 'store', { note: 'G5', gain: 1.1, pan: 0 });

    // ---- beat 5: read the record, then compare the two calls ----
    t = 28.0;
    for (const id of ['caller', 'tool', 'instr']) s.set(t - 0.6, id, 'alpha', 0.4, 0.6);
    s.set(t - 0.6, 'wire:call', 'alpha', 0.4, 0.6); s.set(t - 0.6, 'wire:probe', 'alpha', 0.4, 0.6);
    const look = (tt, row, capProp) => {
      s.set(tt, 'rec', 'r' + row + 'Hl', 1, 0.15); s.set(tt + 0.9, 'rec', 'r' + row + 'Hl', 0, 0.5);
      if (capProp) { s.set(tt, 'tl', capProp, 1.25, 0.15); s.set(tt + 0.5, 'tl', capProp, 1, 0.3); }
      s.sfx(tt, 'ack', { note: 'G5', gain: 1.3, pan: 0 });
    };
    look(28.0, 0, 'startCap');                               // start <- start cap
    look(29.4, 1, 'endCap');                                 // duration <- end cap
    s.set(29.4, 'tl', 'glow', 0.8, 0.15); s.set(29.9, 'tl', 'glow', 0, 0.5);
    look(30.8, 2, null);                                     // outcome and attribute
    s.set(30.8, 'rec', 'r3Hl', 1, 0.15); s.set(31.7, 'rec', 'r3Hl', 0, 0.5);
    t = 32.8;                                                // call 1: no span
    s.pulse(t, 'call1', T.fg, 0.5);
    s.sfx(t, 'thump', { gain: 0.5, pan: pan('call1') });
    t = 34.0;                                                // call 2: one span, one record
    s.pulse(t, 'call2', null, 0.6);
    s.set(t, 'tl', 'glow', 1, 0.15); s.set(t + 0.2, 'tl', 'glow', 0, 0.6);
    s.pulse(t, 'rec', T.ok, 0.6);
    s.pulse(t, 'view');
    s.sfx(t, 'arrive', { note: 'G5', gain: 1.0, pan: 0 });

    // ---- hold the finished record, then end ----
    s.fade(38.0, 1, 1.0);
    s.meta.duration = 40.0;
  },
});

