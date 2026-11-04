# Video 02 plan

## Teaching scope and direction

**Prepare a known workspace.** Make one workspace progressively inspectable: identify its repository revision, load repository and task instructions, run a baseline before editing, and retain that baseline—including its failure—as a separate record.

The visual mechanism is a workspace acquiring recorded state. Use a single large workspace sheet that becomes a comparison table, with the baseline preserved in one column and an empty later column beside it. No network wires, moving packets, runtime panels, or three-node flow. Each change happens where its evidence belongs.

The important contrast is not success versus failure. It is an unmeasured starting point versus a measured starting point that still contains a failure. A red result remains red at the ending. Preparation reduces ambiguity; it does not repair the repository or certify correctness.

Target approximately 47 seconds, with six beats and a finite ending. All times are illustrative teaching time, not benchmark measurements. Keep this video entirely before the first edit. Do not demonstrate repair, subsequent testing, feedback loops, or acceptance gates.

## Stage layout

1080×1920, near-black background. Title `Known workspace` at (540, 300), 78 px. Use one workspace outline spanning x=90–990, y=470–1700, with no perspective, decorative desktop chrome, or physical metaphor.

Inside it:

- Header: `Workspace` at (280, 525). Revision label at (260, 610), value at (680, 610). Changes label at (260, 680), value at (680, 680). Start values as `—`; eventually show `a61c9e2` and `0`. The short revision is an illustrative identifier.
- Instructions: two horizontal rows, centred at (540, 790) and (540, 865), each 780×62. Names at x=270: `AGENTS.md`, `Task`. Right-hand status at x=790: initially `—`, later `Loaded`. These are selected input records, not achievement badges.
- Baseline command: `npm test` centred at (540, 980), 48 px monospace. A 680×12 activity track at (540, 1040), with a short amber segment moving only while running. Use indeterminate activity, not invented percentage completion.
- Results: initially one full-width list with names at x=275 and outcomes at x=760. Row centres y=1210, 1300, 1390. Names `Parse`, `Access`, `Export`; outcomes `—` then `PASS`, `PASS`, `FAIL`. At y=1475 show `exit 1`.
- Final comparison: retain names at x=275; place `Baseline` heading at (610, 1115), `Later` at (845, 1115). Baseline outcomes move from x=760 to x=610. Later cells at x=845 remain `—`. A thin separator runs (725, 1150)→(725, 1510). Baseline footer `a61c9e2` at (610, 1550), `Saved` at (610, 1620). Later footer stays blank.

Use 46–50 px data text, 42 px secondary labels, white for readable state, amber for current activity, teal for passing outcomes, and red for failure. Pair every colour with a word or shape. Avoid tiny source code, floating explanatory captions, or file contents that compete with the state record.

## Animation storyboard

| Time | Movement | State / evidence | Sound and pitch |
|---|---|---|---|
| 0–7 s | Hold the unmeasured sheet for 2 s. At 2 s, revision field brightens; reveal `a61c9e2`. At 4 s, changes value appears. Hold through 7 s. | Revision becomes known; `Changes 0` establishes the clean starting tree. Result cells remain empty. No checkout animation or destructive reset is implied. | Soft `arrive` C5 at 2 s; quiet `ack` C5 at 4 s. |
| 7–15 s | Highlight the `AGENTS.md` row over 0.6 s; its status changes to `Loaded` at 9 s. Repeat for `Task`, finishing at 12 s. Hold 3 s. | Both inputs have been loaded into the working context before execution. Revision and changes remain visible. | `arrive` E5 at 9 s and 12 s; no typing sounds. |
| 15–23 s | At 15 s, command appears. At 17 s, its outline briefly brightens and the amber activity segment starts traversing the track. | Baseline begins with `Changes 0` still visible. Result rows remain unfilled until individual results arrive. | One quiet `work` G4 at 17 s; restrained ticks at 19 s and 21 s. |
| 23–31 s | Reveal one outcome at a time: `Parse PASS` at 23 s, `Access PASS` at 25 s, `Export FAIL` at 27 s. At 28 s stop activity and reveal `exit 1`. Hold. | The run has completed unsuccessfully. Failure exists before any edits; it is neither deleted nor converted into a pass. | Soft `ack` G5 for each pass; subdued `thump` C4 for failure; quiet `arrive` G4 at completion. No crash or shake. |
| 31–39 s | Over 2 s, translate result values horizontally from x=760 to x=610. Reveal `Baseline` and its divider as the values settle. Add the revision footer, then `Saved` at 36 s. Hold. | Exact observed outcomes and exit status are retained as baseline evidence, associated with the displayed revision and command. Red failure stays red. | `store` C5 at 36 s. Motion itself is silent. |
| 39–47 s | Fade in `Later` and its three empty cells over 1 s. Hold the entire sheet for 7 s. | Baseline remains populated; later evidence has not been collected. `Changes 0` remains unchanged. The retained starting failure is available for comparison without predicting a later result. | Soft `arrive` E5 at 40 s; silent final hold. |

## Sound map and implementation needs

C5 identifies recorded workspace state; E5 identifies loaded context and the comparison structure; G4/G5 identifies execution and its outcomes. The low failure cue denotes an unsuccessful check, not damaged infrastructure. Keep all cues quiet, short, centred, and subordinate to the visible changes. No music or continuous clock is needed.

Use the repository-pinned engine in eventual production. Standard labels, bars, alpha transitions, pulses, and scheduled sound cues cover most of the scene. Add a local generic table-row drawing helper if necessary, exposing interpolated value-column position, row emphasis, and cell visibility. Do not assume the engine supports arbitrary node translation: implement the x-position interpolation explicitly through animated properties in that helper. Preserve text size while the table reorganizes; never shrink the whole workspace to make room. No engine changes or scene implementation are part of this plan.

## Accuracy limits and acceptance checks

Loading instructions does not prove they were followed. A revision and clean working tree do not capture dependencies, environment variables, external services, or all sources of nondeterminism. The baseline is one recorded observation, not proof that every future run will match. These limits belong in accompanying teaching prose rather than a dense end card.

In production, retain full baseline output separately from later runs; the visible three rows are only its readable summary. Do not suggest that a pre-existing failure should be ignored or automatically exempted from review. It must remain attributable and inspectable.

Accept the cut only if a viewer can identify the revision, see both inputs load before execution, notice the failure before any edit, and distinguish saved baseline evidence from empty later evidence. Inspect every beat and transition at full resolution and 350 px width. Confirm `FAIL` and `exit 1` survive the table transformation; headers and revision footer must not overlap. Verify sound timing and actual audibility, and perform normal encoded-media checks during production. No verification is claimed here.

This composition is effective because its final comparison structure emerges from the actual baseline results. The viewer watches uncertainty decrease without seeing failure disappear. End on that legible, unfinished-but-known state; no celebratory completion claim, forced loop, or rushed recap.
