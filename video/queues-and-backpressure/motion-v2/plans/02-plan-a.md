# Finish a job

## Scope and grounding

One mechanism: taking a job out of the waiting queue is not completion. The worker executes it, observes successful work, and only then reports completion. Replay one job A from Waiting; this is an independent illustrative replay, not a duplicate submission following another video.

Scope: `video/queues-and-backpressure/sequence/lessons.json` item 2 and `content/concepts/queues-and-backpressure.json`. The concept distinguishes dequeue from completion and warns that acknowledgment policy must match the effect being confirmed. Relevant primary references identified in that document: [Python asyncio queues](https://docs.python.org/3/library/asyncio-queue.html) and [RabbitMQ acknowledgments and confirms](https://www.rabbitmq.com/docs/confirms), repository retrieval date 2026-10-19. This cut uses abstract job-status reporting, not a protocol-specific broker acknowledgment.

Five beats, 44 seconds. No submission/admission replay, queue capacity, backpressure, worker failure, retries, redelivery, durability, or exactly-once tutorial. The example job checks links in a tiny synthetic document fixture; completion follows its observed successful result.

## Software-native geometry

A **job detail view** contains a waiting-list inset, a large worker execution console, and a persistent completion record. The waiting inset empties early while the console remains active. The completion record stays pending until the worker's result exists. These are parts of a job-monitor UI rather than three generic pipeline boxes.

1080 × 1920; background #050506, primary #E6E8EC, secondary #8B9099, running amber #F5A524, successful result teal #3FB68B. State labels and icons supplement color. Title 76 px, primary labels 58–64 px, secondary 52 px minimum. All geometry is x,y,width,height unless endpoints are specified.

| Element | Geometry | Labels / state |
|---|---|---|
| Title | 90,140,900,110 | `Finish a job` |
| Job identity header | 90,340,900,90 | `Job A · link check`, 60 px |
| Replay note | 90,440,900,65 | `Replay from waiting`, 52 px |
| Waiting list | 90,580,900,190 | heading Waiting; Job A row, later Empty |
| Worker console | 90,920,900,470 | Worker; state; short task-result lines |
| Worker task row | 140,1040,800,90 | `A · check links` |
| Work detail | 140,1160,800,170 | initially `Result pending`, later `3 links checked` / `0 broken` |
| Completion record | 90,1500,900,190 | `Job status` / Waiting → Running → Completed |
| Footer | 90,1770,900,80 | `Finish work, then report`, 56 px |

Queue-to-worker path (540,790)→(540,900). Completion-report path (920,1390)→(920,1470), with a small marker only after success. Job A travels once from its waiting row into its worker task row; headers and job-status text are references, visually distinct from the moving row. No physical queue metaphor, rotating machinery, or percentage bar.

## Beat sheet: timed motion, state, and sound

Queue E4, worker A4, status recorder C4. Sparse short presets distinguish dequeue, work, successful result, and recorded completion. No soundtrack or repetitive typing sounds.

| Beat / time | Motion and state changes | Sound / hold |
|---|---|---|
| 1 · 0–8 s · Waiting is not started | Establish Job A in the waiting list, Worker Ready, Result pending, job status Waiting. Replay note remains visible until first transfer. At 3 highlight Waiting in both list and record once. | Queue `ack` E4 at 3. Hold 4–8. No task execution or result yet. |
| 2 · 8–17 s · Dequeue, then execute | At 8.5 worker takes A. Move the job row down 9–10.5, leaving the waiting list Empty at departure. At 11 the worker becomes Running and job status becomes Running. Remove replay note after arrival. Result remains pending. | Queue `send` E4 at 9; worker `arrive` A4 at 10.5 and `work` A4 at 11. Hold 12–17 on empty waiting list plus running job. |
| 3 · 17–27 s · Work remains unfinished | At 17.5 worker detail becomes `Checking links`; reveal three small outlined link-status squares at x200,400,600, y1280. Activate them in order at 18, 21, 24, without displaying final success. Keep job status Running. | Worker subdued `work` A4 at 18 and 24. Hold 25–27. These are fixture checks, not a general progress estimate. |
| 4 · 27–35 s · Success exists before report | At 27.5 the final check finishes. Replace check squares with `3 links checked` / `0 broken`, and worker state becomes Succeeded. Keep job status Running briefly until the report is sent. At 31 a completion marker leaves the worker; reaches record at 32.5. Only then set job status Completed. | Worker `ack` A4 at 27.5; worker `send` A4 at 31; recorder `store` C4 at 32.5. Hold 28–31 on success not yet recorded, then 33–35 on completed record. |
| 5 · 35–44 s · Preserve the distinction | At 35.5 briefly outline Empty in the waiting list, then the successful result at 37, then Completed at 38.5. Reveal Finish work, then report footer. All results persist; no requeue or resubmission. | Recorder soft `ack` C4 at 38.5. Hold 39–44 silently. Finite ending. |

The short reporting delay is illustrative: it separates observed successful work from the status update so the causal order is readable. It is not an error, timeout, or promise about network latency. The worker's success label and job record's Completed state are different UI fields and must remain clearly labeled.

## Accuracy limits

- This is a successful fixture. A failed or cancelled job would need a different outcome; do not imply every dequeued item eventually succeeds.
- Empty waiting list does not mean no unfinished work. Once A is taken, it remains running until its execution finishes; only the waiting-list entry is removed.
- Completion reporting here confirms successful execution of the illustrated checks. It does not independently prove all document content correct or all side effects durably recorded.
- A broker acknowledgment and application success are not universally equivalent. The correct acknowledgment point depends on what must be confirmed and recorded. No RabbitMQ ACK, publisher confirm, task_done API, or exactly-once badge is shown.
- Some systems retain unacknowledged deliveries separately from ready messages. The waiting inset represents ready/waiting work, not all broker accounting.
- The three checks are synthetic and timing is illustrative; no throughput, queue-size, durability, or latency guarantee follows. There are no real links or external requests.

## Native350 acceptance and future review

- Inspect individual actual encoded frames at native 350 px width (~622 px high) and full size. 52 px text becomes ~16.9 px. Verify Result pending, 3 links checked, 0 broken, and Completed remain legible; use short line breaks rather than smaller type.
- Inspect holds at 5, 14, 25, 29, 34, and 41 s, plus before/mid/after dequeue, execution start, success, completion-report travel, and record mutation. Contact sheets alone cannot establish readability.
- At 14 s see Empty queue with Running worker and pending result. At 29 s see successful worker result but a still-Running job record. At 34 s Completed must follow report arrival. The UI must not imply that success is unknown after the record updates.
- Exactly one moving Job A identity; no duplicate task left waiting, no early completed checkmark, and no completion-report marker before success. The worker result persists during reporting.
- Silent playback must distinguish Waiting, Running, successful execution, and recorded completion. Retain the empty-queue/running hold and success-before-report hold; these carry the lesson.
- Reproduce suspected visual faults with alternate extraction before flagging. Later decode the entire MP4, inspect audio peaks and streaming metadata, and listen before claiming audio was heard. Bind review to the actual full SHA-256; renew encoded review after any re-encode.

Only this plan is assigned. Future implementation uses repository-pinned Puppeteer and a cut-local engine copy. No rendering, public/site/shared-skill edits, Git operations, or other lesson work is included.
