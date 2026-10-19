# Agent evals — side-effect check (fable cut)

**Learning objective.** After one watch, an engineer adopting agents can state: a grader that only asserts the requested outcome will pass an agent that also broke unrelated state, so the eval needs explicit checks for required existing behavior, checked against the final artifact.

**Relation to the baseline.** The baseline cut teaches that the agent's final message is not the outcome: it grades the ticket's end state across two trials. This cut starts where that one ends: the outcome check is already in place and passes honestly, and the problem is the state the grader never looked at. The example moves from a ticket system to a repository test suite, which is the grading model SWE-bench uses (FAIL_TO_PASS plus PASS_TO_PASS).

**Mechanism.** One task, one agent, one environment (three tests), one grader. The grader starts with a single assertion (`login FAIL→PASS`). A harness change makes the agent fix the target test while breaking two unrelated ones; the single assertion still reports PASS. Adding `others PASS→PASS` and regrading the same end state turns the verdict to FAIL.

**Actors and pitches.** Task sends at E6. Agent lands at C5, works at G3 ticks. Suite lands at E5; a test turning green is a `store` click at G5; a test breaking is a `thump` at E4 then D4. Grader reads with a quiet G6 `send`, a passing check is an `ack` at G6, a failing check is a `miss`. PASS is the `chime` at C6; FAIL is a scene-defined `fail` thud (E4 fall, square buzz, 60 Hz sub), a distinct low-frequency failure event. The harness change is a scene-defined `switch` (click plus two rising notes at D5).

Times below are playback seconds in the encoded file (scene authored at speed 1, played at 0.9).

| Time | What moves | State change | Sound |
|---|---|---|---|
| 0.0–0.6 | Stage fades in beneath the persistent title | Suite: test_login FAIL, test_signup PASS, test_reset PASS. Grader: one row, `login FAIL→PASS`. Agent: harness v1 | — |
| 0.8–2.3 | Chip `fix login bug` Task→Agent; Agent brightens and ticks | Agent working | send E6, arrive C5, work ×4 |
| 2.5–3.2 | Chip `patch` Agent→Suite | test_login turns green PASS, green ripple in the gutter | send C6, arrive E5, store G5 |
| 3.9–5.3 | Dot Grader→Suite; grader row flashes; check mark beside test_login | Grader row green; PASS badge pops | send G6, ack G6, chime C6 |
| 5.3–8.0 | Hold | Normal case has landed: one fix, one check, nothing else touched | — |
| 8.0 | Grey ripple on test_login | Fresh environment for the next trial: test_login back to FAIL, grader row back to grey, badge hidden | poof |
| 9.0 | Agent flashes orange | Sublabel becomes `harness v2` in orange and stays | switch D5 |
| 10.3–12.8 | Same task and patch as before | test_login turns green PASS | send E6, arrive C5, work ×4, send C6, arrive E5, store G5 |
| 13.3, 13.6 | Suite jolts twice; red × ripples beside test_signup and test_reset | Both turn red FAIL and stay red | thump E4, thump D4 |
| 14.4–15.9 | Dot Grader→Suite; grader row flashes; check beside test_login only | Grader row green; PASS badge pops under two red rows | send G6, ack G6, chime C6 |
| 15.9–19.0 | Hold | The false pass sits on screen: the viewer sees what the grader did not check | — |
| 19.0 | Orange ripple beside the empty grader slot | Second row `others PASS→PASS` appears; badge hidden; grader rows grey | store C6 |
| 20.3–22.0 | Dot Grader→Suite; row 1 flashes, check beside test_login; row 2 flashes, × beside test_signup then test_reset | Row 1 green, row 2 red | send G6, ack G6, miss, miss |
| 22.8 | FAIL badge pops and jolts; grader flashes red | Verdict FAIL | fail |
| 22.8–25.94 | Hold | Resolved state registers | — |
| 25.94–27.07 | Stage fades out beneath the persistent title | Last frame equals the first | — |

## Comparative revision — 2026-10-19

Edited by gpt-6-astra comparative review. Original author remains anthropic/claude-fable-5-1. Test and grader rows now use 36px type in 660px stores; the grader label identifies required checks and the verdict sits below it. Beat times and grading logic are unchanged. Only the required preserved behaviors are invariant, not all environment state. Final validation and comparison: ../../../reviews/comparisons/agent-evals/after.md. Reproduce with `bash video/agent-evals/fable/render.sh` from the repository root; scratch output is in the comparison folder.
