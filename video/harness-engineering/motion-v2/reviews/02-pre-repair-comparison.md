# Video 02 encoded comparison

## Finding

The candidate demonstrates the intended lesson substantially better. It shows a concrete revision, both instruction files loaded, a baseline executing while `changes 0` remains visible, and an existing failure copied into a separate retained record. The failure remains red after saving. The existing cut describes these ideas in captions but never shows a failure or an actual revision value.

The composition is materially different from the existing three-box flow: one workspace record accumulates observable state, with a purposeful failure-copy action. It is still predominantly a static form with highlights, so its variety comes from a different information structure rather than rich motion. The main tradeoff is smaller text at 350 px. No critical blocker was established; one localized text-overlap defect and optional improvements are separated below. This is a candidate comparison, not a publication recommendation.

## Hash binding and inspection method

Reviewed 2026-10-20. Findings apply only to these encoded artifacts:

| Cut | Path | SHA-256 | Encoding |
|---|---|---|---|
| Candidate | `video/harness-engineering/motion-v2/02/video.mp4` | `47f0cc21e4f594fef3cf63f368d89a1e237d2bea3a929d6d4c287a97ac9b688b` | 1080×1920 H.264, 30 fps, 37.233 s, AAC audio |
| Existing | `public/lessons/harness-engineering/02.mp4` | `9fff8a5b7f33290cd9728a77b5b2bbcce5b2bbed6c1d4dea638c58a9bbbeb8c8` | 1080×1920 H.264, 20 fps, 28.000 s, AAC audio |

Earlier planning context was already present. No authoring source, author review, prior scores, or other comparison was consulted for this review. Evidence came from the MP4s.

Inspected whole-duration overviews sampled every three seconds; native candidate frames at 21 and 31 s and native existing frame at 23 s; individual 350×622 frames at candidate 12, 24.5, 31, 35, and 37 s and existing 23 s; and half-second frame sequences around all major transitions. Candidate motion windows begin at 2, 8, 14, 19, 24, and 29 s. Existing windows begin at 0, 7, 14, and 20 s. Each is three seconds long, with six frames read left-to-right, top-to-bottom. Event timings inferred from those sheets are approximate within 0.5 s; individually sought frames have their requested timestamps in filenames.

Overview images were displayed reduced; phone-legibility judgments use individual 350 px images and motion-sheet frames retained at 350 px width. Motion was inspected as timestamped frame sequences, not uninterrupted real-time playback. This supports ordering, direction, and approximate pacing, but not a frame-perfect smoothness certification. Audio was decoded and measured, **not listened to**; subjective sound quality and cue alignment remain unverified.

Evidence resides in `scratch/02/`: probe JSON, SHA-256 records, decode/audio logs, overview images, native/350 stills, and motion sheets. Both hashes were checked again after the review.

## Comparison by lesson requirement

| Requirement | Candidate observations | Existing observations | Judgment |
|---|---|---|---|
| Known repository revision | At approximately 2–4 s, unknown fields become `a61c9e2` and `changes 0`. These remain visible through the baseline and ending. | At 0–2 s, `CHECKOUT` travels into Workspace, which becomes `revision recorded`. No revision value appears. | Candidate gives an inspectable identity and establishes an unchanged tree. Existing shows the setup action more literally, but its resulting state is abstract. |
| Loaded task/repository instructions | Around 8–12 s, `AGENTS.md` and `task.md` appear individually and acquire `loaded` states. At 12 s both are present before any baseline activity. | At 7–9 s, `INSTRUCTIONS` travels to Agent and produces `task loaded`; captions mention task and repository instructions. | Candidate distinguishes the two inputs and their completion. Existing makes the recipient explicit; candidate’s workspace status implies loading without showing where the context resides. |
| Baseline before edits | Around 14–16 s, `$ npm test` appears and amber activity begins. The `changes 0` row is highlighted simultaneously. Outcomes arrive afterward, with `Export FAIL` visible at 21 s. | At 14–16 s, `BASELINE` travels from Agent toward Setup; its progress bar begins. A caption says to run before editing. | Candidate ties execution to the unchanged starting state through visible evidence rather than narration alone. |
| Retain existing failure | Around 24–26.5 s, an `Export FAIL` copy moves down to Known failures. The original remains in Baseline. The copy gains `before edits`. | At 14–21 s, the caption says to record existing failures separately. At about 21 s, Setup becomes `baseline saved`; no failure appears. | This is the candidate’s decisive improvement: the retention mechanism actually happens on screen. |
| Preserve baseline identity | By approximately 29 s, Baseline shows `saved @ a61c9e2`; revision row is emphasized. At 31 and 35 s, command, outcomes, exit status, and known failure remain. | At 21–28 s, `baseline saved` and `revision recorded` remain, with no visible binding or result contents. | Candidate provides a much stronger future comparison reference, without needing to show a later run. |

## Accuracy, pacing, legibility, and variety

**Accuracy:** Candidate keeps `changes 0` throughout and never repairs or turns the failure green. Saving is visually distinct from passing: `Export FAIL` and `exit 1` remain red at 31–35 s. This correctly conveys that a prepared workspace can have a failed baseline. Loaded instructions are presented as loaded, not as proof of compliance. There is no explicit guarantee of determinism or correctness. However, the picture is a deliberately narrow illustration: revision plus clean tree does not identify every dependency, external input, or environment condition. Known failure means observed before these edits, not automatically harmless or exempt from review. These limits need accompanying prose, not paragraph captions in the animation.

**Pace:** Candidate spends roughly 0–7 s establishing workspace identity, 8–13 s loading inputs, 14–22 s executing the baseline, 24–27 s retaining failure, and 29–35 s showing the saved state. Its extra nine seconds over the existing cut support additional visible evidence. The final populated state is still present at 35 s; the workspace has faded away by 37 s. Holds are generous and the ending is finite. The earlier intervals are somewhat methodical, but do not require aggressive shortening. Existing uses evenly spaced seven-second teaching phases; much of each phase is a static diagram plus explanatory caption.

**350 px legibility:** Native candidate frames are crisp and essential stable labels are unclipped. At 350 px, the hash, command, PASS/FAIL rows, and exit status are decipherable. The smaller grey `loaded` labels and small `saved @ a61c9e2` / `before edits` qualifiers are less comfortable. These are causal information, not decoration. Existing actor names and captions are larger and easier to read; it wins raw small-screen text size but asks the viewer to read full sentences. Candidate removes paragraph captions and retains meaningful concrete labels, at the cost of fitting more simultaneous data.

**Variety:** Candidate replaces actor-to-actor transport with a workspace state view, a running command, and an internal copy into a failure record. That is a real change of visual grammar. It is not merely three renamed boxes. Its weakness is sustained reliance on one large static sheet and sequential glowing rows. The 24–27 s copy is the strongest mechanism-specific motion; the other phases mostly reveal text. This is suitable for this lesson but should not be mistaken for broad compositional variety within the cut.

## Objective blockers and defects

**Critical blockers:** None confirmed within the inspection limits. Both complete streams decoded without reported errors. Candidate peak audio was −7.7 dBFS; existing peak was −10.5 dBFS, both below clipping. Mean levels were −32.9 and −40.4 dB respectively; silence contributes to those averages, so they do not establish perceived loudness or audibility.

**Localized objective defect — candidate 24.5 s:** The moving `Export FAIL` chip crosses the source Baseline row and obscures its `FAIL` text. The exact 350 px frame `scratch/02/candidate-24.5-350.png` shows the overlap. The source result is readable before and after, and the destination is unambiguous, so this is a transient readability defect rather than a lost-lesson blocker. Start the copy beside the source value and move it through empty right-hand space, or use a row-shaped duplicate aligned without superimposed text. Preserve the source throughout so copying cannot be mistaken for removal.

**Existing lesson gap:** No actual failure is ever shown or retained separately, despite the caption directing it. This is an objective absence relative to the intended demonstration, not a decode or layout fault.

Neither unmatched first/last frames nor the candidate’s deliberate final hold is a defect for finite playback. Continuous playback and audio listening remain outstanding limitations of this review.

## Optional improvements, ranked

1. **Give the evidence qualifiers more visual weight** — candidate 8–35 s, size M. Enlarge `loaded`, `saved @ …`, and `before edits`, reclaiming width or title space rather than adding captions. Keep the observed values stable. This would make the reason the baseline is trustworthy easier to read at 350 px.
2. **Make the revision binding a paired visual event** — candidate 29–31 s, size S. The revision row lights while the saved label appears lower down. Briefly emphasize both matching identifiers together. This would connect the saved run to its revision without requiring the viewer to search the full sheet or adding another moving packet.
3. **Reduce early empty-form competition** — candidate 0–14 s, size M. Multiple empty input outlines and a dark Known failures section are present well before they matter. Reveal inactive row outlines closer to their use while maintaining section positions. This would focus attention on revision and instruction loading, and make the later evidence section feel like a meaningful change rather than another field being filled.

No media, scene source, publication metadata, or other lesson was changed.
