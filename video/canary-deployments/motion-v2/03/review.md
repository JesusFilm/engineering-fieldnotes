# Lesson 03 review: An average hides failure (render 3)

These notes record the author's review of the encoded `video.mp4`. They are not an independent comparison review. Audio was analysed by spectrogram and level measurement only, not listened to.

## Fixed before handover

- 25.0–26.2 s, render 1: the overall fraction began moving while the grid was still shrinking, and "0.4%" and "40 / 10,000" briefly overlapped the grid's right edge. They now start 0.5 s later. Checked on encoded frames 770–792 (every other frame) and decoded frames 753, 759, 768, 777, 789 and 804.
- 25.9 s, render 2: the "ALL REQUESTS" label crossed the shrinking grid's top edge. It now moves with the fraction.
- 25.2 s and 33.6 s, render 1: the compaction and the "40" handoff had motion without sound. Added `send` C5 and `deliver` A4.
- Stills pass: "= 100 requests" crowded the right edge, and several labels were smaller than 44 px. The legend moved, and labels were raised to 44–48 px (about 14–16 px at 350 px wide).
- Moving numbers drew a black pill behind themselves that would cover grid squares in transit. Outline pills now draw only when their border is visible.

## Suggested improvements

1. **The group square is hard to spot at 350 px before it is highlighted** (1.2–6.0 s, size S). Saw: square 97 is 21 px at phone width, and its orange ring arrives 1.6 s after the fill completes. Change: add a slower orange pulse on that square during the 4.6–6.0 s hold. Effect: the eye is already on the group when the chips arrive.
2. **The 0.4% sliver is tiny in the compact top row** (from 26.6 s, size S). Saw: in the final frame the red sliver is about 3 px tall at 350 px. Change: keep the orange ring brighter, or add a short red leader from the sliver to the top "40". Effect: the shared 40 is anchored to the grid as well as to the bracket.
3. **"quiet" could read as a label for the strip** (22.4 s, size S). Saw: the pill sits under "1% example alert". Change: link it to the tick with a short dim stem. Effect: it is clearly the alert's state.
4. **The final hold is 2.6 s, then the fade** (40.4–43.0 s, size S). A reviewer may want 0.5 s more before the fade. The current length avoids static padding.
5. **The 60 → teal step could feel late** (14.1 s, size S). Red lands first so the cell never looks like 100 successes followed by 40 new failures. Consider landing both within 0.3 s.

## Notes for the skill (not acted on)

- The engine has no general text node with fixed alignment and animatable position. This cut uses a local `caption`, `grid` with per-cell red share and ✓/× marks, and outline-only pills.

