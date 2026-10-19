# Cache-aside — completed comparative review

Recorded 2026-10-18T23:40:52.843262+00:00. Reviewer: `gpt-6-astra comparative review`.

Recommend **Astra** as the main chapter entry. Keep Baseline for the read-path primer and Fable for the stale-fill race. Keep the guide as **reference**. The recommendation was first made blind in [before.md](before.md), before author metadata/source/reviews were read; provenance was revealed only afterward. Scores below concern the final encoded files, not author identity.

## Final observations

1. Baseline 00:00.6–00:06.6 and 00:08.6–00:11.5 makes application-owned fetch/fill and database avoidance easiest to trace. Its revised TTL bar drains from insertion through the hit to expiry at 00:14.5, but no source write occurs, so this cut alone cannot teach freshness.

2. Astra 00:06.4–00:11.8 leaves v1 visible in the cache and agent after the source becomes v2. Its large version fields and HIT ≠ FRESH conclusion communicate the chapter’s central warning more directly than Baseline’s envelopes or Fable’s smaller policy rows.

3. Astra 00:14.1–00:23.35 shows explicit deletion, a subsequent miss, source read, cache fill and delivery in that order. The agent retains its old result until the new response arrives; deletion does not repair already-returned data. The editor and recovery trigger are abstracted, and this serialized success is not a concurrency guarantee.

4. Fable 00:10.2–00:13.6 holds SET 14d while a writer commits 7d and deletes the empty key, then lets the old fill land. This concrete race is absent from the other cuts and directly supports the guide’s paused-reader exercise. Enlarged values and feedback beside the row fix the original phone-legibility and value-overlap weaknesses.

5. Fable 00:15–00:22.94 shows two stale hits without renewing the entry’s TTL, then expiration. This reinforces persistence but makes the 31.57-second cut denser than Astra; 30d/14d/7d are policy values, and the clock limits this cache entry after its late insertion, not the age of source data.

6. Baseline delivers its final response at 00:22, Astra at 00:28.25, and Fable at 00:27.67. All leave a readable outcome before fading and have pixel-identical first/last decoded frames; Baseline and Fable retain their titles, while Astra returns to an empty dark frame.

## Scores (1–5)

| Cut | Clarity | Accuracy | Pacing | Visual |
| --- | --- | --- | --- | --- |
| Baseline | 4 | 5 | 4 | 4 |
| Astra | 5 | 5 | 4 | 5 |
| Fable | 4 | 5 | 3 | 4 |

Accuracy scores are within the stated illustrative boundaries, not evidence of production guarantees. Baseline's anonymous messages and lack of values make it less self-explanatory than Astra. Astra has enough repetition to establish recovery but its final successful hit could be shortened. Fable's 10.2–13.6s concurrency beat is necessarily busier; pause/replay is still useful even with the enlarged text. No forced failure or revision quota was applied.

## Changes and attribution

- Baseline: added a topic title and caller/TTL labels; made the lifetime bar drain continuously from each fill without hit renewal; rerendered and regenerated the poster.
- Baseline: used the topic-local normalized encoder with deterministic loop endpoints and at most two FFmpeg encoder/filter threads; preserved unknown original model provenance.
- Fable: moved hit/miss/expiry feedback off the policy value; enlarged row, source, badge and packet text; renamed the subtitle STALE FILL RACE; rerendered and regenerated the poster without changing causal timing.
- Fable: corrected overly broad TTL claims in lesson metadata, scene commentary, README and beat sheet; clarified policy values versus lifetime and the persistent closing title in its transcript.
- Guide: distinguished EXPIRE’s timeout-setting from later deletion, aligned exercise steps and source-fetch counts, added the primary stale-set paper, and separated a revision check from enforcement at action execution.
- Both edited cuts retain original provenance plus editedBy and corrections metadata. Original sources, author reviews and pre-edit hashes are preserved in the comparison folder.

Original scene and author data are archived in `original-sources/`; original encoded files/posters are in `scratch/original-media/`, identified in `original-hashes.json`. The original Fable model remains `anthropic/claude-fable-5-1`; Baseline's model remains unrecorded. Both edited cuts explicitly identify the comparative editor. Astra is byte-for-byte unchanged. See [content-review.md](content-review.md) for primary documents actually opened and the technical reasoning.

## Sequence-to-frame audit

| Cut | Written sequence matched against decoded frames |
| --- | --- |
| Baseline | Initial miss at 2s; database work at 3.6s; fill at 5.85s; delivery at 6.6s. Hit at 10s avoids source read; TTL continues draining to 14.5s. Next miss at 17.4s, source work at 18.95s, fill at 21.25s, delivery at 22s, stage fade and persistent title. |
| Astra | Initial v1 hit/delivery 2.55/4.45s; source edit 6.4s; stale hit/delivery 9.95/11.8s. DEL begins 14.1s and removes key 14.85s while agent retains v1. Miss 18.65s; source work 20.5s; fill 22.35s; delivery 23.35s. Final warm hit/delivery 26.6/28.25s; hold then fade from 30.1s. |
| Fable | Warm 30d hit/delivery 1.61/2.61s; commit 14d 5.06s precedes delete 5.61s. Next miss 7.67s fetches 14d, then pending SET pauses. Commit 7d 11.28s precedes empty-key deletion 11.83s; delayed 14d fill 12.94s and delivery 13.56s. Hits return stale 14d 16.94/20.44s. Expiry 22.94s; miss 24.56s; current fill 27.06s; delivery 27.67s. Hold until fade, with title/subtitle surviving at the boundary. |

The clock/bar is a separate lifetime indicator; the policy values are not lifetimes. STALE/red annotations are for the viewer and do not imply cache detection. Fable's 21.3–22.9s transcript describes the clock emphasis near the end of a TTL already draining since insertion. The unrelated tax row survives invalidation. Revised transcripts match the new encodes; no narration is claimed.

## Encoded verification

| Cut | Frames / duration | Decoded peak | Exact first/last |
| --- | --- | --- | --- |
| Baseline | 720 / 24.00s | −2.5 dBFS | identical title frames |
| Astra | 930 / 31.00s | −10.5 dBFS | identical empty dark frames |
| Fable | 947 / 31.5667s | −1.8 dBFS | identical title frames |

All three: full video/audio decode clean with error escalation; H.264 1080×1920 at 30fps, yuv420p; AAC stereo 44.1kHz; moov before mdat (faststart); sample peak below −0.5 dBFS. Hashes and exact sample times are in [encoded-checks.json](encoded-checks.json). End frames are indices 719, 929 and 946, rather than duration seeks. FFmpeg decoder, filter and encoder pools were capped at two threads.

All original and final contact sheets were inspected across the full timelines. Final phone sheets include every sampled causal beat and all endings; full-size checks include the miss/fill/hit/expiry beats, pending-set/update/delete overlap, stale outcome and recovery. Revised Baseline/Fable posters and the unchanged Astra poster were opened. All three spectrograms were inspected; cue-window energy exists at every scheduled cue. This does not substitute for listening.

Reproduce topic-only checks from the repository root with `python3 reviews/comparisons/cache-aside/verify.py` (Node, root-pinned Puppeteer for renders, FFmpeg/ffprobe, Python and Pillow). Scratch frame/audio outputs stay here. Render commands are in the edited cuts' README files. Shared release checks/manifests and publication are outside this assigned scope.

## Limits

- Audio was analysed using full decode, sample peaks, cue-window energy and spectrograms; it was not heard. Energy during overlapping cue windows does not prove each cue is individually audible or comfortable.
- Visual review used decoded half-second contact sheets across each complete duration, exact full-size and 350px beat/busy/ending frames, and exact endpoints; it was not an uninterrupted real-time viewing of every frame.
- No real cache service, deployment, concurrency implementation or team exercise was executed. Timing is illustrative and no latency, freshness, authorization or capacity guarantee is measured.
- Fable’s simultaneous operations and short write/delete transitions remain more demanding on first viewing. The second stale hit is retained as useful reinforcement; the transcript supports pausing or replay.
- Primary-source claims were checked in the relevant sections listed in content-review.md, not every page of every source. Astra’s source, metadata and media remain unchanged.
- This is a topic-scoped comparison, not a release or publication. Other concepts and shared build/app files were not modified.


## Browser verification

Generated only this topic’s chapter and comparison into `scratch/browser/` using the existing build functions and current shared assets, without writing `dist/` or editing the build/app. Headless Chrome checked both pages at 1280px and 390px: no horizontal overflow or page JavaScript errors, the chapter selects Astra, and all three encoded MP4s load with 1080×1920 dimensions and seek successfully. Desktop and phone screenshots were inspected, including the expanded recommendation, sequences and attribution. See `browser-checks.json`. This local file preview does not test deployed hosting or other chapter links.
