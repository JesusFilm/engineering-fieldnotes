/* Queues and backpressure, lesson 01 "Submit a job" (motion-v2 cut 01).
 * One mechanism: submitting a job, the queue accepting it, a worker taking it and the worker running it
 * are separate events, and none of them is completion.
 * One job ticket travels producer -> queue lane (entry, then front) -> worker. The job record card below
 * fills created, accepted, running; its complete row reads "not yet" at the end.
 * Render from the repository root:
 *   node video/queues-and-backpressure/motion-v2/01/engine/render.mjs video/queues-and-backpressure/motion-v2/01/scene.js video/queues-and-backpressure/motion-v2/01/video.mp4 --sheet video/queues-and-backpressure/motion-v2/01/scratch/contact-sheet.png
 * Uses the cut-local engine copy, which adds the general 'card' and 'ticket' node types.
 */
FlowVideo.scene({
  meta: { title: 'Submit a job', subtitle: 'QUEUES  ·  LESSON 1', subtitleSize: 36, subtitleSpacing: 6, duration: 36, fps: 30, speed: 1 },
  build(s) {
    const T = s.THEME;
    const pan = (x) => ((x - 540) / 540) * 0.6;
    const PX = 330, FRONT = 750, LANE_Y = 865, PROD_Y = 640, WORK_Y = 1205;

    // ---- stage ----
    s.node('prod', 'card', { x: 540, y: 600, w: 960, h: 220, title: 'Producer', titleSize: 44, titleY: 48, color: T.mid, titleColor: T.fg,
      titleTag: 'submit: —', titleTagSize: 40, titleTagColor: T.mid });
    s.node('queue', 'card', { x: 540, y: 905, w: 960, h: 240, title: 'Queue', titleSize: 44, titleY: 196, color: T.mid, titleColor: T.fg,
      titleTag: 'waiting 0', titleTagLeft: 200, titleTagSize: 40, titleTagColor: T.mid, laneY: 22, laneH: 116, laneColor: T.dim, laneGap: 110 });
    s.node('empty', 'label', { x: 540, y: LANE_Y, text: 'empty', size: 38, mono: true, color: T.mid });
    s.node('worker', 'card', { x: 540, y: 1195, w: 960, h: 260, title: 'Worker', titleSize: 44, titleY: 48, color: T.mid, titleColor: T.fg,
      hasLamp: true, lampLeft: 230, lamp: T.dim, lineY: [140], lineSize: 40, rowH: 60, l0Text: 'idle', l0Color: T.mid, hasBar: true, barY: 40, barH: 14 });
    s.node('wslot', 'card', { x: FRONT, y: WORK_Y, w: 480, h: 92, dashed: true, noFill: true, color: T.dim, radius: 16, lineWidth: 3 });
    s.node('rec', 'card', { x: 540, y: 1585, w: 960, h: 400, title: 'job A record', titleSize: 44, titleY: 48, color: T.dim, titleColor: T.mid,
      lineY: [120, 196, 272, 348], lineSize: 40, rowH: 64, tagSize: 40, tagRight: 44,
      l0Text: 'created', l1Text: 'accepted', l2Text: 'running', l3Text: 'complete',
      l0Color: T.mid, l1Color: T.mid, l2Color: T.mid, l3Color: T.mid,
      l0Tag: '—', l1Tag: '—', l2Tag: '—', l3Tag: '—' });
    s.node('job', 'ticket', { x: PX, y: PROD_Y, text: 'job A: check docs', size: 40, color: T.fg, alpha: 0, scale: 0.6 });

    s.wire('submit', [PX, 712], [PX, 783]);
    s.wire('take', [FRONT, 1027], [FRONT, 1063]);
    const lit = (t, w, on) => { s.set(t, 'wire:' + w, 'color', on ? T.fg : T.wire, 0.2); s.set(t, 'wire:' + w, 'flow', on ? 1 : 0, 0); };
    const recRow = (t, i, color) => {           // a record row lights when its event happens
      s.set(t, 'rec', 'l' + i + 'Color', color, 0.2);
      s.set(t, 'rec', 'l' + i + 'Hl', 1, 0.15); s.set(t + 0.9, 'rec', 'l' + i + 'Hl', 0, 0.5);
      s.set(t, 'rec', 'l' + i + 'HlColor', color, 0);
      s.pulse(t, 'rec');
      s.sfx(t, 'store', { note: 'A5', gain: 1.0, pan: 0.15 });
    };

    // ---- beat 1: the producer creates job A; the queue and worker are waiting places ----
    let t = 1.0;
    s.set(t, 'job', 'alpha', 1, 0.25); s.set(t, 'job', 'scale', 1, 0.35, 'back');
    s.set(t, 'prod', 'color', T.fg, 0.2); s.set(t, 'prod', 'glow', 0.6, 0.2); s.set(t + 0.5, 'prod', 'glow', 0, 0.6);
    s.set(t, 'job', 'glow', 1, 0.15); s.set(t + 0.4, 'job', 'glow', 0, 0.6);
    s.sfx(t, 'store', { note: 'C5', gain: 1.1, pan: pan(PX) });
    t = 2.3;
    s.set(t, 'rec', 'color', T.mid, 0.3); s.set(t, 'rec', 'titleColor', T.fg, 0.3);
    recRow(t, 0, T.fg);
    s.set(t, 'rec', 'l0Tag', '', 0); s.set(t, 'rec', 'l0Tick', 1, 0.4, 'linear');
    t = 4.0;                                    // the queue: an empty lane where jobs wait
    s.set(t, 'queue', 'laneColor', T.fg, 0.15); s.set(t, 'queue', 'laneGlow', 1, 0.15);
    s.set(t + 0.5, 'queue', 'laneColor', T.dim, 0.5); s.set(t + 0.5, 'queue', 'laneGlow', 0, 0.5);
    s.sfx(t, 'ack', { note: 'E5', gain: 1.6, pan: 0 });
    t = 5.1;                                    // the worker: idle, its job slot empty
    s.set(t, 'wslot', 'color', T.fg, 0.15); s.set(t + 0.5, 'wslot', 'color', T.dim, 0.5);
    s.pulse(t, 'worker');
    s.sfx(t, 'ack', { note: 'G5', gain: 1.6, pan: pan(FRONT) });

    // ---- beat 2: job A enters the queue; the producer is told "accepted" ----
    t = 7.5;
    s.set(t, 'prod', 'titleTag', 'submit: sending…', 0);
    lit(t, 'submit', true);
    s.set(t, 'job', 'py', LANE_Y, 1.2);
    s.sfx(t, 'send', { note: 'C6', gain: 1.0, pan: pan(PX) });
    s.set(t + 0.3, 'empty', 'alpha', 0, 0.3);
    t = 8.7;
    lit(t, 'submit', false);
    s.set(t, 'queue', 'color', T.fg, 0.2); s.set(t, 'queue', 'glow', 0.7, 0.2); s.set(t + 0.5, 'queue', 'glow', 0, 0.6);
    s.set(t, 'queue', 'titleTag', 'waiting 1', 0); s.set(t, 'queue', 'titleTagColor', T.fg, 0.2);
    s.set(t, 'job', 'glow', 1, 0.15); s.set(t + 0.4, 'job', 'glow', 0, 0.6);
    s.sfx(t, 'arrive', { note: 'E5', pan: pan(PX) });
    s.set(t + 0.2, 'job', 'px', FRONT, 1.1);    // moves to the front of the lane
    t = 10.6;
    s.set(t, 'prod', 'titleTag', 'submit: accepted', 0); s.set(t, 'prod', 'titleTagColor', T.ok, 0.2);
    s.set(t, 'prod', 'color', T.ok, 0.2); s.set(t, 'prod', 'glow', 0.7, 0.2);
    s.set(t + 0.6, 'prod', 'glow', 0, 0.6); s.set(t + 0.6, 'prod', 'color', T.mid, 0.6);
    s.sfx(t, 'deliver', { note: 'C5', gain: 1.3, pan: pan(PX) });
    t = 11.6;
    recRow(t, 1, T.fg);
    s.set(t, 'rec', 'l1Tag', '', 0); s.set(t, 'rec', 'l1Tick', 1, 0.4, 'linear');
    s.set(13.0, 'queue', 'color', T.mid, 0.6);
    // hold 12.5-16: accepted, still waiting, worker idle

    // ---- beat 3: the worker takes job A; it leaves the waiting queue ----
    t = 16.0;
    s.set(t, 'worker', 'color', T.fg, 0.2); s.set(t, 'worker', 'lamp', T.fg, 0.2);
    s.set(t, 'worker', 'l0Text', 'ready', 0); s.set(t, 'worker', 'l0Color', T.fg, 0.2);
    s.pulse(t, 'worker');
    s.sfx(t, 'ack', { note: 'G5', gain: 1.6, pan: pan(FRONT) });
    t = 17.2;
    lit(t, 'take', true);
    s.set(t, 'job', 'py', WORK_Y, 1.2);
    s.sfx(t, 'send', { note: 'E6', gain: 1.0, pan: pan(FRONT) });
    t = 17.7;                                   // the ticket has left the lane
    s.set(t, 'queue', 'titleTag', 'waiting 0', 0); s.set(t, 'queue', 'titleTagColor', T.mid, 0.3);
    s.set(t + 0.2, 'empty', 'alpha', 1, 0.4);
    t = 18.4;
    lit(t, 'take', false);
    s.set(t, 'wslot', 'alpha', 0, 0.2);
    s.set(t, 'job', 'glow', 1, 0.15); s.set(t + 0.4, 'job', 'glow', 0, 0.6);
    s.set(t, 'worker', 'glow', 0.7, 0.2); s.set(t + 0.5, 'worker', 'glow', 0, 0.6);
    s.set(t, 'worker', 'l0Text', 'has job A', 0);
    s.sfx(t, 'arrive', { note: 'G5', pan: pan(FRONT) });
    // hold 19-22: queue empty, job at the worker, nothing running yet

    // ---- beat 4: execution happens at the worker; accepted is not complete ----
    t = 22.0;
    s.set(t, 'worker', 'lamp', T.accent, 0.2); s.set(t, 'worker', 'color', T.accent, 0.3);
    s.set(t, 'worker', 'l0Text', 'running', 0); s.set(t, 'worker', 'l0Color', T.accent, 0.2);
    s.set(t, 'job', 'color', T.accent, 0.3);
    s.set(t, 'worker', 'bar', 0.42, 11.0, 'linear');
    s.sfx(t, 'arrive', { note: 'G4', gain: 0.8, pan: pan(FRONT) });
    t = 22.8;
    recRow(t, 2, T.accent);
    s.set(t, 'rec', 'l2Tag', 'in progress', 0); s.set(t, 'rec', 'l2TagColor', T.accent, 0);
    for (let k = 24.0; k < 33.0; k += 1.0) s.sfx(k, 'work', { note: 'G4', gain: 0.55, pan: pan(FRONT) });
    t = 25.6;                                   // the producer's answer was "accepted"...
    s.set(t, 'prod', 'color', T.ok, 0.2); s.set(t, 'prod', 'glow', 0.8, 0.2); s.set(t + 0.6, 'prod', 'glow', 0.25, 0.6);
    s.sfx(t, 'ack', { note: 'C5', gain: 1.4, pan: pan(PX) });
    t = 26.8;                                   // ...and the record still says complete: not yet
    s.set(t, 'rec', 'l3Tag', 'not yet', 0); s.set(t, 'rec', 'l3TagColor', T.fg, 0.2);
    s.set(t, 'rec', 'l3Color', T.fg, 0.2); s.set(t, 'rec', 'l3HlColor', T.mid, 0); s.set(t, 'rec', 'l3Hl', 1, 0.2);
    s.shake(t, 'rec', 6, 0.35);
    s.sfx(t, 'thump', { note: 'C4', gain: 0.55, pan: 0.15 });
    // hold 27.5-33.5: accepted at the producer, running at the worker, complete: not yet

    // ---- finite ending ----
    s.fade(33.6, 1, 1.0);
    s.meta.duration = 35.6;
  },
});
