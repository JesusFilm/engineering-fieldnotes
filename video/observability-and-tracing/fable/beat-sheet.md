# Beat sheet — observability-and-tracing, fable cut

Model: anthropic/claude-fable-5-1 (reasoning: high). Scene: `observability-and-tracing.js`. Render: `./render.sh`. Verify: `./verify.sh`.

## Lesson

A tool that calls a downstream service must carry the trace context (the W3C `traceparent` header) on its outgoing request. Without it the service records its spans under a new trace id, so a failed agent task cannot be followed into the service that failed. With it, the service's span joins the agent's trace and one failed task reads end to end: `invoke_agent → execute_tool → POST /charge 500`.

This complements the baseline cut, which teaches how a span waterfall breaks one slow total into the step that consumed the time. This cut teaches how the spans come to be in the same trace in the first place.

## Actors and stage (1080×1920)

| Actor | Node | Position |
|---|---|---|
| User | phone | 240, 665 |
| Agent | box | 240, 895 |
| charge() tool (gains sublabel `+ traceparent` in beat 3) | box | 240, 1135 |
| Billing API | db | 240, 1420 |
| Agent trace (2 span rows, sublabel = trace id) | store | 770, 920 |
| Billing API spans (4 rows; each row ends with its trace id) | store | 770, 1410 |
| ? / ✓ badge on the link between the two panels | badge | 560, 1132 |

Sound map: user send E6, agent arrive C5, tool arrive E5, API arrive G5 (the request path plays C–E–G each task). Span rows land with `store` panned right. Crash on the API 500, `thump` when the agent's tool span turns ERROR, low `deliver` C4 when the 500 reaches the user. The unmatched search is three `clock` ticks and a `miss`; the fix is a custom two-tone `tag`; the link is `hit` then `chime`.

## Beats (playback seconds, speed 1)

| Time | What moves | State change | Sound |
|---|---|---|---|
| 0.0–0.7 | Stage fades in from the veil | — | — |
| 0.8–5.6 | **Normal.** `task 7` → Agent → charge() → `POST /charge` → Billing API; `200` returns to the user | Agent trace fills `invoke_agent · task 7`, `execute_tool · charge`, sublabel `trace 4bf9`; API panel records `POST /charge 200 · 91c0` under its own id; spans turn green | send, arrive C5/E5/G5, store ×3, work, chime |
| 6.4–7.0 | Another caller's dot hits the API from below | API panel gains `POST /charge 200 · a7e3` | arrive (quiet), store |
| 7.65 | Agent trace clears for the next task | rows fade, sublabel clears | poof (quiet) |
| 8.4–13.2 | **Problem.** `task 8` runs the same path; the API jolts red and returns `500` | API panel adds `POST /charge 500 · 0d12`; agent row becomes `execute_tool · ERROR`, both rows red, user flashes red | crash (loudest), store (low), thump, deliver C4 |
| 13.9–15.3 | A dashed red link appears between the panels; the three API rows are scanned in turn | none carries `c3a1`; a red **?** badge pops on the link | clock ×3, miss |
| 17.6–18.3 | **Fix.** Agent trace clears; charge() gains `+ traceparent` with a blue pulse and ripple | tool now injects the header | poof, tag |
| 20.0–24.8 | **Resolution.** `task 9`; the tool→API packet is the blue chip `traceparent 7e2d`; the API fails again with `500` | API panel adds `POST /charge 500 · 7e2d` with the id in blue, matching the agent trace sublabel; agent rows turn ERROR/red | send, arrive ×3, store, work, crash, thump, deliver |
| 25.4–26.4 | The link becomes a solid, flowing blue wire; the API panel pulses blue; the badge becomes a blue **✓** | one trace spans both processes | hit, chime |
| 26.4–28.6 | Hold on the linked failure | — | — |
| 28.6–29.6 | Stage fades to the veil; last frame equals the first | — | — |

## Local engine changes (engine/, copied from the skill's scripts/)

- `flow-engine.js`: `store` accepts `textSize` and per-row `row{i}TextColor`; `box` accepts `subSize` and `subMono`; wires accept `width`; chip text is 28 px.
- `render.mjs`: peak ceiling of −3 dBFS on the synthesised mix before AAC; ffmpeg capped at two threads; constant QP 22 with `mbtree=0` and the last frame forced to a keyframe so identical first/last source frames decode identically; `FLOWVID_TMP` keeps temp files in `scratch/`.
- `node_modules` is a symlink to the skill's installed dependencies (ignored by Git); `npm install` in `engine/` recreates it elsewhere.

## Reproduce

```
cd video/observability-and-tracing/fable
./render.sh      # writes public/media/observability-and-tracing/fable.mp4 and fable.jpg
./verify.sh      # format, decode, boundary frames, audio peak, faststart, poster
open "file://$PWD/engine/preview.html?scene=file://$PWD/observability-and-tracing.js"   # live preview with sound
```



## Comparative correction — 2026-10-19

The final join at 25.36s selects only API row 7e2d; unrelated rows dim. The red error state remains. The local store renderer adds an optional per-row Highlight outline. Actual encoded beat times are recorded in transcript.json; those supersede earlier approximate ranges. See ../../../reviews/comparisons/observability-and-tracing/after.md for final evidence. Original author/model attribution is unchanged.
