# Lesson 05 beat sheet: Separate login attempts (motion-v2/05)

Mechanism: an overlapping login overwrites the single shared verifier, so callback A sends code A with verifier B and the server rejects the exchange. The client is then changed to keep one verifier per login, and a fresh login proves the fix. All values are abstract placeholders. Times are encoded playback seconds (speed 1, 30 fps, 50.0 s).

Colour carries ownership: the left login (A, later C) is blue, the right login (B, later D) is violet. Amber marks a selection or a deliberate edit. Green appears only on the passed PKCE comparison and red only on the rejection. Client sounds sit at C5 (left) and E5 (right), panned to their side. The server has its own lower, woodier mallet (`srv`) at G5, centred. Sends are an octave higher and quieter.

| Time | What moves | State change and hold | Sound |
|---|---|---|---|
| 0.0–0.5 | Static opening: idle logins, empty shared slot, server with no saved login | Stage readable at the first frame | none |
| 0.5 | Login A lights blue | A becomes the active attempt; its field reads `waiting` | `send` C6, left |
| 0.9–1.6 | `verifier A` chip drops into the single shared slot | Slot reads `verifier A` with owner tag `login A` | `store` C5, left |
| 2.4–3.6 | A copy of the verifier passes through the client `S256` control | S256 lights; the raw verifier stays in the client | `work` C5 |
| 3.4–4.2 | `challenge A` chip travels to the server | Server record fills `code A` with `challenge A` | `srv` G5 |
| 4.9–6.0 | Blue dot returns along the left lane to Login A | Login A holds `code A` | `arrive` C5, left |
| 6.3–7.9 | Hold | A owns verifier A and code A | none |
| 7.9 | Login B lights violet | B starts while A waits | `send` E6, right |
| 8.3–9.3 | `verifier B` chip enters the same slot; the slot outline flashes amber, `verifier A` and its tag clear, then `verifier B` / `login B` settles with a small jolt | One slot, one value: A's verifier is gone, never shown beside B | `overwrite` E5 (click plus low dip) |
| 9.9–12.3 | Hold | Blue `code A` waits above a violet `verifier B` | none |
| 12.3 | Token request panel appears | Two empty rows | none (panel appears silently, no data has moved) |
| 12.8 | Callback A: Login A's code field highlights amber | A's callback is the one being processed | `arrive` C5, left |
| 13.2–14.1 | Blue dot runs the left lane into the request | Request row 1 reads `code A` | `store` C5 |
| 14.8 | Lookup highlights the single shared slot | A value is found; the find is not a correctness check | `hit` C5 |
| 15.2–15.9 | Violet dot runs down the centre into the request | Request row 2 reads `verifier B` | `store` E5 |
| 15.9–18.1 | Hold the wrong pair | `code A` above `verifier B`, colours visibly crossed | none |
| 18.1 | Request panel flashes | One request is sent | `send` C6 |
| 18.3–18.9 | White dot to the server record | `code A` selects its saved record (amber) | `srv` G5 |
| 19.2–20.55 | Violet dot into server `S256`; computed value lands left | Left slot reads `challenge B` | `work` G5 ×2, `srv` G5 |
| 21.25–21.85 | `challenge A` chip drops from the record to the right slot | Right slot reads `challenge A` | `srv` G5 |
| 22.55–23.1 | Both slots highlight, then a red `≠` pops between them with a jolt and red ring | Mismatch | `miss` G4 (quiet) |
| 23.7 | Result pill with red × | `Rejected: invalid_grant`; no token appears anywhere | `thump` G3, loudest cue (−3.4 dBFS window peak) |
| 24.1–26.3 | Hold the rejection | The server keeps running; only this exchange failed | none |
| 26.3 | Request, comparison and result clear; Login A marked `A failed`, Login B marked `B cancelled` / `stopped` | Old records leave before any repair; subtitle changes to the fix | `poof` C5 (single, quiet) |
| 26.9–27.8 | Cursor moves to an amber `Fix client` button and presses it | Deliberate engineering edit | `click` C4 |
| 28.3–28.75 | The single slot disappears; storage relabels `Verifier per login` and shows two empty rows | Storage schema changed by the edit | `store` A4 ×2 |
| 29.6–30.3 | Button becomes `Start fresh`; cursor presses it | A new login is started on purpose | `click` G4, then `click` C4 |
| 30.7 | Left card becomes `Login C` | Fresh attempt; A's code is not reused | `send` C6, left |
| 31.1–31.7 | `verifier C` fills row 1 with tag `login C` | C owns its own row | `store` C5, left |
| 32.2–33.6 | Copy through client S256; `challenge C` reaches the server | Record reads `code C` / `challenge C` | `work` C5, `srv` G5 |
| 34.1–35.1 | Blue dot returns to Login C | Login C holds `code C` | `arrive` C5, left |
| 35.6–36.6 | `Login D` starts; `verifier D` fills row 2 with tag `login D` | Row C is untouched by D's write | `send` E6, `store` E5, right |
| 36.9–38.1 | Hold | Both verifiers coexist in separate rows | none |
| 38.1–39.5 | Request reappears empty; Login C's callback highlights; code C enters the request | Request row 1 reads `code C` | `arrive` C5, `store` C5 |
| 40.0–40.9 | Lookup highlights row C only; verifier C enters the request | Request row 2 reads `verifier C`; row D stays dark | `hit` C5, `store` C5 |
| 41.5–45.25 | Send; code C selects the record; verifier C through S256; computed and saved `challenge C` land | Same comparison layout as the failure | `send` C6, `srv` G5, `work` G5 ×2, `srv` G5 ×2 |
| 46.5 | Green `=` with a green ring | Challenges match | `hit` G5 |
| 47.1 | Result pill with green check | `PKCE matched · other checks next`; no token is shown; D still waiting | `ack` G5 |
| 47.5–49.0 | Hold the resolved state | Final state readable | none |
| 49.0–49.8 | Stage fades below the title | Finite ending | none |
| 49.8–50.0 | Title only | End | none |

## Choices taken from the two plans

| Topic | Taken from | Choice |
|---|---|---|
| Layout | Plan A | Flat software panels: client with two login cards, storage row, token request, server with record and comparison rows |
| Ownership colour | Plan B | Blue for the left login and violet for the right, carried by card, stored row, request row and challenge chips |
| Owner tag on stored verifier | Plan B (idea), adapted | The single slot carries a `login A` tag that is replaced by `login B`, so the overwrite changes owner visibly |
| S256 before it matters | Plan A | Client S256 control during setup, then the same S256 step on the server at exchange |
| B's challenge and code | Plan A | B stays pending: only its verifier write is shown, so code B never appears and cannot be mistaken for a fix |
| Request shape | Plan A | Two stacked rows, `code` above `verifier` |
| Rejection | Both | Red `≠`, `Rejected: invalid_grant`, one loud thump, no token, no retry |
| Repair | Plan A action with Plan B table | Cursor presses `Fix client`; the single slot becomes rows keyed per login; a second press on `Start fresh` begins a new login |
| Fresh attempts | Plan A | New labels C and D, avoiding any reading that verifier A is recovered or code A reused |
| Ending | Plan A | `PKCE matched · other checks next` with D still waiting, then a short fade; no token shown |
| Not used | Plan A | A separate `PKCE on` indicator; the S256 controls in client and server stay visible throughout instead |
| Not used | Plan B | Paired split chip, server crash sound, token badge, `clock` ticks during holds |

