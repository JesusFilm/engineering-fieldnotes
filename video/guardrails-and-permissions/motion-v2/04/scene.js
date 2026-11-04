/* Review a concrete action — guardrails-and-permissions motion-v2 lesson 04.
 * One mechanism: a read-only agent proposes release r42 with a concrete artifact and target and attaches test evidence.
 * A reviewer inspects those exact values and approves that record. A separate executor (deployer) verifies the approval,
 * compares the approved values with the action it is asked to run, and runs it only when both match.
 * Production changes r41 -> r42 through the executor; the agent stays read-only and has no route to production.
 * Render from the repository root:
 *   node video/guardrails-and-permissions/motion-v2/04/engine/render.mjs video/guardrails-and-permissions/motion-v2/04/scene.js video/guardrails-and-permissions/motion-v2/04/video.mp4
 * Cut-local engine: lesson 03's local copy (general 'panel', 'matrix', chip size, title sizes) plus a general 'diff' node.
 */
FlowVideo.scene({
  meta: { title: 'Review a concrete action', titleSize: 80, subtitle: 'APPROVE EXACT VALUES', subtitleSize: 34, subtitleSpacing: 7, duration: 42, fps: 30, speed: 1 },
  build(s) {
    const T = s.THEME;
    const ART = 'a91f\u20267c2e', TGT = 'prod', GUT = 1058;

    // ---- stage ----
    const actor = { y: 515, w: 470, h: 140, rows: [44, 102], rowH: 52, keyX: 30, valueX: 30, keySize: 40, valueSize: 40, tagSize: 36, tagPad: 30, color: T.dim, alpha: 0 };
    s.node('rev', 'panel', Object.assign({}, actor, { x: 285, r0Key: 'Reviewer', r0KeyColor: T.fg, r0Tag: '', r1Text: 'engineer', r1Color: T.mid }));
    s.node('agent', 'panel', Object.assign({}, actor, { x: 795, r0Key: 'Agent', r0KeyColor: T.fg, r0Tag: 'read-only', r0TagColor: T.mid, r1Text: 'investigator', r1Color: T.mid }));
    s.node('rec', 'panel', { x: 540, y: 850, w: 980, h: 380, title: 'Release r42', titleSize: 44, titleY: 46, rows: [46, 120, 188, 256, 326], rowH: 60, keyX: 40, valueX: 300, keySize: 40, valueSize: 46, tagSize: 38, tagPad: 40,
      color: T.dim, titleColor: T.mid, alpha: 0,
      r0Tag: '', r0TagColor: T.info,
      r1Key: 'action', r1Text: 'deploy', r1Alpha: 0,
      r2Key: 'artifact', r2Text: ART, r2Alpha: 0,
      r3Key: 'target', r3Text: TGT, r3Alpha: 0,
      r4Key: 'evidence', r4Text: 'tests 12/12 passed', r4Alpha: 0 });
    s.node('exe', 'diff', { x: 540, y: 1290, w: 980, h: 380, title: 'Executor \u00b7 deployer', titleSize: 40, rows: ['artifact', 'target'], heads: ['approved', 'to run'],
      labelW: 210, markW: 70, headY: 110, rowY: [184, 258], rowH: 62, statusY: 334, valueSize: 46, labelSize: 38, statusSize: 40,
      color: T.dim, alpha: 0, statusText: 'waiting', statusColor: T.mid });
    s.node('prod', 'panel', { x: 540, y: 1645, w: 980, h: 170, title: 'Production', titleSize: 40, titleY: 46, rows: [114], rowH: 58, keyX: 40, valueX: 300, keySize: 40, valueSize: 48, tagSize: 38, tagPad: 40,
      color: T.dim, alpha: 0, r0Key: 'live release', r0Text: 'r41', r0Tag: 'not started', r0TagColor: T.mid });

    s.wire('write', [795, 591], [795, 654], { color: T.dim });
    s.wire('review', [285, 591], [285, 654], { color: T.dim });
    s.wire('bind', [427, 1046], [427, 1094], { color: T.dim });
    s.wire('req', [1036, 515], [1036, 1290], { via: [[GUT, 515], [GUT, 1290]], color: T.dim });
    s.wire('run', [540, 1486], [540, 1554], { color: T.dim });
    for (const w of ['write', 'review', 'bind', 'req', 'run']) s.set(0, 'wire:' + w, 'alpha', 0, 0);
    s.set(0, 'wire:run', 'dashed', 1, 0);

    const pan = (a) => s.panOf(a);
    const AG = [795, 515], RV = [285, 515], RC = [540, 850], EX = [540, 1290], PR = [540, 1645];
    const lit = (t, w, c) => { s.set(t, 'wire:' + w, 'color', c, 0.2); s.set(t, 'wire:' + w, 'flow', 1, 0); };
    const unlit = (t, w) => { s.set(t, 'wire:' + w, 'color', T.dim, 0.4); s.set(t, 'wire:' + w, 'flow', 0, 0); };
    const rowIn = (t, i, note) => { s.set(t, 'rec', 'r' + i + 'Alpha', 1, 0.3); s.sfx(t, 'store', { note, gain: 0.75, pan: pan(RC) }); };

    // ---- beat 1: the agent prepares release r42 (0–8) ----
    let t = 0.3;
    for (const id of ['rev', 'rec', 'exe', 'prod']) s.set(t, id, 'alpha', 1, 0.7);
    for (const w of ['write', 'review', 'bind', 'req', 'run']) s.set(t, 'wire:' + w, 'alpha', 1, 0.7);
    s.sfx(t + 0.2, 'ack', { note: 'C5', gain: 0.6, pan: 0 });
    t = 1.2;
    s.set(t, 'agent', 'alpha', 1, 0.3); s.set(t, 'agent', 'scale', 0.94, 0); s.set(t, 'agent', 'scale', 1, 0.4, 'back');
    s.set(t, 'agent', 'color', T.mid, 0.3);
    s.sfx(t, 'ack', { note: 'E5', gain: 0.9, pan: pan(AG) });
    t = 2.4;
    lit(t, 'write', T.info);
    s.packet({ route: [[795, 586], [795, 664]], t, dur: 0.6, kind: 'chip', label: 'r42', color: T.info, size: 36 });
    s.sfx(t, 'send', { note: 'E6', pan: pan(AG) });
    t = 3.0;
    unlit(t, 'write');
    s.set(t, 'rec', 'color', T.info, 0.2); s.set(t, 'rec', 'titleColor', T.fg, 0.2);
    s.set(t, 'rec', 'r0Tag', 'proposed', 0);
    rowIn(3.2, 1, 'E5'); rowIn(3.9, 2, 'E5'); rowIn(4.6, 3, 'E5');
    s.set(5.4, 'rec', 'color', T.mid, 0.5);

    // ---- beat 2: evidence attached; the reviewer inspects concrete values (8–16.5) ----
    t = 8.0;
    lit(t, 'write', T.info);
    s.packet({ route: [[795, 586], [795, 664]], t, dur: 0.6, kind: 'chip', label: 'tests', color: T.info, size: 36 });
    s.sfx(t, 'send', { note: 'E6', pan: pan(AG) });
    t = 8.6;
    unlit(t, 'write');
    rowIn(t, 4, 'E5');
    t = 9.9;
    lit(t, 'review', T.accent);
    s.set(t, 'rev', 'color', T.accent, 0.2); s.set(t, 'rev', 'r0Tag', 'inspecting', 0); s.set(t, 'rev', 'r0TagColor', T.accent, 0);
    s.set(t, 'rec', 'r0Tag', 'in review', 0); s.set(t, 'rec', 'r0TagColor', T.accent, 0);
    s.sfx(t, 'arrive', { note: 'G5', gain: 0.75, pan: pan(RV) });
    s.set(t + 0.8, 'wire:review', 'flow', 0, 0);
    [[2, 11.1], [3, 12.3], [4, 13.5]].forEach(([i, tc]) => {
      s.set(tc, 'rec', 'r' + i + 'Hl', 1, 0.2); s.set(tc, 'rec', 'r' + i + 'HlColor', T.accent, 0);
      s.sfx(tc, 'ack', { note: 'G5', gain: 1.0, pan: pan(RV) });
    });

    // ---- beat 3: approve that exact record; the executor checks it (16.5–30) ----
    t = 16.5;
    s.packet({ route: [[285, 586], [285, 664]], t, dur: 0.6, kind: 'chip', label: 'approve', color: T.ok, size: 36 });
    s.set(t, 'wire:review', 'color', T.ok, 0.2);
    s.sfx(t, 'send', { note: 'G6', pan: pan(RV) });
    t = 17.1;
    unlit(t, 'review');
    for (const i of [2, 3, 4]) s.set(t, 'rec', 'r' + i + 'Hl', 0, 0.4);
    s.set(t, 'rec', 'color', T.ok, 0.2); s.set(t, 'rec', 'glow', 0.7, 0.2); s.set(t + 0.6, 'rec', 'glow', 0, 0.8);
    s.set(t, 'rec', 'r0Tag', 'approved \u00b7 reviewer', 0); s.set(t, 'rec', 'r0TagColor', T.ok, 0);
    s.set(t, 'rev', 'color', T.mid, 0.4); s.set(t, 'rev', 'r0Tag', 'approved', 0); s.set(t, 'rev', 'r0TagColor', T.ok, 0);
    s.sfx(t, 'arrive', { note: 'G5', gain: 1.1, pan: pan(RC) });
    t = 19.6;  // the approved record reaches the executor
    lit(t, 'bind', T.ok);
    s.packet({ route: [[427, 1040], [427, 1104]], t, dur: 0.6, kind: 'chip', label: 'approved r42', color: T.ok, size: 34 });
    s.sfx(t, 'send', { note: 'G6', gain: 0.9, pan: pan([427, 1070]) });
    t = 20.2;
    unlit(t, 'bind');
    s.set(t, 'exe', 'color', T.fg, 0.2); s.set(t, 'exe', 'titleColor', T.fg, 0.2); s.set(t, 'exe', 'glow', 0.5, 0.2); s.set(t + 0.5, 'exe', 'glow', 0, 0.6);
    s.set(t, 'exe', 'L0Alpha', 1, 0.3); s.set(t, 'exe', 'L1Alpha', 1, 0.3); s.set(t, 'exe', 'L0Text', ART, 0); s.set(t, 'exe', 'L1Text', TGT, 0);
    s.set(t, 'exe', 'L0Color', T.ok, 0); s.set(t, 'exe', 'L1Color', T.ok, 0);
    s.sfx(t, 'arrive', { note: 'C5', pan: pan(EX) });
    t = 21.4;  // trusted approval verified
    s.set(t, 'exe', 'statusText', 'approved by reviewer \u2713', 0); s.set(t, 'exe', 'statusColor', T.ok, 0);
    s.sfx(t, 'ack', { note: 'C4', gain: 1.0, pan: pan(EX) });
    t = 22.8;  // the agent asks for the run along the margin; it cannot deploy itself
    lit(t, 'req', T.info);
    s.packet({ route: [[1036, 515], [GUT, 515], [GUT, 1290], [1036, 1290]], t, dur: 1.4, kind: 'dot', color: T.info });
    s.sfx(t, 'send', { note: 'E6', gain: 0.9, pan: 0.6 });
    t = 24.2;
    unlit(t, 'req');
    s.set(t, 'exe', 'R0Alpha', 1, 0.3); s.set(t, 'exe', 'R1Alpha', 1, 0.3); s.set(t, 'exe', 'R0Text', ART, 0); s.set(t, 'exe', 'R1Text', TGT, 0);
    s.set(t, 'exe', 'R0Color', T.info, 0); s.set(t, 'exe', 'R1Color', T.info, 0);
    s.set(t, 'exe', 'M0', 'eq', 0); s.set(t, 'exe', 'M1', 'eq', 0);
    s.sfx(t, 'arrive', { note: 'C5', gain: 0.9, pan: pan(EX) });
    [[0, 26.0], [1, 27.6]].forEach(([i, tc]) => {
      s.set(tc, 'exe', 'H' + i, 1, 0.2); s.set(tc, 'exe', 'H' + i + 'Color', T.accent, 0);
      s.sfx(tc, 'work', { note: 'C4', gain: 1.0, pan: pan(EX) });
      s.set(tc + 0.6, 'exe', 'M' + i, 'check', 0); s.set(tc + 0.6, 'exe', 'M' + i + 'Pop', 0, 0); s.set(tc + 0.6, 'exe', 'M' + i + 'Pop', 1, 0.35);
      s.set(tc + 0.6, 'exe', 'H' + i + 'Color', T.ok, 0.2);
      s.set(tc + 0.6, 'exe', 'R' + i + 'Color', T.ok, 0.3);
      s.sfx(tc + 0.6, 'ack', { note: 'C5', gain: 2.0, pan: pan(EX) });
    });

    // ---- beat 4: only the matched action runs, by the executor; the agent stays read-only (30–42) ----
    t = 30.0;
    s.set(t, 'exe', 'H0', 0, 0.4); s.set(t, 'exe', 'H1', 0, 0.4);
    s.set(t, 'wire:run', 'dashed', 0, 0); lit(t, 'run', T.ok);
    s.packet({ route: [[540, 1480], [540, 1566]], t, dur: 0.8, kind: 'chip', label: 'deploy r42', color: T.ok, size: 34 });
    s.sfx(t, 'send', { note: 'C6', pan: pan(EX) });
    t = 30.8;
    unlit(t, 'run');
    s.set(t, 'prod', 'color', T.fg, 0.2); s.set(t, 'prod', 'titleColor', T.fg, 0.2);
    s.set(t, 'prod', 'r0Tag', 'deploying', 0); s.set(t, 'prod', 'r0TagColor', T.accent, 0);
    s.sfx(t, 'arrive', { note: 'D5', pan: pan(PR) });
    for (const tk of [31.2, 31.5, 31.8]) s.sfx(tk, 'work', { note: 'D4', gain: 0.8, pan: pan(PR) });
    t = 32.2;
    s.set(t, 'prod', 'r0Text', 'r42', 0); s.set(t, 'prod', 'r0Color', T.ok, 0.2);
    s.set(t, 'prod', 'r0Tag', 'by deployer', 0); s.set(t, 'prod', 'r0TagColor', T.ok, 0);
    s.set(t, 'prod', 'color', T.ok, 0.2); s.set(t, 'prod', 'glow', 0.6, 0.2); s.set(t + 0.6, 'prod', 'glow', 0, 0.8);
    s.set(t, 'exe', 'statusText', 'match \u00b7 ran r42', 0);
    s.sfx(t, 'deliver', { note: 'D5', gain: 1.9, pan: pan(PR) });
    t = 34.4;  // the agent's authority never changed
    s.set(t, 'agent', 'r0Hl', 1, 0.2); s.set(t, 'agent', 'r0HlColor', T.mid, 0); s.set(t, 'agent', 'r0TagColor', T.fg, 0.2);
    s.sfx(t, 'ack', { note: 'E4', gain: 0.9, pan: pan(AG) });
    t = 35.6;  // what was approved is what ran
    s.set(t, 'rec', 'r2Hl', 1, 0.3); s.set(t, 'rec', 'r3Hl', 1, 0.3); s.set(t, 'rec', 'r2HlColor', T.ok, 0); s.set(t, 'rec', 'r3HlColor', T.ok, 0);
    s.set(t, 'exe', 'H0', 1, 0.3); s.set(t, 'exe', 'H1', 1, 0.3);
    s.sfx(t, 'ack', { note: 'C5', gain: 0.9, pan: pan(EX) });

    s.fade(40.6, 1, 1.2);
    s.meta.duration = 42.2;
  },
});
