# A replica can lag — review (render 2)

Reviewed from the encoded `video.mp4` (sha256 `4230b9ad141a6e28681db1b83b8689a05cae0f17a5dbafe8ba1e8ee30c70da6c`): 40 seek-extracted frames at 1080 and 350 px wide (`scratch/enc2/`, `scratch/enc2-350-sheet.png`), exact frame-number extraction of frames 210, 489 and 1137 (`scratch/enc2/alt/`) to cross-check seek results, the 1 fps contact sheet and the spectrogram. Audio was analysed, not listened to.

## Fixed before handover

- 16.3 s and 7.0 s (render 1): the arrival ripple (radius 60) at the replica and primary lifelines overlapped the right/left edge of the resting `read R42` and `save v8` chips. Ripples now run radius 8→26 and chips rest 30 px from the receiving lifeline; the 16.3 s and 7.0 s frames from render 2 at 1080 and 350 px are clear.
- Pre-encode stills: the `save v8` chip sat 17 px under the cards and 11 px above its arrow, and `ready` nearly touched the v8 outline. Message rows moved down 36 px, chip lift raised to 56 px, card status line raised 6 px.
- Pre-encode stills: request chips kept a bright white border after arrival, competing with the green replies. Requests now settle to grey once delivered.

Defect pass on render 2 is clean. Every label is readable at 350 px. There is no overlap or title-band intrusion and no lingering state. Each visible event has its cue, and each cue has a visible event. Peak is −6.6 dBFS. The only still stretches are the deliberate holds after the save (10.9–14.6), after the read (18.4–23.0), and the final evidence frame (28.2–38.0). The opening frame (t = 0) is an empty stage before the fade-in; the video is a finite piece, so first/last frame matching does not apply.

## Suggested teaching refinements (optional, ranked)

1. **Make the replica's lag visible on the link** (10.9 s, S). Saw: the `async copy` link sits still and far below the action, so "behind" relies on the label and colour. Change: when `behind` appears, briefly draw a dim pending dot on the link near the primary end that never reaches the replica. Effect: shows v8 has not arrived yet without depicting catch-up. Risk: it could suggest replication is stalled, so it needs a timing judgement.
2. **Tie `behind` to the save rows** (10.9 s, S). Saw: `behind` floats on the replica lifeline beside the save/ack rows; at 350 px the connection is implied. Change: a faint amber tick from the `ok · v8` row level to the replica lifeline when `behind` appears. Effect: reads as "at the moment of the ack, the replica is behind".
3. **Shorten the final hold slightly** (28.2–38.0 s, S). Saw: 9.8 s of silent stillness. Change: 7–8 s. Effect: keeps the argument on screen while reducing slack; total ≈ 36 s.
4. **Sharpen the read lookup** (16.2 s, S). Saw: the replica's v7 outline and glow are brief, and at 350 px the lookup is a small flicker. Change: hold the white v7 outline until the reply chip departs. Effect: the reply visibly comes from that stored row.
5. **Sound of the "one write" beat** (28.0 s, S). Saw: a soft `arrive` C5 on the counter outline; it is the same family as earlier arrivals. Change: a quieter `store` C5 echo to recall the original save. Effect: links "still one write" by ear to the commit at 7.6 s.
6. **Reduce the opening introduction** (1.6–3.4 s, S). Saw: three sequential pulses before anything happens. Change: pulse primary and replica together with their two notes 0.1 s apart, then start the write at ≈4.5 s. Effect: tighter start; both copies read as "same record" at once.

## Notes for the skill (not acted on)

- The engine's chip packet text is fixed at 26 px (≈8 px at 350 wide); a size option and persistent movable chips (`tag`) were needed here and in lesson 01.
- A self-drawing arrow and a plated label are general sequence-diagram needs.
- `render.mjs` lists Mac and `/usr/bin` Chrome paths only; on this VM `CHROME_PATH=/snap/bin/chromium` plus sandbox escalation is required.

