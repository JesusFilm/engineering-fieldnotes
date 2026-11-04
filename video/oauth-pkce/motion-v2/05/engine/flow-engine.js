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
      text(ctx, p('text', n.text || ''), n.x, n.y, { size: n.size || 30, weight: n.weight || 500, color: p('color', THEME.mid), font: n.mono ? THEME.mono : THEME.font, align: n.align || 'center', spacing: n.spacing || 0 }); // [cut-local] align, spacing
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
    // [cut-local extension] Panel: section frame with a legend cut into its top edge (left-aligned).
    // Opts: w h radius lineWidth labelSize labelX (absolute left x) fill (false = outline only) chrome (px: top bar with divider and window dots).
    // Props: color glow label labelColor.
    panel(ctx, n, p) {
      const w = n.w || 900, h = n.h || 300, x = n.x - w / 2, y = n.y - h / 2, c = p('color', THEME.mid);
      ctx.fillStyle = THEME.bg; ctx.strokeStyle = c; ctx.lineWidth = n.lineWidth || 5; glow(ctx, c, 22 * p('glow', 0));
      rr(ctx, x, y, w, h, n.radius || 30); if (n.fill !== false) ctx.fill(); ctx.stroke(); noGlow(ctx);
      if (n.chrome) {
        const cy = y + n.chrome; ctx.strokeStyle = mixColor(THEME.bg, c, 0.55); ctx.lineWidth = 3;
        ctx.beginPath(); ctx.moveTo(x + 3, cy); ctx.lineTo(x + w - 3, cy); ctx.stroke();
        for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.arc(x + w - 132 + i * 40, y + n.chrome / 2 + 6, 10, 0, Math.PI * 2); ctx.stroke(); }
      }
      const ls = n.labelSize || 48, str = p('label', n.label || ''), ly = n.labelBottom ? y + h : y; // [cut-local 04] labelBottom
      if (str) {
        ctx.font = '700 ' + ls + 'px ' + THEME.font;
        const tw = ctx.measureText(str).width, lx = n.labelX !== undefined ? n.labelX : x + 44;
        ctx.fillStyle = THEME.bg; ctx.fillRect(lx - 16, ly - ls / 2 - 4, tw + 32, ls + 8);
        text(ctx, str, lx, ly + 1, { size: ls, weight: 700, align: 'left', color: p('labelColor', THEME.fg) });
      }
    },
    // [cut-local extension] Field: a row with a key on the left and an optional tag on the right; dashed and empty until filled.
    // Opts: w h radius keySize tagSize phSize placeholder. Props: key keyColor color fill (0-1) hi (0-1 focus) hiColor tag tagColor tagA
    // placeholder phColor dashColor.
    field(ctx, n, p) {
      const w = n.w || 860, h = n.h || 84, x = n.x - w / 2, y = n.y - h / 2, r = n.radius || 18, ks = n.keySize || 52;
      const c = p('color', THEME.fg), f = p('fill', 0), hi = p('hi', 0), hc = p('hiColor', THEME.accent);
      if (f < 0.99) {
        ctx.save(); ctx.globalAlpha *= 1 - f; ctx.setLineDash([16, 12]); ctx.strokeStyle = p('dashColor', THEME.dim); ctx.lineWidth = 4;
        rr(ctx, x, y, w, h, r); ctx.stroke(); ctx.setLineDash([]);
        const ph = p('placeholder', n.placeholder || '');
        const phA = clamp(1 - f * 2) / Math.max(0.01, 1 - f); // placeholder text clears in the first half of a fill, so it never overlaps the key
        if (ph && phA > 0.01) { ctx.globalAlpha *= Math.min(1, phA); text(ctx, ph, x + 32, y + h / 2 + 2, { size: n.phSize || ks, weight: 600, align: 'left', color: p('phColor', THEME.dim) }); }
        ctx.restore();
      }
      if (f > 0.01) {
        ctx.save(); ctx.globalAlpha *= f;
        ctx.fillStyle = mixColor(THEME.bg, c, 0.13); rr(ctx, x, y, w, h, r); ctx.fill();
        ctx.strokeStyle = hi > 0.01 ? mixColor(c, hc, hi) : c; ctx.lineWidth = 4 + 3 * hi; glow(ctx, hi > 0.01 ? hc : c, 6 + 22 * hi);
        rr(ctx, x, y, w, h, r); ctx.stroke(); noGlow(ctx);
        const kA = clamp(f * 2 - 1) / Math.max(0.01, f); // key text arrives in the second half of a fill
        if (kA > 0.01) { ctx.globalAlpha *= Math.min(1, kA); text(ctx, p('key', n.key || ''), x + 32, y + h / 2 + 2, { size: ks, weight: 700, align: 'left', color: p('keyColor', THEME.fg) }); }
        ctx.restore();
      }
      const tg = p('tag', ''), ta = p('tagA', 0);
      if (tg && ta > 0.01) {
        const ts = n.tagSize || 40, tc = p('tagColor', THEME.mid);
        ctx.save(); ctx.globalAlpha *= ta; ctx.font = '700 ' + ts + 'px ' + THEME.font;
        const tw = ctx.measureText(tg).width + 36, th = ts + 22, tx = x + w - 18 - tw;
        ctx.fillStyle = THEME.bg; ctx.strokeStyle = tc; ctx.lineWidth = 3.5; rr(ctx, tx, y + (h - th) / 2, tw, th, th / 2); ctx.fill(); ctx.stroke();
        text(ctx, tg, tx + tw / 2, y + h / 2 + 2, { size: ts, weight: 700, color: tc });
        ctx.restore();
      }
    },
    // [cut-local extension] Status: pill with a state icon (idle ring, spinner while busy, check when done) and a label.
    // Opts: w h size. Props: text textColor color busy (0-1) done (0-1) glow.
    status(ctx, n, p) {
      const w = n.w || 400, h = n.h || 76, x = n.x - w / 2, y = n.y - h / 2, c = p('color', THEME.dim), sz = n.size || 40;
      ctx.fillStyle = THEME.bg; ctx.strokeStyle = c; ctx.lineWidth = 4; glow(ctx, c, 18 * p('glow', 0));
      rr(ctx, x, y, w, h, h / 2); ctx.fill(); ctx.stroke(); noGlow(ctx);
      const ix = x + 46, iy = n.y, busy = p('busy', 0), done = p('done', 0), fail = p('fail', 0); // [cut-local 04] fail mark
      ctx.lineWidth = 4; ctx.lineCap = 'round';
      ctx.strokeStyle = THEME.dim; ctx.beginPath(); ctx.arc(ix, iy, 17, 0, Math.PI * 2); ctx.stroke();
      if (busy > 0.01) { ctx.save(); ctx.globalAlpha *= busy; ctx.strokeStyle = THEME.accent; const a = (p('_t', 0) * 7) % (Math.PI * 2); ctx.beginPath(); ctx.arc(ix, iy, 17, a, a + 3.6); ctx.stroke(); ctx.restore(); }
      if (done > 0.01) {
        const k = Math.max(0.01, EASE.back(clamp(done))); ctx.save(); ctx.translate(ix, iy); ctx.scale(k, k);
        ctx.fillStyle = THEME.ok; ctx.beginPath(); ctx.arc(0, 0, 19, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = THEME.bg; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(-8, 0); ctx.lineTo(-2, 7); ctx.lineTo(9, -7); ctx.stroke(); ctx.restore();
      }
      if (fail > 0.01) {
        const k = Math.max(0.01, EASE.back(clamp(fail))); ctx.save(); ctx.translate(ix, iy); ctx.scale(k, k);
        ctx.fillStyle = THEME.bad; ctx.beginPath(); ctx.arc(0, 0, 19, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = THEME.bg; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(-7, -7); ctx.lineTo(7, 7); ctx.moveTo(7, -7); ctx.lineTo(-7, 7); ctx.stroke(); ctx.restore();
      }
      text(ctx, p('text', n.text || ''), x + 80, n.y + 2, { size: sz, weight: 700, align: 'left', color: p('textColor', THEME.fg) });
    },
    // [cut-local extension] Button: rounded control with centred text; fill (0-1) floods it with its colour.
    // Opts: w h size. Props: text color fill glow.
    button(ctx, n, p) {
      const w = n.w || 280, h = n.h || 90, x = n.x - w / 2, y = n.y - h / 2, c = p('color', THEME.accent), f = p('fill', 0);
      ctx.fillStyle = f > 0.01 ? mixColor(THEME.bg, c, 0.9 * f) : THEME.bg; ctx.strokeStyle = c; ctx.lineWidth = 5; glow(ctx, c, 10 + 20 * p('glow', 0));
      rr(ctx, x, y, w, h, 20); ctx.fill(); ctx.stroke(); noGlow(ctx);
      text(ctx, p('text', n.text || ''), n.x, n.y + 2, { size: n.size || 46, weight: 800, color: f > 0.5 ? THEME.bg : c });
    },
    // [cut-local extension] Cursor: pointer arrow with its tip at (x+dx, y+dy) and an optional caption.
    // Opts: labelDX labelDY labelSize. Props: dx dy color label.
    cursor(ctx, n, p) {
      const x = n.x + p('dx', 0), y = n.y + p('dy', 0), c = p('color', THEME.fg);
      ctx.save(); ctx.translate(x, y); ctx.scale(1.5, 1.5);
      ctx.fillStyle = THEME.bg; ctx.strokeStyle = c; ctx.lineWidth = 3; ctx.lineJoin = 'round'; glow(ctx, c, 10);
      ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, 36); ctx.lineTo(9, 28); ctx.lineTo(16, 42); ctx.lineTo(22, 39); ctx.lineTo(15, 25); ctx.lineTo(27, 25); ctx.closePath(); ctx.fill(); ctx.stroke(); noGlow(ctx);
      ctx.restore();
      const lb = p('label', n.label || '');
      if (lb) text(ctx, lb, x + (n.labelDX || 60), y + (n.labelDY || 40), { size: n.labelSize || 40, weight: 700, align: 'left', color: c });
    },
    // [cut-local extension] Link: polyline connector through absolute points, drawn progressively, with end dots or an arrowhead,
    // and an optional caption. Opts: pts [[x,y]...] dash arrow lineWidth labelX labelY labelSize labelAlign. Props: draw (0-1) color glow label labelA.
    link(ctx, n, p) {
      const pts = n.pts, d = p('draw', 0), c = p('color', THEME.fg);
      if (d > 0.005) {
        let total = 0; const seg = [];
        for (let i = 1; i < pts.length; i++) { const L = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); seg.push(L); total += L; }
        let left = total * clamp(d);
        ctx.strokeStyle = c; ctx.lineWidth = n.lineWidth || 6; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; glow(ctx, c, 8 + 18 * p('glow', 0));
        if (n.dash) ctx.setLineDash(n.dash);
        ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]);
        let end = pts[0], dir = [0, 1];
        for (let i = 1; i < pts.length && left > 0; i++) {
          const f = Math.min(1, left / seg[i - 1]);
          end = [lerp(pts[i - 1][0], pts[i][0], f), lerp(pts[i - 1][1], pts[i][1], f)];
          dir = [(pts[i][0] - pts[i - 1][0]) / seg[i - 1], (pts[i][1] - pts[i - 1][1]) / seg[i - 1]];
          ctx.lineTo(end[0], end[1]); left -= seg[i - 1];
        }
        ctx.stroke(); ctx.setLineDash([]); noGlow(ctx);
        ctx.fillStyle = c;
        if (!n.arrow) { ctx.beginPath(); ctx.arc(pts[0][0], pts[0][1], 9, 0, Math.PI * 2); ctx.fill(); }
        if (d >= 0.999) {
          if (n.arrow) {
            const [ex, ey] = end, [ux, uy] = dir, s2 = 20;
            ctx.beginPath(); ctx.moveTo(ex + ux * 4, ey + uy * 4); ctx.lineTo(ex - ux * s2 - uy * s2 * 0.7, ey - uy * s2 + ux * s2 * 0.7); ctx.lineTo(ex - ux * s2 + uy * s2 * 0.7, ey - uy * s2 - ux * s2 * 0.7); ctx.closePath(); ctx.fill();
          } else { ctx.beginPath(); ctx.arc(end[0], end[1], 9, 0, Math.PI * 2); ctx.fill(); }
        }
      }
      const lb = p('label', n.label || ''), la = p('labelA', 0);
      if (lb && la > 0.01) { ctx.save(); ctx.globalAlpha *= la; text(ctx, lb, n.labelX, n.labelY, { size: n.labelSize || 40, weight: 700, align: n.labelAlign || 'left', color: c }); ctx.restore(); }
    },
  };
  NODES.box.ports = (n) => {
    const w = n.w || 340, h = n.h || 136, k = n.ports, span = n.portSpan || 180;
    return Array.from({ length: k }, (_, i) => [n.x + (k === 1 ? 0 : -span / 2 + (span * i) / (k - 1)), n.y + h / 2]);
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
      // [cut-local] optional chip size and a secondary tag box inside the chip
      const csz = pk.size || 26, tsz = Math.round(csz * 0.8);
      ctx.font = '700 ' + csz + 'px ' + THEME.mono;
      const lw = ctx.measureText(pk.label).width;
      ctx.font = '700 ' + tsz + 'px ' + THEME.mono;
      const tw = pk.tag ? ctx.measureText(pk.tag).width + 28 : 0;
      const w = lw + 40 + (pk.tag ? tw + 20 : 0), h = Math.max(48, csz * 1.8);
      ctx.fillStyle = THEME.bg; ctx.strokeStyle = c; ctx.lineWidth = 4; glow(ctx, c, 14);
      rr(ctx, -w / 2, -h / 2, w, h, 14); ctx.fill(); ctx.stroke(); noGlow(ctx);
      text(ctx, pk.label, -w / 2 + 20, 2, { size: csz, weight: 700, font: THEME.mono, color: c, align: 'left' });
      if (pk.tag) {
        const tx = w / 2 - 14 - tw, th = tsz + 20;
        ctx.strokeStyle = pk.tagColor || THEME.mid; ctx.lineWidth = 3; rr(ctx, tx, -th / 2, tw, th, 8); ctx.stroke(); // [cut-local 04] tagColor
        text(ctx, pk.tag, tx + tw / 2, 2, { size: tsz, weight: 700, font: THEME.mono, color: pk.tagColor || THEME.fg });
      }
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
        const half = { phone: [38, 62], laptop: [96, 66], box: [(n.w || 340) / 2, (n.h || 136) / 2], rack: [102, 84], db: [(n.w || 190) / 2, (n.h || 170) / 2], store: [(n.w || 300) / 2, ((n.rows || 3) * 66 + 32) / 2], badge: [60, 27], label: [0, 0], clock: [n.r || 34, n.r || 34], bar: [(n.w || 300) / 2, (n.h || 14) / 2] }[n.type] || [0, 0];
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
      if (meta.title) text(ctx, meta.title, W / 2, 330, { size: 104, weight: 800, color: THEME.title });
      if (meta.subtitle) text(ctx, meta.subtitle, W / 2, 405, { size: 28, weight: 700, color: THEME.mid, spacing: 8 });
      // wires
      for (const w of wires) {
        const pts = [s.pt(w.from), ...w.via, s.pt(w.to)];
        const c = track.get('wire:' + w.id + '.color', t, w.color || THEME.wire);
        const a = track.get('wire:' + w.id + '.alpha', t, 1);
        if (a <= 0.01) continue;
        ctx.globalAlpha = a; ctx.strokeStyle = c; ctx.lineWidth = 4; ctx.lineCap = 'round';
        const dashed = track.get('wire:' + w.id + '.dashed', t, 0) > 0.5;
        ctx.setLineDash(dashed ? [12, 10] : [0.1, 13]); ctx.lineDashOffset = track.get('wire:' + w.id + '.flow', t, 0) * -t * 40;
        ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]); for (const q of pts.slice(1)) ctx.lineTo(q[0], q[1]); ctx.stroke();
        ctx.setLineDash([]); ctx.globalAlpha = 1;
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
        if (pk.keys) { // [cut-local extension] keyframed packet: travels between timed anchors and can rest between legs
          const K = pk.keys, t0 = K[0].t, t1 = K[K.length - 1].t;
          if (t < t0 || t > t1) continue;
          let i = 1; while (i < K.length - 1 && t > K[i].t) i++;
          const a = K[i - 1], b = K[i], k = b.t > a.t ? clamp((t - a.t) / (b.t - a.t)) : 1;
          const route = [s.pt(a.at), ...(b.via || []).map((r) => s.pt(r)), s.pt(b.at)];
          const [x, y] = polyAt(route, EASE[b.ease || 'inOut'](k));
          const fi = pk.fadeIn || 0.15, fo = pk.fadeOut || 0.15;
          drawPacket(ctx, pk, x, y, clamp(Math.min((t - t0) / fi, (t1 - t) / fo)));
          continue;
        }
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
      const vt = meta.veilTop || 440; // [cut-local 04] configurable veil top
      if (veil > 0.001) { ctx.globalAlpha = veil; ctx.fillStyle = THEME.bg; ctx.fillRect(0, vt, W, H - vt); ctx.globalAlpha = 1; }
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

