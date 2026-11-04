# Lesson 03 review (render 3, final)

**Bound to:** `video.mp4` SHA-256 `21e5559bd846f9c605bc7f8cee8386910acbe0dcafe2c5f7d67754d7819d4ddd` (42.00 s). Any re-encode voids this review.

## Evidence scope

- **Frames:** 32 frames decoded from this exact file at beat landings and boundaries (0, 1.2, 2.4, 3.6, 4.6, 5.6, 6.4, 7, 7.8, 9.2, 10.1, 11.8, 12.5, 13.6, 14.4, 15, 15.7, 17.8, 19.2, 20, 22.1, 24.6, 25.1, 26.2, 27, 28.3, 29, 30.8, 31.8, 36, 39.9, 41.95 s). Each was saved at native size (`scratch/enc/`) and 350 px (`scratch/enc350/`), with a sheet at `scratch/enc-350-sheet.png`.
- **Transits:** 18 frames covering all five chip trips (5, 5.4, 5.9, 8.7, 9.2, 9.7, 13, 13.5, 14, 18.6, 19.1, 19.6, 25.6, 26.1, 26.6, 27.8, 28.3, 28.8 s), at native size and 350 px (`scratch/transit*/`).
- **Single frames:** native-350 views at 7.8, 22.1 and 36.0 s (`scratch/trio350.png`).
- **Audio:** spectrogram, per-cue peaks (`scratch/cue-peaks.json`), `volumedetect`, full decode, and box order.
- **Heard:** nothing. The audio was **not listened to**.
- **Not covered:** site or browser checks, comparison with other cuts, and lesson-text retiming.

## Fixed before handover

- **Store headings overlapping their first rows (render 1, whole video):** the `Cache` and `Database` headings ran into the top record rows. Both panels are now 46 px taller and the rows moved down 40 px. Checked clear in every frame.
- **Code lines at the 40 px floor (render 1):** raised to 44 px (≈14 px at 350).
- **Miss cue the quietest sound (render 2, 7.7 s):** the lesson's main event peaked at −23.3 dBFS. Its gain was raised, and it now peaks at −16.4 dBFS, comparable to the other result cues.
- **Re-checked on the final encode:**
  - Text: all text is ≥40 px; only the long chips (`runbook:api`, `set rev 1`) are 40 px. Everything is readable at native 350.
  - Ownership: no chip or line ever joins the cache and database, and every transfer starts or ends at the application.
  - Order: the cache row turns solid only when `set rev 1` lands, and `stored` appears only after `ok` returns.
  - Lingering state: dimmed rows and amber outlines reset before each hold.
  - Audio: all 24 cues appear in the spectrogram (−8.9 to −20.3 dBFS per cue). The peak is −6.7 dBFS, so nothing clips.
- **Pacing:** the still stretches are the deliberate holds at 10.3–12.4, 16.0–18.6, 22.7–25.0, 29.5–31.6 and 32.4–40.0 s.

## Suggested improvements (ranked by teaching impact)

1. **Retime the lesson text** (whole video, size S, coordinator). Use beats at 0/12.4/18.6/25.0 and duration 42.
2. **Show the absent link once** (31.6 s, size S). Saw: the empty gap between cache and database is never pointed at. Change: briefly draw a faint dashed outline in the gap, then remove it, or pulse both application links in turn. Effect: "the cache never fetches by itself" becomes visible as well as implied. (Plan B proposed the link pulses.)
3. **Arrowheads on the links** (whole video, size S). Saw: the dotted links are faint at 350 px. Change: add small direction marks during each trip. Effect: easier to see down versus up.
4. **Listen to the miss cue** (7.7 s, size S). It was raised by measurement only. Audition it so it sounds like a neutral "not found" rather than an error.
5. **Larger long chips** (5.0, 13.0, 25.6 s, size S). `runbook:api` and `set rev 1` are 40 px (≈13 px at 350). Shorter labels such as `get api` or `set` would allow 44 px.
6. **Shorten the final hold** (32.4–40.0 s, size S). It is 7.6 s. If it feels slack on viewing, trim about 2 s; keep the three matching `rev 1` values on screen for at least 4 s.

## Notes for the skill (not acted on)

- A visible routine whose lines record results (a "code trace") is a general way to show ownership in request flows.
