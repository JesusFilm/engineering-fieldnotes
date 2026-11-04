# One intended operation review (render 3)

Reviewed from encoded frames (full size and native 350 px wide), the contact sheet, the spectrogram, and per-cue peak measurements. Audio was analysed only; it was not listened to.

## Fixed before handover

- Request chip `create v1` touched the `request` label at 8.6 s, and the `ticket 47` chip touched `response` at 25.2 s (render 1): moved the lanes from x 340/720 to x 400/680 and moved the labels outward.
- Commit ripple at 15.7 s crossed the table's `id release` header (render 1): replaced it with a small ripple at the right end of the new row.
- Arrival ripple at 26.0 s drew over the caller's `knows` row outline (render 2): moved it below the card edge and shrank it.
- Engine chip text (26 px) and box sublabels (24 px) would display at about 8 px on a 350 px phone: added a chip `size` option (40 px used) and used card rows at 46 px, titles at 46–50 px, and labels at 40 px or larger.

## Suggested improvements

1. **Shorten the post-reply hold** (27.5–32.5 s, size S). Saw: five still seconds after the caller learns 47, before the matching flashes. Change: start beat 5 at about 30.0 s. Effect: keeps the match close to the delivery it explains.
2. **Make the save sound feel heavier than the reply** (15.7 s vs 26.0 s, size S). Saw: the store cue has the highest peak, but the deliver cue's echo spreads more energy, so on the spectrogram the reply looks as prominent as the save. Change: add a short low body layer to the store cue for this scene, or trim the deliver echo. Effect: by ear, the effect lands as the main event.
3. **Trace the ticket id in the reply** (24.5–26.0 s, size M). Saw: the reply chip leaves from the service edge, so a viewer may not connect it to row 47. Change: flash table row 47 briefly as the reply chip departs, without moving data out of the table. Effect: makes "report about this row" visible before the beat-5 match.
4. **Dim the service's request row once saved** (from 15.7 s, size S). Saw: `create ticket · v1` stays fully readable in grey through the end. Change: drop it to about 50% alpha after the save. Effect: the eye goes to the table and the caller.
5. **Signal the waiting caller at phone size** (7.5–26.0 s, size S). Saw: the blinking amber lamp is about 9 px across at 350 px wide. Change: blink the `waiting` word as well, or enlarge the lamp. Effect: the waiting state stays visible on a phone during the central hold.
6. **Reconsider the closing sound** (35.0 s, size S). Saw: a soft `arrive` marks the closing status line, using the same preset as the service's arrival. Change: use a quiet two-note chime, or no sound. Effect: avoids an apparent second arrival.

## Notes for the skill (optional)

- The default chip and box sublabel sizes are below phone legibility at 350 px; a chip `size` option would help every scene.
