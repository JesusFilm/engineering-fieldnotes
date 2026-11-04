# A missing reply review (render 5)

Reviewed from encoded frames (full size and native 350 px wide), the contact sheet, the spectrogram, and per-cue peak measurements. Audio was analysed only; it was not listened to.

## Fixed before handover

- The lost-reply dashed line and the green write overlay on the service lifeline were visible from 0 s, before any reply existed (render 3). The engine reads wire `alpha` and `dashed` only from the timeline, so the constructor options were ignored. Both are now set at t = 0.
- The `timeout` label touched the timeout bar's end mark (render 1): moved the label right.
- The lost-reply remainder and the hypothetical `create again?` arrow drew as dots, the same as the lifelines (render 1): made both dashed, and lightened the lost-reply remainder from dim to mid grey.
- `48 v1?` crowded the `duplicate?` tag at 350 px (render 4): row text is now `48  v1`, and the dashed amber outline plus the `duplicate?` tag mark it as hypothetical. The tag size went from 36 to 38 px.
- Planned during the build: a stray fade-in would have blinked the caller card at 3 s. Removed before the first render.

## Suggested improvements

1. **Shorten the opening** (0–3.0 s, size S). Saw: two intro flashes before anything is sent. Change: drop the 2.2 s database flash, or start the send at 2.2 s. Effect: the request starts sooner; the empty table is still visible.
2. **Make the hypothetical duplicate audible** (29.0 and 30.8 s, size S). Saw: the cues peak at −21.6 and −25.1 dB, well below the rest. Change: raise the `miss` to about −15 dB. Effect: the warning lands by ear as well as by eye.
3. **Show what the caller can still see at the moment of loss** (14.0 s, size M). Saw: the × lands on the network line while the caller's card does not react. Change: a brief, very faint flicker on the dashed remainder only, with no change in the caller card. Effect: reinforces that the caller observed nothing.
4. **Tighten the hold after the takeaway** (24.6–29.0 s, size S). Saw: about 4.4 s of stillness apart from the earlier flashes. Change: start beat 4 at about 27.5 s. Effect: keeps momentum into the duplicate risk.
5. **Mark the save on the lifeline after it happens** (from 8.9 s, size S). Saw: only the `save 47` text marks where the save happened. Change: leave a small teal dot at the save point on the service lifeline. Effect: the diagram keeps a complete record of the events.
6. **Small labels at phone size** (throughout, size S). Saw: at 350 px, message labels (40 px source) and the `duplicate?` tag display at about 12–13 px. They are legible but not generous. Change: raise them to 44 px where clearance allows. Effect: easier reading on a phone.

## Notes for the skill (optional)

- Wire options such as `alpha` and `dashed` passed to `s.wire` are silently ignored unless set on the timeline. Reading them as defaults would avoid this trap.
