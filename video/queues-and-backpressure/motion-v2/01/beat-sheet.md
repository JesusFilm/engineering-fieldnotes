# Lesson 01 beat sheet: Submit a job

**Mechanism:** submitting a job, the queue accepting it, a worker taking it, and the worker running it are separate events. None of them is completion.

**Example:** one job ticket, `job A: check docs`. It is the only movable object, and its position always answers "where is the job?". The `job A record` card answers "what has happened to it?".

Times are playback seconds for the encoded `video.mp4` (authored and rendered at `meta.speed 1`). Duration 35.6 s, 1080×1920, 30 fps. Finite ending: the stage fades to black and stays there.

## Chosen ideas

| Idea | From | Why |
|---|---|---|
| Scope ends at running, with `complete` reading `not yet` | Plan B | Lesson 02 ("Finish a job") owns completion. Plan A's completion beat and `Accepted ≠ complete` footer are excluded. |
| Producer panel at the top, queue pane, worker pane, and a separate status card below | Plan A (layout), Plan B (card rows) | Position and recorded state stay separate, so acceptance is visible long before execution. |
| Job identity carries its payload (`check docs`) | Plan A | A concrete job, not an abstract dot |
| Separate `created / accepted / running / complete` rows that light only on their own event | Plan B | The lesson is a sequence of distinct events |
| Producer's own view of the call: `submit: —` → `sending…` → `accepted` | Plan B | The producer gets its answer while nothing has run |
| Worker `ready` before the take, and a deliberate gap between take and start | Plan A | Shows that taking the job and running it are two events, with the queue already empty |
| Queue drawn as a lane with direction chevrons, a `waiting N` count, and `empty` | Both, adapted | A software list with a front. It has no slots or numbers, so it makes no capacity claim (bounds belong to lesson 04). |
| Partial progress bar that never fills; no chime anywhere | Plan B | Nothing completes |
| Not used: plan B's three unnumbered slots and its "where" mirror line | — | Slots suggest capacity, and the ticket's position already shows location |
| Not used: plan A's two work-phase labels (`Read docs`, `Check links`) | — | Extra text with no new event; the bar and `running` carry execution |

Layout rule: the ticket's path runs down from the producer, along the lane to its front, and down into the worker. Status text sits outside that path (producer status in its title row, queue label below the lane, worker lamp beside its title), so the moving ticket never crosses words.

## Teaching beats

| # | Time (s) | What moves | State change | Sound |
|---|---|---|---|---|
| 1 | 0.0–7.5 | **A producer creates a job; there is a queue and a worker.** 1.0 the ticket pops into the producer, which glows. 2.3 the record lights and `created` gets a check. 4.0 the empty lane flashes. 5.1 the worker's empty job slot flashes. | Queue `waiting 0` / `empty`; worker `idle` with a grey lamp; other record rows `—` | 1.0 store C5 (producer) · 2.3 store A5 (record) · 4.0 ack E5 (queue) · 5.1 ack G5 (worker) |
| 2 | 7.5–16.0 | **Job A enters the queue and is accepted.** 7.5 producer shows `submit: sending…`; the ticket drops down the wire. 8.7 it lands in the lane (queue glows, `waiting 1`) and slides to the front. 10.6 producer turns green: `submit: accepted`. 11.6 record `accepted` gets a check. Hold 12.5–16.0. | Accepted while waiting; worker still `idle`; `running` and `complete` still `—` | 7.5 send C6 · 8.7 arrive E5 · 10.6 deliver C5 · 11.6 store A5 |
| 3 | 16.0–22.0 | **A worker takes job A; it leaves the waiting queue.** 16.0 worker lamp turns white, `ready`. 17.2 the ticket drops from the lane's front into the worker. 17.7 `waiting 0`, and `empty` returns. 18.4 the ticket fills the worker slot: `has job A`. Hold 19–22. | Queue empty while the job sits at the worker, not yet running | 16.0 ack G5 · 17.2 send E6 · 18.4 arrive G5 |
| 4 | 22.0–33.6 | **Execution happens at the worker; accepted is different from complete.** 22.0 the worker, lamp, and ticket turn amber: `running`; the bar starts to fill slowly. 22.8 record `running` reads `in progress` in amber. 25.6 the producer's green `accepted` glows again. 26.8 record `complete` lights with `not yet` and gives a small jolt. Hold 27.5–33.6 while the bar creeps to about 40%. | Final state: `accepted` at the producer, running at the worker, `complete: not yet` | 22.0 arrive G4 · 22.8 store A5 · 24–32 work G4 every 1 s (quiet) · 25.6 ack C5 · 26.8 thump C4 (the loudest cue) |
| end | 33.6–35.6 | Stage fades to black over 1.0 s; the title stays. | — | silence |

Actor pitches: producer C, queue E, worker G, record A5; sends an octave up. Pan follows x.

## Reproduce

From the repository root:

```
node video/queues-and-backpressure/motion-v2/01/engine/render.mjs video/queues-and-backpressure/motion-v2/01/scene.js video/queues-and-backpressure/motion-v2/01/video.mp4 --sheet video/queues-and-backpressure/motion-v2/01/scratch/contact-sheet.png
```

Poster, from this folder: `ffmpeg -v error -y -ss 30.0 -i video.mp4 -frames:v 1 -q:v 2 poster.jpg`. Encoded inspection: `sh scratch/inspect.sh b`; verification record: `python3 scratch/verify.py`.

The local engine copy adds two general node types, `card` (adapted from the harness-engineering motion-v2/01 local copy, plus a title tag, inner lane with chevrons, left lamp, and highlight colour) and `ticket` (a persistent pill with animated position). It also adds a left-align option to `label` and adjustable subtitle size. The shared skill is unchanged.

## Lesson text sync

`sequence/lessons.json` item 1 declares `duration: 28` and beats at 0/7/14/21. For this cut, the coordinator should retime it to duration 35.6 with beats at **0 / 7.5 / 16.0 / 22.0**. This folder does not edit that file.
