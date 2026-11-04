# OAuth PKCE 01 — Delegate access: review (render 2)

Reviewed from the encoded file `video.mp4` (sha256 `1f911da6bdfe260d0f1803abb999d63a324c24a7e89500680c91565fd183a777`, 41.6 s). Audio was analysed through volumedetect, windowed peak levels and a spectrogram. **It was not heard.** Factual checks and the judgement notes below are separate. No comparative review against other cuts has happened, so this file makes no recommendation.

## Plan choices (A/B, recorded neutrally)

| Idea | Source | Used? |
|---|---|---|
| Four-actor stage with the code's browser path and a separate client–server diagonal for the exchange | B | yes; the stage puts client/API on the left and browser/server on the right so the request to the API travels vertically |
| Three recomposed stages with moving actors | A | no; a fixed stage with dimming keeps the routes comparable, and the engine has no animated positions |
| Opening request without a token rejected with 401 | B | yes |
| In-panel rows showing what the client holds | A (client rows), B (store) | yes, inside the client panel |
| Sequential API check rows (valid, this API, operation allowed) | A | yes |
| Sign-in in the browser with masked dots sent only to the server while the client is dimmed | B | yes; no password text, no identity badge |
| Consent shown on `auth.example` with a user pointer clicking Allow | A | yes |
| Code shown hollow/dashed amber, token solid teal; never morph | A, B | yes |
| Code consumed at exchange (poof) and removed from both sides | B | yes, with the `code · use once` label |
| Write/delete denial with the token still valid | A (write), B (DELETE 403) | yes, as `DELETE /incidents/7` → 403 |
| `Not a token` / `Not a password` labels | A | no; the shape, colour, route and consumption carry the difference |
| Route recap lighting the wires before the fade | B | yes, compact (1.4 s of motion) |
| Actor pitches | A: C5/D5/E5/G5; B: C5/E5/G5/C4 | B's chord with per-actor timbre |

## Accuracy notes (factual)

- The code travels only server → browser → client and client → server. It never reaches the API. The token travels only server → client and client → API.
- The client is dimmed while the user signs in and approves. The masked credential travels browser → server only.
- The API's checks are illustrative responsibilities, not a prescribed implementation. The 403 follows the same valid token passing its first two checks, so a valid token is not shown as granting every operation. RFC 6750 §3.1 associates `insufficient_scope` with 403 and a missing or invalid token with 401.
- No verifier, challenge, hash, client secret, state, refresh token, ID token or JWT content appears. The subtitle marks the flow as simplified; the omitted protections are elided, not presented as optional.
- `use once` reflects RFC 6749 §4.1.2 (the client must not use the code more than once).

## Fixed before handover

- Render 1, 11.85–12.4 s: the "verify user" check ripple (r 70) was drawn over the server's status text and header. It is now a small mark beside the status line (verified at frames 357 and 363).
- Render 1, all vertical hops: packets started on the panel borders and briefly covered the bottom row. Vertical routes now start and end 30 px outside the panels (verified at frames 54/56, 99/101, 236, 267, 327, 438, 513, 792, 963, 1054/1058).

The defect pass is otherwise clean. Every label reads at 350 px width. There are no lingering states, no gaps without change longer than about 2 s outside deliberate holds, and a sound on every visible event. The first and last frames both show the title over an empty stage.

## Suggested improvements

1. **Make delegation versus authentication more explicit** (9.4–15.2 s, M). Saw: sign-in and consent happen in the same browser page, back to back. A beginner may read them as one "login". Change: after `verify user`, briefly pulse the server only, then let the consent page appear with a distinct consent-sound pitch, so the two steps feel separate. Effect: clearer that signing in at the server is not the thing delegated to the client.
2. **Hold longer on the code-versus-token contrast** (23.1–24.4 s, S). Saw: the code vanishes and the token arrives within 1.3 s. Change: add 0.5 s between the poof and the token's departure. Effect: the swap registers as two events.
3. **The 401 opening could read as a failure of the API** (2.85 s, S). Saw: the API jolts red, which the style uses for faults. Change: keep the × but drop the jolt for 401, reserving the jolt for the 403. Effect: the API is enforcing, not failing, and the 403 stands out more.
4. **Recap wires are thin at 350 px** (37.6–40.6 s, S). Saw: marching coloured dots are faint on a phone. Change: send one amber code dot and one teal token dot along their routes during the recap. Effect: the route summary survives small screens.
5. **Browser address bar keeps `app.example/cb` after the redirect** (20–41 s, S). Saw: the stale callback address stays visible in the dimmed browser. Change: clear the address when the browser dims. Effect: less leftover state.
6. **Sign-in ticks are close to the send tick** (9.95–10.9 s, S). Audio was analysed only: E6 typing ticks sit near the E6 browser send pitch. Change: give typing a noise-only click. Effect: typing and sending become distinct by ear.

## Notes for the skill (not acted on)

- The cut-local engine adds generic `panel` and `window` node types and a `tag` packet kind (dashed, solid and tabbed). The diff is limited to `engine/flow-engine.js`; `sfx.js`, `render.mjs` and `preview.html` are byte-identical to the skill's scripts.
- `render.mjs` needed no changes. Snap Chromium could not launch inside the workspace sandbox, so renders ran with a scoped escalation.

