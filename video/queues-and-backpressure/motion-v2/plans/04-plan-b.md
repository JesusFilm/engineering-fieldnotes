# Lesson 04 — A full queue pushes back — plan B

Independent plan for the motion-v2 cut of queues-and-backpressure lesson 04. Authored from the lesson entry in `video/queues-and-backpressure/sequence/lessons.json` (item 4) and the concept content in `content/concepts/queues-and-backpressure.json`. Earlier motion-v2 beat sheets were read only to vary the geometry. No other plan for this lesson, no production ledger, and no authoring source was consulted. This document names no authoring model.

## Scope

One mechanism: **the queue has three waiting places and all three are taken; under a blocking admission policy, the producer's submission of E waits at the producer, so the producer also stops creating more work; when the worker finishes A and takes B, one place frees, E enters the queue and is accepted, but it is not yet complete.**

The viewer should feel three things. E sits in the producer with an `await put(E)` line marked `waiting`, beside a full queue reading `3 / 3`, and E never enters while the queue is full. The pressure travels upstream: the producer's next job, `F`, stays greyed as `not created` while E waits. The release happens only after work completes downstream: A done, B moves into the worker, a place opens, and then E drops in with `accepted` while its `complete` field stays empty.

Grounding: lesson beats ("all three waiting places are full. E is still with the producer", "admission waits at the producer. E does not enter the full queue", "the worker finishes A, then takes B. One waiting place becomes free", "E can now enter the queue. It is accepted, not yet completed"); intro ("give the queue three waiting places. Under this blocking admission policy, submitting E waits at the producer while the queue is full"); takeaway ("backpressure makes upstream production wait or slow. Dropping a job would be a different policy: load shedding"); concept overview ("backpressure carries capacity information upstream so producers slow or wait") and walkthrough ("asyncio.Queue(maxsize=3)… awaiting put() on a full queue waits for get() to free a place"; "have one producer await admission before generating more jobs"). Sources per the concept file, retrieved 2026-10-19: [Python asyncio queues](https://docs.python.org/3/library/asyncio-queue.html) and [Google SRE — Handling overload](https://sre.google/sre-book/handling-overload/).

Out of scope (later lesson): rejecting or dropping submissions (05). Load shedding is named only in the accuracy limits. Timeouts on `put`, multiple producers, byte budgets and RabbitMQ overflow settings are not shown.

Grammar for this cut: **a top-to-bottom flow: a producer panel at the top showing its next two jobs and its current code line, a queue in the middle drawn as exactly three numbered places with a `3 / 3` capacity readout, and the worker at the bottom.** Lesson 03 used a horizontal pipeline with counters and a chart; here the producer's own blocked call and its unbuilt next job are the new objects, and the bounded places are explicit. Every element is a software object: a producer, a blocked function call, jobs, bounded queue places and a worker. No doors, turnstiles, dams or traffic jams.

Target length ≈ 44 s at speed 1 (`meta.speed: 1`). The blocked stretch must be long enough to feel (≈ 10 s) and must end because of downstream work, not a timer.

## Engine notes

Use `box` for the producer and worker panels, `label` for the code line, states and capacity readout, `box` outlines for the three queue places, chips for jobs A–F, a `bar` for A's progress, `s.wire` for producer→queue and queue→worker links (the producer link shows a short blocked stub with a small `‖` label while waiting). A slow pulse on `waiting` replaces a spinner. No new node type is expected. Use a cut-local engine copy with the repository-pinned Puppeteer.

## Stage and coordinates (1080 × 1920)

Palette follows `references/style.md`. Minimum on-screen text 40 px (≈ 13 px at 350 wide); names 44 px; monospace at 40 px ≈ 24 px per character. Content stays within x 60–1020 and y 480–1620.

| id | type | centre / bounds | text | notes |
|---|---|---|---|---|
| title | title band (540, 330) / (540, 405) | — | **Queues and backpressure** / A FULL QUEUE PUSHES BACK | shorten title to **Queues** if it overflows |
| prod | box | x 100–980, y 480–760 | label `producer` 44 px at (230, 520) | C5 |
| jobE | chip | (300, 610) inside prod | `E` (≈ 72 px) | the job being submitted |
| jobF | chip | (440, 610), dashed, alpha 0.35 | `F` | sublabel `not created` 40 px mono, mid at (440, 665) |
| code | label | (700, 610), 40 px mono | `await put(E)` | |
| pState | label | (700, 675), 40 px mono | `—` → `waiting` (accent, slow pulse) → `accepted` (ok) | |
| linkPQ | wire | prod bottom (540, 760) → queue top (540, 860) | — | stub label `‖` 44 px at (590, 810) while blocked |
| qLab | label | (230, 880), 44 px | `queue` | E5; readout `3 / 3 full` → `2 / 3` → `3 / 3` 40 px mono at (820, 880) |
| places | three outlines 200 × 120 | centres (300, 1010), (540, 1010), (780, 1010) | numbered `1`, `2`, `3` 40 px mono, mid, top-left | place 1 is the front |
| qJobs | chips | `B` in place 1, `C` in 2, `D` in 3 | — | shift forward when the front frees |
| linkQW | wire | place 1 bottom (300, 1070) → worker top (300, 1180) | — | |
| worker | box | x 100–980, y 1180–1400 | label `worker` 44 px at (230, 1220); job chip at (300, 1300); bar x 420–940 at y 1300; state 40 px mono at (820, 1220) `running A` → `A done` → `running B` | G5 |
| record | label | (540, 1500), 40 px mono | `E: accepted —  complete —` → `E: accepted ✓  complete —` | beat 4 |

Check that `await put(E)` (≈ 288 px) fits right of the F chip, that chips fit inside places with margin, and that the `‖` stub clears the readout.

## Sound map

Actor pitches: producer **C5**, queue **E5**, worker **G5**. Pan centred; vertical layout uses pitch, not pan, to separate actors.

| event | preset | notes |
|---|---|---|
| A working | `work` G4, every 1.0 s | until A finishes |
| full queue shown | `ack` E5 ×3, one per place | |
| put attempted | `send` C6 | |
| put blocks | `thump`, soft | not a crash: nothing failed |
| waiting | `clock` C4, quiet, every 2 s | the producer is held |
| F not created | no sound | |
| A done | `ack` G5 | |
| B taken | `send` E6, `arrive` G5 | |
| place frees | `poof` quiet | |
| E enters, accepted | `arrive` E5, `deliver` C5 | |

No chime: nothing completes for E.

## Beat sheet (speed 1)

| time | what moves | state change | sound |
|---|---|---|---|
| **Beat 1 — All three waiting places are full; E is still with the producer (0–8.0)** | | | |
| 0.0–1.0 | producer, queue, worker fade in | B, C, D in places 1–3; `3 / 3 full`; worker `running A`, bar ≈ 60 %; E in producer; F dashed `not created` | — |
| 1.0– | A's bar advances | | work G4 every 1.0 s |
| 2.0 / 2.6 / 3.2 | places 1–3 pulse in turn | | ack E5 ×3 |
| 3.8 | readout `3 / 3 full` pulses | | — |
| 3.8–8.0 | hold | | |
| **Beat 2 — Admission waits at the producer; E does not enter the full queue (8.0–20.0)** | | | |
| 8.0 | code `await put(E)` brightens | | — |
| 8.4–9.0 | E nudges toward linkPQ and stops at the producer's edge; `‖` appears on the link | | send C6, thump (soft) |
| 9.4 | pState `waiting` (accent, slow pulse) | | — |
| 10.4 | F's `not created` pulses | the producer is not making more work | — |
| 10.4–20.0 | hold; A's bar continues; pState pulses | | clock C4 every 2 s |
| **Beat 3 — The worker finishes A, then takes B; one place becomes free (20.0–28.0)** | | | |
| 20.0 | A's bar full; worker `A done`; A fades out of the worker | | ack G5 |
| 21.0–22.0 | B moves place 1 → worker; worker `running B`, bar restarts | | send E6, arrive G5 |
| 22.4–23.2 | C and D shift forward to places 1 and 2; place 3 empties | | poof (quiet) |
| 23.4 | readout `2 / 3` | a place is free | — |
| 23.4–28.0 | hold briefly; `‖` fades | | work G4 resumes |
| **Beat 4 — E can now enter; it is accepted, not yet completed (28.0–44.0)** | | | |
| 28.0–29.2 | E moves down linkPQ into place 3 | | send C6 |
| 29.2 | ripple in place 3; readout `3 / 3`; pState `accepted` (ok); `‖` gone | | arrive E5, deliver C5 |
| 30.0 | record `E: accepted ✓  complete —` | | — |
| 31.0 | F's sublabel changes to `next` (still dashed, not created) | the producer may continue now | — |
| 32.0 | `complete —` pulses | | — |
| 32.6–42.4 | hold; worker running B | final state | work G4 |
| 42.4–43.2 | `s.fade` to black, 0.8 s | finite ending | — |
| 44.0 | end | | |

## Accuracy limits

- `await put(E)` follows asyncio's bounded `Queue(maxsize=3)`: `put` waits until `get` frees a place. Other systems differ; a broker's queue-length limit counts ready messages and can drop by default (lesson 05 and the write-up).
- Blocking is one admission policy. Rejecting the submission or dropping a job (load shedding) is a different policy (lesson 05).
- The producer creating no more work while blocked assumes one producer that awaits admission before generating more. Many tasks each waiting on `put` would move the backlog outside the queue (concept walkthrough); not shown.
- Waiting indefinitely is shown for clarity; real producers usually need a deadline on `put`. Not shown.
- E being accepted says nothing about when or whether it completes. Durations are illustrative; no timing numbers appear.

## Native 350 acceptance

These are requirements for the future render, not completed validation.

1. Decode actual frames (avoid relying only on a contact sheet) at 1080 and at 350 px wide around 2.1, 3.3, 3.9, 6.0, 8.2, 8.8, 9.5, 10.5, 15.0, 19.8, 20.1, 21.5, 22.1, 22.8, 23.5, 26.0, 28.6, 29.3, 30.1, 31.1, 32.1, 37.0 and 42.8 s. At 350 px, `producer`, E and F with `not created`/`next`, `await put(E)`, the producer state, `queue`, the readout, place numbers, all queued chips, `worker`, its state and the record line must be readable.
2. Blocked: from 8.4 to 28.0 s E stays in the producer and never overlaps the queue; `waiting` is shown; the readout says `3 / 3 full` until a place frees.
3. Upstream effect: F stays dashed `not created` while E waits; no new job appears at the producer.
4. Release cause: E moves only after A is done, B has left place 1, and the readout shows `2 / 3`.
5. Accepted, not complete: `accepted` appears only after E lands; `complete —` stays empty to the end; no chime.
6. Scope: no rejection, drop, error, second producer or timeout appears.
7. Clearance: chips stay inside places; `‖` clears the readout; nothing enters the title band; no stray chip during holds.
8. Silent reading: with sound off and words ignored, a viewer sees three filled boxes in a row and a top panel whose chip moves toward them and stops; a word pulses in the top panel; the bottom bar fills, its chip disappears, the first queued chip drops into the bottom panel, the others slide forward and the last box empties; the top chip then drops into that box.
9. Audio: the dry run lists one soft `thump` at 8.4 s, quiet `clock` C4 ticks only during 10.4–20.0 s, one `poof` at 22.4 s, one `deliver` C5 at 29.2 s, and no chime or crash. Full-decode the encode, confirm an audio stream, peak below −0.5 dBFS and moov before mdat. Record whether audio was heard or only analysed.
10. After encoding run `python3 scripts/check_media.py --concept queues-and-backpressure`; a new encode needs renewed comparison review bound to its SHA-256.

## Production boundary

Only this anonymous plan is written. No render, scene source, public media, site, shared skill, Git commit or deployment. Later implementation uses the repository-pinned Puppeteer and a cut-local engine copy, with any drawing extension local to the cut.

