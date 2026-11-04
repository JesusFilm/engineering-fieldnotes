# Lesson 05 encoded comparison

**Decision: pass. Prefer the local candidate.** It demonstrates completed-attempt accounting, an explicit refused fourth request, and a concrete evidence handoff. No reproducible objective blocker was found. Optional refinements below do not require repair for this decision. No media or public files were changed.

## Grounding and inspection boundaries

Compared `video/loop-engineering/motion-v2/05/video.mp4` with `public/lessons/loop-engineering/05.mp4` against item 5 of `video/loop-engineering/sequence/lessons.json`, “Limit repair attempts.” Required mechanism: configured budget, completed attempt consumes allowance, controller blocks the next cycle, remaining failure/evidence goes to a human. Enforcement belongs outside the agent.

Earlier planning context was acknowledged. No author source or self-review was read; the encoded result, not correspondence with a prior plan, determines this review. No other plan, production state, or provenance was consulted.

Visual inspection used actual individual 350×622 frames, plus a full-resolution frame; no contact sheet substituted for phone-size review. Sampled visual inspection is not continuous playback. Both complete files were computationally decoded. Audio was analyzed, **not heard**; actor-specific sound quality and perceptual synchronization are therefore not claimed verified.

## Comparative findings

| Criterion | Candidate | Public baseline |
| --- | --- | --- |
| Causal clarity | Shows 0 used/3 left, successive patch results, consumed numbered allowances, then an actual fourth request refused. | Clearly names controller responsibility, but starts with one attempt left and abstracts the repair into a failed-attempt token. |
| Accuracy | Limit explicitly starts as an example; three failed completed attempts consume it. Improving numeric results do not override exhaustion. Fourth attempt is explicitly not run. | Correctly reduces remaining allowance to zero and denies continuation. |
| Pace | 44s gives each repeated attempt its own state progression, then holds refusal and the handoff. Repetition is meaningful accounting, not filler. | 28s with four broad caption-led phases; faster and simpler but less demonstrative. |
| Phone legibility | Main states and numbers read at 350px. History and record text are smaller but readable with sustained holds; no confirmed clipping. | Larger sentence captions and sparse actor boxes are easier to scan, at the cost of relying more on prose. |
| Meaningful variety | Request strip, controller allowance cells, persistent result history, and evidence record perform different teaching jobs. Stateful changes matter more than the dotted connectors. | Three stacked actor boxes persist; captions and traveling tokens do most of the explanatory work. |

Candidate is stronger overall for a beginner learning why an agent cannot simply keep trying. Baseline remains a coherent simpler explanation. This comparison does not authorize promotion or site changes.

## Timestamped evidence

- Opening sampled frame: controller has `limit 3 · example`, `0 used · 3 left`, three available numbered cells. The result panel states the target `want 90.00`.
- **5s:** request attempt 1 is allowed; patch A is editing; the budget is still 0 used/3 left. **7s:** result is 119.75 with a failure mark. **9s:** controller records 1 used/2 left and crosses out allowance 1. The update follows the result, rather than treating a request as completion.
- Middle sampled frames show patch B editing and then its failed result 95.00. Before the third request is admitted, the controller has 2 used/1 left; A and B remain visible.
- **23s:** patch C is testing while 2 used/1 left remains. **25s:** C returns 92.50, still short of the stated 90.00 target; feedback is traveling back toward the controller. Subsequent sampled frames show 3 used/0 left with all three allowance cells consumed.
- **29s:** the agent requests attempt 4 despite the reached limit. **31s and 33s:** it is refused; a dashed `4 not run` row establishes that no fourth edit/test cycle executed. The counter remains 3/0. This separates an agent request from controller permission.
- **38s:** engineer record contains tried patches A/B/C, `pytest -k discount`, `still fails: got 92.50`, and `stopped: attempt limit`. The target 90.00 remains visible in the history above. The later sample retains this record; **43.9s** is a finite title ending. No automatic reset, new budget, pass, or repaired outcome is asserted.
- Baseline **7s:** failed-attempt phase begins with one attempt left. **10s:** zero remain. **14s:** `continuation denied`. **21–23.5s:** the final caption hands remaining failure/evidence to a human and permits a new approach. Its responsibility chain is correct, but the handoff content is not shown concretely.

## Accuracy limits

The values are illustrative, not a benchmark or a real captured repair. Closer numerical outputs do not establish correctness or general convergence. The observed stop is budget exhaustion, not a no-progress classifier; the same failure count would not prove identical failures. Three is an example, not a universal recommendation. The clip illustrates serial completed attempts and does not demonstrate timeouts, parallel reservation, or protection from hanging work.

The handoff summarizes attempted patch identifiers rather than explaining the changes inside each patch. For this narrow mechanism, the visible command, remaining mismatch, attempt history, and stop reason satisfy the lesson; a self-contained production handoff would benefit from test identity and retained full patch/output records. No claim is made that these abbreviated on-screen labels alone reproduce a real investigation.

## Reproduction and display false positives

One seek-extracted PNG display at 33s appeared to omit parts of the title and labels. Independently decoded frame 990, resized using Pillow/Lanczos and displayed as JPEG (`candidate/alternate-33.jpg`), shows the complete title, request, controller labels, and history. The alleged missing-text fault was not reproducible and is not a blocker. Independent candidate 38s extraction, native350 JPEG, and original-resolution PNG also show the full handoff without clipping. Baseline 14s was independently extracted and displayed as JPEG as a control.

Inspected initial fps-filter samples (one every three seconds): candidate 1,3,5,7,9,10,11,12,13,14; baseline 1,3,5,7,9. Sample indices are not exact timestamps. Additional exact-time frames inspected: candidate 5,7,9,23,25,29,31,33,38,43.9s; baseline 7,10,14,21,23.5s. Scratch contains further extracted evidence; extraction alone is not claimed as visual inspection.

## Technical checks

Both full-file decodes exited 0 without errors. Candidate is 44.000s; baseline 28.000s. Both have AAC audio. Analyzed mean/max levels: candidate −31.4/−3.5dB; baseline −44.2/−13.9dB. These measured peaks are below clipping, but do not establish sound design quality or audibility. The inspection metadata records stream details and MP4 atom positions.

- Candidate: {'width': 1080, 'height': 1920, 'codec_name': 'h264', 'r_frame_rate': '30/1', 'nb_frames': '1320'}; moov before mdat: True.
- Baseline: {'width': 1080, 'height': 1920, 'codec_name': 'h264', 'r_frame_rate': '20/1', 'nb_frames': '560'}; moov before mdat: True.

## Optional refinements

1. Enlarge the small attempt-history and handoff text slightly at 350px; retain the deliberate final reading hold.
2. Include the failing test name and expected value in the engineer record so it remains useful when separated from the persistent attempt panel.

## Hash binding

Before/after hashes match for both inputs. This decision applies only to the candidate hash below. Any repair or new encode requires renewed actual encoded inspection, not merely replacing this hash.

- Candidate before: `03395088e3d0ab08077696daad4a644b7c1a4a727e5517fbeec5106337b6f544`
- Candidate after: `03395088e3d0ab08077696daad4a644b7c1a4a727e5517fbeec5106337b6f544`
- Baseline before: `98e879d99bfe966ee97c65c0562052386edd7fc59748087c87b979d3685abda2`
- Baseline after: `98e879d99bfe966ee97c65c0562052386edd7fc59748087c87b979d3685abda2`
