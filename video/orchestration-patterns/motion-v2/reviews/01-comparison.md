# Follow dependencies — encoded comparison

Decision: **pass** for the reviewed local candidate. No reproducible objective blocker was found. The candidate teaches the dependency more concretely than the public baseline. This is an encoded review, not a publication action.

## Scope and method

Grounding: `video/orchestration-patterns/sequence/lessons.json`, item 1. The intended mechanism is draft → check using that draft → result retaining the observed findings. Later work waits for required earlier output; extra stages add latency and failure opportunities.

Inspected the actual MP4s before consulting any author source or self-review; neither was consulted. Earlier planning context was acknowledged, but is not evidence of rendered behavior. Viewed individual 350×622 images at native displayed width, not a contact sheet: candidate periodic samples 001–009 and baseline 001, 003, 005, 006. Additional exact frame-index extractions were inspected at candidate 8, 10, 12, 20, 22, 24, 30, 38 and 43 seconds and baseline 7, 14 and 21 seconds. Candidate 30 seconds was also inspected at full encoded resolution. Periodic samples are identified by index rather than assumed exact timestamps.

The alternate extraction decoded from the start and selected the exact frame index, saved full PNG, then used Pillow Lanczos resizing to JPEG. This independently checks the scaled PNG extraction/display path. No suspected candidate defect survived these checks. Conclusions concern sampled states and transitions, not continuous real-time playback or every frame. Evidence and technical outputs are under `scratch/01/`.

## Comparison

| Dimension | Local candidate | Public baseline |
|---|---|---|
| Causal clarity | Staggered execution trace keeps waiting dependencies visible. D1 transfers before checking; F1 transfers before assembly. Persistent details connect the artifacts to their content. | Vertical generic steps and captions explain the order; the transferred draft and findings remain abstract. |
| Accuracy | Missing rollback remains an observed finding. Finished execution ends with “needs revision,” separating process completion from content approval. | Correct high-level sequence, but “contract preserved” supplies less concrete evidence of what checking found. |
| Pace | 44 seconds permits artifact production, handoffs, criteria inspection, result reading and a latency recap. Holds allow reading without chasing moving text. | 28 seconds, four broad phases. Readable but much of the teaching depends on two-line captions. |
| Phone legibility | Title, stage names, status words and actual finding are readable at 350px. D1/F1 are smaller but redundant with the details panel. No paragraph captions. | Main labels and captions are readable; limited concrete detail to inspect. |
| Meaningful variety | Execution trace, changing draft contents, criterion marks, artifact transfers and cumulative time emphasis serve distinct explanatory roles. | Repeated rectangles and progress bars carry most of the action. |

## Observed causal sequence

- Opening periodic samples: Draft runs while Check needs D1 and Assemble needs F1. The draft fills with “Change: Add timeout”; criteria remain unevaluated.
- 8 seconds: Draft is complete; Check still waits. 10 seconds: D1 is travelling along its dependency connector. 12 seconds: Check shows input D1. Availability precedes execution.
- Middle periodic sample: checking highlights the absent rollback and its criterion; the change receives a positive mark. This is a concrete inspection, not a success animation substituted for evidence.
- 20 seconds: Check is done; checked D1 has one finding, “Rollback missing.” 22 seconds: F1 travels toward Assemble. 24 seconds: Assemble shows input F1. The finding remains visible throughout.
- 30 seconds: all steps are done, but Result: D1 + F1 says “needs revision.” The draft and missing rollback remain visible. Completion has not erased the adverse finding.
- 38 seconds: three time segments emphasize “time adds up: 3 steps” while the result stays available to read.
- 43 seconds: title-only ending after the diagram fades. This is a finite ending, not a broken loop.

## Accuracy limits and refinements

This example demonstrates one dependent chain, not a claim that all tasks must be sequential. Time segments are schematic, not measured durations. D1/F1 are identifiers, not a prescribed schema. The assembly trace emphasizes F1 while the persistent result explicitly retains D1 as well. No repair or eventual approval is implied. The broader takeaway about additional failure opportunities is not separately demonstrated; the lesson’s central dependency mechanism is complete without adding another scenario.

Optional only: expand D1/F1 once beside the transfer labels for beginners, and consider a shorter title-only tail after the result and latency holds. Neither prevents comprehension or warrants a blocker.

## Technical checks and hash binding

Both files fully decoded without reported errors. Candidate: 1080×1920, 30 fps, 1320 frames, 44.000 seconds. Baseline: 1080×1920, 20 fps, 560 frames, 28.000 seconds. Both place `moov` before `mdat`.

Audio signal analysis: candidate mean −32.6 dB / maximum −6.7 dB; baseline mean −40.7 dB / maximum −10.5 dB. These measurements show signal and headroom, not sound design quality. **Audio was not actually heard**; actor-specific sound, synchronization and subjective loudness are not listening-verified.

| File | SHA-256 before | SHA-256 after |
|---|---|---|
| Candidate | `446e4ec8264902a5406dfa98b843952ebc962a5022db7611417c104159d1e65c` | `446e4ec8264902a5406dfa98b843952ebc962a5022db7611417c104159d1e65c` |
| Baseline | `2c402e86450ddece5409504b033551423741c50901a49dc2a1b34a3dc30b3010` | `2c402e86450ddece5409504b033551423741c50901a49dc2a1b34a3dc30b3010` |

Both hashes are unchanged. The decision applies only to this candidate hash. Any repair or replacement encode requires fresh inspection and a decision bound to its new full hash. No media was edited.
