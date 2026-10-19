# Retry the intent

Author: **gpt-6-astra**, high reasoning. Date: 2026-10-19. Duration: 30 seconds, five beats.

Learning objective: given a lost response from a state-changing agent tool, preserve the logical operation’s key and arguments on retry, and distinguish changed intent from another attempt.

The illustrative system is an in-house ticket tool whose key record and ticket share one database transaction. `k7` is a deliberately shortened example key, `v1`/`v2` are release parameters, and `#47` is the resulting ticket. This is not a feature claim about an existing ticket service. Key retention, authorization, recovery after rollback, concurrency, and external providers are covered in the guide, not proven by the animation.

| Time | What moves | State change | Sound |
|---|---|---|---|
| 0–6.2 s | Agent sends k7/v1; one WRITE enters the database | Empty key and ticket become k7→#47 and #47/v1 simultaneously; count becomes 1 | Opening ack C5; send C6; arrival E5; store G5; result ack E5 |
| 6.2–11.2 s | #47 reply disappears halfway back | Agent becomes “outcome unknown”; database remains committed; attempt becomes 2 | Send C6; crash C3 at 6.9; retry clock C5 at 9.8 |
| 11.2–19 s | Same key/payload travels to tool; lookup visits saved key; #47 returns | Tool enters LOOKUP then REPLAY; agent receives #47; ticket count stays 1 | Send C6; arrive E5; hit G5 at 13.6; deliver C6 at 16.8 |
| 19–25 s | Parameter changes to v2; request and rejection travel | Same key with changed payload produces MISMATCH; saved v1 remains | Clock C5 at 19; send C6; arrive E5; low thump C3 at 21.6; rejected thump C4 at 23.3 |
| 25–30 s | Agent/tool dim; retained ticket pulses; stage fades | Unchanged ticket and count receive final focus; title-only loop boundary | Chime G5 at 25; soft poof C4 at 28.7 |

Geometry: caller (540,610), tool (540,1000), database enclosure (540,1410), saved key (310,1440), ticket (770,1440), counter (540,1720). Requests descend at x390; replies ascend at x690. The loss label sits left of both paths. Minimum meaningful text is 40px at source resolution (~13px at 350px width), with key values 52px and counter 64px.

The replay beat deliberately visits only the key record; there is no second WRITE. Normal commit gets 1.9 seconds before the result changes, successful replay gets 2.2 seconds, and the final state has a deliberate 3.7-second hold before fade. Each meaningful transition has a cue; `cues.cjs` exports all 25 events.

Independence: authored from the original JSON and primary sources without reading any other variant scene or encoded baseline. The original guide’s checkout example is replaced by a release workflow, and changed intent is explicitly rejected after the successful replay. No comparative ranking is claimed.
