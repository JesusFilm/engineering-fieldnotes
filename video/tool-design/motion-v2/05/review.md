# Lesson 05 review (render 4, final)

**Bound to:** `video.mp4` SHA-256 `8200705b60adc6a1beab9987adb0917166644dcdf854023fb85c5cf9051c83be` (40.00 s). Any re-encode voids this review.

## Evidence scope

- **Analysed:** 41 encoded frames extracted from this exact file at 0, 0.9, 2, 3, 4, 4.7, 5.2, 6.6, 7.7, 8.4, 9.1, 9.9, 10.8, 11.4, 12, 14.8, 15.7, 17, 17.6, 18.2, 18.8, 19.4, 20.5, 21.8, 22.4, 23, 23.4, 24.1, 25.4, 25.8, 26.4, 27.1, 28.2, 29, 29.6, 30.3, 31.3, 34, 38.1, 38.8, 39.96 s. That covers every beat landing and both sides of each boundary, including the start, middle and end of the cursor chip's path (16.8–19.2) and of the frame's slide (22.8–23.6). Ten key frames were viewed individually at native 350 px width (`scratch/key350a.png`, `scratch/key350b.png`), the chip path and the start and end states at full resolution (`scratch/native-pair.png`, `scratch/native-pair2.png`), and all frames on a 350 px sheet (`scratch/enc350-sheet.png`). Also checked: the contact sheet, the spectrogram, `volumedetect` and `astats`, a full decode, and the MP4 box order.
- **Heard:** nothing. The audio was **not listened to**. Sound claims come from the cue list, the spectrogram and levels.
- **Not covered:** a browser or site check, and comparison with other cuts. Passing these scoped checks does not establish universal correctness.

## Fixed before handover

- **Render 1, 17–19 s:** the `k7Q` chip passed within a few pixels of the page frame's left edge, brushed the Collected card's border, and touched the `Backend matches` label. Narrowed the frame and moved the Collected card and the label.
- **Render 2, whole video:** the page frame's top stroke ran through the `Backend matches` label, and the `page` tag sat on the Response card's top border. Lowered the cells and frame, moved the label right, and moved the Response and Collected cards down.
- **Render 2, 16.8 s:** the chip started on top of the response's own `k7Q`, showing two overlapping tokens. It now starts in the gap below the response while the source row is outlined.
- **Render 3, 39.4–40 s:** a sliver of the request card's top border stayed above the stage fade. The card now fades out with the stage.

Clean on the final encode: essential text is 40 px or larger at source (about 13 px or more at 350 px wide) and readable without zoom. Nothing overlaps or is clipped, and nothing sits in the title band. No state lingers: the response clears before page 2, outlines clear, and no future record is visible before its page. The status turns `complete` only after `next_cursor: (none)` arrives. All 31 cues show as spectrogram onsets. The peak is −8.2 dBFS, so nothing clips. The 11.6–15.5 s stretch is a deliberate 3.9 s hold on the partial state, slightly above the skill's 3 s guide. Refinement 4 covers it.

## Suggested improvements (ranked by teaching impact)

1. **Show that the cell count is the backend's view** (1.4–15 s, size S). Saw: three blank cells hint at the total. Change: give the third cell a faint `?` until page 2. Effect: "more may remain" reads as unknown, not as a known count.
2. **Retime the lesson text** (whole video, size S, coordinator). Change: beats at 0/7.5/15.5/25.5 and duration 40.0.
3. **Mark that `(none)` is the stop signal** (27.8 s, size S). Saw: the outline and the `complete` status arrive together. Change: add a short beat in which the request status flashes `no cursor → stop` before `complete`. Effect: reinforces stopping on cursor absence rather than on a short page.
4. **Trim or animate the partial hold** (11.6–15.5 s, size S). Saw: 3.9 s of stillness. Change: pulse `partial` once at 13.5 s, or cut 1 s.
5. **Keep the page-1 provenance visible during page 2** (22.2–26 s, size M). Saw: the response clears for page 2. Change: keep a dim page-1 response above it. Effect: the origin of the copied token stays visible.
6. **Listen to the cue set** (whole video, size S). It was analysed only. Check that the rising cell notes read as pages filling.

## Notes for the skill (not acted on)

- Elements whose top edge sits above y = 440 survive `s.fade` because the veil starts there. The API reference could note this.
- The `frame` node (an animated window over a row) is general and would suit pagination, batching and windowing lessons.
