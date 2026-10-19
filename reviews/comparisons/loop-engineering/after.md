# Loop engineering: completed comparative review

Reviewer: gpt-6-astra comparative review, 2026-10-19. Recommend **Astra — Evidence first** as the chapter entry. Keep the concept **core**, and retain Baseline and Fable as complementary explanations of call budgets and repeated evidence.

The blind findings were saved in [before.md](before.md) before reading author scenes, reviews, scores or provenance metadata. Cut A was baseline, B astra, C fable. The reviewer subsequently edited all three, so this final verification is not an additional independent review. Original authorship remains in variant metadata; changes carry `editedBy` and correction records. Original author files and judgments are retained in `original-sources/`; earlier review notes are marked historical.

## What readers learn from each cut

| Cut and final time | Observed teaching | Comparative judgment |
|---|---|---|
| Baseline 0:01–0:10.4 | Three tool calls drain a visible budget; amber RETRY feeds back, then the route ends at Stop. | The clearest introduction to finite attempts. Generic Result/Tool labels cannot teach whether feedback is valid or why another edit is justified. |
| Baseline 0:12.4–0:20.5 | A fade and Run B label separate a new allocation; PASS exits to Review with one call left. | The reset no longer implies an exhausted agent can refill its own allowance. Success need not consume the full budget. |
| Astra 0:02.5–0:05.7 | A failed assertion travels through FAIL → EDIT; patch 0 becomes patch 1. | This connects observed evidence to an allowed action more directly than a generic loop or falling failure count. |
| Astra 0:05.7–0:12.5 | The gate returns to WAIT while patch 1 is untested; a fresh run yields 12 passed and PASS → REVIEW. | Strongest entry lesson: evidence belongs to a patch, and passing selected tests leads to review. The earlier stale edit permission was corrected. |
| Astra 0:16.8–0:25 | Zero selected tests / exit 5 blocks the return path; patch 0 remains unchanged; the engineer receives the handoff. | Strongest failure boundary. Missing validation is not an assertion to repair. The repair-only workflow stops; a separately scoped diagnostic workflow could investigate. |
| Fable 0:03.5–0:12.5 | The log retains 5 FAIL, 2 FAIL, PASS; REVIEW reaches the human. | Better than the others at showing memory across attempts. Fixed selection makes the illustrative counts comparable, but a declining count alone remains an incomplete progress measure. |
| Fable 0:17.9, 0:21.3, 0:24.7–0:29 | Three matching `3 FAIL · a7` entries reach REPEAT LIMIT, then HAND OFF leaves the retained trace for the human. | Useful second lesson after Astra. Matching reports replace the unsupported equal-count/no-progress inference. The threshold is configured policy, not proof that another repair cannot work. |

## Revisions and remaining limits

Baseline gained an orientation title, amber continuing feedback versus green PASS, labelled independent runs, an explicit Review endpoint, and a shorter ending. Astra consumes the edit permit when creating the new patch and accurately calls the unmatched-keyword result zero **selected** tests. Fable uses a fixed suite and an illustrative repeated-report identifier, labels its stopping threshold, enlarges log/chip text, and adds the successful review handoff. Whole-frame fades provide clean boundaries. The installed skill and shared app/build files were not edited.

At 350px, Astra has the largest and most explicit state text. Baseline's budget caption is small, although bar depletion and Stop are easy to follow. Fable's enlarged log is readable on inspection but demands more attention; its moving chips are roughly 11px text and are not ideal for a first exposure. Log rows persist after each moving result, which gives viewers another chance to read. There is no unresolved causal-label overlap in the inspected busy frames.

Astra's roughly four-second final stopped-state hold helps readers connect patch 0, the blocked wire and engineer. Baseline now holds the successful endpoint about three seconds before fading. Fable spends longer establishing two histories and ends with the retained log and human receipt; this is useful evidence context, but slower and denser than Astra. The cuts deliberately teach different mechanisms rather than covering every part of the guide.

| Final score (1–5) | Clarity | Accuracy | Pacing | Visual |
|---|---:|---:|---:|---:|
| Baseline | 3 | 4 | 4 | 3 |
| Astra | 5 | 5 | 4 | 5 |
| Fable | 4 | 4 | 4 | 4 |

These are editorial judgments, separate from objective format verification. Astra's accuracy score applies to its bounded illustrative scenario, not a proven agent implementation. Fable still needs the transcript/guide to explain what `a7` represents. Baseline intentionally omits evidence classification and blocker handoff.

## Transcript and publication checks

All current transcripts are timestamp/text objects using numeric `start` and `end`. Read-only inspection of `scripts/build.py` confirmed that `start` is accepted. Baseline's standalone transcript matches its variant transcript. The sequences were compared against the decoded beat frames, not merely against scene code:

- Baseline: depleted Stop at 0:10.5; new Run B visible at 0:13.7; PASS at 0:19; Review at 0:20.5.
- Astra: patch 1 / WAIT / untested at 0:06.5; PASS → REVIEW at 0:10.7; engineer review at 0:12.5; zero selected at 0:17; blocked return at 0:19; engineer handoff at 0:21.5.
- Fable: accumulated observations at 0:03.5, 0:07.2 and 0:10.7; human review at 0:12.5; three matching reports at 0:25.4; REPEAT LIMIT and handoff at 0:26–0:27.5.

Transcripts distinguish explanatory context from literal graphics: the envelope **represents** command/log evidence, `a7` **represents** a normalized assertion report, and the green human indicates receipt rather than blocker repair. No cut is described as automatically merging a change.

[Source checks](source-checks.md) map the claims to primary documents actually opened. The pytest selection distinction was also reproduced locally. Long verbatim excerpts in Fable's evidence note were replaced with concise linked paraphrases, preserving claim boundaries and attribution. Other topic evidence/production notes were inspected for the same issue. No productivity result, optimal threshold or convergence guarantee is claimed.

## Encoded verification and evidence

All three final MP4s were decoded in full, including audio. All frame hashes were recorded; exact first and last decoded frames match and are black. The first/last images and regenerated JPEG posters were also visually inspected. All files are H.264, 1080×1920, 30fps, yuv420p with AAC and `moov` before `mdat` for faststart. FFmpeg codec/filter thread limits were two. The checked bytes were copied to `public/media/loop-engineering/`, then their SHA-256 values were checked again.

| Cut | Duration | Frames | Decoded sample peak |
|---|---:|---:|---:|
| Baseline | 24.000s | 720 | −2.037dBFS |
| Astra | 28.000s | 840 | −4.026dBFS |
| Fable | 30.766667s | 923 | −2.712dBFS |

All peaks are below −0.5dBFS. Spectrograms and 137 cue windows were examined analytically; no audio was heard. Cue-window activity verifies signal near scheduled cues, not subjective mix quality or exact perceptual synchronization.

Final inspection covered decoded one-second contact sheets, every selected causal beat at 350px, full-size failure/permission/transition/review/handoff frames, busy log states, endings, and exact boundaries. `encoded-evidence/` retains contact sheets, all phone-size samples and strips, selected full-size frames, spectra, stream reports, cue measurements, timelines and full frame hashes. `encoded-checks.json` holds the measurements; the adjacent machine-readable comparison holds final MP4 hashes.

An apparent missing-title problem in multi-image inspection was falsified by individual full-size views and decoded pixel comparisons, as recorded in the appended correction to the blind notes. Every decoded frame's title region was checked outside intentional fades; maximum mean absolute differences were below 0.38/255. No title-loss fix is claimed.

Limits: the diagrams are illustrative, no real model repair was demonstrated, and no target-team audience study or listening test occurred. Complete decode is not equivalent to manually viewing every frame. Runtime enforcement, coverage adequacy, cancellation and repeat-fingerprint validation remain implementation responsibilities explained in the guide. Keep this chapter core because bounded, evidence-driven iteration is a prerequisite for delegating repeated edits; teach the harness prerequisite first.
