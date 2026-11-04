# Lesson 02 review (render 2, final)

**Bound to:** `video.mp4` SHA-256 `5ba429bfe74a0904f72cf45a919641bfb8ac311ddf607d3561ff70715f7efa49` (44.00 s). Any re-encode voids this review.

## Evidence scope

- **Analysed:** 35 encoded frames extracted from this exact file at 0, 1.5, 3, 5.2, 6.2, 8.4, 8.9, 9.4, 10.6, 11.8, 12.8, 14.3, 14.8, 15.9, 17.3, 17.7, 18.9, 20.6, 21.4, 24.2, 24.8, 25.8, 26.8, 27.3, 28.9, 30.4, 32.8, 34.1, 34.6, 35.6, 36.4, 38, 42.2, 42.9, 43.96 s. That covers every beat landing and both sides of each boundary: Call A arrival, the cross, rejection, error return, clearing, Call B arrival, valid, wire opening and the run. Ten key frames were viewed individually at native 350 px width (`scratch/key350a.png`, `scratch/key350b.png`), the chip moments at full resolution (`scratch/native-pair.png`), and all 35 frames on a 350 px sheet (`scratch/enc350-sheet.png`). Also checked: the contact sheet, the spectrogram, `volumedetect` and `astats`, a full decode, and the MP4 box order.
- **Heard:** nothing. The audio was **not listened to**. Sound claims come from the cue list, the spectrogram and levels.
- **Not covered:** a browser or site check, and comparison with other cuts. Passing these scoped checks does not establish universal correctness.

## Fixed before handover

- **Render 1, 21.1–44 s, Model card:** the error and correction line touched the card's bottom border. Made the card taller (120 → 152 px) and moved the line, also raising it from 38 to 40 px.
- **Render 2, 20.6 s:** the `missing: end_time` chip left across the Application panel's top border near the `rejected` status. **35.6 s:** the `Call B` chip started on the panel's bottom border. Moved the panel and search box down 60 px and re-routed both chips so they travel in clear space.

Clean on the final encode: essential text is 40 px or larger at source (about 13 px or more at 350 px wide) and readable without zoom. Nothing overlaps or is clipped, and nothing sits in the title band. No state lingers: Call A's values, checks and cross clear at 24.4, before Call B arrives. The counter stays at `runs: 0` until 36.1. All 41 cues show as spectrogram onsets. The peak is −6.9 dBFS, so nothing clips. The longest motionless stretch outside the final hold is the deliberate 3.3 s hold on the returned error (21.1–24.4).

## Suggested improvements (ranked by teaching impact)

1. **Show that passing validation is not authorization** (34.3–42 s, size M). Saw: nothing on screen separates input validity from permission. Change: add a separate dim `authorized` row or lamp that lights independently before the run. Effect: blocks the inference "valid = allowed". Risk: it previews a later lesson.
2. **Retime the lesson text** (whole video, size S, coordinator). Change: beats at 0/8.5/17.5/25.5 and duration 44.0.
3. **Let Call A's cells fade on rejection** (17.5 s, size S). Saw: the rejected values stay at full strength until 24.4. Change: dim them to 50% at rejection. Effect: "this call is dead" reads before it clears.
4. **Shorten the error hold** (21.1–24.4 s, size S). Saw: 3.3 s of stillness. Change: trim 0.5–0.8 s if beginners read it quickly.
5. **Mark the changed value as new** (28.3 s, size S). Saw: `10:00Z` is amber only. Change: give the end_time row a brief outline pulse. Effect: "only end_time changed" registers faster.
6. **Listen to the miss/thump pair** (14.6 and 17.5 s, size S). They were analysed only. Audition them on a phone speaker so the thump does not read as a crash.

## Notes for the skill (not acted on)

- Chip text is fixed at 26 px in the shared engine, which is too small at 350 px. The local copy adds a packet `size` option.
- `card` and `tick` are general and could join the shared engine after review.
