# Fresh comparative teaching and defect review: human control and tracing

Reviewed 2026-10-20. Reviewer 4. **Recommendation: revise both sequences before replacing their original recommended cuts.** Retain the expanded lesson structure and captions: they add useful definitions, boundaries and caveats. The current encodes often substitute a generic moving label for the mechanism being explained. More running time has not yet produced proportionately more demonstrated understanding.

Both comparison manifests selected `astra`. That field alone was exposed before review; no prior scores, authoring source or storyboards were consulted. These are fresh judgments of the encoded videos against the two intended `lessons.json` files. No source, media, comparison manifest or promotion state was changed. No input/access blocker occurred. The editorial issues below are reasons to revise, not claims that the review could not proceed.

## Evidence and scope

All ten new clips were inspected at **0, 3.5, 10.5, 17.5, 24.5 and 27.9 seconds**, individually at native 1080×1920 and as 350-pixel-wide images. One-second scout sheets covered each full clip to locate activity. Additional busy frames were examined at both sizes; caption/state boundaries were checked at 6.9/7.0, 13.9/14.0 and 20.9/21.0 seconds in 350-pixel sheets. Sampling is not continuous real-time playback and does not exclude subsecond defects between samples.

| Topic | Clip 01 busy | 02 | 03 | 04 | 05 |
|---|---:|---:|---:|---:|---:|
| Human-in-the-loop | 8s | 8s | 22s | 8s | 15s |
| Observability-and-tracing | 8s | 24.5s | 15s | 15s | 15s |

Both original cuts were inspected with full-duration scout sheets and 350px samples at 0, 3.5, 7, 10.5, 14, 17.5, 21, 24.5 and 27.9 seconds; human control additionally at 29.9s. Native comparison details were inspected at human 14/24.5/27.9s and tracing 10.5/14/21s. All times below are local to the named clip.

Scratch evidence is in `reviews/sequences/scratch/reviewer-4/`: `<topic>-<clip>/required-350.jpg`, `scout.jpg`, timestamped native PNGs, `extra-350.png`, probes, decode logs and spectra. Input SHA-256 values are recorded below and in `hashes.json`; `checks.json` records media checks. Captions are allowed and beneficial. These are finite lessons: no looping/reset requirement was applied and ending holds were not penalized merely for differing from the opening.

## Scores

Scores are 1–5: 1 substantially broken/misleading, 2 material weakness, 3 serviceable with caveats, 4 strong with limited omissions, 5 exceptionally clear and well demonstrated. Accuracy includes the depicted state as well as wording. Pacing judges information gained over time from sampled progression, not an audition. Sequence scores are editorial judgments, not rounded means. Original-cut scores assess their narrower scope; they do not imply coverage of the expanded curriculum.

| Video | Causal clarity | Accuracy | Pacing | Legibility |
|---|---:|---:|---:|---:|
| Human 01 — Propose, review, execute | 3 | 4 | 2 | 4 |
| Human 02 — Give the reviewer evidence | 3 | 4 | 2 | 4 |
| Human 03 — Pause without guessing | 2 | 3 | 2 | 4 |
| Human 04 — Reject an approval mismatch | 4 | 4 | 3 | 4 |
| Human 05 — Record the outcome | 2 | 3 | 2 | 4 |
| **Human sequence** | **3** | **3** | **2** | **4** |
| Human original astra | 5 | 4 | 4 | 4 |
| Tracing 01 — One operation is a span | 3 | 4 | 3 | 4 |
| Tracing 02 — Related spans form a trace | 3 | 4 | 2 | 4 |
| Tracing 03 — Cross a service boundary | 3 | 4 | 2 | 4 |
| Tracing 04 — Visibility is not a speedup | 3 | 3 | 2 | 4 |
| Tracing 05 — Missing and sensitive data | 3 | 4 | 2 | 4 |
| **Tracing sequence** | **3** | **4** | **2** | **4** |
| Tracing original astra | 5 | 4 | 4 | 3 |

## Human-in-the-loop: lesson-by-lesson

**01:** The role split and preparation-versus-permission captions are a useful introduction. At 8s, `PROPOSAL` travels to the reviewer; at 17.5s the executor says `waiting`. However, 0–6.9s provides almost no visual development, and 14–27.9s largely holds that waiting state while captions explain the boundary. A visible closed authorization gate or unavailable execution capability would demonstrate why the proposal cannot deploy. The absence of execution is correct for this lesson; it is not a defect by itself. At 350px the text remains readable, while the faint dotted connector contributes little.

**02:** At 8s `A + EVIDENCE` arrives; by 17.5s the decision record says `A approved`. This correctly makes approval artifact-specific. Yet production, test results and risk are named in captions without becoming inspectable evidence. The viewer never sees what the reviewer actually evaluates. Use the existing reading time to reveal a small proposal card containing artifact A, target production, one concrete test result and one risk, then preserve those fields in the decision. At 24.5–27.9s the reminder to check identity is clear, but the diagram adds nothing beyond the record already shown.

**03:** Saving `pending A` and explicitly refusing to treat waiting as consent are valuable additions absent from the original. At 22s the returning `DECISION` chip overlaps the right edge of the saved-state box, making its bypass route less distinct; it remains readable. More materially, the workflow still says `still paused` at 24.5 and 27.9s after the decision has arrived, while the caption says a decision can resume the workflow and requires revalidation. This is an unresolved teaching state: continued pause could be valid pending validation, but that reason is not shown. Depict `decision received → revalidating` without implying immediate execution. Persistence also remains an assertion: no restart/reload demonstrates survival of the saved state.

**04:** The strongest new human-control clip. B versus approval A is visible from 0s; separate input packets feed the executor around 8–12s; at 17.5s it is explicitly `blocked`. The ending correctly calls for reviewing B without deploying it. The busy 8s artifact packet overlaps the approval box edge, though not its text. A visible `B ≠ A` check and unchanged production would make the consequence more immediate, as in the original. The 21–27.9s instruction to review B has no corresponding new action, but is a valid finite conclusion.

**05:** A definite state defect persists at 17.5, 24.5 and 27.9s: `outcome recorded` coexists with an amber executor still labelled `executing` and a full progress bar. At 15s `A + RESULT` is already travelling away. This leaves an apparent unfinished operation inside a lesson about reporting what actually happened. Show a terminal execution state and an explicit result tied to A; approval alone must not imply success. Permission checks and protection against repeated effects are currently caption-only. A single retry encountering an existing outcome would make the latter understandable. Also, 04 ends with B awaiting its own review, whereas 05 opens with approved A: label this a separate example or carry B through a fresh approval so the sequence does not seem to undo its previous lesson.

**Comparison:** The original visibly connects approval A, changed artifact B, the failed `B ≠ A` check, a closed gate and unchanged production at 14s; it then shows fresh approval B, `B = B` at 24.5s and `B LIVE` at 27.9s. That continuous chain is stronger than the new disconnected examples. The five clips total 140s versus 30s originally, but add valuable evidence, durable-pause and outcome concepts. Keep that breadth and explanatory prose; restore concrete state transitions. For now, prefer the original as the visual overview and revise the new sequence before promoting it as the primary explanation.

## Observability-and-tracing: lesson-by-lesson

**01:** At 8s the tool progresses while `START` travels toward its record; by 17.5s the record contains `duration + status`. This communicates an operation with a lifecycle, and the concluding caption bridges to multiple spans. It does not yet show a duration or outcome value. Replace those category names with a small example record containing start/end, elapsed time and observed status. Do not imply every successful span must explicitly use `OK`. The title is an introductory simplification; instrumentation is what creates the record, not the mere existence of work.

**02:** Model span M and tool span U retain trace T, visible together by 17.5s. That distinction is useful. At 24.5s `SPAN U` travels into `TRACE VIEW`, but the destination remains visually empty at 27.9s. The caption promises grouping and parent links; no actual parent identifier or assembled tree is displayed. The diamond uses similar dotted lines for relationships and export, which a newcomer could confuse. Give the agent a span ID, show the children's matching parent IDs, and assemble a miniature tree in the view. The current text fits at 350px; additional fields should replace empty space rather than shrink type.

**03:** The sequence explicitly says context must cross the service boundary and that spans must also be exported. At 15s the request carries a generic `REQUEST + CONTEXT`; by 17.5s the receiver says `child in trace T`. The causal claim is sound, but the essential data stays hidden. Show shortened `trace=T, parent=A` entering a request carrier, extraction, then `span=U, parent=A, trace=T`. Keep the export caveat. Compared with the original's broken-versus-propagated contrast, this clip gives more prose but less evidence of what would fail without the carrier.

**04:** The title and ending correctly distinguish better visibility from faster execution. The unchanged 3.0s total is visible at 24.5s. Two problems weaken the example. First, at 17.5–27.9s the view has changed from `tool disconnected` to `tool: 2.4s` but retains the red failure border. Second, the propagation repair is represented by a packet moving from tool to view at 15s, rather than a corrected request boundary; this can blur propagation and export. The numeric example is described as illustrative/sequential in the intended text, but those qualifications are not in the encoded captions. Restore a labelled sequential timeline and distinguish a later instrumented run from retroactively repairing an already completed trace. The original's separate Run A/Run B makes this clearer.

**05:** The 7–13.9s caption explains field minimization; 14–20.9s separately explains omitted spans; 24.5–27.9s warns that absence is not proof the operation did not occur. Those caveats substantially broaden the original. Visually, however, `sensitive fields cut → PARTIAL TRACE → coverage gaps` can suggest redaction caused missing spans. Show one attribute removed from a retained span, and independently show another span absent due to collection loss or sampling. This is a diagram ambiguity rather than a claim that the captions equate the two. Sampling policy can omit whole traces or spans; avoid teaching that every sampling scheme necessarily produces partial traces.

**Comparison:** At 10.5s the original shows mismatched trace IDs and a broken link alongside a 0.6s/2.4s timeline. At 14s a new run explicitly introduces injection/extraction; by 21s the spans share a trace while durations remain unchanged. It demonstrates the repair and invariant better than the new 140s sequence does in five times its 28s runtime. The new sequence is easier to read and adds span basics, export and collection/privacy limitations. The original is not flawless: at native 21s its `TRACE / SPAN` legend is partially obscured (`ACE / SPAN` visible), and at 350px its low-contrast qualifier and dense identifiers are harder to read. Retain it as the comparative overview, not as an untouchable template; revise the expanded sequence to preserve its larger typography while recovering the actual ID and timeline mechanisms.

## Ranked revisions

These are review recommendations only. Expected effects are editorial estimates, not measured learning outcomes.

| Rank | Evidence / what is visible | Concrete change | Expected effect |
|---|---|---|---|
| 1 | Human 05, 17.5–27.9s: recorded result with `executing` | End the executor state; show A plus explicit success/failure | High: removes a contradictory conclusion |
| 2 | Human 03, 22–27.9s: decision arrives, pause persists unexplained | Show decision receipt and revalidation, with an explicit reason if still paused | High: completes the pause/resume mechanism |
| 3 | Tracing 04, 15–27.9s: export-like repair and persistent red border | Distinguish new run/request propagation from export; clear failure styling on repair | High: prevents two concepts being conflated |
| 4 | Tracing 02, 24.5–27.9s: empty view despite grouping caption | Display root/child IDs and assembled parent tree | High: demonstrates what makes related spans a trace |
| 5 | Tracing 03, 8/15/17.5s: generic context labels | Reveal carrier fields and their extraction into the new child | High: makes the boundary mechanism concrete |
| 6 | Human 02, 8–17.5s; Human 05, 0–17.5s: generic evidence/result | Show a compact evidence card and outcome record; preserve artifact identity | High: delivers the requested granularity |
| 7 | Tracing 04, 0–27.9s; tracing 01, 17.5s | Add an illustrative sequential timeline and one actual span record | Medium–high: separates elapsed time from diagram layout |
| 8 | Tracing 05, 15–27.9s: redaction followed by partial trace | Animate field removal separately from missing-span coverage | Medium–high: clarifies distinct collection limitations |

Across both sequences, retain captions and use the long holds for these demonstrations. For example, human 01 at 3.5s versus 6.9s and tracing 03 at 17.5s versus 20.9s give essentially the same diagram and reading task. Do not simply accelerate all text: the goal is more explanatory steps per lesson. Strengthen faint connectors at 350px and move human 03/04 side packets farther outside node edges. Preserve finite concluding holds with correct states; no loop seam is needed.

## Technical and audio verification

All 12 MP4s decoded completely with ffmpeg, exit 0 and no error output. Each new clip is 1080×1920 and 28.000s; the human original is 30s and tracing original 28s. All have `moov` at byte 32 before `mdat`, supporting progressive playback metadata placement. This is not a browser delivery, hosting or real-device playback test.

**No audio was listened to.** Audio scope is full-file decoding, ffmpeg level measurement and visual spectrogram inspection only. Spectra show sparse transient activity in the new lessons and more frequent activity in the originals. They do not establish pleasantness, intelligibility, masking, exact perceptual synchronization or speaker playback level. No audio-quality pass is claimed, and no narration is inferred from intended text.

| Clip | Human mean / maximum dBFS | Tracing mean / maximum dBFS |
|---|---|---|
| 01 | -47.3 / -15.1 | -41.6 / -10.6 |
| 02 | -42.9 / -10.4 | -39.9 / -10.5 |
| 03 | -42.8 / -10.5 | -42.9 / -10.4 |
| 04 | -44.4 / -15.1 | -44.3 / -10.5 |
| 05 | -42.6 / -10.5 | -42.6 / -10.5 |
| Original astra | -32.2 / -5.7 | -36.0 / -11.0 |

These measured sample maxima show headroom; they are not true-peak or integrated-loudness measurements. Sparse signals explain low full-file means, so those means alone do not justify increasing gain. An actual listening pass remains necessary for an audio sign-off.

## Factual cross-check limits

The tracing definitions were cross-checked against primary OpenTelemetry documentation on 2026-10-20. A span represents an operation with timestamps and context; parent IDs express hierarchy, and exporters send recorded telemetry to consumers. This supports the lessons' basic distinctions but also motivates showing actual parent fields. [OpenTelemetry: Traces](https://opentelemetry.io/docs/concepts/signals/traces/).

Context propagation carries trace and parent identity across a boundary through injection/extraction; a carrier such as `traceparent` makes that concrete. This supports tracing 03's explanation, while tracing 04's tool-to-view animation is an editorial ambiguity, not evidence of an implementation bug. [OpenTelemetry: Context propagation](https://opentelemetry.io/docs/concepts/context-propagation/).

Human-control judgments assess the stated illustrative contract and visible consistency; no production authorization, persistence or retry implementation was inspected. This review does not certify such a system. Human promotion remains a separate editorial decision.

## SHA-256 binding

The table below binds the judgments to the exact media and intended lesson text. The accompanying `scratch/reviewer-4/hashes.json` additionally hashes the two comparison manifests and all four instruction/reference files read. Hashing the comparison bytes did not expose their other fields or scores. Final input revalidation and scratch evidence hashes are recorded in `scratch/reviewer-4/final-integrity.json` and `scratch/reviewer-4/evidence-sha256.json`.

| Input | SHA-256 |
|---|---|
| `public/lessons/human-in-the-loop/01.mp4` | `afa9b7304f8e4bcb1239c43277eef946ff7e8a6dcb7c4d1aaf0153325c55fed7` |
| `public/lessons/human-in-the-loop/02.mp4` | `095b3d27e8c4d3845e19ef1f90bebf442f5981937d7aef1365efee34b295d1af` |
| `public/lessons/human-in-the-loop/03.mp4` | `0e79e9c5fcdfba152369d4b0172690805311056495738b438cb363298b5abcd6` |
| `public/lessons/human-in-the-loop/04.mp4` | `d7f75c68f8947c4db123e67689d406848f3330c2ba26df658c668bdc77aa548f` |
| `public/lessons/human-in-the-loop/05.mp4` | `f000bb269eba84842c85df0ed95d39379cfad59d169cce5df8b8b946e47de9dd` |
| `public/lessons/observability-and-tracing/01.mp4` | `f92fb047f0b0cff610a0c7b54baddb3defbb954e358bb04edd99c21f0e4be0d9` |
| `public/lessons/observability-and-tracing/02.mp4` | `7c8b5e2f359817b98b058ecc2dc231e912fd5357e3bd115aad543e8f7e6f9c1f` |
| `public/lessons/observability-and-tracing/03.mp4` | `45e937c05526a09be4e20a8bcba860fcce6df8ecf3c6e0c06e0ea6e83603d6d2` |
| `public/lessons/observability-and-tracing/04.mp4` | `81847f43d5c0897cffb842915a24804e2a4831eed51f471eaef7b78f634f60b0` |
| `public/lessons/observability-and-tracing/05.mp4` | `acd608d62b27e5bd808876fce6ce13d25356cf1196fa8823dcaa1cf9d8cf8f5c` |
| `public/media/human-in-the-loop/astra.mp4` | `a1aa02083b41b0decc40300bc0263699596150a6973b3221b91f693cf238f3d9` |
| `public/media/observability-and-tracing/astra.mp4` | `6541372dd63774fd44ba11334a77e25797a4448767ca4f6529eb0d6e2132a768` |
| `video/human-in-the-loop/sequence/lessons.json` | `6038944747da985c48957d39605c7bf388e6423d569735441faaaef2f8605ada` |
| `video/observability-and-tracing/sequence/lessons.json` | `186263abb7719fd6319957d0a002da6337ef0f0b3009692a8eddf74204f84757` |


---

## Current repaired-encode verification — 20 October 2026

**Disposition: PASS for the targeted visual repair verification.** All ten current clips were inspected from decoded MP4 pixels at changed beats, post-arrival states and the final hold, at native resolution and 350px width. No remaining blocking semantic contradiction was observed in those states. In particular, H03 now reaches revalidation, H05 reaches an actual deployed outcome, and O04 retains its repaired green trace view. The earlier report above is retained verbatim as historical evidence; its defect findings and scores describe its earlier hashes. This addendum supersedes the earlier repair-blocking disposition for the hashes below. It does not retrospectively change those scores or claim a fresh complete comparison against the original cuts.

### Scope and evidence

H = `human-in-the-loop`; O = `observability-and-tracing`; numbers identify `public/lessons/<topic>/NN.mp4`. Read the current intended lesson JSONs and the repair notes in `reviews/sequences/rollout-progress.md`. Repair claims were treated as hypotheses and checked against encoded pixels. No authoring source, storyboards or other reviewers' scores were consulted. Only this report and reviewer-4 scratch were written.

For every clip, reviewed 350×622 decoded frames at **0, 8, 10.5, 15, 17.5, 22, 24.5 and 27.9 seconds**, displayed at their actual 350px width in contact sheets. Native 1080×1920 inspections covered the following frames, including every final hold; additional arrival checks were also viewed individually at 350px. These are sampled-frame findings, not a claim to have watched every intervening frame in real time. Videos are judged as finite lessons; there is no loop-seam requirement.

| Clip | Native frames visually inspected (seconds) |
|---|---|
| H01 | 8, 10.5, 17.5, 27.9 |
| H02 | 10.5, 15, 17.5, 27.9 |
| H03 | 10.5, 22, 23.5, 24.5, 27.9 |
| H04 | 8, 10.5, 12.5, 17.5, 27.9 |
| H05 | 0, 3.5, 10.5, 13, 15, 17.5, 27.9 |
| O01 | 10.5, 15, 17.5, 27.9 |
| O02 | 10.5, 17.5, 23.5, 24.5, 26.5, 27.9 |
| O03 | 8, 10.5, 15, 17.5, 27.9 |
| O04 | 0, 15, 16.5, 17.5, 19.5, 22, 27.9 |
| O05 | 10.5, 15, 17.5, 27.9 |

Additional native/350 arrival checks: H01 10.5; H03 23.5; H04 12.5; H05 3.5 and 13; O01 10.5; O02 23.5 and 26.5; O04 16.5 and 19.5. Evidence is in `scratch/reviewer-4/repair-final/`, with native PNGs, corresponding `-350.png` derivatives and per-clip `states-350.png` contact sheets. File names encode timestamps. Full-file FFmpeg decoding succeeded for all ten MP4s with exit 0 and empty error output. All ten MP4s and both lesson JSONs had matching before/after SHA-256 hashes.

**Audio scope:** no listening audition or new loudness/synchronization assessment was performed in this repair pass. Successful decoding is not evidence of audible quality. Earlier audio observations remain bound to their earlier files; this visual pass does not extend them to changed encodes. Browser playback and page integration were not tested.

### Repair results, clip by clip

| Clip | Current encoded evidence | Result |
|---|---|---|
| H01 | At 8s proposal movement is visible; at 10.5s the reviewer is neutral while the caption says a decision is still required. At 17.5s and 27.9s the executor remains waiting. | Pass. Ending at a deliberate approval gate is coherent; a neutral arrival pulse is not an approval. |
| H02 | At 10.5s the reviewer carries concrete evidence, `A; prod; 12 tests pass`. At 15s `APPROVE A` moves to the decision; at 17.5s and 27.9s the green decision says `A approved`. | Pass. Evidence now has inspectable content and the approval retains artifact identity. Text fits and is readable at 350px. |
| H03 | At 10.5s saved state is `pending A`; at 22s `A: YES` is still in transit and the workflow is still paused. At 23.5s, 24.5s and 27.9s the workflow says `decision: revalidate`. | Prior terminal-state defect resolved. The arrival advances the workflow without claiming execution. The saved pending-action snapshot does not contradict revalidation before execution. |
| H04 | At 8s the narrow B packet clears the side route; at 10.5s the A approval packet leaves its box without obscuring the identity text. At 12.5s arrival glow is neutral; by 17.5s the executor is red/blocked and remains so at 27.9s. | Pass. Both incompatible identities remain visible, with an appropriate blocked outcome. No label clipping was observed in these changed/busy states. |
| H05 | At 0/3.5s the caption explicitly introduces a separate run for approved artifact A. At 10.5/13s execution progresses. At 15s the executor is green `A deployed` while `A: SUCCESS` travels to the record. At 17.5s and 27.9s the record is green `A: deployed`, matching the executor. | Prior terminal-state defect and B-to-A continuity ambiguity resolved. The ending no longer claims an outcome while leaving the operation executing. |
| O01 | At 10.5s the tool is doing work; at 15s END is in transit. At 17.5s and 27.9s the span record is green `2.4s; exit 0`. | Pass. The record now supplies a concrete duration and process outcome. |
| O02 | At 10.5s model M shows parent A and trace T; at 17.5s tool U shows the same parent/trace. At 23.5s the view is still awaiting assembly, with U's export visible at 24.5s. At 26.5s and 27.9s the green view says `T: A → M and U`. | Pass. Explicit parent identifiers and the final grouping teach the relationship. The first arrival does not falsely claim the whole view is complete. |
| O03 | At 8s `T; parent A` travels to the request; at 10.5s the request reads `trace=T; parent=A`. At 15s the carrier proceeds to the remote tool; at 17.5s and 27.9s its span reads `U; parent A; trace T`. | Pass. Context is visibly carried across the request boundary and used in the resulting child span, with readable fields at 350px. |
| O04 | At 0s the caption explicitly specifies sequential calls and `0.6 + 2.4 = 3.0`. At 15s CONTEXT travels agent→tool under a next-run caption; at 16.5s its arrival has not yet repaired the view. At 17.5s TOOL SPAN travels tool→view. At 19.5s the view is green `linked tool: 2.4s`; at 22s and 27.9s it remains green while the agent still takes 3.0s. | Prior color contradiction resolved. Propagation and export now occupy distinct steps; the repaired view does not revert to red. The unchanged elapsed time supports the stated lesson. |
| O05 | At 10.5s export is green `A kept; token removed`. At 15s SPAN A travels toward the view while the caption separately describes failed export of B. At 17.5s and 27.9s the amber view says `A present; B missing`. | Pass. Redaction preserves A; missing B is a separate completeness problem. The final pixels no longer imply that removing a token necessarily removes a span. |

### Remaining contradictions versus optional teaching refinements

**Actual remaining blocking contradictions: none identified in the inspected repaired states.** No observed post-arrival color rollback invalidates a success, approval, rejection or linked-trace label. Transient neutral glow before a later state change is not itself a contradiction. Captions are valid teaching material under the requested format, and the added concrete values materially improve the explanations.

The following are **optional refinements**, not reasons to reject these repair hashes:

- H02, 10.5–17.5s: show one concrete risk alongside artifact, environment and test evidence if more review depth is desired. The current approval example is already coherent.
- H03, 23.5–27.9s, and H05, 10.5–17.5s: a future separate lesson could demonstrate restart/revalidation, permission denial or duplicate-effect prevention. These mechanisms currently receive caption treatment rather than a full contrasting execution. Their absence is not a contradiction in the illustrated successful path.
- O02, 26.5–27.9s: a miniature tree inside the view could reinforce the textual `A → M and U` grouping. The parent IDs and final relationship already convey the mechanism.
- O04, 15–19.5s: “same 2.4s tool span” could become “a tool span with the same 2.4s duration” to make the next-run comparison more explicit. Split the export caption at arrival if tighter caption-to-state timing is desired. The sequence visibly distinguishes next-run propagation, subsequent export and the linked result; it does not show retroactive mutation of a completed span. A duration timeline would be an enrichment, since sequential execution is now expressly stated.
- O05, 15–17.5s: show a failed B export packet, or delay “the view has A” until A arrives. The caption currently anticipates that beat's outcome; the final state is correct and missing B is explicitly independent of redaction.

The prior broad pacing scores are historical. This targeted verification does not replace them with numerical scores inferred solely from repaired stills. The current evidence supports clearing the identified visual repair blockers while keeping deeper restart, risk and timing demonstrations as editorial choices.

### Current input hashes

SHA-256 values below identify the reviewed bytes, captured before frame extraction. All ten encoded videos and both intended-text files were unchanged at the final integrity check. The rollout-note hash identifies the notes consulted, independently of subsequent rollout activity.

| Reviewed input | SHA-256 |
|---|---|
| `public/lessons/human-in-the-loop/01.mp4` | `92483870adbdf66eb62cffc7af718b3c2d13e05e7692a5545185a662ebd7df5f` |
| `public/lessons/human-in-the-loop/02.mp4` | `767bf4e0b88ba0769d80f508d61688e5613b304ad1d3c902571497df3f90c437` |
| `public/lessons/human-in-the-loop/03.mp4` | `af02835ae971aae3ad352b0fd47bb6dfd20f835a6c2cf23df4f13509a8d36169` |
| `public/lessons/human-in-the-loop/04.mp4` | `fb1cd80579bd44658c0f826176071324c8c5a0cb8303ea99643568f3ce0c2b11` |
| `public/lessons/human-in-the-loop/05.mp4` | `5c8a99ff1fbbc049e6998333ea68ec752a7f8ef67884ac7a3e1ad18bd31f64be` |
| `public/lessons/observability-and-tracing/01.mp4` | `d53b9a759c9bd65331add09a03645bff7dc14b6b4cdd61911b0c61614b7708a4` |
| `public/lessons/observability-and-tracing/02.mp4` | `dfb1eeb4bca9c24037b2be9117d97986791d48280a92e14ac71ea819f8b94136` |
| `public/lessons/observability-and-tracing/03.mp4` | `9e0cf51e68ecea563a072d2f87c5700d545f0ccd94378bf99674a60ce1532a8f` |
| `public/lessons/observability-and-tracing/04.mp4` | `dfbe143ea88d10870093ed8d483595b2f32576b5a669768c6b039d734eb0007e` |
| `public/lessons/observability-and-tracing/05.mp4` | `1b870595c9d7b384e3e306de453830696dcba86ea682c0eba77067342cbeb335` |
| `video/human-in-the-loop/sequence/lessons.json` | `daba9a6131ddfa8ea20161ba64e8bfacf9b179d3e16880e660089622d585dc13` |
| `video/observability-and-tracing/sequence/lessons.json` | `6faca507e94765dae5054f2559b0b821579525134b0c538f1ef7f37ea9a8e3ee` |
| `reviews/sequences/rollout-progress.md` | `a037c4da5d7732021a65ff8402c05f37d38d323fdf7d798fae393ad476b47eeb` |

Historical report prefix preserved: **18,800 bytes**, SHA-256 `c92c45a05147bd186edcd95fd532f7649d42ab00d5299db39457d2aa542001f1`. `scratch/reviewer-4/repair-final/verification-integrity.json` records the after-check hashes, decode results and inspection coverage; `evidence-sha256.json` in that same directory hashes the new evidence and appended report. Earlier scratch evidence is retained unchanged.
