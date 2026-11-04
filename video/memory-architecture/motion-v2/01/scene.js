/* Current and saved context — memory-architecture motion-v2 cut 01.
 * One mechanism: a saved record reaches a model call only when the application retrieves a copy
 * and includes it in that call's input. The stored record stays saved; an earlier call is unchanged.
 * Layout: two calls side by side (time runs left to right) above the application and one memory store.
 * Render from the repository root:
 *   node video/memory-architecture/motion-v2/01/engine/render.mjs video/memory-architecture/motion-v2/01/scene.js video/memory-architecture/motion-v2/01/video.mp4 --sheet video/memory-architecture/motion-v2/01/scratch/contact-sheet.png
 * Uses the local engine copy, which adds the general 'panel' and 'chip' node types and title size options.
 */
FlowVideo.scene({
  meta: { title: 'Memory', subtitle: 'CURRENT AND SAVED CONTEXT', subtitleSize: 40, subtitleSpacing: 4, subtitleY: 410, duration: 40, fps: 30, speed: 1 },
  build(s) {
    const T = s.THEME;
    const COL = { 1: 300, 2: 780 };

    // ---- stage: two calls ----
    for (const k of [1, 2]) {
      const x = COL[k];
      s.node('hdr' + k, 'label', { x, y: 492, text: k === 1 ? 'Call 1 · now' : 'Call 2 · later', size: 50, weight: 700, alpha: 0, color: T.fg });
      s.node('model' + k, 'box', { x, y: 600, w: 300, h: 100, label: 'model', labelSize: 44, alpha: 0, color: T.mid });
      s.node('in' + k, 'panel', { x, y: 910, w: 420, h: 360, title: 'input', alpha: 0, color: T.mid,
        rowY: [160, 290], rowH: 70,
        r0Cap: 'task', r0Text: 'test billing', r0Reveal: 0,
        r1Cap: 'test cmd', r1Text: '—', r1Alpha: 0, r1Slot: 1, r1Color: T.mid });
      s.wire('feed' + k, [x, 726], [x, 654]);
      s.set(0, 'wire:feed' + k, 'alpha', 0, 0);
    }
    // ---- application and memory store ----
    s.node('app', 'panel', { x: 540, y: 1240, w: 900, h: 140, title: 'application', alpha: 0, color: T.accent, titleColor: T.accent,
      rowY: [100], rowH: 60, r0Text: 'read billing.test_cmd', r0Reveal: 0, r0Color: T.accent });
    s.node('store', 'panel', { x: 540, y: 1575, w: 900, h: 320, title: 'memory store', statusAfterTitle: true, layout: 'kv', alpha: 0, color: T.info, titleColor: T.info,
      status: 'saved', statusColor: T.info, rowY: [118, 190, 262], rowH: 62,
      r0Cap: 'billing.test_cmd', r0Text: 'npm test', r0CapColor: T.fg, r0Color: T.fg, r0HlColor: T.info,
      r1Cap: 'deploy.day', r1Text: 'Tuesday', r1Color: T.mid,
      r2Cap: 'e2e.status', r2Text: 'flaky', r2Color: T.mid });
    s.wire('read', [330, 1314], [330, 1410]);
    s.set(0, 'wire:read', 'alpha', 0, 0);
    // The retrieved copy: one object that leaves the stored row, waits in the application, then enters Call 2.
    const SRC = [854, 1575 - 160 + 118], STAGE = [840, 1270], SLOT = [724, 910 - 180 + 290];
    s.node('copy', 'chip', { x: SRC[0], y: SRC[1], text: 'npm test', size: 40, alpha: 0, fill: 0, color: T.info });

    const pan = (id) => s.panOf(id);
    const feed = (t, k) => {   // an input is supplied to its model
      s.set(t, 'in' + k, 'status', 'supplied', 0); s.set(t, 'in' + k, 'statusColor', T.ok, 0);
      s.set(t, 'in' + k, 'color', T.ok, 0.2); s.pulse(t, 'in' + k);
      s.set(t, 'wire:feed' + k, 'alpha', 1, 0.15); s.set(t, 'wire:feed' + k, 'color', T.ok, 0.15);
      s.packet({ route: [[COL[k], 722], [COL[k], 660]], t, dur: 0.6, kind: 'dot', color: T.ok });
      s.sfx(t, 'send', { note: 'C6', gain: 1.1, pan: pan('in' + k) });
      const ta = t + 0.6;
      s.set(ta, 'model' + k, 'color', T.ok, 0.15); s.pulse(ta, 'model' + k);
      s.sfx(ta, 'deliver', { note: 'C5', gain: 1.2, pan: pan('model' + k) });
      s.set(ta + 0.4, 'wire:feed' + k, 'color', T.dim, 0.5);
    };
    const openCall = (t, k) => {   // a call's input is assembled: task first, then the empty test-command slot
      s.set(t, 'hdr' + k, 'alpha', 1, 0.5); s.set(t, 'model' + k, 'alpha', 1, 0.5);
      s.set(t + 0.6, 'in' + k, 'alpha', 1, 0.5);
      s.set(t + 0.6, 'in' + k, 'status', 'preparing', 0); s.set(t + 0.6, 'in' + k, 'statusColor', T.accent, 0);
      s.set(t + 0.6, 'in' + k, 'color', T.accent, 0.3);
      s.sfx(t + 0.6, 'ack', { note: 'C6', gain: 0.9, pan: pan('in' + k) });
      s.set(t + 1.4, 'in' + k, 'r0Reveal', 1, 0.6, 'linear');
      s.sfx(t + 1.4, 'ack', { note: 'C6', gain: 0.7, pan: pan('in' + k) });
      s.set(t + 2.3, 'in' + k, 'r1Alpha', 1, 0.3);
      s.sfx(t + 2.3, 'ack', { note: 'C5', gain: 0.8, pan: pan('in' + k) });
    };

    // ---- beat 1: Call 1 receives its current input ----
    openCall(0.5, 1);
    feed(4.2, 1);
    // hold 4.8 – 8.2: Call 1 has exactly what it was given

    // ---- beat 2: the store already holds the record; presence does not include it ----
    let t = 8.2;
    s.set(t, 'store', 'alpha', 1, 0.7);          // disclosure of existing records, not a write
    s.sfx(t + 0.2, 'ack', { note: 'G4', gain: 1.4, pan: 0 });
    t = 9.6;
    s.set(t, 'store', 'r0Hl', 1, 0.2); s.pulse(t, 'store');
    s.sfx(t, 'ack', { note: 'G5', gain: 1.5, pan: pan('store') });
    s.set(t + 1.4, 'store', 'r0Hl', 0, 0.5);
    t = 10.8;
    s.set(t, 'in1', 'r1Text', 'not included', 0);
    s.ripple(t, [468, 1020], T.mid, { r0: 10, r1: 40, dur: 0.9, mark: 'x' });
    s.sfx(t, 'miss', { gain: 0.7, pan: pan('in1') });
    // hold 11.7 – 15.8: the record is on screen and Call 1 still lacks it

    // ---- beat 3: the application retrieves a copy and includes it in a new input ----
    openCall(15.8, 2);
    t = 18.8;
    s.set(t, 'app', 'alpha', 1, 0.5);
    s.set(t + 0.3, 'app', 'r0Reveal', 1, 0.7, 'linear');
    s.sfx(t + 0.3, 'ack', { note: 'E5', gain: 1.3, pan: 0 });
    t = 20.3;   // the application reads the store
    s.set(t, 'wire:read', 'alpha', 1, 0.15); s.set(t, 'wire:read', 'color', T.accent, 0.15);
    s.packet({ route: [[330, 1318], [330, 1406]], t, dur: 0.6, kind: 'dot', color: T.accent });
    s.sfx(t, 'send', { note: 'E6', gain: 1.1, pan: pan('app') });
    t = 20.9;
    s.set(t, 'store', 'r0Hl', 1, 0.2); s.pulse(t, 'store');
    s.sfx(t, 'arrive', { note: 'G5', gain: 0.9, pan: pan('store') });
    s.set(t + 0.5, 'wire:read', 'alpha', 0, 0.5);
    t = 21.7;   // a copy lifts off the stored row; the original stays
    s.set(t, 'copy', 'alpha', 1, 0.25); s.pulse(t, 'copy');   // transparent while over the row: the original stays readable
    s.set(t + 1.2, 'copy', 'fill', 1, 0.3);
    s.sfx(t, 'ack', { note: 'G6', gain: 1.2, pan: pan('store') });
    t = 22.3;
    s.set(t, 'copy', 'x', STAGE[0], 1.4); s.set(t, 'copy', 'y', STAGE[1], 1.4);
    s.sfx(t, 'send', { note: 'G6', gain: 1.0, pan: pan('store') });
    s.set(t + 0.8, 'store', 'r0Hl', 0, 0.6);
    t = 23.7;
    s.set(t, 'app', 'r0Text', 'retrieved a copy', 0);
    s.sfx(t, 'arrive', { note: 'E5', gain: 0.9, pan: pan('app') });
    // hold 23.7 – 26.4: the copy is with the application; Call 2 is still preparing without it
    t = 26.4;
    s.set(t, 'app', 'r0Text', 'include in Call 2', 0);
    s.sfx(t, 'ack', { note: 'E5', gain: 1.1, pan: pan('app') });
    t = 26.9;
    s.set(t, 'copy', 'x', SLOT[0], 1.5); s.set(t, 'copy', 'y', SLOT[1], 1.5);
    s.sfx(t, 'send', { note: 'E6', gain: 1.0, pan: pan('app') });
    s.set(t + 1.0, 'in2', 'r1Text', '', 0); s.set(t + 1.2, 'in2', 'r1Slot', 0, 0.3);
    t = 28.4;
    s.pulse(t, 'in2');
    s.sfx(t, 'arrive', { note: 'E5', gain: 1.0, pan: pan('in2') });
    // hold 28.4 – 31.4: included in the input, but not yet supplied

    // ---- beat 4: supply Call 2; the saved record stays ----
    feed(31.4, 2);
    s.set(31.4, 'app', 'r0Text', 'send Call 2', 0);
    s.set(32.6, 'app', 'alpha', 0.45, 0.6);
    t = 33.6;
    s.pulse(t, 'copy');
    s.sfx(t, 'ack', { note: 'C6', gain: 1.2, pan: pan('in2') });
    t = 34.0;
    s.set(t, 'store', 'r0Hl', 1, 0.2); s.pulse(t, 'store');
    s.set(t, 'store', 'status', 'still saved', 0);
    s.sfx(t, 'ack', { note: 'G5', gain: 1.5, pan: pan('store') });
    // hold 34.2 – 39.2: Call 1 without it, Call 2 with it, store unchanged
    s.fade(39.2, 1, 1.0);
    s.meta.duration = 40.8;
  },
});

