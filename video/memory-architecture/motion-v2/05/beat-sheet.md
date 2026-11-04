# Lesson 05 — Correct outdated memory (motion-v2 cut 05)

**Mechanism.** The authoritative command changes from `npm test` at r1 to `pnpm test` at r2. The owner marks the stored r1 record `superseded`, keeping its value and `AGENTS.md @ r1` explicit. The owner then stores a separate r2 record, linked from r1 by `replaced by`. A later session at checkout r2 reads the matching r2 record, gets it as a `candidate`, and checks it before accepting it.

**Scope.** Lesson 05 only (`video/memory-architecture/sequence/lessons.json`, item 5). Excluded: refreshing active sessions, retention and deletion of checkpoints or backups, the details of access control, write timing, and test execution. The statuses and the link are illustrative application policy, not automatic store behaviour.

## Plan decisions (neutral A/B)

| Decision | Taken from | Reason |
|---|---|---|
| Record-history inspector: one `memory · billing / test_cmd` frame with separate `r1` and `r2` cards | A | The old record never morphs into the new one; history stays readable |
| The source visibly changes from `r1 · npm test` to `r2 · pnpm test` at the start | B | "The authoritative command changed" becomes an observable event |
| r1 status `active` → `outdated` → `superseded` (grey, never red) | A, B | It was valid at r1, so nothing is marked false or deleted |
| `owner · billing` strip as the only writer, with actions `supersede r1` and `store r2 · link` | B, with A's application strip | Shows a maintained correction path without a permissions tutorial |
| `replaced by ↓` bracket joining the two cards | A, B | Records the replacement link |
| Later session: `checkout r2`, `got` → `pnpm test @ r2`, `candidate` → `checked` | A | Retrieval selects the matching version, then still validates it |
| Writes and the read travel as dots on a right-margin path | lesson 04 local practice | Nothing crosses row text |
| A's `Writer allowed` state and B's `outdated` badge chip | dropped | The status words carry them more simply |

## Stage (1080 × 1920)

- **Title:** `Memory` / `CORRECT OUTDATED MEMORY` (subtitle 40px).
- **Source panel** (900 × 160) at y 550: `billing / AGENTS.md`, a revision status, and `Test: …` at 46px.
- **Memory frame** (900 × 610, unfilled) at y 995, holding two record cards (790 × 200) at y 890 and y 1165. Each card has a revision title (48px), a status word, and `value` / `source` rows.
- **Bracket** at x 140 with the `replaced by ↓` label between the cards.
- **Owner strip** (900 × 130) at y 1400.
- **Later session panel** (900 × 220) at y 1608.

Smallest text is 36px. Colors: blue for source identity, amber for outdated and owner actions, grey for superseded, green for active and checked.

## Beats (playback seconds, speed 1, 40.6 s)

| Time | What moves | State change | Sound |
|---|---|---|---|
| 0.4 | source panel `r1`, `Test: npm test` | — | ack B4 (source family B) |
| 1.3 | memory frame and r1 card: `npm test`, `AGENTS.md @ r1`, `active` | stored record matches the source | ack G4 (memory family G) |
| 3.2 | source status `r2`; line retypes to `Test: pnpm test` | the authoritative command changed | arrive B4 |
| 4.8 | r1 status `outdated` (amber) | the stored note no longer matches | ack E4 (application family E) |
| 5.1–8.6 | **hold** | — | — |
| 8.6 | owner strip: `supersede r1` | — | ack E5 |
| 9.6–10.6 | write dot up the right margin to the r1 card | — | send E6 |
| 10.6 | r1 status `superseded` (grey); value and source unchanged | kept as history | store G4 |
| 11.6 | r1 source row `AGENTS.md @ r1` lights | revision kept explicit | ack G5 |
| 12.8–15.4 | **hold** | — | — |
| 15.4–16.0 | owner action `store r2 · link`; write dot to the r2 position | — | ack E5, send E6 |
| 17.0 | r2 card appears: `pnpm test`, `AGENTS.md @ r2`, `active` | a separate new record | store G5 |
| 18.0 | bracket and `replaced by ↓` appear | r1 → r2 link | ack G5 |
| 19.2 | r2 source row lights; source panel pulses | the new record applies to r2 | ack B4 |
| 20.4–23.0 | **hold** | — | — |
| 23.0 | owner dims; later session appears: `checkout r2`, `got —`, `reading` | — | ack C5 (session) |
| 24.0–25.0 | read dot to the r2 card; r2 value lights (r1 untouched) | matching version selected | send E6 → arrive G5 |
| 25.8 | `got pnpm test @ r2` (amber); status `candidate` | not yet accepted | ack C5 |
| 27.4 | `checkout` and `got` rows light together | validate against this session | ack E5 |
| 28.4 | status `checked`; value and border green | accepted for this task | deliver C5 |
| 28.8–31.4 | **hold** | — | — |
| 31.4 / 32.8 | r1 card and its `@ r1` source pulse; then the link and r2 pulse | history plus replacement | ack G4, ack G5 |
| 33.6–39.0 | **final hold** | — | — |
| 39.0–40.0 | stage fades; title stays | finite ending | — |

## Reproduction (from the repository root)

```
node video/memory-architecture/motion-v2/05/engine/render.mjs video/memory-architecture/motion-v2/05/scene.js video/memory-architecture/motion-v2/05/video.mp4 --sheet video/memory-architecture/motion-v2/05/scratch/contact-sheet.png
ffmpeg -v error -y -ss 36.0 -i video/memory-architecture/motion-v2/05/video.mp4 -frames:v 1 -q:v 3 video/memory-architecture/motion-v2/05/poster.jpg
```

`render.mjs` resolves `puppeteer-core` 25.14.0 from the repository's pinned `node_modules`. `engine/flow-engine.js` copies the cut 04 local engine and adds one general option in this copy only: panel `noFill`, so wires inside a frame stay visible. Other cuts' files were not edited.

