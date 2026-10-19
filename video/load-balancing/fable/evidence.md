# Evidence for the fable cut of load-balancing

Retrieved 19 October 2026 (NZDT). Paraphrased; follow the links for the exact wording. The library's own judgement is marked as such.

## Sources

1. **Google SRE Book, "Load Balancing in the Datacenter"** — https://sre.google/sre-book/load-balancing-datacenter/
   - *Simple round robin* distributes requests evenly across backends regardless of what each request costs. The chapter notes that this is wasteful when request costs vary and when backends differ in capacity.
   - *Least-loaded round robin*: each client keeps a count of its active requests per backend and sends the next request to the backend with the fewest active requests, breaking ties with round robin. When a request completes, that backend's count drops and it rejoins the least-loaded set. This is the mechanism the cut animates as "least in-flight".
   - The chapter's own caveat: the active-request count is only a proxy for load, because requests differ greatly in CPU cost and some spend most of their time waiting on other services. Google goes on to describe *weighted round robin*, which uses backend-reported utilisation, as the more informed policy. The cut demonstrates an improvement in this particular schedule; equal counts do not guarantee equal work, and least in-flight does not universally beat rotation.
   - Used for: the video's mechanism, the "ties fall back to rotation" detail, and limitation 2 in variant.json.

2. **Envoy proxy documentation, "Supported load balancers"** — https://www.envoyproxy.io/docs/envoy/latest/intro/arch_overview/upstream/load_balancing/load_balancers
   - *Least request* picks two healthy hosts at random by default and routes to the one with fewer active requests (power of two choices; configurable candidate count). With unequal weights each host's weight is scaled by `1 / (active_requests + 1)^active_request_bias`; a bias of 0 reduces the policy to plain round robin.
   - Used for: confirming that a production proxy a team is likely to meet implements the same in-flight signal, and that the two policies can be configured at the same routing layer; the weighted least-request bias formula is not a universal equivalence between the algorithms (which is why the cut changes the policy label in place on the same balancer).

3. **Kubernetes Gateway API Inference Extension, implementer's guide** — https://gateway-api-inference-extension.sigs.k8s.io/guides/implementers/
   - The implementer guide supports the Endpoint Picker integration and request protocol. For the specific queue, KV-cache and adapter claims, the directly relevant source is the [InferencePool API documentation](https://gateway-api-inference-extension.sigs.k8s.io/api-types/inferencepool/) (retrieved 2026-10-19). Prefix-cache scoring is shown in the [Istio integration example](https://istio.io/latest/docs/tasks/traffic-management/ingress/gateway-api-inference-extension/) (retrieved 2026-10-19); these are implementation capabilities, not claims that every inference gateway uses every signal.
   - Used for: the relevance claim that model and agent traffic has large per-request cost variance and that inference gateways already route on load signals. The cut stays at the simpler "count in-flight requests" level; queue depth and cache scorers are not depicted.

4. **This library's concept note** — `content/original/load-balancing.json`: "Equal request counts do not imply equal work when request costs differ." The cut is built around that sentence; the baseline cut covers the other half of the note (health checks removing a failed instance).

## Library judgement (not sourced)

- Token counts on the chips (`2k tokens`, `60k tokens`) stand in for request cost because they are the cost unit an agent team sees first. Runtime is not proportional to token count in general (prefill versus decode, caching, batching), so the sizes and the 6 s / 0.6 s service times are illustrative.
- Showing the misrouted small request as *waiting* behind the heavy one (an empty orange slot with WAIT that begins filling at 15.25 s) is a simplification of contention on a saturated replica. Real replicas may interleave work; the delay is the point, the exact mechanism is not.

Comparative source audit, 2026-10-19: attribution and universal-improvement wording corrected by gpt-6-astra comparative review. Original evidence text is archived under `reviews/comparisons/load-balancing/original-sources/fable/`. The local count excludes transport and response travel; it is an educational backend-occupancy signal, not a faithful client-side outstanding-request counter.
