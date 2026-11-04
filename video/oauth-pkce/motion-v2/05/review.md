# Separate login attempts review (motion-v2/05, final render)

Reviewed from the encoded `video.mp4` (sha256 749f0a36f6148bde270ce72ee6c26140cc7148e2e2bfeae3c34ec37848feeffb). Frames were taken from a full decode to a numbered image sequence (exact frame indices, no seeking), viewed one by one at 1080×1920 and again scaled to 350 px wide, plus a 1 fps contact sheet and a log-frequency spectrogram. The audio was analysed (spectrogram, volumedetect, astats, per-cue window peaks) but **not listened to**. This is the author's own defect and teaching pass, with no comparative review or score.

## Fixed before handover

- Render 1 stills, 0.9–1.6 s and 31.1–31.7 s: the verifier chip's straight drop from the login card passed over the card's own code field. Rerouted the chip out of the card's right side and into the slot.
- Render 1 stills, server record: the `challenge` tag read small at 350 px. Raised the record key to 48 px and its tag to 44 px.
- First full render, frames 272–279 (9.07–9.3 s): during the overwrite the `login A` owner tag stayed visible after `verifier A` had cleared, so A's ownership appeared to linger on B's value. The tag now clears with the value, so the frames show A clearing, then an empty slot, then B arriving.
- First full render, 29.7–36.3 s: the closed A/B cards were dimmed to 45%, making `A failed` and `B cancelled` hard to read at 350 px. They now stay at full alpha with muted colours.
- Third render (the second was an identical re-render after a failed edit), 48–50 s: the hold-trimming wrapper shifted `pulse` and `fade` twice, because both schedule through `set`. Pulses landed early and the fade began near 48.4 s, cutting the final hold short. The two are no longer wrapped; the fade now runs 49.0–49.8 s and frame 1499 shows the title only.

Final defect pass, all clean: every label is at least 36 px source (12 px or more at 350 px wide; key values are 44–52 px). No label is clipped or covered by a resting element. No stale state remains after the overwrite, clear, or fade. Each visible event has one sound and each sound has an event (44 cues). The longest still stretches are the intended holds: 2.2 s on the wrong pair and 2.6 s on the rejection. Peak −3.38 dBFS. The film is finite and ends on the title alone, so it is not meant to loop seamlessly.

Correctness checks against the brief, by frame: the only rejected request is `code A` + `verifier B` (frames 495, 750). Code B never exists on screen. No retry of the crossed pair happens. S256 stays visible throughout, and nothing turns PKCE off. The repair starts only from two cursor presses (frames 840, 912). Verifier A never returns after 9.07 s. The matched request is the fresh `code C` + `verifier C` (frame 1398). The ending shows `other checks next` and no token (frame 1440).

## Suggested improvements

1. **Quieter mismatch cue** (23.1 s, size S). Saw: the `miss` under `≠` has a −20 dBFS window peak, the quietest cue, so on small speakers the `≠` may sound silent before the thump at 23.7 s. Change: raise its gain by about 6 dB. Effect: the comparison result and the rejection become two distinct sound events.
2. **Server S256 lights without a label for the incoming value** (19.2–20.55 s, size S). Saw: verifier B reaches the server's S256 as a violet dot, so a beginner sees colour but no name. Change: carry it as a small `verifier B` chip over the short hop from the request to S256. Effect: makes it clear that the server recomputes from the submitted verifier.
3. **Overwrite could be slower** (9.0–9.6 s, size S). Saw: the clear-and-replace takes 0.6 s; the empty slot shows only briefly between the two values. Change: hold the empty dashed slot for about 0.3 s more before B settles. Effect: the "A is gone" moment is easier to catch.
4. **Show which login a callback came from** (12.8 s and 38.4 s, size M). Saw: callback selection is shown by an amber highlight on the card's code field. Change: also pulse the owner tag of the stored row being looked up (`login B` in the bug, `login C` after the fix), so the viewer compares callback owner with row owner. Effect: makes the lookup key the visible cause.
5. **Repair section pace** (26.3–30.7 s, size S). Saw: two cursor presses fall 2.5 s apart with a short schema hold between. Change: test a 0.3 s longer hold on the new empty two-row table. Effect: the schema change lands before the fresh start pulls attention away.
6. **Final hold length** (47.1–49.0 s, size S). Saw: the result pill holds for about 1.9 s before the fade. Change: if phone viewers miss `other checks next`, extend to about 2.5 s while keeping the total under 51 s. Effect: the limit of the matched check registers.

## Notes for the skill (optional)

- A general hold-trim helper (shift every scheduled time after a cut point) would help pacing passes. It must wrap only primitive schedulers, because `pulse` and `fade` call `set` internally.

