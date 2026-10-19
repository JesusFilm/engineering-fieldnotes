# Cache-aside "invalidate on write" review (render 3)

Reviewed from the encoded file at `public/media/cache-aside/fable.mp4` (sha256 413a095a…6ae55): per-second contact sheet, fourteen beat frames at full size and at 350 px, spectrogram, decoded-audio cue onsets. Timestamps are playback seconds.

## Fixed before handover
- Render 1, whole file: audio peaked at 0.0 dBFS (crash plus tanh saturation plus AAC overshoot). The local renderer now peak-normalises the mix to -2.5 dBFS before muxing; the encoded peak is -1.8 dBFS.
- Render 1, 0.00 s vs 31.53 s: source frames were identical but the encoded boundary frames differed by up to 53 levels (last frame was a P-frame carrying fade residual). The local renderer now uses constant QP 22 with mb-tree and adaptive quant off and forces a keyframe on the last frame; decoded boundary frames are now byte-identical.
- Render 1, size 1.98 MB: too close to the 2 MB budget. AAC at 96 kb/s with the QP change brings it to 1.77 MB.
- Render 2, 9.8–12.5 s: seven low ticks played while nothing moved (the held `SET 14d` chip was static). Each tick now squeezes the chip, so every sound has a visible event.
- Stills pass, 22.9 s: the TTL clock sat at the bottom-left far from the expiring row; moved to the empty centre between Cache and Database. The Editor phone was small next to the Agent box; scaled to 1.2 with a wider anchor pad so the wire starts outside it.

## Defect pass (clean)
Text is 26 px or larger everywhere (chips 26 px mono, rows 26 px, badges 30 px, node labels 30–36 px); nothing enters the title band (the answer badge sits at y 520, band ends at 420); the pending-write chip hides at the frame its `SET 14d` departs; no state lingers after the expiry or the final fill; the longest still stretch is the deliberate 2.9 s hold on the resolved state; all 70 cues show onset energy in the decoded AAC at their scheduled times; first and last decoded frames are identical.

## Suggested improvements
1. **Make the stall's cause visible** (9.8–12.9 s, size M). Saw: the held chip breathes with the ticks, but why the App waits is left to inference. Change: give the App a left-port spinner (reuse the database's `busy` arc at port 0) for the stall, and let the Agent box dim to 30% while it waits. Effect: the viewer reads "this request is paused" without a caption, so the late landing at 12.9 s is anticipated rather than surprising.
2. **Show the ordering spatially** (10.4–12.9 s, size M). Saw: the race is told by time alone; a viewer who blinks at 11.8 s misses that the delete arrived before the set. Change: leave the red × from the empty delete as a held mark on the row until the stale set lands, so "deleted, then overwritten" is visible in one frame. Effect: the before/after order survives a glance.
3. **Decide the colour of the first 14d answer** (13.6 s, size S). Saw: the orange `14d` badge is honest (true when read, superseded on arrival) but is the one ambiguous state in the video. Change: pulse the Database's green `7d` at the same moment, as the stale hits do. Effect: the mismatch registers two seconds earlier.
4. **Link the bar to time** (13–22.9 s, size S). Saw: the TTL bar drains for ten seconds before the clock appears. Change: fade the clock in at 20% alpha when the stale row is stored and bring it to full as the ticks accelerate. Effect: the bar reads as a timer from the start, so the expiry is expected rather than arbitrary.
5. **Close the loop with one fresh hit** (27.7–30.6 s, size M). Saw: the video ends on the fresh refill, not on the agent reading correctly from the cache. Change: replace one second of the hold with a quick `GET` → `HIT 7d` in green. Effect: the resolved state is demonstrated, not just displayed; adds about two seconds.
6. **Vary the stale repeats** (15–20.5 s, size S). Saw: the two stale hits are identical. Change: drop the second `deliver` a tone lower and widen its badge pop. Effect: repetition reads as worsening rather than as a loop glitch.
7. **A prevention cut** (whole, size L). Saw: this cut teaches the bound (TTL), not prevention. Change: a sibling cut where the cache issues a lease token on the miss, the delete voids it, and the late `SET 14d` bounces off the cache with a thump; the next read refills fresh. Effect: distinguishes "bound the damage" from "prevent the stale set", the choice the memcache paper makes. This is a different video rather than an edit to this one.

## Limitations (honest record)
- Audio was analysed (decoded peak -1.8 dBFS, per-cue onset energy, spectrogram), not listened to.
- The stall is an illustrative cause of reordering; the video makes no claim about how often it happens, and the `STALE` badge is the video's annotation, not a cache feature.
- TTL bounds staleness only when nothing refreshes the stale entry; leases or conditional writes prevent stale sets and are not shown.
- One key and one cache node; replication and multi-node invalidation are out of scope.

## Notes for the skill (not acted on)
- Packets cannot pause mid-route; a parked `badge` node stood in for a held write. A `hold` option on `s.packet` would make this direct.
- With crf 18 the encoded first/last frames of a looping video are not byte-identical even from identical sources; constant QP, `mbtree=0:aq-mode=0` and a forced final keyframe fixed it. Worth a render flag if exact loop equality becomes a standard check.
- `SFX.render`'s tanh master can leave peaks near 0 dBFS after AAC; a peak-normalise step before muxing would make `max_volume` predictable.

