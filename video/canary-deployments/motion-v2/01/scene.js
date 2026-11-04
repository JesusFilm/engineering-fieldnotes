/* Canary deployments, lesson 01: Keep a control version (motion-v2 cut 01).
 * v1 stays as the control, v2 (candidate) gets a limited example share, both are measured over the
 * same window, and a rule written before rollout picks pause / abort / promote. All numbers are illustrative.
 * Uses the cut-local engine in ./engine (caption, card, list, line nodes and the square packet).
 */
FlowVideo.scene({
  meta: { title: '', subtitle: '', duration: 47.5, fps: 30, speed: 1, veilTop: 0 },
  build(s) {
    const T = s.THEME;
    const V1 = '#38C6E8', V2 = '#A98BFA', AMBER = T.accent, RED = T.bad, GREEN = T.ok, V2DIM = '#4B4462';

    /* ---------- fixtures (illustrative) ---------- */
    const DATA = { v1: { errs: 90, reqs: 9000 }, v2: { errs: 90, reqs: 1000 } };
    const pct = (d) => Math.round((100 * d.errs) / d.reqs);
    const P1 = pct(DATA.v1), P2 = pct(DATA.v2), DELTA = P2 - P1, LIMIT = 5, MIN_REQS = 1000;
    const fmt = (v) => v.toLocaleString('en-US');

    /* ---------- nodes ---------- */
    s.node('header', 'caption', { x: 540, y: 230, size: 66, weight: 800, text: 'Keep a control version', color: T.title, alpha: 0 });
    s.node('foot', 'caption', { x: 540, y: 1712, size: 40, weight: 600, text: 'Illustrative numbers', color: T.mid, alpha: 0 });

    // routing composition
    s.node('req', 'box', { x: 540, y: 480, w: 380, h: 100, label: 'Requests', labelSize: 50, alpha: 0 });
    s.node('router', 'box', { x: 540, y: 690, w: 420, h: 130, label: 'Router', labelSize: 50, ports: 2, portSpan: 300, alpha: 0 });
    s.wire('in', 'req.bottom', 'router.top');
    s.wire('w1', 'router.port0', 'v1.top', { via: [[290, 815]] });
    s.wire('w2', 'router.port1', 'v2.top', { via: [[790, 815]] });
    s.set(0, 'wire:in', 'alpha', 0, 0); s.set(0, 'wire:w1', 'alpha', 0, 0); s.set(0, 'wire:w2', 'alpha', 0, 0);
    s.node('v1', 'card', { x: 290, y: 975, w: 400, h: 190, title: 'v1', sub: 'current', color: V1, titleColor: V1, alpha: 0, valRight: 190 });
    s.node('v2', 'card', { x: 790, y: 975, w: 400, h: 190, title: 'v2', sub: 'candidate', color: V2, titleColor: V2, alpha: 0, valRight: 190 });
    s.node('share', 'bar', { x: 470, y: 1150, w: 680, h: 26, segments: 2, seg0: 1, seg0Color: V1, seg1: 0, seg1Color: V2, alpha: 0 });
    s.node('shareLbl', 'caption', { x: 470, y: 1212, size: 44, weight: 600, text: 'Example split 90 / 10', color: T.fg, alpha: 0 });
    s.node('clock', 'clock', { x: 930, y: 1150, r: 44, alpha: 0 });
    s.node('timerLbl', 'caption', { x: 840, y: 1290, size: 44, weight: 600, text: 'Timer only', color: T.mid, alpha: 0 });

    // results composition
    s.node('scope', 'caption', { x: 540, y: 430, size: 44, weight: 600, text: 'GET /items · same 10 min', color: T.fg, pill: true, border: T.mid, alpha: 0 });
    s.node('cols', 'caption', { x: 800, y: 522, size: 40, weight: 600, align: 'right', text: 'errors / requests', color: T.mid, alpha: 0 });
    s.node('window', 'bar', { x: 540, y: 975, w: 820, h: 22, ticks: true, seg0: 0, seg0Color: T.fg, alpha: 0 });
    s.node('pauseChip', 'caption', { x: 540, y: 1065, size: 46, weight: 700, text: 'v2 under ' + fmt(MIN_REQS) + ' → Pause', color: AMBER, pill: true, alpha: 0 });
    s.node('delta', 'caption', { x: 540, y: 1065, size: 48, weight: 700, text: P2 + '% − ' + P1 + '% = ' + DELTA + ' points', color: T.fg, pill: true, alpha: 0 });
    s.node('link', 'line', { pts: [[540, 1104], [540, 1166]], arrow: true, draw: 0, color: T.fg });

    // the rule (one object, shown before rollout and again at the decision)
    s.node('rule', 'list', { x: 540, y: 1440, w: 940, header: 'Rule, set before rollout', alpha: 0,
      items: [
        { text: 'Either under ' + fmt(MIN_REQS) + ' requests', out: 'Pause', outColor: AMBER },
        { text: 'v2 errors > v1 + ' + LIMIT + ' points', out: 'Abort', outColor: RED },
        { text: 'Otherwise', out: 'Promote', outColor: GREEN },
      ], row0Alpha: 0, row1Alpha: 0, row2Alpha: 0 });

    // consequence and summary
    s.node('decision', 'caption', { x: 540, y: 1330, size: 52, weight: 800, text: 'Decision: abort', color: RED, pill: true, alpha: 0 });
    s.node('st0', 'caption', { x: 540, y: 1330, size: 48, weight: 700, text: 'Limit traffic', color: T.fg, pill: true, border: T.mid, alpha: 0 });
    s.node('st1', 'caption', { x: 540, y: 1455, size: 48, weight: 700, text: 'Compare both', color: T.fg, pill: true, border: T.mid, alpha: 0 });
    s.node('st2', 'caption', { x: 540, y: 1580, size: 48, weight: 700, text: 'Decide by rule', color: T.fg, pill: true, border: T.mid, alpha: 0 });
    s.node('a01', 'line', { pts: [[540, 1370], [540, 1414]], arrow: true, draw: 0, color: T.mid });
    s.node('a12', 'line', { pts: [[540, 1495], [540, 1539]], arrow: true, draw: 0, color: T.mid });

    /* ---------- sounds: one pitch per actor ---------- */
    const cue = (t, name, note, at, gain) => s.sfx(t, name, { note, pan: at ? s.panOf(at) : 0, gain });
    s.sound('pending', { base: 'A4', gain: 0.38, echo: { delay: 0.11, feedback: 0.3, repeats: 2 },
      layers: [{ type: 'tone', wave: 'sine', attack: 0.01, decay: 0.35, harmonics: [1, 0.2] },
               { type: 'tone', wave: 'sine', ratio: 1.335, delay: 0.16, attack: 0.01, decay: 0.5, harmonics: [1, 0.2] }] });
    s.sound('flat', { base: 'D4', gain: 0.4, layers: [{ type: 'tone', wave: 'sine', attack: 0.005, decay: 0.16, harmonics: [1, 0.4, 0.2] },
               { type: 'tone', wave: 'sine', ratio: 1, delay: 0.14, attack: 0.005, decay: 0.16, harmonics: [1, 0.4, 0.2] }] });
    s.sound('role', { base: 'C5', gain: 0.32, echo: { delay: 0.09, feedback: 0.3, repeats: 2 },
      layers: [{ type: 'tone', wave: 'sine', ratio: 1, attack: 0.004, decay: 0.3, harmonics: [1, 0.2] },
               { type: 'tone', wave: 'sine', ratio: 1.5, delay: 0.1, attack: 0.004, decay: 0.4, harmonics: [1, 0.2] }] });
    // soft swish for a card layout morph (no pitch, so it never reads as an actor)
    s.sound('shift', { gain: 0.3, layers: [{ type: 'noise', lp: 2400, lpTo: 500, hp: 150, attack: 0.08, decay: 0.45, gain: 0.6 }] });

    /* ---------- helpers ---------- */
    // One request marker: source -> router; the router pointer picks a port; marker continues to the version.
    function request(t, target, { loud = true } = {}) {
      const port = target === 'v1' ? 0 : 1, col = target === 'v1' ? V1 : V2, x = target === 'v1' ? 290 : 790;
      s.packet({ route: ['req.bottom', 'router.top'], t, dur: 0.22, kind: 'square', color: T.fg, ease: 'linear', fade: 0.05 });
      const t2 = t + 0.28;
      if (port === 1) { s.set(t + 0.16, 'router', 'pointer', 1, 0.08); s.set(t2 + 0.14, 'router', 'pointer', 0, 0.06); }
      s.set(t + 0.22, 'router', 'port' + port, col, 0.04); s.set(t2 + 0.16, 'router', 'port' + port, T.dim, 0.18);
      s.packet({ route: ['router.port' + port, [x, 815], target + '.top'], t: t2, dur: 0.32, kind: 'square', color: col, ease: 'linear', fade: 0.05 });
      const ta = t2 + 0.32;
      s.pulse(ta, target, null, 0.3);
      s.ripple(ta, target + '.top', col, { r0: 8, r1: 46, dur: 0.4 });
      if (port === 1) cue(ta, 'arrive', 'E5', 'v2', 1);
      else if (loud) cue(ta, 'arrive', 'C5', 'v1', 0.7);
      else cue(ta, 'arrive', 'C5', 'v1', 0.22);
    }
    const show = (t, id, a = 1, d = 0.35) => s.set(t, id, 'alpha', a, d);
    const wireA = (t, id, a, d = 0.35) => s.set(t, 'wire:' + id, 'alpha', a, d);

    /* ---------- B1 0.0–5.6  v1 is the current version; v2 appears; v1 becomes the control ---------- */
    show(0, 'header', 1, 0.4);
    show(0.15, 'req'); show(0.15, 'router'); show(0.15, 'v1'); wireA(0.15, 'in', 1); wireA(0.15, 'w1', 1);
    s.set(0.3, 'router', 'pointer', 0, 0);
    [0.7, 1.4, 2.1].forEach((t) => { cue(t + 0.22, 'send', 'G5', 'router', 0.7); request(t, 'v1'); });
    show(2.9, 'v2', 1, 0.45); wireA(2.9, 'w2', 0.3, 0.45); s.ripple(2.95, 'v2', V2, { r0: 40, r1: 210, dur: 0.7 });
    cue(2.9, 'store', 'E5', 'v2', 0.9);
    s.set(3.9, 'v1', 'sub', 'control', 0); s.set(3.9, 'v1', 'subColor', T.fg, 0.2); s.pulse(3.9, 'v1', null, 0.6);
    s.ripple(3.9, 'v1', V1, { r0: 40, r1: 210, dur: 0.7 }); cue(3.9, 'role', 'C5', 'v1');
    // hold 4.5–5.6: both roles visible, v2 has no traffic yet

    /* ---------- B2 5.6–12.4  the rule is written before any v2 traffic ---------- */
    show(5.6, 'rule', 1, 0.4); show(5.8, 'foot', 1, 0.4); cue(5.6, 'store', 'G4', null, 0.8);
    [[6.4, 0], [7.9, 1], [9.4, 2]].forEach(([t, i]) => {
      s.set(t, 'rule', 'row' + i + 'Alpha', 1, 0.35); cue(t, 'store', 'G4', null, 0.7);
    });
    // hold 9.8–12.0: full rule readable
    show(12.0, 'rule', 0, 0.4);
    for (let i = 0; i < 3; i++) s.set(12.4, 'rule', 'row' + i + 'Alpha', 0, 0);

    /* ---------- B3 12.6–18.6  limited example share; 2 groups of 10 markers, 1 in 10 to v2 ---------- */
    wireA(12.6, 'w2', 1, 0.4); show(12.6, 'share', 1, 0.4); show(12.6, 'shareLbl', 1, 0.4);
    s.set(12.7, 'share', 'seg0', 0.9, 0.6); s.set(12.7, 'share', 'seg1', 0.1, 0.6); cue(12.7, 'store', 'E5', 'v2', 0.7);
    const start = 13.6, gap = 0.23;
    for (let k = 0; k < 20; k++) {
      const t = start + k * gap + (k >= 10 ? 0.5 : 0);
      const target = k % 10 === 4 ? 'v2' : 'v1';
      if (k % 10 === 0) cue(t + 0.2, 'send', 'G5', 'router', 0.8);
      request(t, target, { loud: k % 10 === 0 });
    }
    // last arrival ≈ 18.9; hold to 19.4

    /* ---------- B4 19.4–23.4  contrast: a timer that only widens the share is not an evaluation ---------- */
    show(19.4, 'clock', 1, 0.35); show(19.4, 'timerLbl', 1, 0.35);
    s.set(19.6, 'clock', 'time', 3, 2.6, 'linear');
    for (let t = 19.6; t < 22.2; t += 0.4) cue(t, 'clock', 'A6', 'clock', 0.8);
    s.set(20.2, 'share', 'seg0', 0.7, 0.4); s.set(20.2, 'share', 'seg1', 0.3, 0.4); s.set(20.6, 'shareLbl', 'text', 'Example split 70 / 30', 0);
    cue(20.2, 'flat', 'D4', 'share');
    s.set(21.2, 'share', 'seg0', 0.4, 0.4); s.set(21.2, 'share', 'seg1', 0.6, 0.4); s.set(21.6, 'shareLbl', 'text', 'Example split 40 / 60', 0);
    cue(21.2, 'flat', 'D4', 'share');
    s.ripple(22.3, 'clock', RED, { r0: 20, r1: 74, dur: 0.8, mark: 'x' }); s.shake(22.3, 'clock', 10, 0.4);
    s.set(22.3, 'clock', 'color', RED, 0.1); s.set(22.3, 'timerLbl', 'text', 'No comparison', 0); s.set(22.3, 'timerLbl', 'color', RED, 0.1);
    cue(22.3, 'thump', 'E4', 'clock', 0.9);
    s.set(22.9, 'share', 'seg0', 0.9, 0.5); s.set(22.9, 'share', 'seg1', 0.1, 0.5); s.set(23.3, 'shareLbl', 'text', 'Example split 90 / 10', 0);
    // brief hold 23.4–24.0 on the restored limited share

    /* ---------- B5 24.0–31.6  compare like outcomes: same operation, same window, both versions ---------- */
    for (const id of ['req', 'router', 'share', 'shareLbl', 'clock', 'timerLbl']) show(24.0, id, 0, 0.35);
    for (const w of ['in', 'w1', 'w2']) wireA(24.0, w, 0, 0.35);
    s.set(24.0, 'router', 'pointer', -1, 0);
    // Card morph in two overlapping steps (vertical, horizontal) so the two cards never cross.
    const morph = (tv, th, id, x, y, w, h, L) => {
      s.set(tv, id, 'y', y, 0.6); s.set(tv, id, 'h', h, 0.6);
      s.set(th, id, 'x', x, 0.7); s.set(th, id, 'w', w, 0.7); s.set(th, id, 'layout', L, 0.7);
    };
    morph(24.3, 24.5, 'v1', 540, 640, 900, 150, 1); morph(25.0, 25.0, 'v2', 540, 820, 900, 150, 1);
    cue(24.3, 'shift', null, 'v1', 0.9); cue(25.0, 'shift', null, 'v2', 0.9);
    show(25.5, 'scope', 1, 0.35); show(25.5, 'cols', 1, 0.35); cue(25.5, 'ack', 'G4', null, 0.9);
    s.set(25.9, 'v1', 'valAlpha', 1, 0.3); s.set(25.9, 'v2', 'valAlpha', 1, 0.3); show(25.9, 'window', 1, 0.3);
    const W0 = 26.2, W1 = 29.4;
    s.set(W0, 'window', 'seg0', 1, W1 - W0, 'linear'); cue(W0, 'clock', 'A6', 'window', 1.2);
    for (const id of ['v1', 'v2']) { s.set(W0, id, 'reqs', DATA[id].reqs, W1 - W0, 'linear'); s.set(W0, id, 'errs', DATA[id].errs, W1 - W0, 'linear'); }
    for (let t = W0 + 0.4; t < W1 - 0.1; t += 0.4) { cue(t, 'arrive', 'C5', 'v1', 0.12); cue(t + 0.2, 'arrive', 'E5', 'v2', 0.12); }
    // while v2 has fewer than MIN_REQS the rule says pause (v2 passes 1,000 exactly at window end)
    show(26.5, 'pauseChip', 1, 0.3); cue(26.5, 'pending', 'A4', null);
    s.pulse(26.5, 'pauseChip', null, 0.5);
    s.mark(W1, 'window', 1, T.fg); cue(W1, 'clock', 'A6', 'window', 1.2);
    show(W1 - 0.2, 'pauseChip', 0, 0.18); // gone before v2 reaches the minimum
    s.set(29.9, 'v1', 'pct', P1 + '%', 0); s.set(29.9, 'v1', 'pctAlpha', 1, 0.25); cue(29.9, 'store', 'C5', null, 0.9); s.pulse(29.9, 'v1', null, 0.4);
    s.set(30.2, 'v2', 'pct', P2 + '%', 0); s.set(30.2, 'v2', 'pctAlpha', 1, 0.25); cue(30.2, 'store', 'E5', null, 0.9); s.pulse(30.2, 'v2', null, 0.4);
    show(31.0, 'delta', 1, 0.3); s.pulse(31.0, 'delta', null, 0.5); cue(31.0, 'ack', 'G4', null, 1);
    // hold 31.2–32.4 on the completed comparison

    /* ---------- B6 32.4–37.0  the same rule turns the comparison into a decision ---------- */
    s.set(32.3, 'rule', 'y', 1388, 0); s.set(32.3, 'rule', 'header', 'Same rule, set before rollout', 0);
    for (let i = 0; i < 3; i++) s.set(32.4, 'rule', 'row' + i + 'Alpha', 1, 0);
    show(32.4, 'rule', 1, 0.4); cue(32.4, 'store', 'G4', null, 0.8);
    s.set(33.2, 'link', 'draw', 1, 0.35); cue(33.2, 'send', 'G4', null, 1.4);
    s.set(33.9, 'rule', 'row0Mark', 'no', 0); s.set(33.9, 'rule', 'row0Dim', 1, 0.3); cue(33.9, 'ack', 'G4', null, 0.9);
    s.set(34.8, 'rule', 'row1Mark', 'yes', 0); s.set(34.8, 'rule', 'row1Hi', 1, 0.2); cue(34.8, 'thump', 'G3', null, 1);
    s.set(35.2, 'rule', 'row2Dim', 1, 0.3);
    // hold 35.4–37.0 on Abort selected

    /* ---------- B7 37.0–42.6  chosen action: stop new v2 traffic; v1 keeps serving ---------- */
    for (const id of ['rule', 'delta', 'link', 'scope', 'cols', 'window']) show(37.0, id, 0, 0.35);
    s.clearMarks(37.4, 'window');
    s.set(37.0, 'v1', 'valAlpha', 0, 0.3); s.set(37.0, 'v2', 'valAlpha', 0, 0.3); s.set(37.0, 'v1', 'pctAlpha', 0, 0.3); s.set(37.0, 'v2', 'pctAlpha', 0, 0.3);
    morph(37.3, 37.3, 'v2', 790, 975, 400, 190, 0); morph(38.2, 37.8, 'v1', 290, 975, 400, 190, 0);
    cue(37.3, 'shift', null, 'v2', 0.9); cue(37.8, 'shift', null, 'v1', 0.9);
    show(38.8, 'req'); show(38.8, 'router'); show(38.8, 'share'); show(38.8, 'shareLbl');
    for (const w of ['in', 'w1', 'w2']) wireA(38.8, w, 1);
    s.set(38.8, 'router', 'pointer', 0, 0);
    cue(38.8, 'send', 'G5', 'router', 0.6);
    show(39.3, 'decision', 1, 0.25); s.pulse(39.3, 'decision', null, 0.5); cue(39.3, 'thump', 'G3', null, 0.8);
    s.set(40.1, 'share', 'seg0', 1, 0.8); s.set(40.1, 'share', 'seg1', 0, 0.8);
    s.set(40.1, 'wire:w2', 'dashed', 1, 0); s.set(40.1, 'wire:w2', 'alpha', 0.4, 0.6);
    s.set(40.1, 'v2', 'color', V2DIM, 0.6); s.set(40.1, 'v2', 'titleColor', V2DIM, 0.6);
    cue(40.1, 'poof', 'C5', 'v2', 0.7);
    s.set(40.9, 'shareLbl', 'text', 'v2: no new traffic', 0); cue(40.9, 'ack', 'G4', 'share', 0.8);
    cue(41.4 + 0.22, 'send', 'G5', 'router', 0.8); request(41.4, 'v1');
    request(42.0, 'v1');
    // hold 42.6–43.2

    /* ---------- B8 43.0–47.0  the mechanism in three steps; finite ending ---------- */
    show(43.0, 'decision', 0, 0.3);
    show(43.3, 'st0', 1, 0.3); cue(43.3, 'store', 'G4', null, 0.7);
    s.set(43.8, 'a01', 'draw', 1, 0.25); show(43.9, 'st1', 1, 0.3); cue(43.9, 'store', 'G4', null, 0.7);
    s.set(44.4, 'a12', 'draw', 1, 0.25); show(44.5, 'st2', 1, 0.3); cue(44.5, 'store', 'G4', null, 0.7);
    // hold 44.8–46.5, then fade the whole frame including the header
    s.fade(46.5, 1, 0.7); show(46.5, 'header', 0, 0.7);
  },
});
