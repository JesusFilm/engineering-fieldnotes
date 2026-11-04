# Lesson 04 — Received is not applied · motion-v2 cut 04 beat sheet

**Mechanism.** A PostgreSQL hot standby can hold the WAL for a change (release R42 → application revision 8) before it has replayed it. Queries read replayed state, so a query can still return 7. Replay, not receipt, advances the visible row. Only a query issued after replay returns 8. An answer returned earlier stays 7.

Playback is 34.71 s (1041 frames at 30 fps). The scene is authored at speed 1 and rendered with `meta.speed: 0.85`; the times below are **playback** seconds, with authored times in brackets. It has a finite ending: the stage fades after the resolved state and does not loop back to 7.

## Neutral A/B choices

| Decision | Choice | From |
|---|---|---|
| Geometry | Horizontal WAL strip with three cells, laid out like a debugger. Below it sit one table row and a query terminal. Flow runs top to bottom. | A |
| Progress markers | Two positions on the strip: `received` (amber chevron above) and `replayed` (teal chevron below). The gap is visible without words. | B (A had one replay cursor) |
| Meaning of the receive marker | Receipt only. No flush stage, durability check, or acknowledgement is drawn. | A (B equated received with flushed, which the brief excludes) |
| Order | Arrival first, then a query that returns 7. A's opening establishing query was dropped to stay lean. | B |
| Earlier answer | Stays in the terminal as a frozen `7` while the row becomes 8 and through the end. A fresh second line returns 8. | A (frozen result) + B (both answers visible together) |
| Replay motion | A progress bar sweeps the received cell, then the `replayed` marker slides, a link draws to the row, and the value is replaced in sequence (7 leaves before 8 enters). | A + B |
| Record and values | `R42→8` is the concept's release and application revision. There are no LSNs and no earlier record numbers; earlier cells are blank, already replayed history. | A |
| Ending | Hold the resolved state, then fade. No reset. | A + B |
| Durations | 34.7 s total. Plan A's 38 s was shortened by omitting the establishing query. | — |

## Beats

| # | Time (s) | What moves | State change | Sound (preset · pitch · pan) |
|---|---|---|---|---|
| 1 | 0–3.53 [0–3.0] | The stage fades in from black (0.05–0.75). At 1.18 the `received` marker appears, and at 1.65 the `replayed` marker appears, both on the middle cell. | Starting state: two earlier cells replayed (teal bar), last cell an empty dashed slot, visible row R42 = 7, empty terminal. Both positions sit on the same record. | 1.18 `ack` C6 (receive marker); 1.65 `ack` E6 (replay marker). |
| 2 | 3.53–10.12 [3.0–8.6] | The primary flashes white; the `R42→8` tag travels the dotted route (3.65–5.41) and docks in the empty cell with a white ripple. The route fades and the primary dims. The `received` marker slides to the new cell (6.35–7.06). | The cell holds R42→8 in amber outline (received, not replayed). The `replayed` marker stays put and the row stays 7. Hold 7.1–10.1. | 3.53 `send` G6 (primary); 5.41 `arrive` C5 (WAL receipt); 6.35 `ack` C6 (receive marker). |
| 3 | 10.12–18.12 [8.6–15.4] | `SELECT revision` types with a blinking caret. An `R42?` tag climbs to the row (10.47–11.29), the row pulses, and a `7` tag descends (11.76–12.59). At 15.06 the `replayed` marker glows in place without moving. | The terminal shows 7, a valid read of older state, while the WAL already holds →8. Hold 12.6–18.1 to compare marker positions, row and result. | 10.12 `clock` A6 (typing); 10.47 `send` A6; 11.29 `arrive` E5 (row); 12.59 `deliver` C5; 15.06 `work` E4 (marker emphasis). |
| 4 | 18.12–26.59 [15.4–22.6] | An amber bar sweeps the R42 cell (18.12–20.47) and turns teal. The `replayed` marker slides to it (20.59–21.29), a teal link draws to the row, and at 21.88 the 7 leaves upward, then the 8 rises in, with a teal ripple and row glow. | Row R42 = 8. Both markers sit on the same record. The record stays in the strip, because replay does not consume WAL. The earlier terminal answer stays 7. Hold 22.2–26.6. | 18.12/18.71/19.29/19.88 `work` E4 (replay running); 20.59 `ack` E6 (replay marker); 21.88 `store` E5, the loudest cue (‑9.5 dBFS window peak). |
| 5 | 26.59–34.71 [22.6–29.5] | The first line dims. A second `SELECT revision` uses the same query motion, and a teal `8` tag descends and pops into line 2 (29.06). Hold, then the stage fades (33.41–34.47). | The terminal shows the earlier 7 (dimmed) above the fresh 8. Hold 29.1–33.4 on the resolved state. | 26.59 `clock` A6; 26.94 `send` A6; 27.76 `arrive` E5; 29.06 `deliver` E5 (a higher pitch than the stale C5). The fade is silent. |

**Sound map.** Primary G6; WAL receipt C5; receive marker C6; replay marker E6; replay work E4; visible row E5 (query arrival and `store`); terminal A6 (typing and sends). The pitch of `deliver` tracks the value: C5 for 7, E5 for 8. Every cue pans to its event's x position. There is no ACK, flush, chime or failure sound.

## Accuracy limits (write-up, not on screen)

- The `received` marker asserts receipt only. A standby writes and then flushes received WAL, but this clip shows neither stage separately and makes no durability claim.
- What a commit acknowledgement proves depends on `synchronous_commit` and the synchronous standby configuration. `remote_write`, `on` and `remote_apply` wait for different standby milestones, and asynchronous replication waits for none. No acknowledgement is drawn.
- The single `R42→8` cell stands for the WAL of one committed change, including its commit record. It is not an LSN or record format. 7 and 8 are application revisions.
- The second query is a new statement with a fresh snapshot. An older snapshot or an already returned result keeps 7.
- The replay delay is staged for teaching. It is not a measured lag.

Sources: [PostgreSQL 18 §§26.2.5, 26.2.8](https://www.postgresql.org/docs/18/warm-standby.html), [synchronous_commit](https://www.postgresql.org/docs/18/runtime-config-wal.html#GUC-SYNCHRONOUS-COMMIT), [transaction isolation](https://www.postgresql.org/docs/18/transaction-iso.html) (as cited by the lesson plans; not re-fetched in this session).
