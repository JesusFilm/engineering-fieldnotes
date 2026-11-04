# Lesson 01 review (render 2)

Reviewed from encoded frames (`scratch/enc2`, native and 350 px), the contact sheet, the spectrogram, waveform and per-cue peaks (`scratch/cue-peaks.txt`). The audio was analysed, not listened to.

## Fixed before handover

- **Admission ring crossed the call name** (render 1, 5.0 s and 27.7 s). An expanding ring centred on the slot passed through `run tests` and `patch`. It is now a brief outline flash on the slot.
- **Decision ring overlapped `tests pass`** (stills, 18.0 s). The ring around `continue` was reduced so it stays clear of the rule row.
- **Inconsistent failure wording** (22.2 s onward). The agent showed `got 100, expected 90` while the tool showed `expected 90, got 100`. Both now match the tool's order.

The defect pass is otherwise clean on render 2:

- All text is at least 40 px source (about 13 px at 350 px width) and clear of tokens.
- Each state change has a cue and each cue has a visible event.
- The peak is −7.1 dB.
- The longest unchanging stretches are deliberate holds: about 2.1 s at 10.3–12.4 s and about 4.6 s on the final state.

## Suggested improvements (ranked)

1. **Make the agent's "can't act yet" moment visible** (9–19 s, size M). Saw: during OBSERVE and DECIDE the agent is idle, so the viewer is never shown an attempt being held back. Change: let the agent show a faint pending proposal that waits above the dashed slot until 19.5 s, then drops through. Effect: shows directly that observation alone does not trigger the next action.
2. **Give the decision link more weight** (18.0–19.5 s, size S). Saw: the short amber link from `continue` to the slot is small at 350 px. Change: thicken the link and add a brief glow along it as the token travels. Effect: the cause of the slot reopening reads at phone size.
3. **Trim the final hold** (32.5–37.1 s, size S). Saw: a 4.6 s still hold before the fade. Change: shorten it to about 3 s if reviewers find it slack. Effect: tighter ending with the same final state.
4. **Distinguish the two thumps** (9.3 s vs 16.4 s, size S). Saw: the test failure and the failed rule both use thump, the second quieter. Change: give the rule check a short, dry, pitched blip on the controller's G. Effect: the sounds separate the tool's result from the controller's judgement.
5. **Show that the agent received the evidence before proposing** (22.2–24.0 s, size S). Saw: the red line replaces the task line, which loses the task context. Change: keep the task line and add the evidence as a third row. Effect: the agent visibly keeps its goal and adds the observation.
6. **Phase row emphasis on mobile** (all, size S). Saw: the inactive phase words are grey at about 14 px on a phone. Change: optionally enlarge them to 48 px. Effect: the act, observe, decide rhythm reads faster.

## Notes for the skill (not acted on)

- `panel`, `callslot` and `pill` are general and could join the shared engine after review.
- Packet chips are 26 px, too small for phone viewing. A `size` option would help future cuts.

