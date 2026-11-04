# Lesson 04 — No tests is not a pass — plan B

Independent plan for the motion-v2 cut of loop-engineering lesson 04. Authored from the lesson entry in `video/loop-engineering/sequence/lessons.json` (item 4) and the concept content in `content/concepts/loop-engineering.json`. No other plan for this lesson, no ledger, and no authoring source was consulted. This document names no authoring model.

## Scope

One mechanism: **a test run produces several counts (collected, selected, ran, failed), and only the executed count can support a pass; "0 failed" with "0 ran" is an empty result, which a repair-only harness classifies as a selection problem, stops editing, and hands to an engineer with the command and the selection output.**

The viewer should feel the trap and its release: the `failed` counter reads 0 in green and looks like success for a moment, then goes grey as the `ran` counter beside it asserts 0. The takeaway (assertion failure, collection error, and no tests selected need different next actions) is carried by a three-row outcome table in which the evidence lights exactly one row.

Grounding (from the concept): Task B uses a mistyped keyword selector; pytest collects the tests but `-k` deselects every one, producing exit 5; the walkthrough says to distinguish collected, selected, executed, and skipped counts and that a numeric exit code alone cannot show the intended checks ran; absent tests stop a repair-only run with the evidence preserved for a person.

Out of scope: the decision point as a generic controller (lesson 01), assertion repair (lesson 02), the success rule and handover of a passing run (lesson 03), budgets, timeouts, flaky reruns, and any rerun after the selector is fixed. The cut ends with the selector corrected by the engineer and the counters reset, before any new run.

Grammar for this cut: **a four-stage counter pipeline, a typo underline, an outcome table, and an evidence bundle to a phone.** The pipeline is four boxes whose big number is the label and whose name is the sublabel, joined by short wires that light in sequence. The underline is a thin red `bar` that draws under the mistyped part of the command when the selection comes back empty. The outcome table is a store with three rows, one per outcome class, each naming its next action. This differs from lesson 01 (vertical loop, three-port controller), lesson 02 (test grid, code pane, assertion card), lesson 03 (run bar with ticks, rule panel, handover bundle), and the harness-engineering views. Every element is a software object: a command line, a counter, a table row, an evidence record.

Target length ≈ 30 s at playback. Authored at speed 1 for 27 s with `meta.speed: 0.9`. This sits under the 35–50 s guideline because the lesson is four short beats; lengthen the hold on the green `0 failed` and the hold on the lit outcome row first if stills read fast. Do not add beats to reach the guideline.

## Stage and coordinates (1080 × 1920)

Palette and type follow `references/style.md`. Counter numbers are 64 px; names, command, and table rows are 40 px (monospace ≈ 24 px per character); sublabels and evidence rows are 36 px (≈ 21.6 px per character). Everything stays readable at 350 px wide (≈ 12–13 px for the smallest). If packet chip text renders below 40 px, add a `labelSize` option in the local engine copy and report it.

| id | type | centre (x, y) | size | text | notes |
|---|---|---|---|---|---|
| title | title band | (540, 330) / (540, 405) | — | **Loop engineering** / NO TESTS IS NOT A PASS | engine title + subtitle |
| cmd | label | (540, 520) | 40 px mono, fg | `pytest -k dicsount` → later `pytest -k discount` | 18 characters ≈ 432 px, spanning x ≈ 324–756; the selector word occupies x ≈ 564–756 |
| typo | bar, `segments: 1`, no ticks | (660, 552) | 192 × 6 | — | track alpha 0; `seg0` 0 → 1 in bad draws the underline under `dicsount` |
| c0 | box, `labelSize 64` | (180, 760) | 200 × 150 | label `–` → `12`; sublabel `collected` | |
| c1 | box, `labelSize 64` | (420, 760) | 200 × 150 | label `–` → `0`; sublabel `selected` | turns bad |
| c2 | box, `labelSize 64` | (660, 760) | 200 × 150 | label `–` → `0`; sublabel `ran` | turns bad |
| c3 | box, `labelSize 64` | (900, 760) | 200 × 150 | label `–` → `0`; sublabel `failed` | turns ok, then mid |
| outcomes | store, `rows: 3`, w 820 | (540, 1140) | 820 × ≈ 260 (x 130–950, y ≈ 1010–1270) | label `outcome → next action` 40 px at (540, 980); rows 40 px mono | row0 `assertion fail → patch` · row1 `collect error  → setup` · row2 `0 selected     → selector` (max 25 characters ≈ 600 px) |
| agent | box | (250, 1490) | 340 × 150 (x 80–420) | label `agent` 44 px; sublabel 36 px `editing` → `stopped · no edit` | |
| evidence | store, `rows: 4`, w 460 | (690, 1500) | 460 × ≈ 300 (x 460–920, y ≈ 1350–1650) | label `evidence` 40 px at (690, 1320); rows 36 px mono | row0 `pytest -k dicsount` · row1 `collected 12` · row2 `selected 0` · row3 `exit 5` (max 18 characters ≈ 389 px) |
| engineer | phone | (1010, 1500) | engine default | label `engineer` 36 px below at (1010, 1580) | |
| badge | badge | (1010, 1640) | — | `→ engineer` | hidden (scale 0) until beat 4; verify right edge < 1070 |

Wires (dotted, resting `#3A3E45`):

| id | from | to | via | meaning |
|---|---|---|---|---|
| p01 | c0.right (280, 760) | c1.left (320, 760) | — | collected feeds selected |
| p12 | c1.right (520, 760) | c2.left (560, 760) | — | selected feeds ran |
| p23 | c2.right (760, 760) | c3.left (800, 760) | — | ran feeds failed |
| report | c1.bottom (420, 835) | outcomes.top (540, 1010) | [420, 930] | the empty selection is reported |
| stop | [300, 1270] | agent.top (250, 1415) | — | the classification reaches the agent |
| keep | [700, 1270] | evidence.top (690, 1350) | — | command and selection output are kept |
| hand | evidence.right (920, 1500) | engineer.left (≈ 975, 1500) | — | evidence goes to a person |

The pipeline wires are 40 px long; they carry no packets and light with `flow` to show the count passing along. The `report` wire leaves c1 (the stage where the count collapses) rather than c3, so the eye reads the cause. The `hand` wire is short; its chip is small and quick. Stage spans y ≈ 520–1660.

## Sound map

Pitches: counters **E5** (collect ticks at E6), outcome table **G5**, agent **C5**, evidence **A5**, engineer **C6**. Pan by x: c0 left (`−0.6`) through c3 right (`+0.6`); agent left; evidence and engineer right.

| event | preset | notes |
|---|---|---|
| command appears | `ack` | C6, quiet |
| collected counts up | `ack` | E6, quiet, every 0.1 s, 12 times, pan left |
| count passes to the next stage | `send` | E6, quiet, per wire |
| selected collapses to 0 | `miss` | low falling buzz; with `s.shake` on c1 and the underline drawing |
| ran shows 0 | `thump` | quiet (gain ×0.6) |
| failed shows 0 in green | `hit` | the deceptive sparkle; full gain |
| the green goes grey | `poof` | quiet; the apparent pass evaporates |
| report leaves c1 | `send` | E6 |
| report reaches the table | `arrive` | G5 |
| rows 0 and 1 checked and dismissed | `ack` | G5, quiet |
| row 2 matches | `thump` | gain ×1.3, pan centre; the loudest event |
| stop reaches agent | `arrive` C5 (gain ×0.6) then `poof` (gain ×0.5) | edit route retired |
| evidence rows pop | `store` | pan right, ×4 |
| evidence leaves and lands | `send` A6, `arrive` C6, `deliver` (low-mid) | pan right |
| selector corrected | `chime` | C6; the one bright positive sound |
| counters reset | `clock` | one tick |

## Beat sheet (times at speed 1)

| t | what moves | state change | sound |
|---|---|---|---|
| **Beat 1 — A selector matches no tests (0.0–7.5)** | | | |
| 0.0 | — | `cmd` shows `pytest -k dicsount`; counters show `–` in mid; table rows fg; evidence rows hidden; agent sublabel `editing` | — |
| 0.8 | `cmd` pulses | — | ack C6 |
| 1.4–2.6 | c0 label counts `0` → `12` (12 text swaps, 0.1 s apart) | c0 stroke → fg | ack E6 × 12 |
| 2.9 | `p01` `flow` → 1 for 0.4 s | — | send |
| 3.4 | c1 shakes ±8 px | c1 label → `0`, colour bad; stroke bad | miss |
| 3.5–3.9 | `typo` `seg0` 0 → 1, bad | the underline appears under `dicsount` | (miss decays) |
| 4.2 | `p12` `flow` → 1 for 0.4 s | — | send |
| 4.7 | — | c2 label → `0`, colour bad; stroke bad | thump (quiet) |
| 5.0 | `p23` `flow` → 1 for 0.4 s | — | send |
| 5.5 | c3 pulses ok | c3 label → `0`, colour ok; stroke ok with glow | hit |
| 5.5–7.5 | hold | the green `0 failed` sits beside the red `0 ran` | |
| **Beat 2 — The empty selection cannot be a pass (7.5–13.0)** | | | |
| 7.5 | c2 pulses bad | — | — |
| 7.6–8.2 | — | c3 label colour ok → mid, stroke → mid, glow off (0.6 s) | poof (quiet) |
| 8.4–9.3 | chip `exit 5 · 0 selected` (bad) c1.bottom → via → outcomes.top, 0.9 s | — | send E6 |
| 9.3 | ripple at outcomes.top | table stroke glows | arrive G5 |
| 9.7 | row0 flashes fg | row0 colour → dim `#3A3E45` | ack G5 |
| 10.1 | row1 flashes fg | row1 colour → dim | ack G5 |
| 10.5 | row2 pulses | row2 colour → bad; bad ripple with × at table centre | thump (loud) |
| 10.5–13.0 | hold | one red row: `0 selected → selector` | |
| **Beat 3 — This policy stops code edits; keep the evidence (13.0–18.8)** | | | |
| 13.0–13.6 | dot (bad) [300, 1270] → agent.top, 0.6 s | — | — |
| 13.6 | agent pulses once | agent sublabel → `stopped · no edit`, subColor mid; agent alpha → 0.7; stroke → mid | arrive C5 (quiet) then poof (quiet) |
| 14.4–15.0 | dot (fg) [700, 1270] → evidence.top, 0.6 s | — | — |
| 15.0 | ripple at evidence.top | evidence stroke glows | arrive A5 |
| 15.0 / 15.6 / 16.2 / 16.8 | rows pop (alpha 0 → 1, 0.25 s) | row0 `pytest -k dicsount` · row1 `collected 12` · row2 `selected 0` · row3 `exit 5` | store × 4 |
| 17.0 | — | evidence stroke → fg | — |
| 17.0–18.8 | hold | | |
| **Beat 4 — Hand to an engineer; repair the selector (18.8–27.0)** | | | |
| 18.8–19.3 | chip `evidence` (fg) evidence.right → engineer.left, 0.5 s | — | send A6 |
| 19.3 | ripple at engineer | phone colour → accent, glow | arrive C6 |
| 19.6 | badge pops with overshoot | badge `→ engineer`, accent | deliver (low-mid) |
| 19.6–21.8 | hold | | |
| 21.8 | `cmd` pulses ok | `cmd` text → `pytest -k discount`; `typo` `seg0` → 0 (0.4 s); ok ripple at (660, 552) | chime C6 |
| 22.6 | — | c0–c3 labels → `–`, colours and strokes → mid; pipeline wires resting | clock |
| 22.6–25.5 | hold | corrected command, idle counters, red outcome row, kept evidence, lit engineer | |
| 25.5–26.3 | — | `s.fade` to black, 0.8 s | — |
| 27.0 | end | finite ending; nothing is rerun in this cut | |

## Accuracy limits

- The counts follow pytest's documented behaviour: a mismatched `-k` expression can collect tests and deselect every one, and a run with no tests collected or selected exits 5. The cut shows `collected 12 · selected 0` to match the concept's Task B; it does not show the "collected 0" variant, a collection error, or skips, which the outcome table names but does not demonstrate.
- The pipeline's stages (collected → selected → ran → failed) are a teaching reduction of pytest's summary. The exact wording and ordering of a real summary line differ.
- `pytest -k dicsount`, `12`, and the discount example are the concept's illustrative values.
- The outcome table's three rows and their next actions are the library's rendering of the concept's routing ("reproduced assertion failure → another patch", "absent tests, command errors, or unavailable dependencies → preserve evidence and stop"). Real policies may have more classes; the three are the lesson's takeaway set.
- The green `0 failed` is staged as the trap the lesson warns about. It represents how the number reads to a careless observer; it does not claim that pytest reports it as a pass.
- The selector correction in beat 4 is performed by the engineer after the handoff, as the lesson text says ("repair the test setup before continuing"). The cut does not show a rerun or any result for the corrected selector.
- The quiet `poof` reuses an eviction preset to mark the apparent pass disappearing and the edit route being retired; it is kept quiet so it does not read as a failure. Note the reuse in the hand-over.

## Acceptance checks

1. **Stills per beat** at playback seconds (speed 0.9): `7.0, 12.5, 17.0, 20.0, 25.5, 29.5` (speed-1 ≈ 6.3, 11.3, 15.3, 18.0, 23.0, 26.5). Tile with ffmpeg and view the row; view the 7.0 s (green trap) and 12.5 s (lit row) stills at full size and at 350 px wide. Pass when all four counter numbers and names are readable at 350 px, the red underline under `dicsount` is visible, the green `0` in c3 is clearly green while c1 and c2 are clearly red at 7.0 s, the three table rows are readable with exactly one red at 12.5 s, and the four evidence rows are readable at 20.0 s.
2. **The trap and its release**: at 7.0 s c3 is ok green with glow; at 12.5 s c3 is mid grey with no glow while c1 and c2 remain red. The transition happens before the report chip leaves (speed-1 7.6–8.2 s precedes 8.4 s).
3. **Cause before consequence**: the underline appears at 3.5 s (speed 1), after c1 collapses and before c2 and c3 update; in the 7.0 s still both the underline and all four counts are present.
4. **No lingering state**: at the final still the underline is gone and `cmd` reads `discount`; all counters read `–` in mid; the table's row2 is still red and rows 0–1 dim; the evidence rows and the `→ engineer` badge remain. Nothing else carries state.
5. **Overlap**: the `exit 5 · 0 selected` chip's path at x = 420 then toward (540, 1010) must not cross the `outcome → next action` label at y = 980 except at its arrival; if it does, move the label to (540, 965). The `evidence` chip must stay inside x ≤ 975. The badge's right edge must be < 1070. Table rows at 40 px mono (25 characters ≈ 600 px) fit inside 820 px with padding; evidence rows at 36 px mono (18 characters ≈ 389 px) fit inside 460 px.
6. **Word budget**: on-screen text is the command, counter numbers and names, the table label and three rows, the agent's sublabel, four evidence rows, the engineer label, and one badge. No sentence appears.
7. **Audio**: the Node dry-run lists ≈ 40 cues (12 collect ticks, 3 sends along the pipeline, miss, quiet thump, hit, poof, send/arrive, 2 acks, loud thump, arrive/poof, 4 stores, send/arrive/deliver, chime, clock). The spectrogram shows the `hit` at 5.5 s, the `thump` at 10.5 s as the loudest event, and the `chime` at 21.8 s, with a sound on every landing. `ffprobe` reports ≈ 30 s with an audio stream. Record whether audio was heard or only analysed.
8. **Causal reading test**: with sound off and every word removed, a viewer should still see: the first box counts up; the second collapses red and a red line appears under the command; the third goes red; the fourth goes green; the green fades to grey; something leaves the second box for a table where one row turns red; a dot dims the left box; a dot fills the right panel row by row; the right panel sends to a phone that lights with a badge; the red line under the command disappears and the four boxes reset.
9. **Project checks** after encoding: `python3 scripts/check_media.py --concept loop-engineering`, then the full set before any release proposal. A new encode needs its own comparison review.

