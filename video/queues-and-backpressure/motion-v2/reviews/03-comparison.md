# Queues and backpressure lesson 03 — A backlog grows: comparison review

Comparison of the encoded motion-v2 candidate against the public lesson, judged against `video/queues-and-backpressure/sequence/lessons.json` item 3. This reviewer wrote an earlier planning document for this lesson, and the candidate's geometry (a producer → open queue lane → one worker pipeline, `arrived` / `waiting` / `completed` counters and a `waiting over time` step chart with B, C, D marks) closely resembles it; that context is acknowledged, and the candidate is judged against the lesson rather than plan fidelity. No authoring source, scene file, production metadata or self-review of the candidate was read before or during this encoded inspection. Model identity is not considered.

## Files and hashes

| file | SHA-256 (before = after) | duration | video | audio |
|---|---|---|---|---|
| candidate `video/queues-and-backpressure/motion-v2/03/video.mp4` | `c51105bf249893e96eaf99cdd5434b80a00b9c8781da4b7c54c2ca6d0bb90ddd` | 39.6 s | h264 1080×1920, 30 fps, 1188 frames | aac |
| public `public/lessons/queues-and-backpressure/03.mp4` | `767678b8809e8410a6f5538e333a84faf55da1022ea4b8417cadcacfbb95272c` | 28.0 s | h264 1080×1920, 20 fps, 560 frames | aac |

Hashes were recorded before inspection (`scratch/03/hash-before.txt`) and after (`scratch/03/hash-after.txt`); they are identical. No media was modified.

## Recommendation

**Recommend the candidate.** With one worker `running A` and a progress bar that barely moves, B, C and D arrive and line up front to back in the queue; `arrived` climbs 1 → 4, `waiting` 0 → 3, `completed` stays 0, and a `waiting over time` step chart rises once per arrival with B, C, D marks. The queue lane has no slot count, so the cut does not pre-empt lesson 04's bounded queue. The public cut is accurate but shows a text list (`B, C, D waiting`) in a box and turns the queue red at the end, which can suggest a failure or a full queue the lesson does not describe. Decision: `pass`, no blockers.

## Method

- One frame per second from each file at 350 px wide (`scratch/03/cand350/`, `pub350/`), tiled (`c1.png`, `c13.png`, `c25.png`, `c37.png`, `p1–p2.png`).
- Individual native 350 px frames by accurate seek at 10.6, 26.0 and 32.0 s (`t350/`, `t350_a.png`), viewed at native size.
- Whole-file decode with `-xerror` for both files; atom order; `volumedetect` overall and per event; `silencedetect` onsets; candidate spectrogram (`cand_spec.png`).
- **Audio was analysed only, not heard.**

## What each cut shows

**Candidate (39.6 s).** Title `A backlog grows`, subtitle `QUEUES · LESSON 3`, context `new scenario · 1 worker`. A `producer` box, a `queue` lane marked `back` and `front`, a `worker` with `A`, a progress line and `running A`; counters `arrived`, `waiting`, `completed`; a `waiting over time` chart with 0–3 ticks.

| time | beat | evidence |
|---|---|---|
| 0–7 s | new scenario: the worker is running A; more jobs arrive while it is busy | A in the worker, `running A`, slow progress line; `arrived 1 · waiting 0 · completed 0`; chart flat at 0 |
| 7–14 s | B waits behind the running job | B appears at the producer, moves to the front of the queue (≈ 9 s); `arrived 2`, `waiting 1`; chart steps to 1 under `B`; worker still on A |
| 14–22 s | C arrives before A finishes; it joins B | C joins behind B (≈ 17 s); `arrived 3`, `waiting 2`; chart steps to 2 under `C` |
| 22–30 s | D arrives too; the backlog grows | D joins behind C (≈ 25 s); `arrived 4`, `waiting 3`; chart steps to 3 under `D`; `completed 0` highlighted (≈ 26.8 s) |
| 30–39.6 s | hold and fade | chart continues flat at 3; A's bar still short; fade |

**Public (28 s).** `PRODUCER`, `QUEUE` and `WORKER` stacked; `JOB B`, `JOB C`, `JOB D` chips move into the queue, which reads `B waiting`, `B, C waiting`, `B, C, D waiting` and turns red; worker `A running` with a progress line; captions per beat.

## Scores (1–5)

| criterion | candidate | public | concrete difference |
|---|---|---|---|
| causal clarity | 5 | 3.5 | Candidate makes "arrivals exceed completions" measurable: two counters diverge and the chart climbs one step per arrival while the worker stays on A. Public lists waiting jobs as text and states the comparison in a caption. |
| accuracy | 5 | 4 | Candidate keeps the queue unbounded on screen and shows no failure. Public's red queue border at D implies an error or full state not in this lesson. |
| pacing | 4.5 | 3 | Arrivals ≈ 8 s apart with a hold after each; steady work ticks; ≈ 9 s final hold. Public holds 7 s caption blocks. |
| legibility at 350 px | 4.5 | 3.5 | Counters, job letters, chart ticks and marks, `running A` read clearly at native 350; `back` / `front` and `new scenario · 1 worker` are the smallest text but readable. Public box text is small. |
| meaningful variety | 5 | 2 | Counters plus a depth-over-time chart are new in this chapter and suit a rate comparison. Public reuses three stacked boxes with captions. |

## Objective checks

| check | candidate | public |
|---|---|---|
| full decode (`-xerror`) | clean | clean |
| atom order | ftyp, moov, free, mdat | same |
| audio peak | −6.0 dB (below −0.5 dB) | −12.5 dB |
| loudest events | B, C, D join the queue (9.0, 17.0, 25.0 s, ≈ −6 dB) | n/a |
| sound on visible events | onsets for each arrival (7.8–10.6, 15.8–18.6, 23.8–25.0 s), `completed 0` (26.8 s), and regular work ticks every ≈ 2 s throughout | sparse |
| clipping, overlap, off-stage | none found | none found |
| stillness beyond 3 s outside holds | none; work ticks and the chart's advancing line continue | caption blocks |
| ending | finite, hold then fade | ends on caption frame |

## Optional improvements (not blockers)

1. **Pulse the counters' gap at the end.** `completed 0` is highlighted, but pairing it with `arrived 4` (e.g. both highlighted together) would state "arrivals exceed completions" in one look.
2. **Enlarge `back` / `front`.** They tell the viewer which end the worker takes from, but are the smallest labels at 350 px.
3. **Note in the write-up** that depth counts jobs, not cost or age; the concept recommends tracking oldest waiting age and completion rate alongside depth.

## Scratch evidence

`video/queues-and-backpressure/motion-v2/reviews/scratch/03/`: hash files, 1 fps 350 px frames for both cuts, tiled sheets, native 350 seek frames, and the candidate spectrogram.

