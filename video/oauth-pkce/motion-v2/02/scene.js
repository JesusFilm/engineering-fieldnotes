/* Lesson 02 - Create a verifier (oauth-pkce, motion-v2).
 * One mechanism: each authorization attempt gets a fresh unpredictable verifier kept privately with that attempt;
 * S256 derives BASE64URL(SHA-256(ASCII(verifier))) without padding, and only the challenge leaves the client.
 * Cell patterns, "verifier A" and "challenge A" are abstract placeholders, not real values.
 * Uses cut-local node types from ./engine/flow-engine.js (frame, cells, records, step, pill, arrow; cells/card packets).
 */
FlowVideo.scene({
  meta: { title: 'Create a verifier', subtitle: 'PKCE · S256', subtitleSize: 40, duration: 42.4, fps: 30, speed: 1 },
  build(s) {
    const T = s.THEME;
    const COL = { A: T.info, B: T.accent };
    const PAT = { A: '31020312', B: '02313021' };

    // ---- stage ----
    s.node('client', 'frame', { x: 540, y: 950, w: 940, h: 960, dash: true, label: 'Client', labelX: 175, label2: 'stays in client', label2X: 790, labelSize: 44, color: T.mid });
    s.node('gen', 'frame', { x: 540, y: 625, w: 880, h: 170, label: 'crypto random', labelSize: 40, color: T.dim, labelColor: T.mid });
    s.node('cells', 'cells', { x: 540, y: 632, count: 8, size: 64, gap: 12 });
    // Rows are inset 30 px on the right so a lane (x 953) runs beside them inside the records frame.
    s.node('rec', 'records', { x: 540, y: 877, w: 880, rows: 2, label: 'per-attempt records', labelSize: 40, color: T.dim, labelColor: T.mid, keyW: 250, insetR: 30 });
    s.node('pipe', 'frame', { x: 540, y: 1175, w: 880, h: 210, label: 'S256 · one-way', labelSize: 40, color: T.dim, labelColor: T.mid });
    s.node('ascii', 'step', { x: 230, y: 1182, w: 240, label: 'ASCII' });
    s.node('sha', 'step', { x: 540, y: 1182, w: 240, label: 'SHA-256', subSlot: true, sublabel: 'hash' });
    s.node('b64', 'step', { x: 850, y: 1182, w: 240, label: 'base64url', subSlot: true, sublabel: 'no padding' });
    s.node('ar1', 'arrow', { x: 385, y: 1182, len: 50 });
    s.node('ar2', 'arrow', { x: 695, y: 1182, len: 50 });
    s.node('chal', 'pill', { x: 540, y: 1355, size: 40, text: '' });
    s.node('server', 'step', { x: 540, y: 1725, w: 780, h: 170, label: 'Authorization server', labelSize: 44, subSlot: true, subSize: 38, mono: true });
    s.wire('out', [540, 1402], [540, 1636]);

    const stage = ['client', 'gen', 'cells', 'rec', 'pipe', 'ascii', 'sha', 'b64', 'ar1', 'ar2', 'server'];
    for (const id of stage) { s.set(0, id, 'alpha', 0, 0); s.set(0.1, id, 'alpha', id === 'server' ? 0.4 : 1, 0.8); }
    s.set(0, 'wire:out', 'alpha', 0, 0);
    s.set(0, 'cells', 'outline', T.dim, 0);

    const steps = ['ascii', 'sha', 'b64'];
    const pan = (ref) => s.panOf(ref);
    // Record slots: the top slot sits next to crypto random. Attempt A starts there; when attempt B opens,
    // row A slides down one slot (content unchanged) and B takes the top slot, so no verifier ever crosses another record.
    const SLOT = [837, 943], SLIDE = SLOT[1] - SLOT[0];
    s.set(0, 'rec', 'r1Y', -SLIDE, 0);

    // ---- helpers (each carries its sound) ----
    function openRow(t, i, L, y) {
      s.set(t, 'rec', 'r' + i + 'Key', 'attempt ' + L, 0);
      s.set(t, 'rec', 'r' + i + 'Color', COL[L], 0);
      s.set(t, 'rec', 'r' + i + 'A', 1, 0.35);
      s.ripple(t + 0.1, [240, y], COL[L], { r1: 60 });
      s.sfx(t, 'store', { note: L === 'A' ? 'C5' : 'E5', pan: -0.25 });
    }
    function generate(t0, t1, L) {
      s.set(t0, 'gen', 'color', T.fg, 0.2); s.set(t0, 'gen', 'labelColor', T.fg, 0.2);
      s.set(t0, 'cells', 'color', COL[L], 0); s.set(t0, 'cells', 'outline', T.mid, 0.2);
      s.set(t0, 'cells', 'shown', 0, 0); s.set(t0, 'cells', 'pattern', PAT[L], 0);
      s.set(t0, 'cells', 'flicker', 1, 0.15);
      for (let t = t0, k = 0; t < t1 - 0.05; t += 0.14, k++) s.sfx(t, 'shuffle', { note: [2093, 2349, 1976, 2637, 2217][k % 5], pan: 0 });
      s.set(t1, 'cells', 'flicker', 0, 0); s.set(t1, 'cells', 'shown', 1, 0);
      s.set(t1, 'gen', 'color', COL[L], 0.15);
      s.ripple(t1, 'cells', COL[L], { r0: 40, r1: 180, dur: 0.6 });
      s.sfx(t1, 'arrive', { note: 'A5', gain: 0.5 });
    }
    function storeVerifier(t, i, L, rowY) {
      // Drawn above the nodes for both attempts; the route only crosses the records legend.
      s.packet({ route: ['cells', [624, rowY]], t, dur: 0.8, kind: 'cells', pattern: PAT[L], label: 'verifier ' + L, color: COL[L], fade: 0.05 });
      s.set(t, 'cells', 'shown', 0, 0); s.set(t, 'cells', 'outline', T.dim, 0);
      s.set(t, 'cells', 'alpha', 0, 0); s.set(t + 0.8, 'cells', 'alpha', 1, 0.3); // empty slots stay clear of the lifting chip
      s.set(t, 'gen', 'color', T.dim, 0.4); s.set(t, 'gen', 'labelColor', T.mid, 0.4);
      s.sfx(t, 'send', { note: L === 'A' ? 'C6' : 'E6', gain: 0.9 });
      s.set(t + 0.78, 'rec', 'r' + i + 'Pat', PAT[L], 0); s.set(t + 0.78, 'rec', 'r' + i + 'Val', 'verifier ' + L, 0);
      s.set(t + 0.78, 'rec', 'r' + i + 'Fill', 1, 0.12);
      s.ripple(t + 0.8, [643, rowY], COL[L], { r0: 30, r1: 150, dur: 0.6 });
      s.sfx(t + 0.8, 'store', { note: L === 'A' ? 'C5' : 'E5', gain: 0.55, pan: 0.2 });
    }
    function highlight(t, i, L, dur = 0.9) {
      s.set(t, 'rec', 'r' + i + 'Hi', 1, 0.15); s.set(t + dur, 'rec', 'r' + i + 'Hi', 0, 0.4);
    }
    // Derive the challenge: a copy dot leaves the record (which stays lit) and runs the one-way steps.
    // route: the dot's path from the record to ASCII; travel: its duration.
    function derive(t, i, L, k, route, travel) { // k = per-stage pace (1 = first pass)
      const c = COL[L];
      s.packet({ route, t, dur: travel, kind: 'dot', color: c, ease: 'inOut' });
      highlight(t, i, L, 0.6);
      s.sfx(t, 'send', { note: L === 'A' ? 'C6' : 'E6', gain: 0.9 });
      s.set(t, 'pipe', 'color', T.mid, 0.3); s.set(t, 'pipe', 'labelColor', T.fg, 0.3);
      let u = t + travel;
      // ASCII
      s.set(u, 'ascii', 'color', T.fg, 0.12); s.pulse(u, 'ascii');
      s.sfx(u, 'arrive', { note: 'G4', gain: 0.45, pan: pan('ascii') });
      u += 0.8 * k;
      s.set(u, 'ascii', 'color', c, 0.3); s.set(u, 'ar1', 'color', c, 0.3);
      s.packet({ route: [[352, 1182], [418, 1182]], t: u, dur: 0.4, kind: 'dot', color: c });
      u += 0.45;
      // SHA-256 with work ticks
      s.set(u, 'sha', 'color', T.fg, 0.12); s.set(u, 'sha', 'subA', 1, 0.3);
      const work = 1.2 * k;
      s.set(u, 'sha', 'barColor', c, 0); s.set(u, 'sha', 'bar', 1, work, 'linear');
      for (let w = 0; w < work - 0.05; w += 0.2) s.sfx(u + w, 'work', { note: 'G3', gain: 0.8, pan: 0 });
      u += work;
      s.set(u, 'sha', 'bar', 0, 0.2); s.set(u, 'sha', 'color', c, 0.3); s.set(u, 'ar2', 'color', c, 0.3);
      s.packet({ route: [[662, 1182], [728, 1182]], t: u, dur: 0.4, kind: 'dot', color: c });
      u += 0.45;
      // base64url, then the padding is dropped
      s.set(u, 'b64', 'color', T.fg, 0.12); s.pulse(u, 'b64');
      s.sfx(u, 'arrive', { note: 'B4', gain: 0.45, pan: pan('b64') });
      u += 0.5 * k;
      s.packet({ route: [[905, 1262], [940, 1350]], t: u, dur: 0.9, kind: 'chip', label: '=', size: 40, color: T.mid, fade: 0.3, ease: 'out' });
      s.set(u, 'b64', 'subA', 1, 0.3);
      s.sfx(u, 'poof', { gain: 0.32, pan: pan('b64') });
      u += 0.75 * k;
      s.set(u, 'b64', 'color', c, 0.3);
      s.packet({ route: [[850, 1255], [850, 1355], [712, 1355]], t: u, dur: 0.5, kind: 'dot', color: c });
      u += 0.5;
      s.set(u, 'chal', 'text', 'challenge ' + L, 0); s.set(u, 'chal', 'color', c, 0);
      s.set(u, 'chal', 'alpha', 1, 0); s.set(u, 'chal', 'scale', 0.6, 0); s.set(u, 'chal', 'scale', 1, 0.35, 'back');
      s.ripple(u, 'chal', c, { r0: 60, r1: 240, dur: 0.6 });
      s.sfx(u, 'chime', { note: 'G5', gain: k < 1 ? 0.6 : 0.85 });
      return u;
    }
    // Only the challenge (with method S256) leaves; the record pulses in place.
    // The pill fades out first and the request card starts as it vanishes, so the two never overlap.
    function send(t, i, L) {
      const c = COL[L];
      s.set(t, 'wire:out', 'alpha', 1, 0.25); s.set(t, 'wire:out', 'color', c, 0);
      s.set(t, 'chal', 'alpha', 0, 0.1, 'linear');
      s.packet({ route: [[540, 1372], [540, 1590]], t: t + 0.1, dur: 1.0, kind: 'card', heading: 'authorization request', label: 'challenge ' + L, method: 'S256', color: c, fade: 0.15 });
      s.sfx(t + 0.1, 'send', { note: L === 'A' ? 'C6' : 'E6', gain: 0.9 });
      highlight(t + 0.3, i, L, 0.9);
      const a = t + 1.1;
      s.set(a, 'server', 'alpha', 1, 0.2); s.set(a, 'server', 'color', c, 0.15);
      s.set(a, 'server', 'sublabel', 'challenge ' + L + ' · S256', 0); s.set(a, 'server', 'subColor', c, 0); s.set(a, 'server', 'subA', 1, 0.25);
      s.ripple(a, 'server.top', c, { r0: 20, r1: 150, dur: 0.7 });
      s.sfx(a, 'arrive', { note: 'C4', gain: 1.0, pan: 0 });
      return a;
    }
    function quiet(t) {
      s.set(t, 'server', 'subA', 0, 0.5); s.set(t, 'server', 'alpha', 0.4, 0.6); s.set(t, 'server', 'color', T.mid, 0.6);
      s.set(t, 'wire:out', 'alpha', 0, 0.5);
      for (const id of steps) { s.set(t, id, 'color', T.mid, 0.5); s.set(t, id, 'subA', 0, 0.4); }
      s.set(t, 'ar1', 'color', T.dim, 0.5); s.set(t, 'ar2', 'color', T.dim, 0.5);
      s.set(t, 'pipe', 'color', T.dim, 0.5); s.set(t, 'pipe', 'labelColor', T.mid, 0.5);
    }

    // ---- sounds ----
    s.sound('shuffle', { base: 2093, gain: 0.16, layers: [
      { type: 'noise', hp: 3000, lp: 9000, attack: 0.001, decay: 0.025, gain: 0.55 },
      { type: 'tone', wave: 'sine', ratio: 1, attack: 0.001, decay: 0.035, gain: 0.35 }] });

    // ---- beats ----
    // 1. Attempt A opens a record; crypto random produces a fresh verifier.
    openRow(1.2, 0, 'A', SLOT[0]);
    generate(2.2, 4.4, 'A');
    // 2. The verifier is kept with attempt A, privately inside the client.
    storeVerifier(6.0, 0, 'A', SLOT[0]);
    s.set(7.6, 'client', 'label2A', 1, 0.4); s.pulse(7.6, 'client');
    s.sfx(7.6, 'deliver', { note: 'D4', gain: 0.45 });
    // 3. S256 derives challenge A; the record stays put.
    const cA = derive(9.6, 0, 'A', 1, [[470, SLOT[0] + 37], [470, 1031], [230, 1031], [230, 1110]], 0.9);
    // 4. Only challenge A leaves for the authorization server.
    const aA = send(cA + 2.2, 0, 'A');
    quiet(aA + 2.4);
    // 5. Attempt B: row A moves down a slot intact; a new record for B opens next to crypto random.
    const oB = aA + 3.2;
    s.set(oB, 'rec', 'r0Y', SLIDE, 0.5);
    openRow(oB + 0.35, 1, 'B', SLOT[0]);
    const gB = aA + 4.0;
    generate(gB, gB + 2.0, 'B');
    storeVerifier(gB + 3.4, 1, 'B', SLOT[0]);
    const hB = gB + 3.4 + 0.8;
    highlight(hB + 0.7, 0, 'A', 0.5); s.sfx(hB + 0.7, 'ack', { note: 'C6', gain: 0.8 });
    highlight(hB + 1.3, 1, 'B', 0.5); s.sfx(hB + 1.3, 'ack', { note: 'E6', gain: 0.8 });
    // 6. Same transform for B, quicker; the copy dot takes the lane beside the rows, clear of row A.
    const cB = derive(hB + 2.3, 1, 'B', 0.6, [[905, SLOT[0]], [953, SLOT[0]], [953, 1031], [230, 1031], [230, 1110]], 1.0);
    const aB = send(cB + 1.4, 1, 'B');
    quiet(aB + 1.9);
    // 7. Final: two private verifiers, one per attempt.
    const f = aB + 2.6;
    highlight(f, 0, 'A', 0.7); s.sfx(f, 'ack', { note: 'C6', gain: 0.8 });
    highlight(f + 0.6, 1, 'B', 0.7); s.sfx(f + 0.6, 'ack', { note: 'E6', gain: 0.8 });
    s.fade(f + 3.2, 1, 0.8);
    s.meta.duration = +(f + 4.2).toFixed(2);
    s.meta.beats = { openA: 1.2, genA: 2.2, settleA: 4.4, storeA: 6.8, private: 7.6, deriveA: 9.6, challengeA: cA, sendA: cA + 2.2, arriveA: aA, quietA: aA + 2.4, slideA: oB, openB: oB + 0.35, genB: gB, settleB: gB + 2, storeB: gB + 4.2, deriveB: hB + 2.3, challengeB: cB, sendB: cB + 1.4, arriveB: aB, final: f, fade: f + 3.2 };
  },
});

