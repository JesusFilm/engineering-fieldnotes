# Canary deployments · lesson 02 "Limit the exposure" · plan B

## The one idea

In one illustrative window of 10,000 requests, the router sends 9,000 to version 1 (current, the control) and 1,000 to version 2 (the candidate). The viewer should leave able to say three things:

1. A 90/10 split limits how many requests reach the candidate.
2. The two versions are counted and measured separately, each with its own denominator (n = 9,000 and n = 1,000).
3. The 1,000 candidate requests are still real traffic. A small share does not make the change safe, and it does not prove anything about safety.

Out of scope, so it does not appear on screen: error rates or failure counts (those come in a later lesson), pooled vs per-version arithmetic, statistical confidence, promotion steps, pause/abort gates, rollback, and replica weighting. Do not use the words "safe", "proof", "risk-free" or "%" in any positive sense next to v2.

## Accuracy rules for every frame

- The unit is a **request**. Every count label says "requests" or uses n. Never write "users" or "customers" next to a number.
- One grid cell is exactly 100 requests: 100 cells = 10,000, 90 cells = 9,000 and 10 cells = 1,000. Rolling counters must land on those exact values and only ever increase. At every instant, v1 + v2 on screen must equal the number of requests routed so far.
- The share is presented as *this window's* split. The window frame carries the label `window · 10,000 requests`. No "always" or "guaranteed" wording, and no hint that 10% is a recommended value.
- Harm is drawn as possible: the affected cells turn amber with a `?`, never red with a ×. A crash animation or failure count would assert a failure the lesson does not claim.
- One beat shows briefly that one client can send several requests (a request is not a unique user). It shows this through motion only and adds no numbers about users.

## Stage and legibility (1080×1920 source, judged at 350px wide)

At 350px the frame is scaled by 0.324, so a 24px label becomes about 8px and cannot be read. Minimum sizes for this cut:

| Element | Source size | At 350px |
|---|---|---|
| Title "Limit the exposure" | 92px bold | ≈30px |
| Node labels `v1` / `v2` | 72px bold | ≈23px |
| Sublabels `current` / `candidate` / `control` | 46px | ≈15px |
| Big counters `9,000` / `1,000` | 120px mono | ≈39px |
| Chips (`90%`, `10%`, `n = 1,000`) | 52px mono | ≈17px |
| Legend `1 cell = 100 requests` | 44px | ≈14px (the smallest text allowed) |

Allow no more than about 10 distinct words on screen at any moment. Each label must keep at least 40px of clear space from moving cells and ripples.

Colour roles stay consistent throughout. Neutral grey/white means unrouted requests. Teal `#3FB68B` is reserved for v1 cells, wire and node. Blue (`THEME.info`) is reserved for v2 cells, wire and node. Amber `#F5A524` is used only for the "exposed / could be affected" emphasis. Red is not used in this lesson.

Layouts change between beats so the eye always has one new focus:

- **Layout A (window):** a centred 10×10 grid of 64px cells with 14px gaps (≈766px square) at y≈760–1530. The window label sits above and the legend below.
- **Layout B (split):** a router box (`router`, 420×120) at y≈620. The grid's cells travel down two dotted wires into two receiving blocks. The v1 block, on the left at x≈330, holds a 9-column × 10-row grid of 40px cells. The v2 block, on the right at x≈850, holds a 1×10 column of 40px cells. Each block has its node label above and its counter below at y≈1560.
- **Layout C (measure):** the router dims to 30%. The two blocks pull apart into two side-by-side panels, each with its own counter and its own empty meter bar (`bar`, 360×18) labelled with its n. A thin vertical divider between the panels says "separate" without words.
- **Layout D (exposure):** the v1 panel dims to 40%. The v2 column scales up 1.6× to the centre-right and one of its cells zooms open (described in beat 5).

## Beat sheet (speed 1, ≈44 s total)

| Time (s) | What moves | State change | Sound |
|---|---|---|---|
| 0.0–1.2 | Title fades in. The empty grid outline draws row by row. | Stage set | very soft `clock` tick ×2, centre |
| 1.2–4.4 | Cells fill as a fast left-to-right sweep, 10 rows × 0.3 s. The `window` counter above rolls 0 → 10,000. | 100 grey cells; label `window · 10,000 requests` | One soft `send` tick per row (G6, gain 0.25), with a single `store` thud at 10,000 |
| 4.4–5.8 | The legend `1 cell = 100 requests` fades in under the grid, and one cell pulses to point at it. | Unit established | `ack` blip on the pulse |
| 5.8–7.6 | **Hold.** | — | silence |
| 7.6–9.0 | The grid shrinks and rises to y≈450 as a compact source. The router box draws in beneath it, then the two wires and the two empty blocks with labels `v1 · current` and `v2 · candidate`. | Layout B appears | low two-note intro: C4 (left pan) then E5 (right pan) so the two actors get their pitches before any traffic |
| 9.0–15.0 | **Slow first rows.** Cells leave the source one at a time through the router. For each row, cells 1–9 go left as teal dots (0.4 s travel, 0.12 s apart) and cell 10 goes right as a blue dot. Three full rows play at this pace (30 cells, ≈2 s per row). The router chevron flicks to the right port for every 10th cell. | Counters tick: v1 900 → 1,800 → 2,700, v2 100 → 200 → 300 | Every v1 arrival is a quiet low `arrive` at C4 (gain 0.3, panned left). Every v2 arrival is a brighter echoing `arrive` at E5 (gain 0.7, panned right). Rhythm per row: nine soft taps, then one bright note. |
| 15.0–19.0 | **Remaining seven rows accelerate**, about 0.55 s per row and tightening. The travel time shortens to 0.25 s so dots do not stack. | Counters roll to exact **9,000** and **1,000**. The source grid is empty. Chips `90%` and `10%` pop in beside the counters with overshoot. | The v1 taps blur into a soft brushed run. The v2 notes stay distinct at E5. A two-note landing plays: C4 thump left, E5 mallet right. |
| 19.0–21.0 | **Hold** on 9,000 / 1,000. | Split complete | silence |
| 21.0–23.0 | Router dims to 30%. The blocks slide apart into Layout C and the divider draws top to bottom. | Two separate panels | one soft `whoosh`-style noise sweep (custom `s.sound`, lp 1200 → 400) |
| 23.0–25.2 | The v1 sublabel changes in place, `current` → `control`, with a teal pulse. Under each panel a meter bar appears, labelled `n = 9,000` and `n = 1,000`. Each bar fills from its own counter, the left bar first and then the right, never pooled. | Each version has its own denominator | `store` at C4 left when the left meter fills, then `store` at E5 right when the right one fills (0.7 s apart) |
| 25.2–27.4 | **Hold.** The bars stay empty-coloured with no readings drawn, because this lesson only sets up the counts. | Measured separately | silence |
| 27.4–29.0 | Layout D: the v1 panel dims to 40%. The v2 column scales up and moves toward centre. The chip `10%` gains an amber outline. | Focus on the candidate | low `thump` (gain 0.4), right pan, the only dark sound so far |
| 29.0–32.0 | One v2 cell zooms open into a 10×10 micro-grid of 100 small blue squares, so one cell visibly contains 100 requests. Three small client icons (`laptop`/`phone`) appear beside it. One client sends three requests into the cell and another sends one. | A request is not a user | three quick `send` ticks from the first client and one from the second, panned to each client's x position |
| 32.0–34.5 | Some micro-squares in the open cell, plus about 2 of the 10 v2 cells, turn amber with a small `?` ripple, while all 90 v1 cells stay teal. The label `still affects real requests` (46px) fades in under the column. | Limited exposure is not zero exposure | custom `maybe` sound: a soft minor-second mallet pair, E5 then F5, unresolved. Do not use `crash` or `miss`. |
| 34.5–36.5 | **Hold.** | — | silence |
| 36.5–39.5 | Zoom closes. Both panels return to equal brightness. The final summary row is three chips at y≈1680: `9,000 → v1`, `1,000 → v2`, and `small ≠ proven safe`. The last chip appears with amber, unfilled styling. | Resolved message | `ack` per chip, then one neutral low C4+E5 dyad (not `chime`, which reads as success) |
| 39.5–42.0 | **Final hold**, still. | — | silence |
| 42.0–43.5 | `s.fade(42, 1, 1.2)` to black. | Ends in new state | soft tail of the dyad |

There are deliberate holds after the window lands, the split lands, the separate measurement lands and the exposure beat lands. Apart from those holds, nothing stays static for more than about 2.5 s. Avoid any long opening or closing padding beyond the 2.5 s final hold.

## Sound map

| Actor or event | Preset | Pitch / pan | Gain |
|---|---|---|---|
| Window fill tick | `send` | G6, centre | 0.25 |
| Window complete | `store` | C5, centre | 0.5 |
| v1 arrival (majority) | `arrive` | C4, pan from v1 x | 0.3 |
| v2 arrival (minority) | `arrive` | E5, pan from v2 x | 0.7 |
| Router choosing v2 | `ack` | high blip, centre | 0.35 |
| Panels separate | custom noise sweep | centre | 0.35 |
| Meter set per version | `store` | C4 left / E5 right | 0.45 |
| Focus on candidate | `thump` | right | 0.4 |
| Client sends | `send` | per client x | 0.3 |
| Possible harm | custom `maybe` (E5→F5) | right | 0.55 |
| Summary chips | `ack` | centre | 0.35 |
| Closing dyad | `arrive` C4+E5 layered | centre | 0.45 |

Pitch carries the ratio: across the first three rows the ear hears nine soft low taps, then one bright high note, repeated three times. The `maybe` cue is the loudest event, but it stays below a crash level so it does not imply that a failure happened. Keep peak below −1 dBFS and check that the quiet v1 taps remain audible under the stream.

## Engine work (local copy only)

Copy `scripts/` from the skill into the cut folder (`video/canary-deployments/motion-v2/02/<variant>/engine/`) and add one generic node type:

- **`grid`**: options `cols rows cell gap`. Animated props are `cell{i}Color`, `cell{i}Alpha`, `cell{i}Scale`, `count` (number of visible cells, filled in reading order), `color` and `label`. Read every value through `p()` and register the half-size in `s.pt`. This one node serves the source window, both receiving blocks and the zoomed micro-grid.
- **Counter**: use the `label` node with text switched in steps of 100. Schedule one `s.set(..., 'text', ..., 0)` per arriving cell so the counter always equals arrived cells × 100. Avoid free-running tweens, which would show values that do not match the dots.

Keep the cut's scene, engine copy and render command in the variant folder. Scratch stills stay out of Git.

## Verification before review

1. Dry-run in Node. Assert 90 v1 and 10 v2 arrival cues, that the final counter texts are exactly `9,000` and `1,000`, that v1 + v2 equals routed cells at each cue, and that the duration is ≈43.5 s.
2. Render stills at 2.5, 6.5, 12, 18, 20, 24.5, 26.5, 31, 33.5, 35.5, 38 and 41 s. Downscale each to 350px wide and check every word is readable and nothing overlaps. Separately inspect each beat boundary (7.6, 21, 27.4, 36.5) for leftover state.
3. Full render. Then check the contact sheet, a spectrogram showing one cue per meaningful event with the v2 notes visibly separate from the v1 taps, `volumedetect` (max < −1 dB), a full decode with `ffmpeg -v error -f null`, ffprobe duration plus the audio stream, and faststart metadata.
4. Record whether audio was actually listened to or only analysed.
5. Copy check against this lesson's intent. Look for any frame that implies users, a guarantee, causation, statistical confidence, zero risk, or an actual failure, and fix any such frame before handing over for comparative review.

## Risks to watch

- The 100-cell flow could read as busy. If it does, keep the slow pace for only two rows and speed up sooner. Do not cut the per-row ratio, because the ratio is the lesson.
- The amber `?` beat could be read as "v2 is broken". Keep it short and unresolved, and pair it with the exact label `still affects real requests`.
- The client icon beat could become a digression. Cap it at 3 s and add no extra text.

