Comparative correction (2026-10-19): gpt-6-astra comparative review. Original author provenance below is unchanged; current comparison is recorded in `../../../reviews/comparisons/loop-engineering/after.md`.

# Evidence first

Author: gpt-6-astra. Reasoning: high. Date: 2026-10-19.

Learning objective: given a coding agent's test result, distinguish a valid assertion failure from absent validation, and route it to a bounded repair or an evidence-bearing human handoff. A passing selected suite exits to review; it does not authorize merge.

Independent conception: no other variant scenes or encoded media were inspected. This cut uses two tasks and three result classes rather than illustrating repeated unsuccessful attempts. It complements the original chapter's iteration-cap example by explaining what can stop a loop before its budget is spent. Independence of conception is established; comparative quality awaits the coordinator's review.

| Time | What moves | State change | Sound |
|---|---|---|---|
| 0–4.4 s | Test request descends; result reaches gate | Task A: 12 selected, one assertion fails; gate permits repair | Opening arrive C5; send C6; work E5; thump E4; gate arrive G5 |
| 4.5–9.7 s | Feedback travels up the left return wire; one patch descends to tests | patch 0 becomes patch 1; permit is consumed, gate resets to WAIT and patch is marked untested; selected suite then passes | send C6; work C5/E5; chime E5 |
| 9.8–14.1 s | Passing result descends through gate to engineer | Loop exits to human patch review | send C6; arrive G5; store C6 |
| 14.2–20.1 s | Separate task B starts; no-tests result descends | 0 selected / exit 5 closes return path; patch 0 remains | arrive C5; send C6; work E5; crash E3 at 16.8; gate thump G3 at 18.6 |
| 20.2–28 s | Evidence envelope goes to engineer; stage fades | Human inspects discovery; agent stays stopped | send C6; deliver C5 at 21.2; ack G4 at 22.5; poof C4 at 25.5 |

Stage: agent (570,590), pytest (570,920), gate (570,1250), engineer (570,1610). Return path uses x=145 and is physically blocked at (145,1120) for task B. All main labels are 52px; state labels 44px. Black boundary frames are intentional. The fade ends at 26.5s; duration is 28s.

Numbers and timing are illustrative. Task B has a selector/discovery problem in the guide. This repair-only policy forbids automatic product changes when evidence is missing; other explicitly scoped tooling-repair agents could diagnose it. The animation does not teach timeout implementation, retry backoff, flaky-test diagnosis, or complete code review.
