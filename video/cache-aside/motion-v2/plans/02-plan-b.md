# Lesson 02 — A cache hit — plan B

Independent plan for the motion-v2 cut of cache-aside lesson 02. Authored from the lesson entry in `video/cache-aside/sequence/lessons.json` (item 2) and the concept content in `content/concepts/cache-aside.json`. Earlier motion-v2 beat sheets were read only to vary the geometry. No other plan for this lesson, no production ledger, and no authoring source was consulted. This document names no authoring model.

## Scope

One mechanism: **in cache-aside the application checks the cache before the source; when the requested key is present, that lookup is a hit, the cache returns its copy (revision 1), and no database read happens; the hit proves the key was there, not that the copy is current.**

The viewer should feel three things. The application takes the cache path first and the database path stays untouched. The cache finds `runbook:api` among its keys and returns `rev 1` while the database's `source reads` counter stays at `0`. At the end a `current?` tag sits on the returned copy and the database stays dim and unread, so the viewer sees nothing has checked freshness.

Grounding: lesson beats ("a cache holds a reusable copy. The application checks it first", "the requested key is present. This lookup is a cache hit", "the cache returns revision 1. No database read is needed here", "a hit avoids this source read. But is the copy still current?"); intro ("a cache is a separate store for reusable copies. In cache-aside, the application checks it before reading the source"); takeaway ("a hit means the requested key was found in the cache. It does not establish that the copy is fresh"); concept summary ("a hit proves presence, not freshness") and overview ("the application owns the lookup"). Sources per the concept file, retrieved 2026-10-19: [Microsoft Learn — Cache-Aside pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/cache-aside) and [AWS ElastiCache — Caching strategies](https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/Strategies.html).

Out of scope (later lessons): misses, source reads after a miss and cache fills (03); a newer source revision, editors and stale returns (04); invalidation (05). The database's contents are not shown as current or outdated: its rows stay dim and unread so the cut makes no freshness claim either way. How the copy got into the cache is not shown; it is already there. Expiry, authorization and key scope are not shown.

Grammar for this cut: **the application at the top with two outgoing paths, one to a cache on the left and one to the database on the right, side by side at the same height. The cache is a small keyed table; the database is a larger table drawn dim with a `source reads` counter. Only the left path ever carries anything.** Lesson 01 stacked application above database with a repeated read; here the choice between two stores and the untouched right path carry the lesson. Every element is a software object: an application, a cache, keys, a copy, a revision and a database. No memory-palace, sticky-note or shelf metaphors.

Target length ≈ 38 s at speed 1 (`meta.speed: 1`). Hold the "database untouched" moment and the closing `current?` question; they are the lesson.

## Engine notes

Use `box` for the application, `store` (2 rows) for the cache and (3 rows, dimmed via `alpha`) for the database, `label` for headers, keys, states, `hit`, the counter and `current?`, `s.wire` for the two paths (the right one stays resting grey and is never animated with `flow`), and chips for the lookup and the copy. No new node type is expected. Work in a cut-local engine copy with the repository-pinned Puppeteer.

## Stage and coordinates (1080 × 1920)

Palette follows `references/style.md`. Minimum on-screen text 40 px (≈ 13 px at 350 wide); names 48 px; monospace at 40 px ≈ 24 px per character. Content stays within x 60–1020 and y 480–1540.

| id | type | centre / bounds | text | notes |
|---|---|---|---|---|
| title | title band (540, 330) / (540, 405) | — | **Cache-aside** / A CACHE HIT | |
| appLab | label | (540, 510), 48 px | `application` | C5 |
| appView | store, `rows: 2`, w 640 | (540, 610), x 220–860, y ≈ 545–675 | 40 px mono: `runbook:api   rev ?` → `runbook:api   rev 1` · `from  —` → `from  cache` | |
| appState | label | (540, 725), 40 px mono | `needs runbook` → `checking cache` (accent) → `has a copy` (ok) | |
| order | labels | (290, 800) / (790, 800), 40 px mono, mid | `1 check` · `2 source` | the cache-aside order; `2 source` stays dim |
| pathC | wire | app bottom-left (400, 745) → (290, 860) → cache top (290, 920) | — | lookup and copy travel here |
| pathD | wire | app bottom-right (680, 745) → (790, 860) → db top (790, 920) | — | never carries a chip |
| cLab | label | (290, 960), 48 px | `cache` | E5 |
| cache | store, `rows: 2`, w 420 | (290, 1090), x 80–500, y ≈ 1025–1155; rows ≈ 1058, 1122 | 40 px mono: `runbook:api  rev 1` · `runbook:ops  rev 4` | reusable copies |
| hitTag | label | (290, 1200), 44 px mono, ok | `hit` | appears when the key is found |
| dLab | label | (790, 960), 48 px | `database` | G5; sublabel `source of record` 40 px mono, mid at (790, 1010) |
| db | store, `rows: 3`, w 420, alpha 0.35 | (790, 1130), x 580–1000, y ≈ 1045–1215 | 40 px mono: `runbook:api   …` · `runbook:auth  …` · `runbook:ops   …` | revisions shown as `…`: not read |
| dCount | label | (790, 1270), 40 px mono | `source reads 0` | never changes |
| curTag | label | (700, 610), 40 px mono, accent | `current?` | beside the app's `rev 1`; appears in beat 4 |
| cmpLine | dashed wire | cache row0 right (500, 1058) → db row0 left (580, 1090) | — | dim; appears in beat 4 with a `?` at (540, 1074) 44 px: "not compared" |

Chips: `get runbook:api` (≈ 360 px) travels down pathC; `rev 1` (≈ 120 px) travels back up pathC. Check that `get runbook:api` stays clear of `1 check` (place the label at y 800 left of the path, or shorten the chip to `get api`), and that `current?` (x ≈ 604–796) clears the app's `rev 1` text (ends at x ≈ 600 inside the store; place `current?` outside the store at (540, 690) if it touches).

## Sound map

Actor pitches: application **C5**, cache **E5**, database **G5** (never sounds after the intro). Pan: cache left (≈ −0.5), database right (≈ +0.5).

| event | preset | notes |
|---|---|---|
| actors introduced | `ack` C5, E5, G5 | the only G5 cue |
| lookup sent | `send` C6 | |
| cache receives | `arrive` E5 | |
| key found | `hit` E5 | the hit: the brightest cue |
| copy returns | `send` E6, then `deliver` C5 | |
| app field filled | `store` C5 | |
| database untouched | no sound | silence on G5 is deliberate |
| `current?` | `ack` C4, quiet | |

No music; holds are silent.

## Beat sheet (speed 1)

| time | what moves | state change | sound |
|---|---|---|---|
| **Beat 1 — A cache holds a reusable copy; the application checks it first (0–8.0)** | | | |
| 0.0–1.0 | app, paths, cache, dim database fade in | app `rev ?`, `needs runbook`; `source reads 0` | — |
| 1.6 | app pulses | | ack C5 |
| 2.4 | cache pulses; row0 `runbook:api rev 1` brightens briefly | a stored copy | ack E5 |
| 3.2 | database pulses dim | the source exists | ack G5 (quiet) |
| 4.2 | `1 check` pulses accent; pathC brightens | cache-aside checks the cache first | — |
| 4.2–8.0 | hold | | |
| **Beat 2 — The key is present: a cache hit (8.0–15.0)** | | | |
| 8.0 | appState `checking cache` | | — |
| 8.2–9.4 | chip `get runbook:api` down pathC | | send C6 |
| 9.4 | ripple at cache | | arrive E5 |
| 10.2 | cache row0 outlined ok; row1 dims | key found | — |
| 10.6 | `hit` pops | | hit E5 |
| 10.6–15.0 | hold; pathD and database unchanged | | |
| **Beat 3 — The cache returns revision 1; no database read (15.0–23.0)** | | | |
| 15.0–16.2 | chip `rev 1` up pathC | | send E6 |
| 16.2 | ripple at app; row0 `runbook:api rev 1`; row1 `from cache`; appState `has a copy` | | deliver C5, store C5 |
| 17.2 | `2 source`, pathD, database and `source reads 0` pulse dim in turn | the source was not read | — |
| 17.2–23.0 | hold | | |
| **Beat 4 — A hit avoids this source read. But is the copy still current? (23.0–38.0)** | | | |
| 23.0 | `current?` appears beside the app's `rev 1` | | ack C4 (quiet) |
| 24.0 | cmpLine draws dashed between cache row0 and database row0, with `?` | the copy was never compared with the source | — |
| 25.0 | `hit` pulses, then `current?` pulses | found ≠ fresh | — |
| 25.6–36.4 | hold | final state | |
| 36.4–37.2 | `s.fade` to black, 0.8 s | finite ending | — |
| 38.0 | end | | |

## Accuracy limits

- The cache entry already exists; how it was filled is lesson 03.
- A hit means the key was found in the cache. The cut deliberately shows the database's revisions as `…` (unread) so it implies nothing about whether the copy matches; stale data is lesson 04.
- `1 check` / `2 source` show the cache-aside order owned by application code; on this hit step 2 does not run.
- Keys, `runbook:ops` and revisions are illustrative, based on the concept's runbook example.
- Expiry, key scope and authorization are not shown. Authorization still applies on hits (concept judgement); the write-up should say so.
- Durations are illustrative; no timing numbers appear.

## Native 350 acceptance

These are requirements for the future render, not completed validation.

1. Decode actual frames (avoid relying only on a contact sheet) at 1080 and at 350 px wide around 1.8, 2.6, 3.4, 4.4, 6.5, 8.4, 9.5, 10.3, 10.7, 13.0, 15.6, 16.3, 17.4, 20.0, 23.2, 24.2, 25.2, 30.0 and 36.8 s. At 350 px, `application`, both app rows, appState, `1 check`, `2 source`, `cache`, both cache rows, `hit`, `database`, `source of record`, the dim database rows, `source reads 0`, the chips and `current?` must be readable (the dim database at alpha 0.35 must still read; raise to 0.5 if not).
2. Order: the lookup goes to the cache first; `hit` appears only after row0 is outlined; the copy returns only after `hit`.
3. No source read: no chip, dot or flow ever travels on pathD; `source reads` reads `0` in every frame; database rows never show a revision.
4. Freshness not claimed: no frame shows the database revision; `current?` remains unanswered to the end.
5. Scope: no miss, fill, editor, write, invalidation or expiry appears.
6. Clearance: chips clear `1 check` and `2 source`; `current?` clears the app's row text; nothing enters the title band; no chip remains during a hold.
7. Silent reading: with sound off and words ignored, a viewer sees a top box with two paths down; something goes down the left path into a small table, a row lights and a word appears; something comes back up and the top box fills; the right path and dim table never change and their number stays 0; a question tag appears on the filled value and a dashed line with `?` joins the two tables.
8. Audio: the dry run lists one `hit` E5 at 10.6 s (brightest), one `deliver` C5, a single quiet G5 at 3.2 s and no other G5 cue, and no chime. Full-decode the encode, confirm an audio stream, peak below −0.5 dBFS and moov before mdat. Record whether audio was heard or only analysed.
9. After encoding run `python3 scripts/check_media.py --concept cache-aside`; a new encode needs renewed comparison review bound to its SHA-256.

## Production boundary

Only this anonymous plan is written. No render, scene source, public media, site, shared skill, Git commit or deployment. Later implementation uses the repository-pinned Puppeteer and a cut-local engine copy, with any drawing extension local to the cut.

