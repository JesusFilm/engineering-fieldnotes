# Lesson 06 review (render 2, final)

**Bound to:** `video.mp4` SHA-256 `6ce62a6ab2ffb94ed077a6e261ccde6d4fcc60f8e7640bfd90e4c25ec85a1b7b` (38.70 s). Any re-encode voids this review.

## Evidence scope

- **Analysed:** 36 frames decoded from this exact file at 0.5, 1.5, 3.3, 3.9, 4.4, 6.5, 9.4, 10.3, 10.6, 11.0, 11.8, 13.5, 15.3, 15.8, 16.3, 17.5, 18.9, 19.2, 19.9, 20.6, 22.0, 23.3, 23.8, 24.3, 24.8, 25.6, 27.0, 28.7, 29.4, 29.9, 30.5, 31.5, 33.0, 36.0, 37.6 and 38.66 s (`scratch/enc1/`). That covers both passing rounds, the failure, the record pulse, the third probe, the timeout, exclusion, every leg of the request and response, and the fade. I viewed the 350 px tile sheet (`scratch/enc1-350-sheet.png`, shrunk further for display), four encoded frames at true native 350 px (`scratch/native350-enc.png`: 13.5, 17.5, 24.3, 31.5), and full-resolution crops of the timeline at 17.5 and 19.2 s (`scratch/timeline-full.png`). I also checked the contact sheet, spectrogram, `volumedetect` and `astats` levels, a full decode, and the MP4 box order.
- **Heard:** nothing. The audio was **not listened to**. Sound claims come from the cue list, the spectrogram and level measurements.
- **Not covered:** browser or site checks, and comparison against other cuts.

## Fixed before handover

- **4.2 s onward (pre-encode stills):** a green check dot appeared early on A's track, at the third check's position. The node id for A's unanswered probe reused round 1's id (`mA3`), so that node was overwritten and drawn twice. It now has a distinct id. Encoded frames show A's track with only two green dots and, from 15.6 s, the hollow ring.
- **Whole video (pre-encode stills):** the `now` cursor's triangle grazed the `health checks` header and the `timeout` label. I raised that header row 10 px and started the cursor 8 px lower. The full-resolution crops show clearance.
- **Layout:** I lowered the stage 60 px more to centre it, since about 300 px below the servers was empty.

Clean on the final encode. The smallest stage text is the 42 px headers and status pills, about 14 px at 350 px. All other stage text is 44–56 px, and all of it reads in the native frames. Nothing enters the title band. A's record reads `eligible` from 10.4 to 19.8 s while A shows `no response`, and it changes only after the timeout bar turns red. No marker travels on link A after exclusion. The request goes only to B, and the response returns B → balancer → app. Every visible event has a cue (30 cues, each visible on the spectrogram). The deliberate exception is the missing reply from A, which is the teaching point. Peak is −1.5 dBFS, set by the failure crash, which is meant to be the loudest moment. That's below the −0.5 dB clipping threshold.

## Suggested improvements (ranked by teaching impact)

1. **Add headroom to the crash** (10.4 s, S). Saw: a −1.5 dBFS peak, and a long noise tail (about 1.4 s) on the spectrogram. Change: lower the crash gain to about 0.5. Effect: safer on phone speakers and still the loudest event. Listen first.
2. **Mark the failure moment on A's track** (10.4 s, S). Saw: the timeline shows checks but not when A actually failed. Change: drop a small red tick on A's track at 10.4 s. Effect: the detection gap reads as a measurable distance between the failure and the ×.
3. **Show a request sent during the gap** (M, risky). Saw: the takeaway says requests already sent can still fail, but this isn't shown. Change: optionally send one request to A at about 12 s that never returns. Effect: dramatises the limit. Risk: a longer video and a second failure story.
4. **Shorten the opening** (0–9 s, S). Saw: two full passing rounds take 9 s before the failure. Change: start the first check at 1.5 s. Effect: about 1.5 s tighter, with the periodic rhythm intact.
5. **Shorten the final hold** (31.3–37.3 s, S). Saw: 6 s of stillness. Change: 4.5 s.
6. **Listen to the clock ticks** (16.4–18.75 s, S). Saw: four speeding-up ticks, never heard. Change: audition them. Effect: confirms the countdown reads as waiting rather than alarm.

## Notes for the skill (not acted on)

- Scene helpers that build node ids from data, such as `'m' + k + t`, can silently collide and redraw a node twice. A duplicate-id warning in `s.node` would catch this.
