# Lesson 02 — Make inputs explicit — plan B

Independent plan for the motion-v2 cut of tool-design lesson 02. Authored from the lesson entry in `video/tool-design/sequence/lessons.json` (item 2) and the concept content in `content/concepts/tool-design.json`. No other plan for this lesson, no ledger, and no authoring source was consulted. This document names no authoring model.

## Scope

One mechanism: **the tool declares its input fields and which are required; the application compares every call against that declaration before executing, rejects a call that is missing a required field with an error that names the field, and lets only a call that passes reach the search.**

The viewer should feel the walk down the schema: each required name is looked for in the call, found fields get a check in the lane between the two lists, the missing `end` gets a red × and the execution wire stays dashed; the error that goes back names the field, and the corrected call passes the same walk before the wire opens.

Grounding (from the concept): the walkthrough's step 2 says to validate arguments before the backend call, that JSON Schema properties alone do not make fields required or forbid extra keys so those constraints must be declared deliberately, and that validation and authorization happen in server code; the exercise's success criterion is that invalid intervals are rejected before backend execution. The lesson's takeaway adds that shape validation does not establish authorization or usefulness.

Out of scope: authorization (shown only as a label stating that this check is shape only), the backend's results and their statuses (later lessons), retries, pagination, output size, and interval semantics beyond presence of the fields. The cut ends when the corrected call has been validated and the search has run once.

Grammar for this cut: **two lists with a check lane and a gated wire.** The schema list on the left names each field and whether it is required; the call list on the right shows the fields a call actually carries; marks land in the lane between them row by row; the wire from the call to the search is dashed (closed) until every required row has a check. This differs from lesson 01 (a slot-filling card with the model above and application and store below), from the context-engineering cuts (which include a comparator with values on both sides, but no gate, no required/optional declaration, and no bounce), the loop-engineering cuts, and the harness-engineering views. Every element is a software object: a schema row, a call field, a validation mark, an error response, a gated wire.

Target length ≈ 33 s at playback. Authored at speed 1 for 30 s with `meta.speed: 0.9`. Lengthen the hold after the red × and the hold after the wire opens first if stills read fast. Do not add beats to reach the guideline.

## Stage and coordinates (1080 × 1920)

Palette and type follow `references/style.md`. Names are 40–44 px; store rows, sublabels, and the lane label are 36 px monospace (≈ 21.6 px per character). Everything stays readable at 350 px wide (≈ 12–13 px for the smallest). If packet chip text renders below 40 px, add a `labelSize` option in the local engine copy and report it.

| id | type | centre (x, y) | size | text | notes |
|---|---|---|---|---|---|
| title | title band | (540, 330) / (540, 405) | — | **Tool design** / MAKE INPUTS EXPLICIT | engine title + subtitle |
| model | box | (540, 580) | 520 × 150 (x 280–800, y 505–655) | label `model` 44 px; sublabel 36 px mono `payments · last hour?` → `add: end` → `resent with end` | the caller |
| schema | store, `rows: 4`, w 400 | (240, 1000) | 400 × ≈ 300 (x 40–440, y ≈ 850–1150); row centres y ≈ 890, 950, 1010, 1070 | label `schema` 40 px at (240, 810); rows 36 px mono | row0 `service  required` · row1 `start    required` · row2 `end      required` · row3 `limit    optional` mid (17 characters ≈ 367 px); the word `required` is accent |
| call | store, `rows: 4`, w 480 | (800, 1000) | 480 × ≈ 300 (x 560–1040, y ≈ 850–1150); same row y's | label `call` 40 px at (800, 810); rows 36 px mono, hidden until a call arrives | first call: row0 `service: payments` · row1 `start:   09:00Z` · row2 `limit:   20` · row3 `—` dim; corrected call adds row3 `end:     10:00Z` accent (17 characters ≈ 367 px) |
| lane | label | (500, 1190) | 36 px mono, mid | `validation · shape only` | under the gap between the lists (24 characters ≈ 518 px, centred on x = 500; spans 241–759, below both panels) |
| search | box | (540, 1400) | 520 × 140 (x 280–800, y 1330–1470) | label `search_incidents` 40 px mono; sublabel 36 px `not run` → `running…` → `done · 2 items` | |

Marks land in the lane at (500, y_row): a green ripple with check for a field found, a red ripple with × for a required field not found.

Wires (dotted, resting `#3A3E45`):

| id | from | to | via | meaning |
|---|---|---|---|---|
| submit | model.bottom (540, 655) | call.top (800, 850) | [540, 730], [800, 730] | a call arrives; the error travels back along the same path |
| exec | call.bottom (800, 1150) | search.top (540, 1330) | [800, 1250], [540, 1250] | the gate: `dashed` 1 and dim at rest; opens (dashed 0, flow 1, accent) only when validation passes |

The schema list has no wire; it is the declaration the validator reads. The `lane` label sits below the gap so the marks above it stay clear. Stage spans y ≈ 505–1470.

## Sound map

Pitches: model **C5**, schema **E5**, call list **G5**, search **A5**. Pan by x: schema left (`−0.5`), call right (`+0.5`), model and search centre; marks in the lane are centred.

| event | preset | notes |
|---|---|---|
| model appears, question noted | `ack` C5, then `ack` C6 (quiet) | |
| schema rows appear | `store` | quiet, pan left, ×4; the three `required` rows add a quiet `ack` E5 |
| call leaves and lands | `send` C6, `arrive` G5 | |
| call rows appear | `store` | quiet, pan right, ×3 (×4 for the corrected call) |
| a required field is found | `ack` | E5, with the green check ripple |
| an optional field is found | `ack` | E5, lower gain |
| a required field is missing | `miss` | low falling buzz; the schema row and call stroke turn bad |
| call rejected | `thump` | gain ×0.7; the rejected rows fade |
| error leaves and lands | `send` G6, `arrive` C5 | the model's sublabel names the field |
| gate opens | `hit` | sparkle as the wire turns solid and accent |
| call reaches the search | `send` G6, `arrive` A5 | |
| search runs | `work` | ×5 at 0.2 s |
| search done | `chime` | the brightest event |
| lane label pulses | `ack` | mid, quiet; a reminder that this check was shape only |

## Beat sheet (times at speed 1)

| t | what moves | state change | sound |
|---|---|---|---|
| **Beat 1 — The fields are explicit (0.0–6.0)** | | | |
| 0.0 | — | schema and call rows hidden; `exec` wire dashed and dim; search `not run` | — |
| 0.6 | model pops | — | ack C5 |
| 1.2 | model sublabel pulses accent | `payments · last hour?` accent → fg | ack C6 (quiet) |
| 2.0–2.6 | schema rows pop in order (0.2 s each) | rows 0–2 with `required` in accent; row3 `optional` mid | store × 4 (quiet), ack E5 × 3 (quiet) |
| 3.2 | `lane` label fades in (alpha 0 → 1, 0.4 s) | `validation · shape only` mid | — |
| 3.2–6.0 | hold | four declared fields, three required, a closed gate | |
| **Beat 2 — A call omits the end time (6.0–13.0)** | | | |
| 6.0–6.8 | chip `call` (fg) model.bottom → via → call.top, 0.8 s | — | send C6 |
| 6.8 | ripple at call.top | call stroke → active | arrive G5 |
| 6.8 / 7.0 / 7.2 | call rows pop | row0 `service: payments` · row1 `start:   09:00Z` · row2 `limit:   20` fg; row3 `—` dim | store × 3 (quiet) |
| 8.0 | schema row0 flashes; call row0 flashes | ok ripple with check at (500, 890) | ack E5 |
| 8.8 | schema row1 flashes; call row1 flashes | ok ripple with check at (500, 950) | ack E5 |
| 9.6 | schema row2 flashes accent; call rows flash in turn with no match (0.1 s each) | — | — |
| 10.2 | bad ripple with × at (500, 1010) | schema row2 → bad; call stroke → bad; call row3 `—` → bad | miss |
| 10.8 | schema row3 flashes; call row2 (`limit`) flashes | ok ripple with check at (500, 1070), smaller | ack E5 (quiet) |
| 10.8–13.0 | hold | three checks and one red × in the lane; the gate still dashed | |
| **Beat 3 — Reject before execution; return an actionable error (13.0–18.5)** | | | |
| 13.0 | call shakes ±8 px, 0.35 s | call rows alpha → 0.35 (0.4 s) | thump |
| 13.4–14.2 | chip `400 · missing: end` (bad) call.top → via → model.bottom, 0.8 s | — | send G6 |
| 14.2 | bad ripple at model.bottom | model stroke flashes bad then fg; sublabel → `add: end` bad → accent over 0.6 s | arrive C5 |
| 14.6 | search pulses mid | sublabel `not run` pulses; `exec` wire still dashed | — |
| 14.6–16.5 | hold | the error names the field; nothing ran | |
| 16.5 | — | call rows alpha → 0 (0.3 s); call stroke → mid; schema row2 → fg; lane marks have faded | — |
| 16.5–18.5 | hold | | |
| **Beat 4 — A corrected call passes the same check, then runs (18.5–30.0)** | | | |
| 18.5 | model pulses | sublabel → `resent with end` fg | — |
| 18.5–19.3 | chip `call` (fg) model.bottom → via → call.top, 0.8 s | — | send C6 |
| 19.3 | ripple at call.top | call stroke → active | arrive G5 |
| 19.3 / 19.5 / 19.7 / 19.9 | call rows pop | row0 `service: payments` · row1 `start:   09:00Z` · row2 `limit:   20` · row3 `end:     10:00Z` accent | store × 4 (quiet) |
| 20.6 | schema row0 and call row0 flash | ok check at (500, 890) | ack E5 |
| 21.2 | schema row1 and call row1 flash | ok check at (500, 950) | ack E5 |
| 21.8 | schema row2 and call row3 flash accent | ok check at (500, 1010), larger; call row3 → ok | ack E5 (gain ×1.3) |
| 22.4 | schema row3 and call row2 flash | ok check at (500, 1070), smaller | ack E5 (quiet) |
| 22.9 | — | call stroke → ok; `exec` wire `dashed` → 0, colour → accent, `flow` → 1 (0.5 s) | hit |
| 23.4–24.2 | chip `call` (ok) call.bottom → via → search.top, 0.8 s | — | send G6 |
| 24.2 | ripple at search.top | search stroke → active; sublabel → `running…` accent | arrive A5 |
| 24.4–25.4 | — | glow held | work × 5 |
| 25.6 | search pulses ok | sublabel → `done · 2 items` ok; stroke → ok; `exec` wire `flow` → 0, colour → fg | chime |
| 26.2 | `lane` label pulses | — | ack (mid, quiet) |
| 26.2–28.5 | hold | final state: schema intact, four-row call in ok, open wire, search done | |
| 28.5–29.3 | — | `s.fade` to black, 0.8 s | — |
| 30.0 | end | finite ending | |

## Accuracy limits

- The field names, values, and the `400` code are illustrative, drawn from the concept's example; the concept lists five arguments (`service, start_time, end_time, limit, cursor`) and the cut shows four for legibility (`cursor` is omitted, and `start`/`end` are short forms). The write-up carries the full signature and the chosen required set.
- `required` and `optional` are shown as declared on the schema rows. The concept notes that JSON Schema properties alone do not make fields required; the cut assumes the team has declared the required list deliberately, as the walkthrough recommends.
- The validator walks required fields in schema order and marks the optional field when present. Real validation also checks types, formats, and extra keys; the cut shows presence only.
- `400 · missing: end` stands for an actionable input error that names the field. The concept does not prescribe an HTTP status or a message format; the write-up describes what makes an input error actionable.
- The lane label `validation · shape only` carries the takeaway that passing validation does not establish authorization or that the query is useful. Authorization is not shown; it belongs in server code and in a later lesson.
- `done · 2 items` is a placeholder result so the cut can end with the search having run; result statuses and their meanings are later lessons.
- No `poof` is used in this cut. The `thump` marks the call being rejected; the `miss` marks the missing field.

## Acceptance checks

1. **Stills per beat** at playback seconds (speed 0.9): `5.5, 12.5, 17.0, 24.5, 28.5, 31.5` (speed-1 ≈ 5.0, 11.3, 15.3, 22.1, 25.7, 28.4). Tile with ffmpeg and view the row; view the 12.5 s (red ×) and 24.5 s (four checks, open wire) stills at full size and at 350 px wide. Pass when all schema and call rows are readable at 350 px, `required` and `optional` are distinguishable by colour, the lane marks are visible between the lists with the × clearly red, the lane label is readable, and the dashed `exec` wire at 12.5 s is clearly different from the solid accent wire at 24.5 s.
2. **Declaration before call**: at 5.5 s the schema list is complete and the call list is empty; the gate is dashed.
3. **Walk order**: marks land top to bottom in schema order in both passes; the × at (500, 1010) lands only after the call rows have flashed without a match (speed-1 9.6–10.2 s).
4. **Nothing ran**: the search sublabel reads `not run` until 24.2 s (speed 1); the `exec` wire is dashed until 22.9 s; no chip travels on `exec` before 23.4 s.
5. **Actionable error**: the error chip's text names `end`; the model's sublabel reads `add: end` at 17.0 s (playback); the corrected call's row3 reads `end:     10:00Z` in accent at 24.5 s.
6. **No lingering state**: the first call's rows and the first pass's marks are gone before the second call arrives; no chip remains during any hold; the lane label is at full alpha from 3.2 s (speed 1) onward.
7. **Overlap**: the `call` and error chips on `submit` must not cross the `call` label at y = 810 except at arrival; lane marks (r1 ≤ 50) must stay clear of row text in both panels (the gap is 120 px); the `400 · missing: end` chip must be readable at 40 px or shortened to `missing: end`; the `call` chip on `exec` must clear the lane label. Rows at 36 px mono (17 characters ≈ 367 px) fit inside 400 and 480 px with padding.
8. **Word budget**: on-screen text is the model label and sublabel, two list labels, eight rows, the lane label, and the search label and sublabel. No sentence appears.
9. **Audio**: the Node dry-run lists ≈ 45 cues (2 acks, 4 stores with 3 acks, send/arrive, 3 stores, 2 acks, miss, quiet ack, thump, send/arrive, send/arrive, 4 stores, 4 acks, hit, send/arrive, 5 works, chime, ack). The spectrogram shows the `miss` at 10.2 s and the `thump` at 13.0 s as the negative events, the `hit` at 22.9 s when the gate opens, and the `chime` at 25.6 s as the brightest. `ffprobe` reports ≈ 33 s with an audio stream. Record whether audio was heard or only analysed.
10. **Causal reading test**: with sound off and every word removed, a viewer should still see: a left list of four rows, three highlighted; a top box sends to a right list that fills three rows; marks appear between the lists, two green, one red, one small green, and the right list turns red with a dashed wire below it unchanged; the right list shakes and sends a red chip back up to the top box; the right list empties; the top box sends again, the right list fills four rows, four green marks appear, the wire below turns solid and bright, a chip runs down it to a bottom box that works and lights green.
11. **Project checks** after encoding: `python3 scripts/check_media.py --concept tool-design`, then the full set before any release proposal. A new encode needs its own comparison review.

