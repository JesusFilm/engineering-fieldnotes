# Create a verifier — review (render 5, repair)

Encoded file: `video.mp4`, sha256 `a56dd9957c7f2475cda66893e656eec93a5007f10e871e8a2896ce2a085c97f9`, 42.60 s, 1278 frames. These are author self-review notes. They are not a comparison review. The previous encode (`95521a08…`) was marked fix_needed in `../reviews/02-decision.json`; because this new encode replaces it, it needs a renewed comparison review.

Audio was analysed only (volumedetect, 100 ms peak windows from decoded PCM, spectrogram). It was **not heard**.

## Repair of the comparison blocker

**Blocker (previous encode, 26.17–26.47 s, frames 785–794):** verifier B's chip was drawn beneath the nodes and passed behind attempt A's row, so it disappeared at frame 790. Verifier A's chip was drawn on top, so the layering was inconsistent, and B's verifier seemed to travel through A's storage.

**Cause:** row B sat directly below row A, and the rows fill the client almost edge to edge, so a 520 px chip had no path to row B except across row A. Drawing it on top would have covered verifier A, which reads as an overwrite. Drawing it underneath hid it.

**Fix:** the newest attempt now takes the top slot, next to crypto random. When attempt B opens (21.65–22.15 s), row A slides down one slot with its content unchanged, and row B fades in above it at 22.0 s. Verifier B's chip is drawn above everything, like verifier A's, and its route from the generator to row B crosses only the `per-attempt records` legend (25.85–26.65 s). B's derivation dot needs to pass row A, so the rows are inset 30 px on the right. The dot runs down that lane (x 953) and then left beneath the records frame into `ASCII` (28.95–29.95 s), without touching row A. The cut-local engine gained two general record options: a per-row slot offset (`r{i}Y`) and a right inset (`insetR`). The `under` packet flag is no longer used.

**Evidence:** exact-index frames 773–801 (every frame that matters for the store, including 788 and 790) show the amber chip fully visible above the legend, with row A and `verifier A` fully visible in every frame. Frames 647–667 show row A sliding intact before row B appears. Frames 866–900 show B's copy dot in the lane, clear of row A.

## Packing crossfade (optional improvement 6, fixed)

Previously the loose challenge pill and the forming request card overlapped for one or two frames (frames 523 and 1029–1030), doubling the `challenge` text. Now the pill fades out over 0.1 s, and the card starts as it disappears, with its send cue at the card's start. Frames 519–526 and 1039–1047 show no overlap. In attempt B one near-empty frame (1044, 33 ms) falls between pill and card. Arrival times at the server are unchanged (18.45 s and 35.8 s).

## Factual check (separate from review judgement)

Checked against RFC 7636 (https://www.rfc-editor.org/rfc/rfc7636), §§3, 4.1–4.3, retrieved 2026-11-04. The repair changes layout and routes only. The checks below still hold.

- The verifier is a high-entropy cryptographic random value created per attempt. On screen: `crypto random` runs again for attempt B and produces a different pattern into a separate record.
- S256 is `BASE64URL-ENCODE(SHA256(ASCII(code_verifier)))`, and base64url has no padding (§3). On screen the steps appear in that order, with `no padding` and the `=` drop.
- The authorization request carries `code_challenge` and `code_challenge_method=S256`. The request card holds `challenge X` and `S256`; the verifier never crosses the client boundary.
- SHA-256 is labelled `hash` and `one-way`; no encryption wording or imagery.
- Moving row A down a slot changes its position only. Its value and pattern stay the same, and no other value crosses or covers it.
- Values are abstract placeholders. The server shows only what arrived and then quiets.

## Defect pass on this encode

Clean. All beats and boundaries were inspected at native 1080 × 1920 and at true 350 px width (see `verification.json`). Full decode is clean; the audio peak is −8.13 dBFS; `moov` precedes `mdat`; the first and last frames match (title only, PSNR 54.9 dB).

## Remaining suggestions (from the comparison review, not acted on)

1. **Shorten attempt B** (28.95–36 s, M). B still repeats the full derivation and send. A compact pass would bring the cut nearer 30 s.
2. **Dim rather than clear the server's challenge A** when attempt B starts (20.85 s, S).
3. **Drop the `PKCE · S256` subtitle** (whole video, S). It repeats the `S256 · one-way` legend.
4. **Enlarge the `hash` and `no padding` sublabels** for 350 px width (from 12.4 s, S).
5. **Keep emphasis ripples off label text** (15.15 s, 22.1 s, 26.65 s, 33.3 s, S).
6. **Optionally pitch-shift attempt B's pipeline sounds** to reinforce "different verifier" (S).
7. **Give the row-A slide its own soft cue** (21.65 s, S). It currently shares the attempt-B `store` cue at 22.0 s, which falls inside the slide.

## Notes for the skill (not acted on)

- A per-row slot offset on a stored-records node lets a scene insert a new record next to its source, so a moving value never has to pass stored state.
