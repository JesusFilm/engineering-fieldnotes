# Lesson 02 beat sheet: Check actual behavior

**Mechanism:** the agent's message `"Bug fixed"` has no route into grading; its dashed line stops at an ×. The grader runs patched code P1 (`login()`) on a known input, an empty password. The code returns `rejected`, which fills the observed cell beside the expected value written before the run. The match is marked `pass` and recorded for this one case, while `valid password` stays `not run`.

Times are playback seconds for `video.mp4` (authored at speed 1). Duration 34.60 s, with a finite ending: hold, then fade to black.

## Chosen ideas (neutral A/B attribution)

| Idea | From | Why |
|---|---|---|
| Separate `AGENT SAYS "Bug fixed"` card that never touches the observed cell | Both | The claim and the behaviour are visibly different objects |
| The claim's dashed line ends in a persistent ×; the observed cell flashes but stays `—` | Plan B (dashed line with ×), with Plan A's rule that the claim never fills the observation | Shows "a statement is not the behaviour" without a caption |
| Expected `rejected` written before anything runs | Plan A | The criterion comes first |
| Probe geometry: `INPUT ""` hops over the top into `CODE · P1 login()`; the output drops down into the check table | Plan B | A sideways run and a downward observation, distinct from lesson 01's stacked records |
| States `idle → running → returned` in the code box; `not run → running → observed → pass` in the check | Plan A | Returning, observing and passing are three separate events |
| Hold on `observed rejected` in white before any green | Plan A | The observation exists before the judgement |
| Expected highlighted, then observed, then a tick between them | Plan A (comparison underline and mark), simplified | The comparison reads as its own act |
| Record rows `empty password pass` and `valid password not run` | Plan B (case list), cut to 2 rows; Plan A's pending scope | Records the observation and keeps the other case visible but unrun |
| Claim card fades to 40% at the end | Plan B | Evidence remains, the claim recedes |
| `rejected` in amber/teal, never red | Plan A | A correct rejection is not a failure |
| Not used: Plan B's `401` status code, `locked user` row, and `not evidence` badge; Plan A's moving gutter cursor | — | No invented HTTP codes, no extra text, and the hop and state changes already show execution order |
| Excluded: bad patch, executing the valid-password case, suites, repeated trials | — | These belong to later lessons |

## Beats

| # | Time (s) | What moves | State change | Sound |
|---|---|---|---|---|
| 1 | 0.0–9.0 | **A claim is not behaviour.** 0.6 `"Bug fixed"` types into the claim card. 2.2 the check table appears with expected `rejected`. 3.4 input `""` (empty). 4.1 `CODE · P1 login()` (idle). 5.4 a grey dot runs from the claim down the dashed left line. 6.6 an × draws where the line stops, and the observed cell flashes but stays `—`. | Check `not run`; observed `—`; record `empty password —`, `valid password not run`. | 0.6 ack C6 (claim) · 2.2 store G5 (check) · 3.4 store C5 (input) · 4.1 ack E5 (code) · 6.6 miss (quiet, panned left) |
| 2 | 9.0–14.0 | **Run the patch with the empty password.** 9.0 the `""` chip hops from input over the top into the code. 10.3 the code glows; its status goes `running` with a filling underline; the check shows `running`. 12.6 the code shows `returned`. | Observed is still `—` after the code returns. | 9.0 send C6 · 10.3 arrive E5 · 10.8–12.4 work E4 ×5 · 12.6 ack E5 |
| 3 | 14.0–22.5 | **Rejected is observed, then compared.** 14.0 the `rejected` chip drops from the code to the check. 14.8 observed `rejected` (white); check `observed`. Hold. 17.8 expected highlights, then observed at 18.5. 19.2 a tick draws, observed turns teal, and the check border and status turn `pass`. Hold to 22.5. | `—` → `rejected` (observed) → `pass`. | 14.0 send E6 · 14.8 deliver E5 · 17.8, 18.5 ack G5 · 19.2 hit G5 |
| 4 | 22.5–34.6 | **Record it; the other case is still untested.** 22.5 the `pass` chip drops to the record. 23.3 `empty password pass` (teal). 24.8 `valid password not run` flashes and stays. 26.1 the claim card and its line fade to 40%. 27.3 the check and record row pulse together. Hold to 32.6, fade to 33.6, black to the end. | Final: dim claim with ×; input, code `returned`; check `pass` with tick; record one pass, one not run. | 22.5 send G6 · 23.3 store A5 · 24.8 ack C4 · 26.1 ack C6 (quieter) · 27.3 chime A5 (soft) |

Actor voices: claim C6; input C5; code E5/E4; check G5; record A5 and C4. The `miss` at 6.6 is the only non-musical sound and marks the claim's blocked path. Reading holds are silent.

## Reproduce

From the repository root (uses the pinned `puppeteer-core` 25.14.0 in root `node_modules`):

```
node video/agent-evals/motion-v2/02/engine/render.mjs video/agent-evals/motion-v2/02/scene.js video/agent-evals/motion-v2/02/video.mp4 --sheet video/agent-evals/motion-v2/02/scratch/contact-sheet.png
```

`engine/flow-engine.js` is the lesson-01 local engine (adds `panel`, `txt`, `tick`, chip `size`, `meta.subtitleSize`), copied here and extended with `tick` option `shape: 'x'`. `render.mjs`, `sfx.js` and `preview.html` match the skill copy.

## Lesson text sync (coordinator)

`sequence/lessons.json` item 2 declares duration 28 with beats at 0/7/14/21. For this cut, use duration 34.6 with beats at **0 / 9.0 / 14.0 / 22.5**. This folder does not edit that file.

## Accuracy limits

`rejected` is a logical login outcome; no HTTP status code is implied. Empty quotes mean an empty string. One case passing says nothing about valid logins, which remain unrun. The run time on screen is illustrative, and the cut assumes the test environment worked. The claim is not graded here; the cut does not say explanations have no value.
