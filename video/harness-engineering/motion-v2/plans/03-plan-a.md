# Video 03 plan

## Scope and visual direction

**Execute and retain evidence.** A command actually runs against a particular revision. Its retained observation includes output and exit status. That observation returns to the agent without being replaced by a success claim. When the code changes, the old observation remains evidence about the old revision; the new revision has no run yet.

Use a **revision graph with attached run transcripts**, temporarily expanding one run to readable terminal scale. The composition changes from revision selection, to live terminal, to returned observation, to two revision-specific run positions. This is a concrete software history view, not a physical analogy or an accumulating workspace form. No three-tier actors, animated network packets, or generic server boxes.

Choose an unsuccessful run deliberately: `npm test` produces `8 passed`, `1 failed`, `export: FAIL`, then `exit 1`. Retaining a failure demonstrates useful evidence without implying success. The code later changes from illustrative revision `a61c9e2` to `b84d102`; do not explain or animate the repair. End with the new revision untested. This video concerns evidence identity, not setup, diagnosis, acceptance gates, or repair strategy.

Approximately 48 seconds, six beats, finite ending. The slowed execution is instructional timing, not a measured latency.

## Coordinate layout

Canvas 1080×1920. Background near-black; white primary text, grey structure, amber active process, red failed outcome. Teal is unnecessary: a saved observation is not a passing test. Title `Run → evidence` centred at (540, 300), 76 px. No paragraph captions.

**Revision graph:** horizontal line from (170, 580) to (910, 580). Initially only revision A exists, at (300, 580), with a 16 px filled circle. Its identifier `a61c9e2` is centred at (300, 510). An outlined selection ring surrounds the active revision; the small label `Current` sits at (300, 650). Revision B later appears at (780, 580), identifier at (780, 510), with its own selection ring. The solid A–B edge denotes history, never a data-transfer path.

**Expanded run view:** x=100–980, y=760–1550, without a surrounding box. A thin left gutter at x=120 evokes a terminal transcript. Run header `Run #1 · a61c9e2` at (540, 790). All following lines left-aligned at x=165: `$ npm test` at y=910; `8 passed` at 1050; `1 failed` at 1140; `export: FAIL` at 1230; `exit 1` at 1380. Process status sits at (780, 1460): `Running`, then `Exited`. A short amber activity stroke occupies x=165–420 at y=1460. Never use a fake percentage.

**Return view:** retain the transcript at exactly these coordinates. Header changes to `Observation #1` at (540, 790); revision remains separately visible at (540, 850). Add a simple left bracket from (105, 890) to (105, 1415), with 30 px horizontal ends, grouping command, output, and exit status. A single status `Agent received` appears at (540, 1570). This is a returned tool-observation view, not an agent-generated answer bubble.

**Final graph view:** over 2 seconds, reflow the transcript into a left-aligned compact run beneath A, without shrinking text. Left column x=95–505; right column x=575–985. A’s attachment line runs (300, 680)→(300, 780), ending above `Run #1` at (300, 825). Lines at x=115: `a61c9e2` y=915, `$ npm test` y=1005, `8 passed` y=1120, `1 failed` y=1210, `export: FAIL` y=1300, `exit 1` y=1430. `Retained` at (300, 1540).

B has no run attachment line. Show a dashed empty run-position outline spanning x=590–970, y=790–1010, labelled `No run` at (780, 900). Below it, `Evidence —` at (780, 1120). This is a conspicuous absence, not a failed execution or a claim of safety. Do not copy A’s result into B’s column.

Use 48–52 px for payloads and statuses, at least 46 px for revision identifiers: approximately 15–17 px at 350 px viewing width. Fit the longest compact line at full size; wrap nothing into explanatory prose.

## Storyboard

| Time | Motion | Observable state | Sound / pitch |
|---|---|---|---|
| 0–7 s | Establish A for 2 s. Selection ring brightens at 2 s. At 4 s, expand its run view downward; reveal command in one piece. Hold. | `Current` is A. `Run #1` names the same revision. A command is selected, but no output or exit status exists yet. | `ack` C5 at selection; soft `arrive` E5 at run opening. |
| 7–15 s | At 7 s, command briefly brightens; activity stroke starts. At 10 s reveal `8 passed`; at 12 s reveal `1 failed`. Hold the running state. | Execution produces observations in sequence. The process remains `Running`; exit status is still absent. | `work` E4 at start; soft `arrive` E5 for first output; subdued `thump` C4 for failure output. No continuous typing. |
| 15–22 s | Reveal `export: FAIL` at 15 s. At 18 s, stop activity and reveal `exit 1` while status becomes `Exited`. Hold four seconds. | Failure detail and nonzero exit status coexist. Output does not stand in for status, and status does not replace output. | Soft `arrive` E5 at detail; low `ack` C4 at exit. No crash, shake, or success chime. |
| 22–30 s | Draw grouping bracket over 1 s, briefly emphasizing revision, command, output, and exit together. At 25 s change to the observation header; at 27 s reveal `Agent received`. | The entire run is retained and supplied as observation. `export: FAIL` and `exit 1` remain unchanged through the handoff. | `store` C5 at 23 s; quiet `arrive` E5 at 25 s; `deliver` G5 at 27 s. Pitch denotes receipt, not success. |
| 30–39 s | Reflow the preserved transcript into A’s compact column over 2 s. At 34 s extend the revision edge to B; reveal B’s identifier. At 36 s move only the selection ring and `Current` label to B. | A’s record stays attached to A. The current code now has a different identity. No evidence travels with the selection ring. | `store` C5 when the retained record settles; `arrive` D5 when B appears; `ack` D5 when selection changes. |
| 39–48 s | Reveal B’s empty run position at 39 s, then `Evidence —` at 41 s. Briefly emphasize B’s empty position and A’s retained attachment in succession. Hold the final comparison from 43–48 s. | Current revision B has no execution evidence. A still has a complete failed observation. The contrast shows why B requires a fresh run without inventing its outcome. | Soft `arrive` D4 at empty run reveal; restrained `ack` D4 at evidence status; one quiet `ack` C5 when A’s attachment is emphasized. Final hold silent. |

## Implementation and accuracy limits

Use existing text, line, pulse, and sound primitives where possible. A local transcript helper should expose row positions and opacity so the expanded-to-compact transition interpolates without scaling letters or retyping returned evidence. A local graph helper can expose edge extent and selection-ring position. Keep extensions with the eventual cut and use the repository-pinned engine. No source changes or rendering belong to this plan.

Both revision identifiers represent immutable, clean snapshots for this illustration. A real system must also identify uncommitted changes and relevant environment/input state; a commit identifier alone is insufficient when those differ. Retain complete stdout/stderr and execution metadata in the implementation; the on-screen lines are a representative excerpt, not a proposed complete storage format.

Old evidence does not become false when a new patch appears. It remains valid as an observation of A and insufficient to establish B’s behavior. Do not recolour A’s record as invalid or move its attachment. An exit code reports the invoked process’s outcome; neither zero nor nonzero alone proves overall correctness. `Agent received` means the observation was supplied, not understood or acted upon. No enforcement gate is demonstrated.

## Acceptance checks and rationale

At 350 px width, a first-time viewer must be able to read both hashes, `npm test`, failure detail, and `exit 1` without zooming. Inspect transitions as well as landed frames: the retained transcript must never change values, lose its revision, or appear attached to B. The activity indicator must start before output and stop with exit status. The return view must preserve the failed observation rather than substituting a congratulatory summary.

Confirm the final image unmistakably distinguishes an existing failed run from an absent run. A missing run must not use a red failure cross. Check sound alignment for every meaningful state change, actual audibility, encoded frames, and playback during production; none is claimed verified here.

The revision selection moves while the evidence stays put. That spatial separation teaches the central rule directly. Enlarging one live execution, returning its unchanged transcript, and then revealing a different untested revision gives this lesson its own visual structure and a useful finite ending.
