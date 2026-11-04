# Route to one specialist — beat sheet (motion-v2/02)

Mechanism: a router compares the request with its routing criteria, selects exactly one destination and dispatches only there. A request that matches no specialist criterion takes the human-triage fallback. Selecting and receiving work are not a correct answer.

Layout: a request panel, a router list (`Scope` → `Sends to`: API clients → API reviewer, Stored data → Data reviewer, Unclear → Human triage) with a radio per row, and a destination pane. Only the chosen route is drawn, as an amber connector down the right gutter from the selected row into the destination pane.

Duration 40.0 s at 30 fps, speed 1. Finite ending: the stage fades below the title from 37.6 s.

## Neutral A/B decisions

| Adopted | From | Reason |
|---|---|---|
| Routing list (scope → destination) with one selected radio, one drawn connector and a destination detail pane | A | Software-native; all three options visible as choices without three actor boxes |
| Underline of `API clients?` in the request, then outline of the matching scope cell | A | Shows the request and criteria causing the choice |
| `Answer: pending` after task and tools; amber selection, never a green verdict | A | Selected and received are not correct |
| Full R1 reset before R2 appears | A | No ghost selection or leftover tools under triage |
| For R2, grey outline and dash marks on the two specialist criteria before the fallback | B | Shows "no specialist criterion matched" as a state |
| Tools shown at the destination and lit together with the matched scope cell | B (tool sublabels), reshaped | "Its tools fit that scope" as a visible link |
| Rejected: B's three destination boxes with dropping exit wires | — | Close to the generic three-box layout the brief excludes |
| Rejected: B's `ran 1 of 3` counter and the specialist's finishing check | — | Text-heavy; the check would imply a result |
| Rejected: B's chime on triage as the brightest event | — | A fallback is not a success |
| Rejected: A's separate receipt line | — | The destination pane header and ID tag carry the same receipt |

## Beats

| Time (s) | What moves | State change | Sound |
|---|---|---|---|
| 0.6 | request text fades in | `Request R1`: `Will removing /v1 break` / `existing API clients?`; router rows open radios; `No destination` | arrive C5 (request) |
| 1.8 | underline draws under `API clients?` | the request's scope is visible | ack C6 |
| 1.8–6.5 | hold | three destinations exist, none selected | — |
| 6.5–7.3 | R1 chip drops into the router; router glows | router has R1 | send C6 / arrive E5 |
| 8.1 | `API clients` scope cell outlined amber; underline redraws | criterion matched | ack E5 |
| 9.3 | API row: radio fills, row outlined amber, `API reviewer` brightens | exactly one row selected | hit E5 (quiet) |
| 9.3–11.8 | hold | decision made, nothing delivered | — |
| 12.1–13.2 | connector appears; R1 travels down the gutter | only the chosen route exists | send E6 |
| 13.2 | destination pane glows | `API reviewer` · tag `R1` | arrive G5 (API reviewer) |
| 14.0 / 14.8 | rows type in | `Task: client compatibility`, `Tools: schema + callers` | store G5 ×2 |
| 15.7 | tools row and matched scope cell glow together | tools fit the scope | ack G5 |
| 17.1 | row types in, grey | `Answer: pending` | work G4 ×2 |
| 17.5–20.5 | hold | R1 state complete | — |
| 20.5–21.0 | R1 fades out together | selection, connector, pane cleared | — |
| 21.4 | request panel glows | `Request R2`: `Review this change` | arrive C5 |
| 23.0–23.8 | R2 chip drops into the router | router has R2 | send C6 / arrive E5 |
| 24.6 / 25.4 | `API clients`, then `Stored data` cells outline grey, marked with a dash | no specialist criterion matches | ack E5 / miss E4 |
| 26.4 | `Unclear` cell outlined amber | fallback criterion | ack E5 |
| 27.2 | Unclear row selected | exactly one row | hit E5 (quiet) |
| 29.7–30.5 | connector from Unclear row; R2 travels | only the fallback route | send E6 |
| 30.5 | pane glows | `Human triage` · tag `R2` | arrive A5 (human triage) |
| 31.3 / 32.1 | rows type in | `Scope: unclear`, `Action: clarify` (amber) | store A5 / ack A5 |
| 32.1–37.6 | reading hold | API and Data reviewers never received R2; Data reviewer never received work | silence |
| 37.6–39.0 | stage fades below the title | finite ending | — |

24 sound cues. Request C, router E, API reviewer G, human triage A. The Data reviewer never sounds because it is never dispatched.
