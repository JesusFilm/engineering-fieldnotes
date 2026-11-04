# Lesson 03 review (render 2, final)

**Bound to:** `video.mp4` SHA-256 `826a6ebb7dc9e5cca26387270372c8140ca0a874ebee69a2259d6a0c5e47201a` (42.00 s). Any re-encode voids this review.

## Evidence scope

- **Analysed:** 39 encoded frames from this exact file at every beat and boundary (0, 1.2, 2.6, 3.6, 4.6, 6.5, 8.0, 8.6, 9.4, 10.0, 10.8, 11.9, 13.0, 13.8, 14.5, 15.3, 16.5, 17.6, 18.4, 19.4, 20.2, 21.4, 22.8, 24.0, 24.6, 25.3, 27.0, 28.6, 29.5, 30.3, 31.3, 33.0, 33.5, 34.2, 35.2, 37.5, 40.0, 40.6, 41.95 s), in `scratch/enc/` at 1080×1920 and `scratch/enc350/` at native 350×622. Viewed: the 350 px sheet (`scratch/enc350-sheet.png`), individual unscaled 350 px frames at 9.4, 15.3, 25.3, 33.0 and 37.5 s (`scratch/native350-row.png`), the contact sheet, and the spectrogram. Busy moments were also viewed at full size as pre-encode stills (`scratch/busy1.png`, `scratch/busy2.png`; the encoded frames supersede them). Also checked: `volumedetect` and `astats` levels, a full decode, and MP4 box order.
- **Heard:** nothing. The audio was **not listened to**. Sound claims rest on the cue list, spectrogram and levels.
- **Not covered:** the site at reading and phone widths, and comparison with other cuts. Passing these scoped checks is not proof that the video is correct in every respect.

## Fixed before handover

- **8.0 s and 17.5 s:** the active-case highlight band on the row label clipped the `password` sublabel below it. Replaced the band with a label colour change; the row outline already marks the active case.
- **32.8 s onward:** the struck `empty only → pass` line dimmed to the darkest grey, nearly unreadable at 350 px. It now stays mid grey, and both grader lines sit further apart.

Clean on the final encode. Every useful label is 36 px or larger (about 12 px at 350 wide) and readable in individual native frames. Dots travel only in the empty side gutters and never cross text. Marks and the bracket clear the cells. No PASS appears before comparison, and no patch verdict before the FAIL. Each of the 25 cues lines up with a visible event and a spectrogram onset. Peak is −4.0 dBFS with no clipping; the two thumps are the loudest events. Long still stretches are deliberate holds: 5.3–8.0 s (expectations set, nothing run), 25.4–28.5 s (FAIL lands), and 35.4–40.0 s (final). The 33.0 s frame shows the strike mid-draw, which is intentional.

## Suggested improvements (ranked by teaching impact)

1. **Show the input value on each request** (8.5 and 18.0 s, size M). Saw: a plain dot travels the left gutter. Change: tint the dot by case or show a small `""` / `valid` tag at the patch entry. Effect: a clearer sense that two different inputs met the same line.
2. **Retime the lesson text** (whole video, size S, coordinator). Change: beats 0/8/17.5/28.5, duration 42. Effect: captions land on their motion.
3. **Echo row 1 during row 2's return** (21.3 s, size S). Change: pulse row 1's observed `reject` as row 2's lands. Effect: makes "same output for both" explicit.
4. **Explain the narrow line sooner** (31.0 s, size S). Saw: `empty only → pass` appears with a quiet ack. Change: briefly outline row 1 while that line shows. Effect: links the hypothetical to the one passing row.
5. **Final hold** (35.4–40.0 s, size S). About 4.6 s; cut 1 s if it feels slack.
6. **Tighten beat 1** (5.3–8.0 s, size S). Cut 0.5 s if viewers find the opening slow.
7. **Listen once** (whole video, size S). Confirm the C6/D6 case sends are distinct and the two thumps don't feel harsh on a phone speaker.

## Notes for the skill (not acted on)

- A text `strike` prop is a compact way to show a refused or superseded value without a caption.
