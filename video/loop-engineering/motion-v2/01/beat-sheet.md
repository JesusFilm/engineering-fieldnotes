# Lesson 01 beat sheet: Act, observe, decide

**Mechanism:** the agent only proposes calls. A call runs only when the controller's next-call slot is open, and each dispatch closes that slot. The tool's actual output goes to the controller, which checks its rules and explicitly chooses `continue`. Only that decision reopens the slot for the agent's next call.

**Example:** one illustrative step of a discount repair: `run 12 tests` → `12 ran · 1 failed`, `expected 90, got 100` → controller: evidence in ✓, tests pass ✗ → `continue` → `patch discount.py` → `patch applied`, `tests not rerun`. The counts and values are teaching values, not captured output.

Times are playback seconds in the encoded `video.mp4`. The scene is authored at speed 1 and rendered at `meta.speed 0.9`, so playback = scene ÷ 0.9. Duration is 38.94 s, with a finite ending (fade to black, no loop reset).

## Synthesis of the two plans

| Idea | Used | Why |
|---|---|---|
| A controller-owned next-call slot that admits a call and closes on dispatch | Plan A (slot, admission) | It makes "allowed" a visible state the agent cannot set itself, and it is the core mechanism |
| Proposal text stays put while a small unlabelled token travels | Plan A | Keeps all text stationary and readable at 350 px |
| Old test output clears when the patch executes; the receipt reads `tests not rerun` | Plan A | The observation belongs to the code it tested; the patch receipt shows no success |
| Continuation is decided and the slot reopens before the next proposal arrives | Plan A | Decision precedes action |
| A visible two-way choice (`continue` / `stop`) with the chosen option lit | Plan B (ports, pointer) | Makes the decision point explicit; `stop` stays visible but is not taken |
| Rule rows that tick in turn before the decision | Plan B (rule check blips) | Shows checks against evidence; adapted to two named rules |
| Actor pitches: agent C, tool E, controller G; sends an octave up | Both | Makes the handoffs audible |
| Plan B's zero-tests task, handoff badge and patch budget bar | Not used | Later lessons (no tests, attempt limits); out of scope here |
| Plan A's call budget, second test run, `Stop: passed` and `Ready for review` | Not used | They belong to the lessons on success and budgets. Omitting a passing run means nothing here implies that a scoped pass proves correctness |
| Plan A's separate console and evidence trace | Replaced | Three stacked panels with distinct lanes (calls down the left, evidence up the right edge, decision back to the agent) keep each route separate |

## Stage

The title `Agent loop` sits above a phase row (`ACT` · `OBSERVE` · `DECIDE`); the current step lights with an underline. Below it are three panels:

- **Agent:** task line, then its latest proposal.
- **Controller:** the next-call slot (`open`, `waiting`, or the held call), rule rows `evidence in` and `tests pass`, and choices `continue` and `stop`.
- **Tools:** command, output lines, a status lamp and a progress bar.

Calls travel down a lane through the slot. Evidence travels up a lane on the right edge into the controller's rules. A short link carries the `continue` decision to the slot, and a short lane carries the observation to the agent. The agent has no route to the tool except through the slot.

## Beats

| # | Time (s) | What moves | State change | Sound |
|---|---|---|---|---|
| 1 | 0.0–9.1 | **ACT.** 1.33 proposal appears in the agent. 2.89 token runs down to the slot. 3.89 the slot holds `run tests`. 5.00 the slot flashes: admitted. 5.56 token drops to the tools. 6.44–9.06 the tool runs. | The slot goes `open` → `run tests` → dashed `waiting` the moment the call leaves. The tool lamp turns amber and the bar fills. | 1.33 arrive C5 · 2.89 send C6 · 3.89 arrive G5 · 5.00 ack G5 · 5.56 send G6 · 5.83 latch · 6.44 arrive E5 · 6.83–8.83 seven work ticks E4 |
| 2 | 9.1–15.9 | **OBSERVE.** 9.28 `12 ran · 1 failed` appears with a red ✗. 10.28 `expected 90, got 100`. 12.39 a red token climbs the right lane. 13.83 it lands. | The controller's `evidence in` lights and gets a check. Until then, the slot stays `waiting`. | 9.28 thump (loudest) · 10.28 ack E6 · 12.39 send E6 · 13.83 arrive G5 |
| 3 | 15.9–24.0 | **DECIDE.** 16.44 `tests pass` gets ✗. 18.00 `continue` lights; `stop` stays dim. 18.9 a token carries the decision to the slot. 19.50 the slot reopens. 21.44 the observation goes up to the agent. 22.22 it lands. | The slot goes dashed `waiting` → solid `open` only after the decision. The agent's task line is replaced by `expected 90, got 100` in red. | 16.44 thump G3 (soft) · 18.00 unlatch G5→D6 · 19.50 ack G5 · 21.44 send G6 · 22.22 deliver C5 |
| 4 | 24.0–32.5 | **ACT, then OBSERVE.** 24.00 `patch discount.py` is proposed. 25.56 it runs down. 26.56 the slot holds `patch`. 27.67 admitted. 28.22 dispatched. 29.11 the old test output fades. 29.78–31.33 the tool runs `$ apply patch`. 31.39 `patch applied`. 32.39 `tests not rerun`. | On dispatch the slot closes, the decision and rule ticks clear, and the stale output clears. The receipt stays white, with no success colour. | 24.00 arrive C5 · 25.56 send C6 · 26.56 arrive G5 · 27.67 ack G5 · 28.22 send G6 · 28.50 latch · 29.28 poof · 29.78 arrive E5 · four work ticks · 31.39 store E5 · 32.39 clock |
| end | 32.5–38.94 | Hold for about 4.6 s: the slot is `waiting` and the controller's rules are empty, awaiting fresh evidence. From 37.1 to 38.2 the stage fades to black, then holds black. | Finite ending in a new state | Silent |

## Reproduce

From the repository root (Node ≥ 22.12, pinned `puppeteer-core 25.14.0` resolved from root `node_modules`, Chrome, ffmpeg):

```
node video/loop-engineering/motion-v2/01/engine/render.mjs video/loop-engineering/motion-v2/01/scene.js video/loop-engineering/motion-v2/01/video.mp4 --sheet video/loop-engineering/motion-v2/01/scratch/contact-sheet.png --wav video/loop-engineering/motion-v2/01/scratch/sfx.wav
ffmpeg -v error -y -ss 35.0 -i video/loop-engineering/motion-v2/01/video.mp4 -frames:v 1 -q:v 2 video/loop-engineering/motion-v2/01/poster.jpg
```

The local `engine/flow-engine.js` adds four general node types: `phases`, `panel`, `callslot` and `pill`. It also adds a circled status mark and a `r` option for dot packets. The scene defines two sounds, `latch` and `unlatch`. The shared skill is unchanged.

## Lesson text sync (for the coordinator)

`sequence/lessons.json` item 1 still declares `duration: 28` with beats at 0/7/14/21. For this cut the beats would be **0 / 9.1 / 15.9 / 24.0**, with duration 38.9. This folder does not edit that file.

