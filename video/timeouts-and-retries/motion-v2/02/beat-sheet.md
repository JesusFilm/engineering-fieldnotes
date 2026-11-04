# Lesson 02 — A timeout is not a rollback: beat sheet

Mechanism: one attempt timeout ends the caller's wait for a CI status read. In this one illustrated run the remote lookup keeps working and finishes; the caller received no response, so its record of CI #42 stays `unknown`. Cancellation and rollback appear only as unconnected code sockets labelled `separate code`.

Stage: 1080×1920 two-lane sequence diagram, time running downward. Caller (`release agent`, terminal icon) at x=290, CI service (rack) at x=750. Authored at speed 1, rendered at `meta.speed` 0.9; times below are playback seconds (38.33 s total, 1150 frames at 30 fps). Caller sounds use the E family panned left; CI sounds use the C family panned right.

| Playback time (frame) | What moves | State change | Sound |
|---|---|---|---|
| 0.22–2.1 (7–63) | Caller, CI, lifelines, time arrow, dashed `attempt timeout` line and empty `CI #42 status` field fade in | Idle stage; the timeout limit is visible before the wait starts | Quiet `send` E6 left (0.33), C6 right (0.89) |
| 2.89 (87) | `GET status #42` chip travels from caller lifeline to CI lifeline, sloping slightly down | Field becomes amber `waiting`; caller activation bar starts growing | Caller `send` E6 left |
| 3.78 (113) | Arrival ripple at CI lifeline | CI slot 0 busy; CI activation bar starts growing | CI `arrive` C5 right |
| 3.8–12.2 | Both bars grow downward at the same rate | Caller waiting (amber); CI working (white) | Caller `clock` E6 ticks 4.44–11.11, one per authored second; CI `work` C3 ticks every 0.56 s |
| 7.11 (213) | — | CI slot 0 done, slot 1 busy | `arrive` G4 right, quiet |
| 11.11 (333) | Timeout line brightens | Wait nears its limit | Last caller clock tick |
| 12.22 (367) | Caller bar meets the line, glows, caps, turns grey; solid sweep runs across the caller lane only (x 130–470) | Caller wait ended; CI bar unchanged and still growing | Custom `latch` (click plus E4→D#4 drop), loudest cue; caller clock ticks stop |
| 12.72 (382) | Label pops | `attempt timeout` → `stopped waiting` | — (part of the timeout beat) |
| 12.7–14.6 | Hold: only the CI bar moves | Contrast between stopped wait and continuing work | CI work ticks continue |
| 14.67 (440) | Value pops in the field | `waiting` → `unknown` (amber) | Custom `unresolved` E5→F#5 left |
| 17.33 (520) | CI bar flashes; `this run:` / `still working` fades in beside it below the timeout level | This run continues; not every run | `arrive` C5 right, quiet |
| 19.11 (573) | — | CI slot 1 done, slot 2 busy | `arrive` G4 right, quiet |
| 22.78 (683) | CI bar turns teal, cap and check ripple at its tip | Lookup finished remotely; no packet travels to the caller | `store` C5 right; work ticks have ended (last 22.5) |
| 23.33 (700) | `lookup done` (teal) appears; `still working` dims | Remote completion visible to the viewer only | — |
| 23.3–26.2 | Hold | Teal remote completion beside the unchanged amber `unknown` | Silence |
| 26.22 (787) | Field outline pulses | Caller record unchanged | Quiet `send` E5 left |
| 28.89 (867) | `cancel()` dashed socket, `separate code` | Cancellation needs its own implementation | Soft `hollow` G3 left |
| 30.22 (907) | `rollback()` dashed socket, `separate code` | Rollback needs its own implementation | Soft `hollow` D4 right |
| 30.6–38.33 (918–1149) | Final hold | Complete diagram | Silence |

Things the cut never shows: a packet or signal from the caller to CI after the request, a response reaching the caller, a CI bar that shrinks or turns red, a failed or passed build result, a retry, backoff or deadline, or a mandatory loop.

## Plan A / plan B choices

The two anonymous plans were read as alternatives; this records which idea each element follows.

| Element | Plan A | Plan B | This cut |
|---|---|---|---|
| Layout | Terminal receipt above a CI inspector | Two-lane sequence diagram, time downward | B's sequence diagram |
| Caller's knowledge | Receipt rows `Wait: expired`, `CI #42: unknown` | `outcome: unknown` badge | A's status field (`CI #42 status`: `waiting` → `unknown`), with B's `stopped waiting` line label |
| Wait indicator | Horizontal attempt meter | Vertical activation bar and timeout bracket | B's activation bar against a dashed timeout line visible from the start |
| Timeout line reach | — | Caller lane only, ends before centre | B |
| Continuation qualifier | `One possible outcome` | `this run: still running` | `this run:` / `still working` |
| Remote completion | `Lookup done` inside CI, no return packet | Late `passed` chip stopped at a closed attempt marker | A: `lookup done`, no return packet |
| Rejected guess | None | Red `build: failed` chip, then rejected | None (no build result is depicted) |
| Cancel/rollback | Stop-hand and reverse-arrow outlines | Dashed `cancel()` / `rollback()` sockets, `separate code` | B's sockets, without the stub toward CI |
| Caller / CI pitch | C / E | E / C | E / C, panned left / right |
| Timeout sound | Two dry sine taps | Short click plus falling E4→D#4 latch | B's latch, kept loudest |
| Unknown sound | Soft tick | Unresolved E5→F#5 | B |
| Socket sounds | Neutral G4 cue | Hollow woodblock taps | B, softened |
| Pacing | 44 s, four-second final hold | About 40 s at speed 0.9 | 38.3 s at speed 0.9, about 7.7 s final hold |

