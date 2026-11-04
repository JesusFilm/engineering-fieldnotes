# No tests is not a pass — lesson 04

## Scope and mechanism

A mistyped selector leaves no tests selected, so no behavior executes. The controller treats that observation as blocked validation, stops this repair-only run's product edits, and preserves the command and selection output for an engineer. Absence of assertion failures is not evidence of passing behavior.

Grounding: item 4 of `video/loop-engineering/sequence/lessons.json` and `content/concepts/loop-engineering.json`, particularly its unmatched keyword selector example, distinction between collected/selected/executed counts, and repair-only policy. The topic records primary sources for test selection, exit codes and agent feedback, retrieved 2026-10-19. This plan uses that supplied grounding; no new source audit is claimed. Editorial guidance and the architecture-flow-video style/review references inform eventual production checks.

Stay with one empty-selection run. Do not add an assertion-failure replay, collection-error simulation, budget limit, repair attempt, corrected rerun, or later lesson. Brief categorical labels distinguish empty selection from those other outcomes without depicting their workflows. End at an engineer handoff awaiting setup investigation, not a repaired selector or successful test run.

## Geometry: a test explorer filtered down to an empty result

Use a software test explorer with a selector field above a list of discovered tests. A selection operation removes the list rows from view and leaves an explicit empty-state region. The discovered count remains twelve while selected and executed counts become zero. Then the same surface becomes the evidence record for the engineer; the mistyped command is never silently corrected.

This is a familiar search/filter interaction, not a funnel, sieve, doorway, container of physical objects, or repeated three-box pipeline. No circulating packets. No test-result matrix: rows represent discovered test names, not executed tests. A persistent controller footer independently turns off product edits after inspecting the empty selection.

### Coordinates and text

Canvas 1080×1920, 30fps; bounds `(x, y, width, height)`. Text positions are top-left anchors. Keep content inside x=90–990, y=240–1790. Background `#050506`, text `#E6E8EC`, secondary `#8B9099`, activity amber `#F5A524`. Empty selection and blocked validation use amber with explicit labels; no green pass indicators or red assertion crosses.

| Element | Coordinates | Content / state |
| --- | --- | --- |
| Title | (90, 240, 900, 190) | `No tests` / `is not a pass`, 86px bold. |
| Explorer surface | (90, 490, 900, 900) | Quiet outline; header `Test selection` at (130, 520), 66px. Later `Evidence for engineer`. Use two lines for that longer header within y=500–625, moving the command down as specified below. |
| Command display | (130, 640, 820, 180) | Two lines, monospaced 60px: `pytest -k` / `discunt`. This is one shell command visually wrapped, not two commands. Highlight `discunt` with an amber underline. |
| Collection count | (130, 850, 820, 75) | `Collected 12`, 64px. It stays twelve after filtering. |
| Test-name list / empty state | (130, 950, 820, 220) | Before filter: three representative rows `discount_basic`, `discount_zero`, `discount_limit`, 60px at y=950/1025/1100. Label `+9 tests` at (690, 1175), 60px. After filter: large `0 selected`, 86px, centered in the vacated list region; `No matches` below, 64px. |
| Execution/status row | (130, 1260, 820, 75) | Initially `Not started`; afterward `Executed 0`, 64px. |
| Controller footer | (90, 1440, 900, 300) | Header `Repair-only policy` at (130, 1470), 62px. Status at (130, 1560), 66px: `Waiting` → `Stop edits`. Outcome at (130, 1650), 60px: `Validation blocked`. |
| Disabled edit indicator | (810, 1550, 100, 100) | Simple software edit glyph, neutral before decision, then slashed. No lock or physical gate. |
| Handoff status | (130, 1760, 820, 60) | `Setup check pending`, 60px; appears only at the end. |

For the two-line handoff header, use `Evidence for` / `engineer` at y=510/585, font 60px; command begins at y=680/755. Collection count remains y=850. No overlap between header and command. Do not shrink essential labels to fit.

At native 350px width, 60–86px source text is approximately 19–28px. If actual measured list-name widths exceed the region, shorten visible display names while preserving the common `discount` substring; never shrink them into miniature logs. Counts and the original command take priority over decorative chrome.

### Evidence transition geometry

At the empty-state beat, retain `Collected 12` and `Executed 0`. A compact `Deselected 12` replaces the former `+9 tests` label, using (130, 1175, 820, 70), 60px. The selected-zero state remains in the list area.

For classification, temporarily place `No tests selected` at (130, 950), 66px, replacing the large zero text for 19–23s; preserve `Executed 0` and the count rows. This is the runner outcome, not an assertion error. Do not crowd the screen with a three-outcome decision tree.

One temporary focus connector runs from the execution row at (950, 1295) via (1010, 1295), (1010, 1420) to the controller top at (950, 1440). It draws once after the observation settles and disappears after the stop. No wire crosses text. A header change and white outline mark handoff; nothing flies into a physical inbox.

## Five beats, approximately 44 seconds

Timing is illustrative. Extend reading holds if needed; do not compress to meet the duration estimate. Sound identities: test explorer/runner C5≈523Hz, controller E5≈659Hz, engineer destination G5≈784Hz. Use short synthesized cues, sparse and panned to the visible event; no narration or music. No success chime at any point.

| Beat / time | Motion | State and hold | Sound |
| --- | --- | --- | --- |
| **1. Tests exist; selector is wrong · 0–8s** | 0–1: reveal explorer, command and controller. 1–3: collection count settles at twelve; three representative rows reveal sequentially and `+9 tests` appears. 4–5: underline the command's `discunt`; briefly outline the `discount` substring in each visible name, one after another. | `Collected 12`, `Not started`, controller `Waiting`. The misspelling is visible next to real test names. Hold 5–8. These rows are discovered items, never passing results. Assume all twelve names lack the mistyped keyword. | `arrive` C5 at 1; quiet `work` C5 at 2/2.5/3 for discovery; soft `ack` C5 at 4 for selector focus. |
| **2. Selection becomes empty · 8–17s** | 8–10: selector outline pulses once; visible list rows fade in place over 0.8s, leaving their space empty. No rows turn green or red. At 10: `0 selected` and `No matches` fade into the empty region. At 11: `+9 tests` is replaced by `Deselected 12`. At 12: execution row changes to `Executed 0`. | Collected remains twelve. No runner progress animation ever starts. Hold 12–17 for comparison of collected, deselected and executed counts. The empty area is a selected view, not deletion of tests. | Soft `miss` C4 at 10 on no matches; `arrive` C5 at 11 on selection output; low `ack` C5 at 12 on zero execution. No crash sound. |
| **3. Classify the observation · 17–24s** | 17–18: focus outline moves from `Executed 0` to the empty selection. 19–20: outcome text becomes `No tests selected`; command and counts stay fixed. 21–22: the temporary connector draws down to the controller. | The controller receives an explicit blocked-validation observation, not “all assertions passed.” Controller stays `Waiting` until the next beat. Hold 22–24. Do not flash a PASS badge and then retract it; never introduce a false success state. | Quiet `ack` C5 at 17; `arrive` C5 at 19; quiet `send` C6 at 21 and `arrive` E5 at 22. |
| **4. Stop this repair-only run · 24–32s** | 24–25: footer header brightens; status changes `Waiting`→`Stop edits`, edit glyph becomes slashed. At 26: `Validation blocked` appears beneath. Connector fades by 27. | No product code has changed; no proposed patch or new run appears. Command and all selection output remain visible. Hold 27–32 deliberately: the stopped state persists while evidence remains available. | Low `ack` E4 at 25 on stop; short `deliver` E5 at 26 on blocked classification. Avoid a loud punitive rejection; the tool supplied useful diagnostic output. |
| **5. Preserve evidence for an engineer · 32–44s** | 32–34: explorer header crossfades to `Evidence for` / `engineer`; command shifts down only enough to accommodate it. Counts and outcome do not move. 35–36: a single white outline traces the evidence surface; `Setup check pending` appears below the controller. | Original command still reads `pytest -k discunt`, with `Collected 12`, `Deselected 12`, `No tests selected`, `Executed 0`. Stop state persists. Hold 36–43, then fade the whole stage 43–44. No correction, diagnostic action or resumed edit is shown. | `store` G5 at 34 on retained record; quiet `arrive` G5 at 36 on engineer handoff. Final hold and fade silent. |

The final hold is intentionally longer because the viewer must read the command and distinguish several counts. If too dense, reveal fewer decorative elements, not fewer facts or smaller type.

## Accuracy limits

- The specific example collects twelve tests, then deselects all twelve with an unmatched keyword. Do not label it “0 collected,” “12 skipped,” or “12 failed.” Collected, selected and executed are different quantities.
- `discunt` is the illustrative misspelling of `discount`. The sample assumes none of the twelve collected items matches `discunt` through its searchable names/metadata. A typo does not universally guarantee zero matches in every repository.
- The list is a representative slice of twelve discovered items, not a complete literal pytest UI. `+9 tests` communicates the omitted items before filtering. Empty selected results do not delete the collected tests.
- No tests executed means no tested behavior was observed in this run. Do not calculate a 100% pass rate from zero tests or show zero assertion failures as green success.
- An assertion failure requires executed behavior and mismatched expectations. A collection error prevents or disrupts discovery. This example has successful discovery followed by an empty selection. Keep those categories distinct without introducing other executions.
- The topic notes that an unmatched keyword can produce pytest exit code 5 even when tests were collected and then deselected. This plan omits exit codes to keep the counts and mechanism central; no “empty means exit 0” inference is allowed.
- The controller's stop is this team's repair-only policy. It is not a universal requirement that automation never diagnose test setup. A separately authorized diagnostic workflow could investigate; this clip hands the evidence to an engineer and stops product edits.
- The handoff preserves the exact faulty command and selection output. Do not autocorrect the typo in the record, imply the engineer has already fixed it, or resume execution during the ending. The pending setup check is a local illustrated workflow state, not a real message being sent.
- No claim is made about whether the product code is correct or broken. The obstacle is missing validation evidence. Twelve tests and all timing are illustrative, not coverage or performance guarantees.

## Acceptance checks for later production

1. **Native 350:** inspect individual encoded 350px-wide frames at 6, 11, 14, 20, 23, 27, 31, 37 and 42 seconds, plus full-size frames and each transition's before/middle/after. Read command, outcome and counts without zoom. A contact sheet alone is insufficient.
2. **Count invariants:** after filtering, collected=12, deselected=12, selected=0, executed=0. Before filtering, discovered rows have no result marks. No execution progress, pass percentage or failure badge appears.
3. **Causal sequence:** unmatched selector precedes empty selection; zero execution precedes controller stop; stop precedes handoff. The typo remains identical through the final record. Collection never appears to fail or lose tests.
4. **Beginner test:** after one muted watch, the viewer can explain why no pass was earned, why edits stopped under this policy, and what the engineer receives. They should distinguish “nothing ran” from “an assertion failed” and “collection failed.” If not, improve state labels and focus order rather than adding paragraph captions.
5. **Legibility and transitions:** measure the two-line handoff header, command shift, long list names and lower status placement. Keep all meaningful text above y=1820 and clear of connectors. Reproduce apparent text loss or clipping with alternate extraction and independent resizing before flagging an encoded defect.
6. **Audio:** later listen for explorer/controller/engineer identity and cue alignment. Analyze peaks separately, maximum no higher than −0.5dB. Record whether audio was actually heard or only analyzed. No empty-selection success chime or crash effect.
7. **Encoded validation:** fully decode the eventual MP4, verify dimensions, duration, audio stream and progressive metadata. Bind review to actual SHA-256; repaired/new encodes require renewed inspection. A finite ending need not match its opening frame.
8. **Local implementation:** use repository-pinned Puppeteer and a cut-local engine copy; keep any drawing extensions local. No public/site/shared-skill edits, shared manifests, Git commits, deployment or other lessons. This task produces only the plan, not rendering or author source.

Deliverable: `video/loop-engineering/motion-v2/plans/04-plan-a.md`.
