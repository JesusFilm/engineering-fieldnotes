# OAuth PKCE lesson 04: Prove the verifier matches (plan B)

## Mechanism

At the token endpoint, the client sends code A together with its original verifier A. The authorization server finds the challenge it saved for code A, applies S256 to the submitted verifier, and compares the computed challenge with the saved one. A match passes the PKCE check and nothing more: the token endpoint still has to confirm the other OAuth conditions before it issues tokens. In a separate run, the same request with verifier B produces a different challenge, the comparison fails, the endpoint returns `invalid_grant`, and no tokens leave the server. The PKCE check stays in place after the failure.

The viewer should take away three things without reading a paragraph:

1. The server recomputes the challenge from what the client sends now and compares it with what it saved earlier.
2. The PKCE row turns green on its own, but tokens stay locked until every other row turns green too.
3. A wrong verifier turns the PKCE row red and tokens never move. The saved challenge and the check stay as they were.

Sources for the claims: RFC 7636 §4.6 (S256 recompute and compare; a mismatch returns `invalid_grant`), RFC 6749 §4.1.3 (token request checks: client authentication where required, code issued to this client, code valid, redirect URI identical when it was sent), and RFC 9700 §2.1.1. The animation shows identity only as one row ("client matches"), set apart from PKCE, and it never shows people, accounts or "access granted".

## Placeholders and on-screen text

The scene uses abstract names only: `code A`, `verifier A`, `verifier B`, `challenge A`, `challenge B`, `tokens`, `invalid_grant`. It shows no base64 strings, hashes, or anything that looks like a real secret. S256 appears as a small function box labelled `S256`.

Every word on screen must read at 350 px wide, where the frame scales by 0.324. Body labels are therefore at least 56 px at 1080 wide (about 18 px at 350), chips use 56–60 px mono bold, the comparison glyph is 110 px, and the title is 96 px. The whole frame carries about 14 short labels, and no beat adds more than two new words. Meaning never depends on colour alone: green always comes with ✓, red with ×, and the comparison uses = or ≠.

Full label list: title `PKCE check`; subtitle `TOKEN REQUEST`, which changes to `WRONG VERIFIER` for the second run; nodes `Client`, `Token endpoint`, `S256`; slot captions `saved` and `computed`; checklist rows `PKCE`, `client matches`, `redirect matches`, `code valid`; output slot `tokens`.

## Stage (1080×1920, flow top to bottom)

- Title band, y 250–420: `PKCE check` in yellow, with the subtitle below at 44 px and wide letter spacing.
- Client (laptop), centred at x 540, y 560, labelled `Client`. A dotted wire runs down to the top edge of the server frame.
- Token endpoint frame: a large box, x 90–990, y 720–1790, with its label inside the top edge. It holds five zones.
  - Saved record (store with one row) at x 300, y 880: `code A → challenge A`, with the caption `saved`. It is present from frame 0, because the lesson assumes lesson 03's binding.
  - S256 box at x 790, y 880, a small function box.
  - Comparison row at y 1090: the left slot (x 300) has the caption `saved` and the right slot (x 790) has `computed`. The = or ≠ glyph sits at x 545 between them and is hidden until the comparison.
  - Checklist (store with four rows) at x 540, y 1270–1560. The rows are `PKCE`, `client matches`, `redirect matches` and `code valid`, each 66 px tall with a status dot at the right that starts grey.
  - Token gate at x 540, y 1690: an output slot labelled `tokens`, dim with a dashed outline, joined to the client wire by a dotted return path at the right edge (x 960).
- The stage stays within y 450–1800, and the title band is never entered.

## Beat sheet (about 45 s at speed 1)

| Time | What moves | State change | Sound |
|---|---|---|---|
| 0.0–1.0 | The stage fades in with everything idle. | Saved record visible; checklist dots grey; token gate dim. | none (silence opens the loop) |
| 1.0–3.0 | The client pulses, and two chips, `code A` (white) and `verifier A` (orange), travel down the wire together, stacked, in 0.9 s. | A white ripple marks their arrival at the frame top. | `send` E6 at the client, quiet; `arrive` C5 at the endpoint |
| 3.0–4.8 | `code A` slides to the saved record, and the record glows to show the lookup. | The record row brightens and `challenge A` stands out. | `store` G4, soft (lookup found) |
| 4.8–6.5 | Hold. | Nothing changes. | none |
| 6.5–8.4 | `verifier A` drops into the S256 box. The box turns amber with a draining work bar for 0.7 s, then a `challenge A` chip leaves it and settles in the `computed` slot. | S256 goes amber, then teal, then idle. | 3× `work` low tick (A3) at 0.2 s spacing; `arrive` G4 when the chip lands |
| 8.4–9.4 | A ghost copy of the saved `challenge A` slides down into the `saved` slot, and the original stays in the record. | Both slots are full. | `send` G5, quiet |
| 9.6–10.2 | The = glyph pops in green with overshoot, and a check ripple spreads between the slots. | Comparison: match. | `chime` (G5 to C6) |
| 10.2–12.2 | Hold. | Nothing changes. | none |
| 12.2–13.0 | The PKCE row's dot turns green with ✓. | PKCE ✓; the other three rows stay grey. | `ack` C6 |
| 13.0–15.2 | Deliberate hold: the token gate gives one small grey pulse and stays dim and dashed. | Tokens are still locked even though PKCE has passed. | a muted low `thump` at very low gain, the "not yet" cue |
| 15.2–17.4 | The other rows turn green one by one, 0.7 s apart. | client matches ✓, redirect matches ✓, code valid ✓. | `ack` D6, E6, G6 (a rising run) |
| 17.6–18.4 | The token gate turns solid teal, and its outline goes from dashed to solid. | Gate open. | `recover`, short |
| 18.4–19.6 | A `tokens` chip travels up the return path to the client. | The client gets a teal ripple. | `deliver` high (E6) at the client |
| 19.6–22.0 | Hold on the resolved state. | Nothing changes. | none |
| 22.0–23.2 | The stage below the title fades to black and resets: comparison slots empty, rows grey, gate dim. The subtitle switches to `WRONG VERIFIER` while the stage is dark. | Fresh run from the same starting state. | none |
| 23.2–25.2 | The client pulses, and the chips `code A` (white) and `verifier B` (blue info colour with the letter B) travel down. | Arrival ripple. | `send` E6; `arrive` C5 (the same actor pitches as run 1, so the pattern is recognisable) |
| 25.2–26.6 | `code A` finds the saved record again. | The record shows `challenge A`, unchanged. | `store` G4 |
| 26.6–28.6 | `verifier B` goes into S256 with the same work bar, and `challenge B` lands in `computed`. The ghost `challenge A` lands in `saved`. | Slots: A on the left, B on the right. | 3× `work`; `arrive` G4; `send` G5 |
| 28.8–29.6 | The ≠ glyph snaps in red, both slot chips jolt sideways (±12 px), and a red × ripple spreads. | Comparison: mismatch. | `thump` with `miss`, the loudest moment |
| 29.6–30.4 | The PKCE row's dot turns red with × and jolts 8 px. | PKCE ×; the other rows stay grey. | `thump` low |
| 30.4–31.4 | The token gate gives a small red × ripple and a jolt, and stays dim and dashed. | Gate still locked; no tokens appear. | none extra (the thump above covers it) |
| 31.4–32.6 | An `invalid_grant` chip (red, mono) travels up the return path to the client. | The client gets a red ripple. | `deliver` low (E4) at the client |
| 32.6–34.0 | The saved record and the PKCE row each give one slow neutral pulse. | The saved challenge still reads `challenge A`, and the PKCE row is still in the checklist: the check was not removed or bypassed. | none |
| 34.0–37.0 | Hold on the failed state. | Nothing changes. | none |
| 37.0–37.6 | `s.fade` to black. | Finite ending, or a clean loop restart. | none |

At about 37.6 s this runs below the 35–50 s guideline's midpoint and inside its range. If review finds a beat rushed, add up to 1 s to the holds at 10.2 s, 13.0 s and 28.8 s, giving about 40 s. Do not pad elsewhere. If `meta.speed` 0.9 is needed for legibility, the scene reaches about 42 s and still fits.

## Sound map

- Client: E pitches. `send` E6 when it sends; `deliver` arrives at E6 for tokens and E4 for `invalid_grant`.
- Token endpoint: `arrive` C5 every time a request lands.
- Saved record: `store` G4 on lookup. It also gives the ghost copy a quiet `send` G5.
- S256 function: `work` low ticks only, so the viewer hears "computing".
- Comparison: `chime` for =, and `thump` with `miss` for ≠. The mismatch is the loudest event in the mix; keep max_volume at -1 dB or lower.
- Checklist: `ack` notes rising C6, D6, E6, G6 by row order, so a fully passing list sounds like a finished run, and a run that stops after the first row sounds cut short.
- Token gate: a very quiet thump for "still locked", and a short `recover` when it opens.

Pan each cue with `s.panOf` from its node's x position: the S256 box and `computed` slot sit right, the saved record and `saved` slot sit left, so the comparison is heard across the stereo field. Each event gets one sound, and every hold is silent.

## Motion rules

- Chips travel in 0.8–0.9 s, longer than the usual 0.6 s, so viewers can read them at 350 px while they move. A chip never crosses a label; the return path runs along the frame's right edge for that reason.
- Only one region moves at a time. Everything outside the active zone stays at full alpha and stays still. Avoid dimming the frame to 30%, because at 350 px dim grey text disappears.
- The ghost copy makes it clear that the saved challenge stays put, which is what makes the "unchanged" pulse at 32.6 s believable.
- Use no locks, keys, doors, people or shields. The gate is a software output slot with a dashed or solid outline.

## Implementation notes

- Build from the pinned repository renderer dependency, and keep any drawing extension local to this cut's directory. The checklist and record can probably use `store` rows (`row{i}Text/Color/Fill`). If `store` row text cannot reach 56 px, add a local generic `list` node type, read through `p()`, with `rowSize` and per-row `mark` values (none, check or x). The comparison glyph and slots are `label` and `badge` nodes.
- Keep the ghost copy as a separate chip node that starts on top of the record and then tweens down.
- Use `s.fade` for the reset between runs. The subtitle text changes only while the stage is black.
- Reproduce with relative commands from the variant directory, for example `node <renderer>/render.mjs scene.js 04.mp4 --sheet sheet.png`, and record them beside the scene.

## Verification

1. Dry run the timing in Node and confirm every beat in the table has exactly one cue, and that holds have none.
2. Render stills at 2.5, 4.0, 9.8, 14.0, 17.0, 19.0, 24.5, 29.2, 32.0 and 35.0 s. View each at full size, then downscaled with `ffmpeg -vf scale=350:-1` and viewed at 1:1. Every label, chip and glyph must be readable at 350 px, and none may overlap.
3. Check the boundary frames: the first frame, 22.0–23.2 (the reset leaves no green row, glyph or chip behind), and the last frame.
4. Render the MP4 and contact sheet. Make a spectrogram, run `volumedetect` (max no higher than -0.5 dB, with the mismatch peak clearly above the others), decode the whole file, and use `ffprobe` to confirm the duration, an audio stream and faststart. Record whether the audio was actually listened to or only analysed.
5. Run the review.md defect pass, fix and re-render. Then hand the encode to the fresh comparison reviewer along with the other lesson 04 variants, keeping the scores apart from fact verification.

## Lesson text for the coordinator

The coordinator owns `lessons.json` and should update item 4's duration and beats to match the render. Suggested beats:

- 0: "Submit code A with verifier A. The server has the challenge it saved for code A."
- 6.5: "Apply S256 to the submitted verifier and compare the result with the saved challenge."
- 12.2: "A match passes the PKCE check only. Tokens wait for the other checks."
- 17.6: "With every check passed, tokens may be issued."
- 23.2: "A separate request: code A with verifier B."
- 28.8: "The challenges differ. PKCE fails with invalid_grant, and no tokens are issued."

## Rejected options

- Replaying code A after its tokens were issued: the request would fail because the code was already used, which would muddy the PKCE lesson. The second run starts fresh after a fade.
- A "missing verifier" third case: correct under RFC 9700, but it adds a beat and a new idea. That belongs in a later lesson.
- Showing real-looking base64 or hash text: it suggests real secrets, and it is unreadable at 350 px.
- Captions or explanatory sentences on screen: the beat text above carries the words.

