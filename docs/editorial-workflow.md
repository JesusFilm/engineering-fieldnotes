# Editorial workflow

The audience is an experienced software team starting to delegate work to models. A concept earns a place by changing a decision or practice they can use. Classify it as `core` (use early), `reference` (use when a concrete system problem appears), or `defer` (retain for editorial review, omit from the primary learning path). Record the reason, prerequisites, known limitations, and evidence.

For every guide, verify technical claims against primary sources. Keep source links and retrieval dates, distinguish the library's judgement from sourced facts, and include an exercise with observable success criteria. Explain terms before relying on them. Avoid presenting a model capability or an illustrative latency as a guarantee.

For a video revision, define one mechanism, a beat sheet, and sound events. Keep the original and independently authored alternatives. Preserve scene source and exact rendering instructions. Inspect encoded frames at full resolution and 350px width, inspect every beat and boundary, decode the whole file, check audio peaks and streaming metadata. Record whether audio was actually heard or only analysed.

A fresh comparison reviewer receives the encoded variants and intended lesson before authoring source or prior scores. Score causal clarity, accuracy, pacing, and visual legibility; cite timestamps and compare concrete advantages. Select a recommendation from evidence, retaining all passing alternatives for the reader. A different model is useful diversity, not proof of independence or quality.

Future agent runs should open a small reviewable change with source evidence, before/after media, and validation results. Human editorial review controls promotion to the default curriculum or recommended cut. Do not fabricate completion, source verification, listening, benchmark results, or model provenance. Recurring execution will be configured separately after the starting library is accepted.

Before proposing a release, run `python3 scripts/check_media.py`, `python3 scripts/build.py`, and `python3 scripts/check.py`. A focused edit can use `check_media.py --concept <id>` while it is in progress. Final comparisons and encoded checks are bound to file hashes: a new encode needs renewed review, not merely a replacement hash. Check the affected chapter and comparison in the browser at reading and phone widths.

Use the repository’s pinned renderer dependency when copying an engine. Keep drawing extensions local to the cut, provide relative reproduction commands, and keep scratch frames and dependency directories out of Git. The installed personal skill is a production aid, not a runtime dependency of this public repository.

Register each chapter’s published cuts in `content/variants.json`. Directory names identify cuts; the metadata must identify their actual authoring model. Keep unfinished attempts under ignored `video/<concept>/attempts/`, never in the published media directory.
