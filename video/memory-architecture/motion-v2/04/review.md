# Video 04 review (render 2, final)

**Bound to:** `video.mp4` SHA-256 `2333ca1b2e6eac3640aa19fe60da6b4ad5ca478e269e3b6d632cec743382e91c` (45.00 s). Any re-encode voids this review.

## Evidence scope

- **Analysed:** 38 encoded frames from this exact file at 0.3, 1.0, 1.8, 2.6, 3.9, 5.0, 7.5, 9.3, 10.5, 11.5, 12.5, 13.5, 14.5, 16.5, 18.3, 19.3, 20.0, 20.8, 22.0, 23.0, 24.3, 26.5, 28.3, 29.0, 29.6, 30.2, 30.9, 31.7, 33.0, 33.9, 34.4, 35.5, 36.8, 38.2, 40.5, 43.0, 43.9, and 44.9 s.
  - **Coverage:** every beat and boundary, both badge highlights, the read, the copy dot's start, middle, and end, the supply, and the fade.
  - **How viewed:** individual frames in `scratch/enc/` at full size and `scratch/enc350/` at native 350 × 622, as unscaled strips (`scratch/strip*.png`), plus a full-size check of 2.6 s.
  - **Display artifact:** `strip0` appeared small in the viewer; the file is 1750 × 622.
  - **Also checked:** the contact sheet, spectrogram, `volumedetect` and `astats` levels, a full decode, and the MP4 box order.
- **Heard:** nothing. I did **not listen to** the audio. Sound claims come from the cue list, the spectrogram, and levels.
- **Not covered:** a browser or site check, and comparison with other cuts. Passing these scoped checks does not prove the video is correct in general.

## Fixed before handover

- **Whole video, both panes:** the `r1` / `r2` badges covered the `test_cmd` captions (`test_c…`). I made the panes 560px tall with a dedicated band for the badges, and moved the footers, the `≠`, and the application panel to match.
- **28.2–29.5 s:** the copy chip overlapped the checkout's own `pnpm test` and crossed the pane border as it left. I replaced it with a highlight on the source value and a blue dot that travels a dotted path down the right margin, outside every panel, into the input field. The checkout value stays in place.

The final encode is clean:

- **Text and layout:** text is 36px or larger, and nothing is clipped, overlaps, or enters the title band.
- **Order:** retrieve → compare → withhold → read → include → supply. The input stays empty until 30.6 s and `preparing` until 33.6 s. `npm test` never enters the input, and the saved note's text never changes.
- **Sound:** all 25 cues appear as spectrogram onsets. Peak is −7.0 dBFS (the restrained thump at 13.2 s), with no clipping.
- **Stillness:** the deliberate holds are 5.6–9.0, 14.2–18.0, 24.0–28.0, and 38.4–43.4 s.

## Suggested improvements (ranked by teaching impact)

1. **Show where the saved note came from** (3.0–3.6 s, size S). The note pane simply fades in. A small `from memory` status in the note pane's title row, or a dot from a memory edge, would make retrieval visible. Effect: "retrieval returns the old note" reads directly.
2. **Soften the withhold thump** (13.2 s, size S). It is the loudest event in the video. Plan A asked for "a review condition, not an explosion". Listen first, and lower its gain if it reads as an error.
3. **Return the `r1` badge to neutral after the comparison** (14.2 s onward, size S). It stays amber for the rest of the video, which could read as "r1 is bad" instead of "r1 is not this checkout's revision". Settle it to blue or grey once `withheld` appears.
4. **Shorten the first hold** (5.6–9.0 s, size S). 3.4 s with no change could become 2.6 s. Keep the holds after the mismatch and after the read.
5. **Retime lesson text** (coordinator, size S). Beats start at 0, 9.0, 18.0, and 28.0 s; duration is 45.0 s. `lessons.json` assumes 28 s.
6. **Thicken the copy path** (28.0–30.4 s, size S). The margin dot is 7px and the path is dotted. At 350px it is visible but faint. Raise the dot radius or brighten the path.
7. **Name the checkout's revision source** (1.2 s, size M). `r2` appears without saying it is the checkout's own revision. Add `checkout · r2` in the pane title. Check the 420px width first.

## Notes for the skill (not acted on)

- A two-pane comparison with aligned identity badges is a reusable layout for any "recorded vs. current" check.

