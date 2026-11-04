/* Context engineering, lesson 04: Make a useful handoff.
 * Mechanism: session 1's history is long. A vague handoff leaves the decisive constraint behind. A useful
 * handoff records goal, keep, ref, and open as fields copied from the lines that justify them. Session 2
 * receives the shorter record and explicitly opens the reference when it needs detail. Incidental lines are
 * the ones left out; the constraint is not.
 * Authored and played at speed 1. Local engine: ./engine (sheet, trace, accordion copied from lesson 03).
 */
FlowVideo.scene({
  meta: { title: 'Context engineering', subtitle: 'MAKE A USEFUL HANDOFF', duration: 45, fps: 30, speed: 1 },
  build(s) {
    const T = s.THEME;
    const rowsL = (n) => Array.from({ length: n }, (_, i) => ({ dx: 24, dy: 88 + i * 88, w: 442, h: 64, size: 40 }));

    // ---------- stage ----------
    s.node('s1', 'sheet', { x: 275, y: 829, w: 490, h: 698, title: 'session 1', alpha: 0, items: rowsL(7) });
    s.node('ho', 'sheet', { x: 795, y: 698, w: 510, h: 436, title: 'handoff', statusPill: true, alpha: 0,
      items: Array.from({ length: 4 }, (_, i) => ({ dx: 24, dy: 88 + i * 88, w: 462, h: 64, size: 40 })) });
    s.node('s2', 'sheet', { x: 795, y: 1062, w: 510, h: 232, title: 'session 2', statusPill: true, alpha: 0,
      items: [{ dx: 24, dy: 84, w: 462, h: 60, size: 40 }, { dx: 24, dy: 154, w: 462, h: 60, size: 40 }] });
    s.node('repo', 'sheet', { x: 540, y: 1398, w: 1020, h: 360, title: 'repository', alpha: 0,
      items: [{ dx: 24, dy: 88, w: 972, h: 64, size: 40 }, { dx: 24, dy: 170, w: 972, h: 70, size: 44 }, { dx: 24, dy: 256, w: 972, h: 70, size: 44 }] });
    s.wire('give', [795, 920], [795, 942]); s.set(0, 'wire:give', 'alpha', 0, 0);
    // Copy paths through the 20 px column gap: transcript row -> handoff field.
    const yL = (i) => 600 + i * 88, yR = (j) => 600 + j * 88;
    const hop = (id, i, j) => s.node(id, 'trace', { x: 0, y: 0, points: [[516, yL(i)], [530, yL(i)], [530, yR(j)], [544, yR(j)]], width: 6, prog: 0 });
    hop('h0', 0, 0); hop('h1', 3, 1); hop('h2', 4, 2); hop('h3', 6, 3);
    // Open path: session 2's action row -> repository file row, down the right gutter.
    s.node('open', 'trace', { x: 0, y: 0, points: [[1026, 1186], [1064, 1186], [1064, 1370], [1040, 1370]], arrow: true, prog: 0 });

    // Pitches: session 1 E5, handoff G5, session 2 C5, repository A5.
    const item = (t, id, i, txt, col) => {
      s.set(t, id, 'r' + i + 'Text', txt, 0); if (col) s.set(t, id, 'r' + i + 'Color', col, 0);
      s.set(t, id, 'r' + i + 'Slot', 0, 0.2);
      s.set(t, id, 'r' + i + 'Alpha', 0, 0); s.set(t, id, 'r' + i + 'Alpha', 1, 0.3);
      s.set(t, id, 'r' + i + 'Pop', 0.88, 0); s.set(t, id, 'r' + i + 'Pop', 1, 0.35, 'back');
    };
    const hl = (t, id, i, col, hold) => { s.set(t, id, 'r' + i + 'HlColor', col, 0); s.set(t, id, 'r' + i + 'Hl', 1, 0.2); s.set(t + 0.2 + hold, id, 'r' + i + 'Hl', 0, 0.4); };
    const slot = (t, id, i, txt, col) => { s.set(t, id, 'r' + i + 'Slot', 1, 0.2); s.set(t, id, 'r' + i + 'SlotText', txt, 0); s.set(t, id, 'r' + i + 'SlotColor', col || T.dim, 0); s.set(t, id, 'r' + i + 'SlotTextColor', col || T.mid, 0); };
    const status = (t, id, txt, col) => { s.set(t, id, 'status', txt, 0); s.set(t, id, 'statusColor', col || T.mid, 0); };

    // ---------- Beat 1: a vague handoff leaves the constraint behind ----------
    s.set(0.4, 's1', 'alpha', 1, 0.5); status(0.4, 's1', '7 lines');
    const lines = [['goal fix latency'], ['search invoice', T.mid], ['read README.md', T.mid], ['keep total_cents', T.accent], ['ref api/v1.md'], ['query abandoned', T.mid], ['open timeout?']];
    lines.forEach(([txt, col], i) => { item(0.8 + i * 0.25, 's1', i, txt, col || T.fg); s.sfx(0.8 + i * 0.25, 'store', { note: 'E5', gain: 0.3, pan: -0.5 }); });
    s.set(3.0, 'ho', 'alpha', 1, 0.5); status(3.0, 'ho', 'draft', T.accent);
    slot(3.0, 'ho', 0, ''); slot(3.0, 'ho', 1, 'keep —'); slot(3.0, 'ho', 2, 'ref —'); slot(3.0, 'ho', 3, 'open —');
    s.sfx(3.0, 'ack', { note: 'G5', gain: 0.5, pan: 0.5 });
    item(3.6, 'ho', 0, 'optimize invoice', T.mid); s.sfx(3.6, 'store', { note: 'G5', gain: 0.6, pan: 0.5 });
    s.set(4.4, 's2', 'alpha', 1, 0.5); status(4.4, 's2', 'waiting');
    s.set(4.4, 'repo', 'alpha', 1, 0.5);
    item(4.4, 'repo', 0, 'api/v1.md · a17', T.mid);
    slot(4.4, 'repo', 1, 'not opened'); slot(4.4, 'repo', 2, '');
    s.sfx(4.4, 'ack', { note: 'C5', gain: 0.4 }); s.sfx(4.6, 'ack', { note: 'A5', gain: 0.4 });
    // The loss: the constraint is in session 1, the keep field is empty.
    hl(6.0, 's1', 3, T.accent, 2.6); s.sfx(6.0, 'ack', { note: 'E5', gain: 0.8, pan: -0.5 });
    s.set(6.8, 'ho', 'r1SlotColor', T.accent, 0.2); s.set(6.8, 'ho', 'r1SlotTextColor', T.accent, 0.2);
    s.shake(6.8, 'ho', 6, 0.35); s.sfx(6.8, 'ack', { note: 'D4', gain: 0.9, pan: 0.5 });

    // ---------- Beat 2: record goal, keep, ref, open from the lines that justify them ----------
    const fill = (t, h, i, j, txt, col, mark, gain) => {
      hl(t, 's1', i, mark ? T.accent : T.fg, 1.2); s.sfx(t, 'ack', { note: 'E5', gain: 0.55, pan: -0.5 });
      s.set(t + 0.3, h, 'prog', 1, 0.5); s.set(t + 1.6, h, 'alpha', 0, 0.4);
      item(t + 0.8, 'ho', j, txt, col); s.set(t + 0.8, 'ho', 'r' + j + 'SlotText', '', 0);
      if (mark) s.set(t + 0.8, 'ho', 'r' + j + 'Mark', 1, 0.3);
      s.sfx(t + 0.8, 'store', { note: 'G5', gain, pan: 0.5 });
    };
    const b2 = 10.6;
    s.set(b2, 'ho', 'r0Alpha', 0, 0.3);
    fill(b2 + 0.2, 'h0', 0, 0, 'goal fix latency', T.fg, false, 0.7);
    fill(b2 + 2.4, 'h1', 3, 1, 'keep total_cents', T.fg, true, 1.0);
    s.set(b2 + 3.2, 'ho', 'r1SlotColor', T.dim, 0);
    fill(b2 + 4.8, 'h2', 4, 2, 'ref  api/v1.md', T.mid, false, 0.7);
    fill(b2 + 7.2, 'h3', 6, 3, 'open timeout?', T.accent, false, 0.7);
    status(b2 + 9.0, 'ho', '4 fields', T.fg); s.pulse(b2 + 9.0, 'ho'); s.sfx(b2 + 9.0, 'ack', { note: 'G5', gain: 0.6, pan: 0.5 });

    // ---------- Beat 3: session 2 receives it and opens the reference ----------
    const b3 = 22.6;
    s.set(b3, 'ho', 'sweep', 0, 0); s.set(b3, 'ho', 'sweep', 1, 0.7, 'linear'); s.sfx(b3, 'send', { note: 'G6', gain: 0.7, pan: 0.5 });
    status(b3 + 0.7, 'ho', 'sent', T.fg);
    s.set(b3 + 0.6, 'wire:give', 'alpha', 1, 0.2);
    s.packet({ route: [[795, 918], [795, 944]], t: b3 + 0.7, dur: 0.3, kind: 'dot', color: T.fg });
    status(b3 + 1.0, 's2', 'received', T.ok); s.pulse(b3 + 1.0, 's2', T.fg); s.sfx(b3 + 1.0, 'arrive', { note: 'C5', pan: 0.4 });
    item(b3 + 1.4, 's2', 0, 'has 4 fields', T.fg); s.sfx(b3 + 1.4, 'ack', { note: 'C5', gain: 0.6, pan: 0.4 });
    const op = b3 + 3.8;
    item(op, 's2', 1, 'opens api/v1.md', T.accent); s.sfx(op, 'send', { note: 'C6', gain: 0.7, pan: 0.4 });
    s.set(op + 0.3, 'open', 'prog', 1, 0.8);
    s.set(op + 1.1, 'repo', 'r0Color', T.fg, 0.2); hl(op + 1.1, 'repo', 0, T.accent, 1.0);
    status(op + 1.1, 'repo', 'opened', T.fg); s.sfx(op + 1.1, 'arrive', { note: 'A5', pan: 0.3 });
    s.set(op + 1.5, 'repo', 'r1SlotText', '', 0);
    item(op + 1.6, 'repo', 1, 'v1 response:', T.fg); s.set(op + 1.6, 'repo', 'r1Mark', 1, 0.3); s.sfx(op + 1.6, 'store', { note: 'A5', gain: 0.6 });
    item(op + 2.2, 'repo', 2, 'keep total_cents', T.fg); s.set(op + 2.2, 'repo', 'r2Mark', 1, 0.3); s.sfx(op + 2.2, 'store', { note: 'A5', gain: 0.8 });
    s.set(op + 2.6, 'open', 'alpha', 0.3, 0.5);
    // Detail is back in reach; the open question is still open.
    hl(op + 3.4, 'repo', 2, T.accent, 1.4); hl(op + 3.4, 'ho', 1, T.accent, 1.4);
    s.sfx(op + 3.4, 'ack', { note: 'A5', gain: 0.6 }); s.sfx(op + 3.6, 'ack', { note: 'G5', gain: 0.6, pan: 0.5 });
    hl(op + 5.6, 'ho', 3, T.accent, 1.4); s.sfx(op + 5.6, 'ack', { note: 'D4', gain: 0.7, pan: 0.5 });

    // ---------- Beat 4: incidental lines are what was left out; the constraint was not ----------
    const b4 = op + 8.6;
    [1, 2, 5].forEach((i, k) => {
      const t = b4 + k * 0.4;
      s.set(t, 's1', 'r' + i + 'Alpha', 0.3, 0.4); s.set(t, 's1', 'r' + i + 'Slot', 1, 0.3); s.set(t, 's1', 'r' + i + 'SlotText', '', 0);
      s.sfx(t, 'poof', { gain: 0.3, pan: -0.5 });
    });
    status(b4 + 1.2, 's1', '3 left out'); s.sfx(b4 + 1.2, 'ack', { note: 'E5', gain: 0.5, pan: -0.5 });
    const kp = b4 + 2.8;
    hl(kp, 's1', 3, T.accent, 3.0); hl(kp + 0.25, 'ho', 1, T.accent, 2.75); hl(kp + 0.5, 'repo', 2, T.accent, 2.5);
    s.sfx(kp, 'ack', { note: 'E5', gain: 0.8, pan: -0.5 }); s.sfx(kp + 0.25, 'ack', { note: 'G5', gain: 0.8, pan: 0.5 }); s.sfx(kp + 0.5, 'arrive', { note: 'A5', gain: 0.7 });
    const end = kp + 8.0;
    s.fade(end, 1, 1.2);
    s.meta.duration = end + 1.8;
  },
});
