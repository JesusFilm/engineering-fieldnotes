/* Lesson 03 — Retry only when safe (motion-v2 cut).
 * One mechanism: attempt 1 of a CI status read times out; the caller checks the operation's
 * documented (example) contract; a second bounded attempt asks the same question; the caller
 * uses the response only once it actually arrives. A closing contrast shows that a write needs
 * its own contract, and that an idempotency key helps only when the service supports it.
 * Authored at speed 1. Render: see verification.json for the exact command.
 */
FlowVideo.scene({
  meta: { title: 'Retry only when safe', titleSize: 84, subtitle: 'CI STATUS READ', duration: 37.6, fps: 30, speed: 1 },
  build(s) {
    const T = s.THEME, N = FlowVideo.NODES, U = FlowVideo.util;

    /* ---------- cut-local generic node types ---------- */
    // Rounded frame (panel, section, highlight). Props: color, glow, dashed, dy.
    N.frame = (ctx, n, p) => {
      const w = n.w, h = n.h, x = n.x - w / 2, y = n.y - h / 2 + p('dy', 0), c = p('color', T.dim);
      ctx.lineWidth = n.lw || 3; ctx.strokeStyle = c;
      if (n.fill !== false) { ctx.fillStyle = T.bg; U.rr(ctx, x, y, w, h, n.r || 20); ctx.fill(); }
      U.glow(ctx, c, 22 * p('glow', 0));
      if (p('dashed', 0) > 0.5) ctx.setLineDash([14, 10]);
      U.rr(ctx, x, y, w, h, n.r || 20); ctx.stroke(); ctx.setLineDash([]); U.noGlow(ctx);
    };
    // Free text. Props: text, color, dy.
    N.txt = (ctx, n, p) => {
      const str = p('text', '');
      if (!str) return;
      U.text(ctx, str, n.x, n.y + p('dy', 0), { size: n.size || 40, weight: n.weight || 600, color: p('color', T.fg), align: n.align || 'left', font: n.mono ? T.mono : T.font });
    };
    // Outlined pill with text; optional spinner (busy) or check (done) slot, dashed outline. Props: text, color, textColor, busy, done, dashed, glow, dy.
    N.pill = (ctx, n, p) => {
      const str = p('text', ''), size = n.size || 40, c = p('color', T.mid), busy = p('busy', 0);
      ctx.font = '700 ' + size + 'px ' + T.mono;
      const sp = n.spin ? size * 1.1 : 0, w = ctx.measureText(str).width + size * 1.1 + sp, h = size * 1.7;
      const x = n.anchor === 'left' ? n.x : n.x - w / 2, y = n.y - h / 2 + p('dy', 0);
      ctx.fillStyle = T.bg; U.rr(ctx, x, y, w, h, 14); ctx.fill();
      ctx.strokeStyle = c; ctx.lineWidth = 3.5; U.glow(ctx, c, 8 + 20 * p('glow', 0));
      if (p('dashed', 0) > 0.5) ctx.setLineDash([10, 8]);
      U.rr(ctx, x, y, w, h, 14); ctx.stroke(); ctx.setLineDash([]); U.noGlow(ctx);
      U.text(ctx, str, x + size * 0.55 + sp, y + h / 2 + 1, { size, weight: 700, font: T.mono, color: p('textColor', c), align: 'left' });
      if (n.spin && busy > 0.01) {
        const cx = x + size * 0.55 + sp * 0.4, cy = y + h / 2, a = (p('_t', 0) * 5) % (Math.PI * 2);
        ctx.save(); ctx.globalAlpha *= busy; ctx.strokeStyle = c; ctx.lineWidth = 4.5; ctx.lineCap = 'round';
        ctx.beginPath(); ctx.arc(cx, cy, size * 0.32, a, a + 4.2); ctx.stroke(); ctx.restore();
      }
      const done = p('done', 0);
      if (n.spin && done > 0.01) {
        const cx = x + size * 0.55 + sp * 0.4, cy = y + h / 2, r = size * 0.3;
        ctx.save(); ctx.globalAlpha *= done; ctx.strokeStyle = c; ctx.lineWidth = 4.5; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
        ctx.beginPath(); ctx.moveTo(cx - r, cy); ctx.lineTo(cx - r * 0.25, cy + r * 0.75); ctx.lineTo(cx + r, cy - r * 0.7); ctx.stroke(); ctx.restore();
      }
    };
    // Circled check mark with overshoot pop. Props: k (0..1), color, dy.
    N.tick = (ctx, n, p) => {
      const k = p('k', 0), c = p('color', T.ok);
      if (k <= 0.01) return;
      const sc = Math.max(0.01, FlowVideo.EASE.back(Math.min(1, k))), x = n.x, y = n.y + p('dy', 0), r = n.r || 24;
      ctx.save(); ctx.translate(x, y); ctx.scale(sc, sc);
      ctx.strokeStyle = c; ctx.lineWidth = 4.5; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; U.glow(ctx, c, 12);
      ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(-r * 0.42, 0); ctx.lineTo(-r * 0.1, r * 0.32); ctx.lineTo(r * 0.45, -r * 0.3); ctx.stroke();
      U.noGlow(ctx); ctx.restore();
    };

    /* ---------- palette and pitches ---------- */
    const CALL = 'C5', CALL_HI = 'C6', SVC = 'G4', SVC_HI = 'G5', DOC = 'E5', WRITE = 'A3';
    const REQ_X = 330, RESP_X = 750, PANEL_BOT = 1027, SVC_TOP = 1313;
    const panC = s.panOf([540, 745]), panSvc = s.panOf([540, 1440]);
    s.sound('fall', { base: 'A3', gain: 0.5, echo: { delay: 0.08, feedback: 0.3, repeats: 1 },
      layers: [{ type: 'tone', wave: 'sine', ratio: 1, attack: 0.003, decay: 0.28, harmonics: [1, 0.35, 0.1] },
               { type: 'tone', wave: 'sine', ratio: 0.794, delay: 0.16, attack: 0.003, decay: 0.38, harmonics: [1, 0.35, 0.1] }] });

    /* ---------- caller: release assistant inspector ---------- */
    s.node('panel', 'frame', { x: 540, y: 746, w: 920, h: 562, color: T.mid, lw: 3.5 });
    s.node('pName', 'txt', { x: 122, y: 516, text: 'release assistant', size: 40, color: T.mid });
    s.node('tab', 'pill', { x: 858, y: 516, text: 'contract', size: 34, color: T.dim, textColor: T.mid });
    // attempt 1
    s.node('r1n', 'txt', { x: 122, y: 606, text: '#1', size: 42, weight: 700, color: T.mid });
    s.node('r1op', 'txt', { x: 192, y: 606, text: 'Read status · Build 42', size: 40, mono: true, color: T.fg });
    s.node('hl1', 'frame', { x: 472, y: 606, w: 580, h: 70, r: 14, color: T.fg, fill: false, alpha: 0 });
    s.node('bar1', 'bar', { x: 400, y: 676, w: 400, h: 20, ticks: true, color: T.dim, seg0: 0, seg0Color: T.mid });
    s.node('r1out', 'txt', { x: 640, y: 676, text: '', size: 40, mono: true, color: T.mid });
    s.node('hl1o', 'frame', { x: 765, y: 676, w: 290, h: 66, r: 14, color: T.accent, fill: false, alpha: 0 });
    // attempt 2 (appears inactive after the timeout)
    s.node('r2n', 'txt', { x: 122, y: 786, text: '#2', size: 42, weight: 700, color: T.dim, alpha: 0 });
    s.node('r2op', 'txt', { x: 192, y: 786, text: 'Read status · Build 42', size: 40, mono: true, color: T.fg, alpha: 0 });
    s.node('bar2', 'bar', { x: 400, y: 856, w: 400, h: 20, ticks: true, color: T.dim, seg0: 0, seg0Color: T.mid, alpha: 0 });
    s.node('r2ctl', 'pill', { x: 400, y: 786, text: 'retry ?', size: 40, color: T.dim, textColor: T.mid, dashed: 1, alpha: 0 });
    s.node('r2out', 'txt', { x: 640, y: 856, text: '', size: 40, mono: true, color: T.mid, alpha: 0 });
    // result field
    s.node('resK', 'txt', { x: 122, y: 950, text: 'status', size: 40, color: T.mid });
    s.node('resV', 'pill', { x: 292, y: 950, anchor: 'left', text: '?', size: 44, color: T.dim, textColor: T.mid });

    /* ---------- rails ---------- */
    s.wire('req', [REQ_X, PANEL_BOT + 8], [REQ_X, SVC_TOP - 8], { color: T.wire });
    s.wire('resp', [RESP_X, SVC_TOP - 8], [RESP_X, PANEL_BOT + 8], { color: T.wire });
    s.set(0, 'wire:req', 'alpha', 0.55, 0); s.set(0, 'wire:resp', 'alpha', 0.55, 0);

    /* ---------- CI service ---------- */
    s.node('svc', 'frame', { x: 540, y: 1440, w: 760, h: 252, color: T.mid, lw: 3.5 });
    s.node('svcName', 'txt', { x: 540, y: 1364, text: 'CI service', size: 40, color: T.mid, align: 'center' });
    s.node('svcBuild', 'txt', { x: 202, y: 1438, text: 'Build 42', size: 40, mono: true, color: T.fg });
    s.node('svcStat', 'pill', { x: 780, y: 1438, text: 'passed', size: 40, color: T.dim, textColor: T.mid });
    s.node('w1', 'pill', { x: 282, y: 1512, text: '#1', size: 36, spin: true, color: T.dim, alpha: 0 });
    s.node('w2', 'pill', { x: 452, y: 1512, text: '#2', size: 36, spin: true, color: T.dim, alpha: 0 });
    const SVC_IDS = ['svc', 'svcName', 'svcBuild', 'svcStat'];

    /* ---------- example contract card (overlay) ---------- */
    const card = [];
    const cn = (id, type, o) => { card.push(id); return s.node(id, type, Object.assign({ alpha: 0, dy: 70 }, o)); };
    cn('card', 'frame', { x: 540, y: 1396, w: 880, h: 682, color: T.mid, lw: 3.5 });
    cn('cardTitle', 'txt', { x: 540, y: 1104, text: 'example contract', size: 38, color: T.mid, align: 'center' });
    cn('rBox', 'frame', { x: 540, y: 1250, w: 800, h: 212, color: T.dim });
    cn('rHead', 'txt', { x: 172, y: 1194, text: 'Read status', size: 44, weight: 700, mono: true, color: T.fg });
    cn('rTick', 'tick', { x: 878, y: 1194, r: 24, k: 0 });
    cn('rk1', 'txt', { x: 172, y: 1262, text: 'changes build', size: 40, color: T.mid });
    cn('rv1', 'txt', { x: 908, y: 1262, text: 'no', size: 40, weight: 700, mono: true, color: T.ok, align: 'right' });
    cn('rk2', 'txt', { x: 172, y: 1320, text: 'retry after timeout', size: 40, color: T.mid });
    cn('rv2', 'txt', { x: 908, y: 1320, text: 'yes', size: 40, weight: 700, mono: true, color: T.ok, align: 'right' });
    cn('wBox', 'frame', { x: 540, y: 1544, w: 800, h: 300, color: T.dim });
    cn('wHead', 'txt', { x: 172, y: 1440, text: 'Start build', size: 44, weight: 700, mono: true, color: T.fg });
    cn('wKey', 'pill', { x: 718, y: 1440, text: 'idempotency key', size: 34, color: T.info });
    cn('wk1', 'txt', { x: 172, y: 1510, text: 'changes build', size: 40, color: T.mid });
    cn('wv1', 'txt', { x: 908, y: 1510, text: 'yes', size: 40, weight: 700, mono: true, color: T.accent, align: 'right' });
    cn('wk2', 'txt', { x: 172, y: 1570, text: 'retry after timeout', size: 40, color: T.mid });
    cn('wv2', 'txt', { x: 908, y: 1570, text: '?', size: 44, weight: 700, mono: true, color: T.accent, align: 'right' });
    cn('wNote', 'txt', { x: 540, y: 1642, text: 'key helps only if service supports it', size: 38, color: T.accent, align: 'center' });
    const READ_ROWS = ['rk1', 'rv1', 'rk2', 'rv2', 'rTick'];
    const WRITE_ALL = ['wBox', 'wHead', 'wk1', 'wk2'];
    const WRITE_LATE = ['wv1', 'wv2', 'wKey', 'wNote'];

    // Open/close the card: the service steps out of the way first, then the card slides 70 px and fades in.
    // alphas: per-id target alpha on open. The card is fully in place 0.8 s after t.
    function openCard(t, alphas) {
      for (const id of SVC_IDS.concat(['w1', 'w2'])) s.set(t, id, 'alpha', 0, 0.25);
      s.set(t, 'wire:req', 'alpha', 0, 0.25); s.set(t, 'wire:resp', 'alpha', 0, 0.25);
      const tc = t + 0.25;
      for (const id of card) {
        const a = alphas[id];
        s.set(tc, id, 'dy', 0, 0.55, 'out');
        if (a === undefined) continue;
        s.set(tc, id, 'alpha', a, 0.45);
      }
    }
    function closeCard(t, w1a, w2a) {
      for (const id of card) { s.set(t, id, 'dy', 70, 0.4, 'in'); s.set(t, id, 'alpha', 0, 0.35); }
      const tb = t + 0.4;
      for (const id of SVC_IDS) s.set(tb, id, 'alpha', 1, 0.35);
      s.set(tb, 'w1', 'alpha', w1a, 0.35); s.set(tb, 'w2', 'alpha', w2a, 0.35);
      s.set(tb, 'wire:req', 'alpha', 0.55, 0.35); s.set(tb, 'wire:resp', 'alpha', 0.55, 0.35);
      s.set(t, 'tab', 'color', T.dim, 0.3); s.set(t, 'tab', 'textColor', T.mid, 0.3);
    }
    // One attempt of the same read: identical chip, route and sounds every time.
    function sendRead(t, wid) {
      s.set(t - 0.1, 'wire:req', 'alpha', 1, 0.2); s.set(t - 0.1, 'wire:req', 'color', T.fg, 0.2);
      s.packet({ route: [[REQ_X, PANEL_BOT + 30], [REQ_X, SVC_TOP - 30]], t, dur: 0.8, kind: 'chip', label: 'Build 42?', size: 38, color: T.fg });
      s.sfx(t, 'send', { note: CALL_HI, gain: 1.1, pan: s.panOf([REQ_X, 900]) });
      const ta = t + 0.8;
      s.ripple(ta, [REQ_X, SVC_TOP], T.fg, { r1: 60 });
      s.sfx(ta, 'arrive', { note: SVC, gain: 0.8, pan: s.panOf([REQ_X, 1300]) });
      s.set(ta, wid, 'alpha', 1, 0.25); s.set(ta, wid, 'color', T.accent, 0.25); s.set(ta, wid, 'busy', 1, 0.25);
      s.set(ta, 'svc', 'color', T.fg, 0.25);
      s.set(ta + 0.3, 'wire:req', 'alpha', 0.55, 0.4); s.set(ta + 0.3, 'wire:req', 'color', T.wire, 0.4);
      return ta;
    }

    /* ======== Beat 1: attempt 1 waits, then times out (0–9 s) ======== */
    const tS1 = 1.2, LIMIT = 5;
    s.set(tS1 - 0.2, 'r1out', 'text', 'wait ≤ 5 s', 0);
    s.set(tS1 - 0.2, 'r1out', 'color', T.mid, 0);
    s.set(tS1 - 0.2, 'r1n', 'color', T.fg, 0.3);
    s.set(tS1 - 0.2, 'bar1', 'color', T.mid, 0.3);
    sendRead(tS1, 'w1');
    s.set(tS1, 'bar1', 'seg0', 1, LIMIT, 'linear');
    s.set(tS1 + LIMIT - 1.6, 'bar1', 'seg0Color', T.accent, 1.4);
    for (let k = 1; k < LIMIT; k++) s.sfx(tS1 + k, 'clock', { gain: 0.9, pan: panC });
    const tTO = tS1 + LIMIT; // 6.2
    s.set(tTO, 'r1out', 'text', 'timed out', 0);
    s.set(tTO, 'r1out', 'color', T.accent, 0);
    s.set(tTO, 'bar1', 'color', T.accent, 0.2);
    s.shake(tTO, 'r1out', 8, 0.4);
    s.shake(tTO, 'bar1', 6, 0.4);
    s.sfx(tTO, 'thump', { note: 'G3', gain: 0.75, pan: panC });
    s.set(tTO, 'resV', 'color', T.accent, 0.25);
    s.set(tTO + 1.0, 'resV', 'color', T.dim, 0.6);
    // The service is not told anything: attempt 1's work stays, unresolved, at the service.
    s.set(tTO + 0.6, 'w1', 'alpha', 0.5, 0.8);
    s.set(tTO + 0.6, 'svc', 'color', T.mid, 0.6);
    // Inactive second attempt appears: the timeout alone does not enable it.
    const tGhost = tTO + 1.2; // 7.4
    s.set(tGhost, 'r2n', 'alpha', 1, 0.4);
    s.set(tGhost, 'r2ctl', 'alpha', 1, 0.4);
    s.sfx(tGhost, 'ack', { note: 'C5', gain: 0.8, pan: panC });

    /* ======== Beat 2: check the operation contract (9.6–17 s) ======== */
    const tOpen = 9.6;
    s.set(tOpen, 'tab', 'color', T.fg, 0.25); s.set(tOpen, 'tab', 'textColor', T.fg, 0.25); s.pulse(tOpen, 'tab');
    s.sfx(tOpen, 'ack', { note: CALL, gain: 0.9, pan: s.panOf([858, 516]) });
    const first = { card: 1, cardTitle: 1, rBox: 1, rHead: 1, rk1: 1, rk2: 1, wBox: 0.28, wHead: 0.28, wk1: 0.28, wk2: 0.28 };
    openCard(tOpen + 0.25, first);
    s.sfx(tOpen + 0.55, 'arrive', { note: DOC, gain: 0.6, pan: 0 });
    // Same operation: the card's Read status matches attempt 1's request.
    const tHead = 11.0;
    s.set(tHead, 'rBox', 'color', T.fg, 0.25);
    s.set(tHead, 'hl1', 'alpha', 1, 0.25);
    s.sfx(tHead, 'ack', { note: DOC, gain: 1.0, pan: 0 });
    // It only reads.
    const tR1 = 12.2;
    s.set(tR1, 'rk1', 'color', T.fg, 0.2); s.set(tR1, 'rv1', 'alpha', 1, 0.25);
    s.ripple(tR1, [880, 1262], T.ok, { r1: 50, dur: 0.5 });
    s.sfx(tR1, 'ack', { note: DOC, gain: 0.85, pan: s.panOf([880, 1262]) });
    // It permits a repeat after this failure: a timeout.
    const tR2 = 13.4;
    s.set(tR2, 'rk2', 'color', T.fg, 0.2); s.set(tR2, 'rv2', 'alpha', 1, 0.25);
    s.set(tR2, 'hl1o', 'alpha', 1, 0.25);
    s.ripple(tR2, [880, 1320], T.ok, { r1: 50, dur: 0.5 });
    s.sfx(tR2, 'ack', { note: DOC, gain: 0.85, pan: s.panOf([880, 1320]) });
    // Both match: the second attempt is enabled.
    const tEn = 14.6;
    s.set(tEn, 'rTick', 'k', 1, 0.45, 'linear');
    s.set(tEn, 'rBox', 'color', T.ok, 0.3);
    s.set(tEn, 'r2ctl', 'text', 'retry ok', 0);
    s.set(tEn, 'r2ctl', 'dashed', 0, 0);
    s.set(tEn, 'r2ctl', 'color', T.ok, 0.25); s.set(tEn, 'r2ctl', 'textColor', T.ok, 0.25);
    s.set(tEn, 'r2n', 'color', T.fg, 0.25);
    s.pulse(tEn, 'r2ctl');
    s.sfx(tEn, 'ack', { note: CALL, gain: 1.0, pan: panC });
    s.sfx(tEn + 0.13, 'ack', { note: 'G5', gain: 0.9, pan: panC });
    const tClose = 17.0;
    s.set(tClose, 'hl1', 'alpha', 0, 0.35); s.set(tClose, 'hl1o', 'alpha', 0, 0.35);
    closeCard(tClose, 0.5, 0);
    s.sfx(tClose, 'send', { note: 'E6', gain: 0.8, pan: 0 });

    /* ======== Beat 3: the same question, second bounded attempt (17.8–25.5 s) ======== */
    const tSame = 17.9;
    s.set(tSame, 'r2ctl', 'alpha', 0, 0.3);
    s.set(tSame + 0.15, 'r2op', 'alpha', 1, 0.4);
    s.set(tSame + 0.15, 'bar2', 'alpha', 1, 0.4);
    s.set(tSame + 0.15, 'r2out', 'text', 'same question', 0);
    s.set(tSame + 0.15, 'r2out', 'alpha', 1, 0.4);
    s.set(tSame + 0.5, 'hl1', 'alpha', 1, 0.25); s.set(tSame + 1.4, 'hl1', 'alpha', 0, 0.4);
    s.node('hl2', 'frame', { x: 472, y: 786, w: 580, h: 70, r: 14, color: T.fg, fill: false, alpha: 0 });
    s.set(tSame + 0.5, 'hl2', 'alpha', 1, 0.25); s.set(tSame + 1.4, 'hl2', 'alpha', 0, 0.4);
    s.sfx(tSame + 0.15, 'store', { note: CALL, gain: 0.7, pan: panC });
    s.sfx(tSame + 0.5, 'ack', { note: CALL_HI, gain: 0.6, pan: panC });
    const tS2 = 19.6;
    s.set(tS2 - 0.2, 'r2out', 'text', 'wait ≤ 5 s', 0);
    s.set(tS2 - 0.2, 'bar2', 'color', T.mid, 0.3);
    const ta2 = sendRead(tS2, 'w2');
    s.set(tS2, 'bar2', 'seg0', 1, LIMIT, 'linear');
    s.sfx(tS2 + 1, 'clock', { gain: 0.9, pan: panC });
    s.sfx(tS2 + 2, 'clock', { gain: 0.9, pan: panC });
    // The service answers attempt 2 (attempt 1's work is still unresolved).
    const tResp = 21.9;
    s.set(tResp - 0.25, 'w2', 'busy', 0, 0.2); s.set(tResp - 0.25, 'w2', 'done', 1, 0.25); s.set(tResp - 0.25, 'w2', 'color', T.ok, 0.25);
    s.set(tResp - 0.25, 'svcStat', 'color', T.ok, 0.25); s.set(tResp - 0.25, 'svcStat', 'textColor', T.ok, 0.25);
    s.sfx(tResp - 0.25, 'work', { note: SVC, gain: 0.8, pan: panSvc });
    s.set(tResp - 0.1, 'wire:resp', 'alpha', 1, 0.2); s.set(tResp - 0.1, 'wire:resp', 'color', T.ok, 0.2);
    s.packet({ route: [[RESP_X, SVC_TOP - 30], [RESP_X, PANEL_BOT + 30]], t: tResp, dur: 0.8, kind: 'chip', label: 'passed', size: 38, color: T.ok });
    s.sfx(tResp, 'send', { note: SVC_HI, gain: 1.1, pan: s.panOf([RESP_X, 1100]) });
    const tArr = tResp + 0.8; // 22.7
    const frac = (tArr - tS2) / LIMIT;
    s.set(tArr, 'bar2', 'seg0', frac, 0);
    s.set(tArr, 'bar2', 'seg0Color', T.ok, 0.2); s.set(tArr, 'bar2', 'color', T.ok, 0.2);
    s.set(tArr, 'r2out', 'text', 'received', 0); s.set(tArr, 'r2out', 'color', T.ok, 0);
    s.set(tArr, 'svc', 'color', T.mid, 0.4);
    s.ripple(tArr, [RESP_X, PANEL_BOT], T.ok, { r1: 60 });
    s.sfx(tArr, 'deliver', { note: CALL, gain: 1.0, pan: s.panOf([RESP_X, 1000]) });
    s.set(tArr + 0.4, 'wire:resp', 'alpha', 0.55, 0.4); s.set(tArr + 0.4, 'wire:resp', 'color', T.wire, 0.4);
    // Only now does the caller use it.
    const tUse = 23.5;
    s.set(tUse, 'resV', 'text', 'passed', 0);
    s.set(tUse, 'resV', 'color', T.ok, 0.25); s.set(tUse, 'resV', 'textColor', T.ok, 0.25);
    s.pulse(tUse, 'resV');
    s.sfx(tUse, 'chime', { note: CALL, gain: 0.75, pan: s.panOf([380, 950]) });

    /* ======== Beat 4: a write needs its own contract (26.4–34 s) ======== */
    const tW = 26.4;
    s.set(tW, 'tab', 'color', T.fg, 0.25); s.set(tW, 'tab', 'textColor', T.fg, 0.25);
    s.set(tW, 'rBox', 'color', T.ok, 0);
    const second = { card: 1, cardTitle: 1, rBox: 0.45, rHead: 0.45, rk1: 0.45, rk2: 0.45, rv1: 0.45, rv2: 0.45, rTick: 0.45, wBox: 1, wHead: 1, wk1: 1, wk2: 1 };
    openCard(tW, second);
    s.set(tW + 0.25, 'wBox', 'color', T.accent, 0.4);
    s.sfx(tW + 0.3, 'arrive', { note: WRITE, gain: 0.7, pan: 0 });
    const tW1 = 27.6;
    s.set(tW1, 'wk1', 'color', T.fg, 0.2); s.set(tW1, 'wv1', 'alpha', 1, 0.25);
    s.ripple(tW1, [880, 1510], T.accent, { r1: 50, dur: 0.5 });
    s.sfx(tW1, 'ack', { note: 'A4', gain: 0.9, pan: s.panOf([880, 1510]) });
    const tW2 = 28.8;
    s.set(tW2, 'wk2', 'color', T.fg, 0.2); s.set(tW2, 'wv2', 'alpha', 1, 0.25);
    s.shake(tW2, 'wv2', 6, 0.35);
    s.sfx(tW2, 'fall', { gain: 1.0, pan: s.panOf([880, 1570]) });
    const tKey = 30.2;
    s.set(tKey, 'wKey', 'alpha', 1, 0.3); s.pulse(tKey, 'wKey');
    s.sfx(tKey, 'store', { note: 'A4', gain: 0.7, pan: s.panOf([718, 1440]) });
    const tNote = 31.2;
    s.set(tNote, 'wNote', 'alpha', 1, 0.35);
    s.pulse(tNote, 'wv2');
    s.sfx(tNote, 'thump', { note: 'G3', gain: 0.4, pan: 0 });
    const tWC = 34.0;
    closeCard(tWC, 0.5, 1);
    s.sfx(tWC, 'send', { note: 'E6', gain: 0.8, pan: 0 });

    /* ======== Ending: hold the observed read result, then fade ======== */
    s.pulse(35.0, 'resV');
    s.sfx(35.0, 'ack', { note: CALL, gain: 0.5, pan: panC });
    s.fade(36.6, 1, 0.8);
  },
});

