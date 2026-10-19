# Unequal work

Author: gpt-6-astra; reasoning: high; date: 2026-10-19.

Learning objective: Given a trace of concurrent agent tool calls, distinguish cumulative assignments from current outstanding work and explain why a new call can go to an idle worker while existing work remains queued elsewhere.

Independent structure: normal rotation → unequal duration → wasted idle slot → new-call policy change → old queue completes. This is an authored two-worker tool-service example; no baseline media or other variant scene was consulted. It complements fault-detection teaching by exposing a healthy-but-busy worker, not a failed one.

| Playback | Motion | Visible state change | Sound and pitch |
|---|---|---|---|
| 0–5.5 s | Q1 travels to A; Q2 to B. Short progress bars fill. | Workers begin and finish normally; total counts become 1 each. | Fade `ack` E5 at .3; `send` E5; port `ack` and arrival C5/A or G5/B; `deliver` at 3.25/4.9. |
| 5.5–10.5 s | L1 goes to A, then Q3 to B; L1's bar grows much more slowly. | Both totals reach 2, but only B finishes; A stays occupied. | Sends at 5.5/7.2; arrival C5 at 6.85 and G5 at 8.55; G5 `deliver` at 9.8. |
| 10.5–14.25 s | Rotation sends Q4 toward A. It stops in a waiting box. | Q4 WAIT appears and jolts at 11.85; B remains idle. | C5 `thump` at 11.85, with preceding send/port cues. |
| 14.25–22 s | Router pulses into LEAST REQUEST; Q5 and then Q6 travel to B and complete. | Two consecutive B selections visibly break rotation while Q4 stays queued on A. | `recover` E5 at 14.25; new send at 15; G5 arrivals 16.35/19.8 and completions 18/20.9. |
| 22–28 s | L1 completes; Q4 leaves its queue and executes on A. Final hold, then black. | Queue clears, both workers finish, total assignments are A: 3, B: 4. | C5 completion at 22; `send` 22.35; arrival 22.85; completion 24.5; quiet E5 `poof` at 26.4. |

Actors: caller (540,580); router (540,850); workers A (290,1390) and B (790,1390); A's local waiting box (290,1120). Input wire connects caller bottom to router top; output ports route to each worker top, via (290,1030)/(790,1030). Worker completion rings sit at y=1200, clear of the labels.

The policy compares the two visible candidates' outstanding calls. At the switch A has L1 running plus Q4 waiting, while B has none. Worker labels show executing tasks, not the balancer's full outstanding count. This is a simplified, fully observed dispatcher, not an exact Envoy implementation. No work is migrated or retried. The change is a teaching intervention, not an automatic self-tuning claim.

Task durations, one execution slot per worker, and progress bars are illustrative. The normal case establishes completion; the problem gets a 2.4 s hold after Q4 waits; the ending holds the resolved state from 24.5 to 26.4. Titles and labels are 40–98 source pixels; no prose appears onscreen. A C5/B G5 identity persists across policy changes, while the wait uses a low thump and the policy change uses a rising sweep. Exact cue timings live in `audio-cues.json`.

Evidence: [Google SRE, cost variation and least-loaded limitations](https://sre.google/sre-book/load-balancing-datacenter/), [Envoy, least-request candidate selection](https://www.envoyproxy.io/docs/envoy/latest/intro/arch_overview/upstream/load_balancing/load_balancers), read 2026-10-19. The accompanying guide carries operational limits omitted from this narrow film.
