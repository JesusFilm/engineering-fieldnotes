# Lesson 06 — Avoid a failed server — plan B

Independent plan for the motion-v2 cut of load-balancing lesson 06. Authored from the lesson entry in `video/load-balancing/sequence/lessons.json` (item 6) and the concept content in `content/concepts/load-balancing.json`. Earlier motion-v2 beat sheets were read only to vary the geometry. No other plan for this lesson, no production ledger, and no authoring source was consulted. This document names no authoring model.

## Scope

One mechanism: **the balancer only knows a server has failed when a health check says so; after A stops responding, A still reads `eligible` until the next periodic probe gets no reply within its timeout, and only then is A marked unavailable and left out of new routing decisions, so the next request goes to B and returns through the balancer.**

The viewer should feel three things. A visibly breaks while the balancer's table still says `A eligible`: there is a gap between failure and detection. A probe leaves for A, a timeout bar fills, and nothing comes back. Only when that bar is full does `eligible` flip to `unavailable`, and the next request goes to B without touching A.

Grounding: lesson beats ("A stops responding", "the balancer sends a health probe", "the probe times out", "A is excluded from new selection", "a new request routes to B", "B returns its response through the balancer"); intro ("a selection rule also needs to know which servers are eligible. In this example a periodic health probe gets no successful response from A. After its configured timeout, the balancer marks A unavailable and sends new requests to B"); takeaway ("health checks can remove a failed server from new routing decisions after detection. They do not instantly detect every failure or rescue requests already sent"); question and answer ("if A fails just after a successful check, is the failure detected immediately? No. Detection depends on the next checks, their timeouts, and configured thresholds. A request already sent can still fail"). Sources per the concept file, retrieved 2026-10-19: [Envoy — Supported load balancers](https://www.envoyproxy.io/docs/envoy/latest/intro/arch_overview/upstream/load_balancing/load_balancers) (selection among healthy hosts) and [Envoy — Draining](https://www.envoyproxy.io/docs/envoy/latest/intro/arch_overview/operations/draining) (removing a server is a separate, explicit concern).

Out of scope: this is the last lesson in the sequence. The cut does not show A recovering, draining, retries, passive outlier detection, or thresholds of more than one failed check. No request is in flight on A when it fails, so "requests already sent can still fail" is named in the accuracy limits rather than dramatised. The selection rule is shown only as "choose among eligible servers"; round robin and least requests are not re-taught.

Grammar for this cut: **the balancer panel holds a health table (server, status) and a probe timeline with one track per server: past passing checks are green dots at regular intervals, a probe that gets no reply draws a timeout bar on A's track, and A's status cell changes only when that bar completes. Two server cards sit below; probes, requests and responses travel on the links.** The timeline makes "periodic", "timeout" and "detection delay" visible as positions, which none of lessons 01–05 used. Every element is a software object: a balancer, a health table, probes, a timeout window, server processes and requests. No heart monitors, hospital imagery, broken bridges or sirens.

Target length ≈ 44 s at speed 1 (`meta.speed: 1`). Keep the undetected gap (A broken but still `eligible`, ≈ 4.6 s) and the timeout window (≈ 4 s); together they answer the lesson's question.

## Engine notes

Use `box` for the app and server cards (A animates `color` to bad with `s.shake` and a red `x` ripple on failure), `box` for the balancer panel, `label` for table cells and timeline labels, two `bar` tracks with `s.mark` dots for checks, a `bar` segment for the timeout window, `s.wire` for links (linkA turns `dashed` and dim on exclusion), and dots/chips for probes, requests and responses. A probe that gets no reply is a dot that reaches A and fades there. The moving `now` line needs an animated x; if the engine cannot tween it, add a general `cursor` node type in the cut-local engine copy and report it. Use the repository-pinned Puppeteer.

## Stage and coordinates (1080 × 1920)

Palette follows `references/style.md`. Minimum on-screen text 40 px (≈ 13 px at 350 wide); names 48 px; monospace at 40 px ≈ 24 px per character. Content stays within x 90–990 and y 470–1620.

| id | type | centre / bounds | text | notes |
|---|---|---|---|---|
| title | title band (540, 330) / (540, 405) | — | **Load balancing** / AVOID A FAILED SERVER | |
| app | box | (540, 520), 260 × 80 (x 410–670, y 480–560) | `app` 44 px | C5 |
| lb | box | x 90–990, y 610–1140 | label `load balancer` 48 px at (300, 655) | D5 |
| tHead | labels | (200, 730) / (470, 730), 40 px mono, mid | `server` · `status` | |
| tA | labels | (200, 800) / (470, 800) | `A` · `eligible` (ok) → `unavailable` (bad) | status cell 320 × 60 at (470, 800) |
| tB | labels | (200, 870) / (470, 870) | `B` · `eligible` (ok) | |
| tlHead | label | (330, 950), 40 px mono, mid | `health checks` | |
| trackA | bar track | x 260–960 at y 1020; row label `A` at (200, 1020) | — | marks sit just above the track |
| trackB | bar track | x 260–960 at y 1090; row label `B` at (200, 1090) | — | |
| nowLine | thin vertical line | x 260 → 925, y 990–1110 | — | "now"; stops at x 925 when the timeout ends (19.0 s) |
| toBar | bar segment | trackA x 785 → 925 | fills accent, then bad | the timeout window |
| toLab | label | (855, 965), 40 px mono | `timeout` | appears with the unanswered probe |
| linkA / linkB | wires | lb bottom (290, 1140) → srvA top (290, 1260); (790, 1140) → srvB top (790, 1260) | — | linkA dashed and dim after exclusion |
| skipA | label | (190, 1200), 40 px mono, mid | `skipped` | left of linkA; appears when the request goes to B |
| srvA | box | (290, 1340), 380 × 160 (x 100–480, y 1260–1420) | label `server A` 48 px; sublabel 40 px mono `ready` → `no response` (bad) | E5 |
| srvB | box | (790, 1340), 380 × 160 (x 600–980) | label `server B`; sublabel `ready` → `working` → `ready` | G5 |

Timeline mapping: x = 260 + 35 · t for video time t from 0 to 15 s (3 → 365, 9 → 575, 15 → 785). Checks happen at 3.0, 9.0 and 15.0 s. The timeout window runs 15.6–19.0 s and is drawn on trackA from x 785 to 925; the `now` line follows it and stops at x 925 at 19.0 s, then stays there.

Chips: probes are small dots (no text) from each track's current check position down the server's link and back. `req` (≈ 72 px) and `resp` (≈ 96 px) chips travel app → lb → linkB → srvB and back. Check that `timeout` (x ≈ 783–927) clears the marks above trackA (y ≈ 1000), that `skipped` (x ≈ 106–274) clears linkA at x 290, and that the A row's hollow mark at x 785 stays distinct from B's green mark at the same x.

## Sound map

Actor pitches: app **C5**, balancer **D5**, server A **E5**, server B **G5**. A healthy probe round sounds as D6 → E5 and D6 → G5; the missing E5 reply is the cue.

| event | preset | notes |
|---|---|---|
| probe out | `send` D6, quiet | one per server per round |
| probe reply | `ack` E5 / G5 | |
| A fails | `crash` | the loudest event |
| timeout window running | `clock` | four ticks, gaps shortening (1.2, 1.0, 0.8 s) |
| timeout reached | `thump` | |
| A marked unavailable | `poof` quiet | |
| request sent | `send` C6 | |
| balancer chooses B | `arrive` D5 | |
| A skipped | no sound | silence on A's pitch is deliberate |
| B works | `work` G4 ×3 | |
| response through the balancer | `arrive` D5, then `deliver` C5 | |
| final state | `chime` G5, quiet | the only chime |

No music.

## Beat sheet (speed 1)

| time | what moves | state change | sound |
|---|---|---|---|
| **Beat 1 — A stops responding (0–15.0)** | | | |
| 0.0–1.0 | app, balancer, table, timeline, servers fade in | both `eligible`, both `ready`; nowLine at x 260 | — |
| 3.0 | probe round 1: dots to A and B and back; green marks at x 365 on both tracks | | send D6 ×2, ack E5, ack G5 |
| 9.0 | probe round 2; green marks at x 575 | the last successful check of A | send D6 ×2, ack E5, ack G5 |
| 10.4 | srvA snaps red, shakes ±14 px, red `x` ripple; sublabel `no response` | A has failed just after a successful check | crash |
| 11.0 | tA `eligible` pulses, still green | the balancer has not noticed | — |
| 11.0–15.0 | hold; nowLine keeps moving from x 625 to 785 | undetected gap | |
| **Beat 2 — The balancer sends a health probe (15.0–16.0)** | | | |
| 15.0 | probe round 3: dots to A and B | | send D6 ×2 |
| 15.6 | B's dot returns; green mark at x 785 on trackB | | ack G5 |
| 15.6 | A's dot reaches srvA and fades there; hollow ring at x 785 on trackA; `timeout` label and toBar appear | no reply from A | — |
| **Beat 3 — The probe times out (16.0–19.6)** | | | |
| 15.6–19.0 | toBar fills x 785 → 925 in accent; nowLine follows | waiting for A's reply | clock ×4 |
| 19.0 | toBar turns bad; hollow ring becomes a red `×` | timeout | thump |
| 19.0–19.6 | short hold | | |
| **Beat 4 — A is excluded from new selection (19.6–23.0)** | | | |
| 19.6 | tA `eligible` → `unavailable` (bad), cell pulses | | poof (quiet) |
| 20.2 | linkA turns dashed and dim | new requests will not use A | — |
| 20.2–23.0 | hold | | |
| **Beat 5 — A new request routes to B (23.0–31.0)** | | | |
| 23.0–23.8 | chip `req` app → lb | | send C6 |
| 24.2 | tA and tB pulse in turn; tB `eligible` highlighted | only B is eligible | arrive D5 |
| 24.2 | `skipped` appears beside linkA | | — |
| 24.6–25.6 | chip `req` on linkB to srvB | srvB `working` | arrive G5 |
| 25.6–28.6 | srvB works | | work G4 ×3 |
| **Beat 6 — B returns its response through the balancer (28.6–44.0)** | | | |
| 28.6–29.4 | chip `resp` srvB → lb | srvB `ready` | — |
| 29.4 | ripple at lb | | arrive D5 |
| 29.6–30.4 | chip `resp` lb → app | | deliver C5 |
| 31.0 | tA `unavailable`, the red `×` on trackA, and srvB pulse in turn | detected failure; working path through B | chime G5 (quiet) |
| 31.8–42.4 | hold | final state | |
| 42.4–43.2 | `s.fade` to black, 0.8 s | finite ending | — |
| 44.0 | end | | |

## Accuracy limits

- One missed probe marks A unavailable here, as in the lesson's example. Real health checkers usually need several consecutive failures (an unhealthy threshold) and several successes to mark a server healthy again.
- Probe interval and timeout are configuration. The cut shows one interval of about 6 s and a timeout of about 4 s purely for pacing; no real values are implied.
- Detection is not instant: A fails at 10.4 s and is excluded at 19.6 s. Anything sent to A during that gap would still go to A and could fail; the health check does not rescue it. No request is sent in the gap in this cut.
- Some balancers also detect failures from real traffic (passive health checks or outlier detection). Not shown.
- Marking a server unavailable for new requests is different from draining it or retrying requests that were already sent; those need their own configuration.
- Responses return through the balancer, as with a proxy. Some designs return responses by other paths.
- No timing numbers appear on screen.

## Native 350 acceptance

These are requirements for the future render, not completed validation.

1. Decode actual frames (avoid relying only on a contact sheet) at 1080 and at 350 px wide around 1.8, 3.2, 6.0, 9.2, 10.5, 11.2, 13.0, 15.2, 15.8, 17.0, 18.6, 19.1, 19.7, 20.4, 22.0, 23.4, 24.3, 25.0, 26.5, 28.8, 29.5, 30.2, 31.2, 36.0 and 42.8 s. At 350 px, `load balancer`, the table headers, both rows' status text, `health checks`, both track labels, `timeout`, `skipped`, both server names and sublabels and the chips must be readable.
2. Detection gap: from 10.4 to 19.6 s srvA is red while tA reads `eligible`; tA changes only after toBar is full.
3. Periodic checks: green marks on both tracks at x 365 and 575; at x 785 B's mark is green and A's is a hollow ring that becomes a red `×` at 19.0 s.
4. Exclusion: after 19.6 s no probe, request or response travels on linkA; linkA is dashed and dim.
5. Routing: the request at 23.0 s goes only to B; the response returns srvB → lb → app.
6. Scope: no request is in flight on A when it fails; no recovery, drain, retry or second balancer appears.
7. Clearance: `timeout` clears trackA's marks; `skipped` clears linkA; the status cell fits `unavailable` (11 characters ≈ 264 px inside 320 px); nothing enters the title band; no chip remains during a hold.
8. Silent reading: with sound off and words ignored, a viewer sees regular dots marked on two lines; the left server card turns red while the table's top row stays green; a dot goes to the red card and does not return while a bar fills on its line and ends in a red ×; the table's top row turns red and the left link fades; a request goes only to the right card and comes back through the middle panel.
9. Audio: the dry run lists one `crash` at 10.4 s (loudest), probe replies E5 at 3.0 and 9.0 s only, G5 replies at 3.0, 9.0 and 15.6 s, four `clock` ticks in 15.6–19.0 s, one `thump` at 19.0 s, and one quiet `chime`. Full-decode the encode, confirm an audio stream, peak below −0.5 dBFS and moov before mdat. Record whether audio was heard or only analysed.
10. After encoding run `python3 scripts/check_media.py --concept load-balancing`; a new encode needs renewed comparison review bound to its SHA-256.

## Production boundary

Only this anonymous plan is written. No render, scene source, public media, site, shared skill, Git commit or deployment. Later implementation uses the repository-pinned Puppeteer and a cut-local engine copy, with any drawing extension local to the cut.

