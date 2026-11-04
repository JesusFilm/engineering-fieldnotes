# Lesson 03 review (render 2, final)

**Bound to:** `video.mp4` SHA-256 `a6a8fd7d7aa9fb7b5674a904647f2b630a47f3cce24d6d5a514eb56b5f6bc7fe` (47.00 s). Any re-encode voids this review.

## Evidence scope

- **Analysed:** 41 individual frames decoded from this exact file at 0, 1.3, 2.5, 3.5, 4.5, 7.0, 9.1, 9.6, 10.1, 11.0, 12.5, 13.0, 13.7, 14.5, 16.0, 17.1, 17.6, 18.1, 20.0, 21.1, 21.9, 22.8, 23.7, 26.0, 28.1, 28.9, 29.5, 30.1, 30.8, 32.2, 33.5, 34.5, 35.5, 36.1, 37.5, 38.1, 39.5, 40.9, 43.5, 45.5 and 46.95 s, covering every hold and both sides of each inject, crossing, extraction, span creation, response, export and final emphasis. Frames are in `scratch/enc2/` (1080×1920) and `scratch/enc2-350/` (native 350 px); individual 350 px frames at 11.0, 20.0, 29.5 and 43.5 s viewed directly (`scratch/quad350.png`), full-size stills at 11.5, 17.5 and 23.0 s (`scratch/stills2-trio.png`). Also the contact sheet, spectrogram, `volumedetect` and `astats`, a full decode and the MP4 box order.
- **Heard:** nothing. The audio was **not listened to**.
- **Not covered:** site checks and comparison against other cuts.

## Fixed before handover

- **10.9 s onward, header decode labels:** `trace` and `parent` sat under neighbouring segments and ran together as one word, `traceparent`. The first label now ends just right of its segment and the second starts just left of its own.
- **17.1–18.0 s:** the extract chip crossed the receiver's `test service` name. The receiver's name moved to the bottom of its column, away from the lane.
- **Whole video:** after that move, `test service` touched the bottom edge of the context box. The context boxes are now shorter and the process frames 10 px taller.
- **About 29 s (render 1):** the returning `200 OK` chip was drawn over the request card while the card faded. The response now starts after the fade, and the rest of the timeline shifts 0.6 s later.
- **Whole video, text size:** chips use 40 px text (local `size` option). All labels are at least 38 px at 1080, which is 12.3 px at 350.

Clean on the final encode: no overlapping or clipped text, nothing in the title band, the receiver context reads `—` until the extract chip lands, `run tests` appears only after extraction, `0 spans received` shows until the first export lands, and no chip remains during a hold. All 26 cues show as spectrogram onsets; peak −5.9 dBFS, no clipping.

## Suggested improvements (ranked by teaching impact)

1. **Retime the lesson text** (whole video, size S, coordinator). Change: duration 47.0, beats 0 / 9.0 / 17.0 / 28.0. Effect: captions match the motion.
2. **Mark the processes as separate machines** (0–9 s, size S). Saw: the two frames look alike apart from their names. Change: draw a dashed boundary across the lane at the midpoint that the request visibly crosses. Effect: "boundary" becomes a thing the viewer sees crossed. Risk: could look like a wall metaphor if overdone.
3. **Listen to the empty-view thump** (33.4 s, size S). Saw: it has the strongest low-frequency energy in the file, though its peak is lower than the chime's. Change: audition it and lighten it if it dominates. Effect: the chime stays the high point.
4. **Show the receiver's context feeding its span** (21.8–23.6 s, size S). Saw: the context box flashes as `trace` fills, but `parent a1` has no matching flash. Change: flash the context's `a1` segment as `parent a1` lands. Effect: ties the parent field to the extracted header, not to the sender's card.
5. **Enlarge the decode labels** (10.9–28.8 s, size S). Saw: `trace` and `parent` are 38 px (12.3 px at 350), the smallest text. Change: 40 px with the request card 10 px taller. Effect: easier reading on a phone.
6. **Final hold length** (40.8–45.0 s, size S). Keep for beginners or trim 1 s.

## Notes for the skill (not acted on)

- Nodes cannot move in the engine; the local `request` node uses a `dy` prop. A general `dx/dy` offset on every node would help other crossing lessons.
- `segtext` (coloured monospace segments) is general and useful for showing structured IDs and headers.
