# Launch editorial review — 19 October 2026

All 18 concepts were retained after review: 12 core chapters for early team adoption and six reference chapters for a specific integration or systems problem. Each guide now connects the mechanism to a manual-to-agent workflow, human responsibilities, boundaries, primary sources and an exercise with observable success criteria.

## Video comparison

The release contains 54 videos: 18 retained originals, 18 independently authored Astra alternatives, 13 Fable alternatives and five Sol alternatives. Sol completed five alternatives after Fable provider rate limits interrupted production; unfinished attempts are excluded from publication. Fresh comparison reviewers inspected encoded contact sheets, causal transitions and full-resolution and 350px frames, corrected defects, and recorded recommendations and final file hashes. The canary comparison was completed by a fresh Sol reviewer after the preceding review was interrupted; attribution is retained.

Astra is recommended for 17 chapters; Sol is recommended for OAuth PKCE. These are judgements about these particular encodes, not rankings of model families. All three passing cuts remain available for each chapter.

## Decisions and repairs

Every concept received corrections to a video, transcript or supporting lesson. The table highlights a repair per chapter; linked comparison records enumerate all corrections, affected variants, limitations and preserved provenance.

| Concept | Placement | Recommended | Example correction |
| --- | --- | --- | --- |
| [Harness engineering](comparisons/harness-engineering.json) | core | Astra | Baseline: added Resume work / HARNESS ENGINEERING identification and a full-frame fade; rerendered and regenerated its poster while retaining the original lesson and cue timing. |
| [Loop engineering](comparisons/loop-engineering.json) | core | Astra | Baseline: added orientation, distinguished amber continuing feedback from green PASS, separated independent budgets by a labelled fade, changed the success endpoint to Review and shortened its final hold. |
| [Context engineering](comparisons/context-engineering.json) | core | Astra | Baseline: corrected inconsistent post-compaction token totals (5k/7k to 9k/11k) and replaced an unsupported green check with Patch?. |
| [Tool design](comparisons/tool-design.json) | core | Astra | Astra: inset response and request routes so large chips no longer intrude into node borders at departure and arrival. |
| [Memory architecture](comparisons/memory-architecture.json) | core | Astra | Baseline: restored the missing topic title; made stale B amber from storage correction at 17.4s until retrieval completes at 21.3s, including removal of pulse colour reversion found during reinspection; improved inactive-thread visibility. |
| [Orchestration patterns](comparisons/orchestration-patterns.json) | core | Astra | Fable: mark old tests/docs stale at 6.3s instead of preserving green validation over changed code. |
| [Guardrails and permissions](comparisons/guardrails-and-permissions.json) | core | Astra | Fable: reduced allow/deny port ripples so they do not cross the teaching-critical grant label; enlarged and brightened rule/grant text; retained visibility of the untouched database after denial. Rerendered and regenerated poster. |
| [Agent evals](comparisons/agent-evals.json) | core | Astra | Fable: enlarged test and grader text and stores for 350px legibility, repositioned gutter marks and verdict, and rerendered MP4/poster with original model provenance preserved. |
| [Human-in-the-loop](comparisons/human-in-the-loop.json) | core | Astra | Fable: moved deploy-node label out of moving packet paths. |
| [Observability and tracing](comparisons/observability-and-tracing.json) | core | Astra | Baseline: corrected retry 2 to attempt 2 at 17.0–17.6s; rerendered, regenerated poster and clarified the transcript while retaining unrecorded original-model provenance. |
| [Load balancing](comparisons/load-balancing.json) | reference | Astra | Astra: replaced ambiguous cumulative calls labels with assigned, and clarified the transcript. |
| [Cache-aside](comparisons/cache-aside.json) | reference | Astra | Baseline: added a topic title and caller/TTL labels; made the lifetime bar drain continuously from each fill without hit renewal; rerendered and regenerated the poster. |
| [Queues and backpressure](comparisons/queues-and-backpressure.json) | reference | Astra | Baseline: replace the stopped-consumer ending with D dispatch and execution while E waits; update both transcripts and preserve the unknown original model provenance. |
| [Idempotency](comparisons/idempotency.json) | core | Astra | Fable: replaced an ambiguous fade-only counterfactual transition with a local animated rewind overlay at 15.86–17.16s; updated the transcript and beat sheet to distinguish an alternate run from rollback. |
| [Replication and consistency](comparisons/replication-and-consistency.json) | reference | Astra | Sol 4.1–5.9s, 18.6–20.4s and 27.5–29.3s: removed the visual ambiguity between application version delivery and the crossing database-copy link; compact vN chips follow a green check-to-tool wire. Re-rendered and re-inspected the encoded result. |
| [Timeouts and retries](comparisons/timeouts-and-retries.json) | core | Astra | Baseline: improved 350px state/packet/limit legibility and cleared moving-chip/caption spacing; shortened idle backoff; reset stale success before retry; cleared spent delay; changed full-frame fade; rerendered the 21s MP4 and poster and matched its transcript. |
| [Canary deployments](comparisons/canary-deployments.json) | reference | Astra | Earlier partial review, gpt-6-astra comparative review: Astra 00:14.50 metric-centred ripple replaced by border emphasis; confirmed clear in the current encode. |
| [OAuth PKCE](comparisons/oauth-pkce.json) | reference | Sol | Baseline: replaced invalid_grant for an absent verifier with NO TOKEN; moved the intercepted-code chip below actor labels at 00:09–00:09.8; corrected the local engine’s full-frame endpoint fade. Rerendered with bounded FFmpeg threads and attenuated audio. |

## Release evidence

- Full build: 18 guides and 39 HTML pages. Internal links, fragment targets, media manifests, primary-source URLs and hash-bound review records passed the release checker.
- All 54 MP4s passed full decode, codec/dimension/frame-rate, faststart, audio-headroom and exact loop-boundary checks. All 54 portrait posters are present and hash-bound to review evidence.
- Index, CSS, JavaScript and three local fonts total 131,947 bytes uncompressed, within the 220 KB budget. Each video is below 3 MB; native controls use no autoplay and preload none.
- Local desktop, tablet and phone checks covered reading layout, keyboard skip links, comparison playback, one-player-at-a-time behaviour, empty/reset states and missing-media recovery. See [UI review](ui.md).
- Public deployment and live browser checks are pending in [the launch checklist](../docs/launch.md).

## Limits

Visual pacing and clarity were assessed from encoded frames and timelines by model reviewers; this is not a human audience study. Audio peaks and structure were analysed, but no listening judgement is claimed. Native browser playback checks establish that a cut starts and buffers; full file integrity is established separately by decode checks. Technical learning examples remain bounded by the caveats in each guide and comparison record.

The editorial workflow prepares future agents to submit reviewable changes. No recurring automation or autonomous publishing schedule has been created.
