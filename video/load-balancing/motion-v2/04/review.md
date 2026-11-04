# Lesson 04 review (render 2, final)

**Bound to:** `video.mp4` SHA-256 `e8c34f550cf9b4aa1d9bb6cea673bc118b9f7383830e068737dbc0d64cd5012f` (47.65 s). Any re-encode voids this review.

## Evidence scope

- **Analysed:** 41 frames decoded from this exact file at 0.5, 1.3, 2.6, 3.6, 5.2, 6.1, 6.6, 7.1, 7.8, 9.5, 11.2, 12.6, 13.1, 13.9, 16.0, 19.2, 20.0, 21.0, 22.6, 23.5, 25.6, 26.5, 27.0, 27.6, 28.3, 28.9, 30.2, 31.5, 32.4, 33.15, 33.4, 33.7, 34.2, 36.5, 39.6, 40.4, 41.4, 42.0, 44.0, 46.6 and 47.6 s (`scratch/enc1/`). That covers every dispatch, assignment, `next` change, start, finish, the equal-count comparison, the wait, the wait-to-run move, and the fade. I viewed the 350 px tile sheet (`scratch/enc1-350-sheet.png`, shrunk further for display), four encoded frames at true native 350 px (`scratch/native350-enc.png`: 7.8, 21.0, 30.2, 42.0), and a full-resolution seven-frame crop of the move (`scratch/move-check-enc.png`, 33.20–34.10 s). I also checked the contact sheet, spectrogram, `volumedetect` and `astats` levels, a full decode, and the MP4 box order.
- **Heard:** nothing. The audio was **not listened to**. Sound claims come from the cue list, the spectrogram and level measurements.
- **Not covered:** browser or site checks, and comparison against other cuts.

## Fixed before handover

- **33.25–34.05 s, wait-to-run move:** the moving `req 3` passed over the `wait` label, which sat between the two slots on the left. I moved the `run` and `wait` labels to the right edge of their slots, so the left-side path is clear.
- **33.25–33.8 s, same move:** the wait slot's `—` reappeared under `req 3` before it had moved away. The `—` now fades in 0.55 s later. The encoded crop shows one identity and no text overlap.
- **Whole video:** the stage sat high, with about 360 px empty below the columns. I lowered everything 50 px.

Clean on the final encode. The smallest stage text is the 40 px `run`, `wait` and app-request labels, about 13 px at 350 px, and they read in the native frames. All other stage text is 42–60 px. Nothing enters the title band, and no ring lingers. `next` changes only on assignment. `assigned` reads 1 and 1 from 13.65 to 28.7 s, while A's bar is non-empty and B's is empty from 19.05 s. req 3 stays in A's wait slot from 28.7 to 33.25 s while B shows `idle`, and it starts only after A's bar reaches zero. Every visible event has a cue (79 cues including 37 work ticks; each event is visible on the spectrogram). Peak is −5.1 dBFS. Brief colour tweens (about 0.2–0.3 s) appear at state changes, for example `idle` drawn in fading teal at 33.2 s.

## Suggested improvements (ranked by teaching impact)

1. **Lengthen the wait** (28.7–33.25 s, S). Saw: req 3 waits about 4.5 s, and the bar is nearly empty when it arrives. Change: give the report about 30 s of work, or send req 3 about 2 s earlier, so the wait is about 7 s with a visible bar. Effect: "waiting despite an idle server" becomes the longest, clearest state.
2. **Link B's idle pulse to req 3's arrival** (28.7–30.1 s, S). Saw: B's pulse comes 1.4 s after req 3 lands. Change: pulse B's empty slot and A's waiting req 3 alternately, twice. Effect: one glance holds the contrast.
3. **Thin the A work ticks** (8.7–31.9 s, S). Saw: 30 E4 ticks over 23 s, never heard. Change: tick every 1.2 s, or let the gain fade during holds. Effect: less risk of fatigue. Listen first.
4. **Show the count rule once** (13.65 s, S). Saw: `assigned` increments on arrival, but nothing shows that finishing doesn't decrement it. Change: pulse `assigned 1` on B when it goes idle at 19.95 s, unchanged. Effect: reinforces that the count is history.
5. **Shorten the final hold** (41.75–46.25 s, S). Saw: 4.5 s still. Change: 3.5 s if slack.
6. **Enlarge the small labels** (S). Saw: `run`, `wait` and the app request pill are 40 px. Change: 44 px if a phone review finds them tight.

## Notes for the skill (not acted on)

- A moving label needs a clear path. Placing slot captions on the far side of the motion avoids overlap without hiding them.
