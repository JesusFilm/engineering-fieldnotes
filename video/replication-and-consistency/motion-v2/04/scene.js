/* Replication and consistency, lesson 04: "Received is not applied" (motion-v2 cut 04).
 * One mechanism: a hot standby can hold the WAL for R42 -> revision 8 while query-visible state is still 7.
 * Replay, not receipt, advances the visible row; only a query issued after replay can return 8.
 * Receipt only is shown (no flush, no acknowledgement). "R42", 7 and 8 are application values, not LSNs.
 * Times are authored at speed 1; meta.speed 0.85 stretches playback.
 */
FlowVideo.scene({
  meta: { title: 'Received is not applied', titleSize: 80, subtitle: 'POSTGRESQL HOT STANDBY', subtitleSize: 36, duration: 29.5, fps: 30, speed: 0.85 },
  build(s) {
    const T = s.THEME;
    // ---------- geometry ----------
    const CELL = [390, 610, 830], STRIP_Y = 880, CELL_H = 112;
    const ROW_Y = 1180, VAL_X = 830, KEY_X = 330;
    const Q_X = 300, R_X = 880, TERM_TOP = 1380, L1 = 1480, L2 = 1600, RES_X = 700;

    s.node('primary', 'box', { x: 540, y: 560, w: 380, h: 110, label: 'primary', labelSize: 46, color: T.mid });
    s.node('standby', 'corners', { x: 540, y: 1000, w: 940, h: 600, len: 54, lw: 6, color: T.mid });
    s.node('standbyLbl', 'label', { x: 205, y: 748, text: 'standby', size: 44, weight: 600 });
    s.node('walLbl', 'label', { x: 190, y: STRIP_Y, text: 'WAL', size: 44, weight: 700, mono: true });
    s.node('strip', 'strip', { x: 610, y: STRIP_Y, cells: 3, w: 200, h: CELL_H, gap: 20,
      cell0Color: T.dim, cell0Fill: 1, cell0FillColor: '#24644E',
      cell1Color: T.dim, cell1Fill: 1, cell1FillColor: '#2E7F62',
      cell2Color: T.dim, cell2Dashed: 1 });
    s.wire('walRoute', [540, 615], [CELL[2], STRIP_Y - CELL_H / 2 - 6], { via: [[540, 660], [CELL[2], 660]] });
    // the received record, which travels from the primary and stays in the strip
    s.node('rec', 'tag', { x: 540, y: 648, size: 40, color: T.accent, alpha: 0, parts: [{ text: 'R42→8', color: T.fg }] });

    const RX_TIP = STRIP_Y - CELL_H / 2 - 12, AP_TIP = STRIP_Y + CELL_H / 2 + 12;
    s.node('received', 'caret', { x: CELL[1], tipY: RX_TIP, dir: 'down', label: 'received', size: 40, color: T.accent, alpha: 0 });
    s.node('replayed', 'caret', { x: CELL[1], tipY: AP_TIP, dir: 'up', label: 'replayed', size: 40, color: T.ok, alpha: 0 });

    s.node('rowLbl', 'label', { x: 300, y: 1078, text: 'visible row', size: 38, weight: 600 });
    s.node('row', 'box', { x: 580, y: ROW_Y, w: 800, h: 140, label: '', color: T.mid });
    s.node('key', 'mtext', { x: KEY_X, y: ROW_Y, text: 'R42', size: 56, mono: true, color: T.mid });
    s.node('v7', 'mtext', { x: VAL_X, y: ROW_Y, text: '7', size: 100, mono: true, color: T.fg });
    s.node('v8', 'mtext', { x: VAL_X, y: ROW_Y + 40, text: '8', size: 100, mono: true, color: T.ok, alpha: 0 });
    s.node('applyLink', 'arrow', { x1: VAL_X, y1: 1032, x2: VAL_X, y2: 1100, lw: 6, headSize: 22, color: T.ok });

    s.wire('qWire', [Q_X, TERM_TOP], [Q_X, ROW_Y + 72]);
    s.wire('rWire', [R_X, ROW_Y + 72], [R_X, TERM_TOP]);
    s.node('term', 'box', { x: 550, y: 1545, w: 860, h: 330, label: '', color: T.dim });
    s.node('p1', 'prompt', { x: 170, y: L1, text: '', size: 44, color: T.fg });
    s.node('p2', 'prompt', { x: 170, y: L2, text: '', size: 44, color: T.fg });
    s.node('r1', 'mtext', { x: RES_X, y: L1, text: '', size: 76, mono: true, color: T.fg });
    s.node('r2', 'mtext', { x: RES_X, y: L2, text: '', size: 76, mono: true, color: T.ok });
    // query and result chips (tags, so their text stays readable on a phone)
    for (const id of ['qa', 'qb']) s.node(id, 'tag', { x: Q_X, y: TERM_TOP - 30, size: 36, color: T.fg, alpha: 0, parts: [{ text: 'R42?', color: T.fg }] });
    s.node('ra', 'tag', { x: R_X, y: ROW_Y + 100, size: 40, color: T.fg, alpha: 0, parts: [{ text: '7', color: T.fg }] });
    s.node('rb', 'tag', { x: R_X, y: ROW_Y + 100, size: 40, color: T.ok, alpha: 0, parts: [{ text: '8', color: T.ok }] });

    // ---------- helpers ----------
    const pan = (x) => ((x - 540) / 540) * 0.6;
    // move a node with x/y props along a polyline at constant speed
    function travel(id, pts, t0, dur) {
      const seg = []; let tot = 0;
      for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); seg.push(d); tot += d; }
      let t = t0;
      for (let i = 0; i < seg.length; i++) {
        const d = dur * seg[i] / tot;
        s.set(t, id, 'x', pts[i + 1][0], d, seg.length === 1 ? 'inOut' : 'linear');
        s.set(t, id, 'y', pts[i + 1][1], d, seg.length === 1 ? 'inOut' : 'linear');
        t += d;
      }
    }
    // a query: prompt line types, SELECT climbs to the row, the row's current value copies down into the line
    function query(t, line, res, value, color, note, qChip, rChip) {
      s.set(t, line, 'text', 'SELECT revision', 0); s.set(t, line, 'caret', 1, 0);
      s.sfx(t, 'clock', { note: 'A6', gain: 0.5, pan: pan(300) });
      s.set(t + 0.3, qChip, 'alpha', 1, 0.15);
      travel(qChip, [[Q_X, TERM_TOP - 30], [Q_X, ROW_Y + 110]], t + 0.3, 0.7);
      s.set(t + 0.85, qChip, 'alpha', 0, 0.15);
      s.sfx(t + 0.3, 'send', { note: 'A6', gain: 0.6, pan: pan(Q_X) });
      s.pulse(t + 1.0, 'row'); s.set(t + 1.0, 'key', 'color', T.fg, 0.15); s.set(t + 1.6, 'key', 'color', T.mid, 0.4);
      s.ripple(t + 1.0, [Q_X, ROW_Y + 70], T.fg, { r0: 10, r1: 56, dur: 0.5 });
      s.sfx(t + 1.0, 'arrive', { note: 'E5', gain: 0.4, pan: pan(Q_X) });
      s.set(t + 1.4, rChip, 'alpha', 1, 0.15);
      travel(rChip, [[R_X, ROW_Y + 110], [R_X, TERM_TOP - 30]], t + 1.4, 0.7);
      s.set(t + 1.95, rChip, 'alpha', 0, 0.15);
      s.set(t + 2.1, line, 'caret', 0, 0);
      s.set(t + 2.1, res, 'text', value, 0);
      s.set(t + 2.1, res, 'scale', 0.4, 0); s.set(t + 2.1, res, 'scale', 1, 0.35, 'back');
      s.sfx(t + 2.1, 'deliver', { note, gain: 0.55, pan: pan(RES_X) });
    }

    // ---------- beat 1 · 0–3.0: settled start, both positions on the same record ----------
    s.set(0, 'stage', 'veil', 1, 0); s.set(0.05, 'stage', 'veil', 0, 0.6);
    s.set(1.0, 'received', 'alpha', 1, 0.3); s.set(1.0, 'received', 'scale', 1, 0);
    s.sfx(1.0, 'ack', { note: 'C6', gain: 0.8, pan: pan(CELL[1]) });
    s.set(1.4, 'replayed', 'alpha', 1, 0.3);
    s.sfx(1.4, 'ack', { note: 'E6', gain: 0.8, pan: pan(CELL[1]) });

    // ---------- beat 2 · 3.0–8.6: the record arrives; receive position moves, replay does not ----------
    s.pulse(3.0, 'primary'); s.set(3.0, 'primary', 'color', T.fg, 0.15);
    s.set(3.0, 'rec', 'alpha', 1, 0.2);
    s.sfx(3.0, 'send', { note: 'G6', gain: 0.7, pan: pan(540) });
    travel('rec', [[540, 648], [540, 660], [CELL[2], 660], [CELL[2], STRIP_Y]], 3.1, 1.5);
    s.set(3.1, 'wire:walRoute', 'color', T.mid, 0.2);
    s.set(4.6, 'strip', 'cell2Dashed', 0, 0); s.set(4.6, 'strip', 'cell2Color', T.accent, 0.15);
    s.ripple(4.6, [CELL[2], STRIP_Y], T.fg, { r0: 96, r1: 150, dur: 0.6 });
    s.sfx(4.6, 'arrive', { note: 'C5', gain: 0.5, pan: pan(CELL[2]) });
    s.set(4.9, 'wire:walRoute', 'alpha', 0, 0.4);
    s.set(4.9, 'primary', 'color', T.mid, 0.4); s.set(4.9, 'primary', 'alpha', 0.4, 0.5);
    s.set(5.4, 'received', 'x', CELL[2], 0.6, 'out');
    s.sfx(5.4, 'ack', { note: 'C6', gain: 0.8, pan: pan(CELL[2]) });

    // ---------- beat 3 · 8.6–15.4: a query now still returns 7 ----------
    query(8.6, 'p1', 'r1', '7', T.fg, 'C5', 'qa', 'ra');
    // mid-hold: the replay position brightens in place (it has not moved)
    s.set(12.8, 'replayed', 'glow', 1, 0.2); s.set(13.3, 'replayed', 'glow', 0, 0.5);
    s.sfx(12.8, 'work', { note: 'E4', gain: 0.5, pan: pan(CELL[1]) });

    // ---------- beat 4 · 15.4–22.6: replay applies the record; the row becomes 8 ----------
    s.set(15.4, 'strip', 'cell2FillColor', T.accent, 0); s.set(15.4, 'strip', 'cell2Fill', 1, 2.0, 'linear');
    [15.4, 15.9, 16.4, 16.9].forEach((t) => s.sfx(t, 'work', { note: 'E4', gain: 0.55, pan: pan(CELL[2]) }));
    s.set(17.4, 'strip', 'cell2FillColor', T.ok, 0.2); s.set(17.4, 'strip', 'cell2Color', T.ok, 0.2);
    s.set(17.4, 'rec', 'color', T.ok, 0.2);
    s.set(17.5, 'replayed', 'x', CELL[2], 0.6, 'out');
    s.sfx(17.5, 'ack', { note: 'E6', gain: 0.8, pan: pan(CELL[2]) });
    s.set(18.1, 'applyLink', 'progress', 1, 0.4, 'out');
    // sequential replacement: 7 leaves upward, then 8 rises in (never both at once)
    s.set(18.6, 'v7', 'y', ROW_Y - 36, 0.18, 'in'); s.set(18.6, 'v7', 'alpha', 0, 0.18);
    s.set(18.8, 'v8', 'y', ROW_Y, 0.25, 'out'); s.set(18.8, 'v8', 'alpha', 1, 0.2);
    s.set(18.6, 'row', 'color', T.ok, 0.2); s.pulse(18.6, 'row', T.ok);
    s.ripple(18.6, [VAL_X, ROW_Y], T.ok, { r0: 78, r1: 150, dur: 0.7 });
    s.sfx(18.6, 'store', { note: 'E5', gain: 1.0, pan: pan(VAL_X) });
    s.set(19.4, 'applyLink', 'color', T.dim, 0.6);

    // ---------- beat 5 · 22.6–31: a fresh query returns 8; the first answer stays 7 ----------
    s.set(22.6, 'p1', 'color', T.mid, 0.4); s.set(22.6, 'r1', 'color', T.mid, 0.4);
    query(22.6, 'p2', 'r2', '8', T.ok, 'E5', 'qb', 'rb');
    s.fade(28.4, 1, 0.9);
    s.meta.duration = 29.5;
  },
});
