// Replication and consistency, lesson 02: "A replica can lag" (motion-v2).
// One mechanism: with asynchronous replication the primary saves and acknowledges v8 while the replica
// still holds v7, so a later read routed to the replica succeeds and returns v7. The save is not undone.
// Geometry: a sequence trace. primary | app | replica lifelines; every message leaves a persistent chip.
// Times are authored at speed 1.
FlowVideo.scene({
  meta: { title: 'A replica can lag', titleSize: 96, subtitle: 'ASYNC REPLICATION', subtitleSize: 40, duration: 38, fps: 30, speed: 1 },
  build(s) {
    const T = s.THEME;
    const PX = 170, AX = 540, RX = 910;           // lifeline x
    const CARD_Y = 635, LIFE_TOP = 782, LIFE_BOT = 1560;
    const ROW = { save: 916, ack: 1036, read: 1256, reply: 1376 };
    const CHIP = 48, CHIP_UP = 56;                // chip text size; chip centre sits this far above its arrow
    const chipHalf = (str) => (str.length * 0.61 * CHIP + CHIP) / 2;

    // ---------- stage ----------
    const card = (id, x, title, l0, l1, l0opts) => s.node(id, 'card', {
      x, y: CARD_Y, w: 280, h: 270, title, titleSize: 48, alpha: 0,
      lines: [Object.assign({ y: 142, size: 50, mono: true, text: l0 }, l0opts || {}), { y: 218, size: 64, mono: true, text: l1 }],
    });
    for (const [id, x] of [['pLife', PX], ['aLife', AX], ['rLife', RX]]) {
      s.wire(id, [x, LIFE_TOP], [x, LIFE_BOT], { color: T.dim });
      s.set(0, 'wire:' + id, 'dashed', 1, 0);
      s.set(0, 'wire:' + id, 'alpha', 0, 0); s.set(0.3, 'wire:' + id, 'alpha', 1, 0.8);
    }
    // the asynchronous copy link joins the two databases under the trace; it stays still in this lesson
    s.wire('link', [PX, LIFE_BOT + 24], [RX, LIFE_BOT + 24], { via: [[PX, 1660], [RX, 1660]], color: T.wire });
    s.set(0, 'wire:link', 'alpha', 0, 0); s.set(0.3, 'wire:link', 'alpha', 1, 0.8);
    s.node('linkLabel', 'label', { x: AX, y: 1724, text: 'async copy', size: 44, mono: true, color: T.mid, alpha: 0 });

    card('primary', PX, 'primary', 'draft', 'v7');
    card('app', AX, 'app', 'writes', '0', { size: 44, mono: false, weight: 500, color: T.mid });
    card('replica', RX, 'replica', 'draft', 'v7');
    for (const id of ['primary', 'app', 'replica', 'linkLabel']) s.set(0.2, id, 'alpha', 1, 0.8);

    s.node('behind', 'label', { x: RX, y: 976, text: 'behind', size: 48, mono: true, weight: 700, color: T.accent, plate: true, alpha: 0 });

    // messages: arrow + chip that rides from the sender side to rest beside the receiver
    function message(id, row, from, to, parts, t, dur, border) {
      const y = row, dir = Math.sign(to - from), str = parts.map((q) => q.text).join(''), hw = chipHalf(str) + 30;
      s.node(id + 'Arrow', 'arrow', { x: (from + to) / 2, y, x1: from, y1: y, x2: to - dir * 6, y2: y, lw: 4, color: T.fg, progress: 0 });
      const x0 = from + dir * hw, x1 = to - dir * hw;
      s.node(id, 'tag', { x: x0, y: y - CHIP_UP, size: CHIP, parts, color: border || T.fg, alpha: 0 });
      s.set(t, id + 'Arrow', 'progress', 1, dur, 'inOut');
      s.set(t, id, 'alpha', 1, 0.18);
      s.set(t, id, 'x', x1, dur, 'inOut');
      s.set(t + dur, id + 'Arrow', 'color', T.mid, 0.5);       // trace settles; chip stays as the record
      if (!border) s.set(t + dur, id, 'color', T.mid, 0.5);    // requests settle to grey; replies keep their success colour
      return t + dur;
    }
    const pan = { p: s.panOf([PX, 0]), a: 0, r: s.panOf([RX, 0]) };

    // ---------- beat 1: two copies of R42, both draft v7 (0-5.6) ----------
    s.pulse(1.6, 'primary', T.fg); s.sfx(1.6, 'ack', { note: 'G5', gain: 0.6, pan: pan.p });
    s.pulse(2.5, 'replica', T.fg); s.sfx(2.5, 'ack', { note: 'E5', gain: 0.6, pan: pan.r });
    s.pulse(3.4, 'app', T.fg); s.sfx(3.4, 'ack', { note: 'C5', gain: 0.6, pan: pan.a });

    // ---------- beat 2: the save succeeds on the primary (5.6-14.6) ----------
    const w0 = 5.8;
    s.set(w0, 'app', 'line1Text', '1', 0); s.set(w0, 'app', 'line1Color', T.fg, 0);
    s.pulse(w0, 'app', T.fg);
    s.sfx(w0, 'send', { note: 'C6', pan: pan.a });
    const wArr = message('mSave', ROW.save, AX, PX, [{ text: 'save v8', color: T.fg }], w0, 1.2);    // 7.0
    s.ripple(wArr, [PX, ROW.save], T.fg, { r0: 8, r1: 26 });
    s.sfx(wArr, 'arrive', { note: 'G5', pan: pan.p });
    const commit = wArr + 0.6; // 7.6: the record changes in one step
    s.set(commit, 'primary', 'line0Text', 'ready', 0);
    s.set(commit, 'primary', 'line1Text', 'v8', 0);
    s.set(commit, 'primary', 'color', T.ok, 0.15); s.set(commit + 1.2, 'primary', 'color', T.mid, 0.6);
    s.set(commit, 'primary', 'line1HiColor', T.ok, 0); s.set(commit, 'primary', 'line1Hi', 1, 0.15); s.set(commit + 1.0, 'primary', 'line1Hi', 0, 0.6);
    s.pulse(commit, 'primary');
    s.sfx(commit, 'store', { note: 'G5', pan: pan.p });
    const a0 = commit + 1.0; // 8.6
    s.sfx(a0, 'send', { note: 'G6', gain: 0.8, pan: pan.p });
    const aArr = message('mAck', ROW.ack, PX, AX, [{ text: 'ok', color: T.ok }, { text: ' · v8', color: T.fg }], a0, 1.2, T.ok); // 9.8
    s.ripple(aArr, [AX, ROW.ack], T.ok, { r0: 8, r1: 26, mark: 'check' });
    s.sfx(aArr, 'deliver', { note: 'C5', pan: pan.a });       // success reply cue (identical later)
    const lag = aArr + 1.1; // 10.9: the replica has not received v8
    s.set(lag, 'replica', 'line1Color', T.accent, 0.25);
    s.set(lag, 'replica', 'line0Color', T.accent, 0.25);
    s.set(lag, 'behind', 'alpha', 1, 0.3);
    s.set(lag, 'behind', 'scale', 0.7, 0); s.set(lag, 'behind', 'scale', 1, 0.4, 'back');
    s.pulse(lag, 'replica', T.accent);
    s.sfx(lag, 'ack', { note: 'E5', gain: 0.45, pan: pan.r });
    s.sfx(lag + 0.03, 'ack', { note: 'F5', gain: 0.4, pan: pan.r });

    // ---------- beat 3: the app reads the replica and succeeds with v7 (14.6-23) ----------
    const r0 = 14.6;
    s.sfx(r0, 'send', { note: 'C6', pan: pan.a });
    const rArr = message('mRead', ROW.read, AX, RX, [{ text: 'read R42', color: T.fg }], r0, 1.2); // 15.8
    s.ripple(rArr, [RX, ROW.read], T.fg, { r0: 8, r1: 26 });
    s.sfx(rArr, 'arrive', { note: 'E5', pan: pan.r });
    // the replica answers from its own copy: its v7 row is selected, nothing changes
    const look = rArr + 0.4; // 16.2
    s.set(look, 'replica', 'line1HiColor', T.fg, 0); s.set(look, 'replica', 'line1Hi', 1, 0.15);
    s.pulse(look, 'replica'); s.pulse(look + 0.35, 'replica');
    s.sfx(look, 'work', { note: 'E4', gain: 0.6, pan: pan.r });
    s.sfx(look + 0.35, 'work', { note: 'E4', gain: 0.6, pan: pan.r });
    s.set(look + 1.4, 'replica', 'line1Hi', 0, 0.5);
    const p0 = look + 1.0; // 17.2
    s.sfx(p0, 'send', { note: 'E6', gain: 0.8, pan: pan.r });
    const pArr = message('mReply', ROW.reply, RX, AX, [{ text: 'ok', color: T.ok }, { text: ' · v7', color: T.accent }], p0, 1.2, T.ok); // 18.4
    s.ripple(pArr, [AX, ROW.reply], T.ok, { r0: 8, r1: 26, mark: 'check' });
    s.sfx(pArr, 'deliver', { note: 'C5', pan: pan.a });       // identical to the save reply: both succeeded

    // ---------- beat 4: two answers, one write; the save is still there (23-38) ----------
    const e0 = 23.0;
    // saved revision: primary v8 and its acknowledgement light together and stay marked
    s.set(e0, 'primary', 'line1HiColor', T.ok, 0); s.set(e0, 'primary', 'line1Hi', 1, 0.25);
    s.pulse(e0, 'primary', T.ok); s.pulse(e0, 'mAck');
    s.sfx(e0, 'ack', { note: 'G5', gain: 0.6, pan: pan.p });
    s.sfx(e0 + 0.2, 'ack', { note: 'C5', gain: 0.5, pan: pan.a });
    // observed revision: replica v7 and the read reply light together and stay marked
    const e1 = e0 + 1.6; // 24.6
    s.set(e1, 'replica', 'line1HiColor', T.accent, 0); s.set(e1, 'replica', 'line1Hi', 1, 0.25);
    s.pulse(e1, 'replica', T.accent); s.pulse(e1, 'mReply');
    s.sfx(e1, 'ack', { note: 'E5', gain: 0.6, pan: pan.r });
    s.sfx(e1 + 0.2, 'ack', { note: 'C5', gain: 0.5, pan: pan.a });
    // the two replies the app received differ
    const e2 = e1 + 1.6; // 26.2
    s.node('gap', 'arrow', { x: AX, y: (ROW.ack + ROW.reply) / 2, x1: AX, y1: ROW.ack, x2: AX, y2: ROW.reply, lw: 8, head: false, color: T.accent, progress: 0 });
    s.node('neq', 'label', { x: AX, y: 1144, text: '≠', size: 72, weight: 800, color: T.accent, plate: true, alpha: 0 });
    s.set(e2, 'gap', 'progress', 1, 0.6);
    s.set(e2 + 0.5, 'neq', 'alpha', 1, 0.2);
    s.set(e2 + 0.5, 'neq', 'scale', 0.5, 0); s.set(e2 + 0.5, 'neq', 'scale', 1, 0.4, 'back');
    s.sfx(e2 + 0.5, 'ack', { note: 'G5', gain: 0.4, pan: pan.a });
    s.sfx(e2 + 0.53, 'ack', { note: 'F#5', gain: 0.36, pan: pan.a });
    // still exactly one write: the save was not repeated or undone
    const e3 = e2 + 1.8; // 28.0
    s.set(e3, 'app', 'line1HiColor', T.fg, 0); s.set(e3, 'app', 'line1Hi', 1, 0.2); s.set(e3 + 1.2, 'app', 'line1Hi', 0, 0.6);
    s.pulse(e3, 'app', T.fg);
    s.pulse(e3, 'mSave');
    s.sfx(e3, 'arrive', { note: 'C5', gain: 0.5, pan: pan.a });
    // final evidence held to the end (finite ending, no fade)
    s.meta.duration = 38;
  },
});
