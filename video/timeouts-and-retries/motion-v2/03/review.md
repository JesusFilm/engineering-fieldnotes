# Lesson 03 — Retry only when safe: production review (render 2)

This is the authoring agent's own defect pass and improvement list, following the architecture-flow-video review procedure. It is not the comparative review the editorial workflow requires before any recommendation; a fresh reviewer still needs to compare this encode with the other lesson 03 cuts. Factual verification is recorded separately in `verification.json`. This file contains no quality scores.

**Audio was analysed, not heard.** The evidence is the spectrogram, volumedetect and astats output, and the cue list from the scene. No one has listened to this encode.

## Fixed before handover

- **Still pass, 13.8 s / 29 s / 32.5 s.** Contract values (`no`, `yes`, `?`), the key pill and the key note sat 70 px low and off their rows. They were never given the card's slide offset. Fixed: every card node now slides with the card, whatever its alpha.
- **Still pass, 11–19 s.** The request highlight frame covered the `#1`/`#2` labels. Fixed by narrowing and moving the frame right.
- **Still pass, 23.5 s onward.** The `passed` result pill grew from its centre over the `status` label. Fixed by anchoring the pill to its left edge.
- **Still pass, all beats.** The service panel sat high and left the bottom quarter of the frame empty. Fixed by moving it down 50 px and lengthening the rails.
- **Encode 1, frames 297, 516, 798 and 1029.** The contract card and the service panel crossfaded, so their text overlapped while both were half transparent. Fixed by sequencing the fades: the service leaves (0.25 s) before the card enters, and the card leaves before the service returns. Alternate frames 300/309, 516/525, 802/810 and 1026/1035 of encode 2 show no overlap.
- **Encode 1, frames 669–1068.** The finished `#2` work pill kept an empty gap where its spinner had been. Fixed: a check is drawn in that slot.

The defect pass on encode 2 is clean. All 36 listed beat and boundary frames were inspected one by one at 1080×1920, the densest ones also at their real 350px width, plus the 350px contact sheet. Text stays clear of packets and ripples. No stale state is left behind: the highlights clear, and the card leaves no residue after it closes. Every visible event has a cue, and the spectrogram confirms a cue on every beat. The longest unchanging stretches are deliberate holds after a beat lands: 7.4–9.6 s (2.2 s, with the `#1` spinner still moving), 14.6–17.0 s (2.4 s), 23.5–26.4 s (2.9 s, spinner moving) and 31.2–34.0 s (2.8 s). Peak level is −7.3 dBFS.

## Suggested improvements

1. **Keep attempt 1's unresolved work visible during the contract check** (9.6–17.0 s, M). Saw: the card covers the service, so the dim `#1` spinner disappears exactly while the viewer decides whether repeating is safe. Change: shrink the card, or leave a slim strip of the service with its `#1` pill showing below it. Effect: keeps "the first attempt may still be running" in view while safety is judged.
2. **Make the write's `?` read as "decided by its own contract"** (28.8 s, S). Saw: a bare amber `?` could read as "unknown answer" instead of "this operation needs its own retry contract". Change: replace `?` with `own contract`, or add a dashed, inactive `retry` control under the write as plan A proposed. Effect: states the condition, not just uncertainty.
3. **Raise the overall mix** (whole video, S). Saw: mean −32.9 dB and peak −7.3 dBFS leave about 6.8 dB of headroom against the −0.5 dBFS ceiling. Change: lift the master or the per-cue gains by about 3 dB, then check the peak again. Effect: quiet cues (`ack`, `clock`) stay audible on phone speakers. This should be confirmed by actually listening.
4. **Brief the service's pre-existing `passed`** (0–6.2 s, S). Saw: the service shows `passed` from the first frame, so an attentive viewer may ask why attempt 1 timed out. Change: show it as `running`, then `passed` partway through attempt 1, or leave it neutral until it is read. Effect: makes clear that the answer existed but the response did not arrive in time.
5. **Shorten the opening still** (0–1.2 s, S). Saw: 1.2 s of silence before the first event. Change: send at 0.8 s. Effect: a tighter start without losing the readable starting state.
6. **Mark the timeout boundary on the bar itself** (6.2 s, S). Saw: the end tick turns amber, but the instant of expiry depends on the label change. Change: a small amber ripple at the end tick. Effect: ties the expiry to the bound.

## Notes for the skill (not acted on)

- The engine's chip packets and node labels are fixed at 26–32 px. This cut added a cut-local `pk.size`, a `meta.titleSize` and exported `NODES`/`util` so scenes can register generic node types. These live only in `engine/flow-engine.js` beside this scene.
- Group transforms (sliding a whole card) needed a per-node `dy` convention in the scene's custom nodes. A first-class group or offset would avoid the stale-offset defect fixed above.
