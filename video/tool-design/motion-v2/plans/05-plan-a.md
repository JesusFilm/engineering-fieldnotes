# Expose more pages

## Scope and grounding

Teach one mechanism: a returned continuation cursor makes a bounded result visibly partial; copy that exact token into a follow-up request with unchanged query scope, then stop when a successful response has no next cursor. The task needs all matching records in the specified interval and permits two calls in this illustrative example. Do not teach retries, error handling, authorization, fetching individual incidents, or operational actions.

Grounding: `video/tool-design/sequence/lessons.json` item 5 and `content/concepts/tool-design.json`, especially the example and walkthrough step 3. The concept clarifies that a record-count limit does not independently cap bytes or tokens; describe `limit: 2` as a record limit, not a response-size guarantee.

Reference checked 2026-10-20: [MCP pagination specification](https://modelcontextprotocol.io/specification/2025-11-25/server/utilities/pagination). Its list operations use opaque continuation tokens and missing next cursors to signal completion. This film's `search_incidents` pagination is an illustrative application contract, not a claim that MCP automatically paginates tool execution results. `cursor`, `next_cursor` and `limit` are application fields here. Page numbers are viewer-facing batch labels, not values computed from the opaque token.

## Design: one expanding result table with a cursor return path

Use a query editor above a cumulative result table. The first two rows stay in place; the second response appends one new row beneath a divider. A cursor chip leaves the response footer and travels up a narrow left gutter into the query's cursor field. This is a visible data dependency, not a page-turn metaphor or generic three-box chain. The application executes the model's requested search; the interface labels distinguish the request from the returned data.

Target 48s, 1080 × 1920, 30fps, five beats. Timing is subordinate to reading holds. Black background; white essential text; gray idle borders; amber partial/continuation; teal successful completion. No failure red in this successful example. Sparse labels, no paragraph captions. Cursor movement is the only long traveling element.

### Coordinates and text

Coordinates are top-left rectangles except named centers. Keep all essential text at least 46px source (about 15px at 350px width), main result values 54px. No shrink-to-fit.

- Title center (540, 290), `Expose more pages`, 84px; subtitle center (540, 390), `TOOL DESIGN · 5`, 40px.
- Task strip (140, 470, 800, 100): `All matches in scope`, 50px. A compact second line is unnecessary; budget condition is a later cue.
- Query editor (140, 610, 800, 300). Header `Requested search` at (180, 665), 46px. Lines at x180: `payments · 09:00–10:00Z` y735, `limit: 2` y805, `cursor: —` y875, all 46px monospace. `search_incidents` may replace the header only if it fits without shrinking; operation identity is secondary to the visible scope and cursor.
- Execution indicator: small circle center (900, 665), radius 16; amber while the application runs, teal only when that response arrives. Never imply the model itself executes the search.
- Result table (140, 1000, 800, 360). Header `Returned records` at (180, 1060), 46px. ID column x180; summary column x420. Row baselines 1140, 1215, 1290. Rows: `INC-42 / Errors`, `INC-57 / Latency`, then `INC-63 / Retry spike`. IDs 50px, summaries 46px. Row 3 is not visible or counted before response 2.
- Batch annotations outside table at (960, 1180) and (960, 1290): use small numeric badges `1` and `2`, 46px; explanatory `Page 1` / `Page 2` appears in the footer header instead. No miniature record cards.
- Response footer (140, 1400, 800, 120): `next_cursor: k7Q` at (180, 1468), 50px; later `next_cursor: —`. Footer top edge can carry `Page 1` or `Page 2` at y1380, 46px.
- Coverage strip (140, 1580, 800, 150): count line at (180, 1640), 54px; state at (180, 1700), 48px. Initially `2 returned` / `Partial`; finally `3 returned` / `Query complete`.
- Continuation route: source chip center (770, 1460) → (105, 1460) → (105, 875) → destination (740, 875). Draw this route only while transferring, behind content; the chip moves in the gutter and footer/query gaps, never through record text. The full `k7Q` chip is 140 × 66px. At departure, temporarily replace the footer's full line with separate `next_cursor:` label and chip so no duplicate overlapping token is drawn.

## Beat sheet: time, motion, state, sound

| Time | Motion and visible state | Sound and hold |
|---|---|---|
| **0–9s — bounded request** | Reveal task and query by 1.5s. At 2s highlight `limit: 2`, then hold until 5s. At 5s the execution indicator activates; at 6.5s response 1 arrives and two table rows reveal sequentially over 1s. Footer remains pending until the next beat; coverage says `2 returned`, with no total or completion claim. | Request `send` C6 at 5s; application `work` E4 at 5.6s; result `arrive` G5 at 6.5s. Quiet `store` G4 at 7.5s when the two-row state settles. Hold through 9s. |
| **9–18s — expose continuation** | At 9s footer resolves to `next_cursor: k7Q`. At 10s it pulses amber once. At 11s coverage becomes `Partial`; an amber underline connects the status visually to the footer without a new box. At 13s a small `More available` label briefly replaces the count line, then the count returns at 15s. Keep both rows unchanged. | Footer `arrive` G5 at 9s; status `ack` C5 at 11s. No looping tick during the 15–18s reading hold. The additional label is a state label, not a sentence. |
| **18–29s — reuse the token and scope** | At 18s task strip temporarily reads `Need more · budget OK`, held to 20.5s. At 20.5–23s move `k7Q` along the stated gutter route into `cursor:`. The original response retains its token as dim text after departure, preserving provenance. At 23s query shows `cursor: k7Q`; pulse the unchanged service/time and `limit: 2` at 24s. Task strip returns to `All matches in scope`. At 26s activate the execution indicator for request 2. The two existing rows stay fully legible. | Decision `ack` C5 at 18s. Token departure `send` G6 at 20.5s; token arrival `arrive` C5 at 23s. Request `send` C6 at 26s, application `work` E4 at 26.8s. Hold the exact copied token 23–26s before execution; no automatic fetch on cursor appearance. |
| **29–38s — append the next page** | At 29s response 2 arrives. Draw a thin divider below row 2; append `INC-63 / Retry spike` at 30s. Add the `2` batch badge and change footer header to `Page 2`. At 31.5s footer resolves to `next_cursor: —`. At 32.5s pulse this field; count updates to `3 returned`, but coverage stays amber until the next beat. Existing IDs remain untouched. | Result `arrive` G5 at 29s; new row `store` G4 at 30s; end-of-results `ack` G5 at 31.5s. Hold final footer and accumulated records 33–38s. |
| **38–48s — stop on completion** | At 38s coverage changes to teal `Query complete`. At 39s execution indicator settles idle and continuation route fades away. Retain the last request token in the query as historical request data; the current response's absent next cursor controls stopping. At 40s task strip becomes `Stop paging`. Hold all three IDs, final cursor absence and completion through 46.5s; fade the stage to black over 1.5s. No page 3, synthetic empty response or recurring request animation. | Completion `chime` C5 at 38s, restrained; quiet stop `ack` E5 at 39s. Silence during the final hold. No audio cue suggesting another request. |

## Accuracy limits and state invariants

- Show a continuation decision because the task requires remaining coverage and budget permits it. A cursor is permission to request continuation under the contract, not an obligation to fetch indefinitely. If stopping early, coverage remains partial; this alternative is documented here, not expanded into another scene.
- `k7Q` is an opaque illustrative token. Copy it exactly; never increment, decode or manufacture it. The next request retains the same service, interval and record limit.
- This example's successful second response explicitly indicates no continuation. Do not infer completion merely because it contains fewer than two records. Animate cursor absence before the completion state so the causal cue is visible.
- A dash is a display abbreviation for “no next cursor,” not a literal token to transmit. Never send `cursor: —`. Initial cursor absence and final cursor absence refer to different fields.
- `Query complete` means the pages exposed by this successful search contract have been consumed. It does not establish all real incidents, source correctness, snapshot isolation or completeness outside the specified scope. No total count is known until the example finishes.
- The table is a cumulative view, not an assertion that response 2 repeats all previous records. The divider and page badges must preserve that distinction. Do not show future rows as pre-known placeholders.
- This is a bounded illustrative read. No claims about token budgets, payload bytes, production latency, cursor expiry or cross-session persistence.

## Production constraints and acceptance for a later encode

Use repository-pinned Puppeteer and cut-local engine copies if this is implemented. Any table or cursor-route extension stays local. No shared skill, public media, manifests, Git or deployment work is part of this plan assignment.

1. Inspect individual actual encoded frames at native 350 × 622 and full resolution at 3, 8, 12, 17, 23.5, 25, 30.5, 34, 40 and 46s. Inspect each beat boundary and cursor path start/midpoint/end, especially 20.5–23s, 29–33s and 38–40s. Contact sheets do not replace these views.
2. Read all essential IDs, scope, cursor fields and statuses at 350px without enlargement. Keep the cursor chip clear of text and stage edges throughout its route. If the query scope line is too wide, split service and interval into two lines and enlarge the editor; do not shrink the font.
3. Verify exact token identity in footer and second request, unchanged scope, first-page row persistence, and exactly one newly appended record. No count implies an unseen total. No third request after completion.
4. Ask whether a beginner can identify why page 1 is partial, where request 2's token comes from, and what causes paging to stop. The answer must be cursor presence/absence, not row count or elapsed time.
5. Check that `Partial` never becomes `Query complete` before the successful no-next-cursor response; preserve the budget decision before continuation. No paragraph caption or extra actor chain should be needed to explain the state changes.
6. Preserve at least 2.5s settled reading holds for token identity and final result; keep the deliberate longer holds. Finite ending is intentional. Extend runtime if individual labels need more reading time.
7. Request sounds use C6, application work E4, result activity G-family, decision/completion C-family. Verify actual listening separately from signal analysis; check peaks below −0.5dB and meaningful event synchronization. No claim of hearing audio belongs in a frame-only review.
8. Decode the whole later encode, check an audio stream and `moov` before `mdat`, and bind its review to a full SHA-256. Reproduce any alleged visual fault through alternate extraction before flagging. This document claims no render, encoded validation or listening.
