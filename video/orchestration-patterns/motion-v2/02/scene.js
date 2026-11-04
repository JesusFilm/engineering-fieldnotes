// Orchestration patterns, lesson 02: Route to one specialist (motion-v2/02).
// One mechanism: a router compares the request with its routing criteria, selects exactly one destination and
// dispatches only there; a request matching no specialist criterion takes the human-triage fallback.
// Render from the repository root:
//   node video/orchestration-patterns/motion-v2/02/engine/render.mjs video/orchestration-patterns/motion-v2/02/scene.js video/orchestration-patterns/motion-v2/02/video.mp4
FlowVideo.scene({
  meta: { title: 'Route to one specialist', subtitle: 'ORCHESTRATION · 2', titleSize: 80, titleY: 300, subtitleSize: 40, subtitleY: 385, duration: 40, fps: 30, speed: 1 },
  build(s) {
    const T = s.THEME, AMB = T.accent, BLUE = T.info;
    const R = (t, prop, v, dur = 0, ease) => s.set(t, 'req', prop, v, dur, ease);
    const Q = (t, prop, v, dur = 0, ease) => s.set(t, 'router', prop, v, dur, ease);
    const P = (t, prop, v, dur = 0, ease) => s.set(t, 'dest', prop, v, dur, ease);

    // ---------- request ----------
    s.node('req', 'panel', { x: 540, y: 585, w: 880, h: 230, headY: 58, title: 'Request R1', titleSize: 46,
      rows: [{ x: 24, y: 122, w: 832, h: 60, size: 50, mono: false }, { x: 24, y: 184, w: 832, h: 60, size: 50, mono: false }] });
    R(0, 'row0Text', 'Will removing /v1 break'); R(0, 'row1Text', 'existing API clients?');
    R(0, 'row1UlPre', 'existing '); R(0, 'row1UlSub', 'API clients?');
    for (const i of [0, 1]) { R(0, 'row' + i + 'Alpha', 0); R(0.6, 'row' + i + 'Alpha', 1, 0.4); }
    R(0, 'titleColor', T.mid); R(0.6, 'titleColor', T.fg, 0.4);

    s.wire('in', [540, 704], [540, 776], { arrow: true, color: T.dim, width: 5 });

    // ---------- router: scope criteria -> destination ----------
    const rowY = [190, 285, 380], ROW = (k) => k + 1; // row 0 is the column header
    const routerRows = [{ x: 24, y: 118, w: 832, h: 50, size: 38, mono: false, x2: 480 }]
      .concat(rowY.map((y) => ({ x: 24, y, w: 832, h: 84, size: 46, mono: false, markLeft: true, x2: 480, cellW: 400 })));
    s.node('router', 'panel', { x: 540, y: 995, w: 880, h: 430, headY: 58, title: 'Router', titleSize: 46, rows: routerRows });
    Q(0, 'row0Text', 'Scope'); Q(0, 'row0Text2', 'Sends to'); Q(0, 'row0Color', T.mid); Q(0, 'row0Color2', T.mid);
    const routes = [['API clients', 'API reviewer'], ['Stored data', 'Data reviewer'], ['Unclear', 'Human triage']];
    routes.forEach(([a, b], k) => {
      const i = ROW(k);
      Q(0, 'row' + i + 'Text', a); Q(0, 'row' + i + 'Text2', b); Q(0, 'row' + i + 'Color2', T.mid);
      Q(0, 'row' + i + 'Mark', 'open'); Q(0, 'row' + i + 'MarkColor', T.mid); Q(0, 'row' + i + 'MarkK', 1);
    });
    const rowCy = (k) => 780 + rowY[k];

    // the one connector that gets drawn per request: selected row -> right gutter -> destination pane
    const GX = 1030, DEST_Y = 1328;
    routes.forEach((_, k) => {
      s.wire('g' + k, [984, rowCy(k)], [984, DEST_Y], { via: [[GX, rowCy(k)], [GX, DEST_Y]], arrow: true, color: AMB, width: 5 });
      s.set(0, 'wire:g' + k, 'alpha', 0, 0); s.set(0, 'wire:g' + k, 'solid', 1, 0);
    });

    // ---------- destination pane ----------
    s.node('dest', 'panel', { x: 540, y: 1455, w: 880, h: 370, headY: 58, title: 'No destination', titleSize: 46, titleColor: T.mid, tagSize: 40,
      rows: [145, 220, 295].map((y) => ({ x: 24, y, w: 832, h: 64, size: 44 })) });
    for (let i = 0; i < 3; i++) P(0, 'row' + i + 'Slot', 1);

    // ---------- sounds: request C, router E, API reviewer G, human triage A ----------
    const pan = (x) => ((x - 540) / 540) * 0.6;

    // ---------- helpers ----------
    const send = (t, id) => { // the request reaches the router
      s.set(t, 'wire:in', 'solid', 1, 0); s.set(t, 'wire:in', 'color', T.fg, 0.2);
      s.packet({ route: [[540, 716], [540, 792]], t, dur: 0.8, kind: 'chip', label: id, color: T.fg, size: 34 });
      s.sfx(t, 'send', { note: 'C6', gain: 1.4, pan: 0 });
      s.pulse(t + 0.8, 'router', T.fg); s.sfx(t + 0.8, 'arrive', { note: 'E5', pan: 0 });
      s.set(t + 1.0, 'wire:in', 'color', T.dim, 0.4); s.set(t + 1.0, 'wire:in', 'solid', 0, 0);
    };
    const select = (t, k) => { // exactly one row: filled radio, amber outline, destination text lit
      const i = ROW(k);
      Q(t, 'row' + i + 'Mark', 'dot'); Q(t, 'row' + i + 'MarkColor', AMB); Q(t, 'row' + i + 'MarkK', 0); Q(t, 'row' + i + 'MarkK', 1, 0.35);
      Q(t, 'row' + i + 'Hl', 1, 0.25); Q(t, 'row' + i + 'HlColor', AMB); Q(t, 'row' + i + 'Color2', T.fg, 0.25);
      s.sfx(t, 'hit', { note: 'E5', gain: 0.55, pan: 0 });
    };
    const dispatch = (t, k, id, dur) => { // only the selected route is drawn and carries the request
      s.set(t, 'wire:g' + k, 'alpha', 1, 0.3);
      s.packet({ route: [[984, rowCy(k)], [GX, rowCy(k)], [GX, DEST_Y], [984, DEST_Y]], t: t + 0.3, dur, kind: 'chip', label: id, color: AMB, size: 34 });
      s.sfx(t + 0.3, 'send', { note: 'E6', gain: 1.4, pan: 0.6 });
      const ta = t + 0.3 + dur;
      s.ripple(ta, [990, DEST_Y], AMB, { r1: 30, dur: 0.45 });
      return ta;
    };
    const reveal = (t, i, txt, color = T.fg) => { P(t, 'row' + i + 'Slot', 0, 0.3); P(t, 'row' + i + 'Text', txt); P(t, 'row' + i + 'Color', color); P(t, 'row' + i + 'Alpha', 1); P(t, 'row' + i + 'Reveal', 0); P(t, 'row' + i + 'Reveal', 1, 0.6, 'linear'); };

    // ---------- beat 1 (0-6.5): the request concerns API compatibility; three destinations exist ----------
    s.sfx(0.6, 'arrive', { note: 'C5', gain: 0.8, pan: 0 });
    R(1.8, 'row1Ul', 1, 0.7, 'out'); R(1.8, 'row1UlColor', AMB);
    s.sfx(1.8, 'ack', { note: 'C6', gain: 1.2, pan: 0 });

    // ---------- beat 2 (6.5-11.8): the router compares the request with its criteria and selects one row ----------
    send(6.5, 'R1');
    Q(8.1, 'row1Cell', 1, 0.25); Q(8.1, 'row1CellColor', AMB); R(8.1, 'row1Ul', 0.0, 0.0); R(8.1, 'row1Ul', 1, 0.4, 'out');
    s.sfx(8.1, 'ack', { note: 'E5', gain: 1.4, pan: -0.3 });
    select(9.3, 0);

    // ---------- beat 3 (11.8-20.5): dispatch to the API reviewer only; its task and tools fit the scope ----------
    const a1 = dispatch(11.8, 0, 'R1', 1.1); // arrives 13.2
    P(a1, 'title', 'API reviewer'); P(a1, 'titleColor', T.fg, 0.3); P(a1, 'tag', 'R1'); P(a1, 'tagColor', T.fg); P(a1, 'tagK', 0); P(a1, 'tagK', 1, 0.35);
    s.pulse(a1, 'dest', T.fg); s.sfx(a1, 'arrive', { note: 'G5', pan: 0.2 });
    reveal(a1 + 0.8, 0, 'Task: client compatibility'); s.sfx(a1 + 0.8, 'store', { note: 'G5', gain: 0.6, pan: 0 });
    reveal(a1 + 1.6, 1, 'Tools: schema + callers'); s.sfx(a1 + 1.6, 'store', { note: 'G5', gain: 0.6, pan: 0 });
    // fit: the tools row and the matched scope cell glow together
    P(a1 + 2.5, 'row1Hl', 1, 0.25); P(a1 + 2.5, 'row1HlColor', AMB); Q(a1 + 2.5, 'row1Cell', 1); s.pulse(a1 + 2.5, 'router');
    s.sfx(a1 + 2.5, 'ack', { note: 'G5', gain: 1.4, pan: 0 });
    P(a1 + 3.5, 'row1Hl', 0, 0.4);
    reveal(a1 + 3.9, 2, 'Answer: pending', T.mid); // 17.1: work assigned, no result yet
    s.sfx(a1 + 3.9, 'work', { note: 'G4', gain: 0.6, pan: 0 }); s.sfx(a1 + 4.25, 'work', { note: 'G4', gain: 0.45, pan: 0 });

    // ---------- beat 4 (20.5-40): a new request with unclear scope goes to human triage ----------
    const rs = 20.5; // R1 episode ends: clear all of its state together
    for (const i of [0, 1]) R(rs, 'row' + i + 'Alpha', 0, 0.5);
    R(rs, 'row1Ul', 0, 0.3);
    Q(rs, 'row1Hl', 0, 0.4); Q(rs, 'row1Cell', 0, 0.4); Q(rs, 'row1Color2', T.mid, 0.4); Q(rs + 0.4, 'row1Mark', 'open'); Q(rs + 0.4, 'row1MarkColor', T.mid);
    s.set(rs, 'wire:g0', 'alpha', 0, 0.4);
    P(rs, 'tagK', 0, 0.3); P(rs, 'titleColor', T.mid, 0.4); P(rs + 0.4, 'title', 'No destination');
    for (let i = 0; i < 3; i++) { P(rs, 'row' + i + 'Alpha', 0, 0.4); P(rs, 'row' + i + 'Slot', 1, 0.4); P(rs + 0.45, 'row' + i + 'Text', ''); }
    const r2 = 21.4;
    R(r2, 'title', 'Request R2'); R(r2, 'row0Text', 'Review this change'); R(r2, 'row1Text', ''); R(r2, 'row1UlSub', '');
    R(r2, 'row0Alpha', 1, 0.4); R(r2, 'row1Alpha', 1, 0);
    s.pulse(r2, 'req', T.fg); s.sfx(r2, 'arrive', { note: 'C5', gain: 0.8, pan: 0 });
    send(23.0, 'R2'); // router has R2 at 23.8
    // neither specialist criterion matches: grey outline, then a dash mark
    [[24.6, 0], [25.4, 1]].forEach(([t, k]) => {
      const i = ROW(k);
      Q(t, 'row' + i + 'Cell', 1, 0.2); Q(t, 'row' + i + 'CellColor', T.mid); Q(t + 0.6, 'row' + i + 'Cell', 0, 0.3);
      Q(t + 0.3, 'row' + i + 'Mark', 'dash'); Q(t + 0.3, 'row' + i + 'MarkColor', T.mid);
    });
    s.sfx(24.6, 'ack', { note: 'E5', gain: 0.8, pan: -0.3 });
    s.sfx(25.4, 'miss', { note: 'E4', gain: 0.55, pan: -0.3 });
    Q(26.4, 'row3Cell', 1, 0.25); Q(26.4, 'row3CellColor', AMB); s.sfx(26.4, 'ack', { note: 'E5', gain: 1.4, pan: -0.3 });
    select(27.2, 2);
    const a2 = dispatch(29.4, 2, 'R2', 0.8); // arrives 30.5
    P(a2, 'title', 'Human triage'); P(a2, 'titleColor', T.fg, 0.3); P(a2, 'tag', 'R2'); P(a2, 'tagColor', T.fg); P(a2, 'tagK', 0); P(a2, 'tagK', 1, 0.35);
    s.pulse(a2, 'dest', T.fg); s.sfx(a2, 'arrive', { note: 'A5', pan: 0.2 });
    reveal(a2 + 0.8, 0, 'Scope: unclear', T.mid); s.sfx(a2 + 0.8, 'store', { note: 'A5', gain: 0.6, pan: 0 });
    reveal(a2 + 1.6, 1, 'Action: clarify', AMB); s.sfx(a2 + 1.6, 'ack', { note: 'A5', gain: 1.4, pan: 0 });
    s.fade(37.6, 1, 1.4);
  },
});
