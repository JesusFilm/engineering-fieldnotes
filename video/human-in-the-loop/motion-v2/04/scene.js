/* Human-in-the-loop — motion-v2 lesson 04: Reject an approval mismatch.
 * One mechanism: the recorded approval (R1) names deploy · production · A. An edit produces B and the request
 * now names B. The executor compares the approved and requested action field by field: action and target
 * match, the artifact does not. Execution is blocked with 0 deploy calls and production unchanged, and B is
 * sent to its own review with its own evidence; the approval for A is not transferred.
 * Render from the repository root (pinned puppeteer-core from root node_modules):
 *   node video/human-in-the-loop/motion-v2/04/engine/render.mjs video/human-in-the-loop/motion-v2/04/scene.js video/human-in-the-loop/motion-v2/04/video.mp4 --sheet video/human-in-the-loop/motion-v2/04/scratch/contact-sheet.png
 * Local engine copy: 'panel', 'txt' (reveal, hl, hlH, bar, strike), 'tick' (check or x), chip size, meta.subtitleSize.
 */
FlowVideo.scene({
  meta: { title: 'Human in the loop', subtitle: 'REJECT AN APPROVAL MISMATCH', subtitleSize: 38, duration: 45, fps: 30, speed: 1 },
  build(s) {
    const T = s.THEME;
    const show = (t, id, d = 0.3) => s.set(t, id, 'alpha', 1, d);
    const flash = (t, id, color, hold = 0.6) => { s.set(t, id, 'hlColor', color, 0); s.set(t, id, 'hl', 1, 0.15); s.set(t + hold, id, 'hl', 0, 0.4); };
    const lightPanel = (t, id, c = T.mid) => { s.set(t, id, 'color', c, 0.3); s.set(t, id, 'titleColor', T.fg, 0.3); };
    const row = (id, x, y, text, o = {}) => s.node(id, 'txt', Object.assign({ x, y, text, size: 42, mono: true, color: T.fg, alpha: 0, hlH: 50 }, o));
    const setText = (t, id, text, color) => { s.set(t, id, 'text', text, 0); if (color) s.set(t, id, 'color', color, 0); };

    // ---- builds, with the current pointer ----
    s.node('bld', 'panel', { x: 540, y: 545, w: 960, h: 150, title: 'BUILDS', status: '', statusColor: T.accent, color: T.dim, titleColor: T.mid });
    row('bA', 100, 584, 'A · 7c2e…91af', { color: T.info, hlW: 328 });
    row('bB', 560, 584, 'B · 92bd…04c8', { color: T.info, hlW: 328 });
    s.wire('edit', [440, 584], [540, 584]); s.set(0, 'wire:edit', 'alpha', 0, 0);

    // ---- field-by-field comparison ----
    s.node('cmp', 'panel', { x: 540, y: 838, w: 960, h: 376, title: 'COMPARE', color: T.dim, titleColor: T.mid });
    row('hA', 330, 764, 'approved · R1', { size: 38, weight: 700, color: T.ok });
    row('hR', 660, 764, 'requested', { size: 38, weight: 700, color: T.fg });
    const F = [['action', 'deploy', 'deploy'], ['target', 'production', 'production'], ['artifact', 'A · 7c2e…', 'A · 7c2e…']];
    const FY = [830, 890, 950];
    F.forEach(([k, a, q], i) => {
      row('fk' + i, 100, FY[i], k, { size: 40, color: T.mid });
      row('fa' + i, 330, FY[i], a, { size: 40, weight: 700, color: i === 2 ? T.info : T.fg, hlW: 240 });
      row('fr' + i, 660, FY[i], q, { size: 40, weight: 700, color: i === 2 ? T.info : T.fg, hlW: 240 });
      s.node('mk' + i, 'tick', { x: 960, y: FY[i] - 2, r: 18, shape: i === 2 ? 'x' : 'check', color: i === 2 ? T.bad : T.ok });
    });

    // ---- executor ----
    s.node('ex', 'panel', { x: 540, y: 1180, w: 960, h: 264, title: 'EXECUTOR', status: 'idle', statusColor: T.mid, color: T.dim, titleColor: T.mid });
    row('exR', 100, 1166, 'result      —', { size: 40, color: T.mid, hlW: 600 });
    row('exC', 100, 1220, 'deploy calls 0', { size: 40, color: T.fg, hlW: 340 });
    row('exP', 100, 1274, 'production  previous', { size: 40, color: T.fg, hlW: 490 });

    // ---- a new review for B ----
    s.node('rv', 'panel', { x: 540, y: 1474, w: 960, h: 290, title: 'REVIEW', status: '', statusColor: T.accent, color: T.dim, titleColor: T.mid });
    row('rv0', 100, 1462, 'artifact  B · 92bd…04c8', { size: 40, hlW: 560 });
    row('rv1', 100, 1518, 'evidence  T8 on B', { size: 40, hlW: 420 });
    row('rv2', 100, 1574, 'decision  pending', { size: 40, color: T.accent, hlW: 420 });
    s.wire('toRv', [1026, FY[2]], [1026, 1462], { via: [[1052, FY[2]], [1052, 1462]] }); s.set(0, 'wire:toRv', 'alpha', 0, 0);

    // ==== Beat 1: the artifact changes; the approval still names A (0–10) ====
    let t = 0.6;
    lightPanel(t, 'bld'); show(t, 'bA'); s.set(t, 'bld', 'status', 'current A', 0); flash(t, 'bA', T.accent, 0.8);
    s.sfx(t, 'arrive', { note: 'C5', pan: -0.3 });
    t = 1.6;
    lightPanel(t, 'cmp'); show(t, 'hA'); F.forEach((f, i) => { show(t, 'fk' + i); show(t + 0.2 * i, 'fa' + i); });
    s.sfx(t, 'arrive', { note: 'E5', gain: 0.9, pan: -0.3 });
    t = 2.8;
    show(t, 'hR'); F.forEach((f, i) => show(t + 0.2 * i, 'fr' + i));
    s.sfx(t, 'ack', { note: 'C5', gain: 1.2, pan: 0.3 });
    t = 4.4;    // an edit produces B
    s.set(t, 'wire:edit', 'alpha', 1, 0.2); s.set(t, 'wire:edit', 'color', T.fg, 0); s.set(t, 'wire:edit', 'flow', 1, 0);
    s.packet({ route: [[440, 584], [540, 584]], t, dur: 0.5, kind: 'dot', color: T.fg });
    s.sfx(t, 'send', { note: 'C6', gain: 0.9, pan: 0 });
    show(t + 0.5, 'bB', 0.3); s.sfx(t + 0.5, 'store', { note: 'C5', pan: 0.3 });
    s.set(t + 0.9, 'wire:edit', 'alpha', 0.4, 0.4); s.set(t + 0.9, 'wire:edit', 'flow', 0, 0);
    t = 5.6;
    s.set(t, 'bld', 'status', 'current B', 0); flash(t, 'bB', T.accent, 0.8); s.set(t, 'bA', 'color', T.mid, 0.4);
    s.sfx(t, 'arrive', { note: 'C5', pan: 0.3 });
    t = 6.6;    // the request now names B; the approval does not change
    setText(t, 'fr2', 'B · 92bd…', T.info); flash(t, 'fr2', T.accent, 0.9);
    s.sfx(t, 'ack', { note: 'C5', gain: 1.3, pan: 0.3 });
    t = 7.6; flash(t, 'fa2', T.ok, 0.9); flash(t, 'hA', T.ok, 0.9);
    s.sfx(t, 'ack', { note: 'E5', gain: 1.2, pan: -0.3 });
    t = 8.4; lightPanel(t, 'ex'); show(t, 'exR'); show(t, 'exC'); show(t, 'exP');
    s.sfx(t, 'ack', { note: 'G4', gain: 1.3, pan: 0 });

    // ==== Beat 2: the executor compares field by field (11–20) ====
    t = 11.0;
    s.set(t, 'ex', 'status', 'checking', 0); s.set(t, 'ex', 'statusColor', T.accent, 0); s.set(t, 'ex', 'color', T.fg, 0.2);
    s.sfx(t, 'work', { note: 'G4', gain: 1.3, pan: 0 });
    [[0, 11.8], [1, 13.6]].forEach(([i, tr]) => {
      flash(tr, 'fa' + i, T.fg, 1.0); flash(tr, 'fr' + i, T.fg, 1.0);
      s.sfx(tr, 'work', { note: 'G4', gain: 1.2, pan: 0 });
      s.set(tr + 0.8, 'mk' + i, 'draw', 1, 0.3, 'out'); s.sfx(tr + 0.8, 'ack', { note: 'G5', gain: 1.2, pan: 0.6 });
    });
    t = 15.6;   // the artifact: held side by side before the verdict
    s.set(t, 'fa2', 'hlColor', T.accent, 0); s.set(t, 'fa2', 'hl', 1, 0.2); s.set(t, 'fr2', 'hlColor', T.accent, 0); s.set(t, 'fr2', 'hl', 1, 0.2);
    s.sfx(t, 'work', { note: 'G4', gain: 1.2, pan: 0 });
    t = 17.4;
    s.set(t, 'mk2', 'draw', 1, 0.35, 'out');
    s.set(t, 'fa2', 'hlColor', T.bad, 0.2); s.set(t, 'fr2', 'hlColor', T.bad, 0.2);
    setText(t, 'exR', 'result      mismatch', T.bad); flash(t, 'exR', T.bad, 0.9);
    s.sfx(t, 'miss', { gain: 1.0, pan: 0.6 });
    s.set(t + 1.6, 'fa2', 'hl', 0, 0.5); s.set(t + 1.6, 'fr2', 'hl', 0, 0.5);

    // ==== Beat 3: execution is blocked; no deployment (20–28) ====
    t = 20.2;
    s.set(t, 'ex', 'status', 'blocked', 0); s.set(t, 'ex', 'statusColor', T.bad, 0);
    s.set(t, 'ex', 'color', T.bad, 0.15); s.shake(t, 'ex', 8, 0.4);
    s.sfx(t, 'thump', { note: 'G3', gain: 1.1, pan: 0 });
    t = 21.6; flash(t, 'exC', T.fg, 1.0); s.sfx(t, 'ack', { note: 'G4', gain: 1.3, pan: 0 });
    t = 22.8; flash(t, 'exP', T.mid, 1.0); s.sfx(t, 'ack', { note: 'C4', gain: 1.3, pan: 0 });

    // ==== Beat 4: B needs its own review; approval does not transfer (28–37) ====
    t = 28.0;
    s.set(t, 'wire:toRv', 'alpha', 1, 0.2); s.set(t, 'wire:toRv', 'color', T.info, 0); s.set(t, 'wire:toRv', 'flow', 1, 0);
    flash(t, 'fr2', T.info, 0.8);
    s.packet({ route: [[1026, FY[2]], [1052, FY[2]], [1052, 1462], [1026, 1462]], t, dur: 1.0, kind: 'dot', color: T.info });
    s.sfx(t, 'send', { note: 'E6', gain: 0.9, pan: 0.8 });
    t = 29.0;
    s.set(t, 'wire:toRv', 'alpha', 0, 0.4); s.set(t, 'wire:toRv', 'flow', 0, 0);
    lightPanel(t, 'rv'); s.set(t, 'rv', 'title', 'REVIEW B', 0); s.set(t, 'rv', 'status', 'new', 0);
    show(t, 'rv0'); flash(t, 'rv0', T.info, 0.8);
    s.sfx(t, 'arrive', { note: 'A5', pan: 0 });
    t = 30.4; show(t, 'rv1'); flash(t, 'rv1', T.fg, 0.8); s.sfx(t, 'store', { note: 'E5', pan: 0 });
    t = 31.8; show(t, 'rv2'); s.set(t, 'rv', 'status', 'pending', 0); s.sfx(t, 'ack', { note: 'A4', gain: 1.3, pan: 0 });
    t = 33.2; flash(t, 'fa2', T.ok, 0.9); flash(t, 'hA', T.ok, 0.9); s.sfx(t, 'ack', { note: 'E5', gain: 1.1, pan: -0.3 });

    // ==== Beat 5: hold the bounded result (37–45) ====
    t = 37.0; flash(t, 'fa2', T.ok, 0.8); s.sfx(t, 'ack', { note: 'C5', gain: 1.1, pan: -0.3 });
    t = 38.0; flash(t, 'fr2', T.info, 0.8); s.sfx(t, 'ack', { note: 'E5', gain: 1.1, pan: 0.3 });
    t = 39.0; flash(t, 'rv2', T.accent, 0.8); s.sfx(t, 'ack', { note: 'A4', gain: 1.1, pan: 0 });

    s.fade(43.0, 1, 1.0);
    s.meta.duration = 45.0;
  },
});
