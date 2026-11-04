# Lesson 03 beat sheet: Stop after verified success

**Mechanism:** the same twelve selected tests run again on the repaired code B, and all twelve pass. The controller checks its success rule against that fresh evidence: current code is B, the same 12 tests ran, and 12 of 12 passed. When the rule is met, the controller closes the edit loop and hands the unchanged code and its evidence to review. The record ends at `review pending`. A passing selected suite supports the tested behaviour; nothing on screen claims the code is correct, approved or merged.

The values (code B, `pytest -k discount`, 12 tests) are illustrative and continue lesson 02's example. Times are playback seconds in the encoded `video.mp4` (`meta.speed 1`). Duration is 33.00 s, with a finite ending (fade to black).

## Synthesis of the two plans

| Idea | Used | Why |
|---|---|---|
| A run that fills test by test with a live count, ending `12 ran · 12 passed` | Both (Plan A's tally, Plan B's ticked run bar) | Shows that the tests actually ran, one at a time |
| A rule with named conditions that tick from the evidence, each echoing its source on the run panel (title, command, count) | Both | Success is a rule checked against evidence, not a bare green mark |
| The decision closes the edit route; the route stays visibly closed | Plan A (disabled edit control) and Plan B (closing edit lane) | "Stop editing" becomes a state the viewer can see |
| A handoff record assembled row by row: `code B`, `pytest -k discount`, `12 selected passed`, `stop: rule met` | Plan B | Hands over the evidence tied to the code that produced it |
| The handoff ends at amber, dashed `review pending`, with no green approval or merge | Plan A | Keeps the claim bounded |
| Observation, decision, stop and handoff each separated by a hold | Plan A | Each step lands before the next begins |
| Plan B's refused `patch 2` coda | Not used | Blocking a further edit belongs to the attempt-limit lesson; the closed loop already shows that editing stopped |
| Plan B's reviewer laptop, travelling chip and `→ review` badge | Not used | The handoff panel itself carries the record; a device icon adds no information |
| Plan A's crossfade of the tally area into rule rows | Replaced | The rule lives in its own controller panel, so the run evidence stays visible while it is checked |

## Stage

- **Run panel**, top: `tests · code B`, `pytest -k discount`, a 12‑segment bar, and a count line.
- **Controller**, middle: `success rule` with three conditions (`current code B`, `same 12 tests`, `12 of 12 passed`), each getting a ✓, and a status line `waiting` → `rule met`.
- **Edit loop**, bottom left: a clockwise `edit` → `test` ring with marching amber dots and the status `open`. On stop it turns grey and dashed, opens a break with end caps, and reads `closed`.
- **Handoff**, bottom right: empty until the rule is met.

Lanes: the run reports to the controller along the right edge, and the controller drops one link each to the edit loop and the handoff.

## Beats

| # | Time (s) | What moves | State change | Sound |
|---|---|---|---|---|
| 1 | 0–9.0 | **Same tests, code B.** 0.6 the run panel lights. 1.2 `test` lights in the loop ring. 1.6–6.1 each of the 12 segments pulses amber, then fills green, and the count steps `1 of 12 ran` … `12 of 12 ran`. 6.5 `12 ran · 12 passed`. The ring's marching dots stop. | The run completes; the loop pauses for a decision. Hold 6.5–9.0. | 0.6 arrive E5 · 1.2 ack C6 (loop) · twelve ack E6 blips panned left to right · 6.5 hit |
| 2 | 9.0–17.0 | **Check the rule.** 9.0 a green dot runs down the right lane. 10.0 the controller lights. 11.0 `current code B` ✓ while the run title flashes. 12.0 `same 12 tests` ✓ while the command row is outlined. 13.0 `12 of 12 passed` ✓ while the count is outlined. 14.2 `rule met`; the controller outline turns green. | Each condition ticks from a visible piece of evidence. Hold 14.2–17.0. | 9.0 send E6 · 10.0 arrive G5 · 11.0/12.0/13.0 ack G5, B5, D6 (rising) · 14.2 chime G5 |
| 3 | 17.0–21.2 | **Stop editing.** 17.0 a dot drops to the edit loop. 17.6 the ring jolts, turns grey and dashed, and opens a break with end caps; `edit` and `test` dim; status `open` → `closed`. | The loop is closed and code B is unchanged. Hold 17.6–21.2. | 17.0 send G6 · 17.6 latch · 17.75 deliver C5 (low, resolved) |
| 4 | 21.2–33.0 | **Hand over the evidence.** 21.2 a green dot drops to the handoff panel. 21.8 it lights. Rows appear: 22.4 `code B`, 23.1 `pytest -k discount`, 23.8 `12 selected passed`, 24.5 `stop: rule met`. 25.6 `review pending` appears in a dashed amber box. 31.4–32.4 fade. | The loop stays closed and the record stays settled. Final hold 25.6–31.4. | 21.2 send G6 · 21.8 arrive A5 · four store A5 · 25.6 arrive C6 (quiet, no fanfare) · silent fade |

Actor pitches: run E, controller G, edit loop C, handoff A.

## Reproduce

From the repository root (Node ≥ 22.12, pinned `puppeteer-core 25.14.0` resolved from root `node_modules`, Chrome, ffmpeg):

```
node video/loop-engineering/motion-v2/03/engine/render.mjs video/loop-engineering/motion-v2/03/scene.js video/loop-engineering/motion-v2/03/video.mp4 --sheet video/loop-engineering/motion-v2/03/scratch/contact-sheet.png --wav video/loop-engineering/motion-v2/03/scratch/sfx.wav
ffmpeg -v error -y -ss 28.0 -i video/loop-engineering/motion-v2/03/video.mp4 -frames:v 1 -q:v 2 video/loop-engineering/motion-v2/03/poster.jpg
```

The local `engine/flow-engine.js` adds four general node types:

- `panel`: rows with character highlights, tags, check or cross icons, and dashed outlines.
- `pill`.
- `segs`: a segmented run bar, each segment with a run pulse and a done fill.
- `ring`: a closed directional route with marching flow, dashes and a breakable gap.

It also adds a status mark and an `r` option for dot packets. These were adapted from my earlier local helpers without changing those folders. The scene defines one sound, `latch`. The shared skill is unchanged.

## Lesson text sync (for the coordinator)

`sequence/lessons.json` item 3 declares `duration: 28` with beats at 0/7/14/21. For this cut the beats would be **0 / 6.5 / 9.0 / 21.2**: rerun, report, rule check, handoff. The stop at 17.0 falls within the rule-check beat. Duration is 33.0. This folder does not edit that file.

