# Lesson 05 beat sheet: Look at active work

**Mechanism:** least requests. The balancer keeps a count of unfinished requests for each server. When a new request arrives it compares the counts and sends the request to the server with fewer. A's long request stays on A, and only the new request goes to B. B's count rises when the request is assigned and falls when it finishes. A's count stays at 1 the whole time.

Times are playback seconds in `video.mp4` (authored at `meta.speed 1`). Duration 36.10 s. Finite ending: a silent hold with A still running, then the stage fades to black and the title band stays.

## Chosen ideas

| Idea | Source | Why |
|---|---|---|
| Balancer panel with `least requests` and an `active` table: rows `A` and `B` with count cells `1` and `0` | Both plans | The rule's only input is visible and named. |
| Compare step: A's count lights, then B's, then `fewer` pops beside B's `0` and a teal outline selects row B. The request waits in the balancer as `req 2 · lookup` throughout. | Plan B (`fewer`, wait beside table), Plan A (row outline) | The decision is shown before anything moves. |
| B's count goes 0 → 1 at assignment, before the request lands, and `fewer` clears first | Plan A (outstanding-request bookkeeping) | Matches how a balancer counts outstanding requests, and avoids a stale comparison. |
| Two horizontal server lanes (A above B), each with a status word, a slot and a progress line | Plan B | New geometry after lesson 04's tall columns, and no cost gauge, because the rule sees only counts. |
| B's route runs down a left gutter outside lane A. A's straight path stays unused. | Plan B | The request visibly never passes through A, and nothing travels between the lanes. |
| A's `req 1 · report` runs from the first frame and never finishes in the video. Quiet E4 ticks every 1.6 s. | Both plans (A continues; B's background tick) | The existing work persists, audibly too. |
| B's count drops to 0 on completion, with a soft balancer note | Plan A (acknowledgment) | Counts fall when work finishes. |
| `stays on A` with a check ripple on A's slot, then A `1` and B `0` light in turn | Plan B (`stays on A`), Plan A (persistent R1) | Answers the lesson's question in one label. |
| Pitches: app C, balancer D, A on E, B on G. `hit` G5 marks the decision, `chime` E5 marks `stays on A`. | Plan B | Each actor has its own pitch, and the decision has its own sound. |
| Not used: A's `0 < 1` cue (`fewer` does the same job), `Active = unfinished` and footer captions, responses, count-to-lane connector wires | — | Fewer words and wires, and the simultaneous pulses already pair counts with lanes. |

## Beats

| # | Time (s) | What moves | State change | Sound |
|---|---|---|---|---|
| 1 A has one, B none | 0.0–7.5 | Fade-in by 0.7. A's `req 1 · report` already running, progress creeping. 1.6 count A and lane A light together. 2.9 count B and lane B light together. | Counts 1 and 0, A `running`, B `idle`. | work E4 every 1.6 s (whole video) · 1.6 ack E5 · 2.9 ack G5 |
| 2 Compare counts | 7.5–13.25 | 7.5 ring from app. 8.1 `req 2 · lookup` waits in the balancer. 9.3 A's `1` outlined. 10.3 B's `0` outlined. 11.3 `fewer` beside B, teal outline on row B. | Decision made, nothing has moved yet. | 7.5 send C6 · 8.1 arrive D5 · 9.3 ack E5 · 10.3 ack G5 · 11.3 hit G5 |
| 3 New request to B | 13.25–20.7 | 13.25 `fewer` clears. 13.6 B count → 1 (assigned). 14.0–15.5 ring down the left gutter into lane B. 15.5 B `running`, slot `req 2 · lookup`, progress fills to 20.7. 16.5 both `1`s glow, outline clears. | Counts 1 and 1, two different requests. A unchanged. | 13.6 store G5 · 14.0 send G6 · 15.5 arrive G5 · work G4 every 0.6 s |
| 4 B finishes, A continues | 20.7–27.3 | 20.7 B `done`, slot `req 2 · done`. 21.3 B count → 0. 22.1 B `idle`. 23.3 A's `1` and slot glow. | Counts 1 and 0 again, A still running. | 20.7 ack G5 · 21.3 arrive D5 (soft) · 23.3 ack E5 |
| 5 New assignments only | 27.3–36.1 | 27.3 `stays on A` appears, check ripple at A's slot, lane A flashes teal. 29.1 A `1` then B `0` light. | Final: A running `req 1 · report`, B idle, counts 1 and 0. Hold 29.7–34.7, fade 34.7–35.5. | 27.3 chime E5 (quiet) · 29.1 ack E5 · 29.7 ack G5 |

Lesson-text sync for the coordinator (this folder does not edit `lessons.json`, which says 36 s): duration 36.1, beats at 0 / 7.5 / 13.25 / 20.7 / 27.3.

## Reproduce

From the repository root (pinned `puppeteer-core` 25.14.0 from the root `node_modules`, local Chrome, ffmpeg):

```
node video/load-balancing/motion-v2/05/engine/render.mjs video/load-balancing/motion-v2/05/scene.js video/load-balancing/motion-v2/05/video.mp4 --sheet video/load-balancing/motion-v2/05/scratch/contact-sheet.png
```

Local engine (`engine/flow-engine.js`, shared skill untouched): a copy of lesson 04's cut-local engine (general nodes from lessons 01–03), copied without editing that lesson, plus one addition: a `meta.titleSize` option, so the full title "Look at active work" fits at 86 px. `sfx.js`, `render.mjs` and `preview.html` are unchanged.

## Accuracy limits

Two equal-weight candidates are compared directly. Envoy's equal-weight least-request policy samples candidates rather than necessarily scanning every host. An active count says how many requests are unfinished, not how much work they hold. Counts can misrepresent capacity (other clients, fast errors, other balancer instances). The cut avoids a tie at decision time and teaches no tie rule. Already-running work is never moved. Durations are illustrative, no timing numbers appear, and responses are omitted.
