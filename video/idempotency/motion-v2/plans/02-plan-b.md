# Lesson 02 — A missing reply — plan B

Independent plan for the motion-v2 cut of idempotency lesson 02. Authored from the lesson entry in `video/idempotency/sequence/lessons.json` (item 2) and the concept content in `content/concepts/idempotency.json`. Earlier motion-v2 beat sheets were read only to vary the geometry. No other plan for this lesson, no production ledger, and no authoring source was consulted. This document names no authoring model.

## Scope

One mechanism: **the service saves ticket 47 and sends a reply, but the reply is lost on the way back; the caller's timeout expires while it still knows nothing, so from the caller's side the outcome is unknown even though the database already holds the ticket. Sending another plain create at that point could add a second ticket.**

The viewer should feel three things. Two truths diverge: the database shows `47 v1` and `saved 1` while the caller's `knows` field still reads `nothing`. The reply visibly fades out halfway across the network lane and never arrives, while a timeout bar under the caller fills and ends in `timed out · outcome unknown` (not `failed`). A dashed "what another create would do" row `48 v1?` appears under ticket 47, with `saved 2?` beside it. It's a hypothetical, drawn dashed and never made solid, and it closes with `needs a stable operation ID`.

Grounding: lesson beats ("the caller sends a create request. The service receives it", "the service saves ticket 47. Its response will not reach the caller", "the caller stops waiting. Its outcome is unknown", "another create could add a duplicate. The caller needs a stable operation ID"); intro ("the service saves a ticket but the reply is lost. The caller times out without knowing whether the operation happened"); takeaway ("a timeout does not prove that nothing was created. Retrying an unprotected create can duplicate the effect"); concept overview ("a POST tool needs an explicit service contract before automatic retries are safe") and pitfall ("generating a new key for every attempt defeats duplicate detection", which is context for lesson 03). Sources per the concept file: [RFC 9110 §9.2.2](https://www.rfc-editor.org/rfc/rfc9110.html#section-9.2.2) and [AWS Builders' Library — Making retries safe with idempotent APIs](https://aws.amazon.com/builders-library/making-retries-safe-with-idempotent-APIs/).

Out of scope (later lessons): the key `k7`, saving the key before sending, atomic storage with the ticket (03), retrying with the same key (04), and changed intent (05). No retry is actually sent; the duplicate is shown only as a dashed possibility. Why the reply was lost (network drop, crash) is not dramatised beyond a fade.

Grammar for this cut: **a sequence diagram with three vertical lifelines (caller, network, service + database), time running downward; messages are horizontal arrows drawn as they happen; the caller lifeline carries a timeout bar; a small database table and a caller `knows` field sit at the top of their lifelines and update in place.** Lesson 01 used a nested panel; here time is explicit, so "sent, saved, lost, timed out" read as positions on one timeline. Every element is a software object: lifelines, messages, a timeout, a database row and a caller state. No lost letters, phones or storms.

Target length ≈ 44 s at speed 1 (`meta.speed: 1`). The timeout must visibly run for a few seconds after the reply is lost; do not compress it.

## Engine notes

Lifelines and message arrows are `s.wire` segments between raw points (arrows appear as their chip travels); the lost reply is a chip that fades at the network midpoint with a dashed remainder of its arrow. The timeout is a vertical `bar` on the caller lifeline (or a horizontal `bar` beside it). The database table is a `store` (3 rows: header, row 47, hypothetical row 48 with dashed outline). Headers and states are `label` nodes. No new node type is expected. Use a cut-local engine copy with the repository-pinned Puppeteer.

## Stage and coordinates (1080 × 1920)

Palette follows `references/style.md`. Minimum on-screen text 40 px (≈ 13 px at 350 wide); names 44 px; monospace at 40 px ≈ 24 px per character. Content stays within x 40–1040 and y 480–1680.

Lifeline x: caller **180**, network **540**, service **880**. Time runs from y 820 to 1500.

| id | type | centre / bounds | text | notes |
|---|---|---|---|---|
| title | title band (540, 330) / (540, 405) | — | **Idempotency** / A MISSING REPLY | |
| hCaller | box | (180, 540), 280 × 90 (x 40–320) | label `caller` 44 px | C5 |
| knows | label | (180, 625), 40 px mono | `knows: nothing` → stays | |
| cState | label | (180, 680), 40 px mono | `waiting` (accent) → `timed out` (accent) → `outcome unknown` (accent) | never `failed` |
| hNet | box | (540, 540), 220 × 90 (x 430–650) | label `network` 44 px | mid; quiet actor |
| hSvc | box | (880, 540), 300 × 90 (x 730–1030) | label `service` 44 px | G5 |
| db | store, `rows: 3`, w 300 | (880, 690), x 730–1030, y ≈ 610–770 | row0 `id  release` mid · row1 `47  v1` (ok, after save) · row2 `48  v1?` (dashed, accent; beat 4 only) | E5 |
| saved | label | (880, 800), 40 px mono | `saved 0` → `saved 1` → `saved 2?` (dashed, beat 4) | |
| lifelines | dashed wires | x 180 / 540 / 880, y 820 → 1500 | — | |
| m1 | arrow + chip | y 900, x 180 → 880 | `create v1` | the request |
| m2 | arrow | y 1000, x 880 → 1000 (self-note) | label `save 47` at (960, 970) | the effect |
| m3 | arrow + chip | y 1100, x 880 → 540, fades at x 540; dashed x 540 → 180 | `ticket 47` | lost reply |
| lostX | ripple anchor | (540, 1100) | mid-grey `×` | not red: the network lost it, nothing crashed |
| tBar | bar, vertical | x 130–150, y 900 → 1300 on the caller lifeline | fills accent | the caller's timeout |
| tLab | label | (300, 1300), 40 px mono, accent | `timeout` | |
| m4 | dashed arrow (hypothetical) | y 1400, x 180 → 880 | `create v1 again?` (dashed chip, accent) | appears in beat 4, never travels as a real message |
| needId | label | (540, 1600), 40 px mono, accent | `needs a stable operation ID` | beat 4 |

Check that `create v1 again?` (≈ 384 px) fits between lifelines at y 1400 (x 200–860), that `ticket 47` fades before overlapping `network`'s lifeline label, and that the hypothetical row is visually distinct (dashed outline, `?`, accent) from the real row.

## Sound map

Actor pitches: caller **C5**, service **G5**, database **E5**. Network has no pitch; the lost reply makes a muffled `poof`.

| event | preset | notes |
|---|---|---|
| create sent / received | `send` C6, `arrive` G5 | |
| ticket saved | `store` E5 | the real effect |
| saved 0 → 1 | `ack` E6, quiet | |
| reply sent | `send` G6 | |
| reply lost | `poof` | muffled, mid-network |
| timeout running | `clock` C4, quiet, gaps shortening | |
| timeout reached | `thump`, soft | no crash |
| hypothetical duplicate | `miss`, quiet, pitched E4 | a warning tone, not an effect |

No chime: nothing resolves in this lesson.

## Beat sheet (speed 1)

| time | what moves | state change | sound |
|---|---|---|---|
| **Beat 1 — The caller sends a create request; the service receives it (0–9.0)** | | | |
| 0.0–1.0 | headers, db, labels and lifelines fade in | `knows: nothing`; `saved 0`; empty rows | — |
| 2.0 | cState `waiting`; tBar starts filling slowly | the caller starts its timer | — |
| 2.4–4.0 | m1 draws with chip `create v1` caller → service | | send C6 |
| 4.0 | ripple at service lifeline | | arrive G5 |
| 4.0–9.0 | hold; tBar keeps filling | | |
| **Beat 2 — The service saves ticket 47; its response will not reach the caller (9.0–17.0)** | | | |
| 9.0 | m2 `save 47` draws | | — |
| 9.6 | db row1 `47  v1` (ok); `saved 1` | the effect exists | store E5, ack E6 |
| 11.0–12.2 | m3: chip `ticket 47` leaves the service toward the network | | send G6 |
| 12.2 | chip fades at x 540; grey `×`; the rest of the arrow to the caller is dashed | lost | poof |
| 12.8 | `knows: nothing` pulses | the caller still knows nothing | — |
| 12.8–17.0 | hold; tBar keeps filling | | clock C4 |
| **Beat 3 — The caller stops waiting; its outcome is unknown (17.0–25.0)** | | | |
| 17.0 | tBar full | | thump (soft) |
| 17.4 | cState `timed out` | | — |
| 18.4 | cState `outcome unknown`; `knows: nothing` and db row `47 v1` pulse in turn | the caller does not know what the database knows | — |
| 18.4–25.0 | hold | | |
| **Beat 4 — Another create could add a duplicate; the caller needs a stable operation ID (25.0–44.0)** | | | |
| 25.0 | m4 dashed `create v1 again?` appears (does not travel) | a possible retry | — |
| 26.0 | db row2 `48  v1?` appears dashed; `saved 2?` dashed | what an unprotected create would add | miss (quiet, E4) |
| 27.4 | row1 `47 v1` and dashed row2 pulse in turn | same intent, two tickets | — |
| 28.6 | needId `needs a stable operation ID` | | — |
| 29.4–42.4 | hold | final state; the hypothetical stays dashed | |
| 42.4–43.2 | `s.fade` to black, 0.8 s | finite ending | — |
| 44.0 | end | | |

## Accuracy limits

- The reply is lost after the commit, as in the lesson. Other failures (request lost before the service, crash before or during the commit) give the caller the same timeout but a different database state; that uncertainty is the point and is stated, not drawn.
- `48 v1?` is a hypothetical: an unprotected create would insert a new row with the same release. No second request is sent in this cut.
- A timeout means the caller stopped waiting, not that the operation failed or succeeded.
- How a stable operation ID prevents the duplicate is lessons 03–04; here it is only named.
- Ticket numbers and release are illustrative; durations are illustrative; no timing numbers appear.

## Native 350 acceptance

These are requirements for the future render, not completed validation.

1. Decode actual frames (avoid relying only on a contact sheet) at 1080 and at 350 px wide around 2.1, 3.2, 4.1, 7.0, 9.1, 9.7, 11.6, 12.3, 12.9, 15.0, 17.1, 17.5, 18.5, 22.0, 25.1, 26.1, 27.5, 28.7, 35.0 and 42.8 s. At 350 px, the three lifeline headers, `knows`, the caller state, the db rows (including the dashed `48 v1?`), `saved`, every message label and chip, `timeout` and `needs a stable operation ID` must be readable.
2. Divergence: from 9.6 s the database shows `47 v1` while `knows: nothing` holds to the end.
3. Lost reply: the `ticket 47` chip never reaches the caller lifeline; the `×` is grey, not red.
4. Unknown, not failed: the caller state reads `timed out` then `outcome unknown`; the word `failed` never appears.
5. Hypothetical duplicate: `48 v1?` and `saved 2?` are dashed and marked `?` in every frame; no chip travels along m4.
6. Scope: no key, `k7`, transaction, retry or rejection appears.
7. Clearance: message labels clear lifelines and each other; dashed and solid rows are distinguishable at 350 px; nothing enters the title band.
8. Silent reading: with sound off and words ignored, a viewer sees an arrow go from the left line to the right line and a table on the right gain a row; an arrow starts back and vanishes in the middle; a bar on the left line fills while the left label stays unchanged; a dashed arrow appears below and a dashed duplicate row appears under the real one.
9. Audio: the dry run lists one `store` E5 at 9.6 s, one `poof` at 12.2 s, quiet `clock` ticks during 12.8–17.0 s, one soft `thump` at 17.0 s, one quiet `miss` at 26.0 s, and no chime or crash. Full-decode the encode, confirm an audio stream, peak below −0.5 dBFS and moov before mdat. Record whether audio was heard or only analysed.
10. After encoding run `python3 scripts/check_media.py --concept idempotency`; a new encode needs renewed comparison review bound to its SHA-256.

## Production boundary

Only this anonymous plan is written. No render, scene source, public media, site, shared skill, Git commit or deployment. Later implementation uses the repository-pinned Puppeteer and a cut-local engine copy, with any drawing extension local to the cut.

