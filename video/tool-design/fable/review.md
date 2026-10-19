# Tool design — fable variant review (render 3, encoded file verified 19 October 2026)

Reviewed from the encoded file: contact sheet (1 fps), review frames every 2 s at full size, eight beat frames at 350 px width, spectrogram, `volumedetect`, full decode, first/last frame comparison, and an audio-onset check against the frame where the bar turns red. Audio was analysed, not listened to: no claim is made about how the mix sounds through speakers.

## Fixed before handover

- 13.7 s (render 1): the overflow ripple anchored at the bar's right end ran off the right edge of the frame. Re-anchored at the bar centre with a smaller radius.
- Whole stage (render 1): content sat high, leaving ~250 px of empty stage below Logs. Shifted every node down 70–90 px.
- Audio (render 1): `max_volume` was 0.0 dBFS; the overflow cue plus the sub layer saturated the synth's tanh master. Added `--master 0.6` in the local renderer; the encoded file now peaks at −1.8 dBFS (mean −32.1 dB).
- Loop (renders 1–2): first and last encoded frames differed by compression noise (up to 50 grey levels near the title) although the rendered source frames were byte-identical. Forced a keyframe on the last frame and switched to constant QP 20; first and last encoded frames are now byte-identical in RGB.
- 7.7 s (render 2): the context bar drained before the second question with no sound. Added a quiet poof on every reset.
- 4.4–13.7 s (render 2): a dot landing on the Agent and the bar growing 290 px away were two separate events to the eye. Added a small ripple at the bar's fill front on every landing, in the bar's current colour.

## Verification of the published file

`public/media/tool-design/fable.mp4`: H.264 High, 1080×1920, 30 fps, yuv420p; AAC-LC 44.1 kHz stereo; 29.63 s, 889 frames; 1,404,635 bytes; `moov` at byte 36 (faststart). Full decode with no errors. Overflow audio onset 13.68 s; bar turns red between frames at 13.66 s and 13.70 s. Poster `fable.jpg` is the 14.0 s frame, 1080×1920.

## Suggested improvements

1. **Make the dropped INC-42 linger** (14.4 s, size S). Saw: the green chip is dropped with a poof and a red ×, but it is gone within half a second. Change: hold the chip at the Agent's edge for ~0.6 s, fade it to red, then poof. Effect: the viewer registers that the useful line, specifically, was lost before the `?` appears.
2. **Show the flood's volume at the tool** (11.4–13.7 s, size M). Saw: `3,214 lines` is a single chip; the stream itself is twelve dots. Change: let the dots leave Logs as a dense column first, then thin through the tool; or briefly fill the tool box with a grey bar that drains as dots leave. Effect: the pass-through nature of `read_logs` becomes visible; the tool adds nothing.
3. **Contrast the answers side by side** (25.2 s, size S). Saw: the orange `?` and the green `INC-42` are never on screen together. Change: at 24.4 s briefly flash the old `?` in dim orange before replacing it. Effect: the before/after is felt at the resolution instead of remembered.
4. **A heavier redesign moment** (18.0 s, size S). Saw: the relabel is a pulse, ripple and sweep; it is the least physical beat. Change: add a short jolt on the tool box and a two-step label swap (old label fades, new label drops in with overshoot). Effect: the viewer notices that the tool changed, not the agent.
5. **Shorter third Logs spinner** (21.4–23.1 s, size S). Saw: 1.6 s of spinner with eight ticks, the longest wait in the video, right before the resolution. Change: 1.1 s and five ticks; keep it longer than the first spinner so computation visibly moved into the tool. Effect: the ending arrives sooner without losing the point.
6. **Scale the bar's cost per line** (4.4 s vs 12.0 s, size S). Saw: both quiet and flooded runs add a fixed step per dot. Change: make the quiet run's dots add less, and show the second run's dots slightly larger. Effect: the difference in volume reads from the dots themselves as well as the count.

## Limitations

- Illustrative, not a guarantee: the truncation point, the line counts, and the `?` answer are an example. A real agent may answer confidently and wrongly after truncation, which the video does not show. Truncation limits differ by harness; the article's figure (25,000 tokens in Claude Code) is one default.
- The bounded tool reduces what reaches the context; it does not prove the incident will be found, nor that the three lines are the right three. That needs evaluation on recorded runs (the concept's exercise).
- Limits live in the tool's implementation. A description, a prompt instruction, or a persistent system prompt does not enforce `limit`, pagination, or permissions; the video shows the enforced version.
- The video does not show pagination (a cursor for "more"), coverage fields, or the empty-versus-failed distinction; the baseline cut covers the latter.
- Audio was verified by measurement only.

## Notes for the skill (not acted on)

- A looping video cannot pass an exact first/last frame check under CRF encoding even when the source frames are identical; constant QP with a forced final keyframe does pass. Worth adding to `render.mjs` upstream.
- `box` has no mono-font option and its sublabel offset keys off the static option, so an animated sublabel collides with the label. Both are fixed in this variant's engine copy.



## Comparative revision — 2026-10-19

Edited by **gpt-6-astra comparative review**; original model provenance is retained. The earlier review and numerical measurements above describe the author render. Current corrections, encoded validation and recommendation are in `reviews/comparisons/tool-design/after.md` and `checks.json` (paths from repository root); `variant.json` includes the final MP4 hash and revised transcript. Audio was analysed, not heard.

Comparative clarification: the earlier CRF/loop statement describes the author’s tested encodes, not an impossibility for every CRF encode. Exact decoded endpoint equality must be checked on each output, regardless of encoding mode. The final comparison measured equality for all three cuts.
