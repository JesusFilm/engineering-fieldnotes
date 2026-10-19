# Tool design — bounded results (fable variant): beat sheet

Lesson: a tool's response shape decides what lands in the agent's context. A raw `read_logs` tool looks fine on a quiet service, floods the context exactly during the incident (and the one useful line is truncated away), and a redesigned `search_logs(service, window, limit)` moves the filtering into the tool so the agent receives the few lines and IDs it needs.

Learning objective for a team adopting agents: when wrapping an existing API or data store as a tool, bound and filter the result inside the tool (limit, window, pagination) instead of returning the raw dump, because the model's context is the scarce resource and it is most crowded when the task matters most.

Actors: Agent (box, with its answer as a sublabel) · context bar (fills as lines land) · tool box (`read_logs`, later relabelled `search_logs`) · Logs (database).

Playback times (speed 0.92; scene authored at speed 1).

| Time (s) | What moves | State change | Sound |
|---|---|---|---|
| 0.0–0.8 | Stage fades in from black under the title | — | — |
| 1.1 | Chip `web · 1h` from Agent to `read_logs` | Agent and tool pulse | send E6, arrive C5 |
| 1.9–2.5 | Chip `read` to Logs | Logs busy briefly | arrive G4, two work ticks |
| 3.7 | Chip `12 lines` back to the tool | — | arrive C5 |
| 4.4–4.8 | Three grey dots reach the Agent | Context bar fills to 15%, grey; fill front ripples | line C5 D5 E5 |
| 5.3 | — | Agent receipt `12 lines read` in neutral white | deliver E5 |
| 7.7 | Bar drains | Answer cleared, new run | poof (quiet) |
| 8.0–8.7 | Chip `payments · 1h` to the tool | pulses | send E6, arrive C5 |
| 9.4–10.8 | Chip `read` to Logs; Logs spins longer | Logs busy | arrive G4, six work ticks |
| 11.4 | Chip `3,214 lines` in orange back to the tool | — | arrive C5 |
| 12.0–13.7 | Twelve dots stream to the Agent 0.15 s apart | Bar fills 9% per dot, grey then orange past 60% | line C5…G6, a rising scale |
| 13.7 | **Overflow** | Bar snaps red, bar and Agent jolt, `TRUNCATED` badge pops above the bar | overflow (loudest) |
| 13.8–14.1 | Three red dots arrive | Each is dropped at the Agent with a red × ripple | thump ×3 (quiet) |
| 14.4 | Green chip `INC-42` arrives last | Dropped: red × ripple, Agent jolts | poof |
| 15.1 | — | Agent answer `?` in orange | deliver C4 (low) |
| 18.0 | Tool pulses orange, small ripple above its top edge | Label becomes `search_logs`, sublabel `service · window · limit` | recover (rising sweep) |
| 19.0 | Bar drains, badge shrinks away | Answer cleared | poof |
| 20.0–20.7 | Chip `payments · 1h · 20` to the tool | pulses | send E6, arrive C5 |
| 21.4–23.1 | Orange chip `filter` to Logs; Logs spins longest | Filtering happens in the tool | arrive G4, eight work ticks |
| 23.7 | Green chip `3 lines` back to the tool | — | arrive C5 |
| 24.4 | Green chip `INC-42` reaches the Agent | Bar fills 8% in green, green check ripple | line C5, hit |
| 25.2 | — | Agent answer `INC-42` in green | chime |
| 28.4–29.6 | Stage fades to black | First and last frames identical | — |

Sound map: the Agent sends at E6, the tool lands at C5, Logs at G4 (deeper tier, lower note). Each line that lands in the context plays one step of a rising scale, so a filling context is heard as a climb; the overflow breaks the scale with a noise burst, falling tone and sub thump. The redesign is the rising "recover" sweep; the good ending is the chime.


Comparative corrections by gpt-6-astra comparative review, 2026-10-19; original scene authorship retained. Counts and bar shares are illustrative; the opening receipt makes no claim about incident absence.
