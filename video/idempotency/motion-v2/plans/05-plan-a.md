# Changed intent, new key

## Scope and grounding

One mechanism: compare a request's parameters with the retained parameters for its operation key. k7 already belongs to release v1 and ticket 47. Sending k7 with release v2 is rejected under this service's contract, preserving the old operation. End by separating a retry's original identity from a separately intended new operation's new key; do not submit another create.

Scope: `video/idempotency/sequence/lessons.json` item 5 and `content/concepts/idempotency.json`. The concept defines matching-parameter replay and changed-parameter rejection for an illustrative in-house service. Relevant primary source pointer: [AWS Builders' Library: Making retries safe with idempotent APIs](https://aws.amazon.com/builders-library/making-retries-safe-with-idempotent-APIs/), listed in the concept. This plan uses the repository's explicit contract rather than claiming uniform behavior across providers.

Five beats, 45 seconds. No concurrent requests, key expiry, transaction implementation, actual successful new creation, provider comparison, or automated retry strategy. One mismatched request is sent, rejected, and recorded. Ticket count stays one.

## Geometry: parameter comparison and immutable saved record

Use a **request comparison inspector** with incoming and saved parameter rows aligned under one key. Highlight the equal key first, then the differing payload. A rejection status appears outside the saved record; nothing in that record is edited. A final caller draft separates the original retry identity from a new intended operation without executing either.

1080 × 1920. Background #050506; text #E6E8EC; secondary #8B9099; matched key teal #3FB68B; changed parameter amber #F5A524; rejection red #E5484D with explicit text. Main labels 60 px, field text 54–58 px, identifiers 68 px, title 76 px.

| Element | Coordinates x,y,w,h | Content |
|---|---|---|
| Title | 90,140,900,170 | `Changed intent,` / `new key` |
| Caller request | 90,370,900,230 | `Incoming request`; `k7 · release v2` |
| Service comparison | 90,850,900,520 | `Compare parameters`; saved and incoming rows |
| Saved row | 130,990,820,120 | `Saved: k7 · v1` |
| Incoming row | 130,1150,820,120 | `Incoming: k7 · v2` |
| Comparison result | 130,1300,820,60 | `Same key` then `Payload mismatch` |
| Existing operation | 90,1440,900,180 | `k7 → ticket 47 · v1`; `Saved tickets: 1` |
| Caller outcome/footer | 90,1740,900,110 | `Rejected · unchanged record` |

Request route: (300,620)→(300,820). Rejection route: (780,820)→(780,620). Field highlights do not move values between rows. Keep the existing-operation panel visible throughout.

For final beat, replace only the caller request panel with a two-line intent guide at the same location: `Retry: k7 · v1` and `New intent: new key · v2`, 54 px. Add `Not submitted` at y670, 52 px. No concrete new key is generated, no draft is sent, and the original comparison remains below. The guide is explanatory, not an automatic error-handler action.

## Beat sheet: motion, state, sound

Caller C4, service E4, saved-record inspector A4. Lookup/comparison uses ack cues, never store/commit sounds. Rejection is a short low tone; no alarm loop or database crash effect.

| Beat / time | Motion and state | Sound / hold |
|---|---|---|
| 1 · 0–8 s · Establish different parameters | Show existing k7→47/v1 and count 1. Caller request contains k7/v2. At 3 outline v1 and v2 separately; no operation occurs yet. Saved row is already populated in service inspector; incoming row is empty until receipt. | Caller quiet `ack` C4 at 3. Hold 4–8. Different release is a requested new effect, not an update already performed. |
| 2 · 8–17 s · Lookup the reused key | Send request 9–10.5. Populate Incoming k7/v2 at service receipt. At 12 highlight both k7 values and show Same key. Existing mapping remains unchanged. | Caller `send` C4 at 9; service `arrive` E4 at 10.5; inspector `ack` A4 at 12. Hold 13–17. A key match alone does not trigger replay. |
| 3 · 17–26 s · Compare payloads | At 17.5 move emphasis from key fields to saved v1 and incoming v2. At 19 show a small ≠ between their aligned values and change result to Payload mismatch. Keep ticket 47/v1 and count 1 fixed. | Service `ack` E4 at 19, lower/shorter than a success cue. Hold 20–26. No saved field is overwritten or merged. |
| 4 · 26–35 s · Reject and preserve | At 26.5 service outcome becomes Rejected. Send rejection upward 28–29.5. Caller shows Rejected / Payload mismatch at receipt; footer becomes Rejected · unchanged record. At 31 outline existing ticket 47 and count 1 once. | Service `thump` E4 at 26.5; service `send` E4 at 28; caller `arrive` C4 at 29.5. Hold 32–35. No creation, update, or saved-result replay. |
| 5 · 35–45 s · Separate retry from new intent | At 35.5 replace caller request with the two-line intent guide and Not submitted. First underline Retry k7/v1 at 37; then New intent/new key/v2 at 39. Keep rejection and original record visible below. | Caller quiet `ack` C4 at 37 and 39. Hold 40–45 silently. Neither option is sent. The final stored effect remains ticket 47/v1 only. |

The final guide does not mean “generate a new key whenever a request fails.” It distinguishes two intentional choices: replay the original operation unchanged, or deliberately define a separate operation. Equal payloads alone also do not prove two user intentions are the same operation.

## Accuracy limits

- Rejection is this service's documented parameter-mismatch behavior. Other contracts differ; the word idempotent alone does not specify error format, parameter normalization, retention, or replay behavior.
- k7 abbreviates an identity scoped by caller and action. It is not a global content hash, authorization token, or general-purpose deduplication label.
- The stored operation and ticket remain v1. A rejected v2 request must not overwrite arguments, alter ticket 47, or create a new ticket. No HTTP status code is prescribed.
- A genuinely new operation requires a new identity in this design. The guide is not automatic key rotation after ambiguous outcomes; such rotation could duplicate an earlier effect.
- A retry retains original identity and equivalent parameters under the contract's comparison rules. This example uses simple release labels, not an exact JSON-byte equality prescription.
- The original operation record is retained and available. Expired keys, concurrent first attempts, and external side effects are outside scope. No exactly-once or eternal retention guarantee is shown.
- Timings and identifiers are synthetic. No real deployment or ticket mutation occurs beyond the already-existing illustrative record.

## Native350 acceptance and future review

- Inspect individual actual encoded frames at native 350 px width (~622 px high), plus full size. 54 px text becomes ~17.5 px. Wrap comparison rows into label/key and release lines if needed, preserving aligned fields and font size. Keep the final guide readable without zoom.
- Inspect holds at 5, 14, 23, 33, and 42 s, plus before/mid/after request arrival, key match, payload mismatch, rejection receipt, and final guide transition. Contact sheets alone are insufficient.
- At 14 s see equal k7 values but different payloads. At 23 s mismatch must be explicit. At 33 s rejection must coexist with unchanged ticket 47/v1 and count 1. At 42 s the new-key guide must clearly say Not submitted.
- No store/commit animation, overwritten v1, new ticket row, returned successful ticket receipt, or second request. Saved count stays 1 in every frame.
- Field emphasis cannot look like transforming saved v1 into v2. The mismatch symbol stays outside data fields. Caller rejection arrives only after service comparison.
- Muted playback must distinguish same key from matching intent and show rejection preserving existing state. Keep comparison and unchanged-record holds substantial; avoid paragraph captions.
- Reproduce suspected visual defects through alternate extraction before flagging. Later decode the full MP4, inspect audio peaks and streaming metadata, and listen before claiming audio was heard. Bind review to the actual full SHA-256 and renew encoded review after any re-encode.

Only this plan is assigned. Future implementation uses repository-pinned Puppeteer and cut-local engine copies. No rendering, public/site/shared-skill edits, Git operations, or other lesson work is included.
