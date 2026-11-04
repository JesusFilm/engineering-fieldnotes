# Follow dependencies

## Scope and grounding

One mechanism: checking a particular draft cannot begin until that draft exists and is supplied; assembling the result then depends on the draft and its observed findings. Order follows data availability, not the number or names of agents.

Grounding: `video/orchestration-patterns/sequence/lessons.json` item 1 and `content/concepts/orchestration-patterns.json`, overview and the instruction to sequence work that needs another task's output. Primary source consulted 2026-10-20: [Building effective agents, prompt chaining](https://www.anthropic.com/engineering/building-effective-agents). It describes processing previous outputs in successive steps and trading latency for potential quality gains. This plan uses an illustrative fixed workflow, not a performance guarantee.

Example: draft a release note with `Change` and `Rollback` sections. The draft contains `Change: Add timeout` but lacks Rollback. The checking step records `Rollback missing`. The final result bundles the unchanged draft and finding as `Needs revision`; it does not approve or silently repair the draft. Exclude routing, independent parallel workers, joins, evaluator repair loops, retries, dynamic delegation and approval/merge decisions.

## Layout: execution lanes plus an artifact inspector

Use a software run trace with three horizontal time lanes above one large artifact inspector. The trace shows Draft running while Check waits for its actual output. A dependency elbow ties Draft's completion to Check's start; another ties findings completion to Assemble's start. The inspector exposes the exact content that travels. This is not three labeled boxes with arbitrary packets: unavailable inputs, preserved draft identity, field-level checks and non-overlapping run intervals carry the explanation.

Target 47s at 30fps, five beats. Black background, white essential text, amber running/waiting, blue artifact identity, teal completed execution. An amber finding remains visible in the final result; execution completion must not look like content approval. Finite ending.

## Coordinates and text

Canvas 1080 × 1920; rectangle coordinates top-left. All essential labels at least 46px source (~15px at350), values 52–58px. Do not shrink to fit. Title `Follow dependencies`, 80px centered (540, 290); subtitle `ORCHESTRATION · 1`, 40px at y405.

- Trace area (90, 500, 900, 420). Lane labels x110 at y585/715/845: `Draft`, `Check`, `Assemble`, 50px. Time progresses right across x390–930. Only qualitative ordering is encoded; no milliseconds or speed benchmark.
- Draft execution bar: (390, 555, 150, 55); Check bar (590, 685, 150, 55); Assemble bar (790, 815, 140, 55). Before running, labels occupy their own future bar positions as `Waiting`, 46px, with no progress fill. Active running labels appear below each bar, never on top of it. Completed bar labels become `Done`, not `Pass`.
- Dependency elbow 1: from (540, 582) to (565, 582) to (565, 712) to (590, 712). Elbow 2: (740, 712) → (765, 712) → (765, 842) → (790, 842). Arrowheads end at bar starts. Illuminate each elbow only once the upstream output has arrived at the downstream step. No crossing lines.
- Input availability strip (90, 960, 900, 100), text at (130, 1025), 50px: `Check needs: draft D1` → `Check input: D1` → `Assemble: D1 + F1`.
- Artifact inspector (90, 1120, 900, 390). Header at (130, 1185), 48px: `Draft D1`, then `Checking D1`, then `Result: D1 + F1`. Content lines x130, baselines1270/1350/1430, 52px. Draft text: `Change: Add timeout`; `Rollback: —`. The dash is an inspector indication of an absent section, not generated draft content.
- Criteria strip (90, 1560, 900, 170), header `Criteria`, 46px at y1610; `Change` and `Rollback` check items centered (300, 1680)/(745, 1680), 50px. Initially open circles, then Change check and Rollback amber cross. When the final result appears, this strip becomes `Finding F1` / `Rollback missing`, preserving the finding visibly.
- D1 identity badge (810, 1185), 110 × 65, blue. F1 badge appears beside the final finding title at (810,1610). IDs remain unchanged throughout; no new draft version is invented.

If a trace status label collides, put it beneath its lane bar and increase lane spacing, taking space from blank gaps. Do not shrink type. Inspector motion is field reveals and highlights; no entire text panel flies across the stage.

## Timed beats

| Time | Motion and state | Sound and hold |
|---|---|---|
| **0–9s: checking needs an output** | By 1.5s show lanes and fixed criteria. Draft starts at 2s: its bar gains an amber activity segment. Check and Assemble remain Waiting. Availability strip reads Check needs: draft D1; inspector shows `D1: not ready`. At 5s pulse the waiting Check row and the unavailable draft label together. Hold to 9s with only a slow Draft activity sweep, not a percentage claim. | Draft start `send`, C5, at 2s; two quiet `work` ticks C4 at 3/4s. Waiting dependency acknowledgment `ack`, E4, at 5s. No Check work sound while its input is absent. |
| **9–18s: deliver the draft** | At 9s Draft completes and D1 inspector reveals Change: Add timeout. At 10s expose absent Rollback as a dashed row. At 11s Draft bar becomes Done. At 12s light dependency elbow 1; at 13s availability becomes Check input: D1. Check becomes Ready, then begins at 15s. Hold the draft unchanged through18s. | Draft completion `arrive`, C5, at 9s. Handoff `send`, C6, at 12s; checker input arrival `arrive`, E5, at 13s; checker start soft `work`, E4, at 15s. Completion and input arrival are separate events. |
| **18–28s: inspect, retain the finding** | Header becomes Checking D1. At 18s highlight Change criterion and matching draft section; its criterion gets a check at 19s. At 21s highlight Rollback criterion and absent row; at 22s record `F1: Rollback missing` in the inspector's third line, amber. Do not insert a rollback instruction. At 24s Check becomes Done while the finding remains amber. Hold 24–28s. | Criterion Change `ack`, E5, at 19s; missing section restrained `thump`, E3, at 22s; completed findings `arrive`, E5, at 24s. No all-clear chime. |
| **28–38s: result depends on checked work** | At 28s light elbow 2 and change availability to Assemble: D1 + F1. Assemble begins at 30s only after both IDs are available. At 32s inspector header becomes Result: D1 + F1; retain the Change line and show `Status: Needs revision` on line2. Move the finding's presentation to the bottom strip labeled Finding F1 / Rollback missing; it remains the same observation, not a new check. At 34s Assemble becomes Done. Hold 34–38s. | Findings handoff `send`, E6, at 28s; assembler arrival `arrive`, G5, at 29s; assembly `work`, G4, at 30s; result delivery `deliver`, G5, at 34s. Completion is quiet, not approval. |
| **38–47s: show why the order mattered** | At 38s pulse D1's dependency elbow; at 40s pulse F1's elbow and final finding. All three run bars remain separate in time. The final state reads Needs revision with observed finding retained. Hold 41–45.5s; fade stage to black over 1.5s. No revision loop, automatic approval or later run. | First dependency `ack`, C5, at 38s; second dependency `ack`, E5, at 40s. Silence during final reading hold. |

## Accuracy and scope limits

- This check needs this produced draft. Criteria can be defined beforehand; the checker is waiting for the draft, not because all kinds of checking require prior generation. Independent work is outside this lesson.
- Fixed orchestrator logic schedules the dependency chain. Separate lane names do not imply separate models, identities or permission boundaries.
- Done describes execution completion, never correctness. F1 is an observed missing section against explicit criteria; it is not a universal factual-quality guarantee. The final result retains that defect and is not approval-ready.
- D1 remains unchanged throughout. Assembling D1 plus findings is not revising D1; there is no hidden repair or successful test result.
- Trace bar widths are illustrative, not measured durations. Extra serial steps add latency and additional failure opportunities; the clip shows a successful execution path with a content finding, not a timeout/failure-handling lesson. It does not claim chains always outperform one call.
- Waiting is dependency state, not an error. Avoid red crash imagery or blocked-security icons. No data is supplied before upstream completion in this example.
- Brief criteria and draft fields are visual data, not paragraph narration. The missing rollback example is fictional, not advice for an actual release.

## Native350 and later encode acceptance

1. Inspect actual individual encoded frames at native 350 × 622 and full size at 6, 10.5, 13.5, 16, 19.5, 22.5, 25, 29, 33, 36 and 43s. Inspect all beat boundaries and both dependency activations at start/midpoint/end. Contact sheets alone are insufficient.
2. Read lane names, Waiting/Done, artifact IDs, two criteria and final finding without enlargement. Ensure bar labels and dependency elbows never overlap. The complete Needs revision / Rollback missing ending must fit at the specified sizes.
3. Verify Check never runs before D1 arrival; Assemble never runs before F1 completion; D1/F1 identities persist; no simultaneous dependent execution or premature approval indicator appears.
4. A beginner should explain what Check was waiting for, why it starts after Draft, and what the final result retains. They should not conclude that a completed checker means a passing draft.
5. Preserve granular field-check timing and the settled evidence holds. Extend runtime rather than compressing these states. The ending is finite and intentionally unresolved as content needing revision.
6. Draft C-family, checker E-family, assembler G-family identify actors. Waiting lanes remain silent. Listen to actual encoded audio before claiming perceived synchronization or timbre quality; signal analysis alone is not listening. Check peaks below −0.5dB.
7. Later implementation uses repository-pinned Puppeteer and cut-local engine copies/helpers. No public/site/shared-skill edits, other lessons, Git operations or deployment. This task creates only this plan.
8. Later review must decode the full MP4, check audio and streaming metadata, reproduce suspected visual faults with alternate extraction, and bind its decision to the exact full SHA-256. No render, encoded review or actual listening is claimed here.
