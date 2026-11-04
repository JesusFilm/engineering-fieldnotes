# Video 03 beat sheet: Execute and retain evidence

**Mechanism:** an actual command runs against one revision. Its output and exit status are kept with that revision and returned to the agent as an observation. A new patch is a new revision with no run of its own. The old record stays valid for the old revision and says nothing about the new one.

**Composition:** an agent strip at the top, then a revision graph (a history line, commit dots with hashes, and a moving `current` ring), with run records attached under revisions. The run record is a terminal transcript: it opens as a dashed `no run` slot, expands to full width while the command runs, and compacts back under its revision without shrinking text. The title band is compacted to about 200 px to make room for large labels (34–62 px; command and outcomes are 50 px or larger).

Times are playback seconds for `video.mp4` (authored at speed 1, `meta.speed 0.9`). Duration 41.1 s, finite ending (hold, then the stage fades to black below the title).

## Synthesis decisions

| Choice | From | Reason |
|---|---|---|
| Revision graph with run records attached under each revision | Both (A's graph and ring; B's cards under commits) | Concrete software history view; the record's position states which code it describes |
| Full-width terminal transcript with `$ npm test`, `8 passed`, `1 failed`, `export: FAIL`, `exit 1`, an indeterminate running track, and `running`/`exited` status | Plan A | Real output plus exit status; the track stops exactly when the exit status appears |
| Opening contrast: the agent's claim `"tests passed"` travels the same path as a command, jolts the empty slot, and fills nothing | Plan B | Shows that a claim is not a run; claim and command share a route and differ only in outcome |
| The observation reaches the agent intact, as exit status, revision, and the failing output line (`exit 1 @ a61c9e2` and `export: FAIL`, tagged `observed · Run #1`) | Plan A (content) + Plan B (carry the revision) | The agent's next input is an observation bound to the tested revision |
| `current` ring moves to the new revision; the record and its attachment stay with `a61c9e2`; the new revision gets its own dashed `no run` slot | Plan A | Evidence does not transfer; the new patch is untested, with no invented result |
| Old record tagged `for a61c9e2 only`, never recoloured invalid | Plan A | Old evidence is still accurate for its revision |
| Not used: Plan B's second run on the new revision (`exit 0`) | — | Would suggest the patch is proven and pre-empts later lessons |
| Not used: Plan B's output-size rows and bars, and its clock tick | — | Real output lines carry more meaning |
| Not used: Plan A's bracket graphic | — | A pulse of the whole record marks retention more simply |
| Not used: teal or green anywhere | — | Retaining a run is not passing |

Sound map: agent messages are a quiet `send` G6. The run uses E (arrival E5, work E4); output lines use E5/C5. The real failure `exit 1` is `miss`, the most prominent run cue at −8.1 dBFS. Retention is `store` C5. The new revision is D5/D6, the observation `deliver` G5, and the claim landing a muted `thump`. Pan: revision A and its run on the left, revision B on the right.

## Teaching beats

| # | Time (s) | What moves | State change | Sound |
|---|---|---|---|---|
| 1 | 0–6.7 | **A claim fills nothing.** 2.00 the agent types `"tests passed"` (tag `claim`). 2.89 the chip travels to A's slot. 4.22 it reaches the slot edge, the slot jolts, and the chip fades. | A has no run: the slot stays dashed with `no run` | 2.00 send G6 · 4.22 thump (muted) |
| 2 | 6.7–20.0 | **The command actually runs.** 6.67 the agent sends `run npm test` (tag `request`). 7.56 the chip travels the same route. 8.89 the slot turns solid and expands into a terminal. 10.22 `Run #1`/`rev a61c9e2` appear and A's dot pulses. 11.56 `$ npm test`, the track sweeps, status `running`. Output lines land at 13.56, 14.89, and 16.22. 17.78 the track stops, `exit 1`, status `exited`. | Output and exit status are both recorded against `a61c9e2` | 6.67 send · 8.89 arrive E5 · 10.22 ack C6 · 11.56 work E4 · 13.56 arrive E5 · 14.89 and 16.22 arrive C5 · 17.78 miss |
| 3 | 20.0–25.1 | **Retained and returned.** 20.00 the record and A's dot pulse, and status becomes `retained`. 21.56 the chip `export: FAIL · exit 1` rises to the agent. 22.89 the agent strip shows the observation intact, with no typing: `exit 1 @ a61c9e2` and `export: FAIL`, tagged `observed · Run #1`. | The agent holds an observation, not a claim; the record is unchanged | 20.00 store C5 · 21.56 send E6 · 22.89 deliver G5 |
| 4 | 25.1–33.1 | **A new patch.** 25.11 the record compacts under A (same text size). 26.67 it settles. 27.78 the agent shows `patch -> b84d102` (tag `edit`). 28.67 the history line extends. 29.56 B's dot and hash appear. 30.89 the `current` ring moves to B and A's dot greys. | Current code has a new identity; the record stays attached to A | 26.67 store C5 (soft) · 27.78 send · 29.56 arrive D5 · 31.89 ack D6 |
| 5 | 33.1–41.1 | **No evidence for B; A's record still holds for A.** 33.11 B's dashed `no run` slot appears. 34.89 A's record pulses and its status becomes `for a61c9e2 only`. Hold, fade from 38.9 to 40.0, then black below the title. | B needs its own run; A's evidence is still valid for A | 33.11 thump D4 (muted) · 34.89 ack C6 · silent hold |

## Reproduce

From the repository root:

```
node video/harness-engineering/motion-v2/03/engine/render.mjs video/harness-engineering/motion-v2/03/scene.js video/harness-engineering/motion-v2/03/video.mp4 --sheet video/harness-engineering/motion-v2/03/scratch/contact-sheet.png
```

Local engine extensions (general, this cut only):

- `card`, carried over from 02;
- `log`, a transcript panel anchored at its top-left, with animated width and height, rows, a placeholder, and an indeterminate track;
- `commit`, `ring` (animated centre x), and `edge` (animated extent);
- a `size` option for chip packets;
- `meta.veilTop`, so the fade can start below a compact title.

## Lesson text sync

`lessons.json` item 3 assumes 28 s, with beats at 0/7/14/21 in the order run, capture, associate, return. This cut returns the evidence before the new patch. Retime to duration 41.1 with beats at **0** (claim, then run request at 6.7), **11.6** (capture output and exit status), **20.0** (retain and return to the agent), and **25.1** (new patch needs new evidence). The text for beats 3 and 4 swaps order. This folder does not edit that file.
