# Lesson 05 — Changed intent, new key — plan B

Independent plan for the motion-v2 cut of idempotency lesson 05. Authored from the lesson entry in `video/idempotency/sequence/lessons.json` (item 5) and the concept content in `content/concepts/idempotency.json`. Earlier motion-v2 beat sheets were read only to vary the geometry. No other plan for this lesson, no production ledger, and no authoring source was consulted. This document names no authoring model.

## Scope

One mechanism: **key k7 already names the operation "create a ticket for release v1"; a new request arrives with the same key k7 but asks for release v2; the service compares the stored request with the incoming one, finds the key matches but the payload differs, and rejects the request without touching ticket 47; a genuinely new operation must use a new key.**

The viewer should feel three things. A two-column comparison, `stored for k7` versus `incoming`, lights row by row: `key k7 = k7` (match), then `release v1 ≠ v2` (mismatch). The service returns `rejected · key reused with different request`, and ticket 47 and its key record visibly stay `v1`, unchanged, with `tickets: 1`. The caller's runner store then shows the correct pattern: a fresh key `k8` paired with `release v2`, kept apart from `k7 · release v1`.

Grounding: lesson beats ("key k7 belongs to release v1. The new payload asks for release v2", "the service compares the payloads. The same key now has different intent", "the service rejects the mismatch. It does not overwrite the old operation", "a new operation needs a new key. A retry keeps its original identity"); intro ("this service compares the stored payload before deciding whether replay is valid"); takeaway ("a key is not a general-purpose deduplication label. Reusing it for changed intent must follow the service contract; here the request is rejected"); concept example ("reusing k7 with v2 is rejected"), walkthrough steps 1 and 3 ("a later, genuinely separate ticket needs a new key even when its contents match"; "return its ticket identifier for matching arguments; reject a mismatch"). Sources per the concept file: [AWS Builders' Library — request identity and changed intent](https://aws.amazon.com/builders-library/making-retries-safe-with-idempotent-APIs/) and [Stripe API — idempotent requests](https://docs.stripe.com/api/idempotent_requests) (contracts differ by service and version).

Out of scope: this is the last lesson. Sending k8 and creating ticket 48 is not played; k8 is shown only as the correct next request, not yet sent. Retention, concurrency and authorization are named in the accuracy limits only.

Grammar for this cut: **the caller at the top with a runner store that holds operations by key; a central comparison table in the service, with columns `stored for k7` and `incoming` and rows `key` and `release`, plus a match column of `=`/`≠` marks; the database at the bottom with the k7 record and ticket 47; and a result chip returning to the caller.** Lessons 03–04 showed storing and finding a key; here the field-by-field comparison is the new object. Every element is a software object: a runner store, a request payload, a stored request record, a comparison, an error result and database rows. No mismatched keys-and-locks, puzzle pieces or stamps.

Target length ≈ 44 s at speed 1 (`meta.speed: 1`). Hold on the `≠` row and on the unchanged ticket after rejection.

## Engine notes

Use `box` for caller, service and database; `store` for the runner store (2 rows), the comparison table (2 rows plus header labels) and the database tables (1 row each); `label` for `=`/`≠`, states, `tickets: 1` and notes; `s.wire` for request and reply lanes; chips for the request (two-line `create v2` / `key k7`) and the result (two-line `rejected` / `key reused`). No new node type is expected. Use a cut-local engine copy with the repository-pinned Puppeteer.

## Stage and coordinates (1080 × 1920)

Palette follows `references/style.md`. Minimum on-screen text 40 px (≈ 13 px at 350 wide); names 44 px; monospace at 40 px ≈ 24 px per character. Content stays within x 40–1040 and y 480–1680.

| id | type | centre / bounds | text | notes |
|---|---|---|---|---|
| title | title band (540, 330) / (540, 405) | — | **Idempotency** / CHANGED INTENT, NEW KEY | |
| caller | box | x 40–1040, y 480–760 | label `caller` 44 px at (150, 520); state 40 px mono at (880, 520) `has ticket 47` → `sending` → `got error` (accent) → `new key ready` (ok) | C5 |
| runner | store, `rows: 2`, w 760 | (540, 650), x 160–920; rows ≈ 615, 685 | label `runner store` 40 px mono, mid at (540, 570); row0 `k7 · release v1 · done` · row1 `—` → `k7 · release v2 ?` (accent, struck later) → `k8 · release v2 · new` (ok) | |
| reqLane / retLane | wires | (400, 760) → (400, 860); (680, 860) → (680, 760) | — | |
| service | box | x 40–1040, y 860–1280 | label `service` 44 px at (150, 900); state 40 px mono at (880, 900) `idle` → `comparing` → `mismatch` → `rejected` | G5 |
| cmpHead | labels | (360, 970) / (720, 970), 40 px mono, mid | `stored for k7` · `incoming` | |
| cmpKey | row | y 1050: (360) `key  k7` · (540) `=` · (720) `key  k7` | | match mark ok |
| cmpRel | row | y 1140: (360) `release  v1` · (540) `≠` · (720) `release  v2` | | mismatch mark accent; incoming value accent |
| verdict | label | (540, 1225), 40 px mono, accent | `same key · different request` | |
| db | box | x 40–1040, y 1340–1600 | label `database` 44 px at (150, 1380) | E5 |
| tKeys | store, `rows: 1`, w 440 | (290, 1490), x 70–510 | header `operation keys` at (290, 1440); row `k7 → 47 · v1` | |
| tTickets | store, `rows: 1`, w 440 | (790, 1490), x 570–1010 | header `tickets` at (790, 1440); row `47  v1` | |
| counter | label | (790, 1560), 40 px mono | `tickets: 1` | never changes |
| keep | label | (540, 1640), 40 px mono, ok | `k7 unchanged · ticket 47 unchanged` | beat 3 |
| rule | label | (540, 1690), 40 px mono, mid | `retry: same key · new intent: new key` | beat 4 |

Chips: request two-line `create v2` / `key k7` (≈ 220 × 96) down reqLane; result two-line `rejected` / `key reused` (≈ 220 × 96) up retLane. Check that the comparison text and marks fit inside the service box at 40 px, that the struck-through `k7 · release v2 ?` row stays readable, and that `rule` fits within y 1680 (move `keep` up to 1615 if needed).

## Sound map

Actor pitches: caller **C5**, service **G5**, database **E5**; key cue **A5** (as in lessons 03–04).

| event | preset | notes |
|---|---|---|
| request with k7 + v2 sent / received | `send` C6 + `ack` A5, `arrive` G5 | |
| stored record fetched | `send` A6, `ack` E5 | |
| key row matches | `ack` A5 | |
| release row differs | `miss` | the decisive cue |
| rejection sent / received | `thump` soft, `deliver` C4 | handled error, not a crash |
| ticket and key unchanged | `ack` E5, quiet | |
| new key k8 created locally | `store` A5 (pitched up to B5) | a new identity |
| rule line | `chime` C5, quiet | the only chime |

No `store` E5: the database is never written.

## Beat sheet (speed 1)

| time | what moves | state change | sound |
|---|---|---|---|
| **Beat 1 — Key k7 belongs to release v1; the new payload asks for release v2 (0–9.0)** | | | |
| 0.0–1.0 | all panels fade in | runner row0 `k7 · release v1 · done`; db `k7 → 47 · v1`, `47 v1`, `tickets: 1`; caller `has ticket 47` | — |
| 2.0 | runner row1 `k7 · release v2 ?` (accent) | same key, new intent | — |
| 3.0 | row0 `k7` and row1 `k7` pulse together | | ack A5 |
| 3.0–9.0 | hold | | |
| **Beat 2 — The service compares the payloads; same key, different intent (9.0–19.0)** | | | |
| 9.0–10.4 | request chip `create v2` / `key k7` down reqLane; caller `sending` | | send C6, ack A5 |
| 10.4 | ripple at service; service `comparing`; incoming column fills `key k7`, `release v2` | | arrive G5 |
| 11.2–12.0 | a dot from tKeys up to the stored column; stored column fills `key k7`, `release v1` | | send A6, ack E5 |
| 13.0 | key row `=` (ok) | | ack A5 |
| 14.2 | release row `≠` (accent); `v2` pulses | | miss |
| 15.0 | verdict `same key · different request`; service `mismatch` | | — |
| 15.0–19.0 | hold | | |
| **Beat 3 — The service rejects the mismatch; it does not overwrite the old operation (19.0–28.0)** | | | |
| 19.0 | service `rejected` | | thump (soft) |
| 19.4–20.6 | result chip `rejected` / `key reused` up retLane | | — |
| 20.6 | caller `got error`; runner row1 struck through | | deliver C4 |
| 21.6 | tKeys row and tTickets row pulse; `tickets: 1` pulses | still v1 | ack E5 (quiet) |
| 22.4 | keep `k7 unchanged · ticket 47 unchanged` | | — |
| 22.4–28.0 | hold | | |
| **Beat 4 — A new operation needs a new key; a retry keeps its original identity (28.0–44.0)** | | | |
| 28.0 | runner row1 → `k8 · release v2 · new` (ok) | a new identity for new intent | store B5 |
| 29.0 | row0 `k7 · release v1` and row1 `k8 · release v2` pulse in turn | | — |
| 30.0 | caller `new key ready`; rule `retry: same key · new intent: new key` | | chime C5 (quiet) |
| 31.0–42.4 | hold | final state; k8 not yet sent | |
| 42.4–43.2 | `s.fade` to black, 0.8 s | finite ending | — |
| 44.0 | end | | |

## Accuracy limits

- Rejecting a mismatch is this design's contract. Services differ: Stripe API v1 compares parameters and errors on mismatch; other APIs may behave differently. Check the specific contract.
- The comparison shown covers the release field only. Real services compare the full request (or a fingerprint of it) within the key's caller and operation scope.
- Sending k8 would create a separate ticket; that request is not played.
- A key is not authorization; access checks still apply. Retention and concurrent requests are as in lessons 03–04 and are not redrawn.
- Durations are illustrative; no timing numbers appear.

## Native 350 acceptance

These are requirements for the future render, not completed validation.

1. Decode actual frames (avoid relying only on a contact sheet) at 1080 and at 350 px wide around 2.1, 3.1, 6.0, 9.6, 10.5, 11.6, 12.1, 13.1, 14.3, 15.1, 17.0, 19.1, 20.0, 20.7, 21.7, 22.5, 25.0, 28.1, 29.1, 30.1, 36.0 and 42.8 s. At 350 px, the caller states, `runner store` and both rows (including the struck row and `k8`), both chips, the service states, both comparison column headers, all four values, `=` and `≠`, the verdict, both table rows, `tickets: 1`, `keep` and `rule` must be readable.
2. Comparison order: the key row is marked `=` before the release row is marked `≠`; rejection follows the `≠`.
3. No overwrite: the key record reads `k7 → 47 · v1` and the ticket `47 v1` in every frame; `tickets: 1` never changes; no chip travels toward the tickets table.
4. Handled error: `rejected` and `got error` use accent styling; no crash sound, red burst or `failed`.
5. New key: `k8` appears only after the rejection, paired with `release v2`; `k7 · release v1` remains in the runner store.
6. Scope: no request with k8 is sent and no ticket 48 appears.
7. Clearance: comparison text and marks fit the service box; chips clear labels; `rule` fits the frame; nothing enters the title band.
8. Silent reading: with sound off and words ignored, a viewer sees a second row appear at the top with a matching first word; a chip goes down; a two-column table in the middle fills, one row gets an equals mark and the next a not-equal mark; a chip returns, the second top row is struck through; the bottom rows pulse unchanged; the struck row is replaced by one with a different first word.
9. Audio: the dry run lists one `miss` at 14.2 s, one soft `thump` at 19.0 s, one `deliver` C4 at 20.6 s, one `store` B5 at 28.0 s, no `store` E5, and one quiet `chime`. Full-decode the encode, confirm an audio stream, peak below −0.5 dBFS and moov before mdat. Record whether audio was heard or only analysed.
10. After encoding run `python3 scripts/check_media.py --concept idempotency`; a new encode needs renewed comparison review bound to its SHA-256.

## Production boundary

Only this anonymous plan is written. No render, scene source, public media, site, shared skill, Git commit or deployment. Later implementation uses the repository-pinned Puppeteer and a cut-local engine copy, with any drawing extension local to the cut.

