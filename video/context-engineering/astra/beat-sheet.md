# Keep the contract — Astra

Author: gpt-6-astra. Reasoning: high. Duration: 30 seconds. Independent scene authored from the original concept; no baseline media or other variant scenes were inspected.

Learning objective: after resuming an agent, preserve the API compatibility constraint explicitly, reload its authoritative source, and rerun a matching fixture before accepting the patch.

The invoice example uses `total_cents` as the existing v1 field. `amount` is a hypothetical incompatible replacement. The patch fixes a timeout across two sessions; omission in a handoff is one possible failure, not an inevitable effect of compaction. The test is a visible external check, not the model declaring success. Human review remains pending.

| Time | What moves | State change | Sound |
|---|---|---|---|
| 0–6.2 | Two-row task packet feeds Session 1; `total_cents` travels into the fixture | Known compatible patch passes; goal and constraint remain visible | Recover at 0.4; C5 send/arrival at 1.6/2.4; E5 at 3.2/4.0; G5 chime at 4.2 |
| 6.3–10.2 | Handoff pulses; bottom row jolts red and empties | Goal survives; compatibility requirement is absent, leaving a dashed slot | C5 store at 6.3; low C3 miss at 7.4, with its tail accompanying removal |
| 10.3–15.9 | Session 2 consumes incomplete packet; `amount` reaches same fixture | Prior PASS resets to WAIT, then FAIL; fixture jolts | Clock at 10.3; C5 send/arrival 11.2/12.0; E5 12.8/13.6; crash 13.8 |
| 16–20.9 | v1 contract appears, sends `total_cents` upward | Missing row is restored; checked handoff retains requirement | Recover at 16; C5 send/arrival 17.3/18.1; store 18.1 |
| 21–30 | Repaired packet feeds agent; `total_cents` reaches fixture; human-review label appears | WAIT becomes PASS at 23.8; review remains required; full canvas fades for exact loop | C5 21/21.8; E5 22.8/23.6; G5 chime 23.8; ack 26; quiet poof 28.6 |

Stage: context (540,660), source (265,1090), agent (780,1090), fixture (540,1490), review (540,1715). Dotted wires have explicit edge anchors. The source remains hidden until recovery so it does not compete with the missing-row contrast. Essential text is 39–58px, title 88px, subtitle 36px. Packet chips use 44px text. Beats hold about two seconds after landing.

Teaching boundaries: does not teach retrieval ranking, token budgeting, tool schemas, permissions, prompt injection, memory persistence, or a particular product's compaction API. No measured agent behavior, speedup, test coverage guarantee, or proof that handoffs eliminate errors is implied. Recovery is an engineering intervention represented schematically. This complements the original guide's just-in-time debugging example through a cross-session compatibility failure.
