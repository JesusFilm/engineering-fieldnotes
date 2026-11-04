# Video 01 plan

## Mechanism and scope

A model emits a proposed tool call; executable runtime software checks the request, dispatches the tool, captures its output, and returns concrete evidence to the model. Make the distinction visible through ownership of state: producing a request does not activate the tool. Only dispatch does.

Use one illustrative operation throughout: `read_file` with `path: notes.txt`, identified as `#1`. The file contains `count=7`. This small, literal example avoids introducing tests, workspace preparation, repair cycles, acceptance decisions, or release gates. Preserve the existing lesson scope and the surrounding five-lesson structure without planning any other video.

Target 48 seconds at 1080×1920, 30 fps, authored at speed 1. Timing is instructional, not a claim about execution latency. No narration is required. On-screen language consists only of actor names, operation fields, short status labels, and returned data. The existing lesson prose can explain the distinction outside the video.

## Stage and visual grammar

Use a fixed, asymmetric software diagram: a model output panel above an expanded runtime workspace, with one tool attached below. This exposes the runtime’s internal actions instead of presenting three interchangeable boxes. No hands, conveyor belts, factory machinery, or anthropomorphic thinking effects.

Coordinates are canvas pixels; rectangles are specified by centre and size:

- Title: `Model + runtime`, centred at (540, 300), 76 px. Subtitle `TOOL CALL`, centred at (540, 405), 40 px.
- Model panel: centre (540, 610), 700×220. Label `Model` at (540, 535). Its two-line output area occupies x=255–825, y=575–675.
- Runtime outline: centre (540, 1030), 900×520, labelled `Runtime` at (540, 800). Use a thin open workspace outline, without server slots.
- Request inspection area: centre (355, 990), 420×250. Display `#1`, `read_file`, and `notes.txt` on separate lines. Two small status rows below, centred at (355, 1170) and (355, 1225), read `Tool ✓` and `Path ✓` only after their respective checks.
- Result area: centre (780, 1000), 260×230. Initially an empty outlined row; later display `#1` and `count=7` on separate lines.
- Tool: centre (355, 1470), 420×190; label `read_file`, with a single activity bar and status `Idle`, `Running`, or `Done`.
- File contents: flat document outline centred at (800, 1470), 260×190; labels `notes.txt` and `count=7`. Show the contents from the opening so the returned value has a visible source.

Request wire: (355, 720) → (355, 865). Dispatch wire: (355, 1280) → (355, 1375). File-access wire: (565, 1470) → (670, 1470). Tool-result wire: (565, 1510) → (630, 1510) → (630, 1245) → (780, 1245) → (780, 1115). Runtime-return wire: (780, 885) → (900, 885) → (900, 610) → (890, 610). Arrowheads appear only for the active direction. Keep these routes behind content and avoid crossings.

Use the skill’s near-black background, grey idle strokes, amber activity, and teal completed data. Labels and payload text are 44–48 px; status marks supplement colour. No explanatory sentence appears on screen.

## Beat sheet

| Time | Movement | Observable state | Sound / pitch |
|---|---|---|---|
| 0–7 s | Establish the full stage for 2 s. Reveal `#1 read_file` and `notes.txt` in the model output over 1.5 s; hold. | The proposal exists, but runtime rows are empty and the tool remains `Idle`. The file already shows `count=7`. | One quiet `arrive`, C5, when the proposal becomes complete. No typing chatter. |
| 7–15 s | Copy the proposal down the request wire over 1.5 s. Highlight its operation field, then its path, sequentially. | Runtime request area fills. `Tool ✓` appears at 11 s; `Path ✓` at 13 s. Tool remains visibly `Idle` throughout. | `send` C6 at departure; `arrive` E5 at receipt; two subdued `ack` E5 notes at the checks. |
| 15–23 s | Runtime dispatches `#1` down to the tool over 1.8 s, followed by stillness. | Dispatch port lights; only arrival changes tool status to `Running` and starts its activity bar. Model proposal stays unchanged. | `send` E6 at dispatch; `arrive` G5 at tool activation. |
| 23–31 s | A small access dot moves from tool to file over 1.2 s. File row brightens; a `count=7` chip returns over 1.6 s. | Tool output becomes `count=7`; its activity bar completes and status becomes `Done`. File contents remain unchanged. | Quiet `work` G4 at access, `arrive` G5 when contents reach tool, then silence. |
| 31–39 s | `#1` and its value travel together along the tool-result route over 2 s. | Runtime result area fills with `#1` / `count=7`. The tool stays done; model still has no returned value. Hold the captured result for at least 3 s. | `send` G6 at departure; `store` E5 at runtime capture. |
| 39–48 s | Runtime copies the captured result up the return route over 2.2 s. No further calls. | Model output area changes to `#1` / `count=7`; the runtime retains the matching result. Hold the completed state from 42–48 s. | `send` E6, then `deliver` C5 at model receipt. Final hold is silent. |

## Ending and production checks

End on the held evidence, without reset, replay, victory badge, or accelerated recap. The normal case supplies its own contrast: an inert proposal first, actual execution later. A rejected-call branch would distract from this first mechanism and is unnecessary.

Checks represent this example’s configured tool lookup and path validation; they do not establish universal safety or comprehensive authorization. Never suggest that the model directly reads the file, that reading modifies it, or that receiving evidence proves a broader task correct. Keep `#1` consistent so the result cannot look like an unrelated model invention.

Use existing labels, bars, wires, chips, and scheduled state changes; any additional outline drawing belongs locally to the eventual cut. Keep sounds sparse and pan by actor position; pitch identifies actors, not correctness or speed. Future production review should inspect every landing and transition at full size and 350 px width, especially the narrow result area and right return route. If text collides, shorten labels or enlarge spacing rather than accelerate motion. This document specifies a plan only; no rendering or audiovisual verification is implied.
