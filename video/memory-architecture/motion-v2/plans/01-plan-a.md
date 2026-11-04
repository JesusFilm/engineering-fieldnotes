# Current and saved context

## Scope

One mechanism: a saved record becomes available to a later model call only after the application retrieves it and includes it in that call's input. Retrieval copies information; it neither removes the saved record nor retroactively changes an earlier call.

Grounding: `video/memory-architecture/sequence/lessons.json`, item 1, and `content/concepts/memory-architecture.json`, overview and the explicit-access portion of the walkthrough. This lesson stops at supplied input. Exclude revision checks, correction, ownership, approval, permission enforcement, thread/checkpoint taxonomy, retrieval ranking and test execution. Do not demonstrate a generated answer as proof of use.

Reference consulted 2026-10-20: [Long-term memory documentation](https://docs.langchain.com/oss/python/langchain/long-term-memory). It illustrates records accessed through a store and explicit reads, and distinguishes in-memory from database-backed storage. The film uses a generic application-controlled example, not a framework-specific API claim. Persistence across process restarts depends on the backend; this film only demonstrates retention across two calls.

## Design and state

Use a **call-input inspector with a retained stored record**, not a sequence of actor boxes. The inspector has two tabs, `Call 1` and `Call 2`, and a large payload area. A saved-record strip below it stays unchanged throughout. Between these is an application staging area that appears only during retrieval. The important visual contrast is the same note absent from call 1, present in the prepared call 2, and still present in storage.

Concrete example: task `Test billing`; saved note `billing.tests` with value `pnpm test`. The command is illustrative data, not a recommendation for this repository. No command runs. The inspector's labels explicitly distinguish a prepared input from one already supplied.

Proposed duration 46s, 30fps, five beats. Black background; white essential labels; amber application activity; teal supplied inputs; blue saved-record identity. Use shapes and labels as well as color. Sparse labels only; no paragraph captions, physical containers, brain icons, or decorative flowing traffic.

## Coordinates

Canvas 1080 × 1920. Rectangles use top-left coordinates. Safe content x90–990, y460–1770. Main text 52–58px, secondary useful labels at least 44px (about 14px at native350). Never shrink important text to fit.

- Title at center (540, 280): two lines `Current and` / `saved context`, 82px, baselines 275/365. Small `MEMORY · 1`, 40px at y425.
- Inspector frame (100, 500, 880, 640). Tab centers (300, 560) and (720, 560), each 300 × 80. `Call 1` / `Call 2`, 52px. Call 2 stays outlined and inactive until preparation begins.
- Input status at (150, 665), 46px: `Supplied input`, later `Preparing input`, then `Supplied input` again.
- Task row (140, 710, 800, 100): `Task: Test billing`, 56px, baseline 775.
- Note area (140, 850, 800, 190): for Call 1 show `Saved note: not included`, 48px, baseline 930. For Call 2 use `billing.tests` at y910, 48px, and `pnpm test` at y990, 58px. Call 1's absence label is an inspector annotation, not literal text sent to the model.
- Application staging area (100, 1190, 880, 180): label `Application` at (150, 1245), 46px; operation line at (150, 1320), 50px, switching from `Retrieve billing.tests` to `Include in Call 2`. This region has no generic server node.
- Saved-record strip (100, 1460, 880, 250): header `Saved record` at (150, 1520), 46px; key `billing.tests` at (150, 1590), 50px; value `pnpm test` at (150, 1665), 58px. A solid blue leading rule identifies its persistent presence.
- Retrieved copy is a 760 × 150 overlay centered first at (540, 1300), then at (540, 945), containing the same key/value on two lines. It is never drawn over application operation text: fade the operation line before the copy arrives; retain `Application` as its owner label.
- Copy route: saved record center (540, 1600) → staging (540, 1300) → note area (540, 945). Use two separate moves with a hold between. Fade moving text while crossing frame edges, then settle full opacity before reading; keep the saved original fully visible. No persistent wire or implicit store-to-model link.

## Timed motion, state and sound

| Time | Motion and state | Sound and reading hold |
|---|---|---|
| **0–9s: current input** | By 1.5s Call 1 is selected; task row is visible. At 2s the status becomes `Supplied input` with one teal edge pulse. At 3s the note-area annotation appears: `Saved note: not included`. Call 2 is an inactive outline. Saved-record strip has not appeared yet. Hold the exact input being inspected without inventing an answer. | Call supplied: restrained `deliver`, C5, at 2s. Annotation: soft `ack`, C5, at 3s. Hold 3.5–9s intentionally for the initial distinction. |
| **9–17s: stored is not supplied** | Reveal the existing saved-record strip over 0.6s at 9s. This is disclosure of pre-existing data, not a write. At 10s pulse its blue rule and command once. At 11.5s pulse Call 1's unchanged absence annotation. No movement connects the record to Call 1; no automatic insertion occurs. Hold both regions fully readable through 17s. | Store identification: soft `ack`, G4, at 10s; current-input comparison: `ack`, C5, at 11.5s. Do not play `store`: no write is taking place. |
| **17–27s: application retrieves a copy** | At 17s application area appears with `Retrieve billing.tests`. At 19s a copy of key/value separates from the saved strip while the original remains. Move the copy into application staging over 1.4s; fade the operation line before arrival to avoid collisions. At 21s the application header reads `Retrieved copy`. Call 1 remains visibly unchanged above. Hold 21–25s. At 25s select the Call 2 tab; inspector changes to `Preparing input`, retaining `Task: Test billing` and showing an empty note slot. | Application read: `send`, E5, at 19s. Store response: `arrive`, G5, at 20.4s. New-call selection: soft `ack`, E5, at 25s. No call-supplied sound yet. |
| **27–36s: include, then supply** | At 27s application header reads `Include in Call 2`. Move the staged copy upward over 1.5s into the note area; resolve it into stable payload text at 28.5s. Status remains `Preparing input` through 31s, making retrieval/inclusion distinct from invocation. At 31s change to `Supplied input`, pulse the whole input boundary once teal, and mark Call 2 with a check. Saved strip stays unchanged. Hold 31.5–36s. | Copy placement: `arrive`, E5, at 28.5s. Actual call supply: `deliver`, C5, at 31s, matching Call 1's cue. No generated answer or execution sound. |
| **36–46s: verify both views and retain storage** | At 36s briefly reselect Call 1, labeled `Supplied input`; its original absence annotation remains. Hold 36.5–39s. At 39s return to Call 2 with the included note; this is an inspector view change, not a third call. Pulse matching key/value in Call 2 and storage at 40s, with a small `Still saved` label replacing the store header. Hold 40.5–44.5s; fade stage 44.5–46s. Neither copy disappears before the ending fade. | Tab inspection: quiet `ack`, E4, at 36/39s, distinctly softer than supply cues. Identity comparison: paired soft `ack`, C5 then G4, at 40/40.3s. No new request/deliver cues on tab changes. |

## Accuracy limits

- This is an inspection of supplied context, not a claim about everything the model could know from training. “Not included” refers specifically to this stored record in this call's input. Do not claim the model cannot guess the command.
- Retrieval and inclusion are separate observable steps. A retrieved value staged in application memory is not yet model-visible. The call boundary only becomes teal after supply.
- Current context need not be ephemeral RAM; saved state can have different persistence guarantees. No restart, process crash or permanence is demonstrated.
- The stored command's applicability is assumed for this narrow illustration, not verified. Do not add an approval badge, revision claim, test pass or guarantee of obedience. Those are outside lesson 1.
- Tabs display immutable historical inputs. Revisiting Call 1 is not another invocation and does not remove Call 2's content. The saved record is copied, never moved or consumed.
- The application is responsible for retrieval and input construction in this example. Automatic framework conveniences may implement these steps, but storage alone does not imply their execution.

## Acceptance checks for a later implementation

1. Inspect individual encoded frames at native 350 × 622 and full resolution at 5, 12, 22, 26, 29.5, 33, 37.5, 41 and 44s. Inspect every beat boundary and the start/middle/end of both copy moves. Contact sheets alone are insufficient.
2. At 350px, read the task, key, command and `Preparing` versus `Supplied` status without enlargement. Check title wrapping and the long absence annotation; wrap that annotation into two short lines if needed, retaining 48px. Avoid text overlap during copy travel and tab transitions.
3. Verify the saved source remains continuously present from its reveal to the fade. Verify Call 1 never gains the note, Call 2 is only supplied after inclusion, and tab changes generate no extra-call animation.
4. A beginner should identify what Call 1 received, what was stored separately, who retrieved it, when Call 2 could use it, and whether the original remained saved. The visual state must answer these without a paragraph caption.
5. Distinct actor sound identities: call supply C5, application E-family, store G-family. Match supply cues only to actual invocations. Listen to the encoded audio before claiming sound quality or audible timing; signal inspection is not listening. Keep measured maximum below −0.5dB.
6. Preserve the deliberate reading holds and the stationary staging interval. If the copy path or text needs longer, extend runtime instead of accelerating. Finite ending is intentional.
7. Later rendering must use repository-pinned Puppeteer and local engine copies; any inspector helper stays cut-local. No public/site/shared-skill edits are needed. This task produces only this plan.
8. Later review must decode the complete encode, confirm audio and streaming metadata, inspect alternate extracts before flagging apparent visual faults, and bind its decision to the actual full SHA-256. This plan claims no rendering, encoded review or actual audio listening.
