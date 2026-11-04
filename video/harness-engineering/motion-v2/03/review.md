# Video 03 review (render 5, final)

**Bound to:** `video.mp4` SHA-256 `c5f993be7ece5ad7895077c5251a7d09b3a067f61b5c8a4871191700d920b317` (41.11 s). Any re-encode voids this review.

## Render 5 follow-up: the agent visibly receives the output

An independent encoded comparison of render 4 found a teaching gap at 21–25 s. The agent received only `exit 1 @ a61c9e2`, and the output stayed in the retained record without being shown as supplied.

Fix:

- The return chip now carries `export: FAIL · exit 1`.
- The agent strip is taller (two rows). On arrival, it shows `exit 1 @ a61c9e2` and `export: FAIL` together, tagged `observed · Run #1`. Both lines fade in whole at 22.9 s, with no typing.
- The second row clears when the patch message appears at 27.8 s.
- Chip routes start at the strip's new bottom edge.
- The retained record, the revision graph, and the `current` story are unchanged.

Checked on this encode:

- 23 frames from 20.50 to 26.00 s in 0.25 s steps, each saved at native size and at 350 px wide (`scratch/win3/`, sheet `scratch/win3-350-sheet.png`, native crop `scratch/win3-native-key.png` at 21, 22, 23, and 24 s).
- 19 frames across every other state the taller strip touches: claim, request, run, patch, ring move, and end (`scratch/enc3/`, `scratch/enc3-350-sheet.png`).
- At 350 px, `export: FAIL` and `exit 1 @ a61c9e2` are both readable in the agent strip, and the chip clears the `current` label and the hash. Nothing overlaps.
- Full decode, levels, the 19 cue peaks (unchanged), the spectrogram, box order, and the poster were all re-run.

The sections below describe render 4. Its frame sets (`scratch/enc2/`) belong to the superseded encode, and their findings were re-confirmed through the sets above.

## Evidence scope

- **Analysed:** 33 frames decoded from this exact file at 0, 1.5, 2.4, 3.6, 4.25, 5.5, 7.0, 8.2, 8.95, 9.6, 10.6, 12.0, 14.0, 15.3, 16.6, 18.4, 20.3, 21.3, 22.0, 23.6, 24.4, 25.6, 26.9, 28.2, 29.0, 29.9, 30.6, 31.4, 33.4, 35.2, 37.5, 39.3, and 41.0 s (`scratch/enc2/`). These cover every beat landing and boundary, including the expand (8.2–9.6) and compact (24.4–25.6) transitions.
- **Views:** a 350 px-wide sheet of all 33 (`scratch/enc2-350-sheet.png`), plus native 1080×1920 views (`scratch/native-key.png`) at 4.25 (claim landing), 22.0 (return chip, busiest), 29.9 (ring in motion), and 37.5 (final state).
- **Audio:** spectrogram (`scratch/spectrogram.png`); per-cue peaks from the decoded audio (`scratch/cue-peaks.json`); `volumedetect`; full decode; MP4 box order.
- **Heard:** nothing. The audio was **not listened to**.
- **Not covered:** a site or browser check, and comparison with other cuts.

## Fixed before handover

- **Chip text too small:** chip labels used the engine's fixed 26 px (about 8 px at 350 px). Added a chip `size` option and set the chips to 40 px.
- **Bottom quarter of the stage empty:** compacted the title band and re-spread the agent strip, graph, and records down to y≈1750. Transcript text is now 50–62 px for the command and outcomes.
- **Claim chip covering `no run` (about 4.2 s):** the landing chip covered part of the `no run` text. Each chip now stops with its left edge at the slot.
- **Audio balance:** the claim's muted thump (−6.3 dBFS) was louder than the real `exit 1` cue (−12.4). Now the claim thump is −12.6, B's no-run thump is −13.7, and `exit 1` is −8.1. Overall peak is −6.2 dBFS, so nothing clips.

Clean on the final encode:

- no text overlaps a chip, ring, or edge at rest;
- nothing sits off stage, and the title stays clear of the stage;
- the activity track stops on `exit 1`, and its empty rail fades during the compaction;
- the record's values never change after capture;
- every visible event has one cue (19 cues, all visible as spectrogram onsets).

Stillness outside the final hold stays under 2.3 s.

## Suggested improvements (ranked)

1. **Retime and reorder the lesson text** (size S, coordinator). The text for beats 3 and 4 swaps order; use beats at 0/11.6/20.0/25.1 and duration 41.1.
2. **Make the claim's non-effect last a moment longer** (4.2–6.7 s, size S). After the jolt, briefly pulse the `no run` text, so a first-time viewer sees that nothing changed before the real request starts.
3. *(Applied in render 5: the observation is tagged `observed · Run #1` and includes `export: FAIL`.)*
4. **Brief linking pulse at the end** (34.9 s, size S). Pulse the `a61c9e2` hash with the record, so the binding reads without the tag text.
5. **Expanded terminal has spare width** (11–22 s, size M). The right half of the wide transcript is empty. Either expand less, to about 700 px, or show the elapsed status there.
6. **Listen to the `miss` cue at gain 6** (17.8 s, size S). Its level was measured but not heard; check it for harshness.

## Notes for the skill (not acted on)

- Chip packet text size should be an option in the shared engine; 26 px is too small for phone viewing at 350 px.
- `meta.veilTop` is needed whenever a scene uses a compact custom title.
