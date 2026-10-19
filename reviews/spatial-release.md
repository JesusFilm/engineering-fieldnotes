# Spatial investigation release review

All 18 concepts received an Opus 5.5 Blender attempt, an Astra 6 low critique, and an explicit Opus revision. Four pass the spatial gate; fourteen are omitted. Substantive redesigns received a further Astra gate.

## Decision record

| Concept | Decision | Evidence / reason |
| --- | --- | --- |
| harness-engineering | omitted | The redesigned vault remains a planar route/enforcement diagram, overlaps guardrails, and adds no essential spatial inspection. See [review](spatial/harness-engineering/review.json) and [revision](spatial/harness-engineering/revision.json). |
| loop-engineering | accepted | The selector plate physically separates probe motion from test contact. The retained contact or gap can be inspected from different angles, distinguishing a failed assertion from no executed assertions. See [review](spatial/loop-engineering/review.json) and [revision](spatial/loop-engineering/revision.json). |
| context-engineering | accepted | Orbiting under the bridge exposes a defect hidden from the banks. The repair can occupy the same three-dimensional clearance volume as the boat; strengthening within the pier footprint avoids that conflict. See [review](spatial/context-engineering/review.json) and [revision](spatial/context-engineering/revision.json). |
| tool-design | omitted | The useful distinction is record completeness and coverage; 3D lids add concealment, not explanatory depth. See [review](spatial/tool-design/review.json) and [revision](spatial/tool-design/revision.json). |
| memory-architecture | omitted | Memory authority and retrieval are record-selection relationships; alternate physical metaphors added labels or misleading similarity geometry. See [review](spatial/memory-architecture/review.json) and [revision](spatial/memory-architecture/revision.json). |
| orchestration-patterns | omitted | Snapshot identity and report completeness are logical checks; proposed spatial mechanisms obscure them. See [review](spatial/orchestration-patterns/review.json) and [revision](spatial/orchestration-patterns/revision.json). |
| guardrails-and-permissions | omitted | Route coverage is clearer in a flat diagram; walls only obstruct the same relationship. See [review](spatial/guardrails-and-permissions/review.json) and [revision](spatial/guardrails-and-permissions/revision.json). |
| agent-evals | omitted | A second design adds independent test choices but remains a flat blocked/open-lane interactive; depth does not carry the lesson. See [review](spatial/agent-evals/review.json) and [revision](spatial/agent-evals/revision.json). |
| human-in-the-loop | omitted | Exact artifact and target binding is a comparison table; the physical key metaphor misleads. See [review](spatial/human-in-the-loop/review.json) and [revision](spatial/human-in-the-loop/revision.json). |
| observability-and-tracing | omitted | A branching trace graph communicates the mechanism without artificial three-dimensional concealment. See [review](spatial/observability-and-tracing/review.json) and [revision](spatial/observability-and-tracing/revision.json). |
| load-balancing | accepted | A held routing tie can be inspected from above (one request each) and from the side (4 versus 2 remaining work), exposing the dimension discarded by the routing metric. See [review](spatial/load-balancing/review.json) and [revision](spatial/load-balancing/revision.json). |
| cache-aside | omitted | The additional insight concerns operation ordering; three holders with revision digits add no spatial depth. See [review](spatial/cache-aside/review.json) and [revision](spatial/cache-aside/revision.json). |
| queues-and-backpressure | omitted | Waiting accumulation along a single line is already explained by the video; 3D adds complexity. See [review](spatial/queues-and-backpressure/review.json) and [revision](spatial/queues-and-backpressure/revision.json). |
| idempotency | omitted | The concurrent-claim redesign is a useful ordering/topology experiment, but its geometry remains planar and does not justify 3D. See [review](spatial/idempotency/review.json) and [revision](spatial/idempotency/revision.json). |
| replication-and-consistency | omitted | The revision is a labeled floor plan; depth and inspection add nothing beyond the stale-read video. See [review](spatial/replication-and-consistency/review.json) and [revision](spatial/replication-and-consistency/revision.json). |
| timeouts-and-retries | omitted | The revised manifold clarifies retry counts but remains a branching tree whose depth adds little. See [review](spatial/timeouts-and-retries/review.json) and [revision](spatial/timeouts-and-retries/revision.json). |
| canary-deployments | accepted | Two independently opened cohort seams expose a height/area/volume relationship: fixed failure volume is concentrated from 0.4% pooled to 4% on either single dimension and 40% at their intersection. See [review](spatial/canary-deployments/review.json) and [revision](spatial/canary-deployments/revision.json). |
| oauth-pkce | omitted | Physical matching metaphors misrepresent a one-way cryptographic comparison; storage alternatives reduce to tables and add no spatial depth. See [review](spatial/oauth-pkce/review.json) and [revision](spatial/oauth-pkce/revision.json). |

## Presentation and verification

Video remains the default. Choosing Explore in 3D pauses it and loads one larger iframe; returning to video removes that iframe. Accepted chapters have a quiet 3D indicator in the index. Omitted scene directories are excluded from production output.

Each accepted scene has browser observations and screenshots in its verification.json and evidence directory. Desktop and420px scene checks cover the causal states, retained results, reset and keyboard controls. The chapter layout was also tested at390px, with no horizontal overflow. Small engraved annotations may require zoom; precise outcomes remain in the caption.

The shared scheduler regression exercises the actual scheduling and lifecycle functions. Browser testing exposed duplicate animation-frame requests, now fixed. A code review found back-forward-cache disposal and static-module-loading failure paths; both are fixed. Back navigation worked in the browser; the cached lifecycle path is covered by the source-based test. A missing module fixture displayed the independent fallback and was removed afterward.

## Provenance and limits

Three resumed authors unexpectedly executed intermediate revisions with Astra low. Those records are retained as history, and fresh explicitly configured Opus agents completed the final passes. [Configured model evidence](spatial-provenance.json) records the observed turn-context fields.

These are authored explanatory models, not simulations of an LLM or guarantees about a real system. No full accessibility audit or connection-speed benchmark is claimed. Final browser QA used the app browser; author-only tests are distinguished in each revision.

## Validation

- 54 video assets remain bound to their existing verification hashes.
- 18 concept decisions, reproducible Blender sources, valid GLBs, critique/revision hashes and accepted browser evidence are checked by scripts/check_spatial.py.
- Production build excludes rejected scenes and keeps all chapter links and anchors valid.
- The source-based scheduler test checks bounded frame requests, final pose rendering, idle/hidden suspension and cached-page lifecycle.

This change is prepared as a pull request for editorial review. It does not change the default curriculum or recommended video cuts.
