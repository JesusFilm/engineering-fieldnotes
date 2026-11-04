/* Choose the memory scope — memory-architecture motion-v2 cut 02.
 * One mechanism: thread state belongs to one conversation; a shared store holds records by namespace and key
 * for any conversation; a new thread reads the scope it needs and leaves another thread's state alone.
 * Scope does not decide durability: after a restart, loss follows the backend row, not the scope column.
 * Render from the repository root:
 *   node video/memory-architecture/motion-v2/02/engine/render.mjs video/memory-architecture/motion-v2/02/scene.js video/memory-architecture/motion-v2/02/video.mp4 --sheet video/memory-architecture/motion-v2/02/scratch/contact-sheet.png
 * Uses the local engine copy, which adds the general 'panel' and 'chip' node types and title size options.
 */
FlowVideo.scene({
  meta: { title: 'Memory', subtitle: 'CHOOSE THE MEMORY SCOPE', subtitleSize: 40, subtitleSpacing: 4, subtitleY: 410, duration: 46, fps: 30, speed: 1 },
  build(s) {
    const T = s.THEME;
    const L = 320, R = 790;   // column centres: thread state | shared store

    // ---- part 1: scopes ----
    s.node('hdrT', 'label', { x: L, y: 470, text: 'thread state', size: 46, weight: 700, color: T.fg, alpha: 0 });
    s.node('hdrS', 'label', { x: R, y: 470, text: 'shared store', size: 46, weight: 700, color: T.info, alpha: 0 });
    s.node('thA', 'panel', { x: L, y: 610, w: 460, h: 220, title: 'thread A', titleColor: T.fg, layout: 'kv', alpha: 0, color: T.mid,
      rowY: [115, 180], rowH: 58, capSize: 36, valueSize: 36,
      r0Cap: 'step', r0Text: '2 of 4', r0Alpha: 0,
      r1Cap: 'guess', r1Text: 'flaky e2e?', r1Color: T.mid, r1Alpha: 0 });
    s.node('thB', 'panel', { x: L, y: 940, w: 460, h: 220, title: 'thread B · new', titleColor: T.fg, layout: 'kv', alpha: 0, color: T.mid,
      rowY: [115, 180], rowH: 58, capSize: 36, valueSize: 36,
      r0Cap: 'step', r0Text: '1 of 3', r0Alpha: 0,
      r1Cap: 'test_cmd', r1Text: '—', r1Color: T.mid, r1Alpha: 0, r1Slot: 1 });
    s.node('shared', 'panel', { x: R, y: 680, w: 400, h: 360, title: 'namespace · key', titleColor: T.mid, alpha: 0, color: T.info,
      rowY: [170, 300], rowH: 64, capSize: 36, valueSize: 40, r0HlColor: T.info, r1HlColor: T.mid,
      r0Cap: 'billing · test_cmd', r0Text: 'npm test', r0Alpha: 0,
      r1Cap: 'catalog · test_cmd', r1Text: 'pytest', r1Color: T.mid, r1Alpha: 0 });
    s.wire('mixA', [L, 826], [L, 724]);
    s.set(0, 'wire:mixA', 'alpha', 0, 0); s.set(0, 'wire:mixA', 'dashed', 1, 0);
    s.node('notRead', 'label', { x: L + 118, y: 775, text: 'not read', size: 36, weight: 600, color: T.mid, alpha: 0 });
    s.wire('readS', [556, 1010], [R, 866], { via: [[R, 1010]] });
    s.set(0, 'wire:readS', 'alpha', 0, 0);

    // ---- part 2: restart test (scope columns × backend rows) ----
    s.node('rt', 'label', { x: 540, y: 1150, text: 'restart test', size: 46, weight: 700, color: T.fg, alpha: 0 });
    s.node('sweep', 'bar', { x: 540, y: 1192, w: 900, h: 10, seg0: 0, seg0Color: T.accent, color: T.dim, alpha: 0 });
    s.node('colT', 'label', { x: L, y: 1232, text: 'one thread', size: 40, weight: 600, color: T.mid, alpha: 0 });
    s.node('colS', 'label', { x: R, y: 1232, text: 'shared', size: 40, weight: 600, color: T.mid, alpha: 0 });
    s.node('rowM', 'label', { x: 540, y: 1290, text: 'backend: in-memory', size: 38, weight: 600, mono: true, color: T.mid, alpha: 0 });
    s.node('rowD', 'label', { x: 540, y: 1500, text: 'backend: database', size: 38, weight: 600, mono: true, color: T.mid, alpha: 0 });
    const cell = (id, x, y, w, title, value, color) => s.node(id, 'panel', { x, y, w, h: 130, title, titleSize: 36, statusSize: 38, alpha: 0, color,
      titleColor: T.mid, rowY: [90], rowH: 52, valueSize: 40, r0Text: value, r0Color: color === T.info ? T.info : T.fg });
    cell('cMT', L, 1385, 460, 'thread A', 'step 2 of 4', T.mid);
    cell('cMS', R, 1385, 400, 'billing', 'npm test', T.info);
    cell('cDT', L, 1595, 460, 'thread A', 'step 2 of 4', T.mid);
    cell('cDS', R, 1595, 400, 'billing', 'npm test', T.info);
    s.node('take', 'label', { x: 540, y: 1735, text: 'scope ≠ durability', size: 54, weight: 700, color: T.fg, alpha: 0 });

    const pan = (id) => s.panOf(id);

    // ---- beat 1: thread state belongs to one conversation ----
    s.set(0.4, 'hdrT', 'alpha', 1, 0.5);
    s.set(1.0, 'thA', 'alpha', 1, 0.5); s.sfx(1.0, 'ack', { note: 'C5', gain: 1.0, pan: pan('thA') });
    s.set(1.8, 'thA', 'r0Alpha', 1, 0.3); s.sfx(1.8, 'ack', { note: 'C6', gain: 1.0, pan: pan('thA') });
    s.set(2.6, 'thA', 'r1Alpha', 1, 0.3); s.sfx(2.6, 'ack', { note: 'C5', gain: 0.8, pan: pan('thA') });
    s.set(3.6, 'thA', 'r0Hl', 1, 0.2); s.sfx(3.6, 'ack', { note: 'C6', gain: 1.2, pan: pan('thA') });   // saved progress
    s.set(4.6, 'thA', 'r0Hl', 0, 0.5);
    // hold to 7.5

    // ---- beat 2: a shared store has a wider scope, addressed by namespace and key ----
    s.set(7.5, 'hdrS', 'alpha', 1, 0.5); s.set(7.5, 'shared', 'alpha', 1, 0.5);
    s.sfx(7.5, 'ack', { note: 'G4', gain: 1.3, pan: pan('shared') });
    s.set(8.4, 'shared', 'r0Alpha', 1, 0.3); s.sfx(8.4, 'ack', { note: 'G5', gain: 1.2, pan: pan('shared') });
    s.set(9.2, 'shared', 'r1Alpha', 1, 0.3); s.sfx(9.2, 'ack', { note: 'G4', gain: 1.1, pan: pan('shared') });
    s.set(10.6, 'shared', 'r0Hl', 1, 0.2); s.sfx(10.6, 'ack', { note: 'G5', gain: 1.3, pan: pan('shared') });
    s.set(11.6, 'shared', 'r0Hl', 0, 0.3);
    s.set(11.8, 'shared', 'r1Hl', 1, 0.2); s.sfx(11.8, 'ack', { note: 'G4', gain: 1.3, pan: pan('shared') });
    s.set(12.8, 'shared', 'r1Hl', 0, 0.4);
    // hold to 15.0: same key, two namespaces, two separate records

    // ---- beat 3: a new thread reads the relevant scope only ----
    s.set(15.0, 'thB', 'alpha', 1, 0.5); s.sfx(15.0, 'ack', { note: 'C6', gain: 1.0, pan: pan('thB') });
    s.set(15.8, 'thB', 'r0Alpha', 1, 0.3); s.sfx(15.8, 'ack', { note: 'C5', gain: 1.0, pan: pan('thB') });
    s.set(16.5, 'thB', 'r1Alpha', 1, 0.3); s.sfx(16.5, 'ack', { note: 'C5', gain: 0.7, pan: pan('thB') });
    let t = 17.8;   // read billing · test_cmd
    s.set(t, 'wire:readS', 'alpha', 1, 0.2); s.set(t, 'wire:readS', 'color', T.accent, 0.2);
    s.packet({ route: [[560, 1010], [R, 1010], [R, 870]], t, dur: 0.9, kind: 'dot', color: T.accent });
    s.sfx(t, 'send', { note: 'E6', gain: 1.1, pan: pan('thB') });
    t = 18.7;
    s.set(t, 'shared', 'r0Hl', 1, 0.2); s.pulse(t, 'shared');
    s.sfx(t, 'arrive', { note: 'G5', gain: 0.9, pan: pan('shared') });
    t = 19.4;
    s.set(t, 'wire:readS', 'color', T.info, 0.2);
    s.packet({ route: [[R, 870], [R, 1010], [560, 1010]], t, dur: 0.9, kind: 'dot', color: T.info });
    s.sfx(t, 'send', { note: 'G6', gain: 1.0, pan: pan('shared') });
    t = 20.3;
    s.set(t, 'thB', 'r1Text', 'npm test', 0); s.set(t, 'thB', 'r1Color', T.info, 0); s.set(t, 'thB', 'r1Slot', 0, 0.3);
    s.pulse(t, 'thB');
    s.sfx(t, 'arrive', { note: 'C5', gain: 1.0, pan: pan('thB') });
    s.set(t + 0.3, 'wire:readS', 'alpha', 0, 0.5);
    s.set(t + 0.5, 'shared', 'r0Hl', 0, 0.5);
    t = 21.8;   // thread A's state is another conversation's history: not read
    s.set(t, 'wire:mixA', 'alpha', 1, 0.3); s.set(t, 'wire:mixA', 'color', T.mid, 0);
    s.sfx(t, 'ack', { note: 'C4', gain: 0.9, pan: pan('thA') });
    t = 22.6;
    s.ripple(t, [L, 775], T.mid, { r0: 10, r1: 44, dur: 0.9, mark: 'x' });
    s.set(t, 'notRead', 'alpha', 1, 0.3);
    s.sfx(t, 'miss', { gain: 0.7, pan: pan('thA') });
    s.set(t + 0.9, 'wire:mixA', 'alpha', 0.5, 0.4);
    // hold to 26.5: B has its own step and the shared command, nothing of A's

    // ---- beat 4: scope and durability are separate choices ----
    t = 26.5;
    for (const id of ['hdrT', 'hdrS', 'thA', 'thB', 'shared', 'notRead']) s.set(t, id, 'alpha', 0.35, 0.6);
    s.set(t, 'wire:mixA', 'alpha', 0.2, 0.6);
    t = 27.2;
    s.set(t, 'rt', 'alpha', 1, 0.4); s.set(t, 'colT', 'alpha', 1, 0.4); s.set(t, 'colS', 'alpha', 1, 0.4);
    s.sfx(t, 'ack', { note: 'E5', gain: 1.2, pan: 0 });
    t = 28.2;
    s.set(t, 'rowM', 'alpha', 1, 0.4); s.set(t, 'cMT', 'alpha', 1, 0.4); s.set(t, 'cMS', 'alpha', 1, 0.4);
    s.sfx(t, 'ack', { note: 'C5', gain: 1.0, pan: pan('cMT') }); s.sfx(t + 0.15, 'ack', { note: 'G5', gain: 1.0, pan: pan('cMS') });
    t = 29.2;
    s.set(t, 'rowD', 'alpha', 1, 0.4); s.set(t, 'cDT', 'alpha', 1, 0.4); s.set(t, 'cDS', 'alpha', 1, 0.4);
    s.sfx(t, 'ack', { note: 'C5', gain: 1.0, pan: pan('cDT') }); s.sfx(t + 0.15, 'ack', { note: 'G5', gain: 1.0, pan: pan('cDS') });
    // hold 29.6 – 31.8: four setups, same records
    t = 31.8;   // process restart
    s.set(t, 'rt', 'text', 'process restart', 0); s.set(t, 'rt', 'color', T.accent, 0);
    s.set(t, 'sweep', 'alpha', 1, 0.15); s.set(t, 'sweep', 'seg0', 1, 0.7, 'linear');
    s.sfx(t, 'thump', { note: 'E3', gain: 1.0, pan: 0 });
    for (const id of ['cMT', 'cMS', 'cDT', 'cDS']) { s.set(t, id, 'alpha', 0.4, 0.15); s.set(t + 0.5, id, 'alpha', 1, 0.3); }
    s.set(t + 0.9, 'sweep', 'alpha', 0, 0.4);
    s.set(t + 0.9, 'rt', 'text', 'after restart', 0); s.set(t + 0.9, 'rt', 'color', T.fg, 0);
    t = 33.2;   // in-memory row: lost in both scopes
    for (const id of ['cMT', 'cMS']) {
      s.set(t, id, 'r0Text', '—', 0); s.set(t, id, 'r0Color', T.dim, 0);
      s.set(t, id, 'status', 'lost', 0); s.set(t, id, 'statusColor', T.bad, 0); s.set(t, id, 'color', T.bad, 0.2);
    }
    s.sfx(t, 'poof', { note: 'C4', gain: 0.9, pan: pan('cMT') }); s.sfx(t + 0.25, 'poof', { note: 'G4', gain: 0.9, pan: pan('cMS') });
    t = 34.4;   // database row: kept in both scopes
    for (const id of ['cDT', 'cDS']) {
      s.set(t, id, 'status', 'kept', 0); s.set(t, id, 'statusColor', T.ok, 0); s.set(t, id, 'color', T.ok, 0.2); s.pulse(t, id);
    }
    s.sfx(t, 'arrive', { note: 'C5', gain: 0.9, pan: pan('cDT') }); s.sfx(t + 0.2, 'arrive', { note: 'G5', gain: 0.9, pan: pan('cDS') });
    // hold 34.8 – 37.0
    t = 37.0;   // one scope column: one lost, one kept
    s.set(t, 'colT', 'color', T.fg, 0.2); s.pulse(t, 'cMT'); s.pulse(t, 'cDT');
    s.sfx(t, 'ack', { note: 'C5', gain: 1.3, pan: pan('cMT') });
    s.set(t + 1.2, 'colT', 'color', T.mid, 0.4);
    t = 38.6;
    s.set(t, 'colS', 'color', T.fg, 0.2); s.pulse(t, 'cMS'); s.pulse(t, 'cDS');
    s.sfx(t, 'ack', { note: 'G5', gain: 1.3, pan: pan('cMS') });
    s.set(t + 1.2, 'colS', 'color', T.mid, 0.4);
    t = 40.2;   // the outcome follows the backend row
    s.set(t, 'rowM', 'color', T.bad, 0.2); s.set(t, 'rowD', 'color', T.ok, 0.2);
    s.set(t, 'take', 'alpha', 1, 0.4);
    s.sfx(t, 'chime', { note: 'E5', gain: 0.9, pan: 0 });
    // final hold 40.6 – 45.2
    s.fade(45.2, 1, 1.0);
    s.meta.duration = 46.8;
  },
});

