# Lesson 02 beat sheet: Finish a job

**Mechanism:** job A moves from `waiting` to `running` to `completed`. Leaving the queue starts the work. The job is marked complete only after the work succeeds and its result is saved.

**Example:** a replay of `job A` (the docs check from lesson 01), starting in `waiting`. The worker runs three steps: `1 run check`, `2 save result` (`result: 0 broken links`), and `3 mark complete`. The `job A record` row `complete: not yet` carries over from lesson 01's final state and turns into a check only after step 3.

Times are playback seconds for the encoded `video.mp4` (authored and rendered at `meta.speed 1`). Duration 38.0 s, 1080×1920, 30 fps. Finite ending: the stage fades to black.

## Chosen ideas

| Idea | From | Why |
|---|---|---|
| State diagram: three circular states joined by `take` and `finish` transition arrows, with a single `job A` token that sits inside exactly one state | Plan B | Shows what state the job is in. The geometry differs from lesson 01's location panels and fits the mechanism. |
| Worker step list in which `mark complete` is step 3, dim until `save result` succeeds | Plan B | Shows *why* the last transition waits, without words |
| `finish` arrow dashed until the job is recorded complete, then solid | Plan B | The transition is unavailable until success |
| A hold after success with completion not yet recorded (job still `running`, record `not yet`) | Plan A | Success must exist before the report |
| Completion report travels from the worker to the record before the state changes | Plan A | Recording completion is a separate step after success |
| Concrete fixture result `0 broken links` | Plan A (link check), adapted | Ties the saved effect to lesson 01's `check docs` job |
| Replay marker `replay: job A from waiting` that fades when the job is taken | Both | The lesson says this is a replay; no work has happened yet |
| One chime, only at completion | Plan B | Completion is the only success sound |
| Not used: plan A's three link squares, its footer `Finish work, then report`, and its closing recap highlights | — | Extra words and motion. The step list and final state already carry the order. |
| Not used: plan B's `completed: N` counter and `12 pages ok` | — | A count suggests many jobs, which belongs to lesson 03. The record row keeps the continuity from lesson 01. |

## Teaching beats

| # | Time (s) | What moves | State change | Sound |
|---|---|---|---|---|
| 1 | 0.0–8.0 | **Replay job A from waiting; no work has happened yet.** 1.2 the token pops into `waiting`, which lights. 3.2 the worker (`idle`, empty step bar) pulses. 4.6 the record row `complete: not yet` outlines. Hold 5.5–8.0. | `running` and `completed` dark; `finish` dashed | 1.2 ack E5 (queue / waiting) · 3.2 ack G5 (worker) · 4.6 ack A5 (record) |
| 2 | 8.0–14.6 | **The worker takes job A; execution starts after it arrives.** 8.0 the `take` arrow glows and the token slides into `running` (8.0–9.2). 9.2 `running` turns amber, the worker shows `working`, and the replay marker fades. 10.4 the cursor lands on `1 run check`; from 10.8 its bar fills slowly. | Waiting is empty; job is running; completed still dark | 8.0 send E6 · 9.2 arrive G5 · 10.4 ack G6 · work G4 every 0.85 s, 11.2–18.8 |
| 3 | 14.6–24.8 | **The worker executes the job; leaving the queue did not finish it.** 14.6 `completed` and the record's `not yet` flash together. 19.0 step 1's bar turns green: `ok`. 19.9 cursor on `2 save result`. 20.8 `saved`, and `result: 0 broken links` appears. 21.6 `3 mark complete` brightens from dim. Hold 22–24.8. | Success exists and is saved; job still `running`; record `not yet` | 14.6 ack A4 (soft) · 19.0 ack G5 · 19.9 ack G6 · 20.8 store G5 · 21.6 ack D6 (quiet) |
| 4 | 24.8–36.0 | **The work finished successfully; now the job can be marked complete.** 24.8 cursor on `3 mark complete`. 25.4 a green report dot travels from the worker to the record. 26.5 the record shows `complete` with a check, and step 3 shows `done`. 27.4 `finish` turns solid and the token slides into `completed` (27.4–28.6). 28.6 `completed` turns green and the worker shows `done`. Hold 29.5–36.0. | Final: completed, recorded, result saved | 24.8 ack G6 · 25.4 send A6 · 26.5 store A5 · 27.4 send G6 · 28.6 chime A5 (loudest, only chime) |
| end | 36.0–38.0 | Stage fades to black over 1.0 s; the title stays. | — | silence |

Actor pitches: waiting/queue E, worker G, record/completed A; sends an octave up. Pan follows x.

## Reproduce

From the repository root:

```
node video/queues-and-backpressure/motion-v2/02/engine/render.mjs video/queues-and-backpressure/motion-v2/02/scene.js video/queues-and-backpressure/motion-v2/02/video.mp4 --sheet video/queues-and-backpressure/motion-v2/02/scratch/contact-sheet.png
```

Poster, from this folder: `ffmpeg -v error -y -ss 32.0 -i video.mp4 -frames:v 1 -q:v 2 poster.jpg`. Encoded inspection: `sh scratch/inspect.sh a`; verification record: `python3 scratch/verify.py`.

The local engine copy starts from cut 01's local copy (the `card` and `ticket` node types, left-aligned `label`, subtitle size). It adds two general node types, `state` (circular state node with label and sublabel) and `arrow` (transition with head, label, and dashed/solid style), plus an optional progress bar on each `card` row. Cut 01's files and the shared skill are unchanged.

## Lesson text sync

`sequence/lessons.json` item 2 declares `duration: 28` and beats at 0/7/14/21. For this cut, the coordinator should retime it to duration 38.0 with beats at **0 / 8.0 / 14.6 / 24.8**. This folder does not edit that file.
