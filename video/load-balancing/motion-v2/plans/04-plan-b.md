# Lesson 04 — Unequal work — plan B

Independent plan for the motion-v2 cut of load-balancing lesson 04. Authored from the lesson entry in `video/load-balancing/sequence/lessons.json` (item 4) and the concept content in `content/concepts/load-balancing.json`. Earlier motion-v2 beat sheets were read only to vary the geometry. No other plan for this lesson, no production ledger, and no authoring source was consulted. This document names no authoring model.

## Scope

One mechanism: **round robin balances how many requests each server is given, not how much work each has left; after A gets a slow report and B a quick lookup, both show `assigned 1`, but when B is idle and A is still busy, the rule's next turn is A, so request 3 waits in A's wait slot until the report finishes.**

The viewer should feel three things. Two `assigned` counters read the same while two `work left` bars are very different. B's bar empties and B shows `idle` while A's bar is still long. Request 3 lands in A's wait slot next to an empty B, and only starts when A's bar reaches zero.

Grounding: lesson beats ("some requests take longer", "A receives a slow request", "B receives a quick request", "B is ready while A remains busy", "round robin selects A and request 3 waits", "A finishes and the waiting request starts"); intro ("taking turns balances the number of assigned requests, but requests can take different amounts of work… one running request per server"); takeaway ("equal request counts do not imply equal remaining work. Round robin can choose a busy server even while another is idle"); question and answer ("why does request 3 wait even though B is ready? The round-robin rule selects A next. In this one-slot example A is still working, so the new request waits there"); concept example (a full-tree scan blocks a short lookup while the other worker is idle) and pitfall ("counting requests instead of measuring cost"). Sources per the concept file, retrieved 2026-10-19: [Google SRE — Load balancing in the datacenter](https://sre.google/sre-book/load-balancing-datacenter/) and [Envoy — Supported load balancers](https://www.envoyproxy.io/docs/envoy/latest/intro/arch_overview/upstream/load_balancing/load_balancers).

Out of scope: least requests or any rule that looks at active work, and moving queued work (05); health checks and ineligible servers (06). The cut does not suggest a fix; it ends with the waiting request starting on A. Timing numbers, weights and multiple balancers are not shown.

Grammar for this cut: **a compact round-robin rule strip at the top (two cells, A and B, with a `next` highlight), and below it two tall server columns side by side. Each column stacks a `run` slot, a `wait` slot, an `assigned` counter and a vertical `work left` bar that drains while the server works.** Lesson 03 put the rule's state and a picks log at the centre; here the servers' internal state is the subject, and the counters and bars sit at the same height so the viewer compares "count" against "work" directly. Every element is a software object: a selection rule, server slots, an assignment counter and a remaining-work gauge. No traffic jams, checkout queues or heavy boxes.

Target length ≈ 46 s at speed 1 (`meta.speed: 1`). The slow report must look slow: keep A's bar draining over ≈ 20 s. The wait from 22 to ≈ 32 s is the lesson; do not shorten it.

## Engine notes

Use `box` for the app and rule cells, `box` for each server column frame, `store` (2 rows: `run`, `wait`) per server, `label` for counters and states, `bar` (vertical, drawn rotated or as a tall narrow `bar` with `seg0` as fill) for `work left`, `s.wire` for links, and chips for requests. If the engine has no vertical bar, add a general `vbar` node type in the cut-local engine copy that reads `p('fill')` and report it. Work with the repository-pinned Puppeteer; if chip text renders below 40 px, add a `labelSize` option there.

## Stage and coordinates (1080 × 1920)

Palette follows `references/style.md`. Minimum on-screen text 40 px (≈ 13 px at 350 wide); names 48 px; monospace at 40 px ≈ 24 px per character. Content stays within x 90–990 and y 470–1640.

| id | type | centre / bounds | text | notes |
|---|---|---|---|---|
| title | title band (540, 330) / (540, 405) | — | **Load balancing** / UNEQUAL WORK | |
| app | box | (540, 520), 260 × 80 (x 410–670, y 480–560) | label `app` 44 px | C5 |
| ruleLab | label | (300, 630), 40 px mono, mid | `round robin` | |
| ruleA / ruleB | boxes 120 × 70 | (600, 630) / (740, 630) | `A` / `B` 44 px | the cell holding `next` is outlined accent |
| nextLab | label | under the next cell at y 690, 40 px mono, accent | `next` | moves A ↔ B |
| linkA / linkB | wires | (540, 560) → (290, 760); (540, 560) → (790, 760) | — | |
| colA | outline box | x 90–490, y 760–1620 | label `server A` 48 px at (290, 805) | E5 |
| colB | outline box | x 590–990, y 760–1620 | label `server B` 48 px at (790, 805) | G5 |
| slotsA / slotsB | store, `rows: 2`, w 340 | (290, 935) / (790, 935); rows ≈ 900, 970 | 40 px mono: `run   —` → `run   report` → `run   req 3` · `wait  —` → `wait  req 3` → `wait  —`; B: `run   lookup` → `run   —` | |
| stateA / stateB | label | (290, 1060) / (790, 1060), 40 px mono | `idle` / `busy` (accent) / `idle` | |
| cntA / cntB | label | (290, 1140) / (790, 1140), 40 px mono | `assigned 0` → `1` → `2` | the request count |
| wlLab | labels | (220, 1220) / (720, 1220), 40 px mono, mid | `work left` | |
| barA / barB | vertical bars | x 340–400 (A), x 840–900 (B); y 1240–1580 (340 px tall) | — | fill from bottom; accent while running, empty track otherwise |

Request sizes (illustrative): report fills A's bar to 100 % (340 px) and drains over 21 s; lookup fills B's bar to 20 % (68 px) and drains over 4 s; request 3 fills A's bar to 20 % when it starts.

Chips: `report` (≈ 144 px), `lookup` (≈ 144 px), `req 3` (≈ 120 px) travel app → rule strip → link → column. Check that `nextLab` (y 690) clears chips passing at x 540 and that `work left` labels clear the bars (label ends at x ≈ 328).

## Sound map

Actor pitches: app **C5**, rule **D5**, server A **E5**, server B **G5**. Work ticks an octave below each server, so A's long job is heard as a long run of E4 ticks. Pan: A left (≈ −0.5), B right (≈ +0.5).

| event | preset | notes |
|---|---|---|
| request sent | `send` C6 | |
| rule picks | `arrive` D5; `next` moves with `ack` D6 quiet | |
| request starts | `arrive` E5 / G5 | |
| counter +1 | `store` at the server's pitch | |
| working | `work` E4 / G4 | every 0.8 s while the bar drains |
| finished | `ack` at the server's pitch | |
| response | `deliver` C5, quiet | |
| B idle while A busy | `ack` G4, low and quiet | |
| request 3 queued on A | `thump` | soft; the moment of the lesson |
| waiting request starts | `recover` short, then `arrive` E5 | |

No music. During A's long job only E4 ticks continue; B is silent.

## Beat sheet (speed 1)

| time | what moves | state change | sound |
|---|---|---|---|
| **Beat 1 — Some requests take longer (0–4.0)** | | | |
| 0.0–1.0 | app, rule strip, both columns fade in | both `idle`, `assigned 0`, bars empty; `next` on A | — |
| 1.6 | both columns pulse together | identical servers, one run slot each | ack E5 + G5 |
| 1.6–4.0 | hold | | |
| **Beat 2 — A receives a slow request (4.0–10.0)** | | | |
| 4.0–4.8 | chip `report` app → rule | | send C6 |
| 4.8 | ruleA pulses; chip continues on linkA | | arrive D5 |
| 5.6 | ripple in colA; `run report`; `busy`; `assigned 1`; barA fills to 100 % over 0.6 s | | arrive E5, store E5 |
| 6.2 | `next` moves to B | | ack D6 |
| 6.2–27.2 | barA drains linearly to 0 | | work E4 every 0.8 s |
| 6.2–10.0 | hold | | |
| **Beat 3 — B receives a quick request (10.0–18.0)** | | | |
| 10.0–10.8 | chip `lookup` app → rule | | send C6 |
| 10.8 | ruleB pulses; chip on linkB | | arrive D5 |
| 11.6 | `run lookup`; B `busy`; `assigned 1`; barB to 20 % | | arrive G5, store G5 |
| 12.2 | `next` moves to A | | ack D6 |
| 12.2–16.2 | barB drains to 0 | | work G4 every 0.8 s |
| 16.2 | B `run —`, `idle`; small response dot to app | | ack G5, deliver C5 |
| 16.8 | cntA and cntB pulse together | `assigned 1` and `assigned 1` | — |
| 16.8–18.0 | hold | | |
| **Beat 4 — B is ready while A remains busy (18.0–22.0)** | | | |
| 18.0 | barA and barB pulse in turn | A's bar ≈ 57 % full; B's empty | — |
| 18.8 | stateB `idle` pulses | | ack G4 (quiet) |
| 18.8–22.0 | hold | equal counts, unequal work left | |
| **Beat 5 — Round robin selects A and request 3 waits (22.0–31.0)** | | | |
| 22.0–22.8 | chip `req 3` app → rule | | send C6 |
| 22.8 | ruleA and `next` pulse | the rule's turn is A | arrive D5 |
| 23.6 | chip lands in A's wait row: `wait req 3`; `assigned 2`; A's column jolts 8 px | B stays `idle`, `assigned 1` | thump, store E5 |
| 24.2 | `next` moves to B | | ack D6 |
| 24.8 | B's `run —` and A's `wait req 3` pulse in turn | ready server versus waiting request | — |
| 24.8–27.2 | hold while barA drains | | work E4 continues |
| **Beat 6 — A finishes and the waiting request starts (27.2–46.0)** | | | |
| 27.2 | barA reaches 0; `run report` → `run —`; response dot to app | | ack E5, deliver C5 |
| 27.8 | `req 3` moves from wait row to run row; `wait —`; barA fills to 20 % | | recover (short), arrive E5 |
| 28.4–32.4 | barA drains; A `busy` | | work E4 |
| 32.4 | A `idle`; response dot to app | | ack E5, deliver C5 |
| 33.4 | cntA (`assigned 2`) and cntB (`assigned 1`) pulse; then both bars' tracks pulse empty | counts differ again, but neither said how long the work was | — |
| 34.2–44.6 | hold | final state | |
| 44.6–45.4 | `s.fade` to black, 0.8 s | finite ending | — |
| 46.0 | end | | |

## Accuracy limits

- One running request per server and a one-request wait slot are the lesson's simplification. Real servers run several requests at once and have their own queue limits.
- `work left` is drawn as if the server knew each request's cost in advance. In practice cost is rarely known up front; this gauge exists for the viewer, not for the balancer.
- Round robin here routes to A even though A is busy, because the rule does not look at server state. Some implementations or proxies may refuse or reroute when a server is full; not shown.
- The report, lookup and request 3 durations are illustrative pacing, not a benchmark (the concept's example says the same).
- The cut shows no fix. Least requests and other load-aware rules are lesson 05; they also do not move request 3 once it is waiting on A.
- No timing numbers appear.

## Native 350 acceptance

These are requirements for the future render, not completed validation.

1. Decode actual frames (avoid relying only on a contact sheet) at 1080 and at 350 px wide around 1.8, 3.5, 4.5, 5.0, 5.8, 6.4, 8.0, 10.4, 11.0, 11.8, 12.4, 14.0, 16.3, 17.0, 18.2, 19.0, 21.0, 22.4, 23.0, 23.8, 24.4, 25.0, 26.5, 27.3, 28.0, 30.0, 32.5, 33.6, 38.0 and 45.0 s. At 350 px, `round robin`, `A`, `B`, `next`, both server names, all slot rows, both states, both counters and both `work left` labels must be readable.
2. Equal counts, unequal work: between 16.8 and 23.6 s both counters read `assigned 1` while barA is visibly non-empty and barB is empty.
3. The wait: request 3 is in A's wait row from 23.6 to 27.8 s while B reads `idle` and `run —`; request 3 never touches B.
4. Order: request 3 enters A's run row only after barA reaches 0 and `run report` clears.
5. Rule state: `next` is on A when request 3 arrives at the rule; it moved there after the lookup was picked.
6. Scope: nothing compares active counts or moves a request between servers; no health signal; no fix is shown.
7. Clearance: chips clear `next` and the column labels; bar fills stay inside their tracks; text stays inside columns; nothing enters the title band; no chip remains during a hold.
8. Silent reading: with sound off and words ignored, a viewer sees a long bar fill on the left and slowly drain; a short bar on the right fills and quickly empties; two equal counters light together; a new chip goes left and stops in a second row below the busy one while the right column stays empty; the left bar runs out, and the waiting chip moves up and starts.
9. Audio: the dry run lists continuous E4 ticks from 6.2 to 27.2 s, G4 ticks only during 12.2–16.2 s, one `thump` at 23.6 s, and a short `recover` at 27.8 s. Full-decode the encode, confirm an audio stream, peak below −0.5 dBFS and moov before mdat. Record whether audio was heard or only analysed.
10. After encoding run `python3 scripts/check_media.py --concept load-balancing`; a new encode needs renewed comparison review bound to its SHA-256.

## Production boundary

Only this anonymous plan is written. No render, scene source, public media, site, shared skill, Git commit or deployment. Later implementation uses the repository-pinned Puppeteer and a cut-local engine copy, with any drawing extension local to the cut.

