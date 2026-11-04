/* Context engineering, lesson 01: What the model can see.
 * Mechanism: the model receives only the input assembled for one call. A repository file enters that
 * input only when the application reads it and copies its content in. Each call starts a fresh input,
 * so check what each call actually included.
 * Authored at speed 1; meta.speed 0.9 stretches playback. Local engine: ./engine (sheet + trace nodes).
 */
FlowVideo.scene({
  meta: { title: 'Context engineering', subtitle: 'WHAT THE MODEL CAN SEE', duration: 40, fps: 30, speed: 0.9 },
  build(s) {
    const T = s.THEME;
    const W = 960, X = 540;

    // ---------- stage ----------
    // Application (top): current action and a log of sent calls.
    s.node('app', 'sheet', { x: X, y: 588, w: W, h: 256, title: 'application', alpha: 0,
      items: [{ dx: 24, dy: 96, w: 912, h: 64, size: 42 }, { dx: 24, dy: 172, w: 912, h: 64, size: 42 }] });
    // Repository: files on disk, with the contract's actual content under its file name.
    s.node('repo', 'sheet', { x: X, y: 908, w: W, h: 304, title: 'repository', statusPill: true, alpha: 0,
      items: [{ dx: 24, dy: 92, w: 912, h: 60, size: 40 }, { dx: 24, dy: 160, w: 912, h: 60, size: 42 }, { dx: 64, dy: 228, w: 872, h: 60, size: 44 }] });
    // Input for one call.
    s.node('input', 'sheet', { x: X, y: 1265, w: W, h: 330, title: 'input · call 1', titleMono: true, statusPill: true, alpha: 0,
      items: [{ dx: 24, dy: 92, w: 912, h: 64 }, { dx: 24, dy: 168, w: 912, h: 64 }, { dx: 24, dy: 244, w: 912, h: 64 }] });
    // Model: what this call delivered.
    s.node('model', 'sheet', { x: X, y: 1640, w: W, h: 260, title: 'model', statusPill: true, alpha: 0,
      items: [{ dx: 24, dy: 98, w: 400, h: 64, chip: true }, { dx: 444, dy: 98, w: 190, h: 64, chip: true }, { dx: 24, dy: 178, w: 500, h: 64, chip: true }] });
    s.wire('feed', [X, 1436], [X, 1504]);
    s.set(0, 'wire:feed', 'alpha', 0, 0);
    // Copy path: from the contract excerpt, down the left gutter, into the input's third row.
    s.node('copy', 'trace', { x: 0, y: 0, points: [[124, 1014], [34, 1014], [34, 1376], [80, 1376]], arrow: true, prog: 0 });

    // Actor pitches: application C5, repository E5, input G5, model C6. Pans stay centred (stacked layout).
    const N = { app: 'C5', repo: 'E5', input: 'G5', model: 'C6' };
    const act = (t, label) => { s.set(t, 'app', 'status', label, 0); s.set(t, 'app', 'statusColor', T.accent, 0); s.pulse(t, 'app'); };
    const show = (t, id, i, txt, color) => {
      s.set(t, id, 'r' + i + 'Text', txt, 0);
      s.set(t, id, 'r' + i + 'Slot', 0, 0.2);
      if (color) s.set(t, id, 'r' + i + 'Color', color, 0);
      s.set(t, id, 'r' + i + 'Alpha', 0, 0); s.set(t, id, 'r' + i + 'Alpha', 1, 0.3);
      s.set(t, id, 'r' + i + 'Pop', 0.85, 0); s.set(t, id, 'r' + i + 'Pop', 1, 0.35, 'back');
    };
    const hl = (t, id, i, color, hold = 1.0) => {
      s.set(t, id, 'r' + i + 'HlColor', color, 0); s.set(t, id, 'r' + i + 'Hl', 1, 0.2); s.set(t + 0.2 + hold, id, 'r' + i + 'Hl', 0, 0.4);
    };
    const send = (t, call) => {
      act(t, 'sends call ' + call); s.sfx(t, 'send', { note: 'C6', gain: 0.8 });
      s.set(t + 0.3, 'input', 'sweep', 0, 0); s.set(t + 0.3, 'input', 'sweep', 1, 0.7, 'linear');
      s.sfx(t + 0.3, 'send', { note: 'G6', gain: 0.55 });
      s.set(t + 1.0, 'input', 'status', 'sent', 0); s.set(t + 1.0, 'input', 'statusColor', T.fg, 0);
      s.packet({ route: [[X, 1436], [X, 1504]], t: t + 1.0, dur: 0.45, kind: 'dot', color: T.fg });
      s.set(t + 1.45, 'model', 'status', 'received', 0); s.set(t + 1.45, 'model', 'statusColor', T.fg, 0);
      s.pulse(t + 1.45, 'model', T.fg); s.ripple(t + 1.45, [X, 1510], T.fg);
      s.sfx(t + 1.45, 'arrive', { note: N.model });
      s.set(t + 2.0, 'app', 'status', '', 0);
      return t + 1.45;
    };

    // ---------- Beat 1: the contract exists on disk; call 1 goes out without it ----------
    s.set(0.3, 'app', 'alpha', 1, 0.5); s.sfx(0.3, 'ack', { note: N.app, gain: 0.5 });
    s.set(0.3, 'app', 'r0Slot', 1, 0); s.set(0.3, 'app', 'r1Slot', 1, 0);
    s.set(0.3, 'app', 'r0SlotText', 'log: no calls yet', 0);

    s.set(1.0, 'repo', 'alpha', 1, 0.5);
    s.set(1.0, 'repo', 'status', 'on disk', 0);
    show(1.0, 'repo', 0, 'invoice.py', T.mid);
    show(1.3, 'repo', 1, 'invoice-v1.md', T.fg);
    show(1.6, 'repo', 2, 'keep total_cents', T.fg); s.set(1.6, 'repo', 'r2Mark', 1, 0.3);
    s.sfx(1.3, 'store', { note: N.repo, gain: 0.6 });

    act(2.6, 'assembles call 1');
    s.set(2.6, 'input', 'alpha', 1, 0.5); s.set(2.6, 'input', 'status', 'draft', 0); s.set(2.6, 'input', 'statusColor', T.accent, 0);
    for (const i of [0, 1, 2]) s.set(2.6, 'input', 'r' + i + 'Slot', 1, 0);
    s.set(2.6, 'input', 'r2SlotText', 'no contract', 0);
    show(3.1, 'input', 0, 'instructions'); s.sfx(3.1, 'store', { note: N.input, gain: 0.6 });
    show(3.5, 'input', 1, 'task: fix invoice timeout'); s.sfx(3.5, 'store', { note: N.input, gain: 0.6 });
    s.set(4.1, 'app', 'status', '', 0);

    s.set(4.3, 'model', 'alpha', 1, 0.5); s.set(4.3, 'model', 'status', 'idle', 0); s.set(4.3, 'model', 'statusColor', T.mid, 0);
    for (const i of [0, 1, 2]) s.set(4.3, 'model', 'r' + i + 'Slot', 1, 0);
    s.set(4.3, 'wire:feed', 'alpha', 1, 0.5);
    s.sfx(4.3, 'ack', { note: N.model, gain: 0.45 });

    const r1 = send(5.6, 1);
    show(r1 + 0.25, 'model', 0, 'instructions'); s.sfx(r1 + 0.25, 'ack', { note: N.model, gain: 0.6 });
    show(r1 + 0.55, 'model', 1, 'task'); s.sfx(r1 + 0.55, 'ack', { note: N.model, gain: 0.6 });
    show(r1 + 1.1, 'app', 0, 'call 1'); s.set(r1 + 1.1, 'app', 'r0Slot', 0, 0.2); s.set(r1 + 1.1, 'app', 'r0Right', 'sent', 0);
    s.sfx(r1 + 1.1, 'store', { note: N.app, gain: 0.55 });
    // The gap: the contract is on disk while the model's third slot stays empty.
    const g = r1 + 2.2;
    hl(g, 'repo', 2, T.fg, 1.6); s.sfx(g, 'ack', { note: N.repo, gain: 0.7 });
    s.set(g + 0.5, 'model', 'r2SlotColor', T.mid, 0.2); s.set(g + 0.5, 'model', 'r2SlotText', 'no contract', 0);
    s.sfx(g + 0.5, 'ack', { note: 'C4', gain: 0.6 });

    // ---------- Beat 2: call 2 starts fresh; the application reads and copies the contract ----------
    const c2 = 11.4;
    act(c2, 'starts call 2'); s.sfx(c2, 'clock', { gain: 0.7 }); s.sfx(c2 + 0.25, 'clock', { gain: 0.7 });
    s.set(c2, 'input', 'title', 'input · call 2', 0); s.pulse(c2, 'input');
    s.set(c2, 'input', 'status', 'draft', 0); s.set(c2, 'input', 'statusColor', T.accent, 0);
    for (const i of [0, 1]) { s.set(c2, 'input', 'r' + i + 'Alpha', 0, 0.3); s.set(c2, 'input', 'r' + i + 'Slot', 1, 0.3); }
    for (const i of [0, 1]) { s.set(c2 + 0.3, 'model', 'r' + i + 'Alpha', 0, 0.35); s.set(c2 + 0.3, 'model', 'r' + i + 'Slot', 1, 0.35); }
    s.set(c2 + 0.3, 'model', 'r2SlotText', '', 0); s.set(c2 + 0.3, 'model', 'r2SlotColor', T.dim, 0.2);
    s.set(c2 + 0.3, 'model', 'status', 'idle', 0); s.set(c2 + 0.3, 'model', 'statusColor', T.mid, 0);
    s.sfx(c2 + 0.3, 'poof', { gain: 0.45 });
    show(c2 + 0.9, 'input', 0, 'instructions'); s.sfx(c2 + 0.9, 'store', { note: N.input, gain: 0.5 });
    show(c2 + 1.25, 'input', 1, 'task: fix invoice timeout'); s.sfx(c2 + 1.25, 'store', { note: N.input, gain: 0.5 });
    s.set(c2 + 1.8, 'app', 'status', '', 0);

    const rd = 13.8;
    act(rd, 'reads invoice-v1.md'); s.sfx(rd, 'send', { note: 'C6', gain: 0.8 });
    s.packet({ route: [[700, 722], [700, 1014]], t: rd + 0.1, dur: 0.6, kind: 'dot', color: T.accent });
    s.set(rd + 0.7, 'repo', 'r1Line', T.accent, 0.2); s.set(rd + 0.7, 'repo', 'r1Color', T.accent, 0.2);
    s.set(rd + 0.7, 'repo', 'r2HlColor', T.accent, 0); s.set(rd + 0.7, 'repo', 'r2Hl', 1, 0.25);
    s.ripple(rd + 0.7, [700, 1014], T.accent);
    s.sfx(rd + 0.7, 'arrive', { note: N.repo });

    const cp = 15.9;
    act(cp, 'copies excerpt');
    s.set(cp, 'copy', 'prog', 1, 0.9, 'inOut'); s.sfx(cp, 'send', { note: 'E6', gain: 0.6, pan: -0.5 });
    s.set(cp + 0.9, 'input', 'r2Slot', 0, 0.2); s.set(cp + 0.9, 'input', 'r2SlotText', '', 0);
    show(cp + 0.9, 'input', 2, 'keep total_cents', T.fg); s.set(cp + 0.9, 'input', 'r2Mark', 1, 0.3);
    s.ripple(cp + 0.9, [84, 1376], T.accent, { r1: 60 });
    s.sfx(cp + 0.9, 'store', { note: N.input, gain: 1.0, pan: -0.3 });
    // The source stays where it was: both copies flash together.
    s.set(cp + 1.8, 'copy', 'alpha', 0, 0.5); s.set(cp + 1.8, 'app', 'status', '', 0);
    s.set(cp + 1.8, 'repo', 'r2Hl', 0, 0.5); s.set(cp + 1.8, 'repo', 'r1Line', T.dim, 0.5); s.set(cp + 1.8, 'repo', 'r1Color', T.fg, 0.5);
    hl(cp + 2.3, 'repo', 2, T.fg, 0.9); hl(cp + 2.3, 'input', 2, T.fg, 0.9);
    s.sfx(cp + 2.3, 'ack', { note: N.repo, gain: 0.55 }); s.sfx(cp + 2.45, 'ack', { note: N.input, gain: 0.55 });

    // ---------- Beat 3: call 2 is sent; the model receives all three items ----------
    const r2 = send(20.6, 2);
    show(r2 + 0.25, 'model', 0, 'instructions'); s.sfx(r2 + 0.25, 'ack', { note: N.model, gain: 0.6 });
    show(r2 + 0.55, 'model', 1, 'task'); s.sfx(r2 + 0.55, 'ack', { note: N.model, gain: 0.6 });
    s.set(r2 + 0.95, 'model', 'r2Slot', 0, 0.2);
    show(r2 + 0.95, 'model', 2, 'keep total_cents', T.accent);
    s.sfx(r2 + 0.95, 'hit', { gain: 0.8 });
    show(r2 + 1.6, 'app', 1, 'call 2'); s.set(r2 + 1.6, 'app', 'r1Slot', 0, 0.2); s.set(r2 + 1.6, 'app', 'r1Right', 'sent', 0);
    s.sfx(r2 + 1.6, 'store', { note: N.app, gain: 0.55 });
    hl(r2 + 2.8, 'model', 2, T.accent, 1.4); s.sfx(r2 + 2.8, 'ack', { note: N.model, gain: 0.6 });

    // ---------- Beat 4: check what each call actually included ----------
    const ck = 28.4;
    act(ck, 'checks log'); s.sfx(ck, 'send', { note: 'C6', gain: 0.7 });
    for (const id of ['repo', 'input', 'model']) s.set(ck, id, 'alpha', 0.45, 0.6);
    s.set(ck, 'wire:feed', 'alpha', 0.4, 0.6);
    hl(ck + 0.8, 'app', 0, T.fg, 1.0);
    s.set(ck + 1.2, 'app', 'r0Right', 'contract missing', 0); s.set(ck + 1.2, 'app', 'r0RightColor', T.bad, 0);
    s.set(ck + 1.2, 'app', 'r0Icon', 'x', 0); s.set(ck + 1.2, 'app', 'r0IconK', 1, 0.35);
    s.sfx(ck + 1.2, 'miss', { gain: 0.9 });
    hl(ck + 3.2, 'app', 1, T.fg, 1.0);
    s.set(ck + 3.6, 'app', 'r1Right', 'contract included', 0); s.set(ck + 3.6, 'app', 'r1RightColor', T.ok, 0);
    s.set(ck + 3.6, 'app', 'r1Icon', 'check', 0); s.set(ck + 3.6, 'app', 'r1IconK', 1, 0.35);
    s.sfx(ck + 3.6, 'chime', { gain: 0.9 });
    s.set(ck + 4.8, 'app', 'status', '', 0);
    // Hold the audited log, then end on black (finite ending).
    s.fade(38.6, 1, 1.2);
    s.meta.duration = 40.4;
  },
});
