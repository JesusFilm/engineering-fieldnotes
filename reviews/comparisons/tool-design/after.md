# Tool design — completed comparative review

2026-10-19. Reviewer/editor: gpt-6-astra comparative review. Blind findings were recorded in before.md before author material was opened. Viewing labels were A=baseline, B=astra, C=fable. Recommendation: **astra**, for its matched empty/hidden-error/explicit-error contrast. Keep all three alternatives and retain the guide as **core**; sources.md records the primary-source review and classification reasoning.

## Corrections and verification

- Astra: packet centres now stay 50px outside box edges, leaving clearance for 44px chips at departure/arrival. Rechecked the critical TIMEOUT at 16.4s, ERROR at 17.2s and OK + INC-42 at 24.2s, plus each route's transition samples. The original 16.5s border intrusion is gone.
- Astra: at 19.7–21.0s the application-labelled retry count and one full segment stay at one while the agent pulses with the clock; at 21.0s both become zero when the request is sent. This separates delay from a discrete budget. The final successful border stays green after the arrival pulse restores its previous colour (25.2–27.2s).
- Fable: at 5.3s the opening now reports the neutral receipt “12 lines read.” No absence-of-incidents conclusion is inferred from a small log sample. read_logs now visibly declares the window already sent by its request, and tool parameter labels increased from 26px to 30px. The redesign cue around 18.5s is a small ripple above the box, clear of its new labels. The local renderer now caps encoder and filter threads as well as decoder threads at two.
- Guide: added retrieval dates, transport-timeout/no-result distinction, and the distinction between record-count limits and byte/token limits. Existing claims and exercise preserved.
- Baseline: no substantial defect warranted a render change. Its media are byte-for-byte unchanged.

The variants retain their original model/reasoning provenance, add editedBy and correction records, and have updated text equivalents. Original source/metadata/media snapshots are under scratch/originals; original transcripts are also retained in correction metadata. Existing author reviews and measurements remain historical records, with an appended pointer to this fresh review. No shared app/build files, installed skill, Git state or other topic was changed.

## Encoded visual coverage and transcript reconciliation

Initial contact sheets cover the whole runtime at one-second intervals. Full-size and 350px inspections covered each causal beat, busy sequence, resolution hold and exact decoded endpoints. Final contact sheets were inspected again after rendering. Astra's revised packet routes were sampled at 1.6, 3.4, 4.55, 7.3, 9.3, 9.57, 10.3, 10.57, 14.3, 16.2, 16.47, 17.2, 17.47, 21.3, 23.47, 24.2 and 24.47 seconds. Its final render was rechecked at 4.9, 10.9, 16.4, 17.9, 20.5, 21.1, 24.2, 25.5 and 27.1 in full-size frames, with phone-size checks across every beat. Fable's final sampled frames include 1.4, 3.5, 5.7, 7.9, 8.5, 10.5, 11.5, 12.5, every 0.2s from 13.5 to 14.5, 15.5, 17.8, 18.5, 19, 20.5, 22.5, 23.5, 24.2, 24.6, 25.5, 27.5, 28.5 and 29.6 seconds. Full-size inspection specifically included the neutral receipt, crowded stream, dropped ID, unknown hold, redesign, small result and final receipt.

- Baseline transcript matches completed-empty → explicit timeout → one retry → INC-42. The named retry appears at 13.6s and the next call starts at 16s; its broad transcript ranges are descriptive rather than cue-exact. It does not demonstrate enforcement or a hidden-error bug.
- Astra's five transcript phases match the movie at 0, 6.8, 12.8, 19.7 and 24.5 seconds. An error remains visible at the index after the contract change: the interface does not magically recover the backend. Revised transcript accurately describes the discrete budget.
- Fable's transcript matches the encoded log stream, red overflow, and loss of the green INC-42 chip: the chip is clearly in transit at 14.1s and meets the rejection at approximately 14.3–14.4s. The small successful payload reaches the agent around 24.4s. The input window was already present in moving requests; the new static input label makes it consistent. Truncation is an illustrative harness policy, not a universal model behaviour. The 28.4–29.1s fade leaves the title until the end at 29.633s.

Occasional tool image previews appeared to suppress repeated static text. Direct saved-image pixel comparisons of the title region at 14.3/16.2/24.2/27.1s showed the title present (RGB means approximately 40.8/35.1/7.5), and full-size/phone/contact views corroborated it. No missing-title defect is claimed or speculative font fix added.

## Final encoded checks

See checks.json and reproducible verify.py. All three are H.264, 1080×1920, 30/1fps, yuv420p, with AAC. Complete video and audio decode succeeds with -xerror. MP4 atom parsing confirms moov precedes mdat. First and last decoded frame hashes are exactly equal for each file: baseline/astra end at black; fable ends at its opening title-only frame.

| Cut | Duration | Decoded video frames | Peak audio |
| --- | ---: | ---: | ---: |
| baseline | 25.008005s | 750 | -5.0 dBFS |
| astra | 30.000000s | 900 | -2.2 dBFS |
| fable | 29.633333s | 889 | -1.8 dBFS |

Audio was analysed, **not heard**. Inspected all three spectrograms: baseline's failure near 9.5s and recovery near 15s, Astra's failed lookups and four waiting ticks around 20s, and Fable's rising arrival sequence followed by the broadband overflow around 13.7s align with their visible story beats. Decoded signal exists in the first 120ms after all 32/44/56 authored cues respectively; the quietest cue-window peaks are -25.75/-21.28/-23.74 dBFS. These checks do not isolate overlapping cues or establish timbre, comfort, audibility on a real phone, or frame-exact perceived sync. Posters were regenerated from the final Astra/Fable encodes at 17.9/14.0s.

## Remaining tradeoffs

Astra needs five phases and 30 seconds, but its ~2s empty/false-answer/unknown holds and 2.7s final hold support the comparison. Baseline is simpler and shorter but spends several seconds on three serial calls and leaves the reason for the interface to inference. Fable's ~0.15s packet cadence is deliberately dense enough to make accumulation visible; its ~0.5s dropped-ID trip benefits from a replay. Its small context/parameter labels are secondary at 350px; Astra is the easiest mobile read.

None of the cuts demonstrates partial-result pagination, permission enforcement, arbitrary-model compliance, a failed retry after budget exhaustion, or root-cause proof. The guide explicitly covers those boundaries or scopes them out. These are animated examples and an editorial comparison, not an executed agent evaluation or automatic curriculum promotion.

## Publication polish

Reviewed the topic's evidence/source notes, concept review and variant documentation. Replaced Fable evidence.md's long Anthropic quotations with concise linked paraphrases, preserving the source-to-claim mapping and separating scripted details from source guidance. Other current source notes already use paraphrases. Original archival snapshots remain in ignored scratch for provenance; they are not publication notes.

Rechecked all current transcript entries against the previously inspected final encoded frames. Both string entries (baseline/Fable) and numeric time/text objects (Astra) are retained as supported formats. Fable now locates overflow at 13.7–15.1s, separates the 18s redesign from the 19s reset, identifies the 24.4s evidence arrival and 25.2s answer, and describes the title-only ending. Its question-mark answer is explicitly scripted. Final audio metadata now states the actual comparative measurements rather than carrying forward the author's earlier onset check. Media hashes and the completed encoded checks are unchanged.
