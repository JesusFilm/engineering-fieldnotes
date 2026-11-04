# A cache miss

## Focus and grounding

One mechanism: an absent cache key returns a miss to the application; application code reads the source, receives the record, and writes a copy into the cache. The cache never fetches from the database itself.

Scope: `video/cache-aside/sequence/lessons.json` item 3 and `content/concepts/cache-aside.json`. [Microsoft's Cache-Aside pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/cache-aside), inspected 2026-10-21, supports this application-owned lookup/read/fill sequence. The concrete key, revision, layout, and timing are illustrative.

Five beats, approximately 48 seconds. End with the cache populated and the source retained. No later hit replay, expiry, update, invalidation, stale-write race, retry, cache outage, or authorization tutorial. A miss is normal absence, not a database failure.

## Visual design: application-owned operation switchboard

Use an application workspace across the upper half and two separate store drawers below. The app's active operation changes from GET cache to READ source to SET cache. Each request originates at that workspace. Cache and database never have a connecting wire. This asymmetrical operation inspector, with persistent store rows and a changing application result, makes ownership clearer than a left-to-right three-stage pipeline.

1080 × 1920. Background #050506, text #E6E8EC, secondary #8B9099, pending amber #F5A524, returned/saved data teal #3FB68B. Miss is neutral amber with `Key absent`, not a red crash icon. Title 76 px, actor labels 60 px, operation/record labels 54–58 px, secondary labels 52 px minimum.

| Element | Coordinates x,y,w,h | Content |
|---|---|---|
| Title | 90,140,900,110 | `A cache miss` |
| Application workspace | 90,350,900,480 | heading Application at y390 |
| Current operation | 140,500,800,90 | `GET cache`, then `READ source`, then `SET cache`, 60 px |
| Key | 140,610,800,70 | `runbook:api`, 58 px |
| Application result | 140,715,800,75 | `Waiting` → `Key absent` → `revision 1` |
| Cache drawer | 90,1130,420,460 | Cache at y1170; key split across lines at y1280/1345 if needed; value at y1450 |
| Source drawer | 570,1130,420,460 | Database at y1170; same key; revision 1 at y1450 |
| Action label | 90,1660,900,75 | current short cue: `Miss` / `Source read` / `Cache fill` |
| Footer | 90,1760,900,75 | final `Application fills the cache` |

Cache begins `No entry`, with the requested key shown as the lookup target, not as a present stored key. Distinguish this with a dashed target outline. After fill acknowledgment replace it with a solid stored-row outline and revision 1. Database's solid revision-1 row is present from the beginning and never removed.

App↔cache route: (300,850)↔(300,1110). App↔database route: (780,850)↔(780,1110). Each is bidirectional but only one marker moves at a time. The stationary operation label identifies direction/purpose; use downward request and upward return arrows. Never draw a cache↔database path. Moving markers carry no tiny payload text; all values are read in stationary panels.

If key text cannot fit at 54 px inside either drawer, use `runbook:` and `api` on two fixed lines in both drawers. Do not shorten one store's key differently or reduce font size.

## Timed beats, state, and sound

Actor pitches: application C4, cache E4, database A4. Distinct presets separate absence, returned data, and write confirmation. No music, ticking, or endless spinner. Quiet holds are part of the teaching pace.

| Beat / time | Motion and persistent state | Sound / holds |
|---|---|---|
| 1 · 0–10 s · Lookup yields absence | Establish app GET cache, target key, cache No entry, source revision 1. Send app→cache 2.5–4. Cache emphasizes its empty target at 4.5. Return a small hollow result marker 6–7.5; app becomes Key absent at 7.5 and action label Miss appears. Database remains untouched. | App `send` C4 at 2.5; cache `miss` E4 at 4.5; app subdued `arrive` C4 at 7.5. Hold 8–10. No failure/red status. |
| 2 · 10–20 s · Application initiates source read | At 10.5 app operation becomes READ source, result Waiting. Hold 11–13 so ownership is clear. Send a new marker from the app to database 13–14.5. Highlight source row and perform one restrained lookup sweep 15–17. Cache remains No entry. | App `send` C4 at 13; database `work` A4 at 15. Hold 17–20. The new request originates at the app, not from the cache miss marker. |
| 3 · 20–29 s · Application receives the record | At 20.5 create a response copy at the database edge. Travel database→app 21–22.5. App result becomes revision 1 by 23.5. Database row remains revision 1; cache is still absent. | Database `send` A4 at 21; app `arrive` C4 at 22.5. Hold 24–29: app has data but cache does not yet. This intermediate state is essential. |
| 4 · 29–39 s · Separate cache write | At 29.5 app operation becomes SET cache, retaining key and revision 1. Action label Cache fill. Hold 30–32. Send a copy app→cache 32–33.5. At 34 replace No entry with revision 1 and solid stored outline. Return a short write acknowledgment cache→app 35–36.5; app shows Saved beneath retained revision. | App `send` C4 at 32; cache `store` E4 at 34; app `ack` C4 at 36.5. Hold 37–39. No source mutation. |
| 5 · 39–48 s · Keep the copy | At 39.5 emphasize app revision, then cache revision at 41.0, while source remains present. At 42 reveal Application fills the cache. Dim routes to secondary tone and keep all three record states legible. | Cache quiet `ack` E4 at 41. Hold 42.5–48 silently. No later lookup, hit, or automated background fetch. |

Only the operation inspector changes roles; the data remains stable once received. A cache fill is not the database response continuing through the app without a decision: the explicit hold and SET operation mark a new application action. The acknowledgment confirms the illustrative write, not permanent durability or freshness.

## Accuracy limits

- A miss means the selected key is absent here. It is not a timeout, connectivity failure, failed database read, or missing source record. The source visibly has revision 1 throughout.
- Cache-aside ownership is the lesson. Read-through caches have different ownership; do not depict their automatic source-fetch behavior in this example.
- Cache is a reusable copy, not the authoritative record. Source read and cache write are separate operations; no atomic transaction across both stores is implied.
- The application can receive source data before the cache fill finishes. This scene chooses to complete the fill; it makes no universal claim about when applications must return to their external callers or what happens on fill failure.
- No concurrent writer changes the record. Revision 1 is not a freshness guarantee, and the successful fill does not prove future consistency.
- Key is an illustrative alias; production scope and access checks are assumed handled elsewhere. No prompt cache or semantic similarity lookup is represented.
- Times are pedagogical; no latency, speedup, database disk access, or cache durability guarantee is implied.

## Native350 acceptance and future review

- View actual individual encoded frames at native 350 px width (~622 px high), plus full resolution. 54 px labels become ~17.5 px, 52 px secondary labels ~16.9 px. Wrap drawer keys consistently rather than shrinking them. Ensure No entry and revision labels do not collide with headers.
- Inspect holds at 1.5, 8.5, 12, 18, 26, 31, 38, and 45 s, plus before/mid/after every travel, miss result, source receipt, cache mutation, and write acknowledgment. Contact sheets alone do not establish readability.
- At 8.5 s distinguish cache absence from the existing database record. At 26 s see revision 1 in the app and source while cache is still empty. At 45 s see the newly populated cache and unchanged source.
- Every source read and cache fill must originate at the app. No cache→database wire or traveling marker; no automatic source response inserted into cache before SET. Exactly one lookup, one source read, one fill.
- Stored source row persists during return. Cached row becomes solid only on write receipt. No copy vanishes from the application during fill, and no revision appears before its corresponding arrival.
- Muted playback must explain the sequence through state and ownership. Include still holds between receiving data and writing the cache; do not compress these into one continuous transfer.
- Reproduce suspected visual faults through alternate extraction before flagging. Later decode the full MP4, inspect audio peaks and streaming metadata, and listen before claiming audio was heard. Bind review to the actual full SHA-256; renew encoded inspection after re-encoding.

Plan only. Future implementation uses repository-pinned Puppeteer and cut-local engine copies. No rendering, public/site/shared-skill edits, Git operations, or other lesson work is included.
