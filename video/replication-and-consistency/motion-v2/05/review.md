# Lesson 05 — Failover can lose data · review (render 3, final)

This review used the encoded `video.mp4` (sha256 `db2032dc…48cd`): 46 time‑seek frames at 1080 px with 350 px Lanczos copies, individual full‑size and native‑350 views of the beat and boundary frames, the contact sheet and a spectrogram. Audio was analysed but **not heard**. This is the author’s own defect and improvement pass. It is not the fresh comparative review that the editorial workflow requires before a recommendation.

## Fixed before handover

- **Promote chip clipped at the right edge** (render 1 stills, about 22.5 s). The 34 px `promote` chip rode a gutter at x 1010 and ran past x 1080. It is now a dot on the gutter at x 1000, and the command text stays in the terminal.
- **Shipped links too faint at 350 px** (render 2, 0–15 s). The dark teal v6/v7 links nearly vanished on a phone. They are now `#3A9E7A`.
- **Promotion ripple covered the standby’s v6 cell** (render 2, 22.59 s). Removed. The header pulse and in‑place label change carry the role change.
- **Absence ripple crossed the v7 cell and the `v8 absent` label** (render 2, 30.82 s). It is replaced by a red glow on the empty cell itself.
- **Crash peak too close to the limit** (render 2: −0.8 dBFS). Crash gain went from 0.95 to 0.75; the peak is now −1.6 dBFS and the crash is still the loudest event.
- **Mismatch cue nearly inaudible** (render 2: −27.5 dB window). `miss` gain went from 0.5 to 1.0; the window peak is now −21.4 dB.
- **Old primary’s last‑known values too dim** (render 1). Dimmed alpha went from 0.5 to 0.62, so v8 stays readable at 350 px.
- **Failure hold trimmed** (render 1). The silent tableau after the crash went from 5.2 s to 4.6 s of playback.
- **Verification extraction** (not a video defect). A seek at 35.97 s fell past the last frame and stopped the script; it now uses 35.95. Time seeks taken exactly at frame timestamps sometimes returned the next frame. Seeking 0.4 frame early matched all 19 frame‑index pairs exactly (infinite PSNR), so there is no display anomaly.

Defect pass on render 3: clean. There are no label overlaps or clipping, nothing in the title band, and no stale state. Every visible event has its sound, nothing changes for more than 3 s outside deliberate holds, and the peak is −1.6 dBFS. The ending is finite, so the first and last frames are not expected to match.

## Suggested improvements (optional, ranked)

1. **Make the open window felt during its hold** (11.2–15.6 s, S). Saw: one pulse at 13.3 s inside a 4.5 s hold. Change: a slow amber breathing on the `unshipped` link and empty cell until the crash, frozen at 15.65 s. Effect: the danger visibly exists before the failure.
2. **Echo the ack and read pitches at the mismatch** (30.82 s, S). Saw: `miss` E4 marks the mismatch but is quieter than the deliveries. Change: a soft falling A5 → C5 pair (the ack pitch, then the read pitch) alongside or instead of `miss`. Effect: makes the contradiction audible in the actors’ own voices.
3. **Shorten the crash tableau** (16.5–20.2 s, S). Saw: 3.7 s of complete stillness and silence. Change: cut about 0.7 s. Effect: tighter pacing without losing the three‑way comparison.
4. **Sound the caret when it starts moving** (23.88 s, S). Saw: the `ack` cue lands at 24.71 s, at the end of the slide. Change: add a quiet `send` at the start, or move the cue there. Effect: the routing change reads as one action.
5. **Hold the terminal back until it is used** (0–20 s, S). Saw: an idle `$` box for 20 s. Change: fade it in at 20.2 s. Effect: less early density and a clearer cue that an operator acts.
6. **Bring ≠ closer to the values** (30.82–36 s, M). Saw: the ≠ sits at x 880, about 200 px right of the revision values. Change: a bracket joining the ends of the ack and read lines, with ≠ on it. Effect: a more direct pairing of v8 and v7.
7. **Drop the v6 row** (whole clip, M). Saw: v6 only says “history already shipped.” Change: keep two rows and enlarge the cells and type. Effect: bigger phone text, at the cost of shipped history.

## Notes for the skill (not acted on)

- Built‑in packet chips still use fixed 26 px text. This cut moves `tag` nodes instead.
- ffmpeg input seeks return the first frame at or after the target. Verification scripts should seek slightly before `n/fps` when they compare against frame‑index extraction.
