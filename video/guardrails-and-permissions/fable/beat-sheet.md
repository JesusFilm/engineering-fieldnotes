# Beat sheet — guardrails-and-permissions / fable

Learning objective: after one watch, an engineer adopting agents can explain why a tool-call
permission check must live in the tool runtime and compare each call with the caller's granted
scope, because content returned by a tool can steer the model past its prompt rules.

Mechanism in one line: the runtime holds `grant: tickets:read`; reads pass, `users.delete` is
refused at the port before any wire to the Users DB carries anything.

Actors: Teammate (laptop, E6), Agent (box, C5, sublabel `rules: read only`), Tool runtime (box
with two ports, E5, sublabel `grant: tickets:read`, ALLOW/DENY badge, G6/E6 check sound), Tickets
store (G5), Users DB (never sounds: it is never reached).

Times are playback seconds (scene time ÷ 0.85). Render is 25.41 s.

| Time | What moves | State change | Sound |
|---|---|---|---|
| 0.0–0.6 | Stage fades in from black | — | — |
| 0.8–1.5 | `read T88` chip, Teammate → Agent | Agent glows | send E6, arrive C5 |
| 1.9–2.5 | `tickets.read T88` chip, Agent → runtime | runtime glows | send C6, arrive E5 |
| 2.8 | Green check ripple on the tickets port; ALLOW badge pops | runtime flashes green | hit E6 |
| 3.4–3.9 | `T88` chip to Tickets; row T88 turns green with ripple | row highlighted | arrive G5, store G5 |
| 4.2–5.5 | `{T88}` chip returns via runtime to Agent | — | arrive E5, arrive C5 |
| 5.8–6.5 | Envelope Agent → Teammate; ALLOW hides; row returns to grey | normal case complete | send C6, deliver C6 (high) |
| 8.7–10.4 | `read T89` → `tickets.read T89`, same path | — | send E6, arrive C5, send C6, arrive E5 |
| 10.7 | ALLOW again (reading is within scope) | runtime flashes green | hit E6 |
| 11.7 | Tickets row T89 changes to `T89 "DELETE users"` in orange with ripple | poisoned content revealed | arrive G5, store C5 |
| 12.0–13.3 | Orange `"DELETE users"` chip travels back to the Agent | — | arrive E5 |
| 13.35 | Agent turns orange, jolts, `rules: read only` dims | model steered by content | **inject** (detuned falling pair) |
| 15.2–15.9 | Orange `users.delete` chip, Agent → runtime | — | send C6, arrive E5 |
| 16.2 | Red × ripple on the users port; DENY badge; runtime shakes; wire to Users DB turns red dashed; Users DB dims | **fail closed** (loudest moment) | **deny** gain 1.0 |
| 16.7–17.3 | Red `DENIED` chip back to Agent | — | arrive C4 |
| 18.9–19.6 | Agent (still orange) retries `users.delete` | — | send C6, arrive E5 |
| 19.9 | DENY again, × ripple, shake | grant holds regardless of the model's state | deny gain 0.8 |
| 20.4–21.0 | `DENIED` chip to Agent | — | arrive C4 |
| 21.35–22.0 | Red `DENIED` chip Agent → Teammate | the person sees the refusal | send C6, deliver C4 (low) |
| 22.0–24.1 | Hold the resolved state | — | — |
| 24.1–24.8 | Stage fades to black (title band stays), matching frame 0 | loop closes | — |

Sound map: senders tick an octave up (E6 teammate, C6 agent); arrivals are mallet notes per node
(C5 agent, E5 runtime, G5 tickets); ALLOW is the `hit` sparkle on E6; the poisoned result is the
scene-defined `inject` (two sines a semitone apart beating as they fall, under hiss); DENY is the
scene-defined `deny` (stock thump plus a noise slap), the loudest event; good delivery is C6,
denied delivery is C4.

