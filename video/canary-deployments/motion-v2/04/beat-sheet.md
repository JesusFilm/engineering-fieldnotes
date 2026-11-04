# Lesson 04 — Compare the same operation (motion-v2 cut)

One mechanism: compare export requests with export requests, observed in one shared window, and read each version's failure rate from its own denominator. The illustrative fixture is v1 control 0 failed / 900 exports = 0% and v2 candidate 40 failed / 100 exports = 40%. The candidate was observed worse in this window, so the comparison argues against promotion. The counts are authored illustration, not measured benchmark results. The scene claims no cause, sets no universal threshold, mixes in no unrelated requests, and triggers no automatic rollout or rollback.

Format: 1080×1920, 30 fps, speed 1, 39.6 s, finite ending with a fade to black. "illustrative counts" stays on screen until the fade.

## Actors and sound identity

| Actor | Visual identity | Sound |
| --- | --- | --- |
| Query scope (`op = export`, `window A`) | mono query chips, grey rules into both rows | G5 `send` / `ack`, quiet G6 `clock` ticks while the window fills |
| v1 control | cyan stripe and label, upper row | C5 (`arrive`, `ack`, `work`, `deliver`), C6 `send` on restore |
| v2 candidate | violet stripe and label, lower row | E5 (`arrive`, `work`), E6 `send` on restore; failure cues drop to E4 |
| Failure quantities | red numerals, red track fill, red outline | softened `thump` E4 (loudest cue, −7.5 dBFS), `deliver` E4 |
| Comparison summary and limits | plain white or grey text, no buttons | `deliver` G4, `ack` G4 |

All cues are centre-panned because the layout is stacked vertically.

## Beat sheet (scene seconds)

| Time | What moves | State change | Sound |
| --- | --- | --- | --- |
| 0.0 | Title "Compare exports / with exports", v1 control and v2 candidate rows, dim chips | Roles established before the short names are used | — |
| 0.5–1.4 | `op = export` chip lights; grouping rule draws into both rows | Same operation for both versions | `send` G5 |
| 1.6–2.5 | `window A` chip lights; second rule draws into both rows | Same observation window for both versions | `ack` G5 |
| 2.5–5.8 | Fractions appear with hidden numerators ("?"); the window underline fills; denominators count up together in 10 steps (90/10 per step) | Both totals accumulate in the same window, keeping a 9:1 ratio | 9 quiet `clock` G6 ticks |
| 5.8 | Window chip and both totals glow; totals lock at 900 and 100 | Different denominators, same scope | `arrive` C5, then E5 at 5.92 |
| 5.9–7.6 | Hold | — | silence |
| 7.6 | v1 row enlarges with a cyan outline; v2 dims; rules dim | Focus on the control | `arrive` C5 |
| 8.5 | Numerator becomes 0; "failed" label | Control failure count | `ack` C5 |
| 9.5 | Fraction rule and 900 glow; "exports" label | Denominator is v1's own exports | `work` C5 |
| 10.7–10.9 | Labels fade; "= 0%" pops in | Control rate 0% | `deliver` C5 |
| 11.3–13.3 | Reading hold | — | silence |
| 13.3 | Rows restore | — | `send` C6 |
| 14.1 | v2 row enlarges with a violet outline; v1 dims | Focus on the candidate | `arrive` E5 |
| 15.0 | Numerator becomes red 40; "failed" label | Candidate failure count | softened `thump` E4 (strongest cue) |
| 16.0 | Fraction rule and 100 glow; "exports" label | Denominator is v2's own exports, never 900 | `work` E5 |
| 17.4 | Labels fade; red "= 40%" pops in | Candidate rate 40% | `deliver` E4 |
| 17.8–19.8 | Reading hold | — | silence |
| 19.8 | Rows restore | — | `send` E6 |
| 20.7 | "0% · failure rate · 100%" scale and v1 track draw | One shared 0–100% scale | `work` C5 |
| 21.6 | Outlined ring marks v1's empty track at zero | 0% has no fill | `ack` C5 |
| 22.6 | v2 track draws at the same width | Identical scale | `work` E5 |
| 23.5–24.5 | Red fill grows to exactly 40% of the v2 track | Rates compared on one scale | `deliver` E4 at 24.5 |
| 25.6 | v1 row, 900, and 0% glow together | Each rate pairs with its own denominator | `arrive` C5 |
| 26.4 | v2 row, 100, and 40% glow together | — | `arrive` E5 |
| 26.9–28.7 | Hold | — | silence |
| 28.7 | Red outline around 40%; "observed worse" under the v2 track | Candidate observed worse in this window | soft `thump` E4 |
| 30.2 | "argues against promotion" rises in as plain text | Interpretation, not an action | `deliver` G4 |
| 32.5 / 34.4 / 36.3 | Limit note swaps: "cause not proven" → "no universal threshold" → "a person decides next" | Explicit limits; no rollout or rollback happens | `ack` G4 each |
| 36.6–38.5 | Final reading hold | — | silence |
| 38.5–39.3 | Whole frame fades to black; 0.3 s of black to the end | Finite ending | silence |

## Plan A/B choices (neutral record)

Two anonymous plans were provided. This cut combines them as follows.

| Idea | Source | Decision | Reason |
| --- | --- | --- | --- |
| Stacked rows, v1 above v2, stable identity marks | Plan A | Used | Keeps the role mapping steady through every layout change |
| Cyan/violet identity, red only for failure quantities | Plan A | Used | Colour never says both "version" and "failure" |
| Persistent "illustrative counts" label | Plan A | Used | The limit stays visible from start to fade |
| Query-scope chips with static grouping rules (no traffic wires) | Plan A | Used, as `op = export` and `window A` | Software-native scope without implying routing |
| Per-version focused calculation (failed / own exports = rate) | Plan A | Used, as an in-place enlargement | Teaches each denominator separately |
| Same-scale rate tracks with an outlined empty zero | Plan A and Plan B | Used | Shows 0% versus 40% without implying volume |
| Closing limit notes | Plan A | Used, plus "a person decides next" | States no cause, no universal threshold, and no automation |
| Shared window that fills while both denominators count up together | Plan B | Used, without per-request dots | Makes "same window" visible as concurrent accumulation |
| Numerators hidden until each result beat | Plan B | Used ("?") | Keeps the denominators the focus first |
| Filter animation with mixed operations (search, login) excluded | Plan B | Declined | The brief rules out showing unrelated requests at all |
| Per-request dot stream with red dots, stereo panning | Plan B | Declined | Dense and approximate; the stacked layout has no left/right actors |
| "promote v2?" decision box turning red | Plan B | Declined | Could read as an automated gate; plain text interprets instead |
| Exact timings from either plan | Both | Re-timed | Holds follow comprehension; total 39.6 s |
