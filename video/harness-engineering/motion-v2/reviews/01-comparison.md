# Video 01 encoded comparison

## Finding

The candidate materially improves the intended lesson: a concrete value originates in a file, reaches the executing tool, is captured separately by the runtime, and finally appears in the model’s result area. The existing cut communicates those steps mostly through captions and generic travelling labels. The candidate is a substantive mechanism improvement, but only a partial answer to the request for visual variety: it remains predominantly boxes, dotted routes, and moving chips.

No objective candidate blocker was established in the inspected frames and decoded streams. The main remaining concerns are phone-size text hierarchy, an unnecessarily long opening hold, and a result reveal that briefly resembles generated text. These are ranked suggestions below, not automatic publication criteria or a publication recommendation.

## Artifact binding and method

Reviewed on 2026-10-20. All timestamps below are encoded playback seconds and refer only to these hashes:

| Cut | Path | SHA-256 | Encoded properties |
|---|---|---|---|
| Candidate | `video/harness-engineering/motion-v2/01/video.mp4` | `f2ab4e349dca74e00d6b5709fcbc3f7727567348aca9f3f9d1f1e46a6e5074b3` | 1080×1920, H.264, 30 fps, 38.133 s, stereo AAC |
| Existing | `public/lessons/harness-engineering/01.mp4` | `a5a149b1d62f580367577b7a8ac9bd05a2c63091ffdae518a9e144aa46116388` | 1080×1920, H.264, 20 fps, 28.000 s, stereo AAC |

Earlier planning context was already present. This comparison was made from the MP4s without consulting authoring source, author review, verification scores, or other reviews. The skill’s generic review instructions were consulted.

Inspected whole-duration overview sheets at two-second sampling, individual native-resolution frames, individual 350×622 frames, and half-second motion sequences around proposal transfer, dispatch, file access, capture, and return. Native frames inspected include candidate 14.0, 20.0, 31.5 s and existing 22.0 s. Individual 350 px frames include candidate 31.5 s and existing 22.0 s; motion sheets retain 350 px per frame. Overview sheets were displayed reduced, so phone-legibility conclusions use the individual images and 350 px motion sequences, not the reduced overviews.

This was timestamped frame-sequence inspection, not uninterrupted real-time playback. Motion windows support direction, ordering, and approximate duration; they do not establish frame-perfect smoothness. Audio was decoded and measured, **not listened to**. No claim is made about subjective pitch quality, audible cue alignment, or speaker-volume intelligibility.

Scratch evidence is in `scratch/01/`: hash records, decode/audio logs, overview sheets, individual native/350 images, and motion sheets named by their starting time. Motion sheets read left-to-right, top-to-bottom; sampled event boundaries are approximate within 0.5 s.

## Comparative observations

| Dimension | Candidate evidence | Existing evidence | Assessment |
|---|---|---|---|
| Proposal versus execution | Approximately 3–10 s: a completed `call #1 read_file notes.txt` remains in the model while the tool says `idle`. At 14 s a runtime field is checked while the tool is still idle. | 0–2 s: `RUN TESTS` travels to runtime, then disappears. The caption supplies the distinction between proposing and executing. | Candidate makes the distinction persistent and observable. The opening hold overemphasizes it slightly. |
| Runtime checks and dispatch | 14 s: tool field checked; by about 16 s both tool and path are checked. Around 17–18.5 s, dispatch travels downward and the tool changes to `running`. | 8–10 s: runtime says `validate call`; `EXECUTE` travels downward. Tool arrival occurs around 11 s, but visible progress begins later, around 14 s. | Candidate connects dispatch more tightly to execution and exposes what is being checked. Neither cut demonstrates the actual validation policy. |
| Concrete tool action | 19–22 s: access dot reaches `notes.txt`; `count=7` returns toward the tool. Tool subsequently says `done` and retains that value. | 14–18 s: tool progress bar fills. Its operation and output remain generic. | Candidate’s file operation is a meaningful visual addition beyond relabelled boxes. It does not visibly modify the file. |
| Runtime capture | 24–27 s: the same `#1 count=7` crosses into the runtime result area, which then retains the value. | 18–20 s: `RESULT` travels upward and disappears into runtime, whose visible state remains `validate call`. | Candidate explicitly represents captured evidence. Existing capture is asserted in prose rather than recorded visually. |
| Result supplied to model | 29–32 s: value returns on the right route; model result row fills and remains visible. The 31.5 s native frame catches the row mid-reveal. | 21–23 s: `TEST RESULT` moves upward and disappears; model flashes but retains no output. | Candidate has a substantially stronger ending and preserves request/result identity. Progressive text reveal slightly weakens the “received intact” interpretation. |
| Pacing | About 38 s total. Most transfers occupy roughly 1.5–2 s; meaningful intermediate states have holds. Final populated state remains for several seconds before the stage fades near the end. | 28 s total. Clear seven-second caption phases, but several spans show little state change; later caption changes carry much of the teaching. | Candidate is slower without being a rushed reel. Its longer length is justified by additional causal evidence, except for some opening slack. |
| Legibility | Native frames are crisp and unclipped. At 350 px, main payloads remain decipherable, but `proposed`, `from runtime`, actor headings, and travelling chips are noticeably small. | Actor names, moving labels, and captions are larger and easier to read at 350 px. Captions add two full explanatory lines. | Existing wins raw small-screen text readability. Candidate better meets sparse-label direction, but needs stronger hierarchy. |
| Variety | Expanded runtime boundary, separate request/result states, distinct file silhouette, concrete read animation. | Three nearly identical vertically stacked boxes. | Meaningful improvement in mechanism and shape differentiation; modest improvement in overall composition. Most screen area still consists of rectangular panels. |

## Accuracy and objective blockers

**Candidate: no confirmed blocker in inspected evidence.** No clipped essential text, incorrect value change, premature tool execution, or lost final result was observed. Both entire streams decoded successfully; logs showed no decode failures. Measured audio peaks were −7.2 dBFS for the candidate and −15.1 dBFS for the existing cut, below the clipping threshold. Average levels were −33.4 and −41.4 dB respectively; long silence affects these values, so they are not loudness-quality scores.

The candidate’s green tool/path checks establish that checks occurred in this illustrative operation; they cannot establish comprehensive authorization or general safety. Nothing visible requires that broader interpretation. Likewise, a completed read is evidence of that read, not proof of overall task correctness.

The existing cut has a substantive limitation against the requested lesson: no concrete evidence value is ever shown or retained, including at 18–23 s. That is a comparative teaching gap, not a corrupt-media defect. Its persistent `validate call` state through the return phase is less informative than the candidate’s explicit capture state.

The candidate ends with a fade rather than matching its opening. Treat it as finite playback; a seamless-loop requirement would be inappropriate here. Audio listening and continuous motion playback remain unverified, so this report is not a complete audiovisual certification.

## Optional improvements, ranked

1. **Enlarge the causal labels at phone width** — candidate 3–35 s; size M. At 350 px, `proposed` and `from runtime` are much smaller than the title, despite carrying the central distinction. Increase these labels and payload chips, reclaiming some title/empty-panel space. Keep the same short names; do not add prose. Expected effect: the viewer can identify proposal versus received evidence without leaning on colour or zooming.
2. **Receive the result as one intact value** — candidate 31–32 s; size S. The native 31.5 s frame shows `result #1` before its value finishes appearing. Replace progressive character reveal with one arrival-aligned payload reveal and a brief local pulse. Expected effect: reception reads as evidence supplied by runtime rather than another act of model generation.
3. **Redistribute the opening hold** — candidate approximately 4–10 s; size S. The proposal is complete while the rest of the stage remains unchanged for several seconds. Shorten that hold by roughly two seconds, or use part of it for a restrained visual emphasis on the still-idle tool. Preserve the slow dispatch/read/capture sequence and final hold. Expected effect: make deliberate waiting distinguishable from stalled playback without turning the piece into a reel.
4. **Reduce persistent panel competition** — candidate 19–32 s; size M. All request fields and structural outlines remain visible while attention should move through file, tool, captured result, and model. Briefly dim inactive details while keeping actor boundaries and call identity readable. Expected effect: strengthen the file-read mechanism and evidence handoff within the existing composition, without adding a new metaphor or further boxes.

No source, render, publication metadata, or other lesson was changed.
