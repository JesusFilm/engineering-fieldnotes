# Read your write — final encode 3

Reviewed 2026-10-18T23:50:22Z (19 October in Pacific/Auckland). Self-review, with encoded frames and the beat sheet; no subagent or fresh comparative reviewer. This is a verification of one independent cut, not a recommendation over other models.

Final movie SHA-256: `1b7fa8cb0ff6514ca35c237c756cdf31ff5e18d346ed69b27f83a6f8f45d6e5e`.
Poster SHA-256: `452f75fcb54ef3a9cd4969006de42f2ea9a90b683238a8b4d4eed262b0510936`.

## Defects fixed before handover

- **6.5–9.0 s, pre-render layout:** the write/ACK route initially ran too close to the left edge for wide chips. Moved its vertical segment to x=165 and approached the primary from above. Reviewed at 6.95 and 8.55 seconds: chips remain inside the frame.
- **4.1–4.9 and 18.6–19.4 s, pre-render layout:** an auxiliary copy label crossed the tool packet's path. Removed it and used the short title-band label ASYNC REPLICATION. The separate orange database-to-database path carries the copy mechanism.
- **0 and 31.9667 s, encode 1:** title-only source boundaries did not decode to exactly equal pixels after lossy encoding. Extended the local fade to the full canvas. Encodes 2 and 3 pass byte-for-byte RGB equality on all 6,220,800 RGB bytes per frame, rather than a perceptual similarity threshold.
- **15.5 s, encode 2:** the request chip overlapped the check label during launch. Increased the agent/check/tool cards from 170 to 220 px high and separated their labels and state values to create a central packet corridor. Re-rendered; the final moving-frame sample and phone boundary sheet show clear text.

## Teaching improvements applied, ranked

1. **Hold the dependent step** (10.8–19.4 s, M). The stale response becomes a visible red version mismatch, and no packet reaches the tool until the primary returns v2. This makes the wrapper's consistency decision observable rather than implying that an agent prompt guarantees freshness.
2. **Resolve before replay** (19.4–22.7 s, M). The tool visibly uses v2 while the replica remains v1 for a 1.8-second hold before the copy begins. This separates primary read routing from replica catch-up and avoids suggesting that all reads must wait for every replica.
3. **Show an ordinary valid read first** (1.1–4.9 s, M). The first replica read has matching revisions and a green tool outcome; the stale case repeats the same path before failing the version check. Motion, pitch and shape changes provide the contrast.
4. **Keep a healthy replica healthy** (13.1 s, S). Replica v1 stays blue; only the stale dependent-read check becomes red with a low thump. Lag is not drawn as a crashed database.
5. **Close on a fresh replica read** (24.5–30.3 s, M). After catch-up, a new read passes the same check and triggers the same tool chime. This demonstrates when the replica becomes usable for this dependency instead of leaving the impression that replicas should never be read.

No known unresolved objective defect was found in the final sampled visual/analytical pass. No additional in-scope teaching change is being deferred for approval.

## Verification of encode 3

- 1080×1920, 30 fps, 960 frames, 32.000 seconds; H.264/yuv420p with AAC, 1,244,111 bytes (<2,000,000).
- Entire movie decoded with FFmpeg `-xerror`; no errors or warnings. First and last decoded RGB frames match exactly. Faststart confirmed by `moov` before `mdat`.
- AAC sample peak −8.8 dBFS, below −0.5 dBFS. All 43 scheduled cues have decoded audio energy in their event windows. Sends and arrivals share the same playback timestamps as their packet animation; version changes and the 13.1-second hold use synchronous state/sound calls.
- Spectrogram inspected: sparse send/arrival clusters align with the beat sequence; the rejection at 13.1 seconds has the distinct low-frequency thump. The strongest sampled cue window is the rejection (0.432 amplitude), above ordinary tool-success windows (~0.317).
- Inspected final encoded one-second contact sheet, individual 350 px beat frames at 4.95, 9.5, 13.7, 19.5, 23.2 and 28.5 seconds, full-resolution stale/resolved frames, and a phone sheet of boundary/motion samples. Reviewed the pre-movie stills before each relevant layout/fade render.
- Reviewed boundary/motion samples at 0, 0.4, 1.5, 3.4, 6.95, 8.55, 10.8, 12.7, 15.4, 15.5, 17.4, 18.98, 21.95, 24.5, 26.5, 27.9, 30.3 and 31.97 seconds. The initial and final empty frames are deliberate, and no hold after a landed event exceeds three seconds.
- Checks and hashes live in `verification.json`; reproduction uses `render.sh` and `verify.py`. Source and renderer dependencies are local; root puppeteer-core remains pinned at 25.14.0. Only this cut and its two public media files were written.

## Honest limitations

Audio was analysed, not physically heard. Energy windows confirm sound presence, not subjective pleasantness or isolation of coincident cues; stereo, masking and phone-speaker listening remain untested. No captions or narration are embedded; the six-beat timestamped transcript is in `variant.json`.

The example is an application design, not a database guarantee or permission control. Revisions are illustrative; actual routing, read snapshots, revision checks, timeouts, races, failover and permissions require implementation. Timing is illustrative. See the linked primary-source paraphrases and assumptions in `evidence.md`.

A fresh encoded-media comparison and human editorial choice are still required before selecting a recommended cut. Browser integration and shared build/manifest checks were left to the coordinator because this task owns only the Sol cut; the local verifier checks this movie without changing shared files.
