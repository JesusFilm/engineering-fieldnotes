# Lesson 02 review (render 1, final)

**Bound to:** `video.mp4` SHA-256 `8d16e5eedcd8b71a6739be21f2aaf07f0adccccb54a93e412e9ca7b21f3ccde5` (42.60 s). Any re-encode voids this review.

## Evidence scope

- **Analysed:** 34 individual frames decoded from this exact file at 0, 1.1, 2.3, 3.3, 4.4, 6.5, 8.1, 8.9, 9.4, 9.9, 10.9, 12.3, 12.9, 14.9, 16.5, 18.1, 19.4, 19.9, 20.9, 22.3, 22.9, 24.7, 25.7, 27.5, 28.6, 29.8, 30.8, 31.8, 33.5, 34.9, 36.3, 38.5, 40.9 and 42.55 s, covering every hold and both sides of each card appearance, chip departure and landing, span mint, status change and trace-view row. Frames are in `scratch/enc/` (1080×1920) and `scratch/enc350/` (native 350 px wide); individual 350 px frames at 12.9, 22.9 and 38.5 s viewed directly (`scratch/trio350.png`), plus a full-size still at 34.2 s. Also the contact sheet, spectrogram, `volumedetect` and `astats`, a full decode, and the MP4 box order.
- **Heard:** nothing. The audio was **not listened to**; sound claims come from the cue list, spectrogram and levels.
- **Not covered:** site or browser checks and comparison against other cuts (coordinator and a fresh comparison reviewer).

## Fixed before handover

- **Whole video, text size:** the engine's 26 px chip text and default label sizes would be about 8 px at 350 px. Chips now use 40 px text through a local `size` option; all other text is 40 px or larger (titles 84 px).
- **29.7–40.6 s:** the trace-view tree branches stayed at the dim resting wire colour and nearly vanished at 350 px. They now turn white as each child row appears.

Clean on the final encode: no clipped or overlapping text, nothing in the title band, no value appears before its chip lands, the tool's parent is always `a1`, no link joins the two children, and no chip remains during a hold. Every visible event has a cue; all 27 cues show as spectrogram onsets. Peak −7.0 dBFS, no clipping.

## Suggested improvements (ranked by teaching impact)

1. **Retime the lesson text** (whole video, size S, coordinator). Saw: `lessons.json` assumes 28 s. Change: duration 42.6, beats 0 / 8.0 / 18.0 / 28.5. Effect: captions land on the matching motion.
2. **Make the tree branches solid** (29.7–42 s, size S). Saw: branches are white but dotted and thin at 350 px. Change: draw them as a 5 px solid stroke. Effect: indentation reads as nesting more quickly on a phone.
3. **Show what the trace view reads** (29.7–31.7 s, size M). Saw: each card flashes as its row appears, but nothing shows which field was used. Change: light the card's `parent` row alongside the flash for the two children. Effect: ties indentation directly to the parent value.
4. **Stress the sibling choice** (21.8–22.8 s, size S). Saw: the `a1` chip leaves the root while the ended model card stays still. Change: give the model card's `span b2` a brief dim pulse as the chip passes, so a viewer sees `b2` was not chosen. Effect: blocks the "children chain in time order" misreading. Risk: adds motion to a busy moment.
5. **Root mint emphasis** (2.2 s, size S). Saw: the chime marks the new trace, but its visual is the same ripple as a span mint. Change: a larger blue ripple for the trace mint only. Effect: "new trace" and "new span" look different as well as sound different.
6. **Final hold length** (36.2–40.6 s, size S). Saw: about 4.4 s of stillness. Change: keep for beginners or trim 1 s. Effect: tighter close.

## Notes for the skill (not acted on)

- The `record` card (title, status word, key/value rows with row highlights) is general and could replace ad hoc stores in other identity lessons.
- Wires cannot be drawn solid; a `solid` wire prop would help tree and link drawings.
