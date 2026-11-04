# Lesson 05 — Invalidate and refill — plan B

Independent plan for the motion-v2 cut of cache-aside lesson 05. Authored from the lesson entry in `video/cache-aside/sequence/lessons.json` (item 5) and the concept content in `content/concepts/cache-aside.json`. Earlier motion-v2 beat sheets were read only to vary the geometry. No other plan for this lesson, no production ledger, and no authoring source was consulted. This document names no authoring model.

## Scope

One mechanism: **with the source already at revision 2, deleting the stale cached key makes the next lookup miss; the application then reads revision 2 from the source, uses it, and stores it in the cache, so later lookups hit the current copy. This repairs the one stale key shown; it does not by itself protect against a failed delete or overlapping readers and writers.**

The viewer should feel three things. The cache entry goes through three visible states: `rev 1 · stale` (amber), then `absent` (dashed, empty), then `rev 2` (green). A numbered operation log fills in order, so the repair reads as a sequence of separate operations. At the end the cache and source agree again (`=`), and a dim, dashed `another writer?` note signals that this sequence alone is not the whole story.

Grounding: lesson beats ("the source is now at revision 2. Remove its stale cached key", "the next cache lookup misses. Read the source again", "the source returns revision 2. The application uses the new record", "store the new copy in the cache. Concurrent writes still need care"); intro ("invalidation removes the cached key. The next reader misses, reads revision 2 from the source, and stores it"); takeaway ("this repairs the illustrated stale key. Failed deletions and concurrent readers or writers need additional handling"); concept overview ("an update path can commit to the source and then delete the cached entry. These operations are separate"), walkthrough step 3 ("record a successful source commit before deleting the key. Surface deletion failures for recovery") and the concept example ("a recovery operation deletes the key; the following lookup fetches revision 2 and caches it"). Sources per the concept file, retrieved 2026-10-19: [Microsoft Learn — Cache-Aside pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/cache-aside) (update ordering) and [Nishtala et al. — Scaling Memcache at Facebook §3.2.1](https://www.usenix.org/system/files/conference/nsdi13/nsdi13-final170_update.pdf) (stale sets after invalidation).

Out of scope: this is the last lesson. The race itself (a paused reader refilling revision 1 after the delete) is named, not played; leases, versioned sets and expiry values are not shown. No deployment or agent action happens.

Grammar for this cut: **a single cache-entry card at the top left and the source card at the top right, with an `=`/`≠` mark between them; the application sits in the middle; a numbered operation log fills the lower half, one row per operation, each with its actor and result.** Lessons 01–04 showed stores and paths; here the order of separate operations is itself the object, which suits invalidation. Every element is a software object: a cache entry, a source record, a delete, a lookup, a read, a set and an operation log. No erasers, trash cans or brooms.

Target length ≈ 46 s at speed 1 (`meta.speed: 1`). Hold after the delete (the empty state must register) and on the final state.

## Engine notes

Use `box` for the cache entry (animated border dash via a dashed wire rectangle when absent), the source and the application; `label` for entry text, `=`/`≠`, log rows and results; `box` outlines for log rows; `s.wire` for app–cache and app–source links; chips for operations. The entry's absent state: text fades out, border becomes dashed, label `absent`. No new node type is expected. Use a cut-local engine copy with the repository-pinned Puppeteer.

## Stage and coordinates (1080 × 1920)

Palette follows `references/style.md`. Minimum on-screen text 40 px (≈ 13 px at 350 wide); names 48 px; monospace at 40 px ≈ 24 px per character. Content stays within x 60–1020 and y 480–1660.

| id | type | centre / bounds | text | notes |
|---|---|---|---|---|
| title | title band (540, 330) / (540, 405) | — | **Cache-aside** / INVALIDATE AND REFILL | |
| cLab | label | (290, 500), 44 px | `cache` | E5; the key `runbook:api` is the entry's first line (40 px mono, mid, at y 570) |
| entry | box | (290, 610), 400 × 150 (x 90–490, y 535–685) | 40 px mono: `rev 1 · step 4` + tag `stale` (accent) → `absent` (mid, dashed border) → `rev 2 · step 6` (ok) | the single cache entry |
| sLab | label | (790, 500), 44 px | `source` | G5 |
| src | box | (790, 610), 400 × 150 (x 590–990) | `rev 2 · step 6` (ok, constant) | already committed |
| mark | label | (540, 610), 48 px | `≠` (accent) → `·` (mid, while absent) → `=` (ok) | |
| app | box | (540, 830), 360 × 110 (x 360–720, y 775–885) | label `application` 44 px; sublabel 40 px mono `—` → `uses rev 2` (ok) | C5 |
| linkC | wire | app (430, 775) → entry bottom (290, 685) | — | |
| linkS | wire | app (650, 775) → src bottom (790, 685) | — | |
| logPanel | outline box | x 90–990, y 960–1560 | header `operations` 40 px mono, mid at (200, 1000) | |
| log0–log4 | row boxes 860 × 88 | centres y 1070, 1170, 1270, 1370, 1470 | 40 px mono, left text at x 130, result right-aligned at x 950 | rows appear when their operation starts |
| warn | label | (540, 1610), 40 px mono, mid, dashed outline | `another writer?` | beat 4 only |

Log rows (operation · result):

| row | text | result |
|---|---|---|
| log0 | `1 source commit  rev 2` | `done` (ok; already true at start) |
| log1 | `2 delete cache key` | `deleted` (ok) |
| log2 | `3 get cache` | `miss` (accent) |
| log3 | `4 read source` | `rev 2` (ok) |
| log4 | `5 set cache` | `stored` (ok) |

Chips: `delete` (≈ 144 px) and `get api` (≈ 168 px) and `set rev 2` (≈ 216 px) on linkC; `read api` (≈ 192 px) and `rev 2` (≈ 120 px) on linkS. Check the 24-character log rows (≈ 576 px) plus results fit in 860 px, and that chips on the diagonal links clear `≠` at x 540.

## Sound map

Actor pitches: application **C5**, cache **E5**, source **G5**. Each log row appears with a quiet `ack` C6.

| event | preset | notes |
|---|---|---|
| commit already done | `ack` G5 | |
| delete sent / key removed | `send` E6, then `poof` | |
| lookup misses | `miss` | soft; an absent key, not a failure |
| source read / rev 2 returns | `send` G6, `arrive` G5, `deliver` C5 | |
| set / entry stored | `send` E6, `store` E5 | brightest cue |
| `=` restored | `chime` E5 + G5, quiet | the only chime |
| `another writer?` | `ack` C4, very quiet | |

No music; no crash.

## Beat sheet (speed 1)

| time | what moves | state change | sound |
|---|---|---|---|
| **Beat 1 — The source is at revision 2; remove the stale key (0–12.0)** | | | |
| 0.0–1.0 | cards, app, links, empty log fade in | entry `rev 1 · step 4 · stale`; source `rev 2 · step 6`; mark `≠` | — |
| 1.8 | log0 appears with `done`; src pulses | the commit already happened | ack C6, ack G5 |
| 3.2 | entry `stale` tag pulses | | — |
| 5.0 | log1 appears | | ack C6 |
| 5.4–6.4 | chip `delete` app → entry | | send E6 |
| 6.4 | entry text fades; border dashed; `absent`; mark `·`; log1 result `deleted` | | poof |
| 6.4–12.0 | hold | no copy in the cache | |
| **Beat 2 — The next lookup misses; read the source again (12.0–19.0)** | | | |
| 12.0 | log2 appears | | ack C6 |
| 12.4–13.4 | chip `get api` app → entry | | — |
| 13.6 | entry `absent` pulses; log2 result `miss` | | miss |
| 14.4–15.0 | chip `none` back to app | | — |
| 15.6 | log3 appears | | ack C6 |
| 16.0–17.0 | chip `read api` app → src | | send G6 |
| 17.0 | src pulses | | arrive G5 |
| 17.0–19.0 | hold | | |
| **Beat 3 — The source returns revision 2; the application uses it (19.0–25.0)** | | | |
| 19.0–20.0 | chip `rev 2` src → app | | — |
| 20.0 | app sublabel `uses rev 2`; log3 result `rev 2` | | deliver C5 |
| 20.0–25.0 | hold; entry still `absent` | the app has it; the cache does not yet | |
| **Beat 4 — Store the new copy; concurrent writes still need care (25.0–46.0)** | | | |
| 25.0 | log4 appears | | ack C6 |
| 25.4–26.4 | chip `set rev 2` app → entry | | send E6 |
| 26.4 | entry solid border, `rev 2 · step 6` (ok); log4 `stored` | | store E5 |
| 27.2 | mark `=`; entry and src pulse together | | chime E5 + G5 (quiet) |
| 28.4 | log rows 1–5 pulse top to bottom | separate operations, in order | — |
| 30.0 | `another writer?` fades in, dim, dashed | this sequence alone does not stop a race | ack C4 (very quiet) |
| 30.6–44.4 | hold | final state | |
| 44.4–45.2 | `s.fade` to black, 0.8 s | finite ending | — |
| 46.0 | end | | |

## Accuracy limits

- The source commit happens before the delete, as the concept recommends; it is shown as already `done` because the lesson starts with the source at revision 2.
- A delete can fail; the concept says to surface deletion failures for recovery. The cut shows a successful delete only.
- A reader that fetched revision 1 before the delete can still write it back after the delete (stale set). The `another writer?` note names the risk; leases or versioned writes are the usual defences (Facebook memcache §3.2.1) and belong in the write-up.
- Expiry would also eventually remove a stale entry but is not a consistency guarantee.
- Keys, revisions and steps are illustrative, from the concept's example. Durations are illustrative; no timing numbers appear.

## Native 350 acceptance

These are requirements for the future render, not completed validation.

1. Decode actual frames (avoid relying only on a contact sheet) at 1080 and at 350 px wide around 1.9, 3.3, 5.1, 5.9, 6.5, 9.0, 12.1, 13.0, 13.7, 14.7, 15.7, 16.5, 17.1, 19.5, 20.1, 23.0, 25.1, 25.9, 26.5, 27.3, 28.5, 30.1, 36.0 and 44.8 s. At 350 px, the cache and source labels, the entry in all three states, `≠`/`·`/`=`, `application` and its sublabel, `operations`, all five log rows with results, the chips and `another writer?` must be readable.
2. Order: log rows appear in numeric order; each result appears only after its chip lands; the entry is `absent` from 6.4 to 26.4 s.
3. Miss is not failure: `miss` uses the accent colour; no red, × or crash appears.
4. Source unchanged: the source card reads `rev 2 · step 6` in every frame.
5. Refill: the entry shows `rev 2 · step 6` only after `set rev 2` lands; `=` appears only after that.
6. Scope: no race is played; `another writer?` stays a dim note; no expiry timer, lease or deployment appears.
7. Clearance: log text fits rows; chips clear the mark and labels; `another writer?` stays inside y 1660; nothing enters the title band; no chip remains during a hold.
8. Silent reading: with sound off and words ignored, a viewer sees a highlighted top-left card unlike the top-right one; a numbered list starts; the top-left card empties to a dashed outline; a probe finds it empty; something comes from the top-right card to the middle; something goes from the middle into the dashed card, which fills to match the top-right card; the list's five rows light in order; a faint dashed question appears at the bottom.
9. Audio: the dry run lists one `poof` (6.4 s), one soft `miss` (13.6 s), one `store` E5 at 26.4 s (brightest), one quiet `chime`, and no crash. Full-decode the encode, confirm an audio stream, peak below −0.5 dBFS and moov before mdat. Record whether audio was heard or only analysed.
10. After encoding run `python3 scripts/check_media.py --concept cache-aside`; a new encode needs renewed comparison review bound to its SHA-256.

## Production boundary

Only this anonymous plan is written. No render, scene source, public media, site, shared skill, Git commit or deployment. Later implementation uses the repository-pinned Puppeteer and a cut-local engine copy, with any drawing extension local to the cut.

