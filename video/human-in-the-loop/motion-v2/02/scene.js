/* Human-in-the-loop — motion-v2 lesson 02: Give the reviewer evidence.
 * One mechanism: a vague "ship the fix?" gives a reviewer nothing to inspect. The request is rewritten as a
 * concrete action (deploy checkout, artifact A · 7c2e…91af, production) with evidence for that same A
 * (two observed tests, a risk and a recovery). The human approves A deliberately, and the decision record
 * copies the exact action, target and artifact. The executor will check that identity; it has not run.
 * Render from the repository root (pinned puppeteer-core from root node_modules):
 *   node video/human-in-the-loop/motion-v2/02/engine/render.mjs video/human-in-the-loop/motion-v2/02/scene.js video/human-in-the-loop/motion-v2/02/video.mp4 --sheet video/human-in-the-loop/motion-v2/02/scratch/contact-sheet.png
 * Local engine copy: 'panel', 'txt' (reveal, hl, bar, strike), 'tick' (check or x), chip size, meta.subtitleSize.
 */
FlowVideo.scene({
  meta: { title: 'Human in the loop', subtitle: 'GIVE THE REVIEWER EVIDENCE', subtitleSize: 38, duration: 44, fps: 30, speed: 1 },
  build(s) {
    const T = s.THEME;
    const show = (t, id, d = 0.3) => s.set(t, id, 'alpha', 1, d);
    const hide = (t, id, d = 0.3) => s.set(t, id, 'alpha', 0, d);
    const flash = (t, id, color, hold = 0.6) => { s.set(t, id, 'hlColor', color, 0); s.set(t, id, 'hl', 1, 0.15); s.set(t + hold, id, 'hl', 0, 0.4); };
    const lightPanel = (t, id, c = T.mid) => { s.set(t, id, 'color', c, 0.3); s.set(t, id, 'titleColor', T.fg, 0.3); };
    const row = (id, x, y, text, o = {}) => s.node(id, 'txt', Object.assign({ x, y, text, size: 42, mono: true, color: T.fg, alpha: 0 }, o));

    // ---- review request ----
    s.node('req', 'panel', { x: 540, y: 600, w: 960, h: 270, title: 'REVIEW REQUEST', status: '', statusColor: T.mid, color: T.dim, titleColor: T.mid });
    row('vague', 100, 590, '"ship the fix?"', { size: 48, weight: 700, color: T.mid });
    const RQ = [['action', 'deploy checkout', T.fg], ['artifact', 'A · 7c2e…91af', T.info], ['target', 'production', T.fg]];
    const RY = [568, 628, 688];
    RQ.forEach(([k, v, c], i) => { row('qk' + i, 100, RY[i], k, { color: T.mid }); row('qv' + i, 330, RY[i], v, { weight: 700, color: c, hlW: v.length * 25.2 }); });

    // ---- evidence for A, in two tabs ----
    s.node('evp', 'panel', { x: 540, y: 975, w: 960, h: 420, title: 'EVIDENCE FOR A', color: T.dim, titleColor: T.mid });
    row('tabT', 100, 885, 'tests', { size: 44, weight: 700, color: T.fg, barColor: T.fg, hlW: 132 });
    row('tabR', 300, 885, 'risks', { size: 44, weight: 700, color: T.mid, barColor: T.fg, hlW: 132 });
    row('t1', 100, 968, 'empty pw → rejected', { hlW: 479 });
    row('t2', 100, 1034, 'valid pw → accepted', { hlW: 479 });
    s.node('k1', 'tick', { x: 650, y: 964, r: 20 }); s.node('k2', 'tick', { x: 650, y: 1030, r: 20 });
    row('src', 100, 1110, 'source  test run T7 on A', { size: 38, color: T.mid });
    row('r1', 100, 968, 'risk      brief restart', { hlW: 580 });
    row('r2', 100, 1034, 'recovery  prior release', { hlW: 580 });

    // ---- human review ----
    s.node('rev', 'panel', { x: 540, y: 1270, w: 960, h: 110, title: 'HUMAN REVIEW', titleY: 58, color: T.dim, titleColor: T.mid });
    s.node('btn', 'panel', { x: 860, y: 1270, w: 250, h: 72, r: 14, color: T.dim, alpha: 0 });
    row('btnT', 860, 1272, 'Approve A', { size: 40, weight: 700, align: 'center', color: T.mid });

    // ---- the decision record ----
    s.node('dec', 'panel', { x: 540, y: 1485, w: 960, h: 260, title: 'DECISION', status: 'pending', statusColor: T.accent, color: T.dim, titleColor: T.mid });
    const DQ = [['action', 'deploy checkout', T.fg], ['target', 'production', T.fg], ['artifact', 'A · 7c2e…91af', T.info]];
    const DY = [1462, 1518, 1574];
    DQ.forEach(([k, v, c], i) => { row('dk' + i, 100, DY[i], k, { color: T.mid }); row('dv' + i, 330, DY[i], v, { weight: 700, color: c, hlW: v.length * 25.2 }); });

    // ---- the executor has not run ----
    s.node('ex', 'panel', { x: 540, y: 1715, w: 960, h: 150, title: 'EXECUTOR', status: 'not run', statusColor: T.mid, color: T.dim, titleColor: T.mid });
    row('exR', 100, 1758, 'will check  A · 7c2e…91af', { size: 40, color: T.fg, hlW: 600 });

    // copy routes in the right margin: request field → decision field
    const SRC = [0, 2, 1];   // decision rows take request rows action, target, artifact
    DY.forEach((y, i) => { s.wire('cp' + i, [1026, RY[SRC[i]]], [1026, y], { via: [[1052, RY[SRC[i]]], [1052, y]] }); s.set(0, 'wire:cp' + i, 'alpha', 0, 0); });

    // ==== Beat 1: name the artifact and its destination (0–9) ====
    let t = 0.6;
    lightPanel(t, 'req'); show(t, 'vague');
    s.set(t, 'req', 'status', 'vague', 0); s.set(t, 'req', 'statusColor', T.mid, 0);
    s.sfx(t, 'arrive', { note: 'C5', gain: 0.8, pan: 0 });
    t = 1.9;    // nothing to inspect
    s.pulse(t, 'evp'); s.sfx(t, 'miss', { gain: 0.6, pan: 0 });
    t = 3.4;
    s.set(t, 'vague', 'strike', 1, 0.5, 'linear'); hide(t + 0.7, 'vague', 0.3); s.set(t + 0.7, 'req', 'status', '', 0);
    s.sfx(t, 'ack', { note: 'C4', gain: 1.3, pan: 0 });
    RQ.forEach((q, i) => {
      const tq = 4.4 + i * 0.9;
      show(tq, 'qk' + i, 0.2); show(tq, 'qv' + i, 0.2); flash(tq, 'qv' + i, i === 1 ? T.info : T.fg, 0.6);
      s.sfx(tq, 'ack', { note: i === 1 ? 'C6' : 'C5', gain: 1.3, pan: -0.2 });
    });

    // ==== Beat 2: evidence for A — observed tests (9–19) ====
    t = 9.0;
    lightPanel(t, 'evp'); show(t, 'tabT'); show(t, 'tabR'); s.set(t, 'tabT', 'bar', 1, 0.3);
    s.sfx(t, 'arrive', { note: 'E5', pan: 0 });
    [['t1', 'k1', 10.2], ['t2', 'k2', 12.0]].forEach(([r, k, tr]) => {
      show(tr, r, 0.25); s.sfx(tr, 'deliver', { note: 'E5', gain: 1.0, pan: -0.2 });
      s.set(tr + 0.6, k, 'draw', 1, 0.3, 'out'); s.sfx(tr + 0.6, 'ack', { note: 'E5', gain: 1.2, pan: 0.3 });
    });
    t = 13.6; show(t, 'src', 0.3);
    t = 15.0;   // the human inspects the observed results
    lightPanel(t, 'rev'); show(t, 'btn'); show(t, 'btnT'); s.sfx(t, 'arrive', { note: 'G5', gain: 0.9, pan: 0 });
    flash(15.8, 't1', T.fg, 0.9); s.sfx(15.8, 'ack', { note: 'G5', gain: 1.2, pan: 0 });
    flash(16.8, 't2', T.fg, 0.9); s.sfx(16.8, 'ack', { note: 'G5', gain: 1.2, pan: 0 });

    // ==== Beat 2b: risks and recovery (19.5–27) ====
    t = 19.5;
    s.set(t, 'tabT', 'bar', 0, 0.2); s.set(t, 'tabT', 'color', T.mid, 0.2);
    s.set(t, 'tabR', 'bar', 1, 0.3); s.set(t, 'tabR', 'color', T.fg, 0.2);
    for (const id of ['t1', 't2', 'k1', 'k2', 'src']) hide(t, id, 0.25);
    s.sfx(t, 'send', { note: 'G6', gain: 0.9, pan: -0.3 });
    t = 20.4; show(t, 'r1', 0.25); s.sfx(t, 'ack', { note: 'E4', gain: 1.4, pan: -0.2 });
    t = 21.4; show(t, 'r2', 0.25); s.sfx(t, 'ack', { note: 'E4', gain: 1.4, pan: -0.2 });
    flash(22.8, 'r1', T.fg, 0.9); s.sfx(22.8, 'ack', { note: 'G5', gain: 1.2, pan: 0 });
    flash(23.8, 'r2', T.fg, 0.9); s.sfx(23.8, 'ack', { note: 'G5', gain: 1.2, pan: 0 });

    // ==== Beat 3: decide about A; store the action it applies to (26.5–36) ====
    t = 26.5;   // look at exactly what will change
    flash(t, 'qv0', T.fg, 0.8); flash(t, 'qv2', T.fg, 0.8); s.sfx(t, 'ack', { note: 'G5', gain: 1.2, pan: 0 });
    flash(t + 1.0, 'qv1', T.info, 0.8); s.sfx(t + 1.0, 'ack', { note: 'G5', gain: 1.2, pan: 0 });
    t = 28.8;   // deliberate approval of A
    s.set(t, 'btn', 'color', T.ok, 0.15); s.set(t, 'btn', 'glow', 0.8, 0.15); s.set(t + 0.5, 'btn', 'glow', 0, 0.5);
    s.set(t, 'btnT', 'color', T.ok, 0.15);
    s.sfx(t, 'chime', { note: 'G5', gain: 0.6, pan: 0.6 });
    t = 29.6;
    lightPanel(t, 'dec'); s.set(t, 'dec', 'status', 'approved · R1', 0); s.set(t, 'dec', 'statusColor', T.ok, 0);
    s.sfx(t, 'store', { note: 'C6', pan: 0 });
    DY.forEach((y, i) => {
      const tc = 30.6 + i * 1.1, src = SRC[i];
      s.set(tc, 'wire:cp' + i, 'alpha', 1, 0.2); s.set(tc, 'wire:cp' + i, 'color', T.info, 0); s.set(tc, 'wire:cp' + i, 'flow', 1, 0);
      flash(tc, 'qv' + src, T.info, 0.7);
      s.packet({ route: [[1026, RY[src]], [1052, RY[src]], [1052, y], [1026, y]], t: tc, dur: 0.8, kind: 'dot', color: T.info });
      s.set(tc + 0.8, 'wire:cp' + i, 'alpha', 0, 0.4); s.set(tc + 0.8, 'wire:cp' + i, 'flow', 0, 0);
      show(tc + 0.8, 'dk' + i, 0.2); show(tc + 0.8, 'dv' + i, 0.2); flash(tc + 0.8, 'dv' + i, T.info, 0.7);
      s.sfx(tc + 0.8, 'ack', { note: 'C6', gain: 1.2, pan: 0.6 });
    });

    // ==== Beat 4: approval refers to A; execution must check that identity (37–44) ====
    t = 37.0;
    lightPanel(t, 'ex'); show(t, 'exR');
    s.sfx(t, 'ack', { note: 'A4', gain: 1.4, pan: 0 });
    t = 38.0;
    flash(t, 'dv2', T.info, 1.0); flash(t, 'exR', T.info, 1.0); flash(t, 'qv1', T.info, 1.0);
    s.sfx(t, 'ack', { note: 'C6', gain: 1.1, pan: 0 });

    s.fade(42.0, 1, 1.0);
    s.meta.duration = 44.0;
  },
});
