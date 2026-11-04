# Lesson 04 beat sheet: Empty versus failed

**Mechanism:** a search that completed with no matches and a search that timed out are different outcomes. The first returns success with an empty list and supports "no matches in that scope". The second must return an error result (`status: error`, `code: TIMEOUT`, MCP `isError: true`). With a transport timeout there may be no tool result at all, and the caller must still keep the failure. The model's conclusion for a failed lookup stays "unknown".

**Geometry:** one shared query header (`search_incidents` / `payments · 09:00–10:00Z`) above two side-by-side runs. Each run has an elapsed-time bar against a deadline tick, a state label and a `Tool result` card. Below them, a `Model answer` panel collects one row per outcome. The trap is Run B, after its timeout, showing the same `status: ok · items: []` card as Run A.

Times are playback seconds for the encoded `video.mp4` (authored at speed 1). Duration 46.00 s, finite ending: a hold on three distinct conclusions, then the stage fades and the title stays.

## Neutral choices from the two plans

| Idea | Source | Decision |
|---|---|---|
| Two runs side by side for direct comparison | B | Used, as two columns. Plan A's stacked rows with one inspector were not used. |
| One shared query so both runs search the same scope | A | Used. |
| Elapsed-time bars against a deadline tick | A (indeterminate, no fake progress) and B (deadline tick) | Used. A stops early and turns teal, and B runs to the deadline and turns red. Neither bar is a progress percentage. |
| The trap: Run B returning the empty-success card, with the model writing `B: no matches` | B | Used. A red ×, then the card is corrected to `status: error` / `code: TIMEOUT` / `isError: true` and the wrong conclusion is removed. |
| Conclusion scoped as `A: no matches in scope`, with the query interval highlighted | A | Used. |
| Transport-timeout variant: the result fields are withdrawn, the card goes dashed with `no tool result`, and the failure is kept | A and B | Used. It is shown as a variant of Run B, not a retry. |
| Database cylinders, model box, wires | B | Omitted, to keep the stage to the comparison. |
| `MCP execution error` header qualifier | A | Omitted. The `isError: true` row carries it at a legible size. |
| Retries, backoff, pagination | both exclude | Excluded. |
| B's 35 s target | B | Not used. The trap and comparison holds need the time. |

## Teaching beats

| # | Time (s) | What moves | State change | Sound |
|---|---|---|---|---|
| 1 | 0.0–9.0 | **A completed search finds no matches.** 0.5 the query appears. 1.2 Run A and its deadline bar appear. 1.8–3.8 the bar fills amber (`running`). 3.8 it stops short of the deadline, turns teal, and shows `completed`. 4.6 the `Tool result` card appears, with `status: ok` at 5.2 and `items: []` at 5.9. Hold to 9. | Empty success | ack C5 (query) · ack E5 (A) · work E4 ×5 · ack E5 · store G5 ×2 (result) |
| 2 | 9.0–16.0 | **It supports "no matches in scope".** 9.0 the answer panel appears. 9.6 a dot drops from A's card. 10.2 `A: no matches in scope` in teal. 11.4 the query interval and the answer row are outlined together. Hold to 16. | A bounded conclusion | send C6 · deliver C5 · ack C6 |
| 3 | 16.0–29.0 | **A backend timeout, and the empty-list trap.** 16.0 Run B appears. 16.6–19.8 its bar fills to the deadline. 19.8 it turns red, the tick glows, the bar jolts, and it shows `timed out`. 21.6 the trap: B's card shows `status: ok` / `items: []` (grey) and the model writes `B: no matches`. 24.2 a red × appears on the card, which turns red along with the wrong conclusion. Hold to 26.4. 26.4 the card is corrected to `status: error` and `code: TIMEOUT`, the wrong row clears, and `isError: true` follows at 27.1. | The timeout is reported as an error, not as an empty list | ack A4 (B) · work A3 ×8 · **thump E3** (loudest) · store G4 ×2 (quiet) · send C6 · store C5 · **miss E4** · thump E3/G3 (quiet) |
| 4 | 29.0–36.0 | **The model preserves the uncertainty.** 29.2 a dot drops from B's card. 29.8 `B: unknown · timed out` in amber. 31.0 rows A and B are outlined together. Hold to 36. | Same empty screen, two different conclusions | send C6 · store C5 · ack C6 · chime C6 |
| 5 | 36.0–46.0 | **No tool result at all.** 36.0 B's fields are withdrawn, its card goes dashed and dim, and the state reads `transport timeout`. 37.0 `no tool result` appears. 38.2 a dot drops anyway. 38.8 `B: unknown · no result`. Hold 39–44.4, fade 44.4–45.6, then the title alone to 46. | The caller keeps the failure with no payload | clock ×2 · thump E3 (quiet) · send C6 · store C5 · ack C6 |

40 cues in total. Pitches are query C5, Run A E (work E4), Run B A (work A3), result payloads G, and answer C5/C6. Failures use `thump` and the trap uses `miss`. Empty success never gets a failure sound.

## Reproduce

From the repository root, using the pinned `puppeteer-core` 25.14.0 from the root `node_modules` and local Chrome:

```
node video/tool-design/motion-v2/04/engine/render.mjs video/tool-design/motion-v2/04/scene.js video/tool-design/motion-v2/04/video.mp4 --sheet video/tool-design/motion-v2/04/scratch/contact-sheet.png
```

The local engine copy adds `card` and `tick` (copied unchanged from cut 02's local engine) and a general `deadline` node (elapsed-time bar with a deadline tick). The shared skill and other cuts are unchanged.

## Lesson text sync (coordinator)

`sequence/lessons.json` item 4 declares duration 28 with beats at 0/7/14/21. For this cut, use duration 46.0 with beats at **0 / 9.0 / 16.0 / 29.0**. The transport-timeout coda (36.0) matches the lesson's takeaway text. This folder does not edit that file.
