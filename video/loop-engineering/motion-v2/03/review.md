# Lesson 03 review (render 1)

Reviewed from encoded frames at 29 beat and boundary times (`scratch/enc`, viewed individually at native size and at 350 px), the 350 px sheet, the contact sheet, the spectrogram, waveform and per-cue peaks. The audio was analysed, not listened to.

## Fixed before handover

- No objective faults were found in the encoded render. Before encoding, the still check confirmed:
  - All text is at least 36 px source.
  - No dot crosses text.
  - The rule ticks only after the run report lands.
  - The loop closes only after `rule met`.
  - The handoff fills only after the loop closes.
  - Nothing reopens.
- The audio peaks at −6.9 dB with no clipping, and every one of the 31 cues registers in the decoded track (−17.2 to −9.3 dB in a 150 ms window).
- The longest still stretches are deliberate holds: 2.5 s after the run completes, 2.8 s after `rule met`, 3.6 s on the closed loop, and 5.8 s on the final record.

## Suggested improvements (ranked)

1. **Make the scope limit visible in the handoff** (25.6 s, size S). Saw: `12 selected passed` bounds the claim, but a beginner might still read the whole record as "done". Change: add a dim row `other behaviour: untested`, or make `selected` brighter than the rest of the row. Effect: states the takeaway without a sentence caption.
2. **Show the rule's conditions before the run** (0–1.6 s, size S). Saw: the three dim rows are visible but unremarked while the run happens. Change: briefly pulse the dim rule rows once at 1.0 s. Effect: the viewer knows what the evidence will be measured against.
3. **Make the stop decision's route clearer** (17.0 s, size S). Saw: the drops from the controller to the loop and to the handoff are short (72 px) and quick at 350 px. Change: lengthen the travel to about 0.8 s and add a short glow along each link. Effect: the controller's two consequences read as caused by it.
4. **Distinguish the stop sound** (17.6 s, size S). Saw: the latch and the low deliver are the loudest cues apart from the arrival at 21.8 s, and the chime at 14.2 s is not clearly the top moment. Change: raise the chime slightly, or soften the handoff arrival. Effect: rule met → stop → handoff gets a clearer audible hierarchy.
5. **Shorten the final hold** (25.6–31.4 s, size S). Saw: a 5.8 s still hold. Change: trim it to about 4 s if reviewers find it slack. Effect: tighter ending.

## Notes for the skill (not acted on)

- `segs` and `ring` are general and could join the shared engine after review.

