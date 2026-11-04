# Check actual behavior — lesson 02

## Scope and teaching decision

One mechanism: execute changed code with a known input, compare its observed outcome with a predefined expectation, and retain the result for grading. An agent's completion message supplies no observed behavior. The one empty-password case passes; other required cases remain untested.

Grounding: `video/agent-evals/sequence/lessons.json` item 2 and `content/concepts/agent-evals.json` (intro, judgment, walkthrough step 3). Primary-source support: [Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents), consulted 2026-10-20, distinguishes the recorded interaction from the actual outcome and defines graders against success criteria. The example below is illustrative, not a benchmark result. The sequence's 28 seconds is not a constraint: propose 44 seconds to separate input, execution, observation, comparison and recording.

Exclude bad-versus-good patch comparisons, execution of valid-password regression cases, suites, repeated trials, configuration comparisons, subjective grading and deployment. A small pending-cases indicator is only the boundary of this lesson.

## Visual grammar and coordinates

1080×1920 at 30fps, black background, yellow title, white useful text, amber pending/running, teal only for a matching check. Use one expanded software test-runner panel, not three connected boxes. The visible test case changes state in place; a narrow run gutter and a retained result row establish execution and evidence ownership.

Coordinates below are top-left bounds unless named as a point. Safe content bounds x=80–1000, y=450–1790. No camera moves or zooms.

| Element | Bounds / anchor | Content and role |
|---|---|---|
| Title | center (540,295), two lines if needed | `Check actual` / `behavior`, 76px; subtitle `RUN • OBSERVE • COMPARE`, 38px at y=405 |
| Completion-message strip | (90,465), 900×140 | `Agent says` at (120,510), `Bug fixed` at (120,570); neutral outline, never a pass icon |
| Test-runner panel | (90,660), 900×905 | Header `TEST RUNNER`, patch chip `P1` at (850,720); fixed frame |
| Case header | (125,785), 830×90 | `Empty password` left; status `not run` → `running` → `observed` → `pass` right |
| Input line | baseline (180,970) | `password = ""`, 56px monospace; nearby `empty` label only if quotes prove unclear at 350px |
| Execution line | baseline (180,1090) | `login()`; right status `idle` → `running` → `returned`, 48px |
| Expectation row | baseline y=1225 | `Expected` at x=180; `rejected` at x=590 |
| Observation row | baseline y=1340 | `Observed` at x=180; `—` → `rejected` at x=590 |
| Local comparison mark | center (880,1400) | Small equality/check mark appears only after both values are visible; no full-panel success wash |
| Saved-result row | (125,1450), 830×85 | After comparison: `P1 · empty · PASS`, 46px; initially empty, no misleading placeholder pass |
| Scope strip | (90,1630), 900×135 | `Other required cases` / `not run`, 48px and 52px; neutral and readable throughout final hold |

Types: main labels 50–56px (16–18px at width350); secondary labels at least 42px (~14px). Fit by shortening labels, never squeezing glyphs. Use #E6E8EC for content, #8B9099 for secondary labels, #F5A524 for active state, #3FB68B for the single passed case. Do not use red for a correctly rejected login: rejection is the expected application outcome, not a failed test.

Motion stays inside the test panel. A 7px-wide execution cursor runs in the left gutter x=145, from y=955 to y=1080, then to y=1325; corresponding rows brighten as it reaches them. These are execution-order indicators, not data wires. Result value reveals at (590,1340) only on return. At comparison, short brackets beside the two result values extend from x=830 to x=860 and connect vertically y=1205–1320. No moving chip crosses a word. On save, a copy of the completed check moves from (865,1400) to (865,1493) over 0.7s; original observation remains visible.

## Five beats: time, motion, state and sound

All times are playback seconds at speed1. Holds are intentional reading time; no idle spinner during holds.

| Beat | Timed motion and state | Sound |
|---|---|---|
| 1. Claim without evidence, 0–7s | 0–0.8: message strip appears. 1.4–2.1: test panel and empty-password header reveal, status `not run`. 2.8: input and expected rejection reveal together; observation is `—`. Hold 3.4–7.0. Message stays visually separate; it does not fill the observation or change the grade. | 0.8 `arrive` C5 for the message; 2.8 quiet `ack` G5 for the test definition. No success chime. |
| 2. Execute the changed code, 7–16s | 7.0–7.6: message strip recedes to secondary contrast; panel's P1 chip becomes active, linking this run to the patch. 8.0: case status `running`. 8.8–9.8: cursor selects the empty input. 10.8–11.8: cursor moves to `login()`; function becomes `running`. Hold 12–16 with input, expectation and active execution retained. Observed remains blank. | 7.6 `arrive` E5 at patch chip; 8.8 quiet `send` E6; 11.8 `work` E4. No continuous work ticks. |
| 3. Observe a real result, 16–24s | 16.0–17.0: execution cursor advances to the observation row. At 17.0, function changes to `returned`, `Observed —` becomes `Observed rejected`, and case status becomes `observed`. No pass badge yet. Hold 17.5–24 so viewers can read the result and expectation separately. | 17.0 `deliver` E5, tied to returned behavior; deliberately distinct from grader success. |
| 4. Compare against the criterion, 24–33s | 24.0–24.8: expected value gets an amber underline. 25.7–26.5: observed value gets its underline. 27.4–28.2: comparison brackets connect the two matching values. 29.0: local check appears and case status changes to `pass`. Hold 29.5–33. Only this case receives teal. | 24.8 and 26.5 quiet `ack` G5; 29.0 restrained `chime` G5. Comparison success is the grader's sound, not the execution sound. |
| 5. Retain bounded evidence, 33–44s | 33.0–33.7: completed-check copy moves down into result row; at 33.7 row reads `P1 · empty · PASS`. 35.0–35.6: scope strip appears, `Other required cases / not run`. Brief neutral outline emphasis, no new execution. Hold 36–44 on the actual input, expected and observed rejection, recorded pass and pending cases. Finite ending with the evidence still visible. | 33.7 `store` G5 for recorded evidence; 35.6 soft `ack` G4 for pending scope. No celebratory final flourish. |

Actor map: message C5, code execution E5/E4, check/record G5. Pan to the relevant x position, sends quieter than returns. Leave reading holds silent. No narration, music bed, keyboard chatter or error buzz for correct rejection. Sound reinforces state, never supplies information absent from the visuals.

## Accuracy boundaries

- `Bug fixed` is a claim attributed to the agent. It never serves as the observed value or earns a grade.
- P1 is the changed-code identity; the test executes that code. The animation does not claim to show the patch implementation or prove how the rejection was achieved.
- Empty quotes represent an empty string, not a missing field, whitespace or an invalid nonempty password. Do not substitute those inputs during animation.
- `rejected` is a logical authentication outcome; do not invent HTTP status codes or equate any exception with correct rejection.
- Expected rejection is specified before execution. Observed rejection arrives after execution. Passing follows their comparison, not just function completion.
- Passing this one test cannot show that valid logins work. Keep pending cases visible but do not execute them or introduce the later regression lesson.
- Assume the check executes successfully in an appropriate test environment. No timeout or environment-failure scenario is taught here. Keep trusted criterion data distinct from the patch's own claim.

## Native350 acceptance and future encoded checks

These are requirements for a later render, not claims of completed validation.

1. Inspect actual individual decoded frames at 350px width without zoom: 3.5, 9.8, 12, 17.5, 26.5, 29.5, 34, 36 and 43.5s; also inspect both sides and midpoint of each reveal/move/status transition at full resolution and native350. Do not substitute a contact sheet.
2. A beginner can identify the input as empty, expected rejection as predefined, observed rejection as produced by execution, and pass as a comparison result. Verify silent viewing still communicates this sequence.
3. The claim, returned outcome and grade are three visibly distinct states. No checkmark, green observation or result row appears before its scheduled cause. P1 remains associated with the run and saved result.
4. The two result values fit cleanly; brackets, gutter cursor and save mark never overlap text. Inspect the busiest final state individually. If quotes or secondary labels are unclear, enlarge or simplify without reducing hold time.
5. `Other required cases / not run` is readable and held through the ending. No global `all passed`, `fixed`, release or reliability badge is introduced.
6. Preserve complete observation and expected value after saving; no accidental reset, stale running state or title-only final disappearance. Finite ending is intended, so matching first/last frames is unnecessary.
7. Check every sound against its state change, full decode, audio peaks below -0.5dBFS and moov-before-mdat. Report actual listening separately from signal analysis. Reproduce suspected visual defects through alternate extraction before flagging them.
8. Later comparative review must inspect the encoded candidate against the public lesson and bind its decision to actual before/after SHA-256. A new encode needs renewed inspection.

## Production boundary

This deliverable is only the plan. Later implementation uses the repository-pinned Puppeteer dependency and a cut-local engine copy, with any test-runner drawing extension local to the cut. No render, source implementation, shared-skill update, public/site edit, manifest change, Git operation or other lesson work belongs to this planning task.
