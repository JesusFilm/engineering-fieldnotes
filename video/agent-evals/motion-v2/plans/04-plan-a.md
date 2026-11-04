# Repeat trials independently — lesson 04

## Focus and grounding

One mechanism: launch each attempt from the same intended clean fixture, retain its result outside that disposable state, and count every attempt. Two sequential trials of one unchanged task and configuration produce different illustrative outcomes. The second starts fresh, not from the first trial's patch or conversation.

Grounding: `video/agent-evals/sequence/lessons.json` item 4; `content/concepts/agent-evals.json` overview, walkthrough steps 2 and 4, and the cached-state pitfall. [Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents), consulted 2026-10-20, supports the task/trial distinction and isolated evaluation environments. Outcomes and timings below are invented teaching examples, not measurements.

Five beats, approximately 48 seconds. Exclude configuration comparisons, held-out task design, repair loops, grader implementation, statistical confidence estimates and release decisions. Two trials suffice to illustrate variation and complete reporting; they do not estimate general reliability.

## Visual grammar

A run console with a persistent fixture header, two session tabs, and an append-only results list. Switching tabs changes the active runtime interior while the previous result remains outside it. A visible fresh initialization is the causal event; a tab switch alone must never imply isolation. No three-box pipeline, physical containers, branching revision graph or paragraph captions.

1080×1920 at 30fps. Coordinates are top-left bounds unless noted. Use dark background #050506; primary #E6E8EC, secondary #8B9099, active #F5A524, pass #3FB68B, fail #E5484D. Main labels 50–56px, secondary at least44px, title76px. At width350 this yields roughly16–18px primary labels. Preserve x80–1000/y450–1800 safe bounds.

| Element | Bounds / positions | Purpose |
|---|---|---|
| Title | centered x540, baselines y295/385 | `Repeat trials` / `independently` |
| Fixed task header | x90 y465 w900 h170 | `Task: fix login` at (125,530); `Same setup · same checks` at (125,600) |
| Fixture strip | x90 y675 w900 h145 | `START STATE` at (125,735); `code r0 · data d0` at (125,795) |
| Session tabs | T1 x90 y865 w210 h80; T2 x320 y865 w210 h80 | Only one active; T2 initially `not run` in its workspace state, not a completed session |
| Runtime panel | x90 y945 w900 h390 | Header `TRIAL 1` or `TRIAL 2` at (125,1010); status right-aligned x950 |
| Runtime fields | baselines y1100/1180/1260 | `code` / `data` / `history` at x125; values at x520 |
| Results panel | x90 y1385 w900 h260 | `ALL ATTEMPTS` at (125,1440); rows at y1520 and1600 |
| Result columns | x125 / x320 / x680 | trial ID / evidence IDs / grade; `T1`, `P1 · log1`, `PASS`; `T2`, `P2 · log2`, `FAIL` |
| Summary | x90 y1690 w900 h100 | final `1 pass · 1 fail / 2 trials`, split across two short lines if needed, 50px |

Runtime values start `r0`, `d0`, `empty`. During a run, show `P1` or `P2` for changed code and `log1` or `log2` for interaction history; data may become `d1`/`d2` to illustrate task-local mutation. Keep these identifiers visibly separated from the fixed fixture strip. The strip never changes.

Initialization route: from (950,795) via (1020,795), (1020,1080), to (990,1080). One small dot travels down this gutter; the runtime fields then populate together from the fixture. Do not animate the fixture itself moving or disappearing. Result-save route: from (950,1290) via (1020,1290), (1020,1500 or1580), to the results panel right edge. One dot marks saving; text appears only on arrival. Avoid moving tiny text through gutters.

## Timed beats, state and sound

Use playback seconds at speed1. Long holds below are deliberate reading/contrast holds, not animation delays to fill a target duration.

| Beat | Time and visible causality | Sound |
|---|---|---|
| 1. Fixed task, fresh first trial, 0–9s | 0–1: task header appears. 1.8–2.6: fixed fixture reveals. 3.4: T1 tab activates. 4–5: initialization dot travels into runtime. At5: code=r0, data=d0, history=empty, status=`ready`. Results panel has no outcomes. Hold5.5–9. | Task `arrive` C5 at1; fixture `ack` C5 at2.6; fixture `send` C6 at4; runtime `arrive` E5 at5. |
| 2. Execute and retain T1, 9–19s | 9: runtime status=`running`. At10.5 code becomes P1; at11.5 data becomes d1; at12.5 history becomes log1. At13.5 status=`grading`; at14.5 grade=`PASS`. 15.2–16.2: save dot reaches results row; T1 / P1·log1 / PASS appears. Hold16.2–19 with modified runtime and saved result both visible. | Runtime `work` E4 at9,10.5,11.5,12.5 at low gain; grader `ack` G5 at13.5, `chime` G5 at14.5; recorder `store` G4 at16.2. |
| 3. New trial, no carryover, 19–29s | 19–19.8: activate T2 tab and set header TRIAL2, status=`initializing`. Clear runtime values to `—`; T1 saved result remains. 21–22: fresh initialization dot comes from fixed fixture. At22 populate r0/d0/empty together, status=`ready`. Pulse these three values once. Hold22.5–26 to contrast with preserved P1/log1 below. At26 status=`running`; code becomes P2 at27, data d2 at28, history log2 at29. | Runtime `ack` E5 at19.8; fixture `send` C6 at21 and runtime `arrive` E5 at22; quiet runtime `work` E4 at26,27,28,29. No erase sound on saved results. |
| 4. Retain the different outcome, 29–38s | At30 status=`grading`; at31.5 show `FAIL` in runtime. T1 remains PASS. 32.5–33.5: save dot reaches second results row, revealing T2 / P2·log2 / FAIL. Hold34–38. Do not change code in response or retry T2. | Grader `ack` G5 at30; low `thump` G3 at31.5; recorder `store` G4 at33.5. No crash or environment-failure effect. |
| 5. Report all attempts, 38–48s | 38–39: runtime de-emphasizes to secondary contrast; results panel gets a white outline. At40 reveal summary `1 pass · 1 fail / 2 trials`. Briefly outline both result rows together. Hold41–48, retaining task, fixture, both evidence IDs and both grades. No best-result selection, success banner, percentage or safety badge. Finite ending. | Recorder `ack` G4 at39; restrained `store` G4 at40. Final hold silent. |

Actor pitches: fixed task/fixture C; trial runtime E; grader/recorder G. Keep sender cues quieter than arrivals; pan by actor position. T1 and T2 use the same runtime sound because the configuration stays unchanged. Fail indicates a graded task outcome, not a runtime crash. Every semantic change is grouped with its actor cue; no music or chatter under reading holds.

## Accuracy limits

- `Same setup` denotes unchanged agent configuration, task, budgets and grading criteria. It does not promise identical outputs or literal control over every external variable.
- r0/d0/empty are visible shorthand for the intended reset, including repository, task data and fresh interaction context. Real isolation also requires controlling relevant external state, caches and tools; this simplified console is not an isolation implementation recipe.
- T2 does not inherit P1, d1 or log1. Stored evaluation evidence lives outside trial state and remains available to the evaluator, not supplied as a helpful solution to the next attempt.
- T1 PASS and T2 FAIL are hypothetical outcomes under the same checks. The video does not explain the cause of variation, imply strict statistical independence, or prove determinism/non-determinism from two observations.
- P1/P2 identify trial artifacts; no patch quality is inferred from their names. Evidence IDs are retained alongside grades without opening another lesson on graders.
- `1 pass · 1 fail / 2 trials` describes only the shown attempts on this task. Do not relabel it “50% reliable” or imply general safety. Every shown attempt is counted; no third unrecorded run is implied.

## Native350 and encoded acceptance

Requirements for later production, not completed review claims:

1. View individual actual encoded frames at native350 around5.5,16.5,20.5,22.5,26.5,34,41 and47s. Inspect each initialization, tab switch, save and verdict before/during/after at full resolution and350. A contact sheet alone does not establish legibility.
2. The clean T2 state r0/d0/empty must be visible for at least3s before running and must coexist with T1's retained P1/log1 record. No transitional frame may label P1 or log1 as T2's starting state.
3. Distinguish fixed source fixture, active runtime and saved results by labels and placement, not color alone. Viewers should be able to point to where state resets and where evidence survives.
4. Both PASS and FAIL remain readable at350; the summary counts exactly those two rows. IDs must fit at least44px; simplify evidence labels if necessary instead of shrinking them.
5. Check routes and glows for collisions with labels, tabs and summary. Reproduce suspected clipping or missing text with alternate extraction before flagging.
6. No full-screen green completion state, reset-to-pass ending, disappearing failure or global reliability claim. Preserve final evidence through the finite ending.
7. Verify the soundtrack by listening when available and clearly separate listening from signal analysis. Full-decode the media, confirm audio, peaks below -0.5dBFS and moov before mdat. No claim of actor-specific audible cues based only on frame inspection.
8. Compare the actual encode against the intended lesson and public baseline, with before/after hashes. Bind the decision to the candidate's full SHA-256; a replacement encode needs renewed inspection.

## Production boundary

Only this plan is written. No rendering, author source, other lesson, public/site/shared-skill edit, commit or deployment. Later implementation uses repository-pinned Puppeteer and a cut-local engine; any console drawing extensions stay local. Stop after this deliverable and await user confirmation for further work.
