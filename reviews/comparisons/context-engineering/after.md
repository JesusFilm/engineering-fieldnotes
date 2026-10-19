# Context engineering — final comparative review

Completed 2026-10-19 by gpt-6-astra comparative review. Blind findings were saved in [before.md](before.md) before reading scenes, transcripts, author reviews, scores or provenance. Supplied filenames exposed variant names; this was a source/provenance-blind assessment, not an anonymized experiment. Mapping: A = fable, B = baseline, C = astra. Final recommendation: **astra**, based on the concrete constraint-loss, fixture-failure and checked-recovery sequence. No revision or pass quota was applied.

## What each cut teaches

| Cut and encoded time | Final visual sequence and teaching judgement |
| --- | --- |
| baseline 0–7.7s | KEEP API, task and trace survive while repeated logs fill the context. The stable blue rule is a useful visual anchor. The illustrative 8k → 10k → 13k → 15k count communicates accumulation, not actual file sizes. |
| baseline 7.7–11s | Logs become a short summary while the original requirement and trace remain. Corrected 9k total is consistent with the unchanged 8k packet plus a summary. This is the clearest compaction example; it still shows successful retention without demonstrating how the summary was checked. |
| baseline 12.2–15.3s | callers? goes to Repository and caller.ts returns as caller.ts:18, taking the meter to 11k. Visually separates retrieval from summarization. A filename is a schematic stand-in for loaded evidence, not a claim that naming a path loads it. |
| baseline 17.3–25s | Selected context reaches Model; an amber Patch? candidate appears at 19.1s and holds before the 23s fade. Replaces the unsupported green check. Large rows and a calm ending work at 350px, but no failure/recovery makes it a weaker main introduction. Exact opening and ending are black. |
| astra 0–6.3s | Goal and total_cents requirement reach Session 1; the field reaches the v1 fixture and PASS appears at 4.2s. The largest labels of the three cuts establish a readable normal case. |
| astra 6.3–10.3s | Requirement flashes red, fades and leaves an empty row. Loss precedes consequence, making the causal story clearer than an unexplained wrong-answer icon. It illustrates a possible omission, not an inevitable effect of compaction. |
| astra 10.3–16s | Session 2 resets the fixture to WAIT, emits amount at 12.8s, then fails at 13.8s. Reusing the same fixture makes the changed behavior inspectable. |
| astra 16–21s | v1 contract appears; total_cents returns to the handoff. FAIL remains visible until another invocation/check. This correctly avoids treating repaired notes as proof of a repaired patch. The roughly 18.5–21s hold is slightly slow but gives a first-time reader room. |
| astra 21–30s | Another WAIT/input cycle, total_cents at 22.8s, PASS at 23.8s and Human review at 26s. Human review is pending, not shown as approved. Compatibility is checked; timeout performance is not. Fade begins at 28.6s; black endpoints match. Strongest main chapter entry. |
| fable 0–4.8s | Task, trace and five repository files enter context. 14k/16k now uses amber for high occupancy, not red suggesting overflow. Departing file chips take a corrected path clear of Repository. This remains the busiest setup. |
| fable 5.4–11.9s | Work pulses accompany processing. At 7.3s, old: edit db.ts exposes the stale note; db.ts? leaves at 9.3s and lands at 9.8s. The candidate can now be related to visible stale advice, but there is no evidence that db.ts is actually wrong. That unsupported verdict was removed. |
| fable 12–15.7s | Reset retains the task, then fetches the trace and api.ts. This demonstrates selection, not compression or durable memory. The smaller meter is illustrative, not a quality score. |
| fable 16.1–19.9s | A model invocation discovers a need for users.ts; request, source highlight and return form a second retrieval. This is the best complementary mechanism: context selection can develop during reasoning instead of being a single up-front fetch. |
| fable 20.1–25.777s | Another invocation emits api.ts:42? at 21.7–22.2s, held until 24.7s. The amber candidate makes no correctness claim. Removed fabricated 41s/9s badges; runtime retrieval is not demonstrated to be faster. Fade returns to the title-only opening. |

## Corrections and authorship

Baseline: fixed the 5k/7k arithmetic to 9k/11k; replaced the final correctness-like tick with an explicit candidate. Added local render entry point, metadata and a matching transcript; the original prototype's model remains recorded as unknown. No invented original author attribution.

Fable: removed unmeasured latency values and the overlapping badge; made stale advice explicit; changed both unsupported verdicts to candidate locations; distinguished high occupancy from overflow; enlarged store text from 26px to 32px; rerouted file chips and tightened the ending ripple. A second encoded inspection caught the brief Repository-label collision and prompted the final route correction. Kept the author's iterative retrieval sequence and original model/reasoning attribution.

Both edited variants record `editedBy: "gpt-6-astra comparative review"`, timestamped corrections and original-artifact locations. Original media/source records are retained under scratch/original-baseline and scratch/original-fable. Historical Fable reviews/beat sheet remain identifiable as pre-correction records. Astra's source and media were not changed. Source syntax and shell entry points were checked; no installed skill or shared engine was edited.

Both edited transcripts were rewritten against the final encoded sequence. Astra's existing transcript was compared against its unchanged frames. Descriptions of compatibility, candidate status and human review now agree with what is actually visible. Final posters were inspected; edited posters come from the revised encodes.

## Scores and remaining tradeoffs

Scores evaluate the final cuts. 5 means excellent for this short instructional purpose, not proof of universal claims.

| Cut | Clarity | Accuracy | Pacing | Visual |
| --- | ---: | ---: | ---: | ---: |
| baseline | 4 | 4 | 4 | 4 |
| astra | 5 | 5 | 4 | 5 |
| fable | 4 | 4 | 3 | 3 |

Astra is easiest to read at 350px and teaches a concrete habit a team can immediately test. Baseline is the best next view for explaining compaction while retaining constraints. Fable rewards a second viewing with a stronger retrieval loop, but seven context rows, several file transfers and small secondary labels still impose more reading effort. Enlarged 32px rows become about 10px at phone width; the trace detail is smaller still. The title uses substantial space. These are disclosed presentation limitations, not reasons to erase its complementary mechanism.

No cut demonstrates a real model run, measured speedup or general success rate. Baseline and Fable stop at candidates; neither shows an executed test. Astra's fixture only illustrates compatibility coverage, with acceptance and performance testing still outstanding. The guide and [primary-source review](sources.md) make these boundaries explicit.

## Encoded verification

[verification.json](verification.json) records final public-file SHA-256 hashes and machine results. All three completely decoded without error and have H.264 video, 1080×1920 dimensions, constant 30fps, yuv420p pixels, AAC audio and moov before mdat for faststart. Exact decoded first/last RGB frames match for each loop. The checked revised bytes were copied into public media and their hashes checked again.

| Cut | Frames | Container duration | Maximum decoded audio sample |
| --- | ---: | ---: | ---: |
| baseline | 750 | 25.000s | −10.478 dBFS |
| astra | 900 | 30.000s | −1.960 dBFS |
| fable | 773 | 25.777s | −4.086 dBFS |

All peaks are below −0.5 dBFS. Fable's video duration is 25.766667s; AAC/container duration is slightly longer. This is not a missing video frame.

Decoded contact sheets cover the entire timeline, supplemented by native-size and 350px causal/busy/ending frames and exact endpoint extraction. Final phone galleries use 2fps samples; displayed gallery times are approximate, with separately extracted exact frames for crowded transitions. Whole-stream decode does not mean every frame was visually inspected or that the clips were watched continuously.

Audio was **not heard**. Decoded sample peaks, volume logs, 0.1s RMS/peak bins and spectrograms were examined. Local cue schedules were compared with non-silent decoded windows for 18 baseline, 25 astra and 51 fable cues. The quietest event-window RMS values were −34.95, −39.8 and −33.13 dBFS respectively. These confirm encoded energy near scheduled events, not perceived mix quality or independent identification of overlapping sounds. Baseline compaction/retrieval/candidate events, Astra's fixture transitions and Fable's processing/retrieval pulses have analytical support. No listening or waveform-correlation claim is made. Commands capped FFmpeg codec/filter threads at two.

The retained review evidence includes original/final frames, contact sheets, full-decode logs, probes, peak analysis, cue audits, sources and blind findings. No Git, publication, other-topic, shared app/build or installed-skill operations were performed.
