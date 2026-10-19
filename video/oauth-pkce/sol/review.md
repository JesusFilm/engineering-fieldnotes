# One attempt, one verifier — final render 2

Reviewed 19 October 2026 (Pacific/Auckland). This is the author's own encoded-media review. No independent reviewer or comparative ranking is claimed. The assigned model is gpt-6.1-sol with high reasoning; identity is provenance, not a quality score.

## Fixed before handover

- **02.0–04.3, 05.6–06.4, 11.4–15.0, 17.5–18.3, 22.9–25.8 — moving label collision.** Render 1's contact sheet showed chips crossing the authorization-server header. Moved the header to y=1190 and confined chips to y=890–1120 while dotted lanes continue into the server records. Inspected a fresh still before render 2, then inspected the final encoded contact sheet and full-size beat frames. Chips, arrival ripples, and the header are now separate.
- **00.0 / 31.967 — endpoint equality.** Added a local full-canvas black fade, including the title, rather than leaving the title subject to different endpoint compression. Final decoded RGB frames 0 and 959 match exactly. This was a preventive production improvement; no earlier failed equality check is claimed.

## Teaching improvements applied

1. **10.0–21.9, M — make transaction ownership observable.** The two client attempts keep different verifier/challenge pairs. A verifier visibly crosses from C into B, then the server rejects the B/C combination. The viewer can follow the mistake through motion and distinguish it from the preceding successful exchange. This is a fresh concurrency example; no other variant scene or media was read.
2. **22.0–27.6, M — recover with a fresh transaction.** Clear the failed/unused flows and create D, then show the complete binding/exchange again. This avoids promising that a code can be retried after failed redemption and reinforces that a new sign-in owns a new verifier.
3. **00.9–30.5, S — enlarge protocol values.** Local record cards use 44 px headings, 40 px values and 36 px status; moving chips use 38 px. Final full-size and five separate 350px images show no clipping, overlap or stale status. Letter labels make transaction identity readable without relying only on color.
4. **18.75 / 26.25, S — separate comparison from outcome.** The transformed supplied verifier is compared against the stored challenge before an error or token travels back. The mismatch gets a red jolt and bass thump; successful matches use a rising hit/chime pattern. This makes the token endpoint's decision precede the result.
5. **27.6–30.5, S — let recovery land.** Hold the resolved token state for 2.9 seconds, then fade with a quiet poof. The last beat remains visible long enough to compare with the rejected state before the loop.

No unresolved objective defect was found in the final inspected material. No further meaningful visual change was identified that could be applied without adding another mechanism. A code-interception story would be a different lesson; this cut deliberately concentrates on concurrent sign-in state.

## Encoded verification

- SHA-256: `33c4b6d90080d8ffd807481f827f6784c127ed3284ad5bc70b11dd522bd5ced8`.
- 32.000 s; 960 frames; 1080×1920; constant 30 fps; H.264/yuv420p with AAC stereo. File size 1,062,166 bytes, below the 2,000,000-byte requirement.
- Full-file FFmpeg decode with error escalation completed. Frame 0 and frame 959 are identical decoded RGB. MP4 moov at byte 32 precedes mdat at byte 35480; faststart is present.
- Decoded audio maximum −6.4 dBFS. All 44 scheduled cue windows exceed −55 dBFS RMS. Deterministic-source versus AAC cross-correlation for the isolated mismatch thump at 18.75 s is 0.999781, best lag 0.0 ms at the measurement resolution of 8/44100 s. This is an objective synchronization check, not a listening test.
- Inspected final encoded contact sheet, spectrogram, five full-resolution beat frames (4.6, 8.5, 15.3, 20.9, 28.5 s), and all five separate 350px beat images via view_image. Additional pre-render full-size stills checked moving-chip layout. The contact sheet covers all phase boundaries; opening and closing boundaries were checked as decoded pixels.
- The spectrogram shows separate event clusters through the entire story, strong low-frequency energy at the rejection, and the closing fade cue. Motion and sound scheduling share one timeline. See evidence/cue-checks.json and verification.json for reproducible numerical evidence.

## Honest limits

- Audio was **not physically heard**. Peak, cue energy, synchronization and spectrum were analysed; perceived timbre and device-speaker audibility remain untested.
- The full movie was reviewed through encoded stills, the contact sheet and quantitative timing evidence; no claim of uninterrupted real-time playback is made.
- A–D are symbolic identifiers for fresh, full-length random verifier values. S256 is shorthand for base64url-without-padding of SHA-256 of the ASCII verifier. The crossing verifier illustrates a client storage/association bug; it is not an OAuth attack classification or a measured product failure.
- Browser authorization/consent, TLS, client authentication when applicable, redirect/state/issuer validation, expiry, and scope/resource checks are omitted. A matching verifier allows other OAuth validation to proceed; it alone does not guarantee a token. The server cards represent associations, not a mandated storage implementation.
- PKCE is not agent permission enforcement. The scenario makes no promise about persistent prompts, token theft protection, or allowed resource operations. These limits and a concrete team exercise are in the linked-primary-source beat sheet.
- The encoded cut passes its factual/media checks. Promotion to a recommended library cut and comparisons against other models remain with the coordinator and human editor. No shared build, UI, manifest, installed skill, other variant, or Git state was changed.
