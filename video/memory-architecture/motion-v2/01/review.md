# Video 01 review (render 3, final)

**Bound to:** `video.mp4` SHA-256 `bf8203d8a7a6f6b837a457280ac3e5da4263bfc6c42f1b2975903309f98f18a6` (40.80 s). Any re-encode voids this review.

## Evidence scope

- **Analysed:** 29 encoded frames from this exact file at 0.3, 2.5, 4.5, 5.0, 8.0, 8.6, 10.0, 11.2, 15.5, 17.0, 19.5, 20.6, 21.3, 21.8, 22.6, 23.0, 23.4, 24.5, 26.6, 27.2, 27.6, 28.1, 30.0, 31.7, 32.3, 34.3, 37.0, 39.6, and 40.7 s. They cover every beat, every boundary, and the start, middle, and end of both copy moves. Frames are in `scratch/enc2/` at full size and `scratch/enc2-350/` at native 350 × 622. I viewed them as unscaled 350px strips plus full-size frames at 22.6 and 27.6 s (`scratch/trio-full.png`). Also checked: the contact sheet, the spectrogram, `volumedetect` and `astats`, a full decode, and the MP4 box order.
- **Heard:** nothing. I did **not listen to** the audio. Every sound claim comes from the cue list, the spectrogram, and level measurements.
- **Not covered:** a browser or site check, and comparison with other cuts. Both belong to the coordinator and a fresh comparison reviewer. Passing these scoped checks does not prove the video is correct in general.

## Fixed before handover

- **25 s (staging hold):** the copy rested across the application panel's bottom border (staging y 1340). Moved it to y 1270, on the application's text line.
- **22.6–23.0 s:** the rising copy crossed the store's right-aligned `saved` status. Moved the status beside the title (`memory store  saved`), which clears the copy's path.
- **21.9 s:** the copy lifted 22px while its background faded in, which doubled the `npm test` text. It now appears exactly over the stored value.
- **22.6 s:** while rising, the copy's background hid the stored `npm test`, which contradicts "the saved copy stays". The copy stays transparent until it clears the row. About six frames of overlapping text remain, and they read as the copy separating.
- **32–40 s:** the application line kept saying `include in Call 2` after supply. It now reads `send Call 2` at supply and then dims.

The final encode is clean. Text is 36px or larger (about 12px at 350px), unclipped, and clear of the title band. Labels do not overlap once the copy has settled. No stale state lingers: the × ripple is gone before Call 2 opens, and the read wire hides after use. The stored row stays visible from 8.2 s to the fade. Call 1 never gains the command, and Call 2 turns `supplied` only after the inclusion hold. All 24 cues appear as spectrogram onsets. Peak is −7.0 dBFS, with no clipping. The only stillness longer than 3 s falls in the deliberate holds: 4.8–8.2, 11.7–15.8, and 34.2–39.2 s.

## Suggested improvements (ranked by teaching impact)

1. **Name what the model can use** (32.0 s, size S). Saw: the model box only turns green. Change: briefly pulse Call 2's `npm test` row and the model together, the way the store and copy are paired at 33.6–34.0 s. Effect: the viewer sees that the supplied input reached the model. Risk: it must not look like an answer.
2. **Make the read wire's target clearer** (20.3–20.9 s, size S). Saw: the amber dot lands on the store's top border near the title, and the row lights about 0.6 s later. Change: end the dot at the `billing.test_cmd` key. Effect: "read by key" becomes visible.
3. **Shorten the first hold slightly** (4.8–8.2 s, size S). Saw: 3.4 s on a simple single card. Change: trim about 0.6 s if a fresh viewer finds it slack. Keep the 11.7–15.8 s "present but not included" hold.
4. **Retime lesson text** (whole video, coordinator, size S). `lessons.json` assumes 28 s. Measured beat starts are 0, 8.2, 15.8, and 31.4 s, with a duration of 40.8 s.
5. **Listen once to the `miss` at 10.8 s** (size S). It measures as the lowest event (around 300 Hz) and is quieter than the supply cues. Nobody has heard whether it reads as "absent" or as an error on phone speakers.
6. **Larger secondary captions** (whole video, size M). `task`, `test cmd`, and `input` are 36–40px, which is legible at 350px but small. Raise them to 42px if a phone check finds them faint. The cards have about 20px of spare height.
7. **Dim Call 1 during the retrieval** (18.8–28.4 s, size S). Saw: both input cards stay at full brightness while the copy moves. Change: drop Call 1 to 60% until the final hold. Effect: one place to look. Risk: it loses the constant side-by-side contrast.

## Notes for the skill (not acted on)

- The engine's subtitle is fixed at 28px, which is about 9px at a 350px phone width. The local copy adds size options.
- `panel` (a titled card with a status word, slots, and stacked or key/value rows) and `chip` (a movable persistent object) are general types that could suit the shared skill after review.

