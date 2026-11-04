# Lesson 03 — A cache miss — plan B

Independent plan for the motion-v2 cut of cache-aside lesson 03. Authored from the lesson entry in `video/cache-aside/sequence/lessons.json` (item 3) and the concept content in `content/concepts/cache-aside.json`. Earlier motion-v2 beat sheets were read only to vary the geometry. No other plan for this lesson, no production ledger, and no authoring source was consulted. This document names no authoring model.

## Scope

One mechanism: **when the cache lookup finds no entry for the key, the application itself reads the database, receives revision 1, and then writes that copy into the cache; the cache never contacts the database, and a miss means the key was absent, not that anything failed.**

The viewer should feel three things. The cache lookup comes back empty (`MISS · key absent`) while the database stays healthy and ready. Every movement after that passes through the application: down to the database, back up, then across to the cache. There is no wire between cache and database. The application's own code panel steps line by line (`get cache`, `read db`, `set cache`), so the viewer sees which code does the work. At the end the cache holds a new `runbook:api rev 1` row that a later lookup could find.

Grounding: lesson beats ("the application checks the cache. The key is absent: a miss", "the application reads the source. The database has revision 1", "the database returns the record. The application receives it next", "the application fills the cache. A later lookup can find this copy"); intro ("when the key is absent, the application reads the database and fills the cache. The cache does not fetch the data by itself"); takeaway ("a miss is an absent key, not a failed database. Application code performs the source read and cache fill"); concept overview ("the application owns the lookup, source read, and cache fill") and walkthrough step 2 ("on a miss, read the source and cache the returned object"). Sources per the concept file, retrieved 2026-10-19: [Microsoft Learn — Cache-Aside pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/cache-aside) and [AWS ElastiCache — Caching strategies (lazy loading)](https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/Strategies.html).

Out of scope (later lessons): a newer source revision, editors and stale hits (04); invalidation and refill after a write (05). Expiry values, `SET … EX`, concurrent misses, coalescing and authorization are not shown; the write-up can mention that the fill normally sets an expiry. The follow-up "later lookup" is only stated by the final state, not played as a second request (that would repeat lesson 02).

Grammar for this cut: **an application panel at the top that shows its own four-line read routine with a step cursor; below it the cache (left) and the database (right), each connected only to the application. There is deliberately no line between cache and database.** Lesson 02 compared two stores; here the application's code and its role as the only path between them carry the lesson. Every element is a software object: application code, a cache, a database, keys and a record. No librarian, courier or delivery-truck metaphors.

Target length ≈ 44 s at speed 1 (`meta.speed: 1`). Hold after the miss and after the fill; do not hurry the fill, which is the new idea.

## Engine notes

Use `box` for the application panel, `label` lines for the routine with an accent outline box as the step cursor, `store` for the cache (2 rows) and the database (3 rows), `label` for headers, `MISS`, states and the `source reads` counter, `s.wire` for the three application links, and chips for the lookup, read, record and fill. A `row{i}Alpha` fade-in shows the new cache row. If the step cursor needs an animated y, add a general `cursor` node in the cut-local engine copy and report it. Use the repository-pinned Puppeteer.

## Stage and coordinates (1080 × 1920)

Palette follows `references/style.md`. Minimum on-screen text 40 px (≈ 13 px at 350 wide); names 48 px; monospace at 40 px ≈ 24 px per character. Content stays within x 60–1020 and y 480–1560.

| id | type | centre / bounds | text | notes |
|---|---|---|---|---|
| title | title band (540, 330) / (540, 405) | — | **Cache-aside** / A CACHE MISS | |
| app | box | x 140–940, y 480–880 | label `application` 48 px at (280, 525); value line `runbook:api  rev ?` → `rev 1` 40 px mono at (540, 600) | C5 |
| code0–code3 | labels | (300, 680 / 735 / 790 / 845), 40 px mono, left-aligned at x 200 | `1 get cache` · `2 read db` · `3 set cache` · `4 use copy` | the application's routine; lines 2–3 run only on a miss |
| stepCursor | outline box | x 180–620, h 50, moves to each code line | — | accent |
| linkC | wire | app (300, 880) → cache top (300, 1040) | — | lookup and fill |
| linkD | wire | app (780, 880) → db top (780, 1040) | — | source read and record |
| cLab | label | (300, 1080), 48 px | `cache` | E5 |
| cache | store, `rows: 2`, w 420 | (300, 1210), x 90–510, y ≈ 1140–1280 | row0 `runbook:ops  rev 4` · row1 (empty, then `runbook:api  rev 1` ok) | |
| missTag | label | (300, 1330), 44 px mono, accent | `MISS · key absent` | after the failed lookup; fades when the row is filled |
| filledTag | label | (300, 1330), 40 px mono, ok, ≈ 144 px | `stored` | replaces missTag |
| dLab | label | (780, 1080), 48 px | `database` | G5; sublabel `source of record` 40 px mono at (780, 1125) |
| db | store, `rows: 3`, w 420 | (780, 1260), x 570–990, y ≈ 1175–1345 | `runbook:api   rev 1` · `runbook:auth  rev 3` · `runbook:ops   rev 4` | |
| dbState | label | (780, 1400), 40 px mono, ok | `ready` | stays `ready` through the miss |
| dCount | label | (780, 1450), 40 px mono | `source reads 0` → `1` | |
| noLink | — | — | — | no wire, chip or dot ever joins cache and database |

Chips: `get api` (≈ 168 px) on linkC down; `∅` (a short `none` chip, ≈ 96 px) on linkC up; `read api` (≈ 192 px) on linkD down; `rev 1` (≈ 120 px) on linkD up; `set api rev 1` (≈ 312 px) on linkC down. Check that chips on linkC (x 300) do not overlap the code lines (they start below y 880) and that the `set` chip fades into the cache card without crossing `cache` (start it at y 900, end at y 1040).

## Sound map

Actor pitches: application **C5**, cache **E5**, database **G5**. The step cursor ticks quietly at C6 on each code line. Pan: cache left (≈ −0.5), database right (≈ +0.5).

| event | preset | notes |
|---|---|---|
| code step | `ack` C6, quiet | one per line reached |
| cache lookup sent | `send` E6 | |
| key absent | `miss` | soft, falling; a lookup result, not a crash |
| `none` returns | `deliver` C4, quiet | |
| source read sent | `send` G6 | |
| database finds key | `hit` G5, quiet | |
| record returns | `deliver` C5 | |
| fill sent | `send` E6 | |
| row stored in cache | `store` E5 | the brightest cue: the new idea |
| final state | `chime` E5, quiet | the only chime |

No music.

## Beat sheet (speed 1)

| time | what moves | state change | sound |
|---|---|---|---|
| **Beat 1 — Check the cache: the key is absent (0–11.0)** | | | |
| 0.0–1.0 | app, code, links, cache, database fade in | app `runbook:api rev ?`; cache row1 empty; db `ready`; `source reads 0` | — |
| 2.0 | stepCursor on `1 get cache` | | ack C6 |
| 2.6–3.6 | chip `get api` down linkC | | send E6 |
| 3.6 | ripple at cache; cache rows outlined one after another (≈ 0.4 s each); no `runbook:api` row | | arrive E5 |
| 4.6 | missTag `MISS · key absent` | | miss |
| 5.0–5.8 | chip `none` up linkC | | deliver C4 (quiet) |
| 6.2 | dbState `ready` pulses ok | the database has not failed | — |
| 6.2–11.0 | hold | | |
| **Beat 2 — The application reads the source (11.0–18.0)** | | | |
| 11.0 | stepCursor → `2 read db` | | ack C6 |
| 11.6–12.6 | chip `read api` down linkD | | send G6 |
| 12.6 | ripple at db; `source reads 1` | | arrive G5 |
| 13.4 | db row0 `runbook:api rev 1` outlined ok | the source has revision 1 | hit G5 (quiet) |
| 13.4–18.0 | hold | | |
| **Beat 3 — The database returns the record; the application receives it (18.0–24.0)** | | | |
| 18.0–19.2 | chip `rev 1` up linkD | | — |
| 19.2 | ripple at app; value line `runbook:api rev 1` | | deliver C5 |
| 19.2–24.0 | hold; cache row1 still empty | the app has the record; the cache does not yet | |
| **Beat 4 — The application fills the cache (24.0–44.0)** | | | |
| 24.0 | stepCursor → `3 set cache` | | ack C6 |
| 24.6–25.8 | chip `set api rev 1` down linkC | | send E6 |
| 25.8 | cache row1 fades in `runbook:api rev 1` (ok); missTag → filledTag `stored` | | store E5 |
| 26.8 | stepCursor → `4 use copy` | | ack C6 |
| 27.6 | linkD, then linkC pulse in turn; the gap between cache and database stays empty | every step went through the application | — |
| 28.6 | cache row1 and db row0 pulse together | the cache now holds a copy of revision 1 | chime E5 (quiet) |
| 29.4–42.4 | hold | final state | |
| 42.4–43.2 | `s.fade` to black, 0.8 s | finite ending | — |
| 44.0 | end | | |

## Accuracy limits

- The four-line routine is a teaching view of application code, not a specific library's API. In practice the fill usually sets an expiry in the same command (e.g. `SET key value EX 300`); not shown.
- A miss means the key was absent. Other reasons a lookup can return nothing (expiry, eviction, a cache outage) are not distinguished here, and a cache outage is a failure the write-up should treat separately.
- The fill happens after the application has the record. Some code returns the record to the caller before or after the fill; the order here is illustrative and matches the lesson.
- Many simultaneous misses can all read the source at once (a stampede); not shown.
- Keys and revisions are illustrative, from the concept's runbook example. Authorization and key scope are not shown.
- Durations are illustrative; no timing numbers appear.

## Native 350 acceptance

These are requirements for the future render, not completed validation.

1. Decode actual frames (avoid relying only on a contact sheet) at 1080 and at 350 px wide around 1.8, 2.2, 3.0, 3.8, 4.7, 5.4, 6.3, 9.0, 11.2, 12.0, 12.7, 13.5, 16.0, 18.6, 19.3, 22.0, 24.2, 25.2, 25.9, 26.9, 27.7, 28.7, 34.0 and 42.8 s. At 350 px, `application`, the value line, all four code lines, `cache`, both cache rows, `MISS · key absent`, `stored`, `database`, `source of record`, all database rows, `ready`, `source reads` and every chip must be readable.
2. Ownership: no chip, dot or line ever connects cache and database directly; every transfer starts or ends at the application.
3. Order: lookup → `MISS` → source read → record received → fill; the cache row appears only after the `set` chip lands, and the `set` chip leaves only after the application holds `rev 1`.
4. Not a failure: `ready` stays green on the database through the miss; `MISS` uses the accent colour, not the bad colour; no crash or × appears.
5. Code cursor: lines 2 and 3 are reached only after `MISS`; the cursor matches the active transfer.
6. Scope: no newer revision, editor, invalidation, expiry value or second request appears.
7. Clearance: chips stay on their links and clear the code lines and card labels; `stored` fits under the cache card; nothing enters the title band; no chip remains during a hold.
8. Silent reading: with sound off and words ignored, a viewer sees a top panel with numbered lines; something goes down to the left table and comes back empty while a tag appears; the highlight moves down a line and something goes to the right table, a row lights, and something comes back up; the highlight moves again and something goes down to the left table, where a new row appears; the right and left tables never exchange anything directly.
9. Audio: the dry run lists one `miss` at 4.6 s, one `store` E5 at 25.8 s (brightest), one quiet `chime`, four `ack` C6 code steps, and no `crash` or `thump`. Full-decode the encode, confirm an audio stream, peak below −0.5 dBFS and moov before mdat. Record whether audio was heard or only analysed.
10. After encoding run `python3 scripts/check_media.py --concept cache-aside`; a new encode needs renewed comparison review bound to its SHA-256.

## Production boundary

Only this anonymous plan is written. No render, scene source, public media, site, shared skill, Git commit or deployment. Later implementation uses the repository-pinned Puppeteer and a cut-local engine copy, with any drawing extension local to the cut.

