# Lesson 05 — Failover can lose data — plan B

Independent plan for the motion-v2 cut of replication-and-consistency lesson 05. Authored from `video/replication-and-consistency/sequence/lessons.json` item 5, the `sources`, overview and example in `content/concepts/replication-and-consistency.json`, `docs/editorial-workflow.md` and the architecture-flow-video skill references. The earlier motion-v2 plans for lessons 01–04 were read only to vary geometry. No other lesson 05 plan, authoring source or production ledger was consulted. This document names no authoring model.

## Scope

One mechanism: **with asynchronous replication, the primary acknowledges application revision v8 before shipping it. If the primary fails inside that window, the promoted standby serves what it actually holds, v7, and the acknowledged v8 is absent from the new primary.**

The viewer should feel one contradiction that persists to the end: a green receipt for `v8` in the application, and a read that returns `v7` from the new primary. The cause must be visible as geometry: the v8 column on the standby lane was empty *before* the crash, stayed empty *through* promotion, and is still empty when the read arrives. Nothing is removed on screen at any point.

Grounding: lesson beats ("Async replication: v8 was acknowledged. The standby only has revision 7", "The primary fails before shipping v8. Its newest change is absent elsewhere", "The standby is promoted. It can serve the data it actually has", "Revision 8 is missing after failover. Choose durability requirements explicitly"); intro ("If an asynchronous primary fails before a recent change reaches the standby, promoting that standby can lose the acknowledged change"); takeaway ("This illustrates an asynchronous failure window, not every replication configuration"). Record R42 and revisions v7/v8 come from the concept example. Sources as recorded in the concept, retrieved 2026-10-19: [PostgreSQL 18 — Log-shipping standby servers, §§26.2.5, 26.2.8](https://www.postgresql.org/docs/18/warm-standby.html), [PostgreSQL 18 — Write Ahead Log, synchronous_commit and Table 19.1](https://www.postgresql.org/docs/18/runtime-config-wal.html).

Out of scope, and absent from the screen: automatic election or failure detection, any failover protocol, fencing, synchronous modes and their guarantees, WAL positions or LSNs, receive versus replay (lesson 04), replica staleness on reads (lessons 02–03), the fate of the old primary's disk, rejoining the old primary, retries and concurrent writers. Promotion is drawn as one explicit operator action so the clip cannot suggest the system decided it.

## Geometry

A **two-lane revision graph**, read like a horizontal commit graph. Each database node owns a horizontal lane; its revisions sit as chips in shared columns (v6, v7, v8). A vertical ship link joins the two lanes in each column. Copies line up vertically, so a missing copy is an empty slot directly under its original, visible without words.

Above the lanes, an application panel keeps a persistent **receipt** row and a **read** row. Between them, a small connection **endpoint** with two ports and a chevron pointer shows which node serves the application. Below the lanes, an operator terminal issues the promotion. This differs from lesson 01's record inspectors, 02's sequence trace, 03's verifier panel over a revision rail and 04's newest-first log with two cursors. No physical metaphors and no generic three-box pipeline: the lanes, columns and empty slot carry the lesson.

Stage 1080 × 1920, background `#050506`, palette from `style.md`. Coordinates are centres unless bounds are given.

| Element | Engine type | Centre (x, y) / bounds | Size / text | Initial state |
|---|---|---|---|---|
| Title | meta | y ≈ 270 | `Failover can lose data`, 72 px (104 px overflows) | yellow |
| Subtitle | meta | y ≈ 355 | `ASYNC REPLICATION` | grey, wide tracking |
| `app` panel | `box` | 540, 570; x 140–940, y 460–680 | label `app` 34 px at top-left (190, 495) | stroke `mid` |
| Receipt row | local `row` | 600, 540; 560 × 70 | `ack  R42 v8` 44 px mono | hidden (alpha 0) |
| Read row | local `row` | 600, 625; 560 × 70 | `read  —` 44 px mono | `mid` |
| `endpoint` | `box`, 2 ports | 200, 830; x 40–360, y 790–870 | label `endpoint` 34 px; port0 x 240 (A), port1 x 100 (B) | pointer at port0, port0 teal |
| Node `A` | `box` | 180, 1110; 240 × 120 | label `A` 40 px; sublabel `primary` 32 px | stroke `fg` |
| Node `B` | `box` | 180, 1420; 240 × 120 | label `B` 40 px; sublabel `standby` 32 px | stroke `mid` |
| A lane rail | `wire` | (300, 1110) → (1000, 1110) | dotted | grey |
| B lane rail | `wire` | (300, 1420) → (1000, 1420) | dotted | grey |
| Revision chips, lane A | local `slot` × 3 | x 450 / 650 / 850, y 1110; 150 × 76 | `v6` `v7` 44 px mono; v8 slot empty dashed | v6 alpha 0.5, v7 teal fill, v8 empty |
| Revision chips, lane B | local `slot` × 3 | x 450 / 650 / 850, y 1420 | `v6` `v7`; v8 slot empty dashed | same as A |
| Ship links | `wire` × 3 | (x, 1150) → (x, 1380) at x 450 / 650 / 850 | dotted | v6/v7 teal at 0.5 alpha (already shipped); v8 `dim` |
| Window bracket | local `bracket` | x 760–940, y 1060–1470 | open rounded rectangle around the v8 column | hidden |
| Operator | local `terminal` | 180, 1700; 240 × 100 | prompt `$` 36 px mono; label `operator` 30 px below (y 1775) | `mid` |

Wires: app.bottom (540, 680) → (540, 740) → (200, 740) → endpoint.top (200, 790). Port0 (240, 870) straight down to A.top (240, 1050). Port1 (100, 870) → (30, 900) → (30, 1420) → B.left (60, 1420); this gutter wire runs 30 px clear of A's left edge. Operator.top (180, 1650) → B.bottom (180, 1480).

Labels stay sparse: node names, roles, revision chips, `ack`, `read`, `promote`, and the one window tag `unshipped` (30 px, amber, at 850, 1515, below the bracket's B half). The A and B role sublabels are the only words that change.

Native 350 px acceptance (scale 0.324): 44 px chips become ≈ 14 px, 34 px labels ≈ 11 px, 30 px tags ≈ 10 px. At 350 px the viewer must still distinguish: the empty v8 slot on lane B versus the filled one on lane A, the red failed A box, which port the endpoint chevron points at, and the receipt `v8` versus the read `v7`. Shape carries each of these as well as colour: the empty slot is dashed, the failed node has a ×, the chevron moves, and the receipt and read differ in digit.

## Beat sheet

Authored at speed 1, total 38 s. Render with `meta.speed: 0.9` for about 42 s of playback. Pitches from one chord: A node G5, B node C5, app A5, operator D5; sends an octave up and quieter.

| # | Time (s) | What moves | Persistent state after the beat | Sound |
|---|---|---|---|---|
| 1 | 0.0–8.5 | 0–0.6 stage fades in. 1.0–2.6 chip `SET v8` travels app → endpoint port0 → A. 2.6 A's v8 slot fills white, then teal; white ripple. 3.2–4.0 chip `ack` returns A → endpoint → app. 4.0 receipt row pops in with overshoot, green outline: `ack  R42 v8`. 4.6 bracket fades in amber around the v8 column; tag `unshipped`; B's empty v8 slot outline turns amber dashed. 4.6–8.5 a small amber dot pulses at the top of A's v8 ship link (queued, not sent), period 1.0 s. | The app holds a receipt for v8. A has v8. B's v8 slot is empty inside an amber window. The ship link for v8 carries nothing. Hold 4.8–8.5. | 1.0 `send` A6 gain 0.3. 2.6 `store` G5. 4.0 `deliver` at A5, bright (success as the app sees it). 4.6 two soft `clock` ticks 0.5 s apart, gain 0.2 (the window is open). Silence until 8.5. |
| 2 | 8.5–15.0 | 9.0 A snaps red, shakes ±14 px for 0.45 s, × pops in, big red ripple. 9.0 the queued amber dot stops. 9.3 A lane rail, port0 wire and the v8 ship link turn red dashed. A's v8 chip dims to alpha 0.45 with a red outline, text `v8` still readable. | A is down; its v8 is unreachable but still drawn. B is unchanged: v6, v7, empty v8 slot. The receipt stays green. Hold 9.8–15.0. | 9.0 `crash`, the loudest cue. Silence 9.8–15.0. |
| 3 | 15.0–23.0 | 15.3 operator brightens; `$ promote B` types in (0.5 s). 15.8–16.6 chip `promote` travels operator → B. 16.6 B sublabel switches `standby` → `primary`, B stroke to `fg`, pulse. 17.6–18.2 endpoint chevron slides port0 → port1; port1 turns teal; gutter wire flows teal once. B's lane does not move or flash. | B is the primary holding v6, v7 and the same empty v8 slot. The endpoint now routes to B. Hold 18.4–23.0. | 15.3 three `work` ticks (typing) D4, gain 0.25. 15.8 `send` D6. 16.6 `recover` sweep, then `chime` 17.2. 17.6 `ack` blip panned left (pointer move). |
| 4 | 23.0–31.0 | 23.0–24.6 chip `GET R42` travels app → endpoint port1 → gutter → B. 24.6 B's v7 chip pulses white. 25.0–26.4 chip `v7` returns to the app. 26.4 read row switches to `read  R42 v7`, white (a valid answer). 27.0 red ripple with × centred on B's empty v8 slot; bracket turns red; `unshipped` tag turns red. 27.4 receipt row outline shifts green → red; its text is unchanged. | The app shows `ack R42 v8` above `read R42 v7`. The new primary's lane ends at v7 with a red-marked empty v8 slot directly under A's dimmed v8. Hold 27.8–31.0. | 23.0 `send` A6. 24.6 `arrive` C5. 26.4 `deliver` at C5, lower than beat 1's A5. 27.0 `thump` (the absence). No second crash. |
| 5 | 31.0–38.0 | 31.0 receipt and read rows pulse once together. 31.2–35.0 stillness. 35.0–36.2 `s.fade` to black. 36.2–38.0 black. | Final frame before the fade holds the whole argument: green-turned-red receipt for v8, read v7, empty v8 slot on the serving node, failed A. Story ends in a new state, so it fades and does not loop back. | 31.0 low two-note pair A5 then C5 at gain 0.3 (the receipt's pitch falling to the read's). Silence through the fade. |

The clip survives with every word removed: a write lands on the top lane and an ack returns before anything crosses to the lower lane; the top lane breaks; the lower lane takes over the routing without changing; a read returns from the lower lane, and the empty slot under the original is marked.

Holds after beats 1–4 run 3.2–4.6 s at speed 1 (about 3.6–5.1 s played). Each asks for a comparison across the column (A filled, B empty) or across the app rows (ack v8, read v7), so they run longer than the 1.5–2.5 s default.

## Engine notes

- Local node types, named for shape, added in a copy of `scripts/` beside the scene with half-sizes registered in `s.pt`: `slot` (framed chip: `text`, `frameColor`, `dashed` 0–1, `fill` 0–1, `fillColor`, `alpha`), `row` (left-aligned text field with outline: `text`, `color`, `outline`), `bracket` (rounded open frame: `color`, `alpha`), `terminal` (rounded panel with a mono line: `text`, `color`).
- The queued dot in beat 1 is four scheduled alpha pulses on a small local dot node at (850, 1160), never a travelling packet, so it cannot read as data lost in flight.
- Typing in beat 3: switch the terminal `text` through `$ p`, `$ prom`, `$ promote B` with `dur 0`, 0.17 s apart.
- Route packets with `kind: 'chip'`; the receipt and read results live in `row` nodes so they persist after their packets fade.
- Dry-run the cue list in Node before rendering: one cue per listed event, `crash` at 9.0 highest gain, nothing between 9.8 and 15.0 or between 18.4 and 23.0.

## Stills to check (playback seconds at 0.9)

2.0 (write in flight), 7.5 (receipt green, amber window, B v8 empty), 13.0 (A failed, B unchanged), 21.5 (B primary, chevron on port1, B lane identical to 13.0), 33.0 (ack v8 over read v7, red × slot), 41.5 (black). View each at full size and at 350 px width. Acceptance at 350 px: the empty versus filled v8 slots, the × on A, the chevron position and the `v8`/`v7` digits in the app rows are all legible; no tag collides with ripples, packets or the gutter wire. Compare the B lane pixel region between 13.0 and 21.5: it must be identical apart from the B box stroke and sublabel, which is the visual proof that promotion changed nothing in B's data.

## Accuracy limits

These belong in the write-up and review notes, never on screen.

- **Acknowledgement depends on the replication mode.** The clip depicts asynchronous replication: the primary acknowledges after its own commit and waits for no standby, so a committed transaction can exist only on the primary. With synchronous standbys configured, `synchronous_commit` = `remote_write`, `on` or `remote_apply` makes the commit wait for those standbys, which closes this specific window for them at a latency and availability cost. The clip shows none of those modes and should not be cited for their guarantees.
- **Promotion does not delete.** The promoted standby simply never received v8. The clip leaves A's v8 drawn but dimmed to say it is unreachable to the application; it makes no claim about whether A's storage survives, whether v8 could be recovered from it, or how A could rejoin.
- **No failover mechanism is depicted.** PostgreSQL itself does not elect a new primary; promotion is triggered by an operator or external tooling. The terminal stands for any explicit trigger. Failure detection, fencing and split-brain prevention are out of scope.
- **The endpoint is illustrative.** It stands for whatever routes the application to a database (connection string, DNS, proxy). It is not a PostgreSQL component.
- **Revisions are application values.** `v6`–`v8` are application revisions of R42 in a single-writer scenario, not WAL positions, LSNs or transaction IDs. One chip stands in for the WAL records of a whole transaction.
- **Timing is stretched.** The real window is usually short and depends on load and network; the clip holds it open for seconds so the empty slot can be read.

## Review prompts

For the comparison reviewer: at about 7.5 s played, can a viewer without the title tell that v8 exists only on A while the app already holds a receipt? Between 13.0 and 21.5 s, does anything suggest promotion removed or altered B's data? Does the dimmed v8 on A read as unreachable rather than erased? Does the final red outline on the receipt read as "this promise was not kept" without implying the write was rejected at the time?

