# Finish a job review (render 2)

Reviewed from encoded frames of `video.mp4` (sha256 `6a59cef1…62fa7`) at 1080 and 350 px, the contact sheet, the spectrogram, and levels. Audio was analysed, not listened to. These checks cover this cut's scope; passing them does not establish universal correctness.

## Fixed before handover

- 8.0–9.2 and 27.4–28.6 s, render 1: the moving `job A` token passed through the `take` and `finish` labels. The labels now sit 72 px above the arrows, clear of the token and the circle edges.
- 25.4–26.5 s, render 1: the completion-report dot ended on the record's `not yet` text. It now ends at the record card's top border.
- 0–21.6 s, render 1: the blocked `3 mark complete` row was at 45% opacity, faint at 350 px. It is now at 60%, still clearly dimmer than the active steps.

Defect pass on render 2: text is at least 36 px at 1080 wide; the 350 px frames at 14.7 and 30.0 s read cleanly. The 28 boundary and beat frames show no overlaps, and the token is inside exactly one state except during its two transitions. Order holds: `ok` → `saved` → step 3 available → report → record check → `completed`, and the record never shows a check before 26.5 s. Every visible event has a cue. Peak is -5.9 dBFS with no clipping. The full decode reports 0 errors, and moov comes before mdat. The holds at 5.5–8, 22–24.8, and 29.5–36 are deliberate, and the ending is finite.

## Suggested improvements

1. **Link the record to the state change** (26.5–28.6 s, size S). Saw: the record ticks, then the token moves about 1 s later, in a different screen area. Change: briefly glow the `finish` arrow as the record ticks, then move the token. Effect: shows that recording the completion enables the transition.
2. **The worker and the state diagram are only linked by colour** (9.2 s, size M). Saw: `running · at worker` and the Worker panel turn amber together, with no spatial link. Change: run a faint dotted connector from the `running` circle to the Worker panel's title while the job runs. Effect: makes it clear that the worker is where the running state lives.
3. **The work ticks are dense** (11.2–18.8 s, size S). Saw: ten identical ticks. Change: space them to about 1.2 s, or let them fall in gain. Effect: less repetition while the bar fills.
4. **The final hold is long** (29.5–36.0 s, size S). Saw: about 6.5 s of a static final state. Change: trim it to about 4.5 s if reviewers find it slack. Effect: tighter ending.
5. **The `waiting` circle stays outlined after the job leaves** (9.2 s onward, size S). Saw: the empty `waiting` keeps a mid-grey outline, brighter than `completed`'s dim one. Change: dim it to match the other unoccupied states. Effect: the occupied state stands out more.
6. **The replay marker fades quietly** (9.2 s, size S). Saw: `replay: job A from waiting` fades with no cue and is easy to miss. Change: fade it at 8.0 with the take, under the same send cue. Effect: one event instead of two.

## Notes for the skill (optional)

- A state-diagram primitive (circular `state` plus a transition `arrow` with a dashed/solid style) would suit other lifecycles: leader election, circuit breakers, and job states.
