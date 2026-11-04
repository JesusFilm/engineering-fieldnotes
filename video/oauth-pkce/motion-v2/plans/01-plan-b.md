# OAuth PKCE lesson 01 — Delegate access (plan B)

Status: plan only. No scene, render, manifest or lesson text has been changed.

## Lesson and limits

One mechanism: a client gets delegated access to a resource API through an authorization server. The user approves in the browser, a short-lived authorization code returns to the client by browser redirect, the client exchanges that code for an access token directly with the authorization server, and the API checks the token and its permission on every request.

The viewer should leave with four distinctions, carried by motion and sound:

1. The code is a different object from the token. It is amber, small and dashed-outlined; the access token is teal and solid. The code is consumed (poof) at the exchange and never reaches the API.
2. The user's credential stays between the browser and the authorization server. The client is dimmed during that step and the masked credential never travels on a client wire.
3. The API decides. A valid token for read access gets 200 on a read and 403 on a delete. A token alone grants no automatic permission.
4. This is access delegation. The scene never uses the words "login", "sign in with" or "identity", and the API is not shown learning who the user is.

Out of scope here, reserved for lessons 02–05: verifier, challenge, S256, code binding, concurrent attempts. No refresh token, client secret, state parameter, ID token or JWT detail. The token response may contain more than one token in real systems; the scene shows only the access token because it is the one the API sees, and the lesson text already says "tokens".

A persistent footer reads SIMPLIFIED FLOW, and the subtitle reads DELEGATED ACCESS. Endpoint paths and the scope name read:incidents are illustrative and echo the concept page's incident-summary example.

## Stage (1080x1920)

A rectangle with one diagonal replaces the default top-to-bottom stack, so the front channel (through the browser) and the back channel (client to server) occupy visibly different paths.

| Node | Type | Position | Label |
|---|---|---|---|
| Client app | box 300x170 | (290, 640) | Client app |
| Resource API | box 300x170 | (790, 640) | Resource API |
| Browser | new local window node 300x210 (tab strip, address bar) | (290, 1200) | Browser · user |
| Authorization server | box 300x170 | (790, 1200) | Auth server |
| Client holds | store, 2 rows, w 560 | (540, 1540) | Client holds |
| Footer | label 38px, mid grey | (540, 1770) | SIMPLIFIED FLOW |

Wires: client-API (top, horizontal), client-browser (left, vertical), browser-auth server (bottom, horizontal, the front channel), client-auth server (diagonal, the back channel). The diagonal crosses nothing. The Client holds store sits below the stage action and fills with code, then token, so the viewer sees what the client possesses at each moment; the row reading code empties when the code is consumed.

Legibility at 350px width (scale 0.324): node labels 48px, chips and badges 42px bold mono, footer and store rows 38px. Nothing below 38px at 1080 (about 12px at 350). Chips travel on wires at least 60px from any label; badges appear beside nodes, never over wire midpoints where packets pass. Labels used, complete list: node names, GET /incidents, DELETE /incidents/7, Allow read:incidents?, code, access token, 401, 200, 403, token valid, scope read, no write scope, SIMPLIFIED FLOW. No sentences.

Engine: copy the repository's existing per-cut engine (flow-engine.js, render.mjs, preview.html, as kept under video/<concept>/<variant>/engine/) into this cut's engine/ folder and render with the repository's pinned puppeteer-core 25.14.0. Add one general node type, window (browser-like frame reading every changing value through p()), and a chip style option for the dashed amber code. Report both engine additions in the cut's notes.

## Sound map

Each actor has one pitch and timbre from one chord, so the route of every hop is audible.

| Actor | Pitch | Timbre |
|---|---|---|
| Client app | C5 | short mallet (arrive preset) |
| Browser / user | E5 | softer sine, less echo |
| Auth server | G5 | bell, extra harmonics, longer decay |
| Resource API | C4 | low woody tick, short |

Event sounds: send ticks an octave above the sender; denial uses thump (401 lighter, 403 heavier and the loudest moment of the video); approval uses a two-note chime E5 to B5; code issue is a small high G6 tick; exchange work is three AS work ticks; token issue is chime G5 to D6 then store on the client; code consumption is poof; API checks are ack blips at C5 and E5; success is deliver high. Pan by node x. One sound per event; peaks below -1 dBFS.

## Beat sheet (about 34 s, speed 1)

| Time | Moves | State change | Sound |
|---|---|---|---|
| 0.0–2.0 | Nodes appear in order: client 0.3, API 0.7, browser 1.1, auth server 1.5; footer fades in | each node scales in with a pulse | its own actor note on appearance |
| 2.2 | chip GET /incidents, client to API, 0.55 s | API flashes red, 8px jolt | send C6, then thump light |
| 3.0 | badge 401 pops beside API | client pulses grey: it lacks access | — |
| 3.0–4.6 | hold | 401 visible, then fades at 4.4 | — |
| 4.8 | envelope client to browser (left wire) | browser outline brightens | send C6, arrive E5 |
| 5.6 | envelope browser to auth server (bottom wire) | AS brightens; client dims to 30% | arrive G5 |
| 6.6 | masked chip of dots, browser to AS only | AS check ripple green at 7.3 | soft E5 send, ack |
| 8.0 | badge Allow read:incidents? inside browser window | window frame turns accent | — |
| 9.0 | green check ripple on browser | badge turns teal and shrinks | chime E5-B5 |
| 9.0–11.0 | hold | client still dimmed, nothing moves | — |
| 11.2 | dashed amber chip code, AS to browser (bottom wire) | client returns to full alpha | G6 tick at AS |
| 11.9 | code continues browser to client (left wire): the redirect | browser pulses as it passes | soft E5 |
| 12.5 | code arrives | store row 0 fills amber: code | arrive C5 |
| 12.5–14.3 | hold | — | — |
| 14.5 | code chip, client to AS on diagonal (back channel), wire marches | browser dims to 30%: not involved | send C6 |
| 15.1 | arrives at AS | AS sublabel check code; three work ticks 15.3, 15.55, 15.8 | work x3 at G4 |
| 16.0 | green check ripple; code chip poofs at AS; store row 0 empties | the code is used up | ack, poof |
| 16.6 | teal solid chip access token, AS to client on diagonal | — | chime G5-D6 |
| 17.2 | arrives | store row 1 fills teal: access token | store |
| 17.2–19.2 | hold | — | — |
| 19.4 | chip GET /incidents with a teal token tab, client to API | browser and AS dim | send C6 |
| 20.0 | arrives | API sublabel token valid, green dot | ack C5 |
| 20.6 | — | API sublabel scope read, second green dot | ack E5 |
| 21.2 | badge 200 travels API to client | client pulses green | deliver high |
| 21.2–23.2 | hold | — | — |
| 23.4 | chip DELETE /incidents/7 with same token tab, client to API | — | send C6 |
| 24.0 | arrives; token valid green dot | ack C5 (same as before, so the ear expects success) | ack C5 |
| 24.6 | scope check fails: red x ripple, 12px jolt, sublabel no write scope | API flashes red | thump heavy, loudest |
| 25.2 | badge 403 travels to client | client pulses red; token row stays teal (token still valid) | low deliver |
| 25.2–27.6 | hold | — | — |
| 27.8 | recap: browser-AS wire lights | front channel glows | E5 |
| 28.5 | diagonal lights | back channel glows | G5 |
| 29.2 | client-API wire lights, API outline pulses | API checks every request | C4 |
| 29.2–32.4 | hold on full stage, all four actors lit, footer visible | — | — |
| 32.4–33.2 | s.fade to black below title | finite ending, loop restarts from empty stage | — |

Runtime is about 33 s of motion plus about 1 s of fade, just under the 35–50 s guideline; the ending is finite and no padding is added to reach a number. If review finds a beat rushed, widen gaps 7.3–8.0 and 20.0–20.6 first, keeping the total under 42 s. No hold exceeds 3.2 s.

Suggested lesson-text beat times for the coordinator (lessons.json not edited): 0 access needed, 4.8 user authorizes in browser, 11.2 code returns by redirect, 14.5 code exchanged for token, 19.4 token accompanies request and API checks.

## Accuracy checks before render

- Exchange happens on the diagonal only; no code or token rides the browser wires after 12.5.
- The API never receives the code or the user's credential.
- The 401/200/403 statuses match RFC 6750 usage for missing token and insufficient scope (403 with insufficient_scope); verify against the source and adjust if needed.
- No on-screen word claims OAuth authenticates the user to the client or grants universal access.

## Verification

Follow the skill steps 5–7 and the editorial workflow: stills at 1.5, 3.2, 8.5, 12.6, 16.2, 17.4, 20.8, 24.8, 29.5 s, viewed at full size and downscaled to 350px wide (ffmpeg scale=350:-1) to confirm every label reads; contact sheet; full-file decode with ffmpeg -v error; spectrogram showing one cue per event with the 403 thump loudest; volumedetect max below -1 dB; ffprobe duration, audio stream and faststart metadata. Record whether audio was heard or only analysed. Write the defect and improvement passes to this cut's review file. A comparative review against other cuts decides any recommendation; this plan claims no score.
