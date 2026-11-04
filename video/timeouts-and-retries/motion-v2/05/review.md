# Bound the whole operation — self review (render 2)

Author self-review of the encoded `video.mp4` (43.4 s). This review contains no comparative scores; a fresh comparison reviewer should judge this cut against the alternatives. Audio was **analysed only** (spectrogram, decoded peak levels, onset energy at every scheduled cue); it was **not listened to**.

## Fixed before handover (render 1 → render 2)

- Stale gate decision during running time (render 1, 6.0–14.0 s and 26.0–34.0 s): `12s left → go` / `5s left → go` stayed beside a falling readout (for example `5s left → go` beside `3s left` at 30 s). The decision text now fades when policy time starts running and reappears only at the next gate check.
- Deadline ripple over labels (render 1, 34.0–34.8 s): a 150 px ring at the bar end crossed `deadline` and `12s`. It is now a 58 px ring where try 2 meets the deadline line, which is also the point the lesson needs the eye on.
- Refusal × on the gate label (render 1, 36.3 s): the × overlapped the "d" of `deadline gate`. The refused request now stops in the wire gap at x 368 and the × sits there.
- Arrival and timeout ripples touching box labels (render 1, 4.85, 5.6, 14.0, 21.85, 25.45, 34.0 s): arrival rings moved outside the box edges with box glows; the caller × moved below the box.
- Invisible pulses: `s.pulse` on custom readout/ring nodes did nothing; replaced with scale pulses so the timeout and deadline readout changes visibly register.
- `sleep 2s` was cramped inside its 140 px window (stills pass); the label now sits left of the window.

## Defect pass on render 2

- Every beat and boundary frame was inspected individually at 1080×1920 and at 350 px width (37 exact frame indices, including frames 419/420/421, 593/594 and 1019/1020/1023 around policy 5, 7 and 12). Arithmetic is coherent at each boundary: 8s→7s left at frame 420, 6s→5s at 594, 1s→0s at 1020; the per-try ring shows 4s→5s at 420 and has re-armed to 0s by frame 714 while the readout holds at 5s.
- Paused spans are frozen: crop PSNR between frames inside the same pause is 42–75 dB for the timeline, readout and ring, and 19–24 dB across running spans.
- No overlaps among text, chips, packets or ripples in render 2; no element outside the stage or inside the title band; no stale state.
- Every visible event has a sound and every sound a visible event (31 cues, all with a measured onset; the caller timeout at 34.02 s intentionally layers on the deadline). Peak −1.9 dBFS; the deadline is the loudest event.
- Ending: finite, ends in a new state with a 4.4 s evidence hold and a 0.8 s fade; no loop required.

## Known limits

- At 350 px width, secondary 30–34 px lines (`measured on a monotonic clock`, `at most 5s, less any overhead`, `remote work may continue`, row labels) render at about 10–11 px. They are readable in the extracted frames but small; the numbers, timeline ticks and result badge remain clear.
- The `?` under the service is the only remote-state signal; the cut deliberately makes no claim that remote work stopped or continued.
- The 5 s cap and 5 s remaining coincide at policy 7 by design of the example, so `min(5s, 5s left)` does not show a case where remaining time is the smaller value.

## Suggested improvements (not applied)

1. **Show the cap binding below 5 s** (23–26 s, size M). Saw: `min(5s, 5s left)` ties, so the viewer never sees the remaining budget win. Change: a brief ghost of a 3 s backoff showing `min(5s, 4s left) = 4s` and a shorter try-2 window, then return to the real trace. Effect: makes "capped by remaining time" concrete. Risk: adds a hypothetical branch to a single-trace lesson.
2. **Enlarge secondary lines for 350 px** (throughout, size S). Saw: 30–34 px helper lines are about 10 px on a phone preview. Change: raise them to 38–40 px or drop `measured on a monotonic clock` into the deadline chip. Effect: better small-screen legibility.
3. **Shorter setup** (0–4.3 s, size S). Saw: four introductory beats before the first request. Change: bring the per-try ring in with the budget at 1.4 s. Effect: reaches the first wait about 1.3 s sooner.
4. **Make the pause tag change audible** (6.0, 16.6, 26.0 s, size S). Saw: the tag flips to `animation slowed` silently; the first clock tick comes 1.6 s later. Change: a very soft start tick at each run start. Effect: ties the tag to the clock sound.

## Notes for the skill (not acted on)

- Built-in `s.pulse` only affects nodes that draw `glow`; custom nodes need scale pulses.
- A generic callback node (`draw`) plus exported `NODES`/`util` made a policy-clock-derived scene possible without topic-specific engine types.

