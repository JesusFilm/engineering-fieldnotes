# Agent evals (fable cut) review (render 4)

Reviewed from the encoded file at [public/media/agent-evals/fable.mp4](../../../public/media/agent-evals/fable.mp4): contact sheet at 1 fps, frames every 2 s at full size, the busiest frames at 13.32 s and 21.75 s at full size, the nine beat frames at 350 px, spectrogram, `volumedetect`, full decode, atom order, and a byte comparison of decoded first and last frames. Audio was analysed (spectrogram, peak and mean levels, cue timing against the beat sheet); it was not played back and heard.

## Fixed before handover

- 12.06 s (render 1): a fifth `work` tick landed on the same instant as the `patch` send in the second trial, so one event carried two sounds. The tick loop accumulated floating-point error; it now cues exactly four ticks per trial.
- Whole cut (render 1): the column ended at y≈1606 and left the lower sixth of the stage empty; every node moved down 35–100 px so the grader and verdict sit in the back-tier zone.
- Verdict badge (render 1): at 30 px mono the PASS/FAIL pill was the smallest text on screen; it now pops to 1.2× scale.
- First and last frames (renders 1–3): the rendered source frames were byte-identical but the decoded MP4 frames differed by up to 64/255 around the title, because CRF chose different quantisers for the opening keyframe and the final predicted frame, and still differed with a forced final keyframe. The local renderer now encodes at constant QP 22 with macroblock-tree off and forces the last frame to be a keyframe; decoded first and last frames are now identical (`cmp` on the PNGs). File size stayed under 1 MB.
- Audio headroom: the synth's `tanh` master lets peaks approach 0 dBFS; the local renderer applies a −1 dBFS ceiling before muxing. Measured max −2.0 dB, mean −29.9 dB.

## Suggested improvements

1. **Hide the empty grader slot until it is needed** (0–19 s, size S). Saw: the store draws a dim outline for the second grader row from the first frame, so the viewer sees an empty slot for 19 s before anything fills it. Change: start the grader with one row and grow it (new engine prop `rows` animated, or draw the second track only once `row1Alpha` rises). Effect: the arrival of the second assertion becomes a structural change the viewer notices, instead of a slot being filled as expected.
2. **Show the grader reading only one row in the false-pass beat** (14.4–15.9 s, size M). Saw: the single check is marked by one green tick beside test_login; the two red rows simply receive nothing. Change: run a short scan highlight down the suite that stops at row 1, or dim rows 2–3 to 30% for the duration of the grading pass and restore them with the PASS chime. Effect: the eye sees the grader's blind spot as an action, which makes the false PASS land harder.
3. **Rerun the trial after the assertion is added instead of regrading the same state** (19–22.8 s, size M). Saw: the second grading pass inspects the end state left by trial 2. Change: reset the suite, replay trial 2 at a faster pace (packet `dur` 0.35) and then grade with both rows. Effect: matches how a regression suite is actually run (clean environment per trial) at the cost of about 4 s.
4. **Pitch the two breaks as a falling pair** (13.3–13.6 s, size S). Saw: the thumps at E4 and D4 are close enough in pitch to read as one repeated hit. Change: drop the second to B3 and lengthen its sub layer slightly. Effect: two distinct casualties are audible, matching the two red rows.
5. **Let the verdict pill sit under the grader on the centre line** (5.3 s, 15.9 s, 22.8 s, size S). Saw: the badge pops at x=905 beside the grader box, a long saccade from the suite rows the viewer was watching. Change: place it at (540, 1720) below the Grader label. Effect: suite, grader and verdict read as one vertical glance.
6. **Repeat the lesson once more in sound at the end** (22.8–25.6 s, size S). Saw: the hold on FAIL is silent for 2.8 s. Change: during the hold, replay the two `miss` cues quietly in time with a slow pulse of the two red rows. Effect: the pairing of "what broke" and "what caught it" is reinforced without new visuals.
7. **Consider a second trial under v2 before the fix** (after 15.9 s, size L). Saw: one trial per harness version, which cannot show run-to-run variance. Change: a brief second v2 trial where only test_reset breaks, with the single check still passing. Effect: hints that the hidden damage varies by trial (the baseline's multi-trial point) at the cost of 5–6 s and a 33 s cut.

## Notes for the skill

- `store` gained a right-aligned `row{i}Status` / `row{i}StatusColor` column (PASS, FAIL, OPEN) in this variant's engine copy; it reads well at phone size and could join the engine.
- `box` gained `subSize` and `subMono` for the sublabel; 24 px sans was the smallest text in the cut.
- For looping scenes, exact first/last equality from the encoded MP4 needs constant QP, `mbtree=0` and a forced final keyframe; CRF alone cannot give it. The local `render.mjs` does this and also writes temp files under `scratch/` and caps ffmpeg at two threads.

## Honest limitations

- The scenario is illustrative. A harness change is shown breaking two unrelated tests; that is one plausible regression, not a claim about how any particular model, prompt or harness behaves, and the cut does not show how often it happens.
- The resolution regrades the end state of trial 2. Real suites rerun the task from a clean environment, usually across several trials; the cut shows one trial per harness version.
- Audio was analysed, not heard.
- The three-test suite stands in for any end-state assertion set. The same lesson applies to tickets, database rows or calendar events, which the video does not show.


## Comparative revision — 2026-10-19

Edited by gpt-6-astra comparative review; original model attribution remains anthropic/claude-fable-5-1. Improved phone-size test/predicate legibility, labelled grader requirements, and clarified the behavior-changing task. The revised MP4 and poster passed encoded inspection, full decoding, exact first/last equality, H.264 1080×1920 30fps yuv420p + AAC, and fast-start checks. Encoded peak is −3.2 dBFS. Audio was analysed, not heard. Full comparative evidence and remaining teaching limits: ../../../reviews/comparisons/agent-evals/after.md. The original review above describes the previous render; current verification is in ../../../reviews/comparisons/agent-evals/verification.json.
