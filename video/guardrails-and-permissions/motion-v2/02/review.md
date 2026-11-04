# Lesson 02 — Grant only needed access: review (render 4)

Reviewed from the encoded `video.mp4` (sha256 641610d0…fd972a). I extracted 35 encoded frames at beats and boundaries, at 1080×1920 and as true 350px downscales, and viewed several individually. I also checked the contact sheet, the spectrogram, a full decode, and window levels. Audio was analysed, not listened to.

## Fixed before handover

- Render 1 (stills), whole video: grid cell text (36px) and keys were small at 350px, with about 220px unused below the log service. Enlarged the grid (cell text 42px, headers 48px, rows 178px), the agent rows (46px) and the log service rows (48px), and moved the routes to match.
- Render 2, 34.5 s: the low E4 `arrive` for the returning 403 had more low energy than the decision cue. A gain change alone was not enough (render 3 window peaks: denial −19.9 dB, arrival −15.0 dB). Render 4 marks the decision with the grants actor's `thump` C3 and the arrival with a quiet agent `ack` E5. Window peaks are now denial −5.0 dB and arrival −16.3 dB.
- Engine: `×` marks in grid cells are offset 22px so `✗ no grant` fits inside a 250px cell.

The defect pass is otherwise clean. No label overlaps a chip, dot or band. R1's result clears before R2 is written. `payments reads 0` holds in every frame. No packet reaches the log service during R2. The only stillness longer than 3 s is the deliberate final hold.

## Suggested improvements (ranked)

1. **Show the lines' source** (18.4 s, S). Saw: the `lines` chip says nothing about where it came from. Change: label it `checkout lines`, if it fits the 100px gutter at 34px (it may need a wider gutter). Effect: ties the returned data to the granted resource.
2. **Pulse the unchanged action header on R2** (28.9 s, S). Saw: the same-column band is clear, but the `read` header text barely changes. Change: a brief white pulse on `read` as the band reappears. Effect: stresses "same action" before the row changes.
3. **Larger closed-route mark** (35.8 s, S). Saw: the engine's 13px ripple × is small at 350px. Change: a local ripple-mark size option. Effect: makes "nothing reached the log service" visible on a phone.
4. **Trim the final hold** (39.8–45.2 s, S). Saw: 5.4 s still. Change: about 4 s if reviewers find it slack. Effect: tighter ending.
5. **Show the write column was never tried** (M). Saw: the `write` column is static context. Change: leave it as is, or dim it slightly so the eye stays on the read column. Effect: less visual competition, but the action axis is less visible.

## Limits

These scoped checks cover legibility, timing, and encoding. They do not show that every viewer will understand the lesson. The grid shows this example's effective policy, not a complete permission model with conditions or patterns.
