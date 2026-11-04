/* Policy and permission — guardrails-and-permissions motion-v2 lesson 03.
 * One mechanism: the same proposed action A1 goes to two different checks.
 * The policy check is a judgment (confidence 0.82) and ACCEPTS it; that verdict grants nothing.
 * The permission check looks up the session identity's grant for deploy prod, finds none, and DENIES.
 * Only the permission check is wired to the deploy service, which is never invoked. Both verdicts stay visible.
 * Render from the repository root:
 *   node video/guardrails-and-permissions/motion-v2/03/engine/render.mjs video/guardrails-and-permissions/motion-v2/03/scene.js video/guardrails-and-permissions/motion-v2/03/video.mp4
 * Cut-local engine copy of lesson 02's local general helpers ('panel', 'matrix', chip size, title sizes); unchanged here.
 */
FlowVideo.scene({
  meta: { title: 'Policy and permission', titleSize: 86, subtitle: 'TWO DIFFERENT CHECKS', subtitleSize: 34, subtitleSpacing: 7, duration: 38, fps: 30, speed: 1 },
  build(s) {
    const T = s.THEME;
    const LX = 285, RX = 795, COL_Y = 1020, TOP = 720;

    // ---- stage ----
    s.node('prop', 'panel', { x: 540, y: 532, w: 980, h: 160, title: 'Proposed action', titleSize: 40, titleY: 44, rows: [112], rowH: 62, valueX: 40, valueSize: 52, tagSize: 42, tagPad: 40,
      color: T.mid, alpha: 0, r0Text: 'deploy r42 \u2192 prod', r0Reveal: 0, r0Color: T.info, r0Tag: '', r0TagColor: T.fg });
    const colOpts = { y: COL_Y, w: 470, h: 600, titleSize: 40, titleY: 50, rows: [108, 162, 228, 282, 348, 402, 468, 526], rowH: 52, keyX: 34, valueX: 34, keySize: 36, valueSize: 46, color: T.dim, alpha: 0 };
    s.node('pol', 'panel', Object.assign({}, colOpts, { x: LX, title: 'Policy check',
      r0Key: 'kind', r1Text: 'judgment', r1Color: T.accent, r1Alpha: 0,
      r2Key: 'criterion', r3Text: 'recovery fit', r3Alpha: 0,
      r4Key: 'confidence',
      r6Key: 'verdict', r7Text: 'pending', r7Color: T.mid, r7Size: 44 }));
    s.node('perm', 'panel', Object.assign({}, colOpts, { x: RX, title: 'Permission check',
      r0Key: 'identity \u00b7 from session', r1Text: 'investigator', r1Alpha: 0,
      r2Key: 'needs', r3Text: 'deploy prod', r3Alpha: 0,
      r4Key: 'grant', r5Text: 'none', r5Color: T.bad, r5Alpha: 0,
      r6Key: 'verdict', r7Text: 'not checked', r7Color: T.mid, r7Size: 44 }));
    // confidence meter inside the policy column (graded result)
    s.node('meter', 'bar', { x: 214, y: TOP + 402, w: 260, h: 22, segments: 1, seg0Color: T.accent, alpha: 0 });
    s.node('conf', 'label', { x: 420, y: TOP + 404, text: '', size: 44, weight: 700, mono: true, color: T.accent, alpha: 0 });
    s.node('exec', 'panel', { x: 540, y: 1540, w: 980, h: 220, title: 'Deploy service', titleSize: 40, titleY: 46, rows: [112, 172], rowH: 56, keyX: 40, valueX: 330, keySize: 38, valueSize: 46, tagSize: 38, tagPad: 40,
      color: T.dim, alpha: 0, r0Key: 'calls', r0Text: '0', r0Tag: 'not invoked', r1Key: 'live release', r1Text: 'r41' });

    s.wire('toPol', [LX, 618], [LX, 714], { color: T.dim });
    s.wire('toPerm', [RX, 618], [RX, 714], { color: T.dim });
    s.wire('run', [RX, 1326], [RX, 1424], { color: T.dim });
    for (const w of ['toPol', 'toPerm', 'run']) s.set(0, 'wire:' + w, 'alpha', 0, 0);
    s.set(0, 'wire:run', 'dashed', 1, 0);

    const pan = (a) => s.panOf(a);
    const P = [540, 532], L = [LX, COL_Y], R = [RX, COL_Y], E = [540, 1540];
    const lit = (t, w, c) => { s.set(t, 'wire:' + w, 'color', c, 0.2); s.set(t, 'wire:' + w, 'flow', 1, 0); };
    const unlit = (t, w) => { s.set(t, 'wire:' + w, 'color', T.dim, 0.4); s.set(t, 'wire:' + w, 'flow', 0, 0); };
    const reveal = (t, id, i, note, pn) => { s.set(t, id, 'r' + i + 'Alpha', 1, 0.3); s.set(t, id, 'r' + i + 'Hl', 1, 0.2); s.set(t, id, 'r' + i + 'HlColor', T.fg, 0); s.set(t + 0.9, id, 'r' + i + 'Hl', 0, 0.4); s.sfx(t, 'ack', { note, gain: 1.1, pan: pn }); };

    // ---- beat 1: A1 enters the policy check, a judgment (0–10.5) ----
    let t = 0.3;
    for (const id of ['pol', 'perm', 'exec', 'meter']) s.set(t, id, 'alpha', 1, 0.7);
    for (const w of ['toPol', 'toPerm', 'run']) s.set(t, 'wire:' + w, 'alpha', 1, 0.7);
    s.sfx(t + 0.2, 'ack', { note: 'C5', gain: 0.6, pan: 0 });
    t = 1.2;
    s.set(t, 'prop', 'alpha', 1, 0.3); s.set(t, 'prop', 'scale', 0.94, 0); s.set(t, 'prop', 'scale', 1, 0.4, 'back');
    s.set(t + 0.2, 'prop', 'r0Reveal', 1, 0.9, 'linear'); s.set(t + 1.1, 'prop', 'r0Tag', 'A1', 0);
    s.sfx(t, 'store', { note: 'E5', gain: 0.9, pan: pan(P) });
    t = 3.6;
    lit(t, 'toPol', T.info);
    s.packet({ route: [[LX, 610], [LX, 724]], t, dur: 0.8, kind: 'chip', label: 'A1', color: T.info, size: 36 });
    s.sfx(t, 'send', { note: 'E6', pan: pan([LX, 660]) });
    t = 4.4;
    unlit(t, 'toPol');
    s.set(t, 'pol', 'color', T.accent, 0.2); s.set(t, 'pol', 'titleColor', T.fg, 0.2); s.set(t, 'pol', 'glow', 0.5, 0.2); s.set(t + 0.5, 'pol', 'glow', 0, 0.6);
    s.sfx(t, 'arrive', { note: 'G5', pan: pan(L) });
    reveal(5.2, 'pol', 1, 'G6', pan(L));   // kind: judgment
    reveal(6.3, 'pol', 3, 'G6', pan(L));   // criterion: recovery fit
    t = 7.4;  // the judgment produces a graded confidence
    s.set(t, 'meter', 'seg0', 0.82, 1.6, 'out');
    for (let k = 0; k < 6; k++) s.sfx(t + k * 0.26, 'work', { note: 'G4', gain: 0.8, pan: pan([214, TOP + 402]) });
    t = 9.0;
    s.set(t, 'conf', 'alpha', 1, 0.2); s.set(t, 'conf', 'text', '0.82', 0);
    s.pulse(t, 'meter', T.accent, 0.3);
    s.sfx(t, 'clock', { gain: 1.4, pan: pan([214, TOP + 402]) });

    // ---- beat 2: the policy check accepts; nothing is granted or run (11–17.5) ----
    t = 11.0;
    s.set(t, 'pol', 'r7Text', 'ACCEPTED', 0); s.set(t, 'pol', 'r7Color', T.ok, 0); s.set(t, 'pol', 'r7Size', 52, 0);
    s.set(t, 'pol', 'r7Hl', 1, 0.2); s.set(t, 'pol', 'r7HlColor', T.ok, 0); s.set(t + 1.2, 'pol', 'r7Hl', 0, 0.5);
    s.set(t, 'pol', 'color', T.mid, 0.5);
    s.sfx(t, 'ack', { note: 'G5', gain: 1.4, pan: pan(L) });
    t = 12.6;  // the permission check has not run
    s.set(t, 'perm', 'r7Hl', 1, 0.2); s.set(t, 'perm', 'r7HlColor', T.mid, 0); s.set(t + 1.0, 'perm', 'r7Hl', 0, 0.4);
    s.sfx(t, 'ack', { note: 'C4', gain: 0.9, pan: pan(R) });
    t = 13.8;  // and nothing has executed
    s.set(t, 'exec', 'r0Hl', 1, 0.2); s.set(t, 'exec', 'r0HlColor', T.mid, 0); s.set(t + 1.0, 'exec', 'r0Hl', 0, 0.4);
    s.sfx(t, 'ack', { note: 'C4', gain: 0.9, pan: pan(E) });

    // ---- beat 3: the same A1 goes to the permission check, which denies (17.5–25) ----
    t = 17.5;
    lit(t, 'toPerm', T.info);
    s.packet({ route: [[RX, 610], [RX, 724]], t, dur: 0.8, kind: 'chip', label: 'A1', color: T.info, size: 36 });
    s.sfx(t, 'send', { note: 'E6', pan: pan([RX, 660]) });
    t = 18.3;
    unlit(t, 'toPerm');
    s.set(t, 'perm', 'color', T.fg, 0.2); s.set(t, 'perm', 'titleColor', T.fg, 0.2); s.set(t, 'perm', 'glow', 0.5, 0.2); s.set(t + 0.5, 'perm', 'glow', 0, 0.6);
    s.sfx(t, 'arrive', { note: 'C5', pan: pan(R) });
    reveal(19.1, 'perm', 1, 'C6', pan(R));   // identity
    reveal(20.2, 'perm', 3, 'C6', pan(R));   // needs deploy prod
    t = 21.3;  // grant lookup
    s.set(t, 'perm', 'r5Hl', 1, 0.15); s.set(t, 'perm', 'r5HlColor', T.accent, 0);
    s.sfx(t, 'work', { note: 'C4', gain: 1.1, pan: pan(R) });
    s.sfx(t + 0.3, 'work', { note: 'C4', gain: 1.1, pan: pan(R) });
    t = 21.9;
    s.set(t, 'perm', 'r5Alpha', 1, 0.2); s.set(t, 'perm', 'r5HlColor', T.bad, 0.2);
    t = 22.9;
    s.set(t, 'perm', 'r5Hl', 0, 0.4);
    s.set(t, 'perm', 'r7Text', 'DENIED', 0); s.set(t, 'perm', 'r7Color', T.bad, 0); s.set(t, 'perm', 'r7Size', 52, 0);
    s.set(t, 'perm', 'r7Hl', 1, 0.15); s.set(t, 'perm', 'r7HlColor', T.bad, 0);
    s.set(t, 'perm', 'color', T.bad, 0.1); s.set(t, 'perm', 'glow', 0.8, 0.1); s.set(t + 0.4, 'perm', 'glow', 0, 0.6);
    s.shake(t, 'perm', 8, 0.4);
    s.sfx(t, 'thump', { note: 'C3', gain: 1.3, pan: pan(R) });

    // ---- beat 4: nothing executes; the policy pass did not override (26–31) ----
    t = 26.0;
    s.set(t, 'perm', 'r7Hl', 0, 0.5); s.set(t, 'perm', 'color', T.mid, 0.5);
    s.ripple(t, [RX, 1375], T.mid, { r0: 10, r1: 46, dur: 0.9, mark: 'x' });
    s.set(t, 'wire:run', 'color', T.mid, 0.2); s.set(t + 0.9, 'wire:run', 'color', T.dim, 0.5);
    s.sfx(t, 'closed', { pan: pan([RX, 1375]) });
    t = 27.2;
    s.set(t, 'exec', 'r0Hl', 1, 0.2); s.set(t + 1.1, 'exec', 'r0Hl', 0, 0.5);
    s.sfx(t, 'ack', { note: 'C4', gain: 0.9, pan: pan(E) });
    t = 28.4;  // the policy verdict stands, unchanged
    s.set(t, 'pol', 'r7Hl', 1, 0.2); s.set(t + 1.1, 'pol', 'r7Hl', 0, 0.5);
    s.sfx(t, 'ack', { note: 'G5', gain: 0.8, pan: pan(L) });

    // ---- beat 5: two verdicts, one outcome (31–38) ----
    t = 31.0;
    s.set(t, 'pol', 'r7Hl', 1, 0.3); s.set(t, 'perm', 'r7Hl', 1, 0.3);
    s.set(t, 'prop', 'r0Tag', 'A1 \u00b7 not run', 0); s.set(t, 'prop', 'r0TagColor', T.mid, 0);
    s.set(t, 'prop', 'r0Color', T.mid, 0.4);
    s.sfx(t, 'ack', { note: 'G4', gain: 0.8, pan: pan(L) });
    s.sfx(t + 0.12, 'ack', { note: 'C4', gain: 0.8, pan: pan(R) });

    s.fade(36.6, 1, 1.2);
    s.meta.duration = 38.4;

    s.sound('closed', { base: 196, gain: 0.32, echo: { delay: 0.09, feedback: 0.25, repeats: 1 },
      layers: [{ type: 'tone', wave: 'sine', ratio: 1, attack: 0.004, decay: 0.12, gain: 1, harmonics: [0.3] },
               { type: 'noise', lp: 900, attack: 0.002, decay: 0.05, gain: 0.25 }] });
  },
});
