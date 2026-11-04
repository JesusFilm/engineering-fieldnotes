# Lesson 04 — Check applicability (motion-v2 cut 04)

**Mechanism.** Retrieval returns a relevant saved note (`npm test`, source `AGENTS.md @ r1`). The application compares the note's revision with the checkout (`r2`), withholds the note for this task, reads the current instructions, and supplies `pnpm test` with source `AGENTS.md @ r2`. The saved note is not changed.

**Scope.** Lesson 04 only (`video/memory-architecture/sequence/lessons.json`, item 4). Excluded: updating or superseding the saved record, refreshing active sessions, write policy, permissions, and test execution. Values come from the concept's billing example. The revision check is a deliberately implemented application step, not a store feature.

## Plan decisions (neutral A/B)

| Decision | Taken from | Reason |
|---|---|---|
| Two aligned panes, `saved note` and `checkout`, with large `r1` / `r2` badges and `≠` between them | A | Puts the two revisions side by side in one place |
| The checkout command reads `not read` until the application reads the source | A | The new command is learned by an explicit read, not known in advance |
| `candidate` → `withheld` footer; the note's text stays readable and unchanged | A, B | A mismatch means re-read, not "proven wrong"; nothing is rewritten |
| Application status line: `compare revisions` → `re-read source` → `use current source` | A | One owner for the decision |
| Input `preparing` → `supplied` with `test_cmd` and `source AGENTS.md @ r2` | A, B | The value and its revision reach the call together |
| Small `model` box that lights when the input is supplied | B | "The model gets applicable evidence" |
| B's separate store and check boxes, the reused tag row, and the moving chips through text | dropped | The panes carry retrieval and comparison without overloading one row |

## Stage (1080 × 1920)

- **Title:** `Memory` / `CHECK APPLICABILITY` (subtitle 40px).
- **Task strip** at y 532.
- **Panes** (420 × 560) centered at y 890, at x 300 and x 780. Each has a `source AGENTS.md` row, a revision badge chip (60px text) at y 900, a `test_cmd` row, and a footer label at y 1125. `≠` (72px) sits at (540, 900).
- **Application check panel** at y 1272.
- **`next input` panel** at y 1505, with key/value rows.
- **`model` box** at y 1722.
- **Copy path:** a dot travels down the right margin (x 1030), outside every panel, from the checkout's command to the input's `test_cmd` field.

Smallest text is 36px. Colors: blue for current-source identity, amber for application decisions and the withheld note, green for supplied.

## Beats (playback seconds, speed 1, 45.0 s)

| Time | What moves | State change | Sound |
|---|---|---|---|
| 0.4 | task strip | — | ack E5 (application family E) |
| 1.2 | checkout pane: `r2`, command `not read`, footer `source not read` | the checkout is newer; its file is unread | ack B4 (repository family B) |
| 2.0 | input (`preparing`, empty) and model | — | ack C5 |
| 3.0–3.6 | retrieval; saved note pane appears: `AGENTS.md`, `r1`, `npm test`, `candidate` | a relevant note, not yet validated | send E6 → arrive G4 (memory family G) |
| 4.6 | note's command lights | — | ack G5 |
| 5.6–9.0 | **hold** | — | — |
| 9.0 | application check: `compare revisions` | — | ack E5 |
| 10.2 / 11.2 | `r1` badge, then `r2` badge, turn amber | — | ack G4, ack B4 |
| 12.2 | `≠` pops in | mismatch | ack E4 |
| 13.2 | note footer `withheld`; note border amber; its command dims (text unchanged) | not used for this task | thump E3 (restrained; loudest) |
| 14.2 | status `re-read source` | — | ack E5 |
| 14.2–18.0 | **hold**; the input is still empty | — | — |
| 18.0 | checkout source row lights; footer `reading…` | the application reads `AGENTS.md` | send E6 |
| 19.0–19.6 | checkout command types in: `pnpm test` | — | arrive B4 |
| 20.4 | footer `current source`; checkout and `r2` turn blue | — | ack B5 |
| 21.6 / 22.6 | old command lights, then new command | the change, visible only after the read | ack G4, ack B5 |
| 24.0 | status `use current source` | — | ack E5 |
| 24.0–28.0 | **hold** | — | — |
| 28.0–30.4 | checkout command lights; blue dot travels the right margin into the input | copied; the checkout value stays | send E6 |
| 30.6 | input `test_cmd pnpm test` | still `preparing` | arrive E5 |
| 31.4 | input `source AGENTS.md @ r2` | provenance included | ack B4 |
| 33.6–34.1 | input `supplied` (green); dot to the model; model green | the model gets the r2 evidence | send C6 → deliver C5 |
| 34.6 | application panel dims | — | — |
| 36.6 | input source row and checkout `r2` light together | supplied revision matches the checkout | ack B4 |
| 38.0 | saved note pulses; `withheld` pops | the r1 note is unchanged and unused | ack G4 |
| 38.4–43.4 | **final hold** | — | — |
| 43.4–44.4 | stage fades; title stays | finite ending | — |

## Reproduction (from the repository root)

```
node video/memory-architecture/motion-v2/04/engine/render.mjs video/memory-architecture/motion-v2/04/scene.js video/memory-architecture/motion-v2/04/video.mp4 --sheet video/memory-architecture/motion-v2/04/scratch/contact-sheet.png
ffmpeg -v error -y -ss 39.5 -i video/memory-architecture/motion-v2/04/video.mp4 -frames:v 1 -q:v 3 video/memory-architecture/motion-v2/04/poster.jpg
```

`render.mjs` resolves `puppeteer-core` 25.14.0 from the repository's pinned `node_modules`. `engine/flow-engine.js` is an unmodified copy of the cut 03 local engine (`panel`, `chip` with marks, key/value `valueX`, row tags, title options). Other cuts' files were not edited.

