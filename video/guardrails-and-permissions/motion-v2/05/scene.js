/* Recheck changed actions — guardrails-and-permissions motion-v2 lesson 05.
 * One mechanism: the saved approval names r42 and its artifact digest. The current request is r43 with a different digest.
 * At execution time the executor confirms action and target are unchanged, then compares the full approved digest
 * with the current digest character by character, finds they differ, and blocks. Nothing runs (prod stays r41).
 * The actual r43 artifact is sent for its own review: a new ledger row, pending. The r42 approval is untouched and not reused.
 * Render from the repository root:
 *   node video/guardrails-and-permissions/motion-v2/05/engine/render.mjs video/guardrails-and-permissions/motion-v2/05/scene.js video/guardrails-and-permissions/motion-v2/05/video.mp4
 * Cut-local engine: lesson 04's local copy (general 'panel', 'matrix', 'diff', chip size, title sizes) plus a general 'strcmp' node.
 */
FlowVideo.scene({
  meta: { title: 'Recheck changed actions', titleSize: 80, subtitle: 'APPROVAL NAMES ONE ARTIFACT', subtitleSize: 34, subtitleSpacing: 6, duration: 36, fps: 30, speed: 1 },
  build(s) {
    const T = s.THEME;
    const D42 = 'a91f 7c2e 04b8', D43 = 'b84a 9d10 3f6c';

    // ---- stage ----
    s.node('ledger', 'panel', { x: 540, y: 575, w: 980, h: 250, title: 'Approvals', titleSize: 40, titleY: 46, rows: [112, 182], rowH: 58, valueX: 40, valueSize: 44, tagSize: 38, tagPad: 40,
      color: T.dim, alpha: 0,
      r0Text: 'r42  ' + D42, r0Color: T.fg, r0Tag: 'approved', r0TagColor: T.ok,
      r1Text: 'r43  ' + D43, r1Color: T.fg, r1Alpha: 0, r1Tag: 'pending review', r1TagColor: T.accent });
    s.node('req', 'panel', { x: 540, y: 810, w: 980, h: 140, title: 'Current request', titleSize: 40, titleY: 44, rows: [44, 102], rowH: 54, valueX: 40, valueSize: 46, tagSize: 38, tagPad: 40,
      color: T.dim, alpha: 0, r0Tag: 'awaiting check', r0TagColor: T.info, r1Text: 'deploy r43 \u2192 prod', r1Color: T.info });
    s.node('exe', 'panel', { x: 540, y: 1160, w: 980, h: 440, title: 'Executor \u00b7 recheck', titleSize: 40, titleY: 46, rows: [108, 380], rowH: 60, keyX: 40, valueX: 380, keySize: 38, valueSize: 46, tagSize: 38, tagPad: 40,
      color: T.dim, alpha: 0,
      r0Key: 'action \u00b7 target', r0Text: 'deploy \u2192 prod', r0Alpha: 1, r0Reveal: 0, r0Tag: '',
      r1Key: 'result', r1Text: 'checking', r1Color: T.mid, r1Size: 44, r1Tag: '' });
    s.node('cmp', 'strcmp', { x: 50, y: 1172, aLabel: 'approved r42', bLabel: 'current r43', labelX: 40, strX: 380, gap: 72, size: 54, labelSize: 38, markX: 905,
      aText: D42, bText: D43, aAlpha: 0, bAlpha: 0, aColor: T.fg, bColor: T.info, alpha: 0 });
    s.node('prod', 'panel', { x: 540, y: 1510, w: 980, h: 140, title: 'Production', titleSize: 40, titleY: 44, rows: [100], rowH: 54, keyX: 40, valueX: 300, keySize: 40, valueSize: 48, tagSize: 38, tagPad: 40,
      color: T.dim, alpha: 0, r0Key: 'live release', r0Text: 'r41', r0Tag: 'calls 0 \u00b7 not invoked', r0TagColor: T.mid });

    s.wire('send', [540, 886], [540, 934], { color: T.dim });
    s.wire('lookup', [1036, 562], [1036, 1136], { via: [[1058, 562], [1058, 1136]], color: T.dim });
    s.wire('refer', [44, 1320], [44, 632], { via: [[22, 1320], [22, 632]], color: T.dim });
    s.wire('run', [540, 1386], [540, 1434], { color: T.dim });
    for (const w of ['send', 'lookup', 'refer', 'run']) s.set(0, 'wire:' + w, 'alpha', 0, 0);
    s.set(0, 'wire:run', 'dashed', 1, 0);

    const pan = (a) => s.panOf(a);
    const LG = [540, 575], RQ = [540, 810], EX = [540, 1160], PR = [540, 1510];
    const lit = (t, w, c) => { s.set(t, 'wire:' + w, 'color', c, 0.2); s.set(t, 'wire:' + w, 'flow', 1, 0); };
    const unlit = (t, w) => { s.set(t, 'wire:' + w, 'color', T.dim, 0.4); s.set(t, 'wire:' + w, 'flow', 0, 0); };

    // ---- beat 1: the saved approval names r42; the request is now r43 (0–7) ----
    let t = 0.3;
    for (const id of ['exe', 'prod', 'cmp']) s.set(t, id, 'alpha', 1, 0.7);
    for (const w of ['send', 'lookup', 'refer', 'run']) s.set(t, 'wire:' + w, 'alpha', 1, 0.7);
    s.sfx(t + 0.2, 'ack', { note: 'C4', gain: 0.6, pan: 0 });
    t = 1.1;
    s.set(t, 'ledger', 'alpha', 1, 0.3); s.set(t, 'ledger', 'scale', 0.95, 0); s.set(t, 'ledger', 'scale', 1, 0.4, 'back');
    s.set(t, 'ledger', 'color', T.mid, 0.3); s.set(t, 'ledger', 'titleColor', T.fg, 0.3);
    s.set(t + 0.3, 'ledger', 'r0Hl', 1, 0.2); s.set(t + 0.3, 'ledger', 'r0HlColor', T.ok, 0); s.set(t + 1.6, 'ledger', 'r0Hl', 0, 0.5);
    s.sfx(t, 'store', { note: 'G5', gain: 1.0, pan: pan(LG) });
    t = 2.8;
    s.set(t, 'req', 'alpha', 1, 0.3); s.set(t, 'req', 'scale', 0.95, 0); s.set(t, 'req', 'scale', 1, 0.4, 'back');
    s.set(t, 'req', 'color', T.info, 0.3); s.set(t, 'req', 'titleColor', T.fg, 0.3); s.set(t + 1.4, 'req', 'color', T.mid, 0.5);
    s.sfx(t, 'store', { note: 'E5', gain: 1.0, pan: pan(RQ) });

    // ---- beat 2: the executor receives r43 and loads the stored approval (7–15) ----
    t = 7.0;
    lit(t, 'send', T.info);
    s.packet({ route: [[540, 880], [540, 946]], t, dur: 0.6, kind: 'chip', label: 'r43', color: T.info, size: 36 });
    s.sfx(t, 'send', { note: 'E6', pan: pan(RQ) });
    t = 7.6;
    unlit(t, 'send');
    s.set(t, 'exe', 'color', T.fg, 0.2); s.set(t, 'exe', 'titleColor', T.fg, 0.2); s.set(t, 'exe', 'glow', 0.5, 0.2); s.set(t + 0.5, 'exe', 'glow', 0, 0.6);
    s.set(t, 'exe', 'r0Reveal', 1, 0.5, 'linear');
    s.sfx(t, 'arrive', { note: 'C5', pan: pan(EX) });
    t = 8.6;
    s.set(t, 'cmp', 'bAlpha', 1, 0.3);
    s.sfx(t, 'store', { note: 'C5', gain: 0.8, pan: pan(EX) });
    t = 9.9;   // look up the saved approval for this action
    s.set(t, 'ledger', 'r0Hl', 1, 0.2); s.set(t, 'ledger', 'r0HlColor', T.ok, 0);
    lit(t, 'lookup', T.ok);
    s.packet({ route: [[1036, 562], [1058, 562], [1058, 1136], [1036, 1136]], t, dur: 1.2, kind: 'dot', color: T.ok });
    s.sfx(t, 'send', { note: 'G6', gain: 0.9, pan: 0.6 });
    t = 11.1;
    unlit(t, 'lookup'); s.set(t, 'ledger', 'r0Hl', 0, 0.5);
    s.set(t, 'cmp', 'aAlpha', 1, 0.3);
    s.sfx(t, 'arrive', { note: 'C4', pan: pan(EX) });
    t = 12.3;  // action and target are unchanged
    s.set(t, 'exe', 'r0Hl', 1, 0.2); s.set(t, 'exe', 'r0HlColor', T.ok, 0); s.set(t + 1.0, 'exe', 'r0Hl', 0, 0.5);
    s.set(t, 'exe', 'r0Tag', 'same', 0); s.set(t, 'exe', 'r0TagColor', T.ok, 0);
    s.sfx(t, 'ack', { note: 'C5', gain: 1.1, pan: pan(EX) });

    // ---- beat 3: the full identifiers do not match; the executor blocks (15–25) ----
    t = 15.0;
    s.set(t, 'cmp', 'scan', 1, 2.6, 'linear');
    for (let k = 0; k < 9; k++) s.sfx(t + k * 0.3, 'work', { note: 'C4', gain: 0.75, pan: pan([430 + k * 50, 1172]) });
    t = 17.9;
    s.set(t, 'cmp', 'mark', 'ne', 0); s.set(t, 'cmp', 'markPop', 0, 0); s.set(t, 'cmp', 'markPop', 1, 0.35);
    s.set(t, 'exe', 'r1Text', 'BLOCKED', 0); s.set(t, 'exe', 'r1Color', T.bad, 0); s.set(t, 'exe', 'r1Size', 52, 0);
    s.set(t, 'exe', 'r1Tag', 'artifact changed', 0); s.set(t, 'exe', 'r1TagColor', T.bad, 0);
    s.set(t, 'exe', 'r1Hl', 1, 0.15); s.set(t, 'exe', 'r1HlColor', T.bad, 0);
    s.set(t, 'exe', 'color', T.bad, 0.1); s.set(t, 'exe', 'glow', 0.8, 0.1); s.set(t + 0.4, 'exe', 'glow', 0, 0.6);
    s.shake(t, 'exe', 8, 0.4);
    s.sfx(t, 'thump', { note: 'C3', gain: 1.3, pan: pan(EX) });
    t = 19.0;
    s.set(t, 'req', 'r0Tag', 'blocked', 0); s.set(t, 'req', 'r0TagColor', T.bad, 0); s.set(t, 'req', 'r1Color', T.mid, 0.4);
    s.sfx(t, 'ack', { note: 'E4', gain: 0.9, pan: pan(RQ) });
    t = 20.3;  // nothing runs
    s.ripple(t, [540, 1410], T.mid, { r0: 10, r1: 44, dur: 0.9, mark: 'x' });
    s.set(t, 'wire:run', 'color', T.mid, 0.2); s.set(t + 0.9, 'wire:run', 'color', T.dim, 0.5);
    s.sfx(t, 'closed', { pan: 0 });
    t = 21.4;
    s.set(t, 'prod', 'r0Hl', 1, 0.2); s.set(t, 'prod', 'r0HlColor', T.mid, 0); s.set(t + 1.1, 'prod', 'r0Hl', 0, 0.5);
    s.sfx(t, 'ack', { note: 'C4', gain: 0.8, pan: pan(PR) });

    // ---- beat 4: review the actual r43 artifact; do not reuse r42's approval (25–36) ----
    t = 25.0;
    s.set(t, 'exe', 'r1Hl', 0, 0.4); s.set(t, 'exe', 'color', T.mid, 0.5);
    lit(t, 'refer', T.accent);
    s.packet({ route: [[44, 1320], [22, 1320], [22, 632], [44, 632]], t, dur: 1.4, kind: 'dot', color: T.accent });
    s.sfx(t, 'send', { note: 'C6', gain: 0.9, pan: -0.6 });
    t = 26.4;
    unlit(t, 'refer');
    s.set(t, 'ledger', 'r1Alpha', 1, 0.3);
    s.set(t, 'ledger', 'r1Hl', 1, 0.2); s.set(t, 'ledger', 'r1HlColor', T.accent, 0);
    s.sfx(t, 'arrive', { note: 'G5', gain: 1.0, pan: pan(LG) });
    t = 27.8;  // the r42 record is unchanged and separate
    s.set(t, 'ledger', 'r0Hl', 1, 0.3); s.set(t, 'ledger', 'r0HlColor', T.ok, 0);
    s.sfx(t, 'ack', { note: 'G4', gain: 0.9, pan: pan(LG) });

    s.fade(34.0, 1, 1.2);
    s.meta.duration = 35.6;

    s.sound('closed', { base: 196, gain: 0.32, echo: { delay: 0.09, feedback: 0.25, repeats: 1 },
      layers: [{ type: 'tone', wave: 'sine', ratio: 1, attack: 0.004, decay: 0.12, gain: 1, harmonics: [0.3] },
               { type: 'noise', lp: 900, attack: 0.002, decay: 0.05, gain: 0.25 }] });
  },
});
