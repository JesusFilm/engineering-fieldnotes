/* Agent evals — motion-v2 lesson 02: Check actual behavior.
 * One mechanism: the agent's "Bug fixed" claim never reaches the observed cell. The grader runs the patched
 * login() on a known input (empty password), the code returns "rejected", that output is set beside the
 * expected value written beforehand, the match is marked pass, and that one observation is recorded.
 * The other required case stays not run.
 * Render from the repository root (pinned puppeteer-core from root node_modules):
 *   node video/agent-evals/motion-v2/02/engine/render.mjs video/agent-evals/motion-v2/02/scene.js video/agent-evals/motion-v2/02/video.mp4 --sheet video/agent-evals/motion-v2/02/scratch/contact-sheet.png
 * The local engine copy adds general 'panel', 'txt' and 'tick' node types, chip text size and meta.subtitleSize.
 */
FlowVideo.scene({
  meta: { title: 'Agent evals', subtitle: 'CHECK ACTUAL BEHAVIOR', subtitleSize: 38, duration: 34.6, fps: 30, speed: 1 },
  build(s) {
    const T = s.THEME;
    const pan = (a) => s.panOf(a);
    const show = (t, id, d = 0.3) => s.set(t, id, 'alpha', 1, d);
    const flash = (t, id, color, hold = 0.6) => { s.set(t, id, 'hlColor', color, 0); s.set(t, id, 'hl', 1, 0.15); s.set(t + hold, id, 'hl', 0, 0.4); };

    // ---- the agent's claim ----
    s.node('claim', 'panel', { x: 540, y: 560, w: 920, h: 190, title: 'AGENT SAYS', color: T.dim, titleColor: T.mid });
    s.node('claimTxt', 'txt', { x: 120, y: 618, text: '"Bug fixed"', size: 56, weight: 650, color: T.fg, reveal: 0 });
    s.wire('claimLine', [80, 560], [40, 1040], { via: [[40, 560]] });
    s.set(0, 'wire:claimLine', 'dashed', 1, 0); s.set(0, 'wire:claimLine', 'alpha', 0, 0);
    s.node('block', 'tick', { x: 40, y: 1080, r: 20, shape: 'x', color: T.mid });

    // ---- the probe: a known input and the patched code ----
    s.node('input', 'panel', { x: 250, y: 905, w: 340, h: 250, title: 'INPUT', color: T.dim, titleColor: T.mid });
    s.node('inKey', 'txt', { x: 120, y: 905, text: 'password', size: 40, mono: true, color: T.mid, alpha: 0 });
    s.node('inVal', 'txt', { x: 120, y: 985, text: '""', size: 60, mono: true, weight: 700, color: T.accent, alpha: 0 });
    s.node('inNote', 'txt', { x: 220, y: 985, text: 'empty', size: 38, color: T.mid, alpha: 0 });
    s.node('code', 'panel', { x: 750, y: 905, w: 500, h: 250, title: 'CODE · P1', color: T.dim, titleColor: T.mid });
    s.node('fn', 'txt', { x: 540, y: 912, text: 'login()', size: 54, mono: true, weight: 700, color: T.mid, alpha: 0 });
    s.node('fnState', 'txt', { x: 540, y: 990, text: 'idle', size: 40, mono: true, color: T.mid, alpha: 0, hlW: 192 });
    s.wire('feed', [250, 774], [750, 774], { via: [[250, 735], [750, 735]] });
    s.wire('out', [870, 1036], [870, 1124]);

    // ---- the check: expected (written first) against observed (from running the code) ----
    s.node('check', 'panel', { x: 540, y: 1290, w: 920, h: 320, title: 'CHECK · EMPTY PASSWORD', status: 'not run', statusColor: T.mid, color: T.dim, titleColor: T.mid });
    s.node('expKey', 'txt', { x: 120, y: 1268, text: 'expected', size: 42, mono: true, color: T.mid, alpha: 0 });
    s.node('expVal', 'txt', { x: 420, y: 1268, text: 'rejected', size: 48, mono: true, weight: 700, color: T.accent, alpha: 0 });
    s.node('obsKey', 'txt', { x: 120, y: 1355, text: 'observed', size: 42, mono: true, color: T.mid, alpha: 0 });
    s.node('obsVal', 'txt', { x: 420, y: 1355, text: '—', size: 48, mono: true, weight: 700, color: T.dim, alpha: 0, hlW: 230 });
    s.node('mark', 'tick', { x: 760, y: 1312, r: 26 });

    // ---- the record ----
    s.node('rec', 'panel', { x: 540, y: 1655, w: 920, h: 250, title: 'RECORD · P1', color: T.dim, titleColor: T.mid });
    s.node('rec1', 'txt', { x: 120, y: 1655, text: 'empty password  —', size: 44, mono: true, color: T.mid, hlW: 528 });
    s.node('rec2', 'txt', { x: 120, y: 1727, text: 'valid password  not run', size: 44, mono: true, color: T.dim, hlW: 607 });
    s.wire('save', [790, 1456], [790, 1584]);

    // ==== Beat 1: a statement is not the behavior (0–9) ====
    let t = 0.6;
    s.set(t, 'claim', 'color', T.mid, 0.3); s.set(t, 'claim', 'titleColor', T.fg, 0.3);
    s.set(t, 'claimTxt', 'reveal', 1, 0.9, 'linear');
    s.sfx(t, 'ack', { note: 'C6', gain: 1.4, pan: 0 });
    t = 2.2;    // the expectation is written before anything runs
    s.set(t, 'check', 'color', T.mid, 0.3); s.set(t, 'check', 'titleColor', T.fg, 0.3);
    show(t, 'expKey'); show(t, 'expVal'); flash(t, 'expVal', T.accent);
    show(t + 0.4, 'obsKey'); show(t + 0.4, 'obsVal');
    s.sfx(t, 'store', { note: 'G5', pan: pan('check') });
    t = 3.4;    // the probe: an empty password and the patched code
    s.set(t, 'input', 'color', T.mid, 0.3); s.set(t, 'input', 'titleColor', T.fg, 0.3);
    show(t, 'inKey'); show(t, 'inVal'); show(t, 'inNote');
    s.sfx(t, 'store', { note: 'C5', pan: pan('input') });
    t = 4.1;
    s.set(t, 'code', 'color', T.mid, 0.3); s.set(t, 'code', 'titleColor', T.fg, 0.3);
    show(t, 'fn'); show(t, 'fnState');
    s.sfx(t, 'ack', { note: 'E5', gain: 1.3, pan: pan('code') });
    t = 5.4;    // the claim tries to reach grading and stops
    s.set(t, 'wire:claimLine', 'alpha', 1, 0.3); s.set(t, 'wire:claimLine', 'color', T.mid, 0.3);
    s.pulse(t, 'claim');
    s.packet({ route: [[80, 560], [40, 560], [40, 1040]], t, dur: 1.2, kind: 'dot', color: T.mid });
    s.ripple(t + 1.2, [40, 1080], T.mid, { r0: 14, r1: 52, dur: 0.9 });
    s.set(t + 1.2, 'block', 'draw', 1, 0.35, 'out');
    s.sfx(t + 1.2, 'miss', { gain: 0.7, pan: -0.6 });
    s.set(t + 1.2, 'obsVal', 'hlColor', T.mid, 0); s.set(t + 1.2, 'obsVal', 'hl', 1, 0.15); s.set(t + 1.9, 'obsVal', 'hl', 0, 0.4);
    s.set(t + 2.3, 'wire:claimLine', 'color', T.dim, 0.5);

    // ==== Beat 2: run the patch with an empty password (9–15) ====
    t = 9.0;
    flash(t, 'inVal', T.accent);
    s.set(t, 'wire:feed', 'color', T.accent, 0.2); s.set(t, 'wire:feed', 'flow', 1, 0);
    s.packet({ route: [[250, 774], [250, 735], [750, 735], [750, 774]], t, dur: 1.3, kind: 'chip', label: '""', color: T.accent, size: 38 });
    s.sfx(t, 'send', { note: 'C6', gain: 1.0, pan: pan('input') });
    t = 10.3;
    s.set(t, 'wire:feed', 'color', T.wire, 0.4); s.set(t, 'wire:feed', 'flow', 0, 0);
    s.set(t, 'code', 'color', T.fg, 0.2); s.set(t, 'code', 'glow', 0.6, 0.2);
    s.set(t, 'fn', 'color', T.fg, 0.2);
    s.set(t, 'fnState', 'text', 'running', 0); s.set(t, 'fnState', 'color', T.accent, 0);
    s.set(t, 'fnState', 'bar', 1, 2.2, 'linear');
    s.set(t, 'check', 'status', 'running', 0); s.set(t, 'check', 'statusColor', T.accent, 0);
    s.sfx(t, 'arrive', { note: 'E5', pan: pan('code') });
    for (const k of [0.5, 0.9, 1.3, 1.7, 2.1]) s.sfx(t + k, 'work', { note: 'E4', gain: 1.3, pan: pan('code') });
    t = 12.6;
    s.set(t, 'fnState', 'text', 'returned', 0); s.set(t, 'fnState', 'color', T.fg, 0); s.set(t, 'fnState', 'bar', 0, 0);
    s.set(t, 'code', 'glow', 0, 0.5);
    s.sfx(t, 'ack', { note: 'E5', gain: 1.5, pan: pan('code') });

    // ==== Beat 3: the empty password is rejected; this test passes (14–24) ====
    t = 14.0;
    s.set(t, 'wire:out', 'color', T.fg, 0.2); s.set(t, 'wire:out', 'flow', 1, 0);
    s.packet({ route: [[870, 1050], [870, 1112]], t, dur: 0.8, kind: 'chip', label: 'rejected', color: T.fg, size: 36 });
    s.sfx(t, 'send', { note: 'E6', gain: 1.0, pan: pan('code') });
    t = 14.8;
    s.set(t, 'wire:out', 'color', T.wire, 0.4); s.set(t, 'wire:out', 'flow', 0, 0);
    s.set(t, 'code', 'color', T.mid, 0.4); s.set(t, 'fn', 'color', T.mid, 0.4);
    s.set(t, 'obsVal', 'text', 'rejected', 0); s.set(t, 'obsVal', 'color', T.fg, 0);
    flash(t, 'obsVal', T.fg);
    s.set(t, 'check', 'status', 'observed', 0); s.set(t, 'check', 'statusColor', T.fg, 0);
    s.sfx(t, 'deliver', { note: 'E5', gain: 1.2, pan: pan('check') });
    // compare: expected, then observed, then the pair
    t = 17.8;
    flash(t, 'expVal', T.accent, 2.4); s.sfx(t, 'ack', { note: 'G5', gain: 1.3, pan: pan('check') });
    flash(t + 0.7, 'obsVal', T.accent, 1.7); s.sfx(t + 0.7, 'ack', { note: 'G5', gain: 1.3, pan: pan('check') });
    t = 19.2;
    s.set(t, 'mark', 'draw', 1, 0.35, 'out');
    s.set(t, 'obsVal', 'color', T.ok, 0.2);
    s.set(t, 'check', 'status', 'pass', 0); s.set(t, 'check', 'statusColor', T.ok, 0);
    s.set(t, 'check', 'color', T.ok, 0.3);
    s.sfx(t, 'hit', { note: 'G5', gain: 1.0, pan: pan('mark') });

    // ==== Beat 4: record the observation; other cases still need testing (22.5–34.6) ====
    t = 22.5;
    s.set(t, 'wire:save', 'color', T.ok, 0.2); s.set(t, 'wire:save', 'flow', 1, 0);
    s.packet({ route: [[790, 1456], [790, 1584]], t, dur: 0.8, kind: 'chip', label: 'pass', color: T.ok, size: 36 });
    s.sfx(t, 'send', { note: 'G6', gain: 1.0, pan: pan([790, 0]) });
    t = 23.3;
    s.set(t, 'wire:save', 'color', T.wire, 0.4); s.set(t, 'wire:save', 'flow', 0, 0);
    s.set(t, 'rec', 'color', T.mid, 0.3); s.set(t, 'rec', 'titleColor', T.fg, 0.3);
    s.set(t, 'rec1', 'text', 'empty password  pass', 0); s.set(t, 'rec1', 'color', T.ok, 0);
    flash(t, 'rec1', T.ok);
    s.sfx(t, 'store', { note: 'A5', pan: pan('rec') });
    t = 24.8;   // the other required case has no observation
    flash(t, 'rec2', T.mid, 0.8);
    s.sfx(t, 'ack', { note: 'C4', gain: 1.4, pan: pan('rec') });
    t = 26.1;   // the claim recedes; the evidence stays
    s.set(t, 'claim', 'alpha', 0.4, 0.8); s.set(t, 'claimTxt', 'alpha', 0.4, 0.8); s.set(t, 'wire:claimLine', 'alpha', 0.35, 0.8); s.set(t, 'block', 'alpha', 0.4, 0.8);
    s.sfx(t, 'ack', { note: 'C6', gain: 0.8, pan: 0 });
    t = 27.3;   // one observed result on the record
    s.set(t, 'mark', 'color', T.ok, 0); s.pulse(t, 'check');
    flash(t, 'rec1', T.ok, 0.9);
    s.sfx(t, 'chime', { note: 'A5', gain: 0.7, pan: 0 });

    s.fade(32.6, 1, 1.0);
    s.meta.duration = 34.6;
  },
});
