/* Cache-aside, lesson 01: Read the source (motion-v2).
 * One mechanism: with no cache, each request reads the database (the source of record).
 * The database looks up the key and returns a copy of revision 1; its saved row stays in place.
 * A second request repeats the same lookup, and the source-read counter reaches 2.
 * Times are authored at speed 1 and are illustrative, not measured latency.
 */
FlowVideo.scene({
  meta: { title: '', subtitle: '', duration: 44.5, fps: 30, speed: 1 },
  build(s) {
    const T = s.THEME;
    const LANE_REQ = 320, LANE_COPY = 848;
    const APP_BOTTOM = 842, DB_TOP = 1068;
    const ROW0_Y = 1300, SLOT_Y = 650;

    // Title band (custom sizes so the subtitle stays readable at 350 px wide).
    s.node('title', 'label', { x: 540, y: 290, text: 'Read the source', size: 84, weight: 800, color: T.title });
    s.node('subtitle', 'label', { x: 540, y: 378, text: 'CACHE-ASIDE', size: 40, weight: 700, color: T.mid });

    // Lanes: request down on the left, returned copy up on the right.
    s.wire('req', [LANE_REQ, APP_BOTTOM], [LANE_REQ, DB_TOP]);
    s.wire('copy', [LANE_COPY, DB_TOP], [LANE_COPY, APP_BOTTOM]);
    for (const w of ['req', 'copy']) { s.set(0, 'wire:' + w, 'alpha', 0, 0); s.set(0.4, 'wire:' + w, 'alpha', 1, 0.6); }

    // Application with its runbook view (key known, record missing).
    s.node('app', 'panel', { x: 540, y: 650, w: 900, h: 360, label: 'Application', tag: 'request 1', alpha: 0 });
    s.node('slot', 'rec', { x: 540, y: SLOT_Y, w: 820, h: 100, key: 'runbook:api', val: 'rev ?', keyColor: T.mid, valColor: T.mid, dashed: 1, alpha: 0 });
    s.node('status', 'label', { x: 130, y: 772, text: 'needs the record', size: 44, mono: true, align: 'left', color: T.mid, alpha: 0 });

    // Database: the source of record, a small keyed table.
    s.node('db', 'panel', { x: 540, y: 1340, w: 900, h: 520, label: 'Database', sub: 'source of record', alpha: 0 });
    s.node('find', 'label', { x: 950, y: 1140, text: 'find runbook:api', size: 44, mono: true, weight: 700, align: 'right', color: T.accent, alpha: 0 });
    const rows = [['runbook:api', 'rev 1'], ['runbook:auth', 'rev 3'], ['runbook:search', 'rev 2']];
    rows.forEach(([k, v], i) => s.node('row' + i, 'rec', { x: 540, y: ROW0_Y + i * 108, w: 820, h: 92, key: k, val: v, color: T.mid, alpha: 0 }));

    s.node('counter', 'label', { x: 540, y: 1665, text: 'source reads: 0', size: 54, mono: true, weight: 700, color: T.fg, alpha: 0 });
    s.node('later', 'rec', { x: 540, y: 1775, w: 560, h: 86, key: 'reusable copy?', size: 44, dashed: 1, color: T.mid, keyColor: T.fg, alpha: 0 });

    const panL = s.panOf([LANE_REQ, 0]), panR = s.panOf([LANE_COPY, 0]);

    // ---- Beat 1 (0–7.5): the application needs the runbook; the database already holds it.
    for (const id of ['app', 'slot', 'status']) s.set(0.3, id, 'alpha', 1, 0.7);
    s.sfx(0.8, 'ack', { note: 'C5', pan: 0 });
    s.set(1.6, 'db', 'alpha', 1, 0.6);
    rows.forEach((_, i) => s.set(1.8 + i * 0.12, 'row' + i, 'alpha', 1, 0.5));
    s.sfx(2.2, 'ack', { note: 'G4', pan: 0 });
    s.set(2.8, 'counter', 'alpha', 1, 0.5);
    // The saved record: runbook:api at revision 1 is already in the source.
    s.pulse(3.8, 'row0', T.ok, 0.9);
    s.sfx(3.8, 'store', { note: 'G4', gain: 0.7, pan: 0 });
    // The application's view still lacks the value.
    s.set(5.4, 'slot', 'valColor', T.accent, 0.2);
    s.set(5.4, 'slot', 'color', T.accent, 0.2);
    s.set(6.6, 'slot', 'color', T.dim, 0.4);
    s.sfx(5.4, 'ack', { note: 'C5', gain: 0.8, pan: 0 });

    // One complete source read, starting at t0. Returns the time the copy lands.
    function read(t0, n) {
      // Ask: status, then the request leaves on the left lane.
      s.set(t0 + 0.4, 'status', 'text', 'reading…', 0); s.set(t0 + 0.4, 'status', 'color', T.accent, 0.2);
      s.set(t0 + 0.4, 'wire:req', 'color', T.accent, 0.3);
      // The chip starts below the application panel so it never covers the status line.
      s.packet({ route: [[LANE_REQ, APP_BOTTOM + 44], [LANE_REQ, DB_TOP - 30]], t: t0 + 0.4, dur: 1.3, kind: 'chip', label: 'read runbook:api', size: 44, color: T.accent, fade: 0.2 });
      s.sfx(t0 + 0.4, 'send', { note: 'C6', pan: panL });
      // Arrive: the database receives one more source read.
      const ta = t0 + 1.7;
      s.ripple(ta, [LANE_REQ, DB_TOP + 12], T.fg, { r1: 48, dur: 0.5 });
      s.sfx(ta, 'arrive', { note: 'G4', pan: panL });
      s.set(ta, 'wire:req', 'color', T.wire, 0.4);
      s.set(ta, 'counter', 'text', 'source reads: ' + n, 0);
      s.set(ta, 'counter', 'color', T.accent, 0.15); s.set(ta + 1.4, 'counter', 'color', T.fg, 0.5);
      s.set(ta, 'counter', 'scale', 1.12, 0.15, 'out'); s.set(ta + 0.25, 'counter', 'scale', 1, 0.35);
      s.set(ta, 'db', 'color', T.accent, 0.2);
      // Look up the key: show the key being matched, set aside the other rows.
      const tl = ta + 0.6;
      s.set(tl, 'find', 'text', 'find runbook:api', 0); s.set(tl, 'find', 'color', T.accent, 0);
      s.set(tl, 'find', 'alpha', 1, 0.3);
      s.set(tl, 'row1', 'alpha', 0.3, 0.4); s.set(tl, 'row2', 'alpha', 0.3, 0.4);
      s.sfx(tl, 'work', { note: 'G4', pan: 0.1 });
      s.set(tl + 0.7, 'row0', 'color', T.accent, 0.2);
      s.sfx(tl + 0.7, 'work', { note: 'G4', pan: 0.1 });
      // Found: the matching saved row.
      const tf = tl + 1.5;
      s.set(tf, 'row0', 'color', T.ok, 0.25);
      s.set(tf, 'find', 'text', 'found runbook:api', 0); s.set(tf, 'find', 'color', T.ok, 0.1);
      s.pulse(tf, 'row0', null, 0.6);
      s.sfx(tf, 'ack', { note: 'G5', pan: 0.1 });
      // Hold on the found row, then a copy of its value leaves; the row itself stays.
      const tc = tf + 2.6;
      s.set(tc - 0.35, 'find', 'alpha', 0, 0.3); // gone before the copy appears in that space
      s.set(tc, 'wire:copy', 'color', T.ok, 0.3);
      // The copy appears just above the matched row (whose own value stays visible) and rises.
      s.pulse(tc, 'row0', null, 0.5);
      s.packet({ route: [[LANE_COPY, ROW0_Y - 96], [LANE_COPY, DB_TOP], [LANE_COPY, APP_BOTTOM], [LANE_COPY, SLOT_Y]], t: tc, dur: 1.9, kind: 'chip', label: 'rev 1', size: 48, color: T.ok, fade: 0.25 });
      s.sfx(tc, 'send', { note: 'G5', pan: panR });
      // The source settles back to rest while the copy travels: same row, same revision.
      s.set(tc + 0.7, 'row0', 'color', T.mid, 0.5);
      s.set(tc + 0.7, 'row1', 'alpha', 1, 0.5); s.set(tc + 0.7, 'row2', 'alpha', 1, 0.5);
      s.set(tc + 0.7, 'db', 'color', T.mid, 0.5);
      // Land: the application now holds its own copy.
      const tr = tc + 1.9;
      s.ripple(tr, [LANE_COPY, SLOT_Y], T.ok, { r1: 90 });
      s.sfx(tr, 'deliver', { note: 'C5', pan: panR });
      s.set(tr, 'wire:copy', 'color', T.wire, 0.4);
      s.set(tr, 'slot', 'val', 'rev 1', 0); s.set(tr, 'slot', 'valColor', T.fg, 0.2);
      s.set(tr, 'slot', 'dashed', 0, 0); s.set(tr, 'slot', 'color', T.ok, 0.25);
      s.set(tr, 'slot', 'keyColor', T.fg, 0.25);
      s.set(tr + 0.35, 'status', 'text', 'received a copy', 0); s.set(tr + 0.35, 'status', 'color', T.ok, 0.2);
      s.sfx(tr + 0.35, 'store', { note: 'C5', gain: 0.8, pan: 0 });
      return tr;
    }

    // ---- Beat 2+3 (7.5–22): request 1 reads the source and receives revision 1.
    const land1 = read(7.5, 1); // lands at 16.0
    // Matching revision in both places: the copy equals the saved row.
    s.pulse(land1 + 2.6, 'slot', null, 0.6); s.pulse(land1 + 2.6, 'row0', null, 0.6);
    s.set(land1 + 2.6, 'row0', 'valColor', T.ok, 0.2); s.set(land1 + 3.8, 'row0', 'valColor', T.fg, 0.5);
    s.sfx(land1 + 2.6, 'ack', { note: 'C6', gain: 0.6, pan: 0 });

    // ---- Beat 4 (22–33): a second request for the same runbook starts without the record.
    const t2 = 22.0;
    s.set(t2, 'app', 'tag', 'request 2', 0); s.set(t2, 'app', 'tagColor', T.fg, 0.2);
    s.pulse(t2, 'app', null, 0.5);
    s.set(t2, 'slot', 'val', 'rev ?', 0); s.set(t2, 'slot', 'valColor', T.mid, 0.2);
    s.set(t2, 'slot', 'keyColor', T.mid, 0.2);
    s.set(t2, 'slot', 'dashed', 1, 0); s.set(t2, 'slot', 'color', T.dim, 0.25);
    s.set(t2, 'status', 'text', 'needs the record', 0); s.set(t2, 'status', 'color', T.mid, 0.2);
    s.sfx(t2, 'ack', { note: 'C5', pan: 0 });
    const land2 = read(23.6, 2); // lands at 32.1

    // ---- Beat 5 (34–44.5): the work repeated; a reusable copy is the open question.
    const te = land2 + 2.4; // 34.5
    s.set(te, 'counter', 'color', T.accent, 0.2); s.set(te, 'counter', 'scale', 1.15, 0.25, 'out');
    s.set(te + 1.2, 'counter', 'scale', 1, 0.5);
    s.pulse(te, 'row0', T.accent, 0.8);
    s.sfx(te, 'ack', { note: 'G5', pan: 0 });
    s.set(te + 2.0, 'later', 'alpha', 1, 0.6);
    s.sfx(te + 2.0, 'ack', { note: 'C4', gain: 0.6, pan: 0 });
    s.fade(43.0, 1, 1.0);
  },
});

