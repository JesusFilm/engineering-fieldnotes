# Lesson 03 — Take turns — plan B

Independent plan for the motion-v2 cut of load-balancing lesson 03. Authored from the lesson entry in `video/load-balancing/sequence/lessons.json` (item 3) and the concept content in `content/concepts/load-balancing.json`. Earlier motion-v2 beat sheets were read only to vary the geometry. No other plan for this lesson, no production ledger, and no authoring source was consulted. This document names no authoring model.

## Scope

One mechanism: **a load balancer receives each request and sends it to one selected server; with round robin it keeps a `next` position over its eligible servers and advances it after every pick, so equally weighted servers A and B are chosen A, B, A, B.**

The viewer should feel three things. The balancer's `next` pointer visibly moves to the other port immediately after each pick, before the next request arrives: the rule has state. Each request goes to exactly one server. A `picks` log fills `1 → A`, `2 → B`, `3 → A`, then shows `4 → ?` long enough for the viewer to answer the lesson's question, before the fourth request goes to B.

Grounding: lesson beats ("introduce the load balancer", "request 1 routes to A", "request 2 routes to B", "request 3 routes to A", "the rule repeats A, B, A, B"); lesson intro ("a load balancer receives a request and selects a server. Round robin is a selection rule: take turns between eligible servers. Here both servers have the same configured weight"); takeaway ("round robin rotates through servers: A, B, A, B. A request goes to one selected server"); question and answer ("after A, B, A, which server gets the next request? B, provided both servers remain eligible and equally weighted"); concept overview ("a load balancer selects a backend… round robin rotates through eligible instances without measuring their current workload"). Sources per the concept file, retrieved 2026-10-19: [Envoy — Supported load balancers](https://www.envoyproxy.io/docs/envoy/latest/intro/arch_overview/upstream/load_balancing/load_balancers) and [gRPC — Load balancing](https://grpc.io/blog/grpc-load-balancing/).

Out of scope (later lessons): requests of different cost and a server still busy when its turn comes (04); least requests (05); health checks and ineligible servers (06). To keep lesson 04's surprise intact, every request here finishes before that server's next turn, so no request waits and no slot is ever full when a pick lands. Weights other than equal, connection-level versus request-level routing, and multiple balancer instances are not shown.

Grammar for this cut: **an app at the top, a load balancer box in the middle with two ports (A and B) and a `next` pointer that slides between them, two server cards below, and a `picks` log at the bottom that records each decision in order.** This takes the reference reel's port-and-pointer idea and makes the rule's state the subject: the pointer moves on its own after each pick, and the log turns the sequence into something the viewer can predict. It differs from lesson 01's two lanes and lesson 02's timeline. Every element is a software object: an application, a load balancer, its port list, a selection pointer, service instances with weights and a decision log. No dealers, turnstiles or queues of people.

Target length ≈ 42 s at speed 1 (`meta.speed: 1`). The `4 → ?` pause is deliberate (≈ 2 s); keep it. If stills read fast, lengthen the final hold.

## Engine notes

Use `box` for the app and servers, `box` with `ports: 2` and the animated `pointer` prop for the balancer (chevron under the selected port; `pointerColor` accent), `label` for names, weights, the rule name, the log header and `next`, `box` outlines for log cells with `label` text, `s.wire` for app→balancer and port→server links, and chips for requests. Set `portSpan` so the two ports sit at x 290 and 790 (directly above the servers); if the engine centres ports differently, move the servers to match the ports. Responses are shown as small dots returning server → balancer → app on the same links. Work in a cut-local engine copy with the repository-pinned Puppeteer.

## Stage and coordinates (1080 × 1920)

Palette follows `references/style.md`. Minimum on-screen text 40 px (≈ 13 px at 350 wide); names 48 px; monospace at 40 px ≈ 24 px per character. Content stays within x 120–960 and y 490–1580.

| id | type | centre / bounds | text | notes |
|---|---|---|---|---|
| title | title band (540, 330) / (540, 405) | — | **Load balancing** / TAKE TURNS | |
| app | box | (540, 545), 300 × 100 (x 390–690, y 495–595) | label `app` 48 px | C5 |
| inLink | wire | (540, 595) → (540, 710) | — | |
| lb | box, `ports: 2` | (540, 800), 760 × 180 (x 160–920, y 710–890); ports at (290, 890) and (790, 890) | label `load balancer` 48 px at y ≈ 770; sublabel `round robin` 40 px mono at y ≈ 830 | D5; `pointer` 0 = A port, 1 = B port |
| portLabA / portLabB | label | (290, 855) / (790, 855), 40 px mono | `A` / `B` | port names inside the box's lower edge |
| nextLab | label | follows the pointer at (290 or 790, 935), 40 px mono, accent | `next` | moves with the chevron |
| linkA | wire | port A (290, 890) → (290, 1080) | — | |
| linkB | wire | port B (790, 890) → (790, 1080) | — | |
| srvA | box | (290, 1150), 360 × 140 (x 110–470, y 1080–1220) | label `server A` 48 px; sublabel `weight 1` 40 px mono | E5 |
| srvB | box | (790, 1150), 360 × 140 (x 610–970) | label `server B`; sublabel `weight 1` | G5 |
| logPanel | outline box | x 140–940, y 1320–1560 | — | |
| logHead | label | (540, 1365), 40 px, mid | `picks` | |
| cell1–cell4 | outline boxes 160 × 80 | centres (240, 1470), (420, 1470), (600, 1470), (780, 1470) | 40 px mono: `1 → A` · `2 → B` · `3 → A` · `4 → ?` → `4 → B` | cells empty until filled; text colour matches server (A orange-ish E colour, B green-ish G colour) |

Chips: `req 1` … `req 4` (≈ 120 px) travel app → balancer → selected port → server. Check that `nextLab` at y 935 never sits under a chip passing down the same link (show it beside the link at x ± 70 if it does), and that the server sublabels `weight 1` stay readable when a server pulses.

## Sound map

Actor pitches: app **C5**, balancer **D5**, server A **E5**, server B **G5**. The picks make an audible pattern E–G–E–G. Pan: A left (≈ −0.5), B right (≈ +0.5).

| event | preset | notes |
|---|---|---|
| request leaves app | `send` C6 | |
| balancer receives | `arrive` D5 | |
| pick made (chip leaves port) | `send` at the chosen server's octave-up pitch | |
| server receives | `arrive` E5 / G5 | |
| server works briefly | `work` E4 / G4 ×2 | short, so no server is ever busy at its next turn |
| response returns | `deliver` C5, quiet | |
| pointer advances | `ack` D6, quiet | the rule's own state change |
| log cell filled | `store` at the server's pitch | |
| `4 → ?` | `ack` C4, quiet | |
| final pattern | `ack` E5, G5, E5, G5 | one per cell |

No music; silence during holds.

## Beat sheet (speed 1)

| time | what moves | state change | sound |
|---|---|---|---|
| **Beat 1 — Introduce the load balancer (0–5.0)** | | | |
| 0.0–1.0 | app, balancer, servers, links, empty log fade in | `round robin`; pointer at A; `next` under A | — |
| 1.6 | lb pulses | | ack D5 |
| 2.4 | srvA and srvB `weight 1` pulse together | equal weight, both eligible | ack E5 + G5 |
| 2.4–5.0 | hold | | |
| **Beat 2 — Request 1 routes to A (5.0–13.0)** | | | |
| 5.0–5.8 | chip `req 1` app → lb | | send C6 |
| 5.8 | ripple at lb; port A and chevron pulse | | arrive D5 |
| 6.3–7.1 | chip `req 1` port A → srvA | | send E6 |
| 7.1 | ripple at srvA; cell1 fills `1 → A` | | arrive E5, store E5 |
| 7.6 | pointer slides A → B; `next` moves under B | the rule advances | ack D6 |
| 7.1–8.3 | srvA works | | work E4 ×2 |
| 8.5–9.7 | small dot returns srvA → lb → app | | deliver C5 (quiet) |
| 9.7–13.0 | hold | A done, pointer waiting on B | |
| **Beat 3 — Request 2 routes to B (13.0–21.0)** | | | |
| 13.0–13.8 | chip `req 2` app → lb | | send C6 |
| 13.8 | ripple at lb; port B and chevron pulse | | arrive D5 |
| 14.3–15.1 | chip `req 2` port B → srvB | | send G6 |
| 15.1 | ripple at srvB; cell2 fills `2 → B` | | arrive G5, store G5 |
| 15.6 | pointer slides B → A | | ack D6 |
| 15.1–16.3 | srvB works | | work G4 ×2 |
| 16.5–17.7 | dot returns srvB → lb → app | | deliver C5 (quiet) |
| 17.7–21.0 | hold | | |
| **Beat 4 — Request 3 routes to A (21.0–29.0)** | | | |
| 21.0–23.1 | same as beat 2 for `req 3` | cell3 `3 → A` at 23.1 | send C6, arrive D5, send E6, arrive E5, store E5 |
| 23.6 | pointer slides A → B | | ack D6 |
| 23.1–25.7 | srvA works, dot returns | | work E4 ×2, deliver C5 |
| 25.7–29.0 | hold | log reads `1 → A · 2 → B · 3 → A`; pointer under B | |
| **Beat 5 — The rule repeats A, B, A, B (29.0–42.0)** | | | |
| 29.0–29.8 | chip `req 4` app → lb; it stops at the balancer | | send C6 |
| 29.8 | cell4 shows `4 → ?`; pointer chevron pulses under B | the viewer can answer | ack C4 (quiet) |
| 29.8–31.8 | hold with `4 → ?` | | |
| 31.8–32.6 | chip `req 4` port B → srvB | | send G6 |
| 32.6 | ripple at srvB; cell4 → `4 → B` | | arrive G5, store G5 |
| 33.1 | pointer slides B → A | | ack D6 |
| 34.0 / 34.5 / 35.0 / 35.5 | cells 1–4 pulse in order | A, B, A, B | ack E5, G5, E5, G5 |
| 36.0 | both `weight 1` labels pulse | the pattern holds while both are eligible and equal | — |
| 36.0–40.6 | hold | final state; pointer under A, ready for request 5 | |
| 40.6–41.4 | `s.fade` to black, 0.8 s | finite ending | — |
| 42.0 | end | | |

## Accuracy limits

- Round robin is shown as a single `next` position over eligible servers with equal weights. With different weights, some servers are chosen more often; that is not shown.
- The starting position (A) is arbitrary; implementations may start anywhere or randomise.
- Each request goes to one server. The cut routes individual requests; some balancers route connections instead, so all requests on one connection go to the same server (the concept's gRPC note). Not shown.
- Several balancer instances would each keep their own position, so the overall pattern seen by servers can differ from strict A, B, A, B. Not shown.
- Round robin does not measure server load. Every request here finishes before that server's next turn, so the cut makes no claim about busy servers; that is lesson 04.
- Responses return through the balancer, as with a proxy. Some designs return responses by other paths.
- No timing numbers appear.

## Native 350 acceptance

These are requirements for the future render, not completed validation.

1. Decode actual frames (avoid relying only on a contact sheet) at 1080 and at 350 px wide around 1.8, 2.6, 4.5, 5.4, 5.9, 6.7, 7.2, 7.7, 9.0, 12.0, 13.4, 14.7, 15.2, 15.7, 20.0, 22.0, 23.2, 23.7, 27.0, 29.4, 30.0, 31.0, 32.2, 32.7, 33.2, 34.2, 35.6, 38.0 and 41.0 s. At 350 px, `app`, `load balancer`, `round robin`, `A`/`B` port labels, `next`, both server names and `weight 1`, `picks` and all four cells must be readable.
2. Rule state: the pointer moves only after a chip has left the balancer toward the chosen server, and before the next request arrives; at every request arrival it already points at the server that will be chosen.
3. Order: picks are exactly A, B, A, B; each request reaches exactly one server; no chip ever travels down both links.
4. Question: `4 → ?` is visible for at least 1.8 s with `req 4` held at the balancer before it moves to B.
5. Scope: no server is busy when a request arrives (each server's work and response finish before its next pick); no queue, health signal or load count appears.
6. Clearance: `next` never overlaps a chip or a link label; chips clear the port labels; log cells do not overlap; nothing enters the title band; no chip remains during a hold.
7. Silent reading: with sound off and words ignored, a viewer sees a chip enter the middle box and leave through the left port to the left card, a small marker under the box jump to the right port, a cell fill; then the same toward the right, the marker jumps back; then left again; then a fourth chip waits in the middle box while a fourth cell shows `?`, and goes right; the four cells light in turn.
8. Audio: the dry run lists server arrivals in the order E5, G5, E5, G5, four quiet pointer `ack` D6 cues each after a pick, one quiet `ack` C4 at 29.8 s, and the closing E–G–E–G pattern. Full-decode the encode, confirm an audio stream, peak below −0.5 dBFS and moov before mdat. Record whether audio was heard or only analysed.
9. After encoding run `python3 scripts/check_media.py --concept load-balancing`; a new encode needs renewed comparison review bound to its SHA-256.

## Production boundary

Only this anonymous plan is written. No render, scene source, public media, site, shared skill, Git commit or deployment. Later implementation uses the repository-pinned Puppeteer and a cut-local engine copy, with any drawing extension local to the cut.

