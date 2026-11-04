# Lesson 04 beat sheet: No tests is not a pass

**Mechanism:** a mistyped selector (`discunt`) matches none of the 12 collected test names, so the selection is empty and nothing runs. `0 failed` next to `0 ran` is an empty result, not a pass. An empty selection is its own outcome class, separate from an assertion failure or a collection error, and it has its own next action. Under this repair-only policy, product edits stop. The command and selection output are kept for an engineer, and the cut ends with `setup check pending`. No corrected selector, rerun or patch is shown.

All values are illustrative: 12 collected tests, the names shown, and `discunt` as the typo. The counts follow the documented pytest behaviour, where an unmatched `-k` collects tests and then deselects all of them. Times are playback seconds in the encoded `video.mp4` (`meta.speed 1`). Duration is 37.20 s, with a finite ending (fade to black).

## Synthesis of the two plans

| Idea | Used | Why |
|---|---|---|
| A test list filtered by the selector down to an empty state (`0 selected` / `no matches`), while `collected` stays 12 | Plan A | The tests exist; only the selection is empty |
| Each name's `discount` substring is highlighted, then the command's `discunt` | New, building on Plan A's substring outline | Shows concretely why nothing matched |
| Counter row `collected · selected · ran · failed` | Both (Plan A's separate counts, Plan B's counter pipeline) | Separates the quantities a beginner tends to merge |
| `0 failed` first reads green, then turns grey beside the highlighted `0 ran`, labelled `not a pass` | Plan B (the trap) | Shows the misreading directly, then corrects it with the count that explains it |
| Three-row outcome table (`assertion fail → patch`, `collect error → fix setup`, `0 selected → stop, engineer`); the evidence lights exactly one | Plan B | Carries the lesson's takeaway that the classes need different next actions, without demonstrating the other classes |
| `repair-only` status: `edits allowed` → dashed `edits stopped` / `no patch made` | Plan A (policy footer) | The stop belongs to this team's policy |
| Evidence kept with the exact typo: `pytest -k discunt`, `collected 12`, `selected 0 · ran 0`, then `setup check pending` | Plan A | The engineer receives the original evidence, uncorrected |
| Amber for the empty selection, with no red ✗ | Plan A | Keeps "nothing ran" visually distinct from "an assertion failed" |
| Plan B's corrected selector, chime and counter reset | Not used | Repairing the setup happens after this lesson's handoff |
| Plan B's exit code, phone and `→ engineer` badge; Plan A's header crossfade | Not used | The counts carry the mechanism; a separate evidence panel replaces the crossfade |

## Stage

- **Selection panel**, top: `$ pytest -k discunt`, then three representative names plus `+ 9 more`. These are replaced by `0 selected` and `no matches`.
- **Counters**: four boxes (`collected`, `selected`, `ran`, `failed`) joined by short links that light as the count passes along. `not a pass` sits under `failed`.
- **`outcome → next` table** with three rows.
- **Bottom left:** `repair-only` policy status.
- **Bottom right:** `for engineer` evidence record.

The empty selection reports from the `selected` counter down to the table. The table drops one link to each bottom panel.

## Beats

| # | Time (s) | What moves | State change | Sound |
|---|---|---|---|---|
| 1 | 0–7.8 | **Tests exist; the selector is wrong.** 0.5 the panel lights. 1.1–2.3 the names appear; `collected` counts 1 → 12. 3.4/3.8/4.2 `discount` is outlined green in each name. 5.0 `discunt` is outlined amber in the command. | Nothing has been selected or run; the other counters read `–`. Hold 5.0–7.8. | 0.5 arrive E5 · twelve ack E6 counting ticks · three ack C6 · 5.0 ack G5 |
| 2 | 7.8–11.6 | **Selection keeps nothing.** 7.8 the names fade out in place and the first link lights. 8.7 `selected` jolts to amber `0`. 8.9 `0 selected` appears; 9.3 `no matches`. | `collected` stays 12. Hold 9.3–11.6. | 7.8 send E6 · 8.7 miss |
| 3 | 11.6–19.0 | **Nothing ran, but "0 failed" looks like a pass.** 12.0 `ran` → amber `0`. 13.3 `failed` → green glowing `0`. 15.6 `ran 0` glows. 16.3 green `0 failed` fades to grey; 16.7 `not a pass` appears. | The apparent pass is visibly withdrawn by the count beside it. Holds: 13.3–15.6 (the trap) and 16.7–19.0. | 12.0 thump (soft) · 13.3 hit (the deceptive sparkle) · 15.6 ack E5 · 16.3 poof |
| 4 | 19.0–24.0 | **Classify.** 19.0 an amber dot drops from `selected` to the table. 19.6 the table lights. 20.4 `assertion fail` is checked and dims. 21.0 `collect error` is checked and dims. 21.7 `0 selected → stop, engineer` lights amber. | Exactly one class matches. Hold 21.7–24.0. | 19.0 send E6 · 19.6 arrive G5 · 20.4/21.0 ack G5 · 21.7 thump (loudest) |
| 5 | 24.0–27.0 | **Stop product edits.** 24.0 a dot drops to `repair-only`. 24.5 `edits allowed` → `edits stopped`; the outline turns dashed and jolts. 25.3 `no patch made`. | No patch and no rerun. | 24.0 send G6 · 24.5 latch · 25.3 deliver C5 (low) |
| 6 | 27.0–37.2 | **Keep the evidence for an engineer.** 27.0 a dot drops to `for engineer`. 27.5 it lights. Rows appear: 28.0 `pytest -k discunt`, 28.6 `collected 12`, 29.2 `selected 0 · ran 0`. 30.2 `setup check pending`. 35.6–36.6 fade. | The typo is kept exactly. Edits stay stopped. Final hold 30.2–35.6. | 27.0 send G6 · 27.5 arrive A5 · three store A5 · 30.2 arrive C6 (quiet) · silent fade |

Actor pitches: selection and counters E, outcome table G, policy C, engineer record A.

## Reproduce

From the repository root (Node ≥ 22.12, pinned `puppeteer-core 25.14.0` resolved from root `node_modules`, Chrome, ffmpeg):

```
node video/loop-engineering/motion-v2/04/engine/render.mjs video/loop-engineering/motion-v2/04/scene.js video/loop-engineering/motion-v2/04/video.mp4 --sheet video/loop-engineering/motion-v2/04/scratch/contact-sheet.png --wav video/loop-engineering/motion-v2/04/scratch/sfx.wav
ffmpeg -v error -y -ss 33.5 -i video/loop-engineering/motion-v2/04/video.mp4 -frames:v 1 -q:v 2 video/loop-engineering/motion-v2/04/poster.jpg
```

The local `engine/flow-engine.js` adds three general node types:

- `panel`: rows with character highlights, tags, icons and dashed outlines.
- `pill`.
- `counter`: a box showing a big value with a name below.

It also adds a status mark and an `r` option for dot packets. These were adapted from my earlier local helpers without changing those folders. The scene defines one sound, `latch`. The shared skill is unchanged.

## Lesson text sync (for the coordinator)

`sequence/lessons.json` item 4 declares `duration: 28` with beats at 0/7/14/21. For this cut the beats would be **0 / 11.6 / 19.0 / 27.0**: selector with empty selection, empty result that is not a pass, classify and stop, then hand to an engineer. Duration is 37.2. This folder does not edit that file.

