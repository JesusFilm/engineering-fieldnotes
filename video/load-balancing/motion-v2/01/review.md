# Lesson 01 review (render 2, final)

**Bound to:** `video.mp4` SHA-256 `0f9ce915d6b431d509d391acc55ca4e730398f8356120e2205bf65b4b4dcd02a` (34.10 s). Any re-encode voids this review.

## Evidence scope

- **Analysed:** 31 frames decoded from this exact file at 0.5, 1.1, 3.5, 5.1, 5.6, 7.0, 7.6, 8.0, 8.5, 8.9, 9.8, 11.0, 12.2, 14.1, 15.5, 17.0, 18.5, 19.4, 21.0, 22.2, 22.6, 23.0, 23.5, 24.5, 25.4, 26.0, 26.9, 30.0, 32.9, 33.3 and 34.06 s (`scratch/enc1/`). That covers each beat, both transits before, during and after, every state change, and the fade. I viewed a 350 px tile sheet (`scratch/enc1-350-sheet.png`, shrunk further for display), four individual frames at true native 350 px (`scratch/native350.png`: 8.0, 15.5, 22.6, 26.9), and full-resolution lane crops (`scratch/lanes-full.png`). I also checked the contact sheet, spectrogram, `volumedetect` and `astats` levels, a full decode, and the MP4 box order.
- **Heard:** nothing. The audio was **not listened to**. Sound claims come from the cue list, the spectrogram and level measurements.
- **Not covered:** browser or site checks, and comparison against other cuts. The coordinator and a fresh comparison reviewer own those.

## Fixed before handover

- **7.2–8.8 s and 21.8–23.4 s:** the moving request ring came within about 20 px of `GET`, and the response dot came just as close to `200 OK`. I moved the message text 60 px from each lane and set it at 48 px. Clearance is now about 40 px at full resolution.
- **Whole video:** the content sat high, leaving extra empty space under the server panel. I lowered the layout 40 px so it sits centred on the stage.

Clean on the final encode. The smallest stage text is the 42 px status pill (`waiting`, `received`, `loaded`), about 14 px at 350 px. It reads without zoom in the native 350 px frames, and all other stage text is 46 to 56 px. Suggestion 5 covers the 36 px subtitle. Nothing overlaps or enters the title band. No marker lingers after arrival, and no response, `ready` or filled field appears early. Every visible event has a cue (29 cues, each visible as a spectrogram onset), and the app's only sounds after the request leaves are at delivery and later. Peak is −6.2 dBFS, so nothing clips. Outside deliberate holds, nothing stays still longer than about 2.6 s, and the longest such stretch is the `ready` hold.

## Suggested improvements (ranked by teaching impact)

1. **Make the server's `idle` after sending explicit** (22.1 s, S). Saw: the server returns to `idle` while the response is still travelling, which could look like "done" before delivery. Change: keep `sent` for about 1 s, then switch to `idle`. Effect: the viewer sees that the server's part ended at the send, separately from the app receiving the result.
2. **Link the waiting pulses to the work ticks** (12.2 and 16.6 s, S). Saw: two soft pulses are easy to miss at phone size. Change: add one pulse per finished step, at 14.0 and 18.4. Effect: "still waiting" lines up with each step of server progress.
3. **Shorten the final hold** (26.7–32.7 s, S). Saw: 6 s of stillness. Change: cut it to about 4.5 s if early viewers find it slack. Effect: tighter close, with the populated profile still shown long enough.
4. **Give the request ripple a field cue** (8.8 s, M). Saw: `find user 42` appears without visible reference to the request. Change: briefly highlight `42` in `/users/42` as the step text appears. Effect: shows that the work comes from the request's contents.
5. **Subtitle size** (whole video, S). Saw: `ASK · WORK · ANSWER` is about 12 px at 350 px. Change: raise it to 40 px or drop it. Effect: removes the only small text.
6. **Listen once to the work ticks** (10.6–18.2 s, S). Saw: 16 identical ticks, never heard. Change: audition them and lower the gain if they grate. Effect: the processing beat stays pleasant.

## Notes for the skill (not acted on)

- The general `step`, `field`, `pill` and `arrow` nodes could be useful for request and UI-state scenes once reviewed.
