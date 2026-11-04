// Replication and consistency, lesson 01: "Keep another copy" (motion-v2).
// One mechanism: the application writes only to the primary; the replica keeps its old copy until
// the change travels over the replication link and the replica applies it.
// Times are authored at speed 1; meta.speed 0.85 stretches playback.
FlowVideo.scene({
  meta: { title: 'Keep another copy', titleSize: 92, subtitle: 'REPLICATION', duration: 28.05, fps: 30, speed: 0.85 },
  build(s) {
    const T = s.THEME;
    const PX = 290, RX = 790, PY = 1110, LINKY = 1420, PANEL = { w: 420, h: 340, titleSize: 54, keys: ['R42', 'rev'], keySize: 48, valSize: 66, rowGap: 90 };
    const ROW1Y = PY - 170 + 98 + 45 + 14 + 90; // y of the rev row inside a panel

    // ---------- stage ----------
    s.node('app', 'panel', { x: PX, y: 640, w: 420, h: 180, title: 'application', titleSize: 54, alpha: 0 });
    s.node('appCmd', 'label', { x: PX, y: 694, text: '', size: 48, mono: true, weight: 700, alpha: 0 });
    s.node('primary', 'panel', Object.assign({ x: PX, y: PY, title: 'primary', alpha: 0 }, PANEL));
    s.node('replica', 'panel', Object.assign({ x: RX, y: PY, title: 'replica', alpha: 0 }, PANEL));
    s.node('mark', 'label', { x: 540, y: ROW1Y, text: '=', size: 88, weight: 800, color: T.ok, alpha: 0 });
    s.node('rTag', 'label', { x: RX, y: 860, text: 'copy', size: 50, mono: true, weight: 700, color: T.mid, alpha: 0 });
    s.node('linkLabel', 'label', { x: 540, y: 1505, text: 'replication', size: 48, mono: true, color: T.mid, alpha: 0 });
    s.node('note', 'label', { x: 540, y: 1660, text: '2 copies · rev 8', size: 58, mono: true, weight: 700, color: T.ok, alpha: 0 });

    // Only one write path: application -> primary. Nothing connects the application to the replica.
    s.wire('write', 'app.bottom', 'primary.top');
    s.wire('repl', 'primary.bottom', 'replica.bottom', { via: [[PX, LINKY], [RX, LINKY]] });
    s.set(0, 'wire:write', 'alpha', 0, 0); s.set(0.2, 'wire:write', 'alpha', 1, 0.8);
    s.set(0, 'wire:repl', 'alpha', 0, 0); s.set(0.2, 'wire:repl', 'alpha', 1, 0.8);

    for (const id of ['primary', 'replica']) {
      s.set(0, id, 'row0Val', 'draft', 0);
      s.set(0, id, 'row1Val', '7', 0);
    }
    for (const id of ['app', 'appCmd', 'primary', 'replica', 'rTag', 'linkLabel']) s.set(0.2, id, 'alpha', 1, 0.8);

    const pan = { app: s.panOf('app'), p: s.panOf('primary'), r: s.panOf('replica'), mid: 0 };

    // A node applies a change: outline turns amber, progress fills with work ticks, then status and
    // revision switch together (one atomic record update) with the shared "change" sound.
    function apply(t, id, note, panv) {
      s.set(t, id, 'color', T.accent, 0.2);
      s.set(t, id, 'progressAlpha', 1, 0.2);
      s.set(t, id, 'progress', 0, 0);
      s.set(t + 0.15, id, 'progress', 1, 1.2, 'linear');
      [0.25, 0.65, 1.05].forEach((d) => s.sfx(t + d, 'work', { note, gain: 0.55, pan: panv }));
      const done = t + 1.45;
      s.set(done, id, 'row0Val', 'ready', 0);
      s.set(done, id, 'row1Val', '8', 0);
      s.set(done, id, 'row0ValColor', T.ok, 0);
      s.set(done, id, 'row1ValColor', T.ok, 0);
      for (const r of [0, 1]) { s.set(done, id, 'row' + r + 'HiColor', T.ok, 0); s.set(done, id, 'row' + r + 'Hi', 1, 0.12); s.set(done + 0.6, id, 'row' + r + 'Hi', 0, 0.6); }
      s.set(done, id, 'color', T.ok, 0.15);
      s.set(done, id, 'progressColor', T.ok, 0.15);
      s.set(done + 0.5, id, 'progressAlpha', 0, 0.5);
      s.set(done + 1.0, id, 'color', T.mid, 0.6);
      s.pulse(done, id);
      s.sfx(done, 'store', { note: 'A5', pan: panv });
      return done;
    }

    // ---------- beat 1: two saved copies of R42, both at rev 7 (0-7) ----------
    s.pulse(1.6, 'primary', T.fg);
    s.set(1.6, 'primary', 'row1Hi', 1, 0.15); s.set(2.4, 'primary', 'row1Hi', 0, 0.5);
    s.sfx(1.6, 'ack', { note: 'G5', gain: 0.5, pan: pan.p });
    s.pulse(2.6, 'replica', T.fg);
    s.set(2.6, 'replica', 'row1Hi', 1, 0.15); s.set(3.4, 'replica', 'row1Hi', 0, 0.5);
    s.set(2.6, 'rTag', 'color', T.fg, 0.15); s.set(3.4, 'rTag', 'color', T.mid, 0.5);
    s.sfx(2.6, 'ack', { note: 'E5', gain: 0.5, pan: pan.r });
    s.set(3.6, 'mark', 'alpha', 1, 0.2);
    s.set(3.6, 'mark', 'scale', 0.4, 0); s.set(3.6, 'mark', 'scale', 1, 0.4, 'back');
    s.sfx(3.6, 'ack', { note: 'G5', gain: 0.45, pan: pan.p });
    s.sfx(3.64, 'ack', { note: 'E5', gain: 0.45, pan: pan.r });

    // ---------- beat 2: the write lands on the primary only (7-15) ----------
    s.set(7.0, 'appCmd', 'text', 'R42 → ready', 0);
    s.set(7.0, 'appCmd', 'color', T.fg, 0);
    s.pulse(7.0, 'app', T.fg);
    s.sfx(7.0, 'ack', { note: 'C5', gain: 0.5, pan: pan.app });
    // chips stop just outside panel edges so they never cover a title or border
    s.packet({ route: [[PX, 776], [PX, 896]], t: 7.7, dur: 1.0, kind: 'chip', label: 'R42 → ready', size: 42, color: T.fg });
    s.sfx(7.7, 'send', { note: 'C6', pan: pan.app });
    s.set(7.7, 'appCmd', 'color', T.mid, 0.4);
    s.sfx(8.7, 'arrive', { note: 'G5', pan: pan.p });
    const pDone = apply(8.8, 'primary', 'G4', pan.p); // 10.25
    // The copies now differ; the replica still holds draft / 7.
    const diff = pDone + 0.9; // 11.15
    s.set(diff, 'mark', 'text', '≠', 0);
    s.set(diff, 'mark', 'color', T.accent, 0);
    s.set(diff, 'mark', 'scale', 0.5, 0); s.set(diff, 'mark', 'scale', 1, 0.4, 'back');
    s.set(diff, 'replica', 'row0ValColor', T.accent, 0.2);
    s.set(diff, 'replica', 'row1ValColor', T.accent, 0.2);
    s.set(diff, 'replica', 'row1HiColor', T.accent, 0); s.set(diff, 'replica', 'row1Hi', 1, 0.2);
    s.set(diff, 'rTag', 'text', 'old copy', 0);
    s.set(diff, 'rTag', 'color', T.accent, 0);
    s.sfx(diff, 'ack', { note: 'G5', gain: 0.32, pan: pan.p });
    s.sfx(diff + 0.02, 'ack', { note: 'F#5', gain: 0.32, pan: pan.r });
    // primary values settle back to white after the green confirmation
    s.set(diff, 'primary', 'row0ValColor', T.fg, 0.5);
    s.set(diff, 'primary', 'row1ValColor', T.fg, 0.5);

    // ---------- beat 3: the change travels, the replica applies it (15-22) ----------
    const tx = 15.0;
    s.set(tx, 'wire:repl', 'color', T.fg, 0.2);
    s.set(tx, 'wire:repl', 'flow', 1, 0);
    s.set(tx, 'linkLabel', 'color', T.fg, 0.2);
    s.set(tx - 0.3, 'replica', 'row1Hi', 0, 0.3);
    s.packet({ route: [[PX, 1326], [PX, LINKY], [RX, LINKY], [RX, 1326]], t: tx, dur: 2.2, kind: 'chip', label: 'ready · rev 8', size: 42, color: T.fg, ease: 'inOut' });
    s.sfx(tx, 'send', { note: 'A6', pan: pan.p });
    const arr = tx + 2.2;
    s.set(arr, 'wire:repl', 'flow', 0, 0);
    s.set(arr, 'wire:repl', 'color', T.wire, 0.5);
    s.set(arr, 'linkLabel', 'color', T.mid, 0.5);
    s.sfx(arr, 'arrive', { note: 'E5', pan: pan.r });
    s.set(arr + 0.1, 'rTag', 'text', 'applying', 0);
    const rDone = apply(arr + 0.1, 'replica', 'E4', pan.r); // 18.75
    s.set(rDone, 'rTag', 'text', 'copy updated', 0);
    s.set(rDone, 'rTag', 'color', T.ok, 0);
    // The copies agree from the moment the replica's record changes: the mark switches in the same frame.
    s.set(rDone, 'mark', 'text', '=', 0);
    s.set(rDone, 'mark', 'color', T.ok, 0);
    s.set(rDone, 'mark', 'scale', 0.5, 0); s.set(rDone, 'mark', 'scale', 1, 0.4, 'back');
    s.set(rDone + 1.2, 'replica', 'row0ValColor', T.fg, 0.5);

    // ---------- beat 4: both copies contain the change ----------
    // After the apply highlight clears, both rev rows glow together.
    const agree = rDone + 1.3; // 20.05
    for (const id of ['primary', 'replica']) {
      s.set(agree, id, 'row1HiColor', T.ok, 0);
      s.set(agree, id, 'row1Hi', 1, 0.2);
      s.set(agree, id, 'row1ValColor', T.ok, 0.2);
    }
    s.sfx(agree, 'chime', { note: 'G5', gain: 0.32, pan: pan.p });
    s.sfx(agree + 0.05, 'chime', { note: 'E5', gain: 0.32, pan: pan.r });
    const noteT = agree + 1.2; // 21.25
    s.set(noteT, 'note', 'alpha', 1, 0.4);
    s.set(noteT, 'note', 'scale', 0.85, 0); s.set(noteT, 'note', 'scale', 1, 0.4, 'out');
    s.sfx(noteT, 'ack', { note: 'C6', gain: 0.35, pan: 0 });
    s.fade(noteT + 5.0, 1, 0.9);
    s.meta.duration = noteT + 6.8;
  },
});
