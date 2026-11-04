/* The model and its runtime — motion-v2 cut 01.
 * One mechanism: a model's tool call is only text until runtime software checks and dispatches it;
 * the tool does the work and the runtime returns the captured result to the model.
 * Requests travel down the left side and evidence travels back up the right. The model has no wire to the tool.
 * Render from the repository root:
 *   node video/harness-engineering/motion-v2/01/engine/render.mjs video/harness-engineering/motion-v2/01/scene.js video/harness-engineering/motion-v2/01/video.mp4
 * Uses the local engine copy, which adds the general 'card' and 'doc' node types.
 */
FlowVideo.scene({
  meta: { title: 'Model + runtime', subtitle: 'ONE TOOL CALL', duration: 33, fps: 30, speed: 0.85 },
  build(s) {
    const T = s.THEME;

    // ---- stage ----
    s.node('runtime', 'card', { x: 540, y: 1130, w: 940, h: 480, title: 'Runtime', titleSize: 32, titleAlign: 'center', dashed: true, noFill: true, color: T.dim, titleColor: T.mid });
    s.node('model', 'card', { x: 540, y: 650, w: 900, h: 260, title: 'Model', titleSize: 32, lineY: [118, 192], lineSize: 34, color: T.mid, titleColor: T.mid,
      l0Text: 'call #1  read_file notes.txt', l0Reveal: 0, l1Text: 'result #1  count=7', l1Reveal: 0, l1Color: T.ok, l1Slot: 1 });
    s.node('req', 'card', { x: 330, y: 1150, w: 440, h: 290, title: 'Request', lineY: [118, 196], color: T.dim,
      l0Text: 'tool  read_file', l0Alpha: 0, l1Text: 'path  notes.txt', l1Alpha: 0, l0Slot: 1, l1Slot: 1 });
    s.node('res', 'card', { x: 790, y: 1150, w: 340, h: 290, title: 'Result', lineY: [118], color: T.dim,
      l0Text: 'count=7', l0Alpha: 0, l0Slot: 1, l0Color: T.ok });
    s.node('tool', 'card', { x: 330, y: 1570, w: 440, h: 240, title: 'read_file', titleColor: T.fg, hasLamp: true, hasBar: true, barY: 26, lineY: [104, 160], color: T.mid,
      l0Text: 'idle', l0Color: T.mid, l1Text: 'count=7', l1Alpha: 0, l1Slot: 1, l1Color: T.ok });
    s.node('file', 'doc', { x: 860, y: 1560, w: 230, h: 250, text: 'count=7', label: 'notes.txt', color: T.mid, textColor: T.mid });

    s.wire('ask', [260, 784], [260, 1001]);                                       // model -> runtime (request)
    s.wire('dispatch', [260, 1299], [260, 1446]);                                 // runtime -> tool
    s.wire('read', [554, 1560], [741, 1560]);                                     // tool <-> file
    s.wire('capture', [470, 1446], [790, 1299], { via: [[470, 1340], [790, 1340]] }); // tool -> runtime result
    s.wire('reply', [790, 1001], [790, 784]);                                     // runtime -> model (evidence)

    const pan = (id) => s.panOf(id);
    const lit = (t, wire, on) => { s.set(t, 'wire:' + wire, 'color', on ? T.fg : T.wire, 0.25); s.set(t, 'wire:' + wire, 'flow', on ? 1 : 0, 0); };

    // ---- beat 1: the model writes a proposal, and nothing runs ----
    let t = 1.5;
    s.set(t, 'model', 'color', T.fg, 0.3); s.set(t, 'model', 'glow', 0.6, 0.3);
    s.set(t, 'model', 'l0Reveal', 1, 1.8, 'linear');
    s.sfx(t, 'send', { note: 'C6', gain: 0.9, pan: pan('model') });
    t = 3.3;
    s.set(t, 'model', 'l0Tag', 'proposed', 0); s.set(t, 'model', 'l0TagColor', T.accent, 0);
    s.set(t, 'model', 'glow', 0, 0.6); s.set(t, 'model', 'color', T.mid, 0.6);
    s.sfx(t, 'arrive', { note: 'C5', pan: pan('model') });
    for (const tk of [5.2, 6.8]) {   // time passes; the tool is still idle
      s.ripple(tk, [510, 1494], T.mid, { r0: 10, r1: 44, dur: 0.6 });
      s.pulse(tk, 'tool', null, 0.4);
      s.sfx(tk, 'clock', { gain: 1.2, pan: pan('tool') });
    }

    // ---- beat 2: the runtime receives the request and checks it ----
    t = 8.5;
    lit(t, 'ask', true);
    s.packet({ route: [[260, 760], [260, 1010]], t, dur: 1.4, kind: 'chip', label: '#1 read_file', color: T.fg });
    s.sfx(t, 'send', { note: 'C6', gain: 0.9, pan: pan('model') });
    t = 9.9;
    lit(t, 'ask', false);
    s.set(t, 'runtime', 'color', T.mid, 0.3);
    s.set(t, 'req', 'color', T.fg, 0.2); s.set(t, 'req', 'glow', 0.6, 0.2);
    s.set(t, 'req', 'title', 'Request #1', 0); s.set(t, 'req', 'titleColor', T.fg, 0.2);
    s.set(t, 'req', 'l0Alpha', 1, 0.3); s.set(t, 'req', 'l1Alpha', 1, 0.3);
    s.set(t, 'req', 'l0Slot', 0, 0.3); s.set(t, 'req', 'l1Slot', 0, 0.3);
    s.sfx(t, 'arrive', { note: 'E5', pan: pan('req') });
    s.set(t + 0.4, 'req', 'glow', 0, 0.5);
    for (const [i, tc] of [[0, 11.3], [1, 12.7]]) {
      s.set(tc, 'req', 'l' + i + 'Hl', 1, 0.15); s.set(tc + 0.15, 'req', 'l' + i + 'Color', T.fg, 0);
      s.set(tc + 0.05, 'req', 'l' + i + 'Tick', 1, 0.35, 'linear');
      s.set(tc + 0.6, 'req', 'l' + i + 'Hl', 0, 0.4);
      s.sfx(tc, 'ack', { note: 'E6', gain: 1.4, pan: pan('req') });
    }

    // ---- beat 3: the runtime dispatches; the tool does the work ----
    t = 14.5;
    lit(t, 'dispatch', true);
    s.set(t, 'req', 'color', T.accent, 0.2);
    s.packet({ route: [[260, 1290], [260, 1450]], t, dur: 1.2, kind: 'chip', label: '#1', color: T.accent });
    s.sfx(t, 'send', { note: 'E6', gain: 0.9, pan: pan('req') });
    t = 15.7;
    lit(t, 'dispatch', false);
    s.set(t, 'req', 'color', T.mid, 0.4);
    s.set(t, 'tool', 'color', T.fg, 0.2); s.set(t, 'tool', 'glow', 0.7, 0.2);
    s.set(t, 'tool', 'lamp', T.accent, 0.15);
    s.set(t, 'tool', 'l0Text', 'running', 0); s.set(t, 'tool', 'l0Color', T.accent, 0);
    s.set(t, 'tool', 'bar', 0.85, 2.9, 'linear');
    s.sfx(t, 'arrive', { note: 'G5', pan: pan('tool') });
    t = 16.3;
    lit(t, 'read', true);
    s.packet({ route: [[560, 1560], [738, 1560]], t, dur: 0.8, kind: 'dot', color: T.accent });
    t = 17.1;
    s.set(t, 'file', 'color', T.fg, 0.2); s.set(t, 'file', 'glow', 0.6, 0.2);
    s.set(t, 'file', 'hl', 1, 0.2); s.set(t, 'file', 'textColor', T.fg, 0.2);
    s.sfx(t, 'work', { note: 'G4', gain: 1.2, pan: pan('file') });
    t = 17.8;
    s.packet({ route: [[668, 1560], [556, 1560]], t, dur: 0.9, kind: 'chip', label: 'count=7', color: T.ok });
    s.set(t + 0.3, 'file', 'glow', 0, 0.5); s.set(t + 0.3, 'file', 'color', T.mid, 0.5);
    s.set(t + 0.3, 'file', 'hl', 0, 0.5); s.set(t + 0.3, 'file', 'textColor', T.mid, 0.5);
    t = 18.75;
    lit(t, 'read', false);
    s.set(t, 'tool', 'l1Alpha', 1, 0.25); s.set(t, 'tool', 'l1Slot', 0, 0.25);
    s.set(t, 'tool', 'bar', 1, 0.2); s.set(t + 0.2, 'tool', 'barColor', T.ok, 0.2);
    s.set(t, 'tool', 'lamp', T.ok, 0.2);
    s.set(t, 'tool', 'l0Text', 'done', 0); s.set(t, 'tool', 'l0Color', T.ok, 0);
    s.set(t, 'tool', 'glow', 0, 0.6);
    s.sfx(t, 'chime', { note: 'G5', gain: 0.9, pan: pan('tool') });

    // ---- beat 4: the runtime captures the output ----
    t = 21.0;
    lit(t, 'capture', true);
    s.set(t, 'tool', 'color', T.mid, 0.5);
    s.packet({ route: [[470, 1450], [470, 1340], [790, 1340], [790, 1292]], t, dur: 1.8, kind: 'chip', label: '#1 count=7', color: T.ok });
    s.sfx(t, 'send', { note: 'G6', gain: 0.9, pan: pan('tool') });
    t = 22.8;
    lit(t, 'capture', false);
    s.set(t, 'res', 'color', T.ok, 0.2); s.set(t, 'res', 'glow', 0.6, 0.2);
    s.set(t, 'res', 'title', 'Result #1', 0); s.set(t, 'res', 'titleColor', T.fg, 0.2);
    s.set(t, 'res', 'l0Alpha', 1, 0.3); s.set(t, 'res', 'l0Slot', 0, 0.3);
    s.ripple(t, 'res.bottom', T.ok, { r0: 10, r1: 64 });
    s.sfx(t, 'store', { note: 'E5', gain: 1.1, pan: pan('res') });
    s.set(t + 0.5, 'res', 'glow', 0, 0.6);

    // ---- beat 5: the model receives the captured result ----
    t = 25.0;
    lit(t, 'reply', true);
    s.packet({ route: [[790, 1012], [790, 770]], t, dur: 1.4, kind: 'chip', label: '#1 count=7', color: T.ok });
    s.sfx(t, 'send', { note: 'E6', gain: 0.9, pan: pan('res') });
    t = 26.4;
    lit(t, 'reply', false);
    s.set(t, 'model', 'color', T.ok, 0.2); s.set(t, 'model', 'glow', 0.7, 0.2);
    s.set(t, 'model', 'l1Reveal', 1, 0.7, 'linear');
    s.set(t, 'model', 'l1Hl', 1, 0.3); s.set(t, 'model', 'l1Slot', 0, 0.3);
    s.set(t, 'model', 'l1Tag', 'from runtime', 0); s.set(t, 'model', 'l1TagColor', T.ok, 0);
    
    s.sfx(t, 'deliver', { note: 'C5', gain: 1.4, pan: pan('model') });
    s.set(t + 0.6, 'model', 'glow', 0, 0.8);

    // ---- hold the completed record, then end ----
    s.fade(30.6, 1, 1.0);
    s.meta.duration = 32.4;
  },
});
