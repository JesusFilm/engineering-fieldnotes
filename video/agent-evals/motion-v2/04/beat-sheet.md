# Lesson 04 beat sheet: Repeat trials independently

**Mechanism:** each trial works in a fresh copy made from the same clean start (`code r0 · data d0 · history empty`). Trial T1 changes its copy to `P1 · d1 · log1` and passes, and its result is saved outside the copy. The copy, leftovers included, is discarded and re-made from the untouched clean start before T2. T2 changes its own copy to `P2 · d2 · log2` and fails. The report counts both attempts instead of the best one.

Times are playback seconds for `video.mp4` (authored at speed 1). Duration 42.00 s, with a finite ending: hold, then fade to black.

## Chosen ideas (neutral A/B attribution)

| Idea | From | Why |
|---|---|---|
| A `CLEAN START` card that never changes beside a working copy that is stamped from it, discarded, and re-stamped | Plan B | The reset is a visible event: the old copy's rows vanish, then three dots copy the clean rows across |
| Concrete state rows `code / data / history` with `r0 / d0 / empty` becoming `P1 / d1 / log1` | Plan A | Shows exactly what a trial leaves behind and what the reset removes |
| Two trials of one unchanged task (`fix login · same checks`), PASS then FAIL | Plan A (two trials) | Enough to show variation and complete reporting; Plan B's third trial adds length without a new idea |
| Append-only `ALL ATTEMPTS` list with evidence IDs (`T1 P1 · log1 PASS`, `T2 P2 · log2 FAIL`), saved via the right margin, outside the copy | Plan A | Evidence survives the discard; T1's record stays visible while T2 starts clean |
| A clean T2 copy held for 3.2 s next to the saved T1 row before running | Plan A | Contrasts the reset state with the retained record |
| `REPORT`: `best: T1 PASS` struck through, then `1 pass · 1 fail · 2 trials` | Plan B (refused `best` badge), with Plan A's count wording | Shows "do not show only the best attempt" without a caption |
| `AGENT` card under the copy, running only during a trial | Plan B (agent system) | Identifies what acts on the copy |
| Not used: Plan B's `2 of 3` with three cells; Plan A's session tabs and `data d0` strip | — | Fewer elements read better at 350 px; the stamp replaces tabs |
| Excluded: configuration comparisons, held-out tasks, statistics, release decisions | — | These belong to later lessons |

## Beats

| # | Time (s) | What moves | State change | Sound |
|---|---|---|---|---|
| 1 | 0.0–8.0 | **One task, a clean start, a fresh copy.** 0.6 `TASK fix login · same checks`. 1.8 `CLEAN START` rows appear. 3.4 the clean start glows and three dots copy its rows across. 4.0 the `T1` copy shows `r0 / d0 / empty`, status `ready`. 4.6 the agent card appears (idle). Hold. | All attempts and the report are empty. | 0.6 arrive C5 · 1.8 store C5 · 3.4 send C6 · 4.0 arrive E5 |
| 2 | 8.0–17.0 | **T1 changes its copy and passes.** 8.0 agent and T1 `running`. 9.2 code → `P1`; 10.2 data → `d1`; 11.2 history → `log1` (amber). 12.4 T1 `PASS`; agent idle. 13.4 a dot runs down the right margin. 14.4 `T1 P1 · log1 PASS` is saved. Hold with the dirty copy and the saved row both visible. | T1's copy now differs from the clean start. | 8.0, 9.2, 10.2, 11.2 work E4 · 12.4 chime G5 · 13.4 send G6 · 14.4 store G4 |
| 3 | 17.0–31.0 | **Discard, fresh copy, T2 differs.** 17.0 the T1 copy's rows vanish bottom-up (leftovers included). 18.2 the clean start pulses, still `r0 / d0 / empty`. 19.2 dots copy it again. 19.8 `T2` shows `r0 / d0 / empty`, `ready`. Hold 3.2 s beside the saved T1 row. 23.0 running. 24.2 `P2`, 25.2 `d2`, 26.2 `log2`. 27.4 T2 `FAIL`. 28.4–29.4 `T2 P2 · log2 FAIL` is saved under T1. | T2 never sees P1, d1 or log1; T1's PASS stays recorded. | 17.0–17.5 poof ×3 · 18.2 ack C5 · 19.2 send C6 · 19.8 arrive E5 · 23.0–26.2 work E4 ×4 · 27.4 thump G3 · 28.4 send G6 · 29.4 store G4 |
| 4 | 31.5–42.0 | **Report every attempt.** 31.5 `REPORT` shows `best: T1 PASS` while T1's PASS flashes. 33.2 that line is struck and dims. 34.4 `1 pass · 1 fail · 2 trials` appears as both grades flash. Hold to 40.0, fade to 41.0, black to the end. | Final: clean start unchanged; T2's copy with FAIL; both attempts listed; full count reported. | 31.5 ack G5 · 33.2 miss (quiet) · 34.4 store G4 |

Actor voices: task and clean start C; the trial copy and agent E (the same sounds for T1 and T2, because the setup is unchanged); grader G5/G3; recorder G4. The discard uses `poof`, and the struck `best` line a quiet `miss`. Reading holds are silent.

## Reproduce

From the repository root (uses the pinned `puppeteer-core` 25.14.0 in root `node_modules`):

```
node video/agent-evals/motion-v2/04/engine/render.mjs video/agent-evals/motion-v2/04/scene.js video/agent-evals/motion-v2/04/video.mp4 --sheet video/agent-evals/motion-v2/04/scratch/contact-sheet.png
```

`engine/flow-engine.js` is an unchanged copy of the lesson-03 local engine (`panel`, `txt` with reveal/hl/bar/strike, `tick`, chip `size`, `meta.subtitleSize`). `render.mjs`, `sfx.js` and `preview.html` match the skill copy.

## Lesson text sync (coordinator)

`sequence/lessons.json` item 4 declares duration 28 with beats at 0/7/14/21. For this cut, use duration 42.0 with beats at **0 / 8.0 / 17.0 / 31.5**. This folder does not edit that file.

## Accuracy limits

`r0 / d0 / empty` is shorthand for the intended clean state (repository, task data, fresh context). Real isolation also needs control of caches, external services and tools, and the cut does not show how. The PASS and FAIL outcomes are illustrative and unexplained. Two trials show variation; they do not estimate reliability or prove determinism or nondeterminism. `1 pass · 1 fail · 2 trials` is a count for these attempts only, not a rate. Saved evidence is kept for the evaluator and is not fed to the next trial.
