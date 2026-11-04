# Lesson 05 — Verify the patch

## Scope and grounding

One mechanism: turn a patch's compatibility claim into fresh evidence by running a saved v1 response fixture against that exact changed revision, checking the actual returned field, and retaining the result with the revision.

Grounding: item 5 of `video/context-engineering/sequence/lessons.json`; example, judgment, walkthrough step 4, and verification limits in `content/concepts/context-engineering.json`. The fixture checks the required `total_cents` field. The passing result establishes only the illustrated compatibility condition; it does not establish a latency improvement or overall correctness.

[Primary context-engineering account](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents), checked in this conversation on 2026-10-20, supports providing clear constraints and relevant context. It is not evidence that a particular patch is correct. The executable-check requirement and invoice example come from the curriculum; the exact fixture, identifiers, response value, and timings below are illustrative, not captured repository execution.

Exclude further edits, failing repair loops, stale-result replay, handoff reconstruction, benchmark execution, automatic merge/deployment, and broad testing methodology. Show one patch and one actual illustrated run. The contrast is claim versus observed evidence, not a fabricated failing model.

## Design: an assertion inspector

Use a software test inspector with a persistent patch header, an expected-field row, a received-response pane, and a result record. The checker matches the literal required key against the response from the running patch. Text and state—not a generic three-node pipeline—show causality.

Five beats, approximately 45 seconds, 1080×1920 at 30fps. Finite ending. Background #050506, white #E6E8EC, secondary #A8ADB5, amber #F5A524 for pending/running, teal #3FB68B only for the checked assertion and completed fixture. Never color the whole patch green.

Main labels 50–56px; essential metadata at least 46px, about 15px at native350. Title 84px. Coordinates are x/y/w/h rectangles unless specified as baseline points.

### Layout

| Element | Coordinates | Role / text |
| --- | --- | --- |
| Title | 90/250/900/115 | `Verify the patch`, 84px |
| Persistent patch strip | 90/420/900/190 | `Changed code`, baseline (125,480), 48px; `Patch p7 · rev b42`, (125,555), 54px |
| Claim/status line | 90/645/900/110 | Initially `Claim: v1 preserved`, 50px; later `Check: not run`, then `Running fixture` |
| Fixture inspector | 90/795/900/370 | Header `v1 response fixture`, baseline (125,855), 50px; `Target: rev b42`, (125,925), 46px; `Expect key`, (125,1000), 46px; `total_cents`, (125,1080), 56px mono |
| Actual response pane | 90/1210/900/265 | Header `Actual response`, (125,1270), 48px; body initially `Not received`, then two rows at y=1350 and y=1430: `invoice: 42` and `total_cents: 1250`, 52px mono |
| Assertion status | 90/1520/900/100 | Initially `Pending`, later `Key present · PASS`, 50px; checkbox/mark at x=125, text x=195 |
| Result record | 90/795/900/690 | Final mode replacing inspector + response only after check lands. Header `Recorded result`, y=860; patch/revision y=960; fixture identity y=1060; `total_cents present`, y=1160; `1 executed · 1 passed`, y=1260; all 48–54px |
| Scope footer | 90/1530/900/210 | Final two short lines `Field presence checked` at y=1600; `Latency: not measured` at y=1680, 46px |

Use a stable amber left-edge marker on revision b42 in patch, fixture target, and final record. These repeated identities establish binding. No branches, revision graph, file browser, memory metaphor, or physical gauge. Leave 24px interior padding; don't put labels into narrow columns.

During the assertion match, draw a short bracket from expected key anchor (380,1080) down the outside left gutter through (65,1080),(65,1430) to actual key anchor (125,1430). It appears only after the response arrives. The response key gets a focus outline before any pass indication. Clear the bracket before the record view. This is a visible comparison, not a packet or internal model-attention animation.

## Five timed beats

| Time | Motion and deliberate holds | Persistent state / causal meaning | Sound |
| --- | --- | --- | --- |
| **0–8s: claim is not evidence** | Title/patch settle by 1.2. Claim appears 2.0. At 4.0 a neutral outlined `Not verified` label appears beside the claim, then at 5.0 status line becomes `Check: not run`. Hold 5.5–8. | Patch p7/rev b42 exists and claims compatibility, but no result is available. No old green check or fabricated failure. | Patch/agent `store` D4 at 1.2; claim `ack` D5 at 2; checker low `ack` C4 at 5. |
| **8–17s: run the fixture on this revision** | Fixture inspector opens 8.5–9.2; target b42 and expected key settle by 10.5. Hold 11–13.5. At 14.0 briefly highlight matching revision strings in patch and fixture target. At 15.0 status becomes Running fixture; a thin activity underline moves once over 0.8s. Response pane appears at 16.0 with Not received. | The target is the current changed revision, not a remembered report. Expectation is visible before response. Pending persists until observation and comparison finish. | Fixture `arrive` C5 at 9.2; checker `ack` C4 at 14; runner `work` C5 at 15; endpoint request `send` G5 at 16. |
| **17–27s: inspect the actual response** | 17.5 pane header gains `rev b42` as compact secondary text. At 18.5 invoice row appears; at 19.3 total_cents row appears. Hold 20–22.5. At 23.0 draw matching bracket for 0.7s; outline actual key at 24.0. Hold 24.5–27. | A response from the fixture's target is available. Literal key match is inspectable. No green assertion yet; response arrival alone is not a pass. Value 1250 supplies realistic context but is not checked by this fixture. | Endpoint `arrive` G4 at 19.3; checker `work` C4 at 23; quiet checker `ack` C5 at 24. |
| **27–34s: establish the narrow result** | At 27.5 assertion status becomes Key present · PASS with a check mark and teal outline. At 28.5 fixture status becomes `1 executed · 1 passed`. Patch strip remains neutral. Hold 29–34. | The saved fixture executed against b42 and passed its key-presence assertion. It does not verify all API behavior. No automatic approval, merge, or successful performance badge. | Checker `chime` C5 at 27.5, restrained short cue; runner `store` C4 at 28.5. |
| **34–45s: retain result with patch identity** | 34.2–35.0 inspector/response resolve into Recorded result. Patch p7/rev b42, fixture name, assertion, and execution count appear in their final rows by 36.5. At 37.2 scope footer adds Field presence checked; at 38.0 adds Latency: not measured. Hold complete record 38.5–43.8; fade lower stage 43.8–45. | Result and exact revision are retained together. Context supplied the requirement; the run supplied this limited evidence. Unknown performance remains explicitly unknown. No new revision appears. | Record `store` E4 at 36.5; checker quiet `ack` C4 at 38.0. Silence during final hold/fade. |

## State contract

Illustrative fixture semantics: call the endpoint implemented by rev b42, parse its response, and assert that the key `total_cents` exists. The displayed single executed/passed count refers to this fixture only. Do not add value, type, status-code, or timing claims that the illustrated assertion does not test. A presence check is intentionally narrow.

The target must remain b42 from preparation through execution and final record. Run state advances not run → running → response observed → assertion passed → result recorded. No pass appears before the expected/actual comparison. The recorded fixture name and assertion must match the executed inspector. The final green indicator belongs to the assertion, not the patch's full correctness.

## Sound map

Patch/agent D4–D5; fixture/checker C4–C5; endpoint G4–G5; retained record E4. Use local presets store, ack, work, send, arrive, and one restrained chime. Sends are softer than completed events. Pan by the active anchor; mostly centre for this full-width layout. No continuous clock, music, narration, or typing. Mute inspection must still distinguish the claim, target, response, check, and result binding.

## Accuracy limits

- Good context helps communicate intent; it is not proof that the model followed it. This example illustrates one successful narrow check, not guaranteed model behavior.
- p7, b42, endpoint response, and fixture are fictional teaching identifiers. No actual repository execution or measured test result is claimed by the plan.
- A preserved key does not prove correct values, units, types, error handling, or general compatibility. The footer explicitly narrows what passed.
- A loading optimization could still be wrong or slower. No latency measurement, improved duration, fewer database calls, or performance guarantee is shown.
- The result is associated with the changed revision. This cut does not cover dirty-worktree identification, artifact hashing, test selection failures, or stale results after later changes; those need real workflow controls.
- The pass is observed test evidence, not human acceptance or a merge authorization. The finite ending does not imply production readiness.
- Response notation is a semantic excerpt, not complete valid JSON; do not present it as a complete executable payload or fixture implementation.

## Native350 acceptance and eventual production checks

These are later acceptance requirements; this plan does not claim rendered checks.

1. Inspect individual encoded frames at 3,6,11,15.5,20.5,24.5,29.5,36.8,39,43 seconds at native350 and full resolution. Inspect ±0.25s around response insertion, pass transition, and final record conversion. Contact sheets alone are insufficient.
2. Patch/revision, expected key, actual key, executed count, and scope limits must be readable without zoom at 350×622. Keep essential text at least 46px source. Measure long strings; wrap intentionally or increase room rather than shrinking. Maintain 24px padding.
3. Confirm exact ordering: expectation and target precede execution; response precedes comparison; comparison precedes pass; completed result precedes recording. No stale Not received label remains after response arrival.
4. b42 appears consistently in patch, target, response provenance, and final record. No revision changes mid-run. The field string is byte-for-byte total_cents in expectation, response, and result.
5. Main fixture and field labels must remain visible while the comparison bracket draws. It stays in the gutter and never obscures text. Clear it before the final record.
6. Mute comprehension: viewer can identify the claim, what code was tested, what observation established the pass, and what remains unknown. No paragraph captions should be necessary.
7. Final hold retains field-presence scope and latency-not-measured together for at least 5.3 seconds. Extend duration if native350 reading requires it. Never add an overall patch-success badge to simplify the ending.
8. Later production must decode the entire MP4, inspect all beat boundaries, check audio peaks below −0.5dB, audio stream, and moov-before-mdat metadata. State whether audio was heard or only analyzed. Reproduce suspected visual faults via alternate extraction before flagging display omissions.
9. Bind later comparative review to actual encoded before/after hashes. A repaired encode needs renewed encoded inspection; do not merely replace the decision hash. Separate optional improvements from reproducible blockers.

## Execution boundary

Write only this plan. No rendering, current other-plan/author-source inspection, other lesson work, production-state/provenance reads, public/site/shared-skill edits, Git commits, or deployment. Later implementation uses repository-pinned Puppeteer and local engine copies; drawing extensions remain local to the cut. Keep local candidates.
