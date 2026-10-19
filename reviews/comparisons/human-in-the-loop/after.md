# Human-in-the-loop: completed comparative review

Reviewed 2026-10-19 by **gpt-6-astra comparative review**. Recommend **astra** as the main chapter entry; keep **baseline** and **fable** as complementary mechanisms. The completed machine-readable comparison is `../human-in-the-loop.json`. Scores describe the final encoded cuts, not model reputation.

## Blind procedure and decision

`before.md` was recorded before inspecting author metadata, transcripts, source, or author reviews/scores. The supplied file order was called A/B/C. Only afterward were these mapped to baseline/astra/fable and their sources inspected. Blind viewing already preferred B for the chapter entry and identified the two concrete defects in C. Existing author scores were not needed for the decision.

Astra most directly teaches the guide’s central question: does this approval authorize this executable artifact? At 00:13.8, the two large identities and closed barrier communicate the mismatch at phone size. Fresh review at 00:17–00:21.3 leads to a new comparison and deployment at 00:25.6. Its four-second preparation sequence is a modest pacing cost; the subsequent waiting time makes the important states readable.

Baseline provides the stronger concrete operational setting: a target, checkpoint and schema prerequisite. Its successful first migration at 00:01–00:08.5 explains the normal path before a changed production prerequisite blocks the second migration at 00:18.3. It is not an A-to-B artifact substitution demonstration. The external schema change at 00:14.1 has an implicit cause, and the checkpoint text needs more attention at 350px. Ending at REVIEW REQUIRED is a correct safe handoff, although Astra supplies a more complete recovery lesson.

Fable’s cursor restart and actual duplicate inbox rows at 00:07.7–00:09.4 expose a hazard the others omit. The second sequence at 00:17.3–00:27.1 demonstrates placing the notification after the interrupt. This has greater prerequisite and visual load, making it a useful follow-on implementation lesson rather than the main introduction. The one-resume result must not be read as a general exactly-once guarantee.

## Corrections and ownership

Only Fable required a scene correction. Its notification/deployment packets previously crossed the deploy-node label, including around 00:08.8. The label now sits above those paths. Its reset from schema v8 to v7 previously looked like an unexplained rollback: a fade at 00:14.6–00:15.9 now separates the independent examples, while the visible operation reorder at 00:15.9–00:16.8 remains. The subtitle explicitly says LANGGRAPH / NODE REPLAY. Quiet transition cues were adjusted to follow visible transitions.

The local renderer uses software canvas rendering and limits FFmpeg codec/filter workers to two. Its reproduction script keeps scratch in this review directory. The final MP4 and poster replaced Fable’s canonical media only after candidate checks passed. Baseline and Astra media are unchanged.

Fable retains `model: anthropic/claude-fable-5-1` and its original reasoning metadata. Its `editedBy`, `corrections`, final hash, limitations and comparative-verification pointer record the review edits. Original author files are preserved in `original-sources/fable/`; original encoded Fable media remains in `scratch/fable-before.mp4` and `.jpg`. The revised transcript is identical in `variant.json` and `transcript.json`; the beat sheet records the transition edit. Existing author review files were not overwritten.

The written guide retains its author’s substantive teaching. Its singular “video” description now distinguishes the three mechanisms, and its source records include the retrieval date.

## Guide placement and technical evidence

**Keep/core.** This is an immediate practice for teams increasing agents’ ability to act: decide what requires review, provide inspectable evidence, and enforce the decision at execution. Guardrails and permissions are an appropriate prerequisite. The exercise has observable outcomes—stale approval causes no deployment, and duplicate resumption produces one intended effect—rather than merely asking learners to describe an approval screen. Framework-specific replay is a reference detail within this core lesson.

The following primary documents were actually opened and checked on 2026-10-19:

- [LangGraph interrupts](https://docs.langchain.com/oss/python/langgraph/interrupts): checkpointing and the same thread identify a paused run; the interrupted node restarts from its beginning. Earlier side effects can repeat. Moving effects after the interrupt, making them idempotent, or placing them in separate nodes addresses this replay hazard. Fable illustrates one resume, not every possible failure/retry.
- [LangGraph persistence](https://docs.langchain.com/oss/python/langgraph/persistence): in-memory checkpoints do not survive process restart. The guide correctly requires persistent storage for approvals that must survive worker failure; a checkpoint box in an illustration does not prove durability.
- [OWASP Transaction Authorization](https://cheatsheetseries.owasp.org/cheatsheets/Transaction_Authorization_Cheat_Sheet.html): review significant transaction details, enforce authorization server-side, invalidate authorization when relevant data changes, and connect the final check to execution. The guide explicitly labels its application to agent releases as a design recommendation. Artifact labels alone do not provide authenticated decisions, target binding or protection against concurrent changes.
- [GitHub deployments and environments](https://docs.github.com/en/actions/reference/workflows-and-actions/deployments-and-environments): protected jobs cannot access environment secrets until approval; availability depends on plan and repository visibility, and bypass settings matter. The guide correctly avoids claiming that this automatically implements the illustrated artifact-binding contract.

The guide also explicitly covers rejection/cancellation, abandoned requests, alternate credential paths, current target prerequisites and retry safety. No animation is presented as the complete implementation of these requirements.

## Transcript and encoded checks

All three textual sequences were compared with decoded frames. Baseline’s transcript correctly describes migration A succeeding, production changing while B waits, and B being blocked by a stale prerequisite. Astra’s transcript matches preparation, approval A, revision B, mismatch, fresh review and release B. Fable’s revised transcript matches the replay/duplicate, stored answer, deployment, separate example, visible reorder, single notification and title-only ending. References to sound names are supported by cue schedules and analytics, not listening.

Blind contact sheets sampled every 0.5 seconds across all three videos. Full-resolution frames and 350px frames covered causal beats, busy states, landings, holds and endings. Final frame time inventories and extracts are in `scratch/final/`; `verification.json` records their extraction times. All final 350px panels were examined, with full-size inspection of causal and corrected busy/transition states. All three canonical posters were also inspected. A transient tool display anomaly was investigated with pixel-identical re-extractions and a title crop; it was not treated as an encoded defect.

| Final cut | Duration / frames | Decoded audio peak | First/last pixels |
|---|---:|---:|---|
| baseline | 26.0s / 780 | −8.5002 dBFS | identical, black |
| astra | 30.0s / 900 | −5.7382 dBFS | identical, black |
| fable | 30.2s / 906 | −2.3124 dBFS | identical, title only |

Every final cut passed complete audio/video decoding with error escalation, H.264 1080×1920 at 30fps, yuv420p, AAC, and MP4 `moov` before `mdat` (fast start). Exact first/last decoded RGB pixels match for each cut. Final canonical SHA-256 hashes were recalculated after copying the revised Fable cut and match `verification.json` and the comparison JSON. `verify.py` reproduces the encoded checks against canonical files; `--candidate-fable` checks the saved candidate instead.

Audio was **analysed, not heard**. Floating-point decoded peaks are below −0.5 dBFS, and spectrograms plus 50ms RMS windows support event timing. All 24/41/49 scheduled cue windows respectively contain measurable energy within the following 300ms. `audio-verification.json` records those measurements. Overlapping windows cannot prove that individual sounds are perceptually distinct. No continuous real-time playback or working-executor integration test is claimed.

The comparison is complete and recommends an entry cut; it does not change shared selection/build files or publish anything.
