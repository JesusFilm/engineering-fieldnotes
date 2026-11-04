# Queues and backpressure lesson 02 — Finish a job: comparison review

Comparison of the encoded motion-v2 candidate against the public lesson, judged against `video/queues-and-backpressure/sequence/lessons.json` item 2. This reviewer wrote an earlier planning document for this lesson, and the candidate's geometry (a `waiting` → `running` → `completed` state machine with a job token, a worker step list `run check` / `save result` / `mark complete`) closely resembles it; that context is acknowledged, and the candidate is judged against the lesson rather than plan fidelity. No authoring source, scene file, production metadata or self-review of the candidate was read before or during this encoded inspection. Model identity is not considered.

## Files and hashes

| file | SHA-256 (before = after) | duration | video | audio |
|---|---|---|---|---|
| candidate `video/queues-and-backpressure/motion-v2/02/video.mp4` | `6a59cef148a5b654630874571a07b059df3fa222d09c2da1b959b82917462fa7` | 38.0 s | h264 1080×1920, 30 fps, 1140 frames | aac |
| public `public/lessons/queues-and-backpressure/02.mp4` | `87b6c625598ab4f91e252ee545849ea1ace5cc99e73e57c69fef172bfb797f6e` | 28.0 s | h264 1080×1920, 20 fps, 560 frames | aac |

Hashes were recorded before inspection (`scratch/02/hash-before.txt`) and after (`scratch/02/hash-after.txt`); they are identical. No media was modified.

## Recommendation

**Recommend the candidate.** It shows three distinct states with a single `job A` token (`replay: job A from waiting`), and a worker whose steps make completion conditional: `1 run check` fills and reads `ok`, `2 save result` reads `saved` with `result: 0 broken links`, and only then is `3 mark complete` enabled and `done`; the `job A record` changes from `complete not yet` to `complete ✓` and the token moves to `completed`. The public cut is accurate but shows a queue and worker box with captions, and its completion is a status word change. Decision: `pass`, no blockers.

## Method

- One frame per second from each file at 350 px wide (`scratch/02/cand350/`, `pub350/`), tiled (`c1.png`, `c13.png`, `c25.png`, `c37.png`, `p1–p2.png`).
- Individual native 350 px frames by accurate seek at 10.6, 16.0, 22.4, 27.2 and 30.0 s (`t350/`, `t350_a.png`), viewed at native size.
- Frame-number select of frames 780–870 every 10 frames (26.0–29.0 s) to confirm the order of `mark complete`, the record update and the token's move (`full/`, `sel_finish.png`).
- Whole-file decode with `-xerror` for both files; atom order; `volumedetect` overall and per event; `silencedetect` onsets; candidate spectrogram (`cand_spec.png`).
- **Audio was analysed only, not heard.**

## What each cut shows

**Candidate (38.0 s).** Title `Finish a job`, subtitle `QUEUES · LESSON 2`. A state row (`waiting in queue`, `running at worker`, `completed recorded`, joined by `take` and dashed `finish` arrows), a `Worker` panel with three numbered steps and a `result:` line, and a `job A record` with a `complete` field.

| time | beat | evidence |
|---|---|---|
| 0–8 s | replay job A from its waiting state; no work yet | token in `waiting`; worker `idle`; steps dim; `result: —`; record `complete not yet` (pulsed ≈ 5 s) |
| 8–11 s | the worker takes job A; execution starts after it arrives | token moves along `take` to `running` (amber); worker `working`; step 1 outlined |
| 11–21 s | the worker executes the job; leaving the queue did not finish it | `1 run check` bar fills with work ticks (≈ 11–19 s); record still `not yet` (pulsed ≈ 15 s); `ok` (≈ 19 s); `2 save result` `saved`, `result: 0 broken links` (≈ 21 s); step 3 brightens |
| 24–29 s | the work finishes; now the job can be marked complete | `3 mark complete` outlined, then `done`; record `complete ✓` (≈ 26.7 s); `finish` arrow lights and the token moves to `completed` (≈ 27.5–28.5 s); worker `done` (loudest cue, 28.6 s) |
| 29–38 s | hold and fade | final state; fade |

**Public (28 s).** `QUEUE` and `WORKER` boxes; a `JOB A` chip moves from queue to worker; worker `running` with a progress line; then `completed`; captions per beat.

## Scores (1–5)

| criterion | candidate | public | concrete difference |
|---|---|---|---|
| causal clarity | 5 | 3.5 | Candidate shows why completion waits: the check and the saved result come first, and `mark complete` stays dim until then. Public shows running then completed, with the reasoning in captions. |
| accuracy | 4.5 | 4.5 | Candidate's order matches "completion only after the work succeeds" and records the result before marking complete. The record turns `complete ✓` about 1 s before the token reaches the `completed` state (see below), a small inconsistency in timing, not in meaning. Public is accurate but abstract. |
| pacing | 4.5 | 3.5 | ≈ 8 s of visible work with ticks; holds after the take, after saving and after completion; ≈ 9 s final hold. Public holds 7 s caption blocks. |
| legibility at 350 px | 4.5 | 3.5 | State labels and sublabels, `take`/`finish`, the token, steps and results, the result line and the record read at native 350; the state sublabels (`in queue`, `at worker`, `recorded`) are the smallest text. Public box text is small. |
| meaningful variety | 5 | 2 | A state machine plus conditional steps differs from lesson 01's location view and suits "different states". Public reuses two boxes with captions. |

## Objective checks

| check | candidate | public |
|---|---|---|
| full decode (`-xerror`) | clean | clean |
| atom order | ftyp, moov, free, mdat | same |
| audio peak | −5.9 dB at completion (28.6 s), below −0.5 dB | −9.4 dB |
| sound on visible events | onsets for the intro (1.2–4.6 s), the take (8.0–9.2 s), work ticks every ≈ 0.85 s (10.4–18.85 s), check ok and save (19.9–21.6 s), mark complete, record and finish (24.8–28.6 s) | sparse |
| clipping, overlap, off-stage | none found | none found |
| stillness beyond 3 s outside holds | none | caption blocks |
| ending | finite, hold then fade | ends on caption frame |

## Investigated item (not a defect)

- **Record `complete ✓` before the token reaches `completed`.** Accurate seeks and frame selection (frames 780–870) agree: `3 mark complete` shows `done` and the record shows `complete ✓` at ≈ 26.7 s, while the token is still in `running` until ≈ 27.5 s and arrives in `completed` by ≈ 28.5 s. Marking complete is the act that records completion, so the record changing first is defensible; the ≈ 1 s gap is listed below as a refinement.

## Optional improvements (not blockers)

1. **Move the token to `completed` together with the record update** (≈ 26.7 s), so the state machine and the record never disagree.
2. **Enlarge the state sublabels** (`in queue`, `at worker`, `recorded`), the smallest text at 350 px.
3. **Note in the write-up** that acknowledging after saving still allows a duplicate if the worker fails in between, so externally visible effects need an idempotency strategy.

## Scratch evidence

`video/queues-and-backpressure/motion-v2/reviews/scratch/02/`: hash files, 1 fps 350 px frames for both cuts, tiled sheets, native 350 seek frames, the frame-number strip through completion, and the candidate spectrogram.

