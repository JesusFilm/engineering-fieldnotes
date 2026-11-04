# Submit a job review (render 3)

Reviewed from encoded frames of `video.mp4` (sha256 `f89b0b0c…3064`) at 1080 and 350 px, the contact sheet, the spectrogram, and levels. Audio was analysed, not listened to. These checks cover this cut's scope; passing them does not establish universal correctness.

## Fixed before handover

- 8.0–9.0 s, render 1: the moving ticket crossed the producer's `submit:` line and then the `Queue` heading. The producer's status moved into its title row and the queue label moved below the lane, so the ticket's path crosses only borders and wires.
- 8.4 s, render 1: the ticket landed on the lane's `empty` label while it was still fading. The fade now starts 0.4 s earlier.
- Whole video, render 1: lane chevrons cut through the `empty` label. The chevrons now leave a gap around the label.
- 1.1, 8.8, 18.5 s, render 2: white arrival rings were drawn over the ticket's text. They became a glow on the ticket itself, plus the existing card glow.

Defect pass on render 3: text is at least 36 px at 1080 wide (about 12 px at 350; the 350 px frames at 11.7, 18.5, and 26.9 s read cleanly), with no clipping or overlap in the 30 boundary and beat frames. Nothing enters the title band, and no stale state was found: `waiting` changes only on entry and exit, and `complete` never shows a check. Every visible event has a cue. Peak is -6.9 dBFS with no clipping. The full decode reports 0 errors, and moov comes before mdat. The holds at 12.5–16, 19–22, and 27.5–33.6 are deliberate lesson holds, and the ending is finite.

## Suggested improvements

1. **Thump may read as failure** (26.8 s, size S). Saw: the `complete: not yet` cue is a low thump, the loudest event, with a small jolt. The job is healthy, though, only unfinished. Change: use a soft, unresolved two-note figure (A5 then a quiet G5) and drop the jolt. Effect: marks "not finished" without suggesting an error.
2. **Producer panel is empty after submission** (7.5–33.6 s, size S). Saw: a large blank producer box. Change: leave a faint dashed outline where the ticket sat, or shrink the box once the job leaves. Effect: emphasises that the producer no longer holds the job and tightens the layout.
3. **Link the two "accepted" views** (25.6 s, size M). Saw: the producer's `accepted` glows and the record's `complete` lights 1.2 s apart, in different parts of the screen. Change: run a faint dotted connector from `submit: accepted` to the record's `complete` row during the contrast. Effect: makes the comparison a single glance.
4. **The final hold is long** (27.5–33.6 s, size S). Saw: about 6 s with only quiet work ticks and a slow bar. Change: trim it to about 4.5 s if reviewers find it slack. Effect: tighter ending; keep at least 4 s so the final state registers.
5. **The take from the queue is quiet next to the arrival** (17.2–18.4 s, size S). Saw: `waiting 0` changes on a send tick only. Change: add a soft E5 "release" note as the ticket leaves the lane. Effect: the queue's role (it empties) gets its own sound, making the take audible as a queue event.
6. **Work ticks could thin out** (24–32 s, size S). Saw: nine identical ticks. Change: space them to about 1.5 s, or let them fade in gain. Effect: less repetition during the hold.

## Notes for the skill (optional)

- A persistent, movable labelled object (the `ticket` node here) would be a useful general primitive. `s.packet` vanishes on arrival, which suits messages but not a job whose location is the lesson.
