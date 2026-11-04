/* Intent versus permission — guardrails-and-permissions motion-v2 lesson 01.
 * One mechanism: the agent's instruction says "Do not deploy", yet it still generates a deploy request.
 * The application (outside the model) checks the request's identity, action and target against that
 * identity's grants, finds no deploy grant, and denies it. The deploy service is never called; prod stays on r41.
 * Render from the repository root:
 *   node video/guardrails-and-permissions/motion-v2/01/engine/render.mjs video/guardrails-and-permissions/motion-v2/01/scene.js video/guardrails-and-permissions/motion-v2/01/video.mp4
 * Uses the cut-local engine copy, which adds the general 'panel' node type, chip text size and title sizes.
 */
FlowVideo.scene({
  meta: { title: 'Intent vs permission', titleSize: 92, subtitle: 'ONE DENIED DEPLOY', subtitleSize: 34, subtitleSpacing: 7, duration: 39, fps: 30, speed: 1 },
  build(s) {
    const T = s.THEME;

    // ---- stage ----
    // Application boundary: everything inside runs outside the model.
    s.node('app', 'panel', { x: 540, y: 1292, w: 1000, h: 1005, noFill: true, title: 'Application \u00b7 outside the model', titleSize: 40, titleY: 0, titleGap: true, color: T.dim, titleColor: T.mid, alpha: 0 });
    // Agent: holds the instruction and generates the request.
    s.node('agent', 'panel', { x: 540, y: 575, w: 960, h: 240, title: 'Agent', titleSize: 40, titleY: 48, rows: [120, 190], rowH: 62, keyX: 40, valueX: 300, color: T.mid, titleColor: T.mid, alpha: 0,
      r0Key: 'instruction', r0Text: 'Do not deploy', r0Reveal: 0,
      r1Key: '', r1Text: 'deploy r42 \u2192 prod', r1Reveal: 0, r1Color: T.info });
    // Authorization check inside the application.
    s.node('auth', 'panel', { x: 540, y: 1145, w: 920, h: 610, title: 'Authorization check', titleSize: 40, titleY: 50, rows: [118, 186, 254, 340, 404, 472, 562], rowH: 62, keyX: 40, valueX: 260, rules: [298, 516], color: T.dim, titleColor: T.mid, alpha: 0,
      r0Key: 'identity', r0Text: 'investigator', r0Reveal: 0, r0Slot: 1,
      r1Key: 'action', r1Text: 'deploy', r1Reveal: 0, r1Slot: 1,
      r2Key: 'target', r2Text: 'prod', r2Reveal: 0, r2Slot: 1,
      r3Key: 'grants for investigator', r3Alpha: 0,
      r4Key: 'has', r4Text: 'read logs', r4Alpha: 0, r4Color: T.mid, r4Mark: 'check',
      r5Key: 'needs', r5Text: 'deploy prod', r5Alpha: 0, r5Color: T.bad,
      r6Key: 'result', r6Text: 'DENIED', r6Alpha: 0, r6Color: T.bad, r6Size: 52 });
    // The protected execution path.
    s.node('deploy', 'panel', { x: 540, y: 1645, w: 920, h: 230, title: 'Deploy service', titleSize: 40, titleY: 46, rows: [110, 174], rowH: 60, keyX: 40, valueX: 330, color: T.dim, titleColor: T.mid, alpha: 0,
      r0Key: 'calls', r0Text: '0', r1Key: 'live release', r1Text: 'r41' });

    s.wire('req', [860, 701], [860, 834], { color: T.dim });
    s.wire('exec', [540, 1456], [540, 1524], { color: T.dim });
    s.set(0, 'wire:req', 'alpha', 0, 0); s.set(0, 'wire:exec', 'alpha', 0, 0);
    s.set(0, 'wire:exec', 'dashed', 1, 0);

    const pan = (id) => s.panOf(id);
    const AGENT = [540, 575], AUTH = [540, 1145], DEP = [540, 1645];

    // ---- beat 1: the agent is told not to deploy (0–5.5) ----
    let t = 0.3;
    for (const id of ['app', 'auth', 'deploy']) s.set(t, id, 'alpha', 1, 0.7);
    s.set(t, 'wire:req', 'alpha', 1, 0.7); s.set(t, 'wire:exec', 'alpha', 1, 0.7);
    s.sfx(t + 0.2, 'ack', { note: 'C5', gain: 0.7, pan: 0 });
    t = 1.3;
    s.set(t, 'agent', 'alpha', 1, 0.3); s.set(t, 'agent', 'scale', 0.94, 0); s.set(t, 'agent', 'scale', 1, 0.4, 'back');
    s.sfx(t, 'ack', { note: 'E5', gain: 0.9, pan: pan(AGENT) });
    t = 2.1;
    s.set(t, 'agent', 'r0Reveal', 1, 0.9, 'linear');
    s.set(t, 'agent', 'r0Hl', 1, 0.2); s.set(t + 1.4, 'agent', 'r0Hl', 0, 0.6);
    s.sfx(t, 'arrive', { note: 'E5', pan: pan(AGENT) });

    // ---- beat 2: it still generates a deploy request, which the application checks (5.5–15) ----
    t = 5.5;
    s.set(t, 'agent', 'r1Key', 'request', 0);
    s.set(t, 'agent', 'r1Reveal', 1, 1.1, 'linear');
    s.set(t, 'agent', 'r1Hl', 1, 0.2); s.set(t, 'agent', 'r1HlColor', T.info, 0);
    s.set(t, 'agent', 'color', T.fg, 0.2); s.set(t + 1.4, 'agent', 'color', T.mid, 0.5);
    s.sfx(t, 'store', { note: 'E5', gain: 0.9, pan: pan(AGENT) });
    t = 8.5;
    s.set(t, 'agent', 'r1Hl', 0, 0.5);
    s.set(t, 'wire:req', 'color', T.info, 0.2); s.set(t, 'wire:req', 'flow', 1, 0);
    s.packet({ route: [[860, 728], [860, 828]], t, dur: 1.1, kind: 'chip', label: 'deploy r42', color: T.info, size: 38 });
    s.sfx(t, 'send', { note: 'E6', pan: pan([860, 760]) });
    t = 9.6;
    s.set(t, 'wire:req', 'color', T.dim, 0.4); s.set(t, 'wire:req', 'flow', 0, 0);
    s.set(t, 'auth', 'color', T.fg, 0.2); s.set(t, 'auth', 'glow', 0.6, 0.2); s.set(t + 0.5, 'auth', 'glow', 0, 0.6);
    s.set(t, 'auth', 'titleColor', T.fg, 0.2);
    s.ripple(t, [860, 840], T.fg, { r0: 10, r1: 60 });
    s.sfx(t, 'arrive', { note: 'C5', pan: pan([860, 840]) });
    // the inspector fills one attribute at a time
    [[0, 10.5], [1, 11.7], [2, 12.9]].forEach(([i, tc]) => {
      const r = 'r' + i;
      s.set(tc, 'auth', r + 'Slot', 0, 0.2);
      s.set(tc, 'auth', r + 'Reveal', 1, 0.45, 'linear');
      s.set(tc, 'auth', r + 'Hl', 1, 0.15); s.set(tc, 'auth', r + 'HlColor', T.fg, 0);
      s.set(tc + 0.9, 'auth', r + 'Hl', 0, 0.4);
      s.sfx(tc, 'ack', { note: 'C6', gain: 1.2, pan: pan(AUTH) });
    });
    s.set(10.5, 'auth', 'r0Tag', 'from session', 0);

    // ---- beat 3: no deploy grant, so authorization denies (15–22.5) ----
    t = 15.0;
    s.set(t, 'auth', 'r3Alpha', 1, 0.4); s.set(t, 'auth', 'r4Alpha', 1, 0.4);
    s.set(t, 'auth', 'r5Slot', 1, 0.4);
    s.set(t + 0.2, 'auth', 'r4MarkPop', 1, 0.4);
    s.sfx(t, 'store', { note: 'C5', gain: 0.8, pan: pan(AUTH) });
    // lookup: compare the request (deploy prod) with each grant
    t = 16.4;
    s.set(t, 'auth', 'r1Hl', 1, 0.15); s.set(t, 'auth', 'r1HlColor', T.accent, 0);
    s.set(t, 'auth', 'r2Hl', 1, 0.15); s.set(t, 'auth', 'r2HlColor', T.accent, 0);
    s.set(t, 'auth', 'r4Hl', 1, 0.15); s.set(t, 'auth', 'r4HlColor', T.accent, 0);
    s.sfx(t, 'work', { note: 'C4', gain: 1.1, pan: pan(AUTH) });
    t = 17.5;
    s.set(t, 'auth', 'r4Hl', 0, 0.3);
    s.set(t, 'auth', 'r5Hl', 1, 0.15); s.set(t, 'auth', 'r5HlColor', T.accent, 0);
    s.sfx(t, 'work', { note: 'C4', gain: 1.1, pan: pan(AUTH) });
    t = 18.5;
    s.set(t, 'auth', 'r5Alpha', 1, 0.3); s.set(t, 'auth', 'r5Slot', 0, 0.3);
    s.set(t, 'auth', 'r5Tag', 'no grant', 0); s.set(t, 'auth', 'r5TagColor', T.bad, 0);
    s.set(t, 'auth', 'r5HlColor', T.bad, 0.2);
    s.sfx(t, 'miss', { note: 'C4', gain: 0.9, pan: pan(AUTH) });
    t = 19.7;
    s.set(t, 'auth', 'r1Hl', 0, 0.3); s.set(t, 'auth', 'r2Hl', 0, 0.3);
    s.set(t, 'auth', 'r6Alpha', 1, 0.15); s.set(t, 'auth', 'r6Tag', '403', 0); s.set(t, 'auth', 'r6TagColor', T.bad, 0);
    s.set(t, 'auth', 'r6Hl', 1, 0.15); s.set(t, 'auth', 'r6HlColor', T.bad, 0);
    s.set(t, 'auth', 'color', T.bad, 0.1); s.set(t, 'auth', 'glow', 0.8, 0.1); s.set(t + 0.4, 'auth', 'glow', 0, 0.6);
    s.shake(t, 'auth', 9, 0.4);
    s.sfx(t, 'thump', { note: 'C3', gain: 1.3, pan: pan(AUTH) });

    // ---- beat 4: the denial returns; the deploy service is never called (22.5–30) ----
    t = 22.5;
    s.set(t, 'auth', 'color', T.mid, 0.6); s.set(t, 'auth', 'r5Hl', 0, 0.5); s.set(t, 'auth', 'r6Hl', 0, 0.5);
    s.set(t, 'wire:req', 'color', T.bad, 0.2); s.set(t, 'wire:req', 'flow', 1, 0);
    s.packet({ route: [[860, 828], [860, 728]], t, dur: 1.1, kind: 'chip', label: '403 denied', color: T.bad, size: 38 });
    s.sfx(t, 'send', { note: 'C6', pan: pan([860, 800]) });
    t = 23.6;
    s.set(t, 'wire:req', 'color', T.dim, 0.4); s.set(t, 'wire:req', 'flow', 0, 0);
    s.set(t, 'agent', 'r1Tag', 'denied', 0); s.set(t, 'agent', 'r1TagColor', T.bad, 0);
    s.set(t, 'agent', 'r1Color', T.mid, 0.4);
    s.pulse(t, 'agent', T.bad, 0.5);
    s.sfx(t, 'arrive', { note: 'E5', gain: 0.7, pan: pan(AGENT) });
    t = 25.2;   // the only route to the deploy service stays closed
    s.ripple(t, [540, 1490], T.mid, { r0: 10, r1: 46, dur: 0.9, mark: 'x' });
    s.set(t, 'wire:exec', 'color', T.mid, 0.2); s.set(t + 0.9, 'wire:exec', 'color', T.dim, 0.5);
    s.sfx(t, 'closed', { pan: 0 });
    [[0, 26.4, 'never called'], [1, 27.6, 'unchanged']].forEach(([i, tc, tag]) => {
      const r = 'r' + i;
      s.set(tc, 'deploy', r + 'Hl', 1, 0.2); s.set(tc, 'deploy', r + 'HlColor', T.mid, 0);
      s.set(tc, 'deploy', r + 'Tag', tag, 0);
      s.set(tc + 1.1, 'deploy', r + 'Hl', 0, 0.5);
      s.sfx(tc, 'ack', { note: 'G4', gain: 0.8, pan: pan(DEP) });
    });

    // ---- beat 5: intent in the prompt, enforcement in the application (30–39) ----
    t = 30.2;
    s.set(t, 'agent', 'r0Hl', 1, 0.3); s.set(t, 'agent', 'r0HlColor', T.mid, 0);
    s.set(t, 'agent', 'r0Tag', 'intent', 0); s.set(t, 'agent', 'r0TagColor', T.mid, 0);
    s.sfx(t, 'ack', { note: 'E6', gain: 0.8, pan: pan(AGENT) });
    t = 31.4;
    s.set(t, 'auth', 'r5Hl', 1, 0.3); s.set(t, 'auth', 'r6Hl', 1, 0.3);
    s.set(t, 'app', 'color', T.mid, 0.4); s.set(t, 'app', 'titleColor', T.fg, 0.4);
    s.sfx(t, 'ack', { note: 'C5', gain: 1.0, pan: pan(AUTH) });

    s.fade(37.0, 1, 1.2);
    s.meta.duration = 38.8;

    // A muted low click for the closed route (the deploy service itself never sounds).
    s.sound('closed', { base: 196, gain: 0.32, echo: { delay: 0.09, feedback: 0.25, repeats: 1 },
      layers: [{ type: 'tone', wave: 'sine', ratio: 1, attack: 0.004, decay: 0.12, gain: 1, harmonics: [0.3] },
               { type: 'noise', lp: 900, attack: 0.002, decay: 0.05, gain: 0.25 }] });
  },
});
