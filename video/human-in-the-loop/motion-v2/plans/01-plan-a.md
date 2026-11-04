# Propose, review, execute — lesson 01

## Scope and source grounding

One mechanism: a prepared release request is reviewable work, not authorization. The agent produces a proposal; a human examines it; the executor checks for a decision and waits because none exists. End with zero deployment calls and unchanged production. This pending ending follows the assigned sequence; the title names responsibilities, not a promise to depict a completed deployment.

Grounding: `video/human-in-the-loop/sequence/lessons.json` item 1 and `content/concepts/human-in-the-loop.json` overview, workflow and first pitfall. [Transaction Authorization Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Transaction_Authorization_Cheat_Sheet.html), consulted 2026-10-21, supports reviewable action details and enforcement at execution. Applying those principles to this release workflow is an illustrative design recommendation, not a framework guarantee.

Five beats, approximately43s. Exclude changed artifacts, stale approval, digest comparison, changed prerequisites, persistence/restarts, retries, cancellation and approval-policy implementation. No second release or later-lesson scenario. A short stable release label A identifies this proposal without teaching identity binding yet.

## Visual approach

A release-review interface with an editable proposal becoming a submitted review detail, plus a separate executor job strip and an unchanged production status. This is a software-native state transition, not three similar actor boxes connected in a pipeline. Ownership appears in the toolbar; the proposal remains in the same location as responsibility changes.

1080×1920 at30fps. Coordinates below are top-left bounds except text baselines. Black #050506; primary #E6E8EC; secondary #8B9099; active/pending #F5A524; blue #4DA3FF for agent preparation. Teal may mark test evidence but never imply approval or deployment. Useful labels50–56px, secondary44px minimum, title76px. Keep content within x80–1000 and y450–1790.

| Element | Position | Visible content |
|---|---|---|
| Title | centered x540; baselines y295/385 | `Propose, review,` / `execute` |
| Ownership toolbar | x90 y470 w900 h115 | `Agent · preparing` → `Human · reviewing`; owner text at (125,540) |
| Proposal detail | x90 y615 w900 h615 | header `RELEASE A`; field labels x125, values x510; baselines y695,790,880,970,1060 |
| Detail fields | within proposal | `Service / checkout`; `Action / deploy`; `Target / production`; `Evidence / tests passed` |
| Submission/decision row | baseline y1160 | `Draft` → `Submitted` → `Decision: pending`; no transient APPROVED state |
| Executor job strip | x90 y1280 w900 h245 | `EXECUTOR` at (125,1345); `authorization` at (125,1420), `missing` at (650,1420); `deploy calls: 0` at (125,1490) |
| Production strip | x90 y1580 w900 h165 | `PRODUCTION · checkout` at (125,1640); `Current: previous release` at (125,1710), wrap to two lines if necessary without shrinking |

At first show only toolbar, proposal skeleton and production strip. Fill the fields individually. At submission, replace editable field underline styling with static label/value rows and switch ownership toolbar after the proposal is complete. This motion signifies handoff of responsibility, not granting a credential. The panel does not fly or shrink.

One request route goes from (990,1160) via (1020,1160), (1020,1370) to (990,1370). A small dot represents checking whether the submitted request is executable; it never passes to production. It is not a deployment API call. A second short route from executor bottom (540,1525) to production top (540,1580) remains neutral and carries no dot. Prefer no route at all if the short spacing makes the distinction unclear. No padlocks, keys, physical gates or moving barrier metaphor.

The executor is the only element adjacent to a deploy-call counter. Do not place a deploy button or production credential in the agent toolbar. This visually locates the execution capability without exposing implementation jargon in the teaching labels.

## Timed motion, retained state and sound

Times are playback seconds at speed1. Every hold is for reading or verifying unchanged state. No looping spinner while waiting.

| Beat | Motion/state | Sound |
|---|---|---|
| 1. Prepare a concrete proposal, 0–10s | 0–1: agent toolbar and proposal skeleton reveal. 1.8: RELEASE A header. At2.8 service checkout; at4 action deploy; at5.2 target production. At6.5 evidence tests passed appears; submission row remains Draft. Production's previous release stays visible and unchanged. Hold7–10. | Agent `arrive` C5 at1; soft `work` C4 at2.8,4,5.2; evidence `ack` C5 at6.5. No success flourish. |
| 2. Submit for review, 10–18s | 10–10.8: Draft changes to Submitted; editable underlines become static fields. At12 toolbar changes to Human · reviewing. At13.2 outline the action field; at14.5 outline target; at15.8 outline evidence. Decision row becomes `Decision: pending` at16. Hold16–18. All proposal values remain fixed. | Agent `send` C6 at10; reviewer `arrive` E5 at12; quiet reviewer `ack` E5 at13.2,14.5,15.8. Acknowledging evidence is not an approval chime. |
| 3. Executor checks authorization, 18–26s | 18–18.8: executor strip reveals, status `checking`, calls0. 19.5–20.5: request-check dot follows right gutter. At21.5 highlight Decision: pending; at22.5 executor authorization becomes `missing`. At23.5 executor header gains `waiting`. Hold23.5–26. No call counter increment or production activity. | Executor `arrive` G5 at20.5; quiet `work` G4 at21.5; low neutral `ack` G4 at22.5. No crash or failure alarm: pending is normal. |
| 4. Review is not permission, 26–34s | 26–27: reviewer outline returns to evidence row. At28 outline the pending decision row, then at29.5 highlight executor waiting. At31 highlight calls0. Hold31–34. The same successful preparation and evidence coexist with no authorization; do not simulate a prohibited deployment attempt. | Reviewer `ack` E5 at27 and28; executor `ack` G4 at29.5 and31. |
| 5. Separate responsibilities, 34–43s | 34–35: toolbar settles to `Human · decision pending`; proposal header becomes `Agent proposal · A` (two lines if needed). At36 executor waiting and production previous release receive sequential neutral outlines, not simultaneous flashes. Hold37–43 with proposal, pending decision, calls0 and unchanged production readable. Finite ending; no approval, execution or reset. | Reviewer `ack` E5 at35; executor `ack` G4 at36; quiet production `ack` G3 at37, denoting the status observation, not a write. Silent final hold. |

Actor map: agent C, reviewer E, executor G. Pan by relevant element, sends quieter than arrivals. Use sparse cues instead of keyboard sounds, background music or ticking through the wait. Silent viewing must still distinguish proposal, pending decision and no execution.

## Accuracy boundaries

- `tests passed` is evidence attached to a proposal, not proof that release is correct or a substitute for human judgment. No evidence-to-approval transition occurs.
- The reviewer sees a concrete action and target but has not decided. Reviewing or opening a panel is not approval; waiting is not rejection.
- The executor checks authorization before invoking deployment. Its authorization check is distinct from the deployment call counter; calls0 must remain accurate throughout.
- Separation of responsibilities does not require three hosts or three products. The interface is a teaching view of roles, not a prescribed service topology.
- The agent prepares without needing unrestricted production credentials in this design. No agent bypass path is shown; a disabled-looking UI alone would not enforce the boundary. Real enforcement belongs in the executor/runtime, as represented by its missing-authorization state.
- A is an illustrative release label, not a complete immutable identity. Exact identity binding, authenticated decision storage and target revalidation are intentionally deferred.
- No production operation is performed in the story. Current previous release remains unchanged. Do not invent automatic approval after elapsed time.

## Native350 acceptance and later encoded review

These are requirements for future rendering, not completed validation claims.

1. Inspect individual actual decoded frames at native350 around7,12.5,16.5,20,23.5,31.5,37 and42.5s. Inspect before/mid/after each toolbar/status change and gutter transfer at full resolution and350. A contact sheet alone is insufficient.
2. Viewers can identify who prepares, who decides and who can execute. Proposal completion never visually becomes authorization. The human is identifiable from the toolbar, not only a color.
3. `production`, `Decision: pending`, `authorization missing` and `deploy calls: 0` remain legible at350. Keep multiline wrapping intentional; shorten labels before reducing size. No field value collides with its label.
4. The request-check dot ends inside the executor and never reaches production. No deployment-like sound or progress bar contradicts calls0. Production status stays unchanged before and after every transition.
5. Inspect UI mode changes for stale Draft/Submitted/Pending overlaps; strings switch cleanly. Stable proposal values persist during handoff. Reproduce suspected visual faults via alternate extraction before flagging.
6. Holds allow the pending/zero-call relationship to register. Finite pending ending is intentional; do not manufacture a release to make the ending celebratory.
7. Listen to verify actor distinctions if possible; clearly separate listening from audio-signal analysis. Full-decode the encode, confirm audio stream, peaks below -0.5dBFS and moov before mdat.
8. Later comparison must inspect actual candidate versus public lesson with hashes before/after. Bind its decision to the actual candidate SHA-256. A changed encode requires renewed inspection.

## Production boundary

Only this anonymous plan is written. No render, implementation source, other lesson, public/site/shared-skill edits, commits or deployment. Later implementation uses repository-pinned Puppeteer and a cut-local engine, with any review-interface drawing extensions local to the cut. Stop after this plan for user confirmation before further work.
