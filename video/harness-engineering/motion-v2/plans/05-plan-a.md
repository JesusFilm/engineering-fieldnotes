# Video 05 — Require a passing check

Planning deliverable only. No scene, render, manifest, or production edits. Rendering may proceed after blind synthesis under the user's existing authorization; no further approval checkpoint is implied. This plan was developed without reading other plans or production.json.

## Lesson and scope

A configured required check mechanically prevents a protected branch from advancing until relevant execution evidence belongs to the current revision. A request to run tests cannot change that control. Passing the scoped check clears that requirement only; independent review requirements remain.

Use a simplified pull-request merge panel, with an expandable required-check row and a persistent branch-tip strip. This is software UI, not a literal reproduction of a hosting product. No physical gate, padlock, conveyor, three-box pipeline, revision graph, terminal transcript, workspace sheet, or expected/actual replay. The visible consequence is transactional: attempts are rejected and the destination branch tip does not change. Show the control configured before any attempt, then failure, stale evidence, fresh execution, and partial clearance.

Duration: 46 seconds, 1080 × 1920, 30 fps, speed 1. Five beats. One focal event at a time. All timings below are playback seconds. No narration or explanatory captions; short UI labels only. Title: “Require a passing check”, split across two lines if necessary.

## Exact stage geometry

Coordinates in source pixels, origin top left. Static camera; no zoom used to rescue small type. Content bounds x=90–990, y=450–1740. Background #050506; white active text, grey resting strokes, orange pending, teal passed, red failed. Status uses shape plus colour: empty circle, rotating arc, ×, tick.

| Element | Bounds or anchor | Contents and behaviour |
|---|---|---|
| Title | x=90–990, y=260–410 | 78px type, two lines, left aligned; no subtitle |
| Pull-request panel | x=90, y=480, w=900, h=1070 | One continuous surface with dividers; no floating box trio |
| Revision header | x=140, y=550 baseline | `Current c42`, later `Current d73`; 52px monospace |
| Policy disclosure | x=140–940, y=610–810 | `Required: access`, then `Bypass: none`; 48px. Initially expanded, folds after beat 1 |
| Required-check row | x=140–940, y=880–980 | Icon at (175,930), `access` at (235,945), status at (700,945); 50px |
| Evidence drawer | x=150–930, y=1005–1205 | Two sequential case rows at y=1070 and 1150: `Own tenant`, `Other tenant`; icons at x=865. A revision chip at (760,1030) uses 48px type; do not overlap the first row |
| Review row | x=140–940, y=1260–1360 | Open circle at (175,1310), `Review` at (235,1325), `Pending` at (700,1325); 50px |
| Merge action | x=620, y=1410, w=310, h=100 | `Merge`, 56px, disabled; rectangular button with a clear disabled slash icon |
| Transient instruction | x=140–560, y=1410–1510 | `Run tests`, 50px; only beat 2, a small prompt chip with no outgoing connection |
| Destination strip | x=90–990, y=1610–1730 | `main` at (140,1685), branch tip `b10` at (760,1685), 56px. Tip remains b10 throughout |

Evidence drawer fits only two rows: its revision chip lives in the drawer's upper-right header; first case text starts at x=195, y=1100, second at y=1180 if implementation requires more clearance. Resolve the exact baselines before rendering; never reduce type. All meaningful UI text at least 48px (~15.6px at 350px width), strokes at least 5px, status icons at least 44px. No decorative wires. The only cursor motion is to the Merge action: (975,1510) → (775,1460), 0.8s. Rejection is rendered inside that action and echoed by a brief outline on the unchanged branch-tip cell, never by sending a successful packet toward main.

## State contract

Illustrative fixture: `access` covers the owning-tenant and other-tenant cases established in the preceding lesson. This cut does not repeat request payloads or prescribe an HTTP status.

The check producer is trusted and emits success only after both relevant cases actually execute and pass for the evaluated revision. Check configuration and fixtures remain unchanged during the clip. Skipped, neutral, missing, cancelled, stale, unrelated, and unauthenticated evidence cannot set this demonstration's `accessSatisfied` flag. This is a deliberately stricter evidence-producing workflow than merely relying on a generic green host badge.

- `currentRevision`: c42 → d73 at 19.0s.
- `evidence`: c42 failed → c42 failed retained as historical → d73 running → d73 passed.
- `accessSatisfied`: false until 36.0s; then true.
- `reviewSatisfied`: false for the entire clip.
- `bypassAllowed`: false for the depicted actor; policy established at the start.
- `mergeAllowed = accessSatisfied && reviewSatisfied` for this simplified example. Real repositories can have further conditions.
- `mainTip`: b10 throughout. A rejected request must never transiently update it.

Pending and failed are different states; a revision change resets the current result immediately. An old result cannot be relabelled with the new revision. A passed check never ticks the Review row or enables Merge.

## Timing, motion, state, and sound storyboard

| Beat / time | Motion and focal sequence | Observable state and hold | Sound |
|---|---|---|---|
| 1 · 0–8s · Establish the rule | 0–1s fade in panel. At 1.5s the policy disclosure opens over 0.6s. At 3s highlight `Required: access`; at 4.5s highlight `Bypass: none`. At 5.5s the divider folds back, keeping the access row and action exposed. | c42 current, access pending, review pending, Merge disabled, main b10. Hold 5.8–8s. This is a configured control, not a suggestion in chat. | Quiet `store` C5 at 1.5s; `ack` C5 at 3s and 4.5s; low-gain `arrive` C5 at 5.5s for policy settling. Pan to policy x. |
| 2 · 8–17s · Asking does not enforce | 8s `Run tests` chip appears. 9.5s cursor approaches disabled Merge, attempts at 10.3s. Button shows × with 6px horizontal jolt for 0.35s; main tip outline pulses without any content change. At 12s access starts; drawer opens over 0.7s. Own tenant ticks at 13.5s; Other tenant crosses at 14.5s; access becomes Failed. | The prompt chip neither opens the action nor satisfies the check. First attempt rejected while evidence is absent. c42 execution fails. Hold failure 14.8–17s. | `send` C6 at 8s, `thump` C3 at 10.3s, quiet `work` E4 at 12s, `ack` E5 at 13.5s, `thump` E3 at 14.5s (strongest event, no crash sound). |
| 3 · 17–26s · A revision needs new evidence | 17–18s collapse case rows into compact c42 Failed evidence. At 19s header switches to d73 as a small changed-file glyph appears then settles. c42 evidence slides down 55px and dims; current access resets to Pending in the same frame. At 21s cursor attempts Merge again; rejected, main b10 unchanged. At 23s historical evidence folds out of view. | A repair revision exists; do not show the repair process. The failed old run remains visibly bound to c42 until dismissed. No run on d73 yet. Hold 23.5–26s. | `store` C5 at 19s, `thump` C3 at 21s, quiet `poof` C4 at 23s. No success cue when revision changes. |
| 4 · 26–37s · Execute the relevant cases | At 26s d73 evidence drawer opens with both case circles empty. At 27s Own tenant becomes active; bounded progress completes at 29.5s, then ticks. At 31s Other tenant becomes active; completes at 33.5s, then ticks. At 35s both results settle into a compact evidence row explicitly bound to d73. At 36s access becomes Passed. | Keep one active case at a time. Execution progress is illustrative, not measured runtime. Result becomes successful only after both finished; no tick at dispatch. Hold first case 29.5–31s and second 33.5–35s. | Sparse `work` E4 pulses at 27, 28, 29s; `ack` E5 at 29.5s. Same pattern at 31, 32, 33s, `ack` E5 at 33.5s. `store` E5 at 35s; restrained `chime` E5 at 36s. |
| 5 · 37–46s · Only this requirement clears | At 37.5s access drawer collapses, leaving tick plus Passed. At 39s cursor tries Merge; it stays disabled and Review's open circle receives a white focus ring. At 40s main b10 outline briefly confirms no advancement. Hold 41–44s; fade all content including title to black 44–46s. | Access satisfied on d73, Review pending, Merge disabled, main unchanged. Passing scoped evidence removed one blocker; it did not approve the change. Final black matches opening black for looping. | `arrive` E5 at 37.5s; soft `thump` C3 at 39s paired with review focus; quiet `ack` C4 at 40s. Silent final hold/fade; no victory flourish or deployment sound. |

Disabled-button attempts are explanatory visualisations of denied advancement, not a claim that a particular host sends requests when a disabled HTML button is clicked. The rejection must visibly affect the action and leave the branch stable. Software enforcement is at the protected update boundary, not just cosmetic disabling.

## Accuracy and evidence limits

Primary references checked 2026-10-20:

- [GitHub: About protected branches](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches): branch protections can require checks and reviews; bypass permissions and expected check sources matter. GitHub can accept successful, skipped, or neutral conclusions. Therefore this storyboard specifies an evidence producer that reports success only after real scoped execution, and does not claim a generic required-check toggle guarantees execution. Apply restrictions to the depicted actor; do not imply every administrator is automatically restricted.
- [GitHub: Troubleshooting required status checks](https://docs.github.com/en/pull-requests/how-tos/merge-and-close-pull-requests/troubleshooting-required-status-checks): the evaluated revision matters; head and test-merge results can differ. c42/d73 are pedagogical revision identifiers. A real implementation must bind evidence to the revision the protection evaluates, including test-merge or queue revision where applicable, rather than blindly trusting a displayed head SHA.

Checks provide evidence for their selected cases, not complete correctness, security, or release approval. Review must include changes to test definitions and fixtures; the clip assumes they were not weakened. Controlled bypass is a permission decision: this actor has none, not a universal impossibility of bypass. The plan intentionally ends before approval or merge; showing later advancement would add an unrelated approval lesson. The repository configuration and any runnable implementation are not modified or verified by this planning task.

## Native 350px acceptance checks for subsequent production

These are mandatory acceptance criteria, not claimed render results. Inspect the encoded MP4 at native 350px width (~622px tall), without browser enlargement, plus full resolution. Bind review findings to the final encode hash.

1. At 6.5s a beginner can locate current revision, required access check, disabled Merge, and main tip. Policy frames at 3.5s and 5s make requirement and bypass restriction legible. No line wraps or text below 48 source pixels.
2. At 10.3s, 21s, and 39s the attempted action visibly fails; compare before/after destination cells to confirm b10 never changes. Muting audio must not hide the rejection.
3. At 14.8s both case labels and the distinct tick/cross are readable. At 19.0s no single frame shows old evidence satisfying d73. Inspect 18.9, 19.0, 19.1, 20, and 23.5s.
4. At 27.5, 30, 31.5, 34, and 36.5s case execution progresses in order; success cannot appear before both relevant cases finish. c42 is absent from the fresh drawer. The d73 evidence identity is readable without pausing to zoom.
5. At 41.5s Passed and Pending are simultaneously readable, Merge remains disabled, and main remains b10. With words temporarily ignored, completion of one row must not visually complete the other row or action.
6. Watch once at normal speed, silent, at 350px. Reviewer must identify: attempts do not advance the branch; a new revision requires its own run; passing the check leaves review unresolved. If not, simplify competing movement or extend a hold within 35–50s; do not add explanatory captions.
7. Inspect every beat boundary and busiest frame for collisions, stale icons, colour-only meaning, clipping, and unintended transient enabled states. Stable holds generally 1.5–2.5s, deliberate final hold 3s; no simultaneous case work or ambient distraction.
8. Decode the full encoded file; verify 1080×1920, 30fps, 46s, audio stream, fast-start metadata, and matching black first/last frames. Inspect audio peaks (≤−0.5dB), cue alignment and spectrogram. Actually listen for audible, non-grating cues and record whether listening occurred; analysis alone is not listening.
9. Use the pinned repository renderer and local drawing extensions if needed. Preserve scene source and relative reproduction command during implementation. No source or shared-skill edits are part of this plan.

## Plan completion check

Before handing off this file: confirm five beats total 46s; all beats specify coordinates through the stage map, timed motion, state effects, and pitched sound; the required check is configured; stale/current evidence is explicit; bypass is controlled; review remains independent; acceptance requires native-350 encoded inspection; no model, provider, or nickname provenance is included. Production acceptance remains pending until actual encoded review. Only this assigned plan is written.
