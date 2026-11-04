# Lesson 03 beat sheet: An average hides failure

Cut `motion-v2/03`. 1080 × 1920, 30 fps, speed 1, 44.2 s, finite ending (fade to black at 43.0–43.7 s).

## Mechanism

The same 40 failures look small when divided by all 10,000 requests (0.4%) and severe when divided by the 100 requests in the v2 + export group (40%). The group is part of the window, never extra traffic.

Fixed illustrative arithmetic, asserted in `scene.js` before anything is scheduled:

| Group | Requests | Fail | Succeed |
|---|---|---|---|
| v2 · export | 100 | 40 | 60 |
| other requests | 9,900 | 0 | 9,900 |
| all requests | 10,000 | 40 | 9,960 |

Overall 40 / 10,000 = 0.4%, below the example 1% overall alert. v2 · export 40 / 100 = 40%. The video claims no cause, no users (squares are requests; the legend says so), no universal threshold (the 1% is labelled "example" and applied only to the overall rate), and no rollout action.

## Plan choices (neutral A/B record)

| Idea | Source | Used? | Reason |
|---|---|---|---|
| 10 × 10 grid where one square = 100 requests, so the grid is exactly 10,000 | B | yes | Makes the big denominator visible, and the red sliver's area (0.4% of the grid) matches the rate |
| The group's square lifts out and expands into 100 single requests | B | yes | One continuous transform carries the change of denominator with no second set of failures |
| Explicit partition 9,900 + 100 = 10,000 before outcomes | A and B | yes | Shows that the group sits inside the total |
| Complement named "other requests", never v1 | A and B | yes | It also contains v2 requests other than exports |
| Separate filter chips `v2` and `export` | A | yes | Shows that the group is defined by version AND operation |
| Alert strip on an explicit 0%–1% axis with a dim "quiet" state, no alarm sound | A (axis), B (quiet) | yes | A threshold comparison, never a share chart |
| Final two rows joined by a "same 40" bracket, then the denominators outlined | A | yes | Shows that the numerator is shared and only the denominator differs |
| ✓ and × marks on single requests so colour is not the only cue | A | yes | Keeps outcomes readable in greyscale |
| Rolling counters and per-cell click sounds | B (counter) | no | Counts appear only once their states are valid; 100 cell sounds would grate |
| Bell icon | B | no | A text "quiet" pill reads faster and invents no icon semantics |
| 9,960 merged success total | A | no | Merging the 60 into the 9,900 added a step without helping the denominator lesson |
| speed 0.85 | B | no | Authored with granular holds at speed 1 |

## Beats

| Time (s) | What moves | State change | Sound (preset, pitch) |
|---|---|---|---|
| 0.0–1.0 | Title, "illustrative numbers" chip, empty grid outline | Stage set | none |
| 1.2–4.2 | Grid fills grey one row at a time; legend "■ = 100 requests" | 100 squares appear | `send` C5 per row (10) |
| 4.4 | "10,000" pops in the header | Total known | `arrive` C5 |
| 4.6–6.0 | Hold | — | silence |
| 6.0 | Square 97 gets an orange outline and ripple | The group is singled out | `ack` E5 |
| 6.5–8.0 | Leader drops; chips `v2`, `export`; "100" | Group = v2 AND export, 100 requests | `ack` E5, `ack` E5, `arrive` E5 |
| 8.8 | "other requests 9,900"; the other outlines flash | Complement named | `arrive` C5 |
| 9.6 | "9,900 + 100 = 10,000" | Parts add to the whole | `ack` C6 |
| 9.9–11.8 | Hold | — | silence |
| 11.8–12.9 | Teal diagonal sweep over 99 squares; "✓ succeeded" | Other requests all succeed | 3 × `ack` C6, `ack` C5 |
| 13.5 | Bottom 40% of the group square turns red; "40 ×" | 40 failures, inside the group | `thump` E3 (muted) |
| 14.1 | The rest of the group square turns teal; "60 ✓" | 40 + 60 = 100 | `ack` E5 |
| 14.4–16.2 | Hold | — | silence |
| 16.2–18.5 | Ledger clears; red "40" lifts from the sliver; header "10,000" travels down as the denominator | Fraction 40 / 10,000 | `deliver` A4, `arrive` C4 |
| 19.1 | "0.4%" | Overall rate | `ack` C5 |
| 20.6–21.8 | 0%–1% strip with "1% example alert"; pale fill stops at 0.4 with a marker | Below the example alert | `ack` G4, `arrive` C5 |
| 22.4 | Dim "quiet" pill | Alert not triggered | `tap` G4 (dull, no alarm) |
| 22.7–25.0 | Hold | — | silence |
| 25.0–26.6 | Strip clears; grid shrinks to the top left; the overall row slides in beside it; "below 1% example alert" | Top comparison row | `send` C5, `deliver` C5 |
| 27.1 | Group square in the mini grid pulses orange | Same group again | `ack` E5 |
| 27.5–28.7 | That square expands into a 10 × 10 grid of single requests; legend "■ = 1 request" | Zoom into the group | `zoom` E4 rising, `arrive` E5 |
| 29.1–29.5 | Chips `v2`, `export` above the expanded grid | Group labelled | `ack` E5 × 2 |
| 30.2 | Top 6 rows teal ✓ | 60 succeed | `ack` E5 |
| 30.9 | Bottom 4 rows red × | 40 fail | `thump` E3 |
| 31.4–31.8 | "60 ✓", "40 ×" beside the rows | Counts | `ack` E5, `deliver` A4 |
| 31.8–33.6 | Hold | — | silence |
| 33.6–34.7 | "40" lifts from "40 ×"; grid shrinks into the bottom row; "100" rises out of the grid as the denominator | Fraction 40 / 100 | `deliver` A4, `arrive` E5 |
| 35.3 | "40%" pops in red | Group rate (loudest moment) | `reveal` G3 + B♭3 + sub |
| 35.6–37.4 | Hold | — | silence |
| 37.4–38.0 | Red bracket joins the two 40s; "same 40" chip | Same numerator in both rows | `deliver` A4 × 2 |
| 39.4–40.1 | "10,000", then "100" get outlines | Only the denominators differ | `arrive` C5, `arrive` E5 |
| 40.4–43.0 | Final hold | — | silence |
| 43.0–44.2 | Fade the whole frame to black | Finite ending | silence |

Sound map: C family for the whole window, E family for the v2 · export group, G4 for the example alert, and A4 whenever the 40 failures move or are matched. Failure is a muted low thump rather than the crash preset, because nothing on screen crashes.

