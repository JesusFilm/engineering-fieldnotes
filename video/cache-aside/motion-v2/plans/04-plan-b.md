# Lesson 04 — A stale copy — plan B

Independent plan for the motion-v2 cut of cache-aside lesson 04. Authored from the lesson entry in `video/cache-aside/sequence/lessons.json` (item 4) and the concept content in `content/concepts/cache-aside.json`. Earlier motion-v2 beat sheets were read only to vary the geometry. No other plan for this lesson, no production ledger, and no authoring source was consulted. This document names no authoring model.

## Scope

One mechanism: **a write to the database and a change to the cache are separate operations; when an editor saves revision 2 to the database and nothing touches the cached key, the cache still holds revision 1, so the next lookup is a successful hit that returns the old runbook.**

The viewer should feel three things. Both stores show the same `rev 1 · rollback step 4` at the start. The editor's save changes only the database, which gains a `rev 2 · rollback step 6` row on top of its history, while the cache's row does not move or make a sound. The next lookup lights `HIT` in green and returns `step 4`, and then a side-by-side check shows the application holds `step 4` while the source says `step 6`. Success and staleness appear together.

Grounding: lesson beats ("both stores begin at revision 1. The copies agree for now", "an editor saves revision 2. The cached copy is unchanged", "the next lookup checks the cache. It still finds revision 1", "the old copy returns successfully. A cache hit does not mean fresh"); intro ("an editor updates the database, but the cached key is not deleted. A later hit can still return the old runbook"); takeaway ("source writes and cache changes are separate operations. A successful hit can still return stale data"); concept example ("the cached guide is revision 1. An editor publishes revision 2 with a changed rollback step, but misses invalidation. The tool returns revision 1 again"). Sources per the concept file, retrieved 2026-10-19: [Microsoft Learn — Cache-Aside pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/cache-aside) and [AWS ElastiCache — Caching strategies (stale entries)](https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/Strategies.html).

Out of scope (later lesson): deleting the cached key, the following miss and the refill (05); races between readers and writers. No expiry timer runs, no invalidation is attempted, and nothing in the cut implies a fix. Authorization and key scope are not shown.

Grammar for this cut: **the editor at the top right and the application at the top left; below them the cache (left) and the database (right) drawn as revision histories: each store lists its rows newest on top, with the current row outlined. The editor is wired only to the database; the application is wired to both, cache first. A comparison strip at the bottom puts "returned" and "source" side by side.** Lessons 02–03 used single-row stores; here the database's growing history next to the cache's unchanged one carries the lesson. Every element is a software object: an editor's write, a cache entry, source revisions, a lookup and a returned record. No spoiled-food, expired-milk or newspaper metaphors.

Target length ≈ 44 s at speed 1 (`meta.speed: 1`). Hold after the write (the unchanged cache must be noticed) and on the final comparison.

## Engine notes

Use `box` for the application and editor, `store` for the cache (2 rows: current, then empty) and the database (3 rows: newest on top), `label` for headers, `HIT`, `stale`, revision tags and the comparison strip, `s.wire` for links (editor → database; application → cache; application → database dim and unused), and chips for the save, lookup and returned copy. New database rows push down by tweening row text (row0 ← new, row1 ← old). No new node type is expected. Use a cut-local engine copy with the repository-pinned Puppeteer.

## Stage and coordinates (1080 × 1920)

Palette follows `references/style.md`. Minimum on-screen text 40 px (≈ 13 px at 350 wide); names 48 px; monospace at 40 px ≈ 24 px per character. Content stays within x 60–1020 and y 480–1640.

| id | type | centre / bounds | text | notes |
|---|---|---|---|---|
| title | title band (540, 330) / (540, 405) | — | **Cache-aside** / A STALE COPY | |
| app | box | (290, 560), 400 × 150 (x 90–490, y 485–635) | label `application` 44 px; sublabel 40 px mono `rollback …` → `rollback step 4` | C5 |
| editor | box | (790, 560), 400 × 150 (x 590–990) | label `editor` 44 px; sublabel 40 px mono `idle` → `saves rev 2` → `saved` | A5 |
| linkAC | wire | app (290, 635) → cache top (290, 800) | — | lookup path |
| linkAD | wire | app right-bottom (450, 635) → (650, 760) → db top (790, 800) | dim | not used in this cut |
| linkED | wire | editor (790, 635) → db top (790, 800) | — | the write path |
| cLab | label | (290, 840), 48 px | `cache` | E5 |
| cache | store, `rows: 2`, w 420 | (290, 960), x 80–500, y ≈ 890–1030; rows ≈ 925, 995 | row0 `rev 1 · step 4` (current, outlined) · row1 empty | key `runbook:api` shown as sublabel 40 px mono at (290, 1070) |
| dLab | label | (790, 840), 48 px | `database` | G5 |
| db | store, `rows: 3`, w 420 | (790, 990), x 580–1000, y ≈ 890–1090; rows ≈ 925, 990, 1055 | row0 `rev 1 · step 4` → row0 `rev 2 · step 6` (current), row1 `rev 1 · step 4` (dim) | key sublabel `runbook:api` at (790, 1130) |
| agree | label | (540, 925), 40 px mono, ok | `=` | between the two current rows; becomes `≠` (accent) after the write |
| hitTag | label | (290, 1180), 44 px mono, ok | `HIT` | |
| cmpPanel | outline box | x 90–990, y 1280–1620 | label `check` 40 px mono, mid, at (540, 1320) | appears in beat 4 |
| cmpL | labels | (290, 1400) / (290, 1470) | `returned` · `rev 1 · step 4` | |
| cmpR | labels | (790, 1400) / (790, 1470) | `source` · `rev 2 · step 6` | |
| staleTag | label | (540, 1560), 44 px mono, accent | `HIT · stale` | |

Chips: `save rev 2` (≈ 240 px) on linkED; `get api` (≈ 168 px) down linkAC; `rev 1 · step 4` (≈ 336 px) up linkAC. Check that `=`/`≠` at x 540 clears both stores (gap x 500–580) and that the returned chip clears `cache` (it starts at y 890 and ends at y 635).

## Sound map

Actor pitches: application **C5**, cache **E5**, database **G5**, editor **A5**. Pan: application/cache left (≈ −0.5), editor/database right (≈ +0.5).

| event | preset | notes |
|---|---|---|
| actors introduced | `ack` C5, E5, G5, A5 | |
| copies agree | `ack` E5 + G5 together | consonant |
| save sent | `send` A6 | |
| database stores rev 2 | `store` G5 | |
| cache unchanged | no sound | silence on E5 is deliberate |
| `=` becomes `≠` | `ack` E5 + G#5 together, quiet | a slightly clashing interval |
| lookup sent | `send` C6 | |
| key found | `hit` E5 | bright, the "success" |
| copy returns | `deliver` C5 | |
| comparison shown | `miss` | soft, falling: the stale reveal |

No music; no crash or alarm (nothing failed).

## Beat sheet (speed 1)

| time | what moves | state change | sound |
|---|---|---|---|
| **Beat 1 — Both stores begin at revision 1 (0–8.0)** | | | |
| 0.0–1.0 | app, editor, links, cache, database fade in | both current rows `rev 1 · step 4`; app `rollback …`; editor `idle` | — |
| 1.8 | cache row0 and database row0 pulse together; `=` appears | the copies agree | ack E5 + G5 |
| 1.8–8.0 | hold | | |
| **Beat 2 — An editor saves revision 2; the cached copy is unchanged (8.0–19.0)** | | | |
| 8.0 | editor `saves rev 2` | | — |
| 8.4–9.6 | chip `save rev 2` down linkED | | send A6 |
| 9.6 | ripple at database; row0 → `rev 2 · step 6` (outlined), old row moves to row1 dim | | store G5 |
| 10.2 | editor `saved` | | — |
| 11.0 | cache row0 pulses dim: still `rev 1 · step 4` | nothing reached the cache | — |
| 11.8 | `=` → `≠` (accent) | the copies now differ | ack E5 + G#5 (quiet) |
| 11.8–19.0 | hold; linkAC and the cache stay still | | |
| **Beat 3 — The next lookup checks the cache and still finds revision 1 (19.0–26.0)** | | | |
| 19.0–20.2 | chip `get api` down linkAC | | send C6 |
| 20.2 | ripple at cache; row0 outlined ok | | arrive E5 |
| 20.8 | `HIT` pops | | hit E5 |
| 20.8–26.0 | hold; linkAD stays dim (no source read) | | |
| **Beat 4 — The old copy returns successfully; a hit does not mean fresh (26.0–44.0)** | | | |
| 26.0–27.2 | chip `rev 1 · step 4` up linkAC | | — |
| 27.2 | ripple at app; sublabel `rollback step 4` (ok-coloured: the call succeeded) | | deliver C5 |
| 28.6 | cmpPanel fades in; `returned rev 1 · step 4` and `source rev 2 · step 6` appear in turn | | — |
| 29.6 | `step 4` and `step 6` pulse in turn; staleTag `HIT · stale` | success and staleness together | miss (soft) |
| 30.4 | `HIT` and `≠` pulse together | | — |
| 31.0–42.4 | hold | final state | |
| 42.4–43.2 | `s.fade` to black, 0.8 s | finite ending | — |
| 44.0 | end | | |

## Accuracy limits

- The cache is not updated because nothing deletes or rewrites its key; the cut does not show the delete that would have fixed it (lesson 05).
- Revisions, `step 4` / `step 6` and the key are illustrative, from the concept's example.
- The `check` panel is a teaching view: the application does not compare with the source on a hit. The concept recommends an authoritative revision check before acting on operational instructions; that is design guidance for the write-up, not something cache-aside does by itself.
- Expiry would eventually remove the entry, but expiry is not a consistency guarantee (concept pitfall); not shown.
- No deployment or agent action happens; consequences belong in the write-up.
- Durations are illustrative; no timing numbers appear.

## Native 350 acceptance

These are requirements for the future render, not completed validation.

1. Decode actual frames (avoid relying only on a contact sheet) at 1080 and at 350 px wide around 1.9, 5.0, 8.2, 9.0, 9.7, 10.3, 11.1, 11.9, 15.0, 19.6, 20.3, 20.9, 24.0, 26.6, 27.3, 28.8, 29.7, 30.5, 36.0 and 42.8 s. At 350 px, `application`, `editor`, both sublabels, `cache`, `database`, all store rows (including the dim old database row), `=`/`≠`, `HIT`, the chips, the check panel rows and `HIT · stale` must be readable.
2. Separate operations: the save chip travels only editor → database; the cache row text never changes in any frame; no chip or line touches the cache during beat 2.
3. Database history: after 9.6 s the database's current row is `rev 2 · step 6` and the old `rev 1` row remains visible below it, dimmed.
4. Successful hit: `HIT` is green; no ×, red or failure state appears; linkAD never carries anything.
5. Stale shown: the returned value reads `step 4` while the source reads `step 6` in the same final frame.
6. Scope: no delete, invalidation, miss, refill or expiry appears.
7. Clearance: `=`/`≠` sits in the gap between stores; chips clear labels; the check panel rows do not overlap; nothing enters the title band; no chip remains during a hold.
8. Silent reading: with sound off and words ignored, a viewer sees two matching rows with `=` between them; a chip from the right top box changes only the right store, which gains a new top row, and `=` becomes `≠`; a chip from the left top box goes to the left store, a green word appears, and the old value comes back up; a bottom panel shows two different values side by side.
9. Audio: the dry run lists one `store` G5 at 9.6 s, no E5 cue during 8.0–19.0 s, one `hit` E5 at 20.8 s, one soft `miss` at 29.6 s, and no crash or chime. Full-decode the encode, confirm an audio stream, peak below −0.5 dBFS and moov before mdat. Record whether audio was heard or only analysed.
10. After encoding run `python3 scripts/check_media.py --concept cache-aside`; a new encode needs renewed comparison review bound to its SHA-256.

## Production boundary

Only this anonymous plan is written. No render, scene source, public media, site, shared skill, Git commit or deployment. Later implementation uses the repository-pinned Puppeteer and a cut-local engine copy, with any drawing extension local to the cut.

