# Lesson 03 — Check the revision you need — review (render 2)

Reviewed from the encoded `video.mp4` (sha256 9108c253…f2479): frames at every beat and transition boundary at 1080 and at native 350 px width, contact sheet, spectrogram and level statistics. Audio was analysed only, not heard. Scores and a comparison against other cuts are out of scope for this file.

## Fixed objective faults

1. **Guide line through the moving digit** (render 1, sha256 27abedc6…02c3; 9.85 s and 23.3 s). The dotted binding guide ran through the travelling `7` and `8`. Fix: the cut-local `mtext` node gained a `plate` option, so the digit rides on a background patch. Confirmed in render 2 frames at 9.85 s and 23.3 s and with exact-frame extraction (frame 296).
2. **Visible event without sound** (render 1; 3.7 s and 17.2 s). The query text appeared half a second after the tab selection and its sound. Fix: `read R42` now appears at 3.3 s and `fresh read R42` at 16.8 s, inside the selection event and its cue.
3. **Long silent final freeze** (render 1; 32.2–36.5 s, about 4.3 s still). Fix: duration 35.5 s, leaving about 3.3 s on the resolved frame.

Defect pass on render 2: no clipped or overlapping text, nothing in the title band, no lingering state (seen 7 and ≠ clear before the primary query; the replica chip stays dimmed on purpose), a cue on each meaningful event, peak −10.1 dBFS, no unplanned stillness over 3 s outside the holds that follow each beat.

## Optional refinements (ranked)

1. **Show which revision the check needs earlier** (0–1.4 s, S). The need well draws at 1.0 s with no hint of where 8 comes from. A brief `saved` tag under the need well (one word) would tie it to the committed change without a caption. Effect: separates "required revision" from "first number shown".
2. **Make the replica's insufficiency audible as a near miss** (12.0 s, S). In the spectrogram the E5 + F5 rub is visibly fainter than the deliver cues. Raise its gain slightly so the unresolved moment stands out, still without an error sound.
3. **Lower stage is empty** (whole video, M). Content ends near y = 1600; the last 300 px stay black. Moving the drawer down about 80 px would balance the frame and lengthen the reply rise, making the travel from source to result clearer.
4. **Dimmed replica query text** (14.8 s onward, S). At 350 px `read R42` at 45% opacity is faint. 55% would keep it secondary but readable in the final frame.
5. **Primary selection reads like a UI tab, not a different server** (16.6 s, M). Viewers unfamiliar with replica routing may read the tabs as views. A small dotted connector from each tab to the divider would hint that each tab is a separate endpoint.
6. **Recap pulse timing** (30.0–31.6 s, S). The two recap pulses are 1.6 s apart; the second could start 0.3 s earlier so the "both ok → only 8 decided" contrast reads as one thought.
7. **Teal chip border on match** (26.8 s, S). Tinting only the primary chip's `rev 8` teal at the match moment would link the result row to the equality; keep `ok` white.

## Accuracy notes

Revisions 7 and 8 are illustrative application revisions for one record, not WAL positions. `fresh read` stands for a new query started on the primary after commit in a one-writer example; the video does not show or claim that every primary read is current, and the stale replica result is never presented as a failed write (both replies read `ok` with identical delivery sounds). No catch-up, received/applied distinction or failover appears.
