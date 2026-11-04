# Lesson 01 beat sheet: Propose, review, execute

**Mechanism:** preparing is not permission. The agent (`can build`) fills in `PROPOSAL A` (service checkout, action deploy, target production, evidence tests passed). Its dashed path toward production stops at an ×. The proposal is submitted and a human (`can decide`) reviews it, but the decision stays `pending`. The executor (`can deploy`) receives proposal A, finds its decision slot `missing`, and waits. `deploy calls 0` and production's `previous release` never change.

Times are playback seconds for `video.mp4` (authored at speed 1). Duration 40.00 s, with a finite pending ending: hold, then fade to black. Nothing is approved or deployed.

## Chosen ideas (neutral A/B attribution)

| Idea | From | Why |
|---|---|---|
| Ending with the executor waiting and production unchanged | Plan A | Matches lesson item 1 ("the executor waits… a proposal alone cannot trigger execution"); Plan B's approval and deployment belong to later material |
| One proposal record that stays in place while its status changes (`draft → submitted`, then `decision pending`) | Plan A | Responsibility changes hands without three similar boxes in a row |
| Fields filled one at a time; reviewer highlights action, target and evidence | Plan A | Concrete action details a reviewer needs |
| `ROLES` table: agent `can build`, human `can decide`; executor `can deploy` | Plan B (three credentials), made a compact table | Shows that the agent doesn't need deploy access, without three role cards |
| Executor slots `proposal A` and `decision missing`, status `checking → waiting` | Plan B (two slots), Plan A (`authorization missing`, `waiting`) | A proposal alone leaves the executor waiting |
| `deploy calls 0` next to the executor, and a `PRODUCTION · CHECKOUT` strip showing `previous release` | Plan A | Visible proof that nothing ran |
| The agent's dashed path in the left margin stops at a persistent × before production | Plan B | The agent has no deploy route |
| A submit dot down the right margin into the executor, which never reaches production | Plan A | The executor receives the request but does not act |
| Not used: Plan B's approval, deploy chip, four-cell status strip and digest; Plan A's toolbar resize | — | Out of scope for this lesson, or replaced by the roles table |

## Beats

| # | Time (s) | What moves | State change | Sound |
|---|---|---|---|---|
| 1 | 0.0–10.5 | **The agent prepares; nothing deploys.** 0.6 `ROLES`: agent `can build · preparing`, human `can decide · —`. 1.6 `PROPOSAL A` (`draft`). 2.6, 3.7, 4.8 and 5.9 service, action, target and evidence fill one at a time (agent blue; evidence teal). 7.0 a blue dot runs down the agent's dashed margin path. 8.4 an × draws where it stops, and production's row flashes unchanged. | Production stays `previous release`. | 0.6 arrive C5 · 2.6, 3.7, 4.8 work C4 · 5.9 ack C5 · 7.0 send C6 · 8.4 miss |
| 2 | 10.5–19.0 | **Submitted; a human reviews.** 10.5 the status turns `submitted` and the values turn white. 11.5 roles show agent `submitted` and human `reviewing`. 12.8, 13.9 and 15.0 action, target and evidence highlight in turn. 16.2 `decision pending` appears (amber). Hold. | No decision is made. | 10.5 send C6 · 11.5 arrive E5 · 12.8, 13.9, 15.0 ack E5 · 16.2 ack E4 |
| 3 | 19.0–28.2 | **The executor waits.** 19.0 `EXECUTOR` shows `checking`, with rows `can deploy`, `proposal —`, `decision —`, `deploy calls 0`. 20.2 a dot runs down the right margin. 21.2 `proposal A`. 22.4 the decision slot and the proposal's `pending` highlight together. 23.4 the slot reads `missing`. 24.4 status `waiting`; `deploy calls 0` highlights. Hold. | One slot filled, one missing; no call. | 19.0 arrive G5 · 20.2 send E6 · 21.2 store G5 · 22.4 work G4 · 23.4 ack G4 · 24.4 ack G4 |
| 4 | 28.2–40.0 | **Preparation is different from permission.** 28.2, 29.1 and 30.0 `can build`, `can decide` and `can deploy` highlight in turn. 31.4 human → `deciding`; `pending` highlights. 32.6 `deploy calls 0`, then 33.1 production `previous release`. Hold to 38.0, fade to 39.0, black to the end. | Final: proposal submitted, decision pending, executor waiting, 0 calls, production unchanged. | 28.2 ack C5 · 29.1 ack E5 · 30.0 ack G5 · 31.4 ack E4 · 33.1 ack G3 |

Actor voices: agent C, human reviewer E, executor G, and production a low G3 status check. The blocked agent path uses a quiet `miss`. Waiting is not a failure, so no crash or alarm sounds play. Reading holds are silent.

## Reproduce

From the repository root (uses the pinned `puppeteer-core` 25.14.0 in root `node_modules`):

```
node video/human-in-the-loop/motion-v2/01/engine/render.mjs video/human-in-the-loop/motion-v2/01/scene.js video/human-in-the-loop/motion-v2/01/video.mp4 --sheet video/human-in-the-loop/motion-v2/01/scratch/contact-sheet.png
```

`engine/flow-engine.js` is an unchanged copy of the local engine from `video/agent-evals/motion-v2/05/engine/` (`panel`, `txt` with reveal/hl/bar/strike, `tick` check or x, chip `size`, `meta.subtitleSize`). `render.mjs`, `sfx.js` and `preview.html` match the skill copy.

## Lesson text sync (coordinator)

`sequence/lessons.json` item 1 declares duration 28 with beats at 0/7/14/21. For this cut, use duration 40.0 with beats at **0 / 10.5 / 19.0 / 28.2**. This folder does not edit that file.

## Accuracy limits

`PROPOSAL A` is an illustrative label, not an immutable identity; binding a decision to an exact artifact is later material. `tests passed` is evidence, not approval. `can build / can decide / can deploy` are teaching labels for authority, and the reviewer's authority is not a system credential. The dashed path and × show that the agent has no deploy route; the cut doesn't show how that is enforced. The roles may share infrastructure in practice. Waiting is neither approval nor rejection, and no automatic approval follows elapsed time.
