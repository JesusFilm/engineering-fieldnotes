# Harness engineering (fable cut) review — render 3

Reviewed from the encoded file `public/media/harness-engineering/fable.mp4`
(sha256 4c7af02d…cc711, 28.10 s, 843 frames, 1080×1920 @ 30 fps, H.264 yuv420p + AAC 44.1 kHz stereo, 1,137,539 bytes,
moov before mdat). Frames pulled with ffmpeg at each beat midpoint and the busiest moments, viewed at full size and
at 350 px wide; contact sheet at 1 fps; spectrogram (`showspectrumpic`, log scale) and `volumedetect` for sound.

## Verification results

- Full decode with `-xerror`: clean, no warnings.
- Frame 0 and frame 842 decoded to raw RGB: byte-identical (both pure black; max channel value 3). The scene opens
  and closes on a full-frame blackout.
- Audio: max_volume −6.6 dB, mean −31.6 dB. Headroom against the −0.5 dBFS limit is 6.1 dB.
- Cue synchronisation: 61 cues in the scene; onset detection on the decoded mono track (10 ms hops, ×2.2 energy rise)
  found 62 onsets. 55 cues have an onset within one hop. The six without one are the three `ack` blips, which sit
  50 ms after a louder `arrive` and get merged by the detector's 60 ms minimum gap, and the first `clock` tick of each
  run, which starts inside the preceding arrive's echo tail. The effects track is synthesised directly from the cue
  list and muxed from t=0, so those six are inferred in sync rather than measured.
- Spectrogram: every beat has a visible event; the two `thump`s at 14.9 s and 15.85 s are the loudest events
  (sub-200 Hz energy), so the rejection is the disruption peak as intended.
- Audio was analysed, not listened to. No physical listening took place.

## Fixed before handover

- 14.5 s (render 1): the red × ripple marking "row B stays false" sat on top of the row text `B passes:false`.
  Row ripples moved to the empty right end of each row (x = 940); the text is now fully clear at full size and 350 px.
- Whole video (render 1): the bottom tier ended at y ≈ 1460, leaving the lower third of the stage unused and the
  tiers cramped. Agent, Harness and the bottom tier were spread to y = 660 / 1010 / 1400.
- 5.4 s and 13.6 s (render 1): the `PASS` / `FAIL` chip left `tests.top` while the ✓ / × ripple mark was still
  drawn there, so the mark overlapped the chip. Chips now depart 0.25 s later.
- Loop boundary (render 2): first and last encoded frames differed (max channel diff 57 across rows 280–415, the
  title band) because the skill's `s.fade` keeps the title visible and the opening I-frame and closing P-frame
  quantise the yellow text differently. Added `s.blackout` to the local engine copy and used it at both ends;
  the boundary frames are now byte-identical.
- 9.3–10.8 s (render 2): `PASS` lingered on the Tests box from feature A while the agent was already working on B.
  The sublabel is cleared 0.4 s before beat 2 starts.

## Suggested improvements

1. **Show the ungated alternative** (before 0.8 s, size M). Saw: the viewer learns that a claim does not flip the
   record, but never sees what the gate prevents. Change: open with a 4 s prelude where the agent's `DONE` chip
   goes straight to the list, flips a row green, and a later red × appears on it with no test in the picture; then
   fade and start the harness version. Effect: the contrast makes "why the harness owns the write" explicit rather
   than implied.
2. **Shorten the third run** (20.6–23.6 s, size S). Saw: beat 3 repeats the full RUN → PASS pattern already seen in
   beat 1 at the same length. Change: cut two clock ticks and 0.4 s of travel from the second `RUN B`. Effect: the
   resolution lands faster once the pattern is known; total length drops to about 27 s.
3. **Make the rejected claim visibly bounce** (15.3–15.85 s, size S). Saw: `FAIL B` travels up as a new chip; the
   link to the earlier `DONE B` chip is only by colour and direction. Change: start the `FAIL B` chip from the
   harness as the `DONE B` chip tinted red, with a short `back` ease, so it reads as the same claim returned.
   Effect: strengthens "the claim came back", the beat that teaches most.
4. **Raise or drop the ack blip** (2.85 s, 11.45 s, 20.34 s, size S). Saw: on the spectrogram the `ack` is nearly
   inside the preceding `arrive`; it probably does not register. Change: either raise its gain to 0.3 and delay it
   to 0.15 s after the arrive, or remove it and let the row's colour change ride on the arrive. Effect: fewer
   near-duplicate sounds; the row-turns-orange moment either gets its own audible cue or stops pretending to.
5. **Distinguish the fix from the first attempt by sound** (17.55–19.1 s, size S). Saw: the "fix B" work ticks are
   the same pitch as the original work. Change: pitch the fix ticks a third higher (B3) so the second attempt sounds
   different from the first. Effect: the ear tracks "second try" even when the eye is on the list.
6. **Title repeats the node name** (whole video, size S). Saw: the yellow title "Harness" and the middle node label
   "Harness" are the same word. Change: keep the node label and title the video with the lesson instead (for
   example title "Done?" with subtitle HARNESS ENGINEERING). Effect: the title carries the question the video answers
   and the node keeps its proper name.
7. **Hold slightly longer on the first rejection** (15.9–17.4 s, size S). Saw: 1.5 s of stillness after the agent
   jolts before "fix B" starts. Change: extend to 2.2 s. Effect: the problem state (red Tests, grey row B, both
   claims failed) gets time to register before the recovery begins.

## Notes for the skill (optional)

- `s.fade` keeps the title band, so a looping cut cannot have byte-identical boundary frames after H.264 encoding
  unless the title also fades; a full-frame variant (`s.blackout` here) would be a useful standard option.
- The store row text, box sublabels and chip text default to 24–26 px; 30 px reads better on a phone and still fits
  the default node sizes.

## Limitations

- No physical listening; sound was judged from the spectrogram, level measurement and onset alignment only.
- No playback on a real phone; legibility was checked from decoded frames at full size and 350 px wide.
- The video draws the harness as the component that runs the check and writes the record. The source article has the
  coding agent self-verify and edit the `passes` field under prompted instructions; a prompt does not enforce that
  property, so the video shows the stricter design, which is the library's recommendation rather than the source's
  measured setup (see evidence.md).
- Feature names, the single failing run, and all durations are illustrative; nothing on screen is a measured rate.

