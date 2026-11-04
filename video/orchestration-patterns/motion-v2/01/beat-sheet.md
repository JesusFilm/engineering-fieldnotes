# Follow dependencies — beat sheet (motion-v2/01)

Mechanism: a step whose input is another step's output cannot start until that output exists and arrives. Order follows the data, so the steps run one after another and their times add up.

Layout: a run trace (three time lanes, Draft / Check / Assemble, time running left to right) with dependency elbows between the end of one step and the start of the next, above an artifact inspector (draft D1, then the result) and the fixed check criteria. Each waiting step shows an input socket (`needs D1`, `needs F1`); an elbow is dashed until its artifact exists, then solid in the artifact's colour (D1 blue, F1 amber).

Duration 44.0 s at 30 fps, speed 1. Finite ending: the stage fades below the title from 41.6 s.

## Neutral A/B decisions

| Adopted | From | Reason |
|---|---|---|
| Run trace with staggered time lanes plus artifact inspector | A | Software-native geometry; shows waiting and serial intervals directly |
| D1 stays unchanged; F1 recorded as data; result `D1 + F1` with `needs revision` | A | Execution `done` must not read as content approval |
| Fixed criteria panel with open circles that become ✓ / ✗ | A | Criteria exist before the draft; the check compares against them |
| Elbow dashed until its artifact exists, then solid | B | Makes availability visible on the dependency itself |
| Waiting step shows what it needs (socket pill) | B | Concrete gate: Check needs D1, Assemble needs F1 |
| Actor pitches C (Draft) / E (Check) / G (Assemble); rising recap | B | Order becomes audible |
| Recap: time axis lights under each step in turn, `time adds up: 3 steps` | B (elapsed bar), reshaped | Takeaway on latency without invented milliseconds |
| Rejected: B's three stacked boxes with artifact cards | — | Close to the generic three-box layout the brief excludes |
| Rejected: B's hold of Assemble after its input exists | — | Would suggest availability and dispatch are separate steps |
| Rejected: A's separate availability strip and bottom finding strip | — | The lane sockets and inspector row carry the same state with less text |

## Beats

| Time (s) | What moves | State change | Sound |
|---|---|---|---|
| 0–1.2 | — | Draft `ready` (dashed); Check `needs D1`, Assemble `needs F1` (dashed, empty sockets); elbows dashed grey; inspector `Draft D1 · not started`, three empty rows; criteria open | — |
| 1.2 | Draft lane lights | solid amber, `running`, progress fill 1.4→7.4; inspector `writing` | ack C5; work C4 every 0.8 s to 6.8 |
| 2.2–4.4 | inspector row 0 types | `Change: Add timeout` | — |
| 3.4 | Check socket blinks, elbow 1 flashes empty | still `needs D1` | wait (two soft knocks) E4 |
| 5.0 | Assemble socket blinks, elbow 2 flashes empty | still `needs F1` | wait G4 |
| 7.4 | Draft completes, check ripple | teal `done`; inspector `complete` | arrive C5 |
| 7.9 | row 1 fades in, grey | `Rollback: —` (absent section) | — |
| 7.9–9.4 | hold | draft exists, Check has not received it | — |
| 9.4–10.5 | D1 chip travels elbow 1 | elbow 1 solid blue | send C6 |
| 10.5 | arrival ripple at Check | socket fills blue, `input D1` | arrive E5 |
| 10.5–12.3 | hold | Check has its input | — |
| 12.3 | Check runs | amber `running`, fill to 19.6; inspector `Checking D1` | ack E5; work E4 at 13.1 and 18.7 (kept clear of check results) |
| 13.8 / 14.6 | Change criterion and row 0 highlight, then ✓ | Change met | ack E6 / arrive E5 |
| 16.2 / 17.0 | Rollback criterion and row 1 highlight, then amber ✗, criteria panel jolts | Rollback missing | ack E6 / thump E3 (loudest event) |
| 18.0 | row 2 types in amber | `F1 Rollback missing` | store E5 |
| 19.6 | Check completes | teal `done`; inspector `Checked D1`, tag `1 finding` | arrive E5 |
| 19.6–21.6 | hold | finding retained as data | — |
| 21.6–22.7 | F1 chip travels elbow 2 | elbow 2 solid amber | send E6 |
| 22.7 | arrival ripple at Assemble | socket fills amber, `input F1` | arrive G5 |
| 24.3 | Assemble runs | amber `running`, fill to 28.3; inspector `Assembling` | ack G5; work G4 ×4 |
| 28.3 | Assemble completes | teal `done` | arrive G5 |
| 28.9 | inspector glows | header `Result: D1 + F1`; rows unchanged | deliver G4 |
| 29.7 | tag pops | `needs revision` (amber) | store C5 |
| 32.4 / 33.4 / 34.4 | time axis lights under Draft, Check, Assemble; elbows flash between | order replayed | ack C5 / E5 / G5 |
| 35.4 | axis label | `time adds up: 3 steps` | clock |
| 35.4–41.6 | reading hold | final state | silence |
| 41.6–43.0 | stage fades below the title | finite ending | — |

36 sound cues. Pan follows each actor's x position.
