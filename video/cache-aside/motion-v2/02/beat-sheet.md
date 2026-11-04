# Lesson 02 beat sheet: A cache hit

**Mechanism:** the application checks the cache before the source. The requested key `runbook:api` is present, so this lookup is a hit. The cache returns its copy of revision 1, and the database is not read. The hit shows that the key was found. It does not show that the copy is current.

**Composition:** an application panel at the top with two paths below it. The left path is labelled `1 check` and leads to the cache; the right path is labelled `2 source` and leads to the database. The two stores sit side by side as small keyed tables. Only the left path ever carries anything. The database stays grey, its revisions show as `rev ?` (this lookup never observes them), and its `source reads` counter stays at 0. This differs from lesson 01, where the application sat directly above the database and the read was repeated.

Playback times for `video.mp4` (speed 1). Duration is 35.00 s, with a finite ending that fades the stage from 33.0 s.

## Synthesis decisions (neutral, plan A / plan B)

| Choice | From | Reason |
|---|---|---|
| Cache and database side by side, each reached by its own path from the application | B | The untouched second path shows "no database read" as geometry |
| `1 check` / `2 source` path labels | B | Shows the cache-aside order; step 2 never runs on this hit |
| Matching key lights; the other cached entry dims | A (exact-key match) + B (keyed table) | "The requested key is present" is shown as a match among keys |
| `HIT · key found` readout under the cache | A | Defines hit as key presence, with no checkmark or "fresh" badge |
| Copy returns while the cached row stays in place | Both | Returning a cached value does not consume it |
| `source reads: 0` counter, emphasized once after delivery | A (count for this lookup) + B (counter beside database) | Shows the absent source read without a crossed-out database |
| Database revisions shown as `rev ?` | B (`…`), reworded | The hit does not observe the source revision, so the cut makes no freshness claim |
| Ending: `current?` tag beside the received copy, value turns amber, database `runbook:api` row flashes once | B | Asks the lesson's question without introducing revision 2 |
| Pitches: application C, cache E, database G (one quiet intro cue only) | B (pitches), A (restrained hit, no fanfare) | Database silence is audible |
| Not used: A's `Freshness: not checked` footer sentence | — | `current?` carries it more sparsely |
| Not used: B's dashed comparison line with `?` between the stores | — | It suggests a relationship or sync channel that this lesson does not define |
| Not used: B's `from cache` app field | — | The path the copy travels already shows its origin |
| Two-line record rows in both stores (key above, value below), 44 px | Local layout choice | Side-by-side tables are narrow; this keeps 44 px text (≈14 px at 350) |

## Teaching beats

| # | Time (s) | What moves | State change | Sound |
|---|---|---|---|---|
| 1 | 0–8.4 | 0.3 application (`runbook:api  rev ?`, `needs the record`). 1.6 cache with `runbook:api rev 1` and `runbook:ops rev 4`. 2.8 grey database with `rev ?` rows and `source reads: 0`. 4.4 cached `runbook:api` glows teal. 5.8 paths labelled; `1 check` lights amber and the cache path brightens. | A copy already exists; the application checks the cache first | 0.8 ack C5 · 2.1 ack E5 · 3.3 ack G5 (quiet, the only database cue) · 4.4 store E5 · 5.8 ack C6 · hold 6.2–8.4 |
| 2 | 8.4–15.5 | 8.4 `checking cache`; `runbook:api` chip down the cache path (8.4–9.7). 9.7 arrival ripple, cache outline amber. 10.3 `runbook:ops` dims; `runbook:api` key and outline amber. 11.1 row teal, `HIT · key found` pops in. | Key present: a hit | 8.4 send C6 · 9.7 arrive E5 · 10.3 work E5 · 11.1 hit E5 · hold 11.4–15.5 (database path unchanged) |
| 3 | 15.5–24.0 | 15.5 cached row flashes; `rev 1` copy rises up the cache path (15.5–16.8). 16.1 cache returns to rest. 16.8 application view solid teal `rev 1`; 17.15 `received a copy`. 17.6 the cached row settles, still `rev 1`. 19.0 `source reads: 0` grows and turns teal; `1 check` returns to grey. | Copy delivered; the source path never ran | 15.5 send E6 · 16.8 deliver C5 · 17.15 store C5 · 19.0 ack C5 (quiet) · hold 19.5–24.0 |
| 4 | 24.0–35.0 | 24.0 `current?` pops in beside the received copy; its `rev 1` turns amber; the database `runbook:api rev ?` row flashes amber once. Hold, then 33.0–34.0 fade. | Presence shown; freshness unchecked | 24.0 ack C4 · silent hold |

## Accuracy limits

The cache entry already exists, and how it was filled is outside this lesson. A hit means the key was found. `rev ?` in the database means this lookup did not observe the source revision. It does not mean the database lacks one, and it makes no claim about whether the copy matches. `source reads: 0` counts reads caused by this lookup. Keys, revisions and times are illustrative. Authorization, key scope and expiry are not shown.

## Reproduce

From the repository root (pinned `puppeteer-core` 25.14.0 in root `node_modules`):

```
node video/cache-aside/motion-v2/02/engine/render.mjs video/cache-aside/motion-v2/02/scene.js video/cache-aside/motion-v2/02/video.mp4 --sheet video/cache-aside/motion-v2/02/scratch/contact-sheet.png
```

Checks run from `video/cache-aside/motion-v2/02`. First write the cue list with `node -e "const F=require('./engine/flow-engine.js'); require('./scene.js'); require('fs').writeFileSync('scratch/cues.json', JSON.stringify(F.createScene(F.lastScene).audioCues()))"`, then run `python3 scratch/verify.py .` and `python3 scratch/frames.py enc <times> 9`.

The local engine is a copy of lesson 01's local engine (`panel` and `rec` nodes, `label` align, chip `size`), plus a `stack` option on `rec` that puts the key and value on two lines. Lesson 01's engine was not edited.

## Lesson text sync

`lessons.json` item 2 assumes 28 s with beats at 0/7/14/21. For this cut, use duration 35 with beats at **0 / 8.4 / 15.5 / 24.0**. This folder does not edit that file.
