/* Agent evals — motion-v2 lesson 03: Catch an overbroad fix.
 * One mechanism: Patch A answers every login with REJECT. Both required expectations are fixed first
 * (empty → reject, valid → accept). Each case runs through the same unchanged line and comes back "reject":
 * the empty case passes, the valid case fails, and the grader rejects the patch. Checking only the new
 * case would have passed it.
 * Render from the repository root (pinned puppeteer-core from root node_modules):
 *   node video/agent-evals/motion-v2/03/engine/render.mjs video/agent-evals/motion-v2/03/scene.js video/agent-evals/motion-v2/03/video.mp4 --sheet video/agent-evals/motion-v2/03/scratch/contact-sheet.png
 * Local engine copy: 'panel', 'txt' (now with strike), 'tick' (check or x), chip size, meta.subtitleSize.
 */
FlowVideo.scene({
  meta: { title: 'Agent evals', subtitle: 'CATCH AN OVERBROAD FIX', subtitleSize: 38, duration: 42, fps: 30, speed: 1 },
  build(s) {
    const T = s.THEME;
    const pan = (a) => s.panOf(a);
    const show = (t, id, d = 0.3) => s.set(t, id, 'alpha', 1, d);
    const flash = (t, id, color, hold = 0.6) => { s.set(t, id, 'hlColor', color, 0); s.set(t, id, 'hl', 1, 0.15); s.set(t + hold, id, 'hl', 0, 0.4); };
    const XE = 465, XO = 725, XM = 935;            // expected column, observed column, mark column
    const ROWS = [{ y: 915, name: 'empty', exp: 'reject', note: 'C6', ok: true }, { y: 1085, name: 'valid', exp: 'accept', note: 'D6', ok: false }];

    // ---- row highlight frames (drawn first, behind the cells) ----
    ROWS.forEach((r, i) => s.node('rowbox' + i, 'panel', { x: 540, y: r.y, w: 960, h: 158, r: 18, color: T.dim, alpha: 0 }));

    // ---- Patch A: one line answers every input ----
    s.node('patch', 'panel', { x: 540, y: 595, w: 900, h: 250, title: 'PATCH A', color: T.dim, titleColor: T.mid });
    s.node('code1', 'txt', { x: 130, y: 603, text: 'login(password):', size: 46, mono: true, color: T.fg, reveal: 0 });
    s.node('code2', 'txt', { x: 130, y: 675, text: '  return REJECT', size: 46, mono: true, weight: 700, color: T.accent, reveal: 0, hlW: 420 });

    // ---- required checks: case × expected / observed ----
    s.node('hCase', 'txt', { x: 110, y: 805, text: 'case', size: 38, color: T.mid, alpha: 0 });
    s.node('hExp', 'txt', { x: XE, y: 805, text: 'expected', size: 38, color: T.mid, align: 'center', alpha: 0 });
    s.node('hObs', 'txt', { x: XO, y: 805, text: 'observed', size: 38, color: T.mid, align: 'center', alpha: 0 });
    ROWS.forEach((r, i) => {
      s.node('lab' + i, 'txt', { x: 110, y: r.y - 20, text: r.name, size: 48, mono: true, weight: 700, color: T.fg, alpha: 0 });
      s.node('lab' + i + 'b', 'txt', { x: 110, y: r.y + 30, text: 'password', size: 36, mono: true, color: T.mid, alpha: 0 });
      s.node('ec' + i, 'panel', { x: XE, y: r.y, w: 230, h: 120, r: 14, color: T.dim, alpha: 0 });
      s.node('oc' + i, 'panel', { x: XO, y: r.y, w: 230, h: 120, r: 14, color: T.dim, alpha: 0 });
      s.node('ev' + i, 'txt', { x: XE, y: r.y, text: r.exp, size: 50, mono: true, weight: 700, color: T.accent, align: 'center', alpha: 0, hlW: 180 });
      s.node('ov' + i, 'txt', { x: XO, y: r.y, text: '—', size: 50, mono: true, weight: 700, color: T.dim, align: 'center', alpha: 0, hlW: 180 });
      s.node('mk' + i, 'tick', { x: XM, y: r.y - 24, r: 24, shape: r.ok ? 'check' : 'x', color: r.ok ? T.ok : T.bad });
      s.node('vd' + i, 'txt', { x: XM, y: r.y + 38, text: r.ok ? 'PASS' : 'FAIL', size: 38, mono: true, weight: 700, color: r.ok ? T.ok : T.bad, align: 'center', alpha: 0 });
      // request (left gutter) and return (right gutter) routes, shown only while used
      s.wire('req' + i, [60, r.y], [90, 595], { via: [[38, r.y], [38, 595]] });
      s.wire('ret' + i, [990, 650], [842, r.y], { via: [[1046, 650], [1046, r.y]] });
      s.set(0, 'wire:req' + i, 'alpha', 0, 0); s.set(0, 'wire:ret' + i, 'alpha', 0, 0);
    });

    // ---- grader ----
    s.node('grader', 'panel', { x: 540, y: 1395, w: 920, h: 280, title: 'GRADER', status: 'not graded', statusColor: T.mid, color: T.dim, titleColor: T.mid });
    s.node('g1', 'txt', { x: 130, y: 1402, text: 'empty only    → pass', size: 42, mono: true, color: T.fg, alpha: 0 });
    s.node('g2', 'txt', { x: 130, y: 1482, text: 'empty + valid → REJECT', size: 42, mono: true, weight: 700, color: T.bad, alpha: 0 });
    s.wire('collect', [1026, 842], [1026, 1158], { via: [[1046, 842], [1046, 1158]] });
    s.wire('toGrader', [1046, 1158], [1006, 1395], { via: [[1046, 1395]] });
    s.set(0, 'wire:collect', 'alpha', 0, 0); s.set(0, 'wire:toGrader', 'alpha', 0, 0);

    // ==== Beat 1: Patch A rejects every login; both expectations are fixed first (0–8) ====
    let t = 0.6;
    s.set(t, 'patch', 'color', T.mid, 0.3); s.set(t, 'patch', 'titleColor', T.fg, 0.3);
    s.set(t, 'code1', 'reveal', 1, 0.8, 'linear');
    s.sfx(t, 'arrive', { note: 'E5', pan: 0 });
    t = 1.7;
    s.set(t, 'code2', 'reveal', 1, 0.8, 'linear');
    s.sfx(t + 0.8, 'work', { note: 'E4', gain: 1.4, pan: 0 });
    s.set(t + 0.8, 'code2', 'hlColor', T.accent, 0); s.set(t + 0.8, 'code2', 'hl', 1, 0.15); s.set(t + 1.6, 'code2', 'hl', 0, 0.4);
    t = 3.4;
    for (const id of ['hCase', 'hExp', 'hObs']) show(t, id);
    ROWS.forEach((r, i) => {
      const tr = t + i * 1.0;
      for (const id of ['lab' + i, 'lab' + i + 'b', 'ec' + i, 'oc' + i, 'ev' + i, 'ov' + i]) show(tr, id);
      s.set(tr, 'ec' + i, 'color', T.mid, 0); s.set(tr, 'oc' + i, 'color', T.dim, 0);
      flash(tr, 'ev' + i, T.accent);
      s.sfx(tr, 'store', { note: 'G5', pan: pan([XE, 0]) });
    });

    // one case runs through the same patch
    const run = (t0, i) => {
      const r = ROWS[i];
      s.set(t0, 'rowbox' + i, 'alpha', 1, 0.2); s.set(t0, 'rowbox' + i, 'color', T.accent, 0.2);
      s.set(t0, 'lab' + i, 'color', T.accent, 0.2); s.set(t0 + 1.6, 'lab' + i, 'color', T.fg, 0.4);
      // request: case → left gutter → patch
      let t = t0 + 0.5;
      s.set(t, 'wire:req' + i, 'alpha', 1, 0.2); s.set(t, 'wire:req' + i, 'color', T.fg, 0); s.set(t, 'wire:req' + i, 'flow', 1, 0);
      s.packet({ route: [[60, r.y], [38, r.y], [38, 595], [90, 595]], t, dur: 1.2, kind: 'dot', color: T.fg });
      s.sfx(t, 'send', { note: r.note, gain: 1.0, pan: -0.6 });
      t += 1.2;
      s.set(t, 'wire:req' + i, 'alpha', 0, 0.4); s.set(t, 'wire:req' + i, 'flow', 0, 0);
      s.set(t, 'patch', 'color', T.fg, 0.2); s.set(t, 'patch', 'glow', 0.6, 0.2);
      s.set(t, 'code2', 'hlColor', T.accent, 0); s.set(t, 'code2', 'hl', 1, 0.15);
      s.sfx(t, 'arrive', { note: 'E5', pan: 0 });
      s.sfx(t + 0.35, 'work', { note: 'E4', gain: 1.4, pan: 0 });
      // the same line answers: REJECT
      t += 0.8;
      s.set(t, 'code2', 'hl', 0, 0.4); s.set(t, 'patch', 'glow', 0, 0.4); s.set(t, 'patch', 'color', T.mid, 0.4);
      s.set(t, 'wire:ret' + i, 'alpha', 1, 0.2); s.set(t, 'wire:ret' + i, 'color', T.fg, 0); s.set(t, 'wire:ret' + i, 'flow', 1, 0);
      s.packet({ route: [[990, 650], [1046, 650], [1046, r.y], [842, r.y]], t, dur: 1.3, kind: 'dot', color: T.mid });
      t += 1.3;
      s.set(t, 'wire:ret' + i, 'alpha', 0, 0.4); s.set(t, 'wire:ret' + i, 'flow', 0, 0);
      s.set(t, 'ov' + i, 'text', 'reject', 0); s.set(t, 'ov' + i, 'color', T.fg, 0);
      s.set(t, 'oc' + i, 'color', T.fg, 0.2);
      flash(t, 'ov' + i, T.fg);
      s.sfx(t, 'deliver', { note: 'E5', gain: 1.3, pan: pan([XO, 0]) });
      return t;   // time the observation landed
    };
    const compare = (t, i) => {
      flash(t, 'ev' + i, T.accent, 1.6); s.sfx(t, 'ack', { note: 'G5', gain: 1.3, pan: pan([XE, 0]) });
      flash(t + 0.7, 'ov' + i, T.accent, 0.9); s.sfx(t + 0.7, 'ack', { note: 'G5', gain: 1.3, pan: pan([XO, 0]) });
      const tv = t + 1.4, ok = ROWS[i].ok, c = ok ? T.ok : T.bad;
      s.set(tv, 'mk' + i, 'draw', 1, 0.35, 'out'); show(tv, 'vd' + i, 0.2);
      s.set(tv, 'ov' + i, 'color', c, 0.2); s.set(tv, 'oc' + i, 'color', c, 0.2);
      s.set(tv, 'rowbox' + i, 'color', ok ? T.dim : T.bad, 0.3);
      if (ok) s.sfx(tv, 'hit', { note: 'G5', gain: 1.0, pan: pan([XM, 0]) });
      else s.sfx(tv, 'thump', { note: 'G3', gain: 1.1, pan: pan([XM, 0]) });
      return tv;
    };

    // ==== Beat 2: the empty-password expectation passes (8–17.5) ====
    const land0 = run(8.0, 0);                 // ≈ 11.8
    const v0 = compare(land0 + 1.9, 0);        // ≈ 15.1
    s.set(v0 + 1.0, 'rowbox0', 'alpha', 0, 0.5);

    // ==== Beat 3: the valid-password expectation fails (17.5–28) ====
    const land1 = run(17.5, 1);                // ≈ 21.3
    const v1 = compare(land1 + 2.4, 1);        // ≈ 25.1

    // ==== Beat 4: the grader rejects the overbroad fix (28.5–42) ====
    t = 28.5;
    s.set(t, 'wire:collect', 'alpha', 1, 0.4); s.set(t, 'wire:collect', 'color', T.fg, 0.4);
    s.set(t, 'rowbox0', 'alpha', 1, 0.3); s.set(t, 'rowbox0', 'color', T.ok, 0.3);
    s.sfx(t, 'ack', { note: 'G4', gain: 1.4, pan: 0.6 });
    t = 29.2;
    s.set(t, 'wire:toGrader', 'alpha', 1, 0.2); s.set(t, 'wire:toGrader', 'color', T.fg, 0); s.set(t, 'wire:toGrader', 'flow', 1, 0);
    s.packet({ route: [[1046, 1158], [1046, 1395], [1006, 1395]], t, dur: 0.9, kind: 'dot', color: T.fg });
    s.sfx(t, 'send', { note: 'G6', gain: 1.0, pan: 0.6 });
    t = 30.1;
    s.set(t, 'wire:toGrader', 'flow', 0, 0); s.set(t, 'wire:toGrader', 'color', T.wire, 0.4);
    s.set(t, 'grader', 'color', T.fg, 0.2); s.set(t, 'grader', 'glow', 0.5, 0.2); s.set(t, 'grader', 'titleColor', T.fg, 0.2);
    s.set(t, 'grader', 'status', 'grading', 0); s.set(t, 'grader', 'statusColor', T.accent, 0);
    s.sfx(t, 'arrive', { note: 'G5', pan: 0 });
    s.set(t + 0.6, 'grader', 'glow', 0, 0.5);
    t = 31.0;   // what a grader that checked only the new case would conclude
    show(t, 'g1'); s.sfx(t, 'ack', { note: 'G5', gain: 1.0, pan: 0 });
    t = 32.8;   // ...is not enough
    s.set(t, 'g1', 'strike', 1, 0.5, 'linear'); s.set(t + 0.5, 'g1', 'color', T.mid, 0.4);
    s.sfx(t, 'miss', { gain: 0.7, pan: 0 });
    t = 34.0;
    show(t, 'g2', 0.25); flash(t, 'g2', T.bad, 0.9);
    s.set(t, 'grader', 'status', 'rejected', 0); s.set(t, 'grader', 'statusColor', T.bad, 0);
    s.set(t, 'grader', 'color', T.bad, 0.3);
    s.set(t, 'wire:collect', 'color', T.mid, 0.6); s.set(t, 'rowbox0', 'color', T.dim, 0.6); s.set(t, 'rowbox0', 'alpha', 0, 0.6);
    s.sfx(t, 'store', { note: 'G4', gain: 1.2, pan: 0 });
    t = 35.0;   // the verdict belongs to Patch A
    s.set(t, 'patch', 'color', T.bad, 0.3); s.set(t, 'patch', 'titleColor', T.bad, 0.3);
    s.set(t, 'patch', 'glow', 0.7, 0.2); s.set(t + 0.4, 'patch', 'glow', 0, 0.6);
    s.sfx(t, 'thump', { note: 'E3', gain: 0.9, pan: 0 });

    s.fade(40.0, 1, 1.0);
    s.meta.duration = 42.0;
  },
});
