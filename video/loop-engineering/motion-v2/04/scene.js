/* No tests is not a pass — loop-engineering motion-v2 cut 04.
 * One mechanism: a mistyped selector ("discunt") matches none of the 12 collected tests, so nothing runs.
 * "0 failed" next to "0 ran" is an empty result, not a pass. The empty selection is its own outcome class,
 * so this repair-only run stops product edits and keeps the command and selection output for an engineer.
 * Ends with the setup check pending: no corrected selector, rerun or patch is shown.
 * Render from the repository root (pinned puppeteer-core from root node_modules):
 *   node video/loop-engineering/motion-v2/04/engine/render.mjs video/loop-engineering/motion-v2/04/scene.js video/loop-engineering/motion-v2/04/video.mp4 --sheet video/loop-engineering/motion-v2/04/scratch/contact-sheet.png --wav video/loop-engineering/motion-v2/04/scratch/sfx.wav
 * Uses the local engine copy, which adds the general node types panel, pill and counter.
 */
FlowVideo.scene({
  meta: { title: 'Not a pass', subtitle: '', duration: 34, fps: 30, speed: 1 },
  build(s) {
    const T = s.THEME, DIM = '#5A5F68';

    // ---- stage ----
    s.node('exp', 'panel', { x: 540, y: 695, w: 900, h: 450, title: 'test selection', color: T.mid,
      rows: [{ y: 105, mono: true, size: 44 }, { y: 185, mono: true, size: 38 }, { y: 245, mono: true, size: 38 }, { y: 305, mono: true, size: 38 },
             { y: 365, mono: true, size: 38 }, { y: 225, x: 350, mono: true, size: 64 }, { y: 305, x: 410, size: 40 }],
      r0Text: '$ pytest -k discunt', r0Color: T.fg,
      r1Text: 'test_discount_basic', r1Color: T.mid, r1Alpha: 0, r2Text: 'test_discount_zero', r2Color: T.mid, r2Alpha: 0,
      r3Text: 'test_discount_limit', r3Color: T.mid, r3Alpha: 0, r4Text: '+ 9 more', r4Color: T.mid, r4Alpha: 0,
      r5Text: '0 selected', r5Color: T.accent, r5Alpha: 0, r6Text: 'no matches', r6Color: T.mid, r6Alpha: 0 });
    const CX = [180, 420, 660, 900], NAMES = ['collected', 'selected', 'ran', 'failed'];
    CX.forEach((x, i) => s.node('c' + i, 'counter', { x, y: 1030, w: 200, h: 150, name: NAMES[i] }));
    s.node('notpass', 'label', { x: 900, y: 1146, text: 'not a pass', size: 34, weight: 800, color: T.accent, alpha: 0 });
    s.node('out', 'panel', { x: 540, y: 1315, w: 900, h: 260, title: 'outcome → next', color: T.dim, titleColor: DIM,
      rows: [{ y: 105, mono: true, size: 36, w: 860 }, { y: 165, mono: true, size: 36, w: 860 }, { y: 225, mono: true, size: 36, w: 860 }],
      r0Text: 'assertion fail  → patch', r0Color: DIM, r1Text: 'collect error   → fix setup', r1Color: DIM,
      r2Text: '0 selected      → stop, engineer', r2Color: DIM });
    s.node('edits', 'panel', { x: 265, y: 1650, w: 350, h: 280, title: 'repair-only', color: T.mid,
      rows: [{ y: 130, size: 44 }, { y: 200, mono: true, size: 34 }], r0Text: 'edits allowed', r0Color: T.fg, r1Text: 'no patch made', r1Color: T.mid, r1Alpha: 0 });
    s.node('eng', 'panel', { x: 735, y: 1650, w: 510, h: 280, title: 'for engineer', color: T.dim, titleColor: DIM,
      rows: [{ y: 95, x: 520, mono: true, size: 34 }, { y: 145, x: 520, mono: true, size: 34 }, { y: 195, x: 520, mono: true, size: 34 }, { y: 250, x: 520, size: 38 }],
      r0Text: 'pytest -k discunt', r0Alpha: 0, r1Text: 'collected 12', r1Alpha: 0, r2Text: 'selected 0 · ran 0', r2Alpha: 0, r2Color: T.accent,
      r3Text: 'setup check pending', r3Color: T.accent, r3Alpha: 0 });

    [0, 1, 2].forEach((i) => s.wire('p' + i, [CX[i] + 102, 1030], [CX[i + 1] - 102, 1030]));
    s.wire('report', [420, 1109], [420, 1181]);
    s.wire('stop', [265, 1449], [265, 1506]);
    s.wire('keep', [735, 1449], [735, 1506]);

    s.sound('latch', { base: 'C4', gain: 0.5, layers: [
      { type: 'noise', lp: 4000, hp: 800, attack: 0.001, decay: 0.018, gain: 0.6 },
      { type: 'tone', wave: 'sine', ratio: 1, attack: 0.002, decay: 0.12, gain: 0.6, harmonics: [1, 0.3] }] });

    const pan = (a) => s.panOf(a);
    const lit = (t, w, on, c) => { s.set(t, 'wire:' + w, 'color', on ? (c || T.fg) : T.wire, 0.2); s.set(t, 'wire:' + w, 'flow', on ? 1 : 0, 0); };
    const cset = (t, i, num, col, sound) => {
      s.set(t, 'c' + i, 'num', num, 0); s.set(t, 'c' + i, 'numColor', col, 0.15); s.set(t, 'c' + i, 'color', col, 0.2);
      s.set(t, 'c' + i, 'nameColor', T.fg, 0.2);
      if (sound) s.sfx(t, sound[0], Object.assign({ pan: pan('c' + i) }, sound[1]));
    };

    // ---- beat 1: twelve tests exist; the selector is misspelled ----
    let t = 0.5;
    s.set(t, 'exp', 'color', T.fg, 0.2); s.set(t, 'exp', 'titleColor', T.fg, 0.2);
    s.sfx(t, 'arrive', { note: 'E5', gain: 0.8, pan: 0 });
    [1.1, 1.5, 1.9, 2.3].forEach((tr, i) => s.set(tr, 'exp', 'r' + (i + 1) + 'Alpha', 1, 0.3));
    for (let k = 1; k <= 12; k++) {
      const tk = 1.1 + (k - 1) * 0.12;
      s.set(tk, 'c0', 'num', String(k), 0);
      s.sfx(tk, 'ack', { note: 'E6', gain: 0.8, pan: pan('c0') });
    }
    s.set(1.1, 'c0', 'color', T.fg, 0.2); s.set(1.1, 'c0', 'numColor', T.fg, 0.2); s.set(1.1, 'c0', 'nameColor', T.fg, 0.2);
    // the names contain "discount"; the selector says "discunt"
    [3.4, 3.8, 4.2].forEach((tr, i) => {
      const r = 'r' + (i + 1);
      s.set(tr, 'exp', r + 'SpanA', 5, 0); s.set(tr, 'exp', r + 'SpanB', 13, 0); s.set(tr, 'exp', r + 'SpanColor', T.ok, 0);
      s.set(tr, 'exp', r + 'SpanK', 1, 0.25); s.set(tr, 'exp', r + 'Color', T.fg, 0.25);
      s.sfx(tr, 'ack', { note: 'C6', gain: 1.2, pan: -0.2 });
    });
    t = 5.0;
    s.set(t, 'exp', 'r0SpanA', 12, 0); s.set(t, 'exp', 'r0SpanB', 19, 0); s.set(t, 'exp', 'r0SpanColor', T.accent, 0); s.set(t, 'exp', 'r0SpanK', 1, 0.25);
    s.sfx(t, 'ack', { note: 'G5', gain: 1.6, pan: 0 });

    // ---- beat 1b: the selection runs and keeps nothing ----
    t = 7.8;
    for (let i = 1; i <= 4; i++) { s.set(t + (i - 1) * 0.18, 'exp', 'r' + i + 'Alpha', 0, 0.5); s.set(t, 'exp', 'r' + i + 'SpanK', 0, 0.4); }
    s.set(t, 'exp', 'r0SpanK', 0.6, 0.4);
    lit(t, 'p0', true, T.fg);
    s.sfx(t, 'send', { note: 'E6', gain: 1.0, pan: pan('c0') });
    t = 8.7;
    lit(t, 'p0', false);
    cset(t, 1, '0', T.accent, ['miss', { gain: 0.9 }]);
    s.shake(t, 'c1', 8, 0.35);
    s.set(t + 0.2, 'exp', 'r5Alpha', 1, 0.35); s.set(t + 0.6, 'exp', 'r6Alpha', 1, 0.35);

    // ---- beat 2: nothing runs; "0 failed" looks like a pass, but it is not one ----
    t = 11.6;
    lit(t, 'p1', true, T.accent); s.set(t + 0.4, 'wire:p1', 'flow', 0, 0); s.set(t + 0.4, 'wire:p1', 'color', T.wire, 0.2);
    cset(t + 0.4, 2, '0', T.accent, ['thump', { gain: 0.5 }]);
    t = 12.9;
    lit(t, 'p2', true, T.fg); s.set(t + 0.4, 'wire:p2', 'flow', 0, 0); s.set(t + 0.4, 'wire:p2', 'color', T.wire, 0.2);
    cset(t + 0.4, 3, '0', T.ok, ['hit', { gain: 0.9 }]);
    s.set(t + 0.4, 'c3', 'glow', 0.9, 0.2);
    t = 15.6;                                   // the zero next to it explains the zero
    s.set(t, 'c2', 'glow', 1, 0.15); s.set(t + 0.5, 'c2', 'glow', 0.3, 0.5);
    s.sfx(t, 'ack', { note: 'E5', gain: 1.6, pan: pan('c2') });
    t = 16.3;
    s.set(t, 'c3', 'glow', 0, 0.6); s.set(t, 'c3', 'numColor', T.mid, 0.6); s.set(t, 'c3', 'color', T.mid, 0.6);
    s.set(t + 0.4, 'notpass', 'alpha', 1, 0.3);
    s.sfx(t, 'poof', { gain: 0.6, pan: pan('c3') });
    s.set(18.0, 'c2', 'glow', 0, 0.5);

    // ---- beat 3: classify the observation: an empty selection is its own outcome ----
    t = 19.0;
    lit(t, 'report', true, T.accent);
    s.packet({ route: [[420, 1109], [420, 1181]], t, dur: 0.6, kind: 'dot', r: 13, color: T.accent });
    s.sfx(t, 'send', { note: 'E6', gain: 1.1, pan: pan('c1') });
    t = 19.6;
    lit(t, 'report', false);
    s.set(t, 'out', 'color', T.fg, 0.2); s.set(t, 'out', 'titleColor', T.fg, 0.2); s.set(t, 'out', 'glow', 0.5, 0.2); s.set(t + 0.5, 'out', 'glow', 0, 0.5);
    for (const r of ['r0', 'r1', 'r2']) s.set(t, 'out', r + 'Color', T.mid, 0.3);
    s.sfx(t, 'arrive', { note: 'G5', gain: 0.9, pan: 0 });
    [[20.4, 0], [21.0, 1]].forEach(([tr, i]) => {
      s.set(tr, 'out', 'r' + i + 'Color', T.fg, 0.12); s.set(tr + 0.3, 'out', 'r' + i + 'Color', DIM, 0.4);
      s.sfx(tr, 'ack', { note: 'G5', gain: 1.0, pan: 0 });
    });
    t = 21.7;
    s.set(t, 'out', 'r2Color', T.accent, 0.2); s.set(t, 'out', 'r2Hl', 1, 0.2); s.set(t, 'out', 'r2HlColor', T.accent, 0);
    s.set(t, 'out', 'color', T.accent, 0.3);
    s.sfx(t, 'thump', { gain: 1.1, pan: 0 });

    // ---- beat 4: this repair-only policy stops product edits ----
    t = 24.0;
    lit(t, 'stop', true, T.accent);
    s.packet({ route: [[265, 1449], [265, 1506]], t, dur: 0.5, kind: 'dot', r: 12, color: T.accent });
    s.sfx(t, 'send', { note: 'G6', gain: 1.0, pan: pan('edits') });
    t = 24.5;
    lit(t, 'stop', false);
    s.set(t, 'edits', 'r0Text', 'edits stopped', 0); s.set(t, 'edits', 'r0Color', T.accent, 0);
    s.set(t, 'edits', 'dashed', 1, 0); s.set(t, 'edits', 'color', T.accent, 0.2); s.set(t + 0.8, 'edits', 'color', T.mid, 0.6);
    s.shake(t, 'edits', 6, 0.3, 'y');
    s.sfx(t, 'latch', { pan: pan('edits') });
    s.set(t + 0.8, 'edits', 'r1Alpha', 1, 0.3);
    s.sfx(t + 0.8, 'deliver', { note: 'C5', gain: 0.6, pan: pan('edits') });

    // ---- beat 5: keep the command and selection output for an engineer ----
    t = 27.0;
    lit(t, 'keep', true, T.fg);
    s.packet({ route: [[735, 1449], [735, 1506]], t, dur: 0.5, kind: 'dot', r: 12, color: T.fg });
    s.sfx(t, 'send', { note: 'G6', gain: 1.0, pan: pan('eng') });
    t = 27.5;
    lit(t, 'keep', false);
    s.set(t, 'eng', 'color', T.fg, 0.2); s.set(t, 'eng', 'titleColor', T.fg, 0.2); s.set(t, 'eng', 'glow', 0.5, 0.2); s.set(t + 0.5, 'eng', 'glow', 0, 0.5);
    s.sfx(t, 'arrive', { note: 'A5', gain: 0.9, pan: pan('eng') });
    [28.0, 28.6, 29.2].forEach((tr, i) => { s.set(tr, 'eng', 'r' + i + 'Alpha', 1, 0.3); s.sfx(tr, 'store', { note: 'A5', gain: 0.9, pan: pan('eng') }); });
    t = 30.2;
    s.set(t, 'eng', 'r3Alpha', 1, 0.35);
    s.sfx(t, 'arrive', { note: 'C6', gain: 0.8, pan: pan('eng') });
    s.set(t + 0.6, 'eng', 'color', T.mid, 0.6);

    // ---- hold the stopped run and the kept evidence; then end ----
    const tEnd = 35.6;
    s.fade(tEnd, 1, 1.0);
    s.meta.duration = tEnd + 1.6;
  },
});

