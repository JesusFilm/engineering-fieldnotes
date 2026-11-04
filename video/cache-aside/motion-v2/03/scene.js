/* Cache-aside, lesson 03: A cache miss (motion-v2).
 * One mechanism: the cache lookup finds no entry (a miss). Application code then reads the
 * database, receives revision 1, and writes that copy into the cache itself.
 * The cache never contacts the database. A miss is an absent key, not a failure.
 * Times are authored at speed 1 and are illustrative.
 */
FlowVideo.scene({
  meta: { title: '', subtitle: '', duration: 42, fps: 30, speed: 1 },
  build(s) {
    const T = s.THEME, OFF = '#050506';
    const LP = 200, RP = 880, APP_BOTTOM = 876, STORE_TOP = 1034;

    s.node('title', 'label', { x: 540, y: 290, text: 'A cache miss', size: 84, weight: 800, color: T.title });
    s.node('subtitle', 'label', { x: 540, y: 378, text: 'CACHE-ASIDE', size: 40, weight: 700, color: T.mid });

    // The application owns both links. There is no cache–database link.
    s.wire('lc', [LP, APP_BOTTOM], [LP, STORE_TOP]);
    s.wire('ld', [RP, APP_BOTTOM], [RP, STORE_TOP]);
    for (const w of ['lc', 'ld']) { s.set(0, 'wire:' + w, 'alpha', 0, 0); s.set(0.4, 'wire:' + w, 'alpha', 1, 0.6); }

    // Application: the record it needs, and its read routine with per-line results.
    s.node('app', 'panel', { x: 540, y: 665, w: 900, h: 410, label: 'Application', alpha: 0 });
    s.node('slot', 'rec', { x: 540, y: 600, w: 820, h: 90, key: 'runbook:api', val: 'rev ?', keyColor: T.mid, valColor: T.mid, dashed: 1, alpha: 0 });
    const code = ['1 get cache', '2 read db', '3 set cache'];
    code.forEach((c, i) => s.node('k' + i, 'rec', { x: 540, y: 692 + i * 62, w: 820, h: 56, size: 44, key: c, val: '', color: OFF, keyColor: T.mid, alpha: 0 }));

    // Cache: one other entry and an empty place where runbook:api would be.
    s.node('cache', 'panel', { x: 285, y: 1257, w: 490, h: 446, label: 'Cache', headY: 56, pad: 34, alpha: 0 });
    s.node('c0', 'rec', { x: 285, y: 1210, w: 430, h: 120, key: 'runbook:ops', val: 'rev 4', size: 44, stack: true, color: T.mid, alpha: 0 });
    s.node('c1', 'rec', { x: 285, y: 1346, w: 430, h: 120, key: '', val: '', size: 44, stack: true, dashed: 1, color: T.dim, keyColor: T.mid, valColor: T.accent, alpha: 0 });
    s.node('ctag', 'label', { x: 285, y: 1540, text: 'MISS · key absent', size: 44, mono: true, weight: 700, color: T.accent, alpha: 0 });

    // Database: the source of record, healthy and holding revision 1 throughout.
    s.node('db', 'panel', { x: 795, y: 1257, w: 490, h: 446, label: 'Database', headY: 56, pad: 34, alpha: 0 });
    s.node('d0', 'rec', { x: 795, y: 1210, w: 430, h: 120, key: 'runbook:api', val: 'rev 1', size: 44, stack: true, color: T.mid, alpha: 0 });
    s.node('d1', 'rec', { x: 795, y: 1346, w: 430, h: 120, key: 'runbook:ops', val: 'rev 4', size: 44, stack: true, color: T.mid, alpha: 0 });
    s.node('reads', 'label', { x: 795, y: 1540, text: 'source reads: 0', size: 44, mono: true, weight: 700, color: T.fg, alpha: 0 });

    const panC = s.panOf([LP, 0]), panD = s.panOf([RP, 0]);
    const line = (t, i, on) => {
      s.set(t, 'k' + i, 'color', on ? T.accent : OFF, 0.2);
      s.set(t, 'k' + i, 'keyColor', on ? T.fg : T.mid, 0.2);
      if (on) s.sfx(t, 'ack', { note: 'C6', gain: 0.6, pan: 0 });
    };
    const chip = (t, x, down, label, color, dur = 1.3) => s.packet({
      route: down ? [[x, APP_BOTTOM + 44], [x, STORE_TOP - 30]] : [[x, STORE_TOP - 30], [x, APP_BOTTOM + 44]],
      t, dur, kind: 'chip', label, size: label.length > 6 ? 40 : 44, color, fade: 0.2 });

    // ---- Beat 1 (0–12): get cache; the key is absent.
    for (const id of ['app', 'slot', 'k0', 'k1', 'k2']) s.set(0.3, id, 'alpha', 1, 0.7);
    s.sfx(0.8, 'ack', { note: 'C5', pan: 0 });
    for (const id of ['cache', 'c0', 'c1']) s.set(1.6, id, 'alpha', 1, 0.6);
    s.sfx(2.1, 'ack', { note: 'E5', pan: panC });
    for (const id of ['db', 'd0', 'd1', 'reads']) s.set(2.8, id, 'alpha', 1, 0.6);
    s.sfx(3.3, 'ack', { note: 'G5', pan: panD });

    line(4.4, 0, true);
    s.set(5.0, 'wire:lc', 'color', T.accent, 0.3);
    chip(5.0, LP, true, 'runbook:api', T.accent);
    s.sfx(5.0, 'send', { note: 'C6', pan: panC });
    const ta = 6.3;
    s.ripple(ta, [LP, STORE_TOP + 6], T.fg, { r1: 36, dur: 0.5 });
    s.sfx(ta, 'arrive', { note: 'E5', pan: panC });
    s.set(ta, 'wire:lc', 'color', T.wire, 0.4);
    s.set(ta, 'cache', 'color', T.accent, 0.2);
    // Look for the key: the other entry is not it; the place for runbook:api is empty.
    s.set(ta + 0.6, 'c0', 'alpha', 0.3, 0.4);
    s.set(ta + 0.6, 'c1', 'key', 'runbook:api', 0); s.set(ta + 0.6, 'c1', 'val', 'no entry', 0);
    s.set(ta + 0.6, 'c1', 'color', T.accent, 0.25);
    s.sfx(ta + 0.6, 'work', { note: 'E5', pan: panC });
    const tm = ta + 1.4;  // 7.7
    s.set(tm, 'ctag', 'alpha', 1, 0.15); s.set(tm, 'ctag', 'scale', 1.12, 0.15, 'out'); s.set(tm + 0.2, 'ctag', 'scale', 1, 0.3);
    s.sfx(tm, 'miss', { gain: 2.2, pan: panC });  // the lesson's event: audible, but not a crash
    // The miss result goes back to the application's code.
    const tn = tm + 1.0;  // 8.7
    s.set(tn, 'wire:lc', 'color', T.accent, 0.3);
    chip(tn, LP, false, 'none', T.accent);
    s.sfx(tn, 'send', { note: 'E6', gain: 0.7, pan: panC });
    s.set(tn + 0.6, 'cache', 'color', T.mid, 0.5); s.set(tn + 0.6, 'c0', 'alpha', 1, 0.5);
    s.set(tn + 0.6, 'c1', 'color', T.dim, 0.5);
    const tr1 = tn + 1.3;  // 10.0
    s.set(tr1, 'wire:lc', 'color', T.wire, 0.4);
    s.set(tr1, 'k0', 'val', 'MISS', 0); s.set(tr1, 'k0', 'valColor', T.accent, 0);
    s.sfx(tr1, 'deliver', { note: 'C4', gain: 0.7, pan: panC });

    // ---- Beat 2 (12.4–18.5): the application reads the source.
    const t2 = 12.4;
    line(t2, 0, false); line(t2, 1, true);
    s.set(t2 + 0.6, 'wire:ld', 'color', T.accent, 0.3);
    chip(t2 + 0.6, RP, true, 'runbook:api', T.accent);
    s.sfx(t2 + 0.6, 'send', { note: 'C6', pan: panD });
    const tb = t2 + 1.9;  // 14.3
    s.ripple(tb, [RP, STORE_TOP + 6], T.fg, { r1: 36, dur: 0.5 });
    s.sfx(tb, 'arrive', { note: 'G5', pan: panD });
    s.set(tb, 'wire:ld', 'color', T.wire, 0.4);
    s.set(tb, 'reads', 'text', 'source reads: 1', 0);
    s.set(tb, 'reads', 'color', T.accent, 0.15); s.set(tb + 1.4, 'reads', 'color', T.fg, 0.5);
    s.set(tb, 'reads', 'scale', 1.12, 0.15, 'out'); s.set(tb + 0.25, 'reads', 'scale', 1, 0.35);
    s.set(tb, 'db', 'color', T.accent, 0.2);
    s.set(tb + 0.6, 'd1', 'alpha', 0.3, 0.4);
    s.set(tb + 0.6, 'd0', 'color', T.accent, 0.2);
    s.sfx(tb + 0.6, 'work', { note: 'G5', pan: panD });
    s.set(tb + 1.3, 'd0', 'color', T.ok, 0.25);
    s.pulse(tb + 1.3, 'd0', null, 0.6);
    s.sfx(tb + 1.3, 'ack', { note: 'G5', pan: panD });

    // ---- Beat 3 (18.6–24.6): the database returns the record; the application receives it.
    const t3 = 18.6;
    s.pulse(t3, 'd0', null, 0.5);
    s.set(t3, 'wire:ld', 'color', T.ok, 0.3);
    chip(t3, RP, false, 'rev 1', T.ok);
    s.sfx(t3, 'send', { note: 'G6', pan: panD });
    s.set(t3 + 0.6, 'db', 'color', T.mid, 0.5); s.set(t3 + 0.6, 'd1', 'alpha', 1, 0.5); s.set(t3 + 0.6, 'd0', 'color', T.mid, 0.5);
    const t3r = t3 + 1.3;  // 19.9
    s.ripple(t3r, [RP, APP_BOTTOM - 4], T.ok, { r1: 40, dur: 0.5 });
    s.sfx(t3r, 'deliver', { note: 'C5', pan: panD });
    s.set(t3r, 'wire:ld', 'color', T.wire, 0.4);
    s.set(t3r, 'slot', 'val', 'rev 1', 0); s.set(t3r, 'slot', 'valColor', T.fg, 0.2);
    s.set(t3r, 'slot', 'dashed', 0, 0); s.set(t3r, 'slot', 'color', T.ok, 0.25); s.set(t3r, 'slot', 'keyColor', T.fg, 0.25);
    s.set(t3r, 'k1', 'val', 'rev 1', 0); s.set(t3r, 'k1', 'valColor', T.ok, 0);
    // The application has the record; the cache still has no entry.
    s.pulse(22.0, 'c1', T.accent, 0.7);
    s.sfx(22.0, 'ack', { note: 'E4', gain: 0.6, pan: panC });

    // ---- Beat 4 (25.0–31.5): the application fills the cache, and the cache confirms.
    const t4 = 25.0;
    line(t4, 1, false); line(t4, 2, true);
    s.set(t4 + 0.6, 'wire:lc', 'color', T.ok, 0.3);
    chip(t4 + 0.6, LP, true, 'set rev 1', T.ok);
    s.sfx(t4 + 0.6, 'send', { note: 'C6', pan: panC });
    const tf = t4 + 1.9;  // 26.9
    s.ripple(tf, [LP, STORE_TOP + 6], T.ok, { r1: 36, dur: 0.5 });
    s.set(tf, 'wire:lc', 'color', T.wire, 0.4);
    s.set(tf, 'c1', 'val', 'rev 1', 0); s.set(tf, 'c1', 'valColor', T.fg, 0.2);
    s.set(tf, 'c1', 'keyColor', T.fg, 0.2);
    s.set(tf, 'c1', 'dashed', 0, 0); s.set(tf, 'c1', 'color', T.ok, 0.25);
    s.pulse(tf, 'c1', null, 0.6);
    s.set(tf, 'ctag', 'text', 'filled by app', 0); s.set(tf, 'ctag', 'color', T.ok, 0.2);
    s.sfx(tf, 'store', { note: 'E5', pan: panC });
    const tk = tf + 0.9;  // 27.8
    s.set(tk, 'wire:lc', 'color', T.ok, 0.3);
    chip(tk, LP, false, 'ok', T.ok, 1.1);
    s.sfx(tk, 'send', { note: 'E6', gain: 0.7, pan: panC });
    const tkr = tk + 1.1;  // 28.9
    s.set(tkr, 'wire:lc', 'color', T.wire, 0.4);
    s.set(tkr, 'k2', 'val', 'stored', 0); s.set(tkr, 'k2', 'valColor', T.ok, 0);
    s.sfx(tkr, 'ack', { note: 'C5', pan: panC });
    s.set(tkr + 0.6, 'c1', 'color', T.mid, 0.6);

    // ---- Beat 5 (31.6–42): three copies of revision 1; the cache's came from the application.
    const t5 = 31.6;
    line(t5, 2, false);
    s.sfx(t5, 'chime', { note: 'E5', gain: 0.5, pan: 0 });
    for (const id of ['slot', 'c1', 'd0']) { s.pulse(t5, id, T.ok, 0.8); s.set(t5, id, 'valColor', T.ok, 0.2); }
    s.fade(40.0, 1, 1.0);
  },
});
