# Lesson 05 — Limit repair attempts — plan B

Independent plan for the motion-v2 cut of loop-engineering lesson 05. Authored from the lesson entry in `video/loop-engineering/sequence/lessons.json` (item 5) and the concept content in `content/concepts/loop-engineering.json`. No other plan for this lesson, no ledger, and no authoring source was consulted. This document names no authoring model.

## Scope

One mechanism: **the controller holds the budget and counts completed attempts itself; every failed attempt lowers the remaining allowance, and when it reaches zero the controller refuses the next edit before it happens and hands over the list of attempts together with the failure that remains.**

The viewer should feel the allowance shrinking in step with each failure, the refusal landing at the controller (so the limit is visibly enforced outside the agent), and the handoff carrying two things: what was tried (the attempts log) and what still fails (the runner's last result).

Grounding (from the concept): the walkthrough's teaching limits are at most three patches, six test invocations, and five minutes overall, with a per-command timeout; "bound tool calls and elapsed time as well as edits"; "enforce continuation in control logic"; a handoff should let someone resume without guessing. The lesson's intro names time, tool calls, and repair attempts as things a controller can cap, so the budget panel shows all three while the patch allowance is the one that runs out.

Out of scope: the decision routes and empty selection (lessons 01 and 04), the assertion-to-patch link (02), the success rule (03), no-progress detection on identical evidence, per-command timeouts and retries of side-effecting tools, and anything the engineer does after the handoff. The three failing values are chosen to differ so the cut does not quietly teach the no-progress rule.

Grammar for this cut: **a budget panel with three depleting rows, an attempts log that appends a row per failure, and a checkpoint that consumes the fourth patch.** Store rows carry both the text and a fill bar, so each budget row is a labelled gauge; the time row drains continuously while the patch and run rows step down at each completed attempt. The attempts log is a second store whose rows pop in one per failure, and it later leaves as a chip. This differs from lesson 01 (vertical loop, three-port controller), 02 (test grid, code pane, assertion card), 03 (run bar with ticks, rule panel, handover bundle), 04 (counter pipeline, outcome table, phone), and the harness-engineering views. Every element is a software object: a budget row, a log row, a command, a laptop.

Target length ≈ 36 s at playback. Authored at speed 1 for 32.5 s with `meta.speed: 0.9`. Attempts 2 and 3 repeat the structure of attempt 1 with slightly shorter run times so the pattern reads without dragging; lengthen the hold after the refusal first if stills read fast. Do not add beats to reach the guideline.

## Stage and coordinates (1080 × 1920)

Palette and type follow `references/style.md`. Names are 40–44 px; store rows and sublabels are 36 px monospace (≈ 21.6 px per character). Everything stays readable at 350 px wide (≈ 12–13 px for the smallest). If packet chip text renders below 40 px, add a `labelSize` option in the local engine copy and report it.

| id | type | centre (x, y) | size | text | notes |
|---|---|---|---|---|---|
| title | title band | (540, 330) / (540, 405) | — | **Loop engineering** / LIMIT REPAIR ATTEMPTS | engine title + subtitle |
| agent | box | (540, 600) | 480 × 150 (x 300–780, y 525–675) | label `agent` 44 px; sublabel 36 px `repairing` → `blocked` | |
| attempts | store, `rows: 3`, w 440 | (300, 1000) | 440 × ≈ 260 (x 80–520, y ≈ 870–1130) | label `attempts` 40 px at (300, 830); rows 36 px mono, hidden until appended | row0 `#1  fails · 119.75` · row1 `#2  fails · 95.00` · row2 `#3  fails · 92.50` (max 18 characters ≈ 389 px) |
| budget | store, `rows: 3`, w 460 | (780, 1000) | 460 × ≈ 260 (x 550–1010, y ≈ 870–1130) | label `budget` 40 px at (780, 830); rows 36 px mono with `row{i}Fill` bars | row0 `patches 3 left` fill 1 · row1 `runs    6 left` fill 1 · row2 `time    5:00` fill 1; fills in accent, row0 turns bad at zero |
| runner | box | (540, 1380) | 560 × 150 (x 260–820, y 1305–1455) | label `pytest -k discount` 40 px mono; sublabel 36 px result | sublabel `idle` → `running…` → `1 failed · 119.75` etc. |
| engineer | laptop | (540, 1680) | engine default | label `engineer` 36 px at (540, 1750) | |
| badge | badge | (760, 1680) | — | `→ engineer` | hidden (scale 0) until beat 5 |

Wires (dotted, resting `#3A3E45`):

| id | from | to | via | meaning |
|---|---|---|---|---|
| check | agent.bottom (540, 675) | budget.top (780, 870) | [540, 770], [780, 770] | every patch passes the controller's budget first |
| run | budget.bottom (780, 1130) | runner.top (540, 1305) | [780, 1220], [540, 1220] | an allowed patch goes on to the test command |
| log | runner.left (260, 1380) | attempts.bottom (300, 1130) | [200, 1380], [200, 1200], [300, 1200] | each result is appended to the log |
| hand | attempts.bottom (300, 1130) | engineer.left (≈ 490, 1680) | [200, 1200], [200, 1680] | the log goes to a person |
| still | runner.bottom (540, 1455) | engineer.top (540, 1630) | — | the remaining failure goes to the same person |

The `check` wire ends at the budget panel, so the chip visibly stops at the controller when refused. `log` and `hand` share the x = 200 margin; `hand` is only used once and after `log` is finished. The budget decrement has no wire; the matching row pulses as the log row lands, which reads as the controller counting the completed attempt. Stage spans y ≈ 525–1760.

## Sound map

Pitches: agent **C5**, budget (controller) **G5**, runner **E5**, attempts log **A5**, engineer **C6**. Pan by x: attempts left (`−0.45`), budget right (`+0.45`), others centre.

| event | preset | notes |
|---|---|---|
| budget configured | `ack` | G5, pan right, one per row at 0.2 s spacing (3) |
| patch leaves agent | `send` | C6 |
| patch reaches budget, allowed | `arrive` G5 then `ack` G5 | the check passes |
| patch reaches runner | `arrive` | E5 |
| tests run | `work` | every 0.22 s while `running…` |
| attempt fails | `miss` | at runner |
| result appended to log | `send` E6, `store` | pan left |
| allowance decreases | `thump` | gain ×0.5, pan right, with the row pulse; gain ×1.0 at the step to zero |
| fourth patch refused | `thump` | gain ×1.4, pan right, with `s.shake` on the budget; the loudest event |
| agent blocked, check lane closes | `poof` | quiet |
| log leaves for engineer | `send` A6, `arrive` C6 | pan left → centre |
| remaining failure leaves for engineer | `send` E6, `arrive` C6 | |
| handoff complete | `deliver` | low-mid |

The time row drains in silence; a `clock` tick is added only at each attempt's decrement so the drain is noticed without a constant tick.

## Beat sheet (times at speed 1)

| t | what moves | state change | sound |
|---|---|---|---|
| **Beat 1 — A configured budget; one attempt completes and fails (0.0–8.5)** | | | |
| 0.0 | — | budget rows full in accent; attempts rows hidden; runner `idle`; agent `repairing`; `time` fill begins a linear drain 1 → 0.37 across 0–30 s | — |
| 0.8 / 1.0 / 1.2 | budget rows pulse in turn | — | ack × 3 |
| 1.6–2.4 | chip `patch #1` (accent) agent.bottom → via → budget.top, 0.8 s | — | send C6 |
| 2.4 | ripple at budget.top | budget stroke glows briefly | arrive G5, ack |
| 2.7–3.5 | chip continues budget.bottom → via → runner.top, 0.8 s | — | — |
| 3.5 | ripple at runner.top | runner stroke active, sublabel `running…` accent | arrive E5 |
| 3.7–5.3 | — | glow held | work ticks × 8 |
| 5.4 | — | runner sublabel → `1 failed · 119.75` bad | miss |
| 6.0–6.9 | chip `fails · 119.75` (bad) runner.left → via → attempts.bottom, 0.9 s | — | send E6 |
| 6.9 | ripple at attempts.bottom | row0 pops `#1  fails · 119.75` | store |
| 7.1 | budget row0 and row1 pulse | row0 fill → 0.667, text `patches 2 left`; row1 fill → 0.833, text `runs    5 left`; row2 text `time    4:30` | thump (quiet), clock |
| 7.1–8.5 | hold | | |
| **Beat 2 — Another attempt still fails; the allowance decreases (8.5–15.0)** | | | |
| 8.5–9.3 | chip `patch #2` agent → budget.top | — | send C6 |
| 9.3 | ripple | — | arrive G5, ack |
| 9.6–10.4 | chip budget → runner | — | — |
| 10.4 | ripple | runner `running…` | arrive E5 |
| 10.6–12.0 | — | glow held | work ticks × 7 |
| 12.1 | — | runner sublabel → `1 failed · 95.00` bad | miss |
| 12.6–13.5 | chip `fails · 95.00` runner → attempts | — | send E6 |
| 13.5 | ripple | row1 pops `#2  fails · 95.00` | store |
| 13.7 | budget rows pulse | row0 fill → 0.333, `patches 1 left`; row1 fill → 0.667, `runs    4 left`; row2 `time    3:50` | thump (quiet), clock |
| 13.7–15.0 | hold | | |
| **Beat 3 — The last allowed attempt fails; the budget reaches zero (15.0–21.5)** | | | |
| 15.0–15.8 | chip `patch #3` agent → budget.top | — | send C6 |
| 15.8 | ripple | — | arrive G5, ack |
| 16.1–16.9 | chip budget → runner | — | — |
| 16.9 | ripple | runner `running…` | arrive E5 |
| 17.1–18.5 | — | glow held | work ticks × 7 |
| 18.6 | — | runner sublabel → `1 failed · 92.50` bad | miss |
| 19.1–20.0 | chip `fails · 92.50` runner → attempts | — | send E6 |
| 20.0 | ripple | row2 pops `#3  fails · 92.50`; attempts stroke → fg | store |
| 20.2 | budget row0 pulses bad | row0 fill → 0, text `patches 0 left`, colour bad; row1 fill → 0.5, `runs    3 left`; row2 `time    3:10` | thump (full), clock |
| 20.2–21.5 | hold | three log rows, an empty red patch row | |
| **Beat 4 — Exhausted: the controller blocks the next edit (21.5–25.0)** | | | |
| 21.5–22.3 | chip `patch #4` (accent) agent.bottom → via → budget.top, 0.8 s, fades at the end | — | send C6 (quiet) |
| 22.3 | budget shakes ±10 px, 0.4 s; red ripple with × at budget.top | row0 flashes bad; the chip is gone; nothing reaches the runner | thump (loud, pan right) |
| 22.7 | agent pulses once | agent sublabel → `blocked`, subColor bad → mid over 0.6 s; agent alpha → 0.7; stroke → mid | — |
| 22.9 | — | `check` wire `dashed` → 1, colour → bad then dim (0.5 s) | poof (quiet) |
| 22.9–25.0 | hold | the runner still shows `1 failed · 92.50`; the log holds three rows; the patch row is empty | |
| **Beat 5 — Send the attempts and the remaining failure (25.0–32.5)** | | | |
| 25.0 | attempts pulses accent | attempts stroke → accent | — |
| 25.0–26.2 | chip `3 attempts` (accent) attempts.bottom → via → engineer.left, 1.2 s | — | send A6 (pan left) |
| 26.2 | ripple at engineer | laptop colour → accent | arrive C6 |
| 26.6–27.3 | chip `still fails · 92.50` (bad) runner.bottom → engineer.top, 0.7 s | — | send E6 |
| 27.3 | ripple at engineer | laptop glow | arrive C6 |
| 27.6 | badge pops with overshoot | badge `→ engineer`, accent | deliver (low-mid) |
| 27.6–31.0 | hold | final state: blocked agent, dashed check lane, empty red patch row, half-drained run and time rows, three log rows, red result, lit laptop with badge | |
| 31.0–31.8 | — | `s.fade` to black, 0.8 s | — |
| 32.5 | end | finite ending | |

## Accuracy limits

- Three patches, six test invocations, and five minutes are the concept's teaching values for the exercise, stated there as "not measured production defaults". The cut shows them as a configured budget, not as a recommendation.
- The time row's drain is illustrative: it falls from 5:00 to about 3:10 over the cut so the viewer can see time is also bounded. On-screen durations do not represent real test timing, and the time budget is not what runs out.
- The run row decrements once per attempt because each attempt here includes exactly one test invocation. Real loops may run tests more than once per patch.
- `119.75`, `95.00`, and `92.50` are illustrative actual values for an expected `90.00`, chosen to differ so the cut does not imply identical evidence. Detecting no progress on repeated identical evidence is a separate rule the concept mentions and this cut does not teach.
- The refusal happens at the controller before the patch reaches the test command. This is the lesson's point ("the controller must enforce the budget outside the model"); the cut does not show how the refusal is communicated back to the model beyond the agent's `blocked` state.
- The handoff is drawn as two chips: the attempts log (what was tried) and the runner's last result (what still fails). The concept's full handoff also includes command, selection, and stop reason; the write-up carries the complete list.
- The quiet `poof` reuses an eviction preset to mark the check lane being retired; it is kept quiet so it does not read as a failure. Note the reuse in the hand-over.

## Acceptance checks

1. **Stills per beat** at playback seconds (speed 0.9): `8.6, 15.8, 23.5, 26.5, 32.5, 35.0` (speed-1 ≈ 7.7, 14.2, 21.2, 23.9, 29.3, 31.5). Tile with ffmpeg and view the row; view the 23.5 s (zero) and 26.5 s (refusal) stills at full size and at 350 px wide. Pass when the three budget rows and their fills are readable and the fill lengths are distinguishable step by step at 350 px, the three log rows are readable, the runner's result text is readable, and the dashed `check` lane at 26.5 s is clearly different from the dotted lane at 8.6 s.
2. **Count in step with failure**: in each of the first three stills the number of log rows equals 3 minus the patches-left count, and the row fills match (0.667, 0.333, 0). The decrement must never precede the log row's arrival.
3. **Refusal at the controller**: between 21.5 and 25.0 s (speed 1) nothing changes on the runner; the `patch #4` chip never appears below y = 870; the red × ripple is centred on budget.top.
4. **No lingering state**: no chip remains on screen during any hold; the time row's fill decreases monotonically; the `→ engineer` badge appears only after both chips have landed.
5. **Overlap**: chips on the `check` and `run` wires must not cross the `attempts` or `budget` labels at y = 830; the `fails` chips at x = 200 must clear the attempts panel's left edge (80) and the runner's left edge (260); the `3 attempts` chip must not cross the `engineer` label. Store rows at 36 px mono (18 characters ≈ 389 px) fit inside 440 and 460 px panels with padding.
6. **Word budget**: on-screen text is names, the command, three budget rows, three log rows, the runner's sublabel, the agent's sublabel, the engineer label, and one badge. No sentence appears.
7. **Audio**: the Node dry-run lists ≈ 60 cues (22 work ticks, 3 misses, 3 stores, 3 decrement thumps with clocks, the loud refusal thump, sends and arrives, poof, deliver). The spectrogram shows the three `miss` hits and three `thump` steps rising in level, the refusal thump at 22.3 s as the loudest event, and a quiet stretch during the 22.9–25.0 hold. `ffprobe` reports ≈ 36 s with an audio stream. Record whether audio was heard or only analysed.
8. **Causal reading test**: with sound off and every word removed, a viewer should still see: a chip goes from the top box through the right panel to the bottom box, comes back red to the left panel as a new row, and a bar in the right panel shortens; this happens three times until the bar is empty and red; the fourth chip stops at the right panel with a red ×, the top box dims and its lane turns dashed; the left panel and the bottom box each send to a laptop that lights with a badge.
9. **Project checks** after encoding: `python3 scripts/check_media.py --concept loop-engineering`, then the full set before any release proposal. A new encode needs its own comparison review.

