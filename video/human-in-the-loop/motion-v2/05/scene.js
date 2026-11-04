/* Human-in-the-loop — motion-v2 lesson 05: Record the outcome.
 * One mechanism (a sequence diagram): in a new run where A is approved, the executor checks the approval and
 * its own permission, then sends one deploy request with key k7. Production applies A (effects 1), but the
 * reply is lost when the executor crashes, so the record still says "unknown". After the restart the executor
 * retries with the same key; the deploy API recognises k7 and answers "already done" without touching
 * production. A health check observes "ok · A", and only then does the record store the result, separately
 * from the approval.
 * Render from the repository root (pinned puppeteer-core from root node_modules):
 *   node video/human-in-the-loop/motion-v2/05/engine/render.mjs video/human-in-the-loop/motion-v2/05/scene.js video/human-in-the-loop/motion-v2/05/video.mp4 --sheet video/human-in-the-loop/motion-v2/05/scratch/contact-sheet.png
 * Local engine copy: 'panel', 'txt' (reveal, hl, hlH, bar, strike), 'tick', 'arrow', chip size, meta.subtitleSize.
 */
FlowVideo.scene({
  meta: { title: 'Human in the loop', subtitle: 'RECORD THE OUTCOME', subtitleSize: 38, duration: 42, fps: 30, speed: 1 },
  build(s) {
    const T = s.THEME;
    const show = (t, id, d = 0.3) => s.set(t, id, 'alpha', 1, d);
    const flash = (t, id, color, hold = 0.6) => { s.set(t, id, 'hlColor', color, 0); s.set(t, id, 'hl', 1, 0.15); s.set(t + hold, id, 'hl', 0, 0.4); };
    const txt = (id, x, y, text, o = {}) => s.node(id, 'txt', Object.assign({ x, y, text, size: 38, mono: true, color: T.fg, alpha: 0, hlH: 48 }, o));
    const setText = (t, id, text, color) => { s.set(t, id, 'text', text, 0); if (color) s.set(t, id, 'color', color, 0); };
    const XE = 180, XA = 560, XP = 920;

    txt('runlab', 540, 470, 'new run · release A approved', { size: 36, color: T.mid, align: 'center' });

    // ---- lifeline headers and their live state ----
    s.node('hE', 'box', { x: XE, y: 548, w: 260, h: 76, label: 'executor', labelSize: 38, color: T.dim, labelColor: T.mid });
    s.node('hA', 'box', { x: XA, y: 548, w: 260, h: 76, label: 'deploy API', labelSize: 38, color: T.dim, labelColor: T.mid });
    s.node('hP', 'box', { x: XP, y: 548, w: 260, h: 76, label: 'production', labelSize: 38, color: T.dim, labelColor: T.mid });
    txt('e1', 52, 628, 'approved A', { hlW: 228 }); s.node('k1', 'tick', { x: 318, y: 625, r: 13, color: T.ok });
    txt('e2', 52, 676, 'may deploy', { hlW: 228 }); s.node('k2', 'tick', { x: 318, y: 673, r: 13, color: T.ok });
    txt('e3', 52, 724, 'key k7', { color: T.accent, hlW: 140 });
    txt('a1', XA, 628, 'keys —', { align: 'center', color: T.mid, hlW: 170 });
    txt('p1', XP, 628, 'run prev', { align: 'center', hlW: 200 });
    txt('p2', XP, 676, 'effects 0', { align: 'center', hlW: 220 });

    // lifelines
    [['le', XE], ['la', XA], ['lp', XP]].forEach(([id, x]) => { s.wire(id, [x, 760], [x, 1335]); s.set(0, 'wire:' + id, 'alpha', 0, 0); s.set(0, 'wire:' + id, 'dashed', 1, 0); });
    s.wire('crashSeg', [XE, 905], [XE, 1010]); s.set(0, 'wire:crashSeg', 'alpha', 0, 0);

    // ---- messages (arrow + label), top to bottom ----
    const M = [
      ['m1', XE, XA, 815, 'deploy A · k7', T.fg],
      ['m2', XA, XP, 885, 'apply A', T.fg],
      ['m3', XA, XE, 955, 'applied', T.fg],
      ['m4', XE, XA, 1100, 'deploy A · k7', T.accent],
      ['m5', XA, XE, 1170, 'already done', T.fg],
      ['m6', XE, XP, 1240, 'health?', T.fg],
      ['m7', XP, XE, 1310, 'ok · A', T.ok],
    ];
    M.forEach(([id, x1, x2, y, label, c]) => {
      s.node(id, 'arrow', { x: (x1 + x2) / 2, y, x1, x2, color: c });
      const lx = id === 'm6' || id === 'm7' ? (id === 'm6' ? 370 : 740) : (x1 + x2) / 2;
      txt(id + 'L', lx, y - 26, label, { size: 36, align: 'center', color: c, hlW: label.length * 21.6 });
    });
    s.node('crashX', 'tick', { x: XE, y: 955, r: 22, shape: 'x', color: T.bad });
    txt('restart', 200, 1030, 'restart', { size: 36, color: T.mid });

    // ---- outcome record ----
    s.node('rec', 'panel', { x: 540, y: 1605, w: 960, h: 390, title: 'OUTCOME · A', status: 'unknown', statusColor: T.accent, color: T.dim, titleColor: T.mid });
    const RW = [['target', 'checkout · production', T.fg], ['approved', 'R1', T.ok], ['effects', '—', T.mid], ['observed', 'unknown', T.accent]];
    const RY = [1522, 1582, 1642, 1702];
    RW.forEach(([k, v, c], i) => { txt('rk' + i, 100, RY[i], k, { size: 40, color: T.mid }); txt('rv' + i, 330, RY[i], v, { size: 40, weight: 700, color: c, hlW: 520 }); });

    // a message: chip travels, arrow draws, label shows
    const send = (t, id, dur, note, pan, chip = true) => {
      const m = M.find((x) => x[0] === id);
      s.set(t, id, 'draw', 1, dur, 'inOut');
      if (chip) s.packet({ route: [[m[1], m[3]], [m[2], m[3]]], t, dur, kind: 'chip', label: m[4], color: m[5], size: 30 });
      show(t + dur, id + 'L', 0.2);
      if (note) s.sfx(t, 'send', { note, gain: 0.9, pan });
    };

    // ==== Beat 1: a separate run; approval and permission are checked (0–8) ====
    let t = 0.5;
    show(t, 'runlab');
    for (const h of ['hE', 'hA', 'hP']) { s.set(t, h, 'color', T.mid, 0.3); s.set(t, h, 'labelColor', T.fg, 0.3); }
    for (const l of ['le', 'la', 'lp']) s.set(t, 'wire:' + l, 'alpha', 1, 0.4);
    show(t, 'a1'); show(t, 'p1'); show(t, 'p2');
    s.sfx(t, 'arrive', { note: 'C5', gain: 0.8, pan: 0 });
    t = 1.6; show(t, 'e1'); s.set(t + 0.3, 'k1', 'draw', 1, 0.3, 'out'); s.sfx(t + 0.3, 'ack', { note: 'D5', gain: 1.3, pan: -0.6 });
    t = 2.5; show(t, 'e2'); s.set(t + 0.3, 'k2', 'draw', 1, 0.3, 'out'); s.sfx(t + 0.3, 'ack', { note: 'D5', gain: 1.3, pan: -0.6 });
    t = 3.4; show(t, 'e3'); flash(t, 'e3', T.accent, 0.7); s.set(t, 'hE', 'color', T.fg, 0.2); s.sfx(t, 'store', { note: 'G5', pan: -0.6 });
    t = 4.6;    // the record exists before anything runs: approved, result unknown
    s.set(t, 'rec', 'color', T.mid, 0.3); s.set(t, 'rec', 'titleColor', T.fg, 0.3);
    RW.forEach((r, i) => { show(t + i * 0.15, 'rk' + i); show(t + i * 0.15, 'rv' + i); });
    flash(t + 0.6, 'rv3', T.accent, 0.8);
    s.sfx(t, 'store', { note: 'A5', gain: 0.9, pan: 0 });

    // ==== Beat 2: perform once; a restart must not repeat the effect (8–22) ====
    send(8.0, 'm1', 0.8, 'G6', -0.3);
    t = 8.8; setText(t, 'a1', 'seen k7', T.accent); flash(t, 'a1', T.accent, 0.6); s.set(t, 'hA', 'color', T.fg, 0.2);
    s.sfx(t, 'arrive', { note: 'E5', pan: 0 }); s.sfx(t + 0.2, 'store', { note: 'E5', gain: 0.8, pan: 0 });
    send(9.6, 'm2', 0.8, 'E6', 0.3);
    t = 10.4;
    setText(t, 'p1', 'run A', T.ok); setText(t, 'p2', 'effects 1', T.fg); flash(t, 'p2', T.fg, 0.7);
    s.set(t, 'hP', 'color', T.fg, 0.2);
    s.sfx(t, 'arrive', { note: 'C4', pan: 0.6 }); s.sfx(t + 0.2, 'store', { note: 'C4', pan: 0.6 });
    t = 11.4;   // the reply heads back... and the executor crashes before it arrives
    s.set(t, 'm3', 'draw', 0.82, 0.6, 'linear');
    s.packet({ route: [[XA, 955], [250, 955]], t, dur: 0.6, kind: 'chip', label: 'applied', color: T.fg, size: 30 });
    t = 12.0;
    s.set(t, 'hE', 'color', T.bad, 0.08); s.set(t, 'hE', 'labelColor', T.bad, 0.08); s.shake(t, 'hE', 12, 0.45);
    s.set(t, 'wire:crashSeg', 'alpha', 1, 0.05); s.set(t, 'wire:crashSeg', 'color', T.bad, 0);
    s.set(t, 'crashX', 'draw', 1, 0.25, 'out');
    s.set(t, 'm3', 'color', T.bad, 0.2); show(t, 'm3L', 0.2); s.set(t, 'm3L', 'color', T.bad, 0); s.set(t + 0.3, 'm3L', 'strike', 1, 0.4, 'linear');
    for (const id of ['e1', 'e2', 'e3', 'k1', 'k2']) s.set(t, id, 'alpha', 0.35, 0.2);
    s.sfx(t, 'crash', { gain: 0.7, pan: -0.6 }); s.sfx(t + 0.2, 'poof', { gain: 0.5, pan: -0.6 });
    t = 13.4;   // production has the effect; the record still does not know
    flash(t, 'p2', T.fg, 1.0); flash(t + 0.5, 'rv3', T.accent, 1.0);
    s.sfx(t + 0.5, 'ack', { note: 'A4', gain: 1.3, pan: 0 });
    t = 15.6;   // restart
    s.set(t, 'hE', 'color', T.fg, 0.6); s.set(t, 'hE', 'labelColor', T.fg, 0.6);
    s.set(t, 'wire:crashSeg', 'alpha', 0, 0.6); s.set(t, 'crashX', 'alpha', 0.3, 0.6);
    for (const id of ['e1', 'e2', 'e3', 'k1', 'k2']) s.set(t, id, 'alpha', 1, 0.4);
    show(t, 'restart');
    s.sfx(t, 'recover', { gain: 0.8, pan: -0.6 });
    t = 16.6; flash(t, 'e3', T.accent, 0.8);
    send(17.2, 'm4', 0.8, 'G6', -0.3);
    t = 18.0; flash(t, 'a1', T.accent, 0.9); s.sfx(t, 'hit', { note: 'E5', gain: 0.8, pan: 0 });
    send(18.8, 'm5', 0.8, null);
    t = 19.6; s.sfx(t, 'arrive', { note: 'G5', pan: -0.6 });
    t = 20.4; flash(t, 'p2', T.fg, 1.0); s.sfx(t, 'ack', { note: 'C4', gain: 1.3, pan: 0.6 });

    // ==== Beat 3: observe and record, tied to A (24–31) ====
    send(24.0, 'm6', 1.0, 'G6', 0);
    send(25.4, 'm7', 1.0, null);
    t = 26.4; s.sfx(t, 'deliver', { note: 'C5', pan: -0.6 });
    t = 27.4;
    setText(t, 'rv2', '1 · key k7', T.fg); flash(t, 'rv2', T.fg, 0.8); s.sfx(t, 'store', { note: 'A5', pan: 0 });
    t = 28.3;
    setText(t, 'rv3', 'ok · A running', T.ok); flash(t, 'rv3', T.ok, 0.8);
    s.set(t, 'rec', 'status', 'recorded', 0); s.set(t, 'rec', 'statusColor', T.ok, 0);
    s.sfx(t, 'store', { note: 'A5', pan: 0 });

    // ==== Beat 4: approval and successful execution are different facts (32–42) ====
    t = 32.0; flash(t, 'e1', T.ok, 1.0); flash(t, 'rv1', T.ok, 1.0); s.sfx(t, 'ack', { note: 'D5', gain: 1.3, pan: -0.3 });
    t = 33.6; flash(t, 'p2', T.fg, 1.0); flash(t, 'm7L', T.ok, 1.0); flash(t, 'rv3', T.ok, 1.0); s.sfx(t, 'ack', { note: 'C4', gain: 1.3, pan: 0.3 });
    t = 35.0; flash(t, 'm3L', T.bad, 0.8);

    s.fade(40.0, 1, 1.0);
    s.meta.duration = 42.0;
  },
});
