// Orchestration patterns, lesson 01: Follow dependencies (motion-v2/01).
// One mechanism: a step whose input is another step's output cannot start until that output exists and arrives.
// Run trace (three time lanes, dependency elbows) above an artifact inspector and the fixed check criteria.
// Render from the repository root:
//   node video/orchestration-patterns/motion-v2/01/engine/render.mjs video/orchestration-patterns/motion-v2/01/scene.js video/orchestration-patterns/motion-v2/01/video.mp4
FlowVideo.scene({
  meta: { title: 'Follow dependencies', subtitle: 'ORCHESTRATION · 1', titleSize: 88, titleY: 300, subtitleSize: 40, subtitleY: 385, duration: 44, fps: 30, speed: 1 },
  build(s) {
    const T = s.THEME;
    const BLUE = T.info, AMB = T.accent, OK = T.ok;

    // ---------- run trace: one lane per step, time runs left to right ----------
    const LW = 260, LH = 76;
    const lanes = {
      draft: { x: 220, y: 600, name: 'Draft', note: 'C5', low: 'C4' },
      check: { x: 540, y: 760, name: 'Check', note: 'E5', low: 'E4' },
      asm: { x: 860, y: 920, name: 'Assemble', note: 'G5', low: 'G4' },
    };
    for (const id in lanes) {
      const L = lanes[id];
      // each step's name sits right-aligned above its own interval, clear of the elbow a chip travels down
      s.node(id, 'lane', { x: L.x, y: L.y, w: LW, h: LH, name: L.name, nameAlign: 'right', track: [90, L.x - LW / 2], dashed: 1, color: T.mid, text: 'ready', textColor: T.mid });
    }
    s.set(0, 'check', 'text', 'needs', 0); s.set(0, 'check', 'pill', 'D1', 0); s.set(0, 'check', 'pillColor', BLUE, 0);
    s.set(0, 'asm', 'text', 'needs', 0); s.set(0, 'asm', 'pill', 'F1', 0); s.set(0, 'asm', 'pillColor', AMB, 0);
    const edge = (id, side) => { const L = lanes[id]; return [L.x + (side === 'r' ? 1 : -1) * (LW / 2 + 4), L.y]; };

    // dependency elbows: dashed until their artifact exists, solid in the artifact's colour after
    s.wire('dep1', edge('draft', 'r'), [lanes.check.x - LW / 2 - 4, lanes.check.y], { via: [[380, 600], [380, 760]], arrow: true, color: T.dim, width: 5 });
    s.wire('dep2', edge('check', 'r'), [lanes.asm.x - LW / 2 - 4, lanes.asm.y], { via: [[700, 760], [700, 920]], arrow: true, color: T.dim, width: 5 });
    s.set(0, 'wire:dep1', 'dashed', 1, 0); s.set(0, 'wire:dep2', 'dashed', 1, 0);

    s.node('axis', 'axis', { x: 540, y: 1010, x0: 90, x1: 1000, segs: [[90, 350], [410, 670], [730, 990]], label: 'time', labelY: 1058, labelSize: 44 });

    // ---------- artifact inspector and fixed criteria ----------
    const rowsI = [0, 1, 2].map((i) => ({ x: 24, y: 150 + i * 90, w: 852, h: 76, size: 50 }));
    s.node('insp', 'panel', { x: 540, y: 1300, w: 900, h: 400, headY: 62, rows: rowsI, title: 'Draft D1', titleColor: T.mid, tag: 'not started', tagColor: T.mid });
    for (let i = 0; i < 3; i++) s.set(0, 'insp', 'row' + i + 'Slot', 1, 0);
    s.node('crit', 'panel', { x: 540, y: 1640, w: 900, h: 200, headY: 52, titleSize: 44, title: 'Criteria', titleColor: T.mid,
      rows: [{ x: 24, y: 134, w: 420, h: 76, markLeft: true, size: 48, mono: false }, { x: 456, y: 134, w: 420, h: 76, markLeft: true, size: 48, mono: false }] });
    s.set(0, 'crit', 'row0Text', 'Change', 0); s.set(0, 'crit', 'row1Text', 'Rollback', 0);
    for (const i of [0, 1]) { s.set(0, 'crit', 'row' + i + 'Mark', 'open', 0); s.set(0, 'crit', 'row' + i + 'MarkColor', T.mid, 0); s.set(0, 'crit', 'row' + i + 'MarkK', 1, 0); }

    // ---------- sounds ----------
    // A waiting step: two soft, muted knocks at that step's low pitch (not an error).
    s.sound('wait', { base: 'E4', gain: 0.32, layers: [
      { type: 'tone', wave: 'sine', attack: 0.004, decay: 0.07, harmonics: [1, 0.25] },
      { type: 'tone', wave: 'sine', delay: 0.16, attack: 0.004, decay: 0.07, gain: 0.7, harmonics: [1, 0.25] }] });
    const pan = (id) => s.panOf(id);
    const quiet = []; // windows kept clear of work ticks so check results stay distinct
    const ticks = (id, from, to, every = 0.8) => {
      for (let t = from; t < to - 0.05; t += every) if (!quiet.some(([a, b]) => t > a - 0.3 && t < b + 0.3)) s.sfx(t, 'work', { note: lanes[id].low, gain: 0.5, pan: pan(id) });
    };

    // ---------- step helpers ----------
    const start = (t, id, dur) => {
      s.set(t, id, 'dashed', 0, 0); s.set(t, id, 'color', AMB, 0.2); s.pulse(t, id);
      s.set(t, id, 'pillAlpha', 0, 0.25); s.set(t + 0.25, id, 'pill', '', 0);
      s.set(t + 0.25, id, 'text', 'running', 0); s.set(t + 0.25, id, 'textColor', T.fg, 0);
      s.set(t, id, 'fillColor', AMB, 0); s.set(t + 0.2, id, 'fill', 1, dur - 0.2, 'linear');
      s.sfx(t, 'ack', { note: lanes[id].note, gain: 1.6, pan: pan(id) });
      ticks(id, t + 0.8, t + dur);
    };
    const finish = (t, id) => {
      s.set(t, id, 'color', OK, 0.2); s.set(t, id, 'fillColor', OK, 0.3); s.set(t, id, 'fillAlpha', 0.2, 0.3);
      s.set(t, id, 'text', 'done', 0); s.set(t, id, 'textColor', OK, 0);
      s.ripple(t, edge(id, 'r'), OK, { mark: 'check', r1: 60 });
      s.sfx(t, 'arrive', { note: lanes[id].note, pan: pan(id) });
    };
    const waitCue = (t, id, wire) => { // the waiting step reaches for its input: socket flashes, empty elbow flashes
      s.set(t, id, 'textColor', T.fg, 0.12); s.set(t + 0.7, id, 'textColor', T.mid, 0.4);
      s.set(t, id, 'pillAlpha', 0.35, 0.15); s.set(t + 0.18, id, 'pillAlpha', 1, 0.15); s.set(t + 0.36, id, 'pillAlpha', 0.35, 0.15); s.set(t + 0.54, id, 'pillAlpha', 1, 0.2);
      s.set(t, 'wire:' + wire, 'color', T.mid, 0.12); s.set(t + 0.7, 'wire:' + wire, 'color', T.dim, 0.4);
      s.sfx(t, 'wait', { note: lanes[id].low, pan: pan(id) });
    };
    const handoff = (t, wire, label, color, from, to, via, source, target) => { // output exists: elbow goes solid, artifact travels, socket fills
      s.set(t, 'wire:' + wire, 'solid', 1, 0); s.set(t, 'wire:' + wire, 'color', color, 0.3);
      s.packet({ route: [from, ...via, to], t, dur: 1.1, kind: 'chip', label, color, size: 38 });
      s.sfx(t, 'send', { note: lanes[source].note.replace('5', '6'), gain: 1.5, pan: s.panOf(from) });
      const ta = t + 1.1;
      s.ripple(ta, to, color, { r1: 40, dur: 0.5 });
      s.set(ta, target, 'pillFill', 1, 0.25); s.set(ta, target, 'text', 'input', 0); s.set(ta, target, 'textColor', T.fg, 0);
      s.set(ta, target, 'color', T.fg, 0.25);
      s.sfx(ta, 'arrive', { note: lanes[target].note, pan: pan(target) });
      return ta;
    };
    const I = (t, prop, v, dur = 0) => s.set(t, 'insp', prop, v, dur);
    const C = (t, prop, v, dur = 0) => s.set(t, 'crit', prop, v, dur);

    // ---------- beat 1 (0-9.4): Draft runs; Check and Assemble wait for outputs that do not exist yet ----------
    start(1.2, 'draft', 6.2);
    I(1.2, 'title', 'Draft D1'); I(1.2, 'titleColor', T.fg, 0.3); I(1.2, 'tag', 'writing'); I(1.2, 'tagColor', AMB);
    I(2.2, 'row0Slot', 0, 0.3); I(2.2, 'row0Text', 'Change: Add timeout'); I(2.2, 'row0Reveal', 0); I(2.2, 'row0Reveal', 1, 2.2, 'linear');
    waitCue(3.4, 'check', 'dep1');
    waitCue(5.0, 'asm', 'dep2');
    finish(7.4, 'draft');
    I(7.4, 'tag', 'complete'); I(7.4, 'tagColor', OK);
    I(7.9, 'row1Text', 'Rollback: —'); I(7.9, 'row1Color', T.mid); I(7.9, 'row1Alpha', 0); I(7.9, 'row1Alpha', 1, 0.4);

    // ---------- beat 2 (9.4-13.8): the draft exists, so it can go to Check; Check starts only after it arrives ----------
    quiet.push([13.8, 18.2]);
    const a1 = handoff(9.4, 'dep1', 'D1', BLUE, edge('draft', 'r'), [lanes.check.x - LW / 2 - 4, lanes.check.y], [[380, 600], [380, 760]], 'draft', 'check');
    start(a1 + 1.8, 'check', 7.2); // 12.4 -> 19.6
    I(a1 + 1.8, 'title', 'Checking D1'); I(a1 + 1.8, 'titleColor', AMB, 0.3); I(a1 + 1.8, 'tagK', 0, 0.25);

    // ---------- beat 3 (13.8-21.6): compare D1 with the fixed criteria; record the finding ----------
    const ck = 13.8;
    C(ck, 'row0Hl', 1, 0.25); I(ck, 'row0Hl', 1, 0.25); C(ck, 'row0HlColor', T.fg); I(ck, 'row0HlColor', T.fg);
    s.sfx(ck, 'ack', { note: 'E6', gain: 0.7, pan: -0.3 });
    C(ck + 0.8, 'row0Mark', 'check'); C(ck + 0.8, 'row0MarkColor', OK); C(ck + 0.8, 'row0MarkK', 0); C(ck + 0.8, 'row0MarkK', 1, 0.35);
    I(ck + 0.8, 'row0Mark', 'check'); I(ck + 0.8, 'row0MarkColor', OK); I(ck + 0.8, 'row0MarkK', 0); I(ck + 0.8, 'row0MarkK', 1, 0.35);
    C(ck + 0.8, 'row0HlColor', OK, 0.2); I(ck + 0.8, 'row0HlColor', OK, 0.2);
    s.sfx(ck + 0.8, 'arrive', { note: 'E5', gain: 0.6, pan: -0.3 });
    C(ck + 1.8, 'row0Hl', 0, 0.4); I(ck + 1.8, 'row0Hl', 0, 0.4);
    C(ck + 2.4, 'row1Hl', 1, 0.25); I(ck + 2.4, 'row1Hl', 1, 0.25); C(ck + 2.4, 'row1HlColor', T.fg); I(ck + 2.4, 'row1HlColor', T.fg);
    s.sfx(ck + 2.4, 'ack', { note: 'E6', gain: 0.7, pan: 0.3 });
    C(ck + 3.2, 'row1Mark', 'x'); C(ck + 3.2, 'row1MarkColor', AMB); C(ck + 3.2, 'row1MarkK', 0); C(ck + 3.2, 'row1MarkK', 1, 0.35);
    I(ck + 3.2, 'row1Mark', 'x'); I(ck + 3.2, 'row1MarkColor', AMB); I(ck + 3.2, 'row1MarkK', 0); I(ck + 3.2, 'row1MarkK', 1, 0.35);
    C(ck + 3.2, 'row1HlColor', AMB, 0.2); I(ck + 3.2, 'row1HlColor', AMB, 0.2);
    s.shake(ck + 3.2, 'crit', 6, 0.35);
    s.sfx(ck + 3.2, 'thump', { note: 'E3', gain: 0.75, pan: 0.3 });
    // the finding is written down as data, without repairing D1
    I(ck + 4.2, 'row2Slot', 0, 0.3); I(ck + 4.2, 'row2Pill', 'F1'); I(ck + 4.2, 'row2PillColor', AMB);
    I(ck + 4.2, 'row2Text', 'Rollback missing'); I(ck + 4.2, 'row2Color', AMB); I(ck + 4.2, 'row2Reveal', 0); I(ck + 4.2, 'row2Reveal', 1, 0.9, 'linear');
    s.sfx(ck + 4.2, 'store', { note: 'E5', gain: 0.9, pan: 0 });
    C(ck + 5.2, 'row1Hl', 0, 0.4); I(ck + 5.2, 'row1Hl', 0, 0.4);
    finish(19.6, 'check');
    I(19.6, 'title', 'Checked D1'); I(19.6, 'titleColor', T.fg, 0.3); I(19.6, 'tag', '1 finding'); I(19.6, 'tagColor', AMB); I(19.6, 'tagK', 0); I(19.6, 'tagK', 1, 0.35);

    // ---------- beat 4 (21.6-32): the finding goes to Assemble; the result keeps D1 and F1 ----------
    const a2 = handoff(21.6, 'dep2', 'F1', AMB, edge('check', 'r'), [lanes.asm.x - LW / 2 - 4, lanes.asm.y], [[700, 760], [700, 920]], 'check', 'asm');
    start(a2 + 1.6, 'asm', 4.0); // 24.3 -> 28.3
    I(a2 + 1.6, 'title', 'Assembling'); I(a2 + 1.6, 'titleColor', AMB, 0.3); I(a2 + 1.6, 'tagK', 0, 0.25);
    finish(28.3, 'asm');
    I(28.9, 'title', 'Result: D1 + F1'); I(28.9, 'titleColor', T.fg, 0.3); s.pulse(28.9, 'insp', T.fg);
    s.sfx(28.9, 'deliver', { note: 'G4', gain: 0.9, pan: 0 });
    I(29.7, 'tag', 'needs revision'); I(29.7, 'tagColor', AMB); I(29.7, 'tagK', 0); I(29.7, 'tagK', 1, 0.4);
    s.sfx(29.7, 'store', { note: 'C5', gain: 0.7, pan: 0.4 });

    // ---------- beat 5 (32-44): replay the order; the steps' times add up ----------
    const rc = 32.4;
    [['draft', 0], ['check', 1], ['asm', 2]].forEach(([id, i], k) => {
      const t = rc + k * 1.0;
      s.set(t, 'axis', 'seg' + i + 'Color', T.fg, 0); s.set(t, 'axis', 'seg' + i, 1, 0.55, 'out');
      s.pulse(t, id); s.sfx(t, 'ack', { note: lanes[id].note, gain: 1.5, pan: pan(id) });
      if (k < 2) { const w = 'wire:dep' + (k + 1), c = k === 0 ? BLUE : AMB; s.set(t + 0.55, w, 'color', T.fg, 0.12); s.set(t + 0.85, w, 'color', c, 0.3); }
    });
    s.set(rc + 3.0, 'axis', 'label', 'time adds up: 3 steps', 0); s.set(rc + 3.0, 'axis', 'labelColor', T.fg, 0.3);
    s.sfx(rc + 3.0, 'clock', { gain: 1.2, pan: 0.6 });
    s.fade(41.6, 1, 1.4);
  },
});
