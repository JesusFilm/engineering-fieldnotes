/* OAuth PKCE lesson 01 — Delegate access (motion-v2/01).
 * Simplified OAuth authorization-code flow: browser authorization, code via redirect,
 * direct code-for-token exchange, API validates and authorizes each request.
 * Loads after engine/flow-engine.js (cut-local copy with panel/window nodes and tag packets).
 */
FlowVideo.scene({
  meta: { title: 'Delegate access', subtitle: 'SIMPLIFIED OAUTH FLOW', duration: 41.6, fps: 30, speed: 1 },
  build(s) {
    const T = s.THEME, DIM = 0.32;

    // ---------- stage: client and API on the left, browser and authorization server on the right ----------
    const PW = 380, LX = 255, RX = 825, TY = 820, BY = 1440;
    const PANEL = { w: PW, h: 340, rows: 3, rowTop: 96, rowH: 60, rowGap: 14, rowSize: 36 };
    s.node('client', 'panel', Object.assign({ x: LX, y: TY, label: 'Client app', alpha: 0 }, PANEL));
    s.node('api', 'panel', Object.assign({ x: LX, y: BY, label: 'Resource API', alpha: 0 }, PANEL));
    s.node('browser', 'window', { x: RX, y: TY, w: PW, h: 340, label: 'Browser', alpha: 0,
      lines: [{ y: 196, kind: 'text', size: 38 }, { y: 272, kind: 'field', w: 290 }, { y: 272, kind: 'button', w: 210 }] });
    s.node('as', 'panel', { x: RX, y: BY, w: PW, h: 340, label: 'Authorization\nserver', labelSize: 44,
      subY: 144, subSize: 32, rows: 2, rowTop: 182, rowH: 60, rowGap: 14, rowSize: 36, alpha: 0 });

    s.wire('api', 'client.bottom', 'api.top');
    s.wire('front', 'client.right', 'browser.left');
    s.wire('auth', 'browser.bottom', 'as.top');
    const BACK_C = [LX + PW / 2 - 4, TY + 178], BACK_S = [RX - PW / 2 + 4, BY - 178];
    s.wire('back', BACK_C, BACK_S);
    // vertical packet routes start and end clear of panel borders
    const CB = [LX, TY + 200], AT = [LX, BY - 200], BB = [RX, TY + 200], ST = [RX, BY - 200];
    for (const w of ['api', 'front', 'auth', 'back']) s.set(0, 'wire:' + w, 'alpha', 0, 0);

    // row geometry (matches the panel options) for ripples at a row's mark position
    const rowPt = (id, i) => { const n = id === 'as' ? { x: RX, y: BY, top: 182 } : { x: LX, y: id === 'client' ? TY : BY, top: 96 };
      return [n.x + PW / 2 - 20 - 30, n.y - 170 + n.top + i * 74 + 30]; };
    const pan = (id) => s.panOf(id);

    // ---------- sound: one pitch and timbre per actor ----------
    s.sound('client', { base: 'C5', gain: 0.5, echo: { delay: 0.085, feedback: 0.4, repeats: 2 },
      layers: [{ type: 'tone', wave: 'sine', attack: 0.003, decay: 0.3, harmonics: [1, 0.35, 0.12], harmDecay: 3 },
               { type: 'noise', lp: 6000, hp: 2000, attack: 0.001, decay: 0.02, gain: 0.08 }] });
    s.sound('browser', { base: 'E5', gain: 0.42, echo: { delay: 0.12, feedback: 0.25, repeats: 1 },
      layers: [{ type: 'tone', wave: 'sine', attack: 0.014, decay: 0.3, harmonics: [1, 0.08] }] });
    s.sound('authsrv', { base: 'G5', gain: 0.34, echo: { delay: 0.1, feedback: 0.3, repeats: 2 },
      layers: [{ type: 'tone', wave: 'sine', attack: 0.002, decay: 0.6, harmonics: [1, 0.5, 0.3, 0.18, 0.1], harmDecay: 2 },
               { type: 'tone', wave: 'sine', ratio: 2.76, attack: 0.002, decay: 0.2, gain: 0.12 }] });
    s.sound('apinote', { base: 'C4', gain: 0.55, layers: [{ type: 'tone', wave: 'triangle', attack: 0.002, decay: 0.18, harmonics: [1, 0.45, 0.2] },
               { type: 'noise', lp: 3000, hp: 500, attack: 0.001, decay: 0.025, gain: 0.3 }] });
    s.sound('click', { base: 'A5', gain: 0.4, layers: [{ type: 'noise', lp: 7000, hp: 2500, attack: 0.001, decay: 0.012, gain: 0.6 },
               { type: 'tone', wave: 'sine', attack: 0.002, decay: 0.08, harmonics: [1, 0.2] }] });
    const cue = { client: (t, g = 1) => s.sfx(t, 'client', { gain: g, pan: pan('client') }),
      browser: (t, g = 1) => s.sfx(t, 'browser', { gain: g, pan: pan('browser') }),
      as: (t, g = 1) => s.sfx(t, 'authsrv', { gain: g, pan: pan('as') }),
      api: (t, g = 1) => s.sfx(t, 'apinote', { gain: g, pan: pan('api') }) };
    const SEND = { client: 'C6', browser: 'E6', as: 'G6', api: 'C5' };
    const send = (t, who) => s.sfx(t, 'send', { note: SEND[who], gain: 1.2, pan: pan(who) });

    // ---------- helpers ----------
    const show = (t, id, a = 1, d = 0.35) => s.set(t, id, 'alpha', a, d);
    const wireA = (t, w, a, d = 0.35) => s.set(t, 'wire:' + w, 'alpha', a, d);
    function row(t, id, i, txt, color, o = {}) {
      s.set(t, id, 'row' + i + 'Alpha', 0, 0);
      s.set(t, id, 'row' + i + 'Text', txt, 0);
      s.set(t, id, 'row' + i + 'Color', color, 0);
      s.set(t, id, 'row' + i + 'TextColor', o.textColor || T.fg, 0);
      s.set(t, id, 'row' + i + 'Dash', o.dash ? 1 : 0, 0);
      s.set(t, id, 'row' + i + 'Fill', o.fill ? 0.92 : 0, 0);
      s.set(t, id, 'row' + i + 'Alpha', 1, 0.25);
    }
    function clearRow(t, id, i, d = 0.3) {
      s.set(t, id, 'row' + i + 'Alpha', 0, d);
      s.set(t + d + 0.02, id, 'row' + i + 'Mark', '', 0);
      s.set(t + d + 0.02, id, 'row' + i + 'MarkA', 0, 0);
    }
    function mark(t, id, i, kind) {
      s.set(t, id, 'row' + i + 'Mark', kind, 0);
      s.set(t, id, 'row' + i + 'MarkA', 1, 0.32, 'linear');
      s.ripple(t, rowPt(id, i), kind === 'x' ? T.bad : T.ok, { r0: 16, r1: 60, dur: 0.5 });
    }
    function line(t, i, txt, color, a = 1, d = 0.25) {
      if (txt !== null) s.set(t, 'browser', 'line' + i + 'Text', txt, 0);
      if (color) s.set(t, 'browser', 'line' + i + 'Color', color, 0);
      s.set(t, 'browser', 'line' + i + 'Alpha', a, d);
    }
    const status = (t, txt) => s.set(t, 'as', 'sublabel', txt, 0);
    const tag = (t, route, label, color, o = {}) => s.packet(Object.assign({ t, route, kind: 'tag', label, color, dur: 0.6 }, o));
    const CODE = { dashed: true, size: 30 }, TOKEN = { solid: true, size: 28 };

    // ---------- 0–5.4  the client needs the API, and has no access ----------
    show(0.3, 'client', 1, 0.4); s.set(0.3, 'client', 'scale', 0.94, 0); s.set(0.3, 'client', 'scale', 1, 0.4); cue.client(0.3);
    show(0.9, 'api', 1, 0.4); s.set(0.9, 'api', 'scale', 0.94, 0); s.set(0.9, 'api', 'scale', 1, 0.4); wireA(0.9, 'api', 1); cue.api(0.9);
    tag(1.8, [CB, AT], 'GET /incidents', T.fg, { size: 28 }); send(1.8, 'client');
    s.pulse(2.4, 'api'); cue.api(2.4);
    row(2.5, 'api', 0, 'no token', T.mid);
    mark(2.85, 'api', 0, 'x'); s.shake(2.85, 'api', 8, 0.4); s.pulse(2.85, 'api', T.bad, 0.4);
    s.sfx(2.85, 'thump', { note: 'E4', gain: 0.45, pan: pan('api') });
    tag(3.3, [AT, CB], '401', T.bad, { dur: 0.55 }); send(3.3, 'api');
    row(3.85, 'client', 2, '401 · no access', T.bad); s.pulse(3.85, 'client', T.bad, 0.3);
    s.sfx(3.85, 'deliver', { note: 'C4', gain: 0.55, pan: pan('client') });
    clearRow(5.4, 'api', 0); clearRow(5.4, 'client', 2);

    // ---------- 5.6–16.2  the user authorizes in the browser, with the authorization server ----------
    show(5.6, 'api', DIM); s.set(5.6, 'wire:api', 'alpha', DIM, 0.35);
    show(5.7, 'browser', 1, 0.4); s.set(5.7, 'browser', 'scale', 0.94, 0); s.set(5.7, 'browser', 'scale', 1, 0.4); wireA(5.7, 'front', 1); cue.browser(5.7);
    show(6.1, 'as', 1, 0.4); s.set(6.1, 'as', 'scale', 0.94, 0); s.set(6.1, 'as', 'scale', 1, 0.4); wireA(6.1, 'auth', 1); wireA(6.1, 'back', 0.55); cue.as(6.1);
    s.packet({ t: 6.8, route: ['client.right', 'browser.left'], kind: 'envelope', dur: 0.55 }); send(6.8, 'client');
    s.set(7.35, 'browser', 'address', 'auth.example', 0); s.pulse(7.35, 'browser'); cue.browser(7.35);
    s.packet({ t: 7.85, route: [BB, ST], kind: 'envelope', dur: 0.55 }); send(7.85, 'browser');
    status(8.4, 'authorize'); s.pulse(8.4, 'as'); cue.as(8.4);
    // credential step: browser and authorization server only; the client is not involved
    show(8.9, 'client', DIM); wireA(8.9, 'front', DIM); wireA(8.9, 'back', 0.25);
    s.packet({ t: 8.9, route: [ST, BB], kind: 'envelope', dur: 0.55 }); send(8.9, 'as');
    line(9.45, 0, 'Sign in', T.fg); line(9.45, 1, ' ', T.mid); cue.browser(9.45);
    [['••', 9.95], ['••••', 10.2], ['••••••', 10.45]].forEach(([d, t]) => { s.set(t, 'browser', 'line1Text', d, 0); s.sfx(t, 'clock', { note: 'E6', gain: 1.4, pan: pan('browser') }); });
    tag(10.9, [BB, ST], '••••••', T.mid, { size: 30 }); send(10.9, 'browser');
    status(11.5, 'verify user'); cue.as(11.5);
    s.ripple(11.85, [RX + 150, BY - 26], T.ok, { r0: 14, r1: 36, dur: 0.6, mark: 'check' }); s.sfx(11.85, 'ack', { note: 'G6', pan: pan('as') });
    line(12.2, 0, null, null, 0, 0.2); line(12.2, 1, null, null, 0, 0.2);
    s.packet({ t: 12.3, route: [ST, BB], kind: 'envelope', dur: 0.55 }); send(12.3, 'as');
    line(12.85, 0, 'read incidents?', T.accent); line(12.85, 2, 'Allow', T.accent); cue.browser(12.85);
    // the user approves
    s.set(13.3, 'browser', 'cursorX', RX + 130, 0); s.set(13.3, 'browser', 'cursorY', TY - 80, 0);
    s.set(13.3, 'browser', 'cursorA', 1, 0.25);
    s.set(13.4, 'browser', 'cursorX', RX + 70, 0.7); s.set(13.4, 'browser', 'cursorY', TY + 112, 0.7);
    s.set(14.25, 'browser', 'cursorPress', 1, 0.45, 'linear'); s.set(14.25, 'browser', 'line2Color', T.ok, 0.15);
    s.sfx(14.25, 'click', { pan: pan('browser') });
    s.set(14.75, 'browser', 'cursorA', 0, 0.3);
    s.packet({ t: 14.6, route: [BB, ST], kind: 'dot', color: T.ok, dur: 0.5 }); send(14.6, 'browser');
    status(15.1, 'record grant'); row(15.1, 'as', 0, 'grant: read', T.ok); s.ripple(15.1, rowPt('as', 0), T.ok, { r0: 14, r1: 60, dur: 0.5 });
    cue.as(15.1); s.sfx(15.2, 'store', { note: 'G5', pan: pan('as') });

    // ---------- 16.6–20.4  the authorization code returns through the browser redirect ----------
    show(16.6, 'client', 1); wireA(16.6, 'front', 1);
    status(16.6, 'issue code'); row(16.6, 'as', 1, 'code', T.accent, { dash: true }); s.sfx(16.6, 'store', { note: 'G6', gain: 0.9, pan: pan('as') });
    line(16.6, 0, null, null, 0, 0.3); line(16.6, 2, null, null, 0, 0.3);
    s.set(17.0, 'wire:auth', 'color', T.accent, 0.2);
    tag(17.1, [ST, BB], 'code', T.accent, CODE); send(17.1, 'as');
    s.set(17.7, 'browser', 'address', 'app.example/cb', 0); s.set(17.7, 'browser', 'addressColor', T.accent, 0);
    line(17.7, 0, 'redirect', T.accent); s.pulse(17.7, 'browser'); cue.browser(17.7);
    s.set(18.1, 'wire:front', 'color', T.accent, 0.2);
    tag(18.2, ['browser.left', 'client.right'], 'code', T.accent, CODE); send(18.2, 'browser');
    row(18.8, 'client', 0, 'code · use once', T.accent, { dash: true }); s.ripple(18.8, rowPt('client', 0), T.accent, { r0: 14, r1: 60, dur: 0.5 });
    cue.client(18.8);
    // browser is done; the exchange skips it
    s.set(19.6, 'wire:auth', 'color', T.wire, 0.4); s.set(19.6, 'wire:front', 'color', T.wire, 0.4);
    show(20.0, 'browser', DIM); wireA(20.0, 'front', DIM); wireA(20.0, 'auth', DIM); line(20.0, 0, null, null, 0, 0.35);
    s.set(20.0, 'browser', 'addressColor', T.mid, 0.35);

    // ---------- 20.6–25.6  the client exchanges the code for an access token, directly ----------
    wireA(20.6, 'back', 1, 0.3); s.set(20.6, 'wire:back', 'color', T.accent, 0.3); s.set(20.6, 'wire:back', 'flow', 1, 0);
    tag(20.8, [BACK_C, BACK_S], 'code', T.accent, Object.assign({ dur: 0.7 }, CODE)); send(20.8, 'client');
    status(21.5, 'check code'); s.pulse(21.5, 'as'); cue.as(21.5);
    [21.85, 22.1, 22.35].forEach((t) => s.sfx(t, 'work', { note: 'G4', pan: pan('as') }));
    mark(22.65, 'as', 1, 'check'); s.sfx(22.65, 'ack', { note: 'G6', pan: pan('as') });
    // the code is used up: it disappears from both sides
    clearRow(23.1, 'as', 1, 0.35); clearRow(23.1, 'client', 0, 0.35); s.sfx(23.1, 'poof', { note: 'C5', gain: 0.8 });
    s.ripple(23.1, rowPt('client', 0), T.mid, { r0: 30, r1: 90, dur: 0.5 });
    s.set(23.6, 'wire:back', 'color', T.ok, 0.25);
    status(23.7, 'issue token');
    tag(23.7, [BACK_S, BACK_C], 'access token', T.ok, Object.assign({ dur: 0.7 }, TOKEN)); s.sfx(23.7, 'chime', { note: 'G5', gain: 0.9, pan: pan('as') });
    row(24.4, 'client', 1, 'access token', T.ok, { fill: true }); s.ripple(24.4, rowPt('client', 1), T.ok, { r0: 14, r1: 70, dur: 0.5 });
    cue.client(24.4); s.sfx(24.45, 'store', { note: 'C5', pan: pan('client') });
    status(25.6, ''); s.set(25.2, 'wire:back', 'flow', 0, 0); s.set(25.2, 'wire:back', 'color', T.wire, 0.4);

    // ---------- 26.0–31.6  the token accompanies a read; the API checks before answering ----------
    show(26.0, 'browser', DIM); show(26.0, 'as', DIM); wireA(26.0, 'auth', DIM); wireA(26.0, 'back', DIM); wireA(26.0, 'front', DIM);
    show(26.0, 'api', 1); wireA(26.0, 'api', 1);
    function request(t0, label, last) {
      s.pulse(t0, 'client');
      tag(t0, [CB, AT], label, T.fg, { dur: 0.65, size: 28, tab: T.ok }); send(t0, 'client');
      s.pulse(t0 + 0.65, 'api'); cue.api(t0 + 0.65);
      row(t0 + 0.9, 'api', 0, 'token valid', T.fg); mark(t0 + 1.1, 'api', 0, 'check'); s.sfx(t0 + 1.1, 'ack', { note: 'C6', pan: pan('api') });
      row(t0 + 1.55, 'api', 1, 'for this API', T.fg); mark(t0 + 1.75, 'api', 1, 'check'); s.sfx(t0 + 1.75, 'ack', { note: 'E6', pan: pan('api') });
      row(t0 + 2.2, 'api', 2, last, T.fg);
      return t0 + 2.45;
    }
    const tRead = request(26.4, 'GET /incidents', 'read allowed');
    mark(tRead, 'api', 2, 'check'); s.sfx(tRead, 'ack', { note: 'G6', pan: pan('api') });
    tag(tRead + 0.55, [AT, CB], '200', T.ok, { dur: 0.55 }); send(tRead + 0.55, 'api');
    row(tRead + 1.1, 'client', 2, '200 · incidents', T.ok); s.pulse(tRead + 1.1, 'client', T.ok, 0.3);
    s.sfx(tRead + 1.1, 'deliver', { note: 'C6', gain: 0.8, pan: pan('client') });

    // ---------- 31.7–37.4  same valid token, different operation: the API denies it ----------
    [0, 1, 2].forEach((i) => clearRow(31.7, 'api', i)); clearRow(31.7, 'client', 2);
    const tDel = request(32.1, 'DELETE /incidents/7', 'delete allowed');
    mark(tDel, 'api', 2, 'x'); s.shake(tDel, 'api', 13, 0.45); s.pulse(tDel, 'api', T.bad, 0.5);
    s.set(tDel, 'api', 'row2Color', T.bad, 0.15);
    s.sfx(tDel, 'thump', { note: 'E3', gain: 1.0, pan: pan('api') });
    tag(tDel + 0.6, [AT, CB], '403', T.bad, { dur: 0.55 }); send(tDel + 0.6, 'api');
    row(tDel + 1.15, 'client', 2, '403 · denied', T.bad); s.pulse(tDel + 1.15, 'client', T.bad, 0.3);
    s.sfx(tDel + 1.15, 'deliver', { note: 'C4', gain: 0.7, pan: pan('client') });

    // ---------- 37.6–41.6  route recap, hold, fade ----------
    show(37.6, 'browser', 1); show(37.6, 'as', 1);
    for (const w of ['front', 'auth']) { wireA(37.6, w, 1); s.set(37.6, 'wire:' + w, 'color', T.accent, 0.3); s.set(37.6, 'wire:' + w, 'flow', 1, 0); }
    cue.browser(37.6);
    wireA(38.3, 'back', 1); s.set(38.3, 'wire:back', 'color', T.ok, 0.3); s.set(38.3, 'wire:back', 'flow', 1, 0); cue.as(38.3);
    s.set(39.0, 'wire:api', 'color', T.ok, 0.3); s.set(39.0, 'wire:api', 'flow', 1, 0); s.pulse(39.0, 'api'); cue.api(39.0);
    s.fade(40.6, 1, 0.8);
  },
});

