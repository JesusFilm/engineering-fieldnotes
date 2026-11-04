# Lesson 02 — Finish a job — plan B

Independent plan for the motion-v2 cut of queues-and-backpressure lesson 02. Authored from the lesson entry in `video/queues-and-backpressure/sequence/lessons.json` (item 2) and the concept content in `content/concepts/queues-and-backpressure.json`. Earlier motion-v2 beat sheets were read only to vary the geometry. No other plan for this lesson, no production ledger, and no authoring source was consulted. This document names no authoring model.

## Scope

One mechanism: **job A moves through three distinct states — waiting, running, completed — and the transition to completed happens only after the worker's work has succeeded and its result is recorded; leaving the queue starts the work but does not finish it.**

The viewer should feel three things. A token for job A sits in a `waiting` state node, then moves to `running` when the worker takes it, and the `completed` node stays dark while the work runs. The worker's own step list (`run check`, `save result`, `mark complete`) shows that `mark complete` is the last step and is blocked until `save result` succeeds. Only then does the token move to `completed`, and the completion count goes from 0 to 1.

Grounding: lesson beats ("replay job A from its waiting state. No work has happened yet in this replay", "the worker takes job A. Execution starts after it arrives", "the worker executes the job. Leaving the wait queue did not finish it", "the work finishes successfully. Now the job can be marked complete"); intro ("follow one job from waiting to running to completed. A worker reports completion only after the work succeeds"); takeaway ("waiting, running and completed describe different states. Acknowledgement policy must match the effect being confirmed"); concept walkthrough ("task_done() records completion separately"; "manual acknowledgements identify handled deliveries… externally visible actions need an idempotency strategy") and pitfall ("acknowledging before recording a result can lose recoverable work"). Sources per the concept file, retrieved 2026-10-19: [Python asyncio queues](https://docs.python.org/3/library/asyncio-queue.html) and [RabbitMQ — Consumer acknowledgements and publisher confirms](https://www.rabbitmq.com/docs/confirms).

Out of scope (later lessons): more jobs and a backlog (03), bounded queues and waiting admission (04), rejection (05). Failure, retry, redelivery and idempotency are named in the accuracy limits only; this cut shows the success path. The producer is drawn small and passive; it was covered in lesson 01.

Grammar for this cut: **a three-node state machine across the upper stage (`waiting` → `running` → `completed`) with a single job-A token that moves along its arrows, and below it a worker panel with a numbered step list and a `completed: N` counter.** Lesson 01 showed where the job is (producer, queue, worker); here the state machine shows what state it is in, and the step list shows why the last transition waits. Every element is a software object: job states, transitions, a worker's steps, a saved result and a completion count. No traffic lights, finish lines or checkered flags.

Target length ≈ 42 s at speed 1 (`meta.speed: 1`). The running stretch must feel like work in progress (≈ 9 s); do not shorten it.

## Engine notes

Use `box` for the three state nodes, `s.wire` for the two transition arrows (with an arrowhead label `▸` if needed), a chip for the job token, `box` for the worker panel, `label` rows with an outline cursor for the step list, `bar` for `run check` progress, `label` for results and the counter. A small `queue` box above `waiting` and a `producer` label are context only. No new node type is expected. Use a cut-local engine copy with the repository-pinned Puppeteer.

## Stage and coordinates (1080 × 1920)

Palette follows `references/style.md`. Minimum on-screen text 40 px (≈ 13 px at 350 wide); names 44 px; monospace at 40 px ≈ 24 px per character. Content stays within x 40–1040 and y 480–1620.

| id | type | centre / bounds | text | notes |
|---|---|---|---|---|
| title | title band (540, 330) / (540, 405) | — | **Queues and backpressure** / FINISH A JOB | shorten title to **Queues** if it overflows |
| ctx | label | (540, 500), 40 px mono, mid | `job A · replay from waiting` | marks the replay |
| sWait | box | (180, 640), 280 × 130 (x 40–320, y 575–705) | label `waiting` 44 px; sublabel `in queue` 40 px mono | E5 |
| sRun | box | (540, 640), 280 × 130 (x 400–680) | label `running` 44 px; sublabel `at worker` | G5 |
| sDone | box | (900, 640), 280 × 130 (x 760–1040) | label `completed` 44 px; sublabel `recorded` | A5; dark (alpha 0.35) until beat 4 |
| arr1 | wire + label | (320, 640) → (400, 640) | `take` 40 px mono at (360, 600) | |
| arr2 | wire + label | (680, 640) → (760, 640) | `finish` 40 px mono at (720, 600) | dashed until beat 4 |
| token | chip | starts at (180, 690) inside sWait | `A` (≈ 72 px) | moves to (540, 690), then (900, 690) |
| wPanel | box | x 120–960, y 800–1380 | label `worker` 44 px at (240, 845); state `idle` → `working` → `done` 40 px mono at (820, 845) | G5 |
| step1 | row | y 950, text at x 160 | `1 run check`; bar x 520–900 at y 950; result `ok` at (930, 950) right-aligned | |
| step2 | row | y 1080 | `2 save result`; result `saved` | |
| step3 | row | y 1210 | `3 mark complete`; result `done` | dim until step2 succeeds |
| cursor | outline box | x 140–940, h 80, moves to each step | — | accent |
| counter | label | (540, 1470), 44 px mono | `completed: 0` → `completed: 1` | |
| result | label | (540, 1550), 40 px mono, mid | `result: —` → `result: 12 pages ok` | the recorded effect |

Check that `finish` and `take` labels sit above the arrows clear of the node labels, that the token chip fits inside nodes below their labels, and that step results right-align inside x 960.

## Sound map

Actor pitches: waiting/queue **E5**, worker **G5**, completion record **A5**. Pan centred; token moves pan left → right with x.

| event | preset | notes |
|---|---|---|
| replay start, token in waiting | `ack` E5 | |
| take | `send` E6, then `arrive` G5 | |
| step cursor moves | `ack` G6, quiet | |
| run check working | `work` G4 | every 0.6 s while the bar fills |
| check ok | `ack` G5 | |
| save result | `store` G5 | |
| finish transition | `send` G6, then `arrive` A5 | |
| counter 0 → 1 | `chime` A5 | the only chime, at completion |

No music.

## Beat sheet (speed 1)

| time | what moves | state change | sound |
|---|---|---|---|
| **Beat 1 — Replay job A from waiting; no work has happened yet (0–8.0)** | | | |
| 0.0–1.0 | ctx, state nodes, worker panel, counter fade in | token `A` in `waiting`; worker `idle`; steps dim; `completed: 0`; `result: —` | — |
| 1.8 | sWait and token pulse | | ack E5 |
| 2.8 | sRun and sDone pulse dim in turn; arr2 dashed | states not yet reached | — |
| 2.8–8.0 | hold | | |
| **Beat 2 — The worker takes job A; execution starts after it arrives (8.0–14.0)** | | | |
| 8.0–9.0 | token moves along arr1 to sRun; `take` pulses | | send E6 |
| 9.0 | sRun lights accent; sWait dims; worker `working` | | arrive G5 |
| 9.8 | cursor on step1 | | ack G6 (quiet) |
| 9.8–14.0 | step1 bar starts filling | | work G4 every 0.6 s |
| **Beat 3 — The worker executes the job; leaving the queue did not finish it (14.0–24.0)** | | | |
| 14.0–19.0 | step1 bar continues to full | | work G4 |
| 15.0 | sDone and `completed: 0` pulse dim | not finished | — |
| 19.0 | step1 result `ok` | | ack G5 |
| 19.8 | cursor on step2 | | ack G6 |
| 20.6 | step2 result `saved`; `result: 12 pages ok` | the effect is recorded | store G5 |
| 21.2 | step3 brightens from dim | now completion may be marked | — |
| 21.2–24.0 | hold | | |
| **Beat 4 — The work finishes successfully; now the job can be marked complete (24.0–42.0)** | | | |
| 24.0 | cursor on step3 | | ack G6 |
| 24.6 | step3 result `done`; arr2 turns solid; `finish` pulses | | — |
| 25.0–26.0 | token moves along arr2 to sDone | | send G6 |
| 26.0 | sDone lights ok; sRun dims; worker `done` | | arrive A5 |
| 26.6 | counter `completed: 1` | | chime A5 |
| 27.4 | `result`, step3 and sDone pulse in turn | completion confirms the recorded result | — |
| 28.2–40.4 | hold | final state | |
| 40.4–41.2 | `s.fade` to black, 0.8 s | finite ending | — |
| 42.0 | end | | |

## Accuracy limits

- `mark complete` stands for recording completion (`task_done()` in asyncio, or a manual acknowledgement in a broker). It follows `save result` here because the confirmed effect is the saved result; acknowledging earlier can lose recoverable work (concept pitfall).
- Acknowledging after the result is recorded still allows a duplicate if the worker fails between saving and acknowledging; externally visible effects need an idempotency strategy. Not shown.
- Failure paths (check fails, save fails, retry, redelivery) are not shown; this is the success path the lesson describes.
- `12 pages ok` is an illustrative result from the concept's documentation-check example. Durations are illustrative; no timing numbers appear.
- asyncio's `task_done()` is a counter for `join()`, not a durable record; durability is not claimed.

## Native 350 acceptance

These are requirements for the future render, not completed validation.

1. Decode actual frames (avoid relying only on a contact sheet) at 1080 and at 350 px wide around 1.9, 2.9, 6.0, 8.5, 9.1, 9.9, 12.0, 15.1, 18.8, 19.1, 19.9, 20.7, 21.3, 24.1, 24.7, 25.5, 26.1, 26.7, 27.5, 34.0 and 40.8 s. At 350 px, the context line, all three state labels and sublabels, `take`, `finish`, the token, `worker` and its state, all three step rows and results, the counter and the result line must be readable.
2. Distinct states: the token is in exactly one state node in every frame; `completed` stays dark until 26.0 s.
3. Order: step1 `ok` before step2 `saved` before step3 `done`; the token moves to `completed` only after step3 is `done`; the counter changes only after the token arrives.
4. Not finished by leaving the queue: from 9.0 to 26.0 s the token is in `running` and `completed: 0` is shown.
5. Scope: one job; no backlog, capacity, rejection, failure or retry appears.
6. Clearance: arrow labels clear node labels; the token stays inside nodes; step text and results fit the panel; nothing enters the title band.
7. Silent reading: with sound off and words ignored, a viewer sees a token in the left node move to the middle node while a list's first row fills a bar; the first two rows get results and the third brightens; the third gets a result, the dashed arrow becomes solid, the token moves to the right node and a number goes from 0 to 1.
8. Audio: the dry run lists `work` G4 ticks only during 9.8–19.0 s, one `store` G5 at 20.6 s, and exactly one `chime` at 26.6 s. Full-decode the encode, confirm an audio stream, peak below −0.5 dBFS and moov before mdat. Record whether audio was heard or only analysed.
9. After encoding run `python3 scripts/check_media.py --concept queues-and-backpressure`; a new encode needs renewed comparison review bound to its SHA-256.

## Production boundary

Only this anonymous plan is written. No render, scene source, public media, site, shared skill, Git commit or deployment. Later implementation uses the repository-pinned Puppeteer and a cut-local engine copy, with any drawing extension local to the cut.

