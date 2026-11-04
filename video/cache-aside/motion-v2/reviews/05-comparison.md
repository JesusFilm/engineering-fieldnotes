# Cache-aside lesson 05 — Invalidate and refill: comparison review

Comparison of the encoded motion-v2 candidate against the public lesson, judged against `video/cache-aside/sequence/lessons.json` item 5. This reviewer wrote an earlier planning document for this lesson, and the candidate's geometry (a cache entry and database card with a `≠`/`·`/`=` mark, an application above, a numbered `operations` log, a closing `another writer?` note) closely resembles it; that context is acknowledged, and the candidate is judged against the lesson rather than plan fidelity. No authoring source, scene file, production metadata or self-review of the candidate was read before or during this encoded inspection. Model identity is not considered.

## Files and hashes

| file | SHA-256 (before = after) | duration | video | audio |
|---|---|---|---|---|
| candidate `video/cache-aside/motion-v2/05/video.mp4` | `0a248d604d0c97509bb2602176cb526997e444057f918f789f6893a91cd1f180` | 45.0 s | h264 1080×1920, 30 fps, 1350 frames | aac |
| public `public/lessons/cache-aside/05.mp4` | `23c6cd920f0c3eb0734755dbf24744a7ae1ab4fbbff65ab9588b87732fdee865` | 28.0 s | h264 1080×1920, 20 fps, 560 frames | aac |

Hashes were recorded before inspection (`scratch/05/hash-before.txt`) and after (`scratch/05/hash-after.txt`); they are identical. No media was modified.

## Recommendation

**Recommend the candidate.** It presents the repair as five separate, ordered operations in an `operations` log (`1 db write rev 2 done`, `2 delete cache key deleted`, `3 get cache miss`, `4 read db rev 2`, `5 set cache stored`), each tied to a visible change: the cache entry goes from amber `rev 1 · step 4 · stale` to a dashed `no entry` to green `rev 2 · step 6`, the mark between cache and database goes `≠` → `·` → `=`, and the application shows `uses rev 2` before the refill. A dashed `another writer?` note at the end carries "concurrent writes still need care" without playing a race. The public cut is accurate but relies on captions over stacked boxes. Decision: `pass`, no blockers.

## Method

- One frame per second from each file at 350 px wide (`scratch/05/cand350/`, `pub350/`), tiled (`c1.png`, `c13.png`, `c25.png`, `c37.png`, `p1–p2.png`).
- Individual native 350 px frames by accurate seek at 7.4, 16.6, 28.6, 31.2 and 36.0 s (`t350/`, `t350_a.png`), viewed at native size.
- Whole-file decode with `-xerror` for both files; atom order; `volumedetect` overall and per event; `silencedetect` onsets; candidate spectrogram (`cand_spec.png`).
- **Audio was analysed only, not heard.**

## What each cut shows

**Candidate (45.0 s).** Title `Invalidate and refill`, subtitle `CACHE-ASIDE`. An `Application` box (`runbook:api`, later `uses rev 2`) above `Cache` and `Database` cards with a mark between them, and an `operations` log below.

| time | beat | evidence |
|---|---|---|
| 0–12 s | the source is at revision 2; remove the stale key | cache `rev 1 · step 4` tagged `stale` (amber), database `rev 2 · step 6`, mark `≠`; log row 1 `db write rev 2 done`; row 2 `delete cache key`; a `delete` chip reaches the cache, which becomes dashed `no entry`; an `ok` chip returns; row 2 `deleted`; mark `·` |
| 13–19 s | the next lookup misses; read the source again | row 3 `get cache`; a `runbook:api` chip reaches the empty entry, which outlines amber; `none` returns; row 3 `miss` (amber); row 4 `read db`; a chip reaches the database |
| 19–25 s | the source returns revision 2; the application uses it | `rev 2` chip returns; application `uses rev 2`; row 4 `rev 2`; cache still `no entry` |
| 25–31 s | store the new copy | row 5 `set cache`; `set rev 2` chip reaches the cache, which becomes `rev 2 · step 6` (green); `ok` returns; row 5 `stored`; mark `=` |
| 31–45 s | concurrent writes still need care | `another writer?` appears dashed below the log (≈ 32 s); hold and fade |

**Public (28 s).** `APPLICATION`, `CACHE revision 1`, `DATABASE revision 2` stacked; a `DELETE` chip makes the cache `empty`, then `MISS`; `READ` and `r2` travel a side line; the application shows `revision 2`; a `STORE r2` chip makes the cache `revision 2`; captions per beat ending "Store the new copy in the cache. Concurrent writes still need care."

## Scores (1–5)

| criterion | candidate | public | concrete difference |
|---|---|---|---|
| causal clarity | 5 | 3.5 | Candidate's log shows the repair as an ordered set of separate operations with results, and the cache entry and agreement mark change exactly when each operation lands. Public shows the same transfers, with the sequence carried by captions. |
| accuracy | 5 | 4.5 | Candidate keeps the source commit before the delete, shows the miss in amber (not as failure), uses the record before the refill, and limits its claim with `another writer?`. Public is accurate; the concurrency caveat is caption-only. |
| pacing | 4.5 | 3 | Events about 0.4–1.6 s apart with holds after the delete, the read and the refill; ≈ 12 s final hold, a little long. Public holds 7 s caption blocks with long static stretches. |
| legibility at 350 px | 4.5 | 3.5 | Log rows and results, card rows, marks, `uses rev 2` and `another writer?` read at native 350; the application's `runbook:api` sublabel and the `·` mark are the faintest elements. Public labels are small. |
| meaningful variety | 4.5 | 1.5 | An operation log as the central object suits invalidation and differs from lessons 01–04. Public reuses stacked boxes with captions. |

## Objective checks

| check | candidate | public |
|---|---|---|
| full decode (`-xerror`) | clean | clean |
| atom order | ftyp, moov, free, mdat | same |
| audio peak | −7.1 dB (below −0.5 dB) | −10.6 dB |
| loudest events | lookup reaches empty entry (14.6 s), `rev 2` received (21.1 s), both −7.1 dB; refill stored (29.1 s, −9.7 dB) | n/a |
| sound on visible events | onsets for each log row and transfer: delete (5.6–9.2 s), lookup and miss (13.0–17.2 s), read and return (19.5–22.5 s), set and stored (25.4–30.0 s), `=` and closing note (31.0–34.5 s) | sparse |
| clipping, overlap, off-stage | none found | none found |
| stillness beyond 3 s outside holds | none; 33–45 s is the closing hold | caption blocks |
| ending | finite, hold then fade | ends on caption frame |

## Optional improvements (not blockers)

1. **Make the refill the brightest cue.** The `stored` moment (≈ 29 s, −9.7 dB) is quieter than the miss lookup and the source return (−7.1 dB); the repair completing should stand out.
2. **Shorten the final hold.** About 12 s of final state before the fade; 6–8 s would be enough.
3. **Make the `·` mark (cache absent) more visible.** It is a small grey dot between the cards during 9–29 s.
4. **Note in the write-up** that deletes can fail and should be surfaced, and that leases or versioned writes defend against a reader refilling the old revision after the delete.

## Scratch evidence

`video/cache-aside/motion-v2/reviews/scratch/05/`: hash files, 1 fps 350 px frames for both cuts, tiled sheets, native 350 seek frames, and the candidate spectrogram.

