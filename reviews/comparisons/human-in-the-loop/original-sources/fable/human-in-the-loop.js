/* Human-in-the-loop — fable cut: "resume replays the step".
 * Lesson: when an agent pauses a step for human approval, the runtime re-runs that whole step from its
 * beginning on resume (LangGraph interrupts semantics). A side effect placed before the approval runs twice.
 * Fix shown: move the side effect after the approval. Author: anthropic/claude-fable-5-1, reasoning high.
 * Times are authored at speed 1. Render with engine/render.mjs (see render.sh).
 */
FlowVideo.scene({
  meta: { title: 'Human-in-the-loop', titleSize: 92, subtitle: 'RESUME REPLAYS THE STEP', duration: 29.0, fps: 30, speed: 1 },
  build(s) {
    const T = s.THEME;
    // Stage ------------------------------------------------------------------
    s.node('reviewer', 'box', { x: 540, y: 560, w: 340, h: 136, label: 'Reviewer', sublabel: 'human' });
    s.node('ckpt', 'store', { x: 540, y: 820, w: 400, rows: 1, rowSize: 28, row0Text: '' });
    s.node('ckptLabel', 'label', { x: 850, y: 820, text: 'Checkpoint', size: 32 });
    s.node('agent', 'store', { x: 540, y: 1120, w: 560, rows: 3, rowSize: 30, label: 'deploy node',
      row0Text: 'notify #ops', row1Text: 'approve?', row2Text: 'apply v8', cursor: -1 });
    s.node('ops', 'store', { x: 290, y: 1540, w: 440, rows: 2, rowSize: 28, label: '#ops channel', row0Text: '', row1Text: '' });
    s.node('prod', 'db', { x: 810, y: 1540, label: 'Production', sublabel: 'schema v7' });
    s.node('count', 'badge', { x: 290, y: 1745, text: '', color: T.bad, scale: 0 });

    s.wire('r-c', 'reviewer.bottom', 'ckpt.top');
    s.wire('c-a', 'ckpt.bottom', 'agent.top');
    s.wire('a-ops', 'agent.bottom', 'ops.top', { via: [[540, 1340], [290, 1340]] });
    s.wire('a-prod', 'agent.bottom', 'prod.top', { via: [[540, 1340], [810, 1340]] });

    const panOps = s.panOf('ops'), panProd = s.panOf('prod');

    // Sounds -----------------------------------------------------------------
    // Rewind: a quick falling sweep with a tick, heard whenever the step restarts from its top.
    s.sound('rewind', { base: 'G5', gain: 0.5,
      layers: [{ type: 'tone', wave: 'sine', ratio: 1, glideTo: 0.3, glide: 0.24, attack: 0.004, decay: 0.26, gain: 0.8, harmonics: [1, 0.3, 0.1] },
               { type: 'noise', lp: 4000, hp: 1200, attack: 0.001, decay: 0.03, gain: 0.3 }] });
    // Duplicate: a dull thump with a sour low buzz; the disruption, loudest cue in the cut.
    s.sound('dup', { base: 'E4', gain: 0.95,
      layers: [{ type: 'tone', wave: 'sine', ratio: 1, glideTo: 0.62, glide: 0.25, attack: 0.003, decay: 0.3, gain: 0.6, harmonics: [1, 0.2] },
               { type: 'tone', wave: 'sine', freq: 60, glideTo: 38, glide: 0.25, attack: 0.002, decay: 0.32, gain: 0.8 },
               { type: 'tone', wave: 'square', ratio: 0.84, delay: 0.1, attack: 0.004, decay: 0.22, gain: 0.22 }] });

    // Step identity carries its own pitch: notify = C5, approve = E5, apply = G5.
    const NOTE = { notify: 'C5', approve: 'E5', apply: 'G5' };

    // Helpers ------------------------------------------------------------------
    const rowOn = (t, i, color) => s.set(t, 'agent', 'row' + i + 'Color', color, 0.15);
    const rowDone = (t, i) => s.set(t, 'agent', 'row' + i + 'Color', T.ok, 0.2);
    const cursorTo = (t, i, dur = 0.3) => s.set(t, 'agent', 'cursor', i, dur, 'back');
    const step = (t, i, kind) => { // cursor moves to row i and the row lights
      cursorTo(t, i); rowOn(t, i, kind === 'approve' ? T.accent : T.fg);
      s.sfx(t + 0.05, 'arrive', { note: NOTE[kind], gain: 0.5 });
    };
    const notify = (t, row, ok) => { // send the notice to #ops; it lands as a row (green = first, red = duplicate)
      s.packet({ route: ['agent.bottom', [540, 1340], [290, 1340], 'ops.top'], t, dur: 0.7, kind: 'chip', label: 'v8 notice', color: T.fg });
      s.sfx(t, 'send', { note: 'C6', gain: 0.25 });
      const land = t + 0.7;
      s.set(land, 'ops', 'row' + row + 'Text', 'v8 notice', 0);
      s.set(land, 'ops', 'row' + row + 'Alpha', 1, 0.15);
      s.set(land, 'ops', 'row' + row + 'Color', ok ? T.ok : T.bad, 0.15);
      if (ok) { s.ripple(land, 'ops.top', T.ok); s.sfx(land, 'store', { note: 'G5', pan: panOps }); }
      else { s.ripple(land, [462, 1573], T.bad, { r0: 24, r1: 150, dur: 0.7, mark: 'x' }); s.shake(land, 'ops', 10, 0.45); s.sfx(land, 'dup', { pan: panOps }); }
      return land;
    };
    const askApproval = (t) => { // pause: question goes to the checkpoint, then to the reviewer
      s.packet({ route: ['agent.top', 'ckpt.bottom'], t, dur: 0.5, kind: 'chip', label: 'approve v8?', color: T.accent });
      s.sfx(t, 'send', { note: 'E6', gain: 0.25 });
      s.set(t + 0.5, 'ckpt', 'row0Text', 'approve v8?', 0);
      s.set(t + 0.5, 'ckpt', 'row0Alpha', 1, 0);
      s.set(t + 0.5, 'ckpt', 'row0Color', T.accent, 0.15);
      s.ripple(t + 0.5, 'ckpt', T.accent, { r0: 20, r1: 110 });
      s.sfx(t + 0.5, 'store', { note: 'E5' });
      s.set(t + 0.5, 'agent', 'cursorColor', T.dim, 0.3); // the step is suspended
      s.packet({ route: ['ckpt.top', 'reviewer.bottom'], t: t + 0.8, dur: 0.5, kind: 'chip', label: 'approve v8?', color: T.accent });
      s.sfx(t + 0.8, 'send', { note: 'E6', gain: 0.2 });
      s.pulse(t + 1.3, 'reviewer', T.accent, 1.2);
      s.sfx(t + 1.3, 'deliver', { note: 'A5', gain: 0.5 });
      return t + 1.3;
    };
    const approve = (t) => { // reviewer says yes; the answer is persisted; the runtime resumes the step
      s.pulse(t, 'reviewer', T.ok, 0.8);
      s.sfx(t, 'chime', { note: 'C6', gain: 0.45 });
      s.packet({ route: ['reviewer.bottom', 'ckpt.top'], t: t + 0.1, dur: 0.5, kind: 'chip', label: 'yes', color: T.ok });
      s.set(t + 0.6, 'ckpt', 'row0Text', 'approve v8? \u2192 yes', 0);
      s.set(t + 0.6, 'ckpt', 'row0Color', T.ok, 0.15);
      s.ripple(t + 0.6, 'ckpt', T.ok, { r0: 20, r1: 110 });
      s.sfx(t + 0.6, 'store', { note: 'G5' });
      s.packet({ route: ['ckpt.bottom', 'agent.top'], t: t + 0.9, dur: 0.5, kind: 'chip', label: 'resume', color: T.ok });
      s.sfx(t + 0.9, 'send', { note: 'G6', gain: 0.25 });
      return t + 1.4;
    };
    const rewind = (t, fromRow) => { // the whole step restarts at its first row
      for (let i = 0; i < 3; i++) s.set(t, 'agent', 'row' + i + 'Color', T.dim, 0.15);
      s.set(t, 'agent', 'cursorColor', T.accent, 0.1);
      if (fromRow === 0) s.set(t, 'agent', 'cursor', -0.7, 0);
      cursorTo(t + 0.02, 0, 0.4);
      s.sfx(t, 'rewind');
      s.pulse(t, 'agent', null, 0.5);
    };
    const apply = (t) => { // apply the migration to production
      s.packet({ route: ['agent.bottom', [540, 1340], [810, 1340], 'prod.top'], t, dur: 0.7, kind: 'chip', label: 'apply v8', color: T.fg });
      s.sfx(t, 'send', { note: 'G6', gain: 0.25 });
      const land = t + 0.7;
      s.set(land, 'prod', 'busy', 1, 0.1);
      for (let k = 0; k < 4; k++) s.sfx(land + 0.05 + k * 0.2, 'work', { pan: panProd, gain: 0.3 });
      s.set(land + 0.8, 'prod', 'busy', 0, 0.1);
      s.pulse(land + 0.8, 'prod', T.ok, 1.0);
      s.set(land + 0.8, 'prod', 'sublabel', 'schema v8', 0);
      s.set(land + 0.8, 'prod', 'subColor', T.ok, 0.2);
      s.sfx(land + 0.8, 'chime', { note: 'G5', pan: panProd, gain: 0.45 });
      return land + 0.8;
    };
    const badge = (t, txt, color) => {
      s.set(t, 'count', 'text', txt, 0); s.set(t, 'count', 'color', color, 0);
      s.set(t, 'count', 'scale', 0.4, 0); s.set(t + 0.02, 'count', 'scale', 1, 0.35, 'back');
    };

    // Opening: the stage fades in from the title-only frame so first and last frames match.
    s.set(0, 'stage', 'veil', 1, 0);
    s.set(0.1, 'stage', 'veil', 0, 0.6);

    // Beat 1 (0.8–5.4): normal run. notify runs, then the step pauses for approval.
    let t = 0.9;
    step(t, 0, 'notify');
    let land = notify(t + 0.4, 0, true);           // 1.3 → lands 2.0
    rowDone(land, 0);
    step(land + 0.8, 1, 'approve');               // 2.8
    let asked = askApproval(land + 1.2);           // 3.2 → reviewer lit at 4.5

    // Beat 2 (6.3–12.6): approval resumes the step from its top; notify runs again; #ops gets a duplicate.
    let resumed = approve(asked + 1.8);            // 6.3 → resume lands 7.7
    rewind(resumed, 1);                            // 7.7
    step(resumed + 0.6, 0, 'notify');              // 8.3
    land = notify(resumed + 1.0, 1, false);        // 8.7 → duplicate lands 9.4
    rowDone(land, 0);
    badge(land + 0.15, 'sent \u00d72', T.bad);
    step(land + 0.9, 1, 'approve');                // 10.3: approve? returns the stored answer at once
    rowDone(land + 1.1, 1);
    s.pulse(land + 1.0, 'ckpt', T.ok, 0.5);
    s.sfx(land + 1.05, 'hit', { note: 'E6', gain: 0.4 });
    step(land + 1.8, 2, 'apply');                  // 11.2
    let done = apply(land + 2.2);                  // 11.6 → schema v8 at 13.1
    rowDone(done, 2);

    // Beat 3 (15.0–17.0): reset, then move notify after approve?.
    t = done + 1.9;                                // 15.0
    s.set(t, 'ops', 'row0Alpha', 0, 0.4); s.set(t, 'ops', 'row1Alpha', 0, 0.4);
    s.set(t + 0.4, 'ops', 'row0Text', '', 0); s.set(t + 0.4, 'ops', 'row1Text', '', 0);
    s.set(t, 'count', 'scale', 0, 0.3);
    s.sfx(t, 'poof', { pan: panOps, gain: 0.4 });
    s.set(t + 0.2, 'ckpt', 'row0Alpha', 0, 0.3); s.set(t + 0.5, 'ckpt', 'row0Text', '', 0);
    s.set(t + 0.2, 'prod', 'sublabel', 'schema v7', 0); s.set(t + 0.2, 'prod', 'subColor', T.mid, 0.3);
    s.sfx(t + 0.2, 'poof', { pan: panProd, gain: 0.3, note: 'E5' });
    s.set(t, 'agent', 'cursor', -1, 0);
    for (let i = 0; i < 3; i++) s.set(t, 'agent', 'row' + i + 'Color', T.dim, 0.3);
    const swap = t + 0.9;                          // 15.9
    s.set(swap, 'agent', 'row0Alpha', 0, 0.22); s.set(swap, 'agent', 'row1Alpha', 0, 0.22);
    s.set(swap + 0.25, 'agent', 'row0Text', 'approve?', 0); s.set(swap + 0.25, 'agent', 'row1Text', 'notify #ops', 0);
    s.set(swap + 0.25, 'agent', 'row0Alpha', 1, 0.22); s.set(swap + 0.25, 'agent', 'row1Alpha', 1, 0.22);
    s.set(swap + 0.25, 'agent', 'row0Color', T.accent, 0.1); s.set(swap + 0.25, 'agent', 'row1Color', T.accent, 0.1);
    s.set(swap + 0.9, 'agent', 'row0Color', T.dim, 0.3); s.set(swap + 0.9, 'agent', 'row1Color', T.dim, 0.3);
    s.ripple(swap + 0.25, 'agent', T.accent, { r0: 40, r1: 200, dur: 0.7 });
    s.sfx(swap + 0.25, 'store', { note: 'E5', gain: 0.45 });
    s.sfx(swap + 0.42, 'store', { note: 'C5', gain: 0.45 });

    // Beat 4 (17.3–25.6): same pause and resume; the replayed top row is approve?, so notify runs once.
    t = swap + 1.4;                                // 17.3
    s.set(t, 'agent', 'cursor', 0, 0);
    s.set(t, 'agent', 'cursorColor', T.accent, 0);
    rowOn(t, 0, T.accent); s.sfx(t + 0.05, 'arrive', { note: NOTE.approve, gain: 0.5 });
    asked = askApproval(t + 0.4);                  // 17.7 → reviewer lit 19.0
    resumed = approve(asked + 1.5);                // 20.5 → resume lands 21.9
    rewind(resumed, 0);                            // 21.9: restarts at approve?, which returns the stored yes
    rowOn(resumed + 0.45, 0, T.accent);
    rowDone(resumed + 0.6, 0);
    s.pulse(resumed + 0.5, 'ckpt', T.ok, 0.5);
    s.sfx(resumed + 0.55, 'hit', { note: 'E6', gain: 0.4 });
    step(resumed + 1.3, 1, 'notify');              // 23.2
    land = notify(resumed + 1.7, 0, true);         // 23.6 → lands 24.3
    rowDone(land, 1);
    badge(land + 0.15, 'sent \u00d71', T.ok);
    s.sfx(land + 0.2, 'hit', { note: 'G6', pan: panOps, gain: 0.35 });
    step(land + 0.9, 2, 'apply');                  // 25.2
    done = apply(land + 1.3);                      // 25.6 → schema v8 at 27.1
    rowDone(done, 2);

    // Close: hold the resolved state, then fade the stage so the loop lands on the opening frame.
    const fadeAt = done + 2.0;                     // 29.1
    s.fade(fadeAt, 1, 0.7);
    s.meta.duration = fadeAt + 1.1;                // 30.2
  },
});
