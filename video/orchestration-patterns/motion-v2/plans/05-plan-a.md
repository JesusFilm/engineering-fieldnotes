# Revise against criteria

## Scope and grounding

One mechanism: evaluate a draft against an explicit requirement, return a specific missing item, revise that item, then evaluate the revised version before the controller stops. The visible example stops after one revision because its narrow criterion is met. A finite revision allowance remains visible throughout.

Grounding: `video/orchestration-patterns/sequence/lessons.json` item 5; the evaluator-loop definition and budget pitfall in `content/concepts/orchestration-patterns.json`. Repository AGENTS.md, editorial workflow and the architecture-flow-video skill/style/API/review references were read earlier in this conversation and apply here.

Primary pattern source: [Building effective agents — Evaluator-optimizer](https://www.anthropic.com/engineering/building-effective-agents#workflow-evaluator-optimizer), accessed 2026-10-20 in this session. It describes evaluation and revision against clear criteria. The concrete draft, one-revision limit and stopping presentation below are illustrative lesson choices, not a recommended universal budget or an assertion that grading is infallible.

Do not extend into parallel reviews, joins, snapshot invalidation, deployment or actual execution of a rollback command. No additional failure scenario: uncertainty and budget exhaustion are stated as accuracy limits, while the main film follows the lesson's successful recheck.

## Concrete example and visual grammar

An editable release-note form beside its criterion rail. The same artifact remains visible as Draft v1 becomes Draft v2. Feedback targets one empty field, the worker fills it, and a separate evaluator highlight revisits that field before the controller stops. The change is in the artifact, not a generic packet travelling among three boxes.

Criterion: `Rollback step present`. This is deliberately an inspectable presence requirement, not proof that rollback works. Initial draft contains `Change: Add timeout` and an empty `Rollback` field. Revision supplies `Restore prior config`. No executable shell command or implied safety guarantee.

1080×1920, 30fps, black background. Title in yellow; white useful labels; worker identity blue, evaluator amber, controller neutral white. Teal means only the named criterion is met. Never label the release approved or safe. Essential labels 48–54px, about 15.6–17.5px at native 350px; title 80px. No paragraph captions.

## Coordinates and persistent state

All bounds are top-left plus width×height; text positions are left baselines unless centered.

- Title center (540,290), 80px: `Revise against criteria`. Small subtitle center (540,380), 44px: `ONE MISSING REQUIREMENT`.
- Criterion rail (90,465), 900×160. Header (125,520), 46px `Evaluator criterion`; content (125,585), 54px `Rollback step present`. Right status mark centered (935,570): empty circle → missing cross → met tick. Status text appears in feedback area so it cannot collide with the criterion.
- Draft editor (90,700), 900×510. Header (125,765), 52px `Draft v1`, later `Draft v2`. Role badge (730,725), 220×60, 44px: `worker`, then `evaluator` during each inspection (widen leftward to 280px if required). The badge indicates current actor, not ownership transfer of files.
- Change field label (125,845), 46px `Change`; value (125,910), 54px `Add timeout`.
- Rollback field outline (115,955), 850×185. Label (140,1010), 46px `Rollback`; value baseline (140,1090), 52px, initially em dash then `Restore prior config`. Keep text within x=940. Targeted feedback outline stays outside the field border, never over text.
- Feedback strip (90,1270), 900×170. Header (125,1325), 46px `Evaluator feedback`; value (125,1390), 50px: first `Missing rollback step`, then `Recheck pending`, finally `Criterion met`.
- Controller strip (90,1500), 900×240. Header (125,1560), 48px `Controller`; budget line (125,1630), 48px `Revisions: 0 / 1`, then `1 / 1`; state right-aligned (950,1630), 48px `waiting`, `revise`, `recheck`, `STOPPED`. If the last state crowds the budget, place it at (125,1700), 56px for all states. Do not shrink either label.
- Feedback targeting route: from (90,1350) via (65,1350),(65,1050) to (115,1050). Animate an amber point following the route; the specific reason stays in its strip. No travelling sentence.
- Recheck route: criterion port (540,625) → (540,665) → (1015,665) → (1015,1050) → (965,1050). Amber inspection point travels outside the editor, landing on the revised field. Criterion text stays fixed.

The editor, criterion and controller stay in place. No simulated file deletion, physical repair metaphor or gratuitous camera motion. Clear the old missing mark to unknown when revision begins; never carry v1's evaluation verdict onto v2.

## Five beats: timing, state, motion and sound

Target 46 seconds, authored at speed 1. Local holds are intentional. Extend a hold if native-350 reading needs it; do not force the duration guideline.

| Time | Movement and state | Reading hold / causality | Actor sound |
|---|---|---|---|
| 0–8 | 0–1.5 reveal criterion, v1 draft and controller budget. Worker badge is visible. At 3, worker submits by switching badge to evaluator; the criterion outline brightens. 4–5.5 inspection point travels to the empty rollback field. | Hold 5.5–8. Show the exact criterion and absent content together. Controller remains waiting; revisions 0 / 1. | Worker `send` E6 at 3; evaluator `arrive` G5 at 5.5. |
| 8–17 | At 8, missing cross appears in criterion rail and empty field gets amber outline. At 9, feedback becomes Missing rollback step. 11–12.5 feedback point travels back to the field; controller switches to revise at 12.5. | Hold 12.5–17. Specific feedback directs one change; no vague low score or whole-draft rejection. | Evaluator `miss` G4 at 8; evaluator `send` G6 at 11; worker `arrive` E5 at 12.5. |
| 17–26 | At 17, badge becomes worker, title changes to Draft v2, prior verdict clears to unknown and feedback becomes Recheck pending. Count changes to 1 / 1 when this revision begins. 18–21 reveal Restore prior config within the same rollback field, in a short left-to-right text reveal. At 22, worker submits and controller becomes recheck. | Hold 22–26 with complete revised content and unknown grade. Do not flash success when typing finishes. The change field stays untouched. | Worker `work` E4 at 18 and 20 with text reveal; `send` E6 at 22. No per-character typing noise. |
| 26–35 | At 26, evaluator badge appears and inspection travels from the unchanged criterion to the revised field over 2 seconds. 28–30 outline the actual new text, hold; at 31, criterion mark becomes met and feedback becomes Criterion met. | Hold 31–35. Reinspection precedes the result; the controller has not started another revision. | Evaluator `arrive` G5 at 28; restrained evaluator `ack` G5 at 31. No triumphant release chime. |
| 35–46 | At 35, controller changes to STOPPED. Budget remains 1 / 1; field and met criterion remain visible. Fade inspection routes and remove any activity cursor by 36. | Hold 36–43 to connect met criterion, one revision and stopped loop. Fade all elements 43–46. Finite ending; no second revision, auto-restart, deploy or human-approval animation. | Controller `deliver` C5 at 35, short and neutral. Silence through final hold and fade. |

Sound identities: worker E, evaluator G, controller C. Pan gently toward the active endpoint; all three operate on the same central artifact. Sends quieter than arrivals; missing cue is a modest downward note, not a crash. One cue per meaningful event, with silence during reading holds. No music needed. The revision and recheck must remain understandable muted.

## Accuracy limits and stopping policy

- This criterion tests presence of a rollback step. It does not establish operational correctness, safety, completeness of the release note, or whether restoring a prior config is appropriate for a real service. Do not depict the instruction being executed.
- Evaluation is fallible feedback. A met badge belongs only to this narrow criterion. An uncertain grade must not silently become met in a real controller; it would require explicit handling outside this successful example.
- The controller owns the iteration budget. One revision is an illustrative limit. A real loop should stop on either a satisfied criterion or exhausted budget; exhaustion alone is not success. Here the criterion is explicitly rechecked before stopping, so the ending does not confuse those reasons.
- No stale verdict: v2 begins with unknown/recheck pending. The evaluator must inspect the changed field before any met state. The count increments exactly once and never resets during this run.
- Feedback stays specific and attributable. No magical revision occurs merely because a score changed, and no improving numerical score is invented.
- No later workflow is introduced. The video ends with stopped revision work, not a release or merge decision.

## Acceptance at native 350px and later encoded review

1. Inspect individual 350×622 encoded frames without zoom at 2, 6, 9.5, 14, 17.5, 22.5, 29, 32 and 39 seconds. Criterion, missing feedback, revised field, revision count and STOPPED must all be readable. Inspect the busiest frame at full resolution too; a contact sheet is insufficient.
2. Inspect before/mid/after transitions at 8, 17, 22, 28, 31 and 35 seconds. Text reveal must never leave long holds on partial words. Routes, badges, outlines and status labels must not overlap field text or the budget.
3. At 14 seconds the field is missing and controller requests revision. At 22.5 seconds the field is filled but grade is pending. At 32 seconds the evaluator has marked the criterion met. At 39 seconds the controller is stopped with exactly one revision. Any earlier met/approved state or continuing work after STOPPED is a defect.
4. A beginner should identify the criterion, missing item, targeted revision, recheck and stopping point after one muted viewing. No explanation paragraph is needed to bridge an unseen change.
5. Listen for actor-specific cues and state alignment; separately inspect signal and peaks below −0.5 dBFS. Do not claim listening from frame or waveform analysis. Later production must decode the whole MP4, inspect beat boundaries and validate audio stream and moov-before-mdat.
6. Compare the encoded candidate with the public lesson before reading source/self-review. Reproduce suspected visual faults via alternate extraction. Bind the actual review to full SHA-256 and renew it after any changed encode.

## Deliverable boundary

Write only `video/orchestration-patterns/motion-v2/plans/05-plan-a.md`. No rendering or other lesson work in this task. Later production uses repository-pinned Puppeteer and a local engine copy; any editable-field helper stays local and derives state deterministically from scene time. No public/site/shared-skill edits, Git commits or deployment.
