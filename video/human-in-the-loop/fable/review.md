# Human-in-the-loop (fable) review (render 3)

Reviewer: anthropic/claude-fable-5-1 (the author), from encoded frames at full size and 350px, the contact sheet, the spectrogram, decoded audio onsets and ffprobe. No fresh-eyes reviewer was available in this task (no subagents).

## Fixed before handover
- 9.4s: the duplicate's red × mark landed on the border between the two #ops rows, over the text. Moved the ripple and mark to the empty right end of the duplicate row.
- 9.6s / 24.5s: the count badge read as a bare `×2`, too small to carry the outcome at 350px. Changed to `sent ×2` (red) and `sent ×1` (green).
- Render 1–2, frame 905: the decoded last frame differed from the first (PSNR 54 dB, then title-only differences of up to 72 levels) although the source frames are byte-identical, because x264's macroblock tree quantises the first frame finer than a trailing keyframe. The local renderer now encodes all frames but the last and appends the first frame's intra packet as the final frame with a stream copy, guarded by a byte comparison of the two source PNGs. `verify.sh` confirms frames 0 and 905 decode to identical PNGs. Forcing a keyframe with mb-tree off and x264 zones was tried first; it still differed and pushed the file to 2.2 MB, so it was reverted.

## Verification (render 3, published file)
- 1080×1920, 30 fps, H.264 yuv420p, AAC 44.1 kHz stereo, 30.20 s, 906 frames, 1,587,632 bytes; atom order ftyp moov free mdat (faststart).
- Full decode with `-xerror`: ok. Frames 0 and 905: identical PNGs.
- Audio: peak −2.31 dBFS (left), −4.93 dBFS (right); mean −31.0 dB. The loudest sample is at 9.40 s, the duplicate. 45 detected onsets match the 49 scheduled cues to within 10 ms (the four `work` ticks that merge with the spinner are counted as a group); every visible state change has a cue and no cue lacks a visible event.
- Audio was analysed (volumedetect, astats, spectrogram, onset detection); it was not listened to.
- Stills at every beat inspected at full size and at 350px; no text below 26 px, no overlap, no stale state after the 15.0 s reset.

## Suggested improvements
1. **Second rewind is quieter visually** (21.9 s, size S). Saw: with `approve?` already in row 1, the cursor's bounce from above is the only motion that says "restart". Change: dim the whole node for 0.2 s before the bounce, as in the first rewind, and lengthen the bounce to 0.5 s. Effect: the viewer sees the same restart both times and attributes the different outcome to the row order alone.
2. **Reviewer wait could show time** (4.5–6.3 s and 19.0–20.5 s, size S). Saw: a still hold while the human decides. Change: a small `clock` beside the Reviewer whose hands spin during the hold, with two quiet `clock` ticks. Effect: makes the pause itself legible as waiting on a person rather than a stall.
3. **Idempotent alternative is unseen** (15.9 s, size M). Saw: the cut shows only one of the three documented fixes (move the side effect after the interrupt). Change: a second resolution run where `notify #ops` stays first but its second landing merges into the existing row (upsert) with a `hit` rather than a red row. Effect: teaches that idempotency is the equivalent fix when reordering is impossible, at the cost of about 8 s.
4. **Checkpoint's role on re-run** (10.4 s and 22.4 s, size S). Saw: the stored answer is signalled by a pulse on the Checkpoint and the approve row turning green together. Change: a tiny `yes` dot packet from Checkpoint to the deploy node at that moment. Effect: shows that the answer is read back from the checkpoint rather than remembered by the step.
5. **Duplicate consequence** (9.4 s, size S). Saw: the duplicate is a second row in a channel, which is low stakes. Change: label the store `tickets` and the rows `DEPLOY-41` / `DEPLOY-42` so the duplicate is a second ticket. Effect: closer to the primary source's "duplicate records" warning; trades the familiar chat-notice example for a heavier one.
6. **Ending hold** (27.1–29.1 s, size S). Saw: two seconds on the resolved state. Change: hold 2.5 s. Effect: slightly more time to read `sent ×1` against `schema v8` before the fade.

## Notes for the skill (optional)
- `store` gained `cursor`, `cursorColor`, `rowSize` and `row{i}TextColor`; `meta.titleSize` lets a long concept title fit. Both are general and live in this folder's engine copy.
- Loop-exact ends: x264's mb-tree makes a trailing keyframe differ from the opening keyframe even for identical source frames. The engine copy appends the first frame's packet when the end frames are byte-identical; the skill could adopt this.
- Every ffmpeg call in the engine copy passes `-threads 2`.
