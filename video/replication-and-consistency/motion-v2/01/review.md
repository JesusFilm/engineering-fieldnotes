# Video 01 review (render 4, after comparison review)

**Bound to:** `video.mp4` SHA-256 `540a5cfe04c63ca54c3a1f51a3654ed3673b624416335ba640a49220a0553bda` (33.00 s). Any re-encode voids this review. The previous encode (`fe774ae8…457d`, 35.30 s) is superseded, and the comparison review bound to it needs renewal for this hash.

## Evidence scope

- **Analysed:** 26 encoded frames from this exact file at 0, 1.9, 3.1, 4.3, 6.5, 8.24, 9.5, 10.3, 11.2, 12.1, 13.2, 15.5, 17.65, 18.5, 19.4, 20.3, 21.1, 21.9, 22.1, 22.5, 23.6, 25, 28, 30.9, 31.9, 32.95 s. These cover each beat, each boundary, both record switches, both chips in transit, the agreement switch, the fade, and the last frame. I viewed them as a native 350 px sheet (`scratch/enc3-350-sheet.png`). For the agreement window I also cropped frame-number selections of frames 655–705, every 5 frames (`scratch/repro3/sel_655_705.png`), and accurate seeks at 21.9, 22.1, 22.5, 23.5 and 24.5 s (`scratch/repro3/seek_strip.png`). Also reviewed: the contact sheet, spectrogram, `volumedetect`/`astats` levels, a full `-xerror` decode, and the MP4 box order.
- **Heard:** nothing. The audio was **not listened to**. Sound claims come from the cue list, the spectrogram, and levels.
- **Not covered:** a browser or site check, and a renewed comparison. Passing these scoped checks does not prove the video is correct everywhere.

## Fixed before handover

- **Comparison blocker, 22.1–25.0 s (render 3):** the mark still read amber `≠` for about 3 s after the replica showed `ready · 8`, matching the primary. I reproduced it on the old encode before editing, with frame selection across frames 660–800 and seeks at 21.8–25.2 s (`scratch/repro/`). Cause: the scene switched the mark at a fixed time (scene 22.0) instead of at the replica's apply. Fix: the mark now switches to green `=` in the same frame the replica's record changes (22.06 s, frame 662), paired with the replica's `store` cue. The shared green glow and chime follow at 23.59 s, after the apply highlight clears, and the note appears at 25.00 s. On the new encode, frames up to 660 show `draft · 7` with `≠`, frame 665 onward shows `ready · 8` with `=`, and no frame shows `≠` beside identical cards.
- Because beat 4 moved earlier, I moved the note and fade with it. The final silent hold stays at about 5.9 s, and the video shortens from 35.30 s to 33.00 s.
- Render 1–2 fixes (still in effect): enlarged stage and text, chips stop outside panel edges, a shorter final hold, and a 92 px title.

Clean on this encode: no clipping or overlap, nothing in the title band, no stale highlight, status and revision always switch together, the agreement mark always matches the two revision rows, and the application never connects to the replica. All 22 cues show as spectrogram onsets, each paired with a visible event. Peak is −6.9 dBFS.

## Suggested improvements (optional, ranked)

1. **Retime the lesson text** (size S, coordinator): duration 33.0, beats at 0/8.2/17.6/22.1.
2. **Raise the intro cues** (1.9–4.2 s, size S; comparison review): they are quiet relative to later cues.
3. **Enlarge the `replication` route label** (whole video, size S; comparison review): it is among the smallest text at 350 px.
4. **Glow the primary's rows as the change chip departs** (17.65 s, size S): shows that the primary's change is what travels, and that the primary keeps its data.
5. **Listen to the replication send** (17.65 s, size S): it is the faintest onset in the spectrogram.
6. **Dim the application after its write** (12 s onward, size S): one place to look during replication.
7. **Note in the write-up** that PostgreSQL separates receiving from applying (lesson 04), so this cut's single `applying` step is a simplification.

## Notes for the skill (not acted on)

- The local `panel` node and the chip `size` option are general, and `meta.titleSize` helps long titles.
- Tie state indicators, such as the agreement mark here, to the event that changes the underlying data rather than to a separate fixed time.
