# Lesson 02 — Related spans form a trace — plan B

Independent plan for the motion-v2 cut of observability-and-tracing lesson 02. Authored from the lesson entry in `video/observability-and-tracing/sequence/lessons.json` (item 2) and the concept content in `content/concepts/observability-and-tracing.json`. Earlier motion-v2 beat sheets were read only to vary the geometry. No other plan for this lesson, no production ledger, and no authoring source was consulted. This document names no authoring model.

## Scope

One mechanism: **each new span inside the agent's work copies the trace ID from its parent, gets a fresh span ID of its own, and stores its parent's span ID; a trace view uses the shared trace ID to group the spans and the parent IDs to nest them.**

The viewer should feel three things. The same blue value `T·4bf9` is copied into every new card, while each card's `span` row gets a different new value. Each child's `parent` row is filled by copying the root's `span` value, and a link lights between them. At the end the three cards become three rows of one tree, where the shared value is the header and the parent links are the branches.

Grounding: lesson beats ("the agent operation starts trace T. Its children represent individual calls", "a model call gets its own span ID. It keeps trace T and the parent relation", "a tool call gets another span ID. It also belongs to trace T", "the trace view groups the related spans. Parent links show how they fit together"); lesson intro ("a trace groups related spans. They share a trace ID but each has its own span ID. Parent IDs describe the nesting relationship"); lesson takeaway ("shared trace identity links operations; distinct span identities keep individual work identifiable"); concept overview ("spans share a trace ID but have distinct span IDs. Parent IDs describe nesting"). Sources per the concept file, retrieved 2026-10-19: [OpenTelemetry — Traces](https://opentelemetry.io/docs/concepts/signals/traces/) (span context, trace ID, span ID, parent span ID, root span) and [OpenTelemetry GenAI agent spans](https://github.com/open-telemetry/semantic-conventions-genai/blob/main/docs/gen-ai/gen-ai-agent-spans.md) (agent, model and tool operations as spans; Development status).

Out of scope (other lessons): what a single span records over time, duration bars and instrumentation on/off (01); carrying context across a process boundary, headers and `traceparent` (03); the 0.6 s and 2.4 s durations and any timing comparison (04); sampling, export failures and sensitive attributes (05). All three spans are created in one agent process, so no network boundary is drawn. No durations or clock appear.

Grammar for this cut: **span record cards arranged as a family inside an `agent process` frame (one root card above, two child cards below), with ID values that visibly copy or stay distinct, followed by a trace tree view panel that groups them.** Identity is carried by values and colour: the trace ID is always the same blue chip; span IDs are three different values in each actor's colour; parent rows point up with lit links. This differs from lesson 01's time lane and from request-flow layouts: the motion that teaches is copying a value versus minting a new one. Every element is a software object: a span record, an ID, a parent link, a process boundary and a trace view. No family-tree portraits, folders or physical labels.

Target length ≈ 42 s at speed 1 (`meta.speed: 1`). The two child beats are deliberately parallel so the repetition itself teaches; do not shorten the second one. If stills read fast, lengthen the hold after the trace view assembles.

## Engine notes

Use `store` (3 rows) for each span card with its operation name as the store label, `s.wire` for parent links (with a small `▲` label at the root end if arrowheads are unavailable), `packet` chips for copied values, `label` nodes for tree rows and the trace view header, and `box` (outline, dashed via a wire rectangle if needed) for the `agent process` frame and the trace view panel. Tree branches are wires. No new node type is expected. Work in a cut-local engine copy with the repository-pinned Puppeteer; if chip text renders below 40 px, add a `labelSize` option in the local copy and report it.

## Stage and coordinates (1080 × 1920)

Palette follows `references/style.md`, plus one identity colour: trace ID uses the theme's `info` blue everywhere. Minimum on-screen text 40 px (≈ 13 px at 350 wide); card names 44 px; monospace at 40 px ≈ 24 px per character. Content stays within x 30–1050 and y 470–1740.

Card rows use 8-character field names (`trace   `, `span    `, `parent  `) and values up to 10 characters, so rows are at most 18 characters ≈ 432 px.

| id | type | centre (x, y) | size / bounds | text | notes |
|---|---|---|---|---|---|
| title | title band | (540, 330) / (540, 405) | — | **Observability and tracing** / RELATED SPANS FORM A TRACE | shorten title to **Tracing** if it overflows 1000 px |
| procFrame | outline box, dashed | (540, 815) | x 30–1050, y 495–1135 | — | the one process all three spans belong to |
| procLab | label | (190, 525) | 40 px mono, mid, ≈ 312 px (x 34–346) | `agent process` | |
| root | store, `rows: 3`, w 480 | (540, 690) | x 300–780, y ≈ 590–790; row centres ≈ 625, 690, 755 | label `agent task` 44 px at (540, 555); rows 40 px mono | row0 `trace   T·4bf9` blue · row1 `span    a1` C-colour · row2 `parent  —` mid |
| model | store, `rows: 3`, w 480 | (290, 1010) | x 50–530, y ≈ 910–1110; row centres ≈ 945, 1010, 1075 | label `model call` 44 px at (290, 875) | row0 `trace   T·4bf9` · row1 `span    b2` E-colour · row2 `parent  a1`; all hidden until beat 2 |
| tool | store, `rows: 3`, w 480 | (790, 1010) | x 550–1030, same rows | label `tool call` 44 px at (790, 875) | row0 `trace   T·4bf9` · row1 `span    c3` G-colour · row2 `parent  a1`; hidden until beat 3 |
| tvPanel | outline box | (540, 1470) | x 110–970, y 1210–1730 | — | hidden until beat 4 |
| tvHead | label | (540, 1265) | 40 px mono, blue, ≈ 456 px | `trace view · T·4bf9` | |
| tv0 | labels | name (330, 1350) · id (850, 1350) | 40 px mono | `agent task` · `a1` | root row |
| tv1 | labels | name (390, 1450) · id (850, 1450) | 40 px mono | `model call` · `b2` | indented child |
| tv2 | labels | name (380, 1550) · id (850, 1550) | 40 px mono | `tool call` · `c3` | indented child |
| tvCol | label | (850, 1630) | 40 px mono, mid | `span` | column hint under the ID column; omit if it crowds |
| branches | wires | (200, 1375) → (200, 1550); (200, 1450) → (255, 1450); (200, 1550) → (255, 1550) | — | — | tree lines; light with the parent links |

Card colours: identity colours per actor — agent task **C**-colour (fg white), model call **E**-colour (accent orange), tool call **G**-colour (ok green) — used on each card's `span` value, its tree ID cell and its sound. The trace ID is blue in every location.

Wires (dotted, resting `#3A3E45`):

| id | from | to | via | meaning |
|---|---|---|---|---|
| pModel | model top-right [470, 910] | root bottom [400, 790] | [470, 830], [400, 830] | model call's parent is a1; dims until its parent row fills |
| pTool | tool top-left [610, 910] | root bottom [680, 790] | [610, 830], [680, 830] | tool call's parent is a1 |

Copied-value chips travel the parent wires in reverse (root → child): `T·4bf9` (≈ 144 px, blue) and `a1` (≈ 48 px, C-colour). Check that the wire elbows at y 830 clear the child card labels (y ≈ 855–897) and the root's bottom edge (y ≈ 790), and that `model call` (x ≈ 170–410) clears pModel at x 470.

## Sound map

Actor pitches: agent task **C5**, model call **E5**, tool call **G5**, trace identity **A5** (the same note every time the trace ID appears). Sends an octave up and quieter. Pan by x: model left (≈ −0.5), root and trace view centre, tool right (≈ +0.5).

| event | preset | notes |
|---|---|---|
| trace started (root) | `chime` A5 | the only chime: a new trace is created once |
| new span ID minted | `store` at the actor's pitch | C5, E5, G5: three different notes |
| trace ID copied into a child | `send` A6 then `store` A5 | identical each time, so the ear hears "same trace" |
| parent ID copied | `send` C6 then `ack` C5 | points back to the root's pitch |
| root has no parent | `ack` low (C4), quiet | |
| trace view row added | `arrive` at the actor's pitch | C5, E5, G5 in order |
| shared trace pulse | `ack` A5 | one cue while all trace rows pulse |
| distinct span pulse | `ack` C5, E5, G5 | one per ID, 0.6 s apart |

No music; the cut is quiet during holds.

## Beat sheet (speed 1)

| time | what moves | state change | sound |
|---|---|---|---|
| **Beat 1 — The agent operation starts trace T (0–9.0)** | | | |
| 0.0–1.0 | procFrame and procLab fade in | empty process | — |
| 1.5 | root label and empty card pop with a white ripple | `agent task` | — |
| 2.4 | root row0 fills with a blue ripple | `trace T·4bf9` (new trace) | chime A5 |
| 3.3 | root row1 fills | `span a1` | store C5 |
| 4.2 | root row2 fills mid | `parent —` (the root has no parent) | ack C4 |
| 4.2–9.0 | hold | one root span; its trace is `T·4bf9` | |
| **Beat 2 — The model call gets its own span ID and keeps trace T (9.0–18.0)** | | | |
| 9.0 | model label and empty card pop | `model call` | — |
| 9.6–10.6 | blue chip `T·4bf9` from root row0 along pModel in reverse | — | send A6 |
| 10.6 | model row0 fills | `trace T·4bf9` (copied) | store A5 |
| 11.4 | model row1 fills with an orange sparkle ripple | `span b2` (new) | store E5 |
| 12.2–13.0 | chip `a1` from root row1 along pModel in reverse | — | send C6 |
| 13.0 | model row2 fills; pModel lights solid | `parent a1` | ack C5 |
| 13.6 | root row1 and model row2 pulse together | the parent link points at a1 | — |
| 13.6–18.0 | hold | | |
| **Beat 3 — The tool call gets another span ID; it also belongs to trace T (18.0–27.0)** | | | |
| 18.0 | tool label and empty card pop | `tool call` | — |
| 18.6–19.6 | blue chip `T·4bf9` along pTool in reverse | — | send A6 |
| 19.6 | tool row0 fills | `trace T·4bf9` | store A5 |
| 20.4 | tool row1 fills with a green sparkle ripple | `span c3` (new) | store G5 |
| 21.2–22.0 | chip `a1` along pTool in reverse | — | send C6 |
| 22.0 | tool row2 fills; pTool lights solid | `parent a1` | ack C5 |
| 22.6 | root row1 and tool row2 pulse together | | — |
| 22.6–27.0 | hold | three cards, one trace value repeated, three span values | |
| **Beat 4 — The trace view groups the spans; parent links show the shape (27.0–42.5)** | | | |
| 27.0 | tvPanel and tvHead fade in | `trace view · T·4bf9` | — |
| 27.8 | root card pulses; tv0 pops | `agent task  a1` | arrive C5 |
| 28.8 | model card pulses; tv1 pops; its branch draws | `model call  b2` | arrive E5 |
| 29.8 | tool card pulses; tv2 pops; its branch draws | `tool call  c3` | arrive G5 |
| 30.8 | the three trace rows and tvHead pulse blue together | one trace groups them | ack A5 |
| 32.0 / 32.6 / 33.2 | span cells a1, b2, c3 pulse in turn (cards and tree) | three distinct operations | ack C5, E5, G5 |
| 33.8 | pModel, pTool and the tree branches pulse together | parent links become nesting | — |
| 33.8–40.8 | hold | final state | |
| 40.8–41.6 | `s.fade` to black, 0.8 s | finite ending | — |
| 42.5 | end | | |

## Accuracy limits

- `T·4bf9`, `a1`, `b2` and `c3` are short illustrative values. Real W3C and OpenTelemetry trace IDs are 16 bytes (32 hex characters) and span IDs 8 bytes (16 hex characters); they are generated, not chosen.
- The chips copying `T·4bf9` and `a1` are a teaching view of how a tracing SDK starts a child span from the current context inside one process. Carrying that context across a process or network boundary is lesson 03 and is deliberately not shown.
- The root span has no parent ID; this is shown as `parent —`.
- The model and tool children are drawn as siblings under the agent task, which matches the concept's example. Deeper nesting is possible; the cut shows one level.
- The trace view groups spans that were exported to the same place. Export, sampling and missing spans are lesson 05 and not drawn.
- No timing appears. Real trace views usually draw spans on a timeline; this cut uses a plain tree to keep durations for lesson 04.
- The span names are illustrative. OpenTelemetry's GenAI conventions name agent, model and tool spans differently and are marked Development.

## Native 350 acceptance

These are requirements for the future render, not completed validation.

1. Decode actual frames (avoid relying only on a contact sheet) at 1080 and at 350 px wide around 1.8, 2.6, 3.5, 4.4, 7.0, 10.1, 10.8, 11.6, 12.6, 13.2, 16.0, 19.1, 19.8, 20.6, 21.6, 22.2, 25.0, 27.4, 28.0, 29.0, 30.0, 31.0, 32.2, 32.8, 33.4, 34.0, 38.0 and 41.2 s, plus before/mid/after each chip arrival. At 350 px, `agent process`, the three card names, all nine card rows, the tree header, all three tree rows and IDs must be readable.
2. Same trace: every `trace` row and `tvHead` read exactly `T·4bf9` in blue in every frame where they are visible; no trace row appears before its copy chip lands (except the root's).
3. Distinct spans: the three `span` values are `a1`, `b2`, `c3` in three different colours; each child's span value appears without a chip from another card.
4. Parent links: each child's `parent` row reads `a1` only after the `a1` chip lands; pModel and pTool stay dim until then; the root's parent row reads `—`.
5. Tree matches cards: tree rows appear only after their card pulses; IDs in the tree match their card; branches connect the two children to the root row only.
6. Clearance: wire elbows at y 830 do not touch card labels or the root card; chips stay on their wires and inside the frame; the two child cards (x 50–530 and 550–1030) do not touch each other's text; `trace view · T·4bf9` fits inside the panel; nothing enters the title band; no chip remains during a hold.
7. Silent reading: with sound off and words ignored, a viewer sees one card fill three rows; a second card appears and receives a blue value copied from the first, then a new orange value of its own, then a value copied from the first card's middle row while a link lights; the same happens for a third card with a green value; a panel below lists the three as a tree under a blue header; the blue values pulse together, the coloured values pulse one by one, and the links pulse with the tree branches.
8. Audio: the dry run lists one `chime` (A5, 2.4 s), three `store` A5 trace copies (root's mint uses the chime), three span-ID `store`s at C5, E5, G5, two parent `ack` C5, and the beat-4 arrivals at C5, E5, G5. Full-decode the encode, confirm an audio stream, peak below −0.5 dBFS and moov before mdat. Record whether audio was heard or only analysed.
9. After encoding run `python3 scripts/check_media.py --concept observability-and-tracing`; a new encode needs renewed comparison review bound to its SHA-256.

## Production boundary

Only this anonymous plan is written. No render, scene source, public media, site, shared skill, Git commit or deployment. Later implementation uses the repository-pinned Puppeteer and a cut-local engine copy, with any drawing extension local to the cut.

