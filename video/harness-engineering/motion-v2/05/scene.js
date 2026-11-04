/* Video 05 — Require a passing check (motion-v2).
 * A configured branch rule on main requires the 'access' check and one review, with bypass limited to maintainers.
 * An agent's claim ("tests pass") changes nothing; its merge request is refused at the protected branch.
 * The check then runs on the current head (d73): both cases execute and pass, so the check requirement clears.
 * The next merge request is still refused, now because review is pending. main's tip stays b10 throughout.
 *
 * Render from the repository root:
 *   node video/harness-engineering/motion-v2/05/engine/render.mjs video/harness-engineering/motion-v2/05/scene.js video/harness-engineering/motion-v2/05/video.mp4 --sheet video/harness-engineering/motion-v2/05/scratch/contact-sheet.png
 */
FlowVideo.scene({
  meta: { title: '', subtitle: '', duration: 35, fps: 30, speed: 1, veilTop: 205 },
  build(s) {
    const T = s.THEME;

    s.node('title', 'label', { x: 540, y: 112, text: 'Require a passing check', size: 72, weight: 800, color: T.title });

    // ---- the configured rule (never edited during the clip) ----
    s.node('rule', 'card', { x: 540, y: 395, w: 900, h: 310, title: 'Branch rule · main', titleSize: 40, titleColor: T.mid, color: T.mid,
      lineY: [120, 190, 260], lineSize: 46, valueX: 560, rowH: 64,
      l0Text: 'required check', l0Color: T.fg, l0Value: 'access', l0ValueColor: T.fg,
      l1Text: 'required review', l1Color: T.fg, l1Value: '1 approval', l1ValueColor: T.fg,
      l2Text: 'bypass', l2Color: T.fg, l2Value: 'maintainers', l2ValueColor: T.fg });

    // ---- the pull request's status ----
    s.node('pr', 'card', { x: 540, y: 835, w: 900, h: 470, title: 'PR #42', titleSize: 44, titleColor: T.fg, color: T.mid,
      titleTag: 'head d73', titleTagSize: 44, titleTagColor: T.fg });
    s.node('access', 'statusrow', { x: 540, y: 740, w: 800, size: 48, iconR: 24, name: 'access', value: 'no result', kind: 'empty', color: T.mid });
    s.node('case0', 'statusrow', { x: 572, y: 818, w: 736, size: 44, valueSize: 44, iconR: 20, hlH: 64, name: 'own tenant', value: '', kind: 'empty', color: T.mid, alpha: 0 });
    s.node('case1', 'statusrow', { x: 572, y: 890, w: 736, size: 44, valueSize: 44, iconR: 20, hlH: 64, name: 'other tenant', value: '', kind: 'empty', color: T.mid, alpha: 0 });
    s.node('div', 'rule', { x: 540, y: 950, w: 820 });
    s.node('review', 'statusrow', { x: 540, y: 1010, w: 800, size: 48, iconR: 24, name: 'review', value: 'pending', kind: 'empty', color: T.mid });

    // ---- the agent and its claim ----
    s.node('agent', 'disc', { x: 150, y: 1215, r: 54, glyph: 'AI', color: T.info });
    s.node('claim', 'card', { x: 610, y: 1215, w: 700, h: 110, color: T.info, alpha: 0, pad: 40,
      lineY: [55], lineSize: 48, l0Text: '"tests pass"', l0Color: T.fg });

    // ---- the protected branch ----
    s.wire('path', [150, 1269], [330, 1560], { via: [[150, 1560]] });
    s.node('main', 'card', { x: 640, y: 1560, w: 620, h: 220, title: 'main', titleSize: 48, titleColor: T.fg, color: T.mid,
      titleTag: 'tip b10', titleTagSize: 48, titleTagColor: T.fg });
    s.node('meter', 'bar', { x: 640, y: 1585, w: 540, h: 20, segments: 2, seg0Color: T.ok, seg1Color: T.ok });
    s.node('met', 'label', { x: 640, y: 1632, text: '0 of 2 met', size: 44, weight: 600, color: T.mid });
    s.node('reject', 'statusrow', { x: 640, y: 1735, w: 620, size: 46, iconR: 24, name: 'rejected', value: '', kind: 'cross', color: T.bad, nameColor: T.bad, alpha: 0 });

    const hl = (t, id, prop, color, hold = 1.0) => {
      s.set(t, id, prop + 'Color', color, 0); s.set(t, id, prop, 1, 0.2); s.set(t + hold, id, prop, 0, 0.5);
    };
    // A merge request leaves the agent and reaches the protected branch, which refuses it and names the unmet requirement.
    const attempt = (t0, color, reason, amp, gain) => {
      s.pulse(t0, 'agent', null, 0.6);
      s.set(t0, 'wire:path', 'flow', 1, 0.1); s.set(t0, 'wire:path', 'color', T.mid, 0.1);
      s.packet({ route: [[150, 1269], [150, 1560], [178, 1560]], t: t0, dur: 1.2, kind: 'chip', size: 44, label: 'merge #42', color: T.fg });
      s.sfx(t0, 'send', { note: 'G6', gain: 0.9, pan: s.panOf([150, 0]) });
      const ta = t0 + 1.2;
      s.set(ta, 'wire:path', 'flow', 0, 0.2); s.set(ta, 'wire:path', 'color', T.wire, 0.4);
      s.shake(ta, 'main', amp, 0.45);
      s.set(ta, 'main', 'color', color, 0); s.set(ta + 0.5, 'main', 'color', T.mid, 0.6);
      s.ripple(ta, [330, 1560], color, { r0: 10, r1: 44, dur: 0.6 });
      s.set(ta, 'reject', 'color', color, 0); s.set(ta, 'reject', 'nameColor', color, 0);
      s.set(ta, 'reject', 'value', reason, 0); s.set(ta, 'reject', 'valueColor', color, 0);
      s.set(ta, 'reject', 'alpha', 1, 0.2);
      s.sfx(ta, 'thump', { gain, pan: s.panOf([330, 0]) });
      return ta;
    };

    // ---- beat 1 (0–7): the rule is configured before anyone acts ----
    s.pulse(0.8, 'rule', null, 0.6);
    hl(1.4, 'rule', 'l0Hl', T.accent, 0.5); s.sfx(1.4, 'ack', { note: 'C5', gain: 1.2 });
    hl(2.5, 'rule', 'l1Hl', T.accent, 0.5); s.sfx(2.5, 'ack', { note: 'E5', gain: 1.2 });
    hl(3.6, 'rule', 'l2Hl', T.accent, 0.9); s.sfx(3.6, 'ack', { note: 'G5', gain: 1.2 });

    // ---- beat 2 (7–16): a claim moves nothing; the merge request is refused at main ----
    s.pulse(7.0, 'agent', null, 0.6);
    s.set(7.0, 'claim', 'alpha', 1, 0.4);
    s.sfx(7.0, 'send', { note: 'C6', gain: 0.9, pan: s.panOf([610, 0]) });
    s.packet({ route: [[610, 1160], [610, 1110]], t: 8.3, dur: 0.6, kind: 'chip', size: 42, label: 'tests pass', color: T.info, ease: 'out' });
    s.ripple(8.9, [610, 1072], T.mid, { r0: 10, r1: 50, dur: 0.6 });
    s.set(8.9, 'access', 'hlColor', T.mid, 0); s.set(8.9, 'access', 'hl', 1, 0.15); s.set(9.5, 'access', 'hl', 0, 0.5);
    s.sfx(8.9, 'miss', { gain: 1.6, pan: s.panOf([610, 0]) });
    s.set(10.3, 'claim', 'alpha', 0.35, 0.6);
    let ta = attempt(11.0, T.bad, 'needs access', 12, 1.5);
    hl(ta + 0.3, 'rule', 'l0Hl', T.bad, 1.4); hl(ta + 0.3, 'access', 'hl', T.bad, 1.4);
    s.sfx(ta + 0.3, 'ack', { note: 'C5', gain: 1.0 });
    hl(ta + 1.0, 'rule', 'l2Hl', T.accent, 1.0); s.sfx(ta + 1.0, 'ack', { note: 'G5', gain: 0.9 });
    s.set(15.4, 'reject', 'alpha', 0, 0.5);
    s.set(15.4, 'claim', 'alpha', 0, 0.5);

    // ---- beat 3 (16.5–26): the check executes on the current head ----
    let t = 16.5;
    s.set(t, 'pr', 'titleTagColor', T.accent, 0.2); s.set(t + 1.0, 'pr', 'titleTagColor', T.fg, 0.5);
    s.set(t, 'access', 'kind', 'spin', 0); s.set(t, 'access', 'color', T.accent, 0);
    s.set(t, 'access', 'value', 'running · d73', 0); s.set(t, 'access', 'valueColor', T.accent, 0);
    s.sfx(t, 'arrive', { note: 'C5', gain: 1.0 });
    s.set(t + 0.5, 'case0', 'alpha', 1, 0.4); s.set(t + 0.5, 'case1', 'alpha', 1, 0.4);
    const runCase = (t0, id) => {
      s.set(t0, id, 'kind', 'spin', 0); s.set(t0, id, 'color', T.accent, 0); s.set(t0, id, 'nameColor', T.fg, 0);
      for (let k = 0; k < 4; k++) s.sfx(t0 + 0.2 + k * 0.5, 'work', { note: 'E4', gain: 0.8 });
      s.set(t0 + 2.2, id, 'kind', 'tick', 0); s.set(t0 + 2.2, id, 'color', T.ok, 0);
      s.set(t0 + 2.2, id, 'value', 'pass', 0); s.set(t0 + 2.2, id, 'valueColor', T.ok, 0);
      s.sfx(t0 + 2.2, 'ack', { note: 'E5', gain: 1.1 });
    };
    runCase(17.6, 'case0');
    runCase(20.6, 'case1');
    t = 23.8;   // the check result is set only after both cases finish
    s.set(t, 'access', 'kind', 'tick', 0); s.set(t, 'access', 'color', T.ok, 0);
    s.set(t, 'access', 'value', 'passed · d73', 0); s.set(t, 'access', 'valueColor', T.ok, 0);
    s.set(t, 'rule', 'l0ValueColor', T.ok, 0.3);
    s.set(t, 'meter', 'seg0', 0.5, 0.5);
    s.set(t, 'met', 'text', '1 of 2 met', 0); s.set(t, 'met', 'color', T.fg, 0.3);
    s.sfx(t, 'chime', { note: 'E5', gain: 1.0 });

    // ---- beat 4 (27–37): only that requirement cleared; review still blocks ----
    ta = attempt(27.0, T.accent, 'needs review', 7, 0.8);
    hl(ta + 0.3, 'rule', 'l1Hl', T.accent, 1.6); hl(ta + 0.3, 'review', 'hl', T.accent, 1.6);
    s.sfx(ta + 0.3, 'ack', { note: 'E5', gain: 1.0 });
    s.set(ta + 0.3, 'review', 'color', T.accent, 0.3); s.set(ta + 0.3, 'review', 'valueColor', T.accent, 0.3);
    s.fade(32.6, 1, 1.0);
    s.meta.duration = 35;
  },
});

