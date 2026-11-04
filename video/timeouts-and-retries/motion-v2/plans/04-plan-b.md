# Lesson 04 — Back off before retrying (plan B)

## Mechanism

After a failure that affects every caller at once, immediate retries would land together and form a second burst. With backoff, each caller waits before retrying. Jitter draws each wait at random from a range, so in this run the retries reach the service at different times. Every caller has a limit of two attempts, so the video ends with every counter at 2/2 and no third attempt. All operations in the scene are status reads that can be retried, and the video never asks whether a failure should be retried.

Three points must stay honest:

- The delays are illustrative draws from an illustrative 0–3 s range. Jitter makes collisions less likely without making delays unique. The video shows one run where the draws differ, and the gaps are uneven (1.1 s and 0.9 s) so the spacing does not look scheduled.
- Spreading arrivals does not guarantee recovery. The service never returns to healthy grey or green. One retry succeeds and two fail, and the success must not look like a result of the waiting.
- There is no overall deadline, budget bar, or shared operation clock, because those belong to lesson 05. The fill bars show only each caller's own wait.

## Layout (1080×1920, software-native lanes and a trace strip)

The baseline stacks the boxes and puts the teaching in captions. This plan uses horizontal request lanes from left to right, plus an arrival trace at the bottom that works like a mini timeline. It has no captions or paragraphs.

- Title band: "Back off before retrying" in yellow at about 64 px, y≈300. Subtitle "BACKOFF + JITTER" at 40 px or more, y≈375.
- Callers: three laptop icons at scale about 1.25, x=150, y=720 / 930 / 1140. Each has a letter label "A", "B", or "C" (52 px bold) to its left or under the icon, and an attempt counter text node 48 px below it: empty at first, then "1/2" and "2/2".
- Service: one tall box at x=880, y=930, w=260, h=440, labelled "SERVICE" (44 px). Each lane wire runs from a caller's right anchor at its own y to the service's left edge, so all three lanes converge on the service.
- Wait tracks: one bar per lane, 420×18, centred at x≈500 and drawn 55 px above the lane wire. Each track appears only in beat 3. Its fill colour is accent orange. The marker for its random draw is a small downward chevron, with a value chip above it ("0.8 s", "1.9 s", "2.8 s", 44 px mono). One grey label above the A track reads "random wait 0–3 s" (40–44 px).
- Arrival strips: two 800×14 bars from x=140 to x=940. The upper strip at y≈1420 is labelled "no wait" above its left end in muted red-grey. The lower strip at y≈1610 is labelled "with jitter". Only the jitter strip has end tick labels, "0 s" and "3 s", at y≈1665. Arrivals appear as letter badges (A/B/C, 44 px bold, about 70 px circles) above the strip at their arrival position. On the no-wait strip, the three badges stack vertically at x≈0, forming a pile.
- Text budget: about 15 short words in total, every label at least 40 px, so each is at least about 13 px wide at a 350 px phone width. Nothing sits below y=1800.

## Beat sheet (speed 1, about 34 s, 30 fps)

| Time | What moves | State change | Sound |
|---|---|---|---|
| 0.0–1.2 | Stage fades in | Callers grey, service grey, strips dim | none |
| 1.2 | Three solid envelopes leave A, B, and C together | Counters pop to "1/2" | send C6+E6+G6 at the same time (a chord means "together") |
| 1.8 | Envelopes land together | Service snaps red, shakes ±14 px, large red ripple | crash, loudest event |
| 2.1–2.7 | Red × chips return along all lanes | Callers flash red; counters stay "1/2" in red | one low thump at 2.7 |
| 3.6 | Service settles from red to dull orange-red (still unhealthy) | Persistent degraded outline | short "settle": a low rising sweep that stalls halfway |
| hold to 5.6 | — | — | — |
| 5.6 | Ghost chips A, B, and C (dashed outline, about 45% alpha) leave together; the "no wait" label brightens | Counterfactual only | send chord, quieter and slightly detuned |
| 6.2 | Ghosts land together | Service jolts again with a second red ripple; badges A, B, and C stack into a red pile at x≈0 on the no-wait strip | "burst": C5+E5+G5 struck at once over a noise thump, about 2 dB below the crash |
| 7.0 | Ghost chips fade | Pile stays and dims to about 50%; counters still read "1/2", showing that the burst never happened | soft poof |
| hold to 9.8 | — | — | — |
| 9.8 | Wait tracks and the "random wait 0–3 s" label fade in | Three empty tracks | quiet ack |
| 10.2–10.7 | A's chevron flicks across three positions, then lands at 27% | Chip "0.8 s" pops | three clock ticks 0.12 s apart, then ack at C5 |
| 11.4–11.9 | B's chevron flicks, then lands at 63% | Chip "1.9 s" | ticks, then ack at E5 |
| 12.6–13.1 | C's chevron flicks, then lands at 93% | Chip "2.8 s" | ticks, then ack at G5 |
| hold to 15.4 | — | Three different values visible | — |
| 15.4 | All three tracks fill together at the same rate (1 illustrative second = 2.0 animation seconds) | Waiting starts at the same moment for everyone | quiet clock tick at 17.4, 19.4, and 21.4 |
| 17.0 | A's fill reaches its chevron, which flashes; a retry chip "A" leaves | A's counter changes to "2/2" | send C6 |
| 17.6 | Chip lands | Badge A drops onto the jitter strip at 0.8/3 | arrive C5 |
| 17.9–18.4 | A red × returns | A turns red | thump |
| 19.2 / 19.8 | B's fill reaches its chevron; the retry leaves, then lands | B's counter changes to "2/2"; badge B lands at 1.9/3 | send E6, arrive E5 |
| 20.1–20.6 | A green ✓ returns to B | B turns green; the service stays orange | deliver (high) |
| 21.0 / 21.6 | C's fill reaches its chevron; the retry leaves, then lands | C's counter changes to "2/2"; badge C lands at 2.8/3 | send G6, arrive G5 |
| 21.9–22.4 | A red × returns | C turns red | thump |
| hold to 23.4 | — | Pile and spread visible together | — |
| 23.4 | The three pile badges pulse together | Comparison replay | soft C5+E5+G5 chord |
| 24.2 / 25.3 / 26.2 | The spread badges pulse one by one at their real relative spacing | The spread becomes audible | soft C5, E5, G5, one at a time |
| hold to 28.2 | — | — | — |
| 28.2 | The three "2/2" counters ripple in accent; a small chip "max 2" pops above the counter column | Limit made explicit | ack |
| 28.9 / 29.4 | A "stop" chip pops on the A lane, then on the C lane; those lanes and wait tracks dim to 30% | No third attempt for the failed callers; B keeps its ✓ | "cap" at A's pitch, then C's: a muffled falling two-note mallet |
| hold to 33.0 | — | Final state: one success, two stopped at the limit, service still unhealthy | — |
| 33.0–33.8 | `s.fade` to black | Finite ending | none |

Each beat gets a visible state change and a sound. Packets travel for 0.6 s, and gaps longer than 3 s happen only during deliberate holds.

## Sound map

Each caller keeps one pitch: A=C, B=E, C=G. Sends sound an octave up (C6/E6/G6) and arrivals an octave down (C5/E5/G5). This lets the ear hear the difference: the first attempts and the ghost burst land as one chord, while the jittered retries land as a slow, uneven arpeggio. The service owns the crash, burst, and settle sounds. Failures use thump, success uses a high deliver, and the limit uses a scene-defined cap sound that differs from the chime. Pan each cue with `s.panOf`: callers left, service right. The mix order from loudest down is crash, burst, thump, arrive, send, tick. Check that ticks stay audible without crowding the sends during the fill.

## Engine needs (local copy in `motion-v2/04/engine/` only)

- A packet or chip option for a dashed outline at reduced alpha, used for the ghost retries. If that option is missing, add a general `ghost` packet style.
- Letter badges and the "stop" and "max 2" chips use the existing `badge` and `label` nodes. The chevron marker is a small label or badge whose `x` is tweened. Avoid any node type named after this topic.
- Define `burst`, `settle`, and `cap` with `s.sound` in the scene file.

## Verification

Render stills at 1.0, 2.0, 6.4, 13.5, 17.8, 22.6, 26.5, 30.0, and 33.2. Inspect each one at full size and downscaled to 350 px wide. At 350 px, every label and chip must be readable, and the letter badges must not overlap at the pile or the spread. Check that the pile stays at 50% and does not compete with the jitter strip after beat 3.

Inspect boundary frames at every beat change: the ghost-to-real handoff at 7.0, the end of the fill at 22.4, and the last frame after the fade. Decode the whole MP4 (`ffmpeg -v error -i … -f null -`). Run `volumedetect` and require `max_volume` of −0.5 dB or lower. Produce a spectrogram that shows a cue on each beat and the crash as the loudest event. Confirm with `ffprobe` that the file has an audio stream, a duration of about 34 s, and the faststart/moov atom placement. Record in `verification.json` whether the audio was actually heard or only analysed.

## Review risks

- Viewers may read the ghost burst as a real event. Mitigate this with the dashed, translucent style, counters that stay at "1/2", and the label on the "no wait" strip. A reviewer should check this at 6.2–7.2.
- The single success could suggest that jitter fixed the service. Keep the service orange the whole time, and keep B's ✓ green on B's lane only.
- The draw flicker could look like fiddling with a dial. Keep it brief (three ticks), and if it confuses viewers, drop it in favour of a single drop-in.
- Do not create a separate wait strip for each caller or add numbers on the arrival strip beyond "0 s" and "3 s".
