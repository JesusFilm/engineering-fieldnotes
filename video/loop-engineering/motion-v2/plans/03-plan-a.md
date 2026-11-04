# Stop after verified success — lesson 03

## Focus and grounding

Teach one mechanism: a fresh passing result for the repaired code satisfies the configured success rule; the controller ends the edit loop and hands the unchanged code and its evidence to review. Passing tests do not authorize more edits or establish universal correctness.

Grounding: item 3 of `video/loop-engineering/sequence/lessons.json`; `content/concepts/loop-engineering.json`, especially current-patch evidence, unchanged selection, and passing-suite-to-review routing. The topic records primary references for feedback/stopping and pytest reporting, retrieved 2026-10-19. This plan uses that supplied grounding; it does not claim a fresh source audit. Repository editorial guidance and the architecture-flow-video style/review references govern eventual validation.

Begin with repaired Code B, the same twelve selected discount tests, and a pending fresh run. End with the controller stopped and a review handoff containing B and its test result. Exclude missing tests, failures, budgets, no-progress thresholds, approval mechanics, merges, deployment, and later lessons. Do not replay the repair. Approximately 43 seconds across five beats; timing follows comprehension rather than a fixed runtime.

## Visual grammar: one run-detail view that becomes a review handoff

Use a single software run-detail surface. A large execution tally sits inside a persistent scope header identifying `Code B` and `Discount · 12`. Below it, a controller status strip owns an enabled/disabled edit control. A vertical activity rail ends at the stop decision. Finally the same result surface changes from live run view into a review handoff, keeping code identity and result visibly intact.

This differs from the earlier test matrix and generic actor-box flows: execution is an incrementing tally; the success decision closes a software action control; the result becomes a reviewable record. There are no moving envelopes, locks, doors, conveyor belts, or separate “agent → runner → controller” boxes. The edit control is illustrative software UI, not a clickable request to the viewer.

### Stage and coordinates

1080×1920, 30fps. Bounds `(x, y, width, height)`; text anchors top-left. Background `#050506`; foreground `#E6E8EC`; secondary `#8B9099`; amber `#F5A524` for activity; teal `#3FB68B` for satisfied conditions. Do not use teal for review approval. Every state has a word or distinct mark as well as colour.

| Element | Coordinates | Appearance / state |
| --- | --- | --- |
| Title | (90, 240, 900, 180) | Two lines `Verified success` / `Stop editing`, 82px bold. |
| Run surface | (110, 505, 850, 785) | One quiet outline; header `Test run`, later `For review`, at (150, 540), 66px. |
| Code identity | (150, 640, 280, 85) | `Code B`, 66px, fixed throughout. |
| Selection identity | (150, 745, 750, 85) | `Discount · 12`, 66px. Beneath at (150, 835), `Same selection`, 60px. |
| Execution tally | (150, 945, 750, 150) | `0 / 12` up to `12 / 12`, 112px. Label `Executed` above at y=890, 60px. No code identity or selection change during execution. |
| Result | (150, 1130, 750, 95) | `Running` → `12 passed`; 74px. A 60px check at (850, 1170) appears only at completion. |
| Activity rail | x=75, y=600–1590 | Thin vertical line outside the surface, three event dots at y=600/1170/1530. It marks run start, result, stop. No tiny labels; active dot grows to 20px radius. |
| Controller strip | (110, 1340, 850, 300) | Header `Controller`, 62px at (150, 1370). State at (150, 1460), 66px: `Waiting` → `Rule met` → `Stopped`. |
| Edit control | (585, 1450, 335, 95) | Two-line label if needed: `Next edit`, 60px. Neutral enabled outline initially; struck-through edit glyph and `Disabled` label after stop. Keep control separate from controller state text. |
| Review status | (150, 1665, 750, 90) | Absent until handoff; then `Review pending`, 66px, white/amber rather than success green. |

During rule evaluation, replace the execution-tally area (y=890–1100) with two short rows: `Current code ✓` at (150, 900), `Selected tests ✓` at (150, 1000), 62px. These are controller checks on the observation, not new tests. Keep `12 passed` visible below. After stopping, those rows return to `12 / 12` and `Executed` as the handoff record settles. Do not place a giant “all correct” badge anywhere.

At 350px width, 60px source text is approximately 19px, 82px is 27px, and the tally is 36px. Measure actual glyph widths. If controller state/control text clashes, stack the edit control below the state inside a taller strip, moving review status down but keeping its bottom before y=1800; do not shrink text. Retain at least 32px source spacing around labels and halos.

## Beat sheet: time, motion, state, sound

Sound identities: runner C5≈523Hz; controller E5≈659Hz; review destination G5≈784Hz. Synthesized short cues only, panned to their visible event. No narration, music, or continuous ticking. Quiet sends/acks sit below result/stop cues. A stop on success sounds resolved, not like a crash.

| Beat / time | Motion | State / meaningful hold | Sound |
| --- | --- | --- | --- |
| **1. Bind the rerun · 0–7s** | 0–1: reveal run surface, controller and fixed scope. 1–2: pulse Code B once. 3–4: pulse `Discount · 12` and `Same selection` together. At 4: the rail's first dot lights and `Running` appears. | `0 / 12` initially; controller `Waiting`; edit control neutral, never being clicked. Hold scope 4–7 before the execution tally starts. The next-edit option is not an active edit while validation runs. | Soft `ack` C5 at 1 for code identity, another at 3 for selection; `work` C5 at 4 for run start. |
| **2. Observe actual execution · 7–16s** | 7–11.8: tally advances through all twelve integers, one every 0.4s. No scrolling blur or replacement of unreadably small digits. At 12: tally settles at `12 / 12`. At 13: `Running` becomes `12 passed`, check appears and the rail's result dot lights. | Completion is fresh for the visible B and same selection. Controller remains `Waiting`, edit control unchanged. Hold 13–16 so observation is distinct from the later decision. | Quiet `work` C5 at 7, 8.6 and 10.2 only; `arrive` C5 at 12; short `chime` C5→E5 at 13 on passing observation. No sound on every integer. |
| **3. Apply the success rule · 16–25s** | 16–17: result outline briefly brightens; a slim focus line extends from result bottom (540, 1250) to controller top (540, 1340), then fades. At 18: controller header pulses. 18–19: tally area crossfades to `Current code ✓`. At 20: `Selected tests ✓` appears beneath it. At 22: controller state becomes `Rule met`. | Source identities and `12 passed` remain visible. Checks summarize matching the result to B and the agreed tests; the visible passing count supplies the success outcome. Hold 22–25. No edit starts while the rule is evaluated. | Quiet `send` C6 at 16; `arrive` E5 at 18; `ack` E5 at 19 and 20; soft `ack` E6 at 22. |
| **4. Stop further edits · 25–33s** | 25–26: controller changes `Rule met`→`Stopped`. In the same transition, edit control loses its active outline, shows a slash over its edit glyph and label `Disabled`. The activity rail ends at a solid stop dot at y=1530; no trail extends below it. 27–28: a single white focus outline passes around the stopped state and disabled control, then rests. | Code B remains unchanged; no Code C, speculative edit or new action packet. Retain readable disabled text; do not dim it below legibility. Hold 28–33 deliberately so “no more editing” is visible, not merely inferred from a fade. | Short low `ack` E4 at 25 on controller stop, then quiet resolved `deliver` E5 at 26 on disabling edits. No rejection buzz or crash cue. |
| **5. Hand over the evidence · 33–43s** | 33–34: run header becomes `For review`. 34–35: rule-check rows crossfade back to `Executed` / `12 / 12`. Keep Code B, the selection and `12 passed` in their original positions. At 36: `Review pending` appears below the stopped controller. The run surface gains a settled white outline; no physical document flies off-screen. | The same evidence is now a review handoff, not another edit cycle. Controller remains `Stopped`; control remains `Disabled`. Hold the whole record 36–42, then fade all elements 42–43. Finite ending; no reset into another run. | `store` G5 at 34 on record handoff; quiet `arrive` G5 at 36 on review-pending status. Final hold and fade silent. No merge/approval fanfare. |

Long holds are intentional where the viewer must compare identities and see that a stopped loop stays stopped. If testing shows too much slack, shorten only the final settled hold; preserve observation-before-decision and decision-before-handoff separation.

## Accuracy and scope limits

- The example's success rule is the agreed twelve tests passing on the current repaired code with the intended selection actually executed. A bare green check or process exit code is not presented as sufficient evidence.
- `Same selection` denotes retained test identities, not merely an equal count. The compact display summarizes that identity check; it does not teach how test selection is stored. Twelve executed tests and twelve passes are illustrative, not a coverage guarantee.
- The check rows do not certify all possible behavior. `Selected tests` and `Review pending` keep the visible claim bounded. Never use `Correct`, `Safe to merge`, `All verified`, or a universal coverage halo.
- The controller stops the edit loop; the model does not grant itself a stop or review approval. An enabled-looking next-edit option before the decision denotes an available continuation route, not authorization to edit concurrently with a running test. No action leaves it.
- Transition from B's run to review preserves B. Unrequested edits would require new evidence, but this lesson does not simulate an extra edit or a counterfactual failure.
- Passing is a reason to stop and seek review, not an automatic merge. `Review pending` does not mean a human has approved, read, or received a real notification. Handoff is a conceptual local record, not an external message.
- The handoff shows a representative evidence summary: code identity, selected suite, executed count and result. Real workflows retain exact command, working directory, full output and patch identity as described by the topic; do not claim this compact UI is a complete audit schema.
- This is an illustrative trace with invented timing. It does not promise determinism, convergence, exhaustive correctness, or optimal execution speed. Failure, timeout, absent-test and budget routes remain out of scope.

## Acceptance for later production

1. **Native phone frames:** inspect individual encoded 350px-wide frames at 5, 12, 14, 19, 23, 26.5, 30, 37 and 41 seconds, plus full-size frames and before/middle/after samples of each transition. A contact sheet alone is insufficient. All code/selection/result/control labels must be readable without zoom.
2. **Causal ordering:** verify the tally completes before the passing report, the passing report precedes rule satisfaction, rule satisfaction precedes stop, and stop precedes handoff. No “Stopped” label appears while runner work is unfinished. No edit control reactivates after stopping.
3. **Identity and evidence:** B and the same selection persist from execution through review. Count reaches twelve; no skipped or unexecuted test is represented as passed. Rule-check rows cannot be mistaken for extra tests. The handoff preserves the same result rather than manufacturing a fresh success.
4. **Beginner understanding:** after one muted watch, a viewer can say what ran, why the controller stopped, and whether the patch has been approved. Expected answer: the selected tests passed on B; the configured rule was met; review is still pending. If “everything is correct” is inferred, strengthen bounded labels and state contrast rather than adding prose captions.
5. **Visual integrity:** check the controller's two-column spacing, title line breaks, result halo and state crossfades. Reproduce any apparent text loss/clipping with an alternate extraction and independent resize before flagging an encoded fault. Do not infer defects from one display artifact.
6. **Motion and sound:** one focus change at a time; no continuous decorative activity after stop. Listen to the eventual encode for runner/controller/review cue distinction and synchronization. Analyze peaks separately, with maximum at or below −0.5dB. State explicitly whether sound was heard or only analyzed.
7. **Encoded checks:** decode the complete MP4, check dimensions, duration, audio stream and progressive metadata. Bind review to the actual SHA-256; a changed encode requires renewed inspection. This finite ending need not match its first frame.
8. **Local production constraints:** when implemented, use repository-pinned Puppeteer dependencies and a cut-local engine copy; keep drawing extensions local. No public/site/shared-skill changes, shared manifest edits, Git commits, deployment, or other lesson work. Only the assigned plan is written during this planning task.

Deliverable: `video/loop-engineering/motion-v2/plans/03-plan-a.md`. No rendering or authoring source is produced here.
