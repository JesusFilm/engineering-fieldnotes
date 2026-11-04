# Lesson 04 — Make a useful handoff

## Scope and grounding

One mechanism: replace a long session history with a concise, inspectable handoff that retains the goal, decisive constraint, evidence reference, and unresolved work. The next session receives this shorter representation and can reopen the source. Shortening is not perfect memory.

Grounding: item 4 of `video/context-engineering/sequence/lessons.json`; overview, example, judgment, and walkthrough step 3 of `content/concepts/context-engineering.json`. Preserve `total_cents` during invoice-latency work. A vague goal-only summary is visibly incomplete; repair the handoff before sending it. Show incidental history omitted while the crucial requirement remains explicit.

[Primary context-engineering account](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents), checked in this conversation on 2026-10-20, describes shorter representations and the risk of losing important details during compaction. The handoff form below is an illustrative editorial design, not an optimal universal schema, observed model failure, or guaranteed memory mechanism. Source reopening is demonstrated as an explicit action, not an automatic consequence of having a path.

Exclude code edits, rerunning tests, verification of reported success, performance results, automated repair, persistent-memory architecture, retrieval ranking, context-size math, and later lesson workflows. The final state has source detail reopened and work still unresolved. No model behavior is guaranteed.

## Visual design: a handoff record with a missing field

Use a full-width structured editor rather than three actor boxes. Its content persists across a clear session-header change. An initial goal-only draft has empty constraint/evidence/open-work fields. Source material is brought into those fields one at a time. Incidental history is then deliberately left out. After delivery, an explicit source-reference action opens the contract beneath the same handoff.

The distinctive motion is field completion, history omission, document delivery, and source expansion. No suitcase, brain, memory tank, physical clipboard, shrinking unreadable transcript, or generic compiler flow. Do not animate an entire conversation into an opaque summary blob.

1080×1920, 30fps, target 49 seconds. Near-black #050506; primary white #E6E8EC; secondary #A8ADB5; amber #F5A524 for the requirement and pending work. Teal #3FB68B only for delivery, not truth or task success. Title 82px; primary values 52px; essential metadata at least 46px, approximately 15px at native350.

### Coordinates

All rectangles are x/y/w/h; text points are baseline positions. Keep one reading focus at a time and 24px minimum interior padding.

| Element | Coordinates | Text and function |
| --- | --- | --- |
| Title | 90/250/900/115 | `Make a useful handoff`, up to two lines |
| Session header | 90/430/900/90 | `Current session`, later `Next session`, 52px; right status `draft`, then `received`, 46px |
| Handoff editor | 90/555/900/840 | Header `Handoff`, baseline (125,615), 54px. Four field rows below. |
| Goal row | 120/655/840/140 | `Goal`, baseline y=700, 46px; `Fix invoice latency`, y=765, 52px |
| Constraint row | 120/810/840/140 | `Keep`, baseline y=855, 46px; initially `—`, later `total_cents`, y=920, 56px |
| Evidence row | 120/965/840/190 | `Source`, baseline y=1010, 46px; `api/v1.md`, y=1080, 52px; `rev a17 · L8–10`, y=1135, 46px |
| Open-work row | 120/1170/840/180 | `Still open`, baseline y=1215, 46px; `Timeout cause?`, y=1290, 52px |
| Source/history tray | 90/1440/900/320 | Header at (125,1500), 48px. Two evidence lines at y=1580/1660, 50px. Its role changes explicitly between `Session evidence`, `Incidental history`, and `Reopened source`. |
| Delivery control | rect 660/1360/300/65 | `Send handoff`, 46px; appear only after all fields are complete. Retire before opening source. |

Source tray initially displays `v1: keep total_cents` and `api/v1.md · a17`. Open-work evidence appears there briefly as `Timeout cause unknown` before entering the editor. Later incidental history uses two short lines: `Repeated search output` and `Abandoned query`. These are illustrative labels, not unreadable transcript paragraphs.

After delivery, the evidence row's path becomes an outlined action chip. Reopened source tray shows header `api/v1.md · a17`, then `L8–10 · v1 response` and `Keep total_cents`. The handoff's goal, constraint, reference, and open question all remain visible above it. No test/status-success panel is introduced.

## Five timed beats

| Time | Motion and holds | State / causal teaching | Sound |
| --- | --- | --- | --- |
| **0–9s: a vague handoff loses something** | Title/header settle by 1.0. Handoff editor appears 1.5–2.2 with goal only; all other fields show a neutral dash. Source tray appears at 3 with the v1 requirement and reference. At 4.5 highlight the source's total_cents; at 5.5 outline the empty Keep row in amber. Hold 6–9. | The requirement exists in the current session, but the shorter draft omits it. No actual resumed agent failure is claimed. The draft remains unsent. Empty fields are visually distinct from a verified absence of constraints. | Current-session `store` C4 at 2.2; source `arrive` G4 at 3; handoff-editor low `ack` D4 at 5.5. No crash cue. |
| **9–22s: preserve decision-bearing facts** | 9.5–10.2 duplicate `total_cents` into Keep; original source remains. At 12–12.8 fill source path and revision/line reference together. Hold 13.2–16. At 16.5 tray switches explicitly to `Timeout cause unknown`; 17.5–18.2 fill Still open with `Timeout cause?`. Hold complete record 19–22. | Four distinct fields now preserve task, invariant, source, and uncertainty. Source metadata stays attached to the requirement through proximity and matching amber left-edge marks. Open work is a question, not a guessed diagnosis. | Editor `store` D4 at 10.2 and 12.8; session `ack` C4 at 16.5; editor `store` D4 at 18.2. |
| **22–30s: shorten incidental history** | At 22.5 tray header changes to Incidental history; two neutral history lines appear. At 24.5 they fade to 25% opacity and a small `Not included` label appears at 26.0. The four handoff fields stay fixed and fully readable. At 27.5 Send handoff appears. Hold to 30. | Only incidental material is left out. The requirement is not silently removed. The illustration shows selection for a concise handoff, not a claim that source history is deleted or that these labels are always irrelevant. | Session/history `arrive` C4 at 22.5; editor quiet `ack` D4 at 26; application `ack` E4 at 27.5. No shredding/poof or destructive sound. |
| **30–38s: deliver the shorter representation** | At 30.5 activate Send handoff. A thin progress underline crosses the editor header over 0.8s; no text flies or shrinks. At 32.0 session header changes to Next session and status received. Incidental tray clears. All four field values remain identical. Hold 32.5–36. At 36.5 outline api/v1.md as an action chip, labelled `Open source` beside the source-row header. Hold to 38. | Next session receives the actual compact record, not the entire history. Preserved references provide access paths, not automatic knowledge of omitted detail. Distinct session labels prevent implying a mere UI focus change. | Application `send` E5 at 30.5; receiving session `arrive` A4 at 32; retrieval action `ack` G4 at 36.5. |
| **38–49s: reopen detail while uncertainty remains** | At 38.3 activate Open source; at 39.2 tray header resolves to the referenced path/revision. Source excerpt appears 40.0–40.6. At 41.2 briefly underline matching total_cents in source and handoff. Hold 42–47.8; fade lower stage 47.8–49, title remains. | The source is explicitly retrieved. The handoff remains a shorter representation; omitted detail is available by reference. Timeout cause stays open. Source availability does not mean tests passed, the patch is correct, or the performance issue is solved. | Retrieval `send` G5 at 38.3; source `arrive` G4 at 40.6; receiving session quiet `ack` A4 at 41.2. No success chime. |

## Motion and sound details

Current session C4; editor D4; application delivery E4/E5; next session A4; source/retrieval G4/G5. Use short arrive/store/ack/send cues from the local engine, quieter sends than arrivals. Pan by active anchors; this full-width design mostly uses centred cues. No continuous typing, narration, music, or clock. All substantive state changes have cues, but holds and purely transitional fades are silent.

When copying the requirement, use a 0.6s amber focus trace along the left gutter from source tray anchor (90,1580) via (65,1580),(65,880) to Keep row (120,880). Destination text resolves only at its final position; do not drag text across other fields. Clear the trace after insertion. Use a similar trace for reference inclusion if useful, never simultaneous with requirement motion. Reopening uses a source-row highlight then tray expansion; no permanent wire from a file to the next session.

## Accuracy limits

- A handoff is a chosen representation, not perfect or complete memory. This example repairs an obvious omission; it does not prove every crucial detail has been preserved.
- The vague draft and successful inclusion are illustrative, not a measured failure/success rate. Do not claim an agent always loses an absent instruction or cannot rediscover it independently.
- The goal, constraint, source, and open-work fields suit this narrow example. Real handoffs may also need changes, patch state, commands, observed results, and next action. Do not label this four-field record universally complete.
- Paths, revision a17, line span, and source text are fictional teaching references. Their presence does not establish authority or freshness. The scenario assumes this v1 contract is the relevant authority.
- Source references alone do not load content. The next session explicitly activates Open source before its excerpt appears. Do not imply retrieval or verification happens merely because a path is stored.
- A later source read is not a test of the current patch. The preserved field requirement is not proof of compatibility, and the open timeout question remains unresolved.
- Incidental history is omitted from the handoff, not erased from storage. This is not a destructive cleanup or a universal rule to discard failed queries; information essential to reproducing a problem should be retained.
- No context-window token limit, compression ratio, permanent memory mechanism, or special enforcement power is claimed. Guidance in context is not permission enforcement.

## Native350 acceptance and eventual encoded review

This is a plan only; these are later acceptance requirements, not completed checks.

1. View individual encoded frames at 3.5, 6.5, 10.8, 14, 19.5, 25.5, 28.5, 32.5, 37, 40.8, and 45 seconds at 350×622, plus full-resolution busiest states. Inspect ±0.25s around field insertion, session-label change, and source reopening. Do not substitute a contact sheet.
2. All four field values, source metadata, session identity, and open question must read without zoom. Maintain at least 46px source text for necessary labels; measure fit and wrap intentionally rather than shrinking. Ensure the Send handoff chip does not overlap the last row.
3. Confirm draft remains unsent until Keep, Source, and Still open are populated. The current-session source remains intact when copied. Delivery preserves every field byte-for-byte.
4. The omission contrast must be readable: source has total_cents while initial Keep is empty. The later history omission must never dim or delete the completed Keep field.
5. The received state is explicitly Next session; the source tray stays empty until an explicit Open source action. Path/revision/line reference matches the reopened source. No hidden automatic restoration of entire conversation history.
6. Mute comprehension: viewer can identify what was lost in the draft, what is preserved, what was left out, what the next session received, and how omitted detail can be retrieved. No paragraph caption should be necessary.
7. Final hold retains the open question and source together for at least 5.8 seconds. Extend duration if needed to support reading. No green task-success badge or premature verification result.
8. Later production must decode the whole MP4, inspect all beat boundaries, check peaks below −0.5dB, audio stream and moov-before-mdat metadata. State whether sound was heard or only analyzed. Reproduce suspected visual defects through alternate extraction before flagging display omissions.
9. Bind the eventual comparison to actual encoded before/after hashes. A repaired encode requires renewed actual encoded inspection, not only a replacement hash. Optional refinements alone are not blockers.

## Execution boundary

Write only this plan. No rendering, current other-plan/author-source inspection, other lesson work, production-state/provenance reads, public/site/shared-skill edits, Git commits, or deployment. Later production uses repository-pinned Puppeteer dependencies and local engine copies, with drawing extensions local to the cut. Keep local candidates.
