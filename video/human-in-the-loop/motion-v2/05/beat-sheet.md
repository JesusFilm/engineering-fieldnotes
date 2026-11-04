# Lesson 05 beat sheet: Record the outcome

**Mechanism:** this is a sequence diagram of a new run in which release A is approved. Three lifelines carry live state in their headers: executor, deploy API, production. The executor checks `approved A ✓` and `may deploy ✓`, creates `key k7`, and sends `deploy A · k7`. The API marks `seen k7` and applies A; production shows `run A` and `effects 1`. The `applied` reply is lost when the executor crashes, so the outcome record still reads `observed unknown`. After a restart, the executor retries with the same key. The API answers `already done` without touching production, and `effects` stays 1. A `health?` probe returns `ok · A`, and only then does the record store `effects 1 · key k7` and `observed ok · A running`, separate from `approved R1`.

Times are playback seconds for `video.mp4` (authored at speed 1). Duration 42.00 s, with a finite ending: hold, then fade to black.

## Chosen ideas (neutral A/B attribution)

| Idea | From | Why |
|---|---|---|
| Sequence diagram with three lifelines, time flowing down, and arrows that draw as chips travel | Plan B | New geometry for this topic; every message is a visible event |
| Approval and permission ticks plus a key before anything is sent | Both (Plan B's `approved A ✓`/`may deploy ✓`/`key k7`, Plan A's association recorded before dispatch) | Approval is a precondition, not a result |
| Crash after apply and before the reply arrives; `applied` struck through in red at an × | Plan B | Shows why a blind repeat is dangerous |
| Record shows `observed unknown` while production already shows `effects 1` | Plan A | The key contrast: the external effect exists but the executor hasn't observed it |
| Retry with the same `k7`; the API answers `already done` without touching production; `effects` stays 1 | Plan B (idempotency key), Plan A (no second operation) | A restart must not repeat effects |
| `health?` / `ok · A` observation before the record changes to `recorded` | Both | Record what was observed, tied to A |
| Final pairing: `approved A` with the record's `approved R1`, then `effects 1`, `ok · A` and `observed` | Plan B | Approval and successful execution are different facts |
| Not used: Plan A's GET D7 lookup panel and R7→D7 association row; Plan B's five-row record | — | One reconciliation mechanism is enough; four record rows fit at 350 px |

## Beats

| # | Time (s) | What moves | State change | Sound |
|---|---|---|---|---|
| 1 | 0.0–8.0 | **A separate run; approval and permission are checked.** 0.5 `new run · release A approved`, three headers and lifelines; `keys —`, `run prev`, `effects 0`. 1.9 `approved A ✓`. 2.8 `may deploy ✓`. 3.4 `key k7`. 4.6 `OUTCOME · A · unknown` with target, `approved R1`, `effects —` and `observed unknown`. | Nothing sent yet. | 0.5 arrive C5 · 1.9, 2.8 ack D5 · 3.4 store G5 · 4.6 store A5 |
| 2 | 8.0–22.0 | **Perform once; a restart must not repeat the effect.** 8.0 `deploy A · k7` → API; 8.8 `seen k7`. 9.6 `apply A` → production; 10.4 `run A`, `effects 1`. 11.4 the `applied` reply heads back. 12.0 the executor turns red and shakes, an × appears on its lifeline, and `applied` is struck through in red. 13.4 `effects 1` and `observed unknown` flash. 15.6 `restart`. 16.6 `key k7` flashes. 17.2 the retry `deploy A · k7` (amber). 18.0 `seen k7` flashes. 18.8 `already done` returns. 20.4 `effects 1` flashes, unchanged. | One effect; the executor doesn't know the outcome yet. | 8.0 send G6 · 8.8 arrive E5, store E5 · 9.6 send E6 · 10.4 arrive C4, store C4 · 12.0 crash, poof (quiet) · 13.9 ack A4 · 15.6 recover · 17.2 send G6 · 18.0 hit E5 · 19.6 arrive G5 · 20.4 ack C4 |
| 3 | 22.0–31.0 | **Observe and record.** 24.0 `health?` → production. 25.4 `ok · A` returns (green). 27.4 effects → `1 · key k7`. 28.3 observed → `ok · A running`; status `recorded`. | The record holds what was observed. | 24.0 send G6 · 26.4 deliver C5 · 27.4, 28.3 store A5 |
| 4 | 31.0–42.0 | **Approval and execution are different facts.** 32.0 `approved A` and the record's `R1` flash together. 33.6 `effects 1`, `ok · A` and `observed` flash together. 35.0 the lost `applied` flashes. Hold to 40.0, fade to 41.0, black to the end. | Final diagram and record. | 32.0 ack D5 · 33.6 ack C4 |

Actor voices: executor G, deploy API E, production C4, approval facts D5, outcome record A5. The crash is the loudest event. The retry is recognised with a `hit`, and no success fanfare plays. Reading holds are silent.

## Reproduce

From the repository root (uses the pinned `puppeteer-core` 25.14.0 in root `node_modules`):

```
node video/human-in-the-loop/motion-v2/05/engine/render.mjs video/human-in-the-loop/motion-v2/05/scene.js video/human-in-the-loop/motion-v2/05/video.mp4 --sheet video/human-in-the-loop/motion-v2/05/scratch/contact-sheet.png
```

`engine/flow-engine.js` is a copy of the human-in-the-loop lesson-04 local engine (`panel`, `txt` with reveal/hl/hlH/bar/strike, `tick` check or x, chip `size`, `meta.subtitleSize`), plus one general `[local]` node type, `arrow` (a horizontal message arrow that draws itself, with a head). `render.mjs`, `sfx.js` and `preview.html` match the skill copy.

## Lesson text sync (coordinator)

`sequence/lessons.json` item 5 declares duration 28 with beats at 0/7/14/21. For this cut, use duration 42.0 with beats at **0 / 8.0 / 22.0 / 31.0**. This folder does not edit that file.

## Accuracy limits

`k7` stands for a unique request identity that the deployment system honours or reconciles, and keeps long enough. That is a design choice for the real operation, not a general exactly-once guarantee. Other crash points, lost submissions and concurrent executors need their own handling. `effects 1` counts deployment effects, not network requests. `ok · A` is a point-in-time health observation, not proof that A is correct, and neither is approval. The approval match and permission scope are assumed from earlier lessons and not redrawn. A failed apply would be recorded as failed, never upgraded because of approval.
