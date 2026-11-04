# Lesson 03 beat sheet: Pause without guessing

**Mechanism:** workflow W7 (`deploy A · production`) stops at its `review` stage, before the action, and saves `run W7 · action deploy A · production · stage review · decision pending` to durable storage outside the worker. The worker goes offline and loses its memory (`mem —`); it comes back and restores `W7 · A` from the saved state, still paused. Waiting 2, 8 and then 24 hours cannot write the decision field, and that dashed path stops at an ×. Only `approve A · R1` from the reviewer changes the stored decision. The run then resumes to `revalidate`, while `execute` stays `not run` and `deploy calls 0`.

Times are playback seconds for `video.mp4` (authored at speed 1). Duration 49.00 s, with a finite ending: hold, then fade to black.

## Chosen ideas (neutral A/B attribution)

| Idea | From | Why |
|---|---|---|
| Stage list `prepare / review / revalidate / execute` with per-stage status (`paused`, `resumed`, `checking`, `not run`) | Both (Plan A's rail, Plan B's step column) | Shows the position held, and that execute stays dark |
| `WORKER` card with in-memory state `mem W7 · A` that goes `offline` → `mem —` → `restored` | Plan B (memory wiped, refilled from the checkpoint), Plan A (online/offline/restored) | Shows why the pause must be durable |
| `SAVED STATE` record outside the worker, `saving…` → `saved`, with run, action, stage and decision; it stays lit through the restart | Plan A | The action under review is preserved |
| Save and restore dots in the left margin between worker memory and saved state | Both | Saving and restoring are visible events |
| `waited 0 h → 2 h → 8 h → 24 h` on the reviewer card, then a dashed path toward the decision field that stops at an × | Plan B (timer event refused), Plan A (explicit time jumps, no countdown) | Elapsed time is not consent |
| Decision `approve A · R1` travels down the right margin and changes only `decision` | Plan A | Only a decision resumes the run |
| Resume to `revalidate · checking` with execute `not run` and `deploy calls 0` | Plan A | Revalidation comes before execution; this lesson doesn't show it finishing |
| Not used: Plan B's `artifact A ✓ · target ready ✓` recheck marks and `cleared`; its crash sound; Plan A's separate `verified` marker | — | The recheck's outcome is later material; a restart is a state change, not a disaster |

## Beats

| # | Time (s) | What moves | State change | Sound |
|---|---|---|---|---|
| 1 | 0.0–9.0 | **Reach the review boundary.** 0.6 `WORKFLOW W7 · deploy A · production`. 1.4 the stages appear and prepare runs. 2.4 `prepare done`. 3.2 review → `paused` (amber). 4.4 `WORKER online`, `mem W7 · A`. 5.3 `REVIEWER`: `no decision`, `waited 0 h`. 6.3 `execute not run` flashes. | Execute stays dark; `deploy calls 0`. | 0.6 arrive C5 · 1.4 work C4 · 2.4 ack C5 · 3.2 arrive C5, 3.6 ack C4 · 4.4 ack E5 · 5.3 arrive A5 · 6.3 ack G3 |
| 2 | 9.0–17.0 | **Save state and the proposed action.** 9.0 `SAVED STATE saving…`; a blue dot runs down the left margin. 9.9–11.6 run, action, stage and decision fill in turn. 12.3 status `saved`; the stored action and worker memory highlight together. Hold. | The saved state matches the worker's memory. | 9.0 send E6 · 9.9, 10.5, 11.0, 11.6 store G5 · 12.3 ack G5 |
| 3 | 17.0–27.0 | **The pause survives a restart.** 17.0 the worker turns red (`offline`), shakes, and memory becomes `mem —`. 18.0–18.9 each saved row flashes, unchanged. 20.6 worker `online`. 21.6 a dot runs from saved state back to the worker. 22.5 `mem W7 · A`, status `restored`. 23.6 `review paused` flashes. | Still paused, decision pending. | 17.0 thump E3 · 18.0 ack G4 · 20.6 arrive E5 · 21.6 send G6 · 22.5 arrive E5 · 23.6 ack C4 |
| 4 | 27.0–36.0 | **No decision; waiting is not consent.** 27.0, 28.0 and 29.0 `waited 2 h`, `8 h`, `24 h`. 30.2 a grey dot runs along a dashed path toward the decision field. 31.1 an × stops it, and `pending` flashes. 32.3 `paused` and `no decision` flash. | Decision still `pending`. | 27.0, 28.0, 29.0 clock · 31.1 thump C3 (soft) · 32.3 ack C4 |
| 5 | 36.0–49.0 | **A decision resumes; revalidate first.** 36.0 the reviewer shows `approve A · R1` (green). 37.0 a green dot runs down the right margin. 38.0 decision → `approved · R1`. 39.2 review → `resumed`. 40.2 `revalidate checking`; the stored stage → `revalidate`; worker `checking`. 41.4 the stored action highlights. 42.6 `deploy calls 0` pulses. Hold to 47.0, fade to 48.0, black to the end. | Final: approved, revalidation running, execute not run, 0 calls. | 36.0 chime A5 (soft) · 37.0 send A6 · 38.0 store G5 · 39.2 arrive C5 · 40.2 work E4 · 41.4 ack C5 · 42.6 ack G3 |

Actor voices: workflow C, worker E, saved state G, reviewer A, executor a low G3. Elapsed-time steps use `clock` ticks, and the refused timeout a soft low thump. The worker restart is a muted thump with no crash. Reading holds are silent.

## Reproduce

From the repository root (uses the pinned `puppeteer-core` 25.14.0 in root `node_modules`):

```
node video/human-in-the-loop/motion-v2/03/engine/render.mjs video/human-in-the-loop/motion-v2/03/scene.js video/human-in-the-loop/motion-v2/03/video.mp4 --sheet video/human-in-the-loop/motion-v2/03/scratch/contact-sheet.png
```

`engine/flow-engine.js` is a copy of the human-in-the-loop lesson-02 local engine (`panel`, `txt` with reveal/hl/bar/strike, `tick` check or x, chip `size`, `meta.subtitleSize`), plus one general `[local]` option, `txt.hlH`, for a fixed highlight-band height. `render.mjs`, `sfx.js` and `preview.html` match the skill copy.

## Lesson text sync (coordinator)

`sequence/lessons.json` item 3 declares duration 28 with beats at 0/7/14/21. For this cut, use duration 49.0 with beats at **0 / 9.0 / 27.0 / 36.0** (the restart, 17–27 s, belongs to the save beat). This folder does not edit that file.

## Accuracy limits

The saved state stands for durable storage chosen to survive the worker restart shown; it doesn't claim to survive storage loss or every failure. An in-memory checkpoint would have been lost. `mem W7 · A` is a simplified view of process memory. The stage list shows logical position; resuming may re-run node code, and exactly-once execution is not shown. The waits are illustrative time jumps, and real timeouts may lead to escalation or expiry, never approval. `approve A · R1` stands for an authenticated decision stored in protected state. Revalidation has started but its outcome isn't shown. A real resume could also carry a rejection or edits.
