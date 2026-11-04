# Lesson 04 review (render 2, final)

**Bound to:** `video.mp4` SHA-256 `bc722b7ab9b7a4a66ca6b4712f83033df5accf8893a2554c64bf2f55779f7340` (43.00 s). Any re-encode voids this review.

## Evidence scope

- **Frames:** 31 frames decoded from this exact file at beat landings and boundaries (0, 1, 2.2, 3.2, 4.8, 7.5, 8.3, 8.9, 9.7, 10.3, 10.6, 10.95, 11.4, 13.4, 14.2, 18.5, 19.4, 20.1, 20.8, 21.6, 24, 26.4, 27.1, 27.9, 29, 30.2, 31.1, 32.2, 36, 40.9, 42.95 s). Each was saved at native size (`scratch/enc/`) and 350 px (`scratch/enc350/`), with a sheet at `scratch/enc-350-sheet.png`.
- **Transits:** 18 frames covering the write, the database history slide, the lookup and the return (8.4, 8.8, 9.2, 9.6, 10, 10.25, 10.5, 10.75, 10.9, 11.1, 19.5, 19.9, 20.3, 26.5, 26.9, 27.3, 27.7, 27.9 s), at native size and 350 px (`scratch/transit*/`).
- **Single frames:** native-350 views at 4.8, 14.2 and 36.0 s (`scratch/trio350.png`).
- **Audio:** spectrogram, per-cue peaks (`scratch/cue-peaks.json`), `volumedetect`, full decode, and box order.
- **Heard:** nothing. The audio was **not listened to**.
- **Not covered:** site or browser checks, comparison with other cuts, and lesson-text retiming.

## Fixed before handover

- **Two database rows overlapping (render 1, about 10.3–10.6 s):** `rev 2 / step 6` faded in on top of `rev 1 / step 4` while the old row was still sliding, so their text overlapped. The new row now appears 0.65 s after the slide starts, once the old row has cleared. The transit frames at 10.25–11.1 s show no overlap.
- **Cramped editor panel (render 1):** the status line sat close to the bottom border. The panel is 16 px taller, with more space under the heading.
- **Re-checked on the final encode:**
  - Text: all text is ≥40 px (the two moving chips are 40 px; everything else is ≥44 px) and readable at native 350.
  - Write path: the `rev 2` chip travels only from editor to database, the cached row text never changes, and no chip touches the cache during the write beat.
  - Source path: the application → database link never carries anything, and `HIT` is teal with no red or ×.
  - Final frame: `step 4` (returned) and `step 6` (source) are visible together.
  - Audio: all 21 cues appear in the spectrogram (−8.6 to −19.9 dBFS per cue). The peak is −7.1 dBFS, and there is no E5 cue between 8.4 and 13.2 s.
- **Pacing:** the still stretches are the deliberate holds at 5.4–8.4, 14.1–19.5, 21.9–26.5 and 32.5–41.0 s.

## Suggested improvements (ranked by teaching impact)

1. **Retime the lesson text** (whole video, size S, coordinator). Use beats at 0/8.4/19.5/26.5 and duration 43.
2. **Make the unused source link easier to see** (whole video, size S). Saw: the dim application → database link nearly vanishes at 350 px. Change: brighten it slightly, or pulse it grey once during the hit. Effect: "no source read" becomes visible as a path that was not taken.
3. **Shorten the write-beat hold** (14.1–19.5 s, size S). It is 5.4 s. If it feels long on viewing, trim about 1 s. Keep at least 4 s on `≠` and `unchanged`.
4. **Listen to the E5 + G#5 clash** (13.2 and 32.0 s, size S). It is meant to sound slightly wrong but not alarming. It is analysed, not heard.
5. **Separate `HIT · key found` and `hit ≠ fresh`** (32.0 s on, size S). Saw: the two lines sit 80 px apart and can read as one block. Change: add 20 px of space, or dim the HIT line slightly at 32.0. Effect: the qualification reads as a separate point.
6. **Larger moving chips** (19.5, 26.5 s, size S). They are 40 px. Shorter labels (`get`, `rev 1`) would allow 44 px, though the returned `step 4` payload is useful.

## Notes for the skill (not acted on)

- An animated vertical offset on rows makes history (new row on top, old row sliding down) easy to show.
