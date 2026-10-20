# Source basis for the focused sequences

The curriculum uses the existing primary-source-backed guides. Each generated storyboard preserves those source links and their original retrieval dates. During authoring on 20 October 2026, the following primary references were checked against the new lesson mechanisms:

- Cache aside: Azure Architecture Center cache-aside pattern — misses, filling, stale copies and invalidation.
- Queues: Python asyncio Queue documentation — queue bounds, task completion and backpressure.
- Idempotency: AWS Builders Library, Making retries safe with idempotent APIs — request identity, duplicate outcomes and changed intent.
- Timeouts: AWS Builders Library, Timeouts, retries and backoff with jitter — timeout ambiguity, bounded attempts and backoff.
- Replication: PostgreSQL 18 warm-standby documentation — lag, asynchronous replication and possible failover data loss.
- Canary releases: Google SRE Workbook, Canarying Releases — limited exposure, control comparison and misleading aggregates.
- OAuth PKCE: RFC 7636 — verifier, challenge binding and code exchange; overlapping login attempts must retain their matching verifier.
- Harnesses, loops and orchestration: Anthropic engineering articles Building effective agents and Effective harnesses for long-running agents — runtime responsibilities, tool feedback, chains, routing, parallel work and evaluator loops. Pytest exit-code documentation supports the explicit no-tests case.
- Context: Anthropic Effective context engineering for AI agents — selected context, retrieval and continuity.
- Tools: MCP tools specification (2025-11-25) — input schemas, results and errors. Existing guide sources additionally support pagination and result boundaries.
- Memory and human review: LangGraph persistence documentation, Anthropic context-engineering guidance and OWASP Transaction Authorization — checkpointed state, deliberate persistence and action-bound approval.
- Authorization: OWASP Authorization and Transaction Authorization cheat sheets — enforced permissions, default deny, per-request checks and binding approval to concrete action data.
- Evals: Anthropic Demystifying evals for AI agents — tasks, trials, graders and limits of outcome evaluation.
- Tracing: OpenTelemetry traces, context propagation and handling-sensitive-data documentation — span structure, propagated context, coverage and sensitive attributes.

Exact URLs are retained in each topic's storyboard and written guide. These examples simplify implementation details explicitly in the lesson explanations. Durations, capacity, versions, failure timings and percentages in animations are authored examples, not benchmarks. The source checks support mechanism accuracy; they do not establish learner comprehension. Load balancing has its own source record in `video/load-balancing/sequence/README.md`.
