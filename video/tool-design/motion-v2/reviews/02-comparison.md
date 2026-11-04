# Lesson 02 encoded comparison

**Decision: pass. Prefer the local candidate.** Its schema/value comparison, missing-field feedback, separate corrected call and execution counter make the validation-before-execution mechanism concrete. No reproducible objective blocker was found. Optional refinements do not block this encode.

## Scope and inspection method

Compared `video/tool-design/motion-v2/02/video.mp4` with `public/lessons/tool-design/02.mp4` against item 2 of `video/tool-design/sequence/lessons.json`, “Make inputs explicit.” The intended sequence is explicit service/time/limit fields, missing end time, rejection before execution with actionable feedback, then validation of the corrected call. Shape validation does not establish authorization or query usefulness.

Earlier planning context was acknowledged. No author source, self-review, other plan, production state, or provenance was consulted. This judges the encode rather than adherence to a prior plan. No media or other lesson was changed.

Inspected individual native350 frames (350×622), not contact sheets: candidate samples 001–009; baseline 001/003/004/006, extracted at fps=1/5. Sample indices are not exact timestamps. Independent frame-index extraction, Pillow/Lanczos resizing and JPEG display were inspected at candidate 19,23,28,31,34,36,40s and baseline 14,21,26s. Candidate 40s was also viewed at full resolution. This is sampled visual inspection plus complete computational decode, not continuous audiovisual playback.

## Comparative findings

| Criterion | Candidate | Baseline |
| --- | --- | --- |
| Causal clarity | Aligns required schema fields with Call A values, exposes the absent end time, preserves zero executions, then checks Call B before the first run. | Correct narrative but generic validation box conceals most input structure and checking. |
| Accuracy | Explicit required legend; rejection precedes execution; corrected request is checked again. No result or no-incidents conclusion is fabricated. | Correctly rejects missing end_time and later starts the corrected search. |
| Pacing | 44s provides readable field checks, feedback, correction, revalidation and final execution state. | 28s, simpler caption-led stages; less concrete inspection time. |
| Native350 legibility | Main names, values, error, Call A/B, checks and run count read clearly. Narrow columns work because values are short. | Larger captions read comfortably, but carry most explanation. |
| Meaningful variety | Schema/value alignment and per-field checks sit within an application boundary; execution count supplies separate causal evidence. | Repeated model/validation/search boxes and tokens supply a general flow. |

Candidate is the stronger instructional cut. Baseline remains coherent. Recommendation is not publication or promotion.

## Timestamped evidence

- Initial samples enumerate service, start_time, end_time and limit with an explicit * required legend. search_incidents remains runs: 0 · not run.
- Call A supplies payments, 09:00Z and 20; the end-time position is dashed and empty. Per-field checks mark the omission with red × while other fields have checks. These local checks do not turn the whole call valid.
- **19s:** Application is rejected, Call A remains visible, and runs: 0 · not run is emphasized. **23s:** model receives missing: end_time. Feedback names the correction target, rather than silently defaulting or treating the omission as an empty result.
- **28s:** Call B is explicitly a new call and its values are assembling; model instruction says add end_time. **31s:** Call B contains 10:00Z and Application is checking again. **34s:** all fields have checks while overall state is still checking and execution count remains zero.
- **36s:** Application is valid and Call B travels toward the tool; runs remain zero at this in-transit frame. **40s:** search_incidents is runs: 1 · running. Final sampled state holds that outcome. No successful search result is asserted.
- Baseline **14s** shows end_time missing and rejection text. **21s** introduces the corrected end time while validation has not yet changed. **26s** shows required fields valid and search running. Its causal ordering is correct, but the candidate makes all four inputs and zero-before/one-after executions inspectable.

## Accuracy limits

The schema display is a teaching abstraction, not literal JSON Schema or complete implementation. Required stars show deliberate requiredness; they do not establish that property declarations alone enforce it. The clip focuses on an omitted field, not exhaustive validation of types, ranges, time ordering, or extra keys.

09:00Z and 10:00Z are abbreviated illustrative times, not demonstrated complete production timestamps. A date qualifier would reduce ambiguity; the missing-end-time lesson remains correct. The dashed empty value represents omission, not a successful empty-string value.

The successful path assumes any independent authorization requirements are satisfied. No permission check or authorization guarantee is shown. The unqualified valid label sits in the schema-checking Application panel and can usefully be narrowed to inputs valid; it does not explicitly claim authorization or result quality. No root-cause, incident coverage, or production query usefulness claim appears.

Call B corrects an input before backend execution; this is not a retry after a timeout. Zero runs means no execution, not no incidents. All identifiers and values are illustrative.

## Alternate extraction and visual faults

Some PNG displays appeared to omit title fragments. Independent JPEG views at 19/23/31/34/36/40s retain the core labels, rejection/correction states and run counts. Candidate 40s full-resolution extraction also shows the complete title, schema, values and running state without clipping. Call B's partially populated 28s frame is a transition; later stable views contain all values. No reproducible stable-state missing text, overlap, or clipping was found. Display omissions are not blockers.

## Technical and audio checks

Both whole-file decodes exited 0 with no errors. Candidate: H.264, 1080×1920, 30fps, 1320 frames, 44.000s. Baseline: H.264, 1080×1920, 20fps, 560 frames, 28.000s. Both contain audio streams and moov precedes mdat. Scratch retains probes, audio logs, individual frames, decode outcomes and atom positions.

Analyzed mean/max audio level: candidate −32.3/−6.9dB; baseline −40.3/−10.1dB. Neither measured peak approaches clipping. **Audio was not heard.** These checks do not establish actor-specific sound, perceptual synchronization, or listening comfort.

## Optional improvements

1. Label the application result inputs valid to reinforce the narrow validation scope.
2. Give the abbreviated UTC times a date/same-date qualifier or fuller date representation.

These refinements alone do not warrant fix_needed.

## Integrity and decision binding

Before/after hashes match for both inputs. This decision applies only to the candidate encode below. Any repair/new encode requires renewed actual encoded review and a new hash-bound decision, not merely a replacement hash.

- Candidate before: `5ba429bfe74a0904f72cf45a919641bfb8ac311ddf607d3561ff70715f7efa49`
- Candidate after: `5ba429bfe74a0904f72cf45a919641bfb8ac311ddf607d3561ff70715f7efa49`
- Baseline before: `80dff624265531a784c1add61984a14bec2b4f900de2cafa987f94e4439839bb`
- Baseline after: `80dff624265531a784c1add61984a14bec2b4f900de2cafa987f94e4439839bb`
