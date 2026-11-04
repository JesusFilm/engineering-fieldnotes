/* Prepare a known workspace — motion-v2 cut 02.
 * One mechanism: before any edit, the harness pins a revision, loads the instructions, and runs a baseline.
 * An existing failure is recorded separately, as it was found. Nothing is fixed or certified.
 * Composition: one workspace sheet whose sections fill in with state; the only travelling element is the failure being copied aside.
 * Render from the repository root:
 *   node video/harness-engineering/motion-v2/02/engine/render.mjs video/harness-engineering/motion-v2/02/scene.js video/harness-engineering/motion-v2/02/video.mp4
 * Uses the local engine copy, which adds the general 'card', 'track' and 'rule' node types.
 */
FlowVideo.scene({
  meta: { title: 'Known workspace', subtitle: 'BEFORE THE FIRST EDIT', duration: 33.5, fps: 30, speed: 0.9 },
  build(s) {
    const T = s.THEME;
    const sec = (id, top, h, opts) => s.node(id, 'card', Object.assign({ x: 540, y: top + h / 2, w: 860, h, noStroke: true, titleSize: 30, valueX: 300 }, opts));

    // ---- stage: one sheet, four sections ----
    s.node('panel', 'card', { x: 540, y: 1120, w: 920, h: 1280, dashed: true, noFill: true, color: T.dim });
    sec('ws', 500, 240, { title: 'Workspace', titleSize: 32, titleColor: T.mid, lineY: [116, 186],
      l0Text: 'rev', l0Color: T.mid, l0Value: '?', l0ValueColor: T.mid,
      l1Text: 'changes', l1Color: T.mid, l1Value: '?', l1ValueColor: T.mid });
    s.node('rule1', 'rule', { x: 540, y: 760, w: 820 });
    sec('ins', 770, 230, { title: 'Instructions', titleColor: T.dim, lineY: [106, 172],
      l0Text: 'AGENTS.md', l0Alpha: 0, l0Slot: 1, l0TagColor: T.mid,
      l1Text: 'task.md', l1Alpha: 0, l1Slot: 1, l1TagColor: T.mid });
    s.node('rule2', 'rule', { x: 540, y: 1010, w: 820 });
    sec('base', 1020, 470, { title: 'Baseline', titleColor: T.dim, lineY: [110, 236, 306, 376, 446],
      l0Text: '$ npm test', l0Reveal: 0, l0Color: T.mid,
      l1Text: 'Parse', l1Alpha: 0, l1Slot: 1, l1Value: 'PASS', l1ValueColor: T.ok,
      l2Text: 'Access', l2Alpha: 0, l2Slot: 1, l2Value: 'PASS', l2ValueColor: T.ok,
      l3Text: 'Export', l3Alpha: 0, l3Slot: 1, l3Value: 'FAIL', l3ValueColor: T.bad,
      l4Text: 'exit 1', l4Alpha: 0, l4Color: T.bad, titleTagAlpha: 0 });
    s.node('run', 'track', { x: 540, y: 1180, w: 780, h: 12 });
    s.node('rule3', 'rule', { x: 540, y: 1520, w: 820 });
    sec('known', 1530, 200, { title: 'Known failures', titleColor: T.dim, lineY: [110],
      l0Text: 'Export', l0Alpha: 0, l0Slot: 1, l0Value: 'FAIL', l0ValueColor: T.bad, l0Tag: '', l0TagColor: T.fg });

    const flash = (t, id, i, color, hold = 0.7) => {
      if (color) s.set(t, id, 'l' + i + 'HlColor', color, 0);
      s.set(t, id, 'l' + i + 'Hl', 1, 0.15); s.set(t + hold, id, 'l' + i + 'Hl', 0, 0.4);
    };
    const fillRow = (t, id, i) => { s.set(t, id, 'l' + i + 'Alpha', 1, 0.25); s.set(t, id, 'l' + i + 'Slot', 0, 0.25); };

    // ---- beat 1: revision unknown -> known; no changes yet ----
    let t = 2.0;
    s.set(t, 'ws', 'l0Value', 'a61c9e2', 0); s.set(t, 'ws', 'l0ValueReveal', 0, 0); s.set(t + 0.01, 'ws', 'l0ValueReveal', 1, 0.5, 'linear');
    s.set(t, 'ws', 'l0ValueColor', T.fg, 0); s.set(t, 'ws', 'l0Color', T.fg, 0.3);
    flash(t, 'ws', 0, T.fg);
    s.sfx(t, 'arrive', { note: 'C5' });
    t = 3.6;
    s.set(t, 'ws', 'l1Value', '0', 0); s.set(t, 'ws', 'l1ValueColor', T.fg, 0); s.set(t, 'ws', 'l1Color', T.fg, 0.3);
    flash(t, 'ws', 1, T.fg);
    s.sfx(t, 'ack', { note: 'C6', gain: 1.3 });
    t = 5.0;   // the outline solidifies: the starting point is known
    s.set(t, 'panel', 'dashed', 0, 0); s.set(t, 'panel', 'color', T.mid, 0.4);
    s.pulse(t, 'panel', null, 0.6);
    s.sfx(t, 'store', { note: 'C4', gain: 1.0 });

    // ---- beat 2: instructions load, one file at a time ----
    t = 7.4;
    s.set(t, 'ins', 'titleColor', T.fg, 0.4);
    for (const [i, tl] of [[0, 7.4], [1, 9.6]]) {
      fillRow(tl, 'ins', i);
      s.set(tl, 'ins', 'l' + i + 'Reveal', 0, 0); s.set(tl + 0.01, 'ins', 'l' + i + 'Reveal', 1, 0.5, 'linear');
      flash(tl, 'ins', i, T.fg, 1.1);
      s.set(tl + 0.7, 'ins', 'l' + i + 'Tag', 'loaded', 0);
      s.sfx(tl + 0.7, 'arrive', { note: 'E5' });
    }

    // ---- beat 3: baseline runs before any edit; one existing failure ----
    t = 12.8;
    s.set(t, 'base', 'titleColor', T.fg, 0.4);
    s.set(t, 'base', 'l0Reveal', 1, 0.6, 'linear'); s.set(t, 'base', 'l0Color', T.fg, 0.3);
    s.sfx(t, 'send', { note: 'G6', gain: 1.0 });
    t = 14.0;
    s.set(t, 'run', 'scan', 1, 0.3); s.set(t, 'run', 'color', T.mid, 0.3);
    flash(t, 'ws', 1, T.accent, 1.0);           // changes is still 0 while the checks run
    s.sfx(t, 'work', { note: 'G4', gain: 1.1 });
    for (const [i, tr] of [[1, 15.6], [2, 17.0]]) {
      fillRow(tr, 'base', i); flash(tr, 'base', i, T.ok, 0.5);
      s.sfx(tr, 'ack', { note: 'G5', gain: 1.4 });
    }
    t = 18.4;
    fillRow(t, 'base', 3); s.set(t, 'base', 'l3HlColor', T.bad, 0); s.set(t, 'base', 'l3Hl', 1, 0.15);
    s.sfx(t, 'miss', { gain: 4.5 });
    t = 19.4;
    s.set(t, 'run', 'scan', 0, 0.3); s.set(t, 'run', 'color', T.dim, 0.4);
    s.set(t, 'base', 'l4Alpha', 1, 0.3);
    s.set(t + 0.6, 'base', 'l3Hl', 0, 0.5);
    s.sfx(t, 'arrive', { note: 'G4', gain: 0.5 });

    // ---- beat 4: the failure is recorded separately, and the original row stays red ----
    t = 21.8;
    s.set(t, 'known', 'titleColor', T.fg, 0.4);
    flash(t, 'base', 3, T.bad, 0.8);
    // the copy starts beside the source value and travels down the empty right-hand side, never over row text
    s.packet({ route: [[770, 1396], [770, 1640]], t, dur: 1.4, kind: 'chip', label: 'Export FAIL', color: T.bad });
    s.sfx(t, 'send', { note: 'E5', gain: 1.0 });
    t = 23.2;
    fillRow(t, 'known', 0); flash(t, 'known', 0, T.bad, 0.9);
    s.set(t + 0.2, 'known', 'l0Tag', 'before edits', 0);   // after the chip has faded at the tag position
    s.sfx(t, 'store', { note: 'E4', gain: 1.1 });

    // ---- beat 5: the baseline is saved against the revision ----
    t = 26.0;
    s.set(t, 'base', 'titleTag', 'saved @ a61c9e2', 0); s.set(t, 'base', 'titleTagAlpha', 1, 0.4);
    flash(t, 'ws', 0, T.fg, 1.0);
    s.pulse(t, 'panel', null, 0.8);
    s.sfx(t, 'arrive', { note: 'C5', gain: 1.1 });

    // ---- hold the recorded starting state, then end ----
    s.fade(31.5, 1, 1.0);
    s.meta.duration = 33.5;
  },
});
