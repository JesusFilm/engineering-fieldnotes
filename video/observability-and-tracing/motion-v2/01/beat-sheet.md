# Lesson 01 beat sheet: One operation is a span

**Mechanism:** instrumentation in the caller records one remote call as a span. The span opens as the request leaves, grows while the test tool works, and closes when the result comes back. It leaves a start, a duration, an outcome and one attribute. The same call made with instrumentation off still does all the work and leaves nothing.

**Example:** the caller invokes `run_tests` on a remote test tool. The illustrative run takes 2.4 s; on screen the span grows at one third speed (7.2 s), linearly, and never pauses while the operation is still running.

Times are playback seconds for `video.mp4` (speed 1). Duration 40.00 s, finite ending (fade to black, no loop).

## Neutral choices from plans A and B

| Idea | Source | Why |
|---|---|---|
| Two separate calls: call 1 with instrumentation off leaves `0`, call 2 with it on leaves one span; call 1 is never backfilled | A | Sets the takeaway (missing instrumentation means no span) against the normal case in the same geometry |
| Caller-side span: opens just before the request leaves, closes after the result lands | A | The span's start and end are tied to visible events, so the bar reads as a record of the call |
| Outcome reads `returned`, never `passed` or `ok` | A | Avoids implying the tests passed or an automatic OpenTelemetry status |
| Live operation above a span view; no wire or packet joins the two zones | A, B | The record appears without a telemetry packet that could be mistaken for a server span |
| Time axis 0–3 s with ticks; the bar grows in step with the work; no predicted endpoint or empty progress track | B | Length means elapsed time, not percent complete |
| Record card whose `duration` and `outcome` read `…` until the span closes | B | Values exist only after the operation ends |
| Actor pitches from one chord (caller C5, tool E5, span G5), sends an octave up, `work` ticks while the tool runs | B (pitches), both (grammar) | Hand-offs are audible; the span has its own voice |
| Final pairing: call 1 pill (dashed, no record) against call 2 pill, bar and record together | B (pairing), A (contrast) | Closes on the takeaway without a sentence |
| Not used: A's paused 1.8 s hold mid-span, B's second (caller) lane row, A's footer sentence, B's playhead clock | — | A paused bar would misstate elapsed time; a second row hints at parent/child spans (lesson 02); the footer is a caption |
| Excluded later-lesson content | — | No trace IDs, parents, propagation, sampling, export or latency comparison |

## Beats

| # | Time (s) | What moves | State change | Sound |
|---|---|---|---|---|
| 1 | 0.0–12.0 | **Call 1, instrumentation OFF.** 2.3 the `run_tests` chip crosses to the tool (arrives 3.2). The tool runs with a spinner. 8.3 the `result` chip returns (lands 9.2). 10.0 the span view outline and its `0` pulse. | Caller ready → waiting → got result; tool idle → running → done. Span view stays empty. The call 1 pill turns grey and dashed. | 2.3 send C6 · 3.2 arrive E5 · 4.55/5.90/7.25 work E4 · 8.3 send E6 · 9.2 deliver C5 · 10.0 soft thump |
| 2 | 12.0–15.5 | **Switch on.** 12.0 actors reset and the `call 2` pill appears. 13.2 the switch slides ON. Hold. | Instrumentation OFF → ON (teal), its link to the caller turns teal. | 12.0 ack C6 · 13.2 ack G5 |
| 3 | 15.5–22.7 | **Span opens and grows.** 15.5 start cap, name `run_tests`, status `open`, count `1`; record shows `start 09:14:02.0` and `tool test-tool`. 15.8 request leaves; 16.7 tool runs; bar grows linearly with a bright open head. 21.8 result leaves the tool. | Bar amber and open; duration and outcome `…`. | 15.5 store G5 · 15.8 send C6 · 16.7 arrive E5 · 18.05/19.40/20.75 work E4 · 21.8 send E6 |
| 4 | 22.7–27.4 | **Result lands; span closes.** 22.7 end cap at 2.4 s, bar turns teal, status `closed`, call 2 pill teal. 23.7 `duration 2.4 s`. 24.5 `outcome returned`. Hold. | Closed span with fixed start and end. | 22.7 deliver C5 · 22.85 chime G5 (loudest) · 23.7 and 24.5 store G5 |
| 5 | 27.4–40.0 | **Read the record, compare the calls.** Runtime dims. 28.0 start cap + start row; 29.4 end cap + duration row; 30.8 outcome + tool rows. 32.8 call 1 pill flashes. 34.0 call 2 pill, bar and record glow together. Hold, 38.0–39.0 fade, black to 40.0. | Final state: two calls, one span. | 28.0/29.4/30.8 ack G5 · 32.8 soft thump · 34.0 arrive G5 · silent hold |

Stillness: the longest motionless stretches are the deliberate holds 24.5–27.4 and 34.6–38.0 s.

## Reproduce

From the repository root (uses the pinned `puppeteer-core` 25.14.0 from the root `node_modules`):

```
node video/observability-and-tracing/motion-v2/01/engine/render.mjs video/observability-and-tracing/motion-v2/01/scene.js video/observability-and-tracing/motion-v2/01/video.mp4 --sheet video/observability-and-tracing/motion-v2/01/scratch/contact-sheet.png
```

The cut-local engine copy adds general `pill`, `toggle`, `timeline`, `table` and `frame` node types, a `subSize` option and `busy` spinner on `box`, an `align` option on `label`, and a `size` option on chip packets. The shared skill is unchanged.

## Lesson text sync (coordinator)

`sequence/lessons.json` item 1 declares `duration: 28` and beats at 0/7/14/21. For this cut, suggested: duration 40.0 with beats at **0 / 15.5 / 22.7 / 27.4**. The first beat's text covers the uninstrumented call 1 and the switch; the takeaway text names it directly. This folder does not edit that file.
