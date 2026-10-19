# Test the fix — Astra production review

Authored and self-reviewed by **gpt-6-astra**, high reasoning. Review date: **2026-10-19 Pacific/Auckland**; verification completed approximately **11:34 NZDT** (2026-10-18 22:34 UTC). One movie encode, following two still-preview iterations. No subagents, Git operations, shared build/UI/manifest changes, or installed-skill changes.

## Fixed before handover

- **08.80–24.70, wire/grade collision (S, highest priority):** the first still pass showed dotted wires through PASS/FAIL labels. Rerouted both evidence paths around the labels, and moved their travelling packets onto the same route. Reinspected the corrected 12.30-second still before movie rendering. Encoded phone frames and transition frames show clear labels and unobstructed travelling evidence.
- **03.30–26.70, ambiguous denominator (S):** “1 / 2 checks” could mean checks executed rather than checks passed. Changed the count to “1 / 2 passed”; it remains one after the second check fails. Encoded frames at 8.80 and 12.30 confirm the meaning.
- **All beats, phone labels (M):** stock small sublabels would weaken the expected/observed comparison. Added configurable sublabel size/gap only to the local engine copy. Test names are 46 px, expectations 40 px, outputs 52 px, grades 62 px. Inspected all six 350px encoded beat images individually; meaningful text remains legible, without collision or clipping.

## Teaching improvements applied under existing authorization

1. **Make opposite expectations visible (01.10–08.00, M).** Both branches initially return REJECT, yet only one should pass. Fixed expectation labels and separate observed-output nodes make the same action's different correctness visible. Green/red grades also carry check/cross symbols, so color is not the sole signal.
2. **Show an actual stop (10.50–14.00, M).** Joined the two results into a BLOCKED gate, with a thump and jolt. The good result cannot conceal the regression. The held blocked state lasts until the revision.
3. **Require fresh evidence (14.00–20.50, M).** Patch B clears old outputs, grades and count, then repeats both paths. A rising recovery cue marks the revision. This prevents a new patch from inheriting the previous patch's passing result.
4. **End at the right responsibility (23.80–26.70, S).** Both results advance to Human review, with a distinct G5 delivery cue and a 2.9-second hold before fading. Passing the example is not depicted as release permission.
5. **Honest loop boundary (00.00 / 27.97, S).** Added optional whole-frame fade to the local engine. The changed final state fades completely; it is not silently reset while visible. First and last encoded frame hashes match exactly.

No further material defect or meaningful teaching weakness was left pending. A separate trial-distribution animation would teach another mechanism and is deliberately outside this five-beat cut, rather than an unapplied improvement to cram into it.

## Inspection record

- **Before movie:** six stills at 4.0, 8.8, 12.3, 17.8, 21.5 and 24.7 seconds, a tiled overview, full-resolution failure frame; then the corrected full-resolution blocked frame.
- **After movie:** encoded 1-fps contact sheet; each of the six 350×622 beat images; full-resolution blocked frame; twelve encoded transition/boundary captures, including travelling packets, fail onset, patch reset, evidence merge and loop ends. No clipping, stale outcome, or packet/grade overlap found. Color fading during reset lasts at most 250 ms and accompanies the recovery cue; the stale output text is cleared immediately.
- **Pacing:** normal new-requirement pass at 3.30; regression fails at 8.00; block at 11.30; revision at 14.00; fresh passes at 17.00 and 20.50; human review at 23.80. Holds are deliberate; no unexplained idle gap exceeds three seconds.
- **Sound:** inspected the encoded spectrogram and decoded PCM, without claiming physical listening. The disruption at 8.00 has the broadest/loudest accent; repeating branch events keep C5/E5 identities. Recovery at 14.00 has a rising sweep. The final fade has a quiet matching cue.
- **Synchronization:** all 27 source cues match visible sends, arrivals, returned outputs, verdicts, gate changes, revision or fade. Each cue window contains decoded energy above −60 dBFS. Eight isolated AAC onset measurements differ from schedule by 0.27–9.71 ms, below one 30-fps frame. Dense events are checked by their shared scene schedule and spectrogram, not claimed to have individually measured perceptual synchronization.

## Encoded verification

`verification.json` contains the file hash, stream data, MP4 atom order, cue measurements and exact loop hash. `verify.py` reproduces the checks.

- 28.000 s; 840 decoded video frames.
- 1080×1920, 30/1 fps, H.264, yuv420p.
- AAC stereo, 44,100 Hz; decoded max volume **−3.9 dBFS**.
- **504,865 bytes**, below the 2,000,000-byte ceiling.
- Full video and audio decode with `-xerror`: clean.
- First/last decoded-frame MD5: identical (actual hash in `verification.json`).
- `moov` before `mdat`: confirmed, faststart present.
- Poster extracted from encoded 12.30-second frame.
- Every FFmpeg command caps codec and filter threads at 2; encoders were run serially.

## Honest limitations

This is an illustrative coding-agent artifact evaluation, not recorded agent execution or evidence about a particular model's success rate. Patch A→B is revision, not stochastic trials. Two tests are deliberately incomplete authentication coverage. Tool permissions, grader isolation, model-judge calibration and trial distributions belong to the companion guide. Fonts/browser/codec versions can affect reproduction across machines.

Audio was **not physically heard**. Waveform/spectrogram checks cannot establish whether a sound is pleasant or perceptually well balanced on real speakers. The nominal subtitle is small at phone size, but the lesson's title, expectations, outputs, verdicts and decision remain legible. This was a self-review; it does not replace the coordinator's independent comparison and does not designate this cut as the recommended variant.
