# 04 — Back off before retrying: beat sheet (motion-v2 cut 04)

Mechanism: three retry-eligible status reads hit one shared failure. Retrying immediately would put a second burst on the service. Backoff makes each caller wait first. Jitter gives each caller a different random wait, so in this run the retries reach the service at different times. Each caller makes exactly two real attempts and then stops at the limit. The service stays unavailable throughout: spreading arrivals is shown as a change in load timing, never as recovery.

Stage: 1080×1920, 30 fps, speed 1, 35.6 s finite film ending in a fade. The top half is a request topology (callers A/B/C → CI service). The bottom half is a swimlane trace of arrivals at the service (rows A/B/C, time to the right). In the trace, the same column means the same moment, and a wait is an amber interval whose length is the delay.

Identity: A cyan / C notes, B violet / E notes, C blue / G notes. Red is reserved for outcomes; amber is reserved for waits.

## Event ledger (real requests only)

| Request | Dispatch (s) | Service arrival (s) | Response |
|---|---|---|---|
| A1, B1, C1 | 1.4 | 2.0 | 503 back at 3.5 |
| A2 | 17.4 | 18.0 | 503 back at 18.8 |
| B2 | 19.6 | 20.2 | 503 back at 21.0 |
| C2 | 21.4 | 22.0 | 503 back at 22.8 |

That gives six dispatches, six receipts, six unavailable responses. Attempt cells fill only on dispatch. The hypothetical marks (5.9–8.9 s) and the equal-wait plan (9.6–12.7 s) have no packets, no counter changes and no ledger entries.

## Beats

| Time (s) | What moves | State change | Sound |
|---|---|---|---|
| 0–1.4 | Stage fades in (0.45 s) | A/B/C at 0/2, service OK, empty trace; chips "Read · retry eligible", "Max 2 attempts" | — |
| 1.4–2.0 | Three envelopes leave together | First cells fill, 1/2 | send C6+E6+G6 together |
| 2.0 | Envelopes land together | Three solid marks in one trace column | arrive C5+E5+G5 together, reduced gain |
| 2.5 | Service jolts (10 px), large red ring | Service "Unavailable" | fail (D3 thump + noise), loudest event |
| 2.9–3.5 | Three red "503" chips return | Panels flash red, then stay muted red | reject C5/E5/G5 (descending), reduced gain |
| 3.5–5.5 | Hold | Shared failure visible | — |
| 5.5–8.4 | Heading "Hypothetical: retry at once"; dashed hollow A/B/C marks in a dashed column tagged "Second burst" just after the first column | No packet, counters stay 1/2 | soft muffled C5/E5/G5 chord (quieter than real arrivals) |
| 8.4–9.0 | Hypothetical dismissed | Trace back to the first column only | quiet poof |
| 9.2–11.9 | "Backoff: wait, then retry"; three equal 1.5 s amber intervals grow; dashed column "Still aligned" at their ends | Equal waits would still release together | wait (C4), then a quiet C4/E4/G4 chord |
| 12.2–14.3 | "Jitter: random wait per caller"; intervals resize one by one to 1.0 / 2.1 / 3.0 s | Uneven gaps (1.1 s, 0.9 s) | ack C5, E5, G5 as each value settles |
| 14.3 | Caption "Example draws · can match" | Values are illustrative; random draws are not unique | soft click |
| 15.4–22.0 | White "now" line sweeps; intervals fill (1 illustrative s = 2 playback s) | Each caller waits only its own delay | wait (C4); quiet clock ticks in the gaps |
| 17.4 / 19.6 / 21.4 | A, then B, then C retry leaves when its interval is full | Second cell fills, 2/2; interval turns grey | send C6 / E6 / G6 |
| 18.0 / 20.2 / 22.0 | Retry lands; solid mark drops at the cursor; small service jolt | Marks at three separate columns | arrive C5 / E5 / G5, then a quieter D3 thump |
| 18.8 / 21.0 / 22.8 | 503 returns to that caller only | Panel flashes red | reject at caller pitch |
| 22.8–24.4 | Hold | Trace shows one column of first attempts, three columns of retries | — |
| 24.4–28.0 | "Arrivals spread out"; first column pulses together, then retry marks pulse one by one at their relative spacing | Same column vs separate columns | C5+E5+G5 chord, then C5 … E5 … G5 |
| 28.6–30.2 | "Service still unavailable" in red; service pulses | No recovery | soft low D3 |
| 30.6–32.1 | "Limit reached: stop"; "Max 2 attempts" chip brightens; panels A, B, C dim to "2/2 stop" in turn | Finite limit ends each operation | ack C6, then cap C4 / E4 / G4 |
| 32.1–34.6 | Hold on final state | Two attempts each, all stopped, service unavailable | — |
| 34.6–35.6 | Fade stage to black (title remains) | Finite ending | — |

## Plan A/B choices

Two anonymous plans were available. This cut takes the following from each.

| Topic | Plan A | Plan B | This cut |
|---|---|---|---|
| Outcome of retries | All six unavailable | One retry succeeds | A: all fail, so spreading cannot be read as recovery |
| Hypothetical burst | Static hollow marks, no service animation | Animated ghost packets plus a service jolt | A: static dashed marks on the trace with no packets, plus a "Hypothetical" heading and a "Second burst" tag |
| Equal waits before jitter | Shown, still aligned | Not shown | A: shown as "Still aligned" |
| Jitter values | 1 / 2 / 3 s, even gaps | 0.8 / 1.9 / 2.8 s, uneven gaps | B's uneven spacing: 1.0 / 2.1 / 3.0 s |
| Uniqueness caveat | "May coincide" | Noted in plan text | Caption "Example draws · can match" |
| Arrival comparison | Arrival trace | Pile vs spread strips; chord vs arpeggio replay | Combined: one swimlane trace; the first column vs separate retry columns; chord then arpeggio replay |
| Layout | Topology morphing into scheduler rows | Horizontal lanes plus strips | Fixed topology above plus trace below (no morph, so no request is in flight during a layout change) |
| Attempt display | Filled attempt cells | n/2 counters | Both: cells fill on dispatch, with an n/2 caption |
| Limit ending | "2/2 · Stop", controls disable | "stop" chips on failed lanes | All three panels dim to "2/2 stop" with per-caller closure notes |
| Sound identity | C/E/G per caller, D3 service | Same, crash for failure | C/E/G per caller; scene-defined D3 "fail" (no crash blast) |

Not used: plan B's draw flicker and its success chime. Neither plan's lesson 05 material (deadlines or budgets) is used either. "Exponential" never appears, because one retry per caller cannot show growth.
