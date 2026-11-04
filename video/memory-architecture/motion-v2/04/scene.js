/* Check applicability — memory-architecture motion-v2 cut 04.
 * One mechanism: retrieval returns a relevant saved note (npm test @ r1); the application compares its revision with
 * the checkout (r2), withholds the note for this task, reads the current instructions, and supplies pnpm test from r2.
 * The saved note is not changed. Render from the repository root:
 *   node video/memory-architecture/motion-v2/04/engine/render.mjs video/memory-architecture/motion-v2/04/scene.js video/memory-architecture/motion-v2/04/video.mp4 --sheet video/memory-architecture/motion-v2/04/scratch/contact-sheet.png
 * Uses the local engine copy (cut 03 helpers: panel, chip with marks, kv valueX, row tags, title options).
 */
FlowVideo.scene({
  meta: { title: 'Memory', subtitle: 'CHECK APPLICABILITY', subtitleSize: 40, subtitleSpacing: 4, subtitleY: 410, duration: 46, fps: 30, speed: 1 },
  build(s) {
    const T = s.THEME;
    const L = 300, R = 780;

    // ---- stage ----
    s.node('task', 'panel', { x: 540, y: 532, w: 900, h: 96, title: 'task', titleY: 48, status: 'test billing', statusColor: T.fg, alpha: 0, color: T.mid });
    const pane = (id, x, title, color, cmd, cmdColor, slot) => s.node(id, 'panel', { x, y: 890, w: 420, h: 560, title, titleColor: T.fg, alpha: 0, color,
      rowY: [150, 430], rowH: 62, capSize: 36, valueSize: 42,
      r0Cap: 'source', r0Text: 'AGENTS.md', r0Color: T.fg,
      r1Cap: 'test_cmd', r1Text: cmd, r1Color: cmdColor, r1Slot: slot });
    pane('note', L, 'saved note', T.info, 'npm test', T.fg, 0);
    pane('co', R, 'checkout', T.fg, 'not read', T.mid, 1);
    s.set(0, 'note', 'r1HlColor', T.accent, 0); s.set(0, 'co', 'r1HlColor', T.info, 0); s.set(0, 'co', 'r0HlColor', T.info, 0);
    s.node('bL', 'chip', { x: L, y: 900, text: 'r1', size: 60, padX: 30, h: 92, color: T.info, alpha: 0 });
    s.node('bR', 'chip', { x: R, y: 900, text: 'r2', size: 60, padX: 30, h: 92, color: T.fg, alpha: 0 });
    s.node('neq', 'label', { x: 540, y: 900, text: '≠', size: 72, weight: 700, color: T.accent, alpha: 0 });
    s.node('fL', 'label', { x: L, y: 1125, text: 'candidate', size: 40, weight: 700, color: T.accent, alpha: 0 });
    s.node('fR', 'label', { x: R, y: 1125, text: 'source not read', size: 40, weight: 600, color: T.mid, alpha: 0 });
    s.node('app', 'panel', { x: 540, y: 1272, w: 900, h: 130, title: 'application check', titleColor: T.accent, alpha: 0, color: T.accent,
      rowY: [90], rowH: 56, valueSize: 44, r0Text: 'compare revisions', r0Color: T.accent });
    s.node('inp', 'panel', { x: 540, y: 1505, w: 900, h: 230, title: 'next input', titleColor: T.fg, status: 'preparing', statusColor: T.accent,
      layout: 'kv', valueX: 300, alpha: 0, color: T.accent, rowY: [108, 172], rowH: 56, capSize: 36, valueSize: 40,
      r0Cap: 'test_cmd', r0Text: '—', r0Color: T.mid, r0Slot: 1, r1Cap: 'source', r1Text: '—', r1Color: T.mid, r1Slot: 1, r1HlColor: T.fg });
    s.node('model', 'box', { x: 540, y: 1722, w: 300, h: 90, label: 'model', labelSize: 40, alpha: 0, color: T.mid });
    s.wire('feed', [540, 1624], [540, 1674]); s.set(0, 'wire:feed', 'alpha', 0, 0);
    // the current command is copied along the right margin, outside every panel, into the input's test_cmd field
    s.wire('copy', [994, 1040], [994, 1498], { via: [[1030, 1040], [1030, 1498]] }); s.set(0, 'wire:copy', 'alpha', 0, 0);

    const pan = (x) => ((x - 540) / 540) * 0.6;

    // ---- beat 1: a saved note says npm test at r1; the checkout is at r2 ----
    s.set(0.4, 'task', 'alpha', 1, 0.4); s.sfx(0.4, 'ack', { note: 'E5', gain: 1.0, pan: 0 });
    s.set(1.2, 'co', 'alpha', 1, 0.5); s.set(1.2, 'bR', 'alpha', 1, 0.5); s.set(1.2, 'fR', 'alpha', 1, 0.5);
    s.sfx(1.2, 'ack', { note: 'B4', gain: 1.2, pan: pan(R) });
    s.set(2.0, 'inp', 'alpha', 1, 0.5); s.set(2.0, 'model', 'alpha', 1, 0.5); s.set(2.0, 'wire:feed', 'alpha', 1, 0.5);
    s.sfx(2.0, 'ack', { note: 'C5', gain: 0.9, pan: 0 });
    s.sfx(3.0, 'send', { note: 'E6', gain: 1.0, pan: pan(L) });            // the application retrieves from memory
    s.set(3.6, 'note', 'alpha', 1, 0.5); s.set(3.6, 'bL', 'alpha', 1, 0.5); s.set(3.6, 'fL', 'alpha', 1, 0.5);
    s.sfx(3.6, 'arrive', { note: 'G4', gain: 1.0, pan: pan(L) });
    s.set(4.6, 'note', 'r1Hl', 1, 0.2); s.set(4.6, 'note', 'r1HlColor', T.info, 0); s.sfx(4.6, 'ack', { note: 'G5', gain: 1.1, pan: pan(L) });
    s.set(5.6, 'note', 'r1Hl', 0, 0.5);
    // hold 5.6 – 9.0: a relevant note and a newer checkout; the input is empty

    // ---- beat 2: compare the note's revision with the checkout ----
    let t = 9.0;
    s.set(t, 'app', 'alpha', 1, 0.4); s.sfx(t, 'ack', { note: 'E5', gain: 1.2, pan: 0 });
    t = 10.2; s.set(t, 'bL', 'color', T.accent, 0.2); s.pulse(t, 'bL'); s.sfx(t, 'ack', { note: 'G4', gain: 1.2, pan: pan(L) });
    t = 11.2; s.set(t, 'bR', 'color', T.accent, 0.2); s.pulse(t, 'bR'); s.sfx(t, 'ack', { note: 'B4', gain: 1.2, pan: pan(R) });
    t = 12.2; s.set(t, 'neq', 'alpha', 1, 0.3); s.set(t, 'neq', 'scale', 1.25, 0); s.set(t, 'neq', 'scale', 1, 0.4, 'back');
    s.sfx(t, 'ack', { note: 'E4', gain: 1.3, pan: 0 });
    t = 13.2;   // withheld for this task (the note itself is unchanged)
    s.set(t, 'fL', 'text', 'withheld', 0); s.set(t, 'note', 'color', T.accent, 0.3); s.set(t, 'note', 'r1Color', T.mid, 0.4);
    s.sfx(t, 'thump', { note: 'E3', gain: 0.6, pan: pan(L) });
    t = 14.2; s.set(t, 'app', 'r0Text', 're-read source', 0); s.sfx(t, 'ack', { note: 'E5', gain: 1.1, pan: 0 });
    // hold 14.2 – 18.0: mismatch, withheld, input still empty

    // ---- beat 3: read the current repository instructions ----
    t = 18.0;
    s.set(t, 'co', 'r0Hl', 1, 0.2); s.set(t, 'fR', 'text', 'reading…', 0); s.set(t, 'fR', 'color', T.info, 0);
    s.sfx(t, 'send', { note: 'E6', gain: 1.1, pan: pan(R) });
    t = 19.0;
    s.set(t, 'co', 'r1Slot', 0, 0.3); s.set(t, 'co', 'r1Text', 'pnpm test', 0); s.set(t, 'co', 'r1Color', T.fg, 0);
    s.set(t, 'co', 'r1Reveal', 0, 0); s.set(t + 0.01, 'co', 'r1Reveal', 1, 0.6, 'linear');
    s.sfx(t + 0.6, 'arrive', { note: 'B4', gain: 1.0, pan: pan(R) });
    s.set(t + 0.6, 'co', 'r0Hl', 0, 0.4);
    t = 20.4; s.set(t, 'fR', 'text', 'current source', 0); s.set(t, 'fR', 'color', T.fg, 0); s.set(t, 'co', 'color', T.info, 0.3);
    s.set(t, 'bR', 'color', T.info, 0.3);
    s.sfx(t, 'ack', { note: 'B5', gain: 1.0, pan: pan(R) });
    t = 21.6; s.set(t, 'note', 'r1Hl', 1, 0.2); s.set(t, 'note', 'r1HlColor', T.accent, 0); s.sfx(t, 'ack', { note: 'G4', gain: 1.1, pan: pan(L) });
    s.set(t + 0.8, 'note', 'r1Hl', 0, 0.4);
    t = 22.6; s.set(t, 'co', 'r1Hl', 1, 0.2); s.sfx(t, 'ack', { note: 'B5', gain: 1.1, pan: pan(R) });
    s.set(t + 0.8, 'co', 'r1Hl', 0, 0.4);
    t = 24.0; s.set(t, 'app', 'r0Text', 'use current source', 0); s.sfx(t, 'ack', { note: 'E5', gain: 1.2, pan: 0 });
    // hold 24.0 – 28.0

    // ---- beat 4: supply pnpm test from r2 ----
    t = 28.0;   // copy the value read from the current source
    s.set(t, 'co', 'r1Hl', 1, 0.2); s.pulse(t, 'co');
    s.set(t, 'wire:copy', 'alpha', 1, 0.2); s.set(t, 'wire:copy', 'color', T.info, 0);
    s.packet({ route: [[996, 1040], [1030, 1040], [1030, 1498], [996, 1498]], t: t + 0.4, dur: 2.0, kind: 'dot', color: T.info });
    s.sfx(t, 'send', { note: 'E6', gain: 1.0, pan: pan(R) });
    s.set(t + 1.6, 'co', 'r1Hl', 0, 0.5);
    t = 30.6;
    s.set(t, 'inp', 'r0Text', 'pnpm test', 0); s.set(t, 'inp', 'r0Color', T.fg, 0); s.set(t, 'inp', 'r0Slot', 0, 0.3);
    s.set(t, 'wire:copy', 'alpha', 0, 0.5); s.set(t, 'inp', 'r0Hl', 1, 0.2); s.set(t, 'inp', 'r0HlColor', T.info, 0); s.set(t + 1.0, 'inp', 'r0Hl', 0, 0.5);
    s.sfx(t, 'arrive', { note: 'E5', gain: 1.0, pan: 0 });
    t = 31.4;
    s.set(t, 'inp', 'r1Text', 'AGENTS.md @ r2', 0); s.set(t, 'inp', 'r1Color', T.info, 0); s.set(t, 'inp', 'r1Slot', 0, 0.3);
    s.sfx(t, 'ack', { note: 'B4', gain: 1.1, pan: 0 });
    // still preparing until 33.6
    t = 33.6;
    s.set(t, 'inp', 'status', 'supplied', 0); s.set(t, 'inp', 'statusColor', T.ok, 0); s.set(t, 'inp', 'color', T.ok, 0.2); s.pulse(t, 'inp');
    s.set(t, 'wire:feed', 'color', T.ok, 0.2);
    s.packet({ route: [[540, 1626], [540, 1672]], t, dur: 0.5, kind: 'dot', color: T.ok });
    s.sfx(t, 'send', { note: 'C6', gain: 1.1, pan: 0 });
    s.set(t + 0.5, 'model', 'color', T.ok, 0.15); s.pulse(t + 0.5, 'model');
    s.sfx(t + 0.5, 'deliver', { note: 'C5', gain: 1.2, pan: 0 });
    s.set(t + 1.0, 'wire:feed', 'color', T.dim, 0.5);
    s.set(34.6, 'app', 'alpha', 0.45, 0.6);
    // hold 34.6 – 36.6
    t = 36.6;   // the supplied revision matches the checkout
    s.set(t, 'inp', 'r1Hl', 1, 0.2); s.pulse(t, 'bR'); s.sfx(t, 'ack', { note: 'B4', gain: 1.3, pan: 0 });
    s.set(t + 1.0, 'inp', 'r1Hl', 0, 0.5);
    t = 38.0;   // the saved r1 note remains withheld and unchanged
    s.pulse(t, 'note'); s.set(t, 'fL', 'scale', 1.15, 0); s.set(t, 'fL', 'scale', 1, 0.4);
    s.sfx(t, 'ack', { note: 'G4', gain: 1.1, pan: pan(L) });
    // final hold 38.4 – 43.4
    s.fade(43.4, 1, 1.0);
    s.meta.duration = 45.0;
  },
});

