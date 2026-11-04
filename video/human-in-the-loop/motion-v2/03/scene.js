/* Human-in-the-loop — motion-v2 lesson 03: Pause without guessing.
 * One mechanism: workflow W7 stops at its review step before the action and saves its state and the proposed
 * action (deploy A · production) to durable storage outside the worker. The worker's memory is lost in a
 * restart and is restored from the saved state; the run stays paused. Elapsed time cannot write a decision.
 * Only the reviewer's decision resumes the run, which moves to revalidation; nothing is executed.
 * Render from the repository root (pinned puppeteer-core from root node_modules):
 *   node video/human-in-the-loop/motion-v2/03/engine/render.mjs video/human-in-the-loop/motion-v2/03/scene.js video/human-in-the-loop/motion-v2/03/video.mp4 --sheet video/human-in-the-loop/motion-v2/03/scratch/contact-sheet.png
 * Local engine copy: 'panel', 'txt' (reveal, hl, bar, strike), 'tick' (check or x), chip size, meta.subtitleSize.
 */
FlowVideo.scene({
  meta: { title: 'Human in the loop', subtitle: 'PAUSE WITHOUT GUESSING', subtitleSize: 38, duration: 49, fps: 30, speed: 1 },
  build(s) {
    const T = s.THEME;
    const show = (t, id, d = 0.3) => s.set(t, id, 'alpha', 1, d);
    const flash = (t, id, color, hold = 0.6) => { s.set(t, id, 'hlColor', color, 0); s.set(t, id, 'hl', 1, 0.15); s.set(t + hold, id, 'hl', 0, 0.4); };
    const lightPanel = (t, id, c = T.mid) => { s.set(t, id, 'color', c, 0.3); s.set(t, id, 'titleColor', T.fg, 0.3); };
    const row = (id, x, y, text, o = {}) => s.node(id, 'txt', Object.assign({ x, y, text, size: 42, mono: true, color: T.fg, alpha: 0, hlH: 48 }, o));
    const setText = (t, id, text, color) => { s.set(t, id, 'text', text, 0); if (color) s.set(t, id, 'color', color, 0); };

    // ---- run header ----
    s.node('run', 'panel', { x: 540, y: 520, w: 960, h: 110, title: 'WORKFLOW W7', titleY: 58, status: '', statusColor: T.info, color: T.dim, titleColor: T.mid });

    // ---- stages ----
    s.node('stg', 'panel', { x: 540, y: 750, w: 960, h: 300, title: 'STAGES', color: T.dim, titleColor: T.mid });
    const ST = [['prepare', 'running'], ['review', '—'], ['revalidate', '—'], ['execute', 'not run']];
    const SY = [708, 758, 808, 858];
    ST.forEach(([n, v], i) => { row('sn' + i, 100, SY[i], n, { color: T.mid, hlW: 264 }); row('sv' + i, 470, SY[i], v, { size: 40, color: T.mid, hlW: 240 }); });

    // ---- worker (in memory) and reviewer ----
    s.node('wk', 'panel', { x: 295, y: 1030, w: 470, h: 210, title: 'WORKER', titleSize: 34, statusSize: 36, status: '', statusColor: T.mid, color: T.dim, titleColor: T.mid });
    row('wkM', 100, 1085, 'mem  —', { size: 42, color: T.mid, hlW: 300 });
    s.node('rv', 'panel', { x: 785, y: 1030, w: 470, h: 210, title: 'REVIEWER', color: T.dim, titleColor: T.mid });
    row('rvD', 590, 1052, 'no decision', { size: 40, color: T.mid, hlW: 340 });
    row('rvW', 590, 1106, 'waited 0 h', { size: 40, color: T.mid, hlW: 270 });

    // ---- durable saved state ----
    s.node('sv', 'panel', { x: 540, y: 1310, w: 960, h: 300, title: 'SAVED STATE', status: '', statusColor: T.mid, color: T.dim, titleColor: T.mid });
    const SV = [['run', 'W7', T.fg], ['action', 'deploy A · production', T.info], ['stage', 'review', T.accent], ['decision', 'pending', T.accent]];
    const VY = [1264, 1318, 1372, 1426];
    SV.forEach(([k, v, c], i) => { row('vk' + i, 100, VY[i], k, { color: T.mid }); row('vv' + i, 350, VY[i], v, { weight: 700, color: c, hlW: i === 2 ? 252 : Math.max(v.length * 25.2, 60) }); });

    // ---- executor ----
    s.node('ex', 'panel', { x: 540, y: 1525, w: 960, h: 100, title: 'EXECUTOR', titleY: 54, status: 'deploy calls 0', statusColor: T.fg, color: T.dim, titleColor: T.mid });

    // routes: save/restore in the left margin, decisions in the right margin
    s.wire('save', [60, 1085], [60, 1318], { via: [[36, 1085], [36, 1318]] });
    s.wire('dec', [1020, 1052], [1026, 1426], { via: [[1052, 1052], [1052, 1426]] });
    s.wire('tmo', [1020, 1106], [1052, 1372], { via: [[1052, 1106]] });
    for (const w of ['save', 'dec', 'tmo']) s.set(0, 'wire:' + w, 'alpha', 0, 0);
    s.node('block', 'tick', { x: 1052, y: 1392, r: 16, shape: 'x', color: T.mid });

    // ==== Beat 1: the run reaches the review boundary and pauses (0–9) ====
    let t = 0.6;
    lightPanel(t, 'run'); s.set(t, 'run', 'status', 'deploy A · production', 0);
    s.sfx(t, 'arrive', { note: 'C5', pan: 0 });
    t = 1.4;
    lightPanel(t, 'stg'); ST.forEach((x, i) => { show(t + i * 0.15, 'sn' + i); show(t + i * 0.15, 'sv' + i); });
    s.set(t, 'sn0', 'color', T.fg, 0); s.set(t, 'sv0', 'color', T.accent, 0);
    s.sfx(t, 'work', { note: 'C4', gain: 1.3, pan: -0.2 });
    t = 2.4; setText(t, 'sv0', 'done', T.ok); s.set(t, 'sn0', 'color', T.mid, 0.3); s.sfx(t, 'ack', { note: 'C5', gain: 1.2, pan: -0.2 });
    t = 3.2;    // stop at the review boundary, before the action
    s.set(t, 'sn1', 'color', T.accent, 0); s.set(t + 1.2, 'sn1', 'color', T.fg, 0.4);
    setText(t, 'sv1', 'paused', T.accent);
    s.sfx(t, 'arrive', { note: 'C5', pan: -0.2 }); s.sfx(t + 0.4, 'ack', { note: 'C4', gain: 1.3, pan: -0.2 });
    t = 4.4;
    lightPanel(t, 'wk'); s.set(t, 'wk', 'status', 'online', 0); s.set(t, 'wk', 'statusColor', T.fg, 0);
    show(t, 'wkM'); setText(t, 'wkM', 'mem  W7 · A', T.fg);
    s.sfx(t, 'ack', { note: 'E5', gain: 1.3, pan: -0.5 });
    t = 5.3;
    lightPanel(t, 'rv'); show(t, 'rvD'); show(t, 'rvW');
    s.sfx(t, 'arrive', { note: 'A5', gain: 0.8, pan: 0.5 });
    t = 6.3;
    lightPanel(t, 'ex'); flash(t, 'sv3', T.mid, 0.9);
    s.sfx(t, 'ack', { note: 'G3', gain: 1.3, pan: 0 });

    // ==== Beat 2: save the state and the proposed action (9–17) ====
    t = 9.0;
    lightPanel(t, 'sv'); s.set(t, 'sv', 'status', 'saving…', 0);
    s.set(t, 'wire:save', 'alpha', 1, 0.2); s.set(t, 'wire:save', 'color', T.info, 0); s.set(t, 'wire:save', 'flow', 1, 0);
    s.packet({ route: [[60, 1085], [36, 1085], [36, 1318], [60, 1318]], t, dur: 0.9, kind: 'dot', color: T.info });
    s.sfx(t, 'send', { note: 'E6', gain: 0.9, pan: -0.8 });
    SV.forEach((x, i) => {
      const tr = 9.9 + i * 0.55;
      show(tr, 'vk' + i, 0.2); show(tr, 'vv' + i, 0.2);
      s.sfx(tr, 'store', { note: 'G5', gain: 0.8, pan: 0 });
    });
    s.set(10.6, 'wire:save', 'alpha', 0, 0.4); s.set(10.6, 'wire:save', 'flow', 0, 0);
    t = 12.3;
    s.set(t, 'sv', 'status', 'saved', 0); s.set(t, 'sv', 'statusColor', T.info, 0);
    flash(t, 'vv1', T.info, 1.0); flash(t, 'wkM', T.info, 1.0);
    s.sfx(t, 'ack', { note: 'G5', gain: 1.3, pan: 0 });

    // ==== Beat 3: the pause survives a worker restart (17–27) ====
    t = 17.0;
    s.set(t, 'wk', 'color', T.bad, 0.1); s.set(t, 'wk', 'titleColor', T.bad, 0.1);
    s.set(t, 'wk', 'status', 'offline', 0); s.set(t, 'wk', 'statusColor', T.bad, 0);
    s.shake(t, 'wk', 10, 0.45);
    setText(t + 0.2, 'wkM', 'mem  —', T.mid);
    s.sfx(t, 'thump', { note: 'E3', gain: 1.2, pan: -0.5 });
    t = 18.0;   // the saved rows are unchanged
    SV.forEach((x, i) => flash(t + i * 0.3, 'vv' + i, T.info, 0.5));
    s.sfx(t, 'ack', { note: 'G4', gain: 1.4, pan: 0 });
    t = 20.6;
    s.set(t, 'wk', 'color', T.mid, 0.4); s.set(t, 'wk', 'titleColor', T.fg, 0.4);
    s.set(t, 'wk', 'status', 'online', 0); s.set(t, 'wk', 'statusColor', T.fg, 0);
    s.sfx(t, 'arrive', { note: 'E5', gain: 0.9, pan: -0.5 });
    t = 21.6;   // restore from the saved state
    s.set(t, 'wire:save', 'alpha', 1, 0.2); s.set(t, 'wire:save', 'color', T.info, 0); s.set(t, 'wire:save', 'flow', 1, 0);
    s.packet({ route: [[60, 1318], [36, 1318], [36, 1085], [60, 1085]], t, dur: 0.9, kind: 'dot', color: T.info });
    s.sfx(t, 'send', { note: 'G6', gain: 0.9, pan: -0.8 });
    t = 22.5;
    s.set(t, 'wire:save', 'alpha', 0, 0.4); s.set(t, 'wire:save', 'flow', 0, 0);
    setText(t, 'wkM', 'mem  W7 · A', T.fg); flash(t, 'wkM', T.info, 0.8);
    s.set(t, 'wk', 'status', 'restored', 0); s.set(t, 'wk', 'statusColor', T.info, 0);
    s.sfx(t, 'arrive', { note: 'E5', pan: -0.5 });
    t = 23.6;
    flash(t, 'sv1', T.accent, 0.9); s.sfx(t, 'ack', { note: 'C4', gain: 1.3, pan: -0.2 });

    // ==== Beat 4: no decision yet; waiting is not consent (27–36) ====
    [['waited 2 h', 27.0], ['waited 8 h', 28.0], ['waited 24 h', 29.0]].forEach(([w, tw]) => {
      setText(tw, 'rvW', w, T.fg); flash(tw, 'rvW', T.mid, 0.4);
      s.sfx(tw, 'clock', { gain: 1.6, pan: 0.5 });
    });
    t = 30.2;   // elapsed time tries to reach the decision field and cannot write it
    s.set(t, 'wire:tmo', 'alpha', 1, 0.2); s.set(t, 'wire:tmo', 'color', T.mid, 0); s.set(t, 'wire:tmo', 'dashed', 1, 0);
    s.packet({ route: [[1020, 1106], [1052, 1106], [1052, 1372]], t, dur: 0.9, kind: 'dot', color: T.mid });
    t = 31.1;
    s.set(t, 'block', 'draw', 1, 0.3, 'out'); s.ripple(t, [1052, 1392], T.mid, { r0: 10, r1: 40, dur: 0.8 });
    flash(t + 0.2, 'vv3', T.accent, 0.9);
    s.sfx(t, 'thump', { note: 'C3', gain: 0.8, pan: 0.6 });
    t = 32.3;
    flash(t, 'sv1', T.accent, 0.9); flash(t, 'rvD', T.mid, 0.9);
    s.sfx(t, 'ack', { note: 'C4', gain: 1.3, pan: 0 });
    s.set(33.0, 'wire:tmo', 'alpha', 0.35, 0.6); s.set(33.0, 'block', 'alpha', 0.5, 0.6);

    // ==== Beat 5: a decision resumes the run; revalidate before execution (36–49) ====
    t = 36.0;
    setText(t, 'rvD', 'approve A · R1', T.ok); flash(t, 'rvD', T.ok, 0.9);
    s.set(t, 'rv', 'color', T.ok, 0.3);
    s.sfx(t, 'chime', { note: 'A5', gain: 0.6, pan: 0.5 });
    t = 37.0;
    s.set(t, 'wire:dec', 'alpha', 1, 0.2); s.set(t, 'wire:dec', 'color', T.ok, 0); s.set(t, 'wire:dec', 'flow', 1, 0);
    s.packet({ route: [[1020, 1052], [1052, 1052], [1052, 1426], [1026, 1426]], t, dur: 1.0, kind: 'dot', color: T.ok });
    s.sfx(t, 'send', { note: 'A6', gain: 0.9, pan: 0.8 });
    t = 38.0;
    s.set(t, 'wire:dec', 'alpha', 0, 0.4); s.set(t, 'wire:dec', 'flow', 0, 0);
    setText(t, 'vv3', 'approved · R1', T.ok); flash(t, 'vv3', T.ok, 0.9);
    s.sfx(t, 'store', { note: 'G5', pan: 0 });
    t = 39.2;
    setText(t, 'sv1', 'resumed', T.ok); s.set(t, 'sn1', 'color', T.mid, 0.3);
    s.sfx(t, 'arrive', { note: 'C5', pan: -0.2 });
    t = 40.2;   // next: revalidate the action, not execute it
    s.set(t, 'sn2', 'color', T.accent, 0); s.set(t + 1.2, 'sn2', 'color', T.fg, 0.4); setText(t, 'sv2', 'checking', T.accent);
    setText(t, 'vv2', 'revalidate', T.accent); flash(t, 'vv2', T.accent, 0.8);
    s.set(t, 'wk', 'status', 'checking', 0); s.set(t, 'wk', 'statusColor', T.accent, 0);
    s.sfx(t, 'work', { note: 'E4', gain: 1.3, pan: -0.5 });
    t = 41.4;
    flash(t, 'vv1', T.info, 1.0); s.sfx(t, 'ack', { note: 'C5', gain: 1.2, pan: 0 });
    t = 42.6;
    flash(t, 'sv3', T.mid, 1.0); s.pulse(t, 'ex');
    s.sfx(t, 'ack', { note: 'G3', gain: 1.3, pan: 0 });

    s.fade(47.0, 1, 1.0);
    s.meta.duration = 49.0;
  },
});
