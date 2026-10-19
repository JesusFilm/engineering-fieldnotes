# Separate authority — Astra review, final render 2

Author/reviewer: **gpt-6-astra**, reasoning **high**, 2026-10-19. Self-review; no subagents or independent comparison reviewer used. Primary-source review is in `reviews/concepts/guardrails-and-permissions/review.md` from repository root.

## Fixed before handover

- **06.10 and 09.90, still review:** several otherwise static actor labels and the title disappeared in accelerated Chrome canvas output. Disabled GPU/accelerated canvas and requested CPU-backed readback in this local renderer only. Re-rendered and inspected the complete still set; final encoded frames retain their text.
- **01.30–24.10, still review:** default 26px traveling text was too small for the intended phone presentation. Added configurable packet text size locally and used 40px. Card labels are 47px and states are 38px.
- **09.50–10.30, still review:** the enlarged r42 proposal would crowd the narrow gap between Agent and Reviewer. Routed the proposal above the actors with clear wire endpoints. The route stays below the title band.
- **06.30–06.50 and 18.30–18.50, render 1:** arriving packets could cover actor labels near their destination. Moved packet drawing behind opaque node cards in the local engine. Reviewed a new still before the second encode; repeated encoded review after rendering. Entry into a card now occludes the packet, never the actor's label.
- **00.00 and 27.97:** the story ends with a changed production release. Added an optional whole-frame veil in the local engine so the loop closes honestly through black, rather than implying production reverted. Exact decoded endpoint equality verified.

## Improvement pass — applied, ranked by teaching impact

1. **Keep authority distinct** (21.00–24.10, M). A success-only ending could imply human approval elevated the agent. Added a second denied direct deployment followed by a successful read; r42 remains deployed. The viewer gets observable evidence that authority did not expand.
2. **Bind the handoff to one release** (09.50–18.50, M). An unlabeled approval packet would leave the object of approval ambiguous. r42 travels through proposal, reviewer, execution check, and production; the guide explains the immutable record behind the short label.
3. **Reduce eye competition** (09.50–10.30 and 06.30–06.50, S). Elevated the proposal route and repaired arrival layering. The affected state change now remains readable while the packet moves.
4. **Preserve phone legibility** (all beats, S). Enlarged actor/state/travel labels and retained only five actors. Viewed all encoded beat images at exactly 350px width. No explanatory paragraphs or additional actor were needed.

No unresolved objective visual defect was found in the final sampled evidence. No outstanding improvement is required to teach the pinned objective. This is not a comparative quality ranking or a default-cut recommendation.

## Final verification

- Final file: `public/media/guardrails-and-permissions/astra.mp4`.
- 28.000 seconds, 840 decoded frames, 1080×1920, 30 fps, H.264/yuv420p plus stereo AAC; **467,704 bytes**, below the decimal 2,000,000-byte limit.
- Full video/audio decode completed with `-xerror` and no decode errors.
- First and last decoded frame MD5: `eb31442608984c1aa5939de6decc4443` for both; exact equality, not a perceptual comparison.
- MP4 atom sequence: `ftyp`, `moov`, `free`, `mdat`; streaming metadata precedes media.
- Decoded float PCM peak **−6.287 dBFS**; FFmpeg volumedetect reports **−6.3 dB**, mean **−35.1 dB** including deliberate silence. No clipping; exceeds the requested 0.5 dB headroom.
- All **19 sound cues** have nonzero measured encoded audio within the first 150ms of their scheduled onset. Frame-aligned cue times are generated from the same scene clock as visual events. The inspected spectrogram shows distinct denial thumps at 6.5 and 21.8 seconds, reviewer confirmation at 12.6, and deployment arrival at 18.5. Sends and arrivals remain separated; no music masks them. RMS checks establish presence, not perceptual quality.
- Viewed pre-render beat stills, including a full-size resolved state, and additional packet-motion stills before encoding. Viewed the final encoded one-second contact sheet; all five beat images at 350px (3.8, 6.8, 12.8, 18.7, 24.3); the busiest request frame at full resolution; the full-size resolved state; and the sampled transition/boundary sheet. No text clipping, stale release change, or long unexplained freeze observed. The 2.5s post-deployment hold and 2.3s closing hold are intentional.
- Poster extracted from the final encode at 19 seconds; scene and encoding measurements agree with variant.json.
- Detailed checks and file hash are saved in `verification.json`; per-cue schedule in `cues.json`. Evidence images are `review-contact-sheet.png` and `review-spectrogram.png`; regenerated full/350px frames and hashes are in ignored `scratch/`.

## Honest limitations

Audio was **not physically heard**. Its waveform, levels, onset windows, and spectrogram were analyzed; perceived timbre and small-speaker intelligibility are untested. The synth has random noise components, so repeat encodes need their own measured checks; byte identity across environments is not promised.

The animation is an illustrative architecture. Green approval represents a trusted reviewer path checked by execution code, not permission granted by natural-language text. The deploy tool abstracts a separate deployment identity; r42 abbreviates artifact and target binding. The video omits authentication, approval expiry/replay handling, races, compromised credentials, and rollback. Persistent prompts do not enforce permissions. The guide proposes a fixture exercise; no live security enforcement was tested here.

No baseline or alternative scene/media was consulted, so independence is supported by the authoring process, while comparative superiority is unassessed. Human editorial promotion remains outside this assigned scope. Installed skill files, shared build/UI/manifests, and other variants were untouched; no Git operations were performed.
