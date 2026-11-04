# Video 04 plan

## Teaching scope and direction

**Turn a failure into feedback.** Replay one concrete access test: tenant B requests invoice 7, owned by tenant A. The agreed contract requires `403`; the first execution returns `200` and invoice data. The failure supplies expected versus actual to the agent. The agent changes the authorization check, but the repair remains unverified until the identical request runs again and returns `403` without invoice data.

Use an **API request-and-response demonstration with a temporary authorization editor**, not a service topology. The viewer sees the wrong response body, the specific mismatch that guides the edit, and the changed response on replay. The request and ownership facts stay fixed; the response and authorization rule change. This supplies visual variety through actual behavior, not decorative rearrangement.

Target about 49 seconds, six sequential beats. Maintain generous holds after the mismatch, after the unverified edit, and after the rerun. End on a narrowly verified behavior. Do not demonstrate other paths, further repairs, release gates, or universal security.

## Stage and coordinates

1080×1920, near-black background, flat software UI with no enclosing full-screen form. Title `Failure → feedback` centred at (540, 280), 72 px. Persistent test name `cross-tenant` at (540, 430), 56 px. Keep this name and all test inputs unchanged throughout.

**Fixed input composition:**

- Requester identity: `Tenant B`, centred at (260, 590), 56 px, with a small circular identity glyph at (260, 665).
- Target: a flat invoice document outline spanning x=680–920, y=550–760. Inside, `#7` at (800, 610), `Owner A` at (800, 700), 48 px. No locks, doors, walls, keys, or other security metaphors.
- Request line: `GET /invoices/7` centred at (540, 830), 56 px monospace. A short amber activity stroke traverses x=230–850 at y=885 only during execution. The same line pulses on both runs.

**Response stage:** x=170–910, y=980–1250. Label `Response` centred at (540, 965), 48 px. First response: large `200` at (540, 1050), 100 px; beneath it, a small invoice-body silhouette with `#7 · Owner A` centred at (540, 1180), 52 px. On the rerun, show `403` at the same number position and `Denied` at (540, 1180); no invoice-body silhouette or payload appears.

**Assertion pair:** `Expected` centred at (310, 1380), `Actual` at (770, 1380), both 48 px. Numbers at (310, 1490) and (770, 1490), 112 px. Expected starts and stays `403`; actual starts `—`, then becomes `200`, later resets to `—` for the rerun and finally becomes `403`. Between the numbers, show a red `≠` at (540, 1490) on failure or a teal `=` on the verified match. Test outcome sits at (540, 1650), 60 px: `FAIL`, `Unverified`, then `PASS · 1 test`. Status values remain readable independently of colour.

**Temporary edit view:** during the feedback/edit beats, replace only the response stage with an editor spanning x=130–950, y=960–1250. Header `Agent · auth check` at (540, 980), 48 px. At y=1060, two compact feedback groups: `Expected 403` centred at x=320, `Actual 200` at x=760, 46 px. Below, show a one-line illustrative predicate at (540, 1160), 56 px. It changes from `signed_in` to `tenant == owner`. No surrounding function, syntax-heavy diff, or explanatory paragraph.

All temporary feedback copies travel through the open space between y=1250 and y=1370 before landing; never animate across the original assertion text. Render each whole value intact. Primary evidence is at least 52 px, about 17 px at 350-wide viewing; smaller labels must remain at least 46 px. If text fails phone inspection, reclaim spacing rather than shrink it.

## Animation storyboard

| Time | Motion | State / observable behavior | Sound and pitch |
|---|---|---|---|
| 0–7 s | Establish test and two identities for 2 s. At 2 s emphasize `Tenant B`, then `Owner A`. At 4 s reveal the request and expected `403`. Hold. | Requester and owner differ. Contract is established before any result. Actual remains `—`; no test verdict exists. | Soft `arrive` C5 for requester, E5 for owner; `ack` G5 when expectation appears. |
| 7–15 s | Request pulses at 7 s; activity stroke runs. At 10 s, stop activity and reveal `200`. Over the next second, a copy of invoice 7’s document shape appears in the response body; the source remains unchanged. At 12 s actual becomes `200`, `≠` and `FAIL` appear. Hold 3 s. | The endpoint has returned another tenant’s invoice. The test fails because observed `200` differs from required `403`, not because an HTTP error occurred. | `work` C4 at execution start; neutral `arrive` E5 at HTTP response; subdued `thump` C4 at assertion failure. Never play a success cue for `200`. |
| 15–23 s | Fade out the response body, open the temporary editor. At 17 s duplicate the two assertion values into its feedback row over 1.5 s. Reveal `signed_in` beneath them at 20 s. Hold. | Agent receives the concrete expected/actual mismatch, not merely `FAIL`. The original assertion remains visible below. The displayed predicate is the current insufficient check. | Soft `arrive` E5 for editor opening; `deliver` G5 when both feedback values land; quiet `ack` E4 when the existing predicate appears. |
| 23–31 s | At 23 s select `signed_in` with an amber underline. Replace it as a whole with `tenant == owner` at 25 s; briefly pulse the changed expression. Set verdict area to amber `Unverified`. Hold through 29 s. By 31 s close editor and clear the old actual/mismatch for a fresh run. | Authorization logic has changed; no success has been claimed or observed. Expected remains `403`, inputs remain B / invoice 7 / owner A. Retain the failed observation in production records even though its live result display is cleared. | Quiet `work` E4 at selection; `store` E5 at edit; soft `ack` C5 at replay reset. No success chime. |
| 31–40 s | Pulse the unchanged test name and request line at 31 s. Repeat the same activity motion and duration used on the first execution. At 34 s reveal `403` and `Denied`; no invoice payload appears. At 36 s actual becomes `403`, then `=` and `PASS · 1 test`. Hold. | The same access test has executed against the changed check. Measured response now matches the original contract. Only now does `Unverified` become a passing result. | Same `work` C4 start and neutral `arrive` E5 response cue as first run; restrained `chime` G5 at assertion match. |
| 40–49 s | Briefly emphasize the persistent `cross-tenant` test name, then the matched pair and `PASS · 1 test`. Hold the finished scene for at least 6 s. | Tenant B, owner A, expected 403, actual 403, and denied response remain together. No broad security badge or further request is introduced. | One quiet `ack` G5 at focused confirmation; final hold silent. |

## Correctness limits

`403` is the chosen contract for this example, not a universal requirement for every cross-tenant endpoint. The two predicates are deliberately abbreviated illustrative logic: authenticated identity alone is insufficient here; the proposed change compares requester tenant with resource owner. Do not present `tenant == owner` as a complete production authorization implementation or as covering every policy requirement.

The invoice body in the first response makes incorrect access observable. Its absence plus `403` in the rerun makes denial observable. Merely changing the displayed expected value would defeat the lesson; expected must remain unchanged. A code edit is an attempted repair, and the amber unverified hold is mandatory. A passing rerun establishes only this one exercised behavior under these test conditions. Other identities, endpoints, error cases, and security properties remain untested.

## Implementation and acceptance checks

Use standard labels, short activity strokes, pulses, and scheduled sounds. Add a cut-local document/response helper and predicate replacement animation if needed, using animated properties for geometry. Use the repository-pinned engine in eventual production. The only repeated motion should be the intentional replay of the same test; match its request, identities, target, and execution timing. No source edits or rendering are included in this plan.

Check every transition at native resolution and 350 px. Required observations: B differs from owner A; the first response actually exposes invoice data; failure shows both 403 and 200; both values arrive in the editor; only the authorization predicate changes; the repair is visibly unverified; a fresh execution occurs before 403 and PASS; no invoice payload leaks into the final denied state. No moving copy may obscure the source evidence or either numeric column. Listen for distinct execution, mismatch, edit, and verified-match events, and verify encoded frames and audio during production.

The composition earns its change of view: behavior becomes feedback, feedback directs a concrete edit, and replay measures behavior again. The final image states the limited result through the single named test and its actual response, without relying on explanatory captions.
