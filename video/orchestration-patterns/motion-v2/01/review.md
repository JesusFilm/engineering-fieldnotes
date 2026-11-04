# Follow dependencies review (render 2)

Reviewed from encoded frames (37 timestamps covering every beat and boundary, at full size and native 350 px), the contact sheet, the spectrogram and level analysis. Audio was analysed only, not listened to.

## Fixed before handover
- Lane names ambiguous (pre-render stills): `Check` sat directly under the Draft bar and could read as its label. Each step's name now sits right-aligned above its own interval.
- D1 and F1 chips touched the `Check` / `Assemble` names while travelling the elbows (render 1, 9.95 s and 22.15 s at native 350 px). Right-aligned names and 38 px chips now leave clear space.
- Arrival ripple crossed the word `input` (render 1, 10.65 s). Ripple radius reduced from 64 to 40 px.
- Handoff send sounds used the receiver's pitch (dry run). They now use the sender's octave (C6 for D1, E6 for F1).
- Check work ticks landed within 0.1 s of criterion results (dry run 14.6 / 17.0 s). Ticks are suppressed from 13.5 to 18.5 s.

Checks after the fixes: lane names, `needs` / `input` sockets, IDs, criteria, `Rollback missing` and `needs revision` read at native 350 px; Check never runs before D1 arrives (10.5 s vs 12.3 s); Assemble never runs before F1 arrives (22.7 s vs 24.3 s); D1 rows unchanged through the result; F1 visible from 18 s to the fade; no approval indicator.

## Suggested improvements (optional, ranked)
1. **Shorter final hold** (35.4–41.6 s, S). Saw: 6.2 s of stillness after the recap label. Change: start the fade near 39.5 s. Effect: the ending lands without a long static stretch; the lesson is already complete.
2. **Show that Check reads the delivered copy** (12.3–14 s, S). Saw: the inspector header changes to `Checking D1` but nothing links the Check lane to the inspector. Change: a brief blue pulse on the D1 socket matching the inspector border at 12.3 s. Effect: ties "this step's input" to "the artifact shown below".
3. **Mono word spacing** (all, S). Saw: monospace spaces make `Change:  Add  timeout` and `needs  revision` look widely spaced. Change: render inspector rows in the sans face or tighten spacing. Effect: smoother reading on a phone.
4. **Assemble's D1 input** (22.7 s, M). Saw: Assemble shows only `needs F1`, though the result also uses D1. Change: a second, already filled D1 socket on Assemble from 10.5 s. Effect: more exact about inputs; costs width in a 260 px lane.
5. **Waiting cue audibility** (3.4 / 5.0 s, S). Saw: the two wait knocks are among the quietest events in the spectrogram. Change: raise gain about 3 dB after a listening check. Effect: the "can't start yet" moment registers by ear.
6. **Time axis meaning earlier** (0–32 s, S). Saw: the `time` axis is passive until the recap. Change: a faint playhead advancing along the axis during each run. Effect: the latency takeaway builds throughout instead of only at the end.

## Notes for the skill (optional)
- The local `lane`, `panel` and `axis` node types, wire `solid` and `arrow`, chip `size`, and title/subtitle size options in this cut's engine copy are general and could be reviewed for the shared engine. Not acted on.
