# Lesson 03 beat sheet: Return usable evidence

**Mechanism:** a tool result is usable evidence when it carries record IDs, short summaries and the searched scope. The model's answer can then cite those records, and its claims must stay inside the scope that was searched. Two returned records are not all history.

**Geometry:** three panels in a column. At the top, a `search_incidents result` payload grows from a bare `status: ok` to IDs, summaries and a `searched:` row. In the middle, a 06:00–12:00 UTC time axis shows the searched hour as an amber window, with one dot per returned record inside it. At the bottom is the `Model answer` card, with a status on the right. Citations travel the left gutter from an answer row to the result rows. The scope check travels the right gutter from the answer's claim to the time axis.

Times are playback seconds for the encoded `video.mp4` (authored at speed 1). Duration 42.00 s, finite ending: a hold, then the stage fades and the title stays.

## Neutral choices from the two plans

| Idea | Source | Decision |
|---|---|---|
| Contrast case: the answer tries to cite a bare `ok` and finds nothing to point at | B | Used. A grey × appears in the gutter, and the answer status reads `nothing to cite`. |
| Explicit scope row `searched: payments 09:00–10:00Z` kept beside the records | A | Used. |
| Records `INC-42` (Elevated error rate, matching lesson 01) and `INC-57` | A | Used. B's `INC-204` / `INC-207` were not used. |
| Count worded `Returned: 2 reports` | A | Used, so the count reads as returned records rather than all incidents. |
| Time axis with the searched window and the returned records as dots inside it | B (A had a scope strip without dots) | Used. Dots appear only inside the window, and no counts or dots appear outside it. |
| Over-claim `No other incidents today` lighting the unsearched hours red, then pulled back to `Only 09:00–10:00Z searched` | B | Used. It carries "two found records are not all history" through motion. |
| Outside hours ending neutral and labelled `not searched`, never green | A | Used. |
| Separate model box writing into the answer | B | Omitted. The answer card is titled `Model answer`, which keeps the stage to three panels. |
| `checkable` / `uncheckable` badge | B | Replaced by plain answer statuses: `nothing to cite` → `cited` → `over-claims` → `within scope`. |
| Cursor, pagination, empty or error results, follow-up fetch | both exclude | Excluded (later lessons). |
| B's 31 s target | B | Not used. The holds need the time. |

## Teaching beats

| # | Time (s) | What moves | State change | Sound |
|---|---|---|---|---|
| 1 | 0.0–9.2 | **A bare flag is not evidence.** 0.6 the result appears with `status: ok` only. 2.4 the answer card appears. 3.0 `Incidents found`. 4.0 a grey dot travels the left gutter from the answer to `status: ok`. 5.0 a grey × appears, and the status row is outlined grey. 5.5 the answer status reads `nothing to cite`. Hold to 8.4. | The claim has nothing to point at. | arrive G5 (result) · store C5 (answer) · send C6 · **miss E4** · ack C4 (low) |
| 2 | 9.2–18.5 | **Return IDs, summaries and the searched interval.** 9.2 the 06:00–12:00 axis appears. 10.0 `INC-42  Elevated error rate` appears, and at 10.7 its dot lands on the axis. 11.9 `INC-57  Slow payment responses`, and at 12.6 its dot. 14.0 `searched: payments 09:00–10:00Z`, and at 14.6 the 09:00–10:00 window fills amber with its labels. 15.3 the old claim dims and the status clears. Hold to 18.5. | The result now names records and its scope. | ack E5 (axis) · store G5 ×3 (result rows) · ack E6 ×2 (dots) · store E5 (window) |
| 3 | 18.5–26.8 | **The answer cites the returned records.** 18.5 `Returned: 2 reports`. 19.6 `INC-42 · INC-57`. 20.7 a green dot travels the gutter, and at 21.7 the INC-42 result row is outlined green. 21.9 a second dot, and at 22.9 INC-57 is outlined. 23.6 status `cited`, and the card turns green. Hold, then the outlines clear at 26.0. | Every cited ID has a returned row behind it. | store C5 ×2 · send C6 · hit G5 · send C6 · hit B5 · **chime C6** (brightest) |
| 4 | 26.8–42.0 | **Keep claims within the returned scope.** 26.8 a red claim `No other incidents today` appears. 27.8 a red dot travels the right gutter to the axis. 28.8 both unsearched segments turn red with ×, and the status reads `over-claims`. Hold to 31.6. 31.6 the claim becomes `Only 09:00–10:00Z searched` and the status clears. 32.4 the outside segments return to neutral grey, labelled `not searched`. 33.2 status `within scope`. Hold 33.2–40.2, fade 40.2–41.4, then the title alone to 42.0. | The answer claims only the searched hour. Unsearched time stays unknown and is not shown as empty. | store C5 (quiet) · send C6 · **miss E5** · store C5 · ack E5 · ack C6 |

25 cues in total. Pitches are result payload G5, time axis E5/E6, and model answer C5/C6. Absence and over-claim use `miss`, and a successful citation uses `hit` + `chime`.

## Reproduce

From the repository root, using the pinned `puppeteer-core` 25.14.0 from the root `node_modules` and local Chrome:

```
node video/tool-design/motion-v2/03/engine/render.mjs video/tool-design/motion-v2/03/scene.js video/tool-design/motion-v2/03/video.mp4 --sheet video/tool-design/motion-v2/03/scratch/contact-sheet.png
```

The local engine copy adds `card` and `tick` (copied unchanged from cut 02's local engine), a general `timeline` node (a track split into before, window and after, with event dots), and an optional chip text `size` for packets. The shared skill and other cuts are unchanged.

## Lesson text sync (coordinator)

`sequence/lessons.json` item 3 declares duration 28 with beats at 0/7/14/21. For this cut, use duration 42.0 with beats at **0 / 9.2 / 18.5 / 26.8**. This folder does not edit that file.
