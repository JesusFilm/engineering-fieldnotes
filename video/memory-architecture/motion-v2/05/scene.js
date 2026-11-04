/* Correct outdated memory — memory-architecture motion-v2 cut 05.
 * One mechanism: the authoritative command changes at r2; the owner marks the r1 record superseded (kept, r1 explicit),
 * stores a separate r2 record linked as its replacement, and a later session reads the matching r2 version
 * and still checks it against its own checkout. Render from the repository root:
 *   node video/memory-architecture/motion-v2/05/engine/render.mjs video/memory-architecture/motion-v2/05/scene.js video/memory-architecture/motion-v2/05/video.mp4 --sheet video/memory-architecture/motion-v2/05/scratch/contact-sheet.png
 * Uses the local engine copy (cut 03/04 helpers: panel, chip, kv valueX, row tags, title options).
 */
FlowVideo.scene({
  meta: { title: 'Memory', subtitle: 'CORRECT OUTDATED MEMORY', subtitleSize: 40, subtitleSpacing: 4, subtitleY: 410, duration: 42, fps: 30, speed: 1 },
  build(s) {
    const T = s.THEME;
    const MX = 1024;   // right-margin path for writes and reads

    // ---- stage ----
    s.node('src', 'panel', { x: 540, y: 550, w: 900, h: 160, title: 'billing / AGENTS.md', titleColor: T.info, status: 'r1', statusColor: T.info, statusSize: 46,
      alpha: 0, color: T.info, rowY: [108], rowH: 60, valueSize: 46, r0Text: 'Test: npm test', r0HlColor: T.info });
    s.node('mem', 'panel', { x: 540, y: 995, w: 900, h: 610, title: 'memory · billing / test_cmd', titleColor: T.fg, noFill: true, alpha: 0, color: T.mid });
    const card = (id, y, rev, value, color) => s.node(id, 'panel', { x: 575, y, w: 790, h: 200, title: rev, titleSize: 48, titleY: 48, titleColor: T.info,
      status: 'active', statusColor: T.ok, statusSize: 40, layout: 'kv', valueX: 200, alpha: 0, color,
      rowY: [104, 158], rowH: 50, capSize: 36, valueSize: 40,
      r0Cap: 'value', r0Text: value, r1Cap: 'source', r1Text: 'AGENTS.md @ ' + rev, r1Color: T.info, r0HlColor: T.fg, r1HlColor: T.info });
    card('c1', 890, 'r1', 'npm test', T.ok);
    card('c2', 1165, 'r2', 'pnpm test', T.ok);
    s.wire('link', [176, 890], [176, 1165], { via: [[140, 890], [140, 1165]] }); s.set(0, 'wire:link', 'alpha', 0, 0);
    s.node('linkLab', 'label', { x: 335, y: 1028, text: 'replaced by ↓', size: 38, weight: 700, color: T.accent, alpha: 0 });
    s.node('own', 'panel', { x: 540, y: 1400, w: 900, h: 130, title: 'owner · billing', titleY: 44, titleColor: T.accent, alpha: 0, color: T.accent,
      rowY: [96], rowH: 50, valueSize: 40, r0Text: 'supersede r1', r0Color: T.accent });
    s.node('ses', 'panel', { x: 540, y: 1608, w: 900, h: 220, title: 'later session', titleColor: T.fg, status: 'reading', statusColor: T.accent, layout: 'kv', valueX: 260,
      alpha: 0, color: T.mid, rowY: [104, 164], rowH: 52, capSize: 36, valueSize: 40, r0HlColor: T.fg, r1HlColor: T.ok,
      r0Cap: 'checkout', r0Text: 'r2', r1Cap: 'got', r1Text: '—', r1Color: T.mid, r1Slot: 1 });
    // transient margin paths (writes from the owner, the later read from the session)
    const path = (id, y0, y1) => { s.wire(id, [992, y0], [974, y1], { via: [[MX, y0], [MX, y1]] }); s.set(0, 'wire:' + id, 'alpha', 0, 0); };
    path('w1', 1400, 890); path('w2', 1400, 1165); path('rd', 1608, 1165);
    const travel = (id, t, y0, y1, color, dur = 1.0) => {
      s.set(t, 'wire:' + id, 'alpha', 1, 0.2); s.set(t, 'wire:' + id, 'color', color, 0);
      s.packet({ route: [[994, y0], [MX, y0], [MX, y1], [976, y1]], t, dur, kind: 'dot', color });
      s.set(t + dur + 0.3, 'wire:' + id, 'alpha', 0, 0.5);
    };

    // ---- beat 1: the authoritative command changed at r2; the stored r1 note is outdated ----
    s.set(0.4, 'src', 'alpha', 1, 0.5); s.sfx(0.4, 'ack', { note: 'B4', gain: 1.1, pan: 0 });
    s.set(1.3, 'mem', 'alpha', 1, 0.5); s.set(1.3, 'c1', 'alpha', 1, 0.5); s.sfx(1.3, 'ack', { note: 'G4', gain: 1.2, pan: 0 });
    let t = 3.2;   // the source changes
    s.set(t, 'src', 'status', 'r2', 0); s.set(t, 'src', 'r0Text', 'Test: pnpm test', 0);
    s.set(t, 'src', 'r0Reveal', 0, 0); s.set(t + 0.01, 'src', 'r0Reveal', 1, 0.7, 'linear');
    s.set(t, 'src', 'r0Hl', 1, 0.2); s.pulse(t, 'src');
    s.sfx(t, 'arrive', { note: 'B4', gain: 1.0, pan: 0 });
    s.set(t + 1.2, 'src', 'r0Hl', 0, 0.5);
    t = 4.8;   // the stored record no longer matches the source
    s.set(t, 'c1', 'status', 'outdated', 0); s.set(t, 'c1', 'statusColor', T.accent, 0); s.set(t, 'c1', 'color', T.accent, 0.3);
    s.sfx(t, 'ack', { note: 'E4', gain: 1.3, pan: 0 });
    // hold 5.1 – 8.6

    // ---- beat 2: mark the old record superseded; keep its revision explicit ----
    t = 8.6;
    s.set(t, 'own', 'alpha', 1, 0.4); s.sfx(t, 'ack', { note: 'E5', gain: 1.2, pan: 0 });
    t = 9.6; travel('w1', t, 1400, 890, T.accent); s.sfx(t, 'send', { note: 'E6', gain: 1.0, pan: 0.6 });
    t = 10.6;
    s.set(t, 'c1', 'status', 'superseded', 0); s.set(t, 'c1', 'statusColor', T.mid, 0); s.set(t, 'c1', 'color', T.mid, 0.3); s.pulse(t, 'c1');
    s.sfx(t, 'store', { note: 'G4', gain: 0.9, pan: 0.3 });
    t = 11.6; s.set(t, 'c1', 'r1Hl', 1, 0.2); s.sfx(t, 'ack', { note: 'G5', gain: 1.2, pan: 0 });   // r1 stays explicit
    s.set(t + 1.2, 'c1', 'r1Hl', 0, 0.5);
    // hold 12.8 – 15.4

    // ---- beat 3: store the current command and source; the new record applies to r2 ----
    t = 15.4; s.set(t, 'own', 'r0Text', 'store r2 · link', 0); s.sfx(t, 'ack', { note: 'E5', gain: 1.1, pan: 0 });
    t = 16.0; travel('w2', t, 1400, 1165, T.accent); s.sfx(t, 'send', { note: 'E6', gain: 1.0, pan: 0.6 });
    t = 17.0;
    s.set(t, 'c2', 'alpha', 1, 0.4); s.pulse(t, 'c2');
    s.sfx(t, 'store', { note: 'G5', gain: 1.2, pan: 0.3 });
    t = 18.0;
    s.set(t, 'wire:link', 'alpha', 1, 0.5); s.set(t, 'wire:link', 'color', T.accent, 0); s.set(t, 'wire:link', 'flow', 1, 0);
    s.set(t + 1.0, 'wire:link', 'flow', 0, 0);
    s.set(t, 'linkLab', 'alpha', 1, 0.5);
    s.sfx(t, 'ack', { note: 'G5', gain: 1.1, pan: -0.6 });
    t = 19.2;   // the new record's source matches the current file
    s.set(t, 'c2', 'r1Hl', 1, 0.2); s.pulse(t, 'src'); s.sfx(t, 'ack', { note: 'B4', gain: 1.2, pan: 0 });
    s.set(t + 1.2, 'c2', 'r1Hl', 0, 0.5);
    // hold 20.4 – 23.0

    // ---- beat 4: later retrieval selects the matching version, then validates it ----
    t = 23.0;
    s.set(t, 'own', 'alpha', 0.4, 0.5);
    s.set(t, 'ses', 'alpha', 1, 0.5); s.sfx(t, 'ack', { note: 'C5', gain: 1.1, pan: 0 });
    t = 24.0; travel('rd', t, 1608, 1165, T.fg); s.sfx(t, 'send', { note: 'E6', gain: 1.0, pan: 0.6 });
    t = 25.0; s.set(t, 'c2', 'r0Hl', 1, 0.2); s.pulse(t, 'c2'); s.sfx(t, 'arrive', { note: 'G5', gain: 0.9, pan: 0.3 });
    s.set(t + 1.0, 'c2', 'r0Hl', 0, 0.5);
    t = 25.8;   // a candidate, not yet accepted
    s.set(t, 'ses', 'r1Text', 'pnpm test @ r2', 0); s.set(t, 'ses', 'r1Color', T.accent, 0); s.set(t, 'ses', 'r1Slot', 0, 0.3);
    s.set(t, 'ses', 'status', 'candidate', 0);
    s.sfx(t, 'ack', { note: 'C5', gain: 1.0, pan: 0 });
    t = 27.4;   // check against this session's checkout
    s.set(t, 'ses', 'r0Hl', 1, 0.2); s.set(t, 'ses', 'r1Hl', 1, 0.2); s.set(t, 'ses', 'r1HlColor', T.fg, 0);
    s.sfx(t, 'ack', { note: 'E5', gain: 1.3, pan: 0 });
    t = 28.4;
    s.set(t, 'ses', 'status', 'checked', 0); s.set(t, 'ses', 'statusColor', T.ok, 0); s.set(t, 'ses', 'color', T.ok, 0.2);
    s.set(t, 'ses', 'r1Color', T.ok, 0.2); s.set(t, 'ses', 'r0Hl', 0, 0.5); s.set(t, 'ses', 'r1Hl', 0, 0.5); s.pulse(t, 'ses');
    s.sfx(t, 'deliver', { note: 'C5', gain: 1.2, pan: 0 });
    // hold 28.8 – 31.4
    t = 31.4; s.pulse(t, 'c1'); s.set(t, 'c1', 'r1Hl', 1, 0.2); s.sfx(t, 'ack', { note: 'G4', gain: 1.1, pan: 0 });   // history kept
    s.set(t + 1.0, 'c1', 'r1Hl', 0, 0.5);
    t = 32.8; s.set(t, 'wire:link', 'color', T.fg, 0.2); s.pulse(t, 'c2'); s.sfx(t, 'ack', { note: 'G5', gain: 1.1, pan: 0 });
    s.set(t + 0.8, 'wire:link', 'color', T.accent, 0.4);
    // final hold 33.6 – 39.0
    s.fade(39.0, 1, 1.0);
    s.meta.duration = 40.6;
  },
});

