# OAuth PKCE lesson 04 — Prove the verifier matches: encoded comparison

Reviewer: fresh independent comparison reviewer (claude-opus-5-5). I read AGENTS.md, docs/editorial-workflow.md, the architecture-flow-video review reference and lesson item 4 of `video/oauth-pkce/sequence/lessons.json`. I did not read author source, beat sheet, self-review, verification ledger, plans or prior sessions before or during this review.

| | Candidate | Published |
|---|---|---|
| File | `video/oauth-pkce/motion-v2/04/video.mp4` | `public/lessons/oauth-pkce/04.mp4` |
| SHA256 (before = after) | `7730cc56306c379423ed213c6e93b6041442e7cb9b811959b3aac3d961c9a5de` | `4c4888d39417ef06124365315b7a9fef1dc25d53292dca6b56b30c6549b3c743` |
| Stream | 1080×1920 H.264, 30 fps, 1242 frames, AAC 44.1 kHz stereo | 1080×1920 H.264, 20 fps, 560 frames, AAC 44.1 kHz stereo |
| Duration | 41.4 s | 28.0 s |
| Full decode | no errors | no errors |
| moov before mdat (fast start) | yes | yes |
| Audio peak / mean (volumedetect) | −5.8 dB / −30.1 dB | −10.6 dB / −41.5 dB |

Audio was **analysed only** (volumedetect, 50 ms RMS onset map, spectrogram). It was not heard.

## Verdict

The candidate **passes** with no reproducible objective faults, and I recommend it over the published cut. It shows the whole mechanism without captions: code A selects the saved code A / challenge A record, verifier A is hashed (SHA‑256 then base64url) into a computed challenge, the two challenges are compared, the PKCE check passes, three other OAuth checks pass separately, and only then are tokens issued. A verifier B alternative then fails with `≠`, a red PKCE check, dimmed other checks, "no tokens" and `invalid_grant`. The published cut is accurate in its captions, but its picture is two labelled boxes, so the derivation and comparison never appear on screen. It has no mismatch case, and it holds a static frame for 7 s.

## Scores (reviewer judgement, 1–5; not measured learning)

| Criterion | Candidate | Published |
|---|---|---|
| Causal clarity | 5 | 2 |
| Accuracy | 5 | 3 |
| Pacing | 4 | 2 |
| Visual legibility | 4 | 4 |

These scores are separate from the factual checks below.

## Scope and accuracy checks (candidate)

- **Submission of code A with original verifier A:** 1.6–3.1 s. Two chips, `code A` and `verifier A`, travel from Client to the Authorization server (frame 90, 3.0 s).
- **Saved challenge selected by code A:** 3.3–4.5 s. The code A chip docks onto the saved `code A / challenge A` record, which highlights (frame 140, 4.67 s). The lookup is visible without text.
- **S256 derived from the submitted verifier:** 5.2–10.4 s. The S256 box shows `SHA-256` with a progress bar (frame 200, 6.67 s), then `base64url` (≈9 s), then outputs a computed `challenge A` (frame 320, 10.67 s). This matches RFC 7636's S256 transform.
- **Compared with the saved challenge for code A:** 9.6–12.6 s. Saved challenge A is copied into the "saved" slot, both highlight, `=` appears at 11.73 s and the PKCE check ticks at 12.6 s (frames 352–380).
- **A match passes only the PKCE check:** frame 400 (13.33 s) shows PKCE ✓ while code valid, client binding and redirect URI are unticked and "no tokens yet" is emphasised. Those three checks then tick one at a time at 15.6, 16.4 and 17.1 s, "tokens issued" appears at 17.67 s, and tokens reach the client at 19.3–19.67 s (frame 600, 20.0 s). This is the clearest available evidence that a match alone does not grant tokens.
- **A mismatch fails:** 24.2–38.1 s. Verifier B gives a computed `challenge B`, then `≠` (34.3 s), PKCE ✗ (35.1 s), dimmed other checks and "no tokens" (35.9 s), and `invalid_grant` in the client response (frame 1180, 39.33 s). The error code is correct for a failed verifier check.
- **Redeemed code reuse:** the alternative is introduced after a full fade to an empty stage (frames 664–702, 22.1–23.4 s). It is labelled "ALTERNATIVE · VERIFIER B INSTEAD", and the board is reset ("response" empty, all checks blank, "no tokens yet"). "Code valid" is never evaluated in the alternative, so the video does not claim that code A is still redeemable. I read it as a counterfactual for the same request and do not count it as implying reuse (see optional item 1).
- **No identity conflation, unrelated mechanisms, paragraphs, decorative subtitles or metaphors.** The only text above the board is the title and a one-line case label that carries meaning.

## Beat-by-beat comparison

The lesson beats are at 0, 7, 14 and 21 s.

**Beat 1 — submit code A with verifier A; server has saved challenge (lesson 0–7 s).**
Candidate, 0–4.7 s: the client holds separate `code A` and `verifier A` chips, the server shows the saved code A / challenge A record, and the request travels with a sound at 1.6/2.5 s. The docking at frames 126–132 and 798–810 is an intended crossfade of about 0.33 s.
Published, 0–7 s: a "CODE + VERIFIER" chip travels until 2.55 s, then nothing moves from **2.55 to 7.0 s (4.45 s)**. The saved challenge appears only as the text "challenge A saved".

**Beat 2 — derive S256 and compare (lesson 7–14 s).**
Candidate, 5.2–12.6 s: hashing, encoding, the computed value, the copied saved value and the `=` are each separate visible steps with their own sound (6.0, 6.95, 8.55, 10.3, 11.7, 12.5 s).
Published, 7–14 s: only a grey progress bar fills inside AUTH SERVER, the sublabel changes to "compare challenges" at 11 s, and the border turns orange. No derived value, no saved value and no comparison operator appear. The caption carries the whole idea.

**Beat 3 — matching proof passes this check; other checks must also pass (lesson 14–21 s).**
Candidate, 12.6–17.6 s: the PKCE ✓ is visibly separate from the three other checks, and each of those checks has a pending ring, a tick and a sound.
Published, 14–21 s: the box turns green with "PKCE match" at 14.0 s, then **nothing changes for 7.0 s (frames 280–420)**. No other checks are shown, so the picture alone reads as "match → token".

**Beat 4 — then tokens may be issued (lesson 21–28 s).**
Candidate, 17.6–21.8 s: "tokens issued" appears and a green dot carries tokens to the client response at 19.3 s, which then holds for about 2.1 s.
Published, 21–23.6 s: a "TOKEN" chip travels to the client and the client box reads "token received" (frame 480), held until the end.

**Mismatch case.** The candidate adds this at 23.4–40.0 s. The published cut has none, and the lesson takeaway ("A mismatch must fail") only appears as text on the page.

## Pacing

The candidate's longest still stretches are post-outcome holds of 2.1 s (19.7–21.8 s) and 1.9 s (38.1–40.0 s), plus a 0.6 s title-only tail after the fade (40.8–41.4 s). The empty stage between cases lasts about 0.5 s. The candidate is 13.4 s longer than the published cut, which is justified by the added mismatch case. Its success case on its own lasts 21.8 s, so it is not padded. The derivation (5.2–10.4 s) is the densest stretch but it is sequential, one step at a time.

The published cut has static runs of 2.55–7.0 s, 14.0–21.0 s and 23.55–28.0 s. In the frame analysis the 7.0–11.0 s stretch is nearly still, with only the slow grey bar filling.

## Legibility (native 1080 and actual 350 px)

The candidate's smallest text is the case subtitle, the "saved"/"computed" captions and "other OAuth checks", all at or above about 24 px tall at 1080. At 350 px (frames s_02, s_12, s_17, s_22) every chip and check name is readable, and the smallest labels are small but legible. Colour carries state consistently: blue for challenges, orange for verifiers, green for pass, red for fail. No clipping or stage overflow appeared in any of the 23 sampled frames.

The published cut is large and readable at both sizes, but its diagram holds very little information: the only text that changes inside the boxes is a sublabel.

## Sound (analysed, not heard)

Candidate onsets fall within about 0.1 s of their visual events: the send at 1.6/2.5 s, the dock at 4.0 s, the hash steps at 6.0, 6.95 and 8.55 s, the computed/copy steps at 10.3 s, `=` at 11.7 s, the PKCE ✓ at 12.5 s, the "no tokens yet" emphasis at 13.65 s (quiet, −33.9 dB), the other checks at 15.5, 16.25 and 17.0 s, tokens issued at 17.6 s and the tokens arriving at 19.3 s. The alternative repeats this pattern, with `≠` at 34.3 s (−12.3 dB, the loudest window), the PKCE ✗ at 35.1 s, a broadband fail sound at 35.9 s and `invalid_grant` at 37.45 s. There is no clipping.

I checked an apparent silent gap from 13.75 to 15.5 s against exact frames 408–466. The motion there is a highlight fading on "no tokens yet" and the pending ring starting on "code valid", whose completion has a sound at 15.5 s. It is not a missing sound.

The published cut's track is sparse (onsets at 2.0, 7.0, 11.0, 14.0, 21 and 23 s), and the quiet cues at 7.0 and 11.0 s are near −35 dB.

## Objective faults

**Candidate: none reproduced.** I checked the overlaps I saw against alternate exact frame indices:
- At 26.4 s (frame 792), the code A chip crosses the "saved" box label in flight. It is gone by frame 810, and the same docking happens in case 1 (frames 120–146). This is an intended motion lasting under 0.4 s.
- At frame 90 (3.0 s), the arrival ring crosses the server container border. It is transient.
- The green and red response dots at 18.67 s and 37.33 s travel in the right margin, x ≈ 1020–1045, inside the 1080 px frame.

**Published (for comparison only; it is not the subject of the decision):** static frames of 4.45 s (2.55–7.0 s) and 7.0 s (14.0–21.0 s) break the "nothing changes for more than about 3 s" rule. The picture also shows "PKCE match → TOKEN" with no other checks on screen.

## Optional improvements (candidate; none are blockers)

1. **Make the alternative read even more clearly as a counterfactual** (23.0–24.2 s, S). The reset and the word "INSTEAD" already work. A viewer who skims could still read code A being sent again after case 1 issued tokens. A brief motion cue would remove any doubt, for example rewinding case 1's tokens out of the client before the new board appears, or visibly restoring the client to its pre-request state.
2. **Make the response path easier to follow at phone size** (18.3–19.7 s and 36.7–37.9 s, S). The response dot is about 20 px and travels in the right margin, separate from the dotted request line, so at 350 px it is about 6 px. Running it back along the connector, or making it larger, would make "server answers client" as visible as the request.
3. **Steady the chip's docking path** (25.9–27.1 s and 3.3–4.5 s, S). Ending the chip's flight before it crosses the "saved" box label would remove the brief collision at frame 792.
4. **Trim the tail** (40.8–41.4 s, S). The 0.6 s title-only tail adds nothing after the fade.

## Integration note (outside this review's write scope)

`lessons.json` item 4 declares `duration: 28` with beats at 0, 7, 14 and 21 s. The candidate's success case lines up loosely with those beats (derivation from 5.2 s, PKCE ✓ by 12.6 s, tokens by 19.7 s), but the clip runs 41.4 s and its mismatch case has no beat text. If the candidate is adopted, the coordinator should update the lesson metadata. The encode itself does not need to change.

## Recommendation

Use the candidate as the recommended cut and keep the published cut as an alternative. The choice rests on the evidence above: the candidate teaches derivation, comparison, the separation of the PKCE check from the other checks, and the failure case through motion and sound, while the published cut relies on captions and has two long static holds. Human editorial review controls promotion.

## Evidence

All under `video/oauth-pkce/motion-v2/reviews/scratch/04/`:

- `new-contact.png` and `old-contact.png`: 1 fps contact sheets.
- `new/n_*.png` and `old/n_*.png`: native frames, selected by exact index. New: 0, 90, 140, 200, 270, 320, 400, 440, 470, 520, 560, 600, 668, 690, 720, 760, 800, 900, 1000, 1070, 1120, 1180, 1241. Old: 0, 30, 100, 200, 300, 430, 480, 559.
- `new/s_*.png` and `old/s_*.png`: the same frames at 350 px.
- `dock-tiles.png`, `pkce-tiles.png`, `pass-tiles.png`, `copy-tiles.png` and `transitions.png`: crops from alternate exact frames.
- `new-spectrum.png` and `old-spectrum.png`: spectrograms.
- `motion.py`, `segments.py` and `audio*.py`: analysis scripts.
- `sha256-before.txt` and `sha256-after.txt`: identical before and after the review.
