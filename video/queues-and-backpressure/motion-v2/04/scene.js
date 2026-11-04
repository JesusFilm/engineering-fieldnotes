/* Queues and backpressure, lesson 04 "A full queue pushes back" (motion-v2 cut 04).
 * One mechanism: the queue has three waiting places and all three are taken. Under this blocking admission policy,
 * the producer's await put(E) waits at the producer, and its next job F is not created. The worker keeps running.
 * A finishing does not free a place; the worker taking B does. Then E enters place 3: accepted, not complete.
 * Top: producer panel (code line, state, E and F). Middle: three numbered places with a capacity readout.
 * Below: worker. Bottom: job E record. Finite ending.
 * Render from the repository root:
 *   node video/queues-and-backpressure/motion-v2/04/engine/render.mjs video/queues-and-backpressure/motion-v2/04/scene.js video/queues-and-backpressure/motion-v2/04/video.mp4 --sheet video/queues-and-backpressure/motion-v2/04/scratch/contact-sheet.png
 * Uses the cut-local engine copy (card, ticket from cut 01; per-line bars from cut 02; dashed ticket outline added here).
 */
FlowVideo.scene({
  meta: { title: 'A full queue', subtitle: 'PUSHES BACK  ·  QUEUES 4', subtitleSize: 36, subtitleSpacing: 6, duration: 42, fps: 30, speed: 1 },
  build(s) {
    const T = s.THEME;
    const pan = (x) => ((x - 540) / 540) * 0.6;
    const PY = 985, P = [300, 540, 780], EY = 640, FX = 610, WY = 1262;

    // ---- stage ----
    s.node('prod', 'card', { x: 540, y: 620, w: 960, h: 280, title: 'producer', titleSize: 44, titleY: 46, color: T.mid, titleColor: T.fg,
      lineY: [148, 220], lineSize: 40, rowH: 60, l0Text: 'await put(E)', l0Color: T.mid, l1Text: 'ready', l1Color: T.mid });
    s.node('fNote', 'label', { x: FX, y: 712, text: 'not created', size: 36, mono: true, color: T.mid });
    s.node('queue', 'card', { x: 540, y: 950, w: 960, h: 260, title: 'queue', titleSize: 44, titleY: 46, color: T.mid, titleColor: T.fg,
      titleTag: '3 / 3 full', titleTagLeft: 190, titleTagSize: 40, titleTagColor: T.fg });
    P.forEach((x, i) => {
      s.node('pl' + i, 'card', { x, y: PY, w: 220, h: 116, color: T.mid, radius: 16, lineWidth: 3, noFill: true });
    });
    s.node('worker', 'card', { x: 540, y: 1255, w: 960, h: 250, title: 'worker', titleSize: 44, titleY: 46, color: T.accent, titleColor: T.fg,
      hasLamp: true, lamp: T.accent, titleTag: 'running A', titleTagSize: 40, titleTagColor: T.accent,
      lineY: [132], rowH: 60, l0Text: '', lineBarX: 380, lineBarRight: 60, l0Bar: 0.5, l0BarColor: T.accent });
    s.node('rec', 'card', { x: 540, y: 1560, w: 960, h: 260, title: 'job E record', titleSize: 44, titleY: 46, color: T.mid, titleColor: T.fg,
      lineY: [118, 196], lineSize: 40, rowH: 64, tagSize: 40, tagRight: 44,
      l0Text: 'accepted', l1Text: 'complete', l0Color: T.mid, l1Color: T.mid, l0Tag: '—', l1Tag: '—' });

    s.wire('put', [780, 762], [780, 818]);
    s.wire('take', [300, 1082], [300, 1128]);
    s.set(0, 'wire:put', 'dashed', 1, 0);

    s.node('jA', 'ticket', { x: 300, y: WY, text: 'A', size: 44, color: T.accent });
    s.node('jB', 'ticket', { x: P[0], y: PY, text: 'B', size: 44, color: T.fg });
    s.node('jC', 'ticket', { x: P[1], y: PY, text: 'C', size: 44, color: T.fg });
    s.node('jD', 'ticket', { x: P[2], y: PY, text: 'D', size: 44, color: T.fg });
    s.node('jE', 'ticket', { x: 780, y: EY, text: 'E', size: 44, color: T.fg });
    s.node('jF', 'ticket', { x: FX, y: EY, text: 'F', size: 44, color: T.mid, dashed: true, alpha: 0.6 });

    const tag = (t, v, c) => { s.set(t, 'queue', 'titleTag', v, 0); s.set(t, 'queue', 'titleTagColor', c, 0.2); s.set(t, 'queue', 'glow', 0.6, 0.15); s.set(t + 0.4, 'queue', 'glow', 0, 0.5); };

    // ---- continuous: A runs until 20.0 ----
    s.set(0.5, 'worker', 'l0Bar', 1, 19.5, 'linear');
    for (let k = 1.2; k < 19.9; k += 1.5) s.sfx(k, 'work', { note: 'G4', gain: 0.5, pan: 0 });

    // ---- beat 1: all three waiting places are full; E is still with the producer ----
    [2.0, 2.6, 3.2].forEach((tt, i) => {
      s.set(tt, 'pl' + i, 'color', T.fg, 0.12); s.set(tt, 'pl' + i, 'glow', 0.8, 0.12); s.set(tt + 0.4, 'pl' + i, 'glow', 0, 0.5);
      s.set(tt + 0.4, 'pl' + i, 'color', T.mid, 0.5); s.pulse(tt, ['jB', 'jC', 'jD'][i]);
      s.sfx(tt, 'ack', { note: 'E5', gain: 1.5, pan: pan(P[i]) });
    });
    s.set(4.2, 'jE', 'glow', 1, 0.15); s.set(4.6, 'jE', 'glow', 0, 0.6);
    s.sfx(4.2, 'ack', { note: 'C5', gain: 1.4, pan: pan(780) });
    // hold 5-8

    // ---- beat 2: admission waits at the producer; E does not enter the full queue ----
    let t = 8.0;
    s.set(t, 'prod', 'l0Color', T.fg, 0.2);
    s.set(t, 'prod', 'color', T.fg, 0.2);
    s.set(t, 'jE', 'glow', 1, 0.15); s.set(t + 0.5, 'jE', 'glow', 0, 0.6);
    s.sfx(t, 'send', { note: 'C6', gain: 1.0, pan: pan(780) });
    t = 8.9;                                       // the queue is full: the call waits
    s.set(t, 'wire:put', 'color', T.accent, 0.2);
    tag(t, '3 / 3 full', T.accent);
    s.set(t, 'prod', 'l1Text', 'waiting', 0); s.set(t, 'prod', 'l1Color', T.accent, 0.2);
    s.set(t, 'prod', 'color', T.accent, 0.3); s.set(t, 'jE', 'color', T.accent, 0.3);
    s.sfx(t, 'ack', { note: 'E4', gain: 1.6, pan: 0 });
    for (let k = 10.4; k < 28; k += 1.6) { s.set(k, 'prod', 'l1Color', T.fg, 0.4); s.set(k + 0.8, 'prod', 'l1Color', T.accent, 0.4); }  // slow pulse: still waiting
    t = 11.2;                                      // the producer makes no more work
    s.set(t, 'fNote', 'color', T.fg, 0.2); s.set(t + 0.9, 'fNote', 'color', T.mid, 0.5);
    s.set(t, 'jF', 'alpha', 1, 0.15); s.set(t + 0.7, 'jF', 'alpha', 0.6, 0.5);
    s.sfx(t, 'ack', { note: 'C5', gain: 0.9, pan: pan(FX) });
    // hold 12-19.6: producer waits silently, worker keeps ticking

    // ---- beat 3: the worker finishes A, then takes B; one place becomes free ----
    t = 20.0;
    s.set(t, 'worker', 'l0BarColor', T.ok, 0.2); s.set(t, 'jA', 'color', T.ok, 0.2); s.set(t, 'worker', 'lamp', T.ok, 0.2);
    s.set(t, 'worker', 'titleTag', 'A done', 0); s.set(t, 'worker', 'titleTagColor', T.ok, 0.2); s.set(t, 'worker', 'color', T.ok, 0.3);
    s.sfx(t, 'ack', { note: 'G5', gain: 1.8, pan: 0 });
    s.set(21.0, 'jA', 'alpha', 0, 0.5); s.set(21.0, 'worker', 'l0Bar', 0, 0.5); s.set(21.0, 'worker', 'color', T.mid, 0.5); s.set(21.0, 'worker', 'lamp', T.dim, 0.5);
    s.sfx(21.0, 'ack', { note: 'G4', gain: 1.2, pan: 0 });   // A leaves the worker (finished, not discarded)
    // hold 21.5-23: A done, the queue is still 3 / 3 full, E still waiting
    t = 23.0;                                      // the worker takes B
    s.set(t, 'wire:take', 'color', T.fg, 0.2); s.set(t, 'wire:take', 'flow', 1, 0);
    s.set(t, 'jB', 'py', WY, 1.2);
    s.sfx(t, 'send', { note: 'E6', gain: 1.0, pan: pan(300) });
    tag(t + 0.45, '2 / 3', T.fg);                  // B has left place 1
    s.sfx(t + 0.45, 'ack', { note: 'E5', gain: 1.2, pan: 0 });
    t = 24.2;
    s.set(t, 'wire:take', 'color', T.wire, 0.4); s.set(t, 'wire:take', 'flow', 0, 0);
    s.set(t, 'jB', 'color', T.accent, 0.3); s.set(t, 'jB', 'glow', 1, 0.15); s.set(t + 0.4, 'jB', 'glow', 0, 0.6);
    s.set(t, 'worker', 'color', T.accent, 0.3); s.set(t, 'worker', 'lamp', T.accent, 0.2);
    s.set(t, 'worker', 'titleTag', 'running B', 0); s.set(t, 'worker', 'titleTagColor', T.accent, 0.2);
    s.set(t, 'worker', 'l0BarColor', T.accent, 0); s.set(t + 0.1, 'worker', 'l0Bar', 0.32, 16.0, 'linear');
    s.sfx(t, 'arrive', { note: 'G5', pan: 0 });
    for (let k = 25.8; k < 40; k += 1.5) s.sfx(k, 'work', { note: 'G4', gain: 0.5, pan: 0 });
    t = 25.0;                                      // C and D move forward; place 3 is free
    s.set(t, 'jC', 'px', P[0], 0.9); s.set(t, 'jD', 'px', P[1], 0.9);
    s.sfx(t, 'ack', { note: 'E6', gain: 1.0, pan: 0 });
    t = 26.1;
    s.set(t, 'pl2', 'color', T.fg, 0.15); s.set(t, 'pl2', 'glow', 1, 0.15); s.set(t + 0.5, 'pl2', 'glow', 0, 0.6);
    s.set(t, 'pl2', 'dashed', 1, 0);
    s.sfx(t, 'ack', { note: 'E5', gain: 1.5, pan: pan(P[2]) });
    // hold 26.7-28.4: one free place

    // ---- beat 4: E can now enter the queue; it is accepted, not yet completed ----
    t = 28.4;
    s.set(t, 'wire:put', 'dashed', 0, 0); s.set(t, 'wire:put', 'color', T.fg, 0.2); s.set(t, 'wire:put', 'flow', 1, 0);
    s.set(t, 'jE', 'py', PY, 1.2); s.set(t, 'jE', 'color', T.fg, 0.3);
    s.set(t, 'prod', 'color', T.mid, 0.5);
    s.sfx(t, 'send', { note: 'C6', gain: 1.0, pan: pan(780) });
    t = 29.6;
    s.set(t, 'wire:put', 'color', T.wire, 0.4); s.set(t, 'wire:put', 'flow', 0, 0);
    s.set(t, 'pl2', 'dashed', 0, 0); s.set(t, 'pl2', 'color', T.mid, 0.5);
    s.set(t, 'jE', 'glow', 1, 0.15); s.set(t + 0.4, 'jE', 'glow', 0, 0.6);
    tag(t, '3 / 3 full', T.fg);
    s.sfx(t, 'arrive', { note: 'E5', pan: pan(P[2]) });
    t = 30.3;                                      // the producer's call returns: accepted
    s.set(t, 'prod', 'l1Text', 'accepted', 0); s.set(t, 'prod', 'l1Color', T.ok, 0.2);
    s.set(t, 'prod', 'color', T.ok, 0.2); s.set(t + 0.7, 'prod', 'color', T.mid, 0.6);
    s.sfx(t, 'deliver', { note: 'C5', gain: 1.3, pan: pan(540) });
    t = 31.2;
    s.set(t, 'rec', 'l0Tag', '', 0); s.set(t, 'rec', 'l0Tick', 1, 0.4, 'linear'); s.set(t, 'rec', 'l0Color', T.fg, 0.2);
    s.set(t, 'rec', 'l0HlColor', T.fg, 0); s.set(t, 'rec', 'l0Hl', 1, 0.2); s.set(t + 0.8, 'rec', 'l0Hl', 0, 0.5);
    s.sfx(t, 'store', { note: 'A5', gain: 1.1, pan: 0.15 });
    t = 32.4;                                      // the producer may make F next
    s.set(t, 'fNote', 'text', 'next', 0); s.set(t, 'fNote', 'color', T.fg, 0.2);
    s.set(t, 'jF', 'alpha', 1, 0.3); s.set(t, 'jF', 'color', T.fg, 0.3);
    s.sfx(t, 'ack', { note: 'C5', gain: 1.0, pan: pan(FX) });
    t = 33.6;                                      // E is not complete
    s.set(t, 'rec', 'l1Tag', 'not yet', 0); s.set(t, 'rec', 'l1TagColor', T.fg, 0.2); s.set(t, 'rec', 'l1Color', T.fg, 0.2);
    s.set(t, 'rec', 'l1HlColor', T.mid, 0); s.set(t, 'rec', 'l1Hl', 1, 0.2);
    s.sfx(t, 'ack', { note: 'A4', gain: 1.4, pan: 0.15 });
    // hold 34-40: C, D, E waiting; B running; E accepted, not complete

    // ---- finite ending ----
    s.fade(40.0, 1, 1.0);
    s.meta.duration = 42.0;
  },
});
