# Lesson 03 plan B: Bind code and challenge

## Mechanism

One authorization attempt, labelled **A**, carries the challenge out through the browser and brings a code back. The client keeps verifier A the whole time. The authorization server (AS) stores challenge A in the record for transaction A. After the user approves, it issues code A in that same record, so code A is bound to challenge A. Code A then returns to the client through a browser redirect. The final state shows that the server's record still has one empty field, the verifier, which only the later exchange can fill. The viewer should come away with this picture: the code travelled, the verifier stayed home, and the server knows what the verifier must match.

Accuracy guardrails for the scene and any copy:

- The verifier never appears on a wire, in the browser, or in the AS record before the final "pending" field. No packet carries it.
- The challenge is never called a secret, never locked, and never hidden from the browser. It travels openly in the request chip.
- Normal OAuth request checks (client and redirect) visibly run before the challenge is recorded, and user approval visibly happens before a code exists. PKCE adds to these checks and replaces none of them.
- The ending names the later exchange only as "checked at exchange". It does not show the verifier being sent, hashing, the token endpoint, or tokens.
- All values are placeholders: `verifier A`, `challenge A`, `code A`. No realistic base64url strings.

## Actors and layout (1080×1920, flow top to bottom)

| Actor | Node | Position | Pitch |
|---|---|---|---|
| Client (desktop host) | `laptop` icon at x 540, y 560 beside a `store` "Client · attempt A" at y 700, 3 rows | top | C5 |
| Browser | `box` "Browser", w 520, y 1010; sublabel used for "Approve?" then "Approved ✓" | middle | E5 |
| Authorization server | `store` "Auth server · txn A", 3 rows, y 1400 | bottom | G5 |

Wires: client to browser and browser to AS on one vertical column at x 540, with return traffic offset slightly (x 600) so the outgoing and returning chips never overlap. Label the return wire "redirect" only during the redirect beat (fade it in and out). The title band shows "OAuth PKCE" with subtitle "BIND CODE + CHALLENGE". Keep everything between y 450 and y 1780.

Colour carries the transaction: everything belonging to attempt A (verifier row, challenge chip, code chip, AS record rows) uses the engine's `info` hue. Teal (ok) marks completed checks and the binding link. Amber marks only the pending verifier field at the end. Red does not appear, because this lesson shows no failure.

Client rows: row 0 `verifier A · kept`, row 1 `challenge A`, row 2 empty until code A lands. AS rows: row 0 `challenge A`, row 1 `code A`, row 2 `verifier: —` (appears last, amber, hollow).

## Legibility at 350 px

The video is reviewed at 350 px wide, a 0.32 scale. The skill's 24 px minimum becomes 8 px there, which is unreadable. Use these minimums at 1080 wide: node labels 54 px, store row text 46 px bold, chips 46 px mono bold, sublabels 42 px. That gives 14–17 px at 350 px. Keep chip text to 12 characters or fewer (`challenge A`, `code A`, `approve`). If the engine's `store` or chip sizes cannot reach these sizes, extend them in the cut's local engine copy with a general size option and record the change. Hold every labelled state for at least 2 s so a reader at phone width can read it.

## Beat sheet (authored at speed 1, about 44 s)

| Time | What moves | State change | Sound |
|---|---|---|---|
| 0.0–1.2 | Stage fades in from black | Client, browser and AS idle and grey; client rows 0–1 filled | none, then soft `arrive` C5 at 1.0 |
| 1.2–5.5 | Client row 0 pulses white, gains the "kept" tag; row 1 pulses info blue | The viewer sees two values: one that stays and one that will travel | quiet low click (custom `keep`, C4, short) at 1.6; `arrive` C5 at 2.6 |
| 5.5–7.5 | hold | — | — |
| 7.5–9.5 | Chip `challenge A` leaves client row 1 and travels to the browser; row 0 stays lit in place and pulses once as the chip leaves | Browser outline turns white on arrival | `send` C6 at 7.5, `arrive` E5 at 8.1 |
| 9.5–11.0 | Same chip continues browser to AS | AS outline turns white | `send` E6 at 9.6, `arrive` G5 at 10.2 |
| 11.0–13.5 | Two small teal check ripples on the AS: sublabel "client ✓" then "redirect ✓" | Normal request checks pass before anything is recorded | `ack` ×2 at 11.3, 12.0 |
| 13.5–16.5 | AS row 0 fills with `challenge A` (bar sweeps 0 to 1) | Transaction A now holds the challenge | `store` G5 at 13.6; hold to 16.5 |
| 16.5–21.5 | AS sends a dot to the browser; browser sublabel "Approve?" with an amber outline, then the user approves: outline teal, sublabel "Approved ✓"; dot returns to AS | User authorization happens in the browser; no code exists yet | `send` G6 at 16.6, `arrive` E5 at 17.2, `chime` E5 at 18.8, `arrive` G5 at 19.8 |
| 21.5–27.5 | AS row 1 fills with `code A`; a short wire between row 0 and row 1 appears and marches teal dots, then settles solid teal; both rows pulse together | Code A is bound to challenge A in one record | `store` G5 at 21.7; custom `bind` two-note G5 to C6 at 22.6; hold 24.5–27.5 |
| 27.5–31.5 | "redirect" wire label fades in; chip `code A` travels AS to browser to client on the return path | Client row 2 fills with `code A` on arrival; redirect label fades out | `send` G6 at 27.6, `arrive` E5 at 28.3, `send` E6 at 29.0, `arrive` C5 at 29.7 |
| 31.5–33.5 | hold: client holds verifier A and code A; AS holds challenge A bound to code A | — | — |
| 33.5–36.5 | AS row 2 appears, amber and hollow: `verifier: —`; a faint dashed line runs from client row 0 down to AS row 2 with no packet on it; small caption under AS: "checked at exchange" | The code alone does not complete the proof; the server waits for a match | soft custom `pending` (two quiet clock ticks, G4) at 33.7 and 34.2 |
| 36.5–41.5 | Hold final state; amber row breathes once | — | none |
| 41.5–43.0 | `s.fade` to black | Finite ending; the next lesson opens on a fresh stage | none |

Every beat has a state change beyond a moving packet: the kept tag, browser and AS outlines, check ripples, filled store rows, approval sublabel, the binding wire, and the pending field. Removing all words still leaves the story readable: one row never moves, one chip goes down, a record fills, a chip comes back, and one slot stays empty.

## Sound design

Each actor has one pitch from a C major chord: client C5, browser E5, AS G5. Sends are quiet ticks an octave above the sender. The two loudest moments are the user approval chime and the bind cue, because those are the two state changes the lesson is about. Custom sounds are defined in the scene with `s.sound`: `keep` (short low sine click, no echo), `bind` (two mallet notes, G5 then C6, 90 ms apart), and `pending` (quiet `clock` variant). Pan every cue with `s.panOf`. Because the stack is vertical, panning stays near centre, so pitch identifies the actor. Leave the final hold and fade silent so the ending does not sound like a failure.

## Pacing notes

No beat starts until the previous state has rested at least 1.5 s; holds after the record (13.5), bind (24.5) and final state (36.5) run 2.5–5 s. There is no long opening or padded ending: the stage is readable by 1.2 s, and the fade starts 5 s after the last change. If the dry run lands outside 40–46 s, adjust holds rather than packet speed. The existing lessons.json item 3 uses 28 s beats at 0/7/14/21. If this cut is adopted, the coordinator should retime them to about 1.2 / 7.5 / 16.5 / 21.5 / 33.5. That shared file stays with the coordinator.

## Source, render and verification

- Scene in `video/oauth-pkce/<variant>/03/`, following the repository's variant layout, using the repo-pinned renderer copy and local drawing extensions. Record relative reproduction commands. Keep scratch stills out of Git.
- Dry-run cue timing in Node before rendering.
- Render one still per beat (1.0, 4.0, 9.0, 12.5, 15.0, 19.5, 25.0, 30.5, 35.0, 40.0), then downscale each to 350 px wide and view both sizes. Check that every chip and row is readable at 350 px, the outgoing and returning chips never overlap, no state lingers from an earlier beat, and the verifier never appears off the client before the pending field.
- Full render with contact sheet; spectrogram showing a cue on every beat with the chime and bind loudest; ffprobe duration and audio stream; full decode with no errors; audio peak check; streaming metadata (faststart). Record whether the audio was actually heard or only analysed.
- A comparison reviewer scores it against the alternatives without seeing this plan or its scores.

## Risks

- Five filled store rows plus chips may crowd the client and AS. If the 350 px stills look dense, drop the "kept" tag and show the kept state with the verifier row's steady white outline.
- The dashed line to the pending field could read as "the verifier is sent now". Keep it faint, static and packet-free. If stills still suggest transmission, remove it and rely on the amber field and caption.
- The "checked at exchange" caption is the only phrase longer than a chip; confirm it stays at least 42 px and clear of the AS rows.
