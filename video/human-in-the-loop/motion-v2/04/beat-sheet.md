# Lesson 04 beat sheet: Reject an approval mismatch

**Mechanism:** the recorded approval (`approved · R1`) names `deploy · production · A · 7c2e…`. An edit produces build `B · 92bd…04c8`, `current` moves to B, and the request's artifact changes to `B · 92bd…` while the approved column keeps A. The executor compares the fields one at a time: action ✓, target ✓, artifact ✗. Its result is `mismatch`, the status `blocked`, `deploy calls 0`, and `production previous`. B is then sent to its own `REVIEW B` with `evidence T8 on B` and `decision pending`. The approval for A stays attached to A.

Times are playback seconds for `video.mp4` (authored at speed 1). Duration 45.00 s, with a finite ending: hold, then fade to black. Nothing is deployed and B is not approved.

## Chosen ideas (neutral A/B attribution)

| Idea | From | Why |
|---|---|---|
| `BUILDS` strip with A and B, and a `current A → current B` status after an edit dot | Plan B (history lane and current pointer) | Shows the change that makes the approval stale |
| Comparison table: field / `approved · R1` / `requested` | Both | The diff of recorded and requested values carries the lesson |
| Scan order action → target → artifact, with the artifact held side by side before the ✗ | Plan A | The matching fields don't authorize the whole request; the one differing field decides |
| The approved column never changes; only the requested artifact flips to B | Both | Approval is not rewritten or transferred |
| Executor rows `result mismatch`, `deploy calls 0`, `production previous`, with status `checking → blocked` | Plan A (counter and status), Plan B (unchanged production) | Blocking is a state change with visible proof that nothing deployed |
| A blue dot carries B down the right margin into `REVIEW B` with `artifact`, `evidence T8 on B`, `decision pending` | Plan A (T8 on B, pending), Plan B (B returned to review) | B gets its own review and evidence |
| Not used: Plan B's `params canary 10%` row, its `tests B ✓` row, and its dashed deploy path to a production box | — | Three fields are enough; `T8 on B` names evidence without claiming a result; the counter and `production previous` already show no deployment |

## Beats

| # | Time (s) | What moves | State change | Sound |
|---|---|---|---|---|
| 1 | 0.0–11.0 | **The artifact changes; the approval still names A.** 0.6 `BUILDS` shows A with `current A`. 1.6 `COMPARE`: `approved · R1` deploy / production / `A · 7c2e…`. 2.8 requested values match. 4.4 an edit dot; 4.9 B appears. 5.6 `current B`; A dims. 6.6 requested artifact → `B · 92bd…` (highlighted). 7.6 the approved artifact and header flash, unchanged. 8.4 `EXECUTOR idle` with `result —`, `deploy calls 0`, `production previous`. | Approved column unchanged. | 0.6 arrive C5 · 1.6 arrive E5 · 2.8 ack C5 · 4.4 send C6 · 4.9 store C5 · 5.6 arrive C5 · 6.6 ack C5 · 7.6 ack E5 · 8.4 ack G4 |
| 2 | 11.0–20.2 | **Compare field by field.** 11.0 executor `checking`. 11.8 the action pair highlights; ✓ at 12.6. 13.6 target pair; ✓ at 14.4. 15.6 both artifacts highlight (amber) and are held. 17.4 ✗; the artifact highlights turn red; `result mismatch`. | Two matches, one mismatch. | 11.0, 11.8, 13.6, 15.6 work G4 · 12.6, 14.4 ack G5 · 17.4 miss |
| 3 | 20.2–28.0 | **Execution is blocked.** 20.2 executor turns red, shakes, `blocked`. 21.6 `deploy calls 0` flashes. 22.8 `production previous` flashes. Hold. | No deployment. | 20.2 thump G3 · 21.6 ack G4 · 22.8 ack C4 |
| 4 | 28.0–37.0 | **B needs its own review.** 28.0 the requested B flashes and a blue dot carries it down the right margin. 29.0 `REVIEW B · new`, `artifact B · 92bd…04c8`. 30.4 `evidence T8 on B`. 31.8 `decision pending`; status `pending`. 33.2 the approved A and its header flash, unchanged. | B has no decision; A's approval stays with A. | 28.0 send E6 · 29.0 arrive A5 · 30.4 store E5 · 31.8 ack A4 · 33.2 ack E5 |
| 5 | 37.0–45.0 | **Hold the result.** 37.0 approved A, 38.0 requested B, 39.0 `decision pending` flash in turn. Hold to 43.0, fade to 44.0, black to the end. | Final: current B, approved A, ✗ on artifact, blocked, 0 calls, review B pending. | 37.0 ack C5 · 38.0 ack E5 · 39.0 ack A4 |

Actor voices: builds and approval record C/E, executor G, production a low C4, review A. The mismatch is a `miss` and the block a thump, with no crash and no success chime. Reading holds are silent.

## Reproduce

From the repository root (uses the pinned `puppeteer-core` 25.14.0 in root `node_modules`):

```
node video/human-in-the-loop/motion-v2/04/engine/render.mjs video/human-in-the-loop/motion-v2/04/scene.js video/human-in-the-loop/motion-v2/04/video.mp4 --sheet video/human-in-the-loop/motion-v2/04/scratch/contact-sheet.png
```

`engine/flow-engine.js` is an unchanged copy of the human-in-the-loop lesson-03 local engine (`panel`, `txt` with reveal/hl/hlH/bar/strike, `tick` check or x, chip `size`, `meta.subtitleSize`). `render.mjs`, `sfx.js` and `preview.html` match the skill copy.

## Lesson text sync (coordinator)

`sequence/lessons.json` item 4 declares duration 28 with beats at 0/7/14/21. For this cut, use duration 45.0 with beats at **0 / 11.0 / 20.2 / 28.0**. This folder does not edit that file.

## Accuracy limits

The digests are abbreviated for display. The executor compares full immutable identities and complete action parameters, not prefixes or friendly names. `mismatch · blocked` means the available decision does not authorize B; it does not say B is wrong. `T8 on B` names evidence for B, not a result or reused evidence from A. Requiring a fresh human decision for B is this design's policy, and other changes may only need revalidation. Protecting against substitution between check and use isn't shown. A's approval still exists; whether A should deploy isn't addressed.
