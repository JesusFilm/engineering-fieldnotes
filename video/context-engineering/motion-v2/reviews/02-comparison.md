# Lesson 02 encoded comparison

**Decision: pass. Prefer the local candidate.** It demonstrates why the endpoint and v1 contract are selected and why a nearby v2 draft is not. Actual content and source references survive inclusion. No reproducible objective blocker was found; optional refinements below are not blockers.

## Scope and method

Compared `video/context-engineering/motion-v2/02/video.mp4` with `public/lessons/context-engineering/02.mp4` against item 2 of `video/context-engineering/sequence/lessons.json`, “Retrieve relevant evidence.” Required teaching: invoice-latency task, relevant endpoint and contract, source-labelled model input, and selective evidence with authority/applicability checks.

Earlier planning context was acknowledged. No author source, self-review, other plan, production state, or provenance was read. The review assesses the encoded outcome rather than whether it follows a previous plan. No media or other lesson was changed.

Inspected individual 350×622 frames: candidate samples 001–012, baseline 001/003/005/007, extracted with fps=1/4. Sample numbers are not exact timestamps. Independent frame-index extractions, resized using Pillow/Lanczos and displayed as JPEG, were inspected at candidate 12,16,23,25,27,29,38,42,49.9s and baseline 7,14,21s. Candidate 38s was also inspected at original resolution. This is sampled visual review plus complete computational decoding, not continuous audiovisual playback.

## Comparison

| Criterion | Candidate | Public baseline |
| --- | --- | --- |
| Causal clarity | Opens source content before selecting; preserves selected records; contrasts the supplied v1 rule with an unselected v2 draft. | Correct narrative, but selection is summarized as code + contract, without showing why one document applies and another does not. |
| Accuracy | v1 route and approved v1 rule are matched; draft v2 remains unchecked. Paths, revision, and line ranges accompany actual excerpts. | Correctly requires source references and selective evidence; authority/applicability are less concrete visually. |
| Pace | 50s supports two inspected sources, two inclusion events, and a meaningful competing-source contrast. Holds make the detailed example readable. | 28s is concise and easier to scan, but captions carry most of the reasoning. |
| Legibility at 350px | Main paths, excerpts, counts, version/status labels, and selection marks read. Revision metadata and the subtitle are small secondary text. | Larger captions are comfortable; less concrete detail is available to inspect. |
| Meaningful variety | Expandable search rows, checked selections, source-labelled input, and paired conflicting-field highlights have distinct functions. | Three repeated boxes and traveling tokens explain a general flow. |

The candidate's extra time is justified by the source inspection and v1/v2 contrast. The baseline remains a coherent simpler alternative. Recommendation is not publication or promotion.

## Timestamped evidence

- Early sampled frames establish `fix invoice latency`, query `invoice`, and three unchecked candidates: `src/invoice.py` (route v1), `api/v1.md` (approved v1), and `notes/v2.md` (draft v2). Input initially has zero records.
- **12s:** endpoint content is open with `rev a17 · lines 12–13`, `GET /v1/invoice`, and `returns total_cents`. At this point it is not yet selected. Subsequent sampled state labels it relevant as the route to change; **16s** preserves its checkbox and count 1 after collapse.
- **23s:** contract content is open: `rev a17 · lines 8–9`, `v1 response:`, `keep total_cents`, and `relevant · approved v1 rule`. Approval/version metadata is highlighted. Both selections are now checked. This distinguishes current code behavior from the requirement that constrains changes.
- **25s:** both selected records remain in search, with zero input records before transfer. **27s:** endpoint inclusion is visible with its path, revision, line range, and actual content; input count is 1. **29s:** contract inclusion raises the count to 2 and preserves its own source reference and requirement. The numerical state follows inclusion rather than prematurely claiming all content arrived.
- **38s:** the unselected draft is opened. Its `v2 response: rename to amount` is highlighted against `keep total_cents` in the supplied v1 contract. This makes the danger of indiscriminately including nearby material concrete. The subsequent held sample labels it `draft for v2 · not this change`; **42s** is part of the collapse transition, not the only opportunity to read that explanation.
- Later sample returns to the selected results and two stable input records. **49.9s:** finite title ending. No patch, test pass, or latency improvement is asserted.
- Baseline **7s** names code + contract; **14s** starts the source-reference delivery phase; **21s** introduces the lesson that more material is not always useful. It states the right principle, but does not show the competing evidence or concrete references.

## Accuracy limits

The paths, revision a17, line ranges, approval state, and snippets are illustrative records, not verified files in this repository. A filename or search rank does not establish authority; this example supplies explicit approved/v1 metadata and inspects matching contents. Real workflows must validate that designation and currency. The displayed endpoint excerpt is semantic teaching content, not a claim that these lines are executable Python.

Selection checks mean selected, and green input count means included, not proven correct. Two records are a representative slice, not a universal optimum or enough evidence to diagnose latency. The candidate does not claim that the draft is false, that all drafts should be ignored, or that closer textual matches are necessarily more authoritative. It excludes this v2 draft from this v1 change. It does not demonstrate compaction, permission enforcement, guaranteed model obedience, or completed repair.

## Suspected display faults

Some initial PNG displays appeared to omit title/text fragments. Independent frame-index extraction with a separate Pillow resize and JPEG display at 38s shows the complete title, draft excerpt, and supplied record where the corresponding sampled PNG display appeared incomplete. The full-resolution 38s frame also preserves the content and source labels without clipping. Independent transition frames confirm the endpoint/contract text and selection states. These inconsistent display omissions do not substantiate an encoded missing-text fault and are not listed as blockers.

## Technical and audio checks

Both full-file decodes exited 0 without errors. Candidate: H.264, 1080×1920, 30fps, 1500 frames, 50.000s. Baseline: H.264, 1080×1920, 20fps, 560 frames, 28.000s. Both contain audio and place moov before mdat.

Analyzed mean/max audio level: candidate −34.3/−8.3dB; baseline −41.7/−10.5dB. Neither measured peak approaches clipping. **Audio was not heard.** Level analysis cannot establish actor-specific sound quality, perceptual synchronization, or listening comfort. Evidence is retained under `scratch/02/`, including probes, audio logs, extraction frames, and `inspection.json`.

## Optional improvements

1. Enlarge secondary source metadata and the tiny lesson subtitle while preserving readable excerpts.
2. Repeat approved/v1 status with the supplied contract record, strengthening its meaning when viewed separately from the search row.

These are refinements, not objective failures of the lesson.

## Hash binding

Before/after hashes match for both files. This decision applies only to this candidate encode. Any repair or new encode requires renewed actual encoded review bound to its new hash; replacing a hash alone is insufficient.

- Candidate before: `e64ab91f06e0415d9e521b283bdc657ba5a13b4148c3967e4516a60a7e7e257b`
- Candidate after: `e64ab91f06e0415d9e521b283bdc657ba5a13b4148c3967e4516a60a7e7e257b`
- Baseline before: `f6661ee3a9cbb96a80e2371cd124d64e9752c08d46498a7bc5126d928b9c396a`
- Baseline after: `f6661ee3a9cbb96a80e2371cd124d64e9752c08d46498a7bc5126d928b9c396a`
