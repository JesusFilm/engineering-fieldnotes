# Lesson 04 review (render 2)

Reviewed from encoded frames at 33 beat and boundary times (`scratch/enc`, viewed individually at native size and at 350 px), the 350 px sheet, `scratch/key-350.png`, the contact sheet, the spectrogram, waveform and per-cue peaks. The audio was analysed, not listened to.

## Fixed before handover

- **Pending status box collided with the panel edge** (stills render, 30.2 s onward). The dashed outline around `setup check pending` touched the `for engineer` panel's bottom border and crowded the `selected 0 · ran 0` row. I removed the outline; the amber text alone now marks the pending state, with clear spacing.

The defect pass is otherwise clean on render 2:

- All text is at least 32 px source; counter names are 32 px and numbers 64 px.
- No dot crosses text.
- The order holds: the typo is shown before selection, selection collapses before `ran`, `ran 0` precedes the `not a pass` correction, the correction precedes classification, and classification precedes both the stop and the handoff.
- The peak is −4.4 dB on the intended loudest cue (the classification thump), with no clipping. All 37 cues register (−23.6 to −4.4 dB).

## Suggested improvements (ranked)

1. **Make the green "0 failed" trap shorter or more clearly provisional** (13.3–16.3 s, size S). Saw: the green glow holds for about 2.3 s. Some viewers may remember the green rather than the correction. Change: shorten the hold to about 1.5 s, or add a faint `?` beside the green zero. Effect: the misreading is shown, but the correction dominates.
2. **Tie `not a pass` to `ran 0` spatially** (16.7 s, size S). Saw: the label sits under `failed`, while the reason is the `ran` counter. Change: briefly draw a short link from `ran 0` to the label as it appears. Effect: the cause reads without words.
3. **Keep the original names faintly visible after filtering** (8.9 s onward, size M). Saw: the names vanish, which could be read as tests disappearing despite `collected 12`. Change: leave them at about 25% alpha, dashed, behind the empty state. Effect: reinforces that the tests still exist and were only deselected.
4. **Separate the two bottom links** (24.0 and 27.0 s, size S). Saw: the drops from the table to the panels are short (57 px). Change: lengthen the travel and add a glow along each link. Effect: the stop and the handoff read as consequences of the lit row.
5. **Trim the final hold** (30.2–35.6 s, size S). Saw: a 5.4 s still hold; dense text justifies a long read, but it may feel slack on rewatch. Change: trim to about 4.5 s if reviewers agree. Effect: tighter ending.

## Notes for the skill (not acted on)

- `counter` is a general building block, a big value with a name below, that could join the shared engine after review.

