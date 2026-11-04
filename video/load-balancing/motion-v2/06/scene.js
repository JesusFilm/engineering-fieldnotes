/* Load balancing, lesson 06 "Avoid a failed server" — motion-v2 cut.
 * One mechanism: the balancer only learns that A has failed from a health check. A breaks just after a passing
 * check, but its record still says "eligible" until the next periodic probe gets no reply within its timeout.
 * Only then is A marked unavailable and left out of new choices; the next request goes to B and its response
 * returns through the balancer.
 * Render from the repository root:
 *   node video/load-balancing/motion-v2/06/engine/render.mjs video/load-balancing/motion-v2/06/scene.js video/load-balancing/motion-v2/06/video.mp4 --sheet video/load-balancing/motion-v2/06/scratch/contact-sheet.png
 * Uses the cut-local engine copy (lessons 01-05 general nodes plus a 'dot' event mark).
 */
FlowVideo.scene({
  meta: { title: 'Avoid a failed server', titleSize: 82, subtitle: 'HEALTH CHECKS', subtitleSize: 36, duration: 39, fps: 30, speed: 1 },
  build(s) {
    const T = s.THEME;
    const PAPP = 0, PLB = 0, PA = -0.4, PB = 0.4;
    const SH = 100;

    // ---- app ----
    const AY = 545 + SH;
    s.node('app', 'panel', { x: 540, y: AY, w: 760, h: 90, r: 22, color: T.mid });
    s.node('appName', 'text', { x: 200, y: AY + 2, text: 'app', size: 52, weight: 800, color: T.fg });
    s.node('appSt', 'text', { x: 880, y: AY + 2, align: 'right', text: 'idle', size: 44, weight: 700, mono: true, color: T.mid });
    const appBot = AY + 45, lbTop = 660 + SH;
    s.wire('inLink', [540, appBot + 6], [540, lbTop - 6]);

    // ---- load balancer: last-check table + health-check timeline ----
    const LBH = 530;
    s.node('lb', 'panel', { x: 540, y: lbTop + LBH / 2, w: 900, h: LBH, color: T.mid });
    s.node('lbName', 'text', { x: 135, y: lbTop + 55, text: 'load balancer', size: 52, weight: 800, color: T.fg });
    s.node('hSrv', 'text', { x: 165, y: lbTop + 130, text: 'server', size: 42, weight: 600, color: T.mid });
    s.node('hChk', 'text', { x: 560, y: lbTop + 130, align: 'center', text: 'last check', size: 42, weight: 600, color: T.mid });
    const rowY = { A: lbTop + 200, B: lbTop + 285 };
    for (const k of ['A', 'B']) {
      s.node('row' + k, 'panel', { x: 540, y: rowY[k], w: 820, h: 74, r: 16, color: T.dim });
      s.node('row' + k + 'Id', 'text', { x: 165, y: rowY[k], text: k, size: 56, weight: 800, mono: true, color: T.fg });
      s.node('st' + k, 'pill', { x: 560, y: rowY[k], w: 330, h: 60, size: 42, text: 'eligible', color: T.ok });
    }
    s.node('hTl', 'text', { x: 165, y: lbTop + 358, text: 'health checks', size: 42, weight: 600, color: T.mid });
    const TK = { x0: 240, w: 700, t1: 20 };
    const tx = (t) => TK.x0 + TK.w * (t / TK.t1);
    const trY = { A: lbTop + 428, B: lbTop + 490 };
    for (const k of ['A', 'B']) {
      s.node('tl' + k, 'text', { x: 165, y: trY[k], text: k, size: 44, weight: 800, mono: true, color: T.mid });
      s.node('trk' + k, 'span', { x: TK.x0, y: trY[k], w: TK.w, h: 6, trackW: 5, len: 0 });
    }
    s.node('now', 'cursor', { x: TK.x0, w: TK.w, y: trY.A - 22, y2: trY.B + 26, color: T.fg, alpha: 0 });
    s.node('toBar', 'span', { x: TK.x0, y: trY.A, w: TK.w, h: 18, r: 9, color: T.accent, track: 0, len: 0 });
    s.node('toLab', 'text', { x: tx(17.3), y: lbTop + 358, align: 'center', text: 'timeout', size: 42, weight: 800, mono: true, color: T.accent, alpha: 0 });
    const marks = [];
    const mark = (id, k, t) => { s.node(id, 'dot', { x: tx(t), y: trY[k], r: 13, color: T.ok, alpha: 0 }); marks.push(id); return id; };

    // ---- servers (actual state) ----
    const lbBot = lbTop + LBH, SY = 1290 + SH, SVH = 180;
    s.wire('linkA', [290, lbBot + 6], [290, SY - 6]);
    s.wire('linkB', [790, lbBot + 6], [790, SY - 6]);
    const srv = (k, cx, name) => {
      s.node('srv' + k, 'panel', { x: cx, y: SY + SVH / 2, w: 420, h: SVH, color: T.mid });
      s.node('srv' + k + 'Name', 'text', { x: cx - 176, y: SY + 58, text: name, size: 52, weight: 800, color: T.fg });
      s.node('srv' + k + 'St', 'text', { x: cx - 176, y: SY + 124, text: 'ready', size: 46, weight: 700, mono: true, color: T.ok });
    };
    srv('A', 290, 'server A');
    srv('B', 790, 'server B');

    // ---- helpers ----
    const N = { A: { x: 290, reply: 'E5', pan: PA }, B: { x: 790, reply: 'G5', pan: PB } };
    const probeOut = (t, k) => {
      s.packet({ route: [[N[k].x, lbBot + 4], [N[k].x, SY - 4]], t, dur: 0.6, kind: 'dot', size: 9, color: T.fg });
      s.sfx(t, 'send', { note: 'D6', gain: 0.8, pan: N[k].pan });
    };
    const probeBack = (t, k, ct) => {                              // passing reply; mark at the check time
      s.packet({ route: [[N[k].x, SY - 4], [N[k].x, lbBot + 4]], t, dur: 0.6, kind: 'dot', size: 9, color: T.ok });
      const m = mark('m' + k + ct, k, ct);
      s.set(t + 0.6, m, 'alpha', 1, 0.15); s.set(t + 0.6, m, 'scale', 1.4, 0); s.set(t + 0.6, m, 'scale', 1, 0.3, 'out');
      s.sfx(t + 0.6, 'ack', { note: N[k].reply, gain: 1.1, pan: N[k].pan });
    };
    const round = (ct) => { for (const k of ['A', 'B']) { probeOut(ct, k); probeBack(ct + 0.6, k, ct); } };

    // ---- beat 1: both pass checks; then A stops responding ----
    const all = ['app', 'appName', 'appSt', 'lb', 'lbName', 'hSrv', 'hChk', 'hTl', 'srvA', 'srvAName', 'srvASt', 'srvB', 'srvBName', 'srvBSt'];
    for (const k of ['A', 'B']) all.push('row' + k, 'row' + k + 'Id', 'st' + k, 'tl' + k, 'trk' + k);
    for (const id of all) { s.set(0, id, 'alpha', 0, 0); s.set(0.1, id, 'alpha', 1, 0.6); }
    for (const w of ['inLink', 'linkA', 'linkB']) { s.set(0, 'wire:' + w, 'alpha', 0, 0); s.set(0.1, 'wire:' + w, 'alpha', 1, 0.6); }
    s.set(0.6, 'now', 'alpha', 1, 0.3); s.set(0.6, 'now', 'pos', 0.6 / TK.t1, 0);
    const TO_END = 19.0;
    s.set(0.6, 'now', 'pos', TO_END / TK.t1, TO_END - 0.6, 'linear');   // "now" moves until the timeout ends
    round(3.0);
    round(9.0);
    const FAIL = 10.4;
    s.set(FAIL, 'srvA', 'color', T.bad, 0); s.shake(FAIL, 'srvA', 12, 0.45);
    s.set(FAIL, 'srvASt', 'text', 'no response', 0); s.set(FAIL, 'srvASt', 'color', T.bad, 0);
    s.set(FAIL, 'srvAName', 'color', T.bad, 0.2);
    s.ripple(FAIL, [290 + 160, SY + 40], T.bad, { r0: 10, r1: 40, dur: 0.7, mark: 'x' });
    s.sfx(FAIL, 'crash', { gain: 0.7, pan: PA });
    // the record has not changed
    s.set(11.6, 'stA', 'glow', 1, 0.15); s.set(11.8, 'stA', 'glow', 0, 0.8);
    s.set(11.6, 'stA', 'scale', 1.08, 0.12); s.set(11.75, 'stA', 'scale', 1, 0.3);
    s.sfx(11.6, 'ack', { note: 'D5', gain: 0.9, pan: PLB });

    // ---- beat 2: the next periodic probe ----
    const C3 = 15.0;
    probeOut(C3, 'A'); probeOut(C3, 'B');
    probeBack(C3 + 0.6, 'B', C3);
    const lost = C3 + 0.6;                                          // A's probe reaches A and gets no reply
    const mA3 = mark('mAlost', 'A', C3);                            // distinct id from round 1's 'mA3'
    s.set(lost, mA3, 'color', T.accent, 0); s.set(lost, mA3, 'fill', 0, 0); s.set(lost, mA3, 'alpha', 1, 0.2);
    s.set(lost, 'toLab', 'alpha', 1, 0.3);
    s.set(lost, 'toBar', 'from', (lost) / TK.t1, 0); s.set(lost, 'toBar', 'len', 0.0001, 0);
    s.set(lost, 'toBar', 'len', (TO_END - lost) / TK.t1, TO_END - lost, 'linear');
    // ---- beat 3: the timeout window runs out ----
    for (const tk of [16.4, 17.4, 18.2, 18.75]) s.sfx(tk, 'clock', { gain: 1.4, pan: PLB });
    s.set(TO_END, 'toBar', 'color', T.bad, 0.15); s.set(TO_END, 'toLab', 'color', T.bad, 0.15);
    s.set(TO_END, mA3, 'color', T.bad, 0.1); s.set(TO_END, mA3, 'fill', 1, 0.15); s.set(TO_END, mA3, 'cross', 1, 0.3, 'out');
    s.set(TO_END, mA3, 'scale', 1.4, 0); s.set(TO_END, mA3, 'scale', 1, 0.3, 'out');
    s.sfx(TO_END, 'thump', { gain: 1.0, pan: PLB });

    // ---- beat 4: A is excluded from new selection ----
    const EXC = 19.8;
    s.set(EXC, 'stA', 'text', 'unavailable', 0); s.set(EXC, 'stA', 'color', T.bad, 0.2);
    s.set(EXC, 'stA', 'scale', 1.12, 0.1); s.set(EXC + 0.1, 'stA', 'scale', 1, 0.3);
    s.sfx(EXC, 'poof', { gain: 0.9, pan: PLB });
    s.set(EXC + 0.6, 'wire:linkA', 'dashed', 1, 0); s.set(EXC + 0.6, 'wire:linkA', 'color', T.dim, 0.4);
    s.set(EXC + 0.6, 'wire:linkA', 'alpha', 0.6, 0.4);

    // ---- beat 5: a new request routes to B ----
    const R = 23.0;
    s.set(R, 'appSt', 'text', 'waiting', 0); s.set(R, 'appSt', 'color', T.accent, 0.2);
    s.set(R, 'wire:inLink', 'color', T.accent, 0.2); s.set(R, 'wire:inLink', 'flow', 1, 0);
    s.packet({ route: [[540, appBot + 4], [540, lbTop - 4]], t: R, dur: 0.6, kind: 'ring', size: 16, color: T.accent });
    s.sfx(R, 'send', { note: 'C6', gain: 1.3, pan: PAPP });
    const atLb = R + 0.6;
    s.set(atLb, 'wire:inLink', 'color', T.wire, 0.3); s.set(atLb, 'wire:inLink', 'flow', 0, 0);
    s.set(atLb, 'lb', 'color', T.fg, 0.2); s.set(atLb + 0.8, 'lb', 'color', T.mid, 0.5);
    s.sfx(atLb, 'arrive', { note: 'D5', pan: PLB });
    const pick = atLb + 0.5;                                         // only B is eligible
    s.set(pick, 'rowB', 'color', T.ok, 0.2); s.set(pick, 'rowB', 'glow', 0.7, 0.2); s.set(pick + 0.4, 'rowB', 'glow', 0, 0.6);
    s.set(pick, 'rowA', 'color', T.dim, 0);
    const go = pick + 0.5;
    s.set(go, 'wire:linkB', 'color', T.accent, 0.2); s.set(go, 'wire:linkB', 'flow', 1, 0);
    s.packet({ route: [[790, lbBot + 4], [790, SY - 4]], t: go, dur: 0.8, kind: 'ring', size: 16, color: T.accent });
    s.sfx(go, 'send', { note: 'D6', gain: 1.0, pan: PB });
    const atB = go + 0.8;
    s.set(atB, 'wire:linkB', 'color', T.wire, 0.3); s.set(atB, 'wire:linkB', 'flow', 0, 0);
    s.set(atB, 'srvB', 'color', T.fg, 0.2); s.set(atB, 'srvB', 'glow', 0.6, 0.2); s.set(atB + 0.4, 'srvB', 'glow', 0, 0.6);
    s.set(atB, 'srvBSt', 'text', 'working', 0); s.set(atB, 'srvBSt', 'color', T.accent, 0.2);
    s.sfx(atB, 'arrive', { note: 'G5', pan: PB });
    for (const tk of [atB + 0.7, atB + 1.5, atB + 2.3]) s.sfx(tk, 'work', { note: 'G4', gain: 0.9, pan: PB });

    // ---- beat 6: B's response returns through the balancer ----
    const done = atB + 3.0;
    s.set(done, 'srvBSt', 'text', 'ready', 0); s.set(done, 'srvBSt', 'color', T.ok, 0.2); s.set(done, 'srvB', 'color', T.mid, 0.4);
    s.set(done, 'wire:linkB', 'color', T.ok, 0.2); s.set(done, 'wire:linkB', 'flow', 1, 0);
    s.packet({ route: [[790, SY - 4], [790, lbBot + 4]], t: done, dur: 0.8, kind: 'dot', size: 18, color: T.ok });
    s.sfx(done, 'send', { note: 'G6', gain: 1.1, pan: PB });
    const back = done + 0.8;
    s.set(back, 'wire:linkB', 'color', T.wire, 0.3); s.set(back, 'wire:linkB', 'flow', 0, 0);
    s.set(back, 'lb', 'color', T.ok, 0.2); s.set(back + 0.9, 'lb', 'color', T.mid, 0.5);
    s.sfx(back, 'arrive', { note: 'D5', pan: PLB });
    const up = back + 0.5;
    s.set(up, 'wire:inLink', 'color', T.ok, 0.2); s.set(up, 'wire:inLink', 'flow', 1, 0);
    s.packet({ route: [[540, lbTop - 4], [540, appBot + 4]], t: up, dur: 0.6, kind: 'dot', size: 16, color: T.ok });
    const recv = up + 0.6;
    s.set(recv, 'wire:inLink', 'color', T.wire, 0.3); s.set(recv, 'wire:inLink', 'flow', 0, 0);
    s.set(recv, 'appSt', 'text', 'received', 0); s.set(recv, 'appSt', 'color', T.ok, 0.2);
    s.set(recv, 'app', 'color', T.ok, 0.2); s.set(recv + 1.2, 'app', 'color', T.mid, 0.5);
    s.sfx(recv, 'deliver', { note: 'C5', gain: 1.4, pan: PAPP });
    s.set(recv + 0.4, 'rowB', 'color', T.dim, 0.5);

    // final: detected failure, working path through B
    const fin = recv + 1.0;
    s.set(fin, 'stA', 'glow', 1, 0.15); s.set(fin + 0.2, 'stA', 'glow', 0, 0.6);
    s.set(fin + 0.5, mA3, 'glow', 1, 0.15); s.set(fin + 0.7, mA3, 'glow', 0, 0.6);
    s.set(fin + 1.0, 'srvB', 'glow', 0.8, 0.15); s.set(fin + 1.2, 'srvB', 'glow', 0, 0.6);
    s.sfx(fin, 'chime', { note: 'G5', gain: 0.7, pan: PLB });
    const endHold = fin + 6.0;
    s.fade(endHold, 1, 0.8);
    s.meta.duration = endHold + 1.4;
    s.meta.beats = { meet: 0, check1: 3.0, check2: 9.0, fail: FAIL, check3: C3, lost, timeout: TO_END, exclude: EXC, request: R, pick, atB, done, back, recv, fin, fade: endHold };
  },
});

