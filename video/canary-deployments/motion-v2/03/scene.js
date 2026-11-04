/* Canary deployments, lesson 03: An average hides failure.
 * Illustrative window: 10,000 requests. 100 are v2 exports (40 fail, 60 succeed); the other 9,900 succeed.
 * Overall 40 / 10,000 = 0.4% (below an example 1% overall alert). v2 export 40 / 100 = 40%. Same 40 failures.
 * Render: node engine/render.mjs scene.js video.mp4 (from this folder, CHROME_PATH=/snap/bin/chromium).
 */
FlowVideo.scene({
  meta: { title: '', subtitle: '', duration: 44.2, fps: 30, speed: 1, veilTop: 0 },
  build(s) {
    const T = s.THEME;
    const GREY = '#5C616B', PALE = '#D5D8DD';
    // Fixed arithmetic for the illustrative window; every displayed number derives from these.
    const ALL = 10000, SLICE = 100, FAIL = 40, OK_SLICE = SLICE - FAIL, OTHER = ALL - SLICE;
    if (OTHER + SLICE !== ALL || FAIL + OK_SLICE !== SLICE || (FAIL / ALL) * 100 !== 0.4 || (FAIL / SLICE) * 100 !== 40) throw new Error('fixture');
    const fmt = (n) => n.toLocaleString('en-US');

    const cap = (id, text, x, y, o = {}) => s.node(id, 'caption', Object.assign({ text, x, y, alpha: 0 }, o));
    const show = (t, id, d = 0.3) => s.set(t, id, 'alpha', 1, d);
    const hide = (t, id, d = 0.35) => s.set(t, id, 'alpha', 0, d);
    const move = (t, id, x, y, d = 0.9) => { s.set(t, id, 'x', x, d); s.set(t, id, 'y', y, d); };
    const pop = (t, id) => { s.set(t, id, 'scale', 0.6, 0); s.set(t, id, 'alpha', 1, 0.12); s.set(t, id, 'scale', 1, 0.35, 'back'); };

    // Sounds defined for this scene.
    s.sound('reveal', { base: 'G3', gain: 0.85, echo: { delay: 0.1, feedback: 0.35, repeats: 2 }, layers: [
      { type: 'tone', wave: 'sine', ratio: 1, attack: 0.004, decay: 0.8, gain: 0.6, harmonics: [1, 0.4, 0.15] },
      { type: 'tone', wave: 'sine', ratio: 1.189, attack: 0.004, decay: 0.8, gain: 0.5, harmonics: [1, 0.3] },
      { type: 'tone', wave: 'sine', freq: 98, attack: 0.003, decay: 0.5, gain: 0.55 }] });
    s.sound('zoom', { base: 'E4', gain: 0.3, layers: [{ type: 'tone', wave: 'sine', ratio: 1, glideTo: 2, glide: 0.9, attack: 0.12, decay: 0.8, harmonics: [1, 0.25] }] });
    s.sound('tap', { base: 'G4', gain: 0.32, layers: [{ type: 'tone', wave: 'sine', attack: 0.002, decay: 0.09, harmonics: [1, 0.1] }, { type: 'noise', lp: 1400, hp: 200, decay: 0.02, gain: 0.25 }] });

    // ---------- persistent header ----------
    cap('title', 'An average hides failure', 540, 190, { size: 66, weight: 800, color: T.title });
    cap('illus', 'illustrative numbers', 540, 282, { size: 44, weight: 600, color: T.mid, pill: true, border: T.dim, pad: 26 });
    show(0.0, 'title', 0.6); show(0.3, 'illus', 0.5);

    // ---------- overview grid: 100 squares x 100 requests ----------
    const SL = 97; // v2 export square: row 9, column 7
    s.node('all', 'grid', { cols: 10, rows: 10, cell: 64, gap: 10, x: 540, y: 965, fill: GREY, outlineAlpha: 0 });
    const gx0 = 540 - 365, gy0 = 965 - 365, cellC = (i) => [gx0 + (i % 10) * 74 + 32, gy0 + Math.floor(i / 10) * 74 + 32];
    const SLC = cellC(SL); // [725, 1298]
    cap('hdrLabel', 'ALL REQUESTS', 175, 395, { size: 44, weight: 700, color: T.mid, align: 'left' });
    cap('hdrNum', fmt(ALL), 175, 470, { size: 84, weight: 800, align: 'left', pill: true, pillFill: false, border: T.bg, pad: 16, ph: 106 });
    s.node('legSq', 'grid', { cols: 1, rows: 1, cell: 38, gap: 0, x: 600, y: 472, fill: GREY, outlineAlpha: 0, alpha: 0, f0: 1 });
    cap('legTx', '= 100 requests', 634, 470, { size: 48, weight: 600, color: T.mid, align: 'left' });

    // B1 (0.4-6.0): the window fills, one row of squares at a time; then its total lands.
    s.set(0.4, 'all', 'outlineAlpha', 1, 0.6);
    show(0.9, 'hdrLabel', 0.4);
    show(1.3, 'legSq', 0.3); show(1.3, 'legTx', 0.3);
    for (let r = 0; r < 10; r++) {
      const t = 1.2 + r * 0.3;
      for (let c = 0; c < 10; c++) s.set(t + c * 0.012, 'all', 'f' + (r * 10 + c), 1, 0.22);
      s.sfx(t, 'send', { note: 'C5', gain: 0.55 });
    }
    pop(4.4, 'hdrNum'); s.sfx(4.4, 'arrive', { note: 'C5', gain: 0.5, pan: s.panOf([300, 470]) });

    // B2 (6.0-11.8): one square is the v2 + export group; the rest are other requests; parts add to the whole.
    s.set(6.0, 'all', 'hc' + SL, T.accent, 0); s.set(6.0, 'all', 'hi' + SL, 1, 0.25);
    s.ripple(6.0, SLC, T.accent, { r0: 30, r1: 100, dur: 0.6 });
    s.sfx(6.0, 'ack', { note: 'E5', gain: 0.9, pan: s.panOf(SLC) });
    s.node('lead', 'line', { pts: [[SLC[0], 1340], [SLC[0], 1394]], color: T.accent, width: 4, draw: 0 });
    s.set(6.5, 'lead', 'draw', 1, 0.3);
    cap('cV2', 'v2', 630, 1430, { size: 44, weight: 700, color: T.accent, pill: true, border: T.accent, pad: 28 });
    cap('cExp', 'export', 800, 1430, { size: 44, weight: 700, color: T.accent, pill: true, border: T.accent, pad: 28 });
    pop(6.8, 'cV2'); s.sfx(6.8, 'ack', { note: 'E5', gain: 0.9, pan: s.panOf([630, 0]) });
    pop(7.4, 'cExp'); s.sfx(7.4, 'ack', { note: 'E5', gain: 0.9, pan: s.panOf([800, 0]) });
    cap('n100', fmt(SLICE), 715, 1518, { size: 80, weight: 800 });
    pop(8.0, 'n100'); s.sfx(8.0, 'arrive', { note: 'E5', gain: 0.45, pan: s.panOf([715, 0]) });
    cap('oLab', 'other requests', 300, 1430, { size: 48, weight: 600, color: T.mid });
    cap('n9900', fmt(OTHER), 300, 1518, { size: 80, weight: 800 });
    show(8.8, 'oLab', 0.3); pop(8.8, 'n9900');
    s.set(8.8, 'all', 'outline', T.fg, 0.2); s.set(9.2, 'all', 'outline', T.dim, 0.4);
    s.sfx(8.8, 'arrive', { note: 'C5', gain: 0.45, pan: s.panOf([300, 0]) });
    cap('sum', fmt(OTHER) + ' + ' + fmt(SLICE) + ' = ' + fmt(ALL), 540, 1700, { size: 56, weight: 700, color: PALE });
    show(9.6, 'sum', 0.35); s.sfx(9.6, 'ack', { note: 'C6', gain: 0.8 });

    // B3 (11.8-16.2): outcomes. Other requests all succeed; inside the group 40 fail, 60 succeed.
    for (let i = 0; i < 100; i++) {
      if (i === SL) continue;
      s.set(11.8 + ((Math.floor(i / 10) + (i % 10)) / 18) * 1.0, 'all', 'c' + i, T.ok, 0.3);
    }
    [11.9, 12.3, 12.7].forEach((t, k) => s.sfx(t, 'ack', { note: 'C6', gain: 0.55, pan: [-0.3, 0, 0.3][k] }));
    cap('okL', '✓ succeeded', 300, 1598, { size: 46, weight: 700, color: T.ok });
    show(12.9, 'okL', 0.3); s.sfx(12.9, 'ack', { note: 'C5', gain: 0.8, pan: s.panOf([300, 0]) });
    s.set(13.5, 'all', 'r' + SL, FAIL / SLICE, 0.25);
    s.ripple(13.5, SLC, T.bad, { r0: 24, r1: 80, dur: 0.5 });
    cap('bad40', fmt(FAIL) + ' ×', 640, 1598, { size: 50, weight: 800, color: T.bad });
    pop(13.5, 'bad40'); s.sfx(13.5, 'thump', { note: 'E3', gain: 0.55, pan: s.panOf(SLC) });
    s.set(14.1, 'all', 'c' + SL, T.ok, 0.3);
    cap('ok60', fmt(OK_SLICE) + ' ✓', 800, 1598, { size: 50, weight: 800, color: T.ok });
    pop(14.1, 'ok60'); s.sfx(14.1, 'ack', { note: 'E5', gain: 0.85, pan: s.panOf([800, 0]) });

    // B4 (16.2-25.0): the same 40 over all 10,000 requests; compare with an example overall alert.
    ['lead', 'cV2', 'cExp', 'n100', 'oLab', 'n9900', 'sum', 'okL', 'ok60', 'bad40'].forEach((id) => hide(16.2, id, 0.4));
    s.set(16.2, 'all', 'hi' + SL, 0, 0.4);
    cap('num', fmt(FAIL), SLC[0] + 45, SLC[1], { size: 84, weight: 800, color: T.bad, align: 'right' });
    s.ripple(16.8, SLC, T.bad, { r0: 24, r1: 80, dur: 0.5 });
    show(16.8, 'num', 0.2); move(16.8, 'num', 430, 1440, 0.8);
    s.sfx(16.8, 'deliver', { note: 'A4', gain: 0.6, pan: s.panOf(SLC) });
    move(17.6, 'hdrNum', 505, 1440, 0.9);
    cap('sl1', '/', 467, 1440, { size: 84, weight: 500, color: T.mid });
    show(18.3, 'sl1', 0.25); s.sfx(18.5, 'arrive', { note: 'C4', gain: 0.6 });
    cap('rate1', '0.4%', 384, 1562, { size: 110, weight: 800, color: PALE, align: 'left' });
    pop(19.1, 'rate1'); s.sfx(19.1, 'ack', { note: 'C5', gain: 0.85 });
    s.node('strip', 'bar', { w: 730, h: 16, x: 540, y: 1668, ticks: true, alpha: 0, seg0Color: PALE });
    cap('s0', '0%', 175, 1726, { size: 46, weight: 600, color: T.mid, align: 'left' });
    cap('s1', '1% example alert', 905, 1726, { size: 46, weight: 600, color: T.mid, align: 'right' });
    show(20.6, 'strip', 0.3); show(20.6, 's0', 0.3); show(20.6, 's1', 0.3);
    s.sfx(20.6, 'ack', { note: 'G4', gain: 0.9, pan: 0.3 });
    s.set(21.2, 'strip', 'seg0', FAIL / ALL / 0.01, 0.6);
    s.mark(21.8, 'strip', FAIL / ALL / 0.01, PALE);
    s.sfx(21.8, 'arrive', { note: 'C5', gain: 0.4, pan: s.panOf([467, 0]) });
    cap('quiet', 'quiet', 885, 1800, { size: 44, weight: 600, color: T.mid, align: 'right', pill: true, border: T.dim, pad: 22 });
    show(22.4, 'quiet', 0.3); s.sfx(22.4, 'tap', { pan: 0.45 });

    // B5 (25.0-27.0): compact the overall view into the top comparison row.
    ['strip', 's0', 's1', 'quiet', 'legSq', 'legTx'].forEach((id) => hide(25.0, id, 0.35));
    s.clearMarks(25.35, 'strip');
    const RA = 780, RB = 1300; // comparison rows: mini grid centres
    move(25.7, 'hdrLabel', 420, RA - 100, 0.9);
    s.set(25.2, 'all', 'x', 210, 1.0); s.set(25.2, 'all', 'y', RA, 1.0);
    s.set(25.2, 'all', 'cell', 24, 1.0); s.set(25.2, 'all', 'gap', 3.6, 1.0);
    s.sfx(25.2, 'send', { note: 'C5', gain: 0.7, pan: -0.2 });
    move(25.7, 'num', 510, RA - 10, 0.9); move(25.7, 'sl1', 548, RA - 10, 0.9); move(25.7, 'hdrNum', 592, RA - 10, 0.9); move(25.7, 'rate1', 420, RA + 100, 0.9);
    cap('tagA', 'below 1% example alert', 420, RA + 176, { size: 44, weight: 600, color: T.mid, align: 'left' });
    show(26.6, 'tagA', 0.35); s.sfx(26.6, 'deliver', { note: 'C5', gain: 0.4 });
    const MC = [73.8 + 7 * 27.6 + 12, RA - 136.2 + 9 * 27.6 + 12]; // mini grid square 97

    // B6 (27.0-33.6): open the same group: 100 single requests, 40 fail and 60 succeed.
    s.set(27.1, 'all', 'hi' + SL, 1, 0.25);
    s.ripple(27.1, MC, T.accent, { r0: 14, r1: 60, dur: 0.5 });
    s.sfx(27.1, 'ack', { note: 'E5', gain: 0.9, pan: s.panOf(MC) });
    const sg = { cols: 10, rows: 10, cell: 2.2, gap: 0.27, x: MC[0], y: MC[1], fill: GREY, outline: T.accent, outlineAlpha: 0.55, alpha: 0 };
    for (let i = 0; i < 100; i++) sg['f' + i] = 1;
    s.node('sg', 'grid', sg);
    s.set(27.5, 'sg', 'alpha', 1, 0.15);
    s.set(27.5, 'sg', 'cell', 46, 1.2); s.set(27.5, 'sg', 'gap', 11, 1.2); s.set(27.5, 'sg', 'x', 540, 1.2); s.set(27.5, 'sg', 'y', 1505, 1.2);
    s.sfx(27.5, 'zoom', { pan: -0.1 });
    s.node('leg1Sq', 'grid', { cols: 1, rows: 1, cell: 34, gap: 0, x: 410, y: 1846, fill: GREY, outlineAlpha: 0, alpha: 0, f0: 1 });
    cap('leg1Tx', '= 1 request', 444, 1844, { size: 48, weight: 600, color: T.mid, align: 'left' });
    show(28.7, 'leg1Sq', 0.3); show(28.7, 'leg1Tx', 0.3); s.sfx(28.7, 'arrive', { note: 'E5', gain: 0.45 });
    s.set(28.7, 'cV2', 'x', 465, 0); s.set(28.7, 'cV2', 'y', RB - 130, 0); s.set(28.7, 'cExp', 'x', 640, 0); s.set(28.7, 'cExp', 'y', RB - 130, 0);
    show(29.1, 'cV2', 0.25); s.sfx(29.1, 'ack', { note: 'E5', gain: 0.8, pan: s.panOf([465, 0]) });
    show(29.5, 'cExp', 0.25); s.sfx(29.5, 'ack', { note: 'E5', gain: 0.8, pan: s.panOf([640, 0]) });
    for (let i = 0; i < 100; i++) {
      const fail = i >= OK_SLICE, t = (fail ? 30.9 : 30.2) + (Math.floor(i / 10) - (fail ? 6 : 0)) * 0.05;
      s.set(t, 'sg', 'c' + i, fail ? T.bad : T.ok, 0.3); s.set(t, 'sg', 'k' + i, fail ? 1 : 2, 0); s.set(t, 'sg', 'km' + i, 0, 0); s.set(t, 'sg', 'km' + i, 1, 0.3);
    }
    s.sfx(30.2, 'ack', { note: 'E5', gain: 0.85 });
    s.sfx(30.9, 'thump', { note: 'E3', gain: 0.55 });
    cap('ok60b', fmt(OK_SLICE) + ' ✓', 921, 1394, { size: 52, weight: 800, color: T.ok });
    cap('bad40b', fmt(FAIL) + ' ×', 921, 1677, { size: 52, weight: 800, color: T.bad });
    pop(31.4, 'ok60b'); s.sfx(31.4, 'ack', { note: 'E5', gain: 0.75, pan: 0.5 });
    pop(31.8, 'bad40b'); s.sfx(31.8, 'deliver', { note: 'A4', gain: 0.6, pan: 0.5 });

    // B7 (33.6-37.4): the group becomes the second row: the same 40 over 100.
    ['ok60b', 'leg1Sq', 'leg1Tx'].forEach((id) => hide(33.6, id, 0.35));
    hide(33.6, 'bad40b', 0.25);
    cap('num2', fmt(FAIL), 950, 1677, { size: 84, weight: 800, color: T.bad, align: 'right' });
    show(33.6, 'num2', 0.25); move(33.6, 'num2', 510, RB - 20, 0.9);
    s.sfx(33.6, 'deliver', { note: 'A4', gain: 0.5, pan: 0.5 });
    s.set(33.6, 'sg', 'x', 210, 1.0); s.set(33.6, 'sg', 'y', RB, 1.0); s.set(33.6, 'sg', 'cell', 22, 1.0); s.set(33.6, 'sg', 'gap', 5.5, 1.0);
    cap('den2', fmt(SLICE), 470, 1505, { size: 84, weight: 800, align: 'left', pill: true, pillFill: false, border: T.bg, pad: 16, ph: 106 });
    show(34.0, 'den2', 0.2); move(34.0, 'den2', 592, RB - 20, 0.8);
    cap('sl2', '/', 548, RB - 20, { size: 84, weight: 500, color: T.mid });
    show(34.6, 'sl2', 0.25); s.sfx(34.7, 'arrive', { note: 'E5', gain: 0.6, pan: 0.1 });
    cap('rate2', '40%', 420, RB + 92, { size: 110, weight: 800, color: T.bad, align: 'left' });
    pop(35.3, 'rate2'); s.sfx(35.3, 'reveal', { pan: 0 });

    // B8 (37.4-44.2): same numerator, different denominators; hold, then fade out.
    s.node('brk', 'line', { pts: [[405, RA - 10], [385, RA - 10], [385, RB - 20], [405, RB - 20]], color: T.bad, width: 4, draw: 0 });
    s.set(37.4, 'brk', 'draw', 1, 0.6);
    s.sfx(37.4, 'deliver', { note: 'A4', gain: 0.55, pan: -0.25 });
    cap('same', 'same 40', 385, (RA + RB) / 2 - 5, { size: 44, weight: 700, color: T.bad, pill: true, border: T.bad, pad: 26 });
    pop(38.0, 'same'); s.sfx(38.0, 'deliver', { note: 'A4', gain: 0.55, pan: -0.25 });
    s.set(39.4, 'hdrNum', 'border', T.fg, 0.3); s.sfx(39.4, 'arrive', { note: 'C5', gain: 0.5, pan: 0.2 });
    s.set(40.1, 'den2', 'border', T.fg, 0.3); s.sfx(40.1, 'arrive', { note: 'E5', gain: 0.5, pan: 0.1 });
    s.fade(43.0, 1, 0.7);
  },
});

