# Lesson 01 — Submit a job — plan B

Independent plan for the motion-v2 cut of queues-and-backpressure lesson 01. Authored from the lesson entry in `video/queues-and-backpressure/sequence/lessons.json` (item 1) and the concept content in `content/concepts/queues-and-backpressure.json`. Earlier motion-v2 beat sheets from other chapters were read only to vary the geometry. No other plan for this lesson, no production ledger, and no authoring source was consulted. This document names no authoring model.

## Scope

One mechanism: **a producer creates job A and submits it; the queue accepts it and holds it until a worker is ready; the worker takes A out of the queue and starts executing it. Each of those is a separate event, and none of them is completion.**

The viewer should feel three things. The producer gets its answer (`accepted`) the moment A enters the queue, while nothing has run yet. A leaves the waiting queue when the worker takes it, so the queue empties while the work has only just begun. Job A's status card fills `created`, `accepted`, `running` in turn while its `complete` field stays empty to the end.

Grounding: lesson beats ("a producer creates a job. A queue holds it until a worker is ready", "job A enters the queue. The job has been accepted", "a worker takes job A. It leaves the waiting queue", "execution happens at the worker. Accepted is different from complete"); intro ("submission and completion are different events"); takeaway ("accepted means the job entered the queue; it does not mean the requested work has finished"); concept overview ("a producer submits jobs; consumers execute them. Queues separate arrival from execution") and example ("admission … is not completion: expose queued, running and completed outcomes separately"). Sources per the concept file, retrieved 2026-10-19: [Python asyncio queues](https://docs.python.org/3/library/asyncio-queue.html) (`put`, `get` and `task_done` as separate steps) and [RabbitMQ — Consumer acknowledgements and publisher confirms](https://www.rabbitmq.com/docs/confirms) (broker acceptance is not successful execution).

Out of scope (later lessons): the work finishing and the job being marked complete (02); more jobs and a growing backlog (03); a bounded, full queue and waiting admission (04); rejection and overload policy (05). The queue is drawn without a capacity number. Acknowledgements, durability and retries are not shown.

Grammar for this cut: **a left-to-right pipeline at the top (producer → queue lane → worker), with job A drawn as a small labelled ticket that physically moves between them, and below it a large status card for job A whose four rows light only when the matching event happens.** The ticket's position answers "where is the job?"; the status card answers "what has happened to it?". Every element is a software object: a producer, a job, a queue, a worker and a job record. No post office, restaurant ticket rail or conveyor-belt metaphors.

Target length ≈ 40 s at speed 1 (`meta.speed: 1`). The final `running` hold with an empty `complete` field is the lesson; keep it unhurried.

## Engine notes

Use `box` for producer and worker, a `box` outline with three dim slot outlines for the queue lane (slots have no numbers or capacity label), a chip for job A, a `store` (4 rows) for the status card, `label` for the producer's result line and the worker's state, `s.wire` for the two hand-offs, and a `bar` inside the worker for work progress (it advances partway and never completes). No new node type is expected. Use a cut-local engine copy with the repository-pinned Puppeteer.

## Stage and coordinates (1080 × 1920)

Palette follows `references/style.md`. Minimum on-screen text 40 px (≈ 13 px at 350 wide); names 44–48 px; monospace at 40 px ≈ 24 px per character. Content stays within x 40–1040 and y 520–1560.

| id | type | centre / bounds | text | notes |
|---|---|---|---|---|
| title | title band (540, 330) / (540, 405) | — | **Queues and backpressure** / SUBMIT A JOB | shorten title to **Queues** if it overflows |
| prod | box | (170, 660), 260 × 150 (x 40–300, y 585–735) | label `producer` 44 px | C5 |
| prodRes | label | (170, 790), 40 px mono | `—` → `submitting…` (mid) → `accepted` (ok) | the producer's view of the submit call |
| queue | outline box | x 340–740, y 600–720 | label `queue` 44 px at (540, 560) | E5 |
| slots | dim outlines | three 110 × 80 at x 400 / 540 / 680, y 660 | — | waiting places, unnumbered |
| worker | box | (910, 660), 260 × 150 (x 780–1040) | label `worker` 44 px; progress bar inside at y 715, x 810–1010 | G5 |
| wState | label | (910, 790), 40 px mono | `ready` → `running A` (accent) | |
| hand1 | wire | (300, 660) → (340, 660) | — | submit |
| hand2 | wire | (740, 660) → (780, 660) | — | take |
| jobA | chip | starts inside prod at (170, 660) | `job A` (≈ 120 px) | moves prod → queue slot (680) → worker |
| card | store, `rows: 4`, w 760 | (540, 1180), x 160–920, y ≈ 990–1370; row centres ≈ 1037, 1132, 1227, 1322 | label `job A` 48 px at (540, 950); rows 40 px mono: `created   ✓` · `accepted  ✓` · `running   ✓` · `complete  —` | each row starts dim with `—` and lights when its event happens; `complete` stays dim |
| where | label | (540, 1460), 40 px mono, mid | `in producer` → `waiting in queue` → `at worker` | the ticket's location, mirrored |

The chip enters the queue at the right-most slot (x 680), the front, so taking it is a short move into the worker. Check that `job A` (≈ 120 px) fits a slot (110 px wide plus padding: widen slots to 130 px if needed) and that `submitting…` (≈ 312 px) stays inside x 20–320 under the producer.

## Sound map

Actor pitches: producer **C5**, queue **E5**, worker **G5**. Status-card rows use **A5** (the job record). Pan by x: producer left (≈ −0.6), queue centre, worker right (≈ +0.6).

| event | preset | notes |
|---|---|---|
| job created | `store` C5 | |
| submit sent | `send` C6 | |
| enters queue | `arrive` E5 | |
| producer told `accepted` | `deliver` C5 | |
| status row lights | `store` A5 | one per row |
| worker takes A | `send` E6, then `arrive` G5 | |
| working | `work` G4 | every 0.8 s from the start of execution to the end |
| empty `complete` row pulses | `ack` C4, quiet | |

No chime anywhere: nothing has completed.

## Beat sheet (speed 1)

| time | what moves | state change | sound |
|---|---|---|---|
| **Beat 1 — A producer creates a job; a queue holds jobs until a worker is ready (0–8.0)** | | | |
| 0.0–1.0 | producer, queue, worker, empty card fade in | all card rows `—`; worker `ready` | — |
| 1.8 | jobA appears inside producer with a white ripple; card row0 `created ✓`; where `in producer` | | store C5, store A5 |
| 3.0 | queue slots pulse dim in turn | places to wait | ack E5 |
| 3.8 | worker pulses | a place to execute | ack G5 |
| 3.8–8.0 | hold | | |
| **Beat 2 — Job A enters the queue; it has been accepted (8.0–16.0)** | | | |
| 8.0 | prodRes `submitting…` | | — |
| 8.4–9.6 | jobA moves prod → hand1 → slot at x 680 | | send C6 |
| 9.6 | ripple in the slot; slot outline lights | | arrive E5 |
| 10.2 | prodRes `accepted` (ok); card row1 `accepted ✓`; where `waiting in queue` | the producer has its answer | deliver C5, store A5 |
| 11.0 | card rows 2 and 3 pulse dim (`—`) | nothing has run | — |
| 11.0–16.0 | hold | accepted, waiting | |
| **Beat 3 — A worker takes job A; it leaves the waiting queue (16.0–22.0)** | | | |
| 16.0 | worker `ready` pulses | | — |
| 16.4–17.4 | jobA moves slot → hand2 → worker | | send E6 |
| 17.4 | ripple at worker; the slot goes dark; where `at worker` | the queue is empty again | arrive G5 |
| 18.0 | queue slots pulse dim | A is no longer waiting | — |
| 18.0–22.0 | hold | | |
| **Beat 4 — Execution happens at the worker; accepted is different from complete (22.0–40.0)** | | | |
| 22.0 | wState `running A`; card row2 `running ✓`; progress bar starts | | store A5 |
| 22.0–37.6 | progress bar advances slowly to ≈ 45 %, never completes | | work G4 every 0.8 s |
| 24.0 | prodRes `accepted` and card row3 `complete —` pulse in turn | the producer's answer was not completion | ack C4 (quiet) |
| 25.0–37.6 | hold | final state: `accepted` at the producer, A running, `complete —` | |
| 37.6–38.4 | `s.fade` to black, 0.8 s | finite ending; the work is still running | — |
| 40.0 | end | | |

## Accuracy limits

- `accepted` stands for the queue admitting the job (for example asyncio's `put` returning, or a broker's publisher confirm). It says nothing about whether the work will succeed.
- The worker taking A corresponds to `get` (or a broker delivery). Recording completion is a separate step (`task_done`, or an acknowledgement after the work), shown in lesson 02.
- In a broker, a delivered but unacknowledged message is not simply gone; it can be redelivered if the consumer fails. The cut shows the job leaving the waiting queue, as the lesson does, without claiming it can never return.
- The queue has three drawn places but no stated capacity; bounds and full queues are lessons 03–05.
- The progress bar is a teaching view; real workers rarely report progress. Durations are illustrative; no timing numbers appear.

## Native 350 acceptance

These are requirements for the future render, not completed validation.

1. Decode actual frames (avoid relying only on a contact sheet) at 1080 and at 350 px wide around 1.9, 3.1, 3.9, 6.0, 8.2, 9.0, 9.7, 10.3, 11.1, 14.0, 16.2, 16.9, 17.5, 18.1, 20.0, 22.1, 24.1, 30.0 and 37.9 s. At 350 px, `producer`, `queue`, `worker`, `job A`, the producer's result line, the worker state, the card title, all four card rows and the location line must be readable.
2. Accepted before execution: `accepted` appears at the producer while A is in the queue and the worker reads `ready`; `running` lights only after A reaches the worker.
3. Leaving the queue: from 17.4 s no job is in any queue slot.
4. Not complete: the `complete` row reads `—` in every frame; the progress bar never fills; no chime or `done` appears.
5. One job: no second job, backlog, capacity number, rejection or retry appears.
6. Clearance: the chip stays inside slots and never overlaps the queue label; `submitting…` stays under the producer; nothing enters the title band; no stray chip during holds.
7. Silent reading: with sound off and words ignored, a viewer sees a ticket appear in the left box and a card row light; the ticket moves into the middle lane, a word appears under the left box and a second row lights; the ticket moves into the right box and the middle lane empties; a third row lights and a bar starts filling slowly; the fourth row stays dark to the end.
8. Audio: the dry run lists one `deliver` C5 at 10.2 s, three `store` A5 card rows, `work` G4 ticks from 22.0 s to the end, and no chime. Full-decode the encode, confirm an audio stream, peak below −0.5 dBFS and moov before mdat. Record whether audio was heard or only analysed.
9. After encoding run `python3 scripts/check_media.py --concept queues-and-backpressure`; a new encode needs renewed comparison review bound to its SHA-256.

## Production boundary

Only this anonymous plan is written. No render, scene source, public media, site, shared skill, Git commit or deployment. Later implementation uses the repository-pinned Puppeteer and a cut-local engine copy, with any drawing extension local to the cut.

