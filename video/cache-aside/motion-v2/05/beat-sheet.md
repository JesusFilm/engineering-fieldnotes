# Lesson 05 beat sheet: Invalidate and refill

**Mechanism:** the source is already at revision 2. The application deletes the stale cached key. The next lookup misses, the application reads revision 2 from the database, and then it stores that copy in the cache, so the copies agree again. Each step is a separate operation. This repairs the one key shown; concurrent writers are named, not played.

**Composition:** the application sits at the top, with diagonal links down to the cache entry (left) and the database record (right). The two stores are not linked. A mark between the stores goes `≠` → `·` (while the entry is absent) → `=`. The lower half is a numbered **operations log**, with one row per operation in order and its result on the right. The cache entry passes through three states: amber `rev 1 / step 4` marked `stale`, dashed `no entry`, then solid `rev 2 / step 6`. Lessons 01–04 put stores and paths at the centre; here the order of separate operations is the main object.

Playback times for `video.mp4` (speed 1). Duration is 45.00 s, with a finite ending that fades from 43.0 s.

## Synthesis decisions (neutral, plan A / plan B)

| Choice | From | Reason |
|---|---|---|
| Numbered operations log as the main geometry | B | Invalidation is about separate operations in order |
| First row `1 db write rev 2 · done`, already complete when the log appears | B (and A's update-before-delete ordering) | Shows the source changed before the delete |
| Cache entry states: stale → `no entry` (dashed, neutral) → `rev 2` | Both | Deletion creates absence, not freshness |
| Delete and set each confirmed by an `ok` from the cache before the log result | A | Results appear only after completion |
| Neutral `miss` in amber, no red | Both | Absent key, not failure |
| Hold with the application at `uses rev 2` while the cache is still `no entry` (25.4 flash) | A | The refill is a separate step |
| `≠` / `·` / `=` mark between the stores | B | Agreement state without words |
| Final `another writer?` dashed note | B | Names the concurrency limit briefly and leaves it as a question (the lesson's "concurrent writes still need care") |
| Pitches: application C5, cache E5, database G5; `poof` for the delete; one quiet chime when the copies agree | B | Actor-specific sound; deletion is not a crash |
| Not used: A's `No concurrent changes` footer | — | `another writer?` is shorter, and it questions without asserting |
| Not used: B's top-to-bottom pulse of all log rows | — | Five extra cues with little gain; the finished log already reads in order |
| `step 4` / `step 6` payload carried over from lesson 04 | Continuity | The repair fixes the value a reader would use |

## Teaching beats

| # | Time (s) | What moves | State change | Sound |
|---|---|---|---|---|
| 1 | 0–13 | 0.3 cache entry `rev 1 / step 4` (amber, `stale`). 0.9 database `rev 2 / step 6`, `≠`. 2.0 application (`runbook:api`), links, empty log. 3.6 row 1 `db write rev 2 · done`; database row pulses. 5.6 row 2 `delete cache key` active. 6.0 `delete` chip to the cache. 7.2 entry becomes dashed `no entry`; `stale` tag gone; mark `·`. 8.2 `ok` returns. 9.2 row 2 `deleted`. | Stale entry removed; nothing cached | 0.8 ack E5 · 1.4 ack G5 · 2.5 ack C5 · 3.6 ack G5 · 5.6 ack C6 · 6.0 send C6 · 7.2 poof E5 · 8.2 send E6 · 9.2 ack C5 · hold 9.6–13.0 |
| 2 | 13–19.5 | 13.0 row 3 `get cache` active. 13.4 `runbook:api` chip to the cache. 14.6 arrival; cache outline amber. 15.2 `no entry` turns amber. 16.0 `none` returns. 17.2 row 3 `miss`. | The next lookup misses | 13.0 ack C6 · 13.4 send C6 · 14.6 arrive E5 · 15.2 miss · 16.0 send E6 · 17.2 deliver C4 · hold 17.6–19.5 |
| 3 | 19.5–27.5 | 19.5 row 4 `read db` active. 19.9 `runbook:api` chip to the database. 21.1 arrival. 21.7 row pulses. 22.5 `rev 2` returns. 23.7 application `uses rev 2`; row 4 `rev 2`. 25.4 the cache's `no entry` flashes amber. | The application has rev 2, and the cache is still empty | 19.5 ack C6 · 19.9 send C6 · 21.1 arrive G5 · 21.7 ack G5 · 22.5 send G6 · 23.7 deliver C5 · 25.4 ack E4 · hold 26.1–27.5 |
| 4 | 27.5–34.5 | 27.5 row 5 `set cache` active. 27.9 `set rev 2` chip to the cache. 29.1 entry solid teal `rev 2 / step 6`. 30.0 `ok` returns. 31.0 row 5 `stored`. 32.0 mark `=`; both entries glow. | Copies agree again | 27.5 ack C6 · 27.9 send C6 · 29.1 store E5 · 30.0 send E6 · 31.0 ack C5 · 32.0 chime E5 |
| 5 | 34.5–45 | 34.5 dashed `another writer?` fades in under the log. Hold, then fade 43.0–44.0. | Repair of this key only; concurrency still needs care | 34.5 ack C4 (quiet) · silent hold |

## Accuracy limits

The delete succeeds in this example. Real update paths should surface failed deletes for recovery. A reader that fetched revision 1 before the delete can still write it back afterwards (a stale set). `another writer?` names that risk without playing it, and leases or versioned writes belong in the write-up. `no entry` is an absence display, not a stored null value. Expiry, authorization, and timing guarantees are not shown. Keys, revisions, steps and times are illustrative.

## Reproduce

From the repository root (pinned `puppeteer-core` 25.14.0 in root `node_modules`):

```
node video/cache-aside/motion-v2/05/engine/render.mjs video/cache-aside/motion-v2/05/scene.js video/cache-aside/motion-v2/05/video.mp4 --sheet video/cache-aside/motion-v2/05/scratch/contact-sheet.png
```

Checks run from `video/cache-aside/motion-v2/05`. First write `scratch/cues.json` with `node -e "const F=require('./engine/flow-engine.js'); require('./scene.js'); require('fs').writeFileSync('scratch/cues.json', JSON.stringify(F.createScene(F.lastScene).audioCues()))"`, then run `python3 scratch/verify.py .` and `python3 scratch/frames.py enc <times> 8`.

The local engine is an unchanged copy of lesson 04's local engine (`panel`, `rec` with `stack` and `dy`, `label` align, chip `size`). Lessons 01–04 were not edited.

## Lesson text sync

`lessons.json` item 5 assumes 28 s with beats at 0/7/14/21. For this cut, use duration 45 with beats at **0 / 13.0 / 19.5 / 27.5**. The first text beat ("The source is now at revision 2. Remove its stale cached key.") covers the delete in 0–13. This folder does not edit that file.
