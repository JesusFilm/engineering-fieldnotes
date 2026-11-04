# Lesson 01 "Wait for a response": encoded comparison

Reviewer: fresh independent comparison reviewer (claude-opus-5-5). Before inspecting the media I read only AGENTS.md, docs/editorial-workflow.md, the architecture-flow-video review reference and lessons.json item 1. I did not open the author source, beat sheet, self-review, verification file, plans or ledgers.

| File | SHA256 (before and after review) |
|---|---|
| Candidate: video/timeouts-and-retries/motion-v2/01/video.mp4 | 8fe0278c7d0665832dfbf8ddb45118953580ac288413cc306b0dbff4af3022aa |
| Original: public/lessons/timeouts-and-retries/01.mp4 | b3d88503c954286e15774cbced559ca9faea80bfa220de16745b3b9da894bee7 |

**Verdict: pass. Recommend the candidate over the original.** The candidate shows the full scoped mechanism in motion: a CI status request, network travel, remote processing, a caller that waits against a visible 5 s limit, an in-time response, and a separate slow request whose wait ends at the limit. In the original, the timeout beat exists only as caption text over a frozen success state.

## Encoded facts

| | Candidate | Original |
|---|---|---|
| Video | H.264 High, 1080x1920, 30 fps, 1170 frames, yuv420p | H.264 High, 1080x1920, 20 fps, 560 frames, yuv420p |
| Audio | AAC LC 44.1 kHz stereo | AAC LC 44.1 kHz stereo |
| Duration | 39.0 s | 28.0 s |
| Full decode | clean | clean |
| moov before mdat (fast start) | yes | yes |
| volumedetect | mean -32.2 dB, max -6.3 dB | mean -41.5 dB, max -10.6 dB |

**Audio was analysed only, not heard.** The evidence is volumedetect, a 100 ms RMS envelope, 20 ms onset windows with zero-crossing pitch estimates, and matching the onsets to per-frame visual differences.

## Method

I extracted one frame per second from both files and made contact sheets. I then pulled exact frame indices at native 1080 px (candidate frames 0, 15, 95, 165, 300, 320, 400, 480, 510, 540, 600, 890, 905, 1000, 1110 and 1169) and viewed key frames from both cuts scaled to 350 px. I computed per-frame difference to find static runs and fades, located the region that changes at each sound onset, and measured the leftmost and rightmost bright pixels across every candidate frame. All scratch output is in reviews/scratch/01/.

## Candidate beat map, from encoded frames and sound

| Time | Visible event | Sound |
|---|---|---|
| 0-1.3 s | Fade in: Caller with "No status yet", empty 5-tick bar, "Limit 5 s"; CI service "Idle"; "In time" case chip | soft blips at 0.3 s and 0.8 s |
| 3.0 s | "status #418?" chip leaves the caller; pill changes to "Waiting"; bar starts filling | short high blip, about 1 kHz |
| 4.6 s | Request reaches the service, which changes to "Processing" with a moving bar | strong tone, about 650 Hz, -14 dB |
| 5.6-9.0 s | Service processes; caller bar fills | soft ticks at about -31 dB |
| 9.4-11.0 s | Green "#418 passed" chip travels up the return path | send blip at 9.4 s; arrival tone about 500 Hz, -14 dB at 11.0 s |
| 11.0-12.6 s | Caller pill turns green ("✓ #418 passed"), bar turns green and stops, "4 s" marker appears before the limit (frame 379) | blip at 12.6 s |
| 12.6-16.0 s | Hold on the resolved success state | none |
| 16.0-17.6 s | Fade to an empty stage (frames 500-518) and back in, with case chip "Too slow" | blips at 17.3 s and 17.8 s |
| 20.0-21.6 s | Separate "status #419?" request travels down; service starts processing | send blip, then arrival tone |
| 21.6-29.4 s | Caller waits while the bar fills toward the limit; service keeps processing | ticks matching the first case |
| 30.0 s | Bar reaches the limit marker, which glows; "Limit 5 s" turns orange; pill shows "■ Timed out"; service still shows "Processing" (frame 905) | loudest event, about 400 Hz, -12.9 dB at 20 ms |
| 31.4 s | Service and network fade to a dim state while the dim processing bar keeps moving | soft 525 Hz blip |
| 34.0 s | Limit marker glow pulses (frames 1020-1024, y about 790-830) | 525 Hz blip, -24 dB |
| 32.5-37.3 s | Hold on the timed-out state | none |
| 37.3-39.0 s | Diagram fades out; title remains until the end | none |

## Scores (reviewer judgment, 1-5; not measured learning)

| Criterion | Candidate | Original |
|---|---|---|
| Causal clarity | 5 | 2 |
| Accuracy | 5 | 2 |
| Pacing | 4 | 2 |
| Visual legibility | 5 | 3 |

These scores are separate from factual verification. I did not verify sources; I checked the claims shown on screen against the lesson's stated scope.

## Concrete advantages over the original

1. **The timeout is shown in motion.** The original's frames from 21 s to 28 s are pixel-static on the earlier success state ("CALLER status known", "REMOTE SERVICE response sent"), and the soundtrack is silent after 16 s. Only the burned-in caption says "A timeout bounds one attempt." In the candidate, the second attempt fills the bar from 20 s to 30 s, and the wait visibly ends at the limit marker (frame 905).
2. **Waiting is measured.** The candidate's caller carries a 5 s bar from the start. The in-time case stops at a labelled "4 s" marker (frame 400), so the same bar compares the two cases. The original shows waiting only as the word "waiting".
3. **The cases contrast cleanly.** Both attempts use the same layout, path, sounds and limit, and differ only in outcome and colour (green "In time", orange "Too slow"). A different build number (#418, then #419) presents the second request as a separate attempt and avoids implying a retry, which this lesson leaves out of scope.
4. **The timeout claim stays within scope.** At 30 s the service still shows "Processing", and it then dims instead of stopping (frames 905 and 1110). The caller's state reads "Timed out" with no claim of failure. The video bounds the caller's wait without implying that the remote work was cancelled. Lesson 2 owns remote continuation, and the candidate leaves it without overstating it.
5. **The network and the service are distinct.** The candidate draws separate down and return paths labelled "Network" and changes the service from Idle to Processing to Idle, so travel time and processing time read as separate costs. In the original, the request chip moves along a faint line between two boxes, and processing appears only as a border colour plus a thin bar.
6. **The original has a state inaccuracy.** Its caller reads "waiting" at 0 s, before the request is sent (frame 10). The candidate shows "No status yet" until the request leaves at 3 s.
7. **Picture and sound stay in sync.** Every candidate onset I checked has a matching visible event, including the soft blips at 31.4 s (service dims) and 34.0 s (limit marker pulse). The timeout is the loudest moment. The original has a 4.4 s static run from 2.55 s to 6.95 s, and its final 7 s change neither picture nor sound.
8. **The candidate needs no paragraph captions.** Labels are short state words ("Waiting", "Processing", "Timed out", "Limit 5 s"). The original depends on two-line captions to carry its last beat.

## Legibility and objective checks

Native 1080 px: the smallest text is the "ILLUSTRATIVE TIMES" subtitle and the "Network" label, both at least 28 px tall. No text overlaps or clips. The nearest content to an edge is 48 px from the left (frame 94, request chip) and 66 px from the right (frame 326, response chip), and nothing enters the title band. At 350 px wide, the state pills, "Limit 5 s", the "4 s" marker, and the request and response chips remain readable; "Network" and "Idle" are small but legible. The empty stage at frames 500-518 sits inside a smooth fade (body luminance falls 11.5 → 4.0 → 8.3 across frames 480-540), so it is a deliberate reset. The ending fades from frame 1112 and holds the title alone from about frame 1140, which suits a finite clip. Peak level is -6.3 dB, with no clipping.

## Blockers

None. I found no reproducible objective fault.

## Optional refinements (none blocks this cut)

1. **Shorten the success hold** (12.6-16.0 s, S). The resolved success state is pixel-static for about 3.4 s before the reset. Trimming it to about 2 s would bring the slow case forward without losing the landing.
2. **Reveal the case chip at resolution** (0 s and 17.3 s, S). "In time" and "Too slow" appear before each attempt, so the outcome is announced before the motion shows it. Introducing a neutral chip, or changing colour only at 11 s and 30 s, would let the bar make the point. The labels also work as scenario framing, so this is a judgment call.
3. **Watch the tick density in the slow wait** (21.6-29.4 s, S). About nine ticks precede the timeout. They were analysed, not heard; a listener should confirm they do not grate on repeat.
4. **Manifest integration for promotion (coordinator).** lessons.json item 1 records duration 28 and beat times 0/7/14/21. The candidate runs 39 s, with its beats at about 0, 4.6, 11 and 20-30 s. If the page syncs beat text to time, the coordinator must update that metadata before promotion. This is manifest work and does not reflect a fault in the media.

