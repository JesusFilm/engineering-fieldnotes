# Cache-aside lesson 04 — A stale copy: comparison review

Comparison of the encoded motion-v2 candidate against the public lesson, judged against `video/cache-aside/sequence/lessons.json` item 4. This reviewer wrote an earlier planning document for this lesson, and the candidate's geometry (an editor wired only to the database, cache and database drawn as revision histories with `=`/`≠` between them, `rev 1 · step 4` versus `rev 2 · step 6`) closely resembles it; that context is acknowledged, and the candidate is judged against the lesson rather than plan fidelity. No authoring source, scene file, production metadata or self-review of the candidate was read before or during this encoded inspection. Model identity is not considered.

## Files and hashes

| file | SHA-256 (before = after) | duration | video | audio |
|---|---|---|---|---|
| candidate `video/cache-aside/motion-v2/04/video.mp4` | `bc722b7ab9b7a4a66ca6b4712f83033df5accf8893a2554c64bf2f55779f7340` | 43.0 s | h264 1080×1920, 30 fps, 1290 frames | aac |
| public `public/lessons/cache-aside/04.mp4` | `0816b2641b266870eb8f9e7cbbfa46e00a7b4abb7fcbf722fd2abadbd6b4418a` | 28.0 s | h264 1080×1920, 20 fps, 560 frames | aac |

Hashes were recorded before inspection (`scratch/04/hash-before.txt`) and after (`scratch/04/hash-after.txt`); they are identical. No media was modified.

## Recommendation

**Recommend the candidate.** It shows the write and the cache as separate operations: the editor's `save rev 2` reaches only the database, which gains `rev 2 · step 6` above a dimmed `rev 1 · step 4`; the cache keeps `rev 1 · step 4`, is tagged `unchanged`, and the `=` between the stores turns to `≠`. The next lookup is a green `HIT · key found` that delivers `runbook:api rev 1 · step 4` (`received`), and `hit ≠ fresh` closes the lesson with both stores still visible. The public cut is accurate but shows only revision labels in stacked boxes, and marks the application red ("old revision"), which reads as a failure although the call succeeded. Decision: `pass`, no blockers.

## Method

- One frame per second from each file at 350 px wide (`scratch/04/cand350/`, `pub350/`), tiled (`c1.png`, `c13.png`, `c25.png`, `c37.png`, `p1–p2.png`).
- Individual native 350 px frames by accurate seek at 9.8, 11.4, 20.8, 27.0 and 33.0 s (`t350/`, `t350_a.png`), viewed at native size.
- Whole-file decode with `-xerror` for both files; atom order; `volumedetect` overall and per event; `silencedetect` onsets; candidate spectrogram (`cand_spec.png`).
- **Audio was analysed only, not heard.**

## What each cut shows

**Candidate (43.0 s).** Title `A stale copy`, subtitle `CACHE-ASIDE`. A `key runbook:api` label and an `Editor` box at the top; `Cache` and `Database` cards side by side with an `=`/`≠` mark between; an `Application` card below with `runbook:api rev ?`.

| time | beat | evidence |
|---|---|---|
| 0–8 s | both stores begin at revision 1 | both cards `rev 1 · step 4`; `=` between them (≈ 4.6 s) |
| 8–19 s | an editor saves revision 2; the cached copy is unchanged | editor `save rev 2`; a `rev 2` chip goes to the database only (≈ 9.6 s); database `rev 2 · step 6` with `rev 1 · step 4` dimmed below; editor `saved`; cache row outlined amber, `step 4` amber, tag `unchanged`; `=` → `≠` (≈ 10.9 s) |
| 19–26 s | the next lookup checks the cache and still finds revision 1 | application `checking cache`; a `runbook:api` chip goes to the cache; `HIT · key found` in green (≈ 21 s) |
| 26–43 s | the old copy returns successfully; a hit does not mean fresh | `rev 1 · step 4` chip returns (≈ 27 s); application `runbook:api rev 1 · step 4`, `received`; `hit ≠ fresh` (≈ 31 s); hold and fade |

**Public (28 s).** `APPLICATION`, `CACHE revision 1`, `DATABASE revision 1` stacked; the database turns green `revision 2` (7 s); a `READ` chip reaches the cache, which shows `HIT: revision 1`; an `r1` chip returns and the application turns red with `old revision`; captions per beat.

## Scores (1–5)

| criterion | candidate | public | concrete difference |
|---|---|---|---|
| causal clarity | 5 | 3.5 | Candidate shows the editor's write path touching only the database, the cache tagged `unchanged`, and `=` becoming `≠` before the lookup; the hit then succeeds with visibly older content (`step 4` vs `step 6`). Public changes the database label and then the application colour, leaving the separation in captions. |
| accuracy | 5 | 4 | Candidate keeps the hit green and `received`, so success and staleness coexist, matching "a successful hit can still return stale data". Public colours the application red, implying failure. |
| pacing | 4.5 | 3 | Events 0.6–1.3 s apart; ≈ 8 s hold after the write so the unchanged cache registers; ≈ 10 s final hold, slightly long. Public's caption blocks are mostly static. |
| legibility at 350 px | 4.5 | 3.5 | Card rows, `unchanged`, `=`/`≠`, `HIT · key found`, the returned value and `hit ≠ fresh` read at native 350; the `key runbook:api` label is the smallest text. Public labels are small. |
| meaningful variety | 4.5 | 1.5 | Revision histories with a write path and an agreement mark suit staleness and differ from lessons 01–03. Public reuses stacked boxes with captions. |

## Objective checks

| check | candidate | public |
|---|---|---|
| full decode (`-xerror`) | clean | clean |
| atom order | ftyp, moov, free, mdat | same |
| audio peak | −7.1 dB (below −0.5 dB) | −12.5 dB |
| loudest events | database stores rev 2 (9.6 s), lookup reaches cache (20.7 s), both −7.1 dB | n/a |
| sound on visible events | onsets for the intro and `=` (0.8–4.6 s), the save and `≠` (8.4–13.2 s), the lookup and hit (19.5–21.5 s), the return (26.5–27.8 s), `hit ≠ fresh` (30.0–32.0 s, soft); no cache cue during the write | five onsets |
| clipping, overlap, off-stage | none found | none found |
| stillness beyond 3 s outside holds | none | static caption blocks |
| ending | finite, hold then fade | ends on caption frame |

## Optional improvements (not blockers)

1. **Shorten the final hold.** About 10 s of final state before the fade; 6–8 s would be enough.
2. **Enlarge the `key runbook:api` label.** It is the smallest text at 350 px and names the key both stores share.
3. **Note in the write-up that expiry is not a consistency guarantee**, and that acting on operational instructions should include an authoritative revision check, as the concept recommends.

## Scratch evidence

`video/cache-aside/motion-v2/reviews/scratch/04/`: hash files, 1 fps 350 px frames for both cuts, tiled sheets, native 350 seek frames, and the candidate spectrogram.

