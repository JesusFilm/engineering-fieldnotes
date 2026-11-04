# Lesson 03 beat sheet: A cache miss

**Mechanism:** the cache lookup finds no entry for `runbook:api`, which is a miss. The application's code then reads the database itself, receives revision 1, and writes that copy into the cache. The cache never contacts the database. A miss is an absent key, not a failure.

**Composition:** the application panel at the top shows the record it needs and its own three-line routine: `1 get cache`, `2 read db`, `3 set cache`. The active line is outlined, and each line records its result on the right (`MISS`, `rev 1`, `stored`). Below sit the cache (left) and the database (right). Each one connects only to the application; there is no line between the stores. The cache shows the place for `runbook:api` as a dashed `no entry` target until the application fills it. Compared with lesson 02, the new element is application code as the visible owner of every step.

Playback times for `video.mp4` (speed 1). Duration is 42.00 s, with a finite ending that fades from 40.0 s.

## Synthesis decisions (neutral, plan A / plan B)

| Choice | From | Reason |
|---|---|---|
| Numbered routine with an active-line outline | B | Shows that application code performs each step |
| Result written beside each routine line (`MISS`, `rev 1`, `stored`) | A (app result line that changes), placed on B's code lines | A readable trace of the whole miss in the final frame |
| Dashed `runbook:api / no entry` target in the cache, solid `rev 1` row only on fill | A | Absence is a place the viewer can see fill |
| `MISS · key absent` in amber, no red and no × | Both | A miss is normal absence |
| Hollow `none` result returns to the application before the source read | A | The application, not the cache, decides to read the source |
| `source reads: 0 → 1` under the database | B | Exactly one source read |
| Hold with the application holding `rev 1` while the cache is still `no entry` (empty target flashes at 22.0) | A | The fill is a separate step, not the response continuing |
| `ok` acknowledgment from the cache before `stored` | A | `stored` appears only after the cache confirms |
| `filled by app` replaces the MISS tag | A's footer idea, shortened | Names the owner of the fill in the final state |
| Pitches: application C, cache E, database G; one quiet `chime` at the end | B | Actor-specific sound; one closing cue |
| Not used: B's fourth line `4 use copy` and the link pulses | — | Beyond this lesson's four text beats |
| Not used: B's `ready` database tag | — | Amber MISS, a healthy table and one read already show "not a failure" |
| Two-line store rows (key above, value below), 44 px | Local layout, as in lesson 02 | Narrow side-by-side tables at phone width |

## Teaching beats

| # | Time (s) | What moves | State change | Sound |
|---|---|---|---|---|
| 1 | 0–12.4 | 0.3 application (`runbook:api rev ?`, routine). 1.6 cache with `runbook:ops rev 4` and an empty dashed place. 2.8 database (`runbook:api rev 1`, `runbook:ops rev 4`) and `source reads: 0`. 4.4 line 1 outlined. 5.0 `runbook:api` chip down to the cache. 6.3 arrival; cache outline amber. 6.9 `runbook:ops` dims; the empty place becomes amber dashed `runbook:api / no entry`. 7.7 `MISS · key absent`. 8.7 `none` chip returns. 10.0 line 1 shows `MISS`. | Key absent; database unchanged | 0.8 ack C5 · 2.1 ack E5 · 3.3 ack G5 · 4.4 ack C6 · 5.0 send C6 · 6.3 arrive E5 · 6.9 work E5 · 7.7 miss · 8.7 send E6 · 10.0 deliver C4 · hold 10.3–12.4 |
| 2 | 12.4–18.6 | 12.4 line 2 outlined. 13.0 `runbook:api` chip down to the database. 14.3 arrival; `source reads: 1`; database outline amber. 14.9 `runbook:ops` dims, `runbook:api` amber. 15.6 row teal. | The application reads the source | 12.4 ack C6 · 13.0 send C6 · 14.3 arrive G5 · 14.9 work G5 · 15.6 ack G5 · hold 16.0–18.6 |
| 3 | 18.6–25.0 | 18.6 `rev 1` copy rises from the database; the database returns to rest. 19.9 application view solid teal `rev 1`; line 2 shows `rev 1`. 22.0 the cache's empty `no entry` place flashes amber. | The application has the record, and the cache still does not | 18.6 send G6 · 19.9 deliver C5 · 22.0 ack E4 (quiet) · hold 22.7–25.0 |
| 4 | 25.0–31.6 | 25.0 line 3 outlined. 25.6 `set rev 1` chip down to the cache. 26.9 the cache place becomes solid teal `runbook:api rev 1`; tag → `filled by app`. 27.8 `ok` chip returns. 28.9 line 3 shows `stored`. | The application filled the cache | 25.0 ack C6 · 25.6 send C6 · 26.9 store E5 · 27.8 send E6 · 28.9 ack C5 · hold 29.5–31.6 |
| 5 | 31.6–42.0 | 31.6 outline leaves line 3; the three `rev 1` values (application, cache, database) flash teal together and stay teal. Hold, then fade 40.0–41.0. | The cache now holds a copy a later lookup could find | 31.6 chime E5 (quiet) · silent hold |

## Accuracy limits

The routine is a teaching view of application code, not a library API. Real fills usually set an expiry, which is not shown. A miss here means the key was absent. Expiry, eviction and cache outages are not distinguished. The fill-after-receive order is illustrative. Concurrent misses (stampedes), authorization and key scope are not shown. Keys, revisions and times are illustrative.

## Reproduce

From the repository root (pinned `puppeteer-core` 25.14.0 in root `node_modules`):

```
node video/cache-aside/motion-v2/03/engine/render.mjs video/cache-aside/motion-v2/03/scene.js video/cache-aside/motion-v2/03/video.mp4 --sheet video/cache-aside/motion-v2/03/scratch/contact-sheet.png
```

Checks run from `video/cache-aside/motion-v2/03`. First write `scratch/cues.json` with `node -e "const F=require('./engine/flow-engine.js'); require('./scene.js'); require('fs').writeFileSync('scratch/cues.json', JSON.stringify(F.createScene(F.lastScene).audioCues()))"`, then run `python3 scratch/verify.py .` and `python3 scratch/frames.py enc <times> 8`.

The local engine is a copy of lesson 02's local engine (`panel`, `rec` with `stack`, `label` align, chip `size`), unchanged. Lessons 01 and 02 were not edited.

## Lesson text sync

`lessons.json` item 3 assumes 28 s with beats at 0/7/14/21. For this cut, use duration 42 with beats at **0 / 12.4 / 18.6 / 25.0**. This folder does not edit that file.
