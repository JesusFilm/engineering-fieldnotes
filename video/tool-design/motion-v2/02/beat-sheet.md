# Lesson 02 beat sheet: Make inputs explicit

**Mechanism:** the tool declares four required input fields. Before any execution, the application checks each arriving call against that declaration. It rejects a call that is missing `end_time` and returns an error that names the field. Only a corrected call that passes the same check starts the search.

**Geometry:** the schema and the call side by side, with rows aligned and a check lane between them. The application panel holds both columns and shows a status (`not checked` → `checking` → `rejected` / `valid`). A dashed wire leads down to `search_incidents`, whose counter (`runs: 0 · not run`) shows that nothing ran until the corrected call passed. The model sits above and talks to the application only.

Times are playback seconds for the encoded `video.mp4` (authored at speed 1). Duration 44.00 s, finite ending: a hold, then the stage fades and the title stays.

## Neutral choices from the two plans

| Idea | Source | Decision |
|---|---|---|
| Schema list and call list with a check lane between them, walked row by row | B | Used, with rows aligned so each check compares one declared field with the call's value. |
| All four displayed fields required, marked `*` with a `* required` legend | A | Used. Plan B's optional `limit` is dropped, since the lesson says the search needs all four. |
| Missing key shown as an empty dashed slot, without a literal `omitted` value | A (absent key, not empty string) | Used. The slot has no text. |
| Validation status that resets to `not checked` for the corrected call before it is checked again | A | Used. |
| Execution counter `runs: 0` that changes only after validation passes | A | Used. It ends at `runs: 1 · running`. |
| Dashed wire to the search that opens only when the call is valid | B | Used. |
| Error sent back to the model naming the field (`missing: end_time`), with the model then showing `add end_time` | A and B | Used. |
| Calls named `Call A` and `Call B`, with only the changed value highlighted | A | Used. |
| Search result `done · 2 items` and success chime | B | Omitted. Results are lesson 03, and validation is not success. The video ends at execution start. |
| Lane label `validation · shape only` | B | Omitted. It adds jargon text. The review records a later idea for the authorization limit. |
| Full date-time display `20 Oct · 09:00 UTC` | A | Shortened to `09:00Z` / `10:00Z` for 350 px legibility. These are illustrative UTC times. |

## Teaching beats

| # | Time (s) | What moves | State change | Sound |
|---|---|---|---|---|
| 1 | 0.0–8.5 | **Explicit fields.** 0.5 the Model appears, and 1.1 the Application panel. 2.2/2.9/3.6/4.3 the schema rows `service *`, `start_time *`, `end_time *`, `limit *` appear. 5.0 the legend appears. 5.8 `search_incidents` appears with `runs: 0 · not run` under a dashed wire. Hold 6.2–8.5. | Four required inputs are declared. Nothing has been called. | ack C5 (model), ack E5 (application), store E5 ×4 (schema), ack E5, ack A4 (search) |
| 2 | 8.5–17.5 | **Call A omits end_time.** 8.5 a `Call A` chip drops from the Model. 9.2 the `Call A` column fills: `payments`, `09:00Z`, `20`, and an empty dashed slot on the end_time row. Status `not checked`. 11.6 status `checking`. Rows are outlined in turn: 12.6 and 13.5 get checks. 14.0 the end_time row is outlined, and at 14.6 a red ×, a red schema row and a red slot appear. 15.8 limit gets a check. Hold to 17.5. | The application finds the missing key before any backend work. | send C6, arrive G5, store G5 ×3, work E4, ack E6 ×2, **miss E4** at 14.6, ack E6 |
| 3 | 17.5–25.5 | **Reject and return an actionable error.** 17.5 status `rejected`, the panel turns red and jolts, and `Call A` turns red. 18.6 `runs: 0 · not run` is outlined. 20.2 a red chip `missing: end_time` rises to the Model, and at 21.1 the Model shows `missing: end_time`. Hold 21.5–24.4. 24.4 Call A and its marks clear. | No search ran. The caller knows which field to add. | **thump E3** (loudest), clock tick on the counter, send E6, arrive C5 |
| 4 | 25.5–35.3 | **Corrected call, checked again.** 25.5 the Model shows `add end_time`. 26.4 a `Call B` chip drops. From 27.1 the column fills, with `10:00Z` in amber. 28.7 status `not checked`. 30.2 `checking`. Checks land at 31.2/32.0/32.8/33.6. 34.3 status `valid` and the panel turns green. | Correction is not trusted until it is validated again. The counter is still 0. | store C5, send C6, arrive G5, store G5/G5/B5/G5, work E4, ack E6 ×4, store E6 |
| 5 | 35.3–44.0 | **Only now the search runs.** 35.3 the wire turns solid amber and a `Call B` chip runs down it. 36.1 the search box lights and shows `runs: 1 · running`. Hold 37.7–42.4, fade 42.4–43.6, then the title alone to 44.0. | The single execution follows validation. No result or incident claim appears. | send E6, arrive A4, work G3 ×4 |

41 cues in total. Pitches are model C5, application/schema E (work E4, acks E6), call values G5 (corrected value B5), and search A4/G3. Rejection uses `miss` and `thump`. There is no success fanfare.

## Reproduce

From the repository root, using the pinned `puppeteer-core` 25.14.0 from the root `node_modules` and local Chrome:

```
node video/tool-design/motion-v2/02/engine/render.mjs video/tool-design/motion-v2/02/scene.js video/tool-design/motion-v2/02/video.mp4 --sheet video/tool-design/motion-v2/02/scratch/contact-sheet.png
```

The local engine copy adds two general node types: `card` (adapted from motion-v2/01, with a dashed outline option, a right-aligned status and centred rows) and `tick` (a persistent check or cross mark). It also adds an optional chip text `size` for packets. The shared skill and other cuts are unchanged.

## Lesson text sync (coordinator)

`sequence/lessons.json` item 2 declares duration 28 with beats at 0/7/14/21. For this cut, use duration 44.0 with beats at **0 / 8.5 / 17.5 / 25.5**. Beat 5 (35.3) belongs to the fourth text beat, "…Validate it before running the search." This folder does not edit that file.
