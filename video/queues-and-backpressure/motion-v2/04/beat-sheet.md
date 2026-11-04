# Lesson 04 beat sheet: A full queue pushes back

**Mechanism:** the queue has three waiting places, and all three are taken. Under this blocking admission policy, the producer's `await put(E)` waits at the producer, and its next job, F, is not created. The worker keeps running. A finishing does not free a place; the worker taking B does. Then E enters the free place: accepted, not complete.

**Example:** B, C, D fill the three places (`3 / 3 full`). The worker is `running A`. The producer holds E with the code line `await put(E)` and shows a dashed `F · not created`.

Times are playback seconds for the encoded `video.mp4` (authored and rendered at `meta.speed 1`). Duration 42.0 s, 1080×1920, 30 fps. Finite ending: the stage fades to black with C, D, E waiting, B running, and E `accepted` but `complete: not yet`.

## Chosen ideas

| Idea | From | Why |
|---|---|---|
| Producer panel with the blocked call `await put(E)` and its state `ready` → `waiting` → `accepted` | Both | The backpressure is a suspended software call, not a physical barrier |
| Next job `F · not created` (dashed) while E waits, then `next` after E is accepted | Plan B | Shows the pressure reaching upstream: the producer makes no more work |
| Exactly three outlined places with a `3 / 3 full` → `2 / 3` → `3 / 3 full` readout | Both | Makes the configured bound explicit. Lesson 03 had an open lane on purpose. |
| A finishes, then a hold with the queue still `3 / 3 full`, then the worker takes B | Plan A | Completion alone does not free a waiting place; the dequeue does |
| C and D shift forward and the tail place opens, dashed; E drops into it | Both | Preserves FIFO order and a single E identity, never a fourth queued job |
| Silence at the producer while it waits; the worker keeps ticking | Plan A | Pending is not failure. The ear hears the worker continue while the producer is held. |
| `job E record`: `accepted` checked, `complete: not yet` | Plan A (status strip), adapted to lesson 01's record card | Accepted ≠ completed, using the same object as lesson 01 |
| Top-to-bottom geometry: producer → bounded places → worker → record | Plan B | Differs from lesson 03's horizontal lane and chart |
| Not used: plan B's soft thump on blocking, its waiting clock ticks, and its `‖` link stub | — | A thump reads as failure, ticks would compete with the worker, and the glyph is cryptic. The amber dashed link and `waiting` carry the state. |
| Not used: place numbers, and plan A's footers (`Producer waits; worker continues`, `Accepted ≠ completed`) | — | Numbers sat on borders and in the jobs' path; footers are captions. The motion and record carry the meaning. |

## Teaching beats

| # | Time (s) | What moves | State change | Sound |
|---|---|---|---|---|
| 1 | 0.0–8.0 | **All three waiting places are full; E is still with the producer.** 2.0/2.6/3.2 places pulse in turn (B, C, D). 4.2 E glows in the producer. The worker bar fills throughout. Hold 5–8. | `3 / 3 full`; worker `running A`; producer `ready`; F `not created` | work G4 every 1.5 s, 1.2–19.2 · 2.0/2.6/3.2 ack E5 · 4.2 ack C5 |
| 2 | 8.0–20.0 | **Admission waits at the producer; E does not enter the full queue.** 8.0 `await put(E)` brightens. 8.9 the producer→queue link turns amber dashed, the readout flashes amber `3 / 3 full`, and the producer and E turn amber: `waiting` (slow pulse to 28 s). 11.2 `F · not created` pulses. Hold 12–20 while the worker keeps going. | E stays in the producer | 8.0 send C6 · 8.9 ack E4 (subdued, the queue says "full") · 11.2 ack C5 (quiet) · producer otherwise silent |
| 3 | 20.0–28.4 | **The worker finishes A, then takes B; one waiting place becomes free.** 20.0 A's bar turns green: `A done`. 21.0 A clears from the worker. Hold 21.5–23 with the queue still `3 / 3 full`. 23.0 B drops from the front place into the worker; at 23.45 the readout shows `2 / 3`. 24.2 `running B`, and a new bar starts. 25.0 C and D shift forward. 26.1 the tail place glows, dashed and empty. Hold 26.7–28.4. | One free place; E still `waiting` | 20.0 ack G5 · 21.0 ack G4 · 23.0 send E6 · 23.45 ack E5 · 24.2 arrive G5 · 25.0 ack E6 · 26.1 ack E5 · work G4 resumes every 1.5 s from 25.8 |
| 4 | 28.4–40.0 | **E can now enter the queue. It is accepted, not yet completed.** 28.4 the link turns solid, and E drops into the tail place (28.4–29.6). 29.6 `3 / 3 full` again. 30.3 the producer shows `accepted` (green). 31.2 the record's `accepted` gets a check. 32.4 F turns solid: `next`. 33.6 the record's `complete` lights with `not yet`. Hold 34–40. | Final: C, D, E waiting; B running; E accepted, not complete | 28.4 send C6 · 29.6 arrive E5 · 30.3 deliver C5 (loudest) · 31.2 store A5 · 32.4 ack C5 · 33.6 ack A4 |
| end | 40.0–42.0 | Stage fades to black over 1.0 s; the title stays. | — | silence |

Actor pitches: producer C, queue E, worker G, record A; sends an octave up.

## Reproduce

From the repository root:

```
node video/queues-and-backpressure/motion-v2/04/engine/render.mjs video/queues-and-backpressure/motion-v2/04/scene.js video/queues-and-backpressure/motion-v2/04/video.mp4 --sheet video/queues-and-backpressure/motion-v2/04/scratch/contact-sheet.png
```

Poster, from this folder: `ffmpeg -v error -y -ss 37.0 -i video.mp4 -frames:v 1 -q:v 2 poster.jpg`. Encoded inspection: `sh scratch/inspect.sh b`; verification record: `python3 scratch/verify.py`.

The local engine copy is cut 02's local copy (the `card` and `ticket` types from cut 01, plus `state`, `arrow`, and per-row bars from cut 02). It adds one option, a dashed outline on `ticket` for a job not yet created. Cuts 01–03 and the shared skill are unchanged.

## Lesson text sync

`sequence/lessons.json` item 4 declares `duration: 28` and beats at 0/7/14/21. For this cut, the coordinator should retime it to duration 42.0 with beats at **0 / 8.0 / 20.0 / 28.4**. This folder does not edit that file.
