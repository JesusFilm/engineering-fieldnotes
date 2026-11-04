# Lesson 01 review (render 3, final)

**Bound to:** `video.mp4` SHA-256 `5ce494393bca1f90c6732139c846f57623634527f33ef061430f72a21943ae25` (40.00 s). Any re-encode voids this review.

## Evidence scope

- **Analysed:** 36 encoded frames from this exact file at every beat and boundary (0, 0.9, 2.0, 2.8, 3.9, 5.0, 6.1, 7.0, 7.8, 8.6, 9.6, 10.6, 11.7, 12.9, 14.0, 15.1, 16.3, 17.5, 19.2, 20.4, 20.8, 21.3, 22.6, 23.5, 24.6, 26.0, 28.3, 29.2, 30.1, 31.5, 32.7, 33.3, 35.0, 38.0, 38.5, 39.95 s), in `scratch/enc2/` at 1080×1920 and `scratch/enc2-350/` at native 350×622. Viewed: individual unscaled 350 px frames at 6.1, 8.6, 16.3, 23.5 and 35.0 s (`scratch/native350-row2.png`), an unscaled full-resolution crop at 22.6 s (`scratch/full-2260.png`), the contact sheet, and the spectrogram. Also viewed: the 350 px sheet of every boundary frame of this encode (`scratch/enc2-350-sheet.png`). Also checked: `volumedetect` and `astats` levels, a full decode, and MP4 box order.
- **Heard:** nothing. The audio was **not listened to**. Sound claims rest on the cue list, spectrogram and levels.
- **Not covered:** the site at reading and phone widths, and comparison with other cuts. Passing these scoped checks is not proof that the video is correct in every respect.

## Fixed before handover

- **22.4 s (render 1):** the executor's `decision` highlight band touched the `deploy calls 0` row below it. Spread the executor rows to 58 px apart and made the card taller; production moved down to match.
- **From 0.9 s (render 2):** the roles card's `human … reviewing` row dipped below its bottom border. Made the card taller and moved both rows up. A first attempt at this edit failed silently, which I caught on the 22.6 s crop; render 3 has the fix.

Clean on the final encode. Every useful label is 40 px or larger (about 13 px at 350 wide) and readable in individual native frames. The margin dots never cross text, the agent path ends at the × above production, and the submit dot ends inside the executor. No approval, deployment or production change appears. Each of the 24 cues lines up with a visible event and a spectrogram onset. Peak is −6.4 dBFS with no clipping. Long still stretches are deliberate holds: 16.6–19.0 s (pending decision), 24.8–28.2 s (executor waiting), and 33.6–38.0 s (final).

## Suggested improvements (ranked by teaching impact)

1. **Show that reviewing is not deciding** (12.8–16.2 s, size S). Saw: the human row says `reviewing`, then `pending` appears. Change: briefly highlight the human row and the `pending` decision together. Effect: links the person to the missing decision.
2. **Retime the lesson text** (whole video, size S, coordinator). Change: beats 0/10.5/19/28.2, duration 40. Effect: captions land on their motion.
3. **Place the agent's blocked path closer to its row** (7.0–8.4 s, size S). Saw: the dashed path starts at the roles card edge, far from the proposal fields. Change: start it at the `agent` word with a short horizontal stub. Effect: clearer ownership of the blocked route.
4. **Shorten the waiting hold** (24.8–28.2 s, size S). About 3.4 s; trim 0.5 s if slack.
5. **Final hold** (33.6–38.0 s, size S). About 4.4 s; trim 1 s if slack.
6. **Mark the executor as the only deployer** (19.0 s, size S). Change: show `can deploy` in white when the executor opens. Effect: the three `can` rows read as a set.
7. **Listen once** (whole video, size S). Confirm the quiet C4 `work` ticks and the low G3 production check are audible.

## Notes for the skill (not acted on)

- Text edits that pass regular expressions through JS template literals lose their backslashes; plain string replacements were safer here.
