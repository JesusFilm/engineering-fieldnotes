# Queued ≠ complete — final review

Author/reviewer: **gpt-6-astra**, high reasoning. Date: **2026-10-19**. This is an author review, not an independent comparative recommendation. User authorization covered direct fixes and teaching improvements. Installed skill untouched.

Final media SHA-256: `f0a19b81c3661c36c06c5061ab2ef2b7c62627091d7d3cfee33f8184e94eebbf`.
Poster SHA-256: `3632c99291cc332ceb7bbca70118d052fae08574212f9f2d9c7655f4ef3d1769`.

## Fixed and improved before handover

1. **17.2–27.0 s: distinguish admission from completion (M, applied).** After the first independently authored render, I inspected the encoded baseline, not its scene. Its generic producer/worker example already teaches a full queue pausing submissions. The final Astra cut follows a documentation-check agent's search job F beyond admission: NOT ADMITTED → QUEUED → DISPATCHING → RUNNING → COMPLETE. F remains visibly queued while C/D/E execute, so the ending teaches what the agent can honestly report. This is a different example and extended explanatory sequence, not a color/timing variant.
2. **1.2–10.6 s and 16.6–17.2 s: clear incoming route (S, applied).** The initial central arrival path crossed the queue label. Arrivals now travel down a dedicated right lane; capacity feedback travels up a separate left lane. The final frames preserve queue-label legibility during both directions of motion.
3. **1.8–10.6 s: remove stale send state (S, applied).** After each admission, the producer returns to Ready. It no longer appears to be sending the previous job throughout execution. The final submission becomes Batch submitted, which is deliberately distinct from F complete.
4. **All beats: readable job identity (S, applied).** Labels are 44–84 px where they carry the lesson, job cells use 64 px, and the explicit F lifecycle uses 50 px. The 34 px footer only marks the scenario as illustrative. Check images at 350 px show the important labels clearly.
5. **0.0 and 29.0–30.0 s: exact loop boundary (S, applied).** The local engine supports whole-canvas fading; the closed state holds from 27.0 to 28.7 before fading. First and last decoded RGB frames are exactly equal. The renderer forces a keyframe after the fade.

## Investigation corrected by pixel evidence

Some repeated images in the tool's displayed preview appeared to omit unchanged words. This was initially suspected to be a renderer defect. Direct comparison of the source still title regions at 18.0 and 27.5 found identical pixels; the final encoded title region is stable across every non-fading frame. Therefore **no actual label-loss defect is claimed**. Software canvas readback and disabled GPU were retained in the local copy for reproducibility, but no causal claim about fixing glyph loss is made.

## Encoded visual and teaching review

Rendered stills were inspected before movie production, including the busy SPACE/dispatch transition. After the final encode, inspected the one-second contact sheet, 350 px beat/transition images, full-size encoded transition frames, and the transition sheet sampled one frame before/after discrete events. Verification regenerated all evidence after the final scene revision.

- **0–5.5:** normal A completes before the slow-job problem starts. It establishes queue passage versus actual execution.
- **5.5–10.8:** B's progress continues while C/D/E fill the waiting places. Counts exclude the active job.
- **10.8–15.0:** F stays outside the queue. The full signal travels upstream; paused producer and continuing worker are visible simultaneously. No completion is implied by admission pressure.
- **15.0–19.8:** C leaves before F enters. SPACE follows that removal. F becomes QUEUED while C is active; the status remains amber.
- **19.8–25.6:** F waits behind D and E. This extra causal step is central to the alternative, rather than closing on “producer resumed.”
- **25.6–30.0:** F runs, finishes at 27.0, and gets its own complete state. The final hold is long enough to see zero waiting and six finished before the fade.

No remaining blocking visual defects or in-scope teaching changes were found. Further improvement would require viewer evidence rather than speculative extra animation. Human promotion/comparison remains separate.

## File and sound checks

`verification.json` binds checks to the file and local renderer/scene hashes:

- 30.000 seconds, 900 frames, 1080×1920, 30 fps, H.264/yuv420p, AAC.
- **606,634 bytes**, below the 2,000,000-byte ceiling. MP4 moov precedes mdat.
- Full video/audio decode completes without FFmpeg errors; exact first/last RGB equality passes.
- Encoded peak **−8.3 dBFS**. All 65 authored cue windows contain audio above −50 dBFS; all 34 recorded semantic events have a cue within one video frame.
- AAC versus synthesized-source correlation **0.999227**, with best tested alignment at **0 seconds** lag. Spectrogram shows the low full/pause sounds at 10.8/11.6, recovery near 15, and final completion at 27. Work ticks accompany the progressing worker bar.
- FIFO event accounting completes A–F, never exceeds three waiting jobs, and never overlaps worker execution. No enqueue occurs during the producer's blocked period.
- Codec and filter thread limits are two; encodes are serial. Temporary files stay in this cut's ignored scratch directory.

**Audio was not physically listened to.** Cue timing, energy, peak and spectrum do not establish how pleasant or intelligible bass-heavy effects sound on a particular phone speaker. No listening claim is made.

## Scope and limitations

This is a finite, illustrative local queue: FULL/SPACE are visual feedback, not broker protocol packets. Timing and travel delays are authored examples. Three waiting places exclude a running job and the producer-held job. Task completion is a recorded stub/tool outcome, not proof of semantic correctness, durable delivery, permissions or exactly-once effects. A queue bound does not enforce rate, cost, deadline or whole-process memory limits.

The companion primary-source review and stub exercise are in `reviews/concepts/queues-and-backpressure/`. The local exercise passed; no live RabbitMQ or paid-provider test was performed. The original source scenes and other model scenes were not read. The encoded baseline was viewed after independent initial production to strengthen the distinct lesson; no winner over another model is asserted.

The chapter and comparison were built into this cut's scratch directory using the existing build functions and checked at 350 px and 1280 px, with 17 px guide body text and no horizontal overflow. Muted Astra playback and intrinsic dimensions/duration passed. Shared manifests, build scripts, UI, dist and Git operations remain outside this task's write scope; whole-library release checks were not run.
