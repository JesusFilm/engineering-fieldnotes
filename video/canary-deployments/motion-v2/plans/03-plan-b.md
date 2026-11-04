# Lesson 03 plan B: An average hides failure

## Lesson

One mechanism: the same 40 failures produce very different rates depending on the denominator. Pooled across 10,000 requests they are 0.4%, below an illustrative 1% overall alert. Split out the v2 export slice (100 requests) and the same 40 are 40%. The viewer should feel this as one fixed patch of red that looks tiny in a big field and then fills a large share of a small one.

Fixed arithmetic, shown and never contradicted:

| Group | Requests | Fail | Succeed |
|---|---|---|---|
| v2 · export | 100 | 40 | 60 |
| all other requests | 9,900 | 0 | 9,900 |
| total | 10,000 | 40 | 9,960 |

- Overall: 40 / 10,000 = 0.4%. Slice: 40 / 100 = 40%. Rest: 0 / 9,900.
- The 40 failures exist once. Every view moves or highlights the same red marks; no beat adds a second set. The denominator splits as 10,000 → 9,900 + 100, and both parts stay on screen together, so the sum stays visible.
- "All other requests" is never broken into v1 and v2 or into v1 export. The v1 control comparison (0/900) belongs to a later lesson.

Things the video must not claim: why v2 exports fail (no code, diff or bug icon), how many users were affected (requests are squares, never people, phones or faces), that 1% is a universal or recommended threshold (it appears once, labelled as the overall alert, and is never applied to the slice), or any automatic action (no rollback, pause, abort, gate or traffic shift). The ending shows the split; it does not show a decision.

## Visual idea: one grid, two denominators

The main actor is a 10×10 waffle grid, centred around y≈1000, about 760 px wide. Each of its 100 cells stands for 100 requests, so the grid is exactly 10,000. One cell (row 7, column 7, away from edges and corners) is the v2 export cell, with an orange (accent) outline. Its 40 failures appear as a red fill covering the bottom 40% of that one cell. Measured against the whole grid, the red covers 0.4% of the area, which matches the overall rate exactly.

Later that cell lifts out and expands into its own 10×10 grid of single requests: 60 teal, 40 red (the bottom four rows). The red area that was a sliver now covers four of ten rows. Same red, smaller denominator. This one transform carries the lesson, so the motion is slow (about 1.4 s, ease in-out) and nothing else moves while it plays.

Layout varies by beat, which avoids the stock top-to-bottom request flow:

- Beats 1–2: the grid is centred, with a narrow "requests" source bar above it and counters below.
- Beat 3: the grid shrinks and moves up. A fraction and a horizontal gauge take the lower half.
- Beats 4–5: two columns. The left column is the 99 remaining cells compacted, and the right column is the expanded slice. Each column has its own fraction underneath.

Engine work: copy the skill's `scripts/` beside the scene, following the skill's shared-install rule, and add one generic node type, `grid` (options `cols rows cell gap`; animated props `cell{i}Fill`, `cell{i}Color`, `cell{i}Stroke`, `cell{i}Red` for the red fraction measured from the bottom, plus `alpha scale`). Use the existing `bar` with `ticks` for the gauge and the existing `label`/`badge` nodes for numbers. List the engine change in the handover.

## Legibility at an actual 350 px width

At 350 px a 1080 px frame scales by 0.324, so the skill's 24 px floor would come out under 8 px. Use these sizes instead (1080 frame px → approximate 350 px result):

- Key numbers (10,000 · 0.4% · 40% · 40 / 100): 120–150 px → 39–49 px.
- Fractions and counters: 84–96 px → 27–31 px.
- Labels ("v2 · export", "all other", "overall", "1% alert", "■ = 100 requests"): 56–64 px, minimum 52 → 17–21 px.
- Cell size: overview grid cells are about 64 px with 10 px gaps (about 21 px at 350). The red sliver in the v2 cell is about 26 px tall (about 8 px at 350), visible but small, which is the point. The orange outline is 6 px so the cell stays findable.
- Never more than five words in one label, and never more than four labels on screen at once. No sentences.

The check renders every beat still, then scales it with `ffmpeg -vf scale=350:-1` and views it at actual size. The plan fails if any label needs zooming to read.

## Beat sheet (speed 1, about 44 s with the fade)

| Time | What moves | State change | Sound |
|---|---|---|---|
| 0.0–1.2 | Title "Canary deployments", subtitle "AN AVERAGE HIDES FAILURE" fade in. Empty grid outline draws in. | Stage set | Soft low pad tick (clock, gain 0.3) |
| 1.2–5.2 | **B1 traffic.** Dots stream from the source bar into the grid, filling cells row by row in grey (10 rows, 0.4 s per row). When the stream reaches row 7, the v2 export cell fills with an orange outline. | Cells go idle → filled grey. Counter rolls 0 → "10,000 requests". Legend "■ = 100 requests" appears at the first row. | One quiet send per row on C5 (gain 0.25, panned by row centre); the v2 export cell gets its own G5 arrive note, louder (0.6), so the slice has a voice |
| 5.2–6.6 | Label "v2 · export · 100" slides in under the grid with a short orange leader to the cell. | Slice identified | Second G5 note (echo) as the label lands |
| 6.6–8.4 | **Hold.** | — | silence |
| 8.4–10.4 | **B2 outcomes.** A teal wash sweeps the 99 other cells (diagonal, 1.2 s). The v2 cell turns 60% teal from the top; then the bottom 40% snaps red with a small 8 px jolt of that cell only. | Counters below: "9,960 ✓" teal, "40 ✗" red. The successes counter climbs; the failures counter pops once. | Soft ack chord across the sweep (3 acks, E6, gain 0.3); a single low thump (gain 0.8) on the red snap, panned to the cell |
| 10.4–11.4 | A thin "= 10,000" sum line draws under the two counters. | The parts visibly add back to the whole | Tiny tick |
| 11.4–13.4 | **Hold.** | — | silence |
| 13.4–16.0 | **B3 overall rate.** The grid scales to about 60% and moves up. The red sliver glows; a red "40" chip lifts from it and settles as the numerator. The "10,000" counter slides under it as the denominator. | Fraction "40 / 10,000" is formed from the counted parts, with no new numbers | Red chip: low note (A3) as it leaves the cell; denominator lands on C4 |
| 16.0–17.6 | "overall" gauge (0–2% track, 640 px) draws with one tick labelled "1% alert". Fill eases to 0.4% (20% of the track) and stops well short of the tick. "0.4%" badge pops in grey-white. | Alert icon (small bell outline) stays dim, with no ring and no colour change | Rising glide while filling, ending on a soft dull tap; no chime, no alarm |
| 17.6–20.4 | **Hold**, the meaningful quiet moment. The bell stays dim. | — | silence (the quiet is the point) |
| 20.4–22.0 | **B4 split, part 1.** The gauge and bell fade to 30%. The grid's 99 other cells slide left and compact into a 9×11 block (one slot empty, outlined faint) labelled "all other". The v2 export cell lifts out to the right. | Denominator chip "10,000" cracks into "9,900" (follows left) and "100" (follows right). The "40" numerator travels only right. Left fraction reads "0 / 9,900". | Crack: short noise tick; left settles on C5 (the "other" voice); right lift: G5 |
| 22.0–23.4 | **B4 split, part 2.** The v2 cell expands about 6× into a 10×10 grid of single requests (cells about 50 px). Its red sliver unfolds into 40 red squares on the bottom four rows; the top six rows are teal. | Legend on the right changes to "■ = 1 request". The red area ratio goes from tiny to 4/10 rows. | Upward sine sweep under the zoom (recover-style, gain 0.5), then four row thumps 0.18 s apart as each red row locks |
| 23.4–24.6 | Fraction "40 / 100" forms under the slice; "40%" badge pops red with overshoot. | Peak moment | Loudest cue: low minor dyad (G3 + B♭3 plus a sub, gain 1.0, peak below −1 dBFS). Not the crash preset, since nothing crashed on screen. |
| 24.6–27.4 | **Hold** on the two columns: "0 / 9,900" left, "40 / 100 = 40%" right. | — | silence |
| 27.4–30.4 | **B5 same failures, two views.** The dimmed overall row returns to full alpha above: "40 / 10,000 = 0.4%". A red outline pulse runs once around the 40 slice squares, then once around the overall numerator "40", linked by a dotted red wire that draws between them. | Shows these are the same 40 failures, not extra ones. A small "same 40" chip sits on the wire. | One red-pitched ping (A4) played twice, panned right then centre, to sound the identity |
| 30.4–31.4 | The two rates line up on one axis: "overall 0.4%" over "v2 · export 40%". | Final comparison state | Soft E5 resolve note |
| 31.4–34.4 | **Final hold.** | — | silence |
| 34.4–35.2 | `s.fade` to black, title band kept. Finite ending, no loop back to the opening. | — | gentle downward tail |

Total ≈ 35 s at speed 1. Render at `meta.speed: 0.85` for about 41 s, inside the 35–50 s guide. The speed setting stretches motion and keeps the sound's character. Holds stay at 2–3 s. If review finds a beat rushed, widen that one gap rather than slowing the whole video. There is no stretch longer than about 3 s without either a landed state or deliberate quiet after one.

## Sound map

- "All other requests" voice: C5, quiet sends (gain 0.2–0.3). It is a background, so it should be audible but never melodic.
- v2 · export voice: G5, a slightly brighter mallet with a 90 ms echo, used only when the slice is created, labelled or lifted. A listener should hear "the slice" each time.
- Success: ack on E6, quiet, grouped. Do not play 9,960 or 99 separate sounds.
- Failure: low thump, one for the overview snap and four for the expanded rows (one per row of ten). This avoids 40 rapid clicks that would sound like a counter racing.
- Numbers forming: low single notes (A3 numerator, C4 denominator) so the fraction assembles audibly.
- Quiet alert: a soft dull tap where a chime would be expected. No alarm sound, because nothing alarms.
- The 40% reveal is the loudest event. Pan each cue by the actor's x (`s.panOf`).

## Scope guard

Include: totals, the slice, outcomes, the pooled rate against the illustrative overall 1% alert, the split by version and operation together, and the same failures appearing in both rates.

Exclude: v1 export or control comparison, sample-size or insufficient-evidence rules, the five-point exercise threshold, traffic weights, promotion, pause, abort, rollback, users, causes, and any wording such as "safe", "bug" or "broke".

The subtitle is the lesson title. No intro or takeaway sentence appears on screen; the page's lesson text carries those.

## Verification

1. Node dry-run of the scene: assert that the counts in the scene constants are 100 cells × 100 = 10,000, that slice 40 + 60 = 100, that rest 9,900 + 0 = 9,900, that 9,960 + 40 = 10,000, that the formatted rates are "0.4%" and "40%", that every beat has at least one audio cue, and that no cue lacks a visible event.
2. One still per beat midpoint and each boundary (about 3, 7, 10, 12, 15, 17, 19, 21.5, 23, 24, 26, 29, 31, 33 s at speed 1, scaled for 0.85), checked at 1080 and at actual 350 px. Confirm the red sliver is visible at 350, no label overlaps, and no stale orange outline or dimmed gauge lingers wrongly.
3. Full render, contact sheet, spectrogram (a sound on each beat; the 40% reveal is the peak), `volumedetect` (max below −0.5 dB), `ffprobe` (duration and an audio stream), full decode without errors, and a streaming metadata check (faststart).
4. Record whether the audio was actually listened to or only analysed.
5. Run the review.md defect pass, then the improvement pass. A fresh comparison reviewer should receive the encoded variants and this lesson's intent before seeing source or scores.

## Notes for the coordinator

`lessons.json` item 3 lists a 28 s duration with beats at 0/7/14/21. This cut runs about 41 s and its beats land near 1.2, 8.4, 13.4, 20.4 and 27.4 s at speed 1 (× 1/0.85 at playback). If this cut is chosen, the coordinator updates the beat times and duration there. This plan edits no shared manifest.

