/* Idempotency — "Same step, same key" (variant: fable)
 * Authored for Engineering Fieldnotes by anthropic/claude-fable-5-1 (reasoning: high), 2026-10-19.
 * Lesson: an agent's side-effecting tool call can succeed while its response is lost. A blind retry
 * repeats the side effect (a second ticket). A stable key for the logical step, stored by the tool
 * with the first result, lets the retry return that result instead of acting twice.
 * All times are authored at speed 1. Text on screen is limited to node labels, chips and badges.
 */
FlowVideo.scene({
  meta: { title: 'Idempotency', subtitle: 'SAME STEP, SAME KEY', duration: 30, fps: 30, speed: 1 },
  build(s) {
    const T = s.THEME;
    const X = 540;
    // ---------- stage ----------
    const agent = s.node('agent', 'box', { x: X, y: 640, w: 420, h: 150, label: 'Agent', labelSize: 40, sublabel: 'step 1', subSize: 30, subMono: true });
    s.node('tool', 'box', { x: X, y: 1010, w: 420, h: 150, label: 'Ticket tool', labelSize: 40 });
    s.node('tickets', 'store', { x: X, y: 1420, w: 640, rows: 3, rowH: 58, textSize: 40, label: 'Tickets', sublabel: '0 tickets', subSize: 46 });
    s.node('outcome', 'badge', { x: X, y: 1745, text: '', size: 34, scale: 1 });
    s.node('clock', 'clock', { x: 210, y: 640, r: 38, alpha: 0, time: 0 });
    s.node('wait', 'badge', { x: 210, y: 640, text: '', color: T.bad, size: 32, scale: 1 });
    s.node('key', 'badge', { x: 880, y: 640, text: '', color: T.accent, size: 32, scale: 1 });
    s.wire('up', 'agent.bottom', 'tool.top');
    s.wire('down', 'tool.bottom', 'tickets.top');
    // Edited by gpt-6-astra comparative review: explicit playback rewind, not rollback.
    s.node('rewind', 'rewind', { x: 540, y: 960, size: 100, alpha: 0, overlay: true });
    const LOST = [X, 812];            // where the response dies on the wire
    const ROW_X = X + 230;            // ripple anchor inside a row, clear of its text
    const rowY = (i) => 1305 + 22 + i * 70 + 29; // store row centres (store top 1305, pad 22, rowH 58 + gap 12)

    // ---------- sounds ----------
    s.sound('lost', { base: 'E4', gain: 0.75, layers: [
      { type: 'tone', wave: 'sine', ratio: 1, glideTo: 0.55, glide: 0.3, attack: 0.003, decay: 0.32, gain: 0.6, harmonics: [1, 0.2] },
      { type: 'tone', wave: 'sine', freq: 60, glideTo: 36, glide: 0.3, attack: 0.002, decay: 0.32, gain: 0.8 } ] });
    s.sound('rewind', { base: 'C4', gain: 0.22, layers: [
      { type: 'noise', lp: 1600, lpTo: 200, attack: 0.02, decay: 0.45, gain: 0.5 },
      { type: 'tone', wave: 'sine', ratio: 2, glideTo: 0.5, glide: 0.45, attack: 0.01, decay: 0.4, gain: 0.3, harmonics: [1, 0.2] } ] });

    // ---------- helpers (every helper carries its sound) ----------
    const SEND = { agent: 'C6', tool: 'G6' };
    const ARRIVE = { tool: 'E5' };
    function request(t, label, color) {
      s.pulse(t, 'agent');
      s.packet({ route: ['agent.bottom', 'tool.top'], t, dur: 0.55, kind: 'chip', label, color, size: 32 });
      s.sfx(t, 'send', { note: SEND.agent, gain: 1.3 });
      s.pulse(t + 0.55, 'tool');
      s.sfx(t + 0.55, 'arrive', { note: ARRIVE.tool });
      return t + 0.55;
    }
    function write(t, row, text, ticketsText) {
      s.packet({ route: ['tool.bottom', 'tickets.top'], t, dur: 0.4, kind: 'dot', color: T.fg });
      s.sfx(t, 'send', { note: SEND.tool, gain: 1.6 });
      const a = t + 0.4;
      s.set(a, 'tickets', 'row' + row + 'Text', text, 0);
      s.set(a, 'tickets', 'row' + row + 'Color', T.ok, 0.2);
      s.set(a, 'tickets', 'row' + row + 'Alpha', 1, 0.15);
      s.ripple(a, [ROW_X, rowY(row)], T.ok, { r0: 10, r1: 60, dur: 0.55 });
      s.sfx(a, 'store', { note: 'G5', gain: 1.1 });
      s.set(a + 0.1, 'tickets', 'sublabel', ticketsText, 0);
      s.set(a + 0.1, 'tickets', 'subColor', T.fg, 0);
      s.set(a + 0.9, 'tickets', 'row' + row + 'Color', T.mid, 0.5);
      return a;
    }
    function respond(t, label, sound) {
      s.packet({ route: ['tool.top', 'agent.bottom'], t, dur: 0.55, kind: 'chip', label, color: T.ok, size: 32 });
      s.sfx(t, 'send', { note: 'E6', gain: 0.8 });
      const a = t + 0.55;
      s.pulse(a, 'agent', T.ok, 0.6);
      s.ripple(a, 'agent.top', T.ok, { r0: 10, r1: 56, dur: 0.6, mark: 'check' });
      s.sfx(a, sound || 'deliver', { note: 'C6' });
      return a;
    }
    function lose(t) {
      // Response leaves the tool and dies on the wire; the agent waits, then times out.
      s.packet({ route: ['tool.top', LOST], t, dur: 0.36, kind: 'chip', label: '#502', color: T.ok, size: 32, ease: 'out' });
      s.sfx(t, 'send', { note: 'E6', gain: 0.8 });
      const d = t + 0.36;
      s.ripple(d, LOST, T.bad, { r0: 14, r1: 90, dur: 0.7, mark: 'x' });
      s.sfx(d, 'lost', {});
      s.set(d, 'wire:up', 'color', T.bad, 0.2);
      s.set(d, 'wire:up', 'dashed', 1, 0);
      // clock spins at the agent while it waits
      const c = d + 0.15;
      s.set(c, 'clock', 'alpha', 1, 0.25);
      s.set(c, 'clock', 'time', 0, 0);
      s.set(c, 'clock', 'time', 1.0, 1.9, 'linear');
      [0.1, 0.65, 1.1, 1.45, 1.7].forEach((o) => s.sfx(c + o, 'clock', { gain: 1.4, pan: s.panOf('clock') }));
      const to = c + 2.0;
      s.set(to, 'clock', 'alpha', 0, 0.15);
      s.set(to, 'wait', 'text', 'TIMEOUT', 0);
      s.set(to, 'wait', 'scale', 0.4, 0);
      s.set(to, 'wait', 'scale', 1, 0.3, 'back');
      s.sfx(to, 'miss', { note: 'E4', gain: 1.9, pan: s.panOf('wait') });
      s.pulse(to, 'agent', T.bad, 0.5);
      return to;
    }
    function retryStart(t) {
      s.set(t, 'wait', 'text', '', 0);
      s.set(t, 'wire:up', 'color', T.wire, 0.25);
      s.set(t, 'wire:up', 'dashed', 0, 0);
    }
    function popOutcome(t, textValue, color, sound, note) {
      s.set(t, 'outcome', 'text', textValue, 0);
      s.set(t, 'outcome', 'color', color, 0);
      s.set(t, 'outcome', 'scale', 0.4, 0);
      s.set(t, 'outcome', 'scale', 1, 0.35, 'back');
      s.sfx(t, sound, { note });
    }

    // ---------- open from black (loop boundary) ----------
    s.set(0, 'stage', 'veil', 1, 0);
    s.set(0.1, 'stage', 'veil', 0, 0.6);

    // ---------- Beat 1 · normal: one step, one ticket (1.2–5.0) ----------
    let t = request(1.2, 'create ticket', T.fg);
    t = write(t + 0.25, 0, '#501', '1 ticket');
    t = respond(t + 0.3, '#501');

    // ---------- Beat 2 · response lost (5.0–10.9) ----------
    s.set(5.0, 'agent', 'sublabel', 'step 2', 0);
    s.pulse(5.0, 'agent', T.accent, 0.4);
    s.sfx(5.0, 'ack', { note: 'G6', gain: 1.2 });
    t = request(5.6, 'create ticket', T.fg);
    t = write(t + 0.25, 1, '#502', '2 tickets');
    t = lose(t + 0.3);                 // ≈ 7.7 lost, ≈ 9.85 TIMEOUT

    // ---------- Beat 3 · blind retry makes a duplicate (10.9–16.0) ----------
    const r1 = t + 1.1;
    retryStart(r1);
    t = request(r1 + 0.1, 'create ticket', T.accent);
    t = write(t + 0.25, 2, '#503', '3 tickets');
    t = respond(t + 0.3, '#503');
    const dup = t + 0.6;
    s.set(dup, 'tickets', 'row1Color', T.bad, 0.15);
    s.set(dup, 'tickets', 'row2Color', T.bad, 0.15);
    s.set(dup, 'tickets', 'subColor', T.bad, 0.15);
    s.set(dup, 'tickets', 'color', T.bad, 0.15);
    s.shake(dup, 'tickets', 16, 0.5);
    s.ripple(dup, 'tickets', T.bad, { r0: 40, r1: 260, dur: 0.8 });
    s.sfx(dup, 'crash', { gain: 1.0 });
    popOutcome(dup + 0.25, 'DUPLICATE', T.bad, 'thump', 'E4');

    // ---------- rewind to step 2 with a key (16.0–17.5) ----------
    const rw = dup + 2.4;
    s.fade(rw, 1, 0.5);
    s.set(rw, 'rewind', 'alpha', 1, 0.2);
    s.set(rw, 'rewind', 'offset', 45, 0);
    s.set(rw, 'rewind', 'offset', -45, 1.0, 'linear');
    s.set(rw + 1.0, 'rewind', 'alpha', 0, 0.3);
    s.sfx(rw, 'rewind', {});
    const dark = rw + 0.6;
    s.set(dark, 'tickets', 'row1Text', '', 0);
    s.set(dark, 'tickets', 'row2Text', '', 0);
    s.set(dark, 'tickets', 'row1Color', T.dim, 0);
    s.set(dark, 'tickets', 'row2Color', T.dim, 0);
    s.set(dark, 'tickets', 'color', T.mid, 0);
    s.set(dark, 'tickets', 'sublabel', '1 ticket', 0);
    s.set(dark, 'tickets', 'subColor', T.fg, 0);
    s.set(dark, 'outcome', 'text', '', 0);
    s.fade(dark + 0.2, 0, 0.5);
    s.sfx(dark + 0.2, 'recover', { gain: 0.7 });

    // ---------- Beat 4 · keyed request, response lost again (17.5–23.3) ----------
    const k0 = dark + 0.9;
    s.set(k0, 'key', 'text', 'key s2', 0);
    s.set(k0, 'key', 'scale', 0.4, 0);
    s.set(k0, 'key', 'scale', 1, 0.35, 'back');
    s.sfx(k0, 'ack', { note: 'G6', gain: 1.3, pan: s.panOf('key') });
    s.pulse(k0, 'agent', T.accent, 0.4);
    t = request(k0 + 0.7, 'create · key s2', T.accent);
    t = write(t + 0.25, 1, '#502  key s2', '2 tickets');
    t = lose(t + 0.3);

    // ---------- Beat 5 · same key again → same ticket (23.3–28.8) ----------
    const r2 = t + 1.1;
    retryStart(r2);
    s.pulse(r2, 'key');
    s.sfx(r2, 'ack', { note: 'G6', gain: 1.3, pan: s.panOf('key') });
    t = request(r2 + 0.2, 'create · key s2', T.accent);
    // lookup instead of a write: the keyed row lights up, nothing new is stored
    s.packet({ route: ['tool.bottom', 'tickets.top'], t: t + 0.25, dur: 0.4, kind: 'dot', color: T.accent });
    s.sfx(t + 0.25, 'send', { note: SEND.tool, gain: 1.6 });
    const hitT = t + 0.65;
    s.set(hitT, 'tickets', 'row1Color', T.ok, 0.15);
    s.set(hitT, 'tickets', 'row1TextColor', T.ok, 0.15);
    s.ripple(hitT, [ROW_X, rowY(1)], T.ok, { r0: 12, r1: 80, dur: 0.6, mark: 'check' });
    s.sfx(hitT, 'hit', { note: 'E6' });
    t = respond(hitT + 0.35, '#502', 'chime');
    const same = t + 0.6;
    s.set(same, 'tickets', 'subColor', T.ok, 0.15);
    s.set(same, 'tickets', 'color', T.ok, 0.15);
    s.ripple(same, 'tickets', T.ok, { r0: 40, r1: 220, dur: 0.8 });
    popOutcome(same, 'SAME TICKET', T.ok, 'chime', 'E6');

    // ---------- close to black (loop boundary) ----------
    const end = same + 2.7;
    s.fade(end, 1, 0.6);
    s.sfx(end, 'rewind', { gain: 0.5 });
    s.meta.duration = Math.ceil((end + 0.9) * 10) / 10;
  },
});

