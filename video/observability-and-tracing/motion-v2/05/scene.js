/* Missing and sensitive data — observability-and-tracing motion-v2 cut 05.
 * One mechanism: a trace view shows only what passed the collection path. An attribute policy keeps approved
 * fields, so span A's fake secret is removed while span A itself is exported. Separately, span B's export fails,
 * so the view has A and not B, although B ran and was recorded locally.
 * Render from the repository root:
 *   node video/observability-and-tracing/motion-v2/05/engine/render.mjs video/observability-and-tracing/motion-v2/05/scene.js video/observability-and-tracing/motion-v2/05/video.mp4 --sheet video/observability-and-tracing/motion-v2/05/scratch/contact-sheet.png
 * Uses the cut-local engine copy (record with top anchor and row collapse, frame, box sublabel size, label align, chip size).
 */
FlowVideo.scene({
  meta: { title: '', subtitle: '', duration: 42, fps: 30, speed: 1 },
  build(s) {
    const T = s.THEME, XA = 230, XB = 850;

    // ---- title ----
    s.node('t1', 'label', { x: 540, y: 290, text: 'Missing and', size: 84, weight: 800, color: T.title });
    s.node('t2', 'label', { x: 540, y: 384, text: 'sensitive data', size: 84, weight: 800, color: T.title });

    // ---- band names (centred between the two columns) ----
    s.node('bRun', 'label', { x: 540, y: 470, text: 'runtime', size: 40, weight: 600, color: T.mid });
    s.node('bExp', 'label', { x: 540, y: 960, text: 'export path', size: 40, weight: 600, color: T.mid });

    // ---- column paths (behind the boxes) ----
    s.wire('pathA', [XA, 914], [XA, 1405]);
    s.wire('pathB', [XB, 856], [XB, 1300]);
    s.wire('pathB2', [XB, 1320], [XB, 1405]);
    s.wire('askB', [1052, 560], [876, 1310], { via: [[1066, 560], [1066, 1310]] });
    s.set(0, 'wire:askB', 'alpha', 0, 0); s.set(0, 'wire:askB', 'dashed', 1, 0);

    // ---- runtime: operations and their local span records ----
    s.node('opA', 'box', { x: XA, y: 560, w: 400, h: 100, label: 'A · run_tests', labelSize: 40, sublabel: 'idle', subSize: 36, color: T.mid });
    s.node('opB', 'box', { x: XB, y: 560, w: 400, h: 100, label: 'B · report', labelSize: 40, sublabel: 'idle', subSize: 36, color: T.mid });
    const card = (id, x, keys, title) => s.node(id, 'record', { x, top: 650, w: 410, head: 72, rowH: 58, keys, title, valX: 176, keyX: 22, size: 38, titleSize: 40, alpha: 0, color: T.mid });
    card('cardA', XA, ['name', 'status', 'token'], 'span A');
    card('cardB', XB, ['name', 'status'], 'span B');

    // ---- export path ----
    s.node('policy', 'box', { x: 540, y: 1060, w: 960, h: 120, label: 'attribute policy', labelSize: 40, sublabel: 'keep: name, status', subSize: 36, subMono: true, color: T.mid });
    s.node('exporter', 'box', { x: 540, y: 1230, w: 960, h: 90, label: 'exporter', labelSize: 40, color: T.mid });
    s.node('failLab', 'label', { x: XB, y: 1362, text: 'export failed', size: 40, weight: 700, mono: true, color: T.bad, alpha: 0 });

    // ---- trace view ----
    s.node('view', 'frame', { x: 540, y: 1590, w: 960, h: 360, color: T.mid });
    s.node('vTitle', 'label', { x: 540, y: 1452, text: 'trace view', size: 40, weight: 600, color: T.fg });
    s.node('vCount', 'label', { x: 980, y: 1452, text: '0 spans', size: 40, weight: 700, mono: true, align: 'right', color: T.mid });
    s.node('viewA', 'record', { x: XA + 64, top: 1495, w: 410, head: 72, rowH: 58, keys: ['name', 'status'], title: 'span A', valX: 176, keyX: 22, size: 38, titleSize: 40, alpha: 0, color: T.ok,
      r0Val: 'run_tests', r1Val: 'ok' });

    const pan = (x) => ((x - 540) / 540) * 0.6;
    const hl = (t, id, row, hold = 0.9, color) => {
      if (color) s.set(t, id, 'r' + row + 'ValColor', color, 0.1);
      s.set(t, id, 'r' + row + 'Hl', 1, 0.15); s.set(t + hold, id, 'r' + row + 'Hl', 0, 0.5);
    };
    const fill = (t, id, row, val, color) => {
      s.set(t, id, 'r' + row + 'Val', val, 0); s.set(t, id, 'r' + row + 'ValColor', color, 0);
      s.set(t, id, 'r' + row + 'Alpha', 1, 0.25); hl(t, id, row, 0.7);
    };
    const work = (t, op, x, low, note, done) => {
      s.set(t, op, 'sublabel', 'running', 0); s.set(t, op, 'subColor', T.accent, 0); s.set(t, op, 'color', T.fg, 0.2);
      for (let k = 0; k < 3; k++) s.sfx(t + k * 0.4, 'work', { note: low, gain: 1.2, pan: pan(x) });
      s.set(done, op, 'sublabel', 'ran ✓', 0); s.set(done, op, 'subColor', T.ok, 0); s.set(done, op, 'color', T.mid, 0.4);
      s.pulse(done, op); s.sfx(done, 'ack', { note, gain: 1.3, pan: pan(x) });
    };

    // ---- beat 1: both operations run and are recorded; A recorded a secret ----
    work(1.4, 'opA', XA, 'C4', 'C5', 2.6);
    s.set(2.8, 'cardA', 'alpha', 1, 0.3);
    [['run_tests', T.fg], ['ok', T.fg], ['FAKE-9f2c', T.accent]].forEach(([v, c], i) => {
      fill(2.8 + i * 0.6, 'cardA', i, v, c); s.sfx(2.8 + i * 0.6, 'store', { note: 'C5', gain: 1.0, pan: pan(XA) });
    });
    work(4.4, 'opB', XB, 'G4', 'G5', 5.6);
    s.set(5.8, 'cardB', 'alpha', 1, 0.3);
    [['report', T.fg], ['ok', T.fg]].forEach(([v, c], i) => {
      fill(5.8 + i * 0.6, 'cardB', i, v, c); s.sfx(5.8 + i * 0.6, 'store', { note: 'G5', gain: 1.0, pan: pan(XB) });
    });
    hl(7.4, 'cardA', 2, 1.2);                                   // a secret value was recorded
    s.sfx(7.4, 'miss', { gain: 0.8, pan: pan(XA) });
    s.pulse(8.4, 'policy', T.fg, 0.6);                           // only approved fields may leave
    s.sfx(8.4, 'ack', { note: 'E5', gain: 1.3, pan: 0 });

    // ---- beat 2: the policy removes the token row; span A itself is kept and exported ----
    let t = 10.2;
    s.pulse(t, 'policy', T.accent, 0.5); hl(t, 'cardA', 2, 0.5);
    s.sfx(t, 'arrive', { note: 'E5', gain: 1.0, pan: pan(XA) });
    t = 10.9;                                                   // the whole row goes, key and value
    s.set(t, 'cardA', 'r2Alpha', 0, 0.4); s.set(t, 'cardA', 'r2KeyAlpha', 0, 0.4);
    s.set(t + 0.3, 'cardA', 'cut', 1, 0.5);
    s.sfx(t, 'poof', { gain: 1.0, pan: pan(XA) });
    t = 11.9;
    hl(t, 'cardA', 0, 0.8, T.fg); hl(t, 'cardA', 1, 0.8, T.fg); s.pulse(t, 'cardA', T.fg, 0.5);
    s.sfx(t, 'ack', { note: 'E5', gain: 1.1, pan: pan(XA) });
    // A travels the path: policy (no change now), exporter, trace view
    t = 13.0;
    s.set(t, 'wire:pathA', 'color', T.fg, 0.2); s.set(t, 'wire:pathA', 'flow', 1, 0);
    s.packet({ route: [[XA, 900], [XA, 1440]], t, dur: 2.7, ease: 'linear', kind: 'chip', label: 'span A', size: 38, color: T.fg, fade: 0.35 });
    s.sfx(t, 'send', { note: 'C6', gain: 1.0, pan: pan(XA) });
    s.pulse(t + 0.8, 'policy', T.fg, 0.4); s.sfx(t + 0.8, 'ack', { note: 'E5', gain: 0.9, pan: pan(XA) });
    s.pulse(t + 1.65, 'exporter', T.fg, 0.4); s.sfx(t + 1.65, 'send', { note: 'D6', gain: 1.1, pan: pan(XA) });
    t = 15.7;                                                   // received without the token
    s.set(t, 'wire:pathA', 'color', T.ok, 0.3); s.set(t, 'wire:pathA', 'flow', 0, 0);
    s.set(t, 'viewA', 'alpha', 1, 0.3); s.pulse(t, 'viewA');
    s.set(t, 'vCount', 'text', '1 span', 0); s.set(t, 'vCount', 'color', T.ok, 0.2);
    s.sfx(t, 'arrive', { note: 'A5', gain: 1.1, pan: pan(XA) });
    for (const [i, tt] of [[0, 16.1], [1, 16.6]]) { s.set(tt, 'viewA', 'r' + i + 'Alpha', 1, 0.25); hl(tt, 'viewA', i, 0.6); s.sfx(tt, 'store', { note: 'A5', gain: 0.9, pan: pan(XA) }); }

    // ---- beat 3: separately, span B's export fails ----
    t = 21.0;
    s.set(t, 'wire:pathB', 'color', T.fg, 0.2); s.set(t, 'wire:pathB', 'flow', 1, 0);
    s.packet({ route: [[XB, 900], [XB, 1300]], t, dur: 2.0, ease: 'linear', kind: 'chip', label: 'span B', size: 38, color: T.fg, fade: 0.2 });
    s.sfx(t, 'send', { note: 'G6', gain: 1.0, pan: pan(XB) });
    s.pulse(t + 0.8, 'policy', T.fg, 0.4); s.sfx(t + 0.8, 'ack', { note: 'E5', gain: 0.9, pan: pan(XB) });   // nothing to remove
    s.pulse(t + 1.65, 'exporter', T.fg, 0.4); s.sfx(t + 1.65, 'send', { note: 'D6', gain: 1.1, pan: pan(XB) });
    t = 23.0;                                                   // delivery fails before the view
    s.ripple(t, [XB, 1310], T.bad, { r0: 14, r1: 80, dur: 0.8, mark: 'x' });
    s.ripple(t + 0.8, [XB, 1310], T.bad, { r0: 14, r1: 16, dur: 30, mark: 'x' });   // the × stays
    s.shake(t, 'exporter', 8, 0.4);
    s.set(t, 'wire:pathB', 'color', T.bad, 0.2); s.set(t, 'wire:pathB', 'flow', 0, 0); s.set(t, 'wire:pathB', 'dashed', 1, 0);
    s.set(t, 'wire:pathB2', 'alpha', 0, 0.4);
    s.sfx(t, 'thump', { gain: 1.1, pan: pan(XB) });
    t = 23.7;
    s.set(t, 'failLab', 'alpha', 1, 0.3);
    t = 24.6;                                                   // the view still has one span
    s.pulse(t, 'vCount', T.fg, 0.5); s.pulse(t, 'view', T.fg, 0.5);
    s.sfx(t, 'ack', { note: 'A5', gain: 0.9, pan: 0 });

    // ---- beat 4: B ran, but the trace view cannot show it ----
    t = 30.0;
    s.pulse(t, 'opB', T.ok, 0.6);
    s.sfx(t, 'ack', { note: 'G5', gain: 1.3, pan: pan(XB) });
    t = 30.8;
    s.pulse(t, 'cardB', T.fg, 0.6); hl(t, 'cardB', 0, 0.8); hl(t, 'cardB', 1, 0.8);
    s.sfx(t, 'store', { note: 'G5', gain: 0.9, pan: pan(XB) });
    t = 31.8;                                                   // ran, then export failed: absent from the view
    s.set(t, 'wire:askB', 'alpha', 1, 0.5); s.set(t, 'wire:askB', 'color', T.mid, 0);
    s.pulse(t + 0.5, 'failLab', T.fg, 0.5);
    s.sfx(t, 'ack', { note: 'C4', gain: 1.1, pan: pan(XB) });
    t = 33.4;                                                   // what the view has: the kept part of A
    s.pulse(t, 'viewA'); hl(t, 'viewA', 0, 0.8); hl(t, 'viewA', 1, 0.8); s.pulse(t, 'vCount', T.fg, 0.5);
    s.sfx(t, 'ack', { note: 'A5', gain: 1.2, pan: pan(XA) });

    // ---- hold, then end ----
    s.fade(40.0, 1, 1.0);
    s.meta.duration = 42.0;
  },
});

