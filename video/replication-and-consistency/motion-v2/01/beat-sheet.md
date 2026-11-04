# Video 01 beat sheet: Keep another copy

**Mechanism:** the application writes a change only to the primary, which moves release R42 from `draft · rev 7` to `ready · rev 8`. The replica keeps its old copy until the change travels over the replication link and the replica applies it. Then both copies hold rev 8.

Times are playback seconds for the encoded `video.mp4`. The scene is authored at speed 1 and rendered at `meta.speed 0.85`, so playback = scene ÷ 0.85. Duration is 33.00 s, with a finite ending (fade to black, no loop).

## Chosen ideas

| Idea | From | Why |
|---|---|---|
| Two record cards side by side (`primary`, `replica`) with an agreement mark `=`/`≠` between their revision rows | Plan B | The two copies and the gap between them are the subject; the mark reads without words |
| Application wired only to the primary, with empty space above the replica | Plan B | Shows the single write path |
| The same apply step (amber outline, progress bar, work ticks) on both nodes, ending with the same `store` A5 cue | Plan B (shared cue) + Plan A (apply indicator) | The replica does the same work the primary did; the sound marks it as the same change |
| Status and revision switch together in one frame | Plan A | Never shows an inconsistent intermediate record such as `ready · rev 7` |
| No reverse acknowledgement to the application | Plan A | Acknowledgement semantics are later lessons |
| Hold, then fade to black | Plan B | The story ends in a new state |
| Not used: Plan A's `Received: revision 8` strip | — | Received and applied are separate in lesson 04 ("Received is not applied"); this cut shows a brief `applying` step only |
| Not used: Plan B's `r6 r7 r8` revision strips and `behind`/`in sync` wording | — | The revision row and the mark already carry the comparison; `behind` drifts toward lag (lesson 02) |
| Not used: Plan B's field-by-field replica update | — | It would show `ready` with `rev 7` |

## Teaching beats

| # | Time (s) | What moves | State change | Sound |
|---|---|---|---|---|
| 1 | 0.0–8.2 | **Two saved copies.** 0.24–1.2 the stage fades in. 1.88 the primary card and its rev row light up. 3.06 the replica card, its rev row, and the `copy` tag light up. 4.24 `=` pops in. Hold to 8.2. | Both cards read `R42 draft · rev 7`. | 1.88 ack G5 · 3.06 ack E5 · 4.24 ack G5 + E5 |
| 2 | 8.2–17.6 | **Write lands on the primary only.** 8.24 the application shows `R42 → ready`. 9.06 the chip runs down the only write wire. 10.24 it lands, the primary turns amber and its progress fills. 12.06 the record switches. 13.12 `=` becomes amber `≠`, and the replica's values and tag turn amber (`old copy`). Hold to 17.6. | Primary goes to `ready · rev 8` (green, then white). Replica stays `draft · rev 7`. | 8.24 ack C5 · 9.06 send C6 · 10.24 arrive G5 · 10.65, 11.12, 11.59 work G4 · 12.06 store A5 · 13.12 ack G5 + F#5 (quiet clash) |
| 3 | 17.6–22.1 | **Change travels; replica applies it.** 17.65 the chip `ready · rev 8` leaves the primary along the replication link (wire and label turn white, dots march). 20.24 it arrives. The replica turns amber, the tag reads `applying`, and progress fills. 22.06 the record switches, and the tag reads `copy updated`. | Replica goes `draft · rev 7` → `ready · rev 8` in one frame, and the mark switches to green `=` in the same frame. | 17.65 send A6 · 20.24 arrive E5 · 20.65, 21.12, 21.59 work E4 · 22.06 store A5 (same cue as the primary) |
| 4 | 22.1–33.0 | **Both copies contain the change.** 22.06 `≠` becomes green `=` as the replica's record switches. 23.59, once the apply highlight clears, both rev rows glow green together. 25.00 `2 copies · rev 8` appears. Silent hold to 30.9, fade from 30.9 to 31.9, then black to 33.0. | Final state: both records `ready · rev 8`. | 22.06 store A5 (shared with beat 3) · 23.59 chime G5 + E5 · 25.00 ack C6 |

Actor pitches: application C, primary G, replica E; sends an octave up; the change itself is A (A5 `store` on both nodes, A6 on the replication send). Sounds pan to each node's x position.

## Stage (1080 × 1920)

Application panel centred at (290, 640). Primary and replica panels centred at (290, 1110) and (790, 1110), 420 × 340 px. Mark at (540, 1188); it always matches the two revision rows. Replica tag at (790, 860). Replication link: primary bottom → (290, 1420) → (790, 1420) → replica bottom, labelled at y 1505. Note at y 1660. Smallest text is 44–48 px, about 14–16 px at 350 px width. Values are 66 px.

## Reproduce

From the repository root (it uses the pinned `puppeteer-core` 25.14.0 from the root `node_modules`):

```
node video/replication-and-consistency/motion-v2/01/engine/render.mjs video/replication-and-consistency/motion-v2/01/scene.js video/replication-and-consistency/motion-v2/01/video.mp4 --sheet video/replication-and-consistency/motion-v2/01/scratch/contact-sheet.png --wav video/replication-and-consistency/motion-v2/01/scratch/sfx.wav
```

The cut-local engine copy (`engine/`) adds a general `panel` node type (titled key/value record with row highlight and progress bar), an optional chip font `size` on packets, and `meta.titleSize`. `sfx.js`, `render.mjs` and `preview.html` match the clean copy. The shared skill is unchanged.

## Lesson text sync

`sequence/lessons.json` item 1 declares `duration: 28` with beats at 0/7/14/21. For this cut the coordinator should retime it to duration 33.0 with beats at **0 / 8.2 / 17.6 / 22.1**. This folder does not edit that file.

