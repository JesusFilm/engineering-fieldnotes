# Lesson 03 — Return usable evidence — plan B

Independent plan for the motion-v2 cut of tool-design lesson 03. Authored from the lesson entry in `video/tool-design/sequence/lessons.json` (item 3) and the concept content in `content/concepts/tool-design.json`. No other plan for this lesson, no ledger, and no authoring source was consulted. This document names no authoring model.

## Scope

One mechanism: **a result is usable as evidence when it carries record identifiers, short summaries, and the scope that was searched; the model's answer can then cite those records, a reader can check the citations, and the answer's claims stay inside the searched scope.**

The viewer should feel the difference between an answer resting on a bare `ok` (nothing to point at) and one resting on IDs with a searched interval (every claim has a row behind it), and then feel the scope line being crossed: a claim about the whole day lights the unsearched parts of the timeline red and is pulled back to the hour that was actually searched.

Grounding (from the concept): the example returns "incident IDs, short summaries, the searched interval, and a continuation cursor"; the judgement says keep IDs for follow-up reads and evaluate concise output without omitting uncertainty, pagination, or evidence; the pitfall warns that dropping coverage fields makes a short result look exhaustive; the takeaway says a valid shape does not prove completeness and provenance must be exposed to evaluate the result.

Out of scope: empty, partial, and error statuses and the cursor (later lessons), the call itself and its validation (lessons 01–02), the model's reasoning, and the engineer's triage decision. The cut ends when the answer's claims are back inside the searched interval.

Grammar for this cut: **a result payload that grows, a timeline bar with a searched segment and incident marks, an answer card with a status badge, and a citation wire.** The payload is a store whose rows appear as the result gains IDs, summaries, and the interval. The timeline is a `bar` with three segments (before, searched, after) and `s.mark` dots for the two incidents at their times. The answer is a store whose rows are claims; a wire from the answer to the payload lights when a claim cites a row; a wire from the answer to the bar lights when a claim's scope is compared with the searched segment. This differs from lesson 01 (slot-filling card) and lesson 02 (two lists with a check lane and a gated wire), from the context-engineering cuts, the loop-engineering cuts, and the harness-engineering views. Every element is a software object: a result field, a record ID, a time interval, a claim, a citation.

Target length ≈ 31 s at playback. Authored at speed 1 for 27.5 s with `meta.speed: 0.9`. Lengthen the hold after the citations light and the hold on the red over-claim first if stills read fast. Do not add beats to reach the guideline.

## Stage and coordinates (1080 × 1920)

Palette and type follow `references/style.md`. Names are 40–44 px; store rows, sublabels, and bar labels are 36 px monospace (≈ 21.6 px per character). Everything stays readable at 350 px wide (≈ 12–13 px for the smallest). If packet chip text renders below 40 px, add a `labelSize` option in the local engine copy and report it.

| id | type | centre (x, y) | size | text | notes |
|---|---|---|---|---|---|
| title | title band | (540, 330) / (540, 405) | — | **Tool design** / RETURN USABLE EVIDENCE | engine title + subtitle |
| result | store, `rows: 4`, w 620 | (540, 700) | 620 × ≈ 300 (x 230–850, y ≈ 550–850); row centres y ≈ 610, 670, 730, 790 | label `result` 40 px at (540, 510); rows 36 px mono | row0 `status  ok` · row1 `INC-204  checkout 5xx` · row2 `INC-207  slow refunds` · row3 `searched 09:00–10:00Z` accent (max 21 characters ≈ 454 px); rows 1–3 hidden until beat 2 |
| timeline | bar, `segments: 3` | (540, 980) | 840 × 16 (x 120–960) | labels `06Z` 36 px mono at (120, 1030), `12Z` at (960, 1030), `09–10Z searched` accent at (540, 1030) (hidden until beat 2) | seg0 0.5 dim (06–09), seg1 0.167 accent (09–10), seg2 0.333 dim (10–12); marks at pos 0.556 (09:20) and 0.625 (09:45) |
| answer | store, `rows: 3`, w 760 | (540, 1250) | 760 × ≈ 240 (x 160–920, y ≈ 1130–1370) | label `answer` 40 px at (540, 1095); rows 36 px mono | row0 `incidents? ok` mid → `2 incidents · 09–10Z` ok · row1 `INC-204 · INC-207` · row2 `no other incidents today` bad → `06–09, 10–12: not searched` mid (max 26 characters ≈ 562 px) |
| badge | badge | (900, 1130) | — | `uncheckable` mid → `checkable` ok | top-right corner of the answer |
| model | box | (540, 1540) | 480 × 140 (x 300–780, y 1470–1610) | label `model` 44 px; sublabel `drafts answer` 36 px | |

Wires (dotted, resting `#3A3E45`):

| id | from | to | via | meaning |
|---|---|---|---|---|
| write | model.top (540, 1470) | answer.bottom (540, 1370) | — | the model writes claims into the answer |
| cite | answer.right (920, 1250) | result.right (850, 700) | [1010, 1250], [1010, 700] | a claim points at the rows that support it |
| scope | answer.left (160, 1250) | timeline.left (120, 980) | [70, 1250], [70, 980] | a claim's scope is compared with the searched segment |

The two wires from the answer leave on opposite sides so citing (right) and scoping (left) are told apart by direction. The bar sits between the payload and the answer with its labels below it, and no wire crosses it. Stage spans y ≈ 510–1610.

## Sound map

Pitches: result **G5**, timeline **E5**, answer **A5**, model **C5**. Pan by x: `cite` traffic right (`+0.5`), `scope` traffic left (`−0.5`), marks panned to their position on the bar, everything else centre.

| event | preset | notes |
|---|---|---|
| bare status appears | `store` | G5, quiet |
| model appears | `ack` | C5 |
| a claim is written | `send` C6, `store` A5 | per answer row |
| citation finds nothing | `miss` | gain ×0.7, pan right |
| badge `uncheckable` | `ack` | low (C4), quiet |
| a record row appears | `store` | G5 |
| its mark lands on the bar | `ack` | E5, panned to the mark |
| searched interval appears | `store` G5, `ack` E5 | the bar segment turns accent |
| citation lights rows | `hit` | ×2, pan right; the interval row adds `ack` G5 |
| badge `checkable` | `chime` | the brightest event |
| over-claim written | `store` | A5, lower gain |
| scope check leaves | `send` | A6, pan left |
| claim exceeds the searched segment | `miss` | pan left, with two red × ripples on the unsearched segments |
| claim pulled back inside | `ack` | E5 then `ack` A5 |

## Beat sheet (times at speed 1)

| t | what moves | state change | sound |
|---|---|---|---|
| **Beat 1 — A bare success flag is not enough (0.0–7.0)** | | | |
| 0.0 | — | result rows hidden; timeline hidden (alpha 0); answer rows hidden; badge hidden | — |
| 0.6 | result row0 pops | `status  ok` fg | store G5 (quiet) |
| 1.4 | model pops | sublabel `drafts answer` | ack C5 |
| 2.0–2.4 | dot (fg) model.top → answer.bottom, 0.4 s | — | send C6 |
| 2.4 | answer row0 pops | `incidents? ok` mid | store A5 |
| 3.0–4.0 | dot (mid) answer.right → via → result.right, 1.0 s | — | — |
| 4.0 | mid ripple with × at result.right | there is no row to point at beyond `ok` | miss (quiet) |
| 4.4 | badge pops | `uncheckable` mid | ack (low, quiet) |
| 4.4–7.0 | hold | one flag, one vague claim, nothing to check | |
| **Beat 2 — Return IDs, summaries, and the searched interval (7.0–11.5)** | | | |
| 7.0 | result row1 pops; timeline fades in (alpha 0 → 1, 0.5 s) with all three segments dim | `INC-204  checkout 5xx` fg | store G5 |
| 7.5 | mark drops at pos 0.556 | accent dot above the bar | ack E5 |
| 7.8 | result row2 pops | `INC-207  slow refunds` fg | store G5 |
| 8.3 | mark drops at pos 0.625 | accent dot above the bar | ack E5 |
| 8.8 | result row3 pops | `searched 09:00–10:00Z` accent; bar seg1 → accent with pulse; `09–10Z searched` label fades in | store G5, ack E5 |
| 9.2 | — | answer row0 alpha → 0.4 (the old claim is stale) | — |
| 9.2–11.5 | hold | two IDs with summaries, one searched hour on the bar | |
| **Beat 3 — The model cites the records (11.5–17.5)** | | | |
| 11.5 | model pulses | — | send C6 |
| 11.9 | answer row0 text swap | `2 incidents · 09–10Z` ok, alpha 1 | store A5 |
| 12.5 | answer row1 pops | `INC-204 · INC-207` fg | store A5 |
| 13.0–14.0 | dot (ok) answer.right → via → result.right, 1.0 s; `cite` wire `flow` → 1, colour accent | — | — |
| 14.0 / 14.3 | result rows 1 and 2 pulse ok | rows 1–2 → ok | hit × 2 |
| 14.6 | result row3 pulses | — | ack G5 |
| 15.0 | badge pops | `checkable` ok | chime |
| 15.4 | — | `cite` wire `flow` → 0, colour → fg | — |
| 15.4–17.5 | hold | every claim has a row behind it | |
| **Beat 4 — Keep claims within the returned scope (17.5–27.5)** | | | |
| 17.5 | model pulses | — | send C6 |
| 17.9 | answer row2 pops | `no other incidents today` bad | store A5 (quiet) |
| 18.5–19.3 | dot (bad) answer.left → via → timeline.left, 0.8 s; `scope` wire colour → bad | — | send A6 |
| 19.3 | bar seg0 and seg2 flash bad; bad ripples with × at (330, 980) and (820, 980) | the claim covers hours that were not searched | miss |
| 19.3–21.3 | hold | the two red × sit on the unsearched segments | |
| 21.3 | answer row2 text swap | `06–09, 10–12: not searched` mid | store A5 (quiet) |
| 21.7 | — | seg0 and seg2 → dim; `scope` wire → fg; ok ripple at (540, 1030) | ack E5 |
| 22.1 | badge pulses ok | — | ack A5 |
| 22.1–26.0 | hold | final state: four-row result, searched hour on the bar with two marks, three-row answer inside scope, `checkable` | |
| 26.0–26.8 | — | `s.fade` to black, 0.8 s | — |
| 27.5 | end | finite ending | |

## Accuracy limits

- The incident IDs, summaries, times, and interval are illustrative, drawn from the concept's example. The bar covers 06:00–12:00Z so that a one-hour window is visible at 350 px; a real day is longer and the proportions are not to scale.
- The result omits the continuation cursor that the concept's example returns; pagination and partial coverage belong to later lessons. The cut's `searched` row stands for the interval field; a real result may also carry a coverage statement.
- `status  ok` as a bare flag is the lesson's contrast case; the cut does not claim any particular tool returns only that.
- The answer rows are compressed claims (`2 incidents · 09–10Z`). Real answers are prose; the cut shows what each claim rests on, not its wording.
- The over-claim `no other incidents today` is the pitfall of treating a short result as exhaustive. The cut shows it as the model's draft being corrected; it does not represent any measured behaviour.
- Citing a record does not establish the incident's root cause or that the backend data is complete, consistent with the takeaway.
- No `poof` is used in this cut. The two `miss` sounds mark absence (nothing to cite) and excess (claim outside scope), not tool failures.

## Acceptance checks

1. **Stills per beat** at playback seconds (speed 0.9): `6.0, 11.5, 17.5, 22.5, 27.0, 30.0` (speed-1 ≈ 5.4, 10.4, 15.8, 20.3, 24.3, 27.0). Tile with ffmpeg and view the row; view the 17.5 s (citations lit) and 22.5 s (red over-claim) stills at full size and at 350 px wide. Pass when all result and answer rows are readable at 350 px, the two marks on the bar are distinguishable and sit inside the accent segment, the three bar labels are readable, the badge is readable in both states, and the red × ripples at 22.5 s sit on the dim segments and not on the accent one.
2. **Nothing to cite**: at 6.0 s the result shows only `status  ok`, the answer shows one mid row, and the badge reads `uncheckable`; the bar is not yet visible.
3. **Marks follow rows**: each mark lands after its record row appears (speed-1 7.0 → 7.5 and 7.8 → 8.3); the searched segment turns accent together with the interval row.
4. **Citations light rows**: at 17.5 s result rows 1 and 2 are ok, the `cite` wire has returned to fg, and the badge reads `checkable`.
5. **Scope line**: between 19.3 and 21.3 s (speed 1) the `scope` wire is bad and segments 0 and 2 are bad while segment 1 stays accent; at 27.0 s segments 0 and 2 are dim again and row2 reads `06–09, 10–12: not searched`.
6. **No lingering state**: no chip or dot remains during any hold; the stale first claim is replaced (not duplicated) at 11.9 s; the `09–10Z searched` label is visible from 8.8 s onward.
7. **Overlap**: the `cite` dot's path at x = 1010 must stay inside the frame and clear of the badge at (900, 1130); the `scope` dot's path at x = 70 must clear the `06Z` label; marks must not collide with the `result` panel's bottom edge (marks at y ≈ 955, panel bottom at 850). Rows at 36 px mono (26 characters ≈ 562 px) fit inside 760 px; result rows (21 characters ≈ 454 px) fit inside 620 px with padding.
8. **Word budget**: on-screen text is the result label and four rows, three bar labels, the answer label and three rows, the badge, and the model label and sublabel. No sentence appears.
9. **Audio**: the Node dry-run lists ≈ 32 cues (store, ack, send/store, miss, ack, 3 stores with 3 acks, send, 2 stores, 2 hits, ack, chime, send, store, send, miss, store, 2 acks). The spectrogram shows two `miss` events (4.0 s and 19.3 s), two `hit` sparkles at 14.0–14.3 s, and the `chime` at 15.0 s as the brightest. `ffprobe` reports ≈ 31 s with an audio stream. Record whether audio was heard or only analysed.
10. **Causal reading test**: with sound off and every word removed, a viewer should still see: a one-row panel at the top; a bottom box writes one grey row into a middle card; a dot from the card to the top panel gets a grey ×, and a grey tag appears; the top panel gains three rows while a bar appears with two dots over its bright segment; the box writes two rows into the card; a dot runs right and up, two top rows flash green, and the tag turns green; the box writes a red row; a dot runs left and up to the bar, whose outer segments flash red with ×; the red row turns grey and the outer segments settle.
11. **Project checks** after encoding: `python3 scripts/check_media.py --concept tool-design`, then the full set before any release proposal. A new encode needs its own comparison review.

