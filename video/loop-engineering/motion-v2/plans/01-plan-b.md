# Lesson 01 — Act, observe, decide — plan B

Independent plan for the motion-v2 cut of loop-engineering lesson 01. Authored from the lesson entry in `video/loop-engineering/sequence/lessons.json` (item 1) and the concept content in `content/concepts/loop-engineering.json`. No other plan, ledger, or authoring source was consulted. This document names no authoring model; provenance belongs in the project's metadata, never here.

## Scope

One mechanism: **the controller sits between every observation and the next action, and it alone decides whether the loop may continue.** The viewer should feel that the "continue" route is a decision the controller takes on evidence, and that the same controller can close that route when the evidence is missing.

Grounding story (from the concept's example and walkthrough): a repair loop on a discount calculation. Task A runs the selected tests, sees one failure, applies one patch, reruns, sees all pass, stops for review. Task B runs the tests with a mistyped keyword selector, pytest selects nothing (exit 5), and the repair-only controller stops without making any edit and hands the evidence to an engineer.

Out of scope: tool permissions and edit-scope enforcement (the lesson text mentions "permitted operation"; this cut shows one allowed tool and leaves permission to the harness lesson), elapsed-time and tool-call budgets (only the patch budget appears), flaky reruns, and no-progress detection.

Grammar chosen for this cut: a **vertical loop with a routed return wire and a three-port decision box**. The decision is drawn with the engine's chevron pointer sliding to a labelled port; "allowed to continue" is a wire that lights with marching dots and carries evidence back to the top; "not allowed" is the same wire turning red and dashed. This is distinct from the approved harness-engineering cut (runtime boundary, workspace sheet, revision graph, API replay, branch rule / check view) and uses no physical metaphor: every element is a software object (agent, test command, controller, exit code, patch budget).

Target length ≈ 40 s at playback. Authored at speed 1 for ≈ 35.5 s with `meta.speed: 0.88`. Not fixed; adjust holds after the still check.

## Stage and coordinates (1080 × 1920)

Palette and type follow `references/style.md`. Minimum on-screen text size is 40 px (36 px for sublabels and the budget label) so labels remain legible when the frame is scaled to 350 px wide (≈ 12–13 px). Packet chips must render at ≥ 40 px; if the engine's chip text is smaller, add a `labelSize` option to the chip renderer in a local copy of `scripts/` beside the scene and report it.

| id | type | centre (x, y) | size | text | notes |
|---|---|---|---|---|---|
| title | title band | (540, 330) / (540, 405) | — | **Loop engineering** / ACT · OBSERVE · DECIDE | engine title + subtitle |
| task | label | (540, 500) | 40 px mono, mid | `task A` → later `task B` | identity change in place |
| agent | box | (540, 640) | 520 × 150 | label `agent` 44 px; sublabel `proposes the next step` 36 px | |
| tool | box | (540, 1000) | 640 × 170 | label `pytest -k discount` 40 px mono; sublabel run state 36 px | label swaps to `pytest -k dicsount` for task B |
| controller | box, `ports: 3`, `portSpan: 560` | (540, 1370) | 760 × 190 | label `controller` 44 px; sublabel = docked evidence 36 px mono | ports at x ≈ 260 / 540 / 820, y ≈ 1465 |
| p0 | label | (260, 1530) | 40 px | `continue` | colour follows port0 |
| p1 | label | (540, 1530) | 40 px | `stop · review` | colour follows port1 |
| p2 | label | (820, 1530) | 40 px | `stop · handoff` | colour follows port2 |
| badge | badge | (540, 1610) | — | outcome text | hidden (scale 0) until used |
| budget | bar, `ticks: 3`, `segments: 1` | (540, 1720) | 420 × 14 | label `patches 0/3` 36 px | fills ⅓ per patch |

Wires (dotted, resting colour `#3A3E45`):

| id | from | to | via | meaning |
|---|---|---|---|---|
| act | agent.bottom (540, 715) | tool.top (540, 915) | — | action goes to the tool |
| observe | tool.bottom (540, 1085) | controller.top (540, 1275) | — | observation goes to the controller |
| loop | controller.port0 (≈ 260, 1465) | agent.left (280, 640) | [120, 1465], [120, 640] | the continuation route; lit only when the controller chooses `continue` |

The loop wire runs outside the controller's left edge (x = 160) and the agent's left edge (x = 280), so it never crosses a label. The controller is the widest element; nothing sits beside it. The stage ends at y = 1735, inside the 1800 limit.

## Sound map

Pitches from one chord so the cycle is audible: agent **C5**, tool **E5**, controller **G5**. Sends one octave up (C6 / E6 / G6), quieter than arrivals. Panning is centre for all nodes (single column); the loop wire's send is panned left (`pan −0.6`) and its arrival at the agent is centre, so the return trip is heard moving.

| event | preset | pitch / notes |
|---|---|---|
| action leaves agent | `send` | C6 |
| action lands at tool | `arrive` | E5 |
| tests running | `work` | every 0.22 s while `running…` |
| patch recorded on budget bar | `store` | default |
| observation leaves tool | `send` | E6 |
| evidence docks at controller | `arrive` | G5 |
| controller checks the rules | `ack` × 3 | G5, spaced 0.25 s, quiet |
| decision `continue` | `ack` | G5, gain ×1.6 |
| evidence travels back along loop | `send` | G6, pan −0.6 |
| evidence reaches agent | `arrive` | C5 |
| all tests pass | `hit` | default, at controller |
| decision `stop · review` | `chime` | G5 |
| review badge pops | `deliver` | high (good outcome) |
| task switch | `clock` × 2 | default |
| pytest selects nothing | `miss` | at tool |
| exit 5 evidence docks | `thump` | at controller |
| decision `stop · handoff`, loop wire closes | `thump` | gain ×1.5, the loudest event of the cut |
| handoff badge pops | `deliver` | low |

## Beat sheet (times at speed 1)

Each beat has a visible state change beyond a moving packet, paired with a sound. Holds of 1.5–2.5 s follow each landing.

| t | what moves | state change | sound |
|---|---|---|---|
| **Beat 1 — Act (0.0–4.6)** | | | |
| 0.8 | agent pulses white | — | send C6 |
| 1.0–1.7 | chip `run tests` (accent) agent.bottom → tool.top, 0.7 s | — | — |
| 1.7 | ripple at tool.top | tool stroke → active white + glow; sublabel → `running…` accent | arrive E5 |
| 1.9–3.9 | — | tool glow held | work ticks ×9 |
| 4.0 | — | tool sublabel → `exit 1` red; glow off | — |
| **Beat 2 — Observe (4.6–7.3)** | | | |
| 4.6–5.3 | chip `exit 1 · 1 failed` (red) tool.bottom → controller.top, 0.7 s | — | send E6 |
| 5.3 | ripple at controller.top | controller sublabel → `exit 1 · 1 failed` red; controller glow | arrive G5 |
| 5.3–7.3 | hold | | |
| **Beat 3 — Decide: continue (7.3–12.0)** | | | |
| 7.3 / 7.55 / 7.8 | — | port0, port1, port2 brighten in turn (mid → fg, 0.2 s each) | ack ×3 |
| 8.3–8.8 | chevron pointer slides to port0 (`out` ease) | port0 → accent; label `continue` → accent | ack G5 (louder) |
| 8.9 | — | loop wire colour → accent, `flow` → 1 | send G6 (pan left) |
| 8.9–10.2 | chip `1 failed` (accent) controller.port0 → via → agent.left, 1.3 s | — | — |
| 10.2 | agent pulses | agent sublabel → `has the failure`; controller subColor → dim | arrive C5 |
| 10.6 | — | loop wire `flow` → 0, colour → resting (0.4 s) | — |
| 10.6–12.0 | hold | | |
| **Beat 4 — Act and observe again (12.0–18.0)** | | | |
| 12.0 | agent pulses | agent sublabel → `proposes the next step` | send C6 |
| 12.0–12.7 | chip `patch #1` (accent) agent → tool, 0.7 s | — | — |
| 12.7 | ripple at tool.top | budget seg0 → 0.333 (0.4 s), label → `patches 1/3`; tool active; sublabel `running…` | arrive E5, store |
| 12.9–14.9 | — | tool glow held | work ticks ×9 |
| 15.0 | — | tool sublabel → `exit 0` ok green | — |
| 15.6–16.3 | chip `exit 0 · 12 passed` (ok) tool → controller, 0.7 s | — | send E6 |
| 16.3 | ripple at controller.top (ok) | controller sublabel → `exit 0 · 12 passed` ok | arrive G5, hit |
| 16.3–18.0 | hold | | |
| **Beat 5 — Decide: stop · review (18.0–24.5)** | | | |
| 18.0 / 18.25 / 18.5 | — | ports brighten in turn | ack ×3 |
| 19.0–19.5 | pointer slides to port1 | port1 → ok; label `stop · review` → ok; port0 and `continue` → mid | chime G5 |
| 19.6 | badge pops with overshoot | badge text `review the patch`, ok | deliver (high) |
| 19.8 | — | loop wire alpha → 0.35 (nothing returns to the agent) | — |
| 19.8–22.5 | hold | | |
| 22.5 | task label pulses | `task A` → `task B`; badge scale → 0; budget seg0 → 0, label `patches 0/3`; controller sublabel cleared; ports and port labels → mid; pointer colour → dim; loop wire alpha → 1, resting colour; agent sublabel reset | clock ×2 |
| 23.2 | tool label pulses | tool label → `pytest -k dicsount` (mistyped selector) | — |
| **Beat 6 — Act, observe, decide: stop · handoff (24.5–33.5)** | | | |
| 24.5 | agent pulses | — | send C6 |
| 24.5–25.2 | chip `run tests` (accent) agent → tool | — | — |
| 25.2 | ripple at tool.top | tool active; sublabel `running…` | arrive E5 |
| 25.4–26.1 | — | glow held, shorter (nothing to run) | work ticks ×4 |
| 26.3 | — | tool sublabel → `exit 5` red | miss |
| 26.9–27.6 | chip `exit 5 · 0 selected` (red) tool → controller | — | send E6 |
| 27.6 | red ripple with × at controller.top | controller sublabel → `exit 5 · 0 selected` red | arrive G5 (quiet), thump |
| 28.3 / 28.55 / 28.8 | — | ports brighten in turn | ack ×3 |
| 29.3–29.8 | pointer slides to port2 | port2 → bad; label `stop · handoff` → bad | thump (loud) |
| 29.5 | — | loop wire `dashed` → 1, colour → bad (0.4 s) | — |
| 29.8 | — | agent alpha → 0.3 (not involved further); budget stays `patches 0/3` | — |
| 30.3 | badge pops | badge text `handoff · 0 selected`, bad | deliver (low) |
| 30.3–33.5 | hold | | |
| 33.5–34.3 | — | `s.fade` to black, 0.8 s | — |
| 35.5 | end | finite ending; the story ends in a new state, so no return to the opening frame | |

Playback at speed 0.88 gives ≈ 40 s.

## Accuracy limits

- Exit codes follow pytest's documented meanings: 0 success, 1 tests failed, 5 no tests collected. A matched collection with every test deselected by `-k` also yields exit 5; the chip says `0 selected` to match the concept's Task B. The chip does not distinguish "collected 12, selected 0" from "collected 0"; the write-up carries that distinction.
- "12 passed" and "1 failed" are the concept's illustrative counts, not measurements.
- The patch budget of three is the concept's teaching value, not a recommendation. The bar reaches only 1/3; budget exhaustion is not shown in this cut.
- Task B runs tests before any edit, so the budget stays at 0/3: this matches the concept's success criterion ("the no-tests run makes no product edit"). The cut implies, without stating, that the stop rule is "repair-only: missing evidence stops the run".
- The rule check (three `ack` blips lighting the ports) stands for the controller evaluating its stopping rules; it does not show which rule matched. The port the pointer reaches is the decision.
- Task A and Task B are separate runs in the concept and are presented as separate tasks here; they are not one continuous session.
- The mistyped selector `dicsount` is honest detail but may not be readable at 350 px. The `0 selected` chip carries the meaning regardless.
- No model capability, latency, or convergence is implied. The tool runs for a fixed on-screen time; nothing represents real duration.

## Acceptance checks

1. **Stills per beat** at playback seconds (speed 0.88): `2.0, 6.1, 10.5, 17.0, 22.3, 34.5` (≈ speed-1 times 1.75, 5.4, 9.3, 15.0, 19.7, 30.4). Tile with ffmpeg and view the row, then view the 22.3 s and 34.5 s stills at full size and scaled to 350 px wide. Pass when every label, port label, chip, and the budget label are readable at 350 px, the chevron pointer is visibly on one port, and the dashed red loop wire at 34.5 s is distinguishable from the lit accent loop wire at 10.5 s.
2. **No lingering state**: in the task-B stills, the review badge is gone, the budget reads `patches 0/3`, the controller sublabel is empty before 27.6 s (speed 1), and the agent is at full alpha until 29.8 s. In the final still, only the handoff badge, red dashed loop, dimmed agent, red port2, and `exit 5 · 0 selected` sublabel carry state.
3. **Overlap**: the `1 failed` chip travelling up the loop wire must not cross the agent or controller labels; the via points keep it at x = 120. The controller's docked sublabel must fit inside its 760 px box at 36 px mono (`exit 5 · 0 selected` is 20 characters).
4. **Word budget**: on-screen text is limited to node names, port labels, chips, exit codes, counts, and the two badges. No sentence appears.
5. **Audio**: the Node dry-run lists one cue per sound cell of the beat sheet (≈ 50 cues including work ticks). The spectrogram shows a sound on every beat landing, with the 29.3 s thump as the loudest event. `ffprobe` reports ≈ 40.3 s and an audio stream. Record whether audio was heard or only analysed.
6. **Causal reading test**: with sound off and every word removed, a viewer should still see: action down, evidence down, pointer chooses, return route lights (beats 1–3); pointer chooses the middle, badge, loop dims (beat 5); pointer chooses the right, loop turns dashed red, agent dims (beat 6).
7. **Project checks** after encoding: `python3 scripts/check_media.py --concept loop-engineering`, then the full set before any release proposal. A new encode needs its own comparison review.

