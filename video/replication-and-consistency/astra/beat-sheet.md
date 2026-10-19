# Verify the write

Author: **gpt-6-astra**; reasoning **high**; 2026-10-19.

Learning objective: given a successful mutation and a stale verification read, distinguish replica lag from mutation failure and select a fresh authoritative verification path before allowing another action.

Independent example: a release tool's application revision advances from v7 to v8. No baseline media or other variant scene was used. This sequence starts with a normal replica read, reveals a bad observation after success, resolves through read routing, and only then shows replica replay. It complements an infrastructure-oriented treatment by teaching the agent's decision boundary.

| Time | What moves | State change | Sound |
|---|---|---|---|
| 0–5.4 s | Scene opens; READ goes down the right path, v7 returns | Agent observes v7, matching both copies | Opening recover; G5 send/arrive; G5 hit at 3.5 |
| 5.4–10.4 s | SET v8 goes left; ACK v8 returns | Primary v8; replica v7; writes becomes 1; agent expects v8 | C5 send/arrive/store at 6.2; C5 acknowledgement return; E5 ack at 7.9 |
| 10.4–16.2 s | READ goes right; stale v7 returns; focus switches left | Agent shows v7 ≠ v8, HOLD; replica remains healthy | G5 read; G4 stale return; C3 thump at 12.6; C5 recovery sweep at 14.9 |
| 16.2–21 s | Fresh READ goes left; v8 returns | Agent shows equality and VERIFIED while replica is still v7 | C5 sends/arrivals; E5 chime at 18.4 |
| 21–30 s | Lower replay path lights; v8 travels to replica; stage closes | Replica catches up at 24; write count remains 1; matching dark loop endpoints | Strengthened clock at 21; C6 send at 22; G5 store at 24; E5 check at 26; quiet poof at 28 |

Stage: agent (540,650); primary (270,1200); replica (810,1200). Orthogonal read/write paths use x=270 and x=810; replication path runs at y=1410. There are three actors. Cards use 42 px node names, 66 px values, and 36 px detail labels; moving chips use 42 px. Beat results hold approximately two seconds before the next operation.

Assumptions: acknowledged committed write; fresh Read Committed verification; one writer; a healthy available primary; no intervening cache. Application versions are illustrative, not WAL positions. The delay is intentionally stretched and is not a latency estimate. The HOLD state represents a designed tool policy, not a behavior that models automatically implement. This cut does not establish permissions, quorum behavior, failover guarantees, or external deployment completion.

Cues are scheduled on the same 30fps clock as visual events. Pan follows actors; primary C, replica G, successful agent verification E. Exact cues are exported in cues.json. Physical listening has not been performed.
