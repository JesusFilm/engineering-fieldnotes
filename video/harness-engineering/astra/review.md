# Prove the patch — final review

Author/reviewer: gpt-6-astra. Reasoning: high. Review date: 2026-10-19. One encoded render after preflight still inspection. Self-review, not an independent comparison. User authorized direct improvements.

## Fixed and improved before handover

1. **Readable check evidence** (00:02.55–00:23, S; applied before encoding). The base engine's 24 px secondary text would be too small for the actual HTTP outcomes. The local copy uses 52 px outcomes, 46–50 px node labels, and 40 px expected values, with greater vertical separation. Inspected six stills plus a full-resolution failure still before encoding; inspected six separate encoded 350 px images afterwards. Labels fit without collision.
2. **Expose a real counterexample** (00:05–00:09, M; applied). A generic green PASS would not distinguish transport success from the access policy. The other-tenant 200 receives a cross, a red jolt, and a crash sound while EXPECT 403 remains visible. The allowed case remains green, making the defect local and legible. Color is reinforced by check/cross marks and values.
3. **Invalidate old evidence** (00:11.40–00:18.15, M; applied). Keeping the first passing result after PATCH 2 would imply that old evidence validates new code. Both results clear with a poof at 12.20, then both execute again. The corrected denial is green because it matches the contract.
4. **Retain human responsibility** (00:21–00:25.50, S; applied). The endpoint is Human review / READY rather than deployment or an unqualified DONE. The 3.75-second final hold is intentional. The small delay between the last assertion and handoff separates collecting the result from delivering it; playback time is illustrative.
5. **Close the loop honestly** (00:00, 00:25.50–00:28, S; applied). The skill normally fades only below the title. Added an opt-in full-frame fade locally and held black at both ends, so no test state silently resets in view. Decoded first/last frames match exactly.
6. **Constrain production resources** (whole file, S; applied). Local renderer uses capped threads, scratch intermediates, compression, and audio headroom. Shared build/UI/manifests and the installed skill were not edited.

These entries describe risks found in preflight/design and the implemented changes, not six failed encoded renders. The first encoded render passed the defect inspection; no additional re-encode was needed.

## Encoded defect pass

- **00:00–00:28:** inspected the 1-second encoded contact sheet and the 36-image transition contact sheet (before/after each of 18 changes). No off-stage labels, stale result marks, or unexplained competing action found. The feedback envelope remains within the right edge.
- **00:03.50, 00:07.50, 00:10, 00:13, 00:19.50, 00:23:** viewed each encoded 350 px frame individually. Expected/actual values and short labels remain readable. Also viewed the encoded 10-second feedback frame at full resolution.
- **00:00.50–00:25.50:** 17 cues use the same schedule as visual events. Inspected the encoded spectrogram; the failure is the dominant low-frequency/noise event, with sparse isolated sends and arrivals. Decoded audio has non-silent energy within the first 180 ms of every event (RMS range −41.63 to −16.54 dBFS). This supports cue timing, not a claim about subjective loudness on a phone.
- No unplanned inactivity longer than three seconds. The resolved final hold is deliberate; the ending includes silence after the fade.

## Technical verification

`verification.json` records the exact delivered file and checksum. 28.000 s; 424,075 bytes; H.264, yuv420p, 1080×1920, 30 fps; AAC, 44.1 kHz. Full video decode: 840 frames, no decode errors. Full audio decode completed. Peak on encoded audio: **−4.6 dBFS**, below the −0.5 dBFS ceiling. Top-level MP4 atom inspection places moov at byte 32 before mdat at byte 31,452 (faststart).

Exact decoded opening and closing frame MD5: `eb31442608984c1aa5939de6decc4443` for both. Poster extracted from encoded 23-second frame. All verification is reproducible with `python3 video/harness-engineering/astra/verify.py` from the repository root.

## Remaining limits

No unresolved objective defect was found. No further teaching change was justified by this self-review; no approval request is pending. The illustration is deliberately narrow: test feedback is one part of a harness, not its complete runtime. The movie does not explain setup, permission controls, interrupted sessions, or how protected status checks are configured. Stored instructions do not enforce permissions. Two passing cases do not prove broad correctness or security; the title uses “prove” in the limited sense of producing evidence for the stated contract.

Audio was synthesized and analysed, **not physically listened to**. Quiet cue audibility, stereo presentation on speakers, and loop fatigue have not been perceptually validated. The accessible transcript supplies the semantic sequence without depending on sound or color. No learner study, live invoice-agent experiment, human editorial review, or independent comparison occurred. Only a six-frame baseline-media sheet was inspected to establish complementary scope; no other variant scene was read.
