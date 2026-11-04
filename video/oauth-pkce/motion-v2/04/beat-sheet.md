# Lesson 04 — Prove the verifier matches (motion-v2/04)

One mechanism: at the token endpoint the authorization server looks up the challenge saved for the submitted code, applies S256 to the submitted verifier, and compares. A match turns only the PKCE row green; the other OAuth checks must pass before tokens are issued. In a separate alternative transaction, a different verifier yields a different challenge, PKCE fails, `invalid_grant` returns and no tokens are issued.

Actors: Client (C pitch family) and Authorization server (E pitch family; S256, comparison and validation are operations inside it). Values are illustrative aliases (`code A`, `verifier A/B`, `challenge A/B`). Encoded length 41.4 s, 1080×1920, 30 fps, speed 1.

| Time (s) | What moves | State change | Sound |
|---|---|---|---|
| 0–1.0 | Still opening | Client holds code A + verifier A; the server already has `saved: code A / challenge A`; checks idle; `no tokens yet` | — |
| 1.0–2.75 | Both client values glow; one request chip `code A [verifier A]` travels down | Request arrives at the server inlet (white ripple) | send C6 (1.6), arrive E5 (2.5) |
| 2.65–5.5 | Chip splits; `code A` slides into the saved record; verifier waits at the inlet | Saved record highlights: code A selects challenge A. Hold ≈1.5 s | ack E5 (4.0) |
| 5.2–8.75 | Verifier enters S256; `SHA-256` then `base64url` with a draining bar; output chip drops to **computed** | Computed slot fills `challenge A` | work E4 (6.0, 6.95), arrive E5 (8.55) |
| 9.6–10.5 | Copy of saved `challenge A` drops to **saved** (record keeps it) | Saved slot fills | arrive E5 (10.3) |
| 11.0–12.5 | Both slots glow amber (comparing), green `=` pops | PKCE check ✓ only | hit E5 (11.7), ack E5 (12.5) |
| 13.7–15.0 | Token slot outline and "other OAuth checks" header flash | Deliberate hold: PKCE passed, tokens still absent | clock E6 (13.7) |
| 15.0–17.05 | code valid, client binding, redirect URI each spin then ✓ | All shown checks pass | ack G#5, B5, E6 (rising) |
| 17.6–19.5 | `tokens issued` fills; dot returns along the right margin to the client | Client response = `tokens` | chime E5 (17.6), deliver C5 (19.3) |
| 19.5–21.8 | Hold | Resolved state | — |
| 21.8–23.4 | Stage fades, resets in the dark, returns; subtitle becomes `ALTERNATIVE · VERIFIER B INSTEAD` | Separate transaction shown instead of case 1: client has verifier B; saved record unchanged; all results cleared | — |
| 23.6–33.1 | Same exchange with verifier B | Computed slot = `challenge B`; saved slot = `challenge A` | send C6, arrive E5, ack E5, work E4 ×2, arrive E5 ×2 |
| 34.3 | Red `≠`, both slots jolt, computed slot turns red | Mismatch | miss E4 + thump E3 (loudest, −2.8 dBFS window) |
| 35.1 | PKCE row red × and jolt | PKCE fails | thump E3 |
| 35.9 | Other checks dim to 50%; token slot → red dashed `no tokens` | Nothing further runs; no tokens | poof E4 (quiet) |
| 36.5–37.6 | Red dot from the PKCE row returns to the client | Client response = `invalid_grant` | deliver C4 (37.5) |
| 37.6–40.0 | Hold failed state | — | — |
| 40.0–41.4 | Finite fade of the stage and subtitle | Title remains | — |

## A/B plan choices (neutral record)

Taken from plan A: the "Illustrative values" convention, expressed through alias names rather than an extra label; two actors only, with S256 and comparison inside the server; separate `SHA-256` → `base64url` operation steps with one work cue each; Client = C / server = E pitch families; a visibly incomplete hold after PKCE ✓; representative other-check rows (code valid, client binding, redirect URI); `invalid_grant` returning to the client; low C4 client note for the error.

Taken from plan B: the two-column server (saved record left, S256 right) feeding side-by-side **saved** / **computed** slots with an =/≠ glyph between them; a copy chip so the saved challenge visibly stays in the record; all check rows visible from the start so pending checks are visible; a rising ack run for passing checks; a fade-and-reset before the second case; the "still locked" cue on the token slot (as a soft clock tick rather than a thump); a separate error return path along the right margin; a ≈40 s total.

Not adopted: plan A's `no padding` note and S256 method tag on the saved row (added text without changing the mechanism); plan A's collapse/expand of comparison rows (all regions fit at once); plan B's final neutral "unchanged" pulse on the record and PKCE row (ambiguous in motion); plan B's `client matches` row label (replaced with `client binding` so it does not read as user identity); plan B's laptop icon (a panel holding the client's values teaches more).
