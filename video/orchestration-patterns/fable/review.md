# Orchestration (fable) review — render 5

Reviewed from the encoded MP4 only: per-second contact sheet, twelve beat frames at 1080 px and 350 px, a 27-frame boundary sheet, spectrogram, and the decoded audio measurements in `verification.json`. Audio was analysed, not listened to.

## Fixed before handover
- 9.4 s: the conflict × ripple sat on top of the word `amount` in the handler row. Moved the ripple anchor to the right end of the row (clear of text) and reduced its radius so it no longer crosses the "Shared code" label.
- 2.4 s onward: the worker name and its task sublabel nearly touched (the engine only reserved two-line layout when the static sublabel was non-empty). Reserved the layout with a blank sublabel and added a configurable `subGap` in the local engine copy; boxes grew from 124 to 130 px.
- 1.0 s, 11.0 s, 20.5 s: dispatch chips started centred on the orchestrator's bottom edge and overlapped the box outline. Chips now start 30 px below the ports.
- 3.5 s, 22.8 s: write chips stopped exactly on the store's top edge and overlapped the row being written. Lane ends lifted 22 px above the store.
- 21.1 s: Worker B's sublabel `handler total_cents` was wider than its box. The box now shows `handler`; the chip still carries the full payload.
- Loop boundary: the first and last frames differed after encoding although their source stills were identical. The final frame was a P-frame, and once forced to a keyframe CRF rate control still quantised it differently (max luma delta 49). The local renderer now uses constant QP 23 with mb-tree and AQ off so identical stills encode to identical pixels; first/last frames are now byte-equal in yuv420p and rgb24.
- Audio: the decoded AAC peak sat at −0.511 dBFS, too close to the −0.5 limit to trust across decoders. A 0.8 mux gain brings it to −2.50 dBFS.

## Pass 1 defects (final render): none found
- Text: smallest on-screen text is 26 px mono (rows, chips, worker tasks); readable in the 350 px frames.
- Stage: everything sits between y≈500 and y≈1612; nothing in the title band.
- Stale state: the reset at 15.4 s clears rows 0–1, restores the old field names, and swaps the bracket from red to orange; the label is hidden during the fade.
- Sound/visual pairing: every chip, write, jolt, label change, and fade has a cue (101 cues); quietest decoded cue is −39 dBFS RMS against a −93 dBFS hold floor; loudest is the crash at 9.2 s (−14 dBFS RMS).
- Stillness: longest holds are 4.5–6.3 s and 24.0–26.1 s (2.1 s), both deliberate.

## Suggested improvements
1. **Make the cost of the rework visible as time** (11.0–14.2 s, size M). Saw: the redo round trip reads as a conflict fix, but nothing shows it cost more than the sequenced plan. Change: tick a small clock or progress bar during both plans so the hidden-dependency run visibly ends later than the sequenced run. Effect: ties the lesson to the "extra coordination adds cost" claim without words.
2. **Show Worker B reading the stale field** (7.1–8.6 s, size S). Saw: B's `uses amount` chip appears from nowhere; a viewer may not realise B read `field: amount` before A changed it. Change: a small grey dot packet from row 2 up to B at 7.2 s, pitched low. Effect: explains the conflict causally rather than by assertion.
3. **Dim Worker B while it waits** (19.6–20.5 s, size S). Saw: after `docs`, B sits idle in neutral grey while the orchestrator holds `total_cents`. Change: drop B to 50% alpha with a soft clock tick, then restore on dispatch. Effect: makes "the dependent step waits for its input" legible as waiting, not as nothing happening.
4. **Give the bracket a sound of its own when it first appears** (9.3 s, size S). Saw: the bracket appears inside the crash. Change: a short low `link` variant 0.3 s after the crash. Effect: the dependency edge becomes an audible actor the viewer recognises again at 16.6 s and 22.9 s.
5. **Shorten the first hold** (4.5–6.3 s, size S). Saw: 1.8 s of stillness after a simple clean join. Change: trim to 1.3 s. Effect: tighter pace, keeps total near 26 s.
6. **Consider dropping the `tests` chip in the sequenced round** (20.75 s, size S). Saw: two chips leave almost together; the eye splits briefly even though the `tests` chip is grey and quiet. Change: dispatch `tests` after `handler total_cents` lands (21.2 s). Effect: single focus on the dependent step.

## Honest limitations
- The scenario is illustrative: an orchestrator does not automatically know a dependency exists. "KNOWN DEPENDENCY" stands for a planning step (by a human or by the orchestrating model after task analysis), not a guarantee that dependencies are detected.
- Sequencing shown here is a plan, not an enforced constraint. Written or persistent instructions to an orchestrator do not enforce ordering or permissions.
- No timing, token, or cost figures are claimed; the red round trip stands in for cost qualitatively.
- Audio was verified by measurement (peak, cue-local RMS, envelope cross-correlation lag 0 ms, spectrogram) and was not physically listened to.
- Font fallback differs by OS; pixel-exact reproduction is only promised on this machine's Chrome and fonts.

## Notes for the skill (optional)
- The shared renderer's CRF encode cannot guarantee a byte-equal loop boundary; forcing a final keyframe plus constant QP (mb-tree/AQ off) does. Worth considering as a `--loop-exact` option.
- `box` only reserves a two-line layout when the static `sublabel` is truthy; a `subGap` option and honouring an animated sublabel would avoid the blank-space workaround.



## Subsequent comparative revision — 2026-10-19

The original author review above is historical and preserved. Current corrections, final encoded verification, comparative scores, and limitations are in `reviews/comparisons/orchestration-patterns/after.md` and the adjacent verification.json. Variant metadata retains original model provenance and credits `gpt-6-astra comparative review` separately.
