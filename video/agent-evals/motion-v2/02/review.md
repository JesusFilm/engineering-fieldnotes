# Lesson 02 review (render 3, final)

**Bound to:** `video.mp4` SHA-256 `4a4e20d5934f02a81865d01e08ae365f4e4e142e37b7e9610319855207a03eb3` (34.60 s). Any re-encode voids this review.

## Evidence scope

- **Analysed:** 34 encoded frames from this exact file at every beat and boundary (0, 0.9, 1.8, 2.6, 3.6, 4.4, 6.0, 6.7, 7.6, 9.0, 9.7, 10.6, 12.0, 12.8, 14.3, 14.9, 16.5, 18.0, 18.6, 19.4, 20.0, 21.5, 22.8, 23.5, 25.0, 26.3, 27.0, 27.6, 29.0, 31.5, 32.6, 33.1, 33.6, 34.55 s), in `scratch/enc2/` at 1080×1920 and `scratch/enc2-350/` at native 350×622. Viewed: the 350 px sheet (`scratch/enc2-350-sheet.png`), individual unscaled 350 px frames at 6.7, 14.9, 22.8 and 25.0 s (`scratch/native350-quad2.png`), full-size pre-encode stills of the busy moments from the previous render (`scratch/busy2.png`; the encoded frames in `scratch/enc2/` supersede them), the contact sheet, and the spectrogram. Also checked: `volumedetect` and `astats` levels, a full decode, and MP4 box order.
- **Heard:** nothing. The audio was **not listened to**. Sound claims rest on the cue list, spectrogram and levels.
- **Not covered:** the site at reading and phone widths, and comparison with other cuts. Passing these scoped checks is not proof that the video is correct in every respect.

## Fixed before handover

- **6.6 s onward:** the claim's blocked path used the engine's 13 px ripple ×, which vanished against the margin at 350 px. Replaced it with a 40 px × that draws itself and stays (local `tick` option `shape: 'x'`).
- **14.0 s:** the `rejected` output chip started on top of the `returned` status. Moved the output hop to x 870, clear of the text.
- **19.2 s:** removed a dotted bracket between expected and observed that was invisible at 350 px; the tick carries the match.
- **About 28 s:** the record row's highlight touched the `RECORD · P1` title. Lowered both record rows by 12–15 px.
- **19.7–24.0 s (render 2):** about 4.3 s with no change after the pass. Moved the record beat 1.5 s earlier and trimmed the final hold to match, so this hold is now 3.0 s.

Clean on the final encode. Every useful label is 38 px or larger (about 12 px at 350 wide) and readable in individual native frames. Chips, ticks and the × clear all text, no highlight lingers, and nothing enters the title band. Each of the 23 cues lines up with a visible event and a spectrogram onset. Peak is −7.2 dBFS with no clipping. At 6.7 s the × is half drawn inside its fading ring and briefly reads as a slashed circle at 350 px; I judged this transient intentional and left it. The longest still stretch outside the final hold is 3.0 s (19.5–22.5).

## Suggested improvements (ranked by teaching impact)

1. **Make the claim's attempt clearer** (5.4–6.6 s, size S). Saw: a small grey dot travels the dashed line. Change: send a tiny `"Bug fixed"` chip along the line so it is obviously the claim being stopped. Effect: the × reads as "the claim cannot fill observed."
2. **Retime the lesson text** (whole video, size S, coordinator). Change: beats 0/9.0/14.0/22.5, duration 34.6. Effect: captions land on their motion.
3. **Show execution order inside the code** (10.3–12.6 s, size M). Saw: only an underline fills. Change: Plan A's gutter cursor stepping from `""` to `login()`. Effect: a stronger sense that the code actually ran. Cost: more motion.
4. **Stress the gap between "returned" and "observed"** (12.6–14.8 s, size S). Saw: the hop follows 1.4 s after `returned`, which may read as a pause with no meaning. Change: shorten it to 0.8 s, or pulse the observed `—` during it. Effect: tighter cause and effect.
5. **Name what was compared** (19.2 s, size S). Saw: the tick sits between the rows. Change: add a small `=` before the tick. Effect: beginners read it as equality, not general approval.
6. **Final hold** (28.3–32.6 s, size S). About 4.3 s; cut 1 s if it feels slack.
7. **Listen once** (whole video, size S). Confirm the quiet `miss` at 6.6 s and the C4 pending blip are audible on a phone speaker.

## Notes for the skill (not acted on)

- A persistent cross mark (`tick` with `shape: 'x'`) is useful for "blocked path" states; the engine's ripple × is too small for phones.
