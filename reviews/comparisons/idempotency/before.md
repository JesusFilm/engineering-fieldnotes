# Idempotency — blind encoded comparison

Recorded: 2026-10-18T23:39:23.349152+00:00. This record precedes reading scenes, transcripts, author reviews/scores, and model provenance. Filenames were supplied by the task; A/B/C below identify viewing order only. Intended teaching was read solely from content/concepts/idempotency.json. No audio listening is claimed.

Evidence: decoded half-second contact sheets across all three complete timelines, selected 1080×1920 beat/busy frames, and 350px-wide beat sequences in scratch/A, B, C. Sampling timestamps are approximate (fps-filter bin centres may differ by up to 0.25s); exact boundaries remain to check. A is 26.006s, B 30s, C 29.7s.

## First comparative findings

1. **B best matches the chapter's decision (3.8–7.5s, 10–17s).** The saved key and ticket appear together inside one database, while the caller becomes “outcome unknown” after its response disappears. Its persistent k7/v1 identity and large “1 ticket” outcome make retry identity and the distinction between commit and knowledge unusually clear. A teaches the same contract using smaller order rows and chips; C demonstrates the danger more vividly but leaves storage enforcement implicit. Provisional main-entry recommendation: B, with C as the complementary motivation.
2. **C alone shows the cost of a naive retry (5–15s versus 17–27s).** Step 2 produces #502, loses the response, and its retry creates #503; after a fade reset, the keyed retry returns #502 without adding a row. This is causally strong. However, #501/step 1 adds tracking burden, and the fade from three tickets to one at 16–17s can look like deletion unless understood as a counterfactual reset. Label the contrast as alternate runs, not a repair that removes duplicates. The outcome counters and row details are small at 350px.
3. **A and B include a valuable boundary C omits (A 17–20s; B 19–23.5s).** Reusing a key with changed parameters is rejected while the stored resource remains unchanged. B keeps v1 and v2 on screen for comparison, while A's cart B travels away and leaves a generic mismatch badge. This teaches a tool contract beyond “add a key.” None visually tests concurrent contenders, retention expiry, caller scope, or external effects; the guide must carry those limits.
4. **B has the strongest phone hierarchy (4s, 7s, 13.5s, 21.5s, 25.5s).** The key→identifier mapping, argument version, and one-ticket outcome remain readable. A is orderly at full size but its result count and bottom status are small; C's rows are legible but the key/count/step labels demand more attention at 350px. Motion is mostly single-focus in all three; C's large outcome ripple briefly crosses the database labels around 13.5s and 26.5s without hiding the decisive ticket IDs.
5. **A's ending has excess dwell (20.5–24.5s); B also waits long (25–28.5s).** A repeats the same conflict/unchanged-order picture after its answer is already clear. B deliberately dims the caller/tool and spotlights the unchanged resource, a stronger close, but holds beyond the useful 1.5–2.5s. C resolves its contrast at 26s and allows about 2.5s before fading, better paced. B's 7–10s uncertainty hold is near the upper limit but serves a difficult concept.
6. **Potential causal weakness to inspect after unblinding:** A's first path shows a lookup miss followed by an atomic write; atomicity alone is not enough for simultaneous contenders. Ensure prose does not claim the animation proves concurrent safety. B's mismatch comparison at 21s follows a prior successful lookup; it may legitimately retain the stored record, but a fresh-request lookup is not animated. C's “same step” must mean one durable scoped operation, not a globally reusable step number.

## Blind scores (provisional, before source/technical verification)

| Cut | Clarity | Accuracy | Pacing | Visual |
|---|---:|---:|---:|---:|
| A | 4 | 4 | 3 | 3 |
| B | 5 | 4 | 3 | 5 |
| C | 4 | 4 | 4 | 3 |

No forced failure or revision quota. All three have useful teaching differences. Candidate corrections are the ambiguous C counterfactual transition and A's weakly emphasized/overlong outcome, subject to source inspection. Remaining checks: full decode, exact first/last frames, codec/container/audio, source evidence, transcript-to-frame concordance, and any revised encodes.
