// Load balancing — "a request counter is not a work counter": round robin hands out equal request counts,
// but when request costs differ one replica saturates while another sits idle; routing on a live load signal
// (least in-flight requests, as in the Google SRE "least-loaded round robin" policy) sends the next request
// where the count is lowest. Taught with motion and sound only. Words on screen are node names, the policy
// label on the balancer, size chips ("2k tokens"), in-flight counters, and measured response-time badges.
// Token sizes and timings are illustrative; a token count is not a guaranteed proportional runtime.
FlowVideo.scene({
  meta: { title: 'Load balancing', subtitle: 'LEAST IN-FLIGHT', duration: 30, fps: 30, speed: 1 },
  build(s) {
    const T = s.THEME;
    const RX = [210, 540, 870];
    const NOTE = ['C5', 'E5', 'G5'], HI = ['C6', 'E6', 'G6'];
    const HEAVY = 6.0, SMALL = 0.6; // illustrative service times (seconds of scene time)

    s.node('client', 'laptop', { x: 540, y: 600 });
    s.node('rt', 'badge', { x: 830, y: 596, alpha: 0 });
    s.node('rtLabel', 'label', { x: 830, y: 652, text: 'response time', size: 24, alpha: 0 });
    s.node('lb', 'box', { x: 540, y: 900, w: 440, h: 170, label: 'Balancer', sublabel: 'ROUND ROBIN', ports: 3, portSpan: 240, pointer: 0 });
    for (let i = 0; i < 3; i++) {
      s.node('r' + i, 'rack', { x: RX[i], y: 1300, slots: 3, label: 'Replica ' + (i + 1) });
      s.node('c' + i, 'badge', { x: RX[i], y: 1512, text: '0 in flight', color: T.mid });
    }
    s.wire('cl', 'client.bottom', 'lb.top');
    for (let i = 0; i < 3; i++) s.wire('w' + i, 'lb.port' + i, 'r' + i + '.top');
    const PAN = RX.map((x) => s.panOf([x, 0]));

    // Fade in from the title-only frame so the first and last frames are identical for the loop.
    s.fade(0, 1, 0); s.fade(0.05, 0, 0.5);

    // ---- bookkeeping: slots, in-flight counts, latency badge ----
    const slotFree = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    const countEvents = []; // { t, i, delta }
    const badgeShows = [];  // { t, text, color }
    let rr = 0;             // round-robin cursor (next port)
    let least = false;      // policy flag
    const chip = (label, route, t, dur, color) => s.packet({ kind: 'chip', label, route, t, dur, color });

    function choose(t) {
      if (!least) { const i = rr; rr = (rr + 1) % 3; return i; }
      // least in-flight: lowest count at time t; ties fall back to the rotation cursor.
      const counts = [0, 0, 0];
      for (const e of countEvents) if (e.t <= t) counts[e.i] += e.delta;
      const min = Math.min(...counts);
      for (let k = 0; k < 3; k++) { const i = (rr + k) % 3; if (counts[i] === min) { rr = (i + 1) % 3; return i; } }
      return 0;
    }
    function pick(t, i) {
      s.set(t, 'lb', 'pointer', i, 0.25);
      s.set(t + 0.1, 'lb', 'port' + i, T.accent, 0.1); s.set(t + 0.95, 'lb', 'port' + i, T.dim, 0.3);
      if (least) { // the chosen counter flashes green: this one had the lowest count (the arrival resets its colour)
        s.set(t, 'c' + i, 'color', T.ok, 0.1);
        s.sfx(t, 'ack', { note: 'C7', gain: 0.7, pan: PAN[i] });
      } else { // rotation: a dull low tick, the policy's own signature
        s.sfx(t, 'send', { note: 'E4', gain: 0.9 });
      }
    }
    // Send one request; returns the time the response lands on the client.
    function request(t, heavy) {
      s.pulse(t, 'client'); s.sfx(t, 'send', { note: heavy ? 'A5' : 'C6', gain: heavy ? 0.6 : 0.5 });
      chip(heavy ? '60k tokens' : '2k tokens', ['client.bottom', 'lb.top'], t, 0.5, heavy ? T.accent : T.fg);
      const tp = t + 0.5, i = choose(tp);
      pick(tp, i);
      chip(heavy ? '60k tokens' : '2k tokens', ['lb.port' + i, 'r' + i + '.top'], tp + 0.3, 0.5, heavy ? T.accent : T.fg);
      const a = tp + 0.8, rack = 'r' + i;
      const slot = slotFree[i].findIndex((f) => f <= a);
      const busyUntil = Math.max(...slotFree[i]);
      const contended = !heavy && busyUntil > a;
      countEvents.push({ t: a, i, delta: 1 });
      s.ripple(a, rack + '.top', contended ? T.accent : T.fg, { r1: contended ? 90 : 60 });
      s.sfx(a, 'arrive', { note: NOTE[i], gain: heavy ? 0.7 : 0.6, pan: PAN[i] });
      let done;
      if (heavy) {
        s.set(a, rack, 'slot' + slot + 'Stroke', T.fg, 0.2); s.set(a, rack, 'slot' + slot + 'Dot', T.accent, 0.2);
        s.set(a, rack, 'slot' + slot + 'BarColor', T.accent, 0); s.set(a, rack, 'slot' + slot + 'Bar', 1, HEAVY, 'linear');
        for (let k = a + 0.3 + i * 0.17; k < a + HEAVY - 0.2; k += 0.5) s.sfx(k, 'work', { gain: 0.5, pan: PAN[i] });
        done = a + HEAVY;
      } else if (contended) {
        // Landed on a replica still working through a heavy request: it waits, then runs.
        s.shake(a, rack, 8, 0.35); s.sfx(a + 0.02, 'miss', { pan: PAN[i], gain: 0.9 });
        s.set(a, rack, 'slot' + slot + 'Stroke', T.accent, 0.2); s.set(a, rack, 'slot' + slot + 'Dot', T.accent, 0.2);
        s.set(a, rack, 'slot' + slot + 'BarColor', T.accent, 0); s.set(a, rack, 'slot' + slot + 'Bar', 0.06, 0.2);
        const start = busyUntil + 0.15;
        s.set(start, rack, 'slot' + slot + 'Stroke', T.fg, 0.15); s.set(start, rack, 'slot' + slot + 'Bar', 1, 0.5, 'linear');
        done = start + 0.5;
      } else {
        s.slot(a, rack, slot, 'busy'); done = a + SMALL;
      }
      slotFree[i][slot] = done + 0.5;
      s.slot(done, rack, slot, 'done'); s.slot(done + 0.5, rack, slot, 'idle', 0.3);
      countEvents.push({ t: done, i, delta: -1 });
      s.sfx(done, 'ack', { note: HI[i], gain: 0.55, pan: PAN[i] });
      // response: back up the wire, then to the client
      const col = heavy ? T.mid : contended ? T.accent : T.ok;
      s.packet({ route: [rack + '.top', 'lb.port' + i], t: done + 0.05, dur: 0.35, color: col });
      s.packet({ route: ['lb.top', 'client.bottom'], t: done + 0.45, dur: 0.45, color: col });
      const L = done + 0.9;
      s.pulse(L, 'client');
      if (heavy) { s.sfx(L, 'deliver', { note: 'G4', gain: 0.5 }); }
      else {
        const waited = done - a;
        const txt = contended ? (0.2 + waited).toFixed(1) + ' s' : '180 ms';
        s.sfx(L, 'deliver', { note: contended ? 'C4' : 'C6', gain: contended ? 0.8 : 0.6 });
        badgeShows.push({ t: L, text: txt, color: col });
      }
      return L;
    }

    // ---- Beat 1 (normal): three small requests, round robin, each replica gets one, all fast ----
    let last = 0;
    for (const t of [0.7, 1.8, 2.9]) last = Math.max(last, request(t, false));

    // ---- Beat 2 (problem): heavy, heavy, small. Equal counts, unequal work. The short one finishes, the
    // counts diverge (1,1,0), and round robin still sends the next small request to the busy Replica 1. ----
    const B2 = last + 1.6;
    request(B2, true);              // -> Replica 1, heavy
    request(B2 + 0.8, true);        // -> Replica 2, heavy (its response lands 0.35 s before the delayed small one)
    const l6 = request(B2 + 1.9, false); // -> Replica 3, small: done quickly, count back to 0
    // equal request counts: every replica has had one; the counters pop together with a soft chord
    const eq = l6 - 0.9 + 0.3;
    for (let i = 0; i < 3; i++) { s.set(eq, 'c' + i, 'scale', 1.18, 0); s.set(eq, 'c' + i, 'scale', 1, 0.35, 'out'); s.sfx(eq + i * 0.04, 'ack', { note: HI[i], gain: 0.45, pan: PAN[i] }); }
    const t7 = l6 + 0.2;            // counts have read 1,1,0 for over a second by now
    const l7 = request(t7, false);  // -> Replica 1 (its turn): waits behind the heavy request
    // the idle replica gets a quiet nudge right after the misroute lands
    const hint = t7 + 1.3 + 0.5;
    s.ripple(hint, 'c2', T.ok, { r0: 30, r1: 120, dur: 0.7 }); s.sfx(hint, 'ack', { note: 'G6', gain: 0.4, pan: PAN[2] });
    // Replica 1's and 2's heavy work completes shortly after; responses land on the client.
    const b2End = Math.max(l7, ...slotFree.map((f) => Math.max(...f))) + 0.4;

    // ---- Beat 3 (resolution): the balancer switches to least in-flight and reads the counters ----
    const SW = b2End + 1.0;
    s.pulse(SW, 'lb', T.ok, 0.6); s.sfx(SW, 'recover', { gain: 0.9 });
    s.set(SW + 0.3, 'lb', 'sublabel', 'LEAST IN-FLIGHT', 0); s.set(SW + 0.3, 'lb', 'subColor', T.ok, 0);
    for (let i = 0; i < 3; i++) { // counts reported to the balancer: dots climb beside each rack, then up the wire
      s.packet({ kind: 'dot', route: ['c' + i + '.top', [RX[i] + 130, 1440], [RX[i] + 130, 1170], 'r' + i + '.top', 'lb.port' + i], t: SW + 0.45 + i * 0.08, dur: 0.8, color: T.ok });
    }
    s.sfx(SW + 1.2, 'chime', { gain: 0.7 });
    least = true;
    const B3 = SW + 1.7;
    request(B3, true);              // all counts 0: tie -> rotation -> Replica 2
    request(B3 + 0.9, true);        // 0,1,0: tie between 1 and 3 -> rotation -> Replica 3
    const l10 = request(B3 + 2.0, false); // 0,1,1 -> Replica 1, fast
    const l11 = request(l10 - 0.6, false); // still 0,1,1 -> Replica 1 again, fast (round robin would have hit Replica 2)
    const END = Math.max(l11, ...slotFree.map((f) => Math.max(...f))) + 0.6;

    // ---- derived animation: in-flight counters and latency badge ----
    countEvents.sort((p, q) => p.t - q.t);
    const counts = [0, 0, 0];
    const colorFor = (n) => (n === 0 ? T.mid : n === 1 ? T.fg : T.accent);
    for (const e of countEvents) {
      counts[e.i] += e.delta;
      const id = 'c' + e.i;
      s.set(e.t, id, 'text', counts[e.i] + ' in flight', 0); s.set(e.t, id, 'color', colorFor(counts[e.i]), 0.15);
      s.set(e.t, id, 'scale', 1.18, 0); s.set(e.t, id, 'scale', 1, 0.3, 'out');
    }
    badgeShows.sort((p, q) => p.t - q.t);
    badgeShows.forEach((b, k) => {
      s.set(b.t, 'rt', 'text', b.text, 0); s.set(b.t, 'rt', 'color', b.color, 0);
      s.set(b.t, 'rt', 'alpha', 1, 0.15); s.set(b.t, 'rt', 'scale', 0.6, 0); s.set(b.t, 'rt', 'scale', 1, 0.35, 'back');
      s.set(b.t, 'rtLabel', 'alpha', 1, 0.3);
      const next = badgeShows[k + 1];
      if (!next || next.t - b.t > 1.5) { s.set(b.t + 1.2, 'rt', 'alpha', 0, 0.3); s.set(b.t + 1.2, 'rtLabel', 'alpha', 0, 0.3); }
    });

    // ---- close: hold the resolved, idle state, then fade to the title-only frame ----
    s.fade(END + 1.6, 1, 0.7);
    s.meta.duration = END + 1.6 + 0.7 + 0.4;
  },
});
