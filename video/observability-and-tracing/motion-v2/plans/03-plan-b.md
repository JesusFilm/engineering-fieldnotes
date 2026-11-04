# Lesson 03 — Cross a service boundary — plan B

Independent plan for the motion-v2 cut of observability-and-tracing lesson 03. Authored from the lesson entry in `video/observability-and-tracing/sequence/lessons.json` (item 3) and the concept content in `content/concepts/observability-and-tracing.json`. Earlier motion-v2 beat sheets were read only to vary the geometry. No other plan for this lesson, no production ledger, and no authoring source was consulted. This document names no authoring model.

## Scope

One mechanism: **the agent's current span lives in its own process memory and cannot reach another service by itself; the caller injects the trace ID and its span ID into the outgoing request as a `traceparent` header, the receiving service extracts that header into its own context and starts a child span from it, and only when both sides export their spans does a trace view show the whole path.**

The viewer should feel four things. At the start the agent's context row is full and the test service's context row is empty, with an empty `traceparent` line between them. The header line fills with values copied from the agent's span. The receiver's context fills from that header, and its new span copies the trace, mints its own ID and names the agent's span as parent. The trace view stays empty, reading `0 spans received`, until each side's span is exported to it.

Grounding: lesson beats ("the agent calls a separate service. A local parent relation cannot cross alone", "include trace context in the request. It identifies the trace and parent span", "the receiver extracts that context. It starts a child span for its work", "both sides now share trace identity. Export their spans to see the whole path"); lesson intro ("tracing context must travel with the request and be extracted by the receiving service"); lesson takeaway ("propagation links the spans, but instrumentation and export must also work. Headers alone do not create a complete trace"); concept walkthrough step 2 ("a propagator injects context into outgoing headers and extracts it at the receiver. W3C traceparent includes a trace ID, parent ID, and flags. Do this in trusted transport code"). Sources per the concept file, retrieved 2026-10-19: [OpenTelemetry — Context propagation](https://opentelemetry.io/docs/concepts/context-propagation/) and [W3C Trace Context](https://www.w3.org/TR/trace-context/) (`traceparent` = version, trace-id, parent-id, trace-flags).

Out of scope (other lessons): a single span's start, duration and instrumentation (01) except as already learnt; parent and trace IDs inside one process (02) except as prior knowledge; the disconnected "separate trace" run, any durations and the 0.6 s / 2.4 s example (04); sampling, export failures and sensitive attributes (05). The `01` flags value is shown as part of the header text but not explained. `tracestate` and baggage are not shown. Nothing is timed.

Grammar for this cut: **two process frames side by side joined by a network lane, a request inspector panel below the lane that shows the actual header lines, and a trace view panel at the bottom fed by two export routes along the outer edges.** The teaching motion is a value crossing only by being written into the request and read back out of it: chips travel from the agent's context into a header line, the request crosses the lane, and chips travel from the header line into the receiver's context. Span cards reuse the `trace` / `span` / `parent` rows from lesson 02 so the vocabulary carries over, while the layout (two processes, a wire protocol and an export step) is new. Every element is a software object: a process, an in-memory context, an HTTP request and its headers, a span record, an export and a trace view. Do not use envelopes with stamps, passports, borders, gates or walls.

Target length ≈ 40 s at speed 1 (`meta.speed: 1`). If stills read fast, lengthen the hold after extraction and the final hold first.

## Engine notes

Use `box` outlines (or wire rectangles) for process frames and panels, `store` (3 rows) for span cards, `store` (2 rows) for the request inspector, `label` for context rows, panel headers, the empty-state text and trace view cells, `s.wire` for the lane, inject, extract and export routes, and chips for moving values. No new node type is expected. Work in a cut-local engine copy with the repository-pinned Puppeteer; if chip text renders below 40 px, add a `labelSize` option there and report it.

## Stage and coordinates (1080 × 1920)

Palette follows `references/style.md`, with the trace ID in `info` blue everywhere (as in lesson 02). Minimum on-screen text 40 px (≈ 13 px at 350 wide); names 44 px; monospace at 40 px ≈ 24 px per character. Content stays within x 40–1040 and y 470–1730.

| id | type | centre (x, y) | size / bounds | text | notes |
|---|---|---|---|---|---|
| title | title band | (540, 330) / (540, 405) | — | **Observability and tracing** / CROSS A SERVICE BOUNDARY | shorten title to **Tracing** if it overflows |
| frameL | outline box | — | x 40–420, y 480–920 | — | agent process |
| labL | label | (230, 515) | 40 px, mid, ≈ 312 px | `agent process` | |
| frameR | outline box | — | x 660–1040, y 480–920 | — | test service process |
| labR | label | (850, 515) | 40 px, mid, ≈ 288 px | `test service` | |
| cardL | store, `rows: 3`, w 340 | (230, 690) | x 60–400, y ≈ 590–790 | label `agent task` 44 px at (230, 565); rows 40 px mono | `trace  4bf9` blue · `span   a1` · `parent —` mid |
| ctxL | label | (230, 860) | 40 px mono, ≈ 312 px | `ctx 4bf9 · a1` (`4bf9` blue) | the agent's in-process context; visible from 2.4 s |
| cardR | store, `rows: 3`, w 340 | (850, 690) | x 680–1020, y ≈ 590–790 | label `run tests` 44 px at (850, 565) | `trace  4bf9` blue · `span   d4` green · `parent a1`; hidden until beat 3 |
| ctxR | label | (850, 860) | 40 px mono | `ctx —` mid → `ctx 4bf9 · a1` | |
| lane | wire | (420, 690) → (660, 690) | — | — | the network between processes |
| laneLab | label | (540, 650) | 40 px mono, mid | `HTTP` | |
| reqLab | label | (540, 950) | 44 px | `request` | ≈ 168 px (x 456–624) |
| req | store, `rows: 2`, w 700 | (540, 1040) | x 190–890, y ≈ 975–1105; row centres ≈ 1010, 1070 | rows 40 px mono | row0 `POST /run-tests` · row1 `traceparent —` mid → `traceparent 00-4bf9…-a1-01` (26 chars ≈ 624 px) |
| tvPanel | outline box | — | x 110–970, y 1300–1720 | — | trace view |
| tvHead | label | (540, 1345) | 40 px mono | `trace view` → `trace view · 4bf9` | |
| tvEmpty | label | (540, 1500) | 40 px mono, mid, ≈ 384 px | `0 spans received` | until the first export lands |
| tvRow0 | labels | name (300, 1450) · id (580, 1450) · service (800, 1450) | 40 px mono | `agent task` · `a1` · `agent` | after export L |
| tvRow1 | labels | name (320, 1550) · id (580, 1550) · service (800, 1550) | 40 px mono | `run tests` · `d4` · `test service` (x ≈ 656–944) | after export R |
| branch | wires | (170, 1475) → (170, 1550) → (205, 1550) | — | — | child under root |

Wires (dotted, resting `#3A3E45`):

| id | from | to | meaning |
|---|---|---|---|
| inject | ctxL bottom [230, 880] | req top [230, 975] | the propagator writes the header |
| extract | req top [850, 975] | ctxR bottom [850, 880] | the propagator reads the header |
| exportL | frameL bottom [70, 920] | tvPanel left [110, 1400] via [70, 1400] | agent exports its span |
| exportR | frameR bottom [1010, 920] | tvPanel right [970, 1400] via [1010, 1400] | test service exports its span |
| inspect | lane midpoint [540, 700] | reqLab top [540, 925] | dotted, dim: the panel shows the request on the lane |

Chips: `4bf9 · a1` (blue, ≈ 216 px) on inject and extract; `POST /run-tests` (≈ 360 px) on the lane, allowed to fade across the frame edges because the lane is 240 px; `a1` and `d4` (≈ 48 px) on the export routes, so they stay inside x 40–1040. Check that the inject and extract hops (x 230 and 850, y 880–975) clear `request` (x 456–624) and that `test service` in the trace view stays inside x 970.

## Sound map

Actor pitches: agent **C5**, test service **G5**, network/request **E5**, trace identity **A5** (same note whenever the trace ID is written or read). Sends an octave up and quieter. Pan by x: agent left (≈ −0.5), test service right (≈ +0.5), request and trace view centre.

| event | preset | notes |
|---|---|---|
| agent span and context present | `store` C5, `ack` C5 | |
| empty receiver context | `ack` G4, quiet | |
| request built | `store` E5 | `traceparent —` makes no extra sound |
| inject into header | `send` A6, then `store` A5 | |
| request crosses the lane | `send` E6, then `arrive` G5 | |
| extract from header | `send` A6, then `store` A5 | identical to inject: same values |
| receiver mints span | `store` G5 | new ID, receiver's pitch |
| parent set to a1 | `ack` C5 | points back to the agent's pitch |
| export | `deliver` C5 / `deliver` G5 | one per side |
| trace view row lands | `arrive` C5 / `arrive` G5 | |
| shared trace pulse | `chime` A5 | the single chime, when the whole path is visible |

No music; silence during holds.

## Beat sheet (speed 1)

| time | what moves | state change | sound |
|---|---|---|---|
| **Beat 1 — A local parent relation cannot cross alone (0–9.0)** | | | |
| 0.0–1.0 | frames, lane, `HTTP`, empty panels fade in | `trace view` with `0 spans received` | — |
| 1.5 | cardL fills its three rows with a white ripple | `trace 4bf9 · span a1 · parent —` | store C5 |
| 2.4 | ctxL pops | `ctx 4bf9 · a1`: the agent's current context in memory | ack C5 |
| 3.2 | ctxR pulses mid | `ctx —`: the test service has no context | ack G4 |
| 4.0 | req rows appear | `POST /run-tests` · `traceparent —` | store E5 |
| 4.8 | ctxL, req row1 and ctxR pulse left to right in turn | full → empty → empty | — |
| 5.4–9.0 | hold | | |
| **Beat 2 — Put the trace context in the request (9.0–15.0)** | | | |
| 9.0–9.8 | blue chip `4bf9 · a1` on inject | — | send A6 |
| 9.8 | req row1 swaps and pulses blue | `traceparent 00-4bf9…-a1-01` | store A5 |
| 10.4 | cardL rows trace and span pulse with req row1 | the header names the trace and the parent span | — |
| 11.4–12.4 | chip `POST /run-tests` on the lane, left → right; req panel border pulses as it travels | — | send E6 |
| 12.4 | ripple at frameR left edge | the request has arrived | arrive G5 |
| 12.4–15.0 | hold | | |
| **Beat 3 — The receiver extracts the context and starts a child span (15.0–24.0)** | | | |
| 15.0–15.6 | blue chip `4bf9 · a1` on extract | — | send A6 |
| 15.6 | ctxR swaps and pulses blue | `ctx 4bf9 · a1` | store A5 |
| 16.4 | cardR label and empty card pop | `run tests` | — |
| 17.2 | cardR row0 | `trace 4bf9` (from the context) | store A5 (quiet) |
| 18.0 | cardR row1 with a green sparkle | `span d4` (new) | store G5 |
| 18.8 | cardR row2; cardL span row pulses with it | `parent a1` | ack C5 |
| 19.4–24.0 | hold | two spans in two processes; the trace view still reads `0 spans received` | |
| **Beat 4 — Export both spans to see the whole path (24.0–39.5)** | | | |
| 24.0 | tvEmpty pulses mid | still nothing received | — |
| 24.8–25.8 | chip `a1` on exportL | — | deliver C5 |
| 25.8 | tvEmpty fades; tvRow0 pops; tvHead → `trace view · 4bf9` | `agent task  a1  agent` | arrive C5 |
| 26.8–27.8 | chip `d4` on exportR | — | deliver G5 |
| 27.8 | tvRow1 pops; branch draws | `run tests  d4  test service` under `agent task` | arrive G5 |
| 28.8 | cardL trace row, cardR trace row and tvHead pulse blue together | one trace across two services | chime A5 |
| 29.8 | cardR parent row, cardL span row and the branch pulse together | the parent link crossed the boundary | ack C5 |
| 30.4–37.8 | hold | final state | |
| 37.8–38.6 | `s.fade` to black, 0.8 s | finite ending | — |
| 39.5 | end | | |

## Accuracy limits

- `4bf9`, `a1` and `d4` are shortened illustrative IDs. In `traceparent`, the trace-id is 32 hex characters and the parent-id 16 hex characters; `00-4bf9…-a1-01` is abbreviated with an ellipsis and must not be presented as a valid header.
- `01` is the trace-flags field (sampled). The cut does not explain it; sampling belongs to lesson 05.
- The header's parent-id is the caller's current span. Here that is the agent task span `a1`; in many real setups an HTTP client span sits between the agent task and the request, and its ID would be the parent. The simplification is noted in the write-up.
- Injection and extraction are done by propagators in trusted transport code, as the concept says. The chips are a teaching view; the model does not write or remember the header, and the header grants no permission.
- `run tests` is drawn as the receiving service's own span. It shares the trace and points at `a1`, but it has its own span ID.
- Both spans reach one trace view only because both services export to the same place. Export failures, sampling and missing spans are lesson 05. HTTP is the example; other transports use other carriers.
- No durations appear; comparing a linked and an unlinked run is lesson 04.

## Native 350 acceptance

These are requirements for the future render, not completed validation.

1. Decode actual frames (avoid relying only on a contact sheet) at 1080 and at 350 px wide around 1.8, 2.6, 3.4, 4.2, 5.2, 8.0, 9.4, 10.0, 10.6, 11.9, 12.6, 14.0, 15.3, 15.8, 16.6, 17.4, 18.2, 19.0, 22.0, 24.2, 25.3, 26.0, 27.3, 28.0, 29.0, 30.0, 34.0 and 38.2 s, plus before/mid/after each chip arrival. At 350 px, both frame labels, both card names and all six card rows, both `ctx` lines, `HTTP`, both request rows (including the full `traceparent 00-4bf9…-a1-01`), the trace view header, `0 spans received` and both trace view rows must be readable.
2. Nothing crosses alone: before 9.8 s, ctxR reads `ctx —` and req row1 reads `traceparent —`; no chip travels between the two frames except on the inject → lane → extract path.
3. Order of propagation: req row1 fills before the request crosses the lane; ctxR fills only after the request arrives and the extract chip lands; cardR rows fill only after ctxR.
4. Identity: `4bf9` reads the same and is blue in cardL, req row1, ctxL, ctxR, cardR and tvHead; `d4` differs from `a1`; cardR's parent reads `a1`.
5. Export is required: `0 spans received` is visible from 0 to 25.8 s, including after both cards are complete; each trace view row appears only after its export chip lands.
6. Clearance: chips stay on their routes and inside x 0–1080; inject and extract hops clear `request`; `test service` stays inside the trace view panel; the two frames' text never touches the lane label; nothing enters the title band; no chip remains during a hold.
7. Silent reading: with sound off and words ignored, a viewer sees a filled card and a filled line in the left box, an empty line in the right box and an empty line in the middle panel; a blue value drops from the left box into the middle line; something travels across from left to right; a blue value rises from the middle line into the right box, which then fills a card with one blue value, one new green value and one value matching the left card; the bottom panel stays empty until a small value leaves each box along the outer edges, after which two linked rows appear under a blue header.
8. Audio: the dry run lists exactly one `chime` (A5, 28.8 s); inject and extract use identical `send` A6 / `store` A5 pairs; the new span uses `store` G5; two `deliver`s and two trace view `arrive`s. Full-decode the encode, confirm an audio stream, peak below −0.5 dBFS and moov before mdat. Record whether audio was heard or only analysed.
9. After encoding run `python3 scripts/check_media.py --concept observability-and-tracing`; a new encode needs renewed comparison review bound to its SHA-256.

## Production boundary

Only this anonymous plan is written. No render, scene source, public media, site, shared skill, Git commit or deployment. Later implementation uses the repository-pinned Puppeteer and a cut-local engine copy, with any drawing extension local to the cut.

