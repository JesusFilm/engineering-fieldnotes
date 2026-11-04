# Lesson 04 — Received is not applied

## Intent

One mechanism: WAL reaches a PostgreSQL standby before replay makes the represented change visible to a fresh query. Show revision 7 remaining readable while the WAL for revision 8 is present; replay then advances the visible row, and a new query returns 8.

Five beats, 38 seconds, finite ending. Timing is illustrative, not a PostgreSQL latency claim. No narration is required. This is a plan only.

## Stage and visual grammar

1080 × 1920 portrait; coordinates below are pixels from the top left. Near-black background, off-white content, muted grey inactive outlines, amber pending WAL and teal completed replay. No failure red. Use a software debugger-like view: a horizontal WAL strip, a replay cursor, one database row, and a query/result terminal. Avoid server racks, three equal boxes, conveyor belts or falling objects.

- Title, centered at (540, 290), two lines: `Received` / `is not applied`, 76 px. Stable throughout.
- Primary: compact source bracket, bounds (150, 480)–(470, 620); `Primary` centered at (310, 455), 50 px. A WAL chip starts centered at (310, 550), size 220 × 84, labeled `WAL →8` at 48 px. This is an illustrative change identifier, not literal WAL contents.
- One standby boundary: open corner brackets at (100, 740)–(980, 1500), label `Standby` at (250, 710), 50 px. The WAL strip and visible row are both inside this same boundary.
- WAL strip: bounds (210, 845)–(870, 945), with three divisions centered at x=320, 540, 760. Earlier divisions contain only muted strokes. The last division receives the chip at (760, 895). `WAL` at (260, 810), 48 px; short receipt label `Received` centered at (760, 1005), 46 px, appears only on arrival.
- Replay cursor: a 10 px vertical scan line, y=830–960, initially x=540, with an upward triangle at (540, 975). `Replay` centered below the cursor at y=1075, 48 px. Cursor movement means replay progress, never receipt or flush progress.
- Query-visible row: a single ruled table row, bounds (210, 1260)–(870, 1400). `revision` at (370, 1330), 50 px; value at (760, 1330), 92 px. Initially 7. Thin header `Row` at (260, 1205), 48 px.
- Query terminal: prompt at (300, 1650), `SELECT` at 52 px, a right-side result area centered at (760, 1650), 100 px. Use an underline and a prompt caret, not another enclosing node. Each returned value is a frozen result, separate from the row above.
- WAL travel path: (310, 620) → (310, 670) → (760, 670) → (760, 845). A thin dotted route with arrowhead only at the destination. Query path: (300, 1605) → (300, 1400). Result path: (760, 1400) → (760, 1580). No path from the WAL strip directly to the query terminal.
- Replay-to-row dependency: dormant right-angle trace (870, 895) → (930, 895) → (930, 1220) → (760, 1220) → (760, 1260). It lights only when replay reaches the represented commit boundary. It expresses causality, not a second network transfer.

At 350 px width, 46 px labels become about 15 px and values about 30–32 px. Keep strokes at least 6 px, moving markers at least 28 px, and 30 px clearance around text. Keep the last result above y=1740. Use fixed framing; no zoom is needed to read the mechanism. Primary and its route dim after receipt, while the standby label remains readable.

## Beat sheet

| Time | Motion and attention | State change and useful hold | Sound events |
| --- | --- | --- | --- |
| **1 · 0–6 s: establish the readable row** | 0–0.6: stage settles in. At 1.2 a small query marker rises from terminal to row over 0.7 s. A bracket selects the row value at 2.0; a copy of `7` descends to the terminal during 2.5–3.2. The original row stays in place. | Terminal changes from empty to `7`; row is 7 and replay cursor is before the last WAL division. Hold 3.2–6.0 so the viewer learns the read path before the discrepancy. | `send` at 1.2, C6/1047 Hz, quiet; `arrive` at 1.9, C5/523 Hz; `deliver` at 3.2, C5/523 Hz. No idle ticking. |
| **2 · 6–14 s: receipt without replay** | At 6.0 clear the previous result over 0.4 s. At 6.8 the primary chip gains its amber outline, then follows the WAL route during 7.5–9.0. At 9.0 it docks in the last strip division; a small white arrival ripple and `Received` label appear. Dim the primary during 10.0–10.5. | Receipt slot changes from empty to occupied. Replay cursor remains at x=540 and row remains 7. The arriving chip does not turn teal and receives no durability checkmark. Deliberately hold the received-but-unapplied configuration from 10.5–14.0. | `send` at 7.5, E6/1319 Hz; `arrive` at 9.0, E5/659 Hz. Receipt has a distinct pitch from a query result. No `store`, `ack`, or success chime at arrival. |
| **3 · 14–22 s: query still returns 7** | At 14.5 use the exact same query motion and row selection as beat 1: reach row at 15.2, select at 15.3, copy its `7` to terminal during 15.8–16.5. Keep the received chip fully visible. At 18.8 briefly brighten the stationary cursor's triangular pointer once, without moving it. | Terminal becomes 7 while the received change is →8. No result is derived from the WAL chip. Hold 16.5–18.8 to compare chip, cursor and result; hold again 19.2–22.0 after the pointer emphasis. This is a successful read of older state, not an error. | `send` at 14.5, C6; `arrive` at 15.2, C5; `deliver` at 16.5, C5, exactly matching beat 1. Soft `work` tick at 18.8, E4/330 Hz, tied to pointer emphasis, not a replay advance. |
| **4 · 22–30 s: replay changes the row** | During 22.5–25.0 scan the replay cursor from x=540 through the received division to x=870. Amber fill behind the cursor reveals processing. At 25.0–25.6 illuminate the dependency trace toward the row. At 25.6 replace the row's 7 with 8 using a short clipped vertical text replacement, not an in-between numeric count. At 26.0 change `Received` to `Replayed` and settle the scanned division to teal. | Treat the end of the scan as replay through the relevant transaction's commit record. Row becomes 8 only at completion. The prior terminal result deliberately remains 7: an already returned query does not update itself. Hold 26.0–30.0 to expose this distinction. Retain the WAL chip as a dim record; replay does not consume/delete WAL. | Sparse `work` ticks at 22.5, 23.3 and 24.1, E4; `store` at 25.6, G5/784 Hz, marking applied row state only; a short `chime` at 26.0, G5, quieter than the row-change cue. |
| **5 · 30–38 s: a fresh query sees 8** | At 30.0 clear the old terminal result and re-light the prompt caret. At 31.0 send a new query marker; reach the row at 31.7, select 8 at 31.8, copy it downward during 32.3–33.0. Do not reuse or morph the old 7 result. | New terminal result is 8; row is 8; cursor has passed the received WAL. Hold 33.0–37.2 as the finite resolution. Fade stage and title over 37.2–38.0. No reset to 7 or suggestion of replay reversal. | `send` at 31.0, C6; `arrive` at 31.7, C5; `deliver` at 33.0, G5/784 Hz. Silence during the ending hold and fade. |

Sound pans to the event's x coordinate. Sends are quieter than arrivals; no music bed or alarming effects. The returned value and source row make the outcome understandable muted. All long still intervals above are deliberate comparison or resolution holds, not simulated polling time.

## Accuracy boundaries and source evidence

Sources checked 2026-11-03. The concept file has no literal `scope` field; its overview, example, judgment and learning material establish the wider context. This lesson selects only its receipt/replay distinction.

- PostgreSQL streams WAL to standbys, and a query-capable standby can replay independently of WAL arrival. The strip is an explanatory view of ordered log progress, not PostgreSQL's physical memory layout. [PostgreSQL 18, Log-Shipping Standby Servers, §§26.2.5 and 26.2.8](https://www.postgresql.org/docs/18/warm-standby.html).
- Receipt, durable flush and replay are different milestones. An arrival ripple asserts receipt only; flushing is not animated. Even flushed WAL need not yet be replayed. Acknowledgement guarantees depend on configuration: with synchronous standbys configured, `on` waits for their durable WAL flush; `remote_apply` additionally waits for replay; `remote_write` does not require durable standby storage. Do not add a generic ACK arrow or imply that every acknowledgement waits for apply. This caveat belongs here, not in an extra policy beat. [PostgreSQL 18, synchronous_commit and Table 19.1](https://www.postgresql.org/docs/18/runtime-config-wal.html#GUC-SYNCHRONOUS-COMMIT).
- The single `WAL →8` chip summarizes the WAL required for one committed change, including its commit record. It is not a claim that an application revision is an LSN, a WAL record format, or that replaying any one data record makes a transaction visible. The replay scan includes the relevant commit boundary before the row changes.
- Assume one writer, one selected row, no intervening writes, and a query-capable standby. The final plain SELECT starts with a fresh Read Committed snapshot after replay. An older snapshot can still see older data; an already returned result remains fixed. `7` and `8` are application revision values. [PostgreSQL 18, Transaction Isolation, §§13.2.1–13.2.2](https://www.postgresql.org/docs/18/transaction-iso.html).
- Replay's visible delay is staged to expose causality. It is not a measured lag, fixed wait recommendation, manually paused recovery procedure, or guarantee about every standby. Do not add failover, retries, multi-standby selection, a mode matrix or primary-read routing.

## Plan acceptance checks

At the planned 350 px view, the pivotal still at 17 s must show received →8, stationary replay cursor, row 7 and returned 7 without overlap. At 28 s it must show row 8 and the unchanged earlier result 7; at 35 s the fresh result must be 8. Motion should distinguish arrival (travel and docking), replay (scan and row replacement), and query visibility (selection and copied result) even without color or audio.

Any eventual implementation must inspect those stills, beat boundaries and sound synchronization. No scene, render, listening assessment or production validation has been performed for this plan.
