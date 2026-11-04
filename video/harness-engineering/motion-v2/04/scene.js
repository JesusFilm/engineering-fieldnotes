/* Turn a failure into feedback — motion-v2 cut 04.
 * One mechanism: a failing access test names expected vs actual; that concrete mismatch goes to the agent;
 * the agent adds an ownership condition (keeping signed_in); the change stays unverified until the same request
 * reruns and returns the expected 403. The pass covers this one test only.
 * Composition: an API client view (requester, target invoice, request line, live response with body) above a large
 * expected/actual assertion pair; the response panel temporarily becomes the agent's editor.
 * Render from the repository root:
 *   node video/harness-engineering/motion-v2/04/engine/render.mjs video/harness-engineering/motion-v2/04/scene.js video/harness-engineering/motion-v2/04/video.mp4
 */
FlowVideo.scene({
  meta: { title: '', subtitle: '', duration: 38.5, fps: 30, speed: 0.9, veilTop: 225 },
  build(s) {
    const T = s.THEME;
    const L = -0.35, Rt = 0.35;

    // ---- compact title and the persistent test name ----
    s.node('title', 'label', { x: 540, y: 108, text: 'Failure → feedback', size: 76, weight: 800, color: T.title });
    s.node('testname', 'label', { x: 540, y: 186, text: 'test: cross-tenant read', size: 40, weight: 700, mono: true, color: T.mid });

    // ---- fixed inputs: requester, target, request ----
    s.node('tenant', 'disc', { x: 250, y: 370, r: 58, glyph: 'B', label: 'tenant B', color: T.accent, labelColor: T.fg });
    s.node('invoice', 'docv', { x: 820, y: 400, w: 250, h: 230, line0: '#7', line1: 'owner A', size0: 50, size1: 44, color: T.mid, line0Color: T.fg, line1Color: T.fg });
    s.node('req', 'label', { x: 360, y: 600, text: 'GET /invoices/7', size: 52, weight: 700, mono: true, color: T.mid });
    s.node('run', 'track', { x: 540, y: 668, w: 840, h: 12 });

    // ---- response panel (and, in its place, the agent's editor) ----
    s.node('resp', 'card', { x: 540, y: 960, w: 900, h: 480, title: 'Response', titleSize: 34, titleColor: T.mid, color: T.mid });
    s.node('status', 'label', { x: 540, y: 890, text: '—', size: 120, weight: 800, mono: true, color: T.dim });
    s.node('body', 'card', { x: 540, y: 1080, w: 640, h: 110, lineY: [55], lineSize: 46, color: T.bad, alpha: 0, l0Text: '#7 · owner A', l0Color: T.bad, pad: 150 });
    s.node('denied', 'label', { x: 540, y: 1080, text: 'denied', size: 52, weight: 700, mono: true, color: T.fg, alpha: 0 });
    s.node('editor', 'card', { x: 540, y: 960, w: 900, h: 480, title: 'Agent · auth check', titleSize: 34, titleColor: T.fg, color: T.fg, alpha: 0,
      lineY: [160, 300, 380], lineSize: 46, valueX: 480,
      l0Text: 'expected 403', l0Color: T.fg, l0Value: 'actual 200', l0ValueColor: T.bad, l0Alpha: 0,
      l1Text: 'allow if signed_in', l1Color: T.fg, l1Alpha: 0,
      l2Text: '+ and tenant == owner', l2Color: T.accent, l2Alpha: 0 });

    // ---- assertion pair ----
    s.node('expL', 'label', { x: 300, y: 1320, text: 'expected', size: 42, weight: 600, color: T.mid });
    s.node('actL', 'label', { x: 780, y: 1320, text: 'actual', size: 42, weight: 600, color: T.mid });
    s.node('exp', 'label', { x: 300, y: 1440, text: '403', size: 124, weight: 800, mono: true, color: T.fg, alpha: 0 });
    s.node('act', 'label', { x: 780, y: 1440, text: '—', size: 124, weight: 800, mono: true, color: T.dim });
    s.node('sym', 'label', { x: 540, y: 1440, text: '≠', size: 104, weight: 800, color: T.bad, alpha: 0 });
    s.node('verdict', 'label', { x: 540, y: 1620, text: '', size: 62, weight: 800, mono: true, color: T.bad });

    // One execution of the test; the rerun calls the same helper, so motion and sound match.
    const execute = (t0) => {
      s.pulse(t0, 'tenant', null, 0.6);
      s.set(t0, 'req', 'color', T.fg, 0.3);
      s.set(t0, 'run', 'scan', 1, 0.3); s.set(t0, 'run', 'color', T.mid, 0.3);
      s.sfx(t0, 'work', { note: 'C4', gain: 1.2, pan: L });
      s.set(t0 + 2.0, 'run', 'scan', 0, 0.3); s.set(t0 + 2.0, 'run', 'color', T.dim, 0.4);
      s.set(t0 + 2.0, 'req', 'color', T.mid, 0.6);
      s.set(t0 + 2.0, 'status', 'color', T.fg, 0.2);
      s.sfx(t0 + 2.0, 'arrive', { note: 'E5' });   // neutral: an HTTP response arrived
    };

    // ---- beat 1: who asks, whose invoice, and the contract ----
    let t = 1.5;
    s.pulse(t, 'tenant', null, 0.7); s.sfx(t, 'arrive', { note: 'C5', pan: L });
    t = 2.8;
    s.set(t, 'invoice', 'hl1', 1, 0.2); s.set(t + 1.0, 'invoice', 'hl1', 0, 0.5);
    s.sfx(t, 'arrive', { note: 'E5', pan: Rt });
    t = 4.2;
    s.set(t, 'exp', 'alpha', 1, 0.4); s.set(t, 'expL', 'color', T.fg, 0.3);
    s.sfx(t, 'ack', { note: 'G5', gain: 1.4 });

    // ---- beat 2: the test runs; 200 and another tenant's invoice come back ----
    t = 6.6;
    execute(t);
    s.set(t + 2.0, 'status', 'text', '200', 0);
    // a copy of the invoice leaves the document (which stays unchanged) and lands in the response body, inside the panel
    s.packet({ route: [[820, 525], [820, 1080], [560, 1080]], t: 9.2, dur: 1.0, kind: 'chip', size: 34, label: '#7 · owner A', color: T.bad });
    s.set(10.2, 'body', 'alpha', 1, 0.25);
    s.sfx(10.2, 'arrive', { note: 'E4', gain: 0.7, pan: Rt });
    t = 11.6;
    s.set(t, 'act', 'text', '200', 0); s.set(t, 'act', 'color', T.bad, 0); s.set(t, 'actL', 'color', T.fg, 0.3);
    s.set(t, 'sym', 'alpha', 1, 0.2);
    s.set(t, 'verdict', 'text', 'FAIL', 0); s.set(t, 'verdict', 'color', T.bad, 0);
    s.shake(t, 'act', 8, 0.4);
    s.sfx(t, 'miss', { gain: 6.0 });

    // ---- beat 3: the concrete mismatch goes to the agent ----
    t = 14.2;
    for (const id of ['resp', 'status', 'body']) s.set(t, id, 'alpha', 0, 0.4);
    s.set(t + 0.2, 'editor', 'alpha', 1, 0.4);
    s.sfx(t + 0.2, 'arrive', { note: 'E5', gain: 0.9 });
    t = 15.2;   // copies rise from the gap above the pair; the source values stay in place
    s.packet({ route: [[300, 1250], [303, 880]], t, dur: 1.4, kind: 'chip', size: 40, label: 'expected 403', color: T.fg });
    s.packet({ route: [[780, 1250], [708, 880]], t, dur: 1.4, kind: 'chip', size: 40, label: 'actual 200', color: T.bad });
    s.sfx(t, 'send', { note: 'G6', gain: 1.0 });
    s.set(16.6, 'editor', 'l0Alpha', 1, 0.25);
    s.sfx(16.6, 'deliver', { note: 'G5', gain: 1.3 });
    s.set(17.9, 'editor', 'l1Alpha', 1, 0.3);
    s.sfx(17.9, 'ack', { note: 'E5', gain: 1.0 });

    // ---- beat 4: the agent adds an ownership condition; the change is unverified ----
    t = 19.6;
    s.set(t, 'editor', 'l1HlColor', T.accent, 0); s.set(t, 'editor', 'l1Hl', 1, 0.2); s.set(t + 0.9, 'editor', 'l1Hl', 0, 0.4);
    s.sfx(t, 'work', { note: 'E4', gain: 0.9 });
    t = 20.8;
    s.set(t, 'editor', 'l2Alpha', 1, 0.3); s.set(t, 'editor', 'l2HlColor', T.accent, 0); s.set(t, 'editor', 'l2Hl', 1, 0.2); s.set(t + 1.2, 'editor', 'l2Hl', 0, 0.5);
    s.set(t, 'act', 'alpha', 0.35, 0.5); s.set(t, 'sym', 'alpha', 0.35, 0.5);   // the old result belongs to the old code
    s.set(t, 'verdict', 'text', 'unverified', 0); s.set(t, 'verdict', 'color', T.accent, 0);
    s.sfx(t, 'store', { note: 'E5', gain: 1.1 });
    t = 24.6;   // close the editor; a fresh run will produce a new actual value
    s.set(t, 'editor', 'alpha', 0, 0.4);
    s.set(t + 0.2, 'resp', 'alpha', 1, 0.4); s.set(t, 'status', 'text', '—', 0); s.set(t, 'status', 'color', T.dim, 0); s.set(t + 0.2, 'status', 'alpha', 1, 0.4);
    s.set(t, 'body', 'alpha', 0, 0);
    s.set(t, 'act', 'text', '—', 0); s.set(t, 'act', 'color', T.dim, 0); s.set(t, 'act', 'alpha', 1, 0.3); s.set(t, 'sym', 'alpha', 0, 0.3);
    s.sfx(t + 0.2, 'ack', { note: 'C6', gain: 1.0 });

    // ---- beat 5: the same request runs again on the changed check ----
    t = 26.4;
    s.pulse(t, 'testname', null, 0.6); s.set(t, 'testname', 'color', T.fg, 0.3); s.set(t + 1.0, 'testname', 'color', T.mid, 0.5);
    execute(t);
    s.set(t + 2.0, 'status', 'text', '403', 0);
    s.set(t + 2.0, 'denied', 'alpha', 1, 0.3);
    t = 29.8;
    s.set(t, 'act', 'text', '403', 0); s.set(t, 'act', 'color', T.ok, 0);
    s.set(t, 'sym', 'text', '=', 0); s.set(t, 'sym', 'color', T.ok, 0); s.set(t, 'sym', 'alpha', 1, 0.2);
    s.set(t, 'verdict', 'text', 'PASS · 1 test', 0); s.set(t, 'verdict', 'color', T.ok, 0);
    s.sfx(t, 'chime', { note: 'G5', gain: 1.0 });

    // ---- beat 6: hold the scoped result ----
    t = 32.2;
    s.pulse(t, 'testname', null, 0.6); s.set(t, 'testname', 'color', T.fg, 0.3);
    s.sfx(t, 'ack', { note: 'G5', gain: 1.0 });
    s.fade(36.6, 1, 1.0);
    s.meta.duration = 38.5;
  },
});
