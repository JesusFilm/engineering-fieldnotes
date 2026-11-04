/* A callable operation — tool-design motion-v2 cut 01.
 * One mechanism: a documented operation lets the model request a structured call; the application
 * executes it against the data store and returns the result, which the model then uses as evidence.
 * Geometry: a sequence diagram. Lanes for Model, Application and Incidents; time runs downward.
 * Only the application's activation bar grows while the search runs; the model never messages the store.
 * Render from the repository root:
 *   node video/tool-design/motion-v2/01/engine/render.mjs video/tool-design/motion-v2/01/scene.js video/tool-design/motion-v2/01/video.mp4 --sheet video/tool-design/motion-v2/01/scratch/contact-sheet.png
 * The local engine copy adds the general node types 'lane', 'msg' and 'card'.
 */
FlowVideo.scene({
  meta: { title: '', subtitle: '', duration: 37, fps: 30, speed: 1 },
  build(s) {
    const T = s.THEME;
    const MX = 170, AX = 690, SX = 965;          // lifeline x: model, application, incidents store
    const pan = (x) => ((x - 540) / 540) * 0.6;

    // ---- title band ----
    s.node('title', 'label', { x: 540, y: 300, text: 'A callable operation', size: 84, weight: 800, color: T.title });
    s.node('subtitle', 'label', { x: 540, y: 392, text: 'TOOL DESIGN · 1', size: 36, weight: 700, color: T.mid });

    // ---- stage ----
    s.wire('offer', [AX, 822], [AX, 776]);
    s.set(0, 'wire:offer', 'alpha', 0, 0);
    s.node('def', 'card', { x: 540, y: 615, w: 960, h: 310, title: 'Tool definition', alpha: 0, color: T.mid,
      rows: [{ dy: 120, size: 50, mono: true }, { dy: 196, size: 44 }, { dy: 266, size: 44 }],
      r0Text: 'search_incidents(service)', r0Color: T.fg,
      r1Text: 'Find incident records', r1Color: T.mid, r1Alpha: 0,
      r2Text: 'Returns IDs + summaries', r2Color: T.mid, r2Alpha: 0 });
    s.node('model', 'lane', { x: MX, y: 875, w: 260, h: 100, name: 'Model', lineTop: 925, lineBottom: 1570, bars: 2, alpha: 0, color: T.mid,
      b0Top: 1000, b1Top: 1500, b1Color: T.ok });
    s.node('app', 'lane', { x: AX, y: 875, w: 330, h: 100, name: 'Application', nameSize: 44, lineTop: 925, lineBottom: 1570, bars: 1, alpha: 0, color: T.mid,
      b0Top: 1180 });
    s.node('store', 'lane', { x: SX, y: 870, w: 120, h: 100, shape: 'cylinder', name: 'Incidents', nameBelow: 42, lineTop: 990, lineBottom: 1570, bars: 1, alpha: 0, color: T.mid,
      b0Top: 1300, b0Color: T.accent });
    s.node('task', 'card', { x: 432, y: 1035, w: 470, h: 90, pad: 34, alpha: 0, color: T.mid,
      rows: [{ dy: 46, size: 42 }], r0Text: 'payments incidents?', r0Color: T.fg });
    s.node('req', 'msg', { x0: MX + 16, x1: AX - 16, y: 1180, above: 'search_incidents', below: 'service: payments', belowMono: true, color: T.accent });
    s.node('read', 'msg', { x0: AX + 13, x1: SX - 13, y: 1300, above: 'read', aboveSize: 42, gap: 38, color: T.accent });
    s.node('ret', 'msg', { x0: SX - 13, x1: AX + 13, y: 1410, above: 'INC-42', aboveSize: 42, gap: 38, dashedLine: true, color: T.ok });
    s.node('res', 'msg', { x0: AX - 13, x1: MX + 16, y: 1500, above: 'result: INC-42', below: 'Elevated error rate', dashedLine: true, color: T.ok });
    s.node('waiting', 'label', { x: 272, y: 1350, text: 'waiting', size: 42, weight: 600, color: T.mid, alpha: 0 });
    s.node('running', 'label', { x: 588, y: 1350, text: 'running', size: 42, weight: 600, color: T.accent, alpha: 0 });
    s.node('answer', 'card', { x: 540, y: 1700, w: 960, h: 220, title: 'Model answer', titleDy: 42, alpha: 0, color: T.mid,
      rows: [{ dy: 108, size: 46 }, { dy: 174, size: 44, mono: true, hlPad: 22 }],
      r0Text: 'Reported payment errors', r0Color: T.fg,
      r1Text: 'evidence: INC-42', r1Color: T.ok, r1Alpha: 0, r1HlColor: T.ok });

    // ---- beat 1 (0–10.5): the model has a need; the application offers one documented operation ----
    s.set(0.6, 'model', 'alpha', 1, 0.4); s.sfx(0.6, 'ack', { note: 'E5', gain: 1.3, pan: pan(MX) });
    s.set(0.9, 'app', 'alpha', 1, 0.4); s.sfx(0.9, 'ack', { note: 'C5', gain: 1.3, pan: pan(AX) });
    s.set(1.2, 'store', 'alpha', 1, 0.4); s.sfx(1.2, 'ack', { note: 'G4', gain: 1.3, pan: pan(SX) });
    let t = 2.2;   // the model's task
    s.set(t, 'model', 'color', T.fg, 0.3); s.set(t, 'model', 'b0Len', 80, 0.5);
    s.set(t, 'task', 'alpha', 1, 0.4); s.set(t, 'task', 'color', T.fg, 0.3);
    s.sfx(t, 'arrive', { note: 'E5', gain: 0.8, pan: pan(MX) });
    t = 3.8;       // the application exposes the definition
    s.set(t, 'wire:offer', 'alpha', 1, 0.2); s.set(t, 'wire:offer', 'color', T.fg, 0.2); s.set(t, 'wire:offer', 'flow', 1, 0);
    s.set(t, 'app', 'color', T.fg, 0.2);
    s.set(t, 'def', 'alpha', 1, 0.4); s.set(t, 'def', 'color', T.fg, 0.3);
    s.sfx(t, 'arrive', { note: 'G5', gain: 0.8, pan: 0 });
    s.set(t + 0.7, 'def', 'r1Alpha', 1, 0.3); s.sfx(t + 0.7, 'store', { note: 'G5', gain: 0.8, pan: 0 });
    s.set(t + 1.4, 'def', 'r2Alpha', 1, 0.3); s.sfx(t + 1.4, 'store', { note: 'G5', gain: 0.8, pan: 0 });
    s.set(t + 1.8, 'wire:offer', 'flow', 0, 0); s.set(t + 1.8, 'wire:offer', 'color', T.wire, 0.4);
    s.set(t + 1.8, 'app', 'color', T.mid, 0.4); s.set(t + 1.8, 'def', 'color', T.mid, 0.4);
    t = 7.0;       // the description matches the need
    s.set(t, 'def', 'r1Hl', 1, 0.25); s.set(t, 'def', 'r1Color', T.fg, 0.25);
    s.set(t, 'task', 'color', T.accent, 0.25); s.pulse(t, 'task');
    s.sfx(t, 'ack', { note: 'E6', gain: 1.5, pan: pan(MX) });
    t = 7.7;       // selected
    s.set(t, 'def', 'r0Color', T.accent, 0.25); s.sfx(t, 'ack', { note: 'G5', gain: 1.5, pan: 0 });
    s.set(9.4, 'def', 'r1Hl', 0, 0.5); s.set(9.4, 'def', 'r1Color', T.mid, 0.5);

    // ---- beat 2 (10.5–15.5): the model requests; the application receives a structured call ----
    t = 10.5;
    s.set(t, 'model', 'b0Len', 200, 0.6);
    s.set(t, 'req', 'prog', 1, 1.0, 'inOut');
    s.sfx(t, 'send', { note: 'E6', gain: 1.4, pan: pan(MX) });
    t = 11.5;
    s.set(t, 'app', 'color', T.fg, 0.2); s.set(t, 'app', 'glow', 0.7, 0.2); s.set(t + 0.5, 'app', 'glow', 0, 0.6);
    s.set(t, 'app', 'b0Len', 20, 0.25); s.set(t, 'app', 'b0Color', T.fg, 0);
    s.set(t, 'model', 'color', T.mid, 0.4); s.set(t, 'task', 'color', T.mid, 0.4);
    s.sfx(t, 'arrive', { note: 'C5', pan: pan(AX) });
    t = 13.6;      // the model steps back
    for (const id of ['model', 'task']) s.set(t, id, 'alpha', 0.4, 0.6);
    s.set(t, 'waiting', 'alpha', 1, 0.4);
    s.set(t, 'def', 'r0Color', T.fg, 0.6);
    s.sound('stepback', { base: 'E5', gain: 0.3, layers: [{ type: 'tone', wave: 'sine', ratio: 1, glideTo: 0.75, glide: 0.25, attack: 0.005, decay: 0.3, harmonics: [1, 0.2] }] });
    s.sfx(t, 'stepback', { pan: pan(MX) });

    // ---- beat 3 (15.5–23): the application executes the search; the model does not ----
    t = 15.5;
    s.set(t, 'app', 'b0Color', T.accent, 0.2); s.set(t, 'app', 'b0Len', 110, 1.1, 'linear');
    s.set(t, 'running', 'alpha', 1, 0.3);
    s.sfx(t, 'work', { note: 'C4', gain: 1.6, pan: pan(AX) });
    t = 16.6;
    s.set(t, 'app', 'b0Len', 230, 3.8, 'linear');
    s.set(t, 'read', 'prog', 1, 0.6);
    s.sfx(t, 'send', { note: 'C6', gain: 1.4, pan: pan(AX) });
    t = 17.2;
    s.set(t, 'store', 'color', T.fg, 0.2); s.set(t, 'store', 'busy', 1, 0.2);
    s.set(t, 'store', 'b0Len', 110, 2.6, 'linear');
    s.sfx(t, 'arrive', { note: 'G4', pan: pan(SX) });
    for (let k = 0; k < 7; k++) s.sfx(17.7 + k * 0.3, 'work', { note: 'G3', gain: 1.1, pan: pan(SX) });
    t = 19.8;
    s.set(t, 'store', 'busy', 0, 0.3); s.set(t, 'store', 'color', T.mid, 0.4);
    s.set(t, 'store', 'b0Color', T.ok, 0.2);
    s.set(t, 'read', 'color', T.mid, 0.4);
    s.set(t, 'ret', 'prog', 1, 0.6);
    s.sfx(t, 'send', { note: 'G5', gain: 1.4, pan: pan(SX) });
    t = 20.4;
    s.set(t, 'app', 'b0Len', 320, 2.6, 'linear');
    s.sfx(t, 'store', { note: 'C5', gain: 1.0, pan: pan(AX) });

    // ---- beat 4 (23–37): the result returns through the application; the model uses it as evidence ----
    t = 23.0;
    s.set(t, 'app', 'b0Color', T.ok, 0.3); s.set(t, 'running', 'alpha', 0, 0.3);
    s.set(t, 'req', 'color', T.mid, 0.4); s.set(t, 'ret', 'color', T.mid, 0.4); s.set(t, 'ret', 'aboveColor', T.mid, 0.4);
    s.set(t, 'store', 'b0Color', T.mid, 0.4);
    s.set(t, 'res', 'prog', 1, 1.0);
    s.sfx(t, 'send', { note: 'C6', gain: 1.4, pan: pan(AX) });
    t = 24.0;
    for (const id of ['model', 'task']) s.set(t, id, 'alpha', 1, 0.3);
    s.set(t, 'waiting', 'alpha', 0, 0.3);
    s.set(t, 'model', 'color', T.ok, 0.2); s.set(t, 'model', 'glow', 0.8, 0.2); s.set(t + 0.6, 'model', 'glow', 0, 0.8);
    s.set(t, 'model', 'b1Len', 60, 0.4);
    s.set(t, 'app', 'color', T.mid, 0.5); s.set(t, 'app', 'b0Color', T.mid, 0.5);
    s.sfx(t, 'arrive', { note: 'E5', gain: 1.1, pan: pan(MX) });
    s.sfx(t + 0.08, 'chime', { note: 'E6', gain: 1.0, pan: pan(MX) });
    t = 25.6;
    s.set(t, 'answer', 'alpha', 1, 0.4); s.set(t, 'answer', 'color', T.fg, 0.3);
    s.sfx(t, 'store', { note: 'E5', gain: 1.0, pan: pan(MX) });
    t = 26.5;
    s.set(t, 'answer', 'r1Alpha', 1, 0.3);
    s.sfx(t, 'store', { note: 'E6', gain: 0.9, pan: pan(MX) });
    t = 27.6;      // the evidence is the returned record
    s.set(t, 'res', 'aboveHl', 1, 0.5); s.set(t, 'answer', 'r1Hl', 1, 0.5);
    s.sfx(t, 'ack', { note: 'E6', gain: 1.5, pan: pan(MX) });

    // ---- hold the finished trace, then end ----
    s.fade(35.0, 1, 1.2);
    s.meta.duration = 37.0;
  },
});

