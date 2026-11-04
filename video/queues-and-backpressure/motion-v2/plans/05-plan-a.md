# Choose an overload policy

## Scope and grounding

One mechanism: a configured reject-new policy returns an explicit rejection when the queue is full. The producer handles that result as Not admitted rather than Accepted or a pending submission. Existing queued jobs and worker execution remain unchanged.

Scope: `video/queues-and-backpressure/sequence/lessons.json` item 5 and `content/concepts/queues-and-backpressure.json`. [Python asyncio queues](https://docs.python.org/3/library/asyncio-queue.html), inspected 2026-10-21, distinguishes waiting put from put_nowait raising QueueFull. This is a conceptual reject-new result, not literal network protocol or broker configuration. The concept's RabbitMQ discussion additionally motivates configuring overflow deliberately; no default broker behavior is assumed.

Five beats, 42 seconds. Show only rejection, not a three-way animated comparison. Waiting and dropping are different alternatives, noted in accuracy limits. No retry, cancellation, oldest-item eviction, queue drain, extra worker, or capacity repair. A rejected job stays visible as a producer-side outcome record and never executes.

## Layout: submission form and rejection receipt

Use a software **submission detail screen** with an explicit policy header, a compact full waiting-list view, and a producer outcome receipt. A request attempt reaches the queue boundary; a labeled rejection returns to the producer. The full queue remains visibly occupied before and after. This avoids physical barrier metaphors or a generic three-box flow.

1080 × 1920. Background #050506, primary #E6E8EC, secondary #8B9099, running amber #F5A524, rejection red #E5484D with explicit text. No green success state on the submission. Title 76 px; main labels 58–64 px; secondary 52 px minimum.

| Element | Coordinates x,y,w,h | Content |
|---|---|---|
| Title | 90,140,900,170 | `Choose an` / `overload policy` |
| Policy header | 90,360,900,90 | `When full: reject new`, 56 px |
| Producer panel | 90,540,900,320 | Producer; `Submit E`; result area y735 |
| Queue panel | 90,1110,570,430 | `Waiting: 3 / 3`; rows B, C, D at y1230,1330,1430 |
| Worker panel | 710,1110,280,430 | Worker / A / Running, separate lines |
| Outcome receipt | 90,1610,900,130 | `E: not admitted` / `Execution: not started` |
| Footer | 90,1790,900,70 | `Rejection is an outcome`, 54 px |

Queue rows are 490×75 at x130 with stable identities. The three-place bound is explicit, unlike an unbounded list. Worker A is not counted among waiting jobs.

Attempt path (300,880)→(300,1080). Return path (580,1080)→(580,880). A small request marker means submission intent, not a fourth accepted job. E remains in the producer's record throughout; no E row appears in the queue. On receipt of rejection, the request marker disappears and the producer displays Rejected / Queue full. An error receipt is not drawn as a completed job.

## Beat sheet: motion, state, and sound

Producer C4; admission handler E4; worker A4. Reject cue is a short low `thump`, not an explosion or worker crash. No repeating retries, clock loop, or music.

| Beat / time | Motion and state | Sound / hold |
|---|---|---|
| 1 · 0–8 s · Establish configured policy | Show When full: reject new, Waiting 3/3 with B/C/D, worker A Running. Producer has E Ready. At 3 outline the policy and full count once. | Admission handler `ack` E4 at 3; worker subdued `work` A4 at 4. Hold 4.5–8. Policy is configured before the attempt, not chosen after seeing its outcome. |
| 2 · 8–17 s · Attempt submission | At 8.5 producer becomes Submitting E. Send attempt marker 10–11.5 to the queue admission edge, without entering a row. At 12 highlight 3/3 and reject-new header. B/C/D remain fixed. | Producer `send` C4 at 10; admission handler `arrive` E4 at 11.5. Hold 12.5–17. This short staging pause is processing/illustration time, not waiting for capacity. |
| 3 · 17–25 s · Return explicit rejection | At 17.5 generate a Rejected / Queue full response label at the queue edge. Return marker 19–20.5 to producer. Producer status becomes Rejected at 20.5; no admission count or queue row changes. | Admission handler `thump` E4 at 17.5 and `send` E4 at 19; producer `arrive` C4 at 20.5. Hold 21–25. Worker continues Running. |
| 4 · 25–33 s · Handle the result | At 25.5 the producer replaces its submit control with a retained outcome entry, `E: not admitted`. At 27 show Execution: not started. Add a small terminal status label `Attempt ended` beneath Rejected, 52 px. No automated follow-up occurs. | Producer `store` C4 at 25.5. Hold 28–33. The attempt has finished with an explicit negative outcome, rather than silently waiting or claiming success. |
| 5 · 33–42 s · Compare unchanged work | At 33.5 outline B/C/D, then A Running at 35, then E's producer outcome at 36.5. Reveal Rejection is an outcome footer at 37. Queue count stays 3/3. | Worker quiet `work` A4 at 35; producer `ack` C4 at 37. Hold 38–42 silently. No retry, discarded old job, or queue drain. |

The producer handles rejection by recording and exposing it. This is sufficient for this lesson; choosing retry/backoff or another business response would introduce another mechanism. E's displayed record is a retained status reference, not a pending queue admission or an executing job.

## Accuracy limits

- Reject-new is explicitly configured here. A bounded queue does not universally reject: another implementation may wait, drop new work, or evict old work. No such alternative runs in this cut.
- A submission attempt is not admission. The full count never becomes four, and no success acknowledgment appears. No automatic retry is implied by a returned error.
- Rejection does not remove B/C/D or stop A. It reports that E was not accepted by this admission attempt; it does not claim all previously accepted work will succeed.
- Attempt ended is not job completed. E has no execution result because it never ran. Keeping its producer-side outcome record does not mean it is still waiting to enter the queue.
- The wait while reading the full condition is pedagogical staging, not blocking-until-capacity semantics. Queue occupancy stays full throughout, so admission never becomes possible in the shown window.
- No durability, exactly-once, network acknowledgment, throughput, or SLA guarantee is made. Worker A's Running state and timings are illustrative. No infinite retry or unlimited pending submissions are introduced.

## Native350 acceptance and future encoded review

- Inspect individual encoded frames at native 350 px width (~622 px high), plus full resolution. 52 px labels display at ~16.9 px. Break the policy and outcome lines rather than shrinking them. Worker labels must fit as separate lines in the narrow panel.
- Inspect holds at 5, 14, 23, 30, and 40 s, plus before/mid/after request arrival, rejection creation, response arrival, and outcome recording. Contact sheets alone cannot establish legibility.
- At 14 s see full B/C/D and an attempted submission, not E in the queue. At 23 s see explicit Rejected / Queue full. At 30 and 40 s identify E not admitted/not started, with A still Running and queued jobs retained.
- Ensure the count remains 3/3 at every frame; no fourth row, deleted old row, duplicated E, green acceptance cue, or task-completion badge. No direct E→worker path.
- Attempt ended must be subordinate to Rejected so it cannot be mistaken for successful job completion. The negative result must remain readable in the final hold.
- Muted playback must distinguish attempt, rejection response, and producer handling. Avoid metaphorical gates, bouncing packets, and decorative shake that suggests the entire queue failed.
- Reproduce suspected visual faults with alternate extraction before flagging. Later decode the complete MP4, inspect audio peaks and streaming metadata, and listen before claiming audio was heard. Bind review to the actual full SHA-256 and renew encoded review after re-encoding.

Only this plan is assigned. Future implementation uses repository-pinned Puppeteer and cut-local engine copies. No rendering, public/site/shared-skill edits, Git operations, or other lesson work is included.
