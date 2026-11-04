# Retry the same key review (render 2)

Reviewed from encoded frames (full size and native 350 px wide), the contact sheet, the spectrogram, and per-cue peak measurements. Audio was analysed only; it was not listened to.

## Fixed before handover

- The request chip sat about 25 px from the `request` label (stills): moved the request lane from x 420 to 450 and the label outward.
- The caller's `knows` row outline nearly touched the card's bottom edge (stills): made the card 10 px taller and respaced the rows.
- The reply arrival ripple overlapped the caller's `knows` row (stills): moved it below the card and shrank it.
- Both chips started or ended inside the caller card, so the request chip covered `knows: nothing` at 8.1 s (render 1): moved the service and database down 40 px to lengthen the lanes, and kept both chip routes inside the lane gap.

## Suggested improvements

1. **Show the create branch being skipped at the decision moment** (17.0 s, size S). Saw: the dashed `new` branch is dim throughout and does not react when `found` lights. Change: a brief, very faint dim-flash of the `new` branch right after `found` lights, with no sound. Effect: draws the eye to the path not taken.
2. **Tie the returned result to the stored row** (24.5 s, size M). Saw: the reply leaves from the service edge; the link to `47 v1` is implied. Change: flash the ticket row as the reply leaves, without moving data out of the table. Effect: makes "existing result" visible.
3. **Shorten the opening** (0–4.4 s, size S). Saw: two context flashes before the retry starts. Change: merge the caller and database flashes. Effect: reaches the retry sooner; lesson 03 already showed the records.
4. **Larger branch arrowheads** (from 0 s, size S). Saw: the arrowheads under `lookup` are about 5 px at 350 px. Change: increase their size, or lengthen the arrows. Effect: the split reads as a decision on a phone.
5. **Quieter opening blips** (1.2–4.9 s, size S). Saw: four similar `ack` cues in the first five seconds. Change: drop the 2.8 s database ack. Effect: keeps the key's A5 cue distinct.
6. **Shorter final hold** (29.8–38.0 s, size S). Saw: about 8 s of stillness. Change: fade at about 36 s. Effect: tighter ending.

## Notes for the skill (optional)

- A chip on a short lane can begin or end inside the card it connects to; render helpers could clamp chip endpoints to the space between the cards.
