// Cache-aside — the write path: invalidate on write, the stale-set race, and TTL as the staleness bound.
// Independent cut authored by anthropic/claude-fable-5-1 for Engineering Fieldnotes.
// Teaches through motion and sound only; the words on screen are node names and data chips.
//
// Story: an Agent reads a cached policy value (HIT). A human Editor saves a change; the app updates the
// database and deletes the cache key (correct). The Agent's next read misses, reads the database, and
// then stalls before writing the cache. Meanwhile a second save updates the database and deletes an
// already-empty key. The stalled write lands last and stores the old value: a stale set. Later reads hit
// that stale entry until its TTL runs out; the refill after expiry is fresh.
// Sources: Azure Architecture Center, Cache-Aside pattern (write path: update store, then invalidate);
// Nishtala et al., "Scaling Memcache at Facebook", NSDI 2013, §3.2.1 (stale sets, leases).
FlowVideo.scene({
  meta: { title: 'Cache-aside', subtitle: 'INVALIDATE ON WRITE', duration: 28, fps: 30, speed: 0.9 },
  build(s) {
    const T = s.THEME;
    const TTL = 9;                 // scene seconds an entry lives; one constant drain rate for every store
    const LX = 280, RX = 800;      // left column: Agent, Cache. right column: Editor, Database
    const ROW0 = [LX, 1297];       // centre of the first cache row (the 'refund' key)

    s.node('agent', 'box', { x: LX, y: 640, w: 300, h: 120, label: 'Agent' });
    s.node('editor', 'phone', { x: RX, y: 640, scale: 1.2, anchorPad: 16 });
    s.node('editorLabel', 'label', { x: RX, y: 548, text: 'Editor', size: 30 });
    s.node('out', 'badge', { x: LX, y: 520, alpha: 0 });
    s.node('app', 'box', { x: 540, y: 940, w: 760, h: 130, label: 'App', ports: 2, portSpan: 520 });
    s.node('held', 'badge', { x: LX, y: 948, alpha: 0 });
    s.node('cache', 'store', { x: LX, y: 1330, w: 360, rows: 2, label: 'Cache',
      row0Text: 'refund  30d', row0Color: T.ok, row0Fill: 1, row1Text: 'tax  15%', row1Color: T.mid, row1Fill: 0 });
    s.node('db', 'db', { x: RX, y: 1330, label: 'Database', sublabel: 'refund 30d', subColor: T.fg });
    s.node('clock', 'clock', { x: 540, y: 1330, r: 40, alpha: 0 });

    const AIN = [LX, 869], EIN = [RX, 869], P0 = 'app.port0', P1 = 'app.port1';
    s.wire('ag', 'agent.bottom', AIN); s.wire('ed', 'editor.bottom', EIN);
    s.wire('ac', P0, 'cache.top'); s.wire('ad', P1, 'db.top');
    const PL = s.panOf('cache'), PR = s.panOf('db');

    // ---- helpers: every move has its sound ----
    const chip = (label, route, t, dur, color) => s.packet({ kind: 'chip', label, route, t, dur, color });
    const port = (t, i, on) => s.set(t, 'app', 'port' + i, on ? T.accent : T.dim, 0.12);
    const badge = (t, id, txt, color) => {
      s.set(t, id, 'text', txt, 0); s.set(t, id, 'color', color, 0); s.set(t, id, 'alpha', 1, 0.15);
      s.set(t, id, 'scale', 0.6, 0); s.set(t, id, 'scale', 1, 0.35, 'back');
    };
    const hide = (t, id) => s.set(t, id, 'alpha', 0, 0.3);

    // Agent asks the app for the policy value.
    const get = (t) => {
      s.pulse(t, 'agent'); s.sfx(t, 'send', { note: 'C6', pan: PL });
      chip('GET refund', ['agent.bottom', AIN], t, 0.4, T.fg);
      s.pulse(t + 0.4, 'app'); s.sfx(t + 0.4, 'arrive', { note: 'C5', gain: 0.45 });
      return t + 0.4;
    };
    // App checks the cache first.
    const lookup = (t) => {
      port(t, 0, true); chip('refund?', [P0, 'cache.top'], t + 0.05, 0.35, T.fg);
      s.pulse(t + 0.4, 'cache'); s.sfx(t + 0.4, 'arrive', { note: 'E5', gain: 0.4, pan: PL });
      return t + 0.45;
    };
    const hit = (t, val, color, stale) => {
      s.ripple(t, ROW0, color, { mark: stale ? null : 'check', r0: 20, r1: 120 });
      s.set(t, 'cache', 'row0Color', T.fg, 0.08); s.set(t + 0.2, 'cache', 'row0Color', color, 0.3);
      s.sfx(t, 'hit', stale ? { note: 'E5', gain: 0.35, pan: PL } : { pan: PL });
      chip('HIT ' + val, ['cache.top', P0], t + 0.1, 0.35, color); port(t + 0.45, 0, false);
      return t + 0.5;
    };
    const miss = (t) => {
      s.ripple(t, ROW0, T.bad, { mark: 'x', r1: 60 }); s.shake(t, 'cache', 6, 0.3); s.sfx(t, 'miss', { pan: PL });
      chip('MISS', ['cache.top', P0], t + 0.1, 0.35, T.bad); port(t + 0.45, 0, false);
      return t + 0.5;
    };
    // App reads the database; the spinner and low ticks show the read taking time.
    const select = (t, busy) => {
      port(t, 1, true); chip('SELECT', [P1, 'db.top'], t + 0.05, 0.35, T.fg);
      const b = t + 0.4;
      s.sfx(b, 'arrive', { note: 'G5', gain: 0.45, pan: PR });
      s.set(b, 'db', 'busy', 1, 0.15); s.set(b, 'db', 'color', T.fg, 0.15);
      for (let k = b + 0.05; k < b + busy; k += 0.2) s.sfx(k, 'work', { pan: PR, gain: 0.8 });
      s.set(b + busy, 'db', 'busy', 0, 0.15); s.set(b + busy, 'db', 'color', T.mid, 0.3);
      return b + busy;
    };
    const reply = (t, val) => {
      chip(val, ['db.top', P1], t, 0.4, T.fg); s.sfx(t + 0.4, 'arrive', { note: 'C5', gain: 0.4 });
      port(t + 0.45, 1, false);
      return t + 0.45;
    };
    // App writes the value into the cache row; the row's bar is its TTL and drains at one constant rate.
    const fill = (t, val, chipColor, rowColor, landSfx) => {
      port(t, 0, true); chip('SET ' + val, [P0, 'cache.top'], t + 0.05, 0.35, chipColor);
      const a = t + 0.4;
      s.set(a, 'cache', 'row0Text', 'refund  ' + val, 0); s.set(a, 'cache', 'row0Color', rowColor, 0);
      s.set(a, 'cache', 'row0Fill', 1, 0); s.set(a, 'cache', 'row0Fill', 0, TTL, 'linear');
      s.set(a, 'cache', 'row0Alpha', 1, 0.15);
      if (landSfx === 'crash') {
        s.ripple(a, ROW0, T.bad, { r0: 30, r1: 190, dur: 0.7 }); s.shake(a, 'cache', 13, 0.45);
        s.sfx(a, 'crash', { pan: PL });
      } else {
        s.ripple(a, ROW0, rowColor, { r0: 30, r1: 140, dur: 0.6 }); s.sfx(a, 'store', { note: 'E5', pan: PL });
      }
      port(a + 0.1, 0, false);
      return a;
    };
    // App answers the Agent; the badge above the Agent holds the answer.
    const respond = (t, val, color, note, label) => {
      chip(val, [AIN, 'agent.bottom'], t, 0.4, color);
      const a = t + 0.4;
      s.pulse(a, 'agent', color); s.sfx(a, 'deliver', { note, pan: PL }); badge(a, 'out', label || val, color);
      return a;
    };
    // Editor saves a new value; the app updates the database, then deletes the cache key.
    const save = (t, val) => {
      s.pulse(t, 'editor', T.accent); s.sfx(t, 'send', { note: 'G6', pan: PR });
      chip('SAVE ' + val, ['editor.bottom', EIN], t, 0.4, T.accent);
      s.pulse(t + 0.4, 'app'); s.sfx(t + 0.4, 'arrive', { note: 'C5', gain: 0.45 });
      return t + 0.4;
    };
    const update = (t, val) => {
      port(t, 1, true); chip('UPDATE ' + val, [P1, 'db.top'], t + 0.05, 0.35, T.accent);
      const a = t + 0.4;
      s.pulse(a, 'db', T.accent); s.sfx(a, 'store', { note: 'G4', gain: 1.1, pan: PR });
      s.set(a, 'db', 'sublabel', 'refund ' + val, 0); s.set(a, 'db', 'subColor', T.accent, 0); s.set(a + 0.6, 'db', 'subColor', T.fg, 0.4);
      port(a + 0.1, 1, false);
      return a;
    };
    const del = (t, present) => {
      port(t, 0, true); chip('DEL refund', [P0, 'cache.top'], t + 0.05, 0.35, T.bad);
      const a = t + 0.4;
      if (present) {
        s.set(a, 'cache', 'row0Alpha', 0, 0.25); s.ripple(a, ROW0, T.bad, { r0: 20, r1: 120, dur: 0.5 }); s.sfx(a, 'poof', { pan: PL });
      } else {
        s.ripple(a, ROW0, T.bad, { mark: 'x', r1: 60 }); s.shake(a, 'cache', 5, 0.3); s.sfx(a, 'thump', { gain: 0.55, pan: PL });
      }
      port(a + 0.1, 0, false);
      return a;
    };
    // The TTL runs out: clock spins with accelerating ticks, the row fades with a poof.
    const expire = (tEnd) => {
      const t0 = tEnd - 1.5;
      s.set(t0, 'clock', 'alpha', 1, 0.3); s.set(t0, 'clock', 'time', 6, 1.5, 'in');
      let tick = t0 + 0.05, gap = 0.22;
      while (tick < tEnd) { s.sfx(tick, 'clock', { pan: PL }); tick += gap; gap = Math.max(0.07, gap * 0.82); }
      s.set(tEnd, 'cache', 'row0Alpha', 0, 0.3); s.ripple(tEnd, ROW0, T.bad, { r0: 20, r1: 110, dur: 0.5 }); s.sfx(tEnd, 'poof', { pan: PL });
      s.set(tEnd + 0.3, 'clock', 'alpha', 0, 0.4);
    };

    // ---- timeline (scene seconds; meta.speed slows playback) ----
    // Open from a black stage so the first and last frames match.
    s.set(0, 'stage', 'veil', 1, 0); s.fade(0.1, 0, 0.6);
    s.set(0, 'cache', 'row0Fill', 0, TTL, 'linear');

    // Beat 1 — normal read: cache hit, database untouched.
    let t = get(0.6); t = lookup(t);
    s.set(t - 0.05, 'db', 'alpha', 0.3, 0.3);
    t = hit(t, '30d', T.ok, false);
    const d1 = respond(t, '30d', T.ok, 'C6');
    s.set(d1 + 0.3, 'db', 'alpha', 1, 0.4);

    // Beat 2 — Editor saves 14d: database updated, cache key deleted while its TTL still had time left.
    const W1 = d1 + 1.4; hide(W1 - 0.2, 'out');
    t = save(W1, '14d'); t = update(t, '14d'); t = del(t + 0.1, true);

    // Beat 3 — the race: the Agent's read misses, reads 14d, then the app thread stalls before SET.
    const R2 = t + 1.0;
    t = get(R2); t = lookup(t); t = miss(t); t = select(t + 0.05, 0.5); t = reply(t + 0.05, '14d');
    const HOLD = t;
    badge(HOLD, 'held', 'SET 14d', T.accent);
    for (let k = HOLD + 0.3; k < HOLD + 2.2; k += 0.3) { // the pending write waits: each low tick squeezes the held chip
      s.sfx(k, 'work', { note: 'E3', gain: 0.5, pan: PL });
      s.set(k, 'held', 'scale', 0.9, 0.08); s.set(k + 0.08, 'held', 'scale', 1, 0.2, 'out');
    }
    // A second save lands during the stall: database 7d, delete finds nothing.
    let u = save(HOLD + 0.5, '7d'); u = update(u, '7d'); u = del(u + 0.1, false);
    // The stalled write lands last and stores the old value.
    const S = u + 0.6; hide(S, 'held');
    const a3 = fill(S, '14d', T.accent, T.bad, 'crash');
    const d3 = respond(a3 + 0.15, '14d', T.accent, 'C4');

    // Beat 4 — later reads hit the stale entry while the database says 7d.
    let h = d3 + 1.3;
    for (let i = 0; i < 2; i++) {
      hide(h - 0.2, 'out');
      let x = get(h); x = lookup(x); x = hit(x, '14d', T.bad, true);
      const dd = respond(x, '14d', T.bad, 'C4', 'STALE 14d');
      s.sfx(dd + 0.05, 'thump', { gain: 0.5, pan: PL });
      s.pulse(dd, 'db', T.ok); s.set(dd, 'db', 'subColor', T.ok, 0.1); s.set(dd + 0.6, 'db', 'subColor', T.fg, 0.4);
      h = dd + 1.4;
    }

    // Beat 5 — the TTL bounds the damage: entry expires, the next read refills with 7d.
    const EXP = a3 + TTL;
    hide(EXP - 1.0, 'out'); expire(EXP);
    let f = get(EXP + 0.6); f = lookup(f); f = miss(f); f = select(f + 0.05, 0.4); f = reply(f + 0.05, '7d');
    const a5 = fill(f, '7d', T.ok, T.ok, 'store');
    const d5 = respond(a5 + 0.15, '7d', T.ok, 'C6');
    s.sfx(d5 + 0.1, 'chime', { pan: PL });

    // Hold the resolved state, then fade to black so the loop restarts on the opening frame.
    const END = d5 + 2.6;
    s.fade(END, 1, 0.6);
    s.meta.duration = END + 0.9;
  },
});

