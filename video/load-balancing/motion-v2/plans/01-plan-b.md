# Lesson 01 — One request — plan B

Independent plan for the motion-v2 cut of load-balancing lesson 01. Authored from the lesson entry in `video/load-balancing/sequence/lessons.json` (item 1) and the concept content in `content/concepts/load-balancing.json`. Earlier motion-v2 beat sheets from other chapters were read only to vary the geometry. No other plan for this lesson, no production ledger, and no authoring source was consulted. This document names no authoring model.

## Scope

One mechanism: **an application sends a request for user 42's profile, the server does that work step by step while the application waits, and only when the work is finished does a response travel back and fill the application's screen.**

The viewer should feel three things. The profile screen at the top has empty fields and a `waiting` state for the whole time the server is working. The server's two work rows fill one after the other, so "processing" is something visible, not a pause. The response leaves only after the second row completes, and the screen's fields fill only after it lands.

Grounding: lesson beats ("meet the application and server", "the application sends a request", "the server processes the request", "the server sends a response", "the application receives the result"); lesson intro ("an application asks a server to do something. The server runs the work and returns a response. Here the request asks for a user profile"); takeaway ("a request is the ask. A response is the result. The server does work between them"); question and answer ("what is the server doing while the application waits? It is processing the request. The response travels back only after that work finishes"). The concept file's sources (Google SRE, gRPC, Envoy) address balancing, which this lesson does not reach; this cut needs no external claim beyond the lesson text.

Out of scope (later lessons): finite capacity, work slots and a second server (02); a load balancer and round robin (03); unequal work (04); least requests (05); health checks and failures (06). The cut shows exactly one application, one server and one request, with no balancer, no slot indicator and no error path. It also avoids timing numbers.

Grammar for this cut: **a vertical request/response view in the reference reel's caller-above-callee layout, with two separate lanes (request down on the left, response up on the right), a profile screen at the top whose fields are empty until the response lands, and a server card at the bottom whose work rows fill in order.** The two lanes make direction obvious to a beginner; the empty-then-filled screen makes "the result" concrete; the filling work rows make "processing" visible. Every element is a software object: an application screen, an HTTP request, a server, its work steps and a response. No waiter, restaurant, mail or phone-call metaphors.

Target length ≈ 34 s at speed 1 (`meta.speed: 1`). The processing beat is deliberately the longest so the waiting is felt; do not shorten it. If stills read fast, lengthen the hold after the response lands.

## Engine notes

Use `store` nodes for the profile screen (3 rows) and the server's work (2 rows, using `row{i}Fill` for progress), `label` for actor names, states and lane names, `s.wire` for the two lanes, and chips for the request and response. No new node type is expected. Work in a cut-local engine copy with the repository-pinned Puppeteer; if chip text renders below 40 px, add a `labelSize` option there and report it.

## Stage and coordinates (1080 × 1920)

Palette follows `references/style.md`. Minimum on-screen text 40 px (≈ 13 px at 350 wide); actor names 48 px; monospace at 40 px ≈ 24 px per character. Content stays within x 200–880 and y 600–1500.

| id | type | centre / bounds | text | notes |
|---|---|---|---|---|
| title | title band (540, 330) / (540, 405) | — | **Load balancing** / ONE REQUEST | engine title and subtitle |
| appLab | label | (540, 635), 48 px | `app` | C5 |
| app | store, `rows: 3`, w 600 | (540, 765), x 240–840, y ≈ 670–860; row centres ≈ 705, 765, 825 | rows 40 px mono: `user   42` · `name   …` → `Ana` · `plan   …` → `pro` | the profile screen; empty fields in mid grey |
| appState | label | (540, 915), 40 px mono | `idle` → `waiting` (accent) → `shows profile` (ok) | |
| reqLane | wire | (460, 860) → (460, 1240) | — | request lane, left |
| resLane | wire | (620, 1240) → (620, 860) | — | response lane, right |
| reqLab | label | (330, 1050), 40 px, mid, ≈ 168 px (x 246–414) | `request` | |
| resLab | label | (770, 1050), 40 px, mid, ≈ 192 px (x 674–866) | `response` | |
| server | store, `rows: 2`, w 600 | (540, 1305), x 240–840, y ≈ 1240–1370; row centres ≈ 1272, 1338 | rows 40 px mono: `find user 42` → `find user 42 ✓` · `build profile` → `build profile ✓` | each row has a fill bar 0 → 1 |
| srvLab | label | (540, 1425), 48 px | `server` | G5 |
| srvState | label | (540, 1485), 40 px mono | `idle` → `working` (accent) → `done` (ok) | |

Chips: `GET /users/42` (≈ 312 px) travels down reqLane; `200 · profile` (≈ 312 px) travels up resLane. Check that each chip's text clears the other lane's label (`response` starts at x 674; the request chip centred at x 460 spans 304–616) and that chips fade cleanly where they meet the cards.

## Sound map

Actor pitches: app **C5**, server **G5**. Sends an octave up and quieter. Pan: app slightly left (≈ −0.2), server slightly right (≈ +0.2).

| event | preset | notes |
|---|---|---|
| actors introduced | `ack` C5, then `ack` G5 | |
| request leaves | `send` C6 | |
| request arrives | `arrive` G5 | |
| server working | `work` G4 | every 0.4 s while a row fills |
| work step done | `ack` G5 | one per row |
| response leaves | `send` G6 | |
| response arrives | `deliver` C5 | the brightest moment |
| profile field filled | `store` C5 | one per row |
| result complete | `chime` C5 | quiet, once |

The app makes no sound while it waits; the silence on its side, against the server's work ticks, is the point.

## Beat sheet (speed 1)

| time | what moves | state change | sound |
|---|---|---|---|
| **Beat 1 — Meet the application and server (0–5.0)** | | | |
| 0.0–1.0 | app card, server card, labels and lanes fade in | app rows `user 42`, `name …`, `plan …`; both states `idle` | — |
| 1.6 | app card pulses | | ack C5 |
| 2.6 | server card pulses | | ack G5 |
| 2.6–5.0 | hold | | |
| **Beat 2 — The application sends a request (5.0–8.0)** | | | |
| 5.0 | appState → `waiting` | | — |
| 5.4–6.8 | chip `GET /users/42` down reqLane; reqLab pulses | | send C6 |
| 6.8 | ripple at server top | srvState → `working` | arrive G5 |
| 6.8–8.0 | short hold | the server has the ask; no work row has started yet | |
| **Beat 3 — The server processes the request (8.0–19.0)** | | | |
| 8.0–12.4 | server row0 fill 0 → 1 | `find user 42` | work G4 every 0.4 s |
| 12.4 | row0 text → `find user 42 ✓` (ok) | | ack G5 |
| 12.8–16.8 | server row1 fill 0 → 1 | `build profile` | work G4 every 0.4 s |
| 16.8 | row1 text → `build profile ✓` (ok) | | ack G5 |
| 11.0 / 14.0 / 17.0 | appState `waiting` pulses softly | the app still has no result | — |
| 17.0–19.0 | hold | work finished; nothing sent yet | |
| **Beat 4 — The server sends a response (19.0–25.0)** | | | |
| 19.0–20.4 | chip `200 · profile` up resLane; resLab pulses | srvState → `done` | send G6 |
| 20.4 | ripple at app bottom | | deliver C5 |
| 20.4–25.0 | hold | the result has arrived | |
| **Beat 5 — The application receives the result (25.0–34.0)** | | | |
| 25.0 | app row1 → `name Ana` | | store C5 |
| 25.6 | app row2 → `plan pro` | | store C5 |
| 26.2 | appState → `shows profile`; app card pulses ok | | chime C5 (quiet) |
| 27.0 | reqLane, server rows, resLane pulse in order (0.4 s apart) | ask → work → result | — |
| 28.6–32.4 | hold | final state | |
| 32.4–33.2 | `s.fade` to black, 0.8 s | finite ending | — |
| 34.0 | end | | |

Beat 3 starts at 8.0 s, earlier than the lesson's 10 s mark, so the request's arrival visibly triggers the work and the processing beat stays the longest (≈ 11 s). The lesson's beat times are a guide for the public cut; this cut keeps their order.

## Accuracy limits

- `GET /users/42`, `200 · profile`, `Ana` and `pro` are illustrative. HTTP is the example protocol; the lesson's idea applies to other request/response protocols.
- The two work rows simplify server processing. A real server may call a database or another service; that is not drawn.
- Network transit takes time too. The cut keeps it brief so processing is the visible wait; it does not claim transit is free.
- The flow shown is synchronous: the app waits for this response. Many apps do other work meanwhile; the cut's app shows only this screen.
- Only success is shown. Errors, timeouts and retries are outside this lesson.
- No timing numbers appear; durations are illustrative pacing, not measurements.

## Native 350 acceptance

These are requirements for the future render, not completed validation.

1. Decode actual frames (avoid relying only on a contact sheet) at 1080 and at 350 px wide around 1.8, 2.8, 4.5, 5.2, 6.0, 6.9, 8.5, 10.5, 12.5, 13.0, 15.0, 16.9, 18.0, 19.6, 20.5, 23.0, 25.1, 25.7, 26.3, 27.5, 30.0 and 32.8 s. At 350 px, `app`, `server`, all three app rows, both server rows, both states, `request`, `response` and both chip texts must be readable.
2. Order: the response chip never appears before row1 reads `build profile ✓`; app fields read `…` until the response chip has landed; appState reads `waiting` from 5.0 s until 26.2 s.
3. Direction: the request chip travels only on the left lane downward; the response chip only on the right lane upward.
4. Processing is visible: during 8.0–16.8 s exactly one server row is filling at a time, and the srvState reads `working`.
5. Scope: no second server, balancer, slot indicator, queue or error appears.
6. Clearance: chips clear the opposite lane's label; app and server text stays inside their cards; nothing enters the title band; no chip remains during a hold.
7. Silent reading: with sound off and words ignored, a viewer sees a card with empty fields at the top; something travels down the left line; two bars fill in the bottom card one after another while the top card's status line blinks; something travels up the right line; the top card's empty fields fill in.
8. Audio: the dry run lists `work` ticks only while a server row fills, no app sound between 6.8 and 20.4 s, one `deliver` at 20.4 s, and one quiet `chime`. Full-decode the encode, confirm an audio stream, peak below −0.5 dBFS and moov before mdat. Record whether audio was heard or only analysed.
9. After encoding run `python3 scripts/check_media.py --concept load-balancing`; a new encode needs renewed comparison review bound to its SHA-256.

## Production boundary

Only this anonymous plan is written. No render, scene source, public media, site, shared skill, Git commit or deployment. Later implementation uses the repository-pinned Puppeteer and a cut-local engine copy, with any drawing extension local to the cut.

