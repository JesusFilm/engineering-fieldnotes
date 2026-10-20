# Sequence rollout — published and verified

Scope: Option A on all 18 topics, 91 focused lessons (43m14s), pushed remote branch and GitHub Pages publication. Original 54 comparison videos retained.

## Release

- Implementation: `078daf7`, branch `codex/load-balancing-sequence`.
- Merged PR: https://github.com/JesusFilm/engineering-fieldnotes/pull/3
- Deployed main commit: `2c2eb227ddd054a8b451039cd81c4b9717355e32`.
- Successful Pages run: https://github.com/JesusFilm/engineering-fieldnotes/actions/runs/39354887835
- Public site: https://jesusfilm.github.io/engineering-fieldnotes/

## Validation

- All 91 final encodes passed source/media/poster hashes, full decode, dimensions, duration, audio-level and faststart checks. Audio was analyzed, not auditioned.
- Independent encoded-media reviews and repair supplements cover all 91 current encodes; see `final-review-coverage.json`. No remaining blocking findings in inspected samples. Optional teaching refinements remain recorded, not represented as measured learner outcomes.
- Original 54 comparison cuts passed their hash-bound validation.
- Production checks passed 18 topics, 39 pages and all local links/anchors; 1,510 actual-font measurements passed.
- Local browser checks passed every lesson playback, stable scroll/player geometry on selection, prior-video pause, Back/deep links, 350px/390px mobile and no-JavaScript access. The final queue03 caption-only correction additionally played through its ended event after rerender.
- Desktop and phone captures were visually inspected; committed examples are `side-index-desktop.png` and `side-index-phone.png`.
- Live byte verification passed all 223 files: 39 HTML pages, app/CSS and all 91 videos/posters (`../live-sequence-release.json`).

- Live browser checks passed all 18 topics and every one of 91 lesson playbacks, including stable selection, desktop/phone, deep links, Back and no-JavaScript checks (`../live-sequence-browser-checks.json`).
- All 82 retired public 3D assets are absent locally and return HTTP 404 live (`../retired-3d-live-checks.json`).

## Completion audit

All topics use the approved direct index and focused sequences. All implementation and media are on the remote branch and merged into main. The published release matches local bytes and passes the full live browser suite. This evidence-only follow-up changes documentation/reports, not site build inputs; its Pages run must succeed before the thread goal is marked complete.
