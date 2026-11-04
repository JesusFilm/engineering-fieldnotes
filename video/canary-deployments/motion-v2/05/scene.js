// Canary deployments 05 — Abort and verify recovery (motion-v2).
// Mechanism: a failed release check stops expansion; new requests go only to v1;
// the service is called OK only after a fresh observed window. Rerouting leaves the
// in-flight v2 request, stored v2 writes and schema compatibility untouched.
// All values are illustrative. Times are authored at speed 1.
FlowVideo.scene({
  meta: { title: 'Abort + verify', subtitle: 'CANARY · STEP 5', duration: 40.5, fps: 30, speed: 1 },
  build(s) {
    const T = s.THEME;

    /* ---------- sounds (actor pitches: router E5, v1 C5, v2 G4, check card A, data D) ---------- */
    s.sound('fail', { base: 'G4', gain: 0.62, layers: [
      { type: 'noise', lp: 6500, lpTo: 500, attack: 0.002, decay: 0.32, gain: 0.45 },
      { type: 'tone', wave: 'sine', ratio: 1, glideTo: 0.5, glide: 0.45, attack: 0.004, decay: 0.55, gain: 0.7, harmonics: [1, 0.3, 0.1] }] });
    s.sound('latch', { base: 'E5', gain: 0.4, layers: [
      { type: 'noise', lp: 3500, hp: 700, attack: 0.001, decay: 0.03, gain: 0.5 },
      { type: 'tone', wave: 'sine', attack: 0.002, decay: 0.08, gain: 0.5, harmonics: [1, 0.3] },
      { type: 'noise', lp: 3000, hp: 600, delay: 0.1, attack: 0.001, decay: 0.03, gain: 0.45 },
      { type: 'tone', wave: 'sine', ratio: 0.89, delay: 0.1, attack: 0.002, decay: 0.1, gain: 0.45, harmonics: [1, 0.3] }] });
    s.sound('route', { base: 'E6', gain: 0.24, layers: [
      { type: 'tone', wave: 'sine', ratio: 1, glideTo: 0.25, glide: 1.1, attack: 0.03, decay: 1.0, harmonics: [1, 0.2] }] });
    s.sound('query', { base: 'A4', gain: 0.32, echo: { delay: 0.09, feedback: 0.3, repeats: 1 }, layers: [
      { type: 'tone', wave: 'sine', ratio: 1, attack: 0.004, decay: 0.3, harmonics: [1, 0.25] },
      { type: 'tone', wave: 'sine', ratio: 1.1225, delay: 0.2, attack: 0.004, decay: 0.45, harmonics: [1, 0.25] }] });
    s.sound('chime', { base: 'A5', gain: 0.36 });

    /* ---------- stage ---------- */
    s.node('card', 'panel', { x: 540, y: 640, w: 940, h: 310, rows: 3, rowTop: 155, rowGap: 60, progY: 104,
      header: 'Release check', color: T.mid });
    s.node('ladder', 'steps', { x: 650, y: 880, w: 640, h: 22, title: 'v2 share', titleX: 90, share: 0.10,
      ticks: [{ pos: 0.10, label: '10%' }, { pos: 0.25, label: '25%' }, { pos: 0.50, label: '50%' }], strike: [0.19, 0.56] });
    s.node('hold', 'tag', { x: 890, y: 924, size: 40, color: T.accent, text: '', alpha: 0 });
    s.node('laptop', 'laptop', { x: 130, y: 1110 });
    s.node('clients', 'label', { x: 130, y: 1206, text: 'clients', size: 40, weight: 600 });
    s.node('router', 'box', { x: 600, y: 1110, w: 460, h: 150, label: 'Router', labelSize: 44, ports: 2, portSpan: 280 });
    s.node('rstat', 'label', { x: 600, y: 1128, text: '', size: 36, weight: 700, mono: true });
    s.node('v1', 'rack', { x: 300, y: 1360, label: '' });
    s.node('v2', 'rack', { x: 780, y: 1360, label: '' });
    s.node('v1name', 'label', { x: 300, y: 1500, text: 'v1 control', size: 44, weight: 700, color: T.fg });
    s.node('v2name', 'label', { x: 780, y: 1500, text: 'v2 candidate', size: 44, weight: 700, color: T.fg });
    s.node('v2new', 'label', { x: 780, y: 1552, text: '', size: 40, weight: 700, mono: true, alpha: 0 });
    s.node('v2fly', 'label', { x: 780, y: 1600, text: '', size: 40, weight: 700, mono: true, alpha: 0 });
    s.node('db', 'panel', { x: 540, y: 1725, w: 760, h: 170, rows: 2, headerY: 42, headerSize: 44, rowTop: 95, rowGap: 47,
      rowSize: 40, valueSize: 40, pad: 34, header: 'Shared DB', color: T.mid });
    s.node('foot', 'label', { x: 540, y: 1868, text: 'Illustrative values · time compressed', size: 36, weight: 500, color: '#6B7079' });

    s.wire('in', 'laptop.right', 'router.left');
    s.wire('p1', 'router.port0', 'v1.top');
    s.wire('p2', 'router.port1', 'v2.top');
    s.wire('v2db', 'v2.right', 'db.right', { via: [[985, 1360], [985, 1725]] });
    s.wire('v1db', 'v1.left', 'db.left', { via: [[140, 1360], [140, 1725]] });
    s.set(0, 'wire:v2db', 'alpha', 0.55, 0);
    s.set(0, 'wire:v1db', 'alpha', 0, 0);
    s.set(0, 'router', 'port0', T.fg, 0); s.set(0, 'router', 'port1', T.accent, 0);
    s.set(0, 'db', 'row0Alpha', 1, 0); s.set(0, 'db', 'row0Text', 'v2 writes', 0); s.set(0, 'db', 'row0Note', '11', 0);
    s.set(0, 'db', 'row0Color', T.mid, 0); s.set(0, 'db', 'row0NoteColor', T.mid, 0);

    /* ---------- traffic helpers ---------- */
    const via = [420, 1176];
    let v1slot = 0;
    function req(t, ver, o = {}) {
      const dur = o.dur || 1.1, ta = t + dur;
      const v2 = ver === 'v2';
      s.packet({ route: ['laptop.right', 'router.left', via, v2 ? 'router.port1' : 'router.port0', ver + '.top'], t, dur, kind: 'dot', color: v2 ? T.accent : T.fg, ease: 'linear' });
      s.ripple(ta, ver + '.top', v2 ? T.accent : T.fg, { r0: 8, r1: 46, dur: 0.45 });
      s.sfx(ta, 'arrive', { note: v2 ? 'G4' : 'C5', gain: o.gain || (v2 ? 0.75 : 0.42), pan: s.panOf(ver) });
      if (o.hold) return ta;
      const i = v2 ? 2 : (v1slot++ % 3);
      s.slot(ta, ver, i, 'busy'); s.slot(ta + 0.5, ver, i, 'done'); s.slot(ta + 1.0, ver, i, 'idle', 0.3);
      return ta;
    }

    /* ---------- beat 1 (0–7.4): failed release check, expansion stops ---------- */
    [0.0, 0.7, 3.5, 4.3, 6.4].forEach((t) => req(t, 'v1'));
    req(1.25, 'v2');
    s.set(0.4, 'card', 'row0Text', 'v2 export errors', 0); s.set(0.4, 'card', 'row0Note', '40/100', 0);
    s.set(0.4, 'card', 'row0Alpha', 1, 0.3); s.sfx(0.4, 'arrive', { note: 'A5', gain: 0.28 });
    s.set(1.2, 'card', 'row1Text', 'v1 export errors', 0); s.set(1.2, 'card', 'row1Note', '0/900', 0);
    s.set(1.2, 'card', 'row1Alpha', 1, 0.3); s.sfx(1.2, 'arrive', { note: 'A5', gain: 0.28 });
    s.set(1.9, 'card', 'row1Mark', 'check', 0); s.set(1.9, 'card', 'row1NoteColor', T.ok, 0.2); s.sfx(1.9, 'ack', { note: 'A5', gain: 0.9 });
    s.set(2.5, 'card', 'row0Mark', 'x', 0); s.set(2.5, 'card', 'row0NoteColor', T.bad, 0.15); s.set(2.5, 'card', 'row0Color', T.bad, 0.15);
    s.shake(2.5, 'card', 8, 0.35); s.sfx(2.5, 'thump', { note: 'G4', gain: 0.55 });
    s.set(3.1, 'card', 'stamp', 'FAIL', 0); s.set(3.1, 'card', 'stampK', 1, 0.35, 'linear');
    s.set(3.1, 'card', 'color', T.bad, 0.15); s.sfx(3.1, 'fail', {});
    s.set(3.4, 'v2name', 'text', 'v2 failed check', 0); s.set(3.4, 'v2name', 'color', T.bad, 0.2);
    s.ripple(3.4, 'v2', T.bad, { r0: 70, r1: 150, dur: 0.6 });
    // stop expansion: the next-step chevron reaches 25%, then the planned steps are struck
    s.set(4.7, 'ladder', 'nextPos', 0.10, 0); s.set(4.7, 'ladder', 'nextAlpha', 1, 0.2);
    s.set(4.9, 'ladder', 'nextPos', 0.25, 0.45, 'out');
    s.set(5.45, 'ladder', 'nextColor', T.bad, 0.1); s.set(5.45, 'ladder', 'strike', 1, 0.45, 'out');
    s.set(5.45, 'ladder', 'tick1Color', T.dim, 0.3); s.set(5.45, 'ladder', 'tick2Color', T.dim, 0.3);
    s.set(5.45, 'ladder', 'tick0Color', T.accent, 0.3);
    s.set(5.5, 'hold', 'text', 'HOLD', 0); s.set(5.5, 'hold', 'alpha', 1, 0.15); s.set(5.5, 'hold', 'scale', 0.6, 0); s.set(5.5, 'hold', 'scale', 1, 0.3, 'back');
    s.sfx(5.45, 'latch', { pan: 0.4 });
    s.set(6.6, 'ladder', 'nextAlpha', 0, 0.3);
    // stopping expansion is not zero traffic: v2 still gets its 10% share
    req(5.9, 'v2');

    /* ---------- beat 2 (7.4–14.6): new requests go to v1; in-flight v2 work continues ---------- */
    const flyArr = req(7.25, 'v2', { hold: true });     // admitted before the change
    s.set(7.7, 'rstat', 'text', 'target: v2 0%', 0); s.set(7.7, 'rstat', 'color', T.accent, 0);
    s.pulse(7.7, 'router', T.accent); s.sfx(7.7, 'route', { pan: s.panOf('router') });
    s.set(7.9, 'ladder', 'share', 0, 1.2, 'inOut');
    s.set(7.9, 'hold', 'alpha', 0, 0.4);
    s.set(8.6, 'rstat', 'text', 'applying…', 0);
    [8.6, 9.0, 9.4].forEach((t, k) => { s.set(t, 'rstat', 'alpha', 0.45, 0.18); s.set(t + 0.2, 'rstat', 'alpha', 1, 0.18); });
    // in-flight request lands on v2 and keeps working
    s.slot(flyArr, 'v2', 1, 'busy');
    s.set(flyArr, 'v2fly', 'text', 'in flight: 1', 0); s.set(flyArr, 'v2fly', 'color', T.accent, 0); s.set(flyArr, 'v2fly', 'alpha', 1, 0.25);
    [9.1, 10.1, 11.1].forEach((t) => s.sfx(t, 'work', { note: 'G4', gain: 0.55, pan: s.panOf('v2') }));
    // routing observed
    s.set(9.8, 'rstat', 'text', 'observed: new → v1', 0); s.set(9.8, 'rstat', 'color', T.ok, 0);
    s.set(9.8, 'router', 'port1', T.dim, 0.3); s.set(9.8, 'wire:p2', 'alpha', 0.35, 0.4);
    s.sfx(9.8, 'ack', { note: 'E5', gain: 1.1, pan: s.panOf('router') });
    s.set(9.9, 'v2new', 'text', 'new: 0', 0); s.set(9.9, 'v2new', 'color', T.fg, 0); s.set(9.9, 'v2new', 'alpha', 1, 0.3);
    [10.2, 10.9, 11.6].forEach((t) => req(t, 'v1'));
    // in-flight request finishes on v2 and writes
    s.slot(12.2, 'v2', 1, 'done'); s.slot(13.1, 'v2', 1, 'idle', 0.3);
    s.set(12.2, 'v2fly', 'text', '1 finished', 0); s.set(12.2, 'v2fly', 'color', T.mid, 0.2);
    s.packet({ route: ['v2.right', [985, 1360], [985, 1725], 'db.right'], t: 12.2, dur: 0.9, kind: 'dot', color: T.accent });
    s.set(13.1, 'db', 'row0Note', '12', 0); s.set(13.1, 'db', 'row0NoteColor', T.accent, 0.2); s.set(13.1, 'db', 'row0Color', T.fg, 0.2);
    s.ripple(13.1, 'db.right', T.accent, { r0: 10, r1: 60, dur: 0.5 });
    s.sfx(13.1, 'store', { note: 'D5', gain: 0.8, pan: s.panOf('db.right') });
    req(13.6, 'v1');

    /* ---------- beat 3 (14.6–16.6): abort is an assumption, not health ---------- */
    s.set(14.6, 'card', 'row0Alpha', 0, 0.3); s.set(14.6, 'card', 'row1Alpha', 0, 0.3);
    s.set(14.6, 'card', 'stampK', 0, 0.3); s.set(14.6, 'card', 'headerAlpha', 0, 0.25);
    s.set(14.9, 'card', 'header', 'Healthy?', 0); s.set(14.9, 'card', 'headerColor', T.mid, 0);
    s.set(14.9, 'card', 'color', T.mid, 0.2); s.set(14.9, 'card', 'dashed', 1, 0);
    s.set(14.95, 'card', 'headerAlpha', 1, 0.3);
    s.sfx(15.0, 'query', { pan: 0 });
    // reset row content for the fresh window while hidden
    const rowsF = [['Errors', 'need 0'], ['Exports valid', 'need all'], ['Latency (95%)', 'need ≤ 250 ms']];
    rowsF.forEach(([a, b], i) => {
      s.set(15.2, 'card', 'row' + i + 'Text', a, 0); s.set(15.2, 'card', 'row' + i + 'Crit', b, 0);
      s.set(15.2, 'card', 'row' + i + 'Note', '', 0); s.set(15.2, 'card', 'row' + i + 'Mark', 'dash', 0);
      s.set(15.2, 'card', 'row' + i + 'Color', T.fg, 0); s.set(15.2, 'card', 'row' + i + 'NoteColor', T.ok, 0);
    });
    req(15.6, 'v1');

    /* ---------- beat 4 (16.6–28.6): fresh observation window, then evidence ---------- */
    s.set(16.6, 'card', 'headerNote', 'fresh 0/5 min', 0); s.set(16.6, 'card', 'headerNoteColor', T.accent, 0);
    s.set(16.6, 'card', 'headerNoteAlpha', 0, 0); s.set(16.6, 'card', 'headerNoteAlpha', 1, 0.3);
    s.set(16.6, 'card', 'progAlpha', 1, 0.3); s.sfx(16.6, 'work', { note: 'A4', gain: 0.5 });
    [16.9, 17.15, 17.4].forEach((t, i) => s.set(t, 'card', 'row' + i + 'Alpha', 1, 0.25));
    s.set(17.6, 'card', 'prog', 1, 4, 'linear');
    [18.4, 19.2, 20.0, 20.8, 21.6].forEach((t, k) => {
      s.set(t, 'card', 'headerNote', 'fresh ' + (k + 1) + '/5 min', 0);
      s.sfx(t, 'clock', { note: 'A5', gain: 1.4 });
    });
    [17.9, 19.0, 20.1].forEach((t) => req(t, 'v1', { gain: 0.32 }));
    s.set(21.6, 'card', 'progColor', T.ok, 0.3);
    const res = [['0/10,000', 'A5', 22.3], ['1,000/1,000', 'C#6', 23.8], ['180 ms', 'E6', 25.3]];
    res.forEach(([v, note, t], i) => {
      s.set(t, 'card', 'row' + i + 'Note', v, 0); s.set(t, 'card', 'row' + i + 'Mark', 'check', 0);
      s.sfx(t, 'ack', { note, gain: 1.0 });
    });
    req(24.4, 'v1', { gain: 0.3 });
    s.set(26.7, 'card', 'headerAlpha', 0, 0.15);
    s.set(26.85, 'card', 'header', 'Service OK', 0); s.set(26.85, 'card', 'headerColor', T.ok, 0);
    s.set(26.85, 'card', 'headerAlpha', 1, 0.25); s.set(26.85, 'card', 'dashed', 0, 0); s.set(26.85, 'card', 'color', T.ok, 0.25);
    s.set(26.85, 'card', 'headerNote', 'observed 5 min', 0); s.set(26.85, 'card', 'headerNoteColor', T.ok, 0);
    s.pulse(26.85, 'card'); s.ripple(26.85, [255, 536], T.ok, { r0: 20, r1: 140, dur: 0.7 });
    s.sfx(26.85, 'chime', {});

    /* ---------- beat 5 (28.6–36): what rerouting did not change ---------- */
    ['laptop', 'clients', 'router', 'rstat', 'ladder'].forEach((id) => s.set(28.6, id, 'alpha', 0.4, 0.5));
    ['in', 'p1', 'p2'].forEach((w) => s.set(28.6, 'wire:' + w, 'alpha', 0.3, 0.5));
    // in-flight work was not cancelled
    s.set(29.0, 'v2fly', 'color', T.accent, 0.25); s.ripple(29.0, [780, 1600], T.accent, { r0: 20, r1: 100, dur: 0.6 });
    s.sfx(29.0, 'work', { note: 'G4', gain: 0.6, pan: s.panOf('v2') }); s.sfx(29.22, 'work', { note: 'G4', gain: 0.5, pan: s.panOf('v2') });
    // its write and earlier v2 writes remain
    s.set(30.6, 'db', 'color', T.accent, 0.3); s.set(30.6, 'db', 'row0Note', '12 · kept', 0);
    s.set(30.6, 'wire:v2db', 'color', T.accent, 0.3); s.pulse(30.6, 'db');
    s.sfx(30.6, 'arrive', { note: 'D5', gain: 0.55 });
    // v1 reads those rows: compatibility is not established by rerouting
    s.set(32.0, 'wire:v1db', 'alpha', 0.7, 0.3);
    s.packet({ route: ['v1.left', [140, 1360], [140, 1725], 'db.left'], t: 32.2, dur: 1.0, kind: 'dot', color: T.fg });
    s.sfx(32.2, 'send', { note: 'C6', gain: 0.8, pan: s.panOf('v1') });
    s.set(33.2, 'db', 'row1Text', 'v1 ↔ v2 schema', 0); s.set(33.2, 'db', 'row1Note', 'unverified', 0);
    s.set(33.2, 'db', 'row1NoteColor', T.accent, 0); s.set(33.2, 'db', 'row1Mark', '?', 0); s.set(33.2, 'db', 'row1Alpha', 1, 0.25);
    s.ripple(33.2, 'db.left', T.accent, { r0: 10, r1: 60, dur: 0.5 });
    s.sfx(33.2, 'thump', { note: 'D4', gain: 0.38, pan: s.panOf('db.left') });
    // data may need separate repair
    s.set(34.9, 'db', 'row0Note', '12 · repair?', 0); s.set(34.9, 'db', 'row0Mark', '?', 0);
    s.set(34.9, 'db', 'dashed', 1, 0);
    s.sfx(34.9, 'deliver', { note: 'D4', gain: 0.6 });

    /* ---------- beat 6 (36–40.5): hold the split verdict, then finish ---------- */
    [36.3, 37.8].forEach((t) => req(t, 'v1', { gain: 0.28 }));
    s.fade(39.3, 1, 0.9);
  },
});
