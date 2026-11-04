# Record the outcome — lesson 05

## Scope and grounding

One mechanism: reconcile a uniquely identified deployment operation after executor interruption, then record the observed result against its approved action. Approval permits an attempt; it is not evidence that the attempt succeeded. The deployment system retains operation D7, allowing a resumed executor to query that operation rather than blindly create a second deployment.

Grounding: `video/human-in-the-loop/sequence/lessons.json` item5 and `content/concepts/human-in-the-loop.json` walkthrough steps4–5 and exercise. [Interrupts](https://docs.langchain.com/oss/python/langgraph/interrupts), consulted2026-10-21, explains that resumption can restart node code; moving side effects after an interrupt is not a universal exactly-once guarantee. The durable operation lookup used here is an illustrative application design from the concept, not a promised built-in deployment API feature. [Transaction Authorization](https://cheatsheetseries.owasp.org/cheatsheets/Transaction_Authorization_Cheat_Sheet.html), consulted2026-10-21, supports execution-time authorization checks.

Five beats over approximately50s. Start explicitly as a separate run with A approved. Exclude B, stale approval, new human review, node-code replay details, configuration comparisons and rollback procedure. Show one recoverable interruption and one successful observed outcome. Do not teach an exhaustive failure-handling design.

## Concrete event sequence

Release request R7 binds deploy checkout/A/production to approval by reviewer H1. Executor validates that approval and permissions. Before the external operation begins, R7 is durably associated with deployment operation D7. The deployment system starts D7 and later completes it while the executor is offline. The result field in the workflow remains unknown. On return, the executor queries D7, receives its completed status and records the outcome under R7/A/production. The count of deployment operations stays1, even though multiple requests/read calls occur.

This deliberately separates the external operation's durable status from the executor's knowledge. The restore does not magically infer success from an approval or a local flag.

## Software-native geometry

1080×1920,30fps. A split status console: executor view above, deployment-system operation row below, and an append-only outcome record at the bottom. This is a status reconciliation interface, not a generic three-box flow or physical metaphor. Show one operation row whose identity persists across interruption.

Bounds are top-left; text coordinates are baselines. Safe area x80–1000/y450–1800. Main text50–56px, secondary44px minimum, title76px. Background #050506; text #E6E8EC; secondary #8B9099; pending #F5A524; identity #4DA3FF; observed success #3FB68B. No full-screen success wash.

| Element | Coordinates | Content |
|---|---|---|
| Title | center x540, baselines295/385 | `Record the` / `outcome` |
| Request header | x90 y465 w900 h235 | `NEW RUN · R7` at(125,525); `deploy checkout · production` at(125,600); `artifact A · approved H1` at(125,670) |
| Executor panel | x90 y745 w900 h310 | `EXECUTOR` at(125,805), status right-aligned x950; rows y885/955/1025: `approval`, `permission`, `result`; values x560 |
| Operation row | x90 y1110 w900 h270 | `DEPLOYMENT SYSTEM` at(125,1170); `D7 · R7 · A` at(125,1240); status at(125,1310); `operations: 0` then1 at(560,1360) |
| Outcome record | x90 y1430 w900 h320 | `OUTCOME · R7` at(125,1490); rows y1570/1640/1710: `action A · production`, `operation D7`, `result unknown` then `result succeeded` |

Labels may be shortened to maintain size, but never drop request/operation identity or confuse calls with effects. Before creating D7, operation row reads `none`; do not imply a deployed operation exists at opening.

Routes: submit travels down right gutter from executor(990,930) via(1020,930),(1020,1240) to operation row(990,1240). Status query follows the same gutter but is explicitly labeled `GET D7` in a stationary chip inside executor; moving dot is small. Status response travels up left gutter from(90,1310) via(60,1310),(60,1020) to(90,1020). Save dot goes from executor bottom via right gutter to record right edge at y1490. Distinguish query/response in blue, operation submission amber. Routes never cross labels.

## Five beats: time, state, motion and sound

All times are playback seconds at speed1. Holds are deliberate; do not fill them with typing or spinning activity.

| Beat | Timed visual state | Actor-specific sound |
|---|---|---|
| 1. Approval is not a result, 0–10s | 0–1 header appears with NEW RUN/R7. At2 approved H1/A appears; result remains unknown. At3.5 executor starts checking. At5 approval becomes `match`; at6.5 permission becomes `allowed`. At7.5 reveal outcome record with unknown result. Hold8–10. No green execution-success state yet. | Request `arrive` C5 at1; authorization `ack` C5 at5/6.5; executor neutral `work` E4 at3.5; record `ack` C4 at7.5. |
| 2. Start one tracked operation, 10–20s | At10 executor shows `R7 → D7 saved`, representing durable association before dispatch. 11–12 submit dot travels. At12 operation row becomes D7/R7/A, status running, operations1. Executor becomes waiting, result unknown. At15 operation status still running; hold15–20 so viewers distinguish running from success. | Record `store` C5 at10; executor `send` E6 at11; deployment `arrive` G5 at12, short `work` G4 at12.5. No completion chime. |
| 3. Executor interruption does not erase the operation, 20–30s | At20 executor becomes offline and its interior dims; outcome record and D7 stay visible. At22.5 deployment status becomes succeeded, operations stays1. Outcome record still unknown: no result has been observed by executor. Hold23–26. At27 executor returns online, result still unknown; at28.5 show `resume R7 · query D7`. Hold29–30. | Executor low `thump` E3 at20; deployment restrained `chime` G5 at22.5; executor `arrive` E5 at27; quiet `ack` E4 at28.5. |
| 4. Reconcile, do not redeploy, 30–40s | At30 stationary GET D7 chip appears in executor. 30.5–31.5 blue query dot travels to existing row. At32 D7 identity outlines; no new row and no counter increment. 33–34 response dot returns with status succeeded; executor result becomes succeeded at34.5. Hold35–38. At39 show `recording` status. | Executor `send` E6 at30.5; deployment `ack` G5 at31.5; response `send` G6 at33, executor `deliver` E5 at34.5; record `work` C4 at39. |
| 5. Record what happened, 40–50s | 40–41 save dot reaches outcome record. At41 result changes unknown→succeeded; action A/production, R7 and D7 remain. At42 outcome header becomes `OUTCOME · saved`. At43 emphasize operations1 and result succeeded sequentially. Hold44–50. Approval remains a separate earlier fact, not relabeled as execution evidence. Finite ending retains the complete record. | Recorder `store` C5 at41; recorder `ack` C5 at42; deployment quiet `ack` G4 at43. Silent final hold. |

Actor pitches: request/record C; executor E; deployment system G. Pan by element. A status query must sound lighter than operation creation. The offline cue is restrained; do not suggest the deployment service failed. Silent viewing must still show durable D7, unknown local outcome and later observation.

## Accuracy limits

- This design assumes the deployment service durably identifies operations and supports safe lookup/reconciliation by D7. R7→D7 association is retained before dispatch; no unrecorded identifier is invented after restart.
- A complete system must also handle interrupted submission, lost acknowledgements, concurrent executors, key reuse and retention limits. A durable unique request plus appropriate service-side idempotency/reconciliation is required; a local log alone cannot guarantee a single effect. This clip covers the specific interruption after one tracked operation has started.
- `operations: 1` counts created deployment operations, not network requests or arbitrary downstream effects. GET D7 and persistence writes do not create another deployment. Do not label the count `calls: 1`.
- Status succeeded means the deployment service reports completion for D7/A/production. It is not a blanket correctness, security or user-health guarantee. No unobserved production health check is implied.
- Unknown is retained while the executor lacks evidence, even after the external system completes. Recovery must inspect the operation rather than assume either success or failure.
- Approval and permission checks precede submission; they remain separate from observed result. Real execution needs protected authorization and an action/check boundary robust to concurrent change, not just UI labels.
- This is a separate approved-A run, not an automatic continuation of a blocked B request. No earlier rejection is silently bypassed.
- Rejection, operation failure and indeterminate status are possible in real workflows; they require truthful records and operation-specific handling. Do not extrapolate this successful recovery into an exactly-once guarantee for every system.

## Native350 acceptance and later encoded review

These are later-production requirements, not completed validation claims.

1. Inspect individual actual decoded350px frames around8,13,18,21,24,28,32,35,41.5 and49s. Inspect before/mid/after submit, offline/online, remote completion, query/response and record-save transitions at full resolution and350. Contact sheets alone are insufficient.
2. At24s specifically, deployment status must read succeeded while outcome record remains unknown. This contrast is the key teaching hold; keep both readable and on screen together.
3. Request R7, artifact A, target production and operation D7 remain consistent through the restart. No new operation row or operations2 appears. Query is visibly labeled GET D7 and never resembles a second deploy command.
4. Do not show succeeded in executor/record before the status response arrives. Save follows observation, not approval or elapsed time. Original approval stays separate from result.
5. Check long request header, R7→D7 association and outcome rows at350. Wrap deliberately or simplify surrounding labels rather than shrinking below44px. Check all routes for overlap and gutter clipping; reproduce suspected faults with alternate extraction before flagging.
6. Keep meaningful holds on approval-versus-unknown, external-success-versus-unknown and final observed record. Extend duration rather than compress the reconciliation story.
7. Listen when possible to verify actor/event sound distinction; distinguish listening from signal analysis. Full-decode, confirm audio, peaks below -0.5dBFS and moov before mdat.
8. Final finite ending retains the observed outcome and operation count. Comparative review must inspect the actual encode against the lesson/public baseline and bind its decision to before/after candidate SHA-256. New encodes need renewed review.

## Production boundary

Only this anonymous plan is written. No rendering, author source, other lesson, public/site/shared-skill edits, commits or deployment. Later implementation uses repository-pinned Puppeteer and a cut-local engine, with console extensions local to the cut. Broad sequential authorization does not expand this turn's assigned plan-only scope.
