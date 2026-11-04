# Video 04 review (render 2, final)

**Bound to:** `video.mp4` SHA-256 `70e0205e1d586d3cc4a81ff740395f12716410e557bbc32520e0f534761f8608` (42.77 s). Any re-encode voids this review.

## Evidence scope

- **Analysed:** 38 frames decoded from this exact file at 0, 1.2, 1.9, 3.3, 4.9, 7, 8.2, 9.7, 10.4, 10.7, 11, 11.1, 11.4, 11.6, 13.1, 14.4, 15.9, 16.2, 17.2, 18, 18.7, 20.2, 22, 23.4, 25.5, 27.4, 27.9, 29, 30.5, 31.8, 32.6, 33.4, 34.6, 36.2, 38.4, 40.2, 41.4, 42.7 s (`scratch/enc2/`). These cover every beat landing and boundary. The leak copy is sampled densely (10.4–11.6 s), as are the editor transition and copy flight (15.9–18.7 s), the unverified hold and reset (23.4–27.9 s), and the rerun (29.0–33.4 s).
- **Views:** a 350 px-wide sheet of all frames (`scratch/enc2-350-sheet.png`), plus native 1080×1920 views (`scratch/native-key.png`) at 10.7 and 11.1 (leak copy in flight), 17.2 (feedback copies), 23.4 (unverified edit), and 33.4 (pass).
- **Audio:** spectrogram (`scratch/spectrogram.png`); per-cue peaks from the decoded audio (`scratch/cue-peaks.json`); `volumedetect`; full decode; MP4 box order.
- **Heard:** nothing. The audio was **not listened to**.
- **Not covered:** a site or browser check, and comparison with other cuts.

## Accuracy checks

- **One case only:** a single test, and the ending reads `PASS · 1 test`. No control request is shown, so no count can mismatch.
- **Sign-in kept:** `allow if signed_in` stays on screen, and the repair is a separate added line, `+ and tenant == owner`. Nothing suggests authentication was removed.
- **Contract fixed:** `expected 403` never changes. Tenant B, invoice #7, owner A, and `GET /invoices/7` stay fixed on both runs.
- **Unverified until rerun:** the change sits under `unverified`, with the old result dimmed, then the actual value resets to `—` before the fresh run.
- **No leak at the end:** the final denied response has no invoice body.
- **No wider claim:** no global security or success badge appears, and `200` never gets a success sound.

## Fixed before handover

- **Leak copy route (about 10.4–11.4 s, render 1):** the `#7 · owner A` chip ran along the Response panel's right border, partly outside the panel. It now drops straight down inside the panel at x 820 and slides left into the body slot. It stays clear of `200` and the request text.
- **Clean on the final encode:**
  - all text is 34 px or larger, with the evidence at 46–124 px and readable at 350 px;
  - the feedback copies start in the gap above the pair and never cross the source `expected`/`actual` text;
  - nothing lingers: the body is cleared before the rerun, and the dimmed `≠` clears at the reset;
  - every visible event has a cue (18 cues, all visible as spectrogram onsets);
  - the failure `miss` is the loudest cue at −7.7 dBFS, and the overall peak is −6.4 dBFS, so nothing clips.
- **Stillness:** the longest still stretch outside deliberate holds is about 2.7 s, within the mandatory unverified hold (23.1–27.3 s).

## Suggested improvements (ranked)

1. **Retime the lesson text** (size S, coordinator). Use beats at 0/15.8/21.8/29.3 and duration 42.8.
2. **Tie the requester to the request** (7.3 s, size S). A short dot from tenant B into the request line would make "B sends this request" read without the label.
3. **Shorten the unverified hold slightly** (23.1–27.3 s, size S). About 4 s of stillness with only the verdict word; trim 0.8 s or pulse `unverified` once.
4. **Use the bottom of the stage** (whole video, size S). The space below the verdict (about y 1680–1850) is empty. Move the pair and verdict down about 60 px to balance the stage.
5. **Listen to `miss` at gain 6** (12.9 s, size S). Its level was measured but not heard; check it for harshness.

## Notes for the skill (not acted on)

- `disc` and `docv` are general and could join the shared node set along with 03's `log`, `commit`, `ring`, and `edge`.
