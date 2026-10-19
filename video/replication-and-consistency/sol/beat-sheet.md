# Read your write — Sol

Learning objective: when an agent delegates a tool step that depends on its just-saved plan, require a sufficiently recent plan version in the tool wrapper and route a stale dependent read to the current primary. A successful save alone does not establish visibility on an asynchronous replica.

Mechanism: compare a returned plan revision with the revision the dependent step requires. Normal → commit while replica lags → stale response held → primary retry accepted → replay catches up → later replica read accepted. This is an independently authored version-check story, based only on the original concept JSON and primary sources; no other variant source was read.

| Playback | Movement | State change | Sound |
|---|---|---|---|
| 0–6.5 s | Read replica v1; v1 crosses check to tool | v1 matches required v1; tool uses v1 | G5 send/arrival for replica; E5 hit/chime for check/tool |
| 6.5–10.8 s | PUT v2 to primary; ACK returns | Primary v2, replica v1; wrapper now requires v2 | C5 store and ACK, E5 requirement click |
| 10.8–15.4 s | Replica returns v1 | v1 < v2; check jolts red; tool stays held | G5 reply, E4 thump at 13.1 |
| 15.4–21.2 s | Read primary; v2 reply; v2 follows the green gate to tool | Equal versions release step while replica still v1 | C5 read/reply; E5 hit and tool chime |
| 21.2–24.5 s | Copy v2 between nodes | Replica becomes v2 at 22.7 | G5 copy departure, arrival and store |
| 24.5–32 s | Later tool step waits; fresh replica read v2; green gate delivers v2; fade | Replica now satisfies requirement; final hold then flat-background boundary | G5 read/reply; E5 hit/chime; soft poof on fade |

Layout: agent (540,570), read check (540,890), primary (265,1260), replica (815,1260), tool (540,1660). All coordinates are 1080×1920 pixels. Large state values are 48–64 px; packets and node names 38–40 px. Sparse dotted paths, distinct actor pitches, deliberate holds and dark stage.

The replica's blue v1 is healthy but stale; only the dependent-read check turns red. The copy is illustrative: elapsed time is not a freshness guarantee.

Comparative revision (2026-10-19, gpt-6-astra comparative review): the green check-to-tool wire is visible during approved-version delivery only. The crossing copy wire is hidden during that delivery to separate the two flows visually; this is focus control, not a claim that replication stops. The packet is a compact v1/v2 chip. At 24.5 s the later tool step returns to waiting before its own verification. Original GPT-6.1 Sol authorship and all beat timings are retained.
