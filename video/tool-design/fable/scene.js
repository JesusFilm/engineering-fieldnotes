// Tool design — bounded results. Independent alternative (fable variant).
// Lesson: a tool's response shape decides what lands in the agent's context. A raw read_logs
// tool is fine on a quiet service, floods the context exactly during the incident (the useful
// line is truncated away), and a redesigned search_logs(service, window, limit) moves the
// filtering into the tool and returns the few lines and IDs the agent needs.
// Taught with motion + sound: the context bar fills to a rising scale, overflows with a crash,
// and the bounded search ends on a single green chip. Words are node names, chips and counts.
FlowVideo.scene({
  meta: { title: 'Tool Design', subtitle: 'BOUNDED RESULTS', duration: 27, fps: 30, speed: 0.92 },
  build(s) {
    const T = s.THEME;
    // ---- stage ----
    s.node('agent', 'box', { x: 300, y: 690, w: 300, h: 136, label: 'Agent', sublabel: '', subSize: 30, subMono: true, subWeight: 700 });
    s.node('ctx', 'bar', { x: 790, y: 682, w: 400, h: 18, ticks: true, label: 'context' });
    s.node('trunc', 'badge', { x: 790, y: 606, text: '', color: T.bad, alpha: 0 });
    s.node('tool', 'box', { x: 540, y: 1080, w: 620, h: 150, label: 'read_logs', sublabel: 'service · window', mono: true, subMono: true, subSize: 30 });
    s.node('db', 'db', { x: 540, y: 1470, w: 200, h: 190, label: 'Logs' });
    s.wire('at', 'agent.bottom', 'tool.top');
    s.wire('td', 'tool.bottom', 'db.top');
    const PAN = { agent: s.panOf('agent'), ctx: s.panOf('ctx'), tool: 0, db: 0 };

    // ---- sounds ----
    // Context overflow: a crash voiced lower and shorter than a server crash; the loudest moment.
    s.sound('overflow', { base: 'E5', gain: 0.95,
      layers: [{ type: 'noise', lp: 7000, lpTo: 300, attack: 0.002, decay: 0.4, gain: 0.5 },
               { type: 'tone', wave: 'sine', ratio: 1, glideTo: 0.1, glide: 0.55, attack: 0.004, decay: 0.6, gain: 0.5, harmonics: [1, 0.3, 0.1] },
               { type: 'tone', wave: 'sine', freq: 64, glideTo: 30, glide: 0.5, attack: 0.003, decay: 0.55, gain: 0.9 }] });
    // A log line landing in the context: short click-lock, pitched per step so the fill is a rising scale.
    s.sound('line', { base: 'C5', gain: 0.32, layers: [{ type: 'noise', lp: 5000, hp: 1500, attack: 0.001, decay: 0.02, gain: 0.4 }, { type: 'tone', wave: 'sine', delay: 0.01, attack: 0.002, decay: 0.16, harmonics: [1, 0.3] }] });
    const SCALE = ['C5', 'D5', 'E5', 'F5', 'G5', 'A5', 'B5', 'C6', 'D6', 'E6', 'F6', 'G6'];

    // ---- helpers ----
    const chip = (label, route, t, dur, color) => s.packet({ kind: 'chip', label, route, t, dur, color });
    const ask = (t, label) => {            // agent → tool
      s.pulse(t, 'agent'); s.sfx(t, 'send', { note: 'E6', pan: PAN.agent });
      chip(label, ['agent.bottom', 'tool.top'], t, 0.6, T.fg);
      s.pulse(t + 0.6, 'tool'); s.sfx(t + 0.6, 'arrive', { note: 'C5', gain: 0.6 });
      return t + 0.6;
    };
    const query = (t, label, busy, color) => { // tool → db, db works, result count comes back
      chip(label, ['tool.bottom', 'db.top'], t, 0.5, color || T.fg);
      const b0 = t + 0.5;
      s.set(b0, 'db', 'busy', 1, 0.15); s.set(b0, 'db', 'color', T.fg, 0.15);
      s.sfx(b0, 'arrive', { note: 'G4', gain: 0.5 });
      for (let k = b0 + 0.2; k < b0 + busy; k += 0.2) s.sfx(k, 'work');
      s.set(b0 + busy, 'db', 'busy', 0, 0.15); s.set(b0 + busy, 'db', 'color', T.mid, 0.3);
      return b0 + busy;
    };
    const count = (t, label, color) => {    // db → tool: how much came back
      chip(label, ['db.top', 'tool.bottom'], t, 0.5, color);
      s.pulse(t + 0.5, 'tool'); s.sfx(t + 0.5, 'arrive', { note: 'C5', gain: 0.45 });
      return t + 0.5;
    };
    const answer = (t, txt, color, snd) => {
      s.set(t, 'agent', 'sublabel', txt, 0); s.set(t, 'agent', 'subColor', color, 0);
      s.pulse(t, 'agent', color); s.sfx(t, snd.name, Object.assign({ pan: PAN.agent }, snd));
    };
    const clearAnswer = (t) => s.set(t, 'agent', 'sublabel', '', 0);
    let fill = 0, step = 0;
    const land = (t, amount, color) => {     // one line reaches the agent and takes context
      fill = Math.min(1, fill + amount);
      s.set(t, 'ctx', 'seg0', fill, 0.14, 'out');
      if (color) s.set(t, 'ctx', 'seg0Color', color, 0.2);
      s.ripple(t, 'agent.bottom', T.fg, { r0: 8, r1: 30, dur: 0.3 });
      s.ripple(t + 0.05, [790 - 200 + fill * 400, 682], color || T.mid, { r0: 6, r1: 26, dur: 0.3 }); // the fill front answers each landing
      s.sfx(t, 'line', { note: SCALE[Math.min(SCALE.length - 1, step++)], pan: PAN.ctx });
    };
    const resetContext = (t, gain = 0.35) => { fill = 0; step = 0; s.set(t, 'ctx', 'seg0', 0, 0.4); s.set(t, 'ctx', 'seg0Color', T.mid, 0.4); s.set(t, 'ctx', 'color', T.dim, 0.4); s.sfx(t, 'poof', { pan: PAN.ctx, gain }); };

    // ---- open: fade in from black so the first and last frames match ----
    s.fade(0, 1, 0); s.fade(0.1, 0, 0.6);

    // ---- beat 1 (normal): quiet service, read_logs returns a dozen lines, context barely moves ----
    const a1 = ask(1.0, 'web · 1h');
    const d1 = query(a1 + 0.15, 'read', 0.6);
    const c1 = count(d1 + 0.05, '12 lines', T.mid);
    for (let i = 0; i < 3; i++) {
      const t0 = c1 + 0.15 + i * 0.2;
      s.packet({ kind: 'dot', route: ['tool.top', 'agent.bottom'], t: t0, dur: 0.45, color: T.mid, fade: 0.06 });
      land(t0 + 0.45, 0.05);
    }
    answer(c1 + 1.5, '12 lines read', T.fg, { name: 'deliver', note: 'E5' });

    // ---- beat 2 (problem): the incident itself produces the flood; context overflows; INC-42 is cut off ----
    const B2 = 7.4;
    clearAnswer(B2 - 0.3); resetContext(B2 - 0.3);
    const a2 = ask(B2, 'payments · 1h');
    const d2 = query(a2 + 0.15, 'read', 1.3);
    const c2 = count(d2 + 0.05, '3,214 lines', T.accent);
    const N = 16, GAP = 0.14, PER = 0.09;
    let overflowAt = null;
    for (let i = 0; i < N; i++) {
      const t0 = c2 + 0.1 + i * GAP, tArrive = t0 + 0.45;
      const last = i === N - 1;
      if (last) chip('INC-42', ['tool.top', 'agent.bottom'], t0, 0.5, T.ok);
      else s.packet({ kind: 'dot', route: ['tool.top', 'agent.bottom'], t: t0, dur: 0.45, color: overflowAt ? T.bad : T.mid, fade: 0.06 });
      if (!overflowAt) {
        const before = fill;
        land(tArrive, PER, before + PER >= 0.6 ? T.accent : undefined);
        if (fill >= 1 - 1e-6 || before + PER >= 1 - 1e-6) overflowAt = tArrive;
      } else {
        // the context is full: later lines are dropped at the agent
        const ta = last ? t0 + 0.5 : tArrive;
        s.ripple(ta, 'agent.bottom', T.bad, { mark: 'x', r0: 10, r1: last ? 70 : 40, dur: last ? 0.7 : 0.4 });
        if (last) { s.shake(ta, 'agent', 8, 0.35); s.sfx(ta, 'poof', { pan: PAN.agent, gain: 0.9 }); }
        else s.sfx(ta, 'thump', { pan: PAN.agent, gain: 0.3 });
      }
    }
    // overflow moment: bar snaps red, badge pops, the agent jolts
    const OV = overflowAt;
    s.set(OV, 'ctx', 'seg0Color', T.bad, 0.1); s.set(OV, 'ctx', 'color', T.bad, 0.1);
    s.shake(OV, 'ctx', 12, 0.5); s.shake(OV, 'agent', 10, 0.45);
    s.ripple(OV, 'ctx', T.bad, { r0: 30, r1: 130, dur: 0.6 });
    s.sfx(OV, 'overflow', { pan: PAN.ctx });
    s.set(OV + 0.1, 'trunc', 'text', 'TRUNCATED', 0); s.set(OV + 0.1, 'trunc', 'alpha', 1, 0.1);
    s.set(OV + 0.1, 'trunc', 'scale', 0.5, 0); s.set(OV + 0.1, 'trunc', 'scale', 1, 0.4, 'back');
    const lastDrop = c2 + 0.1 + (N - 1) * GAP + 0.5;
    answer(lastDrop + 0.7, '?', T.accent, { name: 'deliver', note: 'C4', gain: 1.1 });

    // ---- beat 3 (resolution): redesign the tool in place; bounded search; filtering happens in the tool ----
    const B3 = lastDrop + 3.4;
    s.pulse(B3, 'tool', T.accent, 0.8); s.sfx(B3, 'recover');
    s.set(B3 + 0.25, 'tool', 'label', 'search_logs', 0);
    s.set(B3 + 0.25, 'tool', 'sublabel', 'service · window · limit', 0);
    s.set(B3 + 0.25, 'tool', 'subColor', T.accent, 0); s.set(B3 + 1.2, 'tool', 'subColor', T.mid, 0.6);
    s.ripple(B3 + 0.25, [540, 960], T.accent, { r0: 8, r1: 35, dur: 0.7 });
    const R = B3 + 0.9;
    clearAnswer(R); resetContext(R, 0.5);
    s.set(R, 'trunc', 'alpha', 0, 0.3); s.set(R, 'trunc', 'scale', 0.6, 0.3);
    const a3 = ask(R + 0.9, 'payments · 1h · 20');
    const d3 = query(a3 + 0.15, 'filter', 1.6, T.accent);
    const c3 = count(d3 + 0.05, '3 lines', T.ok);
    chip('INC-42', ['tool.top', 'agent.bottom'], c3 + 0.15, 0.5, T.ok);
    const landed = c3 + 0.65;
    land(landed, 0.08, T.ok);
    s.ripple(landed, 'agent.bottom', T.ok, { mark: 'check', r0: 14, r1: 70, dur: 0.6 });
    s.sfx(landed + 0.05, 'hit', { pan: PAN.agent });
    answer(landed + 0.7, 'INC-42', T.ok, { name: 'chime' });

    // ---- close: hold the resolved state, then fade so the loop restarts cleanly ----
    const END = landed + 0.7 + 3.0;
    s.fade(END, 1, 0.6);
    s.meta.duration = END + 1.1;
  },
});

