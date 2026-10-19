# A hit can be stale

Author: gpt-6-astra · high reasoning · 2026-10-19.

**Learning objective:** Given a cached runbook and an independently edited source, explain why an agent can receive a stale cache hit, and trace explicit deletion followed by a tool-managed miss, source read, and refill.

**Independent structure:** Warm-cache success → source edit and stale delivery → explicit invalidation → source refill → warm-cache reuse. No other variant scene or encoded media was inspected. This is not an initial miss/hit/TTL-expiry sequence. Source v1/v2 labels are illustrative revisions, not latency or correctness measurements.

| Time | What moves | What changes | Sound |
|---|---|---|---|
| 00.00–06.40 | GET: agent → tool → cache; v1 returns through tool | Agent receives v1; source stays untouched | Quiet C6 sends; cache E5 hit; tool C5 arrival; agent C5 delivery |
| 06.40–14.10 | Source edits locally; next GET again returns cached v1 | Source becomes v2, then agent/cache highlight stale v1 | G5 store at 6.40; E5 hit at 9.95; louder C5 thump at 11.80 |
| 14.10–17.00 | DEL travels from application/tool layer to cache | Cached v1 becomes an empty slot (∅) at 14.85 | C6 send; E5 poof at deletion |
| 17.00–25.00 | GET → cache; MISS → tool; GET → source; v2 → tool; SET v2 → cache; v2 → agent | Cache fills v2 at 22.35; agent receives it at 23.35 | E5 miss; G5 work; C5 arrival; E5 store; C5 delivery |
| 25.00–31.00 | Repeat GET takes the cached route; stage fades after final hold | v2 is reused without another source read; black endpoints match | E5 hit at 26.60; C5 delivery at 28.25; quiet poof at 30.10 |

Four actors: agent (540,625), application read tool (540,935), cache (265,1320), source (815,1320). Values and revision numbers carry the comparison; the red highlight is for the viewer and is not a running freshness detector. The tool owns refill and the recovery delete; it is not the language model directly manipulating storage. The full key in the guide includes team/service/schema scope; `guide` is a short display alias.

The paused-reader race, authorization checks, TTL behavior and source outage are explained in the chapter, not claimed by this serialized video. Main landing holds: 4.45–6.40, 11.80–14.10, 14.85–17.00, 23.35–25.00, 28.25–30.10. These are deliberate 1.65–2.30 second holds.
