# Final comparative review: memory architecture

Completed 2026-10-18T22:48:17.620417+00:00. Reviewer: gpt-6-astra comparative review. The [blind findings](before.md) were recorded before any variant metadata, source, transcript, author identity, review or score was consulted. This review is scoped to this topic. [Machine-readable comparison](../memory-architecture.json) contains the recommendation, six timestamped findings, final scores and exact MP4 hashes.

**Recommend Astra as the chapter entry; retain all three cuts.** Its recall → source check → stop → refresh → action sequence is the clearest connection to the guide’s test-command exercise. Baseline is particularly useful for the separate problem of refreshing a context that already holds an old instruction. Fable supplies the complementary write-policy lesson and repeated reuse of an unapproved guess.

## Final scores and judgement

| Cut | Clarity | Accuracy | Pacing | Visual | Reason for remaining tradeoff |
|---|---:|---:|---:|---:|---|
| Baseline | 4 | 5 | 4 | 4 | Scope and explicit refresh are correct and distinct. Four nodes and smaller secondary labels require more scanning; the opening spends considerable time establishing two stores before correction. |
| Astra | 5 | 5 | 4 | 5 | Clearest command/revision comparison and causal distinction. The 16–20.2s repair compresses several actions; it is readable but may need a replay for a newcomer. Its illustrative test result is explicitly qualified. |
| Fable | 4 | 4 | 3 | 4 | Repeated retrieval makes the risk memorable. Three similar outcomes delay the remedy, and the repair has more actors. The abbreviated source + rev gate can still suggest metadata is sufficient unless read with the approved-source label and guide; the complete approval policy is not visualized. |

Scores describe the final encoded teaching experience; technical checks are independent pass/fail evidence. No score or revision quota was used. All three remain useful within their stated boundaries.

## Fixes and reinspection

Baseline’s blank title band is now labelled Memory / SCOPE & REFRESH. The inactive thread remains visible, and B stays amber from the storage change at 17.4s until the corrected reply at 21.3s. An intermediate encode exposed a pulse resetting that border colour; it was corrected and encoded again, then rechecked at 19s and the final hold. Full-canvas fading and normalized audio were added in this cut’s local engine/renderer.

Fable’s three ambiguous FAIL badges now say NO TESTS. Thread numbers identify a change of displayed scope instead of suggesting checkpoint deletion. The approved TESTS.md r13 source appears at 20.3s and supplies the correction at 24.1s; the revised path, entry/exit markers and smaller gate ripples leave the labels clear. At 25.9s the write says SAVED; at 29s the later run says RUN TESTS. Record and gate text are larger, and the complete image fades. The original seven-run timing is preserved. Its already stored bad record remains visible until replacement at 25.45s: installing the gate does not retroactively fix storage.

Astra needed no substantive encoded correction. Its bytes are unchanged from the supplied cut. Changed cuts retain their original model attribution and add editedBy and corrections metadata. Baseline’s model remains “Original prototype; model not recorded.” Original media and source snapshots are in scratch/original; original hashes are recorded in scratch/original-hashes.json. The changed posters were regenerated from final decoded frames and inspected.

## Encoded viewing record

All original contact sheets and blind phone sheets were inspected before the frozen first findings. After revision, inspected final two-frame-per-second contact sheets and all 23 final phone sheets (84 selected frames total) at 350px width, including all causal steps, busy repair frames, ending holds and exact boundaries. Full-resolution inspections include:

- Baseline: 2.2, 4.5, 5.2, 7.8, 10.3, 12.4, 14.2, 16.3, 17.8, 19.0, 21.6 and 24.0s.
- Astra: 3.4, 4.2, 6.5, 8.6, 10.9, 11.6, 13.1, 14.4, 16.2, 18.4, 19.6, 20.5, 22.4 and 23.5s.
- Fable: 2.8, 3.6, 5.8, 7.3, 8.0, 11.8, 14.3, 17.6, 20.5, 22.1, 23.8, 24.333, 24.9, 25.7, 27.3, 28.5 and 29.2s.

Selected frame numbers in verification.json are exact; timing in text is rounded where needed. Evidence lives in scratch/final/<cut>/frame_NNNN.png, phone_NNNN.png, phone_sheet_NN.jpg, contact.jpg and spectrogram.png. The repaired gate path at 24.2–25.2s is additionally covered at closely spaced selected times. Final Baseline phone sheets were regenerated and inspected after the last colour correction. No known substantial collision, unreadable causal label or false state remains in the inspected final evidence. Fable’s secondary labels are smaller than Astra’s and merit the lower visual score.

## Transcript audit against the encoded sequences

| Cut | Metadata sequence checked | Observed anchor times |
|---|---|---|
| Baseline | Thread notes; approved r1; A recall; empty B and recall; storage correction; B refresh; ending. Both transcript.json and variant.json agree. | Notes 1.8s, storage r1 4.9s, A r1 7.5s, new B 10s, B r1 13.8s, source r2 16s, storage r2 17.4s, GET 19.4s, B r2 21.3s, fade 25.5–26s. |
| Astra | Five start/end/text objects accurately separate stale retrieval, source check, stop, two-stage refresh and illustrative test result. | Source r2 6.2s, B 8.3s, recalled r1 11.3s, check 12.5s, stop 13.8s, clear 16s, store r2 18s, B r2 20.2s, run 22s, result 23.2s, fade starts 26.2s. |
| Fable | Six timestamped strings cover the seven runs. Text now describes the approved-source path and the revised outcomes; no assertion of executed failing tests or guaranteed approval. | Bad write 7.6s, NO TESTS 11.6/15.3/18.5s, source/gate 20.3s, rejection 22.1s, hypothesis in Thread 6 at 23.6s, approved send 24.1s, replacement 25.45s, SAVED 25.9s, new run 27.5s, RUN TESTS 29s, fade 31.4–32.2s. |

Read the builder’s transcript helper without modifying it: both existing string sequences and Astra’s start/end/text objects are supported. No shared build or generated site output was changed. The transcript is a textual description of the animation, not a claim of spoken narration.

## Technical and audio verification

Every MP4 decoded in full with FFmpeg error detection. Each is H.264, 1080×1920, 30 fps, yuv420p plus AAC, with the moov atom before mdat. Every pair of exact first/last decoded RGB frames is pixel-identical. All encoder/decoder work used at most two FFmpeg threads and renderers ran sequentially. Detailed results, selected frames, atom offsets and hashes are in [verification.json](verification.json); [verify.py](verify.py) reproduces the checks.

| Cut | Duration | Frames | Decoded sample peak | Non-silent scheduled cue windows |
|---|---:|---:|---:|---:|
| Baseline | 26.0s | 780 | −1.4977 dBFS | 23/23 |
| Astra | 28.0s | 840 | −4.3894 dBFS | 21/21 |
| Fable | 32.2s | 966 | −0.7066 dBFS | 45/45 |

All sample peaks are below the −0.5 dBFS ceiling. Inspected all three encoded spectrograms and measured energy in 160ms windows beginning at every scheduled cue. Audio was **analysed, not heard**. These checks establish levels and signal near scheduled events, not subjective balance, phone-speaker audibility, precise perceptual synchronization or an oversampled true-peak/loudness certification. Visual review was frame-based, not continuous real-time playback.

## Guide and publication notes

**Keep / core**, after context-engineering: the team needs ownership, provenance and a correction path as soon as it delegates recurring tasks, even with one reviewed file. The guide correctly separates scope, persistence, retrieval, approval and enforcement, and its two-session exercise is observable. See [source-check.md](source-check.md) for primary-document mappings, dates and technical boundaries.

Inspected this topic’s source notes and author documents; no evidence.md exists for this topic. Fable’s source summaries are now concise linked paraphrases, and its unsupported universal claim that session history receives no validation has been qualified. The current source notes contain no long direct quotations. Original author review measurements are marked historical, and the current beat sheet and transcripts describe the revised cut. No other topic or installed skill was edited.

No agent integration, actual test-command migration or application permission experiment was executed. Source revisions and approved-source labels are illustrative. Revision equality does not establish correctness; an application must handle approval authority, concurrent changes, retention and active-session fan-out. These limitations are preserved in the guide and final comparison. This records an editorial recommendation; no Git or publication operation was performed.
