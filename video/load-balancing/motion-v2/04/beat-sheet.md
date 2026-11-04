# Lesson 04 beat sheet: Unequal work

**Mechanism:** round robin counts turns, not work. A gets a slow report and B a quick lookup. B finishes and goes idle while A is still busy, and both show `assigned 1`. The next turn is still A, so req 3 waits in A's wait slot until the report finishes, then starts there. B stays idle the whole time.

Times are playback seconds in `video.mp4` (authored at `meta.speed 1`). Duration 47.65 s. Finite ending: a silent hold, then the stage fades to black and the title band stays.

## Chosen ideas

| Idea | Source | Why |
|---|---|---|
| Compact rule strip, `round robin  next [A] [B]`, with the next cell filled amber. It advances on every assignment and never on completion. | Plan B (strip), both (advance rule) | Keeps lesson 03's rule visible but small, so the servers are the subject. |
| App bar with the request it is about to send (`req 1 · report`, `req 2 · lookup`, `req 3 · lookup`) | Plan A (request ID plus operation) | Request identity and size class read before routing. |
| Two server columns, each with `assigned N`, a `run` slot, a dashed `wait` slot and a `work left` bar | Plan A (workboard: assigned, running, waiting), Plan B (work-left gauge) | The count and the remaining work sit on the same board, so the viewer compares them directly. |
| `work left` bars drain at the same rate on both servers: the report fills A's bar and lasts about 24 s, the lookup is a fifth of that | Plan B | The report looks slow because it is bigger, not because A is slower. |
| `assigned` never decreases on finish | Plan A | The count records choices made, not running work. |
| req 3 travels down the gap between the columns into A's wait slot, never through A's busy run slot or near B | Plan A | No path suggests B, and the waiting position is unambiguous. |
| Waiting uses a dashed outline and a soft E4 arrival, with no failure styling and no thump | Plan A (B proposed a thump) | Waiting is normal behaviour here, not an error. |
| One `req 3` label moves from wait to run when A frees up, and the wait slot returns to `—` | Plan A | A single identity, never shown twice. |
| Pitches: app C (store C5, send C6), rule D (arrive D5, next ack D6), A on E (arrive E5, store E5 on count, work E4 every 0.8 s, done E5), B on G | Plan B pitches, both cue lists | A's long job is heard as a long run of E4 ticks while B is silent. |
| Not used: responses (B), captions such as `Equal counts ≠ equal work` (A), the final pulse on empty bar tracks (B) | — | The pulsing counters and bars carry the comparison without paragraph text. |

## Beats

| # | Time (s) | What moves | State change | Sound |
|---|---|---|---|---|
| 1 Some requests take longer | 0.0–5.0 | Fade-in by 0.7. 1.2 both columns pulse. 2.4 both `run` slots light (one slot each). 3.4 `next A` glows. | Both `idle`, `assigned 0`, empty bars. | 1.2 ack E5 + G5 · 2.4 work E4 + G4 · 3.4 ack D6 |
| 2 A gets a slow report | 5.0–11.0 | 5.0 app shows `req 1 · report`. 5.9 ring into the rule, 6.35 cell A glows, 6.85 ring down path A, 7.25 `next` → B. 7.65 A: `assigned 1`, run `req 1 report`, bar fills to full and drains to 32.25. | A busy, B idle. | 5.0 store C5 · 5.9 send C6 · 6.35 arrive D5 · 6.85 send E6 · 7.25 ack D6 · 7.65 store E5 + arrive E5 · work E4 every 0.8 s, 8.7–31.9 |
| 3 B gets a quick lookup | 11.0–20.85 | Same dispatch to B. 13.25 `next` → A. 13.65 B: `assigned 1`, run `req 2 lookup`, bar fills to a fifth. 19.05 B `done`, 19.95 `idle`. | A's bar about two-thirds full while B's has emptied. | 11.0 store C5 · 11.9 send C6 · 12.35 arrive D5 · 12.85 send G6 · 13.25 ack D6 · 13.65 store G5 + arrive G5 · work G4, 14.7–18.7 · 19.05 ack G5 |
| 4 B ready while A busy | 20.85–25.45 | 20.85 both `assigned 1` counters flash together. 22.45 A's bar glows. 22.95 B's empty run slot lights. | Equal counts, different work left. | 20.85 ack E5 + G5 · 22.95 ack G4 |
| 5 Round robin picks A; req 3 waits | 25.45–32.25 | 25.45 app shows `req 3 · lookup`. 26.8 cell A (still next) glows. 27.3–28.7 ring down the gap into A's wait slot. 27.7 `next` → B. 28.7 A `assigned 2`, wait `req 3` (white dashed). 30.1 B's empty run slot lights again. | req 3 waits on A, A runs req 1, B idle with `assigned 1`. | 25.45 store C5 · 26.35 send C6 · 26.8 arrive D5 · 27.3 send E6 · 27.7 ack D6 · 28.7 store E5 + arrive E4 (soft) · 30.1 ack G4 |
| 6 A finishes; req 3 starts there | 32.25–47.65 | 32.25 A's bar reaches zero, run `done`. 33.05 run clears. 33.25–34.05 `req 3` moves from wait to run, and the wait slot returns to `—`. 34.05 run `req 3 lookup`, bar to a fifth, drains to 39.45 (`done`), 40.35 `idle`. 41.25 `assigned 2` then `assigned 1` flash. | Final: both idle, counts 2 and 1, `next B`. Silent hold 41.75–46.25, fade 46.25–47.05. | 32.25 ack E5 · 33.25 send E6 · 34.05 arrive E5 · work E4 · 39.45 ack E5 · 41.25 ack E5 · 41.75 ack G5 |

Lesson-text sync for the coordinator (this folder does not edit `lessons.json`, which says 38 s): duration 47.65, beats at 0 / 5.0 / 11.0 / 20.85 / 25.45 / 32.25.

## Reproduce

From the repository root (pinned `puppeteer-core` 25.14.0 from the root `node_modules`, local Chrome, ffmpeg):

```
node video/load-balancing/motion-v2/04/engine/render.mjs video/load-balancing/motion-v2/04/scene.js video/load-balancing/motion-v2/04/video.mp4 --sheet video/load-balancing/motion-v2/04/scratch/contact-sheet.png
```

Local engine (`engine/flow-engine.js`, shared skill untouched): an unmodified copy of lesson 03's cut-local engine (byte-identical, same SHA-256). It has lesson 01's `panel`, `text`, `pill`, `step`, `field`, `arrow` and `ring` packet, lesson 02's `span`, `cursor`, `band` and `dash`, and lesson 03's panel `noFill` and `ox`/`oy` offsets. No new engine code. `sfx.js`, `render.mjs` and `preview.html` are unchanged.

## Accuracy limits

One running request per server and a one-request local wait slot are the lesson's simplification. Other implementations reject, queue elsewhere, or run several requests at once. Both servers stay eligible and equally weighted, and being busy does not make A ineligible. `work left` is drawn for the viewer; the balancer has no such meter, and request cost is rarely known in advance. Durations are illustrative pacing, not measurements. req 3 is not moved, retried or duplicated. No fix or load-aware rule is shown, and responses are omitted.
