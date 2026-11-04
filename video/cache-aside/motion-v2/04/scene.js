/* Cache-aside, lesson 04: A stale copy (motion-v2).
 * One mechanism: a source write and a cache change are separate operations.
 * An editor saves revision 2 to the database; nothing touches the cached key, so the cache
 * still holds revision 1. The next lookup is a successful hit that returns the old runbook.
 * Times are authored at speed 1 and are illustrative.
 */
FlowVideo.scene({
  meta: { title: '', subtitle: '', duration: 43, fps: 30, speed: 1 },
  build(s) {
    const T = s.THEME;
    const CX = 300, DX = 780;                  // cache and database card centres
    const ROW = 930, OLD_DY = 140;            // current row y; history offset
    const ED_BOTTOM = 594, STORE_TOP = 766, STORE_BOTTOM = 1214, APP_TOP = 1394;

    s.node('title', 'label', { x: 540, y: 290, text: 'A stale copy', size: 84, weight: 800, color: T.title });
    s.node('subtitle', 'label', { x: 540, y: 378, text: 'CACHE-ASIDE', size: 40, weight: 700, color: T.mid });

    // Links: editor -> database only; application -> cache (used) and -> database (unused here).
    s.wire('w', [DX, ED_BOTTOM], [DX, STORE_TOP]);
    s.wire('ac', [CX, APP_TOP], [CX, STORE_BOTTOM]);
    s.wire('ad', [DX, APP_TOP], [DX, STORE_BOTTOM], { color: T.dim });
    for (const w of ['w', 'ac', 'ad']) s.set(0, 'wire:' + w, 'alpha', 0, 0);

    // The key both stores hold.
    s.node('key', 'label', { x: CX, y: 500, text: 'key', size: 40, mono: true, color: T.mid, alpha: 0 });
    s.node('keyv', 'label', { x: CX, y: 552, text: 'runbook:api', size: 48, mono: true, weight: 700, color: T.fg, alpha: 0 });

    // Editor: writes the source.
    s.node('ed', 'panel', { x: DX, y: 516, w: 420, h: 152, label: 'Editor', sub: 'idle', headY: 50, subGap: 56, subSize: 44, pad: 32, alpha: 0 });

    // Stores: current row on top; the database keeps its history below.
    s.node('cache', 'panel', { x: CX, y: 990, w: 420, h: 448, label: 'Cache', headY: 56, pad: 32, alpha: 0 });
    s.node('db', 'panel', { x: DX, y: 990, w: 420, h: 448, label: 'Database', headY: 56, pad: 32, alpha: 0 });
    s.node('c0', 'rec', { x: CX, y: ROW, w: 370, h: 124, key: 'rev 1', val: 'step 4', size: 48, stack: true, color: T.mid, alpha: 0 });
    s.node('d0', 'rec', { x: DX, y: ROW, w: 370, h: 124, key: 'rev 1', val: 'step 4', size: 48, stack: true, color: T.mid, alpha: 0 });
    s.node('d2', 'rec', { x: DX, y: ROW, w: 370, h: 124, key: 'rev 2', val: 'step 6', size: 48, stack: true, color: T.ok, alpha: 0 });
    s.node('same', 'label', { x: 540, y: ROW, text: '=', size: 72, mono: true, weight: 700, color: T.ok, alpha: 0 });
    s.node('unch', 'label', { x: CX, y: ROW + OLD_DY, text: 'unchanged', size: 44, mono: true, weight: 700, color: T.accent, alpha: 0 });

    // Reader application below.
    s.node('app', 'panel', { x: 540, y: 1520, w: 900, h: 252, label: 'Application', tag: '', headY: 56, alpha: 0 });
    s.node('slot', 'rec', { x: 540, y: 1584, w: 820, h: 96, key: 'runbook:api', val: 'rev ?', size: 48, keyColor: T.mid, valColor: T.mid, dashed: 1, alpha: 0 });
    s.node('hit', 'label', { x: 540, y: 1700, text: 'HIT · key found', size: 48, mono: true, weight: 700, color: T.ok, alpha: 0 });
    s.node('note', 'label', { x: 540, y: 1780, text: 'hit ≠ fresh', size: 56, mono: true, weight: 700, color: T.accent, alpha: 0 });

    const panC = s.panOf([CX, 0]), panD = s.panOf([DX, 0]);
    const differ = (t, g = 0.55) => { s.sfx(t, 'ack', { note: 'E5', gain: g, pan: panC }); s.sfx(t, 'ack', { note: 'G#5', gain: g, pan: panD }); };

    // ---- Beat 1 (0–8): both stores begin at revision 1.
    for (const id of ['key', 'keyv', 'cache', 'c0']) s.set(0.3, id, 'alpha', 1, 0.6);
    s.sfx(0.8, 'ack', { note: 'E5', pan: panC });
    for (const id of ['db', 'd0']) s.set(0.9, id, 'alpha', 1, 0.6);
    s.sfx(1.4, 'ack', { note: 'G5', pan: panD });
    s.set(2.0, 'ed', 'alpha', 1, 0.6); s.set(2.0, 'wire:w', 'alpha', 1, 0.6);
    s.sfx(2.5, 'ack', { note: 'A5', pan: panD });
    for (const id of ['app', 'slot']) s.set(3.0, id, 'alpha', 1, 0.6);
    s.set(3.0, 'wire:ac', 'alpha', 1, 0.6); s.set(3.0, 'wire:ad', 'alpha', 1, 0.6);
    s.sfx(3.5, 'ack', { note: 'C5', pan: 0 });
    // The copies agree for now.
    s.pulse(4.6, 'c0', T.ok, 0.8); s.pulse(4.6, 'd0', T.ok, 0.8);
    s.set(4.6, 'same', 'alpha', 1, 0.3);
    s.sfx(4.6, 'ack', { note: 'E5', pan: panC }); s.sfx(4.6, 'ack', { note: 'G5', pan: panD });

    // ---- Beat 2 (8.4–19.5): an editor saves revision 2 to the database only.
    const tw = 8.4;
    s.set(tw, 'ed', 'sub', 'save rev 2', 0); s.set(tw, 'ed', 'subColor', T.accent, 0.2);
    s.set(tw, 'wire:w', 'color', T.accent, 0.3);
    s.packet({ route: [[DX, ED_BOTTOM + 30], [DX, STORE_TOP - 36]], t: tw, dur: 1.2, kind: 'chip', label: 'rev 2', size: 44, color: T.accent, fade: 0.2 });
    s.sfx(tw, 'send', { note: 'A6', pan: panD });
    const ta = tw + 1.2;  // 9.6
    s.ripple(ta, [DX, STORE_TOP + 4], T.fg, { r1: 36, dur: 0.5 });
    s.set(ta, 'wire:w', 'color', T.wire, 0.4);
    s.set(ta, 'db', 'color', T.accent, 0.2);
    s.sfx(ta, 'arrive', { note: 'G5', pan: panD });
    // The new revision becomes current; revision 1 moves down into history.
    const ts = ta + 0.6;  // 10.2
    s.set(ts, 'd0', 'dy', OLD_DY, 0.6); s.set(ts, 'd0', 'alpha', 0.45, 0.6);
    // The new row appears only after the old one has cleared its place.
    s.set(ts + 0.65, 'd2', 'alpha', 1, 0.3); s.set(ts + 0.65, 'd2', 'scale', 1.06, 0.2, 'out'); s.set(ts + 0.9, 'd2', 'scale', 1, 0.3);
    s.sfx(ts + 0.65, 'store', { note: 'G5', pan: panD });
    s.set(ts + 1.0, 'ed', 'sub', 'saved', 0); s.set(ts + 1.0, 'ed', 'subColor', T.ok, 0.2);
    s.set(ts + 1.0, 'db', 'color', T.mid, 0.5);
    s.sfx(ts + 1.0, 'ack', { note: 'A5', gain: 0.6, pan: panD });
    // Nothing reached the cache: its copy is unchanged and now older than the source.
    const tu = 13.2;
    s.set(tu, 'same', 'text', '≠', 0); s.set(tu, 'same', 'color', T.accent, 0.2);
    s.set(tu, 'same', 'scale', 1.2, 0.2, 'out'); s.set(tu + 0.25, 'same', 'scale', 1, 0.3);
    s.set(tu, 'c0', 'color', T.accent, 0.3); s.set(tu, 'c0', 'valColor', T.accent, 0.3);
    s.set(tu + 0.6, 'unch', 'alpha', 1, 0.3);
    differ(tu);

    // ---- Beat 3 (19.5–26.5): the next lookup checks the cache and still finds revision 1.
    const tl = 19.5;
    s.set(tl, 'app', 'tag', 'checking cache', 0); s.set(tl, 'app', 'tagColor', T.accent, 0.2);
    s.set(tl, 'wire:ac', 'color', T.accent, 0.3);
    s.packet({ route: [[CX, APP_TOP - 40], [CX, STORE_BOTTOM + 40]], t: tl, dur: 1.2, kind: 'chip', label: 'runbook:api', size: 40, color: T.accent, fade: 0.2 });
    s.sfx(tl, 'send', { note: 'C6', pan: panC });
    const tc = tl + 1.2;  // 20.7
    s.ripple(tc, [CX, STORE_BOTTOM - 4], T.fg, { r1: 36, dur: 0.5 });
    s.set(tc, 'wire:ac', 'color', T.wire, 0.4);
    s.set(tc, 'cache', 'color', T.accent, 0.2);
    s.sfx(tc, 'arrive', { note: 'E5', pan: panC });
    const th = tc + 0.8;  // 21.5
    s.set(th, 'c0', 'color', T.ok, 0.2); s.pulse(th, 'c0', null, 0.6);
    s.set(th, 'hit', 'alpha', 1, 0.15); s.set(th, 'hit', 'scale', 1.12, 0.15, 'out'); s.set(th + 0.2, 'hit', 'scale', 1, 0.3);
    s.sfx(th, 'hit', { note: 'E5', pan: panC });

    // ---- Beat 4 (26.5–43): the old copy returns successfully; a hit does not mean fresh.
    const tr = 26.5;
    s.pulse(tr, 'c0', null, 0.5);
    s.set(tr, 'wire:ac', 'color', T.ok, 0.3);
    s.packet({ route: [[CX, STORE_BOTTOM + 40], [CX, APP_TOP - 40]], t: tr, dur: 1.3, kind: 'chip', label: 'rev 1 · step 4', size: 40, color: T.ok, fade: 0.2 });
    s.sfx(tr, 'send', { note: 'E6', pan: panC });
    s.set(tr + 0.7, 'cache', 'color', T.mid, 0.5);
    const td = tr + 1.3;  // 27.8
    s.ripple(td, [CX, APP_TOP + 4], T.ok, { r1: 36, dur: 0.5 });
    s.set(td, 'wire:ac', 'color', T.wire, 0.4);
    s.set(td, 'slot', 'val', 'rev 1 · step 4', 0); s.set(td, 'slot', 'valColor', T.fg, 0.2);
    s.set(td, 'slot', 'dashed', 0, 0); s.set(td, 'slot', 'color', T.ok, 0.25); s.set(td, 'slot', 'keyColor', T.fg, 0.25);
    s.set(td, 'app', 'tag', 'received', 0); s.set(td, 'app', 'tagColor', T.ok, 0.2);
    s.sfx(td, 'deliver', { note: 'C5', pan: panC });
    s.set(td + 0.8, 'c0', 'color', T.accent, 0.5);
    // Set the returned value against the source: same key, different revision.
    s.pulse(30.0, 'slot', T.accent, 0.8);
    s.sfx(30.0, 'ack', { note: 'C5', gain: 0.6, pan: 0 });
    s.pulse(30.9, 'd2', T.ok, 0.8);
    s.sfx(30.9, 'ack', { note: 'G5', gain: 0.6, pan: panD });
    s.set(32.0, 'note', 'alpha', 1, 0.3); s.set(32.0, 'note', 'scale', 1.1, 0.2, 'out'); s.set(32.25, 'note', 'scale', 1, 0.3);
    differ(32.0, 0.65);
    s.fade(41.0, 1, 1.0);
  },
});
