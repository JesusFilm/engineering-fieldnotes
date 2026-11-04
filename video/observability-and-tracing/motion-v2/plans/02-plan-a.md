# Related spans form a trace

## Focus

Lesson 02 only: an agent operation and its two calls have distinct span identities, share trace identity T, and use parent IDs to express nesting. Teach this through an expanding trace-tree inspector with selectable records. The model and tool calls are siblings beneath the agent, not a parent-child chain simply because one happens after the other.

Five beats, approximately 46 seconds. A finite inspection hold ends the cut. No transport headers, propagation repair, missing-span diagnosis, duration arithmetic, output evaluation, or sensitive-data tutorial. Those would distract from the identity and relationship mechanism.

Grounding: `video/observability-and-tracing/sequence/lessons.json` item 2 and `content/concepts/observability-and-tracing.json`. Primary source: [OpenTelemetry traces](https://opentelemetry.io/docs/concepts/signals/traces/), inspected 2026-10-21, especially Spans and Span Context. The source establishes shared trace identity, individual span identity, and parent relationships; the inspector geometry and abbreviated identifiers are teaching choices.

## Software-native stage

1080 × 1920. Dark background #050506, main text #E6E8EC, secondary #8B9099. Teal #3FB68B denotes shared trace membership; amber #F5A524 denotes current execution. Selection uses a white outline, not success green. No physical metaphor or generic three-stage pipeline.

Use a trace browser: an expandable tree in the upper half and one selected-span detail panel below. Rows remain in place once created; selection moves while identities persist. No timeline is necessary: this lesson teaches relationships rather than latency.

All coordinates are x,y,width,height, with centers explicitly identified.

| Element | Geometry | Text and behavior |
|---|---|---|
| Title | 90,140,900,180 | `Related spans` / `one trace`, 76 px |
| Trace group header | 90,390,900,100 | `Trace T`, 64 px; count at right, 52 px |
| Agent row | 130,580,820,140 | `Agent · A`, 62 px; state below, 48 px |
| Model row | 260,800,690,140 | `Model call · B`, 58 px; state below, 48 px |
| Tool row | 260,1020,690,140 | `Tool call · C`, 58 px; state below, 48 px |
| Tree spine | x190, y720–1090 | 8 px stroke; branch to (250,870), branch to (250,1090) |
| Selected-span panel | 90,1250,900,390 | header `Selected: Agent` / `Model` / `Tool`, 54 px; rows at y1360,1450,1540 |
| Detail labels/values | labels x130, values x740 | `Trace ID` / `Span ID` / `Parent ID`, 52 px; values 60 px |
| Takeaway footer | 90,1730,900,110 | short labels revealed by beat: `Same trace ID`, then `Different span IDs`, 52 px |

No horizontal edge connects B to C. Both branches originate on the same spine descending from A. Final tree explicitly shows A above indented siblings B and C. Row state labels are `Running` and `Ended`; ended means execution stopped, not judged correct. Trace identity is always readable in the header and selected record, so color is supplementary.

Detail values: A = Trace T / Span A / Parent —; B = Trace T / Span B / Parent A; C = Trace T / Span C / Parent A. Em dash means no parent in this illustrative root. Never replace the parent field with the trace ID.

## Beat sheet: timing, motion, state, sound

Keep actor notes stable: agent C4, model E4, tool A4; inspector G4. Sound cues are specified for future production, not already rendered or heard. No bed, continuous tick, or sound for every character. Smooth travel/expansion takes 0.6–1.2 seconds, then readable stillness.

| Beat / time | Motion and state changes | Hold and sound |
|---|---|---|
| 1 · 0–8 s · Root operation | Title and empty inspector establish for 1.0 s. At 1.5 create Trace T header and Agent A row together; count becomes `1 span`, A becomes Running. At 2.5 reveal selected A record: T / A / —. The root has no incoming tree branch. | Hold 3.5–8.0. Agent `work` C4 at 1.5; inspector `store` G4 at 2.5. No implied pre-existing child records. |
| 2 · 8–18 s · First child | At 8.5 Agent row emits a small call marker down the future branch path to the Model row position, arriving 9.5. Create Model B, state Running, count `2 spans`. Draw only the first branch from A. At 10.5 selection outline moves A→B; panel updates together to T / B / A. Pulse the unchanged T value once; then highlight Parent A and the existing A row together at 12.0. At 14.0 B becomes Ended while A stays Running. | Hold identity panel 12.5–14.0 and ended B 14.5–18.0. Agent `send` C4 at 8.5; model `work` E4 at 9.5; inspector `ack` G4 at 10.5; model `ack` E4 at 14.0. |
| 3 · 18–29 s · Second child | At 18.5 a second call marker originates at A, follows the extended spine, and arrives at Tool C at 19.5. B stays visible and Ended. Create C Running and count `3 spans`. At 20.5 select C; details become T / C / A. Brief paired emphasis on Parent A and Agent A at 22.0. At 25.0 C becomes Ended; at 26.0 A becomes Ended. | Hold 22.5–25.0 and 26.5–29.0. Agent `send` C4 at 18.5; tool `work` A4 at 19.5; inspector `ack` G4 at 20.5; tool `ack` A4 at 25.0; agent `ack` C4 at 26.0. Distinct notes make the two calls distinguishable. |
| 4 · 29–39 s · Inspect shared and unique identity | At 29.5 select B again; panel returns to T / B / A. Keep it still through 33.0. At 33.5 select C; only Span ID changes B→C; Trace T and Parent A remain spatially fixed. Footer `Same trace ID` appears at 30.0; change to `Different span IDs` at 35.0. Underline B and C in their respective row labels once at 36.0. | No rerun or new span creation; count remains 3. Inspector `ack` G4 at selections 29.5 and 33.5. Hold C record 35–39. No celebratory chime. |
| 5 · 39–46 s · Read the nesting | At 39.5 emphasize both parent branches simultaneously, plus Parent A in the selected C record and A's row identity. Footer becomes `Parent A` at 40.0. Keep tree and details unchanged for the rest of the cut. | Inspector `ack` G4 at 39.5; silent 40.5–46.0. Final state has one group, three distinct spans, two siblings, no continuing motion. |

The call markers depict invocation, while persistent branch lines depict parent relationships. A marker is never a span that moves from one row into another. Child record creation introduces a new span identity; it does not rename the agent span. The model completing before the tool starts is merely this example's sequence, not the reason they are related.

## Accuracy limits

- T/A/B/C are visual aliases for identifiers, not literal valid OpenTelemetry identifiers. Do not imply an implementation should use single-character IDs or manually reuse a span ID.
- This is a root agent span with two directly instrumented child operations. A real agent operation can have a parent, and real instrumentation may expose additional nested spans. The simplified topology is intentional, not universal.
- Parent ID refers to the parent span ID A. It does not point to trace T, to an actor name, or to the immediately preceding operation B.
- Grouping is based on recorded identity and parent metadata, not proximity, matching color, identical names, or matching timestamps. Existing instrumentation is assumed; do not suggest that a dashboard invents relationships.
- A trace need not contain every operation, be a fully complete tree in a backend, or establish output correctness. This cut shows a complete small example without claiming general completeness.
- The live-populating inspector is an explanatory view; actual export and ingestion may happen after spans end. No latency or performance claim is made from animation duration.
- `Ended` is a lifecycle label, not an OpenTelemetry status value or a passing evaluation.

## Native 350 px acceptance and future encoded review

These are production acceptance criteria, not claims of completed rendering or review.

1. At native 350 px width (about 622 px high), all ID fields and row labels must be readable without zoom: 52 px source text is about 16.9 px displayed; 48 px states about 15.6 px. Keep labels within their assigned widths and preserve at least 24 source pixels between labels, values, and strokes. Do not shrink the font to fit an overlong label.
2. Inspect individual encoded frames for every hold at 5, 13, 16, 23, 27, 31, 36, and 44 s. Inspect before/mid/after each row creation, selection update, and tree extension. Also inspect full-resolution frames. A contact sheet is navigation, not legibility evidence.
3. At 13 s the viewer must identify B as a span in T with parent A. At 23 s they must identify C as a different span with the same T and A. At 44 s they must count exactly three spans and recognize B/C as siblings.
4. During every selection transition, update the record atomically or hide values briefly: never show Selected Tool with Span B or Parent B. Keep Trace T stable across B→C. The tree must never momentarily connect B to C.
5. Keep A Running until both illustrated children finish. Show B staying Ended when C runs. Retain rows and metadata throughout the final inspection; no disappearance that suggests merging IDs.
6. Meaningful variety comes from tree expansion, independent lifecycle state, record selection, and relationship emphasis. No camera drift, bouncing cards, paragraph overlays, or repeated packet-only beats. Holds must provide real reading time.
7. Confirm muted comprehension first. Then verify actor-specific sound timing and listen to the actual encode before claiming it was heard. Full-file decode, audio peak inspection, and streaming metadata checks remain required for later production.
8. Reproduce suspected visual faults with alternate extraction before flagging. Bind review to the actual full SHA-256; a new encode requires renewed inspection. Finite ending is deliberate.

Implementation, if later assigned, uses repository-pinned Puppeteer and a cut-local engine copy. This deliverable is only the plan; no rendering, public changes, dependency changes, or other lesson work.
