// Loop engineering — progress check: a repair agent edits code and runs tests in a loop.
// Each cycle records evidence from a fixed test suite. A passing result goes to review.
// Three matching failure reports reach this illustrative repeat limit and trigger handoff.
// Equal failure counts alone cannot establish that the reports or underlying failures match.
// Taught with motion + sound only. Words on screen: node names, data chips, and verdict badges.
FlowVideo.scene({
  meta: { title: 'Loop engineering', subtitle: 'PROGRESS CHECK', duration: 30, fps: 30, speed: 1, fullFade: true },
  build(s) {
    const T = s.THEME;
    // ----- stage -----
    s.node('agent', 'box', { x: 540, y: 600, w: 340, h: 120, label: 'Agent' });
    s.node('verdict', 'badge', { x: 540, y: 780, alpha: 0 });
    s.node('tests', 'box', { x: 540, y: 960, w: 400, h: 120, label: '12 fixed tests' });
    s.node('logLabel', 'label', { x: 540, y: 1168, text: 'Run log', size: 32 });
    s.node('log', 'store', { x: 540, y: 1320, w: 560, rows: 3, textSize: 36 });
    s.node('human', 'laptop', { x: 540, y: 1660 });
    s.node('humanLabel', 'label', { x: 540, y: 1762, text: 'Human', size: 32 });

    // Clockwise ring: edits go down the right side, results come back up the left side.
    const R = [812, 600], Rb = [812, 960], L = [268, 960], Lt = [268, 600];
    s.wire('down', 'agent.right', 'tests.right', { via: [R, Rb] });
    s.wire('up', 'tests.left', 'agent.left', { via: [L, Lt] });
    s.wire('esc', 'log.bottom', 'human.top');
    const rowY = (i) => 1254 + 66 * i;        // centre of run-log row i
    const rowMark = (i) => [795, rowY(i)];    // right end of row i, where the progress check rings
    const PAN_L = s.panOf(L), PAN_R = s.panOf(R);
    for (let i = 0; i < 3; i++) s.set(0, 'log', 'row' + i + 'Alpha', 0, 0);

    // Scene-local sound: the stall alarm is a crash without the long noise tail.
    s.sound('stall', { base: 'A4', gain: 0.8,
      layers: [{ type: 'noise', lp: 6000, lpTo: 300, attack: 0.002, decay: 0.3, gain: 0.4 },
               { type: 'tone', wave: 'sine', ratio: 1, glideTo: 0.25, glide: 0.5, attack: 0.004, decay: 0.6, gain: 0.5, harmonics: [1, 0.3, 0.1] },
               { type: 'tone', wave: 'sine', freq: 70, glideTo: 34, glide: 0.5, attack: 0.003, decay: 0.55, gain: 0.8 }] });

    const chip = (label, route, t, dur, color) => s.packet({ kind: 'chip', label, route, t, dur, color, size: 34 });

    // One loop cycle: EDIT n travels to Tests, Tests run, the result travels back to Agent
    // and is recorded in run-log row i. Returns the time the row lands.
    const cycle = (t, n, i, result) => {
      s.pulse(t, 'agent'); s.sfx(t, 'send', { note: 'E6', gain: 1.2 });
      chip('EDIT ' + n, ['agent.right', R, Rb, 'tests.right'], t, 0.8, T.fg);
      const a = t + 0.8;
      s.pulse(a, 'tests'); s.set(a, 'tests', 'color', T.fg, 0.15); s.set(a, 'tests', 'labelColor', T.accent, 0.15);
      s.sfx(a, 'arrive', { note: 'C5', gain: 0.6, pan: PAN_R });
      for (let k = a + 0.15; k < a + 0.85; k += 0.2) s.sfx(k, 'work', { pan: 0 });
      const d = a + 0.85;
      s.set(d, 'tests', 'color', T.mid, 0.3); s.set(d, 'tests', 'labelColor', T.fg, 0.3);
      const color = result.pass ? T.ok : T.bad;
      if (result.pass) s.sfx(d, 'hit', { pan: PAN_L }); else s.sfx(d, 'miss', { pan: PAN_L, note: result.fails >= 5 ? 'D4' : 'E4' });
      chip(result.label, ['tests.left', L, Lt, 'agent.left'], d, 0.8, color);
      const b = d + 0.8;
      s.pulse(b, 'agent', T.fg); s.sfx(b, 'arrive', { note: 'E5', gain: 0.45 });
      // observed result lands in the run log
      const r = b + 0.1;
      s.set(r, 'log', 'row' + i + 'Text', result.logLabel || result.label, 0); s.set(r, 'log', 'row' + i + 'Color', color, 0);
      s.set(r, 'log', 'row' + i + 'Fill', result.fails / 5, 0); s.set(r, 'log', 'row' + i + 'Alpha', 1, 0.2);
      s.ripple(r, [540, rowY(i)], color, { r0: 24, r1: 120, dur: 0.5 }); s.sfx(r, 'store', { note: 'G5' });
      return r;
    };
    // Progress check on the row that just landed, compared with the previous row.
    const improved = (t, i) => { s.ripple(t, rowMark(i), T.ok, { mark: 'check', markR: 22, r0: 24, r1: 100, dur: 0.8 }); s.sfx(t, 'ack', { note: 'G6', gain: 1.4 }); };
    const same = (t, i) => {
      s.ripple(t, rowMark(i), T.accent, { mark: 'x', markR: 22, r0: 24, r1: 100, dur: 0.8 }); s.shake(t, 'log', 6, 0.3);
      s.sfx(t, 'thump', { gain: 0.6 });
      s.set(t, 'log', 'row' + (i - 1) + 'Color', T.accent, 0.3); s.set(t, 'log', 'row' + i + 'Color', T.accent, 0.3);
    };
    const verdict = (t, txt, color, sound) => {
      s.set(t, 'verdict', 'text', txt, 0); s.set(t, 'verdict', 'color', color, 0);
      s.set(t, 'verdict', 'alpha', 1, 0.15); s.set(t, 'verdict', 'scale', 0.8, 0); s.set(t, 'verdict', 'scale', 1.5, 0.35, 'back');
      s.sfx(t, sound.name, sound);
    };

    // Opening veil so the loop starts and ends on the same frame.
    s.fade(0, 1, 0); s.fade(0.1, 0, 0.5);

    // ----- Run 1: measurable progress, then PASS -----
    const FAIL5 = { label: '5 FAIL', fails: 5 }, FAIL2 = { label: '2 FAIL', fails: 2 }, PASS = { label: 'PASS', fails: 0, pass: true };
    const r0 = cycle(0.8, 1, 0, FAIL5);
    const r1 = cycle(4.2, 2, 1, FAIL2); improved(r1 + 0.45, 1);
    const r2 = cycle(7.6, 3, 2, PASS); improved(r2 + 0.45, 2);
    const DONE = r2 + 1.0;
    s.set(DONE, 'agent', 'color', T.ok, 0.3); s.set(DONE, 'agent', 'labelColor', T.ok, 0.3);
    verdict(DONE, 'REVIEW', T.ok, { name: 'chime', note: 'C6' });

    // Passing the fixed suite stops edits and hands evidence to a reviewer.
    s.set(DONE, 'wire:down', 'alpha', 0.3, 0.2);s.set(DONE, 'wire:up', 'alpha', 0.3, 0.2);
    chip('REVIEW', ['log.bottom', 'human.top'], DONE + 0.2, 0.7, T.ok);
    s.sfx(DONE + 0.2, 'send', {note:'G5',gain:.6});
    s.set(DONE + 0.9, 'human', 'color', T.ok, 0.2);
    s.set(DONE + 0.9, 'humanLabel', 'text', 'Review patch', 0);
    s.ripple(DONE + 0.9, 'human', T.ok, {r0:40,r1:100,dur:.5});
    s.sfx(DONE + 0.9, 'deliver', {note:'C6',gain:.6});

    // ----- reset between runs -----
    const OUT1 = DONE + 2.4;
    s.fade(OUT1, 1, 0.6);
    const RS = OUT1 + 0.7;
    for (let i = 0; i < 3; i++) { s.set(RS, 'log', 'row' + i + 'Alpha', 0, 0); s.set(RS, 'log', 'row' + i + 'Color', T.dim, 0); }
    s.set(RS, 'verdict', 'alpha', 0, 0); s.set(RS, 'agent', 'color', T.mid, 0); s.set(RS, 'agent', 'labelColor', T.fg, 0);
    s.set(RS, 'human', 'color', T.mid, 0);s.set(RS, 'humanLabel', 'text', 'Human', 0);
    s.set(RS, 'wire:down', 'alpha', 1, 0);s.set(RS, 'wire:up', 'alpha', 1, 0);
    s.set(RS, 'logLabel', 'text', 'Repeat limit · 3', 0);
    s.fade(RS + 0.2, 0, 0.6);

    // ----- Run 2: same normalized assertion report a7 three times -> repeat limit -> hand off -----
    const FAIL3 = { label: 'FAIL a7', logLabel: '3 FAIL · a7', fails: 3 };
    const R2 = RS + 1.1;
    const q0 = cycle(R2, 1, 0, FAIL3);
    const q1 = cycle(R2 + 3.4, 2, 1, FAIL3); same(q1 + 0.45, 1);
    const q2 = cycle(R2 + 6.8, 3, 2, FAIL3);
    const STALL = q2 + 0.45;
    s.ripple(STALL, rowMark(2), T.bad, { mark: 'x', markR: 22, r0: 24, r1: 120, dur: 0.9 });
    for (let i = 0; i < 3; i++) s.set(STALL, 'log', 'row' + i + 'Color', T.bad, 0.2);
    s.set(STALL, 'log', 'color', T.bad, 0.2); s.set(STALL + 1.2, 'log', 'color', T.mid, 0.6);
    s.shake(STALL, 'log', 14, 0.5); s.sfx(STALL, 'stall');
    verdict(STALL + 0.5, 'REPEAT LIMIT', T.bad, { name: 'thump', gain: 0.7 });
    // the loop is stopped: agent, tests and ring dim
    const STOP = STALL + 1.1;
    for (const id of ['agent', 'tests']) s.set(STOP, id, 'alpha', 0.3, 0.4);
    for (const w of ['down', 'up']) s.set(STOP, 'wire:' + w, 'alpha', 0.3, 0.4);
    // escalation to a person
    const HO = STOP + 0.3;
    s.pulse(HO, 'log'); s.sfx(HO, 'send', { note: 'G5', gain: 1.2 });
    chip('HAND OFF', ['log.bottom', 'human.top'], HO, 0.7, T.accent);
    const HA = HO + 0.7;
    s.set(HA, 'human', 'color', T.ok, 0.2); s.set(HA, 'human', 'glow', 1, 0.15); s.set(HA + 0.4, 'human', 'glow', 0.4, 0.5);
    s.set(HA, 'humanLabel', 'color', T.ok, 0.3);
    s.ripple(HA, 'human', T.ok, { r0: 40, r1: 170, dur: 0.7 }); s.sfx(HA, 'chime', { note: 'C6' });

    // ----- close -----
    const END = HA + 2.4;
    s.fade(END, 1, 0.6);
    s.meta.duration = Math.max(s.meta.duration, END + 1.1);
  },
});

