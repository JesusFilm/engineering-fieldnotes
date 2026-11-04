/* Save a useful record — memory-architecture motion-v2 cut 03.
 * One mechanism: the application applies a write policy (useful, supported, in scope) to each candidate a session found.
 * The test command passes, gains its source and revision, and is saved after a write acknowledgement;
 * a guess stops at "supported" and stays in the thread; a personal preference stops at "in scope". One of three is saved.
 * Render from the repository root:
 *   node video/memory-architecture/motion-v2/03/engine/render.mjs video/memory-architecture/motion-v2/03/scene.js video/memory-architecture/motion-v2/03/video.mp4 --sheet video/memory-architecture/motion-v2/03/scratch/contact-sheet.png
 * Uses the local engine copy: panel/chip types from cut 01 plus kv valueX, row tags and chip marks.
 */
FlowVideo.scene({
  meta: { title: 'Memory', subtitle: 'SAVE A USEFUL RECORD', subtitleSize: 40, subtitleSpacing: 4, subtitleY: 410, duration: 46, fps: 30, speed: 1 },
  build(s) {
    const T = s.THEME;

    // ---- stage ----
    s.node('src', 'panel', { x: 540, y: 535, w: 900, h: 150, title: 'billing / AGENTS.md', titleColor: T.info, status: 'r1', statusColor: T.info,
      alpha: 0, color: T.info, rowY: [104], rowH: 60, valueSize: 44, r0Text: 'Test: npm test', r0HlColor: T.info });
    s.node('ses', 'panel', { x: 540, y: 774, w: 900, h: 262, title: 'session · found', titleColor: T.fg, layout: 'kv', valueX: 250, alpha: 0, color: T.mid,
      rowY: [112, 172, 232], rowH: 54, capSize: 36, valueSize: 38,
      r0Cap: 'test_cmd', r0Text: 'npm test', r0Alpha: 0,
      r1Cap: 'guess', r1Text: 'flaky e2e?', r1Color: T.mid, r1Alpha: 0,
      r2Cap: 'pref', r2Text: 'tabs > spaces', r2Color: T.mid, r2Alpha: 0 });
    s.node('pol', 'panel', { x: 540, y: 1020, w: 900, h: 170, title: 'write policy', titleColor: T.accent, alpha: 0, color: T.accent, statusColor: T.accent });
    const chipAt = (id, x, label) => s.node(id, 'chip', { x, y: 1062, text: label, size: 38, padX: 20, markSpace: 40, h: 60, color: T.dim, textColor: T.mid, alpha: 0 });
    chipAt('cU', 230, 'useful'); chipAt('cS', 505, 'supported'); chipAt('cC', 805, 'in scope');
    s.node('rec', 'panel', { x: 540, y: 1350, w: 900, h: 410, title: 'proposed record', titleColor: T.fg, layout: 'kv', valueX: 300, alpha: 0, color: T.accent,
      status: 'proposed', statusColor: T.accent, rowY: [110, 175, 240, 305, 370], rowH: 56, capSize: 36, valueSize: 40,
      r0Cap: 'repo', r0Text: 'billing', r1Cap: 'key', r1Text: 'test_cmd', r2Cap: 'value', r2Text: 'npm test',
      r3Cap: 'source', r3Text: '—', r3Color: T.mid, r3Slot: 1, r4Cap: 'revision', r4Text: '—', r4Color: T.mid, r4Slot: 1,
      r0HlColor: T.accent, r1HlColor: T.accent, r3HlColor: T.info, r4HlColor: T.info });
    s.node('count', 'label', { x: 540, y: 1625, text: 'candidates 3 · saved 0', size: 42, weight: 600, mono: true, color: T.mid, alpha: 0 });

    const pan = (id) => s.panOf(id);
    const chip = (t, id, state) => {   // state: 'pass' | 'fail' | 'idle'
      const c = state === 'pass' ? T.ok : state === 'fail' ? T.bad : T.dim;
      s.set(t, id, 'color', c, 0.2); s.set(t, id, 'textColor', state === 'idle' ? T.mid : c, 0.2);
      s.set(t, id, 'mark', state === 'pass' ? 'check' : state === 'fail' ? 'x' : '', 0);
      if (state !== 'idle') s.pulse(t, id);
    };
    const resetChips = (t) => { for (const id of ['cU', 'cS', 'cC']) chip(t, id, 'idle'); };
    const check = (t, id, pass) => {
      chip(t, id, pass ? 'pass' : 'fail');
      if (pass) s.sfx(t, 'ack', { note: 'E5', gain: 1.3, pan: pan(id) });
      else s.sfx(t, 'miss', { gain: 0.8, pan: pan(id) });
    };

    // ---- beat 1: the session finds the test command and proposes retaining it ----
    s.set(0.4, 'src', 'alpha', 1, 0.5); s.sfx(0.4, 'ack', { note: 'G4', gain: 1.2, pan: 0 });
    s.set(1.4, 'src', 'r0Hl', 1, 0.2); s.sfx(1.4, 'ack', { note: 'G5', gain: 1.2, pan: 0 });
    s.set(2.2, 'ses', 'alpha', 1, 0.5);
    s.set(2.7, 'ses', 'r0Alpha', 1, 0.3); s.sfx(2.7, 'arrive', { note: 'C5', gain: 0.9, pan: 0 });
    s.set(3.3, 'src', 'r0Hl', 0, 0.5);
    s.set(3.8, 'ses', 'r1Alpha', 1, 0.3); s.sfx(3.8, 'ack', { note: 'C4', gain: 1.1, pan: 0 });
    s.set(4.6, 'ses', 'r2Alpha', 1, 0.3); s.sfx(4.6, 'ack', { note: 'C4', gain: 1.0, pan: 0 });
    s.set(5.4, 'count', 'alpha', 1, 0.4); s.sfx(5.4, 'ack', { note: 'C5', gain: 0.8, pan: 0 });
    let t = 6.4;   // propose the command as a record
    s.set(t, 'ses', 'r0Hl', 1, 0.2); s.set(t, 'ses', 'r0HlColor', T.accent, 0);
    s.set(t, 'ses', 'r0Tag', 'proposed', 0); s.set(t, 'ses', 'r0TagColor', T.accent, 0);
    s.set(t, 'rec', 'alpha', 1, 0.5);
    s.sfx(t, 'ack', { note: 'C5', gain: 1.3, pan: 0 });
    // hold 6.9 – 9.6: a proposal, not yet saved; source and revision empty

    // ---- beat 2: check source and scope; a guess does not become a settled fact ----
    t = 9.6;
    s.set(t, 'pol', 'alpha', 1, 0.4); s.set(t, 'pol', 'status', 'test_cmd', 0);
    for (const id of ['cU', 'cS', 'cC']) s.set(t, id, 'alpha', 1, 0.4);
    s.sfx(t, 'ack', { note: 'E4', gain: 1.2, pan: 0 });
    check(10.6, 'cU', true);
    t = 11.6;   // supported: the reviewed source says so
    s.set(t, 'src', 'r0Hl', 1, 0.2); s.pulse(t, 'src');
    s.set(t + 0.4, 'rec', 'r3Text', 'AGENTS.md', 0); s.set(t + 0.4, 'rec', 'r3Color', T.info, 0); s.set(t + 0.4, 'rec', 'r3Slot', 0, 0.3);
    s.set(t + 0.4, 'rec', 'r3Hl', 1, 0.2);
    s.sfx(t + 0.4, 'arrive', { note: 'G5', gain: 0.9, pan: 0 });
    check(12.6, 'cS', true);
    s.set(13.0, 'src', 'r0Hl', 0, 0.5); s.set(13.0, 'rec', 'r3Hl', 0, 0.5);
    t = 13.6;   // in scope: billing / test_cmd
    s.set(t, 'rec', 'r0Hl', 1, 0.2); s.set(t, 'rec', 'r1Hl', 1, 0.2);
    check(14.2, 'cC', true);
    s.set(15.0, 'rec', 'r0Hl', 0, 0.5); s.set(15.0, 'rec', 'r1Hl', 0, 0.5);
    // hold 15.0 – 16.8
    t = 16.8;   // the guess
    resetChips(t);
    s.set(t, 'ses', 'r0Hl', 0, 0.3);
    s.set(t, 'ses', 'r1Hl', 1, 0.2); s.set(t, 'ses', 'r1HlColor', T.accent, 0); s.set(t, 'ses', 'r1Color', T.fg, 0.2);
    s.set(t, 'pol', 'status', 'guess', 0);
    s.sfx(t, 'ack', { note: 'C4', gain: 1.2, pan: 0 });
    check(17.8, 'cU', true);
    t = 18.8;   // no source supports it
    s.set(t, 'src', 'r0Hl', 1, 0.15); s.set(t, 'src', 'r0HlColor', T.mid, 0); s.set(t + 0.6, 'src', 'r0Hl', 0, 0.4);
    check(19.4, 'cS', false);
    t = 20.2;
    s.set(t, 'ses', 'r1Tag', 'thread only', 0); s.set(t, 'ses', 'r1TagColor', T.fg, 0);
    s.set(t, 'ses', 'r1Hl', 0, 0.4); s.set(t, 'ses', 'r1Color', T.mid, 0.4);
    s.sfx(t, 'thump', { note: 'E4', gain: 0.6, pan: 0 });
    // hold 20.6 – 23.4: the guess stays a hypothesis in the thread; the record is untouched

    // ---- beat 3: save the command with its revision ----
    t = 23.4;
    resetChips(t);
    s.set(t, 'pol', 'status', 'test_cmd', 0);
    s.set(t, 'ses', 'r0Hl', 1, 0.2);
    for (const id of ['cU', 'cS', 'cC']) chip(t + 0.3, id, 'pass');
    s.sfx(t + 0.3, 'ack', { note: 'E5', gain: 1.3, pan: 0 });
    t = 24.6;   // the revision travels with the value
    s.set(t, 'src', 'statusColor', T.fg, 0.2); s.pulse(t, 'src');
    s.set(t + 0.4, 'rec', 'r4Text', 'r1', 0); s.set(t + 0.4, 'rec', 'r4Color', T.info, 0); s.set(t + 0.4, 'rec', 'r4Slot', 0, 0.3);
    s.set(t + 0.4, 'rec', 'r4Hl', 1, 0.2);
    s.sfx(t + 0.4, 'arrive', { note: 'G4', gain: 1.0, pan: 0 });
    s.set(t + 1.2, 'src', 'statusColor', T.info, 0.4); s.set(t + 1.4, 'rec', 'r4Hl', 0, 0.5);
    // hold 25.6 – 29.6: the complete record, before saving
    t = 29.6;
    s.set(t, 'rec', 'status', 'saving…', 0);
    s.sfx(t, 'send', { note: 'E6', gain: 1.2, pan: 0 });
    t = 30.6;   // write acknowledged
    s.set(t, 'rec', 'status', 'saved', 0); s.set(t, 'rec', 'statusColor', T.ok, 0);
    s.set(t, 'rec', 'title', 'saved record', 0); s.set(t, 'rec', 'color', T.ok, 0.2); s.pulse(t, 'rec');
    s.set(t, 'ses', 'r0Tag', 'saved', 0); s.set(t, 'ses', 'r0TagColor', T.ok, 0); s.set(t, 'ses', 'r0HlColor', T.ok, 0.2);
    s.set(t, 'count', 'text', 'candidates 3 · saved 1', 0); s.set(t, 'count', 'color', T.fg, 0.2);
    s.sfx(t, 'store', { note: 'G5', gain: 1.2, pan: 0 });
    s.set(t + 1.0, 'ses', 'r0Hl', 0, 0.5); s.set(t + 1.2, 'count', 'color', T.mid, 0.4);
    // hold 31.0 – 33.6

    // ---- beat 4: retain only what the policy allows ----
    t = 33.6;
    resetChips(t);
    s.set(t, 'ses', 'r2Hl', 1, 0.2); s.set(t, 'ses', 'r2HlColor', T.accent, 0); s.set(t, 'ses', 'r2Color', T.fg, 0.2);
    s.set(t, 'pol', 'status', 'pref', 0);
    s.sfx(t, 'ack', { note: 'C4', gain: 1.2, pan: 0 });
    check(34.6, 'cU', true);
    check(35.6, 'cS', true);
    check(36.6, 'cC', false);   // a personal preference is not a billing convention
    t = 37.4;
    s.set(t, 'ses', 'r2Tag', 'not saved', 0); s.set(t, 'ses', 'r2TagColor', T.mid, 0);
    s.set(t, 'ses', 'r2Hl', 0, 0.4); s.set(t, 'ses', 'r2Color', T.mid, 0.4);
    s.sfx(t, 'thump', { note: 'E4', gain: 0.5, pan: 0 });
    t = 38.4;   // three found, one saved
    resetChips(t); s.set(t, 'pol', 'status', '', 0);
    s.set(t, 'count', 'color', T.fg, 0.2); s.pulse(t, 'rec');
    s.sfx(t, 'ack', { note: 'G5', gain: 1.3, pan: 0 });
    // final hold 38.8 – 44.0
    s.fade(44.0, 1, 1.0);
    s.meta.duration = 45.6;
  },
});

