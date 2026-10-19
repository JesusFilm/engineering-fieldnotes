# Guardrails and permissions — fable variant

Independent alternative cut authored by `anthropic/claude-fable-5-1` (reasoning: high) for the
`guardrails-and-permissions` concept. Lesson: a tool result can carry instructions that steer the
model past its prompt rules, so permissions must be enforced by the tool runtime against the
caller's granted scope, failing closed. The baseline cut shows the agent's own plausible production
write being denied; this cut starts the trouble in data the agent legitimately read.

Files

- `scene.js` — the scene (all timing authored at speed 1; `meta.speed` 0.85).
- `engine/` — local copy of the skill's renderer. Changes from the installed skill:
  `render.mjs` caps every ffmpeg call at 2 threads (`FV_THREADS`) and adds `--loop-exact`
  (constant QP, no mb-tree, IDR on the final frame) so identical first/last source frames also
  decode identically; `flow-engine.js` box sublabel 24 → 26 px. `node_modules` is a symlink to the
  project root and is not committed (`package.json` records the dependency).
- `render.sh` — reproducible build of `public/media/guardrails-and-permissions/fable.{mp4,jpg}`.
- `verify.py` — media checks; writes `verification.json`.
- `beat-sheet.md`, `review.md`, `variant.json`.
- `scratch/` — stills, contact sheet, spectrogram, sfx WAV (ignored by Git).

Preview with sound: `open "file://$PWD/engine/preview.html?scene=file://$PWD/scene.js"`.

Sources (read 19 October 2026)

- MCP tools specification, security considerations: https://modelcontextprotocol.io/specification/2025-06-18/server/tools
- OWASP LLM01:2025 Prompt Injection (indirect injection via tool/API returned content): https://genai.owasp.org/llmrisk/llm01-prompt-injection/
- Simon Willison, "The lethal trifecta for AI agents": https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/


## Comparative correction, 2026-10-19

Edited by `gpt-6-astra comparative review`; original model provenance is retained.
The local engine now supports `subSize`; this scene uses 32px bright rule/grant
labels, compact port ripples, and keeps the untouched database visible. The original
title-only opening and ending are retained and confirmed pixel-identical. Render
threading is capped at two, including filters and output encoders. Independent
evidence and archived originals are in `reviews/comparisons/guardrails-and-permissions/`.
