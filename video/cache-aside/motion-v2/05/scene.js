/* Cache-aside, lesson 05: Invalidate and refill (motion-v2).
 * One mechanism: the source is already at revision 2. The application deletes the stale cached
 * key; the next lookup misses; the application reads revision 2 from the source and stores it in
 * the cache. Each is a separate operation, recorded in order in an operations log.
 * This repairs the one stale key shown; concurrent writers are named, not played.
 * Times are authored at speed 1 and are illustrative.
 */
FlowVideo.scene({
  meta: { title: '', subtitle: '', duration: 45, fps: 30, speed: 1 },
  build(s) {
    const T = s.THEME, OFF = '#050506';
    const CX = 300, DX = 780, CARD_Y = 885, REC_Y = 925;
    const A_L = [410, 604], A_R = [670, 604], C_TOP = [CX, 752], D_TOP = [DX, 752];

    s.node('title', 'label', { x: 540, y: 285, text: 'Invalidate and refill', size: 76, weight: 800, color: T.title });
    s.node('subtitle', 'label', { x: 540, y: 368, text: 'CACHE-ASIDE', size: 40, weight: 700, color: T.mid });

    // Application at the top, linked to each store; the stores are not linked to each other.
    s.node('app', 'panel', { x: 540, y: 518, w: 560, h: 164, label: 'Application', sub: 'runbook:api', headY: 52, subGap: 62, subSize: 44, pad: 34, alpha: 0 });
    s.wire('lc', A_L, C_TOP); s.wire('ld', A_R, D_TOP);
    for (const w of ['lc', 'ld']) s.set(0, 'wire:' + w, 'alpha', 0, 0);

    // The cache entry for runbook:api and the source record.
    s.node('cache', 'panel', { x: CX, y: CARD_Y, w: 420, h: 250, label: 'Cache', tag: 'stale', tagColor: T.accent, headY: 52, pad: 30, alpha: 0 });
    s.node('ce', 'rec', { x: CX, y: REC_Y, w: 370, h: 124, key: 'rev 1', val: 'step 4', size: 48, stack: true, color: T.accent, keyColor: T.fg, valColor: T.accent, alpha: 0 });
    s.node('db', 'panel', { x: DX, y: CARD_Y, w: 420, h: 250, label: 'Database', headY: 52, pad: 30, alpha: 0 });
    s.node('de', 'rec', { x: DX, y: REC_Y, w: 370, h: 124, key: 'rev 2', val: 'step 6', size: 48, stack: true, color: T.ok, alpha: 0 });
    s.node('mark', 'label', { x: 540, y: REC_Y, text: '≠', size: 72, mono: true, weight: 700, color: T.accent, alpha: 0 });

    // Operations log: one row per separate operation, filled in order.
    s.node('log', 'panel', { x: 540, y: 1388, w: 900, h: 620, label: '', alpha: 0 });
    s.node('logh', 'label', { x: 130, y: 1124, text: 'operations', size: 44, mono: true, weight: 700, align: 'left', color: T.mid, alpha: 0 });
    const ops = ['1 db write rev 2', '2 delete cache key', '3 get cache', '4 read db', '5 set cache'];
    ops.forEach((o, i) => s.node('op' + i, 'rec', { x: 540, y: 1200 + i * 100, w: 840, h: 84, size: 44, key: o, val: '', color: T.dim, keyColor: T.fg, alpha: 0 }));
    s.node('warn', 'rec', { x: 540, y: 1770, w: 480, h: 84, size: 44, key: 'another writer?', dashed: 1, color: T.mid, keyColor: T.fg, alpha: 0 });

    const panC = s.panOf([CX, 0]), panD = s.panOf([DX, 0]);
    const opStart = (t, i) => { s.set(t, 'op' + i, 'alpha', 1, 0.3); s.set(t, 'op' + i, 'color', T.accent, 0.3); s.sfx(t, 'ack', { note: 'C6', gain: 0.6, pan: 0 }); };
    const opDone = (t, i, val, color) => { s.set(t, 'op' + i, 'val', val, 0); s.set(t, 'op' + i, 'valColor', color, 0); s.set(t, 'op' + i, 'color', T.dim, 0.4); };
    const chip = (t, from, to, label, color, dur = 1.2) => s.packet({ route: [from, to], t, dur, kind: 'chip', label, size: label.length > 6 ? 40 : 44, color, fade: 0.2 });
    // Chip endpoints sit just off each panel so chips never cover panel text.
    const L_APP = [CX + 70, 646], L_C = [CX + 10, 718], R_APP = [DX - 70, 646], R_D = [DX - 10, 718];

    // ---- Beat 1 (0–13): the source is at revision 2; delete the stale cached key.
    for (const id of ['cache', 'ce']) s.set(0.3, id, 'alpha', 1, 0.6);
    s.sfx(0.8, 'ack', { note: 'E5', pan: panC });
    for (const id of ['db', 'de', 'mark']) s.set(0.9, id, 'alpha', 1, 0.6);
    s.sfx(1.4, 'ack', { note: 'G5', pan: panD });
    for (const id of ['app', 'log', 'logh']) s.set(2.0, id, 'alpha', 1, 0.6);
    s.set(2.0, 'wire:lc', 'alpha', 1, 0.6); s.set(2.0, 'wire:ld', 'alpha', 1, 0.6);
    s.sfx(2.5, 'ack', { note: 'C5', pan: 0 });
    // Already done before this lesson: the source write.
    s.set(3.6, 'op0', 'alpha', 1, 0.3); opDone(3.6, 0, 'done', T.ok);
    s.pulse(3.6, 'de', null, 0.7);
    s.sfx(3.6, 'ack', { note: 'G5', pan: panD });

    opStart(5.6, 1);
    s.set(6.0, 'wire:lc', 'color', T.accent, 0.3);
    chip(6.0, L_APP, L_C, 'delete', T.accent);
    s.sfx(6.0, 'send', { note: 'C6', pan: panC });
    const tdel = 7.2;
    s.ripple(tdel, C_TOP, T.fg, { r1: 36, dur: 0.5 });
    s.set(tdel, 'wire:lc', 'color', T.wire, 0.4);
    // The whole entry is removed: no revision is left in the cache.
    s.set(tdel, 'ce', 'key', 'no entry', 0); s.set(tdel, 'ce', 'val', '', 0);
    s.set(tdel, 'ce', 'keyColor', T.mid, 0); s.set(tdel, 'ce', 'dashed', 1, 0); s.set(tdel, 'ce', 'color', T.dim, 0.3);
    s.set(tdel, 'cache', 'tag', '', 0);
    s.set(tdel, 'mark', 'text', '·', 0); s.set(tdel, 'mark', 'color', T.mid, 0);
    s.sfx(tdel, 'poof', { note: 'E5', pan: panC });
    s.set(8.2, 'wire:lc', 'color', T.ok, 0.3);
    chip(8.2, L_C, L_APP, 'ok', T.ok, 1.0);
    s.sfx(8.2, 'send', { note: 'E6', gain: 0.7, pan: panC });
    s.set(9.2, 'wire:lc', 'color', T.wire, 0.4);
    opDone(9.2, 1, 'deleted', T.ok);
    s.sfx(9.2, 'ack', { note: 'C5', pan: 0 });

    // ---- Beat 2 (13–19.5): the next cache lookup misses.
    opStart(13.0, 2);
    s.set(13.4, 'wire:lc', 'color', T.accent, 0.3);
    chip(13.4, L_APP, L_C, 'runbook:api', T.accent);
    s.sfx(13.4, 'send', { note: 'C6', pan: panC });
    s.ripple(14.6, C_TOP, T.fg, { r1: 36, dur: 0.5 });
    s.set(14.6, 'wire:lc', 'color', T.wire, 0.4);
    s.set(14.6, 'cache', 'color', T.accent, 0.2);
    s.sfx(14.6, 'arrive', { note: 'E5', pan: panC });
    s.set(15.2, 'ce', 'color', T.accent, 0.2); s.set(15.2, 'ce', 'keyColor', T.accent, 0.2);
    s.sfx(15.2, 'miss', { gain: 2.2, pan: panC });
    s.set(16.0, 'wire:lc', 'color', T.accent, 0.3);
    chip(16.0, L_C, L_APP, 'none', T.accent);
    s.sfx(16.0, 'send', { note: 'E6', gain: 0.7, pan: panC });
    s.set(16.6, 'cache', 'color', T.mid, 0.5); s.set(16.6, 'ce', 'color', T.dim, 0.5); s.set(16.6, 'ce', 'keyColor', T.mid, 0.5);
    s.set(17.2, 'wire:lc', 'color', T.wire, 0.4);
    opDone(17.2, 2, 'miss', T.accent);
    s.sfx(17.2, 'deliver', { note: 'C4', gain: 0.7, pan: panC });

    // ---- Beat 3 (19.5–27.5): read the source; the application uses revision 2.
    opStart(19.5, 3);
    s.set(19.9, 'wire:ld', 'color', T.accent, 0.3);
    chip(19.9, R_APP, R_D, 'runbook:api', T.accent);
    s.sfx(19.9, 'send', { note: 'C6', pan: panD });
    s.ripple(21.1, D_TOP, T.fg, { r1: 36, dur: 0.5 });
    s.set(21.1, 'wire:ld', 'color', T.wire, 0.4);
    s.set(21.1, 'db', 'color', T.accent, 0.2);
    s.sfx(21.1, 'arrive', { note: 'G5', pan: panD });
    s.pulse(21.7, 'de', null, 0.6);
    s.sfx(21.7, 'ack', { note: 'G5', pan: panD });
    s.set(22.5, 'wire:ld', 'color', T.ok, 0.3);
    chip(22.5, R_D, R_APP, 'rev 2', T.ok);
    s.sfx(22.5, 'send', { note: 'G6', pan: panD });
    s.set(23.1, 'db', 'color', T.mid, 0.5);
    s.set(23.7, 'wire:ld', 'color', T.wire, 0.4);
    s.set(23.7, 'app', 'sub', 'uses rev 2', 0); s.set(23.7, 'app', 'subColor', T.ok, 0.2);
    s.pulse(23.7, 'app', null, 0.5);
    opDone(23.7, 3, 'rev 2', T.ok);
    s.sfx(23.7, 'deliver', { note: 'C5', pan: panD });
    // The application has revision 2; the cache still has no entry.
    s.pulse(25.4, 'ce', T.accent, 0.7);
    s.sfx(25.4, 'ack', { note: 'E4', gain: 0.6, pan: panC });

    // ---- Beat 4 (27.5–33.5): store the new copy in the cache.
    opStart(27.5, 4);
    s.set(27.9, 'wire:lc', 'color', T.ok, 0.3);
    chip(27.9, L_APP, L_C, 'set rev 2', T.ok);
    s.sfx(27.9, 'send', { note: 'C6', pan: panC });
    const tf = 29.1;
    s.ripple(tf, C_TOP, T.ok, { r1: 36, dur: 0.5 });
    s.set(tf, 'wire:lc', 'color', T.wire, 0.4);
    s.set(tf, 'ce', 'key', 'rev 2', 0); s.set(tf, 'ce', 'val', 'step 6', 0);
    s.set(tf, 'ce', 'keyColor', T.fg, 0); s.set(tf, 'ce', 'valColor', T.fg, 0);
    s.set(tf, 'ce', 'dashed', 0, 0); s.set(tf, 'ce', 'color', T.ok, 0.25);
    s.pulse(tf, 'ce', null, 0.6);
    s.sfx(tf, 'store', { note: 'E5', pan: panC });
    s.set(30.0, 'wire:lc', 'color', T.ok, 0.3);
    chip(30.0, L_C, L_APP, 'ok', T.ok, 1.0);
    s.sfx(30.0, 'send', { note: 'E6', gain: 0.7, pan: panC });
    s.set(31.0, 'wire:lc', 'color', T.wire, 0.4);
    opDone(31.0, 4, 'stored', T.ok);
    s.sfx(31.0, 'ack', { note: 'C5', pan: 0 });
    // The copies agree again.
    s.set(32.0, 'mark', 'text', '=', 0); s.set(32.0, 'mark', 'color', T.ok, 0);
    s.set(32.0, 'mark', 'scale', 1.2, 0.2, 'out'); s.set(32.25, 'mark', 'scale', 1, 0.3);
    s.pulse(32.0, 'ce', null, 0.8); s.pulse(32.0, 'de', null, 0.8);
    s.sfx(32.0, 'chime', { note: 'E5', gain: 0.5, pan: 0 });

    // ---- Beat 5 (34.5–45): this repaired one key; concurrent writes still need care.
    s.set(34.5, 'warn', 'alpha', 1, 0.6);
    s.sfx(34.5, 'ack', { note: 'C4', gain: 0.6, pan: 0 });
    s.fade(43.0, 1, 1.0);
  },
});
