# Memory architecture — original fable author review (render 4)

Historical author review of the pre-comparison encode. Its measurements, screenshots and outcome labels describe that encode. The final comparative review, revised labels and verification are in [after.md](../../../reviews/comparisons/memory-architecture/after.md). Source notes below were condensed and rechecked by gpt-6-astra comparative review on 2026-10-19; original author records are retained in the comparison scratch archive.

Encoded file: `public/media/memory-architecture/fable.mp4` (32.20 s, 966 frames, 1080×1920, 30 fps, H.264 yuv420p + AAC, 1.57 MB, faststart). Reviewed from the encoded contact sheet (1 frame/s), full-size stills, 350 px beat frames at 2.7/7.8/11.8/18.7/22.2/25.7/29.2 s, the spectrogram, `volumedetect`, and `verify.py`.

## Fixed before handover
- 2.6 s and every later read: the `hit` check mark was drawn over the memory row text (`lint: stric✓ @r12`). Moved the mark ripple to the right end of the row (x = 790), clear of the longest row text.
- 3.3 s, 11.6 s, 15.3 s, 18.5 s, 25.9 s, 29.0 s: the outcome ripple carried a ✓/× mark that landed on the `Run N` label, and its 200 px radius reached the runs bar. Removed the mark (the `OK`/`FAIL` badge already carries the outcome) and cut the radius to 150 px.
- 7.6 s, 25.15 s, 25.45 s: store ripples at 130–140 px reached the `Durable memory` label. Reduced to 90–100 px.
- 2.6 s: reply chips spawned 6 px above the memory box and clipped its border while fading in. Lifted the read/write ports to y = 1330.
- Runs bar: 7 px mark dots were too small at phone size. Added a general `markR` option to the `bar` node in the local engine copy (default unchanged) and set it to 11 px.
- Loop boundary: at crf 23 and crf 18 the first and last decoded frames differed by ±2 encoder noise. The local `render.mjs` now encodes with constant QP 22, `mbtree=0:aq-mode=0`, and a forced keyframe on the last frame; the boundary frames are byte-identical after decode.
- Audio: the synthesised mix is peak-normalised to −1.5 dBFS before AAC; the encoded stream measures −0.8 dBFS (within the ≤ −0.5 dBFS bound).

## Verified
- Full decode with `-xerror`: no warnings. First and last frames identical (rgb24 compare). moov before mdat. Poster `fable.jpg` taken at 29.2 s (final `OK` state).
- Audio: max −0.8 dBFS, mean −28.6 dBFS. All 45 scheduled cues have an onset within 80 ms in the decoded track (`verify.py`). Spectrogram: the 11.6 s crash is the brightest event; thumps at 15.3 and 18.5 s stand out below it; every beat row in the beat sheet has a visible burst.
- No stretch without change longer than 2.0 s apart from the deliberate 2 s hold before the closing fade.
- Audio was analysed (peaks, onsets, spectrogram) and not listened to. `verification.json` records `listened: false`.

## Suggested improvements
1. **Make the bad write sound wrong** (7.6 s, size S). Saw: the unsourced store plays the same `store` preset a fifth lower; on the spectrogram it is clearly quieter than the crash but not obviously "wrong". Change: layer a short low noise tail or a flattened second partial on that one cue via `override`. Effect: the viewer hears the moment the mistake enters memory, before the failures start.
2. **Show the missing revision on the chip** (6.9 s, size S). Saw: `tests: skip ?` relies on the trailing `?` and orange colour. Change: add an empty slot where `@rNN` would sit (e.g. `tests: skip @—`). Effect: the gate's rule (`src + rev`) becomes visible on the thing it rejects.
3. **Dim the read wire while the gate is introduced** (20.3–20.8 s, size S). Saw: both wires stay bright while the gate scales in on the write wire; the eye has to find which path changed. Change: fade the read wire to 0.4 alpha during the gate's entrance. Effect: one place to look.
4. **Let the third failure arrive faster** (16.3–18.5 s, size M). Saw: runs 4 and 5 are paced like run 3. Change: shorten the run 5 read and end-run gaps by ~0.3 s each. Effect: "the same mistake, again and again" reads as a tightening pattern.
5. **Put a faint ghost of the rejected chip in thread state before it lands** (22.9 s, size S). Saw: the bounced chip disappears at the agent and a new one leaves for thread state 0.7 s later. Change: route the bounced chip directly from the gate top to the thread store in one move. Effect: the viewer sees the gate redirect the guess rather than delete it.
6. **Hold the final state slightly longer** (29.4–31.4 s, size S). Saw: 2.0 s hold on seven dots. Change: 2.5 s. Effect: the green-after-red pattern on the runs bar has a moment to register before the fade.

## Limitations (honest)
- Illustrative scenario. The "write gate" is a design the team builds in its own harness; the displayed source/revision gate is application policy, not a claimed automatic guarantee of the cited storage mechanisms. Persistent instructions do not enforce permissions.
- The failure is shown as three identical reads; the lesson generalises (any later consumer of the entry) but the video does not show background memory extraction or concurrent sessions.
- The original gate sublabel was 24 px and uncomfortable at phone size. The comparative revision uses 28 px, moves packet marks clear of the label and verifies the final 350 px frames.
- Audio was analysed, not heard.

## Evidence — concise source-to-claim notes

Primary pages opened during comparative review on 2026-10-19. These are paraphrases, not quotations.

- [LangChain memory overview](https://docs.langchain.com/oss/python/concepts/memory): distinguishes thread context from cross-thread records and explains write-timing tradeoffs. Supports the two scopes and delayed reuse; the write gate is our proposed application policy.
- [OpenAI Agents SDK sessions](https://openai.github.io/openai-agents-python/sessions/), Core session behavior and history merging: the runner reuses session history and saves new items. Supports continuity across runs. This does not establish the broader claim that no validation can occur; applications can customize input handling.
- [Claude Code memory](https://code.claude.com/docs/en/memory), CLAUDE.md versus auto memory: repository instructions supply continuing context. [Permissions](https://code.claude.com/docs/en/permissions) documents enforcement outside the model. Together these support keeping stored instructions distinct from access control.

The approved-source check, guessed skip-tests example and correction policy are editorial designs. Metadata is not proof of truth or approval. The revised video makes the source visible and labels the three outcomes NO TESTS, the write SAVED, and the subsequent action RUN TESTS. No real application or test suite was executed.

## Notes for the skill (optional)
- `bar` has no option for mark size; a `markR` node option (added here) makes event dots legible on phones.
- Exact first/last frame equality is not guaranteed by crf encoding even for identical black frames. A constant-QP encode with `mbtree=0` and a forced final keyframe makes it deterministic; worth documenting in `engine-api.md`.
- `render.mjs` writes the synthesised mix without normalisation; a peak target before AAC avoids retakes.
