# Empty versus failed

## Teaching scope

One mechanism: preserve completion versus failure in the tool outcome so the answer distinguishes **zero matches** from **unknown**. Use the same read-only incident search twice, as two alternative outcomes, not as a retry sequence. The first completes with no matches; the second times out. Finish with a small transport-timeout variant: there may be no tool result to inspect, but the caller must still retain the failure.

Grounding: `video/tool-design/sequence/lessons.json`, item 4, and `content/concepts/tool-design.json` example, pitfalls and walkthrough step 3. No pagination, retries, backoff, authorization, repair loops or incident resolution. Do not infer backend recovery. The rendering brief is approximately 48 seconds at 30fps, with five beats; extend holds if necessary rather than accelerate reading.

Source check: [MCP tools specification, 2025-11-25](https://modelcontextprotocol.io/specification/2025-11-25/server/tools), consulted 2026-10-20. Tool execution failures use `isError: true`; this is distinct from protocol-level errors. `status`, `items`, and `code` below are illustrative application fields, not mandatory MCP fields. The transport distinction follows the repository lesson: a client timeout need not produce any tool result. The film is a teaching example, not a wire-format specification.

## Visual grammar and coordinates

A **request inspector with two retained run rows**. A single broad detail area expands underneath the selected row; the rows keep their outcomes as the inspector changes focus. This supports comparison without two cramped columns or a generic actor pipeline. No physical metaphors, decorative packet traffic, paragraph captions or animated typing of entire strings.

Canvas 1080 × 1920. Black background, white main text, gray neutral strokes, amber pending/unknown, teal completed, red failure. Text plus distinct check, cross and question-mark shapes make color nonessential. Coordinates below are bounding rectangles unless specified as a point.

- Title: center (540, 290), `Empty versus failed`, 82px. Subtitle `TOOL DESIGN · 4`, center (540, 390), 40px.
- Persistent query header: (80, 470, 920, 170). `search_incidents` at (115, 520), 48px; `payments · 09:00–10:00 UTC` at (115, 590), 44px. This scope remains visible throughout.
- Run A row: (80, 690, 920, 130); label `A` at (120, 750), state at (215, 750). Run B row: (80, 860, 920, 130), same offsets. Main state labels 52px. Each row has an execution strip from (215, 785) to (940, 785), or y955 for B. A pending strip is indeterminate: no percentage or invented completion estimate.
- Detail inspector: (80, 1060, 920, 340). Header at (115, 1120), 44px; three possible field baselines y1200, 1270, 1340 at x115, 50px monospace. Selection is a 6px side stroke along the active run and inspector, not a traveling connector.
- Answer area: (80, 1490, 920, 230). `Answer` at (115, 1540), 44px; conclusion at (115, 1620), 56px; scope at (115, 1680), 44px. Keep the shared query visible when the conclusion changes.
- All text stays within x110–970. Reserve icon centers (940, 750)/(940, 920), radius 24; no icons on top of labels. No wires are required. The only movements are pending indicators, selection strokes, field reveals and preserved state changes.

At 350px width, 44–56px source text becomes approximately 14–18px. Do not shrink essential labels to fit. Use separate lines rather than reducing font size. Gray held labels must remain readable; fade inactive execution strips, not comparison evidence.

## Timed beats, motion, state and sound

| Time | Motion and state | Sound and deliberate hold |
|---|---|---|
| **0–9s: complete the search** | 0–1.5s reveal query and row A `Running`. B is absent. From 1.5–3.8s an indeterminate amber segment moves within A's strip. At 4s it stops, A becomes `Completed` with a teal check. Inspector opens over 0.6s: `Tool result`, then `status: ok` at 5s and `items: []` at 6s. No result count appears before completion. | Request start: quiet `send`, C6, at 1.5s. Search activity: two soft `work` ticks, E4, at 2.2/3.2s. Completion: restrained `ack`, E5, at 4s. Result fields: one `arrive`, G5, at 6s. Hold all fields 6–9s. Empty success gets no failure buzz. |
| **9–17s: use the empty result** | At 9s highlight `status: ok`, then `items: []` at 10s, without moving either. At 11s the answer resolves to `No matches found`; at 11.8s show `In this search scope`. At 14s collapse the inspector over 0.6s; A retains `Completed · 0 matches`. At 15s show B `Same query`, establishing an alternative case. Clear the answer over 0.5s before B starts; never let A's conclusion survive as B's conclusion. | `deliver`, C5, at 11s; soft `ack`, E5, at 14.6s when A's compact evidence lands. Read the conclusion 11.8–14s and the retained A row 14.6–17s. No celebratory victory sound. |
| **17–28s: timeout is not an empty result** | B switches to `Running` at 17s; amber segment travels until 20.5s. At 20.5s stop it and show `Timed out` with a red cross. A remains complete above. The inspector reopens for B, header `Tool result`, with `status: error` at 21.5s, `code: TIMEOUT` at 22.5s, and `isError: true` at 23.5s. A short header qualifier `MCP execution error` replaces `Tool result` at 24s. No `items: []` appears anywhere in this failed outcome. | Same request `send`, C6, at 17s; same search `work`, E4, at 18/19s. Timeout: short low `thump`, E3, at 20.5s, stronger than the other cues but no explosive crash. Failure result arrival: muted `arrive`, G4, at 23.5s. Hold 24–28s. |
| **28–37s: preserve uncertainty** | At 28s select the failure fields with one amber side stroke. At 29s answer shows `Lookup unresolved`; at 30s a large `?` replaces the answer's vacant count position, while A's visible `0 matches` stays unchanged. At 31s show short answer qualifier `No result ≠ no matches`. Hold the two run rows and B answer together through 37s. This contrast is zero versus unknown, not zero versus a positive count. | Answer transition: `deliver`, C4, at 29s; subtle `ack`, C4, at 30s when the question mark lands. Silence during 31–37s is an intentional comparison hold, not filler. |
| **37–48s: failure can arrive without a result** | At 37s change B's case label to `Transport timeout` using a 0.4s crossfade. This is a variant of B, not another attempt. At 38s withdraw the entire result inspector's fields; replace its header with `Caller observed` and its body with `Timeout` / `No tool result`. At 39.5s pulse B's retained failure cross once; keep `Lookup unresolved` and the question mark unchanged. The caller state exists even though no result payload exists. Hold 40–46.5s; fade stage 46.5–48s. No fake response packet, successful recovery or restart. | Quiet `thump`, E3, at 38s for the caller's detected timeout; restrained `ack`, C4, at 39.5s for preserved uncertainty. No result-arrival sound in this variant. End without a resolution chime. |

## State and implementation constraints

Persist A's completion and zero count once established. Only B may change from an execution-error response to a transport-timeout variant. An error-result payload and absence of a tool-result payload must never be visually conflated. In the final variant, remove `isError` with the result fields: do not imply a response carrying `isError` was received after a transport timeout.

Keep the same query scope in every case. `No matches found` refers only to the completed query over the searched source; do not use `No incidents` or imply source truth/completeness. The animated activity segment shows waiting, not backend work completion. A timeout does not prove the backend stopped or that no incidents exist. Illustrative timeout timing is compressed; no production deadline is prescribed. The final qualifier uses “no result” specifically for this failed lookup, not for a successful empty collection.

If later implemented, use repository-pinned Puppeteer and cut-local engine copies; add a local inspector/row drawing helper if needed. Schedule state and sound explicitly. No shared skill changes. This assignment writes the plan only, not source, renders, review files or manifests.

## Acceptance checks for a later encode

1. Inspect actual individual encoded frames at native 350 × 622 and full size at 6.5, 12.5, 16, 24.5, 32, 40.5 and 46s. Inspect each transition at its start, midpoint and settled end; include 14–17s, 20–24s and 37–40s densely. A contact sheet alone is insufficient.
2. At 350px, read every essential field, both row outcomes and answer qualifiers without enlargement. No selection strokes or icons cross labels. If `MCP execution error` cannot fit at 44px, wrap it within the header allocation and increase the inspector height without reducing field text.
3. Verify that no success/empty conclusion appears before A completes; no zero count or empty list appears for B; A's conclusion is cleared before B runs; final B contains no tool-result fields or arrival animation.
4. After one viewing, a beginner should distinguish: completed with zero matches; execution failed with an error result; timeout observed by the caller with no tool result. They should conclude that the last two leave the lookup unresolved, not prove zero incidents.
5. Each meaningful state change has the specified actor cue. Request C6, search E-family, returned payload G-family, answer C-family stay consistent; the final transport case has no returned-payload cue. Listen to the actual encoded audio if assessing perceptual timing or comfort; waveform/peak analysis alone is not listening. Check no clipping (maximum below −0.5dB).
6. Hold settled essential states for at least 2.5s, with the explicit longer comparison/end holds intact. Avoid blinking, text typing, unexplained stale marks and automatic looping into a retry implication.
7. Decode the entire later MP4, verify audio stream and `moov` before `mdat`, and bind any encoded review to a full SHA-256. Independently re-extract any suspected visual defect before flagging it. No validation or listening is claimed by this plan.
