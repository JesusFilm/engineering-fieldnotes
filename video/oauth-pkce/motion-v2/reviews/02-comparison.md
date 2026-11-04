# OAuth PKCE lesson 02 "Create a verifier": encoded comparison

Fresh comparison review by claude-opus-5-5. Before inspecting the media, I read only `AGENTS.md`, `docs/editorial-workflow.md`, the architecture-flow-video `references/review.md` and `video/oauth-pkce/sequence/lessons.json` item 2. I did not open the author's scene source, beat sheet, self-review, verification record, earlier comparison files or other sessions.

| | Candidate | Published |
|---|---|---|
| File | `video/oauth-pkce/motion-v2/02/video.mp4` | `public/lessons/oauth-pkce/02.mp4` |
| SHA256 (before and after review) | `a56dd9957c7f2475cda66893e656eec93a5007f10e871e8a2896ce2a085c97f9` | `91093262f1cb9c0112552b970a5b4a44f85d5751d6b558392b033bcd75cbd10d` |
| Video | H.264 High, 1080x1920, yuv420p, 30 fps, 1278 frames | H.264 High, 1080x1920, yuv420p, 20 fps, 560 frames |
| Audio | AAC LC 44.1 kHz stereo | AAC LC 44.1 kHz stereo |
| Duration | 42.6 s | 28.0 s |
| Full decode | clean (no errors) | clean (no errors) |
| Faststart (moov before mdat) | yes | yes |
| Levels (volumedetect) | mean -33.7 dB, max -8.1 dB | mean -44.3 dB, max -10.5 dB |

**Verdict:** the candidate passes and is the recommended cut. I found no reproducible objective fault. The published cut has objective faults: no visible change from 0.05 to 7.0 s or from 21.05 s to the end (about 7 s each), and no visible send of the challenge. Its frames also show "verifier A" before any verifier has been created. The lesson's scored judgments below are reviewer opinions, not measured learning outcomes.

## Method

Frames were extracted at 1 s intervals at native 1080x1920 and at 350 px width for both files (`scratch/02/fresh/{A,B}/{full,s350}`), plus contact sheets. I viewed the candidate's native frames individually at 0, 2, 4, 6, 9, 10, 11, 13, 15, 16, 17, 19, 21, 23, 25, 27, 30, 32, 34, 36, 38, 41 and 42 s, and its 350 px frames at 4, 9, 13, 15, 19, 27, 32 and 36 s. For the published cut, I viewed native frames at 0, 8, 15 and 27 s and 350 px frames at 0, 9 and 27 s, alongside its full contact sheet. Each transition was then checked at exact frame indices; seeking by time can land on a neighbouring frame:

- verifier leaves the generator: frames 168–198 (5.6–6.6 s);
- request envelope crosses the client boundary: frames 507–543 (16.9–18.1 s);
- server clears challenge A: frames 590–645 (19.7–21.5 s);
- padding glyph drops out: frames 952–985 (31.7–32.8 s);
- attempt‑row pulses: frames 36–54, 866–890, 1146–1164;
- the final fade, measured as per‑frame mean luminance over the last 25 frames.

Static stretches were measured as the mean absolute difference between consecutive frames at 108x192 grayscale; a stretch counts when the difference stays below 0.05 for 2 s or more. Audio was analysed only, with RMS onsets in 25 ms windows, per-second peaks, spectrograms (`A_spec.png`, `B_spec.png`) and volumedetect. **I did not hear either soundtrack.**

## Candidate timeline (encoded evidence)

| Time | Visible event | Analysed sound |
|---|---|---|
| 0–1.2 s | Empty, dimmed stage: Client with "crypto random", "per-attempt records" and "S256 · one-way" (ASCII → SHA-256 → base64url), plus a dim Authorization server | silence until 1.2 s |
| 1.3 s | "attempt A" row appears with a ripple (frame 39) | onset 1.2 s |
| 2.2–4.4 s | Eight byte cells churn in blue shades, then settle (4 s) | 17 soft ticks 2.2–4.3 s, settle at 4.4 s |
| 6.0–7.6 s | "verifier A" chip carries the settled byte pattern into attempt A's slot (pattern matches cell for cell) | onsets 6.0, 6.8, 7.6 s |
| 9.6 s | "stays in client" appears on the client boundary | 9.6 s |
| 10–13.9 s | Dot travels from the verifier A row to ASCII; ASCII, SHA-256 ("hash"), base64url light in sequence | 10.5 s; ticks 11.75–12.75 s; 13.4 s |
| 13.9–15 s | "=" glyph drops out of base64url; "no padding" appears | 13.9 s |
| 15.2 s | "challenge A" chip emerges below the pipeline, inside the client | 15.15 s |
| 17.4–18.5 s | Chip rides an "authorization request" envelope with an "S256" tag out of the client to the server, which then reads "challenge A · S256" | 17.45 s; 18.45 s is the loudest event (-13.5 dB) |
| 20.5–21.5 s | Server label fades back to dim | none |
| 22–24.5 s | "attempt B" row; byte cells churn in amber with a different pattern | 22.0 s, ticks, 24.45 s |
| 25.9–27.6 s | "verifier B" chip, distinct pattern, lands in attempt B's own slot; attempt A row pulses | 25.85, 26.65, 27.35 s |
| 28.9–34.8 s | Dot from verifier B; amber pipeline with padding drop; "challenge B" chip | 27.95–34.8 s |
| 35.8 s | Server reads "challenge B · S256" | 35.8 s (-13.5 dB, tied loudest) |
| 37–41.9 s | Server dims; both verifier rows stay in client; attempt rows pulse at 38.4 and 39.0 s | 38.4, 39.0 s; silent after 39.1 s |
| 41.9–42.57 s | Stage fades to title only; final 7 frames settle | none |

Every analysed onset lines up with a visible event within about 0.1 s. The server fades at 20.5 and 37 s and the final stage fade have no sound, which suits passive fades. The longest stretch without visible change is under 2 s.

## Scores (reviewer judgment, 1–5)

| Criterion | Candidate | Published |
|---|---|---|
| Causal clarity | 5 | 2 |
| Accuracy to scope | 5 | 2 |
| Pacing | 4 | 1 |
| Visual legibility (1080 and 350 px) | 4 | 4 |

## Concrete comparison

**Causal clarity.** The candidate shows each claim as a cause followed by its effect. The verifier comes out of visible random bytes (2.2–4.4 s), and the same byte pattern lands in attempt A's slot (7.6 s). The verifier visibly feeds the S256 pipeline (10–14 s), and only the derived challenge leaves the client boundary for the server (17.4–18.5 s). The published cut shows "verifier A" inside CLIENT APP from frame 0, before its first caption says to create one, and nothing is generated on screen (0–7 s static). Its derivation is a progress bar under CLIENT APP (14–21 s), and then the label swaps from "verifier A" to "challenge A" (21 s). That swap can read as the verifier being replaced, although "verifier A stored" in LOGIN ATTEMPT A partly offsets it. The published cut has no server, so "Send the challenge first" (21–28 s) relies on caption text alone.

**Accuracy to scope.** The candidate covers every required point. Each attempt gets fresh, unpredictable bytes, and attempt B's pattern differs from A's. Each verifier has its own per‑attempt record. S256 appears in order as ASCII → SHA-256 → base64url with "no padding" and an explicit padding drop. The figure is labelled "one-way", and no encryption wording appears. Only the challenge goes out, tagged S256, while both verifiers remain under "stays in client". It adds nothing about token exchange or binding. The published cut omits the S256 steps, padding, the server, and the separate later attempt the takeaway promises. Its captions mention token exchange, a later mechanism, at 7–14 s. The published cut contains no factual errors, but it shows less than half of the required scope.

**Pacing.** The candidate gives each step 1.5–4 s and repeats the cycle faster for attempt B, so the second pass confirms the pattern. Its 42.6 s is longer than the 28 s lesson slot. The extra time goes to the attempt B contrast, which the brief asks for, and the ending is only about 4 s of hold plus a 0.6 s fade. The published cut is static for about 7 s at the start and about 7 s at the end. Both stretches exceed the 3 s no‑change threshold in the review reference, and the cut ends without resolving anything visibly.

**Legibility.** At 1080, all candidate labels are clear, and the smallest secondary labels ("hash", "no padding", "per-attempt records") remain readable at 350 px. In the moving frames at 6.0–6.6 s, the verifier chip briefly covers the "per-attempt records" label. The request envelope crosses the dashed client border at 17.4–18.1 s. Both occur during motion and read as the object leaving one region and entering another. At 31.7–32.8 s, the "=" glyph is about 60 px at 1080 and only a few pixels at 350 px. The published cut uses large, clean type, but it depends on two caption lines to carry the lesson.

**Sound (analysed only).** The candidate maps sound to events consistently: soft ticks while random bytes churn and while hashing, a firmer hit for storage, and the loudest events when the challenge reaches the server (18.45 and 35.8 s, -13.5 dB). Its peak is -8.1 dB, well clear of clipping. The published track has five onsets, ending at 18.1 s, and sits below -60 dB for 97% of its duration. Its caption change at 21 s has no sound.

## Objective faults

Candidate: none found.

Published cut (comparison context only, not a blocker for this candidate):

- no visible change for 6.95 s (0.05–7.0 s) and 6.95 s (21.05–28.0 s);
- "verifier A" is visible from frame 0, before creation;
- no challenge leaves the client;
- the caption change at 21 s has no sound.

## Optional improvements (candidate, not blockers)

1. **Keep the server's received challenges** (20.5–21.5 s and 37 s, S). The server fades back to dim and drops "challenge A" before attempt B begins, and drops "challenge B" before the end. Keeping each received challenge as a dim per‑attempt line would make the ending show "verifiers stay here, challenges went there" in one frame.
2. **Make the verifier-to-ASCII link more visible** (10.0–10.5 s, S). The dot from the verifier A row to ASCII is small and faint at 350 px. A short copy of the chip pattern entering ASCII, while the original stays in its slot, would show more clearly that the challenge is derived from this verifier.
3. **Enlarge or slow the padding drop** (13.9 s and 32.1 s, S). The "=" glyph is small at 350 px. A slightly larger glyph that falls clear of the S256 group border would make "no padding" visible without words.
4. **Consider removing the "PKCE · S256" subtitle** (whole video, S). It is small and informative, but the brief asks to avoid decorative subtitles, and the pipeline already shows "S256 · one-way".
5. **Coordinator note.** `lessons.json` item 2 still lists duration 28 with beats at 0, 7, 14 and 21 s, and its captions mention token exchange. If this cut is promoted, the coordinator should update the duration, beat times and text to match 42.6 s. The candidate's first-attempt events land near the existing beat times (storage about 7.6 s, derivation 10–15 s), but the send arrives at about 18 s and attempt B has no beat yet.
