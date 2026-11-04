# Load balancing lesson 05 — Look at active work: comparison review

Comparison of the encoded motion-v2 candidate against the public lesson, judged against `video/load-balancing/sequence/lessons.json` item 5. This reviewer wrote an earlier planning document for this lesson, and the candidate's geometry (a `least requests` balancer with an `active` count table, two server lanes below, `fewer` and `stays on A` marks) closely resembles it; that context is acknowledged, and the candidate is judged against the lesson rather than plan fidelity. No authoring source, scene file, production metadata or self-review of the candidate was read before or during this encoded inspection. Model identity is not considered.

## Files and hashes

| file | SHA-256 (before = after) | duration | video | audio |
|---|---|---|---|---|
| candidate `video/load-balancing/motion-v2/05/video.mp4` | `2db361381411c7b3c0b48c6e56edcd92f35f526effeb0b451c15590c55679ed1` | 36.1 s | h264 1080×1920, 30 fps, 1083 frames | aac |
| public `public/lessons/load-balancing/05.mp4` | `a0b1bdf7dc01a0fae80974afece3d021396eecb096c39626cb7a23c6c38cf50d` | 36.0 s | h264 1080×1920, 24 fps, 864 frames | aac |

Hashes were recorded before inspection (`scratch/05/hash-before.txt`) and after (`scratch/05/hash-after.txt`); they are identical. No media was modified.

## Recommendation

**Recommend the candidate.** It shows least requests as a decision made from a visible table: with `req 1 · report` running on A, the `active` column reads A `1`, B `0`; when `req 2 · lookup` arrives, both counts are outlined, `fewer` appears beside B, and only then does the request travel to B, whose count rises to `1` and falls to `0` when it is done. A's report never moves, and `stays on A` closes the question. The public cut is accurate but carries the comparison and the "no move" answer in captions under count labels. Decision: `pass`, no blockers.

## Method

- One frame per second from each file at 350 px wide (`scratch/05/cand350/`, `pub350/`), tiled (`c1.png`, `c13.png`, `c25.png`, `p1–p2.png`).
- Individual native 350 px frames by accurate seek at 10.8, 13.4, 14.6, 21.6 and 28.6 s (`t350/`, `t350_a.png`), viewed at native size.
- Whole-file decode with `-xerror` for both files; atom order; `volumedetect` overall and per event; `silencedetect` onsets; candidate spectrogram (`cand_spec.png`).
- **Audio was analysed only, not heard.**

## What each cut shows

**Candidate (36.1 s).** Title `Look at active work`, subtitle `LEAST REQUESTS`. An `app` box; a `load balancer · least requests` panel with a `server / active` table; `server A` and `server B` lanes, each with a state and a run slot with progress.

| time | beat | evidence |
|---|---|---|
| 0–8 s | A has one active request; B has none | A `running` with `req 1 · report` and a partly filled bar; B `idle`; table A `1`, B `0`; A's lane and count pulse together, then B's |
| 8–14 s | compare current active counts | `req 2 · lookup` badge on the balancer; A's count outlined (≈ 10.3 s), then B's (≈ 11.3 s); B's row turns green with `fewer` (≈ 13.4 s) |
| 14–21 s | the new request goes to B | a dot travels down the left edge to B (≈ 14.6 s); B's count `1`; B `running req 2 · lookup`; A's report keeps advancing |
| 21–25 s | B finishes while A continues | B `done`, `req 2 · done`; B's count back to `0`; B returns to `idle` |
| 25–36.1 s | selection changes new assignments only | A's count and lane pulse; `stays on A` appears above A's lane with a check (≈ 28 s); counts pulse; hold and fade |

**Public (36 s).** `APPLICATION`, `LOAD BALANCER`, `SERVER A`, `SERVER B` with `N ACTIVE` labels and progress bars; a `REQUEST` chip goes to B; captions explain each beat ("Least requests compares active counts. A has 1. B has 0. Choose B.", "A keeps working on its original job.", "Counts help; they do not measure cost.").

## Scores (1–5)

| criterion | candidate | public | concrete difference |
|---|---|---|---|
| causal clarity | 5 | 3.5 | Candidate makes the rule's input (the count table), the comparison (outlines, `fewer`) and the effect (count changes tied to B's slot) visible in order; `stays on A` answers the lesson's question on screen. Public shows counts under each server and a chip to B, with the reasoning in captions. |
| accuracy | 4.5 | 4.5 | Candidate's counts change exactly with B's start and finish; A keeps its request; no cost gauge implies the balancer knows work size. It does not mention that real implementations may sample candidates or that counts can mislead (write-up material; the public cut's "Counts help; they do not measure cost" caption covers the second point). |
| pacing | 4.5 | 3.5 | Compare step ≈ 3 s, B's job ≈ 7 s, holds after each beat, ≈ 7 s final hold. Public is paced by caption blocks with long static stretches. |
| legibility at 350 px | 4.5 | 4 | Table headers, counts, `fewer`, lane names, slot text and `stays on A` read at native 350; `fewer` is dim green and the smallest emphasis. Public's `N ACTIVE` labels are small. |
| meaningful variety | 4.5 | 2 | A balancer-centred count table with horizontal lanes differs from lesson 04's tall columns and suits a count-based rule. Public reuses the generic layout. |

## Objective checks

| check | candidate | public |
|---|---|---|
| full decode (`-xerror`) | clean | clean |
| atom order | ftyp, moov, free, mdat | same |
| audio peak | −6.8 dB (below −0.5 dB) | −9.0 dB |
| loudest events | request travels to B (15.5 s, −6.8 dB) and the second compare outline (11.3 s, −7.3 dB) | n/a |
| sound on visible events | onsets 1.2–4.4 s (intro pulses), 7.5–8.1 s (`req 2` arrives), 9.2–13.6 s (compare A, compare B, `fewer`), 15.5–21.3 s (to B, work), 22.0–23.3 s (B done), 25.2–33.2 s (final pulses and `stays on A`) | sparse |
| clipping, overlap, off-stage | none found | none found |
| stillness beyond 3 s outside holds | none; A's bar keeps advancing | caption blocks |
| ending | finite, hold then fade | ends on caption frame |

## Optional improvements (not blockers)

1. **Brighten `fewer`.** It is dim green beside B's count (≈ 13.4–14 s) and is the decision word; full-strength green would read faster on a phone.
2. **Label the travelling request.** The request reaches B as an unlabelled dot down the left edge; carrying `req 2` would tie it to the balancer badge.
3. **Note limits in the write-up.** Envoy's least-request policy samples candidates rather than scanning all hosts, and active counts do not measure cost; fast errors or other clients can make a low count misleading.

## Scratch evidence

`video/load-balancing/motion-v2/reviews/scratch/05/`: hash files, 1 fps 350 px frames for both cuts, tiled sheets, native 350 seek frames, a full-resolution frame, and the candidate spectrogram.

