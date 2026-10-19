# Observability and tracing — fable cut review (render 3)

Reviewed from the encoded MP4 (public/media/observability-and-tracing/fable.mp4, sha256 be47d610…177f): contact sheet at 1 fps, full-size stills at every beat, 350 px beat frames, spectrogram, volumedetect, full decode, boundary-frame comparison. Audio was analysed, not listened to.

## Fixed before handover

- 11.65 s and 23.26 s (render 1): encoded audio peaked at −0.0 dBFS on the crash; the local render.mjs now holds the synthesised mix under −3 dBFS before AAC and the crash preset gain is 0.7. Encoded peak is now −1.6 dBFS.
- 0.00 s vs 29.53 s (render 1): first and last decoded frames differed by CRF quantisation although the source frames were identical; the local render.mjs encodes at constant QP 22 with mbtree off and forces the final frame to a keyframe. The decoded frames now compare byte-equal.
- 7.65 s and 17.56 s (render 2): the Agent trace panel cleared with no sound; a quiet poof now marks each clear.
- 25.4 s onward (render 2): the panel link wire was a 4 px dotted line and nearly invisible at 350 px; it is now 7 px with marching dots, and the ? badge turns into a persistent ✓ badge at the same point.
- 26.4 s (still pass): the check ripple was drawn over the row text of the matching span; moved to the link badge position.

## Suggested improvements

1. **Make the id match audible** (25.4 s, size S). Saw: the resolution is carried by colour (blue id text and sublabel) plus hit/chime. Change: give trace ids a pitch, so the agent sublabel and the matching API row play the same note while the unmatched rows in beat 2 play detuned notes during the scan. Effect: the "same trace" relation would be heard as well as seen.
2. **Show the 0d12 row as the lost one** (13.9–15.3 s, size S). Saw: the scan ticks over three rows and ends in ?; a viewer may not realise the red 0d12 row is task 8's span. Change: after the ?, briefly jolt the 0d12 row with a low thump. Effect: makes explicit that the data exists but cannot be joined.
3. **Longer hold after the ?** (15.3–17.6 s, size S). Saw: 2.3 s of hold before the clear. Change: 3 s. Effect: the problem beat is the lesson's hinge and could use a little more time on phones.
4. **Shorter normal beat** (0.8–7.6 s, size M). Saw: the first task plus the other-caller row takes 6.8 s. Change: trim the API busy spinner and the return trip by about 0.5 s each. Effect: reaches the problem sooner without losing the C–E–G pattern.
5. **Header chip on the agent→tool hop too** (20.0–21.5 s, size M). Saw: only the tool→API packet shows traceparent. Change: show the context as a small dot riding the agent→tool envelope as well, since in-process context is what the tool injects. Effect: distinguishes in-process context from the cross-process header.
6. **Second crash quieter** (23.26 s, size S). Saw: both crashes are the same gain, so the disruption beat and the resolution beat share the loudest moment. Change: gain 0.55 on the second crash. Effect: keeps beat 2 as the loudest event.

## Limitations

- The scenario is illustrative: three tasks, one tool, one service, trace ids shortened to four hex characters. A real traceparent carries a 32-hex trace id and a 16-hex parent id; a real tracing backend would hold many more rows and the search would be by id in a UI.
- Propagating context is shown as sufficient for the service's span to join the trace. It also requires the receiving service to extract the header and export its spans to the same backend, and sampling can drop either side; none of that is shown.
- Agent span names follow the OpenTelemetry GenAI conventions, which are marked Development and may change.
- Audio was verified analytically only (peak −1.6 dBFS, spectrogram shows a cue on every beat, cue times match the scene timeline). It was not physically listened to.
- Self-review only; no comparative review against the baseline or astra cuts was performed in this task.

## Notes for the skill (optional)

- A store row has no per-row text colour or text size in the skill's engine; both were useful for showing an identifier match. The wire has no width option either.
- CRF encoding breaks exact first/last frame equality on looping scenes; constant QP with a forced final keyframe fixes it and could become the default in render.mjs.
- AAC encoding overshoots the WAV peak by roughly 1–1.5 dB at this bitrate; a ceiling at −3 dBFS keeps the encoded peak under −1 dBFS.

