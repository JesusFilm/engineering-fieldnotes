# Prove the patch

Independent harness-engineering alternative authored by **gpt-6-astra**, reasoning **high**, 2026-10-19. See `beat-sheet.md`, `review.md`, `verification.json`, and `variant.json`. The variant metadata contains a five-beat accessible transcript.

## Reproduce

From the repository root, preview stills first:

```sh
bash video/harness-engineering/astra/render.sh --stills-only
```

Inspect `video/harness-engineering/astra/scratch/stills/`, then produce the movie, poster, and technical checks:

```sh
bash video/harness-engineering/astra/render.sh
```

The script uses paths relative to itself, one encoder at a time, with two FFmpeg codec threads and capped filters. Outputs are `public/media/harness-engineering/astra.mp4` and `astra.jpg`. Intermediate media, decoded audio, browser profile, stills, contact sheets, and probe output remain in the ignored `scratch/` directory. `verification.json` is retained evidence. Rerendering does not automatically rewrite editorial verification or claim that a human has inspected new images.

Requires Node, Chrome/Chromium, FFmpeg with libx264/AAC, and Python 3 (standard library only). Set `CHROME_PATH` for a nonstandard browser location. The owned engine copy includes its npm manifest and lockfile. If its ignored `node_modules` is absent, the script installs locally with `npm ci --ignore-scripts`. During this production run, `engine/node_modules` was an ignored symlink to the already-installed skill dependencies. The symlink is not required on another machine; do not include node_modules in commits or packages.

Observed runtime versions: Node 24.3.0, Chrome 155.0.8059.84, FFmpeg 8.0.1, Python 3.9.6, puppeteer-core 23.11.1. Font rasterization and codec versions can change output bytes on another machine. The validation script checks the deliverable properties rather than requiring a cross-machine checksum.

For the live local preview, run from this directory:

```sh
open "file://$PWD/engine/preview.html?scene=file://$PWD/scene.js"
```

Use Play to enable sound. Playback in a human browser has not been used as evidence of listening here.

## Local engine changes

The installed skill was not modified. This copy adds configurable large box secondary labels, configurable title/subtitle sizing, and an opt-in full-frame fade. Renderer changes put intermediates and the browser profile under scratch, limit FFmpeg threads, encode at CRF 30 with the slow preset, and mux 80 kbps AAC at 0.65 gain with faststart. These settings produced the verified file under the 2 MB limit. Synthesis presets and preview controls are otherwise the copied skill implementation.

## Evidence and scope

- [Anthropic's engineering report](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents): completion needs verification; the alternative concentrates on that part rather than reproducing the baseline's session handoff.
- [OpenAI's engineering report](https://openai.com/index/harness-engineering/): mechanically checked constraints inform the feedback mechanism.
- [OWASP authorization guidance](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html): object-level authorization tests motivate the example. This invented service specifically expects 403; two checks are not a complete security assessment.
- [GitHub branch protection documentation](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches): actual configured controls, including bypass settings, determine enforcement. Persistent prompts or progress files do not enforce permissions.

Retrieved 2026-10-19. The complete original-assertion audit and limits are in `../../../reviews/concepts/harness-engineering/review.md`. No agent actually repaired an invoice service in this task; the movie is a scripted teaching scenario. No other variant scene was inspected and no comparative recommendation is claimed.

## Comparative verification (2026-10-19)

The original `review.md` and `verification.json` describe the author’s earlier encode and remain historical records. Final evidence, corrected timing, SHA-256 and recommendation are in `../../../reviews/comparisons/harness-engineering/verification.json` and `../../../reviews/comparisons/harness-engineering.json`. Comparative editor: gpt-6-astra comparative review; original model provenance is unchanged.
