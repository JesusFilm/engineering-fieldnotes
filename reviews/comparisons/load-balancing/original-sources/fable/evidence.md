# Evidence for the fable cut of load-balancing

Retrieved 19 October 2026 (NZDT). Paraphrased; follow the links for the exact wording. The library's own judgement is marked as such.

## Sources

1. **Google SRE Book, "Load Balancing in the Datacenter"** — https://sre.google/sre-book/load-balancing-datacenter/
   - *Simple round robin* distributes requests evenly across backends regardless of what each request costs. The chapter notes that this is wasteful when request costs vary and when backends differ in capacity.
   - *Least-loaded round robin*: each client keeps a count of its active requests per backend and sends the next request to the backend with the fewest active requests, breaking ties with round robin. When a request completes, that backend's count drops and it rejoins the least-loaded set. This is the mechanism the cut animates as "least in-flight".
   - The chapter's own caveat: the active-request count is only a proxy for load, because requests differ greatly in CPU cost and some spend most of their time waiting on other services. Google goes on to describe *weighted round robin*, which uses backend-reported utilisation, as the more informed policy. The cut therefore claims only that an in-flight count beats a blind rotation when costs differ; it does not claim the counter measures work.
   - Used for: the video's mechanism, the "ties fall back to rotation" detail, and limitation 2 in variant.json.

2. **Envoy proxy documentation, "Supported load balancers"** — https://www.envoyproxy.io/docs/envoy/latest/intro/arch_overview/upstream/load_balancing/load_balancers
   - *Least request* picks two healthy hosts at random by default and routes to the one with fewer active requests (power of two choices; `choice_count` and a full-scan option are configurable). With unequal weights each host's weight is scaled by `1 / (active_requests + 1)^active_request_bias`; a bias of 0 reduces the policy to plain round robin.
   - Used for: confirming that a production proxy a team is likely to meet implements the same in-flight signal, and that round robin and least request are the same family with the load signal switched off or on (which is why the cut changes the policy label in place on the same balancer).

3. **Kubernetes Gateway API Inference Extension, implementer's guide** — https://gateway-api-inference-extension.sigs.k8s.io/guides/implementers/
   - The Endpoint Picker chooses a model-server endpoint in an InferencePool from runtime signals such as queue depth, KV-cache utilisation, prefix-cache affinity and adapter availability rather than ordinary round robin.
   - Used for: the relevance claim that model and agent traffic has large per-request cost variance and that inference gateways already route on load signals. The cut stays at the simpler "count in-flight requests" level; queue depth and cache scorers are not depicted.

4. **This library's concept note** — `content/original/load-balancing.json`: "Equal request counts do not imply equal work when request costs differ." The cut is built around that sentence; the baseline cut covers the other half of the note (health checks removing a failed instance).

## Library judgement (not sourced)

- Token counts on the chips (`2k tokens`, `60k tokens`) stand in for request cost because they are the cost unit an agent team sees first. Runtime is not proportional to token count in general (prefill versus decode, caching, batching), so the sizes and the 6 s / 0.6 s service times are illustrative.
- Showing the misrouted small request as *waiting* behind the heavy one (an orange stub that only fills after the heavy bar completes) is a simplification of contention on a saturated replica. Real replicas may interleave work; the delay is the point, the exact mechanism is not.
