/* Idempotency lesson 01, "One intended operation" (motion-v2 cut).
 * One mechanism: the saved ticket row is the business effect; the response that arrives later
 * only reports it. The caller's "knows" row stays empty while ticket 47 already sits in the table.
 * Render from the repository root:
 *   node video/idempotency/motion-v2/01/engine/render.mjs video/idempotency/motion-v2/01/scene.js video/idempotency/motion-v2/01/video.mp4
 * Uses the cut-local engine copy (adds the general 'card' node, chip label size, subtitle size).
 */
FlowVideo.scene({
  meta: { title: 'Idempotency', subtitle: 'ONE INTENDED OPERATION', subtitleSize: 40, subtitleSpacing: 6, subtitleY: 412, duration: 44, fps: 30, speed: 1 },
  build(s) {
    const T = s.THEME;
    const C = 'C5', SVC = 'G5', DB = 'E5';          // actor pitches (C major chord)

    // ---- stage ----
    s.node('caller', 'card', { x: 540, y: 640, w: 960, h: 250, title: 'Caller', titleSize: 50, titleY: 56, titleColor: T.fg,
      hasLamp: true, lamp: T.dim, state: 'ready', stateSize: 44, stateColor: T.mid, color: T.mid,
      lineY: [138, 208], rowH: 62, lineSize: 46,
      l0Text: 'wants  1 ticket for release v1', l0Reveal: 0, l0Color: T.fg,
      l1Text: 'knows  nothing yet', l1Color: T.mid });

    s.node('svc', 'card', { x: 540, y: 1335, w: 960, h: 700, title: 'Ticket service', titleSize: 50, titleY: 56, titleColor: T.fg,
      state: 'idle', stateSize: 44, stateColor: T.mid, color: T.mid, dashed: true,
      lineY: [136], rowH: 66, lineSize: 46,
      l0Text: 'create ticket · v1', l0Alpha: 0, l0Slot: 1, l0Color: T.fg });

    s.node('table', 'card', { x: 540, y: 1398, w: 880, h: 300, title: 'Database · tickets', titleSize: 46, titleY: 50, titleColor: T.mid,
      color: T.mid, lineY: [128, 212], rowH: 68, lineSize: 46,
      l0Text: 'id    release', l0Color: T.mid,
      l1Text: '47    v1', l1Alpha: 0, l1Slot: 1, l1Color: T.ok });

    s.node('count', 'label', { x: 540, y: 1618, text: 'saved tickets: 0', size: 46, mono: true, color: T.mid });
    s.node('note', 'label', { x: 540, y: 1768, text: '', size: 46, mono: true, color: T.accent });
    s.node('reqLab', 'label', { x: 150, y: 875, text: 'request', size: 40, color: T.mid });
    s.node('resLab', 'label', { x: 935, y: 875, text: 'response', size: 40, color: T.mid });

    s.wire('req', [400, 772], [400, 978]);
    s.wire('res', [680, 978], [680, 772]);
    s.wire('write', [820, 1162], [820, 1242]);

    const pan = (id) => s.panOf(id);
    const lit = (t, w, on) => { s.set(t, 'wire:' + w, 'color', on ? T.fg : T.wire, 0.25); s.set(t, 'wire:' + w, 'flow', on ? 1 : 0, 0); };
    const blink = (t0, t1) => { // caller's lamp blinks amber while it waits (visual only)
      for (let t = t0, on = true; t < t1 - 0.05; t += 0.6, on = !on) s.set(t, 'caller', 'lamp', on ? T.accent : '#5A4520', 0.3);
    };

    // ---- beat 1 (0-7.5): the caller wants one ticket; where the effect will live is still empty ----
    let t = 1.2;
    s.set(t, 'caller', 'color', T.fg, 0.3); s.set(t, 'caller', 'glow', 0.6, 0.3);
    s.set(t, 'caller', 'l0Reveal', 1, 1.4, 'linear');
    s.sfx(t, 'ack', { note: 'C6', gain: 1.6, pan: pan('caller') });
    s.set(t + 1.6, 'caller', 'glow', 0, 0.6); s.set(t + 1.6, 'caller', 'color', T.mid, 0.6);
    t = 3.4;                                   // the empty table row and the zero count
    s.set(t, 'table', 'l1HlColor', T.fg, 0); s.set(t, 'table', 'l1Hl', 1, 0.2); s.set(t + 1.1, 'table', 'l1Hl', 0, 0.6);
    s.pulse(t, 'count'); s.set(t, 'count', 'color', T.fg, 0.2); s.set(t + 1.1, 'count', 'color', T.mid, 0.6);
    s.sfx(t, 'ack', { note: 'E6', gain: 1.3, pan: pan('table') });
    t = 4.8;                                   // the caller's empty knowledge
    s.set(t, 'caller', 'l1HlColor', T.fg, 0); s.set(t, 'caller', 'l1Hl', 1, 0.2); s.set(t + 1.1, 'caller', 'l1Hl', 0, 0.6);
    s.set(t, 'caller', 'l1Color', T.fg, 0.2); s.set(t + 1.1, 'caller', 'l1Color', T.mid, 0.6);
    s.sfx(t, 'ack', { note: 'C6', gain: 1.1, pan: pan('caller') });

    // ---- beat 2 (7.5-14.5): the create request reaches the service; it starts working ----
    t = 7.5;
    s.set(t, 'caller', 'state', 'waiting', 0); s.set(t, 'caller', 'stateColor', T.accent, 0);
    blink(t, 26.0);
    t = 7.9;
    lit(t, 'req', true);
    s.packet({ route: [[400, 770], [400, 982]], t, dur: 1.5, kind: 'chip', label: 'create v1', color: T.fg, size: 40 });
    s.sfx(t, 'send', { note: 'C6', gain: 1.2, pan: pan('caller') });
    t = 9.4;
    lit(t, 'req', false);
    s.ripple(t, [400, 985], T.fg, { r0: 10, r1: 44 });
    s.set(t, 'svc', 'color', T.fg, 0.2); s.set(t, 'svc', 'glow', 0.5, 0.2); s.set(t + 0.5, 'svc', 'glow', 0, 0.6);
    s.set(t, 'svc', 'state', 'working', 0); s.set(t, 'svc', 'stateColor', T.accent, 0);
    s.set(t, 'svc', 'l0Alpha', 1, 0.3); s.set(t, 'svc', 'l0Slot', 0, 0.3);
    s.set(t, 'svc', 'l0HlColor', T.accent, 0);
    s.sfx(t, 'arrive', { note: SVC, pan: pan('svc') });
    for (const tw of [10.4, 11.1, 11.8]) {     // the service works; the table stays empty
      s.set(tw, 'svc', 'l0Hl', 1, 0.12); s.set(tw + 0.15, 'svc', 'l0Hl', 0.35, 0.4);
      s.sfx(tw, 'work', { note: 'G4', gain: 1.3, pan: pan('svc') });
    }

    // ---- beat 3 (14.5-24.5): the service saves ticket 47; the caller still knows nothing ----
    t = 14.5;
    lit(t, 'write', true);
    s.set(t, 'svc', 'l0Hl', 1, 0.15);
    s.packet({ route: [[820, 1172], [820, 1452]], t, dur: 1.2, kind: 'chip', label: 'insert 47', color: T.accent, size: 40 });
    s.sfx(t, 'send', { note: 'G6', gain: 1.1, pan: pan('table') });
    t = 15.7;
    lit(t, 'write', false);
    s.set(t, 'table', 'color', T.ok, 0.2); s.set(t, 'table', 'glow', 0.7, 0.2); s.set(t + 0.6, 'table', 'glow', 0, 0.8);
    s.set(t, 'table', 'titleColor', T.fg, 0.2);
    s.set(t, 'table', 'l1Alpha', 1, 0.25); s.set(t, 'table', 'l1Slot', 0, 0.25);
    s.set(t, 'table', 'l1HlColor', T.ok, 0); s.set(t, 'table', 'l1Hl', 1, 0.2); s.set(t + 1.2, 'table', 'l1Hl', 0.45, 0.8);
    s.ripple(t, [900, 1455], T.ok, { r0: 8, r1: 30, dur: 0.7 });
    s.set(t, 'svc', 'state', 'saved', 0); s.set(t, 'svc', 'stateColor', T.ok, 0);
    s.set(t, 'svc', 'l0Hl', 0, 0.4); s.set(t, 'svc', 'l0Color', T.mid, 0.4);
    s.sfx(t, 'store', { note: DB, gain: 2.4, pan: pan('table') });
    t = 16.6;
    s.set(t, 'count', 'text', 'saved tickets: 1', 0); s.set(t, 'count', 'color', T.ok, 0.2);
    s.pulse(t, 'count');
    s.sfx(t, 'ack', { note: 'E6', gain: 1.2, pan: pan('table') });
    t = 17.8;                                  // the gap: saved, but the caller has not been told
    s.set(t, 'note', 'text', 'saved · caller not told yet', 0); s.set(t, 'note', 'color', T.accent, 0);
    s.set(t - 0.01, 'note', 'alpha', 0, 0); s.set(t, 'note', 'alpha', 1, 0.4);
    s.set(t, 'caller', 'l1HlColor', T.accent, 0); s.set(t, 'caller', 'l1Hl', 1, 0.3);
    s.set(t, 'caller', 'l1Color', T.fg, 0.3);
    s.sfx(t, 'clock', { gain: 1.6, pan: pan('caller') });

    // ---- beat 4 (24.5-32.5): a response reports ticket 47 ----
    t = 24.5;
    s.set(t, 'note', 'alpha', 0, 0.4);
    s.set(t, 'table', 'color', T.mid, 0.5); s.set(t, 'table', 'titleColor', T.mid, 0.5);
    lit(t, 'res', true);
    s.set(t, 'svc', 'state', 'replied', 0); s.set(t, 'svc', 'stateColor', T.fg, 0);
    s.packet({ route: [[680, 982], [680, 770]], t, dur: 1.5, kind: 'chip', label: 'ticket 47', color: T.ok, size: 40 });
    s.sfx(t, 'send', { note: 'G6', gain: 1.2, pan: pan('svc') });
    t = 26.0;
    lit(t, 'res', false);
    s.ripple(t, [680, 800], T.ok, { r0: 6, r1: 26 });
    s.set(t, 'caller', 'lamp', T.ok, 0.2);
    s.set(t, 'caller', 'state', 'got reply', 0); s.set(t, 'caller', 'stateColor', T.ok, 0);
    s.set(t, 'caller', 'color', T.ok, 0.2); s.set(t, 'caller', 'glow', 0.7, 0.2); s.set(t + 0.6, 'caller', 'glow', 0, 0.8);
    s.set(t, 'caller', 'l1Text', 'knows  ticket 47', 0); s.set(t, 'caller', 'l1Color', T.ok, 0.2);
    s.set(t, 'caller', 'l1HlColor', T.ok, 0.2); s.set(t + 1.2, 'caller', 'l1Hl', 0.45, 0.8);
    s.sfx(t, 'deliver', { note: C, gain: 1.6, pan: pan('caller') });
    s.set(t + 1.4, 'caller', 'color', T.mid, 0.8);

    // ---- beat 5 (32.5-44): the report matches the one saved effect ----
    t = 32.5;                                  // the effect: one row, one count
    s.set(t, 'table', 'color', T.ok, 0.2); s.set(t, 'table', 'l1Hl', 1, 0.2); s.pulse(t, 'table');
    s.pulse(t, 'count');
    s.sfx(t, 'ack', { note: 'E6', gain: 1.3, pan: pan('table') });
    t = 33.7;                                  // the report points at that same ticket
    s.set(t, 'caller', 'color', T.ok, 0.2); s.set(t, 'caller', 'l1Hl', 1, 0.2); s.pulse(t, 'caller');
    s.sfx(t, 'ack', { note: 'C6', gain: 1.3, pan: pan('caller') });
    t = 35.0;
    s.set(t, 'note', 'text', 'saved first · reported after', 0); s.set(t, 'note', 'color', T.ok, 0);
    s.set(t, 'note', 'alpha', 1, 0.5);
    s.sfx(t, 'arrive', { note: 'C5', gain: 0.7, pan: 0 });
    s.fade(41.4, 1, 1.0);
    s.meta.duration = 43.4;
  },
});
