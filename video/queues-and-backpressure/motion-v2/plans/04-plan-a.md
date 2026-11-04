# A full queue pushes back

## Scope and grounding

One mechanism: a bounded queue's blocking admission suspends the producer's submission until a dequeue frees a waiting place. E remains with the producer while B/C/D fill three waiting places and worker A continues. Finishing A alone does not free queue space; taking B does. E then enters at the tail, accepted but unfinished.

Scope: `video/queues-and-backpressure/sequence/lessons.json` item 4 and `content/concepts/queues-and-backpressure.json`. [Python asyncio queues](https://docs.python.org/3/library/asyncio-queue.html), inspected 2026-10-21, documents bounded put waiting until get removes an item, separately from task completion. The local queue is the model for this illustration, not a durable broker. Use the assigned lesson's A/B/C/D/E identities, not the concept document's longer batch.

Six beats, 48 seconds. No rejection, dropping, retry, timeout, producer concurrency, extra worker, or later drain sequence. Do not teach a competing overflow policy. The pause in production is deliberate policy, not an automatic property of any queue.

## Geometry: bounded list and suspended submit call

A producer call panel retains E above a three-row queue inspector. A worker execution panel sits to the right of the queue. A pending submission status visibly persists while the worker progresses. No gates, pipes, barriers, physical pushing, or conveyor metaphor: the upstream effect is a suspended software call.

1080 × 1920. Background #050506; text #E6E8EC; secondary #8B9099; pending/running amber #F5A524; admitted teal #3FB68B. Full uses a labeled outline, not a red error. Title 76 px, primary 58–64 px, details 52 px minimum.

| Element | Coordinates x,y,w,h | Content |
|---|---|---|
| Title | 90,140,900,170 | `A full queue` / `pushes back` |
| Producer panel | 90,380,900,280 | Producer; `Submit E`; Ready → Waiting for space → Accepted |
| Queue header | 90,790,510,150 | `Waiting queue` / `3 / 3`, 58 px |
| Queue rows | 130,990/1150/1310,430,120 | B, C, D initially; one job per row |
| Worker panel | 660,990,330,440 | Worker; `A` / `Running`, then A Done, then B Running |
| Worker history | 660,1470,330,70 | `A done`, 52 px after completion |
| E status strip | 90,1610,900,140 | `E: not accepted` → `E: accepted`; `Complete: no` throughout |
| Footer | 90,1780,900,80 | `Producer waits; worker continues`, two lines if needed |

Keep three outlined row positions visible to establish the configured bound. Queue count excludes the worker and producer-held E. Pending E appears only in the producer panel, never as a fourth queue row or a packet pressed against the queue.

Dequeue path: B row center (345,1050)→(620,1050)→(825,1130). After B departs, C/D rows slide up one position, preserving FIFO order and opening the tail row. E admission path: (345,680)→(80,730)→(80,1370)→(130,1370), outside the queue's left edge. Use a single moving E marker, then populate tail. It does not cross remaining B/C/D labels or the worker.

## Timed beats, state, and sound

Producer C4; queue E4; worker A4. Silence during suspended admission is meaningful. No repeating error sound, busy-loop ticking, or background music. Each state-changing event has a restrained cue.

| Beat / time | Motion and state | Sound / hold |
|---|---|---|
| 1 · 0–7 s · Full waiting capacity | Establish B/C/D in the three rows, count 3/3, A Running, E at producer Ready. A activity sweep at 2–3; no worker completion. | Worker `work` A4 at 2. Hold 3.5–7. E is outside queue accounting. |
| 2 · 7–15 s · Admission suspends | At 7.5 producer invokes Submit E. At 8.5 outline 3/3 once; producer becomes Waiting for space and E status remains not accepted, Complete no. E stays anchored in producer panel; no failed send or bouncing packet. | Producer `ack` C4 at 7.5; queue subdued `ack` E4 at 8.5. Hold 9–15. The submission is pending, not rejected. |
| 3 · 15–23 s · Worker keeps going | At 16 a restrained worker activity sweep confirms A still runs while producer stays suspended. At 20 A finishes: worker changes to A Done and history A done appears. Queue remains B/C/D, count 3/3; E remains pending. | Worker `work` A4 at 16; worker `ack` A4 at 20. Hold 20.5–23. Completion alone has not removed a waiting item. |
| 4 · 23–31 s · Dequeue opens space | At 23.5 worker takes B; move B into worker 24–25.5. Count becomes 2/3 at removal. C/D shift upward 24–25, leaving a visible empty tail. B becomes Running at 26. Producer remains pending until the next staged admission event. | Queue `send` E4 at 24; worker `work` A4 at 26. Hold 26.5–31 on free place, C/D waiting, B running. This hold slows a scheduling transition for explanation, not a prescribed runtime delay. |
| 5 · 31–39 s · Pending submission resumes | At 31.5 highlight the free tail and E. Move E along its admission path 32–34. At 34 E occupies tail after C/D and count becomes 3/3. Producer changes to Accepted at 35, E status accepted, Complete no. | Producer `send` C4 at 32; queue `store` E4 at 34; producer `ack` C4 at 35. Hold 35.5–39. No E execution. |
| 6 · 39–48 s · Inspect the outcome | At 39.5 emphasize C/D/E waiting, then B Running at 41, then E Accepted / Complete no at 42.5. Footer becomes `Accepted ≠ completed`. | Producer quiet `ack` C4 at 42.5. Hold 43–48 silently. Queue full again, B still running, A done; no new job is generated. |

Key causality: full queue → producer waits while worker runs → A completes → B leaves waiting queue → pending E enters. The producer is a single sequential submitter; it does not generate an unseen backlog of additional pending tasks while waiting.

## Accuracy limits

- This is blocking admission, analogous to awaiting a bounded local put. The producer coroutine suspends; it does not freeze the event loop, queue, or worker. An upstream slowdown occurs because the producer actually awaits admission.
- Queue limit three applies to waiting items only. A/B running is outside that count, and E outside the queue is not yet admitted. A's completion and B's dequeue are deliberately separate events.
- The free-slot reading hold is a teaching expansion. Real scheduling may resume the pending put immediately after dequeue; there is no required multi-second delay.
- Nothing is dropped or rejected. Load shedding is a different policy and is not depicted. Do not use discard icons or retry loops.
- Accepted confirms queue entry, not execution, successful output, durable persistence, or exactly-once delivery. E remains unfinished at the ending.
- A count bound is not a byte budget, throughput limit, or guarantee of timely completion. No production capacity or latency claim follows from the illustrative timings.

## Native350 acceptance and future encoded review

- Inspect individual actual encoded frames at native 350 px width (~622 px high), plus full resolution. 52 px text displays at ~16.9 px. Wrap producer Waiting for space and footer labels as needed; never shrink. Keep worker ID/state on separate lines within its 330 px panel.
- Inspect holds at 5, 12, 21.5, 28, 37, and 45 s, plus before/mid/after suspension, A completion, B dequeue, row shifts, E admission, and acceptance update. Contact sheets alone do not establish legibility.
- At 12 s E must remain outside B/C/D. At 21.5 s A is Done but queue still 3/3. At 28 s B runs, C/D wait, count 2/3. At 45 s C/D/E wait, B runs, count 3/3, E complete remains no.
- Never show four waiting items, count A as queued, start E early, duplicate B during dequeue, or signal acceptance before E enters. C/D ordering must survive shifts. Producer-held E becomes one queued E, not a clone.
- Muted playback must show upstream waiting without worker stoppage. Differentiate pending admission from failure through text, unchanged E identity, and normal worker progress.
- Reproduce suspected visual faults using alternate extraction before flagging. Later decode the full MP4, inspect audio peaks and streaming metadata, and listen before claiming audio was heard. Bind review to the actual full SHA-256; renew encoded review after re-encoding.

Only this plan is assigned. Future implementation uses repository-pinned Puppeteer and cut-local engine copies. No rendering, public/site/shared-skill edits, Git operations, or other lesson work is included.
