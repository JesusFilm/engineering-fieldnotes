# Lesson 04 review (render 2, final)

**Bound to:** `video.mp4` SHA-256 `a3341577bcb5d6d213b4f0d6ad39fd895e3f90b11e6351b10ed705cf4e08a496` (46.00 s). Any re-encode voids this review.

## Evidence scope

- **Analysed:** 41 encoded frames extracted from this exact file at 0, 0.8, 1.6, 2.8, 3.9, 4.9, 5.5, 6.2, 8.8, 9.5, 10, 10.5, 11.6, 13.6, 15.8, 16.4, 18.2, 19.9, 20.4, 21.8, 22.4, 23.1, 23.6, 24.4, 25.6, 26.6, 27.4, 29, 29.5, 30.1, 31.3, 34, 36.2, 36.7, 37.4, 38.4, 39.1, 42, 44.3, 45, 45.96 s. That covers every beat landing and both sides of each boundary: A completing, A's result and conclusion, B's timeout, the trap card, the ×, the correction, the uncertain conclusion, the transport variant and the fade. Ten key frames were viewed individually at native 350 px width (`scratch/key350a.png`, `scratch/key350b.png`), the trap and final states at full resolution (`scratch/native-pair.png`), and all frames on a 350 px sheet (`scratch/enc350-sheet.png`). Also checked: the contact sheet, the spectrogram, `volumedetect` and `astats`, a full decode, and the MP4 box order.
- **Heard:** nothing. The audio was **not listened to**. Sound claims come from the cue list, the spectrogram and levels.
- **Not covered:** a browser or site check, and comparison with other cuts. Passing these scoped checks does not establish universal correctness.

## Fixed before handover

- **Render 1, 24.2–26.4 s:** the trap's red × sat on top of `status: ok` and `items: []` in B's card, hiding the very text it marks. Moved it to the card's top-right corner at a smaller size.
- **Render 1, whole video:** the `deadline` labels were 36 px, about 11.7 px at 350 px wide. Raised them to 38 px.

Clean on the final encode: essential text is 38 px or larger at source (about 12 px or more at 350 px wide) and readable without zoom. Nothing overlaps or is clipped, and nothing sits in the title band. No state lingers: the wrong `B: no matches` row and the × clear at 26.4, B's error fields clear in the transport variant, and the outlines clear at 13.2 and 33.4. B never shows an empty list after its correction. All 40 cues show as spectrogram onsets. The peak is −5.3 dBFS, so nothing clips. The longest motionless stretch outside the final hold is about 2.8 s (13.2–16.0).

## Suggested improvements (ranked by teaching impact)

1. **Show the trap's cause** (21.6 s, size M). Saw: the grey empty card appears without showing where it came from. Change: briefly show a `catch → []` chip turning the timeout into the empty list before the card fills. Effect: the pitfall "catch every exception and return []" becomes concrete. Risk: more text.
2. **Retime the lesson text** (whole video, size S, coordinator). Change: beats at 0/9.0/16.0/29.0 and duration 46.0.
3. **Keep the error evidence visible in the final state** (36–44 s, size M). Saw: the transport variant replaces B's error card, so the final frame shows the error conclusion without its card. Change: give the transport case a third narrow column, or a ghost of the error card. Effect: all three outcomes are visible at once.
4. **Fill the answer slot during the correction** (26.4–29.8 s, size S). Saw: row B is empty for 3.4 s. Change: show a dim `B: …` placeholder.
5. **Tighten the beat 2 hold** (13.2–16.0 s, size S). About 2.8 s of stillness. Trim it if beginners read it quickly.
6. **Listen to the thump cluster** (19.8, 26.4, 27.1, 37.0 s, size S). Four thumps were analysed but not heard. Check they read as "failed" without feeling alarming.

## Notes for the skill (not acted on)

- The `deadline` node (elapsed time against a fixed deadline) is general and would suit timeout and retry lessons.
