# Lesson 04 encoded comparison

**Decision: pass. Prefer the local candidate.** It shows exactly which facts survive a shorter handoff, what is omitted, and how the next session uses the reference. No reproducible objective blocker was found. Optional refinements below are not blockers.

## Grounding and inspection

Compared `video/context-engineering/motion-v2/04/video.mp4` with `public/lessons/context-engineering/04.mp4` against item 4 of `video/context-engineering/sequence/lessons.json`, “Make a useful handoff.” Required mechanism: a vague summary can omit the contract; preserve goal, constraint, evidence reference and open work; deliver the handoff; retrieve detail by reference; omit incidental history rather than decisive constraints.

Earlier planning context was acknowledged. No author source, self-review, other plan, production state, or provenance was consulted. This judges the encoded outcome, not conformance to an earlier layout. No media or other lesson was changed.

Inspected actual individual native350 frames (350×622): candidate samples 001–010 and baseline 001–006 from fps=1/5 extraction. Sample indices are not exact timestamps. Independently decoded frame-index extracts resized through Pillow/Lanczos and displayed as JPEG were inspected at candidate 15,21,24,26,29,38,43s and baseline 14,21s. Candidate 38s was also viewed at full resolution. Additional scratch extraction is not claimed as inspection. Review is sampled visual inspection plus complete computational decoding, not continuous audiovisual playback.

## Comparison

| Criterion | Candidate | Baseline |
| --- | --- | --- |
| Causal clarity | Side-by-side session and handoff expose the missing requirement and then its preservation; explicit received/opened states distinguish delivery from source retrieval. | Correct principle, but handoff content is abstract and retrieval is primarily explained by captions. |
| Accuracy | Four named facts survive; three incidental history lines are left out. Source is opened only after session 2 receives the record. Open timeout question persists. | Correctly identifies concise representation, references, and important constraints. |
| Pace | 47.6s supports incremental field inclusion, delivery, source opening, and omission audit with readable holds. | 28s; concise four caption-led stages, less inspectable detail. |
| Native350 legibility | Despite two columns, short main labels and paths remain readable. Subtitle and count metadata are smaller; no confirmed stable-state clipping. | Larger captions are easier to scan, but more meaning relies on prose. |
| Meaningful variety | History rows, draft fields, a receiving-session status panel, source expansion, and selective dimming each teach a distinct operation. | Repeated three-box flow and traveling tokens teach the general sequence. |

Candidate is stronger for this lesson's concrete decision. Baseline remains a coherent simple alternative. Recommendation does not promote or publish the candidate.

## Timestamped observations

- Opening samples show session 1 with seven lines: goal, search, README read, keep total_cents, contract reference, abandoned query, and open timeout question. The vague draft says optimize invoice, with empty keep/ref/open fields. The source requirement is highlighted against the empty keep field, making the omission visible without depicting an actual failed resumed task.
- **15s:** handoff now preserves goal and total_cents, but source/open fields are not yet complete. **21s:** it contains four fields: goal fix latency, keep total_cents, ref api/v1.md, open timeout?. Session 2 still waits, repository remains not opened.
- **24s:** handoff is sent and session 2 receives it. **26s:** receiver explicitly has 4 fields while repository remains not opened. This is an important causal distinction: receiving a reference does not itself load the source.
- **29s:** session 2 opens api/v1.md and the repository is opened, displaying v1 response and keep total_cents, with revision a17. The requirement remains in the handoff; the open timeout question is not turned into a diagnosis or success.
- Later samples and **38s** show three session-history lines dimmed and labelled 3 left out: search invoice, read README.md, query abandoned. Goal, constraint, source reference and open question remain readable. This is an omission audit, not deletion of original storage. **43s** retains the complete final comparison; the last sampled frame ends with the title alone.
- Baseline samples show goal/constraint token delivery, contract referenced, then receipt and the final instruction to shorten incidental history. **14s** begins the next-session phase; **21s** introduces selective shortening. It states the right lesson but does not show the concrete retained fields or source opening.

## Accuracy limits

This is an illustrative handoff, not a real captured session or measured summarization outcome. Four fields are enough to demonstrate this narrow lesson, not a universally complete handoff schema. Real tasks may need patch state, commands, observations, next actions, and other relevant details. The example does not establish that every important fact survived.

The goal becomes terse (fix latency) and open timeout? is shorthand. Invoice context remains in the visible source and earlier draft; a more self-contained real record would keep the full goal and clarify the question. These are optional specificity improvements, not failures of the demonstrated preservation mechanism.

The handoff preserves api/v1.md but not revision a17; that revision is shown only in the repository panel. The scene still satisfies the lesson's reference requirement, but carrying revision identity would strengthen reproducibility. The path and revision are illustrative, not independently verified project artifacts. Reopening the source is not verification of a patch or proof of contract authority/freshness. No tests, successful fix, or automatic memory guarantee is asserted.

## Suspected visual faults and alternate extraction

Some initial PNG displays appeared to omit portions of labels. Independent JPEG extraction at 15/26/29s retains the substantive field and receipt states. At 38s the original-resolution independently decoded PNG shows the complete title, four handoff fields, received state, omission count, and reopened source; a native350 JPEG view inconsistently omitted fragments. The independent 43s native350 view retains the stable final content. These display inconsistencies do not substantiate an encoded missing-text defect. No reproducible stable-state overlap or clipping was found.

## Technical and audio checks

Both full-file decodes exited 0 without errors. Candidate: H.264, 1080×1920, 30fps, 1428 frames, 47.600s. Baseline: H.264, 1080×1920, 20fps, 560 frames, 28.000s. Both contain audio and place moov before mdat; probes and atom positions are retained in scratch evidence.

Analyzed mean/max levels: candidate −36.2/−6.5dB; baseline −42.9/−10.5dB. No measured peak approaches clipping. **Audio was not heard.** Levels do not verify actor-specific timbres, perceptual timing, or listening comfort. Scratch includes audio logs, probes, individual frames, decode outcomes, and hash records.

## Optional refinements

1. Carry a17 in the handoff reference itself, not only in the repository panel.
2. Make the lesson subtitle more prominent and clarify the short open-question label where space permits.

These refinements alone do not warrant fix_needed.

## Hash binding

Before/after hashes match for both inputs. This decision applies to this candidate encode only. Any repair or new encode requires renewed actual encoded inspection and a new hash-bound decision, not just a replacement hash.

- Candidate before: `f39d12ebdf5481da4ac19aeedce6217ec672b1b7673ace5b60072ca1d629f9bd`
- Candidate after: `f39d12ebdf5481da4ac19aeedce6217ec672b1b7673ace5b60072ca1d629f9bd`
- Baseline before: `2ef56a1d5912ad0f5c5491bff2e096a2c1cdd0d1991baed9385da19ed25d6fcf`
- Baseline after: `2ef56a1d5912ad0f5c5491bff2e096a2c1cdd0d1991baed9385da19ed25d6fcf`
