# Sequence rollout — final validation

The approved scope is Option A on all 18 topics, 91 focused video lessons, remote branch push, and verified GitHub Pages deployment. Publication is still pending.

## Current evidence — 20 October 2026

- All 91 final encodes completed. `scripts/check_sequences.py` passed every lesson: source/media/poster hashes, full decode, dimensions, duration, audio levels and faststart. Audio was analyzed, not auditioned.
- `scripts/check_sequence_layout.mjs` passed 1,510 font measurements. Independent visual reviews inspect encoded native and 350px frames separately.
- Production build and `scripts/check.py` passed 18 concepts, 39 pages, all local links/anchors and current sequence evidence. Original 54 comparison videos pass their existing hash-bound checker.
- Final browser run passed all 18 topics and 91 lessons (`reviews/sequence-browser-checks.json`). It exercises every lesson playback, selection without scroll/player movement, prior-video pause, browser Back, query/legacy links, mobile and no-JavaScript access.
- Load-balancing's six original sequence encodes were moved unchanged from pilot paths. Relocation proof: `load-balancing/relocation-checks.json`.
- Final reviews have cleared harness/loop/context, tools/memory, human/traces and evals. Orchestration's final caption repair is verified; all orchestration/permissions blockers are closed. Cache/queues/idempotency and canary/OAuth reviews also passed. Replication/retries repair verification also passed. All final review groups are complete; `final-review-coverage.json` binds all 91 encodes to their evidence. Reports retain historical findings followed by hash-bound repair supplements.

## Remaining

1. Final independent verdicts inspected; no remaining blocking defects in the reviewed scope.
2. Browser validation and desktop/phone inspection completed.
3. Commit and push `codex/load-balancing-sequence`; publish via the existing main-branch Pages workflow.
4. Verify the deployed commit, all 223 release files and live browser behavior for all 91 lessons. Record evidence before marking complete.

No push or deployment has been performed for this rollout yet. The original comparison cuts and layout exploration images are retained.

Desktop and 350px phone captures were visually inspected: direct navigation is visible, supporting text is collapsed and the player fits the available width. Committed examples: `side-index-desktop.png` and `side-index-phone.png`.

The final queue03 caption repair passed targeted independent native/350px review, media/source validation and browser playback through its ended event. Production build, strict checker and all 1,510 text measurements passed again after this final media change.
