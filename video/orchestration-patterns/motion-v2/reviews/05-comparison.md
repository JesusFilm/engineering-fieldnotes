# Revise against criteria — encoded comparison

**Decision: pass.** Prefer the local candidate for showing the actual missing field, targeted revision, fresh evaluation and explicit stopped state. No reproducible objective blocker was found. No media was edited or published.

## Scope and inspection

Grounding: item 5 of `video/orchestration-patterns/sequence/lessons.json`. A worker submits a draft, receives a specific missing-requirement finding, revises, is checked again, and stops after one revision when the example meets its criterion. Evaluation remains fallible; iteration needs limits.

Earlier planning context is acknowledged. No author source, plan reread or self-review was consulted. Viewed individual native-width 350×622 images: candidate periodic samples 001–006; baseline 001, 003, 005. Exact candidate frames inspected at 6, 10, 12, 15, 18, 20, 22, 24, 26 and 30 seconds; baseline at 8, 16 and 22 seconds. Candidate 26 seconds was also inspected at full encoded resolution. Periodic filenames are indices, not asserted exact timestamps.

Periodic frames were extracted with FFmpeg scaling to PNG. Alternate frames were selected by exact frame index after decoding from the beginning, saved at full resolution, then resized with Pillow Lanczos to JPEG. No alleged clipping or missing-text fault was established from these checks; partial text during a reveal is distinguished from the settled labels. Evidence remains in `scratch/05/`. This is sampled frame/transition inspection, not continuous playback or an every-frame visual audit.

## Comparison

| Dimension | Candidate | Public baseline |
|---|---|---|
| Causal clarity | Criteria map to visible draft fields; Missing rollback step directs the revision; v2 stays pending until rechecked. | Worker/evaluator/controller topology is clear, but the changed artifact is abstract and captions carry much of the causal explanation. |
| Accuracy | Clears old criteria marks for v2, evaluates both change and rollback fields, then stops with Revisions 1 / 1. No deploy or release approval appears. | Correct missing → revision → present → stop sequence; less explicit about fresh verdict state and budget before the ending. |
| Pace | 33.5 seconds accommodates distinct diagnosis, revision and recheck phases plus a readable final hold. Being below 35 seconds is not itself a fault. | 28 seconds provides broad phases with less content to inspect. |
| Legibility | Draft version, specific feedback, rollback text, criteria and controller status are readable at native 350px. No paragraph captions. | Main node labels and two-line captions are readable. |
| Meaningful variety | Field inspection, feedback targeting, role changes, version transition, criterion marks and controller stop each encode a distinct event. | Repeated boxes, packets and progress bar provide a simpler but less concrete representation. |

## Timestamped observations

- Opening sample: Draft v1 has Change: Add timeout and an empty rollback field; evaluator is active and controller is checking with 0 / 1 revisions.
- 6 seconds: change has been marked present while rollback is being inspected. 10 seconds: rollback is marked missing and feedback reads Missing rollback step, with a route targeting the empty field.
- 12 seconds: worker role and revise state appear. 15 seconds: Draft v2, cleared criterion marks, Recheck pending and Revisions 1 / 1 are visible. No inherited success is assigned to v2.
- 18 seconds: Restore prior config is present; evaluator and recheck state are active, with criteria still unevaluated. 20 seconds revisits the change field; 22 seconds inspects the new rollback text while feedback remains pending.
- 24 seconds: both criteria are met and evaluator feedback confirms Criteria met. 26 seconds: controller is STOPPED; activity role badge is gone. 30 seconds retains this settled state for reading. Final periodic sample shows the finite title-only ending.
- Baseline 8 seconds sends ADD ROLLBACK from a missing finding; 16 seconds shows revision/recheck activity; 22 seconds sends CRITERION MET, and the final periodic sample says stop: 1 revision. It teaches the same sequence but never displays the concrete revised draft.

## Accuracy limits and optional refinement

The film demonstrates simple presence criteria, not proof that Restore prior config will work operationally. The criteria are reported by the evaluator; no test execution or universal evaluator reliability is shown. Budget exhaustion and uncertain grading are not separately demonstrated, although the one-revision allowance is visible and the successful example stops after rechecking. Those limits do not require extra scenarios in this focused lesson.

Optional: label the criteria as presence checks to make the narrow scope of Criteria met explicit. Existing field highlighting and the absence of release approval already support that reading; this is clarification, not a blocker. No repair is required.

## Technical verification and audio limit

Both complete audio/video decodes exited successfully. Candidate: 1080×1920, 30 fps, 1005 frames, 33.5 seconds. Baseline: 1080×1920, 20 fps, 560 frames, 28 seconds. Both place moov before mdat.

Audio signal measurements: candidate mean −33.7 dB, maximum −6.9 dB; baseline mean −39.5 dB, maximum −10.3 dB. These indicate signal and headroom. **Audio was analyzed, not actually heard.** Actor-specific sound, subjective balance and synchronization are not listening-verified.

## Hash binding

- Candidate before: `af67731c73037a42973b465ec3e2d7ff4c6ce489a5cceb0ebdef14584eb8d5ee`
- Candidate after: `af67731c73037a42973b465ec3e2d7ff4c6ce489a5cceb0ebdef14584eb8d5ee`
- Baseline before: `7584dc2574b777f69c16edfa71dc5a814adae80f92ab3a4d5eb587b558866bd5`
- Baseline after: `7584dc2574b777f69c16edfa71dc5a814adae80f92ab3a4d5eb587b558866bd5`

Both hashes remained unchanged. The decision applies only to the candidate hash above. Any repaired or replacement encode requires renewed actual encoded inspection and a decision bound to its new full hash; replacing the hash alone is insufficient.
