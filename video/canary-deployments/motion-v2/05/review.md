# Canary 05 abort + verify review (render 3)

The defect pass below is self-review from the encoded frames and audio analysis. It is not a comparative review against other cuts and does not score this cut. Audio was analysed (spectrogram, peak and RMS levels, cue list), not listened to.

## Fixed before handover

- Router status `observed: new → v1` overflowed the router box in the first stills: widened the router to 460 px and set the status text to 36 px.
- `1 finished on v2` crowded the v2 column: shortened to `1 finished`.
- `v1 ↔ v2 schema` and `unverified` nearly touched in the DB panel: widened the panel to 760 px.
- Render 1, about 12–13 s and throughout: the v2→DB wire ran through the right edge of `v2 failed check`. Moved the wire to x = 985 so it clears the label.
- Render 1, 3.1 s onward: the `FAIL` stamp touched the card border. Reduced the stamp to 50 px text and a 66 px pill.
- Render 1, 29.0 s: the in-flight ripple covered both v2 status lines. Reduced its radius. At frame 876 it still crosses `new: 0` for about 0.6 s, which is a deliberate pointer.
- Render 2, frames 100–105 (3.33–3.50 s): the failure ripple centred on the label obscured `v2 failed check` as it appeared. The ripple now sits on the v2 rack (checked again at frames 100, 102 and 105).

## Encoded checks (render 3)

- Inspected 27 beat and boundary frames individually at native 1080×1920 and at actual 350 px width, plus a 1 fps contact sheet and a 350 px tiled sheet. Six alternate frame indices (100, 102, 105, 375, 381, 1062) cover the transitions that seemed suspect.
- No stale state found. `Healthy?` stays dashed until 26.85 s. No green appears on the DB. v2 stays `failed check` to the end. `new: 0` appears only after the observed routing at 9.8 s. Pending rows show amber dashes, never zeros.
- The smallest essential labels are 36–40 px at source, about 12–13 px at 350 px width. They are readable in the 350 px frames. The footnote (36 px, dim) is the faintest text and is still legible.
- Audio peak is −5.9 dBFS and RMS −32.2 dB. The `fail` stamp at 3.1 s is the loudest 250 ms window. The spectrogram shows a cue at every beat and silence through the final fade.
- Longest stretch without a new event outside deliberate holds: 36.0–39.3 s, the final hold with two quiet v1 requests.

## Suggested improvements

1. **Make the abort decision visibly owned** (7.7 s, S). Saw: the router target changes with no visible trigger, so the link from FAIL to reroute is inferred. Change: draw a short dotted line from the FAIL stamp to the router as the target changes. Effect: makes the cause and effect explicit.
2. **Bring the stopped-but-still-10% beat forward** (5.9–7.4 s, S). Saw: the extra v2 request is easy to read as routine traffic. Change: pulse the 10% segment as that request passes. Effect: makes "stopped expanding ≠ zero traffic" harder to miss.
3. **Shorten the fresh-window fill** (17.6–21.6 s, S). Saw: four seconds of ticks with pending dashes. It is meaningful but slow on a second viewing. Change: 3.2 s with four ticks. Effect: tighter pacing with no lost meaning.
4. **Separate the v2 G4 arrival from the failed-row thump** (2.35/2.5 s, S). Saw: from the cue list, these two G4 events are 150 ms apart. Change: move the 1.25 s v2 request about 0.4 s earlier. Effect: the failure cue stays clean (unverified by ear).
5. **Hold the final split verdict without traffic** (36–39.3 s, S). Saw: the two quiet v1 requests are low value at the end. Change: drop one. Effect: a calmer final read.
6. **Stronger data/service contrast in the ending** (36 s, M). Saw: the dimmed middle stage is still visually busy. Change: dim the racks slightly too, leaving the card, the v2 status lines and the DB at full strength. Effect: the three closing facts read faster.

## Limits

This record contains no comparative review, scores, listening, recommendation, deployment, or site change. A new encode would need renewed review against its own hash.
