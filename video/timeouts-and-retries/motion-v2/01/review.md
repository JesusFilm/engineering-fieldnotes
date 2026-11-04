# Wait for a response review (render 3, final encode)

This is the author's defect and improvement pass on the encoded file. It is not a comparative review and gives no scores. A recommendation needs a fresh comparative review against the other cuts of this lesson.

Audio was analysed (spectrogram, silence-detected onsets, peak and RMS levels) and has not been heard. No listening judgement is recorded.

## Fixed before handover

- Request chip at 3.1 s and response chip at 10.97 s (render 1): the chip came within about 15 px of the caller panel's bottom edge as it faded in or out. The service panel moved down 50 px, and chips now start and stop 56 px inside each lane. The gap is now more than 36 px at both ends.
- Marker "4 s" at 12.6 s (render 1): the monospace face spaced it loosely. It now uses the proportional face.
- Lanes (render 1) moved 10 px outward so passing chips clear the "Network" label by more than 36 px.
- Slot at 9.4–9.5 s (render 2): it read "Idle" while the busy sweep was still fading out. The word now switches when the sweep reaches zero (9.7 s).
- Arrival frame at 11.0 s (render 2): the result text had turned teal while the field border and rail were still mid-tween from amber. Arrival now switches text, border, icon and rail colour together. The timeout at 30.0 s gets the same instant switch.

Checked clean in render 3:

- Every beat and boundary frame at full size and at 350 px.
- No stale state across the 16.9 s reset.
- "#418 passed" never appears before the response arrives.
- No red or failure mark anywhere.
- The service stays "Processing" after the timeout.
- First and last frames show the same empty stage. They differ only by encoder noise on the title glyphs.

## Suggested improvements

1. **Give the response a destination inside the caller** (11.0 s, size S). Saw: the chip fades at the lane top, and the result field changes a moment later and 300 px away. Change: let the chip travel the last stretch into the result field, or draw a short teal tether from the port to the field on arrival. Effect: makes it clearer that the response is the evidence that fills the result.
2. **Show "used" more concretely** (12.6–16 s, size M). Saw: "#418 passed" in the field is the only sign the caller can act. Change: add a small caller step such as a "Release check" row that ticks once the status lands. Effect: separates receiving a status from using it; the cost is one more label.
3. **Echo the case 1 arrival point during case 2** (26.0 s, size S). Saw: the viewer has to remember that case 1 ended at the fourth tick. Change: flash a faint ghost "4 s" marker as the slow fill passes 4/5, with no sound. Effect: sharpens the contrast without implying continuity between the requests.
4. **Shorten the opening reveal** (0–3 s, size S). Saw: the stage takes 1.8 s to assemble and then holds 1.2 s before anything happens. Change: start the send at 2.4 s. Effect: the first state change arrives sooner on a feed.
5. **Make processing length legible without a clock** (21.6–30 s, size M). Saw: case 2's slow processing looks like case 1's except that it lasts longer. Change: slow the busy sweep's period during case 2. Effect: hints at a slow service early, but risks reading as a progress cue.
6. **Reconsider the "Too slow" tag before the request is sent** (17.2 s, size S). Saw: the tag announces the outcome before the wait starts. Change: show a neutral tag ("Slow service") or reveal "Too slow" at the timeout. Effect: lets the rail make the point.
7. **Trim the end** (34–39 s, size S). Saw: 3 s hold, a 1 s fade, then 1 s of black. Change: cut the black tail to 0.5 s if the player loops. Effect: a tighter loop with nothing lost.

## Notes for the skill

- The engine had no supported way to add node types from a scene. This cut's own engine copy now exposes `FlowVideo.NODES` and `FlowVideo.util`, falls back to `n.half` for anchor sizes, and adds an ease named `cruise`. The shared skill is unchanged.
- The chip and badge text sizes in the engine (26–30 px) fall to about 9 px at a 350 px phone width. This cut draws its own 44–52 px chips.
- Input seeking (`-ss` before `-i`) returned frame N−1 for a target in the middle of frame N on this file. Selecting by frame index (`select=eq(n,N)` and `trim=start_frame`) agreed exactly.
