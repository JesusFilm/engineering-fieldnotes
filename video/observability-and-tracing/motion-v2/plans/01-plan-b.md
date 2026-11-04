# Lesson 01 — One operation is a span — plan B

Independent plan for the motion-v2 cut of observability-and-tracing lesson 01. Authored from the lesson entry in `video/observability-and-tracing/sequence/lessons.json` (item 1) and the concept content in `content/concepts/observability-and-tracing.json`. Earlier motion-v2 beat sheets from another chapter were read only to vary the geometry. No other plan for this lesson, no production ledger, and no authoring source was consulted. This document names no authoring model.

## Scope

One mechanism: **instrumented code records one operation as a span: it opens when the operation starts, grows while the work runs, and closes with a duration, an outcome and attributes; code without instrumentation can be just as busy and leave nothing.**

The viewer should feel three things. A bar on a time axis grows in step with a tool that is visibly working, so the span is clearly a record of something that is happening. The bar stops and turns solid at the same moment the tool finishes, and the record card gains `duration 2.4 s` and `status ok` only then. The caller was busy for the whole run too, yet its row in the lane stays empty because it is not instrumented.

Grounding: lesson beats ("the caller invokes a remote test tool. That operation takes time", "instrumentation records the start. The tool performs its work", "the operation ends and its span closes. The record includes duration and outcome", "this span describes one operation"); lesson intro ("a span records one operation, including its start, duration and attributes. It describes observed execution rather than the intended plan"); lesson takeaway ("instrumentation creates spans. Missing instrumentation means some operations will not appear"); concept overview ("each span records one operation, its timing, and contextual metadata") and example (a remote test tool taking 2.4 s). Source: [OpenTelemetry — Traces](https://opentelemetry.io/docs/concepts/signals/traces/), retrieved 2026-10-19 per the concept file, for span start and end timestamps, status and attributes.

Out of scope (later lessons): trace IDs, span IDs and parent relationships (02); context propagation across the boundary (03); comparing durations or the 0.6 s model call (04); sampling, export failures and sensitive attributes (05). The lesson's last beat mentions that related spans can form a trace; the cut does not draw a trace, so lesson 02 introduces it cleanly. No export pipeline or tracing backend is drawn.

Grammar for this cut: **two zones stacked vertically. A runtime zone at the top shows what actually happens (caller and test tool exchanging a request and a reply). A recorded zone below shows a span lane on a time axis with one row per service, a moving playhead with a clock, and a span record card.** The bar is drawn by the passage of time, not by a packet arriving, which separates this cut from the request-flow and dashboard cuts of the previous chapter. Every element is a software object: a caller, a remote tool, an instrumentation marker, a timeline row, a span bar and a span record. No stopwatches, tape recorders or cameras.

Target length ≈ 35 s at speed 1 (`meta.speed: 1`). The span's growth is continuous and needs no artificial pause; the holds come after the close and after the empty caller row lands. If stills read fast, lengthen the hold after the close first.

## Engine notes

Use `box` for caller and tool, `label` for zone names, row names, tick labels, clock and instrumentation markers, `bar` for the two lane rows, and `store` for the span record. The tool row is a two-segment `bar`: `seg0` is a fixed 0.1 share in the background colour (the 0.3 s before the span starts) and `seg1` grows from 0 to 0.8 (2.4 s of 3.0 s). Use `s.mark` on the tool bar for the start (pos 0.1) and end (pos 0.9) dots. The playhead is a thin vertical line whose x position must animate; if `x` cannot be tweened, add a general `cursor` node type in the cut-local engine copy that reads `p('pos')` (0–1 across a given span of x) and report it. Work in a cut-local engine copy with the repository-pinned Puppeteer; if chip text renders below 40 px, add a `labelSize` option there.

## Stage and coordinates (1080 × 1920)

Palette follows `references/style.md`. Minimum on-screen text 40 px (≈ 13 px at 350 wide); node names 48 px; monospace at 40 px ≈ 24 px per character. Content stays within x 80–1000 and y 470–1560.

Illustrative clock mapping: run time `t` 0–3.0 s maps to video time `2.5 + 3·t` s (the clock runs three times slower than the illustrative run). Lane x position = `280 + 230·t`.

| id | type | centre (x, y) | size / bounds | text | notes |
|---|---|---|---|---|---|
| title | title band | (540, 330) / (540, 405) | — | **Observability and tracing** / ONE OPERATION IS A SPAN | engine title and subtitle; shorten the title to **Tracing** if 104 px overflows 1000 px |
| zRun | label | (540, 490) | 40 px, mid | `runtime` | zone name |
| caller | box | (270, 600) | 320 × 120 (x 110–430, y 540–660) | label `caller` 48 px; sublabel 40 px `idle` → `calls tool` → `waiting` → `got results` | C5 |
| tool | box | (810, 600) | 320 × 120 (x 650–970, y 540–660) | label `test tool` 48 px; sublabel 40 px `idle` → `running` → `done` | G5 |
| instrT | label | (810, 705) | 40 px mono, accent, ≈ 288 px | `instrumented` | visible from the start at alpha 0.6 |
| instrC | label | (270, 705) | 40 px mono, mid, ≈ 384 px (x 78–462) | `not instrumented` | hidden until beat 4 |
| zRec | label | (300, 850) | 40 px, mid | `recorded spans` | zone name; ≈ 336 px |
| clock | label | (840, 850) | 40 px mono | `t 0.0 s` → `t 3.0 s` | counts with the playhead |
| rowC | label | (190, 940) | 40 px mono | `caller` | row name |
| laneC | bar, w 690 h 40 | (625, 940) | x 280–970 | — | track only, no segment fill; stays empty |
| rowT | label | (190, 1020) | 40 px mono | `tool` | row name |
| laneT | bar, w 690 h 40, `segments: 2` | (625, 1020) | x 280–970 | — | seg0 0.1 background; seg1 0 → 0.8, accent while open, ok when closed |
| playhead | line / cursor | x 280 → 970 | y 900–1060 | — | moves with the clock; hidden after 11.5 s |
| axis | wire | (280, 1080) → (970, 1080) | — | — | ticks at x 280, 510, 740, 970 |
| ticks | label | (280 / 510 / 740 / 970, 1115) | 40 px mono, mid | `0` · `1 s` · `2 s` · `3 s` | |
| record | store, `rows: 5`, w 860 | (540, 1370) | 860 × ≈ 300 (x 110–970, y ≈ 1220–1520) | label `span record` 44 px at (540, 1180); rows 40 px mono | row0 `name      run_tests` · row1 `start     0.3 s` · row2 `duration  …` → `2.4 s` · row3 `status    open` → `ok` · row4 `tool      test-runner` |

Wires: `call` from caller.right (430, 600) to tool.left (650, 600), dotted; the `run tests` chip (≈ 216 px) and the `results` chip (≈ 168 px) travel on it and may fade across the box edges. No wire joins the runtime zone to the recorded zone: the span appears because of the tool's instrumentation, which the `instrumented` marker and a synchronised pulse make visible, and no packet should suggest the caller sends telemetry.

Check that the clock (x ≈ 756–924) clears the `recorded spans` label (x ≈ 132–468), and that the start and end mark dots above laneT (y ≈ 995) clear laneC (y 920–960).

## Sound map

Actor pitches: caller **C5**, test tool **G5**, span record **E5**. Sends an octave up and quieter. Pan by x: caller left (≈ −0.5), tool right (≈ +0.5), record centre.

| event | preset | notes |
|---|---|---|
| caller calls | `send` C6 | |
| tool receives | `arrive` G5 | |
| span opens | `store` E5 | a distinct "record started" sound, tied to the start mark |
| tool working | `work` G4 | one tick every 1.2 s of video while the span is open (6 ticks) |
| tool finishes and span closes | `arrive` G5 then `chime` E5 | the loudest moment: the span closing |
| reply reaches caller | `deliver` C5 | |
| record rows fill | `store` E5 | one per row; the `status ok` row adds a quiet `ack` E6 |
| caller marked not instrumented | `thump` | soft and low; quieter than the close |
| final pairing | `ack` G5 then `ack` E5 | tool, then its record |

No music and no clock ticking under the run; the `work` ticks carry the passing time.

## Beat sheet (speed 1)

| time | what moves | state change | sound |
|---|---|---|---|
| **Beat 1 — The caller invokes the remote test tool (0–3.4)** | | | |
| 0.0–1.0 | stage fades in | caller and tool `idle`; `instrumented` at 0.6 under tool; empty lane rows; clock `t 0.0 s`; empty record frame hidden | — |
| 1.6 | caller pulse | sublabel `calls tool` | — |
| 2.5 | playhead appears at x 280; clock starts | — | — |
| 2.5–3.4 | chip `run tests` on call | caller sublabel `waiting` | send C6 |
| **Beat 2 — Instrumentation records the start; the tool works (3.4–10.6)** | | | |
| 3.4 | ripple at tool; `instrumented` pulses to full accent; start mark at laneT pos 0.1 | tool `running`; seg1 begins | arrive G5, store E5 |
| 4.0 | record label and frame fade in; row0 | `name run_tests` | store E5 |
| 4.6 | row1 | `start 0.3 s` | store E5 |
| 5.2 | row2, row3 | `duration …` mid · `status open` accent | — |
| 3.4–10.6 | seg1 grows linearly 0 → 0.8 in accent; playhead and clock run to `t 2.7 s`; tool box glows faintly | the open span grows with the work | work G4 at 4.6, 5.8, 7.0, 8.2, 9.4, 10.6 |
| **Beat 3 — The operation ends; the span closes (10.6–18.0)** | | | |
| 10.6 | end mark at laneT pos 0.9; seg1 turns ok; tool `done` | the bar stops at x 901 | arrive G5, chime E5 |
| 10.6–11.3 | chip `results` on call, tool → caller | — | — |
| 11.3 | ripple at caller | caller `got results` | deliver C5 |
| 11.5 | playhead stops at `t 3.0 s` and fades | — | — |
| 11.9 | row2 swaps, pulses ok | `duration 2.4 s` | store E5 |
| 12.5 | row3 swaps, pulses ok | `status ok` | store E5, ack E6 |
| 13.1 | row4 | `tool test-runner` (an attribute) | store E5 |
| 13.1–18.0 | hold | one closed bar and a complete record | |
| **Beat 4 — Uninstrumented work leaves no span (18.0–26.0)** | | | |
| 18.0 | caller box pulses; instrC pops | `not instrumented` | thump |
| 18.8 | laneC track pulses mid from x 280 to 970 | the caller row is empty although the caller waited from `t 0` to `t 2.9` | — |
| 19.6 | instrT pulses accent and laneT bar pulses ok together | only instrumented code produced a bar | ack G5 |
| 19.6–26.0 | hold | full row next to empty row | |
| **Beat 5 — One span describes one operation (26.0–35.0)** | | | |
| 26.0 | tool box, laneT bar and the record frame pulse in sequence (0.5 s apart) | one operation → one bar → one record | ack G5, ack E5 |
| 27.4 | record rows 1–3 pulse together | start, duration, outcome describe what happened | — |
| 27.4–33.4 | hold | final state | |
| 33.4–34.2 | `s.fade` to black, 0.8 s | finite ending | — |
| 35.0 | end | | |

## Accuracy limits

- The 2.4 s tool duration and 0.3 s start come from the concept's illustrative example. The on-screen clock runs three times slower than that run so the growth is readable; the record values are the illustrative run's, not video seconds.
- The span here is created by instrumentation in the tool, so it covers the tool's own work from receipt to completion. A span created in the caller would cover a different interval (including network time). Which code is instrumented decides what a span covers.
- The record card fills while the span is open as a teaching view of what instrumentation is accumulating. In practice span data is usually exported after the span ends; export, batching and backends are not drawn.
- `run_tests`, `status ok` and `tool test-runner` are illustrative name, status and attribute. `status ok` reports that the operation completed without an error status; it does not mean the tests passed or the code is correct. Real attribute names follow the instrumentation's conventions; the GenAI conventions are marked Development.
- The span records observed execution. The cut shows no plan or expected duration; nothing on screen should suggest the bar was drawn in advance.
- The empty caller row illustrates one cause of a missing operation: no instrumentation. Sampling and export failures are other causes, covered in lesson 05. The cut does not imply the caller's wait is the tool's fault or that it should be instrumented in a particular way.
- Trace identity, parent relationships and propagation are not drawn; the cut shows one span on its own.

## Native 350 acceptance

These are requirements for the future render, not completed validation.

1. Decode actual frames (avoid relying only on a contact sheet) at 1080 and at 350 px wide around 1.8, 3.0, 3.6, 4.8, 5.6, 7.0, 9.0, 10.4, 10.8, 11.5, 12.0, 12.7, 13.4, 16.0, 18.4, 19.0, 20.0, 24.0, 26.6, 28.0, 32.0 and 33.8 s, plus before/mid/after the start mark, the end mark and each row change. At 350 px, both box names and sublabels, `instrumented`, `not instrumented`, the row names, tick labels, the clock and all five record rows must be readable.
2. Growth matches work: the tool reads `running` for exactly as long as seg1 grows; the bar never extends before the start mark (x 349) or past the end mark (x 901); the clock reads `t 2.7 s` when the bar stops.
3. Close before completion: `duration` reads `…` and `status` `open` until the end mark appears; neither shows a value while the bar is growing.
4. Empty caller row: laneC never shows any fill in any frame, although the caller reads `waiting` from 2.5 to 11.3 s.
5. No implied telemetry packet: no chip, dot or wire travels from the runtime zone to the recorded zone.
6. Clearance: the `run tests` and `results` chips stay inside the frame and fade cleanly at box edges; `not instrumented` (x 78–462) clears the tool's `instrumented` label (x 666–954); mark dots clear the caller row; nothing enters the title band; no chip remains during a hold.
7. Silent reading: with sound off and words ignored, a viewer sees a message go from left to right; a bar starts growing in the lower right row as the right box starts working, and a card starts filling; the bar stops when the right box finishes and the card completes; a reply returns left; the left box gets a grey marker and its lower row is lit as empty; the right box, its bar and the card pulse in turn.
8. Audio: the dry run lists one `chime` at 10.6 s (loudest), six `work` ticks during the open span, one soft `thump` at 18.0 s, and record `store`s only at row changes. Full-decode the encode, confirm an audio stream, peak below −0.5 dBFS and moov before mdat. Record whether audio was heard or only analysed.
9. After encoding run `python3 scripts/check_media.py --concept observability-and-tracing`; a new encode needs renewed comparison review bound to its SHA-256.

## Production boundary

Only this anonymous plan is written. No render, scene source, public media, site, shared skill, Git commit or deployment. Later implementation uses the repository-pinned Puppeteer and a cut-local engine copy, with any drawing extension local to the cut.

