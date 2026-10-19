> Historical author record for the original cut. The current comparative revision is documented in `../../../reviews/comparisons/context-engineering/after.md` and `variant.json`; its timing counters and verdicts were removed. Original text below is retained for provenance.

# Context engineering (fable cut) review — render 3

Reviewed from decoded frames (`scratch/review/f_*.png` at 1 frame per 2 s, plus full-size stills at 1.4, 4.7, 5.3, 9.95, 10.0, 18.6, 20.0, 20.4, 24.0 s), the contact sheet, 350px beat images, the spectrogram and ffmpeg level analysis. Audio was analysed, not listened to.

## Verification (final encode)

- Container/streams: mp4 (isom), H.264 High yuv420p 1080×1920 30 fps, 773 frames; AAC LC 44.1 kHz stereo; `moov` at byte 32 (faststart). Duration 25.777 s. Size 1,482,054 bytes.
- Full decode: `ffmpeg -v error -i fable.mp4 -f null -` exits 0 with no errors.
- First/last frame: decoded frame 0 and frame 772 have identical yuv420p MD5 (`9d926d12…`). Achieved with the local renderer's `--loop-exact` (constant QP 22, mbtree off, forced keyframe on the last frame); the earlier CRF 18 encode differed by encoder noise (PSNR 54 dB) and was rejected.
- Audio: volumedetect max −1.8 dB, mean −28.9 dB; astats overall peak −1.77 dBFS. No clipping, under the −0.5 dBFS ceiling.
- Cue synchronisation: 51 cues. Spectrogram columns sit at the authored event times (1.1, 1.7, 1.9–4.5 scale, 4.6 thump, 5.4/6.0, 6.1–9.0 ticks, 7.3 stale, 9.8 wrong (loudest, broadband with sub), 12.0 poof, 13.2–22.2 pass B, 22.2 chime), and the frames at those times show the matching visible change. Visual and audio are scheduled from the same scene times, so they cannot drift.
- Rendered with a local engine copy; FFmpeg pinned to 2 threads; one encoder at a time.

## Fixed before handover

- 1.9–4.5 s: chips leaving the repository crossed the "Repository" label at the wire corner. Moved the sources up (y 640), lowered the horizontal wire (y 915) and moved the repository exit off-centre (x 430).
- 5.4 s and 16.1 s: the Context→Model wire ran through the "Context" label. Moved the exit to x 380, left of the label.
- 9.8 s and 22.2 s: the ×/check mark ripple sat on top of the output badge text. The verdict mark now pops beside the badge (x 1040) and the badge ripple is capped at r 100 so it no longer reaches the token-bar label.
- 4.6 s: a red ripple centred on the token bar crossed its label; removed, the store glow and thump carry the beat.
- 18.6 s: the returning `users.ts?` chip faded out over the "Repository" label; it now ends at the wire corner and the green row ripple marks the find.
- Loop boundary: first and last frames were not bit-identical under CRF; added `--loop-exact` to the local renderer copy (reported in render.mjs; the installed skill is unchanged).

## Suggested improvements

1. **Make the stale note's influence visible** (7.3–9.8 s, size M). Saw: the note row flares orange and the answer names db.ts, but nothing links them. Change: run a thin orange dot from the orange row down the wire into the model just before the answer chip leaves. Effect: the viewer sees that the wrong edit came from the stale material rather than from slowness alone.
2. **Let the request show its reason** (17.7 s, size S). Saw: the `users.ts?` chip appears from the model with no trigger. Change: flash the `api.ts` row in context white for 0.2 s with a quiet tick right before the request leaves. Effect: reads as "api.ts pointed to users.ts", which is how just-in-time retrieval is actually driven.
3. **Give the two latency badges a shared scale** (9.3 s vs 21.7 s, size S). Saw: 41 s and 9 s are numbers only. Change: make the work-tick gap in pass A noticeably wider than in pass B (0.3 s vs 0.18 s) so the slowness is also heard. Effect: cost difference lands through sound as well as the badge.
4. **Shorten the pass A hold** (9.8–12.0 s, size S). Saw: 2.2 s of stillness before the reset is slightly long for a phone loop. Change: trim to 1.8 s. Effect: tighter total around 25 s with no loss of legibility.
5. **Dim uninvolved repository rows in pass B** (13.2–22.2 s, size S). Saw: db.ts, auth.ts and notes.md stay at full stroke while unused. Change: drop them to 30% alpha once api.ts is selected. Effect: the eye sees "left behind" as a deliberate choice.
6. **Audible token count** (1.9–4.5 s, size S). Saw: the bar fills silently apart from the store clicks. Change: add a soft `clock` tick that rises in pitch with each 2k step. Effect: the fill becomes audible without reading the label.

## Limitations (honest)

- The wrong edit in pass A is an illustrative scenario. Longer, noisier context raises cost and lowers reliability on average (Anthropic 2025; Chroma 2025), but it does not guarantee a wrong answer, and a smaller context does not guarantee a right one.
- The latencies (41 s, 9 s) and token counts (14k, 7k of 16k) are illustrative magnitudes, not measurements of any model.
- Pass B shows one request/retrieve cycle; real agents often need several, and each retrieval has its own cost.
- Loading or pinning a file or prompt in context informs the model; it does not enforce anything. Permissions, policies and constraints must be enforced by the harness and tools, not by their presence in the context.
- Audio was verified by analysis (peak level, spectrogram, cue timing); it was not listened to.

## Notes for the skill (optional)

- A loop that ends in a fade and starts from black does not produce bit-identical first/last frames under CRF. The local `--loop-exact` option (CQP + mbtree=0 + forced keyframe on the last frame) fixes this and could be absorbed by `render.mjs`.
- Store labels sit under the box centre, exactly where `'.bottom'` anchors wires; an anchor option offset along the edge would avoid hand-placed exit points.

