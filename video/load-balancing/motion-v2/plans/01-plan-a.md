# One request

## Scope and grounding

Teach one successful profile request: the application asks, the server processes, and the application receives and displays the result. Make the processing interval visibly different from message travel. The application stays Waiting until the response arrives, even after the server finishes.

Scope: `video/load-balancing/sequence/lessons.json` item 1 and `content/concepts/load-balancing.json`. The broader concept covers balancing, but this introductory lesson intentionally has no balancer, replicas, routing policy, queues, retries, health checks, or concurrent requests.

Primary reference: [RFC 9110, HTTP messages](https://www.rfc-editor.org/rfc/rfc9110.html#section-3.4), retrieved 2026-10-21. HTTP distinguishes client requests from server responses. The profile, endpoint, processing steps, and timing here are illustrative teaching choices, not an implementation requirement or benchmark.

Five beats, approximately 40 seconds, finite ending. The meaningful change is an empty profile view becoming populated only after server work and response delivery.

## Stage: application screen and server handler

1080 × 1920. Application UI occupies the upper half; a server handler panel sits below. Two separately labeled vertical paths show outgoing request and returning response. These are two directions of one exchange, not separate network connections. No physical envelopes, moving machinery, or extra middle box.

Background #050506; primary #E6E8EC; secondary #8B9099; request/active work amber #F5A524; response/result teal #3FB68B. Direction, labels, and actor states carry meaning independently of color. Main labels 58–64 px; data and state labels 52 px minimum; title 76 px.

Coordinates are x,y,width,height unless marked as endpoints.

| Element | Geometry | Content |
|---|---|---|
| Title | 90,140,900,100 | `One request` |
| Application screen | 120,360,840,420 | header `Application`, 64 px; profile area below |
| Profile area | 180,475,720,230 | initially `Profile 42` and a `Load profile` control; while waiting, `Waiting`; finally `Maya` and `User 42` |
| Request path | (320,800)→(320,1150) | arrow points down; label `Request`, x100,y910 |
| Response path | (760,1150)→(760,800) | arrow points up; label `Response`, x650,y1030; hidden until response ready |
| Server handler panel | 120,1170,840,430 | `Server`, x180,y1220; state at x180,y1320; work rows y1410 and y1500 |
| Stationary message readout | 150,1660,780,150 | request: `GET /users/42`; later response: `200 OK · Maya`, 56 px |

Request and response labels must not touch their paths; reserve 30 px clearance. Use a small outlined request marker and a filled response marker, each about 44 px across, only during transport. Read message text in the stationary readout, not on a moving object.

Server work rows: `Find user 42` and `Build profile`. These are handler milestones in this example, not an invented measured percent-complete bar. A small square at the left of each row changes queued→active→done; labels do not move. The final profile is not visible in the application before response receipt.

## Beat sheet: time, motion, state, sound

Actor pitches: application C4, server E4. Keep notification sounds restrained; no music or continuous typing. Sound cues describe intended production, not audio already created or heard.

| Beat / playback | Motion and state changes | Sound and readable hold |
|---|---|---|
| 1 · 0–6 s · Meet both ends | Establish application with Profile 42 and Load profile control, server Idle, empty paths. At 3 outline Load profile once to establish the pending action; no request has left yet. | Soft application `ack` C4 at 3. Hold 3.5–6. The server remains Idle. |
| 2 · 6–13 s · Send the ask | At 6.5 activate Load profile and replace it with Waiting. Reveal stationary `GET /users/42` readout and Request label. Hold 7–9 for reading. Request marker travels from (320,800) to (320,1150) during 9–10.5, then is consumed at the server boundary. Server becomes Processing at 10.5. | Application `send` C4 at 9; server `arrive` E4 at 10.5. Hold 11–13 on Waiting above, Processing below. No response exists. |
| 3 · 13–24 s · Server does work | At 13.5 activate Find user 42. At 16.5 mark that milestone done and activate Build profile. At 20.5 complete Build profile and change server state to Response ready. The application remains Waiting throughout. No in-flight marker during processing. | Server `work` E4 at 13.5 and 16.5; server `ack` E4 at 20.5. Hold first milestone 14–16.5, second 17–20.5, ready state 21–24. No indefinite spinner or meaningless loop. |
| 4 · 24–32 s · Return the result | At 24.5 change stationary readout to `200 OK · Maya` and reveal Response label/path. Hold 25–27. At 27 the server emits the response marker, traveling upward until 29. Application stays Waiting until arrival. At 29 marker enters the screen, Waiting becomes Received. Server becomes Idle after sending, while completed milestone marks remain as history. | Server `send` E4 at 27; application `arrive` C4 at 29. Hold Received 29.5–32. The application must not look complete just because the server sent. |
| 5 · 32–40 s · Use the result | At 32.5 replace the waiting/received area with the profile: Maya / User 42. Make its outline solid, retaining the application frame. At 34 dim paths to secondary tone and leave the response readout visible. | Application `deliver` C4 at 32.5. Hold 34–40 silently. No reset, second request, or automatic looping. |

Causal sequence must remain explicit: request reaches handler → work advances → response becomes ready → response leaves → application receives → profile renders. Server activity is a change in actual handler milestones, not just a traveling dot. The persistent application Waiting state supplies the contrast needed to answer the lesson question.

## Accuracy limits

- This is one successful, non-streaming profile lookup. Other HTTP exchanges can include informational responses, errors, streaming, asynchronous work, caches, and intermediaries; do not imply all applications finish all work before sending any response bytes.
- GET requests a representation. Find user and Build profile are illustrative handler steps, not a claim that every GET performs a database query or mutates a user record. No storage component is introduced.
- `200 OK · Maya` abbreviates status plus result for teaching; it is not literal complete HTTP syntax. The response payload is data; the application renders the profile after receipt.
- The visible markers represent messages, not individual IP packets or TCP acknowledgements. Omit connection setup, encryption handshakes, and packet segmentation.
- Waiting describes this pending request, not a frozen UI thread or an application unable to do other work. The server's one highlighted handler does not imply universal single-request capacity.
- Motion and holds do not measure latency. Do not add millisecond claims or a percentage progress estimate. Exactly one request and one final response occur in this example.

## Native350 and future encoded acceptance

These are requirements for later production, not completed review claims.

- Inspect individual actual encoded frames at native 350 px width (~622 px high) and full resolution. A 52 px source label becomes ~16.9 px. All labels, endpoint text, milestone rows, and final profile must read without zoom. Reflow a label rather than shrinking it.
- Sample holds at 4, 8, 12, 15, 19, 22, 26, 30, and 37 seconds. Inspect before/mid/after both transports, server state changes, and profile rendering. Contact sheets alone cannot establish readability.
- At 19 s a beginner must see the application waiting while the server builds the profile, with neither message traveling. At 28 s the response is traveling and the application is still Waiting. At 37 s the application displays the returned user.
- No response marker, success status, or completed profile may appear before the server's ready state. No request marker lingers after server receipt. No second request appears when the profile renders.
- Check path labels and moving markers never cross screen text, server milestones, or one another. Clear the request path emphasis before response travel, retaining distinct direction arrows.
- Silent playback must explain the request/work/response distinction. Meaningful variety comes from application state, directional transfer, server milestones, and final data rendering; avoid camera drift or extra animated decoration.
- Reproduce alleged visual faults with alternate extraction before flagging. Later decode the full MP4, check audio peaks and streaming metadata, and listen before claiming audio was heard. Bind review to the actual full SHA-256; any re-encode requires renewed inspection.

Only this plan is assigned. Later implementation uses repository-pinned Puppeteer and a cut-local engine copy. No rendering, public/site/shared-skill edits, Git operations, or other lesson work are included.
