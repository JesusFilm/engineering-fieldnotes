/* OAuth PKCE, lesson 03: Bind code and challenge (motion-v2 cut).
 * One authorization attempt A. The client keeps verifier A, sends challenge A (S256) through the browser,
 * the authorization server runs its normal OAuth checks, records challenge A with attempt A, waits for the user,
 * then issues code A bound to challenge A and returns a copy through a browser redirect.
 * The code alone is not proof: a later exchange must match the recorded challenge (shown, not animated).
 * Load after engine/flow-engine.js (cut-local copy with general extensions: panel, field, status, button, cursor, link, keyed chips).
 */
FlowVideo.scene({
  meta: { title: '', subtitle: '', duration: 36.5, fps: 30, speed: 1 },
  build(s) {
    const T = s.THEME;
    const TEAL = T.ok, BLUE = T.info, CODE = '#B48CFF', AMBER = T.accent, FG = T.fg, MID = T.mid;
    // Actor pitches: client C5, browser E5, server G5, user A5. Sends sound an octave above the sender.
    const P = { client: 'C5', clientSend: 'C6', browser: 'E5', browserSend: 'E6', server: 'G5', serverSend: 'G6', user: 'A5' };

    s.sound('click', { base: 'A5', gain: 0.5, layers: [
      { type: 'noise', lp: 7000, hp: 2500, attack: 0.001, decay: 0.015, gain: 0.6 },
      { type: 'tone', wave: 'sine', delay: 0.01, attack: 0.002, decay: 0.14, harmonics: [1, 0.3] }] });
    s.sound('bind', { base: 'G5', gain: 0.5, echo: { delay: 0.09, feedback: 0.35, repeats: 2 }, layers: [
      { type: 'tone', wave: 'sine', ratio: 1, attack: 0.003, decay: 0.3, harmonics: [1, 0.3, 0.1] },
      { type: 'tone', wave: 'sine', ratio: 1.335, delay: 0.09, attack: 0.003, decay: 0.5, harmonics: [1, 0.3, 0.1] }] });
    // Open, unresolved falling fourth: "not finished yet", deliberately unlike a failure sound.
    s.sound('pending', { base: 'C5', gain: 0.36, layers: [
      { type: 'tone', wave: 'sine', ratio: 1, attack: 0.01, decay: 0.35, harmonics: [1, 0.25] },
      { type: 'tone', wave: 'sine', ratio: 0.749, delay: 0.16, attack: 0.01, decay: 0.55, harmonics: [1, 0.25] }] });

    // ---------- stage ----------
    s.node('title', 'label', { x: 540, y: 205, text: 'Bind code and challenge', size: 66, weight: 800, color: T.title });
    s.node('sub', 'label', { x: 540, y: 268, text: 'OAUTH PKCE', size: 32, weight: 700, color: MID });

    s.wire('up', [760, 700], [760, 820]);
    s.wire('down', [760, 1100], [760, 1220]);

    s.node('client', 'panel', { x: 540, y: 510, w: 940, h: 380, label: 'Client', color: MID });
    s.node('browser', 'panel', { x: 540, y: 960, w: 940, h: 280, label: 'Browser', color: MID, chrome: 70 });
    s.node('server', 'panel', { x: 540, y: 1515, w: 940, h: 590, label: 'Authorization server', color: MID });
    s.node('record', 'panel', { x: 540, y: 1470, w: 880, h: 400, label: 'Attempt A', labelSize: 42, labelX: 136, labelColor: MID, color: T.dim, lineWidth: 3, radius: 24 });

    // Client rows
    s.node('cVer', 'field', { x: 540, y: 405, key: 'Verifier A', color: TEAL, tag: 'stays here', tagColor: TEAL });
    s.node('cCh', 'field', { x: 540, y: 505, key: 'Challenge A', color: BLUE, tag: 'sent', tagColor: MID });
    s.node('cCode', 'field', { x: 540, y: 605, key: 'Code A', color: CODE, placeholder: 'no code yet', tag: 'not proof alone', tagColor: AMBER });

    // Browser content
    s.node('bState', 'label', { x: 122, y: 997, text: '', size: 52, weight: 700, color: FG, align: 'left', alpha: 0 });
    s.node('approve', 'button', { x: 700, y: 995, w: 300, h: 96, text: 'Approve', color: AMBER, alpha: 0 });

    // Server record rows, bind link, later-match bracket, status pills
    s.node('sCh', 'field', { x: 510, y: 1345, w: 760, key: 'Challenge A', color: BLUE, tag: 'S256', tagColor: FG });
    s.node('sCode', 'field', { x: 510, y: 1493, w: 760, key: 'Code A', color: CODE, placeholder: 'no code yet' });
    s.node('sMatch', 'field', { x: 510, y: 1601, w: 760, placeholder: 'Exchange must match', phSize: 46, phColor: AMBER, dashColor: AMBER, alpha: 0 });
    s.node('bind', 'link', { pts: [[300, 1388], [300, 1450]], color: FG, label: 'bound', labelX: 330, labelY: 1421, labelSize: 40 });
    s.node('later', 'link', { pts: [[890, 1601], [942, 1601], [942, 1345], [898, 1345]], color: AMBER, dash: [14, 12], lineWidth: 5, arrow: true });
    s.node('chk', 'status', { x: 320, y: 1735, w: 400, text: 'OAuth checks' });
    s.node('apr', 'status', { x: 762, y: 1735, w: 420, text: 'User approval' });

    s.node('user', 'cursor', { x: 826, y: 1022, dx: 60, dy: 40, label: 'User', labelDX: 62, labelDY: 30, alpha: 0 });

    // ---------- helpers ----------
    // GATE: the request waits at the server's edge (clear of its legend) while normal OAuth checks run.
    const CD = [760, 700], BS = [760, 995], BB = [760, 1100], SD = [760, 1220], GATE = [805, 1160];
    const lit = (t, id, on = true) => { s.set(t, id, 'color', on ? FG : MID, 0.2); if (on) s.pulse(t, id); };
    const wireOn = (t, id, dur) => { s.set(t, 'wire:' + id, 'color', FG, 0.15); s.set(t + dur, 'wire:' + id, 'color', T.wire, 0.4); };
    // A row lands: it fills and glows once in its own colour (no ring over its text).
    const land = (t, id, color) => { s.set(t, id, 'fill', 1, 0.3); s.set(t, id, 'hiColor', color, 0); s.set(t + 0.15, id, 'hi', 1, 0.15); s.set(t + 0.45, id, 'hi', 0, 0.5); };
    const show = (t, id, prop, v = 1, d = 0.25) => s.set(t, id, prop, v, d);

    // ---------- beat 1: what the client holds (0-5.6) ----------
    land(0.6, 'cVer', TEAL); s.sfx(0.6, 'store', { note: P.client });
    land(1.4, 'cCh', BLUE); s.sfx(1.4, 'store', { note: P.client, gain: 0.8 });
    show(2.6, 'cVer', 'tagA'); s.set(2.6, 'cVer', 'hi', 1, 0.2); s.set(2.6, 'cVer', 'hiColor', TEAL, 0); s.set(3.3, 'cVer', 'hi', 0, 0.4);
    s.sfx(2.6, 'ack', { note: 'C6', gain: 0.8 });
    s.set(3.8, 'cCh', 'hiColor', AMBER, 0); s.set(3.8, 'cCh', 'hi', 1, 0.25); s.sfx(3.8, 'ack', { note: P.client, gain: 1.1 });

    // ---------- beat 2: challenge A travels through the browser (5.6-10.9) ----------
    const tSend = 5.6, tB = 6.6, tB2 = 8.0, tS = 8.8;
    s.packet({ kind: 'chip', label: 'Challenge A', tag: 'S256', size: 36, color: BLUE, fadeIn: 0.25, fadeOut: 0.3,
      keys: [{ t: tSend, at: [760, 505] }, { t: tB, at: BS, via: [CD] }, { t: tB2, at: BS }, { t: tS, at: GATE, via: [[760, 1100]] },
        { t: 10.3, at: GATE }, { t: 10.9, at: [540, 1345], via: [[805, 1345]] }] });
    s.sfx(tSend, 'send', { note: P.clientSend });
    s.set(tSend + 0.3, 'cCh', 'hi', 0, 0.4); show(tSend + 0.3, 'cCh', 'tagA');
    wireOn(tSend, 'up', 1.0);
    lit(tB, 'browser'); s.sfx(tB, 'arrive', { note: P.browser });
    s.set(tB, 'bState', 'text', 'Authorize', 0); show(tB, 'bState', 'alpha');
    s.sfx(tB2, 'send', { note: P.browserSend }); wireOn(tB2, 'down', 0.8);
    show(tB2, 'bState', 'alpha', 0, 0.3); lit(tB2 + 0.3, 'browser', false);
    lit(tS, 'server'); s.sfx(tS, 'arrive', { note: P.server }); s.ripple(tS, SD, FG, { r1: 80 });
    // normal OAuth request checks run before anything is recorded
    s.set(9.0, 'chk', 'busy', 1, 0.15); s.set(9.0, 'chk', 'color', AMBER, 0.15);
    [9.0, 9.25, 9.5, 9.75, 10.0].forEach((t) => s.sfx(t, 'work', { note: 'G4', gain: 0.75 }));
    s.set(10.2, 'chk', 'busy', 0, 0.1); s.set(10.2, 'chk', 'done', 1, 0.3); s.set(10.2, 'chk', 'color', TEAL, 0.2);
    s.sfx(10.2, 'ack', { note: P.server, gain: 1.2 });
    land(10.75, 'sCh', BLUE); show(10.9, 'sCh', 'tagA'); s.sfx(10.9, 'store', { note: P.server });
    lit(11.6, 'server', false);

    // ---------- beat 3: the user decides in the browser (13.0-18.4) ----------
    s.packet({ kind: 'dot', color: AMBER, keys: [{ t: 13.0, at: SD }, { t: 13.7, at: BS }] });
    s.sfx(13.0, 'send', { note: P.serverSend }); wireOn(13.0, 'down', 0.7);
    s.set(13.1, 'apr', 'busy', 1, 0.15); s.set(13.1, 'apr', 'color', AMBER, 0.15);
    lit(13.7, 'browser'); s.sfx(13.7, 'arrive', { note: P.browser });
    s.set(13.7, 'bState', 'text', 'Consent', 0); show(13.7, 'bState', 'alpha');
    show(13.7, 'approve', 'alpha'); s.set(13.7, 'approve', 'scale', 0.85, 0); s.set(13.7, 'approve', 'scale', 1, 0.35, 'back');
    show(15.4, 'user', 'alpha', 1, 0.3); s.set(15.4, 'user', 'dx', 0, 1.0, 'out'); s.set(15.4, 'user', 'dy', 0, 1.0, 'out');
    const tClick = 16.6;
    s.set(tClick, 'approve', 'scale', 0.93, 0.08); s.set(tClick + 0.08, 'approve', 'scale', 1, 0.15);
    s.ripple(tClick, [826, 1022], FG, { r0: 6, r1: 30, dur: 0.35 }); s.sfx(tClick, 'click', { note: P.user });
    s.set(tClick + 0.1, 'approve', 'color', TEAL, 0); s.set(tClick + 0.1, 'approve', 'fill', 1, 0.2); s.set(tClick + 0.1, 'approve', 'text', 'Approved', 0);
    s.packet({ kind: 'dot', color: TEAL, keys: [{ t: 17.6, at: [700, 1043] }, { t: 18.3, at: SD, via: [BB] }] });
    s.sfx(17.6, 'send', { note: P.browserSend }); wireOn(17.6, 'down', 0.7);
    show(17.9, 'user', 'alpha', 0, 0.3);
    s.sfx(18.3, 'arrive', { note: P.server }); s.ripple(18.3, SD, TEAL, { r1: 80 });
    s.set(18.4, 'apr', 'busy', 0, 0.1); s.set(18.4, 'apr', 'done', 1, 0.3); s.set(18.4, 'apr', 'color', TEAL, 0.2);
    show(18.8, 'approve', 'alpha', 0, 0.3); show(18.8, 'bState', 'alpha', 0, 0.3); lit(18.8, 'browser', false);

    // ---------- beat 4: code A issued in the same record, bound to challenge A (20.0-24.4) ----------
    lit(20.0, 'server'); land(20.0, 'sCode', CODE); s.sfx(20.0, 'store', { note: P.server });
    s.set(21.0, 'bind', 'draw', 1, 0.6, 'out'); show(21.5, 'bind', 'labelA');
    ['sCh', 'sCode'].forEach((id) => { s.set(21.6, id, 'hiColor', FG, 0); s.set(21.6, id, 'hi', 1, 0.2); s.set(22.6, id, 'hi', 0, 0.5); });
    s.set(21.6, 'bind', 'glow', 1, 0.1); s.set(21.8, 'bind', 'glow', 0, 0.6);
    s.sfx(21.6, 'bind', { note: P.server });
    lit(22.4, 'server', false);

    // ---------- beat 5: a copy of code A returns through a browser redirect (24.4-27.2) ----------
    s.set(24.2, 'sCode', 'hiColor', CODE, 0); s.set(24.2, 'sCode', 'hi', 1, 0.15); s.set(24.8, 'sCode', 'hi', 0, 0.4);
    s.packet({ kind: 'chip', label: 'Code A', size: 40, color: CODE, fadeIn: 0.2, fadeOut: 0.3,
      keys: [{ t: 24.4, at: SD }, { t: 25.1, at: BS }, { t: 26.4, at: BS }, { t: 27.2, at: [600, 605], via: [CD] }] });
    s.sfx(24.4, 'send', { note: P.serverSend }); wireOn(24.4, 'down', 0.7);
    lit(25.1, 'browser'); s.sfx(25.1, 'arrive', { note: P.browser });
    s.set(25.1, 'bState', 'text', 'Redirect', 0); show(25.1, 'bState', 'alpha');
    s.sfx(26.4, 'send', { note: P.browserSend }); wireOn(26.4, 'up', 0.8);
    show(26.6, 'bState', 'alpha', 0, 0.3); lit(26.6, 'browser', false);
    land(27.05, 'cCode', CODE);
    lit(27.2, 'client'); s.sfx(27.2, 'deliver', { note: P.client }); lit(28.0, 'client', false);

    // ---------- beat 6: the code alone is not proof; the exchange must match (28.8-32.2) ----------
    s.set(28.8, 'cVer', 'hiColor', TEAL, 0); s.set(28.8, 'cVer', 'hi', 1, 0.2); s.set(29.6, 'cVer', 'hi', 0, 0.4);
    s.sfx(28.8, 'ack', { note: 'C6', gain: 0.8 });
    s.set(29.8, 'cCode', 'hiColor', AMBER, 0); s.set(29.8, 'cCode', 'hi', 1, 0.2); show(29.8, 'cCode', 'tagA');
    s.sfx(29.8, 'pending', { note: P.client });
    s.set(31.2, 'cCode', 'hi', 0, 0.5);
    show(31.4, 'sMatch', 'alpha', 1, 0.3); s.set(31.4, 'later', 'draw', 1, 0.6, 'inOut');
    s.set(32.0, 'sCh', 'hiColor', AMBER, 0); s.set(32.0, 'sCh', 'hi', 1, 0.25);
    s.sfx(31.5, 'pending', { note: P.server });
    // final hold: verifier still on the client, code at the client, server keeps challenge A bound to code A.
  },
});
