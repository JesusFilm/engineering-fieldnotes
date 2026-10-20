# Canary deployments and OAuth PKCE — fresh encoded review

Reviewed 2026-10-20. **No blocking contradiction or visual fault found in the inspected samples.** Both sequences are stronger beginner explanations than their 30-second originals; the originals retain advantages as compact visual summaries. This is a sampled encoded-media review, not exhaustive frame-by-frame or real-time playback certification.

## Scope and evidence

Read `AGENTS.md`, `docs/editorial-workflow.md`, and the architecture-flow-video skill/review guidance. Content inputs were only the two `lessons.json` files, ten public lesson MP4s and the two specified `astra.mp4` originals. No authoring source, storyboards or prior review scores were consulted. Canary was reviewed first; before opening OAuth inputs, `/tmp/fieldnotes-reviewed-renders.log` was checked and line 102 contained `Rendered topic oauth-pkce`. No render was restarted and no source was edited.

All ten lessons: inspected encoded frames at **0, 3.5, 10.5, 17.5, 24.5 and 27.9 seconds**, at native 1080×1920 and resized 350-pixel width. Also inspected one additional busy-frame candidate per clip at both sizes. Candidates were selected by a 2-fps scan maximizing bright saturated pixels within the diagram region; this is a heuristic, not a guarantee of the busiest instant. Originals sampled at 0, 4.5, 10.5, 16.5, 22.5 and 28.5 seconds at both sizes. Individual transition boundaries were not exhaustively inspected.

| Busy sample (seconds) | 01 | 02 | 03 | 04 | 05 |
|---|---:|---:|---:|---:|---:|
| Canary | 25.5 | 22 | 16 | 23 | 8 |
| OAuth | 23 | 8.5 | 9 | 1.5 | 16 |

All 12 MP4s decoded completely without reported errors and have `moov` before `mdat`. Lessons are 28 seconds, 1080×1920, 20 fps, H.264/yuv420p with stereo AAC. No sampled text clipping or label-obscuring packet overlap was found. At 350 pixels, text remains readable; dotted routes and empty progress rails are faint. Captions and finite explanatory holds are intentional and were assessed as beginner teaching devices.

**Audio analysis only; no listening occurred.** Decoded sample peaks: canary lessons −13.6 to −10.5 dBFS; OAuth −12.5 to −10.5 dBFS; originals −4.6 and −6.7 dBFS respectively. No sample clipping indicated. Lesson spectrograms show sparse bursts separated by quiet intervals. Perceived loudness, timbre and audiovisual synchronization remain unverified.

## Scores

1–5, higher is better; clarity/pacing judged for beginners. Accuracy scores concern the illustrated mechanism and internal consistency, not comprehensive protocol coverage or an external standards audit. Pacing scores are provisional from timed samples. Legibility includes fine diagram lines, not just text.

| Encoded clip | Clarity | Accuracy | Pacing | Legibility | Main evidence |
|---|---:|---:|---:|---:|---|
| Canary 01 | 4 | 5 | 4 | 4 | Control/candidate distinction and measurement destination are explicit. |
| Canary 02 | 4 | 5 | 4 | 4 | 9,000 + 1,000 = 10,000; exposure is stated rather than drawn proportionally. |
| Canary 03 | 5 | 5 | 4 | 4 | 40/10,000 = 0.4%; captions explain why the aggregate alert stays quiet. |
| Canary 04 | 5 | 5 | 5 | 4 | 0/900 versus 40/100 exports leads directly to “do not promote.” |
| Canary 05 | 4 | 5 | 4 | 4 | No new candidate traffic; recovery verification and separate data repair are explicit. |
| Canary original | 4 | 5 | 4 | 4 | Proportional routing and same-window export comparison fit one coherent view. |
| OAuth 01 | 4 | 5 | 4 | 4 | Delegation, code exchange and resource access checks are separated. |
| OAuth 02 | 4 | 5 | 4 | 4 | Retains verifier A with attempt A while deriving challenge A. |
| OAuth 03 | 4 | 5 | 4 | 4 | Saved challenge and bound code are explained; final labels could retain both. |
| OAuth 04 | 5 | 5 | 4 | 4 | Matching proof precedes token receipt; other OAuth checks are explicitly required. |
| OAuth 05 | 4 | 5 | 4 | 4 | Wrong verifier B is rejected; separate storage and fresh-login instruction follow. |
| OAuth original | 4 | 4 | 4 | 4 | A/B color identity and successful fresh C are strong; challenge derivation/other checks are less explicit. |

## Blocking contradictions / visual faults

**None observed within the stated scope.** Canary’s denominators reconcile. Its final amber “verify recovery” does not claim that elapsed time proves health. OAuth’s final red mismatch belongs to the failed exchange; the caption instructs a fresh login and does not claim that fixing storage retroactively validates it. Original canary’s retained errors are explicitly labelled “failed window,” so they do not contradict the restored routing.

## Comparative judgment and optional improvements

- **Canary:** prefer the sequence for first learning: it separates exposure, aggregate masking, same-operation comparison and rollback limits. Keep the original as a concise overview. Optionally borrow its 90/10 proportional bar for lesson 02 (17.5–27.9s). Lesson 05 (24.5–27.9s) could show a measured recovery result after the verification step; the present instruction is valid without it.
- **OAuth:** prefer the sequence for understanding verifier → challenge → code binding → proof. The original is stronger at showing the complete concurrent-login failure and fresh-login recovery. Optionally retain code A alongside the saved challenge in lesson 03 (17.5–27.9s), then give lesson 05 (24.5–27.9s) a distinct fresh C success state, as the original does at 22.5–28.5s. These improve continuity and closure, not factual correctness.
- **Both:** modestly brighten dotted routes/empty rails for 350-pixel viewing. Preserve the explanatory captions and finite reading holds; neither is a blocker.

No recommendation/promotion configuration was changed. Evidence, probes, audio analysis and extracted frames are under `scratch/reviewer-7/`.

## Exact SHA-256 inputs

### canary-deployments

```text
29ce39af6bfadb7e2cf192d41f59ca0fc78b8fd99851a2385a314c3a57d755c5  public/lessons/canary-deployments/01.mp4
7603aa3c6db5b0ac215bf050350ce5e7fa52d614d974d855b7a19942ff4d0242  public/lessons/canary-deployments/02.mp4
a8e22dc0e89d5a2e81e2b09f51377004d222aae890becd9c9ba242255928dcb7  public/lessons/canary-deployments/03.mp4
9c9375845c20dae261bf151f5022f9b1c24d4ae154b3fad89c155b78f9b43dac  public/lessons/canary-deployments/04.mp4
798740086144d74b2fe2f0669f2545549614a465581435edb76b3752ff36cce2  public/lessons/canary-deployments/05.mp4
d70bf4b171079a1df38d94c28c12fe7aea62e7e64bece90541b19053aa3ac713  public/media/canary-deployments/astra.mp4
6d7993bc02761797c1375acea95beb59369858b3e204fa2205a596e922317e2e  video/canary-deployments/sequence/lessons.json
```

### oauth-pkce

```text
3ef03bb3e588c66746d524541b028acbddde30e6941c65ec5d22887ae5fd063e  public/lessons/oauth-pkce/01.mp4
91093262f1cb9c0112552b970a5b4a44f85d5751d6b558392b033bcd75cbd10d  public/lessons/oauth-pkce/02.mp4
e512c8cb43c271270420a96a138d024bb772d661100d21b639afe31055ae0262  public/lessons/oauth-pkce/03.mp4
4c4888d39417ef06124365315b7a9fef1dc25d53292dca6b56b30c6549b3c743  public/lessons/oauth-pkce/04.mp4
695ee20514f974a029d67887ea24c16818017974e5f28e9e93a031d47d14c27a  public/lessons/oauth-pkce/05.mp4
8d18fe05d761b07a7a5d9146c9ae223d7ceb3151354b3ced392aae577a598877  public/media/oauth-pkce/astra.mp4
c7e933123f8cd5c4da20472178a8c880123e066b4881a0569e9afad7d2a48f7b  video/oauth-pkce/sequence/lessons.json
```
