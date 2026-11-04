/* Human-in-the-loop — motion-v2 lesson 01: Propose, review, execute.
 * One mechanism: preparing is not permission. The agent (can build) fills in proposal A and has no route
 * to production. A human (can decide) reviews it; the decision is still pending. The executor (can deploy)
 * receives the proposal, finds its decision slot missing, and waits: deploy calls stay at 0 and
 * production keeps its previous release.
 * Render from the repository root (pinned puppeteer-core from root node_modules):
 *   node video/human-in-the-loop/motion-v2/01/engine/render.mjs video/human-in-the-loop/motion-v2/01/scene.js video/human-in-the-loop/motion-v2/01/video.mp4 --sheet video/human-in-the-loop/motion-v2/01/scratch/contact-sheet.png
 * Local engine copy: 'panel', 'txt' (reveal, hl, bar, strike), 'tick' (check or x), chip size, meta.subtitleSize.
 */
FlowVideo.scene({
  meta: { title: 'Human in the loop', subtitle: 'PROPOSE · REVIEW · EXECUTE', subtitleSize: 38, duration: 40, fps: 30, speed: 1 },
  build(s) {
    const T = s.THEME;
    const pan = (a) => s.panOf(a);
    const show = (t, id, d = 0.3) => s.set(t, id, 'alpha', 1, d);
    const flash = (t, id, color, hold = 0.6) => { s.set(t, id, 'hlColor', color, 0); s.set(t, id, 'hl', 1, 0.15); s.set(t + hold, id, 'hl', 0, 0.4); };
    const lightPanel = (t, id, c = T.mid) => { s.set(t, id, 'color', c, 0.3); s.set(t, id, 'titleColor', T.fg, 0.3); };
    const row = (id, x, y, text, o = {}) => s.node(id, 'txt', Object.assign({ x, y, text, size: 40, mono: true, color: T.fg, alpha: 0 }, o));

    // ---- roles: who can do what ----
    s.node('roles', 'panel', { x: 540, y: 559, w: 960, h: 188, title: 'ROLES', color: T.dim, titleColor: T.mid });
    row('rAgent', 100, 564, 'agent', { weight: 700, color: T.info, size: 42 });
    row('rAgentCan', 270, 564, 'can build', { color: T.mid, hlW: 216 });
    row('rAgentNow', 560, 564, 'preparing', { color: T.info, hlW: 216 });
    row('rHuman', 100, 614, 'human', { weight: 700, color: T.fg, size: 42 });
    row('rHumanCan', 270, 614, 'can decide', { color: T.mid, hlW: 240 });
    row('rHumanNow', 560, 614, '—', { color: T.dim, hlW: 216 });

    // ---- the proposal record (stays in place while ownership changes) ----
    s.node('prop', 'panel', { x: 540, y: 890, w: 960, h: 450, title: 'PROPOSAL A', status: '', statusColor: T.mid, color: T.dim, titleColor: T.mid });
    const F = [['service', 'checkout'], ['action', 'deploy'], ['target', 'production'], ['evidence', 'tests passed']];
    const FY = [790, 850, 910, 970];
    F.forEach(([k, v], i) => {
      row('fk' + i, 100, FY[i], k, { color: T.mid });
      row('fv' + i, 420, FY[i], v, { size: 44, weight: 700, color: i === 3 ? T.ok : T.info, hlW: v.length * 26.4 });
    });
    row('decK', 100, 1062, 'decision', { color: T.mid });
    row('decV', 420, 1062, 'pending', { size: 44, weight: 700, color: T.accent, hlW: 185 });

    // ---- executor: the only part that can deploy ----
    s.node('exec', 'panel', { x: 540, y: 1310, w: 960, h: 330, title: 'EXECUTOR', status: '', statusColor: T.mid, color: T.dim, titleColor: T.mid });
    row('eCan', 100, 1258, 'can deploy', { color: T.mid, hlW: 240 });
    row('ePk', 100, 1316, 'proposal', { color: T.mid });
    row('ePv', 420, 1316, '—', { size: 44, weight: 700, color: T.dim, hlW: 120 });
    row('eDk', 100, 1374, 'decision', { color: T.mid });
    row('eDv', 420, 1374, '—', { size: 44, weight: 700, color: T.dim, hlW: 185 });
    row('eCk', 100, 1432, 'deploy calls', { color: T.mid });
    row('eCv', 420, 1432, '0', { size: 44, weight: 700, color: T.fg, hlW: 30 });

    // ---- production: never touched ----
    s.node('prod', 'panel', { x: 540, y: 1590, w: 960, h: 160, title: 'PRODUCTION · CHECKOUT', color: T.dim, titleColor: T.mid });
    row('pv', 100, 1626, 'current   previous release', { size: 42, color: T.fg, alpha: 1, hlW: 655 });

    // routes
    s.wire('nopath', [60, 564], [36, 1458], { via: [[36, 564]] });
    s.set(0, 'wire:nopath', 'dashed', 1, 0); s.set(0, 'wire:nopath', 'alpha', 0, 0);
    s.node('block', 'tick', { x: 36, y: 1492, r: 14, shape: 'x', color: T.mid });
    s.wire('req', [1026, 1062], [1026, 1316], { via: [[1052, 1062], [1052, 1316]] });
    s.set(0, 'wire:req', 'alpha', 0, 0);
    lightPanel(0, 'prod', T.dim);

    // ==== Beat 1: the agent prepares a proposal; it deploys nothing (0–10.5) ====
    let t = 0.6;
    lightPanel(t, 'roles'); show(t, 'rAgent'); show(t, 'rAgentCan'); show(t, 'rAgentNow');
    show(t + 0.3, 'rHuman'); show(t + 0.3, 'rHumanCan'); show(t + 0.3, 'rHumanNow');
    flash(t, 'rAgentNow', T.info, 0.8);
    s.sfx(t, 'arrive', { note: 'C5', pan: 0 });
    t = 1.6;
    lightPanel(t, 'prop'); s.set(t, 'prop', 'status', 'draft', 0); s.set(t, 'prop', 'statusColor', T.info, 0);
    F.forEach((f, i) => {
      const tf = 2.6 + i * 1.1;
      show(tf, 'fk' + i, 0.2); show(tf, 'fv' + i, 0.2); flash(tf, 'fv' + i, i === 3 ? T.ok : T.info, 0.5);
      if (i < 3) s.sfx(tf, 'work', { note: 'C4', gain: 1.4, pan: -0.3 });
      else s.sfx(tf, 'ack', { note: 'C5', gain: 1.3, pan: -0.3 });
    });
    t = 7.0;    // the agent has no route to production
    s.set(t, 'wire:nopath', 'alpha', 1, 0.3); s.set(t, 'wire:nopath', 'color', T.mid, 0.3);
    flash(t, 'rAgentCan', T.info, 1.6);
    s.packet({ route: [[60, 564], [36, 564], [36, 1458]], t, dur: 1.4, kind: 'dot', color: T.info });
    s.sfx(t, 'send', { note: 'C6', gain: 0.9, pan: -0.8 });
    t = 8.4;
    s.set(t, 'block', 'draw', 1, 0.35, 'out'); s.ripple(t, [36, 1492], T.mid, { r0: 10, r1: 40, dur: 0.8 });
    s.sfx(t, 'miss', { gain: 0.7, pan: -0.8 });
    flash(t + 0.2, 'pv', T.mid, 0.8);
    s.set(t + 1.2, 'wire:nopath', 'color', T.dim, 0.5);

    // ==== Beat 2: submitted; a human reviews; a decision is still required (10.5–19) ====
    t = 10.5;
    s.set(t, 'prop', 'status', 'submitted', 0); s.set(t, 'prop', 'statusColor', T.fg, 0);
    s.pulse(t, 'prop');
    F.forEach((f, i) => { if (i < 3) s.set(t, 'fv' + i, 'color', T.fg, 0.4); });
    s.sfx(t, 'send', { note: 'C6', gain: 1.0, pan: 0 });
    t = 11.5;   // ownership moves to the human
    s.set(t, 'rAgentNow', 'text', 'submitted', 0); s.set(t, 'rAgentNow', 'color', T.mid, 0);
    s.set(t, 'rHumanNow', 'text', 'reviewing', 0); s.set(t, 'rHumanNow', 'color', T.fg, 0); flash(t, 'rHumanNow', T.fg, 0.9);
    s.sfx(t, 'arrive', { note: 'E5', pan: 0.2 });
    [1, 2, 3].forEach((i, k) => {
      const tr = 12.8 + k * 1.1;
      flash(tr, 'fv' + i, T.fg, 0.7);
      s.sfx(tr, 'ack', { note: 'E5', gain: 1.2, pan: 0.2 });
    });
    t = 16.2;
    show(t, 'decK'); show(t, 'decV'); flash(t, 'decV', T.accent, 0.9);
    s.sfx(t, 'ack', { note: 'E4', gain: 1.4, pan: 0 });

    // ==== Beat 3: the executor waits for authorization (19–28) ====
    t = 19.0;
    lightPanel(t, 'exec'); s.set(t, 'exec', 'status', 'checking', 0); s.set(t, 'exec', 'statusColor', T.accent, 0);
    for (const id of ['eCan', 'ePk', 'ePv', 'eDk', 'eDv', 'eCk', 'eCv']) show(t, id);
    s.sfx(t, 'arrive', { note: 'G5', pan: 0.4 });
    t = 20.2;   // the submitted proposal reaches the executor
    s.set(t, 'wire:req', 'alpha', 1, 0.2); s.set(t, 'wire:req', 'color', T.fg, 0); s.set(t, 'wire:req', 'flow', 1, 0);
    s.packet({ route: [[1026, 1062], [1052, 1062], [1052, 1316], [1026, 1316]], t, dur: 1.0, kind: 'dot', color: T.fg });
    s.sfx(t, 'send', { note: 'E6', gain: 0.9, pan: 0.8 });
    t = 21.2;
    s.set(t, 'wire:req', 'alpha', 0, 0.4); s.set(t, 'wire:req', 'flow', 0, 0);
    s.set(t, 'ePv', 'text', 'A', 0); s.set(t, 'ePv', 'color', T.fg, 0); flash(t, 'ePv', T.fg, 0.6);
    s.sfx(t, 'store', { note: 'G5', pan: 0.4 });
    t = 22.4;   // is there a decision?
    flash(t, 'eDv', T.accent, 0.8); flash(t, 'decV', T.accent, 0.8);
    s.sfx(t, 'work', { note: 'G4', gain: 1.3, pan: 0.4 });
    t = 23.4;
    s.set(t, 'eDv', 'text', 'missing', 0); s.set(t, 'eDv', 'color', T.accent, 0);
    s.sfx(t, 'ack', { note: 'G4', gain: 1.4, pan: 0.4 });
    t = 24.4;
    s.set(t, 'exec', 'status', 'waiting', 0); s.set(t, 'exec', 'statusColor', T.accent, 0);
    flash(t, 'eCv', T.fg, 0.9);
    s.sfx(t, 'ack', { note: 'G4', gain: 1.2, pan: 0.4 });

    // ==== Beat 4: preparation is different from permission (28–40) ====
    t = 28.2;
    flash(t, 'rAgentCan', T.info, 0.8); s.sfx(t, 'ack', { note: 'C5', gain: 1.3, pan: -0.3 });
    flash(t + 0.9, 'rHumanCan', T.fg, 0.8); s.sfx(t + 0.9, 'ack', { note: 'E5', gain: 1.3, pan: 0 });
    flash(t + 1.8, 'eCan', T.fg, 0.8); s.sfx(t + 1.8, 'ack', { note: 'G5', gain: 1.3, pan: 0.3 });
    t = 31.4;
    s.set(t, 'rHumanNow', 'text', 'deciding', 0); s.set(t, 'rHumanNow', 'color', T.accent, 0);
    flash(t, 'decV', T.accent, 0.9);
    s.sfx(t, 'ack', { note: 'E4', gain: 1.2, pan: 0 });
    t = 32.6;
    flash(t, 'eCv', T.fg, 0.9); flash(t + 0.5, 'pv', T.mid, 0.9);
    s.sfx(t + 0.5, 'ack', { note: 'G3', gain: 1.4, pan: 0 });

    s.fade(38.0, 1, 1.0);
    s.meta.duration = 40.0;
  },
});
