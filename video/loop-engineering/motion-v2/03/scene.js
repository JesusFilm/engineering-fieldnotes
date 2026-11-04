/* Stop after verified success — loop-engineering motion-v2 cut 03.
 * One mechanism: the same twelve selected tests run again on the repaired code B and all pass. The controller
 * checks its success rule against that fresh evidence (current code, same selection, every selected test passed),
 * closes the edit loop, and hands the unchanged code and its evidence to review. Review is still pending:
 * a passing selected suite supports the tested behaviour; it is not shown as proof of correctness.
 * Render from the repository root (pinned puppeteer-core from root node_modules):
 *   node video/loop-engineering/motion-v2/03/engine/render.mjs video/loop-engineering/motion-v2/03/scene.js video/loop-engineering/motion-v2/03/video.mp4 --sheet video/loop-engineering/motion-v2/03/scratch/contact-sheet.png --wav video/loop-engineering/motion-v2/03/scratch/sfx.wav
 * Uses the local engine copy, which adds the general node types panel, pill, segs and ring.
 */
FlowVideo.scene({
  meta: { title: 'Verified success', subtitle: '', duration: 34, fps: 30, speed: 1 },
  build(s) {
    const T = s.THEME, DIM = '#5A5F68';

    // ---- stage ----
    s.node('runner', 'panel', { x: 540, y: 620, w: 900, h: 300, title: 'tests · code B', color: T.mid, titleColor: T.fg,
      rows: [{ y: 110, mono: true }, { y: 255, mono: true, size: 44 }],
      r0Text: 'pytest -k discount', r0Color: T.mid, r1Text: '0 of 12 ran', r1Color: T.mid });
    s.node('bar', 'segs', { x: 540, y: 655, count: 12, cw: 56, ch: 48, gap: 10 });
    s.node('ctl', 'panel', { x: 540, y: 1000, w: 900, h: 420, title: 'Controller', color: T.mid,
      rows: [{ y: 105, size: 40 }, { y: 170, mono: true, w: 860 }, { y: 235, mono: true, w: 860 }, { y: 300, mono: true, w: 860 }, { y: 372, size: 44 }],
      r0Text: 'success rule', r0Color: DIM,
      r1Text: 'current code   B', r1Color: DIM, r2Text: 'same 12 tests', r2Color: DIM, r3Text: '12 of 12 passed', r3Color: DIM,
      r4Text: 'waiting', r4Color: T.mid });
    s.node('loop', 'panel', { x: 265, y: 1525, w: 350, h: 470, title: 'edit loop', color: T.mid,
      rows: [{ y: 425, size: 44 }], r0Text: 'open', r0Color: T.accent });
    s.node('ring', 'ring', { x: 265, y: 1505, w: 200, h: 230, radius: 70, color: T.accent, flow: 1 });
    s.node('lEdit', 'label', { x: 265, y: 1445, text: 'edit', size: 38, mono: true, color: T.mid });
    s.node('lTest', 'label', { x: 265, y: 1565, text: 'test', size: 38, mono: true, color: T.mid });
    s.node('hand', 'panel', { x: 735, y: 1525, w: 510, h: 470, title: 'handoff', color: T.dim, titleColor: DIM,
      rows: [{ y: 110, x: 520, mono: true, size: 36 }, { y: 175, x: 520, mono: true, size: 36 }, { y: 240, x: 520, mono: true, size: 36 },
             { y: 305, x: 520, mono: true, size: 36 }, { y: 410, x: 520, size: 44 }],
      r0Text: 'code B', r0Alpha: 0, r1Text: 'pytest -k discount', r1Alpha: 0, r2Text: '12 selected passed', r2Alpha: 0, r2Color: T.ok,
      r3Text: 'stop: rule met', r3Alpha: 0, r4Text: 'review pending', r4Color: T.accent, r4Alpha: 0 });

    s.wire('report', [996, 725], [994, 895], { via: [[1036, 725], [1036, 895]] });
    s.wire('stop', [265, 1214], [265, 1286]);
    s.wire('give', [735, 1214], [735, 1286]);

    s.sound('latch', { base: 'C4', gain: 0.5, layers: [
      { type: 'noise', lp: 4000, hp: 800, attack: 0.001, decay: 0.018, gain: 0.6 },
      { type: 'tone', wave: 'sine', ratio: 1, attack: 0.002, decay: 0.12, gain: 0.6, harmonics: [1, 0.3] }] });

    const pan = (a) => s.panOf(a);
    const lit = (t, w, on, c) => { s.set(t, 'wire:' + w, 'color', on ? (c || T.fg) : T.wire, 0.2); s.set(t, 'wire:' + w, 'flow', on ? 1 : 0, 0); };
    const flash = (t, id, prop, c, back) => { s.set(t, id, prop, c, 0.15); s.set(t + 0.7, id, prop, back, 0.5); };

    // ---- beat 1: the same twelve tests run again on code B and all pass ----
    let t = 0.6;
    s.set(t, 'runner', 'color', T.fg, 0.2); s.set(t, 'runner', 'glow', 0.5, 0.2); s.set(t + 0.5, 'runner', 'glow', 0, 0.5);
    s.sfx(t, 'arrive', { note: 'E5', gain: 0.8, pan: pan('runner') });
    s.set(1.2, 'lTest', 'color', T.accent, 0.3);
    s.sfx(1.2, 'ack', { note: 'C6', gain: 1.0, pan: pan('loop') });
    for (let i = 0; i < 12; i++) {
      const ti = 1.6 + i * 0.38;
      s.set(ti, 'bar', 's' + i + 'Run', 1, 0.05); s.set(ti + 0.3, 'bar', 's' + i + 'Run', 0, 0.1);
      s.set(ti + 0.3, 'bar', 's' + i + 'Done', 1, 0.2);
      s.set(ti + 0.3, 'runner', 'r1Text', (i + 1) + ' of 12 ran', 0);
      s.sfx(ti + 0.3, 'ack', { note: 'E6', gain: 0.9, pan: s.panOf([149 + i * 66 + 28, 0]) });
    }
    t = 6.5;
    s.set(t, 'runner', 'r1Text', '12 ran · 12 passed', 0); s.set(t, 'runner', 'r1Color', T.ok, 0);
    s.set(t, 'runner', 'r1Hl', 1, 0.2); s.set(t + 1.0, 'runner', 'r1Hl', 0, 0.5);
    s.sfx(t, 'hit', { gain: 0.9, pan: pan('runner') });
    s.set(t, 'ring', 'flow', 0, 0.4); s.set(t, 'lTest', 'color', T.mid, 0.4);   // the loop pauses for the decision
    s.set(t + 0.6, 'runner', 'color', T.mid, 0.5);

    // ---- beat 2: the controller checks the success rule against that evidence ----
    t = 9.0;
    lit(t, 'report', true, T.ok);
    s.packet({ route: [[996, 725], [1036, 725], [1036, 895], [994, 895]], t, dur: 1.0, kind: 'dot', r: 14, color: T.ok });
    s.sfx(t, 'send', { note: 'E6', gain: 1.1, pan: 0.6 });
    t = 10.0;
    lit(t, 'report', false);
    s.set(t, 'ctl', 'color', T.fg, 0.2); s.set(t, 'ctl', 'glow', 0.5, 0.2); s.set(t + 0.5, 'ctl', 'glow', 0, 0.5);
    s.set(t, 'ctl', 'titleColor', T.fg, 0.2); s.set(t, 'ctl', 'r0Color', T.fg, 0.2);
    s.sfx(t, 'arrive', { note: 'G5', gain: 0.9, pan: pan([1000, 0]) });
    const checks = [
      [10.9, 1, () => flash(10.9, 'runner', 'titleColor', T.ok, T.fg), 'G5'],
      [11.9, 2, () => { s.set(11.9, 'runner', 'r0Hl', 1, 0.15); s.set(11.9, 'runner', 'r0HlColor', T.ok, 0); s.set(12.6, 'runner', 'r0Hl', 0, 0.5); }, 'B5'],
      [12.9, 3, () => { s.set(12.9, 'runner', 'r1Hl', 1, 0.15); s.set(13.6, 'runner', 'r1Hl', 0, 0.5); }, 'D6'],
    ];
    for (const [tc, r, src, note] of checks) {
      src();
      s.set(tc, 'ctl', 'r' + r + 'Color', T.fg, 0.2); s.set(tc, 'ctl', 'r' + r + 'Hl', 1, 0.15); s.set(tc, 'ctl', 'r' + r + 'HlColor', T.ok, 0);
      s.set(tc + 0.1, 'ctl', 'r' + r + 'Icon', 'check', 0); s.set(tc + 0.1, 'ctl', 'r' + r + 'IconK', 1, 0.4, 'linear');
      s.set(tc + 0.8, 'ctl', 'r' + r + 'Hl', 0, 0.4);
      s.sfx(tc + 0.1, 'ack', { note, gain: 1.6, pan: pan([1000, 0]) * 0.5 });
    }
    t = 14.2;                                       // rule met
    s.set(t, 'ctl', 'r4Text', 'rule met', 0); s.set(t, 'ctl', 'r4Color', T.ok, 0);
    s.set(t, 'ctl', 'color', T.ok, 0.25); s.set(t, 'ctl', 'glow', 0.7, 0.15); s.set(t + 0.3, 'ctl', 'glow', 0, 0.6);
    s.ripple(t, [210, 1162], T.ok, { r0: 20, r1: 90 });
    s.sfx(t, 'chime', { note: 'G5', gain: 1.0, pan: 0 });

    // ---- beat 3: the controller closes the edit loop ----
    t = 17.0;
    lit(t, 'stop', true, T.fg);
    s.packet({ route: [[265, 1214], [265, 1286]], t, dur: 0.6, kind: 'dot', r: 13, color: T.fg });
    s.sfx(t, 'send', { note: 'G6', gain: 1.1, pan: pan('loop') });
    t = 17.6;
    lit(t, 'stop', false);
    s.set(t, 'ring', 'color', T.mid, 0.4); s.set(t, 'ring', 'dashed', 1, 0); s.set(t, 'ring', 'gap', 1, 0.4, 'out');
    s.shake(t, 'ring', 6, 0.3, 'y');
    s.set(t, 'lEdit', 'color', DIM, 0.4); s.set(t, 'lTest', 'color', DIM, 0.4);
    s.set(t, 'loop', 'r0Text', 'closed', 0); s.set(t, 'loop', 'r0Color', T.fg, 0);
    s.set(t, 'loop', 'color', T.fg, 0.2); s.set(t + 0.6, 'loop', 'color', T.mid, 0.6);
    s.sfx(t, 'latch', { pan: pan('loop') });
    s.sfx(t + 0.15, 'deliver', { note: 'C5', gain: 0.7, pan: pan('loop') });

    // ---- beat 4: hand over the same code and its evidence for review ----
    t = 21.2;
    lit(t, 'give', true, T.ok);
    s.packet({ route: [[735, 1214], [735, 1286]], t, dur: 0.6, kind: 'dot', r: 13, color: T.ok });
    s.sfx(t, 'send', { note: 'G6', gain: 1.1, pan: pan('hand') });
    t = 21.8;
    lit(t, 'give', false);
    s.set(t, 'hand', 'color', T.fg, 0.2); s.set(t, 'hand', 'titleColor', T.fg, 0.2); s.set(t, 'hand', 'glow', 0.5, 0.2); s.set(t + 0.5, 'hand', 'glow', 0, 0.5);
    s.sfx(t, 'arrive', { note: 'A5', gain: 0.9, pan: pan('hand') });
    [22.4, 23.1, 23.8, 24.5].forEach((tr, i) => {
      s.set(tr, 'hand', 'r' + i + 'Alpha', 1, 0.3);
      s.sfx(tr, 'store', { note: 'A5', gain: 0.9, pan: pan('hand') });
    });
    t = 25.6;
    s.set(t, 'hand', 'r4Alpha', 1, 0.35);
    s.set(t, 'hand', 'r4Hl', 1, 0.3); s.set(t, 'hand', 'r4HlColor', T.accent, 0); s.set(t, 'hand', 'r4HlDash', 1, 0);
    s.sfx(t, 'arrive', { note: 'C6', gain: 0.8, pan: pan('hand') });
    s.set(t + 0.6, 'hand', 'color', T.mid, 0.6);

    // ---- hold the handed-over record with the loop closed; then end ----
    const tEnd = 31.4;
    s.fade(tEnd, 1, 1.0);
    s.meta.duration = tEnd + 1.6;
  },
});

