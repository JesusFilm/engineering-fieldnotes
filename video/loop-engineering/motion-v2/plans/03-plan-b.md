# Lesson 03 — Stop after verified success — plan B

Independent plan for the motion-v2 cut of loop-engineering lesson 03. Authored from the lesson entry in `video/loop-engineering/sequence/lessons.json` (item 3) and the concept content in `content/concepts/loop-engineering.json`. No other plan for this lesson, no ledger, and no authoring source was consulted. This document names no authoring model.

## Scope

One mechanism: **success is a rule with named conditions (same selection, current revision, every selected test ran and passed); when fresh evidence satisfies every condition, the harness closes the edit lane and hands over the evidence for review.** The viewer should feel the rule filling in from evidence, the edit lane closing as a consequence, and the bundle of evidence leaving for a person. A short coda shows a further edit being refused, because an unrequested edit would make the handed-over evidence describe the wrong code.

Grounding (from the concept): Task A's rerun passes all 12 selected tests on the patched revision; "a passing selected suite permits review, not automatic merge"; the handoff ties patch, command, results, and stop reason together; stop conditions must be ones the model cannot override. The takeaway that passing supports the tested behaviour only is carried by scope being visible everywhere the result appears: the rule row names the selection, the handover row names the command, and the destination badge says `→ review`.

Out of scope: the failing assertion and repair (lesson 02), the decision point and empty selection (lesson 01), budgets, timeouts, no-progress detection, flaky reruns, and the reviewer's decision. The cut ends when the evidence reaches the reviewer and the extra edit is refused.

Grammar for this cut: **a run bar with twelve ticks, a three-row rule panel that ticks from evidence, a four-row handover bundle, and a closing edit lane.** The run is a `bar` with `ticks: 12` filling left to right with a mark at each completed test, which reads as "what actually ran" at a glance. The rule is a store whose rows gain a check and turn green. The handover is a store that assembles row by row and leaves as one chip to a laptop. The edit lane is a wire that turns dashed when the rule is met and then rejects a chip. This differs from lesson 01 (vertical loop, three-port controller) and lesson 02 (test grid, code pane, assertion card), and from the harness-engineering views. Every element is a software object: a run, a rule, an evidence bundle, a lane.

Target length ≈ 32 s at playback. Authored at speed 1 for ≈ 29 s with `meta.speed: 0.9`. This sits under the 35–50 s guideline because the lesson is four short beats plus a coda; lengthen the holds after the rule is met and after the handover arrives first if stills read fast. Do not add beats to reach the guideline.

## Stage and coordinates (1080 × 1920)

Palette and type follow `references/style.md`. Names and rule rows are 40 px (≈ 24 px per monospace character); sublabels, counts, and handover rows are 36 px (≈ 21.6 px per character). Everything stays readable at 350 px wide (≈ 12–13 px). If packet chip text renders below 40 px, add a `labelSize` option in the local engine copy and report it.

| id | type | centre (x, y) | size | text | notes |
|---|---|---|---|---|---|
| title | title band | (540, 330) / (540, 405) | — | **Loop engineering** / STOP AFTER VERIFIED SUCCESS | engine title + subtitle |
| rev | label | (540, 520) | 40 px mono, fg | `rev b2 · patch 1` | the repaired revision; never changes in this cut |
| run | bar, `ticks: 12`, `segments: 1` | (540, 640) | 720 × 16 (x 180–900) | label `pytest -k discount` 40 px mono at (540, 585) | `seg0` fills 0 → 1; `s.mark` at each tick |
| count | label | (540, 700) | 36 px, mid | `0 ran` → `12 ran · 12 passed` | what actually ran |
| rule | store, `rows: 3`, w 760 | (540, 960) | 760 × ≈ 260 (y ≈ 830–1090) | label `success rule` 40 px at (540, 800); rows 40 px mono | row0 `selection   -k discount` · row1 `revision    b2` · row2 `passed      12 of 12`; a leading `✓` is added when a row is satisfied (max 24 characters ≈ 576 px) |
| agent | box | (290, 1330) | 400 × 150 (x 90–490) | label `agent` 44 px; sublabel 36 px `editing` → `stopped` | |
| handover | store, `rows: 4`, w 480 | (800, 1340) | 480 × ≈ 300 (x 560–1040, y ≈ 1190–1490) | label `handover` 40 px at (800, 1160); rows 36 px mono | row0 `patch 1` · row1 `pytest -k discount` · row2 `12 of 12 passed` · row3 `stop: rule met` (max 18 characters ≈ 389 px) |
| reviewer | laptop | (760, 1680) | engine default | label `reviewer` 36 px below | |
| badge | badge | (960, 1680) | — | `→ review` | hidden (scale 0) until beat 4 |

Wires (dotted, resting `#3A3E45`):

| id | from | to | via | meaning |
|---|---|---|---|---|
| edit | agent.left (90, 1330) | run.left (180, 640) | [40, 1330], [40, 640] | the edit lane: the agent's route to a new revision and its run |
| report | run.bottom (540, 648) | rule.top (540, 830) | — | the run reports to the rule |
| stop | [300, 1090] | agent.top (290, 1255) | — | the rule's result reaches the agent |
| bundle | [780, 1090] | handover.top (800, 1190) | — | the rule's result and evidence reach the bundle |
| deliver | handover.bottom (800, 1490) | reviewer.top (760, 1630) | — | the bundle leaves for a person |

The `edit` wire runs in the left margin at x = 40, clear of the agent (left edge 90) and the rule panel (left edge 160). The `report` wire passes through the `count` label's row; the label sits at y = 700 and the wire's dots are dim, so the count must be checked for legibility in the still at 5.5 s. If it is not clear, shift `count` to (780, 700). The badge at x = 960 with a short text stays inside the frame; verify its right edge < 1060 in the still.

## Sound map

Pitches from one chord with one added note so each actor is identifiable: agent **C5**, run **E5** (ticks at E6), rule **G5**, handover **A5**, reviewer **C6**. Pan by x: agent left (`pan −0.45`), handover and reviewer right (`+0.45`), run and rule centre. The edit lane's refusal is panned hard left (`−0.8`) so it is heard off at the margin where it happens.

| event | preset | notes |
|---|---|---|
| revision label pulses | `ack` | C6, quiet |
| run request leaves agent | `send` | C6, pan left |
| run request lands | `arrive` | E5 |
| each test completes | `ack` | E6, quiet, every 0.183 s, 12 times |
| run reports | `send` then `arrive` | E6 then G5 |
| rule row satisfied | `ack` | G5; rows 0 and 1 |
| final rule row satisfied | `hit` | sparkle |
| rule met | `chime` | G5, the brightest event |
| stop reaches agent, edit lane closes | `arrive` C5 (gain ×0.6) then `poof` (gain ×0.5) | the lane closing is quiet, not a failure |
| evidence reaches bundle | `arrive` | A5, pan right |
| each handover row pops | `store` | pan right |
| bundle leaves | `send` | A6, pan right |
| bundle reaches reviewer | `arrive` then `deliver` (high) | C6, pan right |
| unrequested edit leaves | `send` | C6, quiet, pan left |
| edit refused | `thump` | gain ×1.2, pan −0.8, with `s.shake` on the agent; the one negative sound in the cut |

## Beat sheet (times at speed 1)

| t | what moves | state change | sound |
|---|---|---|---|
| **Beat 1 — Run the same checks against the repaired revision (0.0–7.0)** | | | |
| 0.0 | — | run bar empty; count `0 ran`; rule rows fg without checks; handover rows hidden (alpha 0); agent sublabel `editing` | — |
| 0.8 | `rev` label pulses | — | ack C6 |
| 1.2–2.6 | chip `run b2` (fg) agent.left → via → run.left, 1.4 s | — | send C6 |
| 2.6 | ripple at run.left | bar track → fg; label glow | arrive E5 |
| 2.8–5.0 | `seg0` 0 → 1 linear | an ok `s.mark` drops at each tick position as the fill passes it (12 marks) | ack E6 × 12 |
| 5.1 | — | count → `12 ran · 12 passed`, colour ok; seg0 colour → ok | — |
| 5.1–7.0 | hold | twelve marks sit on a full green bar | |
| **Beat 2 — The runner reports what ran; the rule fills in (7.0–12.5)** | | | |
| 7.0–7.7 | chip `12 of 12` (ok) run.bottom → rule.top, 0.7 s | — | send E6 |
| 7.7 | ripple at rule.top | rule stroke glows | arrive G5 |
| 8.3 | row0 pulses | row0 text → `✓ selection   -k discount`, colour ok | ack G5 |
| 8.9 | row1 pulses | row1 text → `✓ revision    b2`, colour ok; `rev` label pulses in sympathy | ack G5 |
| 9.5 | row2 pulses | row2 text → `✓ passed      12 of 12`, colour ok | hit |
| 9.9 | ok ripple with check at rule centre | rule stroke → ok | chime G5 |
| 9.9–12.5 | hold | three green rows, three checks | |
| **Beat 3 — Rule met: the edit lane closes (12.5–16.5)** | | | |
| 12.5–13.1 | dot (ok) [300, 1090] → agent.top, 0.6 s | — | — |
| 13.1 | agent pulses ok once | agent sublabel → `stopped`, subColor mid; agent stroke → mid; agent alpha → 0.7 | arrive C5 (quiet) |
| 13.4 | — | `edit` wire `dashed` → 1, colour → dim `#3A3E45` → `#2A2D33` (0.5 s) | poof (quiet) |
| 13.4–16.5 | hold | the lane is visibly closed; the revision label is unchanged | |
| **Beat 4 — Hand over the evidence (16.5–24.5)** | | | |
| 16.5–17.1 | dot (ok) [780, 1090] → handover.top, 0.6 s | — | — |
| 17.1 | ripple at handover.top | handover stroke glows | arrive A5 |
| 17.1 / 17.7 / 18.3 / 18.9 | rows pop (alpha 0 → 1, 0.25 s) | row0 `patch 1` · row1 `pytest -k discount` · row2 `12 of 12 passed` · row3 `stop: rule met` | store × 4 |
| 19.1 | — | handover stroke → ok | — |
| 19.9–20.6 | chip `handover` (ok) handover.bottom → reviewer.top, 0.7 s | — | send A6 |
| 20.6 | ripple at reviewer | laptop colour → ok, glow | arrive C6 |
| 20.9 | badge pops with overshoot | badge `→ review`, ok | deliver (high) |
| 20.9–24.5 | hold | final good state: full bar, green rule, assembled bundle, lit reviewer, `→ review` | |
| **Beat 5 — Coda: an unrequested edit is refused (24.5–29.0)** | | | |
| 24.5 | agent pulses accent | — | send C6 (quiet, left) |
| 24.5–24.9 | chip `patch 2` (accent) agent.left → [40, 1330], 0.4 s, fades at the end | — | — |
| 24.9 | red ripple with × at (40, 1330); agent shakes ±8 px, 0.35 s | — | thump (pan −0.8) |
| 25.3 | `rev` label pulses | still `rev b2 · patch 1`: the handed-over evidence still describes the current code | ack C6 (quiet) |
| 25.3–27.8 | hold | | |
| 27.8–28.6 | — | `s.fade` to black, 0.8 s | — |
| 29.0 | end | finite ending | |

## Accuracy limits

- The success rule's three conditions are the library's rendering of the concept's judgement ("require evidence for the current patch, preserve the test selection", "a passing selected suite permits review"). Real harnesses may use more or fewer conditions; three is the smallest set that makes the lesson visible.
- `12 of 12`, `rev b2`, `patch 1`, and `pytest -k discount` are the concept's illustrative values. The bar's twelve ticks represent executed selected tests; the cut does not show collection, deselection, or skips.
- The run's filling time is fixed on screen and does not represent real test duration.
- `→ review` is the stop route for success. The cut does not show merging, the reviewer's decision, or any claim that passing makes the code correct. The takeaway (passing supports the tested behaviour only) is implied by scope appearing in the rule row, the handover row, and the destination; it is stated in the write-up.
- The refused `patch 2` is a teaching coda derived from the lesson text ("unrequested edits add uncertainty") and the concept outcome "stop conditions that the model cannot override". It shows the harness refusing an edit after the stop; it does not represent any particular agent's behaviour.
- The quiet `poof` for the lane closing is a reuse of a preset whose documented meaning is eviction; here it marks a route being retired after success, and it is kept quiet so it does not read as a failure. Note the reuse in the hand-over.

## Acceptance checks

1. **Stills per beat** at playback seconds (speed 0.9): `5.5, 11.5, 15.5, 23.0, 26.5, 29.5` (speed-1 ≈ 5.0, 10.4, 14.0, 20.7, 23.9, 26.6). Tile with ffmpeg and view the row; view the 11.5 s and 23.0 s stills at full size and at 350 px wide. Pass when the twelve marks on the bar are individually distinguishable at 350 px, the three ✓ rows are readable, the four handover rows are readable, the badge text is readable and fully inside the frame, and the dashed edit lane at 15.5 s is clearly different from the dotted lane at 5.5 s.
2. **Count legibility**: in the 5.5 s still the `12 ran · 12 passed` label must be readable over the `report` wire's dots at 350 px; if not, move `count` to (780, 700) and re-check.
3. **Consequence order**: in the 15.5 s still the rule is green and the edit lane is dashed, the agent reads `stopped`, and the handover rows are still hidden. Nothing on the right side changes before 16.5 s (speed 1).
4. **No lingering state**: the `patch 2` chip is gone by 25.2 s (speed 1); the `rev` label text is identical in the first and last stills; no mark or ripple from the run remains over the rule panel.
5. **Overlap**: the `run b2` and `patch 2` chips at x = 40 must clear the agent's left edge (90); the `handover` chip must not cross the `reviewer` label; the rule rows at 40 px mono (24 characters ≈ 576 px) and handover rows at 36 px mono (18 characters ≈ 389 px) fit inside their panels with padding.
6. **Word budget**: on-screen text is names, the selector, the revision label, the count, three rule rows, four handover rows, and one badge. No sentence appears.
7. **Audio**: the Node dry-run lists ≈ 35 cues (12 run ticks, the chime, four stores, the thump, sends and arrives). The spectrogram shows a sound on each landing, the `chime` at 9.9 s as the brightest event and the `thump` at 24.9 s as the one low negative hit, with the 13.4 s `poof` audible but quiet. `ffprobe` reports ≈ 32 s with an audio stream. Record whether audio was heard or only analysed.
8. **Causal reading test**: with sound off and every word removed, a viewer should still see: something travels from the left box to the bar; the bar fills with twelve marks; the bar reports down to a panel whose three rows turn green one by one; a dot goes to the left box, which dims, and its lane turns dashed; a dot goes to the right panel, which fills four rows and sends one thing down to a laptop that lights with a badge; the left box tries to send again and is stopped at the margin.
9. **Project checks** after encoding: `python3 scripts/check_media.py --concept loop-engineering`, then the full set before any release proposal. A new encode needs its own comparison review.

