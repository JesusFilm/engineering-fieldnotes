# Video 02 review (render 4, final)

**Bound to:** `video.mp4` SHA-256 `8d4ad71208a54629c9031b472e19a90667009e53f97f8b38d2cae4236e44d7f4` (37.23 s). Any re-encode voids this review.

## Render 4 follow-up: copy no longer crosses the source row

An independent encoded review of render 3 found one objective defect. At about 24.5 s, the moving `Export FAIL` chip crossed the Baseline `Export` row and covered its `FAIL` text.

Fix: the copy now starts beside the source value at x 770, in the empty right-hand part of the row. It drops straight down that empty side to the Known failures row. The `before edits` tag appears 0.2 s after the chip fades at that position, so no text is superimposed. The source row stays unchanged and red throughout.

Checked on this encode:

- 13 frames from 23.50 to 26.50 s in 0.25 s steps, each saved at native size and at 350 px wide (`scratch/copy3/`, sheet `scratch/copy3-350-sheet.png`, native crop `scratch/copy3-native-crop.png` at 24.25, 24.75, 25.25, and 25.50). `FAIL` in the source row is readable in every frame.
- 18 standard beat and boundary frames (`scratch/enc3/`, `scratch/enc3-350-sheet.png`) show no other change.
- Full decode, levels, cue peaks, and box order were re-run. Cue timings and levels match render 3, because only the copy path and the tag timing changed.

The sections below describe render 3's evidence. Its frame sets (`scratch/enc2/`) belong to the superseded encode, and the frame-level findings were re-confirmed on render 4 through the sets above.

## Evidence scope

- **Analysed:** 28 frames decoded from this exact file at 0, 1.5, 2.5, 4.3, 5.9, 7.5, 8.4, 9.3, 10.9, 11.8, 13.2, 14.6, 16.0, 17.6, 19.2, 20.7, 21.9, 23.0, 24.6, 25.4, 26.2, 27.5, 29.2, 31.0, 34.0, 35.5, 36.3, and 37.18 s, covering each beat's landing and each boundary (`scratch/enc2/`).
- **Views:** a 350 px-wide sheet of all 28 (`scratch/enc2-350-sheet.png`), plus native 1080×1920 views of the busiest and most crowded frames (`scratch/native-key.png`: 2.5, 20.7, 25.4, 31.0). The chip in transit at 25.4 clears the `Known failures` title by about 40 px.
- **Audio:** spectrogram (`scratch/spectrogram.png`); peak per cue from the decoded audio (`scratch/cue-peaks.json`); `volumedetect`; full decode; MP4 box order.
- **Heard:** nothing. The audio was **not listened to**, and every sound statement comes from measurement.
- **Not covered:** a site or browser check at reading and phone widths, and comparison with other cuts.

## Fixed before handover

- **Failure cue:** the `miss` at 20.44 s peaked at −22.7 dBFS, the quietest cue, on the most important beat. Raised it to −10.0 dBFS. Lowered the following `exit 1` note to −14.4 dBFS, so the failure is not masked.
- **Silent event at about 7.8 s:** the `Instructions` header brightened 0.4 s before its first row, with no sound. Moved it onto the row's own beat.
- **Re-checked on the final encode:** all text is 28 px or larger, nothing clips or overlaps, and no state lingers (each highlight clears, the activity track stops at 21.56). The Export row stays red after the copy. The panel never turns green. Every visible event has a cue (14 cues, all present as spectrogram onsets). Peak is −7.7 dBFS, so nothing clips.
- **Pacing:** the longest still stretch outside the deliberate final hold is about 2.7 s, from 5.6 to 8.2 s, while the solid outline settles.

## Suggested improvements (ranked by teaching impact)

1. **Retime the lesson text** (whole video, size S, coordinator). Use beats at 0/8.2/14.2/28.9 and duration 37.2, so the captions match the motion.
2. **Thin the empty slots at the start** (0–8 s, size S). Saw: eight empty row outlines on the opening sheet. Change: show only the Workspace slots at first, and fade each section's slots in when its title lights. Effect: less to scan in the first seconds, so the eye goes to `rev ?`.
3. **Link the saved stamp to the known failure** (28.9 s, size S). Saw: the stamp and the `rev` row light together, but the failure record does not. Change: also pulse the `before edits` tag. Effect: the failure is visibly part of the saved starting evidence.
4. **Give the run a little more time** (15.6–20.4 s, size S). Saw: the three outcomes arrive 1.6 s apart. Change: add about 0.5 s before Parse. Effect: "the run is in progress" registers before any result.
5. **Listen to the failure cue** (20.44 s, size S). Its measured level is right, but how it sounds has not been checked. Audition it for harshness, since the `miss` gain is now high.
6. **A later comparison column** (end, size M). An empty `Later` column could hint at future comparison. It was left out for density and scope; reconsider it if lesson 03's cut does not cover comparison.

## Notes for the skill (not acted on)

- A generic `card`, with rows, value columns, reveal, and tags, now exists in two local engines (01 and 02, with 02 a superset). It is a candidate for the shared skill after review.
- An indeterminate `track` is useful wherever a run has no meaningful percentage.
