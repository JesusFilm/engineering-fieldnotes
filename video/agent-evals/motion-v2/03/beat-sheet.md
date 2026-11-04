# Lesson 03 beat sheet: Catch an overbroad fix

**Mechanism:** Patch A is one line, `return REJECT`. Both required expectations are fixed before anything runs: empty → `reject`, valid → `accept`. Each case runs through the same unchanged line and both come back `reject`. Row one passes, row two fails, and the grader rejects Patch A. A grader that checked only the new case would have passed it.

Times are playback seconds for `video.mp4` (authored at speed 1). Duration 42.00 s, with a finite ending: hold, then fade to black.

## Chosen ideas (neutral A/B attribution)

| Idea | From | Why |
|---|---|---|
| A one-line patch card, `login(password):` / `return REJECT`, highlighted on every call | Both | The overbroad behaviour is visible in the code itself |
| Case × expected/observed matrix with a mark column (`✓ PASS`, `✗ FAIL`) | Plan B (matrix), Plan A (words beside marks) | A case comparison, distinct from lesson 01's stacked records and lesson 02's probe; meaning does not rely on colour alone |
| Both expected values written before either case runs | Plan A | Plan B filled expected after the observed column; that could suggest criteria were invented after the fact |
| Each case runs sequentially: the active row outlines, a dot goes up the left gutter to the patch, the line pulses, and a dot returns down the right gutter | Plan A | Shows the same code answering each input, one at a time |
| Observed `reject` lands white and is held before comparison; only then PASS or FAIL | Plan A | Observation and verdict stay separate |
| The application's `reject` is neutral until compared; red only for the failed expectation | Plan A | A rejection is not itself a test failure |
| Grader line `empty only → pass` struck through, then `empty + valid → REJECT` | Plan B (refused narrow pass), made a concrete grader line | Shows that a narrow test would reward the wrong patch, without a caption |
| Patch A's border turns red after the verdict; the PASS row stays visible | Both | The verdict belongs to the patch, and the first pass is not erased |
| Not used: Plan B's grid shake, `1 of 2` count, and pre-filled observed column; Plan A's code-port chips | — | No physical shake for a correct run; no score that could suggest averaging; dots fit the gutters |
| Excluded: Patch B, repair, repeated trials, suites, release decisions | — | These belong to later lessons |

## Beats

| # | Time (s) | What moves | State change | Sound |
|---|---|---|---|---|
| 1 | 0.0–8.0 | **Patch A and both expectations.** 0.6 `login(password):` types. 1.7 `return REJECT` types and flashes at 2.5. 3.4 headers and the empty row with expected `reject`. 4.4 the valid row with expected `accept`. Hold. | Observed `—` in both rows; grader `not graded`. | 0.6 arrive E5 · 2.5 work E4 · 3.4, 4.4 store G5 |
| 2 | 8.0–17.5 | **Empty case passes.** 8.0 the empty row outlines amber. 8.5 a dot runs up the left gutter to the patch. 9.7 the patch glows and `return REJECT` highlights. 10.5 a dot returns down the right gutter. 11.8 observed `reject` (white). Hold. 13.7 expected highlights; 14.4 observed highlights. 15.1 ✓ `PASS`; observed turns teal. | Row 1 PASS stays to the end. | 8.5 send C6 · 9.7 arrive E5 · 10.0 work E4 · 11.8 deliver E5 · 13.7, 14.4 ack G5 · 15.1 hit G5 |
| 3 | 17.5–28.5 | **Valid case fails.** The same run for the valid row: 18.0 send, 19.2 patch, 21.3 observed `reject` (white) beside expected `accept`. Hold on the mismatch. 23.7 and 24.4 highlights. 25.1 ✗ `FAIL`; observed and row outline turn red. Hold to 28.5. | Same patch, same line, same observed value as row 1. | 18.0 send D6 · 19.2 arrive E5 · 19.6 work E4 · 21.3 deliver E5 (identical to row 1) · 23.7, 24.4 ack G5 · 25.1 thump G3 |
| 4 | 28.5–42.0 | **Grader rejects Patch A.** 28.5 a bracket collects both rows. 29.2 a dot runs to the grader. 30.1 grader `grading`. 31.0 `empty only → pass` appears. 32.8 it is struck through and dims. 34.0 `empty + valid → REJECT`; grader `rejected` with a red border. 35.0 Patch A's border and title turn red. Hold to 40.0, fade to 41.0, black to the end. | Final: patch red; PASS and FAIL rows; narrow pass struck; REJECT verdict. | 28.5 ack G4 · 29.2 send G6 · 30.1 arrive G5 · 31.0 ack G5 · 32.8 miss (quiet) · 34.0 store G4 · 35.0 thump E3 |

Actor voices: empty case C6, valid case D6, Patch A E5/E4 (the identical return sound plays twice), grader G. The case FAIL (G3 thump) and the patch rejection (E3 thump) are the loudest moments; reading holds are silent.

## Reproduce

From the repository root (uses the pinned `puppeteer-core` 25.14.0 in root `node_modules`):

```
node video/agent-evals/motion-v2/03/engine/render.mjs video/agent-evals/motion-v2/03/scene.js video/agent-evals/motion-v2/03/video.mp4 --sheet video/agent-evals/motion-v2/03/scratch/contact-sheet.png
```

`engine/flow-engine.js` is the lesson-02 local engine (`panel`, `txt`, `tick` with check or x, chip `size`, `meta.subtitleSize`), copied here and extended with a `txt` `strike` prop. `render.mjs`, `sfx.js` and `preview.html` match the skill copy.

## Lesson text sync (coordinator)

`sequence/lessons.json` item 3 declares duration 28 with beats at 0/7/14/21. For this cut, use duration 42.0 with beats at **0 / 8.0 / 17.5 / 28.5**. This folder does not edit that file.

## Accuracy limits

`return REJECT` is a schematic stand-in for a patch that rejects every login, not real code. `valid` is a fixture label for a correct test password. Both expectations predate the run. The two cases are not complete authentication coverage, and passing both would not prove safety. `empty only → pass` is a hypothetical narrow grader, shown only to be struck out. `REJECT` is a grading verdict, not a deployment action.
