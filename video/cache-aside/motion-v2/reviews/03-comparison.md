# Cache-aside lesson 03 — A cache miss: comparison review

Comparison of the encoded motion-v2 candidate against the public lesson, judged against `video/cache-aside/sequence/lessons.json` item 3. This reviewer wrote an earlier planning document for this lesson, and the candidate's geometry (an application panel listing its numbered read steps with a step cursor, cache and database cards below, each linked only to the application) closely resembles it; that context is acknowledged, and the candidate is judged against the lesson rather than plan fidelity. No authoring source, scene file, production metadata or self-review of the candidate was read before or during this encoded inspection. Model identity is not considered.

## Files and hashes

| file | SHA-256 (before = after) | duration | video | audio |
|---|---|---|---|---|
| candidate `video/cache-aside/motion-v2/03/video.mp4` | `21e5559bd846f9c605bc7f8cee8386910acbe0dcafe2c5f7d67754d7819d4ddd` | 42.0 s | h264 1080×1920, 30 fps, 1260 frames | aac |
| public `public/lessons/cache-aside/03.mp4` | `98529494cc8d6895dbff736671dc3a4ad3bc0544272c5c5b6d0460a8d5a65b1e` | 28.0 s | h264 1080×1920, 20 fps, 560 frames | aac |

Hashes were recorded before inspection (`scratch/03/hash-before.txt`) and after (`scratch/03/hash-after.txt`); they are identical. No media was modified.

## Recommendation

**Recommend the candidate.** It shows the application's own routine (`1 get cache`, `2 read db`, `3 set cache`) with a cursor that moves line by line and records each result (`MISS`, `rev 1`, `stored`). The cache shows a dashed `runbook:api no entry` row and `MISS · key absent` in amber while the database is untouched; the application reads the database (`source reads: 1`), receives `rev 1`, sends `set rev 1` to the cache, and the cache's row becomes `runbook:api rev 1` with `filled by app`. Every transfer starts or ends at the application. The public cut is accurate (its captions say the application reads and fills) but routes the source read along a side line and relies on captions for "the cache does not fetch by itself". Decision: `pass`, no blockers.

## Method

- One frame per second from each file at 350 px wide (`scratch/03/cand350/`, `pub350/`), tiled (`c1.png`, `c13.png`, `c25.png`, `c37.png`, `p1–p2.png`).
- Individual native 350 px frames by accurate seek at 9.4, 14.6, 19.6, 26.0 and 32.0 s (`t350/`, `t350_a.png`), viewed at native size.
- Whole-file decode with `-xerror` for both files; atom order; `volumedetect` overall and per event; `silencedetect` onsets; candidate spectrogram (`cand_spec.png`).
- **Audio was analysed only, not heard.**

## What each cut shows

**Candidate (42.0 s).** Title `A cache miss`, subtitle `CACHE-ASIDE`. An `Application` panel with `runbook:api rev ?` and three numbered steps; `Cache` (`runbook:ops rev 4`, an empty slot) and `Database` (`runbook:api rev 1`, `runbook:ops rev 4`) cards; `source reads` under the database.

| time | beat | evidence |
|---|---|---|
| 0–11 s | check the cache; the key is absent | cursor on `1 get cache`; a `runbook:api` chip goes to the cache; the empty slot becomes dashed `runbook:api no entry`; `MISS · key absent` (amber); a `none` chip returns; step 1 records `MISS`; `source reads: 0` |
| 11–18 s | the application reads the source | cursor on `2 read db`; a `runbook:api` chip goes to the database; `source reads: 1`; `runbook:api rev 1` outlined green |
| 18–24 s | the database returns the record | `rev 1` chip rises (≈ 19.6 s); step 2 records `rev 1`; application `runbook:api rev 1`; cache still `no entry` |
| 24–30 s | the application fills the cache | cursor on `3 set cache`; `set rev 1` chip goes to the cache (≈ 25–26 s); cache row `runbook:api rev 1` green, `filled by app`; an `ok` chip returns; step 3 records `stored` |
| 30–42 s | hold and fade | cache row and database row pulse together; final state; fade |

**Public (28 s).** `APPLICATION`, `CACHE empty` and `DATABASE revision 1` stacked, with a side line from the application to the database; a `READ` chip goes to the cache, which becomes `MISS`; a `READ` chip travels the side line to the database; `r1` returns along it; a `STORE r1` chip goes from application to cache, which becomes `revision 1`; captions per beat.

## Scores (1–5)

| criterion | candidate | public | concrete difference |
|---|---|---|---|
| causal clarity | 5 | 3.5 | Candidate's step list makes "application code performs the source read and cache fill" visible: each step lights as its transfer happens and records its result. Public shows the same transfers but the ownership point is in captions. |
| accuracy | 5 | 4.5 | Candidate never connects cache and database, keeps the database untouched during the miss, shows `MISS` in amber rather than as a failure, and fills only after the record arrives. Public is accurate; its `CACHE empty` label says less than "the key is absent". |
| pacing | 4.5 | 3 | Events about 0.6–1.3 s apart, holds after the miss, the read and the fill; ≈ 12 s final hold, slightly long. Public holds 7 s caption blocks; the last 5 s are static. |
| legibility at 350 px | 4.5 | 3.5 | Step lines, results, card rows, `no entry`, `MISS · key absent`, `filled by app` and `source reads` read at native 350; card rows wrap `rev` onto a second line and are the smallest text. Public labels are small. |
| meaningful variety | 4.5 | 2 | Showing the application's routine as the central object differs from lessons 01–02 and suits "the application owns the work". Public reuses stacked boxes with captions. |

## Objective checks

| check | candidate | public |
|---|---|---|
| full decode (`-xerror`) | clean | clean |
| atom order | ftyp, moov, free, mdat | same |
| audio peak | −6.7 dB (below −0.5 dB) | −10.6 dB |
| loudest events | lookup reaches cache (6.3 s), read reaches database (14.3 s), record received (19.9 s) | n/a |
| sound on visible events | onsets for steps and transfers throughout (0.8–10.0 s miss sequence, 12.4–15.6 s source read, 18.6–19.9 s return, 25.0–28.9 s fill and ack, 31.6 s closing pulse); the `MISS` cue is soft (≈ −18 dB at 8.7 s), consistent with "not a failure" | sparse |
| clipping, overlap, off-stage | none found | none found |
| stillness beyond 3 s outside holds | none; 30–42 s is the closing hold | 23–28 s static |
| ending | finite, hold then fade | ends on caption frame |

## Optional improvements (not blockers)

1. **Make the `MISS` cue a little more audible.** It is the lesson's event but peaks ≈ −18 dB, quieter than routine transfers; keep it soft but closer to them.
2. **Shorten the final hold.** About 12 s of final state before the fade; 6–8 s would be enough.
3. **Note in the write-up that fills usually set an expiry** (e.g. `SET … EX`) and that a cache outage is a failure distinct from a miss.

## Scratch evidence

`video/cache-aside/motion-v2/reviews/scratch/03/`: hash files, 1 fps 350 px frames for both cuts, tiled sheets, native 350 seek frames, and the candidate spectrogram.

