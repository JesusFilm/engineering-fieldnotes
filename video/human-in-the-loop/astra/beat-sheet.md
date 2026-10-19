# Approve the artifact

Author: gpt-6-astra · reasoning: high · 2026-10-19

Learning objective: When an agent revises a release artifact after human approval, an engineer can identify why the old approval must not authorize the new artifact and where the executor must enforce that boundary.

Independent design: authored from the original concept and primary sources. No other variant scene or baseline media was read. Changes the database-migration/checkpoint example into a release-artifact substitution example, with a visible comparison gate. This is an independently authored alternative, not a comparative recommendation.

| Time | What moves | State change | Sound |
|---|---|---|---|
| 0–5.5 s | Agent output travels down to artifact | Tests pass; artifact A exists; production remains unchanged | work/chime C5, send C6, arrive E5, store C5 |
| 5.5–10.2 s | A travels to reviewer; decision travels to approval | Review A becomes approval A; closed barrier remains | arrive/chime/store E5 |
| 10.2–17 s | Revised build B and approval A reach executor | Tests refresh; mismatch B ≠ A; approval A becomes stale; barrier stays closed | work/chime C5; miss C5; crash C3 at 13.5; thump E3 at 14.5 |
| 17–23 s | B goes back to reviewer; new decision arrives | Reviewer approves B; executor returns to RECHECK | arrive/chime/store E5; ack G5 |
| 23–30 s | B and its approval reach executor; release reaches production | Match B = B retracts barrier; B becomes live; fade closes loop | recover G5 at 23.8; send/arrive; chime G5 at 25.6; poof at 28.5 |

Layout: agent (280,580), reviewer (800,580), artifact (280,900), approval (800,900), executor (540,1220), split barrier (540,1410), production (540,1630). Wires use box anchors; comparison inputs meet above executor. The up-and-across review route is distinct from the downward execution route. Essential labels are 44–46 px (14–15 px at 350 wide); title 82 px. The footer explicitly labels the release as illustrative.

Boundary: A/B stand for immutable artifact identities, not mutable tags or trusted model strings. The comparison gate stands for application enforcement over the action, target, reviewer and current prerequisites, simplified to artifact identity. No claim that LangGraph, GitHub, a prompt, or a remembered approval implements this whole design automatically. No claim that tests or approval guarantee a correct release. Durable storage, cancellation, rejection, concurrent deployment and retry handling are in the guide, not this cut. Human decision and test durations are compressed; they are not benchmarks.
