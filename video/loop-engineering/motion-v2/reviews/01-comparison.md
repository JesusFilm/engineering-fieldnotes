# Lesson 01 encoded comparison — Act, observe, decide

**Decision: pass. Prefer motion-v2 for this lesson, subject to human editorial promotion. No reproducible objective blockers.** The new cut makes actual evidence, the controller's decision, and the resulting next action visible. The published cut states those relationships more explicitly in captions but depicts them more abstractly. Optional refinements below do not require a repair.

## Review basis and independence

Compared `video/loop-engineering/motion-v2/01/video.mp4` (candidate) with `public/lessons/loop-engineering/01.mp4` (baseline), against item 1 of `video/loop-engineering/sequence/lessons.json`. The required mechanism is action → observation → controller decision → another permitted action. The controller owns continuation and stopping rules.

Earlier planning context was already present in this conversation; this is not a context-blind review. No authoring source, self-review, other plans, ledger, or provenance material was read for this comparison. The actual encode, rather than the earlier plan's proposed ending or runtime, is the object reviewed. The lesson's 28-second metadata is the baseline duration, not a requirement that every alternative have the same length.

## Hash binding

SHA-256 was calculated before extraction and again after inspection. Both files were unchanged.

| File | Before SHA-256 | After SHA-256 |
| --- | --- | --- |
| Candidate | `5d048e04353271c92e31981d83a4e228b072cbf9386e28241fc8cc44c1bf3ca1` | `5d048e04353271c92e31981d83a4e228b072cbf9386e28241fc8cc44c1bf3ca1` |
| Baseline | `6d233bc79980798a9f67fdcdee3316e93bfc03fcf60561af4a4ee2aa53194a0f` | `6d233bc79980798a9f67fdcdee3316e93bfc03fcf60561af4a4ee2aa53194a0f` |

`01-decision.json` applies only to the candidate hash above. Any changed encode requires new actual encoded inspection and a renewed decision; replacing the stored hash is insufficient.

## Inspection performed

Extracted individual 350×622 PNGs directly from both MP4s using FFmpeg, sampled at one frame per second. Viewed individual images at their native 350px width, not just a contact sheet. Viewed candidate samples throughout its beats and baseline samples through all four teaching stages. Added exact-time transition/ending probes:

- Candidate: 5.5, 9, 14, 16.5, 18, 20, 24, 28, 29, 30, 32, 33, 37.8, 38.3, 38.9 seconds.
- Baseline: 6.8, 7, 8.5, 13.8, 14, 20.8, 21, 23, 24, 27.95 seconds.

Inspected full-resolution frame-index extractions at candidate 16.5, 28, 33 seconds and baseline 14, 23 seconds. Independently resized these full-size images with Pillow Lanczos to 350×622 and inspected them individually. This is sampled encoded-frame/transition analysis, not a claim of uninterrupted real-time playback or exhaustive visual inspection of every frame.

Scratch evidence is under `scratch/01/`: `candidate/` and `baseline/` contain numbered samples, exact-time `t-*.png` probes, `full-*.png` frame-index extractions, `alternate-*.png` independent resizes, and audio-analysis logs. `inspection.json` records decode results, container atoms, and before/after hashes.

### Display artifact reproduction check

Some initial displayed images appeared to lose portions of static labels or whole text regions, including candidate 16.5 seconds and baseline 14/23 seconds. Those apparent omissions were **not reproduced** by full-size frame-index extraction and independent 350px resizing: intact agent text, phase labels, and baseline title/captions were visible. Exclude those apparent omissions from findings; they are not evidence of a defective encode. No clipping or disappearing-text blocker is asserted.

## Comparison against the lesson

Scores are editorial judgments on a 1–5 scale (5 strongest), not factual verification or automated test results.

| Criterion | Candidate | Baseline | Encoded evidence and implication |
| --- | --- | --- | --- |
| Causal clarity | 4 | 3 | Candidate 3–9s routes the proposed test through the controller into tool execution; 9–14s produces and returns a concrete failed assertion; 16–20s checks the condition and opens continuation; 22–30s supplies failure details to the agent and executes its patch. Baseline 0–14s moves abstract ACTION/RESULT chips; 14–21s highlights “evaluate result”; 21–23s sends CONTINUE back. Captions carry much of the baseline's causal explanation. |
| Accuracy within lesson scope | 4 | 4 | Candidate distinguishes “evidence in” with a check from “tests pass” with a cross at 17–20s. Usable failure can permit another action. At 29–30s old tool output and controller checks clear for the new action. At 32–37s “patch applied / tests not rerun” correctly avoids claiming verified success. Baseline makes no unsupported concrete outcome claim, but shows no actual evidence or stopping condition beyond its explanatory caption. |
| Pace | 4 | 3 | Candidate separates output arrival, condition evaluation, continuation, and the next proposal into readable stages. Its roughly 39s duration earns most of the added time through a concrete second action. The 33–37.5s final settled state could be shorter. Baseline is 28s but spends much of 14–21s on a nearly static evaluation panel, then holds the ending after its return token. |
| Native 350px legibility | 4 | 4 | Candidate phase/title and active outputs are clear; secondary panel labels and conditions are smaller, approximately 12–14px visually, but readable. Baseline's sparse labels and two-line captions are readable at this width. The candidate reduces paragraph reading but does not make every useful label large. No reproduced overlap or clipping. |
| Meaningful visual variety | 3 | 2 | Candidate adds changing admission-slot state, tool progress, actual assertion output, separate condition checks, result feedback, and a different patch command. These changes explain the mechanism. Its overall composition still consists of three stacked panels; it is not a radically different layout grammar. Baseline relies mainly on the same chip traveling between three generic boxes and caption replacement. |

### Transition and boundary findings

- **Proposal versus execution, 3–9s:** the candidate's proposal travels to the controller before the tool runs. The slot becomes waiting while tool work progresses. No sampled transition shows a new tool execution bypassing that control point.
- **Observation before decision, 9–20s:** test failure is visible before evidence receipt; the controller then distinguishes receipt from the unsatisfied passing condition. Continue activates before the next patch proposal. This is the candidate's strongest improvement over the baseline.
- **Next action, 22–32s:** failure information reaches the agent, the patch proposal follows, and the tool panel transitions from the test command/result to patch execution. Previous checks dim/reset, avoiding a claim that the old result validates the edit. Brief old/new transition states are not a stale-evidence fault.
- **Finite ending, 32–38.94s:** patch completion remains explicitly unverified. The stage fades around 37.8–38.3s, leaving title/phase labels at the end. This is an excerpt ending after a subsequent observation, not a depicted success/stop decision. The lesson requires an explicit decision point and permitted next action, both already shown; a second complete decision or a successful repair is not necessary to pass. No seamless-loop requirement is imposed.
- **Baseline boundaries, 7/14/21s:** captions change at the lesson's four stage boundaries. The tool/result/controller ordering is coherent, although the mechanics are mostly asserted in text. Baseline 23–28s holds the controller after the return token rather than showing a concrete next tool action.

## Limits and optional improvements

No objective blocker was reproduced. The candidate does not demonstrate a denied action, exhausted budget, or the stop branch actually activating. The visible stop alternative and passing-condition check make the decision point inspectable, but this is not comprehensive instruction in enforcement. Treat that as scope, not evidence that every failing test universally permits edits. Neither clip alone demonstrates the entire lesson takeaway about persistent prompting.

Optional improvements, in teaching-priority order:

1. **14–20s — phrase the condition as a question.** “tests pass?” would make the cross read immediately as a false condition. The existing check/cross sequence is understandable and does not constitute a factual contradiction.
2. **1–37s — enlarge secondary labels.** Increase role/condition labels and “tests not rerun” if space allows. Their current native-350 rendering is readable, but they could be more comfortable for a beginner on a phone.
3. **33–37.5s — tighten the final hold.** Remove roughly 1–2 seconds while retaining a deliberate read of the unverified-patch state. This is pacing polish, not a missing-state defect.
4. **Overall composition — strengthen distinct functional shapes.** The tool console and controller already behave differently; a future visual iteration could distinguish their silhouettes more strongly. Do not add actors or explanatory paragraphs merely to increase variety.

## Encoded technical checks and audio limitation

Both files decoded completely with FFmpeg to a null sink, exit code 0, without error output. Both are 1080×1920 H.264/yuv420p with stereo AAC at 44.1kHz. Candidate: 30fps, 1168 video frames, video duration 38.933333s, container duration 38.943991s. Baseline: 20fps, 560 frames, 28s. Both have `moov` before `mdat`, suitable for progressive MP4 delivery.

FFmpeg volume analysis: candidate mean −32.1dB, peak −7.1dB; baseline mean −42.6dB, peak −13.2dB. Neither measured sample peak clips. **Audio was analyzed, not actually heard.** These measurements do not establish perceived cue quality, event synchronization, or audibility on phone speakers. The comparative recommendation is grounded in encoded visual evidence; no listening approval is claimed.

Only this comparison, its decision JSON, and review scratch evidence were written. No media, other lesson, shared manifest, or promotion status was changed.
