/* Idempotency lesson 04, "Retry the same key" (motion-v2 cut).
 * One mechanism: after losing its first reply, the caller resends the same request with its saved key k7.
 * The service looks up k7, finds the record that points to ticket 47, and takes the "found" branch:
 * it returns the saved result and creates nothing. Two attempts, one ticket.
 * Render from the repository root:
 *   node video/idempotency/motion-v2/04/engine/render.mjs video/idempotency/motion-v2/04/scene.js video/idempotency/motion-v2/04/video.mp4
 */
FlowVideo.scene({
  meta: { title: 'Idempotency', subtitle: 'RETRY THE SAME KEY', subtitleSize: 40, subtitleSpacing: 6, subtitleY: 412, duration: 40, fps: 30, speed: 1 },
  build(s) {
    const T = s.THEME;
    const KEY = 'A5';                                 // the operation key's pitch (as in lesson 03)
    const XR = 450, XP = 680;

    // ---- caller ----
    s.node('caller', 'card', { x: 540, y: 615, w: 960, h: 310, title: 'Caller', titleSize: 48, titleY: 52, titleColor: T.fg,
      hasLamp: true, lamp: T.accent, state: 'outcome unknown', stateSize: 42, stateColor: T.accent, color: T.mid,
      lineY: [130, 198, 266], rowH: 58, lineSize: 44, tagSize: 40,
      l0Text: 'key k7 · release v1', l0Color: T.fg, l0Tag: 'saved', l0TagColor: T.ok, l0HlColor: T.ok, l0Hl: 0.45,
      l1Text: 'attempts: 1 · reply lost', l1Color: T.mid,
      l2Text: 'knows: nothing', l2Color: T.mid });
    s.wire('req', [XR, 773], [XR, 918]);
    s.wire('rep', [XP, 918], [XP, 773]);
    s.node('reqLab', 'label', { x: 130, y: 846, text: 'request', size: 40, color: T.mid });
    s.node('repLab', 'label', { x: 930, y: 846, text: 'reply', size: 40, color: T.mid });

    // ---- service: a lookup that selects one of two code paths ----
    s.node('svc', 'card', { x: 540, y: 1125, w: 960, h: 410, title: 'Service', titleSize: 48, titleY: 52, titleColor: T.fg,
      state: 'idle', stateSize: 42, stateColor: T.mid, color: T.mid });
    s.node('look', 'card', { x: 540, y: 1052, w: 700, h: 76, color: T.dim });
    s.node('lookLab', 'label', { x: 540, y: 1053, text: 'lookup k7', size: 42, mono: true, color: T.mid });
    s.wire('arrF', [290, 1092], [290, 1158], { color: T.wire });
    s.wire('arrN', [790, 1092], [790, 1158], { color: T.dim });
    s.set(0, 'wire:arrN', 'dashed', 1, 0);
    s.node('ahF', 'arrowhead', { x: 290, y: 1172, dir: 'down', size: 14, color: T.wire });
    s.node('ahN', 'arrowhead', { x: 790, y: 1172, dir: 'down', size: 14, color: T.dim });
    s.node('brF', 'card', { x: 290, y: 1240, w: 440, h: 130, title: 'found', titleSize: 40, titleY: 40, titleColor: T.mid, color: T.dim,
      lineY: [94], rowH: 52, lineSize: 40, l0Text: 'return saved', l0Color: T.mid });
    s.node('brN', 'card', { x: 790, y: 1240, w: 440, h: 130, title: 'new', titleSize: 40, titleY: 40, titleColor: T.dim, color: T.dim, dashed: true,
      lineY: [94], rowH: 52, lineSize: 40, l0Text: 'create ticket', l0Color: T.dim });
    s.wire('ask', [540, 1092], [540, 1604], { via: [] });
    s.wire('ask2', [540, 1604], [514, 1604]);

    // ---- database: the records from the first attempt ----
    s.node('db', 'card', { x: 540, y: 1545, w: 960, h: 330, title: 'Database', titleSize: 48, titleY: 44, titleColor: T.fg, color: T.mid,
      state: 'tickets: 1', stateSize: 42, stateColor: T.ok });
    s.node('keys', 'card', { x: 290, y: 1580, w: 440, h: 160, title: 'operation keys', titleSize: 38, titleY: 42, titleColor: T.mid, color: T.mid,
      lineY: [104], rowH: 60, lineSize: 44, l0Text: 'k7 → 47', l0Color: T.ok, l0HlColor: T.ok, l0Hl: 0.35 });
    s.node('tk', 'card', { x: 790, y: 1580, w: 440, h: 160, title: 'tickets', titleSize: 38, titleY: 42, titleColor: T.mid, color: T.mid,
      lineY: [104], rowH: 60, lineSize: 44, l0Text: '47  v1', l0Color: T.ok, l0HlColor: T.ok, l0Hl: 0.35 });
    s.node('foot', 'label', { x: 540, y: 1790, text: '2 attempts · 1 ticket', size: 46, mono: true, color: T.ok, alpha: 0 });

    const pan = (id) => s.panOf(id);
    const lit = (t, w, on, c) => { s.set(t, 'wire:' + w, 'color', on ? (c || T.fg) : T.wire, 0.25); s.set(t, 'wire:' + w, 'flow', on ? 1 : 0, 0); };
    const show = (t, id, d = 0.4) => { s.set(t - 0.01, id, 'alpha', 0, 0); s.set(t, id, 'alpha', 1, d); };
    const blink = (t0, t1) => { for (let t = t0, on = false; t < t1 - 0.05; t += 0.6, on = !on) s.set(t, 'caller', 'lamp', on ? T.accent : '#5A4520', 0.3); };

    // ---- beat 1 (0-8.0): the caller still needs its result; it reuses the saved key ----
    blink(0.6, 4.2);
    let t = 1.2;                                      // what the caller lacks
    s.set(t, 'caller', 'l1HlColor', T.mid, 0); s.set(t, 'caller', 'l1Hl', 1, 0.2); s.set(t + 1.0, 'caller', 'l1Hl', 0, 0.5);
    s.set(t + 0.5, 'caller', 'l2HlColor', T.accent, 0); s.set(t + 0.5, 'caller', 'l2Hl', 1, 0.2); s.set(t + 0.5, 'caller', 'l2Color', T.fg, 0.2);
    s.sfx(t, 'ack', { note: 'C6', gain: 1.2, pan: pan('caller') });
    t = 2.8;                                          // what already exists
    s.pulse(t, 'db'); s.set(t, 'keys', 'l0Hl', 1, 0.2); s.set(t, 'tk', 'l0Hl', 1, 0.2);
    s.set(t + 1.0, 'keys', 'l0Hl', 0.35, 0.5); s.set(t + 1.0, 'tk', 'l0Hl', 0.35, 0.5);
    s.sfx(t, 'ack', { note: 'E6', gain: 1.1, pan: pan('db') });
    t = 4.4;                                          // retry, reusing the saved key
    s.set(t, 'caller', 'state', 'retrying', 0); s.set(t, 'caller', 'stateColor', T.fg, 0); s.set(t, 'caller', 'lamp', T.fg, 0.2);
    s.set(t, 'caller', 'l1Text', 'attempts: 2 · retry', 0); s.set(t, 'caller', 'l1Color', T.fg, 0.2);
    s.set(t, 'caller', 'l1HlColor', T.fg, 0); s.set(t, 'caller', 'l1Hl', 1, 0.2); s.set(t + 1.2, 'caller', 'l1Hl', 0, 0.5);
    s.set(t + 0.5, 'caller', 'l0Hl', 1, 0.2); s.pulse(t + 0.5, 'caller'); s.set(t + 1.8, 'caller', 'l0Hl', 0.45, 0.6);
    s.set(t + 0.5, 'caller', 'l0Tag', 'same key', 0);
    s.sfx(t, 'ack', { note: 'C6', gain: 1.0, pan: pan('caller') });
    s.sfx(t + 0.5, 'ack', { note: KEY, gain: 1.6, pan: pan('caller') });

    // ---- beat 2 (8.0-17.0): the service looks up k7; its record points to ticket 47 ----
    t = 8.0;
    s.set(t, 'caller', 'state', 'waiting', 0); s.set(t, 'caller', 'stateColor', T.accent, 0);
    blink(t, 25.7);
    lit(t, 'req', true);
    s.packet({ route: [[XR, 812], [XR, 884]], t, dur: 1.4, kind: 'chip', label: 'retry v1 · k7', color: T.fg, size: 40 });
    s.sfx(t, 'send', { note: 'C6', gain: 1.2, pan: pan('caller') });
    s.sfx(t + 0.25, 'ack', { note: KEY, gain: 1.0, pan: pan('caller') });
    t = 9.4;
    lit(t, 'req', false);
    s.ripple(t, [XR, 922], T.fg, { r0: 8, r1: 36 });
    s.set(t, 'svc', 'color', T.fg, 0.2); s.set(t, 'svc', 'state', 'looking up', 0); s.set(t, 'svc', 'stateColor', T.fg, 0);
    s.set(t, 'look', 'color', T.fg, 0.2); s.set(t, 'lookLab', 'color', T.fg, 0.2);
    s.sfx(t, 'arrive', { note: 'G5', pan: pan('svc') });
    t = 10.2;                                         // the probe reaches the key table
    lit(t, 'ask', true); lit(t, 'ask2', true);
    s.packet({ route: [[540, 1092], [540, 1604], [514, 1604]], t, dur: 1.1, kind: 'dot', color: T.fg });
    s.sfx(t, 'send', { note: 'A6', gain: 1.0, pan: 0 });
    t = 11.3;
    s.set(t, 'keys', 'color', T.ok, 0.2); s.set(t, 'keys', 'glow', 0.8, 0.15); s.set(t + 0.6, 'keys', 'glow', 0, 0.8);
    s.set(t, 'keys', 'l0Hl', 1, 0.15); s.set(t, 'keys', 'titleColor', T.fg, 0.2);
    s.sfx(t, 'hit', { note: KEY, gain: 1.6, pan: pan('keys') });
    t = 12.1;
    s.packet({ route: [[514, 1604], [540, 1604], [540, 1092]], t, dur: 1.1, kind: 'dot', color: T.ok });
    t = 13.2;
    lit(t, 'ask', false); lit(t, 'ask2', false);
    s.set(t, 'lookLab', 'text', 'lookup k7 → 47', 0); s.set(t, 'lookLab', 'color', T.ok, 0.2); s.set(t, 'look', 'color', T.ok, 0.2);
    s.set(t, 'svc', 'state', 'found', 0); s.set(t, 'svc', 'stateColor', T.ok, 0);
    s.sfx(t, 'ack', { note: 'G5', gain: 1.2, pan: pan('svc') });

    // ---- beat 3 (17.0-24.5): the existing result is returned; no second ticket is created ----
    t = 17.0;
    s.set(t, 'wire:arrF', 'color', T.ok, 0.25); s.set(t, 'wire:arrF', 'flow', 1, 0); s.set(t, 'ahF', 'color', T.ok, 0.25);
    s.set(t, 'brF', 'color', T.ok, 0.25); s.set(t, 'brF', 'glow', 0.7, 0.2); s.set(t + 0.6, 'brF', 'glow', 0, 0.8);
    s.set(t, 'brF', 'titleColor', T.ok, 0.25); s.set(t, 'brF', 'l0Color', T.fg, 0.25);
    s.set(t, 'brF', 'l0HlColor', T.ok, 0); s.set(t, 'brF', 'l0Hl', 1, 0.2);
    s.sfx(t, 'ack', { note: 'G5', gain: 1.6, pan: pan('brF') });
    s.set(t + 1.2, 'wire:arrF', 'flow', 0, 0);
    t = 18.6;                                         // nothing new is written
    s.set(t, 'db', 'stateColor', T.fg, 0.2); s.set(t + 1.0, 'db', 'stateColor', T.ok, 0.5);
    s.set(t, 'tk', 'l0Hl', 1, 0.2); s.set(t + 1.0, 'tk', 'l0Hl', 0.35, 0.5); s.pulse(t, 'tk');
    s.sfx(t, 'ack', { note: 'E6', gain: 1.1, pan: pan('tk') });
    s.set(19.6, 'keys', 'l0Hl', 0.35, 0.6); s.set(19.6, 'keys', 'color', T.mid, 0.6); s.set(19.6, 'keys', 'titleColor', T.mid, 0.6);

    // ---- beat 4 (24.5-40.0): the caller receives ticket 47; one ticket remains ----
    t = 24.5;
    s.set(t, 'svc', 'state', 'replied', 0); s.set(t, 'svc', 'stateColor', T.fg, 0);
    lit(t, 'rep', true, T.ok);
    s.packet({ route: [[XP, 884], [XP, 812]], t, dur: 1.2, kind: 'chip', label: 'ticket 47', color: T.ok, size: 40 });
    s.sfx(t, 'send', { note: 'G6', gain: 1.2, pan: pan('svc') });
    t = 25.7;
    lit(t, 'rep', false);
    s.ripple(t, [XP, 792], T.ok, { r0: 6, r1: 20 });
    s.set(t, 'caller', 'lamp', T.ok, 0.2); s.set(t, 'caller', 'state', 'got ticket 47', 0); s.set(t, 'caller', 'stateColor', T.ok, 0);
    s.set(t, 'caller', 'color', T.ok, 0.2); s.set(t, 'caller', 'glow', 0.7, 0.2); s.set(t + 0.6, 'caller', 'glow', 0, 0.8);
    s.set(t, 'caller', 'l2Text', 'knows: ticket 47', 0); s.set(t, 'caller', 'l2Color', T.ok, 0.2);
    s.set(t, 'caller', 'l2HlColor', T.ok, 0.2); s.set(t + 1.2, 'caller', 'l2Hl', 0.45, 0.6);
    s.sfx(t, 'deliver', { note: 'C5', gain: 1.8, pan: pan('caller') });
    t = 27.4;                                         // two attempts...
    s.set(t, 'caller', 'l1HlColor', T.fg, 0); s.set(t, 'caller', 'l1Hl', 1, 0.2); s.set(t + 1.0, 'caller', 'l1Hl', 0, 0.5);
    s.sfx(t, 'ack', { note: 'C6', gain: 1.1, pan: pan('caller') });
    t = 28.5;                                         // ...one ticket
    s.pulse(t, 'db'); s.set(t, 'db', 'stateColor', T.fg, 0.2); s.set(t + 1.0, 'db', 'stateColor', T.ok, 0.5);
    s.set(t, 'tk', 'l0Hl', 1, 0.2); s.set(t + 1.0, 'tk', 'l0Hl', 0.35, 0.5);
    s.sfx(t, 'ack', { note: 'E6', gain: 1.1, pan: pan('tk') });
    t = 29.8;
    show(t, 'foot', 0.6);
    s.sfx(t, 'chime', { note: 'C5', gain: 0.8, pan: 0 });
    s.fade(38.0, 1, 1.0);
    s.meta.duration = 40.0;
  },
});
