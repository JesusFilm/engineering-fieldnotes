# Keep another copy

## Scope and grounding

One mechanism: a change stored at the primary travels to a replica and must be applied before that replica's stored record changes. Start both copies at application revision 7, write revision 8 at the primary, show receipt without application at the replica, then apply the change.

Grounding: `video/replication-and-consistency/sequence/lessons.json` item 1 and `content/concepts/replication-and-consistency.json`. The concept uses a single-writer release record R42, changing draft to ready, with application revisions 7 and 8. Its primary reference is [PostgreSQL 18 standby replication](https://www.postgresql.org/docs/18/warm-standby.html), recorded as retrieved 2026-10-19 in the concept. The generic animation abstracts transmission and replay; it does not depict literal PostgreSQL record formats.

Five beats, 44 seconds. No verification read, stale-read response, retry, failover, synchronous acknowledgment configuration, transaction snapshot, or freshness-repair procedure. The temporary difference teaches movement and application of data, not a later consistency policy.

## Layout: persistent records and a replica receive buffer

Use two full-width record inspectors stacked vertically, with an explicit **Received change** strip inside the replica inspector above its applied record. The primary row changes first; an incoming change then appears in that strip while the replica record stays at 7. Only the Apply event changes the replica row. This makes receipt and application separate visible states without a generic three-box flow.

1080 × 1920; background #050506; primary text #E6E8EC; secondary #8B9099; pending amber #F5A524; applied teal #3FB68B. States and numerals supplement color. Title 76 px, actor headings 62 px, fields 54–58 px, revision values 76 px. Sparse labels, no runbook-sized paragraphs.

| Element | Coordinates x,y,w,h | Content |
|---|---|---|
| Title | 90,140,900,110 | `Keep another copy` |
| Application command | 90,350,900,130 | `Application` / `R42 → ready` |
| Primary inspector | 90,650,900,330 | `Primary`; `R42 · draft/ready`; `Revision 7/8` |
| Transfer label | 130,1030,820,70 | `Replicate change` |
| Replica inspector | 90,1220,900,460 | `Replica` heading y1260 |
| Received strip | 130,1340,820,90 | blank, then `Received: revision 8` |
| Applied record | 130,1460,820,150 | `R42 · draft/ready`; `Applied revision 7/8` |
| Footer | 90,1770,900,80 | final `Both copies: revision 8` |

Application write path (540,500)→(540,630). Primary-to-replica path (540,990)→(540,1200). Arrival resolves into the Received strip, never directly into the applied record. A short internal apply indicator runs from (920,1390)→(920,1480), clear of the record text. No reverse acknowledgment route is needed.

The primary record persists after transmission. The moving marker denotes change data, not the original record physically leaving its store. Received strip is a teaching abstraction of data awaiting application, not a prescribed table or API. Once applied, replace its text with `Change applied` rather than leaving an apparent pending update.

## Beat sheet: time, state, motion, sound

Application C4, primary E4, replica A4. Different receipt and apply presets make those events audibly distinct. No music, clock loop, or spinning hardware metaphor. Timings are illustrative playback.

| Beat / time | Motion and state | Sound and hold |
|---|---|---|
| 1 · 0–8 s · Two saved copies | Establish primary and replica R42 draft / revision 7. Received strip empty. Application command ready but unsent. At 3 highlight both revision 7 values once. | Primary quiet `ack` E4 at 3; replica `ack` A4 at 3.4. Hold 4–8. Both records already exist; do not animate initial snapshot creation. |
| 2 · 8–18 s · Write at primary | Application sends command 9–10.5. Primary shows Updating briefly, then at 12 commits R42 ready / revision 8 together. Replica remains draft / applied revision 7. | Application `send` C4 at 9; primary `work` E4 at 10.5, `store` E4 at 12. Hold 13–18. Only the primary receives the application write. |
| 3 · 18–27 s · Transfer the change | At 18.5 show Replicate change. Send marker downward 20–22. At 22 populate replica Received: revision 8. Its applied record remains R42 draft / revision 7. Primary stays ready / 8. | Primary `send` E4 at 20; replica `arrive` A4 at 22. Hold 23–27. No apply animation or applied-value update yet. |
| 4 · 27–36 s · Apply locally | At 27.5 highlight the received strip and show Applying. Internal indicator moves 29–30. At 31 change replica status draft→ready and applied revision 7→8 together. Change received strip to Change applied at 32. | Replica `work` A4 at 29; replica `store` A4 at 31. Hold 32.5–36. The transport arrival alone did not change the applied row. |
| 5 · 36–44 s · Retain both records | At 36.5 emphasize primary revision 8, then replica applied revision 8 at 38. Show Both copies: revision 8 at 39. Neither record moves. | Replica soft `ack` A4 at 38. Hold 39.5–44 silently. No new write, reader, failover, or reset. |

The longest interpretive hold is received revision 8 above applied revision 7. Keep those labels explicit so two numbers are not mistaken for an encoding fault or contradictory record. The final row field and revision update must be atomic in the illustration; do not show ready with applied revision 7 as an intermediate committed record.

## Accuracy limits

- This single-writer example routes application changes to the primary. It does not assert that all replication systems have this topology or prohibit other designs.
- Revision 7/8 are application metadata, not PostgreSQL WAL positions or automatic database version numbers. The marker abstracts transmitted change information; PostgreSQL streaming replication transports WAL rather than a magical whole-record replacement.
- Receipt and application are distinct. No acknowledgment contract or query-visibility guarantee is taught; the replica panel represents applied stored state, not the result of an arbitrary transaction snapshot.
- The source retains its data when a replica receives a copy. Replication does not move ownership of the row, consume it, or independently create a second business operation.
- There is no concurrent writer or later update in this window. Final agreement is the illustrated state, not a promise that all replicas always match or that future reads are globally fresh.
- Initial copy creation, failures, retries, data-loss exposure, and recovery are omitted. Playback pauses do not specify replication latency or recommend a fixed wait.
- The example changes a synthetic release record only; ready is a data field, not proof of an actual deployment.

## Native350 acceptance and later encoded review

- Inspect individual actual encoded frames at native 350 px width (~622 px high), plus full resolution. 54 px fields become ~17.5 px; 76 px revision values ~24.6 px. Keep Received and Applied labels clearly distinct; wrap them rather than reducing type size.
- Inspect holds at 5, 15, 25, 34, and 42 s, plus before/mid/after primary commit, transfer arrival, apply movement, and replica record change. Contact sheets alone cannot establish readability.
- At 15 s identify primary 8/ready versus replica 7/draft. At 25 s identify received 8 but applied 7. At 34 s identify replica applied 8/ready. At 42 s both saved records must remain visible at 8.
- No direct application→replica write, early applied revision 8, source-record disappearance, duplicate business write, or implicit reader result. Exactly one application mutation and one illustrated replication update.
- The received strip must cease looking pending after application. Applied record revision and status change together. Routes and labels must remain clear of record fields at every transition.
- Muted playback must explain write, transfer, receipt, and application through persistent state. No paragraph captions or unnecessary decorative motion; preserve readable holds even if runtime grows.
- Reproduce suspected visual defects using alternate extraction before flagging. Later decode the full MP4, inspect audio peaks and streaming metadata, and listen before claiming audio was heard. Bind review to the actual full SHA-256 and renew encoded inspection after re-encoding.

Only this plan is assigned. Future implementation uses repository-pinned Puppeteer and cut-local engine copies. No rendering, public/site/shared-skill edits, Git operations, or other lesson work is included. Stop after this artifact; the next lesson requires user confirmation.
