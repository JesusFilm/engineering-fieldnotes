# A backlog grows

## Scope and grounding

One mechanism: jobs arrive faster than the single worker finishes them, so waiting work accumulates. Start a new scenario with A already Running. B, C, and D arrive separately and remain waiting; A does not finish during the shown interval.

Scope: `video/queues-and-backpressure/sequence/lessons.json` item 3 and `content/concepts/queues-and-backpressure.json`. The concept distinguishes waiting backlog from executing calls and states that sustained excess arrivals grow backlog unless another policy intervenes. This finite burst demonstrates the local imbalance, not a measurement of indefinite overload.

Five beats, 42 seconds. No full-queue limit, blocking, rejection, shedding, extra worker, retry, dequeue, or recovery. Three visible waiting rows are the observed backlog, not a declared capacity of three. The final state intentionally remains busy and queued.

## Geometry: growing waiting list beside a fixed worker allocation

A software queue-monitor screen shows a full-width waiting list and a separate fixed-size worker pane below it. Each arrival appends a row, making the waiting area progressively occupied. The worker allocation stays one slot with A anchored in place. Counts make arrivals and completions distinguishable without tiny charts or decorative traffic.

1080 × 1920. Background #050506, primary #E6E8EC, secondary #8B9099, Running amber #F5A524. Waiting rows use neutral outlined borders and explicit Waiting labels. No red failure state: accepting jobs can succeed while the backlog grows. Title 76 px; primary text 60 px; row labels 58 px; metadata 52 px minimum.

| Element | Geometry x,y,w,h | Labels / behavior |
|---|---|---|
| Title | 90,140,900,110 | `A backlog grows` |
| Scenario label | 90,310,900,70 | `One worker · new scenario`, 52 px |
| Producer arrival strip | 90,430,900,120 | `Incoming B`, then C, then D |
| Waiting-list header | 90,650,900,80 | `Waiting: 0` → 1 → 2 → 3 |
| B row | 130,770,820,115 | `Job B` left, `Waiting` right |
| C row | 130,920,820,115 | `Job C` left, `Waiting` right |
| D row | 130,1070,820,115 | `Job D` left, `Waiting` right |
| Worker pane | 90,1300,900,210 | `Worker 1` / `Job A · Running` |
| Window totals | 90,1570,900,140 | `New arrivals: 0/1/2/3` / `Completed: 0`, 56 px |
| Footer | 90,1770,900,80 | `Waiting grows · worker stays busy`, two lines if needed |

Do not draw three empty slot boxes initially. Show an empty list area; rows materialize on admission. A faint continuation line beneath the list implies more list space rather than a hard queue capacity. Never label Full.

Arrival path: (540,570)→(540,620), then a short vertical reveal into the next row position. Each arriving ID becomes one waiting row; the producer strip clears afterward. No travel toward the worker occurs in this cut. Worker activity is a subtle sweep within (620,1400,250,20), not a predicted completion percentage. A remains visible with Running throughout.

## Timed beats, motion, state, and sound

Producer C4, queue E4, worker A4. Use short send/store cues for arrivals; a quiet work cue establishes ongoing worker activity. Do not create endless ticking or repeated noise to imply slowness. Holds remain readable and mostly silent.

| Beat / playback | Motion and state | Sound and hold |
|---|---|---|
| 1 · 0–7 s · Worker already occupied | Establish Worker 1 / A Running, empty waiting list, Waiting 0. Totals explicitly count this observation window: New arrivals 0, Completed 0. A small activity sweep at 2–3 confirms execution. | Worker `work` A4 at 2. Hold 3.5–7. A's earlier admission is outside the window. |
| 2 · 7–15 s · B waits | Incoming B appears at 7.5. Transfer to list 9–10.5; settle B's row and increment Waiting/New arrivals to 1 at 10.5. A remains Running and Completed stays 0. | Producer `send` C4 at 9; queue `store` E4 at 10.5. Hold 11–15 with B visibly separate from A. |
| 3 · 15–23 s · C joins B | Incoming C appears at 15.5. Transfer 17–18.5 into second row. Increment Waiting/New arrivals to 2. B stays in place and Waiting; neither B nor C moves toward the worker. | Producer `send` C4 at 17; queue `store` E4 at 18.5. One subdued worker `work` A4 at 20, without any completion mark. Hold 19.5–23. |
| 4 · 23–31 s · D increases backlog | Incoming D appears at 23.5. Transfer 25–26.5 into third row. Waiting/New arrivals become 3. A's worker pane retains the same size and state. Completed remains 0. | Producer `send` C4 at 25; queue `store` E4 at 26.5. Hold 27–31. No Full indicator, blocked producer, or error. |
| 5 · 31–42 s · Compare accumulation with execution | At 31.5 outline Waiting 3, then at 33 outline the unchanged Worker 1 / A Running. At 35 emphasize New arrivals 3 and Completed 0 together. Reveal footer at 36. Activity sweep may settle but Running remains explicit. | Queue soft `ack` E4 at 31.5; worker subdued `work` A4 at 33. Hold 36.5–42 silently. End with B/C/D still Waiting and A still Running. |

The list grows through admission, not by duplicating jobs or counting A as queued. The worker remains active, not crashed. Keep arrival intervals wide enough to read each new row and unchanged worker state before the next arrival.

## Accuracy limits

- This finite observation window contains three new arrivals and no completions. It illustrates accumulation while A runs; it does not prove the workload stays overloaded forever. Sustained arrivals above service capacity would require an ongoing rate argument, not extrapolation from these three jobs.
- Waiting 3 excludes A. There are four unfinished jobs visible overall: one running plus three waiting. New arrivals excludes A because it was already executing when the window began.
- A queue holds work; it adds no execution slots. It can absorb a burst, but whether the worker later catches up depends on arrivals and completion rate. Do not show a growing queue making A faster.
- Ordering B/C/D is this example's arrival order. No general fairness, global FIFO, priority, durability, or exactly-once guarantee is taught.
- Three visible rows are not a configured bound. Backpressure, overflow, producer waiting, and dropping jobs belong to later lessons and must not appear here.
- Running activity is illustrative, with no CPU percentage, known remaining duration, or measured latency. A may be slow but is not shown failing. The finite ending deliberately leaves the work unfinished.

## Native350 acceptance and future encoded checks

- Inspect actual individual encoded frames at native 350 px width (~622 px high), plus full resolution. 52 px text becomes ~16.9 px; 58 px row text ~18.8 px. Use two-line footer and totals rather than shrinking text. Keep row labels and state labels separated by at least 24 source pixels.
- Inspect holds at 5, 13, 21, 29, and 39 s, plus before/mid/after every arrival, row materialization, counter update, and final emphasis. Contact sheets do not establish legibility.
- At 13 s identify B Waiting and A Running. At 21 s identify B/C Waiting. At 39 s identify B/C/D Waiting, A Running, three new arrivals, and zero completions. No ambiguity between waiting and total unfinished counts.
- Counter increments once per accepted arrival, synchronously with row arrival. No early count, duplicate ID, disappeared B/C, hidden dequeue, completed A, or progress percentage.
- No empty fixed-capacity slots, Full badge, blocked producer, added worker, or queue-to-worker movement. The growth must read as waiting accumulation, not parallel execution.
- Muted playback must communicate more waiting work with unchanged active capacity. Meaningful motion comes from append-only rows, persistent worker state, and independent arrival/completion counts.
- Reproduce suspected visual defects through alternate extraction before flagging. Later decode the full MP4, inspect audio peaks and streaming metadata, and listen before claiming actual audio was heard. Bind encoded review to the actual full SHA-256 and renew after re-encoding.

Only this plan is assigned. Future implementation uses repository-pinned Puppeteer and a cut-local engine copy. No rendering, public/site/shared-skill edits, Git operations, or other lesson work is included.
