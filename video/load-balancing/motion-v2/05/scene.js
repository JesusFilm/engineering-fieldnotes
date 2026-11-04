/* Load balancing, lesson 05 "Look at active work" — motion-v2 cut.
 * One mechanism: least requests. The balancer keeps a count of unfinished requests per server, compares the
 * counts when a new request arrives, and sends it to the server with fewer. A's long request stays on A;
 * only the new request goes to B. B's count rises on assignment and falls when its request finishes.
 * Render from the repository root:
 *   node video/load-balancing/motion-v2/05/engine/render.mjs video/load-balancing/motion-v2/05/scene.js video/load-balancing/motion-v2/05/video.mp4 --sheet video/load-balancing/motion-v2/05/scratch/contact-sheet.png
 * Uses the cut-local engine copy (lessons 01-04 general nodes), unchanged from lesson 04.
 */
FlowVideo.scene({
  meta: { title: 'Look at active work', titleSize: 86, subtitle: 'LEAST REQUESTS', subtitleSize: 36, duration: 37, fps: 30, speed: 1 },
  build(s) {
    const T = s.THEME;
    const PAPP = 0, PLB = 0, PA = -0.4, PB = 0.4;

    // ---- app ----
    const SH = 50;                                                 // vertical shift that centres the stage
    s.node('app', 'panel', { x: 540, y: 520 + SH, w: 260, h: 86, r: 22, color: T.mid });
    s.node('appName', 'text', { x: 540, y: 522 + SH, align: 'center', text: 'app', size: 50, weight: 800, color: T.fg });
    s.node('inLane', 'arrow', { x: 540, y: 576 + SH, x2: 540, y2: 624 + SH, color: T.wire, head: 16 });

    // ---- load balancer with its active table ----
    const LB = { top: 640 + SH, h: 440 };
    s.node('lb', 'panel', { x: 540, y: LB.top + LB.h / 2, w: 900, h: LB.h, color: T.mid });
    s.node('lbName', 'text', { x: 135, y: LB.top + 56, text: 'load balancer', size: 52, weight: 800, color: T.fg });
    s.node('lbRule', 'text', { x: 135, y: LB.top + 118, text: 'least requests', size: 44, weight: 700, mono: true, color: T.mid });
    s.node('lbReq', 'pill', { x: 790, y: LB.top + 84, w: 330, h: 70, size: 40, text: 'req 2 · lookup', color: T.accent, fill: 1, alpha: 0 });
    s.node('hServer', 'text', { x: 165, y: LB.top + 196, text: 'server', size: 42, weight: 600, color: T.mid });
    s.node('hActive', 'text', { x: 520, y: LB.top + 196, align: 'center', text: 'active', size: 42, weight: 600, color: T.mid });
    const rowY = { A: LB.top + 272, B: LB.top + 362 };
    const init = { A: '1', B: '0' };
    for (const k of ['A', 'B']) {
      s.node('row' + k, 'panel', { x: 540, y: rowY[k], w: 820, h: 78, r: 16, color: T.dim });
      s.node('row' + k + 'Id', 'text', { x: 165, y: rowY[k], text: k, size: 56, weight: 800, mono: true, color: T.fg });
      s.node('cnt' + k, 'pill', { x: 520, y: rowY[k], w: 120, h: 62, size: 52, text: init[k], color: T.mid });
    }
    s.node('fewer', 'text', { x: 610, y: rowY.B + 2, text: 'fewer', size: 46, weight: 800, mono: true, color: T.ok, alpha: 0 });
    s.node('sel', 'panel', { x: 540, y: rowY.B, w: 836, h: 92, r: 20, color: T.ok, noFill: true, lw: 6, alpha: 0 });

    // ---- two horizontal server lanes (A above B), with a left gutter for B's route ----
    const lane = (k, y, name) => {
      s.node('lane' + k, 'panel', { x: 570, y, w: 840, h: 170, color: T.mid });
      s.node('lane' + k + 'Name', 'text', { x: 185, y: y - 30, text: name, size: 52, weight: 800, color: T.fg });
      s.node('lane' + k + 'St', 'text', { x: 185, y: y + 34, text: 'idle', size: 44, weight: 700, mono: true, color: T.mid });
      s.node('slot' + k, 'panel', { x: 715, y, w: 510, h: 128, r: 18, color: T.dim });
      s.node('slot' + k + 'T', 'text', { x: 490, y: y - 14, text: 'idle', size: 44, weight: 800, mono: true, color: T.mid });
      s.node('prog' + k, 'span', { x: 490, y: y + 36, w: 440, h: 12, r: 6, trackW: 8, color: T.accent, len: 0 });
    };
    const LA = 1230 + SH, LBY = 1450 + SH;
    lane('A', LA, 'server A');
    lane('B', LBY, 'server B');
    // paths: A's would be straight down (unused here); B's runs down the left gutter, clear of lane A
    s.node('pathA', 'arrow', { x: 600, y: LB.top + LB.h + 12, x2: 600, y2: LA - 85 - 12, color: T.wire, head: 16 });
    s.wire('pathB', [110, LB.top + LB.h + 8], [138, LBY], { via: [[110, LBY]] });
    s.node('stays', 'text', { x: 660, y: LB.top + LB.h + 40, text: 'stays on A', size: 44, weight: 800, mono: true, color: T.ok, alpha: 0 });

    // ---- helpers ----
    const setCount = (t, k, v, c) => {
      s.set(t, 'cnt' + k, 'text', String(v), 0);
      s.set(t, 'cnt' + k, 'scale', 1.3, 0.1); s.set(t + 0.1, 'cnt' + k, 'scale', 1, 0.3);
      if (c) { s.set(t, 'cnt' + k, 'color', c, 0.1); s.set(t + 0.9, 'cnt' + k, 'color', T.mid, 0.4); }
    };
    const flash = (t, ids, c) => { for (const id of ids) { s.set(t, id, 'color', c || T.fg, 0.15); } };

    // ---- initial state: req 1 (report) already running on A ----
    s.set(0, 'laneASt', 'text', 'running', 0); s.set(0, 'laneASt', 'color', T.accent, 0);
    s.set(0, 'slotA', 'color', T.accent, 0);
    s.set(0, 'slotAT', 'text', 'req 1 · report', 0); s.set(0, 'slotAT', 'color', T.accent, 0);
    s.set(0, 'progA', 'len', 0.3, 0); s.set(0.7, 'progA', 'len', 0.86, 34, 'linear');   // keeps going; never completes here
    for (let tk = 1.2; tk < 34.6; tk += 1.6) s.sfx(tk, 'work', { note: 'E4', gain: 0.55, pan: PA });

    // ---- beat 1: A has one active request, B has none ----
    const all = ['app', 'appName', 'inLane', 'lb', 'lbName', 'lbRule', 'hServer', 'hActive', 'pathA'];
    for (const k of ['A', 'B']) all.push('row' + k, 'row' + k + 'Id', 'cnt' + k, 'lane' + k, 'lane' + k + 'Name', 'lane' + k + 'St', 'slot' + k, 'slot' + k + 'T', 'prog' + k);
    for (const id of all) { s.set(0, id, 'alpha', 0, 0); s.set(0.1, id, 'alpha', 1, 0.6); }
    s.set(0, 'wire:pathB', 'alpha', 0, 0); s.set(0.1, 'wire:pathB', 'alpha', 1, 0.6);
    s.set(1.6, 'cntA', 'color', T.accent, 0.15); s.set(1.6, 'laneA', 'color', T.fg, 0.15); s.set(1.6, 'laneA', 'glow', 0.7, 0.15);
    s.set(2.5, 'cntA', 'color', T.mid, 0.4); s.set(2.5, 'laneA', 'color', T.mid, 0.4); s.set(2.3, 'laneA', 'glow', 0, 0.5);
    s.sfx(1.6, 'ack', { note: 'E5', gain: 1.2, pan: PA });
    s.set(2.9, 'cntB', 'color', T.fg, 0.15); s.set(2.9, 'laneB', 'color', T.fg, 0.15); s.set(2.9, 'laneB', 'glow', 0.7, 0.15);
    s.set(3.8, 'cntB', 'color', T.mid, 0.4); s.set(3.8, 'laneB', 'color', T.mid, 0.4); s.set(3.6, 'laneB', 'glow', 0, 0.5);
    s.sfx(2.9, 'ack', { note: 'G5', gain: 1.2, pan: PB });

    // ---- beat 2: a new request arrives; compare current counts ----
    let t = 7.5;
    s.pulse(t, 'app', T.fg, 0.4);
    s.set(t, 'inLane', 'color', T.accent, 0.2); s.set(t, 'inLane', 'flow', 1, 0);
    s.packet({ route: [[540, 570 + SH], [540, 632 + SH]], t, dur: 0.6, kind: 'ring', size: 16, color: T.accent });
    s.sfx(t, 'send', { note: 'C6', gain: 1.3, pan: PAPP });
    t += 0.6;                                                       // 8.1
    s.set(t, 'inLane', 'color', T.wire, 0.3); s.set(t, 'inLane', 'flow', 0, 0);
    s.set(t, 'lbReq', 'alpha', 1, 0.2); s.set(t, 'lbReq', 'scale', 1.12, 0.1); s.set(t + 0.1, 'lbReq', 'scale', 1, 0.25);
    s.set(t, 'lb', 'color', T.fg, 0.2); s.set(t + 0.8, 'lb', 'color', T.mid, 0.5);
    s.sfx(t, 'arrive', { note: 'D5', pan: PLB });
    const cmpA = 9.3, cmpB = 10.3, pickT = 11.3;
    s.set(cmpA, 'cntA', 'color', T.fg, 0.15); s.set(cmpA, 'cntA', 'glow', 1, 0.15); s.set(cmpA + 0.3, 'cntA', 'glow', 0, 0.5);
    s.sfx(cmpA, 'ack', { note: 'E5', gain: 1.2, pan: PA });
    s.set(cmpB, 'cntB', 'color', T.fg, 0.15); s.set(cmpB, 'cntB', 'glow', 1, 0.15); s.set(cmpB + 0.3, 'cntB', 'glow', 0, 0.5);
    s.sfx(cmpB, 'ack', { note: 'G5', gain: 1.2, pan: PB });
    s.set(pickT, 'fewer', 'alpha', 1, 0.2); s.set(pickT, 'fewer', 'scale', 1.25, 0); s.set(pickT, 'fewer', 'scale', 1, 0.3, 'back');
    s.set(pickT, 'sel', 'alpha', 1, 0.25); s.set(pickT, 'cntB', 'color', T.ok, 0.2); s.set(pickT, 'cntA', 'color', T.mid, 0.3);
    s.sfx(pickT, 'hit', { note: 'G5', gain: 1.0, pan: PB });

    // ---- beat 3: assign the new request to B; B's count rises on assignment ----
    const commit = 13.6;
    s.set(commit - 0.35, 'fewer', 'alpha', 0, 0.25);               // comparison clears before the count changes
    setCount(commit, 'B', 1, T.accent);
    s.sfx(commit, 'store', { note: 'G5', gain: 1.0, pan: PB });
    const go = commit + 0.4;
    s.set(go, 'lbReq', 'alpha', 0, 0.3);
    s.set(go, 'wire:pathB', 'color', T.accent, 0.2); s.set(go, 'wire:pathB', 'flow', 1, 0);
    s.packet({ route: [[110, LB.top + LB.h + 8], [110, LBY], [138, LBY]], t: go, dur: 1.5, kind: 'ring', size: 16, color: T.accent });
    s.sfx(go, 'send', { note: 'G6', gain: 1.2, pan: PB });
    const atB = go + 1.5;                                           // 15.5
    s.set(atB, 'wire:pathB', 'color', T.wire, 0.3); s.set(atB, 'wire:pathB', 'flow', 0, 0);
    s.set(atB, 'laneB', 'color', T.fg, 0.2); s.set(atB, 'laneB', 'glow', 0.6, 0.2); s.set(atB + 0.4, 'laneB', 'glow', 0, 0.6); s.set(atB + 0.6, 'laneB', 'color', T.mid, 0.4);
    s.set(atB, 'slotB', 'color', T.accent, 0.2);
    s.set(atB, 'slotBT', 'text', 'req 2 · lookup', 0); s.set(atB, 'slotBT', 'color', T.accent, 0.2);
    s.set(atB, 'laneBSt', 'text', 'running', 0); s.set(atB, 'laneBSt', 'color', T.accent, 0.2);
    s.sfx(atB, 'arrive', { note: 'G5', pan: PB });
    const RUN = 5.2;
    s.set(atB, 'progB', 'len', 1, RUN, 'linear');
    for (let tk = atB + 0.6; tk < atB + RUN - 0.2; tk += 0.6) s.sfx(tk, 'work', { note: 'G4', gain: 0.8, pan: PB });
    // counts now 1 and 1, two different requests
    const tie = atB + 1.0;
    s.set(tie, 'cntA', 'glow', 1, 0.15); s.set(tie + 0.3, 'cntA', 'glow', 0, 0.5);
    s.set(tie, 'cntB', 'glow', 1, 0.15); s.set(tie + 0.3, 'cntB', 'glow', 0, 0.5);
    s.set(tie, 'sel', 'alpha', 0, 0.4);

    // ---- beat 4: B finishes while A continues; B's count falls ----
    const doneB = atB + RUN;                                        // 20.7
    s.set(doneB, 'slotB', 'color', T.ok, 0.2); s.set(doneB, 'progB', 'color', T.ok, 0.2);
    s.set(doneB, 'slotBT', 'text', 'req 2 · done', 0); s.set(doneB, 'slotBT', 'color', T.ok, 0.2);
    s.set(doneB, 'laneBSt', 'text', 'done', 0); s.set(doneB, 'laneBSt', 'color', T.ok, 0.2);
    s.sfx(doneB, 'ack', { note: 'G5', gain: 1.3, pan: PB });
    const dec = doneB + 0.6;
    setCount(dec, 'B', 0, T.ok);
    s.sfx(dec, 'arrive', { note: 'D5', gain: 0.7, pan: PLB });
    const clr = doneB + 1.4;
    s.set(clr, 'slotB', 'color', T.dim, 0.3); s.set(clr, 'slotBT', 'text', 'idle', 0); s.set(clr, 'slotBT', 'color', T.mid, 0.3);
    s.set(clr, 'progB', 'len', 0, 0.3); s.set(clr + 0.35, 'progB', 'color', T.accent, 0);
    s.set(clr, 'laneBSt', 'text', 'idle', 0); s.set(clr, 'laneBSt', 'color', T.mid, 0.3);
    const stillA = clr + 1.2;
    s.set(stillA, 'cntA', 'color', T.accent, 0.15); s.set(stillA + 1.0, 'cntA', 'color', T.mid, 0.4);
    s.set(stillA, 'slotA', 'glow', 1, 0.15); s.set(stillA + 0.3, 'slotA', 'glow', 0, 0.6);
    s.sfx(stillA, 'ack', { note: 'E5', gain: 1.2, pan: PA });

    // ---- beat 5: selection changed new assignments only ----
    const keep = stillA + 4.0;
    s.set(keep, 'stays', 'alpha', 1, 0.3);
    s.ripple(keep, [930, LA - 40], T.ok, { r0: 8, r1: 30, dur: 0.7, mark: 'check' });
    s.set(keep, 'laneA', 'color', T.ok, 0.25); s.set(keep + 1.4, 'laneA', 'color', T.mid, 0.5);
    s.sfx(keep, 'chime', { note: 'E5', gain: 0.7, pan: PA });
    const recap = keep + 1.8;
    s.set(recap, 'cntA', 'color', T.accent, 0.15); s.set(recap + 0.9, 'cntA', 'color', T.mid, 0.4);
    s.set(recap + 0.6, 'cntB', 'color', T.fg, 0.15); s.set(recap + 1.5, 'cntB', 'color', T.mid, 0.4);
    s.sfx(recap, 'ack', { note: 'E5', gain: 1.1, pan: PA }); s.sfx(recap + 0.6, 'ack', { note: 'G5', gain: 1.1, pan: PB });
    const endHold = recap + 5.6;
    s.fade(endHold, 1, 0.8);
    s.meta.duration = endHold + 1.4;
    s.meta.beats = { meet: 0, arrive: 7.5, cmpA, cmpB, pick: pickT, commit, atB, tie, doneB, dec, clr, stillA, keep, recap, fade: endHold };
  },
});

