# Lesson 05 — Failover can lose data

Planning only. Five beats, 40 seconds, finite ending. One mechanism: an asynchronous write can be acknowledged before its change reaches a standby; after primary failure, that standby can serve an older application revision when promoted.

## Scope and evidence

- Teaching inputs: item 5 of `video/replication-and-consistency/sequence/lessons.json` and `content/concepts/replication-and-consistency.json`. The existing 28-second metadata is context, not this plan's timing constraint.
- [PostgreSQL 18, standby operation and streaming replication](https://www.postgresql.org/docs/18/warm-standby.html), §§26.2.2, 26.2.5 and 26.2.8, consulted 2026-11-03: asynchronous replication permits an acknowledged change to be absent from a standby at failure. Promotion changes the standby's operating role.
- [PostgreSQL 18, synchronous_commit](https://www.postgresql.org/docs/18/runtime-config-wal.html#GUC-SYNCHRONOUS-COMMIT), consulted 2026-11-03: what success waits for depends on configuration. This scene selects asynchronous replication without a standby acknowledgement requirement; it makes no synchronous-mode guarantee.
- Visual references: architecture-flow-video skill plus its style, engine API and review references. No other plan, authoring source, production ledger or session informs this plan.

## Stage and visual contract

1080 × 1920, black background, fixed camera. Coordinates below are design pixels, origin top left. Software-native geometry: an application response strip, two open record inspectors, a routing caret and a comparison result. No server rack metaphor or three-box request pipeline.

| Element | Geometry and coordinates | Persistent meaning |
| --- | --- | --- |
| Heading | Two lines centred at (540, 270) and (540, 350): `Failover can` / `lose data`; 76px | Lesson title, not an outcome animation |
| Scope | `ASYNC` centred (540, 440), 46px | Visible throughout |
| Application strip | x=120–960, y=560–790; `App` at (180, 605); receipt centred (340, 710), later read result centred (760, 710) | Receipt and subsequent observation remain separate |
| Left inspector | x=120–460, y=970–1260; header `Primary` at (290, 1010); record `R42` at (290, 1100); revision at (290, 1190) | Original primary; last-known revision persists through failure |
| Right inspector | x=620–960, y=970–1260; header `Standby` at (790, 1010); `R42` at (790, 1100); revision at (790, 1190) | Same identity and data through promotion |
| Replication connector | (460, 1220) → (620, 1220), right arrow; `ASYNC` at (540, 1330) | Empty connector: revision 8 has not shipped |
| Write/ack route | (290, 790) ↔ (290, 970) | App-to-original-primary path |
| Read/response route | (790, 790) ↔ (790, 970), absent until beat 4 | App-to-promoted-primary path |
| Route caret | Initially (290, 920), later (790, 920) | Selected application endpoint, not an election token |
| Failure-window marker | Open-ended underline x=160–920 at y=1460; label `ACK → failure` at (540, 1530) | Marks this illustrative event interval, never a countdown or duration guarantee |
| Outcome | `8 ≠ 7` at (540, 1660), 96px; `8 absent here` below at (540, 1760), 48px | “Here” anchored by a short line to the right inspector's lower edge |

Inspector geometry uses a header rule and a single record row, without enclosing boxes. Revision numerals are 100px; role labels and chips at least 48px. Neutral white records, teal successful receipt, amber mismatch, red unavailable service marker. Shape and text carry the distinction independently of colour. Keep all record contents bright enough to read after failure; dim only the old primary's header and route.

## Beat sheet

| Time | Motion and coordinates | State that lands and persists; meaningful hold | Sound |
| --- | --- | --- | --- |
| 0–8s — Commit and acknowledge | Start with both records at `7`, route caret left. Hold opening 0–2s. At 2s, `write 8` travels (290,790) → (290,970), arriving at 3s. At 3.6s the left record changes discretely from `7` to `8`. At 4.5–5.5s, `ACK 8` travels back to the application strip and settles at (340,710). | Only left data changes. Right remains `7`; no replication packet appears. Receipt includes a check mark and stays until the ending. Hold 5.5–8s to let the viewer compare acknowledged 8 with standby 7. | `send` C6 at 2s, quiet; `store` C5 at 3.6s; `ack` E5 at 5.5s. No standby success sound. |
| 8–16s — Expose the async window | At 8–9s, a thin focus outline traces the existing receipt and stops. At 10–11s an amber outline traces the unchanged standby revision. At 12–13s draw the open-ended failure-window underline at y=1460, from x=160 to x=920. No fill bar or replica progress animation. | Both outlines remain, pairing `ACK 8` with actual `7`. Left still `8`. Connector remains empty. Underline denotes an interval in this example, not a replication timer. Hold 13–16s deliberately: the dangerous state exists before failure. | Soft `ack` E5 at 9s on receipt focus; soft `arrive` G4 at 11s for visual focus only, without a check or arrival ripple; `clock` C4 once at 13s when interval marker lands. |
| 16–24s — Primary fails before shipping | At 16s, left header jolts ±12px over 0.4s; service marker becomes ×. At 16.5s write route and replication connector become broken/dashed. Left header becomes `Offline`; `last seen` appears above its retained `8`. At 18–19s cap the interval underline with × at x=920. | Neither record is erased or decremented. Original primary is unavailable with last-known `8`; standby is still `7`; receipt is still `ACK 8`. There was never an 8 packet on the connector. Hold 19–24s as a deliberate failure tableau, giving time to compare all three facts. | `crash` C3 at 16s, loudest cue with restrained tail; quiet `thump` C3 at 19s for the interval endpoint. Silence during the five-second comparison hold. |
| 24–32s — Promote the existing copy | At 24–25s a small `Promote` command chip appears above right header at (790,900), lands at (790,970), then clears. At 25.5s header changes in place from `Standby` to `Primary`, with a brief underline pulse. At 27–28s route caret slides horizontally (290,920) → (790,920); right read route draws in. No traffic during routing change. | Right inspector never moves and its `7` never changes. Receipt and offline left record remain. Promotion is a stipulated operation; routing changes only afterward. Hold 28–32s to make role change without data change unmistakable. | Quiet `send` G5 at 24s; `ack` G4 at 25.5s for role transition, no recovery fanfare; soft `arrive` G4 at 28s for route selection. |
| 32–40s — Read what survived here | At 32–33s a `read` chip travels (790,790) → (790,970). At 33.8–34.8s a `7` response travels back and settles as `READ 7` at (760,710). The right record remains `7` while the response copy moves. At 35.5–36s, draw `8 ≠ 7` and `8 absent here`, with its line routed via (1000,1760) → (1000,1280) → (790,1280). | Application shows `ACK 8` beside `READ 7`; promoted primary visibly holds `7`. Hold final evidence from 36–40s. End on that state without reset, replay, catch-up or fade that might suggest recovery. | `send` E6 at 32s; `deliver` G4 at 34.8s; soft `miss` C4 at 36s marks the revision mismatch, not a failed database read. Final four seconds silent. |

Focus sounds in beat 2 mark outlines, not network events; use no travelling dots or receive ripples there. Pan operational cues by their screen position. Keep quiet sends below state-change cues and avoid background music or continuous ticking. Playback seconds are editorial timing, not measured failure or replication latency.

## Accuracy limits

- `7` and `8` are illustrative application revisions of one R42 record with a single writer. They are not WAL offsets, transaction IDs, replica progress counters or a general ordering scheme for concurrent writers.
- The application receipt represents a completed write response, not acceptance of a queued job. Its revision field is an illustrative application contract, not a PostgreSQL protocol field.
- In this selected async failure window, the primary acknowledges 8 and fails before shipping its change. No copy of that change is available to this standby through another source before promotion. Received-but-unapplied WAL is not the illustrated cause.
- Promotion changes the role of the copy already at 7. It does not delete 8. The old primary's retained numeral is explicitly last-known state; the film makes no claim that its storage is erased, recoverable or permanently lost. “Absent here” means absent from the promoted serving copy after failover.
- The promotion command and later route switch are stipulated steps. No heartbeat, voting, quorum, automatic detection, fencing protocol, split-brain solution or failover-speed promise is depicted. The old primary stays unavailable; no second writer appears.
- Acknowledgement guarantees depend on replication mode and commit settings. `ASYNC` must remain visible; no claim that every failover loses data, or that another configuration guarantees all replicas are current.

## Native 350px acceptance specification

These are future visual checks, not claims of rendered or listening verification. Inspect at native 350 × approximately 622px, without zoom, including 5.5s, 13s, 19s, 25.5s, 28s, 34.8s and 38s plus motion boundaries.

- At 350px, role/chip labels are at least 15.5px, revisions about 32px, and the title about 24.6px. Minimum functional stroke is 5 design pixels (about 1.6px); ensure at least 24 design pixels of text clearance. Wrap the title as specified; shorten labels rather than shrinking type.
- A viewer can distinguish a successful `ACK 8` from the later `READ 7` without audio, pause or colour recognition. Neither strip label overlaps the other at the busiest final frame.
- At the failure boundary, `8` never disappears from the old primary record or receipt. `last seen` remains legible. × affects service availability, not the data glyph.
- Across promotion, compare the same right-hand record before and after: `7` holds exactly in place. No numerals roll, reverse or morph during the role transition.
- The 8 change never appears on the replication connector or standby. The read response visibly originates at the promoted copy's 7; there is no unexplained stale cache or failed-read icon.
- Temporarily ignore labels: unequal record values precede the failure, one endpoint becomes unavailable, the surviving endpoint changes role without changing value, and its value returns to the app. Labels supply the async and revision limits, not the causal action.
- Sound must align with its stated event, remain sparse and non-clipping, and never be required to distinguish success from mismatch. Listening and encoded-frame inspection remain unperformed in this planning-only task.
- After one viewing, the acceptance answer is: “8 was acknowledged but had not reached the standby; the promoted copy still serves 7.” Reject any reading that promotion erased 8 or that automatic failover mechanics were demonstrated.

Only this plan is the deliverable. No scene, render, shared metadata, publication or subsequent lesson work is included.
