// Replication and consistency, lesson 03: "Check the revision you need" (motion-v2).
// One mechanism: the check already needs revision 8 for R42. A replica query succeeds but returns
// revision 7, which leaves the check unverified. A fresh query started on the primary after the save
// committed returns revision 8; the check compares it with the unchanged need and only then reads Match.
// Illustrative one-record, one-writer example; no write, replication traffic, catch-up or failover is shown.
// Geometry: an assertion (need / seen operands) above a two-column query console (replica | primary tabs).
// Times are authored at speed 1.
FlowVideo.scene({
  meta: { title: 'Check the revision', titleSize: 92, subtitle: 'YOU NEED', subtitleSize: 40, duration: 35.5, fps: 30, speed: 1 },
  build(s) {
    const T = s.THEME;
    const NX = 300, SX = 780, CX = 540;           // need well / replica column, seen well / primary column
    const WELL_Y = 790, NUM_Y = 795, STATUS_Y = 965, LANE_Y = 1050;
    const CHIP_Y = 1215, CHIP_FROM = 1385, TAB_Y = 1440, SEL_Y = 1492, QUERY_Y = 1566, SWEEP_Y = 1618;
    const pan = { r: s.panOf([NX, 0]), p: s.panOf([SX, 0]), c: 0 };
    const appear = (t, id, dur = 0.3) => s.set(t, id, 'alpha', 1, dur);

    // ---------- stage ----------
    s.node('head', 'label', { x: CX, y: 545, text: 'verify R42', size: 46, mono: true, color: T.mid, alpha: 0 });
    s.node('needCap', 'label', { x: NX, y: 642, text: 'need', size: 48, weight: 600, color: T.mid, alpha: 0 });
    s.node('seenCap', 'label', { x: SX, y: 642, text: 'seen', size: 48, weight: 600, color: T.mid, alpha: 0 });
    s.node('needWell', 'corners', { x: NX, y: WELL_Y, w: 240, h: 200, len: 44, color: T.mid, progress: 0 });
    s.node('seenWell', 'corners', { x: SX, y: WELL_Y, w: 240, h: 200, len: 44, color: T.dim, progress: 1, alpha: 0 });
    s.node('need8', 'mtext', { x: NX, y: NUM_Y, text: '8', size: 140, mono: true, color: T.fg, alpha: 0 });
    s.node('cmp', 'label', { x: CX, y: WELL_Y, text: '≠', size: 110, weight: 800, color: T.accent, alpha: 0 });
    s.node('status', 'label', { x: CX, y: STATUS_Y, text: 'unverified', size: 56, weight: 700, color: T.mid, alpha: 0 });
    s.node('divider', 'rule', { x: CX, y: 1110, x1: 110, y1: 1110, x2: 970, y2: 1110, lw: 3, color: T.dim, alpha: 0 });
    s.node('tabR', 'label', { x: NX, y: TAB_Y, text: 'replica', size: 54, weight: 700, color: T.mid, alpha: 0 });
    s.node('tabP', 'label', { x: SX, y: TAB_Y, text: 'primary', size: 54, weight: 700, color: T.mid, alpha: 0 });
    s.node('sel', 'rule', { x: NX, y: SEL_Y, x1: NX, y1: SEL_Y, x2: NX, y2: SEL_Y, lw: 8, color: T.fg });
    s.node('qR', 'label', { x: NX, y: QUERY_Y, text: 'read R42', size: 46, mono: true, color: T.fg, alpha: 0 });
    s.node('qP', 'label', { x: SX, y: QUERY_Y, text: 'fresh read R42', size: 46, mono: true, color: T.fg, alpha: 0 });
    s.node('sweepR', 'rule', { x: NX, y: SWEEP_Y, x1: NX - 140, y1: SWEEP_Y, x2: NX - 140, y2: SWEEP_Y, lw: 4, color: T.fg });
    s.node('sweepP', 'rule', { x: SX, y: SWEEP_Y, x1: SX - 190, y1: SWEEP_Y, x2: SX - 190, y2: SWEEP_Y, lw: 4, color: T.fg });
    const chip = (id, x, rev) => s.node(id, 'tag', { x, y: CHIP_FROM, size: 48, color: T.mid, alpha: 0,
      parts: [{ text: 'ok', color: T.fg }, { text: ' · ', color: T.mid }, { text: 'rev ' + rev, color: T.fg }] });
    chip('chipR', NX, 7);
    chip('chipP', SX, 8);
    // binding guides: from the returned revision, up to the lane, across, and into the seen well
    const REV_DX = 126;                            // the revision digit sits this far right of the chip centre
    s.wire('bindR', [NX + REV_DX, CHIP_Y - 54], [SX, 900], { via: [[NX + REV_DX, LANE_Y], [SX, LANE_Y]], color: T.mid });
    s.wire('bindP', [SX + REV_DX, CHIP_Y - 54], [SX, 900], { via: [[SX + REV_DX, LANE_Y], [SX, LANE_Y]], color: T.mid });
    s.set(0, 'wire:bindR', 'alpha', 0, 0); s.set(0, 'wire:bindP', 'alpha', 0, 0);
    s.node('seen7', 'mtext', { x: NX + REV_DX, y: CHIP_Y + 2, text: '7', size: 48, mono: true, plate: true, color: T.fg, alpha: 0 });
    s.node('seen8', 'mtext', { x: SX + REV_DX, y: CHIP_Y + 2, text: '8', size: 48, mono: true, plate: true, color: T.fg, alpha: 0 });

    for (const id of ['head', 'needCap', 'seenCap', 'seenWell', 'status', 'divider', 'tabR', 'tabP']) s.set(0.2, id, 'alpha', 1, 0.8);

    // helpers
    function select(t, x, from) {                  // tab underline reveal or slide
      if (from === undefined) { s.set(t, 'sel', 'x1', x - 120, 0.35, 'out'); s.set(t, 'sel', 'x2', x + 120, 0.35, 'out'); }
      else { s.set(t, 'sel', 'x1', x - 120, 0.5); s.set(t, 'sel', 'x2', x + 120, 0.5); }
    }
    function sweep(t, id, x0, x1, panX) {          // the query runs once
      s.set(t, id, 'x2', x1, 0.7, 'linear');
      s.set(t + 0.75, id, 'alpha', 0, 0.3);
      s.sfx(t, 'send', { note: 'C6', gain: 0.9, pan: panX });
    }
    function reply(t, id, panX, workNote) {        // source answers, then the reply chip rises and rests
      s.pulse(t, 'sel');
      s.sfx(t, 'work', { note: workNote, gain: 0.7, pan: panX });
      const r0 = t + 0.3, r1 = r0 + 0.8;
      s.set(r0, id, 'alpha', 1, 0.2);
      s.set(r0, id, 'y', CHIP_Y, 0.8, 'out');
      s.set(r1, id, 'color', T.fg, 0.2);
      s.sfx(r1, 'deliver', { note: 'C5', gain: 1, pan: pan.c });  // identical for both successful replies
      return r1;
    }
    function bind(t, id, x0, wire) {               // copy the returned revision into the seen operand
      s.set(t, 'wire:' + wire, 'alpha', 0.85, 0.2);
      s.set(t, id, 'alpha', 1, 0);
      s.set(t, id, 'y', LANE_Y, 0.3, 'in');
      const xDur = Math.abs(x0 - SX) > 200 ? 0.5 : 0.25;
      s.set(t + 0.3, id, 'x', SX, xDur, 'linear');
      const t3 = t + 0.3 + xDur;
      s.set(t3, id, 'y', NUM_Y, 0.4, 'out');
      s.set(t3, id, 'size', 140, 0.4, 'out');
      s.set(t3 + 0.4, 'wire:' + wire, 'alpha', 0, 0.5);
      s.sfx(t3 + 0.4, 'arrive', { note: 'C5', gain: 0.5, pan: pan.p });
      return t3 + 0.4;
    }

    // ---------- beat 1: the check already needs revision 8 (0-5.4) ----------
    s.set(1.0, 'needWell', 'progress', 1, 0.4, 'out');
    appear(1.0, 'need8', 0.3);
    s.sfx(1.0, 'ack', { note: 'A5', gain: 0.8, pan: s.panOf([NX, 0]) });   // the expected revision's own note
    select(3.2, NX);
    s.set(3.2, 'tabR', 'color', T.fg, 0.2);
    s.sfx(3.2, 'ack', { note: 'E5', gain: 0.7, pan: pan.r });
    appear(3.3, 'qR');                                                    // the query is part of the selection

    // ---------- beat 2: a successful replica reply carries revision 7 (5.4-14.8) ----------
    sweep(5.4, 'sweepR', NX - 140, NX + 140, pan.r);
    const dR = reply(6.3, 'chipR', pan.r, 'E4');                          // 7.4
    const hR = dR + 1.6;                                                   // 9.0: read the returned revision
    s.pulse(hR, 'chipR');
    s.sfx(hR, 'ack', { note: 'E5', gain: 0.6, pan: pan.r });
    const aR = bind(hR + 0.3, 'seen7', NX + REV_DX, 'bindR');             // 10.5
    const neq = aR + 1.5;                                                  // 12.0: compare
    s.set(neq, 'cmp', 'alpha', 1, 0.2);
    s.set(neq, 'cmp', 'scale', 0.5, 0); s.set(neq, 'cmp', 'scale', 1, 0.4, 'back');
    s.set(neq, 'seenWell', 'color', T.accent, 0.3);
    s.set(neq, 'seen7', 'color', T.accent, 0.3);
    s.set(neq, 'chipR', 'part2Color', T.accent, 0.3);
    s.set(neq, 'status', 'color', T.accent, 0.3);
    s.sfx(neq, 'ack', { note: 'E5', gain: 0.5, pan: pan.c });
    s.sfx(neq + 0.03, 'ack', { note: 'F5', gain: 0.45, pan: pan.c });

    // ---------- beat 3: a new query, started on the primary (14.8-22.6) ----------
    const clr = 14.8;
    s.set(clr, 'seen7', 'alpha', 0, 0.5);
    s.set(clr, 'cmp', 'alpha', 0, 0.5);
    s.set(clr, 'seenWell', 'color', T.dim, 0.5);
    s.set(clr, 'chipR', 'alpha', 0.5, 0.5);           // replica evidence stays, quieter
    s.set(clr, 'qR', 'alpha', 0.45, 0.5);
    s.sfx(clr, 'ack', { note: 'C5', gain: 0.45, pan: pan.c });
    select(16.6, SX, NX);
    s.set(16.6, 'tabR', 'color', T.mid, 0.3);
    s.set(16.6, 'tabP', 'color', T.fg, 0.3);
    s.sfx(16.6, 'ack', { note: 'G5', gain: 0.7, pan: pan.p });
    appear(16.8, 'qP');
    sweep(18.8, 'sweepP', SX - 190, SX + 190, pan.p);
    const dP = reply(19.7, 'chipP', pan.p, 'G4');                         // 20.8

    // ---------- beat 4: revision 8 is seen and compared (22.6-30) ----------
    const hP = dP + 1.8;                                                   // 22.6
    s.pulse(hP, 'chipP');
    s.sfx(hP, 'ack', { note: 'G5', gain: 0.6, pan: pan.p });
    const aP = bind(hP + 0.3, 'seen8', SX + REV_DX, 'bindP');             // 23.85
    const eq = aP + 1.55;                                                  // 25.4
    s.set(eq, 'cmp', 'text', '=', 0);
    s.set(eq, 'cmp', 'color', T.ok, 0);
    s.set(eq, 'cmp', 'alpha', 1, 0.2);
    s.set(eq, 'cmp', 'scale', 0.5, 0); s.set(eq, 'cmp', 'scale', 1, 0.4, 'back');
    s.set(eq, 'needWell', 'color', T.ok, 0.3);
    s.set(eq, 'seenWell', 'color', T.ok, 0.3);
    s.sfx(eq, 'chime', { note: 'A5', gain: 0.8, pan: pan.c });             // resolves the expected note
    const ok = eq + 1.4;                                                   // 26.8: decision follows comparison
    s.set(ok, 'status', 'text', 'match', 0);
    s.set(ok, 'status', 'color', T.ok, 0);
    s.set(ok, 'status', 'scale', 0.85, 0); s.set(ok, 'status', 'scale', 1, 0.35, 'back');
    s.sfx(ok, 'ack', { note: 'C5', gain: 0.6, pan: pan.c });

    // ---------- beat 5: both queries succeeded; only the needed revision decided (30-36.5) ----------
    const b5 = 30.0;
    s.set(b5, 'chipR', 'alpha', 1, 0.25); s.set(b5 + 1.1, 'chipR', 'alpha', 0.5, 0.5);
    s.pulse(b5, 'chipR'); s.pulse(b5, 'chipP');
    s.sfx(b5, 'ack', { note: 'C6', gain: 0.45, pan: pan.r });
    s.sfx(b5 + 0.05, 'ack', { note: 'C6', gain: 0.45, pan: pan.p });
    const b6 = 31.6;
    s.pulse(b6, 'chipP'); s.pulse(b6, 'needWell'); s.pulse(b6, 'seenWell'); s.pulse(b6, 'need8'); s.pulse(b6, 'seen8');
    s.sfx(b6, 'ack', { note: 'A5', gain: 0.7, pan: pan.c });
    // finite ending: hold the resolved check briefly
    s.meta.duration = 35.5;
  },
});

