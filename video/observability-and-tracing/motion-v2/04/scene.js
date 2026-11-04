/* Visibility is not a speedup — observability-and-tracing motion-v2 cut 04.
 * One mechanism: in an illustrative sequential run the model call takes 0.6 s and the tool call 2.4 s, so the
 * agent task takes 3.0 s. Without propagated context the tool span lands in a separate trace and the agent's
 * trace has 2.4 s it cannot explain. In the next run, with context sent, the same 2.4 s span sits under the
 * agent task, and the task still takes 3.0 s.
 * Render from the repository root:
 *   node video/observability-and-tracing/motion-v2/04/engine/render.mjs video/observability-and-tracing/motion-v2/04/scene.js video/observability-and-tracing/motion-v2/04/video.mp4 --sheet video/observability-and-tracing/motion-v2/04/scratch/contact-sheet.png
 * Uses the cut-local engine copy (frame, spanbar and slot node types; label align).
 */
FlowVideo.scene({
  meta: { title: '', subtitle: '', duration: 43, fps: 30, speed: 1 },
  build(s) {
    const T = s.THEME, K = 196, X0 = 360, RATE = 2;   // 196 px per run second; 2 video seconds per run second
    const X = (sec) => X0 + K * sec;
    const MODEL = 0.6, TOOL = 2.4, TOTAL = 3.0;

    // ---- title ----
    s.node('t1', 'label', { x: 540, y: 290, text: 'Visibility is not', size: 84, weight: 800, color: T.title });
    s.node('t2', 'label', { x: 540, y: 384, text: 'a speedup', size: 84, weight: 800, color: T.title });

    // ---- one waterfall panel ----
    function panel(id, cy, h, head, traceId, y0) {
      s.node(id + 'F', 'frame', { x: 540, y: cy, w: 1000, h, color: T.mid });
      s.node(id + 'Head', 'label', { x: 70, y: y0, text: head, size: 44, weight: 700, align: 'left', color: T.fg });
      s.node(id + 'Trace', 'label', { x: 1010, y: y0, text: traceId, size: 40, weight: 700, mono: true, align: 'right', color: T.mid });
      const rows = { agent: y0 + 90, model: y0 + 160, tool: y0 + 230 };
      s.node(id + 'NA', 'label', { x: 64, y: rows.agent, text: 'agent task', size: 40, weight: 700, mono: true, align: 'left', color: T.fg });
      s.node(id + 'NM', 'label', { x: 104, y: rows.model, text: 'model call', size: 40, weight: 700, mono: true, align: 'left', color: T.fg });
      s.wire(id + 'elM', [80, rows.agent + 24], [96, rows.model], { via: [[80, rows.model]], color: T.mid });
      s.node(id + 'A', 'spanbar', { x: 540, y: rows.agent, x0: X0, pxPerS: K, color: T.fg, len: 0, label: '3.0 s' });
      s.node(id + 'M', 'spanbar', { x: 540, y: rows.model, x0: X0, pxPerS: K, color: T.accent, len: 0, label: '0.6 s', outside: true });
      const ay = rows.tool + 55;
      s.wire(id + 'axis', [X0, ay], [X(TOTAL), ay]);
      ['0', '1 s', '2 s', '3 s'].forEach((lb, i) => {
        s.wire(id + 'tk' + i, [X(i), ay - 10], [X(i), ay + 10]);
        s.node(id + 'tl' + i, 'label', { x: X(i), y: ay + 38, text: lb, size: 40, weight: 500, color: T.mid });
      });
      return rows;
    }
    const r1 = panel('p1', 790, 640, 'run 1 · no context sent', 'trace 7c1e', 520);
    // the slot under the agent task where the tool's span would sit
    s.node('gap', 'slot', { x: 540, y: r1.tool, h: 60, x0: X(MODEL), x1: X(TOTAL), text: '', alpha: 0, color: T.mid });
    // the tool's span, recorded in a separate trace
    s.node('sepF', 'frame', { x: 540, y: 990, w: 960, h: 170, color: T.mid, alpha: 0 });
    s.node('sepTrace', 'label', { x: 84, y: 940, text: 'trace 91d0', size: 40, weight: 700, mono: true, align: 'left', color: T.mid, alpha: 0 });
    s.node('sepN', 'label', { x: 84, y: 1030, text: 'tool call', size: 40, weight: 700, mono: true, align: 'left', color: T.fg, alpha: 0 });
    s.node('sepT', 'spanbar', { x: 540, y: 1030, x0: X0, pxPerS: K, color: T.ok, len: 0, label: '2.4 s' });

    const r2 = panel('p2', 1405, 530, 'run 2 · context sent', 'trace 4bf9', 1190);
    s.node('p2NT', 'label', { x: 104, y: r2.tool, text: 'tool call', size: 40, weight: 700, mono: true, align: 'left', color: T.fg, alpha: 0 });
    s.wire('p2elT', [80, r2.model], [96, r2.tool], { via: [[80, r2.tool]] });
    s.node('p2T', 'spanbar', { x: 540, y: r2.tool, x0: X(MODEL), pxPerS: K, color: T.ok, len: 0, label: '2.4 s' });
    s.node('noSep', 'label', { x: 540, y: 1612, text: 'no separate trace', size: 40, weight: 600, mono: true, color: T.mid, alpha: 0 });
    // the 3.0 s guide, one segment per run
    s.wire('g1', [X(TOTAL), r1.agent - 40], [X(TOTAL), r1.tool + 40]);
    s.wire('g2', [X(TOTAL), r2.agent - 40], [X(TOTAL), r2.tool + 40]);

    // panel 2 and everything in it starts hidden
    const p2ids = ['p2F', 'p2Head', 'p2Trace', 'p2NA', 'p2NM', 'p2A', 'p2M', 'p2tl0', 'p2tl1', 'p2tl2', 'p2tl3'];
    for (const id of p2ids) s.set(0, id, 'alpha', 0, 0);
    for (const w of ['p2elM', 'p2elT', 'p2axis', 'p2tk0', 'p2tk1', 'p2tk2', 'p2tk3', 'g1', 'g2']) s.set(0, 'wire:' + w, 'alpha', 0, 0);

    const show = (t, id, d = 0.3) => s.set(t, id, 'alpha', 1, d);
    const close = (t, id) => { s.set(t, id, 'labelAlpha', 1, 0.3); s.set(t, id, 'glow', 1, 0.12); s.set(t + 0.15, id, 'glow', 0, 0.5); };

    // one run of the task. base = run time 0. Returns the time the agent task closes.
    function run(base, p, toolBar, onToolStart) {
      const at = (sec) => base + sec * RATE;
      s.set(base, p + 'A', 'len', TOTAL, TOTAL * RATE, 'linear');
      s.set(base, p + 'M', 'len', MODEL, MODEL * RATE, 'linear');
      s.sfx(base, 'arrive', { note: 'C5', gain: 1.0, pan: 0 });
      s.sfx(base + 0.12, 'arrive', { note: 'E5', gain: 0.8, pan: 0 });
      close(at(MODEL), p + 'M'); s.sfx(at(MODEL), 'store', { note: 'E5', gain: 1.1, pan: -0.2 });
      onToolStart(at(MODEL));
      s.set(at(MODEL), toolBar, 'len', TOOL, TOOL * RATE, 'linear');
      for (let k = 1; k <= 5; k++) s.sfx(at(MODEL) + k * 0.8, 'work', { note: 'G4', gain: 1.2, pan: 0.2 });
      close(at(TOTAL), toolBar); s.sfx(at(TOTAL), 'store', { note: 'G5', gain: 1.1, pan: 0.2 });
      close(at(TOTAL) + 0.25, p + 'A'); s.sfx(at(TOTAL) + 0.25, 'store', { note: 'C5', gain: 1.2, pan: 0 });
      return at(TOTAL) + 0.25;
    }

    // ---- beat 1: run 1, two sequential calls (0.6 + 2.4 = 3.0 s), but the tool span lands in another trace ----
    let end1 = run(1.5, 'p1', 'sepT', (t) => {
      show(t, 'sepF'); show(t, 'sepTrace'); show(t, 'sepN');
      s.pulse(t, 'sepF', T.fg, 0.4);
    });                                                       // closes at 7.75
    [[8.4, 'p1M', 'E5'], [9.0, 'sepT', 'G5'], [9.6, 'p1A', 'C5']].forEach(([t, id, note]) => {
      s.set(t, id, 'glow', 1, 0.12); s.set(t + 0.15, id, 'glow', 0, 0.5);
      s.sfx(t, 'ack', { note, gain: 1.3, pan: 0 });
    });

    // ---- beat 2: without linkage, 2.4 s of the agent's trace is unexplained ----
    let t = 12.0;
    show(t, 'gap'); s.set(t, 'gap', 'text', '?', 0); s.pulse(t, 'gap');
    s.sfx(t, 'miss', { gain: 0.9, pan: 0 });
    t = 13.0;
    s.set(t, 'p1A', 'tintFrom', MODEL, 0); s.set(t, 'p1A', 'tintTo', TOTAL, 0); s.set(t, 'p1A', 'tintAlpha', 1, 0.6);
    s.sfx(t, 'ack', { note: 'C4', gain: 1.2, pan: 0 });     // the agent's own unexplained stretch, at the agent's pitch
    t = 14.2;                                                 // two different trace IDs
    s.pulse(t, 'p1Trace', T.fg, 0.6); s.pulse(t + 0.3, 'sepTrace', T.fg, 0.6); s.pulse(t + 0.3, 'sepF', T.fg, 0.6);
    s.sfx(t, 'thump', { gain: 0.45, pan: 0 });

    // ---- beat 3: the next run sends context; the same 2.4 s span joins the agent's trace ----
    t = 19.5;
    for (const id of p2ids) show(t, id, 0.5);
    for (const w of ['p2elM', 'p2axis', 'p2tk0', 'p2tk1', 'p2tk2', 'p2tk3']) s.set(t, 'wire:' + w, 'alpha', 1, 0.5);
    s.pulse(t, 'p2F', T.fg, 0.5);
    s.sfx(t, 'ack', { note: 'C6', gain: 1.0, pan: 0 });
    let end2 = run(21.0, 'p2', 'p2T', (tt) => {
      show(tt, 'p2NT'); s.set(tt, 'wire:p2elT', 'alpha', 1, 0.3); s.set(tt, 'wire:p2elT', 'color', T.fg, 0.3);
      s.ripple(tt, [X(MODEL), r2.tool], T.ok, { r0: 12, r1: 64 });
      s.sfx(tt + 0.1, 'chime', { note: 'G5', gain: 1.3, pan: 0 });
    });                                                       // closes at 27.25
    t = end2 + 0.7;
    show(t, 'noSep', 0.5);
    s.sfx(t, 'ack', { note: 'C5', gain: 0.9, pan: 0 });

    // ---- beat 4: still 3.0 s, the same 2.4 s: visibility improved, not speed ----
    t = 31.5;                                                 // same total: guide through both agent bar ends
    s.set(t, 'wire:g1', 'alpha', 1, 0.3); s.set(t, 'wire:g2', 'alpha', 1, 0.3);
    s.set(t, 'wire:g1', 'color', T.title, 0.2); s.set(t, 'wire:g2', 'color', T.title, 0.2);
    s.set(t, 'p1A', 'glow', 1, 0.12); s.set(t + 0.15, 'p1A', 'glow', 0, 0.5);
    s.set(t + 0.35, 'p2A', 'glow', 1, 0.12); s.set(t + 0.5, 'p2A', 'glow', 0, 0.5);
    s.sfx(t, 'ack', { note: 'C5', gain: 1.4, pan: 0 }); s.sfx(t + 0.35, 'ack', { note: 'C5', gain: 1.4, pan: 0 });
    t = 33.2;                                                 // same tool time
    s.set(t, 'sepT', 'glow', 1, 0.12); s.set(t + 0.15, 'sepT', 'glow', 0, 0.5);
    s.set(t + 0.35, 'p2T', 'glow', 1, 0.12); s.set(t + 0.5, 'p2T', 'glow', 0, 0.5);
    s.sfx(t, 'ack', { note: 'G5', gain: 1.4, pan: 0 }); s.sfx(t + 0.35, 'ack', { note: 'G5', gain: 1.4, pan: 0 });
    t = 34.9;                                                 // run 1's gap is run 2's tool span
    s.pulse(t, 'gap', T.fg, 0.5); s.set(t + 0.6, 'p2T', 'glow', 1, 0.12); s.set(t + 0.75, 'p2T', 'glow', 0, 0.6);
    s.sfx(t, 'ack', { note: 'G4', gain: 1.2, pan: 0 }); s.sfx(t + 0.6, 'ack', { note: 'G5', gain: 1.2, pan: 0 });

    // ---- hold, then end ----
    s.fade(41.0, 1, 1.0);
    s.meta.duration = 43.0;
  },
});

