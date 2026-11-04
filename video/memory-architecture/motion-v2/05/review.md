# Video 05 review (render 2, final)

**Bound to:** `video.mp4` SHA-256 `fdcd71856dac5de7ea876ed7d30a5f228781ab87813391824819ce7c5060c68f` (40.60 s). Any re-encode voids this review.

## Evidence scope

- **Analysed:** 33 encoded frames from this exact file at 0.3, 1.0, 2.0, 3.5, 4.4, 5.2, 7.5, 8.9, 9.9, 10.4, 11.0, 12.0, 14.0, 15.7, 16.4, 17.3, 18.3, 19.5, 21.5, 23.3, 24.4, 25.0, 25.4, 26.2, 27.6, 28.6, 30.0, 31.6, 33.0, 35.5, 38.5, 39.4, and 40.4 s.
  - **Coverage:** every beat and boundary, both write dots and the read dot, outdated → superseded, the r2 store and link, and candidate → checked.
  - **How viewed:** individual frames in `scratch/enc/` at full size and `scratch/enc350/` at native 350 × 622, as unscaled strips (`scratch/strip*.png`), plus a full-size check of 2.0 s.
  - **Display artifact:** `strip0` appeared small in the viewer; the file is 1750 × 622.
  - **Also checked:** the contact sheet, spectrogram, `volumedetect` and `astats` levels, a full decode, and the MP4 box order.
- **Heard:** nothing. I did **not listen to** the audio. Sound claims come from the cue list, the spectrogram, and levels.
- **Not covered:** a browser or site check, and comparison with other cuts. Passing these scoped checks does not prove the video is correct in general.

## Fixed before handover

- **18.0 s onward:** the `replaced by` bracket never appeared, because the memory frame's filled background was drawn over the wire. I added a general `noFill` panel option to this cut's engine copy and used it for the frame. The bracket now joins r1 and r2.
- **8.6–40 s, owner strip:** the title `owner · billing` and the action line nearly touched. I made the strip 130px tall and moved the action down 16px.

The final encode is clean:

- **Text and layout:** text is 36px or larger, and nothing is clipped, overlaps, or enters the title band.
- **Record invariants:** r1's value and `AGENTS.md @ r1` never change, and r1 is never deleted. r2 is a separate card. The link appears only after r2 is stored. The later read selects only r2. The session shows `candidate` before `checked`.
- **Sound:** all 21 cues appear as spectrogram onsets. Peak is −7.7 dBFS, with no clipping.
- **Stillness:** the deliberate holds are 5.1–8.6, 12.8–15.4, 20.4–23.0, 28.8–31.4, and 33.6–39.0 s.

## Suggested improvements (ranked by teaching impact)

1. **Strengthen the margin paths** (9.6–10.6, 16.0–17.0, 24.0–25.0 s, size S). At 350px the dotted path and 7px dot are faint. Thicken the path or raise the dot radius so the owner → record and session → r2 movements read at a glance.
2. **Make the bracket bolder** (18.0 s onward, size S). The dotted bracket at x 140 is thin beside the cards. Use a solid accent line with an arrowhead at r2. Effect: "replaced by" reads as a structural link.
3. **Show that r1 was not selected** (25.0 s, size S). Only r2 pulses during the read. A brief dim of r1 at the same moment would make "matching version only" explicit.
4. **Shorten the first hold** (5.1–8.6 s, size S). 3.5 s with no change could become 2.6 s. Keep the holds after the supersede and after `checked`.
5. **Retime lesson text** (coordinator, size S). Beats start at 0, 8.6, 15.4, and 23.0 s; duration is 40.6 s. `lessons.json` assumes 28 s.
6. **Name what the check compared** (27.4 s, size M). Lighting `checkout r2` and `got … @ r2` together implies the comparison. A tiny `=` between the two rows' revisions would state it. Lesson 04 already teaches the check, so this is optional.
7. **Listen to the two `store` cues** (10.6 and 17.0 s, size S). They mark the supersede write and the r2 write at G4 and G5. Confirm by ear that they read as writes and not as successes.

## Notes for the skill (not acted on)

- Panels fill their background, which hides wires drawn inside them. The local `noFill` option fixes this for frames, and the shared type may want the same option.
- A record-history layout (stacked versions under one key, with status words and a replacement link) is reusable for any versioned-record topic.

