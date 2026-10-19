# Follow the tool — encoded review, render 2

Author/reviewer: **gpt-6-astra**, reasoning **high**, 2026-10-19. Self-review; no subagents or comparison verdict. All improvements below were directly applied under the user's production authorization.

## Fixed before handover

- **0.00 / 27.97 s, exact loop defect (render 1 → 2):** a constant title card at both ends looked identical, but H.264 quantization produced unequal decoded hashes. Changed the local engine to support a full-frame fade and used solid black at both endpoints. Final first/last MD5: `9b2c4088acb2c896d5d79adbe4b893ac`.
- **3.50–23.80 s, ruler alignment (still review):** the initial zero and 3.0-second labels sat near the middle of the bars. Replaced them with separate labels aligned to the common x150–930 time scale.
- **11.00 s, historical-data ambiguity (authored and inspected):** reset old bars and identifiers and visibly change Run A to Run B. No suggestion that enabling propagation repairs old telemetry. A recovery sweep marks the new execution.
- **14.00–15.30 s, header readability (local engine improvement):** enlarged the moving traceparent chip to 42px and used a dedicated lane above the tool; neither tool label is covered. A send and store cue mark injection and extraction.

## Teaching improvements applied, ranked

1. **Make connection visible** (16.80 s, M). Different colors and IDs alone would make the mechanism too textual. Extend a grouping bracket down to the tool interval on the new run, synchronized with the tool's arrival sound. This makes the missing relationship visible even before reading IDs.
2. **Preserve unchanged performance** (19.20–25.30 s, M). Keep the same 3.0-second parent and 2.4-second tool values after repair. Highlight tool time, not a “faster” or success badge. This separates diagnosis from performance repair.
3. **Reduce competing attention** (21.20 s, S). Dim the model node/interval while the tool border and corresponding interval turn amber; a hit sound marks the selection. The eye lands on the boundary worth investigating.
4. **Explain identity through a compact key** (1.00–25.30 s, S). Added TRACE / SPAN above the three node chips. Shared trace IDs coexist with distinct span suffixes. No explanation paragraph was added onscreen.
5. **Hold the result without dead time** (21.20–25.30 s, S). A second selection pulse at 23.70 s reinforces the tool's identity; no unrelated state changes distract from the conclusion. Final fade carries its own quiet sound.

No unimplemented objective defect remains in this cut. Further fan-out, retries, or sampling animation would change the lesson and overload these five beats; those boundaries belong in the accompanying guide.

## Frame review

Pre-movie stills at 3.50, 8.80, 14.50, 19.80, and 23.80 s were rendered, tiled, and opened with view_image, including a full-resolution busy header frame. After the loop change, opening black and final-state stills were inspected again before render 2.

Encoded contact sheet inspected at one-second intervals. Encoded full-size beat frames and each 350px beat image were inspected. Boundary images cover 4.97/5.00, 10.97/11.00, 16.77/16.80, and 21.17/21.20 seconds, plus tool arrival, fade, and endpoints. No clipped labels, stale values after reset, or colliding header labels were found in the actual decoded frames. The helper now selects exact decoded frame numbers from the start rather than relying on seeking. A close crop of the 14.50s text was also inspected; independent single-/two-thread decoded RGB hashes matched (`644f1e047618af01dfd78a0464d7200e60ce4378218ea6b215598aff56b04926`).

Important labels are 36–48px and the title is 86px; the supporting key/footer are 30/34px. At 350px width those supporting labels are smaller than the primary labels but readable. The diagram is intentionally sparse. The model dims only after its relationship and duration have been established.

## Technical and sound verification

Final MP4: **28.000 s**, **840 frames**, **1080×1920**, **30 fps**, H.264 **yuv420p**, AAC stereo 44.1kHz, **1,121,081 bytes**. Full audio/video decode succeeded. Exact endpoint equality passed. MP4 `moov` begins at byte 32, before `mdat` at 31300: faststart is present.

Encoded PCM peak: **−11.0357 dBFS**, safely below −0.5 dBFS. The 25 sound cues are generated from the same schedule as the visual changes. Per-cue encoded RMS windows range from −38.70 to −21.77 dBFS. The disruption's thump has the strongest measured cue window. All 25 source/encoded RMS-envelope comparisons align at **0 ms** on a 1ms search grid (minimum correlation **0.9965**). This supports synchronization within the method's resolution, not sample-perfect perceptual claims. The spectrogram shows the low disruption, recovery sweep, distinct sends/arrivals, work ticks, selection and closing noise.

A first attempt to compare oscillating waveforms on a coarse lag grid produced phase ambiguity for pitched notes and poor noise correlation after AAC. That was a verification-method weakness, not evidence of delayed audio. Replaced it with short-window RMS-envelope correlation; no audio track change was needed.

**Audio was analysed, not physically listened to.** Device audibility, tonal pleasantness, and subjective balance remain untested. The file has no voice-over, and the five-beat plain-language transcript in variant.json provides the accessible text equivalent.

## Evidence and reproduction

`verification.json` records output hash and all passing checks; `cue-audit.json` records each cue's timing, encoded energy, and alignment. `scratch/` retains the render-1 failure report, final probe, all-frame hashes, spectrogram, contact sheet, original stills, and encoded beat/boundary images. The poster is the encoded frame at 23.80s.

Reproduce using `render.sh` (see README.md). Runtime used: Node **24.3.0**, puppeteer-core **23.11.1**, Chrome **155.0.8059.84**, FFmpeg **8.0.1**, local system fonts. Decoder/encoder/filter threading is capped at two; only one movie encoder ran at a time. Font and codec versions may change bytes on another machine; verification must be rerun.

## Honest teaching limits

This is a constructed synchronous example, not measured agent performance. Identifiers are shortened, and HTTP transport spans are omitted. The first run shows a separate tool trace for comparison; the second is newly recorded after propagation is fixed. The video locates time at a tool boundary; it cannot distinguish internal queueing, network delay, or test execution without further instrumentation. Sampling/export, asynchronous links, retries and fan-out are covered only as limits in the guide. Tracing does not prove answer correctness or enforce authorization. No other variant source or baseline media was inspected, and this self-review does not establish comparative superiority.
