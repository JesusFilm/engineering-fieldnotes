# Context engineering editorial review

Author: **gpt-6-astra**, reasoning **high**. Retrieval and review date: **2026-10-19**.
Decision: **revise; core**. Preserve id, title, category, roles, and related links. The original is accurate at a high level but too short to teach a team how to change its work. No prior review was treated as evidence.

## Relevance

The first practical transition is from an engineer holding implicit knowledge to an agent receiving explicit, inspectable inputs. Session handoffs expose this dependency without requiring a retrieval service or a multi-agent platform. The guide now gives a concrete v1 invoice contract, a restart exercise, and observable verification criteria. Core placement is an editorial recommendation; promotion into the default curriculum remains the coordinator/human editor's decision. There are no prerequisite chapters; readers should already understand files, API compatibility, and tests.

## Every original assertion

| Original assertion | Decision and correction | Evidence / scope |
|---|---|---|
| Summary: selects instructions and evidence at each step | Keep, broaden to current state and verify handoffs. Distinguish available files from material actually loaded. | [1], definition and retrieval sections. |
| Overview: context includes tools, retrieved material, history, task state | Keep, clarify tool descriptions/results and per-invocation visibility. Avoid implying disk storage equals active context. | [1], anatomy and just-in-time retrieval. |
| Overview: retrieval, trimming, compaction determine fit and visibility | Revise: they are distinct actions; compaction is lossy and its summary may omit important requirements. | [1], compaction section; [3], cross-session failures. |
| Why: more input can be irrelevant or stale | Keep as a possibility. Never infer that all added input is harmful or that newer models share a fixed failure rate. | [1], relevance discussion; [2], task-specific context-length trade-off. |
| Why: more input increases cost and latency | Qualify. Additional uncached processing and retrieval can cost time/resources; cached prefixes alter the relationship. Do not promise a cost reduction from shortening every packet. | [2], §5; [4], how caching works and pricing. |
| Example: load stack trace/module, retrieve callers later | Plausible engineering example, not empirical evidence; replace with a richer invoice handoff and keep targeted trace/code retrieval in walkthrough. | [1] supports just-in-time retrieval; specific order and invoice fixture are our teaching design. |
| Judgment: decide constraints surviving compaction versus retrievable evidence | Keep and operationalize: explicit invariant, source reference, current patch inspection, repeatable check. | [1] supports preserving critical details; [3] supports progress artifacts and verification; packet schema is editorial advice. |
| Next: what constraint disappears first? | Replace passive reflection with restart exercise. Do not assert a predictable loss order. | No source establishes such an order; observe the actual workflow instead. |

## Sources actually opened

[1]: https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents
[2]: https://arxiv.org/html/2307.03172v3
[3]: https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents
[4]: https://platform.claude.com/docs/en/build-with-claude/prompt-caching

1. [Effective context engineering for AI agents][1] (2025-09-29). Read definition, context composition, just-in-time retrieval, and compaction/structured-note sections. Primary engineering report, not independent comparative evidence. Do not repeat its broad “all models”/attention-budget language as a demonstrated universal mechanism.
2. [Lost in the Middle][2] (v3, 2023-11-20). Read abstract, models (§2.2), and additional-context trade-off (§5). Tests multi-document QA and key-value retrieval on specified older models. Supports caution and task-specific evaluation, not a 2026 agent failure-rate claim. The guide explicitly bounds the evidence.
3. [Effective harnesses for long-running agents][3] (2025-11-26). Read cross-window failures, progress artifacts, testing, and limitations/future work. Supports structured continuation and rerunning checks. Its web-app experiments do not establish a best architecture for every engineering task. No product capability is assumed for this exercise.
4. [Prompt caching documentation][4] (live page, retrieved 2026-10-19). Read caching mechanism and pricing sections. Supports the cost/latency qualification only. No prices, model names, TTL values, or API-specific promises imported into the guide.

All four actual source pages were accessible. No inaccessible page or search snippet is counted as verified. Sources [1] and [3] are vendor-authored engineering reports with concrete mechanisms and limitations; marketing claims were excluded. Historical research remains historical even when retrieved today.

## New claim mapping

- Per-call context, evidence retrieval, and possible summary omission: [1].
- Evidence-position sensitivity: [2], restricted to tested tasks/models.
- Multi-session progress notes and fresh checks: [3], engineering observations rather than guarantees.
- Caching can change token-processing costs and latency: [4].
- Invoice `total_cents`/`amount` story, exact handoff fields, exercise design, and retained human responsibility: explicit editorial recommendations, not measured outcomes.
- Green fixture result is coverage-limited: ordinary test semantics and an explicit boundary on this example, not a broad safety claim.

## Video boundary

The independent Astra cut teaches requirement loss during a handoff and a visible repair using source retrieval plus a fixture. It does not claim compaction always loses constraints, an omitted constraint always causes a bug, or restoring a sentence guarantees compliance. The exercise deliberately allows an agent to rediscover a missing rule itself. The video uses a schematic named field to make the cause observable in 30 seconds; the text supplies the fuller packet, source freshness, and review responsibility.

No baseline source or competing scene was read. No comparative winner is claimed. Technical video verification is recorded separately in `video/context-engineering/astra/review.md`.

## Limitations

No live agent experiment or repository-specific invoice implementation was run. The practical example and outcome are authored illustrations. The guide offers no benchmark, measured token saving, or optimal context length. Source documentation may change; claims are bounded to retrieval on 2026-10-19. The article is 731 words under the recorded content-count convention (excluding URLs and metadata), within the requested 550–800 words.
