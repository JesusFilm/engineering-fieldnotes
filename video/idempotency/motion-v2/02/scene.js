/* Idempotency lesson 02, "A missing reply" (motion-v2 cut).
 * One mechanism: the service saves ticket 47, but its reply is lost on the way back. The caller's
 * timeout expires while it has heard nothing, so from its side the outcome is unknown, although the
 * database already holds the ticket. Another plain create could add a duplicate.
 * Geometry: a sequence diagram (time runs down three lifelines); the caller and service lifelines end
 * in what each side holds. The caller's timeout grows down its lifeline at the same rate as the diagram.
 * Render from the repository root:
 *   node video/idempotency/motion-v2/02/engine/render.mjs video/idempotency/motion-v2/02/scene.js video/idempotency/motion-v2/02/video.mp4
 */
FlowVideo.scene({
  meta: { title: 'Idempotency', subtitle: 'A MISSING REPLY', subtitleSize: 40, subtitleSpacing: 6, subtitleY: 412, duration: 43, fps: 30, speed: 1 },
  build(s) {
    const T = s.THEME;
    const XC = 200, XN = 545, XS = 880;            // lifelines: caller, network, service
    const Y1 = 680, YSAVE = 790, Y3 = 900, YTO = 1060, Y4 = 1170;
    const T0 = 3.0, TTO = 20.0;                     // timeout runs from send to deadline; its edge reaches row y at time t
    const at = (y) => T0 + (y - Y1) * (TTO - T0) / (YTO - Y1);

    // ---- headers and lifelines ----
    s.wire('lifeC', [XC, 570], [XC, 1288]);
    s.wire('lifeN', [XN, 570], [XN, 1240]);
    s.wire('lifeS', [XS, 570], [XS, 1288]);
    s.wire('write', [XS, YSAVE], [XS, 1288], { color: T.ok, alpha: 0 });
    s.node('hC', 'box', { x: XC, y: 520, w: 300, h: 96, label: 'caller', labelSize: 46, color: T.mid });
    s.node('hN', 'box', { x: XN, y: 520, w: 230, h: 96, label: 'network', labelSize: 44, color: T.dim, labelColor: T.mid });
    s.node('hS', 'box', { x: XS, y: 520, w: 300, h: 96, label: 'service', labelSize: 46, color: T.mid });

    // ---- the caller's timeout on its lifeline ----
    s.node('tbar', 'vbar', { x: XC, y: (Y1 + YTO) / 2, w: 28, h: YTO - Y1, alpha: 0, fill: 0, track: T.dim, endTick: 0.5, endColor: T.mid });
    s.node('toLab', 'label', { x: 345, y: YTO, text: 'timeout', size: 40, mono: true, color: T.mid, alpha: 0 });

    // ---- messages (drawn as they happen) ----
    s.wire('m1', [XC + 16, Y1], [XS - 16, Y1], { solid: true, reveal: 0, color: T.fg });
    s.node('a1', 'arrowhead', { x: XS - 4, y: Y1, dir: 'right', color: T.fg, alpha: 0 });
    s.node('m1Lab', 'label', { x: 372, y: Y1 - 40, text: 'create v1', size: 40, mono: true, color: T.mid, alpha: 0 });
    s.node('saveLab', 'label', { x: 735, y: YSAVE, text: 'save 47', size: 40, mono: true, color: T.ok, alpha: 0 });
    s.wire('m3', [XS - 16, Y3], [XN + 30, Y3], { solid: true, reveal: 0, color: T.fg });
    s.wire('m3lost', [XN - 30, Y3], [XC + 16, Y3], { color: T.mid, alpha: 0 });
    s.set(0, 'wire:m3lost', 'dashed', 1, 0);
    s.set(0, 'wire:m3lost', 'alpha', 0, 0); s.set(0, 'wire:write', 'alpha', 0, 0);
    s.set(0, 'wire:m4', 'dashed', 1, 0);   // wire alpha and dashed are timeline props
    s.node('lostX', 'xmark', { x: XN, y: Y3, r: 26, color: T.mid, alpha: 0, scale: 0.4 });
    s.node('m3Lab', 'label', { x: 712, y: Y3 - 40, text: 'ticket 47', size: 40, mono: true, color: T.ok, alpha: 0 });
    s.node('lostLab', 'label', { x: 372, y: Y3 - 40, text: 'reply lost', size: 40, mono: true, color: T.mid, alpha: 0 });
    s.wire('m4', [XC + 16, Y4], [XS - 16, Y4], { dashed: 1, reveal: 0, color: T.accent });
    s.node('a4', 'arrowhead', { x: XS - 4, y: Y4, dir: 'right', color: T.accent, alpha: 0 });
    s.node('m4Lab', 'label', { x: 380, y: Y4 - 40, text: 'create again?', size: 40, mono: true, color: T.accent, alpha: 0 });

    // ---- what each side holds ----
    s.node('cv', 'card', { x: 280, y: 1445, w: 480, h: 310, title: 'Caller sees', titleSize: 44, titleY: 50, titleColor: T.fg, color: T.mid,
      lineY: [130, 212], rowH: 64, lineSize: 44,
      l0Text: 'ready', l0Color: T.mid, l1Text: 'no reply yet', l1Color: T.mid, l1Alpha: 0 });
    s.node('db', 'card', { x: 800, y: 1445, w: 480, h: 310, title: 'Database', titleSize: 44, titleY: 50, titleColor: T.fg, color: T.mid,
      state: 'saved 0', stateSize: 40, stateColor: T.mid,
      lineY: [118, 188, 258], rowH: 60, lineSize: 44, tagSize: 38,
      l0Text: 'id  release', l0Color: T.mid,
      l1Text: '47  v1', l1Alpha: 0, l1Slot: 1, l1Color: T.ok,
      l2Text: '48  v1', l2Alpha: 0, l2Slot: 0, l2Dash: 1, l2SlotColor: T.accent, l2Color: T.accent, l2Tag: 'duplicate?', l2TagColor: T.accent });
    s.node('foot1', 'label', { x: 540, y: 1690, text: 'timeout ≠ no effect', size: 46, mono: true, color: T.fg, alpha: 0 });
    s.node('foot2', 'label', { x: 540, y: 1772, text: 'needs a stable operation ID', size: 44, mono: true, color: T.accent, alpha: 0 });

    const pan = (x) => ((x - 540) / 540) * 0.6;
    const show = (t, id, d = 0.4) => { s.set(t - 0.01, id, 'alpha', 0, 0); s.set(t, id, 'alpha', 1, d); };

    // ---- beat 1 (0-7.9): the caller sends a create request; the service receives it ----
    let t = 1.2;
    s.pulse(t, 'hC'); s.set(t, 'cv', 'color', T.fg, 0.2); s.set(t + 1.0, 'cv', 'color', T.mid, 0.6);
    s.set(t, 'cv', 'l0HlColor', T.fg, 0); s.set(t, 'cv', 'l0Hl', 1, 0.2); s.set(t + 1.0, 'cv', 'l0Hl', 0, 0.5);
    s.sfx(t, 'ack', { note: 'C6', gain: 1.4, pan: pan(XC) });
    t = 2.2;
    s.set(t, 'db', 'l1HlColor', T.fg, 0); s.set(t, 'db', 'l1Hl', 1, 0.2); s.set(t + 1.0, 'db', 'l1Hl', 0, 0.5);
    s.set(t, 'db', 'stateColor', T.fg, 0.2); s.set(t + 1.0, 'db', 'stateColor', T.mid, 0.5);
    s.sfx(t, 'ack', { note: 'E6', gain: 1.2, pan: pan(XS) });
    t = T0;
    s.set(t, 'cv', 'l0Text', 'waiting', 0); s.set(t, 'cv', 'l0Color', T.accent, 0);
    s.set(t, 'cv', 'l1Alpha', 1, 0.3);
    s.set(t - 0.3, 'tbar', 'alpha', 1, 0.3); s.set(t, 'tbar', 'fill', 1, TTO - T0, 'linear');
    show(t, 'toLab');
    s.set(t, 'wire:m1', 'reveal', 1, 1.6);
    s.packet({ route: [[XC + 16, Y1], [XS - 16, Y1]], t, dur: 1.6, kind: 'chip', label: 'create v1', color: T.fg, size: 40 });
    s.sfx(t, 'send', { note: 'C6', gain: 1.2, pan: pan(XC) });
    t = T0 + 1.6;
    show(t, 'a1', 0.15); show(t, 'm1Lab');
    s.set(t + 0.4, 'wire:m1', 'color', T.mid, 0.5); s.set(t + 0.4, 'a1', 'color', T.mid, 0.5);
    s.ripple(t, [XS, Y1], T.fg, { r0: 8, r1: 40 });
    s.pulse(t, 'hS', T.fg);
    s.sfx(t, 'arrive', { note: 'G5', pan: pan(XS) });

    // ---- beat 2 (7.9-14.6): the service saves ticket 47; its reply will not reach the caller ----
    t = at(YSAVE);                                  // about 7.9 s
    show(t, 'saveLab', 0.3);
    s.ripple(t, [XS, YSAVE], T.ok, { r0: 8, r1: 36 });
    s.set(t, 'wire:write', 'alpha', 1, 0.2); s.set(t, 'wire:write', 'flow', 1, 0);
    s.packet({ route: [[XS, YSAVE], [XS, 1290]], t, dur: 1.0, kind: 'dot', color: T.ok, ease: 'in' });
    s.sfx(t, 'work', { note: 'G4', gain: 1.4, pan: pan(XS) });
    t += 1.0;                                       // about 8.9 s: the row is committed
    s.set(t, 'wire:write', 'alpha', 0, 0.6); s.set(t, 'wire:write', 'flow', 0, 0);
    s.set(t, 'db', 'color', T.ok, 0.2); s.set(t, 'db', 'glow', 0.7, 0.2); s.set(t + 0.6, 'db', 'glow', 0, 0.8);
    s.set(t, 'db', 'l1Alpha', 1, 0.25); s.set(t, 'db', 'l1Slot', 0, 0.25);
    s.set(t, 'db', 'l1HlColor', T.ok, 0); s.set(t, 'db', 'l1Hl', 1, 0.2); s.set(t + 1.2, 'db', 'l1Hl', 0.45, 0.8);
    s.sfx(t, 'store', { note: 'E5', gain: 2.4, pan: pan(XS) });
    s.set(t + 0.7, 'db', 'state', 'saved 1', 0); s.set(t + 0.7, 'db', 'stateColor', T.ok, 0);
    s.sfx(t + 0.7, 'ack', { note: 'E6', gain: 1.2, pan: pan(XS) });
    s.set(t + 1.6, 'saveLab', 'color', T.mid, 0.8);
    t = at(Y3);                                     // about 12.8 s: the reply leaves
    s.set(t, 'wire:m3', 'reveal', 1, 1.2, 'linear');
    s.packet({ route: [[XS - 16, Y3], [XN + 34, Y3]], t, dur: 1.2, kind: 'chip', label: 'ticket 47', color: T.ok, size: 40, ease: 'linear', fade: 0.35 });
    s.sfx(t, 'send', { note: 'G6', gain: 1.2, pan: pan(XS) });
    t += 1.2;                                       // about 14.0 s: lost at the network
    s.set(t, 'lostX', 'alpha', 1, 0.15); s.set(t, 'lostX', 'scale', 1, 0.35, 'back');
    s.set(t, 'wire:m3', 'color', T.mid, 0.5);
    s.sfx(t, 'poof', { note: 'C5', gain: 1.6, pan: pan(XN) });
    t += 0.4;
    s.set(t, 'wire:m3lost', 'alpha', 1, 0.6);
    show(t, 'lostLab'); show(t, 'm3Lab');
    s.set(t + 0.8, 'm3Lab', 'color', T.mid, 0.8);

    // ---- the caller keeps waiting while nothing comes back ----
    t = 15.4;
    s.set(t, 'cv', 'l1HlColor', T.accent, 0); s.set(t, 'cv', 'l1Hl', 1, 0.3); s.set(t, 'cv', 'l1Color', T.fg, 0.3);
    for (const tk of [15.4, 16.5, 17.4, 18.2, 18.85, 19.4, 19.8]) s.sfx(tk, 'clock', { gain: 1.5, pan: pan(XC) });

    // ---- beat 3 (20.0-29.0): the caller stops waiting; its outcome is unknown ----
    t = TTO;
    s.set(t, 'tbar', 'endTick', 1, 0.15); s.set(t, 'tbar', 'endColor', T.accent, 0.15);
    s.set(t, 'tbar', 'glow', 1, 0.15); s.set(t + 0.4, 'tbar', 'glow', 0, 0.6);
    s.set(t, 'toLab', 'color', T.accent, 0.15);
    s.shake(t, 'cv', 8, 0.35);
    s.set(t, 'cv', 'l0Text', 'timed out', 0);
    s.set(t, 'cv', 'l1Text', 'no reply', 0); s.set(t, 'cv', 'l1Hl', 0, 0.5); s.set(t, 'cv', 'l1Color', T.mid, 0.5);
    s.sfx(t, 'thump', { note: 'C4', gain: 1.1, pan: pan(XC) });
    t = 21.6;
    s.set(t, 'cv', 'l0Text', 'outcome unknown', 0);
    s.set(t, 'cv', 'l0HlColor', T.accent, 0); s.set(t, 'cv', 'l0Hl', 1, 0.3);
    s.set(t, 'cv', 'color', T.accent, 0.3);
    s.sfx(t, 'ack', { note: 'C5', gain: 1.4, pan: pan(XC) });
    t = 23.2;                                       // ...while the database already holds ticket 47
    s.set(t, 'db', 'l1Hl', 1, 0.2); s.pulse(t, 'db');
    s.sfx(t, 'ack', { note: 'E6', gain: 1.2, pan: pan(XS) });
    s.set(t + 1.2, 'db', 'l1Hl', 0.45, 0.6);
    t = 24.6;
    show(t, 'foot1', 0.5);

    // ---- beat 4 (29.0-43.0): another create could add a duplicate; the caller needs a stable operation ID ----
    t = 29.0;
    s.set(t, 'wire:m4', 'reveal', 1, 1.4);
    show(t, 'm4Lab'); show(t + 1.4, 'a4', 0.2);
    s.sfx(t, 'send', { note: 'C6', gain: 0.6, pan: pan(XC) });
    t = 30.8;
    s.set(t, 'db', 'l2Slot', 1, 0.3); s.set(t, 'db', 'l2Alpha', 1, 0.3);
    s.sfx(t, 'miss', { note: 'E4', gain: 0.8, pan: pan(XS) });
    t = 32.2;                                       // same intent, two rows
    s.set(t, 'db', 'l1Hl', 1, 0.2); s.set(t + 0.9, 'db', 'l1Hl', 0.45, 0.5);
    s.set(t + 0.9, 'db', 'l2HlColor', T.accent, 0); s.set(t + 0.9, 'db', 'l2Hl', 1, 0.2); s.set(t + 1.8, 'db', 'l2Hl', 0, 0.5);
    t = 34.2;
    show(t, 'foot2', 0.5);
    s.sfx(t, 'ack', { note: 'C5', gain: 1.0, pan: 0 });
    s.fade(41.0, 1, 1.0);
    s.meta.duration = 43.0;
  },
});
