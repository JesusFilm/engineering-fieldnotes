# Lesson 04 review (render 3)

Scope: defect pass and improvement pass from the architecture-flow-video review guide, run by the author on the encoded `video.mp4`. This is a self-review. It is neither the independent comparative review the editorial workflow requires nor a score. Audio was checked by spectrogram and level analysis only; nobody listened to it.

## Fixed before handover

- Zero-marker ring overlapping the "v1" track label (stills, about 22 s): moved the tracks to x 240–960 so the label clears the ring.
- Red outline around 40% touching the row edge (stills, about 29 s): reduced the rate type from 116 to 100 px, narrowed the outline to 240 px, and moved "=" left.
- Lock ring crossing the 900/100 numerals (render 1, frame 174 at 5.8 s): replaced the ripple with glows on the totals and the window chip. Confirmed at alternate exact frames 172, 173, 174, 175, 176, 180, and 186.
- Cue loudness order (render 2): the neutral "0 failed" blip at 8.5 s (−8.7 dBFS) was louder than the 40-failure cue (−9.2 dBFS). Lowered the neutral `ack` cues and raised the failure `thump`. Now 15.0 s peaks at −7.5 dBFS (the loudest), and 8.5 s peaks at −13.0 dBFS.

No other defects were found. All labels are readable at an actual 350 px width, nothing is clipped or overlapping, no state lingers by mistake, every visible change has a sound, holds are silent, and peaks stay at or below −0.5 dBFS.

## Suggested improvements

1. **Use the empty lower third early** (0–20.7 s, size M). Saw: y≈1320–1920 stays empty until the rate tracks arrive. Change: start the two rows lower and slide them up when the tracks appear. Effect: a more balanced phone frame, and the layout change itself signals a new reasoning step.
2. **Tie each denominator to its track** (25.6–26.9 s, size M). Saw: the pairing beat uses only glows, which is subtle on a phone. Change: draw a short connector from each row's denominator down to its own track for 0.6 s. Effect: "own denominator" becomes a visible relationship.
3. **Mark the window closing** (5.8 s, size S). Saw: the underline simply finishes filling. Change: add a short end tick or cap on the underline when the totals lock. Effect: "same window, now closed" reads more clearly.
4. **Link "observed worse" to the 40% outline** (28.7 s, size S). Saw: the caption sits under the v2 track while the outline is in the row above. Change: pulse the track fill and the outline together, or place the caption beside the row. Effect: one focus point instead of two.
5. **Trim the limit notes** (32.5–38.5 s, size S). Saw: three swapped notes make a text-heavy ending. Change: keep two, or show "cause not proven · no universal threshold" together. Effect: a shorter, calmer finish.
6. **Listen before shipping** (whole video, size S). Saw: levels and timing are analysed, but nobody has listened. Change: a human listening pass at phone volume, especially the G6 clock ticks and E4 thumps. Effect: confirms that the cues are audible and not grating.

## Notes for the skill (optional)

- The cut-local engine adds `group` (shared transform parent), `caption` (sized text, pill, progress underline), `panel`, `line`, `track`, and `ring` nodes, plus a `dx`/`dy` offset and `meta.veilTop`. The shared skill was not changed.
