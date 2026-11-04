/* Timeouts and retries, lesson 01: Wait for a response (motion-v2 cut).
 * One caller asks a CI service for a build status and waits. Case 1: the response
 * arrives in time and fills the caller's result. Case 2 (a separate request): the
 * caller's illustrative 5 s attempt timeout ends its wait. Times are illustrative.
 * Time contract: 2 playback seconds = 1 illustrative second, linear in both cases.
 * Generic drawing extensions are registered locally through the cut's engine copy.
 */
(function () {
  const F = FlowVideo, T = F.THEME, U = F.util, N = F.NODES;
  const LANE = '#5A606A';

  // Panel: rounded frame with a heading.
  N.panel = (ctx, n, p) => {
    const w = n.w, h = n.h, x = n.x - w / 2, y = n.y - h / 2, c = p('color', T.mid);
    ctx.lineWidth = 6; ctx.strokeStyle = c; U.glow(ctx, c, 26 * p('glow', 0)); ctx.fillStyle = T.bg;
    U.rr(ctx, x, y, w, h, 28); ctx.fill(); ctx.stroke(); U.noGlow(ctx);
    const left = n.labelAlign === 'left';
    U.text(ctx, p('label', n.label), left ? x + 46 : n.x, y + 58, { size: 50, weight: 700, color: p('labelColor', T.fg), align: left ? 'left' : 'center' });
  };

  // Result field: outlined slot holding an icon and a short value.
  function icon(ctx, kind, x, y, c, t) {
    if (kind === 'wait') {
      for (let i = 0; i < 3; i++) {
        const ph = (t * 1.4 - i * 0.33) % 1, a = 0.35 + 0.65 * Math.max(0, Math.cos(ph * Math.PI * 2));
        ctx.globalAlpha *= a; ctx.fillStyle = c; ctx.beginPath(); ctx.arc(x - 20 + i * 20, y, 7.5, 0, Math.PI * 2); ctx.fill(); ctx.globalAlpha /= a;
      }
    } else if (kind === 'check') {
      ctx.strokeStyle = c; ctx.lineWidth = 8; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
      ctx.beginPath(); ctx.moveTo(x - 18, y + 1); ctx.lineTo(x - 5, y + 14); ctx.lineTo(x + 19, y - 14); ctx.stroke();
    } else if (kind === 'stop') {
      ctx.fillStyle = c; U.rr(ctx, x - 16, y - 16, 32, 32, 5); ctx.fill();
    }
  }
  N.field = (ctx, n, p) => {
    const w = n.w, h = n.h, x = n.x - w / 2, y = n.y - h / 2, c = p('color', T.dim);
    ctx.lineWidth = 5; ctx.strokeStyle = c; U.glow(ctx, c, 24 * p('glow', 0)); ctx.fillStyle = T.bg;
    U.rr(ctx, x, y, w, h, 18); ctx.fill(); ctx.stroke(); U.noGlow(ctx);
    const kind = p('icon', 'none'), s = p('text', '');
    ctx.font = '700 50px ' + T.font;
    const tw = ctx.measureText(s).width, iw = kind === 'none' ? 0 : 76, gx = n.x - (tw + iw) / 2;
    if (kind !== 'none') icon(ctx, kind, gx + 26, n.y, p('iconColor', T.fg), p('_t', 0));
    U.text(ctx, s, gx + iw, n.y + 2, { size: 50, weight: 700, color: p('textColor', T.mid), align: 'left' });
  };

  // Wait rail: fills toward a fixed end cap; faint per-unit ticks; optional marker and limit label.
  N.rail = (ctx, n, p) => {
    const w = n.w, h = n.h, x = n.x - w / 2, y = n.y - h / 2, units = n.units;
    const f = U.clamp(p('fill', 0));
    ctx.lineWidth = 5; ctx.strokeStyle = p('trackColor', T.dim); U.rr(ctx, x, y, w, h, h / 2); ctx.stroke();
    if (f > 0.002) { ctx.save(); U.rr(ctx, x, y, w, h, h / 2); ctx.clip(); ctx.fillStyle = p('fillColor', T.accent); ctx.fillRect(x, y, w * f, h); ctx.restore(); }
    for (let i = 1; i < units; i++) {
      const tx = x + (w * i) / units, lit = tx <= x + w * f;
      ctx.strokeStyle = lit ? T.bg : T.dim; ctx.lineWidth = 5;
      ctx.beginPath(); ctx.moveTo(tx, y + 3); ctx.lineTo(tx, y + h - 3); ctx.stroke();
      const g = p('tick' + i, 0);
      if (g > 0.01) {
        ctx.globalAlpha *= g; ctx.strokeStyle = T.fg; ctx.lineWidth = 6; ctx.lineCap = 'round'; U.glow(ctx, T.fg, 12);
        ctx.beginPath(); ctx.moveTo(tx, y - 14); ctx.lineTo(tx, y + h + 14); ctx.stroke(); U.noGlow(ctx); ctx.globalAlpha /= g;
      }
    }
    const cc = p('capColor', T.mid), cx = x + w + 20;
    U.glow(ctx, cc, 28 * p('capGlow', 0)); ctx.fillStyle = cc; U.rr(ctx, cx - 9, y - 26, 18, h + 52, 6); ctx.fill(); U.noGlow(ctx);
    U.text(ctx, n.limitLabel, cx + 9, y + h + 60, { size: 44, weight: 700, color: p('limitColor', T.mid), align: 'right' });
    const ma = p('markAlpha', 0);
    if (ma > 0.01) {
      const mx = x + w * p('markPos', 0), mc = p('markColor', T.ok);
      ctx.globalAlpha *= ma; ctx.strokeStyle = mc; ctx.lineWidth = 6; ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(mx, y - 10); ctx.lineTo(mx, y - 32); ctx.stroke();
      U.text(ctx, p('markText', ''), mx, y - 70, { size: 46, weight: 700, color: mc });
      ctx.globalAlpha /= ma;
    }
  };

  // Work slot: a status word and a busy sweep that moves back and forth (no progress implied).
  N.busyslot = (ctx, n, p) => {
    const w = n.w, h = n.h, x = n.x - w / 2, y = n.y - h / 2, c = p('color', T.dim);
    ctx.lineWidth = 5; ctx.strokeStyle = c; U.glow(ctx, c, c === T.fg ? 12 : 0); ctx.fillStyle = T.bg;
    U.rr(ctx, x, y, w, h, 16); ctx.fill(); ctx.stroke(); U.noGlow(ctx);
    U.text(ctx, p('text', 'Idle'), n.x, n.y - 22, { size: 46, weight: 700, color: p('textColor', T.mid) });
    const tw = w - 110, tx = n.x - tw / 2, ty = n.y + 30, th = 16;
    ctx.lineWidth = 3; ctx.strokeStyle = T.dim; U.rr(ctx, tx, ty - th / 2, tw, th, th / 2); ctx.stroke();
    const b = p('busy', 0);
    if (b > 0.01) {
      const sw = 130, ph = 0.5 - 0.5 * Math.cos((p('_t', 0) * Math.PI * 2) / 1.8);
      ctx.globalAlpha *= b; ctx.fillStyle = T.accent; U.rr(ctx, tx + (tw - sw) * ph, ty - th / 2, sw, th, th / 2); ctx.fill(); ctx.globalAlpha /= b;
    }
  };

  // Vertical lane with a direction chevron near its far end.
  N.lane = (ctx, n, p) => {
    const c = p('color', LANE), dir = Math.sign(n.y2 - n.y1);
    ctx.strokeStyle = c; ctx.lineWidth = 7; ctx.lineCap = 'round';
    ctx.setLineDash([0.1, 17]); ctx.beginPath(); ctx.moveTo(n.x, n.y1); ctx.lineTo(n.x, n.y2); ctx.stroke(); ctx.setLineDash([]);
    const ay = n.y2 - dir * 4;
    ctx.lineWidth = 7; ctx.lineJoin = 'round';
    ctx.beginPath(); ctx.moveTo(n.x - 20, ay - dir * 20); ctx.lineTo(n.x, ay); ctx.lineTo(n.x + 20, ay - dir * 20); ctx.stroke();
  };

  // Data chip that travels along a route as its k prop goes 0..1.
  N.chip = (ctx, n, p) => {
    const [cx, cy] = U.polyAt(n.route, U.clamp(p('k', 0))), s = p('text', ''), c = p('color', T.fg);
    ctx.font = '700 44px ' + T.mono;
    const w = ctx.measureText(s).width + 44, h = 70;
    ctx.fillStyle = T.bg; ctx.strokeStyle = c; ctx.lineWidth = 5; U.glow(ctx, c, 14);
    U.rr(ctx, cx - w / 2, cy - h / 2, w, h, 14); ctx.fill(); ctx.stroke(); U.noGlow(ctx);
    U.text(ctx, s, cx, cy + 2, { size: 44, weight: 700, font: T.mono, color: c });
  };

  // Free text, optionally inside a pill outline.
  N.tag = (ctx, n, p) => {
    const s = p('text', n.text || ''), c = p('color', T.mid), size = n.size || 44;
    if (n.pill) {
      ctx.font = (n.weight || 700) + ' ' + size + 'px ' + T.font;
      const w = ctx.measureText(s).width + 64, h = size + 34;
      ctx.lineWidth = 5; ctx.strokeStyle = c; U.rr(ctx, n.x - w / 2, n.y - h / 2, w, h, h / 2); ctx.stroke();
    }
    U.text(ctx, s, n.x, n.y, { size, weight: n.weight || 700, color: c, spacing: n.spacing || 0 });
  };

  const REQ_X = 240, RES_X = 840, LANE_TOP = 990, LANE_BOT = 1285, CHIP_INSET = 56;
  const SEC = 2; // playback seconds per illustrative second
  const LEG = 0.8 * SEC; // one network leg, illustrative 0.8 s

  FlowVideo.scene({
    meta: { title: '', subtitle: '', duration: 39, fps: 30, speed: 1 },
    build(s) {
      s.node('title', 'tag', { x: 540, y: 262, text: 'Wait for a response', size: 84, weight: 800, color: T.title });
      s.node('sub', 'tag', { x: 540, y: 344, text: 'ILLUSTRATIVE TIMES', size: 34, weight: 700, color: T.mid, spacing: 6 });
      s.node('caller', 'panel', { x: 540, y: 730, w: 900, h: 480, label: 'Caller', labelAlign: 'left', alpha: 0 });
      s.node('field', 'field', { x: 540, y: 650, w: 800, h: 96, text: 'No status yet', alpha: 0 });
      s.node('rail', 'rail', { x: 510, y: 845, w: 720, h: 30, units: 5, limitLabel: 'Limit 5 s', alpha: 0 });
      s.node('reqLane', 'lane', { x: REQ_X, y: (LANE_TOP + LANE_BOT) / 2, y1: LANE_TOP, y2: LANE_BOT, alpha: 0 });
      s.node('resLane', 'lane', { x: RES_X, y: (LANE_TOP + LANE_BOT) / 2, y1: LANE_BOT, y2: LANE_TOP, alpha: 0 });
      s.node('net', 'tag', { x: 540, y: (LANE_TOP + LANE_BOT) / 2, text: 'Network', size: 40, weight: 600, color: T.mid, alpha: 0 });
      s.node('service', 'panel', { x: 540, y: 1445, w: 780, h: 290, label: 'CI service', alpha: 0 });
      s.node('slot', 'busyslot', { x: 540, y: 1492, w: 620, h: 126, alpha: 0 });
      s.node('case', 'tag', { x: 540, y: 1712, text: '', size: 52, pill: true, alpha: 0 });
      s.node('req', 'chip', { x: 0, y: 0, route: [[REQ_X, LANE_TOP + CHIP_INSET], [REQ_X, LANE_BOT - CHIP_INSET]], color: T.fg, alpha: 0 });
      s.node('res', 'chip', { x: 0, y: 0, route: [[RES_X, LANE_BOT - CHIP_INSET], [RES_X, LANE_TOP + CHIP_INSET]], color: T.ok, alpha: 0 });

      // Caller pitch family C, service pitch family E. Sends an octave above arrivals and quieter.
      s.sound('stop', { base: 'G4', gain: 0.62, echo: { delay: 0.08, feedback: 0.28, repeats: 1 },
        layers: [{ type: 'tone', wave: 'sine', attack: 0.006, decay: 0.32, harmonics: [1, 0.3, 0.1], harmDecay: 2 },
                 { type: 'tone', wave: 'sine', ratio: 2 / 3, delay: 0.16, attack: 0.006, decay: 0.75, harmonics: [1, 0.3, 0.1], harmDecay: 2 }] });
      const panX = (x) => ((x - 540) / 540) * 0.6;
      const railX = (k) => 150 + 720 * k;

      const stageIds = ['caller', 'field', 'rail', 'service', 'slot', 'reqLane', 'resLane', 'net', 'case'];
      function reveal(t0, label, color) {
        s.set(t0, 'case', 'text', label, 0); s.set(t0, 'case', 'color', color, 0);
        s.set(t0 + 0.2, 'case', 'alpha', 1, 0.4);
        for (const id of ['caller', 'field', 'rail']) s.set(t0 + 0.3, id, 'alpha', 1, 0.5);
        s.sfx(t0 + 0.3, 'ack', { note: 'C5', gain: 0.9, pan: 0 });
        for (const id of ['service', 'slot']) s.set(t0 + 0.8, id, 'alpha', 1, 0.5);
        s.sfx(t0 + 0.8, 'ack', { note: 'E5', gain: 0.9, pan: 0 });
        for (const id of ['reqLane', 'resLane', 'net']) s.set(t0 + 1.3, id, 'alpha', 1, 0.5);
      }
      function sendRequest(t, label, waitUnits) {
        s.pulse(t, 'caller');
        s.set(t, 'field', 'text', 'Waiting', 0); s.set(t, 'field', 'icon', 'wait', 0);
        s.set(t, 'field', 'iconColor', T.accent, 0); s.set(t, 'field', 'textColor', T.accent, 0); s.set(t, 'field', 'color', T.accent, 0.2);
        s.set(t, 'rail', 'fill', waitUnits / 5, waitUnits * SEC, 'linear');
        s.set(t, 'req', 'text', label, 0); s.set(t, 'req', 'k', 0, 0);
        s.set(t, 'req', 'alpha', 1, 0.15); s.set(t, 'req', 'k', 1, LEG, 'cruise'); s.set(t + LEG - 0.15, 'req', 'alpha', 0, 0.15);
        s.set(t, 'reqLane', 'color', T.fg, 0.2); s.set(t + LEG, 'reqLane', 'color', LANE, 0.4);
        s.sfx(t, 'send', { note: 'C6', gain: 1.1, pan: panX(REQ_X) });
        const ta = t + LEG; // request reaches the service
        s.ripple(ta, [REQ_X, LANE_BOT + 12], T.fg, { r0: 10, r1: 52, dur: 0.5 });
        s.pulse(ta, 'service');
        s.set(ta, 'slot', 'color', T.fg, 0.2); s.set(ta, 'slot', 'text', 'Processing', 0); s.set(ta, 'slot', 'textColor', T.fg, 0); s.set(ta, 'slot', 'busy', 1, 0.3);
        s.sfx(ta, 'arrive', { note: 'E5', pan: panX(REQ_X) });
      }
      function ticks(tSend, count) {
        for (let i = 1; i <= count; i++) {
          const t = tSend + i * SEC;
          s.set(t, 'rail', 'tick' + i, 1, 0.06); s.set(t + 0.12, 'rail', 'tick' + i, 0, 0.7);
          s.sfx(t, 'clock', { note: 'C7', gain: 1.0, pan: panX(railX(i / 5)) });
        }
      }
      function workTicks(times, gainAt) { for (const t of times) s.sfx(t, 'work', { note: 'E3', gain: gainAt(t), pan: 0 }); }

      // ---------- Case 1: in time ----------
      reveal(0, 'In time', T.ok);
      const s1 = 3.0, proc1 = 2.4 * SEC; // processing 2.4 illustrative s
      sendRequest(s1, 'status #418?', 4);
      ticks(s1, 3);
      workTicks([2.6, 3.4, 4.6, 5.4].map((d) => s1 + d), () => 0.7);
      const done1 = s1 + LEG + proc1; // service sends its response
      s.set(done1, 'slot', 'busy', 0, 0.3); s.set(done1, 'slot', 'color', T.dim, 0.3); s.set(done1 + 0.3, 'slot', 'text', 'Idle', 0); s.set(done1 + 0.3, 'slot', 'textColor', T.mid, 0);
      s.set(done1, 'res', 'text', '#418 passed', 0); s.set(done1, 'res', 'k', 0, 0);
      s.set(done1, 'res', 'alpha', 1, 0.15); s.set(done1, 'res', 'k', 1, LEG, 'cruise'); s.set(done1 + LEG - 0.15, 'res', 'alpha', 0, 0.15);
      s.set(done1, 'resLane', 'color', T.ok, 0.2); s.set(done1 + LEG, 'resLane', 'color', LANE, 0.5);
      s.sfx(done1, 'send', { note: 'E6', gain: 1.1, pan: panX(RES_X) });
      const got1 = done1 + LEG; // = s1 + 4 illustrative seconds
      s.ripple(got1, [RES_X, LANE_TOP + 4], T.ok, { r0: 10, r1: 40, dur: 0.5 });
      s.set(got1, 'field', 'text', '#418 passed', 0); s.set(got1, 'field', 'icon', 'check', 0); s.set(got1, 'field', 'iconColor', T.ok, 0);
      s.set(got1, 'field', 'textColor', T.ok, 0); s.set(got1, 'field', 'color', T.ok, 0);
      s.set(got1, 'field', 'glow', 1, 0.12); s.set(got1 + 0.12, 'field', 'glow', 0, 0.8);
      s.set(got1, 'rail', 'fillColor', T.ok, 0);
      s.sfx(got1, 'deliver', { note: 'C5', gain: 1.15, pan: panX(RES_X) * 0.6 });
      const mk1 = got1 + 1.6;
      s.set(mk1, 'rail', 'markPos', 0.8, 0); s.set(mk1, 'rail', 'markText', '4 s', 0); s.set(mk1, 'rail', 'markColor', T.ok, 0);
      s.set(mk1, 'rail', 'markAlpha', 1, 0.3);
      s.sfx(mk1, 'ack', { note: 'C6', gain: 0.9, pan: panX(railX(0.8)) });

      // ---------- separation: full stage fade; nothing carries over ----------
      s.fade(16.0, 1, 0.8);
      const rs = 16.9;
      for (const id of stageIds) s.set(rs, id, 'alpha', 0, 0);
      s.set(rs, 'field', 'text', 'No status yet', 0); s.set(rs, 'field', 'icon', 'none', 0); s.set(rs, 'field', 'textColor', T.mid, 0); s.set(rs, 'field', 'color', T.dim, 0);
      s.set(rs, 'rail', 'fill', 0, 0); s.set(rs, 'rail', 'fillColor', T.accent, 0); s.set(rs, 'rail', 'markAlpha', 0, 0);
      s.fade(17.0, 0, 0);

      // ---------- Case 2: too slow (a different request) ----------
      reveal(17.0, 'Too slow', T.accent);
      const s2 = 20.0;
      sendRequest(s2, 'status #419?', 5);
      ticks(s2, 4);
      const stop2 = s2 + 5 * SEC;
      workTicks([2.6, 3.4, 4.6, 5.4, 6.6, 7.4, 8.6, 9.4, 10.6, 11.4].map((d) => s2 + d), (t) => (t < stop2 ? 0.7 : 0.45));
      // The caller's attempt timeout: only the caller stops waiting.
      s.set(stop2, 'field', 'text', 'Timed out', 0); s.set(stop2, 'field', 'icon', 'stop', 0); s.set(stop2, 'field', 'iconColor', T.accent, 0);
      s.set(stop2, 'field', 'textColor', T.fg, 0); s.set(stop2, 'field', 'color', T.mid, 0);
      s.set(stop2, 'rail', 'capColor', T.accent, 0); s.set(stop2, 'rail', 'capGlow', 1, 0.1); s.set(stop2 + 0.15, 'rail', 'capGlow', 0.35, 0.9);
      s.set(stop2, 'rail', 'limitColor', T.accent, 0);
      s.sfx(stop2, 'stop', { pan: panX(railX(1)) * 0.6 });
      const dim = stop2 + 1.8;
      for (const id of ['service', 'slot', 'reqLane', 'resLane', 'net']) s.set(dim, id, 'alpha', 0.35, 0.8);
      const emph = stop2 + 4.0;
      s.set(emph, 'rail', 'capGlow', 1, 0.15); s.set(emph + 0.15, 'rail', 'capGlow', 0.35, 0.9);
      s.sfx(emph, 'ack', { note: 'C5', gain: 0.8, pan: panX(railX(1)) * 0.6 });
      s.fade(37.0, 1, 1.0);
    },
  });
})();

