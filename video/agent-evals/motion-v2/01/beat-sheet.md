# Lesson 01 beat sheet: Task, trial and grader

**Mechanism:** the task's success criteria exist before anything runs and are copied to the grader. One trial (T1) of the whole agent system (model, harness, tools, repo) produces patch P1 and a trace. Only that artifact goes to the grader, which runs its own checks, records what it observed against what was expected, and writes a grade for T1 alone.

**Example:** Task A, `Fix empty-password login`, with criteria `1 empty password → reject` and `2 valid password → accept`.

Times are playback seconds for the encoded `video.mp4` (authored at speed 1, so scene time = playback time). Duration 42.00 s, with a finite ending: hold, then fade to black.

## Chosen ideas (neutral A/B attribution)

| Idea | From | Why |
|---|---|---|
| A stacked evaluation record: task, trial, grader, results | Both | A vertical run sheet in software terms, with a different panel for each role and no generic three-box chain |
| Criteria copied to the grader down the right margin before the trial, outside the trial frame | Plan B | Shows that grading rules are fixed in advance and never pass through the system under test |
| Trial frame holding `model · harness · tools · repo`, lighting in order on each step | Plan B, applied to Plan A's event list | Each lit sweep produces one concrete event row, so the whole system visibly acts |
| Event rows `read auth.py`, `edit auth.py`, `save patch P1`, kept as the trace | Plan A | Concrete trial work, and the trace becomes inspectable evidence |
| Status words `ready → running → finished`; the results row still reads `ungraded` | Plan A | Finishing a trial is not the same as grading it |
| Grader table with expected and observed columns; observed starts as `—`, becomes `?` when P1 arrives, then `checking` with a progress underline, then the value and a tick | Plan A | Unknown never looks like a pass, and each tick follows an observation |
| Task criterion and grader row highlighted together during each check | Plan A (gutter link, simplified) | Ties the check to the predeclared criterion without a line crossing the trial |
| Results rows `T1 criteria met` and `T2 not run` | Plan B (ledger, cut to 2 rows) | The grade belongs to one trial; the empty row shows that nothing is claimed about the next run |
| Not used: Plan A's crossfade to an artifact view | — | Keeping the event rows is simpler and still shows the trace |
| Not used: Plan B's 20-blip rotation, third ledger row, and `meta.speed 0.9` | — | Three purposeful sweeps carry the idea; fewer elements read better at 350 px |
| Excluded: broken patches, grader failures, repeated trials, metrics | — | These belong to later lessons |

## Beats

| # | Time (s) | What moves | State change | Sound |
|---|---|---|---|---|
| 1 | 0.0–9.5 | **Define the task.** 0.6 the task panel lights and its goal types out. 2.3 and 3.1 the criteria appear. 4.4 and 5.0 two orange dots run down the right margin. 5.9 and 6.5 they land. Hold 6.8–9.5. | Grader rows fill `empty / reject / —` and `valid / accept / —`. Trial shows `ready` (dashed). Results show `T1 ungraded`. | 0.6 store C5 · 2.3, 3.1 ack C6 · 4.4, 5.0 send C6 (panned right) · 5.9, 6.5 store G5 |
| 2 | 9.5–21.0 | **Run one trial.** 9.5 the `Task A` chip drops into the trial. 10.2 the frame goes solid and shows `running`. 11.3, 13.6 and 15.9 the model, harness, tools and repo light in turn; a row appears 1.3 s after each sweep starts. 18.2 `finished`. 19.1 `T1 ungraded` flashes. Hold to 21. | Trace rows appear; `save patch P1` is blue (trial output colour). The grader stays `waiting`. | 9.5 send C6 · 10.2 arrive E5 · sweeps ack E5–F♯5–G♯5–B5 (panned by part) · 12.6, 14.9 work E4 · 17.2 store E5 · 18.2 ack E5 · 19.1 ack C4 (results voice) |
| 3 | 21.0–31.5 | **Grader checks P1.** 21.0 the `P1 + trace` chip moves from the trial into the grader. 22.0 status `has P1`, and the observed cells become `?`. Hold to 24.3. 24.3 criterion 1 and `reject` highlight; the observed cell runs `checking` for 1.7 s. 26.0 `reject` turns green with a tick. 27.6–29.3 the same for `accept`. 30.0 `done`. | Observed column: `—` → `?` → `checking` → value plus tick. The grader border turns green at 30.0. | 21.0 send E6 · 22.0 arrive G5 · work G4 ×4 per check · 26.0, 29.3 hit G5 · 30.0 ack G5 |
| 4 | 31.5–42.0 | **The grade is for this trial.** 31.5 the `criteria met` chip drops to results. 32.3 the T1 row turns green. 33.6 `T2 not run` flashes and stays empty. 34.8 the trial frame and T1 row glow together. Hold to 40.0, fade 40.0–41.0, black to 42.0. | Final state: task and criteria unchanged; trial `finished`; grader `done` with two ticks; `T1 criteria met`, `T2 not run`. | 31.5 send G6 · 32.3 store C6 · 33.6 ack C4 · 34.8 chime C6 · silent hold |

Actor voices: task C5/C6; trial E5 and the rising four parts; grader G4/G5; results C4/C6. Sends sit an octave above their actor and are quieter than arrivals. The chime at 34.8 marks the result; the cut has no loud disruption because nothing fails in this lesson.

## Reproduce

From the repository root (uses the pinned `puppeteer-core` 25.14.0 in root `node_modules`):

```
node video/agent-evals/motion-v2/01/engine/render.mjs video/agent-evals/motion-v2/01/scene.js video/agent-evals/motion-v2/01/video.mp4 --sheet video/agent-evals/motion-v2/01/scratch/contact-sheet.png
```

The local engine copy adds general node types `panel`, `txt` and `tick`, an optional chip text `size`, and `meta.subtitleSize`. All are marked `[local]` in `engine/flow-engine.js`; `render.mjs`, `sfx.js` and `preview.html` match the skill copy.

## Lesson text sync (coordinator)

`sequence/lessons.json` item 1 declares `duration: 28` with beats at 0/7/14/21. For this cut, use duration 42.0 with beats at **0 / 9.5 / 21.0 / 31.5**. This folder does not edit that file.

## Accuracy limits

The task, criteria, trace and passing result are illustrative, not measured. The four parts and their fixed lighting order are a teaching simplification of a real system. Two cases are intentionally incomplete coverage, and passing them is no security or release guarantee. The grader's checks are shown as its own work; how they are kept outside the agent's editable submission is not shown.
