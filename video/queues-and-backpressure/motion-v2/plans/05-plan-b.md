# Lesson 05 — Choose an overload policy — plan B

Independent plan for the motion-v2 cut of queues-and-backpressure lesson 05. Authored from the lesson entry in `video/queues-and-backpressure/sequence/lessons.json` (item 5) and the concept content in `content/concepts/queues-and-backpressure.json`. Earlier motion-v2 beat sheets were read only to vary the geometry. No other plan for this lesson, no production ledger, and no authoring source was consulted. This document names no authoring model.

## Scope

One mechanism: **a bounded queue needs an explicit rule for what happens when it is full; under a reject policy, a submission to a full queue returns a `rejected` result immediately, the job is not admitted, and the producer must handle and report that outcome instead of treating the submission as a success.**

The viewer should feel three things. The queue's policy is a visible setting (`when full: reject`), not an accident. The producer's `submit(G)` call returns a result chip, `rejected · queue full`, and G never enters the queue: the three places keep C, D, E. The producer's outcome log records `G rejected` next to earlier `E accepted`, so the result is exposed rather than hidden.

Grounding: lesson beats ("the queue is full again. This policy rejects new submissions", "the producer asks to submit a job. No waiting place is available", "the queue reports rejection. The producer must handle that result", "the rejected job was not admitted. Make the overload policy explicit"); intro ("a bounded queue requires an explicit full-queue policy. This lesson illustrates rejection instead of indefinite waiting"); takeaway ("waiting, rejecting and dropping work have different consequences. Expose the outcome rather than calling every submission successful"); concept overview ("load shedding instead abandons work. These are explicit policies") and walkthrough ("RabbitMQ queue-length limits… the default can drop oldest messages. Choose a supported rejection policy and handle its feedback if silent loss is unacceptable"); pitfall ("immediate retries compete with useful work… repeated failures need a terminal outcome"). Sources per the concept file, retrieved 2026-10-19: [RabbitMQ — Queue length limit and overflow behavior](https://www.rabbitmq.com/docs/maxlength), [Python asyncio queues](https://docs.python.org/3/library/asyncio-queue.html) (`put_nowait` raises `QueueFull`) and [Google SRE — Handling overload](https://sre.google/sre-book/handling-overload/).

Out of scope: this is the last lesson. Waiting admission is lesson 04 and is only referenced as the other option in the policy setting; dropping is named as a third option but not played. Retries, back-off, deadlines and choosing limits are left to the write-up. The worker keeps running B; no completion is shown.

Grammar for this cut: **a call/response exchange between a producer on the left and a bounded queue on the right, with the queue's `when full` policy shown as a three-option setting (`wait` · `reject` · `drop`, `reject` selected), and a producer outcome log at the bottom that lists each submission's result.** Lessons 01–04 moved jobs through a pipeline; here the submission itself is a function call that returns a value, and the result is the object of the lesson. Every element is a software object: a producer, a submit call, a returned result, a queue policy setting, bounded places and an outcome log. No bouncers, closed signs or stop hands.

Target length ≈ 42 s at speed 1 (`meta.speed: 1`). Hold on the returned `rejected` result before the producer handles it.

## Engine notes

Use `box` for the producer and queue panels, `label` for the call line, the policy options (outline box on the selected one) and log rows, `box` outlines for the three places, chips for jobs and the returned result, `s.wire` for the call path (producer → queue) and return path (queue → producer), and a small `box` for the worker with a slow bar. No new node type is expected. Use a cut-local engine copy with the repository-pinned Puppeteer.

## Stage and coordinates (1080 × 1920)

Palette follows `references/style.md`. Minimum on-screen text 40 px (≈ 13 px at 350 wide); names 44 px; monospace at 40 px ≈ 24 px per character. Content stays within x 40–1040 and y 480–1640.

| id | type | centre / bounds | text | notes |
|---|---|---|---|---|
| title | title band (540, 330) / (540, 405) | — | **Queues and backpressure** / CHOOSE AN OVERLOAD POLICY | shorten title to **Queues** if it overflows |
| prod | box | x 40–430, y 500–900 | label `producer` 44 px at (150, 540); job chip `G` at (130, 640); call line `submit(G)` 40 px mono at (300, 640); state 40 px mono at (235, 820) `—` → `calling…` → `got rejected` → `reported` | C5 |
| queue | box | x 520–1040, y 500–900 | label `queue` 44 px at (630, 540); readout `3 / 3 full` 40 px mono at (900, 540) | E5 |
| policy | labels | `when full:` at (640, 610); options `wait` (700, 670) · `reject` (830, 670) · `drop` (960, 670), 40 px mono | `reject` outlined accent; `wait` and `drop` mid | the explicit setting |
| places | three outlines 140 × 100 | centres (630, 790), (780, 790), (930, 790) | chips `C`, `D`, `E` | unchanged throughout |
| callPath | wire | (430, 640) → (520, 640) | — | the call |
| retPath | wire | (520, 720) → (430, 720) | — | the returned result |
| result | chip, 2 lines, ≈ 260 × 100 | travels retPath, then sits at (235, 740) | `rejected` / `queue full` | bad-accent border, not a crash |
| worker | box | x 520–1040, y 960–1100 | label `worker` 40 px; `running B` 40 px mono; slow bar | G5; context only |
| log | outline box | x 40–1040, y 1180–1560 | header `producer outcomes` 40 px mono, mid at (240, 1220) | |
| log0 | row | y 1300, 40 px mono | `E   accepted` (ok) | from lesson 04; present at start |
| log1 | row | y 1380 | `G   rejected · not admitted` (accent) | beat 3–4 |
| log2 | row | y 1460 | `G   report to caller` (mid) | the handling action |

Check that `submit(G)` and the G chip fit the producer panel, the policy options fit x 640–1020, the two-line result chip fits the producer panel, and log rows (≤ 28 characters ≈ 672 px) fit.

## Sound map

Actor pitches: producer **C5**, queue **E5**, worker **G5** (quiet background ticks). Pan: producer left (≈ −0.5), queue right (≈ +0.5).

| event | preset | notes |
|---|---|---|
| full places | `ack` E5 ×3 | |
| policy shown | `ack` E6, quiet | on `reject` |
| call sent | `send` C6 | |
| queue checks places | `ack` E4 ×3, quick | no place free |
| rejection returned | `miss` then `deliver` C4 | a clear, low result: not a crash |
| producer handles | `store` C5 | log row written |
| worker running | `work` G4, quiet, every 1.2 s | background |

No chime and no crash.

## Beat sheet (speed 1)

| time | what moves | state change | sound |
|---|---|---|---|
| **Beat 1 — The queue is full again; this policy rejects new submissions (0–9.0)** | | | |
| 0.0–1.0 | panels, places, worker, log with `E accepted` fade in | `3 / 3 full`; C, D, E queued; worker `running B` | — |
| 1.0– | worker bar advances slowly | | work G4 every 1.2 s |
| 1.8 / 2.4 / 3.0 | places pulse in turn | | ack E5 ×3 |
| 4.0 | `when full:` and the options appear; `reject` outline lights | the policy is explicit | ack E6 (quiet) |
| 4.0–9.0 | hold | | |
| **Beat 2 — The producer asks to submit G; no waiting place is available (9.0–16.0)** | | | |
| 9.0 | G chip appears in producer; `submit(G)` brightens; state `calling…` | | — |
| 9.6–10.6 | a call dot travels callPath | | send C6 |
| 10.8 / 11.2 / 11.6 | places outlined in turn; none frees | | ack E4 ×3 (quick) |
| 12.2 | readout `3 / 3 full` pulses; `reject` pulses | the policy applies | — |
| 12.2–16.0 | hold; G stays in the producer | | |
| **Beat 3 — The queue reports rejection; the producer must handle it (16.0–25.0)** | | | |
| 16.0–17.0 | result chip `rejected · queue full` travels retPath to the producer | | miss, deliver C4 |
| 17.0 | producer state `got rejected`; G chip dims | | — |
| 17.0–21.0 | hold on the result | | |
| 21.0 | log1 `G rejected · not admitted` | | store C5 |
| 22.4 | log2 `G report to caller`; producer state `reported` | the outcome is exposed | store C5 |
| 22.4–25.0 | hold | | |
| **Beat 4 — The rejected job was not admitted; make the policy explicit (25.0–42.0)** | | | |
| 25.0 | the three places pulse: still C, D, E | G never entered | — |
| 26.0 | log0 `E accepted` and log1 `G rejected` pulse in turn | different outcomes, both visible | — |
| 27.0 | `reject` pulses; `wait` and `drop` pulse dim in turn | other policies exist, with other consequences | — |
| 28.0–40.4 | hold | final state | |
| 40.4–41.2 | `s.fade` to black, 0.8 s | finite ending | — |
| 42.0 | end | | |

## Accuracy limits

- Rejection is one full-queue policy. In asyncio, `put_nowait` on a full queue raises `QueueFull`; in RabbitMQ, `overflow=reject-publish` makes the broker nack the publish (with publisher confirms). RabbitMQ's default overflow behaviour drops the oldest ready messages, which is the `drop` option not played here.
- `report to caller` is an illustrative handling choice. Retrying immediately would compete with useful work; any retry needs back-off and a limit. Not shown.
- E `accepted` is not completion (lessons 01–02); the log records submission outcomes only.
- Limits should come from measured cost, latency and delay budget (concept judgement); the cut does not suggest a size.
- Durations are illustrative; no timing numbers appear.

## Native 350 acceptance

These are requirements for the future render, not completed validation.

1. Decode actual frames (avoid relying only on a contact sheet) at 1080 and at 350 px wide around 1.9, 3.1, 4.1, 7.0, 9.1, 10.0, 10.9, 11.7, 12.3, 15.0, 16.5, 17.1, 19.0, 21.1, 22.5, 25.1, 26.1, 27.1, 34.0 and 40.8 s. At 350 px, `producer`, G, `submit(G)`, the producer state, `queue`, the readout, `when full:` and all three options, the queued chips, the result chip, `worker`, the log header and all log rows must be readable.
2. Not admitted: G never enters a queue place or the call path beyond the queue edge; places hold C, D, E in every frame.
3. Explicit result: the rejection travels back to the producer before any log row about G appears; `reported` follows the log rows.
4. Not a crash: no red fill, × burst or crash sound; the result chip uses a bad-accent border only.
5. Scope: no waiting producer, drop, retry, deadline or completion appears.
6. Clearance: the result chip fits the producer panel; policy options do not overlap the readout; log rows fit; nothing enters the title band.
7. Silent reading: with sound off and words ignored, a viewer sees a full row of three boxes with one of three option words outlined; a chip on the left sends something across and the three boxes are checked; something comes back and sits in the left panel; two new rows appear in a list below, under an earlier row; the three boxes still hold the same chips.
8. Audio: the dry run lists one `miss` and `deliver` C4 at 16.0–17.0 s, two `store` C5 at 21.0 and 22.4 s, quiet worker ticks, and no chime or crash. Full-decode the encode, confirm an audio stream, peak below −0.5 dBFS and moov before mdat. Record whether audio was heard or only analysed.
9. After encoding run `python3 scripts/check_media.py --concept queues-and-backpressure`; a new encode needs renewed comparison review bound to its SHA-256.

## Production boundary

Only this anonymous plan is written. No render, scene source, public media, site, shared skill, Git commit or deployment. Later implementation uses the repository-pinned Puppeteer and a cut-local engine copy, with any drawing extension local to the cut.

