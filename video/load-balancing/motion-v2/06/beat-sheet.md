# Lesson 06 beat sheet: Avoid a failed server

**Mechanism:** the balancer learns that A has failed only from a health check. A breaks just after a passing check, but its record still reads `eligible` until the next periodic probe gets no reply within its timeout. Only then is A marked `unavailable` and left out of new choices. The next request goes to B, and its response returns through the balancer.

Times are playback seconds in `video.mp4` (authored at `meta.speed 1`). Duration 38.70 s. Finite ending: a silent hold, then the stage fades to black and the title band stays.

## Chosen ideas

| Idea | Source | Why |
|---|---|---|
| Balancer table with the column header `last check` and status pills `eligible` / `unavailable` | Plan A (`Last observed state`), Plan B (table) | Says plainly that the record is an observation, so it can be out of date. |
| Health-check timeline inside the balancer: a track per server, a moving `now` cursor, a green dot for each passing check | Plan B | "Periodic", "timeout" and "detection delay" become positions on a line. Lessons 01–05 didn't use this geometry. |
| Unanswered probe: A's dot reaches A and fades. A hollow ring marks the check, a `timeout` bar fills, then it turns red and the ring becomes a red × | Plan B (timeout bar on track), Plan A (deadline wait, no fake reply) | The wait is visible, and nothing looks like a reply. |
| A's actual state (`no response`, red, small shake) changes 9.4 s before its record does | Both plans | The gap between failure and detection is the lesson's answer. |
| Record changes after the timeout as a separate step (`unavailable` 0.8 s later), then A's link turns dashed and dim | Plan A (observation, then policy update), Plan B (dashed link) | Separates "the probe failed" from "the rule excludes A". |
| A's server card stays on screen | Plan A | Exclusion changes routing, not whether the server exists. |
| App status `idle` → `waiting` → `received`; the response pauses at the balancer before going up | Plan A | Shows a full round trip through the proxy, with no shortcut from B to the app. |
| Probes are small dots with no text, and passing replies are teal. Requests are hollow rings, responses solid teal dots. | Both plans | Health traffic stays visually separate from application traffic. |
| Pitches: app C, balancer D (probes send D6, arrivals D5), A on E (reply E5), B on G. Crash on failure, four clock ticks that speed up during the timeout, a thump at timeout, a soft poof on exclusion. | Plan B | The healthy round sounds D6 → E5 and D6 → G5, and the missing E5 reply is audible as silence. |
| Not used: `Failure threshold: 1` caption (A), `skipped` label (B), footer captions (A) | — | The dashed link and the row highlight already show the exclusion. The threshold is noted in the accuracy limits. |

## Beats

| # | Time (s) | What moves | State change | Sound |
|---|---|---|---|---|
| 1 A stops responding | 0.0–15.0 | Fade-in by 0.7, `now` cursor starts moving. 3.0 and 9.0 probe rounds: dots to both servers and back, green dots at those positions on both tracks. 10.4 A turns red and shakes with an × ripple, `no response`. 11.6 A's `eligible` pill pulses, unchanged. | Both `eligible` in the record throughout. | 3.0 send D6 ×2 · 4.2 ack E5 + G5 · 9.0 send D6 ×2 · 10.2 ack E5 + G5 · 10.4 crash · 11.6 ack D5 (soft) |
| 2 Health probe | 15.0–15.6 | 15.0 dots go to both servers. B's reply returns (green dot at 16.2). A's dot reaches A and fades: a hollow amber ring, `timeout` label, and the timeout bar starts at 15.6. | No reply from A. | 15.0 send D6 ×2 · 16.2 ack G5 |
| 3 Probe times out | 15.6–19.8 | Bar fills to the cursor, which stops at 19.0. 19.0 bar and label turn red, the ring becomes a red ×. | Timed out, A still `eligible` for 0.8 s more. | clock at 16.4, 17.4, 18.2, 18.75 · 19.0 thump |
| 4 A excluded | 19.8–23.0 | 19.8 A's pill → `unavailable` (red). 20.4 link A turns dashed and dim. | A out of new selection, actual A still broken. | 19.8 poof (soft) |
| 5 New request to B | 23.0–28.4 | 23.0 app `waiting`, ring app → balancer. 24.1 row B highlights (only eligible). 24.6 ring down link B. 25.4 B `working`. | Nothing travels on link A. | 23.0 send C6 · 23.6 arrive D5 · 24.6 send D6 · 25.4 arrive G5 · work G4 ×3 |
| 6 Response through balancer | 28.4–38.7 | 28.4 B `ready`, dot up link B. 29.2 balancer flashes, pause. 29.7 dot up to app. 30.3 app `received`. 31.3 A's `unavailable`, the red × and B pulse in turn. | Final: A excluded and still broken, B ready, app received. Hold 31.3–37.3, fade 37.3–38.1. | 28.4 send G6 · 29.2 arrive D5 · 30.3 deliver C5 · 31.3 chime G5 (quiet) |

Lesson-text sync for the coordinator (this folder does not edit `lessons.json`, which says 38 s): duration 38.7, beats at 0 / 15.0 / 15.6 / 19.8 / 23.0 / 28.4. The lesson's own beat 1 runs 0–6 s and the probe comes at 6 s, but this cut needs two passing checks before the failure, so the probe comes at 15 s.

## Reproduce

From the repository root (pinned `puppeteer-core` 25.14.0 from the root `node_modules`, local Chrome, ffmpeg):

```
node video/load-balancing/motion-v2/06/engine/render.mjs video/load-balancing/motion-v2/06/scene.js video/load-balancing/motion-v2/06/video.mp4 --sheet video/load-balancing/motion-v2/06/scratch/contact-sheet.png
```

Local engine (`engine/flow-engine.js`, shared skill untouched): a copy of lesson 05's cut-local engine (general nodes from lessons 01–05, including `meta.titleSize`), copied without editing that lesson. It adds a general `dot` node (solid, hollow, or crossed event mark). `sfx.js`, `render.mjs` and `preview.html` are unchanged.

## Accuracy limits

One missed probe marks A unavailable here. Real checkers usually need several consecutive failures, and several successes to restore a server. The probe interval and timeout are illustrative pacing, not defaults, and no timing numbers appear. The balancer observes only "no reply before the timeout", not the cause. No request is sent during the detection gap; anything sent then would still go to A and could fail, and health checks don't rescue it. B's health is shown by passing probes, which don't guarantee future success. The response returns through the balancer, as with a proxy. Recovery, draining, retries, passive outlier detection and fail-open behaviour are out of scope.
