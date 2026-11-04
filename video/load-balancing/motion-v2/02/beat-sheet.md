# Lesson 02 beat sheet: Share the work

**Mechanism:** two servers run the same profile service, and each has one work slot. While A is busy with req 1, req 2 starts on B, so two separate requests run at the same time. Each one still takes its own full processing time: on the timeline, the two bars overlap but have the same length.

Times are playback seconds in `video.mp4` (authored at `meta.speed 1`). Duration 37.70 s. Finite ending: a silent hold, then the stage fades to black and the title band stays.

## Chosen ideas

| Idea | Source | Why |
|---|---|---|
| App on top, two identical server cards side by side, one slot each | Both plans | The single slot makes "finite capacity" concrete, and matching `profile service` lines show the servers run the same service. |
| App as a request list: each row starts as an empty dashed slot, then shows `req N waiting`, then `done` on its own schedule | Plan A (rows), dashed-slot styling from lesson 01 | Each request waits and finishes on its own, and the app reads `done` only when the response arrives. |
| Separate down (request) and up (response) lane for each server, never crossing | Plan A | Keeps lesson 01's direction grammar, and identities never swap. |
| Timeline with an A row and a B row. Bars grow at a moving playhead while each slot is busy. | Plan B | Overlapping bars show "at the same time" without a single number. |
| A dashed copy of bar 1 drops onto row B and slides onto bar 2, matching exactly | New, combining B's equal bars with A's "neither speeds up" claim | Gives a motion answer to "does it get faster?" |
| Shaded `same time` band over the overlap | Plan B | Names the span where two requests were working at once. |
| `working` counter: 0 → 1 → 2 → 1 → 0 | New, neutral; stands in for A's `2 requests working` caption | One number that changes state, readable at 350 px. |
| Closing `req 3` with dashed options to both servers and a `?` | Plan B | Shows the lesson's own takeaway, "someone still needs to choose a server", without any routing rule. The request does not move. |
| Pitches: app C (store C5 creates a request, send C6, deliver C5), A on E (ack, arrive E5, work E4, send E6), B on G (G5, G4, G6). Work ticks every 0.8 s, with B offset by 0.4 s. | Plan B pitches; A's sparse cue list | The overlap is audible as two alternating tick pitches. |
| Not used: A's elapsed-seconds counters and `Chosen: A/B` annotations, B's overlap-band fade to 30 % | — | Numbers would read as measurements, and `Chosen` anticipates the selection lesson. Equal bar lengths carry the same claim. |

## Beats

| # | Time (s) | What moves | State change | Sound |
|---|---|---|---|---|
| 1 Same service | 0.0–5.6 | Fade-in by 0.7. A pulses at 1.2, B at 2.1. At 3.1 both `profile service` lines and both slots light together. | Both slots `free`, working 0, empty timeline, two empty app rows. Hold 3.1–5.6. | 1.2 ack E5 · 2.1 ack G5 · 3.1 ack E5 + G5 |
| 2 req 1 on A | 5.6–10.0 | 5.6 row 1 shows `req 1 waiting`. 6.6–7.8 hollow ring down A's request lane. 7.8 ripple, A glows, slot shows `req 1` (amber), progress line starts. The playhead appears, and bar 1 grows on row A. | working 1. B stays `free`. | 5.6 store C5 · 6.6 send C6 · 7.8 arrive E5 · work E4 every 0.8 s from 8.6 |
| 3 req 2 on B while A works | 10.0–16.2 | 10.0 row 2 shows `req 2 waiting`. 11.0–12.2 ring down B's lane. 12.2 B slot shows `req 2`, bar 2 grows. | working 2. Both slots busy, and both bars grow at the same rate, 12.2–16.2. | 10.0 store C5 · 11.0 send C6 · 12.2 arrive G5 · work G4 from 13.0 (alternating with E4) |
| 4 Finish independently | 16.2–23.7 | 16.2 A done: slot, bar and card teal. 16.7–17.9 filled dot up A's response lane, A slot `free`. 17.9 row 1 `done`. B keeps working. 20.6 B done. 21.1–22.3 dot up B's lane. 22.3 row 2 `done`. The playhead fades. | working 1 at 16.2, 0 at 20.6. | 16.2 ack E5 · 16.7 send E6 · 17.9 deliver C5 · 20.6 ack G5 · 21.1 send G6 · 22.3 deliver C5 |
| 5 Separate capacity | 23.7–37.7 | 23.7 dashed outline appears around bar 1. 24.3 it drops to row B, 25.3 it slides right, and 26.2 it matches bar 2 exactly, which glows. 28.2 the `same time` band shades the overlap. 30.8 `req 3` pops in below the app, dashed options draw to both servers, and `?` appears at 31.7. | Final: both done, both servers free, equal bars, shaded overlap, unanswered `req 3 ?`. Silent hold 31.7–36.3, fade 36.3–37.1. | 23.7 ack E5 · 26.2 ack G5 · 28.2 chime C5 (only chime) · 30.8 store C5 · 31.7 ack C4 |

Lesson-text sync for the coordinator (this folder does not edit `lessons.json`, which says 34 s): duration 37.7, beats at 0 / 5.6 / 10.0 / 16.2 / 23.7.

## Reproduce

From the repository root (pinned `puppeteer-core` 25.14.0 from the root `node_modules`, local Chrome, ffmpeg):

```
node video/load-balancing/motion-v2/02/engine/render.mjs video/load-balancing/motion-v2/02/scene.js video/load-balancing/motion-v2/02/video.mp4 --sheet video/load-balancing/motion-v2/02/scratch/contact-sheet.png
```

Local engine (`engine/flow-engine.js`, shared skill untouched): it starts from lesson 01's cut-local general nodes (`panel`, `text`, `pill`, `step`, `field`, `arrow`, `ring` packet, `meta.subtitleSize`), copied without editing lesson 01. It adds `span` (bar on a track with clipped label, ghost outline, dx/dy offsets), `cursor` (playhead), `band` (shaded span with dashed edges) and `dash` (drawn dashed option line). `sfx.js`, `render.mjs` and `preview.html` are unchanged.

## Accuracy limits

One slot per server is the lesson's stated simplification. Real servers usually handle several requests at once. Both requests take the same illustrative time, and real requests vary. Capacity grows only for independent requests with no shared bottleneck, which is not drawn. Routes are given rather than chosen; `req 3 ?` only raises the selection question. No timing numbers appear, and the timeline shows order and overlap rather than measured latency.
