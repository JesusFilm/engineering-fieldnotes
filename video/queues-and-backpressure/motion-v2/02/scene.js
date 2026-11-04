/* Queues and backpressure, lesson 02 "Finish a job" (motion-v2 cut 02).
 * One mechanism: job A moves waiting -> running -> completed. Leaving the queue starts the work; the job is
 * marked complete only after the work succeeded and its result was saved.
 * A state diagram (top) shows which state job A is in. The worker's step list shows why the last transition
 * waits: "mark complete" is step 3, after "run check" and "save result". The record card (bottom) carries
 * lesson 01's "complete: not yet" row to "complete" with a check.
 * Render from the repository root:
 *   node video/queues-and-backpressure/motion-v2/02/engine/render.mjs video/queues-and-backpressure/motion-v2/02/scene.js video/queues-and-backpressure/motion-v2/02/video.mp4 --sheet video/queues-and-backpressure/motion-v2/02/scratch/contact-sheet.png
 * Uses the cut-local engine copy (card, ticket from cut 01; state, arrow and per-line bars added here).
 */
FlowVideo.scene({
  meta: { title: 'Finish a job', subtitle: 'QUEUES  ·  LESSON 2', subtitleSize: 36, subtitleSpacing: 6, duration: 38, fps: 30, speed: 1 },
  build(s) {
    const T = s.THEME;
    const pan = (x) => ((x - 540) / 540) * 0.6;
    const SY = 680, XW = 180, XR = 540, XC = 900;

    // ---- stage ----
    s.node('ctx', 'label', { x: 540, y: 498, text: 'replay: job A from waiting', size: 40, mono: true, color: T.mid });
    s.node('sWait', 'state', { x: XW, y: SY, label: 'waiting', sublabel: 'in queue', color: T.mid, labelColor: T.mid });
    s.node('sRun', 'state', { x: XR, y: SY, label: 'running', sublabel: 'at worker', color: T.dim, labelColor: T.mid });
    s.node('sDone', 'state', { x: XC, y: SY, label: 'completed', sublabel: 'recorded', color: T.dim, labelColor: T.mid });
    s.node('aTake', 'arrow', { x: 357, y: SY, x1: 292, y1: SY, x2: 422, y2: SY, label: 'take', labelDy: -72, color: T.wire, labelColor: T.mid });
    s.node('aFinish', 'arrow', { x: 722, y: SY, x1: 657, y1: SY, x2: 787, y2: SY, label: 'finish', labelDy: -72, color: T.dim, labelColor: T.mid, dashed: true });
    s.node('worker', 'card', { x: 540, y: 1175, w: 960, h: 470, title: 'Worker', titleSize: 44, titleY: 48, color: T.mid, titleColor: T.fg,
      hasLamp: true, lampLeft: 230, lamp: T.dim, titleTag: 'idle', titleTagSize: 40, titleTagColor: T.mid,
      lineY: [130, 225, 320, 412], lineSize: 40, rowH: 78, tagSize: 40, tagRight: 44, lineBarX: 380, lineBarRight: 190,
      l0Text: '1 run check', l1Text: '2 save result', l2Text: '3 mark complete', l3Text: 'result: —',
      l0Color: T.mid, l1Color: T.mid, l2Color: T.mid, l3Color: T.mid, l2Alpha: 0.6, l0Bar: 0 });
    s.node('rec', 'card', { x: 540, y: 1580, w: 960, h: 220, title: 'job A record', titleSize: 44, titleY: 48, color: T.mid, titleColor: T.fg,
      lineY: [142], lineSize: 40, rowH: 70, tagSize: 40, tagRight: 44, l0Text: 'complete', l0Color: T.fg, l0Tag: 'not yet', l0TagColor: T.fg });
    s.node('job', 'ticket', { x: XW, y: SY, text: 'job A', size: 40, color: T.fg, alpha: 0, scale: 0.6 });

    const cursor = (t, i, on) => {             // the worker's current step
      s.set(t, 'worker', 'l' + i + 'HlColor', T.accent, 0);
      s.set(t, 'worker', 'l' + i + 'Hl', on ? 1 : 0, 0.2);
    };

    // ---- beat 1: replay job A from waiting; no work has happened yet ----
    let t = 1.2;
    s.set(t, 'job', 'alpha', 1, 0.25); s.set(t, 'job', 'scale', 1, 0.35, 'back');
    s.set(t, 'sWait', 'color', T.fg, 0.2); s.set(t, 'sWait', 'labelColor', T.fg, 0.2); s.set(t, 'sWait', 'fill', 1, 0.3);
    s.pulse(t, 'sWait');
    s.sfx(t, 'ack', { note: 'E5', gain: 1.8, pan: pan(XW) });
    t = 3.2;                                    // the worker is idle; step 1 has not started
    s.pulse(t, 'worker');
    s.set(t, 'worker', 'lamp', T.mid, 0.15); s.set(t + 0.5, 'worker', 'lamp', T.dim, 0.5);
    s.sfx(t, 'ack', { note: 'G5', gain: 1.6, pan: 0 });
    t = 4.6;                                    // and the record says: not complete
    s.set(t, 'rec', 'l0HlColor', T.mid, 0); s.set(t, 'rec', 'l0Hl', 1, 0.2); s.set(t + 0.9, 'rec', 'l0Hl', 0, 0.5);
    s.sfx(t, 'ack', { note: 'A5', gain: 1.3, pan: 0.15 });
    // hold 5.5-8.0

    // ---- beat 2: the worker takes job A; execution starts after it arrives ----
    t = 8.0;
    s.set(t, 'aTake', 'color', T.fg, 0.2); s.set(t, 'aTake', 'labelColor', T.fg, 0.2); s.set(t, 'aTake', 'glow', 1, 0.2);
    s.set(t, 'job', 'px', XR, 1.2);
    s.sfx(t, 'send', { note: 'E6', gain: 1.0, pan: pan(XW) });
    s.set(t + 0.3, 'sWait', 'fill', 0, 0.5); s.set(t + 0.3, 'sWait', 'color', T.mid, 0.5); s.set(t + 0.3, 'sWait', 'labelColor', T.mid, 0.5);
    t = 9.2;
    s.set(t, 'aTake', 'color', T.wire, 0.5); s.set(t, 'aTake', 'labelColor', T.mid, 0.5); s.set(t, 'aTake', 'glow', 0, 0.5);
    s.set(t, 'sRun', 'color', T.accent, 0.2); s.set(t, 'sRun', 'labelColor', T.accent, 0.2); s.set(t, 'sRun', 'fill', 1, 0.3);
    s.pulse(t, 'sRun');
    s.set(t, 'job', 'color', T.accent, 0.3); s.set(t, 'job', 'glow', 1, 0.15); s.set(t + 0.4, 'job', 'glow', 0, 0.6);
    s.set(t, 'worker', 'color', T.accent, 0.3); s.set(t, 'worker', 'lamp', T.accent, 0.2);
    s.set(t, 'worker', 'titleTag', 'working', 0); s.set(t, 'worker', 'titleTagColor', T.accent, 0.2);
    s.set(t, 'ctx', 'alpha', 0, 0.6);
    s.sfx(t, 'arrive', { note: 'G5', pan: pan(XR) });
    t = 10.4;                                   // step 1 starts
    cursor(t, 0, true); s.set(t, 'worker', 'l0Color', T.fg, 0.2);
    s.sfx(t, 'ack', { note: 'G6', gain: 1.1, pan: 0 });
    s.set(10.8, 'worker', 'l0Bar', 1, 8.2, 'linear');
    for (let k = 11.2; k < 18.9; k += 0.85) s.sfx(k, 'work', { note: 'G4', gain: 0.55, pan: 0 });

    // ---- beat 3: the worker executes; leaving the queue did not finish it ----
    t = 14.6;                                   // contrast: queue is behind it, completed is still dark
    s.set(t, 'sDone', 'color', T.mid, 0.2); s.set(t + 0.6, 'sDone', 'color', T.dim, 0.6);
    s.set(t, 'rec', 'l0HlColor', T.mid, 0); s.set(t, 'rec', 'l0Hl', 1, 0.2); s.set(t + 1.0, 'rec', 'l0Hl', 0, 0.5);
    s.sfx(t, 'ack', { note: 'A4', gain: 1.4, pan: pan(XC) });
    t = 19.0;                                   // step 1 succeeds
    s.set(t, 'worker', 'l0BarColor', T.ok, 0.2);
    s.set(t, 'worker', 'l0Tag', 'ok', 0); s.set(t, 'worker', 'l0TagColor', T.ok, 0);
    cursor(t, 0, false);
    s.sfx(t, 'ack', { note: 'G5', gain: 1.8, pan: 0 });
    t = 19.9;                                   // step 2: save the result
    cursor(t, 1, true); s.set(t, 'worker', 'l1Color', T.fg, 0.2);
    s.sfx(t, 'ack', { note: 'G6', gain: 1.1, pan: 0 });
    t = 20.8;
    s.set(t, 'worker', 'l1Tag', 'saved', 0); s.set(t, 'worker', 'l1TagColor', T.ok, 0);
    s.set(t, 'worker', 'l3Text', 'result: 0 broken links', 0); s.set(t, 'worker', 'l3Color', T.ok, 0.2);
    cursor(t + 0.3, 1, false);
    s.sfx(t, 'store', { note: 'G5', gain: 1.1, pan: 0 });
    t = 21.6;                                   // step 3 becomes possible
    s.set(t, 'worker', 'l2Alpha', 1, 0.4); s.set(t, 'worker', 'l2Color', T.fg, 0.4);
    s.sfx(t, 'ack', { note: 'D6', gain: 0.9, pan: 0 });
    // hold 22-24.8: work succeeded and is saved; job still running, record still "not yet"

    // ---- beat 4: the work finished successfully; now the job can be marked complete ----
    t = 24.8;
    cursor(t, 2, true);
    s.sfx(t, 'ack', { note: 'G6', gain: 1.1, pan: 0 });
    t = 25.4;                                   // the completion report travels to the record
    s.packet({ route: [[930, 1302], [930, 1466]], t, dur: 1.1, kind: 'dot', color: T.ok });
    s.sfx(t, 'send', { note: 'A6', gain: 1.0, pan: pan(930) });
    t = 26.5;
    s.set(t, 'rec', 'l0Tag', '', 0); s.set(t, 'rec', 'l0Tick', 1, 0.4, 'linear');
    s.set(t, 'rec', 'color', T.ok, 0.2); s.set(t, 'rec', 'glow', 0.7, 0.2); s.set(t + 0.6, 'rec', 'glow', 0, 0.6);
    s.set(t, 'worker', 'l2Tag', 'done', 0); s.set(t, 'worker', 'l2TagColor', T.ok, 0);
    cursor(t + 0.3, 2, false);
    s.sfx(t, 'store', { note: 'A5', gain: 1.2, pan: 0.15 });
    t = 27.4;                                   // only now the state machine moves to completed
    s.set(t, 'aFinish', 'dashed', 0, 0); s.set(t, 'aFinish', 'color', T.fg, 0.2); s.set(t, 'aFinish', 'labelColor', T.fg, 0.2); s.set(t, 'aFinish', 'glow', 1, 0.2);
    s.set(t, 'job', 'px', XC, 1.2);
    s.sfx(t, 'send', { note: 'G6', gain: 1.0, pan: pan(XR) });
    s.set(t + 0.3, 'sRun', 'fill', 0, 0.5); s.set(t + 0.3, 'sRun', 'color', T.mid, 0.5); s.set(t + 0.3, 'sRun', 'labelColor', T.mid, 0.5);
    t = 28.6;
    s.set(t, 'aFinish', 'color', T.wire, 0.5); s.set(t, 'aFinish', 'labelColor', T.mid, 0.5); s.set(t, 'aFinish', 'glow', 0, 0.5);
    s.set(t, 'sDone', 'color', T.ok, 0.2); s.set(t, 'sDone', 'labelColor', T.ok, 0.2); s.set(t, 'sDone', 'fill', 1, 0.3);
    s.pulse(t, 'sDone');
    s.set(t, 'job', 'color', T.ok, 0.3); s.set(t, 'job', 'glow', 1, 0.15); s.set(t + 0.4, 'job', 'glow', 0, 0.6);
    s.set(t, 'worker', 'color', T.mid, 0.4); s.set(t, 'worker', 'lamp', T.ok, 0.2);
    s.set(t, 'worker', 'titleTag', 'done', 0); s.set(t, 'worker', 'titleTagColor', T.ok, 0.2);
    s.set(t, 'rec', 'color', T.mid, 0.6);
    s.sfx(t, 'chime', { note: 'A5', gain: 1.1, pan: pan(XC) });
    // hold 29.5-36: completed, recorded, result saved

    // ---- finite ending ----
    s.fade(36.0, 1, 1.0);
    s.meta.duration = 38.0;
  },
});
