# Video 03 review (render 2, final)

**Bound to:** `video.mp4` SHA-256 `3cf048d696ad243427ddc183a76cd2769ce273296334112b0b0d81e8b2468eba` (45.60 s). Any re-encode voids this review.

## Evidence scope

- **Analysed:** 35 encoded frames from this exact file at 0.3, 1.6, 2.9, 4.0, 5.6, 6.7, 8.5, 9.9, 10.8, 12.2, 12.8, 14.4, 16.0, 17.0, 18.0, 19.0, 19.6, 20.5, 22.5, 23.8, 25.2, 27.5, 29.9, 30.8, 32.5, 33.9, 34.8, 35.8, 36.8, 37.6, 38.7, 41.0, 43.9, 44.6, and 45.5 s.
  - **Coverage:** every beat and boundary, each check, each field reveal, and the `saving…` → `saved` transition.
  - **How viewed:** individual frames in `scratch/enc/` at full size and `scratch/enc350/` at native 350 × 622, as unscaled strips (`scratch/strip*.png`), plus a full-size check of 1.6 s.
  - **Display artifact:** `strip0` appeared small in the viewer; the file is 1750 × 622.
  - **Also checked:** the contact sheet, spectrogram, `volumedetect` and `astats` levels, a full decode, and the MP4 box order.
- **Heard:** nothing. I did **not listen to** the audio. Sound claims come from the cue list, the spectrogram, and levels.
- **Not covered:** a browser or site check, and comparison with other cuts. Passing these scoped checks does not prove the video is correct in general.

## Fixed before handover

- **6.4–38 s, session panel:** the `session · found` title nearly touched row 0's highlight outline. I made the panel 262px tall and moved its rows down 10px.
- **37.4 s onward:** the rejected preference dimmed to the stage's dim grey and became hard to read beside `not saved`. It now settles at mid grey, matching the guess.

The final encode is clean:

- **Text and layout:** text is 36px or larger, and nothing is clipped, overlaps, or enters the title band.
- **Check order:** no check passes before its evidence. Source and revision fill only after the source highlights.
- **Save sequence:** `saved` appears only after `saving…`. The guess and the preference never enter the record. The final frame shows all five fields, the tagged candidates, and `candidates 3 · saved 1`.
- **Sound:** all 26 cues appear as spectrogram onsets. Peak is −8.5 dBFS, with no clipping.
- **Stillness:** the deliberate holds are 6.9–9.6, 15.0–16.8, 20.6–23.4, 25.6–29.6, 31.0–33.6, and 38.8–44.0 s.

## Suggested improvements (ranked by teaching impact)

1. **Give the write acknowledgement more weight** (30.6 s, size S). In the spectrogram, the `store` cue is quieter than the two rejection thumps. Raise its gain, or add a soft `chime`, so saving is the loudest decision. Effect: the key state change carries the strongest sound.
2. **Explain what supports the preference** (35.6 s, size S). `supported` ✓ for `tabs > spaces` has no visible evidence, unlike the command's source highlight. Pulse the session row ("said in this session") as it passes. Effect: `supported` keeps one meaning.
3. **Show the guess's missing source more strongly** (18.8 s, size S). The grey flash on the source line is subtle. Add a brief `no match` status to the source panel. Effect: beginners see why `supported` fails.
4. **Soften the rejection thumps** (20.2 and 37.4 s, size S). They are the loudest low events. Plan A asked for no failure alarm. Listen first; if they read as errors, swap them for a quiet `ack` at E4.
5. **Shorten the early holds** (6.9–9.6 and 15.0–16.8 s, size S). Trim 0.5 s each if a fresh viewer finds them slack. Keep the 4 s hold on the complete record and the final hold.
6. **Retime lesson text** (coordinator, size S). Beats start at 0, 9.6, 23.4, and 33.6 s; duration is 45.6 s. `lessons.json` assumes 28 s.
7. **Larger check chips** (9.6–38.4 s, size M). Chip text is 38px. If a phone check finds the marks small, raise the chips to 42px; the policy panel has room.

## Notes for the skill (not acted on)

- Key/value `valueX`, row status tags, and chip marks are general additions worth reviewing for the shared `panel`/`chip` types.

