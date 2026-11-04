# Lesson 02 beat sheet: Use a specific failure

**Mechanism:** twelve selected tests actually run on code A, and one fails. That failure's own values — input `120, 0.25`, expected `90.00`, actual `119.75` — point at one line: `119.75 = 120 − 0.25`, so the code subtracts the rate instead of applying it. The agent changes that line, which makes code B. The old result stays true for code A but says nothing about code B, so the same twelve tests start again on code B. The cut ends with that fresh result still pending.

All values are illustrative teaching values. `discount(120, 0.25)` should return `90.00`; `total - rate` returns `119.75`, and `total * (1 - rate)` returns `90.00`. The cut never shows the new result, so it makes no claim that the repair works.

Times are playback seconds in the encoded `video.mp4` (`meta.speed 1`, so scene and playback times match). Duration is 37.00 s, with a finite ending (fade to black).

## Synthesis of the two plans

| Idea | Used | Why |
|---|---|---|
| 4×3 test grid where each cell runs, then shows ✓ or ✗; one stays red | Both | Makes "the tests actually ran" visible cell by cell, with a count underneath |
| Concrete values where the actual result exposes the bug (`119.75 = 120 − 0.25` → `total - rate`) | Plan B (numbers and bug) | The failure points at a specific line, which is the lesson's "specific" |
| Highlighting the matching pieces (`0.25`, `119.75`, then `- rate` in the code) | New, building on both | Connects the evidence to the code without a sentence |
| Explicit code identity: `code A` → `code B` on the code and on the test grid | Plan A | Ties every result to the code that produced it |
| The card splits into `code A 119.75` (dashed, kept) and `code B —` (empty, amber); the old value never changes to 90 | Plan A | Old evidence stays true but cannot vouch for new code |
| Old grid dims, its outline turns dashed, and its title stays `tests · code A` in amber; old marks clear before the title says `code B` | Both (Plan B's dimmed stale state, Plan A's no-carryover rule) | Shows the earlier results going stale without deleting them |
| Rerun: the same twelve cells, pending, with cell 1 running and `running · 0 of 12`; no result | Plan A | Ends on "the next observation must be fresh", leaving pass results to the next lesson |
| Plan B's all-green rerun, `fresh` badge and chime | Not used | That is lesson 03 (stop after verified success) |
| Plan A's editor taking over the grid area | Replaced | A fixed code panel, with the agent between card and code, keeps the evidence → agent → code path in view |
| Plan B's `agent` box with changing sublabels | Reduced | The `agent` tag lights while it holds the evidence; no sentence sublabels |

## Stage

- **Top panel** (title `tests · code A`): the 4×3 grid and a count line (`12 selected` → `12 ran · 1 failed` → `running · 0 of 12`). The failing test is row 3, column 3.
- **Middle card** (`failing test`): `input 120, 0.25`, `expected 90.00`, `actual 119.75`. After the edit, the actual row splits into `code A 119.75` and `code B —`.
- **`agent` tag** between the card and the code.
- **Bottom panel** (`discount.py`): the `def` line and the `return` line under repair, with a `code A` / `code B` badge.

Routes: the failing cell drops into the card; the card feeds the agent; the agent feeds the code; a lane up the right edge returns the changed code to the tests.

## Beats

| # | Time (s) | What moves | State change | Sound |
|---|---|---|---|---|
| 1 | 0–8.0 | **Tests run on code A.** 0.8 the test panel lights. 1.4–4.9 each cell runs in turn (amber outline), then shows ✓; cell 11 shows ✗ and the grid jolts. 5.3 count line. | `12 selected` → `12 ran · 1 failed` in red. Hold 5.3–8.0. | 0.8 arrive E5 · eleven ack blips rising across columns E6/G6/B6/E7 · 4.62 thump (loudest) · 5.3 arrive E5 |
| 2 | 8.0–18.0 | **The failing test's values.** 8.0 the red cell glows and a red dot drops to the card. 8.8 `input`, 9.7 `expected`, 10.6 `actual` appear. 13.2 `0.25` and `119.75` are boxed. 13.9 `= 120 − 0.25`. 16.2 a dot goes to the agent. 16.65 the agent lights. | The card fills one row at a time, then the clue appears. Holds: 10.6–13.2 and 13.9–16.2. | 8.0 send E6 · 8.8 arrive G5 · 9.7 ack G5 · 10.6 arrive D5 · 13.2 ack G5 · 13.9 ack D6 · 16.2 send G6 · 16.65 arrive C5 |
| 3 | 18.0–29.0 | **Targeted change; old evidence becomes old.** 18.0 a dot goes from the agent to the code. 18.45 `- rate` is boxed in red. 20.6 the line becomes `return total * (1 - rate)`. 21.2 the badge reads `code B`. 23.2 the grid dims and its outline turns dashed under amber `tests · code A`. 24.6 the card's actual row becomes `code A 119.75` (dashed). 25.4 `code B —` appears. | Input and expected never change. The old value is kept and labelled with its code; code B has no result. Holds: 18.45–20.6 and 25.4–29.0. | 18.0 send C6 · 18.45 arrive A5 · 20.7 store A5 · 21.2 ack A6 · 23.2 poof · 24.6 store G5 · 25.4 ack G5 |
| 4 | 29.0–37.0 | **Same tests, changed code.** 29.0 a dot climbs from the code to the tests. 29.8 code A's marks clear. 30.4 the title becomes `tests · code B`, the outline turns solid, and the count reads `running · 0 of 12`. 31.0 onward cell 1 pulses amber. 35.4–36.4 fade. | No new result appears. The card still shows `code A 119.75` and `code B —`. | 29.0 send A6 · 29.8 poof (soft) · 30.4 arrive E5 · 31.3–34.3 six work ticks E4 · silent fade |

Actor pitches: test runner E, card G, agent C, code A (the note). Sends sound an octave above the sender.

## Reproduce

From the repository root (Node ≥ 22.12, pinned `puppeteer-core 25.14.0` resolved from root `node_modules`, Chrome, ffmpeg):

```
node video/loop-engineering/motion-v2/02/engine/render.mjs video/loop-engineering/motion-v2/02/scene.js video/loop-engineering/motion-v2/02/video.mp4 --sheet video/loop-engineering/motion-v2/02/scratch/contact-sheet.png --wav video/loop-engineering/motion-v2/02/scratch/sfx.wav
ffmpeg -v error -y -ss 34.0 -i video/loop-engineering/motion-v2/02/video.mp4 -frames:v 1 -q:v 2 video/loop-engineering/motion-v2/02/poster.jpg
```

The local `engine/flow-engine.js` adds three general node types:

- `panel`: rows with highlighted character spans, right tags and dashed outlines.
- `pill`.
- `tgrid`: a grid of cells, each with a run pulse, result mark and highlight, plus `cell{i}` anchors.

It also adds a circled status mark and an `r` option for dot packets. These were adapted from the lesson 01 cut's local helpers, which I copied without changing that folder. The shared skill is unchanged.

## Lesson text sync (for the coordinator)

`sequence/lessons.json` item 2 declares `duration: 28` with beats at 0/7/14/21. For this cut the beats would be **0 / 8.0 / 18.0 / 29.0**, with duration 37.0. This folder does not edit that file.

