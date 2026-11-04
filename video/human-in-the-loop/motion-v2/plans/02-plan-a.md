# Give the reviewer evidence — lesson 02

## Scope and grounding

One mechanism: inspect evidence for a specific proposed action, then record the human decision with that action's identity and destination. The approval is a structured record for deploying artifact A of checkout to production, not a generic permission to continue.

Grounding: `video/human-in-the-loop/sequence/lessons.json` item 2 and `content/concepts/human-in-the-loop.json` overview and walkthrough steps 1 and 3. [Transaction Authorization Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Transaction_Authorization_Cheat_Sheet.html), consulted 2026-10-21, supports review of significant action details and checking authorization at execution. Applying these principles to this release request is an illustrative design, not a framework guarantee.

Five beats, approximately47s. Show one approval for unchanged A. Exclude a replacement artifact, stale approval, changed runtime prerequisites, restart/persistence implementation, replay, retries and deployment. The final executor check is identified as still required, not demonstrated as a successful deployment.

## Concrete story and visual grammar

An evidence inspector with fixed action identity above it, tabbed test/risk detail in the middle, and an approval record that fills below only after a deliberate reviewer decision. The stable action header survives tab changes so inspected evidence never loses its referent. Software-native tabs and field copying teach the mechanism; no physical folders, stamps, locks or three-box actor pipeline.

Illustrative request: deploy checkout artifact A to production. A is a friendly alias for a fixed build digest. On screen use `A · 7c2e…91af`, explicitly labeled `Artifact ID`; do not imply the displayed abbreviation is the full value checked by execution. Evidence refers to this same A: two concrete synthetic checks passed, plus a relevant rollout risk and recovery option. These are observed sample results, not a real release evaluation.

## Coordinates and typography

1080×1920,30fps. Bounds below use top-left coordinates; text positions are baselines. Background #050506, primary #E6E8EC, secondary #8B9099, active #F5A524, evidence-pass #3FB68B, identity #4DA3FF. Title76px; useful labels50–56px; secondary44px minimum. At350px width, main content should remain16–18px. Safe area x80–1000/y450–1800.

| Element | Bounds / text anchors | Content |
|---|---|---|
| Title | center x540; baselines y295/385 | `Give the reviewer` / `evidence` |
| Fixed action header | x90 y465 w900 h345 | `DEPLOY · checkout` at (125,530); `Artifact ID` at (125,620), `A · 7c2e…91af` at (125,685); `Target: production` at (125,765) |
| Evidence tabs | Tests x90 y850 w280 h80; Risks x390 y850 w280 h80 | 50px labels; active underline, no unread badge or gratuitous counters |
| Evidence detail | x90 y930 w900 h350 | header `Evidence for A` at (125,995); detail rows y1080,1160,1230 |
| Test detail | inside active Tests | `Empty login → rejected ✓`; `Valid login → accepted ✓`, two lines per check if width demands; source chip `test run T7` at bottom |
| Risk detail | replaces test detail, same panel | `Risk: brief restart`; `Recovery: prior release`; same Evidence for A header remains |
| Reviewer action strip | x90 y1320 w900 h110 | `Human review` left, `Approve A` control right; no automatic selection |
| Decision record | x90 y1470 w900 h250 | `DECISION` at (125,1530); rows y1600/1660/1710, values after short labels |
| Final check reminder | baseline (125,1780) | `Executor: identity check pending`,44px; may split into two short lines by moving record up40px, never clip |

Before decision, the record only says `pending`. After decision: `approved · reviewer R1`, `deploy checkout · production`, `A · 7c2e…91af`. All values must fit; prioritize these fields over decorative separators. Reviewer R1 is an illustrative authenticated reviewer identifier, not a real person.

Field-copy motion after approval: sequentially highlight source action/target, then artifact ID, while their corresponding record rows reveal. Use short blue pulses, not flying text across the evidence panel. Keep source values unchanged. A tiny save dot moves inside the right gutter from (950,1375) to (950,1500) over0.7s. This is recording a decision, not deploying. No production-state animation or deployment packet.

## Five beats with motion, state and sound

Times are playback seconds at speed1. Holds are intentional and silent.

| Beat | Timed state and motion | Sound |
|---|---|---|
| 1. Identify what is proposed, 0–9s | 0–1: fixed header appears; deploy checkout reveals at1.8. Artifact label and A/digest reveal at3.0; target production at4.5. At5.5 evidence tabs appear, Tests active, decision pending below. Hold6–9 so identity/action/target are established before results. | Proposal `arrive` C5 at1; quiet `ack` C5 at3/4.5; evidence `arrive` E5 at5.5. |
| 2. Inspect observed checks, 9–20s | At9 Evidence for A and test-run T7 source appear. 10–11: empty-login observed rejection appears, then its check at11.5. 13–14: valid-login observed acceptance appears, check at14.5. 16–17: a reviewer selection outline advances from the first result to the second. Hold17–20. Approval remains unselected and record pending. | Evidence `deliver` E5 at11/14; restrained evidence `ack` E5 at11.5/14.5; reviewer `ack` G5 at16/17. No approval chime. |
| 3. Inspect risk and recovery, 20–29s | 20–20.8: reviewer selects Risks tab; test detail fades before risk detail reveals at21.2. At22 show brief-restart risk. At23.5 show prior-release recovery. Evidence for A and fixed target persist. 25: reviewer outline emphasizes risk, then recovery at26. Hold26–29. | Reviewer `send` G6 at20; evidence `arrive` E5 at21.2; neutral `ack` E4 at22/23.5; reviewer `ack` G5 at25/26. No alarm suggesting the risk occurred. |
| 4. Decide about this action, 29–39s | 29–29.8: reviewer focus returns to fixed action/target. At31 focus artifact identity. At32.5 deliberate click/press on Approve A; only then show approval selected. 33–33.7 save dot travels to decision record. At34 record `approved · reviewer R1`; at35 action+target row reveals with matching source pulse; at36 artifact row reveals with source pulse. Hold36.5–39. Risk remains visible; approval does not erase it. | Reviewer `ack` G5 at29.8/31; reviewer restrained `chime` G5 at32.5; decision store `store` C6 at34; quiet `ack` C6 at35/36. |
| 5. Bound the approval, 39–47s | 39–40: outline only the stored action/target and artifact fields, not the entire screen. At41 reveal `Executor: identity check pending`. Hold41.5–47 with exact proposal and stored decision visible together. No automatic execution or blanket approved banner. Finite ending retains evidence. | Record `ack` C6 at40; executor reminder quiet `ack` E4 at41. Silent final hold. |

Actor map: proposal C5, evidence E5/E4, human reviewer G5/G6, protected decision store C6. Pan to actor position; sends quieter than arrivals. Test checks, reviewer decision and record-save sounds are distinguishable. No music, typing loop or timer implying approval by elapsed time. The causal sequence must remain understandable muted.

## Accuracy limits

- Artifact A's displayed digest is abbreviated for legibility. The illustrated stored decision refers to the full immutable identity and complete action/target, not a four-character prefix or mutable tag. Do not portray hash-prefix comparison as sufficient enforcement.
- The tests are synthetic examples of observed checks tied to A. Passing them does not establish complete correctness or authorize deployment. Their detail is intentionally more informative than a bare “safe” claim.
- Risk/recovery are illustrative brief summaries, not a complete rollout plan or a guarantee that rollback is safe. The reviewer may need more evidence in a real workflow.
- The human decision is deliberate and separately recorded. The reviewed risk remains relevant after approval. Approval is neither proof of safety nor permission for future artifacts or targets.
- The decision store is protected application state in this design; copying visible fields alone does not secure authorization. No claim is made about restart durability, authentication implementation or a particular framework.
- Execution must check the same full identity and authorized action at its boundary. This clip ends before that check or any deployment; pending is not success or failure.
- No changed artifact B is introduced, and no stale-approval mismatch is dramatized. That mechanism belongs outside this assigned lesson.

## Native350 acceptance and future encoded review

These are production requirements, not completed validation claims.

1. Inspect individual actual decoded350 frames around6.5,11.5,17.5,22.5,26.5,31.5,34.5,36.5,42 and46s. Inspect each tab replacement, approval press and record reveal before/mid/after at full resolution and350. Contact sheets alone are insufficient.
2. Action, artifact and target must remain readable through both evidence tabs. A reviewer can answer what will change, where, which artifact, what was observed and what risk remains.
3. Test results are never visually mistaken for approval. Decision stays pending until the human presses Approve A. Save follows decision; the final executor check stays pending.
4. Keep tab contents mutually exclusive; no stale test text behind risk rows. Do not shrink any evidence line to fit: wrap into short label/value lines and increase panel height if needed, preserving record legibility.
5. Compare source fields and recorded fields at native350. Identical A/digest, deploy checkout and production must survive every transition without truncation, unintended replacement or text overlap.
6. Original risk remains visible after approval. No broad “all clear”, global green wash, deploy counter increment or production change. Final finite ending retains the record and outstanding execution check.
7. Reproduce suspected visual faults using alternate extraction before reporting. Verify audio by listening when possible and distinguish actual listening from signal analysis; full-decode, confirm audio, peak below -0.5dBFS and moov before mdat.
8. Later comparison is against the assigned lesson/public encode, not plan fidelity alone. Hash both media before/after and bind the decision to the candidate SHA-256. A new encode requires renewed inspection.

## Production boundary

Only this anonymous plan is written. No rendering, author source, other lesson, public/site/shared-skill edit, Git commit or deployment. Later implementation uses repository-pinned Puppeteer and a cut-local engine, with any inspector geometry extension local to the cut. Stop after this deliverable for user confirmation before further work.
