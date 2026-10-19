# Unequal work — final encoded review (render 3)

Author/reviewer: **gpt-6-astra**, reasoning high. Date: **2026-10-19**. Self-review, with no subagent or independent comparative reviewer. Actual encoded frames, beat sheet, and spectrogram were reviewed; no other variant's authoring source or baseline media was consulted.

## Fixed before handover

- **All visible times, still pass 1:** “AGENT TOOL CALLS” overflowed its box. Widened the node from 420 to 520 px without shrinking its 44 px type. Corrected singular “1 call.”
- **12.7/16.8/20.2 s, still passes:** direct seeking intermittently lost static canvas content. Disabling the GPU alone was insufficient. The local preview now creates a fresh canvas frame and forces synchronous pixel readback using a software-oriented context. Re-inspected the complete final encoded contact sheet, and checked title presence across all 762 fully visible frames; minimum sampled yellow-pixel count 205, above the missing-content threshold. This check covers the title, not every pixel of the scene.
- **3.1–26.4 s, render 1:** previously selected ports stayed highlighted. Selection now dims the other port, so the chevron and active port agree. A's waiting wire remains amber intentionally until its queue finishes.
- **2.35–24.5 s, still pass:** arrival/completion rings approached worker labels. Moved them above the worker at y=1200 and reduced radius to 28 px.
- **Throughout, semantic review:** worker “active” labels could be confused with the balancer's outstanding count. Changed them to “running.” Q4 remains a separately visible outstanding call while queued.
- **Loop endpoints:** full-canvas fade produces exact black on both decoded boundary frames, rather than leaving compression-dependent title pixels at the seam.
- **Verification harness:** restricted frame hashes to the video stream; the first assertion had incorrectly included audio-packet hashes. Removed stale generated beat files before building each contact sheet so it cannot silently include a previous cut.

## Ranked teaching improvements applied

1. **Make the changed decision observable** (15–20.9 s, M). In the first cut, Q5 selected B, which the next round-robin turn would also do. Added Q6 after Q5 finishes: B is selected twice in succession while A remains occupied. This is the strongest causal contrast in the final cut; it now appears in both the transcript and guide.
2. **Keep the cost of earlier routing visible** (11.85–22.85 s, M). Retained Q4 on A across the policy change, then animated its local handoff only after L1 completes. The resolution cannot be mistaken for migration or retry.
3. **Establish normal work before the mismatch** (1–10.5 s, M). Two ordinary completions teach the work-bar/finish vocabulary, then equal counts of two are shown beside different occupancy. This makes a slow, healthy worker intelligible without a crash symbol.
4. **Use the available byte budget for legibility** (whole cut, S). Improved video CRF from 30 to 24 while retaining a bitrate cap; the final 635,248-byte movie remains well below 2 MB. Key labels are 44–48 px, footer 40 px, title 98 px; no explanatory paragraphs.
5. **Preserve a resolved ending** (24.5–28 s, S). The final completed state holds until 26.4, fades to black by 27, and stays black for the loop seam. Both workers finish, with unequal cumulative counts (A 3, B 4), consistent with the lesson.

The user authorized improvements directly, so these were implemented rather than left awaiting approval. No remaining objective defect was found in the inspected final images. Further concepts (health checks, overload admission, stale metrics) would require another lesson; they are documented limits, not unimplemented fixes to this film.

## Final encoded evidence

- `public/media/load-balancing/astra.mp4`: 28.000 s, 840 frames, 1080×1920, 30 fps, H.264 yuv420p and AAC stereo; **635,248 bytes**.
- MP4 box order: `ftyp`, `moov`, `free`, `mdat` — faststart verified structurally.
- Full FFmpeg decode with error escalation passed.
- Decoded first/last frame MD5 both **9b2c4088acb2c896d5d79adbe4b893ac**.
- Decoded audio maximum **−4.7 dBFS**, below the −0.5 dBFS limit. Every one of the 40 authored cues has measurable decoded signal in its onset window. Seven source/decoded PCM comparisons found strongest correlation offsets within 4.56 ms, comfortably below one 33.33 ms video frame; periodic tones can create adjacent correlation peaks, so this is not a claim of sample-perfect alignment.
- The spectrogram shows ordinary dispatch/arrival notes, a distinct low-frequency waiting thump at 11.85, rising policy-change sweep at 14.25, later Q5/Q6 completions, and a short fade sound at 26.4. **Audio was analysed, not physically listened to.** Phone-speaker audibility and subjective timbre remain unassessed.
- Viewed encoded one-second contact sheet, 18 boundary images, nine 350 px beat images (2.5, 4.4, 10, 12.7, 14.5, 16.8, 20.2, 23.2, 25 s), representative full-size encoded frames, and spectrogram through `view_image`. No clipped labels or stale queue was seen; the key two-consecutive-B contrast reads at 350 px. The full-size 20.2 s frame shows Q6 on B and Q4 still waiting for A.
- Durable visual evidence: `evidence/contact-sheet.png`, `evidence/phone-sheet.png`, `evidence/boundaries.png`, `evidence/spectrogram.png`. Exact hashes, levels, and cue checks: `verification.json` and `audio-cues.json`. The poster is extracted at 12.7 s to show the problem rather than a black loop frame.
- Final movie SHA-256: **32e1ae92f59fd2bb47eef168dfcce925a8e81c2e15e256b12f7c0a7e294b2ee0**.

## Honest teaching and production limits

This is an illustrative schedule with two identical single-slot workers and perfect visibility of their outstanding requests. “LEAST REQUEST” compares the two visible candidates; it does not demonstrate Envoy configuration, global fleet scanning, stale telemetry, unequal machines, long-lived transports, retry safety, or health checks. Routing new requests cannot make the existing scan run faster, and the queued call is not moved. Progress bars and timings are illustrative, not latency forecasts or guarantees.

The agent/tool-service example is authored, not a measurement of the team's infrastructure. No claim of improvement for every workload, or superiority to another model's cut, is made. The guide supplies the omitted operational considerations and primary-source links. No installed skill, shared manifest, build script, UI, or Git state was modified. Local dependencies stay behind an ignored node_modules symlink; copied engine source and a lockfile enable a fresh local installation. Font rendering and encoder versions can change exact bytes on another machine.
