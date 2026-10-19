# Follow the tool

Author: gpt-6-astra; reasoning: high; 2026-10-19.

Learning objective: diagnose an agent-to-tool tracing gap and explain how propagating trace context on a new execution connects the tool span to its parent without making the tool faster.

Independent sequence: ordinary model child span → tool starts a separate trace → new run with transport propagation → connected waterfall → select the slow tool. Neither baseline encoded media nor another variant's scene was consulted. The original concept's billing retry is replaced with an engineer's remote test tool and a broken instrumentation boundary.

| Playback | Motion | State change | Sound |
|---|---|---|---|
| 0–5 s | Title opens; agent sends to model; first two intervals grow | Run A's model shares trace 7B; span m differs from parent a | Opening arrive C5; send C6 at 1.30; arrive E5 at 2.05; ack E6 at 2.65 |
| 5–11 s | Broken link turns red; tool starts; separate amber interval grows | Missing context creates 9C/t instead of a 7B child; total 3.0 s, tool 2.4 s | Miss E4 at 5; send C6 at 5.30; thump G3 at 6.05; work ticks; deliver G4 + miss E4 at 8.45 |
| 11–16.8 s | Old bars reset; model repeats; traceparent chip crosses boundary | Run B gets new trace 8D; extraction creates 8D/t | Recover C4 at 11; send C6 / arrive E5; header send C6 at 14; store G5 at 15.30 |
| 16.8–21.2 s | Grouping bracket extends to tool; synchronized intervals grow | Three distinct spans are connected in one trace; durations unchanged | Arrive G5 at 16.80; work G3 ticks; deliver G5 at 19.20 |
| 21.2–28 s | Model dims; tool and long interval highlight; resolved state holds and fades | Investigation narrows to tool time, without claiming root cause or speed improvement | Hit G5 at 21.20; selection pulse / arrive G5 at 23.70; poof C5 at 25.30 |

Stage: agent (540,675), model (285,950), test tool (795,950). Top-down call wires meet at y810. Intervals share x150–930 and y1250/1400/1550; bracket x105 groups recorded spans. Text uses 30–86 px. The whole frame fades to black for the loop reset; the last second repeats the opening black frame.

Semantic boundaries: abstract span graph, not a full HTTP instrumentation diagram (client/server spans omitted); trace/span identifiers abbreviated; parent relationships conveyed by wires. The first run shows the detached tool record for comparison, not as part of its agent trace. Run B represents fresh telemetry after a code/configuration change. The traceparent label stands for serialized trace ID, parent ID and flags, not just a request ID. Times are illustrative and the animation pauses to teach. Recording and propagation are assumed to work in Run B; sampling/export failure are addressed in the guide. No permissions, output correctness, or latency improvement is guaranteed.
