# Avoid a failed server

## Scope and grounding

One mechanism: a periodic health probe times out, changing the balancer's eligibility record; subsequent requests exclude that server. Make the interval between actual failure and recorded unavailability visible. Finish with a new request and response through B, while A remains unavailable.

Grounding: `video/load-balancing/sequence/lessons.json` item 6 and `content/concepts/load-balancing.json`. [Envoy health checking](https://www.envoyproxy.io/docs/envoy/latest/intro/arch_overview/upstream/health_checking), inspected 2026-10-21, documents configurable intervals and failure thresholds. The concrete schedule and one-timeout threshold here are illustrative configuration, not universal defaults.

Six beats, approximately 48 seconds. No recovery, retries, migration, passive outlier detection, drain procedure, all-hosts-failed behavior, or policy comparison. The eligibility gate is distinct from the selection algorithm. B remains known eligible throughout.

## Visual grammar and stage

Use a **health-status panel with a pending probe deadline**, above actual server states. The central teaching contrast is A's physical execution state versus the balancer's last observed record. A changes first; its eligibility row changes later. Do not turn the entire diagram red simultaneously.

1080 × 1920. Background #050506, text #E6E8EC, secondary #8B9099, pending amber #F5A524, response teal #3FB68B, failed observation red #E5484D. Shapes and short state labels supplement color. Title 76 px; main labels 58–64 px; metadata 52 px minimum.

| Element | Coordinates x,y,w,h | Content |
|---|---|---|
| Title | 90,140,900,160 | `Avoid a` / `failed server` |
| Application | 300,350,480,130 | `Application`; Ready/Waiting/Received |
| Balancer panel | 90,610,900,470 | heading Load balancer at y650 |
| A observed row | 130,750,820,90 | `A · Eligible`, later `A · Unavailable` |
| B observed row | 130,860,820,90 | `B · Eligible` |
| Observation label | 130,990,820,60 | `Last observed state`, 52 px |
| Actual A | 90,1340,420,220 | `Server A`; Responding → No response |
| Actual B | 570,1340,420,220 | `Server B`; Ready → Working → Ready |
| Probe status | 90,1640,900,100 | `Probe pending` → `Timed out` |
| Footer | 90,1770,900,70 | `New requests skip A`, final |

Probe deadline strip: x150–930, y1190, height12. Left label `Probe sent`, right label `Timeout`, at y1120, 52 px. A thin time cursor advances left→right only during the probe wait. This is configured wait elapsed, not CPU progress or a guarantee that the server is dead.

Probe route: (260,1080)→(260,1320), using an outlined diamond marked P in stationary legend `P · health probe` at x90,y1240. Application request route: (540,490)→(540,590), then (780,1080)→(780,1320). Solid round request marker R1 differentiates application traffic. Return B→balancer retraces x780 upward, then balancer→application x540 upward; no direct B→application shortcut.

No probe reply is drawn for A. A's failed state uses a static slash over its small activity indicator, not an explosion or server disappearance. Keep A's panel present after exclusion. Exclusion changes only its routing row and removes the selectable row outline, not the server's existence.

## Beat sheet

Sound identities: application C4, health checker G4, A E4, B A4. Probe sounds are quieter and shorter than application traffic. Silence during the missing reply is intentional; timeout supplies the failure event. No clock loop or music.

| Beat / playback | Motion and state | Sound / hold |
|---|---|---|
| 1 · 0–8 s · Failure precedes detection | Establish both eligibility rows and actual servers responding. At 2.5 A stops activity and becomes No response. A's balancer row stays Eligible, explicitly under Last observed state. B stays Ready. | Brief A `thump` E4 at 2.5 marks demonstration ground truth, not a balancer alert. Hold 3–8. The mismatch is essential. |
| 2 · 8–15 s · Next periodic probe | At 8.5 checker launches P; travel to A 9–10.5. Reveal deadline strip and Probe pending. Cursor starts at launch and advances gradually. A stays No response; no return marker appears. | Checker `send` G4 at 9. No A arrival acknowledgment or response sound. Hold pending view 11–15 while cursor advances slowly. |
| 3 · 15–23 s · Wait reaches timeout | Continue cursor to the right cap at 18.5. Only at that point change Probe pending→Timed out. Reveal small configuration label `Failure threshold: 1` in the status region on a second line. Keep A row unchanged briefly until the next beat so observation and policy update are distinct. | Checker low `thump` G4 at 18.5. Hold 19–23. No numeric seconds are claimed; video timing is illustrative. |
| 4 · 23–30 s · Update eligibility | At 23.5 A row changes Eligible→Unavailable; add slash marker and mute its selection border. B row is outlined as the sole eligible destination. Fade the completed deadline strip after 25, retaining Timed out status. | Checker `ack` G4 at 23.5. Hold 25–30 on the new eligibility state. Actual A remains failed; this action does not repair it. |
| 5 · 30–39 s · New request uses B | R1 appears at Application at 30.5; app becomes Waiting. Send app→balancer 31–32. At 32.5 outline B row, then forward R1 33–34.5 to B. B becomes Working; A receives no application marker. | Application `send` C4 at 31; checker/selector `ack` G4 at 32.5; B `work` A4 at 34.5. Hold 35–39. No old request is moved or replayed. |
| 6 · 39–48 s · Response returns through balancer | B finishes at 39.5. Response marker travels B→balancer 40–41.5, pauses visibly there until 42, then balancer→application 42–43.5. Application becomes Received only at 43.5. B returns Ready; A remains Unavailable in the balancer and No response below. Show New requests skip A at 44. | B `send` A4 at 40; balancer `arrive` G4 at 41.5 and `send` G4 at 42; application `arrive` C4 at 43.5. Hold 44–48 silently. |

Probe status and eligibility text must remain distinguishable. A failed probe is evidence used by the configured rule, not omniscient knowledge of the underlying cause. The request arrives only after exclusion, so the final successful route does not imply requests during the detection gap were protected.

## Accuracy limits

- The example configures a threshold of one failed probe and one timeout observation. Real detection depends on interval, timeout, thresholds, scheduling, and failure mode. Do not label these timings as defaults or an SLA.
- A No response is demonstrated ground truth. The balancer observes only no successful probe response by its deadline; it cannot distinguish every server/network problem from this evidence alone.
- A stays Eligible during the initial gap. New traffic could still be sent there before detection; no animation should suggest instant failover. No rescue or retry of requests already sent is shown or promised.
- B is assumed eligible from existing observations; its health-check exchange is omitted. Successful probing does not guarantee all future application work succeeds.
- This is a proxy topology with response return through the balancer. Other topologies exist. Probe traffic and R1 traffic have different markers and purposes.
- No all-unhealthy or fail-open policy is modeled. One healthy candidate remains, and this example's configuration excludes A from new choices.

## Native350 acceptance and later review

- Inspect individual actual encoded frames at native 350 px width (~622 px high) and full resolution. 52 px metadata renders at ~16.9 px. Break Unavailable and threshold labels into short lines if required; preserve type size and keep text clear of paths.
- Inspect holds at 5, 13, 20, 27, 37, and 46 s, plus before/mid/after actual failure, probe launch, timeout, eligibility change, forwarding, and both response legs. Contact sheets alone are insufficient.
- At 5 s identify A No response but still recorded Eligible. At 13 s see a pending probe, no reply. At 20 s timeout must be explicit. At 27 s see A excluded/B eligible. At 46 s see application receipt with A still excluded.
- A eligibility must never change on initial failure or probe departure. No fake reply, reverse-moving probe, or work sound from A. The deadline cursor must not look like a healthy reply.
- R1 goes to B once; no copy routes to A, no A→B migration, and no application Received state before the second return leg completes. Keep timeout evidence separate from R1's success.
- Silent playback must teach delayed observation and subsequent exclusion. Motion variety comes from stale-versus-current state, deadline progression, eligibility update, and routed round trip.
- Reproduce suspected visual faults with alternate extraction before flagging. Later decode the full MP4, inspect audio peaks/streaming metadata, and listen before claiming audio was heard. Bind review to the actual full SHA-256 and renew after any re-encode.

Plan only. Future implementation uses repository-pinned Puppeteer and cut-local engine copies. No rendering, public/site/shared-skill edits, Git operations, or other lesson work is included.
