# Lesson 04 beat sheet: Make a useful handoff

**Mechanism:** session 1's history is long. A vague handoff (`optimize invoice`) leaves the decisive constraint behind. A useful handoff records four fields (goal, keep, ref, open), each copied from the session line that justifies it. Session 2 receives the shorter record and explicitly opens the reference when it needs the detail. The lines left out are incidental ones; the constraint is not among them.

**Example (illustrative):** the same fictional `api/v1.md · a17` contract used in lessons 02 and 03. Transcript lines are short teaching labels, not a real session log.

Times are playback seconds in `video.mp4`. The scene is authored and played at speed 1. Duration is 47.6 s with a finite ending (fade to black).

## Neutral choices from plans A and B

| Idea | Source | Why |
| --- | --- | --- |
| Session 1's lines in a left column beside the handoff card, with each field copied from the line that justifies it | Plan B | Shows the handoff as a selection from history, not an opaque summary |
| Vague draft: `optimize invoice` with empty dashed `keep —`, `ref —`, `open —` slots; the empty keep slot turns amber while `keep total_cents` lights in session 1 | Plan A | The loss is visible without claiming a resumed agent failed |
| Four fields: goal, keep, ref, open | Plan A | Plan B's `check` and `done` fields would bring in verification (lesson 05) |
| Session 2 explicitly `opens api/v1.md`; the repository goes from `not opened` to showing the excerpt | Both | A stored path doesn't load content until opened |
| `open timeout?` stays amber and is pulsed after retrieval | Plan A | Retrieval doesn't resolve the open work |
| Coda: incidental lines dim and get dashed outlines (`3 left out`), then `keep total_cents` lights in session 1, the handoff, and the repository | Plan B | "Shorten incidental history first; don't drop decisive constraints" |
| Not used: Plan B's size bars, the failed question from session 2, and the success chime | — | Unitless gauges and an invented failure overclaim; no success verdict |
| Not used: Plan A's single editor with a changing tray | — | Keeping all four actors on screen shows where each fact lives |

**Geometry (different from lessons 01–03):** two columns, with `session 1` (7 lines) on the left and `handoff` (4 fields) above `session 2` on the right, and a full-width `repository` below. Copy paths run through the 20 px column gap, and the open path runs down the right gutter. Text is 40–44 px (13–14 px at 350 px wide).

## Beats

| # | Time | What moves | State change | Sound |
| --- | --- | --- | --- | --- |
| 1 | 0.0–10.6 **A vague handoff loses the constraint** | 0.4 `session 1` (`7 lines`); rows pop 0.8–2.3, with `keep total_cents` in amber. 3.0 `handoff` (`draft`) with dashed slots; 3.6 `optimize invoice`. 4.4 `session 2` (`waiting`) and `repository` with `api/v1.md · a17` and `not opened`. 6.0 session 1's keep line lights; 6.8 the empty `keep —` slot turns amber and jolts slightly. Hold. | The constraint exists in session 1, and the draft has no keep. | 0.8–2.3 store E5 ×7 (quiet) · 3.0 ack G5 · 3.6 store G5 · 4.4 ack C5 · 4.6 ack A5 · 6.0 ack E5 · 6.8 ack D4 (low) |
| 2 | 10.6–22.6 **Record the fields** | The vague line fades. For each field, the source line lights, a short amber path crosses the gap, and the field appears: 10.8/11.6 `goal fix latency`; 13.0/13.8 `keep total_cents` (amber mark); 15.4/16.2 `ref api/v1.md`; 17.8/18.6 `open timeout?` (amber). 19.6 status `4 fields`. Hold. | The handoff has 4 fields, each traceable to a line. | each field: ack E5 at the source line, store G5 on arrival (keep louder) · 19.6 ack G5 |
| 3 | 22.6–35.0 **Session 2 receives it and opens the reference** | 22.6 scan line across the handoff; `sent`. 23.6 session 2 `received` (teal); 24.0 `has 4 fields`. 26.4 `opens api/v1.md` (amber); the path draws to the repository; 27.5 the repository reads `opened`; 28.0 `v1 response:`, 28.6 `keep total_cents`. 29.8 the repository's and the handoff's keep lines light together. 32.0 `open timeout?` lights (still open). Hold. | Detail is retrieved on demand; open work remains open. | 22.6 send G6 · 23.6 arrive C5 · 24.0 ack C5 · 26.4 send C6 · 27.5 arrive A5 · 28.0/28.6 store A5 · 29.8 ack A5 + 30.0 ack G5 · 32.0 ack D4 |
| 4 | 35.0–47.6 **What was left out, and what wasn't** | 35.0/35.4/35.8 `search invoice`, `read README.md`, `query abandoned` dim with dashed outlines; 36.2 status `3 left out`. 37.8/38.05/38.3 `keep total_cents` lights in session 1, the handoff, and the repository. Hold to 45.8; fade 45.8–47.0. | Incidental lines were left out; the constraint was carried and remains retrievable. | 35.0/35.4/35.8 poof (quiet) · 36.2 ack E5 · 37.8 ack E5 · 38.05 ack G5 · 38.3 arrive A5 |

The video has 39 cues. Pitches: session 1 E5, handoff G5, session 2 C5, repository A5. The low D4 marks the missing keep and the still-open question. There is no failure sound and no success chime.

## Reproduce

From the repository root, using the pinned `puppeteer-core` 25.14.0 in the root `node_modules`:

```
node video/context-engineering/motion-v2/04/engine/render.mjs video/context-engineering/motion-v2/04/scene.js video/context-engineering/motion-v2/04/video.mp4 --sheet video/context-engineering/motion-v2/04/scratch/contact-sheet.png
ffmpeg -v error -y -ss 41.0 -i video/context-engineering/motion-v2/04/video.mp4 -frames:v 1 -q:v 3 video/context-engineering/motion-v2/04/poster.jpg
```

`engine/flow-engine.js` is lesson 03's engine copied unchanged: the clean engine plus the general `sheet`, `trace`, and `accordion` nodes. Other lessons were not modified.

## Lesson text sync

`sequence/lessons.json` item 4 declares duration 28 with beats at 0, 7, 14, and 21. For this cut, the coordinator should retime it to a duration of 47.6 with beats at **0, 10.6, 22.6, and 35.0**. The beat texts map one to one in order. This folder does not edit that file.
