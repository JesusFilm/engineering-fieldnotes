# Video 01 review (render 3, final)

**Bound to:** `video.mp4` SHA-256 `f2ab4e349dca74e00d6b5709fcbc3f7727567348aca9f3f9d1f1e46a6e5074b3` (38.13 s). Any re-encode voids this review.

## Evidence scope

- **Analysed:** 23 encoded frames from this exact file at 0, 1.9, 3.9, 6.2, 8.0, 10.8, 11.8, 13.4, 15.0, 17.2, 18.6, 20.2, 21.0, 22.2, 25.7, 27.0, 29.6, 31.2, 33.5, 35.9, 36.6, 37.4, and 38.08 s. That covers each beat's landing and each boundary, including the busiest frames (21.0: file-to-tool transfer, 25.7: capture chip in transit). Frames are in `scratch/enc2/`, viewed at native 1080×1920 for the key frames (`scratch/trio2.png`) and as a 350 px-wide sheet (`scratch/enc2-350-sheet.png`). Also the contact sheet (`scratch/contact-sheet.png`), the spectrogram (`scratch/spectrogram.png`), `volumedetect` and `astats` levels, a full decode, and the MP4 box order.
- **Heard:** nothing. The audio was **not listened to**. All sound claims come from cue lists, the spectrogram, and level measurements.
- **Not covered:** a browser or site check at reading and phone widths, and comparison against other cuts. Both belong to the coordinator and a fresh comparison reviewer.

## Fixed before handover

- **Whole video, tool card:** the progress bar showed full and orange from frame 0, and the status lamp drew white. Cause: the node options `bar` and `lamp` were being read as animated defaults. Renamed them to `hasBar` and `hasLamp`.
- **13.3–15.0 s:** the green check marks touched `read_file` and `notes.txt`. Widened the request card from 400 to 440 px, which leaves about 40 px of clearance.
- **About 11 s:** the request chip crossed the `Runtime` label. Centered the label at x 540, clear of both wire columns.
- **About 21 s:** the returning `count=7` chip overlapped the file's own `count=7` as it left. Moved the file right by 40 px and started the chip clear of the page edge.
- **About 22 s:** the tool's progress bar touched its output row. Raised the row and lowered the bar.
- **11.65 s and 18.47 s:** arrival ripples crossed the `Request #1` and `read_file` titles. Removed both rings, since the card glow still marks the arrival.
- **31.06 s:** the model's arrival ripple crossed the `from runtime` tag. Removed it.
- **End:** a 5.7 s silent hold. Shortened it to about 4.9 s before the fade.

Clean on the final encode: text is 26 px or larger and unclipped, nothing sits in the title band, no stale state appears, and every visible event has its cue (16 cues, each visible as a spectrogram onset). Peak is −7.2 dBFS, so nothing clips. The longest motionless stretch outside the deliberate final hold is about 1.9 s.

## Suggested improvements (ranked by teaching impact)

1. **Link the wait to the proposal** (6.1 and 8.0 s, size S). Saw: during the wait, only the tool lamp blinks. Change: give the `proposed` tag a soft pulse on the same ticks. Effect: the viewer connects the waiting proposal with the idle tool.
2. **Retime the lesson text** (whole video, size S, coordinator). Saw: `lessons.json` assumes 28 s. Change: use beats at 0/10.0/17.1/29.4 and duration 38.1. Effect: the captions land on the motion they describe.
3. **Move focus off the request card after dispatch** (18.5–24 s, size S). Saw: the request card keeps a bright outline while the tool works. Change: dim it to 50% until the result returns. Effect: one place to look during the tool beat.
4. **Make each check say what it checked** (13.3 and 14.9 s, size M). Saw: a check mark alone does not say what passed. Change: tag the rows `known` and `allowed` beside the checks. Effect: beginners see two distinct checks. Risk: `allowed` could suggest a full permission model, which lesson 05 covers.
5. **Hold `running` a little longer** (18.5–22 s, size S). Saw: the bar fills during the file access, which reads as quick. Change: add about 0.6 s of filling before the dot leaves. Effect: "the tool is doing work" registers before the data moves.
6. **Final hold length** (31–36 s, size S). Saw: about 4.9 s of stillness. Change: keep it if beginners need reading time, or cut 1 s otherwise. Effect: tighter close.
7. **Listen once to the clock ticks** (6.1 and 8.0 s, size S). Saw: they measure quieter than the other cues, but nobody has listened to them. Change: audition them, and raise the gain if they vanish on phone speakers. Effect: the wait beat stays audible.

## Notes for the skill (not acted on)

- Node options that share a name with an animated prop (`bar`, `lamp`) silently become its default. The engine API reference should warn about this.
- The `card` and `doc` node types in the local engine are general, and could be useful in the shared skill after review.
