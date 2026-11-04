// OAuth PKCE lesson 05: Separate login attempts (motion-v2/05).
// Bug: one client keeps a single shared verifier slot. Login A stores verifier A, the server saves code A with
// challenge A, and code A waits in tab A. Login B then overwrites the same slot with verifier B. When A's callback
// runs, the client sends code A with verifier B; S256(verifier B) = challenge B differs from challenge A, so the
// server rejects the exchange (invalid_grant). Repair: an engineer changes the client to keep one verifier row per
// login, then starts a fresh login. Fresh login C keeps its own row while D writes another; code C + verifier C passes
// the PKCE comparison, and other OAuth checks still follow. All values are abstract placeholders.
// Engine: ./engine (cut-local copy with general helpers, see verification.json).
FlowVideo.scene({
  meta: { title: '', subtitle: '', duration: 45, fps: 30, speed: 1, veilTop: 352 },
  build(s) {
    const T = s.THEME;
    // Retiming: beats below are authored on a working clock; these cuts trim long holds without touching
    // any motion (each cut point sits inside a still hold). Every time at or after a cut moves earlier.
    const CUTS = [[11.0, 0.3], [30.15, 0.4], [38.0, 0.3], [49.5, 0.6]];
    const rt = (t) => t - CUTS.reduce((a, [c, d]) => a + (t >= c ? d : 0), 0);
    // pulse() and fade() schedule through s.set, so they inherit the retiming once and are not wrapped again.
    const raw = { set: s.set, sfx: s.sfx, packet: s.packet, ripple: s.ripple, shake: s.shake };
    s.set = (t, ...a) => raw.set(rt(t), ...a);
    s.sfx = (t, ...a) => raw.sfx(rt(t), ...a);
    s.ripple = (t, ...a) => raw.ripple(rt(t), ...a);
    s.shake = (t, ...a) => raw.shake(rt(t), ...a);
    s.packet = (o) => raw.packet(Object.assign({}, o, { t: rt(o.t) }));
    const CA = '#4C9AFF', CB = '#B58CFF'; // left login (A, later C) / right login (B, later D)
    const L = -0.45, R = 0.45;             // pans for left / right logins

    // ---------- scene-local sounds (actor timbres) ----------
    // Server: woodier, lower mallet so it never sounds like a client note.
    s.sound('srv', { base: 'G4', gain: 0.5, echo: { delay: 0.11, feedback: 0.35, repeats: 2 },
      layers: [{ type: 'tone', wave: 'sine', attack: 0.002, decay: 0.22, harmonics: [1, 0.5, 0.25, 0.12], harmDecay: 5 },
               { type: 'noise', lp: 2200, hp: 400, attack: 0.001, decay: 0.03, gain: 0.18 }] });
    // Overwrite: click-lock plus a short low dip, so the replaced value is audible.
    s.sound('overwrite', { base: 'E5', gain: 0.5,
      layers: [{ type: 'noise', lp: 5000, hp: 1500, attack: 0.001, decay: 0.03, gain: 0.5 },
               { type: 'tone', wave: 'sine', delay: 0.02, attack: 0.002, decay: 0.22, harmonics: [1, 0.3] },
               { type: 'tone', wave: 'sine', freq: 140, glideTo: 70, glide: 0.2, attack: 0.003, decay: 0.22, gain: 0.7 }] });
    // UI click for a deliberate engineering action (cursor press).
    s.sound('click', { base: 'C4', gain: 0.4,
      layers: [{ type: 'noise', lp: 7000, hp: 2500, attack: 0.001, decay: 0.012, gain: 0.8 },
               { type: 'tone', wave: 'triangle', attack: 0.001, decay: 0.05, harmonics: [1, 0.3] }] });

    // ---------- title band ----------
    s.node('title', 'label', { x: 540, y: 236, text: 'Separate login attempts', size: 66, weight: 800, color: T.title });
    s.node('sub', 'label', { x: 540, y: 312, text: 'BUG · ONE SHARED VERIFIER', size: 38, weight: 700, color: T.mid, spacing: 4 });

    // ---------- client ----------
    s.node('client', 'panel', { x: 540, y: 690, w: 940, h: 620, label: 'Client', labelSize: 42, color: T.mid });
    s.node('cardA', 'panel', { x: 300, y: 522, w: 410, h: 170, label: 'Login A', labelSize: 46, radius: 24, lineWidth: 4, color: T.dim, labelColor: T.mid });
    s.node('cardB', 'panel', { x: 780, y: 522, w: 410, h: 170, label: 'Login B', labelSize: 46, radius: 24, lineWidth: 4, color: T.dim, labelColor: T.mid });
    s.node('fA', 'field', { x: 300, y: 535, w: 350, h: 86, keySize: 48, phSize: 40, placeholder: 'idle', fill: 0 });
    s.node('fB', 'field', { x: 780, y: 535, w: 350, h: 86, keySize: 48, phSize: 40, placeholder: 'idle', fill: 0 });
    s.node('store', 'panel', { x: 540, y: 770, w: 880, h: 220, label: 'Shared verifier', labelSize: 44, radius: 24, lineWidth: 4, color: T.mid });
    s.node('slot', 'field', { x: 540, y: 778, w: 800, h: 100, keySize: 52, tagSize: 38, phSize: 44, placeholder: 'empty', fill: 0 });
    s.node('row0', 'field', { x: 540, y: 728, w: 800, h: 76, keySize: 46, tagSize: 36, phSize: 40, placeholder: 'empty', fill: 0, alpha: 0 });
    s.node('row1', 'field', { x: 540, y: 818, w: 800, h: 76, keySize: 46, tagSize: 36, phSize: 40, placeholder: 'empty', fill: 0, alpha: 0 });
    s.node('cS256', 'button', { x: 800, y: 942, w: 200, h: 66, text: 'S256', size: 40, color: T.mid });

    // ---------- token request (appears only for an exchange) ----------
    s.node('req', 'panel', { x: 540, y: 1138, w: 700, h: 206, label: 'Token request', labelSize: 40, radius: 24, lineWidth: 4, color: T.mid, alpha: 0 });
    s.node('reqCode', 'field', { x: 540, y: 1100, w: 620, h: 72, keySize: 46, fill: 0, alpha: 0 });
    s.node('reqVer', 'field', { x: 540, y: 1180, w: 620, h: 72, keySize: 46, fill: 0, alpha: 0 });
    s.node('btn', 'button', { x: 540, y: 1138, w: 380, h: 100, text: 'Fix client', size: 48, color: T.accent, alpha: 0 });
    s.node('cur', 'cursor', { x: 900, y: 1290, color: T.fg, alpha: 0 });

    // ---------- authorization server ----------
    s.node('server', 'panel', { x: 540, y: 1560, w: 940, h: 500, label: 'Authorization server', labelSize: 42, labelBottom: true, color: T.mid });
    s.node('rec', 'field', { x: 540, y: 1388, w: 860, h: 84, keySize: 48, tagSize: 44, phSize: 40, placeholder: 'no saved login', fill: 0 });
    s.node('sS256', 'button', { x: 290, y: 1492, w: 220, h: 68, text: 'S256', size: 40, color: T.mid });
    s.node('cmpL', 'field', { x: 290, y: 1600, w: 380, h: 88, keySize: 44, fill: 0 });
    s.node('cmpR', 'field', { x: 790, y: 1600, w: 380, h: 88, keySize: 44, fill: 0 });
    s.node('glyph', 'label', { x: 540, y: 1596, text: '≠', size: 110, weight: 800, color: T.bad, alpha: 0 });
    s.node('res', 'status', { x: 540, y: 1720, w: 860, h: 74, size: 44, text: '', color: T.dim, alpha: 0 });

    // ---------- helpers ----------
    const chip = (t, dur, label, color, route, size = 42) => s.packet({ kind: 'chip', size, label, color, t, dur, route });
    const dot = (t, dur, color, route) => s.packet({ kind: 'dot', color, t, dur, route });
    function fill(t, id, key, color, opts = {}) {
      s.set(t, id, 'key', key, 0); s.set(t, id, 'keyColor', opts.keyColor || color, 0); s.set(t, id, 'color', color, 0);
      if (opts.tag) { s.set(t, id, 'tag', opts.tag, 0); s.set(t, id, 'tagColor', color, 0); s.set(t, id, 'tagA', 1, 0.3); }
      s.set(t, id, 'fill', 1, 0.3);
    }
    function clear(t, id, dur = 0.3) { s.set(t, id, 'fill', 0, dur); s.set(t, id, 'tagA', 0, dur); s.set(t, id, 'hi', 0, dur); }
    function hi(t, id, on, dur = 0.25) { s.set(t, id, 'hi', on ? 1 : 0, dur); }
    function startLogin(t, card, f, label, color, pan, note) {
      s.set(t, card, 'label', label, 0);
      s.set(t, card, 'color', color, 0.2); s.set(t, card, 'labelColor', color, 0.2); s.pulse(t, card);
      s.set(t, f, 'placeholder', 'waiting', 0); s.set(t, f, 'phColor', T.mid, 0.2);
      s.sfx(t, 'send', { note, gain: 1.1, pan });
    }
    // Server side of one token exchange. O = time the request leaves the client.
    function serverCheck(O, code, ver, verColor, saved, savedColor, computed, match) {
      // code selects its saved record; verifier enters S256
      dot(O, 0.6, T.fg, [[700, 1242], [700, 1300], [700, 1346]]);
      s.set(O + 0.6, 'rec', 'hiColor', T.accent, 0); hi(O + 0.6, 'rec', 1); s.sfx(O + 0.6, 'srv', { note: 'G5', gain: 1.0 });
      dot(O + 0.9, 0.6, verColor, [[440, 1216], [440, 1300], [290, 1456]]);
      s.set(O + 1.5, 'sS256', 'color', T.fg, 0.15); s.set(O + 1.5, 'sS256', 'glow', 1, 0.15);
      s.sfx(O + 1.5, 'work', { note: 'G5', gain: 1.1 }); s.sfx(O + 1.75, 'work', { note: 'G5', gain: 1.0 });
      s.set(O + 2.2, 'sS256', 'color', T.mid, 0.3); s.set(O + 2.2, 'sS256', 'glow', 0, 0.3);
      fill(O + 2.25, 'cmpL', computed, verColor); s.ripple(O + 2.3, [290, 1600], verColor, { r1: 70 });
      s.sfx(O + 2.25, 'srv', { note: 'G5', gain: 0.9, pan: -0.3 });
      // saved challenge copied out of the record
      chip(O + 2.95, 0.6, saved, savedColor, [[790, 1400], [790, 1600]], 40);
      fill(O + 3.55, 'cmpR', saved, savedColor); hi(O + 3.4, 'rec', 0, 0.4);
      s.sfx(O + 3.55, 'srv', { note: 'G5', gain: 0.9, pan: 0.3 });
      // compare
      hi(O + 4.25, 'cmpL', 1); hi(O + 4.25, 'cmpR', 1);
      s.set(O + 4.25, 'cmpL', 'hiColor', T.fg, 0); s.set(O + 4.25, 'cmpR', 'hiColor', T.fg, 0);
      s.set(O + 4.8, 'glyph', 'text', match ? '=' : '≠', 0); s.set(O + 4.8, 'glyph', 'color', match ? T.ok : T.bad, 0);
      s.set(O + 4.8, 'glyph', 'scale', 0.3, 0); s.set(O + 4.8, 'glyph', 'scale', 1, 0.35, 'back'); s.set(O + 4.8, 'glyph', 'alpha', 1, 0.12);
      hi(O + 4.8, 'cmpL', 0, 0.3); hi(O + 4.8, 'cmpR', 0, 0.3);
    }

    // =========== 1. Login A: verifier A, challenge A, code A (0.5–7.6) ===========
    startLogin(0.5, 'cardA', 'fA', 'Login A', CA, L, 'C6');
    chip(0.9, 0.7, 'verifier A', CA, [[430, 610], [650, 700], [520, 778]]);
    fill(1.6, 'slot', 'verifier A', CA, { tag: 'login A' });
    s.sfx(1.6, 'store', { note: 'C5', gain: 1.1, pan: L });
    // a copy passes through S256; only the challenge leaves the client
    s.pulse(2.4, 'slot');
    chip(2.4, 0.6, 'verifier A', CA, [[640, 790], [800, 900]], 36);
    s.set(3.0, 'cS256', 'color', T.fg, 0.15); s.set(3.0, 'cS256', 'glow', 1, 0.15);
    s.sfx(3.0, 'work', { note: 'C5', gain: 1.0, pan: 0.3 });
    s.set(3.6, 'cS256', 'color', T.mid, 0.3); s.set(3.6, 'cS256', 'glow', 0, 0.3);
    chip(3.4, 0.8, 'challenge A', CA, [[800, 990], [800, 1250], [790, 1388]], 40);
    fill(4.2, 'rec', 'code A', CA, { tag: 'challenge A' });
    s.ripple(4.25, [540, 1388], CA, { r1: 90 });
    s.sfx(4.2, 'srv', { note: 'G5', gain: 1.0 });
    // code A returns to login A and waits there
    dot(4.9, 1.1, CA, [[110, 1388], [36, 1388], [36, 535], [125, 535]]);
    fill(6.0, 'fA', 'code A', CA); s.ripple(6.05, [125, 535], CA, { r1: 60 });
    s.sfx(6.0, 'arrive', { note: 'C5', gain: 0.9, pan: L });
    // hold: A owns verifier A and code A (6.3–7.9)

    // =========== 2. Login B overwrites the same slot (7.9–13.4) ===========
    startLogin(7.9, 'cardB', 'fB', 'Login B', CB, R, 'E6');
    chip(8.3, 0.7, 'verifier B', CB, [[780, 600], [700, 760]]);
    // A's value leaves the slot before B's value settles: never two recoverable entries
    s.set(9.0, 'slot', 'hiColor', T.accent, 0); hi(9.0, 'slot', 1, 0.1);
    s.set(9.0, 'store', 'color', T.accent, 0.1); s.set(9.0, 'store', 'labelColor', T.accent, 0.1);
    clear(9.0, 'slot', 0.25); s.set(9.0, 'slot', 'tagA', 0, 0.1); s.set(9.0, 'slot', 'placeholder', '', 0);
    fill(9.3, 'slot', 'verifier B', CB, { tag: 'login B' });
    s.shake(9.3, 'slot', 10, 0.4);
    s.sfx(9.3, 'overwrite', { note: 'E5', gain: 1.2, pan: 0.2 });
    hi(9.9, 'slot', 0, 0.4); s.set(9.9, 'store', 'color', T.mid, 0.5); s.set(9.9, 'store', 'labelColor', T.fg, 0.5);
    // hold: code A (blue) still waits; the only verifier is B (10.3–12.6)

    // =========== 3. Callback A builds the wrong pair (12.6–18.6) ===========
    s.set(12.6, 'req', 'alpha', 1, 0.4); s.set(12.6, 'reqCode', 'alpha', 1, 0.4); s.set(12.6, 'reqVer', 'alpha', 1, 0.4);
    s.set(13.1, 'fA', 'hiColor', T.accent, 0); hi(13.1, 'fA', 1); s.pulse(13.1, 'cardA');
    s.sfx(13.1, 'arrive', { note: 'C5', gain: 0.9, pan: L });
    dot(13.5, 0.9, CA, [[125, 535], [36, 535], [36, 1100], [230, 1100]]);
    fill(14.4, 'reqCode', 'code A', CA); hi(14.4, 'fA', 0, 0.4);
    s.sfx(14.4, 'store', { note: 'C5', gain: 0.8, pan: -0.2 });
    // lookup touches the one shared slot and finds verifier B
    s.set(15.1, 'slot', 'hiColor', T.accent, 0); hi(15.1, 'slot', 1);
    s.sfx(15.1, 'hit', { note: 'C5', gain: 0.9 });
    dot(15.5, 0.7, CB, [[540, 828], [540, 1000], [540, 1146]]);
    fill(16.2, 'reqVer', 'verifier B', CB); hi(16.3, 'slot', 0, 0.4);
    s.sfx(16.2, 'store', { note: 'E5', gain: 0.8, pan: 0.1 });
    // hold the wrong pair (16.5–18.4), then send it as one request
    s.set(18.4, 'req', 'color', T.fg, 0.15); s.pulse(18.4, 'req');
    s.sfx(18.4, 'send', { note: 'C6', gain: 1.1 });
    s.set(19.0, 'req', 'color', T.mid, 0.4);

    // =========== 4. Server rejects the mismatch (18.6–25.9) ===========
    serverCheck(18.6, 'code A', 'verifier B', CB, 'challenge A', CA, 'challenge B', false);
    // O + 4.8 = 23.4
    s.shake(23.4, 'cmpL', 12, 0.45); s.shake(23.4, 'cmpR', 12, 0.45);
    s.ripple(23.45, [540, 1596], T.bad, { r1: 130 });
    s.sfx(23.4, 'miss', { note: 'G4', gain: 1.4 });
    s.set(24.0, 'res', 'text', 'Rejected: invalid_grant', 0); s.set(24.0, 'res', 'textColor', T.bad, 0);
    s.set(24.0, 'res', 'alpha', 1, 0.2); s.set(24.0, 'res', 'color', T.bad, 0.2); s.set(24.0, 'res', 'fail', 1, 0.35);
    s.shake(24.0, 'res', 10, 0.4);
    s.sfx(24.0, 'thump', { note: 'G3', gain: 1.6 });
    // hold the rejection: no token anywhere (24.4–26.6)

    // =========== 5. Close, fix the client, start fresh (26.6–33.2) ===========
    s.set(26.6, 'sub', 'alpha', 0, 0.4);
    s.set(26.6, 'cardA', 'label', 'A failed', 0); s.set(26.6, 'cardA', 'labelColor', T.bad, 0.2); s.set(26.6, 'cardA', 'color', T.dim, 0.3);
    s.set(26.6, 'fA', 'color', T.dim, 0.3); s.set(26.6, 'fA', 'keyColor', T.mid, 0.3);
    s.set(26.6, 'cardB', 'label', 'B cancelled', 0); s.set(26.6, 'cardB', 'labelColor', T.mid, 0.2); s.set(26.6, 'cardB', 'color', T.dim, 0.3);
    s.set(26.6, 'fB', 'placeholder', 'stopped', 0);
    for (const id of ['req', 'reqCode', 'reqVer', 'glyph', 'res']) s.set(26.6, id, 'alpha', 0, 0.4);
    for (const id of ['cmpL', 'cmpR', 'rec', 'slot']) clear(26.6, id, 0.4);
    s.sfx(26.6, 'poof', { note: 'C5', gain: 0.6 });
    s.set(27.05, 'sub', 'text', 'FIX · ONE VERIFIER PER LOGIN', 0); s.set(27.1, 'sub', 'alpha', 1, 0.4);
    // engineer edits the client
    s.set(27.2, 'btn', 'text', 'Fix client', 0); s.set(27.2, 'btn', 'alpha', 1, 0.3);
    s.set(27.2, 'cur', 'alpha', 1, 0.3); s.set(27.3, 'cur', 'dx', -250, 0.7); s.set(27.3, 'cur', 'dy', -130, 0.7);
    s.set(28.1, 'btn', 'fill', 1, 0.12); s.set(28.1, 'cur', 'scale', 0.9, 0.08); s.set(28.2, 'cur', 'scale', 1, 0.1);
    s.sfx(28.1, 'click', { note: 'C4', gain: 1.2 });
    s.set(28.5, 'btn', 'fill', 0, 0.3);
    // schema change: single slot becomes one row per login
    s.set(28.6, 'slot', 'alpha', 0, 0.25);
    s.set(28.6, 'store', 'color', T.accent, 0.15); s.pulse(28.6, 'store');
    s.set(28.85, 'store', 'label', 'Verifier per login', 0);
    s.set(28.85, 'row0', 'alpha', 1, 0.3); s.set(29.05, 'row1', 'alpha', 1, 0.3);
    s.sfx(28.85, 'store', { note: 'A4', gain: 1.1 }); s.sfx(29.05, 'store', { note: 'A4', gain: 0.8 });
    s.set(29.6, 'store', 'color', T.mid, 0.5);
    // the failed attempts stay visibly closed; the fresh login is started on purpose
    s.set(30.3, 'btn', 'text', 'Start fresh', 0); s.pulse(30.3, 'btn');
    s.sfx(30.3, 'click', { note: 'G4', gain: 0.5 });
    s.set(31.0, 'btn', 'fill', 1, 0.12); s.set(31.0, 'cur', 'scale', 0.9, 0.08); s.set(31.1, 'cur', 'scale', 1, 0.1);
    s.sfx(31.0, 'click', { note: 'C4', gain: 1.2 });
    s.set(31.4, 'btn', 'alpha', 0, 0.3); s.set(31.4, 'cur', 'alpha', 0, 0.3);
    s.set(31.4, 'fA', 'fill', 0, 0); s.set(31.4, 'fA', 'key', '', 0);
    startLogin(31.4, 'cardA', 'fA', 'Login C', CA, L, 'C6');

    // =========== 6. Fresh C, overlapping D, matched exchange (31.4–45) ===========
    chip(31.8, 0.6, 'verifier C', CA, [[430, 610], [650, 690], [520, 728]]);
    fill(32.4, 'row0', 'verifier C', CA, { tag: 'login C' });
    s.sfx(32.4, 'store', { note: 'C5', gain: 1.1, pan: L });
    dot(32.9, 0.5, CA, [[700, 740], [800, 905]]);
    s.set(33.4, 'cS256', 'color', T.fg, 0.15); s.set(33.4, 'cS256', 'glow', 1, 0.15); s.sfx(33.4, 'work', { note: 'C5', gain: 1.0, pan: 0.3 });
    s.set(33.9, 'cS256', 'color', T.mid, 0.3); s.set(33.9, 'cS256', 'glow', 0, 0.3);
    chip(33.6, 0.7, 'challenge C', CA, [[800, 990], [800, 1250], [790, 1388]], 40);
    fill(34.3, 'rec', 'code C', CA, { tag: 'challenge C' }); s.sfx(34.3, 'srv', { note: 'G5', gain: 1.0 });
    dot(34.8, 1.0, CA, [[110, 1388], [36, 1388], [36, 535], [125, 535]]);
    fill(35.8, 'fA', 'code C', CA); s.sfx(35.8, 'arrive', { note: 'C5', gain: 0.9, pan: L });
    // D starts while C waits, and writes its own row
    startLogin(36.3, 'cardB', 'fB', 'Login D', CB, R, 'E6');
    chip(36.7, 0.6, 'verifier D', CB, [[780, 600], [700, 818]]);
    fill(37.3, 'row1', 'verifier D', CB, { tag: 'login D' });
    s.sfx(37.3, 'store', { note: 'E5', gain: 1.1, pan: R });
    // hold: row C untouched (37.6–39.1)
    s.set(39.1, 'req', 'alpha', 1, 0.3); s.set(39.1, 'reqCode', 'alpha', 1, 0.3); s.set(39.1, 'reqVer', 'alpha', 1, 0.3);
    s.set(39.1, 'reqCode', 'fill', 0, 0); s.set(39.1, 'reqVer', 'fill', 0, 0);
    s.set(39.4, 'fA', 'hiColor', T.accent, 0); hi(39.4, 'fA', 1); s.pulse(39.4, 'cardA');
    s.sfx(39.4, 'arrive', { note: 'C5', gain: 0.9, pan: L });
    dot(39.7, 0.8, CA, [[125, 535], [36, 535], [36, 1100], [230, 1100]]);
    fill(40.5, 'reqCode', 'code C', CA); hi(40.5, 'fA', 0, 0.4);
    s.sfx(40.5, 'store', { note: 'C5', gain: 0.8, pan: -0.2 });
    // lookup by login: only row C lights
    s.set(41.0, 'row0', 'hiColor', T.accent, 0); hi(41.0, 'row0', 1);
    s.sfx(41.0, 'hit', { note: 'C5', gain: 0.9, pan: -0.2 });
    dot(41.3, 0.6, CA, [[540, 766], [540, 1000], [540, 1146]]);
    fill(41.9, 'reqVer', 'verifier C', CA); hi(42.1, 'row0', 0, 0.4);
    s.sfx(41.9, 'store', { note: 'C5', gain: 0.8, pan: -0.1 });
    s.set(42.5, 'req', 'color', T.fg, 0.15); s.pulse(42.5, 'req'); s.sfx(42.5, 'send', { note: 'C6', gain: 1.1 });
    s.set(43.0, 'req', 'color', T.mid, 0.4);
    // reuse the failed-run comparison layout for a fresh match; fresh fields were cleared at 26.6
    for (const id of ['glyph']) s.set(42.6, id, 'alpha', 0, 0);
    serverCheck(42.7, 'code C', 'verifier C', CA, 'challenge C', CA, 'challenge C', true);
    // O + 4.8 = 47.5
    s.ripple(47.55, [540, 1596], T.ok, { r1: 120 });
    s.sfx(47.5, 'hit', { note: 'G5', gain: 1.0 });
    s.set(48.1, 'res', 'fail', 0, 0); s.set(48.1, 'res', 'text', 'PKCE matched · other checks next', 0);
    s.set(48.1, 'res', 'textColor', T.fg, 0); s.set(48.1, 'res', 'color', T.ok, 0); s.set(48.1, 'res', 'alpha', 1, 0.2); s.set(48.1, 'res', 'done', 1, 0.35);
    s.sfx(48.1, 'ack', { note: 'G5', gain: 1.6 });
    // hold the resolved state with D still waiting, then a finite fade
    s.fade(50.6, 1, 0.8);
    s.set(50.6, 'sub', 'alpha', 0, 0.8);
    s.meta.duration = rt(51.6);
  },
});

