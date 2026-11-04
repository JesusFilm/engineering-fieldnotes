# Lesson 05 review (render 2, final)

**Bound to:** `video.mp4` SHA-256 `0a248d604d0c97509bb2602176cb526997e444057f918f789f6893a91cd1f180` (45.00 s). Any re-encode voids this review.

## Evidence scope

- **Frames:** 30 frames decoded from this exact file at beat landings and boundaries (0, 1.2, 2.2, 3, 3.8, 5, 5.8, 7.3, 9.3, 11.5, 13.1, 14.7, 15.4, 17.3, 19, 19.6, 21.2, 21.9, 23.8, 25.6, 27, 27.6, 29.2, 31.1, 32.2, 33.5, 34.8, 38, 42.9, 44.95 s). Each was saved at native size (`scratch/enc/`) and 350 px (`scratch/enc350/`), with a sheet at `scratch/enc-350-sheet.png`.
- **Transits:** 21 frames covering all eight chip trips (6, 6.4, 6.8, 7.1, 8.2, 8.6, 9, 13.4, 13.8, 14.3, 16, 16.5, 19.9, 20.4, 22.5, 23, 27.9, 28.4, 28.9, 30, 30.5 s), at native size and 350 px (`scratch/transit*/`).
- **Single frames:** native-350 views at 11.5, 25.6 and 38.0 s (`scratch/trio350.png`).
- **Audio:** spectrogram, per-cue peaks (`scratch/cue-peaks.json`), `volumedetect`, full decode, and box order.
- **Heard:** nothing. The audio was **not listened to**.
- **Not covered:** site or browser checks, comparison with other cuts, and lesson-text retiming.

## Fixed before handover

- **Cramped application panel (render 1):** the `runbook:api` / `uses rev 2` line sat tight under the heading. The panel is now 24 px taller with a larger line gap, and the link and chip endpoints moved to match.
- **Design pre-checks carried from lessons 03–04:** the miss cue is raised (gain 2.2, now −16.2 dBFS), so the main lookup result is not the quietest sound. Chip endpoints sit just outside the panels, so no chip covers panel text.
- **Re-checked on the final encode:**
  - Text: all text is ≥40 px (the two `runbook:api` chips are 40 px; everything else is ≥44 px) and readable at native 350.
  - Order: log rows appear in numeric order, and each result appears only after its chip (or `ok`) lands. The cache entry is `no entry` from 7.2 to 29.1 s.
  - Database and links: the database reads `rev 2 / step 6` in every frame, and no chip runs between the two stores.
  - Colour: `miss` is amber, with no red or ×.
  - Audio: all 29 cues appear in the spectrogram (−8.6 to −20.1 dBFS per cue). The peak is −7.1 dBFS.
- **Pacing:** the still stretches are the deliberate holds at 9.6–13.0, 17.6–19.5, 26.1–27.5 and 35.1–43.0 s.

## Suggested improvements (ranked by teaching impact)

1. **Retime the lesson text** (whole video, size S, coordinator). Use beats at 0/13.0/19.5/27.5 and duration 45.
2. **Make the links more visible** (whole video, size S). Saw: the dotted diagonal links are faint at 350 px. Change: brighten the active link while a chip travels, or add a small arrowhead. Effect: the application is clearly the origin of every operation.
3. **Lengthen the hold after the delete** (9.6–13.0 s, size S). If the empty `no entry` state needs more time, add about 1 s. Plan A asked for a long empty-cache hold.
4. **Listen to the `poof`** (7.2 s, size S). It is a broadband noise burst at −13 dBFS. Check that it reads as "removed" rather than as an error.
5. **Show the stale-set risk visually** (34.5 s on, size M). `another writer?` is a text-only hint. A dashed, unsent `set rev 1` chip next to the note could make the risk concrete without playing the race. Consider it only if the lesson text expands; otherwise it previews material beyond this lesson.
6. **Larger lookup chips** (13.4, 19.9 s, size S). They are 40 px. `get` and `read` labels would allow 44 px, at the cost of not naming the key in motion.

## Notes for the skill (not acted on)

- An operations log (numbered rows that gain results) is a general way to show ordering between separate operations.
