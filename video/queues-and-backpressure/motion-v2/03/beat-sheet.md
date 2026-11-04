# Lesson 03 beat sheet: A backlog grows

**Mechanism:** one worker is busy with job A. Jobs B, C, and D arrive faster than it finishes anything, so each waits behind the last and the backlog grows. The queue holds the extra jobs but adds no execution capacity.

**Example:** a new scenario with one worker already `running A` (a slow bar that reaches about 30% by the end). B, C, and D arrive about 8 s apart and line up front to back: B at the front, beside the worker, then C, then D at the back. A never finishes in this window.

Times are playback seconds for the encoded `video.mp4` (authored and rendered at `meta.speed 1`). Duration 39.6 s, 1080×1920, 30 fps. Finite ending: the stage fades to black with B, C, and D still waiting and A still running.

## Chosen ideas

| Idea | From | Why |
|---|---|---|
| Horizontal producer → open queue lane → one worker, with `back` and `front` marked; new jobs join at the back | Plan B | The line visibly grows back toward the producer. The geometry differs from lesson 01's vertical panels and lesson 02's state diagram. |
| `waiting over time` step chart whose rises line up with each arrival and are labelled B, C, D | Plan B | Turns the same motion into a monitoring view of depth; the climb is the lesson |
| Counters `arrived` / `waiting` / `completed` | Both, adapted | `completed 0` beside a climbing `arrived` shows arrivals exceeding completions. `arrived` counts A, so arrived = waiting + running + completed (4 = 3 + 1 + 0). |
| Jobs appear only when admitted; no empty slots, no capacity number, no `Full` | Plan A | Bounds belong to lesson 04 |
| Worker stays the same size and state throughout; no job moves toward it | Both | A queue adds no execution capacity |
| Rising `store` pitch for each new waiting job (E5, F#5, G#5) | Plan B | The climb is audible |
| Steady, sparse worker ticks (every 2 s) | Plan B (pace), plan A (no endless ticking) | The ear hears arrivals outpace slow work without constant noise |
| Not used: plan A's footer `Waiting grows · worker stays busy` and plan B's `arrived 4 · completed 0` gap note and soft thump | — | The counters already show the gap; a thump could read as failure, and nothing fails here |

## Teaching beats

| # | Time (s) | What moves | State change | Sound |
|---|---|---|---|---|
| 1 | 0.0–7.0 | **New scenario: the worker is running A.** The bar creeps from 1.0 s on, and the chart's "now" dot starts moving along 0. 1.6 the worker and `running A` pulse. 3.2 the empty lane flashes. Hold 4–7. | `arrived 1`, `waiting 0`, `completed 0` | work G4 every 2 s from 1.0 · 1.6 arrive G5 (worker) · 3.2 ack E5 (queue) |
| 2 | 7.0–15.0 | **B waits behind the running job.** 7.0 `B` pops into the producer. 7.8–9.0 it travels to the front of the lane. 9.0 it lands; `arrived 2` and `waiting 1` change together, and the chart rises to 1 under `B`. 10.6 `front` and B pulse. 11.1 the worker pulses, still on A. Hold 11.8–15. | The worker has not taken B | 7.0 store C5 (producer) · 7.8 send C6 · 9.0 arrive E5 · 9.25 store E5 · 10.6 ack E6 · 11.1 ack G5 |
| 3 | 15.0–23.0 | **C arrives before A finishes and joins B.** 15.0 `C` appears. 15.8–17.0 it travels to the place behind B. 17.0 `arrived 3`, `waiting 2`, chart rises to 2 under `C`. 18.6 the worker glows; A's bar is still short. Hold 19.5–23. | Two waiting, A unfinished | 15.0 store C5 · 15.8 send C6 · 17.0 arrive E5 · 17.25 store F#5 · 18.6 ack G5 |
| 4 | 23.0–37.6 | **D arrives too. The backlog grows; arrivals exceed completions.** 23.0 `D` appears. 23.8–25.0 it travels to the back. 25.0 `arrived 4`, `waiting 3`, chart rises to 3 under `D`. 26.8 `completed 0` pops. 28.2, 28.6, 29.0 the waiting line pulses back to front (D, C, B). 29.6 `waiting` highlights. Hold 30–37.6 while the chart runs flat at 3. | Final: B, C, D waiting; A running; 4 arrived, 0 completed | 23.0 store C5 · 23.8 send C6 · 25.0 arrive E5 · 25.25 store G#5 · 26.8 ack G4 · 28.2/28.6/29.0 ack E5 |
| end | 37.6–39.6 | Stage fades to black over 1.0 s; the title stays. | — | silence |

Actor pitches: producer C, queue E, worker G; sends an octave up. Pan follows x.

## Reproduce

From the repository root:

```
node video/queues-and-backpressure/motion-v2/03/engine/render.mjs video/queues-and-backpressure/motion-v2/03/scene.js video/queues-and-backpressure/motion-v2/03/video.mp4 --sheet video/queues-and-backpressure/motion-v2/03/scratch/contact-sheet.png
```

Poster, from this folder: `ffmpeg -v error -y -ss 33.0 -i video.mp4 -frames:v 1 -q:v 2 poster.jpg`. Encoded inspection: `sh scratch/inspect.sh b`; verification record: `python3 scratch/verify.py`.

The local engine copy starts from cut 01's local copy (the `card` and `ticket` node types, left-aligned `label`, subtitle size). It adds one general node type, `stepchart`: a count over time with axis, ticks, a moving "now" head, labelled rises, and a pulse on each rise. Cut 01's files and the shared skill are unchanged.

## Lesson text sync

`sequence/lessons.json` item 3 declares `duration: 28` and beats at 0/7/14/21. For this cut, the coordinator should retime it to duration 39.6 with beats at **0 / 7.0 / 15.0 / 23.0**. This folder does not edit that file.
