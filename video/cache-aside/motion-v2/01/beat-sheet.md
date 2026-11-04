# Lesson 01 beat sheet: Read the source

**Mechanism:** with no cache, each request for the runbook reads the database, the source of record. The database looks up the key, finds the saved record at revision 1, and returns a copy. Its own row stays in place. A second request repeats the same lookup, and the source-read counter reaches 2.

**Composition:** an application panel at the top with a runbook view (key known, value `rev ?`), a database panel below holding a small keyed table, a request lane on the left, and a copy lane on the right. A `source reads` counter sits under the table. The ending adds an empty dashed `reusable copy?` slot with no wires.

Times are playback seconds for `video.mp4` (speed 1, so scene time equals playback). Duration is 44.50 s, with a finite ending that fades the stage below the title from 43.0 s.

## Synthesis decisions (neutral, plan A / plan B)

| Choice | From | Reason |
|---|---|---|
| Three-row keyed table (`runbook:api`, `runbook:auth`, `runbook:search`) | B | "Looks up the key" needs other keys to choose between |
| Matching row lights directly while the other rows dim; no step-through cursor | A | A row-by-row cursor teaches a table scan |
| `find runbook:api` → `found runbook:api` line on the database header | Both (key shown at rest) | Shows the key being matched without a long key riding the moving marker |
| Source row stays visible and unchanged while a `rev 1` copy rises on the right lane | A | Returning data copies it; the source is not consumed |
| Counter ticks when a read *arrives* at the database | A | Counts source reads, not responses |
| `request 1` → `request 2` tag; view clears to `rev ?` for the new request | A ("Read again") reworded | The second read is a new request for the same runbook, not a retry |
| Ending: dashed, empty `reusable copy?` slot | B's empty slot + A's wording | Lesson text names a reusable copy; the slot is never checked, filled, or wired |
| Application pitch C, database pitch G | B (pitches), A (sparse cues) | Two actors, audibly distinct |
| Not used: B's `rollback step 4` field, `hit` sound for "found" | — | Extra density; `hit` belongs to the cache-hit lesson |
| Not used: A's footer sentence `Each read repeats work` | — | The counter at 2 and the repeated motion carry it without a caption |
| Text: 44 px minimum (≈14 px at 350 wide), keys 48 px, counter 54 px | A's legibility bar, slightly relaxed | Verified on encoded 350 px frames |

## Teaching beats

| # | Time (s) | What moves | State change | Sound |
|---|---|---|---|---|
| 1 | 0–7.9 | 0.3 application fades in with `runbook:api  rev ?` and `needs the record`. 1.6 database and three saved rows fade in. 2.8 `source reads: 0`. 3.8 the `runbook:api rev 1` row glows teal. 5.4 the view's `rev ?` lights amber. | Source already holds rev 1; the application lacks it | 0.8 ack C5 · 2.2 ack G4 · 3.8 store G4 · 5.4 ack C5 · hold 5.6–7.9 |
| 2 | 7.9–13.9 | 7.9 status `reading…`; `read runbook:api` chip travels the left lane (7.9–9.2). 9.2 arrival ripple, counter → 1 (amber bump), database outline amber. 9.8 `find runbook:api`; other rows dim. 10.5 matching row amber. 11.3 row teal, `found runbook:api`. | One source read; key matched in the table | 7.9 send C6 · 9.2 arrive G4 · 9.8, 10.5 work G4 · 11.3 ack G5 · hold 11.6–13.5 |
| 3 | 13.9–22.0 | 13.55 find line fades. 13.9 matched row flashes and a `rev 1` copy rises from just above it, up the right lane (13.9–15.8). The database returns to rest; its row still reads `rev 1`. 15.8 view becomes solid teal `rev 1`; 16.15 `received a copy`. 18.4 both `rev 1` values glow together. | The application holds a copy equal to the saved row | 13.9 send G5 · 15.8 deliver C5 · 16.15 store C5 · 18.4 ack C6 (quiet) · hold 18.9–22.0 |
| 4 | 22.0–34.3 | 22.0 tag → `request 2`; view back to dashed `rev ?`; `needs the record`. 24.0 same request travels; 25.3 counter → 2. 25.9 / 26.6 / 27.4 same lookup steps. 30.0 copy rises; 31.9 lands; 32.25 `received a copy`. | Same work repeated for the same unchanged record | 22.0 ack C5 · 24.0 send C6 · 25.3 arrive G4 · 25.9, 26.6 work G4 · 27.4 ack G5 · 30.0 send G5 · 31.9 deliver C5 · 32.25 store C5 · hold 32.5–34.3 |
| 5 | 34.3–44.5 | 34.3 counter grows and stays amber at `source reads: 2`; source row flashes amber. 36.3 dashed `reusable copy?` slot fades in (empty, unwired). Hold, then 43.0–44.0 the stage fades. | Repeated source work, with a question for the next lesson | 34.3 ack G5 · 36.3 ack C4 (quiet) · silent hold |

## Accuracy limits

Keys, revisions and times are illustrative. Real databases find keys through indexes. The direct highlight stands for "looks up the key" and does not depict an algorithm. `source reads` counts logical application reads, not disk operations. Revision 1 is the saved record in this example, and no concurrent writer is shown. Clearing the view for request 2 represents a new request. It does not mean an application must discard data. No cache is checked, filled, or returned from.

## Reproduce

From the repository root (uses the root `node_modules` pinned `puppeteer-core` 25.14.0):

```
node video/cache-aside/motion-v2/01/engine/render.mjs video/cache-aside/motion-v2/01/scene.js video/cache-aside/motion-v2/01/video.mp4 --sheet video/cache-aside/motion-v2/01/scratch/contact-sheet.png
```

Then, from `video/cache-aside/motion-v2/01`: `python3 scratch/verify.py .` (needs `scratch/cues.json` from the Node dry run), `python3 scratch/frames.py`, `python3 scratch/transit2.py`.

Local engine additions (`engine/flow-engine.js`, general and reported): `panel` node (heading, mono second line, right tag, dashed option), `rec` node (key/value record row with outline state and dashed option), `align` option on `label`, and a `size` option on `chip` packets.

## Lesson text sync

`lessons.json` item 1 assumes 28 s with beats at 0/7/14/21. For this cut, use duration 44.5 with beats at **0 / 7.9 / 13.9 / 22.0**. The fourth text beat ("Every read can repeat that work. A cache can keep a reusable copy.") spans beats 4 and 5. This folder does not edit that file.
