# Lesson 04 — Empty versus failed — plan B

Independent plan for the motion-v2 cut of tool-design lesson 04. Authored from the lesson entry in `video/tool-design/sequence/lessons.json` (item 4) and the concept content in `content/concepts/tool-design.json`. No other plan for this lesson, no ledger, and no authoring source was consulted. This document names no authoring model.

## Scope

One mechanism: **a search that completed and found nothing and a search that timed out are different outcomes; the first returns success with an empty list and supports "no matches in that scope", the second must return an error result (or, if no result arrives at all, be preserved as a failure), and the model's conclusion for each must differ.**

The viewer should feel the two runs side by side: both end with nothing to show, but one search bar fills to the end while the other stalls at the deadline; the moment the stalled run produces the same `items []` card as the completed one is the trap, marked and replaced by an error card; and the conclusion panel ends with `no matches` for one and `unknown` for the other.

Grounding (from the concept): "returning an empty list after a timeout can turn missing evidence into a confident claim that nothing happened"; the example says a completed empty search returns `status=ok` with `items=[]`, a backend timeout returns `status=error` with `code=TIMEOUT`, with MCP reporting execution failure via `isError=true`, and "a client-side transport timeout may produce no tool result at all; the caller must preserve that failure too"; the pitfall is catching every exception and returning `[]`; the exercise's success criterion is that the timeout fixture never produces an unqualified "no incidents" conclusion.

Out of scope: retries and attempt budgets (a later lesson), partial results and cursors, the call and its validation (lessons 01–02), provenance fields beyond the status (lesson 03), and what the engineer does with an unresolved lookup. The cut ends when the conclusion panel holds three distinct rows.

Grammar for this cut: **two parallel columns with a deadline bar each, a result card each, and one shared conclusion panel.** Each column has a backend store, a search bar with a deadline tick, and a two-row result card. The conclusion panel below collects one row per run. The trap is the stalled column briefly producing a card identical to the completed one; the correction swaps its rows to an error. The coda dashes the stalled column's result wire so no card arrives at all. This differs from lesson 01 (slot-filling card), lesson 02 (two lists with a check lane), lesson 03 (payload, timeline, and answer), from the context-engineering and loop-engineering cuts, and from the harness-engineering views. Every element is a software object: a backend, a search with a deadline, a status field, a conclusion row.

Target length ≈ 35 s at playback. Authored at speed 1 for 31.5 s with `meta.speed: 0.9`. Lengthen the hold on the identical-card trap and the hold after the error card first if stills read fast. Do not add beats to reach the guideline.

## Stage and coordinates (1080 × 1920)

Palette and type follow `references/style.md`. Names are 40–44 px; store rows, sublabels, and bar labels are 36 px monospace (≈ 21.6 px per character). Everything stays readable at 350 px wide (≈ 12–13 px for the smallest). If packet chip text renders below 40 px, add a `labelSize` option in the local engine copy and report it.

| id | type | centre (x, y) | size | text | notes |
|---|---|---|---|---|---|
| title | title band | (540, 330) / (540, 405) | — | **Tool design** / EMPTY VERSUS FAILED | engine title + subtitle |
| labA / labB | label | (300, 520) / (780, 520) | 40 px mono | `run A` / `run B` | column headers |
| dbA / dbB | db | (300, 640) / (780, 640) | w ≈ 120 | label `backend` 36 px at y 715 under each | `busy` spins while searching |
| barA / barB | bar, `ticks: 1`, `segments: 1` | (300, 820) / (780, 820) | 360 × 14 | label `search · 2 s` 36 px | the end tick is the deadline; A fills to 1.0 in fg → ok; B fills to 0.6 and stops, turning bad |
| resA / resB | store, `rows: 2`, w 400 | (300, 1010) / (780, 1010) | 400 × ≈ 130 (y ≈ 945–1075) | rows 36 px mono, hidden until returned | A: `status  ok` ok · `items   []` fg. B trap: `status  ok` mid · `items   []` mid; B corrected: `isError  true` bad · `code     TIMEOUT` bad; coda: both rows `—` dim (max 15 characters ≈ 324 px) |
| conclusion | store, `rows: 3`, w 760 | (540, 1300) | 760 × ≈ 200 (x 160–920, y ≈ 1200–1400) | label `conclusion` 40 px at (540, 1160); rows 36 px mono | row0 `A  no matches in 09–10Z` ok · row1 `B  unknown · timed out` accent · row2 `B  no result · unresolved` accent (max 25 characters ≈ 540 px) |
| model | box | (540, 1540) | 480 × 130 (x 300–780, y 1475–1605) | label `model` 44 px; sublabel `writes conclusions` 36 px | |

Wires (dotted, resting `#3A3E45`):

| id | from | to | via | meaning |
|---|---|---|---|---|
| retA / retB | dbA.bottom (300, 700) / dbB.bottom (780, 700) | resA.top (300, 945) / resB.top (780, 945) | — | the tool result travels from the backend search to the result card, passing the bar; in the coda `retB` turns dashed and bad |
| concA | resA.bottom (300, 1075) | [300, 1200] | — | A's card feeds its conclusion row |
| concB | resB.bottom (780, 1075) | [780, 1200] | — | B's card feeds its conclusion row |
| write | model.top (540, 1475) | conclusion.bottom (540, 1400) | — | the model writes rows |

The two columns are mirror images so the eye compares them; the only differences are the bar's fill, the card's text, and the conclusion row. Stage spans y ≈ 520–1605.

## Sound map

Pitches: run A **E5**, run B **A5**, result cards **G5**, conclusion and model **C5**. Pan by x: A left (`−0.5`), B right (`+0.5`), conclusion and model centre.

| event | preset | notes |
|---|---|---|
| a run is named | `ack` | E5 / A5 |
| a search runs | `work` | every 0.2 s while the bar fills, panned to the column |
| A reaches the end | `ack` | E5, gain ×1.3 |
| a card is returned | `send` then `store` | G5, ×2 rows |
| a conclusion row is written | `send` C6, `store` C5 | |
| A's conclusion is supported | `hit` | |
| B hits the deadline | `thump` | gain ×1.2, pan right, with `s.shake` on dbB |
| the identical card appears | `store` | G5, quiet, ×2 |
| the trap is marked | `miss` | pan right; red × over the card |
| the card is corrected | `thump` | gain ×0.6, ×2 for the two rows |
| B's conclusion preserves uncertainty | `store` C5 then `ack` C6 | |
| both conclusions distinct | `chime` | the brightest event |
| no result arrives | `clock` × 2 then `miss` (gain ×0.7) | the wire dashes; the card blanks |
| the missing result is preserved | `store` C5, `ack` C6 | |

## Beat sheet (times at speed 1)

| t | what moves | state change | sound |
|---|---|---|---|
| **Beat 1 — A completed search finds no matches (0.0–6.0)** | | | |
| 0.0 | — | both bars empty; cards hidden; conclusion rows hidden; column B at alpha 0.5 | — |
| 0.6 | `run A` pulses | — | ack E5 |
| 1.0–2.6 | `barA` `seg0` 0 → 1 linear; dbA `busy` → 1 | — | work × 8 (pan left) |
| 2.6 | `barA` pulses | seg0 colour → ok; dbA `busy` → 0 | ack E5 (louder) |
| 2.6–4.5 | hold | a search that ran to its end and found nothing | |
| **Beat 2 — Return success and an empty list (4.5–11.0)** | | | |
| 4.5–5.1 | chip `result` (fg) dbA.bottom → resA.top, 0.6 s | — | send E6 |
| 5.1 / 5.5 | resA rows pop | `status  ok` ok · `items   []` fg | store G5 × 2 |
| 6.3–6.9 | dot (ok) resA.bottom → [300, 1200], 0.6 s; model pulses | — | send C6 |
| 6.9 | conclusion row0 pops | `A  no matches in 09–10Z` ok | store C5, hit |
| 6.9–9.0 | hold | ok, empty, and a bounded conclusion | |
| 9.0 | — | column A → alpha 0.6; column B → alpha 1 | — |
| 9.0–11.0 | hold | | |
| **Beat 3 — A backend timeout; the same empty list would be a trap (11.0–20.0)** | | | |
| 11.0 | `run B` pulses | — | ack A5 |
| 11.4–12.6 | `barB` `seg0` 0 → 0.6 linear; dbB `busy` → 1 | — | work × 6 (pan right) |
| 12.6–13.4 | — | fill holds at 0.6; the end tick pulses twice | clock × 2 |
| 13.4 | dbB shakes ±10 px; `barB` seg0 → bad; bad ripple at the end tick | dbB `busy` → 0 | thump |
| 13.4–14.6 | hold | a search that did not reach its end | |
| 14.6–15.2 | chip `result` (mid) dbB.bottom → resB.top, 0.6 s | — | send A6 (quiet) |
| 15.2 / 15.6 | resB rows pop in mid | `status  ok` · `items   []`, identical to A | store × 2 (quiet) |
| 16.2 | bad ripple with × over resB (r1 ≈ 90) | resB stroke → bad | miss |
| 16.2–17.8 | hold | two identical cards, one true, one false | |
| 17.8 / 18.2 | resB rows swap | `isError  true` bad · `code     TIMEOUT` bad | thump × 2 (quiet) |
| 18.2–20.0 | hold | the cards now differ | |
| **Beat 4 — The model preserves the uncertainty (20.0–25.0)** | | | |
| 20.0–20.6 | dot (accent) resB.bottom → [780, 1200], 0.6 s; model pulses | — | send C6 |
| 20.6 | conclusion row1 pops | `B  unknown · timed out` accent | store C5, ack C6 |
| 21.2 | conclusion rows 0 and 1 pulse together | — | chime |
| 21.2–25.0 | hold | the same empty screen, two different conclusions | |
| **Beat 5 — No result at all is also a failure (25.0–31.5)** | | | |
| 25.0 | `run B` pulses | — | ack A5 |
| 25.3–26.3 | — | `retB` wire `dashed` → 1, colour → bad; resB rows → `—` dim; resB stroke → dim | clock × 2 |
| 26.3 | bad ripple with × at the midpoint of `retB` (780, 820) | nothing arrived | miss (quiet) |
| 26.3–27.5 | hold | | |
| 27.5–28.1 | dot (accent) [780, 1075] → [780, 1200], 0.6 s; model pulses | — | send C6 |
| 28.1 | conclusion row2 pops | `B  no result · unresolved` accent | store C5, ack C6 |
| 28.1–30.0 | hold | final state: three distinct conclusion rows; A ok, B error, B no result | |
| 30.0–30.8 | — | `s.fade` to black, 0.8 s | — |
| 31.5 | end | finite ending | |

## Accuracy limits

- The fields `status`, `items`, `isError`, and `code` follow the concept's example. The concept states that `status` and `code` are illustrative application fields, not mandatory MCP fields, and that MCP signals execution failure with `isError=true`; the corrected card shows both so the two signals are seen together, not as a claim about one protocol's schema.
- The deadline of 2 s is a teaching value; the bar's fill does not represent real timing.
- The trap card (`status ok · items []` after a timeout) depicts the pitfall "catching every exception and returning []"; the cut shows it as a wrong response that is replaced, not as any particular library's behaviour.
- Conclusion rows are compressed claims. `no matches in 09–10Z` is bounded to the searched interval, consistent with lesson 03; `unknown · timed out` and `no result · unresolved` stand for the model preserving uncertainty, and the cut does not show what should happen next (retries belong to a later lesson).
- The coda's dashed wire stands for a client-side transport timeout in which no tool result arrives. The cut cannot show where the failure occurred, only that the caller received nothing and recorded that.
- Column B is reused for the coda; it is the same run shown with a different failure, not a third search.
- No `poof` is used. The three `thump` sounds mark the deadline and the error rows; the two `miss` sounds mark the trap and the absent result.

## Acceptance checks

1. **Stills per beat** at playback seconds (speed 0.9): `4.0, 9.0, 18.5, 21.5, 25.0, 32.5` (speed-1 ≈ 3.6, 8.1, 16.7, 19.4, 22.5, 29.3). Tile with ffmpeg and view the row; view the 18.5 s (identical cards) and 32.5 s (three conclusions) stills at full size and at 350 px wide. Pass when both bars and their end ticks are readable at 350 px, the two cards' rows are readable, the identical cards at 18.5 s read as identical except for colour and the red × over B, the error rows at 21.5 s are clearly red, and all three conclusion rows are readable.
2. **Completed before empty**: at 4.0 s barA is full and ok with no card yet; at 9.0 s A's card and conclusion row are present and B is dim.
3. **The trap is explicit**: between 15.6 and 17.8 s (speed 1) resB's rows read exactly `status  ok` and `items   []` in mid with a bad stroke and a red ×; they are replaced, not appended.
4. **Distinct conclusions**: at 25.0 s rows 0 and 1 read `A  no matches in 09–10Z` (ok) and `B  unknown · timed out` (accent); no conclusion row ever reads "no incidents" unqualified.
5. **No result preserved**: at 32.5 s `retB` is dashed and bad, resB shows two `—` rows, and conclusion row2 reads `B  no result · unresolved`.
6. **No lingering state**: no chip remains during any hold; dbA and dbB spinners are off outside their search windows; barB stays at 0.6 and bad from 13.4 s onward.
7. **Overlap**: the `result` chips on `retA`/`retB` must not cover the bar labels at y ≈ 850 (let them fade across the bar or route via x ± 60); the conclusion dots must land at the panel's top edge without crossing the `conclusion` label at y = 1160 (shift the label to (540, 1150) if they do). Card rows at 36 px mono (15 characters ≈ 324 px) fit inside 400 px; conclusion rows (25 characters ≈ 540 px) fit inside 760 px with padding.
8. **Word budget**: on-screen text is two run labels, two backend labels, two bar labels, up to four card rows, the conclusion label and three rows, and the model label and sublabel. No sentence appears.
9. **Audio**: the Node dry-run lists ≈ 45 cues (ack, 8 works, ack, send, 2 stores, send, store/hit, ack, 6 works, 2 clocks, thump, send, 2 stores, miss, 2 thumps, send, store/ack, chime, ack, 2 clocks, miss, send, store/ack). The spectrogram shows the `thump` at 13.4 s as the loudest event, two `miss` events at 16.2 s and 26.3 s, and the `chime` at 21.2 s as the brightest. `ffprobe` reports ≈ 35 s with an audio stream. Record whether audio was heard or only analysed.
10. **Causal reading test**: with sound off and every word removed, a viewer should still see: the left bar fills to its end and turns green; a card appears below it and a green row appears in the bottom panel; the right bar fills partway and stops red while the cylinder above it shakes; a grey card identical to the left one appears and gets a red ×; its rows turn red; an orange row appears in the bottom panel; the right column's wire turns dashed red, its card blanks, and a third orange row appears.
11. **Project checks** after encoding: `python3 scripts/check_media.py --concept tool-design`, then the full set before any release proposal. A new encode needs its own comparison review.

