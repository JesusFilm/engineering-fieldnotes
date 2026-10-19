# Scope and explicit refresh — comparative revision

Objective: distinguish a thread checkpoint from shared conventions and show why correcting storage does not refresh an already supplied context. Reviewer: gpt-6-astra comparative review. The original prototype's model was not recorded.

| Time | Visible causal beat | Sound role |
|---|---|---|
| 0–3s | Title and nodes appear; debugging notes go into Thread A. | Reveal, sends and thread arrivals. |
| 3–5s | Approved STYLE.md r1 enters durable memory. | Send and store. |
| 6–8s | Agent A explicitly retrieves the approved r1 convention. | Request, memory hit, reply. |
| 10–14s | Agent B opens empty; Thread A remains separate. B retrieves r1 from shared storage. | New agent, request, hit and reply. |
| 16–17.4s | Approved source changes to r2; the replacement reaches storage. | Source change, send and store. |
| 17.4–21.3s | B remains at r1 in amber while storage is r2; a separate GET returns r2. | Explicit request, hit and corrected reply. |
| 21.3–25.5s | B is green at r2; source and store agree; hold the result. | Resolution cue, then quiet. |
| 25.5–26s | Entire picture fades; opening and final decoded pixels match. | Closing cue. |

The amber divergence is a viewer aid, not an implemented freshness gate. Checkpoints can persist after the display switches agents. The approved-source policy is assumed, and neither retention nor permissions is demonstrated. The current transcript supplies the same sequence in text.
