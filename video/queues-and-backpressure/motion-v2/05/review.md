# Choose an overload policy review (render 1)

Reviewed from encoded frames of `video.mp4` (sha256 `c36a538b…e9efa`) at 1080 and 350 px, the contact sheet, the spectrogram, and levels. Audio was analysed, not listened to. These checks cover this cut's scope; passing them does not establish universal correctness.

## Fixed before handover

- None needed. Pre-render stills at 0.5–37 s, a full-size and 350 px check of the final state, and the encoded inspection found no objective fault, so the first full render is the candidate. Earlier lessons' clearance rules were applied while authoring: moving markers avoid text, and status lives outside the paths.

Defect pass on render 1: text is at least 36 px at 1080 wide; the 350 px frames at 17.4 and 33 s read cleanly. The 32 boundary and beat frames show no overlaps, and the call dot stops at the queue's edge. The places hold C, D, E in every frame, and the readout stays `3 / 3 full`. The rejection returns before any F log row, and `reported` follows the log rows. No green cue appears for F, and there is no crash sound or shake. Every visible event has a cue. Peak is -5.5 dBFS (the rejection result) with no clipping. The full decode reports 0 errors, and moov comes before mdat. The holds at 7–9, 13–16, 17.5–21, 23–25, and 30–36 are deliberate, and the ending is finite.

## Suggested improvements

1. **The call and return are small** (9.8–10.6 and 16.0–16.9 s, size M). Saw: the 50 px gap between panels makes both dots short, small movements, easy to miss at 350 px. Change: widen the gap (narrow the producer panel) and use labelled chips (`submit F` out, `rejected` back) instead of dots, keeping them clear of text. Effect: the call/response reads as the central event.
2. **The producer panel is half empty** (whole video, size S). Saw: about 150 px of unused space under the result. Change: shorten the producer panel and give the log more room. Effect: tighter layout; the log rows can be larger.
3. **The alternatives flash briefly** (29.0–29.8 s, size S). Saw: `wait` and `drop` brighten for 0.4 s each and may read as a glitch. Change: brighten them together for about 1 s, then return to dim. Effect: reads as "other options exist" without suggesting they ran.
4. **The miss cue sits under the return dot** (16.0 s, size S). Saw: the falling buzz and the dot start together, before the result exists. Change: start the miss at the queue as the places' check ends (about 15.6 s), then the dot. Effect: "the queue decides, then reports" becomes audible as two steps.
5. **The final hold is long** (30–36 s, size S). Saw: about 6 s static. Change: trim it to about 4.5 s if reviewers find it slack. Effect: tighter ending.
6. **Connect the log to the producer** (21.0–22.5 s, size S). Saw: log rows appear in a separate card with no motion from the producer. Change: a short dot from the producer's result down to the new log row. Effect: shows the producer writing its own outcome.

## Notes for the skill (optional)

- A labelled call/return pair (request chip out, result chip back) would suit any lesson where a returned value is the point (errors, timeouts, rate-limit responses).
