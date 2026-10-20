# Engineering Fieldnotes

[Read the book](https://jesusfilm.github.io/engineering-fieldnotes/).

A practical learning book for software teams bringing AI and agents into their everyday engineering work. Each chapter introduces a concept through focused videos selected from a side index. Supporting explanations, exercises and primary sources are available on demand.

The reading experience builds on the original Fieldnotes index: warm paper, restrained type, ruled rows, and room to read. It is a static site with no runtime dependencies, accounts, analytics, or external scripts. Chapters and native video controls work without JavaScript; search and filtering are progressive enhancements.

## Run locally

Python 3.10+ builds the site. Node is optional for the npm command aliases and required only for rendering new videos.

```sh
python3 scripts/build.py
python3 scripts/check.py
python3 -m http.server 4174 --directory dist
```

Open http://localhost:4174. During editorial production, `python3 scripts/build.py --draft` and `python3 scripts/check.py --draft` allow incomplete reviews; release builds require all 18 reviewed guides, three videos per concept, and comparison evidence.

## Project layout

- `content/concepts/`: the current guides and learning exercises.
- `content/original/`: the initial 18-concept collection, retained for review provenance.
- `content/order.json`: chapter order.
- `content/variants.json`: the three original comparison cuts for each chapter.
- `content/sequences.json`: all-topic sequence registry; per-topic lesson manifests provide navigation and transcripts.
- `public/lessons/<concept>/`: the focused default lesson MP4s and posters.
- `src/`: shared styles, small interaction script, and favicon.
- `scripts/`: static build, content/navigation checks, and encoded-media validation.
- `public/media/<concept>/`: original and independently authored MP4s and posters.
- `video/<concept>/<variant>/`: authored scenes, beat sheets, renderer, reproduction command, transcript, and review evidence.
- `reviews/`: source reviews, comparative judgements, and media checks bound to file hashes.
- `docs/`: editorial workflow, design decisions, and launch requirements.

The build produces `dist/`, which is ignored by Git. All generated links are relative, including nested chapter and comparison pages, so the site works at the GitHub Pages project path. The 404 page explicitly points back to `/engineering-fieldnotes/`.

## Content and media review

See the [launch review and concept-by-concept repairs](reviews/launch-review.md). Read [the editorial workflow](docs/editorial-workflow.md) before making a content change. Core chapters are immediately useful during team adoption; reference chapters explain supporting system behaviours. Classification is a judgement recorded with the review, not a claim that every team needs every technique.

The original explanation is retained for every concept, with any comparative corrections attributed in its metadata. Historical author reviews describe their original encodes; the final comparison and hashes describe the published revisions. Each chapter pairs independently authored alternatives from GPT-6 Astra and either Claude Fable or GPT-6.1 Sol, using the same dark diagram vocabulary. Metadata records the actual author and subsequent reviewer corrections. A subsequent comparison selects a recommended cut based on the rendered results. Model identity records provenance; it is not a quality score. Audio is measured and visually analysed unless a review explicitly records listening.

To validate all media, install FFmpeg and run:

```sh
python3 scripts/check_media.py
python3 scripts/check_sequences.py
```

For a focused revision, add `--concept tool-design` (repeat for multiple concepts). Run without filters before a release. This checks full decode, dimensions and codecs, duration, audio headroom, exact loop boundaries, poster existence, and faststart metadata. Unchanged media uses hash-bound evidence. Media integrity does not prove that a lesson is accurate or clear; those require the separate content and comparison reviews.

For focused sequences, see [the shared production instructions](video/shared/README.md). Finite lesson videos hold their final state; matching loop boundaries apply only to the original comparison cuts.

To reproduce a new cut, use the `render.sh` or reproduction command beside its scene. Rendering requires Node 22.12+, Chrome/Chromium and FFmpeg. `npm ci --ignore-scripts` installs the optional renderer dependency at the repository root; individual renderer folders may carry their own lockfiles. Set `CHROME_PATH` if Chrome is outside the documented default paths. Baseline scenes are retained from the original prototype; engine folders preserve their relevant drawing extensions. Scratch frames, temporary masters and dependency directories are not published.

## Loading and access

The index contains its searchable text in HTML and does not fetch the article collection on startup. Each chapter is its own static document. Videos use `preload="none"` and posters; only a user-requested cut downloads. Starting another cut pauses the first. Textual beat sequences accompany the videos. CSS, JavaScript, video and poster URLs include content hashes so a published revision does not reuse older cached files. Local fonts use `font-display: swap`, with their original licences in `public/fonts/`.

The checker enforces a 220 KB uncompressed budget for the index, CSS, JavaScript and the three fonts used by the site, plus a 100 KB HTML limit per page. Video files have a separate 3 MB limit. These are payload budgets, not invented network-speed benchmarks.

## Publication and future upkeep

The public repository belongs to [JesusFilm](https://github.com/JesusFilm/engineering-fieldnotes). The Pages workflow validates a release build, uploads only `dist/`, and deploys it through GitHub Actions. Pull requests build and validate without publishing.

The starting library must pass the launch checklist before it is treated as complete. A future continuous agent can follow the editorial workflow and submit reviewable changes. Scheduling and autonomous publication are a later decision; this repository does not create a recurring agent.
