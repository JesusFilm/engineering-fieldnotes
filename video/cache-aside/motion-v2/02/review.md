# Lesson 02 review (render 2, final)

**Bound to:** `video.mp4` SHA-256 `2a6d897ebe4d164518366da8e3cecfec56f5dc308d3bf48617e76c33b929bee8` (35.00 s). Any re-encode voids this review.

## Evidence scope

- **Frames:** 27 frames decoded from this exact file at beat landings and boundaries (0, 1.2, 2.4, 3.6, 4.6, 6.2, 8.2, 8.5, 8.9, 9.3, 9.75, 10.4, 11.2, 13.5, 15.4, 15.6, 16.0, 16.5, 16.9, 17.4, 19.1, 21.5, 23.9, 24.2, 28.0, 32.9, 34.95 s). Each was saved at native size (`scratch/enc/`) and at 350 px (`scratch/enc350/`), with a sheet at `scratch/enc-350-sheet.png`.
- **Transits:** 12 frames covering request and copy travel (8.4–9.5 and 15.5–16.6 s), at native size and 350 px (`scratch/transit*/`).
- **Single frames:** native-350 views at 11.2 and 28.0 s (`scratch/pair350.png`), plus a full-size crop at 11.2 s (`scratch/native-crop-11.2.png`).
- **Audio:** spectrogram (`scratch/spectrogram.png`), per-cue peaks (`scratch/cue-peaks.json`), `volumedetect`, full decode, and MP4 box order.
- **Heard:** nothing. The audio was **not listened to**.
- **Not covered:** site or browser checks, comparison with other cuts, and lesson-text retiming.

## Fixed before handover

- **Request chip touching `1 check` (render 1, about 9.0 s):** the chip text went from 44 to 40 px, and the label moved 25 px right. All six transit frames now show a clear gap.
- **Design pre-check (before render 1):** single-line rows did not fit 44 px text in the narrow side-by-side tables. Rather than shrinking the text, the rows now show the key and value on two lines.
- **Re-checked on the final encode:**
  - Text: all labels are ≥40 px at 1080 (the request chip is 40 px; everything else is ≥44 px) and readable at native 350, including the grey database rows.
  - Overlaps: nothing enters the title band, and the copy chip clears the `Cache` heading.
  - Lingering state: the amber cache outline and dimmed `runbook:ops` reset before the hold.
  - Database: the source path never carries a chip, `source reads` reads 0 in every frame, and no frame shows a database revision.
  - Audio: all 14 cues appear in the spectrogram (−8.8 to −20.8 dBFS per cue). The peak is −6.6 dBFS, and the database's only cue is the quiet intro at 3.3 s.
- **Pacing:** the still stretches are the deliberate holds: 11.4–15.5 s (hit), 19.5–24.0 s (copy received, 0 reads), and 24.5–33.0 s (final question).

## Suggested improvements (ranked by teaching impact)

1. **Retime the lesson text** (whole video, size S, coordinator). Use beats at 0/8.4/15.5/24.0 and duration 35.
2. **Reconsider teal on `source reads: 0`** (19.0 s onward, size S). Saw: the counter stays teal through the end. Teal elsewhere means found or received, so it may read as "source OK". Change: pulse it teal, then return it to white. Effect: the avoided read is emphasized without implying a source state.
3. **Make the path direction readable at rest** (whole video, size S). Saw: both dotted paths are faint at 350 px. Change: add small arrowheads, or brighten the cache path after 5.8 s. Effect: "check first" reads before the chip moves.
4. **Lengthen the final hold slightly** (24.5–33.0 s, size S). If viewers need longer with `current?`, add 2 s before the fade. This is a judgement call, and the current hold is 8.5 s.
5. **Listen to the hit cue** (11.1 s, size S). It is the main event, but measures below the arrival note (−9.9 vs −8.8 dBFS). Audition it, and raise it about 2 dB if it does not stand out.
6. **Larger request chip** (8.4–9.7 s, size S). It is 40 px (≈13 px at 350), the smallest text in the video. A shorter path layout could restore 44 px.

## Notes for the skill (not acted on)

- A two-line (`stack`) record row is useful for side-by-side tables at phone width.
