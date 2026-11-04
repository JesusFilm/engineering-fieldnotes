/* Related spans form a trace — observability-and-tracing motion-v2 cut 02.
 * One mechanism: each child span copies the trace ID from its parent, mints its own span ID, and records
 * its parent's span ID. A trace view groups spans by the shared trace ID and nests them by parent ID.
 * The model call and the tool call are siblings under the agent task, not a chain.
 * Render from the repository root:
 *   node video/observability-and-tracing/motion-v2/02/engine/render.mjs video/observability-and-tracing/motion-v2/02/scene.js video/observability-and-tracing/motion-v2/02/video.mp4 --sheet video/observability-and-tracing/motion-v2/02/scratch/contact-sheet.png
 * Uses the cut-local engine copy, which adds general record and frame node types, label align and chip size.
 */
FlowVideo.scene({
  meta: { title: '', subtitle: '', duration: 43, fps: 30, speed: 1 },
  build(s) {
    const T = s.THEME, TRACE = T.info, KEYS = ['trace', 'span', 'parent'];

    // ---- title ----
    s.node('t1', 'label', { x: 540, y: 290, text: 'Related spans', size: 84, weight: 800, color: T.title });
    s.node('t2', 'label', { x: 540, y: 384, text: 'form a trace', size: 84, weight: 800, color: T.title });

    // ---- parent links (declared before cards so cards sit on top; tool first so the lit model link draws over the shared trunk) ----
    const link = (cx) => [[540, 864], [cx, 1001], { via: [[540, 930], [cx, 930]] }];
    { const [a, b, o] = link(795); s.wire('pTool', a, b, o); }
    { const [a, b, o] = link(285); s.wire('pModel', a, b, o); }
    for (const w of ['pTool', 'pModel']) s.set(0, 'wire:' + w, 'alpha', 0, 0);

    // ---- span records ----
    const card = (id, x, y, w, title) => s.node(id, 'record', { x, y, w, rowH: 70, keys: KEYS, title, status: 'running', statusColor: T.accent, valX: 200, alpha: 0, color: T.mid });
    card('agent', 540, 705, 520, 'agent task');
    card('model', 285, 1160, 470, 'model call');
    card('tool', 795, 1160, 470, 'tool call');
    const rowY = { agent: [681, 751, 821], model: [1136, 1206, 1276], tool: [1136, 1206, 1276] };
    const valX = { agent: 280 + 200, model: 50 + 200, tool: 560 + 200 };

    // ---- trace view (empty until the spans have ended) ----
    s.node('tv', 'frame', { x: 540, y: 1590, w: 920, h: 400, color: T.dim });
    s.node('tvTitle', 'label', { x: 110, y: 1446, text: 'trace view', size: 40, weight: 600, align: 'left', color: T.mid });
    s.node('tvTrace', 'label', { x: 970, y: 1446, text: 'trace 4bf9', size: 40, weight: 700, mono: true, align: 'right', color: TRACE, alpha: 0 });
    s.wire('brT', [130, 1562], [172, 1695], { via: [[130, 1695]] });
    s.wire('brM', [130, 1562], [172, 1615], { via: [[130, 1615]] });
    for (const w of ['brT', 'brM']) s.set(0, 'wire:' + w, 'alpha', 0, 0);
    const tvRow = (id, x, y, name, sid) => {
      s.node(id + 'N', 'label', { x, y, text: name, size: 40, weight: 700, mono: true, align: 'left', color: T.fg, alpha: 0 });
      s.node(id + 'I', 'label', { x: 970, y, text: sid, size: 40, weight: 700, mono: true, align: 'right', color: T.fg, alpha: 0 });
    };
    tvRow('tvA', 110, 1530, 'agent task', 'a1');
    tvRow('tvM', 190, 1615, 'model call', 'b2');
    tvRow('tvT', 190, 1695, 'tool call', 'c3');

    // ---- helpers ----
    const pan = (id) => s.panOf(id);
    const hl = (t, id, row, hold = 0.9) => { s.set(t, id, 'r' + row + 'Hl', 1, 0.15); s.set(t + hold, id, 'r' + row + 'Hl', 0, 0.5); };
    const fill = (t, id, row, val, color) => {
      s.set(t, id, 'r' + row + 'Val', val, 0); s.set(t, id, 'r' + row + 'ValColor', color, 0);
      s.set(t, id, 'r' + row + 'Alpha', 1, 0.25); hl(t, id, row);
    };
    const appear = (t, id, note) => {
      s.set(t, id, 'alpha', 1, 0.35); s.set(t, id, 'color', T.fg, 0.2); s.pulse(t, id);
      s.sfx(t, 'send', { note, gain: 1.2, pan: pan(id) });
    };
    // A new value created in this record (trace for the root, span IDs for everyone).
    const mint = (t, id, row, val, color, preset, note) => {
      fill(t, id, row, val, color);
      s.ripple(t, [valX[id] + 40, rowY[id][row]], color, { r0: 14, r1: 70, dur: 0.7 });
      s.sfx(t, preset, { note, gain: 1.2, pan: pan(id) });
    };
    // Copy a value from the agent record down the parent link into a child record.
    const copy = (t, child, fromRow, toRow, val, color, sendNote, landPreset, landNote) => {
      const cx = child === 'model' ? 285 : 795, wire = child === 'model' ? 'pModel' : 'pTool';
      hl(t, 'agent', fromRow, 0.8);
      s.set(t, 'wire:' + wire, 'alpha', 1, 0.2);
      s.packet({ route: [[540, 892], [540, 930], [cx, 930], [cx, 966]], t: t + 0.1, dur: 0.9, kind: 'chip', label: val, size: 40, color, fade: 0.15 });
      s.sfx(t + 0.1, 'send', { note: sendNote, gain: 1.1, pan: pan('agent') });
      fill(t + 1.0, child, toRow, val, color);
      s.sfx(t + 1.0, landPreset, { note: landNote, gain: 1.3, pan: pan(child) });
      return t + 1.0;
    };
    const end = (t, id, note) => {
      s.set(t, id, 'status', 'ended', 0); s.set(t, id, 'statusColor', T.mid, 0); s.set(t, id, 'color', T.mid, 0.4);
      s.sfx(t, 'ack', { note, gain: 1.3, pan: pan(id) });
    };

    // ---- beat 1: the agent task starts trace 4bf9 ----
    appear(1.0, 'agent', 'C6');
    mint(2.2, 'agent', 0, '4bf9', TRACE, 'chime', 'A5');     // a new trace begins
    mint(3.2, 'agent', 1, 'a1', T.fg, 'store', 'C5');        // its own span ID
    fill(4.2, 'agent', 2, '—', T.mid);                       // the root has no parent
    s.sfx(4.2, 'ack', { note: 'C4', gain: 1.4, pan: pan('agent') });

    // ---- beat 2: the model call: copied trace, new span ID, parent a1 ----
    appear(8.0, 'model', 'E6');
    copy(8.8, 'model', 0, 0, '4bf9', TRACE, 'A6', 'store', 'A5');
    mint(10.8, 'model', 1, 'b2', T.fg, 'store', 'E5');
    let t = copy(11.8, 'model', 1, 2, 'a1', T.fg, 'C6', 'ack', 'C5');
    s.set(t, 'wire:pModel', 'color', T.fg, 0.25);
    hl(t, 'agent', 1, 1.2);                                   // the parent value points at the agent's span ID
    end(14.8, 'model', 'E4');

    // ---- beat 3: the tool call: same trace, another new span ID, the same parent ----
    appear(18.0, 'tool', 'G6');
    copy(18.8, 'tool', 0, 0, '4bf9', TRACE, 'A6', 'store', 'A5');
    mint(20.8, 'tool', 1, 'c3', T.fg, 'store', 'G5');
    t = copy(21.8, 'tool', 1, 2, 'a1', T.fg, 'C6', 'ack', 'C5');
    s.set(t, 'wire:pTool', 'color', T.fg, 0.25);
    hl(t, 'agent', 1, 1.2);
    end(24.6, 'tool', 'G4');
    end(25.6, 'agent', 'C4');

    // ---- beat 4: the trace view groups by trace ID and nests by parent ID ----
    t = 28.5;                                                 // group: every record carrying 4bf9
    s.set(t, 'tv', 'color', TRACE, 0.3); s.pulse(t, 'tv');
    s.set(t, 'tvTitle', 'color', T.fg, 0.3);
    s.set(t, 'tvTrace', 'alpha', 1, 0.3);
    for (const id of ['agent', 'model', 'tool']) hl(t, id, 0, 1.1);
    s.sfx(t, 'ack', { note: 'A5', gain: 1.5, pan: 0 });
    const addRow = (tt, card, row, note, branch) => {
      s.pulse(tt, card, T.fg);
      s.set(tt, row + 'N', 'alpha', 1, 0.3); s.set(tt, row + 'I', 'alpha', 1, 0.3);
      if (branch) { s.set(tt, 'wire:' + branch, 'alpha', 1, 0.3); s.set(tt, 'wire:' + branch, 'color', T.fg, 0.3); }
      s.sfx(tt, 'arrive', { note, gain: 1.0, pan: pan(card) });
    };
    addRow(29.7, 'agent', 'tvA', 'C5');
    addRow(30.7, 'model', 'tvM', 'E5', 'brM');
    addRow(31.7, 'tool', 'tvT', 'G5', 'brT');

    // distinct span IDs, one at a time
    [['agent', 'tvA', 'C5', 33.4], ['model', 'tvM', 'E5', 34.1], ['tool', 'tvT', 'G5', 34.8]].forEach(([card, row, note, tt]) => {
      hl(tt, card, 1, 0.6);
      s.set(tt, row + 'I', 'scale', 1.25, 0.12); s.set(tt + 0.3, row + 'I', 'scale', 1, 0.3);
      s.set(tt, row + 'I', 'color', T.title, 0.12); s.set(tt + 0.5, row + 'I', 'color', T.fg, 0.3);
      s.sfx(tt, 'ack', { note, gain: 1.3, pan: pan(card) });
    });

    // parent links become the tree's nesting
    t = 36.2;
    for (const w of ['pModel', 'pTool', 'brM', 'brT']) { s.set(t, 'wire:' + w, 'color', T.title, 0.15); s.set(t + 0.9, 'wire:' + w, 'color', T.fg, 0.5); }
    hl(t, 'model', 2, 0.9); hl(t, 'tool', 2, 0.9); hl(t, 'agent', 1, 0.9);
    s.sfx(t, 'deliver', { note: 'C5', gain: 1.2, pan: 0 });

    // ---- hold the finished trace, then end ----
    s.fade(40.6, 1, 1.0);
    s.meta.duration = 42.6;
  },
});

