# Lesson 04 review (render 2, final)

**Bound to:** `video.mp4` SHA-256 `8ab396bace8fcbbe6f62b80b038f40fe22822a5c6cd15f2552ce739908004f5b` (45.00 s). Any re-encode voids this review.

## Evidence scope

- **Analysed:** 37 encoded frames from this exact file at every beat and boundary (0, 1.0, 2.0, 3.2, 4.6, 5.2, 5.8, 6.8, 7.8, 8.6, 10.0, 11.2, 12.0, 12.8, 13.8, 14.6, 15.8, 17.0, 17.6, 18.8, 20.4, 21.8, 23.0, 25.5, 28.3, 29.2, 30.6, 32.0, 33.4, 35.0, 37.2, 38.2, 39.2, 41.0, 43.0, 43.6, 44.95 s), in `scratch/enc/` at 1080×1920 and `scratch/enc350/` at native 350×622. Viewed: the 350 px sheet of all of them (`scratch/enc350-sheet.png`), individual unscaled 350 px frames at 6.8, 15.8, 17.6, 23.0 and 41.0 s (`scratch/native350-row.png`), an unscaled full-resolution crop at 32.0 s (`scratch/full-3200.png`), the contact sheet, and the spectrogram. Busy moments were also viewed as pre-encode stills (`scratch/busy1.png`). Also checked: `volumedetect` and `astats` levels, a full decode, and MP4 box order.
- **Heard:** nothing. The audio was **not listened to**. Sound claims rest on the cue list, spectrogram and levels.
- **Not covered:** the site at reading and phone widths, and comparison with other cuts. Passing these scoped checks is not proof that the video is correct in every respect.

## Fixed before handover

- **Every card (render 1):** the first row overlapped the card title (`BUILDS` on A, `COMPARE` on the column headers, `EXECUTOR` on `result`, `REVIEW B` on `artifact`). Made the cards taller, moved each card's rows below its title, and re-pointed the review route to the new row.
- **Executor status (render 1):** `result artifact mismatch` ran into the `blocked`/`checking` status. Shortened the value to `mismatch`; the ✗ sits on the artifact row.
- **Review status (render 1):** `decision needed` crowded the `REVIEW B` title. Changed it to `pending`.

Clean on the final encode. Every useful label is 38 px or larger (about 12 px at 350 wide) and readable in individual native frames. The approved artifact reads `A · 7c2e…` in every frame, and the requested artifact changes to B only at 6.6 s. No ✓ appears before its pair is highlighted, and the ✗ comes last. `deploy calls 0` and `production previous` never change, and nothing reads as B approved. Each of the 27 cues lines up with a visible event and a spectrogram onset. Peak is −5.6 dBFS with no clipping; the block thump is the loudest. Long still stretches are deliberate holds: 8.7–11.0 s, 23.8–28.0 s (blocked), 33.6–37.0 s, and 39.4–43.0 s (final).

## Suggested improvements (ranked by teaching impact)

1. **Keep the result key neutral** (from 17.4 s, size S). Saw: the whole `result mismatch` row turns red, including the key. Change: colour only `mismatch`. Effect: matches the other rows' key/value styling.
2. **Retime the lesson text** (whole video, size S, coordinator). Change: beats 0/11/20.2/28, duration 45. Effect: captions land on their motion.
3. **Shorten the blocked hold** (23.8–28.0 s, size S). About 4.2 s; trim 1 s.
4. **Show that the full identity is compared** (15.6–17.4 s, size M). Change: briefly expand both artifacts to longer digests while they are held. Effect: guards against reading it as a prefix check.
5. **Tie B in BUILDS to the review** (29.0 s, size S). Change: flash `B · 92bd…04c8` in BUILDS as REVIEW B opens. Effect: one identity across three places.
6. **Final hold** (39.4–43.0 s, size S). About 3.6 s; keep it, or trim 0.5 s.
7. **Listen once** (whole video, size S). Confirm the `miss` at 17.4 s is distinct from the thump at 20.2 s.

## Notes for the skill (not acted on)

- Text panels need a fixed title band (about 70 px) before the first row; several cuts hit the same title/row overlap.
