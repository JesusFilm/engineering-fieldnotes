# Lesson 01 encoded comparison: Task, trial and grader

**Decision: pass.** Prefer the local candidate for this lesson. No reproducible objective blocker was found in the inspected encoded frames and transitions. Optional refinements below do not require repair for acceptance.

## Scope and method

Grounded in `video/agent-evals/sequence/lessons.json` item 1: define a task and success criteria, run one trial of the agent system, grade its evidence, and restrict the conclusion to that trial. Earlier planning context is acknowledged; no author source, current plan, or self-review was read for this review.

Inspected actual individual 350px-wide images decoded from both MP4s, not contact sheets or author screenshots. Initial sampling used FFmpeg `fps=1/6,scale=350:-1` (candidate samples 1–7, baseline 1–5). Follow-up used full decoding with frame-index selection, then Pillow Lanczos resizing to 350×622 and JPEG output. Exact candidate times inspected: 0, 10, 11, 19, 20, 21, 22, 23, 24, 25, 29, 30, 35, 39, 40, 41 seconds. Exact baseline times: 7, 14, 21, 27 seconds. These cover representative states and transitions; this is sampled frame analysis, not continuous playback or an every-frame audit. No visual fault is alleged based on a single display; alternate extraction did not establish a clipping/overlap fault.

## Comparison

| Dimension | Local candidate | Public baseline |
|---|---|---|
| Causal clarity | Task defines empty-password rejection and valid-password acceptance; T1 reads/edits/saves P1; grader receives P1 and checks observed values before the grade appears. | Task → agent system → grader is clear, but captions carry most of the meaning and evidence remains abstract. |
| Accuracy | Model, harness, tools and repo are explicitly inside T1. Finished execution remains ungraded until checking completes. Final result says criteria met for T1; T2 remains not run. | Explicit prose correctly says the grade is one trial and gives no future guarantee; system composition is less visible. |
| Pace | 42 seconds gives distinct time for task definition, execution, evidence receipt, two checks, and a final hold. No need to compress to baseline length. | 28 seconds, four caption phases; readable but less concrete. |
| Native350 legibility | Useful task, event and result text is readable without zoom. Table is compact but discernible. Secondary muted labels and T2 have weaker contrast. | Spacious labels and readable captions, with greater reliance on prose below the diagram. |
| Meaningful variety | Although vertically arranged, the three areas have different functions: criteria list, system/event trace, expected-versus-observed table. Stateful checking and retained evidence teach the mechanism. | Three similar boxes, transfers and progress fill; fewer distinct semantic states. |

## Encoded observations

- Opening samples progressively expose the two criteria before execution. At 10s, Task A reaches the ready trial; at 11s, the trial is running.
- Middle samples show read/edit/save events. At 19–21s T1 is finished and P1 exists, but the result is still ungraded. Execution completion is correctly distinct from evaluation success.
- At 22–24s the grader says `has P1`, while observed outcomes remain unknown. At 25s it checks empty-password rejection against the defined expected value.
- At 29s the first outcome is retained while the valid-password case is checking. At 30s both outcomes match and the grader is done, while the result strip has not yet advanced. Later samples and 35s show `T1 criteria met`.
- The completed state persists at 39–40s. At 41s the diagram has cleared to the title. This finite ending is acceptable; retaining the table would be an optional teaching improvement.
- Baseline exact samples at 7/14/21s show its caption phase changes, and 27s retains the single-trial caveat. It communicates the caveat more explicitly in words; the candidate uses T1/T2 state instead.

## Accuracy boundaries and refinements

The two login cases are an illustrative criterion set, not exhaustive authentication coverage or proof of safe deployment. The animation does not display executable patch contents or an actual test harness execution; it illustrates evaluation mechanics. A T1 result does not establish future reliability. No deployment, repeated-trial statistic, or general reliability claim is shown.

Optional improvements:

- Increase contrast of the final “T2 not run” row, or use the equally concise “1 trial observed”, to make the future-run limitation easier to notice at 350px.
- Consider retaining the completed evidence table through the last second instead of ending on the title alone.

## Technical verification and hash binding

Both videos are 1080×1920. Candidate: 42.000s, 30fps; baseline: 28.000s, 20fps. Full audio/video decoding completed with exit code 0 for each. Both contain audio. Signal levels: candidate mean_volume: -32.7 dB, max_volume: -7.2 dB; baseline mean_volume: -44.2 dB, max_volume: -13.2 dB. Audio was analyzed, **not heard**; actor-specific timbre, perceptual synchronization and mix quality are not certified by this review. Both MP4s place moov before mdat.

| File | SHA-256 before and after (identical) |
|---|---|
| Local candidate | `d24e29b9749da062f97b2155b19a14206d07aaccb3495c70bebe769ebdb8314c` |
| Public baseline | `a38a29da8c5a7669c7caae32d3381c5f810502a25afa0275c33c73fd5dbabf6e` |

The decision JSON binds only to the candidate hash above. Any repaired or replaced encode requires renewed actual encoded inspection and a fresh hash-bound decision. Neither media file was edited. Outputs are limited to this comparison, the decision, and assigned scratch evidence.
