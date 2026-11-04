# Memory architecture 04 — encoded comparison

**Decision: pass.** Prefer the local candidate for “Check applicability.” Its staged comparison, withholding, source read and input preparation make the mechanism concrete without implying that retrieval itself validates freshness. No reproducible objective blocker was found. This is a local review recommendation, not publication approval.

## Grounding and inspection

Grounded in item 4 of `video/memory-architecture/sequence/lessons.json`: retrieved r1 says npm test; checkout is r2; application checks withhold stale evidence, read current instructions, and supply pnpm test from r2. Earlier planning context was acknowledged; no author source or self-review was consulted.

Inspected individual native 350 × 622 images: candidate periodic samples 001–009 and baseline 001, 003, 004, 006. These periodic files use ffmpeg fps=1/5; filenames are sample indices, not exact timestamps. Additional exact frame-index extracts were inspected at candidate 10, 13, 15, 18, 19, 20, 21, 24, 29, 30, 31, 33, 34, 35, 39 and 44s; baseline 7.3, 14.3 and 21.3s. Candidate 39s was inspected full-size. Both videos were decoded computationally in full; visual review was sampled rather than continuous playback.

Alternate extraction selected exact frame indices into full-size PNG and resized with Pillow Lanczos to 350px JPEG, independently of the initial ffmpeg-scaled periodic PNGs. The alternate frames and full-size 39s image confirm complete source names, revision badges, command values and supplied provenance. No apparent display omission was promoted to an encoded fault; no visual blocker is asserted.

## Comparison

| Criterion | Candidate | Public baseline |
|---|---|---|
| Causal clarity | Current command is initially unread; mismatch causes withholding, then an explicit read reveals the new command | Correct graph flow, but current command is visible from the outset and captions explain the read |
| Accuracy | Uses withheld rather than declaring the old command universally false; input stays empty until current evidence is selected | Correct rejection/read sequence; r2 verified label is broader shorthand |
| Pace | 45s gives independent holds to mismatch, source reading, prepared input and supply | 28s with four approximately seven-second stages; concise but less granular |
| Legibility | Essential revision/command/state labels readable at native350; minor labels smaller but clear | Readable nodes and two-line explanatory captions |
| Meaningful variety | Aligned revision badges, source field reveal, provenance transfer and preparing/supplied state changes | A useful branched graph with moving tokens, but more meaning carried by captions |

## Timestamp evidence

- **10s:** saved note r1/npm test is only a candidate; checkout r2's command is not read; next input remains empty and preparing.
- **13s:** r1 and r2 highlight around the mismatch symbol, with the application explicitly comparing revisions.
- **15s:** the note becomes withheld and application action changes to re-read source. The old command has not entered the input.
- **18–21s:** checkout transitions through reading, source-path highlighting and command reveal. pnpm test appears at 20s; current source settles at 21s. The revision mismatch itself does not manufacture the replacement command.
- **24s:** application selects use current source; preparation remains empty pending transfer.
- **29–31s:** current-source evidence follows the right-side route into the input. The command lands at 31s while status remains preparing.
- **33s:** input includes pnpm test and AGENTS.md @ r2, still preparing.
- **34–35s:** input becomes supplied, the delivery reaches the model, and the old note stays withheld. No test execution or test-pass result follows.
- **39s:** final contrast remains clear; r1 is retained as withheld evidence, current r2 supplies the input. **44s:** stage fades after the final hold.
- **Baseline 7.3/14.3/21.3s:** r1 note transfers toward revision check, check switches to read repo r2, then r2 evidence transfers to input. Final periodic sample contains r2: pnpm test. The baseline is accurate but gives less visual separation between knowing the checkout revision and reading its instructions.

## Accuracy limits

Revision mismatch warrants re-reading under this example policy; it does not prove all older facts false. The candidate appropriately withholds pending inspection and then reveals an actual changed command. Revision labels abbreviate the fictional source identities, not a general version-ordering algorithm.

The application check is a deliberately implemented workflow, not a memory-store guarantee. Current repository instructions are assumed authoritative for the fixture; this does not prove command success, source truth, authorization or model obedience. No saved-memory update, active-session refresh or test execution is shown. The command values are examples, not verified instructions for the working repository.

No reproducible essential held-text clipping, overlap or incorrect settled state was found. Highlight and fading effects remain readable at their settled holds. The right-side transfer route stays clear of source and application labels in the inspected transitions.

## Optional improvements

1. Make Check applicability the dominant heading instead of generic Memory.
2. Retain a brighter application-check label in the final hold to reinforce ownership of the decision.

These are refinements only, not blockers.

## Technical and audio checks

Both full decodes returned exit 0 with no reported errors. Candidate: 45s, 1080 × 1920, 30fps, 1350 frames. Baseline: 28s, 1080 × 1920, 20fps, 560 frames. Both place moov before mdat.

Audio signal analysis: candidate mean −34.1dB / maximum −7.0dB; baseline mean −40.5dB / maximum −10.5dB. Peaks leave measured headroom. **Audio was not actually heard.** Frame/signal analysis cannot establish audible synchronization, actor timbres or listening comfort.

No repair or media edit was made. Any changed encode requires renewed actual encoded inspection bound to its new full SHA-256, not replacement of the hash alone.

## Hash binding

**Candidate** `video/memory-architecture/motion-v2/04/video.mp4`

- Before: `2333ca1b2e6eac3640aa19fe60da6b4ad5ca478e269e3b6d632cec743382e91c`
- After: `2333ca1b2e6eac3640aa19fe60da6b4ad5ca478e269e3b6d632cec743382e91c`
- Unchanged: yes.

**Baseline** `public/lessons/memory-architecture/04.mp4`

- Before: `3562888f238271a4b75875a44e4bbc6ae40b7753a08ccb810f0bd9d3e2b380c6`
- After: `3562888f238271a4b75875a44e4bbc6ae40b7753a08ccb810f0bd9d3e2b380c6`
- Unchanged: yes.

