/* Lesson 02 — A timeout is not a rollback (motion-v2/02).
 * One CI status read. The caller's attempt timeout ends its wait; in this one
 * illustrated run the remote lookup keeps working and finishes, and the caller,
 * which never received a response, records the status as unknown.
 * Time runs downward in each lane (sequence-diagram convention).
 * Generic node types below are cut-local drawing extensions registered on FlowVideo.NODES.
 */
(function () {
  const F = FlowVideo, T = F.THEME, U = F.util, N = F.NODES;

  // Plain text with alignment, optional mono font and rotation.
  N.text = (ctx, n, p) => {
    const s = p('text', n.text || '');
    if (!s) return;
    U.text(ctx, s, n.x, n.y, { size: n.size || 36, weight: n.weight || 600, color: p('color', T.mid), align: n.align || 'center', font: n.mono ? T.mono : T.font, spacing: n.spacing || 0 });
  };
  // Terminal window icon (title-bar dots and a prompt).
  N.term = (ctx, n, p) => {
    const w = n.w || 200, h = n.h || 136, x = n.x - w / 2, y = n.y - h / 2, c = p('color', T.mid);
    ctx.strokeStyle = c; ctx.lineWidth = 4; ctx.lineJoin = 'round'; U.glow(ctx, c, 18 * p('glow', 0));
    ctx.fillStyle = T.bg; U.rr(ctx, x, y, w, h, 14); ctx.fill(); ctx.stroke(); U.noGlow(ctx);
    ctx.beginPath(); ctx.moveTo(x, y + 34); ctx.lineTo(x + w, y + 34); ctx.stroke();
    ctx.fillStyle = c;
    for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.arc(x + 22 + i * 20, y + 17, 5, 0, Math.PI * 2); ctx.fill(); }
    U.text(ctx, '>_', x + 26, y + 34 + (h - 34) / 2 + 2, { size: 44, weight: 700, font: T.mono, color: c, align: 'left' });
  };
  // Vertical activation bar growing downward from y0: props len (px), color, fill, cap (0..1), capColor.
  N.vbar = (ctx, n, p) => {
    const w = n.w || 34, len = p('len', 0), x = n.x - w / 2, y = n.y0, c = p('color', T.fg);
    if (len < 1) return;
    ctx.globalAlpha *= 1;
    ctx.fillStyle = p('fill', '#15171b'); ctx.strokeStyle = c; ctx.lineWidth = 4; U.glow(ctx, c, 16 * p('glow', 0));
    U.rr(ctx, x, y, w, len, Math.min(8, len / 2)); ctx.fill(); ctx.stroke(); U.noGlow(ctx);
    const cap = p('cap', 0);
    if (cap > 0.01) {
      const cc = p('capColor', T.fg), cw = (w + 34) * (0.6 + 0.4 * cap);
      ctx.save(); ctx.globalAlpha *= cap; ctx.strokeStyle = cc; ctx.lineWidth = 8; ctx.lineCap = 'round'; U.glow(ctx, cc, 14);
      ctx.beginPath(); ctx.moveTo(n.x - cw / 2, y + len); ctx.lineTo(n.x + cw / 2, y + len); ctx.stroke(); ctx.restore();
    }
  };
  // Horizontal limit line: dashed base, then a solid sweep (prop solid 0..1, left to right).
  N.hline = (ctx, n, p) => {
    const x0 = n.x0, x1 = n.x1, y = n.y;
    const base = p('color', T.dim), solid = p('solid', 0);
    ctx.lineCap = 'round';
    ctx.strokeStyle = base; ctx.lineWidth = 5; ctx.setLineDash([16, 12]); U.glow(ctx, base, 14 * p('glow', 0));
    ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x1, y); ctx.stroke(); ctx.setLineDash([]); U.noGlow(ctx);
    if (solid > 0.005) {
      const sc = p('solidColor', T.fg);
      ctx.strokeStyle = sc; ctx.lineWidth = 6; U.glow(ctx, sc, 10);
      ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(U.lerp(x0, x1, solid), y); ctx.stroke(); U.noGlow(ctx);
    }
  };
  // Status field: small heading plus a large value.
  N.field = (ctx, n, p) => {
    const w = n.w || 400, h = n.h || 150, x = n.x - w / 2, y = n.y - h / 2, c = p('color', T.dim);
    ctx.strokeStyle = c; ctx.lineWidth = 4; U.glow(ctx, c, 20 * p('glow', 0));
    ctx.fillStyle = T.bg; U.rr(ctx, x, y, w, h, 18); ctx.fill(); ctx.stroke(); U.noGlow(ctx);
    U.text(ctx, p('label', n.label || ''), n.x, y + 42, { size: 36, weight: 600, color: T.mid });
    const v = p('value', '');
    if (v) {
      const vs = p('valueScale', 1);
      ctx.save(); ctx.translate(n.x, y + 102); ctx.scale(vs, vs);
      U.text(ctx, v, 0, 0, { size: 48, weight: 700, font: T.mono, color: p('valueColor', T.mid) });
      ctx.restore();
    }
  };
  // Dashed code socket: an outline that has nothing plugged in.
  N.socket = (ctx, n, p) => {
    const w = n.w || 400, h = n.h || 146, x = n.x - w / 2, y = n.y - h / 2, c = p('color', T.mid);
    ctx.strokeStyle = c; ctx.lineWidth = 4; ctx.setLineDash([14, 11]);
    U.rr(ctx, x, y, w, h, 18); ctx.stroke(); ctx.setLineDash([]);
    U.text(ctx, n.text, n.x, y + 56, { size: 44, weight: 700, font: T.mono, color: p('textColor', T.fg) });
    U.text(ctx, n.sub, n.x, y + 112, { size: 34, weight: 500, color: T.mid });
  };
  // Vertical time arrow with a label above it.
  N.varrow = (ctx, n, p) => {
    const c = p('color', T.dim);
    ctx.strokeStyle = c; ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    ctx.beginPath(); ctx.moveTo(n.x, n.y0); ctx.lineTo(n.x, n.y1); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(n.x - 13, n.y1 - 16); ctx.lineTo(n.x, n.y1); ctx.lineTo(n.x + 13, n.y1 - 16); ctx.stroke();
    U.text(ctx, 'time', n.x + 8, n.y0 - 32, { size: 34, weight: 600, color: T.mid });
  };

  FlowVideo.scene({
    meta: { title: '', subtitle: '', duration: 34.5, fps: 30, speed: 0.9 },
    build(s) {
      const AX = 290, CX = 750;          // caller and CI lane x
      const Y0 = 790, T0 = 2.8;           // top of activation bars and the caller's wait start
      const TOUT = 11.0, YT = 1100;       // attempt timeout instant and its y
      const K = (YT - Y0) / (TOUT - T0);  // px per authored second (time runs downward)
      const yAt = (t) => Y0 + (t - T0) * K;
      const TSEND = 2.6, TARR = 3.4, TDONE = 20.5;
      const PC = -0.3, PR = 0.3;          // caller pans left, CI pans right
      const ACC = T.accent, OK = T.ok;

      // ---- sounds: caller = E family (left), CI = C family (right) ----
      s.sound('latch', { base: 'E4', gain: 0.85, layers: [
        { type: 'noise', hp: 3000, lp: 9000, attack: 0.001, decay: 0.015, gain: 0.45 },
        { type: 'tone', wave: 'sine', ratio: 1, glideTo: 0.944, glide: 0.12, attack: 0.002, decay: 0.32, gain: 0.7, harmonics: [1, 0.25, 0.08] },
        { type: 'tone', wave: 'sine', ratio: 0.5, attack: 0.002, decay: 0.22, gain: 0.45 } ] });
      s.sound('unresolved', { base: 'E5', gain: 0.42, echo: { delay: 0.08, feedback: 0.3, repeats: 1 }, layers: [
        { type: 'tone', wave: 'sine', ratio: 1, attack: 0.003, decay: 0.3, harmonics: [1, 0.25] },
        { type: 'tone', wave: 'sine', ratio: 1.1225, delay: 0.16, attack: 0.003, decay: 0.5, harmonics: [1, 0.25] } ] });
      s.sound('hollow', { base: 'G3', gain: 0.26, layers: [
        { type: 'noise', lp: 1800, hp: 300, attack: 0.001, decay: 0.02, gain: 0.35 },
        { type: 'tone', wave: 'sine', ratio: 1, attack: 0.002, decay: 0.14, harmonics: [1, 0.5, 0.2], harmDecay: 2 } ] });

      // ---- title band ----
      s.node('t1', 'text', { x: 540, y: 250, text: 'A timeout is', size: 88, weight: 800, color: T.title });
      s.node('t2', 'text', { x: 540, y: 346, text: 'not a rollback', size: 88, weight: 800, color: T.title });

      // ---- actors ----
      s.node('caller', 'term', { x: AX, y: 572, alpha: 0 });
      s.node('callerL', 'text', { x: AX, y: 694, text: 'release agent', size: 40, color: T.mid, alpha: 0 });
      s.node('ci', 'rack', { x: CX, y: 572, alpha: 0 });
      s.node('ciL', 'text', { x: CX, y: 694, text: 'CI service', size: 40, color: T.mid, alpha: 0 });
      s.wire('lifeA', [AX, 740], [AX, 1100], { alpha: 0 });
      s.wire('lifeA2', [AX, 1178], [AX, 1255], { alpha: 0 });
      s.wire('lifeC', [CX, 740], [CX, 1590], { alpha: 0 });
      s.node('time', 'varrow', { x: 52, y0: 820, y1: 1480, alpha: 0 });
      s.node('limit', 'hline', { x0: 130, x1: 470, y: YT, alpha: 0 });
      s.node('limitL', 'text', { x: AX, y: YT + 46, text: 'attempt timeout', size: 40, color: T.mid, alpha: 0 });
      s.node('barA', 'vbar', { x: AX, y0: Y0, color: ACC, fill: '#2a1e08' });
      s.node('barC', 'vbar', { x: CX, y0: yAt(TARR), color: T.fg, fill: '#1b1d22' });
      s.node('field', 'field', { x: AX, y: 1330, label: 'CI #42 status', value: '', alpha: 0 });
      s.node('run1', 'text', { x: CX + 48, y: 1150, text: 'this run:', size: 40, align: 'left', color: T.mid, alpha: 0 });
      s.node('run2', 'text', { x: CX + 48, y: 1200, text: 'still working', size: 40, weight: 700, align: 'left', color: T.fg, alpha: 0 });
      s.node('done', 'text', { x: CX + 48, y: yAt(TDONE) + 4, text: 'lookup done', size: 40, weight: 700, align: 'left', color: OK, alpha: 0 });
      s.node('sockC', 'socket', { x: AX, y: 1712, text: 'cancel()', sub: 'separate code', alpha: 0, scale: 0.9 });
      s.node('sockR', 'socket', { x: CX, y: 1712, text: 'rollback()', sub: 'separate code', alpha: 0, scale: 0.9 });

      // ---- 0–2.4 s: reveal the two actors and the time convention ----
      s.set(0.2, 'caller', 'alpha', 1, 0.6); s.set(0.3, 'callerL', 'alpha', 1, 0.6);
      s.sfx(0.3, 'send', { note: 'E6', gain: 0.6, pan: PC });
      s.set(0.7, 'ci', 'alpha', 1, 0.6); s.set(0.8, 'ciL', 'alpha', 1, 0.6);
      s.sfx(0.8, 'send', { note: 'C6', gain: 0.6, pan: PR });
      for (const w of ['lifeA', 'lifeA2', 'lifeC']) s.set(0, 'wire:' + w, 'alpha', 0, 0);
      s.set(1.2, 'wire:lifeA', 'alpha', 1, 0.6); s.set(1.2, 'wire:lifeA2', 'alpha', 1, 0.6); s.set(1.2, 'wire:lifeC', 'alpha', 1, 0.6);
      s.set(1.5, 'time', 'alpha', 1, 0.6); s.set(1.5, 'limit', 'alpha', 1, 0.6); s.set(1.6, 'limitL', 'alpha', 1, 0.6);
      s.set(1.9, 'field', 'alpha', 1, 0.5);
      s.set(1.9, 'field', 'value', '—', 0);

      // ---- 2.6 s: one request; the caller starts waiting ----
      s.pulse(TSEND, 'caller', T.fg, 0.4);
      s.packet({ route: [[AX, yAt(TSEND)], [CX, yAt(TARR)]], t: TSEND, dur: TARR - TSEND, kind: 'chip', label: 'GET status #42', size: 34, color: T.fg, ease: 'cruise' });
      s.sfx(TSEND, 'send', { note: 'E6', gain: 1.4, pan: PC });
      s.set(TSEND + 0.1, 'field', 'value', 'waiting', 0);
      s.set(TSEND + 0.1, 'field', 'valueColor', ACC, 0.2);
      s.set(TSEND + 0.1, 'field', 'color', ACC, 0.3);
      s.set(T0, 'barA', 'len', YT - Y0, TOUT - T0, 'linear');

      // ---- 3.4 s: the lookup starts at CI ----
      s.ripple(TARR, [CX, yAt(TARR)], T.fg, { r1: 60 });
      s.sfx(TARR, 'arrive', { note: 'C5', gain: 0.7, pan: PR });
      s.slot(TARR, 'ci', 0, 'busy');
      s.set(TARR, 'barC', 'len', yAt(TDONE) - yAt(TARR), TDONE - TARR, 'linear');
      s.set(TARR, 'barC', 'color', T.fg, 0); s.set(TARR, 'barC', 'glow', 0.5, 0.3);

      // caller wait clock: one tick per authored second until the timeout (left, E)
      for (let t = 4; t < TOUT - 0.01; t += 1) s.sfx(t, 'clock', { note: 'E6', gain: 1.7, pan: PC });
      // CI work ticks: every 0.5 s, offset by 0.25 s, continuing straight through the timeout (right, C)
      for (let t = 3.75; t < TDONE - 0.1; t += 0.5) s.sfx(t, 'work', { note: 'C3', gain: 1.0, pan: PR });

      // ---- 6.4 s: CI advances a step ----
      s.slot(6.4, 'ci', 0, 'done'); s.slot(6.4, 'ci', 1, 'busy');
      s.sfx(6.4, 'arrive', { note: 'G4', gain: 0.45, pan: PR });

      // ---- 10.0 s: the wait nears its limit ----
      s.set(10.0, 'limit', 'color', T.mid, 0.4); s.set(10.0, 'limit', 'glow', 0.6, 0.4);
      s.set(10.0, 'limitL', 'color', T.fg, 0.4);

      // ---- 11.0 s: timeout — only the caller lane changes ----
      s.sfx(TOUT, 'latch', { pan: PC });
      s.set(TOUT, 'barA', 'color', T.mid, 0.25); s.set(TOUT, 'barA', 'fill', '#16181c', 0.25);
      s.set(TOUT, 'barA', 'cap', 1, 0.25, 'back'); s.set(TOUT, 'barA', 'capColor', T.fg, 0);
      s.set(TOUT, 'barA', 'glow', 1, 0.1); s.set(TOUT + 0.1, 'barA', 'glow', 0, 0.6);
      s.set(TOUT, 'limit', 'solid', 1, 0.45, 'out'); s.set(TOUT, 'limit', 'glow', 0, 0.6);
      s.set(TOUT + 0.45, 'limitL', 'text', 'stopped waiting', 0);
      s.set(TOUT + 0.45, 'limitL', 'color', T.fg, 0);
      s.set(TOUT + 0.45, 'limitL', 'scale', 1.12, 0.12, 'out'); s.set(TOUT + 0.6, 'limitL', 'scale', 1, 0.3);

      // ---- 13.2 s: no response, so the caller's status is unknown ----
      s.set(13.2, 'field', 'value', 'unknown', 0);
      s.set(13.2, 'field', 'valueScale', 1.18, 0.15, 'out'); s.set(13.35, 'field', 'valueScale', 1, 0.3);
      s.pulse(13.2, 'field');
      s.sfx(13.2, 'unresolved', { pan: PC });

      // ---- 15.6 s: in this run, the lookup is still working ----
      s.set(15.6, 'barC', 'glow', 1.2, 0.12); s.set(15.72, 'barC', 'glow', 0.5, 0.5);
      s.set(15.6, 'run1', 'alpha', 1, 0.4); s.set(15.8, 'run2', 'alpha', 1, 0.4);
      s.sfx(15.6, 'arrive', { note: 'C5', gain: 0.4, pan: PR });

      // ---- 17.2 s: CI advances again ----
      s.slot(17.2, 'ci', 1, 'done'); s.slot(17.2, 'ci', 2, 'busy');
      s.sfx(17.2, 'arrive', { note: 'G4', gain: 0.45, pan: PR });

      // ---- 20.5 s: the lookup finishes remotely; nothing travels to the caller ----
      s.set(TDONE, 'barC', 'color', OK, 0.3); s.set(TDONE, 'barC', 'glow', 0, 0.5);
      s.set(TDONE, 'barC', 'capColor', OK, 0); s.set(TDONE, 'barC', 'cap', 1, 0.25, 'back');
      s.slot(TDONE, 'ci', 2, 'done');
      s.ripple(TDONE, [CX, yAt(TDONE)], OK, { r1: 70, mark: 'check', dur: 0.8 });
      s.sfx(TDONE, 'store', { note: 'C5', pan: PR });
      s.set(TDONE + 0.5, 'done', 'alpha', 1, 0.4);
      s.set(TDONE + 0.5, 'run2', 'color', T.mid, 0.5);

      // ---- 23.6 s: the caller's record is unchanged ----
      s.pulse(23.6, 'field');
      s.sfx(23.6, 'send', { note: 'E5', gain: 1.2, pan: PC });

      // ---- 26.0 / 27.2 s: cancellation and rollback would be separate code ----
      s.set(26.0, 'sockC', 'alpha', 1, 0.35); s.set(26.0, 'sockC', 'scale', 1, 0.4, 'back');
      s.sfx(26.0, 'hollow', { pan: PC });
      s.set(27.2, 'sockR', 'alpha', 1, 0.35); s.set(27.2, 'sockR', 'scale', 1, 0.4, 'back');
      s.sfx(27.2, 'hollow', { note: 'D4', pan: PR });
      // final hold to 34.5 s authored
    },
  });
})();





