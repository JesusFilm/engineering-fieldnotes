# Lesson 03 review (render 2, final)

**Bound to:** `video.mp4` SHA-256 `11c81fff3887c8283069094af91ff3f244f93c2554173fcb8589578e692dccaa` (45.75 s). Any re-encode voids this review.

## Evidence scope

- **Analysed:** 42 frames decoded from this exact file at 0.5, 1.3, 2.5, 3.7, 5.0, 5.8, 6.4, 7.2, 7.6, 8.0, 8.6, 10.0, 10.8, 12.8, 14.4, 15.4, 15.8, 16.4, 18.0, 19.0, 20.8, 22.6, 23.6, 24.4, 26.2, 28.5, 29.9, 30.5, 31.6, 33.0, 33.6, 34.0, 34.6, 36.4, 37.4, 37.8, 38.4, 39.0, 39.6, 42.0, 44.6 and 45.7 s (`scratch/enc1/`). That covers each arrival, pick, `next` hand-off, server state change, log write, the `4 → ?` hold, the pattern, and the fade. I viewed the 350 px tile sheet (`scratch/enc1-350-sheet.png`, shrunk further for display) and four encoded frames at true native 350 px (`scratch/native350-enc.png`: 6.4, 15.8, 31.6, 42.0). I also checked full-resolution crops of the `next` move before and after the fix (`scratch/slide-check.png` and `scratch/slide2-check.png`, both pre-encode stills), the contact sheet, spectrogram, `volumedetect` and `astats` levels, a full decode, and the MP4 box order.
- **Heard:** nothing. The audio was **not listened to**. Sound claims come from the cue list, the spectrogram and level measurements.
- **Not covered:** browser or site checks, and comparison against other cuts.

## Fixed before handover

- **`next` move, 7.4, 15.4, 23.4 and 33.7 s:** the outline originally slid between rows, and for about 0.3 s it cut across the `eligible` and `weight 1` text of both rows like a strikethrough (`scratch/slide-check.png`). It's now a hand-off: the old outline fades out in 0.2 s, then the new one pops in on the other row. It never crosses text and never shows two full selections (`scratch/slide2-check.png`).
- **Process, not a video fault:** running the renderer from the cut folder couldn't find the repository's pinned `puppeteer-core`. All renders now run from the repository root, as the reproduction command states.

Clean on the final encode. The smallest stage text is the 42 px `req N` pill, about 14 px at 350 px, and all other stage text is 44–56 px. All of it reads in the native frames. Nothing enters the title band, and no ring lingers after arrival. Exactly one path lights per request. Request IDs match across pill, slot and log, picks are A, B, A, B, and both servers are idle at every pick. Every visible event has a cue (49 cues, each visible as a spectrogram onset). Peak is −6.4 dBFS. The longest still stretches outside the opening and final holds are the 2.6 s holds after each cycle and the 2.6 s `4 → ?` hold, all deliberate.

## Suggested improvements (ranked by teaching impact)

1. **Show that `next` ignores the idle server** (13.4 s and 21.4 s, M). Saw: both servers are idle at every pick, so the viewer can't tell turn-based from "any free server". Change: keep the previous server showing `done` (still idle) when the next request arrives, so the pick visibly skips it. Effect: sharper evidence that the turn decides. Keep it short of lesson 04's busy server.
2. **Shorten the per-request cycle after the first** (beats 3–4, S). Saw: req 2 and req 3 repeat req 1's full 8 s timing. Change: trim the holds after req 2 and req 3 by about 0.8 s each. Effect: the rhythm tightens once the pattern is established, and the `4 → ?` pause stands out more.
3. **Pulse cell 3 alongside the `next` glow during `4 → ?`** (31.6 s, S). Saw: only `next` glows. Change: pulse `3 → A` just before. Effect: links "last was A" to "next is B".
4. **Shorten the final hold** (39.4–44.35 s, S). Saw: about 5 s of stillness. Change: 3.5–4 s if viewers find it slack.
5. **Make the `req N` pill larger** (header, S). Saw: it's the smallest text at 42 px. Change: 46 px if a phone review finds it tight.
6. **Listen to the sound pattern** (whole video, S). Saw: never heard. Change: audition the D6 hand-off cue against the E/G arrivals and adjust gain. Effect: confirms the selector cue doesn't mask the server notes.

## Notes for the skill (not acted on)

- Sliding a selection outline across text rows causes a brief strikethrough. A fade hand-off is a safer default for list selections.
- `render.mjs` resolves `puppeteer-core` only from its own folder or the current directory. That makes renders depend on where you run them from.
