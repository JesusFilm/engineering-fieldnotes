# Lesson 05 review (render 3, final)

**Bound to:** `video.mp4` SHA-256 `b995ddd95389376d647f78dc8eb8fbd52c5152d86d927b0126647ef0b828f7ff` (42.00 s). Any re-encode voids this review.

## Evidence scope

- **Analysed:** 39 individual frames decoded from this exact file at 0, 1.5, 2.7, 3.5, 4.3, 5.0, 5.7, 6.5, 7.5, 8.5, 9.5, 10.3, 10.9, 11.3, 12.0, 13.0, 13.8, 14.7, 15.4, 15.6, 15.8, 16.7, 19.0, 21.1, 21.8, 22.7, 23.0, 23.2, 23.8, 24.7, 27.5, 30.1, 30.9, 31.9, 32.4, 33.5, 37.0, 40.4 and 41.95 s, covering every hold and both sides of the row collapse, A's arrival, B's failure and the final comparison. Frames are in `scratch/enc3/` (1080×1920) and `scratch/enc3-350/` (native 350 px). Individual 350 px frames at 8.5, 13.8, 23.8 and 33.5 s viewed directly (`scratch/quad350.png`), and the full-size frame at 33.5 s. Also the contact sheet, spectrogram, `volumedetect` and `astats`, a full decode and the MP4 box order.
- **Heard:** nothing. The audio was **not listened to**.
- **Not covered:** site checks and comparison against other cuts.

## Fixed before handover

- **13.8 and 21.8 s:** the `span A` and `span B` chips touched `keep: name, status` as they passed the policy. Moved the columns out to x 230 and 850.
- **Whole video:** in the cards, `status` and its value nearly ran together. Moved the value column right and widened the cards to 410 px.
- **About 15.6 s:** the arriving `span A` chip landed on the `trace view` title. The title is now centred, and the chip fades out at the view's top edge.
- **15.7 s onward:** the received `span A` card sat on the view's left border, and `run_tests` touched its row outline. The card now sits 64 px inside the view.
- **Text size:** 38 px minimum (12.3 px at 350) for card rows; other labels 40 px or larger.

Clean on the final encode: `FAKE-9f2c` appears only in span A's local card before 10.9 s and never on a chip or in the view; span A arrives with two rows; the count reads `1 span` from 15.7 s to the end; nothing for B appears inside the view; B's runtime box keeps `ran ✓`; no text overlaps; nothing in the title band. All 33 cues show as spectrogram onsets; peak −3.5 dBFS (the failure thump), no clipping.

## Suggested improvements (ranked by teaching impact)

1. **Retime the lesson text** (whole video, size S, coordinator). Change: duration 42.0, beats 0 / 10.2 / 21.0 / 30.0. Effect: captions match the motion.
2. **Show the policy acting on the record as it leaves** (10.2–11.9 s, size M). Saw: the token row vanishes from the local card while nothing moves through the policy yet, so the policy's role is inferred from colour alone. Change: show a short copy of the token row dropping into the policy box and fading there. Effect: the cause of the removal is spatial. Risk: the secret must not appear to travel further.
3. **Listen to the poof and the thump** (10.9 and 23.0 s, size S). Saw: the poof is the broadest-band sound and the thump has the most low-frequency energy. Change: audition both; soften the poof if it competes with the failure. Effect: the failure stays the clear high point.
4. **Use the empty space between the cards and the policy** (about 860–990 px, size S). Saw: a 130 px gap in which only dotted paths sit. Change: move the export path up 40 px and give the view more height. Effect: tighter layout, larger view.
5. **Mention other causes of missing spans** (whole video, size S, write-up). The cut shows only export failure; sampling and missing instrumentation belong in the lesson text, not as extra motion.
6. **Final hold length** (33.4–40.0 s, size S). Keep for beginners or trim 1 s.

## Notes for the skill (not acted on)

- Row collapse (`cut`) and top anchoring on record cards are general and useful whenever a field is removed.
