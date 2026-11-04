# Lesson 04 — Retry the same key — plan B

Independent plan for the motion-v2 cut of idempotency lesson 04. Authored from the lesson entry in `video/idempotency/sequence/lessons.json` (item 4) and the concept content in `content/concepts/idempotency.json`. Earlier motion-v2 beat sheets were read only to vary the geometry. No other plan for this lesson, no production ledger, and no authoring source was consulted. This document names no authoring model.

## Scope

One mechanism: **after losing the first reply, the caller resends the same request with the same saved key, k7; the service looks up k7, finds the record that points to ticket 47, and takes the "found" path, returning the existing result instead of creating anything; the caller finally receives ticket 47 and the database still holds exactly one ticket.**

The viewer should feel three things. The retry carries the same key the caller saved earlier (`k7`, taken from the runner store, not newly generated). Inside the service, a two-way decision lights only its `found` branch; the `new → create ticket` branch stays dark, and nothing is written. The `tickets: 1` counter never moves, while the caller's `knows` field finally becomes `ticket 47`. Two attempts produce one effect.

Grounding: lesson beats ("the caller still needs its result. It reuses the saved key k7", "the service looks up k7. Its record points to ticket 47", "the existing result is returned. No second ticket is created", "the caller receives ticket 47. The intended effect remains one ticket"); intro ("after losing the response, the caller resends k7 with the same release payload. The service finds the previous result"); takeaway ("the retry reuses the recorded effect instead of creating a second ticket. This depends on the service contract and key retention"); concept walkthrough step 4 ("drop the first reply after commit and restart the runner. Its retry should take the lookup path") and judgement ("specify… retention… Stripe… permits pruning keys after 24 hours"; "a key is not authorization"). Sources per the concept file: [AWS Builders' Library — Making retries safe](https://aws.amazon.com/builders-library/making-retries-safe-with-idempotent-APIs/), [Stripe API — idempotent requests](https://docs.stripe.com/api/idempotent_requests) (contract and retention vary), [RFC 9110 §9.2.2](https://www.rfc-editor.org/rfc/rfc9110.html#section-9.2.2).

Out of scope: a different payload under k7 and the comparison that rejects it (05). The service's payload check is not drawn; the retry is stated to carry the same `release v1`. Concurrent duplicate attempts, retention expiry and authorization are named in the accuracy limits only.

Grammar for this cut: **the caller at the top with its runner store and `knows` field; the service in the middle drawn as a small decision: a `lookup k7` step that splits into two branches, `found → return saved result` (left) and `new → create ticket` (right); the database at the bottom with `operation keys` and `tickets`, and a `tickets: 1` counter; an attempt log (`attempt 1 · reply lost`, `attempt 2 · retry k7`) at the side of the caller.** Lesson 03 showed the transaction that stored the key; here the decision branch the key selects is the new object. Every element is a software object: a runner store, a retry, a key lookup, code branches, tables and a counter. No boomerangs, mirrors or replays of tape.

Target length ≈ 44 s at speed 1 (`meta.speed: 1`). Hold on the dark `create` branch while the `found` branch returns; that contrast is the lesson.

## Engine notes

Use `box` for caller, service and database; `store` for runner store (1 row), `operation keys` (1 row), `tickets` (1 row) and the attempt log (2 rows); `box` outlines for the two branch boxes; `s.wire` for request/reply lanes, the lookup path, and the two branch arrows (the create arrow stays dashed and dim); `label` for states and the counter; chips for the request, lookup and reply. No new node type is expected. Use a cut-local engine copy with the repository-pinned Puppeteer.

## Stage and coordinates (1080 × 1920)

Palette follows `references/style.md`. Minimum on-screen text 40 px (≈ 13 px at 350 wide); names 44 px; monospace at 40 px ≈ 24 px per character. Content stays within x 40–1040 and y 480–1700.

| id | type | centre / bounds | text | notes |
|---|---|---|---|---|
| title | title band (540, 330) / (540, 405) | — | **Idempotency** / RETRY THE SAME KEY | |
| caller | box | x 40–1040, y 480–760 | label `caller` 44 px at (150, 520); state 40 px mono at (880, 520) `outcome unknown` (accent) → `retrying` → `waiting` → `has ticket 47` (ok) | C5 |
| runner | store, `rows: 1`, w 560 | (340, 600), x 60–620 | label `runner store` 40 px mono, mid at (340, 565); row `k7 · release v1` | from lesson 03 |
| knows | label | (340, 700), 40 px mono | `knows: nothing` → `knows: ticket 47` (ok) | |
| attempts | store, `rows: 2`, w 380 | (840, 650), x 650–1030 | `1  reply lost` (mid) · `2  retry k7` (appears beat 1) | |
| reqLane | wire | (340, 760) → (340, 860) | — | |
| retLane | wire | (520, 860) → (520, 760) | — | |
| service | box | x 40–1040, y 860–1260 | label `service` 44 px at (150, 900); state at (880, 900) `idle` → `looking up` → `found` → `replied` | G5 |
| lookup | label box | (540, 975), 360 × 70 | `lookup k7` 40 px mono | |
| brFound | box | (290, 1150), 440 × 110 (x 70–510) | `found →` / `return saved result` (two lines, 40 px mono) | lights ok in beat 2 |
| brNew | box | (790, 1150), 440 × 110 (x 570–1010) | `new →` / `create ticket` | stays dim, dashed; never lit |
| arrF / arrN | wires | lookup bottom (480, 1010) → brFound top (290, 1095); (600, 1010) → brNew top (790, 1095) | — | arrN dashed, dim |
| db | box | x 40–1040, y 1320–1640 | label `database` 44 px at (150, 1360) | E5 |
| tKeys | store, `rows: 1`, w 440 | (290, 1470), x 70–510 | header `operation keys` at (290, 1420); row `k7 → 47` | |
| tTickets | store, `rows: 1`, w 440 | (790, 1470), x 570–1010 | header `tickets` at (790, 1420); row `47  v1` | |
| counter | label | (790, 1580), 44 px mono | `tickets: 1` | never changes |
| lookPath | wire | lookup left (360, 975) → (60, 975) → (60, 1470) → tKeys left (70, 1470) | — | the k7 read |
| final | label | (540, 1680), 40 px mono, ok | `2 attempts · 1 ticket` | beat 4 |

Chips: `create v1 · k7` two-line chip (≈ 220 × 96) down reqLane; `k7?` (≈ 96 px) along lookPath and `→ 47` (≈ 120 px) back; `ticket 47` (≈ 216 px) up retLane. Check that branch text fits its box at 40 px, that the lookPath route at x 60 clears the service label, and that the dashed brNew remains readable but clearly unused.

## Sound map

Actor pitches: caller **C5**, service **G5**, database **E5**; the key cue **A5** (same as lesson 03) plays whenever k7 is sent or looked up.

| event | preset | notes |
|---|---|---|
| retry prepared from runner store | `ack` A5 | the same key, reused |
| request with k7 sent / received | `send` C6 + quiet `ack` A5, `arrive` G5 | |
| lookup k7 | `send` A6 | |
| record found | `hit` A5 | the decisive cue |
| found branch lights | `ack` G5 | |
| create branch | no sound | silence is deliberate |
| tickets counter pulse at 1 | `ack` E5, quiet | unchanged |
| reply sent / received | `send` G6, `deliver` C5 | |
| caller knows ticket 47 | `store` C5 | |
| final `2 attempts · 1 ticket` | `chime` C5 + E5, quiet | the only chime |

No music, no `store` E5 (nothing is written to the database).

## Beat sheet (speed 1)

| time | what moves | state change | sound |
|---|---|---|---|
| **Beat 1 — The caller still needs its result; it reuses the saved key k7 (0–9.0)** | | | |
| 0.0–1.0 | all panels fade in | caller `outcome unknown`; runner `k7 · release v1`; `knows: nothing`; attempts row `1 reply lost`; db rows `k7 → 47`, `47 v1`; `tickets: 1` | — |
| 2.0 | attempts row `2 retry k7`; caller `retrying` | | — |
| 2.8 | runner row pulses; a short highlight runs from runner row to the request lane top | the key comes from storage | ack A5 |
| 2.8–9.0 | hold | | |
| **Beat 2 — The service looks up k7; its record points to ticket 47 (9.0–18.0)** | | | |
| 9.0–10.4 | two-line chip `create v1` / `k7` down reqLane | caller `waiting` | send C6, ack A5 |
| 10.4 | ripple at service; service `looking up`; lookup box brightens | | arrive G5 |
| 11.2–12.4 | chip `k7?` along lookPath to tKeys | | send A6 |
| 12.4 | tKeys row `k7 → 47` outlined ok | | hit A5 |
| 13.0–14.2 | chip `→ 47` back to lookup | service `found` | — |
| 14.2–18.0 | hold | | |
| **Beat 3 — The existing result is returned; no second ticket is created (18.0–26.0)** | | | |
| 18.0 | arrF solid ok; brFound lights ok | | ack G5 |
| 18.6 | brNew and arrN pulse dim (stay dashed) | the create path is not taken | — |
| 19.4 | tTickets row `47 v1` and counter `tickets: 1` pulse | nothing new written | ack E5 (quiet) |
| 20.2 | service `replied` | | — |
| 20.2–26.0 | hold | | |
| **Beat 4 — The caller receives ticket 47; the intended effect remains one ticket (26.0–44.0)** | | | |
| 26.0–27.2 | chip `ticket 47` up retLane | | send G6 |
| 27.2 | ripple at caller; `knows: ticket 47`; caller `has ticket 47` | | deliver C5, store C5 |
| 28.2 | attempts rows 1 and 2 pulse, then counter `tickets: 1` | | — |
| 29.0 | final `2 attempts · 1 ticket` | | chime C5 + E5 (quiet) |
| 30.0–42.4 | hold | final state | |
| 42.4–43.2 | `s.fade` to black, 0.8 s | finite ending | — |
| 44.0 | end | | |

## Accuracy limits

- The retry carries the same key and the same payload (`release v1`). Comparing payloads, and rejecting a mismatch, is lesson 05; this cut does not show the comparison step.
- Replay works only while the key record is retained. If records are pruned before a delayed retry (Stripe documents pruning after 24 hours in API v1), the same key could look new. Not shown.
- Concurrent attempts with k7 rely on the unique constraint and transaction behaviour from lesson 03; only one retry is shown here.
- What a replay returns depends on the service contract (for example, whether saved failures are replayed). This design returns the saved ticket.
- A key is not authorization; access checks still apply on the retry. Not drawn.
- Durations are illustrative; no timing numbers appear.

## Native 350 acceptance

These are requirements for the future render, not completed validation.

1. Decode actual frames (avoid relying only on a contact sheet) at 1080 and at 350 px wide around 2.1, 2.9, 6.0, 9.6, 10.5, 11.8, 12.5, 13.6, 14.3, 16.0, 18.1, 18.7, 19.5, 20.3, 23.0, 26.6, 27.3, 28.3, 29.1, 35.0 and 42.8 s. At 350 px, the caller label and states, `runner store` and its row, `knows`, the attempt log, the two-line chip, `service` and states, `lookup k7`, both branch boxes, both table headers and rows, `tickets: 1` and the final line must be readable.
2. Same key: the request chip shows `k7`, matching the runner row; no new key appears.
3. Found path only: brFound lights; brNew and its arrow stay dashed and dim in every frame; no chip travels toward `tickets`.
4. One effect: `tickets: 1` and a single ticket row hold in every frame.
5. Reply received: `knows: ticket 47` appears only after the reply chip lands.
6. Scope: no payload comparison, mismatch, rejection, second caller or expiry appears.
7. Clearance: branch text fits; lookPath clears labels; nothing enters the title band; no chip remains during a hold.
8. Silent reading: with sound off and words ignored, a viewer sees a top row pulse and a chip with the same text go down; a probe goes to the lower-left table and lights a row; in the middle, the left branch box lights while the right one stays dim and dashed; a chip returns to the top and a field fills; a number at the bottom never changes.
9. Audio: the dry run lists one `hit` A5 at 12.4 s, one `deliver` C5 at 27.2 s, no `store` E5, and exactly one quiet `chime`. Full-decode the encode, confirm an audio stream, peak below −0.5 dBFS and moov before mdat. Record whether audio was heard or only analysed.
10. After encoding run `python3 scripts/check_media.py --concept idempotency`; a new encode needs renewed comparison review bound to its SHA-256.

## Production boundary

Only this anonymous plan is written. No render, scene source, public media, site, shared skill, Git commit or deployment. Later implementation uses the repository-pinned Puppeteer and a cut-local engine copy, with any drawing extension local to the cut.

