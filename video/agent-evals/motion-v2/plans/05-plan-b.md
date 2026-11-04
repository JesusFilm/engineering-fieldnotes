# Lesson 05 — Know the grading limits — plan B

Independent plan for the motion-v2 cut of agent-evals lesson 05. Authored from the lesson entry in `video/agent-evals/sequence/lessons.json` (item 5) and the concept content in `content/concepts/agent-evals.json`. No other plan for this lesson, no ledger, and no authoring source was consulted. This document names no authoring model.

## Scope

One mechanism: **a suite is a set of representative tasks with a held-out set kept apart; each criterion is graded by the kind of grader suited to it (code for exact outcomes, a calibrated rubric for judgement); graders can be wrong, so their marks are checked against a human sample and a false pass is found; the resulting evidence is stated with its coverage, and passing the suite is not a release decision.**

The viewer should feel the two textures of grading (crisp checks from code, a softer check from the rubric), the moment the human sample disagrees with the rubric and the soft check turns into a false pass, and the evidence card at the end whose rows say what was covered and what was not while the release box stays dark.

Grounding (from the concept): "a suite collects tasks"; "use code to check concrete outcomes; use a rubric and human-calibrated model grading for subjective qualities such as explanation clarity"; "keep a separate set of tasks out of prompt tuning"; "review unexpected results before accepting a change"; "passing a finite suite supports a bounded decision, not a general reliability guarantee"; OpenAI evaluation best practices on representative cases and human calibration.

Out of scope: the mechanics of any single grade (lessons 01–03), repetition and variation (lesson 04), comparing configurations, false failures in detail (the cut shows one false pass and names the other kind only in the write-up), and the release decision itself. The cut ends with bounded evidence and a dark release box.

Grammar for this cut: **a row of task tiles with one held-out tile set apart, a two-row graders card and a human sample box, marks of two textures on the tiles, and an evidence card above a dark release box.** The tiles are the suite; the graders' chips mark them; the human sample's chip contradicts one mark; the evidence card's rows carry the limits. This differs from lesson 01 (stacked evaluation record), lesson 02 (probe), lesson 03 (2 × 2 outcome matrix), and lesson 04 (template, copy, and outcomes strip), from the guardrails cut that used a soft-versus-hard texture for a guardrail and authorization (here the two textures are both graders, and the soft one is tested against a person), from the other topics' cuts, and from the harness-engineering views. Every element is a software object: a task, a grader, a mark, a calibration sample, an evidence record, a release gate.

Target length ≈ 36 s at playback. Authored at speed 1 for 32.5 s with `meta.speed: 0.9`. Lengthen the hold after the false pass is found and the hold on the evidence card first if stills read fast. Do not add beats to reach the guideline.

## Engine extension

The suite uses the `grid` node type (cells with per-cell colour, fill, and text) in a local copy of `scripts/flow-engine.js`, as in earlier cuts of this series. Report the extension with the cut. If packet chip text renders below 40 px, add a `labelSize` option in the same local copy.

## Stage and coordinates (1080 × 1920)

Palette and type follow `references/style.md`. Names are 40–44 px; store rows, sublabels, and cell text are 36 px monospace (≈ 21.6 px per character); tile text may use 32 px if `explanation` (11 characters ≈ 238 px at 36 px) crowds a 180 px tile — use `explain` instead. Everything stays readable at 350 px wide (≈ 12–13 px for the smallest).

| id | type | centre (x, y) | size | text | notes |
|---|---|---|---|---|---|
| title | title band | (540, 330) / (540, 405) | — | **Agent evals** / KNOW THE GRADING LIMITS | engine title + subtitle |
| suitelab | label | (300, 520) | 40 px | `suite` | left of the tiles' row above |
| heldout | box | (870, 520) | 180 × 70 (x 780–960, y 485–555) | label `held-out` 36 px | alpha 0.5 throughout: kept apart, never graded here |
| tiles | grid, `cols 4 rows 1 cell 180×90 gap 20` | (480, 640) | 780 × 90 (x 90–870, y 595–685); cell centres (180, 640), (380, 640), (580, 640), (780, 640) | cell texts 36 px mono | cell0 `empty pw` · cell1 `valid pw` · cell2 `locked` · cell3 `explain`; marks land above each tile at (x_cell, 580) |
| graders | store, `rows: 2`, w 520 | (330, 950) | 520 × ≈ 140 (x 70–590, y ≈ 880–1020); row centres y ≈ 915, 985 | label `graders` 40 px at (330, 840); rows 36 px mono | row0 `code    exact outcome` · row1 `rubric  judgement` accent → `rubric  recalibrate` bad |
| human | box | (830, 950) | 320 × 120 (x 670–990, y 890–1010) | label `human sample` 40 px; sublabel `calibration` 36 px | |
| evidence | store, `rows: 2`, w 700 | (540, 1300) | 700 × ≈ 140 (x 190–890, y ≈ 1230–1370) | label `evidence` 40 px at (540, 1190); rows 36 px mono, hidden until beat 4 | row0 `passed    3 of 4 · in suite` (26 characters ≈ 562 px) · row1 `held-out  not run` mid |
| badge | badge | (890, 1190) | — | `review` ok | right of the evidence label; appears in beat 4 |
| release | box | (540, 1560) | 400 × 110 (x 340–740, y 1505–1615) | label `release` 44 px; sublabel `not decided` 36 px | alpha 0.5 throughout |

Wires (dotted, resting `#3A3E45`):

| id | from | to | via | meaning |
|---|---|---|---|---|
| gradeC | graders.top (330, 880) | tiles cell0–2 bottoms (x 180 / 380 / 580, y 685) | [330, 790], [x_cell, 790] | the code grader marks the outcome tiles |
| gradeR | graders.top (330, 880) | tiles cell3 bottom (780, 685) | [330, 790], [780, 790] | the rubric grader marks the explanation tile |
| sample | human.top (830, 890) | tiles cell3 bottom (780, 685) | [830, 760], [780, 760] | the human sample checks the rubric's mark on one tile |
| bound | evidence.bottom (540, 1370) | release.top (540, 1505) | — | the gate; `dashed` 1 and dim throughout: never solid |

The held-out box sits beside the suite label, above and apart from the tiles, and no wire reaches it. Stage spans y ≈ 485–1615.

## Sound map

Pitches: suite tiles **G5**, code grader **C6** (short, dry), rubric grader **A5** (longer echo), human sample **E5**, evidence **C5**. Pan by x: graders left (`−0.4`), human right (`+0.5`), tiles panned to their x, the rest centre.

| event | preset | notes |
|---|---|---|
| tiles appear | `store` | G5, quiet, one per tile at 0.2 s, panned |
| held-out set apart | `ack` | low (C4), quiet |
| grader rows appear | `store` | C6 then A5 |
| code grader marks a tile | `ack` | C6, short, with a crisp green check; ×3 |
| rubric grader marks a tile | `ack` | A5 with echo, with a soft green ripple (no hard check) |
| human sample appears | `ack` | E5 |
| human sample disagrees | `miss` | pan right; a red × lands over the soft mark |
| false pass named | `thump` | gain ×0.8; the rubric row turns bad |
| evidence rows appear | `store` | C5 ×2 |
| gate stays closed | `ack` | low (C4), quiet; grey × on the dashed wire |
| bounded claim | `chime` | the badge `review` pops |

## Beat sheet (times at speed 1)

| t | what moves | state change | sound |
|---|---|---|---|
| **Beat 1 — Collect representative tasks; keep some out (0.0–7.0)** | | | |
| 0.0 | — | tiles hidden; held-out at alpha 0.5; grader rows hidden; human dim; evidence rows hidden; release at alpha 0.5; `bound` dashed | — |
| 0.6–1.2 | tiles pop left to right | `empty pw` (a known failure) · `valid pw` (behaviour to keep) · `locked` · `explain` | store G5 ×4 (quiet) |
| 1.8 | tiles 0 and 1 pulse together | the known failure and the must-keep case | — |
| 2.4 | held-out box pulses at alpha 0.5 | `held-out`: apart from the suite | ack (low, quiet) |
| 2.4–7.0 | hold | four tasks in the suite, one set apart | |
| **Beat 2 — Apply graders suited to each criterion (7.0–14.5)** | | | |
| 7.0 / 7.4 | grader rows pop | `code    exact outcome` · `rubric  judgement` accent | store C6, store A5 |
| 8.2 / 8.9 / 9.6 | chips `test` (fg) graders.top → via → tiles 0, 1, 2 bottoms, 0.6 s each | crisp ok checks at (180, 580), (380, 580), (580, 580); tiles 0–2 → ok | ack C6 ×3 (short) |
| 10.6–11.2 | chip `rubric` (accent) graders.top → via → tile 3 bottom, 0.6 s | soft ok ripple at (780, 580), larger and slower; tile 3 → ok at lower fill | ack A5 (echo) |
| 11.8 | human box → alpha 1 | `human sample · calibration` | ack E5 |
| 11.8–14.5 | hold | three crisp checks, one soft one, and a person standing by | |
| **Beat 3 — Inspect false passes; a flawed grader can reward wrong work (14.5–22.5)** | | | |
| 14.5–15.1 | chip `sample` (fg) human.top → via → tile 3 bottom, 0.6 s | — | send E6 (pan right) |
| 15.1 | bad ripple with × over the soft mark at (780, 580) | tile 3 → bad; the rubric said pass, the person says no | miss |
| 15.9 | graders row1 swaps and pulses | `rubric  recalibrate` bad | thump |
| 16.4 | tiles 0–2 pulse ok once | the code grader's marks stand | ack C6 (quiet) |
| 16.4–22.5 | hold (long) | three crisp checks, one false pass found, a grader marked for recalibration | |
| **Beat 4 — Use the evidence with stated limits (22.5–32.5)** | | | |
| 22.5 / 23.0 | evidence rows pop | `passed    3 of 4 · in suite` · `held-out  not run` mid | store C5 ×2 |
| 23.8 | `bound` wire pulses dim; grey ripple with × at (540, 1437) | the gate is closed | ack (low, quiet) |
| 24.4 | release sublabel pulses at alpha 0.5 | `not decided` | — |
| 25.0 | badge pops | `review` ok | chime |
| 25.0–30.5 | hold | final state: a graded suite with one false pass caught, a held-out set untouched, an evidence card with its coverage stated, a dark release box | |
| 30.5–31.3 | — | `s.fade` to black, 0.8 s | — |
| 32.5 | end | finite ending | |

## Accuracy limits

- The tiles, graders, and counts are illustrative, drawn from the concept's authentication example; `explain` stands for explanation clarity graded by rubric. The suite of four is a teaching size.
- The crisp-versus-soft mark textures are a visual convention of the cut for deterministic versus judgement grading; they are not a standard notation.
- The false pass is found by one human sample on one tile. The concept recommends human calibration of model graders; the cut does not show the calibration set's size or how often sampling happens, nor does it show a false failure (the other kind of grading error named in the lesson text).
- `passed 3 of 4 · in suite` counts tiles after the false pass is corrected; it is a count within this suite, not a rate or a reliability claim.
- `held-out  not run` carries the concept's advice to keep tasks out of prompt tuning; the cut does not show what the held-out set is later used for.
- The release box stays dark with `not decided` to carry the takeaway that passing a suite is not automatic release; engineers own that decision, and the cut does not show it.
- No `poof` is used. The `miss` marks the human disagreement; the `thump` marks the grader being flagged.

## Acceptance checks

1. **Stills per beat** at playback seconds (speed 0.9): `6.0, 14.5, 18.5, 27.0, 32.0, 35.0` (speed-1 ≈ 5.4, 13.0, 16.7, 24.3, 28.8, 31.5). Tile with ffmpeg and view the row; view the 14.5 s (two textures) and 32.0 s (final) stills at full size and at 350 px wide. Pass when the four tile texts, the held-out label, both grader rows, the human box label and sublabel, both evidence rows, the badge, and the release label and sublabel are readable at 350 px, the crisp checks and the soft ripple are visibly different at 14.5 s, and the red × over tile 3 is clear at 18.5 s.
2. **Held-out apart**: no wire reaches the held-out box; it is at alpha 0.5 in every still; the evidence row1 reads `not run`.
3. **Suited graders**: the three code chips land on tiles 0–2 and the rubric chip on tile 3; marks appear only after the corresponding chip lands.
4. **False pass found**: at 18.5 s tile 3 is bad with a × over its soft mark, the rubric row reads `recalibrate` in bad, and tiles 0–2 are still ok.
5. **Not a release**: the `bound` wire is dashed in every still and carries no chip; the release box is at alpha 0.5 with `not decided` at 32.0 s; the badge reads `review`.
6. **No lingering state**: no chip remains during any hold; the human box is dim before 11.8 s (speed 1); the evidence rows are hidden before 22.5 s.
7. **Overlap**: grader chips rising to the tiles must not cross the `graders` label at y = 840 (they leave from the card's top at x = 330 and turn at y = 790: shift the label to (330, 850) and verify); marks at y = 580 must clear the tile texts (cells span y 595–685) and the held-out box (y 485–555, x 780–960): the mark at (780, 580) sits between them with 25 px clearance each way — if ripples at r1 > 25 overlap, lower the marks to y 590 or raise the held-out box to y 505; the `sample` chip must clear the human box's label. Tile text at 36 px mono (`empty pw` ≈ 173 px) fits inside 180 px with no padding: use 32 px for tile text, or widen cells to 190 px with gap 10.
8. **Word budget**: on-screen text is the suite label, the held-out label, four tile texts, the graders label and two rows, the human label and sublabel, the evidence label and two rows, the badge, and the release label and sublabel. No sentence appears.
9. **Audio**: the Node dry-run lists ≈ 24 cues (4 stores, ack, 2 stores, 3 short acks, echoing ack, ack, send, miss, thump, ack, 2 stores, ack, chime). The spectrogram shows three short dry hits at 8.2–9.6 s followed by one longer echoing hit at 11.2 s, the `miss` at 15.1 s and `thump` at 15.9 s as the negative pair, a long quiet hold, and the `chime` at 25.0 s as the brightest. `ffprobe` reports ≈ 36 s with an audio stream. Record whether audio was heard or only analysed.
10. **Causal reading test**: with sound off and every word removed, a viewer should still see: four tiles appear in a row with a dim box set apart above right; a two-row card appears and sends three quick chips up to the first three tiles, each getting a sharp green check, then one chip to the fourth tile, which gets a softer green glow; a box on the right brightens and sends a chip to the fourth tile, where a red × lands over the glow, and the card's second row turns red; a card below fills two rows, a dashed line under it pulses with a grey ×, a dim box at the bottom stays dim, and a green tag appears beside the card.
11. **Project checks** after encoding: `python3 scripts/check_media.py --concept agent-evals`, then the full set before any release proposal. A new encode needs its own comparison review.

