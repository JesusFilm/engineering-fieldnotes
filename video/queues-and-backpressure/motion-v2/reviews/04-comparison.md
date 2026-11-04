# Queues and backpressure lesson 04 — A full queue pushes back: comparison review

Comparison of the encoded motion-v2 candidate against the public lesson, judged against `video/queues-and-backpressure/sequence/lessons.json` item 4. This reviewer wrote an earlier planning document for this lesson, and the candidate's geometry (a producer panel with `await put(E)`, a dashed `F not created`, a three-place queue with a `3 / 3 full` readout, a worker, and a `job E record`) closely resembles it; that context is acknowledged, and the candidate is judged against the lesson rather than plan fidelity. No authoring source, scene file, production metadata or self-review of the candidate was read before or during this encoded inspection. Model identity is not considered.

## Files and hashes

| file | SHA-256 (before = after) | duration | video | audio |
|---|---|---|---|---|
| candidate `video/queues-and-backpressure/motion-v2/04/video.mp4` | `c4698882a5eab09af94992aebc43258c72743fcf4773fdebedd74eef24a82c80` | 42.0 s | h264 1080×1920, 30 fps, 1260 frames | aac |
| public `public/lessons/queues-and-backpressure/04.mp4` | `124cdbd6038699df721bd63c7b261875749ed3b4e1f72d4746307fb73a6dd6aa` | 28.0 s | h264 1080×1920, 20 fps, 560 frames | aac |

Hashes were recorded before inspection (`scratch/04/hash-before.txt`) and after (`scratch/04/hash-after.txt`); they are identical. No media was modified.

## Recommendation

**Recommend the candidate.** It shows blocking admission at the producer: with `queue 3 / 3 full` (B, C, D) and the worker `running A`, the producer's `await put(E)` turns `waiting` and the next job `F` stays `not created`, so the pressure is visible upstream. Only after `A done` and B moving to the worker does the readout show `2 / 3`, after which E enters the free place, the producer reads `accepted`, and the `job E record` shows `accepted ✓` with `complete not yet`. F then becomes `next`. The public cut is accurate but carries the mechanism in captions and status text, and outlines the waiting producer in red, which can read as an error. Decision: `pass`, no blockers.

## Method

- One frame per second from each file at 350 px wide (`scratch/04/cand350/`, `pub350/`), tiled (`c1.png`, `c13.png`, `c25.png`, `c37.png`, `p1–p2.png`).
- Individual native 350 px frames by accurate seek at 12.0, 24.0, 30.6 and 34.6 s (`t350/`, `t350_a.png`), viewed at native size.
- Whole-file decode with `-xerror` for both files; atom order; `volumedetect` overall and per event; `silencedetect` onsets; candidate spectrogram (`cand_spec.png`).
- **Audio was analysed only, not heard.**

## What each cut shows

**Candidate (42.0 s).** Title `A full queue`, subtitle `PUSHES BACK · QUEUES 4`. A `producer` panel (`await put(E)`, state, F and E chips), a `queue` with three places and a readout, a `worker` with a job chip, progress bar and state, and a `job E record` (`accepted`, `complete`).

| time | beat | evidence |
|---|---|---|
| 0–8 s | all three waiting places are full; E is still with the producer | B, C, D in the three places; `3 / 3 full`; worker `running A`; producer `ready` with E and a dashed `F not created`; places pulse in turn |
| 8–20 s | admission waits at the producer; E does not enter the full queue | the producer's link becomes a dashed stub; producer `waiting` (amber) from ≈ 9 s; E stays in the producer; `3 / 3 full` amber; F still `not created`; A's bar advances |
| 20–25 s | the worker finishes A, then takes B; one place becomes free | worker `A done` (≈ 20 s); B moves from place 1 into the worker; C and D shift forward; readout `2 / 3` (≈ 23–24 s); worker `running B` |
| 25–42 s | E can now enter; it is accepted, not yet completed | an empty dashed third place; E drops into it (≈ 29 s); readout `3 / 3 full`; producer `accepted` (green); record `accepted ✓` (≈ 30 s), then `complete not yet` highlighted (≈ 32 s); F becomes `next`; hold and fade |

**Public (28 s).** `PRODUCER`, `QUEUE` and `WORKER` boxes; producer `E ready`, then `waiting to submit` with a red outline; worker `A completed`, a `JOB B` chip to the worker, queue `C, D waiting`; a `JOB E` chip enters; producer `submitted`, queue `C, D, E: full`; captions per beat.

## Scores (1–5)

| criterion | candidate | public | concrete difference |
|---|---|---|---|
| causal clarity | 5 | 3.5 | Candidate shows the blocked call (`await put(E)` `waiting`), its upstream effect (`F not created`) and the release caused by downstream work (`A done` → `2 / 3`). Public shows the same order with status text and captions. |
| accuracy | 5 | 4 | Candidate keeps waiting distinct from failure (amber, not red), ends with `accepted` but `complete not yet`, and shows no drop. Public outlines the waiting producer in red, suggesting an error rather than a deliberate wait. |
| pacing | 4.5 | 3.5 | ≈ 11 s blocked stretch with A's bar visibly advancing; holds after release and acceptance; ≈ 8 s final hold. Public holds 7 s caption blocks. |
| legibility at 350 px | 4.5 | 3.5 | `await put(E)`, producer state, readout, job letters, worker state and record rows read at native 350; `not created` / `next` under F are the smallest text. Public box text is small. |
| meaningful variety | 5 | 2 | A blocked producer call and an uncreated next job are new in this chapter and suit backpressure. Public reuses three stacked boxes with captions. |

## Objective checks

| check | candidate | public |
|---|---|---|
| full decode (`-xerror`) | clean | clean |
| atom order | ftyp, moov, free, mdat | same |
| audio peak | −7.0 dB (below −0.5 dB) | −9.0 dB |
| loudest events | E enters and is accepted (29.6–30.3 s), B taken (24.2 s) | n/a |
| sound on visible events | onsets for the full places (1.2–4.2 s), the blocked put (7.2–8.7 s), regular ticks during the wait (≈ every 1.5 s, 10.2–19.2 s), A done and B taken (20.0–25.8 s), E enters and record (28.4–33.6 s), work ticks to the end | sparse |
| clipping, overlap, off-stage | none found | none found |
| stillness beyond 3 s outside holds | none | caption blocks |
| ending | finite, hold then fade | ends on caption frame |

## Optional improvements (not blockers)

1. **Update the worker state with B's arrival.** At ≈ 24 s B sits in the worker while the state still reads `A done`; switching to `running B` as B lands would avoid a brief mismatch.
2. **Enlarge `not created` / `next` under F.** They carry the upstream effect but are the smallest text at 350 px.
3. **Note in the write-up** that real producers usually need a deadline on `put`, and that many tasks each awaiting `put` would move the backlog outside the queue.

## Scratch evidence

`video/queues-and-backpressure/motion-v2/reviews/scratch/04/`: hash files, 1 fps 350 px frames for both cuts, tiled sheets, native 350 seek frames, and the candidate spectrogram.

