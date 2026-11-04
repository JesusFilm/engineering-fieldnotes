# Lesson 01 — Intent versus permission: beat sheet

Mechanism: the agent's instruction says `Do not deploy`, yet it still generates `deploy r42 → prod`. The application, outside the model, checks the request's identity, action and target against that identity's grants, finds no deploy grant, and returns 403. The deploy service is never called; prod stays on r41.

## Neutral choices from plans A and B

- From A: request inspector inside a labelled application boundary; instruction kept verbatim throughout; identity supplied by trusted context (`from session`), not by the request; deploy register shows `calls 0` and `live release r41` from the first frame and never changes; no token ever travels to the deploy service; no green success verdict; finite fade.
- From B: a visible lookup against the identity's grants (`has read logs ✓`, `needs deploy prod — no grant`), so the denial is caused by an absent grant (default deny); the returned denial lands back on the agent's request; closing contrast between the instruction (tagged `intent`) and the denial rows.
- Excluded as later-lesson or distracting: executing a read, other identities (B's deploy-svc row), approval, guardrail classifiers, prompt injection, retry or bypass. The single `read logs` grant is shown only as an existing entry, never executed.
- Target simplified to `prod` (A used `checkout/prod`) for 350px width. Release, identity and 403 are illustrative.

## Timing (speed 1, 38.8 s) and sound

| t (s) | What moves / state change | Sound (actor) |
|---|---|---|
| 0.3–1.0 | Application boundary, empty authorization inspector (dashed identity/action/target slots), deploy register `calls 0`, `live release r41` fade in | ack C5 quiet (application) |
| 1.3 | Agent panel pops | ack E5 (agent) |
| 2.1–3.0 | `instruction  Do not deploy` types in, outlined | arrive E5 (agent) |
| 3.0–5.5 | Hold: instruction alone | — |
| 5.5–6.6 | `request  deploy r42 → prod` types in, blue outline; agent stroke brightens | store E5 (agent) |
| 6.6–8.5 | Hold: instruction and contradicting request together | — |
| 8.5–9.6 | Chip `deploy r42` crosses into the application on a lit wire | send E6 (agent) |
| 9.6 | Inspector lights; arrival ripple | arrive C5 (authorization) |
| 10.5 / 11.7 / 12.9 | identity `investigator` (`from session`), action `deploy`, target `prod` fill one at a time | ack C6 ×3 (authorization) |
| 13.4–15.0 | Hold: all three attributes visible | — |
| 15.0 | `grants for investigator`: `has read logs ✓`, empty dashed `needs` slot | store C5 (authorization) |
| 16.4 | Lookup: action+target outlined amber, compared with `read logs` | work C4 |
| 17.5 | Comparison moves to the empty slot | work C4 |
| 18.5 | Slot fills red: `needs deploy prod — no grant` | miss C4 (lookup fails) |
| 19.7 | `result DENIED 403`; inspector flashes red and jolts | thump C3, loudest |
| 19.9–22.5 | Hold on the denial | — |
| 22.5–23.6 | Red chip `403 denied` returns up to the agent | send C6 (authorization) |
| 23.6 | Agent request dims, tagged `denied`; agent pulses red | arrive E5 quiet (agent) |
| 25.2 | Grey × ripple on the dashed route to the deploy service | custom `closed` low click (route, not service) |
| 26.4 / 27.6 | `calls 0` tagged `never called`; `live release r41` tagged `unchanged` | ack G4 quiet ×2 (inspection emphasis) |
| 28.7–30.2 | Hold | — |
| 30.2 | Instruction outlined grey, tagged `intent` | ack E6 quiet (agent) |
| 31.4 | `needs deploy prod / DENIED` outlined red; boundary title brightens | ack C5 (application) |
| 31.7–37.0 | Final hold of the complete state | silence |
| 37.0–38.2 | Stage fades to black; title remains | — |

Actor pitches: agent E5/E6, authorization C (C6 checks, C5 arrival, C4 lookup, C3 denial), register emphasis G4. The deploy service never makes an activity sound because it is never invoked.
