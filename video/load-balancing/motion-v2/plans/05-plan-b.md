# Lesson 05 — Look at active work — plan B

Independent plan for the motion-v2 cut of load-balancing lesson 05. Authored from the lesson entry in `video/load-balancing/sequence/lessons.json` (item 5) and the concept content in `content/concepts/load-balancing.json`. Earlier motion-v2 beat sheets were read only to vary the geometry. No other plan for this lesson, no production ledger, and no authoring source was consulted. This document names no authoring model.

## Scope

One mechanism: **with least requests, the balancer keeps a count of requests still in progress on each server, compares those counts when a new request arrives, and sends it to the server with fewer; the long request already running on A stays on A, and only the new request goes to B.**

The viewer should feel three things. The balancer's `active` table reads A `1`, B `0`, and both cells are compared before the new request moves. The new request goes to B, and B's count rises to `1` while A's request does not move at all. B's count falls back to `0` when it finishes while A's `1` never changes.

Grounding: lesson beats ("A has one active request; B has none", "compare current active counts", "the new request goes to B", "B finishes while A continues", "selection changes new assignments only"); intro ("least requests: choose a server with fewer requests still in progress… counts are useful signals, not perfect measurements of cost"); takeaway ("least requests uses current active-request counts when choosing where new work goes. It does not move existing work"); question and answer ("does choosing B move the long-running request away from A? No. A keeps its existing request. Only the new request goes to B"); concept walkthrough step 3 ("routing new work does not migrate existing work") and judgement ("outstanding-request counts can still misrepresent capacity… Envoy's equal-weight least-request policy samples candidates rather than necessarily scanning every host"). Sources per the concept file, retrieved 2026-10-19: [Envoy — Supported load balancers](https://www.envoyproxy.io/docs/envoy/latest/intro/arch_overview/upstream/load_balancing/load_balancers) and [Google SRE — Load balancing in the datacenter](https://sre.google/sre-book/load-balancing-datacenter/).

Out of scope: health checks, timeouts and ineligible servers (06). The cut does not replay lesson 04's queued request; it starts from "A has one long request, B has none", as the lesson intro states. No sampling (two candidates only), weights, request cost gauges or timing numbers.

Grammar for this cut: **the balancer is the centre of the frame: a panel with the rule name and an `active` table (one row per server, a count cell each), and a compare step that outlines both counts and marks the smaller with `fewer`. Below it, two horizontal server lanes (A above B), each with a run slot and a thin line linking the slot to its count row, so a count changes exactly when work starts or finishes on that lane.** Lesson 04 used tall server columns with a `work left` gauge; here there is deliberately no cost gauge, because the rule only sees counts. Every element is a software object: a balancer, an active-request table, server run slots and requests. No scales, seesaws or weighing metaphors.

Target length ≈ 42 s at speed 1 (`meta.speed: 1`). Keep the compare step slow enough to read (≈ 2 s) and the "A keeps its request" check visible (≈ 3 s).

## Engine notes

Use `box` for the app, `box` for the balancer panel, `label` (or `store` rows) for the table, `box` outlines for count cells with `label` values, `box` for lanes and run slots, `s.wire` for links and count-to-lane lines, `bar` for in-slot progress (A's never completes; B's completes), and chips for requests. Use `s.ripple` with `mark: 'check'` for the "stays" confirmation on A. No new node type is expected. Work in a cut-local engine copy with the repository-pinned Puppeteer.

## Stage and coordinates (1080 × 1920)

Palette follows `references/style.md`. Minimum on-screen text 40 px (≈ 13 px at 350 wide); names 48 px; monospace at 40 px ≈ 24 px per character. Content stays within x 90–990 and y 470–1600.

| id | type | centre / bounds | text | notes |
|---|---|---|---|---|
| title | title band (540, 330) / (540, 405) | — | **Load balancing** / LOOK AT ACTIVE WORK | |
| app | box | (540, 520), 260 × 80 (x 410–670, y 480–560) | `app` 44 px | C5 |
| lb | box | x 140–940, y 620–1000 | label `load balancer` 48 px at (340, 670); sublabel `least requests` 40 px mono at (340, 725) | D5 |
| tHead | labels | (300, 800) / (620, 800), 40 px mono, mid | `server` · `active` | |
| tRowA | labels | (300, 870) / (620, 870) | `A` · count cell `1` | cell box 110 × 64 at (620, 870) |
| tRowB | labels | (300, 940) / (620, 940) | `B` · count cell `0` | cell at (620, 940) |
| fewer | label | (790, 940) or (790, 870), 40 px mono, ok | `fewer` | appears during compare beside the smaller count |
| laneA | box | x 140–990, y 1120–1280 | label `server A` 48 px at (270, 1160) | E5 |
| slotA | box | x 400–960, y 1150–1250 | `report` 40 px mono at (520, 1200); progress bar inside, y 1235 | the existing long request |
| laneB | box | x 140–990, y 1340–1500 | label `server B` 48 px at (270, 1380) | G5 |
| slotB | box | x 400–960, y 1370–1470 | `—` → `req 2` → `—` | |
| cntLineA | wire | count cell A right (675, 870) → (970, 870) → (970, 1120) | dim | ties the count to lane A |
| cntLineB | wire | count cell B right (675, 940) → (1010, 940) → (1010, 1340) | dim | |
| inLink | wire | app (540, 560) → lb top (540, 620) | — | |
| outA | wire | lb bottom (450, 1000) → laneA top (450, 1120) | — | carries nothing in this cut; pulses in beat 5 |
| outB | wire | lb bottom-left (160, 1000) → (110, 1000) → (110, 1310) → (400, 1310) → slotB top (400, 1370) | — | runs outside lane A along the left edge, then into lane B |
| stays | label | (680, 1105), 40 px mono, ok | `stays on A` | appears in beat 5 with a check ripple at slotA |

Chips: `req 2` (≈ 120 px) travels app → lb → outB → slotB. outB's vertical run at x 110 sits 30 px outside lane A's left edge (x 140); on that segment the chip may shrink to a dot so its text does not cross lane A's border. `server A` (x ≈ 166–374) stays clear of the route. `fewer` must not overlap the count-line wires (start the lines at x 680 and place `fewer` at x 790 above/below the line by ≥ 12 px, or move lines to start after `fewer`).

## Sound map

Actor pitches: app **C5**, balancer **D5**, server A **E5**, server B **G5**. A's long request keeps a slow E4 tick (every 1.2 s) throughout; B's request ticks G4 every 0.6 s while it runs. Pan: A left (≈ −0.4), B right (≈ +0.4).

| event | preset | notes |
|---|---|---|
| A running (background) | `work` E4, quiet, every 1.2 s | continues to the end |
| request sent | `send` C6 | |
| balancer receives | `arrive` D5 | |
| compare A / compare B | `ack` E5, then `ack` G5 | reads each count in turn |
| smaller chosen | `hit` G5 | the decision |
| B starts | `arrive` G5; count +1 `store` G5 | |
| B finishes | `ack` G5; count −1 `poof` quiet; `deliver` C5 | |
| A keeps its request | `chime` E5, quiet | the only chime |

No music.

## Beat sheet (speed 1)

| time | what moves | state change | sound |
|---|---|---|---|
| **Beat 1 — A has one active request; B has none (0–8.0)** | | | |
| 0.0–1.0 | app, balancer, table, lanes fade in | slotA `report` with a partly filled bar; slotB `—`; counts A `1`, B `0` | — |
| 1.0– | slotA bar advances slowly and never completes | | work E4 every 1.2 s |
| 2.0 | slotA and count cell A pulse together (cntLineA lights) | one request in progress on A | ack E5 |
| 3.2 | slotB and count cell B pulse together | none on B | ack G5 |
| 3.2–8.0 | hold | | |
| **Beat 2 — Compare current active counts (8.0–14.0)** | | | |
| 8.0–8.8 | chip `req 2` app → lb; stops beside the table at (800, 760) | | send C6, arrive D5 |
| 9.6 | count cell A outlined | `1` | ack E5 |
| 10.4 | count cell B outlined | `0` | ack G5 |
| 11.2 | `fewer` pops beside B's cell; B's row tints ok | the decision | hit G5 |
| 11.2–14.0 | hold | | |
| **Beat 3 — The new request goes to B (14.0–21.2)** | | | |
| 14.0–15.2 | chip `req 2` travels outB (down the left edge) to slotB | | — |
| 15.2 | ripple at slotB; slotB `req 2`; B count `0` → `1`; `fewer` fades | | arrive G5, store G5 |
| 15.8 | both count cells pulse | A `1`, B `1` | — |
| 15.2–21.2 | slotB bar fills 0 → 1 | | work G4 every 0.6 s |
| 15.8–21.2 | slotA unchanged, still advancing slowly | | |
| **Beat 4 — B finishes while A continues (21.2–29.0)** | | | |
| 21.2 | slotB bar complete; `req 2` → `—`; B count `1` → `0`; response dot to app | | ack G5, poof (quiet), deliver C5 |
| 23.0 | count A `1` pulses; slotA `report` pulses | A still working | ack E5 |
| 23.0–29.0 | hold; slotA keeps advancing | | |
| **Beat 5 — Selection changes new assignments only (29.0–42.0)** | | | |
| 29.0 | `stays on A` appears; check ripple at slotA | A kept its existing request | chime E5 (quiet) |
| 30.2 | outA link pulses (never carried anything from A to B); no line ever connects slotA to slotB | | — |
| 31.0 | count cells A `1`, B `0` and their lane lines pulse in turn | counts guide new work only | ack E5, ack G5 |
| 31.0–40.6 | hold | final state; A still working | |
| 40.6–41.4 | `s.fade` to black, 0.8 s | finite ending | — |
| 42.0 | end | | |

## Accuracy limits

- With two servers, "fewer active requests" is a direct comparison. Envoy's equal-weight least-request policy samples a small number of candidates and picks the one with fewer active requests; it does not necessarily scan every host.
- An active count says how many requests are in progress, not how much work each has left. A single request on A may be short or long; the count would read the same. Not shown as a gauge, deliberately.
- Counts can mislead: other clients, very fast errors and other balancer instances can make a low count look like spare capacity (Google SRE). Not drawn.
- Ties (both counts equal) are broken by the implementation; this cut avoids ties at decision time.
- Already-running work is never moved by the routing rule. Moving work would require cancelling and retrying it, which needs separate retry safety; not shown.
- Durations are illustrative; no timing numbers appear.

## Native 350 acceptance

These are requirements for the future render, not completed validation.

1. Decode actual frames (avoid relying only on a contact sheet) at 1080 and at 350 px wide around 1.8, 2.2, 3.4, 6.0, 8.4, 9.0, 9.8, 10.6, 11.4, 13.0, 14.6, 15.4, 16.0, 18.0, 21.4, 22.0, 23.2, 26.0, 29.2, 30.4, 31.2, 31.8, 36.0 and 41.0 s. At 350 px, `load balancer`, `least requests`, the table headers, both counts, `fewer`, both server names, slot text and `stays on A` must be readable.
2. Decision before motion: `req 2` waits beside the table until both counts are outlined and `fewer` marks B; only then does it travel to B.
3. Counts track work: B's count becomes `1` exactly when `req 2` lands in slotB and `0` exactly when it completes; A's count reads `1` in every frame.
4. No migration: `report` never leaves slotA; no chip, dot or line ever travels between slotA and slotB.
5. Scope: no health signal, timeout, cost gauge, sampling or tie appears.
6. Clearance: the outB route clears `server A`; `fewer` clears the count lines; text stays inside lanes and the balancer panel; nothing enters the title band; no chip remains during a hold.
7. Silent reading: with sound off and words ignored, a viewer sees a top panel with two numbers (1 and 0) and a lower lane already busy; a new chip stops beside the numbers, both are outlined, a word appears beside the 0; the chip travels to the empty lane, which fills and then empties while its number goes 0 → 1 → 0; the busy lane never changes and gets a check.
8. Audio: the dry run lists E4 ticks throughout, G4 ticks only during 15.2–21.2 s, one `hit` at 11.2 s, one quiet `chime` at 29.0 s. Full-decode the encode, confirm an audio stream, peak below −0.5 dBFS and moov before mdat. Record whether audio was heard or only analysed.
9. After encoding run `python3 scripts/check_media.py --concept load-balancing`; a new encode needs renewed comparison review bound to its SHA-256.

## Production boundary

Only this anonymous plan is written. No render, scene source, public media, site, shared skill, Git commit or deployment. Later implementation uses the repository-pinned Puppeteer and a cut-local engine copy, with any drawing extension local to the cut.

