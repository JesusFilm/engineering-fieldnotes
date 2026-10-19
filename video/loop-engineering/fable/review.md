> Historical author review of the original encode. The current cut includes separately attributed comparative corrections. See `../../../reviews/comparisons/loop-engineering/after.md` and `variant.json` for current verification and transcript.

# Loop engineering "Progress check" review (render 3, final)

Reviewed from the encoded file (contact sheet, 2 fps review frames, full-size frames at beat midpoints and the busiest frame, spectrogram, volumedetect), with the scene source set aside.

## Fixed before handover

- 7.3 s (render 1 stills): the escalation wire ran through the "Run log" label. Moved the label above the store so the wire to Human is clear.
- 3.3 s and 6.7 s (render 1): the Agent flashed red every time a failing result arrived, which reads as the agent itself failing. The arrival pulse is now white; red stays on the result chips and the log.
- 11.2 s and 25.7 s (render 1): the verdict badge (`DONE`, `NO PROGRESS`) was the lesson's conclusion yet drawn at 30 px. It now pops to 1.5× (45 px text). It also stayed at full alpha during the hand-off instead of dimming with the stopped loop.
- 7.2 s, 21.8 s, 25.2 s (render 2, 350 px strip): the ✓/✕ progress marks were about 26 px across and hard to read at phone size. Added a `markR` option to the local engine and drew them at 44 px with wider ripples.
- Loop boundary (render 1 encode): the identical first and last source frames decoded with different ringing around the title (last frame was a P-frame; YMAX diff 42). Switched the local renderer to constant QP without adaptive quantisation or mb-tree and forced a keyframe on the last frame; decoded first and last frames are now byte-identical.
- Layout (render 1): a slack gap between Tests and the log; moved the log and Human up so the stage ends near y≈1780.

## Defect pass (render 3)

- Text: smallest words are the 26 px chips (`EDIT 1`, `5 FAIL`, `HAND OFF`) and the 30 px log rows; all legible at 350 px wide. No clipping or overlaps found in any review frame.
- Nothing inside the title band or off-stage (lowest element: "Human" label at y≈1762).
- No lingering state: the log, badge and Agent colour reset under the veil at 14.3 s; the orange "same" colouring is replaced by red at the stall.
- Every visible event has a cue and every cue has a visible event (62 cues; checked against the spectrogram). The 11.2–15.3 s silence is the DONE hold plus the fade through black; decoded-audio maximum in that window is 0.004.
- Peak −3.0 dBFS; quiet cues (send, ack) were raised in gain and are visible on the spectrogram under the work ticks.
- Longest stretch without visible change: 2.4 s holds after DONE and after the hand-off, both deliberate.
- First and last frames identical (md5), both keyframes.

## Suggested improvements (not applied; for the editor)

1. **Show the comparison, not just its verdict** (7.2 s, 21.8 s; size M). Saw: the ✓/✕ ripple appears at the newest row; the viewer infers it compares with the row above. Change: a brief dim-to-bright sweep of both rows' bars, or a short bracket joining the two bars, before the mark pops. Effect: makes "compared with the last cycle" explicit through motion.
2. **Audible counts** (2.4 s, 5.8 s, 17.0 s; size S). Saw: all failing results use the same `miss` sound except the 5-fail case. Change: pitch `miss` by failing count (lower = more failures) so run 1 rises and run 2 stays flat. Effect: the plateau becomes audible before it is visible.
3. **Dim Tests during the stalled cycles** (18.8–25.2 s; size S). Saw: cycle 3 of run 2 looks identical to a healthy cycle until the result lands. Change: after the orange warning at 21.8 s, draw the `EDIT 3` chip in orange. Effect: signals that the loop is continuing under a warning, so the red stop feels earned.
4. **Shorter reset** (11.2–15.3 s; size S). Saw: four seconds of hold, fade and silence between runs. Change: trim the DONE hold to 1.8 s and the fades to 0.45 s. Effect: keeps attention; total drops to about 29 s.
5. **Hand-off origin** (26.6 s; size M). Saw: the `HAND OFF` chip leaves the run log, which stands in for the harness. Change: pulse the verdict badge and route the chip from the badge down the left of the ring to Human. Effect: ties the decision (badge) to the action (hand-off) in one motion.
6. **Human acknowledges** (27.3 s; size S). Saw: Human lights green and the video ends. Change: a small envelope back up to the dimmed Agent would overstate what happens; instead keep the end but add a short second chime note. Effect: reads as "received" rather than "finished".

## Honest limitations

- The "three identical results" rule is illustrative. Real harnesses choose the signal (failing count, diff size, coverage, cost) and the threshold; a count can stay flat while different tests fail, which this cut does not show.
- The check is drawn on the run log to suggest it lives in harness code. The video cannot show that a prompt instruction alone does not enforce it; the written guide must say so.
- The budget/iteration limit is not shown at all here; a viewer needs the baseline cut (or the guide) for that half of the stopping rule.
- Audio was verified by analysis (levels, onsets, spectrogram), not by listening.
- The model name in `variant.json` is provenance only; this cut has not yet had the comparative review that `docs/editorial-workflow.md` requires before any recommendation.

## Notes for the skill (not acted on)

- A `store` row text size and a ripple `markR` option would be useful defaults for phone-first scenes; both are in this folder's engine copy.
- For looping videos, an encoder mode that guarantees identical boundary frames (constant QP + forced final keyframe, or encoding the last frame as a duplicate of the first I-frame) would make the "first and last frames match" check pass after encoding, not only in source.

