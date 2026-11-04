# Check applicability

## Teaching scope

One mechanism: an application compares a retrieved note's source revision with the checkout, withholds a mismatched command, then reads the current instructions before supplying the command for this task. Relevant retrieval is a candidate, not a freshness guarantee.

Grounding: `video/memory-architecture/sequence/lessons.json` item 4; `content/concepts/memory-architecture.json` example and walkthrough step 3. Concrete fixture: billing, saved `AGENTS.md @ r1 → npm test`, checkout r2, current `AGENTS.md @ r2 → pnpm test`.

The application-side check is a deliberately implemented example from the concept, not a built-in promise of every store. The concept's [long-term memory reference](https://docs.langchain.com/oss/python/langchain/long-term-memory), consulted 2026-10-20 earlier in this conversation, supports explicit record access; it does not establish this custom applicability policy. Revision mismatch triggers re-reading, not a universal claim that every changed revision invalidates every command.

Exclude updating saved memory, refreshing other active sessions, permission design, writing policy, test execution and results. End with applicable evidence supplied to this call. The r1 saved record stays unchanged; later correction is outside this lesson.

## Design: revision comparison inspector

A concrete two-column comparison of **retrieved note** and **checkout source**, with aligned revision badges. Beneath them, one application decision line and one prepared input strip retain state. Initially the current source body is unread, not mysteriously known. Revision mismatch is visible before that body opens. The resulting command is copied from the newly read source into the input, while the old candidate remains labeled withheld.

No physical gate or conveyor metaphor, no generic three-box chain, no paragraph captions, no model judging its own correctness. Motion is selection, paired revision highlighting, opening a source excerpt and copying one value. Target 46s at 30fps; preserve holds even if longer is necessary.

## Coordinates and labels

1080 × 1920. Rectangles are top-left. Safe content x80–1000, y470–1760. Main values 58px; useful secondary labels 46px minimum (~15px at350). Title 84px. Black background, white primary text, blue source identity, amber pending/mismatch, teal supplied. Use textual states and comparison symbols alongside color.

- Title center (540, 300), `Check applicability`, 82px; subtitle `MEMORY · 4`, 40px at y405.
- Task strip (90, 485, 900, 100), `Task: test billing`, 56px at (135, 550).
- Retrieved-note pane (90, 660, 420, 520). Header `Saved note`, 50px at (125, 725). `billing`, 48px at y805; `AGENTS.md`, 48px at y875. Revision badge center (300, 965), 160 × 90, text `r1`, 64px. Command `npm test`, 58px centered (300, 1080). Footer `Candidate` at y1145, 46px; later `Withheld`.
- Checkout pane (570, 660, 420, 520). Header `Checkout`, 50px at (605, 725); matching billing/path baselines. Revision badge center (780, 965), same size, text `r2`. Initial command-area label `Not read`, 48px at center (780, 1080). After the explicit read it becomes `pnpm test`, 58px. Footer switches from `Read source` to `Current source`, 46px.
- Comparison mark at center (540, 965), `≠`, 60px; only appears after both revision highlights. It fits the 60px gutter; if glyph clearance is insufficient, place at (540, 1220), never overlap badges.
- Application status strip (90, 1250, 900, 130). `Application check`, 46px at (135, 1300); state `Compare revisions` → `Re-read source` → `Use current source`, 52px at y1350.
- Input panel (90, 1460, 900, 260). Header `Next input`, 48px at (135, 1520); state `Preparing` at (740, 1520), 46px. Value baseline1605, source line1680, x135. Initially `test_cmd: —`; finally `test_cmd: pnpm test` at 52px and `AGENTS.md @ r2` at 46px. Once supplied, state changes to `Supplied` and border teal.
- Source-to-input copy route is a brief blue trace from (780, 1100) via (960, 1205), (960, 1410), to (690, 1590). A small `pnpm test` chip travels only through open space, then resolves into the value field. The trace never passes through application text. Source value stays in place; the copy is not a destructive move.

## Beat sheet

| Time | Motion and state | Sound and reading hold |
|---|---|---|
| **0–9s: relevant old note, newer checkout** | Task and checkout identity appear by 1.5s; r2 appears at 2s. At 3s the saved note reveals billing, source path, r1 and npm test, with Candidate status. Its arrival is retrieval, not validation. Current source body stays Not read. Input remains preparing with no command. Hold all identities 5–9s. | Retrieval request `send`, E6, at 2.5s; saved record `arrive`, G4, at 3s. No approval chime or green input. |
| **9–18s: compare before use** | At 9s application status becomes Compare revisions. Highlight r1 at 10s, r2 at 11s; at 12s reveal ≠. At 13s saved note status becomes Withheld and its command border turns amber, while text remains readable. No value enters the input. Status becomes Re-read source at 14s. Hold 14.5–18s so the decision and empty input can be compared. | Application selection `ack`, E5, at 9s; two quiet `ack` ticks E4 at 10/11s; restrained `thump`, E3, at 13s. Mismatch is a review condition, not an explosion or assertion of corrupt data. |
| **18–29s: inspect the current source** | At 18s checkout path highlights. At 19s an opening reveal within the checkout command area replaces Not read with pnpm test over 0.6s; r2 stays stationary. At 21s footer becomes Current source. At 22s pulse the two different commands in sequence, old then current, making the actual change visible only after the read. Status changes to Use current source at 24s. Hold current path, r2 and new command through 29s. | Current-file read `send`, E6, at 18s; source arrival `arrive`, B4, at 19.6s; review confirmation `ack`, E5, at 24s. No write/store sound because nothing is saved. |
| **29–38s: include evidence, then supply** | At 29s a copy of pnpm test follows the route into the input over 1.6s. At 31s source line AGENTS.md @ r2 appears beneath it. Preparing remains visible until 34s. At 34s the input boundary pulses teal and state becomes Supplied; no command execution animation follows. The r1 note remains withheld. Hold 34.5–38s. | Copy arrival `arrive`, E5, at 30.6s; provenance `ack`, B4, at 31s; model-input delivery `deliver`, C5, at 34s. No test-pass sound. |
| **38–46s: retain the reason and result** | At 38s briefly highlight the input's r2 and checkout r2 together. At 40s briefly highlight Withheld on the r1 note without changing it. Keep old candidate, current source and supplied input visible through 44.5s, then fade to black over 1.5s. No storage mutation or next session. | Applicability pairing `ack`, B4, at 38s; withheld reminder soft `ack`, G4, at 40s. Quiet final hold. |

## Accuracy limits and invariants

- r1/r2 abbreviate source revisions in this fictional fixture; do not depict a universal sortable version-number algorithm. Compare recorded provenance with the relevant checkout/source identity.
- A revision mismatch justifies withholding pending inspection; it alone does not establish that npm test is wrong. The explicit current-source read reveals pnpm test in this example. Avoid a red falsehood cross over npm test before reading.
- Current source means instructions applicable to this checkout under the example's assumed authoritative source, not a proof of correctness or test coverage. Matching metadata alone is not sufficient to establish every form of applicability.
- The saved record is not updated, deleted or rewritten. The input receives a separate current-source value. No active session is retroactively changed.
- The input remains empty through comparison and source read, then preparing during assembly, then supplied. Never transiently supply r1 as if it had passed validation.
- The two pane labels describe data provenance; the application status line owns the decision. Nothing suggests that retrieval similarity or a store automatically performs validation.
- Do not add another repository, an authorization check, a test result, or a guarantee that the model obeys supplied instructions. The commands are illustrative, not instructions to run them locally.

## Acceptance checks for a later encode

1. Inspect individual encoded frames at native350 (350 × 622) and full resolution at 6, 12.5, 16, 20, 25, 31.5, 35, 39 and 43s. Inspect every boundary and the copy route at start/middle/end, not only contact sheets.
2. Read both revisions and commands at350 without zoom. Pane width must fit pnpm test and Current source at the stated sizes. Keep source/path/status lines separated; wrap headers if necessary rather than shrink essential text.
3. Verify ordering: retrieve → compare → withhold → read current source → include r2 evidence → supply. No green approval before reading, no stale command in the input, no accidental source mutation.
4. A beginner should identify why the retrieved note was not used directly, what evidence established the replacement, and which command/revision reached the next call. They should not conclude that every revision mismatch proves every old fact false.
5. Preserve at least 3s holds for mismatch, current source and prepared evidence. The final comparison gets a deliberate hold; extend runtime if reading requires it.
6. Actor sounds: application E-family, saved memory G-family, current repository B-family, supplied input C5. No store-write or test-success cue. Listen to the actual encoded audio before claiming audible quality/synchronization; signal analysis alone is not listening. Check maximum below −0.5dB.
7. Later implementation must use repository-pinned Puppeteer and cut-local engine copies/helpers. No public/site/shared-skill edits, other lessons, Git or deployment. This assignment writes only this plan.
8. Later review must decode the full encode, verify audio and streaming metadata, independently reproduce alleged visual faults by alternate extraction and bind its decision to the actual full SHA-256. No rendering, encoded validation or listening is claimed here.
