// Orchestration patterns, lesson 03: Independent parallel work (motion-v2/03).
// One mechanism: two read-only reviews of different concerns consume the same frozen snapshot and need nothing from
// each other, so they overlap in time; each report keeps the snapshot id.
// Render from the repository root:
//   node video/orchestration-patterns/motion-v2/03/engine/render.mjs video/orchestration-patterns/motion-v2/03/scene.js video/orchestration-patterns/motion-v2/03/video.mp4
FlowVideo.scene({
  meta: { title: 'Independent parallel work', subtitle: 'ORCHESTRATION · 3', titleSize: 72, titleY: 300, subtitleSize: 40, subtitleY: 385, duration: 43, fps: 30, speed: 1 },
  build(s) {
    const T = s.THEME, BLUE = T.info, AMB = T.accent;
    const at = (id) => (t, prop, v, dur = 0, ease) => s.set(t, id, prop, v, dur, ease);
    const S = at('snap'), C = at('compat'), M = at('migr'), K = at('coord');

    // ---------- frozen snapshot: two files ----------
    const fileRow = (y) => ({ x: 24, y, w: 832, h: 60, size: 44 });
    s.node('snap', 'panel', { x: 540, y: 590, w: 880, h: 250, headY: 56, title: 'Snapshot S7', titleSize: 46, titleColor: T.mid, tagSize: 38, rows: [fileRow(130), fileRow(200)] });
    S(0, 'row0Text', 'api/clients.ts'); S(0, 'row1Text', 'migrations/014.sql');
    for (const i of [0, 1]) { S(0, 'row' + i + 'Alpha', 0); S(0.6, 'row' + i + 'Alpha', 1, 0.4); }

    // ---------- two review lanes ----------
    // lane: header, check row, status/report row, then the activity trace near the bottom edge (clear of the text)
    const LH = 280, laneRows = [{ x: 24, y: 112, w: 832, h: 56, size: 44, mono: false }, { x: 24, y: 172, w: 832, h: 56, size: 44 }];
    const lanes = {
      compat: { y: 920, title: 'Compatibility', check: 'Check: existing clients', color: BLUE, note: 'E5', low: 'E4', hi: 'E6', bar: 'barC', report: 'Report C · S7', end: 22.0, side: 'L' },
      migr: { y: 1225, title: 'Migration', check: 'Check: existing rows', color: AMB, note: 'G5', low: 'G4', hi: 'G6', bar: 'barM', report: 'Report M · S7', end: 26.0, side: 'R' },
    };
    for (const id in lanes) {
      const L = lanes[id], f = at(id);
      s.node(id, 'panel', { x: 540, y: L.y, w: 880, h: LH, headY: 52, title: L.title, titleSize: 46, titleColor: T.mid, tagSize: 38, rows: laneRows });
      f(0, 'row0Slot', 1); f(0, 'row1Slot', 1);
      s.node(L.bar, 'bar', { x: 540, y: L.y + 106, w: 830, h: 14, segments: 1 });
      s.set(0, L.bar, 'seg0Color', L.color, 0);
    }

    // ---------- coordinator receipt ----------
    s.node('coord', 'panel', { x: 540, y: 1595, w: 880, h: 270, headY: 56, title: 'For coordinator', titleSize: 46, titleColor: T.mid, rows: [fileRow(130), fileRow(200)] });
    K(0, 'row0Slot', 1); K(0, 'row1Slot', 1);

    s.node('overlap', 'label', { x: 540, y: 1413, text: 'overlapping work', size: 44, weight: 600, color: T.mid, alpha: 0 });
    // one shared "now": the same x on both traces
    const X0 = 125, X1 = 955, T0 = 11.0, RATE = 0.05; // fraction of the strip per second (illustrative)
    const xAt = (t) => X0 + (X1 - X0) * RATE * (t - T0);
    s.node('now', 'cursor', { x: X0, ys: [lanes.compat.y + 106, lanes.migr.y + 106], hh: 17, alpha: 0 });

    // ---------- connectors: snapshot -> lane (inputs) and lane -> coordinator (reports), in the side gutters ----------
    const GL = 58, GR = 1022;
    const inCy = 920 - LH / 2 + 52, inMy = 1225 - LH / 2 + 52, outCy = 920 - LH / 2 + 172, outMy = 1225 - LH / 2 + 172;
    s.wire('inC', [96, 595], [96, inCy], { via: [[GL, 595], [GL, inCy]], arrow: true, color: T.dim, width: 5 });
    s.wire('inM', [984, 665], [984, inMy], { via: [[GR, 665], [GR, inMy]], arrow: true, color: T.dim, width: 5 });
    s.wire('outC', [96, outCy], [96, 1590], { via: [[GL, outCy], [GL, 1590]], arrow: true, color: BLUE, width: 5, alpha: 0 });
    s.wire('outM', [984, outMy], [984, 1660], { via: [[GR, outMy], [GR, 1660]], arrow: true, color: AMB, width: 5, alpha: 0 });
    for (const w of ['inC', 'inM']) { s.set(0, 'wire:' + w, 'alpha', 0, 0); s.set(0, 'wire:' + w, 'dashed', 1, 0); }
    for (const w of ['outC', 'outM']) { s.set(0, 'wire:' + w, 'alpha', 0, 0); s.set(0, 'wire:' + w, 'solid', 1, 0); }

    const pan = (side) => (side === 'L' ? -0.45 : 0.45);

    // ---------- beat 1 (0-7): freeze one snapshot ----------
    s.sfx(0.6, 'store', { note: 'C4', gain: 0.9, pan: 0 });
    S(2.0, 'color', T.fg, 0.3); S(2.0, 'titleColor', T.fg, 0.3); S(2.0, 'tag', 'READ ONLY'); S(2.0, 'tagColor', T.fg); S(2.0, 'tagK', 0); S(2.0, 'tagK', 1, 0.35);
    s.pulse(2.0, 'snap', T.fg); s.sfx(2.0, 'ack', { note: 'C5', gain: 1.5, pan: 0 });

    // ---------- beat 2 (7-11): assign two different reviews at once; both receive S7 ----------
    for (const id in lanes) {
      const L = lanes[id], f = at(id), d = L.side === 'L' ? 0 : 0.06;
      f(7.0, 'titleColor', T.fg, 0.3); f(7.0, 'color', L.color, 0.3);
      f(7.0, 'row0Slot', 0, 0.3); f(7.0, 'row0Text', L.check); f(7.0, 'row0Reveal', 0); f(7.0, 'row0Reveal', 1, 0.7, 'linear');
      s.sfx(7.0 + d, 'arrive', { note: L.note, gain: 0.8, pan: pan(L.side) });
    }
    s.set(8.4, 'wire:inC', 'alpha', 1, 0.3); s.set(8.4, 'wire:inM', 'alpha', 1, 0.3);
    s.set(8.4, 'wire:inC', 'color', T.fg, 0.3); s.set(8.4, 'wire:inM', 'color', T.fg, 0.3);
    s.packet({ route: [[96, 595], [GL, 595], [GL, inCy], [96, inCy]], t: 8.6, dur: 1.2, kind: 'chip', label: 'S7', color: T.fg, size: 34 });
    s.packet({ route: [[984, 665], [GR, 665], [GR, inMy], [984, inMy]], t: 8.6, dur: 1.2, kind: 'chip', label: 'S7', color: T.fg, size: 34 });
    s.sfx(8.6, 'send', { note: 'C6', gain: 1.4, pan: -0.4 }); s.sfx(8.64, 'send', { note: 'C6', gain: 1.4, pan: 0.4 });
    for (const id in lanes) {
      const L = lanes[id], f = at(id), d = L.side === 'L' ? 0 : 0.06;
      f(9.8, 'tag', 'S7'); f(9.8, 'tagColor', T.fg); f(9.8, 'tagK', 0); f(9.8, 'tagK', 1, 0.35);
      s.sfx(9.8 + d, 'arrive', { note: L.note, pan: pan(L.side) });
    }

    // ---------- beat 3 (11-26): both read S7 at the same time; neither writes; they finish independently ----------
    S(10.6, 'row0Hl', 1, 0.3); S(10.6, 'row0HlColor', BLUE); S(10.6, 'row1Hl', 1, 0.3); S(10.6, 'row1HlColor', AMB);
    for (const id in lanes) {
      const L = lanes[id], f = at(id);
      f(10.6, 'row1Slot', 0, 0.3); f(10.6, 'row1Text', 'reading'); f(10.6, 'row1Color', T.mid);
      s.set(T0, L.bar, 'seg0', RATE * (L.end - T0), L.end - T0, 'linear');
    }
    s.set(T0 - 0.4, 'now', 'alpha', 1, 0.3); s.set(T0, 'now', 'px', xAt(26.0), 26.0 - T0, 'linear');
    s.sfx(T0, 'work', { note: 'E4', pan: -0.45 }); s.sfx(T0 + 0.06, 'work', { note: 'G4', pan: 0.45 });
    // each review touches only its own file; the other trace keeps growing
    s.pulse(13.5, 'compat', BLUE); S(13.5, 'row0Hl', 0.4, 0.15); S(13.75, 'row0Hl', 1, 0.3); s.sfx(13.5, 'work', { note: 'E4', gain: 1.2, pan: -0.45 });
    s.pulse(15.5, 'migr', AMB); S(15.5, 'row1Hl', 0.4, 0.15); S(15.75, 'row1Hl', 1, 0.3); s.sfx(15.5, 'work', { note: 'G4', gain: 1.2, pan: 0.45 });
    s.set(17.5, 'overlap', 'alpha', 1, 0.4); s.set(17.5, 'overlap', 'color', T.fg, 0.4);
    s.sfx(17.5, 'ack', { note: 'E5', gain: 1.2, pan: -0.3 }); s.sfx(17.56, 'ack', { note: 'G5', gain: 1.2, pan: 0.3 });
    // read-only: the snapshot stays the same while both read it
    s.pulse(19.5, 'snap', T.fg); S(19.5, 'tagColor', T.fg); s.sfx(19.5, 'ack', { note: 'C5', gain: 1.2, pan: 0 });
    for (const id in lanes) {
      const L = lanes[id], f = at(id), e = L.end;
      s.mark(e, L.bar, RATE * (e - T0), L.color);
      f(e, 'row1Text', L.report); f(e, 'row1Color', L.color); f(e, 'row1Reveal', 0); f(e, 'row1Reveal', 1, 0.5, 'linear');
      f(e, 'color', T.fg, 0.3); s.pulse(e, id, L.color);
      S(e + 0.2, 'row' + (L.side === 'L' ? 0 : 1) + 'Hl', 0, 0.5);
      s.set(e + 0.2, 'wire:in' + (L.side === 'L' ? 'C' : 'M'), 'color', T.dim, 0.5);
      s.sfx(e, 'deliver', { note: L.note, pan: pan(L.side) });
    }
    s.set(26.3, 'now', 'alpha', 0, 0.4);
    s.set(27.5, 'overlap', 'alpha', 0, 0.5);

    // ---------- beat 4 (29-43): both reports, each tied to S7, become available to the coordinator ----------
    [['compat', 29.5, 'outC', [[96, outCy], [GL, outCy], [GL, 1590], [96, 1590]], 0], ['migr', 31.5, 'outM', [[984, outMy], [GR, outMy], [GR, 1660], [984, 1660]], 1]].forEach(([id, t, w, route, row]) => {
      const L = lanes[id];
      s.set(t, 'wire:' + w, 'alpha', 1, 0.3);
      s.packet({ route, t: t + 0.3, dur: 1.2, kind: 'chip', label: L.side === 'L' ? 'C' : 'M', color: L.color, size: 34 });
      s.sfx(t + 0.3, 'send', { note: L.hi, gain: 1.4, pan: pan(L.side) });
      const ta = t + 1.5;
      K(ta, 'row' + row + 'Slot', 0, 0.3); K(ta, 'row' + row + 'Text', L.report); K(ta, 'row' + row + 'Color', L.color); K(ta, 'row' + row + 'Reveal', 0); K(ta, 'row' + row + 'Reveal', 1, 0.5, 'linear');
      s.ripple(ta, [L.side === 'L' ? 100 : 980, row ? 1660 : 1590], L.color, { r1: 30, dur: 0.45 });
      s.sfx(ta, 'arrive', { note: 'A5', pan: pan(L.side) * 0.5 });
    });
    K(31.0, 'titleColor', T.fg, 0.3);
    // the same id everywhere: snapshot, both lane tags, both receipts
    const tie = 35.0;
    s.pulse(tie, 'snap', T.fg); s.pulse(tie, 'compat', BLUE); s.pulse(tie, 'migr', AMB); s.pulse(tie, 'coord', T.fg);
    s.sfx(tie, 'ack', { note: 'C5', gain: 1.5, pan: 0 });
    s.fade(40.6, 1, 1.4);
  },
});
