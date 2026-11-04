# Lesson 01 encoded comparison

**Decision: pass. Prefer the local candidate.** Its sequence diagram clearly distinguishes requesting from executing and returns a concrete incident ID through the application before the model cites it. No reproducible objective blocker was found. Optional refinements do not block this encode.

## Scope and method

Compared `video/tool-design/motion-v2/01/video.mp4` with `public/lessons/tool-design/01.mp4` against item 1 of `video/tool-design/sequence/lessons.json`, “A callable operation.” Required sequence: documented search operation, model request, application execution, returned result used as evidence. The takeaway assigns execution, authorization and error handling to application code.

Earlier planning context was acknowledged. No author source, self-review, other plan, production state, or provenance was consulted. This judges actual encoded behavior, not fidelity to an earlier plan. No media or other lesson was edited.

Viewed actual individual native350 frames (350×622): candidate samples 001–007 and baseline 001–006, extracted with fps=1/5. Indices are not exact timestamps. Independent frame-index extraction, Pillow/Lanczos resize, and JPEG display were inspected at candidate 10,14,16,20,23,25,28,34,36.9s and baseline 14,21s. Candidate 28s was also inspected at full resolution. This is sampled visual inspection plus complete computational decoding, not continuous audiovisual playback.

## Comparison

| Criterion | Candidate | Baseline |
| --- | --- | --- |
| Causal clarity | Named operation and service argument travel model → application; application alone performs backend read while model waits. Result returns through application before answer. | Correctly narrates model/application distinction, but a generic search-call token and progress bar carry less concrete detail. |
| Accuracy | Incident ID and short summary become cited evidence; no root-cause or exhaustive-coverage claim. No direct model-to-database execution. | Correct successful-call flow, with ownership chiefly conveyed in captions. |
| Pacing | 37s separates definition, request, application work, return, and evidence-based answer with clear holds. | 28s in four caption-led phases; concise but more abstract. |
| Native350 legibility | Operation, service value, actor names, read/result arrows, ID, summary, and answer read at native350. Secondary definition text could have more contrast. | Larger captions are comfortable, but explanatory text does more work. |
| Meaningful variety | Sequence-diagram lifelines and activation bars encode time and ownership; distinct definition and answer panels explain selection and evidence. | Repeated stacked model/application/search boxes with traveling labels. |

The candidate is not a generic repeated three-box compiler despite having three participants: distinct lifelines, active/waiting states, backend read and two return legs have causal meaning. It is the stronger teaching cut. Recommendation does not promote or publish the candidate.

## Timestamped evidence

- Opening sampled state places payments incidents? at the model. Tool definition later exposes search_incidents(service), Find incident records, and Returns IDs + summaries. **10s:** purpose and operation are available before the request.
- **14s:** request arrow reaches Application with search_incidents and service: payments; Model is explicitly waiting. **16s:** application activation becomes running. This makes the separation between a structured request and execution visible.
- **20s:** application reads Incidents; a backend response begins. **23s:** INC-42 returns from Incidents to Application. There is no direct backend-to-model shortcut.
- **25s:** result: INC-42 and Elevated error rate return from Application to Model. Model receipt is marked after backend work; it is not an invented answer preceding retrieval.
- **28s:** Model answer reads Reported payment errors with evidence: INC-42. **34s:** complete flow and citation hold. **36.9s:** finite title ending. Nothing closes an incident or claims a root cause.
- Baseline **14s** introduces application execution with a progress indicator. **21s** introduces result return; sampled later state reinforces evidence use. The text is accurate but lacks an actual operation signature, argument, returned record identity, and cited observation.

## Accuracy limits

The interface and INC-42 are illustrative, not a live incident lookup. service is a representative argument, not the full proposed bounded incident-search contract. The cut does not claim that one result is exhaustive or that a summary proves cause, severity, or resolution. Reported payment errors appropriately reflects returned evidence.

Application represents the executing software, including possible tool-server/backend components. Sequence timing is illustrative, not measured latency. Tool documentation guides selection but does not itself grant authority or execute anything. Authorization and error handling are not visibly exercised in this successful path; they remain application responsibilities. A concise ownership label would reinforce the full takeaway, but no contrary responsibility is depicted and the prescribed four beats are satisfied.

## Alternate extraction and visual fault checks

Initial PNG displays occasionally appeared to omit portions of labels. Independent JPEG frames at 14/16/23/25s preserve the call, waiting/running states, and result route. At 28s the native350 JPEG and original-resolution independently decoded PNG show the complete operation, argument, return summary and answer citation without clipping. The missing-label appearances are inconsistent across views and do not substantiate an encoded fault. No reproducible objective visual blocker was found in inspected states.

## Technical verification and audio limits

Both entire-file decodes exited 0 without errors. Candidate: H.264, 1080×1920, 30fps, 1110 frames, 37.000s. Baseline: H.264, 1080×1920, 20fps, 560 frames, 28.000s. Both contain audio and place moov before mdat. Probes, atom positions, frame evidence and decode outcomes are retained under scratch/01.

Analyzed mean/max audio level: candidate −32.0/−5.2dB; baseline −41.4/−13.4dB. Neither measured peak approaches clipping. **Audio was not heard.** Stream presence and levels do not verify actor-specific timbres, perceptual synchronization, or listening comfort.

## Optional improvements

1. Consider a short application-side policy/error-handling label to reinforce ownership without adding a separate scenario.
2. Slightly increase secondary definition-text contrast at native350.

These are refinements, not blockers.

## Integrity and decision binding

Both files were hashed before extraction and after inspection; both remained unchanged. The decision applies only to this candidate encode. Any repair/new encode requires renewed actual encoded inspection and a new hash-bound decision, not merely a replacement hash.

- Candidate before: `6ed69a1e3360098e9405ff2b4ee50d6b8717c852c32e67d5c4377cec52ce250d`
- Candidate after: `6ed69a1e3360098e9405ff2b4ee50d6b8717c852c32e67d5c4377cec52ce250d`
- Baseline before: `3984b42d57ed6cf3fbe3d33b92d99b7c3c78415950979464bc37c75d2a3e0b44`
- Baseline after: `3984b42d57ed6cf3fbe3d33b92d99b7c3c78415950979464bc37c75d2a3e0b44`
