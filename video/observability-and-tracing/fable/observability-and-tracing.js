// Observability and tracing — fable cut: trace context propagation across an agent's tool call.
// Lesson: a tool that calls a downstream service must carry the trace context (W3C traceparent header),
// otherwise the service records its spans under a new trace and a failed task cannot be followed end to end.
// Taught with motion + sound only. Words on screen are node names, span names, data chips and short ids.
FlowVideo.scene({
  meta: { title: 'Tracing', subtitle: 'CONTEXT PROPAGATION', duration: 29, fps: 30, speed: 1 },
  build(s) {
    const T = s.THEME;
    const LX = 240, RX = 770;
    // Left column: the request path. Right column: what each process records.
    s.node('user', 'phone', { x: LX, y: 665 });
    s.node('agent', 'box', { x: LX, y: 895, w: 300, h: 110, label: 'Agent', labelSize: 36 });
    s.node('tool', 'box', { x: LX, y: 1135, w: 300, h: 110, label: 'charge()', labelSize: 36, subSize: 26, subMono: true });
    s.node('api', 'db', { x: LX, y: 1420, w: 180, h: 160, label: 'Billing API' });
    s.node('agentTrace', 'store', { x: RX, y: 920, w: 560, rows: 2, textSize: 30, label: 'Agent trace' });
    s.node('apiTrace', 'store', { x: RX, y: 1410, w: 560, rows: 4, textSize: 30, label: 'Billing API spans' });
    s.node('q', 'badge', { x: 560, y: 1132, text: '?', color: T.bad, alpha: 0 });

    s.wire('ua', 'user.bottom', 'agent.top');
    s.wire('at', 'agent.bottom', 'tool.top');
    s.wire('ta', 'tool.bottom', 'api.top');
    s.wire('exA', 'agent.right', 'agentTrace.left');
    s.wire('exB', 'api.right', 'apiTrace.left');
    s.wire('link', [560, 1015], [560, 1250], { width: 7 });
    // Select only the matching service span, routing outside unrelated rows.
    s.wire('matchedLink', [560, 1015], [512, 1509], { via: [[560, 1200], [450, 1200], [450, 1509]], width: 7, color: T.info });
    s.set(0, 'wire:matchedLink', 'alpha', 0, 0);
    s.set(0, 'wire:exA', 'alpha', 0.45, 0); s.set(0, 'wire:exB', 'alpha', 0.45, 0);
    s.set(0, 'wire:link', 'alpha', 0, 0);
    for (let i = 0; i < 2; i++) s.set(0, 'agentTrace', 'row' + i + 'Alpha', 0, 0);
    for (let i = 0; i < 4; i++) s.set(0, 'apiTrace', 'row' + i + 'Alpha', 0, 0);
    s.set(0, 'agentTrace', 'subColor', T.info, 0);

    // The stage opens and closes behind a veil so the first and last frames match.
    s.set(0, 'stage', 'veil', 1, 0);
    s.fade(0.15, 0, 0.5);

    const PA = s.panOf('agent'), PR = s.panOf('agentTrace');
    s.sound('crash', { gain: 0.7 });
    s.sound('tag', { base: 'E6', gain: 0.5, echo: { delay: 0.08, feedback: 0.35, repeats: 2 }, layers: [
      { type: 'tone', wave: 'sine', attack: 0.002, decay: 0.12, harmonics: [1, 0.3] },
      { type: 'tone', wave: 'sine', ratio: 1.5, delay: 0.09, attack: 0.002, decay: 0.2, harmonics: [1, 0.3] } ] });

    const chip = (label, route, t, dur, color) => s.packet({ kind: 'chip', label, route, t, dur, color });
    const apiRow = (t, i, txt, stroke, textColor) => {
      s.set(t, 'apiTrace', 'row' + i + 'Text', txt, 0);
      s.set(t, 'apiTrace', 'row' + i + 'Color', stroke, 0);
      s.set(t, 'apiTrace', 'row' + i + 'TextColor', textColor, 0);
      s.set(t, 'apiTrace', 'row' + i + 'Alpha', 1, 0.2);
      s.set(t, 'apiTrace', 'row' + i + 'Fill', 0, 0); s.set(t, 'apiTrace', 'row' + i + 'Fill', 0.9, 0.5, 'out');
    };
    const agentRow = (t, i, txt, stroke) => {
      s.set(t, 'agentTrace', 'row' + i + 'Text', txt, 0);
      s.set(t, 'agentTrace', 'row' + i + 'Color', stroke, 0);
      s.set(t, 'agentTrace', 'row' + i + 'Alpha', 1, 0.2);
      s.set(t, 'agentTrace', 'row' + i + 'Fill', 0, 0);
    };
    const resetAgentTrace = (t) => {
      for (let i = 0; i < 2; i++) s.set(t, 'agentTrace', 'row' + i + 'Alpha', 0, 0.3);
      s.set(t + 0.3, 'agentTrace', 'sublabel', '', 0);
      s.sfx(t, 'poof', { gain: 0.25, pan: PR });
    };

    // One task through the agent, its tool, and the billing service.
    // Returns the time the reply reaches the user.
    const task = (t0, n, id, apiRowIndex, { fail, header }) => {
      s.pulse(t0, 'user'); s.sfx(t0, 'send', { note: 'E6', pan: PA });
      chip('task ' + n, ['user.bottom', 'agent.top'], t0, 0.5, T.fg);
      const a = t0 + 0.5;
      s.pulse(a, 'agent'); s.sfx(a, 'arrive', { note: 'C5', pan: PA });
      agentRow(a + 0.05, 0, 'invoke_agent · task ' + n, T.accent);
      s.set(a + 0.05, 'agentTrace', 'sublabel', 'trace ' + id, 0);
      s.sfx(a + 0.08, 'store', { note: 'C6', gain: 0.3, pan: PR });
      s.packet({ route: ['agent.bottom', 'tool.top'], t: a + 0.55, dur: 0.5 });
      const b = a + 1.05;
      s.pulse(b, 'tool'); s.sfx(b, 'arrive', { note: 'E5', pan: PA });
      agentRow(b + 0.05, 1, 'execute_tool · charge', T.accent);
      s.sfx(b + 0.08, 'store', { note: 'E6', gain: 0.3, pan: PR });
      chip(header ? 'traceparent ' + id : 'POST /charge', ['tool.bottom', 'api.top'], b + 0.5, 0.55, header ? T.info : T.fg);
      const c = b + 1.05;
      s.pulse(c, 'api'); s.sfx(c, 'arrive', { note: 'G5', pan: PA });
      s.set(c, 'api', 'busy', 1, 0.15); s.set(c, 'api', 'color', T.fg, 0.15);
      for (let k = c + 0.1; k < c + 0.65; k += 0.2) s.sfx(k, 'work', { pan: PA, gain: 0.25 });
      const d = c + 0.7;
      // Span bars grow while each span is open.
      s.set(a + 0.05, 'agentTrace', 'row0Fill', 0.9, d + 1.5 - a, 'linear');
      s.set(b + 0.05, 'agentTrace', 'row1Fill', 0.9, d + 0.6 - b, 'linear');
      s.set(d, 'api', 'busy', 0, 0.15);
      if (!fail) {
        s.set(d, 'api', 'color', T.mid, 0.3);
        apiRow(d, apiRowIndex, 'POST /charge 200 · 91c0', T.ok, T.mid);
        s.sfx(d, 'store', { note: 'G5', gain: 0.4, pan: PR });
        chip('200', ['api.top', 'user.bottom'], d + 0.15, 1.3, T.ok);
        s.set(d + 0.65, 'agentTrace', 'row1Color', T.ok, 0.25);
        s.set(d + 1.45, 'agentTrace', 'row0Color', T.ok, 0.25);
        s.pulse(d + 1.45, 'user', T.ok); s.sfx(d + 1.45, 'chime', { pan: PA });
        return d + 1.45;
      }
      // Failure: the service breaks, records its own span, and a 500 travels back up.
      s.set(d, 'api', 'color', T.bad, 0.05); s.shake(d, 'api', 14, 0.45);
      s.ripple(d, 'api', T.bad, { r0: 20, r1: 150, dur: 0.6, mark: 'x' }); s.sfx(d, 'crash', { pan: PA });
      apiRow(d + 0.1, apiRowIndex, 'POST /charge 500 · ' + (header ? id : '0d12'), T.bad, header ? T.info : T.mid);
      s.sfx(d + 0.12, 'store', { note: 'G4', gain: 0.4, pan: PR });
      s.set(d + 1.0, 'api', 'color', T.mid, 0.5);
      chip('500', ['api.top', 'user.bottom'], d + 0.2, 1.3, T.bad);
      const e1 = d + 0.2 + 0.45, e2 = d + 1.5;
      s.set(e1, 'agentTrace', 'row1Text', 'execute_tool · ERROR', 0); s.set(e1, 'agentTrace', 'row1Color', T.bad, 0.1);
      s.shake(e1, 'agentTrace', 8, 0.3); s.sfx(e1, 'thump', { pan: PR });
      s.set(e2, 'agentTrace', 'row0Color', T.bad, 0.2);
      s.pulse(e2, 'user', T.bad); s.sfx(e2, 'deliver', { note: 'C4', pan: PA });
      return e2;
    };

    // Beat 1 — normal: task 7 succeeds. Each process records its spans; the trace ids differ, but nobody looks.
    const r1 = task(0.8, 7, '4bf9', 0, { fail: false, header: false });
    // Other callers hit the billing service too, so its span list is never only ours.
    const o = r1 + 0.9;
    s.packet({ kind: 'dot', route: [[LX, 1680], 'api.bottom'], t: o, dur: 0.4, color: T.mid });
    s.pulse(o + 0.4, 'api'); s.sfx(o + 0.4, 'arrive', { note: 'G5', gain: 0.3, pan: PA });
    apiRow(o + 0.55, 1, 'POST /charge 200 · a7e3', T.mid, T.mid); s.sfx(o + 0.55, 'store', { note: 'G5', gain: 0.3, pan: PR });
    resetAgentTrace(r1 + 2.1);

    // Beat 2 — problem: task 8 fails. The agent trace ends at ERROR; the service's 500 sits under another id.
    const B2 = r1 + 2.8;
    const r2 = task(B2, 8, 'c3a1', 2, { fail: true, header: false });
    const L = r2 + 0.7;
    s.set(L, 'wire:link', 'color', T.bad, 0); s.set(L, 'wire:link', 'dashed', 1, 0); s.set(L, 'wire:link', 'alpha', 0.9, 0.3);
    // Scan the service's spans for our trace id: none matches.
    [0, 1, 2].forEach((i, k) => {
      const ts = L + 0.35 + k * 0.32;
      s.set(ts, 'apiTrace', 'row' + i + 'TextColor', T.fg, 0.05); s.set(ts + 0.22, 'apiTrace', 'row' + i + 'TextColor', T.mid, 0.2);
      s.sfx(ts, 'clock', { gain: 0.3, pan: PR });
    });
    const Q = L + 0.35 + 3 * 0.32 + 0.1;
    s.set(Q, 'q', 'alpha', 1, 0.1); s.set(Q, 'q', 'scale', 0.5, 0); s.set(Q, 'q', 'scale', 1, 0.35, 'back');
    s.ripple(Q, 'q', T.bad, { r0: 20, r1: 110, dur: 0.6 }); s.sfx(Q, 'miss', { pan: s.panOf('q') });

    // Beat 3 — fix: the tool now injects the traceparent header on its outgoing request.
    const F = Q + 2.3;
    resetAgentTrace(F);
    s.set(F, 'wire:link', 'alpha', 0, 0.3); s.set(F, 'q', 'alpha', 0, 0.3);
    const F2 = F + 0.7;
    s.set(F2, 'tool', 'sublabel', '+ traceparent', 0); s.set(F2, 'tool', 'subColor', T.info, 0);
    s.pulse(F2, 'tool', T.info, 0.6); s.ripple(F2, 'tool', T.info, { r0: 30, r1: 170, dur: 0.6 }); s.sfx(F2, 'tag', { pan: PA });

    // Beat 4 — resolution: task 9 fails the same way, but now the service's span carries our trace id.
    const B4 = F2 + 1.7;
    const r4 = task(B4, 9, '7e2d', 3, { fail: true, header: true });
    const K = r4 + 0.6;
    s.set(K, 'wire:link', 'alpha', 0, 0);
    s.set(K, 'wire:matchedLink', 'alpha', 1, 0.3); s.set(K, 'wire:matchedLink', 'flow', 1, 0);
    for (let i = 0; i < 3; i++) s.set(K, 'apiTrace', 'row' + i + 'Alpha', 0.3, 0.3);
    s.set(K, 'apiTrace', 'row3Highlight', 1, 0.3);
    s.sfx(K, 'hit', { pan: s.panOf('q') });
    s.set(K + 0.3, 'apiTrace', 'row3TextColor', T.fg, 0.05); s.set(K + 0.5, 'apiTrace', 'row3TextColor', T.info, 0.3);
    // The blue selection is outside the red error row; status remains ERROR.
    s.set(K + 0.3, 'apiTrace', 'row3Highlight', 1.6, 0.15);
    s.set(K + 0.45, 'apiTrace', 'row3Highlight', 1, 0.35);
    s.ripple(K + 0.3, 'q', T.info, { r0: 20, r1: 120, dur: 0.7 }); s.sfx(K + 0.3, 'chime', { pan: PR });
    s.set(K + 0.3, 'q', 'text', '✓', 0); s.set(K + 0.3, 'q', 'color', T.info, 0);
    s.set(K + 0.3, 'q', 'alpha', 1, 0.1); s.set(K + 0.3, 'q', 'scale', 0.5, 0); s.set(K + 0.3, 'q', 'scale', 1, 0.35, 'back');
    s.set(K + 0.3, 'agentTrace', 'subColor', T.fg, 0.05); s.set(K + 0.5, 'agentTrace', 'subColor', T.info, 0.3);

    // Hold on the linked failure, then close behind the veil.
    const END = K + 3.2;
    s.fade(END, 1, 0.6);
    s.meta.duration = END + 1.0;
  },
});

