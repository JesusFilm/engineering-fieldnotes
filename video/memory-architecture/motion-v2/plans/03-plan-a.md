# Save a useful record

## Focus and grounding

One mechanism: an application applies a write policy to a proposed memory record, retaining a supported, scoped command with provenance while leaving an unsupported guess out of shared memory. Saving is a decision, not an automatic consequence of seeing text.

Grounding: `video/memory-architecture/sequence/lessons.json` item 3 and `content/concepts/memory-architecture.json`, judgment, first two walkthrough steps and unsupported-inference pitfall. The concrete policy here is the library's proposed engineering practice, not an automatic feature of a memory backend.

Relevant primary reference: [Long-term memory](https://docs.langchain.com/oss/python/langchain/long-term-memory), consulted 2026-10-20 in this conversation, describes keyed records and explicit reads/writes. The chosen record fields and eligibility checks below are illustrative application design. Repository instructions, editorial workflow, skill and its style/API/review references have been read in this conversation and inform this plan.

Exclude later retrieval-time revision comparison, correction to r2, active-context refresh, access-control implementation, retries, test execution and durability demonstrations. The ending is a saved r1 record, not proof that it remains applicable forever.

## Design: record editor with a visible write decision

Use a broad record editor, a compact source excerpt above it and a separate thread-note strip below. Fields arrive from a named source into a proposed record; an application decision enables saving only after source, scope and usefulness are established. A second, unsupported observation remains in the thread-note strip. No generic three-box compiler, physical sorting metaphor, model-generated approval, or paragraph captions.

Example source: billing repository `AGENTS.md @ r1` says `Test: npm test`. Example task note: `Flaky e2e?`. Do not pretend either comes from the actual working repository. The source is assumed reviewed for this exercise; source inspection supports the command, not the flaky-test guess.

Five beats, approximately 47s, 1080 × 1920 at 30fps. Black background; white values; blue source identity; amber proposed/pending; teal allowed/saved; gray thread-only note. Use checkmarks and explicit statuses, not color alone. No harsh error/crash for a hypothesis that is simply not eligible for shared retention.

## Geometry and native350 typography

All rectangles are top-left coordinates. Keep x90–990 and y450–1770. Essential values 52–58px; essential labels 46px minimum (about 15px at 350px). Header 80px; subtitle 40px. Do not shrink strings to fit; wrap only at designed line breaks.

- Title centered (540, 280), two lines `Save a useful` / `record`, baselines 275/365. Subtitle `MEMORY · 3` at y425.
- Source excerpt (90, 480, 900, 220). Header `billing / AGENTS.md` at (135, 545), 48px. Revision badge `r1` centered (900, 545), 100 × 64. Excerpt `Test: npm test` at (135, 635), 58px. Label `Reviewed source` replaces the header only during its brief check; restore source identity afterwards.
- Record editor (90, 770, 900, 620). Header `Proposed record` at (135, 835), 50px; status badge at (780, 835), 46px. Rows use labels x135, values x460, baselines 925, 1010, 1095, 1180, 1265: `repo / billing`, `key / test_cmd`, `value / npm test`, `source / AGENTS.md`, `revision / r1`. Values 52px; labels 46px. These five fields remain together after saving.
- Application decision strip (90, 1430, 900, 110), label `Write policy` at (130, 1470), 46px; three compact check labels `Useful`, `Supported`, `In scope` centered x255/540/825 at y1510, 46px. Use small checkmarks above or beside them without collisions. Initially hollow marks; never display a false check before evidence.
- Thread note strip (90, 1590, 900, 160): `Thread note` at (135, 1645), `Flaky e2e?` at (135, 1715), 52px; status `Not shared` at (745, 1645), 46px. No save arrow links this note to the record editor.
- Save action is a temporary compact control at (690, 1320, 250, 60), `Save`, 48px; it fits below the last row and above the editor border. Disabled appearance until all checks pass. After acknowledgement it becomes `Saved` with a check and stays in place.
- Short copy routes: source command center (500, 635) to value field (650, 1095), source header (450, 545) to source field (650, 1180), revision badge (900, 545) to revision field (650, 1265). Use selection highlights followed by corresponding field reveals, not three simultaneous moving chips through intervening text. The source is never erased.

## Beat sheet: motion, state and sound

| Time | Visible change and causal state | Sound and hold |
|---|---|---|
| **0–9s: propose something useful** | Source excerpt appears by 1.5s. At 2.5s highlight `npm test` briefly. At 4s reveal proposed-record editor with repo billing, key test_cmd and value npm test; leave source/revision fields empty. Status is `Proposed`, save disabled. No store acknowledgement yet. Hold 5–9s. | Source read `arrive`, G5, at 2.5s. Proposal `ack`, C5, at 4s. Sparse and quiet; no success chime. |
| **9–18s: expose the unsupported alternative** | At 9s reveal thread note `Flaky e2e?`; it has a question mark from its first frame. At 11s reveal Write policy and select `Supported`. At 12s highlight the source command and the matching proposed value, without highlighting the guess. At 14s the note receives `Not shared`; it stays visible, not deleted. Status remains Proposed. Hold 14.5–18s. | Thread note `ack`, C4, at 9s. Application policy selection `ack`, E5, at 11s. Unsupported-retention decision: subdued `thump`, E4, at 14s, no crash or failure alarm. |
| **18–29s: preserve provenance and scope** | At 18s highlight source path, then populate record source at 19s. At 21s highlight r1 and populate revision at 22s. At 24s highlight repo billing plus key test_cmd as the intended reusable scope. The source excerpt remains above for direct comparison. No test result or freshness badge appears. Hold complete five-field record 25–29s. | Source field arrival `arrive`, G5, at 19s; revision arrival `arrive`, G4, at 22s. Scope confirmation `ack`, E5, at 24s. No sounds during the settled reading hold. |
| **29–38s: application permits and saves** | At 29s Useful gains a check, at 30s Supported gains a check, at 31s In scope gains a check. Usefulness means this is a recurring billing test-command lookup; support is the reviewed excerpt; scope is billing/test_cmd. At 32s record status becomes `Allowed`, save enables. Hold 32–34.5s. At 34.5s activate Save once; show `Saving` until 35.5s. Only at 35.5s acknowledgement change header to `Saved record`, status to `Saved`, border teal. All five fields stay unchanged. | Policy ticks `ack`, E5, at 29/30/31s. Write request `send`, E6, at 34.5s; storage acknowledgement `store`, G5, at 35.5s. No green saved state before acknowledgement. Hold 36–38s. |
| **38–47s: keep the useful record, not every note** | At 38s pulse source and revision rows once, emphasizing what future readers receive. At 40s pulse `Not shared` beside the still-visible hypothesis. Keep one saved command record, source excerpt, and separate thread note on screen. Hold 40.5–45.5s; fade stage over 1.5s. Do not show later retrieval or command execution. | Provenance confirmation `ack`, G5, at 38s; thread-only confirmation `ack`, C4, at 40s. Quiet final hold. No extra write or celebratory test-pass cue. |

## Accuracy limits and invariant state

- Policy is deliberately implemented by the application. The checkmarks are visible outcomes of the illustrated policy, not proof that a model can establish truth or authorization by asserting them.
- The example assumes a reviewed authoritative file and a permitted write identity. Metadata makes a decision inspectable; it does not enforce access, prove the command works or establish future applicability.
- Revision r1 identifies the source used when saving. No comparison to a current checkout occurs here. Future readers can use the provenance to check applicability; this film does not perform that later check.
- A hypothesis is not necessarily false. `Not shared` means unsupported for promotion into this shared convention record. It can remain in thread state, which itself may be persisted; do not equate thread-only with deleted or volatile.
- More repeated copies of a guess do not supply evidence. Avoid animations that merge multiple guesses into a checkmark or demonstrate frequency as authority.
- Source/key names and command values are examples. Only one command record is saved, and the guess is never inserted into it. The final record must still show repository, key, value, path and revision together.
- Useful/supported/in-scope is a deliberately small policy example, not a comprehensive production retention policy. No claim about legal retention, indefinite durability, approval ownership, backup deletion or permission enforcement is made.

## Acceptance for a later encode

1. Inspect individual actual encoded frames at native 350 × 622 and full resolution at 6, 15, 20, 23, 26, 33, 35, 37, 41 and 45s. Inspect every beat boundary, each field reveal and the saving-to-saved transition; no contact-sheet-only review.
2. Read every final field and the source revision at 350px without enlargement. The five-row editor is the densest frame: maintain 46px label/52px value minima and generous row separation. Check the disabled/enabled Save control does not touch the revision row.
3. Verify no Saved state appears before write acknowledgement; no source/revision value is invented or mismatched; the source excerpt remains unchanged; the unsupported note never enters the shared record.
4. A beginner should identify why the command qualifies, why the guess stays separate, and what source/revision information travels with the saved value. The explanation must not depend on paragraph captions.
5. Keep staged checkmarks slow enough to read and hold the completed record for at least 4s before saving, plus the final comparison. Extend runtime rather than compress these holds.
6. Use C-family for session observations, E-family for application decisions, G-family for source/store events. The write acknowledgment must have its own audible event. Listen to the actual encoded audio before claiming perceived quality or synchronization; signal analysis alone is not listening. Check maximum below −0.5dB.
7. If implemented, use repository-pinned Puppeteer and cut-local engine copies/helpers. No shared skill, public/site, manifest, Git or deployment changes are included in this assignment.
8. Later review must decode the entire encode, verify audio and streaming metadata, reproduce suspected visual faults via alternate extraction, and bind its decision to the actual full SHA-256. This plan claims no rendering, encoded validation or listening.
