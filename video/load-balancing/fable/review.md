# Load balancing (fable cut) review

## Render 4 (published), 19 October 2026

Published file `public/media/load-balancing/fable.mp4`, sha256 `7894be7a…bd4d80`, 31.77 s, 953 frames, 1.76 MB, poster at 14.0 s. Reviewed again from encoded frames at full size and 350 px for every beat and both boundaries, the encoded contact sheet, the spectrogram, and `verify.mjs` (`checks.json`: format, full decode, 0 differing boundary bytes, faststart, −1.0 dBFS peak, 106 of 106 cues confirmed). Audio analysed, not heard.

Applied from the render 3 list, with the user's standing authorisation for improvements:

- **1 Equal counts made explicit** — at 11.4 s all three counters pop together with a C6–E6–G6 chord while they read 1, 1, 0.
- **3 Audible contrast at the pick** — rotation picks now carry a dull E4 tick; counter-driven picks keep the C7 blip.
- **4 Thinner work ticks** — every 0.5 s, offset per replica, so overlapping heavy jobs interleave instead of doubling up.
- **5 Shorter tail** — beat 3 heavy requests start 0.3 s and 0.5 s earlier; the cut is 0.5 s shorter and the last fast response lands 1.2 s before the heavy jobs complete.
- **6 Counter dots routed around the racks** — dots climb beside each rack (checked at 18.85 s and 19.0 s) before joining the wire to the port.

Still open (medium, left for editorial choice): **2** draw the waiting request as a parked chip rather than a slot stub; **7** flash tied counters before a rotation fallback. Defect pass on render 4: clean (no new overlaps, no stale state, every cue confirmed).

## Render 3, 19 October 2026

Reviewed from the encoded file `public/media/load-balancing/fable.mp4` (sha256 `195f2bce…779775`, 32.27 s, 968 frames, 1.74 MB): review frames at full size and at 350 px width for every beat and both loop boundaries, the contact sheet, a log-frequency spectrogram, `volumedetect`, and `verify.mjs` (results in `checks.json`). Audio was analysed, not heard.

## Fixed before handover

- **Stale badge during the misroute** (render 1, 13.2–13.9 s): the green `180 ms` badge from Replica 3's response was still on screen while the next request was being misrouted to busy Replica 1, so a green "fast" cue competed with the orange problem cue. The badge now hides 1.2 s after it appears, and the misrouted request leaves 0.6 s later (12.2 s), which also lets the diverged counters (1, 1, 0) sit for 1.6 s before the pointer ignores them.
- **Two responses on one wire** (render 2, 16.6 s): the grey heavy response from Replica 2 and the orange delayed response from Replica 1 reached the client 50 ms apart, overlapping on the client wire at the moment the `2.5 s` badge should land alone. The second heavy request now starts 0.3 s earlier, so the heavy response lands at 16.3 s and the delayed one at 16.65 s.
- **File size** (render 1, 2.57 MB): above the 2 MB target. The renderer now encodes at constant QP 25 with 128 kbps AAC (1.74 MB); frames were re-inspected at 350 px and full size after the change.
- **Low level** (render 1, peak −9.5 dBFS): the mix sat about 8 dB under the baseline cut. The renderer now normalises the synthesised mix to a −1.0 dBFS peak (measured −1.0 dB max, −22.4 dB mean after AAC).
- **Loop boundary**: frame 0 and frame 967 are the title-only frame; constant-QP encoding with forced keyframes on both makes them byte-identical after decoding (0 differing bytes in rgb24).

## Defect pass (render 3): clean

- Text: smallest words are the 24 px policy label and the 24 px "response time" caption; counters, chips and badges are 26–30 px mono and read at 350 px width. Nothing overlaps at any beat midpoint; the orange ripple at 13.5 s crosses Replica 1's top slot only while it expands.
- Stage: everything sits between y≈540 and y≈1540; nothing enters the title band.
- State: counters return to 0, slots to idle, the policy label stays LEAST IN-FLIGHT until the fade, and no badge lingers past its beat.
- Sound: all 116 cues show an energy rise within 70 ms of their scheduled time in the decoded AAC (`cueSync` in `checks.json`); every visible state change has a cue, and the only sounds without their own motion are the work ticks, which accompany the slowly filling heavy bars. The spectrogram shows the miss buzz at 13.5 s and the recover sweep at 18.05 s as the loudest events.
- Level: −1.0 dBFS max. No stretch longer than 1.8 s is still, apart from the deliberate 1.75 s close before the fade.

## Suggested improvements (ranked by teaching impact)

1. **Make the "equal counts" point explicit in motion** (11.1–12.7 s, size S). Saw: the counters read 1, 1, 0 for 1.6 s, but nothing points at the fact that each replica has received exactly one request. Change: pulse all three counters together once at 11.3 s with a soft chord (C6+E6+G6) before the pointer moves on. Effect: the viewer registers "round robin did its job, the counts are equal" right before seeing why that is not enough.
2. **Show the waiting request as queued, not as a slot** (13.5–15.25 s, size M). Saw: the misrouted small request occupies a second slot with an orange stub, which could read as "running slowly" rather than "waiting". Change: draw it as a chip parked beside Replica 1's rack with a short dashed wire into the slot, and slide it into the slot only when the heavy bar completes. Effect: the cause of the 2.5 s (waiting behind heavy work) becomes visible rather than inferred.
3. **Audible contrast at the pick** (12.7 s versus 22.75 s, size S). Saw: round-robin picks are silent and least in-flight picks use a C7 blip; the difference is subtle under work ticks. Change: give the round-robin misroute pick a dull low tick (E4) and keep the bright blip for counter-driven picks. Effect: the two policies gain distinct signatures before the result lands.
4. **Thin the work ticks when two heavy jobs overlap** (9.4–14.6 s and 22.45–27.35 s, size S). Saw: two interleaved 0.35 s tick trains produce a near-continuous ticking that may mask the G6 hint at 14.0 s. Change: tick every 0.5 s and alternate replicas. Effect: the hint and the ack notes stand out, and the texture grates less across loops.
5. **Shorten the tail** (27.35–31.15 s, size S). Saw: after the second fast response at 27.25 s the viewer waits 2 s for the heavy jobs to finish and 1.75 s more for the fade. Change: start the two heavy requests of beat 3 at 19.6 s and 20.5 s so they complete nearer the last fast response. Effect: the resolved state still registers but the loop returns about 1.5 s sooner.
6. **Route the counter dots around the racks** (18.5–19.2 s, size S). Saw: the three green dots that report counts to the balancer pass through the rack bodies and labels. Change: route them via a point beside each rack. Effect: a cleaner line of sight between "counter" and "balancer input".
7. **Mark the rotation fallback** (20.55 s and 21.65 s, size M). Saw: with all counters tied the pointer moves by rotation, which looks like round robin again. Change: flash the tied counters together before the pointer moves. Effect: shows the tie-break rule rather than leaving it ambiguous.

## Limitations (honest)

- Audio was measured and visually analysed only; nobody listened to the render. Cue synchronisation is confirmed by energy rise within 70 ms of each cue, not by perceived timing.
- The heavy requests landing in the order heavy, heavy, small is one illustrative sequence; round robin misroutes only when the rotation reaches a busy replica while another is free, which depends on arrival order.
- The in-flight counter is a proxy for load (the SRE chapter's caveat); the cut does not show weighted or utilisation-based policies, health checks, connection draining or long-lived connections, which the baseline cut and the concept note cover.
- The policy label changing on the balancer is a scene event. In a real system the policy is configuration on the balancer or client library; a label, a prompt or a persistent instruction does not enforce routing (or, by the same token, permissions).

## Notes for the skill (not acted on)

- A `counter` node (number plus unit, with a pop on change) would avoid rebuilding it from `badge` with derived text events, and a `queued` slot state would express "waiting" without a bar stub.
- The skill's renderer encodes with CRF and no forced keyframes, so a looping scene's first and last decoded frames differ by a few bytes; constant QP plus forced keyframes on both ends makes the boundary check exact. Lowering the default AAC bitrate to 128 kbps saves about 250 KB on a 30 s cut without affecting these synthesised sounds.
