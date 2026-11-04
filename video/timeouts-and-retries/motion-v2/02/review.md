# Lesson 02 review (render 3)

This is the skill's self-review of the encoded cut. It is not a comparative review against other cuts, and it contains no scores. Factual and encoded verification lives in `verification.json`. Audio was analysed (spectrogram, volumedetect, decoded peaks per cue window) and was not listened to.

## Fixed before handover

- Lifelines visible from frame 0 before their actors (render 1, frame 0): the wire `alpha` option is not read by the engine, so the scene now sets every lifeline's alpha to 0 at t=0.
- Amber timeout ripple crossed the `attempt timeout` / `stopped waiting` label (render 1, frames 370 and 382): replaced by a glow on the caller bar.
- Ripple under `stopped waiting` crossed its own text and the status field (stills): replaced by a scale pop on the label.
- `lookup done` touched the teal end cap, and the caller lifeline ran through `stopped waiting` (stills): the CI lane moved to x=750, labels sit 48 px right of the bar, and the caller lifeline is split around the label.
- Several labels at 32–38 px were too small at 350 px width (stills): actor, lane and status labels raised to 40 px, field heading 36 px, socket sublabel 34 px.
- CI bar lost its working glow after the 17.33 s flash (render 1): glow restored to the working level after the flash.
- Socket taps (−6.4 / −5.5 dBFS) and CI arrival (−6.9) were nearly as loud as the timeout latch (−4.7) (render 2): lowered to −12.4 / −11.4 / −9.7, leaving the latch clearly loudest. Video stream MD5 is unchanged between renders 2 and 3, so frame inspection of render 2 applies to the final file; re-extracted frames were also byte-identical.

## Accuracy against the lesson limits

- One request leaves the caller. After 3.78 s nothing travels between the lanes (scene cue list and frames 382–1149).
- The timeout line and its sweep stay in the caller lane (x 130–470). The CI bar keeps its colour and growth through 12.22 s (frames 364–370), so the timeout is not drawn as cancellation.
- The CI bar never shrinks or turns red, and completed rack slots stay complete, so nothing is drawn as undone.
- Continuation is qualified as `this run:`, so the cut does not claim that all remote work continues.
- No response reaches the caller, and its field stays `unknown` after `lookup done` (frames 700–1149), so no late result is accepted.
- No build result appears. `lookup done` describes the status lookup, and no failed build is invented.
- `cancel()` and `rollback()` appear only as unconnected dashed sockets labelled `separate code`.
- The cut shows no retry, backoff or deadline.

## Suggested improvements

1. **Shorten the final hold** (30.6–38.3 s, size S). Saw: about 7.7 s with no change after `rollback()` appears. Change: end the authored scene near 33 s so the hold is about 5 s. Effect: keeps the ending deliberate without a slack tail.
2. **Make the time convention land earlier** (0–2.9 s, size S). Saw: the `time` arrow fades in with everything else, and the sloped request chip is the only hint that y means time. Change: run a single dim tick down the arrow as the bars start at 2.9 s. Effect: beginners read "lower = later" before the timeout depends on it.
3. **Separate the field pulse from the remote completion** (26.22 s, size S). Saw: the subtle outline pulse on the unchanged `unknown` field is easy to miss at 350 px. Change: a slightly stronger amber glow, or a brief dim of the CI lane while the field pulses. Effect: sharpens the "remote done, caller still unknown" comparison.
4. **Give the sockets a clearer relation to the timeout** (28.9–30.2 s, size M). Saw: the sockets sit below both lanes, and the rollback socket under the CI lane could read as belonging to CI. Change: centre both sockets as a pair, or align both under the caller's timeout line. Effect: reads as "code the caller would need" rather than a CI feature.
5. **Vary the CI work ticks** (3.8–22.5 s, size S). Saw: 34 identical C3 ticks may wear on repeat viewing. Change: alternate C3 and G3, or drop the gain slightly between step cues. Effect: the same audible contrast with less monotony.
6. **Title band timing** (0–2 s, size S). Saw: the title is the only content for about 0.2 s and stays static throughout. Change: optionally hold the title alone for 0.5 s before the actors fade in. Effect: a slightly calmer start; marginal.

## Notes for the skill (optional)

- `s.wire(..., { alpha })` is ignored; wire alpha only comes from `s.set`. A default from opts would avoid the frame-0 fault.
- The built-in title is fixed at 104 px on one line, so two-line or longer titles need scene-drawn text.

