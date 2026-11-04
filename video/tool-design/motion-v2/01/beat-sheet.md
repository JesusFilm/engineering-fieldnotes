# Lesson 01 beat sheet: A callable operation

**Mechanism:** a documented operation lets the model request a structured call. The application executes that call against the data store and returns the result, which the model then uses as evidence. The model never runs the search itself.

**Geometry:** a sequence diagram. Lanes for **Model**, **Application** and the **Incidents** store, with time running downward. Messages are arrows that draw themselves, and an activation bar on a lane shows who is working. The tool definition card sits above the lanes and is linked to the Application header by a short wire, because the application offers the definition.

Times are playback seconds for the encoded `video.mp4` (authored at speed 1). Duration 37.00 s, finite ending: a hold, then the stage fades and the title stays.

## Neutral choices from the two plans

| Idea | Source | Decision |
|---|---|---|
| Tool definition with name, purpose and return description, and the purpose matched to the task before selection | A | Used. It shows why this operation fits the need. |
| Fictional record `INC-42`, "Elevated error rate", final wording "Reported payment errors", and a matched underline on result and evidence | A | Used. The evidence points at one returned record without claiming root cause or completeness. |
| Pitch per actor: model E, application C, store/backend G4/G3, definition G5 | A (B is similar) | Used. |
| Call identity `c1` | A | Omitted. The activation bar visibly pairs request and result, and the extra text did not fit the arrow at a legible size. |
| Trace inspector with a numbered rail and card mode switch | A | Replaced by sequence diagram lanes, which show ownership through space as well as labels. |
| Model dims and stays out of the loop while the application executes | B | Used, with a sparse `waiting` / `running` label pair. |
| Store spinner with repeating work ticks | B | Used. |
| Model receipt as the brightest cue (arrive + chime) | B | Used. |
| No link between the model and the store | B | Used. The model's only arrows go to and come from the application. |
| Three filled argument slots (`start`, `end`) and a validation check mark | B | Omitted. Argument validation is lesson 02. One argument (`service`) shows the structure. |
| 28 s target | B | Not used. The lesson needs the holds. |

## Teaching beats

| # | Time (s) | What moves | State change | Sound |
|---|---|---|---|---|
| 1 | 0.0–10.5 | **A need and one documented operation.** 0.6/0.9/1.2 the lanes appear. 2.2 the model's bar starts and the note `payments incidents?` appears. 3.8 the definition card appears, with its wire to Application lit. 4.5 and 5.2 the purpose and return lines appear. 7.0 `Find incident records` gets an amber outline and the task note turns amber. 7.7 the operation name turns amber (selected). Hold to 10.5. | Nothing is running yet. The definition guides selection. | ack E5 / C5 / G4 · 2.2 arrive E5 · 3.8 arrive G5 · 4.5 and 5.2 store G5 · 7.0 ack E6 · 7.7 ack G5 |
| 2 | 10.5–15.5 | **A structured request.** 10.5 an amber arrow draws from the model's bar to the Application lane, labelled `search_incidents` / `service: payments`. 11.5 it lands, Application glows, and its bar starts. 13.6 the model lane and note dim, and `waiting` appears. | The model has requested the operation. The application holds the call. | 10.5 send E6 · 11.5 arrive C5 · 13.6 stepback (soft falling E5) |
| 3 | 15.5–23.0 | **The application executes.** 15.5 the Application bar turns amber, grows, and shows `running`. 16.6 a `read` arrow goes to Incidents. 17.2 the store spins and its bar grows. 19.8 a dashed green `INC-42` arrow returns to Application. The Application bar keeps growing to 23.0. | Only the application and the store are active. The model stays dim and `waiting`. | 15.5 work C4 · 16.6 send C6 · 17.2 arrive G4 · 17.7–19.5 work G3 ×7 · 19.8 send G5 · 20.4 store C5 |
| 4 | 23.0–37.0 | **The result returns through the application and becomes evidence.** 23.0 a dashed green arrow `result: INC-42` / `Elevated error rate` draws back to the model. 24.0 the model lights green, and its second bar and the `waiting` label clear. 25.6 the `Model answer` card shows `Reported payment errors`. 26.5 `evidence: INC-42`. 27.6 an underline on the result and an outline on the evidence line appear together. Hold 27.9–35.0, fade 35.0–36.2, black stage with title to 37.0. | The model's answer cites the returned record. | 23.0 send C6 · 24.0 arrive E5 + 24.08 chime E6 (loudest) · 25.6 store E5 · 26.5 store E6 · 27.6 ack E6 |

30 cues in total. Every visible change has a cue, and the stillness after 27.6 is the deliberate final hold.

## Reproduce

From the repository root, using the pinned `puppeteer-core` 25.14.0 from the root `node_modules` and local Chrome:

```
node video/tool-design/motion-v2/01/engine/render.mjs video/tool-design/motion-v2/01/scene.js video/tool-design/motion-v2/01/video.mp4 --sheet video/tool-design/motion-v2/01/scratch/contact-sheet.png
```

The local engine copy adds three general node types to `engine/flow-engine.js`: `lane` (header box or cylinder, dashed lifeline, growing activation bars, spinner), `msg` (self-drawing horizontal arrow with text above and below and an underline highlight), and `card` (titled panel with text rows and row outlines). The shared skill and other cuts are unchanged.

## Lesson text sync (coordinator)

`sequence/lessons.json` item 1 declares duration 28 with beats at 0/7/14/21. For this cut, use duration 37.0 with beats at **0 / 10.5 / 15.5 / 23.0**. This folder does not edit that file.
