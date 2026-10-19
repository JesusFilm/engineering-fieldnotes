# Baseline beat sheet (playback seconds)

| Time | Motion | State | Sound |
| --- | --- | --- | --- |
| 0.6–6.6 | Caller to app, cache miss, app to database, database to app, cache fill, response | Entry fills at 5.85 and immediately begins its illustrative 8.65s lifetime | send/arrive, miss, work, store, deliver |
| 8.6–11.5 | Caller to app, cache lookup and response | Database dims, cache serves result, TTL keeps draining | send/arrive, hit, deliver |
| 13–14.8 | Clock turns; bar reaches zero | Entry expires at 14.5 | clock ticks, poof |
| 16–22 | Next request repeats miss/source/fill path | New entry starts a new lifetime at 21.25; caller receives result at 22 | send/arrive, miss, work, store, deliver |
| 22–24 | Rest then stage fade | Closing title matches opening title | No new semantic event during rest/fade |
