# Video 02 beat sheet: Prepare a known workspace

**Mechanism:** before any edit, the harness pins a known revision, loads the instructions, and runs a baseline. An existing failure is recorded separately, as it was found. This video does not fix the failure or certify the workspace.

**Composition:** one workspace sheet whose four sections (Workspace, Instructions, Baseline, Known failures) fill in from the top. There are no wires between nodes and no request/response boxes. The only travelling element is the failure being copied into its own record. Unlike video 01, all state accumulates in place.

Times are playback seconds for `video.mp4` (authored at speed 1, rendered at `meta.speed 0.9`; playback = scene ÷ 0.9). Duration 37.23 s, finite ending (hold, then the stage fades to black).

## Synthesis decisions

| Choice | From | Reason |
|---|---|---|
| Single sheet that fills in, with the failure copied into its own record while the source row stays red | Plan A | Makes "retain separately" visible instead of asserted |
| Dashed outline turns solid once revision and changes are known | Plan A | Shows unknown → known without words or metaphor |
| `changes 0` row, visible throughout and lit amber when the baseline starts | Plan B | Shows the baseline runs before any edit |
| Three named checks revealed one at a time (`Parse`/`Access` PASS, `Export` FAIL), then `exit 1` | Plan B | Granular and readable; a 12-tick ratio bar asks the viewer to count |
| Indeterminate activity track (sweeping segment) while the run is in progress | Plan B | No invented percentage |
| Neutral `saved @ a61c9e2` stamp; the panel never turns green | Plan B (no celebratory claim) + Plan A (stamp bound to revision) | Recording is not certification |
| Not used: Plan A's clock in the opening | — | The dashed outline and `?` values already carry "unknown"; a clock adds a metaphor |
| Not used: Plan A's 11-mark bar and `11 pass · 1 fail` badge | — | Replaced by three named rows |
| Not used: Plan B's `Later` comparison column and table reflow | — | Extra density, and it previews later comparison, which belongs to later lessons |
| Not used: panel shake on failure | — | Reads as damage; the failure is information |

Labels are sparse: section titles, `rev`, `changes`, two file names, `loaded`, `$ npm test`, three check names with outcomes, `exit 1`, `before edits`, `saved @ a61c9e2`. The revision and outcomes are illustrative fixture values.

Sound map: C = workspace state (revision, outline, saved stamp), E = instructions and the retained record, G = the baseline run and its results. The failing check uses `miss`, the only non-musical cue. All cues are centred.

## Teaching beats

| # | Time (s) | What moves | State change | Sound |
|---|---|---|---|---|
| 1 | 0–8.2 | **Unknown → known start.** 0–2.2 the dashed sheet holds, with `rev ?`, `changes ?`, and empty rows. 2.22 the revision types in. 4.00 `changes 0` appears. 5.56 the outline turns solid and glows briefly. | Revision pinned, no edits, workspace outline solid | 2.22 arrive C5 · 4.00 ack C6 · 5.56 store C4 |
| 2 | 8.2–14.2 | **Instructions load.** 8.22 `AGENTS.md` fills its slot, then `loaded` at 9.00. 10.67 `task.md` fills, then `loaded` at 11.44. | Two inputs present before anything runs | 9.00 and 11.44 arrive E5 |
| 3 | 14.2–24.2 | **Baseline before edits.** 14.22 `$ npm test` types in. 15.56 the activity track starts sweeping, and `changes 0` lights amber. 17.33 Parse PASS. 18.89 Access PASS. 20.44 Export FAIL (red row). 21.56 the track stops and `exit 1` appears. | Run outcome recorded. The failure exists before any change | 14.22 send G6 · 15.56 work G4 · 17.33 and 18.89 ack G5 · 20.44 miss (failure cue) · 21.56 arrive G4 (quiet) |
| 4 | 24.2–28.9 | **Failure retained separately.** 24.22 the Export row flashes red, and a copy `Export FAIL` starts beside the source value. It drops down the empty right-hand side into Known failures, never crossing row text. 25.78 the record fills with `Export FAIL`, and `before edits` appears 0.2 s later. | A separate known-failure record. The baseline row stays red; nothing turns green | 24.22 send E5 · 25.78 store E4 |
| 5 | 28.9–37.2 | **Baseline saved with its revision.** 28.89 `saved @ a61c9e2` appears on the Baseline header, the `rev` row lights, and the panel glows briefly. A hold follows, then the fade from 35.0 to 36.1 and black to the end. | Starting evidence bound to the revision. The panel stays grey, never green | 28.89 arrive C5 · silent hold |

## Reproduce

From the repository root (uses the pinned `puppeteer-core` in root `node_modules`):

```
node video/harness-engineering/motion-v2/02/engine/render.mjs video/harness-engineering/motion-v2/02/scene.js video/harness-engineering/motion-v2/02/video.mp4 --sheet video/harness-engineering/motion-v2/02/scratch/contact-sheet.png
```

The local engine adds three general node types to `flow-engine.js`:

- `card`: a panel with optional stroke and dashing, a title plus a right-aligned title tag, and rows with name/value columns, reveal, slot, coloured highlight, and tag.
- `track`: an indeterminate activity rail.
- `rule`: a section divider.

## Lesson text sync

`lessons.json` item 2 assumes 28 s with beats at 0/7/14/21. For this cut, retime it to duration 37.2 with beats at **0 / 8.2 / 14.2 / 28.9**. The third text beat, "Run a baseline… record existing failures separately", spans beats 3 and 4 (14.2–28.9). This folder does not edit that file.
