/* Agent evals — motion-v2 lesson 05: Know the grading limits.
 * One mechanism: a suite of representative tasks (a known bug, behaviour that must keep working, an
 * explanation) with a held-out set kept apart; code tests grade exact outcomes and a rubric grader grades
 * the explanation; a human audit of the rubric against its criterion finds a false pass and a false
 * failure, so the rubric needs recalibration; the evidence is stated with its limits and release stays
 * undecided.
 * Render from the repository root (pinned puppeteer-core from root node_modules):
 *   node video/agent-evals/motion-v2/05/engine/render.mjs video/agent-evals/motion-v2/05/scene.js video/agent-evals/motion-v2/05/video.mp4 --sheet video/agent-evals/motion-v2/05/scratch/contact-sheet.png
 * Local engine copy: 'panel', 'txt' (reveal, hl, bar, strike), 'tick', chip size, meta.subtitleSize.
 */
FlowVideo.scene({
  meta: { title: 'Agent evals', subtitle: 'KNOW THE GRADING LIMITS', subtitleSize: 38, duration: 44.7, fps: 30, speed: 1 },
  build(s) {
    const T = s.THEME;
    // Pacing: everything authored from 8.0 s onward plays 1.3 s earlier (shortens the opening hold).
    const SHIFT = (t) => (t >= 7.9 ? t - 1.3 : t);
    const _set = s.set, _sfx = s.sfx, _packet = s.packet;
    s.set = (t, ...a) => _set(SHIFT(t), ...a);
    s.sfx = (t, ...a) => _sfx(SHIFT(t), ...a);
    s.packet = (o) => _packet(Object.assign({}, o, { t: SHIFT(o.t) }));
    const pan = (a) => s.panOf(a);
    const show = (t, id, d = 0.3) => s.set(t, id, 'alpha', 1, d);
    const flash = (t, id, color, hold = 0.6) => { s.set(t, id, 'hlColor', color, 0); s.set(t, id, 'hl', 1, 0.15); s.set(t + hold, id, 'hl', 0, 0.4); };
    const lightPanel = (t, id, c = T.mid) => { s.set(t, id, 'color', c, 0.3); s.set(t, id, 'titleColor', T.fg, 0.3); };

    // ---- suite: representative tasks, one set kept apart ----
    s.node('suite', 'panel', { x: 540, y: 620, w: 960, h: 310, title: 'SUITE', color: T.dim, titleColor: T.mid });
    const SY = [578, 634, 690];
    const TASKS = [['empty pw', 'known bug'], ['valid pw', 'must work'], ['explain', 'clarity']];
    TASKS.forEach(([n, r], i) => {
      s.node('sn' + i, 'txt', { x: 100, y: SY[i], text: n, size: 40, mono: true, weight: 700, color: T.fg, alpha: 0, hlW: 192 });
      s.node('sr' + i, 'txt', { x: 330, y: SY[i], text: r, size: 38, mono: true, color: T.mid, alpha: 0 });
      s.node('sg' + i, 'txt', { x: 640, y: SY[i], text: i < 2 ? 'code' : 'rubric', size: 38, mono: true, weight: 700, color: i < 2 ? T.fg : T.accent, alpha: 0 });
      s.node('sm' + i, 'tick', { x: 930, y: SY[i] - 2, r: 18, color: i < 2 ? T.ok : T.accent });
    });
    s.node('sq', 'txt', { x: 930, y: SY[2], text: '?', size: 46, mono: true, weight: 700, color: T.accent, align: 'center', alpha: 0 });
    s.node('hoN', 'txt', { x: 100, y: 746, text: 'held-out', size: 40, mono: true, weight: 700, color: T.mid, alpha: 0, hlW: 192 });
    s.node('hoR', 'txt', { x: 330, y: 746, text: 'kept apart', size: 38, mono: true, color: T.mid, alpha: 0 });
    s.node('hoS', 'txt', { x: 640, y: 746, text: 'not run', size: 38, mono: true, color: T.mid, alpha: 0, hlW: 168 });
    s.wire('sep', [90, 716], [990, 716]);
    s.set(0, 'wire:sep', 'alpha', 0, 0); s.set(0, 'wire:sep', 'dashed', 1, 0);

    // ---- graders suited to each criterion ----
    s.node('graders', 'panel', { x: 540, y: 925, w: 960, h: 250, title: 'GRADERS', color: T.dim, titleColor: T.mid });
    const GR = [['code tests', 'exact outcome', T.info], ['rubric', 'judgement', T.accent], ['human review', 'calibration', T.fg]];
    const GY = [900, 952, 1004];
    GR.forEach(([n, r, c], i) => {
      s.node('gn' + i, 'txt', { x: 100, y: GY[i], text: n, size: 40, mono: true, weight: 700, color: c, alpha: 0 });
      s.node('gr' + i, 'txt', { x: 480, y: GY[i], text: r, size: 38, mono: true, color: T.mid, alpha: 0, hlW: 264 });
    });
    // grader → suite routes in the left margin
    s.wire('gc', [60, GY[0]], [60, SY[0]], { via: [[36, GY[0]], [36, SY[0]]] });
    s.wire('gq', [60, GY[1]], [60, SY[2]], { via: [[36, GY[1]], [36, SY[2]]] });
    s.set(0, 'wire:gc', 'alpha', 0, 0); s.set(0, 'wire:gq', 'alpha', 0, 0);

    // ---- rubric audit against its criterion ----
    s.node('audit', 'panel', { x: 540, y: 1280, w: 960, h: 410, title: 'RUBRIC AUDIT', color: T.dim, titleColor: T.mid });
    s.node('crit', 'txt', { x: 100, y: 1188, text: 'criterion: names the input', size: 40, mono: true, color: T.accent, alpha: 0, hlW: 624 });
    s.node('aR', 'txt', { x: 100, y: 1262, text: 'A "Improved security"', size: 40, mono: true, weight: 700, color: T.fg, reveal: 0, alpha: 0 });
    s.node('aTag', 'txt', { x: 680, y: 1262, text: 'no input', size: 36, mono: true, color: T.bad, alpha: 0 });
    s.node('bR1', 'txt', { x: 100, y: 1392, text: 'B "Reject ', size: 40, mono: true, weight: 700, color: T.fg, alpha: 0 });
    s.node('bR2', 'txt', { x: 340, y: 1392, text: 'empty passwords"', size: 40, mono: true, weight: 700, color: T.fg, alpha: 0, hlW: 360 });
    const G = [{ y: 1316, auto: 'auto PASS', hum: 'human FAIL', verd: 'false pass' }, { y: 1446, auto: 'auto FAIL', hum: 'human PASS', verd: 'false fail' }];
    G.forEach((g, i) => {
      s.node('au' + i, 'txt', { x: 100, y: g.y, text: g.auto, size: 38, mono: true, color: T.accent, alpha: 0 });
      s.node('hu' + i, 'txt', { x: 360, y: g.y, text: g.hum, size: 38, mono: true, color: T.fg, alpha: 0 });
      s.node('vd' + i, 'txt', { x: 990, y: g.y, text: g.verd, size: 40, mono: true, weight: 700, color: T.bad, align: 'right', alpha: 0, hlW: 240 });
    });

    // ---- evidence with stated limits ----
    s.node('ev', 'panel', { x: 540, y: 1625, w: 960, h: 230, title: 'EVIDENCE', status: '', statusColor: T.mid, color: T.dim, titleColor: T.mid });
    s.node('e1', 'txt', { x: 100, y: 1632, text: 'held-out   not run', size: 42, mono: true, color: T.fg, alpha: 0 });
    s.node('e2', 'txt', { x: 100, y: 1692, text: 'release    not decided', size: 42, mono: true, color: T.fg, alpha: 0 });

    // ==== Beat 1: representative tasks; some kept apart (0–8) ====
    let t = 0.6;
    lightPanel(t, 'suite'); s.sfx(t, 'arrive', { note: 'C5', pan: 0 });
    TASKS.forEach((x, i) => {
      const ti = 1.3 + i * 0.6;
      show(ti, 'sn' + i); show(ti, 'sr' + i);
      s.sfx(ti, 'store', { note: 'C5', gain: 0.8, pan: -0.3 });
    });
    t = 3.6;
    s.set(t, 'wire:sep', 'alpha', 1, 0.3); show(t, 'hoN'); show(t, 'hoR'); show(t, 'hoS');
    s.sfx(t, 'ack', { note: 'C4', gain: 1.4, pan: 0 });

    // ==== Beat 2: graders suited to each criterion (8–16.5) ====
    t = 8.0;
    lightPanel(t, 'graders'); show(t, 'gn0'); show(t, 'gr0'); s.sfx(t, 'store', { note: 'E5', pan: -0.3 });
    t = 8.6; show(t, 'gn1'); show(t, 'gr1'); s.sfx(t, 'store', { note: 'G5', pan: -0.3 });
    t = 9.6;    // code tests check the exact outcomes
    s.set(t, 'wire:gc', 'alpha', 1, 0.2); s.set(t, 'wire:gc', 'color', T.info, 0); s.set(t, 'wire:gc', 'flow', 1, 0);
    s.packet({ route: [[60, GY[0]], [36, GY[0]], [36, SY[0]], [60, SY[0]]], t, dur: 1.0, kind: 'dot', color: T.info });
    s.packet({ route: [[60, GY[0]], [36, GY[0]], [36, SY[1]], [60, SY[1]]], t: t + 0.15, dur: 0.9, kind: 'dot', color: T.info });
    s.sfx(t, 'send', { note: 'E6', gain: 0.9, pan: -0.8 });
    [0, 1].forEach((i) => {
      const tm = 10.7 + i * 0.3;
      show(tm, 'sg' + i, 0.2); s.set(tm, 'sm' + i, 'draw', 1, 0.2, 'out');
      s.sfx(tm, 'ack', { note: 'E5', gain: 1.5, pan: pan([930, 0]) });
    });
    s.set(11.2, 'wire:gc', 'alpha', 0, 0.4); s.set(11.2, 'wire:gc', 'flow', 0, 0);
    t = 11.8;   // the rubric grader judges the explanation: a softer mark
    s.set(t, 'wire:gq', 'alpha', 1, 0.2); s.set(t, 'wire:gq', 'color', T.accent, 0); s.set(t, 'wire:gq', 'flow', 1, 0);
    s.packet({ route: [[60, GY[1]], [36, GY[1]], [36, SY[2]], [60, SY[2]]], t, dur: 1.1, kind: 'dot', color: T.accent });
    s.sfx(t, 'send', { note: 'G6', gain: 0.9, pan: -0.8 });
    t = 12.9;
    show(t, 'sg2', 0.2); s.set(t, 'sm2', 'draw', 1, 0.6, 'linear');
    s.sfx(t, 'arrive', { note: 'G5', gain: 0.8, pan: pan([930, 0]) });
    s.set(t + 0.4, 'wire:gq', 'alpha', 0, 0.4); s.set(t + 0.4, 'wire:gq', 'flow', 0, 0);
    t = 14.0;   // some judgements need human calibration
    show(t, 'gn2'); show(t, 'gr2'); s.sfx(t, 'ack', { note: 'C6', gain: 1.4, pan: -0.3 });

    // ==== Beat 3: audit the rubric; a false pass and a false failure (16.5–35) ====
    t = 16.5;
    lightPanel(t, 'audit'); show(t, 'crit'); flash(t, 'crit', T.accent, 0.8);
    flash(t, 'gn2', T.fg, 0.8);
    s.sfx(t, 'arrive', { note: 'C6', gain: 0.9, pan: 0 });
    t = 17.8;   // sample A
    show(t, 'aR', 0.1); s.set(t, 'aR', 'reveal', 1, 0.8, 'linear');
    s.sfx(t, 'store', { note: 'C5', gain: 0.8, pan: -0.3 });
    t = 19.2; show(t, 'au0'); s.sfx(t, 'ack', { note: 'G5', gain: 1.3, pan: -0.3 });
    t = 21.6;   // reviewer checks A against the criterion
    flash(t, 'crit', T.accent, 1.2); flash(t + 0.4, 'aR', T.bad, 1.0);
    s.sfx(t, 'ack', { note: 'C6', gain: 1.2, pan: 0 });
    t = 22.6; show(t, 'aTag', 0.2);
    t = 23.4; show(t, 'hu0'); s.sfx(t, 'thump', { note: 'C4', gain: 0.8, pan: 0 });
    t = 24.4; show(t, 'vd0', 0.2); flash(t, 'vd0', T.bad, 0.8); s.sfx(t, 'miss', { gain: 0.8, pan: 0.5 });
    t = 26.8;   // sample B
    show(t, 'bR1', 0.3); show(t, 'bR2', 0.3);
    s.sfx(t, 'store', { note: 'C5', gain: 0.8, pan: -0.3 });
    t = 28.0; show(t, 'au1'); s.sfx(t, 'ack', { note: 'G5', gain: 1.3, pan: -0.3 });
    t = 30.2;   // the response does name the input
    flash(t, 'crit', T.accent, 1.2); s.set(t + 0.4, 'bR2', 'barColor', T.ok, 0); s.set(t + 0.4, 'bR2', 'bar', 1, 0.6, 'linear');
    s.sfx(t, 'ack', { note: 'C6', gain: 1.2, pan: 0 });
    t = 31.4; show(t, 'hu1'); s.sfx(t, 'chime', { note: 'C6', gain: 0.6, pan: 0 });
    t = 32.4; show(t, 'vd1', 0.2); flash(t, 'vd1', T.bad, 0.8); s.sfx(t, 'miss', { gain: 0.8, pan: 0.5 });
    t = 33.8;   // the rubric's marks are not yet trustworthy
    s.set(t, 'gr1', 'text', 'recalibrate', 0); s.set(t, 'gr1', 'color', T.bad, 0); flash(t, 'gr1', T.bad, 0.9);
    s.set(t, 'sm2', 'alpha', 0, 0.3); show(t + 0.2, 'sq', 0.3);
    s.sfx(t, 'thump', { note: 'G3', gain: 1.0, pan: -0.3 });

    // ==== Beat 4: use the evidence with stated limits (37–46) ====
    t = 37.0;
    lightPanel(t, 'ev'); show(t, 'e1'); flash(t, 'hoN', T.mid, 0.9); flash(t, 'hoS', T.mid, 0.9);
    s.sfx(t, 'store', { note: 'C5', pan: 0 });
    t = 38.2; show(t, 'e2'); s.sfx(t, 'ack', { note: 'C4', gain: 1.4, pan: 0 });
    t = 39.4;
    s.set(t, 'ev', 'status', 'for review', 0); s.set(t, 'ev', 'statusColor', T.fg, 0);
    s.set(t, 'ev', 'color', T.fg, 0.3);
    s.pulse(t, 'suite');
    s.sfx(t, 'ack', { note: 'C5', gain: 1.3, pan: 0 });

    s.fade(44.0, 1, 1.0);
    s.meta.duration = 44.7;   // 46.0 authored, minus the 1.3 s shift
  },
});
