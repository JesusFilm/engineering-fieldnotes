# Load balancing: substantive review

Author: gpt-6-astra. Reasoning: high. Retrieval/review date: 2026-10-19.
Decision: **revise; retain as reference**, rather than promote to the core adoption path.

The original is directionally sound but a definition is insufficient for this audience. Balancing is relevant when a team operates replicated services behind agent tools, not a prerequisite for using a coding assistant. The revised chapter gives a trace-based decision, a manual-to-agent transition, observable outcomes, and a small experiment. This placement is editorial judgment, not a vendor claim.

## Every original assertion

| Original field/assertion | Judgment and correction | Evidence |
|---|---|---|
| Summary: distributes requests across service instances under a policy | Keep mechanism; revise scope because some balancers select at connection granularity. | gRPC, “Proxy Load Balancer options”; Envoy, “Supported load balancers.” |
| Overview: chooses eligible backends using health and load signals | Overgeneralized. Round robin does not measure current load. Envoy says members are considered healthy without active checks unless health status supplies otherwise. Eligibility and load policy must be distinguished. | Envoy, introduction and “Weighted round robin.” |
| Overview: equal request counts do not imply equal work | Keep, with mixed-cost tool calls and distinct total/outstanding/running counts. | Google SRE, “Varying query costs.” |
| Why: one instance can overload while others have spare capacity | Keep conditional; add the observable signature and avoid claiming it is every agent slowdown. | Google SRE, “The Ideal Case.” |
| Example: pool drains before shutdown and routes to healthy instances with available capacity | Revise as an explicit operational procedure, not automatic behavior or known spare capacity. Draining depends on configuration, protocol, and shutdown sequence. | Envoy, “Draining.” |
| Judgment: choose policy for request cost, connections, health limits | Keep but make actionable: inspect signals, use identical replay, retain rollback. Least-request is a heuristic. | Google SRE, least-loaded limitations; Envoy, “Weighted least request”; gRPC. |
| Next: long-lived connections can prevent distribution to new instances | Preserve the diagnostic distinction without implying all long-lived connections behave this way. L7 proxies can distribute streams; L4 does not choose per RPC. | gRPC, transport/application proxy discussion. |

Identity/title/category/roles/related were preserved verbatim. No prior review was treated as evidence. No other model's scene was read.

## Verified primary-source mapping

All following pages were opened using browsing on 2026-10-19, and their actual supporting sections read. Links are sources, not search results.

- [Google SRE, Load Balancing in the Datacenter](https://sre.google/sre-book/load-balancing-datacenter/): unequal-cost requests, local/stale observations, fast-error attraction, limitations of active counts. Its reported performance figures are historical examples; none were promoted into expected results here.
- [gRPC, Load Balancing](https://grpc.io/blog/grpc-load-balancing/): connection routing versus individual HTTP/2 streams. The article dates to 2017; historical product recommendations and roadmap statements were excluded.
- [Envoy, Supported load balancers](https://www.envoyproxy.io/docs/envoy/latest/intro/arch_overview/upstream/load_balancing/load_balancers): round robin and equal-weight candidate sampling, plus the health-configuration caveat. This was the live 1.41.0-dev documentation, not evidence about the team's deployed version.
- [Envoy, Draining](https://www.envoyproxy.io/docs/envoy/latest/intro/arch_overview/operations/draining): explicit drain controls and protocol-specific treatment. No zero-error shutdown promise is made.
- [Envoy, Circuit breaking](https://www.envoyproxy.io/docs/envoy/latest/intro/arch_overview/upstream/circuit_breaking): separate resource limits, including pending/outstanding requests and retries. The guide does not promise strict fleet-wide limits from per-proxy configuration.

The dedicated [Envoy health-checking page](https://www.envoyproxy.io/docs/envoy/latest/intro/arch_overview/upstream/health_checking) initially returned an index entry but subsequent attempts to retrieve its body timed out/failed. It is **not counted as verified evidence**. No assertion relies on its inaccessible contents; the narrower configuration statement above is supported directly by the successfully read load-balancer page.

## Team relevance and evidence boundary

The repository-search service, one-slot workers, arrival schedule, and agent fan-out are authored examples. They are not observations about Jaco's infrastructure, claims about a named agent product, or measured production benchmarks. Exercise criteria allow a workload that does not expose imbalance; learners must examine the trace rather than manufacture a favorable result. The human owns permissions and enforced limits. Prompt text alone supplies neither.

## Video teaching boundaries

The independent Astra cut uses unequal task duration and a local queue, not a server-crash/recovery story. It teaches why equal assignments hide different occupancy and why new work can benefit from observing outstanding requests. The queued Q4 remains assigned after the policy switch. Two consecutive new calls to B make the contrast with rotation observable. “Running” is execution occupancy; an outstanding call includes waiting work. “LEAST REQUEST” denotes the toy comparison of two visible candidates, not a byte-for-byte Envoy implementation or global least-loaded guarantee. Other clients, stale data, failures, transport connections, retries, heterogeneous capacity, and real drain mechanics stay in the reading rather than crowding the film. Progress bars are illustrative, not trustworthy remaining-time estimators.

No claim of superiority over another encoded cut or recommendation for the library default is made. Comparative promotion remains a separate editorial decision. The assets and their checks are documented in `video/load-balancing/astra/review.md`.
