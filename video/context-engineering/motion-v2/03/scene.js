/* Context engineering, lesson 03: Preserve a constraint.
 * Mechanism: clients read total_cents from the v1 response. The agent's input states what must remain
 * (keep total_cents) with a reference to the v1 contract, so the proposed edit changes how rows load and
 * leaves the response field as it is. The proposal is still unverified: the compatibility check is pending.
 * Authored and played at speed 1. Local engine: ./engine (sheet, trace, accordion copied from lesson 02).
 */
FlowVideo.scene({
  meta: { title: 'Context engineering', subtitle: 'PRESERVE A CONSTRAINT', duration: 42, fps: 30, speed: 1 },
  build(s) {
    const T = s.THEME, X = 540;

    // ---------- stage ----------
    s.node('mobile', 'box', { x: 280, y: 540, w: 400, h: 110, label: 'mobile app', labelSize: 40, alpha: 0 });
    s.node('web', 'box', { x: 800, y: 540, w: 400, h: 110, label: 'web app', labelSize: 40, alpha: 0 });
    s.node('resp', 'sheet', { x: X, y: 800, w: 960, h: 230, title: 'response · v1', alpha: 0,
      items: [{ dx: 24, dy: 84, w: 912, h: 58, size: 44 }, { dx: 24, dy: 152, w: 912, h: 58, size: 44 }] });
    s.node('input', 'sheet', { x: X, y: 1105, w: 960, h: 270, title: 'agent input', alpha: 0,
      items: [{ dx: 24, dy: 82, w: 912, h: 54, size: 42 }, { dx: 24, dy: 142, w: 912, h: 54, size: 44 }, { dx: 24, dy: 202, w: 912, h: 54, size: 42 }] });
    s.node('prop', 'sheet', { x: X, y: 1550, w: 960, h: 450, title: 'agent proposal', statusPill: true, alpha: 0,
      items: [
        { dx: 24, dy: 80, w: 912, h: 54, size: 40 },
        { dx: 24, dy: 144, w: 912, h: 58, size: 42 }, { dx: 24, dy: 208, w: 912, h: 58, size: 42 },
        { dx: 24, dy: 272, w: 912, h: 58, size: 42 },
        { dx: 24, dy: 362, w: 912, h: 62, size: 40 },
      ] });
    // Reference link: from the input's ref line, up the left gutter, to the v1 response header.
    s.node('reflink', 'trace', { x: 0, y: 0, points: [[80, 1199], [34, 1199], [34, 723], [80, 723]], arrow: true, prog: 0 });
    s.wire('feed', [X, 1246], [X, 1319]); s.set(0, 'wire:feed', 'alpha', 0, 0);

    // Pitches: mobile C6, web E6, response G5, input A5, agent C5, diff E5, verification A4.
    const P = { mobile: -0.4, web: 0.4 };
    const item = (t, id, i, txt, col, d = 0.3) => {
      s.set(t, id, 'r' + i + 'Text', txt, 0); if (col) s.set(t, id, 'r' + i + 'Color', col, 0);
      s.set(t, id, 'r' + i + 'Alpha', 0, 0); s.set(t, id, 'r' + i + 'Alpha', 1, d);
      s.set(t, id, 'r' + i + 'Pop', 0.88, 0); s.set(t, id, 'r' + i + 'Pop', 1, 0.35, 'back');
    };
    const hl = (t, id, i, col, hold) => { s.set(t, id, 'r' + i + 'HlColor', col, 0); s.set(t, id, 'r' + i + 'Hl', 1, 0.2); s.set(t + 0.2 + hold, id, 'r' + i + 'Hl', 0, 0.4); };
    // A client reads the response; ok = true shows the field arriving, false shows a broken read.
    const read = (t, c, ok) => {
      const n = s.pt(c + '.bottom'), note = c === 'mobile' ? 'C6' : 'E6', side = c === 'mobile' ? '.left' : '.right';
      s.packet({ route: [n, [n[0], 685]], t, dur: 0.45, kind: 'dot', color: T.fg });
      s.sfx(t, 'send', { note, gain: 0.6, pan: P[c] });
      if (ok) {
        s.packet({ route: [[n[0], 685], n], t: t + 0.7, dur: 0.45, kind: 'chip', label: '1250', color: T.fg });
        s.set(t + 1.15, c, 'color', T.fg, 0.2); s.pulse(t + 1.15, c);
        s.ripple(t + 1.15, c + side, T.fg, { mark: 'check', r1: 46 });
        s.sfx(t + 1.15, 'ack', { note, gain: 0.8, pan: P[c] });
      } else {
        s.set(t + 0.6, c, 'color', T.bad, 0); s.shake(t + 0.6, c, 9, 0.4);
        s.ripple(t + 0.6, c + side, T.bad, { mark: 'x', r1: 46 });
        s.sfx(t + 0.6, 'thump', { gain: 0.6, pan: P[c] });
      }
    };

    // ---------- Beat 1: clients depend on total_cents; what a rename would break ----------
    s.set(0.4, 'mobile', 'alpha', 1, 0.4); s.set(0.4, 'web', 'alpha', 1, 0.4);
    s.sfx(0.4, 'ack', { note: 'C6', gain: 0.45, pan: P.mobile }); s.sfx(0.6, 'ack', { note: 'E6', gain: 0.45, pan: P.web });
    s.set(1.2, 'resp', 'alpha', 1, 0.5);
    item(1.6, 'resp', 0, '"invoice": 42'); s.sfx(1.6, 'store', { note: 'G5', gain: 0.5 });
    item(2.0, 'resp', 1, '"total_cents": 1250'); s.sfx(2.0, 'store', { note: 'G5', gain: 0.5 });
    hl(2.8, 'resp', 1, T.fg, 0.8); s.sfx(2.8, 'ack', { note: 'G5', gain: 0.7 });
    read(3.6, 'mobile', true); read(3.9, 'web', true);
    // Hypothetical rename, marked as such.
    const hy = 7.0;
    s.set(hy, 'resp', 'r1Text', '"amount": 1250', 0); s.set(hy, 'resp', 'r1Color', T.bad, 0);
    s.set(hy, 'resp', 'r1Line', T.bad, 0); s.set(hy, 'resp', 'r1Right', 'if renamed', 0); s.set(hy, 'resp', 'r1RightColor', T.mid, 0);
    s.set(hy, 'resp', 'r1Pop', 0.9, 0); s.set(hy, 'resp', 'r1Pop', 1, 0.3, 'back');
    s.sfx(hy, 'miss', { gain: 0.8 });
    read(hy + 0.9, 'mobile', false); read(hy + 1.2, 'web', false);
    const rv = hy + 3.4;
    s.set(rv, 'resp', 'r1Text', '"total_cents": 1250', 0); s.set(rv, 'resp', 'r1Color', T.fg, 0);
    s.set(rv, 'resp', 'r1Line', T.dim, 0); s.set(rv, 'resp', 'r1Right', '', 0);
    for (const c of ['mobile', 'web']) s.set(rv, c, 'color', T.mid, 0.3);
    s.sfx(rv, 'poof', { gain: 0.35 });

    // ---------- Beat 2: the input states what must remain, with its reference ----------
    const b2 = 12.4;
    s.set(b2, 'input', 'alpha', 1, 0.5); s.sfx(b2, 'ack', { note: 'A5', gain: 0.45 });
    item(b2 + 0.5, 'input', 0, 'goal  fix invoice latency'); s.sfx(b2 + 0.5, 'store', { note: 'A5', gain: 0.6 });
    item(b2 + 1.6, 'input', 1, 'keep  total_cents', T.fg); s.set(b2 + 1.6, 'input', 'r1Mark', 1, 0.3);
    s.sfx(b2 + 1.6, 'store', { note: 'A5', gain: 0.9 });
    item(b2 + 2.7, 'input', 2, 'ref   api/v1.md · a17', T.mid); s.sfx(b2 + 2.7, 'store', { note: 'A5', gain: 0.6 });
    // The reference points at the v1 contract the clients rely on.
    const lk = b2 + 3.8;
    s.set(lk, 'reflink', 'prog', 1, 0.9); s.sfx(lk, 'send', { note: 'A6', gain: 0.6, pan: -0.5 });
    s.pulse(lk + 0.9, 'resp', T.accent); s.set(lk + 0.9, 'resp', 'titleColor', T.accent, 0.2); s.set(lk + 2.4, 'resp', 'titleColor', T.fg, 0.4);
    hl(lk + 0.9, 'input', 1, T.accent, 1.4); hl(lk + 0.9, 'resp', 1, T.accent, 1.4);
    s.sfx(lk + 0.9, 'ack', { note: 'G5', gain: 0.8 });
    s.set(lk + 2.6, 'reflink', 'alpha', 0.35, 0.5);
    // The input reaches the agent before it proposes anything.
    const ag = lk + 4.0;
    s.set(ag, 'wire:feed', 'alpha', 1, 0.3);
    s.packet({ route: [[X, 1246], [X, 1319]], t: ag, dur: 0.45, kind: 'dot', color: T.accent });
    s.sfx(ag, 'send', { note: 'A6', gain: 0.6 });
    s.set(ag + 0.45, 'prop', 'alpha', 1, 0.5); s.set(ag + 0.45, 'prop', 'status', 'drafting', 0); s.set(ag + 0.45, 'prop', 'statusColor', T.mid, 0);
    s.sfx(ag + 0.45, 'arrive', { note: 'C5' });
    item(ag + 1.2, 'prop', 0, 'src/invoice.py', T.mid); s.set(ag + 1.2, 'prop', 'r0Line', T.bg, 0);
    s.sfx(ag + 1.2, 'ack', { note: 'C5', gain: 0.5 });

    // ---------- Beat 3: the edit changes how rows load; the response field stays ----------
    const b3 = ag + 3.0;
    item(b3, 'prop', 1, '- rows = load_one_by_one()', T.bad); s.set(b3, 'prop', 'r1Line', '#5A2A2C', 0);
    s.sfx(b3, 'work', { note: 'E4', gain: 0.6 }); s.sfx(b3 + 0.18, 'work', { note: 'E4', gain: 0.45 });
    item(b3 + 1.8, 'prop', 2, '+ rows = load_batch()', T.ok); s.set(b3 + 1.8, 'prop', 'r2Line', '#1F4A3B', 0);
    s.sfx(b3 + 1.8, 'store', { note: 'E5', gain: 0.8 });
    const ctx = b3 + 4.0;
    item(ctx, 'prop', 3, '  "total_cents": total', T.fg);
    s.set(ctx, 'prop', 'r3Right', 'unchanged', 0); s.set(ctx, 'prop', 'r3RightColor', T.mid, 0);
    s.sfx(ctx, 'ack', { note: 'G5', gain: 0.7 });
    // Same name in three places: the diff's unchanged line, the response, and the keep line.
    const same = ctx + 1.2;
    hl(same, 'prop', 3, T.accent, 2.0); hl(same + 0.3, 'resp', 1, T.accent, 1.7); hl(same + 0.6, 'input', 1, T.accent, 1.4);
    s.sfx(same, 'ack', { note: 'E5', gain: 0.7 }); s.sfx(same + 0.3, 'ack', { note: 'G5', gain: 0.7 }); s.sfx(same + 0.6, 'ack', { note: 'A5', gain: 0.7 });
    s.set(same + 3.2, 'prop', 'status', 'proposed', 0); s.set(same + 3.2, 'prop', 'statusColor', T.fg, 0);
    s.pulse(same + 3.2, 'prop'); s.sfx(same + 3.2, 'arrive', { note: 'C5', gain: 0.7 });

    // ---------- Beat 4: the proposal still needs a check ----------
    const b4 = same + 6.0;
    s.set(b4, 'prop', 'r4Slot', 1, 0.3); s.set(b4, 'prop', 'r4SlotColor', T.accent, 0);
    s.set(b4, 'prop', 'r4SlotText', 'compatibility check: pending', 0); s.set(b4, 'prop', 'r4SlotTextColor', T.accent, 0);
    s.pulse(b4, 'prop', T.accent); s.sfx(b4, 'arrive', { note: 'A4', gain: 0.8 });
    s.set(b4 + 1.0, 'prop', 'status', 'unverified', 0); s.set(b4 + 1.0, 'prop', 'statusColor', T.accent, 0);
    s.sfx(b4 + 1.0, 'ack', { note: 'C5', gain: 0.6 });
    const end = b4 + 8.0;
    s.fade(end, 1, 1.2);
    s.meta.duration = end + 1.8;
  },
});
