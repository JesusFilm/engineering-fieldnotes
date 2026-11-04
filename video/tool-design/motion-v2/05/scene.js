/* Expose more pages — tool-design motion-v2 cut 05.
 * One mechanism: a result limit bounds one page. When more matches exist, the response carries an opaque
 * continuation cursor and is visibly partial. The model copies that exact cursor into the next request with the
 * same scope and limit; a response without a next cursor marks the query complete, so paging stops.
 * Geometry: the model's request card on top, the backend's matches as a row of cells under a sliding page frame,
 * the response card, and a collected panel. The cursor chip travels the left gutter from response to request.
 * Render from the repository root:
 *   node video/tool-design/motion-v2/05/engine/render.mjs video/tool-design/motion-v2/05/scene.js video/tool-design/motion-v2/05/video.mp4 --sheet video/tool-design/motion-v2/05/scratch/contact-sheet.png
 * The local engine copy adds 'card' and 'tick' (copied from cut 02), a 'frame' node, and an optional chip text size.
 */
FlowVideo.scene({
  meta: { title: '', subtitle: '', duration: 40, fps: 30, speed: 1 },
  build(s) {
    const T = s.THEME;
    const CX = 560, CW = 860;                          // card centre x and width (x 130–990), gutter at x 60
    const CELLX = [270, 560, 850], CELLY = 935;
    const pan = (x) => ((x - 540) / 540) * 0.6;

    // ---- title band ----
    s.node('title', 'label', { x: 540, y: 290, text: 'Expose more pages', size: 84, weight: 800, color: T.title });
    s.node('subtitle', 'label', { x: 540, y: 378, text: 'TOOL DESIGN · 5', size: 36, weight: 700, color: T.mid });

    // ---- stage ----
    s.node('req', 'card', { x: CX, y: 590, w: CW, h: 320, title: 'Model request', titleDy: 44, alpha: 0, color: T.mid, status: '', statusSize: 40,
      rows: [100, 160, 220, 280].map((dy) => ({ dy, size: 44, mono: true, hlPad: 16 })),
      r0Text: 'search_incidents', r1Text: 'payments · 09:00–10:00Z', r1Color: T.mid, r2Text: 'limit: 2', r2Color: T.mid,
      r3Text: 'cursor: (none)', r3Color: T.mid });
    s.node('backend', 'label', { x: 840, y: 816, text: 'Backend matches', size: 40, weight: 600, color: T.mid, alpha: 0 });
    CELLX.forEach((x, i) => s.node('cell' + i, 'card', { x, y: CELLY, w: 260, h: 100, pad: 20, radius: 16, alpha: 0, color: T.dim,
      rows: [{ dy: 50, size: 44, mono: true, center: true }], r0Text: '' }));
    s.node('frame', 'frame', { x: 415, y: CELLY, h: 136, alpha: 0, fx: 415, fw: 584, tag: 'page 1', tagDy: 44 });
    s.node('resp', 'card', { x: CX, y: 1200, w: CW, h: 220, title: 'Response', titleDy: 44, alpha: 0, color: T.mid, status: '', statusSize: 40,
      rows: [{ dy: 112, size: 44, mono: true }, { dy: 178, size: 44, mono: true }], r0Alpha: 0, r1Alpha: 0 });
    s.node('coll', 'card', { x: CX, y: 1515, w: CW, h: 240, title: 'Collected', titleDy: 44, alpha: 0, color: T.mid, status: '', statusSize: 40,
      rows: [{ dy: 115, size: 44, mono: true }, { dy: 185, size: 44, mono: true }], r0Alpha: 0, r1Alpha: 0 });

    const status = (t, id, txt, col) => { s.set(t, id, 'status', txt, 0); s.set(t, id, 'statusColor', col, 0); };
    const row = (t, id, i, txt, col, note, gain = 0.9, x = CX) => {
      s.set(t, id, 'r' + i + 'Text', txt, 0); s.set(t, id, 'r' + i + 'Color', col, 0); s.set(t, id, 'r' + i + 'Alpha', 1, 0.3);
      if (note) s.sfx(t, 'store', { note, gain, pan: pan(x) });
    };
    const drop = (t, y0, y1, col, note) => {  // a short hand-off down the centre
      s.packet({ route: [[CX, y0], [CX, y1]], t, dur: 0.5, kind: 'dot', color: col });
      s.sfx(t, 'send', { note, gain: 1.2, pan: 0 });
    };
    const reveal = (t, i, id, note) => {
      s.set(t, 'cell' + i, 'r0Text', id, 0); s.set(t, 'cell' + i, 'color', T.accent, 0.2); s.set(t, 'cell' + i, 'r0Color', T.fg, 0);
      s.sfx(t, 'ack', { note, gain: 1.4, pan: pan(CELLX[i]) });
    };

    // ---- beat 1 (0–7.5): the search is limited to one page ----
    s.set(0.5, 'req', 'alpha', 1, 0.4); s.set(0.5, 'req', 'color', T.fg, 0.3);
    s.sfx(0.5, 'arrive', { note: 'C5', gain: 0.8, pan: 0 });
    s.set(1.4, 'backend', 'alpha', 1, 0.4);
    CELLX.forEach((x, i) => { s.set(1.6 + i * 0.25, 'cell' + i, 'alpha', 1, 0.3); s.sfx(1.6 + i * 0.25, 'store', { note: 'E5', gain: 0.6, pan: pan(x) }); });
    s.set(2.8, 'req', 'r2Hl', 1, 0.25); s.set(2.8, 'req', 'r2Color', T.accent, 0.25);
    s.sfx(2.8, 'ack', { note: 'C6', gain: 1.4, pan: 0 });
    drop(3.8, 752, 878, T.fg, 'C6');
    let t = 4.4;                           // the application runs the search; one page is covered
    s.set(t, 'frame', 'alpha', 1, 0.3);
    reveal(t + 0.2, 0, 'INC-42', 'E5'); reveal(t + 0.6, 1, 'INC-57', 'G#5');
    s.set(5.4, 'req', 'r2Hl', 0, 0.4); s.set(5.4, 'req', 'color', T.mid, 0.5);

    // ---- beat 2 (7.5–15.5): the page returns with a cursor; coverage is partial ----
    drop(7.5, 1004, 1086, T.accent, 'E6');
    s.set(8.0, 'resp', 'alpha', 1, 0.3); s.set(8.0, 'resp', 'color', T.fg, 0.3);
    row(8.0, 'resp', 0, 'items: INC-42, INC-57', T.fg, 'G5');
    row(8.8, 'resp', 1, 'next_cursor: k7Q', T.accent, 'G5');
    s.sfx(8.8, 'ack', { note: 'C6', gain: 1.3, pan: 0 });
    status(9.6, 'resp', 'page 1 · partial', T.accent); s.sfx(9.6, 'ack', { note: 'C4', gain: 1.5, pan: 0.4 });
    drop(10.6, 1314, 1392, T.fg, 'E6');
    s.set(11.1, 'coll', 'alpha', 1, 0.3);
    row(11.1, 'coll', 0, 'p1  INC-42  INC-57', T.fg, 'A5');
    status(11.6, 'coll', 'partial', T.accent);
    s.set(12.2, 'resp', 'color', T.mid, 0.5);

    // ---- beat 3 (15.5–25): the model follows the cursor with the same scope ----
    t = 15.5;
    status(t, 'req', 'need more · budget ok', T.accent); s.set(t, 'req', 'color', T.fg, 0.3);
    s.sfx(t, 'ack', { note: 'C5', gain: 1.4, pan: 0.4 });
    t = 16.8;                              // copy the exact token into the next request
    s.set(t, 'req', 'r3Text', 'cursor:', 0);
    s.set(t, 'resp', 'r1Hl', 1, 0.2); s.set(t, 'resp', 'r1HlColor', T.accent, 0); s.set(t + 0.8, 'resp', 'r1Hl', 0, 0.5);
    s.packet({ route: [[553, 1352], [60, 1352], [60, 765], [435, 765], [435, 712]], t, dur: 2.4, kind: 'chip', label: 'k7Q', size: 40, color: T.accent, ease: 'inOut' });
    s.sfx(t, 'send', { note: 'G6', gain: 1.2, pan: -0.5 });
    t = 19.2;
    s.set(t, 'req', 'r3Text', 'cursor: k7Q', 0); s.set(t, 'req', 'r3Color', T.accent, 0);
    s.sfx(t, 'arrive', { note: 'C5', gain: 1.0, pan: 0 });
    t = 20.2;                              // same scope and limit
    for (const i of [1, 2]) { s.set(t, 'req', 'r' + i + 'Hl', 1, 0.25); s.set(t, 'req', 'r' + i + 'HlColor', T.fg, 0); s.set(t + 1.4, 'req', 'r' + i + 'Hl', 0, 0.5); }
    s.set(t, 'req', 'r2Color', T.mid, 0.3);
    s.sfx(t, 'ack', { note: 'C6', gain: 1.2, pan: 0 }); s.sfx(t + 0.3, 'ack', { note: 'C6', gain: 1.0, pan: 0 });
    t = 22.2;                              // request page 2
    for (let i = 0; i < 2; i++) s.set(t, 'resp', 'r' + i + 'Alpha', 0, 0.4);
    status(t, 'resp', '', T.mid);
    drop(t, 752, 878, T.fg, 'C6');
    t = 22.8;
    s.set(t, 'frame', 'fx', CELLX[2], 0.8); s.set(t, 'frame', 'fw', 300, 0.8); s.set(t, 'frame', 'tag', 'page 2', 0);
    s.sfx(t, 'clock', { gain: 1.5, pan: 0.3 });
    for (const i of [0, 1]) { s.set(t + 0.2, 'cell' + i, 'color', T.ok, 0.4); }
    reveal(23.7, 2, 'INC-63', 'B5');

    // ---- beat 4 (25.5–40): page 2 has no next cursor; the query is complete ----
    drop(25.5, 1004, 1086, T.accent, 'E6');
    s.set(26.0, 'resp', 'color', T.fg, 0.3);
    row(26.0, 'resp', 0, 'items: INC-63', T.fg, 'G5');
    row(26.8, 'resp', 1, 'next_cursor: (none)', T.fg, 'G5');
    t = 27.8;
    s.set(t, 'resp', 'r1Hl', 1, 0.25); s.set(t, 'resp', 'r1HlColor', T.ok, 0);
    status(t, 'resp', 'page 2 · complete', T.ok);
    s.sfx(t, 'hit', { note: 'G5', gain: 0.9, pan: 0 });
    drop(28.8, 1314, 1392, T.fg, 'E6');
    row(29.3, 'coll', 1, 'p2  INC-63', T.fg, 'A5');
    t = 30.0;
    status(t, 'coll', 'complete', T.ok); s.set(t, 'coll', 'color', T.ok, 0.25);
    s.set(t, 'cell2', 'color', T.ok, 0.4); s.set(t, 'frame', 'color', T.ok, 0.3); s.set(t + 0.6, 'frame', 'alpha', 0.4, 0.6);
    s.sfx(t, 'chime', { note: 'C6', gain: 1.0, pan: 0 });
    t = 31.0;
    status(t, 'req', 'stop paging', T.ok); s.set(t, 'req', 'color', T.mid, 0.4);
    s.sfx(t, 'deliver', { note: 'C6', gain: 0.8, pan: 0 });
    s.set(31.6, 'resp', 'r1Hl', 0, 0.6); s.set(31.6, 'resp', 'color', T.mid, 0.6);

    // ---- hold the complete collection; then end ----
    s.fade(38.2, 1, 1.2);
    s.set(38.2, 'req', 'alpha', 0, 1.2);   // its top edge sits above the stage veil
    s.meta.duration = 40.0;
  },
});

