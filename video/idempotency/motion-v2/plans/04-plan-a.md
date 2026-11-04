# Retry the same key

## Scope and grounding

One mechanism: a retry carries the caller's saved operation key and unchanged parameters; the service matches the retained operation record and returns its previous result instead of creating another ticket.

Scope: `video/idempotency/sequence/lessons.json` item 4 and `content/concepts/idempotency.json`. The concept defines an illustrative service contract binding scoped key k7 and release v1 to ticket 47. The saved ticket and operation record already exist when this cut begins; the caller previously lost its reply. This is not a commercial ticket API guarantee.

Five beats, 44 seconds. No first-write transaction replay, new-key generation, changed-parameter branch, concurrent duplicate race, expiry, retry loop, or provider comparison. Key retention and matching payload are explicit assumptions. The first attempt is history, not another animated request.

## Geometry: matching request and saved-operation inspector

Use a caller retry form above a service lookup view. Inside that view, align incoming key/payload values with a saved operation row; a reference from that row selects the already-existing ticket. A persistent ticket-count label stays at 1 while the response travels. This is a record lookup and return, not repeated create animations.

1080 × 1920. Background #050506, primary #E6E8EC, secondary #8B9099, matching fields amber #F5A524, retained result teal #3FB68B. Match uses field outlines plus labels, never color alone. Title 76 px, actor/action labels 60 px, details 54 px minimum, key and ticket ID 68 px.

| Element | Coordinates x,y,w,h | Content |
|---|---|---|
| Title | 90,140,900,110 | `Retry the same key` |
| Caller saved request | 90,350,900,300 | Caller; `Saved: k7 · release v1`; `Result unknown` |
| Retry readout | 130,750,820,80 | `Retry: k7 · release v1` |
| Service inspector | 90,980,900,650 | Ticket service; `Lookup saved operation` |
| Saved operation row | 130,1140,820,170 | `k7 · release v1`; `Result: ticket 47` |
| Existing ticket row | 130,1410,820,100 | `Ticket 47 · release v1` |
| Count | 130,1540,820,60 | `Saved tickets: 1` |
| Final annotation | 90,1760,900,90 | `Same operation · same effect` |

Request route (300,850)→(300,960), response route (780,960)→(780,680). Within the inspector, reference line (540,1320)→(540,1390) selects ticket 47 without moving or copying a ticket into storage. A temporary Match label at (650,1060,300,60) appears after lookup/payload comparison. Caller result replaces Result unknown only on response receipt.

The operation row and ticket row are two related records, not two tickets. Label both explicitly. Keep their relation visible in the final hold. Do not show a second empty ticket slot or speculative ticket 48: there is no attempted new creation in this matching branch.

## Beat sheet: time, motion, state, sound

Caller C4, service E4, database A4. Lookup uses `ack`, not the `store` effect used for creating records. No music, continuous clock, or repeated failed-response sounds.

| Beat / time | Motion and persisted state | Sound / hold |
|---|---|---|
| 1 · 0–8 s · Retained identity and effect | Establish caller Saved k7 / release v1, Result unknown. Show service's existing operation mapping and ticket 47 with Saved tickets 1. A short label `Earlier reply lost` sits under caller state through 6 s, then clears. | Caller quiet `ack` C4 at 3 as saved identity is outlined. Hold 4–8. All database records pre-exist this retry. |
| 2 · 8–17 s · Resend the saved request | At 8.5 populate Retry readout from the saved caller fields; leave the saved record intact. Caller becomes Waiting. Hold 9–11 for matching text. Send one request marker 11–12.5; service begins lookup. | Caller `send` C4 at 11; service `arrive` E4 at 12.5. Hold 13–17. No key regeneration or argument change. |
| 3 · 17–27 s · Resolve existing operation | At 17.5 highlight k7 in readout and saved row together. At 19 highlight matching release v1 values. At 20.5 show Match and trace the saved reference down to existing ticket 47. Saved tickets stays 1. | Database `ack` A4 at 17.5 and 20.5. Hold 21.5–27. No insert animation, transaction commit, or new stored row. |
| 4 · 27–35 s · Return previous result | At 27.5 service prepares `Result: 47` from the saved row. Send response 29–30.5; caller becomes `Received ticket 47` by 31.5. The saved operation mapping and ticket remain unchanged. | Service `send` E4 at 29; caller `arrive` C4 at 30.5. Hold 32–35. The moving response is a report, not a second persisted effect. |
| 5 · 35–44 s · Verify one effect remains | At 35.5 emphasize caller's received 47, then database ticket 47 at 37. At 38 outline Saved tickets 1, reveal Same operation · same effect. Retain saved key/payload in caller. | Caller restrained `ack` C4 at 38. Hold 39–44 silently. No second retry or reset. |

The key/payload comparison precedes the returned result. The saved count is visible before, during, and after the retry, so unchanged storage is evidence rather than a concluding assertion. The caller finally gains knowledge of the result; the service does not create a new effect at receipt time.

## Accuracy limits

- This behavior depends on the illustrated service contract and an unexpired retained operation record. A raw POST, a key string alone, or a prompt instruction does not confer retry safety.
- k7 is an alias for identity scoped by caller and operation type. Payload release v1 remains identical. A separate intended operation needs separate identity even if its text matches; this cut does not illustrate that branch.
- Returning ticket 47 is this contract's saved-result behavior. Idempotency does not universally require identical response bytes or exactly-once logging and incidental effects.
- Original atomic storage and uniqueness enforcement are assumed established. This cut's lookup alone must not be presented as a sufficient design for simultaneous first attempts.
- No key expiry or mismatch occurs. Do not suggest retries after arbitrary retention periods are safe, or replay a different payload without checking it.
- Response loss does not erase the business effect. The opening caller uncertainty is separate from the viewer's knowledge of retained records. No external side effect or deployment is performed.
- Timings are illustrative; no retry delay recommendation, performance benefit, or general success guarantee is made. Authorization is assumed checked independently of possession of k7.

## Native350 acceptance and future encoded review

- Inspect individual actual encoded frames at native 350 px width (~622 px high), plus full resolution. 54 px details become ~17.5 px; 68 px IDs ~22 px. Wrap saved/retry labels into two short lines if needed; keep key and payload readable without zoom.
- Inspect holds at 5, 10, 15, 24, 33, and 41 s, plus before/mid/after request arrival, field comparison, reference selection, and response receipt. Contact sheets alone cannot establish phone readability.
- At 5 s see caller uncertainty with one pre-existing ticket. At 24 s see k7 and v1 matched to ticket 47. At 41 s see caller received 47 and Saved tickets still 1.
- No mutation of saved key/payload, inserted ticket, duplicate stored row, new ID, early receipt, or `store` sound implying a new create. Exactly one retry request and one result response occur in this cut.
- The operation mapping and ticket row must be clearly labeled as different record types. Reference selection cannot look like moving the ticket out of storage. Count stays 1 on every frame.
- Muted playback must convey reuse of stored identity/result through matching fields and persistent records. Keep lookup hold substantial enough to distinguish it from blind resubmission.
- Reproduce suspected visual faults through alternate extraction before flagging. Later decode the complete MP4, inspect audio peaks and streaming metadata, and listen before claiming audio was heard. Bind review to the actual full SHA-256 and renew encoded inspection after any re-encode.

Only this plan is assigned. Future implementation uses repository-pinned Puppeteer and cut-local engine copies. No rendering, public/site/shared-skill edits, Git operations, or other lesson work is included.
