# Lesson 01 — A callable operation — plan B

Independent plan for the motion-v2 cut of tool-design lesson 01. Authored from the lesson entry in `video/tool-design/sequence/lessons.json` (item 1) and the concept content in `content/concepts/tool-design.json`. No other plan for this lesson, no ledger, and no authoring source was consulted. This document names no authoring model.

## Scope

One mechanism: **a tool is a documented operation with named arguments; the model selects it from its description and fills its arguments to form a structured call; the application receives that call, checks it, executes it against the backend, and returns the result, which the model then uses as evidence.**

The viewer should feel the shape of the exchange: the model reads a short description and fills three slots, the filled card leaves as one call, the work happens on a wire between the application and the incidents store with the model dimmed and out of the loop, and the result travels back up the other side to light the model.

Grounding (from the concept): "a tool is an executable interface the model can request: an operation with documented inputs, results, and errors. The application executes it"; the example proposes `search_incidents(service, start_time, end_time, limit, cursor)` returning incident IDs, summaries, the searched interval, and a cursor; the walkthrough validates arguments and authorizes the caller in server code and says tool names and descriptions are not access controls; the lesson's takeaway puts execution, authorization, and error handling in application code.

Out of scope: empty, partial, and error results and how they differ (later lessons), retries and budgets, pagination and cursors, output size, and the content of the incidents. This cut shows one successful call end to end.

Grammar for this cut: **a tool card with a description line and argument slots, a model above it, an application and an incidents store below it, and two margins for the two directions.** The model fills the card's slots with chips; the card leaves as a single call down the centre; execution is a short wire between the application and the store on the right; the result returns up the left margin. This differs from the context-engineering cuts (lists and receivers, scored results, response shapes, transcript and handoff, comparator), the loop-engineering cuts, and the harness-engineering views. Every element is a software object: a model, a tool signature, an argument value, an application, a data store.

Target length ≈ 28 s at playback. Authored at speed 1 for 25.5 s with `meta.speed: 0.9`. This sits under the 35–50 s guideline because the lesson is one happy-path call in four beats; lengthen the hold after the slots fill and the hold during execution first if stills read fast. Do not add beats to reach the guideline.

## Stage and coordinates (1080 × 1920)

Palette and type follow `references/style.md`. Names are 40–44 px; store rows and sublabels are 36 px monospace (≈ 21.6 px per character). Everything stays readable at 350 px wide (≈ 12–13 px for the smallest). If packet chip text renders below 40 px, add a `labelSize` option in the local engine copy and report it.

| id | type | centre (x, y) | size | text | notes |
|---|---|---|---|---|---|
| title | title band | (540, 330) / (540, 405) | — | **Tool design** / A CALLABLE OPERATION | engine title + subtitle |
| model | box | (540, 600) | 520 × 150 (x 280–800, y 525–675) | label `model` 44 px; sublabel 36 px mono `payments · last hour?` → `evidence: INC-204` | dims to alpha 0.6 while the application executes |
| tool | store, `rows: 5`, w 620 | (540, 960) | 620 × ≈ 320 (x 230–850, y ≈ 800–1120); row centres y ≈ 830, 890, 950, 1010, 1070 | label `tool` 40 px at (540, 760); rows 36 px mono | row0 `search_incidents` fg · row1 `read incidents in window` mid (the description, 24 characters ≈ 518 px) · row2 `service  —` · row3 `start    —` · row4 `end      —`; slots fill to `service  payments`, `start    09:00Z`, `end      10:00Z` |
| app | box | (360, 1330) | 440 × 150 (x 140–580, y 1255–1405) | label `application` 44 px; sublabel 36 px `waiting` → `validates` → `executes` → `returns` | |
| store | db | (860, 1330) | w ≈ 140 | label `incidents` 36 px at (860, 1420) | `busy` spins while the query runs |

Wires (dotted, resting `#3A3E45`):

| id | from | to | via | meaning |
|---|---|---|---|---|
| read | model.bottom (540, 675) | tool.top (540, 800) | — | the model reads the description and fills the slots |
| call | tool.bottom (540, 1120) | app.top (360, 1255) | [540, 1190], [360, 1190] | the filled card leaves as one structured call |
| query | app.right (580, 1330) | store.left (≈ 790, 1330) | — | the application executes against the backend (210 px) |
| return | app.left (140, 1330) | model.left (280, 600) | [70, 1330], [70, 600] | the result goes back to the model through the application |

There is no wire between the model and the incidents store; the model's only connections are `read` downward and `return` inward. The `return` wire uses the left margin so the viewer sees the call go down the centre and the result come back around. Stage spans y ≈ 525–1420.

## Sound map

Pitches: model **C5**, tool **G5**, application **E5**, incidents store **A5**. Pan by x: application slightly left (`−0.3`), incidents store right (`+0.5`), model and tool centre; the `return` chip pans from left to centre as it climbs.

| event | preset | notes |
|---|---|---|
| model appears, question noted | `ack` C5, then `ack` C6 (quiet) | |
| tool rows appear | `store` | quiet, ×5 at 0.2 s |
| model reads the description | `send` C6, `ack` G5 | the description row pulses |
| a slot fills | `store` | G5, A5, B5 for the three slots: the call is heard taking shape |
| the call is complete | `ack` | G5 |
| call leaves and lands | `send` G6, `arrive` E5 | |
| arguments checked | `ack` | E5, with a green check ripple |
| model steps back | `poof` | quiet; the model dims |
| query leaves and lands | `send` E6, `arrive` A5 | pan right |
| backend works | `work` | ×6 at 0.2 s, pan right |
| rows return to the application | `store` A5, `arrive` E5 | |
| result climbs to the model | `send` | E6, pan left |
| model receives evidence | `arrive` C5, `chime` | the brightest event |
| settled | `deliver` | high, quiet |

## Beat sheet (times at speed 1)

| t | what moves | state change | sound |
|---|---|---|---|
| **Beat 1 — The need and the operation (0.0–6.0)** | | | |
| 0.0 | — | tool rows hidden; app `waiting`; store idle | — |
| 0.6 | model pops (scale 0.9 → 1) | — | ack C5 |
| 1.2 | model sublabel pulses accent | `payments · last hour?` accent → fg over 0.6 s | ack C6 (quiet) |
| 2.0–2.8 | tool rows pop in order (0.2 s each) | row0 name fg; row1 description mid; rows 2–4 slots with `—` | store × 5 (quiet) |
| 3.4–3.9 | dot (fg) model.bottom → tool.top, 0.5 s | — | send C6 |
| 3.9 | row1 pulses accent; row0 → accent | the description is what the model reads to choose | ack G5 |
| 3.9–6.0 | hold | a named operation with three empty slots | |
| **Beat 2 — A structured call (6.0–13.0)** | | | |
| 6.0–6.6 | chip `payments` (fg) model.bottom → [540, 950], 0.6 s | row2 → `service  payments` | store G5 |
| 7.2–7.8 | chip `09:00Z` (fg) model.bottom → [540, 1010], 0.6 s | row3 → `start    09:00Z` | store A5 |
| 8.4–9.0 | chip `10:00Z` (fg) model.bottom → [540, 1070], 0.6 s | row4 → `end      10:00Z` | store B5 |
| 9.4 | tool pulses | tool stroke → accent | ack G5 |
| 10.0–10.8 | chip `call` (accent) tool.bottom → via → app.top, 0.8 s | — | send G6 |
| 10.8 | ripple at app.top | app stroke → active; sublabel → `validates` | arrive E5 |
| 11.4 | ok ripple with check at app.top | — | ack E5 |
| 11.8 | — | model alpha → 0.6, stroke → mid (0.5 s) | poof (quiet) |
| 11.8–13.0 | hold | the call is with the application; the model waits | |
| **Beat 3 — The application executes; the model does not (13.0–17.5)** | | | |
| 13.0 | — | app sublabel → `executes` | — |
| 13.0–13.6 | chip `query` (fg) app.right → store.left, 0.6 s | — | send E6 |
| 13.6 | ripple at store | store `busy` → 1; colour accent | arrive A5 |
| 13.8–15.0 | — | spinner held; model stays dim | work × 6 |
| 15.2–15.8 | chip `2 rows` (ok) store.left → app.right, 0.6 s | store `busy` → 0, colour mid | store A5 |
| 15.8 | ripple at app.right | app sublabel → `returns` | arrive E5 |
| 15.8–17.5 | hold | | |
| **Beat 4 — The result returns as evidence (17.5–25.5)** | | | |
| 17.5–18.9 | chip `ok · 2 items` (ok) app.left → via → model.left, 1.4 s | — | send E6 (pan left) |
| 18.9 | ok ripple at model.left | model alpha → 1, stroke → ok with glow; sublabel → `evidence: INC-204` ok | arrive C5, chime |
| 19.5 | — | tool stroke → fg; app stroke → mid, sublabel → `waiting` | deliver (quiet) |
| 19.5–24.0 | hold | final state: lit model citing an ID, filled tool card, idle application and store | |
| 24.0–24.8 | — | `s.fade` to black, 0.8 s | — |
| 25.5 | end | finite ending | |

## Accuracy limits

- The tool, its arguments, the times, the row count, and `INC-204` are illustrative, drawn from the concept's example. The concept lists five arguments (`service, start_time, end_time, limit, cursor`); the card shows three for legibility and the write-up carries the full signature. The concept states these are illustrative application fields, not mandatory MCP fields.
- The description row `read incidents in window` stands for the documented description that guides selection. Real descriptions are longer; the cut shows the one-line role, not the text.
- The single green check at the application stands for argument validation and caller authorization in server code. The cut does not show either in detail; the concept's point that names and descriptions are not access controls is in the write-up.
- The cut shows one successful call. Successful-empty, partial, and error results, the status field, and `isError` are deliberately absent and belong to later lessons.
- "The model does not run it directly" is shown by topology (no wire from the model to the store) and by the model dimming during execution, not by a refused attempt.
- `2 rows` and `ok · 2 items` are the backend's and the application's views of the same result; the cut does not show summaries, the searched interval, or a cursor, which the concept's example returns.
- The quiet `poof` reuses an eviction preset to dim the model as it steps back; it is kept quiet so it does not read as a failure. Note the reuse in the hand-over.

## Acceptance checks

1. **Stills per beat** at playback seconds (speed 0.9): `5.5, 10.5, 14.0, 16.5, 20.5, 26.5` (speed-1 ≈ 5.0, 9.5, 12.6, 14.9, 18.5, 23.9). Tile with ffmpeg and view the row; view the 10.5 s (filled slots) and 16.5 s (execution) stills at full size and at 350 px wide. Pass when all five tool rows are readable at 350 px, the filled slot values are readable, the model's and application's sublabels are readable, the store's spinner is visible at 16.5 s, and the dimmed model is clearly dimmer than the active application at 16.5 s.
2. **Description before call**: at 5.5 s row1 has pulsed and row0 is accent while the slots are still `—`; no chip has left the model.
3. **One call, three slots**: the slots fill top to bottom at 1.2 s intervals (speed 1), and the `call` chip leaves only after the third slot is filled and the card stroke is accent.
4. **Model out of the loop**: between 11.8 and 18.9 s (speed 1) the model is at alpha 0.6 and nothing travels on the `read` wire; the only movement is on `query` and then `return`.
5. **No lingering state**: no chip remains during any hold; the store's spinner is off outside 13.6–15.2 s; the check ripple at the application has faded before the `query` chip leaves.
6. **Overlap**: slot chips must land on the slot's dash position without covering the argument name; the `call` chip must not cross the tool's bottom rows; the `ok · 2 items` chip at x = 70 must stay inside the frame and clear of the application and tool panels; the `query` and `2 rows` chips must fit the 210 px gap and clear the `incidents` label. Rows at 36 px mono (24 characters ≈ 518 px) fit inside 620 px with padding.
7. **Word budget**: on-screen text is the model label and sublabel, the tool label and five rows, the application label and sublabel, and the store label. No sentence appears beyond the description row.
8. **Audio**: the Node dry-run lists ≈ 32 cues (2 acks, 5 stores, send/ack, 3 stores, ack, send/arrive, ack, poof, send/arrive, 6 works, store/arrive, send, arrive/chime, deliver). The spectrogram shows the three rising `store` notes at 6.6–9.0 s, a sparse stretch during execution with the work ticks, and the `chime` at 18.9 s as the brightest event, with a sound on every landing. `ffprobe` reports ≈ 28 s with an audio stream. Record whether audio was heard or only analysed.
9. **Causal reading test**: with sound off and every word removed, a viewer should still see: a top box reads a card below it, whose second line pulses; three chips drop from the box into three slots; the card sends one chip down to a lower-left box, which flashes a check while the top box dims; the lower-left box sends right to a cylinder that spins and sends back; a chip climbs the left margin into the top box, which lights green.
10. **Project checks** after encoding: `python3 scripts/check_media.py --concept tool-design`, then the full set before any release proposal. A new encode needs its own comparison review.

