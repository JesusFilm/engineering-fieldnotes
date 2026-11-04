# Lesson 05 — Recheck changed actions: review (render 2)

Reviewed from the encoded `video.mp4` (sha256 39988cfa…23f950). I extracted 28 encoded frames at beats and boundaries, at 1080×1920 and as true 350px downscales, and viewed several individually. I also checked the contact sheet, the spectrogram, a full decode, and window levels. Audio was analysed, not listened to.

## Fixed before handover

- Render 1 (stills), 11.1–17.6 s: the approved digest was drawn in green before comparison. Green is also the colour for "this character matches", so mid-sweep the uncompared approved characters looked already matched. Both digests now stay neutral (white approved, blue current) until each character is compared.
- Scope: plan B's new r43 approval and deployment were left out. The lesson ends at "get review", and lesson 04 already showed a matched execution.
- Engine: added a general `strcmp` node (two stacked monospace strings, per-character compare sweep with a cursor, ≠/= mark) to this cut's engine copy, built on lesson 04's local copy. Lesson 04 was not edited.

The defect pass is otherwise clean. No label overlaps a dot, cursor or outline. No highlight lingers past its beat. The r42 ledger row is identical in every frame. Production reads `r41 · calls 0 · not invoked` throughout. No packet travels toward production. The thump at 17.9 s is the loudest event (window peak −4.7 dB, against −8.2 dB for the next loudest cue).

## Suggested improvements (ranked)

1. **Show the ledger lookup key** (9.9 s, S). Saw: the lookup dot leaves the r42 row, but nothing says why r42 is the approval being checked. Change: label the lookup dot `deploy → prod` or outline the request's action/target as the lookup starts. Effect: clearer that the executor looks up the approval for this action.
2. **Shorten the opening hold** (4.2–7.0 s, S). Saw: 2.8 s still, longer than the other mid-scene holds. Change: send r43 about 0.8 s earlier.
3. **Trim the final hold** (28.3–34.0 s, S). Saw: 5.7 s still. Change: about 4 s if reviewers find it slack.
4. **Point the referral at a reviewer** (26.4 s, M). Saw: `pending review` lives only in the ledger. Change: a small `reviewer queue` label on the ledger title. Effect: names who must act next, at the cost of another label.
5. **Faster sweep** (15.0–17.6 s, S). Saw: nine ticks over 2.6 s. Change: about 2 s if the sweep feels slow; keep it long enough for the 350px viewer to follow the cursor.

## Limits

These scoped checks cover legibility, timing, and encoding. They do not show that every viewer will understand the lesson. The film compares one artifact field and does not show authentication of the stored approval, expiry or replay controls, or the outcome of the new review.
