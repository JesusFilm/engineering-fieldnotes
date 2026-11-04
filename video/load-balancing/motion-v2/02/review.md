# Lesson 02 review (render 2, final)

**Bound to:** `video.mp4` SHA-256 `1ec94579979f3bd865872666ac65e24a2eab074749f6b20236861d70ecfc5eef` (37.70 s). Any re-encode voids this review.

## Evidence scope

- **Analysed:** 34 frames decoded from this exact file at 0.5, 1.3, 3.3, 5.0, 5.8, 6.8, 7.3, 8.0, 9.5, 10.4, 11.5, 12.4, 13.5, 15.5, 16.3, 16.9, 17.5, 18.1, 19.5, 20.7, 21.4, 22.4, 23.9, 24.6, 25.4, 26.4, 27.5, 28.5, 30.0, 31.0, 31.9, 34.0, 36.5 and 37.66 s (`scratch/enc1/`). That covers each beat, every send, arrival, finish and return, the comparison motion, and the fade. I viewed the 350 px tile sheet (`scratch/enc1-350-sheet.png`, shrunk further for display), four encoded frames at true native 350 px (`scratch/native350-enc.png`: 7.3, 12.4, 18.1, 31.9), a full-resolution crop of the final state from a pre-encode still (`scratch/full34.png`), and a full-resolution three-frame ripple check from the encode (`scratch/ripple-check.png`). I also checked the contact sheet, spectrogram, `volumedetect` and `astats` levels, a full decode, and the MP4 box order.
- **Heard:** nothing. The audio was **not listened to**. Sound claims come from the cue list, the spectrogram and level measurements.
- **Not covered:** browser or site checks, and comparison against other cuts.

## Fixed before handover

- **Work ticks, 12.6–15.8 s (dry run):** req 2 started exactly 4.0 s after req 1, so A's E4 ticks and B's G4 ticks fired together and merged into one sound. I moved req 2's send from 9.6 to 10.0 s, so the ticks now alternate every 0.4 s while both run, and tied the shaded band to the computed start and finish times.
- **Arrival ripples, 7.8, 12.2, 17.9 and 22.3 s:** the rings grew to 44–50 px and grazed the `server A`/`server B` names and the app's `req 2` row. I shrank them to 32 px. The encoded 12.30/12.45/12.60 s crops show the ring clear of `server B`.

Clean on the final encode. The smallest text is the 40 px bar label (`req 1`, `req 2`), about 13 px at 350 px, in bold dark type on solid bars, and it reads in the native frames. All other stage text is 44–58 px. While a bar is still shorter than its label (about 12.2–12.8 s), the label is clipped inside the bar, by design. Nothing enters the title band, and no marker lingers after arrival. No `done` appears before its response lands, B is `free` until 12.2 s, and the two closed bars are exactly the same length. Every visible event has a cue (41 cues, each visible as a spectrogram onset). Peak is −6.4 dBFS. Stillness lasts at most 2.6 s outside the deliberate holds after 3.1 s and 31.7 s.

## Suggested improvements (ranked by teaching impact)

1. **Show what would have happened with one server** (between beats 3 and 4, M). Saw: the value of B is implied, never contrasted. Change: briefly show a dashed ghost of bar 2 queued after bar 1 on row A, then remove it. Effect: makes "more capacity" visible. Risk: this edges into waiting behind a busy server, which lesson 04 covers. Keep it only if lesson 04's framing allows.
2. **Pulse both slots on the `working 2` change** (12.2 s, S). Saw: the counter change is small next to B's arrival glow. Change: a joint pulse on both busy slots. Effect: links the number to the two physical slots.
3. **Hold the band longer before `req 3`** (28.2–30.8 s, S). Saw: 2.6 s. Change: about 3.2 s. Effect: the "same time" span gets one more beat to register.
4. **Shorten the final hold** (31.7–36.3 s, S). Saw: 4.6 s of stillness. Change: 3.5–4 s if viewers find it slack. Effect: tighter close.
5. **Bar label size** (timeline, S). Saw: 40 px labels are the smallest text. Change: 44 px with a taller bar, if a phone review finds them tight. Effect: more margin on small screens.
6. **Listen to the alternating ticks** (13.0–15.8 s, S). Saw: ten interleaved ticks, never heard. Change: audition them and adjust gain if busy. Effect: the overlap stays pleasant to hear.

## Notes for the skill (not acted on)

- `span`, `cursor` and `band` are general timeline pieces that could serve other concurrency or latency scenes.
