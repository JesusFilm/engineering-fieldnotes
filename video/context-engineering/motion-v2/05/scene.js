/* Context engineering, lesson 05: Verify the patch.
 * Mechanism: a patch's claim is not evidence. The saved v1 fixture is pointed at the patch's actual revision,
 * runs, and its expected key is compared with the real response. The narrow result (key present) is then
 * recorded with that revision; what it does not cover (latency) stays explicitly unmeasured.
 * Authored and played at speed 1. Local engine: ./engine (sheet, trace, accordion copied from lesson 04).
 */
FlowVideo.scene({
  meta: { title: 'Context engineering', subtitle: 'VERIFY THE PATCH', duration: 42, fps: 30, speed: 1 },
  build(s) {
    const T = s.THEME, X = 540;

    // ---------- stage ----------
    s.node('claim', 'sheet', { x: X, y: 578, w: 1020, h: 216, title: 'patch', statusPill: true, alpha: 0,
      items: [{ dx: 24, dy: 80, w: 972, h: 56, size: 42 }, { dx: 24, dy: 144, w: 972, h: 56, size: 40 }] });
    s.node('run', 'sheet', { x: X, y: 800, w: 1020, h: 160, title: 'fixture run', statusPill: true, alpha: 0,
      items: [{ dx: 24, dy: 82, w: 972, h: 60, size: 42, rightSize: 38 }] });
    // Comparator: expect column (left), actual column (right), check lane between, result row below.
    s.node('cmp', 'sheet', { x: X, y: 1106, w: 1020, h: 384, title: 'compare', alpha: 0,
      items: [
        { dx: 24, dy: 84, w: 440, h: 54, size: 36 }, { dx: 540, dy: 84, w: 456, h: 54, size: 36 },
        { dx: 24, dy: 220, w: 440, h: 62, size: 40 },
        { dx: 540, dy: 150, w: 456, h: 62, size: 38 }, { dx: 540, dy: 220, w: 456, h: 62, size: 38 },
        { dx: 24, dy: 304, w: 972, h: 62, size: 40 },
      ] });
    s.node('rec', 'sheet', { x: X, y: 1442, w: 1020, h: 216, title: 'record', alpha: 0,
      items: [{ dx: 24, dy: 80, w: 972, h: 56, size: 40 }, { dx: 24, dy: 144, w: 972, h: 56, size: 40 }] });
    // Comparison bracket in the lane between the expect row and the actual total_cents row (same height).
    const cTop = 1106 - 192, yRow = cTop + 220 + 31;
    s.node('bracket', 'trace', { x: 0, y: 0, points: [[468, yRow], [536, yRow]], width: 6, prog: 0 });

    // Pitches: claim C5, fixture run A5, response E5, compare G5, record E4.
    const item = (t, id, i, txt, col) => {
      s.set(t, id, 'r' + i + 'Text', txt, 0); if (col) s.set(t, id, 'r' + i + 'Color', col, 0);
      s.set(t, id, 'r' + i + 'Slot', 0, 0.2);
      s.set(t, id, 'r' + i + 'Alpha', 0, 0); s.set(t, id, 'r' + i + 'Alpha', 1, 0.3);
      s.set(t, id, 'r' + i + 'Pop', 0.88, 0); s.set(t, id, 'r' + i + 'Pop', 1, 0.35, 'back');
    };
    const hl = (t, id, i, col, hold) => { s.set(t, id, 'r' + i + 'HlColor', col, 0); s.set(t, id, 'r' + i + 'Hl', 1, 0.2); s.set(t + 0.2 + hold, id, 'r' + i + 'Hl', 0, 0.4); };
    const slot = (t, id, i, txt) => { s.set(t, id, 'r' + i + 'Slot', 1, 0.2); s.set(t, id, 'r' + i + 'SlotText', txt, 0); };
    const status = (t, id, txt, col) => { s.set(t, id, 'status', txt, 0); s.set(t, id, 'statusColor', col || T.mid, 0); };

    // ---------- Beat 1: the patch claims compatibility; there is no evidence yet ----------
    s.set(0.4, 'claim', 'alpha', 1, 0.5);
    item(0.8, 'claim', 0, 'rev b2', T.fg); s.set(0.8, 'claim', 'r0Mark', 1, 0.3); s.sfx(0.8, 'store', { note: 'C5', gain: 0.6 });
    item(1.6, 'claim', 1, 'claims: keeps total_cents', T.fg); s.sfx(1.6, 'ack', { note: 'C5', gain: 0.6 });
    status(2.4, 'claim', 'unverified', T.accent); s.sfx(2.4, 'ack', { note: 'C4', gain: 0.6 });
    s.set(3.4, 'run', 'alpha', 1, 0.5); status(3.4, 'run', 'idle');
    item(3.4, 'run', 0, 'target rev b1', T.fg); s.set(3.4, 'run', 'r0Right', 'GET /v1/invoice', 0);
    s.sfx(3.4, 'ack', { note: 'A5', gain: 0.6 });
    s.set(4.2, 'cmp', 'alpha', 1, 0.5);
    item(4.2, 'cmp', 0, 'expect', T.mid); s.set(4.2, 'cmp', 'r0Line', T.bg, 0);
    item(4.2, 'cmp', 1, 'actual', T.mid); s.set(4.2, 'cmp', 'r1Line', T.bg, 0);
    item(4.6, 'cmp', 2, 'key total_cents', T.fg); s.set(4.6, 'cmp', 'r2Mark', 1, 0.3); s.sfx(4.6, 'store', { note: 'G5', gain: 0.6 });
    slot(4.6, 'cmp', 3, 'not run'); slot(4.6, 'cmp', 4, ''); slot(4.6, 'cmp', 5, 'no result');
    s.set(5.2, 'rec', 'alpha', 1, 0.5); slot(5.2, 'rec', 0, ''); slot(5.2, 'rec', 1, '');
    s.sfx(5.2, 'ack', { note: 'E4', gain: 0.5 });
    // Claim vs evidence: the claim line and the empty result row light together.
    hl(6.6, 'claim', 1, T.fg, 1.2); s.set(6.6, 'cmp', 'r5SlotColor', T.accent, 0.2); s.set(6.6, 'cmp', 'r5SlotTextColor', T.accent, 0.2);
    s.sfx(6.6, 'ack', { note: 'C4', gain: 0.7 });
    s.set(8.4, 'cmp', 'r5SlotColor', T.dim, 0.4); s.set(8.4, 'cmp', 'r5SlotTextColor', T.mid, 0.4);

    // ---------- Beat 2: point the fixture at the changed code, run it, read the actual response ----------
    const b2 = 9.6;
    hl(b2, 'claim', 0, T.accent, 1.8); s.sfx(b2, 'ack', { note: 'C5', gain: 0.7 });
    s.set(b2 + 0.6, 'run', 'r0Color', T.bad, 0.15); s.set(b2 + 0.6, 'run', 'r0Icon', 'x', 0); s.set(b2 + 0.6, 'run', 'r0IconK', 1, 0.35);
    s.set(b2 + 0.6, 'run', 'r0Right', '', 0);
    s.shake(b2 + 0.6, 'run', 7, 0.35); s.sfx(b2 + 0.6, 'miss', { gain: 0.6 });
    const rt = b2 + 2.4;
    s.set(rt, 'run', 'r0IconK', 0, 0.2);
    s.set(rt, 'run', 'r0Text', 'target rev b2', 0); s.set(rt, 'run', 'r0Color', T.fg, 0.2); s.set(rt, 'run', 'r0Mark', 1, 0.3);
    s.set(rt, 'run', 'r0Pop', 0.9, 0); s.set(rt, 'run', 'r0Pop', 1, 0.3, 'back');
    s.sfx(rt, 'clock', { gain: 0.6 }); s.sfx(rt + 0.2, 'ack', { note: 'A5', gain: 0.8 });
    s.set(rt + 0.6, 'run', 'r0Right', 'GET /v1/invoice', 0);
    hl(rt + 0.8, 'claim', 0, T.accent, 1.2); hl(rt + 0.8, 'run', 0, T.accent, 1.2);
    s.sfx(rt + 0.8, 'ack', { note: 'C5', gain: 0.6 }); s.sfx(rt + 1.0, 'ack', { note: 'A5', gain: 0.6 });
    const go = rt + 3.4;
    status(go, 'run', 'running', T.accent); s.set(go, 'run', 'sweep', 0, 0); s.set(go, 'run', 'sweep', 1, 0.9, 'linear');
    s.sfx(go, 'send', { note: 'A6', gain: 0.7 });
    for (let k = 0; k < 4; k++) s.sfx(go + 0.3 + k * 0.2, 'work', { note: 'E4', gain: 0.45 });
    s.packet({ route: [[780, 884], [780, 990]], t: go + 1.2, dur: 0.4, kind: 'dot', color: T.fg });
    const rs = go + 1.6;
    s.set(rs, 'cmp', 'r1Text', 'actual · rev b2', 0); s.set(rs, 'cmp', 'r1Color', T.fg, 0.2);
    s.set(rs, 'cmp', 'r3SlotText', '', 0);
    item(rs + 0.2, 'cmp', 3, 'invoice: 42', T.fg); s.sfx(rs + 0.2, 'store', { note: 'E5', gain: 0.6 });
    item(rs + 0.6, 'cmp', 4, 'total_cents: 1250', T.fg); s.sfx(rs + 0.6, 'store', { note: 'E5', gain: 0.8 });
    status(rs + 1.0, 'run', 'done', T.fg); s.sfx(rs + 1.0, 'arrive', { note: 'E5', gain: 0.7 });

    // ---------- Beat 3: the actual response has the expected key ----------
    const b3 = rs + 4.4;
    hl(b3, 'cmp', 2, T.accent, 2.6); s.sfx(b3, 'ack', { note: 'G5', gain: 0.7 });
    s.set(b3 + 0.6, 'bracket', 'prog', 1, 0.5); s.sfx(b3 + 0.6, 'send', { note: 'G6', gain: 0.5 });
    hl(b3 + 1.1, 'cmp', 4, T.accent, 1.5); s.sfx(b3 + 1.1, 'ack', { note: 'E5', gain: 0.7 });
    s.ripple(b3 + 1.6, [502, yRow], T.ok, { mark: 'check', r1: 34 });
    const pass = b3 + 2.4;
    s.set(pass, 'cmp', 'r5Slot', 0, 0.2); s.set(pass, 'cmp', 'r5SlotText', '', 0);
    item(pass, 'cmp', 5, 'PASS · key present', T.ok); s.set(pass, 'cmp', 'r5Line', T.ok, 0);
    s.set(pass, 'cmp', 'r5Icon', 'check', 0); s.set(pass, 'cmp', 'r5IconK', 1, 0.35);
    s.sfx(pass, 'chime', { gain: 0.8 });
    s.set(pass + 1.6, 'bracket', 'color', T.ok, 0.3);

    // ---------- Beat 4: keep the result with the revision; state what it does not cover ----------
    const b4 = pass + 5.0;
    s.packet({ route: [[X, 1300], [X, 1338]], t: b4, dur: 0.35, kind: 'dot', color: T.ok });
    s.sfx(b4, 'send', { note: 'G6', gain: 0.5 });
    item(b4 + 0.4, 'rec', 0, 'rev b2 · v1 fixture · pass', T.ok); s.set(b4 + 0.4, 'rec', 'r0Mark', 1, 0.3);
    s.sfx(b4 + 0.4, 'store', { note: 'E4', gain: 0.9 });
    item(b4 + 1.6, 'rec', 1, 'latency: not measured', T.mid); s.sfx(b4 + 1.6, 'ack', { note: 'C4', gain: 0.6 });
    const bind = b4 + 3.2;
    status(bind, 'claim', 'checked @ b2', T.ok); s.pulse(bind, 'claim'); s.sfx(bind, 'arrive', { note: 'C5', gain: 0.7 });
    hl(bind + 0.6, 'claim', 0, T.accent, 1.8); hl(bind + 0.6, 'run', 0, T.accent, 1.8); hl(bind + 0.6, 'rec', 0, T.accent, 1.8);
    s.sfx(bind + 0.6, 'ack', { note: 'C5', gain: 0.6 }); s.sfx(bind + 0.8, 'ack', { note: 'A5', gain: 0.6 }); s.sfx(bind + 1.0, 'ack', { note: 'E4', gain: 0.7 });
    const end = bind + 9.0;
    s.fade(end, 1, 1.2);
    s.meta.duration = end + 1.8;
  },
});
