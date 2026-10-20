# Launch requirements

Objective: a standalone, public GitHub Pages knowledge library for an existing engineering team moving into AI and agentic work, based on prototype Option A.

- [x] Copy public learning content and original videos into a separate project.
- [x] Deeply review all 18 concepts for relevance, accuracy, practical value, and boundaries; revise the written guides and record keep/reference/defer decisions.
- [x] Produce two independently authored video alternatives per concept with different models, retaining the original for comparison.
- [x] Review all three videos per concept with fresh comparative judgement; record evidence and a recommendation.
- [x] Build a readable index, concept chapters, sources, exercises, related concepts, and video comparison.
- [x] Review desktop/mobile layout, keyboard access, empty/error states, readable subtext, and loading behaviour against the supplied design reference.
- [x] Establish an editorial workflow suitable for a future continuous agent. Scheduling is a later phase, not part of this launch.
- [x] Verify content, links, media integrity, production build, and browser behaviour.
- [x] Publish to the confirmed JesusFilm organization: create a public repository and GitHub Pages site; verify live routes and media.

The original prototype remains intact. Its October 18 review verified one cut per concept but does not satisfy the deeper written review or independent model comparisons requested for this project.

## Current work

The 3D experiences were removed following user review on 20 October 2026: their interactions and metaphors required too much prior knowledge. The user subsequently selected the side-index layout and authorized focused sequences across all topics and publication.

All 18 written and comparative reviews are complete, with 54 validated videos. The independent alternatives use Astra plus Fable for 13 concepts and Astra plus Sol for five. See [the editorial release report](../reviews/launch-review.md) and [UI review](../reviews/ui.md).

The original prototype remains intact at source commit `f74bc99beef23a4aaff8081344e70cb8a82d852d`. The user confirmed JesusFilm on 19 October 2026. The public repository is https://github.com/JesusFilm/engineering-fieldnotes and workflow-based Pages is configured at https://jesusfilm.github.io/engineering-fieldnotes/. Deployment succeeded in [GitHub Actions run 39180635517](https://github.com/JesusFilm/engineering-fieldnotes/actions/runs/39180635517). Live browser verification covered all 18 chapter defaults and all 54 comparison videos, plus search, six-entry reference filtering, empty-state recovery, keyboard skip navigation, phone reading and a missing deep path. The evidence is in [live-browser-checks.json](../reviews/live-browser-checks.json).

## Sequential-video experiment — 20 October 2026

- [x] Remove all 3D runtime assets, scene sources, UI and build checks; deploy removal (`c327d1c`, Actions run 39325272787).
- [x] Prepare a load-balancing-only draft with six focused clips, written introductions, takeaways, comprehension checks and ordered navigation.
- [x] Check encoded media, caption timing, desktop/phone layout, playback handoff, keyboard/deep-link/back navigation and no-JavaScript fallback.
- [x] Jaco reviews the navigation proposals and selects Option A: side index.
- [x] User authorizes extending focused sequences across all topics.

The implementation branch is `codex/load-balancing-sequence`. Normal builds now include the focused sequences. The original pilot review is retained at `reviews/sequences/load-balancing/review.md` as historical evidence.

## All-topic rollout

- [x] Author 91 focused lessons across all 18 topics.
- [x] Implement Option A with stable video placement, direct selection and collapsed supporting text.
- [x] Complete final encoded media and teaching review after rendering corrections.
- [x] Verify full release and browser behavior against the final files.
- [ ] Push the branch and publish through GitHub Pages; verify the exact live release.

See `reviews/sequences/rollout-progress.md` for current evidence and remaining work.
