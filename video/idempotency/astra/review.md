# Retry the intent — final review (render 2)

Author/reviewer: **gpt-6-astra**, high reasoning, 2026-10-19. This is a self-review, not a comparative recommendation.

## Fixed before handover

- **6.9–9.8 s, label/ripple collision (S):** initial stills placed REPLY LOST at the response failure point. Moved it to x220, clear of both the expanding failure ring and the request wire. Reinspected the final encoded 7.1-second frame at full size and 350px width.
- **0.0–25.0 s, unexplained identifier (S):** replaced the caller’s bare k7 value with “key k7”; retained short travelling chips and the Saved key label. The key/value association can now be read without relying solely on the accompanying text.
- **0.0/29.967 s, encoded loop mismatch (S):** render 1 failed exact decoded RGB equality. A rounded decimal timestamp fell just after the final frame, leaving it as a predicted frame. The local renderer now forces keyframes by frame index, uses fixed QP and equal I/P quantizer ratios, and render 2 passes exact equality.

## Teaching improvements applied

1. **3.8 s, show the persistence boundary (M):** key and ticket appear simultaneously inside one database enclosure, with a single store cue and a 0→1 count. This avoids implying that an uncoordinated cache entry can protect an external effect.
2. **12.8–16.8 s, make replay visibly different from execution (M):** the retry visits the saved key and returns #47 without another WRITE or ticket pulse. An observer can distinguish lookup from creation.
3. **19.0–23.3 s, test the meaning of identity (M):** v1 changes to v2 while k7 stays fixed; the service rejects it and keeps the original ticket. This adds a concrete contract boundary beyond “retry means success.”
4. **25.0–28.7 s, focus the resolution (S):** dim the rejected request and tool; pulse the retained ticket and count. The deliberate final hold leaves the one-ticket outcome visible before the fade.

No unresolved objective media defects were found in the inspected final frames. Concurrency and expired-key branches belong in the guide/exercise; adding them would overload this five-beat mechanism lesson. No additional production changes are pending for this cut.

## Encoded evidence

- SHA-256: `9a8054364cb8b8378690d675f4100549fb9f17e389290956875584031efd5248`.
- 30.000 seconds; 900 frames; 1080×1920, 30 fps, H.264/yuv420p plus stereo AAC.
- 640,221 bytes, below the strict 2,000,000-byte ceiling. Faststart verified by moov preceding mdat.
- Complete FFmpeg decode with error-fatal checks: pass, no decode warnings.
- First and final decoded RGB frames: byte-for-byte equal. Their SHA-256 is `1df06ad5fc2492dec05305694e51f45ca76110ca4460dd21321267df8e1ae49a`.
- Audio maximum: **-7.1 dBFS**, below −0.5 dBFS. All 25 declared cues have decoded audio energy. Maximum encoded-versus-reference onset difference: **0.998 ms**, below one 33.33ms video frame.
- Inspected scratch/contact-sheet.png (encoded one-second overview), scratch/encoded-phone-sheet.png (ten actual 350px images), full-size key frames, and scratch/spectrogram.png. Beat frames: 2.0, 4.6, 7.1, 10.2, 13.2, 17.6, 19.6, 21.9, 23.7, 26.5 seconds. Caller, database, and count remain separated; chips do not cover the semantic values. Dimmed actors at the ending are intentionally inactive, not required reading.
- Meaningful cue alignment: commit/store 3.8; loss/crash 6.9; retry/clock 9.8; lookup/hit 13.6; received/deliver 16.8; changed input/clock 19.0; mismatch/thump 21.6; rejection arrival/thump 23.3; final focus/chime 25.0. Sparse sends/arrivals accompany intervening packet travel.
- Spectrogram shows isolated event groups, with the broadband disruption at 6.9 seconds and the lower rejection notes distinct from request/arrival tones. This is analysis of the encoded signal, not a claim about subjective sound quality.

## Honest limitations

Audio was **not physically listened to**. Levels, cue presence, onsets, and spectral structure were measured; perception on phone speakers is untested. The task did not use a separate reviewer or evaluate the baseline movie; no claim of comparative superiority is made.

This is an illustrative in-house tool with one transactional database, valid caller access, and a retained key. The animation does not prove exactly-once execution, cross-service atomicity, authorization, a provider’s retention period, or actual agent reliability. Short key k7 is a visual shorthand. Prompts do not enforce persistence or permissions. The full guide supplies the scope and an exercise; no real ticket service was integration-tested.

The shared manifest, build, and UI were not edited or rebuilt. Their integration and default-cut selection remain with the coordinator. This cut’s local engine, pinned dependency metadata, portable commands, transcript, poster, and hash-bound evidence are complete.
