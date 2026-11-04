/* Load balancing, lesson 03 "Take turns" — motion-v2 cut.
 * One mechanism: the load balancer keeps a "next" position over its eligible, equally weighted servers.
 * Each request goes to the server at "next", and "next" advances right after every pick, so picks run A, B, A, B.
 * Both servers are idle again before every pick, so the turn (not who is free) decides.
 * Render from the repository root:
 *   node video/load-balancing/motion-v2/03/engine/render.mjs video/load-balancing/motion-v2/03/scene.js video/load-balancing/motion-v2/03/video.mp4 --sheet video/load-balancing/motion-v2/03/scratch/contact-sheet.png
 * Uses the cut-local engine copy (lesson 01/02 general nodes, plus panel noFill and ox/oy offsets).
 */
FlowVideo.scene({
  meta: { title: 'Take turns', subtitle: 'ROUND ROBIN', subtitleSize: 36, duration: 45, fps: 30, speed: 1 },
  build(s) {
    const T = s.THEME;
    const PAPP = 0, PLB = 0, PA = -0.45, PB = 0.45;

    // ---- app ----
    s.node('app', 'panel', { x: 540, y: 520, w: 300, h: 96, r: 22, color: T.mid });
    s.node('appName', 'text', { x: 540, y: 522, align: 'center', text: 'app', size: 52, weight: 800, color: T.fg });
    s.node('inLane', 'arrow', { x: 540, y: 582, x2: 540, y2: 652, color: T.wire, head: 20 });

    // ---- load balancer: rule + endpoint list ----
    const LB = { top: 670, h: 420 };
    s.node('lb', 'panel', { x: 540, y: LB.top + LB.h / 2, w: 900, h: LB.h, color: T.mid });
    s.node('lbName', 'text', { x: 135, y: LB.top + 58, text: 'load balancer', size: 52, weight: 800, color: T.fg });
    s.node('lbRule', 'text', { x: 135, y: LB.top + 124, text: 'round robin', size: 44, weight: 700, mono: true, color: T.mid });
    s.node('lbReq', 'pill', { x: 835, y: LB.top + 90, w: 190, h: 72, size: 42, text: 'req 1', color: T.accent, fill: 1, alpha: 0 });
    const rowY = { A: LB.top + 222, B: LB.top + 330 };
    for (const k of ['A', 'B']) {
      s.node('row' + k, 'panel', { x: 540, y: rowY[k], w: 820, h: 86, r: 16, color: T.dim });
      s.node('row' + k + 'Id', 'text', { x: 170, y: rowY[k], text: k, size: 56, weight: 800, mono: true, color: T.fg });
      s.node('row' + k + 'El', 'text', { x: 250, y: rowY[k], text: 'eligible', size: 44, weight: 600, color: T.mid });
      s.node('row' + k + 'Wt', 'text', { x: 460, y: rowY[k], text: 'weight 1', size: 44, weight: 700, mono: true, color: T.mid });
    }
    // the rule's state: an outline + tag around the next row (hands off between rows without crossing their text)
    for (const k of ['A', 'B']) {
      s.node('next' + k, 'panel', { x: 540, y: rowY[k], w: 836, h: 100, r: 20, color: T.accent, noFill: true, lw: 6, alpha: 0 });
      s.node('tag' + k, 'text', { x: 920, y: rowY[k], align: 'right', text: 'next', size: 46, weight: 800, mono: true, color: T.accent, alpha: 0 });
    }
    const nextOn = (t, k) => {
      s.set(t, 'next' + k, 'alpha', 1, 0.25); s.set(t, 'tag' + k, 'alpha', 1, 0.25);
      s.set(t, 'next' + k, 'scale', 1.05, 0); s.set(t, 'next' + k, 'scale', 1, 0.3, 'out');
    };
    const nextOff = (t, k) => { s.set(t, 'next' + k, 'alpha', 0, 0.2); s.set(t, 'tag' + k, 'alpha', 0, 0.2); };
    const nextGlow = (t, k) => { s.set(t, 'next' + k, 'glow', 1, 0.12); s.set(t + 0.15, 'next' + k, 'glow', 0, 0.5); };

    // ---- paths to the servers ----
    const lbBot = LB.top + LB.h, srvTop = 1200;
    s.node('pathA', 'arrow', { x: 470, y: lbBot + 14, x2: 300, y2: srvTop - 14, color: T.wire, head: 22 });
    s.node('pathB', 'arrow', { x: 610, y: lbBot + 14, x2: 780, y2: srvTop - 14, color: T.wire, head: 22 });

    // ---- servers ----
    const SV = { top: srvTop, h: 230, w: 420 };
    const srv = (id, cx, name) => {
      const left = cx - SV.w / 2;
      s.node(id, 'panel', { x: cx, y: SV.top + SV.h / 2, w: SV.w, h: SV.h, color: T.mid });
      s.node(id + 'Name', 'text', { x: left + 34, y: SV.top + 52, text: name, size: 52, weight: 800, color: T.fg });
      s.node(id + 'Slot', 'panel', { x: cx, y: SV.top + 150, w: SV.w - 60, h: 110, r: 18, color: T.dim });
      s.node(id + 'SlotT', 'text', { x: left + 60, y: SV.top + 136, text: 'idle', size: 50, weight: 700, mono: true, color: T.mid });
      s.node(id + 'Prog', 'span', { x: left + 60, y: SV.top + 180, w: SV.w - 120, h: 12, r: 6, trackW: 8, color: T.accent, len: 0 });
    };
    srv('A', 290, 'server A');
    srv('B', 790, 'server B');

    // ---- picks log ----
    const LOG = { top: 1500, h: 250 };
    s.node('log', 'panel', { x: 540, y: LOG.top + LOG.h / 2, w: 900, h: LOG.h, color: T.dim });
    s.node('logName', 'text', { x: 135, y: LOG.top + 52, text: 'picks', size: 46, weight: 700, color: T.mid });
    const cellX = [120, 330, 540, 750].map((x) => x + 15), cellW = 190, cellY = LOG.top + 160;
    cellX.forEach((x, i) => {
      s.node('cph' + i, 'span', { x, y: cellY, w: cellW, h: 96, ghost: true, len: 1, color: T.dim, r: 16 });
      s.node('cell' + i, 'panel', { x: x + cellW / 2, y: cellY, w: cellW, h: 96, r: 16, color: T.ok, alpha: 0 });
      s.node('cellT' + i, 'text', { x: x + cellW / 2, y: cellY + 2, align: 'center', text: (i + 1) + ' → ' + 'ABAB'[i], size: 48, weight: 800, mono: true, color: T.fg, alpha: 0 });
    });

    // ---- helpers ----
    const lit = (t, id, on, c) => { s.set(t, id, 'color', on ? c : T.wire, 0.25); s.set(t, id, 'flow', on ? 1 : 0, 0); s.set(t, id, 'glow', on ? 0.5 : 0, 0.25); };
    const N = { A: { arrive: 'E5', work: 'E4', send: 'E6', pan: PA, path: 'pathA', from: [470, lbBot + 10], to: [300, srvTop - 8] },
                B: { arrive: 'G5', work: 'G4', send: 'G6', pan: PB, path: 'pathB', from: [610, lbBot + 10], to: [780, srvTop - 8] } };
    // a request arrives at the balancer
    const arrive = (t, n) => {
      s.pulse(t, 'app', T.fg, 0.4);
      lit(t, 'inLane', true, T.accent);
      s.packet({ route: [[540, 574], [540, 662]], t, dur: 0.8, kind: 'ring', size: 18, color: T.accent });
      s.sfx(t, 'send', { note: 'C6', gain: 1.3, pan: PAPP });
      const at = t + 0.8;
      lit(at, 'inLane', false);
      s.set(at, 'lbReq', 'text', 'req ' + n, 0); s.set(at, 'lbReq', 'alpha', 1, 0.2);
      s.set(at, 'lbReq', 'scale', 1.15, 0.1); s.set(at + 0.1, 'lbReq', 'scale', 1, 0.2);
      s.set(at, 'lb', 'color', T.fg, 0.2); s.set(at + 0.8, 'lb', 'color', T.mid, 0.5);
      s.sfx(at, 'arrive', { note: 'D5', pan: PLB });
      return at;
    };
    // the balancer sends request n to server k (the row at "next"), then advances "next"
    const pick = (t, n, k, other) => {
      const c = N[k];
      s.set(t, 'row' + k, 'color', T.fg, 0.15); s.set(t + 0.6, 'row' + k, 'color', T.dim, 0.4);
      nextGlow(t, k);
      lit(t, c.path, true, T.accent);
      s.set(t, 'lbReq', 'alpha', 0, 0.3);
      s.packet({ route: [c.from, c.to], t, dur: 1.0, kind: 'ring', size: 18, color: T.accent });
      s.sfx(t, 'send', { note: c.send, gain: 1.3, pan: c.pan });
      // next advances once the request is on its way
      const adv = t + 0.5;
      nextOff(adv, k); nextOn(adv + 0.2, other);
      s.sfx(adv, 'ack', { note: 'D6', gain: 1.1, pan: PLB });
      const at = t + 1.0;
      lit(at, c.path, false);
      s.ripple(at, c.to, T.fg, { r0: 8, r1: 30, dur: 0.5 });
      s.set(at, k, 'color', T.fg, 0.2); s.set(at, k, 'glow', 0.6, 0.2); s.set(at + 0.4, k, 'glow', 0, 0.6);
      s.set(at, k + 'Slot', 'color', T.accent, 0.2);
      s.set(at, k + 'SlotT', 'text', 'req ' + n, 0); s.set(at, k + 'SlotT', 'color', T.accent, 0.2);
      s.sfx(at, 'arrive', { note: c.arrive, pan: c.pan });
      return at;
    };
    const log = (t, i, k) => {
      s.set(t, 'cph' + i, 'alpha', 0, 0.2);
      s.set(t, 'cell' + i, 'alpha', 1, 0.25); s.set(t, 'cellT' + i, 'text', (i + 1) + ' → ' + k, 0); s.set(t, 'cellT' + i, 'alpha', 1, 0.25);
      s.set(t, 'cell' + i, 'glow', 1, 0.12); s.set(t + 0.15, 'cell' + i, 'glow', 0, 0.5);
      s.sfx(t, 'store', { note: N[k].arrive, gain: 1.0, pan: N[k].pan });
    };
    const work = (at, k) => {
      const c = N[k], dur = 2.0;
      s.set(at, k + 'Prog', 'len', 1, dur, 'linear');
      for (const tk of [at + 0.5, at + 1.1, at + 1.7]) s.sfx(tk, 'work', { note: c.work, gain: 0.9, pan: c.pan });
      const d = at + dur;
      s.set(d, k + 'Prog', 'color', T.ok, 0.2); s.set(d, k + 'Slot', 'color', T.ok, 0.2);
      s.set(d, k + 'SlotT', 'text', 'done', 0); s.set(d, k + 'SlotT', 'color', T.ok, 0.2); s.set(d, k, 'color', T.ok, 0.2);
      s.sfx(d, 'ack', { note: c.arrive, gain: 1.2, pan: c.pan });
      const i = d + 0.9;                                           // back to idle before its next turn
      s.set(i, k + 'SlotT', 'text', 'idle', 0); s.set(i, k + 'SlotT', 'color', T.mid, 0.3);
      s.set(i, k + 'Slot', 'color', T.dim, 0.3); s.set(i, k, 'color', T.mid, 0.4);
      s.set(i, k + 'Prog', 'len', 0, 0.3); s.set(i + 0.35, k + 'Prog', 'color', T.accent, 0);
      return i;
    };
    const cycle = (t, n, k, other) => {
      const atLb = arrive(t, n);
      const atSrv = pick(atLb + 0.7, n, k, other);
      log(atSrv + 0.25, n - 1, k);
      return work(atSrv, k);
    };

    // ---- beat 1: the balancer, its rule and its two equal endpoints ----
    const all = ['app', 'appName', 'inLane', 'lb', 'lbName', 'lbRule', 'pathA', 'pathB', 'log', 'logName'];
    for (const k of ['A', 'B']) all.push('row' + k, 'row' + k + 'Id', 'row' + k + 'El', 'row' + k + 'Wt', k, k + 'Name', k + 'Slot', k + 'SlotT', k + 'Prog');
    for (let i = 0; i < 4; i++) all.push('cph' + i);
    for (const id of all) { s.set(0, id, 'alpha', 0, 0); s.set(0.1, id, 'alpha', 1, 0.6); }
    s.pulse(1.2, 'lb', T.fg, 0.6); s.set(1.2, 'lbRule', 'color', T.fg, 0.2); s.set(2.0, 'lbRule', 'color', T.mid, 0.5);
    s.sfx(1.2, 'arrive', { note: 'D5', gain: 0.9, pan: PLB });
    for (const k of ['A', 'B']) for (const p of ['El', 'Wt']) { s.set(2.3, 'row' + k + p, 'color', T.fg, 0.2); s.set(3.3, 'row' + k + p, 'color', T.mid, 0.5); }
    s.sfx(2.3, 'ack', { note: 'E5', gain: 1.1, pan: PA }); s.sfx(2.3, 'ack', { note: 'G5', gain: 1.1, pan: PB });
    nextOn(3.4, 'A');
    s.sfx(3.4, 'ack', { note: 'D6', gain: 1.1, pan: PLB });

    // ---- beats 2-4: req 1 -> A, req 2 -> B, req 3 -> A ----
    const c1 = 5.4, c2 = 13.4, c3 = 21.4;
    cycle(c1, 1, 'A', 'B');
    cycle(c2, 2, 'B', 'A');
    cycle(c3, 3, 'A', 'B');

    // ---- beat 5: req 4 waits while the log asks; then B ----
    const c4 = 29.4;
    const at4 = arrive(c4, 4);                                     // 30.2
    const askT = at4 + 0.4;
    s.set(askT, 'cph3', 'alpha', 0, 0.2);
    s.set(askT, 'cell3', 'color', T.accent, 0); s.set(askT, 'cell3', 'alpha', 1, 0.25);
    s.set(askT, 'cellT3', 'text', '4 → ?', 0); s.set(askT, 'cellT3', 'color', T.accent, 0); s.set(askT, 'cellT3', 'alpha', 1, 0.25);
    s.sfx(askT, 'ack', { note: 'C4', gain: 1.3, pan: PAPP });
    nextGlow(askT + 1.0, 'B');
    const go4 = askT + 2.6;                                        // ~2.6 s to answer
    const atB = pick(go4, 4, 'B', 'A');
    s.set(atB + 0.25, 'cell3', 'color', T.ok, 0.2); s.set(atB + 0.25, 'cellT3', 'color', T.fg, 0.2);
    s.set(atB + 0.25, 'cellT3', 'text', '4 → B', 0);
    s.set(atB + 0.25, 'cell3', 'glow', 1, 0.12); s.set(atB + 0.4, 'cell3', 'glow', 0, 0.5);
    s.sfx(atB + 0.25, 'store', { note: 'G5', gain: 1.0, pan: PB });
    const idle4 = work(atB, 'B');

    // the pattern: cells light in order
    let t = idle4 + 0.6;
    ['A', 'B', 'A', 'B'].forEach((k, i) => {
      const tt = t + i * 0.55;
      s.set(tt, 'cell' + i, 'glow', 1, 0.12); s.set(tt + 0.2, 'cell' + i, 'glow', 0, 0.5);
      s.set(tt, 'cell' + i, 'scale', 1.08, 0.1); s.set(tt + 0.1, 'cell' + i, 'scale', 1, 0.25);
      s.set(tt, 'cellT' + i, 'scale', 1.08, 0.1); s.set(tt + 0.1, 'cellT' + i, 'scale', 1, 0.25);
      s.sfx(tt, 'ack', { note: N[k].arrive, gain: 1.2, pan: N[k].pan });
    });
    const patT = t;
    const endHold = patT + 1.65 + 5.0;
    s.fade(endHold, 1, 0.8);
    s.meta.duration = endHold + 1.4;
    s.meta.beats = { meet: 0, r1: c1, r2: c2, r3: c3, r4: c4, ask: askT, go4, atB, pattern: patT, fade: endHold };
  },
});

