# Reject an approval mismatch — lesson 04

## Focus and grounding

One mechanism: an executor compares the requested action with the recorded approved action, detects that the artifact differs, and blocks deployment. The same service and target do not make approval transferable. Artifact B returns for its own evidence and decision; no deployment occurs.

Grounding: `video/human-in-the-loop/sequence/lessons.json` item 4; `content/concepts/human-in-the-loop.json` example, walkthrough steps 3–4 and stale-approval exercise. [Transaction Authorization Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Transaction_Authorization_Cheat_Sheet.html), consulted 2026-10-21, supports protected transaction data and authorization checks at execution. Applying this to artifact-bound release approval is the concept's illustrative design recommendation, not an automatic framework feature.

Five beats over approximately45s. Open with B already current and approval still naming A, as in the assigned sequence. Do not spend a beat replaying preparation or approval of A. Exclude approval of B, successful deployment, runtime prerequisite changes, restart/replay, retries and exactly-once claims. The new-review state is the finite ending.

## Visual grammar

A deployment executor's field-comparison inspector, then an expanded review request for the mismatched artifact. A row cursor checks matching fields before landing on the differing artifact. Preserve both sides of the mismatch, rather than replacing A with B and losing what was approved. The results are not a generic three-box flow or a physical gate metaphor.

Use 1080×1920 at30fps. Dark #050506, primary #E6E8EC, secondary #8B9099, checking/pending #F5A524, identity #4DA3FF, mismatch #E5484D. Teal may mark a matching field, never the whole request. Useful labels50–56px; secondary44px minimum; title76px. Keep content within x80–1000/y450–1800. Coordinates below are top-left bounds except text baselines.

| Element | Bounds / anchor | Content |
|---|---|---|
| Title | center x540, baselines295/385 | `Reject an approval` / `mismatch` |
| Executor status | x90 y470 w900 h110 | `EXECUTOR` at (125,535); status right-aligned x950: idle→checking→blocked |
| Comparison header | baseline y665 | `Approved` centered x380; `Requested` centered x770 |
| Comparison region | x90 y700 w900 h460 | Row labels x125 at y765/890/1015; values on two lines below if needed |
| Action row | y715–820 | label `Action`; values `deploy` at x380 and770 |
| Target row | y840–945 | label `Target`; values `production` at x380 and770 |
| Artifact row | y965–1140 | label `Artifact`; values A at x380, B at x770, 70px; below, digest prefixes `7c2e…91af` and `92bd…04c8`,44px |
| Mismatch result | x90 y1200 w900 h100 | `Artifact mismatch`,56px; initially empty |
| Deployment counter | baseline (125,1390) | `deploy calls: 0`,52px, persistent from opening |
| Review request region | x90 y1460 w900 h290 | Initially `No new decision`; ending `Review B`, `Evidence: T8 on B`, `Decision: pending` |

Avoid a cramped three-column table: place row labels above the value pair in each row, centered x540. Approved/requested headings align to value centers. Reserve a slim rail x105 for the active-row cursor. If production is too wide in either half, use48px and retain generous column separation; do not abbreviate to an ambiguous environment name.

A matching tick appears at center (575,800) for action, then (575,925) for target. Artifact comparison uses `≠` at (575,1070) plus the text mismatch below. Identity text stays neutral/blue until comparison; red means authorization mismatch, not a defective artifact.

No moving packet reaches a production node. Blocking is a status change inside the executor, verified by a zero deployment counter. The new-review request is a separate workflow action, not a second attempt to deploy. A copy of B's label moves from (770,1030) via (960,1250) to (770,1515) over1s, with source B retained. Its route uses blank space outside the result text; if overlap is unavoidable, replace the moving label with a dot and reveal B at arrival.

## Timed motion, state and sound

All times are playback seconds at speed1. Holds are intentional; there is no progress animation implying eventual automatic approval.

| Beat | Visible motion/state | Sound |
|---|---|---|
| 1. Same request type, different artifact, 0–9s | 0–1: executor idle and approved/requested headers reveal. At2 action pair appears; at3.2 target pair. At4.5 approved A/digest appears; at5.8 requested B/digest appears. At6.5 show calls0 and No new decision. Hold6.5–9. No full-row verdict yet. | Approved record `arrive` C5 at4.5; request `arrive` E5 at5.8; quiet executor `ack` G4 at6.5. Soft neutral reveal ticks at2/3.2. |
| 2. Compare the fields, 9–19s | At9 executor becomes checking. 9.5–10.3 cursor selects Action; both deploy values highlight, small local match tick at11. At12.5–13.3 cursor selects Target; both production values highlight, match tick at14. At16 cursor moves to Artifact; A/B and digests receive paired outlines by17. Hold17–19 before verdict. | Executor `work` G4 at9; `ack` G5 at11/14; neutral `work` G4 at17. No global success chime for partial matches. |
| 3. Mismatch prevents execution, 19–28s | At19.5 show ≠ between A and B. At20.5 artifact row outline turns red and result reads Artifact mismatch. At22 executor becomes blocked. At23.5 emphasize calls0 once. Hold24–28 with A, B, mismatch and zero all visible. Do not animate a failed production write: none was called. | Executor low `thump` G3 at20.5; restrained `ack` G4 at22/23.5. No crash sound or physical collision. |
| 4. B needs its own review, 28–37s | 28–29 copy B into the review request region, preserving comparison. At30 review region reads Review B. At31.5 attach `Evidence: T8 on B`; at33 `Decision: pending` appears. The existing approval column remains A. Hold33.5–37. No green evidence summary or Approve control is selected. | Request `send` E6 at28; reviewer inbox `arrive` A5 at29; evidence `store` E5 at31.5; reviewer `ack` A4 at33. |
| 5. Hold the bounded result, 37–45s | At37.5 outline approved A, then requested B at38.5; at39.5 outline the pending decision for B. Keep executor blocked and calls0 unchanged. Hold40–45 with both identities and new review context intact. Finite ending; no reset or B approval. | Record `ack` C5 at37.5; request `ack` E5 at38.5; reviewer `ack` A4 at39.5. Silent final hold. |

Actor pitches: approved record C, requested artifact/evidence E, executor G, reviewer inbox A. Pan to the element's x coordinate. Sends quieter than arrivals. A mismatch sound marks a permission check failing, not B failing tests. The entire causal chain must be clear muted.

## Accuracy boundaries

- A and B name distinct immutable artifacts. Digest strings are visibly abbreviated for display; actual authorization must compare full identities and complete action parameters, not prefixes or friendly names.
- Action and target match, but artifact does not. Local match ticks do not authorize the whole request. Approval of A is not rewritten, erased or transferred to B.
- Blocked means this request is not authorized by the available decision. It does not establish that B is incorrect or that a reviewer has rejected B on its merits.
- The illustrated policy requires a fresh decision for B with its current evidence. Other significant changes require revalidation and whatever new decision the applicable policy requires; do not universalize every textual edit into a mandatory human approval.
- T8 is an illustrative evidence reference associated with B. It is not proof of correctness, a real test run, or reuse of A's evidence. No test verdict for B is claimed.
- The executor check is an enforced application boundary in this design, not merely a warning drawn in a UI. A real implementation must protect the decision and prevent substitution between check and use. This clip does not demonstrate concurrency protection.
- No deployment request reaches the deployment API; calls0 is invariant. Opening a new review is not a deployment side effect. Production therefore needs no failure/rollback animation.
- Final pending review is unresolved by design. No later lesson about resumption or duplicate execution is introduced.

## Native350 acceptance and future encoded review

These are later-production checks, not completed validation claims.

1. Inspect actual individual350px decoded frames near7,11.5,14.5,18,21,24,32,34,40 and44s. Inspect both sides and midpoint of cursor movements, mismatch reveal and review-request creation at full resolution and350. A contact sheet is insufficient.
2. A beginner can identify what was approved, what is requested, why matching action/target is insufficient and what happens next. Headers must remain aligned with their columns through every state.
3. Artifact A never changes into B in the approved column; only a copy of requested B enters the new review. No transient green whole-request state before the artifact comparison.
4. Read artifact labels/digest abbreviations, production, blocked, pending and calls0 without zoom. If the table gets cramped, increase row height or remove decorative marks rather than shrinking key labels.
5. The comparison and pending review coexist for the final hold. No deployment-like animation or audio contradicts calls0. Reproduce suspected visual defects by alternate extraction before flagging them.
6. Preserve a readable mismatch hold before returning B for review. Extend timing if necessary rather than compressing the causal comparison to fit a nominal duration.
7. Listen to verify actor-specific sound when possible; report audio-signal analysis separately from actual listening. Full-decode, confirm audio, peaks below -0.5dBFS and moov-before-mdat.
8. Comparative review is against the intended lesson and public encode, not plan fidelity alone. Hash media before/after and bind the decision to the candidate SHA-256; a new encode requires renewed actual encoded inspection.

## Production boundary

Only this anonymous plan is written. No rendering, author source, other lesson, public/site/shared-skill edits, commits or deployment. Later implementation uses repository-pinned Puppeteer and a cut-local engine; custom comparison geometry stays local. Broad sequential authorization does not expand this turn's assigned plan-only scope.
