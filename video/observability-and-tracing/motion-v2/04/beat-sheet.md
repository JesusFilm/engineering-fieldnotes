# Lesson 04 beat sheet: Visibility is not a speedup

**Mechanism:** in an illustrative sequential run, the model call takes 0.6 s and the tool call 2.4 s, so the agent task takes 3.0 s. Without propagated context the tool span is recorded in a separate trace, and 2.4 s of the agent's own trace has no child to explain it. In the next run, with context sent, the same 2.4 s span sits under the agent task, and the task still takes 3.0 s.

Times are playback seconds for `video.mp4` (speed 1). Duration 43.00 s, finite ending. Each run plays at half speed (3.0 s of run time over 6 s); both runs use the same rate and the same 0–3 s scale (196 px per second, bars start at x 360).

## Neutral choices from plans A and B

| Idea | Source | Why |
|---|---|---|
| Two stacked trace waterfalls on one shared time scale, one per run | B | Lengths are directly comparable; the second run is visibly a new run with a new trace ID |
| Run 1: tool span in its own boxed trace (`trace 91d0`), starting at that trace's zero | B | The span exists and was exported, just not under the agent; separate traces have their own timelines |
| Run 1: dashed empty slot with `?` under the agent, and the agent's 0.6–3.0 s stretch greyed | B | The unexplained time is a visible gap, not a missing bar |
| Parent elbow in the left gutter, reaching the tool row only in run 2 | A | Linkage is shown as a recorded relationship |
| Durations inside wide bars in dark text, beside narrow bars | A | Labels never squeezed into the 0.6 s bar |
| Bars grow live and are labelled only when they close | A | Durations are measurements, not predictions |
| 3.0 s guide segments at the same x through both agent bar ends, paired totals and tool-width pulses | B | Same total, same tool time |
| No red failure styling; the work completes both times | A | Run 1 is a visibility problem, not an error |
| Sound: agent C, model E, tool G; one chime when the tool joins the agent's trace; identical paired acks for the comparisons | B | Same note = same value |
| Not used: A's comparison rows and footer `Time now attributable`, B's separate 0.6 s guide | — | Caption-like text; the elbow and aligned bars already show it |
| Excluded | — | No header mechanics (lesson 03), no sampling or missing spans (05), no optimisation of the tool |

## Beats

| # | Time (s) | What moves | State change | Sound |
|---|---|---|---|---|
| 1 | 0.0–12.0 | **Run 1.** 1.5 agent and model bars start growing. 2.7 model closes `0.6 s`; a separate `trace 91d0` box appears and its `tool call` bar grows from its own zero. 7.5 tool closes `2.4 s`; 7.75 agent closes `3.0 s`. 8.4 / 9.0 / 9.6 the three bars glow in turn. | 0.6 + 2.4 = 3.0, but the tool sits in another trace. | 1.5 arrive C5 + E5 · 2.7 store E5 · work G4 ×5 · 7.5 store G5 · 7.75 store C5 · 8.4/9.0/9.6 ack E5, G5, C5 |
| 2 | 12.0–19.5 | **The gap.** 12.0 dashed slot with `?` under the agent. 13.0 the agent's 0.6–3.0 s stretch greys. 14.2 `trace 7c1e` then `trace 91d0` and its box flash. Hold. | 2.4 s of the agent's trace is unexplained; two different trace IDs. | 12.0 miss · 13.0 ack C4 · 14.2 soft thump |
| 3 | 19.5–31.5 | **Run 2, context sent.** 19.5 a second panel `run 2 · context sent`, `trace 4bf9`. 21.0 bars grow at the same rate. 22.2 model closes; the elbow reaches a `tool call` row under the agent and the tool bar grows there. 27.0 tool closes `2.4 s`; 27.25 agent closes `3.0 s`. 27.95 `no separate trace`. Hold. | Same span, now under the agent task. | 19.5 ack C6 · 21.0 arrive C5 + E5 · 22.2 store E5 · 22.3 chime G5 (only chime) · work G4 ×5 · 27.0 store G5 · 27.25 store C5 · 27.95 ack C5 |
| 4 | 31.5–41.0 | **Same time.** 31.5 yellow guides at 3.0 s through both agent bar ends; agent bars glow in turn. 33.2 run 1's and run 2's tool bars glow in turn (same width). 34.9 run 1's `?` slot, then run 2's tool bar, flash. Hold. | Visibility changed; time did not. | 31.5 + 31.85 ack C5 (identical) · 33.2 + 33.55 ack G5 (identical) · 34.9 ack G4, 35.5 ack G5 · silent hold |
| end | 41.0–43.0 | Fade to black. | — | — |

## Reproduce

From the repository root (pinned `puppeteer-core` 25.14.0 from the root `node_modules`):

```
node video/observability-and-tracing/motion-v2/04/engine/render.mjs video/observability-and-tracing/motion-v2/04/scene.js video/observability-and-tracing/motion-v2/04/video.mp4 --sheet video/observability-and-tracing/motion-v2/04/scratch/contact-sheet.png
```

The cut-local engine copy adds general `frame`, `spanbar` (time-scaled bar with inside/outside duration label and a grey overlay stretch) and `slot` (dashed empty row with centred text) node types, and an `align` option on `label`. The shared skill is unchanged.

## Lesson text sync (coordinator)

`sequence/lessons.json` item 4 declares `duration: 28` and beats at 0/7/14/21. For this cut, suggested: duration 43.0 with beats at **0 / 12.0 / 19.5 / 31.5**. This folder does not edit that file.
