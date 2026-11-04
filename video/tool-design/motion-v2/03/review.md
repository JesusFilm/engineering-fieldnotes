# Lesson 03 review (render 3, final)

**Bound to:** `video.mp4` SHA-256 `fd17077cc46339e7d1527c9ce782a0f17a147e29e7f23d6db39d90ca4821e34a` (42.00 s). Any re-encode voids this review.

## Evidence scope

- **Analysed:** 38 encoded frames extracted from this exact file at 0, 0.9, 2.6, 3.4, 4.5, 5.2, 5.8, 8.2, 8.9, 9.6, 10.4, 11.1, 12.3, 13, 14.3, 14.9, 15.6, 18.3, 18.8, 19.9, 20.4, 21.2, 22, 23.1, 23.9, 26.2, 26.9, 27.6, 28.4, 29.1, 31.4, 31.9, 32.6, 33.4, 36, 40.1, 40.8, 41.96 s. That covers every beat landing and both sides of each boundary: the failed citation, each record and dot, the window fill, both citations, the over-claim, its correction and the final status. Ten key frames were viewed individually at native 350 px width (`scratch/key350a.png`, `scratch/key350b.png`), the citation and over-claim moments at full resolution (`scratch/native-pair.png`), and all frames on a 350 px sheet (`scratch/enc350-sheet.png`). Also checked: the contact sheet, the spectrogram, `volumedetect` and `astats`, a full decode, and the MP4 box order.
- **Heard:** nothing. The audio was **not listened to**. Sound claims come from the cue list, the spectrogram and levels.
- **Not covered:** a browser or site check, and comparison with other cuts. Passing these scoped checks does not establish universal correctness.

## Fixed before handover

- **Render 1, axis:** the axis had no day range, so "today" could not be judged against it. Added `06:00` and `12:00` end labels, thickened the track and enlarged the record dots for 350 px.
- **Render 1, 26.8 s:** the over-claim `No others today` was vague. It now reads `No other incidents today`.
- **Render 2, 31.6–33.2 s:** the answer status stayed `over-claims` in red after the claim was corrected, which was stale state. It now clears when the claim changes and becomes `within scope` at 33.2.

Clean on the final encode: essential text is 40 px or larger at source (about 13 px or more at 350 px wide) and readable without zoom. Nothing overlaps or is clipped, and nothing sits in the title band. Gutter dots run outside the panels, and no state lingers: the grey × clears at 8.4, the citation outlines at 26.0, and the red segments and × at 32.4. No dots or counts appear outside the searched window. All 25 cues show as spectrogram onsets. The peak is −7.3 dBFS, so nothing clips. The longest motionless stretch outside the final hold is about 2.9 s (15.6–18.5).

## Suggested improvements (ranked by teaching impact)

1. **Tie each dot to its record** (10.7 and 12.6 s, size S). Saw: the dots land, but nothing links them to their rows. Change: briefly outline the matching result row in amber as each dot lands. Effect: "this record happened at this time" reads without labels.
2. **Retime the lesson text** (whole video, size S, coordinator). Change: beats at 0/9.2/18.5/26.8 and duration 42.0.
3. **Make the bare-flag beat less abstract** (4–8 s, size S). Saw: the grey × sits in the gutter beside the status row. Change: also show a faint dashed empty slot under `status: ok` where records would be. Effect: "nothing here to cite" reads faster.
4. **Show the over-claim leaving the window on the axis** (27.8–28.8 s, size M). Saw: the scope dot arrives at the axis's right end, then both sides turn red. Change: sweep a red span outward from the window to both ends. Effect: "today" is felt as a wider claim than the searched hour.
5. **Trim the final hold** (33.2–40.2 s, size S). It is 7 s of stillness. Keep it for beginners, or cut 1–1.5 s.
6. **Listen to both `miss` cues** (5.0 and 28.8 s, size S). They were analysed only. Confirm they read as "unsupported" without sounding like a failure.

## Notes for the skill (not acted on)

- The `timeline` node (window plus event dots) is general and could replace `bar` with `mark` where dots need to be larger than the shared engine's 7 px.
