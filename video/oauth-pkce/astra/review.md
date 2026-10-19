# Astra PKCE review — final encode

Author/reviewer: gpt-6-astra, high reasoning. Date: 2026-10-19. Self-review of one independent cut; no model comparison or recommendation claimed.

## Fixed before handover

- **14.0–18.0, 24.1–28.4 (S):** comparison text originally intersected the server's lower border at y=1545. Moved it to y=1610 and the outcome to y=1740; re-rendered preflight stills and inspected before encoding.
- **13.0–14.0 (S):** the free-standing S256 label occupied a moving packet's path. Incorporated S256 into the server heading, leaving the path clear.
- **0–6.4, 18–30 (S):** the second lane originally remained visible without its client. Its wire now appears and clears with login B, removing a false active path.
- **All beats (M):** default engine chips were too small for this lesson. The local copy uses 44px labels and taller packets. Six preflight frames and one full-size busy still were inspected, followed by revised preflight sheet inspection.

## Teaching improvements applied, ranked by impact

1. **11.4–15.3 (M):** make the verifier cross visibly from B toward A before the combined request travels. A low rejection sound accompanies the unequal comparison. This ties failure to wrong transaction ownership, not a randomly failing server.
2. **18.0–23.1 (M):** clear the old local records and create fresh C, including its challenge/code exchange. This avoids implying that a rejected code can safely be redeemed again. The blank server display is abstraction, not revocation.
3. **14.0–18.0 (S):** dim the unrelated code B association while code A's expected challenge stays prominent. This concentrates attention on the actual comparison.
4. **26.4–28.4 (S):** hold the successful state for two seconds before the closing fade. This gives the correct pair time to register after the longer failure example.

No remaining blocking visual defect found. No unimplemented improvement required for this lesson. Adding browser consent or access-control flows would be a different lesson and would overcrowd this cut; those boundaries are explicit in the written guide and transcript.

## Encoded review and evidence

Final MP4 SHA-256: `99dde72f7d99c5d5b048e50c277c14f7328e28861c11844b375b7fd126235129`.

- 30.000 seconds, 900 frames, 1080×1920 at 30 fps, H.264 yuv420p and AAC; 513,169 bytes (<2 MB).
- Entire file decoded with `-xerror`, no warnings. Decoded RGB first/last frames are byte-for-byte equal. MP4 moov precedes mdat.
- Audio peak −6.7 dBFS. 34 scheduled cues each have non-silent decoded audio in their onset window. Mono cue-window values use downmix and are not the stereo stream peak.
- Inspected the encoded 30-frame contact sheet, full-size beat images, the busiest packet still, and six separate 350px images at 5.4, 10.5, 13.5, 16.5, 22.5 and 26.8 seconds. No clipped/overlapping labels or stale semantic state found after fixes. Main content labels are 44–52px at native width; host/subtitle labels are 40px.
- The spectrogram shows the short send/arrival notes, low rejection at 14.0/15.3, recovery sweep at 18.5, and resolved exchange at 24.1–26.4. Source scheduling pairs these events with motion on the same timeline; decoded onset windows confirm sound is present. This is analytical synchronization review, not a perceptual latency study.
- Holds after arrivals are deliberate and approximately 1.3–2.7 seconds. There is no unexplained frozen passage longer than three seconds.
- Poster is extracted from the encoded movie at 24.6 seconds. Verification measurements and poster hash are saved in verification.json; frame/spectral/cue evidence is in ignored scratch/ and reproducible via verify.py.

## Honest limits

Audio was **not physically listened to**. No real OAuth provider was exercised. The scenario is illustrative, with A/B/C standing for long random values. “Hash” means S256 including base64url encoding. Matching PKCE only permits remaining OAuth checks; final issuance assumes those checks pass. The film omits browser consent, redirects, issuer/CSRF handling, scopes, token storage lifecycle and resource authorization. It does not claim PKCE makes arbitrary agent actions safe. Secret storage belongs to the host, not prompts.

Review is by the author, not an independent reviewer. No baseline media or other variant scene was inspected, so the claim of independence is about authorship and example choice, not a comparative quality judgment. Shared build/UI/media-check manifests were outside scope; equivalent cut-specific checks were run locally. Installed skill files were never modified.
