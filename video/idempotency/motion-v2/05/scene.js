/* Idempotency lesson 05, "Changed intent, new key" (motion-v2 cut).
 * One mechanism: key k7 already names "create a ticket for release v1". A request reuses k7 but asks for
 * release v2. The service compares the stored request with the incoming one field by field: the key matches,
 * the release differs, so it rejects the request and leaves ticket 47 untouched. New intent needs a new key.
 * Render from the repository root:
 *   node video/idempotency/motion-v2/05/engine/render.mjs video/idempotency/motion-v2/05/scene.js video/idempotency/motion-v2/05/video.mp4
 */
FlowVideo.scene({
  meta: { title: 'Idempotency', subtitle: 'CHANGED INTENT, NEW KEY', subtitleSize: 40, subtitleSpacing: 6, subtitleY: 412, duration: 42, fps: 30, speed: 1 },
  build(s) {
    const T = s.THEME;
    const KEY = 'A5';                                  // the key's pitch (lessons 03-04)
    const XR = 450, XP = 680;

    // ---- caller: two intents ----
    s.node('caller', 'card', { x: 540, y: 590, w: 960, h: 250, title: 'Caller', titleSize: 48, titleY: 52, titleColor: T.fg,
      hasLamp: true, lamp: T.ok, state: 'has ticket 47', stateSize: 42, stateColor: T.ok, color: T.mid,
      lineY: [130, 200], rowH: 60, lineSize: 44, tagSize: 40,
      l0Text: 'k7 · release v1', l0Color: T.fg, l0Tag: 'done', l0TagColor: T.ok, l0HlColor: T.ok, l0Hl: 0.4,
      l1Text: 'k7 · release v2', l1Color: T.accent, l1Alpha: 0, l1Tag: 'new intent?', l1TagColor: T.accent, l1Slot: 1 });
    s.wire('req', [XR, 718], [XR, 868]);
    s.wire('rep', [XP, 868], [XP, 718]);
    s.node('reqLab', 'label', { x: 130, y: 793, text: 'request', size: 40, color: T.mid });
    s.node('repLab', 'label', { x: 930, y: 793, text: 'reply', size: 40, color: T.mid });

    // ---- service: stored request versus incoming request ----
    s.node('svc', 'card', { x: 540, y: 1085, w: 960, h: 410, title: 'Service', titleSize: 48, titleY: 52, titleColor: T.fg,
      state: 'idle', stateSize: 42, stateColor: T.mid, color: T.mid });
    const col = (id, x, title) => s.node(id, 'card', { x, y: 1110, w: 400, h: 210, title, titleSize: 38, titleY: 38, titleColor: T.mid, color: T.dim,
      lineY: [100, 166], rowH: 56, lineSize: 42, l0Text: 'key      k7', l0Alpha: 0, l0Slot: 1, l1Text: 'release  v1', l1Alpha: 0, l1Slot: 1, l0Color: T.fg, l1Color: T.fg });
    col('stored', 300, 'stored for k7');
    col('incoming', 780, 'incoming');
    s.set(0, 'incoming', 'l1Text', 'release  v2', 0);
    s.node('eqKey', 'label', { x: 540, y: 1106, text: '=', size: 60, mono: true, color: T.ok, alpha: 0 });
    s.node('neRel', 'label', { x: 540, y: 1172, text: '≠', size: 60, mono: true, color: T.accent, alpha: 0 });
    s.node('verdict', 'label', { x: 540, y: 1254, text: 'same key · different request', size: 40, mono: true, color: T.accent, alpha: 0 });
    s.wire('fetch', [400, 1508], [400, 1218]);

    // ---- database (as in lesson 04) ----
    s.node('db', 'card', { x: 540, y: 1505, w: 960, h: 330, title: 'Database', titleSize: 48, titleY: 44, titleColor: T.fg, color: T.mid,
      state: 'tickets: 1', stateSize: 42, stateColor: T.ok });
    s.node('keys', 'card', { x: 290, y: 1580, w: 440, h: 140, title: 'operation keys', titleSize: 38, titleY: 40, titleColor: T.mid, color: T.mid,
      lineY: [96], rowH: 58, lineSize: 44, l0Text: 'k7 → 47 · v1', l0Color: T.ok, l0HlColor: T.ok, l0Hl: 0.35 });
    s.node('tk', 'card', { x: 790, y: 1580, w: 440, h: 140, title: 'tickets', titleSize: 38, titleY: 40, titleColor: T.mid, color: T.mid,
      lineY: [96], rowH: 58, lineSize: 44, l0Text: '47  v1', l0Color: T.ok, l0HlColor: T.ok, l0Hl: 0.35 });
    s.node('foot1', 'label', { x: 540, y: 1735, text: 'rejected · record unchanged', size: 42, mono: true, color: T.fg, alpha: 0 });
    s.node('foot2', 'label', { x: 540, y: 1800, text: 'retry: same key · new intent: new key', size: 40, mono: true, color: T.ok, alpha: 0 });

    const pan = (id) => s.panOf(id);
    const lit = (t, w, on, c) => { s.set(t, 'wire:' + w, 'color', on ? (c || T.fg) : T.wire, 0.25); s.set(t, 'wire:' + w, 'flow', on ? 1 : 0, 0); };
    const show = (t, id, d = 0.4) => { s.set(t - 0.01, id, 'alpha', 0, 0); s.set(t, id, 'alpha', 1, d); };
    const hl = (t, id, i, c, hold = 1.0, rest = 0) => { s.set(t, id, 'l' + i + 'HlColor', c, 0); s.set(t, id, 'l' + i + 'Hl', 1, 0.2); s.set(t + hold, id, 'l' + i + 'Hl', rest, 0.5); };

    // ---- beat 1 (0-8.5): k7 belongs to release v1; the new payload asks for v2 ----
    let t = 1.2;                                       // k7 already names v1, on both sides
    hl(t, 'caller', 0, T.ok, 1.2, 0.4); hl(t, 'keys', 0, T.ok, 1.2, 0.35); s.pulse(t, 'keys');
    s.sfx(t, 'ack', { note: KEY, gain: 1.4, pan: 0 });
    t = 3.0;                                           // a new request reuses k7 for v2
    s.set(t, 'caller', 'l1Alpha', 1, 0.3); s.set(t, 'caller', 'l1Slot', 0, 0.3);
    s.set(t, 'caller', 'color', T.fg, 0.2); s.set(t + 1.0, 'caller', 'color', T.mid, 0.6);
    s.sfx(t, 'ack', { note: 'C6', gain: 1.3, pan: pan('caller') });
    t = 4.6;                                           // same key, different release
    hl(t, 'caller', 0, T.fg, 1.4, 0.4); hl(t, 'caller', 1, T.accent, 1.4, 0);
    s.sfx(t, 'ack', { note: KEY, gain: 1.2, pan: pan('caller') });

    // ---- beat 2 (8.5-19.0): the service compares; same key, different intent ----
    t = 8.5;
    s.set(t, 'caller', 'state', 'sending', 0); s.set(t, 'caller', 'stateColor', T.fg, 0); s.set(t, 'caller', 'lamp', T.fg, 0.2);
    lit(t, 'req', true);
    s.packet({ route: [[XR, 756], [XR, 830]], t, dur: 1.4, kind: 'chip', label: 'create v2 · k7', color: T.accent, size: 40 });
    s.sfx(t, 'send', { note: 'C6', gain: 1.2, pan: pan('caller') });
    s.sfx(t + 0.25, 'ack', { note: KEY, gain: 1.0, pan: pan('caller') });
    t = 9.9;
    lit(t, 'req', false);
    s.ripple(t, [XR, 872], T.fg, { r0: 8, r1: 34 });
    s.set(t, 'svc', 'color', T.fg, 0.2); s.set(t, 'svc', 'state', 'comparing', 0); s.set(t, 'svc', 'stateColor', T.fg, 0);
    s.set(t, 'incoming', 'color', T.mid, 0.2); s.set(t, 'incoming', 'titleColor', T.fg, 0.2);
    for (const i of [0, 1]) { s.set(t, 'incoming', 'l' + i + 'Alpha', 1, 0.3); s.set(t, 'incoming', 'l' + i + 'Slot', 0, 0.3); }
    s.sfx(t, 'arrive', { note: 'G5', pan: pan('svc') });
    t = 10.9;                                          // fetch the stored request for k7
    hl(t, 'keys', 0, T.fg, 0.8, 0.35);
    lit(t, 'fetch', true);
    s.packet({ route: [[400, 1508], [400, 1218]], t, dur: 0.9, kind: 'dot', color: T.ok });
    s.sfx(t, 'send', { note: 'A6', gain: 1.0, pan: s.panOf([400, 1300]) });
    t = 11.8;
    lit(t, 'fetch', false);
    s.set(t, 'stored', 'color', T.mid, 0.2); s.set(t, 'stored', 'titleColor', T.fg, 0.2);
    for (const i of [0, 1]) { s.set(t, 'stored', 'l' + i + 'Alpha', 1, 0.3); s.set(t, 'stored', 'l' + i + 'Slot', 0, 0.3); }
    s.sfx(t, 'ack', { note: 'E5', gain: 1.3, pan: pan('stored') });
    t = 13.2;                                          // key row: equal
    hl(t, 'stored', 0, T.ok, 99); hl(t, 'incoming', 0, T.ok, 99);
    s.set(t, 'stored', 'l0Color', T.ok, 0.2); s.set(t, 'incoming', 'l0Color', T.ok, 0.2);
    show(t, 'eqKey', 0.3);
    s.sfx(t, 'ack', { note: KEY, gain: 1.5, pan: 0 });
    t = 14.6;                                          // release row: different
    hl(t, 'stored', 1, T.accent, 99); hl(t, 'incoming', 1, T.accent, 99);
    s.set(t, 'incoming', 'l1Color', T.accent, 0.2);
    show(t, 'neRel', 0.3); s.shake(t, 'neRel', 8, 0.35);
    s.sfx(t, 'miss', { note: 'E5', gain: 3.2, pan: 0 });
    t = 15.6;
    show(t, 'verdict', 0.4);
    s.set(t, 'svc', 'state', 'mismatch', 0); s.set(t, 'svc', 'stateColor', T.accent, 0);

    // ---- beat 3 (19.0-28.0): reject; do not overwrite the old operation ----
    t = 19.0;
    s.set(t, 'svc', 'state', 'rejected', 0);
    s.shake(t, 'svc', 6, 0.3);
    s.sfx(t, 'thump', { note: 'G4', gain: 1.0, pan: pan('svc') });
    t = 19.4;
    lit(t, 'rep', true, T.accent);
    s.packet({ route: [[XP, 830], [XP, 756]], t, dur: 1.2, kind: 'chip', label: 'rejected', color: T.accent, size: 40 });
    s.sfx(t, 'send', { note: 'G6', gain: 1.1, pan: pan('svc') });
    t = 20.6;
    lit(t, 'rep', false);
    s.ripple(t, [XP, 738], T.accent, { r0: 6, r1: 20 });
    s.set(t, 'caller', 'state', 'rejected', 0); s.set(t, 'caller', 'stateColor', T.accent, 0); s.set(t, 'caller', 'lamp', T.accent, 0.2);
    s.set(t, 'caller', 'l1Tag', 'rejected', 0); s.set(t, 'caller', 'l1Color', T.mid, 0.4);
    s.sfx(t, 'deliver', { note: 'C4', gain: 1.6, pan: pan('caller') });
    t = 21.8;                                          // the record is untouched
    s.pulse(t, 'db'); hl(t, 'keys', 0, T.ok, 1.2, 0.35); hl(t, 'tk', 0, T.ok, 1.2, 0.35);
    s.set(t, 'db', 'stateColor', T.fg, 0.2); s.set(t + 1.2, 'db', 'stateColor', T.ok, 0.5);
    s.sfx(t, 'ack', { note: 'E6', gain: 1.2, pan: pan('db') });
    t = 22.8;
    show(t, 'foot1', 0.5);

    // ---- beat 4 (28.0-42.0): new intent needs a new key; a retry keeps its identity ----
    t = 28.0;
    s.set(t, 'caller', 'l1Text', 'k8 · release v2', 0); s.set(t, 'caller', 'l1Color', T.ok, 0.2);
    s.set(t, 'caller', 'l1Tag', 'not sent', 0); s.set(t, 'caller', 'l1TagColor', T.mid, 0);
    hl(t, 'caller', 1, T.ok, 1.2, 0.4);
    s.set(t, 'caller', 'state', 'new key ready', 0); s.set(t, 'caller', 'stateColor', T.ok, 0); s.set(t, 'caller', 'lamp', T.ok, 0.2);
    s.sfx(t, 'store', { note: 'B5', gain: 1.8, pan: pan('caller') });
    t = 29.6;                                          // retry keeps k7 for v1; new intent uses k8
    hl(t, 'caller', 0, T.ok, 1.0, 0.4);
    s.sfx(t, 'ack', { note: KEY, gain: 1.3, pan: pan('caller') });
    t = 30.7;
    hl(t, 'caller', 1, T.ok, 1.0, 0.4);
    s.sfx(t, 'ack', { note: 'B5', gain: 1.3, pan: pan('caller') });
    t = 31.9;
    show(t, 'foot2', 0.6);
    s.sfx(t, 'chime', { note: 'C5', gain: 0.8, pan: 0 });
    s.fade(40.0, 1, 1.0);
    s.meta.duration = 42.0;
  },
});
