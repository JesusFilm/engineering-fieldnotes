# Take turns

## Scope and evidence

One mechanism: a request-aware load balancer maintains a next-server selection and advances it after each assignment. With two continuously eligible, equally weighted servers, four requests select A, B, A, B. Each request goes to exactly one server.

Grounding: `video/load-balancing/sequence/lessons.json` item 3 and `content/concepts/load-balancing.json`. [Envoy's supported load balancers](https://www.envoyproxy.io/docs/envoy/latest/intro/arch_overview/upstream/load_balancing/load_balancers), inspected 2026-10-21, describes rotation among available hosts and how configured weights affect frequency. This is a deliberately simple equal-weight request-routing illustration, not a reproduction of a particular deployment's scheduler.

Five beats, 46 seconds. No cost comparison, queue, failure, health-check animation, least-request policy, weighted example, connection reuse, or migration. Eligibility and equal weight are fixed premises, not mechanisms taught here.

## Geometry: routing selector with assignment history

1080 × 1920. Use a load-balancer control panel containing two endpoint rows and a moving `Next` selection outline. Below it, two server panels receive individual requests. A compact assignment-history strip accumulates immutable choices. This is a concrete software selector: no spinning wheel, conveyor, or three-box compiler.

Background #050506; text #E6E8EC; secondary #8B9099; Next outline amber #F5A524; assigned history teal #3FB68B. Words and outline position convey meaning independently of color. Title 76 px; actor names 60 px; IDs/states 54 px; assumptions 50 px minimum.

| Element | Coordinates (x,y,w,h) | Content |
|---|---|---|
| Title | 90,140,900,100 | `Take turns` |
| Application request | 330,330,420,110 | `Request 1`, later 2–4; one at a time |
| Load balancer | 90,540,900,500 | heading `Load balancer`, y580; `Round robin`, y660 |
| Endpoint A row | 150,760,780,90 | `A`, `Eligible`, `weight 1` |
| Endpoint B row | 150,890,780,90 | `B`, `Eligible`, `weight 1` |
| Next marker | x110 alongside selected row | amber outline around row; label `Next` above list at x700,y690 |
| Server A | 90,1220,420,240 | `Server A`; `Idle` / request ID / `Done` |
| Server B | 570,1220,420,240 | `Server B`; same state vocabulary |
| History heading | 90,1560,900,70 | `Assigned`, 54 px |
| Four history cells | x90,320,550,780; y1650; each 210×150 | top R1/R2/R3/R4; bottom A/B/A/B, 60 px |

Application-to-balancer path: (540,450)→(540,530). Outbound A path: (330,1040)→(300,1200); outbound B: (750,1040)→(780,1200). Paths appear only when selected; the marker is never duplicated at a fork. Record-history cells appear only on assignment and remain unchanged. A stationary selected-row outline and a traveling request marker must not be confused: the outline identifies the next choice, not the destination of an already moving request.

To avoid that ambiguity, briefly show `Assigned A` or `Assigned B` in the policy subtitle position during forwarding. Advance Next only after the outgoing marker has visibly entered its selected path. Restore Round robin after the history cell lands.

## Beat sheet

Application sound C4; selector G4; server A E4; server B A4. Each assignment produces the same selector cue, followed by the selected server's characteristic note. Sparse effects only; no constant tick or bed. Motion is deterministic and driven by assignment state.

| Beat / playback | Motion, state, timing | Sound and holds |
|---|---|---|
| 1 · 0–7 s · Establish the rule | Reveal balancer and two eligible weight-1 rows. Both servers Idle. At 3 outline A as Next. History empty; no request assigned. | Selector `ack` G4 at 3. Hold 3.5–7, giving time to read equal weights and Next A. |
| 2 · 7–17 s · R1 chooses A | Request 1 appears at 7.5; enters balancer 8–9. At 9.5 show Assigned A and create history R1/A. Forward one marker toward A 10–11.5. At 10.5 Next moves A→B over 0.7 s. A runs R1 at 11.5, becomes Done at 13.5, then Idle at 14.5. B stays Idle. | Application `send` C4 at 8; selector `ack` G4 at 9.5; A `work` E4 at 11.5 and `ack` E4 at 13.5. Hold 14.5–17 with both servers Idle but Next B retained. |
| 3 · 17–26 s · R2 chooses B | R2 enters 17.5–18.5. Assign B at 19; history R2/B appears. Forward 19.5–21; Next moves B→A at 20. B runs R2 at 21, Done at 23, Idle at 24. A remains Idle. | Application `send` C4 at 17.5; selector `ack` G4 at 19; B `work` A4 at 21 and `ack` A4 at 23. Hold 24–26, preserving history and Next A. |
| 4 · 26–35 s · R3 returns to A | R3 enters 26.5–27.5. Assign A at 28; add R3/A. Forward 28.5–30; Next advances to B at 29. A runs R3 at 30, Done at 32, Idle at 33. | Application `send` C4 at 26.5; selector `ack` G4 at 28; A `work` E4 at 30 and `ack` E4 at 32. Hold 33–35 on history A/B/A and Next B. This is the prediction moment; do not add a paragraph question. |
| 5 · 35–46 s · Confirm B | R4 enters 35.5–36.5. Assign B at 37; add R4/B. Forward 37.5–39; Next advances to A at 38. B runs at 39, Done at 41, Idle at 42. At 42.5 underline the four history destinations once, left to right over 1 s. | Application `send` C4 at 35.5; selector `ack` G4 at 37; B `work` A4 at 39 and `ack` A4 at 41. Hold 43.5–46 on A/B/A/B, Next A, both servers Idle. No fifth request or reset. |

Server completion never moves the Next outline. Its position changes only on assignment. Deliberately show both servers idle between requests so the viewer can see that selection follows the turn, rather than whichever server just became free. Work states provide visible consequences without expanding into response-path teaching. Responses are omitted from this routing-only view; Done denotes server work completion, not a displayed client receipt.

## Accuracy limits

- Round robin selects among the eligible set. Eligibility and weights stay unchanged throughout. A/B alternation is this two-server equal-weight example, not a universal schedule under changing membership, retries, multiple schedulers, or unequal weights.
- A is an illustrative initial position. The lesson does not promise every deployment starts with A or coordinates one global sequence across all processes.
- Equal assignments do not establish equal CPU load, equal processing cost, or optimal latency. Do not include utilization percentages or claims that the servers are perfectly balanced.
- The request is routed once, not broadcast, divided, copied for redundancy, or migrated. Historical assignment cells are records, not additional running requests.
- This is request-aware routing. Do not imply every connection-level balancer can reassign each request on an existing connection. Transport details are out of scope.
- Short server work animations are illustrative and do not drive selection or represent measured timings. The load balancer performs selection; it does not execute the profile-service work.

## Native350 acceptance and future review

- Inspect individual encoded frames at native 350 px width (~622 px high), plus full size. 54 px labels become 17.5 px; 50 px assumptions become 16.2 px. Ensure Eligible and weight 1 fit each endpoint row with at least 24 source pixels separation; stack them if necessary without shrinking type.
- Inspect holds at 5, 15, 24.5, 33.5, and 44.5 s, plus before/mid/after each assignment, Next movement, and server arrival. Use contact sheets only for navigation.
- After R3, a viewer must identify B as next. After R4, history must read A/B/A/B and Next must be A. Selection must not reverse when a server completes.
- At each dispatch exactly one request marker leaves toward exactly one server. No stale marker, fork duplication, history-as-request confusion, or ID mismatch. Request N must match its history cell and running server state.
- During Next movement, Assigned destination remains readable until the request has taken its path. Keep moving outlines clear of text and prevent momentary double-selection.
- Muted playback must explain rotation through state and accumulated choices, not only alternating sounds. Preserve readable holds; no decorative camera motion or looping spinner.
- Reproduce suspected visual faults with alternate extraction before flagging. Later decode the full MP4, inspect audio peaks and streaming metadata, and listen before claiming audio was heard. Bind encoded review to its actual full SHA-256; renew review after any re-encode.

Only this plan is assigned. Future implementation uses repository-pinned Puppeteer and cut-local engine copies. No rendering, public/site/shared-skill edits, Git operations, or other lesson work is included.
