# Revise against criteria — beat sheet (motion-v2/05)

Mechanism: an evaluator checks a draft against explicit criteria and returns one specific reason. The worker revises that field in the same draft. The evaluator rechecks the same criteria, and the controller stops after one revision.

Layout: a fixed `Criteria` panel (`Change`, `Rollback step`) above one release-note draft edited in place (`Draft v1` → `Draft v2`, with a role tag `worker` in blue or `evaluator` in amber). Below sit an `Evaluator feedback` strip and a `Controller` strip (`Revisions n / 1` plus state). The evaluator's inspection runs down the right gutter to the rollback field; the feedback returns up the left gutter to the same field.

Duration 33.5 s at 30 fps, speed 1. Finite ending: the stage fades below the title from 31.0 s.

## Neutral A/B decisions

| Adopted | From | Reason |
|---|---|---|
| One artifact edited in place (v1 → v2) with a role tag on it | A | The change happens in the work itself; no three-actor layout |
| Controller strip with a visible revision budget and state (`waiting`, `checking`, `revise`, `recheck`, `STOPPED`) | A | The controller owns stopping |
| Specific feedback strip (`Missing rollback step`) and the feedback point landing on the named field | A + B (specific reason) | Feedback names one requirement |
| v2 starts with marks cleared and `Recheck pending` | A + B | No stale verdict |
| A short criteria list reused unchanged, both items rechecked | B | Same yardstick both times |
| Teal marks only on the named criteria; no `approved` | A | Met criteria are not a safety claim |
| Rejected: B's worker/evaluator boxes, rounds bar and `accepted · stop` badge with chime | — | Three-box layout and success fanfare |
| Rejected: B's three criteria with word counts | — | More text than the mechanism needs |

## Beats

| Time (s) | What moves | State change | Sound |
|---|---|---|---|
| 0.6–1.8 | change row types in; rollback value `—` | `Draft v1` (worker) | work E4 (worker) |
| 2.6 | role tag flips | `evaluator`; controller `checking` | send E6 (worker submits) |
| 3.2 | criteria panel lights amber | criteria applied | — |
| 4.0–4.6 | Change criterion and change row outlined, ✓ | Change met | ack G5 (evaluator) |
| 5.6–7.0 | Rollback criterion outlined; amber point travels the right gutter to the rollback field | field inspected | send G6 / arrive G5 |
| 7.6 | criteria jolt, amber ✗ on Rollback step | missing | miss G4 |
| 7.6–8.4 | hold | one missing requirement | — |
| 8.4 | feedback strip lights; text types in | `Missing rollback step` | store G5 |
| 10.0–11.3 | amber point travels the left gutter up into the rollback field | — | send G6 |
| 11.3 | tag flips | `worker`; controller `revise` | arrive E5 |
| 11.3–14.0 | hold | the field the reason names is outlined | — |
| 14.0 | title and count change; marks reset to open circles | `Draft v2`, `Revisions 1 / 1`, `Recheck pending` | ack C5 (controller) |
| 15.0–16.8 | rollback value types in, blue | `Restore prior config` | work E4 ×2 |
| 18.0 | tag flips | `evaluator`; controller `recheck` | send E6 |
| 19.0–19.6 | Change rechecked, ✓ | — | ack G5 |
| 20.4–21.8 | point travels to the revised field | — | send G6 / arrive G5 |
| 22.6 | Rollback step ✓, field outlined teal | criterion met | ack G5 |
| 23.1 | feedback types in, teal | `Criteria met` | store G5 |
| 25.0 | controller lights | `STOPPED` (budget 1 / 1) | deliver C5 |
| 25–31 | reading hold | v2, both ✓, one revision, stopped | silence |
| 31.0–32.4 | stage fades below the title | finite ending | — |

19 sound cues. Worker E, evaluator G, controller C. The miss is a modest low note.
