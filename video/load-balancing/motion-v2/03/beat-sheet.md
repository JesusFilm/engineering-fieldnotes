# Lesson 03 beat sheet: Take turns

**Mechanism:** the load balancer keeps a `next` position over two eligible, equally weighted servers. Each request goes to the server at `next`, and `next` moves to the other server right after every pick, so the picks run A, B, A, B. Both servers are idle again before every pick, so the turn decides the choice, not which server happens to be free.

Times are playback seconds in `video.mp4` (authored at `meta.speed 1`). Duration 45.75 s. Finite ending: a silent hold, then the stage fades to black and the title band stays.

## Chosen ideas

| Idea | Source | Why |
|---|---|---|
| Balancer drawn as a panel with its rule (`round robin`) and an endpoint list: rows `A eligible weight 1` and `B eligible weight 1` | Plan A | A software selector whose premises (eligible, equal weight) stay visible the whole time. Different geometry from lessons 01 and 02. |
| Amber `next` outline and tag on the selected row, handed to the other row 0.5 s after the request leaves | Both plans (A's row outline, B's "advance right after the pick") | The rule has state, and that state changes only on a pick. |
| Incoming request shown as a `req N` pill in the balancer header, then as `req N` in the chosen server's slot | Plan A (IDs attached), new pill placement | Request identity stays readable without small chip text. |
| Two diagonal paths from the balancer to A and to B; only the chosen path lights | Plan A (paths shown only when selected) and B's two ports | Each request visibly takes exactly one path. |
| Servers work briefly (`req N` → `done` → `idle`) and both are idle before every pick | Plan A | Separates "whose turn" from "who is free", without reaching lesson 04's busy-server case. |
| `picks` log of four dashed cells that fill `1 → A`, `2 → B`, `3 → A` | Plan B (log), A (immutable history) | Turns the rule into a sequence the viewer can predict. |
| req 4 waits at the balancer for 2.6 s while cell 4 reads `4 → ?` (amber), and `next` glows on B | Plan B | The lesson's question, answered by the visible rule state before the request moves. |
| Cells light in order with E–G–E–G | Plan B | The pattern can be seen and heard. |
| Pitches: app C (send C6), balancer D (arrive D5, `next` hand-off ack D6), A on E (send E6, arrive E5, work E4, done E5, log store E5), B on G | Plan B pitches, A's "selector cue plus server note" | Every pick sounds the same balancer cue, then the chosen server's note. |
| Not used: responses (B), `Assigned A` subtitle (A), final pulse on `weight 1` (B) | — | Responses would add a second flow that doesn't teach the rule. The lit path and `req N` slot already show the assignment. |

## Beats

| # | Time (s) | What moves | State change | Sound |
|---|---|---|---|---|
| 1 Balancer and rule | 0.0–5.4 | Fade-in by 0.7. 1.2 balancer pulses, `round robin` lights. 2.3 both rows' `eligible` and `weight 1` light together. 3.4 `next` outline pops onto row A. | Both servers `idle`, empty picks. Hold 3.4–5.4. | 1.2 arrive D5 · 2.3 ack E5 + G5 · 3.4 ack D6 |
| 2 req 1 → A | 5.4–13.4 | 5.4–6.2 ring app → balancer, `req 1` pill appears. 6.9 row A and outline flash, path A lights, ring travels 6.9–7.9. 7.4 `next` hands off to B. 7.9 server A `req 1`, progress fills. 8.15 cell 1 `1 → A`. 9.9 `done`, 10.8 `idle`. | Hold 10.8–13.4: both idle, `next` on B. | 5.4 send C6 · 6.2 arrive D5 · 6.9 send E6 · 7.4 ack D6 · 7.9 arrive E5 · 8.15 store E5 · 8.4/9.0/9.6 work E4 · 9.9 ack E5 |
| 3 req 2 → B | 13.4–21.4 | Same cycle toward B. `next` back to A at 15.4. Cell 2 `2 → B` at 16.15. | Hold 18.8–21.4: both idle, `next` on A. | Same cues with G (send G6, arrive G5, work G4, store G5, ack G5) |
| 4 req 3 → A | 21.4–29.4 | Same cycle toward A. `next` to B at 23.4. Cell 3 `3 → A` at 24.15. | Hold 26.8–29.4 on `1 → A · 2 → B · 3 → A` with `next` on B. | As beat 2 |
| 5 The rule repeats | 29.4–45.75 | 29.4–30.2 req 4 arrives and is held (`req 4` pill). 30.6 cell 4 `4 → ?` (amber), 31.6 `next` on B glows. 33.2 leaves to B, 33.7 `next` to A, 34.2 B `req 4`, 34.45 cell 4 `4 → B`, 36.2 `done`, 37.1 `idle`. 37.7–39.35 cells light in order. | Final: `1 → A · 2 → B · 3 → A · 4 → B`, `next` on A, both idle. Silent hold 39.4–44.35, fade 44.35–45.15. | 29.4 send C6 · 30.2 arrive D5 · 30.6 ack C4 · 33.2 send G6 · 33.7 ack D6 · 34.2 arrive G5 · 34.45 store G5 · work G4 ×3 · 36.2 ack G5 · 37.7/38.25/38.8/39.35 ack E5, G5, E5, G5 |

Lesson-text sync for the coordinator (this folder does not edit `lessons.json`, which says 36 s): duration 45.75, beats at 0 / 5.4 / 13.4 / 21.4 / 29.4.

## Reproduce

From the repository root (pinned `puppeteer-core` 25.14.0 from the root `node_modules`, local Chrome, ffmpeg):

```
node video/load-balancing/motion-v2/03/engine/render.mjs video/load-balancing/motion-v2/03/scene.js video/load-balancing/motion-v2/03/video.mp4 --sheet video/load-balancing/motion-v2/03/scratch/contact-sheet.png
```

Local engine (`engine/flow-engine.js`, shared skill untouched): a copy of lesson 02's cut-local engine (lesson 01's `panel`, `text`, `pill`, `step`, `field`, `arrow`, `ring` packet, `meta.subtitleSize`; lesson 02's `span`, `cursor`, `band`, `dash`), copied without editing either lesson. It adds a `panel` `noFill`/`lw` option and generic animated `ox`/`oy` node offsets. The offsets are unused in the final scene. `sfx.js`, `render.mjs` and `preview.html` are unchanged.

## Accuracy limits

This is an equal-weight, two-server example with both servers eligible throughout. Different weights change the frequency, and changing membership changes the sequence. Starting at A is arbitrary. Each balancer instance keeps its own position. Requests are routed individually; connection-level balancing, responses, load measurement and timing numbers are out of scope. Every server is idle before its next turn, so the cut makes no claim about busy servers. The balancer selects; the servers do the work.
