# Lesson 05 beat sheet: Choose an overload policy

**Mechanism:** a bounded queue needs an explicit rule for what happens when it is full. Under a reject policy, `submit(F)` on a full queue returns `rejected` right away. F is not admitted, and the queued jobs and the worker are unchanged. The producer records and reports the outcome instead of treating the submission as a success.

**Example:** continuing lesson 04's end state: C, D, E fill the three places (`3 / 3 full`), the worker is `running B`, and F is the producer's next job. The producer's outcome log already holds `E accepted`.

Times are playback seconds for the encoded `video.mp4` (authored and rendered at `meta.speed 1`). Duration 38.0 s, 1080×1920, 30 fps. Finite ending: the stage fades to black with F rejected and reported, and C, D, E, B unchanged.

## Chosen ideas

| Idea | From | Why |
|---|---|---|
| Producer and queue side by side with a short call path and a separate return path | Plan B | The submission is a function call that returns a value. The geometry differs from lessons 01–04's pipelines. |
| The queue's `when full:` setting shown as `wait · reject · drop` with `reject` selected | Plan B | The policy is a visible configuration chosen beforehand. Only `reject` plays. |
| A request marker that stops at the queue edge; places checked in turn; none frees | Both | Submission intent is not admission, and the count never becomes four |
| Red return marker, then a `rejected` result with `queue full` that stays in the producer | Plan A (return marker and receipt), plan B (result object) | An explicit negative result, not a pending wait or a silent loss |
| Outcome log: `E accepted` (from lesson 04), `F rejected · not admitted`, `F reported to caller` | Plan B, with plan A's `not admitted` | The producer handles the result and exposes it beside an earlier success |
| Job F rather than a new G or E | Adapted from both | Lesson 04 ended with F as the producer's `next` job |
| Low `miss` and `deliver` C4 for the rejection; no crash, chime, or shake | Plan B (sound), plan A (no failure theatrics) | A clear result, not a system failure |
| Not used: plan A's footer `Rejection is an outcome` and `Attempt ended` / `Execution: not started` lines | — | Captions and extra status. The log row `not admitted` and the unchanged queue carry it. |
| Not used: plan B's `got rejected` state name | — | Became `got result` to avoid repeating the result chip |

## Teaching beats

| # | Time (s) | What moves | State change | Sound |
|---|---|---|---|---|
| 1 | 0.0–9.0 | **The queue is full again; this policy rejects new submissions.** 1.8/2.4/3.0 places pulse (C, D, E). 4.2 `when full:` and `wait · reject · drop` fade in; 4.7 the `reject` outline lights. 6.2 the log row `E accepted` outlines. Hold 7–9. | `3 / 3 full`; worker `running B`; producer `ready`; F dashed (not yet made) | work G4 every 1.6 s throughout (quiet) · 1.8/2.4/3.0 ack E5 · 4.7 ack E6 · 6.2 ack C5 |
| 2 | 9.0–16.0 | **The producer asks to submit F; no waiting place is available.** 9.0 F turns solid, `submit(F)` brightens, state `calling…`. 9.8 a call dot crosses to the queue's edge (9.8–10.6). 10.8/11.2/11.6 places are checked in turn. 12.3 the readout and queue flash amber, and `reject` glows. Hold 13–16. | F stays in the producer; C, D, E unchanged | 9.0 store C5 · 9.8 send C6 · 10.8/11.2/11.6 ack E4 · 12.3 ack E6 |
| 3 | 16.0–25.2 | **The queue reports rejection; the producer must handle the result.** 16.0 a red dot returns along the lower path (16.0–16.9). 16.9 a red `rejected` result pops into the producer, with `queue full` below; state `got result`; F dims. Hold 17.5–21. 21.0 log `F rejected · not admitted`. 22.5 log `F reported to caller`; state `reported`. Hold 23–25. | Explicit negative result, recorded and reported | 16.0 miss · 16.9 deliver C4 (loudest) · 21.0 store C5 · 22.5 store D5 |
| 4 | 25.2–36.0 | **The rejected job was not admitted. Make the overload policy explicit.** 25.2 the three places and C, D, E pulse: still the same. 26.6 then 27.2 the log rows `E accepted` and `F rejected` outline in turn. 28.4 `reject` glows, then `wait` (29.0) and `drop` (29.4) brighten briefly. Hold 30–36. | Final: queue unchanged, F rejected and reported, B running | 25.2 ack E5 · 26.6 ack C5 · 27.2 ack C4 · 28.4 ack E6 · 29.0/29.4 ack E5 (quiet) |
| end | 36.0–38.0 | Stage fades to black over 1.0 s; the title stays. | — | silence |

Actor pitches: producer C, queue E, worker G; producer panned left, queue and worker right.

## Reproduce

From the repository root:

```
node video/queues-and-backpressure/motion-v2/05/engine/render.mjs video/queues-and-backpressure/motion-v2/05/scene.js video/queues-and-backpressure/motion-v2/05/video.mp4 --sheet video/queues-and-backpressure/motion-v2/05/scratch/contact-sheet.png
```

Poster, from this folder: `ffmpeg -v error -y -ss 33.0 -i video.mp4 -frames:v 1 -q:v 2 poster.jpg`. Encoded inspection: `sh scratch/inspect.sh a`; verification record: `python3 scratch/verify.py`.

The local engine copy is cut 04's local copy, unchanged (`card` and `ticket` from cut 01, `state`, `arrow`, and per-row bars from cut 02, dashed `ticket` from cut 04). Cuts 01–04 and the shared skill are unchanged.

## Lesson text sync

`sequence/lessons.json` item 5 declares `duration: 28` and beats at 0/7/14/21. For this cut, the coordinator should retime it to duration 38.0 with beats at **0 / 9.0 / 16.0 / 25.2**. This folder does not edit that file.
