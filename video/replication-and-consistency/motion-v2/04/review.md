# Lesson 04 — Received is not applied · review (render 4, final)

The review used the encoded `video.mp4` (sha256 `931f5326…78ba`), with frames at 1080 px and 350 px, contact sheets and a spectrogram. Audio was analysed but **not heard**. This is the author's own defect pass and improvement pass. It is not the fresh comparative review that the editorial workflow requires before recommendation.

## Fixed before handover

- **Unreadable packet text** (render 1, 10.6 s and 12.0 s). The engine's packet chips use fixed 26 px text, so `R42?` and the returned `7` were about 8 px at 350 px. They are now moving `tag` nodes at 36–40 px.
- **Result chip clipped the standby bracket** (render 1, 12.0 s). The result path moved from x 930 to x 880, clear of the bottom-right corner arm.
- **Row swap overlapped digits** (render 1, 22.05 s). 7 and 8 crossfaded through each other under the ripple. The replacement is now sequential (7 exits in 0.18 s, then 8 enters), and the ripple starts outside the digit.
- **Arrival ripple crossed the record text** (render 1, 5.41 s). The ripple now starts at r 96, outside the `R42→8` tag.
- **Fade-in never ran** (render 1, 0 s). `s.set` was called with the wrong arguments for the stage veil. It now fades from black over 0.05–0.75 s.
- **Final freeze padded** (render 2). The resolution hold ran 5.8 s. The fade moved one authored second earlier, so the hold is now 4.35 s and the total is 34.71 s.
- **Receipt louder than replay** (render 3). The arrival window peaked at ‑9.1 dB, above the row change at ‑9.5 dB. Arrival gain fell from 0.75 to 0.5, so it now peaks at ‑12.4 dB and the row change is the loudest cue.
- Subtitle raised from 32 to 36 px for phone legibility (render 1).

Defect pass on the final render: clean. No label overlaps, no stage spill into the title band, no stale state, a sound for each visible event, and peak ‑9.5 dBFS.

## Suggested improvements (optional, ranked)

1. **Show the gap as a span** (12.6–18.1 s, S). Saw: the gap between receipt and replay is shown only by marker positions one cell apart. Change: draw a faint amber bracket under the strip from `replayed` to `received` that collapses when replay catches up at 20.6 s. Effect: makes "replay lag" a visible quantity that closes.
2. **Shorten the long comparison hold** (12.6–18.1 s, S). Saw: 5.5 s of stillness, broken only by the marker glow at 15.06. Change: cut 0.8–1.0 s, or add a breathing amber outline on the R42 cell. Effect: tighter pacing without losing the comparison.
3. **Let the first answer react once** (21.88 s, S). Saw: the row becomes 8, and the earlier `7` result stays still, which is correct but easy to miss. Change: a soft grey pulse on line 1 about 0.6 s after the swap, without changing its value. Effect: points out that returned results do not update.
4. **Fill the terminal's empty lower half** (10–26 s, S). Saw: about 110 px of unused space below line 1 until line 2 appears. Change: shrink the terminal to fit two lines, or move both lines down. Effect: a calmer frame.
5. **Distinguish the typing tick** (10.12 s and 26.59 s, S). Saw: `clock` A6 and `send` A6 fall 0.35 s apart at the same pitch. Change: drop the typing tick or lower it to E6. Effect: a sparser mix.
6. **Opening identity** (0–3.5 s, M). Saw: the first 3.5 s only shows the markers appearing. Change: draw a brief dotted link from the primary to the replayed cells to show they are already replicated history. Effect: sets up "same stream, newer record."

## Notes for the skill (not acted on)

- Packet chips have a fixed 26 px label, which is too small for 350 px phone viewing. A `size` option would help.
- `s.set` for the stage veil needs the `('stage', 'veil')` id and prop pair. A one-argument form fails silently.
