// Guardrails and permissions — fable variant (authored by anthropic/claude-fable-5-1, reasoning: high).
// Lesson: a tool result can carry instructions that steer the model past its prompt rules, so the
// permission check has to live in the tool runtime and fail closed on the caller's granted scope.
// Beats: (1) normal read under a read-only grant, (2) a poisoned ticket steers the agent,
// (3) the agent's write is denied at the runtime and never reaches the database,
// (4) a retry is denied again and the teammate sees DENIED; fade to black so the loop closes.
// Illustrative scenario: the dimming "rules: read only" shows a prompt rule being overridden in one
// run. It is not a claim that models always follow injected text, nor that any prompt enforces anything.
FlowVideo.scene({
  meta: { title: 'Permissions', subtitle: 'UNTRUSTED TOOL RESULTS', duration: 20, fps: 30, speed: 0.85 },
  build(s) {
    const T = s.THEME;

    // ---- stage -------------------------------------------------------------------------------
    s.node('user', 'laptop', { x: 540, y: 590 });
    s.node('userL', 'label', { x: 772, y: 596, text: 'Teammate', size: 28 });
    s.node('agent', 'box', { x: 540, y: 870, w: 400, h: 136, label: 'Agent', sublabel: 'rules: read only', subSize: 32, subColor: T.fg });
    s.node('rt', 'box', { x: 540, y: 1170, w: 440, h: 136, ports: 2, portSpan: 220, label: 'Tool runtime', sublabel: 'grant: tickets:read', subSize: 32, subColor: T.fg });
    s.node('check', 'badge', { x: 880, y: 1170, alpha: 0 });
    s.node('tickets', 'store', { x: 290, y: 1500, w: 380, rows: 2, label: 'Tickets' });
    s.node('users', 'db', { x: 810, y: 1500, w: 190, h: 170, label: 'Users DB' });

    s.wire('ua', 'user.bottom', 'agent.top');
    s.wire('ar', 'agent.bottom', 'rt.top');
    s.wire('rtk', 'rt.port0', 'tickets.top');
    s.wire('rus', 'rt.port1', 'users.top');

    const P = { tickets: s.panOf('tickets'), users: s.panOf('users'), check: s.panOf('check') };
    const row1 = [290, 1521];

    // Row text must not start with '#': the engine tweens '#...' strings as hex colours.
    s.set(0, 'tickets', 'row0Text', 'T88  login bug', 0); s.set(0, 'tickets', 'row0Color', T.mid, 0);
    s.set(0, 'tickets', 'row1Text', 'T89  export', 0); s.set(0, 'tickets', 'row1Color', T.mid, 0);

    // Open from black so the first and last frames are the same (title band only).
    s.set(0, 'stage', 'veil', 1, 0);
    s.fade(0.05, 0, 0.5);

    // ---- sounds ------------------------------------------------------------------------------
    // Poisoned content steering the model: two detuned sines beating as they fall, under a hiss.
    s.sound('inject', { base: 'E5', gain: 0.6,
      layers: [
        { type: 'tone', wave: 'sine', ratio: 1, glideTo: 0.5, glide: 0.5, attack: 0.01, decay: 0.55, gain: 0.5, harmonics: [1, 0.5, 0.25] },
        { type: 'tone', wave: 'sine', ratio: 1.06, glideTo: 0.53, glide: 0.5, attack: 0.01, decay: 0.55, gain: 0.4, harmonics: [1, 0.4] },
        { type: 'noise', lp: 4000, lpTo: 700, attack: 0.02, decay: 0.4, gain: 0.3 }] });
    // Fail-closed denial: the stock thump with a short noise slap on top so it is the loudest moment.
    s.sound('deny', { base: 'E4', gain: 0.95,
      layers: [
        { type: 'tone', wave: 'sine', ratio: 1, glideTo: 0.6, glide: 0.25, attack: 0.003, decay: 0.32, gain: 0.6, harmonics: [1, 0.25] },
        { type: 'tone', wave: 'sine', freq: 60, glideTo: 36, glide: 0.25, attack: 0.002, decay: 0.32, gain: 0.85 },
        { type: 'noise', lp: 3500, lpTo: 300, attack: 0.002, decay: 0.22, gain: 0.4 }] });

    // ---- helpers -----------------------------------------------------------------------------
    const chip = (label, route, t, dur, color) => s.packet({ kind: 'chip', label, route, t, dur, color });
    const showCheck = (t, txt, color) => {
      s.set(t, 'check', 'text', txt, 0); s.set(t, 'check', 'color', color, 0);
      s.set(t, 'check', 'alpha', 1, 0.12); s.set(t, 'check', 'scale', 0.6, 0); s.set(t, 'check', 'scale', 1, 0.35, 'back');
    };
    const hideCheck = (t) => s.set(t, 'check', 'alpha', 0, 0.3);

    // Teammate asks the agent for something. Returns when it lands.
    const ask = (t, label) => {
      s.pulse(t, 'user'); s.sfx(t, 'send', { note: 'E6' });
      chip(label, ['user.bottom', 'agent.top'], t, 0.6, T.fg);
      s.pulse(t + 0.6, 'agent'); s.sfx(t + 0.6, 'arrive', { note: 'C5', gain: 0.6 });
      return t + 0.6;
    };
    // Agent issues a tool call to the runtime. Returns when it lands.
    const call = (t, label, color) => {
      s.pulse(t, 'agent', color === T.accent ? T.accent : undefined); s.sfx(t, 'send', { note: 'C6', gain: 0.9 });
      chip(label, ['agent.bottom', 'rt.top'], t, 0.55, color);
      s.pulse(t + 0.55, 'rt'); s.sfx(t + 0.55, 'arrive', { note: 'E5', gain: 0.55 });
      return t + 0.55;
    };
    // Runtime compares the call with the caller's grant. The ripple sits on the port the call
    // wants to use, so the viewer sees which path opens (tickets) or stays shut (users).
    const allow = (t) => {
      s.ripple(t, 'rt.port0', T.ok, { mark: 'check', r0: 16, r1: 32, dur: 0.55 }); showCheck(t, 'ALLOW', T.ok);
      s.pulse(t, 'rt', T.ok); s.sfx(t, 'hit', { note: 'E6', gain: 0.8, pan: P.check });
    };
    const deny = (t, gain) => {
      s.ripple(t, 'rt.port1', T.bad, { mark: 'x', r0: 16, r1: 32, dur: 0.7 }); showCheck(t, 'DENY', T.bad);
      s.pulse(t, 'rt', T.bad); s.shake(t, 'rt', 10, 0.4); s.sfx(t, 'deny', { gain, pan: P.check });
    };
    // Runtime reads a ticket row and returns a result chip to the agent. Returns when it reaches the agent.
    const readTicket = (t, row, reqLabel, resLabel, color, rowText) => {
      chip(reqLabel, ['rt.port0', 'tickets.top'], t, 0.5, T.fg);
      const a = t + 0.5;
      s.pulse(a, 'tickets'); s.sfx(a, 'arrive', { note: 'G5', gain: 0.5, pan: P.tickets });
      if (rowText) s.set(a, 'tickets', 'row' + row + 'Text', rowText, 0);
      s.set(a, 'tickets', 'row' + row + 'Color', color, 0.1);
      s.ripple(a + 0.05, row ? row1 : [290, 1479], color, { r0: 24, r1: 130, dur: 0.55 }); s.sfx(a + 0.05, 'store', { pan: P.tickets, note: row ? 'C5' : 'G5' });
      chip(resLabel, ['tickets.top', 'rt.port0'], a + 0.3, 0.5, color);
      s.pulse(a + 0.8, 'rt'); s.sfx(a + 0.8, 'arrive', { note: 'E5', gain: 0.4 });
      chip(resLabel, ['rt.top', 'agent.bottom'], a + 0.9, 0.5, color);
      return a + 1.4;
    };
    const reply = (t, label, color, note) => {
      s.pulse(t, 'agent'); s.sfx(t, 'send', { note: 'C6', gain: 0.8 });
      if (label) chip(label, [[540, 760], 'user.bottom'], t, 0.5, color); // start clear of the Agent box edge
      else s.packet({ route: ['agent.top', 'user.bottom'], t, dur: 0.55, color });
      s.pulse(t + 0.55, 'user'); s.sfx(t + 0.55, 'deliver', { note });
      return t + 0.55;
    };

    // ---- beat 1: normal read under a read-only grant --------------------------------------------
    let t = ask(0.7, 'read T88');
    t = call(t + 0.3, 'tickets.read T88', T.fg);
    allow(t + 0.25);
    t = readTicket(t + 0.6, 0, 'T88', '{T88}', T.ok);
    s.pulse(t, 'agent'); s.sfx(t, 'arrive', { note: 'C5', gain: 0.5 });
    t = reply(t + 0.3, '', T.ok, 'C6');
    hideCheck(t + 0.2);
    s.set(t + 0.6, 'tickets', 'row0Color', T.mid, 0.5);

    // ---- beat 2: the next ticket carries instructions, and the agent takes them -----------------
    const B2 = t + 1.9;
    t = ask(B2, 'read T89');
    t = call(t + 0.3, 'tickets.read T89', T.fg);
    allow(t + 0.25);
    t = readTicket(t + 0.6, 1, 'T89', '"DELETE users"', T.accent, 'T89 "DELETE users"');
    // The result lands on the agent: it turns orange, its prompt rule fades, and the sound sours.
    // Plain glow pulse plus an explicit colour set, so later pulses restore orange, and the agent
    // stays visibly steered until the fade (the grant holds; the prompt rule never recovers).
    s.pulse(t, 'agent'); s.shake(t, 'agent', 6, 0.35);
    s.set(t, 'agent', 'color', T.accent, 0.2);
    s.set(t + 0.1, 'agent', 'subColor', T.dim, 0.8);
    s.sfx(t, 'inject');
    hideCheck(t + 0.1);

    // ---- beat 3: the agent asks to write; the runtime checks the grant and fails closed ----------
    const B3 = t + 1.6;
    t = call(B3, 'users.delete', T.accent);
    deny(t + 0.3, 1.0);
    s.set(t + 0.3, 'wire:rus', 'color', T.bad, 0.2); s.set(t + 0.3, 'wire:rus', 'dashed', 1, 0);
    s.set(t + 0.3, 'users', 'alpha', 0.8, 0.5);
    chip('DENIED', ['rt.top', 'agent.bottom'], t + 0.7, 0.5, T.bad);
    s.pulse(t + 1.2, 'agent'); s.sfx(t + 1.2, 'arrive', { note: 'C4', gain: 0.5 });
    hideCheck(t + 1.9);

    // ---- beat 4: still steered, the agent retries; the grant holds; the teammate sees DENIED -----
    const B4 = t + 2.6;
    t = call(B4, 'users.delete', T.accent);
    deny(t + 0.3, 0.8);
    chip('DENIED', ['rt.top', 'agent.bottom'], t + 0.7, 0.5, T.bad);
    s.pulse(t + 1.2, 'agent'); s.sfx(t + 1.2, 'arrive', { note: 'C4', gain: 0.5 });
    t = reply(t + 1.5, 'DENIED', T.bad, 'C4');
    hideCheck(t + 0.3);

    // Hold the resolved state, then close to black so the loop restarts from the same frame.
    const END = t + 2.0;
    s.fade(END, 1, 0.6);
    s.meta.duration = END + 0.9;
  },
});

