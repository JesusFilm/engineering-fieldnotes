# Lesson 01 — What the model can see

## Scope and grounding

Teach one distinction: information existing in a repository is not the same as information supplied for a particular model invocation. The application reads selected content, assembles the input, and sends that input. The model can then use the supplied contract. End by inspecting what this invocation actually included.

Grounding: item 1 of `video/context-engineering/sequence/lessons.json` and the overview/example in `content/concepts/context-engineering.json`. Use the concrete invoice requirement `Keep total_cents` as the selected content. The requested task is `Fix invoice timeout`. The requirement is an example, not a measured model result.

[Primary context-engineering account](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents), checked 2026-10-20: context comprises information included for inference; file references can be used to load content through tools. This supports the existence-versus-inclusion distinction. The UI, paths, input identifier, and timings below are illustrative editorial choices, not a vendor API or an actual request trace.

Exclude handoff loss, compaction, trimming, caching, retrieval ranking, attention-position effects, context-window budgets, test verification, permission enforcement, and a second invocation. No patch is made. No failure is manufactured to prove that missing context always causes a mistake.

## Design: inspect one invocation

Use a developer input inspector with a repository source preview above and an assembled-input document below. A selected excerpt is copied into the document while the original remains in place. After sending, that same document becomes a read-only received-input view. Its identity never changes. This is document inclusion and inspection, not a three-box pipeline, physical container metaphor, generic packet chain, or brain animation.

Five beats, approximately 43 seconds, 1080×1920 at 30 fps. All essential text must remain readable at native350; typography below is intentionally larger than the skill minimum. Adapt timing for comprehension, not to meet a duration target.

### Coordinates and typography

All coordinates use the 1080×1920 canvas. Rectangles are x/y/w/h; text positions are baseline anchors. Avoid narrow columns: source and input each use almost the full width.

| Element | Position | Content / presentation |
| --- | --- | --- |
| Title | rect 90/250/900/130 | `What is supplied?`, 86px bold; stable across all beats |
| Repository preview | rect 90/450/900/390 | Header `Repository`, baseline (125,510), 48px; source tab at 125/540/830/70, `api/v1.md`, 48px mono |
| Source excerpt | rect 125/640/830/120 | `Keep total_cents`, baseline (155,715), 54px mono; unselected neutral border initially |
| Source status | baseline (125,805) | `On disk`, then `Read by application`, 46px; original remains present |
| Application action strip | rect 90/875/900/100 | `Application`, baseline (120,937), 46px; right-side action `Read excerpt` then `Send input`, 46px; no actor avatar |
| Input inspector | rect 90/1025/900/660 | Header `Input 01 · draft`, baseline (125,1090), 50px; becomes `Input 01 · received` after send |
| Goal row | rect 125/1130/830/130 | small role label `Task`, 46px at y=1180; `Fix invoice timeout`, 50px at y=1240 |
| Included-source row | rect 125/1300/830/190 | Initially a neutral row labelled `Contract: not included`, 48px at y=1400; after insertion, `api/v1.md · excerpt` at y=1360, 46px, and `Keep total_cents` at y=1440, 54px |
| Inspector status | baseline (125,1590) | `Not sent`, later `Received by model`, 48px |
| Final audit status | baseline (125,1645) | `Included in Input 01`, 46px; revealed only at final audit |

Use background #050506, white primary text #E6E8EC, readable secondary text #A8ADB5, amber #F5A524 for selected content, teal #3FB68B only for successful delivery/inclusion, never proof of compliance. Source and received excerpt retain matching amber left-edge marks, 8px wide, so provenance is visible without a color-only dependency. No literal token counts or implementation schema.

There are no persistent wires. For the read-and-include operation only, a thin trace runs from source lower-left (145,760) down the outside gutter x=65 to (65,1395), then to the included-source row left edge (125,1395). It marks source-to-input inclusion, not a direct disk-to-model connection. The application strip pulses first; the trace begins afterward. Clear the trace after insertion. Do not animate text across other text.

## Timed beat sheet

| Time | What moves | State and causal meaning | Sound |
| --- | --- | --- | --- |
| **0–8s: exists, not included** | 0–0.7 title/source appear. 1.2–2.0 input inspector appears with task row and contract-not-included state. 3.0 source excerpt receives a white focus outline, then focus shifts to the absent-contract row at 4.5. Hold 5–8. | Viewer can read a contract on disk, but Input 01 contains only the displayed task in this illustrative slice. Header stays draft and status stays Not sent. The source preview is a viewer-facing inspector, not evidence the model has seen it. | Repository `arrive` G4 at 0.7; application `store` C4 at 2.0; quiet application `ack` C5 at 4.5. No model cue. |
| **8–17s: application reads and includes** | 8.2 application strip activates `Read excerpt`. 9.0 amber selection bracket encloses only the source excerpt. Hold through 10.5. 10.5–11.3 trace draws to input row. 11.4–12.2 included-source row replaces placeholder; duplicate excerpt resolves in place, original remains. 12.8 source status becomes Read by application. Hold 13.2–17. | Reading selected source content precedes its inclusion. Input now contains both task and contract excerpt, with visible source label. The source file was not moved/deleted. Input remains draft and Not sent; reading it locally is not yet model receipt. | Application `send` C5 at 8.2; source `arrive` G4 at 9; application `store` C4 at 12.2; quiet source `ack` G4 at 12.8. |
| **17–25s: send this assembled input** | 17.2 border of the entire input document brightens, briefly encompassing both rows together. 18.0 application action changes to Send input; 18.6 thin activity underline sweeps under the input header for 0.8s. At 19.6 header becomes Input 01 · received and footer becomes Received by model. Hold 20.2–25. | The same input identity and exact task/contract text survive sending. Only after delivery does the model receipt appear. No unexplained additional source content is added during the transition. | Application `send` C5 at 18.0; model receiver `arrive` E5 at 19.6. No success fanfare or generated-answer sound. |
| **25–33s: supplied content is usable** | 25.3 focus border moves from whole document to the received contract row; its left edge and corresponding source edge pulse once. 26.4 `Keep total_cents` gets a short underline inside the received input. Source preview recedes in contrast slightly while received text remains full strength. Hold 27–30. At 30.5 return focus to both input rows together; hold to 33. | The requirement is available in the model's received input. This is an inspection highlight, not a visualization of internal attention or a claim that the model complied. Task plus constraint stay together. | Model-side `ack` E5 at 25.3; quiet inspector `ack` C5 at 30.5. No invented speech/output. |
| **33–43s: audit inclusion** | 33.2 source row briefly brightens, then its matching received row at 34.0. At 35.0 audit status Included in Input 01 appears. A small check sits beside the included-source label, not beside the requirement itself. Hold 35.6–41.8. Fade lower stage 41.8–43, leaving the title. | End with evidence of what this particular invocation received. Check means included, not correct, enforced, or permanently remembered. Input 01 is visible throughout; no silent reset to a new call. | Source `ack` G4 at 33.2; inspector `store` C4 at 35.0. Final hold and fade are silent. |

## Sound and motion discipline

Recurring roles: application/inspector C4–C5; repository read G4; model receipt E5. Pan by the active element's position; this centred layout mostly uses centred cues. Sends are quieter than receipt/store events. Use brief cues with short decays; no continuous clock, typing barrage, narration, or soundtrack. A focus transition may be silent when it is only visual continuity, but each meaningful read/include/send/receive/audit state change has a cue.

Use 0.4–0.8s eased transitions and deliberate still holds. Animate selection, duplication, inclusion, and received-state changes rather than arbitrary camera moves. Do not slide a 54px excerpt over the task label. The trace travels in the gutter, and text appears only at its final destination. Once included, do not accidentally clear the contract while changing the header.

## Accuracy limits

- “Context” here means supplied information for this invocation, not all knowledge in model weights and not everything on a user's machine. Do not imply a model has no prior learned knowledge.
- The on-screen inspector is a simplified relevant slice. Real input can also include instructions, conversation history, tool descriptions, and other results. Do not call the two displayed rows the complete universal input format.
- A path and file contents are different. The contract's actual requirement must visibly appear in the input; merely adding `api/v1.md` is insufficient to teach this lesson.
- Applications can preload files automatically or provide tool results. This example deliberately shows an application-controlled read. Do not claim all systems require manual selection or that tool-capable agents can never retrieve additional material.
- A tool read does not rewrite the input of an invocation already in progress. This sequence assembles a draft before its one depicted send; it does not inject material retroactively into a running call.
- Input availability is not guaranteed understanding, attention, obedience, verification, or permission enforcement. Focus outlines are inspector annotations. No model output or code change is needed to establish availability.
- The contract path and displayed excerpt are illustrative. No claim is made that this repository contains `api/v1.md` or that this animation captures a real request.
- Input 01 is a teaching identifier. No permanent memory or automatic carryover to a future invocation is inferred. The final question is what was included here, not what an agent will remember later.

## Native350 acceptance and eventual encoded review

These are acceptance requirements for later production, not checks completed by this plan.

1. Inspect individual 350×622 frames at 2.5, 6, 9.5, 12.5, 15, 18.3, 20.5, 27.5, 35.6, and 40.5s, plus full-resolution busiest states. Inspect ±0.25s around insertion and receipt to catch stale placeholders and overlapping labels. Never rely on a contact sheet alone.
2. At 350px the 46px source minimum is approximately 15px. All teaching labels, path, task, and requirement must read without zoom. Measure actual text widths before rendering; long labels must wrap into intentional short lines or gain room, not shrink. Keep at least 24px source padding around text and highlight strokes.
3. Verify three distinct states are readable: contract exists but is not included; contract included in draft but not sent; contract included in received Input 01. An observer should be able to name which state is shown from any hold frame.
4. Confirm the original source remains in place after inclusion, and identical `Keep total_cents` text is copied into the input. No path-only substitution, fake file deletion, or direct disk-to-model shortcut.
5. Confirm `Received by model` cannot appear before Send input, and all content is stable during the send transition. Input 01 must not become Input 02 or silently drop a row.
6. Mute test: after one viewing, a beginner can identify what exists, what the application selected, what was supplied, and which invocation the audit concerns. No paragraph caption should be needed to explain the moving relationship.
7. The final inclusion mark must be adjacent to the source label and audit status. It must not imply the contract was tested or followed. Teal is restricted to delivery/inclusion confirmation.
8. Decode the eventual full MP4; inspect every beat and boundary at native350 and full size; check audio peaks below −0.5dB and moov-before-mdat metadata. Report whether audio was heard or only analyzed. Reproduce alleged visual faults through alternate extraction before flagging display omissions.
9. Retain the finite ending. Extend holds if phone reading requires it. Bind comparative review to the actual encoded hash; a repaired encode needs renewed visual inspection, not only a replacement hash.

## Execution boundary

This task writes only `video/context-engineering/motion-v2/plans/01-plan-a.md`. No rendering, author-source inspection, other lesson work, or production-state/provenance reads. Later implementation uses the repository-pinned Puppeteer dependency and local engine copies; any new drawing helpers stay with the cut. No shared-skill, public/site edits, commits, or deployment.
