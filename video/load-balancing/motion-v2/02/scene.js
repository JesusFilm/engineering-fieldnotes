/* Load balancing, lesson 02 "Share the work" — motion-v2 cut.
 * One mechanism: two servers run the same profile service, each with one work slot. While A is busy
 * with req 1, req 2 starts on B, so two separate requests run at the same time. Each still takes its
 * own full processing time: the two timeline bars overlap but have the same length.
 * Render from the repository root:
 *   node video/load-balancing/motion-v2/02/engine/render.mjs video/load-balancing/motion-v2/02/scene.js video/load-balancing/motion-v2/02/video.mp4 --sheet video/load-balancing/motion-v2/02/scratch/contact-sheet.png
 * Uses the cut-local engine copy (lesson 01's general panel/text/pill/step/field/arrow nodes, plus span, cursor, band and dash).
 */
FlowVideo.scene({
  meta: { title: 'Share the work', subtitle: 'TWO SERVERS · ONE SLOT EACH', subtitleSize: 36, duration: 37, fps: 30, speed: 1 },
  build(s) {
    const T = s.THEME;
    const PAPP = 0, PA = -0.45, PB = 0.45;
    const SEND1 = 5.6, SEND2 = 10.0, TRAVEL = 2.2, DUR = 8.4;      // request created -> arrives 2.2 s later
    const A1 = SEND1 + TRAVEL, A2 = SEND2 + TRAVEL, D1 = A1 + DUR;

    // ---- app: a list of requests (top) ----
    const APP = { top: 470, h: 300 };
    s.node('app', 'panel', { x: 540, y: APP.top + APP.h / 2, w: 840, h: APP.h, color: T.mid });
    s.node('appName', 'text', { x: 170, y: APP.top + 58, text: 'app', size: 56, weight: 800, color: T.fg });
    const rowY = [APP.top + 145, APP.top + 232];
    rowY.forEach((y, i) => {
      s.node('ph' + i, 'span', { x: 165, y, w: 750, h: 70, ghost: true, len: 1, color: T.dim, r: 14 });
      s.node('rq' + i, 'text', { x: 190, y, text: 'req ' + (i + 1), size: 52, weight: 700, mono: true, color: T.fg, alpha: 0 });
      s.node('rs' + i, 'text', { x: 890, y, align: 'right', text: 'waiting', size: 46, weight: 700, mono: true, color: T.accent, alpha: 0 });
    });

    // ---- lanes: each server has its own down (request) and up (response) path ----
    const laneTop = APP.top + APP.h + 18, laneBot = 932;
    const L = { aDown: 250, aUp: 330, bDown: 750, bUp: 830 };
    s.node('laneAd', 'arrow', { x: L.aDown, y: laneTop, x2: L.aDown, y2: laneBot, color: T.wire, head: 22 });
    s.node('laneAu', 'arrow', { x: L.aUp, y: laneBot, x2: L.aUp, y2: laneTop, color: T.wire, head: 22 });
    s.node('laneBd', 'arrow', { x: L.bDown, y: laneTop, x2: L.bDown, y2: laneBot, color: T.wire, head: 22 });
    s.node('laneBu', 'arrow', { x: L.bUp, y: laneBot, x2: L.bUp, y2: laneTop, color: T.wire, head: 22 });

    // ---- two identical servers ----
    const SV = { top: 950, h: 320, w: 420 };
    const srv = (id, cx, name) => {
      const left = cx - SV.w / 2;
      s.node(id, 'panel', { x: cx, y: SV.top + SV.h / 2, w: SV.w, h: SV.h, color: T.mid });
      s.node(id + 'Name', 'text', { x: left + 34, y: SV.top + 52, text: name, size: 52, weight: 800, color: T.fg });
      s.node(id + 'Svc', 'text', { x: left + 34, y: SV.top + 112, text: 'profile service', size: 44, weight: 600, color: T.mid });
      s.node(id + 'Slot', 'panel', { x: cx, y: SV.top + 228, w: SV.w - 60, h: 128, r: 18, color: T.dim });
      s.node(id + 'SlotT', 'text', { x: left + 60, y: SV.top + 210, text: 'free', size: 50, weight: 700, mono: true, color: T.mid });
      s.node(id + 'Prog', 'span', { x: left + 60, y: SV.top + 260, w: SV.w - 120, h: 12, r: 6, trackW: 8, color: T.accent, len: 0 });
    };
    srv('A', 290, 'server A');
    srv('B', 790, 'server B');

    // ---- timeline (bottom) ----
    const TL = { top: 1330, h: 390, x0: 200, w: 760, t0: 6.6, t1: 22.6 };
    const xAt = (t) => (t - TL.t0) / (TL.t1 - TL.t0);            // 0-1 along the track
    s.node('tl', 'panel', { x: 540, y: TL.top + TL.h / 2, w: 920, h: TL.h, color: T.dim });
    s.node('wkLab', 'text', { x: 120, y: TL.top + 58, text: 'working', size: 46, weight: 600, color: T.mid });
    s.node('wkN', 'text', { x: 320, y: TL.top + 58, text: '0', size: 58, weight: 800, mono: true, color: T.mid });
    const rowA = TL.top + 170, rowB = TL.top + 290;
    s.node('rowA', 'text', { x: 130, y: rowA, text: 'A', size: 52, weight: 800, mono: true, color: T.mid });
    s.node('rowB', 'text', { x: 130, y: rowB, text: 'B', size: 52, weight: 800, mono: true, color: T.mid });
    s.node('band', 'band', { x: TL.x0 + TL.w * xAt(A2), w: TL.w * (xAt(D1) - xAt(A2)), y: (rowA + rowB) / 2, h: 250, color: T.fg, alpha: 0 });
    s.node('bandLab', 'text', { x: TL.x0 + TL.w * (xAt(A2) + xAt(D1)) / 2, y: TL.top + 58, align: 'center', text: 'same time', size: 44, weight: 700, color: T.fg, alpha: 0 });
    s.node('barA', 'span', { x: TL.x0, y: rowA, w: TL.w, h: 66, color: T.accent, text: 'req 1', track: 1, trackW: 6 });
    s.node('barB', 'span', { x: TL.x0, y: rowB, w: TL.w, h: 66, color: T.accent, text: 'req 2', track: 1, trackW: 6 });
    s.node('ghost', 'span', { x: TL.x0, y: rowA, w: TL.w, h: 78, ghost: true, color: T.fg, alpha: 0, r: 16 });
    s.node('play', 'cursor', { x: TL.x0, w: TL.w, y: TL.top + 110, y2: TL.top + 350, color: T.fg, alpha: 0 });

    // ---- req 3 (final question) ----
    s.node('rq3', 'pill', { x: 540, y: 850, w: 200, h: 72, size: 44, text: 'req 3', color: T.fg, alpha: 0 });
    s.node('q3', 'text', { x: 540, y: 920, align: 'center', text: '?', size: 60, weight: 800, color: T.accent, alpha: 0 });
    s.node('optA', 'dash', { x: 445, y: 870, x2: 400, y2: 940, color: T.mid, draw: 0 });
    s.node('optB', 'dash', { x: 635, y: 870, x2: 680, y2: 940, color: T.mid, draw: 0 });

    // ---- helpers ----
    const lane = (t, id, on, c) => { s.set(t, id, 'color', on ? c : T.wire, 0.25); s.set(t, id, 'flow', on ? 1 : 0, 0); s.set(t, id, 'glow', on ? 0.5 : 0, 0.25); };
    const working = (t, n) => { s.set(t, 'wkN', 'text', String(n), 0); s.set(t, 'wkN', 'color', n ? T.accent : T.mid, 0.2); s.set(t, 'wkN', 'scale', 1.25, 0.1); s.set(t + 0.1, 'wkN', 'scale', 1, 0.25); };
    const ticks = (t0, t1, note, pan) => { for (let k = t0 + 0.8; k < t1 - 0.2; k += 0.8) s.sfx(k, 'work', { note, gain: 0.9, pan }); };

    // send a request from row i down a lane into server id; returns arrival time
    const send = (t, i, laneId, x, id, notes, pan) => {
      s.set(t, 'ph' + i, 'alpha', 0, 0.3);
      s.set(t, 'rq' + i, 'alpha', 1, 0.3); s.set(t, 'rs' + i, 'alpha', 1, 0.3);
      s.sfx(t, 'store', { note: 'C5', gain: 0.9, pan: PAPP });
      const go = t + 1.0;
      lane(go, laneId, true, T.accent);
      s.packet({ route: [[x, laneTop - 8], [x, laneBot + 8]], t: go, dur: 1.2, kind: 'ring', size: 20, color: T.accent });
      s.sfx(go, 'send', { note: 'C6', gain: 1.3, pan: PAPP });
      const at = go + 1.2;
      lane(at, laneId, false);
      s.ripple(at, [x, SV.top], T.fg, { r0: 8, r1: 32, dur: 0.5 });
      s.set(at, id, 'color', T.fg, 0.2); s.set(at, id, 'glow', 0.6, 0.2); s.set(at + 0.4, id, 'glow', 0, 0.6);
      s.set(at, id + 'Slot', 'color', T.accent, 0.2);
      s.set(at, id + 'SlotT', 'text', 'req ' + (i + 1), 0); s.set(at, id + 'SlotT', 'color', T.accent, 0.2);
      s.sfx(at, 'arrive', { note: notes.arrive, pan });
      return at;
    };
    // run on server id for dur; bar grows on its timeline row
    const run = (at, dur, id, bar, notes, pan) => {
      s.set(at, id + 'Prog', 'len', 1, dur, 'linear');
      s.set(at, bar, 'from', xAt(at), 0); s.set(at, bar, 'len', xAt(at + dur) - xAt(at), dur, 'linear');
      ticks(at, at + dur, notes.work, pan);
      const d = at + dur;
      s.set(d, id + 'Prog', 'color', T.ok, 0.2); s.set(d, bar, 'color', T.ok, 0.25);
      s.set(d, id + 'Slot', 'color', T.ok, 0.2); s.set(d, id + 'SlotT', 'color', T.ok, 0.2);
      s.set(d, id, 'color', T.ok, 0.2);
      s.sfx(d, 'ack', { note: notes.ack, gain: 1.3, pan });
      return d;
    };
    // response from server id up its lane to row i
    const respond = (t, i, laneId, x, id, notes, pan) => {
      lane(t, laneId, true, T.ok);
      s.packet({ route: [[x, laneBot + 8], [x, laneTop - 8]], t, dur: 1.2, kind: 'dot', size: 20, color: T.ok });
      s.sfx(t, 'send', { note: notes.send, gain: 1.3, pan });
      s.set(t + 0.3, id + 'SlotT', 'text', 'free', 0); s.set(t + 0.3, id + 'SlotT', 'color', T.mid, 0.3);
      s.set(t + 0.3, id + 'Slot', 'color', T.dim, 0.3); s.set(t + 0.3, id + 'Prog', 'len', 0, 0.3); s.set(t + 0.6, id + 'Prog', 'color', T.accent, 0);
      s.set(t + 0.3, id, 'color', T.mid, 0.4);
      const at = t + 1.2;
      lane(at, laneId, false);
      s.ripple(at, [x, APP.top + APP.h], T.ok, { r0: 8, r1: 32, dur: 0.5 });
      s.set(at, 'rs' + i, 'text', 'done', 0); s.set(at, 'rs' + i, 'color', T.ok, 0.2);
      s.set(at, 'rs' + i, 'scale', 1.15, 0.1); s.set(at + 0.1, 'rs' + i, 'scale', 1, 0.25);
      s.sfx(at, 'deliver', { note: 'C5', gain: 1.4, pan: PAPP });
      return at;
    };
    const NA = { arrive: 'E5', work: 'E4', ack: 'E5', send: 'E6' }, NB = { arrive: 'G5', work: 'G4', ack: 'G5', send: 'G6' };

    // ---- beat 1: two servers run the same service ----
    const all = ['app', 'appName', 'ph0', 'ph1', 'laneAd', 'laneAu', 'laneBd', 'laneBu', 'tl', 'wkLab', 'wkN', 'rowA', 'rowB', 'barA', 'barB'];
    for (const id of ['A', 'B']) all.push(id, id + 'Name', id + 'Svc', id + 'Slot', id + 'SlotT', id + 'Prog');
    for (const id of all) { s.set(0, id, 'alpha', 0, 0); s.set(0.1, id, 'alpha', 1, 0.6); }
    s.pulse(1.2, 'A', T.fg, 0.6); s.sfx(1.2, 'ack', { note: 'E5', gain: 1.4, pan: PA });
    s.pulse(2.1, 'B', T.fg, 0.6); s.sfx(2.1, 'ack', { note: 'G5', gain: 1.4, pan: PB });
    for (const id of ['ASvc', 'BSvc']) { s.set(3.1, id, 'color', T.fg, 0.2); s.set(4.3, id, 'color', T.mid, 0.5); }
    for (const id of ['ASlot', 'BSlot']) { s.set(3.1, id, 'color', T.fg, 0.2); s.set(4.3, id, 'color', T.dim, 0.5); }
    s.sfx(3.1, 'ack', { note: 'E5', gain: 1.0, pan: PA }); s.sfx(3.1, 'ack', { note: 'G5', gain: 1.0, pan: PB });

    // ---- beat 2: req 1 starts on server A ----
    const a1 = send(SEND1, 0, 'laneAd', L.aDown, 'A', NA, PA);        // 7.8
    s.set(a1, 'play', 'alpha', 1, 0.3); s.set(a1, 'play', 'pos', xAt(a1), 0);
    s.set(a1, 'play', 'pos', xAt(TL.t1), TL.t1 - a1, 'linear');
    working(a1, 1);
    const d1 = run(a1, DUR, 'A', 'barA', NA, PA);                     // 16.2

    // ---- beat 3: req 2 starts on server B while A works ----
    const a2 = send(SEND2, 1, 'laneBd', L.bDown, 'B', NB, PB);       // 12.2 (ticks interleave with A's)
    working(a2, 2);
    const d2 = run(a2, DUR, 'B', 'barB', NB, PB);                     // 20.6

    // ---- beat 4: both finish independently ----
    working(d1, 1);
    const r1 = respond(d1 + 0.5, 0, 'laneAu', L.aUp, 'A', NA, PA);
    working(d2, 0);
    const r2 = respond(d2 + 0.5, 1, 'laneBu', L.bUp, 'B', NB, PB);
    s.set(d2 + 0.2, 'play', 'alpha', 0, 0.6);

    // ---- beat 5: separate requests used separate capacity ----
    let t = r2 + 1.4;                                                // compare lengths: outline of bar A drops onto bar B
    s.set(t, 'ghost', 'from', xAt(a1), 0); s.set(t, 'ghost', 'len', xAt(a1 + DUR) - xAt(a1), 0);
    s.set(t, 'ghost', 'alpha', 1, 0.3); s.pulse(t, 'barA', null, 0.5);
    s.sfx(t, 'ack', { note: 'E5', gain: 1.2, pan: PA });
    s.set(t + 0.6, 'ghost', 'dy', rowB - rowA, 0.8);
    s.set(t + 1.6, 'ghost', 'dx', TL.w * (xAt(a2) - xAt(a1)), 0.9);
    s.set(t + 2.5, 'barB', 'glow', 1, 0.15); s.set(t + 2.7, 'barB', 'glow', 0, 0.6);
    s.sfx(t + 2.5, 'ack', { note: 'G5', gain: 1.2, pan: PB });
    const matchT = t + 2.5;
    s.set(matchT + 1.4, 'ghost', 'alpha', 0, 0.5);
    t = matchT + 2.0;                                                // shade the time both were working
    s.set(t, 'band', 'alpha', 1, 0.4); s.set(t, 'bandLab', 'alpha', 1, 0.4);
    s.sfx(t, 'chime', { note: 'C5', gain: 0.8, pan: PAPP });
    const bandT = t;
    t = bandT + 2.6;                                                 // someone still has to choose
    s.set(t, 'rq3', 'alpha', 1, 0.3); s.set(t, 'rq3', 'scale', 0.8, 0); s.set(t, 'rq3', 'scale', 1, 0.35, 'back');
    s.set(t + 0.4, 'optA', 'draw', 1, 0.5); s.set(t + 0.4, 'optB', 'draw', 1, 0.5);
    s.set(t + 0.9, 'q3', 'alpha', 1, 0.2); s.set(t + 0.9, 'q3', 'scale', 1.3, 0); s.set(t + 0.9, 'q3', 'scale', 1, 0.3, 'back');
    s.sfx(t, 'store', { note: 'C5', gain: 0.8, pan: PAPP });
    s.sfx(t + 0.9, 'ack', { note: 'C4', gain: 1.0, pan: PAPP });
    const qT = t;
    const endHold = qT + 5.5;
    s.fade(endHold, 1, 0.8);
    s.meta.duration = endHold + 1.4;
    s.meta.beats = { meet: 0, first: SEND1, second: SEND2, a1, a2, d1, r1, d2, r2, compare: r2 + 1.4, match: matchT, band: bandT, req3: qT, fade: endHold };
  },
});

