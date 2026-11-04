# Intent versus permission

## Focus and grounding

One mechanism: an instruction can say “Do not deploy” while a deployment request is still generated; trusted application authorization rejects that identity's operation on the production resource before deployment execution. The instruction remains unchanged, and production remains unchanged. The cause of refusal is the permission check, not the model obeying the instruction.

Grounding: `video/guardrails-and-permissions/sequence/lessons.json` item 1 and `content/concepts/guardrails-and-permissions.json`, especially authorization versus persistent instructions and the incident-agent example. Repository AGENTS.md, editorial workflow and architecture-flow-video skill/style/API/review references were read in this conversation and govern this plan.

Primary evidence: [OWASP Authorization Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html), accessed 2026-10-20. It distinguishes identity verification from permission, recommends default denial and validating permissions on every request. The identities, release numbers and interface below are illustrative. No particular framework is claimed to provide this architecture automatically.

Exclude prompt-injection scenarios, successful read demonstrations, human approval, permission escalation, separate authorized deployment and retry/bypass demonstrations. Those would distract from this first lesson's one denied operation.

## Visual mechanism

Use a request inspector inside a visibly labelled application boundary. A small agent instruction remains above it; the inspector reveals authenticated identity, operation and target, then the permission decision. A separate execution register below shows zero deploy calls and the unchanged live release. This is a software trace, not a physical wall, lock-and-key metaphor or three-box processing pipeline.

Canvas 1080×1920, 30fps; black background, white essential labels, blue agent/request identity, amber inspection, red denial, gray inactive execution. No green success verdict: the protected state remaining unchanged is the evidence. Essential text 48–54px (about 15.6–17.5px at 350px width); title 82px; supporting labels at least 44px.

Coordinates are top-left bounds; text coordinates are left baselines unless centered.

- Title centered (540,285), 82px: `Intent versus permission`. Subtitle centered (540,380), 44px: `INSTRUCTION ≠ ACCESS`.
- Agent instruction card (90,465), 900×185. Header (125,520), 46px `Agent instruction`; instruction (125,595), 58px `Do not deploy`. Preserve this verbatim from opening through final hold.
- Request strip (90,700), 900×140. Header (125,750), 44px `Requested action`; text (125,810), 52px `Deploy r42 → checkout/prod`. If too wide, use `Deploy r42` at x=125 and `checkout/prod` at x=535, with a small arrow between. No shrink-to-fit.
- Application boundary: (75,905), 930×850, gray outline with header (110,965), 46px `Application enforcement`. A solid top edge distinguishes trusted execution context from agent instruction; do not depict an impenetrable physical barrier.
- Authorization inspector inside boundary: (110,1000), 860×395. Header (145,1055), 52px `Authorization`. Three rows: labels at x=145 and values at x=465, baselines y=1130,1200,1270. `Identity` / `investigator`; `Action` / `deploy`; `Target` / `checkout/prod`. Values 48px. Identity comes from trusted authentication metadata, not a model-editable identity argument.
- Decision row baseline (145,1350), 50px, initially `Checking permission`, then `DENIED: no deploy grant`. Wrap the latter into `DENIED` at (145,1335) and `No deploy grant` at (420,1335) if necessary. Keep within 825px of usable width.
- Execution register (110,1460), 860×240. Heading (145,1525), 48px `Deploy service`; rows (145,1595), 50px `Calls: 0`, and (145,1665), 50px `Live release: r41`. Both values exist from the beginning and never change.
- Incoming route: request strip bottom (540,840) → (540,880) → (1018,880) → (1018,1090) → (970,1090). A compact `r42` token travels here. This route terminates at authorization, not deployment.
- Rejection return route: (110,1350) → (50,1350) → (50,770) → (90,770). Travel a compact `DENIED` token outside all text. Request-strip status then becomes `Request denied` while the r42/target content remains in smaller second-line labels or in the inspector; expand strip to 175px upward if needed, preserving gap before boundary.
- No outgoing route into the deploy service becomes active. Show a faint connector from (540,1395) to (540,1460), ending with a neutral inactive port. On denial it fades further, without a token crossing it. Do not draw a red token arriving at the service: the execution function is never invoked.

## Five beats with motion, state, holds and sound

Target 43 seconds, authored at speed 1. Duration may grow for legibility. No numeric request latency or artificial urgency.

| Time | Motion and state | Hold and causal emphasis | Sound |
|---|---|---|---|
| 0–8 | 0–1.5 reveal instruction and application boundary; execution register already reads Calls: 0 and Live release: r41. At 3–4 reveal requested action Deploy r42 → checkout/prod beneath the unchanged instruction. | Hold 4–8. The contrast is visible: request generation can contradict an instruction. Do not show malicious intent, a refusal or an instruction being erased. | Agent `arrive` E5 at 1.5 for instruction appearance; agent `send` E6 at 4 for request creation. |
| 8–16 | 8–10 r42 token travels to the authorization inspector. At 10 reveal Identity: investigator; at 11.5 reveal Action: deploy; at 13 reveal Target: checkout/prod. Use successive outlines to focus each attribute, not typing of long strings. | Hold 13–16 with all three values visible. Request has reached the application check, not the deploy execution. Calls remains 0. | Application `arrive` C5 at 10; quiet `ack` C5 at 11.5 and 13 tied to attribute inspection. |
| 16–24 | 16–18 outline identity and action together, then target, while Checking permission remains. At 19 decision changes to DENIED / No deploy grant; outline becomes red. The inactive execution connector dims. | Hold 19–24. The policy result is attributable to this identity/action/resource. There is no model refusal animation and no deploy activity. | Authorization `work` C4 at 16; restrained `thump` C3 at 19. No crash: the check is functioning correctly. |
| 24–32 | 24–26.5 rejection token returns to the request strip. At 26.5 Request denied appears there. At 28 emphasize Calls: 0, then at 29.5 Live release: r41. Both remain unchanged; r42 remains the requested release in the request details. | Hold 29.5–32. Response and resource state corroborate the denial. Do not increment calls and then undo it. | Application `send` C6 at 24; agent `arrive` E5 at 26.5. Quiet neutral `ack` C4 at 28 and 29.5 for the inspection emphasis, not service execution. |
| 32–43 | At 32 clear transient outlines, leaving instruction, denied request, permission result, zero calls and r41 visible together. | Deliberate final hold 32–40. Fade all content 40–43 to black; finite ending. No successful deployment or approval added. | Soft application `ack` C4 at 32; silence during hold/fade. Deploy service remains silent throughout. |

Actor sound map: agent E5/E6, trusted application C5/C6/C4, denial C3. Deploy service has no activity cue because it is not invoked. Pan toward active route endpoints with restrained stereo width. Sends below arrivals; denial audible but not theatrical. The silent execution register plus its stable values must teach the same result muted.

## Accuracy limits and invariants

- Authentication is assumed established. The inspector's identity is supplied by trusted execution context, not accepted from a self-asserted model field. Authorization is the illustrated operation.
- The application authorization layer receives the request; the downstream deploy execution service is not invoked. This resolves the otherwise ambiguous statement that “the service is never invoked”: it refers to deployment execution, not all request handling.
- Request denial must precede any protected side effect. Calls: 0 and r41 are invariant, not rolled back after an attempted deploy.
- A persistent instruction communicates intent; no movement from that instruction changes a permission grant. It remains visible even when the request is generated and rejected.
- The scenario assumes all applicable execution paths use this enforced check. A diagram alone cannot prove complete mediation, and unrestricted shell credentials would undermine the boundary. Do not introduce those alternate paths into this cut.
- Missing deploy permission denies this identity's operation on this target. Do not imply the target is globally undeployable or that the agent has no permissions for any resource.
- Permission checking must fail closed when unavailable in a real system. This animation shows an explicit denial, not a timeout; no unavailable-check scenario is implied to have been tested.

## Native-350 acceptance and later encoded verification

1. Inspect actual individual 350×622 frames at 4.5, 10.5, 13.5, 19.5, 27, 30 and 36 seconds without enlargement. Read the instruction, requested release, identity, action, target, denial reason, call count and live release. Inspect the busiest full-resolution frame too.
2. Inspect before/mid/after route arrival at 10, decision at 19, rejection return at 26.5 and fade at 40 seconds. No token, outline or label can overlap another essential label. If space is tight, wrap short rows or grow a panel; never shrink key text below 44px.
3. Calls must remain 0 in every sampled state, live release must remain r41, and no request token may reach deployment execution. Any execute-then-revert depiction is a blocker.
4. A beginner should distinguish “Do not deploy” from “No deploy grant” and identify which one actually prevented execution. Keep the instruction visible while the denied request exists. No paragraph explanation should be needed.
5. Later production must listen to verify cues and silence at the uninvolved service, and separately analyze audio peaks below −0.5 dBFS. Frame/signal analysis is not actual listening. Decode the complete MP4 and check audio stream, timing and moov-before-mdat.
6. Review actual encodes against the public lesson before author source/self-review. Reproduce alleged visual faults with alternate extraction; record full before/after hashes. Any changed encode requires renewed review bound to its new hash.

## Deliverable boundary

Write only `video/guardrails-and-permissions/motion-v2/plans/01-plan-a.md`. No render or other lesson work. Later implementation uses repository-pinned Puppeteer and a cut-local engine copy; any request-inspector helper stays local and deterministic in scene time. No public/site/shared-skill edits, Git commits or deployment.
