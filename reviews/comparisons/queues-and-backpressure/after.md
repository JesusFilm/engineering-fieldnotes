# Completed comparative review

Recorded 2026-10-19T00:04:44.851402+00:00. Reviewer: gpt-6-astra comparative review.

**Recommend Astra; retain the guide as reference.** The final [comparison](../queues-and-backpressure.json) contains the reader-facing rationale, six timestamped observations, four-axis scores, final hashes, corrections and limitations. [Before findings](before.md) were recorded before source/metadata inspection. A was Sol, B baseline, C Astra. The recommendation survived the later source checks and correction pass.

## Corrections and provenance

Baseline now dispatches D at 23.8s and shows it executing at 24.8s with E waiting; the prior idle-looking DONE ending implied processing had stopped. Its two transcript representations describe the unfinished batch. Renderer changes bound FFmpeg threads and add audio headroom. The original model remains unrecorded.

Sol now reports zero active execution at completion (5.5s, 21s), independently of returning ACK credit. SPACE FREED accompanies dequeue at 22.2s. C stays visibly in progress through the fade, and work ticks stop before it. Its one refusal and deliberate resubmission, original timing, valid source claims and GPT-6.1 Sol authorship remain. The former author-only review limitation is retained as historical metadata. Both corrected cuts carry editedBy attribution. Astra required no change to source, media or provenance.

## Final evidence

All three final encoded MP4s fully decoded without errors. All are H.264, 1080×1920, 30fps, yuv420p, with AAC audio and moov before mdat. Exact decoded frame zero and the final frame match per cut. Baseline/Astra close to black; Sol closes to its title. Posters are 1080×1920 and were checked visually; revised posters come from revised encodes.

| Cut | Duration / frames | Decoded sample peak dBFS | Bytes |
|---|---|---|---|
| baseline | 26s / 780 | -10.429 | 517,735 |
| astra | 30s / 900 | -8.281 | 606,634 |
| sol | 30s / 900 | -8.253 | 744,749 |

[Encoded results](encoded-verification.json) bind these checks to final SHA-256 values. Final whole-cut contact sheets sample every 0.5 seconds; all listed 350px beat frames were examined, supplemented by native-resolution frames at causal transitions, crowded states and endings. Native follow-up included the revised baseline dispatch/execution, Sol completion/dequeue/fade, Astra F dispatch and final empty queue. Exact first/last images and poster comparisons were also examined. Scratch retains the original baseline and Sol encodes and posters and the initial/final frame evidence.

The scores distinguish usefulness from correctness. Baseline is intentionally simple but has small phone labels and a long first job before any normal completion. Astra gives the clearest finite-batch result and relevant tool roles, while its last jobs run quickly. Sol gives a useful separate admission policy but its gate, ACK and return route require more attention and its long slow-B sequence leaves only time to readmit F. Accuracy scores concern the stated illustrative assumptions, not evidence of production performance or a guarantee of correctness under failures.

[Audio analytics](audio-verification.json) include cue-window energy and decoded spectrogram review. No audio was physically heard. Energy near a cue can include adjacent sounds, so this does not certify timbre or subjective balance. No audio-listening claim is made.

[Primary-source audit](sources.md) records the actual opened documents, technical boundaries, guide relevance and frame/transcript mapping. The [local exercise result](exercise-check.json) verifies bounded waiting and active execution with six jobs and a slow second job. No broker or remote tool integration was run.

## Browser check

The repository build functions generated only this topic into ignored review scratch. At 350px and 1280px, chapter and comparison have no horizontal overflow, browser errors or media load failures. Muted playback advanced for every cut; browser metadata matched dimensions and durations. The chapter selected Astra. The comparison shows all three cuts, corrected transcripts, original Sol production credit and separate revision credit. Screenshots of both layouts, each player and expanded transcripts were captured; chapter/comparison overview and Sol transcript/provenance screenshots were visually inspected. [Browser results](browser-verification.json) preserve those observations. Related chapter labels were placeholders in this isolated preview; their destinations were not tested.

To reproduce the isolated preview from repository root:

```sh
python3 reviews/comparisons/queues-and-backpressure/preview.py
python3 -m http.server 8797 --bind 127.0.0.1 --directory reviews/comparisons/queues-and-backpressure/scratch/site
# In a second terminal:
node reviews/comparisons/queues-and-backpressure/browser-check.cjs
```

The encoded check script is `python3 reviews/comparisons/queues-and-backpressure/verify.py`; it also regenerates the two revised posters. A changed encode requires renewed visual review, not merely rerunning the hash check. All FFmpeg invocations used at most two codec/filter threads.

No other topic, shared build/app file, installed skill, Git index or branch was modified. No agents were spawned and no publication operation occurred. Whole-library release checks and human editorial promotion remain the coordinator’s responsibility; this is a completed topic comparison, not a whole-library release certification.
