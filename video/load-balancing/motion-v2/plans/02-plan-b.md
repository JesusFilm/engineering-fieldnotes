# Lesson 02 — Share the work — plan B

Independent plan for the motion-v2 cut of load-balancing lesson 02. Authored from the lesson entry in `video/load-balancing/sequence/lessons.json` (item 2) and the concept content in `content/concepts/load-balancing.json`. Earlier motion-v2 beat sheets were read only to vary the geometry. No other plan for this lesson, no production ledger, and no authoring source was consulted. This document names no authoring model.

## Scope

One mechanism: **two servers run the same service, each with one work slot; while server A is busy with request 1, request 2 can start on server B, so two separate requests run at the same time, but each one still takes its own full processing time.**

The viewer should feel three things. Request 2 starts on B while A's slot is still full, so the two timeline bars overlap. The two bars are the same length, so neither request got faster. At the end a third request appears with two possible destinations and a `?`, so the viewer notices that something still has to choose a server.

Grounding: lesson beats ("two servers can run the same service", "the first request starts on server A", "a second request starts on server B while A works", "both finish independently", "separate requests use separate capacity"); lesson intro ("a server has finite capacity. A second server can run the same service, so separate requests can be handled at the same time. This simplified example gives each server one work slot"); takeaway ("more servers can provide more capacity when requests can be handled independently. Someone still needs to choose a server"); question and answer ("does adding a second server make one request run twice as fast? No. Here it lets two separate requests run at once. Each request still takes its own processing time"); concept overview ("a load balancer selects a backend: one service instance able to handle a request"). The concept's sources concern balancing policies, which this lesson does not reach.

Out of scope (later lessons): a load balancer, selection rules and round robin (03); unequal request costs and waiting behind a busy server (04); least requests (05); health checks (06). How request 1 reaches A and request 2 reaches B is not explained; the routes are simply given, and the final `?` hands the question to lesson 03. Queues, connection reuse and timing numbers are not shown.

Grammar for this cut: **one app at the top, two identical server cards side by side, each with a single slot that fills like a progress bar, and a two-row timeline below where each request's bar grows on its server's row while it runs.** The timeline is what answers the lesson's question: overlapping bars mean "at the same time", equal lengths mean "not faster". This builds on lesson 01's app/server vocabulary while adding a second actor and a time view. Every element is a software object: an application, service instances, work slots, requests, responses and a timeline. No checkout lanes, cashiers, highways or extra-hands metaphors.

Target length ≈ 40 s at speed 1 (`meta.speed: 1`). The two requests overlap for ≈ 4.5 s of video; do not shorten processing to save time, because equal, unhurried bars carry the answer. If stills read fast, lengthen the hold after both finish.

## Engine notes

Use `box` for the app, `store` (2 rows, `row1Fill` for the slot's progress) for each server, `bar` nodes (one per request, positioned on its row) or a `bar` per row with two segments (an empty lead segment plus the request) for the timeline, `label` for names, slot text, row names and `?`, `s.wire` for app–server links and the dashed `req 3` options, and chips for requests and responses. A moving playhead is optional; if used and `x` cannot be animated, add a general `cursor` node type in the cut-local engine copy and report it. Work with the repository-pinned Puppeteer; if chip text renders below 40 px, add a `labelSize` option there.

## Stage and coordinates (1080 × 1920)

Palette follows `references/style.md`. Minimum on-screen text 40 px (≈ 13 px at 350 wide); names 48 px; monospace at 40 px ≈ 24 px per character. Content stays within x 90–990 and y 480–1460.

| id | type | centre / bounds | text | notes |
|---|---|---|---|---|
| title | title band (540, 330) / (540, 405) | — | **Load balancing** / SHARE THE WORK | |
| app | box | (540, 560), 360 × 100 (x 360–720, y 510–610) | label `app` 48 px | C5 |
| linkA | wire | app bottom-left [480, 610] → [290, 750] | — | |
| linkB | wire | app bottom-right [600, 610] → [790, 750] | — | |
| labA | label | (290, 775), 48 px | `server A` | E5 |
| srvA | store, `rows: 2`, w 400 | (290, 875), x 90–490, y ≈ 810–940; row centres ≈ 842, 908 | rows 40 px mono: `profile service` · `slot  free` → `slot  req 1` → `slot  free` | row1 fill 0 → 1 while busy |
| labB | label | (790, 775), 48 px | `server B` | G5 |
| srvB | store, `rows: 2`, w 400 | (790, 875), x 590–990 | `profile service` · `slot  free` → `slot  req 2` → `slot  free` | |
| tlPanel | outline box | x 90–990, y 1060–1400 | — | timeline |
| rowA | label | (150, 1180), 40 px mono | `A` | |
| rowB | label | (150, 1290), 40 px mono | `B` | |
| track | wires | y 1180 and 1290, x 220–960 | — | dim tracks |
| bar1 | bar, h 48 | row A, x 220 → 655 | label `req 1` inside (40 px mono, dark text) | grows 7.0–17.0 s |
| bar2 | bar, h 48 | row B, x 459 → 894 | label `req 2` inside | grows 12.5–22.5 s |
| overlap | translucent band | x 459–655, y 1140–1330 | — | hidden until beat 5 |
| req3 | chip (static) | (540, 680), ≈ 120 px | `req 3` | hidden until beat 5 |
| opt3A / opt3B | dashed wires | req3 → [330, 750]; req3 → [750, 750] | — | the two possible destinations |
| q3 | label | (540, 735), 44 px, mid | `?` | |

Timeline scale: x = 220 + 43.5 · (t − 7.0) for video time t from 7.0 to 24.0 s. Both bars are 435 px long (10 s of video). No axis numbers are drawn.

Chips: `req 1` and `req 2` (≈ 120 px) travel app → server; `resp 1` and `resp 2` (≈ 144 px) travel server → app on the same links. Check that chips on linkA and linkB never overlap the `server A` / `server B` labels and that `req 3`'s dashed options do not cross the server labels (they end at y 750, above the labels at y ≈ 751–799; shorten to y 735 if they touch).

## Sound map

Actor pitches: app **C5**, server A **E5**, server B **G5**. Work ticks an octave below each server (E4, G4), so the overlap is audible as two interleaved pitches. Pan: A left (≈ −0.5), B right (≈ +0.5), app centre.

| event | preset | notes |
|---|---|---|
| server introduced | `ack` at its pitch | |
| same service shown | `ack` E5 + G5 together | |
| request sent | `send` C6 | |
| request starts on a server | `arrive` at the server's pitch | |
| server working | `work` E4 / G4 | every 0.8 s while its slot is busy; A and B ticks offset by 0.4 s |
| request finishes | `ack` at the server's pitch | |
| response reaches app | `deliver` C5 | |
| equal lengths compared | `ack` E5, then `ack` G5, same gain | |
| overlap shown | `chime` C5 | the only chime |
| `req 3 ?` | `ack` C4, quiet | |

No music; silence during holds.

## Beat sheet (speed 1)

| time | what moves | state change | sound |
|---|---|---|---|
| **Beat 1 — Two servers can run the same service (0–6.0)** | | | |
| 0.0–1.0 | app, servers, links and empty timeline fade in | both slots `free` | — |
| 1.5 | srvA pulses | `server A` | ack E5 |
| 2.3 | srvB pulses | `server B` | ack G5 |
| 3.1 | both `profile service` rows pulse together | same service | ack E5 + G5 |
| 3.1–6.0 | hold | | |
| **Beat 2 — The first request starts on server A (6.0–11.5)** | | | |
| 6.0–7.0 | chip `req 1` on linkA | — | send C6 |
| 7.0 | ripple at srvA; row1 → `slot  req 1` (accent) | A's only slot is busy | arrive E5 |
| 7.0–17.0 | srvA row1 fill 0 → 1; bar1 grows on row A | | work E4 every 0.8 s |
| 7.0–11.5 | hold on one running request | B is idle | |
| **Beat 3 — A second request starts on server B while A works (11.5–17.0)** | | | |
| 11.5–12.5 | chip `req 2` on linkB | — | send C6 |
| 12.5 | ripple at srvB; row1 → `slot  req 2` | both slots busy | arrive G5 |
| 12.5–22.5 | srvB row1 fill 0 → 1; bar2 grows on row B | | work G4 every 0.8 s, offset from A |
| 12.5–17.0 | both bars grow together | two requests run at once | |
| **Beat 4 — Both finish independently (17.0–24.0)** | | | |
| 17.0 | bar1 stops at x 655; srvA row1 → `slot  free`; srvA pulses ok | | ack E5 |
| 17.0–18.0 | chip `resp 1` on linkA, up | — | — |
| 18.0 | ripple at app | | deliver C5 |
| 22.5 | bar2 stops at x 894; srvB row1 → `slot  free`; srvB pulses ok | | ack G5 |
| 22.5–23.5 | chip `resp 2` on linkB, up | — | — |
| 23.5 | ripple at app | | deliver C5 |
| **Beat 5 — Separate requests use separate capacity (24.0–40.0)** | | | |
| 24.5 | bar1 pulses, then bar2 pulses (0.6 s apart) | same length: neither got faster | ack E5, ack G5 |
| 26.0 | overlap band fades in over x 459–655 | the time both ran at once | chime C5 |
| 27.4 | overlap band fades to 30 % and stays | | — |
| 29.0 | `req 3` chip appears at (540, 680); opt3A and opt3B draw dashed; `?` pops | someone still has to choose | ack C4 (quiet) |
| 29.6–38.0 | hold | final state | |
| 38.0–38.8 | `s.fade` to black, 0.8 s | finite ending | — |
| 40.0 | end | | |

## Accuracy limits

- One work slot per server is the lesson's stated simplification. Real servers usually run several requests at once, up to their own limits.
- Both requests take the same illustrative time. Real requests vary (lesson 04).
- Capacity grows only if requests are independent. If both servers depend on one shared resource (a database, a lock), that resource can still limit the pair; this is not drawn.
- The routes (`req 1` to A, `req 2` to B) are given, not chosen. Selection is lesson 03; the `req 3 ?` ending only raises the question.
- A second server does not make one request faster: the bars are equal by design, and the cut shows no speedup.
- Network transit is kept short and is not the subject. No timing numbers are shown.

## Native 350 acceptance

These are requirements for the future render, not completed validation.

1. Decode actual frames (avoid relying only on a contact sheet) at 1080 and at 350 px wide around 1.8, 2.6, 3.4, 5.0, 6.5, 7.2, 9.0, 11.0, 12.0, 12.7, 14.5, 16.8, 17.2, 17.6, 18.2, 20.0, 22.4, 22.7, 23.6, 24.7, 25.3, 26.2, 28.0, 29.2, 33.0 and 38.4 s. At 350 px, `app`, both server names, all four server rows, `A`, `B`, `req 1`, `req 2`, the chips, `req 3` and `?` must be readable.
2. Concurrency: between 12.5 and 17.0 s both slots read `req …` and both bars grow; B's slot is `free` before 12.5 s although A is busy.
3. Equal work: bar1 and bar2 are both 435 px when closed; any frame where one closed bar is shorter fails.
4. Independence: bar1 stops at 17.0 s while bar2 keeps growing; resp 1 reaches the app before resp 2 leaves B.
5. Scope: no balancer box, queue, selection rule or health signal appears; `req 3` does not move to either server.
6. Clearance: chips stay on their links and clear the server labels; bar labels sit inside bars with readable contrast; the overlap band does not hide bar labels; nothing enters the title band; no chip remains during a hold.
7. Silent reading: with sound off and words ignored, a viewer sees two identical cards; one card's slot fills while a bar grows on its row; a moment later the other card's slot fills and a second bar grows on the second row; the first bar stops and a message returns, then the second; the two bars light as equal in turn, their shared time span is shaded, and a new chip appears with dashed lines to both cards and a `?`.
8. Audio: the dry run lists `work` E4 ticks from 7.0 to 17.0 s and `work` G4 ticks from 12.5 to 22.5 s, interleaved only during 12.5–17.0 s; one `chime` at 26.0 s; two `deliver` C5; and no other chime. Full-decode the encode, confirm an audio stream, peak below −0.5 dBFS and moov before mdat. Record whether audio was heard or only analysed.
9. After encoding run `python3 scripts/check_media.py --concept load-balancing`; a new encode needs renewed comparison review bound to its SHA-256.

## Production boundary

Only this anonymous plan is written. No render, scene source, public media, site, shared skill, Git commit or deployment. Later implementation uses the repository-pinned Puppeteer and a cut-local engine copy, with any drawing extension local to the cut.

