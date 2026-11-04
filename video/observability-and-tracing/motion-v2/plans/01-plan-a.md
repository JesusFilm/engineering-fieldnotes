# One operation is a span

## Scope and teaching decision

Lesson 01 only. A caller invokes a remote test tool; instrumentation opens and closes a record of that operation. The span preserves start, elapsed duration, and selected attributes/outcome. Execution can happen without a visible span.

Use a **live operation above a timeline inspector**, not a chain of explanatory boxes. A short uninstrumented call establishes the distinction; a second, instrumented call builds one span in place. The two calls are explicitly separate runs. The first is never backfilled. Target 46 seconds, five beats, finite ending. Playback holds are teaching time, not measured operation time.

Do not teach parent/child spans, trace IDs, propagation, sampling configuration, latency diagnosis, or authorization. Related spans forming a trace belongs to the accompanying lesson text; no extra trace diagram is needed here.

## Grounding and accuracy boundaries

- Scope: `video/observability-and-tracing/sequence/lessons.json`, item 1; `content/concepts/observability-and-tracing.json`.
- Primary source: [OpenTelemetry traces](https://opentelemetry.io/docs/concepts/signals/traces/), inspected 2026-10-21. Spans represent operations with start/end timestamps and metadata; attributes annotate the operation. The timeline and record field wording below are illustrative UI choices.
- This example instruments the **caller-side remote invocation**: start immediately before sending, end after receiving the result. Its 2.4 s includes the outbound/return journey and waiting, not just remote computation. No separate server span is implied.
- `Outcome: returned` is an explicitly captured application result, not an automatic OpenTelemetry `Ok` status or proof that tests passed. Do not display a green “tests passed” claim.
- The chosen first run deliberately has instrumentation off. In real systems, missing visible spans can have other causes; an empty inspector alone cannot prove that nothing executed or diagnose missing instrumentation.
- Attributes are selected, synthetic, non-sensitive metadata. No raw test output, prompts, credentials, or automatically comprehensive capture.
- A live inspector is a teaching simplification; production collection/export can be delayed. A span is an execution record, not a prospective schedule or percent-complete indicator.

## Stage and typography

Canvas 1080 × 1920. Black `#050506`; white `#E6E8EC`; secondary `#8B9099`; amber `#F5A524` for executing; teal `#3FB68B` for recorded data. Text and shape changes convey state without relying on color.

Coordinates below are top-left/width/height unless marked center. All content within x=80–1000, y=130–1740.

| Element | Geometry | Useful labels |
|---|---|---|
| Title | (90,140,900,180) | `One operation` / `one span`, 76 px |
| Run label | (90,350,440,64) | `Call 1`, later `Call 2`, 52 px |
| Instrumentation switch | (90,440,900,84) | `Instrumentation OFF` → `ON`, 52 px; visible switch at (900,482) |
| Caller | (120,610,300,180) | `Caller`, 58 px; `Ready` / `Waiting` / `Returned`, 48 px |
| Remote tool | (660,610,300,180) | `Test tool`, 58 px; `Idle` / `Running` / `Returned`, 48 px |
| Request/response lane | y=700, x=420–660 | outbound x420→660; return x660→420; no simultaneous packets |
| Inspector header | (90,940,900,70) | `Span inspector`, 56 px; separate count below: `0 spans` / `1 span`, 48 px |
| Span name | (120,1110,840,65) | `run_tests`, 58 px |
| Timeline | x=150–930, y=1280 | open stroke grows from x150 to current head; start/end caps at final x150/x930 |
| Timeline labels | (120,1340,840,70) | `0.0 s` at left; final `2.4 s` at right, 50 px |
| Detail rows | (120,1460,840,200) | `Tool: test service`, `Outcome: returned`, each 50 px, 90 px separation |
| Footer | (90,1740,900,70) | `Recorded operations only`, 52 px |

Start and end labels sit above the timeline at y1190, left/right respectively, 48 px. Never place text on the moving stroke. No tiny timestamps. The relative start is 0.0 s; note in the write-up that real records use timestamps. Timeline length is elapsed example time, not completion percentage. Its right cap and end value appear only when the response is received. No empty pre-drawn progress track or predicted endpoint.

## Timed motion, state, and sound

Actor pitches stay stable: caller C4, test tool E4, instrumentation G4. Presets are production cues, not claims of audio already created or heard. No background music, clock loop, or sound for each text reveal.

| Beat / playback | Motion and event timing | Persisted state and reading hold | Sound |
|---|---|---|---|
| 1 · 0–8 s · Work without a record | 0–1.5 establish `Call 1`, instrumentation OFF, `0 spans`. At 2.0 the caller becomes Waiting; request travels 2.0–2.8. Tool changes to Running at 2.8. Response travels 4.5–5.3; caller becomes Returned. | Inspector stays genuinely empty throughout. Tool activity is visible despite no timeline. Hold returned caller plus `0 spans` from 5.3–8.0. | Caller `send` C4 at 2.0; tool `work` E4 at 2.8 and `send` E4 at 4.5; caller `arrive` C4 at 5.3. No instrumentation sound. |
| 2 · 8–15 s · Add instrumentation | 8.0–9.0 return actors to Ready/Idle and change run label to `Call 2`. At 9.5 switch OFF→ON, with short lines identifying the outgoing and returning caller boundary. At 12.0 a start cap appears at (150,1280), `run_tests` and Start/0.0 s appear, and count becomes `1 span`. At 12.2 send the second request; arrive at tool at 13.0. | OFF→ON is a deliberate setup change before the new call. First call remains unrecorded. Hold the open span and running tool through 15.0. | Switch `ack` G4 at 9.5; instrumentation `store` G4 at 12.0; caller `send` C4 at 12.2; tool `work` E4 at 13.0. |
| 3 · 15–24 s · Elapsed time grows | Extend the span stroke 15.0–21.0 from x150 to x735 with a single moving head. Show elapsed value `1.8 s` beneath that head after it settles; do not show percent or final endpoint. Tool retains Running with one restrained activity sweep 16–18. | Start cap stays fixed; the span is visibly Open. `Tool: test service` appears at 16.5 and persists. Hold 21–24 on the still-open record. Animation time is deliberately expanded. | One subdued `work` E4 at 16.0. Instrumentation `ack` G4 at 21.0 when the elapsed marker settles. Silence during the hold. |
| 4 · 24–33 s · Return closes the span | Tool becomes Returned at 24.0; response travels 24.0–25.2. Stroke resumes growing to x930 during this interval. Only when caller receives at 25.2 does the end cap appear; Open becomes Closed, End label and `2.4 s` appear. At 27.0 add `Outcome: returned`. | The fixed start, fixed end, and duration remain. Caller receipt causally precedes closing the caller-side span. Hold 28–33 with no motion. | Tool `send` E4 at 24.0; caller `arrive` C4 at 25.2; instrumentation `store` G4 at 25.4. No celebratory success fanfare. |
| 5 · 33–46 s · Inspect the record | Dim execution actors slightly, retaining readable labels. At 33.5 outline the span inspector. Brief focus accents move Start→End→Tool/Outcome at 34, 36, and 38 s, without moving text. At 40.0 footer appears. | The final inspector retains `1 span`, run_tests, Closed, start/end, 2.4 s, tool and observed outcome. Hold 40–46. No replay, reset, new call, or additional span. | Quiet instrumentation `ack` G4 at 33.5; one `chime` G4 at 40.0 for the completed record, not test correctness. Final hold silent. |

During beat 3 the open span can show `Open` in the inspector header; beat 4 changes that same slot to `Closed`. Keep the example duration value separate from any playback scrubber. Do not advance a measured clock during explanatory still holds.

## Why this geometry teaches

The upper operation can run while the lower inspector remains empty. That spatial separation makes missing instrumentation visible. On the second call, the anchored start, expanding elapsed interval, and final end cap turn a definition into a state transition. The closing record remains inspectable after the actors stop. Motion has distinct jobs: operation travel, elapsed extent, boundary closure, and inspection focus; none is a decorative repeated transfer between three boxes.

## Native 350 px acceptance and later production checks

These are requirements for a future encode, not checks performed by this plan.

- Inspect actual individual encoded frames at native 350 px width, preserving aspect ratio (about 622 px high). Titles render about 24.6 px, primary labels 16–18.8 px, secondary labels at least 15.5 px. Verify the full instrumentation label fits its row; use two concise lines if needed, never shrink it.
- Sample every beat hold at 1.5, 6.5, 11, 14, 22, 29, 37, and 44 s. Also inspect both sides and the midpoint of request departure/arrival, ON switch, start creation, response arrival, and end-cap appearance. Check full-resolution frames as well.
- At 6.5 s a beginner must identify a completed call with zero recorded spans. At 14 s they must identify an open span for a different call. At 29 s they must locate start, end/duration, and outcome without reading a paragraph.
- The first run must never acquire a span retrospectively. The second span must begin before request departure and close after response receipt. No future duration/end cap may leak into its Open state.
- Ensure no line crosses labels, cap obscures text, elapsed value collides with endpoint values, or response packet appears to create a server span. Preserve at least 3 px effective separation at 350 px between text and strokes.
- Verify the 2.4 s is plainly an illustrative measurement rather than a claimed literal 46 s operation. Final outcome must read `returned`, not `passed`, `correct`, or automatic `Ok`.
- Reproduce any suspected visual defect with an alternate extraction before flagging; do not judge font failures from a contact sheet alone.
- Later rendering uses repository-pinned Puppeteer and cut-local engine extensions. Decode the full MP4, inspect audio peaks and streaming metadata, and actually listen before making listening claims. Sound event identity/timing must match this sheet; holds must remain quiet.
- Bind encoded review to the actual full SHA-256 and renew review after any re-encode. Finite ending is intentional. No rendering, source implementation, shared dependency changes, publication, or other lesson work is authorized by this plan artifact.
