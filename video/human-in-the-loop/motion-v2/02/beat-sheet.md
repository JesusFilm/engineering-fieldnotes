# Lesson 02 beat sheet: Give the reviewer evidence

**Mechanism:** a vague `"ship the fix?"` gives the reviewer nothing to inspect. The request is rewritten as a concrete action: `deploy checkout`, artifact `A · 7c2e…91af`, target `production`. It comes with evidence for that same A: two observed tests from run T7, plus a risk and a recovery. The human presses `Approve A` deliberately. The decision record then copies the exact action, target and artifact from the request, field by field. The executor shows `will check A · 7c2e…91af` and has not run.

Times are playback seconds for `video.mp4` (authored at speed 1). Duration 44.00 s, with a finite ending: hold, then fade to black. Nothing is deployed.

## Chosen ideas (neutral A/B attribution)

| Idea | From | Why |
|---|---|---|
| Open on a vague `"ship the fix?"` request (status `vague`) that is struck out and replaced by concrete fields | Plan B | Contrasts a vague request with an inspectable action |
| Fixed request fields `action / artifact / target`, with the artifact as an alias plus an abbreviated digest | Plan A (artifact ID with digest), Plan B (field-by-field request) | The action identity stays above the evidence and never changes |
| `EVIDENCE FOR A` with `tests` and `risks` tabs; tests show the observed outcome with ticks and `source test run T7 on A` | Plan A | Concrete observed checks tied to the same A; only one tab's content shows at a time |
| Risk `brief restart` and recovery `prior release`, still visible after approval | Plan A (risk/recovery), Plan B (risk row) | Approval doesn't erase the risk |
| `HUMAN REVIEW` with an `Approve A` button pressed only after the reviewer re-checks action, target and artifact | Plan A | A deliberate decision, not one triggered by test results |
| The decision record (`pending` → `approved · R1`) copies each field from the request via the right margin | Both (Plan B's copy path, Plan A's sequential field reveal) | The decision stores the identity of the action it applies to |
| `EXECUTOR · not run` with `will check A · 7c2e…91af`, pulsed with the stored artifact | Plan A | Execution must check the same identity; this lesson stops before execution |
| Not used: Plan B's later artifact `B` rejected at the executor, and its `sees N fields` counter | — | Artifact substitution is later-lesson material; the counter adds text without new meaning |

## Beats

| # | Time (s) | What moves | State change | Sound |
|---|---|---|---|---|
| 1 | 0.0–9.0 | **Name the artifact and its destination.** 0.6 `REVIEW REQUEST` shows `"ship the fix?"` with status `vague`. 1.9 the empty evidence panel pulses. 3.4 the vague line is struck through and removed. 4.4, 5.3 and 6.2 `action deploy checkout`, `artifact A · 7c2e…91af` (blue) and `target production` appear. | Decision `pending`, executor `not run`. | 0.6 arrive C5 · 1.9 miss (quiet) · 3.4 ack C4 · 4.4, 6.2 ack C5 · 5.3 ack C6 |
| 2 | 9.0–19.5 | **Observed tests for A.** 9.0 `EVIDENCE FOR A` with the `tests` tab underlined. 10.2 `empty pw → rejected`, ticked at 10.8. 12.0 `valid pw → accepted`, ticked at 12.6. 13.6 `source test run T7 on A`. 15.0 `HUMAN REVIEW` and the `Approve A` button appear. 15.8 and 16.8 the human highlights each result. | No approval yet. | 9.0 arrive E5 · 10.2, 12.0 deliver E5 · 10.8, 12.6 ack E5 · 15.0 arrive G5 · 15.8, 16.8 ack G5 |
| 3 | 19.5–26.5 | **Risks and recovery.** 19.5 the `risks` tab is selected and the test rows clear. 20.4 `risk brief restart`. 21.4 `recovery prior release`. 22.8 and 23.8 the human highlights each. | The identity above stays fixed. | 19.5 send G6 · 20.4, 21.4 ack E4 · 22.8, 23.8 ack G5 |
| 4 | 26.5–37.0 | **Decide about A; store what it applies to.** 26.5 action and target highlight; 27.5 the artifact. 28.8 `Approve A` turns green. 29.6 `DECISION` → `approved · R1`. 30.6, 31.7 and 32.8 blue dots copy action, target and artifact from the request down the right margin into the record, each source row highlighting first. | The record holds `deploy checkout · production · A · 7c2e…91af`; the risk is still shown. | 26.5, 27.5 ack G5 · 28.8 chime G5 (soft) · 29.6 store C6 · 31.4, 32.5, 33.6 ack C6 |
| 5 | 37.0–44.0 | **Execution must check that identity.** 37.0 `EXECUTOR` lights: `will check A · 7c2e…91af`, still `not run`. 38.0 the request's artifact, the stored artifact and the executor row highlight together. Hold to 42.0, fade to 43.0, black to the end. | Final: concrete request, evidence, approval for A, a stored identity, executor not run. | 37.0 ack A4 · 38.0 ack C6 |

Actor voices: proposal C5; evidence E5/E4; human reviewer G5/G6; decision store C6; executor A4. The vague request gets a quiet `miss`, and approval a soft chime only when the button is pressed. Reading holds are silent.

## Reproduce

From the repository root (uses the pinned `puppeteer-core` 25.14.0 in root `node_modules`):

```
node video/human-in-the-loop/motion-v2/02/engine/render.mjs video/human-in-the-loop/motion-v2/02/scene.js video/human-in-the-loop/motion-v2/02/video.mp4 --sheet video/human-in-the-loop/motion-v2/02/scratch/contact-sheet.png
```

`engine/flow-engine.js` is an unchanged copy of the human-in-the-loop lesson-01 local engine (`panel`, `txt` with reveal/hl/bar/strike, `tick` check or x, chip `size`, `meta.subtitleSize`). `render.mjs`, `sfx.js` and `preview.html` match the skill copy.

## Lesson text sync (coordinator)

`sequence/lessons.json` item 2 declares duration 28 with beats at 0/7/14/21. For this cut, use duration 44.0 with beats at **0 / 9.0 / 26.5 / 37.0** (the evidence beat spans the tests and risks tabs, 9.0–26.5). This folder does not edit that file.

## Accuracy limits

`7c2e…91af` is abbreviated for legibility. The stored decision and the executor check refer to the full immutable identity, not a prefix. The tests are synthetic examples tied to A; passing them is not proof of correctness or approval. The risk and recovery lines are short summaries, not a rollout plan. `R1` stands for an authenticated reviewer in protected application state, which isn't drawn. Approval covers this action and target only and is not blanket permission. The executor has not run, so pending is neither success nor failure.
