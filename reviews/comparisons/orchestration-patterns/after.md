# Final comparative findings — orchestration-patterns

Blind evidence was recorded first in before.md. Inspection mapping, disclosed after that record: A = baseline; B = fable; C = astra. Original author model and reasoning fields were read only after the blind record. They are provenance, not scoring evidence. No prior author scores were used to select a recommendation.

## Recommendation and relevance

Recommend **astra, Join the checks**, as the main chapter entry. It teaches the operational contract this team needs: two reviews share one snapshot, a partial join cannot approve, failure stays visible, and repaired code needs fresh evidence before a distinct human decision. Baseline remains a clear primer on overlapping independent work and the separate cost of reconciliation. Fable adds the most useful complementary lesson: discover dependencies before fan-out, forward the prerequisite result, and validate the completed artifact.

**Keep/core.** The written guide is useful early because it changes how engineers delegate reviews and accept results. Tool boundaries and evaluation criteria are appropriate prerequisites. Its observable exercise deliberately injects missing, conflicting and stale reports and compares against a single-agent baseline. It does not require building a dynamic planner. Source support and the limits of that support are recorded in sources.md; no model effectiveness benchmark was run.

## Corrections and encoded confirmation

1. Fable, **6.3s through 15.4s**: replaced lingering green tests/docs with amber stale results before the field/handler edits. The hidden-dependency scenario now shows that fixing the handler does not magically refresh old validation. Its green orchestrator pulse is completion of that task, not approval of the patch; the transcript says so.
2. Fable, **22.8–26.9s**: the handler finishes and reports back before tests are dispatched at 23.85s. The tests result appears at 25.9s and returns before the final join. This corrects the original solution's concurrent validation of an unfinished handler. The final success holds from 26.9 to 29.1s, with a fade ending at 29.7s and a 30s total duration.
3. Fable, **15.95–17.6s**: reset both worker labels and colors with the code, removing a stale green rename-field state from the next scenario. Checked the new reset at full size and 350px.
4. Astra, **15.15–17.5s**: added a red notice from the blocked join to the approver. It arrives at 15.95s and changes the human's state to REPAIR while the join remains BLOCKED. The following snapshot reset clears both results. A red failure report is distinct from the later green approval-ready bundle.
5. Transcripts now follow the encoded sequences. Baseline's parallel second report arrives at 18.95s and reconciliation completes at 20s, not a later generic interval. Fable's green bracket is dotted in the actual engine, so the former 'solid' wording was corrected. Astra's failure visibility is now a visible event rather than a prose-only qualification.
6. The guide explicitly separates GitHub API token permissions from filesystem/tool access and notes the conditional exceptions to prerequisite success. Retrieval dates were added to the three source links.

Original MP4s, posters and top-level author files were copied to scratch/original before edits; original-hashes.json anchors that archive. Existing author reviews and their claims remain historical. Edited variants retain original model/reasoning and carry editedBy = 'gpt-6-astra comparative review' plus corrections. Baseline media/source are unchanged; transcript-only attribution is separate.

## Comparative assessment

| Cut | Clarity | Accuracy | Pacing | Visual | Evidence and practical limit |
| --- | --- | --- | --- | --- | --- |
| baseline | 4 | 4 | 3 | 4 | 1.3–11.5s versus 14.3–20s makes overlap and the join explicit, with the same illustrative task durations. Reconcile visibly does work after 2/2. But no failure, snapshot identity or human decision is shown; 23.3–26s is an unnecessary blank tail. |
| astra | 5 | 4 | 4 | 5 | 13.25–17.5s teaches incomplete, blocked and human-visible failure; 17.5–26.3s shows fresh checks after repair and separate approval. Labels remain clearest at 350px. Schema validation, evidence inspection and timeout handling remain abstract; the first approval hold is only about 1.35s. |
| fable | 4 | 4 | 4 | 3 | 8.9–13.2s makes a field/handler mismatch and rework concrete; 20.5–26.9s now sequences both the handler and its validation. Four code rows, changing worker tasks and the dependency bracket need more reading at 350px than either alternative, though text is readable at full resolution. |

Scores assess the final encoded teaching, not model capability or author independence. Accuracy 4 reflects bounded, explicit abstraction rather than a remaining known false technical assertion. No cut alone proves the full guide's acceptance contract. They are complementary, not a maturity ladder.

## Verification and unresolved limits

The review used decoded one-second contact sheets for the full duration, full-resolution beat and busy frames, 350px panels, and boundary frames around dispatch, arrival, invalidation, failure, reset, success and fade. Final verification.json records the actual final file hashes, full-decode results, stream properties, MP4 box offsets, decoded audio sample peaks and exact first/last YUV frame hashes. All three pass H.264, 1080×1920, 30fps, yuv420p, AAC and faststart checks. The fable title remaining at the end is deliberate: its exact opening frame contains the same title. The initial blind concern about its loop is therefore resolved without a title edit.

Audio was analysed, **not heard**. Spectrograms show activity at the intended phases and stronger broadband failure/reset events; cue windows contain decoded signal. Signal in an overlapping cue window cannot establish individual cue audibility, timbral comfort, or phone-speaker quality. Fable has substantially denser work ticks (101 cues) than astra (42) or baseline (39). This is a listening limitation, not a fabricated listening pass.

The videos are illustrative and contain no measured latency/cost/quality claims. Fable assumes its docs task is independent of the renamed field; API docs consuming that field would need sequencing too. Separate diagram rows do not enforce isolated writes. Astra's conservative rerun of both checks is this exercise's policy, not a universal invalidation rule. Actual review reports need evidence and snapshot validation; green PASS alone is not correctness. None of the cuts depicts timeout/retry exhaustion or contradictory report reconciliation.

Remaining optional teaching improvements: baseline could shorten its 23.3–26s empty tail; fable could devote a future cut to only the field/handler dependency with larger code rows; astra could show one rejected old-snapshot report in a separate extension. These are not prerequisites for retaining the current alternatives. Curriculum promotion and application defaults remain outside this saved comparison; no shared manifest, app build, Git or publication operation was performed.
