// Orchestration patterns, lesson 05: Revise against criteria (motion-v2/05).
// One mechanism: an evaluator checks a draft against explicit criteria, returns one specific reason, the worker
// revises that field, the evaluator rechecks the same criteria, and the controller stops after one revision.
// Render from the repository root:
//   node video/orchestration-patterns/motion-v2/05/engine/render.mjs video/orchestration-patterns/motion-v2/05/scene.js video/orchestration-patterns/motion-v2/05/video.mp4
FlowVideo.scene({
  meta: { title: 'Revise against criteria', subtitle: 'ORCHESTRATION · 5', titleSize: 76, titleY: 300, subtitleSize: 40, subtitleY: 385, duration: 33.5, fps: 30, speed: 1 },
  build(s) {
    const T = s.THEME, BLUE = T.info, AMB = T.accent, OK = T.ok;
    const at = (id) => (t, prop, v, dur = 0, ease) => s.set(t, id, prop, v, dur, ease);
    const C = at('crit'), Dd = at('draft'), F = at('fb'), K = at('ctrl');

    // ---------- criteria (fixed for both checks) ----------
    s.node('crit', 'panel', { x: 540, y: 560, w: 880, h: 190, headY: 52, title: 'Criteria', titleSize: 44, titleColor: T.mid,
      rows: [{ x: 24, y: 128, w: 410, h: 76, markLeft: true, size: 44, mono: false }, { x: 446, y: 128, w: 410, h: 76, markLeft: true, size: 44, mono: false }] });
    C(0, 'row0Text', 'Change'); C(0, 'row1Text', 'Rollback step');
    const openMarks = (t) => { for (const i of [0, 1]) { C(t, 'row' + i + 'Mark', 'open'); C(t, 'row' + i + 'MarkColor', T.mid); C(t, 'row' + i + 'MarkK', 1); } };
    openMarks(0);

    // ---------- the draft: one artifact, edited in place ----------
    s.node('draft', 'panel', { x: 540, y: 920, w: 880, h: 400, headY: 58, title: 'Draft v1', titleSize: 50, tagSize: 40,
      rows: [{ x: 24, y: 140, w: 832, h: 70, size: 46 }, { x: 24, y: 228, w: 832, h: 50, size: 40, mono: false }, { x: 24, y: 305, w: 832, h: 72, size: 46 }] });
    Dd(0, 'tag', 'worker'); Dd(0, 'tagColor', BLUE); Dd(0, 'color', BLUE);
    Dd(0, 'row0Slot', 1); Dd(0, 'row1Text', 'Rollback'); Dd(0, 'row1Color', T.mid); Dd(0, 'row2Slot', 1);

    // ---------- evaluator feedback and controller ----------
    s.node('fb', 'panel', { x: 540, y: 1250, w: 880, h: 170, headY: 52, title: 'Evaluator feedback', titleSize: 44, titleColor: T.mid,
      rows: [{ x: 24, y: 115, w: 832, h: 64, size: 48, mono: false }] });
    F(0, 'row0Text', '—'); F(0, 'row0Color', T.mid);
    s.node('ctrl', 'panel', { x: 540, y: 1480, w: 880, h: 200, headY: 52, title: 'Controller', titleSize: 44, titleColor: T.mid,
      rows: [{ x: 24, y: 125, w: 832, h: 76, size: 48, mono: false, x3: 560 }] });
    K(0, 'row0Text', 'Revisions 0 / 1'); K(0, 'row0Text3', 'waiting'); K(0, 'row0Color3', T.mid);

    // ---------- routes: evaluator inspection (right gutter) and feedback (left gutter), both land on the rollback field ----------
    const GL = 58, GR = 1022, FIELD = 920 - 200 + 305; // rollback value row centre
    const inspect = [[984, 593], [GR, 593], [GR, FIELD], [984, FIELD]];
    const back = [[96, 1280], [GL, 1280], [GL, FIELD], [96, FIELD]];
    s.wire('insp', inspect[0], inspect[3], { via: inspect.slice(1, 3), arrow: true, color: AMB, width: 5 });
    s.wire('back', back[0], back[3], { via: back.slice(1, 3), arrow: true, color: AMB, width: 5 });
    for (const w of ['insp', 'back']) { s.set(0, 'wire:' + w, 'alpha', 0, 0); s.set(0, 'wire:' + w, 'solid', 1, 0); }

    const role = (t, r) => { // the active role on the draft
      const c = r === 'worker' ? BLUE : AMB;
      Dd(t, 'tag', r); Dd(t, 'tagColor', c); Dd(t, 'tagK', 0.6); Dd(t, 'tagK', 1, 0.3); Dd(t, 'color', c, 0.3);
    };
    const state = (t, txt, color) => { K(t, 'row0Text3', txt); K(t, 'row0Color3', color); };
    const reveal = (fn, t, i, txt, color, dur = 0.8) => { fn(t, 'row' + i + 'Slot', 0, 0.3); fn(t, 'row' + i + 'Text', txt); fn(t, 'row' + i + 'Color', color); fn(t, 'row' + i + 'Reveal', 0); fn(t, 'row' + i + 'Reveal', 1, dur, 'linear'); };
    const mark = (t, i, kind, color) => { C(t, 'row' + i + 'Mark', kind); C(t, 'row' + i + 'MarkColor', color); C(t, 'row' + i + 'MarkK', 0); C(t, 'row' + i + 'MarkK', 1, 0.35); };
    // evaluator checks the Change criterion against the change row
    const checkChange = (t) => {
      C(t, 'row0Hl', 1, 0.2); C(t, 'row0HlColor', AMB); Dd(t, 'row0Hl', 1, 0.2); Dd(t, 'row0HlColor', AMB);
      mark(t + 0.6, 0, 'check', OK); C(t + 0.6, 'row0HlColor', OK, 0.2); Dd(t + 0.6, 'row0HlColor', OK, 0.2);
      s.sfx(t + 0.6, 'ack', { note: 'G5', gain: 1.3, pan: 0 });
      C(t + 1.3, 'row0Hl', 0, 0.4); Dd(t + 1.3, 'row0Hl', 0, 0.4);
    };
    // evaluator travels from the Rollback criterion to the rollback field
    const inspectField = (t) => {
      C(t, 'row1Hl', 1, 0.2); C(t, 'row1HlColor', AMB);
      s.set(t, 'wire:insp', 'alpha', 1, 0.3);
      s.packet({ route: inspect, t: t + 0.2, dur: 1.2, kind: 'dot', color: AMB });
      s.sfx(t + 0.2, 'send', { note: 'G6', gain: 1.3, pan: 0.5 });
      Dd(t + 1.4, 'row2Hl', 1, 0.2); Dd(t + 1.4, 'row2HlColor', AMB); s.sfx(t + 1.4, 'arrive', { note: 'G5', pan: 0.3 });
      s.set(t + 1.6, 'wire:insp', 'alpha', 0, 0.5);
      return t + 1.4;
    };

    // ---------- beat 1 (0-8): the worker writes v1 and submits; the evaluator applies the criteria ----------
    reveal(Dd, 0.6, 0, 'Change: Add timeout', T.fg, 1.2); s.sfx(0.8, 'work', { note: 'E4', gain: 1.1, pan: -0.3 });
    Dd(1.9, 'row2Slot', 1); Dd(1.9, 'row2Text', '—'); Dd(1.9, 'row2Color', T.mid);
    s.sfx(2.6, 'send', { note: 'E6', gain: 1.4, pan: -0.3 });
    role(2.6, 'evaluator'); state(2.6, 'checking', AMB);
    C(3.2, 'color', AMB, 0.3); C(3.2, 'titleColor', T.fg, 0.3); s.pulse(3.2, 'crit', AMB);
    checkChange(4.0);
    const f1 = inspectField(5.6); // 7.0
    mark(f1 + 0.6, 1, 'x', AMB); C(f1 + 0.6, 'row1HlColor', AMB); s.shake(f1 + 0.6, 'crit', 6, 0.35);
    s.sfx(f1 + 0.6, 'miss', { note: 'G4', gain: 0.9, pan: 0.2 });

    // ---------- beat 2 (8-14): one specific reason goes back to the worker ----------
    reveal(F, 8.4, 0, 'Missing rollback step', AMB); F(8.4, 'color', AMB, 0.3); F(8.4, 'titleColor', T.fg, 0.3);
    s.sfx(8.4, 'store', { note: 'G5', gain: 0.9, pan: 0 });
    C(9.4, 'row1Hl', 0, 0.4);
    s.set(9.8, 'wire:back', 'alpha', 1, 0.3);
    s.packet({ route: back, t: 10.0, dur: 1.3, kind: 'dot', color: AMB });
    s.sfx(10.0, 'send', { note: 'G6', gain: 1.3, pan: -0.5 });
    role(11.3, 'worker'); state(11.3, 'revise', AMB); s.sfx(11.3, 'arrive', { note: 'E5', pan: -0.3 });
    s.set(11.6, 'wire:back', 'alpha', 0, 0.5);

    // ---------- beat 3 (14-24): v2 fills the named field; old marks are cleared; the same criteria are rechecked ----------
    Dd(14.0, 'title', 'Draft v2'); s.pulse(14.0, 'draft', BLUE);
    K(14.0, 'row0Text', 'Revisions 1 / 1'); K(14.0, 'row0Hl', 1, 0.2); K(14.0, 'row0HlColor', T.fg); K(15.0, 'row0Hl', 0, 0.4);
    s.sfx(14.0, 'ack', { note: 'C5', gain: 1.4, pan: 0 });
    openMarks(14.0); C(14.0, 'color', T.dim, 0.3); C(14.0, 'titleColor', T.mid, 0.3); // no stale verdict on v2
    F(14.0, 'row0Text', 'Recheck pending'); F(14.0, 'row0Color', T.mid); F(14.0, 'color', T.dim, 0.3); F(14.0, 'titleColor', T.mid, 0.3);
    Dd(14.6, 'row2Hl', 0, 0.3);
    reveal(Dd, 15.0, 2, 'Restore prior config', BLUE, 1.8);
    s.sfx(15.2, 'work', { note: 'E4', gain: 1.1, pan: -0.3 }); s.sfx(16.4, 'work', { note: 'E4', gain: 1.1, pan: -0.3 });
    s.sfx(18.0, 'send', { note: 'E6', gain: 1.4, pan: -0.3 });
    role(18.0, 'evaluator'); state(18.0, 'recheck', AMB);
    C(18.4, 'color', AMB, 0.3); C(18.4, 'titleColor', T.fg, 0.3);
    checkChange(19.0);
    const f2 = inspectField(20.4); // 21.8
    mark(f2 + 0.8, 1, 'check', OK); C(f2 + 0.8, 'row1HlColor', OK, 0.2); Dd(f2 + 0.8, 'row2HlColor', OK, 0.2);
    s.sfx(f2 + 0.8, 'ack', { note: 'G5', gain: 1.5, pan: 0.2 });
    reveal(F, f2 + 1.3, 0, 'Criteria met', OK); F(f2 + 1.3, 'color', T.dim); s.sfx(f2 + 1.3, 'store', { note: 'G5', gain: 0.8, pan: 0 });
    C(f2 + 2.2, 'row1Hl', 0, 0.4); Dd(f2 + 2.2, 'row2Hl', 0, 0.4);

    // ---------- beat 4 (25-36): the controller stops after one revision ----------
    state(25.0, 'STOPPED', T.fg); K(25.0, 'color', T.fg, 0.3); K(25.0, 'titleColor', T.fg, 0.3); s.pulse(25.0, 'ctrl', T.fg);
    s.sfx(25.0, 'deliver', { note: 'C5', gain: 0.9, pan: 0 });
    Dd(25.0, 'tagK', 0, 0.4); Dd(25.0, 'color', T.mid, 0.4); C(25.0, 'color', T.dim, 0.4);
    s.fade(31.0, 1, 1.4);
  },
});
