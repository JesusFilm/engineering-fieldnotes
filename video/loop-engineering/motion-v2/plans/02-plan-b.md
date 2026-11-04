# Lesson 02 — Use a specific failure — plan B

Independent plan for the motion-v2 cut of loop-engineering lesson 02. Authored from the lesson entry in `video/loop-engineering/sequence/lessons.json` (item 2) and the concept content in `content/concepts/loop-engineering.json`. No other plan for this lesson, no ledger, and no authoring source was consulted. This document names no authoring model.

## Scope

One mechanism: **a failing assertion names an input, an expected value, and an actual value; the agent turns that triple into one targeted code change, and the moment the code changes the earlier test results describe code that no longer exists, so the runner must produce fresh evidence.**

The viewer should feel two things: the pull from the red cell to one line of code (specific failure → specific repair), and the whole result set going stale the instant the patch lands (old evidence cannot vouch for new code).

Grounding (from the concept): the agent repairs a discount calculation; 12 selected tests run, one fails; a patch is made; the tests pass on rerun. The lesson's takeaway that the assertion is useful only when the relevant tests actually ran is carried by a small count under the grid (`12 ran`), kept visible throughout.

Out of scope for this cut: exit codes, empty selections, stop rules, patch budgets, handoff, no-progress detection, and review. Lesson 01 owns the decision point; later lessons own the rest. This cut ends on fresh evidence and stops there.

Grammar for this cut: **a test grid, a code pane, and an assertion card.** The grid is a 4 × 3 block of cells that light as tests run; the code pane is a two-row store whose second row is the expression under repair; the card is a three-row store that receives the failing input, expected, and actual values. The staleness state is a shift of the grid and card to dim amber with a `stale` badge, reversed by a rerun. This differs from lesson 01's vertical loop with a three-port controller and from the harness-engineering cut's boundary, sheet, graph, replay, and check views. Every element is a software object: a test cell, a line of code, an assertion's values.

Target length ≈ 31 s at playback. Authored at speed 1 for 28 s with `meta.speed: 0.9`. This sits under the 35–50 s guideline because the lesson has four beats and a single mechanism; lengthen the stale hold and the final hold first if the still check shows either reading too fast. Do not add beats to reach the guideline.

## Engine extension

Add a `grid` node type to a local copy of `scripts/flow-engine.js` beside the scene (named for its shape, reusable for shards, partitions, or any set of equal units):

- options: `cols`, `rows`, `cell` (side in px, default 84), `gap` (default 20), `label` (above), `sublabel` (below)
- animated props: `cell{i}` (stroke/fill colour), `cell{i}Fill` (0–1 fill opacity), `alpha`, `label`, `sublabel`, `subColor`
- anchors: `'id.cell7'` returns the centre of cell 7 (row-major); register half-size in `s.pt`

Report the extension with the cut. If the engine's packet chip text is below 40 px, add a `labelSize` option in the same local copy.

## Stage and coordinates (1080 × 1920)

Palette and type follow `references/style.md`. Minimum on-screen text is 36 px (sublabels, counts) and 40 px for names, code, and card rows, so everything stays readable at 350 px wide (≈ 12–13 px). Card and code rows are monospace at 40 px (≈ 24 px per character); the longest row is 21 characters ≈ 504 px.

| id | type | centre (x, y) | size | text | notes |
|---|---|---|---|---|---|
| title | title band | (540, 330) / (540, 405) | — | **Loop engineering** / USE A SPECIFIC FAILURE | engine title + subtitle |
| tests | grid, `cols 4 rows 3 cell 84 gap 20` | (300, 760) | 396 × 292 (x 102–498, y 614–906) | label `pytest -k discount` 40 px mono at (300, 556); sublabel count 36 px at (300, 960) | cells idle `#3A3E45`; cell 6 (row 2, col 3; centre ≈ (352, 760)) is the failing test |
| code | store, `rows 2`, w 540 | (800, 760) | 540 × ≈ 200 | label `code` 40 px at (800, 556); row0 `discount(total, rate)` mid; row1 `  total - rate` fg | row1 is the expression under repair |
| card | store, `rows 3`, w 760 | (540, 1250) | 760 × ≈ 260 | label `failing assertion` 40 px at (540, 1090); rows pop in during beat 2 | row0 `input     120, 0.25` mid · row1 `expected  90.00` ok · row2 `actual    119.75` bad |
| badge | badge | (900, 1130) | — | `stale` / `fresh` | top-right corner of the card; hidden (scale 0) until beat 3 |
| agent | box | (540, 1600) | 520 × 150 | label `agent` 44 px; sublabel 36 px | sublabel changes: `waiting` → `reads expected vs actual` → `patches one line` → `asks for a rerun` |

Wires (dotted, resting `#3A3E45`):

| id | from | to | via | meaning |
|---|---|---|---|---|
| fail | tests.cell6 (352, 760) | card.top (540, 1120) | [352, 1000] | the failing assertion leaves the grid |
| read | card.bottom (540, 1380) | agent.top (540, 1525) | — | the agent reads the card |
| patch | agent.right (800, 1600) | code.bottom (800, 860) | [960, 1600], [960, 980], [800, 980] | the targeted change goes to the code |
| rerun | agent.left (280, 1600) | tests.left (102, 760) | [60, 1600], [60, 760] | the changed code goes back to the runner |

The `fail` wire's via point at y = 1000 keeps it below the grid's count label (y = 960) and clear of the code pane. The `patch` wire runs at x = 960, inside the stage, right of the card (which ends at x = 920). The `rerun` wire runs at x = 60, outside the grid. Stage spans y ≈ 556–1675.

## Sound map

Pitches: runner **E5** (cells blip on E6 by column: col 0 E6, col 1 G6, col 2 C7, col 3 E6, quiet), card **G5**, agent **C5**, code **A5** (its own note so the patch landing is distinct). Pan by x: grid left (`pan −0.45`), code right (`+0.5`), card and agent centre.

| event | preset | notes |
|---|---|---|
| each test cell lights | `ack` | quiet, 0.18 s apart, pitch by column, pan left |
| failing cell | `miss` | low falling buzz, plus `s.shake` on the grid, pan left |
| assertion chip leaves cell | `send` | E6, pan left |
| card row pops | `store` | one per row; row2 (actual) adds `thump` |
| card → agent | `send` then `arrive` | G6 then C5 |
| patch leaves agent | `send` | C6 |
| code row swaps | `store` with `arrive` A5 | pan right |
| results go stale | `clock` × 2 | low, 0.5 s apart; the only time-passing sound in the cut |
| rerun chip leaves agent | `send` | C6, pan left |
| cells re-light | `ack` | as before |
| cell 6 passes | `hit` | sparkle, pan left |
| card actual row updates | `store` | |
| badge `fresh` | `chime` | the brightest event of the cut |

## Beat sheet (times at speed 1)

| t | what moves | state change | sound |
|---|---|---|---|
| **Beat 1 — Twelve tests run, one fails (0.0–7.5)** | | | |
| 0.0 | — | grid cells idle; sublabel `12 selected` mid; agent sublabel `waiting` | — |
| 0.8–2.8 | cells light in row-major order every 0.18 s | cell i → ok green, fill 1; cell 6 at 1.88 s → bad red instead | ack per cell; miss at 1.88 |
| 1.9 | grid jolts ±10 px, 0.4 s | — | (miss continues) |
| 2.9 | — | grid sublabel → `12 ran · 1 failed`, subColor bad | — |
| 2.9–5.0 | hold | | |
| **Beat 2 — Send the failing assertion to the agent (5.0–13.0)** | | | |
| 5.0 | cell 6 pulses | — | send E6 |
| 5.0–5.9 | chip `assert` (bad) tests.cell6 → via → card.top, 0.9 s | — | — |
| 5.9 | ripple at card.top | card row0 `input     120, 0.25` pops (alpha 0→1, 0.25 s) | store |
| 6.5 | — | row1 `expected  90.00` pops, ok | store |
| 7.1 | — | row2 `actual    119.75` pops, bad | store + thump |
| 7.1–8.6 | hold | the card is complete: input, expected, actual | |
| 8.6–9.2 | dot (bad) card.bottom → agent.top, 0.6 s | — | send G6 |
| 9.2 | agent pulses | agent sublabel → `reads expected vs actual` | arrive C5 |
| 9.2–11.0 | hold | | |
| **Beat 3 — Targeted repair; the evidence is now old (11.0–20.0)** | | | |
| 11.0 | agent pulses | agent sublabel → `patches one line` | send C6 |
| 11.0–12.2 | chip `patch` (accent) agent.right → via → code.bottom, 1.2 s | — | — |
| 12.2 | ripple at code.bottom; code row1 pulses accent | row1 text → `  total * (1 - rate)`, colour accent → fg over 0.6 s | arrive A5 + store |
| 13.0–13.6 | — | every grid cell colour → accent dimmed (`#7A5A1E`), fill 0.45; grid sublabel → `12 ran · before patch`, subColor accent; card rows → alpha 0.55; card stroke → accent | clock |
| 13.5 | — | badge pops `stale` accent at (900, 1130) | clock |
| 13.6–17.5 | hold (long, deliberate) | the agent sublabel reads `patches one line`; nothing moves | — |
| **Beat 4 — Return the changed code to the runner; fresh evidence (17.5–31.0)** | | | |
| 17.5 | agent pulses | agent sublabel → `asks for a rerun` | send C6 (pan left) |
| 17.5–18.8 | chip `run tests` (fg) agent.left → via → tests.left, 1.3 s | — | — |
| 18.8 | ripple at tests.left | all cells → idle grey, fill 0 (0.2 s); grid sublabel → `running` mid; badge `stale` scale → 0 | arrive E5 |
| 19.2–21.2 | cells light in row-major order every 0.18 s | cell i → ok, fill 1; cell 6 at 20.28 s also ok | ack per cell; hit at 20.28 |
| 21.4 | — | grid sublabel → `12 ran · 0 failed`, subColor ok; grid cells remain ok | — |
| 22.0 | — | card row2 text → `actual    90.00`, colour → ok; card rows alpha → 1; card stroke → ok | store |
| 22.6 | badge pops | badge `fresh` ok | chime |
| 22.6–26.0 | hold | final state: 12 green cells, `12 ran · 0 failed`, card shows input/expected/actual agreeing, code row1 fixed | — |
| 26.0–26.8 | — | `s.fade` to black, 0.8 s | — |
| 28.0 | end | finite ending | |

The end at 28.0 s (speed 1) plays ≈ 31 s at 0.9. If the still check shows the stale hold or final hold reading too fast, lengthen those holds first; the guideline length is secondary to the lesson.

## Accuracy limits

- The numbers are illustrative: `discount(120, 0.25)` expected `90.00`; the buggy expression `total - rate` gives `119.75` and `total * (1 - rate)` gives `90.00`. The arithmetic is correct for these inputs but the function, test count, and selector are teaching values, not a real codebase.
- `pytest -k discount` with 12 selected and 12 run is the concept's example. The grid shows selected tests only; the cut does not show collection, deselection, or skips, which belong to the empty-selection lesson.
- The card is a simplified rendering of an assertion message (input, expected, actual). Real pytest output includes a traceback and a diff; the cut keeps the three values the concept says to preserve.
- "Stale" is the library's framing of the lesson text ("the code changes; the evidence is now old") and the concept pitfall about accepting an earlier green result after another edit. It means the results describe a previous version of the code, not that the tests themselves became invalid.
- The rerun's all-green result is the concept's Task A outcome. The cut stops at fresh evidence and does not imply that passing permits merge, that one patch is typical, or any convergence property.
- Durations on screen (cells lighting at 0.18 s) do not represent real test timing.

## Acceptance checks

1. **Stills per beat** at playback seconds (speed 0.9): `3.3, 8.6, 10.5, 16.5, 24.0, 26.0` (speed-1 ≈ 3.0, 7.7, 9.5, 14.8, 21.6, 23.4). Tile with ffmpeg and view the row; then view the 16.5 s (stale) and 26.0 s (fresh) stills at full size and at 350 px wide. Pass when the twelve cells are individually distinguishable at 350 px, the red cell is unmistakable in the 3.3 s still, all three card rows are readable, the code row swap is legible, and the amber stale state is clearly different from both the green and idle states.
2. **The specific link**: at 10.5 s the card shows exactly three rows and the agent sublabel names expected vs actual. At 16.5 s the only element at full brightness is the code pane with its fixed row; grid and card are dimmed amber with the `stale` badge. Nothing else changes during the 13.6–17.5 hold.
3. **No lingering state**: at 18.8 s the `stale` badge is gone and every cell is idle before re-lighting; at the final still the card stroke, row2, grid sublabel, and badge all read ok green and the code row shows the fixed expression.
4. **Overlap**: the `assert` chip must not cross the `12 ran · 1 failed` count (chip path via y = 1000 passes below it); the `patch` chip at x = 960 must clear the card's right edge (920); the `run tests` chip at x = 60 must clear the grid's left edge (102). Card rows at 40 px mono fit inside 760 px (21 characters ≈ 504 px).
5. **Word budget**: on-screen text is names, the selector, two code rows, three card rows, counts, and two one-word badges. No sentence appears.
6. **Audio**: the Node dry-run lists ≈ 40 cues (24 cell blips, miss, hit, three stores, two clocks, sends, arrives, chime). The spectrogram shows a sound on each landing, the `miss` at 1.88 s and `chime` at 22.6 s standing out, and the two `clock` ticks visible in the otherwise silent stale hold. `ffprobe` reports ≈ 31 s with an audio stream. Record whether audio was heard or only analysed.
7. **Causal reading test**: with sound off and every word removed, a viewer should still see: cells light, one turns red; the red cell sends something to a card that fills in three rows; the card feeds the agent; the agent changes one row of code; the grid and card dim; the agent sends to the grid; cells re-light green; the card and badge turn green.
8. **Project checks** after encoding: `python3 scripts/check_media.py --concept loop-engineering`, then the full set before any release proposal. A new encode needs its own comparison review.

