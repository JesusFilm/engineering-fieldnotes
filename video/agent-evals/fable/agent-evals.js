// Agent evals — side-effect check (fable variant, authored by anthropic/claude-fable-5-1).
// Edited by gpt-6-astra comparative review: readable tables and explicit required checks.
// Lesson: a grader that only asserts the requested outcome passes an agent that also broke unrelated state.
// Assert what must stay unchanged as well (SWE-bench style FAIL_TO_PASS + PASS_TO_PASS).
// Taught with motion and sound only; on-screen words are node labels, chips, row names and PASS/FAIL statuses.
// The scenario is illustrative: a harness change is shown breaking two unrelated tests. It is one plausible
// regression, not a claim about how any particular model or prompt behaves.
FlowVideo.scene({
  meta: { title: 'Agent evals', subtitle: 'SIDE-EFFECT CHECK', duration: 24, fps: 30, speed: 0.9 },
  build(s) {
    const T = s.THEME;

    // ---------- stage ----------
    s.node('task', 'box', { x: 540, y: 590, w: 480, h: 110, label: 'Task', labelSize: 40, sublabel: 'fix login bug', subSize: 34, subMono: true });
    s.node('agent', 'box', { x: 540, y: 850, w: 480, h: 120, label: 'Agent', labelSize: 40, sublabel: 'harness v1', subSize: 34 });
    s.node('suite', 'store', { x: 540, y: 1190, w: 660, rows: 3, rowTextSize: 36, rowStatusSize: 36 });
    s.node('grader', 'store', { x: 540, y: 1580, w: 660, rows: 2, rowTextSize: 36, label: 'Grader · required checks', labelSize: 36, labelColor: T.fg });
    s.node('verdict', 'badge', { x: 540, y: 1810, alpha: 0 });

    s.wire('ta', 'task.bottom', 'agent.top');
    s.wire('as', 'agent.bottom', 'suite.top');
    s.wire('sg', 'suite.bottom', 'grader.top');

    // Row geometry (store: pad 22, row 54, gap 12). Gutter marks sit just left of each box.
    const SUITE_TOP = 1190 - 115, GRADER_TOP = 1580 - 82;
    const suiteRow = (i) => [166, SUITE_TOP + 22 + 27 + i * 66];
    const graderRow = (i) => [166, GRADER_TOP + 22 + 27 + i * 66];
    const PAN = { gutter: s.panOf([166, 0]), verdict: s.panOf('verdict'), centre: 0 };

    const TESTS = ['test_login', 'test_signup', 'test_reset'];
    const setTest = (t, i, pass, dur = 0.2) => {
      s.set(t, 'suite', 'row' + i + 'Color', pass ? T.ok : T.bad, dur);
      s.set(t, 'suite', 'row' + i + 'Status', pass ? 'PASS' : 'FAIL', 0);
    };
    // Opening state: login fails, the other two pass. One grader assertion exists.
    TESTS.forEach((name, i) => { s.set(0, 'suite', 'row' + i + 'Text', name, 0); setTest(0, i, i !== 0, 0); });
    s.set(0, 'grader', 'row0Text', 'login FAIL\u2192PASS', 0); s.set(0, 'grader', 'row0Color', T.mid, 0);
    s.set(0, 'grader', 'row1Text', 'others PASS\u2192PASS', 0); s.set(0, 'grader', 'row1Color', T.accent, 0); s.set(0, 'grader', 'row1Alpha', 0, 0);

    // ---------- sounds ----------
    s.sound('switch', { base: 'D5', gain: 0.42, layers: [
      { type: 'noise', lp: 4000, hp: 1000, attack: 0.001, decay: 0.02, gain: 0.5 },
      { type: 'tone', wave: 'sine', ratio: 1, delay: 0.02, attack: 0.002, decay: 0.14, harmonics: [1, 0.25] },
      { type: 'tone', wave: 'sine', ratio: 1.5, delay: 0.11, attack: 0.002, decay: 0.2, harmonics: [1, 0.25] }] });
    s.sound('fail', { base: 'E4', gain: 0.85, layers: [
      { type: 'tone', wave: 'sine', ratio: 1, glideTo: 0.6, glide: 0.3, attack: 0.003, decay: 0.35, gain: 0.55, harmonics: [1, 0.2] },
      { type: 'tone', wave: 'square', ratio: 0.5, delay: 0.14, attack: 0.004, decay: 0.4, gain: 0.22 },
      { type: 'tone', wave: 'sine', freq: 60, glideTo: 36, glide: 0.3, attack: 0.002, decay: 0.45, gain: 0.85 },
      { type: 'noise', lp: 3000, lpTo: 300, attack: 0.002, decay: 0.25, gain: 0.3 }] });

    const chip = (label, route, t, dur, color) => s.packet({ kind: 'chip', label, route, t, dur, color });

    // One trial: task → agent works → patch lands in the suite. With breaks=true two unrelated tests go red.
    const trial = (t, breaks) => {
      s.pulse(t, 'task'); s.sfx(t, 'send', { note: 'E6' });
      chip('fix login bug', ['task.bottom', 'agent.top'], t, 0.6, T.fg);
      const a = t + 0.6;
      s.pulse(a, 'agent'); s.sfx(a, 'arrive', { note: 'C5', gain: 0.6 });
      s.set(a, 'agent', 'color', T.fg, 0.15);
      for (let k = 0; k < 4; k++) s.sfx(a + 0.15 + k * 0.2, 'work');
      s.set(a + 0.95, 'agent', 'color', T.mid, 0.3);
      chip('patch', ['agent.bottom', 'suite.top'], a + 0.95, 0.55, T.fg);
      s.sfx(a + 0.95, 'send', { note: 'C6' });
      const land = a + 1.5;
      s.pulse(land, 'suite'); s.sfx(land, 'arrive', { note: 'E5', gain: 0.55 });
      setTest(land + 0.1, 0, true);
      s.ripple(land + 0.1, suiteRow(0), T.ok, { r0: 10, r1: 60 }); s.sfx(land + 0.1, 'store', { note: 'G5', pan: PAN.gutter });
      let end = land + 0.4;
      if (breaks) {
        [1, 2].forEach((i, k) => {
          const b = land + 0.55 + k * 0.32;
          setTest(b, i, false, 0.1);
          s.shake(b, 'suite', 8, 0.3); s.ripple(b, suiteRow(i), T.bad, { r0: 10, r1: 70, mark: 'x' });
          s.sfx(b, 'thump', { note: k ? 'D4' : 'E4', gain: 0.75 });
        });
        end = land + 1.3;
      }
      return end;
    };

    // Grading pass over the final suite state. checks = 1 (login only) or 2 (login + the others).
    const grade = (t, checks) => {
      s.packet({ kind: 'dot', route: ['grader.top', 'suite.bottom'], t, dur: 0.4, color: T.fg });
      s.sfx(t, 'send', { note: 'G6', gain: 0.9 });
      const flash = (row, tt) => { s.set(tt, 'grader', 'row' + row + 'Color', T.fg, 0.08); };
      let c = t + 0.45;
      flash(0, c);
      s.ripple(c, suiteRow(0), T.ok, { r0: 8, r1: 50, mark: 'check' }); s.sfx(c, 'ack', { note: 'G6', gain: 1.2, pan: PAN.gutter });
      s.set(c + 0.25, 'grader', 'row0Color', T.ok, 0.25);
      let verdictAt = c + 0.85, pass = true;
      if (checks === 2) {
        const c2 = c + 0.7;
        flash(1, c2);
        [1, 2].forEach((i, k) => {
          const x = c2 + 0.05 + k * 0.3;
          s.ripple(x, suiteRow(i), T.bad, { r0: 8, r1: 60, mark: 'x' }); s.shake(x, 'suite', 6, 0.25);
          s.sfx(x, 'miss', { pan: PAN.gutter, gain: 1.1 });
        });
        s.set(c2 + 0.65, 'grader', 'row1Color', T.bad, 0.25);
        verdictAt = c2 + 1.1; pass = false;
      }
      s.set(verdictAt, 'verdict', 'text', pass ? 'PASS' : 'FAIL', 0);
      s.set(verdictAt, 'verdict', 'color', pass ? T.ok : T.bad, 0);
      s.set(verdictAt, 'verdict', 'scale', 0.5, 0); s.set(verdictAt, 'verdict', 'scale', 1.2, 0.4, 'back');
      s.set(verdictAt, 'verdict', 'alpha', 1, 0.12);
      s.pulse(verdictAt, 'grader', pass ? T.ok : T.bad, 0.5);
      if (pass) s.sfx(verdictAt, 'chime', { note: 'C6', pan: PAN.verdict });
      else { s.sfx(verdictAt, 'fail', { pan: PAN.verdict }); s.shake(verdictAt, 'verdict', 10, 0.4); }
      return verdictAt;
    };

    // ---------- timeline (authored at speed 1) ----------
    // Fade in from black so the first and last frames match for looping.
    s.set(0, 'stage', 'veil', 1, 0); s.fade(0.05, 0, 0.5);

    // Beat 1 — normal: the agent fixes test_login, the single assertion passes, nothing else changed.
    const e1 = trial(0.7, false);
    const v1 = grade(e1 + 0.3, 1);

    // Beat 2 — fresh environment for the next trial, then the harness changes.
    const R = v1 + 2.3;
    s.set(R, 'verdict', 'alpha', 0, 0.3);
    setTest(R + 0.1, 0, false, 0.3); s.ripple(R + 0.1, suiteRow(0), T.mid, { r0: 10, r1: 50, dur: 0.5 }); s.sfx(R + 0.1, 'poof', { gain: 0.7, pan: PAN.gutter });
    s.set(R + 0.1, 'grader', 'row0Color', T.mid, 0.4);
    const SW = R + 1.0;
    s.set(SW, 'agent', 'sublabel', 'harness v2', 0); s.set(SW, 'agent', 'subColor', T.accent, 0.1);
    s.pulse(SW, 'agent', T.accent, 0.6); s.sfx(SW, 'switch');

    // Beat 3 — problem: v2 fixes login but breaks two unrelated tests; the single assertion still says PASS.
    const e3 = trial(SW + 1.2, true);
    const v3 = grade(e3 + 0.3, 1);

    // Beat 4 — resolution: add the assertion for what must stay unchanged; regrade the same end state → FAIL.
    const ADD = v3 + 2.6;
    s.set(ADD, 'verdict', 'alpha', 0, 0.3);
    s.set(ADD + 0.2, 'grader', 'row1Alpha', 1, 0.25);
    s.ripple(ADD + 0.2, graderRow(1), T.accent, { r0: 10, r1: 70 }); s.sfx(ADD + 0.2, 'store', { note: 'C6', pan: PAN.gutter });
    s.pulse(ADD + 0.2, 'grader', T.accent, 0.5);
    s.set(ADD + 0.2, 'grader', 'row0Color', T.mid, 0.3);
    const v4 = grade(ADD + 1.4, 2);

    // Hold the verdict, then fade to black for a clean loop.
    const END = v4 + 2.8;
    s.fade(END, 1, 0.7);
    s.meta.duration = END + 1.0;
  },
});

