# Lesson 05 beat sheet: Expose more pages

**Mechanism:** a result limit bounds one page. When more matches exist, the response carries an opaque continuation cursor and says its coverage is partial. Because the task needs every match and the budget allows another call, the model copies that exact cursor into the next request with the same scope and limit. A response without a next cursor marks the query complete, so paging stops.

**Geometry:**

- **Request card:** `Model request`, with `search_incidents`, `payments · 09:00–10:00Z`, `limit: 2` and `cursor:`, sits on top.
- **Backend row:** the backend's matches are a row of three cells. They stay blank until a page covers them, so the caller never sees records in advance. An amber page frame covers the current page and slides to the next one.
- **Response card:** shows items, `next_cursor`, and a page and coverage status.
- **Collected panel:** gains one row per page.
- **Cursor path:** the cursor chip travels the left gutter from the response gap up into the request's `cursor` field.

Times are playback seconds for the encoded `video.mp4` (authored at speed 1). Duration 40.00 s, finite ending: a hold on the complete collection, then the stage fades and the title stays.

## Neutral choices from the two plans

| Idea | Source | Decision |
|---|---|---|
| Backend matches as a row of cells under a sliding page frame | B | Used. Cells stay blank until a page covers them, so no unseen records are shown, per plan A's rule against pre-known rows. |
| Opaque token `k7Q` copied exactly from `next_cursor` into the request's `cursor`, with the response keeping its copy | A | Used. B's `cursor → 213` was not used because it implies a readable pointer. |
| Same scope and limit highlighted as reused | A and B | Used. |
| Decision before continuing: `need more · budget ok` | A | Used as the request card's status. |
| `limit: 2` with three records (INC-42, INC-57, INC-63) | A | Used. B's five 3-digit records were not used, which keeps the text large. |
| Collected panel with a `partial` → `complete` status | B (A had a coverage strip) | Used. |
| Stop only because `next_cursor` is absent, shown before `complete` | A | Used. The `(none)` row is outlined, then the statuses turn teal. |
| `next_cursor: (none)` | A used a dash | `(none)` is used for beginner clarity. It is a display value, not a token. |
| Model box with a moving request chip; `poof` for the cursor marker | B | Omitted. A short dot carries each hand-off, and no eviction sound is used. |
| B's 33 s target | B | Not used. |

## Teaching beats

| # | Time (s) | What moves | State change | Sound |
|---|---|---|---|---|
| 1 | 0.0–7.5 | **The search is limited to one page.** 0.5 the request appears (`cursor: (none)`). 1.4 `Backend matches` and three blank cells appear. 2.8 `limit: 2` is outlined amber. 3.8 a dot drops to the backend. 4.4 the amber `page 1` frame covers two cells, and `INC-42` and `INC-57` reveal at 4.6 and 5.0. The third cell stays blank. | One bounded page, and more may remain | arrive C5 · store E5 ×3 · ack C6 · send C6 · ack E5, G♯5 |
| 2 | 7.5–15.5 | **The page returns with a cursor.** 7.5 a dot drops to the response. 8.0 `items: INC-42, INC-57`. 8.8 `next_cursor: k7Q` in amber. 9.6 status `page 1 · partial`. 10.6 a dot drops to Collected, and at 11.1 `p1  INC-42  INC-57` appears with status `partial`. Hold to 15.5. | The caller can see the result is partial | send E6 · store G5 ×2 · ack C6 · ack C4 · send E6 · store A5 |
| 3 | 15.5–25.5 | **The model follows the cursor with the same scope.** 15.5 the request status reads `need more · budget ok`. 16.8 `next_cursor: k7Q` is outlined, and a `k7Q` chip travels down, left, up the gutter and into the request. 19.2 `cursor: k7Q`. 20.2 the scope and limit rows are outlined (unchanged). 22.2 the response clears and a dot drops to the backend. 22.8 the frame slides to the third cell (`page 2`), and the first two cells turn teal. 23.7 `INC-63` reveals. | The exact token and the same query are reused | ack C5 · send G6 · arrive C5 · ack C6 ×2 · send C6 · clock · ack B5 |
| 4 | 25.5–40.0 | **No next cursor, so the query is complete.** 25.5 a dot drops. 26.0 `items: INC-63`. 26.8 `next_cursor: (none)`. 27.8 that row is outlined teal and the status reads `page 2 · complete`. 28.8 a dot drops, and at 29.3 `p2  INC-63` appears. 30.0 Collected turns `complete` (teal) and the frame settles. 31.0 the request status reads `stop paging`. Hold 31.6–38.2, fade 38.2–39.4, then the title alone to 40. | Paging stops on cursor absence | send E6 · store G5 ×2 · hit G5 · send E6 · store A5 · **chime C6** (brightest) · deliver C6 |

31 cues in total. Pitches are request and decision C5/C6, backend cells rising E5 → G♯5 → B5, response G5, and collected A5.

## Reproduce

From the repository root, using the pinned `puppeteer-core` 25.14.0 from the root `node_modules` and local Chrome:

```
node video/tool-design/motion-v2/05/engine/render.mjs video/tool-design/motion-v2/05/scene.js video/tool-design/motion-v2/05/video.mp4 --sheet video/tool-design/motion-v2/05/scratch/contact-sheet.png
```

The local engine copy adds `card` and `tick` (copied unchanged from cut 02's local engine), a general `frame` node (an outline whose centre and width animate, with a tag below), and an optional chip text `size` for packets. The shared skill and other cuts are unchanged.

## Lesson text sync (coordinator)

`sequence/lessons.json` item 5 declares duration 28 with beats at 0/7/14/21. For this cut, use duration 40.0 with beats at **0 / 7.5 / 15.5 / 25.5**. This folder does not edit that file.
