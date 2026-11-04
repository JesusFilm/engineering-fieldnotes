# Review a concrete action

## Focus and grounding

One mechanism: a reviewer approves a specific release record, then a separate executor checks that the artifact and target it will execute match that approved record. The agent proposes the action without acquiring deployment permission.

Grounding: item 4 of `video/guardrails-and-permissions/sequence/lessons.json` and the concrete release record, trusted approval binding and separate execution identity passages in `content/concepts/guardrails-and-permissions.json`. Repository AGENTS.md, editorial workflow and architecture-flow-video skill/style/API/review references were read earlier in this conversation and apply. No current alternative plan or author source is used.

Primary reference: [OWASP Transaction Authorization Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Transaction_Authorization_Cheat_Sheet.html), accessed 2026-10-20. Its significant-data review and server-side enforcement guidance supports tying authorization to the actual operation. This deployment UI is an instructional application of that principle, not an implementation prescribed by the source.

Exclude changed-target rejection demonstrations, replay/expiry scenarios, credential setup, direct-agent retry, rollback and later lessons. State those limits without adding a second run. Show the successful exact-match path only.

## Concrete action and visual grammar

A release review sheet becomes a pinned approved record above an executor comparison view. Corresponding artifact and target values highlight together; they do not disappear into a generic approval token. After the matches are checked, a separately labelled deployment identity performs the release. A persistent investigator badge remains read-only.

Example record r42: artifact digest shown as `a91f…7c2e`, target `checkout/prod`, operation `deploy`, test evidence `Contract tests: 12/12`. Digest is a shortened display of an immutable artifact identifier; the executor must compare the full identifier, not these visible eight characters. Counts are illustrative test evidence, not benchmark claims or proof of safety.

Canvas 1080×1920, 30fps. Black background, white content, blue agent proposal, amber review focus, teal exact-match/completion. Essential text 48–54px, yielding about 15.6–17.5px at 350px. Title 80px. Secondary labels at least 44px. Avoid paragraph captions, physical seals/keys and repeated three-box processing layout.

## Coordinates and state

Rectangle positions are top-left plus width×height; text positions are left baselines unless centered.

- Title centered (540,275), 80px: `Review a concrete action`. Wrap deliberately to two lines if needed at y=260/345; no compressed typography.
- Persistent identity strip (90,430), 900×100: (125,495), 48px `Agent: investigator`; right-aligned (950,495), 44px `read-only`. Keep both visible through deployment; never animate credentials into this strip.
- Review sheet (90,590), 900×480. Header (125,650), 52px initially `Proposal r42`, then `Review r42`, finally `Approved r42`. Rows at baselines y=730,810,890,970, labels x=125, values x=425: `Action` / `deploy`; `Artifact` / `a91f…7c2e`; `Target` / `checkout/prod`; `Evidence` / `12/12 passed`. Labels 46px, values 50px. Evidence expands during inspection into `Contract tests` at x=425,y=950 and `12/12 passed` at y=1005, growing sheet height by 50px if needed.
- Reviewer status below header at (125,700), 44px only while reviewer is inspecting; if it competes with Action row, use a separate badge at (730,615), 210×60: `reviewer`. On approval, replace with `approved`; approval originates here, never from the agent badge.
- Executor comparison panel (90,1160), 900×390. Header (125,1225), 50px `Executor · deployer`. Rows: (125,1300) `Artifact`, value (425,1300) `a91f…7c2e`; (125,1375) `Target`, value (425,1375) `checkout/prod`. Match marks centered x=940 at corresponding baselines, initially empty then ticks. Trusted-approval status (125,1450), 46px `Reviewer verified`, appears before field checks complete. Operation deploy is fixed by panel header sublabel or bottom row; no hidden action change.
- Execution status strip (90,1620), 900×160. Header (125,1680), 48px `checkout/prod`; state (125,1750), 52px `Live: r41`, later `Live: r42`. Right status at (950,1750), 46px `not started`, then `deploying`, then `complete`, right-aligned.
- Review focus moves between artifact, target and evidence using thin outlines around their row values. Approval outline encloses the whole concrete record; it is not an authority-bearing physical seal.
- Comparison guides run outside the sheets: artifact value port (990,810) → (1015,810) → (1015,1300) → (990,1300); target port (90,890) → (60,890) → (60,1375) → (90,1375). Values remain visible at both ends. Use highlight sweeps rather than moving full strings across text.
- Executor-to-status route (540,1550) → (540,1620) remains inactive until reviewer and both fields are verified. Only then a small `r42` token crosses it. No agent-to-execution route exists.

If extra evidence height is needed, move executor down no more than 50px and reduce unused spacing, not label sizes. Keep content within y=1820. All live and approved record fields remain stable after approval.

## Five beats with timed motion, state and sound

Target 48 seconds at speed 1; extend reading holds rather than force a shorter cut.

| Time | Motion/state | Hold and causal purpose | Sound |
|---|---|---|---|
| 0–9 | 0–2 reveal agent read-only strip, proposal r42 and unchanged live r41. Artifact, target and deploy operation appear as a complete record by 3. At 5 reviewer badge becomes active; sheet header changes from Proposal to Review. | Hold 5–9. The proposal names what and where before asking for approval. Executor remains unstarted. | Agent `send` E6 at 3; reviewer `arrive` G5 at 5. |
| 9–19 | At 9–10 outline artifact, 12–13 outline target, 15–16 expose and outline Contract tests / 12/12 passed. All inspected values persist rather than replacing one another. | Hold 16–19 with concrete artifact, target and evidence visible together. Review is not an immediate blind click. | Reviewer quiet `ack` G5 at 10, 13 and 16, sparse and consistent. |
| 19–28 | At 19 reviewer approves; header becomes Approved r42. At 21–22 reveal executor's pending deploy request with the same artifact/target. At 24 trusted approval status becomes Reviewer verified. | Hold 24–28 with approved and requested values both visible, marks still pending, live r41 unchanged. A reviewer approval alone does not trigger execution. | Reviewer `ack` G5 at 19; executor `arrive` C5 at 22; executor `ack` C4 at 24. |
| 28–37 | 28–30 sweep the artifact comparison guide; mark artifact matched at 30. 31–33 sweep target comparison; mark target matched at 33. At 34 executor status becomes ready; no token yet. | Hold 34–37. Both matches and trusted approval must exist before the action proceeds. Agent read-only remains unchanged. | Executor `work` C4 at 28 and 31; `ack` C5 at 30 and 33; neutral ready cue C5 at 34. |
| 37–48 | 37–38.5 r42 crosses only the executor-to-status route. Status becomes deploying on arrival. At 40 status becomes complete and Live r41 changes to Live r42. Emphasize deployer label, then the still-read-only agent strip at 41. | Hold 41–46 with exact record, verified matches, completed r42 and unchanged agent authority. Fade entire scene 46–48. No agent permission upgrade or second operation. | Executor `send` C6 at 37; deployment `arrive` D5 at 38.5; deployment `deliver` D5 at 40. Quiet agent `ack` E4 at 41 accompanies inspection of the unchanged badge, not an action by the agent. |

Actor identities: agent E, reviewer G, executor C, deployment result D. Pan softly toward active row or endpoint. Sends quieter than arrivals; no musical flourish suggesting tests prove safety. Reading holds are silent. Muted playback must still explain the binding and separate identities.

## Accuracy limits and invariants

- Approval is created by an authenticated authorized reviewer in trusted application state, not an agent-supplied approved boolean. Reviewer verified represents that trusted validation; the short film does not implement authentication.
- r42 is a display name for a concrete record. The full immutable artifact identifier, target and operation are bound and checked. The visible digest is abbreviated for readability and must not imply checking only a prefix.
- Test results support review but do not authorize execution or guarantee a safe deployment. The count is fictional instructional evidence for this example.
- Separate executor permissions are assumed configured for this authorized action. The agent remains read-only throughout; it does not borrow reviewer or executor credentials.
- No changed fields appear after approval. A real mismatch or changed operation requires rejection/renewed review; that counterexample is out of scope here. Expiry, replay defenses and failure handling are not claimed to be demonstrated.
- Execution begins only after reviewer validation and both matches. Production changes once, r41 → r42, as an effect of the executor. Do not visually deploy on the approval event.
- Finishing this action is not blanket authority for future releases or other targets. End with this one record and execution only.

## Native-350 acceptance and later production checks

1. Inspect individual native-width 350×622 frames at 5.5, 10.5, 16.5, 24.5, 30.5, 34.5 and 42 seconds. Read artifact identifier, target, evidence, reviewer state, executor identity, match marks and agent read-only badge. Also inspect the busiest frame at full resolution.
2. Inspect before/mid/after approval at 19, comparison marks at 30/33, dispatch at 37 and production change at 40. Guides cannot obscure values or make artifact and target appear swapped. Record values must not drift between stages.
3. At 24.5 seconds reviewer is verified but execution has not started. At 34.5 both fields match and r41 remains live. At 42 seconds r42 is live and the agent is still read-only. Any early deployment or agent authority change is a defect.
4. A beginner should identify what the reviewer saw, what approval refers to, what the executor checks, and which identity performs the action. No paragraph caption should bridge an unseen binding step.
5. Later production must listen for actor-specific cues and alignment; separately analyze peaks below −0.5 dBFS. Frame/signal analysis is not listening. Decode the full MP4, inspect all beat boundaries and verify audio stream plus moov-before-mdat.
6. Compare actual encoded candidate with public lesson before author source/self-review. Reproduce alleged visual faults using alternate extraction. Record full before/after SHA-256 and renew review after any changed encode.

## Deliverable boundary

Write only `video/guardrails-and-permissions/motion-v2/plans/04-plan-a.md`. No render or other lesson work. Later implementation uses repository-pinned Puppeteer and a cut-local engine copy; comparison-sheet helpers stay local and deterministic in scene time. No public/site/shared-skill edits, Git commits or deployment.
