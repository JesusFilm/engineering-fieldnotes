# Lesson 03 beat sheet: Cross a service boundary

**Mechanism:** the caller's trace context (`4bf9 · a1`) lives in its own process memory and cannot reach another service by itself. Transport code injects it into the outgoing HTTP request as a `traceparent` header; the receiving service extracts it into its own context, and only then starts a child span from it. Both services must export their spans before a trace view shows the path.

**Example:** the agent process (span `a1` in trace `4bf9`) sends `POST /run-tests` to a test service, which creates span `d4` with trace `4bf9` and parent `a1`.

Times are playback seconds for `video.mp4` (speed 1). Duration 47.00 s, finite ending (fade to black, no loop).

## Neutral choices from plans A and B

| Idea | Source | Why |
|---|---|---|
| Sender process above, receiver below, a request object physically moving between them | A | A vertical crossing gives each process full width for readable text |
| A visible in-memory `context` box in each process: full in the sender, `—` in the receiver until extraction | B | Shows that a local relation cannot cross on its own |
| The request is a real HTTP request: `POST /run-tests` with a `traceparent` line that starts as `—` | B (header text), A (inspected request) | Context travels as data inside the request |
| Header value drawn as segments `00-4bf9-a1-01`, with decode labels `trace` and `parent` | A (decoded fields), B (header string) | The beginner reads both the wire form and its meaning |
| Hold after receipt before extraction, and another before the child span exists | A | Receipt, extraction and span creation are separate steps |
| Span cards reuse lesson 02's `trace / span / parent` rows and `running/ended` | B (rows), A (lifecycle) | Vocabulary carries over |
| Response returns, both spans end, the lane becomes a trace view reading `0 spans received` | A (reuse of the strip), B (empty state) | Spans existing is not the same as spans received |
| Export along the right margin, separate from the HTTP lane; rows land one per export | A, B | Telemetry export is distinct from the application's request and response |
| Actor pitches: agent C, test service G, request E, trace ID always A | B | Inject and extract sound identical because they carry the same values |
| Not used: A's phase captions (`Inject`, `Extract`, ...) and footer, B's side-by-side processes | — | Captions replace motion; side by side leaves 340 px cards |
| Excluded later-lesson content | — | No broken/unlinked run, no durations, no sampling flags explained, no export failures |

## Beats

| # | Time (s) | What moves | State change | Sound |
|---|---|---|---|---|
| 1 | 0.0–9.0 | **Two processes.** 1.2 `agent task` card fills `4bf9 / a1 / —`. 2.4 sender context fills `4bf9 · a1`. 3.4 receiver context `—` flashes. 4.4 the request appears under the sender with `traceparent —`. Hold. | Only the sender has a context. | 1.2 store C5 · 2.4 ack C5 · 3.4 ack G4 · 4.4 store E5 |
| 2 | 9.0–17.0 | **Inject, then send.** 9.0 blue `4bf9 · a1` chip drops from the sender context into the header; 10.0 header reads `00-4bf9-a1-01`. 10.9 decode labels `trace`/`parent` appear while the sender's trace and span rows light. Hold. 13.0–14.4 the request moves down the lane into the test service. Hold: received, receiver context still `—`. | Header filled; request delivered; nothing extracted yet. | 9.1 send A6 · 10.0 store A5 · 10.9 ack A5 · 13.0 send E6 · 14.4 arrive G5 |
| 3 | 17.0–28.0 | **Extract, then a new span.** 17.0 header lights; the same blue chip rises into the receiver context; 18.0 it reads `4bf9 · a1`. Hold: context, no span. 21.0 `run tests` card appears (running). 21.8 `trace 4bf9` from the context. 22.7 `span d4` minted. 23.6 `parent a1` while the sender's `a1` lights. Hold. | Child span in another process with the same trace and parent a1. | 17.1 send A6 · 18.0 store A5 · 21.0 send G6 · 21.8 store A5 · 22.7 store G5 · 23.6 ack C5 |
| 4 | 28.0–39.4 | **End, respond, export.** 28.0 `run tests` ends. 28.8 request fades. 29.4–30.7 `200 OK` rises; agent ends. 32.0 the lane becomes `trace view` with `0 spans received`; 33.4 it flashes. 35.0 `a1` exported along the right margin; row `agent task · agent · a1` and header `trace 4bf9` appear. 37.0 `d4` exported; indented row `run tests · test service · d4`. | Both spans ended; view empty until each export lands. | 28.0 ack G4 · 29.4 send G6 · 30.7 arrive C5 · 32.0 ack A4 · 33.4 soft thump · 35.0 deliver C5 → 36.0 arrive C5 · 37.0 deliver G5 → 38.0 arrive G5 |
| 5 | 39.4–47.0 | **One trace across two services.** 39.4 both cards' trace rows and the view header flash (only chime). 40.8 receiver `parent a1`, sender `span a1` and the tree branch flash. Hold, 45.0–46.0 fade. | Final state. | 39.4 chime A5 · 40.8 ack C5 · silent hold |

## Reproduce

From the repository root (pinned `puppeteer-core` 25.14.0 from the root `node_modules`):

```
node video/observability-and-tracing/motion-v2/03/engine/render.mjs video/observability-and-tracing/motion-v2/03/scene.js video/observability-and-tracing/motion-v2/03/video.mp4 --sheet video/observability-and-tracing/motion-v2/03/scratch/contact-sheet.png
```

The cut-local engine starts from a copy of lesson 02's local engine (`record`, `frame`, label `align`, chip `size`) and adds general `segtext` (coloured monospace segments) and `request` (movable HTTP request card with a header line that fills in and decode labels). Lesson 02's files and the shared skill are unchanged.

## Lesson text sync (coordinator)

`sequence/lessons.json` item 3 declares `duration: 28` and beats at 0/7/14/21. For this cut, suggested: duration 47.0 with beats at **0 / 9.0 / 17.0 / 28.0**. This folder does not edit that file.
