/* Agent evals — motion-v2 lesson 01: Task, trial and grader.
 * One mechanism: success criteria are written on the task and copied to the grader before anything runs;
 * one trial of the agent system (model, harness, tools, repo) produces patch P1 and a trace; only that
 * artifact goes to the grader, which runs its own checks and records observed results against the
 * criteria; the grade is recorded for trial T1 alone.
 * Render from the repository root (pinned puppeteer-core from root node_modules):
 *   node video/agent-evals/motion-v2/01/engine/render.mjs video/agent-evals/motion-v2/01/scene.js video/agent-evals/motion-v2/01/video.mp4 --sheet video/agent-evals/motion-v2/01/scratch/contact-sheet.png
 * The local engine copy adds general 'panel', 'txt' and 'tick' node types and an optional chip text size.
 */
FlowVideo.scene({
  meta: { title: 'Agent evals', subtitle: 'TASK · TRIAL · GRADER', subtitleSize: 38, duration: 42, fps: 30, speed: 1 },
  build(s) {
    const T = s.THEME;
    const X = 100;                      // left text column
    const pan = (a) => s.panOf(a);
    const show = (t, id, d = 0.3) => s.set(t, id, 'alpha', 1, d);

    // ---- task record (fixed for the whole film) ----
    s.node('task', 'panel', { x: 520, y: 605, w: 920, h: 280, title: 'TASK A', color: T.dim, titleColor: T.mid });
    s.node('goal', 'txt', { x: X, y: 580, text: 'Fix empty-password login', size: 50, weight: 650, reveal: 0 });
    s.node('c1', 'txt', { x: X, y: 645, text: '1  empty password → reject', size: 42, mono: true, color: T.accent, alpha: 0 });
    s.node('c2', 'txt', { x: X, y: 703, text: '2  valid password → accept', size: 42, mono: true, color: T.accent, alpha: 0 });

    // ---- one trial of the agent system ----
    s.node('trial', 'panel', { x: 520, y: 1010, w: 920, h: 420, title: 'TRIAL T1', titleColor: T.info, status: 'ready', statusColor: T.mid, color: T.dim, dashed: 1 });
    const parts = [['model', 195], ['harness', 408], ['tools', 621], ['repo', 834]];
    for (const [id, x] of parts) s.node(id, 'box', { x, y: 925, w: 190, h: 84, label: id, labelSize: 38, color: T.dim, labelColor: T.mid });
    const logs = ['1  read auth.py', '2  edit auth.py', '3  save patch P1'];
    logs.forEach((txt, i) => s.node('log' + i, 'txt', { x: X, y: 1040 + i * 65, text: txt, size: 42, mono: true, alpha: 0, color: T.fg }));
    s.node('traceTag', 'txt', { x: 940, y: 1040, text: 'trace', size: 38, align: 'right', color: T.mid, alpha: 0 });

    // ---- grader: expected (from the task) against observed (from its own checks) ----
    s.node('grader', 'panel', { x: 520, y: 1440, w: 920, h: 320, title: 'GRADER', status: 'waiting', statusColor: T.mid, color: T.dim, titleColor: T.mid });
    const COL = [X, 360, 640];
    ['case', 'expected', 'observed'].forEach((h, i) => s.node('h' + i, 'txt', { x: COL[i], y: 1390, text: h, size: 36, weight: 600, color: T.mid }));
    const rows = [['empty', 'reject', 1460], ['valid', 'accept', 1535]];
    rows.forEach(([cs, ex, y], i) => {
      s.node('case' + i, 'txt', { x: COL[0], y, text: cs, size: 44, mono: true, alpha: 0 });
      s.node('exp' + i, 'txt', { x: COL[1], y, text: ex, size: 44, mono: true, alpha: 0, color: T.accent, hlW: 158 });
      s.node('obs' + i, 'txt', { x: COL[2], y, text: '—', size: 44, mono: true, alpha: 0, color: T.dim, hlW: 211 });
      s.node('tick' + i, 'tick', { x: 920, y: y - 4, r: 22 });
    });

    // ---- results record ----
    s.node('results', 'panel', { x: 520, y: 1730, w: 920, h: 150, color: T.dim });
    s.node('r1', 'txt', { x: X, y: 1700, text: 'T1  ungraded', size: 44, mono: true, color: T.mid, hlW: 422 });
    s.node('r2', 'txt', { x: X, y: 1762, text: 'T2  not run', size: 44, mono: true, color: T.dim, hlW: 422 });

    // criteria travel to the grader down the right margin, outside the trial
    s.wire('criteria', [984, 674], [984, 1497], { via: [[1030, 674], [1030, 1497]] });
    s.set(0, 'wire:criteria', 'alpha', 0.5, 0);

    // ==== Beat 1: define the task and what success looks like (0–9.5) ====
    let t = 0.6;
    s.set(t, 'task', 'color', T.fg, 0.3); s.set(t, 'task', 'glow', 0.5, 0.3); s.set(t, 'task', 'titleColor', T.fg, 0.3);
    s.set(t, 'goal', 'reveal', 1, 1.2, 'linear');
    s.sfx(t, 'store', { note: 'C5', pan: pan('task') });
    for (const [id, tc] of [['c1', 2.3], ['c2', 3.1]]) {
      show(tc, id, 0.25); s.set(tc, id, 'hl', 1, 0.15); s.set(tc + 0.5, id, 'hl', 0, 0.4);
      s.sfx(tc, 'ack', { note: 'C6', gain: 1.3, pan: pan('task') });
    }
    s.set(3.9, 'task', 'glow', 0, 0.5); s.set(3.9, 'task', 'color', T.mid, 0.5);
    t = 4.4;
    s.set(t, 'wire:criteria', 'alpha', 1, 0.2); s.set(t, 'wire:criteria', 'color', T.accent, 0.2); s.set(t, 'wire:criteria', 'flow', 1, 0);
    s.set(t, 'grader', 'color', T.mid, 0.3); s.set(t, 'grader', 'titleColor', T.fg, 0.3);
    rows.forEach((r, i) => {
      const tp = t + i * 0.6;
      s.packet({ route: [[984, 674], [1030, 674], [1030, 1497], [984, 1497]], t: tp, dur: 1.5, kind: 'dot', color: T.accent });
      s.sfx(tp, 'send', { note: 'C6', gain: 1.0, pan: 0.6 });
      const ta = tp + 1.5;
      show(ta, 'case' + i); show(ta, 'exp' + i); show(ta, 'obs' + i);
      s.set(ta, 'exp' + i, 'hl', 1, 0.15); s.set(ta + 0.5, 'exp' + i, 'hl', 0, 0.4);
      s.sfx(ta, 'store', { note: 'G5', pan: pan('grader') });
    });
    s.set(6.8, 'wire:criteria', 'color', T.wire, 0.4); s.set(6.8, 'wire:criteria', 'flow', 0, 0); s.set(6.8, 'wire:criteria', 'alpha', 0.5, 0.4);
    s.set(6.8, 'grader', 'titleColor', T.mid, 0.4);

    // ==== Beat 2: run one trial with the agent system (9.5–21) ====
    t = 9.5;
    s.pulse(t, 'task');
    s.packet({ route: [[520, 770], [520, 850]], t, dur: 0.7, kind: 'chip', label: 'Task A', color: T.fg, size: 36 });
    s.sfx(t, 'send', { note: 'C6', gain: 1.0, pan: 0 });
    t = 10.2;
    s.set(t, 'trial', 'dashed', 0, 0); s.set(t, 'trial', 'color', T.fg, 0.2); s.set(t, 'trial', 'glow', 0.5, 0.2);
    s.set(t, 'trial', 'status', 'running', 0); s.set(t, 'trial', 'statusColor', T.accent, 0);
    for (const [id] of parts) s.set(t, id, 'color', T.mid, 0.3);
    s.sfx(t, 'arrive', { note: 'E5', pan: 0 });
    s.set(t + 0.6, 'trial', 'glow', 0, 0.5);
    const NOTES = ['E5', 'F#5', 'G#5', 'B5'];
    [11.3, 13.6, 15.9].forEach((ts, i) => {
      parts.forEach(([id], k) => {
        const tk = ts + k * 0.3;
        s.set(tk, id, 'color', T.fg, 0.1); s.set(tk, id, 'glow', 0.9, 0.1); s.set(tk, id, 'labelColor', T.fg, 0.1);
        s.set(tk + 0.35, id, 'color', T.mid, 0.3); s.set(tk + 0.35, id, 'glow', 0, 0.3); s.set(tk + 0.35, id, 'labelColor', T.mid, 0.3);
        s.sfx(tk, 'ack', { note: NOTES[k], gain: 0.9, pan: pan(id) });
      });
      const tr = ts + 1.3;
      show(tr, 'log' + i, 0.25); s.set(tr, 'log' + i, 'hl', 1, 0.15); s.set(tr + 0.5, 'log' + i, 'hl', 0, 0.4);
      if (i > 0) s.set(tr, 'log' + (i - 1), 'color', T.mid, 0.4);
      if (i === 0) show(tr, 'traceTag', 0.3);
      if (i < 2) s.sfx(tr, 'work', { note: 'E4', gain: 1.4, pan: pan('trial') });
      else { s.set(tr, 'log2', 'hlColor', T.info, 0); s.set(tr, 'log2', 'color', T.info, 0); s.sfx(tr, 'store', { note: 'E5', pan: pan('trial') }); }
    });
    t = 18.2;
    s.set(t, 'trial', 'status', 'finished', 0); s.set(t, 'trial', 'statusColor', T.fg, 0);
    s.set(t, 'trial', 'color', T.mid, 0.4);
    s.set(t, 'trial', 'glow', 0.6, 0.1); s.set(t + 0.1, 'trial', 'glow', 0, 0.5);
    s.sfx(t, 'ack', { note: 'E5', gain: 1.6, pan: 0 });
    t = 19.1;   // finished is not graded: the results row is still empty
    s.set(t, 'r1', 'hl', 1, 0.15); s.set(t, 'r1', 'hlColor', T.mid, 0); s.set(t + 0.7, 'r1', 'hl', 0, 0.4);
    s.sfx(t, 'ack', { note: 'C4', gain: 1.4, pan: pan('results') });

    // ==== Beat 3: the grader checks P1 against the stated criteria (21–31.5) ====
    t = 21.0;
    s.set(t, 'log2', 'hl', 1, 0.15); s.set(t + 0.6, 'log2', 'hl', 0, 0.4);
    s.packet({ route: [[650, 1170], [650, 1325]], t, dur: 1.0, kind: 'chip', label: 'P1 + trace', color: T.info, size: 34 });
    s.sfx(t, 'send', { note: 'E6', gain: 1.0, pan: pan([650, 0]) });
    t = 22.0;
    s.set(t, 'grader', 'color', T.fg, 0.2); s.set(t, 'grader', 'glow', 0.5, 0.2); s.set(t, 'grader', 'titleColor', T.fg, 0.2);
    s.set(t, 'grader', 'status', 'has P1', 0); s.set(t, 'grader', 'statusColor', T.info, 0);
    for (const i of [0, 1]) { s.set(t, 'obs' + i, 'text', '?', 0); s.set(t, 'obs' + i, 'color', T.mid, 0.2); }
    s.sfx(t, 'arrive', { note: 'G5', pan: pan('grader') });
    s.set(t + 0.6, 'grader', 'glow', 0, 0.5); s.set(t + 0.6, 'grader', 'color', T.mid, 0.5);
    s.set(24.3, 'grader', 'status', 'checking', 0); s.set(24.3, 'grader', 'statusColor', T.accent, 0);
    [[0, 24.3, 0.8], [1, 27.6, 1.0]].forEach(([i, tc, g]) => {
      const c = 'c' + (i + 1);
      s.set(tc, c, 'hl', 1, 0.2); s.set(tc, 'exp' + i, 'hl', 1, 0.2);
      s.set(tc, 'obs' + i, 'text', 'checking', 0); s.set(tc, 'obs' + i, 'color', T.accent, 0);
      s.set(tc, 'obs' + i, 'bar', 1, 1.6, 'linear');
      for (const k of [0, 0.4, 0.8, 1.2]) s.sfx(tc + k, 'work', { note: 'G4', gain: 1.2, pan: pan('grader') });
      const td = tc + 1.7;
      s.set(td, 'obs' + i, 'text', rows[i][1], 0); s.set(td, 'obs' + i, 'color', T.ok, 0); s.set(td, 'obs' + i, 'bar', 0, 0);
      s.set(td, 'tick' + i, 'draw', 1, 0.3, 'out');
      s.sfx(td, 'hit', { note: 'G5', gain: g, pan: pan([920, 0]) });
      s.set(td + 0.6, c, 'hl', 0, 0.4); s.set(td + 0.6, 'exp' + i, 'hl', 0, 0.4);
    });
    t = 30.0;
    s.set(t, 'grader', 'status', 'done', 0); s.set(t, 'grader', 'statusColor', T.ok, 0);
    s.set(t, 'grader', 'color', T.ok, 0.3);
    s.sfx(t, 'ack', { note: 'G5', gain: 1.5, pan: pan('grader') });

    // ==== Beat 4: the grade describes this one trial (31.5–42) ====
    t = 31.5;
    s.packet({ route: [[700, 1600], [700, 1700]], t, dur: 0.8, kind: 'chip', label: 'criteria met', color: T.ok, size: 34 });
    s.sfx(t, 'send', { note: 'G6', gain: 1.0, pan: pan([700, 0]) });
    t = 32.3;
    s.set(t, 'r1', 'text', 'T1  criteria met', 0); s.set(t, 'r1', 'color', T.ok, 0);
    s.set(t, 'r1', 'hlColor', T.ok, 0); s.set(t, 'r1', 'hl', 1, 0.15); s.set(t + 0.6, 'r1', 'hl', 0, 0.4);
    s.set(t, 'results', 'color', T.mid, 0.3);
    s.sfx(t, 'store', { note: 'C6', pan: pan('results') });
    t = 33.6;   // the next trial has no result
    s.set(t, 'r2', 'hlColor', T.mid, 0); s.set(t, 'r2', 'hl', 1, 0.15); s.set(t + 0.7, 'r2', 'hl', 0, 0.4);
    s.sfx(t, 'ack', { note: 'C4', gain: 1.4, pan: pan('results') });
    t = 34.8;   // the grade belongs to T1
    s.set(t, 'trial', 'color', T.info, 0.2); s.set(t, 'trial', 'glow', 0.7, 0.2);
    s.set(t + 0.9, 'trial', 'color', T.mid, 0.5); s.set(t + 0.9, 'trial', 'glow', 0, 0.5);
    s.set(t, 'r1', 'hl', 1, 0.2); s.set(t + 0.9, 'r1', 'hl', 0, 0.5);
    s.sfx(t, 'chime', { note: 'C6', gain: 0.9, pan: 0 });

    s.fade(40.0, 1, 1.0);
    s.meta.duration = 42.0;
  },
});

