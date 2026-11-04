/* Make inputs explicit — tool-design motion-v2 cut 02.
 * One mechanism: the tool declares four required input fields. The application checks each arriving call
 * against that declaration before execution, rejects a call missing end_time with an error that names it,
 * and lets only a corrected call that passes the same check start the search.
 * Geometry: the schema and the call side by side, row-aligned, with a check lane between them;
 * a dashed wire to the search stays closed until validation passes; a run counter proves nothing ran.
 * Render from the repository root:
 *   node video/tool-design/motion-v2/02/engine/render.mjs video/tool-design/motion-v2/02/scene.js video/tool-design/motion-v2/02/video.mp4 --sheet video/tool-design/motion-v2/02/scratch/contact-sheet.png
 * The local engine copy adds the general node types 'card' and 'tick', and an optional chip text size.
 */
FlowVideo.scene({
  meta: { title: '', subtitle: '', duration: 44, fps: 30, speed: 1 },
  build(s) {
    const T = s.THEME;
    const LX = 255, RX = 825, CX = 540;            // schema column, call column, check lane
    const ROWS = [980, 1080, 1180, 1280];
    const FIELDS = ['service *', 'start_time *', 'end_time *', 'limit *'];
    const pan = (x) => ((x - 540) / 540) * 0.6;

    // ---- title band ----
    s.node('title', 'label', { x: 540, y: 300, text: 'Make inputs explicit', size: 84, weight: 800, color: T.title });
    s.node('subtitle', 'label', { x: 540, y: 392, text: 'TOOL DESIGN · 2', size: 36, weight: 700, color: T.mid });

    // ---- stage ----
    s.wire('submit', [RX, 620], [RX, 774]);
    s.wire('exec', [CX, 1406], [CX, 1534], { color: T.dim });
    s.set(0, 'wire:submit', 'alpha', 0, 0); s.set(0, 'wire:exec', 'alpha', 0, 0); s.set(0, 'wire:exec', 'dashed', 1, 0);
    s.node('model', 'card', { x: 790, y: 538, w: 460, h: 152, alpha: 0, color: T.mid,
      rows: [{ dy: 46, size: 44, center: true, weight: 700 }, { dy: 108, size: 40, mono: true, center: true }],
      r0Text: 'Model', r1Text: '', r1Color: T.bad });
    s.node('app', 'card', { x: 540, y: 1090, w: 1000, h: 620, title: 'Application', titleDy: 42, alpha: 0, color: T.mid, status: '' });
    s.node('hSchema', 'label', { x: LX, y: 890, text: 'Schema', size: 42, weight: 700, color: T.fg, alpha: 0 });
    s.node('hCall', 'label', { x: RX, y: 890, text: 'Call A', size: 42, weight: 700, color: T.fg, alpha: 0 });
    s.node('legend', 'label', { x: 180, y: 1358, text: '* required', size: 40, weight: 600, color: T.mid, alpha: 0 });
    const cell = (id, x, y, txt, opts = {}) => s.node(id, 'card', Object.assign({ x, y, w: 370, h: 80, pad: 26, radius: 14, alpha: 0, color: T.dim,
      rows: [{ dy: 40, size: 44, mono: true, hlPad: 0 }], r0Text: txt }, opts));
    ROWS.forEach((y, i) => {
      cell('s' + i, LX, y, FIELDS[i]);
      cell('c' + i, RX, y, '');
      s.node('k' + i, 'tick', { x: CX, y, r: 30, sym: 'check' });
      s.node('x' + i, 'tick', { x: CX, y, r: 30, sym: 'x', color: T.bad });
    });
    s.node('search', 'card', { x: 540, y: 1630, w: 640, h: 180, alpha: 0, color: T.dim,
      rows: [{ dy: 62, size: 48, mono: true, center: true }, { dy: 130, size: 42, mono: true, center: true }],
      r0Text: 'search_incidents', r0Color: T.mid, r1Text: 'runs: 0 · not run', r1Color: T.mid });

    // helpers ----------------------------------------------------------------
    const status = (t, txt, col) => { s.set(t, 'app', 'status', txt, 0); s.set(t, 'app', 'statusColor', col, 0); };
    const sendCall = (t, label) => {   // the model submits a call down the wire
      s.set(t, 'wire:submit', 'color', T.fg, 0.2); s.set(t, 'wire:submit', 'flow', 1, 0);
      s.packet({ route: [[RX, 650], [RX, 748]], t, dur: 0.7, kind: 'chip', label, size: 36, color: T.fg });
      s.sfx(t, 'send', { note: 'C6', gain: 1.3, pan: pan(RX) });
      s.set(t + 0.7, 'wire:submit', 'color', T.wire, 0.3); s.set(t + 0.7, 'wire:submit', 'flow', 0, 0);
    };
    const fillCell = (t, i, txt, col = T.fg, note = 'G5') => {
      s.set(t, 'c' + i, 'r0Text', txt, 0); s.set(t, 'c' + i, 'r0Color', col, 0);
      s.set(t, 'c' + i, 'alpha', 1, 0.3); s.set(t, 'c' + i, 'color', T.mid, 0.3); s.set(t, 'c' + i, 'dashed', 0, 0);
      s.sfx(t, 'store', { note, gain: 0.9, pan: pan(RX) });
    };
    const focus = (t, i, on) => {       // outline the schema row and call row being compared
      for (const id of ['s' + i, 'c' + i]) s.set(t, id, 'color', on ? T.accent : T.mid, 0.2);
    };
    const check = (t, i, gain = 1.4) => {
      focus(t, i, true);
      s.set(t + 0.4, 'k' + i, 'pop', 1, 0.35);
      s.sfx(t + 0.4, 'ack', { note: 'E6', gain, pan: 0 });
      focus(t + 0.75, i, false);
    };

    // ---- beat 1 (0–8): four required fields are declared ----
    s.set(0.5, 'model', 'alpha', 1, 0.4); s.set(0.5, 'wire:submit', 'alpha', 1, 0.4);
    s.sfx(0.5, 'ack', { note: 'C5', gain: 1.3, pan: pan(790) });
    s.set(1.1, 'app', 'alpha', 1, 0.4);
    s.sfx(1.1, 'ack', { note: 'E5', gain: 1.3, pan: 0 });
    s.set(1.8, 'hSchema', 'alpha', 1, 0.3);
    ROWS.forEach((_, i) => {
      const t = 2.2 + i * 0.7;
      s.set(t, 's' + i, 'alpha', 1, 0.3); s.set(t, 's' + i, 'color', T.mid, 0.3);
      s.sfx(t, 'store', { note: 'E5', gain: 0.9, pan: pan(LX) });
    });
    s.set(5.0, 'legend', 'alpha', 1, 0.4); s.sfx(5.0, 'ack', { note: 'E5', gain: 1.1, pan: pan(LX) });
    s.set(5.8, 'search', 'alpha', 1, 0.4); s.set(5.8, 'wire:exec', 'alpha', 1, 0.4);
    s.sfx(5.8, 'ack', { note: 'A4', gain: 1.2, pan: 0 });

    // ---- beat 2 (8.5–17): Call A omits end_time; validation finds it ----
    sendCall(8.5, 'Call A');
    s.set(9.2, 'hCall', 'alpha', 1, 0.3); s.sfx(9.2, 'arrive', { note: 'G5', gain: 0.9, pan: pan(RX) });
    fillCell(9.6, 0, 'payments'); fillCell(10.0, 1, '09:00Z'); fillCell(10.4, 3, '20');
    s.set(10.4, 'c2', 'alpha', 1, 0.3); s.set(10.4, 'c2', 'dashed', 1, 0); s.set(10.4, 'c2', 'color', T.dim, 0);   // absent key: empty slot
    status(10.4, 'not checked', T.mid);
    let t = 11.6;
    status(t, 'checking', T.accent); s.set(t, 'app', 'color', T.fg, 0.3);
    s.sfx(t, 'work', { note: 'E4', gain: 1.6, pan: 0 });
    check(12.2, 0); check(13.1, 1);
    t = 14.0;                           // end_time: nothing in the call
    focus(t, 2, true); s.set(t, 'c2', 'color', T.accent, 0.2);
    s.set(t + 0.6, 'x2', 'pop', 1, 0.35);
    s.set(t + 0.6, 's2', 'color', T.bad, 0.2); s.set(t + 0.6, 's2', 'r0Color', T.bad, 0.2); s.set(t + 0.6, 'c2', 'color', T.bad, 0.2);
    s.sfx(t + 0.6, 'miss', { note: 'E4', gain: 1.1, pan: 0 });
    check(15.4, 3, 1.1);
    // hold 16.2–17.5: two checks, a red cross on end_time, one more check

    // ---- beat 3 (17.5–26): reject before execution; return an actionable error ----
    t = 17.5;
    status(t, 'rejected', T.bad); s.set(t, 'app', 'color', T.bad, 0.15); s.set(t, 'hCall', 'color', T.bad, 0.2);
    s.shake(t, 'app', 8, 0.35);
    s.sfx(t, 'thump', { note: 'E3', gain: 0.9, pan: 0 });
    t = 18.6;                           // the search did not run
    s.set(t, 'search', 'r1Hl', 1, 0.2); s.set(t, 'search', 'r1HlColor', T.mid, 0);
    s.set(t + 0.9, 'search', 'r1Hl', 0, 0.5);
    s.sfx(t, 'clock', { gain: 1.6, pan: 0 });
    t = 20.2;                           // error goes back to the caller and names the field
    s.set(t, 'wire:submit', 'color', T.bad, 0.2);
    s.packet({ route: [[RX, 748], [RX, 650]], t, dur: 0.9, kind: 'chip', label: 'missing: end_time', size: 36, color: T.bad });
    s.sfx(t, 'send', { note: 'E6', gain: 1.3, pan: pan(RX) });
    t = 21.1;
    s.set(t, 'wire:submit', 'color', T.wire, 0.3);
    s.set(t, 'model', 'color', T.bad, 0.2); s.set(t + 0.6, 'model', 'color', T.fg, 0.5);
    s.set(t, 'model', 'r1Text', 'missing: end_time', 0);
    s.sfx(t, 'arrive', { note: 'C5', gain: 1.0, pan: pan(790) });
    // hold 21.5–24.4 on the error; then Call A is discarded
    t = 24.4;
    for (let i = 0; i < 4; i++) {
      s.set(t, 'c' + i, 'alpha', 0, 0.5); s.set(t, 'k' + i, 'pop', 0, 0.3); s.set(t, 'x' + i, 'pop', 0, 0.3);
      s.set(t, 's' + i, 'color', T.mid, 0.4); s.set(t, 's' + i, 'r0Color', T.fg, 0.4);
    }
    s.set(t, 'hCall', 'alpha', 0, 0.4); status(t, '', T.mid); s.set(t, 'app', 'color', T.mid, 0.4);

    // ---- beat 4 (25.5–33): Call B adds end_time and is checked again ----
    t = 25.5;
    s.set(t, 'model', 'r1Text', 'add end_time', 0); s.set(t, 'model', 'r1Color', T.accent, 0);
    s.pulse(t, 'model');
    s.sfx(t, 'store', { note: 'C5', gain: 1.0, pan: pan(790) });
    sendCall(26.4, 'Call B');
    s.set(27.1, 'hCall', 'text', 'Call B', 0); s.set(27.1, 'hCall', 'color', T.fg, 0); s.set(27.1, 'hCall', 'alpha', 1, 0.3);
    s.sfx(27.1, 'arrive', { note: 'G5', gain: 0.9, pan: pan(RX) });
    fillCell(27.5, 0, 'payments'); fillCell(27.9, 1, '09:00Z'); fillCell(28.3, 2, '10:00Z', T.accent, 'B5'); fillCell(28.7, 3, '20');
    status(28.7, 'not checked', T.mid);
    t = 30.2;
    status(t, 'checking', T.accent); s.set(t, 'app', 'color', T.fg, 0.3);
    s.sfx(t, 'work', { note: 'E4', gain: 1.6, pan: 0 });
    check(30.8, 0); check(31.6, 1); check(32.4, 2, 1.7); check(33.2, 3);
    t = 34.3;
    status(t, 'valid', T.ok); s.set(t, 'app', 'color', T.ok, 0.25);
    s.sfx(t, 'store', { note: 'E6', gain: 1.0, pan: 0 });

    // ---- beat 5 (35–44): only now does the search run ----
    t = 35.3;
    s.set(t, 'wire:exec', 'dashed', 0, 0); s.set(t, 'wire:exec', 'color', T.accent, 0.3); s.set(t, 'wire:exec', 'flow', 1, 0);
    s.packet({ route: [[CX, 1434], [CX, 1508]], t, dur: 0.8, kind: 'chip', label: 'Call B', size: 36, color: T.accent });
    s.sfx(t, 'send', { note: 'E6', gain: 1.3, pan: 0 });
    t = 36.1;
    s.set(t, 'wire:exec', 'flow', 0, 0); s.set(t, 'wire:exec', 'color', T.mid, 0.5);
    s.set(t, 'search', 'color', T.accent, 0.2); s.set(t, 'search', 'glow', 0.7, 0.2); s.set(t + 0.6, 'search', 'glow', 0.25, 0.6);
    s.set(t, 'search', 'r0Color', T.fg, 0.2);
    s.set(t, 'search', 'r1Text', 'runs: 1 · running', 0); s.set(t, 'search', 'r1Color', T.accent, 0);
    s.set(t, 'app', 'color', T.mid, 0.5);
    s.sfx(t, 'arrive', { note: 'A4', gain: 1.1, pan: 0 });
    for (let k = 0; k < 4; k++) s.sfx(36.6 + k * 0.35, 'work', { note: 'G3', gain: 1.1, pan: 0 });

    // ---- hold the corrected, validated call and the single run; then end ----
    s.fade(42.4, 1, 1.2);
    s.meta.duration = 44.0;
  },
});

