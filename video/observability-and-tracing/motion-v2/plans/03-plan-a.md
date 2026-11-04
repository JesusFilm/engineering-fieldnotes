# Cross a service boundary

## Focus and grounding

Lesson 03 only: the sender injects tracing context into a request; the receiver extracts it and instrumentation creates a distinct child span. Exported records then make the relationship visible. Headers carry context, not the completed span itself.

Use one successful HTTP invocation, with a deliberate hold after receipt but before span creation to distinguish these steps. Five beats, 48 seconds, finite ending. Do not add a broken-run repair, latency comparison, sampling tutorial, privacy audit, or evaluation lesson.

Scope sources: `video/observability-and-tracing/sequence/lessons.json` item 3 and `content/concepts/observability-and-tracing.json`. Technical grounding: [OpenTelemetry context propagation](https://opentelemetry.io/docs/concepts/context-propagation/) and [OpenTelemetry traces](https://opentelemetry.io/docs/concepts/signals/traces/), inspected 2026-10-21. Context travels in a carrier; the receiver uses the sending span as parent when creating its new span. Export is a separate telemetry step. Layout, aliases, and timing are illustrative.

## Visual grammar and coordinates

1080 × 1920. Two full-width process regions arranged vertically, separated by a narrow HTTP transit strip. The sender remains above the receiver. A request's metadata is enlarged in the strip; after transport it resolves into receiver-local context. At the end, the transit strip becomes a trace viewer while both process records remain visible. This is a request/metadata inspection view, not three generic boxes joined in a pipeline.

Colors: background #050506, primary #E6E8EC, secondary #8B9099, amber #F5A524 for active work, teal #3FB68B for context/record identity. Selection uses an outline. Labels and geometry distinguish all states without color alone.

All rectangles use x,y,width,height. Primary labels 56–60 px, detail labels 52 px, secondary state labels 48 px minimum. Title 76 px. IDs use 60 px. Keep margins at least 90 px.

| Element | Coordinates | Content |
|---|---|---|
| Title | 90,140,900,180 | `Cross a service` / `boundary` |
| Sender region | 90,370,900,360 | header `Agent process`, y400; `Call span A`, y490; `Trace T`, y580; state `Running`, x660,y580 |
| Boundary strip | 90,780,900,430 | side boundaries at y780 and y1210, dashed 6 px lines; `HTTP request`, y800 |
| Request metadata | 150,880,780,240 | `traceparent`, y900; decoded `Trace T`, y980; `Parent A`, y1060 |
| Receiver region | 90,1260,900,430 | `Test service`, y1290; reserved new span label y1390; trace/parent fields y1480/1560 |
| Event label | 90,1750,900,70 | one of `Inject`, `Extract`, `Start span`, `Export`, 56 px |

Transport path: request outline center moves from (540,840) to (540,1170), crossing into receiver at y1260 as a compact marker. Its decoded fields remain legible in the expanded inspection position during reading holds; do not force viewers to read moving text. On arrival, the expanded metadata relocates as a unit to the receiver's reserved field region, then resolves into context fields.

Final trace viewer replaces only the transit strip: header `Trace T` at (130,810), Agent call A row at (160,910), indented Service B row at (280,1040). Parent elbow from (200,960) through (200,1070) to (260,1070), 8 px stroke. Final export routes run along separate margins: sender (920,690)→(980,690)→(980,940)→(900,940); receiver (920,1620)→(1000,1620)→(1000,1080)→(900,1080). Draw these only during export and remove afterward. They carry copies of records, leaving local identities in place.

## Beat sheet

Stable sound identities: sender C4; receiver E4; tracing helpers G4; trace viewer A4. Use sparse synthesised event presets. No music, continuous clock, or sounds during still holds.

| Beat / playback | Timed motion and state | Sound and reading hold |
|---|---|---|
| 1 · 0–8 s · Separate processes | 0–2 establish sender and receiver region boundaries. At 2 create active caller span A in Trace T. Receiver reads `Waiting`; its span region is empty. At 4 outline the HTTP strip and reveal an empty request metadata area. No parent wire crosses the boundary. | Sender `work` C4 at 2; `ack` G4 at 4. Hold 4.5–8. Local context is visible only at sender. |
| 2 · 8–18 s · Inject into the request | At 8.5 event label becomes Inject. Duplicate highlights from sender Trace T and span A into the request's decoded fields: Trace T and Parent A, settled by 10.0. Sender A remains present. The metadata header reads traceparent. Hold fields through 14.0, then compact the request outline and send downward 14.5–16.0; hide expanded text during travel. At 16.0 receiver state becomes `Received`; expand the same request metadata for inspection. | Tracing `store` G4 at 10; sender `send` C4 at 14.5; receiver `arrive` E4 at 16.0. Hold 16.5–18. No new receiver span yet. |
| 3 · 18–29 s · Extract, then create | At 18.5 label Extract; request fields resolve into receiver-local `Trace T` and `Parent A` by 20.0. Keep reserved span-name line empty until 23.0. At 23 label Start span; instrumentation creates `Service span B` on the reserved line, state Running. Trace T and Parent A stay fixed. The sender remains Running. | Tracing `ack` G4 at 20; receiver `work` E4 at 23. Hold extracted context 20.5–23 and completed span identity 24–29. Distinct events make extraction and span creation separate operations. |
| 4 · 29–38 s · Finish and export | Receiver becomes Ended at 29.5. A small response marker travels upward 30–31, sender becomes Ended on receipt. Fade used request metadata from the strip 32–33 and reveal an empty trace-view frame labeled `0 spans`. At 34 label Export. Record-copy markers travel the two margin routes, arriving at 35.2 and 36.2; add corresponding A and B rows and increment count to 2. | Receiver `ack` E4 at 29.5; receiver `send` E4 at 30; sender `arrive` C4 at 31. Tracing `store` G4 at each departure; viewer `arrive` A4 at 35.2/36.2. Hold through 38. |
| 5 · 38–48 s · Follow the recorded relationship | At 38.5 draw viewer elbow A→B, emphasizing receiver Parent A. At 40 highlight Trace T in both process records and viewer header together. At 42 remove transient export lines; footer becomes `Same trace · new span`. | Viewer `ack` A4 at 38.5; quiet `chime` A4 at 42 for visible records, not correctness. Hold 42.5–48 with both local records and grouped viewer intact. |

The sender record remains Call span A throughout: this is the currently active outbound call span in the agent process. Its enclosing task span is intentionally omitted. Receiver B is created as A's child, never reusing A's span identity. The viewer does not create or repair the relationship; it displays the exported parent metadata.

## Accuracy limits

- T, A, and B are abbreviated visual aliases, not valid literal wire IDs. The traceparent area is a decoded detail view, not a valid header string. Version and trace flags are omitted visually; implementation must use the configured propagator and actual format.
- Inject/extract belong to transport instrumentation. Do not show a model composing IDs, a prompt carrying context, or context as permission to execute.
- This is an illustrative trusted HTTP boundary with valid context and successful instrumentation/export. Headers alone do not create spans or ensure their collection. The visible separation between Received, extracted context, new B, and exported B is essential.
- Export timing is illustrative and may be batched or reordered. Record copies reaching the viewer are telemetry, not the application's HTTP response. The distinct paths and phase labels must preserve that distinction.
- Ended is lifecycle completion, not proof of test success or answer correctness. Trace linkage makes no performance claim. Animation duration does not represent real measured latency.
- Only the instrumented path shown is complete in this example; the final viewer does not assert universal coverage of all operations.

## Acceptance for future production

- At actual native 350 px width (~622 px high), 52 px labels become ~16.9 px, 48 px states ~15.6 px. Independently inspect every identifier and phase label without zoom. Reflow long text rather than shrinking fonts. Avoid overlap between Call span A and Running, and between receiver fields and arriving metadata.
- Inspect individual encoded holds at 6, 12, 17, 21, 26, 33, 37, and 45 s, plus before/mid/after injection, boundary crossing, extraction, B creation, export arrivals, and final elbow draw. Also inspect full-size frames; contact sheets cannot establish legibility.
- At 12 s identify T and A in the outgoing metadata. At 21 s see extracted context without B yet. At 26 s identify new B, same T, parent A. At 45 s distinguish HTTP transport from exported span records.
- Verify metadata stays attached to the same request across its compact/expanded states. No unrelated T, copied span ID A as B's own ID, automatic span creation on header arrival, or parent link before B exists.
- During export, preserve source records and identities. Count 0→1→2 only after record arrivals. No final claim of whole-system completeness.
- Assess silent causal comprehension, readable holds, and meaningful motion variety: metadata copy, request crossing, extraction, record creation, export, relationship inspection. No decorative spinning or generic repeated transfer.
- Reproduce suspected visual faults with alternate extraction before flagging. Later production must decode the full MP4, inspect audio peaks/streaming metadata, and actually listen before claiming audio was heard. Bind review to the actual full SHA-256; re-encoding requires renewed review.

Plan only. Future implementation uses repository-pinned Puppeteer and cut-local engine copies. No render, public/site/shared-skill changes, Git operation, or other lesson work is part of this deliverable.
