# Lesson 02 beat sheet: Related spans form a trace

**Mechanism:** each child span copies the trace ID from its parent, mints a span ID of its own, and records its parent's span ID. A trace view groups spans by the shared trace ID and nests them by parent ID.

**Example:** an `agent task` span starts trace `4bf9` with span ID `a1`. A `model call` child gets `b2`, a `tool call` child gets `c3`; both keep trace `4bf9` and record parent `a1`. They are siblings: the tool's parent is `a1`, never `b2`.

Times are playback seconds for `video.mp4` (speed 1). Duration 42.60 s, finite ending (fade to black, no loop).

## Neutral choices from plans A and B

| Idea | Source | Why |
|---|---|---|
| Span record cards whose values visibly copy (trace, parent) or are minted fresh (span ID) | B | The difference between "copied" and "new" is the mechanism |
| One identity colour for the trace ID (blue) everywhere | B | The shared value is recognisable at a glance in cards and view |
| Cards placed as a tree: root above, two children side by side, both links leaving the root | A (siblings), B (cards) | Shows nesting and that B and C are siblings; no B→C edge exists at any time |
| `running` / `ended` on each card; agent stays running until both children end | A | The children happen inside the parent operation |
| Root parent shows `—` | A, B | The root has no parent |
| Trace view panel, empty until all spans end, then grouped under `trace 4bf9` with indented rows | B (view), A (tree rows) | Grouping comes from recorded IDs; empty panel avoids implying a live complete view |
| Short illustrative IDs (`4bf9`, `a1`, `b2`, `c3`) | B | Look like generated hex IDs; real IDs are 32 and 16 hex characters |
| Actor pitches: agent C, model E, tool G, trace ID always A | B | Copies of the trace ID sound identical; new span IDs sound distinct |
| Not used: A's selectable detail panel and footer captions, B's `agent process` frame | — | Cards already show every field; the footer is caption text; a process frame points toward lesson 03 |
| Excluded later-lesson content | — | No headers, propagation, durations, export failures or sensitive data |

## Beats

| # | Time (s) | What moves | State change | Sound |
|---|---|---|---|---|
| 1 | 0.0–8.0 | **Root span.** 1.0 `agent task` card appears. 2.2 `trace 4bf9` mints with a blue ripple. 3.2 `span a1` mints. 4.2 `parent —`. Hold. | Agent running; one span in a new trace. | 1.0 send C6 · 2.2 chime A5 (only chime: new trace) · 3.2 store C5 · 4.2 ack C4 |
| 2 | 8.0–18.0 | **Model call.** 8.0 card appears. 8.8 root trace row lights; blue `4bf9` chip runs down the link, lands 9.8. 10.8 `span b2` mints. 11.8 root span row lights; `a1` chip runs down, lands 12.8 as `parent a1`; link turns white; root `a1` lights with it. 14.8 model ends. Hold. | Model: copied trace, new span, parent a1, then ended. Agent still running. | 8.0 send E6 · 8.9 send A6 · 9.8 store A5 · 10.8 store E5 · 11.9 send C6 · 12.8 ack C5 · 14.8 ack E4 |
| 3 | 18.0–28.5 | **Tool call, the same way.** 18.0 card appears. 18.8–19.8 `4bf9` copied. 20.8 `span c3` mints. 21.8–22.8 `a1` copied; link turns white. 24.6 tool ends. 25.6 agent ends. Hold. | Two siblings with the same parent; three distinct span IDs; all ended. | 18.0 send G6 · 18.9 send A6 · 19.8 store A5 · 20.8 store G5 · 21.9 send C6 · 22.8 ack C5 · 24.6 ack G4 · 25.6 ack C4 |
| 4 | 28.5–40.6 | **Trace view.** 28.5 panel turns blue, `trace 4bf9` header appears, every card's trace row lights. 29.7 / 30.7 / 31.7 rows `agent task a1`, `model call b2`, `tool call c3` appear (children indented with branches) as each card flashes. 33.4 / 34.1 / 34.8 span IDs light one at a time in card and view. 36.2 parent links and tree branches flash together with the parent rows. Hold. | One trace, three distinct spans, two siblings nested under a1. | 28.5 ack A5 · 29.7 arrive C5 · 30.7 arrive E5 · 31.7 arrive G5 · 33.4 ack C5 · 34.1 ack E5 · 34.8 ack G5 · 36.2 deliver C5 · silent hold |
| end | 40.6–42.6 | Fade to black, title remains. | — | — |

## Reproduce

From the repository root (uses the pinned `puppeteer-core` 25.14.0 from the root `node_modules`):

```
node video/observability-and-tracing/motion-v2/02/engine/render.mjs video/observability-and-tracing/motion-v2/02/scene.js video/observability-and-tracing/motion-v2/02/video.mp4 --sheet video/observability-and-tracing/motion-v2/02/scratch/contact-sheet.png
```

The cut-local engine copy adds general `record` (titled key/value card with status) and `frame` node types, an `align` option on `label`, and a `size` option on chip packets. The shared skill is unchanged.

## Lesson text sync (coordinator)

`sequence/lessons.json` item 2 declares `duration: 28` and beats at 0/7/14/21. For this cut, suggested: duration 42.6 with beats at **0 / 8.0 / 18.0 / 28.5**. This folder does not edit that file.
