# Final comparative review

Completed 2026-10-19 by gpt-6-astra comparative review. The source-blind record is [before.md](before.md); the reader-facing decision and final MP4 hashes are in [the comparison](../timeouts-and-retries.json). Original authored data is preserved under `original-sources/`. Original baseline media is retained in ignored `scratch/baseline-before.mp4` and `.jpg`.

## Decision and scores

Recommend Astra as the main chapter entry. Its shared budget and unknown outcome directly address this audience’s decision: where to enforce a stopping rule when an agent can ask again. Keep Sol as the clearest explanation of layered retry amplification, and the revised baseline as the clearest explanation of late completion after timeout. No cut needs to duplicate the others.

| Final cut | Clarity | Accuracy | Pacing | Visual |
|---|---:|---:|---:|---:|
| Baseline, 21s | 4 | 5 | 4 | 4 |
| Astra, 26s | 5 | 5 | 4 | 5 |
| Sol, 32s | 5 | 5 | 4 | 4 |

Accuracy scores assess what each scoped example actually claims, not whether it covers the entire chapter. Visual score is phone legibility and causal focus, not decoration. Pacing has room for improvement without a forced revision quota: baseline needs eye travel between timeout and server; Astra’s countdown is quiet but earns its time through arithmetic; Sol’s fast timeout labels rely on persistent tokens and its final hold is slightly long.

## Encoded beat and transcript reconciliation

**Baseline:** 1.2s first send, 2.7s server completion, 2.8s reply and 3.8s acceptance. At 6s the prior scenario resets; 7s begins a distinct slow read. Local timeout at 10s coexists with remote WORKING. Remote completion at 12s, response at 12.2s, and rejection at 13.2s demonstrate that local timeout did not cancel work. A 4.5s sampled wait ends at 14.5s; the service resets before retry, which succeeds at 17.1s. Success holds until 19.5s, then the entire image fades. The final 21s transcript matches these beats. No overall deadline, exhausted retry path, fleet jitter or write-safety proof is claimed. The final spacing pass moved the limit caption above its counter, clear of enlarged request chips at dispatch.

**Astra:** Normal result occupies 0–7s. A new operation begins at 8s; first attempt waits to 13s. The sampled wait from 13–15s consumes two seconds of the same budget, leaving five. Second attempt ends at the operation deadline, 20s. STATUS UNKNOWN reaches the agent around 21.1s; a repeated request at 22s is blocked at the runtime around 22.6s, with no third downstream dispatch. The five transcript ranges agree with actual encoded states. The small white marker near the budget is unexplained but not a blocker; the separate five-second per-attempt cap is supplied by the guide rather than a dedicated timer.

**Sol:** Normal response precedes the unresponsive scenario at 5.3s. Between 5.3–16s, two agent invocations each cause three downstream calls, visibly accumulating six tokens. At 16s the policy changes, then the six-second downstream budget runs from 19.1–25.1s. Waits at 20.1–21.4s and 22.4–24.2s consume that budget; the third attempt at 24.2s has only 0.9s left. STOP at 25.1s, failed tool result around 25.8s and Hand off around 26.35s match the revised text. The result holds to 29.6s and fades before 32s. “Unresponsive” is an observed missing reply, not evidence of remote nonexecution. Revised only this distinction and the mistaken description of the truncated interval; preserved the scene, media and `gpt-6.1-sol` authoring provenance.

## Evidence and limits

`verify.py` fully decoded all three final audio/video files, generated every-frame checksums, compared exact decoded first/last images, checked codecs/dimensions/rate/pixel format, verified moov-before-mdat streaming layout, and inspected all posters. The final files are H.264, 1080×1920, 30fps, yuv420p, AAC, faststart. Counts are 630/780/960 frames. Each first/last pair matches exactly. Peak levels are −7.7/−5.6/−5.8 dBFS, all below −0.5 dBFS. Results and hashes are in `encoded-verification.json`.

Viewed complete final beat contact sheets (baseline 4, Astra 4, Sol 6), exact boundary frames, full-size causal/busy frames and their 350px derivatives. Final baseline source changes were reviewed against its actual rerendered MP4. Viewed all three final posters and audio spectrograms. Source event times were checked against decoded audio energy windows: 29/38/56 scheduled cues have energy; overlapping cues cannot be individually established by this measure. Audio was not physically heard, and these checks do not establish perceived sound quality. This is a frame-and-timing review, not a claim of human real-time playback.

The review is source/review-blind only: user-provided identifiers and provenance could not be unlearned. Authors’ scores were not used. No unfinished attempts were inspected. No other topic, shared application/build source, Git state, installed skill or publication was changed.

## Browser verification

Checked the chapter and comparison generated by the actual shared renderer into topic-only scratch, using the final guide, metadata, comparison and media. At 1440px and 390px, both pages have no horizontal overflow or JavaScript errors. All media load at 1080×1920 with expected durations, and seeking to 10.5s/14s/14.3s succeeds. The chapter selects Astra; comparison exposes all three transcripts, limitations, revision attribution and GPT-6.1 Sol production provenance. Viewed desktop and phone screenshots, expanded sequences and phone exercise text. Native paused-player controls temporarily obscure the lowest auxiliary captions; encoded 350px frames remain clear.

The initial Python preview server did not support HTTP range requests, causing intermittent seek resets. Repeated the checks with the review-local range-capable server; final evidence records successful seeks. No application source changed. `browser-verification.json` records the result. Connected chapter navigation is omitted from this isolated preview; unrelated pages and the complete release build were not tested.
