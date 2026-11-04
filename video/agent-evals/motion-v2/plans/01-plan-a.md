# Task, trial and grader

## Scope and evidence

One mechanism: a defined task is attempted once by the agent system; the resulting artifact and evidence are inspected by a grader against predeclared criteria; the grade belongs to that trial. Concrete task: fix empty-password authentication while preserving valid-password login.

Grounding: `video/agent-evals/sequence/lessons.json` item 1 and `content/concepts/agent-evals.json`. AGENTS.md, editorial workflow and architecture-flow-video skill/style/API/review references were read earlier in this conversation and apply. No current alternative plan or author source is used.

Primary source: [Demystifying evals for AI agents — Structure of an evaluation](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents), accessed 2026-10-20. It distinguishes tasks, trials, graders and outcomes, and evaluates the agent harness together with the model. The concrete fixture and successful trial below are instructional examples, not measured performance.

Exclude later lessons on deliberately broken patches, grader failures, repeated trials, configuration comparisons, aggregate metrics and held-out suites. Include two simple criteria as the task definition, but do not turn this into a regression-testing lesson. No deployment or security guarantee.

## Visual grammar and concrete content

Use a single evaluation run sheet with a pinned task definition, a bounded trial workspace and a grader's expected/observed table. One T1 marker persists from workspace to retained artifact to grade. The frame changes from work in progress to evidence inspection, rather than passing a token through three generic boxes.

Task A: `Fix empty-password login`.
Criteria: `Empty → rejected`; `Valid → accepted`.
Trial T1: a disposable repository fixture; the system reads auth.py, edits it and returns patch P1 plus trace T1. Show a short patch summary `Reject empty password`, not a purported complete security patch.
Grader: applies P1 to the fixture, runs the two predefined checks, records the observed outcomes, then marks `T1: criteria met`. A second trial is not run or pregraded. Final scope label: `1 trial observed`.

## Coordinates and typography

1080×1920, 30fps; black background, white useful text, blue trial identity, amber running/inspection, teal criterion matches. Essential labels 48–54px (15.6–17.5px at native 350px); title 78px; supporting labels at least 44px. Use symbols and status words as well as color. All rectangles are top-left plus width×height; text points are left baselines unless centered.

- Title centered (540,280): `Task, trial and grader`, 78px. Subtitle centered (540,375), 44px: `ONE ATTEMPT, ONE GRADE`.
- Task definition sheet (90,460), 900×255. Header (125,515), 48px `Task A`; task (125,580), 54px `Fix empty-password login`. Criteria on separate lines (125,640)/(125,695), 48px `Empty → rejected`, `Valid → accepted`. This panel stays fixed through the film; criteria are never created after observing output.
- Trial workspace (90,790), 900×465. Header (125,850), 52px `Trial T1`; right status at (950,850), 46px, right-aligned: ready → running → finished.
- Inside workspace, system configuration rail at (115,880), 850×125: (145,930), 46px `Agent + harness`; (145,985), 44px `Tools · test repo`. These labels identify the evaluated system, not a single reply. A short read/edit/run event list below has baselines y=1060,1130,1200, text x=145, 48px: `Read auth.py`, `Edit auth.py`, `Save patch P1`. Each row appears on its event and remains. A blue T1 badge at x=865,y=1200 ties outputs to this run.
- After completion, workspace interior crossfades to retained artifact rows while preserving outer frame and T1 header: (145,975) `Patch P1`; (145,1045) `Reject empty password`; (145,1130) `Trace T1`; (145,1200) `read · edit · submit`. No exact tool sequence is claimed mandatory.
- Grader area (90,1330), 900×440. Header (125,1390), 50px `Grader · checks P1`. Table headers at x=125/440/735, y=1460: `Case`, `Expected`, `Observed`, 44px. Row baselines y=1530/1605: `Empty` / `reject` / pending then `reject`; `Valid` / `accept` / pending then `accept`, 46px. Match ticks at x=950 only after observations exist. Use short values to fit; do not shrink.
- Grade footer (125,1690), 52px initially `T1: ungraded`, finally `T1: criteria met`. Scope annotation at (125,1750), 44px `1 trial observed`, appears only at end. If table needs more breathing room, extend grader bottom to 1820, preserving margin.
- Trial start motion: Task A chip travels from (950,715) via (1015,715),(1015,850) to (990,850), over 1.5 seconds. Task sheet remains intact.
- Grading handoff: P1/T1 chip travels from (990,1140) via (1015,1140),(1015,1390) to (990,1390). No grade is sent from the agent to the grader; only artifact/evidence identity moves.
- Check emphasis: each expected cell highlights before its observed value appears. A thin line connects the corresponding pinned criterion to its grader row through left gutter x=60, never through workspace text. Animate one line at a time; remove it after the row settles.

## Five beats: time, movement, state and sound

Proposed duration 47 seconds, speed 1. Extend holds when needed; do not squeeze to hit the guideline.

| Time | Movement/state | Hold and teaching purpose | Sound |
|---|---|---|---|
| 0–9 | 0–2 reveal Task A and both criteria. At 4 reveal ready T1 workspace with Agent + harness and Tools · test repo; grader footer is T1: ungraded. | Hold 4–9. Success is specified before running; one trial is distinct from the reusable task. | Task `ack` C5 at 2; trial `arrive` E5 at 4. |
| 9–19 | 9–10.5 Task A enters T1; status running. At 12 read auth.py appears, at 14 edit auth.py, at 16 save patch P1. At 17 status finished. | Hold 17–19. A trial consists of tool-mediated work in an environment, not just a completion message. Grader still ungraded. | Trial `arrive` E5 at 10.5; tool `work` E4 at 12 and 14; `store` E5 at 16. |
| 19–28 | 19–20.5 crossfade workspace interior to patch P1 and retained trace T1. 22–24 transfer P1/T1 to grader; observed cells remain pending. At 25 grader begins executing checks on patched fixture. | Hold 25–28. Finishing and submitting are not themselves a grade. Same T1/P1 identity survives handoff. | Trial `send` E6 at 22; grader `arrive` G5 at 24; grader `work` G4 at 25. |
| 28–38 | 28–30 emphasize Empty → rejected criterion and expected reject cell, then reveal observed reject with tick at 30.5. 32–34 repeat for valid login; observed accept/tick at 34.5. At 36 footer becomes T1: criteria met. | Hold 36–38. Each match has an observation before the grade. No agent-authored success claim substitutes for checks. | Grader `work` G4 at 28 and 32; `ack` G5 at 30.5 and 34.5; restrained `deliver` G5 at 36. |
| 38–47 | At 38 reveal 1 trial observed and outline T1 in workspace and footer together. Stop all work motion. | Hold 38–44 with the task, evidence and scoped grade visible. Fade entire scene 44–47. Do not show reliability percentages, future-run success or release approval. | Quiet grader `ack` G4 at 38. Silence through final hold/fade. |

Sound identities: task C, trial/tools E, grader G. Slight panning toward active row; sends below arrivals. Sparse work ticks correspond to visible actions, not a continuous activity bed. Grade cue is restrained because the result is limited. The story must remain understandable muted.

## Accuracy limits and invariants

- T1 is one execution of the actual agent system, including harness, tools and environment. The simplified rail is not a claim that all relevant configuration is captured by these labels.
- Task criteria precede execution and remain fixed. Trusted grader checks are outside the agent's editable submission. The illustration assumes a working evaluation environment; error attribution is outside this lesson.
- The patch summary is illustrative, not complete authentication implementation or advice. Empty and valid password cases are intentionally incomplete coverage. Passing them is not a security or release guarantee.
- P1 and trace T1 are retained outputs. The grader uses observed check outcomes from the patched fixture; no “done” response is accepted as proof. The exact read/edit sequence is illustrative, not the sole valid agent trajectory.
- Observed cells start unknown, not pass. T1: criteria met appears only after both checks. Finished trial and graded trial are distinct states.
- The grade belongs to T1. 1 trial observed is a count, not a probability estimate. No second trial or future prediction appears.
- “Agent + harness” is functional terminology only; no model, provider, planner identity or provenance is included.

## Native-350 acceptance and later encoded checks

1. Inspect individual encoded 350×622 frames without enlargement at 5, 13, 17.5, 21, 25.5, 30.5, 34.5, 37 and 41 seconds. Read task, criteria, system rail, T1/P1 IDs, expected/observed cells and final scope label. Also inspect full-resolution busiest frame.
2. Inspect before/mid/after workspace replacement, handoff and each observed-value reveal. No criterion line or moving chip may cover text. Unknown observations must not look like empty successful checks. Reduce unused spacing or wrap short labels rather than shrinking essential type.
3. At 17.5 seconds trial is finished but ungraded. At 25.5 artifact is received but checks are pending. At 37 both outcomes exist and only T1 is graded. Any success badge before evidence, changed criterion or unlabelled overall reliability claim is a defect.
4. After one muted viewing, a beginner should distinguish the task definition, one trial of the agent system and the grader's evidence-based decision. The concrete field changes should teach this without paragraph captions.
5. Later production must actually listen for actor cues and synchronization, separately inspect signal/peaks below −0.5 dBFS, decode the whole MP4 and check audio stream plus moov-before-mdat. Signal/frame analysis must not be described as listening.
6. Compare actual encoded candidate and public lesson before author source/self-review. Reproduce alleged visual faults through alternate extraction. Record before/after full SHA-256 and renew actual review for any changed encode.

## Deliverable boundary

Write only `video/agent-evals/motion-v2/plans/01-plan-a.md`. No rendering or other lesson work. Later production uses repository-pinned Puppeteer and a cut-local engine copy; run-sheet helpers stay local and deterministic in time. No public/site/shared-skill edits, Git commits or deployment.
