# Join before deciding

## Scope and grounding

One mechanism: the coordinator needs both required review reports to complete the assessment, and receipt of both reports does not imply a successful release. Show API finishing first, migration still running, a pending join, then migration delivering a blocking risk. End at blocked release with the risk retained.

Grounding: `video/orchestration-patterns/sequence/lessons.json` item 4 and the example, judgment and deliberate-join passages in `content/concepts/orchestration-patterns.json`. Local editorial workflow and architecture-flow-video skill/style/API/review references were read in this conversation and govern this plan. No other plan, author source, production ledger or provenance was consulted.

Primary pattern reference: [Building effective agents — Parallelization](https://www.anthropic.com/engineering/building-effective-agents#workflow-parallelization), accessed 2026-10-20 in this session, describes independent work whose outputs are aggregated. The two-report requirement and blocking release rule here are the local lesson's explicit policy, not a universal aggregation rule. No GitHub Actions semantics are depicted.

Exclude subsequent repair, changed snapshots, invalidation, reruns and eventual release. Failed, missing and conflicting reports belong in the accuracy limits; do not add separate scenarios that compete with this run. Human approval remains outside the animation.

## Software-native visual grammar

Use a coordinator's assessment matrix: two named required-report rows, a receipt column separate from the finding column, and a persistent release status beneath. A missing receipt cell visibly prevents complete assessment. When the second receipt fills, the risk cell still blocks release. This separation teaches “complete evidence” versus “acceptable evidence” without a physical gate metaphor or three-box pipeline.

1080×1920 at 30 fps. Black background, white text, gray unfilled cells, blue API identity, amber migration identity. Use amber for waiting and red only for the demonstrated blocking risk. Receipt markers are neutral filled squares with `received`, never green success ticks. Required text 48–54px (15.6–17.5px at native 350px); smaller status labels at least 44px. No paragraph captions.

Coordinates are top-left rectangle bounds; text positions are left baselines unless stated otherwise.

- Title centered (540,290), 82px: `Join before deciding`. Subtitle centered (540,380), 44px: `TWO REQUIRED REPORTS`.
- Worker status strip (90,470), 900×170. Two halves separated at x=540. Left text (125,530) `API review`, (125,600) `finished`; right (585,530) `Migration`, (585,600) `running`. All 48px. Migration has a short moving activity underline at (585,620), width 330. No fake percentage or ETA.
- Coordinator matrix (90,750), 900×540. Header (125,815) `Coordinator · S7`, 52px. Column labels at (125,900) `Review`, (400,900) `Receipt`, (675,900) `Finding`, 44px. Vertical dividers x=365,645; horizontal dividers y=930,1090. API row y=930–1090; migration row y=1090–1250.
- API row labels (125,990) `API`; receipt (400,990) initially `waiting`, later `received`; finding (675,990)/(675,1050) later `No blocker` / `reported`, each 44px. These qualify the report, not objective correctness.
- Migration row labels (125,1150) `Migration`; receipt (400,1150) initially `waiting`; finding (675,1150)/(675,1210) initially em dash, later `Row loss` / `risk`, 48px, red. Allow Migration 46px if needed; never collide with x=365 divider.
- Receipt summary (125,1335), 50px: `Reports: 0 / 2`, then `1 / 2`, finally `2 / 2`. At (620,1335), 46px: `incomplete`, later `complete`. This is receipt completeness only.
- Release assessment panel (90,1400), 900×300. Header (125,1465) `Release assessment`, 50px. Main status (125,1545), 64px: `WAITING`, then `BLOCKED`. Reason at (125,1620), 48px: first `Needs migration report`, finally `Migration: row loss risk`. Use two short lines if the final reason exceeds 830px; expand panel height to 340, retaining bottom margin.
- Input routes: API origin (290,640) → (290,700) → (65,700) → (65,1010) → (90,1010). Migration origin (790,640) → (790,700) → (1015,700) → (1015,1170) → (990,1170). Packets are compact `API · S7` / `M · S7` tokens, 42px, moving clear of table text. Only the current delivery animates. The report finding becomes visible immediately on receipt.
- Finding-to-assessment emphasis is a red outline around migration finding cell, then the same outline around the reason field. Do not move or erase the risk text to produce the summary.

## Five beats with timing, motion, state and sound

Target 45 seconds. The first report is already finished at the opening; do not spend this lesson replaying parallel review setup. Use local holds, not global speed changes to meet duration.

| Time | Movement and state change | Hold / teaching purpose | Sound event |
|---|---|---|---|
| 0–8 | 0–1: reveal worker strip, matrix and waiting assessment. API is finished; migration is running. 2–4: API/S7 token travels to its named row. At 4, receipt becomes received and finding becomes No blocker reported; count increments to 1 / 2. | Hold 4–8. Migration receipt remains empty/waiting and release stays WAITING. No green flash at one report. | API `send` E6 at 2; coordinator `arrive` C5 at 4. Migration quiet `work` G4 at 6 accompanies one underline sweep. |
| 8–17 | 8–9: outline the unfilled migration receipt cell. 10–11: highlight Reports: 1 / 2, then Needs migration report at 12. Worker activity underline continues slowly with a visible sweep at 14. | Hold 12–17, with meaningful migration activity rather than a frozen spinner. The existing API report cannot fill the other named requirement. No artificial attempt to approve or duplicate the first report. | Coordinator low `ack` C4 at 9 and 12, softer than deliveries; migration `work` G4 at 14. No crash cue: work is still running normally. |
| 17–25 | 17–18: migration activity stops and status changes to `risk found`; a small red risk indicator appears beside the worker status. 20–23: M/S7 token travels to its row. At 23, receipt becomes received and Row loss risk appears in red. | Immediately at 23, release status becomes BLOCKED and the risk reason appears; do not delay surfacing a blocking finding until a cosmetic count animation. Hold 23–25. | Migration `thump` G3 at 18 for risk found; `send` G5 at 20; coordinator `arrive` C5 at 23 plus restrained low `thump` C3 for the blocking state. Avoid clipping overlapping cues. |
| 25–34 | At 25, count settles to 2 / 2 and completeness to complete in neutral white. At 27, outline receipt column; at 29, shift emphasis to the red migration finding and at 31 to the blocked reason. Both report rows persist. | Hold 31–34. The viewer sees all required reports present and a blocked release simultaneously. There is no intermediate ready-to-release or approved state. | Coordinator `ack` C5 at 25; quiet neutral tick at 27; low `thump` C3 at 31 synchronized with reason emphasis. No success chime. |
| 34–45 | 34–35: remove temporary emphasis outlines, preserving all settled values. | Deliberate hold 35–42: Reports 2 / 2, complete, No blocker reported, Row loss risk and BLOCKED. Fade the whole stage including title 42–45. Finite ending; no repair or automatic restart. | One quiet coordinator `ack` C4 at 35 as the assessment settles. Silence through final hold/fade. |

Actor sounds: API E; migration G; coordinator C. Pan API slightly left and migration slightly right; coordinator centered. Sends quieter than receipt cues; risk cue strongest but restrained. No background ticking or music required. If two sound events coincide, mix with headroom rather than letting arrival drown out the risk cue. Sound reinforces the state, but all teaching must remain visible muted.

## Accuracy and state invariants

- The final assessment requires both reports in this workflow. An early blocking finding could stop a release immediately; the film must not imply a coordinator hides known risks while waiting. Here the first report has no blocker and the later report introduces one.
- Completion and acceptance are separate columns/states. Two received reports satisfy the receipt condition, not the release criteria. Do not equate successful tool execution, worker completion or fluent prose with a clean review.
- `No blocker reported` is scoped to the API review, not a proven safe release. `Row loss risk` is an illustrative migration finding; it is not claimed to be an executed failing test. The detailed SQL evidence is omitted to keep this lesson about joining reports.
- The blocking rule is this example's release policy. Reports and S7 are assumed valid/matching for this focused run; validation is not demonstrated or guaranteed by the UI count.
- A missing or failed worker must not silently fill a required row. Conflicting findings must not disappear into a majority vote. Those cases require explicit handling in a real coordinator, but are not additional story beats here.
- S7 remains stable. Both named rows and both findings persist through the ending. No row loss during summarization; no green release state; no merge/deploy affordance.

## Native-350 and encoded acceptance checks

1. Inspect actual individual 350×622 frames, unzoomed, at 1, 4.5, 12, 18.5, 23.5, 25.5, 31 and 38 seconds. Read the two column concepts, both findings, the report count and release state. Inspect full-resolution busiest frame additionally. If the matrix is cramped, enlarge rows and wrap short labels; never shrink essential text below 44px.
2. Inspect boundaries at 4, 18, 23, 25 and 42 seconds, including before/mid/after and moving packet midpoints. Tokens, outlines and glows must stay off labels; routes must terminate in the correct named row.
3. At 12 seconds, exactly API is received and assessment remains WAITING. At 23.5 seconds, the risk is visible and status BLOCKED even if the count animation has not settled. At 25.5 and 38 seconds, 2 / 2 coexists with BLOCKED. Any transient approved/success state is a defect.
4. With captions absent, a beginner should identify what is missing, why one report is insufficient, and why receiving the second does not permit release. Muting must not obscure those answers.
5. Listen to validate actor cues, risk salience and synchronization; separately analyze levels. Do not describe signal inspection as listening. Check full decode, audio stream, peaks below −0.5 dBFS and moov-before-mdat during later production.
6. Compare the encoded candidate against the public lesson with author source/self-review withheld. Reproduce alleged visual faults through alternate frame extraction before flagging them. Bind the actual encoded review to full SHA-256; any new encode requires renewed inspection.

## Scope of this deliverable

Write only `video/orchestration-patterns/motion-v2/plans/04-plan-a.md`. No rendering or other lesson work. Later implementation uses repository-pinned Puppeteer and a cut-local engine copy; matrix drawing extensions stay local and deterministic in scene time. No public/site/shared-skill changes, commits or deployment.
