# Load balancing — fable cut: "a request counter is not a work counter"

**Learning objective.** An engineering team that puts a pool of model workers (or any replicas) behind a balancer should be able to say, after one watch: round robin equalises *request counts*; when request costs differ widely, as they do for agent traffic (a 2k-token tool call next to a 60k-token planning turn), equal counts leave one replica saturated while another sits idle. Routing on a live load signal, here the number of requests in flight on each replica, sends the next request where the count is lowest, and that is the "least-loaded round robin" policy described in the Google SRE book.

**Mechanism shown.** The balancer keeps a per-replica in-flight counter (arrive +1, complete −1). Under round robin the pointer ignores the counters; under least in-flight it picks the lowest counter and only falls back to rotation to break ties. The scenario is illustrative: token counts stand in for cost and do not promise proportional runtime, and the counter is a proxy for load (see evidence.md for the SRE book's own caveat).

**Actors.** Client laptop; Balancer box with three ports, a chevron pointer and a policy label; Replica 1/2/3 racks (three slots each, one slot per request in flight); an "n in flight" counter badge under each replica; a response-time badge beside the client. Pitches: Replica 1 = C5, Replica 2 = E5, Replica 3 = G5 (arrivals) and C6/E6/G6 (completions); sends tick at C6 (small) or A5 (heavy); fast delivery C6, delayed delivery C4, heavy delivery G4.

| Time (s) | What moves | State change | Sound |
|---|---|---|---|
| 0.0–0.6 | Stage fades in under the title | veil 1 → 0 | — |
| 0.7–5.7 | **Beat 1, normal.** Three `2k tokens` chips leave the client 1.1 s apart; pointer steps port 1 → 2 → 3; each chip lands on its replica, the slot works 0.6 s, a green envelope returns | counters 0→1→0 in turn; slot busy → done → idle; badge `180 ms` green ×3 | send C6; arrive C5 / E5 / G5 (2.0, 3.1, 4.2); ack C6/E6/G6; deliver C6 (3.5, 4.6, 5.7) |
| 7.3–12.0 | **Beat 2, problem starts.** `60k tokens` (orange) → Replica 1 at 8.6; `60k tokens` → Replica 2 at 9.4; `2k tokens` → Replica 3 at 10.5, done 11.1, `180 ms` at 12.0. At 11.4 all three counters pop together | Replica 1 and 2 slots fill slowly (6 s bars); counters read **1, 1, 0** from 11.1: equal request counts, unequal work | send A5/A5/C6 with a dull E4 tick at each rotation pick; arrive C5, E5, G5; work ticks every 0.5 s under each heavy slot; ack G6; deliver C6; C6–E6–G6 chord at 11.4 |
| 12.2–13.5 | **Misroute.** Next `2k tokens` leaves; the round-robin pointer moves to port 1 (its turn) while Replica 3 shows 0 in flight; the chip lands on busy Replica 1 | Replica 1 jolts, orange ripple; counter **2 in flight** turns orange; second slot shows an orange stub (waiting) | send C6, E4 tick (12.7); arrive C5 (13.5) + **miss buzz** (13.52), the loudest moment |
| 14.0–16.7 | Replica 3's counter ripples green (it was free); Replica 1's heavy job completes (14.6), the waiting small job runs (15.25–15.75); grey heavy envelopes return at 15.5 and 16.3; the delayed small response lands last | badge **`2.5 s`** orange at 16.65 | ack G6 (hint); ack C6; deliver G4, G4; **deliver C4** (low) |
| 18.05–19.3 | **Beat 3, policy switch.** Balancer flashes green, label changes in place to LEAST IN-FLIGHT; three green dots climb beside each rack and run up the wires to the ports | sublabel text + colour; counters are now inputs | recover sweep (18.05), chime (19.25) |
| 19.75–22.0 | Two heavy requests: all counters 0 → tie → rotation gives Replica 2 (21.05); then 0,1,0 → tie → Replica 3 (21.95); the chosen counter flashes green at each pick | counters 0,1,1; two 6 s bars | ack C7 (pick blip) + send A5; arrive E5, G5; work ticks |
| 21.75–26.75 | Two small requests: counters 0,1,1 → **Replica 1** (23.05, done 23.65, `180 ms` 24.55); again 0,1,1 → **Replica 1 again** (25.25, done 25.85, `180 ms` 26.75). Round robin would have sent the second one to busy Replica 2 | Replica 1 slot busy → done twice; green badges | ack C7; send C6; arrive C5; ack C6; deliver C6 ×2 |
| 27.05–28.85 | Heavy jobs complete; grey envelopes return; all counters read 0 | all slots idle, policy label stays LEAST IN-FLIGHT | ack E6, G6; deliver G4 ×2 |
| 28.9–30.65 | Hold on the resolved, idle state | — | — |
| 30.65–31.75 | Fade to the title-only frame (identical to frame 0) | veil 0 → 1 | — |

Playback speed 1; duration 31.75 s (953 frames at 30 fps). Times are from `node check-timing.cjs` for the published render.
