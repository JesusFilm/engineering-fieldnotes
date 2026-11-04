# Lesson 05 plan B: Bound the whole operation

## Mechanism

A per-attempt timeout limits how long one try may wait. A shared overall deadline limits the whole operation: every attempt, every backoff sleep, and every gate check. In this illustrative policy the deadline is 12 seconds on a monotonic clock, each attempt may wait at most 5 seconds, and the sampled backoff is 2 seconds. The viewer should leave knowing that the attempt timer re-arms for a retry while the shared budget keeps draining and never resets. When the budget reaches zero, a gate stops further attempts, and the caller reports an unknown result with the attempt history. A timeout ends the caller's waiting. It does not prove that the remote service stopped working.

Out of scope: jitter mechanics, idempotency, cancellation propagation, retry classification, a third attempt that runs, or any successful response. These belong to other lessons.

## Policy arithmetic (all on-screen numbers derive from this)

| Policy t | Event | Budget left |
|---|---|---|
| 0 | Gate: min(5s, 12s left) = 5s. Attempt 1 starts | 12s |
| 5 | Attempt 1 times out | 7s |
| 5 to 7 | Backoff sleep, counted against the budget | 7s to 5s |
| 7 | Gate: min(5s, 5s left) = 5s. Attempt 2 starts | 5s |
| 12 | Attempt 2 ends at the deadline | 0s |
| 12 | Gate refuses attempt 3 | 0s |

Exact arithmetic means zero overhead. The scene takes no time for gate checks, sending, or connection setup, and one small note says so. The retry receives "at most 5s"; a real system would have slightly less. All values are labelled as example values so they do not read as defaults.

## Time mapping (slowed and coherent)

One policy cursor drives every timed element: budget bar fill, the readout, the attempt ring, and the clock ticks. While policy time runs, 1 policy second equals 1.2 video seconds, with no change of rate. During explanatory holds, policy time is frozen and all ticks stop, so stillness means paused. Gate decisions occur only during a freeze, which is consistent with zero overhead. No policy event may occur between ticks, and no readout may change during a freeze. One small persistent tag beside the bar, `example · slowed` (mid grey, 30px), reports the slowed playback.

## Layout (1080x1920, horizontal request lane over a horizontal budget timeline)

This layout varies from a top-to-bottom flow. The request crosses the screen horizontally at the top, the budget timeline sits in the middle as the main instrument, and the trace collects results at the bottom.

- Title band (y 250 to 420): title "Bound the whole operation", subtitle `ONE SHARED DEADLINE`.
- Request lane (y about 640): the caller box `tool runtime` sits at x 230 (w 300). The `deadline gate` box is at x 560 (w 200) with one port that is grey, green, or red. A two-slot rack `CI status API` sits at x 870. Dotted wires run caller, gate, service. Packets travel this lane left to right. No response packet ever comes back.
- Per-attempt timer (x 230, y about 880): add a local `ring` node to the cut (generic progress ring: `fill`, `color`, `text` props, read via p()). Label it `per attempt` below and show `5s` in the centre. It fills during an attempt, turns red at timeout, dims during sleep, and re-arms empty for attempt 2.
- Budget readout (right side, y about 900): a large number, `12s left`, 72px bold, that counts down by whole seconds on each tick.
- Shared budget bar (y about 1120, w 900, centred): the label `whole operation · 12s` sits above. It has 12 ticks, numbered only at 0, 5, 7, and 12 (30px). There are three segments. seg0 is attempt 1 (accent orange). seg1 is the sleep (info blue, so sleeping visibly still consumes budget). seg2 is attempt 2 (orange). The 12 end tick is a heavier mark that turns red at the deadline.
- Trace panel (store node, y about 1430, w 820, 3 rows, 34px mono): `#1  timed out   5s`, `sleep           2s`, `#2  timed out   deadline`.
- Result badge (y about 1680): `result: unknown`, amber, 56px. Amber is deliberate: unknown is not failed.
- Remote-work label under the rack: `still running?` (mid grey, 32px), shown after the first timeout.

Legibility at 350px wide (0.324x): no on-screen text below 30px; key readouts at 56 to 72px. At most three text items change within any 2-second window. Chips sit off the packet lane, and ripples stay clear of labels. Verify by downscaling every beat still to 350px width.

## Beat sheet (video seconds at speed 1, total about 38s)

| Time | What moves | State change | Sound |
|---|---|---|---|
| 0.0 to 1.4 | Title, then the three lane actors fade in | Stage set | soft `store` (C5) as the lane appears |
| 1.4 | Budget bar draws in with ticks; readout `12s left` | Shared budget armed | `clock` single tick, centre pan |
| 2.3 | Ring appears showing `5s` | Per-attempt cap shown separately | `ack` E6, left pan |
| 3.1 | Gate chip `min(5s, 12s left) → 5s`; gate port turns green | Gate permits attempt 1 | `ack` G5 (gate pitch) |
| 3.1 to 4.6 | Hold | — | silence |
| 4.6 | Envelope `#1` caller → gate → service; slot 0 turns busy at 5.4 | Policy t=0, cursor starts | `send` E6 (caller); `arrive` C5 (service) |
| 4.6 to 10.6 | seg0 fills 0→5; ring fills; readout 11,10,9,8 on ticks | Budget drains with the attempt | `clock` at 5.8, 7.0, 8.2, 9.4 (left); quiet `work` C4 every 0.6s from service (right, gain about 0.25) |
| 10.6 | Ring snaps red, × ripple at caller, small shake; seg0 edge mark; readout `7s left` | Attempt 1 timed out at policy 5 | `thump` E3 (caller's timeout sound) |
| 11.2 | Trace row 1 writes; slot 0 stays orange; `still running?` fades in | Timeout ≠ remote stop | `store` soft; one more quiet `work` tick from service at 11.8 |
| 11.2 to 13.2 | Hold | — | — |
| 13.2 | Chip `sleep 2s` at caller; ring dims to 30% | Backoff starts, policy 5 | low soft `clock` variant (sleep timbre, about A3) |
| 13.2 to 15.6 | seg1 fills blue 5→7; readout 6 then `5s left` | Sleep consumes budget | sleep-timbre ticks at 14.4, 15.6 |
| 15.6 | Trace row 2 writes | Sleep recorded | `store` soft |
| 16.2 | Small note under readout: `example: 0s overhead` (30px), held about 3s | Exact arithmetic declared | none (text-only aside, kept silent) |
| 15.6 to 17.6 | Hold | — | — |
| 17.6 | Gate chip `min(5s, 5s left) → 5s`; port green | Retry capped by remaining time | `ack` G5 |
| 18.4 | Ring re-arms empty, `5s`, with a brief pulse; readout pulses but stays `5s left`; chip `budget: no reset` beside the bar | Contrast: attempt timer resets, budget does not | rising two-note blip E5→B5 (ring re-arm); readout pulse silent |
| 18.4 to 20.0 | Hold | — | — |
| 20.0 | Envelope `#2` caller → gate → service; slot 1 busy at 20.8 | Policy t=7, cursor resumes | `send` E6; `arrive` C5 |
| 20.0 to 26.0 | seg2 fills 7→12; ring fills; readout 4,3,2,1 | Remaining budget runs out | `clock` at 21.2, 22.4, 23.6, 24.8, pitch stepping up slightly as budget shrinks, spacing unchanged; quiet service `work` |
| 26.0 | Bar end tick turns red, large red ripple at bar end, bar shakes 10px; ring red at the same instant; readout `0s left` red | Deadline reached at policy 12; attempt 2 ended by it | custom `deadline` sound (falling sweep + sub thump + short noise), loudest cue in the video |
| 26.6 | Trace row 3 writes `#2 timed out · deadline`; slot 1 stays orange | Two timed-out attempts recorded | `store` soft |
| 26.6 to 28.4 | Hold | — | — |
| 28.4 | Dashed ghost chip `#3` leaves caller, reaches gate at 29.0; gate port red, × ripple, gate jolts 8px; gate chip `0s left → stop` | Gate prevents a third attempt; nothing reaches the service | `thump` G3 (gate pitch, an octave below its `ack`) |
| 29.0 to 31.0 | Hold | — | — |
| 31.0 | Badge `result: unknown` pops amber with overshoot | Terminal status is unknown, with history | `deliver` as an unresolved two-note (C5 + F#5), centre |
| 31.8 | Trace panel glows; both service slots pulse orange once; `still running?` brightens | Caller stopped waiting; remote work unknown | one quiet `work` tick from service, right pan |
| 31.8 to 36.4 | Final hold on the resolved state | — | silence after the last tick |
| 36.4 | `s.fade` to black, 0.8s | Finite ending | none |

End at about 37.5s. The ending fades out and does not loop back, because the story finishes in a new state.

## Sound map

Each actor keeps one pitch and timbre. The caller sends at E6 and its own timeouts are a low E3 `thump`. The gate uses G: an `ack` at G5 when it allows an attempt and a `thump` at G3 when it refuses. The service plays `arrive` at C5 and very quiet C4 `work` ticks while a slot is busy. Those ticks keep going briefly after each timeout, so the viewer hears that the remote side was not told to stop. Running policy seconds are a `clock` tick near the caller and bar. The sleep uses a lower, softer tick, so the viewer hears that the policy is waiting while the clock still counts. The ring re-arm is the only rising blip. The deadline is the loudest and only crash-like sound. The final result uses an unresolved interval so it sounds unfinished without sounding like a failure. Pan each sound to its node's x position. Keep sends quieter than arrivals and keep the peak below -1 dBFS.

## Teaching guards

- The budget bar never moves backward or refills, and its 7→5 change happens only during the sleep segment.
- The ring is the only element that resets, and it resets during a freeze while the readout visibly holds at 5s.
- Attempt 2's ring and the bar's 12 tick turn red in the same frame, showing that the deadline was the binding cap.
- No response packet, success state, or third request ever reaches the service.
- Values appear only as example values, and there is no wording such as "always" or "recommended".
- Text is limited to labels, chips, readouts, and trace rows. Avoid sentences, paragraphs, and physical metaphors such as hourglasses, sand, or fuel.

## Build and verification

1. Write the scene in the assigned variant folder under `video/timeouts-and-retries/motion-v2/05/`, using a repo-local copy of the pinned engine, the local `ring` node, and `s.sound('deadline', …)` plus a sleep-tick variant defined in the scene.
2. Check timing in the Node dry run before rendering. Confirm a cue lands on every policy tick, that the gap between video ticks is exactly 1.2s while policy time runs, and that the readout value at each tick equals 12 minus policy t.
3. Render stills at 3.5, 8.0, 11.5, 15.0, 19.0, 23.0, 26.3, 29.5, 33.0, and 36.0. Inspect each at full size and downscaled to 350px width. Confirm that no label is under 30px, nothing overlaps, and no earlier chip lingers. The `min(...)` chips, `sleep 2s`, `budget: no reset`, and the overhead note must clear before the next beat.
4. Render the MP4 and contact sheet, generate a spectrogram, and run `volumedetect` (peak below -1 dB). Use ffprobe to confirm the duration and audio stream, and decode the whole file. Record whether the audio was heard or only analysed.
5. Audit the arithmetic frame by frame. At 10.6, 15.6, 20.0, and 26.0, the bar fill must equal 5, 7, 7, and 12 of 12, and the readout must show 7, 5, 5, and 0.
6. Run the defect pass and the improvement pass from the skill review guide. Leave comparative selection to a fresh reviewer.
