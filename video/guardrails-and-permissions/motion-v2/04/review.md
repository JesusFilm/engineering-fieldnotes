# Lesson 04 — Review a concrete action: review (render 2)

Reviewed from the encoded `video.mp4` (sha256 26b4f367…906557). I extracted 36 encoded frames at beats and boundaries, at 1080×1920 and as true 350px downscales, and viewed several individually. I also checked the contact sheet, the spectrogram, a full decode, and window levels. Audio was analysed, not listened to.

## Fixed before handover

- Render 1, sound: the reviewer's arrival at 9.9 s (−7.0 dB window) was louder than the two match ticks (−13.7 dB) and the deploy completion (−8.8 dB), which carry the mechanism. I lowered the review arrival and raised the match acks and the completion cue. The completion at 32.2 s is now the loudest event (−5.3 dB), and the matches sit at −9.5 dB.
- Scope: plan B's refused coda (a changed target) was left out because it belongs to lesson 05, "Recheck changed actions".
- Engine: added a general `diff` node (row labels, two value columns, per-row `=`/✓/✗ mark and highlight, status line) to this cut's engine copy, built on lesson 03's local copy. Lesson 03 was not edited.

The defect pass is otherwise clean. No label overlaps a chip, dot or outline. No highlight lingers past its beat. Production stays `r41 · not started` until 30.8 s. The `read-only` badge never changes. No route connects the agent or the reviewer to production. The only stillness longer than 3 s is the deliberate final hold.

## Suggested improvements (ranked)

1. **Make the run request more visible** (22.8–24.2 s, S). Saw: the agent's request is a small blue dot in a narrow right margin, faint at 350px. Change: a larger dot or a short `run` chip that appears only at arrival. Effect: clearer that the agent asks and the executor decides.
2. **Show "agent cannot deploy" at the request** (24.2 s, S). Saw: the read-only point lands only at 34.4 s. Change: a quiet pulse on `read-only` as the request leaves. Effect: ties the request to an identity without deploy rights.
3. **Show the full-identifier compare** (26.0 s, M). Saw: the abbreviated `a91f…7c2e` could suggest a prefix check. Change: briefly expand the compared digest to a longer form inside the row highlight. Effect: more accurate, at a cost in width.
4. **Trim the final hold** (36.0–40.6 s, S). Saw: 4.6 s still. Change: about 3.5 s if reviewers find it slack.
5. **Name the reviewer** (S). Saw: `engineer` is generic. Change: a role such as `release reviewer`, if it fits 470px. Effect: clearer authority source.

## Limits

These scoped checks cover legibility, timing, and encoding. They do not show that every viewer will understand the lesson. The film shows one exact-match release and does not show authentication, trusted approval storage, or handling of mismatched or expired approvals.
