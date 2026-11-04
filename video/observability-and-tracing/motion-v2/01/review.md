# Lesson 01 review (render 1, final)

**Bound to:** `video.mp4` SHA-256 `72c335286ef9aced6d3b29bed0c49a826266a582a8c8b9e2f8e2fa9d0a642b33` (40.00 s). Any re-encode voids this review.

## Evidence scope

- **Analysed:** 34 individual frames decoded from this exact file at 0, 1.0, 2.3, 2.75, 3.2, 5.5, 8.3, 8.75, 9.2, 10.1, 11.5, 12.1, 13.3, 14.5, 15.5, 15.65, 16.25, 16.7, 19.0, 21.8, 22.25, 22.7, 22.9, 23.8, 24.6, 26.5, 28.1, 29.5, 30.9, 32.9, 34.1, 36.5, 38.5 and 39.95 s. That covers every beat hold and both sides of each boundary: request departure and arrival, the switch, span open, result departure and arrival, and span close. Frames are in `scratch/enc/` (1080×1920) and `scratch/enc350/` (native 350 px wide). Individual 350 px frames were viewed directly (`scratch/trio350.png`), not only the sheet. Also the contact sheet, spectrogram, `volumedetect` and `astats` levels (whole file and per window), a full decode, and the MP4 box order.
- **Heard:** nothing. The audio was **not listened to**. Sound claims come from the cue list, the spectrogram and level measurements.
- **Not covered:** a site or browser check at reading and phone widths, and comparison against other cuts. Both belong to the coordinator and a fresh comparison reviewer.

## Fixed before handover

- **Whole video, text size:** the engine's 24 px box sublabels and 26 px chip text would render at about 8 px on a 350 px phone. Added local `subSize` and chip `size` options; all text is now 36 px or larger at 1080 (≥ 11.7 px at 350), most of it 40–84 px.
- **2.4 s and 8.4 s (and the same moments in call 2):** the `run_tests` and `result` chips overlapped the caller and tool box edges because the wire was 308 px long. Narrowed both boxes to 260 px, which lengthened the wire to 388 px, and kept the chip centres between x 448 and 632.
- **3.2–8.3 s and 16.7–21.8 s:** the tool's work spinner touched the `test tool` label, then sat about 10 px from `running`. Moved it to the bottom-right corner with a smaller radius; it now clears both.

Clean on the final encode: no text clipped or overlapping, nothing in the title band, no stale state, the span never appears during call 1, and `duration` and `outcome` read `…` until the end cap appears. Every visible event has a cue and every cue (26) shows as a spectrogram onset. Peak −5.8 dBFS, at the span close; the thumps peak 3–4 dB lower.

## Suggested improvements (ranked by teaching impact)

1. **Retime the lesson text** (whole video, size S, coordinator). Saw: `lessons.json` assumes 28 s. Change: duration 40.0, beats 0 / 15.5 / 22.7 / 27.4. Effect: captions land on the motion they describe.
2. **Show what the bar covers** (15.8–22.7 s, size M). Saw: the bar spans both trips on the wire as well as the tool's work, which is correct for a caller-side span but not marked. Change: drop two faint tick marks on the axis when the request arrives at the tool and when the result leaves it. Effect: a viewer sees why 2.4 s is more than the tool's own run time. Risk: more marks on a busy row.
3. **Listen to the thumps** (10.0 and 32.8 s, size S). Saw: they carry the most low-frequency energy in the spectrogram, though their peaks are lower. Change: audition them; lighten or raise their pitch if they feel heavier than the close. Effect: the span close stays the clear high point.
4. **Make call 1's elapsed time felt** (2.3–9.2 s, size S). Saw: call 1 has the same timing as call 2, but nothing measures it on screen. Change: keep it as is, or add a soft caller-side `work` tick so the two calls sound alike. Effect: stronger "same work, no record" contrast.
5. **Link the start timestamp to the axis zero** (28.0 s, size S). Saw: the start cap pulses with the `start` row, but the axis `0` label stays still. Change: brighten the `0` label in the same pulse. Effect: shows that the axis counts from the span's start.
6. **Final hold length** (34.6–38.0 s, size S). Saw: about 3.4 s of stillness before the fade. Change: keep it for beginners, or trim 1 s. Effect: tighter close.

## Notes for the skill (not acted on)

- The engine's default sublabel (24 px) and chip text (26 px) are below phone legibility for 350 px playback. Size options like the local `subSize` and chip `size` could join the shared engine after review.
- The `timeline` (axis plus interval bar with start and end caps) and `table` node types are general and could serve other timing lessons.
