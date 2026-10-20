# Load balancing: focused video sequence

Six lessons, 214 seconds total, authored 20 October 2026 in response to Jaco's feedback that both the 3D metaphors and the short all-in-one videos assume too much prior knowledge. These videos retain the existing diagram vocabulary, add plain explanations, and show software actors directly. They are finite lessons, not loops; final frames intentionally hold the outcome.

The approved side-index rollout makes this the default load-balancing chapter. Its six clips live in `public/lessons/load-balancing/`. Existing comparison cuts remain available. Media integrity and teaching review remain separate checks.

## Reproduce

From the repository root, with Node 22.12+, Python 3, FFmpeg, Chrome, and `npm ci --ignore-scripts`:

```sh
sh video/load-balancing/sequence/render.sh
python3 scripts/build.py
python3 scripts/check.py
python3 -m http.server 4174 --directory dist
# In another terminal:
node scripts/check_sequence.mjs
```

Open http://localhost:4174/concepts/load-balancing/. `generate.py` is the authored source; it regenerates the six standalone scene scripts and `lessons.json`. The local engine is copied from the existing Astra load-balancing cut; only the renderer scratch location changed. No installed skill is a build dependency. Preserve the repository's pinned puppeteer dependency.

## Teaching order and sound map

`lessons.json` records each lesson's objective, timed beats, takeaway, and comprehension question. Every send uses a quiet `send` cue; arrival starts `arrive`; completion adds `deliver`. A/B use C5/G5 for state changes. Waiting uses `thump`; the health timeout uses `miss`. Caption-only reading holds intentionally have no sound. Sound is optional; there is no voiceover. On-screen explanations take precedence over the production skill's original motion-only convention because the user explicitly asked for more explanation.

1. One request (32s): ask at 5s, process at 8s, respond at 19s, summarize at 25s.
2. Share the work (34s): two servers, first request 6s, second 12s, overlap 14–24s, conclude.
3. Take turns (36s): balancer introduced, A at 5s, B at 13s, A at 21s; summarize rotation.
4. Unequal work (38s): slow A at 4s, fast B at 10s, B ready at 17s, request waits on A from 25.5–31s, starts at 32s.
5. Look at active work (36s): one active on A and none on B; compare at 8s, route new request at 14s; B completes at 23s while A continues.
6. Avoid a failed server (38s): A unresponsive, check at 6s, timeout at 13s, excluded at 18s, new request to B at 23s, response at 30s.

## Source verification and limits

Primary documentation retrieved 20 October 2026:

- [NGINX load balancing](https://nginx.org/en/docs/http/load_balancing.html): distribution across application servers and the round-robin rule. Do not equate NGINX least-connections with least-requests.
- [Envoy load-balancing policies](https://www.envoyproxy.io/docs/envoy/latest/intro/arch_overview/upstream/load_balancing/load_balancers): equal-weight round robin and least-active-request selection, including candidate sampling and weighting in real implementations.
- [Envoy health checking](https://www.envoyproxy.io/docs/envoy/latest/intro/arch_overview/upstream/health_checking): configurable probes and thresholds determine eligibility.

These are illustrative schedules, not measured timings. The one-work-slot assumption is explicit; real servers are concurrent. The least-request example compares the two illustrated candidates rather than claiming every implementation scans every host. A health check can fail after a server does; detection is not instantaneous and does not rescue in-flight requests. Reliability also depends on the balancer and other shared dependencies, outside this introductory sequence.
