/* Agent evals — motion-v2 lesson 04: Repeat trials independently.
 * One mechanism: every trial starts from a fresh copy of the same clean start (code r0, data d0, empty
 * history). Trial 1 changes its copy (P1, d1, log1); its result is saved outside the copy; the copy is
 * discarded and re-made from the untouched clean start before trial 2, whose result differs. The report
 * counts every attempt instead of the best one.
 * Render from the repository root (pinned puppeteer-core from root node_modules):
 *   node video/agent-evals/motion-v2/04/engine/render.mjs video/agent-evals/motion-v2/04/scene.js video/agent-evals/motion-v2/04/video.mp4 --sheet video/agent-evals/motion-v2/04/scratch/contact-sheet.png
 * Local engine copy: 'panel', 'txt' (reveal, hl, bar, strike), 'tick', chip size, meta.subtitleSize.
 */
FlowVideo.scene({
  meta: { title: 'Agent evals', subtitle: 'REPEAT TRIALS INDEPENDENTLY', subtitleSize: 38, duration: 42, fps: 30, speed: 1 },
  build(s) {
    const T = s.THEME;
    const pan = (a) => s.panOf(a);
    const show = (t, id, d = 0.3) => s.set(t, id, 'alpha', 1, d);
    const flash = (t, id, color, hold = 0.6) => { s.set(t, id, 'hlColor', color, 0); s.set(t, id, 'hl', 1, 0.15); s.set(t + hold, id, 'hl', 0, 0.4); };
    const KEYS = ['code', 'data', 'history'], CLEAN = ['r0', 'd0', 'empty'], RY = [762, 826, 890];

    // ---- task ----
    s.node('task', 'panel', { x: 540, y: 535, w: 960, h: 140, title: 'TASK', color: T.dim, titleColor: T.mid });
    s.node('taskTxt', 'txt', { x: 100, y: 572, text: 'fix login · same checks', size: 42, mono: true, color: T.fg, alpha: 0 });

    // ---- clean start (never changes) and the trial's working copy ----
    s.node('tpl', 'panel', { x: 265, y: 795, w: 410, h: 300, title: 'CLEAN START', color: T.dim, titleColor: T.mid });
    s.node('cp', 'panel', { x: 815, y: 795, w: 410, h: 300, title: 'T1', titleSize: 44, titleColor: T.info, status: '', statusColor: T.mid, color: T.dim });
    KEYS.forEach((k, i) => {
      s.node('tk' + i, 'txt', { x: 90, y: RY[i], text: k, size: 40, mono: true, color: T.mid, alpha: 0 });
      s.node('tv' + i, 'txt', { x: 290, y: RY[i], text: CLEAN[i], size: 40, mono: true, weight: 700, color: T.fg, alpha: 0, hlW: 130 });
      s.node('ck' + i, 'txt', { x: 640, y: RY[i], text: k, size: 40, mono: true, color: T.mid, alpha: 0 });
      s.node('cv' + i, 'txt', { x: 840, y: RY[i], text: CLEAN[i], size: 40, mono: true, weight: 700, color: T.fg, alpha: 0, hlW: 130 });
    });
    s.node('agent', 'panel', { x: 815, y: 1040, w: 410, h: 110, title: 'AGENT', titleSize: 34, status: 'idle', statusColor: T.mid, color: T.dim, titleColor: T.mid });
    s.wire('use', [815, 951], [815, 979]);

    // ---- every attempt, saved outside the copy ----
    s.node('res', 'panel', { x: 540, y: 1262, w: 960, h: 220, title: 'ALL ATTEMPTS', color: T.dim, titleColor: T.mid });
    const RES = [{ y: 1270, id: 'T1', ev: 'P1 · log1', g: 'PASS', c: T.ok }, { y: 1338, id: 'T2', ev: 'P2 · log2', g: 'FAIL', c: T.bad }];
    RES.forEach((r, i) => {
      s.node('ri' + i, 'txt', { x: 100, y: r.y, text: r.id, size: 44, mono: true, weight: 700, color: T.info, alpha: 0 });
      s.node('re' + i, 'txt', { x: 220, y: r.y, text: r.ev, size: 42, mono: true, color: T.mid, alpha: 0 });
      s.node('rg' + i, 'txt', { x: 640, y: r.y, text: r.g, size: 44, mono: true, weight: 700, color: r.c, alpha: 0, hlW: 106 });
      s.wire('save' + i, [1026, 795], [1026, r.y], { via: [[1054, 795], [1054, r.y]] });
      s.set(0, 'wire:save' + i, 'alpha', 0, 0);
    });

    // ---- report ----
    s.node('rep', 'panel', { x: 540, y: 1545, w: 960, h: 240, title: 'REPORT', color: T.dim, titleColor: T.mid });
    s.node('best', 'txt', { x: 100, y: 1560, text: 'best: T1 PASS', size: 42, mono: true, color: T.fg, alpha: 0 });
    s.node('all', 'txt', { x: 100, y: 1628, text: '1 pass · 1 fail · 2 trials', size: 44, mono: true, weight: 700, color: T.fg, alpha: 0, hlW: 655 });

    // make a fresh working copy from the clean start
    const stamp = (t, label) => {
      s.set(t, 'tpl', 'glow', 0.6, 0.15); s.set(t + 0.3, 'tpl', 'glow', 0, 0.4);
      RY.forEach((y) => s.packet({ route: [[478, y], [602, y]], t, dur: 0.6, kind: 'dot', color: T.fg }));
      s.sfx(t, 'send', { note: 'C6', gain: 1.0, pan: 0 });
      const ta = t + 0.6;
      s.set(ta, 'cp', 'title', label, 0); s.set(ta, 'cp', 'color', T.mid, 0.2);
      s.set(ta, 'cp', 'status', 'ready', 0); s.set(ta, 'cp', 'statusColor', T.fg, 0);
      KEYS.forEach((k, i) => {
        s.set(ta, 'cv' + i, 'text', CLEAN[i], 0); s.set(ta, 'cv' + i, 'color', T.fg, 0);
        show(ta, 'ck' + i, 0.2); show(ta, 'cv' + i, 0.2); flash(ta, 'cv' + i, T.fg, 0.8);
      });
      s.sfx(ta, 'arrive', { note: 'E5', pan: pan('cp') });
    };
    // one trial changes its own copy, then is graded
    const runTrial = (t, vals, g) => {
      s.set(t, 'cp', 'status', 'running', 0); s.set(t, 'cp', 'statusColor', T.accent, 0); s.set(t, 'cp', 'color', T.fg, 0.2);
      s.set(t, 'agent', 'status', 'running', 0); s.set(t, 'agent', 'statusColor', T.accent, 0);
      s.set(t, 'agent', 'color', T.fg, 0.2); s.set(t, 'agent', 'glow', 0.6, 0.2); s.set(t, 'agent', 'titleColor', T.fg, 0.2);
      s.set(t, 'wire:use', 'color', T.accent, 0.2); s.set(t, 'wire:use', 'flow', 1, 0);
      s.sfx(t, 'work', { note: 'E4', gain: 1.3, pan: pan('cp') });
      vals.forEach((v, i) => {
        const tv = t + 1.2 + i * 1.0;
        s.set(tv, 'cv' + i, 'text', v, 0); s.set(tv, 'cv' + i, 'color', T.accent, 0); flash(tv, 'cv' + i, T.accent, 0.5);
        s.sfx(tv, 'work', { note: 'E4', gain: 1.3, pan: pan('cp') });
      });
      const tg = t + 4.4, ok = g === 'PASS';
      s.set(tg, 'agent', 'status', 'idle', 0); s.set(tg, 'agent', 'statusColor', T.mid, 0);
      s.set(tg, 'agent', 'glow', 0, 0.4); s.set(tg, 'agent', 'color', T.dim, 0.4); s.set(tg, 'agent', 'titleColor', T.mid, 0.4);
      s.set(tg, 'wire:use', 'color', T.wire, 0.3); s.set(tg, 'wire:use', 'flow', 0, 0);
      s.set(tg, 'cp', 'status', g, 0); s.set(tg, 'cp', 'statusColor', ok ? T.ok : T.bad, 0);
      s.set(tg, 'cp', 'color', ok ? T.ok : T.bad, 0.3);
      if (ok) s.sfx(tg, 'chime', { note: 'G5', gain: 0.8, pan: pan('cp') });
      else s.sfx(tg, 'thump', { note: 'G3', gain: 1.0, pan: pan('cp') });
      return tg;
    };
    const save = (t, i) => {
      s.set(t, 'wire:save' + i, 'alpha', 1, 0.2); s.set(t, 'wire:save' + i, 'color', T.fg, 0); s.set(t, 'wire:save' + i, 'flow', 1, 0);
      s.packet({ route: [[1026, 795], [1054, 795], [1054, RES[i].y], [1026, RES[i].y]], t, dur: 1.0, kind: 'dot', color: T.fg });
      s.sfx(t, 'send', { note: 'G6', gain: 0.9, pan: 0.6 });
      const ta = t + 1.0;
      s.set(ta, 'wire:save' + i, 'alpha', 0, 0.4); s.set(ta, 'wire:save' + i, 'flow', 0, 0);
      s.set(ta, 'res', 'color', T.mid, 0.3); s.set(ta, 'res', 'titleColor', T.fg, 0.3);
      for (const id of ['ri' + i, 're' + i, 'rg' + i]) show(ta, id, 0.25);
      flash(ta, 'rg' + i, RES[i].c, 0.7);
      s.sfx(ta, 'store', { note: 'G4', gain: 1.2, pan: pan('res') });
    };
    // throw away the used copy, leftovers included
    const discard = (t) => {
      [2, 1, 0].forEach((i, k) => {
        const td = t + k * 0.25;
        s.set(td, 'cv' + i, 'alpha', 0, 0.25); s.set(td, 'ck' + i, 'alpha', 0, 0.25);
        s.sfx(td, 'poof', { gain: 0.8, pan: pan('cp') });
      });
      s.set(t, 'cp', 'status', '', 0); s.set(t, 'cp', 'color', T.dim, 0.4);
    };

    // ==== Beat 1: one task, a clean start, a fresh copy for trial 1 (0–8) ====
    let t = 0.6;
    s.set(t, 'task', 'color', T.mid, 0.3); s.set(t, 'task', 'titleColor', T.fg, 0.3); show(t, 'taskTxt');
    s.sfx(t, 'arrive', { note: 'C5', pan: 0 });
    t = 1.8;
    s.set(t, 'tpl', 'color', T.mid, 0.3); s.set(t, 'tpl', 'titleColor', T.fg, 0.3);
    KEYS.forEach((k, i) => { show(t + i * 0.2, 'tk' + i); show(t + i * 0.2, 'tv' + i); });
    s.sfx(t, 'store', { note: 'C5', pan: pan('tpl') });
    stamp(3.4, 'T1');                          // copy lands at 4.0
    s.set(4.6, 'agent', 'color', T.mid, 0.3);

    // ==== Beat 2: trial 1 changes its copy; its result is saved (8–17) ====
    const g1 = runTrial(8.0, ['P1', 'd1', 'log1'], 'PASS');   // graded at 12.4
    save(g1 + 1.0, 0);                               // saved at 14.4

    // ==== Beat 3: discard, fresh copy, trial 2 differs (17–31) ====
    t = 17.0;
    discard(t);
    s.set(t + 0.9, 'cp', 'title', '', 0);
    t = 18.2;                                        // the clean start is unchanged
    s.pulse(t, 'tpl'); RY.forEach((y, i) => flash(t, 'tv' + i, T.fg, 0.7));
    s.sfx(t, 'ack', { note: 'C5', gain: 1.4, pan: pan('tpl') });
    stamp(19.2, 'T2');                          // copy lands at 19.8; hold against the saved T1 row
    const g2 = runTrial(23.0, ['P2', 'd2', 'log2'], 'FAIL');  // graded at 27.4
    save(g2 + 1.0, 1);                               // saved at 29.4

    // ==== Beat 4: report every attempt (31.5–42) ====
    t = 31.5;
    s.set(t, 'rep', 'color', T.mid, 0.3); s.set(t, 'rep', 'titleColor', T.fg, 0.3);
    show(t, 'best'); s.sfx(t, 'ack', { note: 'G5', gain: 1.1, pan: 0 });
    flash(t, 'rg0', T.ok, 1.0);
    t = 33.2;
    s.set(t, 'best', 'strike', 1, 0.5, 'linear'); s.set(t + 0.5, 'best', 'color', T.mid, 0.4);
    s.sfx(t, 'miss', { gain: 0.7, pan: 0 });
    t = 34.4;
    show(t, 'all', 0.25); flash(t, 'all', T.fg, 0.9);
    flash(t, 'rg0', T.ok, 0.9); flash(t, 'rg1', T.bad, 0.9);
    s.set(t, 'res', 'color', T.fg, 0.3); s.set(t + 1.2, 'res', 'color', T.mid, 0.5);
    s.sfx(t, 'store', { note: 'G4', gain: 1.3, pan: 0 });

    s.fade(40.0, 1, 1.0);
    s.meta.duration = 42.0;
  },
});
