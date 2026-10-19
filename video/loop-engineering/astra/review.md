> Historical author review of the original encode. The current cut includes separately attributed comparative corrections. See `../../../reviews/comparisons/loop-engineering/after.md` and `variant.json` for current verification and transcript.

# Evidence first — Astra review

Reviewer/author: **gpt-6-astra**, high reasoning. Review date: **2026-10-19**. Self-review of encoded media; no independent reviewer or comparative ranking is claimed.

## Fixed before handover

1. **State labels too close to node names** (00:03.9, 00:11.9, 00:18.8; preflight 1). The first rendered stills had only 40px between text centres. Increased separation to 64px and state type to 44px. Re-rendered and inspected the five preflight stills before encoding; the names and results now separate clearly at 350px width.
2. **Stopped task identity became too faint** (00:18.6–00:25.5; preflight 1). The initial 35% agent opacity weakened the important unchanged `patch 0` evidence. Raised it to 55%; the inactive agent remains visibly distinct while its task and patch count are readable.
3. **Loop boundary could imply an unexplained reset** (00:00 and 00:25.5–00:28; production setup). Added an optional full-frame fade to the local engine, opening and ending on the same blank frame. Encoded YUV frame hashes match exactly. The fade closes the example; it does not claim task B recovered.
4. **Renderer constraints** (whole output). The copied renderer's original defaults used unrestricted threads and system temporary storage. Local encoding/filter calls are capped at two threads, compression meets the size target, and both render intermediates and browser profiles are confined to this variant's ignored scratch directory. The installed skill is untouched.

## Improvement pass — applied under existing authorization

Ranked by teaching impact. These are design improvements applied directly, not pending approval requests.

1. **Separate evidence failure from assertion failure** (00:14.2–00:18.6, M). A simple repeated-attempt example would not teach whether another edit is justified. Introduced a separate task B, retained its patch count at zero, and physically closed the feedback path with a red barrier. The different low crash/thump cues distinguish missing validation from the earlier amber test failure.
2. **Show a normal repair before the blocker** (00:01–00:11.8, M). Gave the feedback packet a visible return route, changed patch 0 to patch 1 only on receipt, then moved a passing result downward to the engineer. This establishes what changes when evidence is valid before showing the stop case.
3. **Resolve the blocked run with a useful handoff** (00:20.2–00:25.5, S). Sent a blue evidence envelope to the engineer while leaving the return path blocked. Held the received state and made STOPPED persistent. The ending communicates that stopping edits can still produce actionable work.
4. **Keep passing tests separate from release authority** (00:10.4–00:14.1, S). Routed success to a human review node and a distinct store sound instead of a deployment/success celebration. The guide and transcript explicitly retain human acceptance responsibility.

## Encoded inspection and verification

- Reviewed the 1-second contact sheet, five separate 350px beat images at 3.9, 5.8, 11.9, 18.8, and 22.6 seconds, full-resolution return-packet/disruption/resolution frames at 5.1, 16.9, and 22.6 seconds, and the exact first/last frames. Pre-encode full-size stills were also inspected. Labels remain inside nodes, packets clear text, and no obsolete task A state survives the task B reset at 14.2s.
- The gate retains its last observed result while a new test is running; it changes only when that new result arrives. At 9.0–10.4s the green runner and amber gate intentionally show this transmission interval, not contradictory results for the same observation.
- State-change pacing, return motion, and the full sequence were checked from the contact sheet plus scheduled events. The final 22.5–25.5s hold is deliberate. This review did not include real-time human playback.
- Final stream: **28.000 seconds, 840 frames, 1080×1920, 30fps, H.264/yuv420p, AAC stereo, faststart**. File size: **813,085 bytes**. Full audio/video decode with `-xerror` succeeds.
- First and last decoded-frame MD5: **eb31442608984c1aa5939de6decc4443**. Exact equality is tested, not inferred from the fade.
- Decoded audio peak: **−4.026 dBFS** (limit ≤−0.5). The inspected spectrogram shows the disruption as the broadest/loudest event at 16.8s. All 25 cue windows contain signal. Decoded/reference audio correlation: **0.987226**, best offset **0 samples / 0ms**. Every meaningful state transition or packet send has a cue; fade and grouped task reset also have cues.
- Full quantitative evidence and media SHA-256 are in `verification.json`; cues and descriptions are in `timeline.json`. Probe, full frame hashes, levels, spectrogram, and extracted images are in `scratch/` and reproducible with `verify.py`.

## Honest limitations and teaching boundary

- **Audio was not physically heard.** Signal peaks, cue alignment, and spectrogram were analyzed; subjective timbre, device audibility, and listener comfort remain unassessed.
- This is an illustrative scenario, not a demonstrated model repair or benchmark. The 12 tests, one successful patch, and timing do not promise agent performance or complete coverage.
- The result gate represents executable application policy. A persistent prompt alone does not enforce permissions, stopping, or edit scope. The film does not implement that harness.
- Immediate handoff for no tests is this example's repair-only scope. A separately authorized diagnostic loop could investigate test discovery; there is no universal rule that a human must handle every tooling failure.
- The guide covers budgets, timeouts, current-patch evidence, and broader review; this short cut isolates classification before continuation. It does not demonstrate all those controls.
- No baseline encoded media or other model's scenes were inspected. The narrative was independently conceived; comparison and default recommendation remain with the coordinator. No shared manifest, build, UI, or Git operation was changed or invoked.
- No remaining objective media defects were found in the checks performed. No further motion changes are proposed without comparative evidence; the meaningful weaknesses identified in this pass were fixed.
