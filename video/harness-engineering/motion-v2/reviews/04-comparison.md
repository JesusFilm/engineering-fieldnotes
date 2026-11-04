# Video 04 — encoded-first comparison

Reviewed 2026-10-20. **Recommend the candidate for this intended mechanism. No supported candidate blocker remains after pixel-level reconciliation; the original dropout finding is withdrawn.** Neither author source, prior reviews, provenance, other plans, nor production.json was consulted for this comparison. No media was edited.

## Bound artifacts and method

| Artifact | SHA-256 | Encoded properties |
|---|---|---|
| Candidate: `video/harness-engineering/motion-v2/04/video.mp4` | `70e0205e1d586d3cc4a81ff740395f12716410e557bbc32520e0f534761f8608` | 42.777007s container duration; 1080×1920; 30fps; audio present |
| Published: `public/lessons/harness-engineering/04.mp4` | `2cd1bed8d11bf924ef5a96c1a2a790e4bafa0e4eb776c1ecbaaa130139ef2dfb` | 28s; 1080×1920; 20fps; audio present |

Both hashes were checked again after inspection and remained unchanged. Both fully decoded with `ffmpeg -v error -i INPUT -f null -`, exit 0 and empty error output. Both have moov before mdat. Candidate audio maximum −6.4dB, published −12.9dB; neither clips by sample-peak analysis. Audio was analysed, **not heard**; sound quality and perceptual synchronization are not certified.

Evidence is under [scratch/04](scratch/04/): probe/hash/decode data in `inspection.json`, container atom offsets, audio analysis, 3-second overview sheets, 1fps 350×622 frames, full-resolution selected frames, and 2fps transition sheets. Individual 350px images were inspected independently of sheets, which the image viewer may resize. Full-resolution frames inspected include candidate 17, 24, 33s and published 26s. Transition strips inspected: candidate 14–18, 23–28, 30–35s and published 20–27.9s. Additional exact-time, output-seek extractions at 33, 35, 35.5, 36, 40s were initially misread through the image display; subsequent pixel-level checks disprove dropout (see correction below). Review is sampled encoded-frame inspection plus full decode, not a claim to have watched every frame continuously. Broad 1fps filenames are sample indices, not exact timestamps; `full-*` and `exact-*` filenames specify seconds.

## Intended mechanism and comparative judgement

Cross-tenant invoice request: expected 403, actual 200; concrete feedback reaches an agent; ownership condition is added while authentication remains; repair is unverified until the same request returns 403; only one scoped test passes.

Scores are editorial judgements, not factual verification: 1 absent/poor, 3 usable with limitations, 5 exceptionally clear. Candidate legibility score is corrected after the unsupported encoded-defect finding was withdrawn.

| Axis | Candidate | Published | Evidence and consequence |
|---|---:|---:|---|
| Causal clarity | 4/5 | 2/5 | Candidate 0–14s keeps tenant B, invoice #7 owned by A, and GET /invoices/7 visible; 200 response contains the other tenant's invoice. At ~17–18s expected/actual chips move into the Agent · auth check panel. At 23–27s the conjunction appears; ~30–34s the same request runs and only then passes. Published ~6–13s carries a mismatch chip between generic boxes, but never depicts invoice ownership, the actual request, or the actual repair. |
| Accuracy against the intended lesson | 4/5 | 3/5 | Candidate preserves `allow if signed_in` and adds `+ and tenant == owner`; amber unverified persists into the replay. Response 403 precedes green `PASS · 1 test`, rather than patch creation implying success. Published does keep patch unverified and later says `403 check passed`, but at ~21–25s its caption already says “Now it returns the expected 403” while the test still says new run pending. |
| Pace | 4/5 | 3/5 | Candidate's ~43s gives distinct setup, failure, feedback, edit, and rerun phases; the ~23–27s repair hold supports reading the conjunction. Final success appears around 33–34s and lasts toward 40s, longer than needed but intact in the decoded pixels. Published is shorter but gives most of its screen to largely static boxes and captions; its actual green result arrives only around 25.5–26s, leaving a comparatively short resolution. |
| Legibility | 4/5 | 4/5 | Candidate's important numbers, request, repair and one-test qualifier read at native 350px, without explanatory paragraphs. Small panel headers are weaker. The initially reported clipping/disappearance is not supported by the saved image pixels and is withdrawn. Published labels and captions remain readable in inspected 350px frames, though its thin dark wires are weak and prose carries much of the meaning. |

The candidate supplies a much stronger software-native composition: a response pane becomes the agent's code panel and returns to the response pane. The persistent caller, object, and request make the rerun concrete. The expected/actual values are useful feedback, rather than a generic failure lamp. Published uses the repetitive Agent / Access tests / Patch composition and narration-like captions to fill missing causal detail.

## Blockers

### Correction — candidate B1 withdrawn (2026-10-20)

The earlier report incorrectly identified missing graphics/text near 33–36s as an encoded-video blocker. **That finding is withdrawn; no repair or re-encode is required for it.** The initial judgement relied on an unreliable image display rather than establishing that the pixels on disk were missing. This was a review error. The same candidate SHA-256 above still applies; the video was not changed.

Reconciliation consulted `../04/scratch/repro/README.md` and independently checked the original cited files and actual video, without reading author scene code. The reproduction note reports intact input/output-seek frames, steady every-frame luminance until the planned closing fade, and no encoded dropout. Independent checks in this correction establish:

- All five saved 350px `candidate-exact-{33.0,35.0,35.5,36.0,40.0}.png` images are pixel-identical to fresh output-seek video decodes after the same 350px scaling.
- Saved 35.0s and 35.5s images are **exactly pixel-identical**. The earlier claim that one showed the result and the other showed only the title therefore cannot describe those image files.
- Relative to 35.0s, mean absolute RGB-channel differences at 36.0s and 40.0s are only 0.202 and 0.267 on a 0–255 scale. This is inconsistent with the large black regions reported earlier; it does not establish a particular cause for those small differences.
- Independently decoded all 319 frames from 30.0–40.6s at 350px width. Mean grayscale intensity below image row 100 stays within 11.274–13.046, with no body-wide black dropout. This supplements, rather than replaces, the exact-image comparisons.
- Converted the cited PNGs in memory to JPEG through an independent decoding/display path, including the full-resolution 33s PNG. The 33s content reads intact. Some unpadded displays still appeared inconsistent, but a padded JPEG of the cited 35.5s PNG clearly shows the complete invoice identity, response, comparison and `PASS · 1 test`. No alternate images were written to disk.

Original evidence remains unchanged for transparency: [33.0s](scratch/04/candidate-exact-33.0.png), [full 33s](scratch/04/candidate-full-33.png), [35.0s](scratch/04/candidate-exact-35.0.png), [35.5s](scratch/04/candidate-exact-35.5.png), [36.0s](scratch/04/candidate-exact-36.0.png), [40.0s](scratch/04/candidate-exact-40.0.png). Display/loading artefact is the supported explanation category; the precise display-layer cause is not diagnosed. The recommendation and legibility score above have been corrected. The remaining limitations and optional pacing refinements are independent of this withdrawn finding.

### Published B2 — insufficient concrete repair for this brief

The published cut cannot satisfy this specific intended mechanism as the preferred version: it never shows the ownership condition or preservation of authentication, and does not give the request/object identity needed to see the same cross-tenant request replayed. It does teach failure → patch → retest in general. That narrower usefulness should not be mistaken for satisfying this brief.

### Published B3 — success text precedes evidence

At ~21–25s `new run pending` and `unverified` coexist with “Now it returns the expected 403.” This undercuts the intended distinction between proposed repair and observed result. If this cut is revised, reveal the outcome statement only after the result. Evidence: [native 350 pending frame](scratch/04/published-022.png) and `published-transition-20.jpg`.

## Optional candidate refinements

1. **Candidate ~34–40s: shorten the success hold.** Retain about 2–3 seconds of stable `403 = 403 / PASS · 1 test`, then close. Do not shorten the unverified repair/replay phase to compensate.
2. **Candidate ~16–19s: strengthen the agent-panel handoff.** The migrating expected/actual chips are clear, but the small `Agent · auth check` header is the only cue that the same rectangle changed roles. A modestly larger header or a brief panel-edge focus would help beginners. No extra explanatory caption needed.
3. **Candidate ~23–27s: remove or explicitly retire the old lower 200 slightly earlier.** Its dimming plus `unverified` already distinguishes it from current evidence, so this is not a factual blocker. Clearing it as the patch appears would reduce competition with the preserved authentication and new ownership condition.

## Accuracy boundaries and disposition

403 is the contract of this example, not a universal response mandated for every authorization failure. The ownership expression is explanatory pseudocode; it is not proof of production authorization correctness. Preserving signed_in is visible in the proposed edit, but a single negative request does not establish that all authenticated or owning-tenant requests still work. Candidate's `PASS · 1 test` correctly limits the result. Neither cut demonstrates a complete security audit, merge approval, or deployment decision.

**Disposition (corrected):** recommend the unchanged candidate on concrete causal teaching and scoped verification. B1 is withdrawn; no supported candidate visual blocker remains from this review. Audio listening remains unperformed, as disclosed above. Published remains a general-loop illustration with brief-specific gaps and premature result wording. No promotion or media change performed. Re-review any replacement against its new hash; do not carry this verdict forward by swapping hashes alone.
