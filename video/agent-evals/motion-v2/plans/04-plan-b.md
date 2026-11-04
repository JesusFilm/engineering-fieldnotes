# Lesson 04 — Repeat trials independently — plan B

Independent plan for the motion-v2 cut of agent-evals lesson 04. Authored from the lesson entry in `video/agent-evals/sequence/lessons.json` (item 4) and the concept content in `content/concepts/agent-evals.json`. No other plan for this lesson, no ledger, and no authoring source was consulted. This document names no authoring model.

## Scope

One mechanism: **the same task is run several times, each trial from a fresh copy of the clean fixture so nothing a previous trial left behind is present; outcomes differ between trials; the report counts every attempt rather than the best one.**

The viewer should feel the reset: after trial 1 the working copy carries a file the trial created, the whole copy is discarded, and a new copy is stamped from the untouched template before trial 2 begins. Across three trials the outcomes strip fills `pass`, `fail`, `pass`, and the report reads `2 of 3` while a badge offering `best: pass` is crossed out.

Grounding (from the concept): "repeating a task measures variation; it does not make the agent deterministic"; "start each trial from the same clean fixture so a previous attempt cannot leave a helpful file or changed database behind"; "retain every attempt, including timeouts; report passes over attempts"; the pitfall: "reusing fixtures or cached grades can produce a false improvement; reset state and identify each run distinctly"; "three trials remain a learning exercise, not a reliability estimate."

Out of scope: comparing two configurations (a later lesson), the grading mechanics (lessons 01–03), why trial 2 failed, timeouts and environment failures, and statistical claims. The cut ends with three recorded outcomes and a report that names all of them.

Grammar for this cut: **a clean fixture template on the left, a working copy on the right that is stamped from it and later discarded, an agent system below them, a three-cell outcomes strip, and a report line with a refused badge.** The stamp is a chip from template to copy; the leftover is a row appearing in the copy; the discard is the copy's rows vanishing; the strip fills one cell per trial. This differs from lesson 01 (a stacked evaluation record), lesson 02 (a probe through the function), and lesson 03 (a 2 × 2 outcome matrix), from the memory-architecture cuts that use stores and a restart (here the reset is deliberate and per trial, not a failure), from the other topics' cuts, and from the harness-engineering views. Every element is a software object: a fixture, a working copy, a trial, an outcome, a report.

Target length ≈ 36 s at playback. Authored at speed 1 for 32.5 s with `meta.speed: 0.9`. Lengthen the hold on the dirtied copy before the discard and the hold on the final report first if stills read fast. Do not add beats to reach the guideline.

## Engine extension

The outcomes strip uses the `grid` node type (cells with per-cell colour, fill, and text) in a local copy of `scripts/flow-engine.js`, as in earlier cuts of this series. Report the extension with the cut. If packet chip text renders below 40 px, add a `labelSize` option in the same local copy.

## Stage and coordinates (1080 × 1920)

Palette and type follow `references/style.md`. Names are 40–44 px; store rows, sublabels, cell text, and the report line are 36 px monospace (≈ 21.6 px per character). Everything stays readable at 350 px wide (≈ 12–13 px for the smallest).

| id | type | centre (x, y) | size | text | notes |
|---|---|---|---|---|---|
| title | title band | (540, 330) / (540, 405) | — | **Agent evals** / REPEAT TRIALS INDEPENDENTLY | engine title + subtitle |
| template | store, `rows: 2`, w 400 | (250, 620) | 400 × ≈ 140 (x 50–450, y ≈ 550–690) | label `clean fixture` 40 px at (250, 510); rows 36 px mono | row0 `rev   a1f3` · row1 `db    seed v1`; never changes |
| copy | store, `rows: 3`, w 440 | (810, 640) | 440 × ≈ 200 (x 590–1030, y ≈ 540–740); row centres y ≈ 575, 640, 705 | label `trial 1 · copy` 40 px mono at (810, 500) → `trial 2 · copy` → `trial 3 · copy`; rows 36 px mono | row0 `rev   a1f3` · row1 `db    seed v1` · row2 `—` dim → `tmp/notes.md` mid after a trial |
| system | box | (540, 980) | 520 × 150 (x 280–800, y 905–1055) | label `agent system` 40 px; sublabel 36 px mono `idle` → `running trial 1` → … | |
| outcomes | grid, `cols 3 rows 1 cell 200×90 gap 30` | (540, 1300) | 660 × 90 (x 210–870, y 1255–1345); cell centres (315, 1300), (540, 1300), (765, 1300) | cell texts 36 px mono | cell0 `—` → `pass` ok · cell1 `—` → `fail` bad · cell2 `—` → `pass` ok |
| outlab | label | (540, 1210) | 40 px | `outcomes` | |
| report | label | (540, 1430) | 36 px mono | `report  —` → `report  2 of 3 pass` | |
| badge | badge | (870, 1430) | — | `best: pass` mid | right of the report line; appears and is refused in beat 4 |

Wires (dotted, resting `#3A3E45`):

| id | from | to | via | meaning |
|---|---|---|---|---|
| stamp | template.right (450, 620) | copy.left (590, 620) | — | a fresh copy is made from the template (140 px) |
| run | copy.bottom (810, 740) | system.top (540, 905) | [810, 820], [540, 820] | the trial runs against its copy |
| record | system.bottom (540, 1055) | outcomes cell tops at x 315 / 540 / 765, y 1255 | [540, 1170], [x_cell, 1170] | each trial's outcome lands in its own cell |

The template has no incoming wire: nothing ever writes to it. The copy has no outgoing wire except `run`; the discard happens in place. Stage spans y ≈ 500–1440.

## Sound map

Pitches: template **G5**, copy **E5**, system **C5**, outcomes **A5** (pass on A5, fail on a low `thump`). Pan by x: template left (`−0.5`), copy right (`+0.5`), system centre, outcome cells at −0.4 / 0 / +0.4.

| event | preset | notes |
|---|---|---|
| template rows appear | `store` | G5, quiet, ×2 |
| fresh copy stamped | `send` G6, `store` E5 ×2 | the copy's rows appear; the label names the trial |
| trial runs | `send` E6, `arrive` C5, `work` ×6 at 0.2 s | |
| trial leaves a file behind | `store` | E5, quiet, lower pitch (D5): something extra |
| outcome recorded | `send` C6, `hit` (pass) or `thump` gain ×0.8 (fail) | |
| copy discarded | `poof` | ×3 quick, pan right: the rows vanish, including the leftover |
| template untouched | `ack` | G5, quiet; the template pulses |
| report written | `store` | A5 |
| badge `best: pass` | `ack` | mid, quiet |
| badge refused | `miss` | gain ×0.6; grey × |
| all attempts counted | `chime` | the three cells pulse together |

## Beat sheet (times at speed 1)

| t | what moves | state change | sound |
|---|---|---|---|
| **Beat 1 — Run the same task more than once; each trial starts isolated (0.0–6.5)** | | | |
| 0.0 | — | copy rows hidden, copy label hidden; system `idle`; outcome cells `—`; report `report  —`; badge hidden | — |
| 0.6 / 0.9 | template rows pop | `rev   a1f3` · `db    seed v1` | store G5 ×2 (quiet) |
| 1.8–2.4 | chip `copy` (fg) template.right → copy.left, 0.6 s | — | send G6 |
| 2.4 / 2.7 | copy rows 0–1 pop; copy label fades in | `trial 1 · copy`; rows match the template; row2 `—` dim | store E5 ×2 |
| 2.7–6.5 | hold | the template on the left, its fresh copy on the right | |
| **Beat 2 — Trial 1 produces a result; record it (6.5–13.0)** | | | |
| 6.5–7.3 | chip `task` (fg) copy.bottom → via → system.top, 0.8 s | — | send E6 |
| 7.3 | ripple at system.top | system sublabel → `running trial 1`; stroke → active | arrive C5 |
| 7.5–8.7 | — | glow held | work × 6 |
| 8.3 | copy row2 fills | `tmp/notes.md` mid: the trial wrote a file into its copy | store D5 (quiet, pan right) |
| 8.9–9.7 | chip `pass` (ok) system.bottom → via → cell0 top, 0.8 s | system stroke → fg; sublabel → `idle` | send C6 |
| 9.7 | ripple at cell0 | cell0 → `pass` ok | hit |
| 9.7–13.0 | hold | one outcome recorded; the copy carries a leftover | |
| **Beat 3 — Trial 2 starts from a clean copy; its result differs (13.0–22.0)** | | | |
| 13.0 / 13.15 / 13.3 | copy rows 2, 1, 0 → alpha 0 in turn | the used copy is discarded, leftover included | poof ×3 |
| 13.6 | template pulses | still `rev a1f3 · seed v1` | ack G5 (quiet) |
| 14.2–14.8 | chip `copy` (fg) template.right → copy.left, 0.6 s | — | send G6 |
| 14.8 / 15.1 | copy rows 0–1 pop; label swaps | `trial 2 · copy`; row2 `—` dim | store E5 ×2 |
| 15.1–16.5 | hold | a fresh copy with no leftover | |
| 16.5–17.3 | chip `task` copy.bottom → via → system.top | — | send E6 |
| 17.3 | ripple at system.top | sublabel → `running trial 2`; stroke → active | arrive C5 |
| 17.5–18.7 | — | glow held | work × 6 |
| 18.9–19.7 | chip `fail` (bad) system.bottom → via → cell1 top, 0.8 s | system stroke → fg; sublabel → `idle` | send C6 |
| 19.7 | ripple at cell1 | cell1 → `fail` bad | thump |
| 19.7–22.0 | hold | `pass` beside `fail` for the same task from the same clean start | |
| **Beat 4 — Trial 3, then report the distribution (22.0–32.5)** | | | |
| 22.0 / 22.15 / 22.3 | copy rows → alpha 0 (no leftover this time; rows 0–1 only) | discarded | poof ×2 |
| 22.6–23.2 | chip `copy` template.right → copy.left | — | send G6 |
| 23.2 / 23.5 | copy rows pop; label → `trial 3 · copy` | — | store E5 ×2 |
| 23.9–24.7 | chip `task` copy → system | sublabel → `running trial 3` | send E6, arrive C5 |
| 24.9–25.7 | — | glow held | work × 4 |
| 25.9–26.7 | chip `pass` (ok) system.bottom → via → cell2 top | system → `idle` | send C6 |
| 26.7 | ripple at cell2 | cell2 → `pass` ok | hit |
| 27.3 | badge pops | `best: pass` mid | ack (mid, quiet) |
| 28.0 | grey ripple with × over the badge; badge scale → 0 | — | miss (quiet) |
| 28.5 | report line swaps | `report  2 of 3 pass` | store A5 |
| 29.0 | the three cells pulse together | every attempt counted | chime |
| 29.0–31.0 | hold | final state: an untouched template, a third copy, an idle system, `pass fail pass`, `2 of 3 pass` | |
| 31.0–31.8 | — | `s.fade` to black, 0.8 s | — |
| 32.5 | end | finite ending | |

## Accuracy limits

- The fixture rows, the leftover file name, and the three outcomes are illustrative. Three trials are the concept's exercise size and "a learning exercise, not a reliability estimate"; the report's `2 of 3` is a count, not a rate claim.
- The leftover `tmp/notes.md` stands for anything a trial can leave behind (a helpful file, a changed database). The cut shows it being discarded with the copy; it does not show what would have happened had it been reused.
- Discarding and re-stamping is one way to reset; snapshots, containers, and database resets are others. The cut shows the effect (a fresh start), not the mechanism.
- The system's run time and the work ticks are fixed on screen and do not represent real durations; the cut does not show timeouts, which the concept says must also be retained as attempts.
- Trial 2's `fail` is unexplained by design; inspecting traces to explain failures is in the write-up.
- `best: pass` depicts the pitfall of reporting only the best attempt; it is refused on screen and is not a claim about any particular team's reporting.
- The `poof` preset marks the copy's rows being discarded, its documented meaning. The `thump` marks a failed outcome; the quiet `miss` marks the refused badge.

## Acceptance checks

1. **Stills per beat** at playback seconds (speed 0.9): `5.5, 12.5, 17.5, 23.5, 30.5, 34.0` (speed-1 ≈ 5.0, 11.3, 15.8, 21.2, 27.5, 30.6). Tile with ffmpeg and view the row; view the 12.5 s (leftover present) and 34.0 s (final) stills at full size and at 350 px wide. Pass when the template rows, the copy rows and label, the system sublabel, the three cell texts, and the report line are readable at 350 px, the `tmp/notes.md` row is readable at 12.5 s, and the `fail` cell is clearly red between two green cells at 34.0 s.
2. **Template untouched**: the template's rows and label are identical in every still; no chip ever travels into the template.
3. **Reset before each trial**: at 12.5 s the copy has three rows including the leftover and the label reads `trial 1 · copy`; at 17.5 s the copy has two rows, row2 is `—`, and the label reads `trial 2 · copy`; the discard (poofs) precedes the stamp each time (speed-1 13.0 → 14.2 and 22.0 → 22.6).
4. **Outcomes differ**: cells read `pass`, `fail`, `pass` in order; each cell fills only after its trial's `task` chip ran through the system.
5. **All attempts reported**: the badge appears once and is gone with a grey × before the report line changes; the report reads `2 of 3 pass` at 34.0 s and never `3 of 3` or `best`.
6. **No lingering state**: no chip remains during any hold; the system sublabel returns to `idle` between trials; the copy is empty between discard and stamp.
7. **Overlap**: the `stamp` chip must fit the 140 px gap (fade at both ends); the `task` chip must not cross the `agent system` label (it lands at the box top); the `pass`/`fail` chips must clear the `outcomes` label at y = 1210 except by passing to its side (the via run at y = 1170 passes above it; verify at x = 540 where the chip descends through the label: shift the label to (540, 1225) or route the centre cell's chip via x = 560); the badge at (870, 1430) must clear the report text (≈ 20 characters ≈ 432 px, ending ≈ x 756). Copy rows at 36 px mono (12 characters ≈ 259 px) fit inside 440 px.
8. **Word budget**: on-screen text is the template label and two rows, the copy label and up to three rows, the system label and sublabel, the outcomes label and three cell texts, the report line, and the badge. No sentence appears.
9. **Audio**: the Node dry-run lists ≈ 60 cues (2 stores, 3 × (send + 2 stores) for stamps, 3 × (send/arrive + works) for runs, a quiet D5 store, hit, 3 poofs, ack, thump, 2 poofs, hit, ack, miss, store, chime). The spectrogram shows three work stretches, a `hit` at 9.7 s, a `thump` at 19.7 s, a `hit` at 26.7 s, and the `chime` at 29.0 s as the brightest. `ffprobe` reports ≈ 36 s with an audio stream. Record whether audio was heard or only analysed.
10. **Causal reading test**: with sound off and every word removed, a viewer should still see: a left list; a chip hops right and a matching list appears; a chip drops to a middle box that glows while the right list gains a third row; a chip drops to the first of three cells, which turns green; the right list's rows vanish one by one, the left list pulses, a chip hops right again and a two-row list appears; the box glows and a chip turns the second cell red; the right list vanishes and reappears a third time, the box glows, the third cell turns green; a tag pops and is crossed out; a line of text appears under the cells and all three pulse together.
11. **Project checks** after encoding: `python3 scripts/check_media.py --concept agent-evals`, then the full set before any release proposal. A new encode needs its own comparison review.

