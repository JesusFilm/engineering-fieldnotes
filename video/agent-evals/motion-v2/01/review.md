# Lesson 01 review (render 2, final)

**Bound to:** `video.mp4` SHA-256 `d24e29b9749da062f97b2155b19a14206d07aaccb3495c70bebe769ebdb8314c` (42.00 s). Any re-encode voids this review.

## Evidence scope

- **Analysed:** 35 encoded frames from this exact file at every beat and boundary (0, 2.0, 3.5, 5.2, 6.6, 8.5, 9.5, 9.9, 10.4, 11.6, 12.8, 15.1, 17.4, 18.4, 19.3, 20.8, 21.4, 22.2, 23.8, 24.6, 25.2, 26.1, 27.0, 28.4, 29.4, 30.2, 31.9, 32.5, 33.8, 35.0, 37.5, 40.0, 40.5, 41.2, 41.95 s), in `scratch/enc2/` at 1080×1920 and `scratch/enc2-350/` at native 350×622. Viewed: the 350 px sheet (`scratch/enc2-350-sheet.png`), individual native 350 px frames at 10.4, 21.4, 22.2 and 29.4 s (`scratch/native350-quad2.png`), the busiest frame at full size (21.4 s, with the poster, `scratch/poster-and-2140.png`), the contact sheet, and the spectrogram. Also checked: `volumedetect` and `astats` levels, a full decode, and MP4 box order.
- **Heard:** nothing. The audio was **not listened to**. Sound claims rest on the cue list, the spectrogram, and level measurements.
- **Not covered:** the site at reading and phone widths, and comparison with other cuts. Both belong to the coordinator and a fresh comparison reviewer. Passing these scoped checks is not proof that the video is correct in every respect.

## Fixed before handover

- **19.1 s:** the results reminder used the `clock` preset and barely registered on the spectrogram. Replaced it with the results voice (ack C4), which now shows a clear onset.
- **Whole video:** the subtitle `TASK · TRIAL · GRADER` rendered at 28 px (about 9 px at 350 wide). Added `meta.subtitleSize` to the local engine and set it to 38 px.
- **21.0–21.4 s:** as the `P1 + trace` chip left, its edge touched the `save patch P1` highlight. Moved it 10 px right and set its text to 34 px; it now clears both the highlight and the grader's `waiting` status.

Clean on the final encode. Every useful label is 36 px or larger (about 11.7 px at 350 wide) and readable in individual native frames. Nothing enters the title band, and no highlight lingers past its beat. Each of the 43 cues lines up with a visible event and a spectrogram onset. Peak is −7.2 dBFS with no clipping. The longest still stretches are the deliberate holds: 6.8–9.5 s, 22.6–24.3 s, and the final 35.7–40.0 s.

## Suggested improvements (ranked by teaching impact)

1. **Show the grader running its own check** (24.3–26.0 s, size M). Saw: `checking` underlines in place, so where the checks run stays abstract. Change: a dot from the grader into a small `test repo + P1` slot inside the grader panel. Effect: it is clearer that the grader executes behaviour instead of reading a claim. Risk: this overlaps lesson 02.
2. **Retime the lesson text** (whole video, size S, coordinator). Change: beats 0/9.5/21.0/31.5, duration 42.0. Effect: captions land on their motion.
3. **Sharpen "finished but ungraded"** (18.2–19.6 s, size S). Saw: the grey flash on `T1 ungraded` is subtle. Change: pulse the grader's `waiting` status at the same moment. Effect: links the finished trial to the grade that does not exist yet.
4. **Make the trace more explicit** (12.6 s onward, size S). Saw: the small `trace` tag sits apart from its rows. Change: draw a thin bracket along rows 1–3. Effect: `P1 + trace` points to something visible.
5. **Shorten the final hold** (35.7–40.0 s, size S). Saw: about 4.3 s of stillness. Change: cut about 1 s if viewers find it slack. Effect: tighter close.
6. **Vary the part sweep** (11.3–17.0 s, size M). Saw: all three sweeps use the same order. Change: light only the parts each step uses (for example tools and repo for `read`). Effect: more accurate, at the cost of a less regular sound pattern.
7. **Listen once** (whole video, size S). Saw: the levels look balanced, but nobody has heard the mix. Change: one listening pass on a phone speaker, especially the C4 results cues. Effect: confirms the actor voices separate.

## Notes for the skill (not acted on)

- The general `panel`, `txt` (typed reveal, highlight band, progress underline) and `tick` node types, chip `size`, and `meta.subtitleSize` could be useful in the shared engine after review.
