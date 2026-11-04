# Lesson 02 — A replica can lag

## Teaching contract

One mechanism: after an acknowledged write, an asynchronous replica can still serve the older record successfully. That observation does not undo or disprove the write.

Concrete example: release R42 is saved as `ready · v8` on the primary. The replica still contains `draft · v7`. The application's read goes to that replica and returns its actual older record. End with the successful save receipt, older read result, and unchanged primary all visible.

Prerequisite: another data copy needs updating (lesson 01). Define lag visually as the two copies holding different revisions, supported by the sparse label `Behind`. No additional concept is required. This is a single-writer illustration with one record and one read.

Scope stops at observing stale data. Do not add a primary query, revision-check algorithm, retry, catch-up demonstration, receipt/replay stages, WAL terminology, synchronous settings, crash, promotion, or failover. The ending deliberately preserves the lag window.

## Stage and visual grammar

1080 × 1920, 30 fps; proposed 41 seconds at speed 1. Timing is pedagogical, not measured system latency. Extend individual holds if inspection requires it.

Use a software record inspector: two database table slices beneath a compact application results panel. These are distinct surfaces with persistent data, not three interchangeable process boxes. No physical metaphors, moving servers, or paragraph captions.

Coordinates are centres unless bounds are specified:

- Title `A replica can lag`: (540, 245), 76 px. Context `ASYNC REPLICATION`: (540, 335), 44 px.
- Application panel: bounds x=140–940, y=470–880. Header `Application`: (540, 515), 52 px. Two separate result rows: `Save` at y=635 and `Read` at y=775. Labels occupy x=175–340; result chips x=365–900. Empty read row begins as an em dash, not old data.
- Primary table slice: bounds x=90–510, y=1160–1510. Header `Primary`: (300, 1210). Record key `R42`: (300, 1290). Value `ready`: (300, 1380); revision `v8`: (300, 1460).
- Replica table slice: bounds x=570–990, y=1160–1510. Header `Replica`: (780, 1210). Record key `R42`: (780, 1290). Value `draft`: (780, 1380); revision `v7`: (780, 1460). `Behind` appears at (780, 1585).
- Save acknowledgement route: primary top (300,1160) → (300,1010) → (410,1010) → save port (410,880). Hide after the receipt lands. This is an acknowledgement of an already completed save, not another write.
- Read route: application port (770,880) ↔ replica top (770,1160). Separate request and response in time. Request chip `R42?`; response chip `draft · v7`. Chip width at most 360 px; no labels cross its path. Return chip enters the read row through a temporary highlight, not through the save row.
- Thin one-way replication connector below tables: (300,1510) → (300,1690) → (780,1690) → (780,1510). Label `Async copy` at (540,1760). Keep it neutral and stationary during this selected interval; no blocked symbol or broken link. Do not animate a staged receive/apply pipeline.

All essential labels ≥48 px (15.6 px at 350 wide), record values/revisions 60 px (19.4 px at 350). Result chips 52 px. Use generous whitespace and ≥24 px internal padding. White text on near-black; green small check indicates operation success, amber revision/`Behind` indicates older observation. Pair colour with text and shapes; amber is never an error cross. Both tables retain equal legibility throughout.

## Beat sheet

| Time | Motion and granular pacing | Persistent state / attention | Sound |
| --- | --- | --- | --- |
| 0–7 s | 0–1.2: reveal paired table slices and application shell. 1.2–2.2: reveal primary `ready`, then `v8`; 2.8–3.8: reveal replica `draft`, then `v7`. 4.2–4.8: softly bracket the differing revisions and reveal `Behind`. Hold 4.8–7. | Opening is already after the save: primary v8, replica v7. Establish same R42 identity before highlighting the mismatch. Save/read results remain empty. | Quiet `arrive` E5 on primary record reveal; `arrive` G5 on replica reveal. Soft `ack` G5 on the lag marker, no alarm. |
| 7–15 s | 7–8.2: primary emits `Saved v8` acknowledgement along the save route. 8.2–9.4: it docks in the application Save row with a check. Hold 9.4–12. 12–12.8: primary v8 and Save receipt receive one linked emphasis; hold 12.8–15. | Save becomes `✓ Saved v8` and stays for the rest of the film. Replica remains v7. The read result is still empty. | `send` E6 at departure, `deliver` C5 when receipt docks. Quiet `ack` E5 for the linked evidence emphasis. |
| 15–23 s | 15–16: reveal read route; 16–17.4: `R42?` travels to replica. 17.4–18.5: replica row gains a selection outline. 18.5–20.5: hold selected `draft · v7`. 20.5–21: a response copy forms beside the selected row; hold to 23. | Only the replica answers. Its selection reads stored v7 without changing it. No request visits the primary and no mutation occurs. | `send` C6 at query departure; `arrive` G5 at replica; quiet `work` G5 once as the response is formed. |
| 23–32 s | 23–24.6: response `draft · v7` travels back. 24.6–25.4: result docks in Read row; green check appears separately from amber v7. Hold 25.4–28. 28–29: add short label `Older` beside the result, then hold to 32. | Read completes successfully with `draft · v7`; Save remains `✓ Saved v8`. Keep result label and value on separate lines if required, within the existing read row. The primary still displays ready/v8. | `send` G6 on response departure; `deliver` C5 on completion, same application pitch as save. Soft `ack` C5 on `Older`, never `crash`, `miss`, or failure buzz. |
| 32–41 s | 32–33.2: gently emphasize replica v7 and the matching Read result together. Hold to 35.2. 35.2–36.4: emphasize primary v8 and saved receipt together. Hold the complete evidence 36.4–41; finite end on this frame. | Two consistent evidence pairs coexist: primary/save v8; replica/read v7. The saved change has not disappeared. No catch-up, repair, or second query is shown. | Quiet `ack` G5 then C5 for replica/result pair; E5 then C5 for primary/receipt pair, spaced 0.2 s apart. Final hold is silent. |

## Sound design

Actors retain pitch identities: application C5, primary E5, replica G5; sending ticks use the actor's octave above. Pan by actor x-position, application centred. Use sparse soft mallets; arrival louder than send. Success marks the operation completing, not proof of freshness. No music bed, repetitive ticking, warning sirens, or arbitrary transition sounds. A persistent state needs no repeated sound during holds. Check actual mix for clarity and peaks ≤−0.5 dBFS; state explicitly whether it was listened to or only analysed.

## Accuracy and evidence

Primary source checked 2026-10-27: [PostgreSQL 18, §26.2.5 Streaming Replication](https://www.postgresql.org/docs/18/warm-standby.html#STREAMING-REPLICATION). It states that asynchronous streaming replication can delay standby visibility after primary commit. This supports the depicted difference between stored copies. The clip stretches that window for teaching; it gives no latency bound.

Scope source: `video/replication-and-consistency/sequence/lessons.json`, item 2. The R42 example and application revisions come from `content/concepts/replication-and-consistency.json`. `Saved v8`, `draft`, and `ready` are illustrative application data/receipt fields, not automatic PostgreSQL response fields. The depicted save is completed, not merely queued. The replica is configured to serve reads. Its normal successful response reports its older state; a stale response alone does not establish that a write failed. Do not generalize this selected asynchronous scenario to every replica configuration, nor imply a primary is universally fresh. Other concept-document sources concern later mechanisms and are not needed to teach this cut.

## Native 350 px acceptance and future implementation checks

Render candidate at 1080×1920 using a cut-local engine copy and the repository-pinned Puppeteer dependency. No shared skill or published asset edits. Keep source, encode and inspection artifacts local to the subsequently assigned cut scope; this plan does not authorize those writes.

For acceptance, inspect the actual encoded video scaled to exactly 350 px wide (approximately 622 px high), displayed at 100%, without zoom. Inspect every beat midpoint, each transition boundary ±0.2 s, and the response docking frame. A contact sheet alone is insufficient.

- Read `Primary`, `Replica`, R42, both status values, v7/v8, and both application outcomes without zoom or prior knowledge. If any text fails, enlarge or remove it; do not reduce below the stated minimum to fit.
- Follow the query to the replica and its response back with no path ambiguity or overlap. The save receipt must remain readable during the whole read.
- Distinguish successful read from current data: a check accompanies completion while older value and replica origin remain explicit. No red failure coding.
- On the final frame, identify where v8 is still stored and why the application shows v7. The pairing must work without audio; audio must reinforce actor identity when heard.
- No table changes revision during this clip; response movement copies data rather than removing stored data. No accidental implication of rollback or second write.
- Each meaningful change has its assigned cue. Holds give each observation time to register; final stillness is intentional. Never shorten the read/result holds just to meet a duration target.
- Future validation: decode the complete encode, inspect audio peaks and stream metadata/fast-start, inspect all encoded beat/boundary frames at full size and 350 px, and record review against the exact encode hash. These are acceptance requirements, not completed checks.

Planning only. No rendering or implementation has been performed. Stop after the authorized current video; require user confirmation before starting another.
