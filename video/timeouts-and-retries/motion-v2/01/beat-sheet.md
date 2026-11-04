# Lesson 01 beat sheet: Wait for a response (motion-v2)

Mechanism: a caller asks a CI service for one build's status and waits. Network travel both ways and remote processing all count toward that wait. A response that arrives within the caller's attempt timeout fills the caller's result and can be used. In a separate example, a slower request reaches the caller's illustrative 5 s attempt timeout, and only the caller stops waiting.

Out of scope on screen: retries, backoff, overall deadlines, cancellation, late responses, idempotency, outcome reporting, and any claim about the service after the timeout. The service stays visibly "Processing" (dimmed) after the timeout. Nothing fails, turns red, or rolls back.

Time contract: 2 playback seconds = 1 illustrative second, linear and identical in both cases. Each network leg takes 0.8 illustrative s. Processing in case 1 takes 2.4 illustrative s, so the round trip is 4.0 illustrative s (playback 3.0 to 11.0). The limit is 5 illustrative s (case 2: playback 20.0 to 30.0). The title band says ILLUSTRATIVE TIMES.

## Beats (playback seconds, speed 1, 30 fps, 39.0 s)

| Time | What moves | State change | Sound |
|---|---|---|---|
| 0.0–1.8 | Case tag "In time", then Caller panel, then CI service, then lanes and "Network" fade in | Caller result shows "No status yet"; empty wait rail with 5 unit ticks and "Limit 5 s" cap | Caller reveal ack C5 (0.3); service reveal ack E5 (0.8) |
| 1.8–3.0 | Hold | Idle stage | Silence |
| 3.0 | Caller glows; chip `status #418?` leaves down the request lane (1.6 s, near-linear) | Result becomes amber "Waiting" with pulsing dots; rail starts filling linearly | Caller send C6, panned to the request lane |
| 4.6 | Chip reaches the service; ripple at the lane end | Service glows; slot shows "Processing" with a back-and-forth busy sweep (not a progress bar) | Service arrive E5 |
| 5.0, 7.0, 9.0 | Rail tick 1, 2, 3 flash as the fill passes them | Caller still waiting while the service processes | Caller clock tick C7 at each illustrative second, panned along the rail |
| 5.6–8.4 | Busy sweep continues | — | Sparse service work ticks E3 (5.6, 6.4, 7.6, 8.4) |
| 9.4 | Service sends chip `#418 passed` up the response lane (1.6 s); response lane turns teal | Sweep fades; slot returns to "Idle" at 9.7; caller remains "Waiting" for the whole return trip | Service send E6, panned to the response lane |
| 11.0 | Chip arrives; teal ripple at the caller port | Instant switch: result "✓ #418 passed" (teal) with glow; rail fill stops at 4/5 and turns teal | Caller deliver C5 |
| 12.6 | "4 s" marker rises at the fill end | Gap to the 5 s cap stays visible | Caller ack C6 |
| 12.6–16.0 | Hold | Resolved in-time state | Silence |
| 16.0–17.0 | Full stage fade to black; everything resets underneath | No carry-over: the next example is a separate request | Silence |
| 17.0–18.8 | Same reveal with case tag "Too slow" | Fresh "No status yet", empty rail | Caller ack C5 (17.3); service ack E5 (17.8) |
| 20.0 | Chip `status #419?` leaves down the request lane | "Waiting"; rail fills at the same rate as case 1 | Caller send C6 |
| 21.6 | Chip reaches the service | "Processing" with busy sweep, which continues | Service arrive E5 |
| 22.0–28.0 | Rail ticks 1–4 flash; the fill passes the 4/5 point where case 1 ended; no response chip appears | Waiting continues past the normal case | Caller clock ticks C7 at 22, 24, 26, 28; service work ticks E3 between them |
| 30.0 | Rail meets the cap | Instant switch: result "■ Timed out" (square stop mark, neutral field); cap and "Limit 5 s" turn amber and the cap glows | Caller stop cue: soft G4 then C4 (falling fifth), the strongest event |
| 30.6–31.4 | Service sweep continues | Service still processing; no claim about its outcome | Two quieter service work ticks |
| 31.8–32.6 | Service, lanes and "Network" dim to 35% while the sweep keeps moving | Attention moves to the caller's stopped wait | Silence |
| 34.0 | Cap pulses once | Bounded wait emphasised | Quiet caller ack C5 |
| 34.0–37.0 | Hold | Final timeout state | Silence |
| 37.0–38.0 | Stage fade to black | Ends on the empty opening stage (title only) | Silence |
| 38.0–39.0 | Black hold | — | Silence |

## Sound map

The caller uses the C family: C5 reveal, C6 send, C7 timer ticks, C5 deliver, C6/C5 acknowledgements, and a G4→C4 stop. The service uses the E family: E5 reveal and arrive, E6 send, E3 work ticks. Sends sit an octave above arrivals at a lower gain. The network has no voice of its own. Cues are panned to the lane or rail position, within ±0.32 so they hold up in mono. No success chime plays when the service finishes; the deliver note sounds only when the caller receives the response. The timeout is a soft tonal stop with no noise burst or alarm.

## Plan choices (plans A and B, recorded neutrally)

| Topic | Plan A proposal | Plan B proposal | Used here |
|---|---|---|---|
| Where time is shown | Wait rail inside the caller panel with a fixed cap | Trace waterfall below the stage, coloured by phase | A: the timeout visibly belongs to the caller, with no phase colours the caller could not know |
| Separating the two cases | Full stage fade; no shared identity | Dim row 1 as a ghost reference beside row 2 | A: avoids implying a second attempt or retry |
| Chip text | `CI status?` / `Passed` | `status #418?` / `#418 passed` | B: the build number ties the response to its request; case 2 asks about `#419` so it reads as a different request |
| Counting time | Linear rail, caller timer ticks | Clock tick per illustrative second | Both: rail unit ticks flash with each caller tick |
| Time scale | 2 playback s per illustrative s; 4 s success, 5 s limit | 2.5 playback s per illustrative s; 3 s success | A |
| Service activity | Busy sweep, not percentage progress | Progress bar filling | A |
| Timeout marking | "Timed out" with a square stop mark, soft falling interval | Red line, response-lane gate, shake, noise-burst cutoff | A, keeping B's idea that the cutoff is the strongest sound |
| After the timeout | Crop/zoom to the caller | Dim service and lanes | B's dim, with the sweep still moving so nothing implies the work stopped |
| Network sound | None | Filtered whoosh | A |
| Case labels | "In time" / "Too slow" | None | A |
| Ending | Hold, fade, short black tail | Fade to empty stage | Both: hold, fade, 1 s black |
