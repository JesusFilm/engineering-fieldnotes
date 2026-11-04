# Visibility is not a speedup

## Scope and grounding

One mechanism: fixing trace linkage makes an operation's elapsed time attributable to the task; it does not itself shorten the operation. Compare two explicitly different runs of the same illustrative sequential fixture: model 0.6 s, then tool 2.4 s, total 3.0 s in each.

Grounding: `video/observability-and-tracing/sequence/lessons.json` item 4 and `content/concepts/observability-and-tracing.json`. Primary sources already inspected 2026-10-21: [OpenTelemetry context propagation](https://opentelemetry.io/docs/concepts/context-propagation/) explains cross-service correlation, and [OpenTelemetry traces](https://opentelemetry.io/docs/concepts/signals/traces/) explains operation timing and relationships. The exact durations and unchanged runtime are the repository's illustrative fixture, not a measured benchmark or a guarantee from those sources.

Five beats, approximately 47 seconds. End on a stable before/after comparison. No header-format explanation, optimization implementation, error diagnosis, output evaluation, or later-lesson data policy. The earlier propagation mechanism is assumed; show only its effect on the next run's recorded relationships.

## Visual design

Use a **trace query result plus a fixed-scale elapsed-time ruler**. The first run's tool record exists, but appears in another trace. The second run's record appears under the task. Preserve bar widths and aligned endpoints throughout. This makes the improvement spatially visible without pretending the tool got faster.

Canvas 1080 × 1920. Background #050506; text #E6E8EC; secondary #8B9099; model accent #F5A524; tool accent #3FB68B. Group outlines are neutral white; a recorded relationship is a solid elbow. No red failure symbol: the work completes in both examples. Primary type 56–60 px, metadata 50–52 px, title 76 px, no necessary text below 48 px.

Coordinates are x,y,width,height unless noted. Plot area x=150–930, mapping 3.0 s to 780 px (260 px/s). Model interval x150–306, tool x306–930. Keep labels outside narrow bars: never fit `Model 0.6 s` inside a 156 px segment.

| Element | Geometry | Labels / use |
|---|---|---|
| Title | 90,140,900,180 | `Visibility is not` / `a speedup` |
| Example note | 90,335,900,64 | `Sequential example`, 52 px |
| Run selector | 90,440,900,80 | `Run 1 · unlinked`, later `Run 2 · linked` |
| Total readout | 90,550,900,90 | `Elapsed 3.0 s`, 64 px |
| Model label | 120,710,840,70 | `Model 0.6 s` |
| Model bar | 150,800,156,60 | amber; no internal text |
| Tool label | 120,940,840,70 | `Tool 2.4 s` |
| Tool bar | 306,1030,624,60 | teal; no internal text |
| Ruler | x150–930, y1180 | endpoints `0.0` and `3.0 s`; intermediate tick x306 labeled `0.6`, 50 px |
| Trace group labels | 120,650 and 120,890 | `Trace T1` for model; `Trace U1` for tool in run 1, 50 px |
| Group outlines | 90,635,900,240 and 90,885,900,240 | separate run-1 query results; become one outline (90,635,900,490) in run 2 |
| Comparison rows | 90,1320,900,280 | `Run 1   3.0 s`, `Run 2   3.0 s`, 60 px; appeared only after corresponding run finishes |
| Footer | 90,1740,900,80 | `Time now attributable`, 52 px |

In run 2 the upper group label is `Trace T2`; remove the second trace heading and replace it with `Parent: task`, at the same size. A parent elbow sits in the x110 gutter, from (110,695) through (110,975) to (140,975), never across bars or text. The agent/task parent is represented by the group header `Task · Trace T2`, not by a third duration bar that could be mistakenly added to the children. For run 1 use `Task · Trace T1` and `Separate trace U1`. If headers need room, use two short lines and extend the group heading area upward; preserve bar coordinates.

## Beats, state transitions, and sound

Actor sound notes: model E4, tool A4, trace viewer G4. `work`, `ack`, and `store` are preset cues. Two runs have the same performance event rhythm; only the viewer's grouping changes. Animation is stretched for teaching, and labeled durations are the fixture measurements.

| Beat / playback | Motion and state | Sound / holds |
|---|---|---|
| 1 · 0–10 s · Establish measured work | Establish title/ruler 0–2. At 2.5 show Run 1. Grow model bar x150→306 over 2.5–3.5; freeze at 0.6 s. Only afterward grow tool bar x306→930 over 3.5–7.5; freeze at 2.4 s. Show total 3.0 s at 7.8. Labels appear with their completed measurements, not before execution as predictions. | Model `work` E4 at 2.5 and `ack` E4 at 3.5; tool `work` A4 at 3.5 and `ack` A4 at 7.5. Hold 8–10. No simultaneous execution. |
| 2 · 10–19 s · Separate records | 10.5–11.5 draw the two separate trace-result outlines and labels around already completed bars. Emphasize T1 versus U1 once, keeping bar lengths unchanged. At 13 add first comparison row `Run 1   3.0 s`. | Viewer `store` G4 at 11.5. Hold 13.5–19: the tool record is present, but its trace has no recorded parent link to this task. Do not animate it disappearing. |
| 3 · 19–31 s · A new linked run | 19–20.5 retain the Run 1 comparison row but clear its active query results and bars. At 21 show `Run 2 · linked` and short cue `Context propagated`. At 22 start model, settling at 23; start tool at 23, settling at 27. This repeats precisely the first animation rhythm and endpoints. Reveal Trace T2 grouping after records arrive at 28; tool row has `Parent: task`. At 29 total reads 3.0 s and second comparison row appears. | Model `work` E4 at 22, `ack` E4 at 23; tool `work` A4 at 23, `ack` A4 at 27; viewer `store` G4 at 28. Hold 29.5–31. Distinct run label and new trace ID prevent retroactive repair of run 1. |
| 4 · 31–40 s · Locate the time | At 31.5 draw the parent elbow within T2. At 33 outline the tool bar without resizing it; show `2.4 s` next to its existing label with no duplicate number if already displayed. Lightly dim model bar but keep its label legible. The selected tool remains within the task's trace. | Viewer `ack` G4 at 31.5; tool `ack` A4 at 33. Hold 34–40. The selected span identifies where to investigate, not a proven internal cause. |
| 5 · 40–47 s · Compare totals | At 40.5 underline both 3.0 s values in the comparison rows together. At 42 footer `Time now attributable` appears. Keep the linked trace, tool measurement, and both totals on screen. | Viewer `ack` G4 at 40.5. Silent hold 42.5–47. No speedup arrow, shrink, confetti, or automatic repeat. |

Important implementation detail: source bars during run 1 are an illustrative measurement view showing both available records, not a claim that the unlinked task query already knows its tool association. The separate outlines explicitly label that mismatch. The demonstration's fixture supplies the common relative-time ruler. Use `Example timing` beside the ruler if needed to avoid implying the backend inferred a relationship from timestamps.

## Accuracy boundaries

- Both runs use an illustrative controlled fixture with sequential, non-overlapping calls and negligible omitted overhead. Only under this simplification does 0.6 + 2.4 equal the task's 3.0 seconds. Do not generalize summing nested or overlapping spans.
- Context repair changes linkage in a new run. It does not relabel the old U1 trace, merge historical IDs, or reduce the 2.4 s measurement. T1, U1, and T2 are aliases, not literal wire IDs.
- Propagation is not a performance optimization by itself; instrumentation can have overhead and real runs can vary. Equal totals are this example, not a promise of identical runtimes after tracing changes.
- The tool was observed separately in run 1; it was not invisible in all telemetry. The missing information was its recorded relationship to the task.
- Trace timing identifies an instrumented operation's duration, which may include transport and waiting. Highlighting the tool does not prove the test process itself is slow or identify a root cause.
- Assume working instrumentation and export in both runs. No implication that a shared trace ID alone reconstructs every missing relationship or ensures complete telemetry.

## Native350 acceptance and future encoded review

These are requirements for later production, not claims of completed checks.

- View individual actual encoded frames at 350 px width (~622 px high) and full size. Primary 56 px labels become ~18 px; metadata 50 px becomes ~16.2 px. The 0.6 tick must not collide with 0.0; move tick labels vertically if needed, never shrink them. Keep all text outside bars.
- Inspect holds at 8.5, 15, 21.5, 29.5, 36, and 45 s, plus before/mid/after each bar completion, query-group change, new-run reset, and parent elbow reveal. Contact sheets do not establish phone readability.
- The viewer must distinguish run 1's two trace groups from run 2's one group, identify a distinct new run, and read exactly 3.0 s for both. Neither bar may shrink when the trace becomes linked.
- Confirm sequential animations and equal plotting scale/endpoints. Model ends at x306; tool begins at x306 and ends x930 in both runs. New-run clearing must not look like deleting the historical measurement row.
- Confirm no parent elbow connects run 1's U1 to T1, no historical rewrite, no unchanged source trace ID reused for the next run, and no root-duration bar accidentally counted twice.
- Silent playback must communicate changed attribution and unchanged time through grouping and aligned measurements. Motion variety comes from time growth, query grouping, new-run reset, span selection, and total comparison, not decorative travel.
- Reproduce any suspected visual fault through alternate extraction before flagging. Later decode the complete encode, check audio peaks and streaming metadata, and listen before making any claim that audio was heard. Bind review to the actual full SHA-256; re-encoding requires a renewed encoded review.

Only this plan is assigned. Later implementation must use repository-pinned Puppeteer and cut-local engine copies. No rendering, publication, shared edits, Git operations, or other lesson work is included.
