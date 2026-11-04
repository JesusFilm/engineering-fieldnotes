# Lesson 05 review (render 2, final)

**Bound to:** `video.mp4` SHA-256 `2db361381411c7b3c0b48c6e56edcd92f35f526effeb0b451c15590c55679ed1` (36.10 s). Any re-encode voids this review.

## Evidence scope

- **Analysed:** 31 frames decoded from this exact file at 0.5, 1.7, 3.0, 5.5, 7.7, 8.3, 9.4, 10.4, 11.5, 12.8, 13.3, 13.5, 13.7, 14.3, 15.0, 15.6, 16.6, 18.5, 20.8, 21.4, 22.3, 23.4, 25.5, 27.5, 28.3, 29.3, 29.9, 32.0, 34.9, 35.4 and 36.06 s (`scratch/enc2/`). That covers the arrival, both compares, the decision, the commit and count change, the gutter route, B's start and finish, the decrement, `stays on A`, the recap, and the fade. I viewed the 350 px tile sheet (`scratch/enc2-350-sheet.png`, shrunk further for display), four encoded frames at true native 350 px (`scratch/native350-enc.png`: 11.5, 15.0, 21.4, 29.9), and full-resolution crops of the commit at 13.3, 13.5 and 13.7 s (`scratch/commit-check.png`). I also checked the contact sheet, spectrogram, `volumedetect` and `astats` levels, a full decode, and the MP4 box order. Render 1's frames are in `scratch/enc1/`.
- **Heard:** nothing. The audio was **not listened to**. Sound claims come from the cue list, the spectrogram and level measurements.
- **Not covered:** browser or site checks, and comparison against other cuts.

## Fixed before handover

- **13.6–13.85 s (render 1):** B's count changed to `1` while `fewer` was still fading beside it, a stale comparison. `fewer` now clears 0.35 s before the count changes, as the encoded crops show.
- **20.7–22.1 s (pre-encode stills):** lane B still read `running` while its slot read `req 2 · done`. The lane now switches to `done` at the same moment.
- **11.3–16.5 s (pre-encode stills):** the teal selection outline around row B touched the balancer panel's bottom border. The panel is now 20 px taller and the lanes moved down to match.
- **Title:** the full lesson title didn't fit at the engine's fixed 104 px. I added a local `titleSize` option and set it to 86 px.
- **Whole video:** I lowered the stage 50 px to centre it.

Clean on the final encode. The smallest stage text is the 40 px `req 2 · lookup` pill, about 13 px at 350 px. All other stage text is 42–56 px, and all of it reads in the native frames. Nothing enters the title band, and the ring travels only in the gutter and never through lane A. `req 1 · report` never leaves A's slot, and A's count reads `1` in every frame. B's count reads 0, then 1 from 13.6 s, then 0 from 21.3 s. Every visible event has a cue (45 cues, each visible on the spectrogram). Peak is −6.8 dBFS.

## Suggested improvements (ranked by teaching impact)

1. **Contrast with round robin's choice** (11.3 s, M). Saw: the rule's advantage is only implied. Change: briefly show a ghosted `next A` that the rule ignores. Effect: links back to lesson 04's failure. Risk: it adds a second rule to the frame.
2. **Hold the compare a moment longer** (9.3–11.3 s, S). Saw: 1 s between each count outline. Change: 1.3 s. Effect: slower readers see both numbers before `fewer`.
3. **Make `stays on A` point at the request** (27.3 s, S). Saw: the label sits above lane A, near A's unused path arrow. Change: place it beside A's slot, or pulse the slot border twice. Effect: no misreading of the arrow as a move.
4. **Shorten the final hold** (29.7–34.7 s, S). Saw: about 5 s. Change: 4 s if slack.
5. **Enlarge the request pill** (S). Saw: 40 px, the smallest text. Change: 44 px.
6. **Listen to the background ticks** (whole video, S). Saw: 21 E4 ticks, never heard. Change: audition them, and reduce or drop them during holds if they distract.

## Notes for the skill (not acted on)

- The engine's title size is fixed at 104 px, which longer lesson titles overflow. A `meta.titleSize` option, local here, would help generally.
