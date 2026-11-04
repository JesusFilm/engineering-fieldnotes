# Lesson 05 — Failover can lose data · motion-v2 cut 05 beat sheet

**Mechanism.** In one asynchronous failure window, the primary acknowledges application revision v8 of record R42 while the standby still holds v7. The primary fails before shipping v8. An explicit command promotes the standby, which serves the v7 it actually holds. The acknowledged v8 is absent on the new primary.

Playback is 36.00 s (1080 frames at 30 fps). The scene is authored at speed 1 and rendered with `meta.speed: 0.85`. The times below are **playback** seconds, with authored times in brackets. The ending is finite: the stage holds the resolved evidence and then fades. It does not reset, catch up or loop back.

## Neutral A/B choices

| Decision | Choice | From |
|---|---|---|
| Geometry | Two side‑by‑side revision columns (primary, standby), with matching rows v6/v7/v8 joined by horizontal ship links. A missing copy is an empty dashed cell directly beside its original. | B (lane/column idea, turned vertical so routes stay straight) |
| Normal case first | v7 is written, acknowledged and only then shipped. This shows the async order before it matters. | Added; neither plan animates a normal ship |
| Receipt | A persistent `ack R42 v8 ✓` line stays green to the end. `read R42 v7` appears on a separate line below it. | A + B |
| Failure window | An amber dashed v8 ship link labelled `unshipped`, plus an amber empty standby cell. No timer, progress bar or travelling packet. | B (tag), A (no countdown) |
| Old primary | Header becomes red `offline` with a circled ×. Its v6/v7/v8 cells stay in place, dimmed but readable, as last‑known state. Its links turn to dead dashed lines. | A (retained last‑known value) + B (dim, not erased) |
| Promotion | One stipulated operator line `$ promote standby`. A dot travels to the standby header, the label changes in place, and the cells do not move or flash. The route caret then slides to the new primary. | B (operator trigger) + A (caret, change routing after promotion) |
| Outcome | The new primary’s empty v8 cell turns red with `v8 absent`, an amber `≠` appears beside ack v8 / read v7, and both lines briefly outline amber. The receipt keeps its green check, so it never reads as a rejected write. | A (`≠`, “absent here”) + B (keep receipt meaning) |
| Ending | Hold about 4 s, then fade. | B (fade) with A’s rule of no recovery or reset |
| Revisions | `v6`–`v8` are application revisions of R42 with a single writer. They are not WAL positions. | A + B |

## Beats

| # | Time (s) | What moves | State that lands and persists | Sound (preset · pitch · pan) |
|---|---|---|---|---|
| 1 | 0–7.88 [0–6.7] | Stage fades in (0.06–0.76). A `v7` chip descends app → primary (1.65–2.47). The primary’s v7 cell fills with a white ripple (2.53). An `ack` chip rises (3.18–3.88) and the receipt shows `ack R42 v7 ✓` (3.88). Only then does a teal `v7` chip cross the ship link (4.82–5.65) and fill the standby’s v7 cell (5.67). | Both columns hold v6, v7. The receipt says v7. The normal async order is visible: ack first, ship after. Hold 5.7–7.9. | 1.65 `send` A6 (app, left); 2.53 `store` G5 (primary); 3.88 `deliver` A5 (receipt); 4.82 `send` G6 (ship, centre); 5.67 `store` C5 (standby, right). |
| 2 | 7.88–15.65 [6.7–13.3] | `v8` descends (7.88), the primary’s v8 cell fills (8.76), `ack` rises, and the receipt becomes `ack R42 v8 ✓` (10.12). At 11.18 the v8 ship link turns amber dashed, `unshipped` appears, and the empty standby cell turns amber. At 13.29 the empty cell and tag pulse once. | Acknowledged v8 sits on the primary only. The standby is at v7. Nothing crosses the v8 link. Hold 11.2–15.6 with one pulse at 13.3. | 7.88 `send` A6; 8.76 `store` G5; 10.12 `deliver` A5; 11.18 and 13.29 `clock` E6 (window open, right). |
| 3 | 15.65–20.24 [13.3–17.2] | The primary header snaps red, shakes ±14 px, shows `offline` and a circled × that pops in, and sends a large red ripple (15.65). At 16.06 its route and ship links turn dark red dashed, its cells dim to 62 % with red frames, and the route caret greys. | The old primary is unreachable with last‑known v8 still drawn. The standby is unchanged at v6, v7 with an empty v8. The receipt still says v8 ✓. Silent tableau 16.5–20.2. | 15.65 `crash` (loudest, −1.6 dBFS, left). |
| 4 | 20.24–27.41 [17.2–23.3] | The terminal brightens and `$ promote standby` types in (20.35–21.06). A dot runs up the right‑hand gutter to the standby header (21.41–22.59). Its label changes `standby` → `primary` in white, with a glow pulse (22.59). The caret slides to the new primary’s route (23.88–24.71), which brightens. | Only the role and route change. The standby’s cells are pixel‑identical before and after (v6, v7, empty v8). Hold 24.7–27.4. | 20.35/20.59/20.82/21.06 `work` D4 (typing, panned left→centre); 21.41 `send` D6 (right); 22.59 `arrive` C5 (role change); 24.71 `ack` C6 (route lands). |
| 5 | 27.41–36.00 [23.3–30.6] | `R42?` descends to the new primary (27.41–28.24). Its v7 cell glows (28.29), a `v7` chip rises (28.82–29.65), and `read R42 v7` appears outlined (29.65). At 30.82 the empty v8 cell turns red and glows, `v8 absent` fades in below it, an amber `≠` appears in the app panel, and both lines outline amber, then settle (32.2). Hold, then the stage fades (34.82–35.76). | Final evidence: ack v8 ✓ above read v7, ≠, and a new primary holding v7 with v8 absent beside the old primary’s dim v8. Hold 31.2–34.8, then fade. | 27.41 `send` A6 (right); 28.29 `arrive` C5; 29.65 `deliver` C5 (lower than the A5 ack); 30.82 `miss` E4 (the mismatch). The fade is silent. |

**Sound map.** App sends A6. The primary’s writes are `store` G5. The standby/new primary is C5 (`store`, `arrive`). The receipt is `deliver` A5; the read is `deliver` C5, so the read lands lower than the acknowledgement. The window is `clock` E6. The operator is `work` D4 and `send` D6. Only the crash is non‑musical and loud. Every cue pans to its event’s x position. There is no election, health‑check, catch‑up or recovery sound.

## Accuracy limits (write‑up, not on screen)

- This shows one asynchronous failure window, not every failover. With asynchronous replication the primary acknowledges after its own commit without waiting for a standby, so an acknowledged change can exist only on the primary. Synchronous settings change what success waits for; the clip shows none of them and makes no guarantee about them.
- Promotion changes the role of the copy already at v7. It does not delete v8. The old primary’s v8 is drawn as last‑known and unreachable. The clip claims nothing about whether that storage survives or can be recovered, or how the old primary could rejoin.
- The standby never received v8, and the clip never suggests it could recover a change it did not receive. Received‑but‑unapplied WAL (lesson 04) is not the cause shown here.
- The command line stands for any explicit external trigger. Detection, election, fencing and automatic failover are out of scope. No second writer appears.
- v6–v8 are illustrative application revisions of one record with a single writer. They are not WAL positions, LSNs or transaction IDs. Playback seconds are editorial timing, not measured latency.

Sources as cited by the lesson plans (not re‑fetched in this session): [PostgreSQL 18 §§26.2.5, 26.2.8](https://www.postgresql.org/docs/18/warm-standby.html), [synchronous_commit](https://www.postgresql.org/docs/18/runtime-config-wal.html#GUC-SYNCHRONOUS-COMMIT).
