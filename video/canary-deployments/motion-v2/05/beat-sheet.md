# Canary deployments 05: Abort and verify recovery (motion-v2)

## Mechanism

The candidate fails its release check, so expansion stops. The router's target changes, and new requests go only to the v1 control once that routing is observed. The service is called OK only after a fresh observed window meets criteria that were stated before the window ran. Rerouting does not cancel the request already running on v2, does not undo the rows v2 wrote, and does not establish v1/v2 schema compatibility. The data question stays open at the end. All values are illustrative, and the five-minute window is time-compressed.

## Stage

One persistent 1080×1920 routing stage. The check card sits at the top, the v2-share step bar below it, then clients → router (two ports) → the v1 control and v2 candidate racks, with the shared DB at the bottom. Requests enter horizontally from the left. Wires run from each rack's side to the DB. The top card changes meaning in place: `Release check` → dashed `Healthy?` → solid `Service OK`.

## Beat sheet (speed 1, 40.5 s)

| Time | What moves | State change | Sound |
|---|---|---|---|
| 0.0–3.4 | Traffic at about 90/10. Rows `v2 export errors 40/100` and `v1 export errors 0/900` appear; v1 gets a ✓, v2 gets a × with a jolt, then the `FAIL` stamp pops | Card border turns red; v2 label → `v2 failed check` (racks stay alive, no crash ×) | Rows A5 arrive; ✓ ack A5; × thump G4; FAIL custom `fail` (noise + falling G4 sweep, no sub thump), the loudest event |
| 3.4–5.4 | Hold; v1 traffic continues | — | v1 arrivals C5 |
| 4.7–5.9 | `next` chevron reaches 25% and turns red; a strike crosses 25% and 50%; `HOLD` pops at 10% | Expansion stopped; share still 10% | `latch`, two dull router clicks (E5) |
| 5.9–7.4 | One more amber request reaches v2 | Stopping expansion is not zero traffic | v2 arrival G4 |
| 7.25–8.35 | An amber request already admitted travels to v2 | Becomes `in flight: 1` | v2 arrival G4 |
| 7.7–9.6 | Router shows `target: v2 0%`, then pulses `applying…`; the share segment drains over 1.2 s | Target is distinct from observation | `route` glide E6→E4 |
| 9.8–12.7 | Router shows `observed: new → v1`; v2 port dims; `new: 0` under v2; three new requests all go to v1 | Observed routing; v2 keeps working its in-flight request | ack E5; v1 C5 arrivals; v2 work ticks G4 at 9.1/10.1/11.1 |
| 12.2–13.1 | In-flight work finishes on v2 (`1 finished`) and writes a row: DB `v2 writes 11 → 12` | Not cancelled; the write lands after the reroute | store D5 |
| 14.6–16.6 | Card clears into a dashed grey `Healthy?` | Abort marked as an assumption | `query` A4→B4 (unresolved) |
| 16.6–21.6 | Fresh window opens (`fresh 0/5 min`); rows show criteria with pending amber dashes; the strip fills with ticks `1/5`…`5/5` while v1 serves traffic | Pending means no result yet (never zero) | work A4; clock A5 ×5; quiet v1 C5 arrivals |
| 22.3 / 23.8 / 25.3 | `0/10,000` (need 0), `1,000/1,000` (need all), `180 ms` (need ≤ 250 ms) land with ✓, about 1.5 s apart | Evidence from the completed window | ack A5 / C♯6 / E6 rising |
| 26.85–28.6 | Header → solid teal `Service OK` · `observed 5 min`; v2 remains `failed check` | Service conclusion earned by observation only | chime A5 (two notes) |
| 28.6–30.4 | Router, step bar and clients dim; `1 finished` pulses amber | In-flight work was not cancelled | two work ticks G4 |
| 30.6 | DB border and v2 wire turn amber; row `12 · kept` | Completed writes remain | arrive D5 (no `store`: nothing new is written) |
| 32.2–33.2 | v1 sends a read along the left wire to the DB; row `v1 ↔ v2 schema · unverified ?` | Compatibility not established by rerouting | send C6; soft thump D4 |
| 34.9 | Row becomes `12 · repair?`; DB border turns dashed | Data needs a separate decision | low deliver D4, deliberately unresolved |
| 36.0–39.3 | Hold the split verdict: teal service card above, amber dashed DB below; two quiet v1 requests | Final state | v1 C5 arrivals |
| 39.3–40.5 | Stage fades; the title stays | Finite ending | none |

## A/B choices (neutral record)

The two plans are called A and B. These choices combine them; neither is ranked.

- **Composition:** B's single persistent stage (check card top, routing middle, data bottom) with left-entry requests. A's three separate compositions were not used. A's stacked limitation cards were folded into the DB panel rows and the v2 status lines.
- **Assumption → evidence:** B's dashed `Healthy?` styling, applied to the whole top card so it stays dashed until the evidence lands. A's `Service checks pass` / `Observed: 5 min` wording was kept as `Service OK` + `observed 5 min`, with no blanket "Recovered" banner.
- **Routing:** A's target-versus-observed distinction (`target: v2 0%` → `applying…` → `observed: new → v1`) combined with B's 1.2 s share drain and in-flight dot.
- **Stop is not zero:** B's extra v2 request after `HOLD`.
- **Evidence:** A's criteria and fixture values (`0/10,000`, `1,000/1,000`, latency 95% at 180 ms against ≤ 250 ms), with criterion-first rows and amber pending dashes from A. Rows land one at a time after the window completes.
- **Limits:** A's three limits (work not cancelled, write remains, schema unverified), including A's v1 read ending at a `?`. B's `REPAIR?` tag and dashed amber data styling. Added: the in-flight request writes the 12th row after the reroute, linking the first two limits causally.
- **Sound:** A's actor pitch families (router E5, v2 G4, check card A, data D) with v1 at C5. B's custom `fail`, `latch` and unresolved `query` sounds, and B's rising ack sequence (pitched in A major here). Neither plan's exact durations were kept: the total is 40.5 s.

## Accuracy boundaries

The values are illustrative fixtures. The five-minute window is compressed into about 4 s. One clean window supports only the depicted service checks. It is no universal safety claim, and it says nothing about data integrity. No real deployment, router, or tooling is shown or implied. Real routers may converge at different times and may treat in-flight requests differently. The video shows one request finishing on v2 as a semantic limit of rerouting.
