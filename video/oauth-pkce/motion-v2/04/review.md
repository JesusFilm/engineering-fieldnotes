# Lesson 04 review (render 3, encoded sha256 7730cc56…a5de)

Self review of the encoded MP4 by the authoring session. It is not a comparative review and carries no score. A recommendation needs a fresh comparative reviewer.

## Fixed before handover
- Stills pass before render 1: the saved-record lines sat close to the card legend; moved both lines down and narrowed the comparison slots so the =/≠ glyph has clear space.
- Render 1, ≈4.0 s and 8.5/10.3 s: arrival ripples overlapped label text inside the saved record and on the slots (ring crossing "challenge A"). Removed those ripples; the slot fill and arrive note carry the event.
- Render 1, ≈2.73 s: the split chips jumped sideways relative to the combined request chip. Aligned the split start points with the chip's label and tag positions.
- Render 1, 34.3/37.5 s: the small × ripple mark drew over glyph and response text. Removed the marks; the red ≠, the PKCE ×, and the red `invalid_grant` row carry the failure.
- Render 1, 40–41.4 s: the subtitle stayed lit after the stage fade. It now fades with the stage.
- Render 2, frames 252–256 and 303–306: the slot key started fading in before the arriving chip had landed, so two "challenge A" copies overlapped for a few frames. Fill now starts on landing (8.45 s and 10.2 s). Checked at frames 249–262 and 300–312 in render 3.

## Suggested improvements
1. **Shorter second exchange** (23.6–33.1 s, S). Saw: the alternative case repeats every hold of case 1 even though the viewer already knows the route. Change: trim the lookup and pre-copy holds by about 0.5 s each. Effect: reaches the mismatch sooner with the same causal chain.
2. **Mark which letter differs** (34.3 s, M). Saw: `challenge A` vs `challenge B` differ by one letter at the end of the chip; at 350 px the difference reads, but slowly. Change: briefly underline or enlarge the trailing letter in both slots at the ≠ moment. Effect: faster reading of why the comparison fails.
3. **Request chip dwell** (2.5–2.75 s, S). Saw: the combined chip rests only 0.25 s before splitting. Change: add 0.3 s so "one request carries both" registers before the split. Effect: reinforces that code and verifier arrive together.
4. **Quieter repeated arrive notes** (8.55, 10.3, 31.15, 32.9 s, S). Saw: arrive peaks (≈ −5.5 dBFS) sit close to the mismatch (−2.8 dBFS). Change: lower slot-arrival gain by about 3 dB. Effect: makes the mismatch stand out more in the mix.
5. **Token slot "not yet" cue** (13.7 s, S). Saw: the flash is subtle at 350 px. Change: a slightly longer brightening or a small shake-free pulse. Effect: clearer "PKCE passed but no tokens yet".

## Audio
Analysed only (spectrogram, volumedetect, astats, per-cue window peaks). The audio was not listened to.
