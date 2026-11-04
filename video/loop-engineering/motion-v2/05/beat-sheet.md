# Lesson 05 beat sheet: Limit repair attempts

**Mechanism:** the controller holds an attempt limit outside the agent: 3, labelled `example`. Each attempt runs only after the agent requests it and the controller confirms an allowance is left. The controller counts an attempt once, when it completes (patch plus test result). After three completed, failing attempts, it refuses the fourth request before any edit or test. The attempt history and the remaining failure go to an engineer.

The three failures differ (`got 119.75`, `95.00`, `92.50` against `want 90.00`), so the stop comes from the limit, not from a no-progress rule. All values are illustrative. Times are playback seconds in the encoded `video.mp4` (`meta.speed 1`). Duration is 44.00 s, with a finite ending (fade to black).

## Synthesis of the two plans

| Idea | Used | Why |
|---|---|---|
| Request → controller check → attempt, repeated for attempts 1–3, with history rows accumulating | Plan A | Shows that permission comes before work, every time |
| Count only on completion: a dot carries each finished attempt's result to the controller, which then strikes one quota slot and updates `k used · n left` | Both (Plan A's completion rule, Plan B's decrement after the log row lands) | The allowance never drops on request or on edit start |
| Three struck-through quota slots plus a numeric count | New, adapted from Plan A's counter strip | The allowance reads as countable units at a glance |
| Different failing values per attempt | Plan B | Avoids implying a no-progress rule |
| The fourth request is refused at the controller with a red ×, a jolt and `refused`; the route to the attempts panel turns dashed; `4 not run` | Both (Plan B's refusal at the controller, Plan A's no fourth patch or test) | The limit is enforced outside the agent, before any edit |
| Handoff `for engineer`: `tried: patch A · B · C`, `pytest -k discount`, `still fails: got 92.50`, `stopped: attempt limit` | Both (what was tried and what still fails) | Lets a person resume without guessing |
| `limit 3 · example` | Plan A | Three is a teaching value, not a recommendation |
| Plan B's run budget and draining time budget | Not used | Other caps the lesson mentions; showing them would split attention from the attempt mechanism |
| Plan B's laptop and `→ engineer` badge; Plan A's compacting history | Not used or replaced | A fixed handoff panel carries the record, and the history stays visible beside it |

## Stage

- **Request bar**, top: `agent` and `request attempt k`, with an `allowed` or `refused` tag.
- **Controller**: `limit 3 · example` (later `reached`), `k used · n left`, and quota slots 1, 2, 3.
- **`attempts · want 90.00`**: one row per attempt, moving through `editing` → `testing` → `got …` with ✗.
- **`for engineer`**, bottom.

Lanes: request → controller (short drop), controller → attempts (short drop, dashed after refusal), each finished row → controller (right-edge lane), attempts → engineer (short drop).

## Beats

| # | Time (s) | What moves | State change | Sound |
|---|---|---|---|---|
| 1 | 0–9.5 | **Configured limit; attempt 1.** 1.5 `request attempt 1`. 2.0 the dot drops to the controller. 2.5 slot 1 glows; 2.8 `allowed`. 3.5 the dot drops to attempts. 4.0 `1 patch A editing`. 5.2 `testing`. 6.8 `got 119.75` ✗. 7.6 a red dot climbs the right lane. 8.4 slot 1 is struck through; `1 used · 2 left`. | The count changes only after the result. Hold 8.4–10.5. | 1.5 arrive C5 · 2.0 send C6 · 2.5 ack G5 · 3.5 send G6 · 4.0/4.35 work G4 · test ticks E4 · 6.8 thump · 7.6 send E6 · 8.4 store G4 |
| 2 | 10.5–18.8 | **Attempt 2**, same sequence with patch B, `got 95.00`. Counted at 17.0: `2 used · 1 left`. | History grows; one allowance is left, so the next attempt is still permitted. | Same pattern |
| 3 | 18.8–28.5 | **Attempt 3**, patch C, `got 92.50`. Counted at 25.3: `3 used · 0 left` in amber; `limit 3 · reached`; the controller outline turns amber. | Allowance exhausted. Attempt 3 itself was allowed and is kept. Hold 25.3–28.5. | Same pattern |
| 4 | 28.5–33.5 | **Refuse attempt 4.** 28.5 `request attempt 4`. 29.0 the dot drops. 29.5 the controller jolts with a red × ring; the slots flash red; `refused`. 29.9 the route to the attempts panel turns dashed. 30.3 `4 not run` appears in a dashed amber row. | No edit and no test. The count stays 3/0. Hold 30.3–33.5. | 28.5 arrive C5 · 29.0 send C6 · 29.5 thump (loudest) · 30.3 ack C5 |
| 5 | 33.5–44.0 | **Hand over.** 33.5 a dot drops to `for engineer`. 34.0 it lights. Rows appear: 34.5 `tried: patch A · B · C`, 35.2 `pytest -k discount`, 35.9 `still fails: got 92.50`. 36.8 `stopped: attempt limit`. 42.4–43.4 fade. | Facts are handed over; no new approach or rerun. Final hold 36.8–42.4. | 33.5 send A6 · 34.0 arrive A5 · three store A5 · 36.8 deliver A4 (low, no fanfare) · silent fade |

Actor pitches: agent C, controller G (its count is a lower G4 store), edit work G4, test work E4, engineer A.

## Reproduce

From the repository root (Node ≥ 22.12, pinned `puppeteer-core 25.14.0` resolved from root `node_modules`, Chrome, ffmpeg):

```
node video/loop-engineering/motion-v2/05/engine/render.mjs video/loop-engineering/motion-v2/05/scene.js video/loop-engineering/motion-v2/05/video.mp4 --sheet video/loop-engineering/motion-v2/05/scratch/contact-sheet.png --wav video/loop-engineering/motion-v2/05/scratch/sfx.wav
ffmpeg -v error -y -ss 40.0 -i video/loop-engineering/motion-v2/05/video.mp4 -frames:v 1 -q:v 2 video/loop-engineering/motion-v2/05/poster.jpg
```

The local `engine/flow-engine.js` adds four general node types:

- `panel`: rows with highlights, tags, icons and dashed outlines.
- `pill`.
- `counter`.
- `token`: a quota unit with fill and strike-through.

It also adds a status mark and an `r` option for dot packets. These were adapted from my earlier local helpers without changing those folders. The shared skill is unchanged.

## Lesson text sync (for the coordinator)

`sequence/lessons.json` item 5 declares `duration: 28` with beats at 0/7/14/21. For this cut the beats would be **0 / 10.5 / 25.3 / 33.5**: configured budget with the first attempt, another failure lowering the allowance, budget exhausted with the next edit blocked, then handoff. Duration is 44.0. This folder does not edit that file.

