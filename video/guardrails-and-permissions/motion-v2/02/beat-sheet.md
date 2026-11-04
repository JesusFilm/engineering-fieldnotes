# Lesson 02 — Grant only needed access: beat sheet

Mechanism: a grant names an action and a resource. The `investigator` identity may read checkout logs. A read of checkout logs matches the `read` column and the `checkout` row, executes in the log service, and returns lines. A read of payments logs uses the same `read` column but a different row, finds no grant, and is denied. The log service never reads payments.

## Neutral choices from plans A and B

- From A: a resource-by-action permission grid (rows `checkout`, `payments` logs; columns `read`, `write`) with exactly one `allow` cell. The request selects the column, then the row, then the intersection, and the action column stays the same for both requests. R1 content clears before R2 is written. Counters persist: `checkout logs reads 1`, `payments logs reads 0`. Denial happens before any protected read. Finite fade.
- From B: a real execution step. The allowed request travels into a log service that counts the read and returns lines to the agent. The denied request returns `403` to the agent, and the route to the log service gets a grey ×.
- Layout: the agent sits at the top. Requests enter the grid at the top of the `read` column, and a dot runs down the column to the target row. Responses return up a right-hand gutter so they never cross the grid.
- Excluded: deployment (lesson 01), policy checks and approvals (later lessons), granting new access, and log redaction. The `write` column only shows the action axis and is never exercised.
- Illustrative: identity, resources, `timeout ×3`, 403.

## Timing (speed 1, 47.0 s) and sound

| t (s) | What moves / state change | Sound (actor) |
|---|---|---|
| 0.3–1.0 | Grid and log service fade in: one `✓ allow` (checkout/read), three `no grant`; both counters `reads 0` | ack C5 quiet (grants) |
| 1.3–2.2 | Agent pops; `identity investigator` · `from session` | ack E5 (agent) |
| 2.8–4.4 | The single granted cell outlines green | ack C6 (grants) |
| 5.0–6.0 | `request read checkout logs` types in, `pending` | store E5 (agent) |
| 6.0–8.0 | Hold | — |
| 8.0–8.9 | Chip `read checkout` enters the top of the read column | send E6 (agent) |
| 8.9 | Grid lights | arrive C5 (grants) |
| 9.9 | Action: `read` column band (amber) | ack C6 |
| 10.6–11.1 | Dot runs down the column; `checkout` row band | ack C6 |
| 12.3 | Intersection `✓ allow` outlined green, ripple | hit C5 |
| 12.6–15.5 | Hold: both bands and the granted cell | — |
| 15.5–16.4 | Bands clear; execution wire opens; chip `read checkout` into the log service | send C6 (grants) |
| 16.4–17.5 | Log service lights; checkout row works; `reads 0 → 1` | arrive G5, work G4 ×3, store G5 (log service) |
| 18.4–19.8 | Chip `lines` up the right gutter to the agent | send G6 (log service) |
| 19.8 | `result timeout ×3`; request tagged `allowed`; agent pulses green | deliver G5 (log data reaches agent) |
| 20.3–24.0 | Hold | — |
| 24.0–24.4 | R1 request and result fade; grid outline clears; counters persist | — |
| 24.6–25.6 | `request read payments logs` types in, `pending` | store E5 (agent) |
| 25.6–27.0 | Hold | — |
| 27.0–27.9 | Chip `read payments` enters the same read column | send E6 (agent) |
| 27.9 | Grid lights | arrive C5 |
| 28.9 | Same `read` column band | ack C6 |
| 29.6–30.3 | Dot runs further down; `payments` row band | ack C6 |
| 31.5 | Intersection turns `✗ no grant` red; grid outline red, small jolt | thump C3, loudest |
| 31.8–33.3 | Hold on the denial | — |
| 33.3–34.5 | Red chip `403` up the gutter to the agent | send C6 quiet (grants) |
| 34.5 | Request tagged `denied`; `result no payments grant`; agent pulses red | ack E5 (agent) |
| 35.8 | Grey × on the unused route to the log service | custom `closed` low click |
| 36.9 | `payments logs reads 0` outlined, tagged `never read` | ack G4 quiet (log service, evidence) |
| 38.1–39.4 | Hold | — |
| 39.4 | Final contrast: read column band (grey), `✓ allow` green and `✗ no grant` red outlined together | ack C5 (grants) |
| 39.8–45.2 | Final hold | silence |
| 45.2–46.4 | Stage fades; title remains | — |

Actor pitches: agent E5/E6, grants check C (C6 attribute checks, C5 arrival/hit, C3 denial), log service G (G5/G6, work G4). Payments never sounds as a resource because it is never read.
