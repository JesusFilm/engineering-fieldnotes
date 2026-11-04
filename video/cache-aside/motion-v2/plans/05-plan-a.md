# Invalidate and refill

## Focus and grounding

One mechanism: delete the stale cache entry; a later read finds no entry, so application code fetches revision 2 from the source and writes a new cached copy. Deletion creates absence, not freshness by itself.

Grounding: `video/cache-aside/sequence/lessons.json` item 5 and `content/concepts/cache-aside.json`. [Microsoft's Cache-Aside pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/cache-aside), inspected 2026-10-21, describes source update before invalidation and application-owned refill on a subsequent miss. The source update has already committed before this cut begins. The scenario assumes successful deletion and no competing reads/writes; it does not establish a general consistency guarantee.

Six beats, approximately 50 seconds. Allow the full sequence readable holds rather than compressing to match the original 28-second slot. No TTL, cache outage, concurrent-reader race simulation, retry strategy, or subsequent hit demonstration. The ending repairs only this illustrated key.

## Layout: cache entry lifecycle with application-owned actions

Use a wide application operation inspector above two store records. The cache entry has three visually distinct states: solid revision-1 row, empty key result, solid revision-2 row. The database stays at revision 2 throughout. An action label in the application changes DELETE cache → GET cache → READ source → SET cache. Every operation starts at the app; the stores never exchange data directly.

1080 × 1920, background #050506; primary #E6E8EC, secondary #8B9099, pending amber #F5A524, received/stored teal #3FB68B. Absence is neutral, not red failure. Title 76 px, actors/actions 60 px, record labels 54–58 px, secondary text 52 px minimum.

| Element | Geometry x,y,w,h | Content |
|---|---|---|
| Title | 90,140,900,110 | `Invalidate and refill` |
| Application inspector | 90,350,900,430 | Application; action at y480; key at y580; result at y680 |
| Key label | 130,580,820,70 | `runbook:api` |
| Cache record | 90,1130,420,450 | Cache; revision 1 → No entry → revision 2 |
| Database record | 570,1130,420,450 | Database; revision 2, unchanged |
| Store key labels | x130/x610, y1240 | `runbook:` / `api`, two lines, 54 px |
| Store values | x130/x610, y1420 | `revision 1/2` or `No entry`, 54 px |
| Phase cue | 90,1650,900,75 | `Delete confirmed`, `Next read`, `Refill confirmed` as appropriate |
| Final limit | 90,1760,900,110 | `No concurrent changes`, 52 px |

If the title exceeds 900 px, split Invalidate / and refill across two lines and move the app down by 50 px; preserve the request corridor below. Do not shrink the title or labels.

App↔cache path: (300,800)↔(300,1110). App↔source path: (780,800)↔(780,1110). Single marker on the active path, arrows indicating direction. No cache↔source connection. Use square request markers and round return markers with stationary action labels, avoiding tiny moving text. Application's revision value stays visible during SET, proving a copy is sent rather than the app losing its result.

## Beat sheet: timing, state, sound

Application C4; cache E4; database A4. Use short event sounds, no music or repeated clock. Deletion uses a quiet cache `poof`, not a crash. All audio below is a production specification, not a listening claim.

| Beat / time | Motion and state changes | Sound / hold |
|---|---|---|
| 1 · 0–7 s · Establish stale entry | Show cache revision 1 and source revision 2 under the same key. App is ready for DELETE cache. At 3 outline only the cache entry, keeping database 2 fixed. | Application `ack` C4 at 3. Hold 3.5–7. No source write is performed in this cut. |
| 2 · 7–16 s · Delete and acknowledge | Send DELETE app→cache 7.5–9. At 9.5 remove the entire stored key/value row; replace it with a neutral No entry result area. Keep the Cache heading. Return acknowledgment 10.5–12; app shows Delete confirmed at 12. Hold the cache empty. | App `send` C4 at 7.5; cache `poof` E4 at 9.5; app `ack` C4 at 12. Hold 12.5–16. No revision 2 appears in cache after deletion. |
| 3 · 16–25 s · A later reader misses | At 16.5 phase cue Next read and app action GET cache. Send lookup 18–19.5. Cache returns a hollow result 20–21.5; app displays MISS · key absent. Cache remains empty; source remains 2. | App `send` C4 at 18; cache `miss` E4 at 20; app `arrive` C4 at 21.5. Hold 22–25. This is a new read, not the delete acknowledgment. |
| 4 · 25–34 s · Fetch from source | App action becomes READ source at 25.5. Send app→database 26.5–28; highlight source row at 28.5. Return a copy 30–31.5; app receives revision 2 by 32. Cache remains No entry. | App `send` C4 at 26.5; database `work` A4 at 28.5 and `send` A4 at 30; app `arrive` C4 at 31.5. Hold 32–34 on app=2, cache absent, source=2. |
| 5 · 34–43 s · Explicit refill | At 34.5 app action SET cache retains revision 2. Hold until 36. Send copy app→cache 36–37.5. At 38 replace empty result area with solid stored key/value revision 2. Return write acknowledgment 39–40.5. Show Refill confirmed. | App `send` C4 at 36; cache `store` E4 at 38; app `ack` C4 at 40.5. Hold 41–43. Source data never moves or changes. |
| 6 · 43–50 s · Bound the outcome | At 43.5 emphasize cache 2 and source 2 together. Keep application revision 2 visible. At 45 reveal No concurrent changes outside all component panels. | Quiet application `ack` C4 at 43.5. Hold 45–50 silently. No global consistency badge, new request, deployment, or loop reset. |

The empty-cache holds are essential: invalidation does not fetch revision 2. Source receipt and cache refill are also separated by a hold and a new action. The return value used by the application is revision 2; “uses” here means receiving/displaying data, not executing runbook instructions.

## Accuracy limits

- Deletion succeeds in this example and its acknowledgment precedes the next read. Failed deletion is not automatically repaired by this animation. Do not display success before the operation completes.
- Source revision 2 was committed before the opening frame. This preserves update-before-delete ordering without adding another write mechanism.
- The empty result area is an inspector's absence display, not a stored null/tombstone value. The full cached key/value entry is removed; later SET recreates it.
- The scenario has one subsequent reader and no concurrent writes or old in-flight fills. Such operations can reintroduce stale data; matching final revisions do not prove atomicity or lasting consistency. Keep that limitation in the plan and short final annotation rather than adding a race tutorial.
- Both source read and refill belong to application code. No automatic cache-to-database request or background synchronization occurs.
- Key is an illustrative alias, access checks are assumed satisfied, and revision labels are metadata rather than freshness or authorization guarantees. No real credentials or runbook instructions appear.
- Playback timings are illustrative; deletion does not imply all distributed copies or replicas are instantaneously purged. The cut depicts one logical cache entry.

## Native350 acceptance and future review

- Inspect individual actual encoded frames at native 350 px width (~622 px high) plus full resolution. 54 px text becomes ~17.5 px; 52 px text ~16.9 px. Wrap action labels and keys if needed without reducing font size. Keep distinct keys/revision labels aligned across store cards.
- Inspect holds at 5, 14, 23, 33, 42, and 47 s, plus before/mid/after delete, acknowledgment, miss return, source receipt, fill mutation, and write acknowledgment. Contact sheets do not establish legibility.
- At 14 s cache must be empty while source stays 2. At 23 s the later lookup must visibly miss. At 33 s app has 2 while cache remains absent. At 47 s app/cache/source all show 2 with the concurrency assumption visible.
- Verify no source fetch during deletion, no refill before SET, no stale revision 1 returned, and no cache→source traffic. Cache-entry deletion must not remove the cache component or database record.
- Exactly one delete, one later lookup, one source read, and one refill occur. Acknowledgments must not look like data records or duplicate operations. Stored rows persist during response-copy travel.
- Silent playback must explain the state sequence 1→absent→2 and application ownership through visible actions. Preserve quiet holds between stages, especially before refill.
- Reproduce suspected visual faults with alternate extraction before flagging. Later decode the complete MP4, inspect audio peaks and streaming metadata, and listen before claiming audio was heard. Bind review to the actual full SHA-256; renew encoded inspection after any re-encode.

Only this plan is assigned. Future implementation uses repository-pinned Puppeteer and cut-local engine copies. No rendering, public/site/shared-skill edits, Git operations, or other lesson work is included.
