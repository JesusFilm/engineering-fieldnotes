# One intended operation

## Scope and grounding

One mechanism: saving a release ticket is the business effect; the network response subsequently reports that saved effect. Show one normal successful attempt producing ticket 47, with a readable interval between database commit and caller receipt.

Scope: `video/idempotency/sequence/lessons.json` item 1 and `content/concepts/idempotency.json`. The sequence defines the ticket example and save-before-response ordering. The concept distinguishes intended effects from responses and uses an illustrative in-house ticket service backed by a database. This plan does not claim behavior of a commercial tracker.

Five beats, 43 seconds. No operation key, retry, lost response, duplicate detection, concurrent transaction, changed payload, expiry, or recovery. One successful attempt cannot demonstrate idempotency; it establishes the effect that later lessons must preserve.

## Geometry: saved ticket versus received receipt

Use a **release-ticket request form** above a service workspace. Inside the service workspace, a database table contains the saved ticket. A separate caller receipt appears only after the return message. The ticket row persists throughout response travel, making it clear that the reply reports a pre-existing record rather than creating it.

1080 × 1920. Background #050506, primary #E6E8EC, secondary #8B9099; pending amber #F5A524; saved/received teal #3FB68B. Title 76 px, primary labels 60–64 px, secondary 52–56 px minimum. No paragraph captions or physical ticket-printing metaphor.

| Element | Coordinates x,y,w,h | Content |
|---|---|---|
| Title | 90,140,900,160 | `One intended` / `operation` |
| Caller form | 90,360,900,350 | Caller; `Create release ticket`; `Release v1`; state Ready/Waiting/Received |
| Service workspace | 90,990,900,610 | Ticket service heading y1030; state y1120 |
| Database table | 130,1230,820,260 | Database; `Ticket` / `Release`; empty then `47` / `v1` |
| Saved count | 130,1510,820,60 | `Saved tickets: 0` → 1 |
| Caller receipt | 130,590,820,90 | initially empty; final `Created ticket 47` |
| Phase annotation | 90,1710,900,80 | `Effect saved` then `Response received` |
| Final footer | 90,1810,900,60 | `One saved ticket`, 56 px |

Keep form state at x730,y420 so it does not overlap the receipt. Ticket row values use 72 px numerals/characters, making the same identifier easy to match at phone size. The caller's receipt uses a document outline labeled Response, while the database row stays a table record; they must not look like two saved tickets.

Request route (300,740)→(300,960). Response route (780,960)→(780,740). Write indicator inside service: (540,1160)→(540,1210). These are different operations: network request, database write, network response. The database is inside the service's visual workspace to show ownership, not a generic third stage in a pipeline. No data moves out of the database during response creation.

## Beat sheet: time, motion, state, sound

Caller C4, service E4, database A4. Separate database store and caller receipt sounds, with silence between them. No background music, looping clock, or celebratory effects implying stronger guarantees.

| Beat / playback | Motion and persistent state | Sound / hold |
|---|---|---|
| 1 · 0–7 s · Define the intended effect | Establish request form Create release ticket / Release v1. Database table is empty; Saved tickets 0. At 3 outline the form once. Caller Ready, service Idle, receipt absent. | Caller `ack` C4 at 3. Hold 3.5–7. No ticket exists yet. |
| 2 · 7–16 s · Request reaches service | Caller becomes Waiting at 7.5. Send request marker downward 9–10.5; service becomes Creating at arrival. Its write indicator appears at 12, but database table remains empty during this preparation. | Caller `send` C4 at 9; service `arrive` E4 at 10.5 and restrained `work` E4 at 12. Hold 13–16. No success response yet. |
| 3 · 16–25 s · Save the effect | At 16.5 write indicator reaches database table. At 18 commit the ticket row 47 / v1, change Saved tickets to 1, and service state to Saved. Reveal Effect saved at 19. Caller remains Waiting with no receipt. | Database `store` A4 at 18. Hold 19.5–25: one saved ticket already exists despite no caller response. This is the central teaching frame. |
| 4 · 25–34 s · Report the saved identifier | At 25.5 service creates a small response marker labeled 47 in the stationary service status line. Marker travels upward 27–28.5 without disturbing database row. At 28.5 caller becomes Received; receipt Created ticket 47 resolves by 29.5. | Service `send` E4 at 27; caller `arrive` C4 at 28.5. Hold 30–34. Saved tickets remains 1 throughout. |
| 5 · 34–43 s · Match effect and report | At 34.5 emphasize database 47, then receipt 47 at 36.0. Phase annotation becomes Response received. At 37 reveal One saved ticket footer. All state remains fixed. | Caller soft `ack` C4 at 36. Hold 38–43 silently. No second request, new row, or reset. |

The response is a report about ticket 47, not a second ticket or the commit trigger. Maintain an empty caller receipt during the full saved-before-replied hold. No failure is introduced merely to explain this distinction.

## Accuracy limits

- This is a normal successful creation, not evidence that repeating the request is safe. Do not show an idempotency key, exactly-once badge, retry button, or duplicate-suppression claim.
- Saved represents the database commit in this local illustration. A request reaching the service or entering Creating does not by itself establish a saved effect.
- Database durability depends on its actual contract/configuration. The illustration does not promise survival of every infrastructure failure or atomicity with external services.
- Ticket 47 is an illustrative identifier, not a predicted sequential allocation guarantee. Release v1 is synthetic request data; no deployment executes.
- Receiving the response tells this caller the service reported ticket 47. The saved row is the separate depicted effect. The plan does not infer outcome rules for absent or failed responses; that belongs to later lessons.
- Playback holds are pedagogical and carry no measured latency, throughput, or transaction-duration claims. Authorization is assumed satisfied, not conferred by the request text.

## Native350 acceptance and future review

- Inspect individual actual encoded frames at native 350 px width (~622 px high), plus full size. 52 px text displays at ~16.9 px; ticket numerals 72 px at ~23.3 px. Wrap Create release ticket if needed, preserving font size and spacing from caller status.
- Inspect holds at 5, 14, 22, 32, and 40 s, plus before/mid/after service arrival, database commit, response departure/arrival, and receipt appearance. Contact sheets are not sufficient for legibility.
- At 14 s table must be empty with caller Waiting. At 22 s table contains 47/v1 and Saved tickets 1 while caller still waits. At 32 s caller receipt and database must identify the same ticket.
- Saved count changes exactly once, on commit. No row before commit, early success receipt, copied saved row at caller, removed database row during reply, or second ticket on receipt.
- Keep write indicator inside the service and request/response paths distinct. No physical printing, delivery truck, or paragraph narration. Silent playback must explain effect-before-report through persistent state.
- Reproduce suspected visual faults with alternate extraction before flagging. Later decode the full MP4, inspect audio peaks and streaming metadata, and listen before claiming actual audio was heard. Bind review to the actual full SHA-256 and renew encoded inspection after any re-encode.

Only this plan is assigned. Future implementation uses repository-pinned Puppeteer and cut-local engine copies. No rendering, public/site/shared-skill edits, Git operations, or other lesson work is included.
