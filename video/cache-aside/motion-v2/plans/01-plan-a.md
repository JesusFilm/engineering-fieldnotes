# Read the source

## Scope and grounding

One mechanism: the application requests a runbook by key, the database locates the saved record, and a returned copy populates the application's view. A second direct read repeats the source lookup while the original saved record remains intact.

Scope: `video/cache-aside/sequence/lessons.json` item 1 and `content/concepts/cache-aside.json`. The sequence establishes the database as this example's source of record and the returned value as revision 1. The concept distinguishes source data from reusable copies. This cut establishes the baseline before caching; it does not implement a cache, hit/miss path, fill, expiry, invalidation, revision update, or authorization workflow.

Five beats, 44 seconds. All times are illustrative playback, not measured database latency. The last frame can name a reusable copy as the motivation for the next lesson, but must not show an unrequested cache mechanism.

## Visual grammar: a keyed record inspector

Use an application runbook viewer above a database table. The database's key row is highlighted during lookup; a duplicate of the matching record moves to the application while the source row stays fixed. This is a software record operation, not a file physically leaving a cabinet. The second read increments a source-read counter, establishing repeated work without a speed claim.

1080 × 1920. Background #050506, primary text #E6E8EC, secondary #8B9099, lookup amber #F5A524, returned record teal #3FB68B. Labels and outlines carry identity independently of color. Title 76 px; actor labels 62 px; keys/revision/state 54–58 px; secondary labels at least 52 px.

All rectangles below are x,y,width,height.

| Element | Coordinates | Content |
|---|---|---|
| Title | 90,140,900,110 | `Read the source` |
| Application viewer | 90,360,900,410 | `Application`, heading at y400; `Runbook` at y500; revision slot at y600 |
| Read-state line | 130,690,820,60 | `Ready` / `Reading` / `Received` |
| Request label | 130,860,820,80 | `Read runbook:api`, 56 px |
| Database panel | 90,1110,900,470 | `Database`, y1150; `Source of record`, y1230, 52 px |
| Matching record | 130,1340,820,160 | `runbook:api`, 58 px; `revision 1`, 58 px below |
| Source-read counter | 90,1640,900,80 | `Source reads: 0` → 1 → 2, 58 px |
| Footer | 90,1760,900,80 | final `Each read repeats work`, 54 px |

Request path (300,790)→(300,1080), downward, outlined marker. Response path (780,1080)→(780,790), upward, filled marker; label `Record` at (680,970). Do not put the long key on moving markers. Show it at rest in the request label and database row. Response marker can briefly enlarge into a `revision 1` chip at the application edge before settling into the revision slot.

The database's row and value remain visible throughout. Its border pulses for lookup, then settles; do not show a full-table scan, index structure, disk animation, or invented query execution plan. The application uses a small document outline and revision label, not runbook paragraph content.

## Beat sheet: time, motion, state, sound

Application C4; database E4. Use `send`, `work`, `arrive`, and `ack` cues sparingly. No continuous ticking, typing, music, or sound for every text reveal. Every meaningful event has a short cue; reading holds are quiet.

| Beat / playback | Motion and state | Sound / hold |
|---|---|---|
| 1 · 0–7 s · Establish the source | Reveal empty application Runbook view and saved database row runbook:api / revision 1. Counter is 0. At 3 outline the source row once; the application revision slot remains empty. | Database `ack` E4 at 3. Hold 3.5–7. The source already contains the record before any read. |
| 2 · 7–16 s · Ask and look up | At 7.5 application becomes Reading and request label appears. Hold to 9.5. Send marker downward 9.5–11. At 11 the matching database row highlights, source-read count becomes 1, and database state shows Lookup in the space above its row. Hold lookup emphasis until 14.5; then restore the row's normal border. | Application `send` C4 at 9.5; database `work` E4 at 11. Hold 12–14.5. No application result exists yet. |
| 3 · 16–25 s · Return a copy | At 16.5 create a response marker at the database edge without removing the row. Travel upward 17–18.5. At 18.5 application becomes Received; unfold marker into revision 1 chip by 19.5. Database record remains revision 1. | Database `send` E4 at 17; application `arrive` C4 at 18.5, soft `ack` C4 at 19.5. Hold 20–25 with matching revision labels in both places. |
| 4 · 25–36 s · Repeat a direct read | At 25.5 label `Read again` replaces Ready/Received. At 26 clear only the application's displayed copy and set Reading; source row stays intact. Send the same-key request 27–28.5. Database highlights the same row and counter becomes 2 at 28.5. Return the same revision 1 along the response path 31–32.5; application displays it by 33.5. | Application `send` C4 at 27; database `work` E4 at 28.5; database `send` E4 at 31; application `arrive` C4 at 32.5. Hold 34–36. Same timing is illustrative, not a performance measurement. |
| 5 · 36–44 s · Make repeated work visible | At 36.5 emphasize Source reads: 2, then both unchanged revision 1 labels at 38. At 39 show Each read repeats work footer. Optional short label `Reusable copy?` may replace the footer at 41, but add no cache node or additional request. | Database `ack` E4 at 36.5. Hold 39–44. Both records remain; no reset, further read, or hidden cache fill. |

Preferred final footer is Each read repeats work. The optional motivation label should be omitted if it dilutes the beginner's source-read takeaway. Meaningful motion consists of keyed lookup, source-preserving return, application population, and repeated source activity; it is not just two dots traveling.

## Accuracy limits

- This example's saved record stays at revision 1; there is no concurrent writer. “Source of record” expresses ownership, not a universal guarantee about every database consistency mode or replica read. Do not claim globally latest data under arbitrary concurrency.
- `runbook:api` is a short illustrative key, not a production key-scope recommendation. Team, service, schema scope, and authorization are outside this cut; knowing the key does not grant permission.
- Returning data copies it into the response; the source is not consumed, moved, or deleted. Clearing the application view for the second demonstration does not delete the database row and is not a required application behavior.
- Source reads counts logical application fetches, not disk operations. The database may internally cache data; the scene makes no claim that each read hits physical storage or costs the same amount.
- The stored revision label is returned metadata, not proof of perpetual freshness. No deployment action or use of runbook instructions occurs.
- There is no application cache in this baseline. Do not render HIT/MISS, TTL, SET, a cache cylinder, or a latency comparison. Those teach later mechanisms.

## Native350 acceptance and future encoded checks

- Inspect actual individual encoded frames at native 350 px width (~622 px high), plus full resolution. 54 px labels become 17.5 px; secondary 52 px labels about 16.9 px. Keep long key labels on stationary rows, not tiny packets. All revision text must remain readable without zoom.
- Inspect holds at 5, 9, 13, 22, 29.5, 35, and 42 s, plus before/mid/after lookup, response arrival, application-copy clearing, and counter changes. Contact sheets cannot establish readability.
- At 13 s identify the same requested key in the database and a still-waiting application. At 22 s see revision 1 in both source and received view. At 35 s see Source reads: 2 and unchanged source data.
- Counter increments exactly once per arriving source read, never on response or record highlighting. Source row never disappears; no extra hidden request, duplicate response, or application result appears before receipt.
- The second read must be clearly labeled and separated from the first by a completed hold. It must not look like a retry caused by failure or like a new revision write.
- Check arrow labels and markers do not cross keys, revision slots, or actor labels. Silent playback must distinguish request, lookup, returned copy, and repeated source work.
- Reproduce suspected visual defects through alternate extraction before flagging. Later decode the full MP4, inspect audio peaks and streaming metadata, and listen before claiming actual audio was heard. Bind review to the actual full SHA-256 and renew inspection after any re-encode.

Only this plan is assigned. Future implementation uses repository-pinned Puppeteer and a cut-local engine copy. No rendering, public/site/shared-skill edits, Git operations, or other lesson work is included.
