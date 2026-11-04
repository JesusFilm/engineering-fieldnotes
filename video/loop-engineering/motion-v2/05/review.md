# Lesson 05 review (render 1)

Reviewed from encoded frames at 38 beat and boundary times (`scratch/enc`, viewed individually at native size and at 350 px), the 350 px sheet, `scratch/key-350.png`, the contact sheet, the spectrogram, waveform and per-cue peaks. The audio was analysed, not listened to.

## Fixed before handover

- **Attempt rows rendered as `#000001`** (stills, 4.0 s onward). The row text began with `#`, so the engine's tween treated `#1  patch A …` as a hex colour and blended it into garbage. I removed the leading `#`; rows now read `1  patch A  got 119.75`. The scene carries a comment so the hazard isn't reintroduced.
- **Count highlight ran behind the quota slots** (stills, 8.4/17.0/25.3 s). The flash outline on `k used · n left` spanned the full panel width and crossed the tokens. It is now limited to the text width.

The defect pass is otherwise clean on the encode:

- All text is at least 36 px source.
- The count steps 0/3 → 1/2 → 2/1 → 3/0, each only after its result dot lands.
- Attempt 4 never edits or tests and no fourth result appears.
- No dot crosses text.
- The refusal thump is the loudest cue at −3.5 dB, with no clipping. All 52 cues register (−17.9 dB minimum).
- Holds: 2.1 s after each count, 3.2 s at exhaustion, 3.2 s after refusal, and 5.6 s on the final record.

## Suggested improvements (ranked)

1. **Show the controller's check more explicitly** (2.5 s and repeats, size S). Saw: the allowance check is a slot glow plus `allowed`, but it doesn't show what was compared. Change: briefly highlight `n left` at each check. Effect: the viewer sees the controller reading the remaining allowance before permitting.
2. **Shorten attempts 2 and 3 further** (10.5–25.3 s, size M). Saw: the repeated pattern is useful but long on rewatch. Change: trim each edit/test phase by about 0.3 s. Keep every request, check and count beat. Effect: tighter middle without hiding any step.
3. **Mark that the limit lives outside the agent** (opening, size S). Saw: the controller is a separate panel, but nothing contrasts it with the agent. Change: after the refusal, briefly pulse the agent bar while its request stays `refused`. Effect: shows directly that asking again changes nothing.
4. **Bring in the latest failure detail** (36 s, size S). Saw: `still fails: got 92.50` omits the test name. Change: add `test_discount_limit` if it fits at 36 px. Effect: a more useful handoff.
5. **Trim the final hold** (36.8–42.4 s, size S). Saw: a 5.6 s still hold. Change: trim to about 4.5 s if reviewers agree. Effect: tighter ending.

## Notes for the skill (not acted on)

- Engine hazard: `Track` mixes any two strings that start with `#` as colours, so text values beginning with `#` corrupt during tweens. A guard (for example, only treating 4/7-character hex strings as colours) would prevent this in the shared engine.
- `token` is a general quota-unit node that could join the shared engine after review.

