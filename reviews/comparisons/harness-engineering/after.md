# Harness engineering: completed comparative review

Reviewed 2026-10-19 by **gpt-6-astra comparative review**. Recommend **astra, “Prove the patch,”** as the main chapter entry. Keep the topic **core**. Baseline and fable remain useful complementary cuts rather than redundant alternatives.

The [blind findings](before.md) were saved before reading author scenes, metadata, reviews or declared model provenance. Filenames were already supplied by the user, so this was a source/provenance-blind inspection, not a claim of perfect identity concealment. The recommendation follows the actual encoded teaching. Author review scores were not used. The [saved comparison](../harness-engineering.json) contains the final scores and exact MP4 hashes; [verification](verification.json) records the checks behind `verified: true`.

## Why this ordering helps the team

Astra exposes an acceptance contract early: the invoice owner should receive 200, while another tenant should be denied under this example’s 403 policy. At 2.55–6.60s, the same 200 becomes a pass or a failure depending on the request. This is a more useful starting point for engineers adopting agents than watching unspecified A/B tasks turn green. At 9.20–11.40s a failure goes back to the agent; the repaired patch invalidates old evidence; at 15.75 and 18.15s both checks run afresh. The 21.75–25.50s ending says READY for human review, preserving a useful distinction between check success, review and release.

Baseline teaches something Astra does not: the session ends at 9s, while the workspace and record remain. Session 2 reads progress and prepares the environment at 12–16.50s before working on B. This makes the reason for persistent artifacts visible. Its tasks remain abstract, and the short INIT/SMOKE transfers invite replay. It should follow the acceptance loop when the team asks how work survives a context/session boundary.

Fable makes the completion-claim distinction particularly explicit. DONE B at roughly 10.85s is followed by RUN, FAIL and a record that stays false through 15.85s; repair and a new pass precede the record change around 24.60s. That is a useful demonstration of who may declare work complete. It does not show the behavior under test, so Astra is the better first example. The harness-owned write is an illustrative design choice: the Anthropic account has an agent self-verify under prompted rules, which alone do not enforce this boundary.

## Final scores and remaining tradeoffs

Scores are editorial judgments of these final artifacts, not measured learning outcomes. A five means particularly strong for the stated introductory lesson, not comprehensive coverage of harness engineering.

| Cut | Clarity | Accuracy | Pacing | Visual |
|---|---:|---:|---:|---:|
| baseline | 4 | 4 | 4 | 4 |
| astra | 5 | 5 | 4 | 5 |
| fable | 4 | 4 | 4 | 4 |

Astra’s explicit expectations and newly synchronized evidence reset earn its clarity/accuracy advantage. Its large, stable labels also survive 350px presentation best. Its pacing is good, with a comparatively long final inspection hold; the repair-to-rerun gap is readable but not especially brisk. It still needs the guide’s caveat that two authorization checks cannot establish complete security.

Baseline and fable are technically defensible illustrations with more ambiguity in the pictures: A remains green after later edits, indicating stored history rather than fresh regression evidence. Their transcripts now make that distinction explicit. Baseline’s startup smoke check is similarly narrower than full regression coverage. The smaller record labels and travelling chips remain readable in inspected 350px frames, but impose more reading/tracking effort than Astra’s stable expectation/result pairs. Neither requires further media revision merely to differentiate the scores.

All three resolve their causal story before fading. Baseline holds its final record from about 22.40–25s, Astra holds READY from 21.75–25.50s, and fable holds both recorded passes from about 24.60–27s. No ending suggests that a human has already approved deployment. Exact first and last decoded frames are identical near-black RGB (3,3,3) in each file.

## Applied corrections

- **Baseline media:** added the missing “Resume work” title and HARNESS ENGINEERING subtitle. Its local engine now supports an optional full-frame fade so the title disappears with the rest of the scene. Preserved the original causal sequence and cue schedule. Rerendered and regenerated the poster.
- **Astra media:** PATCH 2 formerly appeared at 11.40s while results from PATCH 1 remained until 12.20s. Result text and colour now clear atomically at 11.40s, together with the invalidation cue. Exact frames at 11.30, 11.40 and 11.50s verify the corrected transition. Rerendered and selected a 24.50s READY poster; a transient frame with both checks green but handoff still blocked was rejected as an unhelpful static poster.
- **Transcripts:** corrected baseline’s interruption/work windows and narrowed its smoke-check claim. Clarified retained A evidence in baseline and fable. Matched Astra’s prose to the 11.40s invalidation. Fable’s scene, sound and MP4 remain unchanged, confirmed by the identical before/after hash.
- **Guide:** strengthened the exercise so the runner withholds a ready-for-review marker on failure and emits it only after the required commands succeed for the tested version. Clarified skipped/neutral required statuses and the expected status provider, alongside the existing bypass boundary. Added retrieval dates to the four source records.
- **Provenance:** retained original models; baseline’s original model remains unrecorded. Added `editedBy` and corrections metadata. Original source and media snapshots are retained in `original-sources/` and `original-media/`. Astra’s original author verification file remains historical and is explicitly superseded by this comparison’s evidence.

## Primary sources and relevance

The [source check](source-check.md) records the relevant sections actually opened in Anthropic’s long-running-agent harness account, OpenAI’s harness-engineering account, GitHub’s protected-branch documentation and OWASP’s authorization guidance. The guide remains **core** because reproducible setup, executable feedback, current evidence and inspectable handoffs matter immediately when engineers delegate changes to agents. The local exercise gives the team an observable mechanism without requiring a platform project.

The boundaries matter as much as the pattern: prompt text is not permission enforcement; a saved pass is historical; a startup check is not the whole suite; check success is not review or deployment; and a repository status control is only as meaningful as its configuration and the checks actually executed. The primary accounts support these engineering patterns, not a universal harness architecture or guaranteed agent reliability. The guide’s human-review choice is not attributed to OpenAI’s more autonomous workflow.

## Completed verification and limits

| Final encode | Frames / duration | Full decode | Audio maximum | Format / faststart |
|---|---|---|---:|---|
| baseline | 780 / 26.00s | pass | −4.8 dBFS | pass |
| astra | 840 / 28.00s | pass | −4.6 dBFS | pass |
| fable | 843 / 28.10s | pass | −6.6 dBFS | pass |

All are H.264, 1080×1920, 30fps, yuv420p with AAC, with `moov` preceding `mdat`. Every complete video/audio decode finished without errors. All peaks are below −0.5 dBFS. Final posters are 1080×1920 and were visually inspected. Renders and FFmpeg checks used at most two FFmpeg threads per process; the two renders ran sequentially. No installed skill or shared app/build files were edited.

Inspection covered initial decoded contact sheets; full-size causal and busy frames; exact 350px beat frames for every cut; final whole-timeline contact sheets; final full-size changed-cut frames; exact first/last frames; and final posters. Final evidence is under `scratch/final/`, `scratch/final-frames/` and `scratch/final-overviews/`. Contact sheets establish sequence, while individually viewed frames establish legibility; small overview thumbnails were not used to certify phone readability.

Audio was **analysed, not heard**. Decoded PCM peaks, spectrograms and cue-aligned energy windows were checked. All 33 baseline, 17 Astra and 61 fable scheduled cue windows contain energy, but nearby sounds can overlap, so this does not prove each cue’s independent audibility or subjective mix quality. Original author onset-detector claims were preserved as historical information, not represented as measurements repeated here.

There was no physical-device test, continuous real-time viewing or learner study. No real invoice application, actual test implementation, repository protection configuration or running agent was verified. `verified: true` means the stated encoded-media, transcript and source-boundary checks passed; it does not imply those broader guarantees or publication approval. No Git or publication operation was performed.
