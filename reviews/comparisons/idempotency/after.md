# Idempotency — completed comparative review

Completed 2026-10-19 by gpt-6-astra comparative review. The timestamped blind findings in `before.md` were saved before scene code, transcripts, author reviews/scores, or provenance were opened. The final recommendation remains **Astra**. This recommendation is editorial evidence for the coordinator; no release or publication was performed.

## Teaching judgment

Astra best connects the team's new responsibility to a visible mechanism: an agent's unknown outcome is compatible with a committed ticket, so retrying must preserve identity and arguments. Its paired database records, k7/v1 identity, returned #47, and v2 conflict remain readable at phone width. Its closing 25–28.7s hold is slower than necessary, but not a substantial defect requiring another encode.

Baseline is a useful compact order-API explanation. Its initial MISS followed by an atomic write is a sequential illustration, not a demonstration of concurrent-key safety. The guide supplies the necessary unique constraint, non-null scope/key, atomic mutation/record, and losing-transaction recovery. Its small result count and prolonged resolved ending reduce phone clarity and pacing, but the order row and parameter conflict remain understandable. The 22.1s outcome pulse qualifies the blind impression that nothing changes throughout the final hold. No mandatory change was justified.

Fable is the strongest complementary motivation: the unkeyed retry creates a visible third ticket even though the caller sees success. The safer run preserves two tickets. It asks the viewer to track more state (#501, #502, #503, two hypothetical runs), and does not teach changed-argument rejection. Its original fade reset could imply that idempotency removes committed duplicates; that ambiguity and the small count/rows warranted correction.

All three final accuracy scores are 5 for their scoped illustrative contracts, after checking the guide and primary sources. That does not mean completeness or proven concurrent correctness. The initial blind 4s were provisional pending those boundary checks. Final clarity/accuracy/pacing/visual scores are baseline **4/5/3/3**, Astra **5/5/3/5**, Fable **4/5/4/4**. These are editorial assessments, not audience-test results.

## Correction and provenance

Only Fable was rerendered. At 15.86–17.16s two outlined rewind triangles move left over the stage fade, making the alternate take explicit without adding a caption. Ticket row type increases from 32 to 40 and count type from 30 to 46. The original causal sequence, 29.7s duration, and 51 sound events remain. The transcript and beat sheet now describe an editorial rewind rather than deletion or rollback. A local engine extension renders the overlay above the fade; local renderer codec/filter stages explicitly use at most two threads.

`video/idempotency/fable/variant.json` retains `model: anthropic/claude-fable-5-1` and adds `editedBy: gpt-6-astra comparative review`, correction details, and original/final hashes. The README records relative reproduction commands. Original author verification/review files remain historical evidence; current validation is hash-bound below. Original scene/engine/metadata and encoded media are preserved in ignored `scratch/original-fable/` for local before/after inspection. The baseline and Astra media bytes are unchanged.

## Final encoded evidence

| Cut | Duration / frames | Full decode | First/last RGB | Peak dBFS | Cues / maximum onset difference |
|---|---|---|---|---|---|
| Baseline | 26s / 780 | Pass | Identical | -4.0 | 25 / 0ms |
| Astra | 30s / 900 | Pass | Identical | -7.1 | 25 / 1ms |
| Fable | 29.7s / 891 | Pass | Identical | -1.8 | 51 / 0ms |

All three are H.264, 1080×1920, 30fps, yuv420p with AAC audio and the moov atom before mdat (faststart). Their JPEG posters are 1080×1920. The 26.006s container observation in the blind note included mux padding; the baseline video stream is exactly 780 frames at 30fps.

`encoded-checks.json` contains exact final MP4/poster hashes, boundary hashes, atom positions, individual cue-window measurements, and inspected beat timestamps. `verify.py` reproduces these checks into review-local scratch using bounded FFmpeg threads. Full-stream decoding checks every encoded frame mechanically; visual inspection uses half-second sheets plus selected full-size and 350px causal/busy/end frames, not a claim to have watched every frame continuously.

The revised Fable encode was inspected across all five contact sheets and all six phone sheets, covering 2.5, 5.7, 7.5, 9.7, 10.9, 12.1, 13.9, 15.9, 16.3, 16.6, 17.2, 17.6, 19.5, 20.1, 22.1, 23.6, 24.7, 25.7, 26.5, 28.8, and 29.66s. Full-size frames specifically rechecked the two commits, lost response, duplicate state, rewind overlay, lookup, and ending. The enlarged count/rows fit without clipping; the rewind remains visible above the fade. Baseline and Astra retain their already inspected blind encodes; their exact ending images were also inspected. All first/last RGB comparisons pass.

Audio was **analysed, not physically heard**. Spectrograms and full-stream peaks were inspected. The onset comparison uses 1ms RMS windows from decoded AAC and source synthesis; all observed onset differences are below one frame. This checks encoded timing, not subjective sound quality or isolation of overlapping events.

## Guide, transcript, and browser

`source-check.md` records six primary documents actually read, retrieval dates, important technical boundaries, and each transcript's agreement with actual frames. Keep the guide **core**: stable identity and a verified retry contract matter before unattended agent writes. The implementation details can also serve as reference. No factual guide change was needed.

The unchanged shared builder was imported with output redirected to `scratch/site/`; only this chapter and comparison were generated. Headless Chrome checks passed at **1280px and 350px**: Astra is the selected chapter video, all three comparison videos load/play muted, starting another pauses the first, expanded recommendation/transcripts remain within the viewport, and no page JavaScript errors or HTTP resource failures occurred. The first scratch preview omitted the shared fonts; the scratch site was corrected to expose the existing font assets, then all four browser cases and the relevant screenshot inspections were repeated successfully. Screenshots of desktop chapter/comparison, phone chapter/guide, recommendation, findings, transcript, and the revised Fable attribution/sequence were visually inspected. `browser-checks.json` stores the machine results; screenshots are under `scratch/browser/`.

A whole-library release build/check was not run: this is a topic-scoped review, and shared outputs belong to the coordinator. No other topic, shared source/build file, installed skill, Git index/branch, or publication was changed by the substantive edits. The completed machine-readable result is `../idempotency.json`, with six timestamped comparisons and final media hashes.
