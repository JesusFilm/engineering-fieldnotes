/* Grant only needed access — guardrails-and-permissions motion-v2 lesson 02.
 * One mechanism: a grant names an action AND a resource. The investigator identity may read checkout logs.
 * A read of checkout logs matches the read column and the checkout row, so it executes and lines return.
 * A read of payments logs uses the same action column but a different row, has no grant, and is denied;
 * the log service never reads payments.
 * Render from the repository root:
 *   node video/guardrails-and-permissions/motion-v2/02/engine/render.mjs video/guardrails-and-permissions/motion-v2/02/scene.js video/guardrails-and-permissions/motion-v2/02/video.mp4
 * Cut-local engine copy: 'panel', chip size and title sizes (copied from lesson 01's local copy) plus a general 'matrix' node.
 */
FlowVideo.scene({
  meta: { title: 'Grant only needed access', titleSize: 80, subtitle: 'ACTION + RESOURCE', subtitleSize: 34, subtitleSpacing: 7, duration: 44, fps: 30, speed: 1 },
  build(s) {
    const T = s.THEME;
    const COLX = 460, GUT = 968;

    // ---- stage ----
    s.node('agent', 'panel', { x: 540, y: 588, w: 980, h: 280, title: 'Agent', titleSize: 40, titleY: 46, rows: [114, 178, 242], rowH: 60, keyX: 40, valueX: 250, keySize: 38, valueSize: 46, tagSize: 38, tagPad: 36,
      color: T.mid, alpha: 0,
      r0Key: 'identity', r0Text: 'investigator', r0Reveal: 0, r0Tag: '', r0TagColor: T.mid,
      r1Key: 'request', r1Text: 'read checkout logs', r1Reveal: 0, r1Color: T.info,
      r2Key: 'result', r2Text: '', r2Color: T.ok });
    s.node('grid', 'matrix', { x: 460, y: 1060, w: 840, h: 540, title: 'Grants \u00b7 investigator', titleSize: 40, cols: ['read', 'write'], rows: ['checkout', 'payments'], rowSub: 'logs',
      labelW: 290, gridTop: 84, headerH: 80, rowH: 178, textSize: 42, headSize: 48, color: T.dim, alpha: 0,
      c0_0Text: 'allow', c0_0Color: T.ok, c0_0Mark: 'check',
      c0_1Text: 'no grant', c0_1Color: T.mid, c1_0Text: 'no grant', c1_0Color: T.mid, c1_1Text: 'no grant', c1_1Color: T.mid });
    s.node('logs', 'panel', { x: 460, y: 1565, w: 840, h: 300, title: 'Log service', titleSize: 40, titleY: 50, rows: [126, 218], rowH: 74, keyX: 40, valueX: 340, keySize: 40, valueSize: 48, tagSize: 38, tagPad: 36,
      color: T.dim, alpha: 0,
      r0Key: 'checkout logs', r0Text: 'reads 0', r1Key: 'payments logs', r1Text: 'reads 0' });

    s.wire('req', [COLX, 734], [COLX, 784], { color: T.dim });
    s.wire('exec', [COLX, 1336], [COLX, 1409], { color: T.dim });
    s.wire('ret', [886, 1565], [GUT, 734], { via: [[GUT, 1565]], color: T.dim });
    s.wire('deny', [886, 1237], [GUT, 1237], { color: T.dim });
    for (const w of ['req', 'exec', 'ret', 'deny']) s.set(0, 'wire:' + w, 'alpha', 0, 0);
    s.set(0, 'wire:exec', 'dashed', 1, 0);

    const pan = (a) => s.panOf(a);
    const AG = [540, 588], GR = [460, 1060], LG = [460, 1565];
    const lit = (t, w, c) => { s.set(t, 'wire:' + w, 'color', c, 0.2); s.set(t, 'wire:' + w, 'flow', 1, 0); };
    const unlit = (t, w) => { s.set(t, 'wire:' + w, 'color', T.dim, 0.4); s.set(t, 'wire:' + w, 'flow', 0, 0); };

    // ---- beat 1: one identity, one granted scope (0–8) ----
    let t = 0.3;
    for (const id of ['grid', 'logs']) s.set(t, id, 'alpha', 1, 0.7);
    for (const w of ['req', 'exec', 'ret', 'deny']) s.set(t, 'wire:' + w, 'alpha', 1, 0.7);
    s.sfx(t + 0.2, 'ack', { note: 'C5', gain: 0.7, pan: pan(GR) });
    t = 1.3;
    s.set(t, 'agent', 'alpha', 1, 0.3); s.set(t, 'agent', 'scale', 0.94, 0); s.set(t, 'agent', 'scale', 1, 0.4, 'back');
    s.set(t + 0.3, 'agent', 'r0Reveal', 1, 0.6, 'linear'); s.set(t + 0.9, 'agent', 'r0Tag', 'from session', 0);
    s.sfx(t, 'ack', { note: 'E5', gain: 0.9, pan: pan(AG) });
    t = 2.8;   // the only grant this identity has
    s.set(t, 'grid', 'titleColor', T.fg, 0.3);
    s.set(t, 'grid', 'c0_0Hl', 1, 0.2); s.set(t, 'grid', 'c0_0HlColor', T.ok, 0);
    s.set(t + 1.6, 'grid', 'c0_0Hl', 0, 0.6);
    s.sfx(t, 'ack', { note: 'C6', gain: 1.0, pan: pan([COLX, 1060]) });
    t = 5.0;
    s.set(t, 'agent', 'r1Reveal', 1, 1.0, 'linear');
    s.set(t, 'agent', 'r1Tag', 'pending', 0);
    s.set(t, 'agent', 'r1Hl', 1, 0.2); s.set(t, 'agent', 'r1HlColor', T.info, 0);
    s.sfx(t, 'store', { note: 'E5', gain: 0.9, pan: pan(AG) });

    // ---- beat 2: the service checks action, then resource (8–16) ----
    t = 8.0;
    s.set(t, 'agent', 'r1Hl', 0, 0.5);
    lit(t, 'req', T.info);
    s.packet({ route: [[COLX, 724], [COLX, 806]], t, dur: 0.9, kind: 'chip', label: 'read checkout', color: T.info, size: 34 });
    s.sfx(t, 'send', { note: 'E6', pan: pan([COLX, 760]) });
    t = 8.9;
    unlit(t, 'req');
    s.set(t, 'grid', 'color', T.fg, 0.2); s.set(t, 'grid', 'glow', 0.6, 0.2); s.set(t + 0.5, 'grid', 'glow', 0, 0.6);
    s.sfx(t, 'arrive', { note: 'C5', pan: pan(GR) });
    t = 9.9;   // action: read column
    s.set(t, 'grid', 'col0Band', 1, 0.3); s.set(t, 'grid', 'col0BandColor', T.accent, 0); s.set(t, 'grid', 'col0Color', T.fg, 0.2);
    s.sfx(t, 'ack', { note: 'C6', gain: 1.2, pan: pan([COLX, 914]) });
    t = 11.1;  // resource: checkout row, the dot runs down the column
    s.packet({ route: [[COLX, 914], [COLX, 1060]], t: t - 0.5, dur: 0.5, kind: 'dot', color: T.accent });
    s.set(t, 'grid', 'row0Band', 1, 0.3); s.set(t, 'grid', 'row0BandColor', T.accent, 0); s.set(t, 'grid', 'row0Color', T.fg, 0.2);
    s.sfx(t, 'ack', { note: 'C6', gain: 1.2, pan: pan([200, 1060]) });
    t = 12.3;  // both match: the granted cell
    s.set(t, 'grid', 'c0_0Hl', 1, 0.15); s.set(t, 'grid', 'c0_0HlColor', T.ok, 0);
    s.ripple(t, [COLX, 1060], T.ok, { r0: 20, r1: 110 });
    s.sfx(t, 'hit', { note: 'C5', gain: 0.9, pan: pan([COLX, 1060]) });

    // ---- beat 3: the approved read executes and lines return (16–23.5) ----
    t = 15.5;
    s.set(t, 'grid', 'col0Band', 0, 0.4); s.set(t, 'grid', 'row0Band', 0, 0.4); s.set(t, 'grid', 'row0Color', T.mid, 0.4);
    s.set(t, 'wire:exec', 'dashed', 0, 0); lit(t, 'exec', T.ok);
    s.packet({ route: [[COLX, 1330], [COLX, 1420]], t, dur: 0.9, kind: 'chip', label: 'read checkout', color: T.ok, size: 34 });
    s.sfx(t, 'send', { note: 'C6', pan: pan([COLX, 1372]) });
    t = 16.4;
    unlit(t, 'exec');
    s.set(t, 'logs', 'color', T.fg, 0.2); s.set(t, 'logs', 'titleColor', T.fg, 0.2);
    s.set(t, 'logs', 'r0Hl', 1, 0.2); s.set(t, 'logs', 'r0HlColor', T.ok, 0);
    s.sfx(t, 'arrive', { note: 'G5', pan: pan(LG) });
    for (const tk of [16.75, 17.0, 17.25]) s.sfx(tk, 'work', { note: 'G4', gain: 1.0, pan: pan(LG) });
    t = 17.5;
    s.set(t, 'logs', 'r0Text', 'reads 1', 0); s.set(t, 'logs', 'r0Color', T.ok, 0.2);
    s.sfx(t, 'store', { note: 'G5', gain: 1.0, pan: pan(LG) });
    t = 18.4;
    lit(t, 'ret', T.ok);
    s.set(t, 'logs', 'r0Hl', 0, 0.5); s.set(t, 'logs', 'color', T.mid, 0.5);
    s.packet({ route: [[890, 1565], [GUT, 1565], [GUT, 746]], t, dur: 1.4, kind: 'chip', label: 'lines', color: T.ok, size: 34 });
    s.sfx(t, 'send', { note: 'G6', pan: pan([GUT, 1100]) });
    t = 19.8;
    unlit(t, 'ret');
    s.set(t, 'agent', 'r2Text', 'timeout \u00d73', 0); s.set(t, 'agent', 'r2Reveal', 0, 0); s.set(t, 'agent', 'r2Reveal', 1, 0.5, 'linear');
    s.set(t, 'agent', 'r1Tag', 'allowed', 0); s.set(t, 'agent', 'r1TagColor', T.ok, 0);
    s.pulse(t, 'agent', T.ok, 0.5);
    s.sfx(t, 'deliver', { note: 'G5', gain: 1.1, pan: pan(AG) });

    // ---- beat 4: a payments read is a different resource (24–37) ----
    t = 24.0;  // clear R1 before R2 is written; counters persist
    s.set(t, 'agent', 'r2Alpha', 0, 0.4); s.set(t + 0.4, 'agent', 'r2Text', '', 0); s.set(t + 0.4, 'agent', 'r2Alpha', 1, 0);
    s.set(t, 'agent', 'r1Alpha', 0, 0.4);
    s.set(t, 'grid', 'c0_0Hl', 0, 0.4); s.set(t, 'grid', 'color', T.dim, 0.4);
    s.set(t, 'logs', 'r0Color', T.fg, 0.4);
    t = 24.6;
    s.set(t, 'agent', 'r1Text', 'read payments logs', 0); s.set(t, 'agent', 'r1Reveal', 0, 0); s.set(t, 'agent', 'r1Color', T.info, 0);
    s.set(t, 'agent', 'r1Tag', 'pending', 0); s.set(t, 'agent', 'r1TagColor', T.mid, 0);
    s.set(t, 'agent', 'r1Alpha', 1, 0); s.set(t, 'agent', 'r1Reveal', 1, 1.0, 'linear');
    s.set(t, 'agent', 'r1Hl', 1, 0.2);
    s.sfx(t, 'store', { note: 'E5', gain: 0.9, pan: pan(AG) });
    t = 27.0;
    s.set(t, 'agent', 'r1Hl', 0, 0.5);
    lit(t, 'req', T.info);
    s.packet({ route: [[COLX, 724], [COLX, 806]], t, dur: 0.9, kind: 'chip', label: 'read payments', color: T.info, size: 34 });
    s.sfx(t, 'send', { note: 'E6', pan: pan([COLX, 760]) });
    t = 27.9;
    unlit(t, 'req');
    s.set(t, 'grid', 'color', T.fg, 0.2); s.set(t, 'grid', 'glow', 0.6, 0.2); s.set(t + 0.5, 'grid', 'glow', 0, 0.6);
    s.sfx(t, 'arrive', { note: 'C5', pan: pan(GR) });
    t = 28.9;  // same action column
    s.set(t, 'grid', 'col0Band', 1, 0.3);
    s.sfx(t, 'ack', { note: 'C6', gain: 1.2, pan: pan([COLX, 914]) });
    t = 30.3;  // different row: the dot runs further down
    s.packet({ route: [[COLX, 914], [COLX, 1237]], t: t - 0.7, dur: 0.7, kind: 'dot', color: T.accent });
    s.set(t, 'grid', 'row1Band', 1, 0.3); s.set(t, 'grid', 'row1BandColor', T.accent, 0); s.set(t, 'grid', 'row1Color', T.fg, 0.2);
    s.sfx(t, 'ack', { note: 'C6', gain: 1.2, pan: pan([200, 1237]) });
    t = 31.5;  // no grant at the intersection
    s.set(t, 'grid', 'c1_0Color', T.bad, 0.15); s.set(t, 'grid', 'c1_0Mark', 'x', 0); s.set(t, 'grid', 'c1_0MarkPop', 0, 0); s.set(t, 'grid', 'c1_0MarkPop', 1, 0.35);
    s.set(t, 'grid', 'c1_0Hl', 1, 0.15); s.set(t, 'grid', 'c1_0HlColor', T.bad, 0);
    s.set(t, 'grid', 'color', T.bad, 0.15);
    s.shake(t, 'grid', 7, 0.35);
    s.sfx(t, 'thump', { note: 'C3', gain: 1.2, pan: pan([COLX, 1237]) });
    t = 33.3;
    s.set(t, 'grid', 'col0Band', 0, 0.4); s.set(t, 'grid', 'row1Band', 0, 0.4);
    lit(t, 'deny', T.bad); lit(t + 0.35, 'ret', T.bad);
    s.packet({ route: [[890, 1237], [GUT, 1237], [GUT, 746]], t, dur: 1.2, kind: 'chip', label: '403', color: T.bad, size: 34 });
    s.sfx(t, 'send', { note: 'C6', gain: 0.8, pan: pan([GUT, 1000]) });
    t = 34.5;
    unlit(t, 'deny'); unlit(t, 'ret');
    s.set(t, 'agent', 'r1Tag', 'denied', 0); s.set(t, 'agent', 'r1TagColor', T.bad, 0); s.set(t, 'agent', 'r1Color', T.mid, 0.4);
    s.set(t, 'agent', 'r2Text', 'no payments grant', 0); s.set(t, 'agent', 'r2Color', T.bad, 0); s.set(t, 'agent', 'r2Reveal', 0, 0); s.set(t, 'agent', 'r2Reveal', 1, 0.5, 'linear');
    s.pulse(t, 'agent', T.bad, 0.5);
    s.sfx(t, 'ack', { note: 'E5', gain: 0.9, pan: pan(AG) });
    t = 35.8;  // nothing reaches the log service
    s.ripple(t, [COLX, 1372], T.mid, { r0: 10, r1: 46, dur: 0.9, mark: 'x' });
    s.sfx(t, 'closed', { pan: pan([COLX, 1372]) });
    t = 36.9;
    s.set(t, 'logs', 'r1Hl', 1, 0.2); s.set(t, 'logs', 'r1HlColor', T.mid, 0); s.set(t, 'logs', 'r1Tag', 'never read', 0);
    s.set(t + 1.2, 'logs', 'r1Hl', 0, 0.5);
    s.sfx(t, 'ack', { note: 'G4', gain: 0.8, pan: pan(LG) });

    // ---- beat 5: same action, two resources, two decisions (39–46) ----
    t = 39.4;
    s.set(t, 'grid', 'color', T.mid, 0.4);
    s.set(t, 'grid', 'col0Band', 1, 0.4); s.set(t, 'grid', 'col0BandColor', T.mid, 0);
    s.set(t, 'grid', 'c0_0Hl', 1, 0.3); s.set(t, 'grid', 'c1_0Hl', 1, 0.3);
    s.set(t, 'grid', 'row0Color', T.fg, 0.3);
    s.sfx(t, 'ack', { note: 'C5', gain: 1.0, pan: pan(GR) });

    s.fade(45.2, 1, 1.2);
    s.meta.duration = 47;

    s.sound('closed', { base: 196, gain: 0.32, echo: { delay: 0.09, feedback: 0.25, repeats: 1 },
      layers: [{ type: 'tone', wave: 'sine', ratio: 1, attack: 0.004, decay: 0.12, gain: 1, harmonics: [0.3] },
               { type: 'noise', lp: 900, attack: 0.002, decay: 0.05, gain: 0.25 }] });
  },
});
