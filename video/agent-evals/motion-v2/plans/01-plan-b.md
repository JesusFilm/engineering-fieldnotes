# Lesson 01 — Task, trial and grader — plan B

Independent plan for the motion-v2 cut of agent-evals lesson 01. Authored from the lesson entry in `video/agent-evals/sequence/lessons.json` (item 1) and the concept content in `content/concepts/agent-evals.json`. No other plan for this lesson, no ledger, and no authoring source was consulted. This document names no authoring model.

## Scope

One mechanism: **an evaluation is a task with success criteria written before the run, one trial of the whole agent system (model, harness, tools, environment) that returns an artifact and evidence, and a grader that holds the criteria independently and marks the artifact against them; the grade is a record of that one trial.**

The viewer should feel the order and the separation: criteria appear on the task card and are copied to the grader before anything runs; the trial happens inside a frame that holds four parts cycling together; the artifact leaves the frame and the grader ticks the criteria it already had; one row fills in a results ledger whose other rows stay empty.

Grounding (from the concept): "an evaluation is a task plus evidence and grading rules. A trial is one attempt; a suite collects tasks. Evaluate the model together with its harness—the instructions, tools, and execution loop that let it act"; "define the task before running the agent"; "keep grader tests outside the agent's editable submission"; "a grader can inspect produced code, stored records, or a trace of tool interactions"; the lesson's takeaway: "evaluate the agent with its harness, tools and environment, not just an isolated model response."

Out of scope: the deliberately bad patch and regression checks (a later lesson), repeated trials and variation, comparing configurations, clean fixtures and resets, and distinguishing agent failure from environment failure. The cut ends with one graded trial and two empty ledger rows.

Grammar for this cut: **a task card, a system frame holding four parts, a grader card, and a results ledger, stacked as one evaluation record; plus one wire down the right margin that copies criteria from the task to the grader before the run.** The frame's four inner boxes cycle to show the whole system acting; the grader's marks land on criteria it was given, not on anything the system produced. This is the first cut of this topic; it is distinct from the guardrails cuts (grids, grant cards, checkpoints, approvals), the orchestration cuts (chain, routing, parallel bars, join, scorecard), the memory-architecture, context-engineering, tool-design, and loop-engineering cuts, and the harness-engineering views. Every element is a software object: a task record, a criterion, a system component, a trial artifact, a grade.

Target length ≈ 35 s at playback. Authored at speed 1 for 31.5 s with `meta.speed: 0.9`. Lengthen the hold after the criteria are copied and the hold on the one-row ledger first if stills read fast. Do not add beats to reach the guideline.

## Stage and coordinates (1080 × 1920)

Palette and type follow `references/style.md`. Names are 40–44 px; store rows, sublabels, and inner box labels are 36 px monospace (≈ 21.6 px per character). Everything stays readable at 350 px wide (≈ 12–13 px for the smallest). If packet chip text renders below 40 px, add a `labelSize` option in the local engine copy and report it.

| id | type | centre (x, y) | size | text | notes |
|---|---|---|---|---|---|
| title | title band | (540, 330) / (540, 405) | — | **Agent evals** / TASK, TRIAL AND GRADER | engine title + subtitle |
| task | store, `rows: 3`, w 760 | (540, 600) | 760 × ≈ 200 (x 160–920, y ≈ 500–700); row centres y ≈ 535, 600, 665 | label `task` 40 px at (540, 460); rows 36 px mono | row0 `fix empty-password login` · row1 `A  empty pw → rejected` accent · row2 `B  valid pw → accepted` accent (max 24 characters ≈ 518 px) |
| frame | box, no fill | (540, 950) | 760 × 260 (x 160–920, y 820–1080) | — | the system boundary; stroke mid → active while the trial runs |
| framelab | label | (540, 850) | 40 px mono | `agent system` → `agent system · trial 1` | inside the frame's top |
| m / h / t / e | box, `labelSize 36` | (285, 980), (455, 980), (625, 980), (795, 980) | 150 × 90 each | `model` · `harness` · `tools` · `env` | the four parts; light in rotation while running |
| grader | store, `rows: 2`, w 760 | (540, 1290) | 760 × ≈ 140 (x 160–920, y ≈ 1220–1360); row centres y ≈ 1255, 1325 | label `grader` 40 px at (540, 1180); rows 36 px mono, appear when criteria are copied | row0 `A  empty pw → rejected` · row1 `B  valid pw → accepted`; marks at (880, y_row) |
| results | store, `rows: 3`, w 560 | (540, 1560) | 560 × ≈ 200 (x 260–820, y ≈ 1460–1660); row centres y ≈ 1495, 1560, 1625 | label `results` 40 px at (540, 1420); rows 36 px mono | row0 `trial 1  —` → `trial 1  pass` ok · row1 `trial 2  —` dim · row2 `trial 3  —` dim |

Wires (dotted, resting `#3A3E45`):

| id | from | to | via | meaning |
|---|---|---|---|---|
| criteria | task.right (920, 600) | grader.right (920, 1290) | [1010, 600], [1010, 1290] | the success criteria are copied to the grader before the run, down the right margin, outside the system frame |
| give | task.bottom (540, 700) | frame.top (540, 820) | — | the task is given to the system |
| artifact | frame.bottom (540, 1080) | grader.top (540, 1220) | — | the trial's artifact and evidence go to the grader |
| record | grader.bottom (540, 1360) | results.top (540, 1460) | — | the grade is recorded |

The `criteria` wire passes outside the frame (x 1010 > 920), so the viewer sees that the grader's criteria never travel through the system. Stage spans y ≈ 460–1660.

## Sound map

Pitches: task **C5**, system frame **E5** with the four parts on E5, F♯5, G♯5, A5 (the loop is heard as a rising four-note cycle), grader **G5**, results **C6**. Pan by x: the four parts at −0.5, −0.17, +0.17, +0.5; the `criteria` wire's chip pans right; the rest centre.

| event | preset | notes |
|---|---|---|
| task rows appear | `store` | C5; the two criteria rows add `ack` C6 (quiet) |
| criteria copied | `send` C6 (pan right), `store` G5 ×2 | the grader's rows appear |
| task given to the system | `send` C6, `arrive` E5 | frame stroke → active |
| system parts cycle | `ack` | E5, F♯5, G♯5, A5 in turn, quiet, every 0.2 s; `work` underneath every 0.4 s |
| trial finishes | `ack` | E5, gain ×1.3 |
| artifact leaves and lands | `send` E6, `arrive` G5 | |
| a criterion passes | `hit` | ×2, quiet then full |
| grade recorded | `send` G6, `store` C6 | |
| empty rows noted | `ack` | low (C4), quiet, ×2 |
| one trial, one grade | `chime` | the brightest event |

## Beat sheet (times at speed 1)

| t | what moves | state change | sound |
|---|---|---|---|
| **Beat 1 — Define the task and what success looks like (0.0–8.5)** | | | |
| 0.0 | — | task rows hidden; frame stroke mid; parts dim; grader rows hidden; results rows `—` with rows 1–2 dim | — |
| 0.6 / 1.1 / 1.6 | task rows pop | `fix empty-password login` · `A  empty pw → rejected` accent · `B  valid pw → accepted` accent | store C5 ×3, ack C6 (quiet) ×2 |
| 2.4–3.8 | chip `criteria A · B` (accent) task.right → via → grader.right, 1.4 s | — | send C6 (pan right) |
| 3.8 / 4.2 | grader rows pop | `A  empty pw → rejected` · `B  valid pw → accepted` fg, no marks | store G5 ×2 |
| 4.2–8.5 | hold | the grader holds the criteria; nothing has run | |
| **Beat 2 — Run one trial with the agent system (8.5–16.0)** | | | |
| 8.5–9.1 | chip `task` (fg) task.bottom → frame.top, 0.6 s | — | send C6 |
| 9.1 | ripple at frame.top | frame stroke → active; `framelab` → `agent system · trial 1` | arrive E5 |
| 9.3–13.3 | parts light in rotation (model → harness → tools → env → model …), each 0.2 s, 5 cycles | the whole system acts, not one part | ack ×20 (quiet, rising cycle), work every 0.4 s |
| 13.3 | all four parts pulse together | — | ack E5 (louder) |
| 13.8–14.4 | chip `patch + trace` (ok) frame.bottom → grader.top, 0.6 s | frame stroke → mid; parts → dim | send E6 |
| 14.4 | ripple at grader.top | grader stroke glows | arrive G5 |
| 14.4–16.0 | hold | an artifact and its evidence sit with the grader | |
| **Beat 3 — The grader applies the stated criteria (16.0–22.5)** | | | |
| 16.0 | grader row0 flashes; ok check at (880, 1255) | row0 → ok | hit (quiet) |
| 17.0 | grader row1 flashes; ok check at (880, 1325) | row1 → ok | hit |
| 17.5 | — | grader stroke → ok | — |
| 17.5–22.5 | hold | two criteria from the task, two checks from the grader | |
| **Beat 4 — The grade describes this one trial (22.5–31.5)** | | | |
| 22.5–23.1 | chip `pass` (ok) grader.bottom → results.top, 0.6 s | — | send G6 |
| 23.1 | ripple at results.top | results row0 → `trial 1  pass` ok | store C6 |
| 24.0 / 24.4 | results rows 1 and 2 pulse at dim | `trial 2  —` · `trial 3  —`: not run | ack (low, quiet) ×2 |
| 25.0 | results label pulses; row0 pulses ok | one row filled | chime |
| 25.0–30.0 | hold | final state: a task with two criteria, a quiet system frame, a grader with two checks, a ledger with one pass and two empty rows | |
| 30.0–30.8 | — | `s.fade` to black, 0.8 s | — |
| 31.5 | end | finite ending | |

## Accuracy limits

- The task, criteria, and outcome are illustrative, drawn from the concept's authentication example. The cut shows a passing trial so the vocabulary is seen cleanly; the concept's deliberately bad patch (passes A, fails B) is a later lesson.
- The four parts (model, harness, tools, env) are the concept's description of the system under evaluation. Real systems have more parts and the parts do not cycle in a fixed order; the rotation is a teaching device for "the whole system acts".
- `patch + trace` stands for the produced artifact and the evidence a grader can inspect (code, stored records, tool trace). The cut does not show the grader executing tests; the write-up carries the walkthrough's step 3.
- The criteria travel to the grader outside the frame to show that grading rules are kept outside the agent's reach. The cut does not show how that separation is enforced.
- The two empty ledger rows depict that a grade describes one trial. Three rows are a teaching size; the concept notes that repeating a task measures variation and that three trials remain a learning exercise, not a reliability estimate.
- No `poof` or `miss` is used; nothing fails in this cut.

## Acceptance checks

1. **Stills per beat** at playback seconds (speed 0.9): `7.0, 12.5, 17.0, 22.0, 30.0, 34.0` (speed-1 ≈ 6.3, 11.3, 15.3, 19.8, 27.0, 30.6). Tile with ffmpeg and view the row; view the 7.0 s (criteria copied) and 30.0 s (final) stills at full size and at 350 px wide. Pass when the three task rows, the frame label, the four part labels, the two grader rows with marks, and the three results rows are readable at 350 px, the dim results rows are distinguishable from the filled one, and the `criteria` wire is visible outside the frame.
2. **Criteria before the run**: at 7.0 s the grader holds two rows with no marks, the frame stroke is mid, and the parts are dim; the `criteria` chip has landed and no `task` chip has left.
3. **Whole system**: at 12.5 s the frame is active, its label reads `agent system · trial 1`, and at least one part is lit; the still should catch the parts at different brightness levels, showing rotation.
4. **Grader marks its own criteria**: the grader's row text is identical to the task's criteria rows; marks appear only after the `patch + trace` chip lands (speed-1 14.4 → 16.0).
5. **One trial**: at 30.0 s exactly one results row reads `pass` and two read `—` in dim.
6. **No lingering state**: no chip remains during any hold; the parts are dim after 13.8 s; the frame label keeps `trial 1`.
7. **Overlap**: the `criteria` chip at x = 1010 must stay inside the frame and clear of the task and grader cards' right edges (920); the `task`, `patch + trace`, and `pass` chips must not cross the `grader` and `results` labels except at arrival (labels sit above their cards; chips arrive at the card tops; shift labels up by 10 px if needed); the part boxes (150 px) must hold their labels at 36 px (`harness` ≈ 151 px: use `labelSize 32` for the parts or widen to 160 px with gap 15). Task and grader rows at 36 px mono (24 characters ≈ 518 px) fit inside 760 px.
8. **Word budget**: on-screen text is four card labels, three task rows, the frame label, four part labels, two grader rows, and three results rows. No sentence appears beyond the task's one-line description.
9. **Audio**: the Node dry-run lists ≈ 50 cues (3 stores with 2 acks, send, 2 stores, send/arrive, 20 rotation acks with 10 works, ack, send/arrive, 2 hits, send/store, 2 acks, chime). The spectrogram shows the rising four-note cycle repeating from 9.3 to 13.3 s, two `hit` sparkles at 16.0 and 17.0 s, and the `chime` at 25.0 s as the brightest. `ffprobe` reports ≈ 35 s with an audio stream. Record whether audio was heard or only analysed.
10. **Causal reading test**: with sound off and every word removed, a viewer should still see: a top card fills three rows, two highlighted; a chip runs down the right margin into a lower card that gains two rows; a chip drops from the top card into a frame holding four small boxes that light in turn; a chip drops from the frame into the lower card, whose two rows get green checks; a chip drops into a bottom ledger whose first row turns green while two rows below it stay grey.
11. **Project checks** after encoding: `python3 scripts/check_media.py --concept agent-evals`, then the full set before any release proposal. A new encode needs its own comparison review.

