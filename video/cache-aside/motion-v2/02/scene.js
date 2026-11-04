/* Cache-aside, lesson 02: A cache hit (motion-v2).
 * One mechanism: the application checks the cache first; the requested key is present (a hit),
 * the cache returns its copy of revision 1, and the database is not read.
 * A hit proves the key was found, not that the copy is current.
 * Times are authored at speed 1 and are illustrative, not measured latency.
 */
FlowVideo.scene({
  meta: { title: '', subtitle: '', duration: 35, fps: 30, speed: 1 },
  build(s) {
    const T = s.THEME;
    const LP = 200, RP = 880;          // cache path (left) and source path (right)
    const APP_BOTTOM = 806, STORE_TOP = 1004;

    s.node('title', 'label', { x: 540, y: 290, text: 'A cache hit', size: 84, weight: 800, color: T.title });
    s.node('subtitle', 'label', { x: 540, y: 378, text: 'CACHE-ASIDE', size: 40, weight: 700, color: T.mid });

    // Two paths below the application: 1 check the cache, 2 read the source.
    s.wire('pc', [LP, APP_BOTTOM], [LP, STORE_TOP]);
    s.wire('pd', [RP, APP_BOTTOM], [RP, STORE_TOP]);
    for (const w of ['pc', 'pd']) { s.set(0, 'wire:' + w, 'alpha', 0, 0); s.set(0.4, 'wire:' + w, 'alpha', 1, 0.6); }
    s.node('ord1', 'label', { x: 405, y: 905, text: '1 check', size: 44, mono: true, weight: 700, align: 'left', color: T.mid, alpha: 0 });
    s.node('ord2', 'label', { x: 850, y: 905, text: '2 source', size: 44, mono: true, weight: 700, align: 'right', color: T.mid, alpha: 0 });

    // Application: knows the key, lacks the record.
    s.node('app', 'panel', { x: 540, y: 630, w: 900, h: 340, label: 'Application', alpha: 0 });
    s.node('slot', 'rec', { x: 540, y: 620, w: 820, h: 100, key: 'runbook:api', val: 'rev ?', keyColor: T.mid, valColor: T.mid, dashed: 1, alpha: 0 });
    s.node('status', 'label', { x: 130, y: 738, text: 'needs the record', size: 44, mono: true, align: 'left', color: T.mid, alpha: 0 });
    s.node('cur', 'label', { x: 950, y: 738, text: 'current?', size: 44, mono: true, weight: 700, align: 'right', color: T.accent, alpha: 0 });

    // Cache: a separate store of reusable copies (already holding runbook:api).
    s.node('cache', 'panel', { x: 285, y: 1225, w: 490, h: 430, label: 'Cache', sub: 'reusable copies', headY: 56, subGap: 54, subSize: 40, pad: 34, alpha: 0 });
    s.node('c0', 'rec', { x: 285, y: 1230, w: 430, h: 120, key: 'runbook:api', val: 'rev 1', size: 44, stack: true, color: T.mid, alpha: 0 });
    s.node('c1', 'rec', { x: 285, y: 1365, w: 430, h: 120, key: 'runbook:ops', val: 'rev 4', size: 44, stack: true, color: T.mid, alpha: 0 });
    s.node('hit', 'label', { x: 285, y: 1505, text: 'HIT · key found', size: 44, mono: true, weight: 700, color: T.ok, alpha: 0 });

    // Database: the source of record, unread in this lookup (its revisions are not observed).
    s.node('db', 'panel', { x: 795, y: 1225, w: 490, h: 430, label: 'Database', sub: 'source of record', headY: 56, subGap: 54, subSize: 40, pad: 34, color: T.dim, labelColor: T.mid, alpha: 0 });
    s.node('d0', 'rec', { x: 795, y: 1230, w: 430, h: 120, key: 'runbook:api', val: 'rev ?', size: 44, stack: true, color: T.dim, keyColor: T.mid, valColor: T.mid, alpha: 0 });
    s.node('d1', 'rec', { x: 795, y: 1365, w: 430, h: 120, key: 'runbook:ops', val: 'rev ?', size: 44, stack: true, color: T.dim, keyColor: T.mid, valColor: T.mid, alpha: 0 });
    s.node('reads', 'label', { x: 795, y: 1505, text: 'source reads: 0', size: 44, mono: true, weight: 700, color: T.fg, alpha: 0 });

    const panC = s.panOf([LP, 0]), panD = s.panOf([RP, 0]);

    // ---- Beat 1 (0–8): a cache holds a reusable copy; the application checks it first.
    for (const id of ['app', 'slot', 'status']) s.set(0.3, id, 'alpha', 1, 0.7);
    s.sfx(0.8, 'ack', { note: 'C5', pan: 0 });
    for (const id of ['cache', 'c0', 'c1']) s.set(1.6, id, 'alpha', 1, 0.6);
    s.sfx(2.1, 'ack', { note: 'E5', pan: panC });
    for (const id of ['db', 'd0', 'd1', 'reads']) s.set(2.8, id, 'alpha', 1, 0.6);
    s.sfx(3.3, 'ack', { note: 'G5', gain: 0.55, pan: panD });  // the only database cue
    // The copy is already in the cache.
    s.pulse(4.4, 'c0', T.ok, 0.9);
    s.sfx(4.4, 'store', { note: 'E5', gain: 0.7, pan: panC });
    // Cache-aside order: check the cache first; the source is step 2.
    s.set(5.8, 'ord1', 'alpha', 1, 0.3); s.set(5.8, 'ord1', 'color', T.accent, 0.3);
    s.set(5.8, 'ord2', 'alpha', 1, 0.3);
    s.set(5.8, 'wire:pc', 'color', T.mid, 0.4);
    s.sfx(5.8, 'ack', { note: 'C6', gain: 0.6, pan: panC });

    // ---- Beat 2 (8.4–15.5): look up the key in the cache; it is present.
    const t0 = 8.4;
    s.set(t0, 'status', 'text', 'checking cache', 0); s.set(t0, 'status', 'color', T.accent, 0.2);
    s.set(t0, 'wire:pc', 'color', T.accent, 0.3);
    s.packet({ route: [[LP, APP_BOTTOM + 44], [LP, STORE_TOP - 30]], t: t0, dur: 1.3, kind: 'chip', label: 'runbook:api', size: 40, color: T.accent, fade: 0.2 });
    s.sfx(t0, 'send', { note: 'C6', pan: panC });
    const ta = t0 + 1.3;  // 9.7
    s.ripple(ta, [LP, STORE_TOP + 6], T.fg, { r1: 36, dur: 0.5 });
    s.sfx(ta, 'arrive', { note: 'E5', pan: panC });
    s.set(ta, 'wire:pc', 'color', T.mid, 0.4);
    s.set(ta, 'cache', 'color', T.accent, 0.2);
    // Compare keys: the other entry steps back; the matching key lights.
    s.set(ta + 0.6, 'c1', 'alpha', 0.3, 0.4);
    s.set(ta + 0.6, 'c0', 'color', T.accent, 0.2);
    s.set(ta + 0.6, 'c0', 'keyColor', T.accent, 0.2);
    s.sfx(ta + 0.6, 'work', { note: 'E5', pan: panC });
    const th = ta + 1.4;  // 11.1
    s.set(th, 'c0', 'color', T.ok, 0.2); s.set(th, 'c0', 'keyColor', T.fg, 0.2);
    s.set(th, 'hit', 'alpha', 1, 0.15); s.set(th, 'hit', 'scale', 1.15, 0.15, 'out'); s.set(th + 0.2, 'hit', 'scale', 1, 0.3);
    s.pulse(th, 'c0', null, 0.6);
    s.sfx(th, 'hit', { note: 'E5', pan: panC });

    // ---- Beat 3 (15.5–24): the cache returns revision 1; no database read.
    const tc = 15.5;
    s.pulse(tc, 'c0', null, 0.5);
    s.set(tc, 'wire:pc', 'color', T.ok, 0.3);
    s.packet({ route: [[LP, STORE_TOP - 20], [LP, APP_BOTTOM + 40]], t: tc, dur: 1.3, kind: 'chip', label: 'rev 1', size: 48, color: T.ok, fade: 0.2 });
    s.sfx(tc, 'send', { note: 'E6', pan: panC });
    s.set(tc + 0.6, 'cache', 'color', T.mid, 0.5); s.set(tc + 0.6, 'c1', 'alpha', 1, 0.5);
    const tr = tc + 1.3;  // 16.8
    s.ripple(tr, [LP, APP_BOTTOM - 4], T.ok, { r1: 40, dur: 0.5 });
    s.sfx(tr, 'deliver', { note: 'C5', pan: panC });
    s.set(tr, 'wire:pc', 'color', T.mid, 0.4);
    s.set(tr, 'slot', 'val', 'rev 1', 0); s.set(tr, 'slot', 'valColor', T.fg, 0.2);
    s.set(tr, 'slot', 'dashed', 0, 0); s.set(tr, 'slot', 'color', T.ok, 0.25); s.set(tr, 'slot', 'keyColor', T.fg, 0.25);
    s.set(tr + 0.35, 'status', 'text', 'received a copy', 0); s.set(tr + 0.35, 'status', 'color', T.ok, 0.2);
    s.sfx(tr + 0.35, 'store', { note: 'C5', gain: 0.8, pan: 0 });
    s.set(tr + 0.8, 'c0', 'color', T.mid, 0.5);   // the cached row stays, back at rest
    // Step 2 never ran: the source count is still 0.
    const tz = tr + 2.2;  // 19.0
    s.set(tz, 'reads', 'color', T.ok, 0.2); s.set(tz, 'reads', 'scale', 1.12, 0.2, 'out'); s.set(tz + 0.3, 'reads', 'scale', 1, 0.4);
    s.set(tz, 'ord1', 'color', T.mid, 0.4);
    s.sfx(tz, 'ack', { note: 'C5', gain: 0.6, pan: panD });

    // ---- Beat 4 (24–35): a hit avoids this source read. Is the copy still current?
    const tq = 24.0;
    s.set(tq, 'cur', 'alpha', 1, 0.2); s.set(tq, 'cur', 'scale', 1.15, 0.2, 'out'); s.set(tq + 0.25, 'cur', 'scale', 1, 0.3);
    s.set(tq, 'slot', 'valColor', T.accent, 0.3);
    s.pulse(tq, 'd0', T.accent, 0.8);             // the source revision was never observed
    s.sfx(tq, 'ack', { note: 'C4', pan: 0 });
    s.fade(33.0, 1, 1.0);
  },
});
