# Lesson 03 — Name the operation — plan B

Independent plan for the motion-v2 cut of idempotency lesson 03. Authored from the lesson entry in `video/idempotency/sequence/lessons.json` (item 3) and the concept content in `content/concepts/idempotency.json`. Earlier motion-v2 beat sheets were read only to vary the geometry. No other plan for this lesson, no production ledger, and no authoring source was consulted. This document names no authoring model.

## Scope

One mechanism: **before sending, the caller saves an operation key, k7, with its release request; the key travels with the request; the service finds no record for k7, then creates ticket 47 and stores the ticket row and the key row in one database transaction, so both appear together or not at all; if this reply is lost too, k7 still points to the saved ticket.**

The viewer should feel three things. The key exists before anything is sent: the caller's own store fills `k7 · release v1 · saved` while the request lane is still empty. The service's lookup for k7 visibly comes back empty (`no record`), and only then does a transaction frame open around two tables, `tickets` and `operation keys`. Rows `47 v1` and `k7 → 47` fill inside the frame, and both become solid together on `commit`. When the reply is lost, a dashed line from the caller's k7 down to the key row and on to ticket 47 shows that the operation has a name the caller still holds.

Grounding: lesson beats ("new attempt: save key k7 before sending. This time, protect the operation upfront", "send the key with the request. The service checks its stored records", "the first attempt creates ticket 47. Store the ticket and key atomically", "suppose this protected reply is lost too. Key k7 still identifies the saved ticket"); intro ("the caller saves key k7 with its release request before sending. The service commits the ticket and key record in one database transaction"); takeaway ("the key identifies an intended operation. Atomic storage and uniqueness are needed to prevent concurrent duplicate effects in this design"); concept walkthrough steps 1–2 ("generate its key once in the runner and persist it with the arguments"; "within one transaction, claim that identity, insert the ticket, and save its identifier and parameters") and pitfalls ("generating a new key for every attempt defeats duplicate detection"; "checking for a key and then writing without database-enforced coordination lets concurrent callers both proceed"). Sources per the concept file: [PostgreSQL — transactions](https://www.postgresql.org/docs/current/tutorial-transactions.html), [PostgreSQL — unique constraints](https://www.postgresql.org/docs/current/ddl-constraints.html) and [AWS Builders' Library — Making retries safe](https://aws.amazon.com/builders-library/making-retries-safe-with-idempotent-APIs/).

Out of scope (later lessons): resending k7 and the lookup returning ticket 47 (04); a changed payload under k7 (05). No retry is sent. Concurrent callers, unique-index waits and key retention are named in the accuracy limits only.

Grammar for this cut: **a vertical stack: the caller with its own small `runner store` at the top, a request lane carrying a two-line chip (`create v1` / `key k7`), the service in the middle, and at the bottom a database with two tables side by side inside a dashed `transaction` frame that becomes solid on commit.** Lesson 01 nested the database in the service and lesson 02 used lifelines; here the transaction frame and two tables committing together are the new object. Every element is a software object: a runner store, an operation key, a request with a header field, a lookup, a transaction, two tables and a commit. No luggage tags, name badges or sealed envelopes.

Target length ≈ 46 s at speed 1 (`meta.speed: 1`). Keep the "key saved, nothing sent yet" hold and the commit moment unhurried.

## Engine notes

Use `box` for the caller, service and database, `store` for the runner store (1 row), the `tickets` table (2 rows) and the `operation keys` table (2 rows), a dashed-then-solid outline `box` for the transaction frame, `label` for headers, states and notes, `s.wire` for the request lane, the return lane and the lookup path, and chips for the request, the lookup and the reply. The pending rows inside the transaction are drawn at reduced alpha with dashed outlines until commit. No new node type is expected. Use a cut-local engine copy with the repository-pinned Puppeteer.

## Stage and coordinates (1080 × 1920)

Palette follows `references/style.md`. Minimum on-screen text 40 px (≈ 13 px at 350 wide); names 44 px; monospace at 40 px ≈ 24 px per character. Content stays within x 40–1040 and y 480–1680.

| id | type | centre / bounds | text | notes |
|---|---|---|---|---|
| title | title band (540, 330) / (540, 405) | — | **Idempotency** / NAME THE OPERATION | |
| caller | box | x 60–1020, y 480–700 | label `caller` 44 px at (180, 520); state 40 px mono at (860, 520) `preparing` → `sending` → `waiting` → `timed out` (accent) | C5 |
| runner | store, `rows: 1`, w 640 | (540, 630), x 220–860, y ≈ 590–670 | label `runner store` 40 px mono, mid at (130, 630); row `—` → `k7 · release v1 · saved` (ok) | saved before sending |
| reqLane | wire | (440, 700) → (440, 860) | — | |
| retLane | wire | (640, 860) → (640, 700) | — | |
| service | box | x 60–1020, y 860–1040 | label `service` 44 px at (180, 900); state 40 px mono at (860, 900) `idle` → `checking k7` → `no record` → `creating` → `committed` | G5 |
| lookup | label | (540, 990), 40 px mono | `lookup k7 → none` | beat 2 |
| db | box | x 60–1020, y 1100–1560 | label `database` 44 px at (180, 1140) | E5 |
| txFrame | outline box | x 90–990, y 1180–1480 | label `transaction` 40 px mono at (220, 1215): `—` → `open` (accent) → `committed` (ok) | dashed until commit |
| tTickets | store, `rows: 2`, w 400 | (300, 1360), x 100–500, y ≈ 1280–1440 | header `tickets` 40 px mono at (300, 1255); row0 `id  release` mid · row1 `47  v1` | pending (dashed, alpha 0.5) → solid on commit |
| tKeys | store, `rows: 2`, w 440 | (760, 1360), x 540–980 | header `operation keys` at (760, 1255); row0 `key  ticket` mid · row1 `k7   47` | pending → solid together with tTickets |
| unique | label | (760, 1520), 40 px mono, mid | `key is unique` | beat 3 |
| lostX | ripple anchor | (640, 780) | grey `×` | beat 4 |
| idLink | dashed wire | runner row (540, 670) → retLane side (720, 780) → tKeys row1 (760, 1440) → tTickets row1 (500, 1360) | — | beat 4: k7 names the saved ticket |
| note | label | (540, 1620), 40 px mono, accent | `k7 still names ticket 47` | beat 4 |

Chips: `create v1 · key k7` as a two-line chip (`create v1` / `key k7`, ≈ 220 × 96) down reqLane; `lookup k7` (≈ 216 px) from service to tKeys and back as `none` (≈ 96 px); `ticket 47` (≈ 216 px) up retLane, fading at y 780. Check that the two-line chip fits between the lanes and the caller/service boxes, that the idLink route clears both tables' text, and that `operation keys` (≈ 336 px) fits above tKeys.

## Sound map

Actor pitches: caller **C5**, service **G5**, database **E5**. The key has its own cue, **A5**, heard whenever k7 is saved, sent or looked up, so the ear tracks the operation's name.

| event | preset | notes |
|---|---|---|
| key saved in runner store | `store` A5 | before anything is sent |
| request with key sent / received | `send` C6, `arrive` G5, plus quiet `ack` A5 | |
| lookup k7 → none | `send` A6, `miss` soft | absent, not failure |
| transaction opens | `ack` E4 | |
| pending rows appear | `work` E4 ×2, quiet | |
| commit | `store` E5 + `store` A5 together | the brightest cue: both rows at once |
| reply sent / lost | `send` G6, `poof` | |
| caller times out | `thump`, soft | |
| k7 link drawn | `chime` A5, quiet | the only chime |

No music.

## Beat sheet (speed 1)

| time | what moves | state change | sound |
|---|---|---|---|
| **Beat 1 — New attempt: save key k7 before sending (0–9.0)** | | | |
| 0.0–1.0 | caller, service, database, empty tables, dashed frame fade in | caller `preparing`; runner `—`; tables empty | — |
| 2.0 | runner row `k7 · release v1 · saved` (ok) | the operation is named and saved locally | store A5 |
| 3.0 | reqLane pulses empty | nothing sent yet | — |
| 3.0–9.0 | hold | | |
| **Beat 2 — Send the key with the request; the service checks its stored records (9.0–17.0)** | | | |
| 9.0 | caller `sending` | | — |
| 9.4–10.8 | two-line chip `create v1` / `key k7` down reqLane | | send C6, ack A5 |
| 10.8 | ripple at service; caller `waiting`; service `checking k7` | | arrive G5 |
| 11.6–12.4 | chip `lookup k7` service → tKeys | | send A6 |
| 12.4 | tKeys body pulses: no row for k7 | | — |
| 12.8–13.6 | chip `none` back to service; lookup line `lookup k7 → none`; service `no record` | first attempt | miss (soft) |
| 13.6–17.0 | hold | | |
| **Beat 3 — The first attempt creates ticket 47; store ticket and key atomically (17.0–28.0)** | | | |
| 17.0 | service `creating`; txFrame label `open` (accent), still dashed | | ack E4 |
| 18.0 | tTickets row1 `47  v1` appears pending (dashed, half alpha) | | work E4 |
| 19.0 | tKeys row1 `k7   47` appears pending | | work E4 |
| 20.4 | txFrame turns solid; label `committed` (ok); both rows become solid in the same frame | all or nothing | store E5 + store A5 |
| 21.0 | service `committed`; `key is unique` appears under tKeys | | — |
| 21.0–28.0 | hold | | |
| **Beat 4 — Suppose this reply is lost too; k7 still identifies the saved ticket (28.0–46.0)** | | | |
| 28.0–29.0 | chip `ticket 47` up retLane; fades at y 780 with grey `×` | | send G6, poof |
| 30.0 | caller `timed out` (accent) | | thump (soft) |
| 31.0 | idLink draws dashed: runner `k7` → tKeys `k7 47` → tTickets `47 v1` | | chime A5 (quiet) |
| 32.0 | note `k7 still names ticket 47` | | — |
| 33.0 | runner row, key row and ticket row pulse in turn | | — |
| 34.0–44.4 | hold | final state | |
| 44.4–45.2 | `s.fade` to black, 0.8 s | finite ending | — |
| 46.0 | end | | |

## Accuracy limits

- This is the concept's proposed local design (one PostgreSQL database), not a claim about any commercial API. The key scope (caller, operation, key) is simplified to `k7` on screen.
- `key is unique` stands for a database-enforced unique constraint. A lookup followed by a write without that constraint lets concurrent callers both proceed (concept pitfall); the cut shows one caller only.
- Atomic commit means other transactions see both rows or neither. Concurrent inserts of the same key wait on the unique check; not shown.
- The caller timing out after the commit still does not know the result; how resending k7 recovers it is lesson 04.
- Key retention, payload comparison and changed intent are later lessons. Durations are illustrative; no timing numbers appear.

## Native 350 acceptance

These are requirements for the future render, not completed validation.

1. Decode actual frames (avoid relying only on a contact sheet) at 1080 and at 350 px wide around 2.1, 3.1, 6.0, 9.1, 10.0, 10.9, 12.0, 12.5, 13.2, 13.7, 15.0, 17.1, 18.1, 19.1, 20.3, 20.5, 21.1, 25.0, 28.5, 29.1, 30.1, 31.1, 32.1, 33.1, 38.0 and 44.8 s. At 350 px, `caller` and its states, `runner store` and its row, the two-line chip, `service` and its states, `lookup k7 → none`, `database`, `transaction` and its states, both table headers and rows, `key is unique`, `ticket 47` and the note must be readable.
2. Key first: the runner row reads `k7 · release v1 · saved` before the request chip leaves the caller.
3. Check before create: `no record` appears before any row appears in either table.
4. Atomic: the ticket row and key row change from pending to solid in the same frame (check frames at 20.3 and 20.5 s and by frame-number selection); no frame shows one solid and the other pending after commit.
5. Lost reply: the `ticket 47` chip never reaches the caller; the `×` is grey; the caller reads `timed out`, not `failed`.
6. Scope: no second request, retry, lookup hit, payload mismatch or rejection appears.
7. Clearance: the two-line chip fits; idLink clears table text; nothing enters the title band; no chip remains during a hold.
8. Silent reading: with sound off and words ignored, a viewer sees a top row fill before anything moves; a two-line chip goes down; a probe from the middle box finds the right-hand table empty and returns; a frame around two tables opens and two faint rows appear, which become solid together as the frame solidifies; a chip going back up vanishes; a dashed line joins the top row to both table rows.
9. Audio: the dry run lists `store` A5 at 2.0 s before any `send`, one soft `miss` at 12.8 s, a simultaneous `store` E5 + A5 at 20.4 s (brightest), one `poof` at 29.0 s, one soft `thump`, and exactly one quiet `chime`. Full-decode the encode, confirm an audio stream, peak below −0.5 dBFS and moov before mdat. Record whether audio was heard or only analysed.
10. After encoding run `python3 scripts/check_media.py --concept idempotency`; a new encode needs renewed comparison review bound to its SHA-256.

## Production boundary

Only this anonymous plan is written. No render, scene source, public media, site, shared skill, Git commit or deployment. Later implementation uses the repository-pinned Puppeteer and a cut-local engine copy, with any drawing extension local to the cut.

