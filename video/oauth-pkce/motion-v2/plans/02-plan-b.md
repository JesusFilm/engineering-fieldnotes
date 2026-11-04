# OAuth PKCE lesson 02 — Create a verifier (plan B)

## Mechanism

One authorization attempt begins inside the client. The client generates a fresh, unpredictable verifier and stores it in that attempt's own transaction record, which stays inside the client. A copy runs through S256, defined as BASE64URL-ENCODE(SHA256(ASCII(code_verifier))) with no padding, and produces the challenge. Only the challenge leaves the client, so it is sent first. The verifier stays in the record for a later exchange. A second attempt then gets its own record and a different verifier, and the first record stays unchanged.

The viewer should feel two things. One value stays home while a value derived from it leaves. Each new attempt starts again with new randomness and a new row.

## Scope guard

- Show generation, private retention, the S256 transform, the outbound challenge, and a second independent attempt.
- Leave out authorization codes, server-side storage of the challenge, the token endpoint, verifier comparison, invalid_grant, and the crossed or overwritten verifier failure. Lessons 03 to 05 teach those.
- The authorization server is a dim outline that receives the challenge with a plain arrival ripple. It shows no stored state, no code, and no reply.
- Use no lock, key, safe, vault, padlock, or cipher imagery, and never use the words encrypt, decrypt, password, or secure. The privacy idea comes from a software boundary, a dashed client region labelled `stays in client`.
- Do not show the challenge turning back into the verifier, and do not draw any backward arrow on the transform. Arrowheads point one way only, and no "irreversible" claim appears on screen.
- Use no real or realistic secret strings. Verifiers appear as an abstract cell strip plus the chip `verifier A` / `verifier B`, and challenges as `challenge A` / `challenge B`. Avoid base64-looking character runs.
- No claim of universal protection. The stage ends at "challenge sent, verifier kept". Do not suggest the attempt is now safe or complete.

## Stage (1080x1920, flow runs top to bottom)

| Element | Position | Notes |
|---|---|---|
| Title `Create a verifier`, subtitle `PKCE · S256` | y 250-420 | engine title band |
| Client region | x 80-1000, y 470-1390 | dashed rounded rectangle, label `Client` top left (52px) and `stays in client` on its lower edge (44px, mid grey), shown from beat 2 |
| Generator strip | centre (540, 600) | 8 square cells, 80px each, flicker during generation, then settle into a fixed shaded pattern. Attempt B's pattern is visibly different. Small `random` label (44px) beside it during generation only |
| Transaction table | x 140-940, y 760-980 | `store` node, two rows. Row label `attempt A` / `attempt B`, value slot holds the verifier chip. Starts empty with row B hidden |
| S256 pipeline | y 1110-1300 | three stage boxes left to right at x 260 / 540 / 820: `ASCII`, `SHA-256`, `base64url`. One-way arrows between them. Pipeline header `S256` (52px, accent) |
| Boundary crossing | wire from pipeline output (900, 1300) down through the client edge at y 1390 | the only wire that crosses the boundary |
| Authorization server | centre (540, 1620) | dim box outline `Auth server`, alpha 0.4, brightens slightly on arrival only |

Colour carries ownership: attempt A uses `info` blue on its row, cells, chips, and wire packet, and attempt B uses `accent` orange. Stage boxes stay neutral grey and turn white while working. The client boundary is mid grey.

## Legibility at 350px

At 350px wide the frame scales by 0.324. Every text element is therefore at least 44px at 1080 (about 14px on a phone), node and region names are 52px, and chips are 48px monospace. No more than six short text items are visible at once, and every label is at least 40px clear of packets and ripples. Generator cells are 80px so the A/B pattern difference still reads at 350px. Downscale each beat still to 350px with `ffmpeg -vf scale=350:-1` and read it at 1:1 before rendering the full cut.

## Beat sheet (authored at speed 1, about 44 s)

| Time | What moves | State change | Sound |
|---|---|---|---|
| 0.0-2.0 | Client region, empty table, pipeline, dim server fade in | idle stage | none (silent settle) |
| 2.0 | Row A slides into the table, label `attempt A` | new transaction record exists | `store`, note C5 (attempt A pitch), pan centre-left |
| 2.8-5.6 | Generator cells flicker in blue, `random` label shown | randomness in progress | custom `shuffle` (soft high-passed noise ticks every 0.12 s, gain 0.25) |
| 5.6 | Cells snap to a fixed pattern, `verifier A` chip forms under them, small white ripple | verifier exists | `arrive`, C5 |
| 5.6-7.6 | hold | | |
| 7.6-8.4 | Chip moves into row A's value slot, strip fades | verifier retained with attempt A | `store`, C5, then quiet `ack` |
| 8.4 | `stays in client` label fades in on the boundary, boundary pulses once | retention is private to the client | soft low pad tick, D4, gain 0.2 |
| 8.4-10.4 | hold | | |
| 10.4 | A blue dot copy leaves row A, and the chip in the row stays lit | the original stays put | `send`, C6 quiet |
| 11.0 | Dot enters `ASCII`, box goes white, then teal | step 1 | `arrive`, G4 (transform pitch) |
| 11.9-13.4 | Dot enters `SHA-256`, box white with an orange work bar filling | hash computed | `work` ticks every 0.2 s, G3 |
| 13.6 | Dot enters `base64url` | encoding | `arrive`, B4 |
| 14.2 | A small `=` cell pops off the output and fades, with chip `no =` (44px) held for 1.5 s | padding removed | `poof`, gain 0.3 |
| 14.6 | Output chip `challenge A` forms at pipeline output with a blue outline and a different chip shape (rounded pill against the verifier's square chip) | challenge derived | `chime`, G5 |
| 14.6-17.0 | hold: verifier A in its row, challenge A at the output, both blue and visibly different | two related values, one source | |
| 17.0-17.8 | `challenge A` travels the boundary wire out to `Auth server`, while row A's verifier pulses green in place | only the challenge leaves | `send` C6, then `arrive` C4 at server (server pitch, low) |
| 17.8 | Server shows a white arrival ripple only, and wire label `sent first` (44px) appears beside the crossing | challenge sent first | none beyond the arrival |
| 17.8-20.6 | hold: verifier still in row A, sublabel `kept for later` (44px) on row A | verifier retained for later exchange | quiet `ack` C5 at 18.6 |
| 20.6 | `sent first` clears, row A dims to 60% but stays populated, and the wire returns to idle | attempt A is pending and untouched | none |
| 21.4 | Row B slides in below row A, label `attempt B` | separate transaction record | `store`, E5 (attempt B pitch), pan centre-right |
| 22.2-24.6 | Generator flickers in orange | fresh randomness | `shuffle` |
| 24.6 | Cells snap to a pattern visibly different from A's, `verifier B` chip forms | distinct verifier | `arrive`, E5 |
| 24.6-26.4 | hold | | |
| 26.4-27.2 | `verifier B` moves into row B and the strip fades. Row A does not change, flash, or move | own storage, A undisturbed | `store`, E5 |
| 27.2-29.0 | hold, with a small grey `≠` badge between the two row values | verifiers differ | `ack`, E6 quiet |
| 29.0-32.4 | Orange dot runs the pipeline faster (0.5 s per stage), `=` drop repeats briefly, `challenge B` forms | same S256 transform, new input | `arrive` G4 / `work` x3 / `arrive` B4 / `chime` G5 at lower gain than A (familiar step) |
| 32.4-33.2 | `challenge B` travels out to the server, and row B's verifier pulses green in place | B's challenge sent first | `send` E6, `arrive` C4 |
| 33.2-38.0 | Final hold: row A blue verifier, row B orange verifier, both lit at full alpha, `≠` kept, `stays in client` kept, server idle | each attempt keeps its own verifier privately | single soft two-note `chime` C5+E5 at 33.6 (both attempts kept) |
| 38.0-39.0 | `s.fade` to black | finite ending | none |

Events are spaced at least 0.6 s apart. Holds of 1.8-2.8 s follow each landed beat, and no stretch runs longer than 3 s without change outside those holds. Attempt B is deliberately quicker because the viewer already knows the pipeline. Its purpose is the new row and the new pattern. If timing reviews ask for more air, stretch the holds after 14.6 and 17.8 first, keep the total between 35 and 50 s, and avoid padding the opening or the fade.

## Sound map

| Actor/event | Preset | Pitch |
|---|---|---|
| Attempt A record and verifier | `store` / `arrive` | C5, sends C6 |
| Attempt B record and verifier | `store` / `arrive` | E5, sends E6 |
| Generator randomness | custom `shuffle` via `s.sound`: noise layer, hp 2500, decay 0.03, no echo | unpitched |
| S256 stages | `arrive` G4 then B4, `work` G3 ticks, `chime` G5 at output | transform pitches |
| Padding drop | `poof` at low gain | unpitched |
| Auth server arrival | `arrive` | C4 |

Pan each cue with `s.panOf`. Nothing breaks in this lesson, so it uses no `crash` or `thump`. The loudest moment is the challenge A arrival at 17.8, which marks the beat where only the derived value leaves. Check that `max_volume` stays below -0.5 dB and that the `shuffle` ticks are audible but sit below the `arrive` notes.

## Narration and reader text alignment

The coordinator owns `lessons.json`. Suggested beat times for its update: 0 `Start attempt A. Create a fresh unpredictable verifier.`, 7.6 `Keep the verifier in attempt A's record, inside the client.`, 10.4 `S256: base64url of SHA-256 of the ASCII verifier, no padding.`, 17.0 `Send the challenge first. The verifier stays for the later exchange.`, 21.4 `A later attempt gets its own record and a different verifier.` Duration is about 39 s. These lines belong in the reader text and should not appear on screen.

## Build and verification

- Scene at `video/oauth-pkce/motion-v2/02/<variant>/`, using the repository's pinned `puppeteer-core` 25.14.0 and an engine copy local to the cut. The dashed client region, the 8-cell generator strip, and the pill-shaped challenge chip go in as general node types (`region`, `cells`, `pill`) that read animated values through `p()`. Provide a relative `render.sh`, and keep scratch frames out of Git.
- Before rendering, dry-run the timing in Node to confirm cue times match the table and that every beat has exactly one primary sound.
- Take stills at 1.0, 2.4, 4.2, 6.4, 8.8, 12.6, 14.9, 18.4, 21.8, 25.0, 27.8, 31.0, 32.9, 36.0, and 38.8. View each at full size and at 350px. Check that row A never changes after 20.6, that no verifier chip ever sits on the boundary wire, and that no code or token element appears.
- Render the full cut, then check the contact sheet, a spectrogram with a cue on every beat, volumedetect, decoding of the whole file with `ffmpeg -v error -i out.mp4 -f null -`, the duration and audio stream in ffprobe, and faststart metadata. Record whether the audio was heard or only analysed.
- Run a factual check against RFC 7636 §4.1-4.3. The S256 formula and its order are ASCII, then SHA-256, then base64url without padding. The verifier is generated per attempt with high entropy, and only the challenge goes in the authorization request. Keep this check separate from any review scores.
- A fresh reviewer compares the cut against the existing lesson 02 and the other motion-v2 alternatives before any recommendation is made.

## Risks

- The table row could read as a database or a secure vault. Keep it as a plain in-memory record styled like the `store` node, with no lock, keep it inside the client region, and use no persistence iconography.
- The `≠` badge could be read as a comparison check, which lesson 04 teaches. Keep it small, grey, and silent apart from a quiet ack. Drop it if review finds it confusing, since the colour and pattern difference already carry the point.
- The fast attempt B pipeline could feel rushed. If it does, lengthen B's stages to 0.7 s before adding anything new.
