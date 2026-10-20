# Tool design and memory architecture: fresh comparative review

Reviewed 20 October 2026. Reviewer 2. **Both sequences need revision before promotion as replacements for their recommended originals.** They add useful vocabulary, explanatory captions, and more reading time. However, the diagrams often name an operation without demonstrating its inputs, decision, or lasting outcome. The most definite defect is tool 02's validation state contradicting the successful call. Memory 01 leaves the central retrieval-to-input handoff unresolved.

The recommendation is to retain the expanded lesson structure and add concrete, persistent state changes. The user wants granular explanations: compressing everything back to a thirty-second reel would discard useful scope. Captions are permitted. These are finite lessons; no loop-seam requirement or penalty applies.

## Scope and verification

Read the repository AGENTS.md, docs/editorial-workflow.md, and the requested architecture-flow-video review reference. Read both intended lessons.json files. Before viewing, extracted only `recommended` from each comparison JSON: both selected `astra`. No authoring implementation, storyboards, prior review scores, or other comparison fields were inspected. Reading bytes to calculate a whole-file hash does not constitute using other comparison fields as evidence.

Reviewed all ten encoded lesson MP4s, plus the two recommended original MP4s. Every new clip is 28 seconds, 1080 × 1920, 20 fps. Each sequence therefore runs 140 seconds. Original tool design is 30 seconds and original memory architecture is 28 seconds, both 30 fps. Scope differs substantially, so the comparisons below distinguish overlapping lessons from new coverage.

For **each of the ten new clips**, visually inspected decoded frames at **0, 3.5, 10.5, 17.5, 24.5, and 27.9 seconds**, at native 1080 × 1920 and with each image scaled to 350 pixels wide. Also inspected exact transition frames at 6.95/7, 13.95/14, 20.95/21, and the last frame at 27.95, in 350px sheets. Used half-second contact sheets throughout all twelve videos to locate motion and busy moments. These scans are temporal inspection aids, not the 350px legibility evidence. Busy frames listed below were inspected at native and 350px sizes. Original cuts were inspected through half-second scans, nine larger sampled frames at 350px, and native representative busy frames.

This is encoded-frame review, **not continuous real-time audiovisual playback**. Full-stream decoding and audio-level analysis ran successfully for every MP4. No audio was listened to. Event synchronization, sound identity, masking, timbre, perceived loudness, clicks, and listening comfort remain unverified. No subjective audio score is implied by the four scores below. No access or decode blocker prevented the requested visual review.

Evidence is in `scratch/reviewer-2/`: `manifest.json` contains probes, initial hashes and audio measurements; `extra-checks.json` contains container atoms and diagnostic freeze results; topic/clip directories contain extracted native frames, 350px contact sheets, temporal scans and decode logs. `input-hashes.sha256` binds all local review inputs; `evidence-hashes.sha256` binds the generated evidence. Input hashes were checked again at completion.

## Scores

Scores are fresh judgments, not inherited scores: **1** misleading/unusable, **2** major gap, **3** workable with material revision, **4** strong with localized weaknesses, **5** fully convincing within the stated lesson. Accuracy includes consistency of displayed state with the explanation. Missing demonstrations primarily reduce causal clarity, rather than automatically counting as false claims. Legibility includes connectors and transient packets, as well as text.

| Clip | Causal clarity | Accuracy | Pacing | Legibility | Busy frame |
|---|---:|---:|---:|---:|---:|
| Tool 01 — A callable operation | 4 | 5 | 3 | 4 | 24.5s |
| Tool 02 — Make inputs explicit | 3 | 2 | 3 | 4 | 24.5s |
| Tool 03 — Return usable evidence | 2 | 4 | 2 | 4 | 8s |
| Tool 04 — Empty versus failed | 4 | 4 | 3 | 4 | 22s |
| Tool 05 — Expose more pages | 3 | 4 | 2 | 4 | 15s |
| Memory 01 — Current and saved context | 2 | 3 | 2 | 4 | 15s |
| Memory 02 — Choose the memory scope | 2 | 5 | 2 | 4 | 15s |
| Memory 03 — Save a useful record | 3 | 4 | 2 | 4 | 15s |
| Memory 04 — Check applicability | 3 | 4 | 3 | 4 | 22s |
| Memory 05 — Correct outdated memory | 3 | 4 | 2 | 4 | 22s |
| Original tool design — astra | 4 | 4 | 4 | 4 | 24s |
| Original memory architecture — astra | 4 | 4 | 4 | 4 | 14s |

The identical legibility scores reflect a shared visual treatment: clean, readable text and ample separation, but faint inactive connectors. The originals have stronger state contrasts and smaller supporting text. Scores do not establish that the originals cover the new curricula completely.

## Tool design findings

**01 — A callable operation.** The 7–9s model-to-application request, 14–16s execution step, and 21–26s return via the application form a coherent causal relay. This adds an explicit application boundary missing from the original's simpler agent/tool/index diagram. At 24.5s the returning RESULT is readable, and the filled search bar persists at 27.9s. However, a “structured call” is represented only by SEARCH CALL: no operation name, fields, values, or result content survives the animation. The model has no retained evidence indicator at the end. Keep this routing explanation and show a small concrete request and returned incident. The initial 0–7s orientation is long for three empty boxes; use some of it to reveal the operation's contract.

**02 — Make inputs explicit. Confirmed state defect.** By 10.5s validation says `end_time missing`; the error returns toward the model during 14–16s. The correction is then sent during 21–23s, but at **24.5s `VALID INPUT` travels toward search while validation still says `end_time missing`**. That error label remains at 27.9 and 27.95s. This visually teaches that missing required input can pass validation. Replace the old diagnostic only after showing the repaired end_time and a successful recheck. The opening caption names service and time range, but viewers never see actual fields/values, so the corrective step currently cannot be inspected. This is a promotion blocker, not a cosmetic preference.

**03 — Return usable evidence.** At 8s the packet is `IDs + INTERVAL`; by 10.5s the result says `evidence scoped`. At 14–16s EVIDENCE moves toward the model. The 21–28s caption correctly warns that two records are not all history, but there are no actual IDs, short summaries, interval, or cited answer anywhere in the sampled sequence. “Inspectable support” is asserted without giving viewers anything to inspect. The original shows a real example identifier, INC-42, arriving and becoming the agent's answer around 23–26s. Use two short records and one bounded claim, preserving the query interval beside the result. This would make the added duration deliver the requested granularity.

**04 — Empty versus failed.** The captions correctly separate a completed zero-item result from a timeout and finish with uncertainty. At 14s, however, INCIDENT SEARCH switches to timeout while TOOL RESULT still says `empty success`; the half-second scan shows the old result persisting until roughly 16s. The caption announces a new case, so this is an ambiguous carryover between examples rather than proof the implementation converts errors into empty results. Clear the previous result or label it “previous call” before starting the timeout case. By 17.5s the result correctly says `error, not empty`; at 22s SEARCH FAILED moves downward and by 24.5s the model says `answer uncertain`.

The original's approximately 8.5–12s hidden-timeout → empty-list → false zero-matches sequence, followed by explicit error and Unknown around 13–18s, makes the consequence of bad tool design easier to infer. The new clip gives readers more time and stronger prose about scope, but removes that wrong-answer contrast. Add a brief visibly rejected inference, then the corrected uncertain answer. The original also demonstrates a bounded retry around 19.5–24.5s; its omission is narrower curriculum coverage, not an error in this clip.

**05 — Expose more pages.** At 10.5s the page says `more available`; at 15s CURSOR travels up the side route and around 17–19s NEXT PAGE returns toward search. The final 21–28s caption gives a good rule: stop when complete or at a stated limit. Yet no second result or concrete stopping reason appears; `more available` remains at 27.9s. The lesson ends before demonstrating its main decision. Show page 2 with an unchanged service/interval and either no continuation cursor or an explicit budget stop with a partial-result label. The original does not teach pagination, so this is valuable new scope that still needs a completed example.

## Memory architecture findings

**01 — Current and saved context.** The early input-to-model movement establishes supplied context. At 7s the store changes to `not yet supplied`. During 14–16s RETRIEVE travels up the right route toward CURRENT INPUT, matching the caption's instruction to include a record in a new input. However, there is no persistent retrieved record, no distinct new invocation, and no second input-to-model handoff. At 27.9s the store still says `not yet supplied` and the input/model boxes contain no evidence of completion. A store can legitimately contain other unsupplied records; the problem is that the video never distinguishes those from the selected record. Show the retrieved copy added to “next input,” then explicitly supplied to the next model call, while keeping the original stored copy. This is the largest memory teaching blocker.

**02 — Choose the memory scope.** At 0–7s thread A is separated from the shared store; at 7s the shared store gets `service namespace`; at 15s SCOPED RECORD travels to NEW SESSION. Keeping thread A disconnected helps avoid implying automatic sharing of its whole history. The final scope-versus-durability caption is a useful nuance absent from the original. Still, the viewer sees neither a namespace/key example nor an excluded record nor a saved thread resuming. The last seven seconds explain durability over an unchanged scope diagram. Show a named service record available to session B, an unrelated record excluded, and a small persisted-checkpoint example if durability remains part of this lesson. The concept is accurate; its mechanism is under-demonstrated.

**03 — Save a useful record.** The candidate reaches WRITE POLICY in the opening seconds; at 7s `source checked` turns green. At 15s `COMMAND + r1` moves to storage, which later says `versioned record`. This introduces a valuable application-owned write decision. But no actual source, command, scope, or disallowed candidate is visible, so the green approval appears without its grounds. The final 21–28s policy warning has no rejection example. Show an authoritative `npm test` instruction with revision and scope, and briefly reject an unsupported guess. Keep the accepted record visible for the later applicability lesson.

**04 — Check applicability.** The initial `r1: npm test` and `checkout r2` provide concrete evidence. The 7–14s retrieval/check shows a mismatch, and at 14s the instruction changes to use the current source. At 22s `r2: pnpm test` travels toward model input. This is the sequence's clearest substantive memory example. The missing link is provenance: no current repository/source appears as an entity supplying that new command, so it seems to emerge from REVISION CHECK. The original holds the r2 repository and r1 memory on screen together around 12.5–14s, then visibly refreshes from the source around 17–20s. Retain that comparison and source path, with the new captions. At the end, keep `r2: pnpm test` in model input instead of reducing it to `current command`.

**05 — Correct outdated memory.** At 7s the r1 note becomes `r1 superseded`; at 14–16s the r2 record arrives. By 17.5s the single store label has become `r2 current`, removing the visible superseded r1 record. The intended lesson's preservation of history is therefore not demonstrated; the representation can look like overwrite. During 21–23s VERSIONED NOTE moves toward LATER RETRIEVAL, but at 27.9s that destination has no retained selected version or task check. Keep two records visible, mark r1 superseded, select r2 against an explicit current-task revision, and land the selected command in the destination. This would go beyond the original, whose invalidate/refresh example also does not show preserved historical versions.

## Comparative judgment

For tool design, the five-part sequence improves **breadth and reading comfort**: application execution, required inputs, evidence scope, and pagination get separate explanations. Its 140 seconds are about 4.7 times the original runtime. On the shared empty-versus-failed lesson, the original still better demonstrates why an interface distinction changes an answer. Retain that causal contrast while adding the sequence's captions and input/output examples. Tool 02's contradiction must be corrected before promotion.

For memory architecture, the sequence improves **conceptual distinctions**: saved versus supplied, thread versus shared scope, durability, write policy, applicability, and supersession. Its 140 seconds are five times the original runtime. On stale-memory correction, the original still has the stronger uninterrupted chain: changed repository → recalled old command → mismatch/STOP → source refresh → current command in session → illustrative test outcome. The new clips fragment that chain and often erase the evidence after a packet arrives. Keep the expanded curriculum, but make records and outcomes persist across each finite example. The original's example test success is not a guarantee that changing a command always makes tests pass.

## Ranked changes

Sizes estimate editorial/animation scope: S localized state/layout change; M one lesson's payload or event work; L coordinated change across lessons. These are recommendations only; no source fixes were made.

| Rank | Size | Timestamp and observation | Proposed change and teaching effect |
|---:|:---:|---|---|
| 1 | S | Tool 02, 24.5–27.95s: missing field remains while valid input passes | Show repaired field, clear error, then release valid call. Removes a direct contradiction. |
| 2 | M | Memory 01, 14–27.95s: retrieval never becomes visibly supplied input | Persist a retrieved copy in next input and send it to the next call. Completes saved → retrieved → usable. |
| 3 | M | Tool 05, 21–27.95s: more available remains with no stopping event | Show second response and explicit complete/budget-limited state. Makes finite stopping behavior teachable. |
| 4 | M | Memory 04, 14–23s: current command appears from check stage | Add authoritative-source read and retain command/revision at destination. Explains why the new evidence is applicable. |
| 5 | M | Memory 05, 16–27.95s: r1 disappears; later retrieval stays empty | Keep superseded/current records together and show task-matched selection. Demonstrates version history and subsequent use. |
| 6 | M | Tool 03, 7–28s; memory 03, 7–21s: generic payload labels replace examples | Show IDs/interval/citation and command/source/scope/revision respectively. Turns assertions into inspectable evidence. |
| 7 | M | Tool 04, 14–16s and 21–28s: previous success carries over; incorrect inference absent | Reset case state and visibly reject a false zero-matches answer. Preserves the original's causal contrast. |
| 8 | L | All clips' 7s beats, especially memory 02 at 21–28s and tool 03 at 21–28s | Spend quiet intervals on concrete decisions and persistent outcomes; vary beat duration with reading needs. Add namespace/exclusion evidence in memory 02. Strengthen faint paths and move side-route packets inward. More explanation should mean more observable reasoning, not simply longer holds. |

## Rendering, timing, factual and audio checks

At native size, the sampled headings, node text, captions and busiest packets are readable, with no confirmed text collision or clipped glyphs. At 350px, the captions remain readable and are a genuine improvement in explicit explanation. Inactive dotted connectors are weak, especially the side routes in tool 05 and memory 01. At 15s those packets hug the right edge; RETRIEVE has particularly little margin, although its letters remain visible. Moving these routes inward would improve tolerance for display crops. Packet crossings of node borders did not obscure the main labels in the inspected frames.

The uniform seven-second caption changes are easy to follow but frequently leave little new evidence to examine after a short packet movement. Reading time and deliberate final holds are valid; a three-second stillness threshold is not an automatic defect. Diagnostic freezedetect output is **not reliable proof of literal frozen animation here**: sparse moving packets can fall below a whole-frame threshold. Timing judgments above use the visual scans and exact frames. The last-frame checks show landed captions rather than a requirement to loop. Unfinished reasoning in tool 05 or memory 01 is an ending-content problem, not a loop problem.

All twelve files decoded with exit code 0. All use H.264 video and AAC audio; their `moov` atom precedes `mdat`, supporting progressive startup. These checks do not establish browser delivery, network behavior, or player UI correctness.

Narrow technical cross-checks support the intended distinctions. MCP tool execution failures can be reported in a result with `isError: true`; protocol errors are a separate category ([official MCP SDK error documentation](https://ts.sdk.modelcontextprotocol.io/v2/servers/errors)). The new generic backend-timeout example is not inherently wrong, but its intended MCP nuance is not visible in the clip. Do not imply that every transport timeout returns an ordinary tool result. LangChain's documented memory model distinguishes thread-scoped state/checkpoints from longer-lived records organized by namespace ([official memory documentation source](https://github.com/langchain-ai/docs/blob/main/src/oss/concepts/memory.mdx)). This supports memory 02's separation of scope and durability; it is not a guarantee about every backend. These are limited spot checks, not implementation verification.

Audio measurements below are decoded whole-stream mean and sample maximum from ffmpeg volumedetect, in dBFS. Means include silence and are not integrated perceptual loudness. Peaks are below the review reference's −0.5 dB threshold; no sample-peak clipping was detected. True-peak compliance and listening quality were not measured. The new clips measure quieter than the originals; audition before deciding whether to adjust their gain.

| Clip | Mean | Maximum |
|---|---:|---:|
| Tool 01 | −41.4 | −13.4 |
| Tool 02 | −41.5 | −13.9 |
| Tool 03 | −41.7 | −10.5 |
| Tool 04 | −41.4 | −10.5 |
| Tool 05 | −42.5 | −12.4 |
| Memory 01 | −44.4 | −15.1 |
| Memory 02 | −46.9 | −15.3 |
| Memory 03 | −41.7 | −10.5 |
| Memory 04 | −42.7 | −10.4 |
| Memory 05 | −42.7 | −10.5 |
| Original tool astra | −27.4 | −2.2 |
| Original memory astra | −34.1 | −4.4 |

## SHA-256 input inventory

Full local input hashes follow. Comparison JSON hashes bind the selector files; only their recommended fields informed this review. Paths are relative to the repository except the external review reference.

```text
a36ea6970b490822a794cffc11f9d4f892c8441f5a549500b16fd04721ab7825  public/lessons/tool-design/01.mp4
dc88276a4604d64467b1554ac43c9c6472b83db5b0c651d3404eca6a87c63820  public/lessons/tool-design/02.mp4
5b5da692a51be189be2e9d2ec81edff656fd955e6693ffcdc286b8ea76138b32  public/lessons/tool-design/03.mp4
0dbf22fa6d0b48d0aeb63d427c65091162ac1a67a17f66d267901ca97ca31af2  public/lessons/tool-design/04.mp4
6bf08baffe014359539935b1b26e073a343b56e620753ae4dd6f2c85103d77b9  public/lessons/tool-design/05.mp4
998a64e66470d3073102e74951db632f5feb2173f0855b725f69f431ceb78f7a  public/lessons/memory-architecture/01.mp4
de6fddda6f4cdf5660cf479ae5c65fad9b252b4c58b29aa132b0537cc66c425f  public/lessons/memory-architecture/02.mp4
1d8d3a058c7055ab93a9434783b4e915846f42a69f8ba36ee3a47a035bcd7058  public/lessons/memory-architecture/03.mp4
2670103b09087da4c57c2840f93810c862245972071c8dd87e4bd355b0b8fb87  public/lessons/memory-architecture/04.mp4
51e5c9e3ef844e784b9b4f3c5b802b08ae6fa1276feca3b36d1978958e54b8de  public/lessons/memory-architecture/05.mp4
3000737b0dd9032416739734d8fcb8aa2efd991207a886e4406ab3f3d281a904  public/media/tool-design/astra.mp4
0b89eef6decee8b4b8fe97db8817f88de426dc4955f4e8d5a7b400c09aa4f576  public/media/memory-architecture/astra.mp4
220f33f303ed518f190c65abee9d3d87bc5605077cc1429034dc6108d80e3364  video/tool-design/sequence/lessons.json
5162aed2cbbb93dc97f8d05a7c53977e5e77818d9caabfbc077f4a82cba50454  reviews/comparisons/tool-design.json
308d12c5af905ba6617a659a6ef42163af07f38ee7dce81c37b8c3b0634d5ef0  video/memory-architecture/sequence/lessons.json
8bf141a4e31237fb01ea8976752da779209ee0523e2a5e34ce4ae30f6b574f55  reviews/comparisons/memory-architecture.json
98bf6c1393f11c63b6a2d8a561284dabbfc11775c6ddd8d377c89c3aa4f87316  AGENTS.md
141afe893629522ab8524a612bcc403e60d492654ac98114824ff92f81803ed3  docs/editorial-workflow.md
97e863a51db0be8692b0933d74a78949de857006d2cee5aa4ff491b7fe0ac3fc  /Users/jacobusbrink/.codex/skills/architecture-flow-video/references/review.md
```


---

## Final-refresh repair verification — 2026-10-20

This supplement applies only to the ten SHA-256 identities below. The original review above remains historical and unchanged. The eight requested content repairs are visible in the encoded pixels; the refreshed post-arrival/final samples retain the intended explicit states. Two objective visual blockers remain in memory 04 and 05. No remaining state-color contradiction was found in the inspected samples. This is sampled verification, not a claim that every intermediate frame is defect-free or an inspection of the compiler implementation.

### Evidence and scope

Reviewed only encoded outputs. For tools 02–05 and memory 01/03/04/05, inspected native 1080×1920 frames and 350px-wide samples at 0, 3.5, 10.5, 17.5, 24.5, and 27.9 seconds. Those complete samples are under `scratch/reviewer-2/repair-2/`; their eight input hashes exactly match the final-refresh manifest. Additional transition samples from the final snapshots cover tools 02 at 23/26s, 03 at 15s, 04 at 14/16s, 05 at 22/23s, memory 01 at 22s, 03 at 15s, 04 at 16.5/18s, and 05 at 15.5/16s. All these extras were inspected at 350px, with native inspection of at least one active transition per repaired clip.

For tools 01 and memory 02, the original full-beat review stands: this refresh checked 350px samples at 3.5/10.5/17.5/24.5/27.9s and native samples at 10.5/17.5/24.5/27.9s. These checks renew their final-state evidence and hashes, not their entire comparative assessment. Original reference-cut comparisons remain historical; reference cuts were not re-reviewed for this supplement. Captions are permitted and the clips are assessed as finite lessons; no seamless-loop requirement is imposed.

Earlier in this repair pass, live files changed during review. Those intermediate snapshots remain in scratch, but their hashes are not the current verification identities. Final snapshots were checked against all ten live files before this append. Evidence lives in `scratch/reviewer-2/final-refresh/` (native timestamped PNGs, 350px sheets, exact MP4 snapshots, manifest, and validation results). `scratch/reviewer-2/repair-evidence-SHA256SUMS` hashes the retained evidence. Generating an image does not by itself mean it was visually reviewed; the inspection scope is the sample list above.

### Repair results and current scores

Scores are 1–5, with 5 strongest. C = causal clarity; A = accuracy; P = pacing; L = legibility. Scores below apply to the eight content repairs; tools 01 and memory 02 retain their historical full-review scores. A repaired state transition can pass while the clip still has a visual blocker.

| Clip | Actual encoded evidence, seconds | Repair result | C / A / P / L |
| --- | --- | --- | --- |
| Tools 02 | 10.5/17.5: missing end time remains invalid. 23: `end_time=10:00` is present and validator says `required fields valid`, while search is idle. 24.5: valid input travels onward. 26/27.9: search is running and validation remains green. | Pass: validation visibly precedes execution; the final validation state survives arrival. | 4 / 5 / 3 / 4 |
| Tools 03 | 10.5: source interval 09–10 and result IDs `INC-42, INC-43` are visible. 15: evidence travels to the model. 17.5/24.5/27.9: model says `2 in 09–10`, with IDs and interval retained and successful nodes green. | Pass: identifiable evidence and interval remain available after delivery. | 4 / 4 / 3 / 4 |
| Tools 04 | 10.5: empty success is green. 14: new timeout source is red, result becomes amber/unknown, and model is blank. 16/17.5: result is an error, not empty success. 24.5/27.9: source/result stay red and answer is amber/uncertain. | Pass: the later call clears old success before its error arrives; failure is not mistaken for zero results. | 4 / 5 / 3 / 4 |
| Tools 05 | 10.5: more available. 17.5: next-page request. 22: page 2 is incoming while result still indicates more available. 23: result becomes green with no next cursor. 24.5/27.9: model shows query complete and completion stays green. | Pass: second-page arrival precedes completion. | 4 / 4 / 3 / 4 |
| Memory 01 | 10.5: stored r1/npm note. 17.5: next r1/npm input prepared. 22: next input travels to the model. 24.5/27.9: model retains received r1 note, input stays green, and stored copy remains separately visible. | Pass: memory is visibly supplied to and retained by the next call. | 4 / 5 / 3 / 4 |
| Memory 03 | 10.5: policy shows repo r1/npm. 15: command plus revision travels. 17.5/24.5/27.9: policy and saved record retain green r1/`npm test`. | Pass: persisted record contains command and revision. | 4 / 4 / 3 / 4 |
| Memory 04 | 10.5: revision mismatch is red, with repo r2/pnpm source visible. 16.5/17.5: current command travels from that source but overlaps check text. 18: r2 verified is green. 24.5/27.9: check and model input retain r2/pnpm green; old r1/npm is separate. | Content/color repair passes; packet collision remains a blocker. | 4 / 5 / 3 / 3 |
| Memory 05 | 10.5: old r1 record is amber/superseded. 15.5: r2 record travels across saved-r2 heading. 16: current record becomes green. 17.5/24.5/27.9: separate r2/pnpm record remains green; final retrieval says r2 matches task; old r1 stays amber/superseded. | Content/color repair passes; packet collision remains a blocker. History identity is preserved, although the old payload text is replaced by its status. | 4 / 4 / 3 / 3 |

The refreshed tools 01 samples retain neutral nodes and the finite progress indicator reaches its end at 27.9s; no new false-success color was observed. Memory 02 retains thread-A state and service-namespace store separately from an empty new session through 27.9s, consistent with its scope-versus-durability caption. Neither observation upgrades those clips' original teaching assessment.

### Remaining objective blockers

1. **P2 — Memory 04, 16.5s and 17.5s: moving `pnpm test` packet occludes the revision-check text.** At 16.5s it covers the end of `REVISION CHECK`; at 17.5s it covers a larger part of the heading and part of the source-reading status. This occurs exactly when the learner needs to connect the repo r2 source to the applicability decision. It is visible at native resolution and in the 350px samples, independent of the repaired final colors. Route the packet outside the text region or provide enough horizontal clearance for its full width. Verify departure, mid-transit, arrival, and the retained final state after changing it. Evidence: [native 16.5s](scratch/reviewer-2/final-refresh/memory-architecture-04/t016.5.png), [native 17.5s](scratch/reviewer-2/final-refresh/memory-architecture-04/t017.5.png), [350px transition samples](scratch/reviewer-2/final-refresh/memory-architecture-04/extras-350.png).

2. **P2 — Memory 05, 15.5s: moving `r2 RECORD` packet occludes the saved-r2 heading.** The packet covers the beginning of `SAVED r2 NOTE` during the write. The learner temporarily loses the destination label just as old-versus-current identity matters. The separate records and matching-task endpoint are now correct; this remaining defect is a text collision. Give the full packet clearance from both source and destination labels, then inspect departure/midpoint/arrival at both sizes. Evidence: [native 15.5s](scratch/reviewer-2/final-refresh/memory-architecture-05/t015.5.png), [350px transition samples](scratch/reviewer-2/final-refresh/memory-architecture-05/extras-350.png).

These are the remaining blockers established by this repair verification. The historical findings above are not silently erased: the repair table explicitly closes the corresponding state/payload defects for these hashes.

### Optional teaching improvements — not blockers

- Tools 01/03: retain a concrete returned payload and a short cited answer, so the viewer can compare evidence with the model's conclusion. Tools 03 now retains IDs and interval; short incident summaries would further support the caption's promise.
- Tools 05: show one real cursor value and the unchanged query alongside the second request. The current request/arrival/completion sequence already establishes the essential order.
- Memory 01/02: label the prepared input as the next call's input and use one concrete namespace/key example for scope. Current retained state is sufficient to establish the repaired flow.
- Memory 03: show one rejected memory candidate or its repo key to deepen the policy lesson.
- Memory 05: retain the old command text alongside a superseded badge if space permits. The current separate r1/r2 identities already retain history; preserving the full old payload would make comparison more granular.
- Across the eight repairs, regular long holds aid reading but leave limited causal detail between beats (pacing 3/5). Use that time for one concrete reason or input/output comparison rather than increasing motion density. This is a teaching preference, not a finite-video or caption violation.

### Decode and audio scope

All ten current snapshots decode successfully through their complete audio and video streams. Each is 28 seconds, 1080×1920, 20fps, with AAC stereo audio. Automated volume measurements range from −46.9 to −38.8 dB mean and −15.3 to −7.6 dB maximum. These measurements show non-silent audio and peaks below digital full scale. **No listening audition was performed for this supplement**: sound quality, perceptual loudness, cue timing, and audio/visual synchronization are not certified. Pacing scores are based on the visual timing samples, not real-time audiovisual playback.

### Current reviewed MP4 hashes

| File | SHA-256 |
| --- | --- |
| `public/lessons/tool-design/01.mp4` | `3984b42d57ed6cf3fbe3d33b92d99b7c3c78415950979464bc37c75d2a3e0b44` |
| `public/lessons/tool-design/02.mp4` | `80dff624265531a784c1add61984a14bec2b4f900de2cafa987f94e4439839bb` |
| `public/lessons/tool-design/03.mp4` | `ce1aa99900cde974ff81ab3be2926a3ed09ee7b90c5da19210ba69058d871b09` |
| `public/lessons/tool-design/04.mp4` | `8914bb38a231e49887d2e661edaf0327f90521dfbcf57925b3326ca0ea2bf85c` |
| `public/lessons/tool-design/05.mp4` | `80ccfae115bbd5731701101c007773bc5f61384555faed02530bb3ce588f4e83` |
| `public/lessons/memory-architecture/01.mp4` | `9284e0c5643e82d4d38eb8d2958c843ed5cafe050168bff67aa942820840c08d` |
| `public/lessons/memory-architecture/02.mp4` | `61dae169add8e69da4d2729763cc77cba52c975860eaf65725e975903ea4b94c` |
| `public/lessons/memory-architecture/03.mp4` | `3e86d964bf9538bb26afaba2eb635f46728c3f1aaba45b2806f2bfc6d60bc7e3` |
| `public/lessons/memory-architecture/04.mp4` | `d503dbcbd7de8491ca466b5b2c30c375f40d7bf2b13ed7f587adf19e968ea17b` |
| `public/lessons/memory-architecture/05.mp4` | `8b031926defdd22a0d3ad22d665ac9715ddb50529db670f653aafe21e165ce18` |


---

## Memory 04/05 clearance-fix verification — 2026-10-20

**Both previously remaining P2 text-collision blockers are closed for the two hashes below.** Inspected actual decoded frames at native 1080×1920 and 350px width: memory 04 at 16/16.5/17/17.5/18s, memory 05 at 14/14.5/15/15.5/16s, and both final states at 27.9s. This is a targeted clearance/final-state verification; earlier findings remain historical, and the other eight files are not rehashed or re-reviewed here. No code changes or audio audition were performed.

| Clip | Departure, transit, arrival and final-state observations | Verdict |
| --- | --- | --- |
| Memory 04 | At 16s, `REVISION CHECK / read repo r2` and `REPO r2 / pnpm test` are unobscured. At 16.5s the small amber dot is near the source, at 17s in the gap, and at 17.5s near the check. Neither dot nor glow covers the heading or status in these samples. At 18s the dot has cleared and the check is green, `r2 verified`. At 27.9s the check remains green and model input retains `r2: pnpm test`; old `r1: npm test` stays separately visible. The persistent source command and caption retain payload identity despite the unlabeled dot. | Clearance repair passes at both sizes; previous memory-04 P2 closed. |
| Memory 05 | At 14s, `SOURCE r2 / pnpm test` and `SAVED r2 NOTE / not saved` are unobscured. At 14.5s the dot is near the source, at 15s in the gap, and at 15.5s near the destination. Neither heading nor command/status is covered. At 16s the dot has cleared and the saved note is green, `r2: pnpm test`. At 27.9s that record remains green, retrieval says `r2 matches task`, and the separate old r1 note remains amber/superseded. Source, destination and caption retain command/revision identity. | Clearance repair passes at both sizes; previous memory-05 P2 closed. |

No remaining objective blocker was found in this requested sample set. This closes the two outstanding blockers from the preceding supplement; it does not claim exhaustive inspection of every intermediate frame. Optional teaching suggestions remain separate and unchanged. With the observed occlusions removed, legibility rises from 3/5 to 4/5 for each clip; other scores stand (memory 04 C/A/P/L = 4/5/3/4; memory 05 = 4/4/3/4).

Evidence: [memory 04 timestamped 350px samples](scratch/reviewer-2/clearance-fixes/04/samples-350.png), [memory 04 native 17.5s](scratch/reviewer-2/clearance-fixes/04/t017.5.png), [memory 05 timestamped 350px samples](scratch/reviewer-2/clearance-fixes/05/samples-350.png), [memory 05 native 15.5s](scratch/reviewer-2/clearance-fixes/05/t015.5.png). All twelve native samples and the exact MP4 snapshots are retained alongside these sheets. Their hashes are in `scratch/reviewer-2/clearance-fixes/SHA256SUMS`. Live input hashes matched the reviewed snapshots immediately before appending.

| Current file | SHA-256 |
| --- | --- |
| `public/lessons/memory-architecture/04.mp4` | `3562888f238271a4b75875a44e4bbc6ae40b7753a08ccb810f0bd9d3e2b380c6` |
| `public/lessons/memory-architecture/05.mp4` | `4387cddfe382213d79b39595c905a81590a0a2cc4059afe0b0c8fa5f1d0bce31` |
