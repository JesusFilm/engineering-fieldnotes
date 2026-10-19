# Empty ≠ failed — final encoded review (render 2)

Author/reviewer: **gpt-6-astra**, high reasoning, **2026-10-19**. Self-review, not an independent comparative review. Independent concept and scene; no baseline or other variant scenes or encoded media were inspected. The intended objective is to preserve the distinction between a completed empty lookup and an execution failure in an agent-facing tool contract.

## Fixed before handover

- **06.8–08.5, stale result (S).** Render 1 left “0 found” on the index while a new lookup started. Reset it to “Available” at the new beat, with the existing transition sound. The next request now has no leftover result suggesting it already completed.
- **04.6–06.8 and 09.6–12.8, bracket legibility (S).** At phone width adjacent array brackets visually collapsed. Added internal whitespace to `[ ]` both in packets and resting results. The same result remains conspicuous in the normal and erroneous cases.
- **10.6–12.8, ambiguous error teaching (S, preflight).** A question mark on “0 matches” could suggest the agent was appropriately uncertain. Replaced it with a separate red cross, timed with a thump and shake. The unsupported conclusion is now marked as wrong without relying only on colour.

## Meaningful improvements applied

1. **23.9–24.5, make the evidence travel (S).** The first cut sent only an OK chip to the agent. The final cut sends `OK + INC-42`, tying the agent's named incident directly to the returned record. Packet width remains clear of labels; inspected at 24.2 seconds in full-size and 350px frames.
2. **12.8–17.5, keep the cause separate from the fix (M, designed into scene).** The index stays red after the contract changes. Only the error result propagates correctly and the agent becomes Unknown. This prevents a tool-interface change from appearing to repair the backend itself.
3. **19.7–24.5, make the retry finite (S, designed into scene).** A timed wait bar and one-to-zero budget accompany the retry. The budget is spent at dispatch, rather than credited only after success. The scene notes and transcript identify this as an application policy, not a prompt guarantee.

No remaining in-scope defect or meaningful improvement was left awaiting permission. Broader production retry policy, permanent outages, permissions and partial coverage belong in the accompanying guide or a separate lesson rather than extra simultaneous animations here.

## Capture anomaly investigated

Some image previews appeared to omit repeated static text. The saved early PNG's title region had YAVG 50.6313, not an empty background; the encoded phone capture also contained the title pixels (YAVG 46.8412). A title-region scan of render 1 found no missing title frames during the visible interval. Thus a font-rendering defect was **not established**; the earlier progress note naming it as a renderer defect was too definite. Local font warm-up remains a precaution, not a claimed proven repair. Final full-size, tiled and phone captures were inspected together to avoid judging a single preview artifact.

## Final file verification

- `public/media/tool-design/astra.mp4`: **626,145 bytes**, 30.000 seconds, **900 frames**; 1080×1920, 30/1 fps, H.264, yuv420p; AAC stereo at 44.1 kHz.
- Full video **and** audio decode with `-xerror`: pass. 900 decoded frame hashes generated.
- Exact decoded first/last equality: both MD5 **eb31442608984c1aa5939de6decc4443**. The fade includes title and stage; opening and closing frames are the same dark background.
- Faststart: parsed MP4 top-level atoms put `moov` before `mdat`.
- Encoded audio maximum: **−2.2 dBFS**, below the −0.5 dBFS ceiling. No clipping found.
- **44 cues** have measurable decoded signal in their first 120 ms. Waveform cross-correlation against the deterministic synthesis peaks at **0 ms** in the tested approximately 1 ms lag grid, within one video frame. Overlapping transition cues are checked jointly by signal and against their authored timestamps; this is not isolated perceptual recognition of every cue.
- Spectrogram inspected: the 8.5-second failure has broad noise and low-frequency energy; normal deliveries and clock ticks occupy their expected times; the final fade has its closing poof. Sparse intervals give the result holds quiet space.
- Encoded contact sheet inspected through `view_image`; all five beat states at **4.9, 10.9, 17.9, 20.5, 25.0** inspected at **350px** and full size. The moving payload at **24.2** was additionally inspected. Beat boundaries were inspected on a sheet immediately before/at **6.8, 12.8, 19.7, 24.5**, plus opening, fade, and final frame.
- Generous spacing, readable main labels and unambiguous error/unknown/found states; no clipping or text overlap observed. Main label sizes are 42–56px, title 92px. Small category/query labels are secondary, not required for the causal lesson.
- Deliberate success hold from 24.5 to 27.2; fade from 27.2 to 28.2; blank closure to 30. No unexplained stagnant interval over three seconds.
- Poster is extracted from the final encoded movie at **17.9 seconds**, showing the preserved error and Unknown outcome.
- Commands and machine evidence: `README.md`, `verify.py`, `checks.json`. Selected durable images are in `evidence/`; intermediate renders, waveform data and logs remain under ignored `scratch/`.

## Honest limits

Audio was **not physically listened to**. Levels, waveform timing and spectral events were analysed. No claim is made about subjective timbre or real device audibility.

This is a scripted read-only scenario, not an agent benchmark. Typed results help preserve evidence but do not guarantee correct model interpretation, permission enforcement, backend recovery or factual completeness. The runtime enforcing the retry budget is abstracted into the Agent box; production code must actually enforce it. The selected one-retry delay is illustrative. Finding INC-42 is retrieval, not verification of root cause. Successful-empty behaviour after the revised contract is covered in the guide's exercise, not a sixth video beat.

The guide was freshly revised to core placement, with all original assertions reviewed and four primary source pages opened. No live exercise was run. Human editorial comparison should decide recommendation; model provenance and a passing technical check do not establish superiority over other cuts.


## Comparative revision — 2026-10-19

Edited by **gpt-6-astra comparative review**; original model provenance is retained. The earlier review and numerical measurements above describe the author render. Current corrections, encoded validation and recommendation are in `reviews/comparisons/tool-design/after.md` and `checks.json` (paths from repository root); `variant.json` includes the final MP4 hash and revised transcript. Audio was analysed, not heard.
