/* Canary deployments, lesson 02: Limit the exposure (motion-v2 cut 02).
 * One illustrative window of 10,000 requests: 9,000 to v1 (current, control), 1,000 to v2 (candidate).
 * Counts are authored teaching data, not measurements. Uses the cut-local engine in ./engine
 * (caption, line and grid nodes, square packet, dx/dy offsets, meta.veilTop).
 */
FlowVideo.scene({
  meta: { title: '', subtitle: '', duration: 46.4, fps: 30, speed: 1, veilTop: 0 },
  build(s) {
    const T = s.THEME;
    const V1 = '#38C6E8', V2 = '#A98BFA', AMB = T.accent, RED = T.bad, V1DIM = '#1E5866';
    const fmt = (v) => v.toLocaleString('en-US');
    const show = (t, id, a = 1, d = 0.35) => s.set(t, id, 'alpha', a, d);
    const hide = (t, id, d = 0.35) => s.set(t, id, 'alpha', 0, d);
    const say = (t, id, txt) => s.set(t, id, 'text', txt, 0);

    /* ---------- request window: 100 squares, 1 square = 100 requests ---------- */
    const N = 100, UNIT = 100;
    const CAND = [3, 14, 18, 37, 41, 52, 66, 71, 79, 95]; // irregular placement: no "every tenth request" rule
    const isV2 = (i) => CAND.includes(i);
    const BIG = { x: 540, y: 1030, cell: 62, gap: 12 }, SRC = { x: 540, y: 700, cell: 28, gap: 6 };
    const G1 = { x: 300, y: 1290, cell: 34, gap: 8, cols: 9, rows: 10 }, G2 = { x: 800, y: 1290, cell: 34, gap: 8, cols: 1, rows: 10 };
    const cellAt = (g, cols, rows, i) => {
      const W = cols * g.cell + (cols - 1) * g.gap, H = rows * g.cell + (rows - 1) * g.gap;
      return [g.x - W / 2 + (i % cols) * (g.cell + g.gap) + g.cell / 2, g.y - H / 2 + Math.floor(i / cols) * (g.cell + g.gap) + g.cell / 2];
    };
    if (CAND.length * UNIT !== 1000 || (N - CAND.length) * UNIT !== 9000) throw new Error('split arithmetic');

    /* ---------- nodes ---------- */
    s.node('header', 'caption', { x: 540, y: 240, size: 80, weight: 800, text: 'Limit the exposure', color: T.title, alpha: 0 });
    s.node('chip', 'caption', { x: 540, y: 352, size: 44, weight: 600, text: 'Example window', color: T.fg, border: T.mid, pill: true, alpha: 0 });

    // beat 1-2: the window
    s.node('total', 'caption', { x: 540, y: 528, size: 100, weight: 800, mono: true, text: '0', color: T.fg, alpha: 0 });
    s.node('totalU', 'caption', { x: 540, y: 614, size: 46, weight: 600, text: 'requests', color: T.mid, alpha: 0 });
    s.node('win', 'grid', { x: BIG.x, y: BIG.y, cell: BIG.cell, gap: BIG.gap, cols: 10, rows: 10, fill: T.mid, alpha: 0 });
    s.node('legend', 'caption', { x: 540, y: 1470, size: 50, weight: 600, text: '1 square = 100 requests', color: T.mid, alpha: 0 });
    s.node('key1', 'caption', { x: 300, y: 1580, size: 50, weight: 700, text: 'v1 · control', color: V1, alpha: 0 });
    s.node('key2', 'caption', { x: 790, y: 1580, size: 50, weight: 700, text: 'v2 · candidate', color: V2, alpha: 0 });

    // beat 3: routing
    s.node('pendL', 'caption', { x: 190, y: 650, size: 44, weight: 600, text: 'pending', color: T.mid, alpha: 0 });
    s.node('pend', 'caption', { x: 190, y: 722, size: 64, weight: 800, mono: true, text: '10,000', color: T.fg, alpha: 0 });
    s.node('unitA', 'caption', { x: 880, y: 648, size: 44, weight: 600, text: '1 square', color: T.mid, alpha: 0 });
    s.node('unitB', 'caption', { x: 880, y: 704, size: 44, weight: 600, text: '= 100', color: T.mid, alpha: 0 });
    s.node('unitC', 'caption', { x: 880, y: 760, size: 44, weight: 600, text: 'requests', color: T.mid, alpha: 0 });
    s.node('router', 'box', { x: 540, y: 960, w: 300, h: 92, label: 'router', labelSize: 46, alpha: 0 });
    s.wire('in', [540, 868], 'router.top');
    s.wire('w1', [440, 1010], [300, 1062], {});
    s.wire('w2', [640, 1010], [800, 1062], {});
    for (const w of ['in', 'w1', 'w2']) s.set(0, 'wire:' + w, 'alpha', 0, 0);
    s.node('g1', 'grid', Object.assign({ fill: V1, alpha: 0 }, G1));
    s.node('g2', 'grid', Object.assign({ fill: V2, alpha: 0 }, G2));
    s.node('lab1', 'caption', { x: 300, y: 1556, size: 48, weight: 700, text: 'v1 · control', color: V1, alpha: 0 });
    s.node('lab2', 'caption', { x: 800, y: 1556, size: 48, weight: 700, text: 'v2 · candidate', color: V2, alpha: 0 });
    s.node('cnt1', 'caption', { x: 300, y: 1646, size: 88, weight: 800, mono: true, text: '0', color: T.fg, alpha: 0 });
    s.node('cnt2', 'caption', { x: 800, y: 1646, size: 88, weight: 800, mono: true, text: '0', color: T.fg, alpha: 0 });

    // beat 4: share strip (900 px: 810 + 90)
    s.node('stripT', 'caption', { x: 540, y: 520, size: 48, weight: 600, text: 'share of 10,000 requests', color: T.mid, alpha: 0 });
    s.node('pct1', 'caption', { x: 445, y: 616, size: 64, weight: 800, text: '90%', color: V1, alpha: 0 });
    s.node('pct2', 'caption', { x: 990, y: 616, size: 64, weight: 800, text: '10%', color: V2, align: 'right', alpha: 0 });
    s.node('strip', 'bar', { x: 540, y: 690, w: 900, h: 44, segments: 2, seg0Color: V1, seg1Color: V2, alpha: 0 });

    // beat 5: requests are not users (illustration)
    s.node('ins', 'box', { x: 540, y: 1150, w: 900, h: 540, label: '', color: T.dim, alpha: 0 });
    s.node('uA', 'phone', { x: 210, y: 1010, color: T.fg, alpha: 0 });
    s.node('uAl', 'caption', { x: 210, y: 1114, size: 46, weight: 600, text: 'user A', color: T.fg, alpha: 0 });
    s.node('uB', 'laptop', { x: 210, y: 1270, color: T.fg, alpha: 0 });
    s.node('uBl', 'caption', { x: 210, y: 1374, size: 46, weight: 600, text: 'user B', color: T.fg, alpha: 0 });
    const RQ = [[960, 'request 1', 'uA'], [1100, 'request 2', 'uA'], [1260, 'request 3', 'uB']];
    RQ.forEach(([y, l], i) => {
      s.node('rq' + i, 'box', { x: 710, y, w: 440, h: 96, label: l, labelSize: 44, color: T.mid, alpha: 0 });
    });
    s.node('ln0', 'line', { pts: [[262, 1000], [488, 960]], color: T.mid, draw: 0, width: 4 });
    s.node('ln1', 'line', { pts: [[262, 1020], [488, 1100]], color: T.mid, draw: 0, width: 4 });
    s.node('ln2', 'line', { pts: [[312, 1266], [488, 1260]], color: T.mid, draw: 0, width: 4 });
    s.node('ruSum', 'caption', { x: 540, y: 1500, size: 54, weight: 700, text: '3 requests · 2 users', color: T.fg, alpha: 0 });

    // beat 6: measure each version on its own denominator
    s.node('con1', 'line', { pts: [[300, 716], [300, 868]], color: V1, draw: 0, width: 4 });
    s.node('con2', 'line', { pts: [[945, 716], [945, 868]], color: V2, draw: 0, width: 4 });
    const PAN = [{ id: 'p1', x: 300, c: V1, idt: 'v1 · control', n: 'n = 9,000' }, { id: 'p2', x: 778, c: V2, idt: 'v2 · candidate', n: 'n = 1,000' }];
    for (const q of PAN) {
      s.node(q.id, 'box', { x: q.x, y: 1180, w: 430, h: 600, label: '', color: q.c, alpha: 0 });
      s.node(q.id + 'id', 'caption', { x: q.x, y: 950, size: 48, weight: 700, text: q.idt, color: q.c, alpha: 0 });
      s.node(q.id + 'n', 'caption', { x: q.x, y: 1046, size: 58, weight: 800, mono: true, text: q.n, color: T.fg, alpha: 0 });
      s.node(q.id + 'e', 'box', { x: q.x, y: 1200, w: 340, h: 104, label: 'errors', labelSize: 46, labelColor: T.mid, color: T.dim, alpha: 0 });
      s.node(q.id + 'l', 'box', { x: q.x, y: 1340, w: 340, h: 104, label: 'latency', labelSize: 46, labelColor: T.mid, color: T.dim, alpha: 0 });
    }

    // beat 7: possible impact on the candidate's share
    s.node('stay', 'caption', { x: 300, y: 790, size: 46, weight: 700, text: '9,000 stay on v1', color: V1, alpha: 0 });
    s.node('expo', 'caption', { x: 990, y: 790, size: 46, weight: 700, text: '1,000 exposed to v2', color: AMB, align: 'right', alpha: 0 });
    s.node('drop', 'line', { pts: [[945, 830], [945, 900]], color: AMB, draw: 0, width: 4 });
    s.node('imp', 'box', { x: 540, y: 1190, w: 900, h: 560, label: '', color: AMB, alpha: 0 });
    const IMP = [[1040, 'phone'], [1190, 'laptop'], [1340, 'phone']];
    IMP.forEach(([y, kind], i) => {
      s.node('iu' + i, kind, { x: 200, y: y + (kind === 'laptop' ? 4 : 0), color: T.mid, alpha: 0 });
      s.node('ir' + i, 'box', { x: 660, y, w: 520, h: 100, label: 'response', labelSize: 44, color: T.mid, labelColor: T.mid, alpha: 0 });
    });
    s.node('harm', 'caption', { x: 540, y: 1560, size: 52, weight: 700, text: 'Affected users can be harmed', color: T.fg, alpha: 0 });

    // beat 8: what this window does and does not show
    s.node('sum1', 'caption', { x: 540, y: 900, size: 76, weight: 800, mono: true, text: '9,000 → v1', color: V1, alpha: 0 });
    s.node('sum2', 'caption', { x: 540, y: 1010, size: 76, weight: 800, mono: true, text: '1,000 → v2', color: V2, alpha: 0 });
    s.node('safe', 'caption', { x: 540, y: 1200, size: 54, weight: 700, text: 'Small share ≠ proven safe', color: AMB, border: AMB, pill: true, alpha: 0 });
    s.node('illu', 'caption', { x: 540, y: 1340, size: 46, weight: 600, text: 'Illustrative window', color: T.mid, alpha: 0 });

    /* ---------- sounds (scene-local) ---------- */
    s.sound('tap', { base: 'C4', gain: 0.5, layers: [{ type: 'tone', wave: 'sine', attack: 0.002, decay: 0.09, harmonics: [1, 0.35, 0.1] }] });
    s.sound('rowtick', { base: 'G5', gain: 0.22, layers: [{ type: 'noise', lp: 6000, hp: 2500, decay: 0.01, gain: 0.5 }, { type: 'tone', wave: 'sine', attack: 0.002, decay: 0.05, gain: 0.6 }] });
    s.sound('swoosh', { base: 'C4', gain: 0.3, layers: [{ type: 'noise', lp: 1400, lpTo: 350, hp: 80, attack: 0.08, decay: 0.45, gain: 0.8 }] });
    s.sound('fail', { base: 'E4', gain: 0.6, layers: [
      { type: 'tone', wave: 'sine', ratio: 1, glideTo: 0.5, glide: 0.32, attack: 0.004, decay: 0.42, harmonics: [1, 0.3, 0.1] },
      { type: 'noise', lp: 900, hp: 120, attack: 0.002, decay: 0.08, gain: 0.35 }] });

    /* ---------- beat 1 (0-5.4): a finite window of 10,000 requests ---------- */
    show(0.2, 'header'); show(0.5, 'chip');
    show(0.7, 'win', 1, 0.01); show(0.7, 'total', 1, 0.3); show(0.7, 'totalU', 1, 0.3);
    for (let r = 0; r < 10; r++) {
      const t = 0.9 + r * 0.14;
      for (let c = 0; c < 10; c++) s.set(t, 'win', 'f' + (r * 10 + c), 1, 0.18, 'out');
      say(t + 0.1, 'total', fmt((r + 1) * 10 * UNIT));
      s.sfx(t, 'rowtick', { gain: 0.16 });
    }
    s.sfx(2.42, 'store', { note: 'C5', gain: 0.45 });
    s.ripple(2.42, [540, 528], T.fg, { r0: 60, r1: 130, dur: 0.6 }); // stays clear of the header chip
    show(2.9, 'legend', 1, 0.4);
    s.set(3.2, 'win', 'hi44', 1, 0.15); s.set(3.9, 'win', 'hi44', 0, 0.4);
    s.sfx(3.2, 'ack', { gain: 0.3 });
    // hold 3.6-5.4

    /* ---------- beat 2 (5.4-8.6): every square belongs to exactly one version ---------- */
    for (let r = 0; r < 10; r++) for (let c = 0; c < 10; c++) {
      const i = r * 10 + c; if (!isV2(i)) s.set(5.4 + r * 0.09, 'win', 'c' + i, V1, 0.2);
    }
    s.sfx(5.4, 'arrive', { note: 'C4', gain: 0.4, pan: -0.3 });
    show(5.6, 'key1', 1, 0.35);
    for (const i of CAND) { s.set(6.7, 'win', 'c' + i, V2, 0.15); s.set(6.7, 'win', 'hi' + i, 0.9, 0.12); s.set(7.1, 'win', 'hi' + i, 0, 0.5); }
    s.sfx(6.7, 'arrive', { note: 'E5', gain: 0.5, pan: 0.3 });
    show(6.9, 'key2', 1, 0.35);
    // hold 7.2-8.6

    /* ---------- beat 3 (8.6-19.0): route the window, counting on arrival ---------- */
    const L0 = 8.6;
    for (const id of ['total', 'totalU', 'legend', 'key1', 'key2']) hide(L0, id, 0.3);
    for (const [k, v] of Object.entries(SRC)) s.set(L0, 'win', k, v, 0.8);
    s.sfx(L0, 'swoosh', {});
    for (const id of ['pendL', 'pend', 'unitA', 'unitB', 'unitC', 'router', 'g1', 'g2', 'lab1', 'lab2', 'cnt1', 'cnt2']) show(L0 + 0.6, id, 1, 0.4);
    for (const w of ['in', 'w1', 'w2']) s.set(L0 + 0.6, 'wire:' + w, 'alpha', 1, 0.4);
    let t = 9.6, n1 = 0, n2 = 0, arrived = 0, lastArr = 0;
    for (let i = 0; i < N; i++) {
      const v2 = isV2(i), slow = i < 20;
      const dur = slow ? 0.62 : 0.4;
      const from = cellAt(SRC, 10, 10, i);
      const k = v2 ? n2 : n1;
      const to = v2 ? cellAt(G2, 1, 10, k) : cellAt(G1, 9, 10, k);
      const side = v2 ? 640 : 440; // packets pass inside the router edges, clear of its label
      s.set(t, 'win', 'f' + i, 0, 0.1);
      s.packet({ route: [from, [540, 884], [side, 918], [side, 1004], to], t, dur, kind: 'square', color: v2 ? V2 : V1, fade: 0.06 });
      const ta = t + dur;
      if (v2) { n2++; s.set(ta, 'g2', 'f' + k, 1, 0.12); say(ta, 'cnt2', fmt(n2 * UNIT)); s.sfx(ta, 'arrive', { note: 'E5', gain: 0.5, pan: 0.35 }); }
      else { n1++; s.set(ta, 'g1', 'f' + k, 1, 0.12); say(ta, 'cnt1', fmt(n1 * UNIT)); s.sfx(ta, 'tap', { gain: slow ? 0.42 : 0.2, pan: -0.35 }); }
      arrived++; say(ta, 'pend', fmt((N - arrived) * UNIT));
      lastArr = Math.max(lastArr, ta);
      t += i < 10 ? 0.17 : i < 20 ? 0.12 : 0.085 - (0.04 * (i - 20)) / 79;
    }
    if (n1 * UNIT !== 9000 || n2 * UNIT !== 1000) throw new Error('route arithmetic');
    const LAND = lastArr + 0.15;
    s.sfx(LAND, 'store', { note: 'C4', gain: 0.4, pan: -0.35 }); s.sfx(LAND + 0.12, 'store', { note: 'E5', gain: 0.4, pan: 0.35 });
    s.pulse(LAND, 'cnt1'); s.pulse(LAND + 0.12, 'cnt2');
    s.ripple(LAND, [300, 1646], V1, { r0: 60, r1: 170, dur: 0.6 }); s.ripple(LAND + 0.12, [800, 1646], V2, { r0: 60, r1: 170, dur: 0.6 });
    s.meta.land = LAND;
    // hold about 1.8 s after landing

    /* ---------- beat 4 (19.0-23.2): the same split as a share of the window ---------- */
    const SH = Math.max(0, LAND + 1.8 - 19.0); // later beats follow the landing hold
    const B4 = 19.0 + SH;
    for (const id of ['win', 'pendL', 'pend', 'unitA', 'unitB', 'unitC', 'router']) hide(B4, id, 0.4);
    for (const w of ['in', 'w1', 'w2']) s.set(B4, 'wire:' + w, 'alpha', 0, 0.4);
    show(B4 + 0.4, 'stripT'); show(B4 + 0.4, 'strip', 1, 0.3);
    s.set(B4 + 0.6, 'strip', 'seg0', 0.9, 0.7, 'out'); show(B4 + 1.2, 'pct1', 1, 0.3);
    s.sfx(B4 + 1.25, 'store', { note: 'C4', gain: 0.4, pan: -0.2 });
    s.set(B4 + 1.6, 'strip', 'seg1', 0.1, 0.3, 'out'); show(B4 + 1.8, 'pct2', 1, 0.3);
    s.sfx(B4 + 1.85, 'store', { note: 'E5', gain: 0.42, pan: 0.5 });
    // hold 21.2-23.2

    /* ---------- beat 5 (23.2-28.6): a request count is not a user count ---------- */
    const B5 = 23.2 + SH;
    for (const id of ['g1', 'g2', 'lab1', 'lab2', 'cnt1', 'cnt2']) hide(B5, id, 0.4);
    for (const id of ['strip', 'stripT', 'pct1', 'pct2']) s.set(B5, id, 'alpha', 0.3, 0.4);
    say(B5 + 0.2, 'chip', 'Requests ≠ users'); s.pulse(B5 + 0.2, 'chip');
    s.sfx(B5 + 0.2, 'swoosh', { gain: 0.6 });
    show(B5 + 0.5, 'ins'); show(B5 + 0.6, 'uA'); show(B5 + 0.6, 'uAl'); show(B5 + 0.8, 'uB'); show(B5 + 0.8, 'uBl');
    RQ.forEach(([y, l, u], i) => {
      const tq = B5 + 1.3 + i * 0.65;
      s.set(tq, 'ln' + i, 'draw', 1, 0.35, 'out'); show(tq + 0.2, 'rq' + i, 1, 0.25);
      s.ripple(tq + 0.3, [490, y], T.fg, { r0: 8, r1: 46, dur: 0.45 });
      s.sfx(tq + 0.05, 'send', { note: 'G5', gain: 0.45, pan: -0.4 });
      s.pulse(tq, u);
    });
    show(B5 + 3.4, 'ruSum', 1, 0.35);
    s.sfx(B5 + 3.4, 'arrive', { note: 'G4', gain: 0.4 });
    // hold 27.0-28.6
    const C5 = 28.6 + SH;
    for (const id of ['ins', 'uA', 'uAl', 'uB', 'uBl', 'rq0', 'rq1', 'rq2', 'ln0', 'ln1', 'ln2', 'ruSum']) hide(C5, id, 0.4);

    /* ---------- beat 6 (29.0-35.2): measure each version separately ---------- */
    const B6 = 29.0 + SH;
    say(B6, 'chip', 'Measure each version'); s.pulse(B6, 'chip');
    for (const id of ['strip', 'stripT', 'pct1', 'pct2']) s.set(B6, id, 'alpha', 1, 0.4);
    PAN.forEach((q, j) => {
      const tj = B6 + 0.4 + j * 1.1;
      s.set(tj, j ? 'con2' : 'con1', 'draw', 1, 0.35, 'out');
      show(tj + 0.3, q.id, 1, 0.3); show(tj + 0.35, q.id + 'id', 1, 0.3); show(tj + 0.45, q.id + 'n', 1, 0.3);
      s.sfx(tj + 0.35, 'arrive', { note: j ? 'E5' : 'C5', gain: 0.4, pan: j ? 0.35 : -0.35 });
    });
    PAN.forEach((q, j) => {
      const tf = B6 + 2.9 + j * 0.25;
      show(tf, q.id + 'e', 1, 0.3); show(tf + 0.12, q.id + 'l', 1, 0.3);
      s.sfx(tf, 'work', { note: j ? 'E4' : 'C4', gain: 0.35, pan: j ? 0.35 : -0.35 });
    });
    // hold about 2.3 s: empty fields, no results claimed

    /* ---------- beat 7 (34.6-41.0, +SH): limited exposure is not zero harm ---------- */
    const B7 = 34.6 + SH;
    for (const q of PAN) for (const suf of ['', 'id', 'n', 'e', 'l']) hide(B7, q.id + suf, 0.4);
    s.set(B7, 'con1', 'alpha', 0, 0.3); s.set(B7, 'con2', 'alpha', 0, 0.3);
    say(B7 + 0.2, 'chip', 'Possible impact'); s.set(B7 + 0.2, 'chip', 'border', AMB, 0.2); s.pulse(B7 + 0.2, 'chip');
    s.set(B7 + 0.5, 'strip', 'seg0Color', V1DIM, 0.4); s.set(B7 + 0.5, 'pct1', 'color', V1DIM, 0.4);
    show(B7 + 0.6, 'stay'); show(B7 + 0.9, 'expo');
    s.sfx(B7 + 0.9, 'thump', { gain: 0.35, pan: 0.5 });
    s.set(B7 + 1.3, 'drop', 'draw', 1, 0.3, 'out'); show(B7 + 1.5, 'imp', 1, 0.3);
    IMP.forEach((_, i) => { show(B7 + 1.8 + i * 0.18, 'iu' + i, 1, 0.25); show(B7 + 1.85 + i * 0.18, 'ir' + i, 1, 0.25); });
    s.sfx(B7 + 1.85, 'send', { note: 'E5', gain: 0.3, pan: 0.2 });
    const TF = B7 + 2.9;
    s.set(TF, 'ir1', 'label', 'failed', 0); s.set(TF, 'ir1', 'color', RED, 0.12); s.set(TF, 'ir1', 'labelColor', RED, 0.12);
    s.set(TF, 'iu1', 'color', RED, 0.12);
    s.shake(TF, 'ir1', 12, 0.42); s.ripple(TF, [400, 1190], RED, { r0: 14, r1: 80, dur: 0.6, mark: 'x' });
    s.sfx(TF, 'fail', { pan: 0.1 });
    show(TF + 1.0, 'harm', 1, 0.35);
    s.sfx(TF + 1.0, 'work', { note: 'E4', gain: 0.3 });
    // hold 39.5-41.6

    /* ---------- beat 8 (41.0-45.8, +SH): the summary, then fade ---------- */
    const B8 = 41.0 + SH;
    for (const id of ['stay', 'expo', 'drop', 'imp', 'iu0', 'iu1', 'iu2', 'ir0', 'ir1', 'ir2', 'harm']) hide(B8, id, 0.4);
    say(B8 + 0.2, 'chip', 'Example window'); s.set(B8 + 0.2, 'chip', 'border', T.mid, 0.2);
    s.set(B8 + 0.2, 'strip', 'seg0Color', V1, 0.4); s.set(B8 + 0.2, 'pct1', 'color', V1, 0.4);
    show(B8 + 0.5, 'sum1'); s.sfx(B8 + 0.5, 'ack', { gain: 0.3, pan: -0.2 });
    show(B8 + 0.9, 'sum2'); s.sfx(B8 + 0.9, 'ack', { gain: 0.3, pan: 0.2 });
    show(B8 + 1.5, 'safe', 1, 0.35); s.sfx(B8 + 1.5, 'deliver', { note: 'C4', gain: 0.4 }); s.sfx(B8 + 1.5, 'deliver', { note: 'E4', gain: 0.3 });
    show(B8 + 2.0, 'illu', 1, 0.35);
    s.fade(45.0 + SH, 1, 0.7);
    s.meta.duration = +(45.8 + SH).toFixed(2); s.meta.shift = SH;
  },
});
