# Retry budget — production review

Author and self-reviewer: **gpt-6-astra**, high reasoning. Reviewed **2026-10-19**.
Final encode SHA-256: `4b44dbe3e40a7e2c82f86a7f3b08524463e78629987c9abaed28d9860751c0db`.

## Fixed before handover

- **00–07, budget consistency (S):** the first layout kept the budget full while the normal request executed. Added a draining segment and remaining-time changes, freezing at completion; reset occurs only when the second logical read begins. This makes the later refusal to refill the retry budget intelligible.
- **00–26, phone readability (M):** the copied engine's 24px subtitles were too small for status values at phone width. Local box subtitles are now 44px, headings 56px, and the countdown 64px. Increased vertical separation within each box; all five 350px encoded beat images are legible without zoom.
- **05.00 still capture, apparent glyph omission (S):** one initial still view appeared to lose static lettering. Switched local browser/canvas capture to CPU readback and repeated the still review. Encoded full-size and phone-size images were checked; pixel counts independently confirm title content at every sampled beat. The exact cause of the initial display anomaly was not proven.
- **20–23, false certainty (M):** preserved CI's neutral NO REPLY YET state while the caller receives STATUS UNKNOWN. The timeout does not turn the CI node into a failed build or imply rollback. Closure is drawn at the runtime boundary.
- **22–26, ending and loop (S):** shortened the final hold to about 2.2 seconds after the blocked request lands, then paired a full-frame fade with a poof cue. Explicit uniform opening/closing frames make the decoded loop endpoints exactly equal.

## Improvement pass — applied within authorization

1. **Runtime gate rather than a model instruction** (20–23, M). A further request visibly reaches the runtime and never reaches CI. This demonstrates where the stopping rule belongs, while the text guide explains that software must implement and retain the budget.
2. **One budget survives the backoff** (13–20, M). The timer continues during the two-second wait and retry. The white marker records how much remained at retry launch; the orange segment keeps shrinking. No decorative clock animation replaces the actual budget loss.
3. **Normal result before uncertain result** (00–07 versus 20–23, M). A completed request returns a green known status, establishing the meaning of a response before the missing-response example. The two outcomes use both labels and sound/motion, not colour alone.
4. **More sparse sound** (08–20, S). One clock tick per second marks budget use; the first timeout gets a low thump and the final closure gets the strongest disruption sound. There is no repetitive server work loop masking the boundary cues.

No outstanding objective defect was found in the final reviewed samples. No additional improvement is required for this narrowly scoped lesson. A fleet-level jitter comparison would be a different lesson, not an extra caption on this cut.

## Final evidence

- 26.00 seconds; 1080×1920; 30 fps; H.264/yuv420p and AAC; **1,163,088 bytes**; `moov` precedes `mdat` (faststart).
- Full decode passed with `-xerror`. All **780** video frames were decoded. First and last decoded hashes are exactly `eb31442608984c1aa5939de6decc4443`.
- AAC max sample level: **−5.6 dBFS**, below the −0.5 dBFS limit. 38 authored sound cues each have decoded audio energy within their 150ms window; decoded/reference audio correlation at zero lag is **0.99036**. Shared timestamps tie state changes and packet arrivals to cues. A spectrogram shows sparse ticks, the timeout at 13, closure at 20, rejection at 22.6, and fade at 24.8.
- Inspected source stills before the movie; then the final encoded contact sheet, all five beat images at **full resolution and 350px width**, and 24 boundary/motion captures. No overlaps or clipped labels found. The busiest packet frames retain clearance between box boundaries. A 0.15-second clock fade after 15 is intentional transition, not a stale beat.
- `verification.json` contains media and poster hashes, container evidence, level/correlation measurements, and every cue's decoded peak. Scratch holds the actual reviewed images, PCM, and complete frame hash list; `verify.py` regenerates them.
- Toolchain: Node v24.3.0, Puppeteer Core 25.14.0, FFmpeg 8.0.1, Pillow 10.4.0, NumPy 2.0.2. Renderer and verification cap codec/filter worker settings at two; encodes were sequential.

## Honest limitations

Audio was **analysed, not physically heard**. Energy and correlation establish presence and alignment, not perceived mix quality on phone speakers. This was self-review, not a fresh independent comparison. No other variant scene or encoded baseline was viewed, so no comparative ranking is claimed.

The times, single sampled backoff, repeat request, and gate are illustrative. The cut does not teach statistical jitter, exponential growth, write idempotency, cancellation propagation, or all transport-level retry rules. Attempt cap and deadline coincide in this scenario; real software stops at whichever is reached first. Retry safety for a read does not promise a fresh or identical result. Remote work might continue after the caller stops waiting.

Shared UI, build outputs, manifests, and media-check cache were intentionally not written because this task owns only the named chapter and cut. The owned verifier performed the media checks without mutating the shared cache. Human editorial promotion and comparison remain coordinator work; `verified` signifies the documented asset checks, not curriculum recommendation.
