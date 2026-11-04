/* Cross a service boundary — observability-and-tracing motion-v2 cut 03.
 * One mechanism: the caller's trace context lives in its own process memory. Transport code injects it into
 * the outgoing HTTP request as a traceparent header; the receiving service extracts it into its own context
 * and starts a child span from it. Both services must export their spans before a trace view shows the path.
 * Render from the repository root:
 *   node video/observability-and-tracing/motion-v2/03/engine/render.mjs video/observability-and-tracing/motion-v2/03/scene.js video/observability-and-tracing/motion-v2/03/video.mp4 --sheet video/observability-and-tracing/motion-v2/03/scratch/contact-sheet.png
 * Uses the cut-local engine copy (record, frame, segtext and request node types; label align; chip size).
 */
FlowVideo.scene({
  meta: { title: '', subtitle: '', duration: 45, fps: 30, speed: 1 },
  build(s) {
    const T = s.THEME, TR = T.info, KEYS = ['trace', 'span', 'parent'];
    const pan = (ref) => s.panOf(ref);

    // ---- title ----
    s.node('t1', 'label', { x: 540, y: 290, text: 'Cross a service', size: 84, weight: 800, color: T.title });
    s.node('t2', 'label', { x: 540, y: 384, text: 'boundary', size: 84, weight: 800, color: T.title });

    // ---- network lane between the two processes (behind everything) ----
    s.wire('lane', [540, 822], [540, 1298]);
    s.node('http', 'label', { x: 985, y: 1060, text: 'HTTP', size: 40, weight: 600, mono: true, color: T.mid });
    // export routes along the right margin, hidden until export
    s.wire('expA', [1000, 824], [914, 1010], { via: [[1000, 1010]] });
    s.wire('expB', [1000, 1296], [914, 1100], { via: [[1000, 1100]] });
    for (const w of ['expA', 'expB']) s.set(0, 'wire:' + w, 'alpha', 0, 0);

    // ---- two processes ----
    const proc = (id, y, name) => {
      s.node(id + 'F', 'frame', { x: 540, y, w: 1000, h: 360, color: T.mid });
      s.node(id + 'Name', 'label', { x: 790, y: id === 'snd' ? y - 128 : y + 140, text: name, size: 40, weight: 600, color: T.mid });
      s.node(id + 'CtxF', 'frame', { x: 790, y: y + 20, w: 400, h: 150, color: T.dim });
      s.node(id + 'CtxL', 'label', { x: 790, y: y - 18, text: 'context', size: 40, weight: 500, color: T.mid });
      s.node(id + 'CtxV', 'segtext', { x: 790, y: y + 46, size: 44, segs: [['4bf9', TR], [' · ', T.mid], ['a1', T.fg]], alpha: 0 });
      s.node(id + 'CtxE', 'label', { x: 790, y: y + 46, text: '—', size: 44, weight: 700, mono: true, color: T.mid });
      s.node(id + 'Card', 'record', { x: 300, y: y + 5, w: 460, head: 80, rowH: 62, keys: KEYS, valX: 190,
        title: id === 'snd' ? 'agent task' : 'run tests', status: 'running', statusColor: T.accent, alpha: 0, color: T.mid });
    };
    proc('snd', 645, 'agent process');
    proc('rcv', 1475, 'test service');

    // ---- the HTTP request (docked under the sender, later moves down to the receiver) ----
    const DROP = 220;
    s.node('req', 'request', { x: 540, y: 955, w: 760, h: 220, title: 'POST /run-tests', key: 'traceparent', valX: 330,
      segs: [['00-', T.mid], ['4bf9', TR], ['-', T.mid], ['a1', T.fg], ['-01', T.mid]],
      decode: [[1, 'trace', TR], [3, 'parent', T.fg]], alpha: 0, color: T.mid });

    // ---- trace view (replaces the request lane at the end) ----
    s.node('tv', 'frame', { x: 500, y: 1060, w: 820, h: 380, color: T.dim, alpha: 0 });
    s.node('tvTitle', 'label', { x: 130, y: 915, text: 'trace view', size: 40, weight: 600, align: 'left', color: T.fg, alpha: 0 });
    s.node('tvTrace', 'label', { x: 880, y: 915, text: 'trace 4bf9', size: 40, weight: 700, mono: true, align: 'right', color: TR, alpha: 0 });
    s.node('tvEmpty', 'label', { x: 500, y: 1065, text: '0 spans received', size: 40, weight: 600, mono: true, color: T.mid, alpha: 0 });
    s.wire('br', [150, 1036], [194, 1100], { via: [[150, 1100]] });
    s.set(0, 'wire:br', 'alpha', 0, 0);
    const tvRow = (id, x, y, name, svc, sid) => {
      s.node(id + 'N', 'label', { x, y, text: name, size: 40, weight: 700, mono: true, align: 'left', color: T.fg, alpha: 0 });
      s.node(id + 'S', 'label', { x: 500, y, text: svc, size: 40, weight: 500, mono: true, align: 'left', color: T.mid, alpha: 0 });
      s.node(id + 'I', 'label', { x: 880, y, text: sid, size: 40, weight: 700, mono: true, align: 'right', color: T.fg, alpha: 0 });
    };
    tvRow('rA', 130, 1010, 'agent task', 'agent', 'a1');
    tvRow('rB', 210, 1100, 'run tests', 'test service', 'd4');

    // ---- helpers ----
    const hl = (t, id, row, hold = 0.9) => { s.set(t, id, 'r' + row + 'Hl', 1, 0.15); s.set(t + hold, id, 'r' + row + 'Hl', 0, 0.5); };
    const fill = (t, id, row, val, color) => {
      s.set(t, id, 'r' + row + 'Val', val, 0); s.set(t, id, 'r' + row + 'ValColor', color, 0);
      s.set(t, id, 'r' + row + 'Alpha', 1, 0.25); hl(t, id, row);
    };
    const ctxFill = (t, id) => {
      s.set(t, id + 'CtxE', 'alpha', 0, 0.2); s.set(t, id + 'CtxV', 'alpha', 1, 0.3);
      s.set(t, id + 'CtxF', 'color', TR, 0.2); s.pulse(t, id + 'CtxF'); s.set(t + 0.9, id + 'CtxF', 'color', T.mid, 0.5);
    };
    const ctxPulse = (t, id) => { s.set(t, id + 'CtxF', 'color', TR, 0.15); s.pulse(t, id + 'CtxF'); s.set(t + 0.8, id + 'CtxF', 'color', T.mid, 0.4); };

    // ---- beat 1: two separate processes; only the sender has a trace context ----
    let t = 1.2;
    s.set(t, 'sndCard', 'alpha', 1, 0.3); s.set(t, 'sndCard', 'color', T.fg, 0.2);
    fill(t + 0.1, 'sndCard', 0, '4bf9', TR); fill(t + 0.1, 'sndCard', 1, 'a1', T.fg); fill(t + 0.1, 'sndCard', 2, '—', T.mid);
    s.sfx(t, 'store', { note: 'C5', gain: 1.2, pan: pan([300, 645]) });
    t = 2.4;                                                     // the sender's current context, in its own memory
    ctxFill(t, 'snd');
    s.sfx(t, 'ack', { note: 'C5', gain: 1.4, pan: pan([790, 645]) });
    t = 3.4;                                                     // the test service has none
    s.pulse(t, 'rcvCtxF', T.fg, 0.5); s.pulse(t, 'rcvCtxE', T.fg, 0.5);
    s.sfx(t, 'ack', { note: 'G4', gain: 1.2, pan: pan([790, 1475]) });
    t = 4.4;                                                     // the outgoing request, header still empty
    s.set(t, 'req', 'alpha', 1, 0.3); s.pulse(t, 'req', T.fg);
    s.sfx(t, 'store', { note: 'E5', gain: 1.1, pan: 0 });

    // ---- beat 2: inject the context into the request, then send it ----
    t = 9.0;
    ctxPulse(t, 'snd');
    s.packet({ route: [[790, 750], [790, 905], [700, 1000]], t: t + 0.1, dur: 0.9, kind: 'chip', label: '4bf9 · a1', size: 40, color: TR, fade: 0.15 });
    s.sfx(t + 0.1, 'send', { note: 'A6', gain: 1.1, pan: pan([790, 700]) });
    t = 10.0;                                                    // header written
    s.set(t, 'req', 'fill', 1, 0.3); s.set(t, 'req', 'hl', 1, 0.15); s.set(t + 1.0, 'req', 'hl', 0, 0.5);
    s.sfx(t, 'store', { note: 'A5', gain: 1.3, pan: 0 });
    t = 10.9;                                                    // it names the trace and the parent span
    s.set(t, 'req', 'decode', 1, 0.4);
    hl(t, 'sndCard', 0, 1.0); hl(t, 'sndCard', 1, 1.0);
    s.sfx(t, 'ack', { note: 'A5', gain: 1.0, pan: 0 });
    t = 13.0;                                                    // the request crosses to the test service
    s.set(t, 'wire:lane', 'color', T.fg, 0.2); s.set(t, 'wire:lane', 'flow', 1, 0);
    s.set(t, 'req', 'dy', DROP, 1.4); s.set(t, 'req', 'color', T.fg, 0.2);
    s.sfx(t, 'send', { note: 'E6', gain: 1.2, pan: 0 });
    t = 14.4;
    s.set(t, 'wire:lane', 'color', T.wire, 0.4); s.set(t, 'wire:lane', 'flow', 0, 0);
    s.set(t, 'rcvF', 'color', T.fg, 0.2); s.pulse(t, 'rcvF'); s.set(t + 0.8, 'rcvF', 'color', T.mid, 0.4);
    s.ripple(t, [540, 1300], T.fg, { r0: 12, r1: 70 });
    s.sfx(t, 'arrive', { note: 'G5', gain: 1.0, pan: 0 });
    s.set(t + 0.6, 'req', 'color', T.mid, 0.4);

    // ---- beat 3: the receiver extracts the context, then starts its own child span ----
    t = 17.0;
    s.set(t, 'req', 'hl', 1, 0.15); s.set(t + 0.9, 'req', 'hl', 0, 0.5);
    s.packet({ route: [[700, 1222], [790, 1300], [790, 1408]], t: t + 0.1, dur: 0.9, kind: 'chip', label: '4bf9 · a1', size: 40, color: TR, fade: 0.15 });
    s.sfx(t + 0.1, 'send', { note: 'A6', gain: 1.1, pan: pan([790, 1300]) });
    t = 18.0;
    ctxFill(t, 'rcv');
    s.sfx(t, 'store', { note: 'A5', gain: 1.3, pan: pan([790, 1475]) });
    t = 21.0;                                                    // only now: a new span in the test service
    s.set(t, 'rcvCard', 'alpha', 1, 0.3); s.set(t, 'rcvCard', 'color', T.fg, 0.2); s.pulse(t, 'rcvCard');
    s.sfx(t, 'send', { note: 'G6', gain: 1.2, pan: pan([300, 1475]) });
    t = 21.8;
    ctxPulse(t, 'rcv'); fill(t, 'rcvCard', 0, '4bf9', TR);
    s.sfx(t, 'store', { note: 'A5', gain: 0.9, pan: pan([300, 1475]) });
    t = 22.7;
    fill(t, 'rcvCard', 1, 'd4', T.fg);
    s.ripple(t, [530, 1450], T.fg, { r0: 14, r1: 70, dur: 0.7 });
    s.sfx(t, 'store', { note: 'G5', gain: 1.3, pan: pan([300, 1475]) });
    t = 23.6;
    fill(t, 'rcvCard', 2, 'a1', T.fg); hl(t, 'sndCard', 1, 1.2);
    s.sfx(t, 'ack', { note: 'C5', gain: 1.3, pan: pan([300, 1475]) });

    // ---- beat 4: work ends, the request is done, both services export their spans ----
    t = 28.0;
    s.set(t, 'rcvCard', 'status', 'ended', 0); s.set(t, 'rcvCard', 'statusColor', T.mid, 0); s.set(t, 'rcvCard', 'color', T.mid, 0.4);
    s.sfx(t, 'ack', { note: 'G4', gain: 1.3, pan: pan([300, 1475]) });
    s.set(28.8, 'req', 'alpha', 0, 0.5);                         // the request is consumed
    t = 29.4;                                                    // the response returns
    s.set(t, 'wire:lane', 'color', T.ok, 0.2); s.set(t, 'wire:lane', 'flow', 1, 0);
    s.packet({ route: [[540, 1280], [540, 840]], t, dur: 1.3, kind: 'chip', label: '200 OK', size: 40, color: T.ok, fade: 0.2 });
    s.sfx(t, 'send', { note: 'G6', gain: 1.1, pan: 0 });
    t = 30.7;
    s.set(t, 'wire:lane', 'color', T.wire, 0.4); s.set(t, 'wire:lane', 'flow', 0, 0);
    s.set(t, 'sndCard', 'status', 'ended', 0); s.set(t, 'sndCard', 'statusColor', T.mid, 0); s.set(t, 'sndCard', 'color', T.mid, 0.4);
    s.sfx(t, 'arrive', { note: 'C5', gain: 1.0, pan: pan([300, 645]) });
    t = 32.0;                                                    // a trace view, still empty
    s.set(t, 'wire:lane', 'alpha', 0, 0.5); s.set(t, 'http', 'alpha', 0, 0.4);
    s.set(t, 'tv', 'alpha', 1, 0.5); s.set(t, 'tvTitle', 'alpha', 1, 0.5); s.set(t, 'tvEmpty', 'alpha', 1, 0.5);
    s.sfx(t, 'ack', { note: 'A4', gain: 1.1, pan: 0 });
    t = 33.4;
    s.pulse(t, 'tv', T.fg, 0.5); s.pulse(t, 'tvEmpty', T.fg, 0.5);
    s.sfx(t, 'thump', { gain: 0.45, pan: 0 });
    const exp = (tt, wire, cardId, chip, rowId, note, extra) => {
      s.set(tt, 'wire:' + wire, 'alpha', 1, 0.2); s.set(tt, 'wire:' + wire, 'color', T.fg, 0.2);
      s.pulse(tt, cardId, T.fg);
      const route = wire === 'expA' ? [[1000, 830], [1000, 1010], [930, 1010]] : [[1000, 1290], [1000, 1100], [930, 1100]];
      s.packet({ route, t: tt, dur: 1.0, kind: 'chip', label: chip, size: 40, color: T.fg, fade: 0.15 });
      s.sfx(tt, 'deliver', { note, gain: 1.1, pan: 0.6 });
      const land = tt + 1.0;
      s.set(land, 'wire:' + wire, 'alpha', 0, 0.6);
      for (const k of ['N', 'S', 'I']) s.set(land, rowId + k, 'alpha', 1, 0.3);
      s.sfx(land, 'arrive', { note, gain: 1.0, pan: 0 });
      if (extra) extra(land);
    };
    exp(35.0, 'expA', 'sndCard', 'a1', 'rA', 'C5', (l) => {
      s.set(l, 'tvEmpty', 'alpha', 0, 0.3); s.set(l, 'tvTrace', 'alpha', 1, 0.3); s.set(l, 'tv', 'color', TR, 0.3);
    });
    exp(37.0, 'expB', 'rcvCard', 'd4', 'rB', 'G5', (l) => {
      s.set(l, 'wire:br', 'alpha', 1, 0.3); s.set(l, 'wire:br', 'color', T.fg, 0.3);
    });

    // ---- one trace across two services; the parent link crossed the boundary ----
    t = 39.4;
    hl(t, 'sndCard', 0, 1.0); hl(t, 'rcvCard', 0, 1.0); s.pulse(t, 'tvTrace', T.fg, 0.6); s.pulse(t, 'tv');
    s.sfx(t, 'chime', { note: 'A5', gain: 1.4, pan: 0 });
    t = 40.8;
    hl(t, 'rcvCard', 2, 1.0); hl(t, 'sndCard', 1, 1.0);
    s.set(t, 'wire:br', 'color', T.title, 0.15); s.set(t + 0.9, 'wire:br', 'color', T.fg, 0.5);
    s.sfx(t, 'ack', { note: 'C5', gain: 1.3, pan: 0 });

    // ---- hold, then end ----
    s.fade(45.0, 1, 1.0);
    s.meta.duration = 47.0;
  },
});

