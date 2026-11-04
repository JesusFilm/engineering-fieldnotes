# Lesson 02 — Retrieve relevant evidence

## Scope and evidence

One mechanism: select evidence that constrains an invoice-latency change, inspect its applicability and authority, and supply the useful excerpts with their source references. Search matches are candidates, not automatically trustworthy input.

Grounding: item 2 of `video/context-engineering/sequence/lessons.json`; overview, example, judgment, and walkthrough steps 1–2 of `content/concepts/context-engineering.json`. The required sequence is task → endpoint and v1 contract → source-labelled input → selective evidence, not every nearby document.

[Primary context-engineering account](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents), checked in this conversation on 2026-10-20, describes retrieving relevant content through references and tools. The specific search UI, record excerpts, and relevance decisions below are illustrative. The source supports selective context construction; it does not validate these invented records or guarantee that two excerpts suffice for a real repair.

Task: `Fix invoice latency`. Endpoint evidence identifies the relevant route and existing response field; the approved v1 contract establishes that `total_cents` must remain. A nearby draft v2 note is not applicable to this v1 change. It is not false or worthless—just not selected for this decision.

Exclude handoff, compaction, memory, test-result replay, compatibility test execution, code edits, performance diagnosis, caching, embedding/ranking algorithms, and cost/token claims. Stop at prepared model input. Do not claim the latency is fixed or that retrieval guarantees a correct decision.

## Visual grammar

A full-width search-results list expands into a source inspector and then resolves into two source-labelled input records. A persistent task strip tells the viewer what relevance means. The selected-result checkboxes remain separate from the source's approval/version metadata. No generic three-box flow, physical sorting metaphor, context-capacity bar, or animated brain.

Canvas 1080×1920, 30fps, approximate duration 48 seconds. Background #050506; white #E6E8EC; secondary labels #A8ADB5; selection amber #F5A524; neutral source borders #65707A. Teal #3FB68B is reserved for inclusion, never a verdict that the evidence or eventual repair is correct. Use words and symbols with color. Main labels 50–56px; all necessary metadata at least 46px, approximately 15px at native350. Title 84px.

### Geometry

All rectangles are x/y/w/h, all positions in source pixels. The same central surface changes modes; do not animate tiny side-by-side panes.

| Element | Coordinates | Text and function |
| --- | --- | --- |
| Title | 90/245/900/125 | `Retrieve evidence`, 84px bold |
| Persistent task strip | 90/420/900/160 | `Task`, baseline (125,475), 46px; `Fix invoice latency`, baseline (125,545), 54px |
| Search header | 90/625/900/100 | `Search: invoice`, baseline (125,690), 50px |
| Result rows | 90/765/900/190, 90/980/900/190, 90/1195/900/190 | Check square at x=125, y=row+45, 48×48. File text x=210, baseline row+75, 50px; metadata x=210, baseline row+140, 46px. Rows: `src/invoice.py` / `route: v1`; `api/v1.md` / `approved · v1`; `notes/v2.md` / `draft · v2`. |
| Selection status | baseline (125,1490) | `0 selected`, then 1 and 2, 52px |
| Action/status strip | 90/1570/900/130 | `Inspect source`, then `Supply 2 excerpts`, 50px |
| Expanded source inspector | 90/625/900/850 | Temporarily replaces search header and rows. File path at (125,700), 50px; locator at (125,775), 46px; metadata at (125,850), 46px. Two short evidence lines at (125,1010) and (125,1100), 54px. Bottom decision label at (125,1360), 50px. |
| Input heading | baseline (125,690) | `Model input · evidence`, 50px, final mode |
| Final input record 1 | 90/750/900/365 | `src/invoice.py`, baseline y=815; `rev a17 · L12–18`, y=880; `GET /v1/invoice`, y=975; `returns total_cents`, y=1050. Source 48px; locator 46px; evidence 50px. |
| Final input record 2 | 90/1150/900/365 | `api/v1.md`, y=1215; `rev a17 · L8–10`, y=1280; `approved · v1`, y=1365; `Keep total_cents`, y=1450. Same sizes. |
| Final inclusion footer | baseline (125,1635) | `2 excerpts · sources kept`, 48px |

All paths, revision identifiers, line spans, approval metadata, and excerpts are fictional teaching records. Use the same identifiers in the inspected and supplied versions. `rev a17` denotes one illustrative repository snapshot; it is not a verified commit in this project. The route and response-field lines are semantic excerpts, not runnable Python.

No standing wires. Each inspected source has a stable amber left-edge marker that persists when its excerpt becomes an input record. A brief focus outline can travel within the central surface, but no text should fly through another label. Selected records are copied into input; source availability is not deleted.

## Five timed beats

| Time | Movement and reading holds | State / causal meaning | Sound |
| --- | --- | --- | --- |
| **0–8s: task-guided candidates** | Title and task settle by 1.0. At 2.0 search field resolves to `invoice`. Rows appear individually at 3.0, 3.8, 4.6. Hold 5.0–8.0. No checks yet. | Three nearby matches; zero selected. Matching the query does not establish relevance or authority. Version/approval metadata is visible without treating it as proof. | Application `store` C4 at 1.0; search tool `send` G5 at 2.0; result `arrive` G4 at 3.0/3.8/4.6, restrained gain. |
| **8–18s: inspect the endpoint** | At 8.2 row 1 gains focus. 9.0–9.7 it expands into the full-width inspector. Display `src/invoice.py`, `rev a17 · L12–18`, `route: v1`; reveal `GET /v1/invoice` at 10.3 and `returns total_cents` at 11.3. Hold 11.8–14.5. At 14.5 bottom label becomes `Relevant route`; at 15.3 selection square checks. Collapse 16.0–16.7; hold 17–18. | Selection occurs after content inspection. Return to results with row 1 selected and `1 selected`. This record identifies the code under consideration, not the latency root cause or authoritative compatibility rule. | Application `send` C5 at 8.2; file read `arrive` G4 at 9.7; application `ack` C5 at 15.3; quiet `store` C4 at 16.7. |
| **18–29s: inspect the contract** | Focus row 2 at 18.2, expand 19.0–19.7. Show `api/v1.md`, `rev a17 · L8–10`, `approved · v1`. Evidence lines `v1 response` at 20.2, `Keep total_cents` at 21.2. At 22.5 a bracket briefly connects `v1` metadata to `v1 response` inside this panel. Hold 23–25.5. At 25.5 decision becomes `Applies to v1`; select at 26.3; collapse 27.0–27.7. Hold to 29. | The inspected record's status establishes its authority within this fictional fixture; its version establishes applicability. The requirement constrains the proposed change. Return to results with two selections. No test or correctness check is performed. | Application `send` C5 at 18.2; source `arrive` E4 at 19.7; inspector `ack` C5 at 22.5; application `store` C4 at 26.3. |
| **29–36s: nearby is not enough** | At 29.4 focus the still-unselected `notes/v2.md` row. Underline `draft · v2` at 30.2; action strip briefly reads `Different version`. Hold 30.8–33.2. Return focus to the selected rows at 33.5; action becomes `Supply 2 excerpts` at 34.5. Hold to 36. | Draft v2 remains present, unchecked. No red error, deletion, shredding, or claim that all drafts are useless. Its visible scope differs from this v1 task; exclusion applies to this selection only. The two useful records retain their checks. | Search/source `ack` G4 at 29.4; application low `ack` C4 at 30.2; application `send` C5 at 34.5. No crash or failure cue. |
| **36–48s: supply content with origins** | 36–37 input mode replaces the result list. First source label and locator resolve at 37.2; its two evidence lines appear together at 38.0. Second source and locator at 38.8; metadata and requirement at 39.6. At 40.5 inclusion footer settles. Hold 41–46.8; fade lower stage 46.8–48, title remains. | Model input contains actual evidence plus origin for each record, not only filenames. The task stays above both records. Selection count is two, not an optimal universal amount. No model answer, patch, or promised result appears. | Input assembly `store` C4 at 37.2/38.8; inclusion `arrive` E5 at 40.5. Quiet final hold and fade. |

## State and sound requirements

Application selection/assembly uses C4–C5; search/endpoint reads use G4–G5; contract read E4; final input inclusion E5. These roles are consistent even when geometry changes. Pan by the focused panel; the centred design mostly uses centred cues. Sends are softer than arrivals. No continuous ticking, narration, typing bed, or success fanfare. Important state changes have cues; reading holds are silent. Mute viewing must preserve the teaching.

Selection state must survive expanding/collapsing: 0 → endpoint selected → endpoint plus contract selected → same two supplied. Metadata is not converted into an unchecked assertion: it remains visible beside the contract. Do not show a check meaning verified truth; checks solely mean selected/included. Do not briefly deselect the first record while inspecting the second.

## Accuracy limits

- The search result list is a representative slice, not the entire repository or a measured ranking. Retrieval may use many mechanisms; this cut does not prescribe one.
- Authority is not established by a high search rank, a familiar filename, or the animation's green check. In this fixture, the record is explicitly designated approved and its contents are inspected. Real workflows must establish who owns that authority and whether the record is current.
- Applicability is checked against v1, the displayed route, and the relevant field. Similar words alone do not suffice. Draft v2 metadata is enough to illustrate exclusion here, not a universal reason never to read draft material.
- Code identifies current behavior; the contract states what must remain. Code alone is not the authority for intended behavior. Neither excerpt proves the performance cause or suffices to implement a correct fix.
- Paths, line spans, and revision tags aid traceability; they do not magically validate content. Both actual excerpt and its reference must be supplied.
- Two excerpts is a teaching choice. More evidence may be required. No token savings, latency gain, benchmark, or guaranteed model behavior is claimed.
- Retrieval and inclusion are not compaction or trimming. The third record was never selected for input; it is not erased from an already-running context.
- Approval metadata and example files are invented for this demonstration; do not present them as observed repository artifacts.

## Native350 acceptance and later production review

This is a plan, not a render or completed validation.

1. Inspect individual encoded frames at 6, 12, 15.5, 17.5, 23.5, 26.5, 28.5, 31.5, 35, 38.2, 40.8, and 44s at native350 and key full-resolution frames. Inspect ±0.25s around selection, collapse, and final record insertion. No contact sheet substitutes for individual-frame inspection.
2. Main text, version/status metadata, and source references must read without zoom at 350×622. Maintain 46px source minimum for necessary labels. Measure text; wrap or shorten labels rather than shrinking type. Keep 24px padding and ensure highlights never intersect glyphs.
3. At each hold, a viewer can identify what question the task poses, which record is being inspected, why it applies, whether it is selected, and where it came from. The final frame distinguishes code behavior from contract requirement.
4. Confirm only two records are selected, both survive in input, and both carry the same source path/revision/line span used during inspection. The requirement must be literal `Keep total_cents`; no path-only stand-in.
5. Confirm the nearby draft remains a neutral available result until the input view replaces the list. No implication of deletion, universally bad evidence, or a hard two-document context limit.
6. Hold the complete input for at least 5 seconds. Preserve granular reading time for authority and version; extend runtime if needed instead of compressing the lesson to a target.
7. On mute, a beginner should explain why the endpoint and v1 contract were selected and the v2 note was not. They should not infer that the latency is fixed or that evidence inclusion guarantees compliance.
8. Decode the eventual entire MP4; inspect beat boundaries and busiest frames; check audio peaks below −0.5dB, audio-stream presence, and moov-before-mdat metadata. State whether audio was heard or only analyzed. Verify suspected visual defects through alternate extraction before reporting them.
9. Final comparative review must bind to actual encoded hashes before/after. Repaired encodes need renewed inspection. Keep optional refinements distinct from reproducible objective blockers.

## Write and production scope

Only this plan is written in this task. No author-source/other-plan inspection, rendering, other lesson, or production-state/provenance access. Later implementation uses repository-pinned Puppeteer dependencies and local engine copies; any drawing extensions remain local to the cut. Keep candidates local; no public/site/shared-skill edits, Git commits, or deployment.
