/* Idempotency lesson 03, "Name the operation" (motion-v2 cut).
 * One mechanism: the caller saves key k7 with its request before sending. The service finds no record
 * for k7, then stores the ticket row and the key row in one transaction, so both appear together. If this
 * reply is lost too, the caller still holds k7 and the database still maps k7 to ticket 47.
 * Render from the repository root:
 *   node video/idempotency/motion-v2/03/engine/render.mjs video/idempotency/motion-v2/03/scene.js video/idempotency/motion-v2/03/video.mp4
 */
FlowVideo.scene({
  meta: { title: 'Idempotency', subtitle: 'NAME THE OPERATION', subtitleSize: 40, subtitleSpacing: 6, subtitleY: 412, duration: 46, fps: 30, speed: 1 },
  build(s) {
    const T = s.THEME;
    const KEY = 'A5';                                // the operation key has its own pitch
    const XR = 440, XP = 680;                         // request and reply lanes

    // ---- stage ----
    s.node('caller', 'card', { x: 540, y: 600, w: 960, h: 230, title: 'Caller', titleSize: 48, titleY: 54, titleColor: T.fg,
      hasLamp: true, lamp: T.dim, state: 'not sent', stateSize: 42, stateColor: T.mid, color: T.mid,
      lineY: [148], rowH: 66, lineSize: 44, tagSize: 40,
      l0Text: 'key k7 · release v1', l0Reveal: 0, l0Slot: 1, l0Color: T.fg, l0Tag: '', l0TagColor: T.ok });
    s.wire('req', [XR, 718], [XR, 878]);
    s.wire('rep', [XP, 878], [XP, 718]);
    s.node('reqLab', 'label', { x: 140, y: 798, text: 'request', size: 40, color: T.mid });
    s.node('repLab', 'label', { x: 920, y: 798, text: 'reply', size: 40, color: T.mid });
    s.node('lostX', 'xmark', { x: XP, y: 790, r: 26, color: T.mid, alpha: 0, scale: 0.4 });
    s.node('svc', 'card', { x: 540, y: 950, w: 960, h: 140, title: 'Service', titleSize: 48, titleY: 70, titleColor: T.fg,
      state: 'idle', stateSize: 42, stateColor: T.mid, color: T.mid });
    s.wire('ask', [540, 1022], [540, 1084]);
    s.node('db', 'card', { x: 540, y: 1385, w: 960, h: 600, title: 'Database', titleSize: 48, titleY: 44, titleColor: T.fg, color: T.mid });
    s.node('tx', 'card', { x: 540, y: 1410, w: 910, h: 460, title: 'transaction', titleSize: 40, titleY: 34, titleColor: T.accent,
      state: 'open', stateSize: 40, stateColor: T.accent, color: T.accent, dashed: true, noFill: true, alpha: 0 });
    s.node('tk', 'card', { x: 540, y: 1322, w: 860, h: 140, title: 'tickets', titleSize: 40, titleY: 40, titleColor: T.mid, color: T.dim,
      lineY: [100], rowH: 60, lineSize: 44,
      l0Text: '47  release v1', l0Alpha: 0, l0Slot: 1, l0Color: T.accent });
    s.node('keys', 'card', { x: 540, y: 1527, w: 860, h: 140, title: 'operation keys', titleSize: 40, titleY: 40, titleColor: T.mid, color: T.dim,
      state: 'unique', stateSize: 40, stateColor: T.mid,
      lineY: [100], rowH: 60, lineSize: 44,
      l0Text: '', l0Alpha: 0, l0Slot: 1, l0Color: T.accent });
    s.node('foot', 'label', { x: 540, y: 1770, text: 'k7 still names ticket 47', size: 46, mono: true, color: T.ok, alpha: 0 });

    const pan = (id) => s.panOf(id);
    const lit = (t, w, on) => { s.set(t, 'wire:' + w, 'color', on ? T.fg : T.wire, 0.25); s.set(t, 'wire:' + w, 'flow', on ? 1 : 0, 0); };
    const show = (t, id, d = 0.4) => { s.set(t - 0.01, id, 'alpha', 0, 0); s.set(t, id, 'alpha', 1, d); };
    const blink = (t0, t1) => { for (let t = t0, on = true; t < t1 - 0.05; t += 0.6, on = !on) s.set(t, 'caller', 'lamp', on ? T.accent : '#5A4520', 0.3); };

    // ---- beat 1 (0-8.0): save key k7 with the request before anything is sent ----
    let t = 1.2;
    s.set(t, 'caller', 'color', T.fg, 0.3); s.set(t, 'caller', 'glow', 0.5, 0.3);
    s.set(t, 'caller', 'l0Reveal', 1, 1.2, 'linear');
    s.sfx(t, 'ack', { note: 'A6', gain: 1.2, pan: pan('caller') });
    t = 2.8;                                         // the key is saved locally
    s.set(t, 'caller', 'l0Slot', 0, 0.2);
    s.set(t, 'caller', 'l0HlColor', T.ok, 0); s.set(t, 'caller', 'l0Hl', 1, 0.2); s.set(t + 1.2, 'caller', 'l0Hl', 0.5, 0.8);
    s.set(t, 'caller', 'l0Tag', 'saved locally', 0);
    s.set(t + 0.6, 'caller', 'glow', 0, 0.6); s.set(t + 0.6, 'caller', 'color', T.mid, 0.6);
    s.sfx(t, 'store', { note: KEY, gain: 2.0, pan: pan('caller') });
    t = 4.4;                                         // still nothing sent
    s.pulse(t, 'caller'); s.set(t, 'caller', 'stateColor', T.fg, 0.2); s.set(t + 1.0, 'caller', 'stateColor', T.mid, 0.5);
    s.sfx(t, 'clock', { gain: 1.4, pan: pan('caller') });

    // ---- beat 2 (8.0-16.0): send the key with the request; the service checks its records ----
    t = 8.0;
    s.set(t, 'caller', 'state', 'sending', 0); s.set(t, 'caller', 'stateColor', T.fg, 0);
    lit(t, 'req', true);
    s.packet({ route: [[XR, 716], [XR, 880]], t: t + 0.2, dur: 1.6, kind: 'chip', label: 'create v1 · k7', color: T.fg, size: 40 });
    s.sfx(t + 0.2, 'send', { note: 'C6', gain: 1.2, pan: pan('caller') });
    s.sfx(t + 0.45, 'ack', { note: KEY, gain: 1.0, pan: pan('caller') });
    t = 9.8;
    lit(t, 'req', false);
    s.ripple(t, [XR, 882], T.fg, { r0: 8, r1: 40 });
    s.set(t, 'caller', 'state', 'waiting', 0); s.set(t, 'caller', 'stateColor', T.accent, 0);
    blink(t, 31.0);
    s.set(t, 'svc', 'color', T.fg, 0.2); s.set(t, 'svc', 'glow', 0.5, 0.2); s.set(t + 0.6, 'svc', 'glow', 0, 0.6);
    s.set(t, 'svc', 'state', 'checking k7', 0); s.set(t, 'svc', 'stateColor', T.fg, 0);
    s.sfx(t, 'arrive', { note: 'G5', pan: pan('svc') });
    t = 10.8;                                        // lookup k7 in the key table
    lit(t, 'ask', true);
    s.packet({ route: [[540, 1022], [540, 1086]], t, dur: 0.5, kind: 'dot', color: T.fg });
    s.sfx(t, 'send', { note: 'A6', gain: 1.0, pan: 0 });
    t = 11.4;
    s.set(t, 'keys', 'color', T.mid, 0.2); s.pulse(t, 'keys');
    s.set(t, 'keys', 'l0Text', 'no row for k7', 0); s.set(t, 'keys', 'l0Color', T.mid, 0); s.set(t, 'keys', 'l0Alpha', 1, 0.25);
    s.set(t, 'keys', 'l0HlColor', T.mid, 0); s.set(t, 'keys', 'l0Hl', 1, 0.2);
    s.sfx(t, 'miss', { note: 'E5', gain: 0.9, pan: 0 });
    t = 12.4;
    s.packet({ route: [[540, 1086], [540, 1022]], t, dur: 0.5, kind: 'dot', color: T.mid });
    t = 12.9;
    lit(t, 'ask', false);
    s.set(t, 'svc', 'state', 'no record', 0); s.set(t, 'svc', 'stateColor', T.mid, 0);
    s.set(t, 'svc', 'color', T.mid, 0.5);
    t = 14.6;
    s.set(t, 'keys', 'l0Alpha', 0, 0.5); s.set(t, 'keys', 'l0Hl', 0, 0.5); s.set(t, 'keys', 'color', T.dim, 0.5);

    // ---- beat 3 (16.0-26.5): create ticket 47; store the ticket and key in one transaction ----
    t = 16.0;
    s.set(t, 'svc', 'state', 'creating', 0); s.set(t, 'svc', 'stateColor', T.accent, 0); s.set(t, 'svc', 'color', T.fg, 0.3);
    show(t, 'tx', 0.5);
    s.sfx(t, 'ack', { note: 'E4', gain: 1.6, pan: 0 });
    t = 17.2;                                        // pending ticket row
    s.set(t, 'tk', 'l0Dash', 1, 0); s.set(t, 'tk', 'l0SlotColor', T.accent, 0.2);
    s.set(t, 'tk', 'l0Alpha', 0.7, 0.3); s.set(t, 'tk', 'color', T.mid, 0.3);
    s.sfx(t, 'work', { note: 'E4', gain: 1.4, pan: 0 });
    t = 18.4;                                        // pending key row, claimed under the unique key
    s.set(t, 'keys', 'l0Text', 'k7 → ticket 47', 0); s.set(t, 'keys', 'l0Color', T.accent, 0);
    s.set(t, 'keys', 'l0Dash', 1, 0); s.set(t, 'keys', 'l0SlotColor', T.accent, 0.2);
    s.set(t, 'keys', 'l0Alpha', 0.7, 0.3); s.set(t, 'keys', 'color', T.mid, 0.3);
    s.set(t, 'keys', 'stateColor', T.accent, 0.2);
    s.sfx(t, 'work', { note: 'E4', gain: 1.4, pan: 0 });
    s.sfx(t + 0.15, 'ack', { note: KEY, gain: 1.0, pan: 0 });
    t = 21.4;                                        // commit: both rows become saved in the same frame
    for (const id of ['tk', 'keys']) {
      s.set(t, id, 'l0Dash', 0, 0); s.set(t, id, 'l0Slot', 0, 0); s.set(t, id, 'l0Alpha', 1, 0);
      s.set(t, id, 'l0Color', T.ok, 0); s.set(t, id, 'l0HlColor', T.ok, 0); s.set(t, id, 'l0Hl', 1, 0);
      s.set(t, id, 'color', T.ok, 0); s.set(t, id, 'glow', 0.8, 0.1); s.set(t + 0.5, id, 'glow', 0, 0.8);
      s.set(t + 1.4, id, 'l0Hl', 0.45, 0.8);
    }
    s.set(t, 'keys', 'stateColor', T.ok, 0);
    s.set(t, 'tx', 'dashed', 0, 0); s.set(t, 'tx', 'color', T.ok, 0); s.set(t, 'tx', 'titleColor', T.ok, 0);
    s.set(t, 'tx', 'state', 'committed', 0); s.set(t, 'tx', 'stateColor', T.ok, 0);
    s.set(t, 'svc', 'state', 'committed', 0); s.set(t, 'svc', 'stateColor', T.ok, 0);
    s.sfx(t, 'store', { note: 'E5', gain: 2.2, pan: 0 });
    s.sfx(t, 'store', { note: KEY, gain: 1.6, pan: 0 });
    t = 24.4;                                        // the transaction is over; the two rows remain
    s.set(t, 'tx', 'alpha', 0, 0.8);
    s.set(t, 'svc', 'color', T.mid, 0.6);

    // ---- beat 4 (26.5-46): suppose this reply is lost too; k7 still identifies ticket 47 ----
    t = 26.5;
    s.set(t, 'svc', 'state', 'replied', 0); s.set(t, 'svc', 'stateColor', T.fg, 0);
    lit(t, 'rep', true);
    s.packet({ route: [[XP, 880], [XP, 800]], t, dur: 1.1, kind: 'chip', label: 'ticket 47', color: T.ok, size: 40, ease: 'linear', fade: 0.4 });
    s.sfx(t, 'send', { note: 'G6', gain: 1.2, pan: pan('svc') });
    t = 27.6;
    lit(t, 'rep', false);
    s.set(t, 'lostX', 'alpha', 1, 0.15); s.set(t, 'lostX', 'scale', 1, 0.35, 'back');
    s.set(t + 0.3, 'repLab', 'text', 'reply lost', 0);
    s.sfx(t, 'poof', { note: 'C5', gain: 1.6, pan: s.panOf([XP, 790]) });
    t = 31.0;                                        // the caller's wait ends without a reply
    s.set(t, 'caller', 'lamp', T.accent, 0.2);
    s.set(t, 'caller', 'state', 'timed out', 0);
    s.shake(t, 'caller', 8, 0.35);
    s.sfx(t, 'thump', { note: 'C4', gain: 1.1, pan: pan('caller') });
    s.set(32.3, 'caller', 'state', 'outcome unknown', 0);
    t = 34.0;                                        // the name survives on both sides
    s.set(t, 'caller', 'l0Hl', 1, 0.2); s.pulse(t, 'caller');
    s.sfx(t, 'ack', { note: KEY, gain: 1.4, pan: pan('caller') });
    t = 35.1;
    s.set(t, 'keys', 'l0Hl', 1, 0.2); s.pulse(t, 'keys');
    s.sfx(t, 'ack', { note: KEY, gain: 1.4, pan: 0 });
    t = 36.2;
    s.set(t, 'tk', 'l0Hl', 1, 0.2); s.pulse(t, 'tk');
    s.sfx(t, 'ack', { note: 'E5', gain: 1.4, pan: 0 });
    t = 37.4;
    show(t, 'foot', 0.6);
    s.fade(44.0, 1, 1.0);
    s.meta.duration = 46.0;
  },
});
