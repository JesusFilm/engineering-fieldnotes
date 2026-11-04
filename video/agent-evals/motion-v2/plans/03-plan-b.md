# Lesson 03 — Catch an overbroad fix — plan B

Independent plan for the motion-v2 cut of agent-evals lesson 03. Authored from the lesson entry in `video/agent-evals/sequence/lessons.json` (item 3) and the concept content in `content/concepts/agent-evals.json`. No other plan for this lesson, no ledger, and no authoring source was consulted. This document names no authoring model.

## Scope

One mechanism: **a patch that rejects every login satisfies the new-requirement case and fails the behaviour-must-remain case; when both cases are in the grader's set, the comparison of expected and actual per row gives one check and one ×, and the verdict is rejection, which a grader with only the new case would have missed.**

The viewer should feel the sameness of the patch's output and the difference in what was expected: the `patch A` column fills with `reject` twice from one line of code; the `expected` column arrives as `reject` then `accept`; row one matches, row two does not; a `narrow: pass` badge is refused and the verdict row turns red.

Grounding (from the concept): "Patch A rejects every login. It passes the new empty-password test but fails an existing valid-password test"; "optimizing only the new test rewards a patch that disables every login; preserve regression checks"; "write a task with observable success criteria and at least one behavior that must remain unchanged"; the exercise: "create a deliberately bad candidate that passes only the new requirement; confirm your grader rejects it."

Out of scope: the good patch B and comparison between patches (a later lesson), how the agent produced patch A, the grading vocabulary and system frame (lesson 01), the probe mechanics of running a single case (lesson 02), and environment failures. The cut ends with patch A rejected.

Grammar for this cut: **a patch card above, a 2 × 2 outcome matrix with row labels for the cases and column headers for expected and actual, marks at the end of each row, and a grader verdict card below.** The patch's one line feeds the actual column; the expected cells come from the task's criteria; the marks are the per-row comparison. This differs from lesson 01 (a stacked evaluation record with a system frame) and lesson 02 (a probe through the function with one expected/actual pair), from the guardrails cut that used a 2 × 2 permission grid (identities × operations, with cells as grants rather than observed values and a deploy service below), from the other topics' cuts, and from the harness-engineering views. Every element is a software object: a patch, a test case, an expected value, an observed value, a verdict.

Target length ≈ 34 s at playback. Authored at speed 1 for 31 s with `meta.speed: 0.9`. Lengthen the hold on the mismatch row and the hold after the verdict first if stills read fast. Do not add beats to reach the guideline.

## Engine extension

The matrix uses the `grid` node type (cells in rows and columns with per-cell colour and fill) with a per-cell `text` prop (`cell{i}Text`) at 36 px, added in a local copy of `scripts/flow-engine.js`. Anchors `'id.cell{i}'` give cell centres. Report the extension with the cut. If packet chip text renders below 40 px, add a `labelSize` option in the same local copy.

## Stage and coordinates (1080 × 1920)

Palette and type follow `references/style.md`. Names are 40–44 px; store rows, cell text, headers, and row labels are 36 px monospace (≈ 21.6 px per character). Everything stays readable at 350 px wide (≈ 12–13 px for the smallest).

| id | type | centre (x, y) | size | text | notes |
|---|---|---|---|---|---|
| title | title band | (540, 330) / (540, 405) | — | **Agent evals** / CATCH AN OVERBROAD FIX | engine title + subtitle |
| patch | store, `rows: 2`, w 560 | (540, 580) | 560 × ≈ 140 (x 260–820, y ≈ 510–650) | label `patch A` 40 px at (540, 470); rows 36 px mono | row0 `login(user, pw):` · row1 `  return reject` accent (the whole fix) |
| colE / colA | label | (525, 810) / (755, 810) | 36 px mono, mid | `expected` / `patch A` | column headers |
| rowEmpty / rowValid | label | (280, 895) / (280, 1005) | 36 px mono | `empty pw` / `valid pw` | row labels (right-aligned to x ≈ 395 if supported) |
| grid | grid, `cols 2 rows 2 cell 220×90 gap 20` | (640, 950) | 460 × 200 (x 410–870, y 850–1050); cell centres (525, 895), (755, 895), (525, 1005), (755, 1005) | cell texts 36 px mono | cell0 expected/empty `—` → `reject` accent · cell1 actual/empty `—` → `reject` mid → ok · cell2 expected/valid `—` → `accept` accent · cell3 actual/valid `—` → `reject` mid → bad |
| grader | store, `rows: 2`, w 620 | (540, 1300) | 620 × ≈ 140 (x 230–850, y ≈ 1230–1370) | label `grader` 40 px at (540, 1190); rows 36 px mono | row0 `cases passed  —` → `cases passed  1 of 2` · row1 `verdict       —` → `verdict       rejected` bad |
| badge | badge | (850, 1190) | — | `narrow: pass` mid | right of the grader label; appears and is refused in beat 4 |

Row marks land at (905, 895) and (905, 1005), just right of the grid.

Wires (dotted, resting `#3A3E45`):

| id | from | to | via | meaning |
|---|---|---|---|---|
| apply | patch.bottom (540, 650) | grid column `patch A` top (755, 850) | [540, 740], [755, 740] | the patch's behaviour fills the actual column |
| grade | grid.bottom (640, 1050) | grader.top (540, 1230) | [640, 1140], [540, 1140] | the row results go to the grader |

The expected cells have no wire: they are the task's criteria, placed into the matrix. Stage spans y ≈ 470–1370.

## Sound map

Pitches: patch **E5**, matrix **G5** (expected cells on G5, actual cells on E5 so the two columns are heard apart), grader **C5**. Pan by x: the expected column slightly left (`−0.2`), the actual column slightly right (`+0.2`), row labels left (`−0.5`), the rest centre.

| event | preset | notes |
|---|---|---|
| patch rows appear | `store` | E5; the `return reject` row adds `ack` E5 |
| actual cells fill from the patch | `send` E6, `store` E5 ×2 | the same value twice |
| a row label is called | `ack` | G5, quiet, pan left |
| an expected cell fills | `store` | G5 |
| a row matches | `hit` | green check |
| a row does not match | `thump` | gain ×1.3; red ×; the loudest event |
| results go to the grader | `send` G6, `arrive` C5 | |
| badge `narrow: pass` | `ack` | mid, quiet |
| badge refused | `miss` | gain ×0.6; grey × on the badge |
| grader rows fill | `store` | C5; the verdict row adds `thump` (gain ×0.7) |
| patch rejected | `ack` | E5, low gain; the patch card's stroke turns bad |

## Beat sheet (times at speed 1)

| t | what moves | state change | sound |
|---|---|---|---|
| **Beat 1 — Patch A rejects every login (0.0–8.0)** | | | |
| 0.0 | — | patch rows hidden; grid cells `—` dim; grader rows `—`; badge hidden | — |
| 0.6 / 1.0 | patch rows pop | `login(user, pw):` · `  return reject` accent | store E5 ×2, ack E5 |
| 1.8 | patch row1 pulses | one line that answers every input the same way | — |
| 2.6–3.4 | chip `reject` (mid) patch.bottom → via → cell1 top, 0.8 s | — | send E6 |
| 3.4 | ripple at cell1 | cell1 → `reject` mid | store E5 |
| 3.8–4.6 | chip `reject` (mid) patch.bottom → via → cell3 top, 0.8 s (via the same path, continuing down the column to cell3) | — | send E6 |
| 4.6 | ripple at cell3 | cell3 → `reject` mid | store E5 |
| 4.6–8.0 | hold | the actual column reads the same word twice; the expected column is empty | |
| **Beat 2 — The empty-password expectation passes (8.0–13.5)** | | | |
| 8.0 | `empty pw` row label pulses | — | ack G5 (quiet) |
| 8.6 | cell0 fills | `reject` accent | store G5 |
| 9.4 | cell0 and cell1 flash together | compared | — |
| 9.8 | ok ripple with check at (905, 895) | cell1 → ok | hit |
| 9.8–13.5 | hold | row one agrees | |
| **Beat 3 — The valid-password expectation fails (13.5–21.0)** | | | |
| 13.5 | `valid pw` row label pulses | — | ack G5 (quiet) |
| 14.1 | cell2 fills | `accept` accent | store G5 |
| 14.9 | cell2 and cell3 flash together | compared | — |
| 15.3 | bad ripple with × at (905, 1005); grid shakes ±6 px | cell3 → bad | thump (loud) |
| 15.3–21.0 | hold (long) | `accept` beside `reject`: the behaviour that had to remain valid is gone | |
| **Beat 4 — The grader rejects the overbroad fix (21.0–31.0)** | | | |
| 21.0–22.0 | chip `1 ✓ · 1 ✗` (fg) grid.bottom → via → grader.top, 1.0 s | — | send G6 |
| 22.0 | ripple at grader.top | grader stroke glows | arrive C5 |
| 22.6 | badge pops | `narrow: pass` mid: what a grader with only row one would say | ack (mid, quiet) |
| 23.4 | grey ripple with × over the badge; badge scale → 0 | — | miss (quiet) |
| 24.0 | grader row0 fills | `cases passed  1 of 2` fg | store C5 |
| 24.6 | grader row1 fills and pulses | `verdict       rejected` bad; grader stroke → bad | store C5, thump (quiet) |
| 25.2 | patch card pulses | patch stroke → bad | ack E5 (low) |
| 25.2–29.5 | hold | final state: a one-line patch marked bad, a matrix with one check and one ×, a grader reading `1 of 2` and `rejected` | |
| 29.5–30.3 | — | `s.fade` to black, 0.8 s | — |
| 31.0 | end | finite ending | |

## Accuracy limits

- The patch body, cases, and values are illustrative, drawn from the concept's authentication example; the concept says the two cases are "deliberately incomplete authentication coverage". `return reject` is a teaching simplification of a patch that rejects every login.
- The actual column is filled from the patch as two chips carrying the same value, to show that one change answers both inputs identically. In a real evaluation each cell comes from executing a test; lesson 02 shows that probe.
- The expected cells are the task's criteria (lesson 01) and are placed without a wire. The cut does not show where the valid-password case was recorded or that it existed before the patch.
- `narrow: pass` depicts a grader that counted only the new case; it is a hypothetical, refused on screen. The concept's pitfall is the motivation; the cut does not claim any particular grader behaves this way.
- The verdict is `rejected` because a required case failed; the concept's judgement that an authentication failure must not be averaged away with other qualities is in the write-up.
- The good patch B is not shown; this lesson is the failing half of the concept's example.
- No `poof` is used. The loud `thump` marks the row mismatch; the quiet `thump` marks the verdict; the quiet `miss` marks the refused badge.

## Acceptance checks

1. **Stills per beat** at playback seconds (speed 0.9): `7.0, 12.5, 18.5, 25.5, 30.0, 33.0` (speed-1 ≈ 6.3, 11.3, 16.7, 23.0, 27.0, 29.7). Tile with ffmpeg and view the row; view the 18.5 s (one check, one ×) and 30.0 s (final) stills at full size and at 350 px wide. Pass when both patch rows, the two column headers, the two row labels, all four cell texts, both grader rows, and the badge are readable at 350 px, the green ok cell and the red bad cell are clearly different from the accent expected cells, and the marks sit right of the grid clear of the cells.
2. **Same output twice**: at 7.0 s cells 1 and 3 both read `reject` in mid, cells 0 and 2 read `—`, and the patch's `return reject` row is accent.
3. **Per-row comparison**: the check at (905, 895) appears after cell0 fills (speed-1 8.6 → 9.8); the × at (905, 1005) appears after cell2 fills (14.1 → 15.3); at 18.5 s both marks are present or just faded with cell1 ok and cell3 bad.
4. **Narrow grader refused**: the badge appears once at 22.6 s (speed 1) and is gone by 23.6 s with a grey ×; the verdict row reads `rejected` in bad from 24.6 s.
5. **No lingering state**: no chip remains during any hold; the grid's shake has settled before beat 4; the grader's rows show one value each.
6. **Overlap**: the `apply` chips must not cross the `patch A` column header at y = 810 except by passing to its right (the via corner is at x = 755, directly above the header: route the via to x = 790 and land at cell tops, or move the header to y 800 and verify); the `grade` chip must clear the `grader` label at y = 1190 except at arrival; row labels at x = 280 must clear the grid's left edge (410). Cell text at 36 px mono (`accept` ≈ 130 px) fits inside 220 px cells.
7. **Word budget**: on-screen text is the patch label and two rows, two column headers, two row labels, four cell texts, the grader label and two rows, and the badge. No sentence appears.
8. **Audio**: the Node dry-run lists ≈ 22 cues (2 stores with ack, 2 sends and 2 stores, ack, store, hit, ack, store, thump, send/arrive, ack, miss, store, store with thump, ack). The spectrogram shows the `hit` at 9.8 s, the `thump` at 15.3 s as the loudest event, a long quiet hold until 21.0 s, and the quieter `thump` at 24.6 s. `ffprobe` reports ≈ 34 s with an audio stream. Record whether audio was heard or only analysed.
9. **Causal reading test**: with sound off and every word removed, a viewer should still see: a card with two rows, the second highlighted; two grey chips drop from it into the right column of a four-cell grid; the left column's top cell fills orange and a green check appears beside the row, with the top-right cell turning green; the left column's bottom cell fills orange and a red × appears beside the row, with the bottom-right cell turning red and the grid shaking; a chip drops to a bottom card; a grey tag pops and is crossed out; the card's two rows fill, the second red, and the top card's outline turns red.
10. **Project checks** after encoding: `python3 scripts/check_media.py --concept agent-evals`, then the full set before any release proposal. A new encode needs its own comparison review.

