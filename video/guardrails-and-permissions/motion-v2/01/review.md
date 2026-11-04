# Lesson 01 — Intent versus permission: review (render 2)

Reviewed from the encoded `video.mp4` (sha256 5c4c07a1…77e5f): 26 encoded frames at beats and boundaries at 1080×1920 and as true 350px downscales, the contact sheet, the spectrogram, a full decode, and audio levels. Audio was analysed, not listened to.

## Fixed before handover

- Render 1, 18.5–37 s: the red `deploy prod` row sat under "grants for investigator" with no key and could read as a grant the identity holds. Added row keys `has` (read logs ✓) and `needs` (deploy prod — no grant), so the lookup reads as a missing grant.
- Pre-render: stock chip text (26px, about 8px at 350 wide) and the 104px title (too wide for "Intent vs permission") would have failed phone legibility. The cut-local engine got chip `size` (38px used) and `meta.titleSize` / `subtitleSize`. A general `panel` node gives key/value rows at 38–52px.

The defect pass is otherwise clean. Every beat has a sound and a visible state change. No label overlaps a chip or ripple. No highlight lingers past its beat. `calls 0` and `r41` are constant in every sampled frame. The only stillness longer than 3 s is the deliberate final hold. Peak is −4.8 dBFS.

## Suggested improvements (ranked)

1. **Larger closed-route mark** (25.2 s, S). Saw: the grey × on the connector is the engine's fixed 13px ripple mark, small at 350px. Change: a local ripple-mark size option, about 24px radius. Effect: the never-invoked route becomes visible on a phone.
2. **Show identity arriving from the session** (10.5 s, M). Saw: `from session` is a static tag. Change: a short dot from the boundary title edge into the identity row as it fills. Effect: it shows the identity comes from the application, not from the request.
3. **Make the instruction visibly inert during the denial** (19.7 s, S). Saw: the instruction row is unchanged while the denial lands, which is correct but easy to miss. Change: a faint grey pulse on the instruction at the thump, with no sound. Effect: sharper contrast between "this did nothing" and "this decided".
4. **Shorten the final hold slightly** (31.7–37 s, S). Saw: 5.3 s of complete stillness. Change: trim to about 4 s if a reviewer finds it slack. Effect: tighter close without losing the summary state.
5. **Restore the checkout/prod target** (S). Saw: the target was simplified to `prod` for width. Change: use `checkout/prod` on a second line if the series wants resource specificity. Effect: stresses that the denial applies to one action on one resource.

## Limits

These scoped checks cover legibility, timing, and encoding. They do not show that every viewer will understand the lesson. The scene assumes all execution paths go through this check (complete mediation) and does not show fail-closed behaviour when the check is unavailable.
