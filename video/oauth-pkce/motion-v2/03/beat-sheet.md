# Lesson 03 — Bind code and challenge (motion-v2 cut)

One mechanism: for authorization attempt A, the client keeps verifier A and sends challenge A (S256) through the browser. The authorization server runs its normal OAuth checks, records challenge A with attempt A, waits for the user's decision, then issues code A in the same record, bound to challenge A. A copy of code A returns to the client through a browser redirect. The code alone is not proof; a later exchange must match the recorded challenge. The exchange itself is out of scope.

Runtime 36.5 s at speed 1, 30 fps, 1080×1920. Finite ending: the final state holds for 4.5 s in silence. There is no fade and no loop rewind.

## Stage

| Element | Position (1080×1920) | Notes |
|---|---|---|
| Title / subtitle | y 205 / 268 | "Bind code and challenge", "OAUTH PKCE" |
| Client panel | y 320–700 | rows: Verifier A (teal), Challenge A (blue), Code A slot (violet; dashed "no code yet" until filled) |
| Browser panel | y 820–1100 | window chrome; left state word (Authorize / Consent / Redirect), right slot at x 760 for chips and the Approve button |
| Authorization server panel | y 1220–1810 | record "Attempt A": Challenge A + S256, bound link, Code A slot, later "Exchange must match" with dashed arrow back to Challenge A; status pills "OAuth checks" and "User approval" |
| Lanes | x 760, y 700–820 and 1100–1220 | dotted wires; light up only while traffic passes |

Identity uses the matching "A" labels and per-item colours: verifier teal, challenge blue, code violet. Amber marks focus, waiting and the unfinished proof only. Challenge and code are separate named chips. Neither morphs into the other.

## Beats

| Time (s) | What moves | State change | Sound (actor pitch) |
|---|---|---|---|
| 0.6 | Verifier A row fills and glows teal | client holds verifier A | `store` C5 (client) |
| 1.4 | Challenge A row fills | client holds challenge A | `store` C5 |
| 2.6 | "stays here" tag on the verifier row | verifier marked as local | `ack` C6 |
| 3.8 | amber focus outline on the challenge row | challenge selected to send | `ack` C5 |
| 3.8–5.6 | hold | — | — |
| 5.6–6.6 | Challenge A · S256 chip leaves the client row, travels down the lane | client row tag "sent"; verifier row unchanged | `send` C6 |
| 6.6–8.0 | chip rests in the browser; state "Authorize" | browser outline lit | `arrive` E5 (browser) |
| 8.0–8.8 | chip continues down to the server edge and waits there | server outline lit | `send` E6, `arrive` G5 (server) |
| 9.0–10.2 | "OAuth checks" pill spins amber, then turns into a teal check | normal request validation passes before anything is recorded | `work` G4 ×5, `ack` G5 |
| 10.3–10.9 | chip slides into the record's first row | Attempt A holds Challenge A + S256 | `store` G5 |
| 10.9–13.0 | hold | code slot still "no code yet" | — |
| 13.0–13.7 | amber dot server → browser | "User approval" pill waits (amber spinner); browser shows "Consent" with an Approve button | `send` G6, `arrive` E5 |
| 13.7–15.4 | hold: awaiting the user | — | — |
| 15.4–16.6 | User cursor glides onto Approve and clicks | button turns teal "Approved" | `click` A5 (user) |
| 17.6–18.3 | teal dot browser → server | "User approval" ✓ | `send` E6, `arrive` G5 |
| 18.4–20.0 | hold; browser content clears | — | — |
| 20.0 | Code A fills the record's second row | code issued only after approval | `store` G5 |
| 21.0–21.6 | short "bound" link draws between Challenge A and Code A; both rows glow together | code A bound to challenge A | `bind` G5→C6 (loudest cue) |
| 21.6–24.4 | hold on the binding | — | — |
| 24.4–25.1 | a copy of Code A leaves the server edge (code row pulses, stays filled) | server keeps the record | `send` G6 |
| 25.1–26.4 | chip rests in the browser; state "Redirect" | — | `arrive` E5 |
| 26.4–27.2 | chip travels up into the client's code row | client code row fills | `send` E6, `deliver` C5 |
| 27.2–28.8 | hold: verifier, challenge, code all at client | — | — |
| 28.8 | verifier row glows teal once | verifier never left | `ack` C6 |
| 29.8 | amber tag "not proof alone" on the client's code row | receiving the code does not complete proof | `pending` C5 (open falling fourth) |
| 31.4–32.0 | dashed amber "Exchange must match" field and arrow to Challenge A; challenge row outlined amber | later obligation shown, mechanics omitted | `pending` G5 |
| 32.0–36.5 | final hold, silent | — | — |

Muted reading: one teal row never moves; a blue chip goes down through the browser; server checks pass; the record fills; a cursor approves; a violet code appears and is joined to the blue row; a copy comes back up; amber marks what is still owed.

## Plan choices (A/B recorded neutrally)

| Decision | Used | From |
|---|---|---|
| Three wide stacked software panels, large type (52 px keys, 40 px tags) | yes | plan A |
| Separate challenge and code chips, no morph | yes | both |
| S256 shown on the chip and the record, no hashing | yes | plan A (B also lists it) |
| Order at the server: checks before recording the challenge | yes | plan B; plan A recorded first and then checked. RFC 7636 binds at issuance, and validation-first avoids implying invalid requests get recorded |
| Distinct "OAuth checks" and "User approval" status states | yes, as two persistent pills | plan A's statuses, plan B's two check ripples combined |
| Explicit Approve control plus a user cursor in the browser | yes | plan A (B used a browser sublabel and a chime) |
| Visible "bound" link between the challenge and code rows, loudest cue | yes | plan B's link, plan A's same-record placement |
| Code returns as a copy; the server record persists | yes | both |
| Final "later proof" signal | amber "not proof alone" tag at the client plus a dashed "Exchange must match" field pointing at Challenge A | combines plan A's sequential statuses with plan B's pending field; B's faint client-to-server dashed line was left out because it could read as the verifier being sent now |
| Ending | hold the final state; no fade | plan A (B faded out) |
| Actor pitches C5/E5/G5 + user A5; sends an octave up | yes | both |
| Custom `bind` two-note cue | yes | plan B |
| Custom `pending` open falling fourth at the client and server pitch | new; keeps "unfinished" distinct from failure | neither |
| Title band | 66 px single line | between A (78 px two lines) and B (engine title) to free stage height |

## Accuracy limits

The record is an illustrative logical association, not a storage schema. "OAuth checks" abbreviates normal authorization-request validation (client, redirect URI and other parameters) and is not exhaustive. User authentication is assumed done and is not animated. The verifier never appears on a wire, in the browser, or in the server record. No token, access grant, comparison algorithm or failed exchange is shown.
