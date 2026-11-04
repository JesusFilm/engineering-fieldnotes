# Cache-aside lesson 01 — Read the source: comparison review

Comparison of the encoded motion-v2 candidate against the public lesson, judged against `video/cache-aside/sequence/lessons.json` item 1. This reviewer wrote an earlier planning document for this lesson, and the candidate's geometry (an application panel above a keyed database table, a `source reads` counter, a repeated read, a closing dashed `reusable copy?` slot) closely resembles it; that context is acknowledged, and the candidate is judged against the lesson rather than plan fidelity. No authoring source, scene file, production metadata or self-review of the candidate was read before or during this encoded inspection. Model identity is not considered.

## Files and hashes

| file | SHA-256 (before = after) | duration | video | audio |
|---|---|---|---|---|
| candidate `video/cache-aside/motion-v2/01/video.mp4` | `8abb840985e03276d648e174cad4087550ec98aa51f32333348ebca7be8f9e00` | 44.5 s | h264 1080×1920, 30 fps, 1335 frames | aac |
| public `public/lessons/cache-aside/01.mp4` | `0756da96946132dc881d7af9840c3efd94d7521364532ae9b52909a2ae7b6c4f` | 28.0 s | h264 1080×1920, 20 fps, 560 frames | aac |

Hashes were recorded before inspection (`scratch/01/hash-before.txt`) and after (`scratch/01/hash-after.txt`); they are identical. No media was modified.

## Recommendation

**Recommend the candidate.** It shows the database as the source of record (a `source of record` table with `runbook:api rev 1`, `runbook:auth rev 3`, `runbook:search rev 2`), makes the key lookup visible (`find runbook:api`, other rows dim, then `found runbook:api`), returns `rev 1` into the application's empty `rev ?` field, and then repeats the whole read as `request 2` while `source reads` goes from `1` to `2`. A dashed `reusable copy?` slot closes the lesson without introducing cache behaviour early. The public cut is accurate but has two boxes, a progress line and captions, and its "every read can repeat that work" beat shows no second read. Decision: `pass`, no blockers.

## Method

- One frame per second from each file at 350 px wide (`scratch/01/cand350/`, `pub350/`), tiled (`c1.png`, `c13.png`, `c25.png`, `c37.png`, `p1–p2.png`).
- Individual native 350 px frames by accurate seek at 9.6, 11.4, 15.6, 27.4 and 38.0 s (`t350/`, `t350_a.png`), viewed at native size.
- Whole-file decode with `-xerror` for both files; atom order; `volumedetect` overall and per event; `silencedetect` onsets; candidate spectrogram (`cand_spec.png`).
- **Audio was analysed only, not heard.**

## What each cut shows

**Candidate (44.5 s).** Title `Read the source`, subtitle `CACHE-ASIDE`. An `Application` panel (`request N`, a `runbook:api rev ?` field, a status line) above a `Database · source of record` table with three keyed rows, joined by a read lane and a return lane; a `source reads` counter below.

| time | beat | evidence |
|---|---|---|
| 0–7 s | the application needs a runbook; the database stores it | `request 1`, `runbook:api rev ?`, `needs the record`; database rows appear, `runbook:api rev 1` highlighted; `source reads: 0` |
| 7–14 s | send a read; the database looks up the key | `reading…`; `read runbook:api` travels down; `source reads: 1`; `find runbook:api`, other rows dim; `found runbook:api`, row outlined (≈ 9–11 s) |
| 14–21 s | the database returns revision 1 | `rev 1` chip rises (≈ 13.9–15.6 s); app field becomes `runbook:api rev 1`, status `received a copy` |
| 21–35 s | every read can repeat that work | `request 2`, field back to `rev ?`; the same read, `source reads: 2`, `find` / `found`, `rev 1` returns again (≈ 24–32 s) |
| 35–44.5 s | a cache can keep a reusable copy | a dashed `reusable copy?` slot appears under the counter and stays empty; hold and fade |

**Public (28 s).** `APPLICATION` above `DATABASE revision 1`; a `READ` chip goes down, a progress line fills under the database, an `r1` chip comes up and the application shows `revision 1`; two-line captions per beat, ending "Every read can repeat that work. A cache can keep a reusable copy." over an unchanged frame.

## Scores (1–5)

| criterion | candidate | public | concrete difference |
|---|---|---|---|
| causal clarity | 5 | 3 | Candidate shows the lookup as a keyed find, the empty field filled only by the returned record, and an actual second read that repeats the work with a counter. Public shows one read and states the repetition in a caption. |
| accuracy | 4.5 | 4.5 | Both keep the database as the source of record and use illustrative timing. Candidate's status `received a copy` is accurate (the app holds a copy of the source record). It does not note that real databases use indexes rather than stepping through rows; its find step dims rows rather than scanning, so it implies little. |
| pacing | 4.5 | 3 | Events about 0.6–1.5 s apart with holds after each beat and a ≈ 8 s final hold; the second read is a full repeat. Public's caption blocks hold for 7 s with little motion, and the last 7 s are static. |
| legibility at 350 px | 4.5 | 3.5 | Table rows, keys, revisions, status lines, `find`/`found` and the counter read at native 350. Public labels (`revision 1` under `DATABASE`) are small. |
| meaningful variety | 4.5 | 1.5 | A keyed table with a lookup and a read counter suits a source read and opens the chapter distinctly. Public is two generic boxes with captions. |

## Objective checks

| check | candidate | public |
|---|---|---|
| full decode (`-xerror`) | clean | clean |
| atom order | ftyp, moov, free, mdat | same |
| audio peak | −7.1 dB (below −0.5 dB) | −10.5 dB |
| loudest events | read arrives at the database (9.2 s, 25.3 s), record received (15.8 s, 31.9 s) | n/a |
| sound on visible events | onsets for intro (0.8–5.4 s), each read (7.9–11.3 s and 22.0–27.4 s: send, arrive, find, found), each return (13.9–15.8 s and 30.0–31.9 s), slot (34.3–36.3 s, quiet) | five onsets |
| clipping, overlap, off-stage | none found | none found |
| stillness beyond 3 s outside holds | none | 21–28 s static |
| ending | finite, hold then fade | ends on caption frame |

## Optional improvements (not blockers)

1. **Label the read with its key on the return too.** The return chip says only `rev 1`; `api rev 1` would tie it to the requested key.
2. **Pulse the counter with the lookup.** `source reads` increments as each request reaches the database, consistently on both reads; pulsing it again with `find` would link "a read" to "lookup work".
3. **Note in the write-up that the find step is a teaching view.** Real databases locate keys with indexes; the dimmed rows are not a scan.

## Scratch evidence

`video/cache-aside/motion-v2/reviews/scratch/01/`: hash files, 1 fps 350 px frames for both cuts, tiled sheets, native 350 seek frames, and the candidate spectrogram.

