# Lesson 05 review (render 3, final)

**Bound to:** `video.mp4` SHA-256 `6f6a559572ad29fab32c370e361272a044879564d536cdc25e9fd01e6edbc179` (44.70 s). Any re-encode voids this review.

## Evidence scope

- **Analysed:** 39 encoded frames from this exact file at every beat and boundary (0, 1.0, 1.9, 3.2, 4.0, 5.5, 6.9, 7.5, 8.6, 9.5, 10.0, 11.0, 11.9, 12.9, 14.2, 15.5, 16.9, 18.1, 19.5, 20.6, 21.4, 22.3, 23.3, 24.7, 25.7, 27.0, 28.2, 29.3, 30.3, 31.3, 32.8, 34.2, 35.9, 37.1, 38.3, 40.2, 42.7, 43.3, 44.65 s), in `scratch/enc2/` at 1080×1920 and `scratch/enc2-350/` at native 350×622. Viewed: the 350 px sheet (`scratch/enc2-350-sheet.png`), individual unscaled 350 px frames at 5.5, 11.9, 22.3, 30.3 and 40.2 s (`scratch/native350-row2.png`), an unscaled full-resolution crop of the audit at 29.3 s (`scratch/full-audit-2930.png`), the contact sheet, and the spectrogram. Busy moments were also viewed as pre-encode stills (`scratch/busy1.png`). Also checked: `volumedetect` and `astats` levels, a full decode, and MP4 box order.
- **Heard:** nothing. The audio was **not listened to**. Sound claims rest on the cue list, spectrogram and levels.
- **Not covered:** the site at reading and phone widths, and comparison with other cuts. Passing these scoped checks is not proof that the video is correct in every respect.

## Fixed before handover

- **From 38 s (render 1):** the second evidence row, `release not decided`, sat below the evidence card's bottom border. Made the card taller and moved both rows up inside it.
- **3.9–8.0 s (render 2):** 4.4 s with no change after the held-out row. Moved everything from beat 2 onward 1.3 s earlier with one documented shift; the longest opening still stretch is now 2.8 s.
- **Render 2 was identical to render 1:** my first attempt at the shift failed to edit the file and produced the same hash. The second attempt applied it, and render 3 (this file) has a new hash.

Clean on the final encode. Every useful label is 36 px or larger (about 12 px at 350 wide) and readable in individual native frames. Grader dots travel only in the left margin. No human score appears before its sample's automated score, and no `false` verdict before both scores. Each of the 28 cues lines up with a visible event and a spectrogram onset. Peak is −4.9 dBFS with no clipping. Long still stretches are deliberate: 32.8–35.7 s (after recalibrate) and 38.4–42.7 s (final). The amber rubric tick is mid-draw at 11.9 s, which is intentional.

## Suggested improvements (ranked by teaching impact)

1. **Tie the audit to the suite's explain row** (15.2 s, size S). Saw: the audit appears below with no visible link to `explain`. Change: flash the explain row and its amber tick as the audit opens. Effect: makes clear that the audit checks that soft mark.
2. **Retime the lesson text** (whole video, size S, coordinator). Change: beats 0/6.7/15.2/35.7, duration 44.7. Effect: captions land on their motion.
3. **Make the two error directions easier to tell apart** (23.1 and 31.1 s, size S). Saw: both verdicts are red. Change: keep `false pass` red and make `false fail` amber. Effect: shows they are different errors, while both still count as grader faults.
4. **Fold the time shift into literal times** (source only, size S). Saw: the `SHIFT` wrapper is correct but indirect. Change: rewrite the times as literals. Effect: easier to edit the source; the video doesn't change.
5. **Final hold** (38.4–42.7 s, size S). About 4.3 s; cut 1 s if slack.
6. **Pace the A sample** (16.5–23.1 s, size S). Six events in 6.6 s; add 0.5 s before `human FAIL` if beginners need time to read the criterion.
7. **Listen once** (whole video, size S). Confirm the two `miss` cues are audible and the two thumps aren't harsh.

## Notes for the skill (not acted on)

- A time-shift wrapper around `s.set`, `s.sfx` and `s.packet` is a quick pacing tool, but `pulse` and `fade` call `s.set` internally and must not be wrapped twice.
