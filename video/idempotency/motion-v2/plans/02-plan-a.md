# A missing reply

## Scope and grounding

One mechanism: a create commits successfully, but its response never reaches the caller. The caller's timeout ends waiting without establishing whether the effect happened. Preserve the committed ticket alongside the caller's Unknown state.

Scope: `video/idempotency/sequence/lessons.json` item 2 and `content/concepts/idempotency.json`. The concept's illustrative in-house service saves ticket 47 before losing its reply. This cut isolates that uncertainty window; it does not implement the stable-operation-ID solution. The final cue can name the need for operation identity without demonstrating keys, replay, or deduplication.

Five beats, 44 seconds. Exactly one create request and one committed ticket. No actual retry, ticket 48, reconciliation query, new key, changed parameters, or recovery. A second unprotected create could duplicate the effect; that risk is introduced as a short final annotation, not acted out as an inevitable result.

## Visual grammar: caller observation versus saved effect

Use two labeled horizontal bands: **Caller view** above, **Service record** below. A request travels down, a response starts back up and ends inside a clearly labeled undelivered segment. The lower record remains unchanged while the upper waiting deadline expires. The contrast between these two views is the lesson, not a generic three-box pipeline.

1080 × 1920. Background #050506, primary #E6E8EC, secondary #8B9099; waiting/unknown amber #F5A524; saved record teal #3FB68B; failed delivery red #E5484D used only on the return route. Title 76 px, main labels 60–64 px, metadata 52–56 px. Unknown is not styled as a confirmed failed operation.

| Element | Geometry x,y,w,h | Content |
|---|---|---|
| Title | 90,140,900,110 | `A missing reply` |
| Caller view | 90,350,900,400 | Caller; `Create release ticket`; Waiting, later `Outcome unknown` |
| Caller deadline | 140,680,800,12 | left Start, right Timeout; labels 52 px above strip |
| Request route | (300,790)→(300,1100) | downward, single marker |
| Return route | (780,1100)→(780,790) | upward, interrupted at y950 |
| Return status | 390,930,560,90 | `Reply not delivered`, 54 px |
| Service record | 90,1140,900,450 | Ticket service; saved database row `47 · release v1` at y1370 |
| Effect count | 130,1510,820,60 | `Saved tickets: 0` → 1 |
| Contrast footer | 90,1690,900,90 | `Timeout ≠ no effect`, 60 px |
| Final cue | 90,1800,900,70 | `Retry needs operation identity`, 52 px |

Database row begins empty. Label it Database inside the service record at y1290, 56 px. The caller must never display ticket 47 as received data. The response marker may be labeled 47 beside the service before launch, but no receipt is populated in the caller view.

Deadline cursor is a simple elapsed-wait line, not server progress. It begins when the request is sent and continues after the lost reply. No numerical timeout value or production default is asserted. The exact wait shown is pedagogical.

## Beat sheet: time, motion, state, sound

Caller C4, service E4, database A4. A short muted delivery failure cue differs from the caller timeout cue. No database rollback sound or repeated retry ticking.

| Beat / time | Motion and state | Sound / hold |
|---|---|---|
| 1 · 0–9 s · Send the create | Establish empty database row and Saved tickets 0. Caller sends at 3; marker travels down 3–4.5. Caller becomes Waiting and deadline cursor begins. Service becomes Creating at 4.5. | Caller `send` C4 at 3; service `arrive` E4 at 4.5. Hold 5–9. No saved row or success report yet. |
| 2 · 9–18 s · Commit succeeds | At 10 service writes the row; at 11 show database ticket 47 / release v1 and Saved tickets 1. Service state becomes Saved. Caller remains Waiting. | Database `store` A4 at 11. Hold 12–18 on saved effect before any report arrives. Deadline advances slowly independently. |
| 3 · 18–27 s · Reply is lost | Service creates return marker at 18.5 and sends it upward at 20. At 21 it reaches y950, stops, then fades by 22 while Reply not delivered appears. Return route above y950 remains empty. Database row stays saved; caller stays Waiting. | Service `send` E4 at 20; short muted `thump` E4 at 21. No caller arrival sound. Hold 22.5–27. The failed-delivery label is explanatory knowledge, not an error message delivered to the caller. |
| 4 · 27–35 s · Caller times out | Deadline reaches its right endpoint at 28.5. Caller Waiting becomes `Timed out` then, on the next line, `Outcome unknown`. Keep saved ticket 47 unchanged. Reveal Timeout ≠ no effect at 30. | Caller low `ack` C4 at 28.5. Hold 30.5–35. Do not mark the database operation failed or erase its row. |
| 5 · 35–44 s · Preserve uncertainty and effect | At 35.5 outline caller Outcome unknown, then database Saved tickets 1 at 37. At 38.5 reveal Retry needs operation identity. No retry button is activated and no new message appears. | Caller subdued `ack` C4 at 38.5. Hold 39–44 silently. End with uncertainty unresolved for the caller and the known saved effect visible to the viewer. |

The demonstration shows more than the caller knows. The caller receives neither a successful response nor a reliable message saying the database commit failed. Its timeout is local. The stopped return marker illustrates loss of this reply; it must not resemble a cancellation message traveling back to undo the service's work.

## Accuracy limits

- This particular operation committed before response loss. In other timeouts the request may not have arrived, may still be running, or may have failed. Timeout alone does not distinguish these cases; do not generalize that every timeout means success.
- No actual retry occurs. An unprotected create could add another ticket, but this cut does not claim duplication is inevitable or that arbitrary retries are safe.
- Stable operation identity is only a motivation cue. A key alone is not deduplication, authorization, or a complete idempotency contract; enforcement, persistence, and recovery belong to later lessons.
- Ticket 47 is synthetic and belongs to an illustrative local service. No commercial tracker or network-loss mechanism is specified. Commit remains saved in this modeled run; no universal durability guarantee follows.
- The lost-reply label belongs outside the caller view because it describes the scenario's ground truth. The caller's only new evidence is that its deadline elapsed without a usable response.
- Deadline and animation timing are illustrative. Stopping caller waiting does not cancel or roll back committed work. No deployment or operational action is performed beyond saving the synthetic ticket.

## Native350 acceptance and future encoded review

- Inspect actual individual encoded frames at native 350 px width (~622 px high), plus full resolution. 52 px detail text becomes ~16.9 px. Split long request/final labels across two lines if needed without shrinking. Keep Outcome unknown large and distinct from Timed out.
- Inspect holds at 6, 14, 24, 32, and 41 s, plus before/mid/after commit, response disappearance, deadline expiry, and unknown-state reveal. Contact sheets alone are insufficient.
- At 14 s see ticket saved while caller waits. At 24 s see undelivered reply with saved row intact. At 32 and 41 s see caller uncertainty alongside one saved ticket; caller must never show received ticket 47.
- Saved count increments once on commit and stays 1. Exactly one request; no duplicate row, retry marker, rollback, red database failure, or inferred no-effect result. No arrival sound at caller for the lost response.
- Return loss occurs before caller boundary; the deadline expires afterward. Ensure stopped marker and Reply not delivered text never collide or look like a response delivered successfully.
- Muted playback must explain the difference between transport observation and persisted effect through the two views, not paragraph captions. Preserve the saved-before-loss and unknown-with-saved-effect holds.
- Reproduce suspected visual faults using alternate extraction before flagging. Later decode the full MP4, inspect audio peaks and streaming metadata, and listen before claiming actual audio was heard. Bind review to the actual full SHA-256 and renew encoded review after re-encoding.

Only this plan is assigned. Future implementation uses repository-pinned Puppeteer and cut-local engine copies. No rendering, public/site/shared-skill edits, Git operations, or other lesson work is included.
