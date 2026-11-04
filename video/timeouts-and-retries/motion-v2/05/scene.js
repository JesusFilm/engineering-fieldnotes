/* Lesson 05 — Bound the whole operation (timeouts-and-retries, motion-v2 cut 05).
 * One monotonic policy clock drives every timed element. Exact values assume zero overhead.
 * Playback time is an explanation clock: policy time runs slowed (1 policy s = 1.6 playback s)
 * and the animation pauses, with a visible tag, while instantaneous decisions are explained.
 * Engine: ./engine (cut-local copy). Scene-local generic node type: 'draw' (render callback).
 */
(function () {
  const F = globalThis.FlowVideo;
  const T = F.THEME, U = F.util, clamp = U.clamp;
  F.NODES.draw = (ctx, n, p) => n.render(ctx, n, p);

  /* ---------- the single policy clock ---------- */
  const R = 1.6;                       // playback seconds per policy second while running
  const r6 = (v) => Math.round(v * 1e6) / 1e6;
  const RUN = [{ t0: 6.0, p0: 0, p1: 5 }, { t0: 16.6, p0: 5, p1: 7 }, { t0: 26.0, p0: 7, p1: 12 }]
    .map((g) => Object.assign(g, { t1: r6(g.t0 + (g.p1 - g.p0) * R) }));
  const DEADLINE = 12, TRY_CAP = 5;
  function policyAt(t) {
    for (const g of RUN) { if (t <= g.t0) return g.p0; if (t < g.t1) return r6(g.p0 + (t - g.t0) / R); }
    return RUN[RUN.length - 1].p1;
  }
  const running = (t) => RUN.some((g) => t > g.t0 && t < g.t1);
  const tickAt = (k) => { for (const g of RUN) if (k > g.p0 && k <= g.p1) return r6(g.t0 + (k - g.p0) * R); return null; };
  const remainingAt = (t) => r6(DEADLINE - policyAt(t));
  const shownLeft = (t) => Math.max(0, Math.ceil(remainingAt(t) - 1e-6));

  /* ---------- geometry ---------- */
  const X0 = 120, PXS = 70, xOf = (v) => X0 + PXS * v;   // 12 s → 840 px; deadline at x = 960
  const BAR_Y = 1010, ROW_H = 60, ROWS = { try1: 1150, sleep: 1240, try2: 1330, try3: 1420 };
  const GUIDE_TOP = 1100, GUIDE_BOT = 1460;

  function fitText(ctx, str, x, y, o) {
    let size = o.size;
    ctx.font = (o.weight || 600) + ' ' + size + 'px ' + (o.font || T.font);
    if (o.max) { const w = ctx.measureText(str).width; if (w > o.max) size = Math.floor(size * o.max / w); }
    U.text(ctx, str, x, y, Object.assign({}, o, { size }));
  }

  FlowVideo.scene({
    meta: { title: '', subtitle: '', duration: 43.4, fps: 30, speed: 1 },
    build(s) {
      const txt = (id, x, y, o) => s.node(id, 'draw', Object.assign({ x, y, alpha: 0, render(ctx, n, p) {
        const str = p('text', n.text || ''); if (!str) return;
        fitText(ctx, str, n.x, n.y, { size: n.size || 34, weight: n.weight || 600, color: p('color', n.color || T.mid), align: n.align || 'center', font: n.mono ? T.mono : T.font, spacing: n.spacing || 0, max: n.max });
      } }, o));
      const show = (t, id, dur = 0.4) => s.set(t, id, 'alpha', 1, dur);
      const hide = (t, id, dur = 0.35) => s.set(t, id, 'alpha', 0, dur);
      const say = (t, id, str, color) => { s.set(t, id, 'text', str, 0); if (color) s.set(t, id, 'color', color, 0); };

      /* guide line for "now" (drawn first so rows cover it) */
      s.node('now', 'draw', { x: 540, y: 1280, alpha: 0, render(ctx, n, p) {
        const x = xOf(policyAt(p('_t')));
        ctx.strokeStyle = T.fg; ctx.globalAlpha *= 0.45; ctx.lineWidth = 2; ctx.setLineDash([6, 8]);
        ctx.beginPath(); ctx.moveTo(x, GUIDE_TOP); ctx.lineTo(x, GUIDE_BOT); ctx.stroke(); ctx.setLineDash([]);
      } });

      /* title band */
      txt('title', 540, 300, { text: 'Bound the whole operation', size: 74, weight: 800, color: T.title, alpha: 1, max: 940 });
      txt('subtitle', 540, 372, { text: 'EXAMPLE POLICY · ZERO OVERHEAD', size: 30, weight: 700, spacing: 5, alpha: 1, max: 940 });

      /* animation-state tag: tells the viewer when playback is slowed or paused */
      s.node('tag', 'draw', { x: 540, y: 470, half: [230, 30], alpha: 0, render(ctx, n, p) {
        const run = running(p('_t')), c = run ? T.accent : T.mid, w = 420, h = 58;
        ctx.strokeStyle = c; ctx.lineWidth = 3; U.rr(ctx, n.x - w / 2, n.y - h / 2, w, h, h / 2); ctx.stroke();
        const ix = n.x - w / 2 + 44; ctx.fillStyle = c;
        if (run) { ctx.beginPath(); ctx.moveTo(ix - 9, n.y - 13); ctx.lineTo(ix + 13, n.y); ctx.lineTo(ix - 9, n.y + 13); ctx.closePath(); ctx.fill(); }
        else { ctx.fillRect(ix - 11, n.y - 13, 8, 26); ctx.fillRect(ix + 3, n.y - 13, 8, 26); }
        U.text(ctx, run ? 'animation slowed' : 'animation paused', ix + 34, n.y + 1, { size: 32, weight: 600, color: c, align: 'left' });
      } });

      /* request lane */
      s.node('caller', 'box', { x: 200, y: 620, w: 250, h: 120, label: 'caller', labelSize: 38, alpha: 0 });
      s.node('gate', 'box', { x: 540, y: 620, w: 260, h: 120, label: 'deadline gate', labelSize: 34, alpha: 0 });
      s.node('svc', 'box', { x: 880, y: 620, w: 250, h: 120, label: 'CI status', labelSize: 38, alpha: 0 });
      s.wire('cg', 'caller.right', 'gate.left'); s.wire('gs', 'gate.right', 'svc.left');
      for (const w of ['cg', 'gs']) s.set(0, 'wire:' + w, 'alpha', 0, 0);
      txt('gateText', 540, 742, { size: 32, weight: 700, mono: true });
      txt('svcText', 880, 744, { text: '?', size: 46, weight: 700 });

      /* per-try timer (left) and shared budget readout (right) */
      s.node('ring', 'draw', { x: 175, y: 850, half: [60, 60], alpha: 0, render(ctx, n, p) {
        const e = clamp(policyAt(p('_t')) - p('start', 0), 0, TRY_CAP), r = 56, c = p('color', T.accent);
        ctx.lineWidth = 10; ctx.strokeStyle = T.dim; ctx.beginPath(); ctx.arc(n.x, n.y, r, 0, Math.PI * 2); ctx.stroke();
        if (e > 0.001) { ctx.strokeStyle = c; ctx.lineCap = 'round'; ctx.beginPath(); ctx.arc(n.x, n.y, r, -Math.PI / 2, -Math.PI / 2 + (e / TRY_CAP) * Math.PI * 2); ctx.stroke(); }
        U.text(ctx, Math.floor(e + 1e-6) + 's', n.x, n.y + 2, { size: 36, weight: 700, font: T.mono, color: T.fg });
      } });
      txt('perTry', 262, 826, { text: 'per try', size: 36, weight: 600, align: 'left', color: T.fg });
      txt('perTryCap', 262, 876, { text: 'limit 5s', size: 34, weight: 700, align: 'left', mono: true, color: T.accent });
      txt('header', 1000, 800, { text: 'whole operation', size: 34, weight: 600, align: 'right', max: 600 });
      s.node('readout', 'draw', { x: 860, y: 868, half: [140, 40], alpha: 0, render(ctx, n, p) {
        U.text(ctx, shownLeft(p('_t')) + 's left', 1000, n.y, { size: 76, weight: 800, align: 'right', color: p('color', T.fg) });
      } });

      /* shared budget timeline */
      txt('dlLabel', 960, 952, { text: 'deadline', size: 32, weight: 700 });
      s.node('bar', 'draw', { x: 540, y: BAR_Y, half: [420, 12], alpha: 0, render(ctx, n, p) {
        const P = policyAt(p('_t')), x = X0, w = DEADLINE * PXS, h = 24, y = BAR_Y - h / 2;
        ctx.save(); U.rr(ctx, x, y, w, h, h / 2); ctx.clip();
        for (const [a, b, c] of [[0, 5, T.accent], [5, 7, T.info], [7, 12, T.accent]]) if (P > a) { ctx.fillStyle = c; ctx.fillRect(xOf(a), y, xOf(Math.min(P, b)) - xOf(a), h); }
        ctx.restore();
        ctx.strokeStyle = p('color', T.mid); ctx.lineWidth = 3; U.rr(ctx, x, y, w, h, h / 2); ctx.stroke();
        for (const [v, lab] of [[0, '0'], [5, '5'], [7, '7'], [12, '12s']]) {
          const a = p('tick' + v, 0); if (a <= 0.01) continue;
          ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = v === 12 ? p('color', T.mid) : T.mid; ctx.lineWidth = v === 12 ? 5 : 3;
          ctx.beginPath(); ctx.moveTo(xOf(v), y - 12); ctx.lineTo(xOf(v), y + h + 12); ctx.stroke();
          U.text(ctx, lab, xOf(v), y + h + 40, { size: 34, weight: 700, font: T.mono, color: v === 12 ? p('color', T.mid) : T.mid });
          ctx.restore();
        }
        const ca = p('cursor', 0);
        if (ca > 0.01) { const cx = xOf(P); ctx.save(); ctx.globalAlpha *= ca; ctx.fillStyle = T.fg; ctx.beginPath(); ctx.moveTo(cx - 12, y - 30); ctx.lineTo(cx + 12, y - 30); ctx.lineTo(cx, y - 12); ctx.closePath(); ctx.fill(); ctx.restore(); }
      } });
      s.node('dlLine', 'draw', { x: 960, y: 1280, alpha: 0, render(ctx, n, p) {
        ctx.strokeStyle = p('color', T.mid); ctx.lineWidth = 4; ctx.setLineDash([12, 10]);
        ctx.beginPath(); ctx.moveTo(960, GUIDE_TOP); ctx.lineTo(960, GUIDE_BOT); ctx.stroke(); ctx.setLineDash([]);
      } });

      /* attempt rows aligned to the shared timeline */
      function row(id, a, b, color, textOutside) {
        const y = ROWS[id], x = xOf(a), w = xOf(b) - x;
        s.node(id, 'draw', { x: x + w / 2, y, half: [w / 2, ROW_H / 2], alpha: 0, textOutside, render(ctx, n, p) {
          const f = clamp((policyAt(p('_t')) - a) / (b - a)), oc = p('color', color), yy = y - ROW_H / 2;
          ctx.fillStyle = T.bg; U.rr(ctx, x, yy, w, ROW_H, 14); ctx.fill();
          if (f > 0.001) {
            ctx.save(); U.rr(ctx, x, yy, w, ROW_H, 14); ctx.clip();
            ctx.globalAlpha *= 0.32; ctx.fillStyle = oc; ctx.fillRect(x, yy, w * f, ROW_H); ctx.globalAlpha /= 0.32;
            ctx.fillStyle = oc; ctx.fillRect(x, yy + ROW_H - 8, w * f, 8); ctx.restore();
          }
          ctx.strokeStyle = oc; ctx.lineWidth = 4; if (p('dash', 1) > 0.5) ctx.setLineDash([10, 8]);
          U.rr(ctx, x, yy, w, ROW_H, 14); ctx.stroke(); ctx.setLineDash([]);
          const str = p('text', n.text || ''), out = n.textOutside;
          if (str) U.text(ctx, str, out ? x - 18 : x + w / 2, y - 2, { size: 32, weight: 700, align: out ? 'right' : 'center', color: p('textColor', T.fg) });
        } });
      }
      row('try1', 0, 5, T.accent); row('sleep', 5, 7, T.info, true); row('try2', 7, 12, T.accent);
      s.node('try3', 'draw', { x: 860, y: ROWS.try3, half: [100, 30], alpha: 0, render(ctx, n, p) {
        const c = T.bad, y = ROWS.try3;
        U.text(ctx, 'try 3 refused', 925, y - 2, { size: 32, weight: 700, align: 'right', color: c });
        ctx.strokeStyle = c; ctx.fillStyle = T.bg; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(960, y, 22, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(951, y - 9); ctx.lineTo(969, y + 9); ctx.moveTo(969, y - 9); ctx.lineTo(951, y + 9); ctx.stroke();
      } });

      /* arithmetic chip area and final result */
      txt('chip', 540, 1572, { size: 40, weight: 700, mono: true, color: T.fg, max: 940 });
      txt('chip2', 540, 1636, { size: 32, weight: 600, color: T.mid, max: 940 });
      s.node('result', 'draw', { x: 540, y: 1600, half: [300, 40], alpha: 0, render(ctx, n, p) {
        const str = 'result: unknown'; ctx.font = '800 50px ' + T.mono;
        const w = ctx.measureText(str).width + 64, h = 84, y = 1590;
        ctx.strokeStyle = T.accent; ctx.lineWidth = 4; ctx.fillStyle = T.bg; U.glow(ctx, T.accent, 16);
        U.rr(ctx, 540 - w / 2, y - h / 2, w, h, h / 2); ctx.fill(); ctx.stroke(); U.noGlow(ctx);
        U.text(ctx, str, 540, y + 2, { size: 50, weight: 800, font: T.mono, color: T.accent });
        U.text(ctx, '2 tries, both timed out', 540, y + 92, { size: 36, weight: 600, color: T.fg });
        U.text(ctx, 'remote work may continue', 540, y + 148, { size: 34, weight: 600, color: T.mid });
      } });

      /* ---------- sounds: caller E, gate G, service C, budget D, clock ticks ---------- */
      s.sound('timeout', { base: 'E5', gain: 0.5, echo: { delay: 0.09, feedback: 0.3, repeats: 1 },
        layers: [{ type: 'tone', wave: 'sine', ratio: 1, glideTo: 0.5, glide: 0.28, attack: 0.004, decay: 0.42, harmonics: [1, 0.3, 0.1] }] });
      s.sound('sleeptick', { base: 'A3', gain: 0.4, layers: [{ type: 'tone', wave: 'sine', attack: 0.004, decay: 0.16, harmonics: [1, 0.25] }, { type: 'noise', lp: 1400, hp: 200, decay: 0.03, gain: 0.25 }] });
      s.sound('rearm', { base: 'E5', gain: 0.4, layers: [{ type: 'tone', wave: 'sine', ratio: 1, attack: 0.003, decay: 0.16, harmonics: [1, 0.2] }, { type: 'tone', wave: 'sine', ratio: 1.498, delay: 0.09, attack: 0.003, decay: 0.3, harmonics: [1, 0.2] }] });
      s.sound('deadline', { base: 'D5', gain: 0.62,
        layers: [{ type: 'noise', lp: 7000, lpTo: 300, attack: 0.002, decay: 0.4, gain: 0.45 },
                 { type: 'tone', wave: 'sine', ratio: 1, glideTo: 0.25, glide: 0.5, attack: 0.004, decay: 0.6, gain: 0.45, harmonics: [1, 0.3, 0.1] },
                 { type: 'tone', wave: 'sine', freq: 66, glideTo: 34, glide: 0.45, attack: 0.003, decay: 0.55, gain: 0.85 }] });
      s.sound('unresolved', { base: 'C5', gain: 0.42, echo: { delay: 0.11, feedback: 0.3, repeats: 1 },
        layers: [{ type: 'tone', wave: 'sine', ratio: 1, attack: 0.004, decay: 0.5, harmonics: [1, 0.25, 0.08] },
                 { type: 'tone', wave: 'sine', ratio: 1.4142, delay: 0.14, attack: 0.004, decay: 0.7, harmonics: [1, 0.25, 0.08] }] });
      const L = s.panOf('caller'), G = s.panOf('gate'), S = s.panOf('svc');
      const ledger = { sends: [], gate: [], arrivals: [], ticks: [], checks: [] };
      const check = (t, what) => ledger.checks.push({ t, what, policy: policyAt(t), left: shownLeft(t) });

      /* ---------- 0–4: stage, shared budget, per-try limit ---------- */
      for (const id of ['caller', 'gate', 'svc']) show(0.3, id, 0.5);
      for (const w of ['cg', 'gs']) s.set(0.3, 'wire:' + w, 'alpha', 1, 0.5);
      s.sfx(0.4, 'store', { note: 'C5', gain: 0.45 });
      for (const id of ['header', 'readout', 'bar', 'dlLabel', 'dlLine']) show(1.4, id, 0.5);
      s.set(1.4, 'bar', 'tick0', 1, 0.4); s.set(1.4, 'bar', 'tick12', 1, 0.4);
      say(1.7, 'chip', 'deadline = start + 12s'); show(1.7, 'chip');
      say(1.7, 'chip2', 'measured on a monotonic clock'); show(1.7, 'chip2');
      s.sfx(1.4, 'ack', { note: 'D6', gain: 0.9 }); check(1.4, 'budget set');
      for (const id of ['ring', 'perTry', 'perTryCap']) show(2.9, id, 0.45);
      s.sfx(2.9, 'ack', { note: 'E6', pan: L });

      /* ---------- try 1 admitted at policy 0 ---------- */
      show(4.3, 'tag', 0.35);
      s.packet({ route: ['caller.right', 'gate.left'], t: 4.4, dur: 0.45, kind: 'dot', color: T.fg });
      s.sfx(4.4, 'send', { note: 'E6', pan: L }); ledger.sends.push(4.4);
      say(4.85, 'gateText', '12s left → go', T.ok); show(4.85, 'gateText', 0.25);
      s.pulse(4.85, 'gate', T.ok); s.ripple(4.85, [392, 620], T.ok, { r1: 30 });
      s.sfx(4.85, 'ack', { note: 'G5', pan: G }); ledger.gate.push({ t: 4.85, allow: true }); check(4.85, 'gate allows try 1');
      say(4.85, 'try1', 'try 1 · ≤5s'); show(4.85, 'try1', 0.35);
      hide(5.3, 'chip'); hide(5.3, 'chip2');
      s.packet({ route: ['gate.right', 'svc.left'], t: 5.15, dur: 0.45, kind: 'dot', color: T.fg });
      s.pulse(5.6, 'svc'); s.ripple(5.6, [738, 620], T.fg, { r1: 30 }); s.sfx(5.6, 'arrive', { note: 'C5', pan: S, gain: 0.8 }); ledger.arrivals.push(5.6);
      show(5.6, 'svcText', 0.3);
      hide(6.0, 'gateText', 0.4); s.set(6.0, 'try1', 'dash', 0, 0); s.set(6.0, 'bar', 'cursor', 1, 0.25); show(6.0, 'now', 0.25);
      for (let k = 1; k <= 4; k++) { const tt = tickAt(k); s.sfx(tt, 'clock', { gain: 1.3 }); ledger.ticks.push(tt); }

      /* ---------- policy 5: try 1 times out, 7 s left ---------- */
      const TO1 = RUN[0].t1; check(TO1, 'try 1 timeout');
      s.set(TO1, 'ring', 'color', T.bad, 0); s.set(TO1, 'try1', 'color', T.bad, 0); say(TO1, 'try1', 'try 1 timed out');
      s.set(TO1, 'try1', 'textColor', T.bad, 0);
      s.ripple(TO1, [200, 718], T.bad, { mark: 'x', r1: 44 }); s.shake(TO1, 'caller', 8, 0.4);
      s.sfx(TO1, 'timeout', { pan: L });
      s.set(TO1, 'bar', 'tick5', 1, 0.3); s.set(TO1, 'readout', 'scale', 1.06, 0.12); s.set(TO1 + 0.12, 'readout', 'scale', 1, 0.3);
      say(14.7, 'chip', '12s − 5s = 7s left'); show(14.7, 'chip'); s.sfx(14.7, 'ack', { note: 'D6', gain: 0.9 });

      /* ---------- policy 5→7: backoff sleep consumes the same budget ---------- */
      hide(16.1, 'chip');
      say(16.2, 'sleep', 'sleep 2s'); s.set(16.2, 'sleep', 'textColor', T.info, 0); show(16.2, 'sleep', 0.35);
      s.set(16.2, 'ring', 'alpha', 0.3, 0.4); s.set(16.2, 'bar', 'tick7', 1, 0.3);
      s.sfx(16.2, 'sleeptick', { note: 'A3', gain: 0.8, pan: L });
      s.set(RUN[1].t0, 'sleep', 'dash', 0, 0);
      for (const k of [6, 7]) { const tt = tickAt(k); s.sfx(tt, 'sleeptick', { note: k === 7 ? 'E4' : 'A3', pan: L }); ledger.ticks.push(tt); }
      check(RUN[1].t1, 'sleep ends');
      say(20.3, 'chip', '7s − 2s = 5s left'); show(20.3, 'chip'); s.sfx(20.3, 'ack', { note: 'D6', gain: 0.9 });

      /* ---------- policy 7: gate recomputes, retry capped by what is left ---------- */
      hide(21.45, 'chip', 0.25);
      s.packet({ route: ['caller.right', 'gate.left'], t: 21.4, dur: 0.45, kind: 'dot', color: T.fg });
      s.sfx(21.4, 'send', { note: 'E6', pan: L }); ledger.sends.push(21.4);
      say(21.85, 'gateText', '5s left → go', T.ok); show(21.85, 'gateText', 0.25);
      s.pulse(21.85, 'gate', T.ok); s.ripple(21.85, [392, 620], T.ok, { r1: 30 });
      s.sfx(21.85, 'ack', { note: 'G5', pan: G }); ledger.gate.push({ t: 21.85, allow: true }); check(21.85, 'gate allows try 2');
      say(21.85, 'chip', 'try 2 limit = min(5s, 5s left)'); show(21.85, 'chip', 0.3);
      say(22.7, 'chip2', 'at most 5s, less any overhead'); show(22.7, 'chip2', 0.35); s.sfx(22.7, 'ack', { note: 'D5', gain: 0.8 });
      s.set(23.6, 'ring', 'start', 7, 0); s.set(23.6, 'ring', 'color', T.accent, 0); s.set(23.6, 'ring', 'alpha', 1, 0.2);
      s.set(23.6, 'ring', 'scale', 1.15, 0.12, 'out'); s.set(23.72, 'ring', 'scale', 1, 0.3);
      s.sfx(23.6, 'rearm', { pan: L });
      say(23.6, 'try2', 'try 2 · ≤5s'); show(23.6, 'try2', 0.35);
      say(24.35, 'header', 'whole operation · no reset', T.fg);
      s.set(24.35, 'readout', 'scale', 1.06, 0.12); s.set(24.47, 'readout', 'scale', 1, 0.3);
      s.sfx(24.35, 'ack', { note: 'D6', gain: 0.75 });
      s.packet({ route: ['gate.right', 'svc.left'], t: 25.0, dur: 0.45, kind: 'dot', color: T.fg });
      s.pulse(25.45, 'svc'); s.ripple(25.45, [738, 620], T.fg, { r1: 30 }); s.sfx(25.45, 'arrive', { note: 'C5', pan: S, gain: 0.8 }); ledger.arrivals.push(25.45);
      hide(25.75, 'chip'); hide(25.75, 'chip2');
      hide(RUN[2].t0, 'gateText', 0.4); s.set(RUN[2].t0, 'try2', 'dash', 0, 0);
      for (let k = 8; k <= 11; k++) { const tt = tickAt(k); s.sfx(tt, 'clock', { gain: 1.3 }); ledger.ticks.push(tt); }

      /* ---------- policy 12: try 2 ends exactly at the shared deadline ---------- */
      const DL = RUN[2].t1; check(DL, 'deadline');
      s.set(DL, 'ring', 'color', T.bad, 0); s.set(DL, 'try2', 'color', T.bad, 0); say(DL, 'try2', 'try 2 timed out'); s.set(DL, 'try2', 'textColor', T.bad, 0);
      s.set(DL, 'readout', 'color', T.bad, 0); s.set(DL, 'bar', 'color', T.bad, 0); s.set(DL, 'dlLine', 'color', T.bad, 0); s.set(DL, 'dlLabel', 'color', T.bad, 0);
      s.set(DL, 'bar', 'cursor', 0, 0.3); hide(DL, 'now', 0.3);
      s.ripple(DL, [960, ROWS.try2], T.bad, { r1: 58, dur: 0.8 }); s.shake(DL, 'bar', 10, 0.45); s.set(DL, 'readout', 'scale', 1.08, 0.12); s.set(DL + 0.12, 'readout', 'scale', 1, 0.35);
      s.ripple(DL, [200, 718], T.bad, { mark: 'x', r1: 44 }); s.shake(DL, 'caller', 8, 0.4);
      s.sfx(DL, 'deadline', { pan: 0.4 }); s.sfx(DL + 0.02, 'timeout', { pan: L, gain: 0.7 });

      /* ---------- gate refuses a third try; result unknown ---------- */
      const T3 = DL + 1.8;
      s.packet({ route: ['caller.right', [368, 620]], t: T3, dur: 0.5, kind: 'dot', color: T.mid });
      s.sfx(T3, 'send', { note: 'E6', pan: L, gain: 0.7 });
      const REF = T3 + 0.5; check(REF, 'gate refuses try 3');
      s.set(REF, 'gate', 'color', T.bad, 0.1); s.shake(REF, 'gate', 8, 0.4); s.ripple(REF, [368, 620], T.bad, { mark: 'x', r1: 36 });
      say(REF, 'gateText', '0s left → stop', T.bad); show(REF, 'gateText', 0.25);
      show(REF, 'try3', 0.3); s.sfx(REF, 'thump', { note: 'G3', pan: G }); ledger.gate.push({ t: REF, allow: false });
      const RES = REF + 1.7;
      s.set(RES, 'result', 'alpha', 1, 0.2); s.set(RES, 'result', 'scale', 0.85, 0); s.set(RES, 'result', 'scale', 1, 0.45, 'back');
      hide(RES, 'tag', 0.4); s.sfx(RES, 'unresolved', {});
      s.fade(RES + 4.4, 1, 0.8);
      s.meta.duration = r6(RES + 4.4 + 0.8 + 0.2);
      globalThis.__ledger = Object.assign(ledger, { runs: RUN, R, result: RES, fade: RES + 4.4 });
    },
  });
})();

