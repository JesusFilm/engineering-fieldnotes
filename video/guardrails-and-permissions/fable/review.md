# Guardrails and permissions / fable — review (render 5, final)

Reviewed from the encoded file `public/media/guardrails-and-permissions/fable.mp4` (25.41 s,
1080×1920, 30 fps, H.264 yuv420p + AAC, faststart, 1,680,645 bytes): contact sheet at 1 fps,
full-size frames at 16.4 s and 21.4 s, 350 px frames at 2.9 / 6.6 / 13.7 / 16.4 / 20.1 / 22.2 s,
spectrogram, `volumedetect`, full decode, and `verify.py` (all 14 checks pass; see
`verification.json`).

## Fixed before handover

- 11.7–13.3 s (render 1): the Tickets row text `#89 "DELETE users"` rendered as `#000089`.
  The engine tweens any string starting with `#` as a hex colour. Row texts and chips now use
  `T88`/`T89` identifiers.
- 16.2 s (render 1): the red × ripple sat on the DENY badge and obscured its text. Both check
  ripples moved onto the runtime port the call wants to use (tickets port for ALLOW, users port
  for DENY), which also shows which path opens or stays shut.
- 11.7 s onward (render 2): the closing quote of `T89 "DELETE users"` touched the row border.
  Store widened to 380 px and the text tightened.
- Whole file (render 2): decoded first and last frames differed (max channel difference 54,
  PSNR 55.5 dB) although the source frames were byte-identical; H.264 noise between the opening
  I-frame and the closing P-frame. The local renderer gained `--loop-exact` (constant QP 18,
  `no-mbtree`, `aq-mode=0`, forced IDR on the last frame). Decoded first and last frames are
  now byte-identical. Size rose from 1.35 MB to 1.68 MB, still under the 2 MB cap.
- 16.6 s onward (render 3): the Agent reverted from orange to grey two seconds after the
  injection, which read as the model recovering. The beat-2 pulse was restoring the
  pre-injection colour; the colour is now set explicitly and the Agent stays orange to the fade.
- 21.4 s (render 4): the DENIED envelope's under-label overlapped the Agent box while leaving.
  Replaced by a chip starting 40 px above the box edge.
- Box sublabels (`rules: read only`, `grant: tickets:read`) were 24 px, the legibility
  minimum; raised to 26 px in the local engine copy.

## Suggested improvements

1. **Show the write that would have happened** (16.2 s, size M). Saw: the users port closes and
   the DB dims, but the viewer never sees what a successful delete would have looked like, so the
   stakes rest on the word `DELETE`. Change: before the denial, flash a faint red ghost row on
   the Users DB that then collapses as the × lands. Effect: the loss averted becomes visible,
   making the denial feel like protection rather than an error.
2. **Second grant, allowed write** (new beat after 22 s, size L). Saw: every write is denied, so a
   viewer could conclude "runtimes block writes". Change: a second run where the Teammate's grant
   is `users:write` and the runtime allows the same call. Effect: teaches that the grant, not the
   verb, decides. Costs ~6 s and pushes the cut toward 32 s.
3. **Mark the poisoned content earlier** (11.7 s, size S). Saw: the T89 row changes text and
   colour at the same instant the read lands, so the eye may be on the runtime. Change: a 0.3 s
   orange flicker on row T89 while the request chip is still travelling. Effect: the viewer is
   looking at the row when it reveals its content.
4. **Dim the Teammate during the injected turns** (13.4–21 s, size S). Saw: the Teammate stays
   fully lit while the Agent acts on instructions the Teammate never gave. Change: 50 % alpha on
   the laptop from 13.4 s until the DENIED chip arrives. Effect: makes clear the request came from
   the content, not the person.
5. **Shorten the retry** (18.9–21 s, size S). Saw: the second `users.delete` repeats the first
   almost exactly for 2.1 s. Change: compress spacing by ~0.4 s and drop the `DENIED` chip to the
   Agent, going straight to the Teammate. Effect: the point (the grant holds regardless of the
   model's state) lands with less repetition.
6. **Grant sublabel pulse on each check** (2.8 / 10.7 / 16.2 / 19.9 s, size S). Saw: the badge
   says ALLOW/DENY but the eye is not drawn to `grant: tickets:read`, which is the thing being
   consulted. Change: brighten the sublabel for 0.3 s at each check. Effect: ties the decision to
   the grant rather than to the runtime box in general.
7. **Soften the inject hiss** (13.35 s, size S). Saw: the spectrogram shows the inject noise layer
   spanning the full band and nearly as loud as the deny thump. Change: lower noise gain from
   0.3 to 0.2. Effect: keeps the denial as the single loudest moment.

## Limitations and honest notes

- Audio was analysed (peak −1.4 dBFS, mean −28.8 dBFS, spectrogram, cue schedule vs. frame
  changes) and not listened to. Nothing in this review is a claim about how it sounds to a person.
- The scenario is illustrative. The dimming `rules: read only` shows a prompt rule being
  overridden in one run; models do not always follow injected text, and a prompt rule never
  enforces anything either way. The grant check is what holds in this cut.
- A read-only grant failing closed does not show how legitimate writes should be approved; that
  belongs to the human-in-the-loop concept and to the baseline cut's approval path.
- The DENY badge, ALLOW badge and chip texts are the only words beyond node labels; there are no
  explanatory sentences on screen.

## Notes for the skill (not acted on)

- `Track.get` treats any string beginning with `#` as a colour, so text props cannot start with
  `#`. A `kind` hint on `s.set` or a leading-escape would remove the trap.
- Looping videos cannot pass an exact first/last decoded-frame check with CRF encoding; the
  `--loop-exact` mode in this variant's `engine/render.mjs` is a candidate for the shared
  renderer.

