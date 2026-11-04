# Lesson 05 review (render 2, final)

**Bound to:** `video.mp4` SHA-256 `d453b4bf77bd822f973f3b20894b36fd05b9d15f6c8f7482fe1d162c7dcaca35` (42.00 s). Any re-encode voids this review.

## Evidence scope

- **Analysed:** 38 encoded frames from this exact file at every beat and boundary (0, 1.0, 2.0, 2.9, 3.8, 5.0, 6.5, 8.4, 9.0, 10.0, 10.6, 11.7, 12.1, 12.6, 13.6, 14.6, 15.8, 16.8, 17.6, 18.2, 19.2, 19.8, 20.6, 22.5, 24.5, 25.2, 25.9, 26.6, 27.6, 28.5, 30.0, 32.2, 33.8, 35.2, 37.5, 40.0, 40.6, 41.95 s), in `scratch/enc/` at 1080×1920 and `scratch/enc350/` at native 350×622. Viewed: the 350 px sheet of all of them (`scratch/enc350-sheet.png`), individual unscaled 350 px frames at 6.5, 12.6, 14.6, 19.8 and 37.5 s (`scratch/native350-row.png`), an unscaled full-resolution crop at 30.0 s (`scratch/full-3000.png`), the contact sheet, and the spectrogram. Busy moments were also viewed as pre-encode stills (`scratch/busy1.png`). Also checked: `volumedetect` and `astats` levels, a full decode, and MP4 box order.
- **Heard:** nothing. The audio was **not listened to**. Sound claims rest on the cue list, spectrogram and levels.
- **Not covered:** the site at reading and phone widths, and comparison with other cuts. Passing these scoped checks is not proof that the video is correct in every respect.

## Fixed before handover

- **Outcome record (render 1):** `OUTCOME · RELEASE A` ran into its status `result unknown`, and the first row overlapped the title. Shortened them to `OUTCOME · A` / `unknown` and moved the rows below a title band.
- **Executor checks (render 1):** the ticks touched `approved A` and `may deploy`. Moved them right.

Clean on the final encode. Every useful label is 36 px or larger (about 12 px at 350 wide) and readable in individual native frames. Exactly one arrow reaches production with `apply A`. `effects` never exceeds 1, and nothing travels from the API to production after the retry. The lost `applied` reply never reaches the executor's lifeline. `observed` stays `unknown` until `ok · A` lands. Arrow labels clear the message lines above them. Each of the 25 cues lines up with a visible event and a spectrogram onset. Peak is −1.6 dBFS (the crash) with no clipping. Long still stretches are deliberate holds: 5.2–8.0 s, 13.4–15.6 s (effect done, outcome unknown), 21.4–24.0 s, and 35.8–40.0 s (final).

## Suggested improvements (ranked by teaching impact)

1. **Lengthen the "effect exists, outcome unknown" hold** (13.4–15.6 s, size S). It is the key contrast; add about 1 s before the restart.
2. **Retime the lesson text** (whole video, size S, coordinator). Change: beats 0/8/22/31, duration 42. Effect: captions land on their motion.
3. **Soften the crash** (12.0 s, size S). Peak −1.6 dBFS is within limits but leaves little headroom; reduce its gain by about 3 dB.
4. **Mark that the retry never reaches production** (18.8 s, size S). Change: a short dim stub from the API lifeline toward production that ends at a small ×. Effect: makes the absent second apply explicit.
5. **Name the reply's loss** (12.0 s, size S). The struck `applied` may read as "not applied"; consider `reply lost` beside the ×.
6. **Final hold** (35.8–40.0 s, size S). About 4.2 s; trim 0.5 s.
7. **Listen once** (whole video, size S). Confirm the crash isn't harsh on a phone speaker and the retry `hit` is distinct from the first send.

## Notes for the skill (not acted on)

- A general `arrow` node (message arrows that draw themselves) made the sequence diagram straightforward; it could join the shared engine after review.
