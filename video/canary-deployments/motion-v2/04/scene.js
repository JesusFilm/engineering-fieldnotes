// Canary deployments, lesson 04: Compare the same operation (motion-v2 cut).
// One mechanism: compare export requests with export requests, observed in one shared window,
// and read each version's failure rate from its own denominator. Counts are illustrative.
// Render from the repository root:
//   CHROME_PATH=/snap/bin/chromium node video/canary-deployments/motion-v2/04/engine/render.mjs video/canary-deployments/motion-v2/04/scene.js video/canary-deployments/motion-v2/04/video.mp4
FlowVideo.scene({
  meta: { title: '', subtitle: '', duration: 40.2, fps: 30, speed: 1, veilTop: 0 },
  build(s) {
    const T = s.THEME;
    const CYAN = '#45D3E6', VIOLET = '#B197FC';
    // Immutable illustrative fixture: every numeral and fill is derived from it.
    const FIX = { v1: { fail: 0, total: 900 }, v2: { fail: 40, total: 100 } };
    const rate = (v) => (v.fail / v.total) * 100;
    if (rate(FIX.v1) !== 0 || rate(FIX.v2) !== 40) throw new Error('fixture arithmetic');
    const STEPS = 10;

    // ---------- static header ----------
    s.node('illus', 'caption', { x: 540, y: 128, text: 'illustrative counts', size: 46, weight: 600, color: T.mid, pill: true, border: T.dim, ph: 76, pad: 28 });
    s.node('t1', 'caption', { x: 540, y: 250, text: 'Compare exports', size: 92, weight: 800, color: T.title });
    s.node('t2', 'caption', { x: 540, y: 350, text: 'with exports', size: 92, weight: 800, color: T.title });

    // ---------- scope: one operation, one window ----------
    s.node('ruleL', 'line', { pts: [[300, 545], [300, 600], [50, 600], [50, 1160], [80, 1160]], width: 4, color: T.mid, draw: 0 });
    s.node('stubL', 'line', { pts: [[50, 840], [80, 840]], width: 4, color: T.mid, draw: 0 });
    s.node('ruleR', 'line', { pts: [[780, 545], [780, 600], [1030, 600], [1030, 1160], [1000, 1160]], width: 4, color: T.mid, draw: 0 });
    s.node('stubR', 'line', { pts: [[1030, 840], [1000, 840]], width: 4, color: T.mid, draw: 0 });
    s.node('op', 'caption', { x: 300, y: 490, text: 'op = export', size: 52, weight: 700, mono: true, color: T.mid, pill: true, border: T.dim, ph: 104, pad: 32, radius: 20 });
    s.node('win', 'caption', { x: 780, y: 490, text: 'window A', size: 52, weight: 700, mono: true, color: T.mid, pill: true, border: T.dim, ph: 104, pad: 32, radius: 20, progress: 0 });
    s.node('hFrac', 'caption', { x: 560, y: 657, text: 'failed / exports', size: 46, weight: 600, color: T.mid, alpha: 0 });
    s.node('hRate', 'caption', { x: 872, y: 657, text: 'rate', size: 46, weight: 600, color: T.mid, alpha: 0 });

    // ---------- version rows (v1 above v2) ----------
    function row(k, cy, color, name, role) {
      const g = 'g' + k;
      s.node(g, 'group', { x: 540, y: cy });
      s.node('p' + k, 'panel', { parent: g, x: 540, y: cy, w: 920, h: 260, color: T.dim, stripe: color });
      s.node('id' + k, 'caption', { parent: g, x: 120, y: cy - 42, text: name, size: 84, weight: 800, color, align: 'left' });
      s.node('role' + k, 'caption', { parent: g, x: 120, y: cy + 52, text: role, size: 52, weight: 600, color: T.fg, align: 'left' });
      s.node('n' + k, 'caption', { parent: g, x: 560, y: cy - 60, text: '?', size: 84, weight: 800, color: T.mid, alpha: 0 });
      s.node('bar' + k, 'line', { parent: g, pts: [[478, cy], [642, cy]], width: 6, color: T.fg, alpha: 0 });
      s.node('d' + k, 'caption', { parent: g, x: 560, y: cy + 62, text: '0', size: 84, weight: 800, color: T.fg, alpha: 0 });
      s.node('lf' + k, 'caption', { parent: g, x: 662, y: cy - 60, text: 'failed', size: 52, weight: 600, color: T.mid, align: 'left', alpha: 0 });
      s.node('le' + k, 'caption', { parent: g, x: 662, y: cy + 62, text: 'exports', size: 52, weight: 600, color: T.mid, align: 'left', alpha: 0 });
      s.node('eq' + k, 'caption', { parent: g, x: 706, y: cy, text: '=', size: 84, weight: 700, color: T.mid, alpha: 0 });
      s.node('r' + k, 'caption', { parent: g, x: 868, y: cy, text: '', size: 100, weight: 800, color: T.fg, alpha: 0, scale: 0.6 });
      s.node('box' + k, 'panel', { parent: g, x: 868, y: cy, w: 240, h: 146, color: T.bad, hollow: true, radius: 22, alpha: 0 });
    }
    row(1, 840, CYAN, 'v1', 'control');
    row(2, 1160, VIOLET, 'v2', 'candidate');

    // ---------- comparison tracks (same 0..100% scale) ----------
    const TW = 720, TX = 600, TL = TX - TW / 2;
    s.node('s0', 'caption', { x: TL, y: 1375, text: '0%', size: 46, weight: 600, color: T.mid, alpha: 0 });
    s.node('sT', 'caption', { x: 600, y: 1375, text: 'failure rate', size: 46, weight: 600, color: T.fg, alpha: 0 });
    s.node('s1', 'caption', { x: 960, y: 1375, text: '100%', size: 46, weight: 600, color: T.mid, align: 'right', alpha: 0 });
    s.node('k1', 'caption', { x: 120, y: 1455, text: 'v1', size: 60, weight: 800, color: CYAN, align: 'left', alpha: 0 });
    s.node('tr1', 'track', { x: TX, y: 1455, w: TW, h: 40, color: T.mid, fill: 0, draw: 0 });
    s.node('zero', 'ring', { x: TL + 4, y: 1455, r: 0, color: T.fg, width: 5 });
    s.node('k2', 'caption', { x: 120, y: 1545, text: 'v2', size: 60, weight: 800, color: VIOLET, align: 'left', alpha: 0 });
    s.node('tr2', 'track', { x: TX, y: 1545, w: TW, h: 40, color: T.mid, fill: 0, draw: 0, fillColor: T.bad });
    const fillEnd = TL + 5 + (TW - 10) * (FIX.v2.fail / FIX.v2.total);
    s.node('worse', 'caption', { x: fillEnd, y: 1618, text: 'observed worse', size: 50, weight: 700, color: T.fg, alpha: 0 });

    // ---------- conclusion and limits ----------
    s.node('verdict', 'caption', { x: 540, y: 1712, text: 'argues against promotion', size: 62, weight: 800, color: T.fg, alpha: 0 });
    s.node('note', 'caption', { x: 540, y: 1800, text: '', size: 48, weight: 600, color: T.mid, alpha: 0 });

    const fadeIn = (t, id, d = 0.35) => s.set(t, id, 'alpha', 1, d);
    const fadeOut = (t, id, d = 0.3) => s.set(t, id, 'alpha', 0, d);
    const rules = ['ruleL', 'stubL', 'ruleR', 'stubR'];

    // B1 0-7.6: scope. Same operation, same window; totals accumulate together.
    s.set(0.5, 'op', 'border', T.fg, 0.2); s.set(0.5, 'op', 'color', T.fg, 0.2); s.pulse(0.5, 'op');
    s.sfx(0.5, 'send', { note: 'G5', gain: 1.4 });
    s.set(0.65, 'ruleL', 'draw', 1, 0.75); s.set(1.35, 'stubL', 'draw', 1, 0.2);
    s.set(1.6, 'win', 'border', T.fg, 0.2); s.set(1.6, 'win', 'color', T.fg, 0.2); s.pulse(1.6, 'win');
    s.sfx(1.6, 'ack', { note: 'G5', gain: 1.6 });
    s.set(1.75, 'ruleR', 'draw', 1, 0.75); s.set(2.45, 'stubR', 'draw', 1, 0.2);
    for (const id of ['hFrac', 'hRate', 'n1', 'bar1', 'd1', 'n2', 'bar2', 'd2']) fadeIn(2.5, id, 0.3);
    const W0 = 2.8, STEP = 0.3;
    s.set(W0, 'win', 'progress', 1, STEPS * STEP, 'linear');
    for (let k = 1; k <= STEPS; k++) {
      const t = W0 + k * STEP;
      s.set(t, 'd1', 'text', String((FIX.v1.total / STEPS) * k), 0);
      s.set(t, 'd2', 'text', String((FIX.v2.total / STEPS) * k), 0);
      if (k < STEPS) s.sfx(t, 'clock', { note: 'G6', gain: 1.1 });
    }
    const LOCK = W0 + STEPS * STEP; // 5.8
    s.pulse(LOCK, 'win'); s.pulse(LOCK, 'd1', null, 0.6); s.pulse(LOCK + 0.12, 'd2', null, 0.6); // window closes; both totals lock together
    s.sfx(LOCK, 'arrive', { note: 'C5', gain: 0.75 });
    s.sfx(LOCK + 0.12, 'arrive', { note: 'E5', gain: 0.75 });

    // Focus one version: enlarge its row, dim the other, then show failed / own exports = rate.
    function calc(k, other, t0, color, fail, rateColor, notes) {
      const g = 'g' + k, R = rate(FIX['v' + k]);
      s.set(t0, 'g' + other, 'alpha', 0.3, 0.5);
      s.set(t0, g, 'scale', 1.05, 0.5);
      s.set(t0, 'p' + k, 'color', color, 0.3); s.pulse(t0, 'p' + k);
      for (const r of rules) s.set(t0, r, 'alpha', 0.25, 0.4);
      s.sfx(t0, 'arrive', { note: notes.id, gain: 0.6 });
      const t1 = t0 + 0.9;
      s.set(t1, 'n' + k, 'text', String(FIX['v' + k].fail), 0);
      s.set(t1, 'n' + k, 'color', fail, 0.15); s.pulse(t1, 'n' + k);
      fadeIn(t1, 'lf' + k, 0.3);
      s.sfx(t1, notes.failName, notes.failOpts);
      const t2 = t1 + 1.0;
      s.pulse(t2, 'bar' + k); s.pulse(t2, 'd' + k);
      fadeIn(t2, 'le' + k, 0.3);
      s.sfx(t2, 'work', { note: notes.id, gain: 1.2 });
      const t3 = t2 + 1.2;
      fadeOut(t3, 'lf' + k, 0.25); fadeOut(t3, 'le' + k, 0.25);
      fadeIn(t3 + 0.2, 'eq' + k, 0.25);
      s.set(t3 + 0.2, 'r' + k, 'text', R + '%', 0);
      s.set(t3 + 0.2, 'r' + k, 'color', rateColor, 0);
      s.set(t3 + 0.2, 'r' + k, 'alpha', 1, 0.15);
      s.set(t3 + 0.2, 'r' + k, 'scale', 1, 0.4, 'back');
      s.sfx(t3 + 0.2, 'deliver', notes.rateOpts);
      const t4 = t3 + 2.6; // after the reading hold, restore the rows
      s.set(t4, g, 'scale', 1, 0.5);
      s.set(t4, 'g' + other, 'alpha', 1, 0.5);
      s.set(t4, 'p' + k, 'color', T.dim, 0.4);
      for (const r of rules) s.set(t4, r, 'alpha', 1, 0.4);
      s.sfx(t4, 'send', { note: notes.hi, gain: 1.0 });
      return t4;
    }
    // B2 7.6-13.8: control. B3 14.6-20.8: candidate.
    const end1 = calc(1, 2, 7.6, CYAN, T.fg, T.fg, { id: 'C5', hi: 'C6', failName: 'ack', failOpts: { note: 'C5', gain: 1.3 }, rateOpts: { note: 'C5', gain: 0.9 } });
    const end2 = calc(2, 1, end1 + 0.8, VIOLET, T.bad, T.bad, { id: 'E5', hi: 'E6', failName: 'thump', failOpts: { note: 'E4', gain: 1.0, override: { layers: [{ decay: 0.26, gain: 0.55 }, { gain: 0.45 }] } }, rateOpts: { note: 'E4', gain: 1.15 } });

    // B4: same-scale rate tracks.
    const c0 = end2 + 0.9; // 21.7
    for (const id of ['s0', 'sT', 's1', 'k1']) fadeIn(c0, id, 0.35);
    s.set(c0, 'tr1', 'draw', 1, 0.7);
    s.sfx(c0, 'work', { note: 'C5', gain: 1.2 });
    s.set(c0 + 0.9, 'zero', 'r', 30, 0.35, 'back'); s.pulse(c0 + 0.9, 'zero');
    s.sfx(c0 + 0.9, 'ack', { note: 'C5', gain: 1.3 });
    fadeIn(c0 + 1.9, 'k2', 0.35);
    s.set(c0 + 1.9, 'tr2', 'draw', 1, 0.7);
    s.sfx(c0 + 1.9, 'work', { note: 'E5', gain: 1.2 });
    s.set(c0 + 2.8, 'tr2', 'fill', FIX.v2.fail / FIX.v2.total, 1.0, 'inOut');
    s.sfx(c0 + 3.8, 'deliver', { note: 'E4', gain: 1.0 });
    // Each rate comes from its own denominator: pair them, one version at a time.
    const pr = c0 + 4.9;
    s.pulse(pr, 'd1'); s.pulse(pr, 'r1'); s.pulse(pr, 'p1'); s.set(pr, 'p1', 'color', CYAN, 0.2); s.set(pr + 0.7, 'p1', 'color', T.dim, 0.3);
    s.sfx(pr, 'arrive', { note: 'C5', gain: 0.5 });
    s.pulse(pr + 0.8, 'd2'); s.pulse(pr + 0.8, 'r2'); s.set(pr + 0.8, 'p2', 'color', VIOLET, 0.2); s.pulse(pr + 0.8, 'p2'); s.set(pr + 1.5, 'p2', 'color', T.dim, 0.3);
    s.sfx(pr + 0.8, 'arrive', { note: 'E5', gain: 0.5 });

    // B5: interpretation of the displayed comparison (no action is taken).
    const v0 = pr + 3.1; // 29.7
    fadeIn(v0, 'box2', 0.3); s.pulse(v0, 'box2');
    fadeIn(v0, 'worse', 0.35);
    s.sfx(v0, 'thump', { note: 'E4', gain: 0.5 });
    s.set(v0 + 1.5, 'verdict', 'alpha', 1, 0.4);
    s.set(v0 + 1.5, 'verdict', 'dy', 16, 0); s.set(v0 + 1.5, 'verdict', 'dy', 0, 0.4, 'out');
    s.sfx(v0 + 1.5, 'deliver', { note: 'G4', gain: 0.8 });

    // B6: limits, one short note at a time.
    const n0 = v0 + 3.8; // 33.5
    const NOTES = ['cause not proven', 'no universal threshold', 'a person decides next'];
    NOTES.forEach((txt, i) => {
      const t = n0 + i * 1.9;
      if (i) fadeOut(t - 0.25, 'note', 0.2);
      s.set(t, 'note', 'text', txt, 0);
      fadeIn(t, 'note', 0.25);
      s.sfx(t, 'ack', { note: 'G4', gain: 1.3 });
    });
    const fadeAt = n0 + 2 * 1.9 + 2.2; // 39.5
    s.fade(fadeAt, 1, 0.8);
    s.meta.duration = fadeAt + 0.8 + 0.3;
  },
});
