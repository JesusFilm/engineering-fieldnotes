# Lesson 02 beat sheet: Retrieve relevant evidence

**Mechanism:** a search returns nearby candidates. Inspecting each candidate's lines and metadata against the task decides relevance. The endpoint and the approved v1 contract constrain this change, so their excerpts go into the model input with their source attached. A v2 draft matches the search but would mislead this v1 change, so it stays out.

**Example (illustrative, not real repository files):** task `fix invoice latency`. Results: `src/invoice.py` (`route · v1`), `api/v1.md` (`approved · v1`), `notes/v2.md` (`draft · v2`), all at `rev a17`.

Times are playback seconds in `video.mp4`. The scene is authored and played at speed 1, so these are also scene times. Duration is 50.0 s with a finite ending (fade to black).

## Neutral choices from plans A and B

| Idea | Source | Why |
| --- | --- | --- |
| Inspect each result's actual lines, revision, and line span before selecting it; the checkbox means "selected" only | Plan A | Selection follows inspection; the check never claims the content is true |
| Version and approval metadata stay visible and get underlined when they decide the case | Plan A | Shows authority and applicability as checks on the record itself |
| The draft is left out neutrally (grey decision, unchecked, no red ×) | Plan A | It is not wrong or worthless, just not for this v1 change |
| The task stays on screen as the measure of relevance | Plan B | Relevance is relative to one task |
| Supplied records carry a source stamp (`path · a17 · L12–13`) | Both | "Include where each record came from" |
| The draft's excerpt `rename to amount` lights alongside the supplied `keep total_cents` | Combined | Makes "more material is not always more useful" concrete: nearby material can contradict the rule that applies |
| Not used: Plan B's size and constraints bars, the 6-record input, and the model box | — | Unitless gauges invite cost claims; the conflict shows the point with real content |
| Not used: Plan A's mode switch, where one surface becomes the inspector and then the input | — | Rows expand in place, so selection state and the input stay visible throughout |

**Geometry (different from lesson 01's four stacked panels):** a task strip, then a search-results list whose rows expand in place like an accordion (row 92 px, plus 288 px when open), then a model input of two source-stamped records. Supply paths run down the right gutter. Content text is 40–46 px (about 13–15 px at 350 px wide).

## Beats

| # | Time | What moves | State change | Sound |
| --- | --- | --- | --- | --- |
| 1 | 0.0–8.6 **Task and candidates** | 0.4–0.8 task `fix invoice latency`. 1.8 results list `search: invoice`, `0 selected`. 2.6, 3.2, 3.8 three rows with metadata. 4.6 empty model input with dashed slots, `0 records`. 6.2 the task row lights. Hold. | Three candidates, none selected, input empty. | 0.8 ack C5 · 1.8 send G6 · 2.6/3.2/3.8 arrive G5 · 4.6 ack C5 · 6.2 ack C5 |
| 2 | 8.6–25.2 **Inspect endpoint and v1 contract; select both** | 8.6 focus `src/invoice.py`; 9.2 the row opens; 10.0 `rev a17 · lines 12–13`; 10.6/11.4 lines `12 GET /v1/invoice`, `13 returns total_cents`. 13.0 `relevant · the route to change`; 13.8 check, `1 selected`; 14.8 the row collapses. 16.4 focus `api/v1.md`, open; 18.4/19.2 `8 v1 response:`, `9 keep total_cents`; 20.0 `approved · v1` underlined; 20.8 `relevant · approved v1 rule`; 22.0 check, `2 selected`; 23.0 collapses. Hold. | Two of three selected; each was inspected first. | 8.6 send C6 · 10.0 arrive G4 · 10.8/11.6 ack G4 · 13.0 ack C5 · 13.8 store C5 · 16.4 send C6 · 17.7 arrive E4 · 18.4/19.2 ack E4 · 20.0 ack E5 · 20.8 ack C5 · 22.0 store C5 |
| 3 | 25.2–34.0 **Supply excerpts with source** | 25.2 amber trace from `src/invoice.py` down the right gutter; 26.1 record 1 (source stamp and two lines), `1 record`. 27.6 trace from `api/v1.md`; 28.5 record 2, `2 records` in teal. 30.6 both source stamps light. Hold. | Input holds two excerpts, each with path, revision, and lines. | 25.2 send C6 · 26.1 store C5 · 27.6 send C6 · 28.5 store E5 · 30.6 ack E5 |
| 4 | 34.0–50.0 **Nearby is not the same as relevant** | 34.0 focus `notes/v2.md`, open; 36.0/36.8 `4 v2 response:`, `5 rename to amount`. 37.8 that line and the supplied `keep total_cents` light amber together. 38.6 `draft · v2` underlined; 39.4 `draft for v2 · not this change` in grey. 41.8 the row collapses unchecked. 42.8 input pulses teal and stays at two records. Hold to 48.2; fade 48.2–49.4. | The draft stays unselected; the input is unchanged. | 34.0 send C6 · 35.3 arrive D4 · 36.0/36.8 ack D4 · 37.8 ack D4 + 38.0 ack E5 · 38.6 ack C4 · 39.4 ack C4 · 41.8 poof (quiet) · 42.8 arrive E5 |

The video has 35 cues. Each source has its own pitch: endpoint G4, contract E4, draft D4. Selection and assembly are C5, and the input is E5. The draft's cues are low (C4/D4) with no failure sound.

## Reproduce

From the repository root, using the pinned `puppeteer-core` 25.14.0 in the root `node_modules`:

```
node video/context-engineering/motion-v2/02/engine/render.mjs video/context-engineering/motion-v2/02/scene.js video/context-engineering/motion-v2/02/video.mp4 --sheet video/context-engineering/motion-v2/02/scratch/contact-sheet.png
ffmpeg -v error -y -ss 44.0 -i video/context-engineering/motion-v2/02/video.mp4 -frames:v 1 -q:v 3 video/context-engineering/motion-v2/02/poster.jpg
```

The local engine is the clean copy plus the general `sheet` and `trace` nodes, copied unchanged from lesson 01's engine (lesson 01 was not modified), plus a new `accordion` node: a list with checkboxes, right-side metadata with an underline, and rows that expand in place to show a locator, numbered lines with highlights, and a decision line.

## Lesson text sync

`sequence/lessons.json` item 2 declares duration 28 with beats at 0, 7, 14, and 21. For this cut, the coordinator should retime it to a duration of 50.0 with beats at **0, 8.6, 25.2, and 34.0**. The beat texts map one to one in their existing order. This folder does not edit that file.
