# Lesson 01 beat sheet: One request

**Mechanism:** the app asks the server for user 42's profile. The server does two visible work steps while the app waits, and only after the work finishes does a response travel back and fill the app's empty fields.

Times are playback seconds in `video.mp4` (authored at `meta.speed 1`, so scene time equals playback time). Duration 34.10 s. Finite ending: a silent hold, then the stage fades to black and the title band stays.

## Chosen ideas

| Idea | Source | Why |
|---|---|---|
| App screen above, server panel below, request lane down on the left, response lane up on the right | Both plans | Direction reads without words. The two lanes are two directions of one exchange. |
| A `Load profile` button that becomes the `waiting` status | Plan A | Gives the request a concrete trigger and makes the wait a visible state. |
| Profile fields `name` and `plan` start as empty dashed slots and fill only after the response lands | Plan B (values `Maya` from A, `pro` from B) | Makes "the result" concrete and impossible to see early. |
| Message text stays fixed beside its lane (`GET /users/42`, `200 OK / Maya · pro`). Only a small marker travels. | Plan A (readout), placed beside the lane | Moving chip text is hard to read at 350 px. Putting the readout beside the lane keeps it close to its direction. |
| Hollow amber request marker and filled teal response marker | Plan A | Shape and colour both tell the two messages apart. |
| Two server work rows: status square (queued, active, done) plus a progress line that fills while work ticks play | A's milestone squares + B's fill | Processing shows up as visible change instead of a pause. |
| Step names appear only when the request arrives | New, neutral | The request determines the work, and an idle server shows no step names. |
| Server sounds pitched on G (G3 work, G4 arrive or ready, G5 send or step done). App sounds pitched on C (C5 deliver or store, C6 press or send). | Combined; A used C/E, B used C5/G5 | You can hear which side is acting. The app stays silent while it waits. |
| Not used: B's recap pulse trace, A's dimmed paths at the end, timing numbers, percent labels | — | Each one adds motion or a claim the lesson does not need. |

## Beats

| # | Time (s) | What moves | State change | Sound |
|---|---|---|---|---|
| 1 Meet | 0.0–5.0 | Stage fades in by 0.7. App panel pulses at 1.0, server panel at 2.1. | App: `Load profile`, user 42, two empty fields. Server: `idle`, two empty step slots. | 1.0 ack C6 (app) · 2.1 ack G5 (server) |
| 2 Send | 5.0–10.4 | 5.0 button press. 5.25 the button becomes `waiting` and `GET /users/42` appears beside the request lane (2 s reading hold). 7.2–8.8 the hollow ring travels down the lit lane. 8.8 ripple at the server edge and the server glows. | App `waiting`. Server `working`, with `find user 42` and `build profile` queued. 8.8–10.4 hold. | 5.0 store C5 (press) · 7.2 send C6 · 8.8 arrive G4 |
| 3 Process | 10.4–21.8 | 10.4–14.0 step 1 square amber, line fills. 14.0 checks teal. 14.8–18.4 step 2 the same. Waiting pill softly pulses at 12.2 and 16.6. 19.2 `ready`; `200 OK / Maya · pro` appears beside the response lane. | App stays `waiting` with empty fields throughout. Ready hold 19.2–21.8 with nothing sent. | work G3 every 0.45 s while a line fills (16 ticks) · 14.0 and 18.4 ack G5 · 19.2 store G4 |
| 4 Return | 21.8–25.2 | 21.8–23.4 filled teal dot travels up the lit response lane. 22.1 server returns to `idle` (check marks kept). 23.4 teal ripple at the app edge and the app glows. | App still `waiting` mid-transit (22.6), then `received` at 23.4. 23.4–25.2 hold, fields still empty. | 21.8 send G5 · 23.4 deliver C5 (app's brightest cue) |
| 5 Use | 25.2–34.1 | 25.2 `Maya` fills, 25.9 `pro` fills (each glows). 26.7 status `loaded`, app outline teal. | Final state: populated profile, both steps done, server idle. Silent hold 26.7–32.7, fade 32.7–33.5, black to 34.1. | 25.2 and 25.9 store C5 · 26.7 chime C5 (quiet) |

Lesson-text sync for the coordinator (this folder does not edit `lessons.json`): duration 34.1, beats at 0 / 5.0 / 10.4 / 21.8 / 23.4.

## Reproduce

From the repository root (pinned `puppeteer-core` 25.14.0 from the root `node_modules`, local Chrome, ffmpeg):

```
node video/load-balancing/motion-v2/01/engine/render.mjs video/load-balancing/motion-v2/01/scene.js video/load-balancing/motion-v2/01/video.mp4 --sheet video/load-balancing/motion-v2/01/scratch/contact-sheet.png
```

Changes to the local engine (`engine/flow-engine.js`, shared skill untouched): general node types `panel`, `text` (aligned), `pill`, `step` (status square, text, progress line, check), `field` (key, dashed empty slot, value reveal), `arrow` (dotted shaft, solid head, marching flow); packet kind `ring` and a `size` option for `dot`; `meta.subtitleSize`. `sfx.js`, `render.mjs`, and `preview.html` are unchanged.

## Accuracy limits

One successful, non-streaming request. `GET /users/42`, `200 OK · Maya · pro` and the two step names are illustrative. `200 OK / Maya · pro` abbreviates status and payload rather than showing literal HTTP. Network transit also takes time, and the short transit here is pacing rather than a claim. `waiting` describes this pending request; it does not mean the app is frozen. No timings, percentages, balancer, second server, errors or retries appear.
