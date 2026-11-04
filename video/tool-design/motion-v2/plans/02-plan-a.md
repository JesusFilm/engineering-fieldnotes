# Lesson 02 — Make inputs explicit

## Scope and grounding

One mechanism: application-side input validation rejects an incident-search request missing its required end time before backend execution, identifies the missing field, and allows a corrected request to continue only after revalidation.

Grounding: item 2 of `video/tool-design/sequence/lessons.json`; overview and walkthrough steps 1–2 of `content/concepts/tool-design.json`. Display service, start time, end time and result limit as explicit fields. Focus on one missing required field, not a catalogue of validation rules.

[Primary tools specification](https://modelcontextprotocol.io/specification/2025-11-25/server/tools), checked in this conversation on 2026-10-20, describes input schemas for named tools. The curriculum's cited [object-schema reference](https://json-schema.org/understanding-json-schema/reference/object) is the implementation reference for required fields; its detailed rules are not reverified by this plan. The planned validation contract must explicitly require all four displayed fields; a properties list alone does not make them required. The UI and error text are application examples, not mandatory protocol fields.

Exclude authorization checks, timeouts, retries after execution, empty/partial results, pagination, output-schema design, search results, and incident decisions. Validation success is not authorization or evidence that the chosen query is useful. End at the corrected request's execution start, with no result or incident conclusion.

## Visual grammar: a request editor with a validation annotation

Use a full-width argument form with four named rows. The missing end time is an absent value, not an empty-string value. Validation annotates that row; a small backend activity counter stays at zero. An actionable error appears immediately below the request. The correction fills only the missing field, the application validates again, and only then does backend activity change.

This is a software form and diagnostic view, not a physical gate, traffic light, three-box pipeline, or repeated compiler diagram. The request remains spatially stable so the viewer can inspect what changed.

Canvas 1080×1920, 30fps. Approximate 44-second duration; extend holds if reading needs it. Background #050506; white #E6E8EC; readable secondary #A8ADB5; amber #F5A524 for pending/work; red #E5484D for the missing-field annotation; teal #3FB68B only for input validation success. Title 84px. Main text 50–54px, essential metadata at least 46px (about 15px at native350).

### Coordinates and display content

Rectangles are x/y/w/h; all text uses at least 24px padding. Time values are shown in readable display notation; they represent UTC timestamps on the same date, not literal wire serialization.

| Element | Coordinates | Content |
| --- | --- | --- |
| Title | 90/245/900/115 | `Make inputs explicit` |
| Tool header | 90/415/900/115 | `search_incidents`, baseline (125,490), 54px mono |
| Request form | 90/565/900/735 | Header `Call A · arguments`, baseline (125,625), 48px; four rows below |
| Service row | 120/665/840/125 | `service *`, baseline y=710, 46px; `payments`, y=765, 52px |
| Start row | 120/805/840/125 | `start_time *`, y=850; `20 Oct · 09:00 UTC`, y=905 |
| End row | 120/945/840/125 | `end_time *`, y=990; initially dashed value area with `omitted`, y=1045; corrected `20 Oct · 10:00 UTC` |
| Limit row | 120/1085/840/125 | `limit *`, y=1130; `20`, y=1185 |
| Required legend | baseline (125,1260) | `* required`, 46px |
| Validation result | 90/1340/900/220 | `Application validation`, y=1400, 48px; state `Not checked` then `Missing: end_time`, y=1480, 50px |
| Execution strip | 90/1600/900/150 | `Search executions: 0`, y=1660, 50px; `Not started`, y=1720, 46px |

At rejection, the validation panel grows upward only if necessary for two short lines: `Missing: end_time` and `Add end_time`. It must not cover the required legend or limit row. Prefer using the existing 220px panel with baseline y=1465 and y=1530. Do not display a paragraph, stack trace, or full JSON schema.

The corrected request is explicitly labelled `Call B · corrected`. The valid form values are payments, 2026-10-20T09:00:00Z, 2026-10-20T10:00:00Z, and integer 20. The shortened date/time display is not a claim that arbitrary human date strings meet a schema. Time-range bounds and UTC are deliberate illustrative choices.

## Five timed beats

| Time | Motion and hold | State / causal meaning | Sound |
| --- | --- | --- | --- |
| **0–8s: explicit fields** | Title/tool settle by 1.0. Form appears 1.5–2.2; service/start/limit values resolve at 2.8/3.6/4.4, while end remains omitted. Required legend settles 5.0. Hold 5.5–8. | Four required inputs are inspectable; Call A lacks one. Backend execution count is zero and no search activity is shown. | Caller `store` E4 at 2.8/3.6/4.4; schema/application `ack` C4 at 5.0. |
| **8–16s: application finds the omission** | Validation panel changes to Checking at 8.5. A focus outline visits service at 9.0, start at 9.8, then end at 10.6. End outline turns red with a small × at 11.2; the empty value area remains dashed. Hold 12–16. | Application checks the provided request against required fields. The missing key is found before backend work. This is not a backend failure or an empty search result. | Application `work` C4 at 8.5; quiet `ack` C5 at 9/9.8; validation `thump` C3 at 11.2. |
| **16–24s: reject with useful feedback** | At 16.4 Call A status becomes Rejected. At 17.2 panel shows Missing: end_time, then Add end_time at 18.0. At 19.0 briefly outline Search executions: 0 and Not started. Hold 19.8–24. | No defaults are invented and no search runs. Feedback identifies a field the caller can correct. Rejection is an input-validation outcome, not a permission denial. | Application rejection `thump` C3 at 16.4, restrained; feedback `store` C4 at 18.0; backend-status quiet `ack` G3 at 19.0. No backend work cue. |
| **24–34s: corrected call is checked again** | At 24.5 header changes to Call B · corrected. End-time value fades in 25.0–25.7; other values stay fixed. Validation result resets to Not checked, not directly to valid. Hold 26.2–28.5. At 29 Checking begins again; outline visits all four rows at 29.3/30/30.7/31.4. At 32.0 result becomes Inputs valid. Hold 32.5–34. | The new request includes the end time and passes the illustrated checks. Correction is not automatically trusted; validation repeats. Backend executions remain zero throughout validation. | Caller `store` E4 at 25.7; application `work` C4 at 29; quiet application `ack` C5 at 32. No success fanfare. |
| **34–44s: only now start the search** | At 34.5 a short focus trace travels from validation panel bottom (540,1560) to execution strip top (540,1600), taking 0.5s. At 35.2 count changes to Search executions: 1 and status Running. Inputs valid remains scoped to the validation panel. Hold 36–42.8; fade lower stage 42.8–44. | The successful validation precedes the only backend execution. The example assumes separate authorization is satisfied; validation alone did not grant it. No search result, coverage claim, or incident answer appears. | Application `send` C5 at 34.5; backend `work` G3 at 35.2. Silent final hold/fade. |

## State and sound discipline

Caller E4; application/schema C4–C5; validation rejection C3; backend G3. Same role/pitch on both validation passes. Sparse store/work/ack/send/thump cues, softer sends than results. Pan by focused element, mostly centre. No typing bed, clock, music, or narration.

Counter is an observed execution count, not an attempt budget: 0 for Call A and during validation of Call B, then exactly 1. Do not increment at correction, request submission, or validation start. No model-to-backend wire. Do not color all valid rows green while the request still lacks end_time; local field validity and whole-call validity must not be confused.

## Accuracy limits

- `omitted` is an inspector annotation for an absent key, not a literal argument string. Do not teach that passing the word omitted is equivalent to leaving out a key.
- Schema/shape validation and semantic checks are distinct. The illustrated contract requires nonempty service, UTC timestamp values, and integer limit within the configured range. Server code also checks start before end. Only the missing-field case is animated; no exhaustive validator implementation is claimed.
- All four fields must actually be declared required in any later illustrative schema. Merely drawing labels or defining object properties does not enforce requiredness.
- Validation catches this malformed request. It does not establish service authorization, sensible query choice, completeness of results, or execution success. Authorization remains an independent application responsibility and is assumed satisfied in this successful continuation.
- Search executions: 0 demonstrates prevention of backend work for invalid input, not zero incidents. Avoid any empty-result list or no-incidents answer.
- Call B is a corrected submission before any backend execution, not a retry following a timeout. Do not introduce retry counters or policies.
- Times, dates, limits and service name are illustrative. This plan does not call a live service or claim these are real production validation defaults. The result limit does not itself bound bytes, tokens, or latency.

## Native350 acceptance and later production review

This is a plan only; none of these checks are claimed completed.

1. Inspect separate encoded frames at 6,10,12.5,18.5,21,26.5,30.8,32.5,36.5,41 seconds at native350 and key full-resolution frames. Inspect ±0.25s around rejection, correction, valid, and execution start. No contact-sheet-only review.
2. Field names, values, required legend, missing-field error, corrected-call identity, and execution count must read without zoom. Keep necessary labels at least 46px source. Wrap intentional labels or increase panel space rather than shrinking text.
3. Verify no backend activity or count increment before Call B validates. Call A stays rejected; it must not silently become the executed request after editing the form.
4. Confirm end_time is absent in Call A and explicit in Call B. Other values remain identical. Validate again after correction; do not preserve a stale rejected or valid badge.
5. Show the actionable error long enough to read both Missing: end_time and Add end_time. Keep red annotation off glyphs. No overlap with the limit field or required legend.
6. Mute comprehension: viewer can identify the missing input, the component rejecting it, why no search ran, what changed, and why validation must run again. The viewer should not infer authorization from valid input.
7. Final state holds for at least 6.8 seconds with Inputs valid and Search executions: 1 / Running distinct. No fabricated search result or task-success badge. Extend duration if phone reading needs more time.
8. Later production: decode the full MP4, inspect beat boundaries, check audio peaks below −0.5dB, audio presence, and moov-before-mdat. State heard versus analyzed audio honestly. Reproduce suspected visual faults via alternate extraction before flagging display omissions.
9. Bind later comparative review to actual encoded before/after hashes. A new encode needs renewed encoded inspection, not merely a changed decision hash. Optional improvements alone are not blockers.

## Execution boundary

Write only this plan. No rendering, current other-plan/author-source inspection, other lesson work, production-state/provenance reads, public/site/shared-skill edits, commits, or deployment. Later production uses repository-pinned Puppeteer and local engine copies; drawing extensions remain local to the cut. Keep local candidates.
