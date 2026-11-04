// OAuth PKCE lesson 04: Prove the verifier matches (motion-v2/04).
// Case 1: the client submits code A with its original verifier A. The authorization server finds the challenge
// it saved for code A, applies S256 to the submitted verifier, and compares. A match passes only the PKCE row;
// the other OAuth checks complete separately before tokens are issued.
// Alternative case (a separate transaction shown instead of case 1, never a retry): verifier B is sent, the
// computed challenge differs, PKCE fails, invalid_grant returns and no tokens are issued.
// Values are illustrative aliases. Engine: ./engine (cut-local copy with extensions, see verification.json).
FlowVideo.scene({
  meta: { title: '', subtitle: '', duration: 41.4, fps: 30, speed: 1, veilTop: 380 },
  build(s) {
    const T = s.THEME;
    const VER = T.accent, CH = T.info;

    // ---------- title band ----------
    s.node('title', 'label', { x: 540, y: 262, text: 'Prove the verifier matches', size: 62, weight: 800, color: T.title });
    s.node('sub', 'label', { x: 540, y: 340, text: 'CASE 1 · ORIGINAL VERIFIER A', size: 32, weight: 700, color: T.mid, spacing: 5 });

    // ---------- client ----------
    s.node('client', 'panel', { x: 540, y: 545, w: 940, h: 230, label: 'Client', labelSize: 42, color: T.mid });
    s.node('cCode', 'field', { x: 300, y: 505, w: 400, h: 80, keySize: 46, key: 'code A', fill: 1, color: T.fg });
    s.node('cVer', 'field', { x: 780, y: 505, w: 400, h: 80, keySize: 46, key: 'verifier A', keyColor: VER, fill: 1, color: VER });
    s.node('cResp', 'field', { x: 540, y: 605, w: 880, h: 72, keySize: 44, phSize: 40, placeholder: 'response', fill: 0 });
    s.wire('req', [540, 664], [540, 798]);

    // ---------- authorization server ----------
    s.node('server', 'panel', { x: 540, y: 1303, w: 940, h: 1006, label: 'Authorization server', labelSize: 40, labelBottom: true, color: T.mid });
    // saved record for code A (present before this lesson starts)
    s.node('card', 'panel', { x: 290, y: 990, w: 420, h: 170, label: 'saved', labelSize: 36, radius: 24, lineWidth: 4, color: T.mid, labelColor: T.mid });
    s.node('cardCode', 'label', { x: 290, y: 962, text: 'code A', size: 46, weight: 700, color: T.fg });
    s.node('cardChal', 'label', { x: 290, y: 1036, text: 'challenge A', size: 46, weight: 700, color: CH });
    // S256 operation
    s.node('op', 'panel', { x: 790, y: 990, w: 400, h: 170, label: 'S256', labelSize: 40, labelX: 846, radius: 24, lineWidth: 4, color: T.mid });
    s.node('opStep', 'label', { x: 790, y: 968, text: '', size: 44, weight: 700, mono: true, color: T.fg, alpha: 0 });
    s.node('opBar', 'bar', { x: 790, y: 1032, w: 300, h: 14, seg0Color: T.accent, alpha: 0 });
    // comparison
    s.node('slotS', 'field', { x: 290, y: 1180, w: 380, h: 92, keySize: 44, fill: 0, color: CH, keyColor: CH });
    s.node('slotC', 'field', { x: 790, y: 1180, w: 380, h: 92, keySize: 44, fill: 0, color: CH, keyColor: CH });
    s.node('capS', 'label', { x: 290, y: 1266, text: 'saved', size: 38, weight: 600, color: T.mid });
    s.node('capC', 'label', { x: 790, y: 1266, text: 'computed', size: 38, weight: 600, color: T.mid });
    s.node('glyph', 'label', { x: 540, y: 1176, text: '=', size: 110, weight: 800, color: T.ok, alpha: 0 });
    // validation
    s.node('rPkce', 'status', { x: 540, y: 1360, w: 860, h: 70, size: 46, text: 'PKCE check', color: T.dim });
    s.node('hOther', 'label', { x: 112, y: 1440, text: 'other OAuth checks', size: 38, weight: 600, color: T.mid, align: 'left' });
    const ROWS = ['code valid', 'client binding', 'redirect URI'];
    ROWS.forEach((r, i) => s.node('r' + i, 'status', { x: 540, y: 1495 + i * 78, w: 860, h: 66, size: 44, text: r, color: T.dim }));
    s.node('tok', 'field', { x: 540, y: 1738, w: 860, h: 70, keySize: 44, phSize: 42, placeholder: 'no tokens yet', phColor: T.mid, fill: 0, color: T.ok, keyColor: T.ok });

    const pan = (a) => s.panOf(a);
    const INLET = [540, 860];

    // One token request: code A + the given verifier, lookup, S256, comparison. O = time offset.
    function exchange(O, ver, chal, match) {
      // client highlights what it is about to submit
      s.set(O + 1.0, 'cCode', 'hi', 1, 0.25); s.set(O + 1.0, 'cVer', 'hi', 1, 0.25);
      s.set(O + 2.0, 'cCode', 'hi', 0, 0.4); s.set(O + 2.0, 'cVer', 'hi', 0, 0.4);
      // one request carries both values
      s.packet({ kind: 'chip', size: 36, label: 'code A', tag: ver, tagColor: VER, color: T.fg, fadeIn: 0.15, fadeOut: 0.12,
        keys: [{ t: O + 1.6, at: [540, 702] }, { t: O + 2.5, at: INLET }, { t: O + 2.75, at: INLET }] });
      s.sfx(O + 1.6, 'send', { note: 'C6', gain: 0.9 });
      s.ripple(O + 2.5, INLET, T.fg, { r1: 90 });
      s.sfx(O + 2.5, 'arrive', { note: 'E5' });
      // code A selects the saved record
      s.packet({ kind: 'chip', size: 36, label: 'code A', color: T.fg, fadeIn: 0.1, fadeOut: 0.3,
        keys: [{ t: O + 2.65, at: [420, 860] }, { t: O + 3.3, at: [420, 860] }, { t: O + 4.0, at: [290, 962] }, { t: O + 4.3, at: [290, 962] }] });
      s.set(O + 3.95, 'card', 'color', T.fg, 0.2); s.set(O + 3.95, 'card', 'labelColor', T.fg, 0.2); s.pulse(O + 3.95, 'card');
      s.sfx(O + 4.0, 'ack', { note: 'E5', gain: 1.6, pan: pan([290, 990]) });
      s.set(O + 5.5, 'card', 'color', T.mid, 0.4); s.set(O + 5.5, 'card', 'labelColor', T.mid, 0.4);
      // verifier waits at the inlet, then enters S256
      s.packet({ kind: 'chip', size: 36, label: ver, color: VER, fadeIn: 0.1, fadeOut: 0.2,
        keys: [{ t: O + 2.65, at: [640, 860] }, { t: O + 5.2, at: [640, 860] }, { t: O + 5.8, at: [790, 975] }, { t: O + 6.0, at: [790, 975] }] });
      s.set(O + 5.8, 'op', 'color', T.fg, 0.2); s.pulse(O + 5.8, 'op');
      s.set(O + 6.0, 'opStep', 'text', 'SHA-256', 0); s.set(O + 6.0, 'opStep', 'alpha', 1, 0.2);
      s.set(O + 6.0, 'opBar', 'alpha', 1, 0.15); s.set(O + 6.0, 'opBar', 'seg0', 1, 0.7, 'linear');
      s.sfx(O + 6.0, 'work', { note: 'E4', gain: 1.2, pan: pan('op') });
      s.set(O + 6.95, 'opStep', 'text', 'base64url', 0); s.set(O + 6.95, 'opBar', 'seg0', 0, 0);
      s.set(O + 7.0, 'opBar', 'seg0', 1, 0.7, 'linear');
      s.sfx(O + 6.95, 'work', { note: 'E4', gain: 1.2, pan: pan('op') });
      s.set(O + 7.8, 'opStep', 'alpha', 0, 0.2); s.set(O + 7.8, 'opBar', 'alpha', 0, 0.2);
      s.set(O + 8.05, 'opBar', 'seg0', 0, 0);
      s.set(O + 8.2, 'op', 'color', T.mid, 0.4);
      // computed challenge lands
      s.packet({ kind: 'chip', size: 38, label: chal, color: CH, t: O + 7.85, dur: 0.7, route: [[790, 1062], [790, 1180]] });
      s.set(O + 8.45, 'slotC', 'key', chal, 0); s.set(O + 8.45, 'slotC', 'fill', 1, 0.25);
      s.sfx(O + 8.55, 'arrive', { note: 'E5', pan: pan([790, 1180]) });
      // saved challenge is copied out; the record keeps it
      s.pulse(O + 9.6, 'card');
      s.packet({ kind: 'chip', size: 38, label: 'challenge A', color: CH, t: O + 9.6, dur: 0.7, route: [[290, 1036], [290, 1180]] });
      s.set(O + 10.2, 'slotS', 'key', 'challenge A', 0); s.set(O + 10.2, 'slotS', 'fill', 1, 0.25);
      s.sfx(O + 10.3, 'arrive', { note: 'E5', pan: pan([290, 1180]) });
      // compare
      s.set(O + 11.0, 'slotS', 'hi', 1, 0.3); s.set(O + 11.0, 'slotC', 'hi', 1, 0.3);
      s.set(O + 11.7, 'slotS', 'hi', 0, 0.4); s.set(O + 11.7, 'slotC', 'hi', 0, 0.4);
      s.set(O + 11.7, 'glyph', 'text', match ? '=' : '≠', 0);
      s.set(O + 11.7, 'glyph', 'color', match ? T.ok : T.bad, 0);
      s.set(O + 11.7, 'glyph', 'scale', 0.3, 0); s.set(O + 11.7, 'glyph', 'scale', 1, 0.35, 'back');
      s.set(O + 11.7, 'glyph', 'alpha', 1, 0.12);
    }

    // ---------- case 1: original verifier ----------
    exchange(0, 'verifier A', 'challenge A', true);
    s.ripple(11.75, [540, 1176], T.ok, { r1: 120 });
    s.sfx(11.7, 'hit', { note: 'E5', gain: 1.1 });
    s.set(12.5, 'rPkce', 'done', 1, 0.35); s.set(12.5, 'rPkce', 'color', T.ok, 0.25);
    s.sfx(12.5, 'ack', { note: 'E5', gain: 1.6 });
    // tokens are still absent: the other checks have not run
    s.set(13.7, 'tok', 'dashColor', T.fg, 0.15); s.set(14.1, 'tok', 'dashColor', T.dim, 0.4);
    s.set(13.7, 'hOther', 'color', T.fg, 0.15); s.set(14.1, 'hOther', 'color', T.mid, 0.4);
    s.sfx(13.7, 'clock', { note: 'E6', gain: 1.4 });
    // the other OAuth checks complete separately
    s.set(15.0, 'hOther', 'color', T.fg, 0.3);
    const ackNotes = ['G#5', 'B5', 'E6'];
    ROWS.forEach((r, i) => {
      const t0 = 15.0 + i * 0.75;
      s.set(t0, 'r' + i, 'color', T.fg, 0.2); s.set(t0, 'r' + i, 'busy', 1, 0.15);
      s.set(t0 + 0.55, 'r' + i, 'busy', 0, 0.1); s.set(t0 + 0.55, 'r' + i, 'done', 1, 0.3); s.set(t0 + 0.55, 'r' + i, 'color', T.ok, 0.2);
      s.sfx(t0 + 0.55, 'ack', { note: ackNotes[i], gain: 1.6 });
    });
    // only now may tokens be issued
    s.set(17.6, 'tok', 'key', 'tokens issued', 0); s.set(17.6, 'tok', 'fill', 1, 0.35);
    s.ripple(17.7, [540, 1738], T.ok, { r1: 150 });
    s.sfx(17.6, 'chime', { note: 'E5', gain: 1.0 });
    s.packet({ kind: 'dot', color: T.ok, t: 18.3, dur: 1.0, route: [[975, 1738], [1040, 1738], [1040, 605], [985, 605]] });
    s.set(19.2, 'cResp', 'key', 'tokens', 0); s.set(19.2, 'cResp', 'keyColor', T.ok, 0); s.set(19.2, 'cResp', 'color', T.ok, 0);
    s.set(19.2, 'cResp', 'fill', 1, 0.3);
    s.ripple(19.3, [985, 605], T.ok, { r1: 80 });
    s.sfx(19.3, 'deliver', { note: 'C5', gain: 1.0 });

    // ---------- separate alternative transaction ----------
    s.fade(21.8, 1, 0.6);
    s.set(21.8, 'sub', 'alpha', 0, 0.5);
    s.set(22.4, 'sub', 'text', 'ALTERNATIVE · VERIFIER B INSTEAD', 0);
    s.set(22.5, 'sub', 'alpha', 1, 0.5); s.set(22.5, 'sub', 'color', T.fg, 0.01);
    const R = 22.45;
    s.set(R, 'cVer', 'key', 'verifier B', 0);
    s.set(R, 'cResp', 'fill', 0, 0); s.set(R, 'cResp', 'key', '', 0);
    for (const id of ['slotS', 'slotC']) { s.set(R, id, 'fill', 0, 0); s.set(R, id, 'color', CH, 0); }
    s.set(R, 'glyph', 'alpha', 0, 0);
    s.set(R, 'rPkce', 'done', 0, 0); s.set(R, 'rPkce', 'color', T.dim, 0);
    ROWS.forEach((r, i) => { s.set(R, 'r' + i, 'done', 0, 0); s.set(R, 'r' + i, 'color', T.dim, 0); });
    s.set(R, 'hOther', 'color', T.mid, 0);
    s.set(R, 'tok', 'fill', 0, 0); s.set(R, 'tok', 'key', '', 0);
    s.fade(22.8, 0, 0.6);

    const O = 22.6;
    exchange(O, 'verifier B', 'challenge B', false);
    // mismatch
    s.set(O + 11.7, 'slotC', 'color', T.bad, 0.15);
    s.shake(O + 11.7, 'slotS', 12, 0.45); s.shake(O + 11.7, 'slotC', 12, 0.45);
    s.ripple(O + 11.75, [540, 1176], T.bad, { r1: 130 });
    s.sfx(O + 11.7, 'miss', { note: 'E4', gain: 1.9 });
    s.sfx(O + 11.7, 'thump', { note: 'E3', gain: 0.9 });
    s.set(O + 12.5, 'rPkce', 'fail', 1, 0.35); s.set(O + 12.5, 'rPkce', 'color', T.bad, 0.2);
    s.shake(O + 12.5, 'rPkce', 8, 0.4);
    s.sfx(O + 12.5, 'thump', { note: 'E3', gain: 0.8 });
    // nothing further runs; no tokens
    s.set(O + 13.3, 'hOther', 'alpha', 0.5, 0.4);
    ROWS.forEach((r, i) => s.set(O + 13.3, 'r' + i, 'alpha', 0.5, 0.4));
    s.set(O + 13.3, 'tok', 'placeholder', 'no tokens', 0); s.set(O + 13.3, 'tok', 'phColor', T.bad, 0.2); s.set(O + 13.3, 'tok', 'dashColor', T.bad, 0.2);
    s.sfx(O + 13.3, 'poof', { note: 'E4', gain: 0.5 });
    s.packet({ kind: 'dot', color: T.bad, t: O + 13.9, dur: 1.0, route: [[975, 1360], [1040, 1360], [1040, 605], [985, 605]] });
    s.set(O + 14.8, 'cResp', 'key', 'invalid_grant', 0); s.set(O + 14.8, 'cResp', 'keyColor', T.bad, 0); s.set(O + 14.8, 'cResp', 'color', T.bad, 0);
    s.set(O + 14.8, 'cResp', 'fill', 1, 0.3);
    s.ripple(O + 14.9, [985, 605], T.bad, { r1: 80 });
    s.sfx(O + 14.9, 'deliver', { note: 'C4', gain: 1.1 });
    // hold the failed state, then a finite fade
    s.fade(40.0, 1, 0.8);
    s.set(40.0, 'sub', 'alpha', 0, 0.8);
  },
});
