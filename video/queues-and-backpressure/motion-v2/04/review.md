# A full queue pushes back review (render 3)

Reviewed from encoded frames of `video.mp4` (sha256 `c4698882…82c80`) at 1080 and 350 px, the contact sheet, the spectrogram, and levels. Audio was analysed, not listened to. These checks cover this cut's scope; passing them does not establish universal correctness.

## Fixed before handover

- 8.0–8.8 s, render 1: the highlight outline on `await put(E)` spanned the producer's full width and passed behind the E and F chips. The line now brightens without an outline.
- Whole video, render 1: place numbers `1 2 3` sat on the place borders, and C crossed number 2 while shifting forward. The numbers are removed; the three outlines and the readout show the bound, and B's drop into the worker shows which place is the front.
- 21.0 s, render 2: the `poof` cue for A leaving the worker was a broadband noise burst, the most prominent event in the spectrogram, and it suggested a discarded job. It is now a soft G4 worker note.
- Inspection tooling: the 31-frame 350 px set overflowed a 10×3 tile, so the sheet step failed and later checks did not run. The tile is now 8×4, and all checks were rerun on the final encode.

Defect pass on render 3: text is at least 36 px at 1080 wide; the 350 px frames at 22.2, 25.6, and 37.0 s read cleanly. The 31 boundary and beat frames show no overlaps, and E stays in the producer until 28.4 s. The queue never holds four jobs, and A's completion and B's dequeue are separate events with `3 / 3 full` held between them. `accepted` appears only after E lands, and `complete` never shows a check. Every visible event has a cue. Peak is -7.0 dBFS with no clipping. The full decode reports 0 errors, and moov comes before mdat. The holds at 5–8, 12–20, 21.5–23, 26.7–28.4, and 34–40 are deliberate, and the ending is finite.

## Suggested improvements

1. **Mark the front place** (whole video, size S). Saw: without numbers, which place is the front is shown only when B drops. Change: a dim `front` tag under place 1, outside the jobs' path (left of the take link). Effect: FIFO order is readable before the first dequeue.
2. **The worker panel has unused depth** (whole video, size S). Saw: about 80 px of empty space under the worker's bar. Change: reduce the worker card height and give the producer row more space. Effect: tighter layout and a larger producer call.
3. **The waiting pulse is subtle at 350 px** (9–28 s, size S). Saw: `waiting` alternates between amber and white, which reads as a colour flicker more than "still waiting". Change: pulse the amber dashed link with marching dots instead, keeping the word steady. Effect: the held call reads as an ongoing wait.
4. **The release could link cause and effect** (23.45–28.4 s, size M). Saw: the readout's `2 / 3` and the producer's resumed call are about 5 s apart in different panels. Change: as the tail place opens, briefly light the producer→queue link before E moves. Effect: the viewer sees the free place reaching back upstream.
5. **The final hold is long** (34–40 s, size S). Saw: about 6 s of a static final state. Change: trim it to about 4.5 s if reviewers find it slack. Effect: tighter ending.
6. **The subtitle splits the title** (whole video, size S). Saw: `A full queue` / `PUSHES BACK · QUEUES 4` reads as one title across two styles. Change: a two-line title, if the shared title style allows it. Effect: the lesson name reads as one phrase.

## Notes for the skill (optional)

- The inspection helper should choose its tile layout from the frame count; a fixed tile silently aborts the later checks under `set -e`.
