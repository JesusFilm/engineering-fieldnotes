# Lesson 01 — One intended operation — plan B

Independent plan for the motion-v2 cut of idempotency lesson 01. Authored from the lesson entry in `video/idempotency/sequence/lessons.json` (item 1) and the concept content in `content/concepts/idempotency.json`. Earlier motion-v2 beat sheets from other chapters were read only to vary the geometry. No other plan for this lesson, no production ledger, and no authoring source was consulted. This document names no authoring model.

## Scope

One mechanism: **the caller wants one effect — one saved release ticket. The service performs the operation and the database records ticket 47; only afterwards does a response travel back and tell the caller about it. The saved row is the effect; the response is a report of the effect.**

The viewer should feel three things. Two separate ledgers sit side by side from the start: `database · what happened` and `caller · what it knows`. The database row `ticket 47 · release v1` appears first, while the caller's ledger is still empty and the caller is `waiting`. Only when the response lands does the caller's ledger fill with `ticket 47`, so the viewer sees the report arrive after the effect and point back to it.

Grounding: lesson beats ("the caller wants one release ticket. The service must save that effect", "the create request reaches the service. The service begins the operation", "the service saves ticket 47. The database records that effect", "a response reports ticket 47. This normal attempt succeeds"); intro ("the intended effect is one saved ticket, not merely a successful network response"); takeaway ("separate the business effect from the response that reports it"); concept overview ("idempotency means repeated identical requests have the same intended effect… it does not promise identical responses") and example (in-house release-ticket tool, PostgreSQL, ticket #47, release v1). Sources per the concept file: [RFC 9110 §9.2.2](https://www.rfc-editor.org/rfc/rfc9110.html#section-9.2.2) (intended effect versus response) and [AWS Builders' Library — Making retries safe with idempotent APIs](https://aws.amazon.com/builders-library/making-retries-safe-with-idempotent-APIs/).

Out of scope (later lessons): a lost reply and unknown outcome (02), operation keys and atomic key storage (03), retries with the same key (04), changed intent under an old key (05). The word "idempotent", keys, timeouts and retries do not appear on screen. Only the normal, successful attempt is shown.

Grammar for this cut: **a request/response column on the left (caller above, service below, with an outgoing `create` lane and a return lane), and on the right two stacked ledgers that never touch: `database · what happened` (a tickets table) and `caller · what it knows` (the caller's result field). An `effects` counter sits under the database ledger.** The two ledgers prepare the whole chapter: later lessons can make them disagree. Every element is a software object: a caller, a service, a create request, a database table, a response and a counter. No receipts, cash registers or rubber stamps.

Target length ≈ 38 s at speed 1 (`meta.speed: 1`). Hold after the row is saved while the caller is still waiting; that gap is the lesson.

## Engine notes

Use `box` for the caller and service, `store` for the tickets table (2 rows: header-like first row `id · release`, then the new row) and for the caller ledger (1 row), `label` for headers, states and the counter, `s.wire` for the outgoing lane, the return lane and a short service→database link, and chips for `create`, the write and the response. No new node type is expected. Use a cut-local engine copy with the repository-pinned Puppeteer.

## Stage and coordinates (1080 × 1920)

Palette follows `references/style.md`. Minimum on-screen text 40 px (≈ 13 px at 350 wide); names 44 px; monospace at 40 px ≈ 24 px per character. Content stays within x 40–1040 and y 480–1600.

| id | type | centre / bounds | text | notes |
|---|---|---|---|---|
| title | title band (540, 330) / (540, 405) | — | **Idempotency** / ONE INTENDED OPERATION | |
| caller | box | (240, 590), 400 × 160 (x 40–440, y 510–670) | label `caller` 44 px; sublabel 40 px mono `wants 1 ticket` → `waiting` (accent) → `has ticket 47` (ok) | C5 |
| intent | label | (240, 715), 40 px mono, mid | `release v1` | the requested content |
| outLane | wire | (180, 670) → (180, 1050) | — | `create` travels down |
| retLane | wire | (300, 1050) → (300, 670) | — | the response travels up |
| outLab | label | (95, 860), 40 px, mid | `create` | rotated or stacked if needed; keep 40 px |
| retLab | label | (385, 860), 40 px, mid | `response` | |
| service | box | (240, 1130), 400 × 160 (x 40–440, y 1050–1210) | label `service` 44 px; sublabel 40 px mono `idle` → `working` → `saved` → `replied` | G5 |
| dbLab | label | (760, 560), 40 px mono, mid | `database · what happened` | |
| dbTable | store, `rows: 2`, w 520 | (760, 700), x 500–1020, y ≈ 620–780 | row0 `id   release` (mid) · row1 empty → `47   v1` (ok) | E5 |
| effects | label | (760, 840), 44 px mono | `effects 0` → `effects 1` | |
| dbLink | wire | service right (440, 1130) → (470, 1130) → (470, 700) → dbTable left (500, 700) | — | the write path |
| callLab | label | (760, 1020), 40 px mono, mid | `caller · what it knows` | |
| callLedger | store, `rows: 1`, w 520 | (760, 1110), x 500–1020, y ≈ 1060–1160 | `result  —` → `result  ticket 47` (ok) | C5 colour |
| link | dashed wire | callLedger row (760, 1060) → dbTable row1 (760, 780) | — | appears in beat 4: the report points to the effect |
| gap | label | (760, 1260), 40 px mono, accent | `saved · not yet reported` | beat 3 only |

Chips: `create v1` (≈ 216 px) down outLane, `insert 47` (≈ 216 px) along dbLink, `ticket 47` (≈ 216 px) up retLane. Check that chips on x 180 / 300 stay inside x 40–440 and clear the lane labels, and that the dbLink route at x 470 clears both ledgers.

## Sound map

Actor pitches: caller **C5**, service **G5**, database **E5**. Pan: caller and service left (≈ −0.4), ledgers right (≈ +0.4).

| event | preset | notes |
|---|---|---|
| intent shown | `ack` C5 | |
| create sent / received | `send` C6, `arrive` G5 | |
| service working | `work` G4 ×3 | |
| row inserted | `store` E5 | the brightest cue: the effect |
| effects 0 → 1 | `ack` E6, quiet | |
| response sent | `send` G6 | |
| response received | `deliver` C5 | |
| caller ledger filled | `store` C5 | |
| report linked to effect | `chime` C5 + E5, quiet | the only chime |

No music.

## Beat sheet (speed 1)

| time | what moves | state change | sound |
|---|---|---|---|
| **Beat 1 — The caller wants one release ticket; the service must save that effect (0–8.0)** | | | |
| 0.0–1.0 | caller, service, lanes and both ledgers fade in | caller `wants 1 ticket`; dbTable empty row; `effects 0`; caller ledger `result —` | — |
| 1.8 | caller and `release v1` pulse | | ack C5 |
| 2.8 | dbLab and the empty row pulse | where the effect will live | — |
| 3.6 | callLab and `result —` pulse | what the caller will learn | — |
| 3.6–8.0 | hold | | |
| **Beat 2 — The create request reaches the service; the service begins (8.0–14.0)** | | | |
| 8.0 | caller `waiting` | | — |
| 8.2–9.6 | chip `create v1` down outLane | | send C6 |
| 9.6 | ripple at service; service `working` | | arrive G5 |
| 10.0–12.4 | service pulses | | work G4 ×3 |
| 12.4–14.0 | hold | | |
| **Beat 3 — The service saves ticket 47; the database records the effect (14.0–22.0)** | | | |
| 14.0–15.2 | chip `insert 47` along dbLink | | — |
| 15.2 | dbTable row1 `47   v1` (ok); service `saved` | | store E5 |
| 15.8 | `effects 1` | | ack E6 (quiet) |
| 16.6 | gap `saved · not yet reported`; caller `waiting` and `result —` pulse | the effect exists; the caller does not know yet | — |
| 16.6–22.0 | hold | | |
| **Beat 4 — A response reports ticket 47; this normal attempt succeeds (22.0–38.0)** | | | |
| 22.0 | gap fades; service `replied` | | — |
| 22.2–23.6 | chip `ticket 47` up retLane | | send G6 |
| 23.6 | ripple at caller; caller `has ticket 47` | | deliver C5 |
| 24.2 | caller ledger `result ticket 47` | | store C5 |
| 25.2 | dashed link draws from caller ledger to dbTable row1 | the response reports this effect | chime C5 + E5 (quiet) |
| 26.2 | `effects 1` pulses | one intended operation, one effect | — |
| 27.0–36.4 | hold | final state | |
| 36.4–37.2 | `s.fade` to black, 0.8 s | finite ending | — |
| 38.0 | end | | |

## Accuracy limits

- Ticket 47, release v1 and a single PostgreSQL database are the concept's illustrative example, not a commercial issue tracker.
- The response is sent after the commit, as in the lesson. Some services respond before the effect is durable; that is not shown.
- `effects 1` counts the intended business effect (one saved ticket). Incidental effects such as log lines are not counted; RFC 9110's idempotency definition is about intended effects only.
- Network transit is kept brief; nothing is lost in this attempt (lesson 02).
- Durations are illustrative; no timing numbers appear.

## Native 350 acceptance

These are requirements for the future render, not completed validation.

1. Decode actual frames (avoid relying only on a contact sheet) at 1080 and at 350 px wide around 1.9, 2.9, 3.7, 6.0, 8.1, 9.0, 9.7, 11.0, 13.0, 14.6, 15.3, 15.9, 16.7, 19.0, 22.1, 23.0, 23.7, 24.3, 25.3, 26.3, 31.0 and 36.8 s. At 350 px, `caller`, `release v1`, `create`, `response`, `service` and all states, both ledger headers, the table rows, `effects`, the caller result, `saved · not yet reported` and every chip must be readable.
2. Effect before report: the database row exists from 15.2 s while the caller ledger still reads `result —` until 24.2 s.
3. One effect: `effects` never exceeds 1; one row is inserted.
4. Report points to effect: the caller ledger shows `ticket 47` only after the response chip lands, and the dashed link connects it to row `47 v1`.
5. Scope: no key, timeout, lost message, retry, duplicate or rejection appears; the word "idempotent" does not appear on screen.
6. Clearance: chips stay on their lanes; the dbLink route clears both ledgers; the two ledgers never overlap; nothing enters the title band.
7. Silent reading: with sound off and words ignored, a viewer sees two ledgers on the right, both empty; something goes down from the top-left box to the box below it; something moves from that box into the upper ledger, which fills a row and increments a number, while the lower ledger stays empty and a tag appears; something travels back up to the top-left box and the lower ledger fills; a dashed line connects the lower ledger to the upper row.
8. Audio: the dry run lists one `store` E5 at 15.2 s (brightest), one `deliver` C5 at 23.6 s, one quiet `chime` at 25.2 s, and no crash. Full-decode the encode, confirm an audio stream, peak below −0.5 dBFS and moov before mdat. Record whether audio was heard or only analysed.
9. After encoding run `python3 scripts/check_media.py --concept idempotency`; a new encode needs renewed comparison review bound to its SHA-256.

## Production boundary

Only this anonymous plan is written. No render, scene source, public media, site, shared skill, Git commit or deployment. Later implementation uses the repository-pinned Puppeteer and a cut-local engine copy, with any drawing extension local to the cut.

