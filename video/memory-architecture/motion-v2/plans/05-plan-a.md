# Correct outdated memory

## Scope and evidence

One mechanism: supersede an outdated retained note while preserving its original source revision, publish its replacement from the current authoritative source, and select that replacement for a later task with an explicit applicability check.

Grounding: `video/memory-architecture/sequence/lessons.json` item 5 and `content/concepts/memory-architecture.json`, judgment and correction walkthrough. The lesson concerns retained records and later retrieval. Do not expand into refreshing active conversations, executing tests, permission implementation, deletion/backups or concurrency recovery. Those topics appear in the broader concept but are not this lesson's mechanism.

Example: billing/test_cmd has r1 `npm test`; authoritative `AGENTS.md @ r2` now says `pnpm test`. Retain r1 as superseded history and add an r2 record linked as its replacement. These statuses and links are deliberately implemented application policy, not automatic store behavior. The [long-term memory guide](https://docs.langchain.com/oss/python/langchain/long-term-memory), consulted 2026-10-20 earlier in this conversation, supports explicit keyed reads/writes; it does not prescribe this supersession schema. Source/version checking is the repository's proposed practice.

## Visual grammar

A **record-history inspector**: two stable revision rows under one repository/key header, with a compact authoritative-source strip above and a later task selector below. The old row never morphs into the new row. Its status changes; the replacement is a separate row with its own command and source. A bracket labeled `replaced by` joins their revision badges after publication. This makes correction explainable without a revision graph, physical metaphor or generic actor pipeline.

Five beats, approximately 48s at 30fps. Black background, white main text, blue source identity, amber pending/superseded, teal published/validated. Superseded is not red “false”: the earlier record may have been valid at r1. No paragraph captions. Large state labels, explicit values and stable geometry do the teaching.

## Coordinates

Canvas 1080 × 1920; rectangles are top-left. Essential text 50–56px, secondary useful labels at least 46px (~15px at350). Title 80px on two lines. Safe area x80–1000, y460–1770.

- Title center (540, 285), `Correct outdated` / `memory`, baselines275/365. Subtitle `MEMORY · 5`, 40px at y425.
- Authoritative source strip (100, 480, 880, 190). `billing / AGENTS.md @ r2`, 48px at (140, 540); `Test: pnpm test`, 58px at (140, 625). Source identity remains visible throughout.
- Record-history header (100, 730, 880, 90), `Memory: billing / test_cmd`, 48px at (140, 790).
- r1 row (140, 860, 840, 240). Revision badge centered (225, 920), 110 × 70, `r1`, 56px. Command `npm test` at (350, 925), 58px. Source `AGENTS.md @ r1` at (350, 1005), 46px. Status at (350, 1070), 48px: `Stored` → `Superseding` → `Superseded`.
- r2 row (140, 1170, 840, 240), identical offsets: badge center (225, 1230), command at (350, 1235), source y1315, status y1380. Initially absent; during preparation its border is dashed, `pnpm test`, `AGENTS.md @ r2`, status `Draft`; later `Current` with solid border.
- Replacement bracket outside the rows: endpoints (130, 920) and (130, 1230), via x95. Downward arrow at the r2 end; small `replaced by` label across the inter-row gap at (340, 1135), 46px. Draw only after publication; it links revisions, not commands moving out of old storage.
- Application activity strip (100, 1460, 880, 110): `Application` at (140, 1500), 46px; action at (140, 1550), 50px. Actions: `Authorize correction`, `Publish r2`, then `Read for billing @ r2`.
- Later task result strip (100, 1620, 880, 145): `Task: billing @ r2`, 46px at (140, 1670); `Candidate: r2` then `Checked: pnpm test`, 52px at y1735. It stays absent until later retrieval. No model output or test result.

Keep row source/value/status lines separate. The source strip and record rows never overlap. Reveal fields directly through matched highlights; do not send long chips through occupied rows. A brief pulse on selected r2 is sufficient for retrieval identity.

## Beat sheet

| Time | Motion and state | Sound and reading hold |
|---|---|---|
| **0–9s: source changed, stored note did not** | Show source r2/pnpm test by 1.5s and existing stored r1/npm test by 3s. At 4s highlight the two source revisions, then the commands at 5s. Keep their identities stable. A small amber status `Outdated for r2` temporarily replaces Stored at 6s. No universal falsehood mark. Hold 6–9s. | Current source `arrive`, B4, at 1.5s; saved-record reveal `ack`, G4, at 3s. Mismatch recognition `ack`, E4, at 6s. No write cue yet. |
| **9–19s: decide the correction, preserve history** | Application strip appears at 9s: Authorize correction. At 11s show a short `Writer allowed` state in that strip, representing a completed application authorization check for this fixture. At 12s r1 status becomes Superseding; source and command do not change. At 14s r2 draft row appears with command and source copied from the authoritative strip. Hold both records 15–19s. | Application authorization `ack`, E5, at 11s; correction begins `send`, E6, at 12s; draft construction `arrive`, E5, at 14s. No storage-success cue for a draft. |
| **19–29s: publish the replacement** | At 19s application action reads Publish r2. At 20s pulse r2's source identity. At 22s acknowledge the completed correction: r1 becomes Superseded, r2 becomes Current, r2 border becomes solid, and the replacement bracket appears over 0.6s. Treat this as one logical publication; no retrieval occurs mid-write. Hold completed history 23–29s. r1 retains npm test and AGENTS.md @ r1. | Publish request `send`, E6, at 19s; committed correction `store`, G5, at 22s. One restrained `ack`, G4, at 22.6s for the completed history link. No deletion/poof sound. |
| **29–39s: later retrieval still checks the task** | At 29s reveal task billing @ r2; application reads Read for billing @ r2. At 30.5s select r2 without selecting r1. At 32s task result reads Candidate: r2, amber. At 33s application action becomes Check source + task; sequentially highlight billing identity, the r2 source record and the task's r2. At 36s result becomes Checked: pnpm test, teal. Keep the source visible as evidence. Hold to 39s. | Read request `send`, E6, at 29s; memory result `arrive`, G5, at 32s; check `ack`, E5, at 33/34.5s; checked selection `deliver`, C5, at 36s. Retrieval arrival itself gets no validated-success cue. |
| **39–48s: correction keeps an explanation** | At 39s pulse r1's Superseded status and original r1 source; at 41s pulse replacement bracket and r2 source. The checked result remains visible. Hold the two intact rows and task selection until 46.5s, then fade to black over 1.5s. Do not refresh another session or claim old contexts changed. | History reminder `ack`, G4, at 39s; replacement reminder `ack`, G5, at 41s. Silence during final hold. No next write or test-pass chime. |

## Accuracy constraints

- This is an application-managed correction with an authorized writer. `Writer allowed` reports the assumed application check, not permission granted by a prompt, model or namespace. No access-control tutorial or denial branch is added.
- Preserve old provenance and content. Superseded means no longer selected as the current convention for this r2 task, not “never valid.” The old record is not erased, silently rewritten to r2, or presented as malicious.
- The displayed supersession/link fields are illustrative policy. A real implementation needs suitable publication consistency; the film presents one acknowledged logical correction, not an atomicity guarantee of all stores. Draft is not retrievable as Current.
- Later retrieval explicitly targets billing/r2, returns a candidate and checks source/task before accepting it. Do not imply “newest record always wins” or that a revision number alone validates all applicability. An r1 checkout may need historical instructions; this clip does not demonstrate that branch.
- The source is assumed authoritative and reviewed for this fixture. `Checked` means applicability in the illustrated check, not successful command execution, security approval of arbitrary text or guaranteed model obedience.
- Retaining this history is the chosen policy, not a universal indefinite-retention requirement. No claim about deletion from checkpoints/backups is made.
- Correcting storage does not mutate already supplied context. Active-context refresh is deliberately absent; no existing-call panel changes at publication.

## Acceptance for a later encode

1. Inspect individual actual encoded frames at native 350 × 622 and full resolution at 6.5, 11.5, 16, 21, 24, 28, 32.5, 35, 37 and 44s. Inspect all boundaries, especially draft-to-published and candidate-to-checked. Contact sheets alone are insufficient.
2. Read both commands, source revisions, statuses, repository/key and task at350 without enlargement. If source identity is too wide, wrap at the revision onto a second line and grow the row; do not shrink useful labels. Verify the replacement bracket/label never crosses source text.
3. Confirm r1's value and source never change; r2 is separate; published status appears only after acknowledgement. No retrieval selects a draft, and the later task gets r2 only after a visible check.
4. A beginner should be able to explain what changed, why r1 still exists, which version the later task selects, and why that selection still needs checking. They should not infer automatic active-context refresh or automatic permission enforcement from memory storage.
5. Preserve deliberate reading holds for both records and the final history view. Extend duration if necessary rather than compressing source/status reading.
6. Sound identities: current source B4, memory G-family, application E-family, accepted task evidence C5. No deletion or execution-success cues. Listen to actual encoded audio before claiming sound quality or perceived synchronization; signal analysis alone is not listening. Check maximum below −0.5dB.
7. Later implementation uses repository-pinned Puppeteer and cut-local engine copies/helpers. No public/site/shared-skill edits, other lessons, Git operations or deployment are part of this assignment.
8. Later review must decode the complete MP4, verify audio/streaming metadata, reproduce suspected visual faults by alternate extraction and bind its decision to the actual full SHA-256. This plan claims no rendering, encoded inspection or listening.
