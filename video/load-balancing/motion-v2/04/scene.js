/* Load balancing, lesson 04 "Unequal work" — motion-v2 cut.
 * One mechanism: round robin counts turns, not work. A gets a slow report, B a quick lookup. B finishes and
 * goes idle while A is still busy, and both show "assigned 1". The next turn is still A, so request 3 waits
 * in A's wait slot until the report finishes, then starts there. B stays idle.
 * Render from the repository root:
 *   node video/load-balancing/motion-v2/04/engine/render.mjs video/load-balancing/motion-v2/04/scene.js video/load-balancing/motion-v2/04/video.mp4 --sheet video/load-balancing/motion-v2/04/scratch/contact-sheet.png
 * Uses the cut-local engine copy (lessons 01-03 general nodes, including span, panel noFill and ox/oy offsets).
 */
FlowVideo.scene({
  meta: { title: 'Unequal work', subtitle: 'ROUND ROBIN · ONE SLOT EACH', subtitleSize: 36, duration: 47, fps: 30, speed: 1 },
  build(s) {
    const T = s.THEME;
    const PAPP = 0, PLB = 0, PA = -0.45, PB = 0.45;
    const RATE = 1 / 24;                                           // work drains at the same rate on both servers (share per second)

    // ---- app with the request it is about to send ----
    const SH = 50;                                                 // vertical shift that centres the stage
    s.node('app', 'panel', { x: 540, y: 565 + SH, w: 760, h: 90, r: 22, color: T.mid });
    s.node('appName', 'text', { x: 200, y: 567 + SH, text: 'app', size: 52, weight: 800, color: T.fg });
    s.node('appReq', 'pill', { x: 730, y: 565 + SH, w: 340, h: 66, size: 40, text: 'req 1 · report', color: T.accent, fill: 1, alpha: 0 });
    s.node('inLane', 'arrow', { x: 540, y: 618 + SH, x2: 540, y2: 680 + SH, color: T.wire, head: 18 });

    // ---- round-robin rule strip ----
    const RY = 745 + SH;
    s.node('rule', 'panel', { x: 540, y: RY, w: 900, h: 110, r: 22, color: T.mid });
    s.node('ruleName', 'text', { x: 130, y: RY + 2, text: 'round robin', size: 44, weight: 700, mono: true, color: T.mid });
    s.node('ruleNext', 'text', { x: 640, y: RY + 2, align: 'right', text: 'next', size: 44, weight: 800, mono: true, color: T.accent });
    const cellX = { A: 720, B: 870 };
    for (const k of ['A', 'B']) {
      s.node('cell' + k, 'pill', { x: cellX[k], y: RY, w: 120, h: 76, size: 48, text: k, color: k === 'A' ? T.accent : T.dim, fill: k === 'A' ? 1 : 0 });
    }
    const ruleBot = RY + 55;

    // ---- two server columns ----
    const Y0 = 880 + SH, CW = 440, CH = 680;
    const pathFrom = { A: [470, ruleBot + 12], B: [610, ruleBot + 12] }, pathTo = { A: [300, Y0 - 12], B: [780, Y0 - 12] };
    s.node('pathA', 'arrow', { x: pathFrom.A[0], y: pathFrom.A[1], x2: pathTo.A[0], y2: pathTo.A[1], color: T.wire, head: 18 });
    s.node('pathB', 'arrow', { x: pathFrom.B[0], y: pathFrom.B[1], x2: pathTo.B[0], y2: pathTo.B[1], color: T.wire, head: 18 });
    const col = (k, cx, name) => {
      const x0 = cx - CW / 2;
      s.node(k, 'panel', { x: cx, y: Y0 + CH / 2, w: CW, h: CH, color: T.mid });
      s.node(k + 'Name', 'text', { x: x0 + 34, y: Y0 + 54, text: name, size: 52, weight: 800, color: T.fg });
      s.node(k + 'AsL', 'text', { x: x0 + 34, y: Y0 + 128, text: 'assigned', size: 44, weight: 600, color: T.mid });
      s.node(k + 'AsN', 'text', { x: x0 + CW - 40, y: Y0 + 128, align: 'right', text: '0', size: 60, weight: 800, mono: true, color: T.fg });
      // run slot
      s.node(k + 'Run', 'panel', { x: cx, y: Y0 + 265, w: CW - 60, h: 170, r: 18, color: T.dim });
      s.node(k + 'RunTag', 'text', { x: x0 + CW - 52, y: Y0 + 213, align: 'right', text: 'run', size: 40, weight: 700, color: T.mid });
      s.node(k + 'RunId', 'text', { x: x0 + 52, y: Y0 + 268, text: 'idle', size: 52, weight: 800, mono: true, color: T.mid });
      s.node(k + 'RunOp', 'text', { x: x0 + 52, y: Y0 + 320, text: '', size: 42, weight: 600, color: T.mid });
      // wait slot (dashed)
      s.node(k + 'Wait', 'span', { x: x0 + 30, y: Y0 + 440, w: CW - 60, h: 120, ghost: true, len: 1, color: T.dim, r: 18 });
      s.node(k + 'WaitTag', 'text', { x: x0 + CW - 52, y: Y0 + 440, align: 'right', text: 'wait', size: 40, weight: 700, color: T.mid });
      s.node(k + 'WaitT', 'text', { x: x0 + 52, y: Y0 + 442, text: '—', size: 52, weight: 800, mono: true, color: T.mid });
      // work left
      s.node(k + 'WlL', 'text', { x: x0 + 34, y: Y0 + 560, text: 'work left', size: 44, weight: 600, color: T.mid });
      s.node(k + 'Wl', 'span', { x: x0 + 30, y: Y0 + 620, w: CW - 60, h: 40, r: 10, trackW: 40, color: T.accent, len: 0 });
    };
    col('A', 290, 'server A');
    col('B', 790, 'server B');
    // the one request identity that moves from A's wait slot to its run slot
    s.node('mover', 'text', { x: 290 - CW / 2 + 52, y: Y0 + 442, text: 'req 3', size: 52, weight: 800, mono: true, color: T.fg, alpha: 0 });

    // ---- helpers ----
    const lit = (t, id, on, c) => { s.set(t, id, 'color', on ? c : T.wire, 0.25); s.set(t, id, 'flow', on ? 1 : 0, 0); s.set(t, id, 'glow', on ? 0.5 : 0, 0.25); };
    const N = { A: { arrive: 'E5', work: 'E4', send: 'E6', pan: PA }, B: { arrive: 'G5', work: 'G4', send: 'G6', pan: PB } };
    const setNext = (t, k) => {
      const o = k === 'A' ? 'B' : 'A';
      s.set(t, 'cell' + o, 'color', T.dim, 0.3); s.set(t, 'cell' + o, 'fill', 0, 0.3);
      s.set(t, 'cell' + k, 'color', T.accent, 0.3); s.set(t, 'cell' + k, 'fill', 1, 0.3);
      s.set(t, 'cell' + k, 'scale', 1.12, 0.1); s.set(t + 0.1, 'cell' + k, 'scale', 1, 0.25);
      s.sfx(t, 'ack', { note: 'D6', gain: 1.1, pan: PLB });
    };
    const count = (t, k, n) => {
      s.set(t, k + 'AsN', 'text', String(n), 0); s.set(t, k + 'AsN', 'scale', 1.3, 0.1); s.set(t + 0.1, k + 'AsN', 'scale', 1, 0.3);
      s.set(t, k + 'AsN', 'color', T.accent, 0.1); s.set(t + 0.6, k + 'AsN', 'color', T.fg, 0.4);
      s.sfx(t, 'store', { note: N[k].arrive, gain: 1.0, pan: N[k].pan });
    };
    // app creates request, rule picks k (the current next), request travels; returns time it reaches the column
    const dispatch = (t, label, k, toWait) => {
      s.set(t, 'appReq', 'text', label, 0); s.set(t, 'appReq', 'alpha', 1, 0.25);
      s.set(t, 'appReq', 'scale', 1.1, 0.1); s.set(t + 0.1, 'appReq', 'scale', 1, 0.25);
      s.sfx(t, 'store', { note: 'C5', gain: 0.9, pan: PAPP });
      const go = t + 0.9;
      s.set(go, 'appReq', 'alpha', 0, 0.3);
      lit(go, 'inLane', true, T.accent);
      s.packet({ route: [[540, 612 + SH], [540, 688 + SH]], t: go, dur: 0.45, kind: 'ring', size: 16, color: T.accent });
      s.sfx(go, 'send', { note: 'C6', gain: 1.3, pan: PAPP });
      const atRule = go + 0.45;
      lit(atRule, 'inLane', false);
      s.set(atRule, 'cell' + k, 'glow', 1, 0.12); s.set(atRule + 0.15, 'cell' + k, 'glow', 0, 0.5);
      s.set(atRule, 'ruleNext', 'scale', 1.12, 0.1); s.set(atRule + 0.1, 'ruleNext', 'scale', 1, 0.25);
      s.sfx(atRule, 'arrive', { note: 'D5', pan: PLB });
      const leave = atRule + 0.5;
      let at;
      if (!toWait) {
        lit(leave, 'path' + k, true, T.accent);
        s.packet({ route: [pathFrom[k], pathTo[k]], t: leave, dur: 0.8, kind: 'ring', size: 16, color: T.accent });
        at = leave + 0.8;
        lit(at, 'path' + k, false);
      } else {                                                      // A's run slot is full: go down the gap into A's wait slot
        const wy = Y0 + 440;
        s.packet({ route: [[540, ruleBot + 10], [540, wy], [492, wy]], t: leave, dur: 1.4, kind: 'ring', size: 16, color: T.accent });
        at = leave + 1.4;
      }
      s.sfx(leave, 'send', { note: N[k].send, gain: 1.2, pan: N[k].pan });
      setNext(leave + 0.4, k === 'A' ? 'B' : 'A');                   // next advances on assignment
      return at;
    };
    // request starts running on k with a given amount of work; returns finish time
    const start = (at, k, id, op, work) => {
      s.set(at, k, 'color', T.fg, 0.2); s.set(at, k, 'glow', 0.6, 0.2); s.set(at + 0.4, k, 'glow', 0, 0.6); s.set(at + 0.6, k, 'color', T.mid, 0.4);
      s.set(at, k + 'Run', 'color', T.accent, 0.2);
      s.set(at, k + 'RunId', 'text', id, 0); s.set(at, k + 'RunId', 'color', T.accent, 0.2);
      s.set(at, k + 'RunOp', 'text', op, 0); s.set(at, k + 'RunOp', 'color', T.fg, 0.2);
      s.set(at, k + 'Wl', 'color', T.accent, 0); s.set(at, k + 'Wl', 'len', work, 0.6);
      s.sfx(at, 'arrive', { note: N[k].arrive, pan: N[k].pan });
      const d0 = at + 0.6, dur = work / RATE;
      s.set(d0, k + 'Wl', 'len', 0, dur, 'linear');
      for (let tk = d0 + 0.4; tk < d0 + dur - 0.2; tk += 0.8) s.sfx(tk, 'work', { note: N[k].work, gain: 0.75, pan: N[k].pan });
      const d = d0 + dur;
      s.set(d, k + 'Run', 'color', T.ok, 0.2); s.set(d, k + 'RunId', 'text', 'done', 0); s.set(d, k + 'RunId', 'color', T.ok, 0.2);
      s.set(d, k + 'RunOp', 'color', T.ok, 0.2);
      s.sfx(d, 'ack', { note: N[k].arrive, gain: 1.3, pan: N[k].pan });
      return d;
    };
    const clear = (t, k) => {
      s.set(t, k + 'Run', 'color', T.dim, 0.3);
      s.set(t, k + 'RunId', 'text', 'idle', 0); s.set(t, k + 'RunId', 'color', T.mid, 0.3); s.set(t, k + 'RunOp', 'text', '', 0);
    };

    // ---- beat 1: two identical servers, one run slot each ----
    const all = ['app', 'appName', 'inLane', 'rule', 'ruleName', 'ruleNext', 'cellA', 'cellB', 'pathA', 'pathB'];
    for (const k of ['A', 'B']) for (const p of ['', 'Name', 'AsL', 'AsN', 'Run', 'RunTag', 'RunId', 'RunOp', 'Wait', 'WaitTag', 'WaitT', 'WlL', 'Wl']) all.push(k + p);
    for (const id of all) { s.set(0, id, 'alpha', 0, 0); s.set(0.1, id, 'alpha', 1, 0.6); }
    s.pulse(1.2, 'A', T.fg, 0.6); s.pulse(1.2, 'B', T.fg, 0.6);
    s.sfx(1.2, 'ack', { note: 'E5', gain: 1.2, pan: PA }); s.sfx(1.2, 'ack', { note: 'G5', gain: 1.2, pan: PB });
    for (const k of ['A', 'B']) { s.set(2.4, k + 'Run', 'color', T.fg, 0.2); s.set(3.3, k + 'Run', 'color', T.dim, 0.5); s.set(2.4, k + 'RunTag', 'color', T.fg, 0.2); s.set(3.3, k + 'RunTag', 'color', T.mid, 0.5); }
    s.sfx(2.4, 'work', { note: 'E4', gain: 0.9, pan: PA }); s.sfx(2.4, 'work', { note: 'G4', gain: 0.9, pan: PB });
    s.set(3.4, 'cellA', 'glow', 1, 0.12); s.set(3.55, 'cellA', 'glow', 0, 0.5); s.sfx(3.4, 'ack', { note: 'D6', gain: 1.1, pan: PLB });

    // ---- beat 2: A receives a slow report ----
    const at1 = dispatch(5.0, 'req 1 · report', 'A', false);         // 7.65
    count(at1, 'A', 1);
    const d1 = start(at1, 'A', 'req 1', 'report', 1.0);              // drains 24 s

    // ---- beat 3: B receives a quick lookup ----
    const at2 = dispatch(11.0, 'req 2 · lookup', 'B', false);
    count(at2, 'B', 1);
    const d2 = start(at2, 'B', 'req 2', 'lookup', 0.2);              // drains 4.8 s
    clear(d2 + 0.9, 'B');

    // ---- beat 4: equal counts, unequal work left; B ready while A busy ----
    let t = d2 + 1.8;
    for (const k of ['A', 'B']) { s.set(t, k + 'AsN', 'color', T.accent, 0.15); s.set(t + 0.15, k + 'AsN', 'scale', 1.25, 0.1); s.set(t + 0.3, k + 'AsN', 'scale', 1, 0.3); s.set(t + 1.2, k + 'AsN', 'color', T.fg, 0.4); }
    s.sfx(t, 'ack', { note: 'E5', gain: 1.0, pan: PA }); s.sfx(t, 'ack', { note: 'G5', gain: 1.0, pan: PB });
    const eqT = t;
    t = eqT + 1.6;                                                 // work left: A long, B empty; B idle
    s.set(t, 'AWl', 'glow', 1, 0.15); s.set(t + 0.2, 'AWl', 'glow', 0, 0.6);
    s.set(t + 0.5, 'BRun', 'color', T.fg, 0.15); s.set(t + 1.3, 'BRun', 'color', T.dim, 0.5);
    s.set(t + 0.5, 'BRunId', 'color', T.fg, 0.15); s.set(t + 1.3, 'BRunId', 'color', T.mid, 0.5);
    s.sfx(t + 0.5, 'ack', { note: 'G4', gain: 1.1, pan: PB });
    const readyT = t;

    // ---- beat 5: round robin selects A; request 3 waits ----
    const s3 = readyT + 3.0;
    const at3 = dispatch(s3, 'req 3 · lookup', 'A', true);
    count(at3, 'A', 2);
    s.set(at3, 'AWait', 'color', T.fg, 0.2);
    s.set(at3, 'AWaitT', 'text', 'req 3', 0); s.set(at3, 'AWaitT', 'color', T.fg, 0.2);
    s.set(at3, 'AWaitTag', 'color', T.fg, 0.2);
    s.sfx(at3, 'arrive', { note: 'E4', gain: 0.7, pan: PA });
    // contrast: A's waiting request vs B's empty slot
    s.set(at3 + 1.4, 'BRun', 'color', T.fg, 0.15); s.set(at3 + 2.2, 'BRun', 'color', T.dim, 0.5);
    s.set(at3 + 1.4, 'BRunId', 'color', T.fg, 0.15); s.set(at3 + 2.2, 'BRunId', 'color', T.mid, 0.5);
    s.sfx(at3 + 1.4, 'ack', { note: 'G4', gain: 1.1, pan: PB });

    // ---- beat 6: A finishes; the waiting request starts on A ----
    clear(d1 + 0.8, 'A');
    const mv = d1 + 1.0;
    s.set(mv, 'AWaitT', 'alpha', 0, 0); s.set(mv, 'AWaitT', 'text', '—', 0); s.set(mv, 'AWaitT', 'color', T.mid, 0);
    s.set(mv + 0.55, 'AWaitT', 'alpha', 1, 0.3);
    s.set(mv, 'AWait', 'color', T.dim, 0.3); s.set(mv, 'AWaitTag', 'color', T.mid, 0.3);
    s.set(mv, 'mover', 'alpha', 1, 0); s.set(mv, 'mover', 'oy', 0, 0);
    s.set(mv, 'mover', 'oy', -174, 0.8);
    s.set(mv, 'ARunId', 'alpha', 0, 0);
    s.sfx(mv, 'send', { note: 'E6', gain: 1.1, pan: PA });
    const at3r = mv + 0.8;
    s.set(at3r, 'mover', 'alpha', 0, 0); s.set(at3r, 'ARunId', 'alpha', 1, 0);
    const d3 = start(at3r, 'A', 'req 3', 'lookup', 0.2);
    clear(d3 + 0.9, 'A');

    // ---- close: counts differ again; work was never what they measured ----
    t = d3 + 1.8;
    s.set(t, 'AAsN', 'color', T.accent, 0.15); s.set(t + 1.0, 'AAsN', 'color', T.fg, 0.4);
    s.set(t + 0.5, 'BAsN', 'color', T.accent, 0.15); s.set(t + 1.5, 'BAsN', 'color', T.fg, 0.4);
    s.sfx(t, 'ack', { note: 'E5', gain: 1.0, pan: PA }); s.sfx(t + 0.5, 'ack', { note: 'G5', gain: 1.0, pan: PB });
    const closeT = t;
    const endHold = closeT + 5.0;
    s.fade(endHold, 1, 0.8);
    s.meta.duration = endHold + 1.4;
    s.meta.beats = { meet: 0, r1: 5.0, at1, r2: 11.0, at2, d2, eq: eqT, ready: readyT, r3: s3, at3, d1, move: mv, at3r, d3, close: closeT, fade: endHold };
  },
});

