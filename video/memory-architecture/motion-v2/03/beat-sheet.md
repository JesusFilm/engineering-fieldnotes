# Lesson 03 — Save a useful record (motion-v2 cut 03)

**Mechanism.** The application applies a write policy to each candidate a session found. The test command passes `useful`, `supported`, and `in scope`, gains its source and revision, and is saved once the write is acknowledged. A guess stops at `supported` and stays in the thread. A personal preference stops at `in scope`. Of three candidates, one is saved.

**Scope.** Lesson 03 only (`video/memory-architecture/sequence/lessons.json`, item 3). Excluded: revision checks on read, correction to r2, permission enforcement, retention and withdrawal, durability, and test execution. Values are illustrative, from the concept's billing example. The source is assumed reviewed.

## Plan decisions (neutral A/B)

| Decision | Taken from | Reason |
|---|---|---|
| Reviewed source excerpt (`billing / AGENTS.md`, `r1`, `Test: npm test`) stays at the top throughout | A | Makes "supported" visible: the record's source and revision come from it |
| Session list with three candidates and `candidates 3 · saved 1` | B | "More stored notes are not always better" becomes a count |
| Three policy checks: `useful`, `supported`, `in scope` | A, with B's per-candidate evaluation | Each rejected candidate fails a different check |
| Order follows the lesson text: propose → check command and guess → save with revision → preference | A | B's reordering was not needed |
| Proposed record with five fields (repo, key, value, source, revision); source and revision fill from the excerpt | A | Provenance travels with the value |
| `saving…` before `saved`; green only after the acknowledgement | A | The write is a separate, acknowledged step |
| The guess stays visible, tagged `thread only`; the preference is tagged `not saved` | A, B | Rejection leaves the hypothesis in the thread; nothing is deleted |
| B's exit paths (left margin, right edge) and its owner/approval field | dropped | Tags and checks carry the decision in place, and approval ownership is outside this lesson |

## Stage (1080 × 1920)

- **Title:** `Memory` / `SAVE A USEFUL RECORD` (subtitle 40px).
- **Source panel** (900 × 150) at y 535.
- **Session panel** (900 × 262) at y 774: three key/value rows with status tags at the right.
- **Write policy panel** (900 × 170) at y 1020: the candidate's name as its status, plus three check chips (`useful`, `supported`, `in scope`) with persistent ○ / ✓ / ✕ marks.
- **Record panel** (900 × 410) at y 1350: five key/value rows.
- **Counter** at y 1625, 42px mono.

Smallest text is 36px. Colors: blue for source identity and provenance, amber for proposed and pending policy, green for passed and saved, red for failed checks, grey for thread-only.

## Beats (playback seconds, speed 1, 45.6 s)

| Time | What moves | State change | Sound |
|---|---|---|---|
| 0.4–1.4 | source excerpt appears; its line lights | reviewed source | ack G4, ack G5 (source/store family G) |
| 2.2–4.6 | session list fills: command, guess, preference | three candidates | arrive C5, ack C4 ×2 (session family C) |
| 5.4 | counter `candidates 3 · saved 0` | — | ack C5 |
| 6.4 | command row tagged `proposed`; proposed record appears with repo, key, and value, plus empty source and revision slots | proposed, not saved | ack C5 |
| 6.9–9.6 | **hold** | — | — |
| 9.6 | write policy appears; status `test_cmd` | — | ack E4 (application family E) |
| 10.6 | `useful` ✓ | — | ack E5 |
| 11.6–12.6 | source line lights → record `source AGENTS.md`; `supported` ✓ | support comes from the reviewed file | arrive G5, ack E5 |
| 13.6–14.2 | record repo and key light; `in scope` ✓ | billing / test_cmd | ack E5 |
| 15.0–16.8 | **hold** | — | — |
| 16.8–17.8 | checks reset; guess row lights; status `guess`; `useful` ✓ | — | ack C4, ack E5 |
| 18.8–19.4 | source line flashes grey (no match); `supported` ✕ | — | miss |
| 20.2 | guess tagged `thread only`; `in scope` never evaluated | the record is untouched | thump E4 (quiet) |
| 20.6–23.4 | **hold** | — | — |
| 23.4–23.7 | status `test_cmd`; all three ✓ again | allowed | ack E5 |
| 24.6–25.0 | source `r1` lights → record `revision r1` | value, source, and revision together | arrive G4 |
| 25.6–29.6 | **hold** on the complete record before saving | — | — |
| 29.6 | status `saving…` | write requested | send E6 |
| 30.6 | `saved record` / `saved` (green); command tagged `saved`; counter `saved 1` | write acknowledged | store G5 |
| 31.0–33.6 | **hold** | — | — |
| 33.6–36.6 | preference row lights; status `pref`; `useful` ✓, `supported` ✓, `in scope` ✕ | — | ack C4, ack E5 ×2, miss |
| 37.4 | preference tagged `not saved` | — | thump E4 (quiet) |
| 38.4 | checks clear; saved record pulses; counter brightens | three found, one saved | ack G5 |
| 38.8–44.0 | **final hold** | — | — |
| 44.0–45.0 | stage fades; title stays | finite ending | — |

## Reproduction (from the repository root)

```
node video/memory-architecture/motion-v2/03/engine/render.mjs video/memory-architecture/motion-v2/03/scene.js video/memory-architecture/motion-v2/03/video.mp4 --sheet video/memory-architecture/motion-v2/03/scratch/contact-sheet.png
ffmpeg -v error -y -ss 40.0 -i video/memory-architecture/motion-v2/03/video.mp4 -frames:v 1 -q:v 3 video/memory-architecture/motion-v2/03/poster.jpg
```

`render.mjs` resolves `puppeteer-core` 25.14.0 from the repository's pinned `node_modules`. `engine/flow-engine.js` copies the cut 01 local engine (`panel`, `chip`, title options) and adds three general options in this copy only: key/value `valueX`, per-row `r{i}Tag`, and a chip `mark` (check or ×). Other cuts' files were not edited.

