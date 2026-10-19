# Bound the backlog — final review

Reviewed 19 October 2026 NZDT (automated verification completed 18 October 2026 23:47:47 UTC). Self-review of the encoded cut; no subagent or independent comparative reviewer. Final media SHA-256: `c5e6125c6a1eb3ab8a1d83308f3e0966b6caa4da04bf88270e083279df62990b`. Poster SHA-256: `b6541023899d1215fc0129e053b7a56810583c4d6d50bd78c945d0c5107dd3fd`.

## Fixed before handover

- **2.5 s / 14.5 s — packet/header collision.** The initial vertical admission route crossed the waiting-count label. Moved admissions around the right edge and into the correct empty cell; moved the illustrative-limits label above intake. Revised source stills were inspected before the next movie.
- **17.25 s — rejection marker on gate text.** Moved the rejection ripple to the gate's left edge, leaving the short state label readable.
- **6.65 s and 22.15–22.95 s — stale completion state.** The first encode left the previous task's DONE label under the next arriving task. Reset the runner to IDLE and clear its progress bar after the ACK reaches the queue, before the next task arrives.
- **29.97 s — compressed loop mismatch.** First encode failed exact decoded RGB equality. The rounded timestamp for the forced final keyframe lay beyond the final frame. Switched to frame-number keyframe selection with equal-QP intra frames. Final first/last RGB SHA-256 is `b0b1b5d12b71256a20693a87ad1e3a5512930d9647be591d3c75bff011152bbd` for both frames.
- **22.35 s — ambiguous dequeue origin.** In the second encode, C left below the middle cell, where E was visible after compaction. Routed every dequeue from the first cell before turning toward the runner. Final encoded transition and beat frames show the corrected FIFO origin.

## Teaching improvements applied, ranked

1. **Show the separate bound** (7.4–19.2 s, M). One busy runner stays at 1/1 while three queued tasks accumulate. The closed gate and F's return path establish why limiting execution alone does not bound waiting work.
2. **Make freed space causal** (21–25.3 s, M). ACK returns before C is delivered; dequeue reduces the waiting count, opens intake, and allows F to be deliberately resubmitted once. This avoids portraying prefetch as automatic producer admission control.
3. **Keep the unresolved demand visible** (25.3–28 s, S). F is accepted, the queue fills again and intake closes while C runs. The resolved state is bounded work, not a claim that overload or latency disappeared.
4. **Retain task identity through motion** (16.6–25.3 s, M). F travels back to the caller, remains deferred, then returns on retry. FIFO departure geometry and larger chips make the task accounting inspectable on a phone.

No remaining visual defect identified in the sampled final encode. Further perceptual audio assessment and a fresh comparative editorial review remain separate limitations, not claims of completed review or grounds for promoting this cut as recommended.

## Final encoded evidence

- 30.000 seconds; 900 frames; 1080×1920; 30 fps; H264/yuv420p; AAC; faststart; **746,640 bytes**, below the 2 MB budget.
- Complete audio/video decode with `-xerror`: passed, no warnings. First/last decoded RGB: exactly equal. MP4 `moov` precedes `mdat`.
- Decoded AAC peak **−8.3 dBFS**. All 69 scheduled cue windows contain energy. Compared the actual decoded AAC against the exact synthesized schedule at 0.6, 5.5, 15, 17.25, 21, 22.2, 25.3 and 28 s: best offsets **0 ms** at each, correlations 0.9627–0.99994. The same timeline schedules canvas events and cue times. Spectrogram shows sends/stores, low work pulses, acknowledgement/completion sounds, the strongest rejection region near 17.25 s, and closing noise near 28 s.
- Source stills inspected via `view_image` before movie renders. Final encoded contact sheet inspected; full-resolution beat frames at **4.3, 14.5, 19.2, 22.65 and 26.4 s** inspected; all five **350 px** beat images inspected as a row. Encoded transition images at **17.25, 17.75, 21.6, 22.35, 24.8 and 25.5 s**, boundary pair, JPEG poster and final spectrogram inspected. Labels remain readable, no stale task state or label overlap observed. Rejection and capacity states have text/count/position cues as well as colour.
- No physical listening took place. Energy, peak and alignment measurements cannot establish the subjective balance, pleasantness, or perceptual separation of every overlapping sound. The rejection window has the highest measured cue-window RMS; this is not a listening claim.
- Evidence: `verification.json` binds checks to the media, poster and renderer/scene source hashes. `scratch/` contains the probe, volume log, cue list, reference audio, stills and encoded review images. Reproduction commands and primary-source paraphrases are in `beat-sheet.md`.

## Technical and editorial limits

One producer, one consumer, reliable delivery and successful tasks are assumed. Three waiting slots and one executing task are illustrative application choices, not recommended defaults, measured model performance or RabbitMQ's queue-length guarantee. The caller's refusal is separate from consumer ACK/NACK. Admission must be enforced atomically in runtime code; the animation omits race handling, lost responses, durable retry state, failure recovery, queue-age deadlines and fairness. Real redelivery requires appropriate idempotency. Neither a queue nor persistent prompts enforce tool permissions or output quality.

No other alternative's scene or partial attempt was read, and no baseline media was used. No comparative quality claim is made. This review covers the owned media and local source only; shared manifests, build/UI and promotion decisions belong to the coordinator. Re-rendered pixels may differ across OS/font/Chrome versions; the saved media hashes identify this reviewed encode.
