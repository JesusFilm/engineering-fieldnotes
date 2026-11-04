# Lesson 01 — What the model can see — plan B

Independent plan for the motion-v2 cut of context-engineering lesson 01. Authored from the lesson entry in `video/context-engineering/sequence/lessons.json` (item 1) and the concept content in `content/concepts/context-engineering.json`. No other plan for this lesson, no ledger, and no authoring source was consulted. This document names no authoring model.

## Scope

One mechanism: **the model receives only the input assembled for one invocation; a file in the repository enters that input only when the application selects and copies it in, and the next invocation starts from a fresh input list, so what the model can see must be checked per call.**

The viewer should feel the distance between the two lists: the contract file sits in the repository list the whole time, while the input list beside it either has a copy of the file or an empty slot, and the model lights according to the input list alone. The second invocation makes the point twice: the file is still there, the input slot is empty again, and an inspection finds the gap before the model is called.

Grounding (from the concept): context is "the information supplied to a model for a particular invocation: instructions, conversation, tool descriptions, and retrieved results. Files on disk are not automatically visible." The example is an invoice endpoint whose v1 contract (`total_cents`) must survive; the pitfall is "keeping a path in notes but never loading its contents before the relevant decision."

Out of scope: handoffs between sessions, compaction and trimming, retrieval strategy, evidence position effects, caching and cost, and anything the model does with the contract once it has it. Later lessons own those. The cut ends when the second invocation's input has been checked, repaired, and delivered.

Grammar for this cut: **two parallel lists and a receiver.** The repository is a store of file rows that never changes; the input is a store whose header names the call and whose rows fill from the application's selections; the model is a box whose sublabel counts what it received. Selection is a copy chip crossing the gap between the two lists while the source row stays. A new call is the input header changing in place and its retrieved rows clearing. This is a different grammar from the loop-engineering cuts (vertical loop with ports, test grid with code pane, run bar with rule panel, counter pipeline, budget gauges) and from the harness-engineering views. Every element is a software object: a file list, an input list, a model, a copied file.

Target length ≈ 31 s at playback. Authored at speed 1 for 28 s with `meta.speed: 0.9`. This sits under the 35–50 s guideline because the lesson is four short beats; lengthen the holds after the first model delivery and after the missing-slot flash first if stills read fast. Do not add beats to reach the guideline.

## Stage and coordinates (1080 × 1920)

Palette and type follow `references/style.md`. Names are 40–44 px; store rows and sublabels are 36 px monospace (≈ 21.6 px per character). Everything stays readable at 350 px wide (≈ 12–13 px for the smallest). If packet chip text renders below 40 px, add a `labelSize` option in the local engine copy and report it.

| id | type | centre (x, y) | size | text | notes |
|---|---|---|---|---|---|
| title | title band | (540, 330) / (540, 405) | — | **Context engineering** / WHAT THE MODEL CAN SEE | engine title + subtitle |
| app | box | (540, 580) | 520 × 140 (x 280–800, y 510–650) | label `application` 44 px; sublabel `assembles the input` 36 px | the selector |
| repo | store, `rows: 5`, w 380 | (230, 960) | 380 × ≈ 320 (x 40–420, y ≈ 800–1120) | label `repository` 40 px at (230, 760); rows 36 px mono, fg → mid after appearing | row0 `invoice.py` · row1 `routes.py` · row2 `invoice-v1.md` · row3 `test_invoice.py` · row4 `README.md` (max 15 characters ≈ 324 px) |
| input | store, `rows: 5`, w 500 | (760, 960) | 500 × ≈ 320 (x 510–1010, y ≈ 800–1120) | label `input · call 1` 40 px mono at (760, 760); rows 36 px mono | row0 `instructions` · row1 `conversation` · row2 `tool list` · row3 `—` dim · row4 `—` dim; row3 becomes `invoice-v1.md` when selected |
| model | box | (540, 1420) | 480 × 150 (x 300–780, y 1345–1495) | label `model` 44 px; sublabel 36 px mono `sees —` → `sees 3 items` → `sees 4 items` | |
| badge | badge | (230, 1180) | — | `on disk only` | mid grey; sits under the repository panel; hidden (scale 0) when the file is in the input |

Wires (dotted, resting `#3A3E45`):

| id | from | to | via | meaning |
|---|---|---|---|---|
| select | app.bottom (540, 650) | repo.top (230, 800) | [540, 710], [230, 710] | the application chooses a file |
| inspect | app.bottom (540, 650) | input.top (760, 800) | [540, 710], [760, 710] | the application checks the input list |
| copy | repo.right (420, 960) | input.left (510, 960) | — | the chosen file is copied into the input (90 px gap at row2's height) |
| feed | input.bottom (760, 1120) | model.top (540, 1345) | [760, 1230], [540, 1230] | the assembled input goes to the model |

`select` and `inspect` share the first segment below the application and split at y = 710; which one is used tells the viewer whether the application is choosing or checking. The `copy` wire sits at the height of `invoice-v1.md` (row2 of both panels), so the copy reads as a direct hop between the two lists. The badge under the repository panel marks the contract's status when it is not in the input. Stage spans y ≈ 510–1500.

## Sound map

Pitches: application **C5**, repository **E5**, input list **G5**, model **C6** (the brightest actor). Pan by x: repository left (`−0.5`), input right (`+0.5`), application and model centre.

| event | preset | notes |
|---|---|---|
| repository rows appear | `store` | quiet, pan left, ×5 at 0.2 s |
| contract row noted, badge appears | `ack` | E5, pan left |
| input rows assemble | `store` | pan right, ×3 at 0.2 s |
| input leaves for the model | `send` | G6, pan right |
| model receives | `arrive` | C6; plus `hit` when the contract is included |
| application selects a file | `send` C6 then `ack` E5 | the dot leaves; the row is chosen |
| file copied into the input | `store` | G5, pan right |
| badge disappears | `poof` | quiet |
| new call begins | `clock` × 2 | the header changes |
| retrieved rows clear | `poof` | quiet, pan right |
| inspection dot lands | `arrive` | G5 |
| rows checked | `ack` | G5, quiet, ×3 |
| empty slot found | `miss` | low falling buzz, pan right; the one negative sound |
| final delivery with contract | `arrive` C6 then `chime` | the brightest event |

## Beat sheet (times at speed 1)

| t | what moves | state change | sound |
|---|---|---|---|
| **Beat 1 — A file exists; the model has not read it (0.0–7.0)** | | | |
| 0.0 | — | repo rows hidden; input rows hidden except dim `—` in rows 3–4; model `sees —`; badge hidden | — |
| 0.6–1.4 | repo rows pop in order (alpha 0 → 1, 0.2 s each) | rows fg; after 1.6 s rows 0, 1, 3, 4 → mid; row2 stays fg | store × 5 (quiet) |
| 1.8 | repo row2 pulses | badge `on disk only` pops under the repository | ack E5 |
| 2.4–2.8 | input rows 0–2 pop | `instructions`, `conversation`, `tool list` fg; rows 3–4 remain dim `—` | store × 3 |
| 3.8–4.8 | chip `3 items` (fg) input.bottom → via → model.top, 1.0 s | — | send G6 |
| 4.8 | ripple at model.top | model stroke → active white; sublabel → `sees 3 items` fg | arrive C6 |
| 5.2 | repo row2 pulses once more; badge pulses | — | ack E5 (quiet) |
| 5.2–7.0 | hold | the lit model and the grey badge are both visible: the file exists, the model did not get it | |
| **Beat 2 — The application selects; only selected content enters (7.0–10.5)** | | | |
| 7.0 | app pulses | — | — |
| 7.0–7.8 | dot (accent) app.bottom → via → repo.top, 0.8 s | — | send C6 |
| 7.8 | accent ripple at repo row2 (230, 960) | repo row2 colour → accent | ack E5 |
| 8.4–8.9 | chip `invoice-v1.md` (accent) repo.right → input.left, 0.5 s | — | — |
| 8.9 | ripple at input row3 (760, 1000) | input row3 text → `invoice-v1.md`, colour accent, alpha 1; repo row2 → fg (the source stays); badge scale → 0 | store G5, poof (quiet) |
| 8.9–10.5 | hold | both lists show `invoice-v1.md` | |
| **Beat 3 — The model receives the assembled input (10.5–13.5)** | | | |
| 10.5–11.5 | chip `4 items` (accent) input.bottom → via → model.top, 1.0 s | — | send G6 |
| 11.5 | ok ripple at model.top | model stroke → ok with glow; sublabel → `sees 4 items` ok; input row3 → ok | arrive C6, hit |
| 11.5–13.5 | hold | | |
| **Beat 4 — A new invocation; check what was actually included (13.5–28.0)** | | | |
| 13.5 | input label pulses | input label text → `input · call 2` | clock × 2 |
| 13.8 | — | input row3 → `—` dim (0.3 s); model stroke → mid, glow off, sublabel → `sees —`, alpha → 0.8 | poof (quiet) |
| 14.0–14.4 | input rows 0–2 flash fg then settle | re-assembled for the new call | store × 3 (quiet) |
| 14.6 | repo row2 pulses | badge `on disk only` pops again | ack E5 |
| 14.6–16.5 | hold | the file is still in the repository; the input slot is empty again | |
| 16.5 | app pulses | — | — |
| 16.5–17.3 | dot (fg) app.bottom → via → input.top, 0.8 s | — | send C6 |
| 17.3 | ripple at input.top | input stroke glows | arrive G5 |
| 17.6 / 17.9 / 18.2 | input rows 0–2 flash fg in turn | — | ack × 3 (quiet) |
| 18.5 | input row3 flashes bad; red ripple with × at (760, 1000) | row3 `—` colour bad for 0.6 s then dim | miss |
| 18.5–20.0 | hold | the gap is found before the model is called | |
| 20.0–20.8 | dot (accent) app.bottom → via → repo.top, 0.8 s | — | send C6 |
| 20.8 | accent ripple at repo row2 | repo row2 → accent | ack E5 |
| 21.2–21.7 | chip `invoice-v1.md` (accent) repo.right → input.left, 0.5 s | — | — |
| 21.7 | ripple at input row3 | input row3 → `invoice-v1.md` accent; repo row2 → fg; badge scale → 0 | store G5, poof (quiet) |
| 22.5–23.5 | chip `4 items` (accent) input.bottom → via → model.top, 1.0 s | — | send G6 |
| 23.5 | ok ripple at model.top | model stroke → ok with glow; sublabel → `sees 4 items` ok; input row3 → ok | arrive C6, chime |
| 23.5–26.5 | hold | final state: repository unchanged, `input · call 2` with four rows, lit model | |
| 26.5–27.3 | — | `s.fade` to black, 0.8 s | — |
| 28.0 | end | finite ending | |

## Accuracy limits

- "Items" is a teaching unit. Real context is text (and other content) measured in tokens; the input list's rows stand for the categories the concept names (instructions, conversation, tool descriptions, retrieved results), with the contract file as one retrieved result. `3 items` and `4 items` count rows, not tokens.
- The file names are illustrative and short for legibility; the concept's example names an invoice endpoint and a v1 contract with a `total_cents` field. The cut does not show the contract's content or the field.
- The cut clears the retrieved row at the start of call 2 to show that selection is not automatic. In real systems, earlier content can carry forward inside the conversation transcript, and some applications re-attach files by policy; the `conversation` row persisting across calls stands for that, while the retrieved slot does not. The write-up carries this distinction.
- The inspection in beat 4 is the lesson's "check what was actually included", drawn as the application reviewing its own input list before calling the model. It does not represent any particular tool or framework feature.
- The application's selection is one way content enters; retrieval, tool reads, and user attachments are others. The cut shows one path.
- No claim is made about how the model uses the contract once supplied, about cost or latency of a larger input, or about position effects. Those belong to later lessons.
- The quiet `poof` reuses an eviction preset to mark the badge disappearing and the retrieved row clearing; it is kept quiet so it does not read as a failure. Note the reuse in the hand-over.

## Acceptance checks

1. **Stills per beat** at playback seconds (speed 0.9): `6.5, 10.5, 13.5, 17.0, 21.0, 27.5` (speed-1 ≈ 5.9, 9.5, 12.2, 15.3, 18.9, 24.8). Tile with ffmpeg and view the row; view the 6.5 s (lit model, grey badge) and 21.0 s (red empty slot) stills at full size and at 350 px wide. Pass when every row in both panels is readable at 350 px, `invoice-v1.md` is readable in both panels at 10.5 s and 27.5 s, the badge text is readable, the model's sublabel is readable, and the dim `—` rows are distinguishable from filled rows.
2. **The gap is visible**: at 6.5 s the model is lit with `sees 3 items` while the repository shows `invoice-v1.md` and the badge `on disk only`; the input's row3 is a dim `—`. At 17.0 s the same three facts hold again with the header reading `input · call 2`.
3. **Copy, not move**: at 10.5 s and 27.5 s `invoice-v1.md` appears in both panels, with the repository row at fg and the input row at accent/ok. The repository panel's row count and text are identical in every still.
4. **No lingering state**: the badge is hidden whenever the input's row3 holds the file and visible whenever it does not; the model is dim with `sees —` between 13.8 and 23.5 s (speed 1); no chip remains on screen during any hold.
5. **Overlap**: the `copy` chip must fit in the 90 px gap without covering the row text in either panel (shorten the chip or let it fade on both ends if it does); the `select` and `inspect` dots must not cross the `repository` and `input · call 1` labels at y = 760 except at arrival; the `3 items` / `4 items` chips must clear the model label. Repository rows at 36 px mono (15 characters ≈ 324 px) fit inside 380 px; input rows (13 characters ≈ 281 px) fit inside 500 px.
6. **Word budget**: on-screen text is names, the two panel labels, five file rows, up to four input rows, the model's sublabel, and one badge. No sentence appears.
7. **Audio**: the Node dry-run lists ≈ 45 cues (8 stores in beat 1, acks, sends and arrives, hit, 2 clocks, 3 quiet stores, 3 acks, miss, stores, poofs, chime). The spectrogram shows the `miss` at 18.5 s as the only low falling event and the `chime` at 23.5 s as the brightest, with a sound on every landing. `ffprobe` reports ≈ 31 s with an audio stream. Record whether audio was heard or only analysed.
8. **Causal reading test**: with sound off and every word removed, a viewer should still see: a left list fills; a grey tag appears under it; a right list fills three of five slots and sends to a bottom box, which lights; the top box sends to the left list, one row is picked and hops into the right list's empty slot, the tag disappears; the right list sends again and the bottom box lights green; the right list's header changes, the slot empties, the bottom box dims, and the tag returns; the top box checks the right list and the empty slot flashes red; the pick and hop happen again; the bottom box lights green.
9. **Project checks** after encoding: `python3 scripts/check_media.py --concept context-engineering`, then the full set before any release proposal. A new encode needs its own comparison review.

