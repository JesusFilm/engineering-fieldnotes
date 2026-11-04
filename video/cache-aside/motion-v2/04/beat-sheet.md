# Lesson 04 beat sheet: A stale copy

**Mechanism:** a source write and a cache change are separate operations. An editor saves revision 2 to the database, and nothing touches the cached key, so the cache still holds revision 1. The next lookup is a successful hit that returns the old runbook (`rev 1 · step 4`) while the source says `rev 2 · step 6`.

**Composition:** this lesson turns the earlier layouts over. The key (`runbook:api`) and the editor sit at the top, the cache and database cards sit side by side in the middle, and the reading application sits at the bottom, so the read travels upward. The editor connects only to the database. The application connects to the cache (used) and to the database (dim, never used). A `=` between the stores' current rows turns into `≠`. The database keeps its history, with the new row on top and revision 1 dimmed below.

Playback times for `video.mp4` (speed 1). Duration is 43.00 s, with a finite ending that fades from 41.0 s.

## Synthesis decisions (neutral, plan A / plan B)

| Choice | From | Reason |
|---|---|---|
| Inverted layout: editor above database, reader application below | A | Separates the writer and the reader; varies the series geometry |
| Shared key label for both stores | A | Same key, different revisions |
| Database history: `rev 2` becomes current, `rev 1` slides down and dims | B | The source changed; the old revision is history there |
| `step 4` / `step 6` payload | B (concept example: changed rollback step) | Shows what "stale" costs a reader |
| `=` → `≠` between current rows; cached row and `unchanged` in amber after the write | B (=/≠), A (amber only after commit, `Cache unchanged`) | Divergence visible without words |
| Cache stays silent during the write; the divergence uses a clashing E5 + G#5 pair | B | Absence of a cache change is audible |
| `HIT · key found` in teal; no red or × | Both | The hit succeeds |
| Unused, dim application → database link | B | No source read during the hit |
| Final `hit ≠ fresh` annotation outside the application panel | A | The application itself never detects staleness |
| Pitches: application C5, cache E5, database G5, editor A5 | B | Four actors, audibly distinct |
| Not used: B's bottom `check` comparison panel | — | Side-by-side stores already compare; a panel would suggest the application compares |
| Not used: A's 100 px numerals | — | 48 px two-line rows read at 350 px and carry the payload |
| Not used: B's soft `miss` at the reveal | — | In lesson 03 the `miss` cue means "key absent", so reusing it here would mislead |

## Teaching beats

| # | Time (s) | What moves | State change | Sound |
|---|---|---|---|---|
| 1 | 0–8.4 | 0.3 key and cache (`rev 1 / step 4`). 0.9 database (`rev 1 / step 4`). 2.0 editor (`idle`) and write link. 3.0 application (`runbook:api rev ?`) and links. 4.6 both current rows glow teal; `=` appears. | Copies agree | 0.8 ack E5 · 1.4 ack G5 · 2.5 ack A5 · 3.5 ack C5 · 4.6 ack E5 + G5 · hold 5.4–8.4 |
| 2 | 8.4–19.5 | 8.4 editor `save rev 2`; `rev 2` chip down to the database. 9.6 arrival, database outline amber. 10.2 `rev 1` slides down and dims. 10.85 `rev 2 / step 6` appears teal on top. 11.2 editor `saved`. 13.2 `=` → `≠`; cached row turns amber; 13.8 `unchanged`. | Source at rev 2; cache still rev 1 | 8.4 send A6 · 9.6 arrive G5 · 10.85 store G5 · 11.2 ack A5 · 13.2 ack E5 + G#5 (clash) · hold 14.1–19.5 |
| 3 | 19.5–26.5 | 19.5 application tag `checking cache`; `runbook:api` chip up to the cache. 20.7 arrival, cache outline amber. 21.5 cached row outline teal; `HIT · key found`. | Successful hit on the old copy | 19.5 send C6 · 20.7 arrive E5 · 21.5 hit E5 · hold 21.9–26.5 |
| 4 | 26.5–43 | 26.5 `rev 1 · step 4` chip down to the application. 27.8 application view solid teal `rev 1 · step 4`; tag `received`. 28.6 cached row back to amber. 30.0 the received value flashes amber; 30.9 database `rev 2` flashes teal. 32.0 `hit ≠ fresh`. Hold, then fade 41.0–42.0. | Old copy returned successfully; it is not the source's current revision | 26.5 send E6 · 27.8 deliver C5 · 30.0 ack C5 · 30.9 ack G5 · 32.0 ack E5 + G#5 · silent hold |

## Accuracy limits

The cache is not updated because nothing deletes or rewrites its key. The fix (deleting the key) belongs to lesson 05 and is not shown. The side-by-side view is the narrator's view: the application does not compare with the source on a hit, so it shows no warning. Expiry, races between readers and writers, and authorization are not shown. Revisions, steps, keys and times are illustrative.

## Reproduce

From the repository root (pinned `puppeteer-core` 25.14.0 in root `node_modules`):

```
node video/cache-aside/motion-v2/04/engine/render.mjs video/cache-aside/motion-v2/04/scene.js video/cache-aside/motion-v2/04/video.mp4 --sheet video/cache-aside/motion-v2/04/scratch/contact-sheet.png
```

Checks run from `video/cache-aside/motion-v2/04`. First write `scratch/cues.json` with `node -e "const F=require('./engine/flow-engine.js'); require('./scene.js'); require('fs').writeFileSync('scratch/cues.json', JSON.stringify(F.createScene(F.lastScene).audioCues()))"`, then run `python3 scratch/verify.py .` and `python3 scratch/frames.py enc <times> 8`.

The local engine is a copy of lesson 03's local engine, plus an animated `dy` offset on `rec` so a history row can slide. Lessons 01–03 were not edited.

## Lesson text sync

`lessons.json` item 4 assumes 28 s with beats at 0/7/14/21. For this cut, use duration 43 with beats at **0 / 8.4 / 19.5 / 26.5**. This folder does not edit that file.
