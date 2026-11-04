# Lesson 03 — A backlog grows — plan B

Independent plan for the motion-v2 cut of queues-and-backpressure lesson 03. Authored from the lesson entry in `video/queues-and-backpressure/sequence/lessons.json` (item 3) and the concept content in `content/concepts/queues-and-backpressure.json`. Earlier motion-v2 beat sheets were read only to vary the geometry. No other plan for this lesson, no production ledger, and no authoring source was consulted. This document names no authoring model.

## Scope

One mechanism: **one worker is busy with job A; jobs B, C and D arrive faster than it can finish anything, so each one waits behind the last and the backlog grows; the queue holds the extra jobs but adds no execution capacity.**

The viewer should feel three things. The worker stays on A the whole time, with one slow progress bar and steady ticks, while new jobs keep arriving. Each arrival extends a line of waiting jobs, and a step chart of `waiting` climbs 0 → 1 → 2 → 3 in step with them. Two counters diverge: `arrived` rises to 4 while `completed` stays at 0, so the gap is the backlog.

Grounding: lesson beats ("new scenario: the worker is running A. More jobs arrive while it is busy", "B waits behind the running job. The worker has not taken B", "C arrives before A finishes. C will join B in the queue", "D arrives too. The backlog grows. Arrivals exceed completions here"); intro ("a slow worker cannot keep up with incoming jobs. The queue absorbs a short burst, but sustained excess arrivals create a growing backlog"); takeaway ("a queue delays overload; it does not create execution capacity. This example has one worker"); concept overview ("sustained arrivals above completions grow backlog unless work is delayed, rejected or discarded") and judgement ("track oldest waiting age, active calls and completion rate alongside depth"). Sources per the concept file, retrieved 2026-10-19: [Google SRE — Handling overload](https://sre.google/sre-book/handling-overload/) and [Python asyncio queues](https://docs.python.org/3/library/asyncio-queue.html).

Out of scope (later lessons): a fixed number of waiting places and a full queue (04); waiting admission at the producer, rejection and dropping (04–05). The queue is drawn as an open lane with no slot count or limit, so it does not pre-empt lesson 04. Completion of A, the worker taking B, adding workers, retries and timeouts are not shown.

Grammar for this cut: **a horizontal pipeline at the top (producer → open queue lane → one worker), counters for `arrived`, `waiting` and `completed` in the middle, and a `waiting` step chart over time at the bottom whose steps line up with each arrival.** Lessons 01–02 followed one job; here the chart and counters turn the same motion into a rate comparison. Every element is a software object: a producer, jobs, a queue, a worker, counters and a depth graph. No traffic, crowds, buckets or overflowing water.

Target length ≈ 44 s at speed 1 (`meta.speed: 1`). Arrivals are about 6 s apart while A's bar barely moves; do not speed A up, because its slowness is the cause.

## Engine notes

Use `box` for producer and worker, an open outline lane for the queue (no slot outlines), chips for jobs, `label` for counters, a `bar` for A's progress, and for the chart either a local `steps` node in the cut-local engine copy (reading `p('n0')`…`p('n3')` heights; report it) or `s.wire` segments revealed in turn plus `s.mark` dots at each step. A moving `now` marker on the chart is optional; if used and x cannot be animated, add a general `cursor` node locally. Use the repository-pinned Puppeteer.

## Stage and coordinates (1080 × 1920)

Palette follows `references/style.md`. Minimum on-screen text 40 px (≈ 13 px at 350 wide); names 44 px; monospace at 40 px ≈ 24 px per character. Content stays within x 40–1040 and y 480–1640.

| id | type | centre / bounds | text | notes |
|---|---|---|---|---|
| title | title band (540, 330) / (540, 405) | — | **Queues and backpressure** / A BACKLOG GROWS | shorten title to **Queues** if it overflows |
| ctx | label | (540, 500), 40 px mono, mid | `new scenario · 1 worker` | |
| prod | box | (130, 640), 180 × 130 (x 40–220, y 575–705) | label `producer` 40 px | C5 |
| lane | open outline | x 250–760, y 590–690 | label `queue` 44 px at (505, 560) | E5; no slot count |
| front | label | (720, 725), 40 px mono, mid | `front` | the worker takes from this end |
| worker | box | (900, 640), 260 × 150 (x 770–1030, y 565–715) | label `worker` 40 px; job chip slot; bar x 800–1000 at y 700 | G5 |
| wState | label | (900, 760), 40 px mono, accent | `running A` | constant |
| jobs | chips | `A` in worker; `B` at x 690, `C` at x 570, `D` at x 450 (lane centre y 640) | `B`, `C`, `D` (≈ 72 px each) | new arrivals join at the back (left of the previous) |
| cArr | label | (220, 860), 44 px mono | `arrived 1` → `4` | C5 colour |
| cWait | label | (540, 860), 44 px mono | `waiting 0` → `3` | E5 colour |
| cDone | label | (860, 860), 44 px mono | `completed 0` | G5 colour; never changes |
| chartBox | outline | x 120–960, y 960–1460 | label `waiting over time` 40 px mono, mid at (300, 1000) | |
| yTicks | labels | (90, 1400 / 1300 / 1200 / 1100), 40 px mono, mid | `0` · `1` · `2` · `3` | |
| steps | step line | x 160 → 920, levels y 1400 / 1300 / 1200 / 1100 | — | E5 colour; each rise lines up with an arrival |
| arrMarks | labels | (x of each step, 1500), 40 px mono | `B` · `C` · `D` | under the rise each arrival caused |
| gapNote | label | (540, 1580), 40 px mono, accent | `arrived 4 · completed 0` | beat 4 |

Chart time mapping: x = 160 + 23 · t for t in 0–33 s (step rises at 9.0, 17.0, 25.0 s → x 367, 551, 735). The line stops at 33 s (x 919). Check that B/C/D chips fit the lane with 48 px gaps, that `front` sits under B's position, and that `completed 0` stays inside x 1040.

## Sound map

Actor pitches: producer **C5**, queue **E5**, worker **G5**. Pan by x. The worker's ticks are steady and slow; the arrivals are brighter and faster, so the ear hears arrivals outpacing work.

| event | preset | notes |
|---|---|---|
| A running | `work` G4, every 1.0 s from 1.0 s to the end | constant pace |
| job created / sent | `send` C6 | |
| job joins the queue | `arrive` E5 | |
| `arrived` counter +1 | `ack` C5, quiet | |
| `waiting` counter +1 / chart rises | `store` E5, pitched up a step each time (E5, F#5, G#5) | the climb is audible |
| `completed` pulses at 0 | `ack` G4, quiet | |
| gap shown | `thump`, soft | no crash: nothing failed |

No music; no chime (nothing completed).

## Beat sheet (speed 1)

| time | what moves | state change | sound |
|---|---|---|---|
| **Beat 1 — New scenario: the worker is running A; more jobs will arrive (0–7.0)** | | | |
| 0.0–1.0 | ctx, producer, lane, worker, counters and empty chart fade in | A in the worker; `running A`; `arrived 1`, `waiting 0`, `completed 0`; chart at 0 | — |
| 1.0– | A's bar advances very slowly (≈ 25 % by 33 s) | | work G4 every 1.0 s |
| 2.0 | worker and `running A` pulse | | — |
| 3.0 | lane pulses empty | nothing waiting yet | — |
| 3.0–7.0 | hold; chart line advances at 0 | | |
| **Beat 2 — B waits behind the running job (7.0–15.0)** | | | |
| 7.0 | chip `B` appears at the producer | | — |
| 7.6–9.0 | `B` moves into the lane, stops at the front (x 690) | | send C6 |
| 9.0 | ripple; `arrived 2`; `waiting 1`; chart rises to 1 with a `B` mark | | arrive E5, ack C5, store E5 |
| 10.0 | `B` and `front` pulse; worker stays on A | the worker has not taken B | — |
| 10.0–15.0 | hold | | |
| **Beat 3 — C arrives before A finishes; it joins B (15.0–23.0)** | | | |
| 15.6–17.0 | `C` from producer into the lane, stops behind B (x 570) | | send C6 |
| 17.0 | `arrived 3`; `waiting 2`; chart rises to 2 with `C` | | arrive E5, ack C5, store F#5 |
| 18.0 | A's bar pulses (still ≈ 13 %) | A is not done | — |
| 18.0–23.0 | hold | | |
| **Beat 4 — D arrives too; the backlog grows; arrivals exceed completions (23.0–44.0)** | | | |
| 23.6–25.0 | `D` into the lane behind C (x 450) | | send C6 |
| 25.0 | `arrived 4`; `waiting 3`; chart rises to 3 with `D` | | arrive E5, ack C5, store G#5 |
| 26.4 | `completed 0` pulses | | ack G4 (quiet) |
| 27.4 | gapNote `arrived 4 · completed 0`; the three waiting chips pulse back to front | the gap is the backlog | thump (soft) |
| 28.4 | the chart's three rises pulse left to right | | — |
| 28.4–33.0 | chart line continues flat at 3; A's bar still short | | |
| 33.0–41.6 | hold | final state | |
| 41.6–42.4 | `s.fade` to black, 0.8 s | finite ending | — |
| 44.0 | end | | |

## Accuracy limits

- One worker, as the lesson states. The cut does not claim that more workers would fix it; adding workers can overload a downstream tool (concept pitfall).
- The queue is drawn without a size. Real queues are bounded by a configured limit or by memory; that is lesson 04.
- `waiting` counts jobs, not cost or age. The concept recommends tracking oldest waiting age and completion rate alongside depth; not drawn.
- A eventually finishes and the worker takes B, after which the backlog drops by one if no more jobs arrive; the cut stops before that, as the lesson does.
- Arrival spacing and A's duration are illustrative; no rates or times are shown.

## Native 350 acceptance

These are requirements for the future render, not completed validation.

1. Decode actual frames (avoid relying only on a contact sheet) at 1080 and at 350 px wide around 1.8, 3.1, 6.0, 7.2, 8.4, 9.1, 10.1, 13.0, 16.0, 17.1, 18.1, 21.0, 24.0, 25.1, 26.5, 27.5, 28.5, 31.0, 36.0 and 42.0 s. At 350 px, the context line, `producer`, `queue`, `front`, `worker`, `running A`, every job chip, all three counters, the chart label and ticks, the arrival marks and the gap note must be readable.
2. Worker never moves on: A stays in the worker and `running A` holds in every frame; B, C and D never enter the worker.
3. Backlog growth: `waiting` and the chart rise only when a chip lands in the lane, reaching 3; the chips line up B (front), C, D.
4. Counters: `arrived` goes 1 → 4; `completed` reads 0 in every frame.
5. Scope: no slot count, `full`, blocked producer, rejection, drop, second worker or chime appears.
6. Clearance: chips stay in the lane and clear labels; chart marks align with rises; nothing enters the title band; no chip remains moving during a hold.
7. Silent reading: with sound off and words ignored, a viewer sees one box on the right with a slowly filling bar; small chips arrive from the left one at a time and line up in the middle; a line below steps up each time one arrives; one number climbs while another stays at zero.
8. Audio: the dry run lists steady `work` G4 ticks throughout, three `arrive` E5, rising `store` cues at E5, F#5 and G#5, one soft `thump`, and no chime or crash. Full-decode the encode, confirm an audio stream, peak below −0.5 dBFS and moov before mdat. Record whether audio was heard or only analysed.
9. After encoding run `python3 scripts/check_media.py --concept queues-and-backpressure`; a new encode needs renewed comparison review bound to its SHA-256.

## Production boundary

Only this anonymous plan is written. No render, scene source, public media, site, shared skill, Git commit or deployment. Later implementation uses the repository-pinned Puppeteer and a cut-local engine copy, with any drawing extension local to the cut.

