# Cache-aside — Astra production review

Author/reviewer: **gpt-6-astra**, reasoning **high**. Date: **2026-10-19**. Final render: **2**. Title: **A hit can be stale**.

## Defect pass and improvements applied

1. **Ending hold, 28.25–30.10 (S, highest teaching impact).** Render 1 faded only 0.85 seconds after the last delivery. Extended the total duration from 30 to 31 seconds and moved fade to 30.10, leaving 1.85 seconds to register the successful cached v2 read. Inspected a revised still before rendering again.
2. **Phone legibility, 00.90–28.25 (M).** The copied engine's 26px chips and 28px subtitle would be too small at 350px width. Before the first movie, enlarged chips to 44px, subtitle to 40px, actor labels to 44–46px, revision values to 66px and outcome labels to 64px. Added a generic record panel locally; inspected all pre-render beat stills. In the final encoded 350px images, GET, MISS, cache/source revisions and the mismatch remain readable without clipping.
3. **Mechanism clarity, 18.85–23.35 (M).** Authored the refill as distinct MISS return, source request, source response, cache SET and agent delivery. This prevents an apparent automatic cache-to-source fetch or source-to-cache replication. The final sheet and full-size 20.10 frame show the request going through the tool. Raised render quality from CRF 29 to 24 after the first encode proved comfortably below the size budget.
4. **Loop closure, 00.00 and 30.97 (S).** The local engine can blank the entire frame at both ends, including its title. A full-stage fade conceals the story's new final state honestly; it does not pretend invalidation restored v1. Exact decoded-frame equality passed.

No unresolved objective visual defect was found in the reviewed samples. Numbered improvements above are applied, not awaiting approval. No additional mechanism is added to this cut: concurrency and permissions belong in the chapter and exercise. A blind comparative review remains a separate editorial task and is not implied by `verified:true`.

## What was inspected

- Before movie: seven stills at 4.70, 7.20, 12.40, 15.50, 20.50, 23.60 and 28.50; tiled overview and a full-size mismatch frame. Revised ending still at 29.80 was inspected before render 2.
- After each movie: encoded one-second contact sheet, with the scene code set aside during the visual pass.
- Final movie: 350px encoded frames at 4.70, 7.20, 12.40, 15.50, 18.70, 20.10, 23.60 and 29.50; a full 1080×1920 transit frame at 20.10. No colliding labels or misleading leftover states observed. The red agent v1 persists during recovery deliberately: its last delivered data remains v1 until 23.35.
- Spectrogram: inspected the discrete request/arrival bursts, source edit at 6.40, low stale-delivery thump at 11.80, deletion poof at 14.85, miss/refill sequence and final fade cue. Quiet sends do not overlap dense ongoing traffic. Frequency/pitch behavior is analytically checked; subjective sound quality and phone-speaker audibility were not heard.

## Verification results

`verification.json` and `timing-audit.json` are machine-readable evidence; `verify.py` reproduces these checks using sequential FFmpeg processes, each limited to two codec/filter threads.

| Check | Final result |
|---|---|
| Size / duration | 717,594 bytes / 31.000 seconds |
| Video | H.264, 1080×1920, 30/1 fps, yuv420p, 930 frames |
| Audio | AAC, 44,100 Hz, stereo; decoded maximum −10.5 dBFS |
| Whole-file decode | Passed with `-xerror -err_detect explode`; no decode errors |
| First and last decoded frame | Both MD5 `eb31442608984c1aa5939de6decc4443` |
| Streaming layout | Parsed MP4 atoms: moov before mdat (faststart) |
| Motion/state cue audit | 20 packets have departure and arrival cues; all 29 semantic text/value changes have cues |
| Encoded audio synchronization | All 43 scheduled cues contain audio; first-80ms waveform correlation against synthesized audio ≥0.93136; no timing shift applied |
| Cue-window RMS | −40.36 to −19.99 dBFS; not a loudness preference or listening test |
| Poster | JPEG extracted from encoded 12.40-second mismatch state |
| SHA-256 | `67c0dbb92269cb3aabbaca705e21bf475a5af191006f17cd6a0abab92793e3e8` |

## Honest limits

- The red highlight at 11.80 is the viewer's comparison of v1 and v2, not automatic stale-data detection. A cache hit does not check the source in this example.
- Source edit at 6.40 represents a completed independent write. The editor and invalidation trigger are abstracted; the delete at 14.10 is explicit application recovery, not a model autonomously detecting the mismatch.
- A serialized successful delete/refill does not solve stale in-flight fills, failed invalidations or replica lag. See the written exercise. The final green v2 state means matching revisions in this illustrated moment, not a permanent consistency guarantee.
- Timing, versions and the runbook example are illustrative. No measured latency, deployment, authorization implementation, agent product capability or production workload is claimed.
- **No physical listening took place.** Audio was inspected using a spectrogram, decoded levels and sample correlation.
- Self-review only; no external learner test or comparative recommendation. No other variant scenes or encoded media were inspected. Model identity is provenance, not evidence of quality.

## Local-engine notes

Only this variant's engine copy changed. Generic record panels, larger packet typography and optional full-frame loop blanking could be reviewed for reuse later; no installed-skill changes were made. `engine/node_modules` is an ignored development symlink and is not a source artifact. Source plus lockfile supports local installation. System fonts and browser versions may change rasterization between machines.
