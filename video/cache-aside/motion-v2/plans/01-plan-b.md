# Lesson 01 — Read the source — plan B

Independent plan for the motion-v2 cut of cache-aside lesson 01. Authored from the lesson entry in `video/cache-aside/sequence/lessons.json` (item 1) and the concept content in `content/concepts/cache-aside.json`. Earlier motion-v2 beat sheets from other chapters were read only to vary the geometry. No other plan for this lesson, no production ledger, and no authoring source was consulted. This document names no authoring model.

## Scope

One mechanism: **without a cache, every time the application needs the runbook it sends a read to the database, the source of record; the database looks up the key, finds the saved record at revision 1 and returns it; a second identical read repeats the whole lookup.**

The viewer should feel three things. The database is a keyed table holding the saved record, so "source of record" is a place. A read is real work there: a cursor steps down the keys until it reaches `runbook:payments` and that row lights. The second read does the same steps again, and a `source reads` counter goes from 1 to 2, which is why a reusable copy might help.

Grounding: lesson beats ("the application needs a runbook. The database stores the saved record", "it sends a read to the database. The database looks up the key", "the database returns revision 1. The application receives the record", "every read can repeat that work. A cache can keep a reusable copy"); intro ("the database is the source of record: it holds the saved revision"); takeaway ("a normal source read asks the database for the current record. The animation uses illustrative times"); concept example (`readRunbook(team, service)`, revisions). Sources per the concept file, retrieved 2026-10-19: [Microsoft Learn — Cache-Aside pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/cache-aside) for the source-of-record role.

Out of scope (later lessons): the cache as a working component, hits (02), misses and fills (03), stale copies and editors (04), invalidation (05). The cache appears only in the last beat as an empty, dashed slot labelled `cache` that receives nothing; no copy is stored, no lookup checks it. Authorization, key scope and expiry are not shown.

Grammar for this cut: **an application panel at the top with an empty runbook view, a request lane down to a database drawn as a three-row keyed table with a step-through lookup cursor, a response lane back up, and a `source reads` counter beside the database.** Lesson 01 of load balancing used empty profile fields and server work rows; here the database's internal lookup and the repeat count carry the lesson, and the closing empty cache slot is a forward hint. Every element is a software object: an application, a read call, a key, a table, a record and a revision. No libraries, filing cabinets or bookshelves.

Target length ≈ 38 s at speed 1 (`meta.speed: 1`). The second read is deliberately a full repeat of the first; do not shorten it, because the repetition is the point of beat 4.

## Engine notes

Use `box` for the application, `store` (3 rows) for the app's runbook view and for the database table, `label` for keys, revision, counter and lane labels, `s.wire` for the two lanes, a highlight outline (a `box` with animated y, or pulses on each row in turn) for the lookup cursor, and chips for the read and the record. If a moving cursor needs animated y, add a general `cursor` node in the cut-local engine copy and report it. Use the repository-pinned Puppeteer.

## Stage and coordinates (1080 × 1920)

Palette follows `references/style.md`. Minimum on-screen text 40 px (≈ 13 px at 350 wide); names 48 px; monospace at 40 px ≈ 24 px per character. Content stays within x 100–980 and y 480–1600.

| id | type | centre / bounds | text | notes |
|---|---|---|---|---|
| title | title band (540, 330) / (540, 405) | — | **Cache-aside** / READ THE SOURCE | |
| appLab | label | (540, 510), 48 px | `application` | C5 |
| appView | store, `rows: 3`, w 680 | (540, 640), x 200–880, y ≈ 560–720 | 40 px mono: `runbook:payments` · `revision  …` → `1` · `rollback  …` → `step 4` | the app's view; fields empty until the record lands |
| appState | label | (540, 765), 40 px mono | `needs runbook` → `waiting` (accent) → `has rev 1` (ok) | |
| readLane | wire | (460, 790) → (460, 1050) | — | |
| retLane | wire | (620, 1050) → (620, 790) | — | |
| readLab | label | (330, 920), 40 px, mid | `read` | |
| retLab | label | (760, 920), 40 px, mid | `record` | |
| dbLab | label | (540, 1095), 48 px | `database` | G5; sublabel `source of record` 40 px mono, mid at (540, 1145) |
| dbTable | store, `rows: 3`, w 760 | (540, 1300), x 160–920, y ≈ 1185–1415; row centres ≈ 1222, 1300, 1378 | 40 px mono: `runbook:auth      rev 3` · `runbook:payments  rev 1` · `runbook:search    rev 2` | the saved records |
| cursor | outline box | x 170–910, h 64, moves to row centres | — | accent; visible only during lookups |
| counter | label | (540, 1480), 40 px mono | `source reads 0` → `1` → `2` | |
| cacheSlot | dashed outline box | x 720–960, y 1530–1600 | `cache` 40 px mono, mid at (840, 1565) | hidden until beat 4; stays empty |

Chips: `GET runbook:payments` (≈ 456 px) is too wide for a lane beside the label; use `read payments` (≈ 312 px) on readLane and `rev 1` (≈ 120 px) on retLane. Check that `read payments` (x 304–616 when centred on 460) clears `record` (x 712–808) and that the cursor outline stays inside the table.

## Sound map

Actor pitches: application **C5**, database **G5**. The cursor's steps are quiet ticks at G4 rising to G5 when the key matches. Pan: application slightly left, database slightly right.

| event | preset | notes |
|---|---|---|
| actors introduced | `ack` C5, then `ack` G5 | |
| read sent | `send` C6 | |
| database receives | `arrive` G5 | |
| cursor step | `work` G4 | one per row |
| key found | `hit` G5 | quiet; "found" in the source, not a cache hit |
| record returns | `send` G6, then `deliver` C5 | |
| app field filled | `store` C5 | |
| counter increments | `ack` C6, quiet | |
| cache slot appears | `ack` C4, very quiet | |

No music; holds are silent.

## Beat sheet (speed 1)

| time | what moves | state change | sound |
|---|---|---|---|
| **Beat 1 — The application needs a runbook; the database stores it (0–6.0)** | | | |
| 0.0–1.0 | app, lanes, database and empty counter fade in | appState `needs runbook`; app fields `…`; `source reads 0` | — |
| 1.6 | app panel pulses | | ack C5 |
| 2.6 | database table pulses; row `runbook:payments rev 1` brightens briefly | the saved record lives here | ack G5 |
| 2.6–6.0 | hold | | |
| **Beat 2 — Send a read; the database looks up the key (6.0–13.0)** | | | |
| 6.0 | appState `waiting` | | — |
| 6.2–7.4 | chip `read payments` down readLane | | send C6 |
| 7.4 | ripple at dbLab; counter `source reads 1` | | arrive G5, ack C6 |
| 8.2 | cursor appears on row 0 (`runbook:auth`) | not this key | work G4 |
| 9.2 | cursor moves to row 1 | | work G4 |
| 9.8 | row 1 turns ok; cursor stays | key found: `runbook:payments rev 1` | hit G5 |
| 9.8–13.0 | hold | | |
| **Beat 3 — The database returns revision 1 (13.0–20.0)** | | | |
| 13.0–14.2 | chip `rev 1` up retLane; cursor fades | | send G6 |
| 14.2 | ripple at app | | deliver C5 |
| 14.8 | app row1 `revision 1` | | store C5 |
| 15.4 | app row2 `rollback step 4`; appState `has rev 1` | | store C5 |
| 15.4–20.0 | hold | | |
| **Beat 4 — Every read can repeat that work (20.0–38.0)** | | | |
| 20.0 | app fields reset to `…`; appState `needs runbook` | the next request for the same runbook | — |
| 20.6–21.8 | chip `read payments` down readLane | | send C6 |
| 21.8 | counter `source reads 2` | | arrive G5, ack C6 |
| 22.4 / 23.2 / 23.6 | cursor on row 0, moves to row 1, row 1 turns ok | same lookup again | work G4 ×2, hit G5 |
| 24.2–25.4 | chip `rev 1` up retLane | | send G6 |
| 25.4 | ripple at app; fields fill again | same record, same work | deliver C5, store C5 ×2 |
| 26.4 | counter pulses (`source reads 2`) | | — |
| 27.4 | cacheSlot fades in, dashed and empty | a place a reusable copy could live | ack C4 (very quiet) |
| 27.4–36.4 | hold | final state | |
| 36.4–37.2 | `s.fade` to black, 0.8 s | finite ending | — |
| 38.0 | end | | |

## Accuracy limits

- The database table, key names and `rollback step 4` are illustrative, based on the concept's runbook example. Real databases find keys with indexes rather than stepping through rows; the cursor is a teaching view of "looks up the key", not a scan algorithm.
- Revision 1 is the current saved record in this lesson. Concurrent writes are not shown.
- Durations are illustrative, as the lesson's takeaway says; no timing numbers appear.
- Reading the source is not wrong; repeated reads only matter when they create measurable load, as the concept notes.
- The empty `cache` slot is a forward hint only. Nothing is cached, checked or returned from it in this lesson.
- Authorization, key scope and expiry are not shown.

## Native 350 acceptance

These are requirements for the future render, not completed validation.

1. Decode actual frames (avoid relying only on a contact sheet) at 1080 and at 350 px wide around 1.8, 2.8, 5.0, 6.8, 7.5, 8.4, 9.3, 9.9, 12.0, 13.6, 14.3, 14.9, 15.5, 18.0, 20.2, 21.2, 21.9, 22.5, 23.3, 23.7, 24.8, 25.5, 26.5, 27.6, 32.0 and 36.8 s. At 350 px, `application`, all app rows, appState, `read`, `record`, `database`, `source of record`, all three table rows, the counter, the chips and `cache` must be readable.
2. Order: the record chip leaves only after row 1 turns ok; app fields fill only after it lands.
3. Repetition: the second read shows the same cursor steps and the counter reaches `2`; the database does the work both times.
4. Source of record: the app's revision always matches the database row (`rev 1`).
5. Scope: the cache slot receives no chip, holds no copy and is never checked.
6. Clearance: chips clear the opposite lane label; the cursor stays inside the table; nothing enters the title band; no chip remains during a hold.
7. Silent reading: with sound off and words ignored, a viewer sees empty fields at the top; something goes down; a highlight steps through rows in the bottom table and stops on one; something comes up and the fields fill; the fields clear, and the same thing happens again while a number goes from 1 to 2; an empty dashed box appears.
8. Audio: the dry run lists four `work` G4 ticks (two per read), two quiet `hit` G5, two `deliver` C5, and no chime. Full-decode the encode, confirm an audio stream, peak below −0.5 dBFS and moov before mdat. Record whether audio was heard or only analysed.
9. After encoding run `python3 scripts/check_media.py --concept cache-aside`; a new encode needs renewed comparison review bound to its SHA-256.

## Production boundary

Only this anonymous plan is written. No render, scene source, public media, site, shared skill, Git commit or deployment. Later implementation uses the repository-pinned Puppeteer and a cut-local engine copy, with any drawing extension local to the cut.

