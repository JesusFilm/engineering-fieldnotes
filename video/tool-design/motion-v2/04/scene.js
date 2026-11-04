/* Empty versus failed — tool-design motion-v2 cut 04.
 * One mechanism: a search that completed with no matches and a search that timed out are different outcomes.
 * The first returns success with an empty list and supports "no matches in that scope"; the second must return an
 * error result (or, with a transport timeout, no result at all), and the model's conclusion must stay "unknown".
 * Geometry: one shared query, two side-by-side runs with elapsed-time bars against a deadline, a tool-result card
 * per run, and one answer panel with a row per outcome. The trap is the timed-out run showing the empty-success card.
 * Render from the repository root:
 *   node video/tool-design/motion-v2/04/engine/render.mjs video/tool-design/motion-v2/04/scene.js video/tool-design/motion-v2/04/video.mp4 --sheet video/tool-design/motion-v2/04/scratch/contact-sheet.png
 * The local engine copy adds 'card' and 'tick' (copied from cut 02) and a 'deadline' bar node.
 */
FlowVideo.scene({
  meta: { title: '', subtitle: '', duration: 46, fps: 30, speed: 1 },
  build(s) {
    const T = s.THEME;
    const AX = 290, BX = 790;                        // column centres
    const pan = (x) => ((x - 540) / 540) * 0.6;

    // ---- title band ----
    s.node('title', 'label', { x: 540, y: 290, text: 'Empty versus failed', size: 84, weight: 800, color: T.title });
    s.node('subtitle', 'label', { x: 540, y: 378, text: 'TOOL DESIGN · 4', size: 36, weight: 700, color: T.mid });

    // ---- stage ----
    s.node('query', 'card', { x: 540, y: 515, w: 960, h: 140, alpha: 0, color: T.mid,
      rows: [{ dy: 48, size: 46, mono: true }, { dy: 104, size: 42, mono: true, hlPad: 18 }],
      r0Text: 'search_incidents', r1Text: 'payments · 09:00–10:00Z', r1Color: T.mid });
    const column = (k, x) => {
      s.node('h' + k, 'label', { x: x - 150, y: 665, text: 'Run ' + k, size: 46, weight: 800, color: T.fg, alpha: 0 });
      s.node('dl' + k, 'label', { x: x + 136, y: 668, text: 'deadline', size: 38, weight: 600, color: T.mid, alpha: 0 });
      s.node('bar' + k, 'deadline', { x: x - 6, y: 735, w: 400, h: 20, alpha: 0 });
      s.node('st' + k, 'label', { x: x, y: 805, text: '', size: 44, weight: 700, color: T.accent, alpha: 0 });
      s.node('card' + k, 'card', { x, y: 1000, w: 460, h: 270, title: 'Tool result', titleSize: 38, titleDy: 42, alpha: 0, color: T.mid,
        rows: [{ dy: 108, size: 42, mono: true }, { dy: 170, size: 42, mono: true }, { dy: 232, size: 42, mono: true }],
        r0Alpha: 0, r1Alpha: 0, r2Alpha: 0 });
    };
    column('A', AX); column('B', BX);
    s.node('trapX', 'tick', { x: BX + 170, y: 908, r: 34, sym: 'x', color: T.bad });
    s.node('noRes', 'label', { x: BX, y: 1020, text: 'no tool result', size: 42, weight: 700, color: T.mid, alpha: 0 });
    s.node('answer', 'card', { x: 540, y: 1395, w: 960, h: 330, title: 'Model answer', titleDy: 44, alpha: 0, color: T.mid,
      rows: [{ dy: 120, size: 42, mono: true, hlPad: 22 }, { dy: 195, size: 42, mono: true, hlPad: 22 }, { dy: 270, size: 42, mono: true, hlPad: 22 }],
      r0Alpha: 0, r1Alpha: 0, r2Alpha: 0 });

    // helpers ----------------------------------------------------------------
    const show = (t, ids, d = 0.4) => ids.forEach((id) => s.set(t, id, 'alpha', 1, d));
    const state = (t, k, txt, col) => { s.set(t, 'st' + k, 'text', txt, 0); s.set(t, 'st' + k, 'color', col, 0); s.set(t, 'st' + k, 'alpha', 1, 0.2); };
    const rowSet = (t, id, i, txt, col, note, gain = 0.9, x = 540) => {
      s.set(t, id, 'r' + i + 'Text', txt, 0); s.set(t, id, 'r' + i + 'Color', col, 0); s.set(t, id, 'r' + i + 'Alpha', 1, 0.3);
      if (note) s.sfx(t, 'store', { note, gain, pan: pan(x) });
    };
    const toAnswer = (t, x, col) => {      // the column's result feeds the answer
      s.packet({ route: [[x, 1142], [x, 1226]], t, dur: 0.6, kind: 'dot', color: col });
      s.sfx(t, 'send', { note: 'C6', gain: 1.2, pan: pan(x) });
    };
    const search = (t, k, x, upTo, dur, note) => {
      state(t, k, 'running', T.accent);
      s.set(t, 'bar' + k, 'fill', upTo, dur, 'linear');
      for (let q = t + 0.2; q < t + dur; q += 0.4) s.sfx(q, 'work', { note, gain: 1.1, pan: pan(x) });
    };

    // ---- beat 1 (0–9): a completed search finds no matches ----
    show(0.5, ['query']); s.sfx(0.5, 'ack', { note: 'C5', gain: 1.3, pan: 0 });
    show(1.2, ['hA', 'dlA', 'barA']); s.sfx(1.2, 'ack', { note: 'E5', gain: 1.3, pan: pan(AX) });
    search(1.8, 'A', AX, 0.55, 2.0, 'E4');
    let t = 3.8;
    s.set(t, 'barA', 'fillColor', T.ok, 0.2);
    state(t, 'A', 'completed', T.ok);
    s.sfx(t, 'ack', { note: 'E5', gain: 1.6, pan: pan(AX) });
    t = 4.6;
    show(t, ['cardA']); s.set(t, 'cardA', 'color', T.fg, 0.3);
    rowSet(5.2, 'cardA', 0, 'status: ok', T.ok, 'G5', 0.9, AX);
    rowSet(5.9, 'cardA', 1, 'items: []', T.fg, 'G5', 0.9, AX);
    s.set(7.0, 'cardA', 'color', T.mid, 0.5);

    // ---- beat 2 (9–16): success with an empty list supports "no matches in that scope" ----
    show(9.0, ['answer']);
    toAnswer(9.6, AX, T.ok);
    rowSet(10.2, 'answer', 0, 'A: no matches in scope', T.ok, null);
    s.sfx(10.2, 'deliver', { note: 'C5', gain: 1.2, pan: 0 });
    t = 11.4;                                 // "in scope" = the query's searched interval
    s.set(t, 'query', 'r1Hl', 1, 0.25); s.set(t, 'query', 'r1HlColor', T.ok, 0); s.set(t, 'query', 'r1Color', T.fg, 0.25);
    s.set(t, 'answer', 'r0Hl', 1, 0.25); s.set(t, 'answer', 'r0HlColor', T.ok, 0);
    s.sfx(t, 'ack', { note: 'C6', gain: 1.4, pan: 0 });
    s.set(13.2, 'query', 'r1Hl', 0, 0.5); s.set(13.2, 'answer', 'r0Hl', 0, 0.5); s.set(13.2, 'query', 'r1Color', T.mid, 0.5);

    // ---- beat 3 (16–28): a backend timeout; returning the same empty list would be a trap ----
    show(16.0, ['hB', 'dlB', 'barB']); s.sfx(16.0, 'ack', { note: 'A4', gain: 1.4, pan: pan(BX) });
    search(16.6, 'B', BX, 1, 3.2, 'A3');
    t = 19.8;                                  // the deadline passes with no completed search
    s.set(t, 'barB', 'fillColor', T.bad, 0.15); s.set(t, 'barB', 'tickColor', T.bad, 0.15); s.set(t, 'barB', 'tickGlow', 1, 0.15);
    s.set(t + 0.6, 'barB', 'tickGlow', 0, 0.6);
    state(t, 'B', 'timed out', T.bad);
    s.shake(t, 'barB', 10, 0.4);
    s.sfx(t, 'thump', { note: 'E3', gain: 1.0, pan: pan(BX) });
    t = 21.6;                                  // trap: the failure is reported as an empty success
    show(t, ['cardB']);
    rowSet(t, 'cardB', 0, 'status: ok', T.mid, 'G4', 0.7, BX);
    rowSet(t + 0.5, 'cardB', 1, 'items: []', T.mid, 'G4', 0.7, BX);
    toAnswer(22.7, BX, T.mid);
    rowSet(23.3, 'answer', 1, 'B: no matches', T.mid, 'C5', 0.7);
    t = 24.2;
    s.set(t, 'trapX', 'pop', 1, 0.35); s.set(t, 'cardB', 'color', T.bad, 0.2);
    s.set(t, 'answer', 'r1Color', T.bad, 0.2); s.set(t, 'answer', 'r1Hl', 1, 0.2); s.set(t, 'answer', 'r1HlColor', T.bad, 0);
    s.sfx(t, 'miss', { note: 'E4', gain: 1.2, pan: pan(BX) });
    t = 26.4;                                  // correct the result: an error, not an empty list
    s.set(t, 'trapX', 'pop', 0, 0.3);
    rowSet(t, 'cardB', 0, 'status: error', T.bad, null);
    rowSet(t, 'cardB', 1, 'code: TIMEOUT', T.bad, null);
    s.sfx(t, 'thump', { note: 'E3', gain: 0.6, pan: pan(BX) });
    rowSet(27.1, 'cardB', 2, 'isError: true', T.bad, null);
    s.sfx(27.1, 'thump', { note: 'G3', gain: 0.6, pan: pan(BX) });
    s.set(26.4, 'answer', 'r1Alpha', 0, 0.4); s.set(26.4, 'answer', 'r1Hl', 0, 0.3);

    // ---- beat 4 (29–36): the model preserves the uncertainty ----
    toAnswer(29.2, BX, T.accent);
    rowSet(29.8, 'answer', 1, 'B: unknown · timed out', T.accent, 'C5');
    s.sfx(29.8, 'ack', { note: 'C6', gain: 1.4, pan: 0 });
    t = 31.0;                                  // the same empty screen, two different conclusions
    s.set(t, 'answer', 'r0Hl', 1, 0.25); s.set(t, 'answer', 'r1Hl', 1, 0.25); s.set(t, 'answer', 'r1HlColor', T.accent, 0);
    s.sfx(t, 'chime', { note: 'C6', gain: 0.9, pan: 0 });
    s.set(33.4, 'answer', 'r0Hl', 0, 0.5); s.set(33.4, 'answer', 'r1Hl', 0, 0.5);

    // ---- beat 5 (36–46): a transport timeout can leave no tool result at all ----
    t = 36.0;
    for (let i = 0; i < 3; i++) s.set(t, 'cardB', 'r' + i + 'Alpha', 0, 0.5);
    s.set(t, 'cardB', 'dashed', 1, 0); s.set(t, 'cardB', 'color', T.dim, 0.4); s.set(t, 'cardB', 'titleColor', T.dim, 0.4);
    s.set(t, 'stB', 'alpha', 0, 0.2); state(t + 0.4, 'B', 'transport timeout', T.bad);
    s.sfx(t, 'clock', { gain: 1.6, pan: pan(BX) }); s.sfx(t + 0.5, 'clock', { gain: 1.6, pan: pan(BX) });
    t = 37.0;
    s.set(t, 'noRes', 'alpha', 1, 0.4);
    s.sfx(t, 'thump', { note: 'E3', gain: 0.6, pan: pan(BX) });
    toAnswer(38.2, BX, T.accent);
    rowSet(38.8, 'answer', 2, 'B: unknown · no result', T.accent, 'C5');
    s.sfx(38.8, 'ack', { note: 'C6', gain: 1.4, pan: 0 });

    // ---- hold three distinct conclusions; then end ----
    s.fade(44.4, 1, 1.2);
    s.meta.duration = 46.0;
  },
});

