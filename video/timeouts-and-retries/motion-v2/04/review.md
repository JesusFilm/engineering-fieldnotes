# Back off before retrying — review (render 5, final)

This is a self-review from encoded frames and audio analysis. No independent comparative review has been done; a recommendation needs one. Audio was analysed (spectrogram, volumedetect, astats, windowed peaks) but has not been listened to.

## Fixed before handover

- Error "×" ripple at 3.5 s and later: it was anchored at the custom panel's centre, over the "1/2" caption. Gave the panel anchor size `half` so it lands on the bottom edge, and shrank it so it clears the "2/2" caption (frame 686).
- Labels at 350 px width: raised the top chips to 38 px and "time →" to 40 px.
- "2/2 · stop" crowded the panel edges: shortened to "2/2 stop" and widened the panels to 272 px.
- The moving "now" line drew over the wait values: it is now drawn behind the intervals.
- Ripples on the "Max 2 attempts" chip and the stop panels reached into the title and captions: the chip ripple is smaller, and the panels pulse instead.
- Mix: the "still unavailable" tone (28.8 s) was nearly as heavy as the shared failure, and the three simultaneous error returns (3.5 s) peaked at −5.7 dBFS against −5.4 for the failure. Both lowered. Final windowed peaks: failure −5.4, first returns −11.0, hypothetical chord −12.4, later failed receipts −13 to −15, "still unavailable" −16.7 dBFS.

## Checked and not defects

- Frame 542 (18.07 s): the A retry mark looks faint under the cursor. Frames 545 and 552 show it solid; this is the 0.12 s pop-in.
- The cursor crossing a value or a mark during 15.4–22.0 s is transient motion, behind the interval text.
- Frame 0 shows the title only (0.45 s stage fade-in). The ending is a fade, as intended for a finite film.

## Suggested improvements

1. **Keep the hypothetical column for the final comparison** (24.4 s, size M). Saw: the "Second burst" marks are dismissed at 8.4 s, so the closing comparison is first attempts versus retries, not immediate retries versus jittered retries. Change: bring the dashed column back at low alpha during "Arrivals spread out", still labelled "Hypothetical". Effect: the contrast the lesson exists for sits in one frame. Risk: more visual load, and the hypothetical could be counted as real.
2. **Start on a visible stage** (0–0.45 s, size S). Saw: frame 0 has the title only. Change: drop the fade-in so the poster-like first frame shows the actors. Effect: no empty first frame in thumbnails or players that show frame 0.
3. **Mark the wait origin on the trace** (9.6 s, size S). Saw: the intervals start slightly right of the first-attempt column without saying why. Change: add a small tick at the interval start when the first 503 returns. Effect: makes "wait begins after the failure" explicit.
4. **Shorten the equal-wait beat** (9.2–12.2 s, size S). Saw: about 3 s goes to a plan that is replaced. Change: trim to about 2.2 s. Effect: tighter pacing; the "Still aligned" point remains.
5. **Give the "Still aligned" chord its own timbre** (10.6 s, size S). Saw: it reuses the soft hypothetical chord. Change: a slightly brighter or shorter variant. Effect: separates "equal waits would collide" from "no wait would collide".
6. **Thin the clock ticks** (15.4–22 s, size S). Saw (spectrogram): only a few ticks survive the collision filter, so the rhythm is irregular. Change: tick only in the gaps between retries, at a fixed half-second grid, or drop them. Effect: the waiting sounds steady and does not compete with the sends.
7. **Separate eligibility from the general rule** (whole film, size S). Saw: "Read · retry eligible" sits beside "Max 2 attempts" as a persistent chip. Change: consider "This read: retry eligible". Effect: less chance of reading it as "all failures are retryable".

## Notes for the skill (not acted on)

- Custom node types need anchor sizes; `s.pt` falls back to `node.half` in this cut-local engine.
- Snap Chromium needed a scoped sandbox escalation to launch on this VM.
