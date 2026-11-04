# Grant only needed access

## Focus and grounding

One mechanism: permission matches an authenticated identity, an action and a particular resource. The same investigation identity can read checkout logs but cannot read payments logs. Keep the action constant while changing only the resource so the audience can see why broad “read access” is insufficient.

Grounding: item 2 of `video/guardrails-and-permissions/sequence/lessons.json` and the scoped investigation example in `content/concepts/guardrails-and-permissions.json`. AGENTS.md, editorial workflow, architecture-flow-video SKILL.md and its style/API/review references were read earlier in this conversation and apply here. No other current plan or author source is used.

Primary evidence: [OWASP Authorization Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html), accessed 2026-10-20 in this session. Its least-privilege and per-request-check guidance supports defining permitted operations for specific resources. The specific identity, resource names and log response below are illustrative, not claims about a framework's defaults.

Exclude deployment attempts, prompt injection, approval flows, credential changes and permission expansion. The permission set contains no deployment grant, but this film does not add a deployment scenario. Read access to unrelated logs is the focused counterexample.

## Visual grammar and coordinates

Use a resource-by-action permission grid coupled to a single request selector and a response pane. Only one cell is granted. A request first selects an action column and resource row; the intersection determines whether the logs are read. A second request keeps the same column but changes row. This is a software permissions UI, not a physical key/door metaphor or three-box pipeline.

Canvas 1080×1920, 30fps. Black background, white essential text, blue request emphasis, teal granted/read result, red denied result, gray inactive cells. Text and symbols carry the distinction independently of color. Essential labels 48–54px (15.6–17.5px at native 350px), secondary labels at least 44px. Title 78px, wrap to two deliberate lines if needed rather than shrinking.

All rectangles use top-left coordinates and width×height; text coordinates are left baselines unless centered.

- Title centered (540,285), 78px: `Grant only needed access`. Subtitle centered (540,375), 44px: `ACTION + RESOURCE`.
- Identity strip (90,455), 900×110: label (125,520) `Identity: investigator`, 52px. Small trusted-context annotation `session` may sit at (790,520), 44px if it fits; otherwise omit rather than crowd the identity.
- Permission grid (90,635), 900×465. Heading (125,695), 48px `Service permissions`. Column headers centered (580,775) `read`, (840,775) `write`, 50px. Resource labels x=125: `checkout` baseline 880, `payments` baseline 1020. Row sublabels `logs` at y=935/1075, 44px. Grid divider x=450; column divider x=710; row divider y=960. Data cells: checkout/read (450,805), 260×155; checkout/write (710,805), 260×155; payments/read (450,960), 260×140; payments/write (710,960), 260×140.
- Cell centers (580,880), (840,880), (580,1025), (840,1025). Checkout/read shows a tick and `allow`; all other cells show a dash and `no grant`, 44px. These are configured permissions, not request results. No animation grants additional access.
- Request strip (90,1170), 900×140. Heading (125,1220), 44px `Request R1`, later `Request R2`. Main line (125,1285), 52px `read checkout/logs`, later `read payments/logs`. Preserve full resource text in this line even though the grid uses two-line labels.
- Result pane (90,1380), 900×350. Header (125,1440), 48px `Response`. Status (125,1510), 54px initially `pending`, then `ALLOWED`, later `DENIED`. Body at (125,1590), 50px: successful read `checkout: timeout`; final denial `No payments read grant`, split as `No read grant` / `payments/logs` if necessary. Counter at (125,1670), 46px: `Payments reads: 0`, present throughout as neutral evidence; during R1 result add `Checkout reads: 1` at (125,1730) only if pane grows to 390px without leaving canvas safe margins.
- Selected intersection outline: 8px stroke outside the chosen cell, never across text. Request matching animation highlights read header, then resource label, then intersection. The action highlight stays fixed across R1/R2.
- Check route from request top (540,1170) via (1015,1170),(1015,880) to (970,880) for R1; replace target y=1025 for R2. A small `R1`/`R2` dot travels the gutter. This indicates an authorization lookup, not data access.
- Response route from selected cell to result via left gutter x=60, terminating (90,1510). For R1 an allowed marker arrives before the log line appears. For R2 a denied marker arrives and no log content is emitted. No packet traverses an unrelated cell.

## Five beats: timed motion, state and sound

Target 44 seconds. Timing is local playback at speed 1. Extend holds if encoded native-350 review needs them; do not compress to a fixed length.

| Time | Motion and state | Meaningful hold | Sound |
|---|---|---|---|
| 0–8 | Reveal identity and permission grid over 0–2. At 3 outline checkout/read and briefly emphasize its allow label. All other cells retain no grant. At 5 reveal R1: read checkout/logs with response pending. | Hold 5–8. Establish one identity and one permitted action/resource combination before any execution. | Policy display quiet `ack` C5 at 2; request actor `send` E6 at 5. No grant-write/store cue: permissions are already configured. |
| 8–16 | 8–9 highlight read column; 10–11 highlight checkout row. 11–12.5 R1 marker reaches their intersection. At 13 selected allow cell brightens. | Hold 13–16. Both row and column must match. Result remains pending until execution; no log text yet. | Authorization `ack` C5 at 9 and 11; `hit` C5 at 13, restrained. |
| 16–24 | 16–17.5 allow marker travels to response; at 17.5 status ALLOWED appears. At 18.5 the example checkout log line appears and checkout read count becomes 1. Payments reads stays 0. | Hold 19–24 with source scope and returned log visible. This is the only actual data read in the film. | Service `arrive` G5 at 17.5; data `deliver` G5 at 18.5. These cues are exclusive to the permitted read. |
| 24–34 | 24–25 fade R1 response content and replace request ID with R2, read payments/logs. Response returns to pending; persistent counters do not reset. Read header remains highlighted. At 27 highlight payments row, 28–29.5 route R2 to payments/read, then at 30 emphasize no grant and return DENIED. | Hold 30–34. Same identity and action, different resource, different decision. Do not show a momentary allow state or a payments log line. | Request `send` E6 at 25; authorization `ack` C5 at 27; `miss` C4 at 30 and short denial return `arrive` E4 at 31. No data-service delivery cue. |
| 34–44 | At 34 emphasize Payments reads: 0 and the denied reason. Remove temporary matching glows at 36 but retain selected payments/read outline, fixed permission values and denied response. | Hold 36–41. Both the permission scope and lack of forbidden read are visible. Fade all content 41–44; finite ending, no expansion of permissions. | Quiet authorization `ack` C4 at 34 for evidence emphasis. Silence through final hold/fade. |

Sound identities: request E, permission check C, actual allowed data response G. Use gentle pan toward highlighted grid cells. Sends quieter than arrivals. No crash sound on denial: enforcement is working. All consequential events have a cue; reading holds remain quiet. The film must teach the same mechanism muted.

## Accuracy limits and invariants

- The investigator identity is assumed authenticated by trusted execution context. The request supplies an operation/resource, not a self-asserted identity that grants access.
- Permission is scoped to checkout/logs and read. The grid's write column illustrates the absence of a write grant for these resources; it is not a deployment permission table. Do not suggest that log-write permission equals deployment authority.
- The grid represents this example's effective policy, not the complete set of roles, conditions or real service APIs. Real authorization can involve additional attributes; none are silently changed between R1 and R2.
- Reading the grid is not reading the protected logs. Only the successful R1 branch increments a resource-read counter and emits a log line. Payments reads remains 0 through the entire run.
- No denied data is fetched and then hidden: payments content must never appear in a transition or response pane. Denial occurs before protected execution.
- The example log line is fabricated instructional content and contains no real incident information. Permission to read logs does not remove the need to scope sensitive data.
- R1's success is not reused as authorization for R2. The second request is visibly checked again. No new grants are added to make it succeed.

## Native-350 acceptance and later encoded checks

1. Inspect individual 350×622 encoded frames without enlargement at 5.5, 11, 13.5, 19.5, 25.5, 29.5, 31.5 and 38 seconds. Read both resource names, action headers, allow/no-grant cells, request IDs, response and counters. Also inspect the full-resolution busiest frame. No contact-sheet-only acceptance.
2. Inspect before/mid/after matching and response transitions, especially 17.5–19 and 24–25. R1 log content must clear before R2 can be mistaken for its source. Identity, permission values and counters persist correctly.
3. At 19.5 seconds only checkout has executed a read; at 31.5 and 38 seconds payments still has zero reads and DENIED. Any temporary unauthorized data return or counter increment is a blocker.
4. A beginner should explain the change in decision by pointing to the resource row while the identity and read column stay fixed. No paragraph caption should be needed to infer this relationship.
5. Verify meaningful sound events by actual listening; separately analyze signal and peaks below −0.5 dBFS. Do not claim listening from frame/signal analysis. Later production must decode the full MP4, check audio stream and moov-before-mdat, and review beat boundaries.
6. Compare actual encoded candidate and public lesson before reading author source/self-review. Reproduce alleged visual faults through alternate extraction. Record before/after full SHA-256; any new encode requires renewed inspection bound to that hash.

## Deliverable scope

Write only `video/guardrails-and-permissions/motion-v2/plans/02-plan-a.md`. No rendering or other lesson work. Later implementation uses repository-pinned Puppeteer and a cut-local engine copy; grid/highlight helpers stay local and derive visual state deterministically from time. No public/site/shared-skill edits, Git commits or deployment.
