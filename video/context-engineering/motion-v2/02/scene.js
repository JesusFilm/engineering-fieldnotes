/* Context engineering, lesson 02: Retrieve relevant evidence.
 * Mechanism: search returns nearby candidates. Inspecting each one against the task decides relevance:
 * the endpoint and the approved v1 contract constrain this change, so their excerpts are supplied with
 * their source; a v2 draft matches the search but would mislead this v1 change, so it stays out.
 * Authored and played at speed 1. Local engine: ./engine (sheet, trace, accordion).
 */
FlowVideo.scene({
  meta: { title: 'Context engineering', subtitle: 'RETRIEVE RELEVANT EVIDENCE', duration: 45, fps: 30, speed: 1 },
  build(s) {
    const T = s.THEME, X = 540;

    // ---------- stage ----------
    s.node('task', 'sheet', { x: X, y: 530, w: 960, h: 140, headH: 66, title: 'task', titleSize: 38, alpha: 0,
      items: [{ dx: 24, dy: 74, w: 912, h: 58, size: 46 }] });
    s.node('res', 'accordion', { x: X, y: 974, w: 960, h: 700, rows: 3, rowH: 92, openH: 288, title: 'search: invoice', titleMono: true, alpha: 0 });
    s.node('input', 'sheet', { x: X, y: 1580, w: 960, h: 460, headH: 72, title: 'model input', alpha: 0,
      items: [
        { dx: 24, dy: 84, w: 912, h: 52, size: 40 }, { dx: 24, dy: 140, w: 912, h: 52, size: 44 }, { dx: 24, dy: 196, w: 912, h: 52, size: 44 },
        { dx: 24, dy: 274, w: 912, h: 52, size: 40 }, { dx: 24, dy: 330, w: 912, h: 52, size: 44 }, { dx: 24, dy: 386, w: 912, h: 52, size: 44 },
      ] });
    // Supply paths: from a selected result's right end, down the right gutter, into its input record.
    const rowY = [764, 870, 976];
    s.node('copy0', 'trace', { x: 0, y: 0, points: [[1004, rowY[0]], [1050, rowY[0]], [1050, 1516], [1026, 1516]], arrow: true, prog: 0 });
    s.node('copy1', 'trace', { x: 0, y: 0, points: [[1004, rowY[1]], [1050, rowY[1]], [1050, 1706], [1026, 1706]], arrow: true, prog: 0 });

    // Pitches: application/selection C5, search results G5, endpoint file G4, contract E4, draft D4, input records C5/E5.
    const R = (t, i, k, v, d = 0) => s.set(t, 'res', 'r' + i + k, v, d);
    const status = (t, id, txt, col) => { s.set(t, id, 'status', txt, 0); s.set(t, id, 'statusColor', col || T.mid, 0); };

    // Inspect one result: focus, expand, reveal two lines, decide. Returns the decision time.
    const inspect = (t, i, note, d) => {
      R(t, i, 'FocusColor', T.fg); R(t, i, 'Focus', 1, 0.25); s.sfx(t, 'send', { note: 'C6', gain: 0.7 });
      R(t + 0.6, i, 'Open', 0); R(t + 0.6, i, 'Open', 1, 0.7);
      s.sfx(t + 1.3, 'arrive', { note });
      R(t + 2.0, i, 'L0K', 1, 0.35); s.sfx(t + 2.0, 'ack', { note, gain: 0.6 });
      R(t + 2.8, i, 'L1K', 1, 0.35); s.sfx(t + 2.8, 'ack', { note, gain: 0.6 });
      return t + d;
    };
    const collapse = (t, i) => { R(t, i, 'Open', 0, 0.6); R(t, i, 'Focus', 0, 0.5); };

    // ---------- Beat 1: the task, and what search returns ----------
    s.set(0.4, 'task', 'alpha', 1, 0.5);
    s.set(0.4, 'task', 'titleColor', T.mid, 0);
    s.set(0.8, 'task', 'r0Text', 'fix invoice latency', 0); s.set(0.8, 'task', 'r0Alpha', 0, 0); s.set(0.8, 'task', 'r0Alpha', 1, 0.3);
    s.set(0.8, 'task', 'r0Line', T.bg, 0);
    s.sfx(0.8, 'ack', { note: 'C5', gain: 0.6 });

    s.set(1.8, 'res', 'alpha', 1, 0.5); status(1.8, 'res', '0 selected');
    s.sfx(1.8, 'send', { note: 'G6', gain: 0.6 });
    const files = [['src/invoice.py', 'route · v1'], ['api/v1.md', 'approved · v1'], ['notes/v2.md', 'draft · v2']];
    files.forEach(([f, m], i) => {
      const t = 2.6 + i * 0.6;
      R(0, i, 'Alpha', 0); R(t, i, 'File', f); R(t, i, 'Meta', m); R(t, i, 'Alpha', 1, 0.3);
      s.sfx(t, 'arrive', { note: 'G5', gain: 0.45 });
    });
    const recs = [
      ['src/invoice.py · a17 · L12–13', 'GET /v1/invoice', 'returns total_cents'],
      ['api/v1.md · a17 · L8–9', 'v1 response:', 'keep total_cents'],
    ];
    s.set(4.6, 'input', 'alpha', 1, 0.5); status(4.6, 'input', '0 records');
    for (let i = 0; i < 6; i++) s.set(4.6, 'input', 'r' + i + 'Slot', 1, 0);
    s.sfx(4.6, 'ack', { note: 'C5', gain: 0.45 });
    // The task decides relevance: the task strip lights once before inspection starts.
    s.set(6.2, 'task', 'r0HlColor', T.fg, 0); s.set(6.2, 'task', 'r0Hl', 1, 0.2); s.set(7.4, 'task', 'r0Hl', 0, 0.4);
    s.sfx(6.2, 'ack', { note: 'C5', gain: 0.6 });

    // ---------- Beat 2: inspect the endpoint and the v1 contract; select both ----------
    R(0, 0, 'Loc', 'rev a17 · lines 12–13'); R(0, 0, 'N0', '12'); R(0, 0, 'L0', 'GET /v1/invoice'); R(0, 0, 'N1', '13'); R(0, 0, 'L1', 'returns total_cents');
    R(0, 0, 'Dec', 'relevant · the route to change');
    const d0 = inspect(8.6, 0, 'G4', 4.4);
    R(d0, 0, 'DecK', 1, 0.3); R(d0, 0, 'DecColor', T.fg); s.sfx(d0, 'ack', { note: 'C5', gain: 0.7 });
    R(d0 + 0.8, 0, 'Check', 1, 0.35); status(d0 + 0.8, 'res', '1 selected', T.accent); s.sfx(d0 + 0.8, 'store', { note: 'C5', gain: 0.8 });
    collapse(d0 + 1.8, 0);

    R(0, 1, 'Loc', 'rev a17 · lines 8–9'); R(0, 1, 'N0', '8'); R(0, 1, 'L0', 'v1 response:'); R(0, 1, 'N1', '9'); R(0, 1, 'L1', 'keep total_cents');
    R(0, 1, 'Dec', 'relevant · approved v1 rule');
    const t1 = d0 + 3.4;
    const d1 = inspect(t1, 1, 'E4', 4.4);
    // Authority and version: the approved v1 metadata is underlined before the decision.
    R(t1 + 3.6, 1, 'MetaColor', T.fg, 0.2); R(t1 + 3.6, 1, 'Under', 1, 0.4); s.sfx(t1 + 3.6, 'ack', { note: 'E5', gain: 0.7 });
    R(d1 + 0.4, 1, 'DecK', 1, 0.3); s.sfx(d1 + 0.4, 'ack', { note: 'C5', gain: 0.7 });
    R(d1 + 1.2, 1, 'Check', 1, 0.35); status(d1 + 1.2, 'res', '2 selected', T.accent); s.sfx(d1 + 1.2, 'store', { note: 'C5', gain: 0.8 });
    collapse(d1 + 2.2, 1); R(d1 + 2.2, 1, 'Under', 0, 0.4); R(d1 + 2.2, 1, 'MetaColor', T.mid, 0.4);

    // ---------- Beat 3: supply the two excerpts, each with its source ----------
    const sp = d1 + 4.4;
    [0, 1].forEach((k) => {
      const t = sp + k * 2.4, base = k * 3;
      R(t, k, 'FocusColor', T.accent); R(t, k, 'Focus', 1, 0.2); R(t + 1.4, k, 'Focus', 0, 0.4);
      s.set(t, 'copy' + k, 'prog', 1, 0.9); s.sfx(t, 'send', { note: 'C6', gain: 0.6, pan: 0.5 });
      const ti = t + 0.9;
      recs[k].forEach((txt, j) => {
        const id = 'r' + (base + j), tj = ti + j * 0.12;
        s.set(tj, 'input', id + 'Slot', 0, 0.2);
        s.set(tj, 'input', id + 'Text', txt, 0);
        s.set(tj, 'input', id + 'Color', j === 0 ? T.mid : T.fg, 0);
        s.set(tj, 'input', id + 'Line', T.bg, 0);
        s.set(tj, 'input', id + 'Alpha', 0, 0); s.set(tj, 'input', id + 'Alpha', 1, 0.3);
        if (j > 0) s.set(tj, 'input', id + 'Mark', 1, 0.3);
      });
      status(ti, 'input', k === 0 ? '1 record' : '2 records', k === 0 ? T.mid : T.ok);
      s.sfx(ti, 'store', { note: k === 0 ? 'C5' : 'E5', gain: 0.9, pan: 0.3 });
      s.set(t + 1.6, 'copy' + k, 'alpha', 0, 0.4);
    });
    // Where each record came from: both source lines light together.
    const src = sp + 5.4;
    for (const id of [0, 3]) { s.set(src, 'input', 'r' + id + 'Color', T.fg, 0.2); s.set(src + 1.6, 'input', 'r' + id + 'Color', T.mid, 0.5); }
    s.set(src, 'input', 'r0HlColor', T.fg, 0); s.set(src, 'input', 'r3HlColor', T.fg, 0);
    s.set(src, 'input', 'r0Hl', 1, 0.2); s.set(src, 'input', 'r3Hl', 1, 0.2); s.set(src + 1.4, 'input', 'r0Hl', 0, 0.4); s.set(src + 1.4, 'input', 'r3Hl', 0, 0.4);
    s.sfx(src, 'ack', { note: 'E5', gain: 0.7 });

    // ---------- Beat 4: a nearby match that would mislead; leave it out ----------
    R(0, 2, 'Loc', 'rev a17 · lines 4–5'); R(0, 2, 'N0', '4'); R(0, 2, 'L0', 'v2 response:'); R(0, 2, 'N1', '5'); R(0, 2, 'L1', 'rename to amount');
    R(0, 2, 'Dec', 'draft for v2 · not this change'); R(0, 2, 'DecColor', T.mid);
    const t2 = src + 3.4;
    const d2 = inspect(t2, 2, 'D4', 4.6);
    // It conflicts with the supplied v1 rule.
    R(t2 + 3.8, 2, 'L1HlColor', T.accent); R(t2 + 3.8, 2, 'L1Hl', 1, 0.2);
    s.set(t2 + 3.8, 'input', 'r5HlColor', T.accent, 0); s.set(t2 + 3.8, 'input', 'r5Hl', 1, 0.2);
    s.sfx(t2 + 3.8, 'ack', { note: 'D4', gain: 0.7 }); s.sfx(t2 + 4.0, 'ack', { note: 'E5', gain: 0.7 });
    R(d2, 2, 'MetaColor', T.fg, 0.2); R(d2, 2, 'Under', 1, 0.4); s.sfx(d2, 'ack', { note: 'C4', gain: 0.8 });
    R(d2 + 0.8, 2, 'DecK', 1, 0.3); s.sfx(d2 + 0.8, 'ack', { note: 'C4', gain: 0.6 });
    const off = d2 + 3.2;
    R(off, 2, 'L1Hl', 0, 0.3); s.set(off, 'input', 'r5Hl', 0, 0.3);
    collapse(off, 2); R(off, 2, 'Under', 0, 0.4); R(off, 2, 'MetaColor', T.mid, 0.4);
    s.sfx(off, 'poof', { gain: 0.3 });
    // The input stays at the two records that constrain the change.
    s.pulse(off + 1.0, 'input', T.ok); s.sfx(off + 1.0, 'arrive', { note: 'E5' });
    const end = off + 6.4;
    s.fade(end, 1, 1.2);
    s.meta.duration = end + 1.8;
  },
});
