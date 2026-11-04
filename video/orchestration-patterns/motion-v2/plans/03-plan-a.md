# Independent parallel work

## Lesson boundary and evidence

Teach one mechanism: two read-only analyses of different concerns can overlap because both consume the same frozen input and neither needs the other's output. Preserve the snapshot identifier on each report. End with both reports available to the coordinator, without teaching acceptance, reconciliation, missing-report handling or repair.

Grounding: item 3 of `video/orchestration-patterns/sequence/lessons.json`; the example, boundary and independent-analysis passages in `content/concepts/orchestration-patterns.json`. Both define compatibility and migration reviewers examining one frozen code snapshot without editing shared files. Their independence is a property of these assigned analyses, not of every API/database task.

Primary source: [Building effective agents — Parallelization](https://www.anthropic.com/engineering/building-effective-agents#workflow-parallelization), accessed 2026-10-20 in this session. It describes independent subtasks running concurrently. The frozen-input labels, illustrative findings and particular read-only arrangement below are lesson design choices grounded in the local concept. No benchmark, speedup or correctness guarantee is asserted.

Exclude routing, dynamic task creation, evaluator loops, shared editing, merge approval and the later coordinator acceptance procedure. Do not turn the ending into a successful join animation.

## Visual grammar

A read-only review console: a single immutable revision header above two wide horizontal inspection lanes. Both lanes have their own scope, activity strip and eventual report. Aligned activity strips show overlap; there are no arrows between reviewers. This is neither a three-box pipeline nor a physical workbench metaphor.

Canvas 1080×1920, 30 fps. Black background, white essential labels, gray structure. Compatibility uses blue and migration amber, consistently on lane borders, activity traces and report markers. Use icons and words as well as color. Completion means a report exists, not that the reviewed code passed.

All rectangle coordinates below are top-left, width×height; text coordinates are left baseline unless centered. Keep essential text at 48–54px (15.6–17.5px at 350px width). Title 76px, secondary labels at least 42px. No paragraph captions.

| Element | Coordinates and content |
|---|---|
| Title | Center (540,290), `Independent parallel work`; wrap deliberately to two lines at y=275/355 if the one-line text cannot fit 900px at 76px. Subtitle omitted to preserve space. |
| Frozen source header | (90,460), 900×230. Text (125,520) `Snapshot S7`; (125,585) `API + migration`; immutable badge (700,490), 250×65, `READ ONLY`, 42px. Revision marker S7 remains on-screen through the ending. A small padlock signifies configured access, not a prompt request. |
| Shared input ports | (340,690) and (740,690). Separate connectors route to each lane: left → (65,710) → (65,810) → (90,810); right → (1015,710) → (1015,1150) → (990,1150). Neither connector crosses text or another lane's content. |
| Compatibility lane | (90,750), 900×300. Header (125,810) `Compatibility`; right badge (800,780) `S7`. Focus row (125,885) `Check: existing clients`. Evidence row (125,955) initially `API schema + callers`; later `Report C · S7`. Activity strip (125,1000), 830×16. |
| Migration lane | (90,1090), 900×300. Header (125,1150) `Migration`; right badge (800,1120) `S7`. Focus row (125,1225) `Check: existing rows`. Evidence row (125,1295) initially `Migration + row data`; later `Report M · S7`. Activity strip (125,1340), 830×16. |
| Status labels | Right-aligned at (950,955)/(950,1295) only when evidence text is hidden: `reading`, then `report ready`. Never place status atop the evidence row. During report state show readiness as a short header badge instead. |
| Coordinator receipt area | (90,1490), 900×260. Header (125,1550) `For coordinator`; rows (125,1625) `Report C · S7` and (125,1700) `Report M · S7`. Rows appear only when the corresponding report arrives. No approval badge, merge button or pass check. |

Implementation choice: the activity strips are time traces, not percentage-complete meters. A thin cursor advances at the same horizontal rate in both strips while active; the completed segment remains. Their common left origin and overlapping occupied x-ranges communicate simultaneous work. Label `overlapping work` at (125,1440), 46px, only during the overlap hold. No numeric durations or claimed speedup. Dotted source connectors remain visible while a lane reads; no reverse/write connector exists.

## Five beats and event schedule

Proposed duration 46 seconds. All timing is playback seconds at speed 1; increase any reading hold rather than shrinking type. Every consequential state change has a sparse cue; intentional holds are quiet.

| Time | Motion and state | Hold and causal purpose | Sound |
|---|---|---|---|
| 0–8 | 0–1.5: reveal snapshot header and its S7 marker. At 2, settle READ ONLY and padlock. At 3.5–5, reveal both empty lanes with different check labels. | Hold 5–8. One input revision, two different concerns, no work yet. Source stays unchanged for the whole video. | Source `store` C4 at 1.5, then `ack` C5 at 2. Quiet compatibility `arrive` E5 at 4 and migration `arrive` G5 at 5 for assignment appearance. |
| 8–16 | 8–10: one S7 token follows each source connector concurrently. Both destination badges settle to S7 at 10. At 11, reveal each lane's evidence row. At 12, both become reading and their trace cursors begin from x=125. | Hold the resolved scope/input arrangement 12–16 while cursors advance slowly. Neither worker waits for a report from the other. No source content changes. | Source `send` C6 at 8; arrivals E5/G5 at 10, softly combined. `work` E4 and G4 at 12 paired with each lane's first activity mark. |
| 16–25 | Keep both cursors advancing on the same time axis. At 16.5, briefly outline API evidence in the upper lane; at 18.5 outline row evidence below. These attention cues do not stop the other lane. At 20, reveal `overlapping work`. | 20–25 is a deliberate overlap hold. Both lanes retain active state and gain new trace length simultaneously, while S7 and READ ONLY remain fixed. No artificial code editing, spinners without progress, or inter-worker packet. | Upper `work` E4 at 16.5; lower `work` G4 at 18.5. Paired low `ack` E5/G5 at 20 marks overlap label/trace emphasis. No continuous tick bed. |
| 25–34 | At 25, compatibility stops its cursor and switches to `Report C · S7`, report-ready header badge. Migration continues visibly until 29, then switches to `Report M · S7`. Fade the overlap label at 30. | Hold 30–34 with two differently sized trace lengths and both reports. Unequal finishing times make independence tangible. Read-only is still visible; ready reports do not imply clean findings. | Compatibility `deliver` E5 at 25; migration `deliver` G5 at 29. No green success chord. |
| 34–46 | 34–35.5: copy a small C/S7 report token via left gutter (65,1025) → (65,1625) → (90,1625). 36–37.5: copy M/S7 via right gutter (1015,1365) → (1015,1700) → (990,1700). Source report labels remain. Receipt rows reveal on arrival. | Hold 37.5–43: source S7, both report S7 labels and coordinator's two receipt rows remain readable together. The ending stops at reports available. Fade all elements 43–46 to black; finite ending. | Report sends E6 at 34 and G6 at 36; coordinator `arrive` C5 at 35.5 and 37.5. No final approval sound. |

Trace mapping: use common time origin t=12 and 35px per second. Upper endpoint at t=25 is x=580; lower endpoint at t=29 is x=720. Both fit inside the 830px strip and preserve equal scale. After completion, freeze the trace, remove its moving cursor, and retain a neutral terminal dot. These are illustrative durations, not measured task latencies. Sequential receipt animations are reading choreography after parallel work, not a requirement that reports return serially.

Sound identities: source C, compatibility E, migration G, coordinator C an octave distinguished from source dispatch. Pan gently toward lane evidence emphasis rather than hard stereo; both lanes occupy the same horizontal span. Sends quieter than arrivals. Visual state must remain comprehensible muted; sound reinforces which reviewer changed state.

## Accuracy limits and invariants

- Both workers receive S7 before reading and both reports retain S7. Never transform S7 into a later revision during this lesson.
- Neither worker consumes the other's findings, and neither writes shared files. The visual READ ONLY badge denotes configured tool/filesystem restrictions in this example; words in a prompt alone do not enforce access.
- Distinct concerns are not sufficient by themselves: the assigned analyses must actually be independent. The read-only example prevents shared-write interference but does not guarantee correct analysis.
- Parallel work overlaps, but does not guarantee lower overall cost, higher quality, or a particular speedup. Do not add a stopwatch comparison or a 2× claim.
- Report ready is process state, not a test pass or permission to merge. Do not manufacture findings or imply automated checks have run. A report can contain concerns; this lesson does not teach their adjudication.
- The coordinator is shown as a receipt area only. Do not introduce barriers, required-report counts, retries, missing-report rejection or approval transitions from later lessons.

## Native-350 acceptance and later production checks

1. Inspect individual 350×622 encoded frames at 2, 6, 10, 13, 20, 24, 26, 30, 38 and 42 seconds, without enlargement. Verify the title, both check labels, READ ONLY, all S7 identifiers and both report rows. Use full-resolution inspection as an additional check, not a substitute.
2. Inspect before/mid/after input arrivals, each report completion and each coordinator arrival, including ±0.2 seconds around transitions. Chips and gutter wires must not obscure the other lane. If padding is insufficient, change geometry rather than shrinking useful labels.
3. At 20 seconds both traces must be active. At 26 seconds the upper trace must be frozen while the lower advances. These two states are mandatory evidence of overlapping but independent work.
4. A beginner should be able to identify the shared revision, different concerns, absence of editing and two snapshot-labelled reports. No dependency arrow may connect the workers. The source header must remain invariant.
5. Verify that no status string overlaps an evidence row; hide/replace one deliberately. Ensure coordinator rows contain the correct C/M identifier and S7 on both. Final black is valid; no seamless loop is required.
6. Later production should decode the complete MP4, inspect every beat/boundary and busiest frame, check audio peaks below −0.5 dBFS and moov-before-mdat, and compare with the public lesson using actual encoded evidence. Listen for actor/event alignment and explicitly distinguish listening from signal analysis. Confirm alleged visual faults by alternate extraction. Bind review to the full SHA-256; any new encode needs renewed inspection.

## Write scope

Plan only: `video/orchestration-patterns/motion-v2/plans/03-plan-a.md`. No rendering or other file changes in this task. Later implementation must use repository-pinned Puppeteer and a local engine copy; any review-lane/trace helper stays local to the cut and derives all visual state from scene time. No public/site/shared-skill edits, commits or deployment.
