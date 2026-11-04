# Lesson 01 beat sheet: What the model can see

**Mechanism:** the model receives only the input assembled for one call. A repository file enters that input when the application reads it and copies its content in. Each call starts from a fresh input, so check what each call actually included.

**Example:** the contract file `invoice-v1.md` contains `keep total_cents`. The task is `fix invoice timeout`. Paths and content are illustrative, not a real request trace.

Times are playback seconds in `video.mp4`. The scene is authored at speed 1 and rendered with `meta.speed 0.9`, so playback time = scene time ÷ 0.9. Duration is 44.89 s with a finite ending (fade to black, no loop).

## Neutral choices from plans A and B

| Idea | Source | Why |
| --- | --- | --- |
| Show the contract's actual text (`keep total_cents`) in the repository and copy that text into the input, with matching amber edge marks | Plan A | Teaches that content is supplied, not a path; source and copy are visibly identical |
| Copy path runs in the left gutter and text appears only at its destination; the source row stays | Plan A | Shows a copy with no text sliding over text |
| The input keeps one identity per call (`input · call N`, `draft` → `sent`); `received` cannot appear before the send | Plan A | Makes "this invocation" concrete |
| A first call goes out without the contract while the file sits on disk | Plan B | The contrast case: the file exists, the model never got it |
| A new call starts fresh: input rows reassemble, the contract slot is empty again, and the model's received items clear | Plan B | Shows context is per call and the model keeps no memory of call 1 |
| Application at the top with a log of sent calls; the final check reads the log | Combined | Turns "check what was actually included" into a concrete action with a red and a green result. The log belongs to the application so the model never appears to remember earlier calls |
| Actor pitches application C5, repository E5, input G5, model C6 | Plan B | Each actor is audible |
| Not used: Plan A's single invocation ending | — | Without a missing case, the final check has nothing to find |
| Not used: Plan B's `sees N items` counter and `on disk only` badge | — | Showing the received items by name says more than a count |
| Not used: Plan B's re-check that repairs call 2 before sending | — | Repeating the selection beat would lengthen the lesson without new teaching; the log check covers inspection |

## Layout (1080×1920)

Four stacked panels at full width (x 60–1020): application with log (y 460–716), repository (756–1060), input (1100–1430), and model (1510–1770). A short dotted wire connects input to model. The copy trace runs from the repository excerpt down the left gutter (x 34) into the input's third row. Content text is 42–44 px monospace, which is about 14 px at 350 px wide.

## Beats

| # | Playback time | What moves | State change | Sound |
| --- | --- | --- | --- | --- |
| 1 | 0.0–12.7 **File exists; call 1 goes without it** | 0.3 application appears with an empty log. 1.1–1.8 repository rows appear with `keep total_cents`. 2.9 input appears; 3.4 and 3.9 `instructions` and the task fill; the third slot reads `no contract`. 4.8 model appears with empty slots. 6.2 `sends call 1`, scan line, dot to model. 7.8 model `received`; chips `instructions` and `task` pop in. 9.1 log row `call 1 · sent`. 10.3 the repository excerpt lights; 10.8 the model's empty slot reads `no contract`. Hold to 12.7. | Contract on disk; call 1 input has two items; model received two items. | 0.33 ack C5 · 1.44 store E5 · 3.44 and 3.89 store G5 · 4.78 ack C6 · 6.22 send C6 · 6.56 send G6 · 7.83 arrive C6 · 8.11 and 8.44 ack C6 · 9.06 store C5 · 10.28 ack E5 · 10.83 ack C4 |
| 2 | 12.7–22.9 **Call 2 starts fresh; application reads and copies** | 12.7 `starts call 2`; header becomes `input · call 2`, status `draft`; rows empty. 13.0 model chips clear and status returns to `idle`. 13.7 and 14.1 the rows reassemble without the contract. 15.3 `reads invoice-v1.md`; amber dot from the application to the file; 16.1 the file and excerpt turn amber. 17.7 `copies excerpt`; amber trace runs down the gutter. 18.7 `keep total_cents` appears in the input's third row. 19.7 trace clears; 20.2 the source and copy flash together. Hold to 22.9. | Input call 2 is a draft with three items; the source row is unchanged. | 12.67 and 12.94 clock · 13.00 poof · 13.67 and 14.06 store G5 · 15.33 send C6 · 16.11 arrive E5 · 17.67 send E6 · 18.67 store G5 (loud) · 20.22 ack E5 · 20.39 ack G5 |
| 3 | 22.9–31.6 **Model receives call 2** | 22.9 `sends call 2`, scan line, dot. 24.5 model `received`; 24.8 and 25.1 `instructions` and `task`; 25.6 amber `keep total_cents` chip. 26.3 log row `call 2 · sent`. 27.6 contract chip highlighted. Hold to 31.6. | The model's received items now include the contract text. | 22.89 send C6 · 23.22 send G6 · 24.50 arrive C6 · 24.78 and 25.11 ack C6 · 25.56 hit · 26.28 store C5 · 27.61 ack C6 |
| 4 | 31.6–44.9 **Check what each call included** | 31.6 `checks log`; the lower panels dim. 32.4 call 1 row highlighted; 32.9 `contract missing` with a red ×. 35.1 call 2 row highlighted; 35.6 `contract included` with a green check. Silent hold 36–42.9; fade 42.9–44.2; black to 44.9. | Audited log: call 1 missing, call 2 included. | 31.56 send C6 · 32.89 miss (the only low falling sound) · 35.56 chime |

The video has 35 cues. Sends are quieter than arrivals, and the miss and chime mark the check results.

## Reproduce

From the repository root, using the pinned `puppeteer-core` 25.14.0 in the root `node_modules`:

```
node video/context-engineering/motion-v2/01/engine/render.mjs video/context-engineering/motion-v2/01/scene.js video/context-engineering/motion-v2/01/video.mp4 --sheet video/context-engineering/motion-v2/01/scratch/contact-sheet.png
ffmpeg -v error -y -ss 39.4 -i video/context-engineering/motion-v2/01/video.mp4 -frames:v 1 -q:v 3 video/context-engineering/motion-v2/01/poster.jpg
```

The local engine copy adds two general node types to `engine/flow-engine.js`: `sheet`, a panel with a header, a status, and positioned rows or chips with placeholders, highlights, edge marks, right-side text, and ×/✓ icons; and `trace`, a polyline drawn progressively. The shared skill and other cuts are unchanged.

## Lesson text sync

`sequence/lessons.json` item 1 declares duration 28 with beats at 0, 7, 14, and 21. For this cut, the coordinator should retime it to a duration of 44.9 with beats at **0, 12.7, 22.9, and 31.6**. The beat texts map one to one. Beat 1's on-screen story also sends call 1, which the existing text "That does not mean the model has read it" supports. This folder does not edit that file.
