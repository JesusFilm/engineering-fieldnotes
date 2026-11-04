/* Execute and retain evidence — motion-v2 cut 03.
 * One mechanism: an actual command runs against one revision; its output and exit status are kept with that revision
 * and returned to the agent as an observation. A new patch is a new revision with no run of its own.
 * Composition: agent strip, a revision graph, and run records attached under revisions (a terminal transcript that expands and compacts).
 * Render from the repository root:
 *   node video/harness-engineering/motion-v2/03/engine/render.mjs video/harness-engineering/motion-v2/03/scene.js video/harness-engineering/motion-v2/03/video.mp4
 * Uses the local engine copy, which adds general 'card', 'log', 'commit', 'ring' and 'edge' node types and a meta.veilTop option.
 */
FlowVideo.scene({
  meta: { title: '', subtitle: '', duration: 37, fps: 30, speed: 0.9, veilTop: 225 },
  build(s) {
    const T = s.THEME;
    const L = -0.35, Rt = 0.35;   // pans: revision A / run A on the left, revision B on the right

    // ---- compact title, freeing the stage ----
    s.node('title', 'label', { x: 540, y: 112, text: 'Execute + retain', size: 76, weight: 800, color: T.title });
    s.node('sub', 'label', { x: 540, y: 184, text: 'EVIDENCE BELONGS TO A REVISION', size: 28, weight: 700, color: T.mid });

    // ---- agent strip ----
    s.node('agent', 'card', { x: 540, y: 345, w: 920, h: 236, title: 'Agent', titleSize: 32, titleY: 42, titleColor: T.mid, lineY: [110, 182], lineSize: 44, tagSize: 32,
      color: T.mid, l0Text: '', l0Color: T.fg, l0TagColor: T.mid, l1Text: '', l1Alpha: 0, l1Color: T.bad });

    // ---- revision graph ----
    s.node('hist', 'edge', { x0: 110, x1: 300, y: 610, color: T.dim });
    s.node('edgeAB', 'edge', { x0: 300, x1: 780, y: 610, color: T.mid, extent: 0 });
    s.node('revA', 'commit', { x: 300, y: 610, labelSize: 48, label: 'a61c9e2', color: T.fg });
    s.node('revB', 'commit', { x: 780, y: 610, labelSize: 48, label: 'b84d102', color: T.fg, alpha: 0 });
    s.node('cur', 'ring', { x: 300, y: 610, label: 'current', labelSize: 34 });
    s.wire('attachA', [300, 718], [300, 786], { color: T.mid });

    // ---- run records ----
    const rows = [
      { dy: 60, size: 36, mono: false, text: 'Run #1', color: T.mid },
      { dy: 130, size: 42, text: 'rev a61c9e2', color: T.mid },
      { dy: 252, size: 52, text: '$ npm test' },
      { dy: 392, size: 50, text: '8 passed' },
      { dy: 477, size: 50, text: '1 failed', color: T.bad },
      { dy: 562, size: 50, text: 'export: FAIL', color: T.bad },
      { dy: 702, size: 62, weight: 800, text: 'exit 1', color: T.bad },
      { dy: 880, size: 38, mono: false, text: 'running', color: T.accent },
    ];
    s.node('recA', 'log', { x0: 80, y0: 790, x: 300, y: 910, w: 440, h: 240, rows, trackDy: 805, emptySize: 44, color: T.mid, dashed: 1, emptyAlpha: 1, emptyText: 'no run' });
    s.node('recB', 'log', { x0: 560, y0: 790, x: 780, y: 910, w: 440, h: 240, emptySize: 44, rows: [], color: T.mid, dashed: 1, emptyAlpha: 1, emptyText: 'no run', alpha: 0 });

    const say = (t, msg, tag, color = T.fg) => {
      s.set(t, 'agent', 'l0Text', msg, 0); s.set(t, 'agent', 'l0Reveal', 0, 0); s.set(t + 0.01, 'agent', 'l0Reveal', 1, 0.6, 'linear');
      s.set(t, 'agent', 'l0Color', color, 0); s.set(t, 'agent', 'l0Tag', tag, 0);
      s.pulse(t, 'agent', null, 0.5);
    };
    const row = (t, i, dur = 0.3) => s.set(t, 'recA', 'r' + i + 'Alpha', 1, dur);
    const toA = (endX) => [[780, 470], [780, 910], [endX, 910]];   // chips stop with their left edge at the slot

    // ---- beat 1: a claim fills nothing ----
    let t = 1.8;
    say(t, '"tests passed"', 'claim', T.mid);
    s.sfx(t, 'send', { note: 'G6', gain: 1.0 });
    s.packet({ route: toA(735), t: 2.6, dur: 1.2, kind: 'chip', size: 40, label: '"tests passed"', color: T.mid });
    t = 3.8;
    s.shake(t, 'recA', 8, 0.4); s.pulse(t, 'recA', null, 0.3);
    s.sfx(t, 'thump', { gain: 0.4, pan: L });

    // ---- beat 2: the command actually runs against a61c9e2 ----
    t = 6.0;
    say(t, 'run npm test', 'request');
    s.sfx(t, 'send', { note: 'G6', gain: 1.0 });
    s.packet({ route: toA(660), t: 6.8, dur: 1.2, kind: 'chip', size: 40, label: 'npm test', color: T.fg });
    t = 8.0;
    s.set(t, 'recA', 'dashed', 0, 0); s.set(t, 'recA', 'color', T.fg, 0.3); s.set(t, 'recA', 'glow', 0.5, 0.3);
    s.set(t, 'recA', 'emptyAlpha', 0, 0.25);
    s.set(t, 'recA', 'w', 920, 1.0); s.set(t, 'recA', 'h', 960, 1.0);
    s.sfx(t, 'arrive', { note: 'E5', pan: L });
    t = 9.2;
    row(t, 0); row(t, 1);
    s.pulse(t, 'revA', null, 0.6); s.set(t, 'wire:attachA', 'color', T.fg, 0.3);
    s.sfx(t, 'ack', { note: 'C6', gain: 1.3, pan: L });
    t = 10.4;
    row(t, 2, 0.01); s.set(t, 'recA', 'r2Reveal', 0, 0); s.set(t + 0.01, 'recA', 'r2Reveal', 1, 0.5, 'linear');
    s.set(t, 'recA', 'trackAlpha', 1, 0.3); s.set(t, 'recA', 'scan', 1, 0.3); row(t, 7);
    s.set(t, 'recA', 'glow', 0, 0.6);
    s.sfx(t, 'work', { note: 'E4', gain: 1.2, pan: L });
    row(12.2, 3); s.sfx(12.2, 'arrive', { note: 'E5', gain: 0.7, pan: L });
    row(13.4, 4); s.sfx(13.4, 'arrive', { note: 'C5', gain: 0.7, pan: L });
    row(14.6, 5); s.sfx(14.6, 'arrive', { note: 'C5', gain: 0.7, pan: L });
    t = 16.0;
    s.set(t, 'recA', 'scan', 0, 0.3); row(t, 6);
    s.set(t, 'recA', 'r7Text', 'exited', 0); s.set(t, 'recA', 'r7Color', T.mid, 0);
    s.sfx(t, 'miss', { gain: 6.0, pan: L });

    // ---- beat 3: the whole record is kept with a61c9e2 and returned to the agent ----
    t = 18.0;
    s.pulse(t, 'recA', null, 0.8); s.pulse(t, 'revA', null, 0.8);
    s.set(t, 'recA', 'r7Text', 'retained', 0); s.set(t, 'recA', 'r7Color', T.fg, 0);
    s.sfx(t, 'store', { note: 'C5', gain: 1.1, pan: L });
    s.packet({ route: [[780, 790], [780, 470]], t: 19.4, dur: 1.2, kind: 'chip', size: 36, label: 'export: FAIL · exit 1', color: T.bad });
    s.sfx(19.4, 'send', { note: 'E6', gain: 1.0, pan: Rt });
    t = 20.6;
    // the observation arrives intact (no typing): exit status, revision and the failing output line together
    s.set(t, 'agent', 'l0Text', 'exit 1 @ a61c9e2', 0); s.set(t, 'agent', 'l0Reveal', 1, 0); s.set(t, 'agent', 'l0Color', T.bad, 0);
    s.set(t, 'agent', 'l0Alpha', 0, 0); s.set(t + 0.01, 'agent', 'l0Alpha', 1, 0.3);
    s.set(t, 'agent', 'l1Text', 'export: FAIL', 0); s.set(t + 0.01, 'agent', 'l1Alpha', 1, 0.3);
    s.set(t, 'agent', 'l0Tag', 'observed · Run #1', 0);
    s.pulse(t, 'agent', null, 0.6);
    s.sfx(t, 'deliver', { note: 'G5', gain: 1.3 });

    // ---- beat 4: a new patch is a new revision; "current" moves, the record stays ----
    t = 22.6;
    s.set(t, 'recA', 'w', 440, 1.4); s.set(t, 'recA', 'color', T.mid, 1.0); s.set(t, 'recA', 'trackAlpha', 0, 0.6);
    s.sfx(24.0, 'store', { note: 'C5', gain: 0.6, pan: L });
    t = 25.0;
    s.set(t, 'agent', 'l1Alpha', 0, 0.3);
    say(t, 'patch -> b84d102', 'edit');
    s.sfx(t, 'send', { note: 'G6', gain: 1.0 });
    s.set(25.8, 'edgeAB', 'extent', 1, 0.8, 'out');
    s.set(26.6, 'revB', 'alpha', 1, 0.3); s.pulse(26.6, 'revB', null, 0.6);
    s.sfx(26.6, 'arrive', { note: 'D5', pan: Rt });
    s.set(27.8, 'cur', 'cx', 780, 0.9);
    s.set(27.8, 'revA', 'color', T.mid, 0.6);
    s.sfx(28.7, 'ack', { note: 'D6', gain: 1.3, pan: Rt });

    // ---- beat 5: the current revision has no run; the old record is still about a61c9e2 ----
    t = 29.8;
    s.set(t, 'recB', 'alpha', 1, 0.5); s.pulse(t, 'recB', null, 0.5);
    s.sfx(t, 'thump', { note: 'D4', gain: 0.35, pan: Rt });
    t = 31.4;
    s.set(t, 'recA', 'r7Text', 'for a61c9e2 only', 0);
    s.pulse(t, 'recA', null, 0.8);
    s.sfx(t, 'ack', { note: 'C6', gain: 1.1, pan: L });

    s.fade(35.0, 1, 1.0);
    s.meta.duration = 37;
  },
});
