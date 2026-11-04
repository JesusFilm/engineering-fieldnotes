/* Limit repair attempts — loop-engineering motion-v2 cut 05.
 * One mechanism: the controller, outside the agent, holds an attempt limit (3, an example value) and counts each
 * completed attempt (patch + test result). An attempt runs only while allowance remains. When all three are used,
 * the controller refuses the fourth request before any edit, and the attempt history plus the remaining failure
 * go to an engineer. The three failures differ (119.75, 95.00, 92.50), so the stop comes from the limit,
 * not from a no-progress rule.
 * Render from the repository root (pinned puppeteer-core from root node_modules):
 *   node video/loop-engineering/motion-v2/05/engine/render.mjs video/loop-engineering/motion-v2/05/scene.js video/loop-engineering/motion-v2/05/video.mp4 --sheet video/loop-engineering/motion-v2/05/scratch/contact-sheet.png --wav video/loop-engineering/motion-v2/05/scratch/sfx.wav
 * Uses the local engine copy, which adds the general node types panel, pill, counter and token.
 */
FlowVideo.scene({
  meta: { title: 'Attempt limit', subtitle: '', duration: 45, fps: 30, speed: 1 },
  build(s) {
    const T = s.THEME, DIM = '#5A5F68';

    // ---- stage ----
    s.node('req', 'panel', { x: 540, y: 525, w: 900, h: 110, color: T.mid,
      rows: [{ y: 55, x: 130, size: 40 }, { y: 55, x: 300, mono: true, size: 40, tagX: 950 }],
      r0Text: 'agent', r0Color: T.mid, r1Text: '', r1Color: T.fg });
    s.node('ctl', 'panel', { x: 540, y: 760, w: 900, h: 260, title: 'Controller', color: T.mid, titleColor: T.fg,
      rows: [{ y: 105, size: 40 }, { y: 195, mono: true, size: 40, w: 470 }],
      r0Text: 'limit 3 · example', r0Color: T.mid, r1Text: '0 used · 3 left', r1Color: T.fg });
    [680, 800, 920].forEach((x, i) => s.node('tok' + i, 'token', { x, y: 780, w: 100, h: 80, text: String(i + 1) }));
    s.node('hist', 'panel', { x: 540, y: 1165, w: 900, h: 440, title: 'attempts · want 90.00', color: T.dim, titleColor: DIM,
      rows: [{ y: 105, mono: true, size: 38, iconX: 930 }, { y: 185, mono: true, size: 38, iconX: 930 }, { y: 265, mono: true, size: 38, iconX: 930 },
             { y: 360, mono: true, size: 38, w: 500 }],
      r0Alpha: 0, r1Alpha: 0, r2Alpha: 0, r3Alpha: 0, r3Text: '4  not run', r3Color: T.accent });
    s.node('hand', 'panel', { x: 540, y: 1600, w: 900, h: 300, title: 'for engineer', color: T.dim, titleColor: DIM,
      rows: [{ y: 100, mono: true, size: 36 }, { y: 155, mono: true, size: 36 }, { y: 210, mono: true, size: 36 }, { y: 265, size: 40 }],
      r0Text: 'tried: patch A · B · C', r0Alpha: 0, r1Text: 'pytest -k discount', r1Alpha: 0,
      r2Text: 'still fails: got 92.50', r2Color: T.bad, r2Alpha: 0, r3Text: 'stopped: attempt limit', r3Color: T.accent, r3Alpha: 0 });

    s.wire('ask', [540, 584], [540, 626]);
    s.wire('go', [540, 894], [540, 941]);
    const ROWY = [1050, 1130, 1210];
    ROWY.forEach((y, i) => s.wire('cnt' + i, [996, y], [994, 780], { via: [[1036, y], [1036, 780]] }));
    s.wire('give', [540, 1389], [540, 1446]);

    const pan = (a) => s.panOf(a);
    const lit = (t, w, on, c) => { s.set(t, 'wire:' + w, 'color', on ? (c || T.fg) : T.wire, 0.2); s.set(t, 'wire:' + w, 'flow', on ? 1 : 0, 0); };
    const dot = (t, w, route, c, dur) => { lit(t, w, true, c); s.packet({ route, t, dur, kind: 'dot', r: 13, color: c }); lit(t + dur, w, false); };

    // one attempt: request -> controller allows -> patch + test -> result -> controller counts it
    function attempt(k, t0, patch, got, edit, test) {
      s.set(t0, 'req', 'r1Text', 'request attempt ' + (k + 1), 0); s.set(t0, 'req', 'r1Tag', '', 0);
      s.set(t0, 'req', 'color', T.fg, 0.2); s.set(t0, 'req', 'r0Color', T.fg, 0.2); s.set(t0, 'req', 'glow', 0.5, 0.2); s.set(t0 + 0.5, 'req', 'glow', 0, 0.5);
      s.sfx(t0, 'arrive', { note: 'C5', gain: 0.8, pan: 0 });
      dot(t0 + 0.5, 'ask', [[540, 584], [540, 626]], T.fg, 0.5);
      s.sfx(t0 + 0.5, 'send', { note: 'C6', gain: 1.0, pan: 0 });
      let t = t0 + 1.0;                                 // the controller checks the allowance
      s.set(t, 'ctl', 'glow', 0.5, 0.2); s.set(t + 0.5, 'ctl', 'glow', 0, 0.5);
      s.set(t, 'tok' + k, 'glow', 1, 0.15); s.set(t + 0.6, 'tok' + k, 'glow', 0.25, 0.4);
      s.sfx(t, 'ack', { note: 'G5', gain: 1.5, pan: pan('tok' + k) });
      s.set(t + 0.3, 'req', 'r1Tag', 'allowed', 0); s.set(t + 0.3, 'req', 'r1TagColor', T.accent, 0);
      t = t0 + 2.0;
      dot(t, 'go', [[540, 894], [540, 941]], T.accent, 0.5);
      s.sfx(t, 'send', { note: 'G6', gain: 1.0, pan: 0 });
      s.set(t + 0.4, 'req', 'color', T.mid, 0.5); s.set(t + 0.4, 'req', 'r0Color', T.mid, 0.5);
      t = t0 + 2.5;                                     // patch
      const r = 'r' + k;
      s.set(t, 'hist', 'color', T.fg, 0.2); s.set(t, 'hist', 'titleColor', T.fg, 0.2);
      // row text must not start with '#': the engine tweens '#...' strings as colours
      s.set(t, 'hist', r + 'Text', (k + 1) + '  patch ' + patch + '  editing', 0); s.set(t, 'hist', r + 'Color', T.fg, 0);
      s.set(t, 'hist', r + 'Alpha', 1, 0.3); s.set(t, 'hist', r + 'Hl', 1, 0.2); s.set(t, 'hist', r + 'HlColor', T.fg, 0);
      s.sfx(t, 'work', { note: 'G4', gain: 1.1, pan: 0 }); s.sfx(t + 0.35, 'work', { note: 'G4', gain: 1.1, pan: 0 });
      t += edit;                                        // test
      s.set(t, 'hist', r + 'Text', (k + 1) + '  patch ' + patch + '  testing', 0); s.set(t, 'hist', r + 'Color', T.accent, 0); s.set(t, 'hist', r + 'HlColor', T.accent, 0);
      for (let w = t; w < t + test - 0.15; w += 0.3) s.sfx(w, 'work', { note: 'E4', gain: 0.9, pan: 0 });
      t += test;                                        // result
      s.set(t, 'hist', r + 'Text', (k + 1) + '  patch ' + patch + '  got ' + got, 0); s.set(t, 'hist', r + 'Color', T.bad, 0);
      s.set(t, 'hist', r + 'Icon', 'x', 0); s.set(t, 'hist', r + 'IconK', 1, 0.4, 'linear');
      s.set(t, 'hist', r + 'HlColor', T.bad, 0); s.set(t + 0.9, 'hist', r + 'Hl', 0, 0.5);
      s.sfx(t, 'thump', { gain: 0.75, pan: 0.2 });
      t += 0.8;                                         // the completed attempt is reported to the controller
      dot(t, 'cnt' + k, [[996, ROWY[k]], [1036, ROWY[k]], [1036, 780], [994, 780]], T.bad, 0.8);
      s.sfx(t, 'send', { note: 'E6', gain: 1.0, pan: 0.6 });
      t += 0.8;                                         // and counted
      s.set(t, 'tok' + k, 'strike', 1, 0.3); s.set(t, 'tok' + k, 'fill', 1, 0.3); s.set(t, 'tok' + k, 'color', DIM, 0.3);
      s.set(t, 'tok' + k, 'textColor', T.mid, 0.3); s.set(t, 'tok' + k, 'glow', 0, 0.3);
      s.set(t, 'ctl', 'r1Text', (k + 1) + ' used · ' + (2 - k) + ' left', 0);
      s.set(t, 'ctl', 'r1Hl', 1, 0.2); s.set(t, 'ctl', 'r1HlColor', k === 2 ? T.accent : T.fg, 0); s.set(t + 1.0, 'ctl', 'r1Hl', 0, 0.5);
      s.set(t, 'hist', r + 'Color', '#C9545A', 0.5);
      s.sfx(t, 'store', { note: 'G4', gain: 1.2, pan: 0.5 });
      s.set(t, 'req', 'r1Tag', '', 0);
      return t;
    }

    let tc = attempt(0, 1.5, 'A', '119.75', 1.2, 1.6);   // counted at 8.4
    tc = attempt(1, 10.5, 'B', '95.00', 1.0, 1.4);       // counted at 17.0
    tc = attempt(2, 18.8, 'C', '92.50', 1.0, 1.4);       // counted at 25.3
    // allowance exhausted
    s.set(tc, 'ctl', 'r1Color', T.accent, 0.2); s.set(tc, 'ctl', 'color', T.accent, 0.3);
    s.set(tc, 'ctl', 'r0Text', 'limit 3 · reached', 0); s.set(tc, 'ctl', 'r0Color', T.accent, 0.2);

    // ---- the fourth request is refused at the controller, before any edit ----
    let t = 28.5;
    s.set(t, 'req', 'r1Text', 'request attempt 4', 0); s.set(t, 'req', 'r1Tag', '', 0);
    s.set(t, 'req', 'color', T.fg, 0.2); s.set(t, 'req', 'r0Color', T.fg, 0.2);
    s.sfx(t, 'arrive', { note: 'C5', gain: 0.8, pan: 0 });
    dot(t + 0.5, 'ask', [[540, 584], [540, 626]], T.fg, 0.5);
    s.sfx(t + 0.5, 'send', { note: 'C6', gain: 1.0, pan: 0 });
    t = 29.5;
    s.shake(t, 'ctl', 10, 0.4);
    s.ripple(t, [540, 632], T.bad, { r0: 14, r1: 80, mark: 'x' });
    for (let i = 0; i < 3; i++) { s.set(t, 'tok' + i, 'color', T.bad, 0.1); s.set(t + 0.5, 'tok' + i, 'color', DIM, 0.5); }
    s.set(t + 0.2, 'req', 'r1Tag', 'refused', 0); s.set(t + 0.2, 'req', 'r1TagColor', T.bad, 0);
    s.set(t + 0.2, 'req', 'color', T.bad, 0.2); s.set(t + 1.0, 'req', 'color', T.mid, 0.6); s.set(t + 1.0, 'req', 'r0Color', T.mid, 0.6);
    s.sfx(t, 'thump', { gain: 1.3, pan: 0 });
    s.set(t + 0.4, 'wire:go', 'dashed', 1, 0); s.set(t + 0.4, 'wire:go', 'color', T.bad, 0.2); s.set(t + 1.2, 'wire:go', 'color', DIM, 0.5);
    s.set(30.3, 'hist', 'r3Alpha', 1, 0.35); s.set(30.3, 'hist', 'r3Hl', 1, 0.3); s.set(30.3, 'hist', 'r3HlColor', T.accent, 0); s.set(30.3, 'hist', 'r3HlDash', 1, 0);
    s.sfx(30.3, 'ack', { note: 'C5', gain: 1.2, pan: 0 });

    // ---- hand the history and the remaining failure to an engineer ----
    t = 33.5;
    dot(t, 'give', [[540, 1389], [540, 1446]], T.accent, 0.5);
    s.sfx(t, 'send', { note: 'A6', gain: 1.0, pan: 0 });
    t = 34.0;
    s.set(t, 'hand', 'color', T.fg, 0.2); s.set(t, 'hand', 'titleColor', T.fg, 0.2); s.set(t, 'hand', 'glow', 0.5, 0.2); s.set(t + 0.5, 'hand', 'glow', 0, 0.5);
    s.sfx(t, 'arrive', { note: 'A5', gain: 0.9, pan: 0 });
    [34.5, 35.2, 35.9].forEach((tr, i) => { s.set(tr, 'hand', 'r' + i + 'Alpha', 1, 0.3); s.sfx(tr, 'store', { note: 'A5', gain: 0.9, pan: 0 }); });
    s.set(36.8, 'hand', 'r3Alpha', 1, 0.35);
    s.sfx(36.8, 'deliver', { note: 'A4', gain: 0.9, pan: 0 });
    s.set(37.4, 'hand', 'color', T.mid, 0.6);

    const tEnd = 42.4;
    s.fade(tEnd, 1, 1.0);
    s.meta.duration = tEnd + 1.6;
  },
});

