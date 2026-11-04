# Lesson 05 plan B: Separate login attempts

## Mechanism

One client starts two OAuth logins that overlap. The buggy client keeps one shared "saved verifier" slot. Login A stores verifier A, and the server binds code A to challenge A. Login B then overwrites the same slot with verifier B. When callback A finally arrives, the client pairs code A with verifier B. The server derives challenge B from verifier B, compares it with challenge A, and rejects the exchange (invalid_grant, no token). The repair is a deliberate client code change that stores each verifier under its own login transaction, followed by fresh logins. Exchanging fresh code A with verifier A succeeds, and code B stays with login B and is never sent with A.

The viewer should feel the overwrite: a blue value in the slot is replaced by a purple one while the blue code is still waiting. The rejection is the loudest moment. The fix should look like a change someone made to the client, then a new run.

Hard limits for the script and visuals:

- Placeholders only: "ver A", "ver B", "chal A", "chal B", "code A", "code B". No random strings, hashes, base64 or token text.
- One rejected exchange only. No retry loop, no second attempt with the same crossed pair, and no "PKCE off" toggle at any time.
- The repair has a visible cause (a client fix lands), then fresh logins. Nothing heals by itself after the rejection.
- Code B never travels to the token endpoint in this video. It stays with login B, so no viewer can read the fix as "send code B instead".
- No paragraphs, captions or physical metaphors (keys, locks, wrenches, envelopes as letters). Shapes are software state: tabs, a client box, a store table and a server table.

## Actors and colour

| Actor | Node | Colour | Pitch |
|---|---|---|---|
| Login A (browser tab) | laptop or small box "Login A", x=290, y≈610 | blue #4EA8FF on node, wires, chips | E5 |
| Login B (browser tab) | box "Login B", x=810, y≈610 | violet #B58CFF | A5 |
| Client | box "Client", x=540, y≈900, w≈620 | resting grey, white when acting | C5 |
| Client verifier store | store under the client, x=540, y≈1120, w≈760 | rows take the owner colour | store/poof |
| Auth server | box "Auth server", x=540, y≈1430, w≈620 | resting grey | G4 (lower, the authority) |
| Server records | store under it, y≈1640, 2 rows "code A ↔ chal A", "code B ↔ chal B" | owner colour | store |

Red and green are reserved for the outcome (reject, token). Orange marks the selection pointer and the client fix. A and B colours always travel together on node, row and chip, so ownership is readable without words.

## Legibility at 350 px

At 350 px wide the frame is scaled by about 0.32, so 26–30 px engine text becomes 8–10 px and is unreadable. Copy the pinned engine into video/oauth-pkce/motion-v2/05/engine and add generic size options: packet chip "size" (use 54 px), store "rowSize" and "rowHeight" (rows 50 px text, 92 px tall), badge "size" (58 px), and box "labelSize" 50 px. Node labels at 48–52 px. Keep at most about seven text items on screen at once. Chips sit beside wires, never over a row label, and at most two moving chips at a time. Title "Separate login attempts" and subtitle "PKCE · TWO LOGINS" stay in the title band only. Verify by downscaling every beat still to 350 px wide and reading each word from that image.

## Beat sheet (speed 1, about 44 s)

| Time | What moves | State change | Sound |
|---|---|---|---|
| 0.0–1.6 | Stage fades in: two tabs, client, empty one-row store labelled "saved verifier", server with empty records | Store row shows a dim dash | quiet low pad tick (clock preset, gain low) |
| 1.6–3.0 | Login A pulses; a blue "ver A" chip appears in the client and drops into the single row | Row fills blue "ver A" | send E6 then store E5 |
| 3.0–4.6 | Blue "chal A" chip runs client → Login A → server | Server row 0 fills blue "code A ↔ chal A" | send E6, arrive G4 |
| 4.6–6.0 | Blue "code A" chip runs server → Login A and parks beside tab A, gently breathing | Tab A sublabel "waiting"; code A visibly not yet at the client | arrive E5 (soft) |
| 6.0–8.0 | Hold | A owns ver A at the client and code A in its tab | none |
| 8.0–9.4 | Login B pulses; a violet "ver B" chip appears in the client and moves to the same row | The row flashes orange, "ver A" text shrinks and falls out with a small grey poof, the row turns violet "ver B" | send A6, poof (distinct dull), store A5 |
| 9.4–11.2 | Violet "chal B" runs client → Login B → server | Server row 1 fills violet "code B ↔ chal B" | send A6, arrive G4 |
| 11.2–12.4 | Violet "code B" runs to Login B and parks there, dimmed to 60% | Code B is waiting in its own tab and stays there for the rest of the video | arrive A5 (soft) |
| 12.4–15.0 | Hold. A thin dashed blue line from parked code A to the client row pulses once to show what A will need; the row is violet | Colour mismatch is the only motion: blue code, violet verifier | one low clock tick |
| 15.0–16.4 | Callback A: blue "code A" runs tab A → client | Client turns white; orange pointer selects the single row | arrive C5 |
| 16.4–18.2 | A paired chip "code A + ver B" (blue half, violet half) runs client → server | Server lights white | send C6 |
| 18.2–19.6 | Server derives "chal B" (violet chip pops from the pair) and slides it beside row 0 "chal A" | Row 0 flashes orange during the compare | work ticks ×3 |
| 19.6–20.4 | Reject | Row 0 snaps red, server jolts (±14 px), red ripple with ×, badge "invalid_grant" pops red below the server; small red dot returns to the client; no token chip ever appears | crash (loudest event, about -6 dB peak) |
| 20.4–23.4 | Hold on the failed state | Client store still violet; tab A code dims grey to show attempt A is spent | none |
| 23.4–25.0 | Clear: red badge, crossed chips and old server rows fade; parked code A fades out | Stage returns to empty tables; parked code B also fades (that whole run is abandoned) | poof ×1 (single, quiet) |
| 25.0–27.4 | Client fix lands: an orange outlined chip "client fix" drops onto the client edge; the store relabels to "verifier per login" and splits from one row into two rows keyed "A:" and "B:" | Visible deliberate change, with a two-step sound so it does not read as automatic | thump (soft) on landing, store on split |
| 27.4–28.6 | Hold on the new two-row table | Empty keyed rows | none |
| 28.6–31.4 | Fresh logins overlap fast: tab labels become "Login A" and "Login B" again with a ripple; "ver A" lands in row A, then 0.8 s later "ver B" lands in row B; row A stays blue | Both verifiers present at the same time; nothing overwritten | store E5, store A5 |
| 31.4–33.6 | Compressed challenges: "chal A" and "chal B" run to the server; server rows fill; codes return and park in their own tabs | Same layout as the bug, now with no loss | send E6/A6, arrive G4 twice (quiet) |
| 33.6–35.2 | Callback A: "code A" runs to the client; orange pointer selects row A specifically, row B stays violet and untouched | Lookup by transaction | arrive C5 |
| 35.2–37.0 | Paired chip "code A + ver A" (all blue) runs to the server; "chal A" derived chip slides beside row 0 "chal A" | Compare | send C6, work ticks ×2 |
| 37.0–37.8 | Match | Row 0 turns green, green ripple with check, badge "token" pops green and runs back to the client | chime (C–E) |
| 37.8–41.0 | Final hold: row A used, row B still waiting with code B parked in tab B | Resolved state readable; B is intact and unsent | none |
| 41.0–42.0 | s.fade to black | Finite ending | none |

## Sound map

Actor pitches come from one chord so the A/B pattern is audible: A sends ring at E, B at A, the client at C and the server lower at G4. Sends are quiet octave-up ticks, arrivals are mallet notes. The overwrite gets its own dull poof plus a B store note, so the listener hears an A sound being replaced by a B sound. The rejection crash is the loudest cue and the only noise burst. The client fix uses a soft thump followed by store, distinct from the automatic-sounding chime, and the final chime only plays on the matched exchange. Pan each cue with s.panOf on its node so A sounds sit left and B sounds sit right. Keep peaks below -1 dBFS.

## Layout notes

Flow runs top to bottom: tabs at y≈610, client at ≈900, client store at ≈1120, server at ≈1430, server records at ≈1640, badge to the right of the server (x≈880) to avoid the record table. Wires: tab A ↔ client, tab B ↔ client, client ↔ server (straight), and tab ↔ server via the side (x≈130 and x≈950) for the authorization leg, so challenge chips never cross the client store. Parked codes sit just under each tab at y≈720.

## Production and verification

1. Scene at video/oauth-pkce/motion-v2/05/scene.js with the local engine copy; beat-sheet.md beside it from this table.
2. Node dry run: confirm duration about 42 s and every beat has exactly the cues listed.
3. Stills at 1.5, 5, 9, 13.5, 17.5, 20, 22, 26.5, 30, 34, 37.5, 40; view each at full size and downscaled to 350 px; reject any word that cannot be read at 350 px.
4. Check that no frame shows code B moving toward the server, that only one rejected exchange occurs, and that no frame shows PKCE disabled.
5. Render, contact sheet, spectrogram, volumedetect, ffprobe duration and audio stream; decode the whole file. Record whether the audio was listened to or only analysed.
6. Pass 1 defect review, then the comparison review per docs/editorial-workflow.md. This plan does not register media, edit lessons.json or touch shared manifests; the coordinator owns those.

## Risks

The paired split chip and derived challenge chip are new drawing work; if the split chip hurts legibility, use two adjacent chips moving together. The 42 s length exceeds the lesson's current 28 s beat times, so lessons.json beat times will need coordinator updates (suggested 0, 8, 15, 25). The fade ending is final, and the video should not be presented as a seamless loop.

