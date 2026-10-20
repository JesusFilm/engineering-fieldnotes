# Independent sequence review: orchestration and permissions

Reviewed 20 October 2026. Reviewer 3. **Revise both sequences before using them as the primary granular explanation.** The new clips offer readable captions, useful separation of concepts, and more reading time. Their additional runtime frequently describes decisions without demonstrating their evidence or consequences. Retain the recommended originals as concise overviews; the sequences could become useful companions after the changes below. This is an editorial recommendation, not a promotion or source change.

The most important confirmed defect is orchestration 04: migration remains **“running” after its report completes the join**. Several other findings are teaching omissions, explicitly distinguished from rendering defects.

## Scope and evidence

Read the repository AGENTS.md, editorial workflow, and requested architecture-flow-video review reference. Used only the two intended `lessons.json` files and encoded media for lesson judgments. Before reviewing, extracted only `recommended` from each comparison JSON: **astra for both topics**. No authoring code, storyboards, other cuts, or prior review scores were inspected. Comparison files were hashed as bytes; their other fields were not presented to the reviewer.

All ten new clips were inspected at **0, 3.5, 10.5, 17.5, 24.5, 27.9 seconds**, individually at native 1080×1920 and in sheets containing actual 350×622 reductions. Also inspected half-second temporal scan sheets, frames immediately before/at caption boundaries (6.95/7, 13.95/14, 20.95/21), and the busy transfer frames listed below, separately at native and 350px. Temporal scans locate events; they are not a substitute for the native/350 legibility checks. This was encoded-frame sampling and full decode analysis, **not uninterrupted real-time audiovisual playback**. Brief defects between samples remain possible.

| New clip | Busy frame additionally inspected | Coverage |
|---|---:|---|
| Orchestration 01 | 22.0s, findings transfer | All six required times, native + 350px |
| Orchestration 02 | 15.0s, specialist transfer | All six required times, native + 350px |
| Orchestration 03 | 9.5s, dispatch and active branch | All six required times, native + 350px |
| Orchestration 04 | 15.0s, report and waiting coordinator | All six required times, native + 350px |
| Orchestration 05 | 22.0s, evidence transfer | All six required times, native + 350px |
| Permissions 01 | 8.0s, deploy request | All six required times, native + 350px |
| Permissions 02 | 15.0s, allowed read | All six required times, native + 350px |
| Permissions 03 | 15.0s, access check | All six required times, native + 350px |
| Permissions 04 | 15.0s, approval | All six required times, native + 350px |
| Permissions 05 | 8.0s, bypass-path request | All six required times, native + 350px |

Originals were inspected through half-second scans and 350px samples at 0, 3.5, 7, 10.5, 14, 17.5, 21, 24.5 and end-minus-0.1 seconds, with additional native inspection at 10.5, 14 and 24.5. Evidence, images, metadata and audio logs are under `scratch/reviewer-3/`; `evidence.json` binds the input files to this review.

Captions are welcome. Scores do not penalize their existence. These are **finite lessons**: a clear held conclusion is desirable; no seamless loop or reset is requested. Accuracy here assesses the depicted mechanism and agreement with intended lesson text, not independent primary-source certification of every technical assertion. No external research was used.

## Scores

Scale: 1 = substantially fails; 2 = major weakness; 3 = serviceable with material gaps; 4 = strong with limited gaps; 5 = exceptionally clear and complete for its scope. C = causal clarity; A = accuracy; P = pacing; L = legibility. Scores are fresh judgments of these encoded files. Sequence scores are holistic, not arithmetic means.

| Asset | C | A | P | L |
|---|---:|---:|---:|---:|
| Orchestration 01 — Follow dependencies | 3 | 4 | 3 | 4 |
| Orchestration 02 — Route to one specialist | 2 | 4 | 2 | 4 |
| Orchestration 03 — Independent parallel work | 4 | 4 | 3 | 4 |
| Orchestration 04 — Join before deciding | 3 | 2 | 3 | 4 |
| Orchestration 05 — Revise against criteria | 3 | 4 | 3 | 4 |
| **Orchestration sequence, 140s** | **3** | **3** | **2** | **4** |
| Orchestration original astra, 30s | 4 | 4 | 4 | 3 |
| Permissions 01 — Intent versus permission | 4 | 4 | 2 | 4 |
| Permissions 02 — Grant only needed access | 3 | 4 | 2 | 4 |
| Permissions 03 — A guardrail can be fallible | 3 | 4 | 2 | 4 |
| Permissions 04 — Review a concrete action | 3 | 4 | 2 | 4 |
| Permissions 05 — Recheck changed actions | 4 | 4 | 2 | 3 |
| **Permissions sequence, 140s** | **3** | **4** | **2** | **4** |
| Permissions original astra, 28s | 4 | 4 | 4 | 3 |

## Orchestration: what each clip teaches

**01, Follow dependencies.** Draft activity at 3.5s, delivery around 7–9s, checking at 17.5s, and findings transfer at 22s establish a plausible dependency chain. The prose explains why ordering matters, improving on the original's implicit prerequisites. However, 14–21s never supplies an actual criterion or finding. At 24.5/27.9s the result box has no retained outcome and the checker still says “input ready.” That label is still logically possible, so this is weak resolution rather than a proven contradiction. Show one checked fact and a completed result. The two-second transfers are easy to follow, but the intervening holds contribute little beyond reading time.

**02, Route to one specialist.** At 0/3.5s the request is specifically API compatibility; at 10.5s the router says “API path”; at 15s it sends REVIEW API. That is coherent, but only one destination is ever visible. The layout therefore resembles the chain in 01, leaving selection versus sequencing unexplained. At 21–27.9s the caption introduces uncertain-route fallback while the API reviewer remains “working”; there is no uncertain request, alternative specialist, or fallback destination. This is the weakest causal demonstration. Use an unselected migration branch and a visibly ambiguous request with a concrete fallback. Preserve enough time to explain the routing evidence rather than merely speeding up the clip.

**03, Independent parallel work.** The fixed snapshot at 0/3.5s, two branches at 9.5s, concurrent progress at 17.5s, and two “report ready” states at 24.5s make independence more explicit than the original. Sequential dispatch is compatible with concurrent analysis and is not a defect. The captions usefully explain read-only work. A revision identifier carried by both task/report labels would demonstrate the claimed binding; “fixed revision” alone leaves it abstract. The disconnected coordinator remains unused throughout. Either make its upcoming role explicit or defer it until the join lesson. The opening seven seconds could establish the actual two review questions.

**04, Join before deciding.** One report and “1 of 2” at 10.5s establish waiting well. At 15s DB REPORT is travelling, yet migration says “running”; more decisively, at **17.5s the coordinator has 2 of 2 reports while migration still says running**. The label persists at 24.5/27.9s despite the completion caption and assessment. This is a confirmed state/caption contradiction, not a stylistic preference. Synchronize migration completion with its outgoing completed report. At 21–28s “missing or failed review needs handling” is only prose: no failure, timeout, conflicting finding, or resulting decision is depicted. The original's blocked/repaired case is materially stronger here.

There is also a sequence-level continuity ambiguity: 03 ends with both reports ready, while 04 starts with migration running. These can be separate examples, but no visible reset or “earlier in the run” framing explains the apparent regression. Identify the new example or make the two endpoints continuous.

**05, Revise against criteria.** DRAFT, MISSING CASE, REVISION and EVIDENCE transfers establish an intelligible feedback path (0–2, 7–9, 14–16, 21–23s). Yet the supposedly explicit criterion and “specific reason” remain generic labels. At 24.5/27.9s “bounded decision” does not identify a budget, successful criterion, stop, or escalation. Show one missing requirement, the revised evidence that satisfies it, and an actual terminal decision. This would make the extra explanatory time valuable and give the finite film an ending.

**Comparison with astra.** The original shows parallel checks, a successful join, a DB failure around 14s, blocking/repair around 15–17s, and a revised Patch C that reaches approval around 26–28s. Those consequences let a learner infer why the join exists. Its patch changes are quick and the small gray subsidiary text is weak at 350px; it also does not teach routing or the criteria/budget controller explicitly. The new sequence gains breadth, explanatory captions, and time to read, but at 140s versus 30s loses the original's concrete failure-to-repair arc. Keep that arc and add the granular explanations around it. More runtime is justified by more demonstrated reasoning, not five similarly paced box transfers.

## Permissions: what each clip teaches

**01, Intent versus permission.** The 0s instruction, 8s deploy request, 14/17.5s rejection, and 24.5s “not executed” outcome distinguish intention from enforced access well. The mechanism would be stronger with a visible principal and its read-only grant, so the rejection has inspectable evidence. The seven-second motionless opening and long wait after request delivery weaken pace. At 21–27.9s the deploy service turns green while saying “not executed.” The text is clear, so this is a color-semantics risk, not a claim that execution occurred: neutral/protected styling would avoid borrowing the execution-success signal.

**02, Grant only needed access.** The checkout read request around 7–9s and ALLOWED READ at 15s fit the intended scoped permission. At 17.5s “read permitted” indicates authorization; an actual log return is not shown. At 21–27.9s other-resource checks are mentioned but there is no contrasting resource or denied operation. A tiny action/resource comparison—read checkout allowed, read another service denied—would make least privilege observable. Much of 16–28s holds the same diagram while captions carry the additional lesson.

**03, A guardrail can be fallible.** At 10.5s policy has passed; by 17.5s authorization says “permission denied.” This usefully distinguishes two checks. It **does not demonstrate a mistaken policy judgment**: policy acceptability and identity permission can legitimately differ. The title's fallibility claim is asserted rather than exemplified. Name an actual missed policy condition, or narrow the teaching claim to “policy pass does not grant access.” This is an explanatory gap, not proof the displayed authorization logic is false. The orange policy-pass highlight outlasts the brief red denial pulse; retain a stronger denial state through the 21–28s conclusion.

**04, Review a concrete action.** The release r42 proposal at 0s, evidence transfer around 7–9s, and APPROVE r42 at 15s give a useful approval chain. “Check approval” at 17.5s becomes “matching release” at 21s. However, the production target and test evidence remain prose/generic labels, rather than values the viewer can compare. At 24.5/27.9s the caption says the agent stays read-only, but the agent box retains only “release r42”; no production transition is shown. Put artifact, target, and result side by side and retain the principal's unchanged scope. The original makes this separation more observable.

**05, Recheck changed actions.** The persistent r43 proposal and r42 saved approval are the strongest concrete evidence in the new sequence. The executor blocks the mismatch at 14s and retains it through 27.9s. At **8s**, however, DEPLOY r43 crosses the saved-approval box's right border and crowds the right edge (visible at native and 350px). Text remains readable and is not demonstrably clipped in that frame; the problem is route/node overlap, which makes the request appear attached to saved approval. Move the route or reserve a packet lane. At 21–28s re-review is only a caption. Ending blocked is a valid finite conclusion; showing the next review handoff would teach the remedy more fully. The long opening and approximately 14-second held blocked diagram have little additional visual explanation.

**Comparison with astra.** The original shows an allowed log read around 2–4s, denied deploy around 6–7s, r42 proposal/review around 10–13s, an authorized tool action around 16s, production changing to r42 around 19s, and a subsequent agent deploy denied around 21–22s while reading still works. The 24.5s state simultaneously retains approval, production r42, agent read-only, and agent denied: a strong proof that approval did not grant general authority. Its dim inactive text and small subtitle cost mobile legibility. The new 140s sequence improves explicit explanation and adds the valuable changed-artifact case and policy/access distinction. It does not yet surpass that original 28s causal demonstration; carry the explicit permission evidence and production outcome into 04, and add the contrasting scope case in 02.

## Ranked changes, without source edits

| Priority | Change and evidence | Size |
|---|---|---|
| 1 — confirmed defect | Orchestration 04, 17.5–27.9s: replace stale migration “running” with the completed state when its report is emitted/received. | S |
| 2 — teaching | Orchestration 02, 7–28s: show alternative destinations, selection evidence, then an uncertain request and fallback. | M |
| 3 — teaching | Orchestration 04, 21–28s: demonstrate one failed/missing report and the concrete handling decision, preserving the original's causal contrast. | M |
| 4 — teaching | Orchestration 05, 7–28s: concrete criterion, changed evidence, visible budget, terminal stop or escalation. | M |
| 5 — teaching | Permissions 02, 7–28s and 04, 14–28s: expose action/resource or artifact/target comparisons and actual outcomes. | M |
| 6 — teaching | Permissions 03, 0–21s: distinguish guardrail fallibility from two checks answering different questions. | M |
| 7 — visual defect | Permissions 05, 8s: clear the moving request from the saved-approval border and preserve right margin at 350px. | S |
| 8 — continuity/finish | Orchestration 03→04 boundary: label separate scenario or preserve state; 01/05 endings: retain an actual result/decision. | S–M |
| 9 — pacing | All clips: use repeated seven-second beats for worked evidence, intermediate reasoning and counterexamples; preserve deliberate reading and conclusion holds. | M |

S/M are relative editorial implementation estimates, not estimates derived from source inspection. No change was applied. No task access/decode blocker was encountered. The state contradiction should block editorial promotion of orchestration 04 until corrected; human promotion remains required.

## Technical and audio checks

All twelve MP4s passed full FFmpeg video/audio decoding with exit 0 and no reported decode errors. All are H.264 1080×1920 with AAC stereo at 44.1kHz and `moov` before `mdat` (fast start). Each new clip is 28s at 20fps; originals are 30fps, 30s orchestration and 28s permissions. No broken caption layout was observed at the required frames. White captions remain readable at 350px; dotted gray connectors lose contrast, and permissions 05 has the busy-frame overlap above. This does not certify browser controls, site integration, or every encoded frame.

**Audio was analyzed, not heard.** Used FFmpeg volumedetect and silencedetect (-45dB, minimum 0.2s), plus full decode. No claim is made about timbre, pleasantness, intelligibility, perceptual sync, or absence of audible clicks. Levels below are decoded sample measurements, not LUFS or true-peak measurements.

| Clip | Mean dBFS | Maximum dBFS |
|---|---:|---:|
| Orchestration 01 | -42.8 | -10.5 |
| Orchestration 02 | -43.8 | -12.4 |
| Orchestration 03 | -39.9 | -10.6 |
| Orchestration 04 | -42.6 | -10.5 |
| Orchestration 05 | -40.9 | -12.2 |
| Orchestration astra | -34.4 | -6.3 |
| Permissions 01 | -44.5 | -15.1 |
| Permissions 02 | -42.9 | -10.4 |
| Permissions 03 | -44.2 | -13.9 |
| Permissions 04 | -42.6 | -12.5 |
| Permissions 05 | -44.4 | -15.1 |
| Permissions astra | -35.1 | -6.3 |

No decoded sample peak approaches the reference's -0.5dB ceiling. The new tracks have sparse short energy bursts and long measured silence, including 0–7s in orchestration 02/03 and permissions 01/02/04/05. Permissions 05 is below the silence threshold from about 14.18s to the end; orchestration 02 from about 16.26s. Caption-only conclusions at 21s therefore do not always have a detected sound cue. This is not automatically a defect: a reading hold or held blocked outcome need not make sound. Listening remains unassessed and should be completed before audiovisual sign-off.

## SHA-256 input manifest

Hashes were captured before inspection and rechecked at completion. All media, lesson text, comparison containers and other instructions remained unchanged. The editorial workflow changed during review; its updated version was reread before completion and introduced no conflicting requirement for this review-only task. This is not a release proposal. Both workflow hashes are recorded below; the input manifest otherwise records the reviewed bytes. Comparison JSON hashes identify the containers only; only their recommended fields informed the review. Derived evidence and this report are also hashed in `scratch/reviewer-3/SHA256SUMS`.

| Reviewed input | SHA-256 |
|---|---|
| `public/lessons/orchestration-patterns/01.mp4` | `59b52314d055341e938083798b9f2069c1b4194d9f0b49adbe74f09d782af729` |
| `public/lessons/orchestration-patterns/02.mp4` | `825492c35cefd7a4e51c762d5813ad21c7750a16c6b45095ae5cf5679497db83` |
| `public/lessons/orchestration-patterns/03.mp4` | `db6e9a066457931158733290c808aec713099e9e09df78e204b2a9dc584c75fc` |
| `public/lessons/orchestration-patterns/04.mp4` | `62828b0962676303e56a04a04d049a3e9e5f3733b8c13211713e7991350c1c49` |
| `public/lessons/orchestration-patterns/05.mp4` | `329f0f6a0748a9a4e6b43a15279a93b638f665b5542f69dc1505431ee1f78659` |
| `public/lessons/guardrails-and-permissions/01.mp4` | `8b8f6e80ad3bb0d4b0ae0eb97b12150fa68eb373f8649f4513190f13cfb1a24c` |
| `public/lessons/guardrails-and-permissions/02.mp4` | `c365d9f993b5ab8c96041d8c1af32ed79150a1496da34eb0dc322909d060eac3` |
| `public/lessons/guardrails-and-permissions/03.mp4` | `803f11915d651f99ec14af40bb9cd616a893c22e343a18b2f469978824a1991e` |
| `public/lessons/guardrails-and-permissions/04.mp4` | `6713265dd37ae07351447a848a87f9687250833f489fc6fec2087d3e221ab1e7` |
| `public/lessons/guardrails-and-permissions/05.mp4` | `4ed21fd9870cf95833124150a0682422006c30d9fa4140bebf2bebea13383fb5` |
| `public/media/orchestration-patterns/astra.mp4` | `0ef2aaa0ee3cec7bad9a10146825f2f599600e6ffa289213ac3f40d1a6491fb3` |
| `public/media/guardrails-and-permissions/astra.mp4` | `0c6d12bff02ab48135b0222201f3201265092b98212239352f4a06943f1c43ad` |
| `AGENTS.md` | `98bf6c1393f11c63b6a2d8a561284dabbfc11775c6ddd8d377c89c3aa4f87316` |
| `docs/editorial-workflow.md` (initial) | `cfbf0d1a0d67733ba50b85c06b0380e969d2accd49472fea11702b02641fa1d4` |
| `/Users/jacobusbrink/.codex/skills/architecture-flow-video/references/review.md` | `97e863a51db0be8692b0933d74a78949de857006d2cee5aa4ff491b7fe0ac3fc` |
| `video/orchestration-patterns/sequence/lessons.json` | `55e5ccaeb68da1f10f4b4890fc44c5035f22aaa337246f448d5d8358fe08c2d8` |
| `video/guardrails-and-permissions/sequence/lessons.json` | `48ff5e01d80662670968eef5ebd6bd072c39c114af5337201676cedfce699ada` |
| `reviews/comparisons/orchestration-patterns.json` | `aa13ba7fe6b58e9b4c329c8053150d939b023d63f8e6293fc43fb80b10b2a6b3` |
| `reviews/comparisons/guardrails-and-permissions.json` | `2e001a76965f839c30373d88727d6688c90c59cac2a611e92723ad6b8064feaf` |
| `docs/editorial-workflow.md` (completion, reread) | `141afe893629522ab8524a612bcc403e60d492654ac98114824ff92f81803ed3` |


---

## Final corrected batch: hash-bound verification — 2026-10-20

This addendum reviews the ten current encoded lesson clips after the user's final-render confirmation. The preceding report is retained byte-for-byte as history. Findings below supersede its findings about the repaired clips; they do not erase the earlier evidence. No authoring source, compiler, storyboard, or other reviewers' scores were consulted. No source was edited.

**Verdict:** the substantive repairs are visible, including routing alternatives and human fallback, a completed migration risk blocking release, a concrete evaluator correction and stop, scope-dependent denial, deployment of r42 by the executor, and the short r43 packet. Sampled post-arrival and final colors retain their intended states. One bounded caption/counter contradiction remains in orchestration 04 at 14.00–before 16.00 seconds. This is not an unqualified clean pass. The optional refinements below are not additional contradictions or prerequisites for accepting the verified repairs.

### Evidence and limits

All ten current clips were sampled at 0, 3.5, 8, 9.5, 10.5, 15, 16.5, 17.5, 22, 23.5, 24.5, and 27.9 seconds. Native and exact 350px-wide PNGs were extracted. All twelve-frame overview sheets and half-second scan sheets were inspected for sequence/state changes. Overview sheets were display-scaled and are not claimed as exact-size legibility checks. Native and exact 350px views were separately inspected at the busy frame and 27.9 for every clip; native 16.5 was also inspected for every clip. Busy checks were orchestration 01/02/03/04/05 at 22/15/9.5/15/22 and permissions 01/02/03/04/05 at 8/22/15/15/8 seconds. Additional native join-boundary checks at 14, 15.95, and 16 distinguish travel from completed arrival. The original review's full native/350 sampling remains historical evidence for its earlier hashes, not evidence for this batch.

Evidence lives in `scratch/reviewer-3/final-verification/`: per-clip frames, scan sheets, probe/decode/audio logs, `results.json`, input hashes, and `historical-report.md`. All ten complete streams decoded without ffmpeg errors. Each is 28 seconds, 1080×1920, H.264 at 20fps, with stereo AAC at 44.1kHz. These are finite explanations; no loop seam requirement was applied. Captions were treated as permitted teaching material.

Audio scope is measurement only: audio streams decoded and volume was measured; no listening or perceptual synchronization review was performed. Measured mean/peak dB were orchestration 01 −40.7/−10.5, 02 −42.0/−12.5, 03 −39.9/−10.6, 04 −43.6/−12.5, 05 −39.5/−10.3; permissions 01 −47.0/−15.1, 02 −41.5/−10.4, 03 −44.2/−13.9, 04 −41.3/−10.5, 05 −44.4/−15.1. This does not establish audibility, sound quality, or appropriate audio emphasis.

### Changed semantics and retained final states

| Clip | Encoded evidence and assessment |
| --- | --- |
| Orchestration 01 | At 9.5 the input is ready; progress follows, then “check complete” at 21. Findings travel at 21–23 and “contract preserved” is green at 23.5–27.9. The end now communicates a concrete successful result. |
| Orchestration 02 | API and database alternatives are visible; database is “not selected,” while API work proceeds. At 21 the new unclear request is distinguished from the previous completed task. TRIAGE travels at 22–24; human “review scope” remains orange at 24.5–27.9. This demonstrates fallback without falsely declaring the human decision finished. |
| Orchestration 03 | The shared snapshot identifies revision r42. Separate work proceeds, and both reports are green/ready at 21–27.9. No sampled final color reset was seen. The common snapshot supplies the consistency premise. |
| Orchestration 04 | At 14 migration changes to red “risk found,” replacing the former stale running state. The packet reaches the coordinator at 16; its counter becomes 2 of 2 and remains orange through the intermediate post-arrival frames. At 21–27.9 the coordinator is red “release blocked.” Both reports arriving is correctly separated from release success. The caption leads the arrival by two seconds; see the actual defect below. “In this run” also makes the opening scenario change explicit. |
| Orchestration 05 | “Rollback case missing” motivates ADD ROLLBACK at 7–9. The revised example returns at 14–16 and is checked before green “rollback case present” at 21. CRITERION MET returns at 21–23; the controller ends green “stop: 1 revision” at 23.5–27.9. A concrete criterion and finite stopping condition now replace a generic retry. |
| Permissions 01 | Authorization remains red “not authorized” at 14–27.9. The deploy service explicitly ends orange “not executed” from 21. The final state no longer suggests that a denied deployment succeeded. |
| Permissions 02 | Checkout reading succeeds, with approved logs green by 16.5. A payments read travels at 21–23; authorization becomes red “payments denied” at 23.5–27.9, with no forwarded payments read. The same identity receives different outcomes for different scopes. |
| Permissions 03 | The precise “Policy and permission” title matches the illustrated distinction. Policy passes; the access request travels at 14–16; authorization is red “permission denied” at 16.5–27.9. Post-arrival denial persists. The revised title does not promise an empirical demonstration of probabilistic guardrail failure. |
| Permissions 04 | Evidence reaches human review at 7–9; “r42; prod; tests pass” is visible by 9.5. Approval travels at 14–16; the executor checks it, then ends green “deployed r42 to prod” at 21–27.9. The agent remains orange “still read-only.” Actual execution is conveyed by the executor's explicit result state; it does not imply that the agent gained deployment permission. |
| Permissions 05 | The short r43 chip at 8 clears the saved r42 approval box and the right margin in both native and exact 350px views. The saved approval travels at 10–12. The executor is red “mismatch blocked” at 14–27.9. This is a legible revision mismatch and a valid finite blocked ending, with no sampled reset or successful-execution color. |

### Actual remaining contradiction

**Orchestration 04, 14.00–15.95 seconds: the caption announces collection before arrival.** It says “The coordinator now has both reports” while the coordinator still displays “1 of 2” and the RISK FOUND packet is in transit. At 15.95 the packet is near the coordinator, but the counter still reads 1 of 2; at 16.00 the counter reads 2 of 2 and the packet has disappeared. This is a brief, objective temporal disagreement, not a failure of the repaired final release decision. The risk-to-blocked-release result at 21–27.9 is correct.

Small repair: delay the “now has both reports” claim until arrival, or phrase the travelling interval prospectively, such as “Its report completes the join on arrival.” Evidence: orchestration 04 `boundary-14.png`, `boundary-15.95.png`, `boundary-16.png`, and `arrival-boundary.jpg` in this verification's scratch directory. No repair was made during this review.

### Updated scores for these hashes

Scores are 1–5, higher is better. Accuracy includes temporal agreement between captions, packets, counters, and state. A 4 indicates a clear explanation with room for enrichment, not a hidden blocker. Legibility scores reflect the separately inspected native/350 busy and final frames and the sequence overviews, not a claim to have inspected every encoded frame at native size.

| Clip | Causal clarity | Accuracy | Pacing | Legibility |
| --- | ---: | ---: | ---: | ---: |
| Orchestration 01 | 4 | 4 | 3 | 4 |
| Orchestration 02 | 4 | 4 | 3 | 4 |
| Orchestration 03 | 4 | 4 | 3 | 4 |
| Orchestration 04 | 4 | 3 | 3 | 4 |
| Orchestration 05 | 4 | 4 | 3 | 4 |
| Permissions 01 | 4 | 4 | 2 | 4 |
| Permissions 02 | 4 | 4 | 3 | 4 |
| Permissions 03 | 4 | 4 | 2 | 4 |
| Permissions 04 | 4 | 4 | 3 | 4 |
| Permissions 05 | 4 | 4 | 2 | 4 |

The expanded sequences now support the user's preference for granular explanations better than the earlier versions: the alternatives, denial comparison, release consequence, concrete revision, and deployment outcome are visible. The recommended original `astra` cuts were reviewed in the historical comparison and were not re-reviewed in this addendum. That historical overview-versus-lesson comparison remains useful; this addendum makes no new hash-bound claim about those original media files and is not a curriculum-promotion decision.

### Optional refinements — not contradictions

- **Orchestration 02, 7–27.9 (small):** use a quieter color for the unselected database branch. Its orange currently competes with active work, though the “not selected” text disambiguates it.
- **Orchestration 05, 16–27.9 (small):** distinguish the previous “rollback case missing” judgment during rechecking, and change the worker's lingering “add rollback case” instruction to a completed label after acceptance. The evaluator and controller already establish the correct result.
- **Permissions 02, 23.5–27.9 (small):** name the retained approved logs “checkout logs” so the green previous result is immediately distinguishable from the newly denied payments request.
- **Permissions 01/03/05, particularly the last seven seconds (medium):** use part of the long hold for one additional concrete explanation or trim duration. Their narrow single-outcome demonstrations carry less new information than the repaired multi-step clips. Captions and finite endings are acceptable; slow pacing is a teaching refinement, not a loop defect.

### Input identity and preservation

All fifteen input hashes were checked again immediately before this append and matched the pre-inspection capture. The original report is preserved as an exact byte prefix and as `historical-report.md`. The accompanying `SHA256SUMS` binds the reviewed inputs, extracted evidence, logs, and appended report; the manifest excludes itself.

| Reviewed input | SHA-256 |
| --- | --- |
| `public/lessons/orchestration-patterns/01.mp4` | `2c402e86450ddece5409504b033551423741c50901a49dc2a1b34a3dc30b3010` |
| `public/lessons/orchestration-patterns/02.mp4` | `6be321bd510d9a78e1fdf0d111ccccd2c49b081c9877620335e02b2254488dd9` |
| `public/lessons/orchestration-patterns/03.mp4` | `f90eee5bc0e58f98726ee0f2f3a44a01f5124c8e517285e657a416f60baa9fae` |
| `public/lessons/orchestration-patterns/04.mp4` | `fd5c951710e84e88cb49148acee1b6812dd3c9f14a465d14745b1040d95a3a96` |
| `public/lessons/orchestration-patterns/05.mp4` | `7584dc2574b777f69c16edfa71dc5a814adae80f92ab3a4d5eb587b558866bd5` |
| `public/lessons/guardrails-and-permissions/01.mp4` | `e2be4cf18fa2c676caadb1d9dec253387a5efb8ecd5a10b9aa29f9886256029f` |
| `public/lessons/guardrails-and-permissions/02.mp4` | `ab2ec6c5afc117306f9e1c9d1a13f8add6f23548dc2768c9c7737ac3367a8d7d` |
| `public/lessons/guardrails-and-permissions/03.mp4` | `b1cd0c713a6694ef155355f20600258bc1e04385added091c4b3dbeafc44b54f` |
| `public/lessons/guardrails-and-permissions/04.mp4` | `1b98a74b8d5f9ecbade1dd105a0a613bdeea5048601caf1cccc96c3adc720e9d` |
| `public/lessons/guardrails-and-permissions/05.mp4` | `706753a9236d6cfbfef8275f041aa3e3cf27f20a23b925a9ab13a096f7b9fb8d` |
| `video/orchestration-patterns/sequence/lessons.json` | `927475659664b1759e70242c7d03cccadadc1cf39cde5dfe35034b38a2e4e747` |
| `video/guardrails-and-permissions/sequence/lessons.json` | `d46d8d50ddad957186f0ca7fb62f6306a17c42b12c14674baba766616c658f4a` |
| `AGENTS.md` | `98bf6c1393f11c63b6a2d8a561284dabbfc11775c6ddd8d377c89c3aa4f87316` |
| `docs/editorial-workflow.md` | `141afe893629522ab8524a612bcc403e60d492654ac98114824ff92f81803ed3` |
| `/Users/jacobusbrink/.codex/skills/architecture-flow-video/references/review.md` | `97e863a51db0be8692b0933d74a78949de857006d2cee5aa4ff491b7fe0ac3fc` |


---

## Orchestration 04 targeted caption verification — 2026-10-20

**Verdict: the remaining caption/arrival contradiction is resolved for this encode.** At 14.00 seconds the caption now reads “Migration finishes and reports a risk. Its report travels to the coordinator.” The coordinator correctly remains at “1 of 2 reports” at 14.00, 15.00, and 15.95 while the risk report travels. At 16.00 the packet disappears and the counter becomes “2 of 2 reports”; that state persists at 16.05 and 17.50. The caption describes the beat's transfer without prematurely asserting receipt. Its continued display after arrival is a summary of the illustrated action, not a claim that the coordinator is still missing the report.

Native and exact 350px frames were inspected at 14.00, 15.00, 15.95, and 16.00. Additional exact 350px checks at 13.95, 16.05, 17.50, 21.00, and 27.90 confirmed the preceding wait, retained post-arrival state, and red “release blocked” ending. The revised caption is readable without clipping in these views. Migration remains red “risk found”; the coordinator remains orange after collection and red when release is blocked. No contradiction was found in this targeted check.

The whole MP4 decoded successfully with no ffmpeg errors. Audio was decoded, not listened to; no new perceptual audio verdict is asserted. This is a focused repair verification, not a new full-sequence comparison. The other nine MP4 hashes were checked against the preceding addendum and are unchanged, so their existing reviews remain applicable. The prior optional refinements remain optional. Orchestration 04 accuracy is updated from 3/5 to 4/5 following this repair; its other scores remain clarity 4, pacing 3, and legibility 4. The preceding report and addenda are preserved byte-for-byte.

Current reviewed inputs (unchanged between capture and final verification):

| Input | SHA-256 |
| --- | --- |
| `public/lessons/orchestration-patterns/04.mp4` | `ff4d129a4658408ff89692fd0358467cc67d19b7a85e258f642182c9cfb16089` |
| `video/orchestration-patterns/sequence/lessons.json` | `53b5eed043a9c57b2172d539b4ab2fa6132c4ded11d073cc9adfb6c62b0b0f51` |
| `AGENTS.md` | `98bf6c1393f11c63b6a2d8a561284dabbfc11775c6ddd8d377c89c3aa4f87316` |
| `docs/editorial-workflow.md` | `141afe893629522ab8524a612bcc403e60d492654ac98114824ff92f81803ed3` |
| `/Users/jacobusbrink/.codex/skills/architecture-flow-video/references/review.md` | `97e863a51db0be8692b0933d74a78949de857006d2cee5aa4ff491b7fe0ac3fc` |

Evidence and hashes: `scratch/reviewer-3/orchestration04-caption-final/`, including native/350px boundary frames, decode/probe logs, `input-hashes.json`, `other-nine-hashes.json`, and `SHA256SUMS`. No source edits were made.
