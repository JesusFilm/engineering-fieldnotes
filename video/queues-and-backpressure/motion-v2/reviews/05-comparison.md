# Queues and backpressure lesson 05 — Choose an overload policy: comparison review

Comparison of the encoded motion-v2 candidate against the public lesson, judged against `video/queues-and-backpressure/sequence/lessons.json` item 5. This reviewer wrote an earlier planning document for this lesson, and the candidate's geometry (producer and queue side by side with a `when full: wait · reject · drop` setting, a returned `rejected / queue full` result, a `producer outcomes` log) closely resembles it; that context is acknowledged, and the candidate is judged against the lesson rather than plan fidelity. No authoring source, scene file, production metadata or self-review of the candidate was read before or during this encoded inspection. Model identity is not considered.

## Files and hashes

| file | SHA-256 (before = after) | duration | video | audio |
|---|---|---|---|---|
| candidate `video/queues-and-backpressure/motion-v2/05/video.mp4` | `c36a538ba5c6cfafb014439f1580820e89cbb4858d0b89260cdfe3b69bfe9efa` | 38.0 s | h264 1080×1920, 30 fps, 1140 frames | aac |
| public `public/lessons/queues-and-backpressure/05.mp4` | `acfe2bc464fce5982236b27507355e8bb0d5dfbb272fd92c0aa65f39b2778546` | 28.0 s | h264 1080×1920, 20 fps, 560 frames | aac |

Hashes were recorded before inspection (`scratch/05/hash-before.txt`) and after (`scratch/05/hash-after.txt`); they are identical. No media was modified.

## Recommendation

**Recommend the candidate.** It shows the overload policy as an explicit setting (`when full: wait [reject] drop`) on a `3 / 3 full` queue (C, D, E), a `submit(F)` call that goes `calling…`, a returned `rejected / queue full` result that the producer receives (`got result`), and a `producer outcomes` log that adds `F rejected · not admitted` and `F reported to caller` below the earlier `E accepted`. The queue keeps C, D, E throughout, so F was never admitted. The public cut is accurate but shows status words in boxes and a red producer outline, without naming the policy or recording outcomes. Decision: `pass`, no blockers.

## Method

- One frame per second from each file at 350 px wide (`scratch/05/cand350/`, `pub350/`), tiled (`c1.png`, `c13.png`, `c25.png`, `c37.png`, `p1–p2.png`).
- Individual native 350 px frames by accurate seek at 12.4, 17.4, 23.4 and 30.0 s (`t350/`, `t350_a.png`), viewed at native size.
- Frame-number select of frames 435–510 every 8 frames (14.5–17.0 s) to check how the rejection returns to the producer (`full/`, `sel_return.png`).
- Whole-file decode with `-xerror` for both files; atom order; `volumedetect` overall and per event; `silencedetect` onsets; candidate spectrogram (`cand_spec.png`).
- **Audio was analysed only, not heard.**

## What each cut shows

**Candidate (38.0 s).** Title `Overload policy`, subtitle `QUEUES · LESSON 5`. A `producer` panel (F chip, `submit(F)`, state, returned result), a `queue` panel (`3 / 3 full`, `when full:` options, places C, D, E), a `worker` (`running B`) and a `producer outcomes` log.

| time | beat | evidence |
|---|---|---|
| 0–9 s | the queue is full again; this policy rejects new submissions | `3 / 3 full`; places C, D, E pulse; `when full: wait reject drop` appears with `reject` outlined (≈ 5 s); log `E accepted` |
| 9–15 s | the producer asks to submit; no waiting place is available | `submit(F)` brightens; producer `calling…`; a call dot crosses to the queue; places outlined in turn; `3 / 3 full` amber |
| 15–22 s | the queue reports rejection; the producer must handle it | a small red dot travels from the queue back to the producer (≈ 15.5–16.8 s, confirmed by frame selection); the `rejected / queue full` result appears in the producer (≈ 16.9 s, loudest cue −5.5 dB); producer `got result`; log `F rejected · not admitted` (≈ 20 s) |
| 22–30 s | the rejected job was not admitted; make the policy explicit | log `F reported to caller`; producer `reported`; places still C, D, E (pulsed ≈ 25 s); `E accepted` and `F rejected` rows pulse; `wait` / `reject` / `drop` pulse |
| 30–38 s | hold and fade | final state; fade |

**Public (28 s).** `PRODUCER new job`, `BOUNDED QUEUE full`, `WORKER busy`; a `SUBMIT` chip goes to the queue; a `REJECTED` chip returns; producer `not accepted` with a red outline; captions per beat.

## Scores (1–5)

| criterion | candidate | public | concrete difference |
|---|---|---|---|
| causal clarity | 5 | 3.5 | Candidate makes the policy a visible setting, shows the call and the returned result, and records the outcome next to an earlier acceptance. Public shows the same call and response but leaves policy choice and handling to captions. |
| accuracy | 5 | 4.5 | Candidate keeps F out of the queue, treats rejection as a returned result the producer handles, and names wait and drop as other policies without playing them. Public is accurate; it does not show what the producer does with the result. |
| pacing | 4.5 | 3 | Events 0.6–1.6 s apart; holds after the policy, after the result and after the log; ≈ 8 s final hold. Public holds 7 s caption blocks. |
| legibility at 350 px | 4.5 | 3.5 | Panel titles, `submit(F)`, states, `3 / 3 full`, the policy options, the result and log rows read at native 350; `when full:` and `queue full` are the smallest text. Public box text is small. |
| meaningful variety | 5 | 2 | A call/response with a policy setting and an outcome log differs from lessons 01–04 and suits "make the policy explicit". Public reuses three stacked boxes with captions. |

## Objective checks

| check | candidate | public |
|---|---|---|
| full decode (`-xerror`) | clean | clean |
| atom order | ftyp, moov, free, mdat | same |
| audio peak | −5.5 dB at the returned rejection (16.9 s), below −0.5 dB | −13.8 dB |
| sound on visible events | onsets for the full places (1.0–3.0 s), the policy (4.2–6.2 s), the call and place checks (9.0–12.2 s), the result (16.0–16.9 s), log rows and `reported` (20.2–22.5 s), final pulses (25.0–29.8 s), and quiet worker ticks | sparse |
| clipping, overlap, off-stage | none found | none found |
| stillness beyond 3 s outside holds | none | caption blocks |
| ending | finite, hold then fade | ends on caption frame |

## Optional improvements (not blockers)

1. **Label the returning rejection.** A small unlabelled red dot carries the rejection back to the producer (≈ 15.5–16.8 s) before the result chip appears; carrying `rejected` on that motion would make "the queue reports rejection" read as a response at phone size.
2. **Soften the producer's red outline.** Rejection is a handled result, and the red panel border during `got result` can suggest the producer failed; an amber border with the red result chip would keep that distinction.
3. **Note in the write-up** that retries after rejection need back-off and a limit, and that RabbitMQ's default overflow drops the oldest messages unless a reject policy is configured.

## Scratch evidence

`video/queues-and-backpressure/motion-v2/reviews/scratch/05/`: hash files, 1 fps 350 px frames for both cuts, tiled sheets, native 350 seek frames, and the candidate spectrogram.

