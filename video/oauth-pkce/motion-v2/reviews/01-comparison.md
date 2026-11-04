# Lesson 01 "Delegate access": encoded comparison review

Reviewer: fresh independent comparison reviewer (claude-opus-5-5). Only the two encoded MP4s, `lessons.json` item 1, the repository instructions and the review reference were read. No author source, self-review, plans, ledgers or other sessions were opened.

| File | SHA256 (before = after) |
| --- | --- |
| Candidate `video/oauth-pkce/motion-v2/01/video.mp4` | `1f911da6bdfe260d0f1803abb999d63a324c24a7e89500680c91565fd183a777` |
| Baseline `public/lessons/oauth-pkce/01.mp4` | `3ef03bb3e588c66746d524541b028acbddde30e6941c65ec5d22887ae5fd063e` |

**Verdict: candidate passes with no blockers and is recommended over the baseline.** It shows the whole simplified delegation causally: a 401 without a token, sign-in and consent in the browser on the auth server's page, the code returning by browser redirect, the code exchanged for a token, then one API call allowed (GET) and one refused (DELETE, 403) with the same valid token. The baseline has reproducible static stretches, leaves out the browser its caption names, and never shows a token being refused.

Scores are this reviewer's judgments on a 1–5 scale. They are not measured learning outcomes and are kept separate from the factual checks below.

| Criterion | Candidate | Baseline |
| --- | --- | --- |
| Causal clarity | 5 | 2 |
| Accuracy (within simplified scope) | 5 | 3 |
| Pacing | 4 | 2 |
| Visual legibility (1080 and 350 px) | 4 | 4 |

## Method and objective checks

- Both files decode end to end without errors (`ffmpeg -f null`). Both are faststart (`moov` at byte 36, before `mdat`), H.264 yuv420p 1080×1920 with AAC 44.1 kHz stereo.
- Candidate: 41.6 s, 30 fps, 1248 frames. Baseline: 28.0 s, 20 fps, 560 frames.
- Frames were extracted at 1 fps at native 1080×1920 and at 350 px width, along with contact sheets (`scratch/01/cand_sheet.png`, `base_sheet.png`), 350 px strips of beat midpoints, and transition strips sampled every 4–6 frames. Every apparent defect was checked again at exact frame indices (`select=eq(n,N)`) because 1 fps extraction can land on a frame up to half a second away.
- Motion was measured with `freezedetect` (n=0.0005, d=1.5 s) and per-frame differences. Audio was measured with `volumedetect`, `ebur128`, `silencedetect`, 50 ms peak onsets and spectrograms (`scratch/01/*_spectrogram.png`).
- **Audio was analysed only. It was not heard.**

| Measure | Candidate | Baseline |
| --- | --- | --- |
| max_volume | −5.1 dB (no clipping) | −12.5 dB |
| mean / integrated | −29.5 dB / −24.3 LUFS, LRA 5.5 | −41.4 dB |
| Longest freeze | 1.6 s (36.07–37.67, hold after the 403 lands) | 7.0 s (0–7), plus 9.55–14.0 |
| Sound events | an onset for nearly every visible state change | 8 tones from 7 s onward; silent 0–7 s |

## Candidate beat walkthrough (exact frames)

| Time | What the viewer sees | Assessment |
| --- | --- | --- |
| 0.4–5.5 | Client app and Resource API appear. A request goes out with no token, the API marks it ✗ "no token", and a 401 chip returns (frame 100) to become "401 · no access" in the client. | A strong problem statement that needs no words. The 401 chip at frame 100 sits next to the Resource API border without overlapping it. |
| 5.5–9.5 | The 401 fades. The Browser and Authorization server light up while the client and API dim. The URL reads `auth.example` and the server status reads "authorize". | The new actors draw the eye. There is no visible hand-off from client to browser (see optional item 3). |
| 9.5–13.5 | "Sign in" with a masked password field (frame 310) and "verify user" at the auth server. | The credentials stay masked inside the browser on the auth server's domain and never reach the client. The visual mentions sign-in, but it never presents OAuth as identity authentication for the client. |
| 13.5–16.5 | "read incidents?" appears. A cursor moves to Allow and clicks (about frame 430, with an audio onset at 14.25). The auth server records "grant: read". | The consent scope is concrete. The cursor crossing the URL pill around frames 398–404 is ordinary pointer overlay; frames 392, 398 and 404 confirm it is transient and covers no text. |
| 16.6–19.6 | "issue code" appears. A dashed code chip travels from the auth server up to the browser, the URL changes to `app.example/cb` with "redirect", and the chip moves across to the client, arriving at frame 564 (18.80 s, onset 18.80 s). The client shows "code · use once". | This beat carries the core front-channel teaching. The code is visibly something other than a token, through its dashed amber style and label. |
| 20.8–24.5 | The code chip moves diagonally from client to auth server (frames 627–651). "check code ✓" appears, both code rows clear, "issue token" appears, and a solid green "access token" chip moves to the client, arriving at frame 734 (24.47 s, onset 24.40 s). | The exchange and its server-side validation are clear. The code being consumed is visible because the code rows disappear. |
| 25.6–31.0 | The browser and auth server dim. `GET /incidents`, with a green token marker, goes from client to API. The API checks "token valid ✓", "for this API ✓" and "read allowed ✓", and "200 · incidents" comes back. | The API itself does the validation, and the audience check is shown. |
| 31.8–36.0 | `DELETE /incidents/7` goes out with the same token. The API shows token valid ✓, for this API ✓, "delete allowed ✗" (frame 1038, 34.6 s, the loudest onset at −7 dBFS peak), and "403 · denied" comes back. | This shows that a valid token does not authorize every operation. The contrast reuses the checklist the viewer has just seen, and the disruption is the loudest moment. |
| 36.1–40.6 | The resolved state holds. The browser and auth server relight with "grant: read" (onsets at 37.60, 38.30 and 39.00). | The closing state shows all four actors. |
| 40.6–41.6 | The nodes fade over about 0.8 s, leaving only the title (frame 1247). | A finite ending with about 1 s of fade and no long padding. |

The smallest text at 1080 is the letter-spaced subtitle (about 26 px caps) and the monospace URL and status labels (about 28–32 px), all at or above the roughly 24 px threshold. Nothing is clipped or sits in the title band. No stale state was found: the dimmed `app.example/cb` and "grant: read" are intentional persistent state. Nothing stays frozen for more than 3 s outside the post-403 hold. Each arrival I checked has a matching sound.

## Baseline walkthrough

| Time | What the viewer sees | Assessment |
| --- | --- | --- |
| 0–7.0 | Three stacked boxes (CLIENT APP, AUTH SERVER, RESOURCE API) and a two-sentence paragraph. Nothing moves and there is no sound (freezedetect reports 0–7.0 s). | **Objective fault:** frozen for 7 s with no sound. |
| 7–9.5 | An "AUTH CODE" chip moves directly from the auth server to the client (frame 160) while the caption says "in a browser". | **Accuracy gap:** no browser actor or redirect appears, so the code seems to go straight to the client and the picture contradicts its own caption. |
| 9.55–14.0 | Static. | **Objective fault:** frozen for 4.45 s. |
| 14–20 | A CODE chip goes from client to auth server and a TOKEN chip comes back. | Readable, but there is no visible validation event beyond the caption. |
| 21–28 | A TOKEN chip travels the right-hand connector to RESOURCE API (frame 430), which gets an amber "validate access" outline, then holds 25–27 s. | It never shows an outcome or that a token can be refused, so "The API still checks access" depends entirely on the paragraph. |

Advantages of the baseline: very large text, runtime that matches `lessons.json` (28 s), and a calm layout. Disadvantages: on-screen paragraphs carry the lesson, there are long static stretches, the browser and redirect are missing, and nothing shows the limit of a token.

## Blockers

None for the candidate.

## Optional improvements (candidate)

These are refinements, not faults.

1. **Lesson timing metadata** (whole file, S, coordinator-owned). The candidate runs 41.6 s, but `lessons.json` item 1 declares 28 s with beat texts at 0, 7, 14 and 21 s. If the site syncs beat text to playback time, "The client exchanges the code" would appear at 14 s while the video is still on consent. Retime the beats to about 0, 5.5, 16.6, 20.8 and 25.6 s and update the duration if this cut is adopted. This is an integration step and does not require a media change.
2. **Phone-width monospace labels** (6–41 s, S). At 350 px, `auth.example`, `app.example/cb`, "issue code" and "check code" render at about 9–10 px. They are legible but the smallest text on screen. Enlarging the monospace status text slightly would help phone viewers follow the server status changes.
3. **Client starting the browser trip** (5.5–6.8 s, S). The browser appears without visible motion from the client. A brief pulse or chip along the client→browser connector would show that the client starts the authorization request, which makes the later return by redirect easier to follow.
4. **Subtitle** (0–41 s, S). "SIMPLIFIED OAUTH FLOW" is small and quiet. It does mark the simplification honestly, but it repeats the title area on every frame and could be dropped to match the brief's preference against decorative subtitles.
5. **Exchange sound** (about 23.4–23.9 s, S). The spectrogram shows a broadband noise burst reaching about 19 kHz at code consumption, unlike the other tonal cues. It was analysed, not heard. Check by listening that it does not sound harsh, and consider a tonal cue in the same family as the others.
6. **Closing relight** (37.6–39.0 s, S). The browser and auth server relighting after the 403 adds three cues after the lesson has landed. A shorter, quieter recap would let the 403 contrast stay the final emphasis.

## Recommendation

Recommend the candidate (`motion-v2/01`) for lesson 01. It meets every scope point, including code rather than token in the redirect, OAuth shown as delegation rather than identity authentication, no exposed credentials, and an explicit case where a valid token is refused, all without later PKCE mechanisms. The baseline should stay available as an alternative, but it does not pass this review because of the 0–7 s and 9.55–14 s freezes. Human editorial review controls promotion.

