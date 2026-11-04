/* Use a specific failure — loop-engineering motion-v2 cut 02.
 * One mechanism: twelve selected tests actually run on code A and one fails. Its input, expected and actual
 * values point at one line of code; the agent changes that line, which makes code B. The old result stays true
 * for code A but says nothing about code B, so the same tests must start again on code B for a fresh observation.
 * Illustrative values: discount(120, 0.25) should be 90.00; the bug "total - rate" gives 119.75 (= 120 - 0.25).
 * Render from the repository root (pinned puppeteer-core from root node_modules):
 *   node video/loop-engineering/motion-v2/02/engine/render.mjs video/loop-engineering/motion-v2/02/scene.js video/loop-engineering/motion-v2/02/video.mp4 --sheet video/loop-engineering/motion-v2/02/scratch/contact-sheet.png --wav video/loop-engineering/motion-v2/02/scratch/sfx.wav
 * Uses the local engine copy, which adds the general node types panel, pill and tgrid.
 */
FlowVideo.scene({
  meta: { title: 'Specific failure', subtitle: '', duration: 36, fps: 30, speed: 1 },
  build(s) {
    const T = s.THEME, DIM = '#5A5F68';
    const FAIL = 10;               // the failing test: row 3, column 3

    // ---- stage ----
    s.node('runner', 'panel', { x: 540, y: 735, w: 900, h: 470, title: 'tests · code A', color: T.mid,
      rows: [{ y: 415, mono: true, size: 44 }], r0Text: '12 selected', r0Color: T.mid });
    s.node('grid', 'tgrid', { x: 540, y: 722, cols: 4, rows: 3, cw: 180, ch: 76, gap: 18 });
    s.node('card', 'panel', { x: 540, y: 1175, w: 900, h: 330, title: 'failing test', color: T.dim, titleColor: DIM,
      rows: [{ y: 115, mono: true }, { y: 190, mono: true }, { y: 265, mono: true, w: 400, tagX: 950 }, { y: 265, x: 580, mono: true, w: 370 }],
      r0Text: 'input    120, 0.25', r0Alpha: 0, r1Text: 'expected 90.00', r1Alpha: 0,
      r2Text: 'actual   119.75', r2Color: T.bad, r2Alpha: 0, r3Text: 'code B   —', r3Color: T.accent, r3Alpha: 0 });
    s.node('agent', 'pill', { x: 540, y: 1390, w: 190, h: 64, text: 'agent' });
    s.node('code', 'panel', { x: 540, y: 1600, w: 900, h: 320, title: 'discount.py', titleMono: true, color: T.mid,
      rows: [{ y: 120, mono: true }, { y: 205, mono: true }],
      r0Text: 'def discount(total, rate):', r0Color: T.mid, r1Text: '    return total - rate', r1Color: T.fg });
    s.node('ver', 'pill', { x: 850, y: 1486, w: 190, h: 58, size: 36, text: 'code A', offText: T.fg, offColor: T.mid });

    const cell = (i) => 'grid.cell' + i;
    const cpt = (i) => s.pt(cell(i));
    s.wire('sel', [636, 862], [636, 1004]);
    s.wire('read', [540, 1346], [540, 1356]);
    s.wire('edit', [540, 1424], [540, 1434]);
    s.wire('rerun', [996, 1645], [994, 735], { via: [[1036, 1645], [1036, 735]] });

    const pan = (a) => s.panOf(a);
    const lit = (t, w, on, c) => { s.set(t, 'wire:' + w, 'color', on ? (c || T.fg) : T.wire, 0.2); s.set(t, 'wire:' + w, 'flow', on ? 1 : 0, 0); };
    const NOTES = ['E6', 'G6', 'B6', 'E7'];

    // ---- beat 1: twelve selected tests actually run on code A; one fails ----
    let t = 0.8;
    s.set(t, 'runner', 'color', T.fg, 0.2); s.set(t, 'runner', 'glow', 0.5, 0.2); s.set(t + 0.5, 'runner', 'glow', 0, 0.5);
    s.set(t, 'runner', 'titleColor', T.fg, 0.2);
    s.set(t, 'ver', 'lit', 0, 0);
    s.sfx(t, 'arrive', { note: 'E5', gain: 0.8, pan: pan('runner') });
    for (let i = 0; i < 12; i++) {
      const ti = 1.4 + i * 0.3, fail = i === FAIL;
      s.set(ti, 'grid', 'c' + i + 'Run', 1, 0.05); s.set(ti + 0.22, 'grid', 'c' + i + 'Run', 0, 0.1);
      s.set(ti + 0.22, 'grid', 'c' + i + 'Mark', fail ? 'x' : 'check', 0); s.set(ti + 0.22, 'grid', 'c' + i + 'K', 1, 0.35, 'linear');
      if (fail) { s.sfx(ti + 0.22, 'thump', { gain: 0.8, pan: pan(cell(i)) }); s.shake(ti + 0.22, 'grid', 8, 0.35); }
      else s.sfx(ti + 0.22, 'ack', { note: NOTES[i % 4], gain: 0.9, pan: pan(cell(i)) });
    }
    t = 5.3;                         // summary: what actually ran
    s.set(t, 'runner', 'r0Text', '12 ran · 1 failed', 0); s.set(t, 'runner', 'r0Color', T.bad, 0);
    s.set(t, 'runner', 'r0Hl', 1, 0.2); s.set(t + 0.9, 'runner', 'r0Hl', 0, 0.5);
    s.sfx(t, 'arrive', { note: 'E5', gain: 0.9, pan: pan('runner') });

    // ---- beat 2: the failing test's own values go to the card, then to the agent ----
    t = 8.0;
    s.set(t, 'grid', 'c' + FAIL + 'Hl', 1, 0.25);
    lit(t, 'sel', true, T.bad);
    s.packet({ route: [[636, 862], [636, 1004]], t, dur: 0.8, kind: 'dot', r: 14, color: T.bad });
    s.sfx(t, 'send', { note: 'E6', gain: 1.1, pan: pan([636, 0]) });
    t = 8.8;
    lit(t, 'sel', false);
    s.set(t, 'card', 'color', T.fg, 0.2); s.set(t, 'card', 'titleColor', T.fg, 0.2); s.set(t, 'card', 'glow', 0.5, 0.2); s.set(t + 0.5, 'card', 'glow', 0, 0.5);
    s.set(t, 'card', 'r0Alpha', 1, 0.3);
    s.sfx(t, 'arrive', { note: 'G5', gain: 0.9, pan: pan('card') });
    s.set(9.7, 'card', 'r1Alpha', 1, 0.3); s.sfx(9.7, 'ack', { note: 'G5', gain: 1.6, pan: pan('card') });
    s.set(10.6, 'card', 'r2Alpha', 1, 0.3); s.sfx(10.6, 'arrive', { note: 'D5', gain: 0.8, pan: pan('card') });
    s.set(11.4, 'runner', 'color', T.mid, 0.5); s.set(11.4, 'runner', 'titleColor', T.mid, 0.5);
    // the clue: the actual value is the price minus the rate
    t = 13.2;
    s.set(t, 'card', 'r0SpanA', 14, 0); s.set(t, 'card', 'r0SpanB', 18, 0); s.set(t, 'card', 'r0SpanColor', T.accent, 0); s.set(t, 'card', 'r0SpanK', 1, 0.25);
    s.set(t, 'card', 'r2SpanA', 9, 0); s.set(t, 'card', 'r2SpanB', 15, 0); s.set(t, 'card', 'r2SpanColor', T.bad, 0); s.set(t, 'card', 'r2SpanK', 1, 0.25);
    s.sfx(t, 'ack', { note: 'G5', gain: 1.4, pan: pan('card') });
    s.set(t + 0.7, 'card', 'r2Tag', '= 120 − 0.25', 0); s.set(t + 0.7, 'card', 'r2TagColor', T.accent, 0);
    s.sfx(t + 0.7, 'ack', { note: 'D6', gain: 1.4, pan: 0.4 });
    t = 16.2;                        // the card goes to the agent
    lit(t, 'read', true, T.accent);
    s.packet({ route: [[540, 1342], [540, 1360]], t, dur: 0.45, kind: 'dot', r: 12, color: T.accent });
    s.sfx(t, 'send', { note: 'G6', gain: 1.1, pan: 0 });
    t = 16.65;
    lit(t, 'read', false);
    s.set(t, 'agent', 'lit', 1, 0.25); s.set(t, 'agent', 'glow', 0.8, 0.15); s.set(t + 0.3, 'agent', 'glow', 0, 0.5);
    s.sfx(t, 'arrive', { note: 'C5', gain: 0.9, pan: 0 });

    // ---- beat 3: one targeted change to the calculation; the card's values stay as they are ----
    t = 18.0;
    lit(t, 'edit', true, T.accent);
    s.packet({ route: [[540, 1420], [540, 1438]], t, dur: 0.45, kind: 'dot', r: 12, color: T.accent });
    s.sfx(t, 'send', { note: 'C6', gain: 1.1, pan: 0 });
    t = 18.45;
    lit(t, 'edit', false);
    s.set(t, 'code', 'color', T.fg, 0.2); s.set(t, 'code', 'glow', 0.5, 0.2); s.set(t + 0.5, 'code', 'glow', 0, 0.5);
    s.set(t, 'code', 'r1SpanA', 17, 0); s.set(t, 'code', 'r1SpanB', 23, 0); s.set(t, 'code', 'r1SpanColor', T.bad, 0); s.set(t, 'code', 'r1SpanK', 1, 0.25);
    s.sfx(t, 'arrive', { note: 'A5', gain: 0.9, pan: pan('code') });
    t = 20.6;                        // the edit lands
    s.set(t, 'code', 'r1SpanK', 0, 0.15);
    s.set(t, 'code', 'r1Alpha', 0, 0.15);
    s.set(t + 0.15, 'code', 'r1Text', '    return total * (1 - rate)', 0); s.set(t + 0.15, 'code', 'r1Color', T.accent, 0);
    s.set(t + 0.15, 'code', 'r1Alpha', 1, 0.25);
    s.set(t + 0.15, 'code', 'r1SpanA', 17, 0); s.set(t + 0.15, 'code', 'r1SpanB', 29, 0); s.set(t + 0.15, 'code', 'r1SpanColor', T.accent, 0);
    s.set(t + 0.15, 'code', 'r1SpanK', 1, 0.25);
    s.sfx(t + 0.1, 'store', { note: 'A5', gain: 1.2, pan: pan('code') });
    s.set(t + 0.6, 'ver', 'text', 'code B', 0); s.set(t + 0.6, 'ver', 'lit', 1, 0.25);
    s.set(t + 0.6, 'ver', 'scale', 1.1, 0.12); s.set(t + 0.72, 'ver', 'scale', 1, 0.25);
    s.sfx(t + 0.6, 'ack', { note: 'A6', gain: 1.4, pan: pan('ver') });
    s.set(t + 0.6, 'agent', 'lit', 0, 0.6);
    s.set(22.4, 'code', 'r1SpanK', 0, 0.6); s.set(22.4, 'code', 'r1Color', T.fg, 0.6); s.set(22.4, 'code', 'color', T.mid, 0.6);

    // ---- beat 3b: the evidence is now old: true for code A, nothing yet for code B ----
    t = 23.2;
    s.set(t, 'grid', 'markAlpha', 0.3, 0.6); s.set(t, 'grid', 'c' + FAIL + 'Hl', 0, 0.5);
    s.set(t, 'runner', 'dashed', 1, 0); s.set(t, 'runner', 'r0Color', T.mid, 0.6);
    s.set(t, 'runner', 'titleColor', T.accent, 0.3);
    s.sfx(t, 'poof', { gain: 0.6, pan: pan('runner') });
    t = 24.4;                        // the card separates the old result from the missing new one
    s.set(t, 'card', 'r0SpanK', 0, 0.3); s.set(t, 'card', 'r2SpanK', 0, 0.3); s.set(t, 'card', 'r2Tag', '', 0);
    s.set(t, 'card', 'r2Alpha', 0, 0.2);
    s.set(t + 0.2, 'card', 'r2Text', 'code A   119.75', 0); s.set(t + 0.2, 'card', 'r2Color', T.mid, 0);
    s.set(t + 0.2, 'card', 'r2Alpha', 1, 0.3); s.set(t + 0.2, 'card', 'r2Hl', 1, 0.3); s.set(t + 0.2, 'card', 'r2HlDash', 1, 0); s.set(t + 0.2, 'card', 'r2HlColor', T.mid, 0);
    s.sfx(t + 0.2, 'store', { note: 'G5', gain: 1.0, pan: pan([300, 0]) });
    s.set(t + 1.0, 'card', 'r3Alpha', 1, 0.3); s.set(t + 1.0, 'card', 'r3Hl', 1, 0.3); s.set(t + 1.0, 'card', 'r3HlColor', T.accent, 0);
    s.sfx(t + 1.0, 'ack', { note: 'G5', gain: 1.4, pan: pan([760, 0]) });

    // ---- beat 4: the changed code goes back to the same twelve tests ----
    t = 29.0;
    lit(t, 'rerun', true, T.accent);
    s.set(t, 'code', 'color', T.fg, 0.2); s.set(t + 0.4, 'code', 'color', T.mid, 0.5);
    s.packet({ route: [[996, 1645], [1036, 1645], [1036, 735], [994, 735]], t, dur: 1.4, kind: 'dot', r: 14, color: T.accent });
    s.sfx(t, 'send', { note: 'A6', gain: 1.1, pan: 0.6 });
    t = 30.4;
    lit(t, 'rerun', false);
    s.set(t, 'runner', 'title', 'tests · code B', 0); s.set(t, 'runner', 'titleColor', T.accent, 0);
    s.set(t, 'runner', 'dashed', 0, 0); s.set(t, 'runner', 'color', T.fg, 0.2); s.set(t, 'runner', 'glow', 0.5, 0.2); s.set(t + 0.5, 'runner', 'glow', 0, 0.5);
    // code A's marks clear while the code travels, so no old result ever sits under the code B label
    for (let i = 0; i < 12; i++) { s.set(t - 0.6, 'grid', 'c' + i + 'K', 0, 0.35); s.set(t - 0.2, 'grid', 'c' + i + 'Mark', '', 0); }
    s.set(t - 0.2, 'grid', 'markAlpha', 1, 0);
    s.sfx(t - 0.6, 'poof', { gain: 0.45, pan: pan('runner') });
    s.set(t, 'runner', 'r0Text', 'running · 0 of 12', 0); s.set(t, 'runner', 'r0Color', T.accent, 0);
    s.sfx(t, 'arrive', { note: 'E5', gain: 0.9, pan: pan('runner') });
    t = 31.0;
    s.set(t, 'grid', 'c0Run', 1, 0.3);
    for (let k = t + 0.3; k < 34.6; k += 0.6) s.sfx(k, 'work', { note: 'E4', gain: 0.8, pan: pan(cell(0)) });

    // ---- hold: the new result is still pending; then end ----
    const tEnd = 35.4;
    s.fade(tEnd, 1, 1.0);
    s.meta.duration = tEnd + 1.6;
  },
});

