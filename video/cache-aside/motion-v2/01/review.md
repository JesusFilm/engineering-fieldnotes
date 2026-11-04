# Lesson 01 review (render 4, final)

**Bound to:** `video.mp4` SHA-256 `8abb840985e03276d648e174cad4087550ec98aa51f32333348ebca7be8f9e00` (44.50 s). Any re-encode voids this review.

## Evidence scope

- **Frames:** 35 frames decoded from this exact file at every beat landing and boundary (0, 1.0, 2.5, 4.0, 5.6, 7.4, 8.0, 8.6, 9.25, 9.9, 10.7, 11.5, 13.0, 14.3, 14.9, 15.5, 15.9, 16.4, 18.6, 21.5, 22.1, 24.0, 24.6, 25.4, 26.1, 26.8, 27.5, 29.0, 30.6, 32.0, 32.4, 34.5, 36.6, 40.0, 44.45 s). Each one was saved at native 1080×1920 (`scratch/enc/`) and at 350 px wide (`scratch/enc350/`), and viewed as native 350 px sheets (`scratch/enc350-sheet-a.png`, `-b.png`).
- **Transit windows:** 14 frames covering both copy departures and landings (13.4–14.5, 29.6–30.4, 31.9–32.4) plus the last frame, at native size and 350 px (`scratch/transit2/`). There is also a native crop at 14.0 s (`scratch/native-crop-14.0.png`). The request transit (7.9–9.3) was checked on render 3, and its geometry has not changed since.
- **Audio:** spectrogram (`scratch/spectrogram.png`), per-cue peaks from the decoded audio (`scratch/cue-peaks.json`), `volumedetect`, full decode, and MP4 box order.
- **Heard:** nothing. The audio was **not listened to**, and every sound statement comes from measurement.
- **Not covered:** site or browser checks, comparison with other cuts, and lesson-text retiming (coordinator).

## Fixed before handover

- **Silent status change (render 1, 7.5 s and 23.6 s):** `reading…` appeared 0.4 s before the request left, with no cue. It now changes with the send cue.
- **Request chip over status line (render 2, 8.0 s and 24.0 s):** the `read runbook:api` chip started on top of `reading…`. It now starts below the application panel.
- **Copy chip over the source value (render 2, 14.9 s and 30.6 s):** the `rev 1` copy began on the source row's own `rev 1`, so the value briefly looked like it was leaving the database. It now appears just above the row while the row flashes, and the source value stays readable in every transit frame.
- **Arrival ripple over the `Database` heading (render 2, 9.25 s and 25.3 s):** reduced the radius from 80 to 48 px.
- **Find line under the departing copy (render 3, 13.9 s):** `found runbook:api` was still fading behind the copy. Its fade now ends before the copy appears.
- **Faint ending slot (render 1):** `reusable copy?` outline raised from dim to mid grey, and its text to full white.
- **Re-checked on the final encode:** all text is ≥44 px at 1080 (≈14 px at 350) and readable at native 350. Nothing enters the title band, and no stale highlight lingers (find line, amber outline, and dimmed rows all reset before each hold). The counter changes only at arrivals (9.2 and 25.3 s), and the source row is visible in every frame. All 24 cues appear as spectrogram onsets, with per-cue peaks from −8.5 to −19.9 dBFS. The overall peak is −7.1 dBFS, so nothing clips.
- **Pacing:** outside the deliberate holds, nothing stays still for longer than about 2.1 s (5.6–7.9 s). The holds are 18.9–22.0 s (copy in both places) and 36.9–43.0 s (final state).

## Suggested improvements (ranked by teaching impact)

1. **Retime the lesson text** (whole video, size S, coordinator). Use beats at 0/7.9/13.9/22.0 and duration 44.5, so the captions match the motion.
2. **Move the landing ripple off the value** (15.8 s, 31.9 s, size S). Saw: the teal ring crosses `rev` in the view for about 0.3 s. Change: centre it on the slot's right edge, or replace it with an outline glow. Effect: the arriving value stays readable at its key moment.
3. **Make the lanes more visible** (whole video, size S). Saw: the dotted lanes are faint at 350 px, so direction comes only from the chips. Change: add small arrowheads, or raise the wire brightness. Effect: request down and copy up read before anything moves.
4. **Shorten the second read's holds slightly** (27.4–30.0 s, size S). Saw: the repeat keeps the full 2.6 s hold on the found row. Change: about 2.0 s. Effect: the repeat feels familiar without dragging. Keep every step; the repetition is the point.
5. **Audition the C4 closing cue** (36.3 s, size S). It is the quietest cue (−19.9 dBFS) and may vanish on phone speakers. Listen, then raise it if needed.
6. **Quiet cue for the database settling** (14.6 s, 30.7 s, size S). The row and outline return to rest silently while the copy travels. This is intentional (a settle, not an event), but listening may show a soft cue helps.

## Notes for the skill (not acted on)

- `panel` and `rec` are general shapes (titled container, key/value row) that several cuts now rebuild locally.
- A `size` option on chip packets is needed for phone legibility; the default 26 px chip is about 8 px at 350 wide.
