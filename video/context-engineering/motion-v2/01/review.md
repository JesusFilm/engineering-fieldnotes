# Lesson 01 review (render 3)

The review uses encoded frames, the spectrogram, and levels from `video.mp4` (sha256 in `verification.json`). Audio was analysed only, never listened to.

## Fixed before handover

- **Stale action label (render 1, 8.4–12.6 s and 19.7–22.8 s).** The application header kept showing `sends call 1` and `copies excerpt` after those actions ended. Each action label now clears when its action completes.
- **Chip text crowding (render 1, model panel).** `instructions` nearly touched its chip border. Chips are wider now: 400, 190, and 500 px.
- **Unapplied fix (render 1 → render 2).** A failed edit script left the first fixes out of the source. Its error was hidden by the trimmed render log. I reapplied the fixes as a patch and confirmed them in frames.
- **Placeholder outlines under filled rows (render 2, visible from 31.6 s when the panels dim).** Dashed empty-slot outlines stayed drawn under filled rows and chips. Filling a row now clears its placeholder, and starting call 2 restores the placeholders for the rows it empties.

## Suggested improvements (ranked)

1. **Link the log result to the moment it describes** (32.9 s, size M). Saw: `contract missing` appears in the log while the model panel shows call 2's three items, so the viewer must remember call 1. Change: when the call 1 row is checked, briefly ghost call 1's two received chips in the model panel, then restore call 2's. Effect: the red result points to visible evidence.
2. **Make the call 1 gap louder** (10.3–10.8 s, size S). Saw: the repository excerpt and the model's `no contract` slot light 0.5 s apart with quiet acks, and this is the contrast the lesson depends on. Change: light both together, add a slightly longer hold, and give the empty slot a soft low tone. Effect: "exists but not supplied" lands before call 2 begins.
3. **The new-call clicks are the broadest sound** (12.7 s, size S). Saw: in the spectrogram, the clock pair and poof form the widest noise band, wider than the check results. Change: lower the clock gain or shorten its noise layer. Effect: the miss and chime stay the most noticeable events.
4. **Shorten the final silent hold** (36–42.9 s, size S). Saw: almost 7 s of stillness after the chime. Change: hold about 4.5 s before the fade. Effect: tighter ending at about 42 s, still well paced.
5. **Pace of the copy beat** (15.3–20.2 s, size S). Saw: read, copy, and the dual flash are well separated, but there are three amber events in a row. Change: drop the file name's amber state and keep the excerpt's. Effect: one focal point: the content that gets copied.
6. **Consider showing the task text in the model chips** (24.8 s, size M). Saw: the model chips say `task` while the input says `task: fix invoice timeout`. Change: use `fix invoice timeout` in a full-width chip. Effect: the model shows content throughout, matching the contract chip. Cost: an extra row of height.

## Notes for the skill (not acted on)

- The `sheet` node (header, status, rows with placeholders, highlights, marks, and icons) generalises the harness cut's `card` node and could replace both.
- `render.mjs` output is long progress text; a quiet flag would keep scripted failures visible.
