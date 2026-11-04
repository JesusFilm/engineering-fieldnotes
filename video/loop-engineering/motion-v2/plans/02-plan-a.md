# Use a specific failure — lesson 02

## Teaching scope

One mechanism: preserve a concrete failing input and assertion, use that evidence to target an edit, then obtain a new observation for the changed code. Evidence belongs to the code that produced it; an edit does not update the old result.

Grounding: item 2 of `video/loop-engineering/sequence/lessons.json` and `content/concepts/loop-engineering.json`, particularly its discount example, current-patch evidence requirement, and warning against changing assertions. The topic records primary sources for environment feedback and pytest behavior, retrieved 2026-10-19. This plan adds no new source verification or claim about a specific runner's output format. Repository editorial guidance and the architecture-flow-video skill's style and review references inform production checks.

Show twelve selected discount tests actually executing, one specific failure, an illustrative targeted edit, the old observation becoming historical, and the same selection starting again on changed code. End with verification running, without showing a pass or another decision.

Exclude missing-test handling, stop budgets, no-progress detection, flaky tests, human handoffs, review/merge decisions, and other lesson mechanisms. The earlier lesson already establishes action admission; this excerpt assumes the edit and rerun are permitted. Do not repeat its controller panel.

## Composition: test matrix expands into an assertion inspector

Use a test runner's 4×3 result matrix above a persistent assertion inspector. Selecting the one failed test reveals its input and expected/actual values. Its evidence stays fixed below while the upper surface changes into an agent editing view. After the edit, a new-code result slot is visibly empty beside the retained old-code value. The runner then returns above with the same twelve test positions, reset to pending.

This is a software test-detail interaction, not a three-actor pipeline, physical metaphor, revision graph, or packet circuit. Two fixed surfaces carry the story; their contents and relationships change. The selected test's outline and numeric input survive those changes so the viewer can follow the same case. No camera orbit, miniature desktop, paragraph captions, or decorative terminal typing.

### Coordinates and typography

1080×1920 at 30fps. Bounds use `(x, y, width, height)`; all text positions below describe top-left anchors. Keep meaningful content within x=90–990 and y=240–1770.

| Element | Geometry | Labels and behavior |
| --- | --- | --- |
| Title | (90, 240, 900, 190) | `Use a specific` / `failure`, 84px bold; remains fixed. |
| Active surface header | (110, 470, 860, 80) | `Test runner` then `Agent edit` then `Test runner`; 66px. |
| Code identity chip | (730, 565, 230, 80) | `Code A` → `Code B`, 60px; A/B explicitly mean before/after edit, not branches. |
| Runner selection | (110, 565, 570, 80) | `Discount · 12`, 60px. Same label before and after edit. |
| Test matrix | (110, 690, 850, 330) | Four columns, three rows. Cell top-lefts: x=110/330/550/770, y=690/810/930; each 190×90. Row-major test order. 44px check/× glyphs, no tiny test names. |
| Runner result strip | (110, 1050, 850, 80) | `12 ran · 1 failed`, 64px. On rerun: `Running · Code B`. |
| Editor surface | (110, 665, 850, 440) | Occupies the matrix area only during editing. `discount` at (140, 680), 64px. Old line at (140, 790): `return price`. New code uses lines at y=790/875: `return price *` / `(1 - rate)`, monospaced 60px. |
| Assertion inspector | (90, 1180, 900, 580) | Stable container. Header `10% discount` at (125, 1210), 66px. Input row at (125, 1300): `Price 100 · rate 0.1`, 60px. Expected row at (125, 1390): `Expected 90`, 66px. |
| Actual result, before edit | (125, 1490, 800, 160) | `Code A: 100` in red, 66px; small cross at (875, 1530). Footer `Observed` at (125, 1670), 60px. |
| Actual results, after edit | Left (125, 1490, 365, 170); right (565, 1490, 365, 170) | Left: `Code A` / `100`, right: `Code B` / `—`, all 64px. Footer becomes `Fresh result pending`, 60px. Left value becomes neutral with a dashed border; it is retained, not crossed out or rewritten. |

Code lines fit within the editor width at the chosen size; do not reduce font size to force a fit. A long input line may wrap to `Price 100` / `rate 0.1` by increasing the inspector height upward and moving the expected/result rows downward within the safe region; preserve at least 24px between glyph bounds. Prefer the one-line version if measured text width fits the 810px inner width.

At 350px output width, 60–84px source text becomes approximately 19–27px. Essential labels are never the faintest inactive chrome. Resting outlines may dim; input, expected value, historical result, and fresh-result status remain legible.

Palette: near-black `#050506`, foreground `#E6E8EC`, secondary `#8B9099`, amber `#F5A524` for activity, red `#E5484D` for failure, teal `#3FB68B` for test passes. Every outcome also has a check, cross, word, or explicit empty value. The overall failure persists despite eleven green cells.

### Connections and spatial continuity

Only one temporary connector: from failed cell 6, center (425, 855), to (1000, 855), down to (1000, 1235), then to inspector edge (990, 1235). It traces once when the case opens and rests dimly during the reading hold. Remove it before the editor appears. The selected cell outline expands into the inspector outline through a 1-second interpolation; do not stretch unreadable text with it. Inspector labels fade in only when the expansion has settled.

No wires join generic actors. After the edit, the code identity chip remains at the same anchor as the test runner returns. Its change from A to B ties code to observations without introducing a version graph. The new result slot stays empty while the rerun begins.

## Five beats, approximately 46 seconds

All times are playback seconds. Holds are deliberate reading time. Stretch a hold if native-size review requires it; do not accelerate to meet the duration estimate. No narration or music. Recurring sound identities: runner C5≈523Hz, assertion inspector E5≈659Hz, agent edit G5≈784Hz. Place sounds at the relevant element's x position; no wide stereo effects essential to meaning.

| Time / beat | Motion | State and reading hold | Sound events |
| --- | --- | --- | --- |
| **0–8: Tests actually run** | 0–1: reveal runner, selection and Code A. Twelve cells start neutral. 1–4: advance a narrow amber execution outline in row-major order, one cell every 0.25s; completed cells acquire check marks, except cell 6 which acquires a red ×. 4–5: result strip appears. | All 12 cells have executed; exactly 11 checks and one ×. Show `12 ran · 1 failed`; the inspector remains absent. Hold 5–8. Individual cell speed is acceptable because the persistent completed matrix and count, not twelve spoken events, establish execution. | Quiet `work` C5 at start of each row (1, 2, 3). Soft low `thump` at cell 6 completion around 2.5; it means assertion failure, not server crash. `arrive` C5 at 4 when the summary lands. |
| **8–18: Preserve the failure** | 8–9: amber selection outline settles around red cell 6. 9–10: connector traces to the inspector and the selection outline expands. 10–11: `10% discount` and input appear. 12–13: `Expected 90`, then `Code A: 100`, appear in place. | The numerical mismatch belongs to a concrete input. Do not show only “1 failed.” Hold the complete assertion 13–18; this is an intentional longer read. Matrix and selected cell stay visible above. | `ack` C5 at 8; `arrive` E5 at 10; soft `ack` E5 at 11 for input; two quiet evidence notes E5 at 12 and lower E4 at 13 for expected/actual distinction. No success chime. |
| **18–27: Target the code** | 18–19: retract the connector; matrix/summary dissolve, editor appears in the same upper area, header becomes `Agent edit`. Inspector remains fixed. 19–21: show `return price`, with its `price` token outlined. 21–22: pulse the inspector's input and mismatch once, then settle. 23–24: old line moves up 30px and fades; replacement expression reveals as two stationary lines. | The agent changes the calculation, not the test input or expected value. Hold the new expression 24–27. Old result still reads `Code A: 100`; it never changes to 90. No inferred success. | `arrive` G5 at 19; soft `ack` E5 at 21; `work` G5 at 23 and `store` G5 at 24 on applied edit. No “repair successful” sound. |
| **27–35: Old evidence stays old** | 27–28: identity chip changes Code A→Code B. At the same boundary, inspector's wide actual-result row separates into two fixed columns: Code A / 100 on the left, Code B / — on the right. Move the existing 100 left; never duplicate it into the B slot. 29–30: left result border becomes dashed/neutral, right blank border becomes amber. Footer changes to `Fresh result pending`. | Historical failure remains visible and true for A. B has no observation. Input and Expected 90 stay unchanged. Hold 30–35 for direct old/new comparison. This extended hold is intentional, not stalled execution. | `store` G5 at 27; quiet `poof` E5 at 29 marks loss of current-result applicability, not deletion of the observation. `ack` E5 at 30 on empty pending slot. |
| **35–46: Ask for fresh evidence** | 35–36: editor dissolves into the same twelve neutral cell positions; header returns to `Test runner`. Keep `Discount · 12` and Code B identity. 37–38: execution outline activates cell 1; result strip reads `Running · Code B`. Maintain a slow amber progress pulse in cell 1 through 42. No result glyph appears. 42–45: hold the pending observation with runner active. 45–46: fade entire stage to black. | Same selection, changed code, new execution. Code A / 100 remains historical; Code B / — remains empty. The excerpt ends before the fresh result arrives. There is no pass count, review state, or stop-policy demonstration. | Quiet `send` G6 at 35 for handing the edit back; `arrive` C5 at 36; soft `work` C5 at 37 and 39. No completion chime. Final fade silent. |

## Accuracy limits

- The case is illustrative: price=100 and rate=0.1 should produce 90 in this simplified discount function. The proposed change from returning the price unchanged to applying the rate is plausible for this toy bug, not a general diagnosis inferred solely from a count of failures.
- Preserve both input values, the expected value, and test identity throughout the edit. Do not silently weaken the assertion or change which tests are selected.
- Twelve completed cells mean twelve tests executed in this example; neutral cells at rerun mean pending, not skipped or passed. The selected failing cell is one of those twelve. Counts are not proxies for coverage adequacy.
- The inspector is a curated presentation of an observation, not a verbatim pytest report. Do not label the UI a literal runner transcript or invent a real captured command/result provenance.
- Code A/B are local before/after identifiers. A's observed value remains historical evidence after the edit. It is not now a false observation; it is insufficient to establish B's behavior.
- The target repair is shown, but its correctness is deliberately unproven. Only a fresh execution can produce a new result. Do not animate 100→90 as though editing code changes prior output.
- The displayed runner duration is compressed illustration, not measured latency. The final slow running indicator is an excerpt boundary, not a timeout or blocked test.
- No permission/budget model is taught here; the environment has already permitted this scoped edit and rerun. Other outcome routes remain outside this lesson.

## Native-350 and production acceptance

These are future checks, not claims of rendering or validation performed during planning.

1. Extract and inspect individual encoded 350px-wide frames at 5, 13, 17, 20, 25, 28.5, 31, 34, 38 and 43 seconds, plus full-resolution frames and each transition's before/middle/after. A contact sheet alone is insufficient. Read the input, expected value, A/100 and B/empty without zooming. Preserve the minimum typography rather than shrinking to fit.
2. At 5s, count twelve completed test cells with exactly one failure. At 13s, identify the failed input and numerical mismatch. At 25s, identify that calculation code changed while the assertion did not. At 31s, distinguish historical evidence from missing current evidence. At 38s, identify the same tests running against B.
3. Check label bounds, especially the input row, two-line code expression, and final footer. No outline, connector, or animated result crosses text. Reproduce any alleged clipping/disappearance through an alternate extraction and independent resize before treating it as an encoded fault.
4. Verify transition invariants: Code B and the pending result appear together; no A result becomes a B result; the old matrix does not linger as B's completed results; no pass is implied before the rerun completes. The historical input and expectation never disappear during the edit.
5. Muted viewing should still communicate one selected failure directing one edit and the need for a new result. A beginner should be able to answer “What failed?”, “What changed?”, and “Why is the new result empty?” after one watch. Do not solve weak causality by adding paragraph captions.
6. Listen to the eventual encode for distinct runner/evidence/edit sounds and synchronized event cues. Separately analyze peaks and timing; record whether audio was actually heard. No clipping above −0.5dB, intrusive repeating ticks, or success sound on patch application.
7. Later rendering must use repository-pinned Puppeteer dependencies and a local engine copy, with general drawing extensions kept inside the assigned cut. Do not install into or modify the shared skill. Keep candidates local; no public media, site, shared manifest, Git commit, or deployment changes.
8. Decode the whole eventual MP4, verify dimensions/audio/duration/progressive metadata, and review boundaries as well as settled frames. Bind an encoded review to its actual SHA-256; any repair requires renewed encoded inspection. This finite ending need not match the first frame.

Planning deliverable: only `video/loop-engineering/motion-v2/plans/02-plan-a.md`. No scene, render, other lesson, provenance record, or shared configuration is part of this task.
