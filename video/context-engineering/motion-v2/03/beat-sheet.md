# Lesson 03 beat sheet: Preserve a constraint

**Mechanism:** clients read `total_cents` from the v1 response. The agent's input states what must remain (`keep total_cents`) with a reference to the v1 contract. The proposed edit changes how rows load, and the response field stays in the diff as an unchanged line. The proposal is still unverified: the compatibility check is pending.

**Example (illustrative):** task `fix invoice latency`; reference `api/v1.md · a17`, the same fictional contract and revision as lesson 02. The diff lines are pseudocode, not a proposed change to any repository, and no speedup is claimed.

Times are playback seconds in `video.mp4`. The scene is authored and played at speed 1, so these are also scene times. Duration is 44.2 s with a finite ending (fade to black).

## Neutral choices from plans A and B

| Idea | Source | Why |
| --- | --- | --- |
| Two clients read `total_cents` from the v1 response | Plan B | Makes "clients expect the field" concrete before any edit |
| A brief rename to `"amount"`, labelled `if renamed`, that breaks both reads, then reverts | Plan B | Shows what the constraint protects; the label and the revert keep it hypothetical |
| The input pairs `keep total_cents` with `ref api/v1.md · a17`, and a link runs from the ref to the v1 response | Both | The requirement and its authoritative source stay together |
| The diff shows changed loading lines (−/+) and the field as an unchanged context line | Plan A | Separates the internal change from the public interface in one software surface |
| The same field name lights in three places in sequence: diff, response, keep line | Combined | One focal point at a time links the edit back to the rule |
| Ending: `compatibility check: pending` and `unverified`, with no pass badge | Plan A | Running the check belongs to lesson 05; this lesson ends at "a check must still verify" |
| Not used: Plan B's fixture run, `fixture passed` badge, and `edit · verified` | — | Later lesson content |
| Not used: Plan A's moving layout | — | Fixed panels avoid motion while text is being read |
| Teal and red appear only on the +/− diff lines (and the hypothetical break); the unchanged line is white | Plan A | Colour never stands for a verdict |

**Geometry (different from lessons 01 and 02):** two client boxes at the top read down into a response shape. Below that sit the agent's input card and the agent's proposal, shown as a diff of `src/invoice.py` with an unchanged context line and a dashed pending row. A reference link runs up the left gutter from `ref` to `response · v1`. Text is 40–44 px (about 13–14 px at 350 px wide).

## Beats

| # | Time | What moves | State change | Sound |
| --- | --- | --- | --- | --- |
| 1 | 0.0–12.4 **Clients depend on the field** | 0.4 clients appear. 1.2–2.0 response `"invoice": 42`, `"total_cents": 1250`. 2.8 field row lights. 3.6/3.9 each client sends a read; `1250` returns; white ✓ at each client (4.75/5.05). 7.0 the row becomes red `"amount": 1250` with `if renamed`. 7.9/8.2 reads again: both clients turn red, shake, and show ×. 10.4 the row reverts and the clients go neutral. Hold. | The field is what clients read; renaming it breaks them (hypothetically). | 0.4 ack C6 · 0.6 ack E6 · 1.6/2.0 store G5 · 2.8 ack G5 · 3.6 send C6 · 3.9 send E6 · 4.75 ack C6 · 5.05 ack E6 · 7.0 miss · 7.9/8.2 send · 8.5/8.8 thump (loudest) · 10.4 poof (quiet) |
| 2 | 12.4–23.2 **Include the requirement and its reference** | 12.4 `agent input` appears; 12.9 `goal fix invoice latency`; 14.0 `keep total_cents` with amber mark; 15.1 `ref api/v1.md · a17`. 16.2 amber link draws from ref up to `response · v1`; 17.1 the header, the field row, and the keep line light amber. Link rests dim from 18.8. 20.2 dot to `agent proposal` (`drafting`), 21.4 `src/invoice.py`. Hold. | The constraint and its source are in the input before the edit is proposed. | 12.4 ack A5 · 12.9/14.0/15.1 store A5 (keep line louder) · 16.2 send A6 · 17.1 ack G5 · 20.2 send A6 · 20.65 arrive C5 · 21.4 ack C5 |
| 3 | 23.2–34.4 **Edit the loading; keep the field** | 23.2 `- rows = load_one_by_one()` (red). 25.0 `+ rows = load_batch()` (teal). 27.2 unchanged context line `"total_cents": total` with `unchanged`. 28.4/28.7/29.0 the name lights amber in the diff, the response, and the keep line in turn. 31.6 status `proposed`. Hold. | The diff touches only loading; the field name is the same in all three places. | 23.2 work E4 ×2 · 25.0 store E5 · 27.2 ack G5 · 28.4 ack E5 · 28.7 ack G5 · 29.0 ack A5 · 31.6 arrive C5 |
| 4 | 34.4–44.2 **A check must still verify it** | 34.4 dashed amber row `compatibility check: pending`; the panel pulses. 35.4 status `unverified`. Silent hold 35.6–42.4; fade 42.4–43.6. | The proposal guided by the constraint is not yet verified. | 34.4 arrive A4 · 35.4 ack C5 |

The video has 34 cues. Pitches: mobile C6, web E6, response G5, input A5, agent C5, diff E4/E5, verification A4.

## Reproduce

From the repository root, using the pinned `puppeteer-core` 25.14.0 in the root `node_modules`:

```
node video/context-engineering/motion-v2/03/engine/render.mjs video/context-engineering/motion-v2/03/scene.js video/context-engineering/motion-v2/03/video.mp4 --sheet video/context-engineering/motion-v2/03/scratch/contact-sheet.png
ffmpeg -v error -y -ss 38.0 -i video/context-engineering/motion-v2/03/video.mp4 -frames:v 1 -q:v 3 video/context-engineering/motion-v2/03/poster.jpg
```

`engine/flow-engine.js` is lesson 02's engine copied unchanged: the clean engine plus the general `sheet`, `trace`, and `accordion` nodes (`accordion` is unused here). Lessons 01 and 02 were not modified.

## Lesson text sync

`sequence/lessons.json` item 3 declares duration 28 with beats at 0, 7, 14, and 21. For this cut, the coordinator should retime it to a duration of 44.2 with beats at **0, 12.4, 23.2, and 34.4**. The beat texts map one to one in order. This folder does not edit that file.
