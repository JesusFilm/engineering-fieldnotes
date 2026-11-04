# Choose the memory scope

## Lesson and evidence

One mechanism: select conversation state by thread identity and shared records by namespace/key; independently choose a backend that retains those records across restart. A new conversation can use a shared billing convention without inheriting another conversation's progress.

Grounding: `video/memory-architecture/sequence/lessons.json` item 2 and `content/concepts/memory-architecture.json` overview. Scope is not lifetime: thread state can be persistent, and a cross-thread demonstration store can be in RAM. Exclude revision validation, approval, correcting active contexts, permissions implementation, record deletion, semantic search and model output evaluation.

Primary source checked 2026-10-20: [Persistence documentation](https://docs.langchain.com/oss/python/langgraph/persistence). It distinguishes thread-keyed checkpoints from cross-thread stores and notes that in-memory checkpoints are lost on process restart. Namespace/key access is also grounded in the concept's linked [long-term memory guide](https://docs.langchain.com/oss/python/langchain/long-term-memory), consulted earlier in this conversation. The concrete records, display labels and demonstration configurations below are illustrative design choices.

## Visual idea

A **scope selector and record inspector**, followed by a small **backend comparison table**. Selecting conversation A or B changes the thread record shown but keeps the billing namespace record available to both. A second namespace remains visibly separate. Then scope labels remain fixed while a restart test changes only the backend outcome column. This is software-native selection/filtering and a test result, not a physical storage metaphor or three-box flow.

Five beats, approximately 49 seconds at 30fps. Extend holds if necessary. Black background, white values, amber active selection, teal loaded/retained, blue shared-record identity, gray inactive rows. Use text and check/dash icons as well as color. No paragraph captions or typing effects. Do not use lock symbols: namespace selection is not an authorization boundary.

## Stage geometry

1080 × 1920. Rectangles use top-left coordinates. Main labels 52–56px, essential secondary labels 46px, headings 76px. At 350px these are approximately 15–18px for content. Use concise values instead of shrinking type.

- Title center (540, 285), two lines `Choose the` / `memory scope`, baselines 275/365. Subtitle `MEMORY · 2`, 40px at y425.
- Session selector (90, 490, 900, 110), two buttons `Thread A` and `Thread B` centered (310, 545)/(770, 545), each 390 × 90. A selected initially.
- Thread inspector (90, 660, 900, 270). Header `Conversation state` at (135, 720), 46px; identity `thread: A` at y795, 52px; value `step: 2` at y875, 56px. When B is selected use `thread: B` / `No saved progress` on the same baselines. Do not replace A's record globally; only change the inspected selection.
- Shared inspector (90, 1010, 900, 330). Header `Across conversations`, baseline1080, 46px. Namespace tabs `billing` / `catalog` centered (315, 1150)/(765, 1150), 330 × 80. Record row baseline1260: `test_cmd` at x135 and `npm test` at x650, both 50px. Catalog's value is `pytest`; it is never supplied to the billing task.
- Application selection line (90, 1410, 900, 120), text `Read billing / test_cmd`, 48px at (135, 1485). It is an explicit application action, not automatic shared input.
- Active-view outcome strip (90, 1600, 900, 140): `B: fresh progress` at y1655 and `billing: npm test` at y1720, 50px. Appears only after B's scoped read.
- At 32s the two inspectors transition into a single backend comparison table at (90, 680, 900, 760), with all old inspector text removed before table text appears. Title/session selectors fade out below the title band; the main title remains. Table columns: scope x135, backend x480, after-restart x770. Header uses `Scope`, `Backend`, and a two-line `After` / `restart` at y750/800, 46px. Four row baselines y930, 1060, 1190, 1320. Scope labels `Thread A`, `Thread A`, `Shared`, `Shared`; backends `RAM`, `DB`, `RAM`, `DB`; outcomes initially `—`, later `Lost`, `Kept`, `Lost`, `Kept`, all 46px. Horizontal separators y980/1110/1240. No tiny record values in this table.
- Restart control centered (540, 1540), 620 × 100, label `Restart process`, 52px. Final takeaway is a compact two-line axis legend at (135, 1710): `Scope ≠ durability`, 60px. This is a label, not a paragraph.

No persistent wires. Selection uses border changes and one restrained highlight per affected row. Changes in selected data occur in place; no record flies from one thread into another.

## Beat sheet

| Time | Motion and state | Sound and holds |
|---|---|---|
| **0–9s: one conversation's progress** | A is selected by 1.5s. Thread inspector reveals `thread: A` at 2s and `step: 2` at 3s. A small check beside the value marks recorded progress, not successful task completion. Hold 3.5–9s. B is available but unselected. | Application selection `ack`, E5, at 1.5s; thread record arrival `arrive`, C5, at 3s. No database-write or success fanfare: the record already exists. |
| **9–18s: a wider keyed record** | Shared inspector appears at 9s. At 10s select billing; at 11s reveal `test_cmd → npm test`. At 13s briefly select catalog and show `test_cmd → pytest`, then restore billing at 15s. The Thread A inspector remains unchanged throughout. Namespace changes select different records, not edits to one record. Hold restored billing through 18s. | Shared lookup `arrive`, G5, at 11s; namespace selection `ack`, E5, at 13/15s, followed by quiet `arrive`, G5, at 13.6/15.6s. No error sounds for unrelated data: it simply belongs to another scope. |
| **18–30s: new conversation, relevant shared record** | At 18s select B. At 19s thread inspector resolves `thread: B` / `No saved progress`; A's step is not copied. At 21s application action `Read billing / test_cmd` appears and the billing record highlights once. At 23s outcome strip shows `B: fresh progress` and `billing: npm test`. Hold to 27s. At 27s briefly select A again: its `step: 2` reappears, demonstrating that B's fresh state did not delete A. Hide the B outcome strip before switching views. Hold to 30s. | B selection `ack`, E5, at 18s; fresh-state acknowledgment `ack`, C5, at 19s. Application read `send`, E6, at 21s; shared result `arrive`, G5, at 23s. A reinspection `ack`, C5, at 27s. No new model call is implied by selector clicks. |
| **30–40s: test durability separately** | At 30s selection indicators settle. Crossfade inspectors to the four-row comparison table during 31–33s. Show all four example configurations with outcome dashes; they represent separate test fixtures, not four simultaneous copies of the real session. At 35s restart control highlights. At 36s simulate process restart with a brief neutral dim of the control only, preserving scope/backend labels. At 37s RAM outcomes become `Lost`; at 38s DB outcomes become `Kept` after reconnect/read. Never change scope names. | Fixture table reveal `ack`, E5, at 33s. Restart: low `thump`, E3, at 35.8s, not an outage explosion. RAM result `poof`, C4, at 37s, quiet. Persistent-backend read `arrive`, G4, at 38s. Hold all four outcomes 38–40s. |
| **40–49s: scope is not durability** | At 40s highlight the two `Thread A` rows together; one is lost and one kept. At 42s highlight the two `Shared` rows together with the same contrast. At 44s remove highlights and reveal `Scope ≠ durability`. Hold the full table until 47.5s; fade stage to black over 1.5s. No retention-duration guarantee or automatic backend migration. | Comparison `ack`, C5, at 40s; `ack`, G5, at 42s. Restrained confirmation `chime`, E5, at 44s. Quiet final hold. |

## Accuracy limits and invariant states

- Thread means one conversation's state, not one operating-system process. Starting B does not resume A unless the application deliberately chooses A's identity. A remains retrievable in the example.
- Shared means usable across relevant conversations, not globally accessible to every identity. Namespace/key selection organizes data; application authorization is separate and not taught here.
- Read the billing namespace explicitly. Browsing catalog in the inspector is a comparison, not permission to inject unrelated history. No catalog value appears in B's outcome.
- The backend table represents independent configured examples. DB rows assume successful committed writes and a durable backend available after reconnect; they do not guarantee immunity to database loss, retention deletion or failed writes. RAM rows assume no external snapshot/recovery mechanism.
- Short-term labels describe conversational scope, not required storage medium. Long-term/cross-thread scope does not by itself make an in-memory implementation restart-safe. Do not animate every thread record vanishing merely because a new conversation begins.
- `No saved progress` describes the illustrative new B fixture, not all newly opened sessions. Shared records are retrieved explicitly, not automatically included in a model's context.
- No approval or revision badges, no test execution, and no claim that `npm test` or `pytest` is appropriate for the actual repository. The task is selecting scope, not validating advice.

## Native350 and later encoded acceptance

1. Inspect actual individual 350 × 622 frames and full-resolution frames at 5, 11.5, 14, 16, 20, 24, 28, 34, 38.5, 41, 43 and 46s. Inspect each selector change, the inspector/table transition and restart boundaries. A contact sheet is not sufficient.
2. Read thread identity, progress, namespace, key/value and all table outcomes at 350px without zoom. The table is the densest frame: wrap headers only, maintain at least 46px source type, and increase vertical space if needed. Never overlap the scope/backend/outcome columns.
3. Verify B does not inherit A's step; A retains step 2 on return; billing is explicitly selected for B; catalog never appears in B's outcome. Selector changes must read as different records, not data corruption or overwrite.
4. In the restart table, scope labels and backend labels stay fixed while outcomes change. Both scopes have one lost and one kept example. No “Shared = kept” or “Thread = lost” implication should survive the final frame.
5. A beginner should answer: which conversation owns step 2, which record can be read across billing conversations, and why a thread record can survive restart. The answer to the last question must be the backend, not the scope label.
6. Use actor-specific tones consistently: thread C-family, shared records G-family, application selection/restart E-family. Listen to actual encoded audio before claiming perceptual alignment or comfort; measurements alone are not listening. Check maximum below −0.5dB.
7. Preserve deliberate holds, especially B's fresh state and the full durability table. Finite ending is intentional; runtime may grow to keep all four rows readable.
8. If implemented later, use repository-pinned Puppeteer and cut-local engine copies, with any selector/table helper local to this cut. Decode the entire encode, check audio and streaming metadata, reproduce suspected visual faults via alternate extraction and bind review to its full SHA-256. This assignment writes only this plan and claims no render or encoded verification.
