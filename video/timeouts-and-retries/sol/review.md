# One retry owner — final render 3

Reviewed 2026-10-18T23:53:07.270226+00:00. Self-review of encoded media using the architecture-flow-video defect and improvement passes. Factual/media verification is separate from comparative quality scoring; no recommendation against other cuts is made.

## Fixed before handover

- **00:05.30–00:06.50, stale state (render 2 → 3):** the first encoded boundary sheet showed the tool still displaying green “Complete” after the scene reset and the index became unresponsive. Reset its sublabel and color to neutral “Ready” at 05.30. Re-rendered and inspected this transition in the final contact and 350 px boundary sheets.
- **00:00.00 / 00:31.967, loop defect (render 1 → 2):** the near-black full-canvas fade looked identical but the decoded first frame differed by one RGB level over part of a 16×16 corner. Changed only the local engine's full-canvas overlay to pure black. The complete decoded RGB buffers now match byte for byte; final render 3 was independently rechecked.
- **00:14.70, counter spacing (pre-encode):** the second token row left only about one pixel before the counter text's nominal bounds. Moved the total to y=1690 and arithmetic to y=1770; checked the dense six-call state at 1080 and 350 px.
- **00:19.10–00:25.10, misleading budget speed (pre-encode):** the convenience setter initially dropped the linear easing argument. Passed easing through to the engine so the six-second bar drains uniformly through requests and backoff.

## Ranked improvements implemented

1. **Make multiplied work countable** (00:05.90–00:15.90, M, applied). Two separate upper-layer invocations each cause three lower-layer reads. Six numbered tokens fill on service arrival, then 2 × 3 = 6 holds. The next scenario keeps three tokens. This makes the cost visible rather than relying on a caption about retry amplification.
2. **Show a single owner and a single budget** (00:16.00–00:25.10, M, applied). The agent changes from two tries to one; the tool pulses as owner. Its budget drains during both calls and sampled backoff waits. This connects ownership to bounded work and elapsed time.
3. **End with a bounded failure** (00:25.10–00:29.60, S, applied). The index remains unavailable, the tool stops, and one failure travels back before the agent hands off. This prevents a false promise that retry policy restores service. The last result holds for 3.25 seconds before the closing fade.
4. **Preserve a normal comparison** (00:00.75–00:05.30, S, applied). A successful read returns a result before the index failure. The one green call token establishes the healthy cost before six red calls appear.

No additional material defect was found in the final visual review. No outstanding improvement is needed to fulfill this cut's single-owner lesson. Demonstrating many-client jitter would be a different lesson and remains a stated limitation.

## Final encoded evidence

- Movie SHA-256: `15e7ece8b04a262106ed9bcd984d4beffc42de956784af3911de42bb22463cc9`.
- Poster SHA-256: `2f576c3564fd523c8f67a97c3a3240d55ade32630de70bedf4d916ed62d563fc`; poster comes from the encoded final hold at 00:27.40.
- 987,182 bytes (<2,000,000); 32.00 seconds; 960 frames; 1080×1920, 30 fps, H.264/yuv420p, AAC stereo at 44.1 kHz; moov precedes mdat for faststart.
- Full video and audio decode with FFmpeg `-xerror`: passed. First/last decoded RGB buffers: exact equality, SHA-256 `1f56bd4f609fab80a2b9cce7487d5c08de2768476849e1353881ca748d8d3b6a`.
- Encoded AAC maximum sample level: -5.8 dBFS. No clipping. 56 scheduled cues have non-silent encoded audio in the following 180 ms; cue-to-nearest-video-frame distance is at most 16.667 ms. These checks establish scheduled synchronization and signal presence, not a physical listening assessment.
- Inspected final `scratch/encoded-contact.png`, six full-size beat frames (03.80, 09.70, 14.70, 17.80, 22.90, 27.40), busy packet frame 24.40, `encoded-beats-350.png` (each tile exactly 350 px), `encoded-boundaries-350.png`, and `spectrogram.png` using view_image. Phase transitions, send counts, labels, deadline bar and failure return are legible without overlap. The spectrogram shows the broad disruption at 05.30, recurring timeout notes, sparse ownership/backoff cues and closing fade sound.
- On-screen changing text is short labels, data chips, counters and measured values; no explanatory paragraphs. Smallest visible lesson label is 36 px at source resolution (about 11.7 px at 350 wide). Inactive ledger tokens intentionally dim.
- `verification.json` contains exact hashes, stream metadata, all cue-window measurements and source dependency hashes. Source is reproducible with `render.sh`; local FFmpeg encoders and filters are restricted to two threads and run serially.

## Honest limits and scope

Audio was analyzed, **not physically listened to**. Timbre, perceived loudness on phone speakers, and subjective sound comfort remain unassessed. This is an authored animation, not a production agent/network benchmark. It shows one read-only operation and one sampled backoff sequence; it does not demonstrate jitter across clients or prescribe these timings. It does not show idempotency for writes, cancellation of remote work, circuit breakers or retryable-error classification.

Limits are enforced in harness/tool code with SDK retry settings accounted for. A persistent prompt alone does not enforce permissions, deadlines or attempt limits. The client deadline stops further waiting/sends; remote reads can still be running. Three total attempts includes the initial call; the third call's local wait is shortened by the overall deadline. The agent's handoff is illustrative orchestration behavior, not an automatic model guarantee.

Only this cut and its two media outputs were authored. No other variant scenes or reviews were read; no Git operations or subagents were used; the installed skill and shared build/UI/manifests were not modified. Shared site generation and comparative chapter/browser review belong to the coordinator; this cut was checked directly from its actual encoded media. Primary linked evidence and an observable team exercise are in `beat-sheet.md`.
