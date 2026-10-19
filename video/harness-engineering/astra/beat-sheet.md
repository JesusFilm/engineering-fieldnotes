# Prove the patch

Author: gpt-6-astra. Reasoning: high. Date: 2026-10-19.

Learning objective: given a delegated code change, distinguish the agent's proposed patch from executable acceptance evidence, return a failed assertion for repair, and rerun checks before human review.

The example is a deliberately simplified invoice API contract: owning tenant receives 200; another tenant receives 403. Two cases illustrate feedback, not comprehensive security verification. The diagram is the check/execution slice of a harness, not its entire architecture.

| Playback | What moves | State change | Sound |
|---|---|---|---|
| 0–5 s | Stage opens; patch envelope travels to the owning-tenant check at 1.80 s | At 2.55 s, 200 becomes a green check; the other case is unrun | recover C4 at .50; send C6 at 1.80; arrive E5 at 2.55 |
| 5–9 s | Second envelope takes the other branch | At 5.75 s, 200 becomes a red cross against EXPECT 403; review path blocks at 6.60 | send C6 at 5.00; crash C3 at 5.75; thump C3 at 6.60 |
| 9–15 s | Red failure envelope returns up the right-side wire at 9.20–10.40 | Agent pulses, PATCH 1 becomes PATCH 2 at 11.40; both old results clear in the same frame at 11.40 | send G5, arrive C5, work C4, poof C4 respectively |
| 15–21 s | Both cases run again, sequentially | At 15.75 owning tenant still returns 200; at 18.15 other tenant now returns 403; both checks green | send C6 at 15.00/17.40; arrive E5 at 15.75/18.15 |
| 21–28 s | Green evidence envelope moves down to the reviewer | Human review changes to READY at 21.75; holds until 25.50; full fade completes at 26.50 | send E6 at 21.00; chime G5 at 21.75; poof C4 at 25.50 |

Each send is quieter than its arrival. The failure has the strongest per-cue gain. Agent notes center on C, check results on E, and ready-for-review on G. Pan follows node position. No voice-over or music bed.

The first and last frames are full black, including the title, to close on a resolved state without implying that checks reverted. There is one deliberate 3.75 s hold on the completed evidence before the closing fade. All semantic events have cues; continuing interpolation and decay do not receive redundant sounds.

## Independence

Only the original concept JSON and a six-frame contact sheet of the encoded baseline were inspected. No other variant scene was read. The baseline shows session 1/session 2 with stored progress; this variant shows an authorization counterexample, feedback, invalidation of stale results, rerun, and a human handoff. It complements persistence with acceptance evidence. No comparative quality recommendation is claimed.

## Stage

1080×1920, 30 fps, 28 s. Agent (540,650), check container (540,1100), owning-tenant check (300,1085), other-tenant check (780,1085), human review (540,1560). Main wires run top-down, feedback runs up the right edge. Labels are 40–98 px at source resolution; outcome labels are 52 px. Text is confined to node labels, short state labels, and expected/actual values.

## Comparative correction (2026-10-19)

Edited by gpt-6-astra comparative review: invalidation and its poof cue now coincide with PATCH 2 at 11.40s. Original author and reasoning provenance above are retained.
