# Know the grading limits — lesson 05

## Scope and grounding

One mechanism: audit an automated grade against the criterion and evidence before relying on it. Use two short calibration examples to reveal a false pass and a false failure. Preserve the distinction between checked behavior, judged explanation quality, held-out coverage, and a release decision.

Grounding: `video/agent-evals/sequence/lessons.json` item 5; `content/concepts/agent-evals.json` judgment, walkthrough and limitations. [Evaluation best practices](https://developers.openai.com/api/docs/guides/evaluation-best-practices), consulted 2026-10-21, recommends task-specific evaluation and calibrating automated scores against human feedback. The local concept supplies the authentication setting and bounded-release judgment. The examples below are illustrative, not measured grader performance.

Six beats over approximately 54 seconds. This exceeds the usual guideline to leave time for two distinct error directions. No benchmark percentages, repeated trials, configuration comparisons, deployment mechanics or implementation of a grading system. The focus is inspecting grades, not claiming two examples calibrate a grader completely.

## Concrete examples

The suite contains tasks `Fix login` and `Explain patch`. For the login task, code tests check both `Empty → reject` and `Valid → accept`. These are concrete behavior checks; do not delegate their result to an explanation-quality score.

For the explanation task, a short rubric criterion is `Name affected input`. Inspect two saved responses under the same rubric:

- Sample A: `Improved security`. Automated grade PASS; reviewer finds that no affected input is named. Reviewed grade FAIL: false pass.
- Sample B: `Reject empty passwords`. Automated grade FAIL; reviewer highlights `empty passwords`, which names the input. Reviewed grade PASS: false failure.

These are examples for checking the grader, not patches being modified during the video. The reviewer applies an explicit narrow criterion, not an unexplained authority override. Neither sample's prose score changes any login test outcome.

## Geometry and native350 typography

1080×1920, 30fps. One evaluation workspace with a task list that contracts into a compact coverage strip while a large grader-audit detail opens. This master/detail UI gives the inspection room without a pipeline of generic boxes. No camera zoom, physical metaphors or paragraph captions.

Coordinates are top-left bounds except text baselines. Background #050506; primary #E6E8EC; secondary #8B9099; active #F5A524; verified match #3FB68B; mismatch #E5484D. Main labels 50–56px, secondary at least44px, title76px. At350 width, useful labels should remain roughly16–18px.

| Element | Coordinates | Content |
|---|---|---|
| Title | center x540, baselines y295/385 | `Know the` / `grading limits` |
| Suite list, opening | x90 y470 w900 h350 | `SUITE` header; rows `Fix login`, `Explain patch` at y600/730 |
| Login expanded details | x125 y625, before audit | `Empty → reject` and `Valid → accept`; two compact lines, no outcomes initially |
| Coverage strip, audit phase | x90 y470 w900 h155 | `SUITE · 2 tasks`; `behavior / explanation`, no global pass badge |
| Audit panel | x90 y675 w900 h760 | header `GRADER AUDIT`; rubric baseline y805; response at y935; grades at y1110 and1220; finding at y1360 |
| Audit text | x125; grades value x680 | `Name affected input`; `A` or `B` badge; `Automated` / `Reviewed` with PASS/FAIL; `False pass` or `False failure` |
| Evidence underline | under selected response words, y960 | Fits only the affected-input words; no long connector through text |
| Audit history | x90 y1480 w900 h100 | short retained chips `A: false pass` and later `B: false fail`; use two lines if needed |
| Coverage/release footer | x90 y1630 w900 h150 | two independent rows `Held-out: not run` and `Release: not decided` |

During the opening, use the main panel area y875–1435 for criterion-to-grader mapping: `Login behavior → Code tests`; `Explanation → Rubric grader`. They are list rows, not flow nodes. Reveal each pair together. Later the audit panel occupies that space; do not leave redundant mapping labels behind it.

At the opening-to-audit transition, shrink only the suite list container to its coverage-strip height over0.8s, preserving its x/y anchor. Fade detailed login lines before resizing; never scale text below its final intended font. The audit panel reveals below, not on top of the old text. On the A→B switch, clear response and both grade values before changing the badge, then populate B. Retain A's finding in audit history, outside the active sample.

No transport wires are needed. Selection outlines, criterion highlights, evidence underlines, revealed comparison values and retained audit findings carry the causality. Result-save motion is a small dot from (930,1370) to (930,1515) over0.6s in the right gutter inside panel bounds, never across labels.

## Six-beat timing, motion, state and sound

All times are playback seconds at speed1. Reading holds are intentional and quiet.

| Beat | Motion and state | Actor-specific sound |
|---|---|---|
| 1. Representative scope, 0–8s | 0–1: suite list reveals. 1.8–2.6: Fix login expands to empty rejection and valid acceptance. 3.6–4.4: Explain patch appears as the second task. At5.2 footer shows `Held-out: not run`. Hold5.5–8. No arbitrary collection of green checks. | Suite `arrive` C5 at1; quiet `ack` C5 at2.6/4.4; `ack` C4 at5.2. |
| 2. Fit grader to criterion, 8–16s | 8–9: behavior row pairs with `Code tests`; at10 display two small behavior checks as passed for this illustrative artifact. 11–12: explanation pairs with `Rubric grader`; no explanation pass yet. 13–14: list contracts to coverage strip and audit panel opens. At14.5 rubric `Name affected input` appears. Hold14.5–16. | Code-test `work` E4 at9, restrained `ack` E5 at10; rubric-grader `arrive` G5 at12; audit reviewer `arrive` C6 at14.5. |
| 3. Inspect a false pass, 16–28s | At16: sample A and `Improved security` reveal. At17.5 automated PASS appears, explicitly in Automated row; Reviewed stays `—`. Hold18–20. At20 criterion gets amber emphasis; at21 response receives an amber outline with label `input: missing`. At23 reviewed FAIL appears; at24 finding `False pass` appears. Hold24–27. At27.2–27.8 finding is saved in history. | Grader `ack` G5 at17.5, not celebratory chime; reviewer `ack` C6 at20, low `thump` C4 at23; recorder `store` C5 at27.8. |
| 4. Inspect a false failure, 28–40s | 28–28.8: clear A's active response/grades, change badge to B. At29: `Reject empty passwords` reveals. At30 automated FAIL appears; Reviewed stays `—`. Hold30.5–32. At32.5 underline `empty passwords` and pulse the unchanged rubric. At34 reviewed PASS appears; at35 finding `False failure` appears. Hold35–39. At39.2–39.8 save B finding beside A. | Grader `ack` G5 at30; reviewer `ack` C6 at32.5 and restrained `chime` C6 at34; recorder `store` C5 at39.8. |
| 5. Calibration remains work, 40–46s | At40.5 audit panel changes its header to `GRADER REVIEW`; retain the two findings in history. Active sample detail fades, replaced by two short status rows: `Rubric: revise` and `Recheck: pending`. They arrive at41.5 and43. No instant perfect-grader badge. Hold43–46. | Reviewer `work` C5 at41.5; `ack` C5 at43. |
| 6. Keep the claim bounded, 46–54s | 46–47: emphasize suite coverage strip, then held-out row. At48 footer adds `Release: not decided`. At49 replace central status heading with `Evidence for review`, retaining `Recheck: pending` beneath it. Hold49–54 with both audit findings and explicit coverage/release limits visible. No launch button, no arrow from pass to deployment. | Suite `ack` C4 at47; reviewer `store` C5 at48 and quiet `ack` C5 at49. Final hold silent. |

Sound map: suite C5/C4, deterministic checks E5/E4, automated rubric grader G5, reviewer C6/C4. Automated labels use neutral blips because their correctness is under inspection. Reviewer sounds track criterion-based agreement/disagreement, not human infallibility. Pan by element location; no continuous typing, music or ticks. The sequence must teach correctly muted.

## Accuracy limits

- A suite is a collection of tasks; the two login cases are checks within Fix login, not a claim that two cases represent all real use.
- Code tests can themselves be incomplete or wrong. Their deterministic nature does not make them comprehensive; the animation merely selects them for concrete outcomes.
- The rubric grader is model-based, but no provider, model identity or author identity appears. Its job here is a narrow explanation criterion, not deciding whether authentication actually works.
- Human review is a reference judgment under an explicit criterion. Real calibration may need multiple reviewers, adjudication and more examples. Two mismatches warrant investigation, not a declaration that calibration is finished.
- Preserve original automated scores alongside reviewed scores. Do not silently overwrite them and conceal the grading error.
- The two synthetic samples do not estimate false-pass or false-failure rates. Do not display percentages or a numerical improvement.
- Held-out cases are kept separate from tuning; `not run` marks coverage still absent here. Do not animate their use for rubric revision or claim a later pass on them.
- No global suite PASS is asserted while grader recheck remains pending. Even a genuinely passing suite would support claims only within its task/criterion coverage and would not automatically authorize release.
- Good explanation quality cannot compensate for failed required behavior tests. No combined score or averaging is shown.

## Native350 and future encoded acceptance

Requirements for a later render, not checks already completed:

1. Inspect individual actual decoded350 frames at6,12,18,23.5,26,30.5,34.5,38,44,50 and53s, plus before/mid/after every panel resize, sample switch and score reveal at full resolution and350. Never substitute a contact sheet.
2. The words `Automated` and `Reviewed` remain readable and unambiguous. A's PASS→reviewed FAIL and B's FAIL→reviewed PASS must not look like patches changing behavior.
3. Keep response snippets to the exact short phrases. If `Reject empty passwords` exceeds the usable line, wrap after `Reject` with fixed baseline spacing; do not shrink font. Ensure the underline selects the named input, not the whole explanation.
4. Check the transition clearing order: no A response with B grades, no stale badge, no hidden reviewer value. Save findings outside the active sample before clearing it.
5. Main teaching labels remain readable at350. Increase size or split rows if the two history chips are crowded. Verify no footer text clips and no dot/glow intersects letters. Reproduce alleged visual faults with alternate extraction before flagging.
6. Confirm there is time to read each automated score before the criterion-based correction, then a meaningful hold on each error type. Extend duration if necessary rather than rush either example.
7. Audio requires actual listening to verify actor distinction and mix; signal analysis alone must be labeled as such. Full-decode, inspect peaks below -0.5dBFS, confirm audio stream and moov-before-mdat.
8. Final state retains pending grader work, held-out coverage and undecided release; no unconditional success claim. Finite ending need not reset.
9. Later comparison must inspect the actual encoded candidate against this lesson's public baseline, hash before/after and bind the decision to the candidate SHA-256. A new encode needs renewed review.

## Production boundary

Only this anonymous plan is written. No rendering, author source, other lesson, public/site/shared-skill edits, commits or deployment. Later implementation uses repository-pinned Puppeteer and a cut-local engine; custom master/detail drawing remains local. Stop after this deliverable for user confirmation before further work.
