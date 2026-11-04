# Video 02 review (render 2, final)

**Bound to:** `video.mp4` SHA-256 `2fa054449d2d5bca591acb8b6a81d81052fef03b9ce7ab834378803c3ceb7d4c` (46.80 s). Any re-encode voids this review.

## Evidence scope

- **Analysed:** 35 encoded frames from this exact file at 0.3, 1.2, 3.0, 3.8, 6.5, 7.8, 8.6, 10.8, 12.0, 14.5, 15.3, 17.0, 18.2, 18.9, 19.8, 20.6, 22.0, 22.9, 25.5, 26.8, 27.6, 28.5, 29.5, 31.0, 32.0, 32.6, 33.5, 34.7, 36.0, 37.2, 38.8, 40.5, 44.0, 45.8, and 46.7 s.
  - **Coverage:** every beat and boundary, both directions of the read, the `not read` mark, each restart step, and the fade.
  - **How viewed:** individual frames in `scratch/enc/` at full size and `scratch/enc350/` at native 350 × 622, as unscaled strips (`scratch/strip*.png`), plus a full-size check of 3.0 s.
  - **Display artifact:** the first strip appeared small in the viewer. I checked the file directly (1750 × 622), so it is a display artifact.
  - **Also checked:** the contact sheet, spectrogram, `volumedetect` and `astats` levels, a full decode, and the MP4 box order.
- **Heard:** nothing. I did **not listen to** the audio. Sound claims come from the cue list, the spectrogram, and levels.
- **Not covered:** a browser or site check, and comparison with other cuts. Passing these scoped checks does not prove the video is correct in general.

## Fixed before handover

- **8–40 s, shared panel:** the `namespace · key` title sat about 50px above the first record's caption and crowded it. I made the panel 360px tall and moved its rows down 20px, then moved the read wire's endpoint to match.
- **20.3 s onward, thread B:** `test_cmd` and `npm test` nearly touched. I widened the thread column to 460px and set thread values to 36px, which leaves a clear gap.

The final encode is clean:

- **Text and layout:** all text is 36px or larger, and nothing is clipped, overlaps, or enters the title band.
- **Wires and marks:** the read wire hides after use, and the × ripple fades before the hold.
- **Lesson invariants:** the catalog value never reaches thread B, and thread A's rows never change. Each scope column ends with one `lost` and one `kept`.
- **Sound:** all 31 cues appear as spectrogram onsets. Peak is −6.5 dBFS (the restart thump), with no clipping.
- **Stillness:** stretches longer than 3 s fall only in the deliberate holds at 4.6–7.5, 12.8–15.0, 23.5–26.5, and 40.6–45.2 s.

## Suggested improvements (ranked by teaching impact)

1. **Say that the grid rows are separate setups** (27.2 s, size S). `thread A` appears in both rows, so a beginner may read it as one thread copied. Rename the title `restart test · 2 setups`, or caption the cells `thread A (setup 1)`. Effect: the grid reads as configuration choices.
2. **Let thread B's `npm test` survive the dimming** (26.5 s onward, size S). At 35% the blue value is faint. Keep thread B's row at 60% so the link to the `billing` cells stays visible.
3. **Mark thread A's guess as a guess** (2.6 s, size S). `flaky e2e?` is in mid grey with only a question mark. Give it a dashed outline or an amber color. Effect: "unrelated history" reads as tentative state that B should not inherit.
4. **Shorten the first hold** (4.6–7.5 s, size S). 2.9 s on one card could drop to 2.2 s if a fresh viewer finds it slack. Keep the holds after `not read` and after the restart.
5. **Retime lesson text** (coordinator, size S). Beats start at 0, 7.5, 15.0, and 26.5 s; duration is 46.8 s. `lessons.json` assumes 28 s.
6. **Listen to the restart** (31.8–33.5 s, size S). The thump is the loudest event and the two poofs carry broadband noise. Nobody has heard whether they sound alarming on phone speakers. The restart is a test, not a failure.
7. **Larger cell captions** (27–46 s, size M). `thread A` / `billing` cell titles are 36px. If a phone check finds them faint, raise them to 40px and the cell height to 140.

## Notes for the skill (not acted on)

- A two-axis comparison grid (scope × backend) could be a reusable layout pattern built from `panel` cells.

