# Name the operation review (render 3)

Reviewed from encoded frames (full size and native 350 px wide), frame-number extraction of the commit, the contact sheet, the spectrogram, and per-cue peak measurements. Audio was analysed only; it was not listened to.

## Fixed before handover

- The request chip `create v1 · k7` overlapped the `request` label at 9 s (render 1): moved the request lane from x 400 to 440 and the label outward.
- The `transaction` heading nearly touched the `tickets` table's top edge (render 1): moved both tables down and made the database card taller.
- At 350 px, the `Database` title touched the top edge of the dashed transaction frame (render 2): raised the title, and moved the frame and tables down further.
- Commit atomicity checked by frame number: frame 641 shows both rows pending, and frame 642 shows both committed. No frame shows one row solid and the other pending.

## Suggested improvements

1. **Make the lookup visibly reach the key table** (10.8–12.9 s, size M). Saw: the probe dot stops at the database card's edge, and only the key table's highlight shows where it looked. Change: route the dot to the key table's left edge along the database margin. Effect: the viewer sees that the service checks k7 itself.
2. **Make the lookup's empty result audible** (11.4 s, size S). Saw: the soft `miss` peaks at −23.9 dB, far below its neighbours. Change: raise it to about −15 dB. Effect: "no record" lands by ear.
3. **Shorten the opening hold** (4.4–8.0 s, size S). Saw: about 3.6 s with only a blinking state after the key is saved. Change: send at about 6.8 s. Effect: keeps momentum; key-first is already clear.
4. **Brighten the pending rows at phone size** (17.2–21.4 s, size S). Saw: pending text at 70% amber reads dim at 350 px. Change: use 85% alpha and keep the dashed outline. Effect: the pending state stays legible while still distinct from saved.
5. **Name the uniqueness scope** (from 18.4 s, size S). Saw: `unique` alone may read as "k7 is globally unique". Change: use `unique per caller` if it fits. Effect: closer to the concept's caller, operation, and key scope.
6. **Tighten the hold after commit** (24.4–26.5 s, size S). Saw: a fairly still stretch after the frame fades. Change: start the reply about 1 s earlier. Effect: sharper pacing into the lost reply.

## Notes for the skill (optional)

- A frame-number commit check (`select=between(n,a,b)`) was the clearest way to verify a "same frame" claim; worth adding to the review guide.
