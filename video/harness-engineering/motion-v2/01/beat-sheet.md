# Video 01 beat sheet: The model and its runtime

**Mechanism:** a model's tool call is text until runtime software checks and dispatches it. The tool does the work, and the runtime returns the captured result to the model.

**Example:** `call #1 read_file notes.txt`. The file holds `count=7` from the first frame, so the returned value has a visible source.

Times are playback seconds for the encoded `video.mp4` (scene authored at speed 1, rendered at `meta.speed 0.85`; playback = scene ÷ 0.85). Duration 38.13 s, finite ending (fade to black, no loop).

## Chosen ideas

| Idea | From | Why |
|---|---|---|
| Asymmetric stage: model panel above an open runtime workspace, with the tool and file below | Plan A | Shows the runtime's own internal state (request, checks, result) instead of three similar boxes |
| One literal operation, `#1 read_file notes.txt → count=7`, with the file contents visible from the start | Plan A | Traceable data, so the result cannot read as a model invention; avoids tests and gates (later lessons) |
| Two separate field checks that tick while the tool stays `idle` | Plan A | Checking is not running; only dispatch wakes the tool |
| A deliberate wait after the proposal, with the tool still idle | Plan B | The contrast case: writing a call changes nothing by itself |
| Model panel ends as a transcript: the proposal row and the returned evidence row together | Plan B | The ending state is the takeaway |
| Hold, then fade to black (finite ending) | Plan B | The story ends in a new state; a reset would mislead |
| Actor pitches: model C, runtime E, tool G (sends an octave up), panned by x | Both | Makes the hand-offs audible |
| Not used: Plan B's two-column divider and clock face | — | The vertical down-and-up wiring already makes the boundary spatial; a clock could read as a timeout |
| Not used: Plan A's 48 s length | — | Plan A's pacing is kept, but its holds are tightened to about 2 s |

Layout rule that carries the lesson without words: **the model has no wire to the tool.** Requests travel down the left side and evidence travels back up the right.

## Teaching beats

| # | Time (s) | What moves | State change | Sound |
|---|---|---|---|---|
| 1 | 0.0–10.0 | **Proposal, then nothing runs.** 1.76 the model panel lights, and the call types out over about 2 s. 3.88 the tag `proposed` appears. 6.12 and 8.00 the tool's lamp gives a grey blink. | The model has a call. Runtime rows stay empty, and the tool shows `idle` with a grey lamp and an empty bar. | 1.76 send C6 · 3.88 arrive C5 · 6.12 and 8.00 clock tick (tool pan) |
| 2 | 10.0–17.1 | **Runtime receives and checks.** 10.00 the chip `#1 read_file` runs down the left wire. 11.65 it lands, and the request card fills. 13.29 and 14.94 each field lights and gets a green check. | Request card goes from empty slots to `Request #1`, `tool read_file`, `path notes.txt`, then two checks. The tool is still `idle`. | 10.00 send C6 · 11.65 arrive E5 · 13.29 and 14.94 ack E6 |
| 3 | 17.1–24.7 | **Dispatch: the tool works.** 17.06 the request card turns orange, and the `#1` chip drops to the tool. 18.47 the tool wakes. 19.18 a dot travels to the file. 20.12 the file row lights. 20.94 `count=7` returns. 22.06 the tool completes. | Tool goes `idle` → `running` (orange lamp, bar filling) → `done` (green lamp, green bar, output `count=7`). The file itself is unchanged. | 17.06 send E6 · 18.47 arrive G5 · 20.12 work G4 · 22.06 chime G5 |
| 4 | 24.7–29.4 | **Runtime captures the evidence.** 24.71 the chip `#1 count=7` rides the return wire into the runtime. 26.82 it lands. | Result card goes from an empty slot to green `Result #1` and `count=7`, with a green ripple. The model still shows no result. | 24.71 send G6 · 26.82 store E5 |
| 5 | 29.4–38.1 | **Model receives the result.** 29.41 the chip rises up the right wire. 31.06 the model's second row fills, then a silent hold to 36.0, a fade from 36.0 to 37.2, and black to the end. | Model panel turns green with `result #1 count=7` tagged `from runtime`, under the original `proposed` call. | 29.41 send E6 · 31.06 deliver C5 (loudest cue) · silent hold |

Subevents inside beats 3 and 5 are listed with their own times above.

## Reproduce

From the repository root:

```
node video/harness-engineering/motion-v2/01/engine/render.mjs video/harness-engineering/motion-v2/01/scene.js video/harness-engineering/motion-v2/01/video.mp4 --sheet video/harness-engineering/motion-v2/01/scratch/contact-sheet.png
```

The local engine copy adds two general node types to `flow-engine.js`: `card` (titled panel with text rows, reveal, slots, check marks, lamp, and bar) and `doc` (page with a folded corner). The shared skill is unchanged.

## Lesson text sync

`sequence/lessons.json` item 1 still declares `duration: 28` and beats at 0/7/14/21. For this cut, the coordinator should retime it to duration 38.1 with beats at **0 / 10.0 / 17.1 / 29.4**. The third beat's text, "tool runs… runtime captures", spans beats 3 and 4 here, from 17.1 to 29.4. This folder does not edit that file.
