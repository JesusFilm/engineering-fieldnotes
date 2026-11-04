# Lesson 02 — Choose the memory scope (motion-v2 cut 02)

**Mechanism.** Thread state belongs to one conversation. A shared store holds records that any conversation can read, addressed by namespace and key. A new thread reads the scope it needs and leaves another thread's state alone. Scope and durability are separate choices: after a process restart, what survives depends on the backend, whatever the scope.

**Scope.** Lesson 02 only (`video/memory-architecture/sequence/lessons.json`, item 2). Excluded: retrieval into a model's input (lesson 01), write policy, revision checks, correction, permissions, retention, and search. The records are illustrative and come from the concept's billing example.

## Plan decisions (neutral A/B)

| Decision | Taken from | Reason |
|---|---|---|
| Thread state in a left column, shared store on the right, both on screen at once | B | Puts the two scopes side by side without selector switching |
| Same key under two namespaces (`billing · test_cmd` = `npm test`, `catalog · test_cmd` = `pytest`) | A | Shows concretely what namespaces and keys do |
| Thread A keeps a `guess` row; new thread B has its own step and does not read A (dashed link, × and `not read`) | B | Gives "unrelated history" a concrete value |
| Thread B reads `billing · test_cmd` only, never `catalog` | A | The relevant scope is selected explicitly |
| Restart test as a 2 × 2 grid (scope columns × backend rows) | A's four fixtures, laid out as a grid | Each scope has one lost and one kept outcome, so loss lines up with the backend row and never with a scope column |
| The scope area dims and stays visible during the restart test | combined | Keeps the records' origin in view while the eye moves to the test |
| Short final label `scope ≠ durability` | A | A takeaway label, not a sentence |
| Plan A's selector reinspection and Plan B's sqlite/postgres names | dropped | Both columns stay visible, and generic `in-memory` / `database` labels avoid product claims |

## Stage (1080 × 1920)

Title `Memory` / `CHOOSE THE MEMORY SCOPE` (subtitle 40px). Column headers `thread state` (x 320) and `shared store` (x 790), 46px, at y 470.

- **Thread cards** (460 × 220): `thread A` at y 610 with `step 2 of 4` and `guess flaky e2e?`; `thread B · new` at y 940 with `step 1 of 3` and a `test_cmd` slot.
- **Shared panel** (400 × 360) at y 680, titled `namespace · key`, holding two records.
- **Links:** a dashed `not read` link between the thread cards; a read wire from thread B to the shared panel, visible only while reading.
- **Restart test** (y 1150–1660): title, column headers `one thread` / `shared`, row labels `backend: in-memory` / `backend: database`, and four cells. Each cell shows a title (`thread A` or `billing`), a status word, and a value.
- **Final label** `scope ≠ durability` (54px) at y 1735.

Smallest text is 36px. Colors: blue for shared records, amber for the read action and the restart, red for `lost`, green for `kept`.

## Beats (playback seconds, speed 1, 46.8 s)

| Time | What moves | State change | Sound |
|---|---|---|---|
| 0.4–2.6 | `thread state` header, thread A card, its two rows | A holds step and guess | ack C5, C6, C5 (thread family C) |
| 3.6 | `step 2 of 4` row lights | saved progress | ack C6 |
| 4.6–7.5 | **hold** | — | — |
| 7.5–9.2 | shared store appears; billing then catalog records | two records with the same key | ack G4, G5, G4 (store family G) |
| 10.6 / 11.8 | billing row lights, then catalog row | namespaces keep them apart | ack G5, ack G4 |
| 12.8–15.0 | **hold** | — | — |
| 15.0–16.5 | thread B · new appears with `step 1 of 3` and an empty `test_cmd` slot | own fresh progress | ack C6, C5, C5 |
| 17.8–18.7 | amber dot from B to the shared store; billing row lights | read billing · test_cmd | send E6 → arrive G5 |
| 19.4–20.3 | blue dot back; B's slot fills with `npm test` | B has the shared value; catalog untouched | send G6 → arrive C5 |
| 21.8–22.6 | dashed link B–A appears; × ripple; `not read` | A's step and guess stay out of B | ack C4, miss (quiet) |
| 23.5–26.5 | **hold** | — | — |
| 26.5 | scope area dims to 35% | focus moves down | — |
| 27.2–29.4 | `restart test`, columns, `in-memory` row, `database` row | four setups with identical records | ack E5; ack C5 + G5 per row |
| 29.6–31.8 | **hold** | — | — |
| 31.8–32.7 | `process restart`; amber sweep; cells flicker | — | thump E3 (loudest) |
| 33.2 | in-memory cells show `—` and `lost` (red) | lost in both scopes | poof C4 (left), poof G4 (right) |
| 34.4 | database cells show `kept` (green), values intact | kept in both scopes | arrive C5, arrive G5 |
| 34.8–37.0 | **hold** | — | — |
| 37.0 / 38.6 | `one thread` column, then `shared` column, pulse | each column has one lost and one kept | ack C5, ack G5 |
| 40.2 | row labels turn red / green; `scope ≠ durability` appears | the outcome follows the backend row | chime E5 |
| 40.6–45.2 | **final hold** | — | — |
| 45.2–46.2 | stage fades; title stays | finite ending | — |

## Reproduction (from the repository root)

```
node video/memory-architecture/motion-v2/02/engine/render.mjs video/memory-architecture/motion-v2/02/scene.js video/memory-architecture/motion-v2/02/video.mp4 --sheet video/memory-architecture/motion-v2/02/scratch/contact-sheet.png
ffmpeg -v error -y -ss 41.5 -i video/memory-architecture/motion-v2/02/video.mp4 -frames:v 1 -q:v 3 video/memory-architecture/motion-v2/02/poster.jpg
```

`render.mjs` resolves `puppeteer-core` 25.14.0 from the repository's pinned `node_modules`. `engine/flow-engine.js` is a copy of the lesson 01 local engine, which adds `panel`, `chip`, `statusAfterTitle`, and title/subtitle size options. The lesson 01 files were not edited.

