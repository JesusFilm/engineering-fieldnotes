# Name the operation

## Scope and grounding

One mechanism: persist an operation identity before sending, then atomically associate that identity with its saved effect. A caller saves k7 with release v1; the service claims the scoped identity and commits ticket 47 together with its operation record. The reply is lost, but both sides retain the information needed for later recovery.

Scope: `video/idempotency/sequence/lessons.json` item 3 and `content/concepts/idempotency.json`. This is a new, protected illustrative scenario, not a retroactive key added to the previous lesson's unprotected ticket. The concept specifies one database transaction and a non-deferrable unique constraint over caller/operation/key. It also requires the caller to retain arguments. Primary source pointers in the concept: PostgreSQL transaction atomicity and uniqueness documentation, and AWS Builders' Library request-identity guidance. This plan follows that local design; it does not claim a commercial API contract.

Five beats, about 50 seconds. No retry replay, competing transaction, changed-payload rejection, key expiry, external API transaction, or recovery query. Those later mechanisms are excluded. The final state is caller outcome unknown, durable caller intent present, and one committed ticket linked to k7.

## Geometry: persistent intent and paired database records

Use a caller operation record above a single database transaction editor. Inside the transaction are two row previews: Tickets and Operations. They appear as Pending together and become Saved at one shared commit boundary. A persistent constraint strip makes clear that a lookup alone is not the safety mechanism. No generic three-box pipeline or physical key/lock metaphor.

1080 × 1920. Background #050506, main #E6E8EC, secondary #8B9099, pending amber #F5A524, saved teal #3FB68B. Title 76 px; main labels 58–64 px; detail 52 px minimum. Values k7 and 47 use 68 px.

| Element | Coordinates x,y,w,h | Content |
|---|---|---|
| Title | 90,140,900,110 | `Name the operation` |
| Caller record | 90,350,900,300 | Caller / `k7 · release v1` / Saved locally |
| Caller outcome | 130,670,820,75 | Not sent → Waiting → Outcome unknown |
| Request readout | 130,800,820,80 | `Create · k7 · v1` |
| Service database frame | 90,1030,900,610 | `One transaction`, header y1070 |
| Constraint strip | 130,1160,820,90 | `Unique: caller + action + key`, two lines if needed |
| Tickets row | 130,1290,820,100 | `Ticket 47 · v1` |
| Operations row | 130,1420,820,100 | `k7 → 47 · v1` |
| Shared transaction state | 130,1550,820,70 | Pending → Committed |
| Footer | 90,1770,900,90 | `Saved identity survives the reply` |

Request path (300,890)→(300,1010). Reply path (780,1010)→(780,760), stopping at y900 before caller arrival. Keep reply annotation `Reply lost` at x570,y920, outside the caller record. No real key values, credentials, or provider names.

The two row previews are visibly enclosed within the same Pending transaction frame, with dashed borders. They are not committed records before the commit event. A single outline changes to solid around both rows simultaneously on commit. The constraint strip persists throughout service work; k7 is shorthand for a scoped identity, not global uniqueness across all callers.

## Beat sheet: motion, state, sound

Caller C4; service E4; database A4. Sparse sound events distinguish local persistence from database commit. Lost reply has no caller receipt sound. No continuous clock or music.

| Beat / time | Motion and state | Sound and hold |
|---|---|---|
| 1 · 0–10 s · Persist intent before send | Establish New protected attempt briefly beneath title. Caller creates k7 with release v1 at 2. At 4 the local record becomes Saved locally, solid outline. Caller still Not sent. Database row region empty. | Caller `store` C4 at 4. Hold 5–10. No request may leave before persistence. |
| 2 · 10–20 s · Send and claim identity | At 10.5 show Create · k7 · v1. Send 12–13.5; caller becomes Waiting. Service shows `No saved match` at 14.5 in transaction state area. At 16 reveal the unique-identity strip and mark `Identity claimed` within Pending transaction. This represents a constrained database insert, not merely a successful lookup. | Caller `send` C4 at 12; service `arrive` E4 at 13.5; database `ack` A4 at 16. Hold 17–20. No competing request is shown. |
| 3 · 20–31 s · Commit both records | At 20.5 reveal Pending Ticket 47 / v1 row. At 22 reveal Pending operation mapping k7→47 / v1. Both stay inside dashed transaction frame. At 25 a single commit pulse changes both to solid Saved rows and transaction state Committed. | Database subdued `work` A4 at 20.5; one `store` A4 at 25, not two success sounds. Hold 26–31. Never show one committed row without the other. |
| 4 · 31–40 s · Protected reply is lost | At 31.5 service prepares reply 47. Send upward 33–34; stop/fade marker at y900 by 35 with Reply lost annotation. Caller remains Waiting until its local deadline at 37, then Outcome unknown. Neither saved record changes. | Service `send` E4 at 33; quiet `thump` E4 at 34.5; caller low `ack` C4 at 37. Hold 38–40. No rollback, new key, or arrival sound. |
| 5 · 40–50 s · Retain the association | At 40.5 emphasize caller k7/v1, then operation mapping k7→47 at 42, then saved ticket 47 at 43.5. Footer appears at 44.5. All records remain fixed and caller outcome remains unknown. | Caller soft `ack` C4 at 40.5; database `ack` A4 at 42. Hold 45–50 silently. No retry or automatic reconciliation. |

The service lookup is informative but insufficient for safety: the identity claim must visibly reference the unique constraint before commit. The atomic commit binds ticket creation and its operation record; caller-side persistence is a separate earlier event, not part of a distributed transaction.

## Accuracy limits

- This single-database design requires enforced uniqueness and atomic storage; a key label or check-then-write alone does not prevent concurrent duplicate effects. Concurrency handling is not demonstrated here.
- Caller, operation type, and key define identity in this design. k7 alone is only a readable alias. Arguments v1 are retained with it; equal text is not proof that separate business actions share identity.
- Caller persistence precedes sending so later recovery can reuse the same intent. No replay is performed in this lesson; retaining identity does not by itself guarantee successful recovery.
- Pending rows represent uncommitted transaction work. Only the shared commit establishes saved ticket and mapping. Atomicity here does not cover an external ticket API or all infrastructure failures.
- The reply loss leaves caller outcome unknown; it does not erase committed data. The viewer sees the saved association, but the caller has not yet read it back.
- Key retention, mismatches, access control, and retry policy require a fuller contract. A key grants no authorization and this scene makes no exactly-once or eternal-deduplication promise.
- Ticket 47, k7, release v1, and timings are synthetic. No deployment is executed.

## Native350 acceptance and later encoded review

- Inspect individual actual encoded frames at native 350 px width (~622 px high), plus full size. 52 px text displays at ~16.9 px; 68 px IDs at ~22 px. Wrap the constraint label into two lines with dedicated space; never shrink it or overlap the first record row.
- Inspect holds at 7, 18, 23.5, 28, 39, and 47 s, plus before/mid/after local save, identity claim, shared commit, reply loss, and timeout. Contact sheets cannot establish readability.
- At 7 s caller record must already be saved before transmission. At 23.5 s both database rows must read Pending. At 28 s both must become committed together. At 47 s caller k7/v1 and database k7→47 must remain while outcome is unknown.
- Never show check-then-write as the complete safeguard: the unique-constraint identity claim must be explicit. No separate commit flashes, orphan ticket, lost mapping, generated replacement key, or actual retry.
- Reply marker must stop before caller; no successful receipt, ticket count increment on reply, or rollback after timeout. Caller-side storage must remain distinct from database transaction scope.
- Silent playback must convey persistence before send, constrained identity, paired commit, and survival after reply loss. Keep readable holds rather than compressing to a fixed runtime.
- Reproduce suspected visual faults with alternate extraction before flagging. Later decode the complete MP4, inspect audio peaks and streaming metadata, and listen before claiming audio was heard. Bind review to the actual full SHA-256 and renew encoded inspection after any re-encode.

Only this plan is assigned. Future implementation uses repository-pinned Puppeteer and cut-local engine copies. No rendering, public/site/shared-skill edits, Git operations, or other lesson work is included.
