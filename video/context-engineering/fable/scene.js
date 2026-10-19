/* Original scene by anthropic/claude-fable-5-1; edited by gpt-6-astra comparative review.
 * Retrieval example: stale notes can suggest a misleading edit. Retrieve a trace and its
 * module, then follow the newly discovered dependency. Both outputs are candidates;
 * neither is a verified patch. Token counts are illustrative, not model measurements.
 */
FlowVideo.scene({
  meta: { title: 'Context engineering', subtitle: 'RETRIEVAL EXAMPLE', duration: 23.2, fps: 30, speed: 0.9 },
  build(s) {
    const T = s.THEME;
    const FILES = [
      { name: 'api.ts',         note: 'C5' },
      { name: 'users.ts',       note: 'D5' },
      { name: 'db.ts',          note: 'E5' },
      { name: 'auth.ts',        note: 'F5' },
      { name: 'notes.md (old)', note: 'G5' },
    ];
    const STALE = 4; // repository row that holds the outdated incident note
    const LIMIT = 16; // k tokens
    const kTok = (k) => k / LIMIT;

    /* ---------- stage ---------- */
    const TOP = 640, VIA = 915; // source row centre; horizontal wire sits clear of the Repository label
    s.node('repo', 'store', { x: 290, y: TOP, w: 400, rows: FILES.length, label: 'Repository' });
    FILES.forEach((f, i) => s.set(0, 'repo', 'row' + i + 'Text', f.name, 0));
    s.node('trace', 'box', { x: 820, y: TOP, w: 300, h: 136, label: 'Trace', labelSize: 34, sublabel: 'api.ts:42 null' });
    s.node('ctx', 'store', { x: 540, y: 1200, w: 620, rows: 7, label: 'Context' });
    s.set(0, 'ctx', 'row0Text', 'task: fix null crash', 0);
    s.set(0, 'ctx', 'row0Color', T.info, 0);
    s.node('bar', 'bar', { x: 700, y: 1560, w: 360, h: 14, ticks: true, label: '1k / 16k tokens', seg0: kTok(1), seg0Color: T.ok });
    s.node('model', 'box', { x: 300, y: 1710, w: 300, h: 110, label: 'Model', labelSize: 34 });
    s.node('out', 'badge', { x: 750, y: 1710, text: '', color: T.mid });

    const REPO_OUT = [490, 800], CTX_OUT = [380, 1200 + 247 + 6]; // exits off-centre so wires clear the labels
    s.wire('repo-ctx', REPO_OUT, 'ctx.top', { via: [[620, 800], [620, VIA], [540, VIA]] });
    s.wire('trace-ctx', 'trace.bottom', 'ctx.top', { via: [[820, VIA], [540, VIA]] });
    s.wire('ctx-model', CTX_OUT, 'model.top', { via: [[380, 1480], [300, 1480]] });

    /* ---------- sounds ---------- */
    // Wrong answer: the loudest event in the cut. Falling square buzz over a sub thud.
    s.sound('wrong', { base: 'E4', gain: 0.95,
      layers: [{ type: 'tone', wave: 'square', ratio: 1, glideTo: 0.6, glide: 0.3, attack: 0.004, decay: 0.35, gain: 0.4 },
               { type: 'tone', wave: 'sine', freq: 60, glideTo: 36, glide: 0.3, attack: 0.002, decay: 0.4, gain: 0.9 },
               { type: 'noise', lp: 4000, lpTo: 300, attack: 0.002, decay: 0.2, gain: 0.3 }] });
    // Stale material being read: a short sour two-note slide.
    s.sound('stale', { base: 'Eb5', gain: 0.4,
      layers: [{ type: 'tone', wave: 'sine', ratio: 1, glideTo: 0.94, glide: 0.18, attack: 0.003, decay: 0.22, harmonics: [1, 0.3] }] });

    /* ---------- helpers ---------- */
    let tokens = 1;
    const setTokens = (t, k) => {
      tokens = k;
      const f = kTok(k), c = f > 0.5 ? T.accent : T.ok;
      s.set(t, 'bar', 'seg0', f, 0.35);
      s.set(t, 'bar', 'seg0Color', c, 0.35);
      s.set(t + 0.2, 'bar', 'label', Math.round(k) + 'k / 16k tokens', 0);
      s.set(t + 0.2, 'bar', 'labelColor', c, 0.2);
    };
    const ROUTE_REPO = [REPO_OUT, [620, 800], [620, VIA], [540, VIA], 'ctx.top'];
    const repoRow = (i) => [290 - 200 + 22 + 10, TOP - 181 + 22 + i * 66 + 27]; // left end of repository row i
    const ROUTE_TRACE = ['trace.bottom', [820, VIA], [540, VIA], 'ctx.top'];
    // A file leaves the repository (its row lights) and lands in the given context row.
    const loadFile = (t, i, slot, kAdd, color) => {
      const f = FILES[i], dur = 0.55;
      s.set(t, 'repo', 'row' + i + 'Color', T.fg, 0.1);
      s.set(t + 0.6, 'repo', 'row' + i + 'Color', T.dim, 0.4);
      s.sfx(t, 'send', { note: f.note, gain: 0.8, pan: s.panOf('repo') });
      s.packet({ route: ROUTE_REPO, t, dur, kind: 'chip', label: f.name, color });
      s.set(t + dur, 'ctx', 'row' + slot + 'Text', f.name, 0);
      s.set(t + dur, 'ctx', 'row' + slot + 'Alpha', 1, 0);
      s.set(t + dur, 'ctx', 'row' + slot + 'Color', color, 0.15);
      s.sfx(t + dur, 'store', { note: f.note, pan: s.panOf('ctx') });
      setTokens(t + dur, tokens + kAdd);
      return t + dur;
    };
    const loadTrace = (t, color) => {
      const dur = 0.55;
      s.pulse(t, 'trace', T.fg, 0.4);
      s.sfx(t, 'send', { note: 'A4', gain: 0.8, pan: s.panOf('trace') });
      s.packet({ route: ROUTE_TRACE, t, dur, kind: 'chip', label: 'api.ts:42', color });
      s.set(t + dur, 'ctx', 'row1Text', 'trace: api.ts:42', 0);
      s.set(t + dur, 'ctx', 'row1Alpha', 1, 0);
      s.set(t + dur, 'ctx', 'row1Color', color, 0.15);
      s.sfx(t + dur, 'store', { note: 'A4', pan: s.panOf('ctx') });
      setTokens(t + dur, tokens + 1);
      return t + dur;
    };
    // The assembled context is sent to the model, which starts working.
    const callModel = (t) => {
      const dur = 0.5;
      s.sfx(t, 'send', { note: 'C6', pan: s.panOf('ctx') });
      s.packet({ route: [CTX_OUT, [380, 1480], [300, 1480], 'model.top'], t, dur, kind: 'envelope' });
      s.set(t + dur, 'model', 'color', T.fg, 0.15);
      s.set(t + dur, 'model', 'glow', 1, 0.15);
      s.sfx(t + dur, 'arrive', { note: 'C5', pan: s.panOf('model') });
      s.ripple(t + dur, 'model.top', T.fg, { r1: 50, dur: 0.5 });
      return t + dur;
    };
    // Work pulses are schematic activity, not a latency counter.
    const work = (t, ticks, gap) => {
      for (let i = 0; i < ticks; i++) {
        s.sfx(t + i * gap, 'work', { pan: s.panOf('model') });
        s.pulse(t + i * gap, 'model', T.accent, 0.18);
      }
      return t + ticks * gap;
    };
    // The model emits its answer: chip flies to the output badge, which pops in.
    const answer = (t, label, color, ok) => {
      const dur = 0.45;
      s.sfx(t, 'send', { note: ok ? 'E6' : 'E5', pan: s.panOf('model') });
      s.packet({ route: ['model.right', [750, 1710]], t, dur, kind: 'chip', label, color });
      s.set(t + dur, 'out', 'text', label, 0);
      s.set(t + dur, 'out', 'color', color, 0);
      s.set(t + dur, 'out', 'scale', 0.6, 0);
      s.set(t + dur, 'out', 'scale', 1, 0.4, 'back');
      s.set(t + dur, 'model', 'glow', 0, 0.3);
      s.set(t + dur, 'model', 'color', color, 0.3);
      s.ripple(t + dur, 'out', color, { r0: 35, r1: 70, dur: ok ? 0.7 : 0.9 });
      if (ok) s.sfx(t + dur, 'arrive', { note: 'C6', pan: s.panOf('out') });
      else s.sfx(t + dur, 'thump', { pan: s.panOf('out') });
      return t + dur;
    };

    /* ---------- open ---------- */
    s.set(0, 'stage', 'veil', 1, 0);
    s.fade(0.05, 0, 0.6);

    /* ---------- pass A: pre-load everything ---------- */
    let t = 1.0;
    t = loadTrace(t, T.fg);
    for (let i = 0; i < FILES.length; i++) t = loadFile(1.7 + i * 0.45, i, i + 2, 2.4, T.fg); // lands 2.25 … 4.05; 14k
    // High occupancy is amber: this example has not exceeded its context limit.
    s.set(4.05, 'ctx', 'color', T.accent, 0.3);
    s.set(4.05, 'ctx', 'glow', 1, 0.2);
    s.set(4.6, 'ctx', 'glow', 0, 0.6);
    s.sfx(4.1, 'thump', { note: 'E4', gain: 0.55, pan: s.panOf('bar') });
    t = callModel(4.9);                       // 5.4 model busy
    t = work(5.5, 11, 0.26); // ends 8.36
    // Mid-way the model leans on the stale note: the row flares orange and stays.
    s.set(6.6, 'ctx', 'row' + (STALE + 2) + 'Text', 'old: edit db.ts', 0);
    s.set(6.6, 'ctx', 'row' + (STALE + 2) + 'Color', T.bad, 0.15);
    s.ripple(6.6, [540 + 310 - 22 - 20, 1200 - 247 + 22 + (STALE + 2) * 66 + 27], T.accent, { r0: 10, r1: 48, dur: 0.5 });
    s.sfx(6.6, 'stale', { pan: s.panOf('ctx') });
    answer(8.4, 'db.ts?', T.accent, false); // stale-note candidate, not a tested failure
    // hold until 10.8

    /* ---------- reset: clear everything except the task ---------- */
    const R = 10.8;
    s.sfx(R, 'poof', { note: 'C5', pan: s.panOf('ctx') });
    s.ripple(R, 'ctx', T.mid, { r0: 30, r1: 200, dur: 0.7 });
    for (let i = 1; i < 7; i++) s.set(R, 'ctx', 'row' + i + 'Alpha', 0, 0.4);
    for (let i = 1; i < 7; i++) { s.set(R + 0.45, 'ctx', 'row' + i + 'Text', '', 0); s.set(R + 0.45, 'ctx', 'row' + i + 'Color', T.dim, 0); }
    s.set(R, 'ctx', 'color', T.mid, 0.4);
    s.set(R, 'out', 'scale', 0, 0.3, 'in'); s.set(R + 0.3, 'out', 'text', '', 0); s.set(R + 0.3, 'out', 'scale', 1, 0);
    s.set(R, 'model', 'color', T.mid, 0.4);
    s.set(R, 'repo', 'row' + STALE + 'Color', T.dim, 0.3);
    tokens = 1;
    setTokens(R + 0.1, 1);

    /* ---------- pass B: select, then retrieve just in time ---------- */
    t = loadTrace(11.9, T.ok);                 // lands 12.45, 2k
    // The trace names api.ts: that row is chosen (green) and only it is loaded.
    s.set(12.9, 'repo', 'row0Color', T.ok, 0.15);
    s.ripple(12.9, repoRow(0), T.ok, { r0: 8, r1: 44, dur: 0.5 });
    s.sfx(12.9, 'ack', { note: 'C6', gain: 1.1, pan: s.panOf('repo') });
    t = loadFile(13.3, 0, 2, 2.4, T.ok);       // lands 13.85, 4k
    t = callModel(14.5);                       // 15.0
    t = work(15.1, 3, 0.26);  // ends 15.88
    // The model asks for one more file: a request travels up, the repository finds it.
    const Q = 15.9;
    s.sfx(Q, 'send', { note: 'E6', gain: 1.2, pan: s.panOf('model') });
    s.packet({ route: ['model.top', [300, 1480], [380, 1480], CTX_OUT], t: Q, dur: 0.35, kind: 'chip', label: 'users.ts?', color: T.accent });
    s.packet({ route: ['ctx.top', [540, VIA], [470, VIA]], t: Q + 0.38, dur: 0.5, kind: 'chip', label: 'users.ts?', color: T.accent });
    s.set(Q + 0.88, 'repo', 'row1Color', T.ok, 0.15);
    s.ripple(Q + 0.88, repoRow(1), T.ok, { r0: 8, r1: 44, dur: 0.5 });
    s.sfx(Q + 0.88, 'hit', { note: 'E6', pan: s.panOf('repo') });
    t = loadFile(Q + 1.15, 1, 3, 2.4, T.ok);   // 17.05 → lands 17.6, 7k
    t = callModel(18.1);                       // 18.6
    t = work(18.7, 3, 0.26);  // ends 19.48
    answer(19.5, 'api.ts:42?', T.accent, true); // lands 19.95
    // hold until 22.2, then fade so the loop restarts on the opening frame
    s.fade(22.2, 1, 0.7);
  },
});




