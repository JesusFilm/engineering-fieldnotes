# A stale copy

## Focus and grounding

One mechanism: a source write and a cache change are separate operations. The editor commits revision 2 to the database without deleting the cached entry. A later lookup successfully finds and returns cached revision 1.

Scope: `video/cache-aside/sequence/lessons.json` item 4 and `content/concepts/cache-aside.json`. [Microsoft's Cache-Aside pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/cache-aside), inspected 2026-10-21, explains that changes in the source need not appear in a cached copy and that cache-aside alone does not guarantee consistency. The revision numbers and missed cache change are the lesson's illustrative scenario.

Five beats, 45 seconds. End with the stale result still visible. Do not repair it, delete the key, add expiry, implement a freshness check, show concurrent-reader races, or execute the runbook. Those would expand beyond this lesson.

## Visual design: two revision records and a returned result

Use a **revision comparison workspace**: two stable store records sit side by side under one key heading. An editor commits only the database record. A reader application below receives a copy only from the cache. Persistent, large revision numerals make divergence immediately visible. A thin history line inside the database card records 1→2; the cache never moves or changes.

1080 × 1920. Background #050506, primary #E6E8EC, secondary #8B9099; commit accent teal #3FB68B; cached older revision amber #F5A524 only after the source commit. Do not color the cache hit as a network failure. Main labels 58–64 px; revision numerals 100 px; secondary 52 px minimum; title 76 px.

| Element | Coordinates x,y,w,h | Content |
|---|---|---|
| Title | 90,140,900,110 | `A stale copy` |
| Shared key heading | 90,330,900,80 | `runbook:api`, 60 px |
| Editor strip | 570,460,420,130 | `Editor` / `Save revision 2`, 52 px |
| Cache record | 90,700,420,430 | Cache; revision; large 1 |
| Database record | 570,700,420,430 | Database; revision; large 1 → 2 |
| Commit history | 610,1050,340,60 | `1 → 2`, 54 px, appears only after commit |
| Reader application | 90,1390,900,270 | `Application`; result initially empty, later `Received revision 1` |
| Lookup outcome | 90,1700,900,70 | `HIT · key found`, 56 px |
| Final annotation | 90,1800,900,70 | `Hit ≠ fresh`, 60 px |

Within each store card: heading y745; Revision y835; numeral center y955. Place `Cache unchanged` at (90,1180,420,80) after commit, 52 px on two lines if necessary. Place `Saved` at (610,1180,340,70) under the source. These labels distinguish missed cache maintenance from a pending source write.

Editor write path: (780,600)→(780,680), downward. Reader request path: (300,1370)→(300,1150), upward toward cache. Cache response path: (470,1150)→(470,1370), downward to reader. These are separate paths; no cache↔database connector. Display `Read runbook:api` at (90,1290,900,70) during lookup. No tiny text on moving markers.

The comparison view is explanatory knowledge, not an application automatically reading both stores. In particular, the application's result must not acquire an invented freshness warning or revision-2 value. Hit ≠ fresh is a narrator-level visual annotation outside the application panel.

## Beat sheet: timing, motion, state, sound

Editor C4, database A4, reader G4, cache E4. Use restrained event effects with long quiet holds. No music or ticking. Sound cues are intended production, not already generated or heard.

| Beat / playback | Motion and persistent state | Sound / hold |
|---|---|---|
| 1 · 0–8 s · Copies currently agree | Establish both store records at revision 1 under the same key. Reader result empty. At 3 outline the two numerals together once, then settle. Editor has no completed write yet. | Quiet database `ack` A4 and cache `ack` E4, separated by 0.3 s at 3. Hold 4–8. Agreement is current example state, not a synchronization guarantee. |
| 2 · 8–18 s · Commit only the source | At 8.5 reveal editor Save revision 2. Send write marker 10–11. At 12 database numeral changes 1→2 and commit history appears. At 13 Saved becomes visible. Cache remains 1 at the same position. | Editor `send` C4 at 10; database `store` A4 at 12. Hold 14–18. Do not animate a write, deletion, or attempted update at cache. |
| 3 · 18–25 s · Hold the divergence | At 18.5 show Cache unchanged. Emphasize cache 1, then database 2 at 20.0. Reader still has no result. No messages move. | Reader-level soft `ack` G4 at 20 draws attention to the comparison. Hold 20.5–25. The distinct numerals do the teaching; no paragraph explanation. |
| 4 · 25–34 s · Later lookup still hits | At 25.5 reader becomes Checking cache and Read runbook:api appears. Send request upward 27–28.5. Highlight the cache key/record at 29; reveal HIT · key found at 30. Cache revision remains 1; database remains 2 and receives no read. | Reader `send` G4 at 27; cache `hit` E4 at 30. Hold 30.5–34. The lookup succeeds because the key exists. |
| 5 · 34–45 s · Return the old copy successfully | Duplicate cache revision into a return marker at 34.5, keeping the stored record. Travel down 35–36.5; populate application Received revision 1 by 37.5. At 39 emphasize application 1 against source 2 without moving either record. Reveal Hit ≠ fresh at 40. | Cache `send` E4 at 35; reader `arrive` G4 at 36.5. A soft reader `ack` G4 at 40 marks the limit, not an error response. Hold 40.5–45. No recovery or reset. |

State invariants: source is 1 until commit, then 2; cache is 1 for the whole cut; application gets 1 only after cache delivery. A successful hit is maintained alongside visible staleness. No red crash, failed delivery, or missing-key symbol should undermine that distinction.

## Accuracy limits

- The editor's source save succeeds; cache maintenance is omitted. Do not depict it as automatic synchronization that is merely slow, or as a failed deletion unless a separate failure is actually shown. This story deliberately has no cache change.
- The demonstrated lookup makes no source read, so it cannot itself establish the current source revision. The viewer sees both states because the illustration exposes them, not because the app performed a comparison.
- Revision 1 is stale relative to the already committed revision 2 for this key. No claim is made about a live concurrent write, database replica lag, transactional snapshot, or universal consistency mode.
- Cache data remains reusable after a read. A response is a copy, not removal of the stored entry. A hit acknowledges presence, not source freshness, permission, or runbook correctness.
- Key is a scoped-result alias for teaching. Authorization is assumed satisfied; no operational instruction is executed. Payload content and the actual changed rollback step remain out of scope.
- Timing is illustrative. Do not add TTL countdowns, latency comparisons, or imply a fixed duration until stale data disappears.

## Native350 acceptance and later review

- Inspect individual actual encoded frames at native 350 px width (~622 px high) and full resolution. Revision numerals become ~32 px, secondary 52 px labels ~16.9 px. Split Save revision 2 and Cache unchanged across short lines if needed; never shrink to fit the narrow cards.
- Inspect holds at 5, 15, 22, 32, and 42 s, plus before/mid/after commit, key match, return travel, and application result reveal. Contact sheets alone are insufficient.
- At 5 s see 1/1. At 15 and 22 s see cache 1/source 2. At 32 s see Hit despite divergence. At 42 s see application 1, cache 1, source 2, and Hit ≠ fresh together.
- No source revision change before commit acknowledgment. No cache numeral change, deletion, expiry, automatic refresh, extra request, or database read during the hit. The application cannot show revision 2 or an automatically detected stale warning.
- Return marker must duplicate cache data while retaining its stored row. Avoid any arrow suggesting database→cache or editor→cache propagation. Application result appears only at delivery.
- Muted playback must distinguish write success, unchanged copy, hit success, and stale returned value. Meaningful variety comes from one-sided record mutation, stable comparison, key lookup, and result population—not decorative movement.
- Reproduce alleged visual defects with alternate extraction before flagging. Later decode the complete MP4, inspect audio peaks and streaming metadata, and listen before claiming audio was heard. Bind review to the actual full SHA-256 and renew inspection after re-encoding.

Only this plan is assigned. Future implementation uses repository-pinned Puppeteer and cut-local engine copies. No rendering, public/site/shared-skill edits, Git operations, or other lesson work is included.
