# 02 repair check: copy chip no longer obscures the source failure

File: `video/harness-engineering/motion-v2/02/video.mp4`
SHA-256: `8d4ad71208a54629c9031b472e19a90667009e53f97f8b38d2cae4236e44d7f4`
Stream: h264 1080×1920 30 fps, 1117 frames, aac audio, 37.233 s, moov before mdat.

## Scope

Independent check of the encoded file only. Scene source, beat sheet, review, and verification files in `02/` were not read. The prior defect under test: around 24.5 s the travelling `Export FAIL` chip sat on top of the source `Export FAIL` row and hid it. Frames were extracted at 0.25 s steps from 23.5 to 26.5 s and at 14 beat times across the whole file, each at native size and scaled to 350 px wide, in `reviews/scratch/02-repair/` (`win-tile-350.png`, `beat-tile-350.png`, `native/`, `w350/`). Audio was analysed, not listened to.

## Repair window, 23.5–26.5 s

| t (s) | Source row `Export FAIL` / `exit 1` | Chip | Destination `Known failures` |
|---|---|---|---|
| 23.50–24.00 | fully readable, no highlight | absent | empty, label dim |
| 24.25 | readable; row outline red, dim | spawns at x≈770, dim, right of the `FAIL` text | empty |
| 24.50 | readable; row outline red | solid at x≈770, y≈1410, clear of `FAIL` (ends x≈490) and `exit 1` | empty, label brightens |
| 24.75–25.25 | readable; outline fading | travels straight down past `exit 1` and the divider, never crossing text | empty |
| 25.50–25.75 | readable, outline gone | fades inside the right end of the empty row | row box present |
| 26.00–26.50 | readable | gone | row filled `Export  FAIL  before edits`, red outline |

The chip spawns beside the source text rather than over it and descends along the right margin, so at every sampled frame both the source value and `exit 1` are legible at native and at 350 px. At 350 px the chip itself is small (about 7 px cap height) but readable; the source and destination rows are the primary reading and both are comfortably legible. The destination fills with the same values as the source and the source keeps them: `Export FAIL` and `exit 1` remain in the baseline block through the final held frame at 33 s.

Verdict: the obscuring defect is fixed in this encode.

## Whole-file beat frames

Beats at 0.5, 3, 6, 9, 12, 15, 18, 21, 23, 27, 30, 33, 36, 37.1 s read in order: dashed empty sheet with `rev ?`; rev row highlight; `a61c9e2` with `changes 0` and solid outline; `AGENTS.md loaded`; `task.md loaded`; `$ npm test`; progress bar orange with `Parse PASS` highlighted and two empty rows; `Export FAIL` highlighted red; `exit 1`; known-failures row filled; rev row highlighted with `saved @ a61c9e2` on the Baseline header; same held; black fade; black.

No state from an earlier beat lingers into a later one, the bar is empty again in the held frames, and no element outside the window changed shape or position between beats. Nothing in the beat sample suggests the repair had side effects.

## Encode checks

Full decode completed without errors. Audio peak −7.7 dBFS. `major_brand=isom` with `moov` ahead of `mdat`, so streaming metadata is at the front. First frames show the empty dashed sheet and the final frames are black below the title, consistent with a fade ending.

## Limits

Sampling was 0.25 s in the window and sparse elsewhere; frames between samples were not inspected. Audio peaks were measured; the mix was not heard. This check is bound to the hash above and does not cover any later re-encode.

