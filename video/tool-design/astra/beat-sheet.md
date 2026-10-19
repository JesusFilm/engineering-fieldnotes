# Empty ≠ failed

Authored independently by **gpt-6-astra**, high reasoning, 2026-10-19.

Objective: Given an incident-search tool, distinguish completed absence from failed retrieval and design an explicit error result with a caller-enforced retry budget. Example only: payments incidents in the last hour. Tool return semantics are the mechanism; the animation does not predict model behaviour.

| Playback time | What moves | State change | Sound |
| --- | --- | --- | --- |
| 00.0–06.8 | Request goes from agent through tool to incident index; empty array comes back | Available index completes with no records; agent shows 0 matches | C6/E6 sends, G5/E5 arrivals, C5 delivery; opening recover |
| 06.8–12.8 | Same request; TIMEOUT reaches adapter but [] travels onward | Index fails; adapter erases failure; false 0 matches is crossed out | Store transition, crash at 8.5, thumps at 9.6 and 10.6 |
| 12.8–19.7 | Contract changes; another failed request returns ERROR | Backend stays failed; tool preserves error; agent shows Unknown | Recover at 12.8, thump at 15.5/16.5, C5 delivery at 17.5 |
| 19.7–24.5 | Waiting agent pulses; one full budget segment becomes zero as one request leaves | Caller consumes one retry; recovered index returns INC-42 | Clock ticks, C6 send at 21.0, recover 22.0, G5 hit 22.5, E5 store 23.5 |
| 24.5–30.0 | OK response lands; successful state holds, then whole scene fades | Agent reports returned INC-42; loop ends at identical empty frame | C5 chime and phase store at 24.5; poof fade at 27.2 |

Normal/problem/resolution are distinct. Three actor boxes stay in the same positions: agent (540,670), tool (540,1060), index (540,1460); dotted links connect their bottom/top edges. Phase labels sit at y475, retry budget y1675, discrete budget bar y1740, query scope y1790. Important node labels are 44–56px, transient chips 44px, phase labels 42px. No explanatory paragraphs appear onscreen.

The one-retry success is illustrative, not a promise of backend recovery. `status`, `items`, and `code` are application choices; MCP uses `isError` for execution failures. The guide covers partial coverage and authorization; the video intentionally concentrates on empty versus failed. The text equivalent in variant.json has five timestamped descriptions.

Comparative corrections by gpt-6-astra comparative review, 2026-10-19; original scene authorship retained.
