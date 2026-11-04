# Lesson 04 review (render 3, final)

**Bound to:** `video.mp4` SHA-256 `ee5650aae56ed4f9cd7b15c3e75efa87c10c7b1b6ddef7c7abccdb7a693ed9b0` (43.00 s). Any re-encode voids this review.

## Evidence scope

- **Analysed:** 34 individual frames decoded from this exact file at 0, 1.6, 2.7, 3.0, 5.5, 7.5, 7.8, 8.5, 9.1, 9.7, 11.0, 12.1, 13.3, 14.4, 17.0, 19.6, 20.2, 21.1, 22.2, 22.5, 24.5, 27.0, 27.4, 28.1, 30.0, 31.6, 32.0, 33.3, 33.7, 35.0, 35.6, 38.0, 41.4 and 42.95 s, covering every hold and both sides of each bar close, the gap reveal, the second panel, the elbow, and each comparison. Frames are in `scratch/enc/` (1080×1920) and `scratch/enc350/` (native 350 px). Individual 350 px frames at 9.1, 14.4, 24.5 and 33.7 s viewed directly (`scratch/quad350.png`), plus full-size frames at 13.3 s (this encode) and 31.9 s (pre-fix still). Also the contact sheet, spectrogram, `volumedetect` and `astats`, a full decode and the MP4 box order.
- **Heard:** nothing. The audio was **not listened to**.
- **Not covered:** site checks and comparison against other cuts.

## Fixed before handover

- **12.0 s onward:** the `?` touched the top of its dashed slot. Slot height raised from 46 to 60 px.
- **Whole video:** the parent elbows used the dim resting wire colour and nearly vanished. They now use the mid grey (run 2's tool elbow turns white when it appears).
- **13.0 s (render 2):** the greyed "unexplained" stretch appeared with no sound. Added a quiet `ack` at the agent's pitch (C4).
- **Text size:** every label is 40 px or larger (titles 84 px); durations sit inside wide bars and beside the narrow 0.6 s bar.

Clean on the final encode: no clipped or overlapping text, nothing in the title band, run 1's gap slot stays empty, run 2 has no separate trace box, both tool bars are 470 px wide, both agent bars end at x 948, and no stale highlight remains in the holds. All 35 cues show as spectrogram onsets; peak −8.0 dBFS, no clipping.

## Suggested improvements (ranked by teaching impact)

1. **Retime the lesson text** (whole video, size S, coordinator). Change: duration 43.0, beats 0 / 12.0 / 19.5 / 31.5. Effect: captions match the motion.
2. **Make the grey stretch stronger** (13.0 s onward, size S). Saw: the greyed 0.6–3.0 s part of run 1's agent bar reads as a lighter shade, not a clear "unexplained" band, at 350 px. Change: add a dashed outline or hatch to the stretch. Effect: viewers link the agent's unexplained time to the `?` slot below it.
3. **Use the empty lower half during run 1** (0–19.5 s, size M). Saw: the bottom 40% of the frame is black until run 2. Change: show run 2's panel outline faintly from the start, or move run 1 lower. Effect: a calmer composition with no sudden panel appearance. Risk: an empty run 2 panel could suggest it exists before it runs.
4. **Connect the gap to the run 2 tool bar spatially** (34.9 s, size S). Saw: the `?` slot and run 2's tool bar flash in turn but sit 680 px apart. Change: draw a brief dashed vertical guide at x 478 joining the slot's start to run 2's tool start. Effect: shows they start at the same 0.6 s point.
5. **Listen to the thump** (14.2 s, size S). Saw: it carries the most low-frequency energy. Change: audition it; lighten if it dominates. Effect: keeps the run 2 chime as the high point.
6. **Final hold length** (35.5–41.0 s, size S). Keep for beginners or trim 1 s.

## Notes for the skill (not acted on)

- `spanbar` (time-scaled bar with duration label and an overlay stretch) is general and would suit any waterfall or latency lesson.
- Wires cannot be drawn solid; guides and elbows would read better as solid strokes.
