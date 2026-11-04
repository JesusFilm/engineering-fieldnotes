# Lesson 05 comparison: Separate login attempts

Reviewer: fresh comparison reviewer (claude-opus-5-5). I inspected the encoded media before opening any author source, self-review, plan, ledger or other session; none of those were opened at any point.

| Cut | File | SHA256 (before = after) | Encoding |
| --- | --- | --- | --- |
| Candidate | `video/oauth-pkce/motion-v2/05/video.mp4` | `749f0a36f6148bde270ce72ee6c26140cc7148e2e2bfeae3c34ec37848feeffb` | 1080x1920 H.264 30 fps, 1500 frames, AAC 44.1 kHz stereo, 50.0 s, moov before mdat, full decode clean |
| Published baseline | `public/lessons/oauth-pkce/05.mp4` | `695ee20514f974a029d67887ea24c16818017974e5f28e9e93a031d47d14c27a` | 1080x1920 H.264 20 fps, 560 frames, AAC 44.1 kHz stereo, 28.0 s, moov before mdat, full decode clean |

**Verdict: the candidate passes and is the recommended cut.** It shows the whole mechanism without relying on captions: verifier A is stored, B overwrites the shared slot, the token request pairs code A with verifier B, the server derives challenge B, compares it with stored challenge A and rejects with `invalid_grant`, then a repaired client keeps one verifier per login and a fresh login succeeds. I found no reproducible objective fault in the candidate. The baseline is accurate in its captions but teaches through text, and its repair beat leaves the server in a stale red "PKCE mismatch" state.

Audio was analysed only (per-50 ms peak levels, onset detection, volumedetect and spectrograms). I did not listen to either file.

## Method

- Exact frames selected by index (`select=eq(n,N)`), so time seeking could not substitute an adjacent frame. Candidate indices: 0, 45, 84, 120, 165, 210, 260, 300, 330, 400, 440, 470, 500, 560, 600, 640, 680, 705, 740, 760, 800, 830, 860, 900, 940, 990, 1040, 1090, 1160, 1200, 1250, 1300, 1350, 1400, 1440, 1470, 1499. Baseline indices: 0, 70, 139, 142, 150, 180, 200, 250, 270, 280, 290, 310, 330, 380, 419, 420, 470, 500, 540, 559.
- Each frame was saved at native 1080x1920 and as an actual 350 px wide frame. 1080 frames were viewed one at a time; 350 px frames were viewed at original size.
- Alternate indices around every apparent overlap or transition: 630, 636, 642, 648, 654, 795, 805, 935, 945, 1080, 1086, 1095, 155, 170.
- Contact sheets: candidate every 2 s, baseline every 1 s.
- Frame-difference motion scan of every frame to find events and still stretches longer than 2.5 s.
- Scratch evidence is in `reviews/scratch/05/`.

## Candidate beat by beat

| Time (frame) | What the frame shows | Assessment |
| --- | --- | --- |
| 0.00 (0) | Client with Login A/B idle, empty shared verifier, S256; server "no saved login". Subtitle "BUG · ONE SHARED VERIFIER". | Clean starting state. The subtitle is a short state label and does not decorate. |
| 1.50–4.00 (45, 84, 120) | Verifier A drops into the shared slot tagged "login A", passes through S256, and arrives at the server as challenge A. | Shows that the challenge is derived from the verifier before the code exists. |
| 5.50–7.00 (165, 210) | Server stores "code A · challenge A"; a packet returns along the left margin and Login A holds code A. | A owns code A and verifier A. The packet at x≈36 px stays inside the frame. |
| 8.67–10.00 (260, 300) | Login B activates, verifier B lands on the slot, the slot turns orange and now reads "verifier B · login B". | The key overwrite. It is visible without words, and its sound is the second-loudest event (9.30 s, −5.0 dBFS). |
| 10.0–12.4 | Overwritten state holds (motion scan: still about 2.7 s). | A deliberate hold after the key beat. It sits within the review guide's 3 s allowance. |
| 13.33–16.67 (400, 440, 470, 500) | Token request opens; code A comes from Login A and verifier B from the shared slot (orange highlight on the source). | Shows the mismatched pairing being assembled from its two sources. |
| 18.67–22.67 (560, 600, 640, 680) | Request sent; server highlights "code A · challenge A", hashes verifier B through S256 to challenge B, and copies challenge A beside it. | Accurate S256 check. The server recomputes from the verifier instead of comparing verifiers. |
| 23.50–25.33 (705, 740, 760) | Red "≠" with a ring, then "Rejected: invalid_grant". | Correct outcome and error code. It is the loudest event (23.70 s, −3.4 dBFS), so the disruption is the loudest moment. |
| 26.67 (800) | Crossfade: A failed, B cancelled, shared slot emptied, old token request fading. | A short transition that mixes old and new state; see the transitions section. |
| 27.67–30.00 (830, 860, 900) | "Fix client" button with cursor; slot relabels to "Verifier per login" with two empty rows; "Start fresh". Subtitle becomes "FIX · ONE VERIFIER PER LOGIN". | Correct repair: per-transaction storage plus a new login. Attempt A stays failed, with no recovery, retry, PKCE removal or code B exchange. |
| 31.33–34.67 (940, 990, 1040) | Login C stores verifier C in its own row, derives challenge C, and the server stores code C · challenge C. | Same flow as the bug case, now with an owned row. |
| 36.33–38.67 (1090, 1160) | Login D stores verifier D in the second row while verifier C remains. | The contrast case: a concurrent login no longer overwrites. |
| 41.67–47.33 (1250–1400) | Token request takes code C plus verifier C from its own row; server recomputes challenge C; green "=". | Mirrors the failure check, so the viewer can compare the two directly. |
| 48.00–49.00 (1440, 1470) | "PKCE matched · other checks next". | Accurate and appropriately limited: it avoids implying that PKCE alone issues the token. |
| 49.0–49.97 (1499) | Fades to the title on black. | A finite ending with no padding. |

At 350 px the main tokens (code/verifier/challenge rows, ≠/=, the rejection and match badges, button labels) stay readable. The ownership pills ("login A/B/C/D") and the BUG/FIX subtitle are the smallest text and remain legible. At 1080 the smallest settled text (ownership pills, subtitle) is about 26–30 px tall.

## Transitions and apparent defects checked at alternate frames

- **Challenge A copy over its source (around 21.3 s).** At frame 640 the moving "challenge A" chip overlaps the stored pill. At 642 it is still lifting, by 648 it is clear, and by 654 it sits in its slot. This lasts about 0.2 s while the chip moves, so it is not a lasting collision.
- **Verifier chips crossing labels (31.3 s and 36.3 s).** At frames 935/945 the chip crosses the "Verifier per login" label and at 1080/1086 the "login C" pill. Each settles within a few frames (by 990 and 1095). These are in-flight passes.
- **Bug-to-fix crossfade (26.3–26.9 s).** Frames 795 and 805 mix the faded token request, the "Rejected" badge and the new "A failed" state. Earlier rows never linger once the crossfade completes; frame 830 is clean.
- **Packet on the left margin (5.2–5.8 s, 34.7 s).** Frames 155 and 165 show the dot inside the frame at about x=24–36 px, outside the client box. It reads as a return route, not an object off the stage.

None of these met the Pass 1 bar of a lasting overlap, an object off the stage, or stale state.

## Sound (analysed, not heard)

The candidate peaks at −3.4 dBFS with a mean of −30.5 dB, so nothing clips. Analysis found 47 onsets, each aligned with a visible event within about 0.5 s: activation 0.50, verifier A lands 1.60, S256 3.00, challenge to server 4.20, code A returns 6.00, Login B 7.90, overwrite 9.30, token request 12.80–15.90, send and lookup 18.10–20.55, challenge B 21.85, ≠ 23.10–23.20, rejection 23.70, transition 26.30, button clicks 27.80 and 30.30, repaired flow 31.70–46.50, and match 47.10. The spectrogram shows a soft broadband sweep at 26.3–26.9 s for the bug-to-fix transition. The closing fade from 49.0 s has no sound, and none is needed. I found no audible event without a visual cause in the analysis. Whether any sound grates after repeats can only be judged by listening.

The baseline peaks at −10.6 dBFS with a mean of −39.9 dB. It has six onsets (7.00, 7.10, 9.00, 14.00, 16.00, 21.00) and is silent from 0 to 7 s.

## Baseline observations

- **0–7.0 s:** completely still. Three boxes read "ATTEMPT A code A", "ATTEMPT B verifier B" and "AUTH SERVER challenge A saved", above a two-line caption. Verifier A and the shared variable never appear.
- **7.0–9.6 s:** Attempt A turns red with "wrong verifier B" and an "OVERWRITE" chip moves down to B. The caption tells the viewer what happened, but the frame shows only a label change.
- **14.0–16.6 s:** an "A + verifier B" chip travels to the server and runs over the box text while moving (frames 290 and 310 overlap "ATTEMPT A"/"wrong verifier" and "AUTH SERVER"). The server then turns red with "PKCE mismatch". It shows no challenge derivation, no comparison and no explicit rejection.
- **16.6–21.0 s:** still for 4.4 s.
- **21.0–28.0 s:** a hard cut to green "separate storage" for both attempts, while the server stays red with "PKCE mismatch" until the last frame (419, 420, 559). This is stale state in the repair beat, and the frame does not show a fresh login.
- **Legibility:** large, clean text at both widths, but the teaching sits mostly in burned-in paragraph captions.

## Scores (reviewer judgment, 1–5; not measured learning)

| Criterion | Candidate | Baseline | Basis |
| --- | --- | --- | --- |
| Causal clarity | 5 | 2 | The candidate shows each step: store → overwrite → assemble → derive → compare → reject → repair → succeed. The baseline states the cause in captions and changes labels. |
| Accuracy | 5 | 3 | Both captions and labels are correct. The baseline's repair frame keeps the server in "PKCE mismatch" next to the fixed attempts and shows no fresh login. |
| Pacing | 4 | 2 | The candidate has no stills over 2.7 s and a finite fade. Its repaired flow (31–47 s) is long, which makes the cut 50 s against the lesson's 28 s. The baseline opens with 7 s of stillness plus 4.4 s and 4.0 s holds. |
| Visual legibility | 4 | 4 | The candidate is dense but organised, with small ownership pills. The baseline has larger type but depends on captions and has a transient chip overlap. |

These scores are separate from the factual checks above. Model identity is recorded for provenance only.

## Concrete comparison

The candidate's main advantage is the server-side check (18.7–25.3 s). The viewer sees verifier B hashed into challenge B and set beside the stored challenge A, and that is where the rejection comes from. The baseline only labels the server "PKCE mismatch". The candidate also proves the repair: Login D at 36–38 s fills its own row while verifier C survives, and the same check then passes at 46.7 s. The baseline asserts "separate storage" while its server still shows failure.

The candidate's disadvantages are length (50 s), density (about twelve labelled elements in the busiest frames), and a UI metaphor in which a cursor clicks "Fix client" and "Start fresh" (27.8–30.3 s). The baseline is short and calm, and every word in it is correct, but most of its teaching comes from text.

**Recommendation:** the candidate (`motion-v2/05`). The baseline should stay available as the alternative. If the candidate is promoted, `lessons.json` item 5 must be retimed: it declares 28 s with beats at 0/7/14/21. That is a metadata change, and the encoded video itself is fine.

## Objective faults in the candidate

None found.

## Optional improvements (not blockers)

1. **Shorten the repaired flow** (31–47 s, S–M). It replays the full authorization round trip. Starting Login D sooner, or compressing C's challenge round trip, would bring the cut toward 40 s without losing the contrast.
2. **Replace the cursor and buttons** (27.8–30.3 s, S). A click on "Fix client" can read as a runtime switch. Morphing the slot directly from "Shared verifier" into keyed rows, with the same sound, would show a code change without a UI metaphor.
3. **Explain "B cancelled"** (26.3 s, S). B stops without a visible cause. Fading B together with the shared slot would tie its cancellation to discarding the old client state.
4. **Hold the resolved state longer** (47.3–49.0 s, S). The match badge holds about 1.7 s before the fade. About 2.5 s would let it register.
5. **Ease the in-flight chip overlaps** (21.3, 31.3 and 36.3 s, S). Routing moving chips around labels and pills would remove the brief text-on-text moments.

