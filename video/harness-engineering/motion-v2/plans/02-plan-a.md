# Video 02 plan

## Mechanism and teaching scope

One idea to feel: before any edit, the workspace goes from unknown to known, and "known" means three recorded facts: which revision, which instructions, and what the checks already say. The video is a single workspace panel that fills in. There are no callers, no packets between services, and no wires. State appears inside the panel, and the baseline failure is set aside as its own record rather than hidden or fixed.

Contrast case first: the panel opens with a dashed outline and `rev ?`, nothing inside, and a soft clock. Normal case: revision pins, files land, the baseline runs, one failure is retained separately, and the baseline is stamped with its revision. The ending holds the stamped panel and fades.

Accuracy limits the cut must respect: a pinned revision and recorded baseline reduce ambiguity; they do not make the environment correct or the task deterministic. The failing check is retained, labelled `known`, never turned green and never deleted. No agent, repair, or gate appears; those are lessons 03–05. The baseline numbers (`11 pass · 1 fail`) are illustrative fixture values, not a claim about any real repository.

## Stage layout (1080×1920, `meta.speed: 0.9`)

| Node | Type | Centre | Options | Start state |
|---|---|---|---|---|
| title | title band | y 330 / 405 | `Harness` / `KNOWN WORKSPACE` | — |
| panel | box | (540, 1080) | w 760 h 1160, no label, `dashed` 1 | stroke dim grey `#3A3E45` |
| revLabel | label | (330, 560) | `rev`, 30 px, grey | alpha 1 |
| rev | label | (610, 560) | `?`, 44 px, mono, grey | text `?` |
| files | store | (540, 820) | w 600, 3 rows, label `INSTRUCTIONS` | all rows alpha 0 |
| checkLabel | label | (540, 1110) | `BASELINE`, 30 px, grey | alpha 0.3 |
| checks | bar | (540, 1180) | w 600 h 18, segments 2, ticks | seg0 0, seg1 0, track dim |
| count | badge | (540, 1260) | — | alpha 0 |
| known | store | (540, 1460) | w 600, 1 row, label `KNOWN FAILURES` | alpha 0.3, row blank |
| stamp | badge | (540, 1610) | — | alpha 0 |
| clock | clock | (540, 1720) | r 44 | alpha 0 |

Everything sits inside the panel so the eye never leaves the workspace. The panel's stroke carries the main state: dashed dim at the start (unknown), solid grey once the revision pins, solid white glow while the baseline runs, and green at the stamp.

Pitches: the panel is C5, files are E5, checks are G5, the retained failure is a low thump. Pan is centre throughout; the lesson is vertical, so pitch and timing carry the pattern.

## Storyboard (authored at speed 1; playback ≈ 1.11× longer)

| Time (s) | What moves | State change | Sound |
|---|---|---|---|
| 0.0–1.0 | Panel draws in at 0.3 alpha, dashed | `rev ?` visible, nothing inside | — |
| 1.0–4.5 | Clock fades in at (540,1720), hands spin one and a half turns | contrast case: nothing resolves while the revision is unknown | `clock` at 1.6, 2.4, 3.2, 4.0, gain 0.45 |
| 4.5–5.5 | Clock fades out; `rev` text switches to `a1f3c` (white, dur 0) with a white ripple; panel `dashed` 1 → 0, stroke → `#8B9099` | revision pinned, outline solid | `arrive` C5 at 4.7 |
| 5.5–7.5 | Hold | — | — |
| 7.5–8.1 | files row0 `AGENTS.md` fades in, grey text, fill 1 | first instruction file present | `store` E5 at 7.6 |
| 8.3–8.9 | row1 `task.md` fades in | task loaded | `store` E5 at 8.4 |
| 9.1–9.7 | row2 `check.sh` fades in | the check command is part of the workspace | `store` E5 at 9.2 |
| 9.7–11.5 | Hold; files sublabel → `3 files` grey | — | — |
| 11.5–12.0 | checkLabel alpha → 1; panel stroke → white with glow; `checks` track brightens | baseline run begins, before any edit | `send` G6 at 11.5 |
| 12.0–17.0 | seg0 fills 0 → 0.92 green over 5 s; `s.mark` dots along the bar at every 1/12 as each check completes (11 marks) | checks landing one by one | `work` every 0.42 s, G5 cluster, gain 0.35, rising a semitone each third mark |
| 17.0–17.5 | seg1 fills 0.92 → 1.0 red; red ripple with `x` at the bar end; small panel shake 6 px | one check fails; bar reaches its tick | `miss` at 17.1, gain 0.8 |
| 17.5–18.2 | badge `11 pass · 1 fail` pops in at (540,1260), orange | the whole baseline is visible as data | `ack` G5 at 17.6 |
| 18.2–20.5 | Hold; panel glow off, stroke back to grey | — | — |
| 20.5–21.3 | Chip `test_tenant_b` (red) travels from the red segment end [810,1180] to `known` row0; `known` alpha 0.3 → 1 | the failure is copied aside, the bar keeps its red segment | `send` at 20.5, low |
| 21.3–21.8 | `known` row0 text `test_tenant_b · known`, colour red, fill 0.08; red ripple on the store | existing failure retained separately | `thump` at 21.4 |
| 21.8–24.0 | Hold | — | — |
| 24.0–24.7 | badge `baseline · a1f3c` pops in green at (540,1610); panel stroke → OK green, brief glow; green ripple around the panel | the recorded state is bound to the revision | `chime` C5 at 24.1 |
| 24.7–28.0 | Hold on the complete panel: rev, three files, bar with its red tail, count, known failure, stamp | this is the comparison point future runs use | — |
| 28.0–30.5 | Hold, glow fades; nothing else changes | — | — |
| 30.5–31.8 | `s.fade` to black | — | — |

`meta.duration` 32 at speed 1 (≈36 s playback). Holds are deliberate; a beginner needs to read each row once before the next thing happens.

## Sound map

| Event | Preset | Pitch / note |
|---|---|---|
| Unknown wait | `clock` ×4 | default, quiet |
| Revision pinned | `arrive` | C5 |
| Each file loaded | `store` | E5, E5, E5 (three even beats) |
| Baseline start | `send` | G6, quiet |
| Each passing check | `work` | G5 rising a semitone per third |
| Failing check | `miss` | default, the loudest cue |
| Count badge | `ack` | G5 |
| Failure retained | `send` low + `thump` | one octave down |
| Baseline stamped | `chime` | C5 |

The failing check is the loudest event and the only non-musical one until the thump, so the ear catches the lesson's core: the failure is noticed and kept, not quietly absorbed.

## Implementation needs

1. `box` needs an animated `dashed` prop (0–1) so the panel can start as a dashed outline and tween to solid. Add it generally in a local copy of `flow-engine.js` beside the scene, named for its shape, and report it.
2. `bar` segments already cap at full width; seg0 0.92 + seg1 0.08 fills exactly to the tick. Confirm `s.mark` positions draw above the bar and clear of the badge below.
3. `store` rows need `row{i}Alpha` to fade rows in one at a time; the API lists it, so no change expected.
4. The "copy aside" chip uses `s.packet` with `kind: 'chip'`, route `[[810,1180], 'known.top']`. The bar's red segment stays filled afterwards so the copy reads as retention, never removal.
5. Dry-run in Node to confirm 11 work ticks land between 12.0 and 17.0 and that cue count matches the table.

## Acceptance checks

- Stills at 2.5, 5.0, 10.0, 15.0, 17.5, 21.6, 25.0 s (playback) tiled in one row: the panel must read as dashed, then solid, then glowing, then green, with no earlier glow lingering.
- At 350 px width, `a1f3c`, the three file names, `11 pass · 1 fail`, `test_tenant_b · known`, and `baseline · a1f3c` are all legible and none overlaps the bar, marks, or panel edge.
- The red segment is still present in the final still; the known-failures row is red; nothing on the stage is green except the bar's pass segment, the stamp, and the panel stroke.
- Spectrogram shows the `miss` at ≈19 s playback as the loudest burst and the chime at ≈27 s.
- ffprobe reports ≈36 s with an audio stream; first and last frames are black below the title.

## Rationale

Lesson 01 showed a request crossing a boundary. This lesson is about state, so the composition is a single panel whose contents accumulate; the only travelling element is the failure being copied into its own record, which is the one moment the lesson needs motion to explain. The dashed-to-solid outline gives the viewer the unknown/known contrast without a metaphor, and the revision id reappearing inside the final stamp ties the baseline to the exact checkout without a word of explanation. Keeping the red tail on the bar after the copy is what makes "retain separately" visible rather than asserted.

