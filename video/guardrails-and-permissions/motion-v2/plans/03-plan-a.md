# Policy and permission

## Scope and evidence

One mechanism: a policy check accepts a proposed action, but that acceptance does not give the requesting identity permission to execute it. An authorization check at the action boundary still denies deployment. Keep the accepted policy result visible alongside the denied permission result and zero executions.

Grounding: `video/guardrails-and-permissions/sequence/lessons.json` item 3 and the guardrail/authorization distinction in `content/concepts/guardrails-and-permissions.json`. Repository AGENTS.md, editorial workflow and architecture-flow-video skill/style/API/review references were read earlier in this conversation and apply. No other current plan or author source is used.

Primary authorization grounding: [OWASP Authorization Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html), accessed 2026-10-20 in this session: verify permission on each request and default to denial where permission is absent. The local concept supplies the distinction between deterministic checks and fallible model judgment. This film illustrates a judgment-based policy check; it does not claim all guardrails are probabilistic or that an authorization implementation is infallible.

Exclude prompt injection, content attacks, approvals, changes to credentials, successful deployment, new grants and later review workflows. The proposal is ordinary; the lesson does not depend on the policy check having been tricked or having made an error.

## Concrete example and visual grammar

Use an action detail view with two independently populated verdict fields. A persistent proposal is inspected first for policy suitability, then checked against the execution identity's permission. The first verdict remains ACCEPTED while the second becomes DENIED. A separate execution count stays zero. This is a software decision record, not a three-box compiler or a physical gate metaphor.

Example proposal: `Deploy r42 → prod`. Policy criterion: `Incident recovery fit`, with check type `judgment`. The example policy check accepts the proposal as suitable for incident recovery; that is an assessment, not a grant. Identity: `investigator`, supplied from session. Required permission: `deploy prod`; grant: `none`.

Canvas 1080×1920 at 30fps, black background. White useful labels, blue proposal, amber policy inspection, teal only for the scoped policy acceptance, red for authorization denial. Status words accompany colors. Required text 48–54px (15.6–17.5px at 350px); title 84px; secondary type labels at least 44px.

## Coordinates

Bounds are top-left plus width×height; text positions are left baselines unless centered.

- Title centered (540,285), 84px: `Policy and permission`. Subtitle centered (540,380), 44px: `TWO DIFFERENT CHECKS`.
- Persistent proposal header (90,465), 900×190. Label (125,525), 46px `Proposed action`; content (125,600), 58px `Deploy r42 → prod`. Small proposal ID `A1` at (875,525), 44px; never change it between checks.
- Decision record frame (90,725), 900×710. Header (125,785), 50px `Action A1 · decisions`. This is one record with two sections, not multiple independent action copies.
- Policy section y=825–1070. Header (125,880), 52px `Policy check`; type annotation (740,880), 44px `judgment`. Criterion at (125,950), 50px `Incident recovery fit`. Verdict at (125,1020), 54px initially `pending`, then `ACCEPTED`.
- Thin divider from (115,1085) to (965,1085). Authorization section y=1100–1415. Header (125,1155), 52px `Permission check`. Identity line (125,1225), 48px `Identity: investigator`; small `session` label at (800,1225), 44px only if it fits. Permission line (125,1295), 48px `deploy prod: no grant`. Verdict (125,1375), 58px initially `not checked`, later `DENIED`.
- Trusted-boundary bracket: x=65, from y=1100 to 1780, with short horizontal ticks ending x=85. Label `Execution boundary` at (125,1490), 46px, above execution panel. This labels application enforcement rather than implying that policy evaluation occurs inside the model or outside a service in every architecture.
- Execution panel (90,1530), 900×235. Header (125,1590), 50px `Deploy execution`; counter (125,1670), 58px `Calls: 0`; status (560,1670), 48px `not invoked`. These values remain constant from opening through ending.
- Policy inspection route: proposal bottom (540,655) → (540,690) → (1015,690) → (1015,950) → (990,950). A small A1 dot follows it.
- Authorization inspection route: from policy-section right port (990,1020) → (1015,1020) → (1015,1250) → (990,1250). Label the travelling token `A1`, not ACCEPTED: the next check receives the same proposed action, not an authority token.
- No execution-bound token. A faint line (540,1435) → (540,1530) remains inactive. On denial, add a small red cross at (540,1460), clear of the boundary label; never animate a request into the execution panel.

Prefer short row labels over extra explanatory captions. If widths are tight, wrap `Identity: investigator` to two lines and enlarge authorization section; do not shrink essential labels. Preserve 80px bottom clearance.

## Five beats: timing, state, motion, sound

Target 43 seconds at speed 1. Holds can grow if encoded native-350 reading needs it.

| Time | Motion and state | Hold / causal purpose | Sound |
|---|---|---|---|
| 0–8 | Reveal proposal, empty decision record and execution counter over 0–2. At 3–5 A1 travels to the policy criterion. Outline judgment and Incident recovery fit at 5.5. | Hold 5.5–8 with policy pending, permission not checked, Calls: 0. Establish the policy question as a judgment rather than an identity grant. | Proposal `send` E6 at 3; policy `arrive` G5 at 5; soft policy `work` G4 at 5.5. |
| 8–16 | At 8.5 policy verdict changes to ACCEPTED. Give only its verdict a modest teal emphasis. At 11 outline the still-unchecked permission section, then emphasize Calls: 0 at 13. | Hold 13–16. Accepted policy and no execution coexist. No permission field changes and no grant appears. | Policy `ack` G5 at 8.5; application quiet `ack` C4 at 11 and 13. No global success chime. |
| 16–25 | 16–18 A1 travels to permission check. At 18 reveal authenticated investigator identity. At 20 reveal deploy prod: no grant. At 22 highlight identity and required operation together; authorization is checking. | Hold 22–25 with policy ACCEPTED still visible. Same proposal, separate authority decision. | Policy `send` G6 at 16; authorization `arrive` C5 at 18; low `work` C4 at 20 and 22. |
| 25–33 | At 25 verdict becomes DENIED; red outline marks permission section and the inactive execution connector gets a cross. At 27 emphasize Calls: 0 / not invoked. | Hold 27–33. Policy acceptance stays intact; it is not rewritten as failed to explain denial. No protected execution occurs. | Authorization `thump` C3 at 25; quiet neutral `ack` C4 at 27. Deploy execution emits no sound. |
| 33–43 | 33–34 remove moving inspection cues, then briefly outline ACCEPTED and DENIED together within the one decision record. | Hold 34–40 with the contrasting verdicts and zero calls. Fade entire scene 40–43. Finite ending; no override, approval request or retry. | Soft paired policy/application `ack` G4/C4 at 34, low gain, not a victory chord. Silence through hold/fade. |

Sound identities: proposal E, policy G, authorization C. Pan subtly toward inspection endpoints. Sends quieter than arrivals; denial is the strongest cue but should not sound like a crashed service. Application checking works correctly. No music or constant ticks needed. All essential meaning must survive muted playback.

## Accuracy limits and state invariants

- Policy acceptance addresses the stated proposal criterion, not entitlement. The same policy result can remain accepted when the requesting identity is unauthorized. Do not present the denial as proof that the policy judgment was wrong.
- This example labels the policy check judgment to acknowledge fallibility. Other guardrails may be deterministic. No accuracy percentage, universal reliability or security guarantee is implied.
- Identity comes from authenticated session context; authorization is outside the model's control. Passing a status string or claiming approval cannot create a grant.
- A1 remains the same action and target throughout. No hidden change to the proposal explains the denied result.
- Authorization is checked before any deployment execution. Calls remains 0 throughout. Denied work is never executed then undone.
- Authorization must be applied on every applicable execution path; this diagram demonstrates one action, not proof of complete mediation or a comprehensive security architecture. Failure/unavailability handling is outside this run.
- No deployment credential, human approval or policy override is introduced. A guardrail pass cannot supersede the permission decision in this example.

## Native-350 acceptance and encoded checks

1. Inspect individual encoded 350×622 frames without enlargement at 5.5, 9, 14, 18.5, 22.5, 25.5, 28 and 37 seconds. Read proposal A1, judgment criterion, both verdicts, identity, missing grant and zero calls. Inspect full-resolution busiest frame in addition; no contact-sheet-only acceptance.
2. Inspect before/mid/after arrivals, verdict changes and fade at 5, 8.5, 18, 25 and 40 seconds. No badge, outline, cross or route may obscure text. Especially check boundary label versus connector cross.
3. At 14 seconds ACCEPTED must coexist with permission not checked and Calls: 0. At 28 and 37 seconds ACCEPTED must coexist with DENIED and Calls: 0. Any global success/execute transition or inferred grant from policy acceptance is a defect.
4. A beginner should identify the different questions answered by the two checks and name which check prevented execution. No paragraph caption or prior lesson should be necessary.
5. Later production must actually listen to verify actor cues and non-execution silence, separately analyze peaks below −0.5 dBFS, decode the complete MP4, and check audio stream plus moov-before-mdat. Signal/frame analysis must not be claimed as listening.
6. Compare actual encodes against the public lesson before reading author source/self-review. Reproduce suspected visual faults through alternate extraction. Bind review to before/after full SHA-256; any changed encode requires renewed inspection.

## Deliverable boundary

Write only `video/guardrails-and-permissions/motion-v2/plans/03-plan-a.md`. No rendering or other lesson work. Later implementation uses repository-pinned Puppeteer and a cut-local engine copy, with any decision-record helper kept local and deterministic in time. No public/site/shared-skill edits, Git commits or deployment.
