/* Lesson 04 — Back off before retrying (motion-v2 cut 04).
 * Three retry-eligible status reads share one failure. Exactly two real attempts per caller:
 * A1/B1/C1 together, then jittered retries A2/B2/C2. A static, labelled hypothetical shows the
 * immediate-retry burst without sending anything. The service stays unavailable; the limit ends it.
 * Generic node types (chip, counter, interval, token, vline, frame) are registered here.
 */
(function () {
  const F = FlowVideo, T = F.THEME, U = F.util;

  F.NODES.chip = function (ctx, n, p) {
    const s = p('text', ''), c = p('color', T.mid), fs = n.size || 36;
    if (!s) return;
    ctx.font = '700 ' + fs + 'px ' + (n.mono === false ? T.font : T.mono);
    const w = ctx.measureText(s).width + fs * 1.3, h = fs * 1.75;
    ctx.strokeStyle = c; ctx.lineWidth = 4; ctx.fillStyle = T.bg; U.glow(ctx, c, 16 * p('glow', 0));
    U.rr(ctx, n.x - w / 2, n.y - h / 2, w, h, h / 2); ctx.fill(); ctx.stroke(); U.noGlow(ctx);
    U.text(ctx, s, n.x, n.y + 2, { size: fs, weight: 700, font: n.mono === false ? T.font : T.mono, color: p('textColor', c) });
  };
  // Panel with a title, k attempt cells and a caption.
  F.NODES.counter = function (ctx, n, p) {
    const w = n.w, h = n.h, x = n.x - w / 2, y = n.y - h / 2, k = n.cells || 2;
    const c = p('color', T.mid);
    ctx.strokeStyle = c; ctx.lineWidth = 5; ctx.fillStyle = T.bg; U.glow(ctx, c, 22 * p('glow', 0));
    U.rr(ctx, x, y, w, h, 22); ctx.fill(); ctx.stroke(); U.noGlow(ctx);
    U.text(ctx, p('title', n.title || ''), n.x - 62, n.y - 34, { size: 56, weight: 800, color: p('titleColor', T.fg) });
    const cs = 42, gap = 16, cx0 = n.x + 6;
    for (let i = 0; i < k; i++) {
      const cx = cx0 + i * (cs + gap), cy = n.y - 34 - cs / 2;
      const f = p('cell' + i, 0), cc = n.accent || T.fg;
      ctx.lineWidth = 4; ctx.strokeStyle = f > 0.5 ? cc : T.mid; U.rr(ctx, cx, cy, cs, cs, 8); ctx.stroke();
      if (f > 0.01) {
        ctx.globalAlpha *= f * p('cellAlpha', 1); ctx.fillStyle = cc;
        U.rr(ctx, cx + 7, cy + 7, cs - 14, cs - 14, 4); ctx.fill(); ctx.globalAlpha /= f * p('cellAlpha', 1);
      }
    }
    U.text(ctx, p('caption', ''), n.x, n.y + 44, { size: 40, weight: 700, font: T.mono, color: p('captionColor', T.fg) });
  };
  // Horizontal interval starting at node.x (left edge): length, progress fill and a value inside.
  F.NODES.interval = function (ctx, n, p) {
    const len = p('len', 0), h = n.h || 46, x = n.x, y = n.y - h / 2;
    if (len < 4) return;
    const c = p('color', T.accent), f = U.clamp(p('fill', 0));
    if (f > 0.002) {
      ctx.save(); ctx.globalAlpha *= 0.42; ctx.fillStyle = c;
      U.rr(ctx, x, y, Math.max(h * 0.5, len * f), h, 10); ctx.fill(); ctx.restore();
    }
    ctx.strokeStyle = c; ctx.lineWidth = 5; U.rr(ctx, x, y, len, h, 10); ctx.stroke();
    const s = p('text', '');
    if (s) U.text(ctx, s, x + len / 2, n.y + 2, { size: 38, weight: 700, font: T.mono, color: p('textColor', T.fg) });
  };
  // Circular letter mark; hollow = 1 draws a dashed outline only (a mark that did not happen).
  F.NODES.token = function (ctx, n, p) {
    const r = n.r || 30, c = p('color', T.fg), hollow = n.hollow;
    ctx.lineWidth = 5; ctx.strokeStyle = c; U.glow(ctx, c, 18 * p('glow', 0));
    if (hollow) ctx.setLineDash([9, 8]);
    ctx.beginPath(); ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
    if (!hollow) { ctx.fillStyle = c; ctx.globalAlpha *= 0.28; ctx.fill(); ctx.globalAlpha /= 0.28; }
    ctx.stroke(); ctx.setLineDash([]); U.noGlow(ctx);
    U.text(ctx, p('text', n.text || ''), n.x, n.y + 2, { size: 36, weight: 800, color: hollow ? c : T.fg });
  };
  // Vertical line at animated px between y1 and y2.
  F.NODES.vline = function (ctx, n, p) {
    const x = p('px', n.x);
    ctx.strokeStyle = p('color', T.fg); ctx.lineWidth = 4; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(x, n.y1); ctx.lineTo(x, n.y2); ctx.stroke();
  };
  // Dashed outline with an optional tag above it.
  F.NODES.frame = function (ctx, n, p) {
    const c = p('color', T.mid);
    ctx.strokeStyle = c; ctx.lineWidth = 4; ctx.setLineDash([12, 10]);
    U.rr(ctx, n.x - n.w / 2, n.y - n.h / 2, n.w, n.h, 16); ctx.stroke(); ctx.setLineDash([]);
    const tag = p('tag', n.tag || '');
    if (tag) U.text(ctx, tag, n.x, n.y - n.h / 2 - 34, { size: 40, weight: 700, color: p('tagColor', c) });
  };

  const ID = ['A', 'B', 'C'];
  const COL = { A: '#3CCFE6', B: '#C78CFF', C: '#6F9BFF' };
  const NOTE = { A: 'C', B: 'E', C: 'G' };
  const MUTED_BAD = '#8A3A3F';
  const PX = [200, 540, 880], PY = 640;            // caller panels
  const AX = [400, 540, 680], AY = 899, BUS = 815;  // service inputs
  const RY = [1385, 1475, 1565];                    // trace rows
  const X_FIRST = 200, XS = 270, PPS = 170, TRANSIT = 51; // trace geometry (px per illustrative second)
  const DRAW = { A: 1.0, B: 2.1, C: 3.0 };          // one illustrative jitter draw, in seconds
  const EQUAL = 1.5;                                // equal backoff shown before jitter
  const SEC = 2.0;                                  // playback seconds per illustrative second while waiting
  const T_WAIT = 15.4;                              // waiting starts (model clock resumes)

  F.scene({
    meta: { title: '', duration: 35.6, fps: 30, speed: 1 },
    build(s) {
      const ledger = [];                            // real dispatches only
      const route = (i) => [[PX[i], PY + 91], [PX[i], BUS], [AX[i], BUS], [AX[i], AY]];
      const pan = (i) => s.panOf([PX[i], PY]);

      s.sound('fail', { base: 'D3', gain: 0.62, layers: [
        { type: 'noise', lp: 2600, lpTo: 260, attack: 0.002, decay: 0.32, gain: 0.32 },
        { type: 'tone', wave: 'sine', ratio: 1, glideTo: 0.7, glide: 0.35, attack: 0.003, decay: 0.55, gain: 0.7, harmonics: [1, 0.3, 0.1] },
        { type: 'tone', wave: 'sine', freq: 58, glideTo: 36, glide: 0.4, attack: 0.003, decay: 0.5, gain: 0.8 }] });
      s.sound('reject', { base: 'C5', gain: 0.32, layers: [
        { type: 'tone', wave: 'sine', ratio: 1, glideTo: 0.74, glide: 0.18, attack: 0.003, decay: 0.24, harmonics: [1, 0.25] }] });
      s.sound('ghost', { base: 'C5', gain: 0.12, layers: [
        { type: 'tone', wave: 'sine', ratio: 1, attack: 0.03, decay: 0.3, harmonics: [1] }] });
      s.sound('wait', { base: 'C4', gain: 0.3, layers: [
        { type: 'tone', wave: 'sine', ratio: 1, attack: 0.02, decay: 0.35, harmonics: [1, 0.2] }] });
      s.sound('cap', { base: 'C4', gain: 0.34, layers: [
        { type: 'tone', wave: 'sine', ratio: 1, attack: 0.003, decay: 0.16, harmonics: [1, 0.3] },
        { type: 'tone', wave: 'sine', ratio: 0.75, delay: 0.12, attack: 0.003, decay: 0.3, harmonics: [1, 0.2] }] });
      s.sound('low', { base: 'D3', gain: 0.17, layers: [
        { type: 'tone', wave: 'sine', ratio: 1, attack: 0.04, decay: 0.5, harmonics: [1, 0.5, 0.2] }] });

      // ---- stage ----
      s.node('t1', 'label', { x: 540, y: 250, text: 'Back off', size: 84, weight: 800, color: T.title });
      s.node('t2', 'label', { x: 540, y: 340, text: 'before retrying', size: 84, weight: 800, color: T.title });
      s.node('elig', 'chip', { x: 300, y: 480, text: 'Read · retry eligible', size: 38, color: T.mid, textColor: T.fg });
      s.node('limit', 'chip', { x: 805, y: 480, text: 'Max 2 attempts', size: 38, color: T.mid, textColor: T.fg });
      ID.forEach((id, i) => {
        s.wire('w' + id, [PX[i], PY + 91], [AX[i], AY], { via: [[PX[i], BUS], [AX[i], BUS]] });
        s.node(id, 'counter', { x: PX[i], y: PY, w: 272, h: 170, half: [136, 85], title: id, titleColor: COL[id], accent: COL[id], caption: '0/2', color: T.mid });
      });
      s.node('svc', 'box', { x: 540, y: 990, w: 460, h: 170, label: '' });
      s.node('svcName', 'label', { x: 540, y: 960, text: 'CI service', size: 44, weight: 700, color: T.fg });
      s.node('svcState', 'label', { x: 540, y: 1022, text: 'OK', size: 40, weight: 700, color: T.ok, mono: true });
      s.node('head', 'label', { x: 540, y: 1150, text: '', size: 48, weight: 700, color: T.fg, alpha: 0 });
      s.node('traceName', 'label', { x: 540, y: 1225, text: 'Service arrivals', size: 40, weight: 600, color: T.mid });
      s.node('trace', 'box', { x: 540, y: 1495, w: 920, h: 460, label: '', color: T.dim });
      ID.forEach((id, i) => {
        s.wire('row' + id, [175, RY[i]], [965, RY[i]], { color: T.dim });
        s.node('rl' + id, 'label', { x: 125, y: RY[i], text: id, size: 44, weight: 800, color: COL[id] });
      });
      s.wire('axis', [160, 1640], [965, 1640], { color: T.mid });
      s.node('timeLbl', 'label', { x: 885, y: 1685, text: 'time →', size: 40, weight: 600, color: T.mid });

      // hypothetical preview (never counted, never sent)
      s.node('hypFrame', 'frame', { x: XS + TRANSIT, y: 1475, w: 96, h: 276, tag: 'Second burst', color: T.mid, tagColor: T.fg, alpha: 0 });
      ID.forEach((id, i) => s.node('h' + id, 'token', { x: XS + TRANSIT, y: RY[i], text: id, color: COL[id], hollow: true, alpha: 0 }));
      s.node('now', 'vline', { x: XS, y1: 1340, y2: 1612, color: T.fg, alpha: 0 });
      // backoff intervals
      ID.forEach((id, i) => s.node('wait' + id, 'interval', { x: XS, y: RY[i], len: 0, text: '' }));
      s.node('eqFrame', 'frame', { x: XS + EQUAL * PPS, y: 1475, w: 84, h: 276, tag: 'Still aligned', color: T.accent, tagColor: T.fg, alpha: 0 });
      s.node('caveat', 'label', { x: 540, y: 1305, text: 'Example draws · can match', size: 38, weight: 600, color: T.mid, alpha: 0 });
      // real arrival marks
      ID.forEach((id, i) => {
        s.node('f' + id, 'token', { x: X_FIRST, y: RY[i], text: id, color: COL[id], alpha: 0 });
        s.node('r' + id, 'token', { x: XS + DRAW[id] * PPS + TRANSIT, y: RY[i], text: id, color: COL[id], alpha: 0 });
      });

      s.set(0, 'stage', 'veil', 1, 0); s.set(0.02, 'stage', 'veil', 0, 0.45);

      const heading = (t, str, color) => {
        s.set(t - 0.22, 'head', 'alpha', 0, 0.2);
        s.set(t, 'head', 'text', str, 0);
        if (color) s.set(t, 'head', 'color', color, 0);
        s.set(t, 'head', 'alpha', 1, 0.3);
      };
      const drop = (t, id) => { s.set(t, id, 'alpha', 1, 0.12); s.set(t, id, 'scale', 0.4, 0); s.set(t, id, 'scale', 1, 0.35, 'back'); };

      // One real attempt: dispatch, arrival, unavailable response back to the caller.
      function attempt(t, i, k, markId, quiet) {
        const id = ID[i];
        ledger.push({ caller: id, attempt: k + 1, dispatch: +t.toFixed(2) });
        s.set(t, id, 'cell' + k, 1, 0.18); s.set(t, id, 'caption', (k + 1) + '/2', 0);
        s.pulse(t, id, T.fg, 0.2);
        s.packet({ route: route(i), t, dur: 0.6, kind: 'envelope', color: COL[id] });
        s.sfx(t, 'send', { note: NOTE[id] + '6', gain: quiet ? 0.8 : 1.1, pan: pan(i) });
        const ta = t + 0.6;
        s.ripple(ta, [AX[i], AY], COL[id], { r1: 60, dur: 0.5 });
        drop(ta, markId); s.ripple(ta, markId, COL[id], { r1: 62, dur: 0.5 });
        s.sfx(ta, 'arrive', { note: NOTE[id] + '5', gain: quiet ? 0.42 : 0.7, pan: pan(i) });
        return ta;
      }
      function reply(t, i, gain) {
        const id = ID[i];
        s.packet({ route: route(i).slice().reverse(), t, dur: 0.6, kind: 'chip', label: '503', size: 34, color: T.bad });
        const tb = t + 0.6;
        s.set(tb, id, 'color', T.bad, 0.1); s.set(tb + 0.5, id, 'color', MUTED_BAD, 0.4);
        s.ripple(tb, id + '.bottom', T.bad, { r1: 38, dur: 0.55, mark: 'x' });
        s.sfx(tb, 'reject', { note: NOTE[id] + '5', gain: gain || 1, pan: pan(i) });
      }

      // ---- Beat 1: shared failure (0–5.5) ----
      ID.forEach((_, i) => attempt(1.4, i, 0, 'f' + ID[i], true));
      s.pulse(2.0, 'svc');
      s.set(2.5, 'svc', 'color', T.bad, 0.1); s.set(2.5, 'svcState', 'text', 'Unavailable', 0); s.set(2.5, 'svcState', 'color', T.bad, 0);
      ['svc', 'svcName', 'svcState'].forEach((n) => s.shake(2.5, n, 10, 0.4));
      s.ripple(2.5, 'svc', T.bad, { r0: 60, r1: 300, dur: 0.8 });
      s.sfx(2.5, 'fail', { pan: 0 });
      ID.forEach((_, i) => reply(2.9, i, 0.5));

      // ---- Beat 2: hypothetical immediate retries (5.5–8.9) ----
      heading(5.5, 'Hypothetical: retry at once', T.mid);
      s.set(5.9, 'hypFrame', 'alpha', 1, 0.3);
      ID.forEach((id, i) => { s.set(5.9, 'h' + id, 'alpha', 0.9, 0.2); s.set(5.9, 'h' + id, 'scale', 0.5, 0); s.set(5.9, 'h' + id, 'scale', 1, 0.35, 'back');
        s.sfx(5.9, 'ghost', { note: NOTE[id] + '5', pan: -0.4 }); });
      ['hypFrame', 'hA', 'hB', 'hC', 'head'].forEach((n) => s.set(8.4, n, 'alpha', 0, 0.5));
      s.sfx(8.4, 'poof', { gain: 0.22, pan: -0.4 });

      // ---- Beat 3: backoff, then jitter (9.2–15.4); model time paused ----
      heading(9.2, 'Backoff: wait, then retry', T.fg);
      ID.forEach((id) => { s.set(9.6, 'wait' + id, 'len', EQUAL * PPS, 0.6, 'out'); s.set(9.95, 'wait' + id, 'text', '1.5 s', 0); });
      s.sfx(9.6, 'wait', { pan: -0.3 });
      s.set(10.6, 'eqFrame', 'alpha', 1, 0.3);
      ID.forEach((id) => s.sfx(10.6, 'ghost', { note: NOTE[id] + '4', gain: 1.1, pan: -0.1 }));
      s.set(11.9, 'eqFrame', 'alpha', 0, 0.35);
      heading(12.2, 'Jitter: random wait per caller', T.fg);
      ID.forEach((id, i) => {
        const t = 12.7 + i * 0.4;
        s.set(t, 'wait' + id, 'len', DRAW[id] * PPS, 0.35, 'out');
        s.set(t + 0.1, 'wait' + id, 'text', DRAW[id].toFixed(1) + ' s', 0);
        s.sfx(t + 0.3, 'ack', { note: NOTE[id] + '5', gain: 1.2, pan: s.panOf([XS + DRAW[id] * PPS, 0]) });
      });
      s.set(14.3, 'caveat', 'alpha', 1, 0.3);
      s.sfx(14.3, 'store', { note: 'G5', gain: 0.28, pan: 0 });

      // ---- Beat 4: real waits and retries (15.4–22.8) ----
      const lastArrive = XS + DRAW.C * PPS + TRANSIT;
      s.set(T_WAIT, 'now', 'alpha', 1, 0.2);
      const runFor = (lastArrive - XS) / PPS * SEC;
      s.set(T_WAIT, 'now', 'px', lastArrive, runFor, 'linear');
      s.sfx(T_WAIT, 'wait', { note: 'C4', pan: -0.3 });
      const busy = [];
      ID.forEach((id, i) => {
        const rel = T_WAIT + DRAW[id] * SEC;
        s.set(T_WAIT, 'wait' + id, 'fill', 1, DRAW[id] * SEC, 'linear');
        s.set(rel, 'wait' + id, 'color', T.mid, 0.4);
        s.set(T_WAIT, id, 'color', MUTED_BAD, 0);
        const ta = attempt(rel, i, 1, 'r' + id, false);
        s.sfx(ta + 0.2, 'thump', { note: 'D3', gain: 0.3, pan: 0 });
        s.shake(ta + 0.2, 'svc', 5, 0.3); s.shake(ta + 0.2, 'svcName', 5, 0.3); s.shake(ta + 0.2, 'svcState', 5, 0.3);
        reply(ta + 0.2, i);
        busy.push(rel, ta, ta + 0.2, ta + 0.8);
      });
      s.set(T_WAIT + runFor + 0.3, 'now', 'alpha', 0, 0.4);
      for (let t = T_WAIT + 0.5; t < T_WAIT + runFor; t += 0.5) if (busy.every((b) => Math.abs(b - t) > 0.22)) s.sfx(t, 'clock', { gain: 0.7, pan: -0.2 });

      // ---- Beat 5: spread arrivals, still unavailable (24.4–30.2) ----
      heading(24.4, 'Arrivals spread out', T.fg);
      const pop = (t, id) => { s.set(t, id, 'scale', 1.28, 0.14); s.set(t + 0.14, id, 'scale', 1, 0.3); s.pulse(t, id); };
      ID.forEach((id, i) => { pop(24.9, 'f' + id); s.sfx(24.9, 'arrive', { note: NOTE[id] + '5', gain: 0.32, pan: -0.5 }); });
      const gaps = [0, DRAW.B - DRAW.A, DRAW.C - DRAW.A];
      ID.forEach((id, i) => { const t = 26.0 + gaps[i]; pop(t, 'r' + id); s.sfx(t, 'arrive', { note: NOTE[id] + '5', gain: 0.55, pan: s.panOf('r' + id) }); });
      heading(28.6, 'Service still unavailable', T.bad);
      s.pulse(28.8, 'svc', T.bad); s.ripple(28.8, 'svc', T.bad, { r0: 60, r1: 220, dur: 0.7 });
      s.sfx(28.8, 'low', { pan: 0 });

      // ---- Beat 6: attempt limit ends the operations (30.6–35.6) ----
      heading(30.6, 'Limit reached: stop', T.fg);
      s.set(30.6, 'limit', 'color', T.fg, 0.2); s.set(30.6, 'limit', 'glow', 1, 0.15); s.set(30.8, 'limit', 'glow', 0, 0.6);
      s.ripple(30.6, 'limit', T.fg, { r0: 24, r1: 70, dur: 0.5 });
      s.sfx(30.6, 'ack', { note: 'C6', gain: 0.9, pan: 0.5 });
      ID.forEach((id, i) => {
        const t = 31.2 + i * 0.45;
        s.set(t, id, 'caption', '2/2 stop', 0); s.set(t, id, 'captionColor', T.mid, 0.3);
        s.set(t, id, 'color', T.dim, 0.35); s.set(t, id, 'cellAlpha', 0.45, 0.35); s.set(t, id, 'titleColor', T.mid, 0.35);
        s.pulse(t, id);
        s.sfx(t, 'cap', { note: NOTE[id] + '4', pan: pan(i) });
      });
      s.fade(34.6, 1, 0.8);
      s.ledger = ledger;
      if (typeof globalThis !== 'undefined') globalThis.__ledger = ledger;
    },
  });
})();

