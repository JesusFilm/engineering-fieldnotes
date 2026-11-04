# Submit a job

## Scope and grounding

One mechanism: admission, waiting, execution, and completion are distinct events for the same job. Job A is accepted into a queue before the worker begins; the waiting list becomes empty when the worker takes it, while completion remains false.

Scope: `video/queues-and-backpressure/sequence/lessons.json` item 1 and `content/concepts/queues-and-backpressure.json`. The concept's local queue example distinguishes put, get, and task completion; this plan illustrates that conceptual lifecycle without claiming durable-broker semantics. Primary reference for implementation review: [Python asyncio queues](https://docs.python.org/3/library/asyncio-queue.html), identified in the concept's sources (repository retrieval date 2026-10-19). No API syntax appears on screen.

Five beats, 43 seconds. One producer, one job, one worker. No capacity limit, full queue, blocked producer, prefetch, retries, cancellation, redelivery, acknowledgments protocol, or overload policy. The job is a synthetic documentation check, not a paid tool call or repository mutation.

## Visual grammar: job board with separate status receipt

Use a queue's waiting-list UI beside an execution pane, with the producer above and a persistent job-status receipt below. Move one job identity from the waiting list into the worker pane. The receipt changes state separately, making acceptance visible long before completion. This is software state transition, not a physical conveyor or three-box pipeline.

1080 × 1920. Background #050506, primary #E6E8EC, secondary #8B9099; accepted neutral white, running amber #F5A524, completed teal #3FB68B. Use text and occupancy rather than color alone. Title 76 px; actor names 60 px; job and status labels 54–58 px; secondary 52 px minimum.

| Element | Coordinates x,y,w,h | Content |
|---|---|---|
| Title | 90,140,900,110 | `Submit a job` |
| Producer editor | 90,350,900,280 | Producer; `Job A · check docs`; Submit control |
| Queue pane | 90,850,420,480 | Queue; `Waiting: 0/1`; one visible job-row area |
| Worker pane | 570,850,420,480 | Worker; `Not started` → `Ready` → `Running` → `Done` |
| Queue job row | 130,1080,340,150 | `Job A` / `check docs` |
| Worker job row | 610,1080,340,150 | same identity, appears only on dequeue |
| Status receipt | 90,1460,900,260 | `Job A` header; status line y1540; `Complete: no/yes` at y1630 |
| Footer | 90,1780,900,70 | final `Accepted ≠ complete`, 58 px |

Submit path (300,650)→(300,830); dequeue path from job-row center (300,1155)→(780,1155), crossing the clear 60 px gutter. The moving job is rendered above pane borders but never over headings. No transport animation from producer directly to worker. Producer shows `Submitted A` after acceptance; its editor no longer resembles another queued copy.

The waiting list has one visible row because only one job is demonstrated; it is not a maxsize=1 claim. Do not label a capacity limit. Receipt is the illustration's lifecycle display, not a promise of a built-in queue status API. The producer need not receive a completion callback in this cut.

## Timed beats, state, sound

Producer C4; queue E4; worker A4. Distinguish admission sound from completion. No music, ticking, or sound during every reading hold.

| Beat / playback | Motion and state | Sound / hold |
|---|---|---|
| 1 · 0–7 s · Create the job | Producer reveals Job A / check docs at 2. Queue empty, Waiting 0; worker Not started. Receipt shows Job A / Draft / Complete: no. At 4 outline Submit once. | Producer `ack` C4 at 2. Hold 4.5–7. No execution yet. |
| 2 · 7–16 s · Admission is acceptance | Submit marker travels producer→queue 8–9.5. At 9.5 Job A becomes the queue row and Waiting becomes 1. At 10.5 receipt becomes Accepted / Complete: no; producer becomes Submitted A. Worker remains Not started. | Producer `send` C4 at 8; queue `store` E4 at 9.5; producer restrained `ack` C4 at 10.5. Hold 11–16: accepted and visibly waiting, not complete. |
| 3 · 16–25 s · Worker takes A | Worker changes to Ready at 16.5. At 18 dequeue A: Waiting becomes 0; the single job identity moves into worker pane 18–19.5. Receipt changes to Running only when execution starts at 20; Complete remains no. Queue displays Empty. | Worker `ack` A4 at 16.5; queue `send` E4 at 18; worker `work` A4 at 20. Hold 21–25 on empty queue plus active job. |
| 4 · 25–34 s · Execution takes time | Job A remains in worker pane. Inside its row, activate `Read docs` at 25.5, then change to `Check links` at 28.5. These short labels are illustrative work phases. Receipt remains Running / Complete: no. No new messages or queued copies appear. | Worker `work` A4 at 25.5 and 28.5. Hold 29–34. No percentage or measured-duration claim. |
| 5 · 34–43 s · Record completion | At 34.5 worker becomes Done, stopping activity. At 35.5 receipt changes to Completed / Complete: yes. Keep Job A in worker pane as completed history, not new waiting work. At 37 footer Accepted ≠ complete appears. | Worker `ack` A4 at 34.5, distinct quiet `chime` A4 at 35.5. Hold 38–43 silently. No automatic resubmission or reset. |

The strongest comparison occurs twice: accepted while still waiting, and queue empty while work is still running. The delayed worker start is deliberate staging, not evidence of a broken worker or a claim that queues require manual starts.

## Accuracy limits

- Accepted means queue admission in this toy lifecycle, not durable persistence, replication, successful execution, or exactly-once processing. No durability badge or permanent-success claim belongs on acceptance.
- Dequeue removes A from the waiting list, not from all accounting. The worker still owns unfinished work. Broker systems may track in-flight deliveries separately; their acknowledgment rules are outside scope.
- The queue does not execute jobs. Worker execution begins only after taking A. The visible status receipt is illustrative application bookkeeping, not an automatic feature of every queue.
- Completed denotes the synthetic job finishing as recorded by this example. It is not independent verification that all real documentation is correct.
- Only one job is shown; no ordering/fairness, queue-size, throughput, latency, or backpressure guarantee follows. A waiting-list length of zero does not establish no unfinished work.
- No real document content or credentials are shown. The two work-phase labels convey that execution happens at the worker without introducing another system.

## Native350 acceptance and future encoded review

- Inspect individual actual encoded frames at native 350 px width (~622 px high), plus full size. 54 px text displays at ~17.5 px, 52 px at ~16.9 px. Wrap Not started, Complete: no, and check docs if needed; retain font size and row spacing.
- Inspect holds at 5, 13, 23, 31, and 40 s, plus before/mid/after admission, dequeue, execution start, and completion recording. Contact sheets cannot establish readability.
- At 13 s identify Accepted, Waiting 1, Complete no, worker not started. At 23 s identify Waiting 0, worker Running, Complete no. At 40 s identify completion occurring after those earlier states.
- There must be exactly one queued/executing job identity. Producer's Submitted A and receipt are status references, visually distinct from the movable job row. Never leave a second job in the queue after dequeue.
- Receipt cannot become Completed at admission, dequeue, or a partial work phase. Waiting count changes on queue entry/removal, not on work completion. No green completion mark at acceptance.
- Muted playback must explain who holds versus executes the job through occupancy and state changes. Avoid spinning machinery, decorative camera motion, and paragraph captions.
- Reproduce suspected visual defects through alternate extraction before flagging. Later decode the full MP4, inspect audio peaks and streaming metadata, and listen before claiming actual audio was heard. Bind review to the actual full SHA-256; renew encoded inspection after re-encoding.

Only this plan is assigned. Future implementation uses repository-pinned Puppeteer and a cut-local engine copy. No rendering, public/site/shared-skill edits, Git operations, or other lesson work is included.
