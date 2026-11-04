# Lesson 02 review (render 2, final)

**Bound to:** `video.mp4` SHA-256 `afb623e3822059bd0d63a963a19504a7afda5977a6bd13eb9a1641512ef643f3` (44.00 s). Any re-encode voids this review.

## Evidence scope

- **Analysed:** 41 encoded frames from this exact file at every beat and boundary (0, 1.0, 2.1, 3.6, 4.2, 4.6, 5.5, 6.4, 8.0, 9.3, 10.5, 11.0, 12.3, 12.8, 13.8, 15.3, 16.1, 17.1, 18.5, 19.7, 20.6, 21.6, 23.0, 24.0, 25.5, 26.7, 27.7, 28.9, 29.8, 31.0, 31.5, 32.6, 33.7, 34.8, 36.0, 37.2, 38.3, 40.0, 42.0, 42.6, 43.95 s), in `scratch/enc/` at 1080×1920 and `scratch/enc350/` at native 350×622. Viewed: the 350 px sheet of all of them (`scratch/enc350-sheet.png`), individual unscaled 350 px frames at 3.6, 12.8, 23.0, 31.5 and 40.0 s (`scratch/native350-row.png`), an unscaled full-resolution crop at 34.8 s (`scratch/full-3480.png`), the contact sheet, and the spectrogram. Busy moments were also viewed as pre-encode stills (`scratch/busy1.png`). Also checked: `volumedetect` and `astats` levels, a full decode, and MP4 box order.
- **Heard:** nothing. The audio was **not listened to**. Sound claims rest on the cue list, spectrogram and levels.
- **Not covered:** the site at reading and phone widths, and comparison with other cuts. Passing these scoped checks is not proof that the video is correct in every respect.

## Fixed before handover

- **From 15.0 s (render 1):** the `Approve A` button appeared as an empty outline because its label was never revealed. Now the label shows with the button.
- **From 19.5 s (render 1):** `source test run T7 on A` stayed on screen under the `risks` tab, wrongly attaching the test source to the risks. It now clears with the test rows.

Clean on the final encode. Every useful label is 38 px or larger (about 12 px at 350 wide) and readable in individual native frames. Only one tab's content shows at a time. The copy dots run only in the right margin and land beside the matching record rows. No approval appears before the button press, and no deployment or production change appears at all. Each of the 28 cues lines up with a visible event and a spectrogram onset. Peak is −8.3 dBFS with no clipping. Long still stretches are deliberate holds: 6.4–9.0 s (concrete request set), 24.7–26.5 s, 34.7–37.0 s, and 39.4–42.0 s (final).

## Suggested improvements (ranked by teaching impact)

1. **Show the full identity is stored** (33.6 s, size S). Saw: the record shows the same abbreviated digest as the request. Change: briefly expand the stored artifact to a longer digest, then collapse it. Effect: makes clear the record holds the full identity, not a prefix.
2. **Retime the lesson text** (whole video, size S, coordinator). Change: beats 0/9/26.5/37, duration 44. Effect: captions land on their motion.
3. **Link evidence to A visually** (13.6 s, size S). Change: highlight the request's artifact row when `on A` appears. Effect: ties the test run to the exact artifact.
4. **Make the vague request's emptiness clearer** (1.9 s, size S). Saw: a faint pulse on the empty evidence panel. Change: show `nothing to inspect` in the evidence status for 1.5 s. Effect: names the problem with three words, not a sentence.
5. **Keep the risk visible during the decision** (28.8 s, size S). Change: pulse the risk row once right after approval. Effect: reinforces that approval doesn't erase risk.
6. **Final hold** (39.4–42.0 s, size S). About 2.6 s; extend by 1 s if viewers need time to compare the three identical IDs.
7. **Listen once** (whole video, size S). Confirm the soft approval chime is distinct from the C6 copy acks.

## Notes for the skill (not acted on)

- A `panel` used as a button needs its label revealed separately; a combined `button` node would avoid that slip.
