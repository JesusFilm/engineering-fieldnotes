/* Return usable evidence — tool-design motion-v2 cut 03.
 * One mechanism: a result is usable evidence when it carries record IDs, short summaries and the searched scope.
 * The model's answer can then cite those records, and its claims must stay inside the searched scope.
 * Geometry: a result payload that grows, a time axis with the searched window and the returned records,
 * and an answer card. Citations travel the left gutter to result rows; scope checks travel the right gutter to the axis.
 * Render from the repository root:
 *   node video/tool-design/motion-v2/03/engine/render.mjs video/tool-design/motion-v2/03/scene.js video/tool-design/motion-v2/03/video.mp4 --sheet video/tool-design/motion-v2/03/scratch/contact-sheet.png
 * The local engine copy adds 'card' and 'tick' (copied from cut 02), a 'timeline' node, and an optional chip text size.
 */
FlowVideo.scene({
  meta: { title: '', subtitle: '', duration: 42, fps: 30, speed: 1 },
  build(s) {
    const T = s.THEME;
    const RY = [630, 710, 790, 870];               // result rows
    const AY = [1360, 1440, 1520];                 // answer rows
    const BAR = { x: 540, y: 1070, w: 840, a: 0.5, b: 4 / 6 };   // 06:00–12:00 UTC; window 09:00–10:00
    const bx = (f) => BAR.x - BAR.w / 2 + BAR.w * f;
    const pan = (x) => ((x - 540) / 540) * 0.6;

    // ---- title band ----
    s.node('title', 'label', { x: 540, y: 290, text: 'Return usable evidence', size: 78, weight: 800, color: T.title });
    s.node('subtitle', 'label', { x: 540, y: 378, text: 'TOOL DESIGN · 3', size: 36, weight: 700, color: T.mid });

    // ---- stage ----
    s.node('result', 'card', { x: 540, y: 725, w: 940, h: 410, title: 'search_incidents result', titleDy: 44, alpha: 0, color: T.mid,
      rows: [0, 1, 2, 3].map((i) => ({ dy: RY[i] - 520, size: 44, mono: true, hlPad: 22 })),
      r0Text: 'status: ok', r0Color: T.ok,
      r1Text: 'INC-42  Elevated error rate', r1Alpha: 0, r1HlColor: T.ok,
      r2Text: 'INC-57  Slow payment responses', r2Alpha: 0, r2HlColor: T.ok,
      r3Text: 'searched: payments 09:00–10:00Z', r3Color: T.accent, r3Alpha: 0 });
    s.node('axis', 'timeline', { x: BAR.x, y: BAR.y, w: BAR.w, h: 26, a: BAR.a, b: BAR.b, markR: 15, marks: [(9 + 20 / 60 - 6) / 6, (9 + 45 / 60 - 6) / 6], alpha: 0 });
    s.node('t06', 'label', { x: bx(0), y: 1125, text: '06:00', size: 40, weight: 600, color: T.mid, alpha: 0 });
    s.node('t12', 'label', { x: bx(1), y: 1125, text: '12:00', size: 40, weight: 600, color: T.mid, alpha: 0 });
    s.node('t09', 'label', { x: bx(BAR.a), y: 1125, text: '09:00', size: 40, weight: 600, color: T.accent, alpha: 0 });
    s.node('t10', 'label', { x: bx(BAR.b), y: 1125, text: '10:00', size: 40, weight: 600, color: T.accent, alpha: 0 });
    s.node('nsL', 'label', { x: bx(BAR.a / 2), y: 1180, text: 'not searched', size: 40, weight: 600, color: T.mid, alpha: 0 });
    s.node('nsR', 'label', { x: bx((BAR.b + 1) / 2) - 20, y: 1180, text: 'not searched', size: 40, weight: 600, color: T.mid, alpha: 0 });
    s.node('xL', 'tick', { x: bx(BAR.a / 2), y: 1036, r: 26, sym: 'x', color: T.bad });
    s.node('xR', 'tick', { x: bx((BAR.b + 1) / 2), y: 1036, r: 26, sym: 'x', color: T.bad });
    s.node('answer', 'card', { x: 540, y: 1415, w: 940, h: 330, title: 'Model answer', titleDy: 44, alpha: 0, color: T.mid, status: '',
      rows: [0, 1, 2].map((i) => ({ dy: AY[i] - 1250, size: 44, mono: true, hlPad: 22 })),
      r0Text: 'Incidents found', r0Alpha: 0, r1Text: 'INC-42 · INC-57', r1Alpha: 0, r2Text: '', r2Alpha: 0 });
    s.node('noCite', 'tick', { x: 36, y: RY[0], r: 24, sym: 'x', color: T.mid });

    const status = (t, txt, col) => { s.set(t, 'answer', 'status', txt, 0); s.set(t, 'answer', 'statusColor', col, 0); };
    const row = (t, id, i, txt, col, note, gain = 0.9) => {
      if (txt !== null) s.set(t, id, 'r' + i + 'Text', txt, 0);
      if (col) s.set(t, id, 'r' + i + 'Color', col, 0);
      s.set(t, id, 'r' + i + 'Alpha', 1, 0.3);
      s.sfx(t, 'store', { note, gain, pan: 0 });
    };
    const cite = (t, fromY, toY, col) => {   // left gutter: answer row -> result row
      s.packet({ route: [[70, fromY], [36, fromY], [36, toY], [70, toY]], t, dur: 1.0, kind: 'dot', color: col });
      s.sfx(t, 'send', { note: 'C6', gain: 1.3, pan: -0.55 });
    };

    // ---- beat 1 (0–9): a bare success flag gives the answer nothing to cite ----
    s.set(0.6, 'result', 'alpha', 1, 0.4); s.set(0.6, 'result', 'color', T.fg, 0.3);
    s.sfx(0.6, 'arrive', { note: 'G5', gain: 0.8, pan: 0 });
    s.set(2.0, 'result', 'color', T.mid, 0.5);
    s.set(2.4, 'answer', 'alpha', 1, 0.4);
    row(3.0, 'answer', 0, null, null, 'C5');
    cite(4.0, AY[0], RY[0], T.mid);
    s.set(5.0, 'noCite', 'pop', 1, 0.35); s.sfx(5.0, 'miss', { note: 'E4', gain: 0.9, pan: -0.55 });
    s.set(5.0, 'result', 'r0Hl', 1, 0.2); s.set(5.0, 'result', 'r0HlColor', T.mid, 0);
    status(5.5, 'nothing to cite', T.mid); s.sfx(5.5, 'ack', { note: 'C4', gain: 1.4, pan: 0.4 });
    s.set(8.4, 'noCite', 'pop', 0, 0.3); s.set(8.4, 'result', 'r0Hl', 0, 0.4);

    // ---- beat 2 (9–18.5): return IDs, summaries and the searched interval ----
    s.set(9.2, 'axis', 'alpha', 1, 0.5); s.sfx(9.2, 'ack', { note: 'E5', gain: 1.0, pan: 0 });
    s.set(9.2, 't06', 'alpha', 1, 0.5); s.set(9.2, 't12', 'alpha', 1, 0.5);
    s.set(9.6, 'result', 'color', T.fg, 0.3);
    row(10.0, 'result', 1, null, null, 'G5');
    s.set(10.7, 'axis', 'm0Pop', 1, 0.35); s.sfx(10.7, 'ack', { note: 'E6', gain: 1.2, pan: pan(bx(0.556)) });
    row(11.9, 'result', 2, null, null, 'G5');
    s.set(12.6, 'axis', 'm1Pop', 1, 0.35); s.sfx(12.6, 'ack', { note: 'E6', gain: 1.2, pan: pan(bx(0.625)) });
    row(14.0, 'result', 3, null, null, 'G5', 1.0);
    s.set(14.6, 'axis', 'winColor', T.accent, 0.4);
    s.set(14.6, 't09', 'alpha', 1, 0.3); s.set(14.6, 't10', 'alpha', 1, 0.3);
    s.sfx(14.6, 'store', { note: 'E5', gain: 1.0, pan: 0 });
    s.set(15.3, 'answer', 'r0Alpha', 0.35, 0.5); status(15.3, '', T.mid);
    s.set(15.6, 'result', 'color', T.mid, 0.5);

    // ---- beat 3 (18.5–26.5): the answer cites the returned records ----
    row(18.5, 'answer', 0, 'Returned: 2 reports', T.fg, 'C5');
    s.set(18.5, 'answer', 'color', T.fg, 0.3);
    row(19.6, 'answer', 1, null, null, 'C5');
    s.set(20.6, 'answer', 'r1Hl', 1, 0.2); s.set(20.6, 'answer', 'r1HlColor', T.ok, 0);
    cite(20.7, AY[1], RY[1], T.ok);
    s.set(21.7, 'result', 'r1Hl', 1, 0.2); s.sfx(21.7, 'hit', { note: 'G5', gain: 0.9, pan: -0.3 });
    cite(21.9, AY[1], RY[2], T.ok);
    s.set(22.9, 'result', 'r2Hl', 1, 0.2); s.sfx(22.9, 'hit', { note: 'B5', gain: 0.9, pan: -0.3 });
    status(23.6, 'cited', T.ok); s.set(23.6, 'answer', 'color', T.ok, 0.25);
    s.sfx(23.6, 'chime', { note: 'C6', gain: 0.9, pan: 0.4 });
    for (const [id, i] of [['answer', 1], ['result', 1], ['result', 2]]) s.set(26.0, id, 'r' + i + 'Hl', 0, 0.5);
    s.set(26.0, 'answer', 'color', T.mid, 0.5);

    // ---- beat 4 (26.5–42): keep claims within the returned scope ----
    row(26.8, 'answer', 2, 'No other incidents today', T.bad, 'C5', 0.7);
    s.set(26.8, 'answer', 'color', T.fg, 0.3);
    let t = 27.8;                       // compare the claim's scope with the searched window
    s.packet({ route: [[1010, AY[2]], [1046, AY[2]], [1046, BAR.y], [966, BAR.y]], t, dur: 1.0, kind: 'dot', color: T.bad });
    s.sfx(t, 'send', { note: 'C6', gain: 1.3, pan: 0.55 });
    t = 28.8;
    s.set(t, 'axis', 'leftColor', T.bad, 0.2); s.set(t, 'axis', 'rightColor', T.bad, 0.2);
    s.set(t, 'xL', 'pop', 1, 0.35); s.set(t, 'xR', 'pop', 1, 0.35);
    status(t, 'over-claims', T.bad); s.set(t, 'answer', 'color', T.bad, 0.2);
    s.sfx(t, 'miss', { note: 'E5', gain: 1.1, pan: 0 });
    t = 31.6;                           // pull the claim back inside the searched hour
    row(t, 'answer', 2, 'Only 09:00–10:00Z searched', T.accent, 'C5');
    status(t, '', T.mid); s.set(t, 'answer', 'color', T.fg, 0.3);
    t = 32.4;
    s.set(t, 'axis', 'leftColor', T.dim, 0.4); s.set(t, 'axis', 'rightColor', T.dim, 0.4);
    s.set(t, 'xL', 'pop', 0, 0.3); s.set(t, 'xR', 'pop', 0, 0.3);
    s.set(t, 'nsL', 'alpha', 1, 0.4); s.set(t, 'nsR', 'alpha', 1, 0.4);
    s.sfx(t, 'ack', { note: 'E5', gain: 1.3, pan: 0 });
    t = 33.2;
    status(t, 'within scope', T.ok); s.set(t, 'answer', 'color', T.ok, 0.25);
    s.sfx(t, 'ack', { note: 'C6', gain: 1.3, pan: 0.4 });
    s.set(34.0, 'answer', 'color', T.fg, 0.6);

    // ---- hold the scoped, cited answer; then end ----
    s.fade(40.2, 1, 1.2);
    s.meta.duration = 42.0;
  },
});

