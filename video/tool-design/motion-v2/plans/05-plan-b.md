# Lesson 05 — Expose more pages — plan B

Independent plan for the motion-v2 cut of tool-design lesson 05. Authored from the lesson entry in `video/tool-design/sequence/lessons.json` (item 5) and the concept content in `content/concepts/tool-design.json`. No other plan for this lesson, no ledger, and no authoring source was consulted. This document names no authoring model.

## Scope

One mechanism: **a result limit bounds one page; when more matches exist the page returns with a continuation cursor and says its coverage is partial; the model follows the cursor with the same query scope, and a page that returns without a cursor marks the query complete, so paging stops.**

The viewer should feel the page as a frame over a longer row of records: three of five are inside it, a cursor marker sits under the fourth, the result card says `partial`; the frame slides to the last two, the marker vanishes, and the card says `complete`. Two pages, one query, five records collected.

Grounding (from the concept): the example returns "incident IDs, short summaries, the searched interval, and a continuation cursor"; the walkthrough says to expose more available results through a cursor and, if coverage is incomplete, return that limitation explicitly; the pitfall is that dropping pagination or coverage fields makes a short result look exhaustive; the judgement says to keep IDs for follow-up reads.

Out of scope: byte or token size of individual records (the concept notes a count limit does not bound bytes), retries and attempt budgets, the page budget policy itself (the takeaway's "budget permits" is in the write-up), empty and failed outcomes (lesson 04), and what the model does with the collected IDs. The cut ends when the second page has been collected and paging has stopped.

Grammar for this cut: **a row of record cells, a sliding page frame, a cursor marker, a result card with a coverage row, and a collected panel.** The backend's matches are five labelled cells; the page frame is an outline box that covers the current page; the cursor marker is a label under the first record outside the frame; the result card is a store whose three rows describe the page, the next cursor, and the coverage; the collected panel accumulates one row per page with a badge. Requests go up the right margin; responses come down the centre. This differs from lesson 01 (slot-filling card), lesson 02 (two lists with a check lane), lesson 03 (payload, timeline, answer), lesson 04 (two mirrored columns), from the context-engineering and loop-engineering cuts, and from the harness-engineering views. Every element is a software object: a record, a page, a cursor, a coverage field.

Target length ≈ 33 s at playback. Authored at speed 1 for 30 s with `meta.speed: 0.9`. Lengthen the hold on the partial page and the hold after the frame slides first if stills read fast. Do not add beats to reach the guideline.

## Stage and coordinates (1080 × 1920)

Palette and type follow `references/style.md`. Names are 40–44 px; cell labels are 40 px; store rows, sublabels, and the cursor marker are 36 px monospace (≈ 21.6 px per character). Everything stays readable at 350 px wide (≈ 12–13 px for the smallest). If packet chip text renders below 40 px, add a `labelSize` option in the local engine copy and report it.

| id | type | centre (x, y) | size | text | notes |
|---|---|---|---|---|---|
| title | title band | (540, 330) / (540, 405) | — | **Tool design** / EXPOSE MORE PAGES | engine title + subtitle |
| backend | label | (540, 520) | 40 px mono, mid | `backend · 5 matches` | |
| c0–c4 | box, `labelSize 40` | (180, 640), (360, 640), (540, 640), (720, 640), (900, 640) | 150 × 90 each | labels `204`, `207`, `210`, `213`, `215` | incident IDs shortened; idle mid → accent inside the frame → ok once collected |
| frame | box, no label | (360, 640) → (810, 640) | 510 × 130 → 330 × 130 | — | accent outline covering cells 0–2, then cells 3–4; hidden until beat 1's call lands |
| cursor | label | (720, 715) | 36 px mono, accent | `▲ cursor` | under cell 3 while a cursor exists; hidden otherwise |
| result | store, `rows: 3`, w 700 | (540, 920) | 700 × ≈ 200 (x 190–890, y ≈ 820–1020) | label `page` 40 px at (540, 780); rows 36 px mono | page 1: row0 `items    204 207 210` · row1 `next     cursor → 213` accent · row2 `coverage partial` accent; page 2: `items    213 215` · `next     —` mid · `coverage complete` ok (max 20 characters ≈ 432 px) |
| collected | store, `rows: 2`, w 600 | (540, 1230) | 600 × ≈ 130 (x 240–840, y ≈ 1165–1295) | label `collected` 40 px at (540, 1125); rows 36 px mono | row0 `p1  204 207 210` · row1 `p2  213 215` |
| badge | badge | (840, 1125) | — | `partial` accent → `complete` ok | top-right corner of the collected panel |
| model | box | (540, 1500) | 520 × 150 (x 280–800, y 1425–1575) | label `model` 44 px; sublabel 36 px mono `search · limit 3` → `follows cursor` → `stops · 5 of 5` | |

Wires (dotted, resting `#3A3E45`):

| id | from | to | via | meaning |
|---|---|---|---|---|
| request | model.right (800, 1500) | [960, 700] (below cell 4) | [1010, 1500], [1010, 700] | the call and the follow-up go up the right margin to the backend |
| respond | [540, 700] (below cell 2) | result.top (540, 820) | — | a page comes down to the result card |
| keep | result.bottom (540, 1020) | collected.top (540, 1165) | — | the page's IDs are kept |

The frame and the cursor marker are the only elements that move between pages; everything else changes by text or colour. The `request` wire ends under the last cell so the call visibly reaches the backend row; the `respond` wire starts under the middle cell. Stage spans y ≈ 520–1575.

## Sound map

Pitches: backend cells **E5** (each cell one step up: E5, F♯5, G♯5, A5, B5 so a page is heard as a run), result card **G5**, collected panel **A5**, model **C5**. Pan by x: cells panned to their position, request traffic right (`+0.6`), the rest centre.

| event | preset | notes |
|---|---|---|
| cells appear | `store` | quiet, one per cell at 0.15 s, panned |
| a call leaves and lands | `send` C6, `arrive` E5 | pan right on arrival |
| the frame covers a page | `ack` | one per covered cell in sequence, at the cell's pitch |
| a page comes down | `send` E6, `arrive` G5 | |
| result rows appear | `store` | G5, ×3; the `next` row with a cursor adds `ack` C6 |
| cursor marker appears | `ack` | A5, pan to cell 3 |
| IDs are kept | `store` | A5 |
| badge `partial` | `ack` | low (C4), quiet |
| frame slides | `clock` then `ack` per newly covered cell | |
| collected cells settle | `ack` | E5, quiet, as cells 0–2 turn ok |
| cursor marker disappears | `poof` | quiet |
| coverage complete | `hit` | at the result card |
| badge `complete`, paging stops | `chime` then `deliver` (high, quiet) | the brightest event |

## Beat sheet (times at speed 1)

| t | what moves | state change | sound |
|---|---|---|---|
| **Beat 1 — The search is limited to one page (0.0–6.5)** | | | |
| 0.0 | — | cells hidden; frame hidden; cursor hidden; result and collected rows hidden; badge hidden; model sublabel `search · limit 3` | — |
| 0.6–1.2 | cells pop left to right (0.15 s each) | five mid cells with IDs | store × 5 (quiet) |
| 1.6 | `backend · 5 matches` pulses | — | — |
| 2.2 | model pulses | — | — |
| 2.2–3.4 | chip `search · limit 3` (fg) model.right → via → [960, 700], 1.2 s | — | send C6 |
| 3.4 | ripple at (960, 700) | — | arrive E5 |
| 3.8 | frame pops (scale 0.9 → 1) around cells 0–2 | frame accent; cells 0–2 → accent in sequence (3.8 / 4.0 / 4.2) | ack × 3 (E5, F♯5, G♯5) |
| 4.2–6.5 | hold | three of five inside the frame; two outside | |
| **Beat 2 — Return the page with a cursor; coverage is partial (6.5–13.5)** | | | |
| 6.5–7.1 | chip `3 items` (accent) [540, 700] → result.top, 0.6 s | — | send E6 |
| 7.1 | ripple at result.top | — | arrive G5 |
| 7.1 / 7.6 / 8.1 | result rows pop | `items    204 207 210` fg · `next     cursor → 213` accent · `coverage partial` accent | store × 3; ack C6 on row1 |
| 8.4 | `cursor` marker fades in under cell 3; accent ripple at (720, 715) | `▲ cursor` | ack A5 (pan right) |
| 9.0–9.5 | dot (fg) result.bottom → collected.top, 0.5 s | — | — |
| 9.5 | collected row0 pops | `p1  204 207 210` fg | store A5 |
| 9.9 | badge pops | `partial` accent | ack (low, quiet) |
| 9.9–13.5 | hold | a page, a cursor, a partial badge | |
| **Beat 3 — The model follows the cursor with the same scope (13.5–19.5)** | | | |
| 13.5 | model pulses | sublabel → `follows cursor` | — |
| 13.5–14.7 | chip `cursor → 213 · same scope` (accent) model.right → via → [960, 700], 1.2 s (shorten to `cursor · same scope` if it does not fit at 40 px) | — | send C6 |
| 14.7 | ripple at (960, 700) | — | arrive E5 |
| 15.1–15.9 | frame slides: centre (360, 640) → (810, 640), width 510 → 330, ease `inOut` | — | clock |
| 15.9 / 16.1 | cells 3–4 → accent | — | ack × 2 (A5, B5) |
| 16.3 | cells 0–2 → ok (0.4 s) | already collected | ack E5 (quiet) |
| 16.3–19.5 | hold | the frame over the last two; the cursor marker still under cell 3 | |
| **Beat 4 — Page 2 has no cursor; the query is complete (19.5–30.0)** | | | |
| 19.5–20.1 | chip `2 items` (accent) [540, 700] → result.top, 0.6 s | — | send E6 |
| 20.1 | ripple at result.top | — | arrive G5 |
| 20.1 / 20.6 / 21.1 | result rows swap | `items    213 215` fg · `next     —` mid · `coverage complete` ok | store × 3; hit on row2 |
| 21.4 | `cursor` marker fades out | — | poof (quiet) |
| 22.0–22.5 | dot (fg) result.bottom → collected.top, 0.5 s | — | — |
| 22.5 | collected row1 pops | `p2  213 215` fg | store A5 |
| 22.9 | badge pops | `complete` ok | chime |
| 23.3 | model pulses ok | sublabel → `stops · 5 of 5` ok; cells 3–4 → ok; frame → ok then fades to alpha 0.4 | deliver (quiet) |
| 23.3–28.5 | hold | final state: five ok cells, no cursor, `coverage complete`, two collected rows, `complete` badge, model stopped | |
| 28.5–29.3 | — | `s.fade` to black, 0.8 s | — |
| 30.0 | end | finite ending | |

## Accuracy limits

- The five records, their IDs, and the limit of 3 are illustrative. IDs are shortened to three digits for cell legibility; the write-up uses the full `INC-` form.
- The cursor is drawn as a pointer to the next record (`cursor → 213`) so the viewer sees what it continues from. Real cursors are opaque tokens; the concept defines only that a cursor means more results are available. The write-up carries this.
- `coverage partial` and `coverage complete` stand for making partial coverage explicit, as the walkthrough recommends; the concept does not prescribe a field name.
- The model follows the cursor once because the task here needs all matches and two pages suffice. The takeaway's condition "when the task requires more coverage and the budget permits" is not shown as a counter; the page budget belongs with the application's limits and the write-up.
- A count limit does not bound bytes or tokens when records are large; the cut shows counts only, and the concept's note on capping record fields is in the write-up.
- The second page's `next     —` means the backend returned no continuation. The cut does not show what the model should do if page 2 also carried a cursor, nor how many pages would be too many.
- The quiet `poof` reuses an eviction preset to remove the cursor marker; it is kept quiet so it does not read as a failure. Note the reuse in the hand-over.

## Acceptance checks

1. **Stills per beat** at playback seconds (speed 0.9): `6.0, 13.5, 20.0, 25.0, 30.0, 32.5` (speed-1 ≈ 5.4, 12.2, 18.0, 22.5, 27.0, 29.3). Tile with ffmpeg and view the row; view the 13.5 s (partial page) and 30.0 s (complete) stills at full size and at 350 px wide. Pass when the five cell IDs are readable at 350 px, the frame outline is clearly visible around exactly three cells at 6.0 s and exactly two at 20.0 s, the `▲ cursor` marker is readable under cell 3 at 13.5 s and absent at 30.0 s, all result and collected rows are readable, and the badge is readable in both states.
2. **Partial is explicit**: at 13.5 s result row1 reads `next     cursor → 213` and row2 `coverage partial` in accent; the badge reads `partial`; cells 3–4 are mid (outside the frame).
3. **Same scope, next page**: at 20.0 s the frame covers cells 3–4, cells 0–2 are ok, the cursor marker is still present, and the result card still shows page 1 (page 2 has not yet returned).
4. **Complete stops paging**: at 25.0 s row1 reads `next     —`, row2 `coverage complete` in ok, the marker is gone, and the model reads `stops · 5 of 5`; no further chip travels on `request`.
5. **No lingering state**: no chip remains during any hold; the frame never overlaps a cell outside its page; the badge shows one state at a time.
6. **Overlap**: the `request` chips at x = 1010 must stay inside the frame and clear of cell 4 (right edge 975) until they turn toward (960, 700); the `3 items` and `2 items` chips must clear the `page` label at y = 780 except at arrival; the cursor marker at (720, 715) must not collide with the `respond` wire's start at (540, 700) or the frame's bottom edge (y 705). Result rows at 36 px mono (20 characters ≈ 432 px) fit inside 700 px; the long request chip must be readable at 40 px or shortened as noted.
7. **Word budget**: on-screen text is the backend label, five cell IDs, the cursor marker, the page label and three rows, the collected label and two rows, the badge, and the model label and sublabel. No sentence appears.
8. **Audio**: the Node dry-run lists ≈ 38 cues (5 stores, send/arrive, 3 acks, send/arrive, 3 stores with ack, ack, store, ack, send/arrive, clock, 2 acks, ack, send/arrive, 3 stores with hit, poof, store, chime, deliver). The spectrogram shows the three-note then two-note runs when the frame covers cells (3.8–4.2 s and 15.9–16.1 s), the `hit` at 21.1 s, and the `chime` at 22.9 s as the brightest. `ffprobe` reports ≈ 33 s with an audio stream. Record whether audio was heard or only analysed.
9. **Causal reading test**: with sound off and every word removed, a viewer should still see: five cells appear; a chip climbs the right margin to the row and an outline appears around the first three, which turn orange; a chip drops to a card that fills three rows, a marker appears under the fourth cell, and a row appears in a lower panel with an orange tag; another chip climbs the right margin; the outline slides right to cover the last two cells, the first three turn green; a chip drops to the card, whose rows change, the marker vanishes, a second row appears in the lower panel, and the tag turns green.
10. **Project checks** after encoding: `python3 scripts/check_media.py --concept tool-design`, then the full set before any release proposal. A new encode needs its own comparison review.

