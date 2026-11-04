/* Replication and consistency, lesson 05: "Failover can lose data" (motion-v2 cut 05).
 * One async failure window: the primary acknowledges application revision v8 of R42 while the standby holds v7.
 * The primary fails before shipping v8. The standby is promoted and serves v7; the acknowledged v8 is absent there.
 * Single writer. v6-v8 are application revisions, not WAL positions. Promotion is one stipulated command; no election,
 * detection or synchronous mode is shown. The old primary keeps its last-known v8, dimmed and unreachable.
 * Times are authored at speed 1; meta.speed 0.85 stretches playback.
 */
FlowVideo.scene({
  meta: { title: 'Failover can lose data', titleSize: 84, subtitle: 'ASYNC REPLICATION', subtitleSize: 36, duration: 32.4, fps: 30, speed: 0.85 },
  build(s) {
    const T = s.THEME;
    // ---------- geometry ----------
    const AX = 300, BX = 780;                 // primary column, standby column
    const APP_BOT = 700, HEAD_Y = 890, HEAD_TOP = 835;
    const ROW = { v6: 1060, v7: 1200, v8: 1340 }, CW = 190, CH = 100;
    const LINK_L = AX + CW / 2 + 8, LINK_R = BX - CW / 2 - 8;
    const ACK_Y = 555, READ_Y = 645, FIELD_X = 250;
    const TERM_Y = 1640;
    const pan = (x) => ((x - 540) / 540) * 0.6;

    // app panel: the receipt line and the later read line stay separate
    s.node('app', 'box', { x: 540, y: 590, w: 900, h: 220, label: '', color: T.mid });
    s.node('appLbl', 'label', { x: 158, y: 600, text: 'app', size: 40, weight: 600 });
    s.node('ack', 'field', { x: FIELD_X, y: ACK_Y, key: 'ack', size: 54, keySize: 44, valueX: 150, markX: 470, w: 540, h: 82, value: '' });
    s.node('read', 'field', { x: FIELD_X, y: READ_Y, key: 'read', size: 54, keySize: 44, valueX: 150, markX: 470, w: 540, h: 82, value: '', keyColor: T.dim });
    s.node('neq', 'mtext', { x: 880, y: 600, text: '≠', size: 96, color: T.accent, alpha: 0 });

    // routes from the app to each database, and the selected route caret
    s.wire('wA', [AX, APP_BOT + 4], [AX, HEAD_TOP], { color: T.mid });
    s.wire('wB', [BX, APP_BOT + 4], [BX, HEAD_TOP], { color: T.dim });
    s.node('route', 'caret', { x: AX, tipY: 790, dir: 'down', label: '', color: T.fg });

    // database headers (role in place) and the failure badge
    s.node('hA', 'box', { x: AX, y: HEAD_Y, w: 300, h: 110, label: 'primary', labelSize: 46, color: T.fg });
    s.node('hB', 'box', { x: BX, y: HEAD_Y, w: 300, h: 110, label: 'standby', labelSize: 46, color: T.mid, labelColor: T.mid });
    s.node('xA', 'xmark', { x: AX + 150, y: HEAD_TOP, r: 30 });

    // ship links between matching revision cells (history v6 already shipped)
    const SHIPPED = '#3A9E7A';
    s.wire('s6', [LINK_L, ROW.v6], [LINK_R, ROW.v6], { color: SHIPPED });
    s.wire('s7', [LINK_L, ROW.v7], [LINK_R, ROW.v7], { color: T.dim });
    s.wire('s8', [LINK_L, ROW.v8], [LINK_R, ROW.v8], { color: T.dim });
    s.node('unshipped', 'label', { x: 540, y: ROW.v8 - 52, text: 'unshipped', size: 38, weight: 700, mono: true, plate: true, color: T.accent, alpha: 0 });

    // revision cells
    const cell = (id, x, y, txt, on) => s.node(id, 'slot', { x, y, w: CW, h: CH, size: 56, text: on ? txt : '', dashed: on ? 0 : 1, color: on ? T.mid : T.dim, textColor: on ? T.mid : T.fg });
    cell('a6', AX, ROW.v6, 'v6', true); cell('a7', AX, ROW.v7, 'v7', false); cell('a8', AX, ROW.v8, 'v8', false);
    cell('b6', BX, ROW.v6, 'v6', true); cell('b7', BX, ROW.v7, 'v7', false); cell('b8', BX, ROW.v8, 'v8', false);
    s.node('absent', 'label', { x: BX, y: ROW.v8 + 92, text: 'v8 absent', size: 40, weight: 700, mono: true, color: T.bad, alpha: 0 });

    // operator command line (the one explicit promotion trigger)
    s.node('term', 'box', { x: 540, y: TERM_Y, w: 820, h: 120, label: '', color: T.dim });
    s.node('cmdLine', 'prompt', { x: 175, y: TERM_Y, text: '$', size: 44, color: T.mid });
    s.wire('wCmd', [952, TERM_Y], [BX + 156, HEAD_Y], { via: [[1000, TERM_Y], [1000, HEAD_Y]], color: T.dim });
    s.set(0, 'wire:wCmd', 'alpha', 0, 0);

    // moving chips (tags keep their text readable on a phone)
    const chip = (id, txt, color, size = 40) => s.node(id, 'tag', { x: 0, y: 0, size, color, alpha: 0, parts: [{ text: txt, color }] });
    chip('w7', 'v7', T.fg); chip('k7', 'ack', T.ok); chip('x7', 'v7', T.ok, 36);
    chip('w8', 'v8', T.fg); chip('k8', 'ack', T.ok);
    chip('q', 'R42?', T.fg); chip('r7', 'v7', T.fg);

    // ---------- helpers ----------
    function travel(id, pts, t0, dur) {
      const seg = []; let tot = 0;
      for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); seg.push(d); tot += d; }
      s.set(t0 - 0.001, id, 'x', pts[0][0], 0); s.set(t0 - 0.001, id, 'y', pts[0][1], 0);
      s.set(t0, id, 'alpha', 1, 0.12); s.set(t0 + dur - 0.12, id, 'alpha', 0, 0.12);
      let t = t0;
      for (let i = 0; i < seg.length; i++) {
        const d = dur * seg[i] / tot, e = seg.length === 1 ? 'inOut' : 'linear';
        s.set(t, id, 'x', pts[i + 1][0], d, e); s.set(t, id, 'y', pts[i + 1][1], d, e); t += d;
      }
    }
    const fillCell = (t, id, txt, x, y, note) => {
      s.set(t, id, 'text', txt, 0); s.set(t, id, 'dashed', 0, 0);
      s.set(t, id, 'color', T.fg, 0.1); s.set(t, id, 'textColor', T.fg, 0); s.set(t, id, 'fill', 1, 0.1);
      s.set(t, id, 'glow', 1, 0.1); s.set(t + 0.15, id, 'glow', 0, 0.6);
      s.set(t + 0.9, id, 'fill', 0, 0.6); s.set(t + 0.9, id, 'color', T.mid, 0.6);
      s.ripple(t, [x, y], T.fg, { r0: 104, r1: 150, dur: 0.55 });
      s.sfx(t, 'store', { note, gain: 0.55, pan: pan(x) });
    };
    // app writes revision vN to the primary and gets an acknowledgement back before any shipping
    function writeAck(t, wChip, kChip, cellId, txt) {
      travel(wChip, [[AX, APP_BOT + 34], [AX, HEAD_TOP - 30]], t, 0.7);
      s.sfx(t, 'send', { note: 'A6', gain: 0.32, pan: pan(AX) });
      s.pulse(t + 0.7, 'hA');
      fillCell(t + 0.75, cellId, txt, AX, ROW[txt], 'G5');
      travel(kChip, [[AX, HEAD_TOP - 30], [AX, APP_BOT + 34]], t + 1.3, 0.6);
      const ta = t + 1.9;
      s.set(ta, 'ack', 'value', 'R42 ' + txt, 0);
      s.set(ta, 'ack', 'valueColor', T.fg, 0);
      s.set(ta - 0.001, 'ack', 'mark', 0, 0); s.set(ta, 'ack', 'mark', 1, 0.35, 'linear');
      s.set(ta, 'ack', 'outline', 1, 0.15); s.set(ta, 'ack', 'outlineColor', T.ok, 0);
      s.set(ta, 'ack', 'glow', 1, 0.1); s.set(ta + 0.15, 'ack', 'glow', 0, 0.6);
      s.ripple(ta, [AX, APP_BOT], T.ok, { r0: 12, r1: 60, dur: 0.5 });
      s.sfx(ta, 'deliver', { note: 'A5', gain: 0.5, pan: pan(AX) });
      return ta;
    }

    // ---------- beats ----------
    s.set(0, 'stage', 'veil', 1, 0); s.set(0.05, 'stage', 'veil', 0, 0.6);

    // 1. normal async order: v7 is acknowledged first, shipped afterwards
    const t1 = 1.4;
    const ack7 = writeAck(t1, 'w7', 'k7', 'a7', 'v7');
    const ship7 = ack7 + 0.8;
    travel('x7', [[LINK_L + 40, ROW.v7], [LINK_R - 40, ROW.v7]], ship7, 0.7);
    s.set(ship7, 'wire:s7', 'color', T.ok, 0.3);
    s.sfx(ship7, 'send', { note: 'G6', gain: 0.3, pan: pan(540) });
    fillCell(ship7 + 0.72, 'b7', 'v7', BX, ROW.v7, 'C5');
    s.set(ship7 + 1.4, 'wire:s7', 'color', SHIPPED, 0.6);

    // 2. v8 acknowledged, not shipped: the window opens and stays open
    const t2 = ship7 + 2.6;
    const ack8 = writeAck(t2, 'w8', 'k8', 'a8', 'v8');
    const win = ack8 + 0.9;
    s.set(win, 'unshipped', 'alpha', 1, 0.3);
    s.set(win, 'wire:s8', 'color', T.accent, 0.3); s.set(win, 'wire:s8', 'dashed', 1, 0);
    s.set(win, 'b8', 'color', T.accent, 0.3); s.set(win, 'b8', 'glow', 1, 0.15); s.set(win + 0.2, 'b8', 'glow', 0, 0.6);
    s.sfx(win, 'clock', { note: 'E6', gain: 0.6, pan: pan(BX) });
    const win2 = win + 1.8;
    s.pulse(win2, 'b8'); s.set(win2, 'unshipped', 'color', '#FFC266', 0.12); s.set(win2 + 0.3, 'unshipped', 'color', T.accent, 0.4);
    s.sfx(win2, 'clock', { note: 'E6', gain: 0.5, pan: pan(BX) });

    // 3. the primary fails inside the window; its last-known v8 stays, dimmed and unreachable
    const tc = win2 + 2.0;
    s.set(tc, 'hA', 'color', T.bad, 0); s.set(tc, 'hA', 'label', 'offline', 0); s.set(tc, 'hA', 'labelColor', T.bad, 0);
    s.shake(tc, 'hA', 14, 0.45);
    s.set(tc, 'xA', 'pop', 1, 0.35, 'linear');
    s.ripple(tc, [AX, HEAD_Y], T.bad, { r0: 60, r1: 230, dur: 0.8 });
    s.sfx(tc, 'crash', { gain: 0.75, pan: pan(AX) });
    const tc2 = tc + 0.35;
    for (const w of ['wA', 's6', 's7']) { s.set(tc2, 'wire:' + w, 'color', '#7A2A2D', 0.3); s.set(tc2, 'wire:' + w, 'dashed', 1, 0); }
    s.set(tc2, 'wire:s8', 'color', '#7A2A2D', 0.3);
    for (const c of ['a6', 'a7', 'a8']) { s.set(tc2, c, 'alpha', 0.62, 0.5); s.set(tc2, c, 'color', '#7A2A2D', 0.5); }
    s.set(tc2, 'route', 'color', T.dim, 0.3);

    // 4. the standby is promoted by one command; its cells do not change; the route moves to it
    const tp = tc + 3.9;
    s.set(tp, 'term', 'color', T.mid, 0.25);
    ['$ pro', '$ promote', '$ promote stand', '$ promote standby'].forEach((txt, i) => {
      s.set(tp + 0.1 + i * 0.2, 'cmdLine', 'text', txt, 0);
      s.sfx(tp + 0.1 + i * 0.2, 'work', { note: 'D4', gain: 0.4, pan: pan(300 + i * 80) });
    });
    s.set(tp, 'cmdLine', 'caret', 1, 0); s.set(tp + 0.1, 'cmdLine', 'color', T.fg, 0);
    s.set(tp + 1.0, 'cmdLine', 'caret', 0, 0);
    const tsend = tp + 1.0;
    s.set(tsend, 'wire:wCmd', 'alpha', 1, 0.2);
    s.packet({ route: [[952, TERM_Y], [1000, TERM_Y], [1000, HEAD_Y], [BX + 158, HEAD_Y]], t: tsend, dur: 1.0, kind: 'dot', color: T.fg, ease: 'linear' });
    s.sfx(tsend, 'send', { note: 'D6', gain: 0.35, pan: pan(1000) });
    const tr = tsend + 1.0;
    s.set(tr, 'hB', 'label', 'primary', 0); s.set(tr, 'hB', 'labelColor', T.fg, 0); s.set(tr, 'hB', 'color', T.fg, 0.2);
    s.pulse(tr, 'hB');
    s.sfx(tr, 'arrive', { note: 'C5', gain: 0.5, pan: pan(BX) });
    s.set(tr + 0.5, 'wire:wCmd', 'alpha', 0, 0.5); s.set(tr + 0.5, 'term', 'color', T.dim, 0.5); s.set(tr + 0.5, 'cmdLine', 'color', T.mid, 0.5);
    const tm = tr + 1.1;
    s.set(tm, 'route', 'x', BX, 0.7); s.set(tm, 'route', 'color', T.fg, 0.3);
    s.set(tm + 0.5, 'wire:wB', 'color', T.mid, 0.3);
    s.sfx(tm + 0.7, 'ack', { note: 'C6', gain: 0.5, pan: pan(BX) });

    // 5. the app reads R42 from the new primary and gets v7; the acknowledged v8 is absent here
    const tq = tm + 3.0;
    travel('q', [[BX, APP_BOT + 34], [BX, HEAD_TOP - 30]], tq, 0.7);
    s.sfx(tq, 'send', { note: 'A6', gain: 0.32, pan: pan(BX) });
    s.pulse(tq + 0.7, 'hB');
    s.set(tq + 0.75, 'b7', 'color', T.fg, 0.1); s.set(tq + 0.75, 'b7', 'glow', 1, 0.1); s.set(tq + 0.9, 'b7', 'glow', 0, 0.6); s.set(tq + 1.5, 'b7', 'color', T.mid, 0.5);
    s.sfx(tq + 0.75, 'arrive', { note: 'C5', gain: 0.45, pan: pan(BX) });
    travel('r7', [[BX, HEAD_TOP - 30], [BX, APP_BOT + 34]], tq + 1.2, 0.7);
    const tv = tq + 1.9;
    s.set(tv, 'read', 'value', 'R42 v7', 0); s.set(tv, 'read', 'keyColor', T.mid, 0);
    s.set(tv, 'read', 'outline', 1, 0.15); s.set(tv, 'read', 'outlineColor', T.fg, 0);
    s.set(tv, 'read', 'glow', 1, 0.1); s.set(tv + 0.15, 'read', 'glow', 0, 0.6);
    s.ripple(tv, [BX, APP_BOT], T.fg, { r0: 12, r1: 60, dur: 0.5 });
    s.sfx(tv, 'deliver', { note: 'C5', gain: 0.5, pan: pan(BX) });
    const tx = tv + 1.0;
    s.set(tx, 'b8', 'color', T.bad, 0.2); s.set(tx, 'absent', 'alpha', 1, 0.3);
    s.set(tx, 'b8', 'glow', 1, 0.12); s.set(tx + 0.15, 'b8', 'glow', 0, 0.8);
    s.set(tx, 'neq', 'alpha', 1, 0.2); s.set(tx, 'neq', 'glow', 1, 0.1); s.set(tx + 0.15, 'neq', 'glow', 0, 0.6);
    s.set(tx, 'read', 'outlineColor', T.accent, 0.2); s.set(tx, 'ack', 'outlineColor', T.accent, 0.2);
    s.set(tx + 1.2, 'ack', 'outlineColor', T.ok, 0.5); s.set(tx + 1.2, 'read', 'outlineColor', T.fg, 0.5);
    s.sfx(tx, 'miss', { note: 'E4', gain: 1.0, pan: pan(BX) });

    // finite ending: hold the evidence, then fade (no reset, no catch-up)
    const tf = tx + 3.4;
    s.fade(tf, 1, 0.8);
    s.meta.duration = +(tf + 1.0).toFixed(2);
    s.__beats = { t1, ack7, ship7, t2, ack8, win, win2, tc, tp, tsend, tr, tm, tq, tv, tx, tf };
  },
});

