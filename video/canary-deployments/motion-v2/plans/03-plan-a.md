# Lesson 03 — An average hides failure

## Teaching contract

One mechanism: the same observed failures look small when divided by all requests and severe when divided by the version-and-operation group containing them. A selected group is a subset of the original observation window, never extra traffic. The viewer should finish able to identify both denominators and explain why the aggregate alone misses this concentration. This is an anonymous planning artifact only; no scene, render, review result, or deployment is implied.

Use a finite 43-second cut at 1080 × 1920, 30 fps, speed 1. This replaces the brief's nominal 28-second timing with granular teaching beats. Stop once the two rates are understood. No routing changes, promotion, abort, recovery, gate implementation, sample sufficiency, or later-lesson mechanisms.

## Arithmetic and evidence boundaries

Freeze one illustrative observation window before displaying outcomes:

- All requests: 10,000.
- Selected group: version v2 AND operation export, 100 requests.
- Complement: 9,900 requests, all successful.
- Selected outcomes: 40 failed plus 60 successful = 100.
- Total successes: 9,900 + 60 = 9,960; total failures: 40.
- Overall error rate: 40 / 10,000 × 100 = 0.4%.
- Selected error rate: 40 / 100 × 100 = 40%.
- Illustrative overall alert: 1%; 0.4% is below it. The alert stays inactive, not a declaration of safety.

The complement must be called `Other requests`, never `v1`: it also includes requests outside export on v2. The 9,960 successful requests include the selected group's 60 successes; never place 9,960 beside the full 100 as disjoint totals. There are no user icons or user counts. Outcomes establish an observed concentration, not the cause of the errors; do not animate a broken export implementation, crashed server, or a causal arrow from version label to error. The 1% limit is explicitly an example overall alert setting, not a universal standard or a slice-specific policy.

## Visual system and layout

Software-native observation UI on near-black. A compact `Illustrative window` chip anchors the dataset throughout. A two-line title appears at the start, then yields space to the data. Use four successive arrangements: a nested dataset view, an outcome ledger, an overall metric with an alert comparator, and a selected result grid followed by stacked comparison rows. Avoid a constant dashboard wall or a long animated paragraph.

At 1080 width, stage bounds are x=72–1008, y=440–1740. Essential labels use at least 54 px (17.5 px at actual 350 px width), major counts 76–90 px, rates 116 px. Labels are short and use deliberate line breaks. The exact fractions occupy their own full-width rows. Never shrink text to fit. Keep red failures marked × and green successes marked ✓ so color is not the only evidence. Amber means selection, not failure. Use pale neutral text for the below-alert aggregate; no green approval stamp.

Named actors and positions:

- Observation container: x=540, y=870, width=920, height=660 initially. Header at y=520: `All requests` and `10,000` on separate lines.
- Selected group: outlined subpanel x=540, y=1080, width=800, height=270; adjacent filter chips `v2` and `export`, with `100 requests` beneath. An unambiguous containing border establishes membership; panel area is categorical, not proportional to traffic.
- Outcome ledger: vertically arranged entries centered x=540 at y=730, 1020, 1350, each with one label and count. Reuse the selected panel rather than cloning it.
- Overall metric: fraction at y=850, rate at y=1050, comparator strip x=120–960 at y=1330. Strip axis is explicitly 0%–1%; 0.4% sits at x=456 and `1% alert` at x=960 with its label right-aligned. The strip is a threshold comparison, never a 100% share chart.
- Selected detail: filter chips at y=560, 10 × 10 grid bounded x=160–920, y=730–1490. Cell pitch 76 px and square side 52 px yield roughly 17 px cells at 350 px width. Each square is one selected request, not a user. Four rows of red × and six rows of green ✓ show exactly 40 and 60; spatial grouping is a display sort, not execution order.
- Final comparison: full-width rows centered y=850 and y=1260, each labeled with scope, fraction, and rate on separate lines. A bracket joining their numerator positions carries the short chip `Same 40`. No data-flow wires: movement here means rearranging observed results, not network traffic or additional requests.

## Beat sheet

| Time | Motion and attention | State and reading hold | Synthesised sound |
| --- | --- | --- | --- |
| 0.0–6.0 | 0.0–0.7 reveal title and observation container; 0.7–1.5 settle `10,000`. At 2.0 outline the contained selection; 2.4 reveal `v2`, 3.1 reveal `export`, 3.8 reveal `100 requests`. | All observations exist before filtering. Both chips remain selected together; hold 4.2–6.0 to read nested membership. | Dataset `arrive` C5 at 0.7; filter `ack` E5 at 2.4 and 3.1; selected-count `arrive` E5 at 3.8, softer than dataset cue. |
| 6.0–13.5 | Expand the selected subpanel into two ledger rows over 0.7 s. Reveal `40 failed` at 7.0 and `60 succeeded` at 7.8. Show complement row `Other requests` / `9,900 succeeded` at 8.7. At 10.6 the two success counts visibly join into `9,960 succeeded`; their earlier rows disappear as they merge. | Failure count remains fixed. The selected header retains `100`; its 40/60 split is visible before the success merge. Hold 9.1–10.6 for partition arithmetic, then 11.3–13.5 for final totals 40 + 9,960. | Selected failure: short E3 `thump` at 7.0, no crash noise. Selected success: E5 `ack` at 7.8. Complement success: C5 `ack` at 8.7. Ledger merge: C5 `arrive` at 11.3. |
| 13.5–21.0 | Existing `40` slides to numerator position; total `10,000` becomes denominator. Fraction settles by 14.5. Reveal `0.4%` at 15.2. At 17.0 draw comparator endpoints, at 17.7 place 0.4% marker, at 18.4 reveal inactive alert outline and `Example alert` / `1%`. | Keep exact `40 / 10,000` above the rate. Hold 15.2–17.0 for calculation and 18.7–21.0 for below-threshold comparison. Alert remains neutral and inactive. | Overall metric `arrive` C5 at 14.5; quiet C5 `ack` at 15.2. Comparator G4 `ack` at 17.0 and 18.4; marker C5 `arrive` at 17.7. No alarm or success chime. |
| 21.0–29.0 | Overall comparator retracts. Restore the original selected-group border from its retained anchor; activate `v2` at 21.7 and `export` at 22.4. Expand this same group's data into the 100-cell grid by 23.4. Resolve four red rows as one grouped reveal at 24.1, then six green rows at 25.0. Place `40 failed` and `60 succeeded` in separate count lines below by 26.0. | Both filters stay lit. `100 requests` stays above grid. This re-displays recorded outcomes, not a second run or 40 new errors. Hold 26.0–29.0 to inspect the exact 40/60 split. Sorted grid should appear together, never as a temporal failure streak. | Selection E5 `ack` at 21.7 and 22.4; grid E5 `arrive` at 23.4. Muted E3 `thump` at 24.1 identifies the same failed group; E5 `ack` at 25.0 and soft E5 `arrive` at 26.0. |
| 29.0–36.0 | Grid contracts into a compact outline of the selected population. Its `100` moves into the denominator; the persistent failure count supplies `40`. Settle `40 / 100` at 30.0, reveal `40%` at 30.8. After a 2.2 s hold, move this metric to the lower comparison row while the overall metric returns above, settling at 34.0. | The numerator never counts upward. Overall row reads `All requests`, `40 / 10,000`, `0.4%`; selected row reads `v2 · export`, `40 / 100`, `40%`. Hold 34.0–36.0 for comparison. | Selected metric E5 `arrive` at 30.0 and E5 `ack` at 30.8. Comparison settlement uses quiet C5 then E5 at 33.8 and 34.0. |
| 36.0–43.0 | At 36.0 draw a bracket between the two 40 numerators and reveal `Same 40`. At 38.1 outline the 10,000 denominator, then the 100 denominator at 38.8; at 39.7 pulse the paired v2/export chips once. | Hold numerators 36.6–38.1; hold complete final comparison 40.0–42.5. End with a 0.5 s fade of the entire composition. This finite ending preserves the observation; no loop reset or operational action. | Numerator bracket C4 `ack` at 36.0; denominator focus C5 at 38.1 and E5 at 38.8; paired filters a single E5 `ack` at 39.7. Silence throughout final hold and fade. |

## Sound and motion discipline

Use brief synthesised tones with short decays and restrained echo: C-family belongs to the whole-window observation, E-family to the selected v2/export group, G4 to the illustrative alert comparator. Failure uses the selected actor's lower E3 register with a soft percussive envelope. It denotes an observed error, not a server crash. Pan subtly toward the currently visible actor; ensure meaning survives mono. Never play 100 cell sounds, add music, speech, clock ticking, mechanical noises, or physical metaphors. A returning result may have a focus cue but no newly incrementing count. Cues occur at landings, not throughout holds; target final mix peak at or below -1 dBFS.

All numerical states are derived from the same immutable fixture. Display integer counts directly at valid states instead of tweening through misleading intermediate fractions. Animate position, selection borders, grouping and focus; percentages appear only once their operands are settled. Large layout changes take 0.6–1.0 s, small highlights 0.2–0.35 s. No crossfade may make two copies of the dataset look simultaneously additive.

## Implementation and acceptance notes for a later render

Use local scene helpers for the observation container, count ledger, sorted request grid and metric rows; standard labels, bars, pulses and scheduled sound events cover the remainder. Keep deterministic timestamps at speed 1 and preserve the repository's pinned renderer if implemented. This plan does not request any implementation files.

Later verification must inspect encoded frames at 350 px width, not merely a zoomed 1080 canvas. Inspect every beat midpoint, all transitions, the busiest grid frame and final comparison; read every essential label without enlargement. Confirm no clipped comparator label, crowded fraction or invisible ×. In a muted watch, a beginner should recover 10,000 total, 100 selected, 40 failures shared between views, and the two rates. In audio review, verify each actor's cue and silence during the holds; report actual listening separately from waveform analysis. Decode the full eventual encode and check duration, audio peaks and streaming metadata. No render or listening checks have been performed for this planning-only deliverable.

Arithmetic acceptance: 9,900 + 100 = 10,000; 40 + 60 = 100; 9,900 + 60 = 9,960; 9,960 + 40 = 10,000; 40/10,000 = 0.004; 40/100 = 0.4. The selected fraction is 100 times the pooled fraction because its denominator is 100 times smaller, not because more failures occurred. There is no universal threshold claim, root-cause claim, unique-user claim or rollout decision.

## Basis

Local brief: `video/canary-deployments/sequence/lessons.json`, item 3, and `content/concepts/canary-deployments.json`. Editorial constraints: `docs/editorial-workflow.md`. Motion, sound and validation guidance: architecture-flow-video `SKILL.md` and its `references/style.md`, `references/engine-api.md`, and `references/review.md`; adapt their loop guidance to the requested finite ending and use stricter phone-size typography.

Primary reference checked 2026-11-04: [Google SRE Workbook — Canarying Releases](https://sre.google/workbook/canarying-releases/), discussion surrounding Figures 16-3 and 16-4. It supports the distinction between a small pooled error signal and a clearer version-specific view. The exact request fixture, operation split and 1% alert here are illustrative lesson inputs, not measurements or recommended settings from that source. No later operational mechanisms from that reference are included.
