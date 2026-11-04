# Lesson 01 — Follow dependencies — plan B

Independent plan for the motion-v2 cut of orchestration-patterns lesson 01. Authored from the lesson entry in `video/orchestration-patterns/sequence/lessons.json` (item 1) and the concept content in `content/concepts/orchestration-patterns.json`. No other plan for this lesson, no ledger, and no authoring source was consulted. This document names no authoring model.

## Scope

One mechanism: **in a chain, each step needs the previous step's output as its input, so the steps run in the order of the data and the total time is the sum of the steps; a step whose input does not exist yet cannot start.**

The viewer should feel the dependency as a gate on the data: step 2 sits waiting with a `needs: draft` tag and cannot start while step 1 runs; the moment the draft card exists it travels to step 2, which runs and produces findings; those findings travel to step 3, which assembles the result. An elapsed bar at the top fills one segment per step, so the chain's cost in time is seen as well as its order.

Grounding (from the concept): "a chain handles dependencies"; "if one task needs the other's output, sequence it instead"; the lesson's takeaway: "use a chain when later work depends on an earlier result. Extra steps add latency and new failure points"; "keep automated test results distinguishable from model opinions" motivates keeping the check's findings as observed rows.

Out of scope: routing, parallel workers, evaluator loops, dynamic delegation (later lessons), what happens when a step fails or times out, snapshots and invalidation, and the content quality of the draft. The cut ends when the result exists and the elapsed bar is full.

Grammar for this cut: **three step boxes stacked in order on the left, an artifact card to the right of each, dependency wires that drop from one artifact to the next step, and an elapsed bar at the top with one segment per step.** Steps light while running and turn green when done; artifacts pop in as cards; dependency wires are dashed until their artifact exists. This is the first cut of this topic; it is distinct from the memory-architecture cuts (stores, version chains, revision checks), the context-engineering cuts, the tool-design cuts, the loop-engineering cuts, and the harness-engineering views. Every element is a software object: a step, an artifact, a dependency, an elapsed time.

Target length ≈ 32 s at playback. Authored at speed 1 for 29 s with `meta.speed: 0.9`. Lengthen the hold while step 2 waits and the hold on the findings first if stills read fast. Do not add beats to reach the guideline.

## Stage and coordinates (1080 × 1920)

Palette and type follow `references/style.md`. Names are 40–44 px; store rows, sublabels, and the bar label are 36 px monospace (≈ 21.6 px per character). Everything stays readable at 350 px wide (≈ 12–13 px for the smallest). If packet chip text renders below 40 px, add a `labelSize` option in the local engine copy and report it.

| id | type | centre (x, y) | size | text | notes |
|---|---|---|---|---|---|
| title | title band | (540, 330) / (540, 405) | — | **Orchestration patterns** / FOLLOW DEPENDENCIES | engine title + subtitle |
| elapsed | bar, `segments: 3` | (540, 560) | 840 × 14 (x 120–960) | label `elapsed  0 s` 36 px mono → `2 s` → `4 s` → `6 s` | seg0 → 0.333 (C-colour fg) during step 1, seg1 during step 2, seg2 during step 3; label below the bar |
| step1 | box | (300, 760) | 440 × 130 (x 80–520, y 695–825) | label `1 · draft` 40 px mono; sublabel 36 px `ready` → `running…` → `done` | |
| draft | store, `rows: 1`, w 400 | (800, 760) | 400 × ≈ 90 (x 600–1000, y ≈ 715–805) | label `artifact` 36 px at (800, 680); row 36 px mono | row0 `draft.md  v1` |
| step2 | box | (300, 1010) | 440 × 130 (y 945–1075) | label `2 · check`; sublabel `needs: draft` mid → `running…` → `done` | alpha 0.5 while waiting |
| findings | store, `rows: 2`, w 400 | (800, 1010) | 400 × ≈ 140 (y ≈ 940–1080) | rows 36 px mono, hidden until produced | row0 `tone     ok` ok · row1 `length   too long` bad |
| step3 | box | (300, 1260) | 440 × 130 (y 1195–1325) | label `3 · assemble`; sublabel `needs: findings` mid → `running…` → `done` | alpha 0.5 while waiting |
| result | store, `rows: 1`, w 400 | (800, 1260) | 400 × ≈ 90 (y ≈ 1215–1305) | row 36 px mono, hidden until produced | row0 `result  v1 + 2 notes` ok (19 characters ≈ 410 px; shorten to `result  v1+2 notes` if padding is tight) |

Wires (dotted, resting `#3A3E45`):

| id | from | to | via | meaning |
|---|---|---|---|---|
| out1 | step1.right (520, 760) | draft.left (600, 760) | — | step 1 produces the draft (80 px) |
| dep1 | draft.bottom (800, 805) | step2.top (300, 945) | [800, 880], [300, 880] | the draft is step 2's input; `dashed` 1 until the draft exists |
| out2 | step2.right (520, 1010) | findings.left (600, 1010) | — | step 2 produces findings |
| dep2 | findings.bottom (800, 1080) | step3.top (300, 1195) | [800, 1140], [300, 1140] | findings are step 3's input; `dashed` 1 until they exist |
| out3 | step3.right (520, 1260) | result.left (600, 1260) | — | step 3 produces the result |

The dependency wires turn from dashed to solid at the moment their artifact appears, and carry one chip each. There is no wire from step 1 to step 2 directly: the order is through the data. Stage spans y ≈ 560–1325.

## Sound map

Pitches: step 1 **C5**, step 2 **E5**, step 3 **G5** (the chain is heard as a rising triad), artifacts **A5**. Pan by x: steps left (`−0.4`), artifacts right (`+0.4`), elapsed bar centre.

| event | preset | notes |
|---|---|---|
| a step starts | `ack` | at its pitch |
| a step runs | `work` | every 0.2 s while `running…`, pan left |
| a step finishes | `ack` | at its pitch, gain ×1.4, with a green check ripple |
| an artifact is produced | `send` (step pitch, octave up), `store` A5 | pan right |
| a waiting step cannot start | `miss` | gain ×0.5, pan left; grey × at the step's top |
| a dependency wire opens | `hit` | quiet; dashed → solid |
| an artifact travels to the next step | `send` A6, `arrive` (step pitch) | |
| findings rows appear | `store` | A5 ×2; the `too long` row at lower gain |
| elapsed segment fills | `clock` | one tick as each segment completes |
| chain complete | `chime` | the brightest event |

## Beat sheet (times at speed 1)

| t | what moves | state change | sound |
|---|---|---|---|
| **Beat 1 — Produce the draft; the check cannot start yet (0.0–7.5)** | | | |
| 0.0 | — | bar empty, label `elapsed  0 s`; step1 `ready`; step2 and step3 at alpha 0.5 with their `needs` tags; artifacts hidden; `dep1` and `dep2` dashed | — |
| 0.6 | step1 pulses | sublabel → `running…`; stroke → active | ack C5 |
| 0.8–2.4 | — | `elapsed` seg0 0 → 0.333 linear; glow held | work × 8 |
| 1.6 | step2 pulses at alpha 0.5; grey ripple with × at step2.top | `needs: draft` flashes | miss (quiet) |
| 2.4 | ok ripple with check at step1.right | step1 sublabel → `done`; stroke → ok; bar label → `elapsed  2 s` | ack C5 (louder), clock |
| 2.8–3.3 | chip `draft v1` (fg) step1.right → draft.left, 0.5 s | — | send C6 |
| 3.3 | ripple at draft.left | draft row0 pops `draft.md  v1`; `dep1` `dashed` → 0, colour → fg | store A5, hit (quiet) |
| 3.3–7.5 | hold | the draft exists; step 2's dependency is now available but it has not run | |
| **Beat 2 — Send the draft to the checking step (7.5–10.5)** | | | |
| 7.5–8.5 | chip `draft v1` (fg) draft.bottom → via → step2.top, 1.0 s; `dep1` `flow` → 1 | — | send A6 |
| 8.5 | ripple at step2.top | step2 alpha → 1; sublabel → `running…`; stroke → active; `dep1` `flow` → 0 | arrive E5, ack E5 |
| 8.5–10.5 | — | `elapsed` seg1 0 → 0.333 linear; glow held | work × 10 |
| **Beat 3 — Check against the criteria; keep the observed findings (10.5–18.0)** | | | |
| 10.5 | ok ripple with check at step2.right | step2 sublabel → `done`; stroke → ok; bar label → `elapsed  4 s` | ack E5 (louder), clock |
| 10.9–11.4 | chip `findings` (fg) step2.right → findings.left, 0.5 s | — | send E6 |
| 11.4 / 11.9 | findings rows pop | `tone     ok` ok · `length   too long` bad | store A5 × 2 |
| 12.3 | — | `dep2` `dashed` → 0, colour → fg | hit (quiet) |
| 12.3–15.5 | hold | two observed findings, one of them a problem, kept as rows | |
| 15.5–18.0 | hold (continued) | step 3 still waits at alpha 0.5 with `needs: findings` even though its input now exists: it has not been sent yet | |
| **Beat 4 — Build the result from checked work (18.0–29.0)** | | | |
| 18.0–19.0 | chip `findings` (fg) findings.bottom → via → step3.top, 1.0 s; `dep2` `flow` → 1 | — | send A6 |
| 19.0 | ripple at step3.top | step3 alpha → 1; sublabel → `running…`; stroke → active; `dep2` `flow` → 0 | arrive G5, ack G5 |
| 19.0–20.6 | — | `elapsed` seg2 0 → 0.333 linear; glow held | work × 8 |
| 20.6 | ok ripple with check at step3.right | step3 sublabel → `done`; stroke → ok; bar label → `elapsed  6 s` | ack G5 (louder), clock |
| 21.0–21.5 | chip `result` (ok) step3.right → result.left, 0.5 s | — | send G6 |
| 21.5 | ripple at result.left | result row0 pops `result  v1 + 2 notes` ok | store A5 |
| 22.0 | the three steps pulse in order (22.0 / 22.2 / 22.4) | — | ack C5, E5, G5 |
| 22.6 | `elapsed` bar pulses | three full segments | chime |
| 22.6–27.5 | hold | final state: three done steps in order, three artifacts, two solid dependency wires, a full three-segment bar at `6 s` | |
| 27.5–28.3 | — | `s.fade` to black, 0.8 s | — |
| 29.0 | end | finite ending | |

## Accuracy limits

- The three steps (draft, check, assemble) and their artifacts are a generic chain used by the lesson; the concept's main example (two review workers) belongs to later lessons. The findings rows are illustrative.
- `elapsed 6 s` and the equal segments are teaching values. Real step durations differ; the point is that the chain's total is the sum of its steps, not the figures.
- The grey × at 1.6 s depicts that step 2 cannot start without its input; it is not a failure of step 2 and the cut does not show error handling.
- Step 3 waits between 12.3 and 18.0 s although its input exists, so the viewer can see that availability and sending are separate; a real orchestrator would normally start step 3 as soon as the findings are complete.
- `tone ok` and `length too long` stand for observed findings kept as data rather than summarised away; they do not represent any particular checker.
- "New failure points" from the takeaway are shown only as the three check ripples where each step could have failed; failure itself is out of scope here.
- No `poof` is used. The one quiet `miss` marks a step that cannot start yet.

## Acceptance checks

1. **Stills per beat** at playback seconds (speed 0.9): `2.0, 6.0, 10.5, 15.0, 22.5, 28.0` (speed-1 ≈ 1.8, 5.4, 9.5, 13.5, 20.3, 25.2). Tile with ffmpeg and view the row; view the 6.0 s (draft exists, step 2 waiting) and 28.0 s (final) stills at full size and at 350 px wide. Pass when all step labels and sublabels, the artifact rows, and the bar label are readable at 350 px, the waiting steps at alpha 0.5 are clearly dimmer than the active step, the dashed dependency wires are distinguishable from solid ones, and the three bar segments are individually visible at 28.0 s.
2. **Gate on data**: at 2.0 s step 1 is running, step 2 is dim with `needs: draft`, `dep1` is dashed, and no artifact exists; at 6.0 s the draft card exists, `dep1` is solid, and step 2 is still dim.
3. **Order through artifacts**: every step starts only after a chip arrives at its top from an artifact (speed-1 8.5 s and 19.0 s); step 1 starts from no artifact.
4. **Findings kept**: at 15.0 s the findings card shows both rows with their colours; the `too long` row is still present at 28.0 s.
5. **No lingering state**: no chip remains during any hold; each dependency wire flows only while its chip travels; the × at step 2 has faded before the draft chip leaves.
6. **Overlap**: the `draft v1` and `findings` chips on the dependency wires must not cross the step labels (they arrive at the box tops at x = 300, left of centre labels; shift the via x to 250 if they collide); the `out` chips must fit the 80 px gaps (fade both ends); the `artifact` label at (800, 680) must clear the bar label at ≈ 600. Rows at 36 px mono (19 characters ≈ 410 px) fit inside 400 px only with minimal padding; apply the noted shortening if the still shows clipping.
7. **Word budget**: on-screen text is the bar label, three step labels and sublabels, the artifact label, and four artifact rows. No sentence appears.
8. **Audio**: the Node dry-run lists ≈ 50 cues (26 work ticks, 6 step acks, miss, 3 sends and 3 stores for artifacts, 2 hits, 2 sends and 2 arrives for dependencies, 3 clocks, 3 acks, chime). The spectrogram shows three work-tick stretches, a rising C–E–G at 22.0–22.4 s, and the `chime` at 22.6 s as the brightest. `ffprobe` reports ≈ 32 s with an audio stream. Record whether audio was heard or only analysed.
9. **Causal reading test**: with sound off and every word removed, a viewer should still see: the top bar's first third fills while the top-left box glows and the box below it flickers with a grey ×; the top box turns green and a card appears to its right, and a dashed line below the card turns solid; a chip runs from the card down to the second box, which brightens and glows while the bar's second third fills; the second box turns green and a two-row card appears, one row red; a chip runs from that card to the third box, which glows while the last third fills; the third box turns green and a card appears; the three boxes pulse in order and the bar pulses.
10. **Project checks** after encoding: `python3 scripts/check_media.py --concept orchestration-patterns`, then the full set before any release proposal. A new encode needs its own comparison review.

