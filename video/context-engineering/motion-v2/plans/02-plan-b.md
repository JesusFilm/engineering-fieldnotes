# Lesson 02 — Retrieve relevant evidence — plan B

Independent plan for the motion-v2 cut of context-engineering lesson 02. Authored from the lesson entry in `video/context-engineering/sequence/lessons.json` (item 2) and the concept content in `content/concepts/context-engineering.json`. No other plan for this lesson, no ledger, and no authoring source was consulted. This document names no authoring model.

## Scope

One mechanism: **retrieval is a selection against the task's constraint; a record earns a place in the input when it constrains the change and passes an authority check, it enters with its source attached, and adding the other nearby records grows the input without adding a constraint.**

The viewer should feel three things: the task's constraint acting as the yardstick each search result is held against; a near-miss (a draft contract that matches by name) being caught by the check; and the contrast at the end, where the input's size bar climbs while the constraints bar does not move.

Grounding (from the concept): the task is to fix invoice latency while preserving the v1 `total_cents` response; the judgement says to keep bulky evidence retrievable through precise paths and revision identifiers; the walkthrough loads the endpoint implementation and follows a schema reference only when it answers an open question; "more input is not automatically better or cheaper"; the lesson's takeaway adds that retrieved content still needs checking for authority and applicability.

Out of scope: how the model uses the records, trimming and compaction as techniques, handoffs, position effects, caching and cost figures, and the mechanics of any particular search tool. Later lessons own those. The cut ends with the input back to the two records that constrain the change.

Grammar for this cut: **a task card as the yardstick, a results list scored row by row, an input list with source stamps, and two bars under the results that disagree.** Each result row is scored in turn: a green check for a record that constrains the change, a brief accent flash then a red × for a record that matches by name but is not authoritative, a quiet dim for the rest. Chosen records hop across to the input with `@a1f3` appended. The `size` bar grows with every record; the `constraints` bar has two ticks and fills only for the two that matter. This differs from lesson 01 (two parallel lists and a receiver with a per-call header), from the loop-engineering cuts, and from the harness-engineering views. Every element is a software object: a task, a search result, a revision stamp, a size gauge.

Target length ≈ 34 s at playback. Authored at speed 1 for 31 s with `meta.speed: 0.9`. Lengthen the hold after the scoring pass and the hold on the full input first if stills read fast. Do not add beats to reach the guideline.

## Stage and coordinates (1080 × 1920)

Palette and type follow `references/style.md`. Names are 40–44 px; store rows, sublabels, and bar labels are 36 px monospace (≈ 21.6 px per character). Everything stays readable at 350 px wide (≈ 12–13 px for the smallest). If packet chip text renders below 40 px, add a `labelSize` option in the local engine copy and report it.

| id | type | centre (x, y) | size | text | notes |
|---|---|---|---|---|---|
| title | title band | (540, 330) / (540, 405) | — | **Context engineering** / RETRIEVE RELEVANT EVIDENCE | engine title + subtitle |
| task | box | (540, 590) | 700 × 150 (x 190–890, y 515–665) | label `fix invoice latency` 44 px; sublabel `constraint: v1 total_cents` 36 px mono (26 characters ≈ 562 px) | the yardstick; the sublabel pulses whenever a row is scored |
| results | store, `rows: 6`, w 440 | (250, 1010) | 440 × ≈ 360 (x 30–470, y ≈ 830–1190) | label `search results` 40 px at (250, 790); rows 36 px mono, row centres y ≈ 860, 920, 980, 1040, 1100, 1160 | row0 `invoice.py` · row1 `invoice-v1.md` · row2 `invoice-v2-draft.md` · row3 `routes.py` · row4 `README.md` · row5 `CHANGELOG.md` (max 19 characters ≈ 410 px) |
| input | store, `rows: 6`, w 480 | (810, 1010) | 480 × ≈ 360 (x 570–1050, y ≈ 830–1190) | label `input` 40 px at (810, 790); rows hidden until filled, 36 px mono | row0 `invoice.py @a1f3` · row1 `invoice-v1.md @a1f3` · rows 2–5 for the contrast: `invoice-v2-draft.md` (no stamp fits; use `v2-draft.md @a1f3`), `routes.py @a1f3`, `README.md @a1f3`, `CHANGELOG.md @a1f3` (max 19 characters ≈ 410 px) |
| size | bar, `segments: 1` | (250, 1260) | 400 × 14 | label `size` 36 px | `seg0` grows per record; colour fg, turning mid when the extras arrive |
| constraints | bar, `ticks: 2`, `segments: 1` | (250, 1340) | 400 × 14 | label `constraints` 36 px | `seg0` 0 → 0.5 → 1 in ok; never moves during the contrast |
| model | box | (540, 1500) | 480 × 150 (x 300–780, y 1425–1575) | label `model` 44 px; sublabel 36 px mono `sees —` → `sees 2 records` → `sees 6 records` → `sees 2 records` | |

Wires (dotted, resting `#3A3E45`):

| id | from | to | via | meaning |
|---|---|---|---|---|
| search | task.bottom (540, 665) | results.top (250, 830) | [540, 740], [250, 740] | the task drives the search and the scoring |
| supply0 | [470, 860] | [570, 860] | — | row0 hops across (100 px gap) |
| supply1 | [470, 920] | [570, 920] | — | row1 hops across |
| supply2–5 | [470, y] | [570, y] for y = 980, 1040, 1100, 1160 | — | used only in the contrast; drawn at alpha 0.5 |
| feed | input.bottom (810, 1190) | model.top (540, 1425) | [810, 1380], [540, 1380] | the input goes to the model |

The scoring pass uses no packets: a dot from the task lands at the top of the results, then each row is scored in place while the task's constraint sublabel pulses, so the viewer reads the comparison. The two bars sit under the results so the `feed` wire has a clear path on the right. Stage spans y ≈ 515–1575.

## Sound map

Pitches: task **C5**, results **E5**, input **G5**, model **C6**. Pan by x: results and bars left (`−0.5`), input right (`+0.5`), task and model centre.

| event | preset | notes |
|---|---|---|
| task appears | `ack` | C5 |
| constraint noted | `ack` | C6, quiet; repeated quietly as each row is scored |
| search dot leaves and lands | `send` C6, `arrive` E5 | |
| results appear | `store` | quiet, pan left, ×6 at 0.2 s |
| row constrains the change | `hit` | sparkle, pan left; ×2 |
| row matches by name | `ack` | E5, brief |
| row fails the authority check | `miss` | low falling buzz, pan left; the one negative sound in the pass |
| row dismissed | `ack` | E5, quiet, lower gain; ×3 |
| record hops into the input | `send` E6 then `store` G5 | pan left → right |
| constraints bar fills | `ack` G5 then `hit` at full | |
| input leaves for the model | `send` | G6 |
| model receives | `arrive` | C6; `hit` for the two-record input |
| extras pour in | `store` | quiet, mid, pan right, ×4 |
| size bar near full | `thump` | gain ×0.5; heavy, not broken |
| constraints bar pulses unchanged | `ack` | G5 |
| extras cleared | `poof` | quiet, ×4 |
| back to two records | `chime` | the brightest event |

## Beat sheet (times at speed 1)

| t | what moves | state change | sound |
|---|---|---|---|
| **Beat 1 — The task and its constraint; search (0.0–5.5)** | | | |
| 0.0 | — | results and input rows hidden; bars empty; model `sees —` | — |
| 0.6 | task pops (scale 0.9 → 1) | — | ack C5 |
| 1.4 | task sublabel pulses accent | sublabel colour accent → fg over 0.6 s | ack C6 |
| 2.2–3.0 | dot (fg) task.bottom → via → results.top, 0.8 s | — | send C6 |
| 3.0 | ripple at results.top | results stroke glows | arrive E5 |
| 3.0–4.0 | rows pop in order (0.2 s each) | six rows fg | store × 6 (quiet) |
| 4.0–5.5 | hold | | |
| **Beat 2 — Score each result against the constraint (5.5–13.0)** | | | |
| 5.5 | task sublabel pulses; row0 flashes | row0 → accent; ok ripple with check at (250, 860) | ack C6 (quiet), hit |
| 6.7 | task sublabel pulses; row1 flashes | row1 → accent; ok ripple with check at (250, 920) | ack C6 (quiet), hit |
| 7.9 | task sublabel pulses; row2 flashes accent | row2 → accent (it matches by name) | ack E5 |
| 8.7 | bad ripple with × at (250, 980) | row2 → bad | miss |
| 9.3 | — | row2 → dim `#3A3E45` (0.4 s) | — |
| 10.0 / 10.5 / 11.0 | rows 3, 4, 5 flash fg then dim | rows 3–5 → dim | ack × 3 (quiet) |
| 11.0–13.0 | hold | two accent rows, one dimmed after a red ×, three dimmed | |
| **Beat 3 — Supply the records with their source (13.0–19.0)** | | | |
| 13.0–13.6 | chip `invoice.py` (accent) [470, 860] → [570, 860], 0.6 s | — | send E6 |
| 13.6 | ripple at input row0 | input row0 → `invoice.py @a1f3` accent; `size` seg0 → 0.15; `constraints` seg0 → 0.5 ok | store G5, ack G5 |
| 14.4–15.0 | chip `invoice-v1.md` (accent) [470, 920] → [570, 920], 0.6 s | — | send E6 |
| 15.0 | ripple at input row1 | input row1 → `invoice-v1.md @a1f3` accent; `size` → 0.30; `constraints` → 1.0 ok | store G5, hit |
| 16.0–17.0 | chip `2 records` (accent) input.bottom → via → model.top, 1.0 s | — | send G6 |
| 17.0 | ok ripple at model.top | model stroke → ok with glow; sublabel → `sees 2 records` ok; input rows 0–1 → ok | arrive C6, hit |
| 17.0–19.0 | hold | | |
| **Beat 4 — More material is not more useful (19.0–31.0)** | | | |
| 19.0 | results rows 2–5 pulse mid | — | — |
| 19.4 / 20.0 / 20.6 / 21.2 | chips (mid) hop from results rows 2–5 to input rows 2–5, 0.5 s each | input rows 2–5 → `v2-draft.md @a1f3`, `routes.py @a1f3`, `README.md @a1f3`, `CHANGELOG.md @a1f3` in mid; `size` seg0 → 0.46, 0.62, 0.78, 0.95; `size` colour → mid | store × 4 (quiet) |
| 21.8 | — | `size` bar pulses | thump (quiet) |
| 22.0 | `constraints` bar pulses | unchanged at 1.0 with two ticks | ack G5 |
| 22.2–23.2 | chip `6 records` (mid) input.bottom → via → model.top, 1.0 s | — | send G6 |
| 23.2 | ripple at model.top | model sublabel → `sees 6 records` mid; model stroke → fg (glow off) | arrive C6 (quiet) |
| 23.2–25.5 | hold | full input, `size` near full, `constraints` unchanged | |
| 25.5–26.7 | — | input rows 2–5 alpha → 0 at 0.3 s intervals; `size` seg0 → 0.30, colour → fg | poof × 4 (quiet) |
| 27.0 | `constraints` bar pulses ok; model pulses ok | model sublabel → `sees 2 records` ok; stroke → ok with glow | chime |
| 27.0–29.5 | hold | final state: two accent rows in results, two stamped rows in input, `size` at 0.30, `constraints` full, lit model | |
| 29.5–30.3 | — | `s.fade` to black, 0.8 s | — |
| 31.0 | end | finite ending | |

## Accuracy limits

- The task, constraint, file names, and the revision stamp `a1f3` are illustrative, drawn from the concept's invoice example. The cut shows two records as constraining the change (the endpoint implementation and the v1 contract) because the concept names those; a real task may have more or fewer.
- `invoice-v2-draft.md` is a teaching device for the takeaway's authority check: a record that matches the topic but is not in force. The cut does not show how authority is determined (ownership, status, approval); the write-up carries that.
- The `size` bar is relative and unitless; it stands for input length in tokens without claiming a figure. The cut does not claim a cost or latency effect, only that size grows without the constraint count changing.
- Dismissing `routes.py`, `README.md`, and `CHANGELOG.md` is the library's judgement for this task; in another task any of them could constrain the change. The cut shows selection relative to one task, which is the lesson's point.
- Clearing the extras in beat 4 shows a selection decision reversed; it is not a demonstration of trimming or compaction as techniques, which later lessons cover.
- The source stamp (`@a1f3`) represents "include where each record came from" as a path plus revision. Real stamps may include a URL, a commit hash, or a retrieval time.
- The quiet `poof` reuses an eviction preset to clear the extra rows; it is kept quiet so it does not read as a failure. The quiet `thump` marks the input becoming heavy, not an error. Note both reuses in the hand-over.

## Acceptance checks

1. **Stills per beat** at playback seconds (speed 0.9): `5.0, 13.5, 20.0, 27.0, 31.5, 34.0` (speed-1 ≈ 4.5, 12.2, 18.0, 24.3, 28.4, 30.6). Tile with ffmpeg and view the row; view the 13.5 s (scored list) and 27.0 s (full input) stills at full size and at 350 px wide. Pass when all six result rows are readable at 350 px, the two accent rows, the dimmed red-×'d row, and the three dim rows are distinguishable, the `@a1f3` stamps are readable in the input, both bar labels are readable, and the `size` and `constraints` fills at 27.0 s are clearly different lengths.
2. **The yardstick**: during the scoring pass the task's constraint sublabel pulses before each row's mark; in the 13.5 s still the sublabel is at fg and the rows carry their final colours.
3. **Near-miss order**: row2 is accent before it is bad, and bad before it is dim (speed-1 7.9 → 8.7 → 9.3); the red × ripple is centred on row2.
4. **The contrast**: at 27.0 s the `size` fill is ≥ 0.9 and mid while the `constraints` fill is 1.0 with two ticks and ok; the model reads `sees 6 records` in mid. At 31.5 s the `size` fill is back to ≈ 0.3 and fg, the model reads `sees 2 records` in ok, and input rows 2–5 are gone.
5. **No lingering state**: no chip remains during any hold; the results panel's row texts are unchanged in every still; the `constraints` bar never changes after 15.0 s (speed 1).
6. **Overlap**: hop chips must fit the 100 px gap without covering row text in either panel (let them fade on both ends if needed); the `2 records` / `6 records` chips must clear the model label; the `search` dot must not cross the `search results` label at y = 790 except at arrival. Rows at 36 px mono (19 characters ≈ 410 px) fit inside 440 and 480 px panels with padding.
7. **Word budget**: on-screen text is the task label and constraint, two panel labels, six result rows, up to six input rows, two bar labels, and the model's sublabel. No sentence appears.
8. **Audio**: the Node dry-run lists ≈ 45 cues (6 stores, 2 hits, ack/miss, 3 quiet acks, sends/stores/acks for two records, send/arrive/hit, 4 quiet stores, thump, ack, send/arrive, 4 poofs, chime, plus the constraint's quiet acks). The spectrogram shows the `miss` at 8.7 s as the one low falling event in the pass, the `hit` at 17.0 s, a quiet `thump` at 21.8 s, and the `chime` at 27.0 s as the brightest. `ffprobe` reports ≈ 34 s with an audio stream. Record whether audio was heard or only analysed.
9. **Causal reading test**: with sound off and every word removed, a viewer should still see: a top card sends to a left list that fills; rows are marked one by one (two green checks, one orange flash then red ×, three dims) while the card's lower line pulses; two rows hop right and two bars under the left list grow; the right list sends down and the bottom box lights green; four grey rows hop right, the upper bar nearly fills, the lower bar does not move, the bottom box goes neutral; the grey rows vanish, the upper bar shrinks, the bottom box lights green again.
10. **Project checks** after encoding: `python3 scripts/check_media.py --concept context-engineering`, then the full set before any release proposal. A new encode needs its own comparison review.

