# Recheck changed actions

## Scope and grounding

One mechanism: saved approval for r42 does not authorize a new r43 artifact. At execution time the executor compares the current action with the stored approved action, finds the artifact mismatch, blocks execution and sends the actual new artifact for fresh review. End with review pending, not a new approval or deployment.

Grounding: `video/guardrails-and-permissions/sequence/lessons.json` item 5 and the concrete action binding and changed-value rule in `content/concepts/guardrails-and-permissions.json`, read earlier in this conversation. AGENTS.md, editorial workflow and architecture-flow-video SKILL.md plus style/API/review references were also read and apply. No other current plan or author source is used.

Primary reference: [OWASP Transaction Authorization Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Transaction_Authorization_Cheat_Sheet.html), accessed 2026-10-20 in this session. Significant transaction data should be acknowledged, protected against modification and checked when execution is attempted. The specific release names, digest abbreviations and UI are illustrative.

Exclude credential expansion, prompt injection, replay/expiry, rollback, approval of r43 and eventual successful deployment. This is a mismatch demonstration, not an additional full review workflow.

## Concrete example and visual grammar

Use an execution-time diff view. A pinned approval row remains immutable while the current request's artifact row differs. The unchanged action and target match, but one changed significant field is enough to block. A review queue receives r43 with the new digest; the old approval remains visibly attached to r42.

Values:

- Saved approval: release r42, artifact `a91f…7c2e`, action deploy, target `checkout/prod`.
- Current request: release r43, artifact `b84a…9d10`, action deploy, target `checkout/prod`.
- Live release starts and ends r41; deployment calls start and end 0.

Different release labels are convenient identifiers; the artifact digest mismatch is the decisive illustrated change. Display shortened digests for reading, but describe full-identifier comparison in implementation notes. No secret, real artifact or real deployment is involved.

Canvas 1080×1920 at 30fps. Black, white labels, blue current request, muted teal saved approval, amber inspection, red mismatch/blocked. Text and symbols supplement color. Essential type 48–54px (15.6–17.5px at native 350px); title 80px; secondary labels no smaller than 44px. No paragraph captions or physical lock/key metaphor.

## Layout and coordinates

Rectangle bounds are top-left plus width×height; text coordinates are left baselines unless centered.

- Title centered (540,285), 80px `Recheck changed actions`. Subtitle centered (540,375), 44px `APPROVAL IS ACTION-SPECIFIC`.
- Saved approval ribbon (90,460), 900×120. Text (125,515), 48px `Saved approval`; right-aligned (950,515), 50px `r42`. A second short line (125,565), 44px `Reviewer approved r42`. This ribbon never changes to r43.
- Current request ribbon (90,640), 900×120. Text (125,695), 48px `Current request`; right-aligned (950,695), 50px `r43`. Second line (125,745), 44px `Awaiting execution check`, later `Blocked`.
- Executor diff panel (90,825), 900×590. Header (125,885), 52px `Executor comparison`. Column headers at (310,955) `approved`, (675,955) `requested`, 44px. Field labels x=125; left values x=310; right values x=675. Use short values so both columns fit.
- Action row baseline y=1030: label `action` 44px, values `deploy` 48px. Target row y=1110: label `target`, values `prod` 48px; put common service scope `checkout` at (125,925), 44px so prod is unambiguous. Artifact row has label at (125,1190) `artifact`; values appear on a dedicated line y=1255 at x=125 and x=620, 52px: `a91f…7c2e` and `b84a…9d10`. Small centered comparison symbol at (540,1255) changes from unknown to ≠.
- Status at (125,1360), 58px `checking`, later `BLOCKED`; right-side reason (475,1360), 46px `Artifact changed`. If width is tight, put reason at (125,1415) and grow panel downward 60px.
- Production strip (90,1495), 900×110. Left (125,1565), 48px `Calls: 0`; right (570,1565), 48px `Live: r41`. Always visible and invariant.
- New-review row (90,1660), 900×170. Header (125,1720), 46px `Review required`; contents (125,1795), 50px `r43 · b84a…9d10`, with small `pending` status right-aligned if space permits. Hidden until the final beat. If the diff panel grows, move the production strip and queue down only within y=1850 and remove unused gaps; do not shrink labels.
- Approval lookup route: saved ribbon right (990,520) → (1015,520) → (1015,980) → (990,980). A short `r42` token fills the approved values; does not move or modify the saved ribbon.
- Request route: current ribbon left (90,700) → (60,700) → (60,1190) → (90,1190). A short `r43` token fills the requested values. Labels remain readable on both ribbons.
- Review referral route: diff panel right (990,1330) → (1015,1330) → (1015,1740) → (990,1740), token `r43`. No path or token into the production strip.

The different artifact row receives the strongest emphasis. Matching target/action rows use small neutral match marks; do not briefly show an overall approved state. The r42 approval may remain valid for r42; do not erase or revoke it merely because an unrelated changed request was submitted.

## Five beats: motion, state, timing and sound

Target 44 seconds at speed 1; extend local holds if needed at 350px.

| Time | Movement and state | Reading hold / causality | Sound |
|---|---|---|---|
| 0–8 | 0–2 reveal saved r42 approval and invariant production strip. 3–4 reveal current r43 request with a blue emphasis. Comparison area starts empty/checking. | Hold 4–8. Both versions coexist; do not animate saved r42 into r43, which would imply approval itself changed. | Saved-record quiet `ack` G4 at 2; request `send` E6 at 4. |
| 8–17 | 8–10 r43 reaches executor; requested values populate. 11–13 executor reads saved approval via its separate route; approved values populate. At 14 highlight approved header then requested header. | Hold 14–17. Same action/target but different artifact visible together. No execution occurs while collecting these records. | Request `arrive` C5 at 10; approval lookup `arrive` C4 at 13; quiet executor `ack` C5 at 14. |
| 17–26 | 17–18 outline action values and mark match. 19–20 outline target values and mark match. At 21–23 outline both artifact values; at 23 the comparison symbol becomes ≠, status BLOCKED and reason Artifact changed appear together. | Hold 23–26. One mismatch is sufficient despite the other matches. Production remains untouched. | Executor `ack` C5 at 18 and 20; restrained `thump` C3 at 23. No success chord for partial matches. |
| 26–34 | At 26 current-request ribbon changes to Blocked. At 28 emphasize Calls: 0; at 29.5 emphasize Live: r41. Saved r42 approval remains present and unchanged. | Hold 30–34. The denied action never executes; no execute-then-rollback animation. | Quiet executor `ack` C4 at 28 and 29.5, tied to evidence inspection, not production activity. |
| 34–44 | 34–36 route r43/new digest to Review required. At 36 show pending review for that exact artifact. No approval badge appears for r43. | Hold 36–41. r42 stays approved, r43 stays blocked/pending review, calls stay 0 and live r41. Fade all content 41–44; finite ending. | Executor `send` C6 at 34; reviewer queue `arrive` G5 at 36. Silence during ending hold/fade. |

Actor sound map: requester E, executor C, reviewer record/queue G. Sends softer than arrivals, mismatch cue strongest but restrained. Gentle pan to route endpoints. Production emits no work or completion sound because it is never invoked. All meaning must remain clear muted.

## Accuracy limits and state invariants

- The executor compares the full immutable artifact identity in trusted execution code. The displayed shortened digest is a readability abbreviation, not a sufficient security comparison by itself.
- Stored approval is trusted reviewer state, not an agent-provided approved boolean. Identity verification, expiry and replay controls are assumed prerequisites, not demonstrated here.
- Operation deploy and target checkout/prod remain unchanged. Different artifacts are the only illustrated reason for rejection; no hidden permission or policy change explains the result.
- An approval naming r42 cannot silently apply to r43. The saved record remains r42; do not rewrite it to match the request. The final referral names the actual r43 artifact, not a vague permission request.
- Match marks on action and target are partial checks, not authorization to proceed. BLOCKED must appear before any protected side effect. Calls: 0 and Live: r41 are invariant.
- Fresh review is required, not guaranteed to approve. End pending. Do not show reviewer approval or deployment after the referral.
- This example demonstrates one changed artifact; other significant changes also require appropriate reauthorization in real systems. Do not claim this UI exhaustively validates every possible action field.

## Native-350 acceptance and later encoded checks

1. Inspect individual 350×622 encoded frames without enlargement at 5, 10.5, 14.5, 20.5, 23.5, 30.5 and 38 seconds. Read r42/r43, both digest abbreviations, approved/requested headers, mismatch reason, unchanged production state and exact new-review record. Inspect full-resolution busiest frame additionally.
2. Inspect before/mid/after input arrivals at 10/13, mismatch at 23, referral at 36 and final fade. Routes/tokens may not obscure the two digests or swap their columns. Never shrink type to fit the final queue row.
3. At 20.5 seconds action and target can match while checking continues. At 23.5 and 38 seconds mismatch blocks execution. Saved approval stays r42 and the new-review request is r43. Any approval carryover, production call or r43 deployment is a defect.
4. A beginner should answer: what was approved, what changed, what the executor compared, and why the new artifact needs review. The visual diff must supply those answers without paragraph captions.
5. Later production must listen to validate cues and non-execution silence; separately analyze peaks below −0.5 dBFS. Do not claim actual listening from frame/signal analysis. Decode the full MP4 and verify audio stream and moov-before-mdat.
6. Compare actual encoded candidate against public lesson before author source/self-review. Reproduce suspected visual faults using alternate extraction. Record before/after full SHA-256; any changed encode requires renewed actual inspection bound to that hash.

## Deliverable boundary

Write only `video/guardrails-and-permissions/motion-v2/plans/05-plan-a.md`. No rendering or other lesson work. Later implementation uses repository-pinned Puppeteer and a cut-local engine copy; diff-view helpers stay local and deterministic in time. No public/site/shared-skill edits, Git commits or deployment.
