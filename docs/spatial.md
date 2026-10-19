# Optional spatial investigations

Video remains the chapter default. Selecting **Explore in 3D** pauses video,
loads a self-contained viewer, and gives the scene a wider stage. Returning to
video removes the iframe. Reading never requires WebGL or an asset download.

The acceptance question is whether spatial inspection and a reader-controlled
counterfactual reveal a useful relationship beyond the existing video. Moving
labels, concealed timelines, and raised versions of flat diagrams fail that
test. An omission is an editorial outcome, not unfinished asset generation.

`content/spatial.json` records a decision for every concept. The normal build
copies only accepted scene directories. `--draft` includes completed candidates
for local review. Rejected attempts remain available in source for comparison.

## Author and review

1. Read the chapter, recommended video's sequence, and `spatial-contract.json`.
2. Author `spatial/<concept>/build_scene.py` and run Blender. Keep the `.blend`,
   exported GLB, poster, scene configuration, and interaction module.
3. Record the intended spatial mechanism and its limitations in `intent.json`.
4. Obtain an independent critique, followed by a revision. Preserve actual
   execution-model provenance and bind the revision to the critique's hash.
5. Verify the revised scene in the real viewer, including the counterfactual,
   reset, keyboard controls, narrow framing, and settled animation states.
   Save selected screenshots in `reviews/spatial/<concept>/evidence/`.
6. Record the decision and file-bound `verification.json`. An asset or shared
   viewer change invalidates that verification; do not just refresh hashes.

The first production pass uses Opus 5.5 authoring, Astra 6 low critique, and
explicit Opus 5.5 revision. Intermediate revisions that ran under another model
are retained as history, rather than attributed to the requested model.

## Local preview and checks

From the repository root:

```sh
blender --background --threads 2 --python spatial/canary-deployments/build_scene.py
python3 -m http.server 4175 --bind 127.0.0.1 --directory public
```

Open `/spatial/viewer.html?concept=canary-deployments` on that server.
Chapter previews use `python3 scripts/build.py --draft` and a server rooted at
`dist`. Draft output is for review, not publication.

Before proposing a release:

```sh
python3 scripts/check_media.py
python3 scripts/build.py
python3 scripts/check.py
python3 scripts/check_spatial.py
node scripts/check_spatial_scheduler.mjs
```

The scheduler test covers duplicate frame requests when an animation invalidates
itself. Structural checks do not establish teaching value or visual quality;
those require the recorded critique and browser observations.

Three.js and its license are vendored in `public/spatial/shared/vendor/`.
The viewer uses demand rendering, respects reduced motion through the scene
contract, stops while hidden, and offers a text fallback if graphics fail.
