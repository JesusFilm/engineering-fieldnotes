/* Queues and backpressure, lesson 05 "Choose an overload policy" (motion-v2 cut 05).
 * One mechanism: a bounded queue needs an explicit rule for when it is full. Under a reject policy, submit(F) on a
 * full queue returns "rejected" right away; F is not admitted, the queued jobs and the worker are unchanged, and the
 * producer records and reports the outcome instead of calling the submission a success.
 * Left: producer (job F, submit call, state, returned result). Right: queue with its "when full" setting
 * (wait · reject · drop, reject selected) and three full places; worker below it. Bottom: producer outcome log,
 * continuing from lesson 04 ("E accepted"). Finite ending.
 * Render from the repository root:
 *   node video/queues-and-backpressure/motion-v2/05/engine/render.mjs video/queues-and-backpressure/motion-v2/05/scene.js video/queues-and-backpressure/motion-v2/05/video.mp4 --sheet video/queues-and-backpressure/motion-v2/05/scratch/contact-sheet.png
 * Uses the cut-local engine copy (copied from cut 04: card, ticket, per-line bars, dashed ticket).
 */
FlowVideo.scene({
  meta: { title: 'Overload policy', subtitle: 'QUEUES  ·  LESSON 5', subtitleSize: 36, subtitleSpacing: 6, duration: 38, fps: 30, speed: 1 },
  build(s) {
    const T = s.THEME;
    const PL = -0.5, PQ = 0.45;
    const P = [630, 780, 930], PY = 800;

    // ---- stage ----
    s.node('prod', 'card', { x: 255, y: 780, w: 430, h: 600, title: 'producer', titleSize: 44, titleY: 46, color: T.mid, titleColor: T.fg,
      lineY: [160, 250], lineSize: 40, rowH: 60, pad: 24, l0Text: '     submit(F)', l0Color: T.mid, l1Text: 'ready', l1Color: T.mid });
    s.node('resNote', 'label', { x: 255, y: 930, text: 'queue full', size: 38, mono: true, weight: 600, color: T.bad, alpha: 0 });
    s.node('queue', 'card', { x: 780, y: 690, w: 520, h: 420, title: 'queue', titleSize: 44, titleY: 46, color: T.mid, titleColor: T.fg,
      titleTag: '3 / 3 full', titleTagSize: 40, titleTagColor: T.fg });
    s.node('whenFull', 'label', { x: 552, y: 606, text: 'when full:', size: 36, mono: true, color: T.mid, align: 'left', alpha: 0 });
    s.node('optBox', 'card', { x: 780, y: 664, w: 186, h: 62, color: T.accent, radius: 14, lineWidth: 3, noFill: true, alpha: 0 });
    s.node('oWait', 'label', { x: 618, y: 664, text: 'wait', size: 40, mono: true, weight: 600, color: T.mid, alpha: 0 });
    s.node('oReject', 'label', { x: 780, y: 664, text: 'reject', size: 40, mono: true, weight: 700, color: T.accent, alpha: 0 });
    s.node('oDrop', 'label', { x: 942, y: 664, text: 'drop', size: 40, mono: true, weight: 600, color: T.mid, alpha: 0 });
    P.forEach((x, i) => s.node('pl' + i, 'card', { x, y: PY, w: 140, h: 100, color: T.mid, radius: 14, lineWidth: 3, noFill: true }));
    s.node('worker', 'card', { x: 780, y: 1010, w: 520, h: 140, title: 'worker', titleSize: 40, titleY: 42, color: T.accent, titleColor: T.fg,
      hasLamp: true, lamp: T.accent, titleTag: 'running B', titleTagSize: 40, titleTagColor: T.accent, hasBar: true, barY: 34, barH: 12, bar: 0.3, barColor: T.accent });
    s.node('log', 'card', { x: 540, y: 1320, w: 1000, h: 360, title: 'producer outcomes', titleSize: 40, titleY: 46, color: T.mid, titleColor: T.mid,
      lineY: [124, 202, 280], lineSize: 40, rowH: 64, tagSize: 40, tagRight: 40,
      l0Text: 'E  accepted', l0Color: T.ok, l1Text: 'F  rejected', l1Color: T.bad, l1Alpha: 0, l1Tag: 'not admitted', l1TagColor: T.bad,
      l2Text: 'F  reported to caller', l2Color: T.fg, l2Alpha: 0 });

    s.wire('call', [470, 640], [520, 640]);
    s.wire('ret', [520, 730], [470, 730]);

    s.node('jC', 'ticket', { x: P[0], y: PY, text: 'C', size: 44, color: T.fg });
    s.node('jD', 'ticket', { x: P[1], y: PY, text: 'D', size: 44, color: T.fg });
    s.node('jE', 'ticket', { x: P[2], y: PY, text: 'E', size: 44, color: T.fg });
    s.node('jF', 'ticket', { x: 112, y: 640, text: 'F', size: 44, color: T.mid, dashed: true });
    s.node('res', 'ticket', { x: 255, y: 862, text: 'rejected', size: 40, color: T.bad, alpha: 0, scale: 0.6 });

    const flash = (t, id, c, back) => { s.set(t, id, 'color', c, 0.12); s.set(t, id, 'glow', 0.8, 0.12); s.set(t + 0.4, id, 'glow', 0, 0.5); s.set(t + 0.4, id, 'color', back, 0.5); };

    // ---- continuous: the worker keeps running B ----
    s.set(0.5, 'worker', 'bar', 0.62, 36, 'linear');
    for (let k = 1.0; k < 36; k += 1.6) s.sfx(k, 'work', { note: 'G4', gain: 0.45, pan: PQ });

    // ---- beat 1: the queue is full again; this policy rejects new submissions ----
    [1.8, 2.4, 3.0].forEach((tt, i) => { flash(tt, 'pl' + i, T.fg, T.mid); s.pulse(tt, ['jC', 'jD', 'jE'][i]); s.sfx(tt, 'ack', { note: 'E5', gain: 1.5, pan: PQ }); });
    let t = 4.2;                                      // the explicit setting
    for (const id of ['whenFull', 'oWait', 'oReject', 'oDrop']) s.set(t, id, 'alpha', 1, 0.4);
    s.set(t + 0.5, 'optBox', 'alpha', 1, 0.2); s.set(t + 0.5, 'optBox', 'glow', 1, 0.15); s.set(t + 0.9, 'optBox', 'glow', 0, 0.6);
    s.sfx(t + 0.5, 'ack', { note: 'E6', gain: 1.3, pan: PQ });
    t = 6.2;                                          // the producer's history from lesson 04
    s.set(t, 'log', 'l0HlColor', T.ok, 0); s.set(t, 'log', 'l0Hl', 1, 0.2); s.set(t + 0.9, 'log', 'l0Hl', 0, 0.5);
    s.sfx(t, 'ack', { note: 'C5', gain: 1.2, pan: 0 });
    // hold 7-9

    // ---- beat 2: the producer asks to submit F; no waiting place is available ----
    t = 9.0;
    s.set(t, 'jF', 'dashed', 0, 0); s.set(t, 'jF', 'color', T.fg, 0.2); s.set(t, 'jF', 'glow', 1, 0.15); s.set(t + 0.5, 'jF', 'glow', 0, 0.6);
    s.set(t, 'prod', 'l0Color', T.fg, 0.2); s.set(t, 'prod', 'color', T.fg, 0.2);
    s.set(t, 'prod', 'l1Text', 'calling…', 0); s.set(t, 'prod', 'l1Color', T.fg, 0.2);
    s.sfx(t, 'store', { note: 'C5', gain: 1.0, pan: PL });
    t = 9.8;                                          // the call reaches the queue's edge
    s.set(t, 'wire:call', 'color', T.fg, 0.2); s.set(t, 'wire:call', 'flow', 1, 0);
    s.packet({ route: [[440, 640], [540, 640]], t, dur: 0.8, kind: 'dot', color: T.fg });
    s.sfx(t, 'send', { note: 'C6', gain: 1.0, pan: PL });
    s.set(t + 0.8, 'wire:call', 'color', T.wire, 0.4); s.set(t + 0.8, 'wire:call', 'flow', 0, 0);
    [10.8, 11.2, 11.6].forEach((tt, i) => { flash(tt, 'pl' + i, T.fg, T.mid); s.sfx(tt, 'ack', { note: 'E4', gain: 1.5, pan: PQ }); });
    t = 12.3;                                         // no free place: the policy applies
    s.set(t, 'queue', 'titleTagColor', T.accent, 0.15); s.set(t + 0.9, 'queue', 'titleTagColor', T.fg, 0.5);
    s.set(t, 'optBox', 'glow', 1, 0.15); s.set(t + 0.5, 'optBox', 'glow', 0, 0.6);
    s.set(t, 'queue', 'color', T.accent, 0.15); s.set(t + 0.9, 'queue', 'color', T.mid, 0.5);
    s.sfx(t, 'ack', { note: 'E6', gain: 1.3, pan: PQ });
    // hold 13-16: F still with the producer; C, D, E unchanged

    // ---- beat 3: the queue reports rejection; the producer must handle it ----
    t = 16.0;
    s.set(t, 'wire:ret', 'color', T.bad, 0.2); s.set(t, 'wire:ret', 'flow', 1, 0);
    s.packet({ route: [[540, 730], [440, 730]], t, dur: 0.9, kind: 'dot', color: T.bad });
    s.sfx(t, 'miss', { gain: 1.0, pan: PQ });
    t = 16.9;
    s.set(t, 'wire:ret', 'color', T.wire, 0.5); s.set(t, 'wire:ret', 'flow', 0, 0);
    s.set(t, 'res', 'alpha', 1, 0.2); s.set(t, 'res', 'scale', 1, 0.35, 'back');
    s.set(t, 'res', 'glow', 1, 0.15); s.set(t + 0.5, 'res', 'glow', 0, 0.6);
    s.set(t + 0.2, 'resNote', 'alpha', 1, 0.3);
    s.set(t, 'prod', 'l1Text', 'got result', 0); s.set(t, 'prod', 'color', T.bad, 0.2); s.set(t + 0.8, 'prod', 'color', T.mid, 0.6);
    s.set(t, 'jF', 'color', T.mid, 0.4); s.set(t, 'prod', 'l0Color', T.mid, 0.4);
    s.sfx(t, 'deliver', { note: 'C4', gain: 1.4, pan: PL });
    // hold 17.5-21 on the returned result
    t = 21.0;                                         // the producer records it
    s.set(t, 'log', 'l1Alpha', 1, 0.3); s.set(t, 'log', 'l1HlColor', T.bad, 0); s.set(t, 'log', 'l1Hl', 1, 0.2); s.set(t + 0.9, 'log', 'l1Hl', 0, 0.5);
    s.sfx(t, 'store', { note: 'C5', gain: 1.1, pan: 0 });
    t = 22.5;                                         // and reports it to its caller
    s.set(t, 'log', 'l2Alpha', 1, 0.3); s.set(t, 'log', 'l2HlColor', T.fg, 0); s.set(t, 'log', 'l2Hl', 1, 0.2); s.set(t + 0.9, 'log', 'l2Hl', 0, 0.5);
    s.set(t, 'prod', 'l1Text', 'reported', 0); s.set(t, 'prod', 'l1Color', T.fg, 0.2);
    s.sfx(t, 'store', { note: 'D5', gain: 1.1, pan: PL });
    // hold 23-25

    // ---- beat 4: the rejected job was not admitted; the policy is explicit ----
    t = 25.2;                                         // the queue still holds C, D, E
    P.forEach((x, i) => flash(t, 'pl' + i, T.fg, T.mid));
    for (const id of ['jC', 'jD', 'jE']) s.pulse(t, id);
    s.sfx(t, 'ack', { note: 'E5', gain: 1.5, pan: PQ });
    t = 26.6;                                         // different outcomes, both visible
    s.set(t, 'log', 'l0Hl', 1, 0.2); s.set(t + 0.7, 'log', 'l0Hl', 0, 0.4);
    s.sfx(t, 'ack', { note: 'C5', gain: 1.1, pan: 0 });
    s.set(t + 0.6, 'log', 'l1Hl', 1, 0.2); s.set(t + 1.3, 'log', 'l1Hl', 0, 0.4);
    s.sfx(t + 0.6, 'ack', { note: 'C4', gain: 1.3, pan: 0 });
    t = 28.4;                                         // the chosen policy, among others
    s.set(t, 'optBox', 'glow', 1, 0.15); s.set(t + 0.5, 'optBox', 'glow', 0, 0.6);
    s.sfx(t, 'ack', { note: 'E6', gain: 1.2, pan: PQ });
    s.set(t + 0.6, 'oWait', 'color', T.fg, 0.15); s.set(t + 1.0, 'oWait', 'color', T.mid, 0.4);
    s.set(t + 1.0, 'oDrop', 'color', T.fg, 0.15); s.set(t + 1.4, 'oDrop', 'color', T.mid, 0.4);
    s.sfx(t + 0.6, 'ack', { note: 'E5', gain: 0.8, pan: PQ }); s.sfx(t + 1.0, 'ack', { note: 'E5', gain: 0.8, pan: PQ });
    // hold 30-36

    // ---- finite ending ----
    s.fade(36.0, 1, 1.0);
    s.meta.duration = 38.0;
  },
});
