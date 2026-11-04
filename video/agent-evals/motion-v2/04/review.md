# Lesson 04 review (render 2, final)

**Bound to:** `video.mp4` SHA-256 `54f87007a6786bf0f46ddfb5bc7577453379da9becaeaf77157b03914bf0c480` (42.00 s). Any re-encode voids this review.

## Evidence scope

- **Analysed:** 37 encoded frames from this exact file at every beat and boundary (0, 1.0, 2.2, 3.6, 4.2, 6.5, 8.0, 8.5, 9.4, 10.4, 11.4, 12.5, 13.6, 14.6, 16.0, 17.2, 17.6, 18.4, 19.4, 20.0, 21.5, 23.1, 24.4, 25.4, 26.4, 27.5, 28.6, 29.6, 31.0, 31.7, 33.5, 34.6, 36.0, 38.0, 40.0, 40.6, 41.95 s), in `scratch/enc/` at 1080×1920 and `scratch/enc350/` at native 350×622. Viewed: the 350 px sheet (`scratch/enc350-sheet.png`), individual unscaled 350 px frames at 9.4, 16.0, 20.0, 25.4 and 38.0 s (`scratch/native350-row.png`), the contact sheet, and the spectrogram. Busy moments were also viewed at full size as pre-encode stills (`scratch/busy1.png`, `scratch/busy2.png`; the encoded frames supersede them). Also checked: `volumedetect` and `astats` levels, a full decode, and MP4 box order.
- **Heard:** nothing. The audio was **not listened to**. Sound claims rest on the cue list, spectrogram and levels.
- **Not covered:** the site at reading and phone widths, and comparison with other cuts. Passing these scoped checks is not proof that the video is correct in every respect.

## Fixed before handover

- **Whole trial card:** the title `TRIAL 1` ran into its status (`TRIAL 1running`) in the 410 px card. Retitled the card `T1` / `T2`, matching the IDs in `ALL ATTEMPTS`.
- **Agent card, 8–12 s and 23–27 s:** `AGENT running` had almost no gap. Reduced the card's title size to 34 px.
- **Report, from 34.4 s:** `1 pass · 1 fail · 2 trials` sat on the card's bottom border. Made the report card taller and moved both lines down.

Clean on the final encode. Every useful label is 34 px or larger (title) and 40 px for values (about 13 px at 350 wide), readable in individual native frames. Copy and save dots travel only through empty gaps and the right margin. No PASS or FAIL appears before its run ends, and the clean start never changes. Each of the 27 cues lines up with a visible event and a spectrogram onset. Peak is −5.0 dBFS with no clipping. The discard's three `poof` cues are the densest broadband moment (17.0–17.7 s). Long still stretches are deliberate holds: 4.8–8.0 s, 20.6–23.0 s (clean T2 beside saved T1), and 35.3–40.0 s (final). At 17.6 s the copy is mid-discard with one row still visible, which is intended.

## Suggested improvements (ranked by teaching impact)

1. **Show that saved evidence does not flow back** (19.2–20.0 s, size S). Saw: nothing stops a viewer from assuming T2 could read the saved T1 row. Change: a brief dim line from `ALL ATTEMPTS` to the T2 copy ending at an ×, like lesson 02. Effect: makes "no carryover" explicit. Risk: more motion.
2. **Retime the lesson text** (whole video, size S, coordinator). Change: beats 0/8/17/31.5, duration 42. Effect: captions land on their motion.
3. **Name the reset** (17.0 s, size S). Saw: rows vanish, but nothing names it. Change: the T1 status shows `discarded` for 1 s. Effect: beginners read it as deliberate.
4. **Compare copy and clean start side by side** (16.0 s, size S). Change: flash the three changed T1 values beside their clean counterparts before the discard. Effect: shows exactly what would have leaked.
5. **Soften the discard** (17.0–17.7 s, size S). Saw: three noise bursts in 0.5 s. Change: lower the poof gain or use two. Effect: less harsh on phones.
6. **Final hold** (35.3–40.0 s, size S). About 4.7 s; cut 1 s if slack.
7. **Listen once** (whole video, size S). Confirm the PASS chime and FAIL thump are clearly different and the poofs aren't abrasive.

## Notes for the skill (not acted on)

- Narrow panels need a title/status width check; a measured-collision warning in the local `panel` node would have caught `TRIAL 1running` before a render.
