# OAuth PKCE lesson 03 "Bind code and challenge": encoded comparison

Reviewer: fresh independent comparison reviewer (claude-opus-5-5). Before inspecting the encoded media, I read only AGENTS.md, docs/editorial-workflow.md, the architecture-flow-video review reference and item 3 of video/oauth-pkce/sequence/lessons.json, plus the brief's scope. I did not read the author's scene source, beat sheet, self-review, verification file, plans, ledgers or other reviews. Audio was **analysed only** (onset timing, levels and spectrogram) and was **not heard**.

## Files and hashes

| Cut | File | SHA256 (identical before and after review) | Format |
|---|---|---|---|
| Candidate (motion-v2) | video/oauth-pkce/motion-v2/03/video.mp4 | 4beefffb5fc56d82f817fb0e05469d65a657cad0068d182217d507cd2b1ef3ff | 1080x1920 H.264 30 fps, 1095 frames, 36.50 s, AAC 44.1 kHz stereo, faststart (moov before mdat), full decode clean |
| Current public | public/lessons/oauth-pkce/03.mp4 | e512c8cb43c271270420a96a138d024bb772d661100d21b639afe31055ae0262 | 1080x1920 H.264 20 fps, 560 frames, 28.00 s, AAC 44.1 kHz stereo, faststart, full decode clean |

## Verdict

**Recommend the candidate (motion-v2). Status: pass.** I found no reproducible objective fault in it. It shows every element of the scope through motion: the verifier stays in the client, challenge A travels through the browser in the authorization request, normal OAuth checks run, the server records the challenge in Attempt A, the user approves, code A appears only after both checks, the code is bound to the challenge, the code returns through a browser redirect, and the code is marked as insufficient proof on its own. The current public cut leaves the browser, user approval and redirect out of the picture, conveys the verifier and the final point only through captions, and is visually frozen for its first 7 s.

## Scores (reviewer judgement, 1 to 5; not measured learning)

| Axis | Candidate | Public | Basis |
|---|---|---|---|
| Causal clarity | 5 | 2 | The candidate gives every causal step its own visible state change. The public cut shows two token hops; the rest is caption text. |
| Accuracy | 5 | 3 | The candidate routes both legs through the browser and gates code issuance on checks and approval. The public cut sends code A straight from server to client and never shows authorization or the verifier. |
| Pacing | 4 | 2 | The candidate is dense but moves steadily, with one 3.2 s end hold. The public cut has a 7 s frozen opening and a nearly static 17.6 to 27 s stretch. |
| Visual legibility | 5 | 4 | Both use large text. The candidate's smallest labels ("sent", "S256", "bound") are about 30 px tall at native size and still readable at 350 px. |

## Candidate beat by beat (exact frame indices at 30 fps)

| Time / frame | What is on screen | Sound onset (analysed) |
|---|---|---|
| 0.0 s / n0 | Empty Client, Browser and Authorization server panels with dashed "no code yet" slots; Attempt A container; OAuth checks and User approval pills unticked | none |
| 0.6 to 3.8 s / n45, n90, n140 | Verifier A appears, then Challenge A, then a "stays here" chip on the verifier; the challenge is highlighted orange before sending | 0.6, 1.4, 2.6, 3.8 s |
| 5.5 to 8.0 s / n165 to n240 | A Challenge A + S256 chip leaves the challenge row, which flips to "sent"; it lands in the browser as "Authorize [Challenge A S256]" | 5.6, 6.6, 8.0 s |
| 8.8 to 10.9 s / n264 to n330 | The chip waits at the server edge while OAuth checks spin, then turn green (about 10.1 s); the challenge is recorded in Attempt A with S256 (n327) | 8.8, 9.25, about 10.0, 10.9 s |
| 13.0 to 18.4 s / n390 to n555 | User approval goes pending; the browser shows Consent / Approve; the cursor clicks; Approved; the approval travels to the server and User approval ticks green | 13.0, 13.7, 16.6, 17.6, 18.3 s |
| 20.0 to 22.0 s / n600 to n660 | Code A fills the server slot only now; a "bound" link joins it to Challenge A with a white flash (n650 to n660) | 20.0, 21.6 s |
| 24.4 to 27.3 s / n735 to n820 | A Code A chip leaves the server, shows as "Redirect [Code A]" in the browser, then drops into the client's code slot | 24.4, 25.1, 26.4, 27.2 s |
| 28.8 s / n866 | Brief glow pulse on Verifier A | 28.8 s (quiet) |
| 29.8 to 33.3 s / n896 to n1000 | The client's Code A gets an orange "not proof alone" chip; the server shows a dashed "Exchange must match" box linked by an arrow to the stored Challenge A | 29.8, 31.5 s |
| 33.3 to 36.5 s / n1000 to n1094 | Final resolved state held (freezedetect: 3.17 s) | none |

Audio levels for the candidate: peak -7.4 dBFS and mean RMS -30.3 dB, with no clipping. Every onset matches a visible event. I found no visible event without a sound; quiet ticks cover the green check at about 10.0 s.

## Visual checks and reproductions

- I viewed native 1080 frames n140, n225, n330, n520, n765 and n1094 individually, plus 350 px tiles of all 24 sampled frames and seven transition strips (n165 to n246, n255 to n336, n300 to n354, n540 to n621, n700 to n781, n770 to n851, n860 to n941). Text is crisp throughout. No label is clipped, off stage or inside the title band.
- **Possible overlap at about 10.4 s, ruled out.** In the native crop of n306, n312 and n315, the travelling Challenge A chip touches and then crosses the server panel's top border and the "Attempt A" divider for about 3 frames as it enters. It never covers text. This is normal entry motion.
- **Possible overlap at 27.1 s, ruled out.** In native crops of n811 to n818, the arriving Code A chip and the "no code yet" placeholder are both present during the dissolve, but the chip sits to the right of the placeholder text and the two never overlap. At n817 the slot shows Code A alone.
- **Stale state: none found.** The browser empties after each use (n240, n555, n840). The client's "sent" challenge remains, which is correct because the client still holds it.
- **Static stretches:** the only freeze is the end hold from 33.3 s. A 1.6 s settle at 4.0 to 5.6 s comes before the send.

## Public cut observations

- 0 to 7.0 s (n0 to n140): completely frozen (freezedetect reports 7.0 s), with no sound. Its only content is the caption "The client has challenge A. Its verifier remains with the client." **The verifier is never drawn.**
- 7.0 to 9.0 s: an orange CHALLENGE A chip drops from Client App to Auth Server, which then reads "challenge A saved" (sound at 7.0 and 9.0 s). **No browser and no request validation are shown.**
- 14.0 to 17.0 s: the server turns green and reads "code A bound". A CODE A chip rises **directly to the client** (n335), and the client glows at 17.0 s. **No user authorization is shown,** although the caption says "After authorization", and the code skips the browser redirect.
- 17.6 to 28.0 s: no visual change except a caption swap at 21.0 s to "A code alone is not the full proof. The exchange must match the challenge." That point is made only in text. Freezedetect reports static runs of 3.45 s, 4.0 s and 2.0 s.
- Audio for the public cut: 5 onsets, peak -12.4 dBFS, mean RMS -42.6 dB. The first 7 s and the final 11 s are silent.
- Legibility for the public cut: box labels and captions are large at native size and readable at 350 px. The caption text carries most of the teaching.

## Concrete comparison

- **Verifier stays home:** the candidate shows a persistent Verifier A row with "stays here" that never moves. The public cut states this only in a caption.
- **Front channel:** the candidate routes both the authorization request and the code redirect visibly through the browser. The public cut draws a direct client-to-server line, which suggests a back-channel return of the code.
- **PKCE does not replace OAuth:** the candidate shows OAuth checks and User approval as gates that must turn green before code A exists. The public cut omits both.
- **Binding:** the candidate shows an explicit "bound" link between two records in the same Attempt A. In the public cut, the server label changes from "challenge A saved" to "code A bound", which shows the result less concretely.
- **Code is not enough:** the candidate shows a "not proof alone" chip and a dashed match requirement. The public cut offers only a caption over a static frame.
- **Public cut advantages:** it is simpler and shorter (28 s) and puts fewer elements on screen, which can suit a viewer who only needs the gist. The candidate packs about 20 state changes into 36.5 s, so a first viewing is more demanding.

## Optional improvements (not blockers)

1. **Make the bind the sonic peak** (21.6 s, size S). The loudest window is the redirect arriving at 25.1 s (-14.6 dB). The bind sound is -15.6 dB, and the "not proof alone" sound is -18.2 dB. Giving the bind the most distinct sound would match its importance in the lesson.
2. **Tighten the timeline** (about 4 to 5.6 s and 11 to 13 s, size S). Shortening those settles by about 1 s each would bring the cut closer to the 28 s lesson duration without losing a beat.
3. **Clarify the verifier pulse** (28.8 s, size S). The glow on Verifier A is easy to miss, and it is unclear what it signals. Remove it, or tie it to the "Exchange must match" moment so the viewer links the later proof to the retained verifier.
4. **Show that the challenge is not secret** (6.6 to 8.0 s, size S). The challenge is visibly carried in the open through the browser, which implies this, but nothing marks it. A brief exposed state on the browser chip (for example, the chip staying visible in a URL bar) would make the non-secret status explicit without adding text.
5. **Reconsider the "OAUTH PKCE" tag** (all frames, size S). The small grey series label under the title is low priority but adds an element. Keep it only if the other lessons in the sequence use it consistently.

## Integration note for the coordinator (not a media fault)

lessons.json item 3 lists `duration: 28` and beat times 0, 7, 14 and 21 s. Those match the public cut. If the candidate is promoted, the manifest timing needs to follow its 36.5 s timeline: send at about 5.6 s, issue and bind at about 20 to 22 s, and "not proof alone" at about 29.8 s. I did not edit any manifest.

## Method and limits

I decoded both files fully, probed their stream and container layout, ran freezedetect, ran volumedetect and astats, detected 50 ms RMS onsets, and generated spectrograms. I made 1 fps contact sheets and extracted exact frame indices with `select=eq(n,…)`, avoiding time seeking. Scratch evidence is in reviews/scratch/03/. The scores are reviewer judgements. I did not listen to the audio or test the cut with learners.
