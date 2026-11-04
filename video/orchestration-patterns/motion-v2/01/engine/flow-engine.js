/* flow-engine.js — deterministic canvas engine for architecture flow explainer videos.
 * Every frame is a pure function of time t, so preview and render always match.
 * A scene calls FlowVideo.scene({ meta, build(s) }) and schedules everything up front.
 * Teaching is visual + audio only: there is deliberately no caption/narration API.
 * meta.speed scales playback (0.8 = 20% slower); scene times stay authored at speed 1.
 */
(function () {
  const THEME = {
    bg: '#050506', fg: '#E6E8EC', mid: '#8B9099', dim: '#3A3E45', wire: '#4A4F57',
    title: '#FFD60A', accent: '#F5A524', ok: '#3FB68B', bad: '#E5484D', info: '#4C9AFF',
    font: '"SF Pro Display","Inter","Helvetica Neue",Arial,sans-serif',
    mono: '"SF Mono","JetBrains Mono",Menlo,monospace',
  };

  const EASE = {
    linear: (k) => k,
    inOut: (k) => (k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2),
    out: (k) => 1 - Math.pow(1 - k, 3),
    in: (k) => k * k * k,
    back: (k) => 1 + 2.70158 * Math.pow(k - 1, 3) + 1.70158 * Math.pow(k - 1, 2),
  };
  const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
  const lerp = (a, b, k) => a + (b - a) * k;
  function hexRgb(h) {
    h = h.replace('#', '');
    if (h.length === 3) h = h.split('').map((c) => c + c).join('');
    const n = parseInt(h, 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }
  function mixColor(a, b, k) {
    const A = hexRgb(a), B = hexRgb(b);
    return '#' + A.map((v, i) => Math.round(lerp(v, B[i], k)).toString(16).padStart(2, '0')).join('');
  }
  function mix(a, b, k) {
    if (typeof a === 'number' && typeof b === 'number') return lerp(a, b, k);
    if (typeof a === 'string' && typeof b === 'string' && a[0] === '#' && b[0] === '#') return mixColor(a, b, k);
    return k < 1 ? a : b;
  }

  /* ---------- property timeline ---------- */
  class Track {
    constructor() { this.events = {}; }
    set(t, key, v, dur = 0.25, ease = 'inOut') {
      (this.events[key] = this.events[key] || []).push({ t, v, dur, ease });
    }
    finalize() { for (const k in this.events) this.events[k].sort((a, b) => a.t - b.t); }
    get(key, t, def) {
      const ev = this.events[key];
      let v = def;
      if (!ev) return v;
      for (const e of ev) {
        if (e.t > t) break;
        const k = e.dur > 0 ? clamp((t - e.t) / e.dur) : 1;
        v = mix(v, e.v, EASE[e.ease](k));
      }
      return v;
    }
  }

  /* ---------- drawing helpers ---------- */
  function rr(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }
  function glow(ctx, color, amount) {
    ctx.shadowColor = color;
    ctx.shadowBlur = amount;
  }
  function noGlow(ctx) { ctx.shadowBlur = 0; }
  function text(ctx, str, x, y, { size = 32, weight = 600, color = THEME.fg, align = 'center', font = THEME.font, spacing = 0, baseline = 'middle' } = {}) {
    ctx.font = weight + ' ' + size + 'px ' + font;
    ctx.fillStyle = color;
    ctx.textAlign = align;
    ctx.textBaseline = baseline;
    if (spacing) {
      try { ctx.letterSpacing = spacing + 'px'; } catch (e) {}
    }
    ctx.fillText(str, x, y);
    if (spacing) { try { ctx.letterSpacing = '0px'; } catch (e) {} }
  }
  function wrap(ctx, str, maxW) {
    const words = String(str).split(' ');
    const lines = [];
    let cur = '';
    for (const w of words) {
      const test = cur ? cur + ' ' + w : w;
      if (ctx.measureText(test).width > maxW && cur) { lines.push(cur); cur = w; } else cur = test;
    }
    if (cur) lines.push(cur);
    return lines;
  }

  /* ---------- node renderers ---------- */
  // Each renderer gets (ctx, node, p) where p(prop, default) reads the animated value.
  const NODES = {
    phone(ctx, n, p) {
      const w = 76, h = 124, x = n.x - w / 2, y = n.y - h / 2;
      const c = p('color', THEME.mid);
      ctx.strokeStyle = c; ctx.lineWidth = 4; glow(ctx, c, 18 * p('glow', 0));
      rr(ctx, x, y, w, h, 16); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(n.x - 12, y + 16); ctx.lineTo(n.x + 12, y + 16);
      ctx.moveTo(n.x - 12, y + h - 16); ctx.lineTo(n.x + 12, y + h - 16); ctx.stroke(); noGlow(ctx);
    },
    laptop(ctx, n, p) {
      const w = 156, h = 100, x = n.x - w / 2, y = n.y - h / 2 - 8;
      const c = p('color', THEME.mid);
      ctx.strokeStyle = c; ctx.lineWidth = 4; ctx.lineJoin = 'round'; glow(ctx, c, 18 * p('glow', 0));
      rr(ctx, x, y, w, h, 12); ctx.stroke();
      rr(ctx, x + 14, y + 12, w - 28, h - 24, 6); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(x - 4, y + h + 4); ctx.lineTo(x + w + 4, y + h + 4);
      ctx.lineTo(x + w + 20, y + h + 16); ctx.lineTo(x - 20, y + h + 16); ctx.closePath(); ctx.stroke(); noGlow(ctx);
    },
    // Labelled box with optional bottom ports and a round-robin style chevron pointer.
    box(ctx, n, p) {
      const w = n.w || 340, h = n.h || 136, x = n.x - w / 2, y = n.y - h / 2;
      const c = p('color', THEME.mid);
      ctx.strokeStyle = c; ctx.lineWidth = 4; glow(ctx, c, 22 * p('glow', 0));
      ctx.fillStyle = THEME.bg; rr(ctx, x, y, w, h, 22); ctx.fill(); ctx.stroke(); noGlow(ctx);
      text(ctx, p('label', n.label || ''), n.x, y + (n.ports ? 48 : h / 2 - (n.sublabel ? 14 : 0)), { size: n.labelSize || 36, color: p('labelColor', THEME.fg) });
      const sub = p('sublabel', n.sublabel || '');
      if (sub) text(ctx, sub, n.x, y + (n.ports ? 84 : h / 2 + 26), { size: 24, weight: 500, color: p('subColor', THEME.mid) });
      if (n.ports) {
        const pts = NODES.box.ports(n);
        pts.forEach((pt, i) => {
          const pc = p('port' + i, THEME.dim);
          ctx.strokeStyle = pc; ctx.fillStyle = THEME.bg; ctx.lineWidth = 4; glow(ctx, pc, pc === THEME.dim ? 0 : 12);
          ctx.beginPath(); ctx.arc(pt[0], pt[1], 12, 0, Math.PI * 2); ctx.fill(); ctx.stroke(); noGlow(ctx);
        });
        const ptr = p('pointer', -1);
        if (ptr >= 0) {
          const i0 = Math.floor(ptr), i1 = Math.min(pts.length - 1, i0 + 1), k = ptr - i0;
          const px = lerp(pts[i0][0], pts[i1][0], k), py = pts[0][1] - 34;
          ctx.strokeStyle = p('pointerColor', THEME.accent); ctx.lineWidth = 4; ctx.lineCap = 'round';
          ctx.beginPath(); ctx.moveTo(px - 15, py - 7); ctx.lineTo(px, py + 7); ctx.lineTo(px + 15, py - 7); ctx.stroke();
        }
      }
    },
    // Server rack: n slots; each slot has stroke colour, status dot and a work bar.
    rack(ctx, n, p) {
      const slots = n.slots || 3, w = 204, sh = 46, gap = 10;
      const x = n.x - w / 2, y0 = n.y - (slots * sh + (slots - 1) * gap) / 2;
      const failed = p('failed', 0);
      for (let i = 0; i < slots; i++) {
        const y = y0 + i * (sh + gap);
        let sc = p('slot' + i + 'Stroke', THEME.dim), dc = p('slot' + i + 'Dot', THEME.dim);
        const bar = p('slot' + i + 'Bar', 0), bc = p('slot' + i + 'BarColor', THEME.accent);
        if (failed > 0) { sc = mixColor(sc, THEME.bad, failed); dc = mixColor(dc, THEME.bad, failed); }
        ctx.strokeStyle = sc; ctx.lineWidth = 4; glow(ctx, sc, sc === THEME.fg ? 10 : 0);
        rr(ctx, x, y, w, sh, 10); ctx.fillStyle = THEME.bg; ctx.fill(); ctx.stroke(); noGlow(ctx);
        ctx.strokeStyle = dc; ctx.lineWidth = 3.5;
        ctx.beginPath(); ctx.arc(x + 26, y + sh / 2, 7, 0, Math.PI * 2); ctx.stroke();
        if (bar > 0.01) {
          ctx.strokeStyle = bc; ctx.lineWidth = 4; ctx.lineCap = 'round';
          ctx.beginPath(); ctx.moveTo(x + 46, y + sh / 2); ctx.lineTo(x + 46 + (w - 90) * bar, y + sh / 2); ctx.stroke();
        }
      }
      if (failed > 0.01) {
        ctx.globalAlpha *= failed;
        const cy = n.y, sc = Math.max(0.01, EASE.back(failed));
        ctx.save(); ctx.translate(n.x, cy); ctx.scale(sc, sc); ctx.translate(-n.x, -cy);
        ctx.strokeStyle = THEME.bad; ctx.fillStyle = THEME.bg; ctx.lineWidth = 4;
        glow(ctx, THEME.bad, 16);
        ctx.beginPath(); ctx.arc(n.x, cy, 22, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(n.x - 9, cy - 9); ctx.lineTo(n.x + 9, cy + 9); ctx.moveTo(n.x + 9, cy - 9); ctx.lineTo(n.x - 9, cy + 9); ctx.stroke();
        noGlow(ctx); ctx.restore();
        ctx.globalAlpha /= failed;
      }
      const rl = p('label', n.label || '');
      if (rl) text(ctx, rl, n.x, y0 + slots * (sh + gap) + 52, { size: 32, weight: 500, color: failed > 0.5 ? THEME.bad : p('labelColor', THEME.mid) });
    },
    // Database cylinder.
    db(ctx, n, p) {
      const w = n.w || 190, h = n.h || 170, rx = w / 2, ry = 24, x = n.x, top = n.y - h / 2 + ry, bot = n.y + h / 2 - ry;
      const c = p('color', THEME.mid);
      ctx.strokeStyle = c; ctx.lineWidth = 4; glow(ctx, c, 22 * p('glow', 0)); ctx.fillStyle = THEME.bg;
      ctx.beginPath(); ctx.ellipse(x, bot, rx, ry, 0, 0, Math.PI); ctx.lineTo(x - rx, top); ctx.ellipse(x, top, rx, ry, 0, Math.PI, 0, true); ctx.lineTo(x + rx, bot); ctx.fill(); ctx.stroke();
      ctx.beginPath(); ctx.ellipse(x, top, rx, ry, 0, 0, Math.PI * 2); ctx.stroke();
      for (const f of [1 / 3, 2 / 3]) { const yy = lerp(top, bot, f); ctx.beginPath(); ctx.ellipse(x, yy, rx, ry, 0, 0, Math.PI); ctx.stroke(); }
      noGlow(ctx);
      const busy = p('busy', 0);
      if (busy > 0.01) { // spinner on the front face
        ctx.globalAlpha *= busy; ctx.strokeStyle = THEME.accent; ctx.lineWidth = 5; ctx.lineCap = 'round';
        const a = (p('_t', 0) * 6) % (Math.PI * 2);
        ctx.beginPath(); ctx.arc(x, n.y + 12, 18, a, a + 4); ctx.stroke(); ctx.globalAlpha /= busy;
      }
      const dl = p('label', n.label || '');
      if (dl) text(ctx, dl, x, n.y + h / 2 + 44, { size: 32, weight: 500, color: p('labelColor', THEME.mid) });
      const sub = p('sublabel', '');
      if (sub) text(ctx, sub, x, n.y + h / 2 + 84, { size: 26, weight: 500, color: p('subColor', THEME.mid), font: THEME.mono });
    },
    // Key/value store (cache, queue, table): rows with text, colour and a fill bar (TTL, progress).
    store(ctx, n, p) {
      const rows = n.rows || 3, w = n.w || 300, rh = 54, gap = 12, pad = 22, head = 0;
      const h = rows * rh + (rows - 1) * gap + pad * 2 + head, x = n.x - w / 2, y = n.y - h / 2;
      const c = p('color', THEME.mid);
      ctx.strokeStyle = c; ctx.lineWidth = 4; glow(ctx, c, 22 * p('glow', 0));
      ctx.fillStyle = THEME.bg; rr(ctx, x, y, w, h, 22); ctx.fill(); ctx.stroke(); noGlow(ctx);
      for (let i = 0; i < rows; i++) {
        const ry = y + pad + head + i * (rh + gap), rx = x + pad, rw = w - pad * 2;
        const a = p('row' + i + 'Alpha', 1), rc = p('row' + i + 'Color', THEME.dim);
        ctx.strokeStyle = THEME.dim; ctx.lineWidth = 3; rr(ctx, rx, ry, rw, rh, 10); ctx.stroke();
        const txt = p('row' + i + 'Text', '');
        if (!txt || a <= 0.01) continue;
        ctx.globalAlpha *= a;
        ctx.strokeStyle = rc; ctx.lineWidth = 4; glow(ctx, rc, rc === THEME.dim ? 0 : 10); rr(ctx, rx, ry, rw, rh, 10); ctx.stroke(); noGlow(ctx);
        text(ctx, txt, rx + 22, ry + rh / 2 - 4, { size: 26, weight: 600, align: 'left', font: THEME.mono, color: THEME.fg });
        const f = p('row' + i + 'Fill', 0);
        if (f > 0.005) {
          ctx.strokeStyle = rc; ctx.lineWidth = 4; ctx.lineCap = 'round';
          ctx.beginPath(); ctx.moveTo(rx + 22, ry + rh - 10); ctx.lineTo(rx + 22 + (rw - 44) * f, ry + rh - 10); ctx.stroke();
        }
        ctx.globalAlpha /= a;
      }
      const sl = p('label', n.label || '');
      if (sl) text(ctx, sl, n.x, y + h + 44, { size: 32, weight: 500, color: p('labelColor', THEME.mid) });
      const sub = p('sublabel', '');
      if (sub) text(ctx, sub, n.x, y + h + 84, { size: 26, weight: 500, color: p('subColor', THEME.mid), font: THEME.mono });
    },
    // Floating pill badge, e.g. latency, status, counters.
    badge(ctx, n, p) {
      const s = p('text', ''), c = p('color', THEME.mid);
      if (!s) return;
      ctx.font = '700 30px ' + THEME.mono;
      const w = ctx.measureText(s).width + 44, h = 54;
      const sc = p('scale', 1);
      ctx.save(); ctx.translate(n.x, n.y); ctx.scale(sc, sc);
      ctx.strokeStyle = c; ctx.lineWidth = 3.5; ctx.fillStyle = THEME.bg; glow(ctx, c, 14);
      rr(ctx, -w / 2, -h / 2, w, h, h / 2); ctx.fill(); ctx.stroke(); noGlow(ctx);
      text(ctx, s, 0, 2, { size: 30, weight: 700, font: THEME.mono, color: c });
      ctx.restore();
    },
    label(ctx, n, p) {
      text(ctx, p('text', n.text || ''), n.x, n.y, { size: n.size || 30, weight: n.weight || 500, color: p('color', THEME.mid), font: n.mono ? THEME.mono : THEME.font });
    },
    // Clock face: hands advance with prop 'time' (in hours; tween it to show time passing).
    // Horizontal bar: proportions (segments side by side) or progress toward a fixed end (one segment + ticks).
    // Event marks above it come from s.mark().
    bar(ctx, n, p) {
      const w = n.w || 300, h = n.h || 14, x = n.x - w / 2, y = n.y - h / 2, segs = n.segments || 1;
      const PAL = [THEME.mid, THEME.accent, THEME.ok, THEME.info, THEME.bad];
      ctx.strokeStyle = p('color', THEME.dim); ctx.lineWidth = 3; rr(ctx, x, y, w, h, h / 2); ctx.stroke();
      ctx.save(); rr(ctx, x, y, w, h, h / 2); ctx.clip();
      let acc = 0;
      for (let i = 0; i < segs; i++) {
        const v = clamp(p('seg' + i, 0), 0, 1 - acc);
        if (v > 0.001) { ctx.fillStyle = p('seg' + i + 'Color', PAL[i % PAL.length]); ctx.fillRect(x + acc * w, y, v * w, h); }
        acc += v;
      }
      ctx.restore();
      if (n.ticks) {
        ctx.strokeStyle = p('color', THEME.dim); ctx.lineWidth = 3;
        for (const tx of [x - 8, x + w + 8]) { ctx.beginPath(); ctx.moveTo(tx, y - 12); ctx.lineTo(tx, y + h + 12); ctx.stroke(); }
      }
      const bl = p('label', n.label || '');
      if (bl) text(ctx, bl, n.x, y + h + 38, { size: 26, weight: 500, color: p('labelColor', THEME.mid) });
    },
    clock(ctx, n, p) {
      const r = n.r || 34, c = p('color', THEME.mid), h = p('time', 0);
      ctx.strokeStyle = c; ctx.lineWidth = 4; ctx.lineCap = 'round'; glow(ctx, c, 14 * p('glow', 0));
      ctx.beginPath(); ctx.arc(n.x, n.y, r, 0, Math.PI * 2); ctx.stroke();
      const hand = (ang, len) => { ctx.beginPath(); ctx.moveTo(n.x, n.y); ctx.lineTo(n.x + Math.sin(ang) * len, n.y - Math.cos(ang) * len); ctx.stroke(); };
      hand((h * Math.PI * 2) / 12, r * 0.5); hand(h * Math.PI * 2, r * 0.78); noGlow(ctx);
    },
  };
  NODES.box.ports = (n) => {
    const w = n.w || 340, h = n.h || 136, k = n.ports, span = n.portSpan || 180;
    return Array.from({ length: k }, (_, i) => [n.x + (k === 1 ? 0 : -span / 2 + (span * i) / (k - 1)), n.y + h / 2]);
  };

  /* ---------- local extensions (orchestration-patterns motion-v2/01): lane, panel, axis ---------- */
  // Small status mark: 'open' circle, 'check' or 'x', popping in with k (0..1).
  function statusMark(ctx, cx, cy, kind, k, color, r = 22) {
    if (!kind || k <= 0.01) return;
    const sc = kind === 'open' ? 1 : Math.max(0.01, EASE.back(clamp(k)));
    ctx.save(); ctx.globalAlpha *= Math.min(1, k * 2); ctx.translate(cx, cy); ctx.scale(sc, sc);
    ctx.strokeStyle = color; ctx.lineWidth = 4.5; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    if (kind !== 'open') glow(ctx, color, 12);
    ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI * 2); ctx.stroke();
    const q = r * 0.42;
    ctx.beginPath();
    if (kind === 'check') { ctx.moveTo(-q, 0); ctx.lineTo(-q * 0.25, q * 0.8); ctx.lineTo(q, -q * 0.8); }
    else if (kind === 'x') { ctx.moveTo(-q, -q); ctx.lineTo(q, q); ctx.moveTo(q, -q); ctx.lineTo(-q, q); }
    ctx.stroke(); noGlow(ctx); ctx.restore();
  }
  // Outlined ID pill (fill 0..1 turns it solid). Returns its width.
  function idPill(ctx, s, x, cy, { size = 44, color = THEME.info, fill = 0, dashed = false, align = 'left' } = {}) {
    ctx.font = '700 ' + size + 'px ' + THEME.mono;
    const pw = ctx.measureText(s).width + size * 0.7, ph = size * 1.25, px = align === 'right' ? x - pw : align === 'center' ? x - pw / 2 : x;
    rr(ctx, px, cy - ph / 2, pw, ph, ph / 2);
    ctx.fillStyle = THEME.bg; ctx.fill();
    if (fill > 0.01) { ctx.save(); ctx.globalAlpha *= fill; ctx.fillStyle = color; ctx.fill(); ctx.restore(); }
    ctx.strokeStyle = color; ctx.lineWidth = 3.5; if (dashed && fill < 0.5) ctx.setLineDash([8, 7]);
    ctx.stroke(); ctx.setLineDash([]);
    text(ctx, s, px + pw / 2, cy + 2, { size, weight: 700, font: THEME.mono, color: fill > 0.5 ? THEME.bg : color });
    return pw;
  }
  // Lane: one step's execution interval on a time track. Name above-left; an input socket pill on the right
  // (pill, pillColor, pillFill, pillAlpha); status text (text, textColor); progress fill (fill, fillColor, fillAlpha);
  // outline color/glow/dashed.
  NODES.lane = function (ctx, n, p) {
    const w = n.w || 260, h = n.h || 76, x = n.x - w / 2, y = n.y - h / 2;
    if (n.track) {
      ctx.strokeStyle = THEME.dim; ctx.lineWidth = 2; ctx.setLineDash([2, 10]);
      ctx.beginPath(); ctx.moveTo(n.track[0], n.y); ctx.lineTo(n.track[1], n.y); ctx.stroke(); ctx.setLineDash([]);
    }
    const nm = p('name', n.name || '');
    if (nm) text(ctx, nm, n.nameAlign === 'right' ? x + w : n.nameX !== undefined ? n.nameX : x, y - 36, { size: n.nameSize || 48, weight: 700, align: n.nameAlign || 'left', color: p('nameColor', THEME.fg) });
    const c = p('color', THEME.mid);
    ctx.fillStyle = THEME.bg; rr(ctx, x, y, w, h, 14); ctx.fill();
    const f = clamp(p('fill', 0));
    if (f > 0.002) {
      ctx.save(); rr(ctx, x, y, w, h, 14); ctx.clip(); ctx.globalAlpha *= p('fillAlpha', 0.3);
      ctx.fillStyle = p('fillColor', THEME.accent); ctx.fillRect(x, y, w * f, h); ctx.restore();
    }
    ctx.strokeStyle = c; ctx.lineWidth = 4; glow(ctx, c, 22 * p('glow', 0));
    if (p('dashed', 0) > 0.5) ctx.setLineDash([14, 10]);
    rr(ctx, x, y, w, h, 14); ctx.stroke(); ctx.setLineDash([]); noGlow(ctx);
    const pill = p('pill', ''), pa = p('pillAlpha', 1), tx = p('text', ''), ts = n.textSize || 46;
    if (pill && pa > 0.01) {
      if (tx) text(ctx, tx, x + 20, n.y + 1, { size: ts, weight: 600, align: 'left', color: p('textColor', THEME.mid) });
      ctx.save(); ctx.globalAlpha *= pa;
      idPill(ctx, pill, x + w - 14, n.y, { size: n.pillSize || 42, color: p('pillColor', THEME.info), fill: p('pillFill', 0), dashed: true, align: 'right' });
      ctx.restore();
    } else if (tx) text(ctx, tx, n.x, n.y + 1, { size: ts, weight: 600, color: p('textColor', THEME.mid) });
  };
  // Panel: outlined card with a header (title, titleColor), a right-hand tag pill (tag, tagColor, tagK pop) and rows.
  // n.rows = [{ x, y, w, h, markLeft, size, mono }] (offsets from the panel's top-left). Per row i:
  // row{i}Text, row{i}Reveal (0..1 characters), row{i}Color, row{i}Alpha, row{i}Slot (dashed outline 0..1),
  // row{i}Hl (lit outline 0..1) + row{i}HlColor, row{i}Mark ('open'|'check'|'x') + row{i}MarkK + row{i}MarkColor,
  // row{i}Pill (ID pill before the text) + row{i}PillColor.
  NODES.panel = function (ctx, n, p) {
    const w = n.w || 900, h = n.h || 400, x = n.x - w / 2, y = n.y - h / 2;
    const c = p('color', THEME.dim);
    ctx.fillStyle = THEME.bg; ctx.strokeStyle = c; ctx.lineWidth = 4; glow(ctx, c, 22 * p('glow', 0));
    rr(ctx, x, y, w, h, 22); ctx.fill(); ctx.stroke(); noGlow(ctx);
    const hy = y + (n.headY || 60);
    const title = p('title', n.title || '');
    if (title) text(ctx, title, x + 36, hy, { size: n.titleSize || 48, weight: 700, align: 'left', color: p('titleColor', THEME.fg) });
    const tag = p('tag', ''), tk = p('tagK', 1);
    if (tag && tk > 0.01) {
      const sc = Math.max(0.01, EASE.back(clamp(tk)));
      ctx.save(); ctx.globalAlpha *= Math.min(1, tk * 2); ctx.translate(x + w - 30, hy); ctx.scale(sc, sc);
      idPill(ctx, tag, 0, 0, { size: n.tagSize || 42, color: p('tagColor', THEME.mid), align: 'right' });
      ctx.restore();
    }
    (n.rows || []).forEach((r, i) => {
      const rx = x + r.x, rw = r.w, rh = r.h || 76, cy = y + r.y, ry = cy - rh / 2;
      const slot = p('row' + i + 'Slot', 0);
      if (slot > 0.01) {
        ctx.save(); ctx.globalAlpha *= slot; ctx.strokeStyle = THEME.dim; ctx.lineWidth = 3; ctx.setLineDash([12, 9]);
        rr(ctx, rx, ry, rw, rh, 12); ctx.stroke(); ctx.restore();
      }
      const hl = p('row' + i + 'Hl', 0);
      if (hl > 0.01) {
        const hc = p('row' + i + 'HlColor', THEME.fg);
        ctx.save(); ctx.globalAlpha *= hl; ctx.strokeStyle = hc; ctx.lineWidth = 4; glow(ctx, hc, 14);
        rr(ctx, rx, ry, rw, rh, 12); ctx.stroke(); noGlow(ctx); ctx.restore();
      }
      const mk = p('row' + i + 'Mark', ''), mcx = r.markLeft ? rx + 40 : rx + rw - 44;
      statusMark(ctx, mcx, cy, mk, p('row' + i + 'MarkK', mk ? 1 : 0), p('row' + i + 'MarkColor', THEME.mid));
      const a = p('row' + i + 'Alpha', 1);
      if (a <= 0.01) return;
      ctx.save(); ctx.globalAlpha *= a;
      let tx = rx + (r.markLeft ? 84 : 24);
      const pill = p('row' + i + 'Pill', '');
      if (pill) tx += idPill(ctx, pill, tx, cy, { size: (r.size || 50) - 6, color: p('row' + i + 'PillColor', THEME.accent) }) + 18;
      const full = String(p('row' + i + 'Text', '')), rev = clamp(p('row' + i + 'Reveal', 1));
      const shown = full.slice(0, Math.round(full.length * rev));
      if (shown) text(ctx, shown, tx, cy + 2, { size: r.size || 50, weight: 600, align: 'left', font: r.mono === false ? THEME.font : THEME.mono, color: p('row' + i + 'Color', THEME.fg) });
      ctx.restore();
    });
  };
  // Axis: a time arrow from n.x0 to n.x1 at n.y with highlighted spans n.segs = [[x0, x1], ...]
  // (seg{i} 0..1 draws the span, seg{i}Color) and a label (label, labelColor) at n.labelX/labelY.
  NODES.axis = function (ctx, n, p) {
    const c = p('color', THEME.dim), y = n.y;
    ctx.strokeStyle = c; ctx.fillStyle = c; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(n.x0, y); ctx.lineTo(n.x1 - 6, y); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(n.x1 + 4, y); ctx.lineTo(n.x1 - 18, y - 11); ctx.lineTo(n.x1 - 18, y + 11); ctx.closePath(); ctx.fill();
    (n.segs || []).forEach((sg, i) => {
      const k = clamp(p('seg' + i, 0));
      if (k <= 0.01) return;
      const sc = p('seg' + i + 'Color', THEME.fg);
      ctx.strokeStyle = sc; ctx.lineWidth = 10; ctx.lineCap = 'round'; glow(ctx, sc, 12);
      ctx.beginPath(); ctx.moveTo(sg[0], y); ctx.lineTo(lerp(sg[0], sg[1], k), y); ctx.stroke(); noGlow(ctx);
    });
    const lb = p('label', n.label || '');
    if (lb) text(ctx, lb, n.labelX !== undefined ? n.labelX : n.x1, n.labelY !== undefined ? n.labelY : y + 44, { size: n.labelSize || 44, weight: 600, align: n.labelAlign || 'right', color: p('labelColor', THEME.mid) });
  };

  /* ---------- packets ---------- */
  function polyAt(pts, k) {
    const segs = [];
    let total = 0;
    for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); segs.push(d); total += d; }
    let dist = k * total;
    for (let i = 0; i < segs.length; i++) {
      if (dist <= segs[i] || i === segs.length - 1) {
        const f = segs[i] ? clamp(dist / segs[i]) : 0;
        return [lerp(pts[i][0], pts[i + 1][0], f), lerp(pts[i][1], pts[i + 1][1], f)];
      }
      dist -= segs[i];
    }
    return pts[pts.length - 1];
  }
  function drawPacket(ctx, pk, x, y, alpha) {
    ctx.save(); ctx.globalAlpha = alpha; ctx.translate(x, y);
    const c = pk.color || THEME.fg;
    if (pk.kind === 'dot') {
      ctx.fillStyle = c; glow(ctx, c, 16); ctx.beginPath(); ctx.arc(0, 0, 10, 0, Math.PI * 2); ctx.fill();
    } else if (pk.kind === 'chip') {
      const fs = pk.size || 26;
      ctx.font = '700 ' + fs + 'px ' + THEME.mono;
      const w = ctx.measureText(pk.label).width + fs * 1.3, h = fs * 1.8;
      ctx.fillStyle = THEME.bg; ctx.strokeStyle = c; ctx.lineWidth = 3.5; glow(ctx, c, 14);
      rr(ctx, -w / 2, -h / 2, w, h, h / 2); ctx.fill(); ctx.stroke(); noGlow(ctx);
      text(ctx, pk.label, 0, 2, { size: fs, weight: 700, font: THEME.mono, color: c });
    } else { // envelope
      const w = 76, h = 52;
      ctx.fillStyle = THEME.bg; ctx.strokeStyle = c; ctx.lineWidth = 4; ctx.lineJoin = 'round'; glow(ctx, c, 10);
      rr(ctx, -w / 2, -h / 2, w, h, 7); ctx.fill(); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(-w / 2 + 6, -h / 2 + 6); ctx.lineTo(0, 6); ctx.lineTo(w / 2 - 6, -h / 2 + 6); ctx.stroke(); noGlow(ctx);
      if (pk.label) text(ctx, pk.label, 0, h / 2 + 24, { size: 22, weight: 700, font: THEME.mono, color: c });
    }
    ctx.restore();
  }

  /* ---------- scene builder ---------- */
  function createScene(def) {
    const meta = Object.assign({ width: 1080, height: 1920, fps: 30, duration: 18, title: '', subtitle: '', speed: 1 }, def.meta || {}, def.metaOverride || {});
    const track = new Track();
    const nodes = {}, order = [], wires = [], packets = [], shakes = [], ripples = [], cues = [], sounds = {}, marks = [];
    const s = {
      THEME, meta,
      node(id, type, opts = {}) { nodes[id] = Object.assign({ id, type }, opts); order.push(id); return nodes[id]; },
      set(t, id, prop, v, dur = 0.25, ease = 'inOut') { track.set(t, id + '.' + prop, v, dur, ease); },
      // Anchor points: 'id' (centre), 'id.top|bottom|left|right', 'id.port2', or a raw [x, y].
      pt(ref) {
        if (Array.isArray(ref)) return ref;
        const [id, a] = ref.split('.');
        const n = nodes[id];
        if (!n) throw new Error('unknown node ' + id);
        const half = { lane: [(n.w || 260) / 2, (n.h || 76) / 2], panel: [(n.w || 900) / 2, (n.h || 400) / 2], axis: [0, 0], phone: [38, 62], laptop: [96, 66], box: [(n.w || 340) / 2, (n.h || 136) / 2], rack: [102, 84], db: [(n.w || 190) / 2, (n.h || 170) / 2], store: [(n.w || 300) / 2, ((n.rows || 3) * 66 + 32) / 2], badge: [60, 27], label: [0, 0], clock: [n.r || 34, n.r || 34], bar: [(n.w || 300) / 2, (n.h || 14) / 2] }[n.type] || [0, 0];
        if (!a) return [n.x, n.y];
        if (a.startsWith('port')) return NODES.box.ports(n)[+a.slice(4)];
        const off = n.anchorPad || 6;
        return { top: [n.x, n.y - half[1] - off], bottom: [n.x, n.y + half[1] + off], left: [n.x - half[0] - off, n.y], right: [n.x + half[0] + off, n.y] }[a];
      },
      wire(id, from, to, opts = {}) { const w = Object.assign({ id, from, to, via: opts.via || [] }, opts); wires.push(w); return w; },
      // Move a packet along a route of anchors between t and t + dur.
      packet(opts) { packets.push(Object.assign({ kind: 'envelope', dur: 0.6, ease: 'inOut', fade: 0.12 }, opts)); },
      // Damped jolt of a node (crash, rejection). amp in px.
      shake(t, id, amp = 14, dur = 0.45, axis = 'x') { shakes.push({ t, id, amp, dur, axis }); },
      // Expanding ring at an anchor (arrival, health-check result).
      ripple(t, at, color, opts = {}) { ripples.push(Object.assign({ t, at, color: color || THEME.fg, r0: 12, r1: 70, dur: 0.6, mark: null }, opts)); },
      // Sound cue. name = preset in sfx.js; opts: note, gain, pan (-1..1), override (partial preset).
      sfx(t, name, opts = {}) { cues.push(Object.assign({ t, name }, opts)); },
      // Pan helper: stereo position from an anchor's x.
      panOf(ref) { return ((s.pt(ref)[0] - meta.width / 2) / (meta.width / 2)) * 0.6; },
      // Define or tweak a sound preset for this scene (deep-merged over sfx.js).
      sound(name, def) { sounds[name] = def; },
      // Event mark above a bar at position pos (0..1 along it); stays until clearMarks.
      mark(t, barId, pos, color) { marks.push({ t, barId, pos, color: color || THEME.fg, until: Infinity }); },
      clearMarks(t, barId) { for (const m of marks) if (m.barId === barId && m.t <= t && m.until === Infinity) m.until = t; },
      // Fade the stage (everything below the title band) to black (1) or back (0).
      // Use it to close a story that does not return to its opening state, so the video can still loop.
      fade(t, to, dur = 0.6) { s.set(t, 'stage', 'veil', to, dur); },
      // Convenience for rack slot states.
      slot(t, id, i, state, dur = 0.2) {
        const S = {
          idle: { Stroke: THEME.dim, Dot: THEME.dim, Bar: 0 },
          busy: { Stroke: THEME.fg, Dot: THEME.accent, Bar: 1, BarColor: THEME.accent },
          done: { Stroke: THEME.ok, Dot: THEME.ok, Bar: 0 },
          lost: { Stroke: THEME.bad, Dot: THEME.bad, Bar: 0 },
        }[state];
        for (const k in S) s.set(t, id, 'slot' + i + k, S[k], k === 'Bar' && state === 'busy' ? 0.5 : dur);
      },
      // Brief glow. With a colour, the node flashes that colour and then returns to the colour it had at t.
      pulse(t, id, color, dur = 0.5) {
        s.set(t, id, 'glow', 1, 0.12); s.set(t + 0.12, id, 'glow', 0, dur);
        if (color) {
          track.finalize();
          const prev = track.get(id + '.color', t, nodes[id] && nodes[id].color !== undefined ? nodes[id].color : THEME.mid);
          s.set(t, id, 'color', color, 0.12); s.set(t + 0.12 + dur, id, 'color', prev, 0.3);
        }
      },
    };
    def.build(s);
    meta.renderDuration = meta.duration / meta.speed;
    track.finalize();

    function shakeOffset(id, t) {
      let dx = 0, dy = 0;
      for (const sh of shakes) {
        if (sh.id !== id || t < sh.t || t > sh.t + sh.dur) continue;
        const k = (t - sh.t) / sh.dur, v = sh.amp * Math.exp(-k * 4) * Math.sin(k * Math.PI * 2 * 4.5);
        if (sh.axis === 'y') dy += v; else dx += v;
      }
      return [dx, dy];
    }

    // draw(ctx, rt): rt is real (playback) time; scene time = rt * speed.
    function draw(ctx, rt) {
      const t = rt * meta.speed;
      const W = meta.width, H = meta.height;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.globalAlpha = 1; ctx.fillStyle = THEME.bg; ctx.fillRect(0, 0, W, H);
      if (meta.title) text(ctx, meta.title, W / 2, meta.titleY || 330, { size: meta.titleSize || 104, weight: 800, color: THEME.title });
      if (meta.subtitle) text(ctx, meta.subtitle, W / 2, meta.subtitleY || 405, { size: meta.subtitleSize || 28, weight: 700, color: THEME.mid, spacing: meta.subtitleSize ? 6 : 8 });
      // wires
      for (const w of wires) {
        const pts = [s.pt(w.from), ...w.via, s.pt(w.to)];
        const c = track.get('wire:' + w.id + '.color', t, w.color || THEME.wire);
        const a = track.get('wire:' + w.id + '.alpha', t, 1);
        if (a <= 0.01) continue;
        ctx.globalAlpha = a; ctx.strokeStyle = c; ctx.lineWidth = 4; ctx.lineCap = 'round';
        const dashed = track.get('wire:' + w.id + '.dashed', t, 0) > 0.5;
        const solid = track.get('wire:' + w.id + '.solid', t, 0) > 0.5;
        if (w.width) ctx.lineWidth = w.width;
        ctx.lineJoin = 'round';
        ctx.setLineDash(solid ? [] : dashed ? [12, 10] : [0.1, 13]); ctx.lineDashOffset = track.get('wire:' + w.id + '.flow', t, 0) * -t * 40;
        ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]); for (const q of pts.slice(1)) ctx.lineTo(q[0], q[1]); ctx.stroke();
        ctx.setLineDash([]); ctx.globalAlpha = 1;
        if (w.arrow) { // arrowhead at the end, in the wire colour
          const e = pts[pts.length - 1], b = pts[pts.length - 2], ang = Math.atan2(e[1] - b[1], e[0] - b[0]), L = w.arrow === true ? 20 : w.arrow;
          ctx.globalAlpha = a; ctx.fillStyle = c; ctx.beginPath(); ctx.moveTo(e[0], e[1]);
          ctx.lineTo(e[0] - L * Math.cos(ang - 0.45), e[1] - L * Math.sin(ang - 0.45)); ctx.lineTo(e[0] - L * Math.cos(ang + 0.45), e[1] - L * Math.sin(ang + 0.45));
          ctx.closePath(); ctx.fill(); ctx.globalAlpha = 1;
        }
      }
      // nodes
      for (const id of order) {
        const n = nodes[id];
        const p = (prop, def) => (prop === '_t' ? t : track.get(id + '.' + prop, t, n[prop] !== undefined && typeof n[prop] !== 'object' ? n[prop] : def));
        const a = p('alpha', 1);
        if (a <= 0.01) continue;
        const [dx, dy] = shakeOffset(id, t), sc = p('scale', 1);
        ctx.save(); ctx.globalAlpha = a; ctx.translate(n.x + dx, n.y + dy); ctx.scale(sc, sc); ctx.translate(-n.x, -n.y);
        NODES[n.type](ctx, n, p); ctx.restore();
      }
      // ripples
      for (const r of ripples) {
        if (t < r.t || t > r.t + r.dur) continue;
        const k = (t - r.t) / r.dur, [x, y] = s.pt(r.at);
        ctx.globalAlpha = (1 - k) * 0.9; ctx.strokeStyle = r.color; ctx.lineWidth = 3.5; glow(ctx, r.color, 10);
        ctx.beginPath(); ctx.arc(x, y, lerp(r.r0, r.r1, EASE.out(k)), 0, Math.PI * 2); ctx.stroke(); noGlow(ctx);
        if (r.mark) { // small status mark held at the anchor ('x' or 'check')
          ctx.globalAlpha = Math.min(1, (1 - k) * 2); ctx.lineWidth = 3.5; ctx.fillStyle = THEME.bg;
          ctx.beginPath(); ctx.arc(x, y, 13, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
          ctx.beginPath();
          if (r.mark === 'x') { ctx.moveTo(x - 5, y - 5); ctx.lineTo(x + 5, y + 5); ctx.moveTo(x + 5, y - 5); ctx.lineTo(x - 5, y + 5); }
          else { ctx.moveTo(x - 6, y); ctx.lineTo(x - 1, y + 5); ctx.lineTo(x + 6, y - 5); }
          ctx.stroke();
        }
        ctx.globalAlpha = 1;
      }
      // packets
      for (const pk of packets) {
        if (t < pk.t || t > pk.t + pk.dur) continue;
        const k = clamp((t - pk.t) / pk.dur);
        const route = pk.route.map((r) => s.pt(r));
        const [x, y] = polyAt(route, EASE[pk.ease](k));
        const fa = Math.min(1, k * pk.dur / pk.fade, (1 - k) * pk.dur / pk.fade);
        drawPacket(ctx, pk, x, y, clamp(fa));
      }
      // bar marks
      for (const m of marks) {
        if (t < m.t || t >= m.until) continue;
        const n = nodes[m.barId], w = n.w || 300, h = n.h || 14;
        const a = track.get(m.barId + '.alpha', t, n.alpha !== undefined ? n.alpha : 1) * clamp((t - m.t) / 0.15);
        if (a <= 0.01) continue;
        const mx = n.x - w / 2 + clamp(m.pos) * w, my = n.y - h / 2 - 16, r = 7 * (0.6 + 0.4 * EASE.back(clamp((t - m.t) / 0.25)));
        ctx.globalAlpha = a; ctx.fillStyle = m.color; glow(ctx, m.color, 10);
        ctx.beginPath(); ctx.arc(mx, my, r, 0, Math.PI * 2); ctx.fill(); noGlow(ctx); ctx.globalAlpha = 1;
      }
      // stage fade (keeps the title band visible)
      const veil = track.get('stage.veil', t, 0);
      if (veil > 0.001) { ctx.globalAlpha = veil; ctx.fillStyle = THEME.bg; ctx.fillRect(0, 440, W, H - 440); ctx.globalAlpha = 1; }
    }
    // Cues in real (playback) time, for the audio renderer.
    const audioCues = () => cues.map((c) => Object.assign({}, c, { t: c.t / meta.speed })).filter((c) => c.t < meta.renderDuration);
    return { meta, draw, s, audioCues, sounds };
  }

  // Browser: window.FlowVideo. Node (timing dry-runs): require() returns FlowVideo; a scene file then sets FlowVideo.lastScene.
  const root = typeof window !== 'undefined' ? window : globalThis;
  const api = { THEME, EASE, createScene, scene(def) { root.__sceneDef = def; api.lastScene = def; } };
  root.FlowVideo = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})();

