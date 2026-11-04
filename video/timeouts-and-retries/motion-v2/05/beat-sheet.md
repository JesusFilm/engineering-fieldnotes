# Lesson 05 — Bound the whole operation (motion-v2 cut 05)

**Mechanism.** A per-try timeout limits one wait. A shared operation deadline (`deadline = start + 12s`, measured on a monotonic clock) limits everything: both tries and the backoff sleep. The per-try timer re-arms for the retry; the shared budget never resets. When nothing is left, the gate refuses another try, and the caller reports an unknown result with the history of two timed-out tries.

**Illustrative policy.** 12 s deadline, 5 s per-try limit, 2 s backoff, at most two tries are shown. Exact arithmetic assumes **zero overhead** (stated in the persistent subtitle); the retry chip adds "at most 5s, less any overhead". These are example values, not defaults.

**Two clocks, one source.** Playback time explains; policy time is the simulated monotonic clock. A single piecewise-linear function `policyAt(t)` in `scene.js` drives the timeline fill, cursor, `Ns left` readout, per-try ring and row fills. While policy time runs, 1 policy second = 1.6 playback seconds and the tag reads **animation slowed**; during explanations policy time is held and the tag reads **animation paused**, so the policy clock never appears to stop silently. Gate decisions, sends and arrivals are drawn only during pauses, consistent with zero overhead. Remaining time is shown rounded up and per-try elapsed rounded down, so the two always sum to 12 during try 1.

| Playback | Policy | What moves | State change | Sound |
|---|---|---|---|---|
| 0.3–1.0 | — | caller, deadline gate, CI status fade in | stage set | `store` C5 soft |
| 1.4 | 0 | timeline 0–12s, deadline line, `12s left`; chip `deadline = start + 12s` / `measured on a monotonic clock` | shared budget armed | `ack` D6 (budget) |
| 2.9 | 0 | per-try ring `0s`, `per try · limit 5s` | separate per-try limit shown | `ack` E6 (caller) |
| 4.3–5.6 | 0 (paused) | tag appears; dot caller→gate; gate glows green `12s left → go`; try 1 window (dashed, 0–5) appears; dot gate→service, service glows, `?` appears | gate admits try 1 | `send` E6, `ack` G5 (gate), `arrive` C5 (service) |
| 6.0–14.0 | 0→5 | tag `animation slowed`; timeline fills orange, ring fills, try-1 row fills; readout 12→8 | budget drains with the try | `clock` ticks at 7.6, 9.2, 10.8, 12.4 |
| 14.0 | 5 | ring and try-1 row turn red `try 1 timed out`; × at caller; readout `7s left` pulses; tick `5` | try 1 timed out, 7 s left | `timeout` E5→E4 (caller) |
| 14.7–16.1 | 5 (paused) | chip `12s − 5s = 7s left` | arithmetic held | `ack` D6 |
| 16.2 | 5 | sleep row `sleep 2s` (blue window 5–7), ring dims, tick `7` | backoff begins | `sleeptick` A3 |
| 16.6–19.8 | 5→7 | blue sleep segment fills on the same timeline; readout 7→6→5 | sleep consumes the budget | `sleeptick` A3 at 18.2, E4 at 19.8 (wake) |
| 20.3 | 7 (paused) | chip `7s − 2s = 5s left` | 5 s left | `ack` D6 |
| 21.4–22.7 | 7 (paused) | dot caller→gate; gate green `5s left → go`; chip `try 2 limit = min(5s, 5s left)` + `at most 5s, less any overhead` | gate recomputes; retry capped by remaining time | `send` E6, `ack` G5, `ack` D5 |
| 23.6 | 7 (paused) | ring snaps back to `0s` (orange, scale pop); try-2 window 7–12 appears, ending exactly on the deadline line | per-try timer re-arms | `rearm` E5→B5 rising |
| 24.35 | 7 (paused) | header becomes `whole operation · no reset`; `5s left` pulses and stays | shared budget unchanged | `ack` D6 |
| 25.0–25.45 | 7 (paused) | dot gate→service; service glows | try 2 sent | `arrive` C5 |
| 26.0–34.0 | 7→12 | tag slowed; orange fills to the deadline; ring 0→4; readout 5→1 | the remaining budget runs out | `clock` at 27.6, 29.2, 30.8, 32.4 |
| 34.0 | 12 | readout `0s left`, timeline outline, deadline line/label turn red; try-2 row red `try 2 timed out`; ripple where try 2 meets the deadline; × at caller; bar jolt | try 2 ends at the deadline | `deadline` composite (loudest) + `timeout` |
| 34.0–35.8 | 12 (paused) | hold | — | silence |
| 35.8–36.3 | 12 | grey dot leaves caller, stops before the gate; gate turns red with ×, `0s left → stop`; row `try 3 refused` × on the deadline line; nothing reaches the service | gate refuses a third try | `send` (quiet), `thump` G3 (gate) |
| 38.0 | 12 | badge `result: unknown` pops; `2 tries, both timed out` / `remote work may continue`; tag fades | terminal result is unknown | `unresolved` C5 + F#5 |
| 38.0–42.4 | — | final evidence hold | — | silence |
| 42.4–43.2 | — | stage fades below the title; ends at 43.4 | finite ending | — |

**Sound map.** Caller E (send E6, timeout E5→E4, re-arm E5→B5), gate G (allow `ack` G5, refuse `thump` G3), service C (`arrive` C5 only on receipt), budget D (`ack` D6/D5 for budget arithmetic), policy seconds `clock` while trying, a lower soft `sleeptick` while sleeping. The deadline composite is the loudest event; the result is an unresolved interval with no success chime. No sound claims service progress or completion.

## A/B plan choices (neutral record)

Both plans share the same policy arithmetic (12 s, 5 s, 2 s, zero overhead) and the unknown two-try ending; this cut keeps it.

| Choice | Taken from | Used here |
|---|---|---|
| Horizontal request lane (caller → deadline gate → service) | Plan B | Yes; gate is the visible admission point for every try |
| Per-try ring that re-arms while the shared readout holds, with a rising re-arm cue | Plan B | Yes; the central no-reset contrast |
| `min(5s, … left)` gate chip | Plans A and B | Yes, as `try 2 limit = min(5s, 5s left)` |
| Explicit `animation paused` / `animation slowed` indication | Plan A | Yes, as an icon tag; policy values never change while it reads paused |
| Neutral service with `?`; no service crash, completion or cancellation | Plan A | Yes; plan B's continuing service work ticks were not used, so the video makes no claim either way about remote work |
| Attempt rows aligned to the shared timeline (Gantt) | Plan A's attempt rows, plan B's segmented budget bar | Combined: rows sit under the 0–12 s timeline so the sleep visibly occupies 5–7 and try 2 ends on the deadline line |
| Third try shown as a refused request stopping at the gate | Plan B (ghost request), Plan A (closed conditional, no request path) | A short grey dot that stops before the gate; nothing reaches the service |
| Final `result: unknown` with two timed-out tries and `remote work may continue` | Plans A and B | Yes |
| Arithmetic chips `12s − 5s = 7s left`, `7s − 2s = 5s left` | Plan A (`7 − 2 = 5s`) | Yes, both steps |
| Policy rate | Plan A 1.6 s/s, Plan B 1.2 s/s | 1.6 s/s, giving ticks 1.6 s apart and a 43.4 s cut |
| Final fade | Plan B | Yes, after a 4.4 s evidence hold |

