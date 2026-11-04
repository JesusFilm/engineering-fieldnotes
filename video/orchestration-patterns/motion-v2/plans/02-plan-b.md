# Lesson 02 — Route to one specialist — plan B

Independent plan for the motion-v2 cut of orchestration-patterns lesson 02. Authored from the lesson entry in `video/orchestration-patterns/sequence/lessons.json` (item 2) and the concept content in `content/concepts/orchestration-patterns.json`. No other plan for this lesson, no ledger, and no authoring source was consulted. This document names no authoring model.

## Scope

One mechanism: **a router matches a request against routing criteria and sends it down exactly one path to the specialist whose tools and instructions fit; the other specialists do not run; a request that matches no specialist criterion takes the fallback path to a person.**

The viewer should feel the table doing the choosing: the request's tags light one criteria row, that row's exit wire turns solid, one destination box lights while two stay dim, and a counter says one of three ran. The second request lights no specialist row and takes the last exit to human triage.

Grounding (from the concept): "routing selects a specialist"; the example's two workers inspect compatibility and migration risks "with read-only tools"; "a team moving beyond chat needs explicit handoffs"; the lesson's takeaway: "a route is a choice, not proof that the chosen worker will be correct. Ambiguous requests need a fallback."

Out of scope: what the specialist returns and whether it is correct (the takeaway's warning is carried by the write-up and by the counter's wording), parallel dispatch and joins (later lessons), the chain (lesson 01), access configuration for the specialists' tools, and the triage engineer's decision. The cut ends when the second request has reached human triage.

Grammar for this cut: **a request card above, a three-row routing table in the middle, three exit wires dropping to three destination boxes in a row below, and a counter.** Criteria rows light to show the match; exit wires are dashed until chosen; destination boxes carry their tool set as a sublabel so "fit" is visible. This differs from lesson 01 (a stacked chain with artifacts and an elapsed bar), from the loop-engineering decision cut (a controller box with ports and a sliding pointer), from the memory-architecture, context-engineering, and tool-design cuts, and from the harness-engineering views. Every element is a software object: a tagged request, a criteria row, a route, a specialist with tools, a triage queue.

Target length ≈ 33 s at playback. Authored at speed 1 for 30 s with `meta.speed: 0.9`. Lengthen the hold after the first route lights and the hold after triage lights first if stills read fast. Do not add beats to reach the guideline.

## Stage and coordinates (1080 × 1920)

Palette and type follow `references/style.md`. Names are 40–44 px; store rows, sublabels, and the counter are 36 px monospace (≈ 21.6 px per character). Everything stays readable at 350 px wide (≈ 12–13 px for the smallest). If packet chip text renders below 40 px, add a `labelSize` option in the local engine copy and report it.

| id | type | centre (x, y) | size | text | notes |
|---|---|---|---|---|---|
| title | title band | (540, 330) / (540, 405) | — | **Orchestration patterns** / ROUTE TO ONE SPECIALIST | engine title + subtitle |
| request | store, `rows: 2`, w 560 | (540, 600) | 560 × ≈ 140 (x 260–820, y ≈ 530–670) | label `request` 40 px at (540, 490); rows 36 px mono | first: `#41` · `tags  api · schema` accent; second: `#42` · `tags  ?` mid |
| table | store, `rows: 3`, w 820 | (540, 940) | 820 × ≈ 200 (x 130–950, y ≈ 840–1040); row centres y ≈ 875, 940, 1005 | label `routing criteria` 40 px at (540, 800); rows 36 px mono | row0 `api · schema    → api reviewer` · row1 `migration · rows → db reviewer` · row2 `unclear          → human triage` (max 32 characters ≈ 691 px) |
| dApi | box | (200, 1320) | 300 × 150 (x 50–350, y 1245–1395) | label `api reviewer` 40 px; sublabel `tools: schema diff` 36 px (18 characters ≈ 389 px: too wide for 300; use `schema diff` as the sublabel, 11 characters ≈ 238 px) | alpha 0.5 when idle |
| dDb | box | (540, 1320) | 300 × 150 (x 390–690) | label `db reviewer`; sublabel `migration` | alpha 0.5 when idle |
| dHuman | box | (880, 1320) | 300 × 150 (x 730–1030) | label `human triage`; sublabel `engineer` | alpha 0.5 when idle |
| counter | label | (540, 1470) | 36 px mono, mid | `ran 0 of 3` → `ran 1 of 3` → `ran 1 of 3 · triage 1` | |

Wires (dotted, resting `#3A3E45`):

| id | from | to | via | meaning |
|---|---|---|---|---|
| in | request.bottom (540, 670) | table.top (540, 840) | — | the request enters the router |
| r0 | [200, 1040] | dApi.top (200, 1245) | — | exit for row0; `dashed` 1 until chosen |
| r1 | [540, 1040] | dDb.top (540, 1245) | — | exit for row1; `dashed` 1 until chosen |
| r2 | [880, 1040] | dHuman.top (880, 1245) | — | exit for row2; `dashed` 1 until chosen |

The three exits leave the table's bottom edge at the x of the destination each row names, so a lit row and its solid wire read as one path. Stage spans y ≈ 490–1480.

## Sound map

Pitches: request **C5**, router **G5**, api reviewer **E5**, db reviewer **F♯5**, human triage **A5**. Pan by x: destinations at −0.6 / 0 / +0.6; request and table centre.

| event | preset | notes |
|---|---|---|
| request rows appear | `store` | C5, quiet; the tags row adds `ack` C6 |
| destinations appear | `ack` | E5, F♯5, A5 in turn, quiet |
| criteria rows appear | `store` | G5, quiet, ×3 |
| request enters the router | `send` C6, `arrive` G5 | |
| a row is scanned | `ack` | G5, quiet |
| a row matches | `hit` | the row turns accent; the exit wire turns solid |
| a row does not match | `ack` | G5, lower gain; the row dims |
| no specialist row matches | `miss` | gain ×0.6; grey × beside rows 0–1 |
| task leaves the router | `send` | G6, panned toward the destination |
| destination receives | `arrive` | at its pitch; the box lights |
| specialist's tools fit | `ack` | E5, with the sublabel pulse |
| counter updates | `ack` | low (C4), quiet |
| specialist finishes (background) | `ack` | E5, gain ×1.2, green check |
| triage receives | `arrive` A5, `chime` | the brightest event: the fallback worked |

## Beat sheet (times at speed 1)

| t | what moves | state change | sound |
|---|---|---|---|
| **Beat 1 — A compatibility request; not every specialist needs to run (0.0–6.5)** | | | |
| 0.0 | — | request rows hidden; table rows hidden; destinations at alpha 0.5; exits dashed; counter `ran 0 of 3` | — |
| 0.6 / 0.9 | request rows pop | `#41` · `tags  api · schema` accent | store × 2 (quiet), ack C6 |
| 1.6 / 1.8 / 2.0 | destinations pop (scale 0.9 → 1) at alpha 0.5 | three boxes with their sublabels | ack × 3 (quiet) |
| 2.6 / 2.9 / 3.2 | table rows pop | three criteria rows fg | store × 3 (quiet) |
| 3.2–6.5 | hold | one request, three possible paths, nothing running | |
| **Beat 2 — The router chooses the relevant path (6.5–12.5)** | | | |
| 6.5–7.1 | chip `#41 · api · schema` (accent) request.bottom → table.top, 0.6 s | — | send C6 |
| 7.1 | ripple at table.top | table stroke glows | arrive G5 |
| 7.7 | row0 flashes | row0 → accent; `r0` `dashed` → 0, colour → accent | hit |
| 8.3 | row1 flashes | row1 → dim | ack (quiet) |
| 8.9 | row2 flashes | row2 → dim | ack (quiet) |
| 8.9–12.5 | hold | one lit row, one solid exit, two dim rows and dashed exits | |
| **Beat 3 — Send the task to the API reviewer (12.5–19.5)** | | | |
| 12.5–13.3 | chip `task #41` (accent) [200, 1040] → dApi.top, 0.8 s | — | send G6 (pan left) |
| 13.3 | ripple at dApi.top | dApi alpha → 1; stroke → active; label glow | arrive E5 |
| 13.8 | dApi sublabel pulses accent | `schema diff`: the tools fit the request's tags | ack E5 |
| 14.2 | counter swaps | `ran 1 of 3` | ack (low, quiet) |
| 14.2–17.5 | hold | one specialist running, two idle | |
| 17.5 | ok ripple with check at dApi.right | dApi stroke → ok | ack E5 (louder) |
| 17.5–19.5 | hold | | |
| **Beat 4 — Unclear scope goes to human triage (19.5–30.0)** | | | |
| 19.5 | — | row0 → fg; `r0` → dashed again, colour → fg | — |
| 19.9 / 20.2 | request rows swap | `#42` · `tags  ?` mid | store × 2 (quiet) |
| 20.8–21.4 | chip `#42 · ?` (mid) request.bottom → table.top, 0.6 s | — | send C6 |
| 21.4 | ripple at table.top | — | arrive G5 |
| 22.0 | row0 flashes; grey × beside it at (930, 875) | row0 stays fg | ack (quiet) |
| 22.5 | row1 flashes; grey × beside it at (930, 940) | row1 stays dim | miss (quiet) |
| 23.1 | row2 flashes | row2 → accent; `r2` `dashed` → 0, colour → accent | hit |
| 23.1–24.5 | hold | the fallback row is the only lit one | |
| 24.5–25.3 | chip `task #42` (mid) [880, 1040] → dHuman.top, 0.8 s | — | send G6 (pan right) |
| 25.3 | ripple at dHuman.top | dHuman alpha → 1; stroke → accent; sublabel `engineer` pulses | arrive A5, chime |
| 25.8 | counter swaps | `ran 1 of 3 · triage 1` | ack (low, quiet) |
| 25.8–28.5 | hold | final state: api reviewer done, db reviewer never ran, human triage holding #42, two solid exits of three | |
| 28.5–29.3 | — | `s.fade` to black, 0.8 s | — |
| 30.0 | end | finite ending | |

## Accuracy limits

- The requests, tags, criteria rows, and specialists are illustrative, drawn from the concept's two-reviewer example. The criteria are shown as three rows; a real router may use a classifier, rules, or a model, and the cut does not show how the match is computed.
- The specialists' sublabels (`schema diff`, `migration`) stand for the tools and instructions that fit each scope. Making tool access read-only is a runtime configuration (concept walkthrough step 1) and is not shown.
- The route is a choice, not proof the specialist is right: the cut shows the api reviewer finishing with a check so the scene can end, but shows no result and makes no correctness claim. The write-up carries the warning.
- `human triage` as the fallback follows the lesson text; some systems fall back to a general worker or ask a clarifying question instead. The cut shows one fallback.
- The db reviewer never runs in this cut, which is the point of routing (only the relevant path runs); it does not imply the migration never needs review.
- The counter `ran 1 of 3 · triage 1` summarises the two requests; it is not a metric recommendation.
- No `poof` is used. The one quiet `miss` marks that no specialist criterion matched.

## Acceptance checks

1. **Stills per beat** at playback seconds (speed 0.9): `6.0, 12.0, 17.0, 26.5, 30.0, 32.5` (speed-1 ≈ 5.4, 10.8, 15.3, 23.9, 27.0, 29.3). Tile with ffmpeg and view the row; view the 12.0 s (one route lit) and 30.0 s (final) stills at full size and at 350 px wide. Pass when the request rows, the three criteria rows, the three destination labels and sublabels, and the counter are readable at 350 px, exactly one criteria row is accent at 12.0 s, the solid exit is distinguishable from the two dashed exits, and the idle destinations at alpha 0.5 are clearly dimmer than the lit one.
2. **One path only**: between 7.7 and 19.5 s (speed 1) only `r0` is solid and only dApi is at full alpha; dDb never leaves alpha 0.5 in any still.
3. **Fit shown**: at 17.0 s dApi's sublabel `schema diff` has pulsed and the request's tags row still reads `api · schema`.
4. **Fallback**: at 26.5 s the request reads `#42` / `tags  ?`, rows 0–1 carry grey × marks (fading), row2 is accent, `r2` is solid, and dHuman is lit; the chime has sounded.
5. **No lingering state**: no chip remains during any hold; `r0` returns to dashed before the second request enters; the counter shows one value at a time.
6. **Overlap**: chips on `r0` and `r2` must not cross the destination labels (they arrive at the box tops); the `#41 · api · schema` chip must clear the `routing criteria` label at y = 800 except at arrival (shift the label to (540, 790) if needed); the grey × marks at x = 930 must stay inside the table and clear of row text (longest row ≈ 691 px, ending ≈ x 886). Rows at 36 px mono (32 characters ≈ 691 px) fit inside 820 px with padding; destination sublabels use the shortened forms noted.
7. **Word budget**: on-screen text is the request label and two rows, the table label and three rows, three destination labels and sublabels, and the counter. No sentence appears.
8. **Audio**: the Node dry-run lists ≈ 32 cues (2 stores with ack, 3 acks, 3 stores, send/arrive, hit, 2 acks, send/arrive, ack, ack, ack, 2 stores, send/arrive, ack, miss, hit, send/arrive/chime, ack). The spectrogram shows two `hit` sparkles at 7.7 s and 23.1 s, one quiet `miss` at 22.5 s, and the `chime` at 25.3 s as the brightest. `ffprobe` reports ≈ 33 s with an audio stream. Record whether audio was heard or only analysed.
9. **Causal reading test**: with sound off and every word removed, a viewer should still see: a card appears, three dim boxes appear in a row, and a three-row table appears between them; a chip drops from the card into the table, the first row lights orange and the dashed line below it to the left box turns solid, the other rows dim; a chip runs down that line and the left box brightens, its lower line pulses, and later it turns green; the card's rows change to grey, a chip drops in, the first two rows get grey ×, the third lights orange, its line to the right box turns solid, a chip runs down, and the right box brightens.
10. **Project checks** after encoding: `python3 scripts/check_media.py --concept orchestration-patterns`, then the full set before any release proposal. A new encode needs its own comparison review.

