/* Queues and backpressure, lesson 03 "A backlog grows" (motion-v2 cut 03).
 * One mechanism: one worker is busy with job A; B, C and D arrive faster than it finishes anything, so each one
 * waits behind the last and the backlog grows. The queue holds the extra jobs but adds no execution capacity.
 * Top: producer -> open queue lane (front at the worker's end, new jobs join at the back) -> one worker.
 * Middle: arrived / waiting / completed counters. Bottom: a "waiting over time" step chart whose rises line up
 * with each arrival. Finite ending: B, C, D still waiting, A still running.
 * Render from the repository root:
 *   node video/queues-and-backpressure/motion-v2/03/engine/render.mjs video/queues-and-backpressure/motion-v2/03/scene.js video/queues-and-backpressure/motion-v2/03/video.mp4 --sheet video/queues-and-backpressure/motion-v2/03/scratch/contact-sheet.png
 * Uses the cut-local engine copy (card, ticket from cut 01; stepchart added here).
 */
FlowVideo.scene({
  meta: { title: 'A backlog grows', subtitle: 'QUEUES  ·  LESSON 3', subtitleSize: 36, subtitleSpacing: 6, duration: 40, fps: 30, speed: 1 },
  build(s) {
    const T = s.THEME;
    const pan = (x) => ((x - 540) / 540) * 0.6;
    const LY = 634, PX = 140, WX = 910, SLOT = { B: 690, C: 590, D: 490 };
    const H0 = 1.0, H1 = 36.0, frac = (t) => (t - H0) / (H1 - H0);
    const ARR = { B: 9.0, C: 17.0, D: 25.0 };

    // ---- stage ----
    s.node('ctx', 'label', { x: 540, y: 494, text: 'new scenario · 1 worker', size: 40, mono: true, color: T.mid });
    s.node('prod', 'card', { x: PX, y: 660, w: 214, h: 200, title: 'producer', titleSize: 40, titleY: 176, titleAlign: 'center', color: T.mid, titleColor: T.fg });
    s.node('queue', 'card', { x: 510, y: 660, w: 500, h: 200, title: 'queue', titleSize: 40, titleY: 176, color: T.mid, titleColor: T.fg, laneY: 18, laneH: 112, laneColor: T.dim });
    s.node('worker', 'card', { x: WX, y: 660, w: 260, h: 200, title: 'worker', titleSize: 40, titleY: 176, color: T.accent, titleColor: T.fg,
      hasLamp: true, lamp: T.accent, hasBar: true, barY: 64, barH: 12, bar: 0.08, barColor: T.accent });
    s.node('back', 'label', { x: 330, y: 806, text: 'back', size: 36, mono: true, color: T.mid });
    s.node('front', 'label', { x: 690, y: 806, text: 'front', size: 36, mono: true, color: T.mid });
    s.node('wstate', 'label', { x: WX, y: 806, text: 'running A', size: 40, mono: true, weight: 700, color: T.accent });

    s.node('metrics', 'card', { x: 540, y: 950, w: 960, h: 190, color: T.mid });
    const COL = { arr: 220, wait: 540, done: 860 };
    s.node('arrL', 'label', { x: COL.arr, y: 898, text: 'arrived', size: 36, mono: true, color: T.mid });
    s.node('waitL', 'label', { x: COL.wait, y: 898, text: 'waiting', size: 36, mono: true, color: T.mid });
    s.node('doneL', 'label', { x: COL.done, y: 898, text: 'completed', size: 36, mono: true, color: T.mid });
    s.node('arrV', 'label', { x: COL.arr, y: 984, text: '1', size: 72, mono: true, weight: 700, color: T.fg });
    s.node('waitV', 'label', { x: COL.wait, y: 984, text: '0', size: 72, mono: true, weight: 700, color: T.fg });
    s.node('doneV', 'label', { x: COL.done, y: 984, text: '0', size: 72, mono: true, weight: 700, color: T.fg });

    s.node('chartC', 'card', { x: 540, y: 1360, w: 960, h: 560, title: 'waiting over time', titleSize: 40, titleY: 50, color: T.mid, titleColor: T.mid });
    s.node('chart', 'stepchart', { x: 540, y: 1400, x0: 200, x1: 960, y0: 1540, dy: 95, levels: 3, tickSize: 36, markSize: 40, color: T.fg,
      steps: [{ at: frac(ARR.B), level: 1, mark: 'B' }, { at: frac(ARR.C), level: 2, mark: 'C' }, { at: frac(ARR.D), level: 3, mark: 'D' }] });

    s.node('jA', 'ticket', { x: WX, y: LY, text: 'A', size: 44, color: T.accent });
    for (const id of ['B', 'C', 'D']) s.node('j' + id, 'ticket', { x: PX, y: LY, text: id, size: 44, color: T.fg, alpha: 0, scale: 0.6 });

    // ---- continuous: A runs slowly the whole time; the chart's "now" advances ----
    s.set(H0, 'chart', 'head', 1, H1 - H0, 'linear');
    s.set(0.5, 'worker', 'bar', 0.3, 35.5, 'linear');
    for (let k = 1.0; k < 37.5; k += 2.0) s.sfx(k, 'work', { note: 'G4', gain: 0.5, pan: pan(WX) });

    const count = (t, id, v) => {                  // a counter changes in place with a small pop
      s.set(t, id, 'text', String(v), 0);
      s.set(t, id, 'scale', 1.25, 0.12); s.set(t + 0.12, id, 'scale', 1, 0.3);
      s.set(t, id, 'color', T.title, 0.1); s.set(t + 0.5, id, 'color', T.fg, 0.5);
    };
    const arrive = (id, n) => {                    // job id is created, travels to the back of the line, waits
      const t0 = ARR[id] - 2.0, x = SLOT[id];
      s.set(t0, 'j' + id, 'alpha', 1, 0.25); s.set(t0, 'j' + id, 'scale', 1, 0.35, 'back');
      s.set(t0, 'prod', 'color', T.fg, 0.2); s.set(t0 + 0.6, 'prod', 'color', T.mid, 0.5);
      s.sfx(t0, 'store', { note: 'C5', gain: 1.0, pan: pan(PX) });
      const t1 = t0 + 0.8;
      s.set(t1, 'j' + id, 'px', x, 1.2);
      s.sfx(t1, 'send', { note: 'C6', gain: 1.0, pan: pan(PX) });
      const t2 = ARR[id];
      s.set(t2, 'j' + id, 'glow', 1, 0.15); s.set(t2 + 0.4, 'j' + id, 'glow', 0, 0.6);
      s.set(t2, 'queue', 'color', T.fg, 0.2); s.set(t2 + 0.6, 'queue', 'color', T.mid, 0.5);
      s.sfx(t2, 'arrive', { note: 'E5', pan: pan(x) });
      count(t2, 'waitV', n); count(t2, 'arrV', n + 1);   // both counters change together: arrived = waiting + running + completed
      s.set(t2, 'chart', 'rise' + (n - 1), 1, 0.15); s.set(t2 + 0.8, 'chart', 'rise' + (n - 1), 0, 0.6);
      s.sfx(t2 + 0.25, 'store', { note: ['E5', 'F#5', 'G#5'][n - 1], gain: 1.1, pan: 0 });
    };

    // ---- beat 1: new scenario; the worker is running A ----
    s.pulse(1.6, 'worker');
    s.set(1.6, 'wstate', 'scale', 1.15, 0.12); s.set(1.72, 'wstate', 'scale', 1, 0.3);
    s.sfx(1.6, 'arrive', { note: 'G5', gain: 0.8, pan: pan(WX) });
    s.set(3.2, 'queue', 'laneColor', T.fg, 0.15); s.set(3.2, 'queue', 'laneGlow', 1, 0.15);
    s.set(3.7, 'queue', 'laneColor', T.dim, 0.5); s.set(3.7, 'queue', 'laneGlow', 0, 0.5);
    s.sfx(3.2, 'ack', { note: 'E5', gain: 1.6, pan: pan(510) });
    // hold 4-7: A running, nothing waiting

    // ---- beat 2: B waits behind the running job ----
    arrive('B', 1);
    s.set(10.6, 'front', 'color', T.fg, 0.2); s.set(10.6, 'front', 'scale', 1.15, 0.12); s.set(10.72, 'front', 'scale', 1, 0.3);
    s.set(11.4, 'front', 'color', T.mid, 0.5);
    s.pulse(10.6, 'jB');
    s.pulse(11.1, 'worker');
    s.sfx(10.6, 'ack', { note: 'E6', gain: 1.0, pan: pan(SLOT.B) });
    s.sfx(11.1, 'ack', { note: 'G5', gain: 1.0, pan: pan(WX) });
    // hold 11.8-15: B waits at the front; the worker is still on A

    // ---- beat 3: C arrives before A finishes; it joins B ----
    arrive('C', 2);
    s.set(18.6, 'worker', 'glow', 0.8, 0.15); s.set(18.9, 'worker', 'glow', 0, 0.6);
    s.set(18.6, 'wstate', 'scale', 1.15, 0.12); s.set(18.72, 'wstate', 'scale', 1, 0.3);
    s.sfx(18.6, 'ack', { note: 'G5', gain: 1.0, pan: pan(WX) });
    // hold 19.5-23

    // ---- beat 4: D arrives too; arrivals exceed completions ----
    arrive('D', 3);
    t = 26.8;                                       // completed is still 0
    var t;
    s.set(26.8, 'doneV', 'scale', 1.25, 0.12); s.set(26.92, 'doneV', 'scale', 1, 0.3);
    s.set(26.8, 'doneL', 'color', T.fg, 0.2); s.set(27.6, 'doneL', 'color', T.mid, 0.5);
    s.sfx(26.8, 'ack', { note: 'G4', gain: 1.4, pan: pan(COL.done) });
    // the waiting line, back to front
    [['D', 28.2], ['C', 28.6], ['B', 29.0]].forEach(([id, tt]) => { s.pulse(tt, 'j' + id); s.sfx(tt, 'ack', { note: 'E5', gain: 1.0, pan: pan(SLOT[id]) }); });
    s.set(29.6, 'waitL', 'color', T.fg, 0.2); s.set(30.6, 'waitL', 'color', T.mid, 0.5);
    s.set(29.6, 'waitV', 'scale', 1.2, 0.12); s.set(29.72, 'waitV', 'scale', 1, 0.3);
    // hold 30-37: B, C, D waiting; A running; the chart runs flat at 3

    // ---- finite ending ----
    s.fade(37.6, 1, 1.0);
    s.meta.duration = 39.6;
  },
});
