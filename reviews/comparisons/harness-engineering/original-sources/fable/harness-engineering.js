// Harness engineering — "done" means verified.
// An agent claims DONE for each feature; the harness runs the end-to-end check and flips the
// feature list only on a PASS. A claim that fails the check is sent back and the list stays false.
// Taught with motion + sound only. Words are node names, short chips (DONE A, RUN A, PASS, FAIL)
// and the feature list rows (A passes:false → true).
FlowVideo.scene({
  meta: { title: 'Harness', subtitle: 'DONE MEANS VERIFIED', duration: 27, fps: 30, speed: 1 },
  build(s) {
    const T = s.THEME;
    s.node('agent', 'box', { x: 540, y: 660, w: 360, h: 136, label: 'Agent', sublabel: 'feature A' });
    s.node('harness', 'box', { x: 540, y: 1010, w: 420, h: 136, label: 'Harness', ports: 2, portSpan: 200 });
    s.node('tests', 'box', { x: 270, y: 1400, w: 330, h: 136, label: 'Tests', sublabel: '—' });
    s.node('list', 'store', { x: 790, y: 1400, w: 400, rows: 2, label: 'Feature list' });

    const P0 = 'harness.port0', P1 = 'harness.port1';
    const ROW = [[940, 1367], [940, 1433]]; // right end of each list row, clear of the text
    s.wire('ah', 'agent.bottom', 'harness.top');
    s.wire('ht', P0, 'tests.top', { via: [[440, 1200], [270, 1200]] });
    s.wire('hl', P1, 'list.top', { via: [[640, 1200], [790, 1200]] });
    const PAN = { tests: s.panOf('tests'), list: s.panOf('list') };

    // Feature list starts with nothing verified.
    s.set(0, 'list', 'row0Text', 'A passes:false', 0); s.set(0, 'list', 'row0Color', T.dim, 0);
    s.set(0, 'list', 'row1Text', 'B passes:false', 0); s.set(0, 'list', 'row1Color', T.dim, 0);

    // Open and close on a fully black frame (title included) so the loop boundary matches exactly.
    s.set(0, 'stage', 'black', 1, 0); s.blackout(0.1, 0, 0.6);

    const chip = (label, route, t, dur, color) => s.packet({ kind: 'chip', label, route, t, dur, color });

    // Agent works: orange box, low work ticks.
    const work = (t, n, sub) => {
      if (sub) { s.set(t, 'agent', 'sublabel', sub, 0); s.pulse(t, 'agent'); }
      s.set(t, 'agent', 'color', T.accent, 0.2); s.set(t, 'agent', 'subColor', T.accent, 0.2);
      for (let i = 0; i < n; i++) { s.sfx(t + 0.1 + i * 0.22, 'work'); s.set(t + 0.1 + i * 0.22, 'agent', 'glow', 0.7, 0.05); s.set(t + 0.18 + i * 0.22, 'agent', 'glow', 0, 0.12); }
      const end = t + 0.1 + n * 0.22;
      s.set(end, 'agent', 'color', T.mid, 0.3); s.set(end, 'agent', 'subColor', T.mid, 0.3);
      return end;
    };
    // Agent claims the feature is done. Arrives at the harness; the list row turns orange (claimed, unverified).
    const claim = (t, feat, row) => {
      s.pulse(t, 'agent'); s.sfx(t, 'send', { note: 'E6', gain: 0.3 });
      chip('DONE ' + feat, ['agent.bottom', 'harness.top'], t, 0.55, T.fg);
      const a = t + 0.55;
      s.pulse(a, 'harness'); s.sfx(a, 'arrive', { note: 'C5', gain: 0.55 });
      s.set(a, 'list', 'row' + row + 'Color', T.accent, 0.25); s.sfx(a + 0.05, 'ack', { note: 'C6', gain: 0.2, pan: PAN.list });
      return a;
    };
    // Harness runs the end-to-end check.
    const run = (t, feat) => {
      s.set(t, 'harness', 'pointer', 0, 0); s.set(t, 'harness', 'port0', T.accent, 0.2);
      chip('RUN ' + feat, [P0, [440, 1200], [270, 1200], 'tests.top'], t + 0.1, 0.6, T.fg);
      const a = t + 0.7;
      s.set(a, 'tests', 'sublabel', 'RUN', 0); s.set(a, 'tests', 'subColor', T.accent, 0); s.set(a, 'tests', 'color', T.fg, 0.15);
      s.pulse(a, 'tests'); s.sfx(a, 'arrive', { note: 'G5', gain: 0.5, pan: PAN.tests });
      for (let k = a + 0.25; k < a + 1.35; k += 0.18) s.sfx(k, 'clock', { pan: PAN.tests, gain: 0.22 });
      s.set(a + 0.2, 'tests', 'glow', 0.6, 0.2); s.set(a + 1.3, 'tests', 'glow', 0, 0.2);
      return a + 1.4;
    };
    const resultChip = (t, label, color) => chip(label, ['tests.top', [270, 1200], [440, 1200], P0], t, 0.6, color);
    // PASS: list row flips to true with a green ripple.
    const pass = (t, feat, row, final) => {
      s.set(t, 'tests', 'sublabel', 'PASS', 0); s.set(t, 'tests', 'subColor', T.ok, 0); s.set(t, 'tests', 'color', T.ok, 0.15);
      s.ripple(t, 'tests.top', T.ok, { mark: 'check', r0: 16, r1: 90 }); s.sfx(t, 'hit', { pan: PAN.tests });
      resultChip(t + 0.4, 'PASS', T.ok);
      const h = t + 1.0;
      s.pulse(h, 'harness', T.ok); s.sfx(h, 'arrive', { note: 'C5', gain: 0.45 });
      s.set(h, 'harness', 'port0', T.dim, 0.2); s.set(h + 0.05, 'harness', 'pointer', 1, 0.3); s.set(h + 0.05, 'harness', 'port1', T.ok, 0.25);
      chip('passes:true', [P1, [640, 1200], [790, 1200], 'list.top'], h + 0.35, 0.6, T.ok);
      const w = h + 0.95;
      s.set(w, 'list', 'row' + row + 'Text', feat + ' passes:true', 0); s.set(w, 'list', 'row' + row + 'Color', T.ok, 0.1);
      s.ripple(w, ROW[row], T.ok, { r0: 24, r1: 150, dur: 0.6 }); s.sfx(w, 'store', { pan: PAN.list });
      s.set(w + 0.6, 'harness', 'port1', T.dim, 0.3); s.set(w + 0.6, 'harness', 'pointer', -1, 0);
      s.set(w + 0.6, 'tests', 'color', T.mid, 0.4);
      if (final) s.sfx(w + 0.3, 'chime', { pan: PAN.list });
      return w;
    };
    // FAIL: the list row drops back to grey; the claim is returned to the agent.
    const fail = (t, feat, row) => {
      s.set(t, 'tests', 'sublabel', 'FAIL', 0); s.set(t, 'tests', 'subColor', T.bad, 0); s.set(t, 'tests', 'color', T.bad, 0.1);
      s.shake(t, 'tests', 12, 0.45); s.ripple(t, 'tests.top', T.bad, { mark: 'x', r0: 16, r1: 110, dur: 0.7 }); s.sfx(t, 'miss', { pan: PAN.tests, gain: 0.6 });
      resultChip(t + 0.45, 'FAIL', T.bad);
      const h = t + 1.05;
      s.pulse(h, 'harness', T.bad); s.sfx(h, 'arrive', { note: 'C5', gain: 0.45 });
      s.set(h, 'harness', 'port0', T.dim, 0.2); s.set(h, 'harness', 'pointer', -1, 0);
      // The row stays false: red × ripple on it as the orange "claimed" colour drains away.
      s.ripple(h + 0.1, ROW[row], T.bad, { mark: 'x', r0: 24, r1: 130, dur: 0.6 }); s.sfx(h + 0.1, 'thump', { pan: PAN.list, gain: 0.7 });
      s.set(h + 0.1, 'list', 'row' + row + 'Color', T.dim, 0.5);
      chip('FAIL ' + feat, ['harness.top', 'agent.bottom'], h + 0.5, 0.55, T.bad);
      const a = h + 1.05;
      s.shake(a, 'agent', 9, 0.4); s.pulse(a, 'agent', T.bad, 0.6); s.sfx(a, 'thump', { gain: 0.6, note: 'E4' });
      s.set(a + 1.2, 'tests', 'color', T.mid, 0.4);
      return a;
    };

    // Beat 1 — normal: feature A, claim DONE, check passes, list flips to true.
    let t = work(0.7, 5, null);
    t = claim(t + 0.35, 'A', 0);
    t = run(t + 0.25, 'A');
    t = pass(t, 'A', 0, false);

    // Beat 2 — the claim alone is not enough: feature B, claim DONE, check fails, list stays false.
    const B = t + 2.2;
    s.set(B - 0.4, 'tests', 'sublabel', '—', 0); s.set(B - 0.4, 'tests', 'subColor', T.mid, 0);
    t = work(B, 5, 'feature B');
    t = claim(t + 0.35, 'B', 1);
    t = run(t + 0.25, 'B');
    t = fail(t, 'B', 1);

    // Beat 3 — resolution: fix B, claim again, check passes, list flips, chime.
    const F = t + 1.9;
    s.set(F - 0.3, 'tests', 'sublabel', '—', 0); s.set(F - 0.3, 'tests', 'subColor', T.mid, 0);
    t = work(F, 7, 'fix B');
    t = claim(t + 0.35, 'B', 1);
    t = run(t + 0.25, 'B');
    t = pass(t, 'B', 1, true);

    // Beat 4 — hold on the verified list, then fade to black so the loop restarts cleanly.
    const E = t + 2.4;
    s.blackout(E, 1, 0.7);
    s.meta.duration = Math.max(s.meta.duration, E + 1.1);
  },
});

