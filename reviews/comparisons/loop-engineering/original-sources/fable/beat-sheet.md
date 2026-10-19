# Loop engineering — "Progress check" (variant: fable)

Model: anthropic/claude-fable-5-1 (reasoning: high). Authored 19 October 2026 without reading any other variant's scene source; the baseline's encoded media was inspected only to avoid repeating its sequence (the baseline teaches an iteration budget draining to a Stop node).

## Learning objective

After one watch, an engineer adopting coding agents can state that every cycle of an agent loop must record an observed result (here: the failing-test count), that the stopping rule compares that result with the previous cycle's, and that a result which stops changing is a reason to stop and hand the task to a person even when iterations remain.

Why this complements the baseline: the baseline shows *how many* cycles are allowed (budget). This cut shows *what each cycle must observe* and the escalation condition that fires before a budget would. Together they cover the concept's judgement line: measurable progress signals, iteration limits, escalation conditions.

## Actors and sound map

| Actor | Role | Pitch / sound |
|---|---|---|
| Agent (box, top of ring) | edits code, sends `EDIT n` | send E6; arrive E5 when a result returns |
| Tests (box, bottom of ring) | runs the suite | arrive C5, then `work` ticks every 0.2 s while running; `miss` (D4 for 5 fails, E4 otherwise) on failure, `hit` on PASS |
| Run log (store, 3 rows) | records each observed result; bar length = failing count / 5 | `store` G5 when a row lands |
| Progress check (ripple on the newest row) | ✓ green = count fell; ✕ orange = same as last time; ✕ red + alarm = same twice | `ack` G6 / `thump` / scene sound `stall` (loudest cue) |
| Verdict badge (centre of ring) | `DONE` green or `NO PROGRESS` red | chime C6 / thump |
| Human (laptop) | receives `HAND OFF` | send G5 on dispatch, chime C6 on arrival |

Ring: edits travel down the right side, results come back up the left side, so the loop is read clockwise.

## Beats (playback seconds; speed 1)

| Time | What moves | State change | Sound |
|---|---|---|---|
| 0.0–0.6 | Stage fades in from black | opening veil lifts (loop boundary) | — |
| 0.8–3.4 | `EDIT 1` goes to Tests; Tests light while running; `5 FAIL` returns to Agent | run-log row 1: 5 FAIL, bar full, red | send, arrive, work ×4, miss, arrive, store |
| 4.2–7.2 | `EDIT 2` → Tests → `2 FAIL` | row 2: 2 FAIL, shorter bar; ✓ green ripple: progress measured | … store, **ack** |
| 7.6–11.2 | `EDIT 3` → Tests → `PASS` | row 3: PASS green; ✓; Agent turns green; `DONE` badge pops | hit, store, ack, **chime** |
| 11.2–15.1 | Hold, then fade out and back in | log cleared, Agent reset (new task) | — (deliberate hold) |
| 15.4–17.9 | `EDIT 1` → `3 FAIL` | row 1: 3 FAIL | send … store |
| 18.8–21.8 | `EDIT 2` → `3 FAIL` | row 2 identical; ✕ orange ripple, both rows turn orange, log nudges | … store, **thump** (warning) |
| 22.2–25.2 | `EDIT 3` → `3 FAIL` | row 3 identical; ✕ red, whole log red and shakes | … store, **stall alarm** (loudest) |
| 25.7 | `NO PROGRESS` badge pops in the ring | verdict | thump |
| 26.3–27.3 | Agent, Tests and ring dim; `HAND OFF` chip travels from the log to Human | Human turns green with a ripple | send, **chime** |
| 27.3–29.7 | Hold on the resolved state, then fade to black | closing veil (matches frame 0) | — |

Total 30.75 s (923 frames at 30 fps). Normal case = run 1; problem = run 2 cycles 2–3; resolution = stop and hand off.

