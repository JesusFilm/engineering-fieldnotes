# Beat sheet — Idempotency, "Same step, same key" (fable)

Learning objective: an engineer configuring an agent harness can explain why a tool call that times out must not be retried blindly when it has a side effect, and what the harness and the tool each have to do (a stable key per logical step, stored by the tool with the first result) so the retry returns the first result instead of acting twice.

Mechanism in one line: the agent names each logical step with a key; the tool records the key with the ticket it creates; a retry carrying the same key gets the recorded ticket back.

Actors (top to bottom): Agent (box, sublabel = current step), Ticket tool (box), Tickets (store, three rows, counter under it). Side badges: clock/TIMEOUT left of the agent, key right of the agent, outcome below the store.

| Time (s) | What moves | State change | Sound |
|---|---|---|---|
| 0.0–0.7 | stage fades in from black | opening state: empty store, "0 tickets", agent at step 1 | — (loop boundary) |
| 1.2–3.3 | chip `create ticket` down the wire; dot to the store; chip `#501` back up | row 0 = `#501` (green ripple), "1 ticket"; agent flashes green with a check | send C6 → arrive E5 → send G6 → store G5 → send E6 → deliver C6 |
| 5.0 | agent sublabel changes to `step 2` with an orange pulse | new logical step | ack G6 |
| 5.6–7.1 | `create ticket` down; dot; row 1 = `#502` | "2 tickets" | send, arrive, send, store |
| 7.1–7.5 | chip `#502` leaves the tool and dies mid-wire | red × ripple; wire turns red and dashed | lost (low falling thud) |
| 7.6–9.6 | clock fades in and spins at the agent | waiting | clock ticks, accelerating |
| 9.6 | clock out, `TIMEOUT` badge pops; agent flashes red | agent decides to retry | miss E4 |
| 10.8–12.9 | retry chip `create ticket` (orange) down; dot; row 2 = `#503`; chip `#503` back | "3 tickets"; agent flashes green — it believes all is well | send, arrive, send, store, send, deliver |
| 13.5 | store jolts; rows `#502` and `#503` and the counter turn red; big red ripple | `DUPLICATE` badge pops (13.7) | crash (loudest), thump |
| 15.9–17.3 | rewind triangles move left over the stage fade; rows 1–2 reset offstage, "1 ticket" | rewind to the start of step 2 | rewind swoosh; recover sweep on return |
| 17.4 | `key s2` badge pops beside the agent; agent pulses orange | harness mints a key for step 2 | ack G6 |
| 18.1–19.6 | chip `create · key s2` (orange) down; dot; row 1 = `#502  key s2` | "2 tickets" | send, arrive, send, store |
| 19.6–22.1 | chip `#502` dies on the wire again; clock; `TIMEOUT` | same failure as before | lost, clock ticks, miss |
| 23.2 | key badge glows | same key reused | ack G6 |
| 23.4–24.6 | chip `create · key s2` down; orange dot to the store; row 1 glows green with a check | lookup finds the key; no new row | send, arrive, send, hit E6 |
| 24.9–25.5 | chip `#502` back to the agent; green check | first result returned | send, chime C6 |
| 26.1 | store outline and counter turn green; green ripple | `SAME TICKET` badge pops; "2 tickets" | chime E6 |
| 28.8–29.7 | stage fades to black | closing state equals the opening frame | soft swoosh |

Pitches: agent sends C6, tool receives E5, tool sends to the store G6, store writes G5, responses E6/C6, keyed lookup hit E6, failures E4 and below. Rendered duration 29.7 s at speed 1.


Comparative revision by gpt-6-astra comparative review, 2026-10-19: added a visible transport rewind cue at the alternate-take transition and enlarged store text/count. Authorship and sound sequence are unchanged.
