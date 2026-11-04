# Lesson 01 review (render 1, final)

**Bound to:** `video.mp4` SHA-256 `6ed69a1e3360098e9405ff2b4ee50d6b8717c852c32e67d5c4377cec52ce250d` (37.00 s). Any re-encode voids this review.

## Evidence scope

- **Analysed:** 33 encoded frames extracted from this exact file at 0, 1.4, 2.6, 4.3, 5.4, 7.2, 8.0, 10.4, 10.9, 11.6, 13.0, 14.3, 15.4, 15.8, 16.9, 17.5, 18.6, 19.9, 20.2, 20.6, 22.9, 23.2, 23.6, 24.2, 25.0, 26.0, 26.8, 27.9, 31.0, 34.9, 35.6, 36.3 and 36.96 s. That covers each beat's landing and both sides of every boundary. Ten key frames were viewed individually at native 350 px width (`scratch/key350a.png`, `scratch/key350b.png`), and four busy frames at full resolution (`scratch/native-pair.png`, `scratch/native-pair2.png`). The full set was viewed as a 350 px sheet (`scratch/enc350-sheet.png`). Also checked: the contact sheet, the spectrogram, `volumedetect` and `astats` levels, a full decode, and the MP4 box order.
- **Heard:** nothing. The audio was **not listened to**. All sound claims come from the cue list, the spectrogram and level measurements.
- **Not covered:** a browser or site check, and comparison with other cuts. Passing these scoped checks does not establish universal correctness.

## Fixed before handover

- **2.2–37 s, task note:** `payments incidents?` ended about 9 px from the note's right border. Reduced it to 42 px and widened the padding.
- **26.5–35 s, answer card:** the evidence row's outline touched the card's bottom border. Made the card 10 px taller, moved the rows, and gave the row outline a tighter local padding (`hlPad`).

Clean on the final encode: all essential text is 40 px or larger at source (about 13 px or more at 350 px wide) and readable without zoom. Nothing overlaps or is clipped, and nothing sits in the title band. No state lingers: `running` clears at 23.0, `waiting` at 24.0, and the store spinner at 19.8. All 30 cues show as spectrogram onsets. The peak is −5.2 dBFS, so nothing clips. The longest motionless stretch outside the final hold is about 2.1 s (11.5–13.6).

## Suggested improvements (ranked by teaching impact)

1. **Show that the definition is offered by the application** (3.8 s, size S). Saw: the short wire from Application to the card is faint and brief. Change: send a small dot up that wire when the card appears. Effect: beginners see where tool descriptions come from without extra text.
2. **Retime the lesson text** (whole video, size S, coordinator). Saw: `lessons.json` assumes 28 s. Change: beats at 0/10.5/15.5/23.0 and duration 37.0. Effect: the captions land on the motion they describe.
3. **Mark the model's idle stretch more strongly** (13.6–24 s, size S). Saw: the dimmed model lane is clear, but the bar ends silently. Change: add a faint dotted gap marker on the model lifeline during execution. Effect: "the model is not running anything" reads more firmly.
4. **Let `service: payments` arrive a beat after the name** (10.5 s, size S). Saw: name and argument appear together. Change: reveal the argument 0.4 s later, with a soft store cue. Effect: "named operation plus filled argument" reads as two parts of one structured call. Risk: it could suggest two separate messages.
5. **Shorten the final hold** (27.9–35.0 s, size S). Saw: 7 s of stillness. Change: keep it for beginners, or trim 1–1.5 s for a tighter close.
6. **Listen to the store work ticks** (17.7–19.5 s, size S). Saw: seven G3 ticks, analysed only. Change: audition them on a phone speaker. Effect: confirms they read as work without grating.

## Notes for the skill (not acted on)

- The `lane`, `msg` and `card` node types are general and could serve other protocol or call-flow lessons after review.
- The engine has no title-size option. This cut draws its 84 px title with a `label` node so that "A callable operation" fits the width.
