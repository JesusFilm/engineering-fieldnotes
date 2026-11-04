// Orchestration patterns, lesson 04: Join before deciding (motion-v2/04).
// One mechanism: the release assessment needs both required reports; one early report cannot stand for both, and
// receiving both (complete) is not the same as being able to release (the migration risk blocks it).
// Render from the repository root:
//   node video/orchestration-patterns/motion-v2/04/engine/render.mjs video/orchestration-patterns/motion-v2/04/scene.js video/orchestration-patterns/motion-v2/04/video.mp4
FlowVideo.scene({
  meta: { title: 'Join before deciding', subtitle: 'ORCHESTRATION · 4', titleSize: 84, titleY: 300, subtitleSize: 40, subtitleY: 385, duration: 37, fps: 30, speed: 1 },
  build(s) {
    const T = s.THEME, BLUE = T.info, AMB = T.accent, RED = T.bad;
    const at = (id) => (t, prop, v, dur = 0, ease) => s.set(t, id, prop, v, dur, ease);
    const A = at('wApi'), W = at('wMig'), X = at('matrix'), R = at('release');

    // ---------- workers ----------
    const wRow = [{ x: 24, y: 115, w: 372, h: 56, size: 44 }];
    s.node('wApi', 'panel', { x: 300, y: 545, w: 420, h: 180, headY: 52, title: 'API review', titleSize: 44, rows: wRow, color: BLUE });
    s.node('wMig', 'panel', { x: 780, y: 545, w: 420, h: 180, headY: 52, title: 'Migration', titleSize: 44, rows: wRow, color: AMB });
    A(0, 'row0Text', 'running'); A(0, 'row0Color', AMB);
    W(0, 'row0Text', 'running'); W(0, 'row0Color', AMB);
    s.node('sweep', 'sweep', { x: 780, y: 612, x0: 610, x1: 950, sw: 90, color: AMB });
    // migration keeps working: the sweep goes back and forth until 17.0
    for (let t = 0, d = 0; t < 17.0; t += 1.6, d ^= 1) s.set(t, 'sweep', 'k', d ? 0 : 1, Math.min(1.6, 17.0 - t), 'inOut');
    s.node('apiSweep', 'sweep', { x: 300, y: 612, x0: 130, x1: 470, sw: 90, color: AMB });
    s.set(0, 'apiSweep', 'k', 1, 1.5, 'inOut'); s.set(1.5, 'apiSweep', 'alpha', 0, 0.2);

    // ---------- coordinator matrix: Review | Receipt | Finding ----------
    const cells = [[254, 262], [526, 322]];
    s.node('matrix', 'panel', { x: 540, y: 1015, w: 900, h: 480, headY: 56, title: 'Coordinator', titleSize: 46,
      rows: [
        { x: 24, y: 118, w: 852, h: 50, size: 38, mono: false, x2: 290, x3: 560 },
        { x: 24, y: 212, w: 852, h: 92, size: 44, mono: false, x2: 290, x3: 560, cells },
        { x: 24, y: 316, w: 852, h: 92, size: 44, mono: false, x2: 290, x3: 560, cells },
        { x: 24, y: 418, w: 852, h: 70, size: 44, mono: false, x3: 560 },
      ] });
    X(0, 'row0Text', 'Review'); X(0, 'row0Text2', 'Receipt'); X(0, 'row0Text3', 'Finding');
    for (const k of ['', '2', '3']) X(0, 'row0Color' + k, T.mid);
    X(0, 'row1Text', 'API'); X(0, 'row2Text', 'Migration');
    for (const i of [1, 2]) { X(0, 'row' + i + 'Text2', 'waiting'); X(0, 'row' + i + 'Color2', T.mid); X(0, 'row' + i + 'Text3', '—'); X(0, 'row' + i + 'Color3', T.mid); }
    X(0, 'row3Text', 'Reports 0 / 2'); X(0, 'row3Color', T.mid); X(0, 'row3Text3', 'incomplete'); X(0, 'row3Color3', T.mid);

    // ---------- release assessment ----------
    s.node('release', 'panel', { x: 540, y: 1445, w: 900, h: 300, headY: 56, title: 'Release assessment', titleSize: 46, titleColor: T.mid,
      rows: [{ x: 24, y: 140, w: 852, h: 84, size: 62, mono: false }, { x: 24, y: 225, w: 852, h: 60, size: 44, mono: false }] });
    R(0, 'row0Text', 'WAITING'); R(0, 'row0Color', AMB); R(0, 'row1Slot', 1);

    // ---------- report routes (only drawn while a report travels) ----------
    const GL = 58, GR = 1022, apiY = 775 + 212, migY = 775 + 316;
    const routeA = [[300, 640], [300, 700], [GL, 700], [GL, apiY], [86, apiY]];
    const routeM = [[780, 640], [780, 700], [GR, 700], [GR, migY], [994, migY]];
    s.wire('rA', routeA[0], routeA[4], { via: routeA.slice(1, 4), arrow: true, color: BLUE, width: 5 });
    s.wire('rM', routeM[0], routeM[4], { via: routeM.slice(1, 4), arrow: true, color: RED, width: 5 });
    for (const w of ['rA', 'rM']) { s.set(0, 'wire:' + w, 'alpha', 0, 0); s.set(0, 'wire:' + w, 'solid', 1, 0); }

    // ---------- beat 1 (0-8): API finishes first; its report fills only its own row ----------
    s.sfx(0.3, 'work', { note: 'E4', pan: -0.4 }); s.sfx(0.4, 'work', { note: 'G4', pan: 0.4 });
    A(1.5, 'row0Text', 'finished'); A(1.5, 'row0Color', T.fg); A(1.5, 'row0Mark', 'check'); A(1.5, 'row0MarkColor', BLUE); A(1.5, 'row0MarkK', 0); A(1.5, 'row0MarkK', 1, 0.35);
    s.pulse(1.5, 'wApi', BLUE); s.sfx(1.5, 'ack', { note: 'E5', gain: 1.5, pan: -0.4 });
    s.set(2.4, 'wire:rA', 'alpha', 1, 0.3);
    s.packet({ route: routeA, t: 2.6, dur: 1.4, kind: 'chip', label: 'API', color: BLUE, size: 34 });
    s.sfx(2.6, 'send', { note: 'E6', gain: 1.4, pan: -0.5 });
    X(4.0, 'row1Text2', 'received'); X(4.0, 'row1Color2', T.fg); X(4.0, 'row1Text3', 'No blocker'); X(4.0, 'row1Color3', T.fg);
    X(4.0, 'row1Hl', 1, 0.2); X(4.0, 'row1HlColor', BLUE); X(4.9, 'row1Hl', 0, 0.5);
    s.ripple(4.0, [90, apiY], BLUE, { r1: 30, dur: 0.45 }); s.sfx(4.0, 'arrive', { note: 'C5', pan: 0 });
    X(4.6, 'row3Text', 'Reports 1 / 2'); X(4.6, 'row3Color', T.fg);
    s.set(5.0, 'wire:rA', 'alpha', 0.35, 0.6); s.set(5.0, 'wire:rA', 'color', T.dim, 0.6);
    s.sfx(6.2, 'work', { note: 'G4', gain: 1.2, pan: 0.45 });

    // ---------- beat 2 (8-17): the coordinator waits; the API report cannot fill the migration row ----------
    X(8.5, 'row2C0', 1, 0.25); X(8.5, 'row2C0Color', AMB); X(8.5, 'row2Color2', AMB, 0.25);
    s.sfx(8.5, 'ack', { note: 'C5', gain: 1.0, pan: 0.2 });
    X(10.0, 'row3Hl', 1, 0.25); X(10.0, 'row3HlColor', AMB); X(10.0, 'row3Color3', AMB, 0.25);
    s.sfx(10.0, 'ack', { note: 'C5', gain: 1.0, pan: 0 });
    R(11.5, 'row1Slot', 0, 0.3); R(11.5, 'row1Text', 'Needs migration report'); R(11.5, 'row1Color', AMB); R(11.5, 'row1Reveal', 0); R(11.5, 'row1Reveal', 1, 0.8, 'linear');
    s.sfx(11.5, 'store', { note: 'C5', gain: 0.8, pan: 0 });
    s.sfx(14.0, 'work', { note: 'G4', gain: 1.2, pan: 0.45 });
    X(15.6, 'row3Hl', 0, 0.5);

    // ---------- beat 3 (17-23): migration finishes with a risk; its report arrives; the risk blocks at once ----------
    s.set(17.0, 'sweep', 'alpha', 0, 0.3);
    W(17.0, 'row0Text', 'risk found'); W(17.0, 'row0Color', RED); W(17.0, 'row0Mark', 'x'); W(17.0, 'row0MarkColor', RED); W(17.0, 'row0MarkK', 0); W(17.0, 'row0MarkK', 1, 0.35);
    s.pulse(17.0, 'wMig', RED); s.shake(17.0, 'wMig', 7, 0.35);
    s.sfx(17.0, 'thump', { note: 'G3', gain: 0.8, pan: 0.45 });
    s.set(18.6, 'wire:rM', 'alpha', 1, 0.3);
    s.packet({ route: routeM, t: 18.8, dur: 1.5, kind: 'chip', label: 'MIG', color: RED, size: 34 });
    s.sfx(18.8, 'send', { note: 'G6', gain: 1.4, pan: 0.5 });
    const a2 = 20.3;
    X(a2, 'row2C0', 0, 0.3); X(a2, 'row2Text2', 'received'); X(a2, 'row2Color2', T.fg, 0.2); X(a2, 'row2Text3', 'Row loss risk'); X(a2, 'row2Color3', RED);
    X(a2, 'row2Hl', 1, 0.2); X(a2, 'row2HlColor', RED); X(a2 + 1.0, 'row2Hl', 0, 0.5);
    s.ripple(a2, [990, migY], RED, { r1: 30, dur: 0.45 }); s.sfx(a2, 'arrive', { note: 'C5', pan: 0.3 });
    // the blocking finding surfaces in the assessment immediately
    R(a2 + 0.4, 'row0Text', 'BLOCKED'); R(a2 + 0.4, 'row0Color', RED); R(a2 + 0.4, 'color', RED, 0.3); R(a2 + 0.4, 'titleColor', T.fg, 0.3);
    R(a2 + 0.4, 'row1Text', 'Migration: row loss risk'); R(a2 + 0.4, 'row1Color', RED); R(a2 + 0.4, 'row1Reveal', 0); R(a2 + 0.4, 'row1Reveal', 1, 0.8, 'linear');
    s.shake(a2 + 0.4, 'release', 8, 0.4); s.sfx(a2 + 0.4, 'thump', { note: 'C3', gain: 0.9, pan: 0 });
    s.set(a2 + 1.0, 'wire:rM', 'alpha', 0.35, 0.6); s.set(a2 + 1.0, 'wire:rM', 'color', T.dim, 0.6);
    // receipt is now complete (neutral white, not green)
    X(22.0, 'row3Text', 'Reports 2 / 2'); X(22.0, 'row3Text3', 'complete'); X(22.0, 'row3Color3', T.fg, 0.3);
    s.sfx(22.0, 'ack', { note: 'C5', gain: 1.4, pan: 0 });

    // ---------- beat 4 (24-39): complete is not the same as releasable ----------
    X(24.0, 'row3Hl', 1, 0.25); X(24.0, 'row3HlColor', T.fg); s.sfx(24.0, 'ack', { note: 'C6', gain: 1.0, pan: 0 });
    X(25.6, 'row2C1', 1, 0.25); X(25.6, 'row2C1Color', RED); s.sfx(25.6, 'ack', { note: 'G4', gain: 1.2, pan: 0.3 });
    R(27.2, 'row0Hl', 1, 0.25); R(27.2, 'row0HlColor', RED); s.sfx(27.2, 'thump', { note: 'C3', gain: 0.55, pan: 0 });
    X(29.0, 'row3Hl', 0, 0.5); X(29.0, 'row2C1', 0, 0.5); R(29.0, 'row0Hl', 0, 0.5);
    s.fade(34.4, 1, 1.4);
  },
});
