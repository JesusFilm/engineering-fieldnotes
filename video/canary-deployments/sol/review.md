# Canary the outcome — encoded review

Reviewed 2026-10-18T23:53:13.005606+00:00. Delivery render 1; revised still design before encoding. Movie SHA-256: `e05cd544415d1c531ec781b9eb32baa6a6aef372316fc5656e236c75f15182c0`. This is a self-review of this independent cut, not a comparison score or recommendation.

## Fixed before handover

1. **Hidden wiring** (00:00–00:05 and before 00:18; S, defect). Initial stills showed candidate and gate-return wires too early because wire default alpha was ignored. The local engine now honors it. Revised stills and the encoded contact sheet show the normal control-only state and reveal the return path only when it acts.
2. **Route clarity** (00:05–00:11; M, improvement). Initial routes crossed share/role labels. Paths and packets now run around the outside of the labels. Encoded 00:08.8 confirms clear percentages and version labels at native resolution and 350px width.
3. **Semantic contrast** (00:11–00:16.6; M, improvement applied in scene design). API and required-test observations have separate cards with check/cross shapes. Both API cards stay green when candidate tests fail at 00:14.1. The failure sound is the strongest cue; the gate follows instead of treating HTTP success as task success.
4. **Rollback meaning** (00:19–00:26; M, improvement applied in scene design). Only new work routes to v1. The failed candidate test remains red after withdrawal, preventing the ending from implying that switching traffic repairs prior artifacts.
5. **Loop boundary** (00:00 and 00:27.967; S, defect prevention). Whole-canvas fading includes the title; first and last decoded pixels match exactly. The local renderer also caps codec and filter threading at two.

## Encoded review observations

- Reviewed the whole 1fps contact sheet; native traffic and failure frames at 00:08.8 and 00:14.6; every extracted 350px image at 00:00, 00:03.3, 00:08.8, 00:11.9, 00:14.6, 00:17.5, 00:18.5, 00:20, 00:24.3 and 00:27.967; and the final JPEG poster using view_image. No clipped labels, label/packet crossings, unintended stale states or offstage content observed. The retained FAIL is intentional evidence.
- At 00:05–00:11 the candidate envelope, separate pitch, 10% label and three 9:1 traffic cycles reinforce limited exposure. Control traffic is deliberately faster and quieter. At 00:14.1 the failure dominates; its 2.5-second hold precedes the gate signal. The final resolution holds 2.9 seconds before fading.
- Spectrogram inspected. All 85 scheduled cue times have measurable decoded energy. The isolated failure sound's source/encode correlation is 0.985329 with 0.0 ms measured offset. Both motion and audio use the same event timeline; visual quantization is at most one 30fps frame. This establishes timing and signal presence, not perceptual audibility on a physical device.
- Full decode with error-on-failure passed: 840 frames, 28 seconds, H264/yuv420p, 1080×1920, 30fps plus AAC. 1,450,636 bytes; moov before mdat. Encoded audio peak -3.2 dBFS. Poster independently opened and checked. Reproduction commands and source accompany the cut.
- A verifier-only defect was fixed: frame hashing initially included the audio stream; explicitly disabling audio correctly compares the two decoded video frames. The delivery encode was unchanged.

## Remaining limitations

No physical listening, real-device playback or external reviewer was performed. Audio synthesis and encoded signal levels/timing were analysed. Perceptual sound balance still benefits from human listening. No website integration or shared manifest/UI/build changes were made; `scripts/check_media.py` writes shared review evidence, so equivalent stricter checks are isolated in this cut's `verify.py` and `verification.json`.

The video illustrates a preconfigured required-test abort policy, not statistical confidence from 30 sessions. Cohort representativeness, test flakiness, delayed results, contamination and shared services need separate operational treatment. Prompt persistence is not permission enforcement. Tests do not prove all aspects of correctness. Traffic withdrawal cannot undo side effects and does not automatically stop in-flight sessions. The source-linked beat sheet states these assumptions and provides an observable team exercise.

No unresolved objective media defects or unimplemented meaningful improvements were identified in this review. A later comparative reviewer can judge whether this artifact-check example complements the other cuts; their scenes and prior review scores were not consulted.
