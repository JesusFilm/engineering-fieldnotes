// Load balancing — round robin. Health checks find a crashed server, the balancer skips it,
// it reboots, passes a check, and rejoins. Taught with motion + sound only (no captions).
// Sound map: each server has its own note (C5 / E5 / G5), so the rotation is audible and the
// missing E while Server 2 is down is heard as well as seen.
FlowVideo.scene({
  meta: { title: '', subtitle: '', duration: 21, fps: 30 },
  build(s) {
    const T = s.THEME;
    s.fade(0, 1, 0); s.fade(0.03, 0, 0.2); s.fade(20, 1, 0.6);
    const clients = [['c0', 'phone', 250, 'C6'], ['c1', 'laptop', 540, 'E6'], ['c2', 'phone', 830, 'G6']];
    for (const [id, type, x] of clients) s.node(id, type, { x, y: 628 });
    s.node('lb', 'box', { x: 540, y: 958, label: 'Load Balancer', ports: 3, pointer: 0 });
    const NOTES = ['C5', 'E5', 'G5'];
    [210, 540, 870].forEach((x, i) => s.node('s' + i, 'rack', { x, y: 1340, label: 'Server ' + (i + 1) }));
    for (const [id] of clients) s.wire(id, id + '.bottom', [540, 884]);
    for (let i = 0; i < 3; i++) s.wire('p' + i, 'lb.port' + i, 's' + i + '.top');
    s.set(0, 'lb', 'port0', T.accent, 0);

    const CRASH = 7.05, REBOOT = 12.4, BACK = 13.45;
    const CHECKS = [3.75, CRASH, 10.4, BACK];
    const inRotation = (i, t) => i !== 1 || t < CRASH || t >= BACK;
    const down = (t) => t >= CRASH && t < REBOOT;

    // ---- health checks: small probes from each port; result shown as a ripple at the server ----
    for (const hc of CHECKS) {
      for (let i = 0; i < 3; i++) {
        const sv = 's' + i;
        s.packet({ kind: 'dot', route: ['lb.port' + i, sv + '.top'], t: hc - 0.38, dur: 0.38, color: T.mid, ease: 'in', fade: 0.05 });
        if (i === 1 && hc === CRASH) continue; // handled by the crash beat
        if (i === 1 && down(hc)) {
          s.ripple(hc, sv + '.top', T.bad, { mark: 'x', r1: 60, dur: 0.7 });
          s.shake(hc, sv, 8, 0.35);
          s.sfx(hc, 'thump', { pan: s.panOf(sv) });
        } else if (i === 1 && hc === BACK) {
          s.ripple(hc, sv + '.top', T.ok, { mark: 'check', r1: 80, dur: 0.8 });
          s.pulse(hc, sv);
          s.sfx(hc, 'chime', { pan: s.panOf(sv) });
        } else {
          s.ripple(hc, sv + '.top', T.ok, { r1: 40, dur: 0.45 });
          s.sfx(hc + i * 0.03, 'ack', { pan: s.panOf(sv), gain: 0.8 });
        }
      }
    }

    // ---- the crash: snap red, X pops, jolt, crash sound; then the link is marked dead ----
    s.set(CRASH, 's1', 'failed', 1, 0.28, 'linear');
    s.shake(CRASH, 's1', 16, 0.5);
    s.ripple(CRASH, 's1', T.bad, { r0: 40, r1: 190, dur: 0.6 });
    s.sfx(CRASH, 'crash', { pan: s.panOf('s1') });
    s.set(CRASH + 0.25, 'lb', 'port1', T.bad, 0.2);
    s.set(CRASH + 0.25, 'wire:p1', 'color', T.bad, 0.2);
    s.set(CRASH + 0.25, 'wire:p1', 'dashed', 1, 0);

    // ---- reboot: X shrinks away, slots light up one by one, rising sweep ----
    s.set(REBOOT, 's1', 'failed', 0, 0.5);
    s.sfx(REBOOT, 'recover', { pan: s.panOf('s1') });
    for (let k = 0; k < 3; k++) { s.slot(REBOOT + 0.35 + k * 0.12, 's1', 2 - k, 'busy', 0.08); s.slot(REBOOT + 0.75 + k * 0.08, 's1', 2 - k, 'idle', 0.3); }
    // passing the check brings it back
    s.set(BACK + 0.1, 'lb', 'port1', T.dim, 0.3);
    s.set(BACK + 0.1, 'wire:p1', 'color', T.wire, 0.3);
    s.set(BACK + 0.1, 'wire:p1', 'dashed', 0, 0);

    // ---- traffic ----
    const clientOrder = [1, 0, 2, 2, 1, 0, 1, 2, 0, 0, 2, 1, 1, 0, 2, 1, 0, 2, 2, 0, 1];
    const slotCount = [0, 0, 0];
    let next = 0, k = 0;
    for (let t = 0.25; t <= 15.6; t += 0.68, k++) {
      const [c, , , cNote] = clients[clientOrder[k % clientOrder.length]];
      const decide = t + 0.5;
      while (!inRotation(next, decide)) next = (next + 1) % 3;
      const target = next;
      next = (next + 1) % 3;
      const sv = 's' + target;
      s.set(t, c, 'color', T.fg, 0.1); s.set(t + 0.45, c, 'color', T.mid, 0.4);
      s.packet({ route: [c + '.bottom', [540, 884]], t, dur: 0.5 });
      s.sfx(t, 'send', { note: cNote, pan: s.panOf(c + '.bottom') });
      s.set(decide - 0.15, 'lb', 'pointer', target, 0.22);
      for (let i = 0; i < 3; i++) if (inRotation(i, decide)) s.set(decide - 0.15, 'lb', 'port' + i, i === target ? T.accent : T.dim, 0.18);
      if (!down(decide)) { s.set(decide, 'wire:p' + target, 'color', T.mid, 0.1); s.set(decide + 0.6, 'wire:p' + target, 'color', T.wire, 0.4); }
      s.packet({ route: ['lb.port' + target, sv + '.top'], t: decide + 0.02, dur: 0.5 });
      const arrive = decide + 0.52, slot = slotCount[target]++ % 3;
      if (target === 1 && arrive >= CRASH && arrive < BACK) {
        // landed on a server that just died: the request is lost
        s.ripple(arrive, 's1.top', T.bad, { mark: 'x', r1: 50 });
        s.sfx(arrive, 'thump', { gain: 0.5, pan: s.panOf('s1') });
        continue;
      }
      s.slot(arrive, sv, slot, 'busy');
      s.ripple(arrive, sv + '.top', T.fg, { r0: 10, r1: 34, dur: 0.35 });
      s.sfx(arrive, 'arrive', { note: NOTES[target], pan: s.panOf(sv) });
      if (target === 1 && arrive < CRASH && arrive + 1.6 > CRASH) {
        s.slot(CRASH, 's1', slot, 'lost', 0.1);           // work in flight dies with the server
        s.slot(REBOOT, 's1', slot, 'idle', 0.3);
      } else {
        s.slot(arrive + 1.6, sv, slot, 'done');
        s.slot(arrive + 2.0, sv, slot, 'idle', 0.4);
      }
    }
    s.set(17.3, 'lb', 'pointer', 0, 0.4);
    for (let i = 0; i < 3; i++) s.set(17.3, 'lb', 'port' + i, i === 0 ? T.accent : T.dim, 0.4);
  },
});

