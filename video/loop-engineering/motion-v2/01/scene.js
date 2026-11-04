/* Act, observe, decide — loop-engineering motion-v2 cut 01.
 * One mechanism: an agent's proposed call runs only when the controller's next-call slot is open;
 * the tool's actual output goes to the controller, the controller checks its rules and explicitly
 * decides "continue", and only then can the agent's next call pass through. Each dispatch closes the slot.
 * Example: one step of an illustrative discount repair (12 selected tests, one failing assertion, one patch).
 * Render from the repository root (pinned puppeteer-core from root node_modules):
 *   node video/loop-engineering/motion-v2/01/engine/render.mjs video/loop-engineering/motion-v2/01/scene.js video/loop-engineering/motion-v2/01/video.mp4 --sheet video/loop-engineering/motion-v2/01/scratch/contact-sheet.png
 * Uses the local engine copy, which adds the general node types phases, panel, callslot and pill.
 */
FlowVideo.scene({
  meta: { title: 'Agent loop', subtitle: '', duration: 34, fps: 30, speed: 0.9 },
  build(s) {
    const T = s.THEME;
    const LANE = 330;

    // ---- stage ----
    s.node('phase', 'phases', { y: 420, words: ['ACT', 'OBSERVE', 'DECIDE'], xs: [270, 540, 810], size: 44 });
    s.node('agent', 'panel', { x: 540, y: 620, w: 900, h: 230, title: 'Agent', color: T.mid,
      rows: [{ y: 108, mono: true, size: 40 }, { y: 178, mono: true, size: 44 }],
      r0Text: 'task: fix discount', r0Color: T.mid, r1Text: '', r1Color: T.accent, r1Alpha: 0 });
    s.node('ctl', 'panel', { x: 540, y: 1060, w: 900, h: 440, title: 'Controller', titleAlign: 'center', noFill: true, color: T.mid,
      rows: [{ y: 125, x: 525, size: 40, w: 460, iconX: 930 }, { y: 210, x: 525, size: 40, w: 460, iconX: 930 }],
      r0Text: 'evidence in', r0Color: '#5A5F68', r1Text: 'tests pass', r1Color: '#5A5F68' });
    s.node('slot', 'callslot', { x: LANE, y: 1060, w: 300, h: 120, open: 1, text: 'open', textColor: T.accent });
    s.node('cont', 'pill', { x: 625, y: 1180, w: 220, text: 'continue' });
    s.node('stop', 'pill', { x: 860, y: 1180, w: 170, text: 'stop' });
    s.node('tool', 'panel', { x: 540, y: 1530, w: 900, h: 400, title: 'Tools', color: T.mid, hasLamp: true, barY: 345,
      rows: [{ y: 95, mono: true }, { y: 165, mono: true, iconX: 920 }, { y: 235, mono: true }],
      r0Text: '', r1Text: '', r2Text: '' });

    s.wire('call1', [LANE, 742], [LANE, 996]);
    s.wire('call2', [LANE, 1124], [LANE, 1324]);
    s.wire('obs', [996, 1495], [994, 965], { via: [[1036, 1495], [1036, 965]] });
    s.wire('auth', [512, 1180], [440, 1124], { via: [[440, 1180]] });
    s.wire('back', [760, 836], [760, 742]);

    s.sound('latch', { base: 'C4', gain: 0.5, layers: [
      { type: 'noise', lp: 4000, hp: 800, attack: 0.001, decay: 0.018, gain: 0.6 },
      { type: 'tone', wave: 'sine', ratio: 1, attack: 0.002, decay: 0.09, gain: 0.6, harmonics: [1, 0.3] }] });
    s.sound('unlatch', { base: 'G5', gain: 0.32, echo: { delay: 0.08, feedback: 0.3, repeats: 1 }, layers: [
      { type: 'noise', lp: 6000, hp: 1500, attack: 0.001, decay: 0.015, gain: 0.4 },
      { type: 'tone', wave: 'sine', ratio: 1, attack: 0.003, decay: 0.18, harmonics: [1, 0.25] },
      { type: 'tone', wave: 'sine', ratio: 1.5, delay: 0.09, attack: 0.003, decay: 0.26, harmonics: [1, 0.2] }] });

    const pan = (a) => s.panOf(a);
    const lit = (t, w, on, c) => { s.set(t, 'wire:' + w, 'color', on ? (c || T.fg) : T.wire, 0.2); s.set(t, 'wire:' + w, 'flow', on ? 1 : 0, 0); };
    const phase = (t, i) => { for (let k = 0; k < 3; k++) s.set(t, 'phase', 'w' + k, k === i ? 1 : 0, 0.35); };
    const ripple = (t, at, c, o) => s.ripple(t, at, c, Object.assign({ r0: 14, r1: 70 }, o || {}));

    // The agent proposes a call; it travels to the slot, the slot admits it, the slot closes behind it.
    function propose(t, call, slotText) {
      s.set(t, 'agent', 'r1Text', call, 0); s.set(t, 'agent', 'r1Alpha', 1, 0.3); s.set(t, 'agent', 'r1Hl', 1, 0.3);
      s.set(t, 'agent', 'color', T.fg, 0.2); s.set(t, 'agent', 'glow', 0.5, 0.2); s.set(t + 0.5, 'agent', 'glow', 0, 0.5);
      s.sfx(t, 'arrive', { note: 'C5', gain: 0.8, pan: pan('agent') });
      const tSend = t + 1.4;
      lit(tSend, 'call1', true, T.accent);
      s.packet({ route: [[LANE, 745], [LANE, 1000]], t: tSend, dur: 0.9, kind: 'dot', r: 14, color: T.accent });
      s.sfx(tSend, 'send', { note: 'C6', gain: 1.1, pan: pan([LANE, 0]) });
      s.set(tSend + 0.3, 'agent', 'color', T.mid, 0.4);
      const tHold = tSend + 0.9;
      lit(tHold, 'call1', false);
      s.set(tHold, 'agent', 'r1Hl', 0, 0.4); s.set(tHold, 'agent', 'r1Color', T.mid, 0.4);
      s.set(tHold, 'slot', 'text', slotText, 0); s.set(tHold, 'slot', 'textColor', T.fg, 0.15); s.set(tHold, 'slot', 'glow', 1, 0.15);
      s.sfx(tHold, 'arrive', { note: 'G5', gain: 0.6, pan: pan('slot') });
      const tOk = tHold + 1.0;  // admission check against the open slot
      s.set(tOk, 'slot', 'glow', 1.6, 0.12); s.set(tOk + 0.12, 'slot', 'glow', 0.2, 0.35);
      s.sfx(tOk, 'ack', { note: 'G5', gain: 1.6, pan: pan('slot') });
      const tGo = tOk + 0.5;  // dispatch: the call leaves, the slot closes
      lit(tGo, 'call2', true, T.accent);
      s.packet({ route: [[LANE, 1124], [LANE, 1324]], t: tGo, dur: 0.8, kind: 'dot', r: 14, color: T.accent });
      s.sfx(tGo, 'send', { note: 'G6', gain: 1.1, pan: pan('slot') });
      s.set(tGo, 'slot', 'open', 0, 0.25); s.set(tGo, 'slot', 'glow', 0, 0.2);
      s.set(tGo + 0.25, 'slot', 'text', 'waiting', 0); s.set(tGo + 0.25, 'slot', 'textColor', T.mid, 0);
      s.shake(tGo + 0.25, 'slot', 6, 0.25, 'y');
      s.sfx(tGo + 0.25, 'latch', { pan: pan('slot') });
      s.set(tGo + 0.8, 'wire:call2', 'color', T.wire, 0.2); s.set(tGo + 0.8, 'wire:call2', 'flow', 0, 0);
      return tGo + 0.8;     // tool receives the call
    }
    function toolRun(t, cmd, dur) {
      s.set(t, 'tool', 'color', T.fg, 0.2); s.set(t, 'tool', 'glow', 0.6, 0.2); s.set(t + 0.5, 'tool', 'glow', 0, 0.6);
      s.set(t, 'tool', 'lamp', T.accent, 0.15);
      s.set(t, 'tool', 'r0Text', cmd, 0); s.set(t, 'tool', 'r0Color', T.fg, 0);
      s.set(t, 'tool', 'barColor', T.accent, 0); s.set(t, 'tool', 'bar', 0, 0); s.set(t + 0.05, 'tool', 'bar', 1, dur, 'linear');
      s.sfx(t, 'arrive', { note: 'E5', gain: 0.9, pan: pan('tool') });
      for (let k = t + 0.35; k < t + dur - 0.1; k += 0.3) s.sfx(k, 'work', { note: 'E4', gain: 0.9, pan: pan('tool') });
      return t + dur + 0.05;
    }

    // ---- beat 1: ACT — the agent proposes, the open slot admits the call, the tool runs it ----
    phase(1.0, 0);
    let t = propose(1.2, 'run 12 tests', 'run tests');      // tool receives at 5.8
    let done = toolRun(t, '$ pytest -k discount', 2.3);    // done at 8.15

    // ---- beat 2: OBSERVE — actual output, then it reaches the controller ----
    t = done;
    phase(t + 0.1, 1);
    s.set(t, 'tool', 'lamp', T.mid, 0.3); s.set(t, 'tool', 'bar', 0, 0.4);
    s.set(t + 0.2, 'tool', 'r1Text', '12 ran · 1 failed', 0); s.set(t + 0.2, 'tool', 'r1Color', T.bad, 0);
    s.set(t + 0.2, 'tool', 'r1Icon', 'x', 0); s.set(t + 0.2, 'tool', 'r1IconK', 1, 0.4, 'linear');
    s.sfx(t + 0.2, 'thump', { gain: 0.75, pan: pan('tool') });
    s.set(t + 1.1, 'tool', 'r2Text', 'expected 90, got 100', 0); s.set(t + 1.1, 'tool', 'r2Color', T.fg, 0);
    s.set(t + 1.1, 'tool', 'r2Hl', 1, 0.25); s.set(t + 1.1, 'tool', 'r2Color', T.fg, 0);
    s.sfx(t + 1.1, 'ack', { note: 'E6', gain: 1.4, pan: pan('tool') });
    s.set(t + 2.0, 'tool', 'r2Hl', 0, 0.5);
    t += 3.0;                                              // 11.15: evidence leaves the tool
    s.set(t, 'tool', 'r1Hl', 1, 0.2); s.set(t, 'tool', 'color', T.mid, 0.4);
    lit(t, 'obs', true, T.bad);
    s.packet({ route: [[996, 1495], [1036, 1495], [1036, 965], [994, 965]], t, dur: 1.3, kind: 'dot', r: 14, color: T.bad });
    s.sfx(t, 'send', { note: 'E6', gain: 1.1, pan: 0.6 });
    t += 1.3;                                              // 12.45: evidence lands at the controller
    lit(t, 'obs', false);
    s.set(t, 'tool', 'r1Hl', 0, 0.4);
    s.set(t, 'ctl', 'color', T.fg, 0.2); s.set(t, 'ctl', 'glow', 0.4, 0.2); s.set(t + 0.5, 'ctl', 'glow', 0, 0.6);
    s.set(t, 'ctl', 'r0Color', T.fg, 0.2); s.set(t, 'ctl', 'r0Hl', 1, 0.2);
    s.set(t, 'ctl', 'r0Icon', 'check', 0); s.set(t + 0.1, 'ctl', 'r0IconK', 1, 0.4, 'linear');
    ripple(t, [994, 965], T.fg);
    s.sfx(t, 'arrive', { note: 'G5', gain: 0.9, pan: pan([930, 0]) });
    s.set(t + 1.0, 'ctl', 'r0Hl', 0, 0.5);

    // ---- beat 3: DECIDE — the controller checks its rules and chooses continue; the slot reopens ----
    t = 14.3;
    phase(t, 2);
    s.set(t, 'ctl', 'r1Color', T.fg, 0.2); s.set(t, 'ctl', 'r1Hl', 1, 0.2);
    s.set(t + 0.5, 'ctl', 'r1Icon', 'x', 0); s.set(t + 0.5, 'ctl', 'r1IconK', 1, 0.4, 'linear');
    s.sfx(t + 0.5, 'thump', { note: 'G3', gain: 0.5, pan: pan([930, 0]) });
    s.set(t + 1.4, 'ctl', 'r1Hl', 0, 0.5);
    t = 16.2;                                              // decision
    s.set(t, 'cont', 'lit', 1, 0.3); s.set(t, 'cont', 'scale', 1.08, 0.12); s.set(t + 0.12, 'cont', 'scale', 1, 0.25);
    ripple(t, 'cont', T.accent, { r0: 50, r1: 96, dur: 0.5 });
    s.sfx(t, 'unlatch', { note: 'G5', gain: 1.2, pan: pan('cont') });
    t = 17.0;                                              // permission reaches the slot
    lit(t, 'auth', true, T.accent);
    s.packet({ route: [[512, 1180], [440, 1180], [440, 1124]], t, dur: 0.55, kind: 'dot', r: 11, color: T.accent });
    t = 17.55;
    lit(t, 'auth', false);
    s.set(t, 'slot', 'open', 1, 0.3); s.set(t, 'slot', 'text', 'open', 0); s.set(t, 'slot', 'textColor', T.accent, 0);
    s.set(t, 'slot', 'glow', 0.8, 0.15); s.set(t + 0.3, 'slot', 'glow', 0, 0.5);
    s.sfx(t, 'ack', { note: 'G5', gain: 1.6, pan: pan('slot') });
    t = 19.3;                                              // the observation goes back to the agent
    lit(t, 'back', true, T.accent);
    s.packet({ route: [[760, 836], [760, 745]], t, dur: 0.7, kind: 'dot', r: 14, color: T.bad });
    s.sfx(t, 'send', { note: 'G6', gain: 1.1, pan: pan([760, 0]) });
    t = 20.0;
    lit(t, 'back', false);
    s.set(t, 'agent', 'r0Text', 'expected 90, got 100', 0); s.set(t, 'agent', 'r0Color', T.bad, 0);
    s.set(t, 'agent', 'r1Alpha', 0, 0.3);
    s.set(t, 'agent', 'color', T.fg, 0.2); s.set(t, 'agent', 'glow', 0.5, 0.2); s.set(t + 0.4, 'agent', 'glow', 0, 0.5); s.set(t + 0.6, 'agent', 'color', T.mid, 0.5);
    ripple(t, [760, 742], T.bad);
    s.sfx(t, 'deliver', { note: 'C5', gain: 1.0, pan: pan([760, 0]) });

    // ---- beat 4: ACT again — the next call passes only because the slot is open ----
    phase(21.6, 0);
    t = propose(21.6, 'patch discount.py', 'patch');      // tool receives at 26.2
    const tGo2 = 21.6 + 1.4 + 0.9 + 1.0 + 0.5;            // 25.4: decision and old output are consumed
    s.set(tGo2, 'cont', 'lit', 0, 0.5);
    for (const r of ['r0', 'r1']) { s.set(tGo2, 'ctl', r + 'Color', '#5A5F68', 0.5); s.set(tGo2, 'ctl', r + 'IconK', 0, 0.3); }
    s.set(tGo2 + 0.35, 'ctl', 'r0Icon', '', 0); s.set(tGo2 + 0.35, 'ctl', 'r1Icon', '', 0);
    s.set(tGo2, 'ctl', 'color', T.mid, 0.4);
    // old test output is stale for the edited code: it clears as the patch runs
    for (const r of ['r1', 'r2']) s.set(t, 'tool', r + 'Alpha', 0, 0.5);
    s.set(t, 'tool', 'r1IconK', 0, 0.3);
    s.sfx(t + 0.15, 'poof', { gain: 0.55, pan: pan('tool') });
    done = toolRun(t + 0.6, '$ apply patch', 1.4);         // done at 28.25
    t = done;
    phase(t + 0.1, 1);
    s.set(t, 'tool', 'lamp', T.mid, 0.3); s.set(t, 'tool', 'bar', 0, 0.4);
    s.set(t, 'tool', 'r1Text', 'patch applied', 0); s.set(t, 'tool', 'r1Color', T.fg, 0); s.set(t, 'tool', 'r1Icon', '', 0);
    s.set(t, 'tool', 'r1Alpha', 1, 0.3);
    s.sfx(t, 'store', { note: 'E5', gain: 1.1, pan: pan('tool') });
    s.set(t + 0.9, 'tool', 'r2Text', 'tests not rerun', 0); s.set(t + 0.9, 'tool', 'r2Color', T.mid, 0);
    s.set(t + 0.9, 'tool', 'r2Hl', 0, 0); s.set(t + 0.9, 'tool', 'r2Alpha', 1, 0.3);
    s.sfx(t + 0.9, 'clock', { gain: 1.4, pan: pan('tool') });
    s.set(t + 0.6, 'tool', 'color', T.mid, 0.5);

    // ---- hold the new state: slot waiting, controller waiting for fresh evidence; then end ----
    const tEnd = t + 5.2;                                  // ~33.4
    s.fade(tEnd, 1, 1.0);
    for (let k = 0; k < 3; k++) s.set(tEnd, 'phase', 'w' + k, 0, 0.8);
    s.meta.duration = tEnd + 1.6;
  },
});

