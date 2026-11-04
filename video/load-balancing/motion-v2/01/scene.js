/* Load balancing, lesson 01 "One request" — motion-v2 cut.
 * One mechanism: the application asks for user 42's profile, the server does that work step by step
 * while the application waits, and only after the work finishes does a response travel back and
 * fill the application's empty profile fields.
 * Request travels down the left lane (hollow marker); response travels up the right lane (filled marker).
 * Render from the repository root:
 *   node video/load-balancing/motion-v2/01/engine/render.mjs video/load-balancing/motion-v2/01/scene.js video/load-balancing/motion-v2/01/video.mp4 --sheet video/load-balancing/motion-v2/01/scratch/contact-sheet.png
 * Uses the cut-local engine copy (adds general panel, text, pill, step, field and arrow nodes and a ring packet).
 */
FlowVideo.scene({
  meta: { title: 'One request', subtitle: 'ASK · WORK · ANSWER', subtitleSize: 36, duration: 34, fps: 30, speed: 1 },
  build(s) {
    const T = s.THEME;
    const APP = { cx: 540, top: 570, h: 420 }, SRV = { cx: 540, top: 1330, h: 420 };
    const appBot = APP.top + APP.h, srvTop = SRV.top;
    const REQ_X = 445, RES_X = 635;
    const pan = (x) => ((x - 540) / 540) * 0.6;
    const PAPP = -0.15, PSRV = 0.15;

    // ---- application screen (top) ----
    s.node('app', 'panel', { x: APP.cx, y: APP.top + APP.h / 2, w: 840, h: APP.h, color: T.mid });
    s.node('appName', 'text', { x: 170, y: APP.top + 70, text: 'app', size: 56, weight: 800, color: T.fg });
    s.node('btn', 'pill', { x: 760, y: APP.top + 70, w: 330, h: 80, size: 42, text: 'Load profile', color: T.fg });
    s.node('fUser', 'field', { x: 180, y: APP.top + 180, key: 'user', keyW: 190, size: 52, value: '42', reveal: 1, valueColor: T.fg });
    s.node('fName', 'field', { x: 180, y: APP.top + 265, key: 'name', keyW: 190, size: 52, value: 'Maya', slotW: 230, valueColor: T.ok });
    s.node('fPlan', 'field', { x: 180, y: APP.top + 350, key: 'plan', keyW: 190, size: 52, value: 'pro', slotW: 230, valueColor: T.ok });

    // ---- lanes between them ----
    s.node('reqLane', 'arrow', { x: REQ_X, y: appBot + 18, x2: REQ_X, y2: srvTop - 18, color: T.wire });
    s.node('resLane', 'arrow', { x: RES_X, y: srvTop - 18, x2: RES_X, y2: appBot + 18, color: T.wire });
    const midY = (appBot + srvTop) / 2;
    s.node('reqName', 'text', { x: REQ_X - 60, y: midY - 72, align: 'right', text: 'request', size: 46, weight: 600, color: T.mid });
    s.node('reqMsg1', 'text', { x: REQ_X - 60, y: midY + 4, align: 'right', mono: true, text: 'GET', size: 48, weight: 700, color: T.accent, alpha: 0 });
    s.node('reqMsg2', 'text', { x: REQ_X - 60, y: midY + 68, align: 'right', mono: true, text: '/users/42', size: 48, weight: 700, color: T.accent, alpha: 0 });
    s.node('resName', 'text', { x: RES_X + 60, y: midY - 72, align: 'left', text: 'response', size: 46, weight: 600, color: T.mid });
    s.node('resMsg1', 'text', { x: RES_X + 60, y: midY + 4, align: 'left', mono: true, text: '200 OK', size: 48, weight: 700, color: T.ok, alpha: 0 });
    s.node('resMsg2', 'text', { x: RES_X + 60, y: midY + 68, align: 'left', mono: true, text: 'Maya · pro', size: 48, weight: 700, color: T.ok, alpha: 0 });

    // ---- server (bottom) ----
    s.node('srv', 'panel', { x: SRV.cx, y: SRV.top + SRV.h / 2, w: 840, h: SRV.h, color: T.mid });
    s.node('srvName', 'text', { x: 170, y: SRV.top + 70, text: 'server', size: 56, weight: 800, color: T.fg });
    s.node('srvState', 'text', { x: 910, y: SRV.top + 70, align: 'right', mono: true, text: 'idle', size: 46, weight: 700, color: T.mid });
    const stepOpts = { box: 46, w: 600, size: 48, barGap: 54, textAlpha: 0, track: 0.35 };
    s.node('st0', 'step', Object.assign({ x: 175, y: SRV.top + 185, text: 'find user 42' }, stepOpts));
    s.node('st1', 'step', Object.assign({ x: 175, y: SRV.top + 315, text: 'build profile' }, stepOpts));

    // ---- helpers ----
    const lane = (t, id, on, c) => { s.set(t, id, 'color', on ? c : T.wire, 0.25); s.set(t, id, 'flow', on ? 1 : 0, 0); s.set(t, id, 'glow', on ? 0.5 : 0, 0.25); };
    const work = (t, id, dur) => {
      s.set(t, id, 'box', T.accent, 0.2); s.set(t, id, 'boxFill', 1, 0.2);
      s.set(t, id, 'textColor', T.fg, 0.2); s.set(t, id, 'barColor', T.accent, 0);
      s.set(t, id, 'bar', 1, dur, 'linear');
      for (let k = t + 0.2; k < t + dur - 0.1; k += 0.45) s.sfx(k, 'work', { note: 'G3', gain: 0.9, pan: PSRV });
      const d = t + dur;
      s.set(d, id, 'box', T.ok, 0.2); s.set(d, id, 'barColor', T.ok, 0.25); s.set(d, id, 'check', 1, 0.35, 'out');
      s.set(d + 0.4, id, 'textColor', T.mid, 0.6);
      s.sfx(d, 'ack', { note: 'G5', gain: 1.3, pan: PSRV });
      return d;
    };

    // ---- beat 1: meet the application and the server ----
    for (const id of ['app', 'appName', 'btn', 'fUser', 'fName', 'fPlan', 'reqLane', 'resLane', 'reqName', 'resName', 'srv', 'srvName', 'srvState', 'st0', 'st1']) {
      s.set(0, id, 'alpha', 0, 0); s.set(0.1, id, 'alpha', 1, 0.6);
    }
    s.pulse(1.0, 'app', T.fg, 0.6); s.sfx(1.0, 'ack', { note: 'C6', gain: 1.4, pan: PAPP });
    s.pulse(2.1, 'srv', T.fg, 0.6); s.sfx(2.1, 'ack', { note: 'G5', gain: 1.4, pan: PSRV });

    // ---- beat 2: the application sends a request ----
    let t = 5.0;                                   // press Load profile
    s.set(t, 'btn', 'scale', 0.92, 0.1); s.set(t + 0.1, 'btn', 'scale', 1, 0.2);
    s.set(t, 'btn', 'fill', 1, 0.15);
    s.set(t + 0.25, 'btn', 'text', 'waiting', 0); s.set(t + 0.25, 'btn', 'color', T.accent, 0.2);
    s.set(t + 0.25, 'reqMsg1', 'alpha', 1, 0.3); s.set(t + 0.25, 'reqMsg2', 'alpha', 1, 0.3);
    s.set(t + 0.25, 'reqName', 'color', T.fg, 0.3);
    s.sfx(t, 'store', { note: 'C5', gain: 1.0, pan: PAPP });
    t = 7.2;                                       // request leaves
    lane(t, 'reqLane', true, T.accent);
    s.packet({ route: [[REQ_X, appBot + 10], [REQ_X, srvTop - 10]], t, dur: 1.6, kind: 'ring', size: 20, color: T.accent });
    s.sfx(t, 'send', { note: 'C6', gain: 1.3, pan: PAPP });
    t = 8.8;                                       // request reaches the server
    lane(t, 'reqLane', false);
    s.set(t, 'reqName', 'color', T.mid, 0.4);
    s.ripple(t, [REQ_X, srvTop], T.fg, { r0: 10, r1: 56, dur: 0.6 });
    s.set(t, 'srv', 'color', T.fg, 0.2); s.set(t, 'srv', 'glow', 0.7, 0.2); s.set(t + 0.4, 'srv', 'glow', 0, 0.6);
    s.set(t, 'srvState', 'text', 'working', 0); s.set(t, 'srvState', 'color', T.accent, 0.2);
    for (const id of ['st0', 'st1']) { s.set(t + 0.2, id, 'textAlpha', 1, 0.4); s.set(t + 0.2, id, 'box', T.mid, 0.4); }
    s.sfx(t, 'arrive', { note: 'G4', pan: PSRV });

    // ---- beat 3: the server processes the request (app keeps waiting, silently) ----
    let d0 = work(10.4, 'st0', 3.6);
    let d1 = work(d0 + 0.8, 'st1', 3.6);
    for (const tp of [12.2, 16.6]) s.pulse(tp, 'btn', null, 0.7);
    t = d1 + 0.8;                                  // 19.2 response ready (not sent yet)
    s.set(t, 'srvState', 'text', 'ready', 0); s.set(t, 'srvState', 'color', T.ok, 0.2);
    s.set(t, 'srv', 'color', T.ok, 0.3);
    s.set(t, 'resMsg1', 'alpha', 1, 0.3); s.set(t, 'resMsg2', 'alpha', 1, 0.3); s.set(t, 'resName', 'color', T.fg, 0.3);
    s.sfx(t, 'store', { note: 'G4', gain: 1.1, pan: PSRV });
    const readyT = t;

    // ---- beat 4: the server sends the response ----
    t = readyT + 2.6;                              // 21.8
    lane(t, 'resLane', true, T.ok);
    s.packet({ route: [[RES_X, srvTop - 10], [RES_X, appBot + 10]], t, dur: 1.6, kind: 'dot', size: 20, color: T.ok });
    s.sfx(t, 'send', { note: 'G5', gain: 1.3, pan: PSRV });
    s.set(t + 0.3, 'srvState', 'text', 'idle', 0); s.set(t + 0.3, 'srvState', 'color', T.mid, 0.3);
    s.set(t + 0.3, 'srv', 'color', T.mid, 0.5);
    const sendT = t;
    t = sendT + 1.6;                               // 23.4 response reaches the app
    lane(t, 'resLane', false);
    s.set(t, 'resName', 'color', T.mid, 0.4);
    s.ripple(t, [RES_X, appBot], T.ok, { r0: 10, r1: 50, dur: 0.6 });
    s.set(t, 'btn', 'text', 'received', 0); s.set(t, 'btn', 'color', T.ok, 0.2);
    s.set(t, 'app', 'color', T.fg, 0.2); s.set(t, 'app', 'glow', 0.6, 0.2); s.set(t + 0.4, 'app', 'glow', 0, 0.6);
    s.sfx(t, 'deliver', { note: 'C5', gain: 1.5, pan: PAPP });
    const arriveT = t;

    // ---- beat 5: the application uses the result ----
    t = arriveT + 1.8;                             // 25.2
    s.set(t, 'fName', 'reveal', 1, 0.35); s.set(t, 'fName', 'glow', 1, 0.2); s.set(t + 0.3, 'fName', 'glow', 0, 0.6);
    s.sfx(t, 'store', { note: 'C5', gain: 1.0, pan: PAPP });
    s.set(t + 0.7, 'fPlan', 'reveal', 1, 0.35); s.set(t + 0.7, 'fPlan', 'glow', 1, 0.2); s.set(t + 1.0, 'fPlan', 'glow', 0, 0.6);
    s.sfx(t + 0.7, 'store', { note: 'C5', gain: 1.0, pan: PAPP });
    t += 1.5;                                      // 26.7 profile shown
    s.set(t, 'btn', 'text', 'loaded', 0); s.set(t, 'app', 'color', T.ok, 0.3);
    s.sfx(t, 'chime', { note: 'C5', gain: 0.7, pan: PAPP });
    const endHold = t + 6.0;                       // quiet final hold
    s.fade(endHold, 1, 0.8);
    s.meta.duration = endHold + 1.4;
    s.meta.beats = { meet: 0, request: 5.0, process: 10.4, response: sendT, receive: arriveT, ready: readyT, loaded: t, fade: endHold };
  },
});

