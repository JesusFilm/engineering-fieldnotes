# Retry budget

Author: gpt-6-astra · high reasoning · 2026-10-19.

**Learning objective:** Given a stalled agent tool read, explain why a retry must consume the existing operation budget and why exhaustion returns an unknown outcome rather than starting another downstream attempt.

Independent example: a release assistant reads CI status. Three actors: Agent (540,600), Tool runtime (540,910), CI service (540,1250). Dotted wires connect the boxes' bottom/top anchors. A 760px budget bar sits at (540,1530), with a large remaining-time label at y1620. This is illustrative application policy, not a specific SDK feature.

| Time | What moves | State change | Sound |
|---|---|---|---|
| 00–07 | Request descends, successful response ascends; budget drains then stops | CI COMPLETE → runtime RESULT RECEIVED → agent STATUS KNOWN | Agent C5 send/arrive; service G5; success C6 chime; quiet clock |
| 07–13 | New read descends; 12-second budget drains from 08 | READY → ATTEMPT 1/2, service NO REPLY YET | Store reset at 7; sends/arrivals; one clock tick per second |
| 13–15 | Runtime jolts; clock rotates; budget keeps draining | TIMEOUT, WAIT 2 s; 7 → 5 seconds remain | E4 thump at 13, clock at 14 |
| 15–20 | One retry travels to CI; white mark records remaining budget at retry | ATTEMPT 2/2; budget never refills | G5 send/arrive, clock ticks |
| 20–26 | Runtime closes; unknown result travels up; repeated request stops at runtime; fade | DEADLINE REACHED → STATUS UNKNOWN → REPEAT BLOCKED; no third downstream envelope | Crash at 20, C4 deliver at 21.1, E4 thump at 22.6, poof at 24.8 |

The second operation begins at 8 seconds and closes at 20: 5-second first attempt + 2-second sampled backoff + 5-second retry = 12 seconds. Its attempt cap and deadline happen to coincide. A real policy stops on whichever limit occurs first. Normal operation has its own earlier budget. No response from the service means uncertainty, not proof of service failure.

The sampled 2-second delay represents one possible randomized delay. A single-client shot cannot teach statistical jitter, so no such visual proof is claimed. The video teaches an application gate, not a prompt instruction. State changes and packet arrivals share exact authored timestamps with audio cues; fades have paired sounds.
