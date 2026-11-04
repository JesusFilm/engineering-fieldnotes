# Lesson 02 review (render 2)

Reviewed from encoded frames at 38 beat and boundary times (`scratch/enc2`, viewed individually at native size and at 350 px), the 350 px sheet, the contact sheet, the spectrogram, waveform and per-cue peaks. The audio was analysed, not listened to.

## Fixed before handover

- **Old results under the new label** (render 1, about 30.4–30.7 s). The grid title switched to `tests · code B` while code A's dimmed marks were still fading, so old results briefly sat under the new code's label. The marks now clear between 29.8 and 30.2 s, under `tests · code A`, before the title changes. A soft clearing sound marks the moment.

The defect pass is otherwise clean on render 2:

- All text is at least 36 px source (about 12 px at 350 px width), and the key rows are 40–44 px.
- No dot or highlight crosses text.
- Every visible event has a cue.
- The peak is −6.2 dB with no clipping.
- The longest still stretch is the deliberate 3.6 s hold on the A/B split at 25.4–29.0 s.
- The 0.6 s gap at 20.6 s, where the new line shows before the badge reads `code B`, is intended: the edit creates code B.

## Suggested improvements (ranked)

1. **Show which test failed** (8.0–10.6 s, size S). Saw: the card title is the generic `failing test`. Change: title it `test 11`, or a short test name, and give the red cell a matching number. Effect: the "same case" link from grid to card is explicit.
2. **Give the routes between card, agent and code more presence** (16.2 and 18.0 s, size S). Saw: the agent sits so close to both panels that the travelling dot is brief and the wires are almost invisible at 350 px. Change: lengthen the gaps slightly and slow each dot to about 0.7 s. Effect: the agent's reading and editing read as two separate steps.
3. **Make "tests unchanged" visible during the edit** (20.6 s, size S). Saw: the input and expected rows stay put, but nothing draws attention to that. Change: briefly pulse `expected 90.00` in neutral white as the code changes. Effect: shows directly that the code was repaired and the test was left alone.
4. **Trim the final running hold** (31.0–35.4 s, size S). Saw: 4.4 s of one pulsing cell with work ticks. Change: shorten to about 3 s if reviewers find it slack. Effect: tighter ending with the same pending state.
5. **Show stale results as linked to the old code** (23.2 s, size M). Saw: the dashed grid and amber `code A` title show staleness, but the link to the badge's `code B` is spatial only. Change: briefly draw a dashed link from the grid title to the code badge, showing they differ. Effect: makes the mismatch read faster.
6. **Distinct sound for code B's empty slot** (25.4 s, size S). Saw: it uses the same ack as the card's expected row. Change: use a short open, unresolved two-note interval. Effect: the "no result yet" moment sounds unfinished.

## Notes for the skill (not acted on)

- `tgrid` and the character-span highlight in `panel` are general and could join the shared engine after review.

