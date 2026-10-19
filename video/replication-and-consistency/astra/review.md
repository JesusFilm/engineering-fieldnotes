# Verify the write — final review, render 2

Author and self-reviewer: **gpt-6-astra**, reasoning **high**, 2026-10-19.
Final MP4 SHA-256: `89c73865b893097c6691f8f9fd87cd4a5510921705096952ac0cd7abea34d441`.
This is a self-review, not the independent comparative review required for a default recommendation.

## Fixed before handover

- **All beats (S): phone text.** The inherited packet type was 26 px and node detail labels were small. In the local engine, chips became 42 px and cards use 42/66/36 px label/value/detail typography. Preflight stills were inspected before encoding; final 350 px images retain readable version comparisons and state labels.
- **0.00 / 29.97 (S): loop boundary.** A stage-only fade would preserve the title and risk mismatched entry/exit. Added an optional full-frame fade locally and deliberately held both endpoints dark. All 900 decoded frame hashes were recorded; first and last hashes match exactly.
- **21.00 (S), render 1 → 2: weak replay cue.** The 140 ms decoded cue window measured −48.81 dBFS RMS, much weaker than neighboring cues. Raised only this tick's gain from 0.5 to 2.5; final window measures −34.84 dBFS. This is numerical evidence of a stronger signal, not a physical listening claim.
- **12.60 (S), render 1 → 2: insufficient sound contrast.** Raised the mismatch thump gain from 0.75 to 1.05. Final onset window is −14.77 dBFS RMS versus −16.10 for the normal matching response. The disruption now has stronger analytical emphasis; the encoded global peak remains safely below the requested ceiling.

## Teaching improvements applied directly

1. **Expose a contradictory observation (10.4–14.9, M).** Pair the returned v7 with expected v8 inside the agent card. Keep primary v8 and replica v7 visible. This makes the failure an observation mismatch rather than implying the database is broken.
2. **Keep one mutation visible (6.2–28, S).** Hold Writes: 1 through the resolution. Verification uses READ packets, so the resolution cannot be mistaken for a retry of the mutation.
3. **Resolve before catch-up (18.4–24, M).** Show VERIFIED while the replica remains v7, then show replay separately along the lower path. This makes routing the causal resolution rather than a convenient unlabelled wait.
4. **Reduce simultaneous competition (14.9–18.4, S).** Dim the replica read path and light the primary path before the next request. The eye has one operation to follow; the stale copy remains visible for comparison.

All meaningful improvements identified within the chosen lesson have been applied. There is no approval-dependent pending edit.

## Final defect pass

The preflight sheet and a full-size mismatch still were inspected before rendering. After the final encode, inspected the 1-second encoded contact sheet, all five beat images at 350 px (4.0, 8.8, 13.7, 19.6, 24.8), and the final spectrogram. In render 1, also inspected full-size encoded mismatch and packet-midpoint images at 5.8, 7.5, 12.2, 16.6, and 23.0; render 2 changes audio only. These frames were regenerated from render 2; the visual contact sheet confirms the same composition.

No clipped/overlapping labels or lingering incorrect states were found. The ACKNOWLEDGED label fits at phone width. Packet paths avoid the central status. Replica v7 stays blue/healthy during the mismatch, so red does not imply a replica outage. Meaningful changes have scheduled sound cues; cues use the same frame-aligned scene clock. Spectrogram energy aligns with sends, returns, the low mismatch event, routing sweep, replay, and close. The late catch-up hold includes the 26 s visual confirmation and acknowledgement; no unexplained still interval exceeds three seconds.

## Machine checks

- 30.000 seconds, 900 frames, 1080×1920, 30 fps, H264/yuv420p, AAC stereo 44.1 kHz.
- 495,065 bytes, below the 2,000,000-byte ceiling; poster 106,104 bytes.
- Full audio/video decode succeeds without warnings.
- Exact first/last decoded frame equality; MD5 `eb31442608984c1aa5939de6decc4443`.
- Audio peak **−6.4 dBFS**, below −0.5 dBFS.
- `moov` precedes `mdat`; faststart confirmed by atom parsing.
- All 28 cues have decoded signal energy in their scheduled windows; maximum cue timestamp rounding error on the 30 fps grid is zero. This does not measure perceived synchronization or isolated audibility of simultaneous cues.
- Reproduction script uses the local engine, locked renderer package, relative paths, isolated scratch, and sequential encoders with two threads.

Full numerical evidence is in checks.json and evidence/. The five timestamped transcript entries describe observations and the single-writer assumption.

## Honest limits and teaching boundary

No physical listening was performed. Subjective sound balance, speaker audibility, and viewer comprehension are untested. The timing is illustrative and does not measure replica lag. A fresh primary query here assumes an acknowledged commit, no intervening cache, and a single writer; it does not imply a global linearizability guarantee, external deployment completion, or automatic agent safety. Synchronous acknowledgement modes, concurrent revision reconciliation, elections and failover belong in the written chapter or separate cuts.

The example is independently authored from the original concept JSON and primary documentation; no baseline media or alternative scene was read. Cross-model comparative judgement, promotion to recommended cut, and a full shared-site release build belong to the coordinator. No Git operations or shared manifest/build/UI edits were performed. The local engine extensions are not changes to the installed skill.

## Isolated chapter preview

Used the existing shared build functions without editing them, with output redirected to this cut's scratch/site and media selection restricted to Astra. Headless Chrome screenshots were inspected at 390 px and 1280 px for the chapter and comparison template; also inspected the phone exercise and expanded transcript. Both widths have no horizontal overflow, the chapter body is 17 px, the five transcript beats render, and the video has controls, preload=none, and no autoplay. Evidence is in chapter-*.png, comparison-*.png, exercise-*.png, transcript-*.png and page-checks.json. This checks this content in the existing templates; it is not a multi-variant integration test or a full release build. Existing comparison prose/transcript sizing remains the coordinator's UI responsibility.
