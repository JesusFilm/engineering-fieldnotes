# Lesson 05 review (render 1)

The review uses encoded frames, the spectrogram, and levels from `video.mp4` (sha256 in `verification.json`). Audio was analysed only, never listened to.

## Fixed before handover

- No objective defects were found in stills or encoded frames. The ✓ ripple at 23.0–23.6 s briefly overlaps the outlines of the two highlighted rows in the narrow lane but covers no text, so it was left as a transient.

## Suggested improvements (ranked)

1. **The check lane is narrow** (22.0–24 s, size M). Saw: the bracket and ✓ fit in a 76 px lane and touch both row outlines. Change: narrow the columns to widen the lane to about 120 px, or move the ✓ onto the result row only. Effect: a cleaner comparison moment.
2. **Empty space in the expect column** (4.2 s onward, size S). Saw: the expect column has a blank row above `key total_cents` (kept so it lines up with the matching actual row). Change: put a dim `(value not checked)` note there, or align it differently. Effect: no apparent hole, and the narrow assertion is clearer.
3. **Value not checked** (23.8 s, size S). Saw: `total_cents: 1250` might read as checked. Change: dim `1250` after the pass. Effect: reinforces that only presence was asserted.
4. **Shorten the final hold** (33.2–41.0 s, size S). Saw: about 8 s of stillness. Change: about 5.5 s. Effect: about 2.5 s shorter.
5. **The stale-target moment could be louder** (10.2 s, size S). Saw: the quiet `miss` is easy to miss. Change: raise its gain a little and hold the red state 0.5 s longer. Effect: the pitfall of testing the wrong revision registers.
6. **Vertical balance** (whole video, size S). Saw: about 260 px unused below the record. Change: move the stage down about 80 px or enlarge the record rows. Effect: better framing on phones.

## Notes for the skill (not acted on)

- A comparator node (two aligned columns with a check lane) would suit other verification topics.
