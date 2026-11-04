# Changed intent, new key review (render 2)

Reviewed from encoded frames (full size and native 350 px wide), the contact sheet, the spectrogram, and per-cue peak measurements. Audio was analysed only; it was not listened to.

## Fixed before handover

- The decisive mismatch cue (`miss` at 14.6 s) peaked at −20.0 dB, below the routine blips around it (render 1): raised its gain, and it now peaks at −13.0 dB. This changed only the audio; all 29 inspected frames are byte-identical between renders 1 and 2.
- Stills and both encodes were checked for clearance: the comparison text, `=` and `≠` marks, chips, lane labels, and both footers fit without overlap at 350 px. No layout faults were found.

## Suggested improvements

1. **Make the rejection reply say why** (19.4 s, size S). Saw: the chip reads `rejected` only; the reason lives in the service verdict. Change: `rejected · k7 reused` if it fits the lane. Effect: the caller-side outcome carries its cause.
2. **Dim the incoming column after rejection** (from 20.6 s, size S). Saw: both columns stay equally bright through the end, so the rejected request looks as current as the stored one. Change: drop the incoming column to about 50% after the reply lands. Effect: the stored v1 reads as the surviving record.
3. **Show k8 as a separate operation slot** (28.0 s, size M). Saw: k8 replaces the v2 row in place, so the rejected k7 · v2 attempt disappears. Change: keep a dimmed struck `k7 · v2` line and add k8 below it, if the caller card can grow. Effect: makes "new key for new intent" a visible change of identity.
4. **Shorten the final hold** (31.9–40.0 s, size S). Saw: about 8 s of stillness. Change: fade at about 38 s. Effect: tighter ending.
5. **Separate the opening flashes** (1.2–4.6 s, size S). Saw: three similar ack cues in under 4 s. Change: drop the 4.6 s A5 ack and keep the visual flash. Effect: the key cue stays meaningful.
6. **Pitch the k8 store differently from the database store family** (28.0 s, size S). Saw: the caller-side `store` B5 is the second-loudest cue and could suggest a write. Change: use a softer `ack` pair instead. Effect: avoids implying that anything was saved to the database.

## Notes for the skill (optional)

- Per-cue peak measurement caught a decisive cue that the spectrogram alone made look adequate; worth listing in the review guide.
