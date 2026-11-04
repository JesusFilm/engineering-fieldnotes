# Video 01 plan

## Mechanism

One thing to feel: a model's tool call is text until executable software runs it. The model writes a proposal, the proposal waits, the runtime takes it, checks it, dispatches it, the tool does real work, and a concrete result (exit status and output size) travels back into the model's context. Setup, tests, failure feedback, and gates stay out of this video.

Beat 1 is the contrast case: the proposal sits at the boundary and nothing happens while a clock ticks. Beats 2–4 are the normal case. The ending holds a transcript in which the grey proposal row and the green evidence rows sit side by side, then fades.

## Stage layout (1080×1920, `meta.speed: 0.85`)

Two columns split by a dim vertical dashed wire at x=540 from y=480 to y=1720. The left column is the model's world; the right column is the execution world. Crossing the divider is the lesson.

| Node | Type | Centre | Size / options | Start state |
|---|---|---|---|---|
| title | title band | y 330 / 405 | `Harness` / `MODEL AND RUNTIME` | — |
| colL | label | (290, 530) | `PROPOSAL`, 30 px, grey | alpha 1 |
| colR | label | (810, 530) | `EXECUTION`, 30 px, grey | alpha 1 |
| model | box | (290, 760) | w 360 h 160, label `MODEL` | resting grey |
| runtime | box | (810, 760) | w 360 h 160, label `RUNTIME`, sublabel blank | resting grey |
| tool | box | (810, 1250) | w 360 h 160, label `SHELL`, sublabel `idle` | alpha 0.3 (not involved) |
| toolbar | bar | (810, 1380) | w 300 h 14, ticks, one segment | seg0 0, track dim |
| context | store | (290, 1250) | w 360, 3 rows, label `CONTEXT` | rows blank |
| clock | clock | (540, 1600) | r 48 | alpha 0 |
| result | badge | (810, 1470) | — | alpha 0 |

Wires: `divider` [540,480]→[540,1720] dashed, alpha 0.35; `w1` model.right→runtime.left; `w2` runtime.bottom→tool.top; `w3` model.bottom→context.top. Return traffic reuses `w2` and `w1` in reverse with `flow` lit while evidence moves.

Pitches: model C5 (sends C6), runtime E5 (sends E6), tool G5 (sends G6). Evidence delivery uses a high `deliver`. Pan every cue with `s.panOf` so the left/right columns are audible.

## Beat sheet (authored at speed 1; playback ≈ 1.18× longer)

| Time (s) | What moves | State change | Sound |
|---|---|---|---|
| 0.0–1.2 | Model pulses white; chip `cat config.yml` pops in at model.right | model glow on | `send` C6, quiet |
| 1.2–2.0 | Chip travels model.right → [520,760] and stops just left of the divider | chip rests; tool stays 0.3 alpha, toolbar empty | — |
| 2.0–5.5 | Clock fades in at (540,1600), hands spin two turns | nothing else changes: this is the contrast case | `clock` at 2.6, 3.4, 4.2, 5.0, gain 0.5 |
| 5.5–7.0 | Clock fades out. Runtime pulses white; chip resumes [520,760] → runtime.left | chip crosses divider; runtime glow on | `arrive` E5 at 6.6 |
| 7.0–9.5 | Green ripple with `check` mark on runtime; sublabel → `args ok · allowed` (green) | runtime subColor OK | `ack` E5 at 7.4 |
| 9.5–11.0 | Hold | — | — |
| 11.0–11.7 | Dot packet runtime.bottom → tool.top; `w2` flow on | tool alpha 0.3 → 1, stroke white + glow; sublabel → `running` (orange) | `send` E6 at 11.0, `arrive` G5 at 11.7 |
| 11.7–15.7 | toolbar seg0 fills 0 → 1 (orange) over 4 s; `s.mark` dots at 0.33 and 0.66 | tool busy; bar fills to its ticks | `work` every 0.2 s, pan right, gain 0.35 |
| 15.7–16.3 | Bar segment turns green; badge `exit 0` pops in at (810,1470) with overshoot | tool sublabel → `done` (green); `w2` flow off | `chime` G5 at 15.8 |
| 16.3–18.3 | Hold | — | — |
| 18.3–19.0 | Chip `exit 0 · 38 lines` (green) tool.top → runtime.bottom; badge fades | runtime sublabel → `captured` (green) | `send` G6 at 18.3, `arrive` E5 at 19.0 |
| 19.0–20.0 | Hold on runtime; small white ripple | — | — |
| 20.0–20.8 | Chip runtime.left → model.right, crossing the divider back; `w1` flow on | model pulses white | `deliver` high at 20.8 |
| 20.8–21.6 | Chip model.bottom → context.top | row0 `cat config.yml` grey, row1 `exit 0` green, row2 `38 lines` green fill 1; green ripple on context | `store` C5 at 21.6 |
| 21.6–24.5 | Hold; tool and runtime ease back to resting grey, tool alpha → 0.3 | only the context store stays bright | — |
| 24.5–26.5 | Hold on final state (the transcript is the takeaway) | — | — |
| 26.5–27.8 | `s.fade` to black | — | — |

`meta.duration` 28 at speed 1 (≈33 s playback). Nothing in this cut loops back to the opening state; the fade is the honest ending.

## Why these choices

The pause in beat 1 is the whole argument of the lesson: a proposal written by the model changes nothing until the runtime picks it up. Keeping the chip white, with no × and only soft clock ticks, says "waiting", never "failed". The divider makes the model/runtime boundary spatial rather than metaphorical, so the viewer sees the same chip cross it twice: once as a request, once as evidence. The tool call is a file read rather than a test run so this cut does not pre-empt lesson 03; evidence is still concrete (exit code plus output size) without a pass/fail reading.

On-screen text is limited to node names, column names, the chip, the runtime sublabels, and three context rows. Every string is under 18 characters at ≥ 28 px.

## Risks

1. Readability: `exit 0 · 38 lines` is the longest chip; render a still at 20.4 s to confirm it clears the divider and the runtime label at phone size. Shorten to `exit 0 · 38 ln` if it collides.
2. Readability: box ports sit on the bottom edge only, so `w1` must use `.left`/`.right` anchors with no chevron pointer. Confirm the wire does not cut through the `MODEL` label.
3. Correctness: `args ok · allowed` shows that a check happened without implying a policy decision. Do not add a denied case; that belongs to lesson 05.
4. Correctness: the clock in beat 1 must not read as a timeout. Keep ticks quiet and spin only two turns; fade it out before the runtime acts.
5. Pacing: four `clock` ticks plus the 2 s hold risk feeling empty to an experienced viewer, but the audience is beginners. If a reviewer finds it slack, cut one tick, not the hold.
6. Lingering state: check the 24.5 s still for the badge, bar fill, and `w2` flow all cleared before the fade; the bar should keep its green fill as a trace of real work, nothing else should stay lit on the right.
7. Sync: lessons.json beats are at 0/7/14/21 s of a 28 s lesson. At speed 0.85 the dispatch lands near 13 s and the evidence near 25 s playback; the coordinator may need to retime the lesson text once the cut is rendered.

