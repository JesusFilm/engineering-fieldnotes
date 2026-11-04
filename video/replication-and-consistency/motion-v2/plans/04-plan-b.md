# Lesson 04 — Received is not applied — plan B

Independent plan for the motion-v2 cut of replication-and-consistency lesson 04. Authored from `video/replication-and-consistency/sequence/lessons.json` item 4, the `sources` of `content/concepts/replication-and-consistency.json` (its `scope` field is empty, so the overview, example and walkthrough step 4 supplied the boundaries), `docs/editorial-workflow.md` and the architecture-flow-video skill references. The lesson 01–03 motion-v2 plans were read only to vary geometry. No other lesson 04 plan, authoring source or production manifest was consulted. This document names no authoring model.

## Scope

One mechanism: **a PostgreSQL standby can hold a WAL record (received and flushed) before it has replayed that record. Queries on the standby see replayed state, so they still return revision 7. Replay applies the record, and only then can a fresh query return revision 8.**

The viewer should feel one gap. Two position markers sit on the standby's log: `received` jumps to the new record as soon as it lands, while `replayed` stays one record behind. The visible row follows `replayed` and ignores `received`. When `replayed` catches up, the row changes, and a second query sees it.

Grounding: lesson beats ("The primary sends a change record. The replica receives the record", "Receipt does not mean replay finished. Queries may still observe revision 7", "The replica replays the change. Its query-visible state advances", "Now a fresh query can see revision 8. Check what your acknowledgement means"); intro ("Receiving or flushing those records differs from replaying them into query-visible state"); takeaway ("What an acknowledgement proves depends on the configured replication mode"). The record R42 and application revisions 7 and 8 come from the concept example. Sources as recorded in the concept, retrieved 2026-10-19: [PostgreSQL 18 — Log-shipping standby servers, §§26.2.5, 26.2.8](https://www.postgresql.org/docs/18/warm-standby.html), [PostgreSQL 18 — Write Ahead Log, synchronous_commit and Table 19.1](https://www.postgresql.org/docs/18/runtime-config-wal.html), [PostgreSQL 18 — Transaction isolation](https://www.postgresql.org/docs/18/transaction-iso.html).

Out of scope: failover and promotion (05), synchronous standby configuration, quorum policies, the replica-read verification decision (03), retries, conflicts that cancel standby queries, and any acknowledgement packet. The clip draws no acknowledgement at all, so it cannot suggest that an acknowledgement waits for replay or that every arrival is durable. The write-up carries the replication-mode caveat (see Accuracy limits).

## Geometry

A **newest‑first log with two cursors**. The primary sits at the top. Directly below it, inside a standby panel, a single column of WAL records grows upward, newest on top, the way `git log` or a log tail reads. Two chevron cursors point at the column from either side: `received` (amber, left) and `replayed` (teal, right). Under the column, one wire leads down to the standby's **visible** row, which a query client at the bottom of the stage reads.

This differs from lesson 01's stacked record inspectors, lesson 02's sequence trace and lesson 03's verifier panel above a revision rail. It borrows the shape of replication monitoring that engineers already know, where receive and replay positions are separate numbers (`pg_last_wal_receive_lsn()` and `pg_last_wal_replay_lsn()`). The gap reads as two cursors at different heights, with no words needed. No physical metaphors (inboxes, conveyors, mail).

Stage 1080 × 1920, background `#050506`, palette from `style.md`. Flow runs top to bottom: primary → log → visible row → query.

| Element | Engine type | Centre (x, y) | Size / text | Initial state |
|---|---|---|---|---|
| Title | meta | y ≈ 300 | `Received is not applied`, 80 px (104 px overflows the width) | yellow |
| Subtitle | meta | y ≈ 390 | `POSTGRESQL STANDBY` | grey, wide tracking |
| `primary` | `box` | 540, 580 | 440 × 120; label `primary` 40 px; sublabel `R42 r8` 44 px mono | stroke `fg`; sublabel teal (r8 already committed here) |
| Standby panel | `box` | 540, 1180 | 960 × 840 (x 60–1020, y 760–1600); label `standby` 36 px at top‑left (≈130, 805) | stroke `dim` |
| `WAL` header | `label` | 950, 805 | 32 px, right‑aligned | `mid` |
| Log row 0 (top slot) | `label` + frame (local `slot` node, see Engine notes) | 540, 900 | 300 × 80; empty dashed frame | `dim` dashed, no text |
| Log row 1 | slot | 540, 1000 | `R42→r7` 44 px mono | dim teal fill (replayed) |
| Log row 2 | slot | 540, 1100 | `R42→r6` 44 px mono | dim teal fill, alpha 0.5 |
| `received` cursor | local `cursor` node | chevron tip 375, row y; tag right‑aligned ending x 350 | `received` 36 px mono | amber, at row 1 (y 1000) |
| `replayed` cursor | local `cursor` node | chevron tip 705, row y; tag starting x 730 | `replayed` 36 px mono | teal, at row 1 (y 1000) |
| Apply wire | `wire` | (540, 1140) → (540, 1305) | dotted | `wire` grey |
| `visible` header | `label` | 330, 1380 (left of the row, clear of its 430 px left edge) | `visible` 34 px | `mid` |
| Visible row | `box` | 620, 1380 | 380 × 150; text `R42  r7` 64 px mono | teal stroke |
| Query wire | `wire` | (620, 1455) → (620, 1680) | dotted | grey |
| Query client | `laptop` | 620, 1730 | label `query` 34 px below (y ≈ 1800) | `mid` |
| Result chip A | `badge` | 360, 1730 | `r7` 48 px mono | hidden |
| Result chip B | `badge` | 880, 1730 | `r8` 48 px mono | hidden |

The WAL wire runs straight down from `primary.bottom` (540, 640) to the top of log row 0 (540, 860), crossing the panel edge at y 760. Placing the newest slot on top keeps that wire short and free of other rows. The two cursor tags sit on opposite sides of the column, so they never overlap even when both point at the same row. Every tag and chip stays at least 30 px clear of wires and ripples.

Phone check at 350 px (scale 0.324): 36 px tags become ≈ 11.7 px, 44 px record text ≈ 14 px, the 64 px row value ≈ 21 px. Colour is never the only signal: the cursors differ by side and label, and the record row changes from an amber outline to a teal fill.

## Beat sheet

Times are authored at speed 1 and total 32 s. Render with `meta.speed: 0.85`, which gives about 37.6 s of playback; motion stretches and sounds keep their character. Pitches come from one chord: primary G5, log/standby C5, visible row E5, query client A5 (sends an octave up, quieter).

| # | Time (s) | What moves | State change | Sound |
|---|---|---|---|---|
| 1 | 0.0–2.5 | Stage fades in from black over 0.6 s; nothing else moves. | Starting state is readable on its own: primary `R42 r8`, both cursors at `R42→r7`, visible row `R42  r7`. | One soft C5 `arrive` at 0.6, gain 0.3, as the standby settles. |
| 2 | 2.5–7.5 | 2.5 primary pulses white. 2.5–3.6 chip `R42→r8` travels the WAL wire (1.1 s, slower than usual because it is the hero packet). 3.6 white ripple at row 0. 4.3–4.8 `received` cursor slides up from row 1 to row 0 (ease out). | Row 0 fills with `R42→r8` as an **amber outline, no fill** (held, not applied). Row 2 fades to 0.3 as history. `replayed` stays at row 1; visible row stays `r7`. Hold 4.8–7.5. | 2.5 `send` G6 gain 0.35, pan centre. 3.6 `arrive` C5 pan centre. 4.3 `ack` blip (cursor tick), pan left. Silence in the hold. |
| 3 | 7.5–13.5 | 7.5–8.3 chip `SELECT R42` travels up the query wire. 8.3 visible row pulses white. 8.6–9.4 chip `r7` travels down. 9.4 chip A `r7` pops in beside the client with overshoot, grey‑white (a valid answer, not an error). 9.6–13.5 row 0 breathes, its amber outline alpha 0.6 ↔ 1.0 on a 1.2 s period. | The query returned 7 while the log already holds 8. The two cursors sit at different heights for the whole hold, which is the point of the clip. | 7.5 `send` A6 gain 0.3, pan right. 8.3 `arrive` E5 gain 0.5. 9.4 `deliver` at C5, neutral and mid‑level. No `miss`, `thump` or `crash`. Silence 9.6–13.5. |
| 4 | 13.5–19.0 | 13.5–14.3 row 0 fill bar sweeps left to right, amber, then turns teal at 14.3. 14.3–14.8 `replayed` cursor slides up to row 0. 14.8 teal dot runs down the apply wire (0.4 s). 15.2 visible row text switches `r7` → `r8` with a teal ripple; the row pulses. | Row 0 is now replayed (teal fill like the rows below it). Both cursors point at row 0. Visible state advances to `R42  r8`. Hold 15.4–19.0. | 13.5, 13.7, 13.9, 14.1 `work` ticks (replay running), pan centre. 14.3 `ack` pan right (cursor tick). 15.2 `store` at E5, the loudest cue of the clip. |
| 5 | 19.0–25.0 | 19.0–19.8 a new `SELECT R42` chip travels up. 19.8 row pulses. 20.1–20.9 chip `r8` travels down in teal. 20.9 chip B `r8` pops in on the right of the client; chip A dims to 0.35. | Two answers sit side by side under the client: `r7` (before replay, dimmed) and `r8` (after replay, bright). Hold 21.1–25.0. | 19.0 `send` A6 gain 0.3. 19.8 `arrive` E5 gain 0.5. 20.9 `deliver` at E5, higher than beat 3's C5, then a soft `chime` at 21.1 gain 0.4. |
| 6 | 25.0–32.0 | 25.0 both cursor tags pulse together once, amber and teal side by side on row 0. 27.5 everything below the title holds still. 30.0–31.2 `s.fade` to black. | Gap closed: received and replayed point at the same record. The story ends in a new state, so the clip fades rather than looping back to r7. | 25.0 two‑note `ack` pair C6 then E6, gain 0.25. Silence through the fade; final 0.8 s black and silent. |

The holds after beats 2, 3 and 4 run 2.7–3.9 s at speed 1 (about 3.2–4.6 s played). They are deliberately longer than the 1.5–2.5 s default because each one asks the viewer to compare the two cursor heights with the visible row, and that comparison is the lesson.

The clip survives with every word removed: a block arrives, one marker jumps to it, the other does not, a read returns the old value; then the second marker moves, the row changes and a read returns the new value.

## Engine notes

- `slot` (local node, named for its shape): a framed row with `text`, `frameColor`, `dashed` (0–1), `fill` (0–1 bar from left), `fillColor`, `alpha`. Row 0 starts `dashed: 1`, no text; on arrival set `dashed 0`, `text`, `frameColor` amber; the replay sweep tweens `fill` 0 → 1 with `fillColor` amber, then switches to teal.
- `cursor` (local node): a chevron with a tag, props `y`, `color`, `side` (left/right), `label`. Move it with `s.set(t, id, 'y', 900, 0.5, 'out')`. Add both node types to `NODES` in a copy of `scripts/` beside the scene and register their half‑sizes in `s.pt`, per the skill.
- Row 0's breathing in beat 3: schedule four `s.set` alpha tweens up front (0.6 s each way); stop at 13.5 at alpha 1 before the replay sweep starts.
- Query chips use `kind: 'chip'`. Result chips A and B are `badge` nodes, so the earlier answer stays on screen as evidence after its packet has gone.
- Dry‑run the cue list in Node before rendering; confirm one cue per beat event and that `store` at 15.2 has the highest gain.

## Stills to check (playback seconds at 0.85)

2.4 (start state), 6.5 (cursor gap, row 0 amber, visible r7), 11.8 (chip A `r7` during breathing), 18.5 (both cursors on row 0, visible r8), 27.0 (both answers), 37.0 (black). At each, view full size and at 350 px width; confirm the `received` and `replayed` tags never collide with the WAL chip or ripples, and that no amber remains on row 0 after 17 s played.

## Accuracy limits

These belong in the write‑up and the review notes. They stay off screen.

- **Received collapses write and flush.** The standby's WAL receiver writes and then flushes incoming WAL; `pg_last_wal_receive_lsn()` reports the position flushed to disk. The amber cursor stands for "received and flushed". The clip does not show a separate write‑only stage, so it should not be cited for the difference between `remote_write` and `on`.
- **No acknowledgement is drawn.** Whether the primary's commit waited for anything depends on `synchronous_commit` and `synchronous_standby_names`. With asynchronous replication the commit waits for no standby. With synchronous standbys, `remote_write` waits for the standby's operating‑system write, `on` waits for flush to durable storage, and `remote_apply` waits for replay; those waits cover only the synchronous standbys, never every replica a tool might read. Arrival on its own does not prove durability, and an acknowledgement does not prove query visibility unless the mode is `remote_apply` and the read targets an acknowledging standby.
- **Visibility follows replay on a hot standby.** Read‑only queries on a standby (`hot_standby = on`) see data as of the replayed position. Replay can lag for ordinary reasons (load, `recovery_min_apply_delay`, waits for conflicting queries). The 11 s gap is stretched for teaching; real gaps are often milliseconds and sometimes much longer.
- **"Fresh query" matters.** Under Read Committed each statement takes a new snapshot, so the second query can see r8. A query inside an earlier Repeatable Read transaction would keep its older view even after replay. The clip shows two separate statements and does not depict transactions.
- **One record stands in for many.** WAL is a byte stream of many records per transaction, addressed by LSN. The `R42→r8` block abstracts the change and its commit record; `r7`/`r8` are application revisions from the concept example, not PostgreSQL fields.
- **Primary sublabel** `R42 r8` means committed on the primary before the clip begins; the write itself is out of scope.

## Review prompts

For the comparison reviewer: at about 6.5 s played, can a viewer tell, without the title, that the standby holds r8 yet the read will return r7? Does the beat 3 `r7` read as a valid stale answer rather than a failure? Does anything on screen suggest that an acknowledgement waits for replay? Is the fade the right ending, or does it cut the final comparison short?
