# Lesson 03 review (render 2, final)

**Bound to:** `video.mp4` SHA-256 `8c43114fd8ea64d03b97920d1885cff5220a97a3859f1383e157d5b4166486bb` (49.00 s). Any re-encode voids this review.

## Evidence scope

- **Analysed:** 42 encoded frames from this exact file at every beat and boundary (0, 1.0, 1.8, 2.6, 3.5, 4.6, 5.6, 6.6, 8.0, 9.4, 10.2, 11.2, 12.5, 13.4, 15.5, 17.1, 17.4, 18.6, 19.6, 20.8, 21.9, 22.7, 23.8, 25.5, 27.2, 28.2, 29.2, 30.5, 31.3, 32.5, 34.5, 36.2, 37.4, 38.2, 39.4, 40.4, 41.6, 42.8, 44.5, 47.0, 47.6, 48.95 s), in `scratch/enc/` at 1080×1920 and `scratch/enc350/` at native 350×622. Viewed: the 350 px sheet of all of them (`scratch/enc350-sheet.png`), individual unscaled 350 px frames at 6.6, 13.4, 18.6, 31.3 and 44.5 s (`scratch/native350-row.png`), an unscaled full-resolution crop at 41.6 s (`scratch/full-4160.png`), the contact sheet, and the spectrogram. Busy moments were also viewed as pre-encode stills (`scratch/busy1.png`, `scratch/busy2.png`). Also checked: `volumedetect` and `astats` levels, a full decode, and MP4 box order.
- **Heard:** nothing. The audio was **not listened to**. Sound claims rest on the cue list, spectrogram and levels.
- **Not covered:** the site at reading and phone widths, and comparison with other cuts. Passing these scoped checks is not proof that the video is correct in every respect.

## Fixed before handover

- **Stages and saved-state cards (render 1):** the first row of each card overlapped its title (`STAGES` on `prepare`, `SAVED STATE` on `run`). Moved the rows down and re-pointed the margin routes and × to the new row positions.
- **Worker card (render 1):** `WORKER` ran into `restored`. Reduced the worker card's title and status sizes.
- **Highlight bands (render 1):** 60 px bands on rows spaced 50–55 px apart covered neighbouring rows. Added a local `hlH` option and set it to 48 px for these rows. The stage-name highlight is now a colour change instead.
- **`revalidate` highlight (render 1):** sized for the shorter word `review`, it clipped mid-word. Widened it to fit `revalidate`, and moved the value column right to separate it from `decision`.

Clean on the final encode. Every useful label is 36 px or larger (about 12 px at 350 wide) and readable in individual native frames. The saved state stays fully visible through `offline`. No `approved` appears before the reviewer's decision, and `execute` never leaves `not run`. Margin dots never cross text. Each of the 32 cues lines up with a visible event and a spectrogram onset. Peak is −3.5 dBFS with no clipping; the two thumps are the loudest. Long still stretches are deliberate holds: 7.2–9.0 s, 13.7–17.0 s (saved), 24.5–27.0 s (restored and still paused), 33.7–36.0 s (no decision after 24 h), and 43.6–47.0 s (final).

## Suggested improvements (ranked by teaching impact)

1. **Name what the timeout tried to do** (30.2–31.1 s, size S). Saw: an unlabelled grey dot on a dashed path. Change: start the dot at `waited 24 h` with that row highlighted. Effect: clearer that it is elapsed time being refused.
2. **Retime the lesson text** (whole video, size S, coordinator). Change: beats 0/9/27/36, duration 49. Effect: captions land on their motion.
3. **Shorten the post-save hold** (13.7–17.0 s, size S). About 3.3 s; trim 0.8 s.
4. **Show the restore reading the same record** (21.6 s, size S). Change: flash the saved `run` and `action` rows as the restore dot leaves. Effect: ties the restored memory to the saved rows.
5. **Mark the reviewer as the only writer** (37.0 s, size M). Change: make the decision path solid and the timeout path dashed, both visible at the end. Effect: a side-by-side contrast in the final frame.
6. **Final hold** (43.6–47.0 s, size S). About 3.4 s; extend 0.5 s if viewers need it.
7. **Listen once** (whole video, size S). Confirm the clock ticks are audible and the two thumps sound distinct (worker E3, timeout C3).

## Notes for the skill (not acted on)

- Highlight-band height should default to the row spacing when text rows are dense; the `hlH` option makes that explicit.
