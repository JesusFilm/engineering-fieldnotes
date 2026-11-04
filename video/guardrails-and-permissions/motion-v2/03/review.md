# Lesson 03 — Policy and permission: review (render 3)

Reviewed from the encoded `video.mp4` (sha256 b54d9868…966109). I extracted 30 encoded frames at beats and boundaries, at 1080×1920 and as true 350px downscales, and viewed several individually. I also checked the contact sheet, the spectrogram, a full decode, and window levels. Audio was analysed, not listened to.

## Fixed before handover

- Render 1 (stills), 6.3 s and 19.1–20.2 s: the outline around a newly revealed value clipped the small key label above it (`criterion`, `identity · from session`). I spread each key/value pair, shortened the highlight box (row height 58 → 52), and raised key text from 34px to 36px.
- Render 2, 11.0 s: the green acceptance ripple crossed the `ACCEPTED` text. I removed it, since the verdict outline already marks the moment.

The defect pass is otherwise clean. Every state change has a sound. The `thump` at 22.9 s is the loudest event (window peak −3.6 dB, against −6.9 dB for the next loudest cue). No highlight lingers past its beat. `calls 0`, `not invoked` and `r41` hold in every frame. No packet travels toward the deploy service. The only stillness longer than 3 s is the deliberate final hold.

## Suggested improvements (ranked)

1. **Show "no grant created" at the acceptance** (11.0 s, S). Saw: when ACCEPTED appears, the permission column stays dim, which is correct but passive. Change: a faint grey pulse on the empty `grant` row as ACCEPTED lands, with no sound. Effect: makes "acceptance grants nothing" visible before the permission check runs.
2. **Larger closed-route mark** (26.0 s, S). Saw: the engine's 13px ripple × is small at 350px. Change: a local ripple-mark size option. Effect: easier to see that execution never started.
3. **Shorten the opening hold** (2.3–3.6 s, S). Saw: the empty decision record holds before A1 moves. Change: start the A1 send about 0.6 s earlier. Effect: quicker start without losing reading time.
4. **Trim the final hold** (31.3–36.6 s, S). Saw: 5.3 s still. Change: about 4 s if reviewers find it slack.
5. **Mark the meter's threshold** (9.0 s, M). Saw: 0.82 has no reference point. Change: a small tick marked `threshold`, if the editorial line accepts an illustrative threshold. Effect: explains why the judgment accepted, at the cost of one more label.

## Limits

These scoped checks cover legibility, timing, and encoding. They do not show that every viewer will understand the lesson. The film shows one judgment-type guardrail; deterministic guardrails exist, and the check order varies between systems.
