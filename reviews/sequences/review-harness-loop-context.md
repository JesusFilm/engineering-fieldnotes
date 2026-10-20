# Harness, loop, and context: encoded-video review

Review date: 2026-10-20. **Request changes for harness 04/05; clarify stale evidence in loop 02.** The sequences offer useful beginner scaffolding, but do not yet supersede the original recommended cuts as demonstrations of cause and effect. No files were repaired or published.

## Scope and independence

Reviewed all 15 requested lesson encodes and three original recommended encodes listed below. Read repository `AGENTS.md`, `docs/editorial-workflow.md`, the architecture-flow-video skill and its `references/review.md`, and the three `video/<topic>/sequence/lessons.json` files. Captions are allowed; finite endings need not match openings.

`content/variants.json` lists candidates but contains no recommendation field. Located media through `video/<topic>/<variant>/variant.json`, then extracted only the `recommended` string from `reviews/comparisons/<topic>.json`: `astra` for all three. **Independence limitation:** the initial variant-metadata extraction also exposed historical correction notes, transcripts and limitations. No prior numerical scores or comparison rationales were exposed; no scene JS, storyboard or author_sequences.py was read. This is a fresh encoded review with disclosed metadata exposure, not a completely blind comparison. Unused alternative videos were not inspected.

For every lesson, inspected encoded samples at **0, 3.5, 10.5, 17.5, 24.5, 27.9 seconds**, plus transition samples at **1.5, 2.5, 8.5, 9.5, 15.5, 16.5, 22.5, 23.5**. Originals received the six common samples plus 0.5, 2.5, 4.5… through their duration; context also includes its actual closing boundary at 29.9s. Full layouts were inspected at 350px width; native-pixel atlases preserve 1080px width and remove unchanged/blank vertical bands for inspection of titles, nodes and captions. The atlas difference threshold suppresses small codec noise; complete native PNGs remain available. Atlas page cuts are not video clipping. Initial harness thumbnails were slightly downscaled by the display, but subsequent 350px transition sheets were displayed at original size.

This was timestamped still/transition inspection and complete-file decode, **not uninterrupted real-time viewing**. Pacing scores are editorial estimates from those samples. Audio was analyzed for levels and spectral events, **not heard**; perceptual loudness, timbre and exact event-by-event synchronization remain unverified. No learner testing, physical-phone testing, browser integration review or external technical-source audit was performed. Accuracy scores assess the depicted mechanism against the supplied intended lessons, not implementation correctness.

Evidence: `scratch/reviewer-1/evidence.json`, per-file native PNGs, `sheet-350.png`, `transitions-350.png`, `native-*.png`, `audio.txt`, and `spectrum.png`. All scratch writes are within `reviews/sequences/scratch/reviewer-1/`.

## Blocking defects

1. **Harness 04: no fresh observation at the finish** — **23.5, 24.5, 27.9s**, size M. The retest arrives and the progress bar fills, but the last frame still shows red `ACCESS TESTS / expected 403` and `PATCH / unverified`; no new actual response or explicit pending status appears. The caption asks the viewer to use the new result, which the video never leaves visible. The temporary amber highlight at 23.5s returns to the old red state at 24.5s. Show `running on revision B`, then a concrete observed response and its scoped verdict, or explicitly end with a pending run and carry it into the next lesson. A filled bar alone does not establish a result.
2. **Harness 05: stale patch status contradicts the resolved gate** — **15.5–27.9s sampled**, size S. `checks passed` appears, followed by `gate satisfied` at 23.5s, while the patch remains `unverified` through 27.9s. Replace that status with `required checks passed; review pending` or equivalent scoped wording. Do not imply universal correctness. Other review requirements in the caption are good, but do not explain the stale, unqualified patch label.

**Additional state defect — loop 02, 16.5–27.9s sampled (S):** `CODE / needs retest` appears while the runner retains red `11 pass, 1 fail` and a full bar, including after the RETEST packet at 22.5s. The caption correctly says the evidence is old, so this is less severe than the harness contradictions. Nevertheless, label the result `previous revision` or clear it to `not tested` when the patch changes. The original loop cut visibly does this at 6.5s.

No clipped or overlapping text was found in the inspected samples. Packet chips sometimes meet node borders, but do not obscure their labels. No decode or clipping-level blocker was found. These are sampled findings, not an exhaustive absence-of-defects guarantee.

## Per-file teaching scores

1 = seriously weak; 3 = serviceable with material limitations; 5 = exceptionally clear for the intended beginner audience. C = causal clarity, A = accuracy, P = pacing, L = legibility. Lesson identifiers map to the exact paths in the hash ledger.

| File | C | A | P | L | Timestamped evidence / limitation |
|---|---:|---:|---:|---:|---|
| harness 01 | 4 | 4 | 3 | 4 | 1.5s RUN TESTS → runtime; 9.5s EXECUTE → tool; 22.5s result returns. Clear separation of proposal and execution. At 24.5s no retained result value remains, and runtime still says `validate call`. |
| harness 02 | 4 | 4 | 3 | 4 | 3.5s revision recorded, 10.5s task loaded, 24.5s baseline saved. Good setup order; 17.5–24.5s never shows an example pre-existing failure or baseline contents. |
| harness 03 | 3 | 4 | 3 | 4 | 8.5s EXIT + LOG, 17.5s revision + result. Explains provenance, but no actual command, exit value or revision identifier is retained. |
| harness 04 | 3 | 3 | 3 | 4 | 8.5s `403 ≠ 200` makes feedback concrete; 27.9s unresolved result is blocker 1. Opening 0–3.5s should say “in this example” for the 403 contract. |
| harness 05 | 3 | 3 | 3 | 4 | 17.5s pass precedes 23.5s gate satisfaction; good causal order, undermined by blocker 2. |
| loop 01 | 4 | 4 | 3 | 4 | 8.5s result reaches controller; 22.5s CONTINUE returns to agent. Useful first definition; no particular stopping rule is visible at 17.5s. |
| loop 02 | 2 | 3 | 3 | 4 | 8.5s packet says only ASSERTION, despite caption promising expected/actual behavior. Neither the discount example nor its input/values is shown; old runner verdict persists after repair. |
| loop 03 | 4 | 4 | 3 | 4 | 10.5s 12 pass → 17.5s success rule met → 24.5s stop + handoff. Clear bounded success; final destination and evidence contents remain abstract. |
| loop 04 | 4 | 4 | 3 | 4 | 0s 0 selected; 17.5s policy stops edits; 22.5s COMMAND + LOG reaches engineer. Clear distinction from a pass. No concrete selector illustrates the cause. |
| loop 05 | 3 | 4 | 2 | 4 | 10.5s last attempt used → 17.5s continuation denied. Adds an important boundary, but no count, timer or blocked return path demonstrates the title's “attempts and time.” |
| context 01 | 4 | 4 | 3 | 4 | 3.5s disk-only contract → 10.5s contract included → 15.5s context sent. Strong beginner distinction between existence and supplied input. |
| context 02 | 3 | 4 | 3 | 4 | 10.5s code + contract; 17.5s source references. Explains selection but shows no competing irrelevant record or actual source reference to evaluate. |
| context 03 | 3 | 4 | 3 | 4 | 8.5s KEEP total_cents travels into input; by 10.5s input has no persistent constraint label. 17.5s field preserved is appropriately still a proposed patch, with verification caveat at 24.5s. |
| context 04 | 3 | 4 | 2 | 4 | 8.5s GOAL + CONSTRAINT → 10.5s contract referenced → 15.5s handoff. No visible goal/field/evidence/open-question record survives; 21–27.9s advice is detached from a concrete example. |
| context 05 | 4 | 4 | 3 | 4 | 10.5s fixture runs, 17.5s field present, 22.5s RESULT + REVISION. Good distinction between claim and check; 24.5s evidence destination remains empty of the promised record. |
| harness original astra | 4 | 4 | 4 | 4 | 3.5s owner passes; 6.5s other tenant fails; 12.5s patch 2 has cleared results; 18.5s both pass; 22.5s human review ready. HTTP codes/tenant vocabulary need an introductory explanation. |
| loop original astra | 4 | 4 | 3 | 4 | 6.5s patch 1 explicitly untested; 10.5s pass routes to review; 17.5s zero selected routes to stop by 20.5s. Task A→B switch at 14.5s is dense for a first viewing. |
| context original astra | 4 | 4 | 3 | 4 | 8.5s missing constraint, 14.5s failed fixture, 18.5s restored handoff still failed, 22.5s WAIT, 24.5s PASS. Strong causal contrast; “fixture” and the two-session setup require prior explanation. |

## Comparative judgment

**Harness:** The 140s sequence introduces runtime, setup, evidence, feedback and gating in a teachable order; its captions explain things the 28s original assumes. The original is substantially stronger at demonstrating a whole repair cycle: expected/actual values coexist, old evidence clears on revision change, both access cases rerun, and human review remains a distinct stage. Retain the original as the worked example; correct 04/05 before recommending the complete introductory sequence.

**Loop:** The sequence separates continuation, repair, success, missing tests and budget exhaustion, adding a boundary absent from the original's selected examples. Its 140s duration gives each term room. The 28s original better demonstrates distinct branches, current-versus-old evidence, and a visibly disabled edit path. Lesson 02's generic ASSERTION and lesson 05's word-only budget weaken transfer to practice. Use the sequence for definitions and the original for synthesis; improve those two lessons before claiming the sequence is the stronger practical demonstration.

**Context:** The sequence's disk-versus-input distinction and retrieval step are valuable prerequisites missing from the 30s original. Its progression through constraint, handoff and verification is coherent, with appropriate caveats. However, 140s of mostly generic containers loses the original's memorable contrast: a particular requirement disappears, a check fails, the requirement returns, and only a later check passes. Keep that original example alongside the introduction. No blocking semantic contradiction was found in the context samples.

The additional duration buys explanation, not automatically better learning. Seven-second caption beats provide comfortable reading time; identical timing across all lessons makes simple transfers feel slow, especially context 04 and loop 05. Long final holds are legitimate finite-video conclusions, not loop defects. Captions are a strength here and should remain.

## Highest-value teaching improvements

After the state defects above:

1. **Make the failure specific** — loop 02, 7–14s, M. Replace ASSERTION with a small failing-input / expected / actual example from the intended discount scenario, and retain it while the agent repairs. This teaches why the observation selects a repair.
2. **Keep an inspectable evidence record** — harness 03, 7–28s; context 05, 21–28s, M. Show a short illustrative command, revision and result inside the receiving record. The moving packet can then disappear without erasing what was learned.
3. **Demonstrate the budget** — loop 05, 0–21s, M. Show an illustrative remaining-attempt count and an actual blocked continuation. Either show a time limit as a separate condition or narrow the title to attempts.
4. **Retain concrete context through handoff** — context 03 at 9.5–28s and context 04 at 7–28s, M. Keep `total_cents` and a source reference visible inside input/handoff, then show what the next session receives. Add a small omitted-constraint contrast if time permits.
5. **Show the selection decision** — context 02, 7–21s, M. Contrast the chosen endpoint/contract with one irrelevant record and explain why that record is excluded. Avoid suggesting that less context is inherently better.
6. **Scope and define beginner terms** — harness 04, 0–7s; context 05, 7–14s, S. Add “this example expects denial (403)” and “fixture: a saved response check.” Preserve the existing limits on what passing checks establish.

## Encoded verification and hash ledger

All 18 encodes decoded completely with ffmpeg exit 0 and no error output. All are 1080×1920 and contain audio. Lessons are exactly 28s; originals are 28s, 28s and 30s respectively. Every file has `moov` before `mdat`. Measured sample peaks: lessons **−15.1 to −10.5 dBFS**; originals **−4.6 / −4.0 / −2.0 dBFS**. None crosses the review threshold of −0.5 dBFS. Spectrograms show sparse event bursts; they do not establish audibility or pleasantness. The lessons' lower peaks warrant listening alongside originals before any level adjustment.

SHA-256 was captured before extraction and checked again after visual/audio analysis: **18/18 unchanged**. Each value below is both the before and after hash. These judgments apply only to these encodes; a new encode requires renewed review.

| Reviewed file | SHA-256 before = after |
|---|---|
| `public/lessons/harness-engineering/01.mp4` | `554078fc247732f4a7d3a32900e1a3c6dcd6e53ec6a911c6ffe864b22d54f5df` |
| `public/lessons/harness-engineering/02.mp4` | `fad429c48c47c250c831316f3546c783c5e15aae70f2293fcf7327adaf0fbd04` |
| `public/lessons/harness-engineering/03.mp4` | `1ba7f5764355282307b15bcd47aad57f726ee0dd61679689e8bc57cdcd593f27` |
| `public/lessons/harness-engineering/04.mp4` | `e79a8ffd831fdc2207b5ebb9bd290b8ae4b0f03e5b00331538f34a5c5eb377b5` |
| `public/lessons/harness-engineering/05.mp4` | `d60843d0985ecd0b36e7fb99cc19ebc8c5b183ab25e4e6a6ed903ad4cd6df371` |
| `public/lessons/loop-engineering/01.mp4` | `143faede3ca34d6696188f44c902a572ef0383d8333a34d55b29ca6fc46e1068` |
| `public/lessons/loop-engineering/02.mp4` | `6f391f15664657747398dce15502ab8a93db9fc7aab721aeb37f9824c1a0863a` |
| `public/lessons/loop-engineering/03.mp4` | `be164f6374db7908439d302f401a1e5a7a9f6376e9ee89d46f6c134405bab380` |
| `public/lessons/loop-engineering/04.mp4` | `95d4cc5e5617dd687cef293e051dcd167a7bd40481f4ef25df156b49ddf0b47a` |
| `public/lessons/loop-engineering/05.mp4` | `148870d57d81e348e40d3585529ba1a63d4fefac20a898bfd06ba7daf242cea4` |
| `public/lessons/context-engineering/01.mp4` | `0d5e987a481d22ae9647355fad16ba50b2de9d41b6ddf0ffa31bf31f2c0b9572` |
| `public/lessons/context-engineering/02.mp4` | `249574c0f889f7676087f9020f131bbeb672b61abb3c132dbbad29791596afca` |
| `public/lessons/context-engineering/03.mp4` | `cd3f98b7346dd6d1dd36a42bc8c1302a693bb73996f90cdb24c22b7ab73840bb` |
| `public/lessons/context-engineering/04.mp4` | `8c47768af8ed4e9e32ec554a2887a41fe5b75ed5a5e1274cb124753d60305c9a` |
| `public/lessons/context-engineering/05.mp4` | `7984f379b9026145811620e234bf5e8888a641820a1bdf22331cf58cad4c0e33` |
| `public/media/harness-engineering/astra.mp4` | `91cc732764f54ad514cb601c021ead21c72b0181533013cdd16fb22432697482` |
| `public/media/loop-engineering/astra.mp4` | `a1da4bd5a241ef482f40958e2265158084ec9a1984968d01f2b08211399140c9` |
| `public/media/context-engineering/astra.mp4` | `a56bb2d0a3aefc569b46893e5428a6b7cb5f9c51740493146e88ae8b361519e1` |

## Repair verification — 2026-10-20

**The two harness blockers are resolved in the corrected encodes. Loop 02's stale verdict is resolved, with a residual progress-bar defect; loop 05's numeric budget and title repairs are verified. No new blocking teaching defect was found in these four sampled encodes.** Everything above remains the historical review of the earlier hashes; this appendix supersedes only the four judgments below.

Scope: re-read the review instructions and intended lesson JSONs; inspected encoded frames only, without scene/source edits. All four received 0, 3.5, 10.5, 15.5, 16.5, 17.5, 21, 22.5, 23.5, 24.5, 26.5 and 27.9s samples at 350px and native pixels. Harness 04 and loop 02/05 also received native samples at 1.5, 8.5, 9.5 and 25.5s; selected extra 350px checks covered loop 02/05 at 8.5s and harness 04 at 25.5s. Native inspection used full-width, unscaled difference atlases as described above. This is sampled transition inspection, not continuous playback. Audio was analyzed, **not heard**. Originals were not visually re-reviewed; comparison below refers to the initial inspection.

| Corrected lesson | Verification and remaining limitation | C/A/P/L |
|---|---|---|
| Harness 04 | **Blocker resolved.** 21–24.5s samples show amber `new run pending`, with an empty then advancing bar; 25.5s shows green `observed 403`; 26.5 and 27.9s retain `403 check passed` on the patch. This supplies a fresh observation and scopes the verdict. Opening caption now explicitly says `This example`. Minor timing issue: at 21–24.5s the caption already says `Now it returns the expected 403` while the run remains pending. Delay that sentence until the result; label an active run `running` if distinguishing it from queued work. | 4/4/3/4 |
| Harness 05 | **Blocker resolved.** At 15.5–17.5s, `checks passed` coexists with `review pending`, replacing `unverified`. At 23.5–27.9s the gate is satisfied while review remains pending. This preserves the distinction between a passing check and complete approval. Minor timing issue: the 21–22.5s caption announces permitted advancement before the merge-path label changes from blocked at 23.5s. | 4/4/3/4 |
| Loop 02 | **Stale verdict resolved; specificity partly improved.** At 8.5s `90 ≠ 100` reaches the agent; the runner retains `expected 90, got 100` through 15.5s. At 16.5s it changes to `not yet rerun` alongside `needs retest`; 23.5–27.9s explicitly says `new run pending`. No old failure is presented as the repaired revision's result. **Residual S defect:** the bar remains full at 16.5–27.9s despite those pending labels; reset/hide it until a fresh run advances. The numbers still lack a visible input, discount rule or units: add an illustrative “100 less 10% → 90” assertion to explain why this repair follows. These are nonblocking because current evidence status is explicit. | 3/4/3/4 |
| Loop 05 | **Count and title repairs resolved.** Title is `Limit repair attempts`; 0–3.5s shows `1 attempt left`, 8.5s sends `FAILED ATTEMPT`, 9.5–10.5s shows `0 attempts left`, and 15.5–27.9s denies continuation. Handoff travels to the engineer at 22.5s. This demonstrates budget consumption without promising an unshown timer. Remaining teaching limitation: denied continuation is stated rather than demonstrated by a blocked return path; the final engineer box retains no failure/evidence record. | 4/4/3/4 |

Labels and captions remain readable at native resolution and 350px; no text clipping or overlap was found in these samples. Atlas cropping is not encoded clipping. The fixed seven-second beats still feel slow for simple transfers, but the new states make their causal order substantially clearer.

**Comparative update:** the repaired harness sequence can now serve as the progressive introduction without the previously identified terminal contradictions. Its original still offers a denser worked example with both access cases and revision-specific evidence. Loop 02 now demonstrates expected/actual values, and loop 05 adds a concrete exhaustion case beyond the original comparison's selected branches. The originals remain useful synthesis examples; these repairs do not establish that the sequences replace them. Unrelated historical teaching recommendations remain open.

All four files fully decoded with exit 0 and no error output, are 1080×1920/28s, contain audio, and place `moov` before `mdat`. Peaks in table order: −12.9, −10.2, −10.4, −13.9 dBFS. No measured clipping-level blocker; listening and synchronization judgments remain unverified. Evidence is in `scratch/reviewer-1/repair-verification/` (`evidence.json`, PNGs, native atlases and audio logs).

Each SHA-256 below differs from its historical entry and was unchanged from before extraction to after inspection:

| Reviewed corrected file | SHA-256 before = after |
|---|---|
| `public/lessons/harness-engineering/04.mp4` | `5527d5e80373fc59736e195f071254b752cc1ceb39fb1892e57017790315799c` |
| `public/lessons/harness-engineering/05.mp4` | `793422041a55e31d08cd8ad8dfc69ab1a3fbb0fab1ffe2a931a01fe0f1479c4e` |
| `public/lessons/loop-engineering/02.mp4` | `291699f1c48ddd2c5651fc23536a1207c9457f82a46e90a4487c781081b0519e` |
| `public/lessons/loop-engineering/05.mp4` | `bfa9af07eb1df9086248bd766e3b8b9874377a6344bb302182974173a88f95c0` |

**Outside-scope hash discrepancy:** 13 of the other 14 initially reviewed files still match their historical hashes, including all three originals. `public/lessons/harness-engineering/01.mp4` instead now hashes to `a5a149b1d62f580367577b7a8ac9bd05a2c63091ffdae518a9e144aa46116388` (historical `554078fc247732f4a7d3a32900e1a3c6dcd6e53ec6a911c6ffe864b22d54f5df`). It was hash-checked only, not visually re-reviewed in this four-file pass. Its current encode therefore lacks coverage from this report; renew that review before treating all 15 current lessons as reviewed. See `unchanged-others.json`.

## Final render refresh supplement — 2026-10-20

**Current verdict: no blocking contradiction found in the inspected states of these 15 encodes.** The original harness 04/05 blockers remain resolved. Arrival highlights no longer erase the explicit state colors in the sampled post-arrival/final frames. One nonblocking progress-state inconsistency remains in loop 02, detailed below. This supplement covers all 15 current lesson hashes, closes the earlier harness 01 coverage gap, and supersedes the earlier hash ledgers for current-file identification. All earlier findings and repair observations remain historical.

### Inspection scope and evidence

Re-read repository review instructions and all three intended lesson JSONs. Re-extracted each current encode at **0, 3.5, 9.5, 10.5, 16.5, 17.5, 23.5, 24.5, 25.5, 26.5 and 27.9s** and inspected complete layouts at 350px width. Inspected each file's three node borders, labels and progress bars at **native pixel scale at 10.5, 17.5, 24.5 and 27.9s**, using unscaled crops (x200:880; y540:760, 890:1110, 1240:1460). These crops deliberately omit inter-node paths and captions; complete 350px frames provide layout/context. Crop edges are not video clipping. Full native source PNGs remain in scratch.

This is a targeted state-persistence refresh, not a new uninterrupted viewing or exhaustive frame audit. The earlier full-beat teaching/comparative review stands for unchanged content; its initial scores, updated by the four-file repair scores, are not raised merely for persistent colors. No scene JS, storyboard, author_sequences.py or compiler source was inspected. The reported compiler cause comes from the user; the persistence findings below come from decoded pixels. No other topics or agents' reviews were inspected. Captions remain permitted and these are finite videos.

### Observed post-arrival and terminal states

Identifiers below map to the exact paths/hashes in the final ledger. “Through finish” means sampled at 23.5, 24.5, 25.5, 26.5 and 27.9s, not every intervening frame.

| Lesson | Current encoded evidence |
|---|---|
| Harness 01 | 10.5s shows EXECUTE approaching the tool; 17.5s tool progress advances. Through finish, tool bar is full, runtime remains amber `validate call`, and model has no false pass/fail label. No stale success/failure color found; a retained result would still improve the ending. |
| Harness 02 | 9.5/10.5s green `revision recorded` and amber `task loaded` persist. Through finish, setup remains green `baseline saved`; no pulse resets it. |
| Harness 03 | 9.5/10.5s run record is green `evidence saved`; 16.5/17.5s it becomes amber `revision + result`, retained through finish. No assertion of unearned test success. |
| Harness 04 | 16.5/17.5s patch stays amber `unverified`; 23.5/24.5s access tests stay amber `new run pending` with advancing progress. At 25.5s tests turn green `observed 403`; 26.5/27.9s both tests and scoped `403 check passed` patch remain green. No old red failure returns. |
| Harness 05 | 16.5/17.5s required check is green `checks passed`, patch amber `review pending`. Through finish, merge path stays green `gate satisfied`, while review remains pending. The previously observed grey reversion at 24.5s is absent. |
| Loop 01 | 16.5/17.5s controller is amber `evaluate result`, retained through finish. No success or exhausted-budget state is falsely shown. |
| Loop 02 | 9.5/10.5s runner is red `expected 90, got 100`; 16.5/17.5s runner and code are amber `not yet rerun` / `needs retest`. Through finish, runner is amber `new run pending`, code remains amber. Old failure color/verdict does not return; full-bar inconsistency remains. |
| Loop 03 | 9.5/10.5s green `12 pass`; 16.5/17.5s green `success rule met`; through finish green `stop + handoff` alongside the retained pass. |
| Loop 04 | 9.5/10.5s agent is red `evidence missing`; 16.5/17.5s changes to amber `stop edits`. That persists through finish while runner remains red `0 selected`; no false pass. |
| Loop 05 | 3.5s `1 attempt left`; 9.5/10.5s red `0 attempts left` now stays red after arrival. At 16.5/17.5s and through finish, red `continuation denied` persists. |
| Context 01 | 9.5/10.5s and through finish, green `contract included` remains distinct from amber `contract on disk`. |
| Context 02 | 9.5/10.5s green `code + contract`; 16.5/17.5s green `source references` in model input. Both persist through finish. |
| Context 03 | 16.5/17.5s and through finish, `PROPOSED PATCH / field preserved` stays amber. The final caption still requires verification; no green verified-success signal is introduced. |
| Context 04 | 9.5/10.5s green `contract referenced` persists through finish; next-session node has no contradictory status. Retaining actual handoff contents remains an optional improvement. |
| Context 05 | 16.5/17.5s and through finish, green `field present` remains on the compatibility test. Review-evidence node stays neutral, with no unsupported claim that every behavior passed. |

### Remaining inconsistency versus optional refinements

**Nonblocking state inconsistency — loop 02, 16.5–27.9s sampled, S:** the runner's bar remains completely full beside `not yet rerun`, then `new run pending`. The label correctly denies fresh evidence, so this does not recreate the old false-verdict blocker, but the completion graphic contradicts the pending state. Reset or hide the bar on revision change and advance it only during the new run. This is a real residual defect, not a color-persistence failure.

**Optional teaching/timing refinements:** harness 04 at 23.5/24.5s still announces “Now it returns the expected 403” while the diagram is pending; align that sentence with the observed result at 25.5s. The earlier harness 05 caption-lead observation remains historical and was not resampled at 21/22.5s in this pass. Retain the prior suggestions for a meaningful discount input/rule in loop 02, concrete evidence/handoff records, a demonstrated blocked continuation in loop 05, and persistent context constraints. Harness 01's `validate call` and loop 01's `evaluate result` remain generic after their final transfers; distinguishing role labels from current execution states would sharpen closure. These refinements do not block the reviewed introductory sequences. No new comparative superiority or learner-outcome claim is made.

### Final current-file hash ledger

All 15 files decoded completely with exit 0 and no error output; each is 1080×1920, 28s, contains audio, and has `moov` before `mdat`. Measured peaks range from **−15.1 to −10.2 dBFS**, with no clipping-level blocker. Audio was analyzed, **not heard**; audible quality and event synchronization remain unverified. No browser/device or external technical-source audit was added.

Every hash below was captured before extraction and matched after visual inspection: **15/15 stable**. All differ from their latest visually reviewed predecessor; harness 01 matches the previously flagged hash-only observation and is now visually covered. Scratch evidence: `scratch/reviewer-1/final-refresh/evidence.json`, per-file native PNGs, `sheet-350.png`, `native-states.png`, and audio logs. Historical report text was preserved byte-for-byte; only this supplement and reviewer scratch were written. No source/media edits or publishing.

| Current reviewed file | SHA-256 before = after |
|---|---|
| `public/lessons/harness-engineering/01.mp4` | `a5a149b1d62f580367577b7a8ac9bd05a2c63091ffdae518a9e144aa46116388` |
| `public/lessons/harness-engineering/02.mp4` | `9fff8a5b7f33290cd9728a77b5b2bbcce5b2bbed6c1d4dea638c58a9bbbeb8c8` |
| `public/lessons/harness-engineering/03.mp4` | `165f5e173bb6ac34c115a0dbf69329b4c6881ddef4098a435cd2374f129e05fc` |
| `public/lessons/harness-engineering/04.mp4` | `2cd1bed8d11bf924ef5a96c1a2a790e4bafa0e4eb776c1ecbaaa130139ef2dfb` |
| `public/lessons/harness-engineering/05.mp4` | `e2bf45daea1932b22820c0b1b97336caca6c33d38274e0f6c767fef2f3bed34f` |
| `public/lessons/loop-engineering/01.mp4` | `6d233bc79980798a9f67fdcdee3316e93bfc03fcf60561af4a4ee2aa53194a0f` |
| `public/lessons/loop-engineering/02.mp4` | `73ce9f17834f263f3073833b56bdbb3a5488bd15572ebd1a8011fa0217a5ab15` |
| `public/lessons/loop-engineering/03.mp4` | `faed3b21779c22d249fd7142555113bd9f0b5498851e129a5d4eaa0da242e53f` |
| `public/lessons/loop-engineering/04.mp4` | `1d410cdd58c93d60a3fb134efe792e7b9d7727401c3b51c3c8aca5fc83345ddf` |
| `public/lessons/loop-engineering/05.mp4` | `98e879d99bfe966ee97c65c0562052386edd7fc59748087c87b979d3685abda2` |
| `public/lessons/context-engineering/01.mp4` | `24935f40fbbe26d9caa30040ce6ad6c6c9a5028c00336661014a543435964172` |
| `public/lessons/context-engineering/02.mp4` | `f6661ee3a9cbb96a80e2371cd124d64e9752c08d46498a7bc5126d928b9c396a` |
| `public/lessons/context-engineering/03.mp4` | `3b5e4a7c51d82472e3d860beae0a7dc6dd99db32aa5aa14735a9eaea49dd5cb5` |
| `public/lessons/context-engineering/04.mp4` | `2ef56a1d5912ad0f5c5491bff2e096a2c1cdd0d1991baed9385da19ed25d6fcf` |
| `public/lessons/context-engineering/05.mp4` | `ad120102b97e7c1c34f2da3f05342ad86e02d8d1b5c5ac891b2c87467a867358` |
