# Blind encoded comparison — before metadata/source inspection

Recorded: 2026-10-18T23:52:34.511902+00:00. Labels A/B/C assigned to the supplied files for visual assessment. Filenames were necessarily known to the extraction script; no author metadata, scene source, transcript, prior review, score or unfinished attempt was read. The user had already disclosed one alternative’s provenance, so this is source/assessment-blind, not a claim of perfect identity concealment. Only the intended concept JSON and required repository/skill instructions informed this pass.

## Method

Decoded one-second contact sheets across each entire encode, plus targeted native 1080×1920 and 350px-wide beat frames in scratch/A, B, C. No audio listening has occurred. Container summaries report 30s, 26s and 30s respectively. Exact boundary and sound measurements remain to be checked, and findings below precede that verification.

## First comparative findings

1. **Normal service before overload:** A (0–7s) and C (0–5s) show a job traverse the queue, run and complete before the slow job arrives. B (1–14s) starts with a long-running A, so its first contrast is less immediate: there is no normal completed example before pressure. C gives the most useful first entry for the chapter’s agent-tool audience through the concrete doc-check/search-tool roles and distinct completed counter.
2. **Capacity feedback:** B (8–10s) and C (10.8–12.5s) show full queues followed by upstream FULL feedback and a producer pause, while the worker progress continues. B’s pending E is an especially economical visual marker; C uses F waiting plus a bottom status. A (15–18.5s) inserts a separate intake gate and a red return/rejection gesture; it reads as refused submission followed by retry, a potentially valid alternative policy, but not the same as awaiting one bounded put. Check the accompanying description for that distinction.
3. **What actually frees space:** B (14.6–18.8s) shows completion while the queue stays full, then a dequeue to 2/3, SPACE feedback, and E entering while B runs. C (14.5–17.5s) achieves the same with C dequeuing and F admission. A (21.2–25.5s) also changes depth at dequeue, but its persistent WORK COMPLETES label during the dequeue and subsequent RETRY are less direct. This must not become a claim that an acknowledgement itself removes waiting work.
4. **Outcome and ending:** C (17–28.5s) follows F queued → dispatching → running → complete and reaches Done 6/6 with an empty queue. This convincingly separates admission from outcome. A (25.5–28.5s) leaves D/E/F waiting and C running; that is an honest intermediate state, but it does not show F’s outcome and the progress bar reaches its end while C is still labelled running. B (23.8–25s) holds a green DONE worker with D/E still waiting: this looks like a stopped consumer, an avoidable teaching weakness. Prefer completing the finite batch or visibly continuing service before the fade.
5. **Counter consistency:** A at 6s and 21.2s labels the job DONE yet reports ACTIVE 1/1; it later drops to zero. If active means executing as the intended lesson states, this is objectively contradictory. A separate occupied-until-ack definition could make it valid, but would need explicit scope and would complicate this lesson. Correct the count at completion.
6. **Legibility/focus/pacing:** C has the clearest queue cells and the strongest phone-size labels, with no observed label collisions at 10.8, 12.5, 15.5, 16.9, 19.2 or 27.5s. Its drain accelerates after C: D/E/F each receive short runs, so this is an illustrative finite batch, not a rate claim. B’s glow, queue-row text and small DONE/depth pills are readable at native resolution but demand more phone attention than C; its 10–14s wait is deliberate worker progress, not a freeze. A is spacious and explicit about waiting versus active limits but divides focus among producer, gate, queue, worker and phase status; its 30s only reaches F admission. Its first/last sampled frames retain the title; B/C fade to blank. No cut’s final boundary is certified yet.

## Provisional decision and corrections to investigate

C is the strongest main chapter entry because it proves the full blocked-job lifecycle and uses the actual tool-workflow setting. A is a complementary admission-gate example if its refusal/retry policy is accurately named; fix its contradictory active count and stale running state. B is useful for a spare producer/worker explanation, but its stopped-consumer ending merits correction. No revision quota is being applied: C currently shows no substantial visual or causal defect requiring an edit.

Initial hashes (A/B/C):

```json
{
  "A": "c5e6125c6a1eb3ab8a1d83308f3e0966b6caa4da04bf88270e083279df62990b",
  "B": "9e445f576a7414ca6206875a385dfe042de676bb4a2d3d02e5b510a1f45f29f3",
  "C": "f0a19b81c3661c36c06c5061ab2ef2b7c62627091d7d3cfee33f8184e94eebbf"
}
```
