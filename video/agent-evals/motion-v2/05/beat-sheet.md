# Lesson 05 beat sheet: Know the grading limits

**Mechanism:** a suite collects representative tasks: a known bug (`empty pw`), behaviour that must keep working (`valid pw`), and an explanation (`explain`). A held-out set is kept apart and not run. Code tests grade the exact outcomes with crisp checks; a rubric grader judges the explanation with a softer mark. A human audit of the rubric against its criterion, `names the input`, finds a false pass (A: `"Improved security"`, auto PASS, human FAIL) and a false failure (B: `"Reject empty passwords"`, auto FAIL, human PASS, with `empty passwords` underlined). The rubric is marked `recalibrate`, its mark becomes `?`, and the evidence states `held-out not run` and `release not decided`.

Times are playback seconds for `video.mp4`. Duration 44.70 s, with a finite ending: hold, then fade to black. The scene is authored at 46.0 s with one documented shift: everything authored from 8.0 s onward plays 1.3 s earlier (see the `SHIFT` wrapper at the top of `build`).

## Chosen ideas (neutral A/B attribution)

| Idea | From | Why |
|---|---|---|
| Suite list with roles `known bug / must work / clarity` plus a `held-out · kept apart · not run` row below a dashed divider | Plan B (held-out set apart), Plan A (list rows) | Shows "represent real use, include known failures and valid behaviour, keep some out" in one place |
| Grader rows `code tests · exact outcome`, `rubric · judgement`, `human review · calibration`; dots run up the left margin to the tasks each grader marks | Both | Each criterion gets a suited grader |
| Crisp teal ticks from code tests; a slower-drawing amber tick from the rubric | Plan B (two textures) | Shows that the rubric's mark is softer and still unverified |
| Rubric audit with a fixed criterion and two saved samples, keeping both `auto` and `human` scores | Plan A | Shows both error directions named in the lesson, without overwriting the automated score |
| The underline on `empty passwords` shows the evidence for B; the `no input` tag shows it for A | Plan A | The reviewer applies the stated criterion and doesn't simply override |
| Rubric row → `recalibrate`; the explain mark → `?` | Plan B (`recalibrate`), Plan A (no instant fix) | Calibration remains work; code checks stand |
| `EVIDENCE`: `held-out not run`, `release not decided`, status `for review` | Both | A passing suite is not automatic release |
| Not used: Plan A's resize transition and audit-history chips; Plan B's `3 of 4` count, release box and dashed gate | — | Fewer moving parts; no score that could suggest a rate |
| Excluded: repeated trials, configuration comparisons, rates or percentages, deployment | — | These belong to other lessons |

## Beats

| # | Time (s) | What moves | State change | Sound |
|---|---|---|---|---|
| 1 | 0.0–6.7 | **Representative tasks.** 0.6 `SUITE`. 1.3, 1.9 and 2.5 `empty pw known bug`, `valid pw must work`, `explain clarity`. 3.6 a dashed divider and `held-out kept apart not run`. | No grader yet. | 0.6 arrive C5 · 1.3, 1.9, 2.5 store C5 · 3.6 ack C4 |
| 2 | 6.7–15.2 | **Suited graders.** 6.7 `code tests exact outcome`. 7.3 `rubric judgement`. 8.3 two blue dots run up the left margin. 9.4 and 9.7 `code` with crisp ticks on both password rows. 10.5 an amber dot to `explain`. 11.6 `rubric` and a slowly drawn amber tick. 12.7 `human review calibration`. | Two code checks, one soft rubric mark. | 6.7 store E5 · 7.3 store G5 · 8.3 send E6 · 9.4, 9.7 ack E5 · 10.5 send G6 · 11.6 arrive G5 · 12.7 ack C6 |
| 3 | 15.2–35.7 | **Audit the rubric.** 15.2 `RUBRIC AUDIT`, `criterion: names the input`. 16.5 `A "Improved security"` types. 17.9 `auto PASS`. Hold. 20.3 criterion and A highlight; 21.3 `no input`. 22.1 `human FAIL`. 23.1 `false pass`. 25.5 `B "Reject empty passwords"`. 26.7 `auto FAIL`. Hold. 28.9 criterion highlights and `empty passwords` is underlined. 30.1 `human PASS`. 31.1 `false fail`. 32.5 the rubric row turns `recalibrate` (red) and the explain mark becomes `?`. Hold. | Both automated scores stay beside the human scores; the code ticks stand. | 15.2 arrive C6 · 16.5 store C5 · 17.9 ack G5 · 20.3 ack C6 · 22.1 thump C4 · 23.1 miss · 25.5 store C5 · 26.7 ack G5 · 28.9 ack C6 · 30.1 chime C6 (soft) · 31.1 miss · 32.5 thump G3 |
| 4 | 35.7–44.7 | **Evidence with limits.** 35.7 `EVIDENCE` and `held-out not run`, while the suite's held-out row flashes. 36.9 `release not decided`. 38.1 status `for review`; the suite pulses. Hold to 42.7, fade to 43.7, black to the end. | Final: the suite with a `?` on explain, the rubric to recalibrate, both audit findings, held-out not run, release not decided. | 35.7 store C5 · 36.9 ack C4 · 38.1 ack C5 |

Actor voices: suite and evidence C5/C4; code tests E; rubric grader G; human review C6. Grading errors use a quiet `miss`. The recalibration thump (G3) and the human FAIL thump (C4) are the low, loud moments. Reading holds are silent.

## Reproduce

From the repository root (uses the pinned `puppeteer-core` 25.14.0 in root `node_modules`):

```
node video/agent-evals/motion-v2/05/engine/render.mjs video/agent-evals/motion-v2/05/scene.js video/agent-evals/motion-v2/05/video.mp4 --sheet video/agent-evals/motion-v2/05/scratch/contact-sheet.png
```

`engine/flow-engine.js` is an unchanged copy of the lesson-04 local engine (`panel`, `txt` with reveal/hl/bar/strike, `tick`, chip `size`, `meta.subtitleSize`). `render.mjs`, `sfx.js` and `preview.html` match the skill copy.

## Lesson text sync (coordinator)

`sequence/lessons.json` item 5 declares duration 28 with beats at 0/7/14/21. For this cut, use duration 44.7 with beats at **0 / 6.7 / 15.2 / 35.7**. This folder does not edit that file.

## Accuracy limits

The tasks, samples and scores are illustrative, not measured grader performance. Two audited samples don't estimate error rates or finish calibration; real calibration needs more examples and possibly several reviewers. Human review here applies a stated criterion and is not presented as infallible. Code tests can also be incomplete. The crisp versus soft tick is a visual convention. `held-out not run` means coverage still missing, and the cut doesn't show how the held-out set is used. Good explanation scores do not offset failed behaviour tests, and no combined score is shown. `release not decided` means the suite result is not a release decision.
