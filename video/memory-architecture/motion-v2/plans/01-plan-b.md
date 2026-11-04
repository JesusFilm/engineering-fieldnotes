# Lesson 01 — Current and saved context — plan B

Independent plan for the motion-v2 cut of memory-architecture lesson 01. Authored from the lesson entry in `video/memory-architecture/sequence/lessons.json` (item 1) and the concept content in `content/concepts/memory-architecture.json`. No other plan for this lesson, no ledger, and no authoring source was consulted. This document names no authoring model.

## Scope

One mechanism: **a memory store retains records across calls, but a record reaches a model only when the application retrieves it and places a copy into that call's input; the stored record stays in the store, and a call whose input lacks it cannot use it.**

The viewer should feel the two layers: a row of calls along the top, each with its own input, and one store running underneath them the whole time. In call 1 the store already holds the test command and the model does not see it; the application reaches down, a copy rises into call 2's input, the model of call 2 sees it, and the row in the store is still there.

Grounding (from the concept): "distinguish the context supplied to a model now, the state saved for one conversation, and records available across conversations"; "a stored record only helps a decision when the application retrieves and supplies it"; stores provide namespaces and keys and the application chooses their meaning; the example's record is the billing service's test command `npm test` at revision `r1`.

Out of scope: revision checks and staleness (the record is supplied as stored; the example's `r1` → `r2` correction is a later lesson), who may write to the store, thread-scoped checkpoints versus cross-conversation stores, restart safety of the backend, and similarity search. The cut ends when call 2 has the record and the store still holds it.

Grammar for this cut: **a two-call timeline over one persistent store, with the application beneath.** Each call is a column: a model box above an input list. The store is a wide list spanning both columns. Retrieval is a dot from the application into the store and a copy chip rising from the store row into the second column's empty slot. This differs from the context-engineering cuts (two side-by-side lists with a receiver; scored results; response shape; transcript and handoff; comparator) by putting time on the horizontal axis and the store as a shared band beneath the calls, from the tool-design and loop-engineering cuts, and from the harness-engineering views. Every element is a software object: a call's input, a model invocation, a store row, an application.

Target length ≈ 32 s at playback. Authored at speed 1 for 29 s with `meta.speed: 0.9`. Lengthen the hold on "present but not visible" and the hold after the copy lands first if stills read fast. Do not add beats to reach the guideline.

## Stage and coordinates (1080 × 1920)

Palette and type follow `references/style.md`. Names are 40–44 px; store rows and sublabels are 36 px monospace (≈ 21.6 px per character). Everything stays readable at 350 px wide (≈ 12–13 px for the smallest). If packet chip text renders below 40 px, add a `labelSize` option in the local engine copy and report it.

| id | type | centre (x, y) | size | text | notes |
|---|---|---|---|---|---|
| title | title band | (540, 330) / (540, 405) | — | **Memory architecture** / CURRENT AND SAVED CONTEXT | engine title + subtitle |
| h1 / h2 | label | (320, 520) / (760, 520) | 40 px mono | `call 1 · now` / `call 2 · later` | column headers; h2 at alpha 0.5 until beat 3 |
| model1 / model2 | box | (320, 640) / (760, 640) | 360 × 110 (y 585–695) | label `model` 40 px; sublabel 36 px mono `sees —` → `sees 2 items` / `sees 3 items` | model1's sublabel later reads `test cmd: unknown` |
| input1 / input2 | store, `rows: 3`, w 380 | (320, 880) / (760, 880) | 380 × ≈ 180 (y ≈ 790–970); row centres y ≈ 820, 880, 940 | label `input` 36 px at (320, 755) / (760, 755); rows 36 px mono | row0 `instructions` · row1 `task: run tests` · row2 `—` dim; input2's row2 becomes `test cmd  npm test` accent (18 characters ≈ 389 px; shorten to `npm test @r1` if padding is tight) |
| memory | store, `rows: 3`, w 900 | (540, 1270) | 900 × ≈ 240 (x 90–990, y ≈ 1150–1390); row centres y ≈ 1190, 1270, 1350 | label `memory store` 40 px at (540, 1105); rows 36 px mono | row0 `test cmd  npm test @r1` · row1 `deploy    staged` mid · row2 `note      flaky e2e` mid (max 22 characters ≈ 475 px) |
| badge | badge | (900, 1105) | — | `stored, not supplied` mid → `copy kept` ok | top-right of the store; verify right edge < 1070 (shorten to `not supplied` if needed) |
| app | box | (540, 1540) | 520 × 130 (x 280–800, y 1475–1605) | label `application` 44 px; sublabel 36 px `idle` → `retrieves` → `supplies` | |

Wires (dotted, resting `#3A3E45`):

| id | from | to | via | meaning |
|---|---|---|---|---|
| feed1 | input1.top (320, 790) | model1.bottom (320, 695) | — | call 1's input reaches its model |
| feed2 | input2.top (760, 790) | model2.bottom (760, 695) | — | call 2's input reaches its model |
| retrieve | app.top (540, 1475) | memory.bottom (540, 1390) | — | the application reads the store |
| supply | [760, 1150] (store top under column 2) | input2.bottom (760, 970) | — | a copy rises into call 2's input |

There is no wire from the store into call 1 and none from either model to the store: the only way a record reaches a call is the `supply` path, and only the application triggers it. Stage spans y ≈ 520–1605.

## Sound map

Pitches: call 1 model **C5**, call 2 model **C6**, inputs **G5**, store **A5**, application **E5**. Pan by x: column 1 left (`−0.45`), column 2 right (`+0.45`), store and application centre.

| event | preset | notes |
|---|---|---|
| input rows appear | `store` | quiet, G5, panned to the column |
| an input reaches its model | `send` G6, `arrive` C5 / C6 | |
| store rows appear | `store` | A5, ×3; the test-command row with a quiet `ack` |
| present but not visible | `ack` A5 (store row pulses) then `miss` (gain ×0.6, pan left) | the empty slot in call 1 gets a grey × |
| badge `stored, not supplied` | `ack` | low (C4), quiet |
| the application reaches the store | `send` E6, `arrive` A5 | |
| the store row is read | `ack` | A5, gain ×1.3 |
| a copy rises | `send` | A6, pan right |
| the copy lands in the input | `store` | G5, pan right |
| the store row stays | `ack` | A5, with a small ok ripple on the row |
| call 2 receives | `send` G6, `arrive` C6, `chime` | the brightest event |
| badge `copy kept` | `hit` | |

## Beat sheet (times at speed 1)

| t | what moves | state change | sound |
|---|---|---|---|
| **Beat 1 — The model receives its current input (0.0–6.0)** | | | |
| 0.0 | — | input rows hidden; store rows hidden; badge hidden; h2 and column 2 at alpha 0.5; model sublabels `sees —`; app `idle` | — |
| 0.6 | h1 pulses | — | — |
| 1.0 / 1.3 | input1 rows 0–1 pop | `instructions` · `task: run tests` fg; row2 `—` dim | store × 2 (quiet) |
| 2.0–2.5 | chip `input` (fg) input1.top → model1.bottom, 0.5 s | — | send G6 |
| 2.5 | ripple at model1.bottom | model1 stroke → active; sublabel → `sees 2 items` fg | arrive C5 |
| 3.2 / 3.5 / 3.8 | store rows pop | `test cmd  npm test @r1` fg · `deploy    staged` mid · `note      flaky e2e` mid | store × 3; ack A5 (quiet) on row0 |
| 3.8–6.0 | hold | a lit model with two items; a store with three records beneath it | |
| **Beat 2 — Records exist in the store; presence does not include them (6.0–12.0)** | | | |
| 6.0 | store row0 pulses accent | — | ack A5 |
| 6.6 | model1 sublabel swaps | `test cmd: unknown` mid | — |
| 7.0 | grey ripple with × at input1 row2 (320, 940) | input1 row2 `—` flashes mid | miss (quiet, pan left) |
| 7.6 | badge pops | `stored, not supplied` mid | ack (low, quiet) |
| 7.6–12.0 | hold (long) | the record is on screen in the store; the model one column above cannot see it; nothing moves | |
| **Beat 3 — The application retrieves a record and includes it in a new input (12.0–20.0)** | | | |
| 12.0 | h2 and column 2 → alpha 1 (0.4 s); h2 pulses | call 2 begins | — |
| 12.4 / 12.7 | input2 rows 0–1 pop | `instructions` · `task: run tests` fg; row2 `—` dim | store × 2 (quiet, pan right) |
| 13.4 | app pulses | sublabel → `retrieves` | — |
| 13.4–13.9 | dot (fg) app.top → memory.bottom, 0.5 s | — | send E6 |
| 13.9 | ripple at memory.bottom | store stroke glows | arrive A5 |
| 14.3 | store row0 pulses accent | row0 → accent | ack A5 (louder) |
| 14.9–15.7 | chip `npm test @r1` (accent) [760, 1150] → input2.bottom, 0.8 s | — | send A6 (pan right) |
| 15.7 | ripple at input2 row2 (760, 940) | input2 row2 → `test cmd  npm test` accent | store G5 |
| 16.2 | store row0 pulses once; small ok ripple on it | row0 → fg (still there) | ack A5 |
| 16.2–18.0 | hold | the same record in two places: the store and call 2's input | |
| 18.0 | app sublabel swaps | `supplies` | — |
| 18.0–20.0 | hold | | |
| **Beat 4 — Supply the record to the next call; the saved copy stays (20.0–29.0)** | | | |
| 20.0–20.5 | chip `input` (accent) input2.top → model2.bottom, 0.5 s | — | send G6 |
| 20.5 | ok ripple at model2.bottom | model2 stroke → ok with glow; sublabel → `sees 3 items` ok | arrive C6, chime |
| 21.0 | — | input2 row2 → ok | — |
| 21.4 | badge pops | `copy kept` ok | hit |
| 21.8 | store row0 pulses ok | — | ack A5 |
| 21.8–26.5 | hold | final state: call 1 dim with `test cmd: unknown`, call 2 lit with three items, store unchanged with three rows, application `supplies` | |
| 26.5–27.3 | — | `s.fade` to black, 0.8 s | — |
| 29.0 | end | finite ending | |

## Accuracy limits

- The record (`npm test @r1`) and the other two store rows are illustrative, drawn from the concept's billing example. The revision tag is shown so later lessons can build on it; this cut does not check it.
- `items` is a teaching unit for input content; real inputs are text measured in tokens. The sublabel counts rows, not tokens.
- The store is drawn as one list with three rows. Real stores are keyed by namespace and key with access rules the application defines; the cut shows retrieval of one row by the application and does not show keys, search, or authorization.
- The cut does not distinguish thread-scoped state (checkpoints) from cross-conversation records (stores); both are later material. The store here stands for information retained for later use in general.
- Whether the store survives a process restart depends on its backend; the cut shows persistence across two calls only.
- Call 1's `test cmd: unknown` represents that the record was not supplied; it does not claim what a model would answer without it.
- No `poof` is used. The quiet `miss` marks absence from the input, not a failure of the store.

## Acceptance checks

1. **Stills per beat** at playback seconds (speed 0.9): `5.5, 10.5, 17.5, 21.0, 26.0, 29.5` (speed-1 ≈ 5.0, 9.5, 15.8, 18.9, 23.4, 26.6). Tile with ffmpeg and view the row; view the 10.5 s (present, not visible) and 26.0 s (final) stills at full size and at 350 px wide. Pass when both input lists' rows, the three store rows, the two headers, both model sublabels, and the badge are readable at 350 px, the dim `—` slot is distinguishable from filled rows, and the accent copy in input2 and the fg original in the store are both readable at 17.5 s.
2. **Presence without visibility**: at 10.5 s the store's row0 reads `test cmd  npm test @r1`, model1 reads `test cmd: unknown`, input1's row2 is `—`, column 2 is dim, and nothing is in motion.
3. **Copy, not move**: at 17.5 s and 26.0 s the store's row0 is present and unchanged while input2's row2 holds the copy; the store's row count is three in every still.
4. **Only the application retrieves**: the `supply` chip appears only after the `retrieve` dot has landed (speed-1 13.9 s precedes 14.9 s); no chip ever travels from a model to the store or from the store into column 1.
5. **No lingering state**: no chip remains during any hold; the grey × at input1 has faded before beat 3 begins; the badge shows one state at a time.
6. **Overlap**: the `supply` chip rising at x = 760 must not cover input2's row text until it lands (fade it in the last 60 px or land at the slot's dash position); the `retrieve` dot must not cross the `memory store` label (the wire enters from below); the badge at (900, 1105) must not collide with the label at (540, 1105) (label width ≈ 290 px at 40 px, right edge ≈ 685). Store rows at 36 px mono (22 characters ≈ 475 px) fit inside 900 px; input rows (18 characters ≈ 389 px) fit inside 380 px only with minimal padding, so apply the noted shortening if the still shows clipping.
7. **Word budget**: on-screen text is two headers, two model labels and sublabels, two input labels and up to six rows, the store label and three rows, the badge, and the application label and sublabel. No sentence appears.
8. **Audio**: the Node dry-run lists ≈ 28 cues (2 stores, send/arrive, 3 stores with ack, ack, miss, ack, 2 stores, send/arrive, ack, send, store, ack, send/arrive/chime, hit, ack). The spectrogram shows a quiet stretch during the 7.6–12.0 s hold with no cues, the `miss` at 7.0 s as the only low event, and the `chime` at 20.5 s as the brightest. `ffprobe` reports ≈ 32 s with an audio stream. Record whether audio was heard or only analysed.
9. **Causal reading test**: with sound off and every word removed, a viewer should still see: a left column's list fills two rows and sends up to a box that lights; a wide list appears below with three rows; one of its rows pulses while the left box's lower line changes and the left list's empty slot gets a grey ×, and a grey tag appears; a right column appears and fills two rows; a bottom box sends up into the wide list, one row pulses, a chip rises from it into the right list's empty slot, and the row in the wide list stays; the right list sends up to its box, which lights green; the tag turns green.
10. **Project checks** after encoding: `python3 scripts/check_media.py --concept memory-architecture`, then the full set before any release proposal. A new encode needs its own comparison review.

