# Lesson 05 — Abort and verify recovery

## Teaching contract

Plan only. One mechanism: a failed candidate check stops expansion; new requests return to v1 control; fresh evidence is required before declaring the observed service behavior recovered. Keep v2 visibly failed throughout. The traffic decision is not proof of service health or data repair. Target 48 seconds, finite ending, no narration or on-screen paragraphs. All counts, thresholds, durations, and outcomes are illustrative fixtures, not operational guidance. Persistent readable chip: `Illustrative`.

Use software-native request chips, version panels, routing configuration, observation counters, and stored-record rows. No physical metaphors, crash spectacle, repair magic, deployment commands, new rollout mechanisms, or lesson-six promotion story. Begin with the failed release check already available; do not reteach its calculation.

## Evidence and assumptions

- Opening evidence, retained from the concept's example: candidate export failures `40/100`, control export failures `0/900`. Show `Release check ×` and `v2 candidate`; this is a failed check, not a dead process.
- Action: freeze expansion, request new-traffic allocation `v1 100%`, `v2 0%`. Distinguish this target from measured routing. Display `Applying…` until a separate observation arrives. The animation's transition duration is not a timing promise for routers.
- Fresh illustrative observation: a new five-minute window AFTER routing confirmation, with 10,000 total new requests to v1 and zero new requests to v2, including 1,000 exports. Three animated requests are representative examples, not the denominator for the counters.
- Predeclared exercise acceptance criteria: complete five-minute window and 10,000 total requests; zero service errors; 1,000 export results with zero errors and matching expected CSV output; observed p95 latency no more than 250 ms at the resumed load. Actual fixture: `0/10,000 errors`, `1,000/1,000 valid`, `p95 180 ms`. Explain p95 visually as `95% ≤ 180 ms`, compared to `≤ 250 ms`; no unexplained acronym is required on screen.
- These criteria are an editorial exercise choice, not a claim that any finite clean window establishes universal safety. The observed window supports only `Service checks pass` / `Observed: 5 min`. Missing, failing, or incomplete evidence keeps the outcome pending; it never turns green merely because traffic moved.
- Assumed for this successful service-check example: v1 remains available and has sufficient capacity; the observed workload represents the named export checks. Neither follows from abort. Persistent-data integrity and schema compatibility are separate, unproven questions. Fresh successful requests do not settle them.

## Stage and legibility

1080 × 1920, 30 fps, speed 1. Background #050506, foreground #E6E8EC. White text carries all essential meaning; green checks, red crosses, and amber question marks supplement labels. Keep content within x=80–1000 and y=240–1740. Title `Abort + verify`, 88 px, at (540,300); stage labels 58–64 px; numeric evidence 72 px. At actual 350 px width these become approximately 19–24 px; never rely on the skill's 24-source-pixel minimum. Maximum three evidence rows at once. Long plan explanations stay off screen.

Three distinct compositions use stable actor identity and restrained 0.4–0.6-second transitions:

1. Release-check panel centered (540,850), width 880, then a routing diagram. Requests box center (540,580), 540×150; router (540,870), 520×190; v1 (290,1200) and v2 (790,1200), each 380×240. Wires: requests.bottom (540,655) → router.top (540,775); router port (410,965) → (290,1080), and (670,965) → (790,1080). Route labels sit above version panels, never on packet paths. In-flight work sits inside v2, not on the incoming route.
2. The routing diagram reduces to a compact version header; a fresh observation panel expands at (540,1090), width 880. Rows centered y=930,1160,1390. Each row presents criterion first, then its observed result in the same space. Window strip spans (140,640)–(940,640).
3. Final limitation view uses vertically stacked software-state cards, not a tiny side column: work at (540,800), stored row at (540,1110), compatibility at (540,1410). Each card is 880×220. Finish with a service-result header and amber data status, without converting the entire screen to a green success panel.

## Six-beat sheet

| Time | What moves | State change and reading hold | Synthesised cue |
|---|---|---|---|
| 0.0–6.0 | 0.0–0.6 reveal v2 export check; 0.8 candidate count appears; 1.6 control count appears; 2.4 failed check stamps ×; 3.1 a short expansion strip stops at its current position; future segment dims. | `40/100` versus `0/900`, both under `Export errors`; `Expansion stopped` lands at 3.8. Hold 3.8–5.6. No candidate health reset. 5.6–6.0 transition. | Evidence `arrive` G5; failed check `thump` G4 at 2.4; stopped expansion short router E5 tick at 3.1. |
| 6.0–13.5 | Routing view opens. 6.6 target allocation changes; 7.2–8.7 `Applying…` pulses once. An already-admitted v2 request remains busy. 8.9 a distinct observed-routing mark appears; 9.4, 10.2, 11.0 three NEW request chips traverse only v1. | Target `100% / 0%` is initially amber. At 8.9 confirmed routing enables `New → v1` and `v2: 0 new`. Do not animate instant universal convergence or erase old v2 work. Last arrival 11.6; hold through 13.1, transition to 13.5. | Router target `work` E5; observed routing `ack` E5; arrivals C5 for v1. Existing v2 work retains sparse G4 tick. No recovery chime here. |
| 13.5–19.0 | Observation panel grows out of v1. Previous failure result becomes a small but legible `v2 failed` badge. 14.0 show `Fresh window`; criterion strip `5 min · 10,000` appears. At 15.0 an empty observation row shows an amber dash; 16.0–17.0 window advances to its first mark. | Empty data is `Pending`, never zero. `Time compressed` accompanies the advancing strip. Service status remains pending while route status is confirmed. Hold 17.0–18.6; next row transition 18.6–19.0. | Observer `work` A4 for new window; two restrained `clock` A4 cues for progress. No success sound on an empty row. |
| 19.0–28.5 | 19.0 service error criterion `Errors = 0` appears; 20.0 actual `0/10,000` settles. 21.8 export expected-output outline appears; 22.6 a returned CSV aligns with it, count settles `1,000/1,000 valid`. 24.4 latency limit `95% ≤ 250 ms` appears; 25.3 observed `95% ≤ 180 ms` settles. 26.2 window reaches `5/5 min`. | Keep errors, export validity, and latency separate. Each result gets roughly 1.5 seconds to read before another moves. All counts come from the same fresh completed fixture window. At 26.5 observer marks `Service checks pass`; hold to 28.5. Candidate remains failed. | Observer `ack` A5 on each measured row, quieter than failure cue. One restrained two-note `chime` A5/C6 only at 26.5 after the completed window and all criteria. |
| 28.5–39.5 | 28.5–29.0 expand three software-state cards. 29.0 reveal `In flight: 1`; existing v2 work continues ticking under `0 new`. 31.8 bring an already-written record into focus; its value remains unchanged while a small routing indicator points to v1. 34.8 reveal `v1 ↔ schema ?`, with a read attempt ending at a question marker, not a success tick. | Work card `Not cancelled`; record card `Write remains`; compatibility card `Unverified`. Give each state roughly two seconds of quiet attention. No reverse write animation, disappearance, process restart, or automatic compatibility claim. Hold last comparison 37.0–39.0; transition to 39.5. | Existing v2 `work` G4 at 29.0 and 30.0; stored record focus quiet `arrive` D5 at 31.8, NOT `store` because no new write occurs; unanswered compatibility soft `thump` D4 at 34.8. |
| 39.5–48.0 | 39.5 service result returns above the persistent record; 40.4 `Observed: 5 min` appears. 42.2 stored row gains amber `Repair may be needed`. 44.0 failed-candidate badge and `0 new` settle beside the service status. | Closing distinction: observed service checks pass, v2 remains failed, data needs separate assessment. No blanket `Recovered` or `Rollback safe` banner. Hold coherent final state 44.0–46.3; fade stage and title 46.3–47.2, then end at 48.0. No forced reset or loop. | Soft observer `ack` A5 at 40.4; data question cue D4 at 42.2; quiet router E5 confirmation at 44.0. No triumphant chord or repeated idle ticks. |

## Sound implementation

Use synthesised sine mallets and short filtered ticks, with approximately 80 ms quiet echo. Actors retain pitch across layout changes: router E5, v1 C5, v2 G5/G4, observation A5/A4, stored data D5/D4. Requests use a quiet high send tick; returns use the receiving actor's pitch. Pan gently with actor position but retain identity in mono. The failed release check is the strongest event; never use a machine-crash sound to imply the entire candidate process has crashed. Holds are mostly silent. No music or voice competes with evidence. Avoid an ongoing v2 tick beneath every observation number; show that work still exists without making it the visual focus.

## Accuracy boundaries and relevant references

Read lesson item 5 and the concept file as the local scope and fixture source, plus the architecture-flow-video skill's style, engine API, and review references. External primary references checked 2026-11-04:

- [Argo Rollouts analysis overview](https://argo-rollouts.readthedocs.io/en/stable/features/analysis/#background-analysis): its example sends canary weight to zero after failed analysis and leaves the rollout degraded. Supports retaining the failed candidate status. It does not establish instantaneous router convergence or recovered service health.
- [AWS: Ensuring rollback safety during deployments](https://aws.amazon.com/builders-library/ensuring-rollback-safety-during-deployments/): compatibility of readers, writers, protocols, and persistent state needs deliberate verification. Supports the separate schema/data question; do not teach its implementation mechanisms here.

The routing-versus-in-flight distinction follows the scope of the action: changing destinations for NEW requests is not a cancellation action for already-admitted work. Likewise it issues no inverse operation for completed writes. These are explicit semantic limits, not a claim that every runtime handles outstanding requests identically. Data repair remains outside the depicted mechanism.

## Later acceptance checks; not performed by this plan

- Render representative and boundary frames, including the busy frame, and inspect actual 350-pixel-wide images without zoom. Verify numbers, labels, question markers, and retained candidate status; reduce content if necessary rather than shrinking typography.
- Watch muted: failure must precede stopped expansion; target must precede observed routing; v2 receives no new chips after confirmation while pre-existing work remains; recovery status cannot precede the completed evidence window.
- Verify counts and labels against the fixture and ensure the five-minute observation is explicitly compressed. No invented assertion of measured real-world performance.
- Check every beat and transition for stale marks, packet/label collisions, and unearned green status. Sample just before and after 8.9, 26.5, and 39.5 seconds, where meaning changes.
- Listen to the eventual encode in stereo and mono, check cue alignment and peaks below -0.5 dBFS, and distinguish actual listening from audio analysis in any later report. Decode the full file and inspect streaming metadata only when a video exists.
- Beginner check: viewer can identify which version gets new requests, what evidence supports the service conclusion, and three things rerouting does not do: cancel existing work, undo writes, establish schema compatibility.
- This deliverable contains only a plan. No render, listening, comparative review, recommendation, deployment, or repair is claimed.
